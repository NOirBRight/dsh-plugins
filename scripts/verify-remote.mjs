#!/usr/bin/env node
import { loadEntries } from './catalog.mjs'

const token = process.env.GITHUB_TOKEN
const headers = {
  Accept: 'application/vnd.github+json',
  'User-Agent': 'NOirBRight-dsh-plugins-catalog',
  ...(token ? { Authorization: 'Bearer ' + token } : {}),
}

async function json(url) {
  const response = await fetch(url, { headers })
  if (!response.ok) throw new Error(url + ': HTTP ' + response.status)
  return response.json()
}

async function text(url) {
  const response = await fetch(url, { headers: { 'User-Agent': headers['User-Agent'] } })
  if (!response.ok) throw new Error(url + ': HTTP ' + response.status)
  return response.text()
}

const failures = []
for (const entry of loadEntries()) {
  try {
    const [repository, tags, manifestText] = await Promise.all([
      json('https://api.github.com/repos/' + entry.repository),
      json('https://api.github.com/repos/' + entry.repository + '/tags?per_page=100'),
      text('https://raw.githubusercontent.com/' + entry.repository + '/' + entry.commit + '/package.json'),
    ])
    const tag = tags.find(candidate => candidate.name === entry.tag)
    const manifest = JSON.parse(manifestText)
    if (repository.visibility !== 'public' || repository.private) throw new Error('repository is not public')
    if (repository.archived) throw new Error('repository is archived')
    if (tag === undefined) throw new Error('catalog tag is missing from GitHub')
    if (tag.commit.sha !== entry.commit) throw new Error('tag commit is ' + tag.commit.sha + ', catalog has ' + entry.commit)
    if (manifest.name !== entry.packageName) throw new Error('package name is ' + manifest.name + ', catalog has ' + entry.packageName)

    if (entry.kind === 'plugin') {
      if (tags[0]?.name !== entry.tag) throw new Error('latest tag is ' + (tags[0]?.name ?? '<missing>') + ', catalog has ' + entry.tag)
      if (manifest.version !== entry.version) throw new Error('package version is ' + manifest.version + ', catalog has ' + entry.version)
      if (manifest.license !== 'MIT') throw new Error('package license is ' + (manifest.license ?? '<missing>') + ', expected MIT')
      if (manifest.dsh != null && typeof manifest.dsh?.bundle?.patch !== 'string') throw new Error('package does not declare dsh.bundle.patch')
      if (entry.release !== undefined) {
        const release = await json('https://api.github.com/repos/' + entry.repository + '/releases/tags/' + entry.tag)
        const asset = release.assets.find(candidate => candidate.name === entry.release.asset)
        const sums = release.assets.find(candidate => candidate.name === 'SHA256SUMS')
        if (asset === undefined) throw new Error('release does not contain ' + entry.release.asset)
        if (asset.browser_download_url !== entry.release.fixedUrl) throw new Error('release asset URL drifted')
        if (sums === undefined) throw new Error('release does not contain SHA256SUMS')
        const sumsText = await text(sums.browser_download_url)
        const line = sumsText.split(/\r?\n/u).find(value => value.trim().endsWith('  ' + entry.release.asset) || value.trim().endsWith(' *' + entry.release.asset))
        if (line === undefined || !line.trim().startsWith(entry.release.sha256 + ' ')) throw new Error('SHA256SUMS does not match ' + entry.release.asset)
      }
    } else {
      const [release, currentManifestText, licenseText] = await Promise.all([
        json('https://api.github.com/repos/' + entry.repository + '/releases/tags/' + entry.tag),
        text('https://raw.githubusercontent.com/' + entry.repository + '/' + repository.default_branch + '/package.json'),
        text('https://raw.githubusercontent.com/' + entry.repository + '/' + repository.default_branch + '/LICENSE'),
      ])
      const asset = release.assets.find(candidate => candidate.name === entry.artifact.name)
      const currentManifest = JSON.parse(currentManifestText)
      if (asset === undefined) throw new Error('release does not contain ' + entry.artifact.name)
      if (asset.browser_download_url !== entry.artifact.downloadUrl) throw new Error('release artifact URL drifted')
      if (entry.artifact.latestUrl !== undefined && entry.artifact.latestUrl !== 'https://github.com/' + entry.repository + '/releases/latest/download/' + entry.artifact.name) throw new Error('latest artifact URL drifted')
      if (entry.artifact.sha256Url !== undefined) {
        const sums = release.assets.find(candidate => candidate.name === 'SHA256SUMS')
        if (sums === undefined) throw new Error('release does not contain SHA256SUMS')
        const sumsText = await text(sums.browser_download_url)
        const line = sumsText.split(/\r?\n/u).find(value => value.trim().endsWith('  ' + entry.artifact.name) || value.trim().endsWith(' *' + entry.artifact.name))
        if (line === undefined || !line.trim().startsWith(entry.artifact.sha256 + ' ')) throw new Error('SHA256SUMS does not match ' + entry.artifact.name)
      }
      if (currentManifest.license !== entry.license) throw new Error('default-branch license is ' + (currentManifest.license ?? '<missing>') + ', catalog has ' + entry.license)
      if (!licenseText.startsWith('MIT License')) throw new Error('default branch does not carry the MIT license text')
    }
    console.log('remote: ' + entry.id + '@' + entry.version + ' verified')
  } catch (error) {
    failures.push(entry.id + ': ' + error.message)
  }
}
if (failures.length > 0) {
  console.error('remote verification failed:')
  for (const failure of failures) console.error('  - ' + failure)
  process.exitCode = 1
}

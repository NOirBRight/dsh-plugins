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
      json('https://api.github.com/repos/' + entry.repository + '/tags?per_page=1'),
      text('https://raw.githubusercontent.com/' + entry.repository + '/' + entry.commit + '/package.json'),
    ])
    const latest = tags[0]
    const manifest = JSON.parse(manifestText)
    if (repository.visibility !== 'public' || repository.private) throw new Error('repository is not public')
    if (repository.archived) throw new Error('repository is archived')
    if (latest?.name !== entry.tag) throw new Error('latest tag is ' + (latest?.name ?? '<missing>') + ', catalog has ' + entry.tag)
    if (latest?.commit?.sha !== entry.commit) throw new Error('latest tag commit is ' + (latest?.commit?.sha ?? '<missing>') + ', catalog has ' + entry.commit)
    if (manifest.name !== entry.packageName) throw new Error('package name is ' + manifest.name + ', catalog has ' + entry.packageName)
    if (manifest.version !== entry.version) throw new Error('package version is ' + manifest.version + ', catalog has ' + entry.version)
    if (manifest.license !== 'MIT') throw new Error('package license is ' + (manifest.license ?? '<missing>') + ', expected MIT')
    if (typeof manifest.dsh?.bundle?.patch !== 'string') throw new Error('package does not declare dsh.bundle.patch')
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

import assert from 'node:assert/strict'
import { existsSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import test from 'node:test'
import { loadEntries, renderIndex, renderReadme, ROOT, validateEntry } from '../scripts/catalog.mjs'

test('catalog contains the published plugins and mobile companion', () => {
  const entries = loadEntries()
  assert.equal(entries.length, 18)
  assert.equal(new Set(entries.map(entry => entry.repository)).size, 18)
  assert.equal(entries.filter(entry => entry.kind === 'plugin').length, 17)
  assert.equal(entries.filter(entry => entry.kind === 'companion-app').length, 1)
  assert.equal(entries.filter(entry => entry.status === 'active').length, 15)
  assert.equal(entries.filter(entry => entry.status === 'quarantined').length, 2)
  assert.equal(entries.filter(entry => entry.status === 'deprecated').length, 1)
})

test('generated artifacts match the catalog', () => {
  const entries = loadEntries()
  assert.equal(readFileSync(join(ROOT, 'README.md'), 'utf8'), renderReadme(entries, 'en'))
  assert.equal(readFileSync(join(ROOT, 'README.zh.md'), 'utf8'), renderReadme(entries, 'zh'))
  assert.equal(readFileSync(join(ROOT, 'dist/index.json'), 'utf8'), renderIndex(entries))
})

test('high-impact disclosures remain explicit', () => {
  const entries = loadEntries()
  const readme = renderReadme(entries, 'en')
  const index = JSON.parse(renderIndex(entries))
  assert.match(readme, /account can be restricted or banned/i)
  assert.match(readme, /Mobile app/)
  assert.match(readme, /92e3e2ec4c7d74a6a178a5ff0b3cbf5abb6937a2cbad7a283415d6c031f59bbc/)
  assert.match(readme, /dshmarket 1\.40\.0/)
  assert.match(readme, /What these plugins do/)
  assert.match(readme, /docs\/screenshots\/llm-providers.jpg/)
  assert.match(readme, /docs\/screenshots\/model-switch.jpg/)
  assert.match(readme, /docs\/screenshots\/plan-review.jpg/)
  assert.match(readme, /docs\/screenshots\/composer-picker.jpg/)
  assert.match(readme, /docs\/screenshots\/mobile-remote.jpg/)
  assert.match(readme, /docs\/screenshots\/usage-monitor.jpg/)
  assert.equal(index.plugins.length, 17)
  assert.equal(index.companionApps.length, 1)
  assert.equal(index.plugins.find(entry => entry.id === 'dsh-llm-commandcode').installLatest.length, 2)
  assert.match(index.plugins.find(entry => entry.id === 'dsh-llm-commandcode').installLatest[0], /dsh-llm-providers-ui/)
})

test('screenshot files exist for every README image', () => {
  const screenshots = JSON.parse(readFileSync(join(ROOT, 'docs/screenshots.json'), 'utf8'))
  const images = screenshots.groups.flatMap(group => group.screenshots ?? [group.screenshot])
  assert.equal(images.length, 6)
  for (const image of images) assert.equal(existsSync(join(ROOT, image.src)), true)
})

test('validator rejects unknown fields and incomplete companion apps', () => {
  const valid = structuredClone(loadEntries()[0])
  valid.unknown = true
  assert.throws(() => validateEntry(valid), /unknown field unknown/)
  const companion = structuredClone(loadEntries().find(entry => entry.kind === 'companion-app'))
  delete companion.artifact
  assert.throws(() => validateEntry(companion), /require an artifact/)
})

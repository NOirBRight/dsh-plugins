import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import test from 'node:test'
import { loadEntries, renderIndex, renderReadme, ROOT, validateEntry } from '../scripts/catalog.mjs'

test('catalog contains twelve plugins and the mobile companion', () => {
  const entries = loadEntries()
  assert.equal(entries.length, 13)
  assert.equal(new Set(entries.map(entry => entry.repository)).size, 13)
  assert.equal(entries.filter(entry => entry.kind === 'plugin').length, 12)
  assert.equal(entries.filter(entry => entry.kind === 'companion-app').length, 1)
  assert.equal(entries.filter(entry => entry.status === 'active').length, 12)
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
  assert.match(readme, /e06f26e03bda6a6c3a2c3b15d437e8169b177e78a1119a1ee607e0c239fed4b7/)
  assert.equal(index.plugins.length, 12)
  assert.equal(index.companionApps.length, 1)
})

test('validator rejects unknown fields and incomplete companion apps', () => {
  const valid = structuredClone(loadEntries()[0])
  valid.unknown = true
  assert.throws(() => validateEntry(valid), /unknown field unknown/)
  const companion = structuredClone(loadEntries().find(entry => entry.kind === 'companion-app'))
  delete companion.artifact
  assert.throws(() => validateEntry(companion), /require an artifact/)
})

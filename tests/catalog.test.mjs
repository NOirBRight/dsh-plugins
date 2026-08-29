import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import test from 'node:test'
import { loadEntries, renderIndex, renderReadme, ROOT, validateEntry } from '../scripts/catalog.mjs'

test('catalog contains the twelve released plugins', () => {
  const entries = loadEntries()
  assert.equal(entries.length, 12)
  assert.equal(new Set(entries.map(entry => entry.repository)).size, 12)
  assert.equal(entries.filter(entry => entry.status === 'active').length, 11)
  assert.equal(entries.filter(entry => entry.status === 'deprecated').length, 1)
})

test('generated artifacts match the catalog', () => {
  const entries = loadEntries()
  assert.equal(readFileSync(join(ROOT, 'README.md'), 'utf8'), renderReadme(entries, 'en'))
  assert.equal(readFileSync(join(ROOT, 'README.zh.md'), 'utf8'), renderReadme(entries, 'zh'))
  assert.equal(readFileSync(join(ROOT, 'dist/index.json'), 'utf8'), renderIndex(entries))
})

test('cursor disclosure remains explicit', () => {
  const readme = renderReadme(loadEntries(), 'en')
  assert.match(readme, /account can be restricted or banned/i)
})

test('validator rejects unknown fields', () => {
  const valid = structuredClone(loadEntries()[0])
  valid.unknown = true
  assert.throws(() => validateEntry(valid), /unknown field unknown/)
})

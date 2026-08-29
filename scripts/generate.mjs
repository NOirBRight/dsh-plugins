#!/usr/bin/env node
import { readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { loadEntries, renderIndex, renderReadme, ROOT } from './catalog.mjs'

const check = process.argv.includes('--check')
const entries = loadEntries()
const outputs = new Map([
  ['README.md', renderReadme(entries, 'en')],
  ['README.zh.md', renderReadme(entries, 'zh')],
  ['dist/index.json', renderIndex(entries)],
])
let stale = false
for (const [path, expected] of outputs) {
  const target = join(ROOT, path)
  if (check) {
    let actual = ''
    try {
      actual = readFileSync(target, 'utf8')
    } catch (error) {
      if (error?.code !== 'ENOENT') throw error
    }
    if (actual !== expected) {
      console.error('generated file is stale: ' + path + '; run npm run generate')
      stale = true
    }
  } else {
    writeFileSync(target, expected)
    console.log('generated ' + path)
  }
}
if (stale) process.exitCode = 1

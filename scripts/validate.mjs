#!/usr/bin/env node
import { loadEntries } from './catalog.mjs'

const entries = loadEntries()
console.log('catalog: ' + entries.length + ' plugin entries valid')

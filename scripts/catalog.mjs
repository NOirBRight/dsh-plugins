import { readFileSync, readdirSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

export const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')
export const CATEGORIES = ['models', 'interface', 'assistant', 'remote', 'observability']
export const POLICY_FLAGS = [
  'account-ban-risk',
  'browser-automation',
  'credentials',
  'network',
  'oauth',
  'remote-access',
  'session-data',
  'subprocess',
  'third-party-service',
  'third-party-subscription',
  'ui-extension',
  'unofficial-api',
]

const REQUIRED_KEYS = [
  'schemaVersion', 'kind', 'id', 'packageName', 'repository', 'category', 'version', 'tag',
  'commit', 'license', 'profiles', 'dshCompatibility', 'status', 'descriptions', 'policyFlags',
]
const ALLOWED_KEYS = new Set([...REQUIRED_KEYS, 'artifact', 'notice'])
const CATEGORY_LABELS = {
  en: { models: 'Models & Providers', interface: 'Interface', assistant: 'Assistant', remote: 'Remote Access', observability: 'Usage & Observability' },
  zh: { models: '模型与 Provider', interface: '界面', assistant: '助手', remote: '远程访问', observability: '用量与可观测性' },
}
const KIND_LABELS = { en: { plugin: 'Plugin', 'companion-app': 'Companion app' }, zh: { plugin: '插件', 'companion-app': '配套应用' } }
const STATUS_LABELS = { en: { active: 'Active', deprecated: 'Deprecated', quarantined: 'Quarantined' }, zh: { active: '维护中', deprecated: '已弃用', quarantined: '已隔离' } }
const FLAG_LABELS = {
  en: {
    'account-ban-risk': 'Account-ban risk', 'browser-automation': 'Browser automation', credentials: 'Credentials', network: 'Network', oauth: 'OAuth',
    'remote-access': 'Remote access', 'session-data': 'Session data', subprocess: 'Subprocess', 'third-party-service': 'Third-party service',
    'third-party-subscription': 'Subscription', 'ui-extension': 'UI extension', 'unofficial-api': 'Unofficial API',
  },
  zh: {
    'account-ban-risk': '封号风险', 'browser-automation': '浏览器自动化', credentials: '凭据', network: '网络', oauth: 'OAuth',
    'remote-access': '远程访问', 'session-data': '会话数据', subprocess: '子进程', 'third-party-service': '第三方服务',
    'third-party-subscription': '订阅账号', 'ui-extension': '界面扩展', 'unofficial-api': '非官方接口',
  },
}

function fail(context, message) {
  throw new Error(context + ': ' + message)
}

function object(value) {
  return value !== null && typeof value === 'object' && !Array.isArray(value)
}

export function validateEntry(entry, filename = '<entry>') {
  if (!object(entry)) fail(filename, 'entry must be a JSON object')
  for (const key of REQUIRED_KEYS) if (!(key in entry)) fail(filename, 'missing required field ' + key)
  for (const key of Object.keys(entry)) if (!ALLOWED_KEYS.has(key)) fail(filename, 'unknown field ' + key)
  if (entry.schemaVersion !== 1) fail(filename, 'schemaVersion must be 1')
  if (!['plugin', 'companion-app'].includes(entry.kind)) fail(filename, 'kind must be plugin or companion-app')
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(entry.id)) fail(filename, 'id must be lowercase kebab-case')
  const expectedFilename = entry.id + '.json'
  if (filename !== '<entry>' && filename !== expectedFilename) fail(filename, 'filename must be ' + expectedFilename)
  if (entry.repository !== 'NOirBRight/' + entry.id) fail(filename, 'repository must be NOirBRight/<id>')
  if (!CATEGORIES.includes(entry.category)) fail(filename, 'unknown category ' + entry.category)
  if (!/^\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?$/.test(entry.version)) fail(filename, 'version must be semver without a v prefix')
  if (!/^[A-Za-z0-9][A-Za-z0-9._-]*$/.test(entry.tag)) fail(filename, 'tag contains unsupported characters')
  if (entry.kind === 'plugin' && entry.tag !== 'v' + entry.version) fail(filename, 'plugin tag must equal v<version>')
  if (!/^[0-9a-f]{40}$/.test(entry.commit)) fail(filename, 'commit must be a full 40-character SHA')
  if (!['MIT', 'NOASSERTION'].includes(entry.license)) fail(filename, 'license must be MIT or NOASSERTION')
  if (!Array.isArray(entry.profiles) || entry.profiles.some(profile => !['web', 'headless'].includes(profile))) fail(filename, 'profiles contain an unsupported value')
  if (entry.kind === 'plugin' && (entry.license !== 'MIT' || entry.profiles.length === 0)) fail(filename, 'plugins require MIT and at least one profile')
  if (entry.kind === 'companion-app' && entry.profiles.length !== 0) fail(filename, 'companion apps do not declare DSH profiles')
  if (typeof entry.dshCompatibility !== 'string' || entry.dshCompatibility.length === 0) fail(filename, 'dshCompatibility is required')
  if (!['active', 'deprecated', 'quarantined'].includes(entry.status)) fail(filename, 'invalid status')
  if (!object(entry.descriptions) || typeof entry.descriptions.en !== 'string' || entry.descriptions.en.length < 20 || typeof entry.descriptions.zh !== 'string' || entry.descriptions.zh.length < 8) fail(filename, 'descriptions.en and descriptions.zh are required')
  if (!Array.isArray(entry.policyFlags) || new Set(entry.policyFlags).size !== entry.policyFlags.length || entry.policyFlags.some(flag => !POLICY_FLAGS.includes(flag))) fail(filename, 'policyFlags contain an unknown or duplicate value')
  if (entry.kind === 'companion-app' && (!object(entry.artifact) || typeof entry.artifact.name !== 'string' || typeof entry.artifact.downloadUrl !== 'string' || !/^[0-9a-f]{64}$/.test(entry.artifact.sha256))) fail(filename, 'companion apps require an artifact name, URL, and SHA-256')
  if (entry.kind === 'plugin' && entry.artifact !== undefined) fail(filename, 'plugins cannot declare a companion artifact')
  if (entry.notice !== undefined && (!object(entry.notice) || typeof entry.notice.en !== 'string' || typeof entry.notice.zh !== 'string')) fail(filename, 'notice requires en and zh strings')
  return entry
}

export function loadEntries(root = ROOT) {
  const catalog = join(root, 'catalog')
  const filenames = readdirSync(catalog).filter(name => name.endsWith('.json')).sort()
  const entries = filenames.map(filename => {
    const entry = JSON.parse(readFileSync(join(catalog, filename), 'utf8'))
    return validateEntry(entry, filename)
  })
  const ids = new Set()
  const packages = new Set()
  for (const entry of entries) {
    if (ids.has(entry.id)) fail(entry.id, 'duplicate id')
    if (packages.has(entry.packageName)) fail(entry.id, 'duplicate packageName ' + entry.packageName)
    ids.add(entry.id)
    packages.add(entry.packageName)
  }
  return entries.sort((left, right) => {
    const category = CATEGORIES.indexOf(left.category) - CATEGORIES.indexOf(right.category)
    return category || left.id.localeCompare(right.id)
  })
}

function escapeCell(value) {
  return value.replaceAll('|', '\\|').replaceAll('\n', ' ')
}

function policyLabels(entry, locale) {
  if (entry.policyFlags.length === 0) return locale === 'en' ? 'None declared' : '无'
  return entry.policyFlags.map(flag => FLAG_LABELS[locale][flag]).join(', ')
}

export function installCommand(entry) {
  if (entry.kind === 'companion-app') return 'adb install -r ' + entry.artifact.name
  return 'dsh plugin --profile ' + entry.profiles[0] + ' add github:' + entry.repository + '#' + entry.commit
}

export function renderIndex(entries) {
  const data = {
    schemaVersion: 1,
    publisher: { name: 'NOirBRight', github: 'https://github.com/NOirBRight' },
    licenses: { tooling: 'MIT', catalog: 'CC0-1.0' },
    plugins: entries.filter(entry => entry.kind === 'plugin').map(entry => ({
      kind: entry.kind,
      id: entry.id,
      packageName: entry.packageName,
      repository: entry.repository,
      url: 'https://github.com/' + entry.repository,
      category: entry.category,
      version: entry.version,
      tag: entry.tag,
      commit: entry.commit,
      install: installCommand(entry),
      license: entry.license,
      profiles: entry.profiles,
      dshCompatibility: entry.dshCompatibility,
      status: entry.status,
      descriptions: entry.descriptions,
      policyFlags: entry.policyFlags,
      ...(entry.notice === undefined ? {} : { notice: entry.notice }),
    })),
    companionApps: entries.filter(entry => entry.kind === 'companion-app').map(entry => ({
      kind: entry.kind,
      id: entry.id,
      packageName: entry.packageName,
      repository: entry.repository,
      url: 'https://github.com/' + entry.repository,
      category: entry.category,
      version: entry.version,
      tag: entry.tag,
      commit: entry.commit,
      install: installCommand(entry),
      license: entry.license,
      profiles: entry.profiles,
      dshCompatibility: entry.dshCompatibility,
      status: entry.status,
      descriptions: entry.descriptions,
      policyFlags: entry.policyFlags,
      artifact: entry.artifact,
      ...(entry.notice === undefined ? {} : { notice: entry.notice }),
    })),
  }
  return JSON.stringify(data, null, 2) + '\n'
}

export function renderReadme(entries, locale) {
  const en = locale === 'en'
  const lines = [
    '# NOirBRight DSH Plugins & Mobile',
    '',
    en ? 'English | [中文](README.zh.md)' : '[English](README.md) | 中文',
    '',
    en
      ? 'An independent, machine-readable catalog of DSH plugins and the mobile companion published by [NOirBRight](https://github.com/NOirBRight). This project is not affiliated with or endorsed by DeepSeek or the third-party service providers named by individual entries.'
      : '[NOirBRight](https://github.com/NOirBRight) 发布的 DSH 插件及手机配套应用独立机器可读目录。本项目与 DeepSeek 及各条目所涉及的第三方服务商无隶属关系，也不代表其认可或背书。',
    '',
    en
      ? '> **Security:** DSH plugins and companion apps execute code with user-granted permissions and may handle files, credentials, session data, or network access. Review the source and disclosure flags before installing. Plugin commands pin immutable commits; application downloads include SHA-256.'
      : '> **安全提示：** DSH 插件及配套应用以用户授予的权限执行代码，可能处理文件、凭据、会话数据或网络访问。安装前请审查源码及披露标记。插件命令固定不可变 commit，应用下载提供 SHA-256。',
    '',
    en ? '## Catalog' : '## 目录',
    '',
  ]
  for (const category of CATEGORIES) {
    const group = entries.filter(entry => entry.category === category)
    if (group.length === 0) continue
    lines.push('### ' + CATEGORY_LABELS[locale][category], '')
    lines.push(en ? '| Entry | Type | Version | Status | Description | Disclosures |' : '| 条目 | 类型 | 版本 | 状态 | 简介 | 披露 |')
    lines.push('|---|---|---:|---|---|---|')
    for (const entry of group) {
      const link = '[' + entry.id + '](https://github.com/' + entry.repository + ')'
      const version = '[' + entry.tag + '](https://github.com/' + entry.repository + '/tree/' + entry.tag + ')'
      lines.push('| ' + link + ' | ' + KIND_LABELS[locale][entry.kind] + ' | ' + version + ' | ' + STATUS_LABELS[locale][entry.status] + ' | ' + escapeCell(entry.descriptions[locale]) + ' | ' + escapeCell(policyLabels(entry, locale)) + ' |')
    }
    lines.push('')
  }
  const notices = entries.filter(entry => entry.notice !== undefined)
  if (notices.length > 0) {
    lines.push(en ? '## Policy-specific notices' : '## 特定政策提示', '')
    for (const entry of notices) lines.push('- **[' + entry.id + '](https://github.com/' + entry.repository + ')** — ' + entry.notice[locale])
    lines.push('')
  }
  lines.push(en ? '## Install' : '## 安装', '')
  lines.push(en ? 'Use the pinned command from [dist/index.json](dist/index.json). For example:' : '使用 [dist/index.json](dist/index.json) 中固定 commit 的命令。例如：')
  lines.push('', '    ' + installCommand(entries[0]), '')
  lines.push(en
    ? 'GitHub installs may run package build scripts outside the agent sandbox. A pinned commit prevents later branch changes from silently changing the installed code, but it does not make the code safe.'
    : '从 GitHub 安装时，包构建脚本可能在 agent 沙箱之外执行。固定 commit 可避免分支后续变化静默替换安装代码，但不代表代码本身安全。')
  const companion = entries.find(entry => entry.kind === 'companion-app')
  if (companion !== undefined) {
    lines.push('', en ? '## Mobile app' : '## 手机应用', '')
    lines.push(en
      ? '- [Download ' + companion.artifact.name + '](' + companion.artifact.downloadUrl + ')\n- SHA-256: ' + companion.artifact.sha256 + '\n- Host requirement: install dsh-mobile-pairing first.'
      : '- [下载 ' + companion.artifact.name + '](' + companion.artifact.downloadUrl + ')\n- SHA-256：' + companion.artifact.sha256 + '\n- Host 要求：先安装 dsh-mobile-pairing。')
  }
  lines.push('', en ? '## Data and maintenance' : '## 数据与维护', '')
  lines.push(en
    ? '- catalog/*.json is the reviewed source.\n- README.md, README.zh.md, and dist/index.json are generated.\n- npm run verify:remote checks public visibility, tags, commit SHAs, package identity, plugin manifests, and companion release assets.'
    : '- catalog/*.json 是经审核的数据源。\n- README.md、README.zh.md 与 dist/index.json 均由脚本生成。\n- npm run verify:remote 检查仓库公开性、tag、commit SHA、包身份、插件 manifest 和配套应用发布资产。')
  lines.push('', en ? 'Catalog data is [CC0-1.0](DATA_LICENSE.md); repository tooling is [MIT](LICENSE).' : '目录数据采用 [CC0-1.0](DATA_LICENSE.md)，仓库工具代码采用 [MIT](LICENSE)。', '')
  lines.push(en ? '## Disclaimer' : '## 免责声明', '')
  lines.push(en
    ? 'The catalog records factual disclosures and is not a security certification. Service names and trademarks belong to their respective owners. Each entry remains subject to applicable provider terms.'
    : '本目录记录事实性披露，不构成安全认证。服务名称及商标归各自权利人所有；各条目仍受适用的服务商条款约束。')
  lines.push('')
  return lines.join('\n')
}

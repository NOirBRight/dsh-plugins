# NOirBRight DSH Plugins & Mobile

English | [中文](README.zh.md)

An independent, machine-readable catalog of DSH plugins and the mobile companion published by [NOirBRight](https://github.com/NOirBRight). This project is not affiliated with or endorsed by DeepSeek or the third-party service providers named by individual entries.

> **Security:** DSH plugins and companion apps execute code with user-granted permissions and may handle files, credentials, session data, or network access. Review the source and disclosure flags before installing. Plugin commands pin immutable commits; application downloads include SHA-256.

## Catalog

### Models & Providers

| Entry | Type | Version | Status | Description | Disclosures |
|---|---|---:|---|---|---|
| [dsh-llm-codex](https://github.com/NOirBRight/dsh-llm-codex) | Plugin | [v0.3.4](https://github.com/NOirBRight/dsh-llm-codex/tree/v0.3.4) | Active | ChatGPT Codex subscription login, sortable model catalog, Fast and 1M variants, live usage limits, and optional search and image tools. | Credentials, Network, OAuth, Third-party service, Subscription |
| [dsh-llm-commandcode](https://github.com/NOirBRight/dsh-llm-commandcode) | Plugin | [v0.1.13](https://github.com/NOirBRight/dsh-llm-commandcode/tree/v0.1.13) | Active | Command Code Provider API chat with Host-only model discovery, credential storage, and best-effort subscription usage reporting. | Credentials, Network, Third-party service, Subscription, Unofficial API |
| [dsh-llm-cursor](https://github.com/NOirBRight/dsh-llm-cursor) | Plugin | [v0.2.11](https://github.com/NOirBRight/dsh-llm-cursor/tree/v0.2.11) | Active | Unofficial Cursor subscription login and chat with Host-owned PKCE credentials, model discovery, and subscription usage rails. | Account-ban risk, Credentials, Network, OAuth, Third-party service, Subscription, Unofficial API |
| [dsh-llm-grok](https://github.com/NOirBRight/dsh-llm-grok) | Plugin | [v0.3.4](https://github.com/NOirBRight/dsh-llm-grok/tree/v0.3.4) | Active | xAI Grok subscription login and Responses chat with configurable models, usage reporting, server-side search, and Imagine generation. | Credentials, Network, OAuth, Third-party service, Subscription |
| [dsh-llm-ollama](https://github.com/NOirBRight/dsh-llm-ollama) | Plugin | [v0.6.12](https://github.com/NOirBRight/dsh-llm-ollama/tree/v0.6.12) | Active | Ollama Cloud chat through the OpenAI-compatible adapter, plus native model discovery and Web Search and Fetch providers. | Credentials, Network, Third-party service |
| [dsh-llm-opencode-go](https://github.com/NOirBRight/dsh-llm-opencode-go) | Plugin | [v0.1.13](https://github.com/NOirBRight/dsh-llm-opencode-go/tree/v0.1.13) | Active | OpenCode Go models with per-model Completions, Responses, or Anthropic Messages routing, discovery, and subscription usage. | Credentials, Network, Third-party service, Subscription |

### Interface

| Entry | Type | Version | Status | Description | Disclosures |
|---|---|---:|---|---|---|
| [dsh-codex-sidebar](https://github.com/NOirBRight/dsh-codex-sidebar) | Plugin | [v0.5.0](https://github.com/NOirBRight/dsh-codex-sidebar/tree/v0.5.0) | Active | Codex-style right sidebar for one DSH session, with Files, Review, Browser, and Terminal sharing a single tab strip. | Browser automation, Network, Subprocess, UI extension |
| [dsh-composer-picker](https://github.com/NOirBRight/dsh-composer-picker) | Plugin | [v0.1.3](https://github.com/NOirBRight/dsh-composer-picker/tree/v0.1.3) | Deprecated | Client-only suffix-grouped composer model picker with standalone Plan Review and no provider runtime dependency. | UI extension |
| [dsh-model-switch](https://github.com/NOirBRight/dsh-model-switch) | Plugin | [v0.4.1](https://github.com/NOirBRight/dsh-model-switch/tree/v0.4.1) | Active | Explicit routing for Main, Subagent, Composer, Plan Review, Web Search, and image generation without patching DSH Core. | UI extension |

### Assistant

| Entry | Type | Version | Status | Description | Disclosures |
|---|---|---:|---|---|---|
| [dsh-llm-assistant](https://github.com/NOirBRight/dsh-llm-assistant) | Plugin | [v0.1.5](https://github.com/NOirBRight/dsh-llm-assistant/tree/v0.1.5) | Active | Resident DeepSeek assistant seat with its own session history, reminders, handoffs, and on-demand read-only task reference. | Network, Session data, UI extension |

### Remote Access

| Entry | Type | Version | Status | Description | Disclosures |
|---|---|---:|---|---|---|
| [dsh-mobile](https://github.com/NOirBRight/dsh-mobile) | Companion app | [mobile-picker-fix-0.1.14](https://github.com/NOirBRight/dsh-mobile/tree/mobile-picker-fix-0.1.14) | Active | Android companion for your own DSH Host with QR pairing, end-to-end encrypted tunnel transport, official features, and a mobile layout. | Credentials, Network, Remote access |
| [dsh-mobile-pairing](https://github.com/NOirBRight/dsh-mobile-pairing) | Plugin | [v0.1.10](https://github.com/NOirBRight/dsh-mobile-pairing/tree/v0.1.10) | Active | DSH Mobile Host pairing with a loopback gateway, public endpoint discovery, WebRTC Direct, and encrypted tunnel fallback. | Credentials, Network, Remote access |

### Usage & Observability

| Entry | Type | Version | Status | Description | Disclosures |
|---|---|---:|---|---|---|
| [dsh-usage-monitor](https://github.com/NOirBRight/dsh-usage-monitor) | Plugin | [v0.2.6](https://github.com/NOirBRight/dsh-usage-monitor/tree/v0.2.6) | Active | Session-log usage dashboard for tokens, requests, output, and cache-hit rates, grouped by provider, model, or workspace. | Session data, UI extension |

## Policy-specific notices

- **[dsh-llm-commandcode](https://github.com/NOirBRight/dsh-llm-commandcode)** — Chat uses the documented Provider API; optional quota reporting also reads unofficial account routes used by the official CLI.
- **[dsh-llm-cursor](https://github.com/NOirBRight/dsh-llm-cursor)** — Cursor staff treat this private-client access as against their Terms of Service. The account can be restricted or banned merely by installing, signing in, or sending chat.
- **[dsh-composer-picker](https://github.com/NOirBRight/dsh-composer-picker)** — This plugin has been absorbed by dsh-model-switch. Do not install both because they compete for the same picker seat.
- **[dsh-mobile](https://github.com/NOirBRight/dsh-mobile)** — Requires dsh-mobile-pairing on the Host. This latest stable patch release reports Android versionName 1.1.1-test.20260824.9. The source repository currently has no root license declaration.

## Install

Use the pinned command from [dist/index.json](dist/index.json). For example:

    dsh plugin --profile web add github:NOirBRight/dsh-llm-codex#95aadccdb1222081d3bff702de3671216e8ddbd3

GitHub installs may run package build scripts outside the agent sandbox. A pinned commit prevents later branch changes from silently changing the installed code, but it does not make the code safe.

## Mobile app

- [Download app-release.apk](https://github.com/NOirBRight/dsh-mobile/releases/download/mobile-picker-fix-0.1.14/app-release.apk)
- SHA-256: e06f26e03bda6a6c3a2c3b15d437e8169b177e78a1119a1ee607e0c239fed4b7
- Host requirement: install dsh-mobile-pairing first.

## Data and maintenance

- catalog/*.json is the reviewed source.
- README.md, README.zh.md, and dist/index.json are generated.
- npm run verify:remote checks public visibility, tags, commit SHAs, package identity, plugin manifests, and companion release assets.

Catalog data is [CC0-1.0](DATA_LICENSE.md); repository tooling is [MIT](LICENSE).

## Disclaimer

The catalog records factual disclosures and is not a security certification. Service names and trademarks belong to their respective owners. Each entry remains subject to applicable provider terms.

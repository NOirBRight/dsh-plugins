# NOirBRight DSH Plugins & Mobile

English | [中文](README.zh.md)

An independent, machine-readable catalog of DSH plugins and the mobile companion published by [NOirBRight](https://github.com/NOirBRight). This project is not affiliated with or endorsed by DeepSeek or the third-party service providers named by individual entries.

> **Security:** DSH plugins and companion apps execute code with user-granted permissions and may handle files, credentials, session data, or network access. Review the source and disclosure flags before installing. Latest URLs follow release assets; fixed URLs and SHA-256 are provided for reproducible installs.

> **Alpha.4 compatibility:** Migration releases target DeepSeek Harness `0.1.2-alpha.4` with `@deepseek-ai/cordis@4.0.2` exactly and are not compatible with Alpha.1–Alpha.3. Users on older runtimes must keep the last plugin tag built for that runtime; do not install an Alpha.4 tarball into an older profile. See [the compatibility and rollback policy](docs/alpha4-release-compatibility.md) and [campaign evidence](docs/alpha4-campaign-evidence.md).

## Catalog

### Models & Providers

| Entry | Type | Version | Status | Description | Disclosures |
|---|---|---:|---|---|---|
| [dsh-llm-codex](https://github.com/NOirBRight/dsh-llm-codex) | Plugin | [v0.3.8](https://github.com/NOirBRight/dsh-llm-codex/tree/v0.3.8) | Active | ChatGPT Codex subscription login, sortable model catalog, Fast and 1M variants, live usage limits, and optional search and image tools. | Credentials, Network, OAuth, Third-party service, Subscription |
| [dsh-llm-commandcode](https://github.com/NOirBRight/dsh-llm-commandcode) | Plugin | [v0.1.18](https://github.com/NOirBRight/dsh-llm-commandcode/tree/v0.1.18) | Active | Command Code Provider API chat with Host-only model discovery, credential storage, and best-effort subscription usage reporting. | Credentials, Network, Third-party service, Subscription, Unofficial API |
| [dsh-llm-cursor](https://github.com/NOirBRight/dsh-llm-cursor) | Plugin | [v0.2.15](https://github.com/NOirBRight/dsh-llm-cursor/tree/v0.2.15) | Active | Unofficial Cursor subscription login and chat with Host-owned PKCE credentials, model discovery, and subscription usage rails. | Account-ban risk, Credentials, Network, OAuth, Third-party service, Subscription, Unofficial API |
| [dsh-llm-grok](https://github.com/NOirBRight/dsh-llm-grok) | Plugin | [v0.3.8](https://github.com/NOirBRight/dsh-llm-grok/tree/v0.3.8) | Active | xAI Grok subscription login and Responses chat with configurable models, usage reporting, server-side search, and Imagine generation. | Credentials, Network, OAuth, Third-party service, Subscription |
| [dsh-llm-ollama](https://github.com/NOirBRight/dsh-llm-ollama) | Plugin | [v0.6.16](https://github.com/NOirBRight/dsh-llm-ollama/tree/v0.6.16) | Active | Ollama Cloud chat through the OpenAI-compatible adapter, plus native model discovery and Web Search and Fetch providers. | Credentials, Network, Third-party service |
| [dsh-llm-opencode-go](https://github.com/NOirBRight/dsh-llm-opencode-go) | Plugin | [v0.1.18](https://github.com/NOirBRight/dsh-llm-opencode-go/tree/v0.1.18) | Active | OpenCode Go models with per-model Completions, Responses, or Anthropic Messages routing, discovery, and subscription usage. | Credentials, Network, Third-party service, Subscription |

### Interface

| Entry | Type | Version | Status | Description | Disclosures |
|---|---|---:|---|---|---|
| [dsh-buddy](https://github.com/NOirBRight/dsh-buddy) | Plugin | [v0.1.0](https://github.com/NOirBRight/dsh-buddy/tree/v0.1.0) | Quarantined | Pixel whale dashboard and touch remote for the AM01S USB sub-screen, showing DSH moods, sessions, approvals, and questions. | Network, Remote access, UI extension |
| [dsh-codex-sidebar](https://github.com/NOirBRight/dsh-codex-sidebar) | Plugin | [v0.5.11](https://github.com/NOirBRight/dsh-codex-sidebar/tree/v0.5.11) | Active | Codex-style right sidebar for one DSH session, with Files, Review, Browser, and Terminal sharing a single tab strip. | Browser automation, Network, Subprocess, UI extension |
| [dsh-composer-picker](https://github.com/NOirBRight/dsh-composer-picker) | Plugin | [v0.1.3](https://github.com/NOirBRight/dsh-composer-picker/tree/v0.1.3) | Deprecated | Client-only suffix-grouped composer model picker with standalone Plan Review and no provider runtime dependency. | UI extension |
| [dsh-llm-providers-ui](https://github.com/NOirBRight/dsh-llm-providers-ui) | Plugin | [v0.1.3](https://github.com/NOirBRight/dsh-llm-providers-ui/tree/v0.1.3) | Active | Shared LLM Providers settings owner for provider cards, navigation, and persisted ordering across independent model plugins. | UI extension |
| [dsh-model-switch](https://github.com/NOirBRight/dsh-model-switch) | Plugin | [v0.4.5](https://github.com/NOirBRight/dsh-model-switch/tree/v0.4.5) | Active | Explicit routing for Main, Subagent, Composer, Plan Review, Web Search, and image generation without patching DSH Core. | UI extension |

### Assistant

| Entry | Type | Version | Status | Description | Disclosures |
|---|---|---:|---|---|---|
| [dsh-ainvestor](https://github.com/NOirBRight/dsh-ainvestor) | Plugin | [v0.1.1](https://github.com/NOirBRight/dsh-ainvestor/tree/v0.1.1) | Active | AiInvestor analysis copilot with A-share Chan theory, composite scoring, financials, and a local investment knowledge base exposed as Host tools. | Network, Third-party service, UI extension |
| [dsh-external-agents](https://github.com/NOirBRight/dsh-external-agents) | Plugin | [v0.2.2](https://github.com/NOirBRight/dsh-external-agents/tree/v0.2.2) | Active | External Agent control plane for Codex, Claude Code, Cursor Agent, and Antigravity adapters with settings and background job visibility. | Credentials, Network, Subprocess, UI extension |
| [dsh-llm-assistant](https://github.com/NOirBRight/dsh-llm-assistant) | Plugin | [v0.1.5](https://github.com/NOirBRight/dsh-llm-assistant/tree/v0.1.5) | Quarantined | Resident DeepSeek assistant seat with its own session history, reminders, handoffs, and on-demand read-only task reference. | Network, Session data, UI extension |
| [dsh-ponytail](https://github.com/NOirBRight/dsh-ponytail) | Plugin | [v0.2.1](https://github.com/NOirBRight/dsh-ponytail/tree/v0.2.1) | Active | Ponytail session modes and review skills with persisted mode controls, Native Subagent inheritance, and compact runtime prompts. | Session data, UI extension |

### Remote Access

| Entry | Type | Version | Status | Description | Disclosures |
|---|---|---:|---|---|---|
| [dsh-mobile](https://github.com/NOirBRight/dsh-mobile) | Companion app | [v1.1.4](https://github.com/NOirBRight/dsh-mobile/tree/v1.1.4) | Active | Android companion for your own DSH Host with QR pairing, end-to-end encrypted tunnel transport, official features, and a mobile layout. | Credentials, Network, Remote access |
| [dsh-mobile-pairing](https://github.com/NOirBRight/dsh-mobile-pairing) | Plugin | [v0.1.14](https://github.com/NOirBRight/dsh-mobile-pairing/tree/v0.1.14) | Active | DSH Mobile Host pairing with a loopback gateway, public endpoint discovery, WebRTC Direct, and encrypted tunnel fallback. | Credentials, Network, Remote access |

### Usage & Observability

| Entry | Type | Version | Status | Description | Disclosures |
|---|---|---:|---|---|---|
| [dsh-usage-monitor](https://github.com/NOirBRight/dsh-usage-monitor) | Plugin | [v0.2.10](https://github.com/NOirBRight/dsh-usage-monitor/tree/v0.2.10) | Active | Session-log usage dashboard for tokens, requests, output, and cache-hit rates, grouped by provider, model, or workspace. | Session data, UI extension |

## What these plugins do

The screenshots below show the Settings and conversation surfaces these plugins add. Each caption is a factual description of the pictured UI, not an endorsement of the named third-party services.

### LLM Providers

Add extra model providers into Settings → LLM Providers. After sign-in or API configuration, those models appear in the chat picker and can be routed independently.

![Settings → LLM Providers listing Cursor, Grok, Codex, Ollama Cloud, Command Code, and OpenCode Go.](docs/screenshots/llm-providers.jpg)

Settings → LLM Providers listing Cursor, Grok, Codex, Ollama Cloud, Command Code, and OpenCode Go.

Related entries: [dsh-llm-providers-ui](https://github.com/NOirBRight/dsh-llm-providers-ui), [dsh-llm-cursor](https://github.com/NOirBRight/dsh-llm-cursor), [dsh-llm-grok](https://github.com/NOirBRight/dsh-llm-grok), [dsh-llm-codex](https://github.com/NOirBRight/dsh-llm-codex), [dsh-llm-ollama](https://github.com/NOirBRight/dsh-llm-ollama), [dsh-llm-commandcode](https://github.com/NOirBRight/dsh-llm-commandcode), [dsh-llm-opencode-go](https://github.com/NOirBRight/dsh-llm-opencode-go)

### Model Switch

Assign different models to Main, Subagent, Composer, Plan Review, Web Search, and image generation. The change applies to new requests only; existing runs keep their original route.

![Settings → Model Switch with Grok as Main, OpenCode Go as Subagent, and Codex for Web Search and image generation.](docs/screenshots/model-switch.jpg)

Settings → Model Switch with Grok as Main, OpenCode Go as Subagent, and Codex for Web Search and image generation.

Related entries: [dsh-model-switch](https://github.com/NOirBRight/dsh-model-switch)

### Composer and Plan Review

The current routing plugin also owns the composer model picker and the plan-review card. You can switch Fast, context, effort, and the execution model before approving a plan. dsh-composer-picker provided the original picker and is now deprecated.

![Plan Review card with Discuss, Keep planning, and Approve, plus a popover to change the execution model and effort.](docs/screenshots/plan-review.jpg)

Plan Review card with Discuss, Keep planning, and Approve, plus a popover to change the execution model and effort.

![Composer popover with Model, Effort, Context, and Fast controls for GPT-5.6 Sol.](docs/screenshots/composer-picker.jpg)

Composer popover with Model, Effort, Context, and Fast controls for GPT-5.6 Sol.

Related entries: [dsh-model-switch](https://github.com/NOirBRight/dsh-model-switch), [dsh-composer-picker](https://github.com/NOirBRight/dsh-composer-picker)

### Mobile Remote

Pair a phone with this Host. dsh-mobile-pairing generates a short-lived QR code and encrypted tunnel; the Android app in dsh-mobile scans it and keeps the connection on your own machine.

![Settings → Remote generating an automatic connection address and pairing QR code.](docs/screenshots/mobile-remote.jpg)

Settings → Remote generating an automatic connection address and pairing QR code.

Related entries: [dsh-mobile-pairing](https://github.com/NOirBRight/dsh-mobile-pairing), [dsh-mobile](https://github.com/NOirBRight/dsh-mobile)

### Usage

Read token usage from session logs and chart it by provider, model, or workspace. It does not fetch subscription quotas from the providers.

![Settings → Usage dashboard showing token, request, output, and cache-hit totals by provider.](docs/screenshots/usage-monitor.jpg)

Settings → Usage dashboard showing token, request, output, and cache-hit totals by provider.

Related entries: [dsh-usage-monitor](https://github.com/NOirBRight/dsh-usage-monitor)

## Policy-specific notices

- **[dsh-llm-commandcode](https://github.com/NOirBRight/dsh-llm-commandcode)** — Chat uses the documented Provider API; optional quota reporting also reads unofficial account routes used by the official CLI.
- **[dsh-llm-cursor](https://github.com/NOirBRight/dsh-llm-cursor)** — Cursor staff treat this private-client access as against their Terms of Service. The account can be restricted or banned merely by installing, signing in, or sending chat.
- **[dsh-llm-ollama](https://github.com/NOirBRight/dsh-llm-ollama)** — Released and deployed on the Alpha.4 Host. The installed configuration and Settings load were verified; live discovery and chat are SKIP-QUOTA because the Ollama quota is exhausted.
- **[dsh-buddy](https://github.com/NOirBRight/dsh-buddy)** — Excluded from the Alpha.4 campaign because the current release has not completed the Alpha.4 migration and interaction validation. Keep using it only with its Alpha.1-compatible runtime.
- **[dsh-composer-picker](https://github.com/NOirBRight/dsh-composer-picker)** — This plugin has been absorbed by dsh-model-switch. Do not install both because they compete for the same picker seat.
- **[dsh-llm-assistant](https://github.com/NOirBRight/dsh-llm-assistant)** — Excluded from the Alpha.4 campaign because the current release has not completed the Alpha.4 migration and interaction validation. Keep using it only with its historical runtime-compatible release.
- **[dsh-ponytail](https://github.com/NOirBRight/dsh-ponytail)** — Newly deployed in the Alpha.4 campaign. Mode changes apply to new accepted steps and are recorded in the session log.
- **[dsh-mobile](https://github.com/NOirBRight/dsh-mobile)** — Requires dsh-mobile-pairing on the Host. The v1.1.4 release is a signed APK (versionCode 15) with the mobile layout and plugin settings surfaces.
- **[dsh-mobile-pairing](https://github.com/NOirBRight/dsh-mobile-pairing)** — The Alpha.4 release uses @dsh-mobile/e2e-tunnel v0.1.5. Existing device keys remain on the Host; QR, Direct, and Relay checks must be run against the paired mobile app.

## External upstream packages

- [dshmarket 1.40.0](https://www.npmjs.com/package/dshmarket/v/1.40.0) is an upstream package from [dsh-market/dsh-market](https://github.com/dsh-market/dsh-market), not published by this catalog. It was loaded and checked on the 3080 Alpha.4 profile; install it only as a controlled profile dependency.

## Install

Use the Latest command from [dist/index.json](dist/index.json) for routine updates. Use the fixed command when a deployment must be reproducible. Providers that depend on the shared UI owner list both commands in dependency order:

**Latest:**

    dsh plugin --profile web add --force https://github.com/NOirBRight/dsh-llm-providers-ui/releases/latest/download/dsh-llm-providers-ui-0.1.3.tgz
    dsh plugin --profile web add --force https://github.com/NOirBRight/dsh-llm-codex/releases/latest/download/dsh-llm-codex-0.3.8.tgz

**Fixed:**

    dsh plugin --profile web add --force https://github.com/NOirBRight/dsh-llm-providers-ui/releases/download/v0.1.3/dsh-llm-providers-ui-0.1.3.tgz
    dsh plugin --profile web add --force https://github.com/NOirBRight/dsh-llm-codex/releases/download/v0.3.8/dsh-llm-codex-0.3.8.tgz

Latest URLs follow the current versioned release asset and are refreshed with each catalog release. Fixed URLs point to a signed release tag. GitHub package build scripts may execute outside the agent sandbox, so review source and SHA256SUMS before installing.

## Mobile app

- [Download latest dsh-mobile-1.1.4.apk](https://github.com/NOirBRight/dsh-mobile/releases/latest/download/dsh-mobile-1.1.4.apk)
- [Download fixed dsh-mobile-1.1.4.apk](https://github.com/NOirBRight/dsh-mobile/releases/download/v1.1.4/dsh-mobile-1.1.4.apk)
- SHA-256: 05d0e9b8e5a02c85fc7d456ff3592c8de3379ba46e468d1a06834a18c534c4a7
- Host requirement: install dsh-mobile-pairing first.

## Data and maintenance

- catalog/*.json is the reviewed source.
- README.md, README.zh.md, and dist/index.json are generated.
- npm run verify:remote checks public visibility, tags, commit SHAs, package identity, plugin manifests, and companion release assets.

Catalog data is [CC0-1.0](DATA_LICENSE.md); repository tooling is [MIT](LICENSE).

## Disclaimer

The catalog records factual disclosures and is not a security certification. Service names and trademarks belong to their respective owners. Each entry remains subject to applicable provider terms.

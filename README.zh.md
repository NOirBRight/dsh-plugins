# NOirBRight DSH Plugins

[English](README.md) | 中文

[NOirBRight](https://github.com/NOirBRight) 发布的 DSH 插件独立机器可读目录。本项目与 DeepSeek 及各插件所涉及的第三方服务商无隶属关系，也不代表其认可或背书。

> **安全提示：** DSH 插件以当前用户权限执行，可能读取文件、凭据和会话数据，或访问网络。安装前请审查源码及披露标记。目录生成的安装命令均固定到不可变 commit。

## 插件

### 模型与 Provider

| 插件 | 版本 | 状态 | 简介 | 披露 |
|---|---:|---|---|---|
| [dsh-llm-codex](https://github.com/NOirBRight/dsh-llm-codex) | [v0.3.4](https://github.com/NOirBRight/dsh-llm-codex/tree/v0.3.4) | 维护中 | ChatGPT Codex 订阅登录、可排序模型目录、Fast 与 1M 变体、实时额度，以及可选搜索和图像工具。 | 凭据, 网络, OAuth, 第三方服务, 订阅账号 |
| [dsh-llm-commandcode](https://github.com/NOirBRight/dsh-llm-commandcode) | [v0.1.13](https://github.com/NOirBRight/dsh-llm-commandcode/tree/v0.1.13) | 维护中 | Command Code Provider API 聊天，模型发现和凭据存储均由 Host 持有，并提供 best-effort 订阅用量展示。 | 凭据, 网络, 第三方服务, 订阅账号, 非官方接口 |
| [dsh-llm-cursor](https://github.com/NOirBRight/dsh-llm-cursor) | [v0.2.11](https://github.com/NOirBRight/dsh-llm-cursor/tree/v0.2.11) | 维护中 | 非官方 Cursor 订阅登录与聊天，Host 持有 PKCE 凭据，并提供模型发现与订阅用量展示。 | 封号风险, 凭据, 网络, OAuth, 第三方服务, 订阅账号, 非官方接口 |
| [dsh-llm-grok](https://github.com/NOirBRight/dsh-llm-grok) | [v0.3.4](https://github.com/NOirBRight/dsh-llm-grok/tree/v0.3.4) | 维护中 | xAI Grok 订阅登录与 Responses 聊天，提供可配置模型、用量展示、服务端搜索和 Imagine 生图。 | 凭据, 网络, OAuth, 第三方服务, 订阅账号 |
| [dsh-llm-ollama](https://github.com/NOirBRight/dsh-llm-ollama) | [v0.6.12](https://github.com/NOirBRight/dsh-llm-ollama/tree/v0.6.12) | 维护中 | 通过 OpenAI 兼容适配器接入 Ollama Cloud 聊天，并提供原生模型发现及 Web Search、Fetch provider。 | 凭据, 网络, 第三方服务 |
| [dsh-llm-opencode-go](https://github.com/NOirBRight/dsh-llm-opencode-go) | [v0.1.13](https://github.com/NOirBRight/dsh-llm-opencode-go/tree/v0.1.13) | 维护中 | OpenCode Go 模型集成，按模型路由 Completions、Responses 或 Anthropic Messages，并提供发现和订阅用量。 | 凭据, 网络, 第三方服务, 订阅账号 |

### 界面

| 插件 | 版本 | 状态 | 简介 | 披露 |
|---|---:|---|---|---|
| [dsh-codex-sidebar](https://github.com/NOirBRight/dsh-codex-sidebar) | [v0.5.0](https://github.com/NOirBRight/dsh-codex-sidebar/tree/v0.5.0) | 维护中 | 为一条 DSH 主会话提供 Codex 风格右侧栏，Files、Review、Browser 与 Terminal 共用标签栏。 | 浏览器自动化, 网络, 子进程, 界面扩展 |
| [dsh-composer-picker](https://github.com/NOirBRight/dsh-composer-picker) | [v0.1.3](https://github.com/NOirBRight/dsh-composer-picker/tree/v0.1.3) | 已弃用 | 纯客户端后缀分组 Composer 模型选择器，带独立 Plan Review，不依赖具体 Provider 运行时。 | 界面扩展 |
| [dsh-model-switch](https://github.com/NOirBRight/dsh-model-switch) | [v0.4.1](https://github.com/NOirBRight/dsh-model-switch/tree/v0.4.1) | 维护中 | 为 Main、Subagent、Composer、Plan Review、Web Search 和图像生成提供显式路由，不修改 DSH Core。 | 界面扩展 |

### 助手

| 插件 | 版本 | 状态 | 简介 | 披露 |
|---|---:|---|---|---|
| [dsh-llm-assistant](https://github.com/NOirBRight/dsh-llm-assistant) | [v0.1.5](https://github.com/NOirBRight/dsh-llm-assistant/tree/v0.1.5) | 维护中 | 常驻 DeepSeek 助手席位，拥有独立会话历史、提醒、交接和按需只读任务引用。 | 网络, 会话数据, 界面扩展 |

### 远程访问

| 插件 | 版本 | 状态 | 简介 | 披露 |
|---|---:|---|---|---|
| [dsh-mobile-pairing](https://github.com/NOirBRight/dsh-mobile-pairing) | [v0.1.10](https://github.com/NOirBRight/dsh-mobile-pairing/tree/v0.1.10) | 维护中 | DSH Mobile Host 配对插件，提供回环网关、公网端点发现、WebRTC Direct 和加密隧道回退。 | 凭据, 网络, 远程访问 |

### 用量与可观测性

| 插件 | 版本 | 状态 | 简介 | 披露 |
|---|---:|---|---|---|
| [dsh-usage-monitor](https://github.com/NOirBRight/dsh-usage-monitor) | [v0.2.6](https://github.com/NOirBRight/dsh-usage-monitor/tree/v0.2.6) | 维护中 | 会话日志用量看板，展示 token、请求、输出和缓存命中率，并按供应商、模型或工作区分组。 | 会话数据, 界面扩展 |

## 特定政策提示

- **[dsh-llm-commandcode](https://github.com/NOirBRight/dsh-llm-commandcode)** — 聊天使用文档化 Provider API；可选额度展示还会读取官方 CLI 使用的非公开账户接口。
- **[dsh-llm-cursor](https://github.com/NOirBRight/dsh-llm-cursor)** — Cursor 员工认定此类私有客户端访问违反其服务条款。仅安装、登录或发送聊天就可能导致账号受限或封禁。
- **[dsh-composer-picker](https://github.com/NOirBRight/dsh-composer-picker)** — 该插件已并入 dsh-model-switch。请勿同时安装，两者会竞争同一个选择器位置。

## 安装

使用 [dist/index.json](dist/index.json) 中固定 commit 的命令。例如：

    dsh plugin --profile web add github:NOirBRight/dsh-llm-codex#95aadccdb1222081d3bff702de3671216e8ddbd3

从 GitHub 安装时，包构建脚本可能在 agent 沙箱之外执行。固定 commit 可避免分支后续变化静默替换安装代码，但不代表代码本身安全。

## 数据与维护

- catalog/*.json 是经审核的数据源。
- README.md、README.zh.md 与 dist/index.json 均由脚本生成。
- npm run verify:remote 检查仓库公开性、最新 tag、commit SHA、包身份、MIT 声明和 dsh.bundle manifest。

目录数据采用 [CC0-1.0](DATA_LICENSE.md)，仓库工具代码采用 [MIT](LICENSE)。

## 免责声明

本目录记录事实性披露，不构成安全认证。服务名称及商标归各自权利人所有；插件使用仍受对应服务商条款约束。

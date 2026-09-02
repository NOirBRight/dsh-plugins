# Alpha.4 发布与 3080 验收记录

记录时间：2026-09-03（Asia/Shanghai）。官方 Runtime 固定为 `dsh-v0.1.2-alpha.4`，commit `4e84901e6471b79ec0338099867ebb4606d12bb5`；Cordis 固定为 `4.0.2`。本记录只保存版本、校验和、状态和路径，不保存凭据、令牌、模型输出或设备密钥。

## 发布资产

| 项目 | 版本 | 资产 SHA-256 | Release |
| --- | --- | --- | --- |
| dsh-e2e-tunnel | 0.1.5 | `d1bfedf3e6b2a614a3e4e70d260867b82ba9d509881e1f12e9b2284506a047a6` | [v0.1.5](https://github.com/NOirBRight/dsh-e2e-tunnel/releases/tag/v0.1.5) |
| dsh-llm-providers-ui | 0.1.3 | `751a669d5f66725bb3160beea4e607f13a5dd4797525931394bdfbc0676690b2` | [v0.1.3](https://github.com/NOirBRight/dsh-llm-providers-ui/releases/tag/v0.1.3) |
| dsh-llm-codex | 0.3.8 | `f42962eed0517ec2f0345b65745a7e83d801b72388f1ced89bb4284620de3fa7` | [v0.3.8](https://github.com/NOirBRight/dsh-llm-codex/releases/tag/v0.3.8) |
| dsh-llm-commandcode | 0.1.17 | `fa21d9f31add7f6872bba5794fbc9e9fc3c2ff496d7024cda785fba6a4258c2e` | [v0.1.17](https://github.com/NOirBRight/dsh-llm-commandcode/releases/tag/v0.1.17) |
| dsh-llm-cursor | 0.2.15 | `68d0a38623528dbe2066b81edac3ef30537014dfd74f442a1cba2a19144c40e5` | [v0.2.15](https://github.com/NOirBRight/dsh-llm-cursor/releases/tag/v0.2.15) |
| dsh-llm-grok | 0.3.8 | `067cae3ffad11631efaea221da250b75dc0d0781f543d8ceea784909ed72b731` | [v0.3.8](https://github.com/NOirBRight/dsh-llm-grok/releases/tag/v0.3.8) |
| dsh-llm-ollama | 0.6.16 | `df4d662ad1420b1829e4edb81df0f8918c27d9a9e7f53fb89b9df8e995e6c08c` | [v0.6.16](https://github.com/NOirBRight/dsh-llm-ollama/releases/tag/v0.6.16) |
| dsh-llm-opencode-go | 0.1.17 | `250312ca956a53fd5b43296ff95b6eb13259d1a35bf7abefb9b78828e34e5177` | [v0.1.17](https://github.com/NOirBRight/dsh-llm-opencode-go/releases/tag/v0.1.17) |
| dsh-model-switch | 0.4.5 | `a5e663996b9a69c74999d98004478933838fbc541b7ac760b29bff0e64926eae` | [v0.4.5](https://github.com/NOirBRight/dsh-model-switch/releases/tag/v0.4.5) |
| dsh-external-agents | 0.2.2 | `ecd161e20cd1da9b44c440302a341926b31be7237a6d171b4a3792d821cd4bc5` | [v0.2.2](https://github.com/NOirBRight/dsh-external-agents/releases/tag/v0.2.2) |
| dsh-ponytail | 0.2.1 | `4d819f32c2da7b5169bb3f2e3cc4afaff58450091b7c70c12557b7c2798e0e40` | [v0.2.1](https://github.com/NOirBRight/dsh-ponytail/releases/tag/v0.2.1) |
| dsh-usage-monitor | 0.2.10 | `0dca37aa819fed543ee762779e34604c257b0ffff378220875709dd790993fa3` | [v0.2.10](https://github.com/NOirBRight/dsh-usage-monitor/releases/tag/v0.2.10) |
| dsh-codex-sidebar | 0.5.11 | `c8ab92b80719a94811ffd8c8c973ae6f0fc248bf5b828f1769612b5ba1020939` | [v0.5.11](https://github.com/NOirBRight/dsh-codex-sidebar/releases/tag/v0.5.11) |
| dsh-ainvestor | 0.1.1 | `a0a8117106c10fd0ebf8e5eeafb2db58735995386d7312f210f93ea5844e92b9` | [v0.1.1](https://github.com/NOirBRight/dsh-ainvestor/releases/tag/v0.1.1) |
| dsh-mobile-pairing | 0.1.14 | `ffcf9024ff37020fe29ea524781f9c7bc457e2adbc0427b364c3fded3d41a0a1` | [v0.1.14](https://github.com/NOirBRight/dsh-mobile-pairing/releases/tag/v0.1.14) |
| dsh-mobile APK | 1.1.4 / code 15 | `05d0e9b8e5a02c85fc7d456ff3592c8de3379ba46e468d1a06834a18c534c4a7` | [v1.1.4](https://github.com/NOirBRight/dsh-mobile/releases/tag/v1.1.4) |

每个 Release 均重新上传了 `SHA256SUMS`，并以带 GitHub 登录态的 `npm run verify:remote` 校验 tag、tag commit、manifest、Release 资产和 SHA-256。

## 3080 生产面

- 旧完整 Home 已原子归档到 `/home/noirbright/.dsh-alpha1-archive-20260903T011500CST`；切换备份和 checkpoint 在 `/home/noirbright/.dsh-backups/alpha4-cutover-20260903T011500CST`。
- 当前 `dsh-web.service` 使用 Alpha.4 staging，端口仍为 3080；生产 profile 只使用正式 Release tarball/npm 资产，无 `link:`、`workspace:`、源码路径或 `NODE_PATH`。
- Provider Settings、credentials 引用、OAuth/CLI 登录文件、Mobile pairing key、External Agent probe cache 和 Usage Monitor SQLite 已按原权限迁入；日志只记录 provider 名和结果，不记录值。
- 当前 profile 包含 Providers UI、Codex、CommandCode、Cursor、Grok、Ollama、OpenCode Go、Model Switch、External Agents、Ponytail、Usage Monitor、Sidebar、AiInvestor、Mobile Pairing、e2e tunnel 与 dshmarket；Buddy、Assistant、Composer Picker 未安装。

## 波次结果

| 波次 | 结果 | 证据与限制 |
| --- | --- | --- |
| Base | PASS | Alpha.4 `--version`、service、profile plugin list、Cordis 4.0.2 和无旧 DSH 版本依赖检查通过。 |
| A / Providers UI + Codex + Model Switch | PASS（装配 smoke） | 资产安装、Settings/credential 回读、manifest closure 和 service 重启通过；完整浏览器交互不在无浏览器连接的当前执行面。 |
| B1–B4 / OpenCode Go、Grok、Cursor、CommandCode | PASS（装配 smoke） | 正式包、迁移鉴权引用、resolver 和服务健康通过；需真实 Provider API 时按 provider 额度/授权单独记录。 |
| B5 / Ollama | SKIP-QUOTA | 插件加载、Settings 和配置回读通过；真实 discovery/chat/Ollama Cloud 不执行，额度耗尽。 |
| C / External Agents | PASS（CLI smoke） | 四个 CLI probe 和前台 `EXT_E2E_OK` 通过；Codex 后台完成/取消后无残留子进程。完整 Job Panel 交互仍需浏览器连接。 |
| D1 / Ponytail | PASS（装配 smoke） | Alpha.4 包、默认 mode 和持久化读取通过；完整触控/窄屏视觉场景需浏览器连接。 |
| D2 / Usage Monitor | PASS（存储 smoke） | 现有 SQLite WAL 保留、包加载和 profile 重启通过；完整图表交互需浏览器连接。 |
| D3 / Sidebar | PASS（装配 smoke） | 正式包和 service 生命周期通过；Files/Browser/Terminal 全量操作需浏览器连接。 |
| D4 / AiInvestor | PASS | `127.0.0.1:8766` 后端健康，13 个工具注册；股票 `600519` 的 snapshot、Chan、analysis、financials、valuation 请求返回 JSON，attach 不终止后端。 |
| E1 / Pairing | PASS（Host smoke） | QR 页面 HTTP 200、QR markup/CSS、offer 字段、Cloudflare quick endpoint 和 devices endpoint 通过；Direct/Relay 真机链路未完成。 |
| E2 / Mobile | BLOCKED-DEVICE-LOCK | 签名 APK 安装、冷启动、versionName 1.1.4/versionCode 15 通过；物理设备当前处于锁屏，Settings、模型、Ponytail、External Job、Sidebar、图片及 Direct/Relay 全量场景不能在不取得解锁操作的前提下执行。 |
| F / dshmarket 1.40.0 | PASS | 3080 sidecar 的 status、registry、installed、check 均 HTTP 200；check 报告无 error/warning。它是外部上游包，不由本目录发布。 |

未记录 Session ID 的条目是 CLI/HTTP/装配 smoke，而非虚构的浏览器会话。手机解锁或提供可用浏览器自动化连接后，只需重跑 E1/E2 的阻塞场景；无需回滚已通过的插件波次。

# Alpha.4 发布兼容性说明

本次迁移版插件只兼容 DeepSeek Harness `0.1.2-alpha.4`，并要求 `@deepseek-ai/cordis@4.0.2`。Alpha.1、Alpha.2、Alpha.3 与 Alpha.4 之间存在 Settings、Remote 错误、Session header/读取、Subagent continuation 和 Client API 变化；迁移版不提供旧版本 shim，也不承诺旧 Session 原地恢复。

因此每个迁移版 catalog 条目的 `dshCompatibility` 必须声明为 `=0.1.2-alpha.4`，不能继续使用覆盖 Alpha.1 或旧 rc 的宽范围。catalog 只记录已发布、可复现下载且通过源码/打包/隔离 consumer 门禁的版本；真实 Provider、CLI、浏览器或设备场景的阻塞必须在 campaign 证据中单独标记，不能改写为 PASS。本次 campaign 明确排除的 Buddy 与 Assistant 保留原有兼容声明，并标为隔离，不得借本次迁移提前宣称 Alpha.4 支持。

仍运行 Alpha.1、Alpha.2 或 Alpha.3 的用户应继续使用该 Harness 版本最后一个兼容的旧插件版本，并固定旧插件 tag；不要把本次 Alpha.4 tarball 安装到旧 Runtime，也不要仅升级单个插件。升级到 Alpha.4 时，应先备份 profile 和 Session，再按兼容 Alpha.4 的 Runtime、插件集合和新 profile 一起切换。旧 Session 由旧 Runtime 导出或归档，Alpha.4 不承诺直接续跑。

发布说明必须同时列出：新版本的精确兼容范围、明确不兼容 Alpha.1–Alpha.3、旧 Runtime 用户应保留的旧插件 tag、Alpha.2 历史 Session 的归档/导出限制，以及回滚到旧 Runtime 和旧插件集合的步骤。

本次 Alpha.4 catalog 还记录了 `dshmarket 1.40.0` 外部上游包；它在 3080 的 Alpha.4 profile 中完成加载和依赖检查，但不由本项目发布。`dsh-llm-ollama` 的安装和配置恢复已通过，真实 API 因额度耗尽记为 `SKIP-QUOTA`。

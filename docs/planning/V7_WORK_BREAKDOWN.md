# V7 Work Breakdown and Dependency Plan

**状态：PLANNING / RECONSTRUCTION CONTRACT。所有项均需独立 OTP 授权后才可实施。**

## 不可变前提

- 冻结基线 SHA256：`CBAFBB0FB3944071E7C8605037F7BE2ABA9389047CC36E2AD1767B5444CE21EC`。
- Dashboard 持有接口合同和无状态适配职责；ObserverOS 持有所有数据库和权威结论。
- `REUSE` 不得重写；`WRAP` 只能添加 V7 外观、已验证的 OS 数据绑定、身份显化和冻结交互；`CUSTOM` 必须具备 GitHub 复用研究证据。
- 当前阶段不创建数据库、不调用模型、不接入凭据、不部署。

## 工作包与依赖

| ID | 工作包 | V7 范围 / REQ | 责任 | 前置条件 | 当前状态 |
|---|---|---|---|---|---|
| WP-00 | 基线证据 | 全局、PC/手机截图、DOM 映射 | Dashboard | Owner 确认截图夹具 | HOLD_VISUAL_FIXTURES |
| WP-01 | 接口总合同 | 全部数据模块 | Dashboard | ObserverOS 字段/权限/时效确认 | HOLD_INTERFACE_CONTRACT |
| WP-02 | Mock 与负向夹具 | 全部 API 包络 | Dashboard | WP-01 | HOLD |
| WP-03 | 共享壳层 | REQ-001–006 | Dashboard | WP-00、依赖锁定 | HOLD |
| WP-04 | DAILY：观测 | REQ-007–012 | Dashboard | daily/observation 合同 | HOLD |
| WP-05 | DAILY：网站工作流 | REQ-013–016 | Dashboard | 网站预约新语义与回写确认 | HOLD_BOOKING_SEMANTICS |
| WP-06 | DAILY：工作与摘要 | REQ-017–024 | Dashboard | DailySurface/Trend 读取合同 | HOLD |
| WP-07 | WEEKLY：重要日历 | REQ-025–026 | Dashboard | calendar 合同 | HOLD |
| WP-08 | WEEKLY：人员、安全、库存 | REQ-027–031 | Dashboard | weekly-operations 合同 | HOLD |
| WP-09 | WEEKLY：财务 | REQ-032–033 | Dashboard | 权限范围、预计算财务视图 | HOLD |
| WP-10 | INSIGHT：经营分析 | REQ-034–036 | Dashboard | OS 分析结果合同 | HOLD |
| WP-11 | INSIGHT：健康与治理 | REQ-037–038 | Dashboard | 字段分级/脱敏规则 | HOLD |
| WP-12 | INSIGHT：会计 | REQ-039–040 | Dashboard | 外部工作流及 OS 确认合同 | HOLD |
| WP-13 | 验收门 | 视觉、交互、权限、API mock、负向测试 | Dashboard + Owner | WP-03–12 | HOLD |

## 三页冻结顺序

### DAILY

`Header → TaskMarquee → DynamicModuleStack → Observation → Website → Work → CurrentSummary`

- 动态置顶只能使用 ObserverOS 返回的模块顺序、原因和来源；前端不得计算优先级。
- 摄像头只接受 OS 授权的媒体引用；禁止浏览器直连 NVR/RTSP。
- 客服预约只有获得 OS 确认 ID 后才能显示为权威状态。

### WEEKLY

`ImportantCalendar → PeopleSecurity → Inventory → FinancialReport`

四个顶层模块顺序固定。日期、比较器、筛选和分页仅是本地 UI 状态；所有结果均由 OS 预计算后返回。

### INSIGHT

`BusinessAnalysis → ObserverHealth → Accounting`

分析文字、建议、注意事项、健康与 GST 均是 OS 输出；Dashboard 只渲染并显示来源、时效、权限及限制。

## 接口缺口关闭顺序

1. `daily-surface`：先确认可读字段与完整性/来源语义，形成最小读取合同。
2. `website-workflow`：单独定义未来预约请求、回写和 OS 确认；不得复用现有生命周期 `BOOKING`。
3. `daily-observation`：媒体授权与安全引用合同，之后才考虑摄像头栅格。
4. `weekly-*`、`insight-*`：按字段分级、权限和预计算视图扩展。
5. 每个合同先有 Mock/负向测试，后有页面 WRAP。

## 不得重复开发的既有能力

- DailySurface、TrendArtifact、有效服务投影、生命周期、健康心跳、Owner Access、Action Audit、视频源投影均由 ObserverOS 保留。
- Dashboard 不建第二个数据库、不建第二个 KPI/财务/健康引擎、不建第二个权限/审计系统、不重写日历/表格/轮播等成熟引擎。

## OTP 最小粒度

一个 OTP 只应覆盖一个工作包和其明确路径。例如先完成 `WP-01 daily-surface read-contract`，不得同时加入页面、数据库、预约语义或部署。每份 OTP 必须绑定需求 ID、允许路径、上游合同版本、测试证据和 PASS/HOLD/FAIL 判定。

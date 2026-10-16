# Dashboard Interface Ownership Contract

**状态：PLANNING / CONTRACT ONLY。接口名称是需求占位，不声称 ObserverOS 已提供这些 API。**

## 1. 所有权模型

| 项目 | Dashboard | ObserverOS |
|---|---|---|
| 接口 URL、版本、OpenAPI、请求校验、适配器、Mock | 负责 | 提供受控上游能力或批准的读取通道 |
| 数据库、事实、指标、排名、财务、健康与分析 | 不得保存或计算 | 唯一权威 |
| 身份/权限 | 只展示经验证的结果 | 唯一决策者与审计者 |
| 缓存 | 短期、可丢弃、标明 OS freshness | 事实时效与缓存许可的权威 |
| 外部客服/图片/Daily Roast | 提供 UI 与无状态转送 | 接收确认回写后才形成权威记录 |

Dashboard 的 Interface Gateway 可以由本仓库实现，但必须无状态：不得有业务表、队列真相、指标表、角色表、审计主账或模型推理。每个响应必须原样保留 ObserverOS 的身份、许可、时效和来源语义。

## 2. 统一响应包络（待 ObserverOS 批准）

```json
{
  "schema_version": "1.0",
  "request_id": "opaque-id",
  "as_of": "RFC3339 timestamp or null",
  "freshness": "FRESH | STALE | UNKNOWN",
  "permission": "GRANTED | DENIED | UNKNOWN",
  "status": "OK | EMPTY | ERROR | PENDING",
  "data": {},
  "provenance": [],
  "error": {"code": "safe-code", "message": "safe-message"}
}
```

`EMPTY`、`STALE`、`UNKNOWN`、`ERROR`、`PERMISSION` 必须在 V7 分开显示。Dashboard 禁止将空值显示为零、将缓存显示为当前、或将拒绝权限显示为“无数据”。

## 3. V7 接口族（均为 HOLD，直至 ObserverOS 合同批准）

| API family / proposal | V7 覆盖 | 上游所需权威结果 | 当前缺口 |
|---|---|---|---|
| `daily-surface` | DAILY KPI、任务、比较、工作记录 | DailySurface、限制、完整性、来源 | 无 HTTP/API schema 证据 |
| `daily-observation` | 摄像头槽位、告警、房态 | 经授权媒体引用、告警、房态 | 无媒体授权/字段合同 |
| `website-workflow` | 客服、预约请求、Daily Roast、流量 | 外部请求状态、OS 确认 ID | 预约语义与外部合同缺失 |
| `weekly-calendar` | 日历与过滤 | OS 事件与许可 | 无浏览器 API contract |
| `weekly-operations` | 人员、安全、库存、财务 | 预计算视图与基础来源 | 访问范围/分页/schema 缺失 |
| `insight-results` | 趋势、分析、建议、关注项 | OS 计算完成的分析结果 | 版本、解释、授权字段缺失 |
| `health-governance` | 心跳、服务健康、治理资料 | 经授权健康/治理投影 | 公开字段与泄漏控制缺失 |
| `accounting-view` | 余额、GST、发票工作流 | OS 会计结果与外部确认 | 上传/确认/权限合同缺失 |

## 4. 预约的特别规则

现有 ObserverOS `BOOKING` 生命周期不是网站未来预约。因此 `website-workflow` 不得映射为 `BOOKING`。在 Owner 批准新的“网站预约请求”语义、写回事件和确认响应前，V7 只能显示外部请求为 `PENDING` 或 `UNCONFIRMED`，不得称为已预约。

## 5. 接口实施准入

每一个接口族实施前必须有：Owner 批准的 schema、ObserverOS 上游责任人、身份和权限语义、字段分级、时效规则、分页/限流、错误码、审计引用、Mock fixture、正负向测试。缺少任一项即 `HOLD_INTERFACE_CONTRACT`。

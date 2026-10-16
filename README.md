# ObserverOS Dashboard

**状态：PLANNING / RECONSTRUCTION CONTRACT。不是编码、部署、数据迁移或生产访问授权。**

本仓库对应唯一工作目录 `E:\dashboard` 与 GitHub 仓库 `escortrogersyd3-dot/dashboard`。

## 边界

- Dashboard 负责：冻结 V7 的视觉重建、版本化接口规格、无状态接口适配器、请求/响应 mock、页面状态、语言和可访问性测试。
- ObserverOS 负责：全部数据库、业务事实、业务计算、AI 分析、权限决定、审计记录、时效判断和权威状态。
- Dashboard 不得持有业务数据库，不得计算 KPI/GST/排名/健康/安全结论，不得产生权威预约或独立权限判断。
- Dashboard 可拥有一个无状态的 Interface Gateway；它只能验证并转送已授权请求，保留 ObserverOS 返回的 `freshness`、`permission`、`provenance` 和错误语义，不能补值或推断。

## 规划入口

- [V7 拆分与交付依赖](docs/planning/V7_WORK_BREAKDOWN.md)
- [ObserverOS 缺口清单](docs/planning/OBSERVEROS_GAP_REGISTER.csv)
- [Dashboard 接口所有权合同](docs/contracts/DASHBOARD_INTERFACE_OWNERSHIP.md)
- [最终离线 V7 预览](public/observeros-v7-offline-preview.html)（可直接本地打开；保留 `HOLD_LIVE_INTEGRATION`）

## 冻结基线

`ObserverOS_PinkHouse_V7_Full_Responsive_Demo.html`

SHA256: `CBAFBB0FB3944071E7C8605037F7BE2ABA9389047CC36E2AD1767B5444CE21EC`

任何模块顺序、交互、页面层级、视觉或响应式变更须走 Change Request；本仓库的规划文件不构成该批准。

import { AppShell, PresentationState, type PresentationStateKind } from "../src/ui/interface-core";

const hierarchy: ReadonlyArray<{ page: string; title: string; detail: string; state: PresentationStateKind }> = [
  { page: "DAILY", title: "01 · 当前待办与动态置顶", detail: "等待经授权的事件和时效；不计算优先级。", state: "EMPTY" },
  { page: "DAILY", title: "02 · 现场观察", detail: "六槽视觉位置保留；不接入媒体、摄像头或人员信息。", state: "UNKNOWN" },
  { page: "DAILY", title: "03 · 房间与工作状态", detail: "需要 ObserverOS 房间与工作流投影。", state: "UNKNOWN" },
  { page: "DAILY", title: "04 · 网站预约与客服", detail: "未来确认须先回写 ObserverOS；Dashboard 不提交预约。", state: "EMPTY" },
  { page: "DAILY", title: "05 · 工单与动态经营", detail: "不计算比较、排名、预测或经营指标。", state: "UNKNOWN" },
  { page: "WEEKLY", title: "重要日历", detail: "需要经授权的周历事件投影。", state: "EMPTY" },
  { page: "WEEKLY", title: "人员 / 安防 / 库存", detail: "仅未来分类后的匿名聚合可显示。", state: "PERMISSION" },
  { page: "WEEKLY", title: "财务报表", detail: "不显示金额、账本、付款、GST 或本地计算。", state: "PERMISSION" },
  { page: "INSIGHT", title: "经营分析、建议与重点关注", detail: "Dashboard 不生成分析、建议、预测或评分。", state: "EMPTY" },
  { page: "INSIGHT", title: "Observer OS 系统健康与治理", detail: "不显示设备、心跳、访问名单或审计细节。", state: "UNKNOWN" },
  { page: "INSIGHT", title: "私人记账、发票与 GST", detail: "无金额、文件控件、OCR、上传、付款或写入。", state: "PERMISSION" },
];

const pages = ["DAILY", "WEEKLY", "INSIGHT"] as const;

export default function Home() {
  return <AppShell activeSection="daily">
    <section className="v7-fidelity-intro" aria-labelledby="hierarchy-title"><p>PLANNING / RECONSTRUCTION CONTRACT</p><h2 id="hierarchy-title">Frozen V7 module hierarchy · V7 fidelity shell</h2><span>OFFLINE · MOCK-ONLY · HOLD LIVE INTEGRATION</span></section>
    {pages.map((page) => <section className="v7-hierarchy-group" key={page} aria-labelledby={page + "-title"}><div className="v7-group-head"><h2 id={page + "-title"}>{page}</h2><span>{page === "DAILY" ? "当前态势" : page === "WEEKLY" ? "周度视图" : "洞察与治理"}</span></div><div className="v7-fidelity-grid">{hierarchy.filter((module) => module.page === page).map((module) => <article className="v7-fidelity-card" key={module.title}><h3>{module.title}</h3><p>{module.detail}</p><PresentationState state={module.state} /></article>)}</div></section>)}
    <section className="v7-fidelity-camera-shell" aria-labelledby="camera-shell-title"><div><h3 id="camera-shell-title">DAILY · 现场观察六槽</h3><p>冻结 V7 网格位置；只有空的不透明来源引用。</p></div><div className="v7-fidelity-cameras">{["CAM01","CAM02","CAM03","CAM05","CAM11","CAM14"].map((camera, index) => <article className={index < 2 ? "v7-camera is-waiting" : "v7-camera"} key={camera}><strong>{camera}</strong><span>EMPTY · opaque reference required</span></article>)}</div></section>
  </AppShell>;
}

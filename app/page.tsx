import { AppShell, PresentationState } from "../src/ui/interface-core";

const rails = [
  { title: "当前工作面", state: "UNKNOWN" as const, detail: "V7 结构卡片。没有已验证事件、提醒或优先级。" },
  { title: "模块轨道", state: "EMPTY" as const, detail: "等待 ObserverOS 投影；Dashboard 不创建业务记录。" },
  { title: "时效与权限", state: "PERMISSION" as const, detail: "未来由 ObserverOS 提供，不在浏览器决定。" },
];

export default function Home() {
  return (
    <AppShell activeSection="daily">
      <section className="v7-fidelity-intro" aria-labelledby="fidelity-title">
        <p>PLANNING / RECONSTRUCTION CONTRACT</p>
        <h2 id="fidelity-title">V7 fidelity shell</h2>
        <span>OFFLINE · MOCK-ONLY · HOLD LIVE INTEGRATION</span>
      </section>
      <section className="v7-fidelity-grid" aria-label="V7 structural rails">
        {rails.map((rail) => <article className="v7-fidelity-card" key={rail.title}><h3>{rail.title}</h3><p>{rail.detail}</p><PresentationState state={rail.state} /></article>)}
      </section>
      <section className="v7-fidelity-camera-shell" aria-labelledby="camera-shell-title">
        <div><h3 id="camera-shell-title">六槽视觉区域</h3><p>冻结 V7 的卡片比例与桌面/手机网格；没有媒体或摄像头连接。</p></div>
        <div className="v7-fidelity-cameras">{["CAM01","CAM02","CAM03","CAM05","CAM11","CAM14"].map((camera, index) => <article className={index < 2 ? "v7-camera is-waiting" : "v7-camera"} key={camera}><strong>{camera}</strong><span>EMPTY · opaque reference required</span></article>)}</div>
      </section>
    </AppShell>
  );
}

import type { ReactNode } from "react";

export const V7_BREAKPOINTS = [600, 880, 1180] as const;

const navigation = [
  { id: "daily", label: "01 DAILY", chinese: "日常", vietnamese: "Hằng ngày" },
  { id: "weekly", label: "02 WEEKLY", chinese: "每周", vietnamese: "Hàng tuần" },
  { id: "insight", label: "03 INSIGHT", chinese: "洞察", vietnamese: "Phân tích" },
] as const;

const roles = [
  { label: "店内终端", note: "Mock-only 空态" },
  { label: "经理白名单", note: "未来身份语义" },
  { label: "Owner 私人", note: "受控写入 HOLD" },
] as const;

export type ShellSection = (typeof navigation)[number]["id"];
export type PresentationStateKind = "LOADING" | "EMPTY" | "STALE" | "UNKNOWN" | "ERROR" | "PERMISSION";

const stateCopy: Record<PresentationStateKind, { title: string; detail: string }> = {
  LOADING: { title: "LOADING", detail: "等待经许可的 ObserverOS 响应。" },
  EMPTY: { title: "EMPTY", detail: "没有已连接的权威数据。" },
  STALE: { title: "STALE", detail: "未来响应必须显式提供时效。" },
  UNKNOWN: { title: "UNKNOWN", detail: "Dashboard 不推断状态、权限或业务含义。" },
  ERROR: { title: "ERROR", detail: "未来响应必须提供安全错误引用。" },
  PERMISSION: { title: "PERMISSION", detail: "Dashboard 不决定访问；仅显化 ObserverOS 结果。" },
};

export function PresentationState({ state }: { state: PresentationStateKind }) {
  const copy = stateCopy[state];
  return <aside className="state-panel" aria-live={state === "LOADING" ? "polite" : undefined} aria-label={state}><strong>{copy.title}</strong><p>{copy.detail}</p></aside>;
}

function Navigation({ activeSection, mobile = false }: { activeSection: ShellSection; mobile?: boolean }) {
  return <nav className={mobile ? "v7-bottom-nav" : "v7-nav"} aria-label={mobile ? "Mobile dashboard sections" : "Dashboard sections"}>
    {navigation.map((item) => <span className={["v7-nav-item", item.id === activeSection ? "is-active" : ""].filter(Boolean).join(" ")} key={item.id} aria-current={item.id === activeSection ? "page" : undefined} aria-label={item.label + ": " + item.chinese + " / " + item.vietnamese}>{item.label}{item.id === "insight" && !mobile ? <b>私人</b> : null}</span>)}
  </nav>;
}

export function AppShell({ activeSection, children }: { activeSection: ShellSection; children: ReactNode }) {
  return <div className="v7-shell">
    <aside className="v7-sidebar" aria-label="Desktop presentation navigation">
      <div className="v7-brand"><strong>Observer OS</strong><span>Pink House · V7</span><small>低眩光深灰 / 中国红告警 / 橙色经营指标</small></div>
      <div><p className="v7-side-label">展示角色 · 非真实登录</p><div className="v7-role-list">{roles.map((role, index) => <div className={["v7-role", index === 0 ? "is-active" : ""].filter(Boolean).join(" ")} key={role.label}><span>{role.label}</span><small>{role.note}</small></div>)}</div></div>
      <div><p className="v7-side-label">导航</p><Navigation activeSection={activeSection} /></div>
      <p className="v7-provenance">Australia/Sydney<br />所有模块为 Mock-only 空态。<br /><br />ObserverOS 是未来唯一事实来源：数据库、计算、权限、审计与权威状态均不在本展示页。</p>
    </aside>
    <div className="v7-stage">
      <header className="v7-mast"><div><h1>DAILY · 当前态势</h1><p>冻结 V7 表面外壳 · 无已连接业务数据</p></div><div className="v7-toolbar"><span>LOCAL · PRESENTATION ONLY</span><span>▷ 自动巡查 · HOLD</span><span>手动模式</span></div></header>
      <main className="v7-content">{children}</main>
    </div>
    <Navigation activeSection={activeSection} mobile />
  </div>;
}

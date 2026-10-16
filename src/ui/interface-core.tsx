"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

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
type Surface = "drawer" | "dialog" | null;

export type OfflinePresentationFixture = Readonly<{ state: PresentationStateKind; data: null }>;

export const OFFLINE_PRESENTATION_FIXTURES: Readonly<Record<PresentationStateKind, OfflinePresentationFixture>> = {
  LOADING: { state: "LOADING", data: null },
  EMPTY: { state: "EMPTY", data: null },
  STALE: { state: "STALE", data: null },
  UNKNOWN: { state: "UNKNOWN", data: null },
  ERROR: { state: "ERROR", data: null },
  PERMISSION: { state: "PERMISSION", data: null },
};

const stateCopy: Record<PresentationStateKind, { title: string; chinese: string; vietnamese: string }> = {
  LOADING: { title: "LOADING", chinese: "等待经许可的 ObserverOS 响应。", vietnamese: "Đang chờ phản hồi ObserverOS đã được cấp quyền." },
  EMPTY: { title: "EMPTY", chinese: "没有已连接的权威数据。", vietnamese: "Không có dữ liệu có thẩm quyền đã được kết nối." },
  STALE: { title: "STALE", chinese: "未来响应必须显式提供时效。", vietnamese: "Phản hồi trong tương lai phải nêu rõ độ mới của dữ liệu." },
  UNKNOWN: { title: "UNKNOWN", chinese: "Dashboard 不推断状态、权限或业务含义。", vietnamese: "Dashboard không suy diễn trạng thái, quyền hoặc ý nghĩa nghiệp vụ." },
  ERROR: { title: "ERROR", chinese: "未来响应必须提供安全错误引用。", vietnamese: "Phản hồi trong tương lai phải cung cấp tham chiếu lỗi an toàn." },
  PERMISSION: { title: "PERMISSION", chinese: "Dashboard 不决定访问；仅显化 ObserverOS 结果。", vietnamese: "Dashboard không quyết định truy cập; chỉ hiển thị kết quả từ ObserverOS." },
};

export function PresentationState({ state }: { state: PresentationStateKind }) {
  const copy = stateCopy[state];
  const fixture = OFFLINE_PRESENTATION_FIXTURES[state];
  return <aside className="state-panel" aria-live={state === "LOADING" ? "polite" : undefined} aria-label={state} data-state={fixture.state} data-null={String(fixture.data === null)}><strong>{copy.title}</strong><p>{copy.chinese}</p><p lang="vi">{copy.vietnamese}</p></aside>;
}

function Navigation({ activeSection, mobile = false, onSelect }: { activeSection: ShellSection; mobile?: boolean; onSelect: (section: ShellSection) => void }) {
  return <nav className={mobile ? "v7-bottom-nav" : "v7-nav"} aria-label={mobile ? "Mobile dashboard sections" : "Dashboard sections"}>
    {navigation.map((item) => <button type="button" className={["v7-nav-item", item.id === activeSection ? "is-active" : ""].filter(Boolean).join(" ")} key={item.id} aria-current={item.id === activeSection ? "page" : undefined} aria-label={item.label + ": " + item.chinese + " / " + item.vietnamese} onClick={() => onSelect(item.id)}>{item.label}{item.id === "insight" && !mobile ? <b>私人</b> : null}</button>)}
  </nav>;
}

export function AppShell({ activeSection: initialSection, children }: { activeSection: ShellSection; children: ReactNode }) {
  const [activeSection, setActiveSection] = useState<ShellSection>(initialSection);
  const [surface, setSurface] = useState<Surface>(null);
  const [activeTab, setActiveTab] = useState<"scope" | "reset">("scope");
  const dialogRef = useRef<HTMLDialogElement>(null);
  const openerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (surface && !dialog.open) dialog.showModal();
    if (!surface && dialog.open) dialog.close();
  }, [surface]);

  function closeSurface() {
    setSurface(null);
    window.requestAnimationFrame(() => openerRef.current?.focus());
  }

  function selectSection(section: ShellSection) {
    setActiveSection(section);
    document.getElementById(section)?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "start" });
  }

  function openSurface(next: Exclude<Surface, null>, opener: HTMLButtonElement) {
    openerRef.current = opener;
    setActiveTab("scope");
    setSurface(next);
  }

  return <div className="v7-shell">
    <a className="v7-skip-link" href="#main-content">跳到主要内容 / Chuyển đến nội dung chính</a>
    <aside className="v7-sidebar" aria-label="Desktop presentation navigation">
      <div className="v7-brand"><strong>Observer OS</strong><span>Pink House · V7</span><small>低眩光深灰 / 中国红告警 / 橙色经营指标</small></div>
      <div><p className="v7-side-label">展示角色 · 非真实登录</p><div className="v7-role-list">{roles.map((role, index) => <div className={["v7-role", index === 0 ? "is-active" : ""].filter(Boolean).join(" ")} key={role.label}><span>{role.label}</span><small>{role.note}</small></div>)}</div></div>
      <div><p className="v7-side-label">导航</p><Navigation activeSection={activeSection} onSelect={selectSection} /></div>
      <p className="v7-provenance">Australia/Sydney<br />所有模块为 Mock-only 空态。<br /><br />ObserverOS 是未来唯一事实来源：数据库、计算、权限、审计与权威状态均不在本展示页。</p>
    </aside>
    <div className="v7-stage">
      <header className="v7-mast"><div><h1>DAILY · 当前态势</h1><p>冻结 V7 表面外壳 · 无已连接业务数据</p></div><div className="v7-toolbar"><span>LOCAL · PRESENTATION ONLY</span><button type="button" className="v7-toolbar-button" onClick={(event) => openSurface("drawer", event.currentTarget)} aria-haspopup="dialog" aria-label="打开冻结页面导航抽屉">▷ 自动巡查 · HOLD</button><button type="button" className="v7-toolbar-button" onClick={(event) => openSurface("dialog", event.currentTarget)} aria-haspopup="dialog" aria-label="打开展示边界说明">手动模式</button></div></header>
      <main className="v7-content" id="main-content" tabIndex={-1}>{children}</main>
    </div>
    <Navigation activeSection={activeSection} mobile onSelect={selectSection} />
    <dialog ref={dialogRef} className={surface === "drawer" ? "v7-surface v7-drawer" : "v7-surface"} aria-labelledby="surface-title" onClose={closeSurface}>
      <div className="v7-surface-head"><h2 id="surface-title">{surface === "drawer" ? "冻结页面导航" : "展示边界说明"}</h2><button type="button" className="v7-surface-close" onClick={closeSurface} aria-label="关闭">×</button></div>
      {surface === "drawer" ? <nav className="v7-surface-nav" aria-label="Frozen page navigation">{navigation.map((item) => <button type="button" key={item.id} onClick={() => { selectSection(item.id); closeSurface(); }}>{item.label} · {item.chinese} / {item.vietnamese}</button>)}</nav> : <><div className="v7-tabs" role="tablist" aria-label="Presentation-only boundary tabs"><button type="button" role="tab" aria-selected={activeTab === "scope"} onClick={() => setActiveTab("scope")}>范围</button><button type="button" role="tab" aria-selected={activeTab === "reset"} onClick={() => setActiveTab("reset")}>刷新重置</button></div><div className="v7-tab-panel" role="tabpanel">{activeTab === "scope" ? "这是浏览器本地展示交互；不会读取、写入、计算或决定任何 ObserverOS 事实。" : "所有抽屉、对话框、Tabs 和导航选中状态只存在于当前页面；刷新后即复位。"}</div></>}
    </dialog>
  </div>;
}

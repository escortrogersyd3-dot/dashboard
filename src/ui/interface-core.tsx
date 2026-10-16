import type { ReactNode } from "react";

export const V7_BREAKPOINTS = [600, 880, 1180] as const;

const navigation = [
  { id: "daily", label: "DAILY", chinese: "日常", vietnamese: "Hằng ngày" },
  { id: "weekly", label: "WEEKLY", chinese: "每周", vietnamese: "Hàng tuần" },
  { id: "insight", label: "INSIGHT", chinese: "洞察", vietnamese: "Phân tích" },
] as const;

export type ShellSection = (typeof navigation)[number]["id"];
export type PresentationStateKind = "LOADING" | "EMPTY" | "STALE" | "UNKNOWN" | "ERROR" | "PERMISSION";

const stateCopy: Record<PresentationStateKind, { title: string; detail: string }> = {
  LOADING: { title: "Loading", detail: "Waiting for a permitted Observer OS response." },
  EMPTY: { title: "No data", detail: "No authoritative data is connected in this scaffold." },
  STALE: { title: "Stale data", detail: "A future OS response must disclose its freshness." },
  UNKNOWN: { title: "Status unknown", detail: "Dashboard cannot infer freshness, access, or business meaning." },
  ERROR: { title: "Unable to load", detail: "A future OS response must provide a safe error reference." },
  PERMISSION: { title: "Permission required", detail: "Dashboard never decides access; it only presents the OS result." },
};

export function PresentationState({ state }: { state: PresentationStateKind }) {
  const copy = stateCopy[state];
  return <aside className="state-panel" aria-live={state === "LOADING" ? "polite" : undefined} aria-label={state}><h2>{copy.title}</h2><p>{copy.detail}</p></aside>;
}

function Navigation({ activeSection }: { activeSection: ShellSection }) {
  return <nav aria-label="Dashboard sections">{navigation.map((item) => <button className="v7-nav-item" key={item.id} type="button" aria-current={item.id === activeSection ? "page" : undefined} aria-label={`${item.label}: ${item.chinese} / ${item.vietnamese}`}>{item.label}</button>)}</nav>;
}

export function AppShell({ activeSection, children }: { activeSection: ShellSection; children: ReactNode }) {
  return <div className="v7-shell"><aside className="v7-sidebar" aria-label="Desktop navigation"><div className="v7-brand"><strong>Observer OS</strong><span>Dashboard V7</span></div><Navigation activeSection={activeSection} /></aside><div className="v7-main"><header className="v7-mast"><div className="v7-brand"><strong>Observer OS Dashboard</strong><span>Mock-only reconstruction shell</span></div><span className="v7-access">Authority: not connected</span></header><main className="v7-content">{children}</main></div><div className="v7-bottom-nav"><Navigation activeSection={activeSection} /></div></div>;
}

import { DailySummary } from "../src/ui/daily-summary";
import { AppShell } from "../src/ui/interface-core";

export default function Home() {
  return (
    <AppShell activeSection="daily">
      <section className="placeholder-panel" aria-labelledby="scaffold-title">
        <p className="eyebrow">PLANNING / RECONSTRUCTION CONTRACT</p>
        <h1 id="scaffold-title">Observer OS Dashboard</h1>
        <p>
          Shared V7 interface shell only. No authoritative Observer OS data is connected.
        </p>
        <DailySummary />
      </section>
    </AppShell>
  );
}

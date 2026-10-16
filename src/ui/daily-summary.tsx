import { PresentationState } from "./interface-core";

const slots = [
  { id: "work", label: "Current work", source: "Approved DailySurface aggregate required" },
  { id: "customer-payment", label: "Customer payment", source: "Approved precomputed aggregate required" },
  { id: "on-time", label: "On-time rate", source: "ObserverOS result required" },
  { id: "studio-use", label: "Studio use", source: "Authorized aggregate required" },
] as const;

/** Frozen V7 four-slot summary layout. It deliberately renders no business values. */
export function DailySummary() {
  return (
    <section className="daily-summary" aria-labelledby="daily-summary-title">
      <h2 id="daily-summary-title">Current summary</h2>
      <div className="summary-slots">
        {slots.map((slot) => (
          <article className="summary-slot" key={slot.id}>
            <h2>{slot.label}</h2>
            <p>{slot.source}</p>
          </article>
        ))}
      </div>
      <PresentationState state="EMPTY" />
    </section>
  );
}

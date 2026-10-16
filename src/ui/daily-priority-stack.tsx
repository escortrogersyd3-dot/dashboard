import { PresentationState } from "./interface-core";

const modules = [
  { id: "observation", label: "Observation", source: "Approved daily-observation reference required" },
  { id: "rooms", label: "Rooms and logistics", source: "Approved DailySurface aggregate required" },
  { id: "website", label: "Website booking and service", source: "Approved website-workflow reference required" },
  { id: "work", label: "Work and current summary", source: "Approved DailySurface or trend artifact required" },
] as const;

/** Frozen DAILY order shell. ObserverOS alone may supply a verified module order and reason. */
export function DailyPriorityStack() {
  return (
    <section className="daily-priority" aria-labelledby="daily-priority-title">
      <article className="task-marquee">
        <h2 id="daily-priority-title">Current tasks</h2>
        <p>Anchored position. An approved ObserverOS task reference is required.</p>
      </article>
      <div className="priority-stack" aria-labelledby="priority-stack-title">
        <h2 id="priority-stack-title">Dynamic module stack</h2>
        <p className="priority-rule">Only a future verified ObserverOS source, reason, and order may change this frozen sequence.</p>
        <div className="priority-modules">
          {modules.map((module) => (
            <article className="priority-module" key={module.id}>
              <h3>{module.label}</h3>
              <p>{module.source}</p>
            </article>
          ))}
        </div>
      </div>
      <PresentationState state="EMPTY" />
    </section>
  );
}

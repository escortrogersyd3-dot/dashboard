import { PresentationState } from "./interface-core";

const panels = ["People", "Security", "Inventory"] as const;

export function WeeklyOperations() {
  return <section className="weekly-operations" aria-labelledby="weekly-operations-title">
    <h2 id="weekly-operations-title">WEEKLY · Operations</h2>
    <p>Approved ObserverOS authority is required. No operations content is connected.</p>
    <div className="weekly-operation-panels">
      {panels.map((panel) => <article className="weekly-operation-panel" key={panel}>
        <h3>{panel}</h3>
        <p>EMPTY — approved aggregate projection required</p>
      </article>)}
    </div>
    <PresentationState state="EMPTY" />
  </section>;
}

import { PresentationState } from "./interface-core";

const reports = ["Weekly report", "Accounting view", "Financial follow-up"] as const;

export function WeeklyFinance() {
  return <section className="weekly-finance" aria-labelledby="weekly-finance-title">
    <h2 id="weekly-finance-title">WEEKLY · Finance</h2>
    <p>Approved ObserverOS authority is required. No financial content is connected.</p>
    <div className="weekly-finance-panels">{reports.map((report) => <article className="weekly-finance-panel" key={report}><h3>{report}</h3><p>EMPTY — approved aggregate projection required</p></article>)}</div>
    <PresentationState state="EMPTY" />
  </section>;
}

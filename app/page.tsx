import { getRuntimeBoundary } from "../src/lib/runtime-boundary";

export default function Home() {
  const boundary = getRuntimeBoundary();

  return (
    <main>
      <p className="eyebrow">PLANNING / RECONSTRUCTION CONTRACT</p>
      <h1>Observer OS Dashboard</h1>
      <p>{boundary.message}</p>
      <dl>
        <dt>Runtime mode</dt>
        <dd>{boundary.mode}</dd>
        <dt>Authoritative data connection</dt>
        <dd>Not configured</dd>
      </dl>
    </main>
  );
}

import { spawnSync } from "node:child_process";

const checks = [
  ["full-preobserveros", "pnpm", ["run", "preos-regression:verify"]],
  ["v7-fidelity", "pnpm", ["run", "v7-fidelity-shell:verify"]],
  ["local-interaction", "pnpm", ["run", "local-interaction-shell:verify"]],
  ["state-i18n", "pnpm", ["run", "presentation-states-i18n:verify"]],
  ["a11y-responsive", "pnpm", ["run", "a11y-responsive:verify"]],
  ["adapter-readiness", "pnpm", ["run", "adapter-readiness:verify"]],
  ["control-plane", "pnpm", ["run", "control-plane:validate"]],
];

for (const [name, command, args] of checks) {
  process.stdout.write(`PHASE2 ${name}\n`);
  const executable = process.platform === "win32" ? process.env.ComSpec ?? "cmd.exe" : command;
  const commandArgs = process.platform === "win32" ? ["/d", "/s", "/c", `${command} ${args.join(" ")}`] : args;
  const result = spawnSync(executable, commandArgs, { stdio: "inherit", shell: false });
  if (result.status !== 0) throw new Error(`Phase 2 regression failed: ${name}`);
}
console.log("Phase 2 regression: PASS");

# Dashboard automation control plane

**Classification: PLANNING / CONTROL PLANE. No production deployment or data access is authorized.**

The control plane reads `task-catalog.json`, validates an exact OTP artifact and its SHA256, and records a structured receipt. The normal state path is:

`backlog -> admitted -> codex_running -> pr_ready -> audit_pass -> merged -> receipt_verified`.

Only an admitted OTP can be dispatched. A task with incomplete dependencies remains `blocked`. `HOLD` stops that task and all dependent tasks; it never permits a substitute task scope.

GitHub Actions validate repository-local evidence. They do not grant ObserverOS data access, deployment authority, or any ability to write a business database.

## Local runner

`automation/local-runner.config.json` is Mock-only. The local runner has no ObserverOS, media, database, deployment, Docker, or Task Scheduler capability. It supplies three offline commands: admitted-task preflight, changed-path guard, and receipt-draft printing.

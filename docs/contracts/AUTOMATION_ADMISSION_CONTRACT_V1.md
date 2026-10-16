# Dashboard Automation Admission Contract V1

**Status: PLANNING / RECONSTRUCTION CONTRACT — OFFLINE CONTROL-PLANE ONLY.**

The contract models a governed sequence: `draft → admitted → issue_open → pr_open → merged → receipt_verified`. `hold` and `fail` are terminal for a given attempt. Every transition is fail-closed: an OTP ID and immutable SHA256 must be present, an OTP cannot be admitted twice, and a receipt cannot precede a merge.

This is not a scheduler, GitHub client, deployment trigger, credential store, database, or ObserverOS authority path. It only states verification expectations for the normal human/Codex governed workflow. No transition grants live-interface authority.

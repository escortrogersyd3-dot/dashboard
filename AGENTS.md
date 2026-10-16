# Dashboard automation rules

This repository is the Dashboard control plane and V7 reconstruction workspace.

- Treat `automation/otps/` as immutable task authority once an OTP is admitted. Do not edit an admitted OTP; supersede it with a new OTP.
- A task may modify only its declared `allowed_paths`. A path outside that list is an automatic `HOLD_SCOPE_VIOLATION`.
- Dashboard must not create a business database, business calculation, independent AI result, independent permission decision, or authoritative status.
- ObserverOS remains the source of facts, calculations, permissions, audit, freshness, and data persistence.
- A passing test does not authorize changing frozen V7 scope, API semantics, or acceptance criteria.
- Do not deploy from this repository's automation. `main` merge is not a deployment authorization.

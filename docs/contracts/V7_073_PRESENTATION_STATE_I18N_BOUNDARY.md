# V7-073 Presentation-State and Bilingual Boundary

Status: `PLANNING / RECONSTRUCTION CONTRACT` · `PROPOSED / MOCK-ONLY`

## Offline envelope

Every offline presentation fixture is exactly `{ state, data: null }`. The only permitted states are `LOADING`, `EMPTY`, `STALE`, `UNKNOWN`, `ERROR`, and `PERMISSION`. `data` is always `null`; a Dashboard surface must not insert a fallback value, translate a fact, infer a status, calculate a metric, or make a permission decision.

## Bilingual copy rule

Every state has a Chinese explanation and an explicit Vietnamese explanation. The frozen DAILY, WEEKLY, and INSIGHT module labels and boundary statements provide both languages. This copy explains display limits only; it does not represent ObserverOS data.

## Exclusions and live gate

This contract authorizes no API URL, request, storage, database, credential, media, business value, access policy, AI result, deployment, or authoritative state. `HOLD_LIVE_INTEGRATION` remains until ObserverOS provides audited browser-safe contracts, permission semantics, field disclosure rules, freshness and provenance.

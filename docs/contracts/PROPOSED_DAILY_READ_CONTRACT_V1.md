# Proposed Dashboard DAILY Read Contract v1

**Status: PASS_DAILY_CONTRACT_PROPOSAL / MOCK-ONLY. Approved in this ChatGPT conversation for Dashboard contract and fixture work only. It is not evidence of an existing ObserverOS browser API and does not authorize live integration.**

## Ownership and live gate

ObserverOS remains the only authority for business facts, calculations, trend results, access decisions, freshness, audit, and persistence. Dashboard may only request and present an approved response. Until ObserverOS publishes an audited browser-safe implementation, every live path is **HOLD_LIVE_INTEGRATION**.

## Proposed request

`daily-surface` request fields are `site_id`, `operating_day_id`, and optional `trend_window` (`7d` or `30d`). Future identity context is supplied and decided by ObserverOS; Dashboard neither creates nor interprets it.

## Proposed response and allowlist

The exact JSON Schema is [proposed-daily-read-v1.schema.json](../../schemas/proposed-daily-read-v1.schema.json). Every response retains `schema_version`, opaque `request_id`, `as_of`, `freshness`, `permission`, `status`, `data`, `limitations`, opaque `provenance`, and safe `error`.

When `data` is present it may contain only an opaque surface/artifact reference, operating day or trend window, completeness, and the allowlisted anonymous aggregates: completed-service, lifecycle-opportunity, open-attention, objective-safeguard, unresolved/disputed/blocked/incomplete queue, and camera/device event counts. Each metric carries availability and an opaque provenance reference. Trend values, if ever returned, are precomputed by ObserverOS; Dashboard does not compare, rank, forecast, or recalculate them.

## Mandatory non-disclosure and state rules

The contract excludes people, customers, appointments, media, raw sources, raw `DailySurface`, financial detail, credentials, and identity payloads. For denied, empty, pending, error, stale, or unknown fixture paths, `data` is `null`. Dashboard must display `LOADING`, `EMPTY`, `STALE`, `UNKNOWN`, `ERROR`, and `PERMISSION` distinctly, without zero-filling or inference.

## Evidence and next gate

The local adapter is a state-only non-authoritative fixture and is verified offline. V7-011 may be admitted only after this OTP has a PASS receipt; it remains Mock-only until an ObserverOS implementation supplies the approved schema, authorization semantics, freshness behavior, safe error codes, and audit evidence.

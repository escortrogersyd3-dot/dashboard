# Proposed WEEKLY Finance Contract V1

**Status: PLANNING / RECONSTRUCTION CONTRACT — PROPOSED / MOCK-ONLY.**

This is a future ObserverOS browser-read proposal, not an existing API. Dashboard may only display the envelope status and a future opaque precomputed `projection_ref`. It must never calculate, compare, rank, store, infer, or authorize finance data.

Allowed request concepts are future `site_id`, `operating_week_id`, and an ObserverOS-supplied identity context which Dashboard does not interpret. For `LOADING`, `EMPTY`, `STALE`, `UNKNOWN`, `ERROR`, and `PERMISSION`, `data` is `null`.

Excluded: currency and financial amounts, ledger content, GST, payment, invoice, tax, transaction, raw source, identity, customer, staff, media, credentials, and database access. Live binding is `HOLD_LIVE_INTEGRATION` until ObserverOS approval, field classification, browser-safe authorization, freshness, provenance, and audit behavior exist.

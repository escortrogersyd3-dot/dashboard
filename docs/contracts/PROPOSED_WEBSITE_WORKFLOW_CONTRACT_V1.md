# Proposed Website Workflow Contract v1

**Status: PLANNING / RECONSTRUCTION CONTRACT — PROPOSED / MOCK-ONLY.** A website-originated request is never an authoritative reservation in Dashboard. It becomes authoritative only after ObserverOS persists, audits and returns an opaque `confirmation_ref` with `authority: CONFIRMED_BY_OBSERVEROS`.

The existing `BOOKING` lifecycle must not be reused for this future workflow. Until a new approved write-back event and confirmation response exist, all website-originated states remain `PENDING`, `UNCONFIRMED`, `EMPTY`, `ERROR` or `PERMISSION`; no UI may state that a reservation exists.

The contract excludes message text, people, customer data, dates, payment, traffic, media, uploads and provider identifiers. This repository exposes no request sender and does not call a provider or ObserverOS. `HOLD_LIVE_INTEGRATION` remains until schema, identity, authorization, audit, safe errors and external-provider behavior are approved.

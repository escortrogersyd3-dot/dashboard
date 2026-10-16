# Proposed Dashboard DAILY Observation Read Contract v1

**Status: PLANNING / RECONSTRUCTION CONTRACT — PROPOSED / MOCK-ONLY.** This is not evidence of an existing ObserverOS API or authorization to access any camera, media, device, event, person, or location source.

The future request may identify a site and operating day. ObserverOS alone supplies identity context, authorizes the request, decides freshness and redaction, and records audit evidence. Dashboard only presents the returned envelope.

The response may contain only opaque surface, slot, authorization and provenance references; availability; expiry; and completeness. It excludes browser URLs, raw observation, image/video content, identity, device/location detail, event narrative and security conclusion. `data` is `null` for pending, empty, stale, unknown, error and denied paths. The UI must keep `LOADING`, `EMPTY`, `STALE`, `UNKNOWN`, `ERROR` and `PERMISSION` distinct.

An opaque `authorization_ref` is not a usable link. A live handoff additionally needs an approved browser-safe resolver, short-lived authorization, redaction rules, expiry behavior, audit reference and revocation semantics. Until then all observation UI remains `HOLD_LIVE_INTEGRATION`.

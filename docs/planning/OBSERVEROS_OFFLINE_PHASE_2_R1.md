# ObserverOS Dashboard V7 Offline Phase 2 R1

Status: PLANNING / RECONSTRUCTION CONTRACT. This plan is not implementation, deployment, or live-integration authority.

## Purpose and entry conditions

Phase 2 turns the existing offline shell into a visually faithful, accessible, bilingual, and contract-safe V7 browser preview while ObserverOS is unavailable. The sole visual authority is the frozen file F:\CDriveOffload\UserFolders\Desktop\ObserverOS_PinkHouse_V7_Full_Responsive_Demo.html, SHA256 cbafbb0fb3944071e7c8605037f7be2aba9389047cc36e2ad1767b5444ce21ec.

Before every OTP: confirm a clean main worktree, main equals origin/main, the frozen SHA256 is unchanged, required existing verifiers pass, and create a unique timestamped backup under E:\dashboard-backups. A collision, hash mismatch, dirty unrelated worktree, failed verifier, or remote mismatch is HOLD. Each OTP is admitted only after its one-line OTP record is hashed, recorded in GitHub Issue text, and path-scoped. Codex works in a branch; GitHub Actions, PR merge, immutable receipt, and Issue closure are required for PASS.

The existing uncommitted V7 showcase correction is protected input. OTP-V7-061 alone may reconcile it after its own backup and frozen-source comparison. No plan task may overwrite, discard, or silently include it.

## Global boundary

Dashboard is only a lightweight, identity-presented ObserverOS result window. It may not add a database, backend, business calculation, independent AI analysis, permission decision, authoritative status, live ObserverOS request, credential, remote media, deployment, or analytics tracking. It may not invent data, compare values, rank, forecast, compute KPIs, or infer missing values.

ObserverOS remains the future authority for all business facts, calculations, analysis, permissions, audit, state, database, and any real interface. Until audited browser-safe reads exist, all adapter names and fixtures are PROPOSED / MOCK-ONLY. The six presentation states must remain distinct: LOADING, EMPTY, STALE, UNKNOWN, ERROR, PERMISSION. In each non-data state, data is null.

Allowed local state is limited to an active frozen page, selected visual tab, transient open/closed sheet or dialog, keyboard focus, explicit language selection, and test fixture selection. It must reset on refresh and must not persist, decide access, or calculate business results.

## Phase sequence

| OTP | Task and objective | Output and expected result | Constraints and delivery | Audit and verification |
| --- | --- | --- | --- | --- |
| V7-061 | Showcase baseline reconciliation: compare the protected corrected showcase and verifier against frozen V7, fix only demonstrable visual mismatches, and record a DOM-to-preview traceability table. | Versioned source comparison, corrected Phase 1 showcase, verifier, screenshot evidence. Result: PASS_SHOWCASE_BASELINE_RECONCILED or HOLD. | No new product feature, invented data, network, media, or source redesign. PR plus receipt. | Backup manifest/hash, frozen-source checksum, changed-path guard, static verifier, browser visual comparison at desktop and mobile. |
| V7-070 | V7 fidelity shell: establish only reusable structural tokens and shells for desktop and mobile. | Dark V7 canvas, sidebar, masthead, page rails, card boundaries, spacing/type/color tokens. Result: PASS_V7_FIDELITY_SHELL. | REUSE only for primitive layout; no data behavior or custom visual reinterpretation. PR plus receipt. | Token snapshot, DOM landmark checks, desktop/mobile screenshots, typecheck/build. |
| V7-071 | Frozen module hierarchy: reconstruct DAILY, WEEKLY, and INSIGHT module order and parent-child grouping from the frozen source. | Requirement traceability matrix from V7 elements to page regions, exact visible order, placeholder content marked UNKNOWN or HOLD. Result: PASS_V7_MODULE_HIERARCHY. | No removal, reordering, simplification, or new module. No simulated business records. PR plus receipt. | Source-to-DOM audit, order assertions, negative scan for forbidden sample data, screenshots. |
| V7-072 | Local interaction shell: add frozen-navigation and presentation-only interactions. | Page switching, responsive navigation, visual drawer/dialog/tab open-close, focus return and keyboard escape. Result: PASS_LOCAL_INTERACTION_SHELL. | Transient local UI only; no persistence, fetch, permission logic, automation, or business side effect. PR plus receipt. | Keyboard and pointer interaction tests, refresh-reset negative test, mobile viewport audit. |
| V7-073 | Presentation-state and bilingual layer: give each frozen module explicit six-state rendering and Chinese/Vietnamese labels. | State catalogue, fixture matrix, bilingual copy map, state-safe module shells. Result: PASS_STATE_I18N_LAYER. | No fallback values, translation-based data rewriting, or policy decision. ALL missing/error/permission data remains null. PR plus receipt. | Positive/negative fixtures for every state, copy-key coverage, forbidden-value scan, typecheck/build. |
| V7-074 | Accessibility and responsive fidelity: make the shell usable at the frozen desktop/mobile breakpoints. | Landmarks, names, focus order, contrast/focus indicators, mobile composition and reduced-motion-safe behavior. Result: PASS_A11Y_RESPONSIVE. | No design modernization beyond evidence in frozen V7; no third-party tracking. PR plus receipt. | Keyboard walk, semantic/ARIA checks, viewport screenshots and no-horizontal-overflow assertions. |
| V7-075 | Proposed adapter readiness: define presentation-safe, typed seams for future ObserverOS reads without connecting them. | PROPOSED / MOCK-ONLY input envelopes, null guards, field allowlists, adapter contracts and fixtures. Result: PASS_ADAPTER_READINESS_HOLD_LIVE. | No URL, fetch, websocket, environment secret, database driver, real schema claim, or raw DailySurface object. PR plus receipt. | Static no-network/no-secret scan, contract fixtures, rejected forbidden-field tests, control-plane validation. |
| V7-076 | Phase regression and evidence: validate the assembled offline result against the frozen baseline and governance boundary. | Regression runner, screenshot catalogue, visual-diff review record, interaction/accessibility/negative evidence. Result: PASS_PHASE2_REGRESSION. | No lowered threshold or acceptance rewrite after a test fails. A mismatch is HOLD until a scoped correction OTP passes. PR plus receipt. | Full typecheck/build, all contract verifiers, changed-path guard, visual review at desktop/mobile, GitHub Actions. |
| V7-077 | Final offline preview delivery: package a zero-network local browser preview that exhibits the passed Phase 2 result. | public/observeros-v7-offline-preview.html, delivery README, screenshot index and immutable receipt. Result: PASS_OFFLINE_V7_PHASE2_PREVIEW with HOLD_LIVE_INTEGRATION retained. | Relative/local assets only; no live API, deployment, database, credential, media feed, or claim that ObserverOS is connected. PR plus receipt. | Open as file URL, offline/network-blocked assertion, final desktop/mobile visual review, build, regression, GitHub audit. |

## Dependency and stop rules

V7-061 precedes V7-070; V7-070 precedes V7-071; V7-071 precedes V7-072 and V7-073; V7-072 and V7-073 precede V7-074; V7-073 precedes V7-075; V7-074 and V7-075 precede V7-076; V7-076 precedes V7-077.

Any HOLD or FAIL stops the chain. A repair must be a new, scoped OTP; no task may weaken expected screenshots, acceptance checks, data exclusions, or test standards to pass. Phase completion requires every OTP receipt, merged commit, closed Issue, and final preview verification. The phase never authorizes real ObserverOS integration; its enduring delivery state is HOLD_LIVE_INTEGRATION.

## Owner-readable completion report

The final report must list: phase objective; each OTP with PASS/HOLD/FAIL; backup locations and SHA256; frozen baseline hash; PR/commit/Issue/receipt; checks actually run; remaining live integration gates; and the exact location of the offline preview. It must say plainly that the preview is presentation-only and does not prove a working ObserverOS connection.

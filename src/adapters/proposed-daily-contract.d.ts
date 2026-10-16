export type DailyPresentationState = "LOADING" | "EMPTY" | "STALE" | "UNKNOWN" | "ERROR" | "PERMISSION";
export type AnonymousDailyMetricId = "completed_service_count" | "lifecycle_opportunity_count" | "open_attention_count" | "objective_safeguard_count" | "unresolved_queue_count" | "disputed_queue_count" | "blocked_queue_count" | "incomplete_queue_count" | "camera_event_count" | "device_event_count";
export type AnonymousDailyMetric = { metric_id: AnonymousDailyMetricId; value: number | null; availability: "AVAILABLE" | "UNAVAILABLE"; provenance_ref: string | null };
export type ProposedDailyData = { kind: "DAILY_SURFACE"; surface_ref: string; operating_day_id: string; completeness: "COMPLETE" | "PARTIAL" | "DEGRADED"; metrics: AnonymousDailyMetric[] } | { kind: "TREND_ARTIFACT"; artifact_ref: string; trend_window: "7d" | "30d"; metrics: AnonymousDailyMetric[] };
export type ProposedDailyEnvelope = { schema_version: "1.0"; request_id: string; as_of: string | null; freshness: "FRESH" | "STALE" | "UNKNOWN"; permission: "GRANTED" | "DENIED" | "UNKNOWN"; status: "OK" | "EMPTY" | "ERROR" | "PENDING"; data: ProposedDailyData | null; limitations: string[]; provenance: string[]; error: null | { code: string; message: string } };
export const DAILY_CONTRACT_DISCLAIMER: "PROPOSED_MOCK_ONLY_NOT_A_LIVE_OBSERVEROS_API";
export const DAILY_PRESENTATION_STATES: readonly DailyPresentationState[];
export function readProposedDailyFixture(name: "pending" | "empty" | "stale" | "unknown" | "error" | "denied"): ProposedDailyEnvelope;
export function toDailyPresentationState(envelope: ProposedDailyEnvelope): DailyPresentationState;

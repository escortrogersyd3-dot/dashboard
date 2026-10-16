export type ProposedEnvelopeStatus = "OK" | "EMPTY" | "ERROR" | "PENDING";
export type ProposedEnvelopeFreshness = "FRESH" | "STALE" | "UNKNOWN";
export type ProposedEnvelopePermission = "GRANTED" | "DENIED" | "UNKNOWN";
export type PresentationState = "LOADING" | "EMPTY" | "STALE" | "UNKNOWN" | "ERROR" | "PERMISSION";
export type ProposedEnvelope = { schema_version: "1.0"; request_id: string; as_of: null; freshness: ProposedEnvelopeFreshness; permission: ProposedEnvelopePermission; status: ProposedEnvelopeStatus; data: null; provenance: []; error: null | { code: string; message: string } };
export const MOCK_ADAPTER_DISCLAIMER: "NON_AUTHORITATIVE_PROPOSED_CONTRACT_FIXTURE";
export function readProposedMockFixture(name: "pending" | "empty" | "stale" | "unknown" | "error" | "denied"): ProposedEnvelope;
export function toPresentationState(envelope: ProposedEnvelope): PresentationState;

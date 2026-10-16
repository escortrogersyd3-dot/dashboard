/**
 * PLANNING / CONTRACT ONLY.
 * These fixtures are deliberately non-authoritative and make no HTTP request.
 */
export const MOCK_ADAPTER_DISCLAIMER = "NON_AUTHORITATIVE_PROPOSED_CONTRACT_FIXTURE";

const fixtures = Object.freeze({
  pending: { schema_version: "1.0", request_id: "mock-pending", as_of: null, freshness: "UNKNOWN", permission: "UNKNOWN", status: "PENDING", data: null, provenance: [], error: null },
  empty: { schema_version: "1.0", request_id: "mock-empty", as_of: null, freshness: "UNKNOWN", permission: "GRANTED", status: "EMPTY", data: null, provenance: [], error: null },
  stale: { schema_version: "1.0", request_id: "mock-stale", as_of: null, freshness: "STALE", permission: "GRANTED", status: "OK", data: null, provenance: [], error: null },
  unknown: { schema_version: "1.0", request_id: "mock-unknown", as_of: null, freshness: "UNKNOWN", permission: "UNKNOWN", status: "OK", data: null, provenance: [], error: null },
  error: { schema_version: "1.0", request_id: "mock-error", as_of: null, freshness: "UNKNOWN", permission: "GRANTED", status: "ERROR", data: null, provenance: [], error: { code: "MOCK_ERROR", message: "Non-authoritative fixture" } },
  denied: { schema_version: "1.0", request_id: "mock-denied", as_of: null, freshness: "UNKNOWN", permission: "DENIED", status: "PENDING", data: null, provenance: [], error: null },
});

export function readProposedMockFixture(name) {
  if (!Object.hasOwn(fixtures, name)) throw new Error(`Unknown Mock fixture: ${name}`);
  return structuredClone(fixtures[name]);
}

/** Maps declared envelope fields only; it never infers facts or access. */
export function toPresentationState(envelope) {
  if (envelope.permission === "DENIED") return "PERMISSION";
  if (envelope.status === "ERROR") return "ERROR";
  if (envelope.freshness === "STALE") return "STALE";
  if (envelope.status === "PENDING") return "LOADING";
  if (envelope.status === "EMPTY") return "EMPTY";
  return "UNKNOWN";
}

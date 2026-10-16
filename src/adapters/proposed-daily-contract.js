/** PROPOSED / MOCK-ONLY. No ObserverOS endpoint is called by this module. */
export const DAILY_CONTRACT_DISCLAIMER = "PROPOSED_MOCK_ONLY_NOT_A_LIVE_OBSERVEROS_API";

export const DAILY_PRESENTATION_STATES = Object.freeze([
  "LOADING", "EMPTY", "STALE", "UNKNOWN", "ERROR", "PERMISSION",
]);

const fixtures = Object.freeze({
  pending: { schema_version: "1.0", request_id: "daily-mock-pending", as_of: null, freshness: "UNKNOWN", permission: "UNKNOWN", status: "PENDING", data: null, limitations: ["MOCK_ONLY"], provenance: [], error: null },
  empty: { schema_version: "1.0", request_id: "daily-mock-empty", as_of: null, freshness: "UNKNOWN", permission: "GRANTED", status: "EMPTY", data: null, limitations: ["MOCK_ONLY"], provenance: [], error: null },
  stale: { schema_version: "1.0", request_id: "daily-mock-stale", as_of: null, freshness: "STALE", permission: "GRANTED", status: "OK", data: null, limitations: ["MOCK_ONLY"], provenance: [], error: null },
  unknown: { schema_version: "1.0", request_id: "daily-mock-unknown", as_of: null, freshness: "UNKNOWN", permission: "UNKNOWN", status: "OK", data: null, limitations: ["MOCK_ONLY"], provenance: [], error: null },
  error: { schema_version: "1.0", request_id: "daily-mock-error", as_of: null, freshness: "UNKNOWN", permission: "GRANTED", status: "ERROR", data: null, limitations: ["MOCK_ONLY"], provenance: [], error: { code: "MOCK_ERROR", message: "Non-authoritative fixture" } },
  denied: { schema_version: "1.0", request_id: "daily-mock-denied", as_of: null, freshness: "UNKNOWN", permission: "DENIED", status: "PENDING", data: null, limitations: ["MOCK_ONLY"], provenance: [], error: null },
});

export function readProposedDailyFixture(name) {
  if (!Object.hasOwn(fixtures, name)) throw new Error(`Unknown DAILY Mock fixture: ${name}`);
  return structuredClone(fixtures[name]);
}

export function toDailyPresentationState(envelope) {
  if (envelope.permission === "DENIED") return "PERMISSION";
  if (envelope.status === "ERROR") return "ERROR";
  if (envelope.freshness === "STALE") return "STALE";
  if (envelope.status === "PENDING") return "LOADING";
  if (envelope.status === "EMPTY") return "EMPTY";
  return "UNKNOWN";
}

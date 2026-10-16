/**
 * PROPOSED / MOCK-ONLY presentation seam.
 * This module validates a caller-supplied, null-only envelope. It performs no I/O.
 */
export const PROPOSED_PRESENTATION_READ_DISCLAIMER = "PROPOSED_MOCK_ONLY_NOT_A_LIVE_OBSERVEROS_API";

export const PROPOSED_PRESENTATION_READ_FIELDS = Object.freeze([
  "schema_version", "request_id", "as_of", "freshness", "permission", "status", "data", "limitations", "provenance", "error",
]);

const REQUIRED_FIELDS = Object.freeze(["schema_version", "request_id", "freshness", "permission", "status", "data", "limitations", "provenance", "error"]);
const PRESENTATION_STATES = Object.freeze(["LOADING", "EMPTY", "STALE", "UNKNOWN", "ERROR", "PERMISSION"]);

export function validateProposedPresentationRead(envelope) {
  if (!envelope || typeof envelope !== "object" || Array.isArray(envelope)) throw new TypeError("Mock presentation envelope must be an object");
  for (const field of Object.keys(envelope)) if (!PROPOSED_PRESENTATION_READ_FIELDS.includes(field)) throw new TypeError(`Forbidden presentation field: ${field}`);
  for (const field of REQUIRED_FIELDS) if (!(field in envelope)) throw new TypeError(`Missing presentation field: ${field}`);
  if (envelope.data !== null) throw new TypeError("Mock presentation data must remain null");
  if (!Array.isArray(envelope.limitations) || !Array.isArray(envelope.provenance)) throw new TypeError("Mock presentation lists must be arrays");
  return Object.freeze({ ...envelope, data: null, limitations: [...envelope.limitations], provenance: [...envelope.provenance] });
}

export function toProposedPresentationState(envelope) {
  const validated = validateProposedPresentationRead(envelope);
  if (validated.permission === "DENIED") return "PERMISSION";
  if (validated.status === "ERROR") return "ERROR";
  if (validated.freshness === "STALE") return "STALE";
  if (validated.status === "PENDING") return "LOADING";
  if (validated.status === "EMPTY") return "EMPTY";
  return "UNKNOWN";
}

export const PROPOSED_PRESENTATION_READ_FIXTURES = Object.freeze({
  loading: { schema_version: "1.0", request_id: "mock-loading", as_of: null, freshness: "UNKNOWN", permission: "UNKNOWN", status: "PENDING", data: null, limitations: ["MOCK_ONLY"], provenance: [], error: null },
  empty: { schema_version: "1.0", request_id: "mock-empty", as_of: null, freshness: "UNKNOWN", permission: "GRANTED", status: "EMPTY", data: null, limitations: ["MOCK_ONLY"], provenance: [], error: null },
  stale: { schema_version: "1.0", request_id: "mock-stale", as_of: null, freshness: "STALE", permission: "GRANTED", status: "OK", data: null, limitations: ["MOCK_ONLY"], provenance: [], error: null },
  unknown: { schema_version: "1.0", request_id: "mock-unknown", as_of: null, freshness: "UNKNOWN", permission: "UNKNOWN", status: "OK", data: null, limitations: ["MOCK_ONLY"], provenance: [], error: null },
  error: { schema_version: "1.0", request_id: "mock-error", as_of: null, freshness: "UNKNOWN", permission: "GRANTED", status: "ERROR", data: null, limitations: ["MOCK_ONLY"], provenance: [], error: { code: "MOCK_ERROR" } },
  permission: { schema_version: "1.0", request_id: "mock-permission", as_of: null, freshness: "UNKNOWN", permission: "DENIED", status: "PENDING", data: null, limitations: ["MOCK_ONLY"], provenance: [], error: null },
});

export { PRESENTATION_STATES };

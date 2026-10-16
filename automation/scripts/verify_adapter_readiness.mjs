import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { PROPOSED_PRESENTATION_READ_FIXTURES, validateProposedPresentationRead, toProposedPresentationState } from "../../src/adapters/proposed-presentation-read.js";

const expected = { loading: "LOADING", empty: "EMPTY", stale: "STALE", unknown: "UNKNOWN", error: "ERROR", permission: "PERMISSION" };
for (const [name, state] of Object.entries(expected)) {
  const fixture = PROPOSED_PRESENTATION_READ_FIXTURES[name];
  assert.equal(fixture.data, null, `${name} fixture must be null`);
  assert.equal(toProposedPresentationState(fixture), state, `${name} fixture state mismatch`);
}
for (const forbidden of [{ ...PROPOSED_PRESENTATION_READ_FIXTURES.empty, customer: "x" }, { ...PROPOSED_PRESENTATION_READ_FIXTURES.empty, data: {} }, { ...PROPOSED_PRESENTATION_READ_FIXTURES.empty, media: [] }]) assert.throws(() => validateProposedPresentationRead(forbidden), /Forbidden presentation field|must remain null/);
const source = readFileSync(new URL("../../src/adapters/proposed-presentation-read.js", import.meta.url), "utf8");
for (const forbidden of ["fetch(", "WebSocket", "XMLHttpRequest", "localStorage", "sessionStorage", "process.env", "http://", "https://"]) assert.ok(!source.includes(forbidden), `forbidden live primitive: ${forbidden}`);
console.log("adapter readiness verification: PASS");

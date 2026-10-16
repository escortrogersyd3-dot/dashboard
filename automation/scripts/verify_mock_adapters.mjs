import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { MOCK_ADAPTER_DISCLAIMER, readProposedMockFixture, toPresentationState } from "../../src/adapters/proposed-envelope.js";

assert.equal(MOCK_ADAPTER_DISCLAIMER, "NON_AUTHORITATIVE_PROPOSED_CONTRACT_FIXTURE");
const expected = { pending: "LOADING", empty: "EMPTY", stale: "STALE", unknown: "UNKNOWN", error: "ERROR", denied: "PERMISSION" };
for (const [fixture, state] of Object.entries(expected)) {
  const envelope = readProposedMockFixture(fixture);
  assert.equal(envelope.data, null, `${fixture} must not contain business data`);
  assert.equal(toPresentationState(envelope), state, `${fixture} state must not collapse`);
}
assert.throws(() => readProposedMockFixture("not-a-fixture"), /Unknown Mock fixture/);
const source = await readFile(new URL("../../src/adapters/proposed-envelope.js", import.meta.url), "utf8");
assert.doesNotMatch(source, /\b(fetch|XMLHttpRequest|WebSocket|http:\/\/|https:\/\/)\b/);
console.log("mock adapter verification: PASS");

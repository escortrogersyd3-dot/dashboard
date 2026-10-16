import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { DAILY_CONTRACT_DISCLAIMER, DAILY_PRESENTATION_STATES, readProposedDailyFixture, toDailyPresentationState } from "../../src/adapters/proposed-daily-contract.js";

const schema = JSON.parse(await readFile(new URL("../../schemas/proposed-daily-read-v1.schema.json", import.meta.url), "utf8"));
assert.match(schema.title, /PROPOSED \/ MOCK-ONLY/);
assert.deepEqual(DAILY_PRESENTATION_STATES, ["LOADING", "EMPTY", "STALE", "UNKNOWN", "ERROR", "PERMISSION"]);
assert.equal(DAILY_CONTRACT_DISCLAIMER, "PROPOSED_MOCK_ONLY_NOT_A_LIVE_OBSERVEROS_API");
const expected = { pending: "LOADING", empty: "EMPTY", stale: "STALE", unknown: "UNKNOWN", error: "ERROR", denied: "PERMISSION" };
for (const [name, state] of Object.entries(expected)) {
  const fixture = readProposedDailyFixture(name);
  assert.equal(fixture.data, null, `${name} must have no business data`);
  assert.equal(toDailyPresentationState(fixture), state, `${name} must not collapse`);
}
const metricIds = schema.$defs.metric.properties.metric_id.enum;
assert.equal(metricIds.includes("customer_id"), false);
assert.equal(metricIds.includes("appointment_id"), false);
assert.equal(metricIds.includes("media_ref"), false);
const source = await readFile(new URL("../../src/adapters/proposed-daily-contract.js", import.meta.url), "utf8");
assert.doesNotMatch(source, /\b(fetch|XMLHttpRequest|WebSocket|http:\/\/|https:\/\/)\b/);
console.log("daily contract verification: PASS");

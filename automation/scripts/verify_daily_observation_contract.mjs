import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { DAILY_OBSERVATION_DISCLAIMER, DAILY_OBSERVATION_PRESENTATION_STATES, readProposedDailyObservationFixture, toDailyObservationPresentationState } from "../../src/adapters/proposed-daily-observation-contract.js";
const schema = JSON.parse(await readFile(new URL("../../schemas/proposed-daily-observation-v1.schema.json", import.meta.url), "utf8"));
assert.match(schema.title, /PROPOSED \/ MOCK-ONLY/); assert.equal(DAILY_OBSERVATION_DISCLAIMER, "PROPOSED_MOCK_ONLY_NOT_A_LIVE_OBSERVEROS_API"); assert.deepEqual(DAILY_OBSERVATION_PRESENTATION_STATES, ["LOADING", "EMPTY", "STALE", "UNKNOWN", "ERROR", "PERMISSION"]);
for (const [name, state] of Object.entries({ pending:"LOADING", empty:"EMPTY", stale:"STALE", unknown:"UNKNOWN", error:"ERROR", denied:"PERMISSION" })) { const fixture = readProposedDailyObservationFixture(name); assert.equal(fixture.data, null); assert.equal(toDailyObservationPresentationState(fixture), state); }
const encoded = JSON.stringify(schema); for (const field of ["camera_id", "device_id", "person_id", "customer_id", "image_url", "video_url", "event_detail", "location"]) assert.equal(encoded.includes(field), false, `forbidden schema field: ${field}`);
const source = await readFile(new URL("../../src/adapters/proposed-daily-observation-contract.js", import.meta.url), "utf8"); assert.doesNotMatch(source, /\b(fetch|XMLHttpRequest|WebSocket|http:\/\/|https:\/\/)\b/);
console.log("daily observation contract verification: PASS");

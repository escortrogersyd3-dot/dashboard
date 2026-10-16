import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const core = readFileSync(new URL("../../src/ui/interface-core.tsx", import.meta.url), "utf8");
const page = readFileSync(new URL("../../app/page.tsx", import.meta.url), "utf8");
const contract = readFileSync(new URL("../../docs/contracts/V7_073_PRESENTATION_STATE_I18N_BOUNDARY.md", import.meta.url), "utf8");
const states = ["LOADING", "EMPTY", "STALE", "UNKNOWN", "ERROR", "PERMISSION"];

for (const state of states) {
  assert.match(core, new RegExp(`${state}: \\{ state: "${state}", data: null \\}`), `missing null fixture for ${state}`);
  assert.match(core, new RegExp(`${state}: \\{ title: "${state}", chinese:`), `missing bilingual copy for ${state}`);
}
assert.equal((core.match(/state: "[A-Z]+", data: null/g) ?? []).length, 6, "offline fixtures must be null-only");
assert.ok((core.match(/lang="vi"/g) ?? []).length >= 1, "state panels require Vietnamese copy");
assert.ok((page.match(/lang="vi"/g) ?? []).length >= 2, "module surfaces require Vietnamese copy");
for (const forbidden of ["fetch(", "localStorage", "sessionStorage", "WebSocket", "XMLHttpRequest", "permission decision", "revenue", "amount:"]) assert.ok(!core.includes(forbidden) && !page.includes(forbidden), `forbidden state-layer content: ${forbidden}`);
assert.match(contract, /data: null/, "contract must retain null rule");
console.log("presentation states and i18n verification: PASS");

import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const source = await readFile(new URL("../../src/ui/daily-summary.tsx", import.meta.url), "utf8");
assert.equal((source.match(/source: /g) ?? []).length, 4, "summary must retain four frozen slots");
assert.match(source, /PresentationState state="EMPTY"/);
assert.doesNotMatch(source, /\b(fetch|XMLHttpRequest|WebSocket|http:\/\/|https:\/\/)\b/);
assert.doesNotMatch(source, /\$|\d+%|\b\d{2,}\b/);
console.log("daily summary verification: PASS");

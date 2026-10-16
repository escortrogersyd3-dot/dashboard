import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const preview = readFileSync(new URL("../../public/observeros-v7-offline-preview.html", import.meta.url), "utf8");
for (const required of ["<!doctype html>", "HOLD LIVE INTEGRATION", "MOCK-ONLY", "DAILY", "WEEKLY", "INSIGHT", "EMPTY", "UNKNOWN", "PERMISSION", "lang=\"vi\""]) assert.ok(preview.includes(required), `missing offline preview evidence: ${required}`);
for (const forbidden of ["http://", "https://", "<script", "fetch(", "WebSocket", "XMLHttpRequest", "localStorage", "sessionStorage", "navigator.mediaDevices", "src="]) assert.ok(!preview.includes(forbidden), `forbidden offline preview primitive: ${forbidden}`);
console.log("offline V7 preview verification: PASS");

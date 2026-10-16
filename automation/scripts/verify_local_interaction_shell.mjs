import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const source = readFileSync(new URL("../../src/ui/interface-core.tsx", import.meta.url), "utf8");
const page = readFileSync(new URL("../../app/page.tsx", import.meta.url), "utf8");

for (const required of ["useState", "HTMLDialogElement", "showModal", "v7-drawer", "role=\"tablist\"", "刷新后即复位", "scrollIntoView"]) assert.match(source, new RegExp(required.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")), `missing local interaction: ${required}`);
assert.ok(page.includes("id={page.toLowerCase()}"), "missing frozen page anchor evidence");
for (const forbidden of ["fetch(", "XMLHttpRequest", "WebSocket", "localStorage", "sessionStorage", "document.cookie", "setInterval", "setTimeout", "navigator.mediaDevices"]) assert.ok(!source.includes(forbidden), `forbidden non-local interaction primitive: ${forbidden}`);
console.log("local interaction shell verification: PASS");

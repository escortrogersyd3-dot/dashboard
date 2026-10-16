import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const core = readFileSync(new URL("../../src/ui/interface-core.tsx", import.meta.url), "utf8");
const css = readFileSync(new URL("../../app/globals.css", import.meta.url), "utf8");

for (const required of ["v7-skip-link", "#main-content", "id=\"main-content\"", "tabIndex={-1}", "prefers-reduced-motion", "aria-label=\"Desktop presentation navigation\"", "aria-label={mobile ? \"Mobile dashboard sections\"", "HTMLDialogElement", "requestAnimationFrame"]) assert.ok(core.includes(required) || css.includes(required), `missing accessibility evidence: ${required}`);
for (const required of [".v7-skip-link:focus", ":focus-visible", "@media(max-width:600px)", "grid-template-columns:1fr", "grid-template-columns:repeat(2,minmax(0,1fr))", "prefers-reduced-motion"]) assert.ok(css.includes(required), `missing responsive evidence: ${required}`);
for (const forbidden of ["fetch(", "localStorage", "sessionStorage", "WebSocket", "XMLHttpRequest", "navigator.mediaDevices"]) assert.ok(!core.includes(forbidden) && !css.includes(forbidden), `forbidden non-local primitive: ${forbidden}`);
console.log("accessibility and responsive verification: PASS");

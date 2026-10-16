import { readFileSync } from "node:fs";

const files = {
  css: readFileSync("app/globals.css", "utf8"),
  page: readFileSync("app/page.tsx", "utf8"),
  shell: readFileSync("src/ui/interface-core.tsx", "utf8"),
};

for (const token of ["--v7-bg:#15191e","--v7-nav:#1b2026","--v7-panel:#222a32","--v7-orange:#f8a13e","grid-template-columns:228px minmax(0,1fr)","@media(max-width:880px)","grid-template-columns:repeat(3,minmax(0,1fr))","grid-template-columns:repeat(2,minmax(0,1fr))"]) {
  if (!files.css.includes(token)) throw new Error("missing V7 fidelity token: " + token);
}
for (const token of ["Observer OS","展示角色 · 非真实登录","LOCAL · PRESENTATION ONLY","自动巡查 · HOLD","v7-bottom-nav","V7 fidelity shell"]) {
  if (!(files.shell + files.page).includes(token)) throw new Error("missing V7 shell element: " + token);
}
for (const forbidden of ["fetch(","http://","https://","WebSocket","localStorage","sessionStorage","Date.now(","Math.random("]) {
  if ((files.css + files.page + files.shell).includes(forbidden)) throw new Error("forbidden V7 shell behavior: " + forbidden);
}
console.log("V7 fidelity shell verification: PASS");

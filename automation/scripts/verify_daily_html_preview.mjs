import { readFileSync } from "node:fs";

const source = readFileSync("public/current-progress.html", "utf8");
const required = ["Current summary", "Current tasks", "Dynamic module stack", "Observation", "Rooms and logistics", "Website booking and service", "Work and current summary", "EMPTY / Mock-only", "ObserverOS input not connected"];
const forbidden = ["<script", "<form", "http://", "https://", "fetch(", "XMLHttpRequest", "WebSocket", "localStorage", "appointment", "customer", "camera", "revenue", "amount", "priorityScore"];

for (const value of required) if (!source.includes(value)) throw new Error(`missing required preview element: ${value}`);
for (const value of forbidden) if (source.includes(value)) throw new Error(`forbidden preview behavior or field: ${value}`);
if ((source.match(/required/g) ?? []).length !== 9) throw new Error("preview must contain exactly nine authority-required labels");
console.log("daily HTML preview verification: PASS");

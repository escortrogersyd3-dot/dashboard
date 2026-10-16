import { readFileSync } from "node:fs";

const source = readFileSync("src/ui/daily-priority-stack.tsx", "utf8");
const required = ["task-marquee", "Anchored position", "priority-stack", "Only a future verified ObserverOS source, reason, and order", "Observation", "Rooms and logistics", "Website booking and service", "Work and current summary", "PresentationState state=\"EMPTY\""];
const forbidden = ["fetch(", "axios", "XMLHttpRequest", "WebSocket", "localStorage", "setInterval", "setTimeout", "sort(", "priorityScore", "appointment", "customer", "camera", "media", "amount", "revenue"];

for (const value of required) if (!source.includes(value)) throw new Error(`missing required priority-stack boundary: ${value}`);
for (const value of forbidden) if (source.includes(value)) throw new Error(`forbidden priority-stack behavior or field: ${value}`);
if ((source.match(/source: "/g) ?? []).length !== 4) throw new Error("priority stack must expose exactly four frozen module authority labels");
console.log("daily priority stack verification: PASS");

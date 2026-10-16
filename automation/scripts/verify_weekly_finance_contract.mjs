import { readFileSync } from "node:fs";
const schema = readFileSync("schemas/proposed-weekly-finance-v1.schema.json", "utf8");
const adapter = readFileSync("src/adapters/proposed-weekly-finance-contract.js", "utf8");
for (const value of ["projection_ref", "availability", "LOADING", "EMPTY", "STALE", "UNKNOWN", "ERROR", "PERMISSION"]) if (!schema.includes(value)) throw new Error(`missing finance contract boundary: ${value}`);
for (const value of ["amount", "ledger", "invoice", "payment", "gst", "fetch(", "XMLHttpRequest", "WebSocket"]) if (schema.toLowerCase().includes(value.toLowerCase()) || adapter.toLowerCase().includes(value.toLowerCase())) throw new Error(`forbidden finance contract field or network primitive: ${value}`);
if (!adapter.includes("data: null")) throw new Error("mock data must be null");
console.log("weekly finance contract verification: PASS");

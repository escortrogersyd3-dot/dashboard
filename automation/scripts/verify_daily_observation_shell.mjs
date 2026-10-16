import { readFileSync } from "node:fs";
const source=readFileSync("src/ui/daily-observation.tsx","utf8");
for (const value of ["Observation and exceptions","Authorized opaque reference required","PresentationState state=\"EMPTY\""]) if (!source.includes(value)) throw new Error(`missing observation shell boundary: ${value}`);
if ((source.match(/Observation slot/g)??[]).length !== 6) throw new Error("observation shell must expose six frozen empty locations");
for (const value of ["fetch(","camera","media","person","room","alert","patrol","WebSocket"]) if (source.includes(value)) throw new Error(`forbidden observation shell content: ${value}`);
console.log("daily observation shell verification: PASS");

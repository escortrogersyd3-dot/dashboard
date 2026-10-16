import { readFileSync } from "node:fs";

const source = readFileSync("docs/planning/PRE_OBSERVEROS_EXECUTION_PHASE_R1.md", "utf8");
const ids = ["V7-060", "V7-013", "V7-014", "V7-015", "V7-016", "V7-020", "V7-021", "V7-022", "V7-023", "V7-024", "V7-030", "V7-031", "V7-032", "V7-033", "V7-034", "V7-035", "V7-040", "V7-041", "V7-050", "V7-051"];
const headings = ["Objective and exit result", "Entry gates and shared constraints", "OTP execution plan", "Required final delivery", "Live integration gate after this phase"];
for (const id of ids) if (!source.includes(id)) throw new Error(`missing planned OTP: ${id}`);
for (const heading of headings) if (!source.includes(heading)) throw new Error(`missing governance heading: ${heading}`);
if (!source.includes("HOLD_LIVE_INTEGRATION")) throw new Error("missing live integration hold");
console.log("Pre-ObserverOS phase plan verification: PASS");

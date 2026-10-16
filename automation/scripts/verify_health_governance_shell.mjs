import {readFileSync} from "node:fs";
const source=readFileSync("src/ui/health-governance.tsx","utf8");
for(const value of ["INSIGHT · Health and governance","Health","Governance","Approved ObserverOS authority is required","PresentationState state=\"EMPTY\""])if(!source.includes(value))throw new Error(`missing health shell boundary: ${value}`);
for(const value of ["fetch(","device_id","heartbeat","access_list","audit_log","localStorage","Date("])if(source.toLowerCase().includes(value))throw new Error(`forbidden health behavior or field: ${value}`);
console.log("health governance shell verification: PASS");

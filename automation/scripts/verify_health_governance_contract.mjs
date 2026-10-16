import {readFileSync} from "node:fs";
const schema=readFileSync("schemas/proposed-health-governance-v1.schema.json","utf8"),adapter=readFileSync("src/adapters/proposed-health-governance-contract.js","utf8");
for(const value of ["projection_ref","availability","LOADING","EMPTY","STALE","UNKNOWN","ERROR","PERMISSION"])if(!schema.includes(value))throw new Error(`missing health boundary: ${value}`);
for(const value of ["device","heartbeat","allowlist","seed","audit", "fetch(","XMLHttpRequest","WebSocket"])if(schema.toLowerCase().includes(value.toLowerCase())||adapter.toLowerCase().includes(value.toLowerCase()))throw new Error(`forbidden health field or behavior: ${value}`);
if(!adapter.includes("data:null"))throw new Error("mock health data must be null");console.log("health governance contract verification: PASS");

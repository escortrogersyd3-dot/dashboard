import {readFileSync} from "node:fs";
const schema=readFileSync("schemas/proposed-insight-results-v1.schema.json","utf8"),adapter=readFileSync("src/adapters/proposed-insight-results-contract.js","utf8");
for(const value of ["result_ref","provenance_ref","availability","LOADING","EMPTY","STALE","UNKNOWN","ERROR","PERMISSION"])if(!schema.includes(value))throw new Error(`missing insight boundary: ${value}`);
for(const value of ["recommendation","prediction","forecast","score","narrative","person_id","fetch(","XMLHttpRequest","WebSocket"])if(schema.toLowerCase().includes(value.toLowerCase())||adapter.toLowerCase().includes(value.toLowerCase()))throw new Error(`forbidden insight field or behavior: ${value}`);
if(!adapter.includes("data:null"))throw new Error("mock insight data must be null");
console.log("insight analysis contract verification: PASS");

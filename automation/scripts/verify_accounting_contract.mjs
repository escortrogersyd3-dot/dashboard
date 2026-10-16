import {readFileSync} from "node:fs";
const schema=readFileSync("schemas/proposed-accounting-view-v1.schema.json","utf8"),adapter=readFileSync("src/adapters/proposed-accounting-view-contract.js","utf8");
for(const value of ["projection_ref","availability","LOADING","EMPTY","STALE","UNKNOWN","ERROR","PERMISSION"])if(!schema.includes(value))throw new Error(`missing accounting boundary: ${value}`);
for(const value of ["amount","ledger","invoice","payment","gst","ocr","upload","file", "fetch(","XMLHttpRequest","WebSocket"])if(schema.toLowerCase().includes(value.toLowerCase())||adapter.toLowerCase().includes(value.toLowerCase()))throw new Error(`forbidden accounting field or behavior: ${value}`);
if(!adapter.includes("data:null"))throw new Error("mock accounting data must be null");console.log("accounting contract verification: PASS");

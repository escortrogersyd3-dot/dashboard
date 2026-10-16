import {readFileSync} from "node:fs";
const source=readFileSync("public/preobserveros-showcase.html","utf8");
for(const value of ["PLANNING / RECONSTRUCTION CONTRACT","Completed Mock-only surfaces","Completed interface proposals","HOLD_LIVE_INTEGRATION","ObserverOS owns the future database, facts, calculations, permissions, audit trail and authoritative status","DAILY","WEEKLY","INSIGHT"])if(!source.includes(value))throw new Error(`missing showcase boundary: ${value}`);
for(const value of ["http://","https://","fetch(","<script","websocket"])if(source.toLowerCase().includes(value))throw new Error(`forbidden showcase content: ${value}`);
console.log("Pre-ObserverOS showcase verification: PASS");

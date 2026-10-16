import {readFileSync} from "node:fs";
const source=readFileSync("src/ui/accounting-view.tsx","utf8");
for(const value of ["INSIGHT · Accounting","Accounting","Invoice workflow","Approved ObserverOS authority is required","PresentationState state=\"EMPTY\""])if(!source.includes(value))throw new Error(`missing accounting shell boundary: ${value}`);
for(const value of ["fetch(","amount","upload","input", "file", "ocr", "gst", "ledger", "payment", "localStorage", "Date("])if(source.toLowerCase().includes(value))throw new Error(`forbidden accounting behavior or field: ${value}`);
console.log("accounting shell verification: PASS");

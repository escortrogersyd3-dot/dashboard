import { readFileSync } from "node:fs";
const source=readFileSync("src/ui/weekly-finance.tsx","utf8");
for(const value of ["WEEKLY · Finance","Weekly report","Accounting view","Financial follow-up","Approved ObserverOS authority is required","PresentationState state=\"EMPTY\""])if(!source.includes(value))throw new Error(`missing weekly finance boundary: ${value}`);
for(const value of ["fetch(","amount","currency","ledger","invoice","payment","gst","chart","localStorage","Date("])if(source.toLowerCase().includes(value))throw new Error(`forbidden weekly finance behavior or field: ${value}`);
console.log("weekly finance shell verification: PASS");

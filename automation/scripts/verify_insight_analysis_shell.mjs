import {readFileSync} from "node:fs";
const source=readFileSync("src/ui/insight-analysis.tsx","utf8");
for(const value of ["INSIGHT · Analysis","Analysis","Advice","Focus","Approved ObserverOS authority is required","PresentationState state=\"EMPTY\""])if(!source.includes(value))throw new Error(`missing insight shell boundary: ${value}`);
for(const value of ["fetch(","recommendation","prediction","forecast","score","person_id","localStorage","Date("])if(source.toLowerCase().includes(value))throw new Error(`forbidden insight behavior or field: ${value}`);
console.log("insight analysis shell verification: PASS");

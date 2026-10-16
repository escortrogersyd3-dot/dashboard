import {readFileSync} from "node:fs";
const schema=readFileSync("schemas/proposed-automation-admission-v1.schema.json","utf8"),doc=readFileSync("docs/contracts/AUTOMATION_ADMISSION_CONTRACT_V1.md","utf8");
for(const value of ["automation-admission-v1","otp_id","otp_sha256","draft","admitted","issue_open","pr_open","merged","receipt_verified","hold","fail"])if(!schema.includes(value))throw new Error(`missing control-plane boundary: ${value}`);
for(const value of ["scheduler","GitHub client","deployment trigger","credential store","database","ObserverOS authority"])if(!doc.includes(value))throw new Error(`missing explicit prohibition: ${value}`);
for(const value of ["fetch(","setInterval(","setTimeout(","cron", "token"])if(schema.toLowerCase().includes(value.toLowerCase()))throw new Error(`forbidden automation behavior: ${value}`);
console.log("automation admission contract verification: PASS");

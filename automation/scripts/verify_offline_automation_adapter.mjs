import {readFileSync} from "node:fs";
import {validateAdmissionTransition} from "../../src/adapters/offline-automation-admission.js";
const source=readFileSync("src/adapters/offline-automation-admission.js","utf8"),hash="a".repeat(64),valid={otp_id:"OTP-V7-999-TEST-R1",otp_sha256:hash};
for(const [from,to] of [["draft","admitted"],["admitted","issue_open"],["issue_open","pr_open"],["pr_open","merged"],["merged","receipt_verified"]]){const result=validateAdmissionTransition({...valid,from,to});if(!result.ok||result.state!==to)throw new Error(`valid transition failed: ${from} to ${to}`);}
for(const attempt of [{...valid,from:"draft",to:"receipt_verified"},{...valid,otp_id:"bad",from:"draft",to:"admitted"},{...valid,otp_sha256:"bad",from:"draft",to:"admitted"},{...valid,from:"receipt_verified",to:"admitted"}])if(validateAdmissionTransition(attempt).ok)throw new Error("invalid or replay transition passed");
for(const value of ["fetch(","setInterval(","setTimeout(","XMLHttpRequest","WebSocket","child_process","token"])if(source.toLowerCase().includes(value.toLowerCase()))throw new Error(`forbidden adapter behavior: ${value}`);
console.log("offline automation adapter verification: PASS");

import {createHash} from "node:crypto";
import {readFileSync} from "node:fs";
import {execFileSync} from "node:child_process";

const baseline="F:/CDriveOffload/UserFolders/Desktop/ObserverOS_PinkHouse_V7_Full_Responsive_Demo.html";
const expected="cbafbb0fb3944071e7c8605037f7be2aba9389047cc36e2ad1767b5444ce21ec";
const actual=createHash("sha256").update(readFileSync(baseline)).digest("hex");
if(actual!==expected)throw new Error("frozen V7 baseline hash mismatch");
const checks=["mock:verify","daily-contract:verify","daily-summary:verify","daily-priority:verify","daily-html-preview:verify","preos-phase-plan:verify","daily-observation-contract:verify","daily-observation-shell:verify","website-workflow-contract:verify","daily-website-shell:verify","weekly-calendar-shell:verify","weekly-operations-contract:verify","weekly-operations-shell:verify","weekly-finance-contract:verify","weekly-finance-shell:verify","insight-analysis-contract:verify","insight-analysis-shell:verify","health-governance-contract:verify","health-governance-shell:verify","accounting-contract:verify","accounting-shell:verify","automation-admission-contract:verify","offline-automation-adapter:verify","typecheck","build","control-plane:validate"];
for(const check of checks){console.log(`REGRESSION ${check}`);if(process.platform==="win32")execFileSync(process.env.ComSpec??"cmd.exe",["/d","/s","/c",`pnpm run ${check}`],{stdio:"inherit"});else execFileSync("pnpm",["run",check],{stdio:"inherit"});}
console.log(`full Pre-ObserverOS regression: PASS (${checks.length} checks; baseline ${actual})`);

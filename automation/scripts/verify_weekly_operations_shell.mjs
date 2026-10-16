import { readFileSync } from "node:fs";

const source = readFileSync("src/ui/weekly-operations.tsx", "utf8");
for (const value of ["WEEKLY · Operations", "People", "Security", "Inventory", "Approved ObserverOS authority is required", "PresentationState state=\"EMPTY\""]) {
  if (!source.includes(value)) throw new Error(`missing weekly operations boundary: ${value}`);
}
for (const value of ["fetch(", "person_id", "customer_id", "security_event", "inventory_item", "localStorage", "Date("]) {
  if (source.includes(value)) throw new Error(`forbidden weekly operations behavior or field: ${value}`);
}
console.log("weekly operations shell verification: PASS");

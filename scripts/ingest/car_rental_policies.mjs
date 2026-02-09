import fs from "fs";
import path from "path";

const sourcesPath = path.resolve(process.cwd(), "scripts", "ingest", "sources", "car_rental_policies.json");
const raw = fs.readFileSync(sourcesPath, "utf-8");
const policies = JSON.parse(raw);

const output = `export interface CarRentalPolicy {
  name: string;
  scope: string;
  status: "allowed" | "conditional" | "not_allowed" | "unknown";
  policy_url: string;
  source: string;
  notes: string;
  last_checked: string;
}

// AUTO-GENERATED from scripts/ingest/sources/car_rental_policies.json
export const carRentalPolicies: CarRentalPolicy[] = ${JSON.stringify(policies, null, 2)};
`;

const targetPath = path.resolve(process.cwd(), "web", "src", "data", "ingest", "car_rental.ts");
fs.writeFileSync(targetPath, output, "utf-8");
console.log(`Wrote ${policies.length} car rental policies to ${targetPath}`);

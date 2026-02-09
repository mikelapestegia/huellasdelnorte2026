import fs from "fs";
import path from "path";

const sourcesPath = path.resolve(process.cwd(), "scripts", "ingest", "sources", "boat_transport_policies.json");
const raw = fs.readFileSync(sourcesPath, "utf-8");
const policies = JSON.parse(raw);

const output = `export interface BoatTransportPolicy {
  name: string;
  scope: string;
  status: "allowed" | "conditional" | "not_allowed" | "unknown";
  policy_url: string;
  source: string;
  notes: string;
  last_checked: string;
}

// AUTO-GENERATED from scripts/ingest/sources/boat_transport_policies.json
export const boatTransportPolicies: BoatTransportPolicy[] = ${JSON.stringify(policies, null, 2)};
`;

const targetPath = path.resolve(process.cwd(), "web", "src", "data", "ingest", "boat_transport.ts");
fs.writeFileSync(targetPath, output, "utf-8");
console.log(`Wrote ${policies.length} boat transport policies to ${targetPath}`);

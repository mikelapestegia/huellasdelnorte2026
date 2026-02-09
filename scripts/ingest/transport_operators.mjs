import fs from "fs";
import path from "path";

const sourcesPath = path.resolve(process.cwd(), "scripts", "ingest", "sources", "transport_operators.json");
const raw = fs.readFileSync(sourcesPath, "utf-8");
const operators = JSON.parse(raw);

const features = operators.map((operator) => ({
  type: "Feature",
  properties: {
    name: operator.name,
    region: operator.region,
    type: operator.operator_type,
    rules: operator.notes ?? "Consulta normativa oficial del operador.",
    policy_url: operator.policy_url,
    source: operator.source,
    status: operator.status,
  },
  geometry: {
    type: "Point",
    coordinates: [operator.lon, operator.lat],
  },
}));

const output = `import type { FeatureCollection } from "geojson";

// AUTO-GENERATED from scripts/ingest/sources/transport_operators.json
export const transportServices: FeatureCollection = ${JSON.stringify(
  { type: "FeatureCollection", features },
  null,
  2,
)};
`;

const targetPath = path.resolve(process.cwd(), "web", "src", "data", "ingest", "transport.ts");
fs.writeFileSync(targetPath, output, "utf-8");
console.log(\`Wrote \${features.length} transport operators to \${targetPath}\`);

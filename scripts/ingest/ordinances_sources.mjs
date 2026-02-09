import fs from "fs";
import path from "path";

const sourcesPath = path.resolve(process.cwd(), "scripts", "ingest", "sources", "ordinances_sources.json");
const raw = fs.readFileSync(sourcesPath, "utf-8");
const sources = JSON.parse(raw);

const features = sources.map((source) => ({
  type: "Feature",
  properties: {
    name: source.source_name,
    region: source.region,
    municipality: source.municipality,
    source_url: source.source_url,
    status: source.status,
  },
  geometry: {
    type: "Point",
    coordinates: [source.lon, source.lat],
  },
}));

const output = `import type { FeatureCollection } from "geojson";

// AUTO-GENERATED from scripts/ingest/sources/ordinances_sources.json
export const ordinances: FeatureCollection = ${JSON.stringify(
  { type: "FeatureCollection", features },
  null,
  2,
)};
`;

const targetPath = path.resolve(process.cwd(), "web", "src", "data", "ingest", "ordinances.ts");
fs.writeFileSync(targetPath, output, "utf-8");
console.log(\`Wrote \${features.length} ordinance sources to \${targetPath}\`);

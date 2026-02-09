import fs from "fs";
import path from "path";

const sourcesPath = path.resolve(process.cwd(), "scripts", "ingest", "sources", "assistance_centers.json");
const geoPath = path.resolve(process.cwd(), "scripts", "ingest", "sources", "assistance_centers_geocodes.json");
const raw = fs.readFileSync(sourcesPath, "utf-8");
const centers = JSON.parse(raw);
const geocodes = fs.existsSync(geoPath) ? JSON.parse(fs.readFileSync(geoPath, "utf-8")) : [];

const geocodeMap = new Map(geocodes.map((item) => [item.name, item]));
const enriched = centers.map((center) => {
  const geo = geocodeMap.get(center.name);
  return {
    ...center,
    latitude: geo?.latitude ?? null,
    longitude: geo?.longitude ?? null,
    geocode_status: geo?.geocode_status ?? "pending",
    geocode_precision: geo?.geocode_precision ?? "city",
    geocode_source: geo?.geocode_source ?? "manual",
  };
});

const output = `export interface AssistanceCenter {
  name: string;
  entity_type: string;
  support_type: "guide" | "assistance" | "therapy" | "mixed";
  region: string;
  province: string;
  city: string;
  country: string;
  coverage: string;
  website: string;
  source_url: string;
  source_type: string;
  notes: string;
  last_verified_at: string;
  latitude?: number | null;
  longitude?: number | null;
  geocode_status?: string;
  geocode_precision?: string;
  geocode_source?: string;
}

// AUTO-GENERATED from scripts/ingest/sources/assistance_centers.json
export const assistanceCenters: AssistanceCenter[] = ${JSON.stringify(enriched, null, 2)};
`;

const targetPath = path.resolve(process.cwd(), "web", "src", "data", "ingest", "assistance_centers.ts");
fs.writeFileSync(targetPath, output, "utf-8");

// CSV export
const exportDir = path.resolve(process.cwd(), "data", "exports");
fs.mkdirSync(exportDir, { recursive: true });
const csvPath = path.join(exportDir, "assistance_centers.csv");
const headers = [
  "name",
  "entity_type",
  "support_type",
  "region",
  "province",
  "city",
  "country",
  "coverage",
  "website",
  "source_url",
  "source_type",
  "notes",
  "last_verified_at",
  "latitude",
  "longitude",
  "geocode_status",
  "geocode_precision",
  "geocode_source"
];
const csvEscape = (value) => {
  if (value === null || value === undefined) return "";
  const text = String(value);
  if (/[,"\n\r]/.test(text)) {
    return `"${text.replace(/"/g, '""')}"`;
  }
  return text;
};
const csvLines = [headers.join(",")];
for (const row of enriched) {
  csvLines.push(headers.map((h) => csvEscape(row[h] ?? "")).join(","));
}
fs.writeFileSync(csvPath, `${csvLines.join("\n")}\n`, "utf-8");

// SQL seed
const seedDir = path.resolve(process.cwd(), "database", "seed");
fs.mkdirSync(seedDir, { recursive: true });
const seedPath = path.join(seedDir, "assistance_centers.sql");
const sqlValue = (value) => {
  if (value === null || value === undefined || value === "") return "NULL";
  return `'${String(value).replace(/'/g, "''")}'`;
};
const sqlColumns = headers;
const values = enriched.map((row) =>
  `(${sqlColumns.map((h) => sqlValue(row[h] ?? "")).join(", ")})`,
);
const sql = `-- AUTO-GENERATED seed data for assistance_centers\n-- Generated from scripts/ingest/sources/assistance_centers.json\n\nINSERT INTO assistance_centers (${sqlColumns.join(", ")}) VALUES\n${values.join(",\n")};\n`;
fs.writeFileSync(seedPath, sql, "utf-8");

console.log(`Wrote ${enriched.length} assistance centers to ${targetPath}`);
console.log(`Exported CSV to ${csvPath}`);
console.log(`Exported SQL seed to ${seedPath}`);

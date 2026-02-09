import fs from "fs";
import path from "path";

const sourcesPath = path.resolve(process.cwd(), "scripts", "ingest", "sources", "assistance_centers.json");
const geoPath = path.resolve(process.cwd(), "scripts", "ingest", "sources", "assistance_centers_geocodes.json");

const centers = JSON.parse(fs.readFileSync(sourcesPath, "utf-8"));
const geocodes = fs.existsSync(geoPath) ? JSON.parse(fs.readFileSync(geoPath, "utf-8")) : [];
const geocodeMap = new Map(geocodes.map((item) => [item.name, item]));

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const nominatimUrl = process.env.NOMINATIM_URL ?? "https://nominatim.openstreetmap.org/search";
const userAgent = process.env.NOMINATIM_USER_AGENT ?? "HuellasDelNorte/1.0 (contact@example.com)";

const buildQuery = (center) => {
  const parts = [center.name, center.city, center.province, center.region, center.country]
    .filter(Boolean)
    .join(", ");
  return parts;
};

let updated = 0;
for (const center of centers) {
  const existing = geocodeMap.get(center.name);
  if (existing?.latitude && existing?.longitude) {
    continue;
  }

  const q = buildQuery(center);
  if (!q) {
    continue;
  }

  const url = `${nominatimUrl}?format=jsonv2&q=${encodeURIComponent(q)}&limit=1`;
  try {
    const res = await fetch(url, {
      headers: {
        "User-Agent": userAgent,
      },
    });
    if (!res.ok) {
      throw new Error(`Geocode failed (${res.status}) for ${center.name}`);
    }
    const data = await res.json();
    if (Array.isArray(data) && data.length > 0) {
      const hit = data[0];
      geocodeMap.set(center.name, {
        name: center.name,
        latitude: Number(hit.lat),
        longitude: Number(hit.lon),
        geocode_status: "verified",
        geocode_precision: hit.type ?? "city",
        geocode_source: "nominatim",
      });
      updated += 1;
    }
  } catch (err) {
    // Keep pending if fetch fails
  }

  await sleep(1200);
}

const merged = centers.map((center) => {
  return (
    geocodeMap.get(center.name) ?? {
      name: center.name,
      latitude: null,
      longitude: null,
      geocode_status: "pending",
      geocode_precision: "city",
      geocode_source: "manual",
    }
  );
});

fs.writeFileSync(geoPath, JSON.stringify(merged, null, 2) + "\n", "utf-8");
console.log(`Updated geocodes for ${updated} centers. Output: ${geoPath}`);

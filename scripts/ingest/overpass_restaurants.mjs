import fs from "fs";
import path from "path";

const regions = [
  { name: "Navarra", bbox: [-2.5, 41.8, -1.0, 43.3] },
  { name: "País Vasco", bbox: [-3.4, 42.8, -1.7, 43.5] },
  { name: "Cantabria", bbox: [-4.7, 42.9, -3.0, 43.6] },
  { name: "Asturias", bbox: [-7.2, 42.8, -4.4, 43.7] },
  { name: "Galicia", bbox: [-9.3, 41.7, -6.6, 43.8] },
  { name: "País Vasco francés", bbox: [-1.8, 42.8, -0.7, 43.6] },
];

const overpassUrl = "https://overpass-api.de/api/interpreter";

const queryForRegion = (bbox) => `
[out:json][timeout:120];
(
  node["amenity"~"restaurant|cafe|fast_food"]["dog"~"yes|outside|leashed"](${bbox[1]},${bbox[0]},${bbox[3]},${bbox[2]});
  node["amenity"~"restaurant|cafe|fast_food"]["pets"~"yes|allowed"](${bbox[1]},${bbox[0]},${bbox[3]},${bbox[2]});
  way["amenity"~"restaurant|cafe|fast_food"]["dog"~"yes|outside|leashed"](${bbox[1]},${bbox[0]},${bbox[3]},${bbox[2]});
  way["amenity"~"restaurant|cafe|fast_food"]["pets"~"yes|allowed"](${bbox[1]},${bbox[0]},${bbox[3]},${bbox[2]});
  relation["amenity"~"restaurant|cafe|fast_food"]["dog"~"yes|outside|leashed"](${bbox[1]},${bbox[0]},${bbox[3]},${bbox[2]});
  relation["amenity"~"restaurant|cafe|fast_food"]["pets"~"yes|allowed"](${bbox[1]},${bbox[0]},${bbox[3]},${bbox[2]});
);
out center tags;
`;

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const toFeature = (element, region) => {
  const lon = element.lon ?? element.center?.lon;
  const lat = element.lat ?? element.center?.lat;
  if (lon === undefined || lat === undefined) {
    return null;
  }
  return {
    type: "Feature",
    properties: {
      name: element.tags?.name ?? "Sin nombre",
      region,
      amenity: element.tags?.amenity ?? "restaurant",
      policy: element.tags?.dog ?? element.tags?.pets ?? "unknown",
      source: "OSM",
      osm_id: element.id,
    },
    geometry: {
      type: "Point",
      coordinates: [lon, lat],
    },
  };
};

const main = async () => {
  const features = [];

  for (const region of regions) {
    const body = queryForRegion(region.bbox);
    const response = await fetch(overpassUrl, {
      method: "POST",
      body,
      headers: { "Content-Type": "text/plain" },
    });

    if (!response.ok) {
      throw new Error(`Overpass error for ${region.name}: ${response.status}`);
    }

    const data = await response.json();
    const regionFeatures = data.elements
      .map((element) => toFeature(element, region.name))
      .filter(Boolean);
    features.push(...regionFeatures);

    await sleep(2000);
  }

  const output = `import type { FeatureCollection } from "geojson";

// AUTO-GENERATED: ${new Date().toISOString()}
export const restaurants: FeatureCollection = ${JSON.stringify(
    { type: "FeatureCollection", features },
    null,
    2,
  )};
`;

  const targetPath = path.resolve(
    process.cwd(),
    "web",
    "src",
    "data",
    "ingest",
    "restaurants.ts",
  );
  fs.writeFileSync(targetPath, output, "utf-8");
  console.log(`Wrote ${features.length} restaurant features to ${targetPath}`);
};

main().catch((error) => {
  console.error(error);
  process.exit(1);
});

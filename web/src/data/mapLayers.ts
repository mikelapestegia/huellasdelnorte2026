import type { FeatureCollection } from "geojson";
import { restaurants } from "@/data/ingest/restaurants";
import { transportServices } from "@/data/ingest/transport";
import { ordinances } from "@/data/ingest/ordinances";
import { assistanceCenters } from "@/data/ingest/assistance_centers";

export type LayerKey =
  | "beaches"
  | "vets24"
  | "kennels"
  | "routes"
  | "restaurants"
  | "transport"
  | "ordinances"
  | "assistance_centers";

export interface LayerConfig {
  key: LayerKey;
  label: string;
  color: string;
  type: "point" | "line";
  description: string;
}

export const layerConfigs: LayerConfig[] = [
  {
    key: "beaches",
    label: "Playas aptas para perros",
    color: "#2d4a3e",
    type: "point",
    description: "Zonas permitidas y temporadas por región.",
  },
  {
    key: "vets24",
    label: "Veterinarios 24h",
    color: "#c27ba0",
    type: "point",
    description: "Clínicas con atención continua y urgencias.",
  },
  {
    key: "kennels",
    label: "Guarderías caninas (ocupación)",
    color: "#d1a73a",
    type: "point",
    description: "Disponibilidad en tiempo real vía integración.",
  },
  {
    key: "routes",
    label: "Rutas con agua y sombra",
    color: "#4a7a67",
    type: "line",
    description: "Rutas verificadas con criterios caninos.",
  },
  {
    key: "restaurants",
    label: "Restaurantes pet friendly",
    color: "#b46a55",
    type: "point",
    description: "Restaurantes y cafeterías que admiten perros.",
  },
  {
    key: "transport",
    label: "Transporte con perro",
    color: "#2f6f8a",
    type: "point",
    description: "Estaciones y servicios con normativa pet friendly.",
  },
  {
    key: "ordinances",
    label: "Ordenanzas y normativa",
    color: "#5c4b7a",
    type: "point",
    description: "Municipios con ordenanzas caninas vigentes.",
  },
  {
    key: "assistance_centers",
    label: "Perros de apoyo",
    color: "#3c6fa4",
    type: "point",
    description: "Centros y asociaciones de perros guía, asistencia y terapia.",
  },
];

const assistanceCentersGeo: FeatureCollection = {
  type: "FeatureCollection",
  features: assistanceCenters
    .filter(
      (center) =>
        typeof center.latitude === "number" && typeof center.longitude === "number",
    )
    .map((center) => ({
      type: "Feature",
      properties: {
        name: center.name,
        region: center.region,
        support_type: center.support_type,
        entity_type: center.entity_type,
        coverage: center.coverage,
      },
      geometry: {
        type: "Point",
        coordinates: [center.longitude as number, center.latitude as number],
      },
    })),
};

export const layerData: Record<LayerKey, FeatureCollection> = {
  beaches: {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        properties: {
          name: "Playa del Rinconín (Gijón)",
          region: "Asturias",
          season: "Todo el año",
          video: "https://www.youtube.com/watch?v=example1",
        },
        geometry: {
          type: "Point",
          coordinates: [-5.6384, 43.5452],
        },
      },
      {
        type: "Feature",
        properties: {
          name: "Cala de Bayas (El Sablón)",
          region: "Asturias",
          season: "Todo el año",
        },
        geometry: {
          type: "Point",
          coordinates: [-6.0423, 43.5721],
        },
      },
      {
        type: "Feature",
        properties: {
          name: "Playa de la Maza (San Vicente)",
          region: "Cantabria",
          season: "Todo el año",
        },
        geometry: {
          type: "Point",
          coordinates: [-4.3945, 43.3876],
        },
      },
      {
        type: "Feature",
        properties: {
          name: "Playa Arcisero (Castro Urdiales)",
          region: "Cantabria",
          season: "Todo el año",
        },
        geometry: {
          type: "Point",
          coordinates: [-3.2089, 43.3912],
        },
      },
      {
        type: "Feature",
        properties: {
          name: "Playa de Arenillas (Islares)",
          region: "Cantabria",
          season: "Todo el año",
        },
        geometry: {
          type: "Point",
          coordinates: [-3.3087, 43.3981],
        },
      },
      {
        type: "Feature",
        properties: {
          name: "Playa de Muriola (La Cantera)",
          region: "Euskadi",
          season: "Todo el año",
        },
        geometry: {
          type: "Point",
          coordinates: [-2.9641, 43.4076],
        },
      },
      {
        type: "Feature",
        properties: {
          name: "Playa de O Espiño (O Grove)",
          region: "Galicia",
          season: "Todo el año",
        },
        geometry: {
          type: "Point",
          coordinates: [-8.8631, 42.4934],
        },
      },
      {
        type: "Feature",
        properties: {
          name: "Playa de la Magdalena (Cabanas)",
          region: "Galicia",
          season: "Todo el año",
        },
        geometry: {
          type: "Point",
          coordinates: [-8.1633, 43.4801],
        },
      },
      {
        type: "Feature",
        properties: {
          name: "Playa de Zarautz (Fuera de temporada)",
          region: "Euskadi",
          season: "1 Oct - 31 May",
        },
        geometry: {
          type: "Point",
          coordinates: [-2.1729, 43.2866],
        },
      },
      {
        type: "Feature",
        properties: {
          name: "Playa Fluvial de Arija (Embalse del Ebro)",
          region: "Castilla y León",
          season: "Todo el año",
          notes: "Arena fina y agua dulce. Un paraíso interior.",
        },
        geometry: {
          type: "Point",
          coordinates: [-3.9458, 42.9775],
        },
      },
      {
        type: "Feature",
        properties: {
          name: "Embalse de Alloz (Zona Lerate)",
          region: "Navarra",
          season: "Todo el año",
          notes: "Aguas tranquilas azul turquesa. Ideal paddle surf.",
        },
        geometry: {
          type: "Point",
          coordinates: [-1.9791, 42.7236],
        },
      },
    ],
  },
  vets24: {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        properties: {
          name: "Urgencias Veterinarias Bilbao 24h",
          region: "Euskadi",
          phone: "+34 944 000 000",
        },
        geometry: {
          type: "Point",
          coordinates: [-2.9349, 43.2630],
        },
      },
      {
        type: "Feature",
        properties: {
          name: "Clínica Veterinaria 24h Pamplona",
          region: "Navarra",
          phone: "+34 948 000 000",
        },
        geometry: {
          type: "Point",
          coordinates: [-1.6442, 42.8125],
        },
      },
    ],
  },
  kennels: {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        properties: {
          name: "Guardería Norte Dogs",
          region: "Asturias",
          occupancy_level: "low",
          occupancy: "35%",
          capacity: "42 plazas",
        },
        geometry: {
          type: "Point",
          coordinates: [-5.8448, 43.3603],
        },
      },
      {
        type: "Feature",
        properties: {
          name: "Hotel Canino Costa",
          region: "Cantabria",
          occupancy_level: "mid",
          occupancy: "68%",
          capacity: "60 plazas",
        },
        geometry: {
          type: "Point",
          coordinates: [-3.8012, 43.4623],
        },
      },
      {
        type: "Feature",
        properties: {
          name: "Guardería Atlántica",
          region: "Galicia",
          occupancy_level: "high",
          occupancy: "92%",
          capacity: "36 plazas",
        },
        geometry: {
          type: "Point",
          coordinates: [-8.4122, 43.3562],
        },
      },
    ],
  },
  routes: {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        properties: {
          name: "Senda fluvial con sombra",
          region: "Navarra",
          difficulty: "Fácil",
          water_points: 3,
        },
        geometry: {
          type: "LineString",
          coordinates: [
            [-1.6903, 42.8208],
            [-1.6831, 42.8265],
            [-1.6734, 42.8332],
            [-1.6629, 42.8401],
          ],
        },
      },
      {
        type: "Feature",
        properties: {
          name: "Ruta ribera arbolada",
          region: "Euskadi",
          difficulty: "Media",
          water_points: 2,
        },
        geometry: {
          type: "LineString",
          coordinates: [
            [-2.6782, 43.2567],
            [-2.6708, 43.2621],
            [-2.6627, 43.2669],
            [-2.6545, 43.2701],
          ],
        },
      },
    ],
  },
  restaurants,
  transport: transportServices,
  ordinances,
  assistance_centers: assistanceCentersGeo,
};

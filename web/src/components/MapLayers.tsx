"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import maplibregl from "maplibre-gl";
import { Layers, MapPinned, RefreshCcw } from "lucide-react";
import type { FeatureCollection } from "geojson";
import { layerConfigs as fallbackConfigs, layerData as fallbackData, LayerKey, LayerConfig } from "@/data/mapLayers";

const defaultActiveLayers: LayerKey[] = [
  "beaches",
  "vets24",
  "kennels",
  "routes",
  "restaurants",
  "transport",
  "ordinances",
  "assistance_centers",
];

export default function MapLayers() {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);
  const mapLoadedRef = useRef(false);
  const registeredLayerIdsRef = useRef<Set<string>>(new Set());
  const configsRef = useRef<LayerConfig[]>(fallbackConfigs);
  const layerIdsRef = useRef<string[]>(fallbackConfigs.map((layer) => `${layer.key}-layer`));
  const [activeLayers, setActiveLayers] = useState<LayerKey[]>(defaultActiveLayers);
  const [configs, setConfigs] = useState<LayerConfig[]>(fallbackConfigs);
  const [data, setData] = useState<Record<LayerKey, FeatureCollection>>(fallbackData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const layerIds = useMemo(() => configs.map((layer) => `${layer.key}-layer`), [configs]);

  useEffect(() => {
    configsRef.current = configs;
    layerIdsRef.current = configs.map((layer) => `${layer.key}-layer`);
  }, [configs]);

  useEffect(() => {
    const load = async () => {
      try {
        const response = await fetch("/api/map/layers", { cache: "no-store" });
        if (!response.ok) {
          throw new Error(`Request failed: ${response.status}`);
        }
        const payload = (await response.json()) as {
          layers?: LayerConfig[];
          data?: Record<LayerKey, FeatureCollection>;
        };
        if (payload.layers && payload.data) {
          setConfigs(payload.layers);
          setData(payload.data);
        }
      } catch (err) {
        setError("No se pudieron cargar las capas desde la API. Usando datos locales.");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) {
      return;
    }

    const map = new maplibregl.Map({
      container: mapContainerRef.current,
      style: {
        version: 8,
        sources: {
          "osm-tiles": {
            type: "raster",
            tiles: ["https://tile.openstreetmap.org/{z}/{x}/{y}.png"],
            tileSize: 256,
            attribution: "© OpenStreetMap contributors",
          },
        },
        layers: [
          {
            id: "osm-base",
            type: "raster",
            source: "osm-tiles",
          },
        ],
      },
      center: [-3.0, 43.1],
      zoom: 6.4,
    });

    map.addControl(new maplibregl.NavigationControl({ visualizePitch: true }), "top-right");
    map.addControl(new maplibregl.FullscreenControl(), "top-right");

    map.on("load", () => {
      mapLoadedRef.current = true;
    });

    map.on("click", (event) => {
      const features = map.queryRenderedFeatures(event.point, { layers: layerIdsRef.current });
      if (!features.length) {
        return;
      }

      const feature = features[0];
      const props = feature.properties ?? {};
      const name = props.name ?? "Elemento";
      const region = props.region ? `<div><strong>Región:</strong> ${props.region}</div>` : "";
      const extra =
        props.occupancy
          ? `<div><strong>Ocupación:</strong> ${props.occupancy}</div>`
          : props.season
            ? `<div><strong>Temporada:</strong> ${props.season}</div>`
            : props.difficulty
              ? `<div><strong>Dificultad:</strong> ${props.difficulty}</div>`
              : props.support_type
                ? `<div><strong>Tipo:</strong> ${props.support_type}</div>`
                : "";

      new maplibregl.Popup({ closeButton: true })
        .setLngLat(event.lngLat)
        .setHTML(`<div><strong>${name}</strong>${region}${extra}</div>`)
        .addTo(map);
    });

    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
      mapLoadedRef.current = false;
      registeredLayerIdsRef.current.clear();
    };
  }, []);

  useEffect(() => {
    const map = mapRef.current;
    if (!map || !mapLoadedRef.current) {
      return;
    }

    configs.forEach((layer) => {
      const source = map.getSource(layer.key) as maplibregl.GeoJSONSource | undefined;
      if (!source) {
        map.addSource(layer.key, {
          type: "geojson",
          data: data[layer.key],
        });
      } else {
        source.setData(data[layer.key]);
      }

      if (!map.getLayer(`${layer.key}-layer`)) {
        if (layer.type === "line") {
          map.addLayer({
            id: `${layer.key}-layer`,
            type: "line",
            source: layer.key,
            paint: {
              "line-color": layer.color,
              "line-width": 3,
              "line-opacity": 0.85,
            },
          });
        } else {
          const circleColor: maplibregl.ExpressionSpecification | string =
            layer.key === "kennels"
              ? [
                "match",
                ["get", "occupancy_level"],
                "low",
                "#2d7d46",
                "mid",
                "#d1a73a",
                "high",
                "#d8604c",
                layer.color,
              ] as maplibregl.ExpressionSpecification
              : layer.color;

          map.addLayer({
            id: `${layer.key}-layer`,
            type: "circle",
            source: layer.key,
            paint: {
              "circle-radius": 7,
              "circle-color": circleColor as maplibregl.ExpressionSpecification,
              "circle-stroke-color": "#ffffff",
              "circle-stroke-width": 1.5,
              "circle-opacity": 0.9,
            },
          });
        }
      }

      const layerId = `${layer.key}-layer`;
      if (!registeredLayerIdsRef.current.has(layerId)) {
        map.on("mouseenter", layerId, () => {
          map.getCanvas().style.cursor = "pointer";
        });
        map.on("mouseleave", layerId, () => {
          map.getCanvas().style.cursor = "";
        });
        registeredLayerIdsRef.current.add(layerId);
      }
    });

    configs.forEach((layer) => {
      if (!map.getLayer(`${layer.key}-layer`)) {
        return;
      }
      const isActive = activeLayers.includes(layer.key);
      map.setLayoutProperty(`${layer.key}-layer`, "visibility", isActive ? "visible" : "none");
    });
  }, [configs, data, activeLayers]);

  const toggleLayer = (key: LayerKey) => {
    setActiveLayers((prev) =>
      prev.includes(key) ? prev.filter((layer) => layer !== key) : [...prev, key],
    );
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-[320px_1fr] gap-8">
      <aside className="rounded-2xl border border-border bg-card/80 p-6 shadow-lg">
        <div className="flex items-center gap-3 mb-6">
          <Layers className="h-5 w-5 text-primary" />
          <h3 className="font-serif text-xl font-bold text-foreground">Capas del mapa</h3>
        </div>

        {loading && (
          <p className="mb-4 text-sm text-foreground/60">Cargando capas desde la API...</p>
        )}
        {error && (
          <p className="mb-4 text-xs text-red-600">{error}</p>
        )}

        <div className="space-y-4">
          {configs.map((layer) => {
            const isActive = activeLayers.includes(layer.key);
            return (
              <button
                key={layer.key}
                type="button"
                onClick={() => toggleLayer(layer.key)}
                className={`w-full rounded-xl border px-4 py-3 text-left transition ${isActive ? "border-primary bg-primary/10" : "border-border bg-card"
                  }`}
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span
                      className="h-3 w-3 rounded-full"
                      style={{ backgroundColor: layer.color }}
                    />
                    <span className="font-semibold text-foreground">{layer.label}</span>
                  </div>
                  <span
                    className={`text-xs font-semibold uppercase ${isActive ? "text-primary" : "text-foreground/50"
                      }`}
                  >
                    {isActive ? "Activa" : "Oculta"}
                  </span>
                </div>
                <p className="mt-2 text-sm text-foreground/70">{layer.description}</p>
              </button>
            );
          })}
        </div>

        <div className="mt-6 rounded-xl border border-border bg-secondary/20 p-4">
          <div className="flex items-center gap-2 mb-2">
            <MapPinned className="h-4 w-4 text-primary" />
            <p className="text-sm font-semibold text-foreground">Cobertura Norte</p>
          </div>
          <p className="text-xs text-foreground/70">
            País Vasco francés, Navarra, País Vasco, Cantabria, Asturias y Galicia.
          </p>
        </div>

        <div className="mt-4 rounded-xl border border-border bg-secondary/20 p-4">
          <div className="flex items-center gap-2 mb-2">
            <RefreshCcw className="h-4 w-4 text-primary" />
            <p className="text-sm font-semibold text-foreground">Actualización en vivo</p>
          </div>
          <p className="text-xs text-foreground/70">
            Guarderías actualizan plazas desde su panel o API integrada.
          </p>
        </div>
      </aside>

      <div className="relative h-[520px] w-full overflow-hidden rounded-2xl border border-border shadow-lg">
        <div ref={mapContainerRef} className="h-full w-full" />
      </div>
    </div>
  );
}

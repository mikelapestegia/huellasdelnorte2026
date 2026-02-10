"use client";

import { useEffect, useRef, useMemo } from "react";
import maplibregl, { GeoJSONSource, MapLayerMouseEvent } from "maplibre-gl";
import type { Point } from "geojson";
import { RouteCatalogItem } from "@/data/routesCatalog";
import { DogBeach } from "@/data/dogBeaches";
import { useTranslations } from "next-intl";

interface RouteMapProps {
    routes: RouteCatalogItem[];
    beaches?: DogBeach[];
    selectedRouteId?: string;
    onRouteSelect?: (route: RouteCatalogItem) => void;
}

const difficultyColors = {
    easy: "#22c55e",
    moderate: "#f59e0b",
    hard: "#ef4444",
};

export default function RouteMap({ routes, beaches = [], selectedRouteId, onRouteSelect }: RouteMapProps) {
    const t = useTranslations("routes");
    const mapContainerRef = useRef<HTMLDivElement | null>(null);
    const mapRef = useRef<maplibregl.Map | null>(null);

    // Routes GeoJSON
    const routesGeoJson = useMemo(() => ({
        type: "FeatureCollection" as const,
        features: routes.map(route => ({
            type: "Feature" as const,
            properties: {
                id: route.id,
                name: route.name,
                region: route.region,
                difficulty: route.difficulty,
                distance: route.distanceKmMax ? `${route.distanceKmMin}-${route.distanceKmMax}` : route.distanceKmMin,
                routeType: route.routeType,
                bathing: route.bathingAllowed,
                type: 'route'
            },
            geometry: {
                type: "Point" as const,
                coordinates: route.coordinates,
            },
        })),
    }), [routes]);

    // Beaches GeoJSON
    const beachesGeoJson = useMemo(() => ({
        type: "FeatureCollection" as const,
        features: beaches.map(beach => ({
            type: "Feature" as const,
            properties: {
                id: beach.id,
                name: beach.name,
                location: beach.location,
                seasonal: beach.seasonal,
                type: 'beach'
            },
            geometry: {
                type: "Point" as const,
                coordinates: beach.coordinates,
            },
        })),
    }), [beaches]);

    useEffect(() => {
        if (!mapContainerRef.current) return;

        // Clean up previous map
        if (mapRef.current) {
            mapRef.current.remove();
            mapRef.current = null;
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
            center: [-3.5, 43.0],
            zoom: 6,
        });

        map.addControl(new maplibregl.NavigationControl({ visualizePitch: true }), "top-right");

        map.on("load", () => {
            // --- ROUTES ---
            map.addSource("routes", {
                type: "geojson",
                data: routesGeoJson,
                cluster: true,
                clusterMaxZoom: 10,
                clusterRadius: 50,
            });

            // Route Clusters
            map.addLayer({
                id: "route-clusters",
                type: "circle",
                source: "routes",
                filter: ["has", "point_count"],
                paint: {
                    "circle-color": "#2d4a3e",
                    "circle-radius": ["step", ["get", "point_count"], 20, 10, 25, 30, 30],
                    "circle-stroke-width": 2,
                    "circle-stroke-color": "#ffffff",
                },
            });

            map.addLayer({
                id: "route-cluster-count",
                type: "symbol",
                source: "routes",
                filter: ["has", "point_count"],
                layout: {
                    "text-field": "{point_count_abbreviated}",
                    "text-font": ["Open Sans Bold", "Arial Unicode MS Bold"],
                    "text-size": 14,
                },
                paint: { "text-color": "#ffffff" },
            });

            // Route Points
            map.addLayer({
                id: "unclustered-route",
                type: "circle",
                source: "routes",
                filter: ["!", ["has", "point_count"]],
                paint: {
                    "circle-color": [
                        "match",
                        ["get", "difficulty"],
                        "easy", difficultyColors.easy,
                        "moderate", difficultyColors.moderate,
                        "hard", difficultyColors.hard,
                        "#2d4a3e",
                    ],
                    "circle-radius": 10,
                    "circle-stroke-width": 2,
                    "circle-stroke-color": "#ffffff",
                },
            });

            // --- BEACHES ---
            map.addSource("beaches", {
                type: "geojson",
                data: beachesGeoJson,
            });

            map.addLayer({
                id: "beaches-point",
                type: "circle",
                source: "beaches",
                paint: {
                    "circle-color": "#0ea5e9", // Sky Blue
                    "circle-radius": 8,
                    "circle-stroke-width": 2,
                    "circle-stroke-color": "#ffffff",
                },
            });


            // --- INTERACTIONS ---

            // Route Cluster Zoom
            map.on("click", "route-clusters", async (e: MapLayerMouseEvent) => {
                const features = map.queryRenderedFeatures(e.point, { layers: ["route-clusters"] });
                const clusterId = features[0]?.properties?.cluster_id;
                if (clusterId) {
                    const source = map.getSource("routes") as GeoJSONSource;
                    try {
                        const zoom = await source.getClusterExpansionZoom(clusterId);
                        const coords = (features[0].geometry as Point).coordinates as [number, number];
                        map.easeTo({ center: coords, zoom });
                    } catch (err) {
                        console.error("Cluster zoom error:", err);
                    }
                }
            });

            // Route Click
            map.on("click", "unclustered-route", (e: MapLayerMouseEvent) => {
                const feature = e.features?.[0];
                if (feature && feature.properties) {
                    const routeId = feature.properties.id;
                    const route = routes.find(r => r.id === routeId);
                    if (route && onRouteSelect) {
                        onRouteSelect(route);
                    }

                    const coords = (feature.geometry as Point).coordinates as [number, number];
                    const props = feature.properties;
                    const diffLabel = t(`difficulty.${props.difficulty}`);
                    const bathingLabel = t('card.bathing');
                    const distanceLabel = t('card.distance');

                    new maplibregl.Popup({ closeButton: true, maxWidth: "280px" })
                        .setLngLat(coords)
                        .setHTML(`
              <div class="p-2 font-sans">
                <h3 class="font-bold text-sm mb-1 text-slate-800">${props.name}</h3>
                <p class="text-xs text-slate-600 mb-2">${props.region}</p>
                <div class="flex gap-2 text-xs flex-wrap">
                  <span class="px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">${props.distance} ${distanceLabel}</span>
                  <span class="px-1.5 py-0.5 rounded font-medium" style="background: ${difficultyColors[props.difficulty as keyof typeof difficultyColors]}20; color: ${difficultyColors[props.difficulty as keyof typeof difficultyColors]}; border: 1px solid ${difficultyColors[props.difficulty as keyof typeof difficultyColors]}40;">${diffLabel}</span>
                  ${props.bathing ? `<span class="px-1.5 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200">💧 ${bathingLabel}</span>` : ''}
                </div>
              </div>
            `)
                        .addTo(map);
                }
            });

            // Beach Click
            map.on("click", "beaches-point", (e: MapLayerMouseEvent) => {
                const feature = e.features?.[0];
                if (feature && feature.properties) {
                    const coords = (feature.geometry as Point).coordinates as [number, number];
                    const props = feature.properties;

                    new maplibregl.Popup({ closeButton: true, maxWidth: "280px" })
                        .setLngLat(coords)
                        .setHTML(`
              <div class="p-2 font-sans">
                <h3 class="font-bold text-sm mb-1 text-slate-800">${props.name}</h3>
                <p class="text-xs text-slate-600 mb-2">${props.location}</p>
                <div class="flex gap-2 text-xs flex-wrap">
                   <span class="px-1.5 py-0.5 rounded bg-sky-50 text-sky-700 border border-sky-200">🏖️ Playa Canina</span>
                   ${props.seasonal ? '<span class="px-1.5 py-0.5 rounded bg-amber-50 text-amber-700 border border-amber-200">☀️ Temporada</span>' : '<span class="px-1.5 py-0.5 rounded bg-green-50 text-green-700 border border-green-200">📅 Todo el año</span>'}
                </div>
              </div>
            `)
                        .addTo(map);
                }
            });

            // Cursor changes
            const interactiveLayers = ["route-clusters", "unclustered-route", "beaches-point"];
            interactiveLayers.forEach(layer => {
                map.on("mouseenter", layer, () => {
                    map.getCanvas().style.cursor = "pointer";
                });
                map.on("mouseleave", layer, () => {
                    map.getCanvas().style.cursor = "";
                });
            });
        });

        mapRef.current = map;

        return () => {
            map.remove();
            mapRef.current = null;
        };
    }, [routesGeoJson, beachesGeoJson, onRouteSelect, t, difficultyColors]); // removed routes dependency in favor of geojson

    // Update sources
    useEffect(() => {
        const map = mapRef.current;
        if (!map) return;

        const routesSource = map.getSource("routes") as maplibregl.GeoJSONSource;
        if (routesSource) routesSource.setData(routesGeoJson);

        const beachesSource = map.getSource("beaches") as maplibregl.GeoJSONSource;
        if (beachesSource) beachesSource.setData(beachesGeoJson);
    }, [routesGeoJson, beachesGeoJson]);

    // Fly to selected route
    useEffect(() => {
        if (!selectedRouteId || !mapRef.current) return;

        const route = routes.find(r => r.id === selectedRouteId);
        if (route) {
            mapRef.current.flyTo({
                center: route.coordinates,
                zoom: 12,
                duration: 1500,
            });
        }
    }, [selectedRouteId, routes]);

    return (
        <div className="relative h-full w-full rounded-3xl overflow-hidden border border-border shadow-md">
            <div ref={mapContainerRef} className="h-full w-full" />

            {/* Legend */}
            <div className="absolute bottom-4 left-4 bg-background/90 backdrop-blur-md rounded-xl p-3 shadow-lg border border-border/50">
                <p className="text-xs font-bold text-foreground mb-2 uppercase tracking-wider opacity-70">{t('filters.difficulty')}</p>
                <div className="space-y-1.5">
                    <div className="flex items-center gap-2 text-xs font-medium">
                        <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: difficultyColors.easy }} />
                        {t('difficulty.easy')}
                    </div>
                    <div className="flex items-center gap-2 text-xs font-medium">
                        <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: difficultyColors.moderate }} />
                        {t('difficulty.moderate')}
                    </div>
                    <div className="flex items-center gap-2 text-xs font-medium">
                        <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: difficultyColors.hard }} />
                        {t('difficulty.hard')}
                    </div>
                    <div className="flex items-center gap-2 text-xs font-medium pt-1 border-t border-border/50">
                        <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: "#0ea5e9" }} />
                        {/* We could translate 'Beach' but for now hardcode or use translation key */}
                        Playa Canina
                    </div>
                </div>
            </div>
        </div>
    );
}

"use client";

import { useEffect, useRef, useMemo } from "react";
import maplibregl, { GeoJSONSource, MapLayerMouseEvent } from "maplibre-gl";
import type { Point } from "geojson";
import { RouteCatalogItem } from "@/data/routesCatalog";


interface RouteMapProps {
    routes: RouteCatalogItem[];
    selectedRouteId?: string;
    onRouteSelect?: (route: RouteCatalogItem) => void;
}

const difficultyColors = {
    easy: "#22c55e",
    moderate: "#f59e0b",
    hard: "#ef4444",
};

export default function RouteMap({ routes, selectedRouteId, onRouteSelect }: RouteMapProps) {
    const mapContainerRef = useRef<HTMLDivElement | null>(null);
    const mapRef = useRef<maplibregl.Map | null>(null);
    const markersRef = useRef<maplibregl.Marker[]>([]);

    const geojsonData = useMemo(() => ({
        type: "FeatureCollection" as const,
        features: routes.map(route => ({
            type: "Feature" as const,
            properties: {
                id: route.id,
                name: route.name,
                region: route.region,
                difficulty: route.difficulty,
                distance: route.distanceKmMin,
                routeType: route.routeType,
                bathing: route.bathingAllowed,
            },
            geometry: {
                type: "Point" as const,
                coordinates: route.coordinates,
            },
        })),
    }), [routes]);

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
            // Add routes source
            map.addSource("routes", {
                type: "geojson",
                data: geojsonData,
                cluster: true,
                clusterMaxZoom: 10,
                clusterRadius: 50,
            });

            // Cluster circles
            map.addLayer({
                id: "clusters",
                type: "circle",
                source: "routes",
                filter: ["has", "point_count"],
                paint: {
                    "circle-color": "#2d4a3e",
                    "circle-radius": [
                        "step",
                        ["get", "point_count"],
                        20,
                        10, 25,
                        30, 30,
                    ],
                    "circle-stroke-width": 2,
                    "circle-stroke-color": "#ffffff",
                },
            });

            // Cluster count labels
            map.addLayer({
                id: "cluster-count",
                type: "symbol",
                source: "routes",
                filter: ["has", "point_count"],
                layout: {
                    "text-field": "{point_count_abbreviated}",
                    "text-font": ["Open Sans Bold", "Arial Unicode MS Bold"],
                    "text-size": 14,
                },
                paint: {
                    "text-color": "#ffffff",
                },
            });

            // Individual route points
            map.addLayer({
                id: "unclustered-point",
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

            // Click on cluster to zoom
            map.on("click", "clusters", async (e: MapLayerMouseEvent) => {
                const features = map.queryRenderedFeatures(e.point, { layers: ["clusters"] });
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

            // Click on route point
            map.on("click", "unclustered-point", (e: MapLayerMouseEvent) => {
                const feature = e.features?.[0];
                if (feature && feature.properties) {
                    const routeId = feature.properties.id;
                    const route = routes.find(r => r.id === routeId);
                    if (route && onRouteSelect) {
                        onRouteSelect(route);
                    }

                    // Show popup
                    const coords = (feature.geometry as Point).coordinates as [number, number];
                    const props = feature.properties;

                    new maplibregl.Popup({ closeButton: true, maxWidth: "280px" })
                        .setLngLat(coords)
                        .setHTML(`
              <div class="p-2">
                <h3 class="font-bold text-sm mb-1">${props.name}</h3>
                <p class="text-xs text-gray-600 mb-2">${props.region}</p>
                <div class="flex gap-2 text-xs">
                  <span class="px-1.5 py-0.5 rounded bg-gray-100">${props.distance} km</span>
                  <span class="px-1.5 py-0.5 rounded" style="background: ${difficultyColors[props.difficulty as keyof typeof difficultyColors]}20; color: ${difficultyColors[props.difficulty as keyof typeof difficultyColors]}">${props.difficulty}</span>
                  ${props.bathing ? '<span class="px-1.5 py-0.5 rounded bg-blue-100 text-blue-700">💧 Baño</span>' : ''}
                </div>
              </div>
            `)
                        .addTo(map);
                }
            });

            // Cursor changes
            map.on("mouseenter", "clusters", () => {
                map.getCanvas().style.cursor = "pointer";
            });
            map.on("mouseleave", "clusters", () => {
                map.getCanvas().style.cursor = "";
            });
            map.on("mouseenter", "unclustered-point", () => {
                map.getCanvas().style.cursor = "pointer";
            });
            map.on("mouseleave", "unclustered-point", () => {
                map.getCanvas().style.cursor = "";
            });
        });

        mapRef.current = map;

        return () => {
            map.remove();
            mapRef.current = null;
        };
    }, [geojsonData, routes, onRouteSelect]);

    // Update source data when routes change
    useEffect(() => {
        const map = mapRef.current;
        if (!map) return;

        const source = map.getSource("routes") as maplibregl.GeoJSONSource;
        if (source) {
            source.setData(geojsonData);
        }
    }, [geojsonData]);

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
        <div className="relative h-full w-full rounded-2xl overflow-hidden border border-border shadow-lg">
            <div ref={mapContainerRef} className="h-full w-full" />

            {/* Legend */}
            <div className="absolute bottom-4 left-4 bg-card/95 backdrop-blur-sm rounded-xl p-3 shadow-lg">
                <p className="text-xs font-semibold text-foreground mb-2">Dificultad</p>
                <div className="space-y-1.5">
                    <div className="flex items-center gap-2 text-xs">
                        <span className="h-3 w-3 rounded-full" style={{ backgroundColor: difficultyColors.easy }} />
                        Fácil
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                        <span className="h-3 w-3 rounded-full" style={{ backgroundColor: difficultyColors.moderate }} />
                        Moderada
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                        <span className="h-3 w-3 rounded-full" style={{ backgroundColor: difficultyColors.hard }} />
                        Difícil
                    </div>
                </div>
            </div>
        </div>
    );
}

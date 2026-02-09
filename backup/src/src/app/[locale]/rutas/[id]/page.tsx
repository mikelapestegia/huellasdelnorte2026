"use client";

import { use, useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
    ArrowLeft, MapPin, Clock, Mountain, Droplets, TreeDeciduous,
    Download, Share2, Heart, Navigation, Sun, ThermometerSun,
    Dog, AlertTriangle, CheckCircle2
} from "lucide-react";
import maplibregl from "maplibre-gl";
import { routesCatalog, RouteCatalogItem, Difficulty, Environment } from "@/data/routesCatalog";
import RouteWeather from "@/components/routes/RouteWeather";

interface RouteDetailPageProps {
    params: Promise<{ id: string }>;
}

const difficultyConfig: Record<Difficulty, { label: string; color: string; bgColor: string }> = {
    easy: { label: "Fácil", color: "text-green-700", bgColor: "bg-green-100" },
    moderate: { label: "Moderada", color: "text-amber-700", bgColor: "bg-amber-100" },
    hard: { label: "Difícil", color: "text-red-700", bgColor: "bg-red-100" },
};

const environmentIcons: Record<Environment, React.ReactNode> = {
    río: <Droplets className="h-4 w-4" />,
    sombra: <TreeDeciduous className="h-4 w-4" />,
    costa: <Sun className="h-4 w-4" />,
    montaña: <Mountain className="h-4 w-4" />,
    bosque: <TreeDeciduous className="h-4 w-4" />,
    cascada: <Droplets className="h-4 w-4" />,
    valle: <Mountain className="h-4 w-4" />,
};

// Mock GPX track data - in production this would come from the database
function generateMockTrack(center: [number, number], points: number = 50): [number, number][] {
    const track: [number, number][] = [];
    const radius = 0.02; // ~2km radius

    for (let i = 0; i < points; i++) {
        const angle = (i / points) * Math.PI * 2;
        const variance = (Math.random() - 0.5) * 0.005;
        const lng = center[0] + Math.cos(angle) * radius + variance;
        const lat = center[1] + Math.sin(angle) * radius * 0.7 + variance;
        track.push([lng, lat]);
    }
    // Close the loop
    track.push(track[0]);
    return track;
}

// Mock elevation data
function generateElevationProfile(points: number): { distance: number; elevation: number }[] {
    const profile: { distance: number; elevation: number }[] = [];
    let elevation = 200 + Math.random() * 300;

    for (let i = 0; i < points; i++) {
        const distance = (i / points) * 10; // 10km max
        elevation += (Math.random() - 0.5) * 50;
        elevation = Math.max(100, Math.min(800, elevation));
        profile.push({ distance, elevation: Math.round(elevation) });
    }
    return profile;
}

export default function RouteDetailPage({ params }: RouteDetailPageProps) {
    const { id } = use(params);
    const [route, setRoute] = useState<RouteCatalogItem | null>(null);
    const [liked, setLiked] = useState(false);
    const [activeTab, setActiveTab] = useState<"info" | "elevation" | "weather">("info");
    const mapContainerRef = useRef<HTMLDivElement>(null);
    const mapRef = useRef<maplibregl.Map | null>(null);

    useEffect(() => {
        const foundRoute = routesCatalog.find(r => r.id === id);
        setRoute(foundRoute || null);
    }, [id]);

    useEffect(() => {
        if (!route || !mapContainerRef.current) return;

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
            center: route.coordinates,
            zoom: 13,
        });

        map.addControl(new maplibregl.NavigationControl(), "top-right");
        map.addControl(new maplibregl.FullscreenControl(), "top-right");

        map.on("load", () => {
            const trackCoords = generateMockTrack(route.coordinates);

            // Add route track
            map.addSource("route-track", {
                type: "geojson",
                data: {
                    type: "Feature",
                    properties: {},
                    geometry: {
                        type: "LineString",
                        coordinates: trackCoords,
                    },
                },
            });

            // Route line - outer glow
            map.addLayer({
                id: "route-track-glow",
                type: "line",
                source: "route-track",
                layout: {
                    "line-join": "round",
                    "line-cap": "round",
                },
                paint: {
                    "line-color": "#2d4a3e",
                    "line-width": 8,
                    "line-opacity": 0.3,
                },
            });

            // Route line - main
            map.addLayer({
                id: "route-track-main",
                type: "line",
                source: "route-track",
                layout: {
                    "line-join": "round",
                    "line-cap": "round",
                },
                paint: {
                    "line-color": "#4ade80",
                    "line-width": 4,
                },
            });

            // Start marker
            new maplibregl.Marker({ color: "#22c55e" })
                .setLngLat(trackCoords[0])
                .setPopup(new maplibregl.Popup().setHTML("<strong>🚩 Inicio</strong>"))
                .addTo(map);

            // End marker (same as start for circular routes)
            if (trackCoords.length > 10) {
                const midPoint = trackCoords[Math.floor(trackCoords.length / 2)];
                new maplibregl.Marker({ color: "#f59e0b" })
                    .setLngLat(midPoint)
                    .setPopup(new maplibregl.Popup().setHTML("<strong>📍 Punto intermedio</strong>"))
                    .addTo(map);
            }

            // Fit bounds to track
            const bounds = trackCoords.reduce(
                (bounds, coord) => bounds.extend(coord as [number, number]),
                new maplibregl.LngLatBounds(trackCoords[0], trackCoords[0])
            );
            map.fitBounds(bounds, { padding: 50 });
        });

        mapRef.current = map;

        return () => {
            map.remove();
        };
    }, [route]);

    if (!route) {
        return (
            <main className="min-h-screen bg-background flex items-center justify-center">
                <div className="text-center">
                    <Dog className="h-16 w-16 text-foreground/30 mx-auto mb-4" />
                    <h1 className="text-2xl font-bold text-foreground mb-2">Ruta no encontrada</h1>
                    <Link href="/rutas" className="text-primary hover:underline">
                        Volver al buscador de rutas
                    </Link>
                </div>
            </main>
        );
    }

    const distance = route.distanceKmMax
        ? `${route.distanceKmMin}-${route.distanceKmMax} km`
        : `${route.distanceKmMin} km`;

    const estimatedTime = route.distanceKmMin
        ? `${Math.round(route.distanceKmMin / 4 * 60)} - ${Math.round((route.distanceKmMax || route.distanceKmMin) / 3 * 60)} min`
        : "Variable";

    const elevationProfile = generateElevationProfile(30);
    const maxElevation = Math.max(...elevationProfile.map(p => p.elevation));
    const minElevation = Math.min(...elevationProfile.map(p => p.elevation));

    return (
        <main className="min-h-screen bg-background">
            {/* Header */}
            <div className="sticky top-16 z-40 bg-background/95 backdrop-blur-sm border-b border-border">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center justify-between">
                        <Link
                            href="/rutas"
                            className="flex items-center gap-2 text-foreground/70 hover:text-foreground transition-colors"
                        >
                            <ArrowLeft className="h-5 w-5" />
                            <span className="font-medium">Volver a rutas</span>
                        </Link>
                        <div className="flex items-center gap-2">
                            <button
                                type="button"
                                onClick={() => setLiked(!liked)}
                                className={`p-2 rounded-full transition-colors ${liked ? "bg-red-100 text-red-600" : "bg-secondary/50 text-foreground/60 hover:bg-secondary"
                                    }`}
                            >
                                <Heart className={`h-5 w-5 ${liked ? "fill-current" : ""}`} />
                            </button>
                            <button
                                type="button"
                                className="p-2 rounded-full bg-secondary/50 text-foreground/60 hover:bg-secondary transition-colors"
                            >
                                <Share2 className="h-5 w-5" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main content */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Title section */}
                        <div>
                            <div className="flex items-center gap-2 text-sm text-foreground/60 mb-2">
                                <MapPin className="h-4 w-4" />
                                <span>{route.region}</span>
                                <span>·</span>
                                <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${difficultyConfig[route.difficulty].bgColor} ${difficultyConfig[route.difficulty].color}`}>
                                    {difficultyConfig[route.difficulty].label}
                                </span>
                            </div>
                            <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-3">
                                {route.name}
                            </h1>
                            <p className="text-lg text-foreground/70">{route.highlight}</p>
                        </div>

                        {/* Stats row */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                            <div className="rounded-xl bg-secondary/30 p-4 text-center">
                                <MapPin className="h-5 w-5 mx-auto mb-1 text-primary" />
                                <p className="text-sm text-foreground/60">Distancia</p>
                                <p className="font-bold text-foreground">{distance}</p>
                            </div>
                            <div className="rounded-xl bg-secondary/30 p-4 text-center">
                                <Clock className="h-5 w-5 mx-auto mb-1 text-primary" />
                                <p className="text-sm text-foreground/60">Duración</p>
                                <p className="font-bold text-foreground">{estimatedTime}</p>
                            </div>
                            <div className="rounded-xl bg-secondary/30 p-4 text-center">
                                <Mountain className="h-5 w-5 mx-auto mb-1 text-primary" />
                                <p className="text-sm text-foreground/60">Desnivel</p>
                                <p className="font-bold text-foreground">{maxElevation - minElevation}m</p>
                            </div>
                            <div className="rounded-xl bg-secondary/30 p-4 text-center">
                                <Navigation className="h-5 w-5 mx-auto mb-1 text-primary" />
                                <p className="text-sm text-foreground/60">Tipo</p>
                                <p className="font-bold text-foreground">{route.routeType}</p>
                            </div>
                        </div>

                        {/* Map */}
                        <div className="rounded-2xl overflow-hidden border border-border shadow-lg">
                            <div ref={mapContainerRef} className="h-[400px] w-full" />
                        </div>

                        {/* Tabs */}
                        <div className="rounded-2xl border border-border bg-white overflow-hidden">
                            <div className="flex border-b border-border">
                                {[
                                    { id: "info", label: "Información" },
                                    { id: "elevation", label: "Perfil de elevación" },
                                    { id: "weather", label: "Clima" },
                                ].map((tab) => (
                                    <button
                                        key={tab.id}
                                        type="button"
                                        onClick={() => setActiveTab(tab.id as typeof activeTab)}
                                        className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${activeTab === tab.id
                                            ? "bg-primary/10 text-primary border-b-2 border-primary"
                                            : "text-foreground/60 hover:text-foreground hover:bg-secondary/30"
                                            }`}
                                    >
                                        {tab.label}
                                    </button>
                                ))}
                            </div>

                            <div className="p-6">
                                {activeTab === "info" && (
                                    <div className="space-y-6">
                                        {/* Environment tags */}
                                        <div>
                                            <h3 className="font-semibold text-foreground mb-3">Entorno</h3>
                                            <div className="flex flex-wrap gap-2">
                                                {route.environment.map((env) => (
                                                    <span
                                                        key={env}
                                                        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary/50 text-foreground/80"
                                                    >
                                                        {environmentIcons[env]}
                                                        <span className="capitalize">{env}</span>
                                                    </span>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Bathing info */}
                                        <div className={`rounded-xl p-4 ${route.bathingAllowed ? "bg-blue-50" : "bg-amber-50"}`}>
                                            <div className="flex items-start gap-3">
                                                {route.bathingAllowed ? (
                                                    <>
                                                        <CheckCircle2 className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                                                        <div>
                                                            <p className="font-semibold text-blue-800">Baño permitido 💧</p>
                                                            <p className="text-sm text-blue-700">Esta ruta tiene zonas donde tu perro puede bañarse.</p>
                                                        </div>
                                                    </>
                                                ) : (
                                                    <>
                                                        <AlertTriangle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                                                        <div>
                                                            <p className="font-semibold text-amber-800">Sin zonas de baño</p>
                                                            <p className="text-sm text-amber-700">Lleva agua suficiente para tu perro.</p>
                                                        </div>
                                                    </>
                                                )}
                                            </div>
                                        </div>

                                        {/* Dog-friendly tips */}
                                        <div>
                                            <h3 className="font-semibold text-foreground mb-3">Consejos para ir con tu perro</h3>
                                            <ul className="space-y-2 text-foreground/70">
                                                <li className="flex items-start gap-2">
                                                    <Dog className="h-4 w-4 mt-1 text-primary" />
                                                    <span>Lleva bolsas para recoger los excrementos</span>
                                                </li>
                                                <li className="flex items-start gap-2">
                                                    <Droplets className="h-4 w-4 mt-1 text-primary" />
                                                    <span>Agua fresca y cuenco portátil son esenciales</span>
                                                </li>
                                                <li className="flex items-start gap-2">
                                                    <Sun className="h-4 w-4 mt-1 text-primary" />
                                                    <span>Evita las horas de más calor en verano</span>
                                                </li>
                                                <li className="flex items-start gap-2">
                                                    <Navigation className="h-4 w-4 mt-1 text-primary" />
                                                    <span>Mantén a tu perro con correa en zonas señalizadas</span>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                )}

                                {activeTab === "elevation" && (
                                    <div>
                                        <div className="flex justify-between text-sm text-foreground/60 mb-2">
                                            <span>Altitud máx: {maxElevation}m</span>
                                            <span>Altitud mín: {minElevation}m</span>
                                        </div>
                                        <div className="h-40 flex items-end gap-0.5">
                                            {elevationProfile.map((point, i) => {
                                                const height = ((point.elevation - minElevation) / (maxElevation - minElevation)) * 100;
                                                return (
                                                    <div
                                                        key={i}
                                                        className="flex-1 bg-gradient-to-t from-primary/80 to-primary/40 rounded-t"
                                                        style={{ height: `${Math.max(5, height)}%` }}
                                                        title={`${point.distance.toFixed(1)} km: ${point.elevation}m`}
                                                    />
                                                );
                                            })}
                                        </div>
                                        <div className="flex justify-between text-xs text-foreground/50 mt-1">
                                            <span>0 km</span>
                                            <span>{route.distanceKmMin} km</span>
                                        </div>
                                    </div>
                                )}

                                {activeTab === "weather" && (
                                    <RouteWeather
                                        coordinates={route.coordinates}
                                        routeName={route.name}
                                    />
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Download GPX */}
                        <div className="rounded-2xl border border-border bg-white p-6 shadow-sm">
                            <h3 className="font-serif text-lg font-bold text-foreground mb-4">Descargar ruta</h3>
                            <button
                                type="button"
                                className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-primary text-white font-medium hover:bg-primary/90 transition-colors"
                            >
                                <Download className="h-5 w-5" />
                                Descargar GPX
                            </button>
                            <p className="text-xs text-foreground/50 text-center mt-3">
                                Compatible con Garmin, Suunto, Komoot y otras apps
                            </p>
                        </div>

                        {/* Navigate */}
                        <div className="rounded-2xl border border-border bg-white p-6 shadow-sm">
                            <h3 className="font-serif text-lg font-bold text-foreground mb-4">Cómo llegar</h3>
                            <a
                                href={`https://www.google.com/maps/dir/?api=1&destination=${route.coordinates[1]},${route.coordinates[0]}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-border text-foreground font-medium hover:bg-secondary/30 transition-colors"
                            >
                                <Navigation className="h-5 w-5" />
                                Abrir en Google Maps
                            </a>
                        </div>

                        {/* Related routes */}
                        <div className="rounded-2xl border border-border bg-white p-6 shadow-sm">
                            <h3 className="font-serif text-lg font-bold text-foreground mb-4">Rutas cercanas</h3>
                            <div className="space-y-3">
                                {routesCatalog
                                    .filter(r => r.region === route.region && r.id !== route.id)
                                    .slice(0, 3)
                                    .map((relatedRoute) => (
                                        <Link
                                            key={relatedRoute.id}
                                            href={`/rutas/${relatedRoute.id}`}
                                            className="block p-3 rounded-xl hover:bg-secondary/30 transition-colors"
                                        >
                                            <p className="font-medium text-foreground line-clamp-1">{relatedRoute.name}</p>
                                            <p className="text-sm text-foreground/60">
                                                {relatedRoute.distanceKmMin} km · {difficultyConfig[relatedRoute.difficulty].label}
                                            </p>
                                        </Link>
                                    ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

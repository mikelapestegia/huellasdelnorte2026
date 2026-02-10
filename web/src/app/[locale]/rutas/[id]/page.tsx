"use client";

import { use, useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
    ArrowLeft, MapPin, Clock, Mountain, Droplets, TreeDeciduous,
    Download, Share2, Heart, Navigation, Sun, ThermometerSun,
    Dog, AlertTriangle, CheckCircle2, Zap, Waves, Leaf
} from "lucide-react";
import maplibregl from "maplibre-gl";
import { routesCatalog, RouteCatalogItem, Difficulty, Environment } from "@/data/routesCatalog";
import RouteWeather from "@/components/routes/RouteWeather";
import { useTranslations } from "next-intl";

interface RouteDetailPageProps {
    params: Promise<{ id: string }>;
}

const difficultyConfig: Record<Difficulty, { color: string; bgColor: string; borderColor: string }> = {
    easy: { color: "text-green-700", bgColor: "bg-green-50", borderColor: "border-green-200" },
    moderate: { color: "text-amber-700", bgColor: "bg-amber-50", borderColor: "border-amber-200" },
    hard: { color: "text-red-700", bgColor: "bg-red-50", borderColor: "border-red-200" },
};

const environmentIcons: Record<Environment, React.ReactNode> = {
    río: <Droplets className="h-4 w-4" />,
    sombra: <TreeDeciduous className="h-4 w-4" />,
    costa: <Waves className="h-4 w-4" />,
    montaña: <Mountain className="h-4 w-4" />,
    bosque: <Leaf className="h-4 w-4" />,
    cascada: <Zap className="h-4 w-4" />,
    valle: <Mountain className="h-4 w-4" />,
};

// Mock GPX track data
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
    track.push(track[0]);
    return track;
}

// Mock elevation data
function generateElevationProfile(points: number): { distance: number; elevation: number }[] {
    const profile: { distance: number; elevation: number }[] = [];
    let elevation = 200 + Math.random() * 300;

    for (let i = 0; i < points; i++) {
        const distance = (i / points) * 10;
        elevation += (Math.random() - 0.5) * 50;
        elevation = Math.max(100, Math.min(800, elevation));
        profile.push({ distance, elevation: Math.round(elevation) });
    }
    return profile;
}

export default function RouteDetailPage({ params }: RouteDetailPageProps) {
    const t = useTranslations("route_detail");
    const tRoutes = useTranslations("routes"); // For enums
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

        map.on("load", () => {
            const trackCoords = generateMockTrack(route.coordinates);

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

            map.addLayer({
                id: "route-track-glow",
                type: "line",
                source: "route-track",
                layout: { "line-join": "round", "line-cap": "round" },
                paint: { "line-color": "#2d4a3e", "line-width": 8, "line-opacity": 0.3 },
            });

            map.addLayer({
                id: "route-track-main",
                type: "line",
                source: "route-track",
                layout: { "line-join": "round", "line-cap": "round" },
                paint: { "line-color": "#4ade80", "line-width": 4 },
            });

            new maplibregl.Marker({ color: "#22c55e" })
                .setLngLat(trackCoords[0])
                .addTo(map);

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
                <div className="text-center p-8 bg-card rounded-3xl border border-border">
                    <Dog className="h-16 w-16 text-foreground/30 mx-auto mb-4" />
                    <h1 className="text-2xl font-bold text-foreground mb-4">{t("not_found.title")}</h1>
                    <Link href="/rutas" className="px-6 py-3 rounded-full bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors">
                        {t("not_found.button")}
                    </Link>
                </div>
            </main>
        );
    }

    const distance = route.distanceKmMax
        ? `${route.distanceKmMin}-${route.distanceKmMax} ${tRoutes("card.distance")}`
        : `${route.distanceKmMin} ${tRoutes("card.distance")}`;

    const estimatedTime = route.distanceKmMin
        ? `${Math.round(route.distanceKmMin / 4 * 60)} - ${Math.round((route.distanceKmMax || route.distanceKmMin) / 3 * 60)} min`
        : "Variable";

    const elevationProfile = generateElevationProfile(30);
    const maxElevation = Math.max(...elevationProfile.map(p => p.elevation));
    const minElevation = Math.min(...elevationProfile.map(p => p.elevation));

    return (
        <main className="min-h-screen bg-background pb-20">
            {/* Header / Nav */}
            <div className="sticky top-16 z-40 bg-background/80 backdrop-blur-md border-b border-border/50 supports-[backdrop-filter]:bg-background/60">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center justify-between">
                        <Link
                            href="/rutas"
                            className="flex items-center gap-2 text-foreground/70 hover:text-foreground transition-colors group"
                        >
                            <div className="p-1 rounded-full bg-secondary/50 group-hover:bg-secondary transition-colors">
                                <ArrowLeft className="h-5 w-5" />
                            </div>
                            <span className="font-medium text-sm hidden sm:inline-block">{t("back_to_routes")}</span>
                        </Link>
                        <div className="flex items-center gap-3">
                            <button
                                type="button"
                                onClick={() => setLiked(!liked)}
                                className={`p-2.5 rounded-full transition-all duration-300 ${liked
                                    ? "bg-red-50 text-red-500 scale-110 shadow-sm"
                                    : "bg-secondary/50 text-foreground/60 hover:bg-secondary"
                                    }`}
                            >
                                <Heart className={`h-5 w-5 ${liked ? "fill-current" : ""}`} />
                            </button>
                            <button
                                type="button"
                                className="p-2.5 rounded-full bg-secondary/50 text-foreground/60 hover:bg-secondary transition-colors"
                            >
                                <Share2 className="h-5 w-5" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main content */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Title section */}
                        <div>
                            <div className="flex flex-wrap items-center gap-3 text-sm text-foreground/60 mb-3">
                                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary/50 border border-border/50">
                                    <MapPin className="h-3.5 w-3.5" />
                                    <span>{route.region}</span>
                                </div>
                                <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full border ${difficultyConfig[route.difficulty].bgColor} ${difficultyConfig[route.difficulty].color} ${difficultyConfig[route.difficulty].borderColor}`}>
                                    <span className="h-2 w-2 rounded-full bg-current" />
                                    {tRoutes(`difficulty.${route.difficulty}`)}
                                </div>
                            </div>
                            <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4 leading-tight">
                                {route.name}
                            </h1>
                            <p className="text-xl text-foreground/80 leading-relaxed max-w-2xl">{route.highlight}</p>
                        </div>

                        {/* Stats row */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                            <div className="rounded-2xl bg-card border border-border p-5 text-center shadow-sm hover:shadow-md transition-shadow">
                                <MapPin className="h-6 w-6 mx-auto mb-2 text-primary" />
                                <p className="text-xs font-semibold text-foreground/50 uppercase tracking-wider mb-1">{t("distance")}</p>
                                <p className="text-lg font-bold text-foreground">{distance}</p>
                            </div>
                            <div className="rounded-2xl bg-card border border-border p-5 text-center shadow-sm hover:shadow-md transition-shadow">
                                <Clock className="h-6 w-6 mx-auto mb-2 text-primary" />
                                <p className="text-xs font-semibold text-foreground/50 uppercase tracking-wider mb-1">{t("duration")}</p>
                                <p className="text-lg font-bold text-foreground">{estimatedTime}</p>
                            </div>
                            <div className="rounded-2xl bg-card border border-border p-5 text-center shadow-sm hover:shadow-md transition-shadow">
                                <Mountain className="h-6 w-6 mx-auto mb-2 text-primary" />
                                <p className="text-xs font-semibold text-foreground/50 uppercase tracking-wider mb-1">{t("elevation")}</p>
                                <p className="text-lg font-bold text-foreground">{maxElevation - minElevation}m</p>
                            </div>
                            <div className="rounded-2xl bg-card border border-border p-5 text-center shadow-sm hover:shadow-md transition-shadow">
                                <Navigation className="h-6 w-6 mx-auto mb-2 text-primary" />
                                <p className="text-xs font-semibold text-foreground/50 uppercase tracking-wider mb-1">{t("type")}</p>
                                <p className="text-lg font-bold text-foreground">{tRoutes(`route_type.${route.routeType}`)}</p>
                            </div>
                        </div>

                        {/* Map */}
                        <div className="rounded-3xl overflow-hidden border border-border shadow-lg relative group">
                            <div ref={mapContainerRef} className="h-[450px] w-full" />
                            <div className="absolute top-4 right-4 px-3 py-1.5 bg-background/90 backdrop-blur rounded-lg text-xs font-medium shadow-sm border border-border/50">
                                Mock Track Data
                            </div>
                        </div>

                        {/* Tabs */}
                        <div className="rounded-3xl border border-border bg-card overflow-hidden shadow-sm">
                            <div className="flex border-b border-border p-2 gap-2 overflow-x-auto">
                                {[
                                    { id: "info", label: t("tabs.info") },
                                    { id: "elevation", label: t("tabs.elevation") },
                                    { id: "weather", label: t("tabs.weather") },
                                ].map((tab) => (
                                    <button
                                        key={tab.id}
                                        type="button"
                                        onClick={() => setActiveTab(tab.id as typeof activeTab)}
                                        className={`flex-1 px-4 py-2.5 text-sm font-semibold rounded-xl transition-all ${activeTab === tab.id
                                            ? "bg-primary text-primary-foreground shadow-sm"
                                            : "text-foreground/60 hover:text-foreground hover:bg-secondary"
                                            }`}
                                    >
                                        {tab.label}
                                    </button>
                                ))}
                            </div>

                            <div className="p-8">
                                {activeTab === "info" && (
                                    <div className="space-y-8">
                                        {/* Environment tags */}
                                        <div>
                                            <h3 className="font-bold text-foreground mb-4 flex items-center gap-2">
                                                <Leaf className="h-5 w-5 text-primary" />
                                                {t("environment_title")}
                                            </h3>
                                            <div className="flex flex-wrap gap-2.5">
                                                {route.environment.map((env) => (
                                                    <span
                                                        key={env}
                                                        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-secondary/50 text-foreground/80 border border-transparent hover:border-border transition-colors cursor-default"
                                                    >
                                                        {environmentIcons[env]}
                                                        <span className="capitalize text-sm font-medium">{tRoutes(`environment.${env}`)}</span>
                                                    </span>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Bathing info */}
                                        <div className={`rounded-2xl p-5 border ${route.bathingAllowed ? "bg-blue-50/50 border-blue-100" : "bg-amber-50/50 border-amber-100"}`}>
                                            <div className="flex items-start gap-4">
                                                {route.bathingAllowed ? (
                                                    <>
                                                        <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 text-blue-600">
                                                            <Waves className="h-5 w-5" />
                                                        </div>
                                                        <div>
                                                            <p className="font-bold text-blue-900 text-lg">{t("bathing.allowed_title")}</p>
                                                            <p className="text-blue-800/80 mt-1">{t("bathing.allowed_desc")}</p>
                                                        </div>
                                                    </>
                                                ) : (
                                                    <>
                                                        <div className="h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0 text-amber-600">
                                                            <AlertTriangle className="h-5 w-5" />
                                                        </div>
                                                        <div>
                                                            <p className="font-bold text-amber-900 text-lg">{t("bathing.forbidden_title")}</p>
                                                            <p className="text-amber-800/80 mt-1">{t("bathing.forbidden_desc")}</p>
                                                        </div>
                                                    </>
                                                )}
                                            </div>
                                        </div>

                                        {/* Dog-friendly tips */}
                                        <div>
                                            <h3 className="font-bold text-foreground mb-4 flex items-center gap-2">
                                                <Dog className="h-5 w-5 text-primary" />
                                                {t("tips_title")}
                                            </h3>
                                            <ul className="grid sm:grid-cols-2 gap-4">
                                                <li className="flex items-start gap-3 p-4 rounded-xl bg-secondary/20">
                                                    <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 text-primary mt-0.5">
                                                        <CheckCircle2 className="h-3.5 w-3.5" />
                                                    </div>
                                                    <span className="text-foreground/80 text-sm font-medium">{t("tips.bags")}</span>
                                                </li>
                                                <li className="flex items-start gap-3 p-4 rounded-xl bg-secondary/20">
                                                    <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 text-primary mt-0.5">
                                                        <Droplets className="h-3.5 w-3.5" />
                                                    </div>
                                                    <span className="text-foreground/80 text-sm font-medium">{t("tips.water")}</span>
                                                </li>
                                                <li className="flex items-start gap-3 p-4 rounded-xl bg-secondary/20">
                                                    <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 text-primary mt-0.5">
                                                        <Sun className="h-3.5 w-3.5" />
                                                    </div>
                                                    <span className="text-foreground/80 text-sm font-medium">{t("tips.heat")}</span>
                                                </li>
                                                <li className="flex items-start gap-3 p-4 rounded-xl bg-secondary/20">
                                                    <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 text-primary mt-0.5">
                                                        <Navigation className="h-3.5 w-3.5" />
                                                    </div>
                                                    <span className="text-foreground/80 text-sm font-medium">{t("tips.leash")}</span>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                )}

                                {activeTab === "elevation" && (
                                    <div className="animate-in fade-in duration-300">
                                        <div className="flex justify-between text-sm font-medium text-foreground/60 mb-4 bg-secondary/30 p-3 rounded-lg">
                                            <span>Max: {maxElevation}m</span>
                                            <span>Min: {minElevation}m</span>
                                        </div>
                                        <div className="h-64 flex items-end gap-1 px-4 relative">
                                            {/* Grid lines mockup */}
                                            <div className="absolute inset-x-0 top-0 h-px bg-border/30 border-dashed" />
                                            <div className="absolute inset-x-0 bottom-0 h-px bg-border/30" />

                                            {elevationProfile.map((point, i) => {
                                                const height = ((point.elevation - minElevation) / (maxElevation - minElevation)) * 100;
                                                return (
                                                    <div
                                                        key={i}
                                                        className="flex-1 bg-primary/80 hover:bg-primary transition-colors rounded-t-sm group relative"
                                                        style={{ height: `${Math.max(5, height)}%` }}
                                                    >
                                                        <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-popover text-popover-foreground text-xs px-2 py-1 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10 pointer-events-none">
                                                            {point.distance.toFixed(1)} km: {point.elevation}m
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                        <div className="flex justify-between text-xs font-semibold text-foreground/40 mt-2 px-2">
                                            <span>0 km</span>
                                            <span>{route.distanceKmMin} km</span>
                                        </div>
                                    </div>
                                )}

                                {activeTab === "weather" && (
                                    <div className="animate-in fade-in duration-300">
                                        <div className="bg-blue-50/50 p-6 rounded-2xl border border-blue-100">
                                            {/* Nota: RouteWeather podría necesitar i18n también si tiene textos dentro */}
                                            <RouteWeather
                                                coordinates={route.coordinates}
                                                routeName={route.name}
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Download GPX */}
                        <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
                            <h3 className="font-serif text-lg font-bold text-foreground mb-4">{t("download.title")}</h3>
                            <button
                                type="button"
                                className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-primary text-white font-bold hover:bg-primary/90 transition-all hover:scale-[1.02] shadow-sm"
                            >
                                <Download className="h-5 w-5" />
                                {t("download.button")}
                            </button>
                            <p className="text-xs text-foreground/50 text-center mt-4 leading-relaxed px-4">
                                {t("download.desc")}
                            </p>
                        </div>

                        {/* Navigate */}
                        <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
                            <h3 className="font-serif text-lg font-bold text-foreground mb-4">{t("navigate.title")}</h3>
                            <a
                                href={`https://www.google.com/maps/dir/?api=1&destination=${route.coordinates[1]},${route.coordinates[0]}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl border-2 border-border text-foreground font-bold hover:bg-secondary/50 transition-colors"
                            >
                                <Navigation className="h-5 w-5" />
                                {t("navigate.button")}
                            </a>
                        </div>

                        {/* Related routes */}
                        <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
                            <h3 className="font-serif text-lg font-bold text-foreground mb-4">{t("related_routes")}</h3>
                            <div className="space-y-3">
                                {routesCatalog
                                    .filter(r => r.region === route.region && r.id !== route.id)
                                    .slice(0, 3)
                                    .map((relatedRoute) => (
                                        <Link
                                            key={relatedRoute.id}
                                            href={`/rutas/${relatedRoute.id}`}
                                            className="block p-4 rounded-xl hover:bg-secondary/40 transition-colors group border border-transparent hover:border-border/50"
                                        >
                                            <div className="flex justify-between items-start mb-1">
                                                <p className="font-bold text-foreground group-hover:text-primary transition-colors line-clamp-1">{relatedRoute.name}</p>
                                            </div>
                                            <div className="flex items-center gap-2 text-xs text-foreground/60">
                                                <span>{relatedRoute.distanceKmMin} {tRoutes('card.distance')}</span>
                                                <span>·</span>
                                                <span className={`${difficultyConfig[relatedRoute.difficulty].color}`}>
                                                    {tRoutes(`difficulty.${relatedRoute.difficulty}`)}
                                                </span>
                                            </div>
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

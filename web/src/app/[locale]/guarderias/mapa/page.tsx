"use client";

import { useEffect, useRef, useState } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import Link from "next/link";
import { ArrowLeft, MapPin, X, Hotel, Users, Building2, Heart, CheckCircle2 } from "lucide-react";
import { allKennels, type Kennel, type KennelType } from "@/data/kennels";

const typeConfig: Record<KennelType, { label: string; color: string; iconComponent: any }> = {
    hotel: { label: "Hotel", color: "#f59e0b", iconComponent: Hotel },
    guarderia: { label: "Guardería", color: "#3b82f6", iconComponent: Users },
    residencia: { label: "Residencia", color: "#10b981", iconComponent: Building2 },
    cuidador_particular: { label: "Cuidador", color: "#ec4899", iconComponent: Heart },
};

export default function GuarderiasMapPage() {
    const mapContainer = useRef<HTMLDivElement>(null);
    const map = useRef<maplibregl.Map | null>(null);
    const boundsRef = useRef<maplibregl.LngLatBounds | null>(null);
    const initialViewRef = useRef<{ center: [number, number]; zoom: number } | null>(null);
    const [selectedKennel, setSelectedKennel] = useState<Kennel | null>(null);
    const [mapReady, setMapReady] = useState(false);

    useEffect(() => {
        if (map.current || !mapContainer.current) return;

        map.current = new maplibregl.Map({
            container: mapContainer.current,
            style: 'https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json',
            center: [-4.0, 43.0],
            zoom: 7,
            attributionControl: false,
        });

        initialViewRef.current = { center: [-4.0, 43.0], zoom: 7 };

        map.current.addControl(new maplibregl.NavigationControl({ showCompass: false }), 'bottom-right');

        map.current.on('load', () => {
            const bounds = new maplibregl.LngLatBounds();
            let hasMarkers = false;

            // Add markers
            allKennels.forEach((kennel) => {
                if (!kennel.coordinates) return;
                hasMarkers = true;

                const config = typeConfig[kennel.type];
                const color = config.color;

                // Create marker element
                const el = document.createElement('div');
                el.className = 'marker';
                el.style.width = '32px';
                el.style.height = '32px';
                el.style.cursor = 'pointer';

                // SVG Marker
                el.innerHTML = `
                    <div style="
                        width: 100%;
                        height: 100%;
                        background-color: ${color}20; 
                        border: 2px solid ${color};
                        border-radius: 50%;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        box-shadow: 0 0 10px ${color}40;
                        transition: transform 0.2s;
                    ">
                       <div style="width: 8px; height: 8px; background-color: ${color}; border-radius: 50%;"></div>
                    </div>
                `;

                // Hover effect
                el.addEventListener('mouseenter', () => {
                    el.style.transform = 'scale(1.2)';
                });
                el.addEventListener('mouseleave', () => {
                    el.style.transform = 'scale(1)';
                });

                el.addEventListener('click', (event) => {
                    event.stopPropagation();
                    setSelectedKennel(kennel);
                    map.current?.flyTo({
                        center: kennel.coordinates!,
                        zoom: 12,
                        essential: true
                    });
                });

                new maplibregl.Marker({ element: el })
                    .setLngLat(kennel.coordinates!)
                    .addTo(map.current!);

                bounds.extend(kennel.coordinates!);
            });

            if (hasMarkers) {
                boundsRef.current = bounds;
                map.current?.fitBounds(bounds, { padding: 80, maxZoom: 12 });
            }

            map.current?.on('click', () => setSelectedKennel(null));
            setMapReady(true);
        });

    }, []);

    useEffect(() => {
        const handleKey = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                setSelectedKennel(null);
            }
        };

        window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
    }, []);

    const SelectedIcon = selectedKennel ? typeConfig[selectedKennel.type].iconComponent : null;
    const handleResetView = () => {
        if (!map.current) return;
        if (boundsRef.current) {
            map.current.fitBounds(boundsRef.current, { padding: 80, maxZoom: 12 });
            return;
        }
        if (initialViewRef.current) {
            map.current.flyTo({
                center: initialViewRef.current.center,
                zoom: initialViewRef.current.zoom,
                essential: true,
            });
        }
    };

    return (
        <div className="relative w-full h-screen bg-card">
            <h1 className="sr-only">Mapa de alojamientos caninos</h1>
            {/* Nav Overlay */}
            <div className="absolute top-0 left-0 right-0 z-10 p-4 bg-gradient-to-b from-card/80 to-transparent pointer-events-none">
                <div className="max-w-7xl mx-auto flex items-center justify-between pointer-events-auto">
                    <Link
                        href="/guarderias"
                        className="flex items-center gap-2 px-4 py-2 bg-card/50 hover:bg-card/80 text-white rounded-xl backdrop-blur-md border border-white/10 transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        <span className="hidden sm:inline">Volver al listado</span>
                    </Link>

                    <div className="flex items-center gap-3">
                        <button
                            type="button"
                            onClick={handleResetView}
                            className="flex items-center gap-2 px-4 py-2 bg-card/50 hover:bg-card/80 text-white rounded-xl backdrop-blur-md border border-white/10 transition-colors"
                            aria-label="Centrar el mapa en todos los alojamientos"
                        >
                            <MapPin className="w-5 h-5 text-emerald-400" />
                            <span className="hidden sm:inline">Centrar mapa</span>
                        </button>

                        <div className="bg-card/50 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10 text-white font-medium flex items-center gap-2">
                            <MapPin className="w-5 h-5 text-emerald-400" />
                            Mapa de Alojamientos
                        </div>
                    </div>
                </div>
            </div>

            {/* Map Container */}
            <div
                ref={mapContainer}
                className="w-full h-full"
                role="application"
                aria-label="Mapa interactivo de guarderías y hoteles caninos"
            />

            {!mapReady && (
                <div className="absolute inset-0 flex items-center justify-center bg-card/60 z-10">
                    <div className="bg-card/80 border border-white/10 rounded-xl px-4 py-2 text-sm text-muted-foreground">
                        Cargando mapa...
                    </div>
                </div>
            )}

            {/* Legend */}
            <div className="absolute bottom-8 right-4 z-10 hidden md:block">
                <div className="bg-card/90 backdrop-blur-md border border-white/10 rounded-xl p-4 shadow-xl">
                    <h4 className="text-xs font-bold text-muted-foreground uppercase mb-3">Leyenda</h4>
                    <div className="space-y-2">
                        {Object.entries(typeConfig).map(([type, config]) => (
                            <div key={type} className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: config.color }} />
                                <span className="text-sm text-muted-foreground">{config.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Selected Card Overlay */}
            {selectedKennel && (
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-full max-w-sm px-4 z-20 animate-in slide-in-from-bottom-5 fade-in duration-300">
                    <div className="bg-card/90 backdrop-blur-xl border border-white/20 rounded-2xl p-5 shadow-2xl relative">
                        <button
                            onClick={() => setSelectedKennel(null)}
                            aria-label="Cerrar ficha"
                            className="absolute top-2 right-2 p-1.5 hover:bg-white/10 rounded-full text-muted-foreground hover:text-white transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        <div className="flex gap-4">
                            <div className={`w-14 h-14 rounded-xl flex-shrink-0 flex items-center justify-center border border-white/10`}
                                style={{ backgroundColor: `${typeConfig[selectedKennel.type].color}20` }}>
                                <SelectedIcon className="w-7 h-7" style={{ color: typeConfig[selectedKennel.type].color }} />
                            </div>

                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1">
                                    <h3 className="text-lg font-bold text-white truncate">{selectedKennel.name}</h3>
                                    {selectedKennel.isVerified && (
                                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                                    )}
                                </div>
                                <p className="text-muted-foreground text-xs mb-2 line-clamp-2">
                                    {selectedKennel.description}
                                </p>
                                <p className="text-muted-foreground text-xs mb-3 flex items-center gap-1">
                                    <MapPin className="w-3 h-3" />
                                    {selectedKennel.city && `${selectedKennel.city}, `}{selectedKennel.region}
                                </p>

                                {selectedKennel.website && (
                                    <a
                                        href={selectedKennel.website}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={`Visitar web de ${selectedKennel.name}`}
                                        className="block w-full text-center py-2 bg-white/10 hover:bg-white/20 text-white font-medium rounded-lg transition-colors text-sm"
                                    >
                                        Visitar web
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import Link from "next/link";
import { ArrowLeft, Dog, MapPin, X } from "lucide-react";
import { adoptionDogs, type AdoptionDog } from "@/data/adoptionDogs";

export default function AdopcionMapPage() {
    const mapContainer = useRef<HTMLDivElement>(null);
    const map = useRef<maplibregl.Map | null>(null);
    const [selectedDog, setSelectedDog] = useState<AdoptionDog | null>(null);
    const [mapLoaded, setMapLoaded] = useState(false);

    const dogsWithCoords = useMemo(
        () => adoptionDogs.filter((dog) => Boolean(dog.coordinates)),
        [],
    );
    const urgentCount = useMemo(
        () => dogsWithCoords.filter((dog) => dog.isUrgent).length,
        [dogsWithCoords],
    );

    useEffect(() => {
        if (map.current || !mapContainer.current) return;

        map.current = new maplibregl.Map({
            container: mapContainer.current,
            style: 'https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json',
            center: [-4.0, 43.0], // Center of Northern Spain
            zoom: 7,
            attributionControl: false,
        });

        map.current.addControl(new maplibregl.NavigationControl({ showCompass: false }), 'bottom-right');

        map.current.on('load', () => {
            setMapLoaded(true);

            // Add markers
            dogsWithCoords.forEach((dog) => {
                if (!dog.coordinates) return;

                // Create marker element
                const el = document.createElement('div');
                el.className = 'marker';
                el.style.width = '40px';
                el.style.height = '40px';
                el.style.cursor = 'pointer';
                el.style.filter = dog.isUrgent ? 'drop-shadow(0 0 5px #ef4444)' : 'drop-shadow(0 0 5px #10b981)';

                // Custom marker content based on dog
                el.innerHTML = `
                    <div style="
                        width: 100%;
                        height: 100%;
                        background-color: ${dog.isUrgent ? '#ef4444' : '#10b981'};
                        border-radius: 50%;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        border: 2px solid white;
                        overflow: hidden;
                    ">
                       <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-white"><path d="M10 5.172C10 3.782 8.423 2.679 6.5 3c-2.823.47-4.113 6.006-4 7 .08.703 1.725 1.722 3.656 1 1.261-.472 1.96-1.45 2.344-2.5"/><path d="M14.267 5.172c0-1.39 1.577-2.493 3.5-2.172 2.823.47 4.113 6.006 4 7-.08.703-1.725 1.722-3.656 1-1.261-.472-1.96-1.45-2.344-2.5"/><path d="M8 14v.5"/><path d="M16 14v.5"/><path d="M11.25 16.25h1.5L12 17l-.75-.75Z"/><path d="M4.42 11.247A13.152 13.152 0 0 0 4 14.5c0 3.314 2.686 6 6 6s6-2.686 6-6c0-1.628-.567-3.37-1.42-4.253"/></svg>
                    </div>
                `;

                el.addEventListener('click', () => {
                    setSelectedDog(dog);
                    map.current?.flyTo({
                        center: dog.coordinates,
                        zoom: 10,
                        essential: true
                    });
                });

                new maplibregl.Marker({ element: el })
                    .setLngLat(dog.coordinates)
                    .setPopup(
                        new maplibregl.Popup({ offset: 25, closeButton: false })
                            .setHTML(`<h3 style="color:black; font-weight:bold;">${dog.name}</h3><p style="color:gray;">${dog.shelterCity}</p>`)
                    )
                    .addTo(map.current!);
            });
        });

    }, []);

    const resetView = () => {
        map.current?.flyTo({
            center: [-4.0, 43.0],
            zoom: 7,
            essential: true,
        });
    };

    return (
        <div className="relative w-full h-screen bg-card">
            <h1 className="sr-only">Mapa de adopciones</h1>
            {/* Nav Overlay */}
            <div className="absolute top-0 left-0 right-0 z-10 p-4 bg-gradient-to-b from-card/80 to-transparent pointer-events-none">
                <div className="max-w-7xl mx-auto flex items-center justify-between pointer-events-auto">
                    <Link
                        href="/adopcion"
                        className="flex items-center gap-2 px-4 py-2 bg-card/50 hover:bg-card/80 text-white rounded-xl backdrop-blur-md border border-white/10 transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        <span className="hidden sm:inline">Volver al listado</span>
                    </Link>

                    <div className="bg-card/50 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10 text-white font-medium flex items-center gap-2">
                        <MapPin className="w-5 h-5 text-emerald-400" />
                        Mapa de Adopciones
                    </div>
                </div>
            </div>

            {/* Status + Legend */}
            <div className="absolute top-20 left-1/2 -translate-x-1/2 z-10 px-4 w-full max-w-5xl pointer-events-none">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                    <div className="flex flex-wrap items-center gap-3 pointer-events-auto">
                        <div className="bg-card/80 border border-white/10 rounded-full px-4 py-2 text-xs text-foreground">
                            {dogsWithCoords.length} perros geolocalizados
                        </div>
                        {urgentCount > 0 && (
                            <div className="bg-red-500/20 border border-red-500/30 rounded-full px-4 py-2 text-xs text-red-200">
                                {urgentCount} urgentes
                            </div>
                        )}
                        <div className="bg-card/80 border border-white/10 rounded-full px-4 py-2 text-xs text-muted-foreground">
                            Verde: disponible · Rojo: urgente
                        </div>
                    </div>
                    <button
                        onClick={resetView}
                        className="pointer-events-auto bg-card/70 border border-white/10 rounded-full px-4 py-2 text-xs text-foreground hover:bg-card/80 transition-colors"
                    >
                        Centrar mapa
                    </button>
                </div>
            </div>

            {/* Map Container */}
            <div ref={mapContainer} className="w-full h-full" />

            {!mapLoaded && (
                <div className="absolute inset-0 flex items-center justify-center bg-card/70 backdrop-blur-sm z-10">
                    <div className="text-foreground text-sm">Cargando mapa…</div>
                </div>
            )}

            {mapLoaded && dogsWithCoords.length === 0 && (
                <div className="absolute inset-0 flex items-center justify-center z-10">
                    <div className="bg-card/80 border border-white/10 rounded-2xl px-6 py-4 text-center text-foreground max-w-sm">
                        <h3 className="text-lg font-semibold mb-2">Sin ubicaciones disponibles</h3>
                        <p className="text-sm text-muted-foreground">
                            Todavía no hay perros con coordenadas geográficas. Vuelve más tarde.
                        </p>
                    </div>
                </div>
            )}

            {/* Selected Dog Card Overlay */}
            {selectedDog && (
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-full max-w-sm px-4 z-20 animate-in slide-in-from-bottom-5 fade-in duration-300">
                    <div className="bg-card/90 backdrop-blur-xl border border-white/20 rounded-2xl p-4 shadow-2xl relative">
                        <button
                            onClick={() => setSelectedDog(null)}
                            aria-label="Cerrar"
                            className="absolute top-2 right-2 p-1.5 hover:bg-white/10 rounded-full text-muted-foreground hover:text-white transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        <div className="flex gap-4">
                            <div className={`w-24 h-24 rounded-xl flex-shrink-0 flex items-center justify-center ${selectedDog.gender === 'macho' ? 'bg-blue-500/20' : 'bg-pink-500/20'}`}>
                                <Dog className={`w-12 h-12 ${selectedDog.gender === 'macho' ? 'text-blue-400' : 'text-pink-400'}`} />
                            </div>

                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1">
                                    <h3 className="text-xl font-bold text-white truncate">{selectedDog.name}</h3>
                                    {selectedDog.isUrgent && (
                                        <span className="px-2 py-0.5 bg-red-500 text-white text-[10px] font-bold uppercase rounded-full">
                                            Urgente
                                        </span>
                                    )}
                                </div>
                                <p className="text-muted-foreground text-sm mb-1">{selectedDog.breed}</p>
                                <p className="text-muted-foreground text-xs mb-3 flex items-center gap-1">
                                    <MapPin className="w-3 h-3" />
                                    {selectedDog.shelterCity}, {selectedDog.shelterRegion}
                                </p>

                                <Link
                                    href={`/adopcion/${selectedDog.id}`}
                                    className="block w-full text-center py-2 bg-emerald-500 hover:bg-emerald-600 text-white font-medium rounded-lg transition-colors text-sm"
                                >
                                    Ver perfil completo
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

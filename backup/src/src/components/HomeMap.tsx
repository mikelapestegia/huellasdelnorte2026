"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { allKennels } from "@/data/kennels";
import { adoptionDogs } from "@/data/adoptionDogs";
import { MapPin, Hotel, Dog, Layers, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function HomeMap() {
    const mapContainer = useRef<HTMLDivElement>(null);
    const map = useRef<maplibregl.Map | null>(null);
    const markersRef = useRef<maplibregl.Marker[]>([]);

    const [layers, setLayers] = useState({
        adoption: true,
        kennels: true
    });

    // Initialize Map
    useEffect(() => {
        if (map.current || !mapContainer.current) return;

        map.current = new maplibregl.Map({
            container: mapContainer.current,
            style: 'https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json',
            center: [-4.0, 43.0],
            zoom: 6,
            attributionControl: false,
        });

        map.current.addControl(new maplibregl.NavigationControl({ showCompass: false }), 'bottom-right');

        map.current.on('load', () => {
            // Initial render is handled by the other useEffect when map is present
        });

    }, []);

    // Handle Markers Rendering
    useEffect(() => {
        if (!map.current || !map.current.getStyle()) return;

        // Clear existing markers
        markersRef.current.forEach(m => m.remove());
        markersRef.current = [];

        // Adoption Markers
        if (layers.adoption) {
            adoptionDogs.forEach(dog => {
                if (!dog.coordinates) return;

                const el = document.createElement('div');
                el.className = 'w-3 h-3 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)] border border-white/20 cursor-pointer hover:scale-150 transition-transform';
                if (dog.isUrgent) {
                    el.className = 'w-3 h-3 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)] border border-white/20 cursor-pointer hover:scale-150 transition-transform';
                }

                const marker = new maplibregl.Marker({ element: el })
                    .setLngLat([dog.coordinates.lng, dog.coordinates.lat])
                    .setPopup(new maplibregl.Popup({ offset: 10, closeButton: false }).setHTML(
                        `<div class="p-2 text-slate-900 font-bold text-sm">${dog.name}</div>`
                    ))
                    .addTo(map.current!);

                markersRef.current.push(marker);
            });
        }

        // Kennel Markers
        if (layers.kennels) {
            allKennels.forEach(kennel => {
                if (!kennel.coordinates) return; // Ensure coordinates exist

                const el = document.createElement('div');
                el.className = 'w-3 h-3 rounded-full bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.8)] border border-white/20 cursor-pointer hover:scale-150 transition-transform';

                const marker = new maplibregl.Marker({ element: el })
                    .setLngLat([kennel.coordinates.lng, kennel.coordinates.lat]) // Use safe access
                    .setPopup(new maplibregl.Popup({ offset: 10, closeButton: false }).setHTML(
                        `<div class="p-2 text-slate-900 font-bold text-sm">${kennel.name}</div>`
                    ))
                    .addTo(map.current!);

                markersRef.current.push(marker);
            });
        }
    }, [layers, map.current]); // Re-run when layers change or map is initialized

    return (
        <div className="relative w-full h-[600px] rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-slate-900">
            <div ref={mapContainer} className="w-full h-full" />

            {/* Control Panel Overlay */}
            <div className="absolute top-6 left-6 z-10 w-64 bg-slate-900/90 backdrop-blur-md rounded-2xl p-5 border border-white/10 shadow-xl">
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-indigo-500/20 flex items-center justify-center text-indigo-400">
                        <Layers className="w-5 h-5" />
                    </div>
                    <div>
                        <h3 className="text-white font-bold text-sm">Capas del Mapa</h3>
                        <p className="text-slate-400 text-xs">Filtrar visualización</p>
                    </div>
                </div>

                <div className="space-y-3 mb-6">
                    <button
                        onClick={() => setLayers(p => ({ ...p, adoption: !p.adoption }))}
                        className={`w-full flex items-center justify-between p-3 rounded-xl border transition-all ${layers.adoption
                                ? 'bg-emerald-500/10 border-emerald-500/30 shadow-lg shadow-emerald-500/5'
                                : 'bg-white/5 border-white/10 opacity-60 hover:opacity-80'
                            }`}
                    >
                        <div className="flex items-center gap-3">
                            <Dog className={`w-4 h-4 ${layers.adoption ? 'text-emerald-400' : 'text-slate-400'}`} />
                            <span className={`text-sm font-medium ${layers.adoption ? 'text-white' : 'text-slate-400'}`}>Adopción</span>
                        </div>
                        <div className={`w-2 h-2 rounded-full transition-colors ${layers.adoption ? 'bg-emerald-400' : 'bg-slate-600'}`} />
                    </button>

                    <button
                        onClick={() => setLayers(p => ({ ...p, kennels: !p.kennels }))}
                        className={`w-full flex items-center justify-between p-3 rounded-xl border transition-all ${layers.kennels
                                ? 'bg-amber-500/10 border-amber-500/30 shadow-lg shadow-amber-500/5'
                                : 'bg-white/5 border-white/10 opacity-60 hover:opacity-80'
                            }`}
                    >
                        <div className="flex items-center gap-3">
                            <Hotel className={`w-4 h-4 ${layers.kennels ? 'text-amber-400' : 'text-slate-400'}`} />
                            <span className={`text-sm font-medium ${layers.kennels ? 'text-white' : 'text-slate-400'}`}>Alojamientos</span>
                        </div>
                        <div className={`w-2 h-2 rounded-full transition-colors ${layers.kennels ? 'bg-amber-400' : 'bg-slate-600'}`} />
                    </button>
                </div>

                <div className="pt-4 border-t border-white/10">
                    <Link
                        href="/adopcion/mapa"
                        className="flex items-center justify-center gap-2 w-full py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg text-xs font-medium transition-colors"
                    >
                        Ver mapa completo <ArrowRight className="w-3 h-3" />
                    </Link>
                </div>
            </div>

            {/* Title Overlay */}
            <div className="absolute top-6 right-6 z-10 hidden md:block text-right pointer-events-none">
                <h2 className="text-3xl font-bold text-white drop-shadow-md">Norte de España</h2>
                <p className="text-slate-300 text-sm drop-shadow-md">Ecosistema canino activo</p>
            </div>
        </div>
    );
}

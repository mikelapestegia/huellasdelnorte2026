"use client";

import { useState } from "react";
import {
    Phone, MapPin, Clock, Search, AlertCircle,
    Siren, Ambulance, X
} from "lucide-react";
import { veterinaryClinics, type VeterinaryClinic } from "@/data/veterinarians";

export default function VeterinariosPage() {
    const [selectedRegion, setSelectedRegion] = useState<string>('all');
    const [searchQuery, setSearchQuery] = useState('');

    const filteredClinics = veterinaryClinics.filter(clinic => {
        const matchesRegion = selectedRegion === 'all' || clinic.region === selectedRegion;
        const matchesSearch = clinic.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            clinic.city.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesRegion && matchesSearch;
    });

    // Prioritize 24h hospitals
    const hospitals24h = filteredClinics.filter(c => c.status === 'open_24h');
    const urgencies = filteredClinics.filter(c => c.status === 'on_call');
    const hasActiveFilters = selectedRegion !== 'all' || searchQuery.trim().length > 0;

    const clearFilters = () => {
        setSelectedRegion('all');
        setSearchQuery('');
    };

    // Sort logic handled by grouping: 24h first, then urgencies

    return (
        <main className="min-h-screen bg-background text-foreground">
            {/* Header Alert */}
            <div className="bg-red-500/10 border-b border-red-500/20 pt-32 pb-8 px-4">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="inline-flex items-center gap-2 bg-red-500 text-white px-4 py-1.5 rounded-full text-sm font-bold animate-pulse mb-6">
                        <Siren className="w-4 h-4" />
                        SOS VETERINARIO
                    </div>
                    <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
                        Urgencias y Hospitales 24h
                    </h1>
                    <p className="text-red-200/80 max-w-2xl mx-auto text-sm md:text-base">
                        Listado de clínicas veterinarias y hospitales de referencia en el norte peninsular.
                        Priorizamos los centros con atención presencial 24 horas.
                    </p>
                </div>
            </div>

            {/* Controls */}
            <div className="sticky top-16 z-30 bg-background/80 backdrop-blur-md border-b border-white/5 py-4 px-4">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-4 items-center justify-between">
                    {/* Region Filter */}
                    <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 hide-scrollbar">
                        {['all', 'Navarra', 'Euskadi', 'Cantabria', 'La Rioja', 'Castilla y León', 'Galicia', 'Iparralde'].map((region) => (
                            <button
                                key={region}
                                type="button"
                                onClick={() => setSelectedRegion(region)}
                                aria-pressed={selectedRegion === region}
                                className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${selectedRegion === region
                                        ? 'bg-card text-foreground shadow-lg font-bold'
                                        : 'bg-white/5 text-muted-foreground hover:bg-white/10 hover:text-white'
                                    }`}
                            >
                                {region === 'all' ? 'Todas las Zonas' : region}
                            </button>
                        ))}
                    </div>

                    {/* Search */}
                    <div className="relative w-full md:w-72">
                        <Search className="absolute left-3 top-2.5 w-4 h-4 text-muted-foreground" />
                        <input
                            type="text"
                            placeholder="Buscar clínica o ciudad..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            aria-label="Buscar clínica o ciudad"
                            className="w-full bg-card border border-white/10 rounded-lg py-2 pl-9 pr-9 text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
                        />
                        {searchQuery && (
                            <button
                                type="button"
                                onClick={() => setSearchQuery('')}
                                aria-label="Limpiar búsqueda"
                                className="absolute right-2 top-1.5 p-1 rounded-full text-muted-foreground hover:text-white hover:bg-white/10 transition-colors"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        )}
                    </div>
                </div>

                <div className="max-w-7xl mx-auto mt-3 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                    <span aria-live="polite">
                        Resultados: <span className="text-white">{filteredClinics.length}</span>
                    </span>
                    <span>·</span>
                    <span>24h: <span className="text-emerald-400">{hospitals24h.length}</span></span>
                    <span>·</span>
                    <span>Urgencias: <span className="text-amber-400">{urgencies.length}</span></span>
                    {hasActiveFilters && (
                        <>
                            <span>·</span>
                            {selectedRegion !== 'all' && (
                                <span className="px-2 py-1 rounded-full bg-white/5 text-muted-foreground">
                                    Región: {selectedRegion}
                                </span>
                            )}
                            {searchQuery && (
                                <span className="px-2 py-1 rounded-full bg-white/5 text-muted-foreground">
                                    "{searchQuery}"
                                </span>
                            )}
                            <button
                                type="button"
                                onClick={clearFilters}
                                className="px-2 py-1 rounded-full border border-red-500/30 text-red-300 hover:bg-red-500/10 transition-colors"
                            >
                                Limpiar filtros
                            </button>
                        </>
                    )}
                </div>
            </div>

            {/* Content List */}
            <div className="max-w-5xl mx-auto px-4 py-12 space-y-12">

                {/* 1. HOSPITALS 24H (PRIORITY) */}
                {hospitals24h.length > 0 && (
                    <section className="space-y-6">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 bg-emerald-500/20 rounded-lg text-emerald-400">
                                <Clock className="w-6 h-6" />
                            </div>
                            <h2 className="text-2xl font-bold text-white">Hospitales Abiertos 24h</h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {hospitals24h.map(clinic => (
                                <ClinicCard key={clinic.id} clinic={clinic} priority />
                            ))}
                        </div>
                    </section>
                )}

                {/* 2. URGENCIES (ON CALL) */}
                {urgencies.length > 0 && (
                    <section className="space-y-6">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 bg-amber-500/20 rounded-lg text-amber-400">
                                <Phone className="w-6 h-6" />
                            </div>
                            <h2 className="text-2xl font-bold text-white">Urgencias Telefónicas (Llamar antes)</h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {urgencies.map(clinic => (
                                <ClinicCard key={clinic.id} clinic={clinic} />
                            ))}
                        </div>
                    </section>
                )}

                {filteredClinics.length === 0 && (
                    <div className="text-center py-20 bg-card/50 rounded-2xl border border-dashed border-white/10">
                        <AlertCircle className="w-10 h-10 text-muted-foreground mx-auto mb-4" />
                        <p className="text-muted-foreground">No se encontraron clínicas con estos criterios.</p>
                        <button
                            type="button"
                            onClick={clearFilters}
                            className="text-emerald-400 font-bold mt-2 hover:underline"
                        >
                            Limpiar filtros
                        </button>
                    </div>
                )}
            </div>
        </main>
    );
}

function ClinicCard({ clinic, priority = false }: { clinic: VeterinaryClinic, priority?: boolean }) {
    const is24h = clinic.status === 'open_24h';
    const isUrgency = clinic.status === 'on_call';

    return (
        <div className={`relative group rounded-2xl p-6 transition-all duration-300 ${priority
                ? 'bg-card border border-emerald-500/30 hover:border-emerald-500 shadow-xl shadow-emerald-900/10'
                : 'bg-card/50 border border-white/5 hover:border-amber-500/30'
            }`}>
            <div className="flex justify-between items-start mb-4">
                <div className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${is24h ? 'bg-emerald-500 text-background' : 'bg-amber-500/20 text-amber-400 border border-amber-500/20'
                    }`}>
                    {clinic.type}
                </div>
                {priority && <Ambulance className="w-5 h-5 text-emerald-500 animate-pulse" />}
            </div>

            <h3 className="text-xl font-bold text-white mb-1 group-hover:text-emerald-400 transition-colors">
                {clinic.name}
            </h3>
            <div className="flex items-center gap-1 text-muted-foreground text-sm mb-4">
                <MapPin className="w-3.5 h-3.5" />
                <span>{clinic.city} ({clinic.region})</span>
            </div>

            <p className="text-sm text-muted-foreground mb-6 border-b border-white/5 pb-4">
                {clinic.address}
            </p>

            <div className="grid grid-cols-1 gap-3">
                <a
                    href={`tel:${clinic.emergencyPhone?.replace(/\s/g, '') || clinic.phone.replace(/\s/g, '')}`}
                    aria-label={`Llamar a ${clinic.name}`}
                    className={`flex items-center justify-center gap-3 w-full py-3 rounded-xl font-bold transition-all ${priority
                            ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-900/40'
                            : 'bg-card/80 hover:bg-card/70 text-white'
                        }`}
                >
                    <Phone className="w-5 h-5" />
                    {clinic.emergencyPhone ? 'Llamar Urgencias' : 'Llamar Ahora'}
                </a>

                {clinic.emergencyPhone && (
                    <div className="text-center text-xs text-amber-500/80 font-medium">
                        Urgencias: {clinic.emergencyPhone}
                    </div>
                )}
                {!clinic.emergencyPhone && (
                    <div className="text-center text-xs text-muted-foreground font-medium">
                        Tel: {clinic.phone}
                    </div>
                )}
            </div>
        </div>
    );
}

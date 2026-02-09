"use client";

import { useState } from "react";
import Image from "next/image";
import {
    Utensils, Coffee, Beer, MapPin, Star, Globe,
    Info, Filter, Search, X
} from "lucide-react";
import { hospitalityPlaces, type HospitalityPlace } from "@/data/hospitality";

export default function HospitalityPage() {
    const [filterType, setFilterType] = useState<'all' | 'restaurant' | 'cafe' | 'bar'>('all');
    const [selectedRegion, setSelectedRegion] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');

    const filteredPlaces = hospitalityPlaces.filter(place => {
        const matchesType = filterType === 'all' || place.type === filterType;
        const matchesRegion = selectedRegion === 'all' || place.region === selectedRegion;
        const query = searchQuery.trim().toLowerCase();
        const matchesSearch = !query ||
            place.name.toLowerCase().includes(query) ||
            place.city.toLowerCase().includes(query) ||
            place.cuisine.toLowerCase().includes(query) ||
            place.description.toLowerCase().includes(query);
        return matchesType && matchesRegion && matchesSearch;
    });

    const getTypeIcon = (type: string) => {
        switch (type) {
            case 'restaurant': return <Utensils className="w-5 h-5 text-emerald-400" />;
            case 'cafe': return <Coffee className="w-5 h-5 text-amber-400" />;
            case 'bar': return <Beer className="w-5 h-5 text-blue-400" />;
            default: return <Utensils className="w-5 h-5" />;
        }
    };

    const getTypeLabel = (type: string) => {
        switch (type) {
            case 'restaurant': return 'Restaurantes';
            case 'cafe': return 'Cafeterías';
            case 'bar': return 'Bares & Pubs';
            default: return type;
        }
    };

    const hasActiveFilters = filterType !== 'all' || selectedRegion !== 'all' || searchQuery.trim().length > 0;

    const clearFilters = () => {
        setFilterType('all');
        setSelectedRegion('all');
        setSearchQuery('');
    };

    return (
        <main className="min-h-screen bg-background text-foreground">
            {/* Hero Section */}
            <div className="relative h-[400px] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-card/50 to-background z-10" />
                <div
                    className="absolute inset-0 bg-cover bg-center opacity-40 scale-105 animate-slow-zoom"
                    style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=2574&auto=format&fit=crop")' }}
                />

                <div className="relative z-20 text-center px-4 max-w-4xl mx-auto">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-6 animate-fade-in-up">
                        <Utensils className="w-5 h-5 text-emerald-400" />
                        <span className="font-medium text-white">Guía Gastronómica Dog Friendly</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 font-serif tracking-tight animate-fade-in-up" style={{ animationDelay: '100ms' }}>
                        Sabores del Norte <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
                            en buena compañía
                        </span>
                    </h1>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: '200ms' }}>
                        Descubre los mejores restaurantes, cafeterías y bares donde tú y tu perro sois bienvenidos.
                        Desde pintxos en Donosti hasta marisco en Galicia.
                    </p>
                </div>
            </div>

            {/* Content Container */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

                {/* Filters */}
                <div className="flex flex-col md:flex-row gap-6 mb-6 items-center justify-between bg-card/50 p-4 rounded-2xl border border-white/5 backdrop-blur-sm">
                    <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto mask-linear-fade">
                        {['all', 'restaurant', 'cafe', 'bar'].map((type) => (
                            <button
                                key={type}
                                type="button"
                                onClick={() => setFilterType(type as any)}
                                aria-pressed={filterType === type}
                                className={`px-5 py-2.5 rounded-xl font-medium transition-all whitespace-nowrap flex items-center gap-2 ${filterType === type
                                    ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20'
                                    : 'bg-white/5 text-muted-foreground hover:bg-white/10 hover:text-white'
                                    }`}
                            >
                                {type === 'all' && <Filter className="w-4 h-4" />}
                                {type !== 'all' && getTypeIcon(type)}
                                {type === 'all' ? 'Ver Todo' : getTypeLabel(type)}
                            </button>
                        ))}
                    </div>

                    <div className="flex flex-col sm:flex-row items-stretch gap-3 w-full md:w-auto">
                        <div className="relative w-full md:w-64">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <input
                                type="text"
                                placeholder="Buscar por nombre, ciudad o cocina..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                aria-label="Buscar restaurantes, cafeterías o bares"
                                className="w-full bg-card border border-white/10 rounded-xl py-2.5 pl-9 pr-9 text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
                            />
                            {searchQuery && (
                                <button
                                    type="button"
                                    onClick={() => setSearchQuery('')}
                                    aria-label="Limpiar búsqueda"
                                    className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-full text-muted-foreground hover:text-white hover:bg-white/10 transition-colors"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            )}
                        </div>

                        <div className="flex items-center gap-3 w-full md:w-auto">
                            <span className="text-sm text-muted-foreground hidden md:inline">Región:</span>
                            <select
                                value={selectedRegion}
                                onChange={(e) => setSelectedRegion(e.target.value)}
                                aria-label="Filtrar por región"
                                className="bg-card/80 border-none text-white text-sm rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-emerald-500 w-full md:w-48 cursor-pointer hover:bg-card/70 transition-colors"
                            >
                                <option value="all">Todo el Norte</option>
                                <option value="Euskadi">Euskadi</option>
                                <option value="Cantabria">Cantabria</option>
                                <option value="Asturias">Asturias</option>
                                <option value="Galicia">Galicia</option>
                            </select>
                        </div>
                    </div>
                </div>

                {hasActiveFilters && (
                    <div className="mb-10 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                        <span>Filtros activos:</span>
                        {filterType !== 'all' && (
                            <span className="px-2 py-1 rounded-full bg-white/5 text-muted-foreground">
                                Tipo: {getTypeLabel(filterType)}
                            </span>
                        )}
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
                            className="px-2.5 py-1 rounded-full border border-red-500/30 text-red-300 hover:bg-red-500/10 transition-colors"
                        >
                            Limpiar todo
                        </button>
                    </div>
                )}

                <div className="mb-8 text-sm text-muted-foreground">
                    Mostrando <span className="text-white font-semibold">{filteredPlaces.length}</span> de {hospitalityPlaces.length} lugares
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredPlaces.length > 0 ? (
                        filteredPlaces.map((place) => (
                            <div
                                key={place.id}
                                className="group relative bg-card rounded-3xl overflow-hidden border border-white/5 hover:border-emerald-500/30 transition-all duration-300 hover:shadow-2xl hover:shadow-emerald-900/10 flex flex-col"
                            >
                                {/* Image Placeholder */}
                                <div className="h-48 bg-card/80 relative overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent z-10" />
                                    {place.image ? (
                                        <Image
                                            src={place.image}
                                            alt={place.name}
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-muted-foreground bg-card/80">
                                            {getTypeIcon(place.type)}
                                        </div>
                                    )}
                                    <div className="absolute top-4 right-4 z-20 bg-card/90 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 text-xs font-bold text-white uppercase tracking-wider">
                                        {place.city}
                                    </div>
                                    <div className="absolute bottom-4 left-4 z-20 flex gap-2">
                                        <span className="bg-emerald-500/90 backdrop-blur-md px-2 py-1 rounded-lg text-xs font-bold text-white flex items-center gap-1">
                                            <Star className="w-3 h-3 fill-current" />
                                            {place.rating}
                                        </span>
                                        <span className="bg-card/90 backdrop-blur-md px-2 py-1 rounded-lg text-xs font-medium text-muted-foreground border border-white/10">
                                            {place.priceRange}
                                        </span>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-6 flex-1 flex flex-col">
                                    <div className="flex items-start justify-between mb-2">
                                        <div>
                                            <p className="text-emerald-400 text-xs font-bold uppercase tracking-wider mb-1">{place.cuisine}</p>
                                            <h3 className="text-xl font-bold text-white group-hover:text-emerald-400 transition-colors">
                                                {place.name}
                                            </h3>
                                        </div>
                                        <div className="p-2 bg-white/5 rounded-full text-muted-foreground group-hover:bg-white/10 group-hover:text-white transition-colors">
                                            {getTypeIcon(place.type)}
                                        </div>
                                    </div>

                                    <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                                        {place.description}
                                    </p>

                                    {/* Pet Policy Highlight */}
                                    <div className="mt-auto bg-emerald-500/10 rounded-xl p-3 border border-emerald-500/20 mb-4">
                                        <div className="flex items-start gap-2">
                                            <Info className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                                            <p className="text-xs text-emerald-200 font-medium leading-relaxed">
                                                {place.petPolicy}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Features */}
                                    {place.features && (
                                        <div className="flex flex-wrap gap-2 mb-6">
                                            {place.features.map(feature => (
                                                <span key={feature} className="text-[10px] uppercase font-bold text-muted-foreground bg-card/80 px-2 py-1 rounded-md">
                                                    {feature}
                                                </span>
                                            ))}
                                        </div>
                                    )}

                                    {/* Actions */}
                                    <div className="grid grid-cols-2 gap-3 pt-4 border-t border-white/5">
                                        {place.website && (
                                            <a
                                                href={place.website}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                aria-label={`Visitar web de ${place.name}`}
                                                className="flex items-center justify-center gap-2 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-muted-foreground text-xs font-medium transition-colors"
                                            >
                                                <Globe className="w-3 h-3" />
                                                Web
                                            </a>
                                        )}
                                        <button
                                            type="button"
                                            aria-label={`Ver ${place.name} en el mapa`}
                                            className="flex items-center justify-center gap-2 py-2 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 text-xs font-medium transition-colors col-span-1"
                                        >
                                            <MapPin className="w-3 h-3" />
                                            Ver Mapa
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="col-span-full py-20 text-center">
                            <p className="text-muted-foreground text-lg">No se encontraron lugares con estos filtros.</p>
                            <button
                                type="button"
                                onClick={clearFilters}
                                className="mt-4 text-emerald-400 hover:text-emerald-300 font-medium"
                            >
                                Limpiar filtros
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}

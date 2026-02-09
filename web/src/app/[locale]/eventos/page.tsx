"use client";

import { useState } from "react";
import Image from "next/image";
import { events, type DogEvent } from "@/data/events";
import { Calendar, MapPin, Trophy, Search, Info, Users, X } from "lucide-react";


const EventImage = ({ src, alt, className }: { src: string, alt: string, className?: string }) => {
    const [imgSrc, setImgSrc] = useState(src);

    return (
        <Image
            src={imgSrc}
            alt={alt}
            fill
            className={className}
            onError={() => setImgSrc("https://images.unsplash.com/photo-1541599540903-216a46ca1dc0?q=80&w=2671&auto=format&fit=crop")}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
    );
};

export default function EventsPage() {
    const [selectedType, setSelectedType] = useState<string>('all');
    const [searchQuery, setSearchQuery] = useState('');

    const filteredEvents = events.filter(event => {
        const matchesType = selectedType === 'all' || event.type === selectedType;
        const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            event.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
            event.region.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesType && matchesSearch;
    });

    // Get unique types for filter tabs
    const eventTypes = Array.from(new Set(events.map(e => e.type)));
    const hasActiveFilters = selectedType !== 'all' || searchQuery.trim().length > 0;

    const clearFilters = () => {
        setSelectedType('all');
        setSearchQuery('');
    };

    return (
        <main className="min-h-screen bg-background text-foreground pb-20">
            {/* Hero Section */}
            <div className="relative pt-32 pb-20 px-4 bg-gradient-to-br from-card via-indigo-950/20 to-background border-b border-white/5 overflow-hidden">
                <div className="max-w-4xl mx-auto text-center relative z-10">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-sm font-medium mb-6 animate-fade-in-up">
                        <Calendar className="w-4 h-4" />
                        <span>Agenda Canina 2025-2026</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight animate-fade-in-up" style={{ animationDelay: '100ms' }}>
                        Eventos <span className="text-indigo-500">Imprescindibles</span>
                    </h1>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: '200ms' }}>
                        Descubre las mejores competiciones de agility, carreras de mushing y fiestas tradicionales de pastoreo en el norte.
                    </p>
                </div>

                {/* Background Pattern */}
                <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 pointer-events-none" />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
                {/* Search & Filter Bar */}
                <div className="bg-card rounded-2xl p-4 shadow-xl border border-white/10 flex flex-col md:flex-row gap-4 items-center justify-between mb-12">
                    <div className="relative w-full md:w-96">
                        <Search className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                        <input
                            type="text"
                            placeholder="Buscar por nombre, lugar o región..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            aria-label="Buscar eventos caninos"
                            className="w-full bg-background border border-border rounded-xl py-2.5 pl-10 pr-9 text-white focus:ring-2 focus:ring-indigo-500/50 outline-none transition-all placeholder:text-muted-foreground"
                        />
                        {searchQuery && (
                            <button
                                type="button"
                                onClick={() => setSearchQuery('')}
                                aria-label="Limpiar búsqueda"
                                className="absolute right-2 top-2 p-1 rounded-full text-muted-foreground hover:text-white hover:bg-white/10 transition-colors"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        )}
                    </div>

                    <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 hide-scrollbar">
                        <button
                            type="button"
                            onClick={() => setSelectedType('all')}
                            aria-pressed={selectedType === 'all'}
                            className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${selectedType === 'all'
                                ? 'bg-indigo-600 text-white'
                                : 'bg-card/80 text-muted-foreground hover:text-white hover:bg-card/70'}`}
                        >
                            Todos
                        </button>
                        {eventTypes.map(type => (
                            <button
                                key={type}
                                type="button"
                                onClick={() => setSelectedType(type)}
                                aria-pressed={selectedType === type}
                                className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${selectedType === type
                                    ? 'bg-indigo-600 text-white'
                                    : 'bg-card/80 text-muted-foreground hover:text-white hover:bg-card/70'}`}
                            >
                                {type}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="mb-8 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                    <span aria-live="polite">
                        Resultados: <span className="text-white">{filteredEvents.length}</span>
                    </span>
                    {hasActiveFilters && (
                        <>
                            <span>·</span>
                            {selectedType !== 'all' && (
                                <span className="px-2 py-1 rounded-full bg-white/5 text-muted-foreground">
                                    Tipo: {selectedType}
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
                                Limpiar filtros
                            </button>
                        </>
                    )}
                </div>

                {/* Info Alert */}
                <div className="bg-indigo-900/20 border-l-4 border-indigo-500 p-4 mb-12 rounded-r-lg flex gap-4 items-start animate-fade-in-up">
                    <Info className="w-6 h-6 text-indigo-400 flex-shrink-0 mt-0.5" />
                    <div>
                        <h4 className="font-bold text-indigo-300 text-sm mb-1">Agenda Deportiva y Cultural</h4>
                        <p className="text-sm text-indigo-200/80 leading-relaxed">
                            Esta sección se centra exclusivamente en eventos deportivos civiles (como la Liga Norte de Agility o Competiciones de Mushing) y celebraciones culturales de pastoreo. No incluimos exhibiciones institucionales o policiales.
                        </p>
                    </div>
                </div>

                {/* Events Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredEvents.map((event, index) => (
                        <div
                            key={event.id}
                            className="group bg-card rounded-2xl overflow-hidden border border-white/5 hover:border-indigo-500/30 transition-all hover:shadow-2xl hover:shadow-indigo-900/20 flex flex-col animate-fade-in-up"
                            style={{ animationDelay: `${index * 100}ms` }}
                        >
                            <div className="aspect-video relative overflow-hidden">
                                <EventImage
                                    src={event.imageUrl}
                                    alt={event.title}
                                    className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100"
                                />
                                <div className="absolute top-4 right-4 bg-card/90 backdrop-blur-md px-3 py-1 rounded-lg border border-white/10 text-xs font-bold text-white shadow-lg">
                                    {event.month}
                                </div>
                                <div className={`absolute top-4 left-4 px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider shadow-lg ${event.type === 'Pastor' ? 'bg-amber-500 text-background' :
                                    event.type === 'Mushing' ? 'bg-sky-500 text-background' :
                                        event.type === 'Agility' ? 'bg-emerald-500 text-background' :
                                            event.type === 'Social' ? 'bg-rose-500 text-white' :
                                                'bg-indigo-500 text-white'
                                    }`}>
                                    {event.type}
                                </div>
                            </div>

                            <div className="p-6 flex-1 flex flex-col">
                                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-indigo-400 transition-colors">
                                    {event.title}
                                </h3>

                                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                                    <MapPin className="w-4 h-4 text-indigo-500" />
                                    <span>{event.location} <span className="text-muted-foreground">•</span> {event.region}</span>
                                </div>

                                <p className="text-muted-foreground text-sm leading-relaxed mb-6 flex-1 line-clamp-3">
                                    {event.description}
                                </p>

                                <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between">
                                    <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                                        <Trophy className="w-4 h-4" />
                                        <span>Competición Oficial</span>
                                    </div>
                                    <span className="text-xs text-indigo-400 font-bold group-hover:underline cursor-pointer">
                                        Ver Detalles
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}

                    {filteredEvents.length === 0 && (
                        <div className="col-span-full py-20 text-center">
                            <Calendar className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                            <h3 className="text-xl font-bold text-muted-foreground">No se encontraron eventos</h3>
                            <p className="text-muted-foreground">Intenta cambiar los filtros de búsqueda.</p>
                            {hasActiveFilters && (
                                <button
                                    type="button"
                                    onClick={clearFilters}
                                    className="mt-4 text-indigo-400 hover:text-indigo-300 font-medium"
                                >
                                    Limpiar filtros
                                </button>
                            )}
                        </div>
                    )}
                </div>

                {/* Social Meetups CTA */}
                <div className="mt-16 bg-gradient-to-r from-emerald-900/40 to-card border border-emerald-500/20 rounded-2xl p-8 md:p-12 text-center relative overflow-hidden group">
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
                    <div className="relative z-10 flex flex-col items-center">
                        <div className="bg-emerald-500/10 p-4 rounded-full mb-6 group-hover:scale-110 transition-transform duration-500">
                            <Users className="w-8 h-8 text-emerald-400" />
                        </div>
                        <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">¿Organizas paseos o tienes un grupo canino?</h3>
                        <p className="text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
                            Si tienes un grupo en Facebook, Telegram o WhatsApp y organizas quedadas gratuitas en el norte, ¡anúncialas aquí!
                            Ayudemos a crear una comunidad más unida y socializada.
                        </p>
                        <a
                            href="mailto:hola@huellasdelnorte.com?subject=Nueva%20Quedada"
                            className="inline-flex items-center gap-2 px-8 py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl shadow-lg shadow-emerald-900/30 transition-all hover:-translate-y-1"
                        >
                            <Users className="w-5 h-5" />
                            Publicar Quedada Gratis
                        </a>
                    </div>
                </div>
            </div>
        </main>
    );
}

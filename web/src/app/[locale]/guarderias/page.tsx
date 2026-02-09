"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
    Home,
    Hotel,
    Building2,
    Users,
    Search,
    MapPin,
    Phone,
    Globe,
    Star,
    CheckCircle2,
    Filter,
    X,
    Car,
    Scissors,
    Stethoscope,
    Dog,
    Cat,
    Waves,
    TreePine,
    Thermometer,
    Clock,
    ChevronDown,
    Heart,
    ExternalLink,
    Sparkles,
} from "lucide-react";

import {
    allKennels,
    getKennelStats,
    type Kennel,
    type KennelType,
    type KennelServiceType,
} from "@/data/kennels";

const kennelTypeConfig: Record<KennelType, { label: string; icon: React.ReactNode; color: string }> = {
    hotel: { label: "Hotel", icon: <Hotel className="w-4 h-4" />, color: "bg-amber-500/20 text-amber-300 border-amber-500/30" },
    guarderia: { label: "Guardería", icon: <Users className="w-4 h-4" />, color: "bg-blue-500/20 text-blue-300 border-blue-500/30" },
    residencia: { label: "Residencia", icon: <Building2 className="w-4 h-4" />, color: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30" },
    cuidador_particular: { label: "Cuidador", icon: <Heart className="w-4 h-4" />, color: "bg-pink-500/20 text-pink-300 border-pink-500/30" },
};

const serviceIcons: Record<KennelServiceType, { icon: React.ReactNode; label: string }> = {
    hotel: { icon: <Hotel className="w-3.5 h-3.5" />, label: "Hotel" },
    guarderia: { icon: <Users className="w-3.5 h-3.5" />, label: "Guardería" },
    residencia: { icon: <Building2 className="w-3.5 h-3.5" />, label: "Residencia" },
    adiestramiento: { icon: <Dog className="w-3.5 h-3.5" />, label: "Adiestramiento" },
    peluqueria: { icon: <Scissors className="w-3.5 h-3.5" />, label: "Peluquería" },
    veterinario: { icon: <Stethoscope className="w-3.5 h-3.5" />, label: "Veterinario" },
    recogida_domicilio: { icon: <Car className="w-3.5 h-3.5" />, label: "Recogida" },
    piscina: { icon: <Waves className="w-3.5 h-3.5" />, label: "Piscina" },
    parques: { icon: <TreePine className="w-3.5 h-3.5" />, label: "Parques" },
    webcam: { icon: <Globe className="w-3.5 h-3.5" />, label: "Webcam" },
    alimentacion_premium: { icon: <Sparkles className="w-3.5 h-3.5" />, label: "Premium" },
};

const regions = [
    { id: "all", label: "Todas las regiones" },
    { id: "Euskadi", label: "Euskadi" },
    { id: "Navarra", label: "Navarra" },
    { id: "Cantabria", label: "Cantabria" },
    { id: "Asturias", label: "Asturias" },
    { id: "Galicia", label: "Galicia" },
    { id: "Iparralde", label: "Iparralde" },
];

const types = [
    { id: "all", label: "Todos los tipos" },
    { id: "hotel", label: "Hoteles" },
    { id: "guarderia", label: "Guarderías" },
    { id: "residencia", label: "Residencias" },
    { id: "cuidador_particular", label: "Cuidadores" },
];

function KennelCard({ kennel }: { kennel: Kennel }) {
    const typeConfig = kennelTypeConfig[kennel.type];

    return (
        <div className="group relative bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden hover:border-emerald-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/10">
            {/* Header */}
            <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${typeConfig.color}`}>
                        {typeConfig.icon}
                        {typeConfig.label}
                    </span>
                    {kennel.isVerified && (
                        <span className="flex items-center gap-1 text-xs text-emerald-400">
                            <CheckCircle2 className="w-4 h-4" />
                            Verificado
                        </span>
                    )}
                </div>

                <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-emerald-400 transition-colors">
                    {kennel.name}
                </h3>

                {(kennel.city || kennel.region) && (
                    <p className="flex items-center gap-1.5 text-sm text-muted-foreground mb-3">
                        <MapPin className="w-4 h-4" />
                        {kennel.city && <span>{kennel.city},</span>}
                        <span>{kennel.region}</span>
                        {kennel.country === "FR" && <span className="text-xs">(Francia)</span>}
                    </p>
                )}

                <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
                    {kennel.description}
                </p>

                {/* Features */}
                <div className="flex flex-wrap gap-2 mb-4">
                    {kennel.areaSize && (
                        <span className="inline-flex items-center gap-1 px-2 py-1 bg-emerald-500/10 text-emerald-300 rounded-lg text-xs">
                            <TreePine className="w-3 h-3" />
                            {kennel.areaSize}
                        </span>
                    )}
                    {kennel.hasHeating && (
                        <span className="inline-flex items-center gap-1 px-2 py-1 bg-orange-500/10 text-orange-300 rounded-lg text-xs">
                            <Thermometer className="w-3 h-3" />
                            Calefacción
                        </span>
                    )}
                    {kennel.is24h && (
                        <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-500/10 text-blue-300 rounded-lg text-xs">
                            <Clock className="w-3 h-3" />
                            24h
                        </span>
                    )}
                    {kennel.acceptsCats && (
                        <span className="inline-flex items-center gap-1 px-2 py-1 bg-pink-500/10 text-pink-300 rounded-lg text-xs">
                            <Cat className="w-3 h-3" />
                            Gatos
                        </span>
                    )}
                    {kennel.capacity && (
                        <span className="inline-flex items-center gap-1 px-2 py-1 bg-purple-500/10 text-purple-300 rounded-lg text-xs">
                            <Dog className="w-3 h-3" />
                            {kennel.capacity} plazas
                        </span>
                    )}
                </div>

                {/* Services */}
                <div className="flex flex-wrap gap-1.5">
                    {kennel.services.slice(0, 5).map((service) => (
                        <span
                            key={service}
                            className="inline-flex items-center gap-1 px-2 py-1 bg-white/5 text-muted-foreground rounded-lg text-xs"
                            title={serviceIcons[service].label}
                        >
                            {serviceIcons[service].icon}
                            <span className="hidden sm:inline">{serviceIcons[service].label}</span>
                        </span>
                    ))}
                    {kennel.services.length > 5 && (
                        <span className="inline-flex items-center px-2 py-1 bg-white/5 text-muted-foreground rounded-lg text-xs">
                            +{kennel.services.length - 5}
                        </span>
                    )}
                </div>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 bg-white/5 border-t border-white/5">
                <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                        {kennel.phone && (
                            <a
                                href={`tel:${kennel.phone}`}
                                aria-label={`Llamar a ${kennel.name}`}
                                className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-emerald-400 transition-colors"
                            >
                                <Phone className="w-3.5 h-3.5" />
                                Llamar
                            </a>
                        )}
                    </div>
                    {kennel.website && (
                        <a
                            href={kennel.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`Visitar web de ${kennel.name}`}
                            className="flex items-center gap-1.5 text-xs text-emerald-400 hover:text-emerald-300 transition-colors"
                        >
                            <ExternalLink className="w-3.5 h-3.5" />
                            Ver web
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
}

export default function GuarderiasPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedRegion, setSelectedRegion] = useState("all");
    const [selectedType, setSelectedType] = useState("all");
    const [showFilters, setShowFilters] = useState(false);
    const [filters, setFilters] = useState({
        verified: false,
        acceptsCats: false,
        hasPickup: false,
        hasHeating: false,
        has24h: false,
    });

    const stats = getKennelStats();

    const filteredKennels = useMemo(() => {
        return allKennels.filter((kennel) => {
            // Search
            if (searchQuery) {
                const query = searchQuery.toLowerCase();
                const matchesSearch =
                    kennel.name.toLowerCase().includes(query) ||
                    kennel.description.toLowerCase().includes(query) ||
                    kennel.city?.toLowerCase().includes(query) ||
                    kennel.region.toLowerCase().includes(query);
                if (!matchesSearch) return false;
            }

            // Region
            if (selectedRegion !== "all" && kennel.region !== selectedRegion) {
                return false;
            }

            // Type
            if (selectedType !== "all" && kennel.type !== selectedType) {
                return false;
            }

            // Additional filters
            if (filters.verified && !kennel.isVerified) return false;
            if (filters.acceptsCats && !kennel.acceptsCats) return false;
            if (filters.hasPickup && !kennel.services.includes("recogida_domicilio")) return false;
            if (filters.hasHeating && !kennel.hasHeating) return false;
            if (filters.has24h && !kennel.is24h) return false;

            return true;
        });
    }, [searchQuery, selectedRegion, selectedType, filters]);

    const activeFiltersCount = Object.values(filters).filter(Boolean).length;
    const hasActiveFilters =
        searchQuery.trim().length > 0 ||
        selectedRegion !== "all" ||
        selectedType !== "all" ||
        activeFiltersCount > 0;

    const clearAllFilters = () => {
        setSearchQuery("");
        setSelectedRegion("all");
        setSelectedType("all");
        setFilters({
            verified: false,
            acceptsCats: false,
            hasPickup: false,
            hasHeating: false,
            has24h: false,
        });
    };

    return (
        <main className="min-h-screen bg-gradient-to-b from-card via-card/80 to-card">
            {/* Hero Section */}
            <section className="relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-amber-900/30 via-transparent to-emerald-900/20" />
                <div className="absolute top-20 left-10 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl" />
                <div className="absolute bottom-10 right-10 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
                    <div className="text-center max-w-3xl mx-auto">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/15 border border-amber-500/30 mb-6">
                            <Home className="w-4 h-4 text-amber-400" />
                            <span className="text-sm text-amber-300">Alojamiento Canino</span>
                        </div>

                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
                            Guarderías y Hoteles
                            <span className="block mt-2 bg-gradient-to-r from-amber-400 via-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                                para tu Perro
                            </span>
                        </h1>

                        <p className="text-lg text-muted-foreground mb-8">
                            Encuentra el mejor alojamiento para tu compañero peludo.
                            Guarderías, hoteles y residencias verificadas en todo el norte.
                        </p>

                        <div className="flex justify-center gap-4 mb-8">
                            <Link
                                href="/guarderias/mapa"
                                className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-medium rounded-xl transition-colors shadow-lg shadow-emerald-500/20"
                            >
                                <MapPin className="w-5 h-5" />
                                Ver Mapa Interactivo
                            </Link>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
                            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                                <p className="text-2xl font-bold text-white">{stats.total}</p>
                                <p className="text-sm text-muted-foreground">Establecimientos</p>
                            </div>
                            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                                <p className="text-2xl font-bold text-emerald-400">{stats.verified}</p>
                                <p className="text-sm text-muted-foreground">Verificados</p>
                            </div>
                            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                                <p className="text-2xl font-bold text-amber-400">{stats.hotels}</p>
                                <p className="text-sm text-muted-foreground">Hoteles</p>
                            </div>
                            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                                <p className="text-2xl font-bold text-blue-400">{stats.guarderias}</p>
                                <p className="text-sm text-muted-foreground">Guarderías</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Search and Filters */}
            <section className="sticky top-16 z-30 bg-card/95 backdrop-blur-md border-b border-white/10">
                <div className="max-w-7xl mx-auto px-4 py-4">
                    <div className="flex flex-col lg:flex-row gap-4">
                        {/* Search */}
                        <div className="relative flex-1">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                            <input
                                type="text"
                                placeholder="Buscar por nombre, ciudad o región..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                aria-label="Buscar guarderías, hoteles o residencias"
                                className="w-full pl-12 pr-10 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all"
                            />
                            {searchQuery && (
                                <button
                                    type="button"
                                    onClick={() => setSearchQuery("")}
                                    aria-label="Limpiar búsqueda"
                                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-full text-muted-foreground hover:text-white hover:bg-white/10 transition-colors"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            )}
                        </div>

                        {/* Region Select */}
                        <div className="relative">
                            <select
                                value={selectedRegion}
                                onChange={(e) => setSelectedRegion(e.target.value)}
                                aria-label="Filtrar por región"
                                className="appearance-none w-full lg:w-48 px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all cursor-pointer"
                            >
                                {regions.map((region) => (
                                    <option key={region.id} value={region.id} className="bg-card/80">
                                        {region.label}
                                    </option>
                                ))}
                            </select>
                            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                        </div>

                        {/* Type Select */}
                        <div className="relative">
                            <select
                                value={selectedType}
                                onChange={(e) => setSelectedType(e.target.value)}
                                aria-label="Filtrar por tipo de guardería"
                                className="appearance-none w-full lg:w-44 px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all cursor-pointer"
                            >
                                {types.map((type) => (
                                    <option key={type.id} value={type.id} className="bg-card/80">
                                        {type.label}
                                    </option>
                                ))}
                            </select>
                            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                        </div>

                        {/* More Filters Button */}
                        <button
                            type="button"
                            onClick={() => setShowFilters(!showFilters)}
                            aria-expanded={showFilters}
                            aria-controls="guarderias-filtros-extra"
                            className={`flex items-center justify-center gap-2 px-4 py-3 rounded-xl border transition-colors ${showFilters || activeFiltersCount > 0
                                ? "bg-emerald-500/20 border-emerald-500/30 text-emerald-300"
                                : "bg-white/5 border-white/10 text-muted-foreground hover:bg-white/10"
                                }`}
                        >
                            <Filter className="w-5 h-5" />
                            <span>Filtros</span>
                            {activeFiltersCount > 0 && (
                                <span className="flex items-center justify-center w-5 h-5 bg-emerald-500 text-white text-xs font-medium rounded-full">
                                    {activeFiltersCount}
                                </span>
                            )}
                        </button>
                    </div>

                    {/* Additional Filters */}
                    {showFilters && (
                        <div id="guarderias-filtros-extra" className="mt-4 p-4 bg-white/5 rounded-xl border border-white/10 animate-in fade-in slide-in-from-top-2">
                            <div className="flex flex-wrap gap-3">
                                <button
                                    type="button"
                                    onClick={() => setFilters(prev => ({ ...prev, verified: !prev.verified }))}
                                    aria-pressed={filters.verified}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors ${filters.verified
                                        ? "bg-emerald-500/20 border-emerald-500/30 text-emerald-300"
                                        : "bg-white/5 border-white/10 text-muted-foreground hover:text-white"
                                        }`}
                                >
                                    <CheckCircle2 className="w-4 h-4" />
                                    Solo verificados
                                </button>

                                <button
                                    type="button"
                                    onClick={() => setFilters(prev => ({ ...prev, acceptsCats: !prev.acceptsCats }))}
                                    aria-pressed={filters.acceptsCats}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors ${filters.acceptsCats
                                        ? "bg-pink-500/20 border-pink-500/30 text-pink-300"
                                        : "bg-white/5 border-white/10 text-muted-foreground hover:text-white"
                                        }`}
                                >
                                    <Cat className="w-4 h-4" />
                                    Acepta gatos
                                </button>

                                <button
                                    type="button"
                                    onClick={() => setFilters(prev => ({ ...prev, hasPickup: !prev.hasPickup }))}
                                    aria-pressed={filters.hasPickup}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors ${filters.hasPickup
                                        ? "bg-blue-500/20 border-blue-500/30 text-blue-300"
                                        : "bg-white/5 border-white/10 text-muted-foreground hover:text-white"
                                        }`}
                                >
                                    <Car className="w-4 h-4" />
                                    Recogida a domicilio
                                </button>

                                <button
                                    type="button"
                                    onClick={() => setFilters(prev => ({ ...prev, hasHeating: !prev.hasHeating }))}
                                    aria-pressed={filters.hasHeating}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors ${filters.hasHeating
                                        ? "bg-orange-500/20 border-orange-500/30 text-orange-300"
                                        : "bg-white/5 border-white/10 text-muted-foreground hover:text-white"
                                        }`}
                                >
                                    <Thermometer className="w-4 h-4" />
                                    Con calefacción
                                </button>

                                <button
                                    type="button"
                                    onClick={() => setFilters(prev => ({ ...prev, has24h: !prev.has24h }))}
                                    aria-pressed={filters.has24h}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors ${filters.has24h
                                        ? "bg-purple-500/20 border-purple-500/30 text-purple-300"
                                        : "bg-white/5 border-white/10 text-muted-foreground hover:text-white"
                                        }`}
                                >
                                    <Clock className="w-4 h-4" />
                                    Atención 24h
                                </button>

                                {activeFiltersCount > 0 && (
                                    <button
                                        type="button"
                                        onClick={clearAllFilters}
                                        className="flex items-center gap-2 px-4 py-2 rounded-lg border border-red-500/30 text-red-400 hover:bg-red-500/10 transition-colors"
                                    >
                                        <X className="w-4 h-4" />
                                        Limpiar todo
                                    </button>
                                )}
                            </div>
                        </div>
                    )}

                    {hasActiveFilters && (
                        <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                            <span>Filtros activos:</span>
                            {searchQuery && (
                                <span className="px-2 py-1 rounded-full bg-white/5 text-muted-foreground">
                                    "{searchQuery}"
                                </span>
                            )}
                            {selectedRegion !== "all" && (
                                <span className="px-2 py-1 rounded-full bg-white/5 text-muted-foreground">
                                    Región: {regions.find((region) => region.id === selectedRegion)?.label}
                                </span>
                            )}
                            {selectedType !== "all" && (
                                <span className="px-2 py-1 rounded-full bg-white/5 text-muted-foreground">
                                    Tipo: {types.find((type) => type.id === selectedType)?.label}
                                </span>
                            )}
                            {filters.verified && (
                                <span className="px-2 py-1 rounded-full bg-white/5 text-muted-foreground">
                                    Verificados
                                </span>
                            )}
                            {filters.acceptsCats && (
                                <span className="px-2 py-1 rounded-full bg-white/5 text-muted-foreground">
                                    Acepta gatos
                                </span>
                            )}
                            {filters.hasPickup && (
                                <span className="px-2 py-1 rounded-full bg-white/5 text-muted-foreground">
                                    Recogida
                                </span>
                            )}
                            {filters.hasHeating && (
                                <span className="px-2 py-1 rounded-full bg-white/5 text-muted-foreground">
                                    Con calefacción
                                </span>
                            )}
                            {filters.has24h && (
                                <span className="px-2 py-1 rounded-full bg-white/5 text-muted-foreground">
                                    24h
                                </span>
                            )}
                            <button
                                type="button"
                                onClick={clearAllFilters}
                                className="px-2.5 py-1 rounded-full border border-red-500/30 text-red-300 hover:bg-red-500/10 transition-colors"
                            >
                                Limpiar todo
                            </button>
                        </div>
                    )}
                </div>
            </section>

            {/* Results */}
            <section className="max-w-7xl mx-auto px-4 py-8">
                {/* Results Count */}
                <div className="flex items-center justify-between mb-6">
                    <p className="text-muted-foreground">
                        Mostrando <span className="text-white font-medium">{filteredKennels.length}</span> de {allKennels.length} establecimientos
                    </p>
                </div>

                {/* Grid */}
                {filteredKennels.length > 0 ? (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredKennels.map((kennel) => (
                            <KennelCard key={kennel.id} kennel={kennel} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-16">
                        <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Search className="w-8 h-8 text-muted-foreground" />
                        </div>
                        <h3 className="text-xl font-semibold text-white mb-2">
                            No se encontraron resultados
                        </h3>
                        <p className="text-muted-foreground mb-6">
                            Intenta con otros filtros o términos de búsqueda
                        </p>
                        <button
                            onClick={clearAllFilters}
                            className="px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl transition-colors"
                        >
                            Limpiar filtros
                        </button>
                    </div>
                )}
            </section>

            {/* Region Summary */}
            <section className="max-w-7xl mx-auto px-4 pb-16">
                <div className="bg-gradient-to-br from-card/50 to-card/50 rounded-3xl p-8 border border-border/50">
                    <h2 className="text-2xl font-bold text-white mb-6 text-center">
                        Distribución por Región
                    </h2>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {Object.entries(stats.byRegion).map(([region, count]) => (
                            <button
                                key={region}
                                onClick={() => setSelectedRegion(region)}
                                className={`flex items-center justify-between p-4 rounded-xl border transition-all ${selectedRegion === region
                                    ? "bg-emerald-500/20 border-emerald-500/30"
                                    : "bg-white/5 border-white/10 hover:bg-white/10"
                                    }`}
                            >
                                <div className="flex items-center gap-3">
                                    <MapPin className={`w-5 h-5 ${selectedRegion === region ? "text-emerald-400" : "text-muted-foreground"}`} />
                                    <span className={selectedRegion === region ? "text-white font-medium" : "text-muted-foreground"}>
                                        {region}
                                    </span>
                                </div>
                                <span className={`text-lg font-bold ${selectedRegion === region ? "text-emerald-400" : "text-white"}`}>
                                    {count}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="max-w-7xl mx-auto px-4 pb-16">
                <div className="bg-gradient-to-r from-amber-500/20 via-emerald-500/20 to-cyan-500/20 rounded-3xl p-8 md:p-12 border border-white/10 text-center">
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                        ¿Conoces alguna guardería que no esté en la lista?
                    </h2>
                    <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                        Ayúdanos a ampliar nuestro catálogo. Si conoces una guardería, hotel o residencia
                        canina de confianza en el norte, cuéntanoslo.
                    </p>
                    <Link
                        href="/comunidad"
                        className="inline-flex items-center gap-2 px-8 py-4 bg-emerald-500 hover:bg-emerald-600 text-white font-medium rounded-xl transition-colors"
                    >
                        <Star className="w-5 h-5" />
                        Sugerir establecimiento
                    </Link>
                </div>
            </section>
        </main>
    );
}

"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
    Search,
    MapPin,
    Phone,
    Mail,
    Globe,
    Heart,
    Calendar,
    Filter,
    ChevronDown,
    ExternalLink,
    Users,
    AlertTriangle,
    Award,
    Clock,
    Facebook,
    Instagram,
    Twitter,
    Youtube,
    X,
} from "lucide-react";
import {
    allOrganizations,
    eventosCaninos,
    getOrganizationStats,
    CanineOrganization,
    CanineEvent,
    OrganizationType,
} from "@/data/canineOrganizations";

// Mapeo de tipos a etiquetas en español
const typeLabels: Record<OrganizationType, string> = {
    protectora: "Protectora",
    adopcion: "Adopción",
    perdidos: "Perros Perdidos",
    eventos: "Eventos",
    comunidad: "Comunidad",
    federacion: "Federación",
};

const typeColors: Record<OrganizationType, string> = {
    protectora: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
    adopcion: "bg-blue-500/20 text-blue-300 border-blue-500/30",
    perdidos: "bg-amber-500/20 text-amber-300 border-amber-500/30",
    eventos: "bg-purple-500/20 text-purple-300 border-purple-500/30",
    comunidad: "bg-pink-500/20 text-pink-300 border-pink-500/30",
    federacion: "bg-indigo-500/20 text-indigo-300 border-indigo-500/30",
};

const regions = [
    "Todas",
    "Euskadi",
    "Navarra",
    "Cantabria",
    "Asturias",
    "Galicia",
    "Iparralde",
    "Nacional",
];

export default function ComunidadPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedRegion, setSelectedRegion] = useState("Todas");
    const [selectedType, setSelectedType] = useState<OrganizationType | "todas">("todas");
    const [showFilters, setShowFilters] = useState(false);
    const [activeTab, setActiveTab] = useState<"organizaciones" | "eventos">("organizaciones");

    const stats = getOrganizationStats();
    const hasActiveFilters =
        searchQuery.trim().length > 0 ||
        selectedRegion !== "Todas" ||
        selectedType !== "todas";

    const clearFilters = () => {
        setSearchQuery("");
        setSelectedRegion("Todas");
        setSelectedType("todas");
    };

    // Filtrar organizaciones
    const filteredOrganizations = useMemo(() => {
        return allOrganizations.filter((org) => {
            const matchesSearch =
                org.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                org.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                org.city?.toLowerCase().includes(searchQuery.toLowerCase());

            const matchesRegion =
                selectedRegion === "Todas" || org.region === selectedRegion;

            const matchesType = selectedType === "todas" || org.type === selectedType;

            return matchesSearch && matchesRegion && matchesType;
        });
    }, [searchQuery, selectedRegion, selectedType]);

    // Filtrar eventos
    const filteredEvents = useMemo(() => {
        return eventosCaninos.filter((evt) => {
            const matchesSearch =
                evt.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                evt.description.toLowerCase().includes(searchQuery.toLowerCase());

            const matchesRegion =
                selectedRegion === "Todas" || evt.region === selectedRegion;

            return matchesSearch && matchesRegion;
        });
    }, [searchQuery, selectedRegion]);

    return (
        <main className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
            {/* Hero Section */}
            <section className="relative overflow-hidden">
                {/* Background gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/30 via-transparent to-amber-900/20" />

                {/* Decorative elements */}
                <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl" />
                <div className="absolute bottom-10 right-10 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl" />

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
                    <div className="text-center">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-6">
                            <Heart className="w-4 h-4 text-emerald-400" />
                            <span className="text-sm text-emerald-300">Comunidad Canina del Arco Atlántico</span>
                        </div>

                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                            Protectoras, Asociaciones
                            <span className="block mt-2 bg-gradient-to-r from-emerald-400 via-cyan-400 to-amber-400 bg-clip-text text-transparent">
                                y Eventos Caninos
                            </span>
                        </h1>

                        <p className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto mb-10">
                            Encuentra refugios, protectoras, plataformas de ayuda para perros perdidos
                            y eventos caninos en toda la región del norte de España y sur de Francia.
                        </p>

                        {/* Stats */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
                            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                                <div className="text-3xl font-bold text-emerald-400">{stats.protectoras}</div>
                                <div className="text-sm text-slate-400">Protectoras</div>
                            </div>
                            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                                <div className="text-3xl font-bold text-amber-400">{stats.plataformasPerdidos}</div>
                                <div className="text-sm text-slate-400">Plat. Perdidos</div>
                            </div>
                            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                                <div className="text-3xl font-bold text-purple-400">{stats.eventos}</div>
                                <div className="text-sm text-slate-400">Eventos</div>
                            </div>
                            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                                <div className="text-3xl font-bold text-cyan-400">{stats.byRegion.Euskadi + stats.byRegion.Iparralde}</div>
                                <div className="text-sm text-slate-400">Euskal Herria</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Search and Filters */}
            <section className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-md border-b border-white/10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    {/* Search Bar */}
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1 relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                            <input
                                type="text"
                                placeholder="Buscar por nombre, ciudad o descripción..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                aria-label="Buscar organizaciones y eventos"
                                className="w-full pl-12 pr-10 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all"
                            />
                            {searchQuery && (
                                <button
                                    type="button"
                                    onClick={() => setSearchQuery("")}
                                    aria-label="Limpiar búsqueda"
                                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            )}
                        </div>

                        <button
                            type="button"
                            onClick={() => setShowFilters(!showFilters)}
                            aria-expanded={showFilters}
                            aria-controls="comunidad-filtros"
                            className="flex items-center justify-center gap-2 px-6 py-3 bg-white/5 border border-white/10 rounded-xl text-white hover:bg-white/10 transition-colors md:w-auto"
                        >
                            <Filter className="w-5 h-5" />
                            <span>Filtros</span>
                            <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? "rotate-180" : ""}`} />
                        </button>
                    </div>

                    {/* Filters Panel */}
                    {showFilters && (
                        <div id="comunidad-filtros" className="mt-4 p-4 bg-white/5 rounded-xl border border-white/10 animate-in slide-in-from-top-2">
                            <div className="grid md:grid-cols-2 gap-4">
                                {/* Region Filter */}
                                <div>
                                    <label className="block text-sm text-slate-400 mb-2">Región</label>
                                    <div className="flex flex-wrap gap-2">
                                        {regions.map((region) => (
                                            <button
                                                key={region}
                                                type="button"
                                                onClick={() => setSelectedRegion(region)}
                                                aria-pressed={selectedRegion === region}
                                                className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${selectedRegion === region
                                                        ? "bg-emerald-500 text-white"
                                                        : "bg-white/5 text-slate-300 hover:bg-white/10"
                                                    }`}
                                            >
                                                {region}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Type Filter */}
                                <div>
                                    <label className="block text-sm text-slate-400 mb-2">Tipo</label>
                                    <div className="flex flex-wrap gap-2">
                                        <button
                                            type="button"
                                            onClick={() => setSelectedType("todas")}
                                            aria-pressed={selectedType === "todas"}
                                            className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${selectedType === "todas"
                                                    ? "bg-emerald-500 text-white"
                                                    : "bg-white/5 text-slate-300 hover:bg-white/10"
                                                }`}
                                        >
                                            Todas
                                        </button>
                                        {Object.entries(typeLabels).map(([type, label]) => (
                                            <button
                                                key={type}
                                                type="button"
                                                onClick={() => setSelectedType(type as OrganizationType)}
                                                aria-pressed={selectedType === type}
                                                className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${selectedType === type
                                                        ? "bg-emerald-500 text-white"
                                                        : "bg-white/5 text-slate-300 hover:bg-white/10"
                                                    }`}
                                            >
                                                {label}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Tabs */}
                    <div className="flex gap-2 mt-4">
                        <button
                            type="button"
                            onClick={() => setActiveTab("organizaciones")}
                            aria-pressed={activeTab === "organizaciones"}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === "organizaciones"
                                    ? "bg-emerald-500 text-white"
                                    : "bg-white/5 text-slate-300 hover:bg-white/10"
                                }`}
                        >
                            <Users className="w-4 h-4" />
                            Organizaciones ({filteredOrganizations.length})
                        </button>
                        <button
                            type="button"
                            onClick={() => setActiveTab("eventos")}
                            aria-pressed={activeTab === "eventos"}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === "eventos"
                                    ? "bg-purple-500 text-white"
                                    : "bg-white/5 text-slate-300 hover:bg-white/10"
                                }`}
                        >
                            <Calendar className="w-4 h-4" />
                            Eventos ({filteredEvents.length})
                        </button>
                    </div>

                    {hasActiveFilters && (
                        <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-slate-400">
                            <span>Filtros activos:</span>
                            {searchQuery && (
                                <span className="px-2 py-1 rounded-full bg-white/5 text-slate-300">
                                    "{searchQuery}"
                                </span>
                            )}
                            {selectedRegion !== "Todas" && (
                                <span className="px-2 py-1 rounded-full bg-white/5 text-slate-300">
                                    Región: {selectedRegion}
                                </span>
                            )}
                            {selectedType !== "todas" && (
                                <span className="px-2 py-1 rounded-full bg-white/5 text-slate-300">
                                    Tipo: {typeLabels[selectedType]}
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
                </div>
            </section>

            {/* Content */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {activeTab === "organizaciones" ? (
                    <OrganizationsGrid organizations={filteredOrganizations} />
                ) : (
                    <EventsGrid events={filteredEvents} />
                )}
            </section>

            {/* Call to Action */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-900/50 to-cyan-900/50 p-8 md:p-12 border border-emerald-500/20">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl" />

                    <div className="relative z-10 max-w-2xl">
                        <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                            ¿Conoces alguna protectora que no aparece?
                        </h2>
                        <p className="text-slate-300 mb-6">
                            Ayúdanos a ampliar este directorio. Si conoces alguna asociación, protectora
                            o evento canino en la región del Arco Atlántico, háznoslo saber.
                        </p>
                        <Link
                            href="/contacto"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-medium rounded-xl transition-colors"
                        >
                            <Mail className="w-5 h-5" />
                            Sugerir una organización
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}

// Organization Card Component
function OrganizationCard({ org }: { org: CanineOrganization }) {
    return (
        <div className="group relative bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden hover:border-emerald-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/10">
            {/* Header */}
            <div className="p-6 pb-4">
                <div className="flex items-start justify-between gap-4 mb-3">
                    <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                            <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${typeColors[org.type]}`}>
                                {typeLabels[org.type]}
                            </span>
                            {org.isVerified && (
                                <span className="flex items-center gap-1 text-xs text-emerald-400">
                                    <Award className="w-3.5 h-3.5" />
                                    Verificado
                                </span>
                            )}
                        </div>
                        <h3 className="text-lg font-semibold text-white group-hover:text-emerald-400 transition-colors line-clamp-2">
                            {org.name}
                        </h3>
                    </div>
                </div>

                {/* Location */}
                {(org.city || org.region) && (
                    <div className="flex items-center gap-2 text-sm text-slate-400 mb-3">
                        <MapPin className="w-4 h-4 text-slate-500" />
                        <span>{org.city ? `${org.city}, ` : ""}{org.region}</span>
                        <span className="text-xs px-1.5 py-0.5 rounded bg-slate-700 text-slate-300">
                            {org.country === "ES" ? "🇪🇸" : "🇫🇷"}
                        </span>
                    </div>
                )}

                {/* Description */}
                <p className="text-sm text-slate-400 line-clamp-2 mb-4">
                    {org.description}
                </p>

                {/* Address */}
                {org.address && (
                    <div className="text-xs text-slate-500 mb-3 flex items-start gap-2">
                        <MapPin className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
                        <span className="line-clamp-2">{org.address}</span>
                    </div>
                )}

                {/* Visiting Hours */}
                {org.visitingHours && (
                    <div className="text-xs text-slate-500 mb-3 flex items-center gap-2">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{org.visitingHours}</span>
                    </div>
                )}

                {/* Stats */}
                {org.animalsCount && (
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-emerald-500/10 rounded-lg text-xs text-emerald-400 mb-3">
                        <Heart className="w-3.5 h-3.5" />
                        ~{org.animalsCount} animales
                    </div>
                )}
            </div>

            {/* Contact Info */}
            <div className="px-6 py-4 bg-white/5 border-t border-white/5">
                <div className="flex flex-wrap items-center gap-3">
                    {org.phone && (
                        <a
                            href={`tel:${org.phone}`}
                            aria-label={`Llamar a ${org.name}`}
                            className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-emerald-400 transition-colors"
                        >
                            <Phone className="w-3.5 h-3.5" />
                            {org.phone}
                        </a>
                    )}
                    {org.email && (
                        <a
                            href={`mailto:${org.email}`}
                            aria-label={`Enviar email a ${org.name}`}
                            className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-emerald-400 transition-colors"
                        >
                            <Mail className="w-3.5 h-3.5" />
                            Email
                        </a>
                    )}
                    {org.website && (
                        <a
                            href={org.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`Visitar web de ${org.name}`}
                            className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-emerald-400 transition-colors"
                        >
                            <Globe className="w-3.5 h-3.5" />
                            Web
                            <ExternalLink className="w-3 h-3" />
                        </a>
                    )}
                </div>

                {/* Social Media */}
                {org.socialMedia && (
                    <div className="flex items-center gap-3 mt-3 pt-3 border-t border-white/5">
                        {org.socialMedia.facebook && (
                            <a
                                href={org.socialMedia.facebook}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={`Facebook de ${org.name}`}
                                className="text-slate-400 hover:text-blue-400 transition-colors"
                            >
                                <Facebook className="w-4 h-4" />
                            </a>
                        )}
                        {org.socialMedia.instagram && (
                            <a
                                href={org.socialMedia.instagram}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={`Instagram de ${org.name}`}
                                className="text-slate-400 hover:text-pink-400 transition-colors"
                            >
                                <Instagram className="w-4 h-4" />
                            </a>
                        )}
                        {org.socialMedia.twitter && (
                            <a
                                href={org.socialMedia.twitter}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={`Twitter de ${org.name}`}
                                className="text-slate-400 hover:text-sky-400 transition-colors"
                            >
                                <Twitter className="w-4 h-4" />
                            </a>
                        )}
                        {org.socialMedia.youtube && (
                            <a
                                href={org.socialMedia.youtube}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={`YouTube de ${org.name}`}
                                className="text-slate-400 hover:text-red-400 transition-colors"
                            >
                                <Youtube className="w-4 h-4" />
                            </a>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

// Organizations Grid
function OrganizationsGrid({ organizations }: { organizations: CanineOrganization[] }) {
    if (organizations.length === 0) {
        return (
            <div className="text-center py-16">
                <AlertTriangle className="w-12 h-12 text-slate-500 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-white mb-2">No se encontraron resultados</h3>
                <p className="text-slate-400">Prueba con otros filtros o términos de búsqueda</p>
            </div>
        );
    }

    return (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {organizations.map((org) => (
                <OrganizationCard key={org.id} org={org} />
            ))}
        </div>
    );
}

// Event Card Component
function EventCard({ event }: { event: CanineEvent }) {
    const eventTypeColors: Record<string, string> = {
        canicross: "bg-orange-500/20 text-orange-300 border-orange-500/30",
        exposicion: "bg-indigo-500/20 text-indigo-300 border-indigo-500/30",
        quedada: "bg-pink-500/20 text-pink-300 border-pink-500/30",
        senderismo: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
        formacion: "bg-cyan-500/20 text-cyan-300 border-cyan-500/30",
        adopcion: "bg-red-500/20 text-red-300 border-red-500/30",
        festival: "bg-purple-500/20 text-purple-300 border-purple-500/30",
    };

    const eventTypeLabels: Record<string, string> = {
        canicross: "Canicross",
        exposicion: "Exposición",
        quedada: "Quedada",
        senderismo: "Senderismo",
        formacion: "Formación",
        adopcion: "Adopción",
        festival: "Festival",
    };

    const formatDate = (dateStr: string) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString("es-ES", {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric",
        });
    };

    return (
        <div className="group bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden hover:border-purple-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10">
            <div className="p-6">
                <div className="flex items-start justify-between gap-4 mb-3">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${eventTypeColors[event.type]}`}>
                        {eventTypeLabels[event.type]}
                    </span>
                    {event.isFree && (
                        <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                            Gratis
                        </span>
                    )}
                </div>

                <h3 className="text-lg font-semibold text-white group-hover:text-purple-400 transition-colors mb-2">
                    {event.name}
                </h3>

                {/* Date */}
                {event.date && (
                    <div className="flex items-center gap-2 text-sm text-slate-400 mb-2">
                        <Calendar className="w-4 h-4 text-purple-400" />
                        <span className="capitalize">{formatDate(event.date)}</span>
                    </div>
                )}

                {/* Recurring Schedule */}
                {event.recurringSchedule && (
                    <div className="flex items-center gap-2 text-sm text-slate-400 mb-2">
                        <Clock className="w-4 h-4 text-purple-400" />
                        <span>{event.recurringSchedule}</span>
                    </div>
                )}

                {/* Location */}
                {(event.city || event.region) && (
                    <div className="flex items-center gap-2 text-sm text-slate-400 mb-3">
                        <MapPin className="w-4 h-4 text-slate-500" />
                        <span>{event.city ? `${event.city}, ` : ""}{event.region}</span>
                        <span className="text-xs px-1.5 py-0.5 rounded bg-slate-700 text-slate-300">
                            {event.country === "ES" ? "🇪🇸" : "🇫🇷"}
                        </span>
                    </div>
                )}

                <p className="text-sm text-slate-400 line-clamp-2 mb-4">
                    {event.description}
                </p>

                {/* Links */}
                <div className="flex flex-wrap items-center gap-3">
                    {event.website && (
                        <a
                            href={event.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1.5 text-xs text-purple-400 hover:text-purple-300 transition-colors"
                        >
                            <Globe className="w-3.5 h-3.5" />
                            Más información
                            <ExternalLink className="w-3 h-3" />
                        </a>
                    )}
                    {event.registrationUrl && (
                        <a
                            href={event.registrationUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1.5 px-3 py-1.5 bg-purple-500 hover:bg-purple-600 rounded-lg text-xs text-white transition-colors"
                        >
                            Inscribirse
                            <ExternalLink className="w-3 h-3" />
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
}

// Events Grid
function EventsGrid({ events }: { events: CanineEvent[] }) {
    if (events.length === 0) {
        return (
            <div className="text-center py-16">
                <Calendar className="w-12 h-12 text-slate-500 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-white mb-2">No se encontraron eventos</h3>
                <p className="text-slate-400">Prueba con otros filtros o términos de búsqueda</p>
            </div>
        );
    }

    return (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
                <EventCard key={event.id} event={event} />
            ))}
        </div>
    );
}

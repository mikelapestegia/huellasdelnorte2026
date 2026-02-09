"use client";

import { useState, useMemo } from "react";
import { Search, MapIcon, List } from "lucide-react";
import { routesCatalog, RouteCatalogItem, Region, RouteType, Difficulty, Environment } from "@/data/routesCatalog";
import RouteFilters, { RouteFiltersState } from "@/components/routes/RouteFilters";
import RouteCard from "@/components/routes/RouteCard";
import RouteMap from "@/components/routes/RouteMap";

export default function RutasPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [viewMode, setViewMode] = useState<"grid" | "map">("grid");
    const [selectedRouteId, setSelectedRouteId] = useState<string | undefined>();
    const [filters, setFilters] = useState<RouteFiltersState>({
        regions: [],
        routeTypes: [],
        difficulties: [],
        environments: [],
        bathingOnly: false,
        distanceRange: [0, 100],
    });

    const filteredRoutes = useMemo(() => {
        return routesCatalog.filter(route => {
            // Search query
            if (searchQuery) {
                const query = searchQuery.toLowerCase();
                const matchesSearch =
                    route.name.toLowerCase().includes(query) ||
                    route.region.toLowerCase().includes(query) ||
                    route.highlight.toLowerCase().includes(query);
                if (!matchesSearch) return false;
            }

            // Region filter
            if (filters.regions.length > 0 && !filters.regions.includes(route.region as Region)) {
                return false;
            }

            // Route type filter
            if (filters.routeTypes.length > 0 && !filters.routeTypes.includes(route.routeType)) {
                return false;
            }

            // Difficulty filter
            if (filters.difficulties.length > 0 && !filters.difficulties.includes(route.difficulty)) {
                return false;
            }

            // Environment filter
            if (filters.environments.length > 0) {
                const hasEnv = filters.environments.some(env => route.environment.includes(env));
                if (!hasEnv) return false;
            }

            // Bathing filter
            if (filters.bathingOnly && !route.bathingAllowed) {
                return false;
            }

            // Distance filter
            const distance = route.distanceKmMin ?? 0;
            if (distance < filters.distanceRange[0] || distance > filters.distanceRange[1]) {
                return false;
            }

            return true;
        });
    }, [searchQuery, filters]);

    const handleRouteSelect = (route: RouteCatalogItem) => {
        setSelectedRouteId(route.id);
        if (viewMode === "grid") {
            setViewMode("map");
        }
    };

    return (
        <main className="min-h-screen bg-background">
            {/* Hero header */}
            <div className="relative bg-gradient-to-br from-primary to-primary/80 text-white py-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">
                        Rutas del Arco Atlántico
                    </h1>
                    <p className="text-white/90 text-lg max-w-2xl mb-8">
                        Más de 50 rutas pet-friendly desde Iparralde hasta Galicia. Filtra por región,
                        dificultad, entorno y descubre senderos con agua, sombra y baño para tu perro.
                    </p>

                    {/* Search bar */}
                    <div className="relative max-w-xl">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-foreground/50" />
                        <input
                            type="text"
                            placeholder="Buscar por nombre, región o características..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-12 pr-4 py-4 rounded-xl bg-white text-foreground placeholder:text-foreground/50 focus:outline-none focus:ring-2 focus:ring-accent shadow-lg"
                        />
                    </div>
                </div>

                {/* Decorative wave */}
                <div className="absolute bottom-0 left-0 right-0">
                    <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
                        <path d="M0 60L60 55C120 50 240 40 360 35C480 30 600 30 720 32.5C840 35 960 40 1080 42.5C1200 45 1320 45 1380 45L1440 45V60H1380C1320 60 1200 60 1080 60C960 60 840 60 720 60C600 60 480 60 360 60C240 60 120 60 60 60H0Z" fill="var(--background)" />
                    </svg>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* View toggle */}
                <div className="flex items-center justify-end gap-2 mb-6">
                    <button
                        type="button"
                        onClick={() => setViewMode("grid")}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${viewMode === "grid"
                                ? "bg-primary text-white"
                                : "bg-secondary/50 text-foreground/70 hover:bg-secondary"
                            }`}
                    >
                        <List className="h-4 w-4" />
                        Lista
                    </button>
                    <button
                        type="button"
                        onClick={() => setViewMode("map")}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${viewMode === "map"
                                ? "bg-primary text-white"
                                : "bg-secondary/50 text-foreground/70 hover:bg-secondary"
                            }`}
                    >
                        <MapIcon className="h-4 w-4" />
                        Mapa
                    </button>
                </div>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Filters sidebar */}
                    <RouteFilters
                        filters={filters}
                        onChange={setFilters}
                        resultCount={filteredRoutes.length}
                    />

                    {/* Main content */}
                    <div className="flex-1">
                        {viewMode === "grid" ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                                {filteredRoutes.map(route => (
                                    <RouteCard
                                        key={route.id}
                                        route={route}
                                        onClick={() => handleRouteSelect(route)}
                                    />
                                ))}
                                {filteredRoutes.length === 0 && (
                                    <div className="col-span-full text-center py-16">
                                        <p className="text-foreground/60 text-lg">
                                            No se encontraron rutas con los filtros seleccionados.
                                        </p>
                                        <button
                                            type="button"
                                            onClick={() => setFilters({
                                                regions: [],
                                                routeTypes: [],
                                                difficulties: [],
                                                environments: [],
                                                bathingOnly: false,
                                                distanceRange: [0, 100],
                                            })}
                                            className="mt-4 text-primary font-medium hover:underline"
                                        >
                                            Limpiar filtros
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="h-[600px] lg:h-[700px]">
                                <RouteMap
                                    routes={filteredRoutes}
                                    selectedRouteId={selectedRouteId}
                                    onRouteSelect={handleRouteSelect}
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
}

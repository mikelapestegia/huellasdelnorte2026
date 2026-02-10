"use client";

import { useState, useMemo } from "react";
import { useTranslations } from "next-intl";
import { Search, MapIcon, List, Mountain } from "lucide-react";
import { routesCatalog, RouteCatalogItem, Region, RouteType, Difficulty, Environment } from "@/data/routesCatalog";
import { dogBeaches } from "@/data/dogBeaches";
import RouteFilters, { RouteFiltersState } from "@/components/routes/RouteFilters";
import RouteCard from "@/components/routes/RouteCard";
import RouteMap from "@/components/routes/RouteMap";

export default function RutasPage() {
    const t = useTranslations("routes");
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

    const filteredBeaches = useMemo(() => {
        return dogBeaches.filter(beach => {
            // Search query
            if (searchQuery) {
                const query = searchQuery.toLowerCase();
                const matchesSearch =
                    beach.name.toLowerCase().includes(query) ||
                    beach.location.toLowerCase().includes(query) ||
                    beach.region.toLowerCase().includes(query);
                if (!matchesSearch) return false;
            }

            // Region filter
            if (filters.regions.length > 0 && !filters.regions.includes(beach.region as unknown as Region)) {
                return false;
            }

            return true;
        });
    }, [searchQuery, filters.regions]);

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
            <div className="relative bg-primary text-primary-foreground pt-32 pb-24 px-6 overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 z-0 opacity-10">
                    <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                        <path d="M0 100 C 20 0 50 0 100 100 Z" fill="currentColor" />
                    </svg>
                </div>

                <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-transparent z-0 pointer-events-none" />

                <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold uppercase tracking-wider animate-in fade-in slide-in-from-bottom-4 duration-700">
                        <Mountain className="h-3.5 w-3.5" />
                        Huellas del Norte
                    </div>

                    <h1 className="font-serif text-4xl md:text-6xl font-bold leading-tight animate-in fade-in slide-in-from-bottom-5 duration-700 delay-100">
                        {t("title")}
                    </h1>

                    <p className="text-lg md:text-xl text-primary-foreground/90 max-w-2xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-6 duration-700 delay-200">
                        {t("description")}
                    </p>

                    {/* Search bar */}
                    <div className="max-w-xl mx-auto pt-6 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300">
                        <div className="relative group">
                            <div className="absolute -inset-1 bg-gradient-to-r from-accent to-primary rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-200"></div>
                            <div className="relative flex items-center bg-card text-card-foreground rounded-xl shadow-xl overflow-hidden">
                                <Search className="absolute left-4 h-5 w-5 text-muted-foreground" />
                                <input
                                    type="text"
                                    placeholder={t("search_placeholder")}
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-12 pr-4 py-4 bg-transparent border-none focus:outline-none focus:ring-0 placeholder:text-muted-foreground/70"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Decorative wave bottom */}
                <div className="absolute bottom-0 left-0 right-0 z-10 translate-y-1">
                    <svg viewBox="0 0 1440 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto text-background fill-current">
                        <path d="M0 64L48 58.7C96 53 192 43 288 42.7C384 43 480 53 576 58.7C672 64 768 64 864 58.7C960 53 1056 43 1152 37.3C1248 32 1344 32 1392 32L1440 32V64H1392C1344 64 1248 64 1152 64C1056 64 960 64 864 64C768 64 672 64 576 64C480 64 384 64 288 64C192 64 96 64 48 64H0Z" />
                    </svg>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* View toggle */}
                <div className="flex items-center justify-between mb-8">
                    <div className="text-sm text-muted-foreground font-medium hidden md:block">
                        {/* Space for breadcrumbs or extra info */}
                    </div>

                    <div className="flex items-center bg-secondary/50 p-1 rounded-xl">
                        <button
                            type="button"
                            onClick={() => setViewMode("grid")}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${viewMode === "grid"
                                ? "bg-background text-foreground shadow-sm"
                                : "text-muted-foreground hover:text-foreground hover:bg-background/50"
                                }`}
                        >
                            <List className="h-4 w-4" />
                            {t("view_list")}
                        </button>
                        <button
                            type="button"
                            onClick={() => setViewMode("map")}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${viewMode === "map"
                                ? "bg-background text-foreground shadow-sm"
                                : "text-muted-foreground hover:text-foreground hover:bg-background/50"
                                }`}
                        >
                            <MapIcon className="h-4 w-4" />
                            {t("view_map")}
                        </button>
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row gap-8 items-start">
                    {/* Filters sidebar */}
                    <div className="w-full lg:w-80 flex-shrink-0 sticky top-24 z-20">
                        <RouteFilters
                            filters={filters}
                            onChange={setFilters}
                            resultCount={filteredRoutes.length}
                        />
                    </div>

                    {/* Main content */}
                    <div className="flex-1 w-full">
                        {viewMode === "grid" ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                {filteredRoutes.map((route, index) => (
                                    <div key={route.id} className="h-full" style={{ animationDelay: `${index * 50}ms` }}>
                                        <RouteCard
                                            route={route}
                                            onClick={() => handleRouteSelect(route)}
                                        />
                                    </div>
                                ))}
                                {filteredRoutes.length === 0 && (
                                    <div className="col-span-full flex flex-col items-center justify-center py-20 bg-card rounded-3xl border border-dashed border-border">
                                        <div className="h-20 w-20 rounded-full bg-secondary/50 flex items-center justify-center mb-4">
                                            <Search className="h-10 w-10 text-muted-foreground/50" />
                                        </div>
                                        <h3 className="text-xl font-bold text-foreground mb-2">{t("no_results")}</h3>
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
                                            className="mt-2 px-6 py-2 rounded-full bg-primary/10 text-primary font-semibold hover:bg-primary/20 transition-colors"
                                        >
                                            {t("clear_filters")}
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="h-[600px] lg:h-[700px] rounded-3xl overflow-hidden border border-border shadow-xl animate-in fade-in zoom-in-95 duration-500">
                                {/* Nota: RouteMap también necesitaría i18n, pero es mapbox o similar */}
                                <RouteMap
                                    routes={filteredRoutes}
                                    beaches={filteredBeaches}
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

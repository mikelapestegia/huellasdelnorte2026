"use client";

import { useState } from "react";
import { Filter, X, ChevronDown, ChevronUp } from "lucide-react";
import { regions, RouteType, Difficulty, Environment, Region } from "@/data/routesCatalog";

export interface RouteFiltersState {
    regions: Region[];
    routeTypes: RouteType[];
    difficulties: Difficulty[];
    environments: Environment[];
    bathingOnly: boolean;
    distanceRange: [number, number];
}

interface RouteFiltersProps {
    filters: RouteFiltersState;
    onChange: (filters: RouteFiltersState) => void;
    resultCount: number;
}

const routeTypeOptions: { value: RouteType; label: string; emoji: string }[] = [
    { value: "Andando", label: "A pie", emoji: "🚶" },
    { value: "Bici", label: "Bicicleta", emoji: "🚴" },
    { value: "Mixto", label: "Mixto", emoji: "🚶🚴" },
];

const difficultyOptions: { value: Difficulty; label: string; color: string }[] = [
    { value: "easy", label: "Fácil", color: "bg-green-100 text-green-800 border-green-200" },
    { value: "moderate", label: "Moderada", color: "bg-amber-100 text-amber-800 border-amber-200" },
    { value: "hard", label: "Difícil", color: "bg-red-100 text-red-800 border-red-200" },
];

const environmentOptions: Environment[] = ["río", "sombra", "costa", "montaña", "bosque", "cascada", "valle"];

export default function RouteFilters({ filters, onChange, resultCount }: RouteFiltersProps) {
    const [openSections, setOpenSections] = useState({
        region: true,
        type: true,
        difficulty: true,
        environment: false,
        distance: false,
    });

    const toggleSection = (section: keyof typeof openSections) => {
        setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
    };

    const toggleRegion = (region: Region) => {
        const newRegions = filters.regions.includes(region)
            ? filters.regions.filter(r => r !== region)
            : [...filters.regions, region];
        onChange({ ...filters, regions: newRegions });
    };

    const toggleRouteType = (type: RouteType) => {
        const newTypes = filters.routeTypes.includes(type)
            ? filters.routeTypes.filter(t => t !== type)
            : [...filters.routeTypes, type];
        onChange({ ...filters, routeTypes: newTypes });
    };

    const toggleDifficulty = (difficulty: Difficulty) => {
        const newDiff = filters.difficulties.includes(difficulty)
            ? filters.difficulties.filter(d => d !== difficulty)
            : [...filters.difficulties, difficulty];
        onChange({ ...filters, difficulties: newDiff });
    };

    const toggleEnvironment = (env: Environment) => {
        const newEnv = filters.environments.includes(env)
            ? filters.environments.filter(e => e !== env)
            : [...filters.environments, env];
        onChange({ ...filters, environments: newEnv });
    };

    const clearAllFilters = () => {
        onChange({
            regions: [],
            routeTypes: [],
            difficulties: [],
            environments: [],
            bathingOnly: false,
            distanceRange: [0, 100],
        });
    };

    const activeFilterCount =
        filters.regions.length +
        filters.routeTypes.length +
        filters.difficulties.length +
        filters.environments.length +
        (filters.bathingOnly ? 1 : 0);

    return (
        <aside className="w-full lg:w-80 space-y-4">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Filter className="h-5 w-5 text-primary" />
                    <h2 className="font-serif text-xl font-bold text-foreground">Filtros</h2>
                    {activeFilterCount > 0 && (
                        <span className="px-2 py-0.5 rounded-full bg-primary text-white text-xs font-medium">
                            {activeFilterCount}
                        </span>
                    )}
                </div>
                {activeFilterCount > 0 && (
                    <button
                        type="button"
                        onClick={clearAllFilters}
                        className="text-sm text-foreground/60 hover:text-primary transition-colors flex items-center gap-1"
                    >
                        <X className="h-4 w-4" />
                        Limpiar
                    </button>
                )}
            </div>

            {/* Result count */}
            <p className="text-sm text-foreground/60">
                {resultCount} {resultCount === 1 ? "ruta encontrada" : "rutas encontradas"}
            </p>

            {/* Bathing toggle */}
            <button
                type="button"
                onClick={() => onChange({ ...filters, bathingOnly: !filters.bathingOnly })}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl border transition-colors ${filters.bathingOnly
                        ? "border-blue-500 bg-blue-50 text-blue-700"
                        : "border-border bg-white hover:bg-secondary/30"
                    }`}
            >
                <span className="font-medium">💧 Solo con baño</span>
                <div className={`h-5 w-9 rounded-full transition-colors ${filters.bathingOnly ? "bg-blue-500" : "bg-border"
                    } relative`}>
                    <div className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-transform ${filters.bathingOnly ? "translate-x-4" : "translate-x-0.5"
                        }`} />
                </div>
            </button>

            {/* Region section */}
            <div className="rounded-xl border border-border bg-white overflow-hidden">
                <button
                    type="button"
                    onClick={() => toggleSection("region")}
                    className="w-full flex items-center justify-between px-4 py-3 hover:bg-secondary/20 transition-colors"
                >
                    <span className="font-semibold text-foreground">Región</span>
                    {openSections.region ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                </button>
                {openSections.region && (
                    <div className="px-4 pb-4 flex flex-wrap gap-2">
                        {regions.map(region => (
                            <button
                                key={region}
                                type="button"
                                onClick={() => toggleRegion(region)}
                                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${filters.regions.includes(region)
                                        ? "bg-primary text-white"
                                        : "bg-secondary/50 text-foreground/70 hover:bg-secondary"
                                    }`}
                            >
                                {region}
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {/* Route type section */}
            <div className="rounded-xl border border-border bg-white overflow-hidden">
                <button
                    type="button"
                    onClick={() => toggleSection("type")}
                    className="w-full flex items-center justify-between px-4 py-3 hover:bg-secondary/20 transition-colors"
                >
                    <span className="font-semibold text-foreground">Tipo de ruta</span>
                    {openSections.type ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                </button>
                {openSections.type && (
                    <div className="px-4 pb-4 flex flex-wrap gap-2">
                        {routeTypeOptions.map(opt => (
                            <button
                                key={opt.value}
                                type="button"
                                onClick={() => toggleRouteType(opt.value)}
                                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors flex items-center gap-1.5 ${filters.routeTypes.includes(opt.value)
                                        ? "bg-primary text-white"
                                        : "bg-secondary/50 text-foreground/70 hover:bg-secondary"
                                    }`}
                            >
                                <span>{opt.emoji}</span>
                                {opt.label}
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {/* Difficulty section */}
            <div className="rounded-xl border border-border bg-white overflow-hidden">
                <button
                    type="button"
                    onClick={() => toggleSection("difficulty")}
                    className="w-full flex items-center justify-between px-4 py-3 hover:bg-secondary/20 transition-colors"
                >
                    <span className="font-semibold text-foreground">Dificultad</span>
                    {openSections.difficulty ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                </button>
                {openSections.difficulty && (
                    <div className="px-4 pb-4 flex flex-wrap gap-2">
                        {difficultyOptions.map(opt => (
                            <button
                                key={opt.value}
                                type="button"
                                onClick={() => toggleDifficulty(opt.value)}
                                className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-colors ${filters.difficulties.includes(opt.value)
                                        ? `${opt.color} border-current`
                                        : "bg-secondary/50 text-foreground/70 border-transparent hover:bg-secondary"
                                    }`}
                            >
                                {opt.label}
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {/* Environment section */}
            <div className="rounded-xl border border-border bg-white overflow-hidden">
                <button
                    type="button"
                    onClick={() => toggleSection("environment")}
                    className="w-full flex items-center justify-between px-4 py-3 hover:bg-secondary/20 transition-colors"
                >
                    <span className="font-semibold text-foreground">Entorno</span>
                    {openSections.environment ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                </button>
                {openSections.environment && (
                    <div className="px-4 pb-4 flex flex-wrap gap-2">
                        {environmentOptions.map(env => (
                            <button
                                key={env}
                                type="button"
                                onClick={() => toggleEnvironment(env)}
                                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors capitalize ${filters.environments.includes(env)
                                        ? "bg-accent text-white"
                                        : "bg-secondary/50 text-foreground/70 hover:bg-secondary"
                                    }`}
                            >
                                {env}
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {/* Distance slider section */}
            <div className="rounded-xl border border-border bg-white overflow-hidden">
                <button
                    type="button"
                    onClick={() => toggleSection("distance")}
                    className="w-full flex items-center justify-between px-4 py-3 hover:bg-secondary/20 transition-colors"
                >
                    <span className="font-semibold text-foreground">Distancia</span>
                    {openSections.distance ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                </button>
                {openSections.distance && (
                    <div className="px-4 pb-4 space-y-3">
                        <div className="flex justify-between text-sm text-foreground/60">
                            <span>{filters.distanceRange[0]} km</span>
                            <span>{filters.distanceRange[1]} km</span>
                        </div>
                        <input
                            type="range"
                            min={0}
                            max={100}
                            value={filters.distanceRange[1]}
                            onChange={(e) => onChange({
                                ...filters,
                                distanceRange: [filters.distanceRange[0], parseInt(e.target.value)]
                            })}
                            className="w-full accent-primary"
                        />
                    </div>
                )}
            </div>
        </aside>
    );
}

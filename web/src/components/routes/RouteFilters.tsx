"use client";

import { useState } from "react";
import { Filter, X, ChevronDown, ChevronUp } from "lucide-react";
import { regions, RouteType, Difficulty, Environment, Region } from "@/data/routesCatalog";
import { useTranslations } from "next-intl";

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

const routeTypeOptions: { value: RouteType; emoji: string }[] = [
    { value: "Andando", emoji: "🚶" },
    { value: "Bici", emoji: "🚴" },
    { value: "Mixto", emoji: "🚶🚴" },
];

const difficultyOptions: { value: Difficulty; color: string }[] = [
    { value: "easy", color: "bg-green-100 text-green-800 border-green-200" },
    { value: "moderate", color: "bg-amber-100 text-amber-800 border-amber-200" },
    { value: "hard", color: "bg-red-100 text-red-800 border-red-200" },
];

const environmentOptions: Environment[] = ["río", "sombra", "costa", "montaña", "bosque", "cascada", "valle"];

export default function RouteFilters({ filters, onChange, resultCount }: RouteFiltersProps) {
    const t = useTranslations("routes");
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
                    <h2 className="font-serif text-xl font-bold text-foreground">{t("filters.title")}</h2>
                    {activeFilterCount > 0 && (
                        <span className="px-2 py-0.5 rounded-full bg-primary text-white text-xs font-medium animate-in zoom-in-50">
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
                        {t("filters.clear")}
                    </button>
                )}
            </div>

            {/* Result count */}
            <p className="text-sm text-foreground/60">
                {resultCount === 1
                    ? t("filters.results_one")
                    : t("filters.results_other", { count: resultCount })}
            </p>

            {/* Bathing toggle */}
            <button
                type="button"
                onClick={() => onChange({ ...filters, bathingOnly: !filters.bathingOnly })}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl border transition-all duration-300 ${filters.bathingOnly
                    ? "border-blue-500 bg-blue-50 text-blue-700 shadow-sm"
                    : "border-border bg-card/60 hover:bg-card hover:border-border/80"
                    }`}
            >
                <span className="font-medium flex items-center gap-2">
                    {t("filters.bathing_only")}
                </span>
                <div className={`h-6 w-10 rounded-full transition-colors ${filters.bathingOnly ? "bg-blue-500" : "bg-input"
                    } relative`}>
                    <div className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow-sm transition-transform duration-200 ${filters.bathingOnly ? "translate-x-5" : "translate-x-1"
                        }`} />
                </div>
            </button>

            {/* Region section */}
            <div className="rounded-xl border border-border bg-card overflow-hidden">
                <button
                    type="button"
                    onClick={() => toggleSection("region")}
                    className="w-full flex items-center justify-between px-4 py-3 hover:bg-secondary/20 transition-colors"
                >
                    <span className="font-semibold text-foreground">{t("filters.region")}</span>
                    {openSections.region ? <ChevronUp className="h-5 w-5 opacity-50" /> : <ChevronDown className="h-5 w-5 opacity-50" />}
                </button>
                {openSections.region && (
                    <div className="px-4 pb-4 flex flex-wrap gap-2 animate-in slide-in-from-top-2 duration-200">
                        {regions.map(region => (
                            <button
                                key={region}
                                type="button"
                                onClick={() => toggleRegion(region)}
                                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${filters.regions.includes(region)
                                    ? "bg-primary text-white shadow-sm"
                                    : "bg-secondary/50 text-foreground/70 hover:bg-secondary hover:text-foreground"
                                    }`}
                            >
                                {region}
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {/* Route type section */}
            <div className="rounded-xl border border-border bg-card overflow-hidden">
                <button
                    type="button"
                    onClick={() => toggleSection("type")}
                    className="w-full flex items-center justify-between px-4 py-3 hover:bg-secondary/20 transition-colors"
                >
                    <span className="font-semibold text-foreground">{t("filters.type")}</span>
                    {openSections.type ? <ChevronUp className="h-5 w-5 opacity-50" /> : <ChevronDown className="h-5 w-5 opacity-50" />}
                </button>
                {openSections.type && (
                    <div className="px-4 pb-4 flex flex-wrap gap-2 animate-in slide-in-from-top-2 duration-200">
                        {routeTypeOptions.map(opt => (
                            <button
                                key={opt.value}
                                type="button"
                                onClick={() => toggleRouteType(opt.value)}
                                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all flex items-center gap-1.5 ${filters.routeTypes.includes(opt.value)
                                    ? "bg-primary text-white shadow-sm"
                                    : "bg-secondary/50 text-foreground/70 hover:bg-secondary hover:text-foreground"
                                    }`}
                            >
                                <span>{opt.emoji}</span>
                                {t(`route_type.${opt.value}`)}
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {/* Difficulty section */}
            <div className="rounded-xl border border-border bg-card overflow-hidden">
                <button
                    type="button"
                    onClick={() => toggleSection("difficulty")}
                    className="w-full flex items-center justify-between px-4 py-3 hover:bg-secondary/20 transition-colors"
                >
                    <span className="font-semibold text-foreground">{t("filters.difficulty")}</span>
                    {openSections.difficulty ? <ChevronUp className="h-5 w-5 opacity-50" /> : <ChevronDown className="h-5 w-5 opacity-50" />}
                </button>
                {openSections.difficulty && (
                    <div className="px-4 pb-4 flex flex-wrap gap-2 animate-in slide-in-from-top-2 duration-200">
                        {difficultyOptions.map(opt => (
                            <button
                                key={opt.value}
                                type="button"
                                onClick={() => toggleDifficulty(opt.value)}
                                className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-all ${filters.difficulties.includes(opt.value)
                                    ? `${opt.color} border-current shadow-sm`
                                    : "bg-secondary/50 text-foreground/70 border-transparent hover:bg-secondary hover:text-foreground"
                                    }`}
                            >
                                {t(`difficulty.${opt.value}`)}
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {/* Environment section */}
            <div className="rounded-xl border border-border bg-card overflow-hidden">
                <button
                    type="button"
                    onClick={() => toggleSection("environment")}
                    className="w-full flex items-center justify-between px-4 py-3 hover:bg-secondary/20 transition-colors"
                >
                    <span className="font-semibold text-foreground">{t("filters.environment")}</span>
                    {openSections.environment ? <ChevronUp className="h-5 w-5 opacity-50" /> : <ChevronDown className="h-5 w-5 opacity-50" />}
                </button>
                {openSections.environment && (
                    <div className="px-4 pb-4 flex flex-wrap gap-2 animate-in slide-in-from-top-2 duration-200">
                        {environmentOptions.map(env => (
                            <button
                                key={env}
                                type="button"
                                onClick={() => toggleEnvironment(env)}
                                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all capitalize ${filters.environments.includes(env)
                                    ? "bg-accent text-white shadow-sm"
                                    : "bg-secondary/50 text-foreground/70 hover:bg-secondary hover:text-foreground"
                                    }`}
                            >
                                {t(`environment.${env}`)}
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {/* Distance slider section */}
            <div className="rounded-xl border border-border bg-card overflow-hidden">
                <button
                    type="button"
                    onClick={() => toggleSection("distance")}
                    className="w-full flex items-center justify-between px-4 py-3 hover:bg-secondary/20 transition-colors"
                >
                    <span className="font-semibold text-foreground">{t("filters.distance")}</span>
                    {openSections.distance ? <ChevronUp className="h-5 w-5 opacity-50" /> : <ChevronDown className="h-5 w-5 opacity-50" />}
                </button>
                {openSections.distance && (
                    <div className="px-4 pb-4 space-y-3 animate-in slide-in-from-top-2 duration-200">
                        <div className="flex justify-between text-sm text-foreground/60 font-medium">
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
                            className="w-full accent-primary h-2 bg-secondary rounded-lg appearance-none cursor-pointer"
                        />
                    </div>
                )}
            </div>
        </aside>
    );
}

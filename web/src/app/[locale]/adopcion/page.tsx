"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
    Heart,
    Search,
    MapPin,
    Phone,
    Mail,
    Globe,
    Filter,
    X,
    ChevronDown,
    Dog,
    AlertTriangle,
    Star,
    Check,
    Syringe,
    Scissors,
    Cpu,
    Baby,
    Cat,
    Users,
    Calendar,
    ExternalLink,
    Sparkles,
    Clock,
    Scale,
    Info,
} from "lucide-react";

import {
    adoptionDogs,
    getAdoptionStats,
    type AdoptionDog,
    type DogSize,
    type DogGender,
    type DogAge,
} from "@/data/adoptionDogs";

const sizeConfig: Record<DogSize, { label: string; description: string }> = {
    pequeño: { label: "Pequeño", description: "< 10kg" },
    mediano: { label: "Mediano", description: "10-25kg" },
    grande: { label: "Grande", description: "25-40kg" },
    muy_grande: { label: "Muy Grande", description: "> 40kg" },
};

const ageConfig: Record<DogAge, { label: string; color: string }> = {
    cachorro: { label: "Cachorro", color: "bg-pink-500/20 text-pink-300 border-pink-500/30" },
    joven: { label: "Joven", color: "bg-blue-500/20 text-blue-300 border-blue-500/30" },
    adulto: { label: "Adulto", color: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30" },
    senior: { label: "Senior", color: "bg-amber-500/20 text-amber-300 border-amber-500/30" },
};

const genderConfig: Record<DogGender, { label: string; icon: string }> = {
    macho: { label: "Macho", icon: "♂" },
    hembra: { label: "Hembra", icon: "♀" },
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

const sizes = [
    { id: "all", label: "Todos los tamaños" },
    { id: "pequeño", label: "Pequeño" },
    { id: "mediano", label: "Mediano" },
    { id: "grande", label: "Grande" },
    { id: "muy_grande", label: "Muy grande" },
];

const ages = [
    { id: "all", label: "Todas las edades" },
    { id: "cachorro", label: "Cachorros" },
    { id: "joven", label: "Jóvenes" },
    { id: "adulto", label: "Adultos" },
    { id: "senior", label: "Seniors" },
];

// Placeholder image component
function DogPlaceholder({ name, gender }: { name: string; gender: DogGender }) {
    const colors = gender === "macho"
        ? "from-blue-500/30 to-cyan-500/30"
        : "from-pink-500/30 to-rose-500/30";

    return (
        <div className={`w-full h-full bg-gradient-to-br ${colors} flex items-center justify-center`}>
            <div className="text-center">
                <Dog className="w-16 h-16 text-white/40 mx-auto mb-2" />
                <span className="text-white/60 text-lg font-medium">{name}</span>
            </div>
        </div>
    );
}

function DogCard({ dog }: { dog: AdoptionDog }) {
    const [showDetails, setShowDetails] = useState(false);

    const ageDisplay = dog.ageYears
        ? `${dog.ageYears} ${dog.ageYears === 1 ? 'año' : 'años'}${dog.ageMonths ? ` y ${dog.ageMonths} meses` : ''}`
        : `${dog.ageMonths} meses`;

    return (
        <div className="group relative bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden hover:border-emerald-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/10 flex flex-col h-full">
            {/* Image */}
            <Link href={`/adopcion/${dog.id}`} className="relative h-56 overflow-hidden block cursor-pointer">
                <DogPlaceholder name={dog.name} gender={dog.gender} />

                {/* Badges */}
                <div className="absolute top-3 left-3 flex flex-wrap gap-2">
                    {dog.isUrgent && (
                        <span className="flex items-center gap-1 px-2.5 py-1 bg-red-500 text-white text-xs font-medium rounded-full">
                            <AlertTriangle className="w-3 h-3" />
                            Urgente
                        </span>
                    )}
                    {dog.isFeatured && (
                        <span className="flex items-center gap-1 px-2.5 py-1 bg-amber-500 text-white text-xs font-medium rounded-full">
                            <Star className="w-3 h-3" />
                            Destacado
                        </span>
                    )}
                </div>

                {/* Gender badge */}
                <div className="absolute top-3 right-3">
                    <span className={`w-8 h-8 flex items-center justify-center rounded-full text-lg font-bold ${dog.gender === "macho"
                        ? "bg-blue-500/80 text-white"
                        : "bg-pink-500/80 text-white"
                        }`}>
                        {genderConfig[dog.gender].icon}
                    </span>
                </div>

                {/* Age badge */}
                <div className="absolute bottom-3 left-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${ageConfig[dog.age].color}`}>
                        {ageConfig[dog.age].label}
                    </span>
                </div>
            </Link>

            {/* Content */}
            <div className="p-5 flex flex-col flex-grow">
                <div className="flex items-start justify-between mb-2">
                    <Link href={`/adopcion/${dog.id}`} className="hover:text-emerald-400 transition-colors">
                        <h3 className="text-xl font-bold text-white">
                            {dog.name}
                        </h3>
                    </Link>
                    {dog.adoptionFee && (
                        <span className="text-emerald-400 font-semibold">{dog.adoptionFee}€</span>
                    )}
                </div>

                <p className="text-sm text-muted-foreground mb-3">
                    {dog.breed} {dog.mixedBreed && "(mestizo)"} • {ageDisplay}
                </p>

                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                    <MapPin className="w-4 h-4" />
                    <span>{dog.shelterCity}, {dog.shelterRegion}</span>
                </div>

                {/* Size and weight */}
                <div className="flex items-center gap-3 mb-4">
                    <span className="flex items-center gap-1.5 px-2 py-1 bg-white/5 rounded-lg text-xs text-muted-foreground">
                        <Scale className="w-3 h-3" />
                        {sizeConfig[dog.size].label}
                    </span>
                    {dog.weight && (
                        <span className="text-xs text-muted-foreground">{dog.weight}kg</span>
                    )}
                </div>

                {/* Health status */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                    {dog.vaccinated && (
                        <span className="flex items-center gap-1 px-2 py-1 bg-emerald-500/10 text-emerald-300 rounded-lg text-xs" title="Vacunado">
                            <Syringe className="w-3 h-3" />
                        </span>
                    )}
                    {dog.sterilized && (
                        <span className="flex items-center gap-1 px-2 py-1 bg-purple-500/10 text-purple-300 rounded-lg text-xs" title="Esterilizado">
                            <Scissors className="w-3 h-3" />
                        </span>
                    )}
                    {dog.microchipped && (
                        <span className="flex items-center gap-1 px-2 py-1 bg-blue-500/10 text-blue-300 rounded-lg text-xs" title="Con microchip">
                            <Cpu className="w-3 h-3" />
                        </span>
                    )}
                    {dog.compatibleWithChildren && (
                        <span className="flex items-center gap-1 px-2 py-1 bg-pink-500/10 text-pink-300 rounded-lg text-xs" title="Apto para niños">
                            <Baby className="w-3 h-3" />
                        </span>
                    )}
                    {dog.compatibleWithCats && (
                        <span className="flex items-center gap-1 px-2 py-1 bg-amber-500/10 text-amber-300 rounded-lg text-xs" title="Compatible con gatos">
                            <Cat className="w-3 h-3" />
                        </span>
                    )}
                    {dog.compatibleWithDogs && (
                        <span className="flex items-center gap-1 px-2 py-1 bg-cyan-500/10 text-cyan-300 rounded-lg text-xs" title="Compatible con otros perros">
                            <Dog className="w-3 h-3" />
                        </span>
                    )}
                </div>

                {/* Description */}
                <p className="text-sm text-muted-foreground line-clamp-2 mb-4 flex-grow">
                    {dog.description}
                </p>

                {/* Personality tags */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                    {dog.personality.slice(0, 3).map((trait) => (
                        <span key={trait} className="px-2 py-0.5 bg-white/5 text-muted-foreground rounded-full text-xs">
                            {trait}
                        </span>
                    ))}
                </div>

                {/* Special needs warning */}
                {dog.specialNeeds && (
                    <div className="flex items-start gap-2 p-3 bg-amber-500/10 border border-amber-500/20 rounded-lg mb-4">
                        <Info className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                        <p className="text-xs text-amber-200 line-clamp-1">{dog.specialNeeds}</p>
                    </div>
                )}

                {/* Shelter info & Action */}
                <div className="pt-4 border-t border-white/10 mt-auto">
                    <div className="flex items-center justify-between gap-3 mb-3">
                        <p className="text-xs text-muted-foreground truncate">{dog.shelterName}</p>
                        <Link href={`/adopcion/${dog.id}`} className="text-xs text-emerald-400 font-medium hover:underline flex-shrink-0">
                            Ver perfil completo
                        </Link>
                    </div>

                    <Link
                        href={`/adopcion/${dog.id}`}
                        className="w-full py-2 bg-white/5 hover:bg-white/10 text-white text-sm font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
                    >
                        Conocer a {dog.name}
                    </Link>
                </div>
            </div>

            {/* Favorite button */}
            <button
                aria-label={`Guardar a ${dog.name} en favoritos`}
                title={`Guardar a ${dog.name} en favoritos`}
                className="absolute top-3 right-14 opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-black/20 rounded-full"
            >
                <Heart className="w-6 h-6 text-white/80 hover:text-red-400 hover:fill-red-400 transition-colors" />
            </button>
        </div>
    );
}

export default function AdopcionPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedRegion, setSelectedRegion] = useState("all");
    const [selectedSize, setSelectedSize] = useState("all");
    const [selectedAge, setSelectedAge] = useState("all");
    const [selectedGender, setSelectedGender] = useState<"all" | DogGender>("all");
    const [showFilters, setShowFilters] = useState(false);
    const [filters, setFilters] = useState({
        urgent: false,
        featured: false,
        goodWithKids: false,
        goodWithCats: false,
        goodWithDogs: false,
    });

    const stats = getAdoptionStats();

    const filteredDogs = useMemo(() => {
        return adoptionDogs.filter((dog) => {
            // Search
            if (searchQuery) {
                const query = searchQuery.toLowerCase();
                const matchesSearch =
                    dog.name.toLowerCase().includes(query) ||
                    dog.breed.toLowerCase().includes(query) ||
                    dog.description.toLowerCase().includes(query) ||
                    dog.shelterCity.toLowerCase().includes(query) ||
                    dog.shelterName.toLowerCase().includes(query);
                if (!matchesSearch) return false;
            }

            // Region
            if (selectedRegion !== "all" && dog.shelterRegion !== selectedRegion) {
                return false;
            }

            // Size
            if (selectedSize !== "all" && dog.size !== selectedSize) {
                return false;
            }

            // Age
            if (selectedAge !== "all" && dog.age !== selectedAge) {
                return false;
            }

            // Gender
            if (selectedGender !== "all" && dog.gender !== selectedGender) {
                return false;
            }

            // Additional filters
            if (filters.urgent && !dog.isUrgent) return false;
            if (filters.featured && !dog.isFeatured) return false;
            if (filters.goodWithKids && !dog.compatibleWithChildren) return false;
            if (filters.goodWithCats && !dog.compatibleWithCats) return false;
            if (filters.goodWithDogs && !dog.compatibleWithDogs) return false;

            return true;
        });
    }, [searchQuery, selectedRegion, selectedSize, selectedAge, selectedGender, filters]);

    const activeFiltersCount = Object.values(filters).filter(Boolean).length;
    const hasActiveFilters =
        activeFiltersCount > 0 ||
        searchQuery.trim().length > 0 ||
        selectedRegion !== "all" ||
        selectedSize !== "all" ||
        selectedAge !== "all" ||
        selectedGender !== "all";

    const clearAllFilters = () => {
        setSearchQuery("");
        setSelectedRegion("all");
        setSelectedSize("all");
        setSelectedAge("all");
        setSelectedGender("all");
        setFilters({
            urgent: false,
            featured: false,
            goodWithKids: false,
            goodWithCats: false,
            goodWithDogs: false,
        });
    };

    const resolveLabel = (items: { id: string; label: string }[], id: string) =>
        items.find((item) => item.id === id)?.label ?? id;

    // Sort: urgent first, then featured, then by published date
    const sortedDogs = useMemo(() => {
        return [...filteredDogs].sort((a, b) => {
            if (a.isUrgent && !b.isUrgent) return -1;
            if (!a.isUrgent && b.isUrgent) return 1;
            if (a.isFeatured && !b.isFeatured) return -1;
            if (!a.isFeatured && b.isFeatured) return 1;
            return new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime();
        });
    }, [filteredDogs]);

    return (
        <main className="min-h-screen bg-gradient-to-b from-card via-card/80 to-card">
            {/* Hero Section */}
            <section className="relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-pink-900/30 via-transparent to-emerald-900/20" />
                <div className="absolute top-20 left-10 w-72 h-72 bg-pink-500/10 rounded-full blur-3xl" />
                <div className="absolute bottom-10 right-10 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
                    <div className="text-center max-w-3xl mx-auto">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pink-500/15 border border-pink-500/30 mb-6">
                            <Heart className="w-4 h-4 text-pink-400" />
                            <span className="text-sm text-pink-300">Cambia una vida</span>
                        </div>

                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
                            Perros en
                            <span className="block mt-2 bg-gradient-to-r from-pink-400 via-rose-400 to-red-400 bg-clip-text text-transparent">
                                Adopción
                            </span>
                        </h1>

                        <p className="text-lg text-muted-foreground mb-8">
                            Encuentra a tu compañero perfecto. Todos estos perros están esperando
                            una segunda oportunidad en un hogar lleno de amor.
                        </p>

                        <div className="flex justify-center gap-4 mb-8">
                            <Link
                                href="/adopcion/mapa"
                                className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-medium rounded-xl transition-colors shadow-lg shadow-emerald-500/20"
                            >
                                <MapPin className="w-5 h-5" />
                                Ver Mapa Interactivo
                            </Link>
                            <Link
                                href="/apadrinar"
                                className="inline-flex items-center gap-2 px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white font-medium rounded-xl transition-colors shadow-lg shadow-amber-500/20"
                            >
                                <Heart className="w-5 h-5" />
                                Apadrinar
                            </Link>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
                            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                                <p className="text-2xl font-bold text-white">{stats.total}</p>
                                <p className="text-sm text-muted-foreground">Perros disponibles</p>
                            </div>
                            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                                <p className="text-2xl font-bold text-red-400">{stats.urgent}</p>
                                <p className="text-sm text-muted-foreground">Casos urgentes</p>
                            </div>
                            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                                <p className="text-2xl font-bold text-pink-400">{stats.puppies}</p>
                                <p className="text-sm text-muted-foreground">Cachorros</p>
                            </div>
                            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                                <p className="text-2xl font-bold text-amber-400">{stats.seniors}</p>
                                <p className="text-sm text-muted-foreground">Seniors</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Urgent Alert */}
            {stats.urgent > 0 && (
                <section className="max-w-7xl mx-auto px-4 mb-8">
                    <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-6">
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 bg-red-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                                <AlertTriangle className="w-6 h-6 text-red-400" />
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-white mb-1">
                                    {stats.urgent} {stats.urgent === 1 ? 'perro necesita' : 'perros necesitan'} hogar urgentemente
                                </h3>
                                <p className="text-muted-foreground text-sm">
                                    Estos perros están en situación de riesgo o llevan mucho tiempo esperando.
                                    ¿Puedes darles una oportunidad?
                                </p>
                                <button
                                    onClick={() => {
                                        setFilters(prev => ({ ...prev, urgent: true }));
                                        setShowFilters(true);
                                    }}
                                    className="mt-3 inline-flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white text-sm font-medium rounded-lg transition-colors"
                                >
                                    <Heart className="w-4 h-4" />
                                    Ver casos urgentes
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* Search and Filters */}
            <section className="sticky top-16 z-30 bg-card/95 backdrop-blur-md border-b border-white/10">
                <div className="max-w-7xl mx-auto px-4 py-4">
                <div className="flex flex-col lg:flex-row gap-4">
                        {/* Search */}
                        <div className="relative flex-1">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                            <input
                                type="text"
                                placeholder="Buscar por nombre, raza, ciudad..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-pink-500/50 focus:border-pink-500/50 transition-all"
                            />
                        </div>

                        {/* Region Select */}
                        <div className="relative">
                            <select
                                value={selectedRegion}
                                onChange={(e) => setSelectedRegion(e.target.value)}
                                className="appearance-none w-full lg:w-44 px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-pink-500/50 transition-all cursor-pointer"
                            >
                                {regions.map((region) => (
                                    <option key={region.id} value={region.id} className="bg-card/80">
                                        {region.label}
                                    </option>
                                ))}
                            </select>
                            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                        </div>

                        {/* Size Select */}
                        <div className="relative">
                            <select
                                value={selectedSize}
                                onChange={(e) => setSelectedSize(e.target.value)}
                                className="appearance-none w-full lg:w-40 px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-pink-500/50 transition-all cursor-pointer"
                            >
                                {sizes.map((size) => (
                                    <option key={size.id} value={size.id} className="bg-card/80">
                                        {size.label}
                                    </option>
                                ))}
                            </select>
                            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                        </div>

                        {/* Age Select */}
                        <div className="relative">
                            <select
                                value={selectedAge}
                                onChange={(e) => setSelectedAge(e.target.value)}
                                className="appearance-none w-full lg:w-36 px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-pink-500/50 transition-all cursor-pointer"
                            >
                                {ages.map((age) => (
                                    <option key={age.id} value={age.id} className="bg-card/80">
                                        {age.label}
                                    </option>
                                ))}
                            </select>
                            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                        </div>

                        {/* Gender Buttons */}
                        <div className="flex gap-2">
                            <button
                                onClick={() => setSelectedGender(selectedGender === "macho" ? "all" : "macho")}
                                className={`flex items-center gap-2 px-4 py-3 rounded-xl border transition-colors ${selectedGender === "macho"
                                    ? "bg-blue-500/20 border-blue-500/30 text-blue-300"
                                    : "bg-white/5 border-white/10 text-muted-foreground hover:text-white"
                                    }`}
                            >
                                <span className="font-bold">♂</span>
                                <span className="hidden sm:inline">Macho</span>
                            </button>
                            <button
                                onClick={() => setSelectedGender(selectedGender === "hembra" ? "all" : "hembra")}
                                className={`flex items-center gap-2 px-4 py-3 rounded-xl border transition-colors ${selectedGender === "hembra"
                                    ? "bg-pink-500/20 border-pink-500/30 text-pink-300"
                                    : "bg-white/5 border-white/10 text-muted-foreground hover:text-white"
                                    }`}
                            >
                                <span className="font-bold">♀</span>
                                <span className="hidden sm:inline">Hembra</span>
                            </button>
                        </div>

                        {/* More Filters Button */}
                        <button
                            onClick={() => setShowFilters(!showFilters)}
                            className={`flex items-center justify-center gap-2 px-4 py-3 rounded-xl border transition-colors ${showFilters || activeFiltersCount > 0
                                ? "bg-pink-500/20 border-pink-500/30 text-pink-300"
                                : "bg-white/5 border-white/10 text-muted-foreground hover:bg-white/10"
                                }`}
                        >
                            <Filter className="w-5 h-5" />
                            <span className="hidden sm:inline">Filtros</span>
                            {activeFiltersCount > 0 && (
                                <span className="flex items-center justify-center w-5 h-5 bg-pink-500 text-white text-xs font-medium rounded-full">
                                    {activeFiltersCount}
                                </span>
                            )}
                        </button>
                        {hasActiveFilters && (
                            <button
                                onClick={clearAllFilters}
                                className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-white/10 text-muted-foreground hover:bg-white/10"
                            >
                                <X className="w-5 h-5" />
                                <span className="hidden sm:inline">Limpiar todo</span>
                            </button>
                        )}
                    </div>

                    {/* Additional Filters */}
                    {showFilters && (
                        <div className="mt-4 p-4 bg-white/5 rounded-xl border border-white/10 animate-in fade-in slide-in-from-top-2">
                            <div className="flex flex-wrap gap-3">
                                <button
                                    onClick={() => setFilters(prev => ({ ...prev, urgent: !prev.urgent }))}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors ${filters.urgent
                                        ? "bg-red-500/20 border-red-500/30 text-red-300"
                                        : "bg-white/5 border-white/10 text-muted-foreground hover:text-white"
                                        }`}
                                >
                                    <AlertTriangle className="w-4 h-4" />
                                    Solo urgentes
                                </button>

                                <button
                                    onClick={() => setFilters(prev => ({ ...prev, featured: !prev.featured }))}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors ${filters.featured
                                        ? "bg-amber-500/20 border-amber-500/30 text-amber-300"
                                        : "bg-white/5 border-white/10 text-muted-foreground hover:text-white"
                                        }`}
                                >
                                    <Star className="w-4 h-4" />
                                    Destacados
                                </button>

                                <button
                                    onClick={() => setFilters(prev => ({ ...prev, goodWithKids: !prev.goodWithKids }))}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors ${filters.goodWithKids
                                        ? "bg-pink-500/20 border-pink-500/30 text-pink-300"
                                        : "bg-white/5 border-white/10 text-muted-foreground hover:text-white"
                                        }`}
                                >
                                    <Baby className="w-4 h-4" />
                                    Para niños
                                </button>

                                <button
                                    onClick={() => setFilters(prev => ({ ...prev, goodWithCats: !prev.goodWithCats }))}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors ${filters.goodWithCats
                                        ? "bg-amber-500/20 border-amber-500/30 text-amber-300"
                                        : "bg-white/5 border-white/10 text-muted-foreground hover:text-white"
                                        }`}
                                >
                                    <Cat className="w-4 h-4" />
                                    Con gatos
                                </button>

                                <button
                                    onClick={() => setFilters(prev => ({ ...prev, goodWithDogs: !prev.goodWithDogs }))}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors ${filters.goodWithDogs
                                        ? "bg-cyan-500/20 border-cyan-500/30 text-cyan-300"
                                        : "bg-white/5 border-white/10 text-muted-foreground hover:text-white"
                                        }`}
                                >
                                    <Dog className="w-4 h-4" />
                                    Con perros
                                </button>

                                {activeFiltersCount > 0 && (
                                    <button
                                        onClick={() => setFilters({
                                            urgent: false,
                                            featured: false,
                                            goodWithKids: false,
                                            goodWithCats: false,
                                            goodWithDogs: false,
                                        })}
                                        className="flex items-center gap-2 px-4 py-2 rounded-lg border border-red-500/30 text-red-400 hover:bg-red-500/10 transition-colors"
                                    >
                                        <X className="w-4 h-4" />
                                        Limpiar filtros
                                    </button>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </section>

            {/* Results */}
            <section className="max-w-7xl mx-auto px-4 py-8">
                {/* Results Count */}
                <div className="flex flex-col gap-3 mb-6">
                    <div className="flex items-center justify-between">
                        <p className="text-muted-foreground">
                            Mostrando <span className="text-white font-medium">{sortedDogs.length}</span> de {adoptionDogs.length} perros
                        </p>
                        {hasActiveFilters && (
                            <button
                                onClick={clearAllFilters}
                                className="text-xs text-muted-foreground hover:text-white"
                            >
                                Limpiar todo
                            </button>
                        )}
                    </div>
                    {hasActiveFilters && (
                        <div className="flex flex-wrap gap-2 text-xs">
                            {searchQuery.trim().length > 0 && (
                                <span className="px-2 py-1 rounded-full bg-white/5 text-muted-foreground">
                                    Búsqueda: {searchQuery}
                                </span>
                            )}
                            {selectedRegion !== "all" && (
                                <span className="px-2 py-1 rounded-full bg-white/5 text-muted-foreground">
                                    Región: {resolveLabel(regions, selectedRegion)}
                                </span>
                            )}
                            {selectedSize !== "all" && (
                                <span className="px-2 py-1 rounded-full bg-white/5 text-muted-foreground">
                                    Tamaño: {resolveLabel(sizes, selectedSize)}
                                </span>
                            )}
                            {selectedAge !== "all" && (
                                <span className="px-2 py-1 rounded-full bg-white/5 text-muted-foreground">
                                    Edad: {resolveLabel(ages, selectedAge)}
                                </span>
                            )}
                            {selectedGender !== "all" && (
                                <span className="px-2 py-1 rounded-full bg-white/5 text-muted-foreground">
                                    Sexo: {selectedGender === "macho" ? "Macho" : "Hembra"}
                                </span>
                            )}
                            {filters.urgent && (
                                <span className="px-2 py-1 rounded-full bg-red-500/20 text-red-200">
                                    Urgentes
                                </span>
                            )}
                            {filters.featured && (
                                <span className="px-2 py-1 rounded-full bg-amber-500/20 text-amber-200">
                                    Destacados
                                </span>
                            )}
                            {filters.goodWithKids && (
                                <span className="px-2 py-1 rounded-full bg-pink-500/20 text-pink-200">
                                    Para niños
                                </span>
                            )}
                            {filters.goodWithCats && (
                                <span className="px-2 py-1 rounded-full bg-amber-500/20 text-amber-200">
                                    Con gatos
                                </span>
                            )}
                            {filters.goodWithDogs && (
                                <span className="px-2 py-1 rounded-full bg-cyan-500/20 text-cyan-200">
                                    Con perros
                                </span>
                            )}
                        </div>
                    )}
                </div>

                {/* Grid */}
                {sortedDogs.length > 0 ? (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {sortedDogs.map((dog) => (
                            <DogCard key={dog.id} dog={dog} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-16">
                        <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Dog className="w-8 h-8 text-muted-foreground" />
                        </div>
                        <h3 className="text-xl font-semibold text-white mb-2">
                            No se encontraron perros
                        </h3>
                        <p className="text-muted-foreground mb-6">
                            Intenta con otros filtros o términos de búsqueda
                        </p>
                        <button
                            onClick={clearAllFilters}
                            className="px-6 py-3 bg-pink-500 hover:bg-pink-600 text-white rounded-xl transition-colors"
                        >
                            Ver todos los perros
                        </button>
                    </div>
                )}
            </section>

            {/* Adoption Info */}
            <section className="max-w-7xl mx-auto px-4 pb-16">
                <div className="bg-gradient-to-br from-pink-900/30 via-card/50 to-emerald-900/30 rounded-3xl p-8 md:p-12 border border-white/10">
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 text-center">
                        ¿Cómo funciona la adopción?
                    </h2>

                    <div className="grid md:grid-cols-4 gap-6">
                        <div className="text-center">
                            <div className="w-14 h-14 bg-pink-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Search className="w-7 h-7 text-pink-400" />
                            </div>
                            <h3 className="text-lg font-semibold text-white mb-2">1. Busca</h3>
                            <p className="text-sm text-muted-foreground">
                                Encuentra al perro que mejor se adapte a tu estilo de vida
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="w-14 h-14 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Phone className="w-7 h-7 text-blue-400" />
                            </div>
                            <h3 className="text-lg font-semibold text-white mb-2">2. Contacta</h3>
                            <p className="text-sm text-muted-foreground">
                                Llama o visita la protectora para conocer al perro
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="w-14 h-14 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Users className="w-7 h-7 text-emerald-400" />
                            </div>
                            <h3 className="text-lg font-semibold text-white mb-2">3. Entrevista</h3>
                            <p className="text-sm text-muted-foreground">
                                La protectora evaluará si sois compatibles
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="w-14 h-14 bg-amber-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Heart className="w-7 h-7 text-amber-400" />
                            </div>
                            <h3 className="text-lg font-semibold text-white mb-2">4. Adopta</h3>
                            <p className="text-sm text-muted-foreground">
                                ¡Lleva a tu nuevo amigo a casa y cambia su vida!
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="max-w-7xl mx-auto px-4 pb-16">
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-gradient-to-br from-emerald-900/30 to-card/50 rounded-2xl p-6 border border-emerald-500/20">
                        <h3 className="text-xl font-bold text-white mb-3">
                            ¿Eres una protectora?
                        </h3>
                        <p className="text-muted-foreground mb-4">
                            Registra tu organización para publicar perros en adopción y llegar a más familias.
                        </p>
                        <Link
                            href="/comunidad"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-medium rounded-xl transition-colors"
                        >
                            <Sparkles className="w-5 h-5" />
                            Registrar protectora
                        </Link>
                    </div>

                    <div className="bg-gradient-to-br from-amber-900/30 to-card/50 rounded-2xl p-6 border border-amber-500/20">
                        <h3 className="text-xl font-bold text-white mb-3">
                            ¿No puedes adoptar?
                        </h3>
                        <p className="text-muted-foreground mb-4">
                            Ser casa de acogida temporal también salva vidas. Consulta las opciones disponibles.
                        </p>
                        <Link
                            href="/comunidad"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white font-medium rounded-xl transition-colors"
                        >
                            <Heart className="w-5 h-5" />
                            Ser casa de acogida
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}

"use client";

import { useState } from "react";
import Image from "next/image";
import {
    Youtube, Instagram, Video, Mic, ExternalLink,
    Search, Users, Star, ArrowUpDown, X
} from "lucide-react";
import { creators, type Creator } from "@/data/creators";

export default function CreatorsPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [sortConfig, setSortConfig] = useState<{ key: keyof Creator; direction: 'asc' | 'desc' } | null>(null);
    const hasActiveFilters = searchQuery.trim().length > 0;

    const clearFilters = () => {
        setSearchQuery('');
    };

    // Filter Logic
    const filteredCreators = creators.filter(creator =>
        creator.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        creator.category.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Sorting Logic
    const sortedCreators = [...filteredCreators].sort((a, b) => {
        if (!sortConfig) return 0;
        const { key, direction } = sortConfig;
        if (a[key]! < b[key]!) return direction === 'asc' ? -1 : 1;
        if (a[key]! > b[key]!) return direction === 'asc' ? 1 : -1;
        return 0;
    });

    const handleSort = (key: keyof Creator) => {
        let direction: 'asc' | 'desc' = 'asc';
        if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    const getPlatformIcon = (platform: string) => {
        switch (platform) {
            case 'YouTube': return <Youtube className="w-4 h-4 text-red-500" />;
            case 'Instagram': return <Instagram className="w-4 h-4 text-pink-500" />;
            case 'TikTok': return <Video className="w-4 h-4 text-cyan-400" />; // Music note usually but Video works
            case 'Podcast': return <Mic className="w-4 h-4 text-purple-400" />;
            default: return <Users className="w-4 h-4 text-muted-foreground" />;
        }
    };

    const getCategoryBadge = (category: string) => {
        const colors: Record<string, string> = {
            'Educación': 'bg-blue-500/10 text-blue-400 border-blue-500/20',
            'Viajes': 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
            'Humor': 'bg-amber-500/10 text-amber-400 border-amber-500/20',
            'Salud': 'bg-rose-500/10 text-rose-400 border-rose-500/20',
            'Lifestyle': 'bg-purple-500/10 text-purple-400 border-purple-500/20',
        };
        return (
            <span className={`px-2 py-1 rounded-md text-xs font-medium border ${colors[category] || 'bg-card/80 text-muted-foreground'}`}>
                {category}
            </span>
        );
    };

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        "itemListElement": creators.map((creator, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "item": {
                "@type": "Person",
                "name": creator.name,
                "image": creator.avatar,
                "description": creator.description,
                "url": creator.link,
                "knowsAbout": creator.category,
                "interactionStatistic": {
                    "@type": "InteractionCounter",
                    "interactionType": "https://schema.org/FollowAction",
                    "userInteractionCount": parseInt(creator.subscribers.replace(/[^0-9]/g, '')) * (creator.subscribers.includes('M') ? 1000000 : 1000) // Estimación simple
                }
            }
        }))
    };

    return (
        <main className="min-h-screen bg-background text-foreground">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            {/* Hero */}
            <div className="relative pt-32 pb-12 px-4 text-center overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-indigo-500/10 rounded-full blur-3xl -z-10" />
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 animate-fade-in-up">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500">
                        Top Creadores
                    </span> & Influencers
                </h1>
                <p className="text-muted-foreground max-w-2xl mx-auto mb-8 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
                    Descubre los mejores canales sobre educación canina, viajes, salud y entretenimiento para disfrutar con tu perro.
                </p>

                {/* Search Bar */}
                <div className="max-w-md mx-auto relative group animate-fade-in-up" style={{ animationDelay: '200ms' }}>
                    <input
                        type="text"
                        placeholder="Buscar creador o categoría..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        aria-label="Buscar creadores"
                        className="w-full bg-card/80 backdrop-blur-md border border-white/10 rounded-xl py-3 pl-12 pr-10 text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all shadow-lg"
                    />
                    <Search className="absolute left-4 top-3.5 w-5 h-5 text-muted-foreground" />
                    {searchQuery && (
                        <button
                            type="button"
                            onClick={clearFilters}
                            aria-label="Limpiar búsqueda"
                            className="absolute right-3 top-3 p-1 rounded-full text-muted-foreground hover:text-white hover:bg-white/10 transition-colors"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    )}
                </div>
            </div>

            {/* Table Container */}
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
                <div className="bg-card/40 backdrop-blur-xl border border-white/5 rounded-2xl overflow-hidden shadow-2xl animate-fade-in-up" style={{ animationDelay: '300ms' }}>
                    <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-3 border-b border-white/5 text-xs text-muted-foreground">
                        <span aria-live="polite">
                            Resultados: <span className="text-white">{sortedCreators.length}</span>
                        </span>
                        {hasActiveFilters && (
                            <button
                                type="button"
                                onClick={clearFilters}
                                className="px-2.5 py-1 rounded-full border border-red-500/30 text-red-300 hover:bg-red-500/10 transition-colors"
                            >
                                Limpiar búsqueda
                            </button>
                        )}
                    </div>

                    {/* Header Row */}
                    <div className="grid grid-cols-12 gap-4 p-4 border-b border-white/5 bg-white/5 text-xs font-bold text-muted-foreground uppercase tracking-wider">
                        <button
                            type="button"
                            onClick={() => handleSort('name')}
                            className="col-span-4 md:col-span-3 flex items-center gap-1 hover:text-white text-left"
                            aria-pressed={sortConfig?.key === 'name'}
                        >
                            Creador <ArrowUpDown className="w-3 h-3" />
                        </button>
                        <button
                            type="button"
                            onClick={() => handleSort('category')}
                            className="col-span-3 md:col-span-2 hidden md:flex items-center gap-1 hover:text-white text-left"
                            aria-pressed={sortConfig?.key === 'category'}
                        >
                            Categoría <ArrowUpDown className="w-3 h-3" />
                        </button>
                        <button
                            type="button"
                            onClick={() => handleSort('platform')}
                            className="col-span-2 hidden md:flex items-center gap-1 hover:text-white text-left"
                            aria-pressed={sortConfig?.key === 'platform'}
                        >
                            Plataforma <ArrowUpDown className="w-3 h-3" />
                        </button>
                        <div className="col-span-8 md:col-span-4">Descripción</div>
                        <div className="col-span-1 text-right">Link</div>
                    </div>

                    {/* Body Rows */}
                    <div className="divide-y divide-white/5">
                        {sortedCreators.map((creator) => (
                            <div
                                key={creator.id}
                                className="group grid grid-cols-12 gap-4 p-4 items-center hover:bg-white/5 transition-colors duration-200"
                            >
                                {/* Creator Info */}
                                <div className="col-span-4 md:col-span-3 flex items-center gap-3">
                                    <div className="relative">
                                        <Image
                                            src={creator.avatar}
                                            alt={creator.name}
                                            width={40}
                                            height={40}
                                            className="rounded-full object-cover ring-2 ring-transparent group-hover:ring-indigo-500 transition-all"
                                        />
                                        {creator.featured && (
                                            <div className="absolute -top-1 -right-1 bg-amber-400 text-background p-0.5 rounded-full" title="Destacado">
                                                <Star className="w-2 h-2 fill-current" />
                                            </div>
                                        )}
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-white text-sm group-hover:text-indigo-400 transition-colors">
                                            {creator.name}
                                        </h3>
                                        <p className="text-xs text-muted-foreground md:hidden">{creator.category}</p>
                                        <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                                            <Users className="w-3 h-3" /> {creator.subscribers}
                                        </p>
                                    </div>
                                </div>

                                {/* Category (Desktop) */}
                                <div className="col-span-3 md:col-span-2 hidden md:flex">
                                    {getCategoryBadge(creator.category)}
                                </div>

                                {/* Platform (Desktop) */}
                                <div className="col-span-3 md:col-span-2 hidden md:flex items-center gap-2 text-sm text-muted-foreground">
                                    {getPlatformIcon(creator.platform)}
                                    <span>{creator.platform}</span>
                                </div>

                                {/* Description */}
                                <div className="col-span-7 md:col-span-4 text-sm text-muted-foreground line-clamp-2 md:line-clamp-1 pr-4">
                                    {creator.description}
                                </div>

                                {/* Link Action */}
                                <div className="col-span-1 flex justify-end">
                                    <a
                                        href={creator.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={`Visitar ${creator.name} en ${creator.platform}`}
                                        className="p-2 rounded-lg bg-white/5 hover:bg-indigo-500 hover:text-white text-muted-foreground transition-all transform hover:scale-110"
                                        title={`Visitar ${creator.platform}`}
                                    >
                                        <ExternalLink className="w-4 h-4" />
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Empty State */}
                    {sortedCreators.length === 0 && (
                        <div className="p-12 text-center text-muted-foreground">
                            <p>No se encontraron creadores que coincidan con tu búsqueda.</p>
                            {hasActiveFilters && (
                                <button
                                    type="button"
                                    onClick={clearFilters}
                                    className="mt-4 text-indigo-400 hover:text-indigo-300 font-medium"
                                >
                                    Limpiar búsqueda
                                </button>
                            )}
                        </div>
                    )}
                </div>

                <div className="mt-8 text-center">
                    <p className="text-muted-foreground text-sm">
                        ¿Eres creador o conoces uno genial? <span className="text-indigo-400 cursor-pointer hover:underline">Nomínalo aquí</span>.
                    </p>
                </div>
            </div>
        </main>
    );
}

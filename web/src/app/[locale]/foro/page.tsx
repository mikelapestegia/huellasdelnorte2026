"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
    MessageCircle, Heart, Stethoscope, Map as MapIcon,
    Search, Plus, Filter, ThumbsUp, MessageSquare, Eye,
    Pin, X
} from "lucide-react";
import { forumCategories, recentPosts, type ForumCategory } from "@/data/forum";

// Icon mapping helper
const iconMap: Record<string, any> = {
    MessageCircle,
    Heart,
    Stethoscope,
    Map: MapIcon
};

// Role badge helper
const RoleBadge = ({ role }: { role: string }) => {
    if (role === 'admin' || role === 'moderator') {
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30">MOD</span>;
    }
    if (role === 'veterinarian') {
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">VET</span>;
    }
    return null;
};

export default function ForumPage() {
    const [selectedCategory, setSelectedCategory] = useState<string>('all');
    const [searchQuery, setSearchQuery] = useState('');

    const filteredPosts = recentPosts.filter(post => {
        const matchesCategory = selectedCategory === 'all' || post.categoryId === selectedCategory;
        const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
        return matchesCategory && matchesSearch;
    });

    const hasActiveFilters = selectedCategory !== 'all' || searchQuery.trim().length > 0;

    const clearFilters = () => {
        setSelectedCategory('all');
        setSearchQuery('');
    };

    return (
        <div className="min-h-screen bg-background text-foreground font-sans selection:bg-emerald-500/30">

            {/* Hero Section */}
            <div className="relative pt-32 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-emerald-900/20 to-background pointer-events-none" />
                <div className="absolute -top-40 -right-40 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

                <div className="relative max-w-7xl mx-auto text-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                        La Manada del <span className="text-emerald-400">Norte</span>
                    </h1>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
                        Un espacio seguro para compartir experiencias, resolver dudas y conectar con otros amantes de los perros.
                    </p>

                    {/* Search Bar */}
                    <div className="max-w-xl mx-auto relative group">
                        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-2xl blur opacity-20 group-hover:opacity-30 transition-opacity" />
                        <div className="relative bg-card/80 backdrop-blur-xl border border-white/10 rounded-2xl p-2 flex items-center shadow-2xl">
                            <Search className="w-5 h-5 text-muted-foreground ml-3 mr-3" />
                            <input
                                type="text"
                                placeholder="Buscar temas, consejos, razas..."
                                className="bg-transparent border-none outline-none text-white placeholder:text-muted-foreground flex-1 h-10"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                aria-label="Buscar en el foro"
                            />
                            {searchQuery && (
                                <button
                                    type="button"
                                    onClick={() => setSearchQuery('')}
                                    aria-label="Limpiar búsqueda"
                                    className="mr-2 p-2 rounded-full text-muted-foreground hover:text-white hover:bg-white/10 transition-colors"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            )}
                            <button
                                type="button"
                                className="hidden sm:flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-5 py-2 rounded-xl font-medium transition-all shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30"
                            >
                                Buscar
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content Grid */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

                    {/* Sidebar (Categories) */}
                    <div className="lg:col-span-1 space-y-6">
                        <div className="bg-card/50 backdrop-blur-md rounded-2xl p-5 border border-white/5 sticky top-24">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="font-bold text-white">Categorías</h3>
                                <Filter className="w-4 h-4 text-muted-foreground" />
                            </div>

                            <div className="space-y-1">
                                <button
                                    type="button"
                                    onClick={() => setSelectedCategory('all')}
                                    aria-pressed={selectedCategory === 'all'}
                                    className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all flex items-center justify-between ${selectedCategory === 'all'
                                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                                        : 'text-muted-foreground hover:bg-white/5 hover:text-white'
                                        }`}
                                >
                                    <span>Todas las discusiones</span>
                                    <span className="text-xs opacity-60 bg-white/5 px-2 py-0.5 rounded-full">
                                        {recentPosts.length}
                                    </span>
                                </button>

                                {forumCategories.map(cat => {
                                    const Icon = iconMap[cat.icon] || MessageCircle;
                                    const isActive = selectedCategory === cat.id;

                                    return (
                                        <button
                                            key={cat.id}
                                            type="button"
                                            onClick={() => setSelectedCategory(cat.id)}
                                            aria-pressed={isActive}
                                            className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all flex items-center justify-between group ${isActive
                                                ? 'bg-white/10 text-white border border-white/10'
                                                : 'text-muted-foreground hover:bg-white/5 hover:text-white'
                                                }`}
                                        >
                                            <div className="flex items-center gap-3">
                                                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : cat.color}`} />
                                                <span>{cat.name}</span>
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>

                            <button
                                type="button"
                                className="w-full mt-6 flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-white py-3 rounded-xl font-bold shadow-lg shadow-emerald-900/20 transition-all transform hover:scale-[1.02]"
                            >
                                <Plus className="w-5 h-5" />
                                Nuevo Tema
                            </button>
                        </div>

                        {/* Stats Widget */}
                        <div className="bg-transparent p-5 rounded-2xl border border-white/5 hidden lg:block">
                            <h4 className="text-xs uppercase tracking-widest text-muted-foreground font-bold mb-4">Estadísticas</h4>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-2xl font-bold text-white">1.2k</p>
                                    <p className="text-xs text-muted-foreground">Miembros</p>
                                </div>
                                <div>
                                    <p className="text-2xl font-bold text-emerald-400">45</p>
                                    <p className="text-xs text-muted-foreground">Online</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Feed (Posts) */}
                    <div className="lg:col-span-3 space-y-4">
                        <div className="flex items-center justify-between mb-4 px-2">
                            <h2 className="text-xl font-bold text-white flex items-center gap-2">
                                {selectedCategory === 'all' ? 'Discusiones Recientes' : forumCategories.find(c => c.id === selectedCategory)?.name}
                            </h2>
                            <div className="flex gap-2">
                                <select className="bg-card border border-white/10 text-muted-foreground text-sm rounded-lg px-3 py-1.5 focus:outline-none focus:border-emerald-500">
                                    <option>Más recientes</option>
                                    <option>Más populares</option>
                                    <option>Sin respuesta</option>
                                </select>
                            </div>
                        </div>

                        <div className="mb-4 px-2 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                            <span aria-live="polite">
                                Resultados: <span className="text-white">{filteredPosts.length}</span>
                            </span>
                            {hasActiveFilters && (
                                <>
                                    <span>·</span>
                                    {selectedCategory !== 'all' && (
                                        <span className="px-2 py-1 rounded-full bg-white/5 text-muted-foreground">
                                            Categoría: {forumCategories.find(c => c.id === selectedCategory)?.name ?? selectedCategory}
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

                        {filteredPosts.length === 0 ? (
                            <div className="text-center py-20 bg-card/30 rounded-2xl border border-white/5 border-dashed">
                                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-card/80 mb-4">
                                    <MessageSquare className="w-8 h-8 text-muted-foreground" />
                                </div>
                                <h3 className="text-lg font-medium text-white mb-1">No se encontraron temas</h3>
                                <p className="text-muted-foreground">Sé el primero en iniciar una conversación.</p>
                                {hasActiveFilters && (
                                    <button
                                        type="button"
                                        onClick={clearFilters}
                                        className="mt-4 text-emerald-400 hover:text-emerald-300 font-medium"
                                    >
                                        Limpiar filtros
                                    </button>
                                )}
                            </div>
                        ) : (
                            filteredPosts.map((post) => (
                                <div
                                    key={post.id}
                                    className="group relative bg-card/50 hover:bg-card/80 backdrop-blur-sm border border-white/5 hover:border-emerald-500/30 rounded-2xl p-5 transition-all duration-300 hover:shadow-xl hover:shadow-black/20"
                                >
                                    {post.isPinned && (
                                        <div className="absolute top-0 right-0 p-3">
                                            <Pin className="w-4 h-4 text-amber-500 rotate-45" />
                                        </div>
                                    )}

                                    <div className="flex gap-4">
                                        {/* Avatar */}
                                        <div className="flex-shrink-0">
                                            <Image
                                                src={post.author.avatar}
                                                alt={post.author.name}
                                                width={48}
                                                height={48}
                                                className="rounded-full object-cover border-2 border-border group-hover:border-emerald-500/50 transition-colors"
                                            />
                                        </div>

                                        {/* Content */}
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className="font-medium text-foreground text-sm">{post.author.name}</span>
                                                <RoleBadge role={post.author.role} />
                                                <span className="text-muted-foreground text-xs">• {post.date}</span>
                                            </div>

                                            <Link href={`/foro/post/${post.id}`} className="block group-hover:text-emerald-400 transition-colors">
                                                <h3 className="text-lg font-bold text-white mb-2 truncate pr-8">
                                                    {post.title}
                                                </h3>
                                            </Link>

                                            <p className="text-muted-foreground text-sm line-clamp-2 mb-4">
                                                {post.excerpt}
                                            </p>

                                            {/* Footer */}
                                            <div className="flex items-center justify-between border-t border-white/5 pt-3 mt-2">
                                                <div className="flex gap-2">
                                                    {post.tags.map(tag => (
                                                        <span key={tag} className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-card/80 text-muted-foreground group-hover:bg-card/80 transition-colors">
                                                            #{tag}
                                                        </span>
                                                    ))}
                                                </div>

                                                <div className="flex items-center gap-4 text-muted-foreground text-xs font-medium">
                                                    <div className="flex items-center gap-1.5 group-hover:text-emerald-400/80 transition-colors">
                                                        <ThumbsUp className="w-3.5 h-3.5" />
                                                        {post.likes}
                                                    </div>
                                                    <div className="flex items-center gap-1.5 group-hover:text-blue-400/80 transition-colors">
                                                        <MessageSquare className="w-3.5 h-3.5" />
                                                        {post.replies}
                                                    </div>
                                                    <div className="flex items-center gap-1.5">
                                                        <Eye className="w-3.5 h-3.5" />
                                                        {post.views}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

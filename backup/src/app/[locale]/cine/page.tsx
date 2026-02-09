"use client";

import { useState } from "react";
import {
    Film, Clock, ExternalLink, Info, Search,
    BookOpen, ShieldCheck, Globe
} from "lucide-react";
import { movies, type Movie } from "@/data/movies";

export default function CinemaPage() {
    const [filterStatus, setFilterStatus] = useState<'all' | 'Dominio Público' | 'Próximamente'>('all');

    const filteredMovies = movies.filter(movie => {
        if (filterStatus === 'all') return true;
        if (filterStatus === 'Dominio Público') return movie.status === 'Dominio Público';
        return movie.status.startsWith('Próximamente');
    });

    return (
        <main className="min-h-screen bg-slate-950 text-slate-200 selection:bg-rose-500/30">
            {/* Hero Section */}
            <div className="relative pt-32 pb-16 px-4 bg-gradient-to-br from-slate-900 via-rose-950/20 to-slate-950">
                <div className="max-w-4xl mx-auto text-center relative z-10">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-sm font-medium mb-6 animate-fade-in-up">
                        <Film className="w-4 h-4" />
                        <span>Cine Clásico & Dominio Público</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 font-serif tracking-tighter animate-fade-in-up" style={{ animationDelay: '100ms' }}>
                        Butaca <span className="text-rose-500">Canina</span>
                    </h1>
                    <p className="text-lg text-slate-400 max-w-2xl mx-auto mb-8 leading-relaxed animate-fade-in-up" style={{ animationDelay: '200ms' }}>
                        Una selección curada de películas, cortos y obras maestras del cine protagonizadas por perros que son parte del patrimonio cultural común.
                    </p>
                </div>

                {/* Background Pattern */}
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 pointer-events-none" />
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 lg:grid-cols-3 gap-12">

                {/* Movie Grid */}
                <div className="lg:col-span-2 space-y-8">
                    <div className="flex items-center justify-between border-b border-white/5 pb-4">
                        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                            <Film className="w-6 h-6 text-rose-500" />
                            Cartelera
                        </h2>
                        <div className="flex gap-2">
                            <button
                                onClick={() => setFilterStatus('all')}
                                className={`px-4 py-2 rounded-lg text-sm transition-colors ${filterStatus === 'all' ? 'bg-white text-slate-900 font-bold' : 'text-slate-400 hover:text-white'}`}
                            >
                                Todas
                            </button>
                            <button
                                onClick={() => setFilterStatus('Dominio Público')}
                                className={`px-4 py-2 rounded-lg text-sm transition-colors ${filterStatus === 'Dominio Público' ? 'bg-emerald-500/20 text-emerald-400 font-bold' : 'text-slate-400 hover:text-white'}`}
                            >
                                Disponibles
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {filteredMovies.map((movie) => (
                            <div
                                key={movie.id}
                                className="group bg-slate-900 rounded-2xl overflow-hidden border border-white/5 hover:border-rose-500/30 transition-all hover:shadow-2xl hover:shadow-rose-900/10 flex flex-col"
                            >
                                <div className="aspect-video bg-black relative overflow-hidden">
                                    <img
                                        src={movie.poster}
                                        alt={movie.title}
                                        className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                                    />
                                    <div className="absolute top-2 left-2 bg-black/70 backdrop-blur-sm px-2 py-1 rounded text-xs font-bold text-white border border-white/10">
                                        {movie.year}
                                    </div>
                                    <div className={`absolute top-2 right-2 px-2 py-1 rounded text-xs font-bold border ${movie.status === 'Dominio Público'
                                            ? 'bg-emerald-500 text-slate-900 border-emerald-400'
                                            : 'bg-amber-500 text-slate-900 border-amber-400'
                                        }`}>
                                        {movie.status === 'Dominio Público' ? 'DISPONIBLE' : 'SOON'}
                                    </div>
                                </div>

                                <div className="p-6 flex-1 flex flex-col">
                                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-rose-400 transition-colors">
                                        {movie.title}
                                    </h3>
                                    <p className="text-slate-400 text-sm mb-4 line-clamp-3 flex-1">
                                        {movie.description}
                                    </p>

                                    {movie.notes && (
                                        <div className="bg-slate-800/50 p-3 rounded-lg border border-white/5 mb-4">
                                            <p className="text-xs text-slate-300 italic">
                                                "{movie.notes}"
                                            </p>
                                        </div>
                                    )}

                                    {movie.archiveUrl ? (
                                        <a
                                            href={movie.archiveUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="mt-auto w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold flex items-center justify-center gap-2 transition-all shadow-lg"
                                        >
                                            <Film className="w-4 h-4" />
                                            Ver en Archive.org
                                        </a>
                                    ) : (
                                        <button disabled className="mt-auto w-full py-3 rounded-xl bg-slate-800 text-slate-500 font-bold flex items-center justify-center gap-2 cursor-not-allowed border border-white/5">
                                            <Clock className="w-4 h-4" />
                                            Próximamente (2026)
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Educational Sidebar */}
                <div className="space-y-8">
                    <div className="bg-slate-900/50 backdrop-blur-md rounded-2xl p-6 border border-white/5 sticky top-24">
                        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                            <BookOpen className="w-5 h-5 text-indigo-400" />
                            Guía de Dominio Público
                        </h3>

                        <div className="space-y-6">
                            <div className="flex gap-4">
                                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-indigo-500/10 flex items-center justify-center text-indigo-400">
                                    <Clock className="w-5 h-5" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-white text-sm mb-1">La Regla de los 95 Años</h4>
                                    <p className="text-xs text-slate-400 leading-relaxed">
                                        En EE.UU., las obras publicadas antes de 1929 ya son libres. Obras como el primer corto de Pluto (1930) se liberarán en 2026.
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                                    <Globe className="w-5 h-5" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-white text-sm mb-1">Recursos Oficiales</h4>
                                    <p className="text-xs text-slate-400 leading-relaxed mb-2">
                                        Dónde buscar obras libres legalmente:
                                    </p>
                                    <ul className="text-xs space-y-2">
                                        <li>
                                            <a href="https://archive.org" target="_blank" className="text-emerald-400 hover:underline flex items-center gap-1">
                                                <ExternalLink className="w-3 h-3" /> Internet Archive
                                            </a>
                                        </li>
                                        <li>
                                            <a href="https://commons.wikimedia.org" target="_blank" className="text-emerald-400 hover:underline flex items-center gap-1">
                                                <ExternalLink className="w-3 h-3" /> Wikimedia Commons
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-400">
                                    <ShieldCheck className="w-5 h-5" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-white text-sm mb-1">Copyright vs Marca</h4>
                                    <p className="text-xs text-slate-400 leading-relaxed">
                                        Cuidado: Un personaje puede ser dominio público, pero su nombre (ej. "Mickey Mouse") puede ser una marca registrada protegida.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 pt-6 border-t border-white/5">
                            <p className="text-[10px] text-slate-500 text-center">
                                * Esta información es orientativa y no constituye asesoramiento legal. Verifica siempre las leyes de tu país.
                            </p>
                        </div>
                    </div>
                </div>

            </div>
        </main>
    );
}

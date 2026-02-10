"use client";

import { useState } from "react";
import Image from "next/image";
import {
    Headphones, Volume2, Mic, PlayCircle, ExternalLink,
    Info, BookOpen, Radio
} from "lucide-react";
import { audioCollection, type AudioContent } from "@/data/audio";

export default function AudioPage() {
    const [activeTab, setActiveTab] = useState<'all' | 'Audiolibro' | 'Podcast'>('all');

    const filteredAudio = audioCollection.filter(item =>
        activeTab === 'all' || item.type === activeTab || (activeTab === 'Audiolibro' && item.type === 'Radio Antigua')
    );

    return (
        <main className="min-h-screen bg-background text-foreground">
            {/* Hero */}
            <div className="relative pt-32 pb-16 px-4 bg-gradient-to-b from-card to-background border-b border-white/5">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-sm font-medium mb-6 animate-fade-in-up">
                        <Headphones className="w-4 h-4" />
                        <span>Audioteca Canina</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
                        Escucha y <span className="text-violet-500">Aprende</span>
                    </h1>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
                        Desde clásicos de la literatura en dominio público hasta los podcasts más actuales sobre educación y bienestar animal.
                    </p>

                    {/* Tabs */}
                    <div className="flex justify-center gap-4 animate-fade-in-up" style={{ animationDelay: '300ms' }}>
                        <button
                            onClick={() => setActiveTab('all')}
                            className={`px-6 py-2 rounded-full font-medium transition-all ${activeTab === 'all' ? 'bg-violet-600 text-white shadow-lg shadow-violet-900/50' : 'bg-card/80 text-muted-foreground hover:text-white'
                                }`}
                        >
                            Todo
                        </button>
                        <button
                            onClick={() => setActiveTab('Audiolibro')}
                            className={`px-6 py-2 rounded-full font-medium transition-all flex items-center gap-2 ${activeTab === 'Audiolibro' ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/50' : 'bg-card/80 text-muted-foreground hover:text-white'
                                }`}
                        >
                            <BookOpen className="w-4 h-4" /> Clásicos
                        </button>
                        <button
                            onClick={() => setActiveTab('Podcast')}
                            className={`px-6 py-2 rounded-full font-medium transition-all flex items-center gap-2 ${activeTab === 'Podcast' ? 'bg-rose-600 text-white shadow-lg shadow-rose-900/50' : 'bg-card/80 text-muted-foreground hover:text-white'
                                }`}
                        >
                            <Mic className="w-4 h-4" /> Podcasts
                        </button>
                    </div>
                </div>
            </div>

            {/* Audio Grid */}
            <div className="max-w-6xl mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {filteredAudio.map((item) => (
                        <div key={item.id} className="bg-card rounded-2xl overflow-hidden border border-white/5 hover:border-violet-500/30 transition-all shadow-xl">
                            {/* Card Header */}
                            <div className="flex p-6 gap-6 items-start">
                                <Image
                                    src={item.coverImage}
                                    alt={item.title}
                                    width={96}
                                    height={96}
                                    className="rounded-lg object-cover shadow-lg flex-shrink-0"
                                />
                                <div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded border ${item.type === 'Audiolibro' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                                            item.type === 'Podcast' ? 'bg-rose-500/10 text-rose-400 border-rose-500/20' :
                                                'bg-amber-500/10 text-amber-400 border-amber-500/20'
                                            }`}>
                                            {item.type}
                                        </span>
                                        {item.duration && (
                                            <span className="text-xs text-muted-foreground flex items-center gap-1">
                                                <Volume2 className="w-3 h-3" /> {item.duration}
                                            </span>
                                        )}
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-1">{item.title}</h3>
                                    <p className="text-sm text-muted-foreground mb-2">Por {item.author}</p>
                                    <p className="text-xs text-muted-foreground line-clamp-2">{item.description}</p>
                                </div>
                            </div>

                            {/* Player Section */}
                            <div className="bg-background/50 p-6 border-t border-white/5">
                                {item.licenseType === 'embed' ? (
                                    <div className="rounded-xl overflow-hidden bg-black">
                                        {/* Placeholder for iframe to prevent heavy loading or hydration issues immediately, or direct iframe if needed */}
                                        <iframe
                                            src={item.audioUrl}
                                            width="100%"
                                            height="152"
                                            frameBorder="0"
                                            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                                            loading="lazy"
                                        ></iframe>
                                    </div>
                                ) : (
                                    <audio
                                        controls
                                        preload="metadata"
                                        crossOrigin="anonymous"
                                        className="w-full h-12 rounded-lg bg-neutral-900/50 hover:bg-neutral-900/70 transition-colors border border-white/10"
                                    >
                                        <source src={item.audioUrl} type="audio/mpeg" />
                                        Tu navegador no soporta el elemento de audio.
                                    </audio>
                                )}

                                {/* Legal Attribution Template */}
                                <div className="mt-6 pt-4 border-t border-white/5">
                                    <AudioLicenseTemplate item={item} />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Footer Notice */}
            <div className="border-t border-white/5 bg-background py-12 px-4">
                <div className="max-w-3xl mx-auto text-center">
                    <h4 className="text-sm font-bold text-muted-foreground mb-4 uppercase tracking-wider flex items-center justify-center gap-2">
                        <Info className="w-4 h-4" /> Aviso Legal de Audios
                    </h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                        "Los audiolibros y archivos de radio antiguos alojados o enlazados en este sitio son obras de dominio público.
                        Los podcasts actuales se muestran mediante reproductores insertados de sus plataformas originales y no alojamos dichos archivos en nuestros servidores.
                        Huellas del Norte respeta la propiedad intelectual y fomenta el acceso legal a la cultura."
                    </p>
                </div>
            </div>
        </main>
    );
}

// Componente para las plantillas legales solicitadas
function AudioLicenseTemplate({ item }: { item: AudioContent }) {
    if (item.licenseType === 'public_domain') {
        return (
            <div className="text-[10px] text-muted-foreground font-mono space-y-1 bg-card/50 p-3 rounded border border-white/5">
                <p><span className="text-muted-foreground font-bold">Título:</span> {item.title}</p>
                <p><span className="text-muted-foreground font-bold">Fuente:</span> Grabación de Dominio Público cortesía de {item.source}.</p>
                <p><span className="text-muted-foreground font-bold">Licencia:</span> Este material es libre de derechos de autor y se distribuye bajo licencia de Dominio Público.</p>
                {item.narrator && <p><span className="text-muted-foreground font-bold">Narrado por:</span> {item.narrator} (Comunidad LibriVox)</p>}
            </div>
        );
    }

    if (item.licenseType === 'cc_by') {
        return (
            <div className="text-[10px] text-muted-foreground font-mono space-y-1 bg-card/50 p-3 rounded border border-white/5">
                <p className="font-bold text-muted-foreground mb-1">Créditos:</p>
                <p>Audio: "{item.title}"</p>
                <p>Autor: {item.author}</p>
                <p>Fuente: Descargado de <a href={item.originalLink} target="_blank" rel="noopener noreferrer" className="text-violet-400 hover:underline">{item.source}</a></p>
                <p>Licencia: Usado bajo licencia CC BY 3.0 / CC BY 4.0</p>
            </div>
        );
    }

    if (item.licenseType === 'embed') {
        return (
            <div className="text-[10px] text-muted-foreground font-mono bg-card/50 p-3 rounded border border-white/5">
                <p>
                    <span className="text-amber-500/80 font-bold mr-1">Nota:</span>
                    Este contenido se reproduce directamente desde la fuente original de {item.source}.
                    Todos los derechos de propiedad intelectual pertenecen a sus respectivos creadores.
                </p>
            </div>
        );
    }

    return null;
}

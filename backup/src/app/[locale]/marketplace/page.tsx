"use client";

import { useState } from "react";
import { products } from "@/data/products";
import { ProductCard } from "@/components/marketplace/ProductCard";
import { ShieldCheck, MapPin, Zap } from "lucide-react";

export default function MarketplacePage() {
    const [activeTab, setActiveTab] = useState<'all' | 'tech' | 'food'>('all');
    const [safetyValue, setSafetyValue] = useState<number>(50); // For calculator

    const filteredProducts = products.filter(p => activeTab === 'all' || p.category === activeTab);

    return (
        <main className="min-h-screen bg-slate-950 text-slate-200 selection:bg-emerald-500/30">
            {/* Hero Section */}
            <div className="relative pt-32 pb-20 px-4 bg-gradient-to-br from-slate-900 via-emerald-950/20 to-slate-950 border-b border-white/5 overflow-hidden">
                <div className="max-w-7xl mx-auto text-center relative z-10">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-bold mb-6 animate-fade-in-up">
                        <Zap className="w-4 h-4" />
                        Huellas Tech & Nutrition
                    </div>
                    <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight mb-6 animate-fade-in-up delay-100 leading-tight">
                        Tecnología que salva vidas.<br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">Nutrición que las alarga.</span>
                    </h1>
                    <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-10 animate-fade-in-up delay-200">
                        Una selección curada de lo mejor para tu perro. GPS conectados para seguridad total y alimentación natural disponible cerca de ti.
                    </p>

                    {/* Category Tabs */}
                    <div className="flex justify-center gap-4 animate-fade-in-up delay-300">
                        <button
                            type="button"
                            onClick={() => setActiveTab('all')}
                            aria-pressed={activeTab === 'all'}
                            className={`px-6 py-2.5 rounded-full font-bold transition-all ${activeTab === 'all' ? 'bg-white text-slate-900 shadow-lg shadow-white/10' : 'bg-slate-800 text-slate-400 hover:text-white'}`}
                        >
                            Todo
                        </button>
                        <button
                            type="button"
                            onClick={() => setActiveTab('tech')}
                            aria-pressed={activeTab === 'tech'}
                            className={`px-6 py-2.5 rounded-full font-bold transition-all flex items-center gap-2 ${activeTab === 'tech' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-900/50' : 'bg-slate-800 text-slate-400 hover:text-white'}`}
                        >
                            <Zap className="w-4 h-4" /> Tecnología (GPS)
                        </button>
                        <button
                            type="button"
                            onClick={() => setActiveTab('food')}
                            aria-pressed={activeTab === 'food'}
                            className={`px-6 py-2.5 rounded-full font-bold transition-all flex items-center gap-2 ${activeTab === 'food' ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/50' : 'bg-slate-800 text-slate-400 hover:text-white'}`}
                        >
                            <MapPin className="w-4 h-4" /> Alimentación Local
                        </button>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-12 grid lg:grid-cols-3 gap-12">
                {/* Main Product Grid */}
                <div className="lg:col-span-2 space-y-8">
                    <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                            {activeTab === 'tech' ? 'Dispositivos Conectados' : activeTab === 'food' ? 'Nutrición Premium Local' : 'Destacados'}
                        </h2>
                        <div className="text-sm text-slate-500 font-medium">
                            {filteredProducts.length} resultados
                        </div>
                    </div>

                    {filteredProducts.length > 0 ? (
                        <div className="grid md:grid-cols-2 gap-6">
                            {filteredProducts.map(product => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-16 bg-slate-900/40 rounded-2xl border border-white/5">
                            <p className="text-slate-400">No hay productos disponibles en esta categoría.</p>
                        </div>
                    )}
                </div>

                {/* Sidebar - Interactive Tools */}
                <div className="space-y-8 sticky top-24 h-fit">
                    {/* Safety Calculator (Only visible for Tech/All) */}
                    {(activeTab === 'all' || activeTab === 'tech') && (
                        <div className="bg-slate-900 rounded-2xl p-6 border border-indigo-500/20 shadow-xl shadow-indigo-900/10">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-3 bg-indigo-500/10 rounded-xl">
                                    <ShieldCheck className="w-6 h-6 text-indigo-400" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-white">Calculadora de Seguridad</h3>
                                    <p className="text-xs text-slate-400">¿Cuánto vale su tranquilidad?</p>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <div>
                                    <label className="text-sm text-slate-300 font-medium mb-2 block">
                                        Gasto mensual en premios/juguetes
                                    </label>
                                    <input
                                        type="range"
                                        min="0"
                                        max="100"
                                        value={safetyValue}
                                        onChange={(e) => setSafetyValue(parseInt(e.target.value))}
                                        aria-label="Gasto mensual en premios o juguetes"
                                        className="w-full accent-indigo-500 h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer"
                                    />
                                    <div className="flex justify-between text-xs text-slate-500 mt-2">
                                        <span>0€</span>
                                        <span className="text-white font-bold">{safetyValue}€</span>
                                        <span>100€</span>
                                    </div>
                                </div>

                                <div className="p-4 bg-slate-950 rounded-xl border border-white/5 space-y-2">
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm text-slate-400">Coste GPS diario:</span>
                                        <span className="text-emerald-400 font-bold">0.16€</span>
                                    </div>
                                    <div className="flex justify-between items-center pt-2 border-t border-white/5">
                                        <span className="text-sm text-slate-400">Ahorro en sustos:</span>
                                        <span className="text-white font-bold">Incalculable</span>
                                    </div>
                                </div>

                                <p className="text-xs text-slate-500 italic text-center leading-relaxed">
                                    "Por menos de lo que cuesta un café a la semana, tendrás a tu perro localizado 24/7 en tu móvil."
                                </p>
                            </div>
                        </div>
                    )}

                    {/* Local Partner Promo (Visible for Food/All) */}
                    {(activeTab === 'all' || activeTab === 'food') && (
                        <div className="bg-gradient-to-br from-emerald-900/40 to-slate-900 rounded-2xl p-6 border border-emerald-500/20">
                            <h3 className="text-lg font-bold text-white mb-4">Apoya al Comercio Local</h3>
                            <p className="text-sm text-slate-300 mb-6 leading-relaxed">
                                Comprando a través de Huellas del Norte ayudas a las tiendas especializadas de tu barrio. Reserva online, recoge cerca de casa y ahorra gastos de envío.
                            </p>
                            <div className="flex -space-x-3 mb-4 pl-3">
                                {[1, 2, 3].map(i => (
                                    <div key={i} className="w-8 h-8 rounded-full bg-slate-700 border-2 border-slate-900 flex items-center justify-center text-xs font-bold text-white">
                                        {i === 3 ? '+20' : ''}
                                    </div>
                                ))}
                            </div>
                            <p className="text-xs text-emerald-400 font-bold">
                                +20 Tiendas en el Norte ya confían.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}

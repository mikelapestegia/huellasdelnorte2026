"use client";
import { CheckCircle2, BarChart3, Search, ShieldCheck, Star, ArrowRight, Building2, Stethoscope, Store } from "lucide-react";

export default function ProfessionalsPage() {
    return (
        <main className="min-h-screen bg-slate-950 text-slate-200">
            {/* Hero Section */}
            <div className="relative pt-32 pb-20 px-4 bg-gradient-to-br from-slate-900 via-indigo-950/20 to-slate-950 border-b border-white/5 overflow-hidden">
                <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center relative z-10">
                    <div className="text-left space-y-8">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-bold mb-4 animate-fade-in-up">
                            <Star className="w-4 h-4 fill-emerald-400 text-emerald-400" />
                            Huellas Partners
                        </div>
                        <h1 className="text-5xl md:text-6xl font-bold text-white tracking-tight leading-tight animate-fade-in-up" style={{ animationDelay: '100ms' }}>
                            Haz que tu negocio <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">deje huella</span> en el norte.
                        </h1>
                        <p className="text-xl text-slate-400 max-w-lg leading-relaxed animate-fade-in-up" style={{ animationDelay: '200ms' }}>
                            Únete a la mayor red de servicios caninos de calidad. Conecta con miles de dueños responsables que buscan lo mejor para sus perros en Euskadi, Cantabria, Asturias y Galicia.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up" style={{ animationDelay: '300ms' }}>
                            <button
                                type="button"
                                className="px-8 py-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold shadow-lg shadow-emerald-900/30 transition-all hover:scale-105 flex items-center justify-center gap-2"
                                aria-label="Crear ficha profesional"
                            >
                                Crear Ficha Profesional
                                <ArrowRight className="w-5 h-5" />
                            </button>
                            <button
                                type="button"
                                className="px-8 py-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold border border-slate-700 transition-colors"
                                aria-label="Agendar una demo"
                            >
                                Agendar Demo
                            </button>
                        </div>
                    </div>
                    {/* Abstract Visual Representation */}
                    <div className="relative hidden lg:block animate-fade-in lg:order-last">
                        <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/20 to-cyan-500/20 blur-3xl rounded-full" />
                        <div className="relative grid grid-cols-2 gap-4">
                            <div className="space-y-4 translate-y-8">
                                <div className="p-6 bg-slate-900 rounded-2xl border border-white/10 shadow-2xl">
                                    <Stethoscope className="w-8 h-8 text-rose-400 mb-4" />
                                    <h3 className="font-bold text-white">Veterinarios</h3>
                                    <p className="text-sm text-slate-400">Gestión de citas y perfil sanitario.</p>
                                </div>
                                <div className="p-6 bg-slate-900 rounded-2xl border border-white/10 shadow-2xl">
                                    <Store className="w-8 h-8 text-amber-400 mb-4" />
                                    <h3 className="font-bold text-white">Tiendas</h3>
                                    <p className="text-sm text-slate-400">Catálogo de productos y ofertas.</p>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <div className="p-6 bg-slate-900 rounded-2xl border border-white/10 shadow-2xl">
                                    <Building2 className="w-8 h-8 text-indigo-400 mb-4" />
                                    <h3 className="font-bold text-white">Hoteles</h3>
                                    <p className="text-sm text-slate-400">Reservas directas y disponibilidad.</p>
                                </div>
                                <div className="p-6 bg-emerald-900/40 rounded-2xl border border-emerald-500/30 shadow-2xl backdrop-blur-sm">
                                    <BarChart3 className="w-8 h-8 text-emerald-400 mb-4" />
                                    <h3 className="font-bold text-white">+300% Visibilidad</h3>
                                    <p className="text-sm text-emerald-200/70">Crecimiento medio de partners.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Benefits Grid */}
            <div className="py-24 bg-slate-950">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-3xl font-bold text-white mb-4">¿Por qué unirte a Huellas Pro?</h2>
                        <p className="text-slate-400 text-lg">
                            No somos un directorio más. Somos la herramienta digital que te ayuda a profesionalizar y escalar tu negocio canino.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: Search,
                                title: "Visibilidad Premium",
                                description: "Aparece primero en las búsquedas por zona y especialidad. Tu ficha destacará sobre la competencia."
                            },
                            {
                                icon: ShieldCheck,
                                title: "Sello de Confianza",
                                description: "La insignia de 'Profesional Verificado' aumenta la tasa de conversión y genera confianza inmediata en los clientes."
                            },
                            {
                                icon: BarChart3,
                                title: "Analítica Avanzada",
                                description: "Entiende quién visita tu perfil. Obtén métricas mensuales de visualizaciones, clics y contactos generados."
                            }
                        ].map((item, idx) => (
                            <div key={idx} className="p-8 rounded-2xl bg-slate-900 border border-white/5 hover:border-emerald-500/20 transition-all hover:bg-slate-800/50">
                                <div className="w-12 h-12 bg-slate-800 rounded-xl flex items-center justify-center mb-6">
                                    <item.icon className="w-6 h-6 text-emerald-400" />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                                <p className="text-slate-400 leading-relaxed">{item.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Pricing Section */}
            <div className="py-24 bg-slate-900/30 border-y border-white/5">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-white mb-4">Planes diseñados para crecer</h2>
                        <p className="text-slate-400">Elige el plan que mejor se adapte a tu etapa actual.</p>
                    </div>

                    <div className="grid lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
                        {/* Basic Plan */}
                        <div className="p-8 rounded-3xl bg-slate-950 border border-white/10 flex flex-col relative overflow-hidden">
                            <div className="mb-4">
                                <h3 className="text-lg font-bold text-slate-400">Básico</h3>
                                <div className="flex items-baseline gap-1 mt-2">
                                    <span className="text-4xl font-bold text-white">0€</span>
                                    <span className="text-slate-500">/mes</span>
                                </div>
                                <p className="text-sm text-slate-500 mt-2">Para empezar a tener presencia.</p>
                            </div>
                            <ul className="space-y-4 mb-8 flex-1">
                                <li className="flex items-center gap-3 text-slate-300 text-sm">
                                    <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" /> Ficha de negocio básica
                                </li>
                                <li className="flex items-center gap-3 text-slate-300 text-sm">
                                    <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" /> Horarios de apertura
                                </li>
                                <li className="flex items-center gap-3 text-slate-300 text-sm">
                                    <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" /> 1 foto de portada
                                </li>
                            </ul>
                            <button
                                type="button"
                                className="w-full py-3 rounded-xl border border-slate-700 text-white font-bold hover:bg-slate-800 transition-colors"
                                aria-label="Empezar plan básico"
                            >
                                Empezar Gratis
                            </button>
                        </div>

                        {/* Pro Plan (Highlighted) */}
                        <div className="p-8 rounded-3xl bg-slate-900 border border-emerald-500/30 flex flex-col relative overflow-hidden shadow-2xl shadow-emerald-900/20 transform scale-105 z-10">
                            <div className="absolute top-0 right-0 bg-emerald-500 text-slate-900 text-xs font-bold px-3 py-1 rounded-bl-xl">
                                RECOMENDADO
                            </div>
                            <div className="mb-4">
                                <h3 className="text-lg font-bold text-emerald-400">Profesional</h3>
                                <div className="flex items-baseline gap-1 mt-2">
                                    <span className="text-4xl font-bold text-white">29€</span>
                                    <span className="text-slate-500">/mes</span>
                                </div>
                                <p className="text-sm text-slate-400 mt-2">Todo lo necesario para destacar.</p>
                            </div>
                            <ul className="space-y-4 mb-8 flex-1">
                                <li className="flex items-center gap-3 text-white text-sm">
                                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" /> <strong>Posicionamiento Prioritario</strong>
                                </li>
                                <li className="flex items-center gap-3 text-white text-sm">
                                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" /> Insignia de Verificación
                                </li>
                                <li className="flex items-center gap-3 text-white text-sm">
                                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" /> Galería ilimitada de fotos
                                </li>
                                <li className="flex items-center gap-3 text-white text-sm">
                                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" /> Enlaces a Redes Sociales y Web
                                </li>
                                <li className="flex items-center gap-3 text-white text-sm">
                                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" /> Estadísticas mensuales
                                </li>
                            </ul>
                            <button
                                type="button"
                                className="w-full py-3 rounded-xl bg-emerald-600 text-white font-bold hover:bg-emerald-500 transition-colors shadow-lg shadow-emerald-900/30"
                                aria-label="Probar plan profesional 14 días"
                            >
                                Probar 14 días gratis
                            </button>
                        </div>

                        {/* Enterprise Plan */}
                        <div className="p-8 rounded-3xl bg-slate-950 border border-white/10 flex flex-col relative overflow-hidden">
                            <div className="mb-4">
                                <h3 className="text-lg font-bold text-slate-200">Corporate</h3>
                                <div className="flex items-baseline gap-1 mt-2">
                                    <span className="text-2xl font-bold text-white">A medida</span>
                                </div>
                                <p className="text-sm text-slate-500 mt-2">Para franquicias y múltiples sedes.</p>
                            </div>
                            <ul className="space-y-4 mb-8 flex-1">
                                <li className="flex items-center gap-3 text-slate-300 text-sm">
                                    <CheckCircle2 className="w-4 h-4 text-slate-500 flex-shrink-0" /> Gestión multi-sede
                                </li>
                                <li className="flex items-center gap-3 text-slate-300 text-sm">
                                    <CheckCircle2 className="w-4 h-4 text-slate-500 flex-shrink-0" /> API de integración
                                </li>
                                <li className="flex items-center gap-3 text-slate-300 text-sm">
                                    <CheckCircle2 className="w-4 h-4 text-slate-500 flex-shrink-0" /> Soporte dedicado 24/7
                                </li>
                            </ul>
                            <button
                                type="button"
                                className="w-full py-3 rounded-xl border border-slate-700 text-white font-bold hover:bg-slate-800 transition-colors"
                                aria-label="Contactar con ventas"
                            >
                                Contactar Ventas
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

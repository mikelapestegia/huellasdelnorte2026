"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
    Heart,
    HandHeart,
    Star,
    Crown,
    CheckCircle2,
    ArrowRight,
    MessageCircleHeart,
    Info,
    Gift,
    Calendar,
    Video,
    PawPrint,
    AlertCircle
} from "lucide-react";

import { sponsorshipPlans, dogsNeedingSponsorship } from "@/data/sponsorship";
import { adoptionDogs, type AdoptionDog } from "@/data/adoptionDogs";

const icons = {
    paw: PawPrint,
    heart: Heart,
    star: Star,
    crown: Crown
};

export default function ApadrinarPage() {
    // Get full dog objects for sponsorship needs
    const urgentCases = useMemo(() => {
        return dogsNeedingSponsorship.map(need => {
            const dog = adoptionDogs.find(d => d.id === need.dogId);
            return dog ? { ...dog, reason: need.reason, monthlyCost: need.monthlyCost } : null;
        }).filter(Boolean) as (AdoptionDog & { reason: string, monthlyCost: number })[];
    }, []);

    const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

    return (
        <main className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 pb-16">
            {/* Hero Section */}
            <section className="relative overflow-hidden py-16 md:py-24">
                <div className="absolute inset-0 bg-gradient-to-br from-amber-900/30 via-transparent to-pink-900/20" />
                <div className="absolute top-20 left-10 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl" />
                <div className="absolute bottom-10 right-10 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl" />

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/15 border border-amber-500/30 mb-6">
                        <HandHeart className="w-4 h-4 text-amber-400" />
                        <span className="text-sm text-amber-300">Conviértete en Padrino</span>
                    </div>

                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                        Apadrina y cambia su vida
                        <span className="block mt-2 bg-gradient-to-r from-amber-400 via-orange-400 to-pink-400 bg-clip-text text-transparent">
                            Sin adoptar
                        </span>
                    </h1>

                    <p className="text-lg text-slate-300 max-w-2xl mx-auto mb-10">
                        No todos pueden adoptar, pero todos pueden ayudar. Con una pequeña aportación mensual,
                        garantizas alimentación, cuidados veterinarios y cariño para los perros que más lo necesitan.
                    </p>

                    <div className="flex flex-wrap justify-center gap-4">
                        <a href="#planes" className="px-8 py-4 bg-amber-500 hover:bg-amber-600 text-white font-medium rounded-xl transition-all shadow-lg shadow-amber-500/20 hover:scale-105">
                            Ver planes de ayuda
                        </a>
                        <a href="#casos-urgentes" className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-medium rounded-xl transition-all backdrop-blur-sm border border-white/10 hover:border-white/20">
                            Conocer casos urgentes
                        </a>
                    </div>
                </div>
            </section>

            {/* Why Sponsor Section */}
            <section className="max-w-7xl mx-auto px-4 py-12">
                <div className="grid md:grid-cols-3 gap-8">
                    <div className="bg-white/5 p-8 rounded-3xl border border-white/10 backdrop-blur-sm">
                        <div className="w-12 h-12 bg-pink-500/20 rounded-2xl flex items-center justify-center mb-6">
                            <Heart className="w-6 h-6 text-pink-400" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-3">Vínculo especial</h3>
                        <p className="text-slate-400">
                            Recibirás fotos, vídeos y noticias personalizadas de tu ahijado. Podrás visitarlo y crear una relación única.
                        </p>
                    </div>
                    <div className="bg-white/5 p-8 rounded-3xl border border-white/10 backdrop-blur-sm">
                        <div className="w-12 h-12 bg-emerald-500/20 rounded-2xl flex items-center justify-center mb-6">
                            <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-3">Ayuda tangible</h3>
                        <p className="text-slate-400">
                            Tu aportación va íntegra a sus cuidados: pienso de calidad, medicación, mantas y tratamientos.
                        </p>
                    </div>
                    <div className="bg-white/5 p-8 rounded-3xl border border-white/10 backdrop-blur-sm">
                        <div className="w-12 h-12 bg-blue-500/20 rounded-2xl flex items-center justify-center mb-6">
                            <MessageCircleHeart className="w-6 h-6 text-blue-400" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-3">Comunidad Padrinos</h3>
                        <p className="text-slate-400">
                            Accede a eventos exclusivos para padrinos, jornadas de puertas abiertas y descuentos en colaboradores.
                        </p>
                    </div>
                </div>
            </section>

            {/* Urgent Cases Section */}
            <section id="casos-urgentes" className="max-w-7xl mx-auto px-4 py-16">
                <div className="flex items-center gap-3 mb-8">
                    <AlertCircle className="w-6 h-6 text-red-400" />
                    <h2 className="text-2xl md:text-3xl font-bold text-white">Necesitan tu ayuda ahora</h2>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                    {urgentCases.map((dog) => (
                        <div key={dog.id} className="group relative bg-slate-800/50 rounded-2xl overflow-hidden border border-white/10 hover:border-red-500/30 transition-all">
                            <div className="relative h-48 w-full">
                                {dog.photos[0] ? (
                                    <Image
                                        src={dog.photos[0]}
                                        alt={dog.name}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                ) : (
                                    <div className="w-full h-full bg-slate-700 flex items-center justify-center">
                                        <PawPrint className="w-12 h-12 text-slate-500" />
                                    </div>
                                )}
                                <div className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                                    Necesita {dog.monthlyCost}€/mes
                                </div>
                            </div>

                            <div className="p-6">
                                <h3 className="text-xl font-bold text-white mb-1">{dog.name}</h3>
                                <p className="text-sm text-slate-400 mb-4">{dog.breed}, {dog.age}</p>

                                <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 mb-6">
                                    <p className="text-red-200 text-sm font-medium">
                                        <Info className="w-4 h-4 inline mr-2" />
                                        {dog.reason}
                                    </p>
                                </div>

                                <Link
                                    href={`/adopcion/${dog.id}`}
                                    className="block w-full text-center py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors mb-2"
                                >
                                    Ver historia completa
                                </Link>
                                <button className="block w-full py-2 bg-red-500 hover:bg-red-600 text-white font-medium rounded-lg transition-colors">
                                    Apadrinar a {dog.name}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Plans Section */}
            <section id="planes" className="max-w-7xl mx-auto px-4 py-16 bg-slate-900/50">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Elige tu huella</h2>
                    <p className="text-slate-400 max-w-2xl mx-auto">
                        Selecciona el plan de apadrinamiento que mejor se adapte a ti.
                        Puedes cambiar o cancelar tu suscripción en cualquier momento.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {sponsorshipPlans.map((plan) => {
                        const Icon = icons[plan.icon];
                        const isSelected = selectedPlan === plan.id;

                        return (
                            <div
                                key={plan.id}
                                className={`relative flex flex-col p-6 rounded-3xl border transition-all duration-300 ${isSelected
                                        ? "bg-slate-800 border-amber-500 scale-105 shadow-xl shadow-amber-500/10 z-10"
                                        : "bg-slate-800/30 border-white/10 hover:border-white/20 hover:bg-slate-800/50"
                                    }`}
                                onClick={() => setSelectedPlan(plan.id)}
                            >
                                {plan.isPopular && (
                                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-pink-500 to-rose-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                                        MÁS POPULAR
                                    </div>
                                )}

                                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${plan.color} flex items-center justify-center mb-6 shadow-lg`}>
                                    <Icon className="w-6 h-6 text-white" />
                                </div>

                                <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                                <div className="flex items-baseline gap-1 mb-4">
                                    <span className="text-3xl font-bold text-white">{plan.price}€</span>
                                    <span className="text-slate-400 text-sm">/mes</span>
                                </div>

                                <p className="text-sm text-slate-300 mb-6 min-h-[3rem]">
                                    {plan.description}
                                </p>

                                <ul className="space-y-3 mb-8 flex-grow">
                                    {plan.benefits.map((benefit, idx) => (
                                        <li key={idx} className="flex items-start gap-2 text-sm text-slate-400">
                                            <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                                            <span>{benefit}</span>
                                        </li>
                                    ))}
                                </ul>

                                <button
                                    className={`w-full py-3 rounded-xl font-medium transition-all flex items-center justify-center gap-2 ${isSelected
                                            ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg shadow-amber-500/20"
                                            : "bg-white/10 text-white hover:bg-white/20"
                                        }`}
                                >
                                    Elegir {plan.name} <ArrowRight className="w-4 h-4" />
                                </button>
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* FAQ / Info */}
            <section className="max-w-4xl mx-auto px-4 py-16 text-center">
                <div className="bg-white/5 rounded-3xl p-8 md:p-12 border border-white/10">
                    <h2 className="text-2xl font-bold text-white mb-4">¿Tienes dudas sobre el apadrinamiento?</h2>
                    <p className="text-slate-400 mb-8">
                        Escríbenos y estaremos encantados de explicarte cómo tu ayuda transforma vidas.
                        También puedes regalar un apadrinamiento a un ser querido.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <button className="flex items-center gap-2 px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-medium rounded-xl transition-colors">
                            <MessageCircleHeart className="w-5 h-5" />
                            Contactar con Padrinos
                        </button>
                        <button className="flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-medium rounded-xl transition-colors border border-white/10">
                            <Gift className="w-5 h-5" />
                            Regalar Apadrinamiento
                        </button>
                    </div>
                </div>
            </section>
        </main>
    );
}

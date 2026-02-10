"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { Link } from "@/navigation";
import { ArrowRight, MapPin, Route, FileCheck, Users, Map, Heart } from "lucide-react";

export default function Hero() {
    const t = useTranslations("hero");

    return (
        <section className="relative h-screen w-full overflow-hidden bg-primary/10">
            {/* Background Image */}
            <div className="absolute inset-0 z-0 opacity-90">
                <Image
                    src="https://images.unsplash.com/photo-1518717758536-85ae29035b6d?q=80&w=2670&auto=format&fit=crop"
                    alt="Hero background"
                    fill
                    priority
                    className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-background" />
            </div>

            {/* Main Content */}
            <div className="relative z-10 flex h-full flex-col items-start justify-center px-4 md:px-12 lg:px-24">
                <div className="max-w-3xl space-y-6">
                    {/* Badge */}
                    <div className="inline-flex items-center space-x-2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium text-white backdrop-blur-md animate-fade-in" style={{ animationDelay: '200ms' }}>
                        <MapPin className="h-4 w-4 text-accent animate-pulse-soft" />
                        <span>{t("badge")}</span>
                    </div>

                    {/* Title with staggered animation */}
                    <h1 className="font-serif text-5xl font-bold leading-tight text-white md:text-7xl">
                        <span className="animate-fade-in-up block" style={{ animationDelay: '300ms' }}>
                            {t("title1")}
                        </span>
                        <span className="text-gradient animate-fade-in-up block" style={{ animationDelay: '500ms' }}>
                            {t("title2")}
                        </span>
                    </h1>

                    {/* Description */}
                    <p className="max-w-xl text-lg text-white/90 md:text-xl animate-fade-in-up" style={{ animationDelay: '600ms' }}>
                        {t("description")}
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-col gap-4 sm:flex-row animate-fade-in-up" style={{ animationDelay: '700ms' }}>
                        <Link
                            href="/rutas"
                            className="group inline-flex items-center justify-center rounded-lg bg-accent px-8 py-4 text-lg font-semibold text-white transition-all hover:bg-accent/90 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 shadow-lg shadow-accent/20"
                        >
                            <Route className="mr-2 h-5 w-5" />
                            {t("cta_routes")}
                            <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                        </Link>
                        <Link
                            href="/pasaporte"
                            className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/30 bg-white/10 px-8 py-4 text-lg font-semibold text-white transition-all hover:bg-white/20 hover:scale-105 backdrop-blur-sm"
                        >
                            <FileCheck className="h-5 w-5" />
                            {t("cta_passport")}
                        </Link>
                    </div>

                    {/* Stats row */}
                    <div className="flex flex-wrap gap-8 pt-6 animate-fade-in-up" style={{ animationDelay: '900ms' }}>
                        <div className="flex items-center gap-2">
                            <div className="h-10 w-10 rounded-lg bg-white/10 backdrop-blur-sm flex items-center justify-center">
                                <Map className="h-5 w-5 text-emerald-400" />
                            </div>
                            <div>
                                <p className="text-xl font-bold text-white">2.500+</p>
                                <p className="text-xs text-white/60">{t("stat_points") ?? "Puntos en mapa"}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="h-10 w-10 rounded-lg bg-white/10 backdrop-blur-sm flex items-center justify-center">
                                <Route className="h-5 w-5 text-emerald-400" />
                            </div>
                            <div>
                                <p className="text-xl font-bold text-white">150+</p>
                                <p className="text-xs text-white/60">{t("stat_routes") ?? "Rutas verificadas"}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="h-10 w-10 rounded-lg bg-white/10 backdrop-blur-sm flex items-center justify-center">
                                <Heart className="h-5 w-5 text-emerald-400" />
                            </div>
                            <div>
                                <p className="text-xl font-bold text-white">300+</p>
                                <p className="text-xs text-white/60">{t("stat_adoptions") ?? "Adopciones"}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Scroll indicator */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-float">
                <div className="flex flex-col items-center gap-2">
                    <div className="h-8 w-5 rounded-full border-2 border-white/40 flex justify-center pt-1.5">
                        <div className="h-2 w-1 rounded-full bg-white/60 animate-pulse-soft" />
                    </div>
                </div>
            </div>
        </section>
    );
}

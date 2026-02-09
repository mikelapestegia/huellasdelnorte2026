"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { Link } from "@/navigation";
import { ArrowRight, MapPin, Route, FileCheck } from "lucide-react";

export default function Hero() {
    const t = useTranslations("hero");

    return (
        <section className="relative h-screen w-full overflow-hidden bg-primary/10">
            {/* Background Image Placeholder */}
            {/* Background Image Placeholder */}
            <div className="absolute inset-0 z-0 opacity-90">
                <Image
                    src="https://images.unsplash.com/photo-1518717758536-85ae29035b6d?q=80&w=2670&auto=format&fit=crop"
                    alt="Hero background"
                    fill
                    priority
                    className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/10 to-background/90" />
            </div>

            <div className="relative z-10 flex h-full flex-col items-start justify-center px-4 md:px-12 lg:px-24">
                <div className="max-w-3xl animate-fade-in-up space-y-6">
                    <div className="inline-flex items-center space-x-2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium text-white backdrop-blur-md">
                        <MapPin className="h-4 w-4 text-accent" />
                        <span>{t("badge")}</span>
                    </div>

                    <h1 className="font-serif text-5xl font-bold leading-tight text-white md:text-7xl">
                        {t("title1")} <br />
                        <span className="text-secondary">{t("title2")}</span>
                    </h1>

                    <p className="max-w-xl text-lg text-white/90 md:text-xl">
                        {t("description")}
                    </p>

                    <div className="flex flex-col gap-4 sm:flex-row">
                        <Link
                            href="/rutas"
                            className="group inline-flex items-center justify-center rounded-lg bg-accent px-8 py-4 text-lg font-semibold text-white transition-all hover:bg-accent/90 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
                        >
                            <Route className="mr-2 h-5 w-5" />
                            {t("cta_routes")}
                            <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                        </Link>
                        <Link
                            href="/pasaporte"
                            className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/30 bg-white/10 px-8 py-4 text-lg font-semibold text-white transition-all hover:bg-white/20 backdrop-blur-sm"
                        >
                            <FileCheck className="h-5 w-5" />
                            {t("cta_passport")}
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}

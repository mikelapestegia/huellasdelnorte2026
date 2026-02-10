"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { MapPin, Droplets, TreeDeciduous, Mountain, Waves, Leaf, Zap } from "lucide-react";
import { RouteCatalogItem } from "@/data/routesCatalog";

interface RouteCardProps {
    route: RouteCatalogItem;
    onClick?: () => void;
}

const difficultyColors = {
    easy: "bg-green-100 text-green-800 border-green-200",
    moderate: "bg-amber-100 text-amber-800 border-amber-200",
    hard: "bg-red-100 text-red-800 border-red-200",
};

const environmentIcons: Record<string, React.ReactNode> = {
    río: <Droplets className="h-3.5 w-3.5" />,
    sombra: <TreeDeciduous className="h-3.5 w-3.5" />,
    montaña: <Mountain className="h-3.5 w-3.5" />,
    costa: <Waves className="h-3.5 w-3.5" />,
    bosque: <Leaf className="h-3.5 w-3.5" />,
    cascada: <Zap className="h-3.5 w-3.5" />, // Usando Zap temporalmente o buscando otro icono mejor
    valle: <Mountain className="h-3.5 w-3.5" />,
};

export default function RouteCard({ route, onClick }: RouteCardProps) {
    const t = useTranslations("routes");

    const distance = route.distanceKmMax
        ? `${route.distanceKmMin}-${route.distanceKmMax} ${t("card.distance")}`
        : `${route.distanceKmMin} ${t("card.distance")}`;

    return (
        <Link
            href={`/rutas/${route.id}`}
            onClick={onClick}
            className="group block w-full text-left rounded-3xl border border-border bg-card shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden"
        >
            {/* Image placeholder with gradient */}
            <div className="relative h-48 bg-gradient-to-br from-primary/10 to-accent/10 overflow-hidden">
                {/* Decorative background pattern or image */}
                <div className="absolute inset-0 bg-secondary/20 mix-blend-overlay" />

                {/* Fallback Icon */}
                <div className="absolute inset-0 flex items-center justify-center opacity-[0.07] group-hover:scale-110 transition-transform duration-700">
                    <Mountain className="h-32 w-32 text-primary" />
                </div>

                {/* Region badge */}
                <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-background/95 backdrop-blur-md text-xs font-bold text-foreground border border-border/50 shadow-sm z-20">
                    {route.region}
                </div>

                {/* Bathing badge */}
                {route.bathingAllowed && (
                    <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-blue-500/90 backdrop-blur-md text-white text-xs font-bold flex items-center gap-1.5 shadow-sm z-20 border border-blue-400/50">
                        <Droplets className="h-3 w-3 fill-current" />
                        {t("card.bathing")}
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="p-6 space-y-4">
                <div>
                    <div className="flex items-center justify-between mb-2">
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${difficultyColors[route.difficulty]}`}>
                            {t(`difficulty.${route.difficulty}`)}
                        </span>

                        <div className="flex items-center text-xs font-medium text-foreground/50 bg-secondary/50 px-2 py-1 rounded-lg">
                            {route.routeType === "Andando" ? "🚶" : route.routeType === "Bici" ? "🚴" : "🚶🚴"}
                            <span className="ml-1">{t(`route_type.${route.routeType}`)}</span>
                        </div>
                    </div>

                    <h3 className="font-serif text-xl font-bold text-foreground group-hover:text-primary transition-colors line-clamp-1 leading-tight">
                        {route.name}
                    </h3>
                    <p className="text-sm text-foreground/70 line-clamp-2 mt-2 leading-relaxed">
                        {/* Intentar traducir highlight si existe key, sino mostrar original */}
                        {route.highlight}
                    </p>
                </div>

                {/* Divider */}
                <div className="h-px w-full bg-border/50" />

                <div className="flex items-center justify-between">
                    {/* Stats */}
                    <span className="flex items-center gap-1.5 font-semibold text-sm text-foreground/80">
                        <MapPin className="h-4 w-4 text-primary" />
                        {distance}
                    </span>

                    {/* Environment tags compact */}
                    <div className="flex -space-x-1">
                        {route.environment.slice(0, 3).map((env, i) => (
                            <div
                                key={env}
                                className="h-7 w-7 rounded-full bg-secondary border-2 border-card flex items-center justify-center text-foreground/70"
                                title={t(`environment.${env}`)}
                            >
                                {environmentIcons[env] || <Mountain className="h-3.5 w-3.5" />}
                            </div>
                        ))}
                        {route.environment.length > 3 && (
                            <div className="h-7 w-7 rounded-full bg-secondary border-2 border-card flex items-center justify-center text-[10px] font-bold text-foreground/70">
                                +{route.environment.length - 3}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </Link>
    );
}

import Link from "next/link";
import { MapPin, Droplets, TreeDeciduous, Mountain } from "lucide-react";
import { RouteCatalogItem } from "@/data/routesCatalog";

interface RouteCardProps {
    route: RouteCatalogItem;
    onClick?: () => void;
}

const difficultyColors = {
    easy: "bg-green-100 text-green-800",
    moderate: "bg-amber-100 text-amber-800",
    hard: "bg-red-100 text-red-800",
};

const difficultyLabels = {
    easy: "Fácil",
    moderate: "Moderada",
    hard: "Difícil",
};

const environmentIcons: Record<string, React.ReactNode> = {
    río: <Droplets className="h-3.5 w-3.5" />,
    sombra: <TreeDeciduous className="h-3.5 w-3.5" />,
    montaña: <Mountain className="h-3.5 w-3.5" />,
};

export default function RouteCard({ route, onClick }: RouteCardProps) {
    const distance = route.distanceKmMax
        ? `${route.distanceKmMin}-${route.distanceKmMax} km`
        : `${route.distanceKmMin} km`;

    return (
        <Link
            href={`/rutas/${route.id}`}
            onClick={onClick}
            className="block w-full text-left rounded-2xl border border-border bg-card shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group"
        >
            {/* Image placeholder with gradient */}
            <div className="relative h-40 bg-gradient-to-br from-primary/20 to-accent/20 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

                {/* Region badge */}
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-card/90 backdrop-blur-sm text-xs font-semibold text-foreground">
                    {route.region}
                </div>

                {/* Bathing badge */}
                {route.bathingAllowed && (
                    <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-blue-500 text-white text-xs font-semibold flex items-center gap-1">
                        <Droplets className="h-3 w-3" />
                        Baño
                    </div>
                )}

                {/* Route type icon */}
                <div className="absolute bottom-3 right-3 h-10 w-10 rounded-full bg-card/90 backdrop-blur-sm flex items-center justify-center text-primary font-bold text-xs">
                    {route.routeType === "Andando" ? "🚶" : route.routeType === "Bici" ? "🚴" : "🚶🚴"}
                </div>
            </div>

            {/* Content */}
            <div className="p-4 space-y-3">
                <div>
                    <h3 className="font-serif text-lg font-bold text-foreground group-hover:text-primary transition-colors line-clamp-1">
                        {route.name}
                    </h3>
                    <p className="text-sm text-foreground/70 line-clamp-2 mt-1">
                        {route.highlight}
                    </p>
                </div>

                {/* Stats row */}
                <div className="flex items-center gap-4 text-sm text-foreground/60">
                    <span className="flex items-center gap-1.5">
                        <MapPin className="h-4 w-4" />
                        {distance}
                    </span>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${difficultyColors[route.difficulty]}`}>
                        {difficultyLabels[route.difficulty]}
                    </span>
                </div>

                {/* Environment tags */}
                <div className="flex flex-wrap gap-1.5">
                    {route.environment.slice(0, 4).map((env) => (
                        <span
                            key={env}
                            className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-secondary/50 text-xs text-foreground/70"
                        >
                            {environmentIcons[env] || null}
                            {env}
                        </span>
                    ))}
                </div>
            </div>
        </Link>
    );
}

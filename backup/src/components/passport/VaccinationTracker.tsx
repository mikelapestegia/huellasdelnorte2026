import { Syringe, AlertCircle, CheckCircle2, Clock } from "lucide-react";

export interface Vaccination {
    id: string;
    name: string;
    date: string;
    expiresAt?: string;
    veterinarian: string;
    status: "valid" | "expiring" | "expired";
}

interface VaccinationTrackerProps {
    vaccinations: Vaccination[];
}

const statusConfig = {
    valid: {
        icon: CheckCircle2,
        color: "text-green-600",
        bgColor: "bg-green-50",
        borderColor: "border-green-200",
        label: "Vigente",
    },
    expiring: {
        icon: Clock,
        color: "text-amber-600",
        bgColor: "bg-amber-50",
        borderColor: "border-amber-200",
        label: "Próxima a vencer",
    },
    expired: {
        icon: AlertCircle,
        color: "text-red-600",
        bgColor: "bg-red-50",
        borderColor: "border-red-200",
        label: "Vencida",
    },
};

export default function VaccinationTracker({ vaccinations }: VaccinationTrackerProps) {
    const sortedVaccinations = [...vaccinations].sort((a, b) => {
        const priority = { expired: 0, expiring: 1, valid: 2 };
        return priority[a.status] - priority[b.status];
    });

    return (
        <div className="rounded-2xl border border-border bg-white shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-border bg-secondary/20">
                <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <Syringe className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                        <h3 className="font-serif text-lg font-bold text-foreground">Historial de Vacunas</h3>
                        <p className="text-sm text-foreground/60">
                            {vaccinations.filter(v => v.status === "valid").length} de {vaccinations.length} vigentes
                        </p>
                    </div>
                </div>
            </div>

            <div className="divide-y divide-border">
                {sortedVaccinations.map((vaccine) => {
                    const config = statusConfig[vaccine.status];
                    const StatusIcon = config.icon;

                    return (
                        <div
                            key={vaccine.id}
                            className={`px-6 py-4 ${config.bgColor} transition-colors hover:brightness-[0.98]`}
                        >
                            <div className="flex items-start justify-between">
                                <div className="flex-1">
                                    <div className="flex items-center gap-2">
                                        <h4 className="font-semibold text-foreground">{vaccine.name}</h4>
                                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${config.color} ${config.bgColor} border ${config.borderColor}`}>
                                            <StatusIcon className="h-3 w-3" />
                                            {config.label}
                                        </span>
                                    </div>
                                    <p className="text-sm text-foreground/60 mt-1">
                                        Aplicada: {formatDate(vaccine.date)}
                                        {vaccine.expiresAt && ` · Vence: ${formatDate(vaccine.expiresAt)}`}
                                    </p>
                                    <p className="text-xs text-foreground/50 mt-0.5">
                                        {vaccine.veterinarian}
                                    </p>
                                </div>

                                {vaccine.status === "expired" && (
                                    <button
                                        type="button"
                                        className="px-3 py-1.5 rounded-lg bg-primary text-white text-sm font-medium hover:bg-primary/90 transition-colors"
                                    >
                                        Renovar
                                    </button>
                                )}
                            </div>
                        </div>
                    );
                })}

                {vaccinations.length === 0 && (
                    <div className="px-6 py-8 text-center">
                        <Syringe className="h-12 w-12 text-foreground/20 mx-auto mb-3" />
                        <p className="text-foreground/60">No hay vacunas registradas</p>
                        <button
                            type="button"
                            className="mt-3 text-primary font-medium hover:underline"
                        >
                            Añadir primera vacuna
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

function formatDate(dateStr: string): string {
    const date = new Date(dateStr);
    return date.toLocaleDateString("es-ES", {
        day: "numeric",
        month: "short",
        year: "numeric",
    });
}

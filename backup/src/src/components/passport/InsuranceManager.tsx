import { Shield, AlertTriangle, CheckCircle2, ExternalLink } from "lucide-react";

export interface InsurancePolicy {
    id: string;
    provider: string;
    policyNumber: string;
    coverage: string;
    startDate: string;
    endDate: string;
    status: "active" | "expiring" | "expired";
    monthlyPremium?: number;
}

interface InsuranceManagerProps {
    policies: InsurancePolicy[];
}

export default function InsuranceManager({ policies }: InsuranceManagerProps) {
    const activePolicy = policies.find(p => p.status === "active" || p.status === "expiring");
    const daysUntilExpiry = activePolicy ? calculateDaysUntil(activePolicy.endDate) : 0;

    return (
        <div className="rounded-2xl border border-border bg-white shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-border bg-secondary/20">
                <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <Shield className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                        <h3 className="font-serif text-lg font-bold text-foreground">Seguro de Responsabilidad Civil</h3>
                        <p className="text-sm text-foreground/60">Obligatorio según Ley de Bienestar Animal</p>
                    </div>
                </div>
            </div>

            {activePolicy ? (
                <div className="p-6">
                    {/* Status banner */}
                    {activePolicy.status === "expiring" && (
                        <div className="mb-4 px-4 py-3 rounded-xl bg-amber-50 border border-amber-200 flex items-start gap-3">
                            <AlertTriangle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                            <div>
                                <p className="font-medium text-amber-800">Tu seguro vence en {daysUntilExpiry} días</p>
                                <p className="text-sm text-amber-700">Renuévalo antes del {formatDate(activePolicy.endDate)} para evitar sanciones.</p>
                            </div>
                        </div>
                    )}

                    {activePolicy.status === "active" && (
                        <div className="mb-4 px-4 py-3 rounded-xl bg-green-50 border border-green-200 flex items-center gap-3">
                            <CheckCircle2 className="h-5 w-5 text-green-600" />
                            <p className="font-medium text-green-800">Seguro activo · Válido hasta {formatDate(activePolicy.endDate)}</p>
                        </div>
                    )}

                    {/* Policy details */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <p className="text-xs text-foreground/60 mb-0.5">Aseguradora</p>
                            <p className="font-semibold text-foreground">{activePolicy.provider}</p>
                        </div>
                        <div>
                            <p className="text-xs text-foreground/60 mb-0.5">Nº de Póliza</p>
                            <p className="font-mono text-sm text-foreground">{activePolicy.policyNumber}</p>
                        </div>
                        <div>
                            <p className="text-xs text-foreground/60 mb-0.5">Cobertura</p>
                            <p className="font-semibold text-foreground">{activePolicy.coverage}</p>
                        </div>
                        <div>
                            <p className="text-xs text-foreground/60 mb-0.5">Vigencia</p>
                            <p className="text-sm text-foreground">
                                {formatDate(activePolicy.startDate)} - {formatDate(activePolicy.endDate)}
                            </p>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="mt-6 flex flex-col sm:flex-row gap-3">
                        <button
                            type="button"
                            className="flex-1 px-4 py-3 rounded-xl bg-primary text-white font-medium hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
                        >
                            <Shield className="h-4 w-4" />
                            {activePolicy.status === "expiring" ? "Renovar ahora" : "Ver detalles"}
                        </button>
                        <button
                            type="button"
                            className="flex-1 px-4 py-3 rounded-xl border border-border text-foreground font-medium hover:bg-secondary/30 transition-colors flex items-center justify-center gap-2"
                        >
                            Comparar seguros
                            <ExternalLink className="h-4 w-4" />
                        </button>
                    </div>
                </div>
            ) : (
                <div className="p-6 text-center">
                    <div className="h-16 w-16 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
                        <AlertTriangle className="h-8 w-8 text-red-600" />
                    </div>
                    <h4 className="font-semibold text-foreground mb-2">Sin seguro activo</h4>
                    <p className="text-sm text-foreground/60 mb-4">
                        El seguro de responsabilidad civil es obligatorio. Contrata uno ahora.
                    </p>
                    <button
                        type="button"
                        className="px-6 py-3 rounded-xl bg-primary text-white font-medium hover:bg-primary/90 transition-colors"
                    >
                        Ver opciones de seguro
                    </button>
                </div>
            )}
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

function calculateDaysUntil(dateStr: string): number {
    const target = new Date(dateStr);
    const now = new Date();
    const diff = target.getTime() - now.getTime();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

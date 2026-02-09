import { Bell, AlertTriangle, Clock, CheckCircle2, ChevronRight } from "lucide-react";

export interface LegalAlert {
    id: string;
    type: "insurance_expiry" | "solitude_warning" | "vaccination_due" | "course_reminder" | "registration_update";
    title: string;
    message: string;
    severity: "critical" | "warning" | "info";
    createdAt: string;
    actionLabel?: string;
    actionUrl?: string;
    dismissed?: boolean;
}

interface LegalAlertsProps {
    alerts: LegalAlert[];
    onDismiss?: (alertId: string) => void;
    onAction?: (alert: LegalAlert) => void;
}

const severityConfig = {
    critical: {
        icon: AlertTriangle,
        bgColor: "bg-red-50",
        borderColor: "border-red-200",
        iconColor: "text-red-600",
        textColor: "text-red-800",
    },
    warning: {
        icon: Clock,
        bgColor: "bg-amber-50",
        borderColor: "border-amber-200",
        iconColor: "text-amber-600",
        textColor: "text-amber-800",
    },
    info: {
        icon: CheckCircle2,
        bgColor: "bg-blue-50",
        borderColor: "border-blue-200",
        iconColor: "text-blue-600",
        textColor: "text-blue-800",
    },
};

const typeLabels = {
    insurance_expiry: "Seguro",
    solitude_warning: "Supervisión 24h",
    vaccination_due: "Vacunación",
    course_reminder: "Formación",
    registration_update: "Registro",
};

export default function LegalAlerts({ alerts, onDismiss, onAction }: LegalAlertsProps) {
    const activeAlerts = alerts.filter(a => !a.dismissed);
    const sortedAlerts = [...activeAlerts].sort((a, b) => {
        const priority = { critical: 0, warning: 1, info: 2 };
        return priority[a.severity] - priority[b.severity];
    });

    const criticalCount = activeAlerts.filter(a => a.severity === "critical").length;
    const warningCount = activeAlerts.filter(a => a.severity === "warning").length;

    return (
        <div className="rounded-2xl border border-border bg-card shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-border bg-secondary/20">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                                <Bell className="h-5 w-5 text-primary" />
                            </div>
                            {criticalCount > 0 && (
                                <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 text-white text-xs font-bold flex items-center justify-center">
                                    {criticalCount}
                                </span>
                            )}
                        </div>
                        <div>
                            <h3 className="font-serif text-lg font-bold text-foreground">Alertas Legales</h3>
                            <p className="text-sm text-foreground/60">
                                {activeAlerts.length === 0
                                    ? "Todo en orden ✓"
                                    : `${criticalCount} críticas · ${warningCount} avisos`
                                }
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="divide-y divide-border">
                {sortedAlerts.map((alert) => {
                    const config = severityConfig[alert.severity];
                    const Icon = config.icon;

                    return (
                        <div
                            key={alert.id}
                            className={`px-6 py-4 ${config.bgColor} transition-colors`}
                        >
                            <div className="flex items-start gap-4">
                                <div className={`flex-shrink-0 h-9 w-9 rounded-full ${config.bgColor} border ${config.borderColor} flex items-center justify-center`}>
                                    <Icon className={`h-5 w-5 ${config.iconColor}`} />
                                </div>

                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className={`text-xs font-semibold uppercase tracking-wide ${config.iconColor}`}>
                                            {typeLabels[alert.type]}
                                        </span>
                                        <span className="text-xs text-foreground/50">
                                            {formatTimeAgo(alert.createdAt)}
                                        </span>
                                    </div>
                                    <h4 className={`font-semibold ${config.textColor}`}>{alert.title}</h4>
                                    <p className="text-sm text-foreground/70 mt-0.5">{alert.message}</p>

                                    {alert.actionLabel && (
                                        <button
                                            type="button"
                                            onClick={() => onAction?.(alert)}
                                            className={`mt-2 inline-flex items-center gap-1 text-sm font-medium ${config.iconColor} hover:underline`}
                                        >
                                            {alert.actionLabel}
                                            <ChevronRight className="h-4 w-4" />
                                        </button>
                                    )}
                                </div>

                                {onDismiss && (
                                    <button
                                        type="button"
                                        onClick={() => onDismiss(alert.id)}
                                        className="flex-shrink-0 p-1 rounded hover:bg-white/50 transition-colors"
                                        aria-label="Descartar"
                                    >
                                        <span className="text-foreground/40 hover:text-foreground/60">✕</span>
                                    </button>
                                )}
                            </div>
                        </div>
                    );
                })}

                {activeAlerts.length === 0 && (
                    <div className="px-6 py-8 text-center bg-green-50">
                        <CheckCircle2 className="h-12 w-12 text-green-500 mx-auto mb-3" />
                        <p className="font-medium text-green-800">¡Todo en regla!</p>
                        <p className="text-sm text-green-700">No tienes alertas pendientes.</p>
                    </div>
                )}
            </div>
        </div>
    );
}

function formatTimeAgo(dateStr: string): string {
    const date = new Date(dateStr);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);

    if (days > 0) return `hace ${days}d`;
    if (hours > 0) return `hace ${hours}h`;
    return "ahora";
}

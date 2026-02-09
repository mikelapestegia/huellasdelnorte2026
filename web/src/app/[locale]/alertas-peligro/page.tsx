"use client";

import { useState, useRef, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import {
    AlertTriangle,
    Upload,
    Camera,
    X,
    MapPin,
    Phone,
    Mail,
    Calendar,
    Info,
    CheckCircle2,
    Bell,
    Share2,
    Shield,
    Skull,
    Eye,
    Clock,
    ChevronRight,
    Loader2,
    AlertOctagon,
    FileWarning,
    Users,
    Siren,
} from "lucide-react";

type DangerType =
    | "veneno"
    | "alfileres"
    | "cristales"
    | "clavos"
    | "raticida"
    | "anticongelante"
    | "cebo_sospechoso"
    | "otro";

type SeverityLevel = "alta" | "media" | "confirmado";

interface DangerReportForm {
    // Danger info
    dangerType: DangerType;
    otherDescription: string;
    severity: SeverityLevel;

    // Location info
    location: string;
    locationDetails: string;
    city: string;
    region: string;

    // Time info
    discoveryDate: string;
    discoveryTime: string;

    // Details
    description: string;
    wasConsumed: boolean;
    animalAffected: boolean;
    animalCondition: string;
    authoritiesNotified: boolean;
    policeReportNumber: string;

    // Contact info
    reporterName: string;
    reporterPhone: string;
    reporterEmail: string;
    allowContact: boolean;
    anonymous: boolean;

    // Photos
    photos: File[];
    photoPreviews: string[];
}

const initialFormState: DangerReportForm = {
    dangerType: "cebo_sospechoso",
    otherDescription: "",
    severity: "media",
    location: "",
    locationDetails: "",
    city: "",
    region: "Euskadi",
    discoveryDate: "",
    discoveryTime: "",
    description: "",
    wasConsumed: false,
    animalAffected: false,
    animalCondition: "",
    authoritiesNotified: false,
    policeReportNumber: "",
    reporterName: "",
    reporterPhone: "",
    reporterEmail: "",
    allowContact: true,
    anonymous: false,
    photos: [],
    photoPreviews: [],
};

const dangerTypes: Record<DangerType, { label: string; icon: string; color: string }> = {
    veneno: { label: "Veneno / Sustancia tóxica", icon: "☠️", color: "bg-purple-500/20 text-purple-300 border-purple-500/30" },
    alfileres: { label: "Alfileres / Agujas", icon: "📍", color: "bg-red-500/20 text-red-300 border-red-500/30" },
    cristales: { label: "Cristales / Vidrios", icon: "💎", color: "bg-cyan-500/20 text-cyan-300 border-cyan-500/30" },
    clavos: { label: "Clavos / Objetos punzantes", icon: "🔩", color: "bg-orange-500/20 text-orange-300 border-orange-500/30" },
    raticida: { label: "Raticida / Matarratas", icon: "🐀", color: "bg-green-500/20 text-green-300 border-green-500/30" },
    anticongelante: { label: "Anticongelante", icon: "🧪", color: "bg-blue-500/20 text-blue-300 border-blue-500/30" },
    cebo_sospechoso: { label: "Cebo sospechoso", icon: "🍖", color: "bg-amber-500/20 text-amber-300 border-amber-500/30" },
    otro: { label: "Otro peligro", icon: "⚠️", color: "bg-muted/20 text-muted-foreground border-border/30" },
};

const severityLevels: Record<SeverityLevel, { label: string; description: string; color: string }> = {
    alta: {
        label: "Alta - Peligro confirmado",
        description: "Se ha confirmado la presencia de sustancia peligrosa",
        color: "bg-red-500/20 text-red-300 border-red-500/30"
    },
    media: {
        label: "Media - Sospecha fundada",
        description: "Aspecto sospechoso pero no confirmado",
        color: "bg-amber-500/20 text-amber-300 border-amber-500/30"
    },
    confirmado: {
        label: "Confirmado por veterinario",
        description: "Un veterinario ha analizado y confirmado la sustancia",
        color: "bg-purple-500/20 text-purple-300 border-purple-500/30"
    },
};

const regions = [
    "Euskadi",
    "Navarra",
    "Cantabria",
    "Asturias",
    "Galicia",
    "Iparralde",
    "Otra",
];

// Mock data for recent alerts
const recentAlerts = [
    {
        id: 1,
        type: "veneno" as DangerType,
        location: "Parque Cristina Enea",
        city: "Donostia",
        date: "2026-02-07",
        severity: "alta" as SeverityLevel,
        verified: true,
    },
    {
        id: 2,
        type: "alfileres" as DangerType,
        location: "Zona de La Concha",
        city: "Donostia",
        date: "2026-02-05",
        severity: "confirmado" as SeverityLevel,
        verified: true,
    },
    {
        id: 3,
        type: "cebo_sospechoso" as DangerType,
        location: "Parque de Amara",
        city: "Donostia",
        date: "2026-02-03",
        severity: "media" as SeverityLevel,
        verified: false,
    },
];

export default function AlertasPeligroPage() {
    const [form, setForm] = useState<DangerReportForm>(initialFormState);
    const [step, setStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [errors, setErrors] = useState<Partial<Record<keyof DangerReportForm, string>>>({});
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        const checked = (e.target as HTMLInputElement).checked;

        setForm(prev => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));

        if (errors[name as keyof DangerReportForm]) {
            setErrors(prev => ({ ...prev, [name]: undefined }));
        }
    };

    const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        const validFiles: File[] = [];
        const previews: string[] = [];

        files.forEach(file => {
            if (file.size <= 10 * 1024 * 1024 && form.photos.length + validFiles.length < 5) {
                validFiles.push(file);
                const reader = new FileReader();
                reader.onload = (event) => {
                    previews.push(event.target?.result as string);
                    if (previews.length === validFiles.length) {
                        setForm(prev => ({
                            ...prev,
                            photos: [...prev.photos, ...validFiles],
                            photoPreviews: [...prev.photoPreviews, ...previews],
                        }));
                    }
                };
                reader.readAsDataURL(file);
            }
        });
    };

    const removePhoto = (index: number) => {
        setForm(prev => ({
            ...prev,
            photos: prev.photos.filter((_, i) => i !== index),
            photoPreviews: prev.photoPreviews.filter((_, i) => i !== index),
        }));
    };

    const validateStep = (currentStep: number): boolean => {
        const newErrors: Partial<Record<keyof DangerReportForm, string>> = {};

        if (currentStep === 1) {
            if (form.dangerType === "otro" && !form.otherDescription.trim()) {
                newErrors.otherDescription = "Describe el tipo de peligro";
            }
        }

        if (currentStep === 2) {
            if (!form.location.trim()) newErrors.location = "La ubicación es obligatoria";
            if (!form.city.trim()) newErrors.city = "La ciudad es obligatoria";
            if (!form.discoveryDate) newErrors.discoveryDate = "La fecha es obligatoria";
        }

        if (currentStep === 3) {
            if (!form.anonymous) {
                const hasEmail = form.reporterEmail.trim().length > 0;
                const hasPhone = form.reporterPhone.trim().length > 0;

                if (!hasEmail && !hasPhone) {
                    newErrors.reporterEmail = "Indica un email o teléfono";
                    newErrors.reporterPhone = "Indica un email o teléfono";
                } else if (hasEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.reporterEmail)) {
                    newErrors.reporterEmail = "Email no válido";
                }
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleNextStep = () => {
        if (validateStep(step)) {
            setStep(prev => prev + 1);
        }
    };

    const handlePrevStep = () => {
        setStep(prev => prev - 1);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateStep(3)) return;

        setIsSubmitting(true);
        await new Promise(resolve => setTimeout(resolve, 2000));
        setIsSubmitting(false);
        setIsSubmitted(true);
    };

    const formatDate = (dateStr: string) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString("es-ES", {
            day: "numeric",
            month: "short",
        });
    };

    const setDiscoveryNow = () => {
        const now = new Date();
        const date = now.toISOString().slice(0, 10);
        const time = now.toTimeString().slice(0, 5);

        setForm(prev => ({
            ...prev,
            discoveryDate: date,
            discoveryTime: time,
        }));

        if (errors.discoveryDate) {
            setErrors(prev => ({ ...prev, discoveryDate: undefined }));
        }
    };

    if (isSubmitted) {
        return (
            <main className="min-h-screen bg-gradient-to-b from-card via-card/80 to-card py-16">
                <div className="max-w-2xl mx-auto px-4">
                    <div className="bg-white/5 backdrop-blur-sm rounded-3xl border border-emerald-500/20 p-8 md:p-12 text-center">
                        <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                            <CheckCircle2 className="w-10 h-10 text-emerald-400" />
                        </div>

                        <h1 className="text-2xl md:text-3xl font-bold text-white mb-4">
                            ¡Alerta Registrada!
                        </h1>

                        <p className="text-muted-foreground mb-6">
                            Tu denuncia ha sido registrada y será difundida inmediatamente
                            para alertar a la comunidad canina de la zona.
                        </p>

                        <div className="bg-white/5 rounded-2xl p-6 mb-8 text-left">
                            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                                <Bell className="w-5 h-5 text-amber-400" />
                                Acciones Automáticas
                            </h3>

                            <div className="space-y-4">
                                <div className="flex items-start gap-3">
                                    <div className="w-8 h-8 bg-red-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                                        <Siren className="w-4 h-4 text-red-400" />
                                    </div>
                                    <div>
                                        <p className="text-white font-medium">Alerta en la app</p>
                                        <p className="text-sm text-muted-foreground">Usuarios cercanos recibirán notificación push</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                                        <Users className="w-4 h-4 text-blue-400" />
                                    </div>
                                    <div>
                                        <p className="text-white font-medium">Grupos locales</p>
                                        <p className="text-sm text-muted-foreground">Difusión en grupos de WhatsApp y Telegram de {form.city}</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <div className="w-8 h-8 bg-emerald-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                                        <Shield className="w-4 h-4 text-emerald-400" />
                                    </div>
                                    <div>
                                        <p className="text-white font-medium">Verificación</p>
                                        <p className="text-sm text-muted-foreground">Nuestro equipo verificará la alerta lo antes posible</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4 mb-8 text-left">
                            <div className="flex items-start gap-3">
                                <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                                <div>
                                    <p className="text-white font-medium mb-1">¿Has denunciado a la policía?</p>
                                    <p className="text-sm text-muted-foreground">
                                        Te recomendamos presentar denuncia formal.
                                        El envenenamiento de animales es un delito (art. 337 Código Penal).
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                href="/comunidad"
                                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-colors"
                            >
                                <Shield className="w-5 h-5" />
                                Ver protectoras cercanas
                            </Link>
                            <Link
                                href="/"
                                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl transition-colors"
                            >
                                Volver al inicio
                            </Link>
                        </div>
                    </div>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-gradient-to-b from-card via-card/80 to-card">
            {/* Hero Section */}
            <section className="relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-red-900/40 via-transparent to-purple-900/30" />
                <div className="absolute top-20 left-10 w-72 h-72 bg-red-500/15 rounded-full blur-3xl" />
                <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
                    <div className="text-center max-w-3xl mx-auto">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/15 border border-red-500/30 mb-6">
                            <Skull className="w-4 h-4 text-red-400" />
                            <span className="text-sm text-red-300">Alerta de Seguridad</span>
                        </div>

                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
                            Denunciar Peligro
                            <span className="block mt-2 bg-gradient-to-r from-red-400 via-orange-400 to-amber-400 bg-clip-text text-transparent">
                                Veneno, Alfileres, Cebos
                            </span>
                        </h1>

                        <p className="text-lg text-muted-foreground mb-8">
                            Alerta a la comunidad sobre zonas peligrosas donde se han detectado
                            cebos envenenados, alimentos con alfileres u otros peligros para mascotas.
                        </p>

                        {/* Emergency Numbers */}
                        <div className="flex flex-wrap justify-center gap-4 mb-8">
                            <a
                                href="tel:112"
                                className="flex items-center gap-2 px-5 py-3 bg-red-500/20 hover:bg-red-500/30 rounded-xl border border-red-500/30 transition-colors"
                            >
                                <Phone className="w-5 h-5 text-red-400" />
                                <span className="text-white font-medium">112 Emergencias</span>
                            </a>
                            <a
                                href="tel:062"
                                className="flex items-center gap-2 px-5 py-3 bg-green-500/20 hover:bg-green-500/30 rounded-xl border border-green-500/30 transition-colors"
                            >
                                <Shield className="w-5 h-5 text-green-400" />
                                <span className="text-white font-medium">062 Guardia Civil</span>
                            </a>
                            <a
                                href="tel:092"
                                className="flex items-center gap-2 px-5 py-3 bg-blue-500/20 hover:bg-blue-500/30 rounded-xl border border-blue-500/30 transition-colors"
                            >
                                <Shield className="w-5 h-5 text-blue-400" />
                                <span className="text-white font-medium">092 Policía Local</span>
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* Recent Alerts */}
            <section className="max-w-7xl mx-auto px-4 mb-12">
                <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-6">
                    <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                        <AlertOctagon className="w-5 h-5 text-red-400" />
                        Alertas Recientes en tu Zona
                    </h3>

                    <div className="grid md:grid-cols-3 gap-4">
                        {recentAlerts.map((alert) => (
                            <div
                                key={alert.id}
                                className="bg-white/5 rounded-xl p-4 border border-white/10"
                            >
                                <div className="flex items-start justify-between mb-2">
                                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${dangerTypes[alert.type].color}`}>
                                        {dangerTypes[alert.type].icon} {dangerTypes[alert.type].label}
                                    </span>
                                    {alert.verified && (
                                        <span className="flex items-center gap-1 text-xs text-emerald-400">
                                            <CheckCircle2 className="w-3.5 h-3.5" />
                                            Verificado
                                        </span>
                                    )}
                                </div>
                                <p className="text-white font-medium">{alert.location}</p>
                                <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                                    <MapPin className="w-3.5 h-3.5" />
                                    {alert.city}
                                    <span className="mx-1">•</span>
                                    <Clock className="w-3.5 h-3.5" />
                                    {formatDate(alert.date)}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Form Section */}
            <section className="max-w-3xl mx-auto px-4 pb-16">
                {/* Progress Steps */}
                <div className="flex items-center justify-center gap-2 mb-8">
                    {[1, 2, 3, 4].map((s) => (
                        <div key={s} className="flex items-center">
                            <div
                                className={`w-10 h-10 rounded-full flex items-center justify-center font-medium transition-colors ${s === step
                                        ? "bg-red-500 text-white"
                                        : s < step
                                            ? "bg-emerald-500 text-white"
                                            : "bg-white/10 text-muted-foreground"
                                    }`}
                            >
                                {s < step ? <CheckCircle2 className="w-5 h-5" /> : s}
                            </div>
                            {s < 4 && (
                                <div
                                    className={`w-12 h-1 mx-1 rounded-full transition-colors ${s < step ? "bg-emerald-500" : "bg-white/10"
                                        }`}
                                />
                            )}
                        </div>
                    ))}
                </div>

                {/* Step Labels */}
                <div className="flex justify-between text-xs text-muted-foreground mb-8 px-4">
                    <span className={step >= 1 ? "text-red-400" : ""}>Tipo de peligro</span>
                    <span className={step >= 2 ? "text-red-400" : ""}>Ubicación</span>
                    <span className={step >= 3 ? "text-red-400" : ""}>Contacto</span>
                    <span className={step >= 4 ? "text-red-400" : ""}>Fotos</span>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="bg-white/5 backdrop-blur-sm rounded-3xl border border-white/10 p-6 md:p-8">
                        {/* Step 1: Danger Type */}
                        {step === 1 && (
                            <div className="space-y-6 animate-in fade-in">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-10 h-10 bg-red-500/20 rounded-full flex items-center justify-center">
                                        <Skull className="w-5 h-5 text-red-400" />
                                    </div>
                                    <h2 className="text-xl font-semibold text-white">Tipo de peligro detectado</h2>
                                </div>

                                <div className="grid sm:grid-cols-2 gap-3">
                                    {Object.entries(dangerTypes).map(([key, { label, icon, color }]) => (
                                        <button
                                            key={key}
                                            type="button"
                                            onClick={() => setForm(prev => ({ ...prev, dangerType: key as DangerType }))}
                                            className={`flex items-center gap-3 p-4 rounded-xl border transition-all text-left ${form.dangerType === key
                                                    ? `${color} border-2`
                                                    : "bg-white/5 border-white/10 hover:bg-white/10"
                                                }`}
                                        >
                                            <span className="text-2xl">{icon}</span>
                                            <span className={form.dangerType === key ? "text-white font-medium" : "text-muted-foreground"}>
                                                {label}
                                            </span>
                                        </button>
                                    ))}
                                </div>

                                {form.dangerType === "otro" && (
                                    <div className="mt-4">
                                        <label className="block text-sm text-muted-foreground mb-2">
                                            Describe el peligro *
                                        </label>
                                        <input
                                            type="text"
                                            name="otherDescription"
                                            value={form.otherDescription}
                                            onChange={handleInputChange}
                                            placeholder="Ej: Salchichas con cristales..."
                                            maxLength={120}
                                            required={form.dangerType === "otro"}
                                            aria-invalid={!!errors.otherDescription}
                                            aria-describedby={errors.otherDescription ? "otherDescription-error" : undefined}
                                            className={`w-full px-4 py-3 bg-white/5 border rounded-xl text-white placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-red-500/50 transition-all ${errors.otherDescription ? "border-red-500" : "border-white/10"
                                                }`}
                                        />
                                        {errors.otherDescription && (
                                            <p id="otherDescription-error" className="text-sm text-red-400 mt-1">{errors.otherDescription}</p>
                                        )}
                                    </div>
                                )}

                                <div className="mt-6">
                                    <label className="block text-sm text-muted-foreground mb-3">
                                        Nivel de gravedad
                                    </label>
                                    <div className="space-y-3">
                                        {Object.entries(severityLevels).map(([key, { label, description, color }]) => (
                                            <button
                                                key={key}
                                                type="button"
                                                onClick={() => setForm(prev => ({ ...prev, severity: key as SeverityLevel }))}
                                                className={`w-full flex items-start gap-3 p-4 rounded-xl border transition-all text-left ${form.severity === key
                                                        ? `${color} border-2`
                                                        : "bg-white/5 border-white/10 hover:bg-white/10"
                                                    }`}
                                            >
                                                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mt-0.5 ${form.severity === key ? "border-current" : "border-border"
                                                    }`}>
                                                    {form.severity === key && (
                                                        <div className="w-2.5 h-2.5 rounded-full bg-current" />
                                                    )}
                                                </div>
                                                <div>
                                                    <p className={form.severity === key ? "text-white font-medium" : "text-muted-foreground"}>
                                                        {label}
                                                    </p>
                                                    <p className="text-sm text-muted-foreground">{description}</p>
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="space-y-4 mt-6">
                                    <div className="flex items-center gap-3">
                                        <input
                                            type="checkbox"
                                            id="animalAffected"
                                            name="animalAffected"
                                            checked={form.animalAffected}
                                            onChange={handleInputChange}
                                            className="w-5 h-5 rounded bg-white/5 border-white/20 text-red-500 focus:ring-red-500/50"
                                        />
                                        <label htmlFor="animalAffected" className="text-muted-foreground">
                                            Un animal ha resultado afectado
                                        </label>
                                    </div>

                                    {form.animalAffected && (
                                        <div className="pl-8">
                                            <input
                                                type="text"
                                                name="animalCondition"
                                                value={form.animalCondition}
                                                onChange={handleInputChange}
                                                placeholder="¿Qué le ha pasado al animal? ¿Está en el veterinario?"
                                                maxLength={160}
                                                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-red-500/50 transition-all"
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Step 2: Location */}
                        {step === 2 && (
                            <div className="space-y-6 animate-in fade-in">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-10 h-10 bg-amber-500/20 rounded-full flex items-center justify-center">
                                        <MapPin className="w-5 h-5 text-amber-400" />
                                    </div>
                                    <h2 className="text-xl font-semibold text-white">Ubicación del peligro</h2>
                                </div>

                                <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4 flex items-start gap-3">
                                    <Info className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                                    <p className="text-sm text-muted-foreground">
                                        Cuanto más precisa sea la ubicación, mejor podremos alertar a los usuarios
                                        que paseen por esa zona.
                                    </p>
                                </div>

                                <div>
                                    <label className="block text-sm text-muted-foreground mb-2">
                                        Lugar exacto *
                                    </label>
                                    <input
                                        type="text"
                                        name="location"
                                        value={form.location}
                                        onChange={handleInputChange}
                                        placeholder="Ej: Parque Cristina Enea, zona de los columpios"
                                        maxLength={160}
                                        required
                                        aria-invalid={!!errors.location}
                                        aria-describedby={errors.location ? "location-error" : undefined}
                                        className={`w-full px-4 py-3 bg-white/5 border rounded-xl text-white placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-all ${errors.location ? "border-red-500" : "border-white/10"
                                            }`}
                                    />
                                    {errors.location && (
                                        <p id="location-error" className="text-sm text-red-400 mt-1">{errors.location}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm text-muted-foreground mb-2">
                                        Detalles adicionales de ubicación
                                    </label>
                                    <input
                                        type="text"
                                        name="locationDetails"
                                        value={form.locationDetails}
                                        onChange={handleInputChange}
                                        placeholder="Ej: Bajo el segundo banco entrando por la derecha..."
                                        maxLength={200}
                                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-all"
                                    />
                                </div>

                                <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm text-muted-foreground mb-2">
                                            Ciudad *
                                        </label>
                                        <input
                                            type="text"
                                            name="city"
                                            value={form.city}
                                            onChange={handleInputChange}
                                            placeholder="Ej: Donostia-San Sebastián"
                                            maxLength={120}
                                            required
                                            aria-invalid={!!errors.city}
                                            aria-describedby={errors.city ? "city-error" : undefined}
                                            className={`w-full px-4 py-3 bg-white/5 border rounded-xl text-white placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-all ${errors.city ? "border-red-500" : "border-white/10"
                                                }`}
                                        />
                                        {errors.city && (
                                            <p id="city-error" className="text-sm text-red-400 mt-1">{errors.city}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm text-muted-foreground mb-2">
                                            Región
                                        </label>
                                        <select
                                            name="region"
                                            value={form.region}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-all"
                                        >
                                            {regions.map((region) => (
                                                <option key={region} value={region} className="bg-card/80">
                                                    {region}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm text-muted-foreground mb-2">
                                            Fecha del descubrimiento *
                                        </label>
                                        <input
                                            type="date"
                                            name="discoveryDate"
                                            value={form.discoveryDate}
                                            onChange={handleInputChange}
                                            required
                                            aria-invalid={!!errors.discoveryDate}
                                            aria-describedby={errors.discoveryDate ? "discoveryDate-error" : undefined}
                                            className={`w-full px-4 py-3 bg-white/5 border rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-all ${errors.discoveryDate ? "border-red-500" : "border-white/10"
                                                }`}
                                        />
                                        {errors.discoveryDate && (
                                            <p id="discoveryDate-error" className="text-sm text-red-400 mt-1">{errors.discoveryDate}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm text-muted-foreground mb-2">
                                            Hora aproximada
                                        </label>
                                        <input
                                            type="time"
                                            name="discoveryTime"
                                            value={form.discoveryTime}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-all"
                                        />
                                    </div>
                                </div>

                                <div className="flex items-center justify-between text-xs text-muted-foreground">
                                    <span>Si acaba de ocurrir, puedes usar la hora actual.</span>
                                    <button
                                        type="button"
                                        onClick={setDiscoveryNow}
                                        className="inline-flex items-center gap-1 text-amber-300 hover:text-amber-200 transition-colors"
                                    >
                                        <Clock className="w-3.5 h-3.5" />
                                        Usar ahora
                                    </button>
                                </div>

                                <div>
                                    <label className="block text-sm text-muted-foreground mb-2">
                                        Descripción de lo encontrado
                                    </label>
                                    <textarea
                                        name="description"
                                        value={form.description}
                                        onChange={handleInputChange}
                                        placeholder="Describe con detalle lo que has encontrado: aspecto, olor, cantidad..."
                                        rows={4}
                                        maxLength={600}
                                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-all resize-none"
                                    />
                                </div>

                                <div className="space-y-4">
                                    <div className="flex items-center gap-3">
                                        <input
                                            type="checkbox"
                                            id="authoritiesNotified"
                                            name="authoritiesNotified"
                                            checked={form.authoritiesNotified}
                                            onChange={handleInputChange}
                                            className="w-5 h-5 rounded bg-white/5 border-white/20 text-emerald-500 focus:ring-emerald-500/50"
                                        />
                                        <label htmlFor="authoritiesNotified" className="text-muted-foreground">
                                            He avisado a la policía / autoridades
                                        </label>
                                    </div>

                                    {form.authoritiesNotified && (
                                        <div className="pl-8">
                                            <input
                                                type="text"
                                                name="policeReportNumber"
                                                value={form.policeReportNumber}
                                                onChange={handleInputChange}
                                                placeholder="Número de denuncia (si lo tienes)"
                                                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all"
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Step 3: Contact */}
                        {step === 3 && (
                            <div className="space-y-6 animate-in fade-in">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center">
                                        <Mail className="w-5 h-5 text-blue-400" />
                                    </div>
                                    <h2 className="text-xl font-semibold text-white">Información de contacto</h2>
                                </div>

                                <p className="text-sm text-muted-foreground mb-4">
                                    Si no deseas dejar datos, marca "denuncia anónima". Si no, indica email o teléfono.
                                </p>

                                <div className="flex items-center gap-3 mb-6">
                                    <input
                                        type="checkbox"
                                        id="anonymous"
                                        name="anonymous"
                                        checked={form.anonymous}
                                        onChange={handleInputChange}
                                        className="w-5 h-5 rounded bg-white/5 border-white/20 text-blue-500 focus:ring-blue-500/50"
                                    />
                                    <label htmlFor="anonymous" className="text-muted-foreground">
                                        Quiero denunciar de forma anónima
                                    </label>
                                </div>

                                {!form.anonymous && (
                                    <>
                                        <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4 flex items-start gap-3">
                                            <Info className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                                            <p className="text-sm text-muted-foreground">
                                                Tus datos no serán publicados. Solo los usaremos para contactarte
                                                si necesitamos más información o para informarte sobre la resolución.
                                            </p>
                                        </div>

                                        <div>
                                            <label className="block text-sm text-muted-foreground mb-2">
                                                Tu nombre
                                            </label>
                                            <input
                                                type="text"
                                                name="reporterName"
                                                value={form.reporterName}
                                                onChange={handleInputChange}
                                                placeholder="Nombre (opcional)"
                                                autoComplete="name"
                                                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm text-muted-foreground mb-2">
                                                Email
                                            </label>
                                            <input
                                                type="email"
                                                name="reporterEmail"
                                                value={form.reporterEmail}
                                                onChange={handleInputChange}
                                                placeholder="tu@email.com"
                                                autoComplete="email"
                                                aria-invalid={!!errors.reporterEmail}
                                                aria-describedby={errors.reporterEmail ? "reporterEmail-error" : undefined}
                                                className={`w-full px-4 py-3 bg-white/5 border rounded-xl text-white placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all ${errors.reporterEmail ? "border-red-500" : "border-white/10"
                                                    }`}
                                            />
                                            {errors.reporterEmail && (
                                                <p id="reporterEmail-error" className="text-sm text-red-400 mt-1">{errors.reporterEmail}</p>
                                            )}
                                        </div>

                                        <div>
                                            <label className="block text-sm text-muted-foreground mb-2">
                                                Teléfono
                                            </label>
                                            <input
                                                type="tel"
                                                name="reporterPhone"
                                                value={form.reporterPhone}
                                                onChange={handleInputChange}
                                                placeholder="+34 600 000 000"
                                                autoComplete="tel"
                                                aria-invalid={!!errors.reporterPhone}
                                                aria-describedby={errors.reporterPhone ? "reporterPhone-error" : undefined}
                                                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                                            />
                                            {errors.reporterPhone && (
                                                <p id="reporterPhone-error" className="text-sm text-red-400 mt-1">{errors.reporterPhone}</p>
                                            )}
                                        </div>

                                        <div className="flex items-center gap-3">
                                            <input
                                                type="checkbox"
                                                id="allowContact"
                                                name="allowContact"
                                                checked={form.allowContact}
                                                onChange={handleInputChange}
                                                className="w-5 h-5 rounded bg-white/5 border-white/20 text-blue-500 focus:ring-blue-500/50"
                                            />
                                            <label htmlFor="allowContact" className="text-muted-foreground">
                                                Acepto ser contactado para ampliar información
                                            </label>
                                        </div>
                                    </>
                                )}

                                {form.anonymous && (
                                    <div className="bg-muted/10 border border-border/20 rounded-xl p-6 text-center">
                                        <Eye className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                                        <p className="text-muted-foreground">
                                            Tu denuncia será registrada de forma anónima.
                                            No podremos contactarte para informarte sobre la resolución.
                                        </p>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Step 4: Photos */}
                        {step === 4 && (
                            <div className="space-y-6 animate-in fade-in">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-10 h-10 bg-purple-500/20 rounded-full flex items-center justify-center">
                                        <Camera className="w-5 h-5 text-purple-400" />
                                    </div>
                                    <h2 className="text-xl font-semibold text-white">Fotos del peligro</h2>
                                </div>

                                <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 flex items-start gap-3">
                                    <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                                    <div>
                                        <p className="text-white font-medium mb-1">¡Importante!</p>
                                        <p className="text-sm text-muted-foreground">
                                            NO toques el cebo o sustancia sospechosa. Haz fotos desde una distancia segura.
                                            Si es posible, marca la zona para que otros la eviten.
                                        </p>
                                    </div>
                                </div>

                                {/* Photo Upload Area */}
                                <div>
                                    {form.photoPreviews.length > 0 && (
                                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                                            {form.photoPreviews.map((preview, index) => (
                                                <div key={index} className="relative rounded-xl overflow-hidden">
                                                    <Image
                                                        src={preview}
                                                        alt={`Foto ${index + 1}`}
                                                        width={200}
                                                        height={200}
                                                        className="w-full h-32 object-cover"
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => removePhoto(index)}
                                                        aria-label={`Eliminar foto ${index + 1}`}
                                                        className="absolute top-2 right-2 p-1.5 bg-red-500 hover:bg-red-600 rounded-full text-white transition-colors"
                                                    >
                                                        <X className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    {form.photos.length < 5 && (
                                        <label className="block cursor-pointer">
                                            <div className="border-2 border-dashed border-white/20 rounded-2xl p-8 text-center transition-colors hover:border-purple-500/50 hover:bg-purple-500/5">
                                                <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-3">
                                                    <Upload className="w-6 h-6 text-muted-foreground" />
                                                </div>
                                                <p className="text-white font-medium mb-1">
                                                    {form.photos.length === 0 ? "Sube fotos del peligro" : "Añadir más fotos"}
                                                </p>
                                                <p className="text-sm text-muted-foreground">
                                                    Máximo 5 fotos • JPG, PNG o WebP
                                                </p>
                                            </div>
                                            <input
                                                ref={fileInputRef}
                                                type="file"
                                                accept="image/jpeg,image/png,image/webp"
                                                multiple
                                                onChange={handlePhotoUpload}
                                                className="hidden"
                                            />
                                        </label>
                                    )}
                                </div>

                                {/* Summary */}
                                <div className="bg-white/5 rounded-2xl p-6 mt-8">
                                    <h3 className="text-lg font-semibold text-white mb-4">Resumen de la denuncia</h3>

                                    <div className="space-y-3 text-sm">
                                        <div className="flex justify-between">
                                            <span className="text-muted-foreground">Tipo de peligro:</span>
                                            <span className="text-white font-medium">
                                                {dangerTypes[form.dangerType].icon} {dangerTypes[form.dangerType].label}
                                            </span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-muted-foreground">Gravedad:</span>
                                            <span className="text-white">{severityLevels[form.severity].label}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-muted-foreground">Ubicación:</span>
                                            <span className="text-white">{form.location}, {form.city}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-muted-foreground">Fecha:</span>
                                            <span className="text-white">{form.discoveryDate} {form.discoveryTime}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-muted-foreground">Fotos adjuntas:</span>
                                            <span className="text-white">{form.photos.length}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-muted-foreground">Denuncia:</span>
                                            <span className="text-white">
                                                {form.anonymous ? "Anónima" : form.reporterEmail || form.reporterPhone || "Con contacto"}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Navigation Buttons */}
                        <div className="flex justify-between mt-8 pt-6 border-t border-white/10">
                            {step > 1 ? (
                                <button
                                    type="button"
                                    onClick={handlePrevStep}
                                    className="px-6 py-3 bg-white/5 hover:bg-white/10 text-white rounded-xl transition-colors"
                                >
                                    Anterior
                                </button>
                            ) : (
                                <div />
                            )}

                            {step < 4 ? (
                                <button
                                    type="button"
                                    onClick={handleNextStep}
                                    className="flex items-center gap-2 px-6 py-3 bg-red-500 hover:bg-red-600 text-white font-medium rounded-xl transition-colors"
                                >
                                    Siguiente
                                    <ChevronRight className="w-5 h-5" />
                                </button>
                            ) : (
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="flex items-center gap-2 px-8 py-3 bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium rounded-xl transition-colors"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <Loader2 className="w-5 h-5 animate-spin" />
                                            Enviando...
                                        </>
                                    ) : (
                                        <>
                                            <Share2 className="w-5 h-5" />
                                            Publicar Alerta
                                        </>
                                    )}
                                </button>
                            )}
                        </div>
                    </div>
                </form>
            </section>

            {/* Legal Info */}
            <section className="max-w-7xl mx-auto px-4 pb-16">
                <div className="bg-gradient-to-br from-card/50 to-card/50 rounded-3xl p-8 md:p-12 border border-border/50">
                    <div className="flex items-start gap-4 mb-6">
                        <div className="w-12 h-12 bg-red-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                            <FileWarning className="w-6 h-6 text-red-400" />
                        </div>
                        <div>
                            <h2 className="text-xl md:text-2xl font-bold text-white mb-2">
                                Marco Legal: El envenenamiento es un delito
                            </h2>
                            <p className="text-muted-foreground">
                                El Código Penal español castiga severamente el maltrato animal
                            </p>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-white/5 rounded-xl p-6">
                            <h3 className="text-lg font-semibold text-white mb-3">Artículo 337 CP</h3>
                            <p className="text-muted-foreground text-sm leading-relaxed">
                                Quien mate, lesione gravemente o maltrate cruelmente a un animal doméstico
                                será castigado con pena de <span className="text-red-400 font-medium">6 a 18 meses de prisión</span>
                                e inhabilitación para ejercer profesión, oficio o comercio relacionado con animales.
                            </p>
                        </div>

                        <div className="bg-white/5 rounded-xl p-6">
                            <h3 className="text-lg font-semibold text-white mb-3">Artículo 336 CP</h3>
                            <p className="text-muted-foreground text-sm leading-relaxed">
                                El empleo de veneno o medios de similar eficacia destructiva para cazar o pescar
                                se castiga con pena de <span className="text-red-400 font-medium">4 a 8 meses de prisión</span>
                                o multa, además de inhabilitación especial.
                            </p>
                        </div>
                    </div>

                    <div className="mt-6 bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4">
                        <p className="text-sm text-muted-foreground">
                            <span className="text-emerald-400 font-medium">Recomendación:</span>{" "}
                            Si encuentras un cebo envenenado o sospechoso, NO lo toques. Llama al 112,
                            haz fotos desde distancia segura, y presenta denuncia formal. Conserva cualquier
                            muestra que pueda servir como evidencia.
                        </p>
                    </div>
                </div>
            </section>
        </main>
    );
}

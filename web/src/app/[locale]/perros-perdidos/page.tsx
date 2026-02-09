"use client";

import { useState, useRef } from "react";
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
    Dog,
    Info,
    CheckCircle2,
    Bell,
    Share2,
    MessageSquare,
    Facebook,
    Instagram,
    Send,
    Clock,
    Heart,
    ChevronRight,
    Loader2,
} from "lucide-react";
import { plataformasPerdidos } from "@/data/canineOrganizations";

interface LostDogForm {
    // Dog info
    dogName: string;
    breed: string;
    color: string;
    size: "pequeño" | "mediano" | "grande" | "muy_grande";
    age: string;
    gender: "macho" | "hembra" | "desconocido";
    hasChip: boolean;
    chipNumber: string;
    hasCollar: boolean;
    collarDescription: string;
    distinctiveFeatures: string;

    // Loss info
    lostDate: string;
    lostTime: string;
    lostLocation: string;
    lostCity: string;
    lostRegion: string;
    circumstances: string;

    // Contact info
    ownerName: string;
    ownerPhone: string;
    ownerEmail: string;
    allowWhatsApp: boolean;

    // Photo
    photo: File | null;
    photoPreview: string | null;
}

const initialFormState: LostDogForm = {
    dogName: "",
    breed: "",
    color: "",
    size: "mediano",
    age: "",
    gender: "desconocido",
    hasChip: false,
    chipNumber: "",
    hasCollar: false,
    collarDescription: "",
    distinctiveFeatures: "",
    lostDate: "",
    lostTime: "",
    lostLocation: "",
    lostCity: "",
    lostRegion: "Euskadi",
    circumstances: "",
    ownerName: "",
    ownerPhone: "",
    ownerEmail: "",
    allowWhatsApp: true,
    photo: null,
    photoPreview: null,
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

const sizeLabels = {
    pequeño: "Pequeño (< 10kg)",
    mediano: "Mediano (10-25kg)",
    grande: "Grande (25-45kg)",
    muy_grande: "Muy grande (> 45kg)",
};

export default function PerrosPerdidosPage() {
    const [form, setForm] = useState<LostDogForm>(initialFormState);
    const [step, setStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [errors, setErrors] = useState<Partial<Record<keyof LostDogForm, string>>>({});
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        const checked = (e.target as HTMLInputElement).checked;

        setForm(prev => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));

        // Clear error when user types
        if (errors[name as keyof LostDogForm]) {
            setErrors(prev => ({ ...prev, [name]: undefined }));
        }
    };

    const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (file.size > 10 * 1024 * 1024) {
                setErrors(prev => ({ ...prev, photo: "La imagen no puede superar los 10MB" }));
                return;
            }

            const reader = new FileReader();
            reader.onload = (event) => {
                setForm(prev => ({
                    ...prev,
                    photo: file,
                    photoPreview: event.target?.result as string,
                }));
            };
            reader.readAsDataURL(file);
            setErrors(prev => ({ ...prev, photo: undefined }));
        }
    };

    const removePhoto = () => {
        setForm(prev => ({
            ...prev,
            photo: null,
            photoPreview: null,
        }));
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    const validateStep = (currentStep: number): boolean => {
        const newErrors: Partial<Record<keyof LostDogForm, string>> = {};

        if (currentStep === 1) {
            if (!form.dogName.trim()) newErrors.dogName = "El nombre es obligatorio";
            if (!form.breed.trim()) newErrors.breed = "La raza es obligatoria";
            if (!form.color.trim()) newErrors.color = "El color es obligatorio";
            if (form.hasChip && !form.chipNumber.trim()) newErrors.chipNumber = "Indica el número de microchip";
        }

        if (currentStep === 2) {
            if (!form.lostDate) newErrors.lostDate = "La fecha es obligatoria";
            if (!form.lostLocation.trim()) newErrors.lostLocation = "La ubicación es obligatoria";
            if (!form.lostCity.trim()) newErrors.lostCity = "La ciudad es obligatoria";
        }

        if (currentStep === 3) {
            if (!form.ownerName.trim()) newErrors.ownerName = "El nombre es obligatorio";
            const hasPhone = form.ownerPhone.trim().length > 0;
            const hasEmail = form.ownerEmail.trim().length > 0;
            if (!hasPhone && !hasEmail) {
                newErrors.ownerPhone = "Indica teléfono o email";
                newErrors.ownerEmail = "Indica teléfono o email";
            } else if (hasEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.ownerEmail)) {
                newErrors.ownerEmail = "Email no válido";
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

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));

        setIsSubmitting(false);
        setIsSubmitted(true);
    };

    const setLostNow = () => {
        const now = new Date();
        const date = now.toISOString().slice(0, 10);
        const time = now.toTimeString().slice(0, 5);

        setForm(prev => ({
            ...prev,
            lostDate: date,
            lostTime: time,
        }));

        if (errors.lostDate) {
            setErrors(prev => ({ ...prev, lostDate: undefined }));
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
                            ¡Denuncia Registrada!
                        </h1>

                        <p className="text-muted-foreground mb-6">
                            Hemos recibido la información de <span className="text-emerald-400 font-semibold">{form.dogName}</span>.
                            Nuestro sistema automatizado comenzará a difundir la alerta inmediatamente.
                        </p>

                        <div className="bg-white/5 rounded-2xl p-6 mb-8 text-left">
                            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                                <Bell className="w-5 h-5 text-amber-400" />
                                Sistema de Notificación Automática
                            </h3>

                            <div className="space-y-4">
                                <div className="flex items-start gap-3">
                                    <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                                        <Mail className="w-4 h-4 text-blue-400" />
                                    </div>
                                    <div>
                                        <p className="text-white font-medium">Email</p>
                                        <p className="text-sm text-muted-foreground">Protectoras y voluntarios de {form.lostRegion} recibirán la alerta</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <div className="w-8 h-8 bg-pink-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                                        <Instagram className="w-4 h-4 text-pink-400" />
                                    </div>
                                    <div>
                                        <p className="text-white font-medium">Redes Sociales</p>
                                        <p className="text-sm text-muted-foreground">Publicación automática en Instagram, Facebook y Twitter</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <div className="w-8 h-8 bg-emerald-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                                        <MessageSquare className="w-4 h-4 text-emerald-400" />
                                    </div>
                                    <div>
                                        <p className="text-white font-medium">WhatsApp & Telegram</p>
                                        <p className="text-sm text-muted-foreground">Alerta a grupos de voluntarios de la zona</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                href="/comunidad"
                                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-colors"
                            >
                                <Heart className="w-5 h-5" />
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
                <div className="absolute inset-0 bg-gradient-to-br from-red-900/30 via-transparent to-amber-900/20" />
                <div className="absolute top-20 left-10 w-72 h-72 bg-red-500/10 rounded-full blur-3xl" />
                <div className="absolute bottom-10 right-10 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl" />

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
                    <div className="text-center max-w-3xl mx-auto">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 border border-red-500/20 mb-6">
                            <AlertTriangle className="w-4 h-4 text-red-400" />
                            <span className="text-sm text-red-300">Servicio de Emergencia 24/7</span>
                        </div>

                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
                            Denuncia un Perro
                            <span className="block mt-2 bg-gradient-to-r from-red-400 via-amber-400 to-orange-400 bg-clip-text text-transparent">
                                Desaparecido
                            </span>
                        </h1>

                        <p className="text-lg text-muted-foreground mb-8">
                            Completa el formulario y activaremos nuestro sistema de difusión automática
                            por email, redes sociales y mensajería móvil en toda la región.
                        </p>

                        {/* Notification System Preview */}
                        <div className="flex flex-wrap justify-center gap-4 mb-8">
                            <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/10">
                                <Mail className="w-4 h-4 text-blue-400" />
                                <span className="text-sm text-muted-foreground">Email automático</span>
                            </div>
                            <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/10">
                                <Facebook className="w-4 h-4 text-blue-400" />
                                <span className="text-sm text-muted-foreground">Facebook</span>
                            </div>
                            <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/10">
                                <Instagram className="w-4 h-4 text-pink-400" />
                                <span className="text-sm text-muted-foreground">Instagram</span>
                            </div>
                            <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/10">
                                <MessageSquare className="w-4 h-4 text-emerald-400" />
                                <span className="text-sm text-muted-foreground">WhatsApp</span>
                            </div>
                            <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/10">
                                <Send className="w-4 h-4 text-sky-400" />
                                <span className="text-sm text-muted-foreground">Telegram</span>
                            </div>
                        </div>
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
                                        ? "bg-amber-500 text-white"
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
                    <span className={step >= 1 ? "text-amber-400" : ""}>Datos del perro</span>
                    <span className={step >= 2 ? "text-amber-400" : ""}>Desaparición</span>
                    <span className={step >= 3 ? "text-amber-400" : ""}>Contacto</span>
                    <span className={step >= 4 ? "text-amber-400" : ""}>Foto</span>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="bg-white/5 backdrop-blur-sm rounded-3xl border border-white/10 p-6 md:p-8">
                        {/* Step 1: Dog Info */}
                        {step === 1 && (
                            <div className="space-y-6 animate-in fade-in">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-10 h-10 bg-amber-500/20 rounded-full flex items-center justify-center">
                                        <Dog className="w-5 h-5 text-amber-400" />
                                    </div>
                                    <h2 className="text-xl font-semibold text-white">Información del perro</h2>
                                </div>

                                <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm text-muted-foreground mb-2">
                                            Nombre del perro *
                                        </label>
                                        <input
                                            type="text"
                                            name="dogName"
                                            value={form.dogName}
                                            onChange={handleInputChange}
                                            placeholder="Ej: Max"
                                            maxLength={60}
                                            required
                                            aria-invalid={!!errors.dogName}
                                            aria-describedby={errors.dogName ? "dogName-error" : undefined}
                                            className={`w-full px-4 py-3 bg-white/5 border rounded-xl text-white placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-all ${errors.dogName ? "border-red-500" : "border-white/10"
                                                }`}
                                        />
                                        {errors.dogName && (
                                            <p id="dogName-error" className="text-sm text-red-400 mt-1">{errors.dogName}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm text-muted-foreground mb-2">
                                            Raza *
                                        </label>
                                        <input
                                            type="text"
                                            name="breed"
                                            value={form.breed}
                                            onChange={handleInputChange}
                                            placeholder="Ej: Labrador, Mestizo..."
                                            maxLength={80}
                                            required
                                            aria-invalid={!!errors.breed}
                                            aria-describedby={errors.breed ? "breed-error" : undefined}
                                            className={`w-full px-4 py-3 bg-white/5 border rounded-xl text-white placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-all ${errors.breed ? "border-red-500" : "border-white/10"
                                                }`}
                                        />
                                        {errors.breed && (
                                            <p id="breed-error" className="text-sm text-red-400 mt-1">{errors.breed}</p>
                                        )}
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm text-muted-foreground mb-2">
                                            Color *
                                        </label>
                                        <input
                                            type="text"
                                            name="color"
                                            value={form.color}
                                            onChange={handleInputChange}
                                            placeholder="Ej: Marrón y blanco"
                                            maxLength={60}
                                            required
                                            aria-invalid={!!errors.color}
                                            aria-describedby={errors.color ? "color-error" : undefined}
                                            className={`w-full px-4 py-3 bg-white/5 border rounded-xl text-white placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-all ${errors.color ? "border-red-500" : "border-white/10"
                                                }`}
                                        />
                                        {errors.color && (
                                            <p id="color-error" className="text-sm text-red-400 mt-1">{errors.color}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm text-muted-foreground mb-2">
                                            Edad aproximada
                                        </label>
                                        <input
                                            type="text"
                                            name="age"
                                            value={form.age}
                                            onChange={handleInputChange}
                                            placeholder="Ej: 3 años"
                                            maxLength={40}
                                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-all"
                                        />
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm text-muted-foreground mb-2">
                                            Tamaño
                                        </label>
                                        <select
                                            name="size"
                                            value={form.size}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-all"
                                        >
                                            {Object.entries(sizeLabels).map(([key, label]) => (
                                                <option key={key} value={key} className="bg-card/80">
                                                    {label}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm text-muted-foreground mb-2">
                                            Sexo
                                        </label>
                                        <select
                                            name="gender"
                                            value={form.gender}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-all"
                                        >
                                            <option value="macho" className="bg-card/80">Macho</option>
                                            <option value="hembra" className="bg-card/80">Hembra</option>
                                            <option value="desconocido" className="bg-card/80">No lo sé</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex items-center gap-3">
                                        <input
                                            type="checkbox"
                                            id="hasChip"
                                            name="hasChip"
                                            checked={form.hasChip}
                                            onChange={handleInputChange}
                                            className="w-5 h-5 rounded bg-white/5 border-white/20 text-amber-500 focus:ring-amber-500/50"
                                        />
                                        <label htmlFor="hasChip" className="text-muted-foreground">
                                            Tiene microchip identificativo
                                        </label>
                                    </div>

                                    {form.hasChip && (
                                        <div>
                                            <input
                                                type="text"
                                                name="chipNumber"
                                                value={form.chipNumber}
                                                onChange={handleInputChange}
                                                placeholder="Número de microchip (si lo conoces)"
                                                maxLength={30}
                                                required={form.hasChip}
                                                aria-invalid={!!errors.chipNumber}
                                                aria-describedby={errors.chipNumber ? "chipNumber-error" : undefined}
                                                className={`w-full px-4 py-3 bg-white/5 border rounded-xl text-white placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-all ${errors.chipNumber ? "border-red-500" : "border-white/10"
                                                    }`}
                                            />
                                            {errors.chipNumber && (
                                                <p id="chipNumber-error" className="text-sm text-red-400 mt-1">{errors.chipNumber}</p>
                                            )}
                                        </div>
                                    )}

                                    <div className="flex items-center gap-3">
                                        <input
                                            type="checkbox"
                                            id="hasCollar"
                                            name="hasCollar"
                                            checked={form.hasCollar}
                                            onChange={handleInputChange}
                                            className="w-5 h-5 rounded bg-white/5 border-white/20 text-amber-500 focus:ring-amber-500/50"
                                        />
                                        <label htmlFor="hasCollar" className="text-muted-foreground">
                                            Llevaba collar
                                        </label>
                                    </div>

                                    {form.hasCollar && (
                                        <input
                                            type="text"
                                            name="collarDescription"
                                            value={form.collarDescription}
                                            onChange={handleInputChange}
                                            placeholder="Describe el collar (color, chapas...)"
                                            maxLength={120}
                                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-all"
                                        />
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm text-muted-foreground mb-2">
                                        Rasgos distintivos
                                    </label>
                                    <textarea
                                        name="distinctiveFeatures"
                                        value={form.distinctiveFeatures}
                                        onChange={handleInputChange}
                                        placeholder="Cicatrices, manchas particulares, comportamiento..."
                                        rows={3}
                                        maxLength={200}
                                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-all resize-none"
                                    />
                                </div>
                            </div>
                        )}

                        {/* Step 2: Loss Info */}
                        {step === 2 && (
                            <div className="space-y-6 animate-in fade-in">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-10 h-10 bg-red-500/20 rounded-full flex items-center justify-center">
                                        <MapPin className="w-5 h-5 text-red-400" />
                                    </div>
                                    <h2 className="text-xl font-semibold text-white">Información de la desaparición</h2>
                                </div>

                                <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm text-muted-foreground mb-2">
                                            Fecha de desaparición *
                                        </label>
                                        <input
                                            type="date"
                                            name="lostDate"
                                            value={form.lostDate}
                                            onChange={handleInputChange}
                                            required
                                            aria-invalid={!!errors.lostDate}
                                            aria-describedby={errors.lostDate ? "lostDate-error" : undefined}
                                            className={`w-full px-4 py-3 bg-white/5 border rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-all ${errors.lostDate ? "border-red-500" : "border-white/10"
                                                }`}
                                        />
                                        {errors.lostDate && (
                                            <p id="lostDate-error" className="text-sm text-red-400 mt-1">{errors.lostDate}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm text-muted-foreground mb-2">
                                            Hora aproximada
                                        </label>
                                        <input
                                            type="time"
                                            name="lostTime"
                                            value={form.lostTime}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-all"
                                        />
                                    </div>
                                </div>

                                <div className="flex items-center justify-between text-xs text-muted-foreground">
                                    <span>Si acaba de ocurrir, puedes usar la hora actual.</span>
                                    <button
                                        type="button"
                                        onClick={setLostNow}
                                        className="inline-flex items-center gap-1 text-amber-300 hover:text-amber-200 transition-colors"
                                    >
                                        <Clock className="w-3.5 h-3.5" />
                                        Usar ahora
                                    </button>
                                </div>

                                <div>
                                    <label className="block text-sm text-muted-foreground mb-2">
                                        Lugar exacto de desaparición *
                                    </label>
                                    <input
                                        type="text"
                                        name="lostLocation"
                                        value={form.lostLocation}
                                        onChange={handleInputChange}
                                        placeholder="Ej: Parque Cristina Enea, calle Zubieta..."
                                        maxLength={160}
                                        required
                                        aria-invalid={!!errors.lostLocation}
                                        aria-describedby={errors.lostLocation ? "lostLocation-error" : undefined}
                                        className={`w-full px-4 py-3 bg-white/5 border rounded-xl text-white placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-all ${errors.lostLocation ? "border-red-500" : "border-white/10"
                                            }`}
                                    />
                                    {errors.lostLocation && (
                                        <p id="lostLocation-error" className="text-sm text-red-400 mt-1">{errors.lostLocation}</p>
                                    )}
                                </div>

                                <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm text-muted-foreground mb-2">
                                            Ciudad *
                                        </label>
                                        <input
                                            type="text"
                                            name="lostCity"
                                            value={form.lostCity}
                                            onChange={handleInputChange}
                                            placeholder="Ej: Donostia-San Sebastián"
                                            maxLength={120}
                                            required
                                            aria-invalid={!!errors.lostCity}
                                            aria-describedby={errors.lostCity ? "lostCity-error" : undefined}
                                            className={`w-full px-4 py-3 bg-white/5 border rounded-xl text-white placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-all ${errors.lostCity ? "border-red-500" : "border-white/10"
                                                }`}
                                        />
                                        {errors.lostCity && (
                                            <p id="lostCity-error" className="text-sm text-red-400 mt-1">{errors.lostCity}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm text-muted-foreground mb-2">
                                            Región
                                        </label>
                                        <select
                                            name="lostRegion"
                                            value={form.lostRegion}
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

                                <div>
                                    <label className="block text-sm text-muted-foreground mb-2">
                                        Circunstancias de la desaparición
                                    </label>
                                    <textarea
                                        name="circumstances"
                                        value={form.circumstances}
                                        onChange={handleInputChange}
                                        placeholder="Describe cómo sucedió: se escapó durante un paseo, salió corriendo por los petardos..."
                                        rows={4}
                                        maxLength={500}
                                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-all resize-none"
                                    />
                                </div>
                            </div>
                        )}

                        {/* Step 3: Contact Info */}
                        {step === 3 && (
                            <div className="space-y-6 animate-in fade-in">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center">
                                        <Phone className="w-5 h-5 text-blue-400" />
                                    </div>
                                    <h2 className="text-xl font-semibold text-white">Información de contacto</h2>
                                </div>

                                <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4 flex items-start gap-3">
                                    <Info className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                                    <p className="text-sm text-muted-foreground">
                                        Tus datos de contacto serán compartidos en las alertas para que quien encuentre
                                        a tu perro pueda contactarte directamente.
                                    </p>
                                </div>

                                <p className="text-sm text-muted-foreground">
                                    Indica al menos un teléfono o un email para que puedan avisarte rápido.
                                </p>

                                <div>
                                    <label className="block text-sm text-muted-foreground mb-2">
                                        Tu nombre *
                                    </label>
                                    <input
                                        type="text"
                                        name="ownerName"
                                        value={form.ownerName}
                                        onChange={handleInputChange}
                                        placeholder="Nombre y apellidos"
                                        maxLength={80}
                                        required
                                        autoComplete="name"
                                        aria-invalid={!!errors.ownerName}
                                        aria-describedby={errors.ownerName ? "ownerName-error" : undefined}
                                        className={`w-full px-4 py-3 bg-white/5 border rounded-xl text-white placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-all ${errors.ownerName ? "border-red-500" : "border-white/10"
                                            }`}
                                    />
                                    {errors.ownerName && (
                                        <p id="ownerName-error" className="text-sm text-red-400 mt-1">{errors.ownerName}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm text-muted-foreground mb-2">
                                        Teléfono de contacto
                                    </label>
                                    <input
                                        type="tel"
                                        name="ownerPhone"
                                        value={form.ownerPhone}
                                        onChange={handleInputChange}
                                        placeholder="+34 600 000 000"
                                        maxLength={30}
                                        autoComplete="tel"
                                        aria-invalid={!!errors.ownerPhone}
                                        aria-describedby={errors.ownerPhone ? "ownerPhone-error" : undefined}
                                        className={`w-full px-4 py-3 bg-white/5 border rounded-xl text-white placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-all ${errors.ownerPhone ? "border-red-500" : "border-white/10"
                                            }`}
                                    />
                                    {errors.ownerPhone && (
                                        <p id="ownerPhone-error" className="text-sm text-red-400 mt-1">{errors.ownerPhone}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm text-muted-foreground mb-2">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        name="ownerEmail"
                                        value={form.ownerEmail}
                                        onChange={handleInputChange}
                                        placeholder="tu@email.com"
                                        maxLength={120}
                                        autoComplete="email"
                                        aria-invalid={!!errors.ownerEmail}
                                        aria-describedby={errors.ownerEmail ? "ownerEmail-error" : undefined}
                                        className={`w-full px-4 py-3 bg-white/5 border rounded-xl text-white placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-all ${errors.ownerEmail ? "border-red-500" : "border-white/10"
                                            }`}
                                    />
                                    {errors.ownerEmail && (
                                        <p id="ownerEmail-error" className="text-sm text-red-400 mt-1">{errors.ownerEmail}</p>
                                    )}
                                </div>

                                <div className="flex items-center gap-3">
                                    <input
                                        type="checkbox"
                                        id="allowWhatsApp"
                                        name="allowWhatsApp"
                                        checked={form.allowWhatsApp}
                                        onChange={handleInputChange}
                                        className="w-5 h-5 rounded bg-white/5 border-white/20 text-amber-500 focus:ring-amber-500/50"
                                    />
                                    <label htmlFor="allowWhatsApp" className="text-muted-foreground">
                                        Pueden contactarme por WhatsApp
                                    </label>
                                </div>
                            </div>
                        )}

                        {/* Step 4: Photo Upload */}
                        {step === 4 && (
                            <div className="space-y-6 animate-in fade-in">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-10 h-10 bg-purple-500/20 rounded-full flex items-center justify-center">
                                        <Camera className="w-5 h-5 text-purple-400" />
                                    </div>
                                    <h2 className="text-xl font-semibold text-white">Foto del perro</h2>
                                </div>

                                <div className="bg-purple-500/10 border border-purple-500/20 rounded-xl p-4 flex items-start gap-3">
                                    <Info className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
                                    <p className="text-sm text-muted-foreground">
                                        Una foto clara y reciente aumenta significativamente las posibilidades
                                        de que alguien reconozca a tu perro.
                                    </p>
                                </div>

                                {/* Photo Upload Area */}
                                <div className="relative">
                                    {form.photoPreview ? (
                                        <div className="relative rounded-2xl overflow-hidden">
                                            <Image
                                                src={form.photoPreview}
                                                alt="Foto del perro"
                                                width={400}
                                                height={400}
                                                className="w-full h-64 object-cover"
                                            />
                                            <button
                                                type="button"
                                                onClick={removePhoto}
                                                aria-label="Eliminar foto"
                                                className="absolute top-3 right-3 p-2 bg-red-500 hover:bg-red-600 rounded-full text-white transition-colors"
                                            >
                                                <X className="w-5 h-5" />
                                            </button>
                                        </div>
                                    ) : (
                                        <label className="block cursor-pointer">
                                            <div className={`border-2 border-dashed rounded-2xl p-12 text-center transition-colors hover:border-amber-500/50 hover:bg-amber-500/5 ${errors.photo ? "border-red-500" : "border-white/20"
                                                }`}>
                                                <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
                                                    <Upload className="w-8 h-8 text-muted-foreground" />
                                                </div>
                                                <p className="text-white font-medium mb-2">
                                                    Sube una foto de tu perro
                                                </p>
                                                <p className="text-sm text-muted-foreground">
                                                    Arrastra aquí o haz clic para seleccionar
                                                </p>
                                                <p className="text-xs text-muted-foreground mt-2">
                                                    JPG, PNG o WebP (máx. 10MB)
                                                </p>
                                            </div>
                                            <input
                                                ref={fileInputRef}
                                                type="file"
                                                accept="image/jpeg,image/png,image/webp"
                                                onChange={handlePhotoUpload}
                                                className="hidden"
                                            />
                                        </label>
                                    )}
                                    {errors.photo && (
                                        <p className="text-sm text-red-400 mt-2">{errors.photo}</p>
                                    )}
                                </div>

                                {/* Summary */}
                                <div className="bg-white/5 rounded-2xl p-6 mt-8">
                                    <h3 className="text-lg font-semibold text-white mb-4">Resumen de la denuncia</h3>

                                    <div className="space-y-3 text-sm">
                                        <div className="flex justify-between">
                                            <span className="text-muted-foreground">Perro:</span>
                                            <span className="text-white font-medium">{form.dogName} ({form.breed})</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-muted-foreground">Color/Tamaño:</span>
                                            <span className="text-white">{form.color} / {sizeLabels[form.size]}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-muted-foreground">Desaparecido:</span>
                                            <span className="text-white">{form.lostDate} en {form.lostCity}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-muted-foreground">Lugar:</span>
                                            <span className="text-white">{form.lostLocation}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-muted-foreground">Contacto:</span>
                                            <span className="text-white">{form.ownerPhone || form.ownerEmail || "Sin datos"}</span>
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
                                    className="flex items-center gap-2 px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white font-medium rounded-xl transition-colors"
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
                                            Activar Alerta
                                        </>
                                    )}
                                </button>
                            )}
                        </div>
                    </div>
                </form>
            </section>

            {/* Platforms Section */}
            <section className="max-w-7xl mx-auto px-4 pb-16">
                <div className="text-center mb-10">
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                        Plataformas Especializadas
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        Además de nuestro sistema de alertas, te recomendamos registrar
                        la desaparición en estas plataformas especializadas:
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {plataformasPerdidos.slice(0, 5).map((platform) => (
                        <a
                            key={platform.id}
                            href={platform.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6 hover:border-amber-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/10"
                        >
                            <h3 className="text-lg font-semibold text-white group-hover:text-amber-400 transition-colors mb-2">
                                {platform.name}
                            </h3>
                            <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                                {platform.description}
                            </p>
                            <div className="flex items-center gap-2 text-amber-400 text-sm">
                                Visitar plataforma
                                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </div>
                        </a>
                    ))}
                </div>
            </section>

            {/* Emergency Tips */}
            <section className="max-w-7xl mx-auto px-4 pb-16">
                <div className="bg-gradient-to-br from-red-900/30 to-amber-900/20 rounded-3xl p-8 md:p-12 border border-red-500/20">
                    <div className="flex items-start gap-4 mb-6">
                        <div className="w-12 h-12 bg-red-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                            <AlertTriangle className="w-6 h-6 text-red-400" />
                        </div>
                        <div>
                            <h2 className="text-xl md:text-2xl font-bold text-white mb-2">
                                Consejos en las primeras horas
                            </h2>
                            <p className="text-muted-foreground">
                                Las primeras 24-48 horas son cruciales para encontrar a tu perro
                            </p>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <div className="flex items-start gap-3">
                                <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                                <p className="text-muted-foreground">
                                    <span className="text-white font-medium">Recorre la zona</span> donde desapareció,
                                    llamándolo con voz tranquila y llevando su comida favorita
                                </p>
                            </div>
                            <div className="flex items-start gap-3">
                                <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                                <p className="text-muted-foreground">
                                    <span className="text-white font-medium">Avisa a veterinarios</span> y clínicas
                                    cercanas por si alguien lo lleva herido
                                </p>
                            </div>
                            <div className="flex items-start gap-3">
                                <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                                <p className="text-muted-foreground">
                                    <span className="text-white font-medium">Deja ropa tuya</span> con tu olor en el
                                    lugar de desaparición, junto con agua y comida
                                </p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-start gap-3">
                                <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                                <p className="text-muted-foreground">
                                    <span className="text-white font-medium">Imprime carteles</span> con foto clara
                                    y colócalos en la zona (tiendas, farmacias, parques)
                                </p>
                            </div>
                            <div className="flex items-start gap-3">
                                <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                                <p className="text-muted-foreground">
                                    <span className="text-white font-medium">Contacta protectoras</span> de tu zona
                                    y centros de recogida municipal
                                </p>
                            </div>
                            <div className="flex items-start gap-3">
                                <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                                <p className="text-muted-foreground">
                                    <span className="text-white font-medium">Sal a buscarlo</span> al amanecer y
                                    atardecer cuando hay menos ruido y más calma
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}

"use client";

import { use, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
    ChevronLeft,
    Share2,
    Heart,
    MapPin,
    Phone,
    Mail,
    Globe,
    Calendar,
    Info,
    Check,
    AlertTriangle,
    Baby,
    Cat,
    Dog,
    Syringe,
    Scissors,
    Cpu,
    Scale,
    Clock,
    Send,
    Star,
} from "lucide-react";

import { adoptionDogs, type AdoptionDog, type DogGender, type DogSize, type DogAge } from "@/data/adoptionDogs";

const genderConfig: Record<DogGender, { label: string; icon: string; color: string }> = {
    macho: { label: "Macho", icon: "♂", color: "text-blue-400" },
    hembra: { label: "Hembra", icon: "♀", color: "text-pink-400" },
};

const sizeLabels: Record<DogSize, string> = {
    pequeño: "Pequeño (< 10kg)",
    mediano: "Mediano (10-25kg)",
    grande: "Grande (25-40kg)",
    muy_grande: "Muy Grande (> 40kg)",
};

// Placeholder image component
function DogPlaceholder({ name, gender, className = "" }: { name: string; gender: DogGender; className?: string }) {
    const colors = gender === "macho"
        ? "from-blue-500/30 to-cyan-500/30"
        : "from-pink-500/30 to-rose-500/30";

    return (
        <div className={`w-full h-full bg-gradient-to-br ${colors} flex items-center justify-center ${className}`}>
            <div className="text-center">
                <Dog className="w-16 h-16 text-white/40 mx-auto mb-2" />
                <span className="text-white/60 text-lg font-medium">{name}</span>
            </div>
        </div>
    );
}

export default function DogDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const dog = adoptionDogs.find((d) => d.id === id);
    const [activeImage, setActiveImage] = useState(0);
    const [isContactOpen, setIsContactOpen] = useState(false);
    const [shareStatus, setShareStatus] = useState("");

    if (!dog) {
        notFound();
    }

    const ageDisplay = dog.ageYears
        ? `${dog.ageYears} ${dog.ageYears === 1 ? 'año' : 'años'}${dog.ageMonths ? ` y ${dog.ageMonths} meses` : ''}`
        : `${dog.ageMonths} meses`;

    const ageLabel: Record<DogAge, string> = {
        cachorro: "Cachorro",
        joven: "Joven",
        adulto: "Adulto",
        senior: "Senior",
    };

    const formatDate = (value?: string) => {
        if (!value) return "—";
        const parsed = new Date(value);
        if (Number.isNaN(parsed.getTime())) return value;
        return parsed.toLocaleDateString("es-ES", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        });
    };

    const notifyShareStatus = (message: string) => {
        setShareStatus(message);
        window.setTimeout(() => setShareStatus(""), 2000);
    };

    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: `Adopta a ${dog.name} - Huellas del Norte`,
                    text: `Mira este perro en adopción: ${dog.name}, ${dog.breed} en ${dog.shelterCity}`,
                    url: window.location.href,
                });
                notifyShareStatus("Compartido");
            } catch (err) {
                console.log("Error sharing:", err);
                notifyShareStatus("No se pudo compartir");
            }
        } else if (navigator.clipboard) {
            try {
                await navigator.clipboard.writeText(window.location.href);
                notifyShareStatus("Enlace copiado");
            } catch (err) {
                notifyShareStatus("No se pudo copiar");
            }
        } else {
            notifyShareStatus("Compartir no disponible");
        }
    };

    return (
        <main className="min-h-screen bg-gradient-to-b from-card via-card/80 to-card pb-16">
            {/* Header / Breadcrumb */}
            <div className="bg-card/50 backdrop-blur-md border-b border-white/10 sticky top-16 z-20">
                <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
                    <Link
                        href="/adopcion"
                        className="flex items-center gap-2 text-muted-foreground hover:text-white transition-colors"
                    >
                        <ChevronLeft className="w-5 h-5" />
                        <span>Volver al listado</span>
                    </Link>
                    <div className="flex gap-3">
                        <button
                            onClick={handleShare}
                            aria-label="Compartir ficha"
                            className="p-2 hover:bg-white/10 rounded-full transition-colors text-muted-foreground hover:text-white"
                            title="Compartir"
                        >
                            <Share2 className="w-5 h-5" />
                        </button>
                        <button
                            aria-label="Guardar favorito"
                            className="p-2 hover:bg-white/10 rounded-full transition-colors text-muted-foreground hover:text-red-400"
                            title="Guardar favorito"
                        >
                            <Heart className="w-5 h-5" />
                        </button>
                    </div>
                </div>
                {shareStatus && (
                    <div className="max-w-7xl mx-auto px-4 pb-3 text-right text-xs text-emerald-300" aria-live="polite">
                        {shareStatus}
                    </div>
                )}
            </div>

            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
                    {/* Left Column: Gallery */}
                    <div className="space-y-4">
                        <div className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-card/80 border border-white/10">
                            {dog.photos.length > 0 ? (
                                <Image
                                    src={dog.photos[activeImage]}
                                    alt={`${dog.name} - Foto ${activeImage + 1}`}
                                    fill
                                    className="object-cover"
                                    priority
                                />
                            ) : (
                                <DogPlaceholder name={dog.name} gender={dog.gender} />
                            )}

                            {/* Status badges */}
                            <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                                {dog.isUrgent && (
                                    <span className="flex items-center gap-1.5 px-3 py-1.5 bg-red-500 text-white font-medium rounded-full shadow-lg">
                                        <AlertTriangle className="w-4 h-4" />
                                        Urgente
                                    </span>
                                )}
                                {dog.isFeatured && (
                                    <span className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-500 text-white font-medium rounded-full shadow-lg">
                                        <Star className="w-4 h-4" />
                                        Destacado
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* Thumbnails */}
                        {dog.photos.length > 1 && (
                            <div className="flex gap-4 overflow-x-auto pb-2">
                                {dog.photos.map((photo, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setActiveImage(index)}
                                        className={`relative w-24 aspect-square rounded-xl overflow-hidden flex-shrink-0 border-2 transition-all ${activeImage === index
                                            ? "border-emerald-500 ring-2 ring-emerald-500/30"
                                            : "border-transparent opacity-60 hover:opacity-100"
                                            }`}
                                    >
                                        <Image
                                            src={photo}
                                            alt={`${dog.name} thumbnail ${index + 1}`}
                                            fill
                                            className="object-cover"
                                        />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Right Column: Info */}
                    <div className="space-y-8">
                        {/* Title & Price */}
                        <div>
                            <div className="flex flex-wrap items-center justify-between gap-4 mb-2">
                                <h1 className="text-4xl font-bold text-white flex items-center gap-3">
                                    {dog.name}
                                    <span className={`text-3xl ${genderConfig[dog.gender].color}`} title={genderConfig[dog.gender].label}>
                                        {genderConfig[dog.gender].icon}
                                    </span>
                                </h1>
                                {dog.adoptionFee && (
                                    <div className="px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
                                        <span className="text-sm text-emerald-300 block">Cuota adopción</span>
                                        <span className="text-xl font-bold text-emerald-400">{dog.adoptionFee}€</span>
                                    </div>
                                )}
                            </div>
                            <p className="text-xl text-muted-foreground">
                                {dog.breed} {dog.mixedBreed && <span className="text-muted-foreground text-lg">(Mestizo)</span>}
                            </p>
                            <div className="flex items-center gap-2 text-muted-foreground mt-2">
                                <MapPin className="w-4 h-4" />
                                {dog.shelterCity}, {dog.shelterRegion}
                            </div>
                            <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground mt-3">
                                <span className="flex items-center gap-1.5">
                                    <Calendar className="w-4 h-4" />
                                    Publicado: {formatDate(dog.publishedDate)}
                                </span>
                                <span className="flex items-center gap-1.5">
                                    <Clock className="w-4 h-4" />
                                    En protectora desde: {formatDate(dog.arrivalDate)}
                                </span>
                            </div>
                        </div>

                        {/* Quick Stats Grid */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                            <div className="bg-white/5 rounded-xl p-3 border border-white/10">
                                <div className="text-muted-foreground text-xs mb-1">Edad</div>
                                <div className="text-white font-medium">{ageDisplay}</div>
                            </div>
                            <div className="bg-white/5 rounded-xl p-3 border border-white/10">
                                <div className="text-muted-foreground text-xs mb-1">Tamaño</div>
                                <div className="text-white font-medium">{sizeLabels[dog.size]}</div>
                            </div>
                            <div className="bg-white/5 rounded-xl p-3 border border-white/10">
                                <div className="text-muted-foreground text-xs mb-1">Peso</div>
                                <div className="text-white font-medium">{dog.weight ? `${dog.weight}kg` : "No indicado"}</div>
                            </div>
                            <div className="bg-white/5 rounded-xl p-3 border border-white/10">
                                <div className="text-muted-foreground text-xs mb-1">Etapa</div>
                                <div className="text-white font-medium">{ageLabel[dog.age]}</div>
                            </div>
                        </div>

                        {/* Health & Compatibility */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold text-white">Salud y Carácter</h3>
                            <div className="flex flex-wrap gap-3">
                                {dog.vaccinated && (
                                    <span className="flex items-center gap-2 px-3 py-1.5 bg-emerald-500/10 text-emerald-300 rounded-lg text-sm border border-emerald-500/20">
                                        <Syringe className="w-4 h-4" /> Vacunado
                                    </span>
                                )}
                                {dog.sterilized && (
                                    <span className="flex items-center gap-2 px-3 py-1.5 bg-purple-500/10 text-purple-300 rounded-lg text-sm border border-purple-500/20">
                                        <Scissors className="w-4 h-4" /> Esterilizado
                                    </span>
                                )}
                                {dog.microchipped && (
                                    <span className="flex items-center gap-2 px-3 py-1.5 bg-blue-500/10 text-blue-300 rounded-lg text-sm border border-blue-500/20">
                                        <Cpu className="w-4 h-4" /> Chip
                                    </span>
                                )}
                                {dog.compatibleWithChildren && (
                                    <span className="flex items-center gap-2 px-3 py-1.5 bg-pink-500/10 text-pink-300 rounded-lg text-sm border border-pink-500/20">
                                        <Baby className="w-4 h-4" /> Niños OK
                                    </span>
                                )}
                                {dog.compatibleWithCats && (
                                    <span className="flex items-center gap-2 px-3 py-1.5 bg-amber-500/10 text-amber-300 rounded-lg text-sm border border-amber-500/20">
                                        <Cat className="w-4 h-4" /> Gatos OK
                                    </span>
                                )}
                                {dog.compatibleWithDogs && (
                                    <span className="flex items-center gap-2 px-3 py-1.5 bg-cyan-500/10 text-cyan-300 rounded-lg text-sm border border-cyan-500/20">
                                        <Dog className="w-4 h-4" /> Perros OK
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* Description */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold text-white">Historia y Personalidad</h3>
                            <div className="prose prose-invert max-w-none text-muted-foreground">
                                <p>{dog.description}</p>
                                {dog.history && (
                                    <p className="mt-4 pt-4 border-t border-white/10">
                                        <strong className="text-white block mb-2">Su historia:</strong>
                                        {dog.history}
                                    </p>
                                )}
                                {dog.specialNeeds && (
                                    <div className="mt-4 p-4 bg-amber-500/10 border border-amber-500/20 rounded-xl flex items-start gap-3">
                                        <Info className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                                        <div>
                                            <strong className="text-amber-200 block mb-1">Necesidades Especiales:</strong>
                                            <p className="text-sm text-amber-100/80 m-0">{dog.specialNeeds}</p>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Tags */}
                            <div className="flex flex-wrap gap-2 mt-4">
                                {dog.personality.map((trait) => (
                                    <span key={trait} className="px-3 py-1 bg-white/10 text-white rounded-full text-sm">
                                        #{trait}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Shelter Card */}
                        <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                            <h3 className="text-lg font-semibold text-white mb-4">Gestionado por</h3>
                            <div className="flex items-start gap-4 mb-6">
                                <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center font-bold text-xl text-white">
                                    {dog.shelterName.charAt(0)}
                                </div>
                                <div>
                                    <h4 className="text-white font-medium">{dog.shelterName}</h4>
                                    <p className="text-sm text-muted-foreground">{dog.shelterCity}, {dog.shelterRegion}</p>
                                    <div className="flex gap-4 mt-2">
                                        {dog.shelterWebsite && (
                                            <a
                                                href={dog.shelterWebsite}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-emerald-400 hover:text-emerald-300 text-sm flex items-center gap-1"
                                            >
                                                <Globe className="w-3 h-3" /> Web
                                            </a>
                                        )}
                                        {dog.shelterPhone && (
                                            <a
                                                href={`tel:${dog.shelterPhone}`}
                                                className="text-muted-foreground hover:text-white text-sm flex items-center gap-1"
                                            >
                                                <Phone className="w-3 h-3" /> Llamar
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <button
                                onClick={() => setIsContactOpen(!isContactOpen)}
                                className="w-full py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-medium rounded-xl transition-colors flex items-center justify-center gap-2"
                            >
                                <Mail className="w-5 h-5" />
                                Contactar para adoptar
                            </button>

                            {/* Contact Form */}
                            {isContactOpen && (
                                <div className="mt-6 pt-6 border-t border-white/10 animate-in fade-in slide-in-from-top-2">
                                    <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                                        <div>
                                            <label className="block text-sm text-muted-foreground mb-1">Nombre</label>
                                            <input
                                                type="text"
                                                name="full_name"
                                                placeholder="Tu nombre"
                                                autoComplete="name"
                                                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm text-muted-foreground mb-1">Email</label>
                                            <input
                                                type="email"
                                                name="email"
                                                placeholder="tu@email.com"
                                                autoComplete="email"
                                                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm text-muted-foreground mb-1">Mensaje</label>
                                            <textarea
                                                name="message"
                                                rows={3}
                                                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 resize-none"
                                                defaultValue={`Hola, estoy interesado en adoptar a ${dog.name}. Me gustaría saber más sobre el proceso...`}
                                                required
                                            ></textarea>
                                        </div>
                                        <button className="w-full py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors flex items-center justify-center gap-2">
                                            <Send className="w-4 h-4" />
                                            Enviar mensaje
                                        </button>
                                    </form>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

import Link from "next/link";
import Section from "@/components/Section";
import {
    BadgeCheck,
    ShieldCheck,
    AlertTriangle,
    RefreshCcw,
    FileCheck,
    Mail,
} from "lucide-react";

const tiers = [
    {
        title: "Verificado por fuente",
        description:
            "Datos obtenidos de fuentes públicas, registros o integraciones oficiales.",
        badge: "Fuente",
        icon: ShieldCheck,
    },
    {
        title: "Verificado por comunidad",
        description:
            "Aportes con evidencia revisada por la comunidad y moderación.",
        badge: "Comunidad",
        icon: BadgeCheck,
    },
    {
        title: "En revisión",
        description:
            "Información recién enviada pendiente de validación.",
        badge: "En revisión",
        icon: AlertTriangle,
    },
];

const signals = [
    "Fecha de actualización visible en cada ficha.",
    "Historial de cambios cuando el dato tiene revisiones.",
    "Fuentes visibles cuando procede (ayuntamientos, colegios, asociaciones).",
    "Alertas manuales cuando hay discrepancias.",
];

const quickLinks = [
    { href: "/como-funciona", label: "Cómo funciona" },
    { href: "/faq", label: "Preguntas frecuentes" },
    { href: "/alertas-peligro", label: "Alertas de peligro" },
    { href: "/comunidad", label: "Comunidad" },
    { href: "/transparencia", label: "Transparencia" },
    { href: "/contacto", label: "Contacto" },
];

export default function VerificacionPage() {
    return (
        <main className="min-h-screen bg-background">
            <section className="relative overflow-hidden border-b border-border">
                <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-transparent to-background" />
                <div className="relative max-w-6xl mx-auto px-6 py-20">
                    <p className="text-sm uppercase tracking-widest text-accent font-semibold mb-4">
                        Verificacion
                    </p>
                    <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground">
                        Datos claros, fuentes visibles
                    </h1>
                    <p className="mt-4 text-lg text-foreground/70 max-w-2xl">
                        Nuestro sistema de verificación combina fuentes públicas, aportes profesionales y revisión comunitaria.
                    </p>
                </div>
            </section>

            <Section id="niveles" className="bg-background">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {tiers.map((tier) => {
                        const Icon = tier.icon;
                        return (
                            <div
                                key={tier.title}
                                className="rounded-2xl border border-border bg-card/80 p-6 shadow-lg"
                            >
                                <div className="flex items-center justify-between mb-4">
                                    <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
                                        <Icon className="h-5 w-5 text-primary" />
                                    </div>
                                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary">
                                        {tier.badge}
                                    </span>
                                </div>
                                <h2 className="text-xl font-semibold text-foreground mb-2">{tier.title}</h2>
                                <p className="text-foreground/70 text-sm">{tier.description}</p>
                            </div>
                        );
                    })}
                </div>
            </Section>

            <Section id="actualizacion" className="bg-secondary/10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                    <div className="rounded-2xl border border-border bg-card/80 p-6 shadow-lg">
                        <div className="flex items-center gap-3 mb-4">
                            <RefreshCcw className="h-5 w-5 text-primary" />
                            <h3 className="text-xl font-semibold text-foreground">
                                Señales de actualización
                            </h3>
                        </div>
                        <ul className="space-y-3 text-foreground/70 text-sm">
                            {signals.map((item) => (
                                <li key={item}>{item}</li>
                            ))}
                        </ul>
                    </div>

                    <div className="rounded-2xl border border-border bg-card/80 p-6 shadow-lg">
                        <div className="flex items-center gap-3 mb-4">
                            <FileCheck className="h-5 w-5 text-primary" />
                            <h3 className="text-xl font-semibold text-foreground">
                                Cómo revisamos
                            </h3>
                        </div>
                        <p className="text-foreground/70 text-sm">
                            Priorizamos datos críticos (salud, emergencias, seguridad) y revisamos aportes con evidencia
                            antes de publicarlos como verificados. Los cambios quedan trazados para asegurar consistencia.
                        </p>
                    </div>
                </div>
            </Section>

            <Section id="correcciones" className="bg-background">
                <div className="rounded-3xl border border-border bg-card/80 p-8 md:p-12 shadow-xl">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                        <div>
                            <h2 className="text-3xl font-serif font-bold text-foreground">
                                ¿Has encontrado un dato incorrecto?
                            </h2>
                            <p className="mt-3 text-foreground/70 max-w-2xl">
                                Envíanos la corrección con una fuente o evidencia. Lo revisamos y actualizamos lo antes posible.
                            </p>
                        </div>
                        <Link
                            href="/contacto"
                            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors"
                        >
                            Contactar equipo <Mail className="h-4 w-4" />
                        </Link>
                    </div>
                </div>
            </Section>

            <Section id="enlaces" className="bg-secondary/10">
                <div className="rounded-3xl border border-border bg-card/80 p-8 md:p-10 shadow-lg">
                    <h2 className="text-2xl font-serif font-bold text-foreground">Enlaces útiles</h2>
                    <p className="mt-2 text-sm text-foreground/70">
                        Recursos relacionados con verificación y seguridad comunitaria.
                    </p>
                    <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                        {quickLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="rounded-xl border border-border bg-background/70 px-4 py-3 text-sm font-semibold text-foreground hover:bg-primary/10 transition-colors"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>
                </div>
            </Section>
        </main>
    );
}

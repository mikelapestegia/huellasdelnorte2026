import Link from "next/link";
import Section from "@/components/Section";
import {
    MapPinned,
    SlidersHorizontal,
    Users,
    AlertTriangle,
    ShieldCheck,
    Building2,
    ArrowRight,
} from "lucide-react";

const steps = [
    {
        title: "Explora el mapa",
        description:
            "Encuentra rutas, alojamientos, veterinarios y espacios pet friendly en el norte peninsular con capas claras.",
        icon: MapPinned,
    },
    {
        title: "Filtra y decide",
        description:
            "Usa filtros por región, servicios y necesidades reales para elegir el lugar adecuado para tu perro.",
        icon: SlidersHorizontal,
    },
    {
        title: "Participa en comunidad",
        description:
            "Comparte experiencias, recomendaciones y ayuda a mantener la información útil y actualizada.",
        icon: Users,
    },
    {
        title: "Alerta cuando sea necesario",
        description:
            "Reporta peligros o incidencias para proteger a la comunidad y activar avisos rápidos.",
        icon: AlertTriangle,
    },
];

const pillars = [
    {
        title: "Datos verificables",
        description:
            "Fuentes públicas, aportes de profesionales y revisión comunitaria para mantener calidad.",
        icon: ShieldCheck,
    },
    {
        title: "Enfoque local",
        description:
            "Cobertura prioritaria de la zona norte, con detalle por regiones y servicios útiles.",
        icon: MapPinned,
    },
    {
        title: "Valor para profesionales",
        description:
            "Presencia clara en el mapa, formularios de actualización y opciones para destacar.",
        icon: Building2,
    },
];

const quickLinks = [
    { href: "/verificacion", label: "Verificación de datos" },
    { href: "/faq", label: "Preguntas frecuentes" },
    { href: "/comunidad", label: "Comunidad" },
    { href: "/guarderias/mapa", label: "Mapa de guarderías" },
    { href: "/profesionales", label: "Opciones profesionales" },
    { href: "/contacto", label: "Contacto" },
];

export default function ComoFuncionaPage() {
    return (
        <main className="min-h-screen bg-background">
            <section className="relative overflow-hidden border-b border-border">
                <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-transparent to-background" />
                <div className="relative max-w-6xl mx-auto px-6 py-20">
                    <p className="text-sm uppercase tracking-widest text-accent font-semibold mb-4">
                        Como funciona
                    </p>
                    <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground">
                        Una guía clara para moverte con tu perro
                    </h1>
                    <p className="mt-4 text-lg text-foreground/70 max-w-2xl">
                        Descubre cómo usar la plataforma, cómo se organizan los datos y cómo puedes aportar.
                    </p>
                </div>
            </section>

            <Section id="pasos" className="bg-background">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {steps.map((step) => {
                        const Icon = step.icon;
                        return (
                            <div
                                key={step.title}
                                className="rounded-2xl border border-border bg-card/80 p-6 shadow-lg"
                            >
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
                                        <Icon className="h-5 w-5 text-primary" />
                                    </div>
                                    <h2 className="text-xl font-semibold text-foreground">{step.title}</h2>
                                </div>
                                <p className="text-foreground/70">{step.description}</p>
                            </div>
                        );
                    })}
                </div>
            </Section>

            <Section id="pilares" className="bg-secondary/10">
                <div className="flex flex-col items-center text-center mb-10">
                    <p className="text-sm uppercase tracking-widest text-accent font-semibold mb-3">
                        Pilares
                    </p>
                    <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground">
                        Lo que sostiene la experiencia
                    </h2>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {pillars.map((pillar) => {
                        const Icon = pillar.icon;
                        return (
                            <div
                                key={pillar.title}
                                className="rounded-2xl border border-border bg-card/90 p-6 shadow-lg"
                            >
                                <div className="flex items-center gap-3 mb-3">
                                    <Icon className="h-5 w-5 text-primary" />
                                    <h3 className="font-semibold text-foreground">{pillar.title}</h3>
                                </div>
                                <p className="text-sm text-foreground/70">{pillar.description}</p>
                            </div>
                        );
                    })}
                </div>
            </Section>

            <Section id="profesionales" className="bg-background">
                <div className="rounded-3xl border border-border bg-card/80 p-8 md:p-12 shadow-xl">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                        <div>
                            <p className="text-sm uppercase tracking-widest text-accent font-semibold mb-2">
                                Para profesionales
                            </p>
                            <h2 className="text-3xl font-serif font-bold text-foreground">
                                Haz visible tu servicio en el mapa
                            </h2>
                            <p className="mt-3 text-foreground/70 max-w-2xl">
                                Sube tus datos, mantén disponibilidad al día y destaca frente a usuarios que buscan
                                servicios de confianza.
                            </p>
                        </div>
                        <Link
                            href="/profesionales"
                            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors"
                        >
                            Ver opciones profesionales <ArrowRight className="h-4 w-4" />
                        </Link>
                    </div>
                </div>
            </Section>

            <Section id="enlaces" className="bg-secondary/10">
                <div className="rounded-3xl border border-border bg-card/80 p-8 md:p-10 shadow-lg">
                    <h2 className="text-2xl font-serif font-bold text-foreground">Enlaces útiles</h2>
                    <p className="mt-2 text-sm text-foreground/70">
                        Accesos rápidos para profundizar o resolver dudas.
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

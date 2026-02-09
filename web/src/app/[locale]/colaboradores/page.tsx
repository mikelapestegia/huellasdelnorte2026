import Link from "next/link";
import Section from "@/components/Section";
import { Handshake, Building2, Users, MapPinned } from "lucide-react";

const collaborations = [
    {
        title: "Protectoras y asociaciones",
        description:
            "Ayudamos a difundir adopciones, alertas y campañas de apoyo.",
        icon: Users,
    },
    {
        title: "Profesionales pet friendly",
        description:
            "Veterinarios, guarderías y alojamientos con información clara y actualizada.",
        icon: Building2,
    },
    {
        title: "Administraciones locales",
        description:
            "Datos públicos para playas, ordenanzas y servicios municipales.",
        icon: MapPinned,
    },
    {
        title: "Comunidad activa",
        description:
            "Personas que comparten rutas, eventos y verifican información.",
        icon: Handshake,
    },
];

export default function ColaboradoresPage() {
    return (
        <main className="min-h-screen bg-background">
            <section className="relative overflow-hidden border-b border-border">
                <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-transparent to-background" />
                <div className="relative max-w-6xl mx-auto px-6 py-20">
                    <p className="text-sm uppercase tracking-widest text-accent font-semibold mb-4">
                        Colaboradores
                    </p>
                    <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground">
                        Construimos red con entidades locales
                    </h1>
                    <p className="mt-4 text-lg text-foreground/70 max-w-2xl">
                        Trabajamos con personas y organizaciones para que la información sea útil y confiable.
                    </p>
                </div>
            </section>

            <Section className="bg-background">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {collaborations.map((item) => {
                        const Icon = item.icon;
                        return (
                            <div
                                key={item.title}
                                className="rounded-2xl border border-border bg-card/80 p-6 shadow-lg"
                            >
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
                                        <Icon className="h-5 w-5 text-primary" />
                                    </div>
                                    <h2 className="text-lg font-semibold text-foreground">{item.title}</h2>
                                </div>
                                <p className="text-foreground/70 text-sm">{item.description}</p>
                            </div>
                        );
                    })}
                </div>
            </Section>

            <Section className="bg-secondary/10">
                <div className="rounded-3xl border border-border bg-card/80 p-8 md:p-10 shadow-lg">
                    <h2 className="text-2xl font-serif font-bold text-foreground">Enlaces útiles</h2>
                    <p className="mt-2 text-sm text-foreground/70">
                        Recursos para profesionales, comunidad y entidades locales.
                    </p>
                    <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                        {[
                            { href: "/profesionales", label: "Profesionales" },
                            { href: "/guarderias", label: "Guarderías" },
                            { href: "/veterinarios", label: "Veterinarios" },
                            { href: "/comunidad", label: "Comunidad" },
                            { href: "/verificacion", label: "Verificación" },
                            { href: "/contacto", label: "Contacto" },
                        ].map((link) => (
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

import Link from "next/link";
import Section from "@/components/Section";
import { Accessibility, ShieldCheck, Mail } from "lucide-react";

const commitments = [
    "Contenido legible con buen contraste y jerarquía clara.",
    "Estructuras simples para que la navegación sea rápida.",
    "Compatibilidad con lectores de pantalla en componentes clave.",
    "Revisión periódica de formularios y elementos interactivos.",
];

export default function AccesibilidadPage() {
    return (
        <main className="min-h-screen bg-background">
            <section className="relative overflow-hidden border-b border-border">
                <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-transparent to-background" />
                <div className="relative max-w-6xl mx-auto px-6 py-20">
                    <p className="text-sm uppercase tracking-widest text-accent font-semibold mb-4">
                        Accesibilidad
                    </p>
                    <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground">
                        Acceso claro para todas las personas
                    </h1>
                    <p className="mt-4 text-lg text-foreground/70 max-w-2xl">
                        Nos comprometemos a mejorar la experiencia y la accesibilidad de forma continua.
                    </p>
                </div>
            </section>

            <Section className="bg-background">
                <div className="rounded-2xl border border-border bg-card/80 p-6 shadow-lg">
                    <div className="flex items-center gap-3 mb-4">
                        <Accessibility className="h-5 w-5 text-primary" />
                        <h2 className="text-2xl font-serif font-bold text-foreground">
                            Compromisos
                        </h2>
                    </div>
                    <ul className="space-y-3 text-foreground/70 text-sm">
                        {commitments.map((item) => (
                            <li key={item}>{item}</li>
                        ))}
                    </ul>
                </div>
            </Section>

            <Section className="bg-secondary/10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="rounded-2xl border border-border bg-card/80 p-6 shadow-lg">
                        <div className="flex items-center gap-3 mb-3">
                            <ShieldCheck className="h-5 w-5 text-primary" />
                            <h3 className="text-lg font-semibold text-foreground">Revisión continua</h3>
                        </div>
                        <p className="text-sm text-foreground/70">
                            Seguimos ajustando contrastes, tamaños y navegación para mejorar la experiencia.
                        </p>
                    </div>
                    <div className="rounded-2xl border border-border bg-card/80 p-6 shadow-lg">
                        <div className="flex items-center gap-3 mb-3">
                            <Mail className="h-5 w-5 text-primary" />
                            <h3 className="text-lg font-semibold text-foreground">Feedback</h3>
                        </div>
                        <p className="text-sm text-foreground/70">
                            Si encuentras barreras, escríbenos desde la página de contacto.
                        </p>
                    </div>
                </div>
            </Section>

            <Section className="bg-background">
                <div className="rounded-3xl border border-border bg-card/80 p-8 md:p-10 shadow-lg">
                    <h2 className="text-2xl font-serif font-bold text-foreground">Enlaces útiles</h2>
                    <p className="mt-2 text-sm text-foreground/70">
                        Más información sobre políticas, soporte y transparencia.
                    </p>
                    <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                        {[
                            { href: "/transparencia", label: "Transparencia" },
                            { href: "/verificacion", label: "Verificación" },
                            { href: "/contacto", label: "Contacto" },
                            { href: "/faq", label: "FAQ" },
                            { href: "/como-funciona", label: "Cómo funciona" },
                            { href: "/quienes-somos", label: "Quiénes somos" },
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

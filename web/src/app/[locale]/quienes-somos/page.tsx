import Link from "next/link";
import Section from "@/components/Section";
import { HeartHandshake, PawPrint, Globe2, Users } from "lucide-react";

const values = [
    {
        title: "Bienestar real",
        description:
            "Priorizamos seguridad, salud y experiencias positivas para perros y familias.",
        icon: HeartHandshake,
    },
    {
        title: "Comunidad activa",
        description:
            "Creemos en la colaboración entre personas, asociaciones y profesionales.",
        icon: Users,
    },
    {
        title: "Territorio vivo",
        description:
            "Cuidamos el norte peninsular y su ecosistema con información útil y actualizada.",
        icon: Globe2,
    },
    {
        title: "Cultura perruna",
        description:
            "Promovemos ocio responsable, adopción informada y recursos de calidad.",
        icon: PawPrint,
    },
];

export default function QuienesSomosPage() {
    return (
        <main className="min-h-screen bg-background">
            <section className="relative overflow-hidden border-b border-border">
                <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-transparent to-background" />
                <div className="relative max-w-6xl mx-auto px-6 py-20">
                    <p className="text-sm uppercase tracking-widest text-accent font-semibold mb-4">
                        Quienes somos
                    </p>
                    <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground">
                        Una comunidad que hace la vida canina más fácil
                    </h1>
                    <p className="mt-4 text-lg text-foreground/70 max-w-2xl">
                        Huellas del Norte reúne información útil, recursos locales y una red activa para
                        quienes viven con perros en el norte peninsular.
                    </p>
                </div>
            </section>

            <Section className="bg-background">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="rounded-2xl border border-border bg-card/80 p-6 shadow-lg">
                        <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Nuestra misión</h2>
                        <p className="text-foreground/70">
                            Facilitar decisiones cotidianas con datos fiables, comunidad activa y herramientas
                            pensadas para el día a día.
                        </p>
                    </div>
                    <div className="rounded-2xl border border-border bg-card/80 p-6 shadow-lg">
                        <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Nuestra visión</h2>
                        <p className="text-foreground/70">
                            Un territorio más amable con los perros, donde la información sea clara y accesible.
                        </p>
                    </div>
                </div>
            </Section>

            <Section className="bg-secondary/10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {values.map((value) => {
                        const Icon = value.icon;
                        return (
                            <div
                                key={value.title}
                                className="rounded-2xl border border-border bg-card/80 p-6 shadow-lg"
                            >
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
                                        <Icon className="h-5 w-5 text-primary" />
                                    </div>
                                    <h3 className="font-semibold text-foreground">{value.title}</h3>
                                </div>
                                <p className="text-foreground/70 text-sm">{value.description}</p>
                            </div>
                        );
                    })}
                </div>
            </Section>

            <Section className="bg-background">
                <div className="rounded-3xl border border-border bg-card/80 p-8 md:p-10 shadow-lg">
                    <h2 className="text-2xl font-serif font-bold text-foreground">Enlaces útiles</h2>
                    <p className="mt-2 text-sm text-foreground/70">
                        Conoce más sobre nuestra comunidad y servicios.
                    </p>
                    <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                        {[
                            { href: "/como-funciona", label: "Cómo funciona" },
                            { href: "/comunidad", label: "Comunidad" },
                            { href: "/verificacion", label: "Verificación" },
                            { href: "/colaboradores", label: "Colaboradores" },
                            { href: "/transparencia", label: "Transparencia" },
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

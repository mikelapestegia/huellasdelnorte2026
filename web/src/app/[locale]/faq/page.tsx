import Link from "next/link";
import Section from "@/components/Section";

const faqs = [
    {
        question: "¿Cómo se actualiza la información del mapa?",
        answer:
            "Se combina información pública, aportes de profesionales y validación comunitaria.",
    },
    {
        question: "¿Puedo reportar datos incorrectos?",
        answer:
            "Sí. Desde la sección de verificación o contacto puedes enviar una corrección con evidencia.",
    },
    {
        question: "¿Qué incluye el pasaporte digital?",
        answer:
            "Un resumen de datos básicos, vacunas, seguros y documentación útil para viajes y servicios.",
    },
    {
        question: "¿Cómo publico un evento?",
        answer:
            "En la sección de eventos puedes enviar una propuesta que revisamos antes de publicar.",
    },
    {
        question: "¿Es gratis usar la plataforma?",
        answer:
            "El acceso general es gratuito. Algunos servicios profesionales pueden tener planes de visibilidad.",
    },
    {
        question: "¿Cómo funcionan las alertas de peligro?",
        answer:
            "Puedes reportar una alerta con ubicación y descripción. Se revisa y se difunde a la comunidad.",
    },
];

const quickLinks = [
    { href: "/como-funciona", label: "Cómo funciona" },
    { href: "/verificacion", label: "Verificación" },
    { href: "/pasaporte", label: "Pasaporte digital" },
    { href: "/eventos", label: "Eventos" },
    { href: "/alertas-peligro", label: "Alertas de peligro" },
    { href: "/contacto", label: "Contacto" },
];

export default function FaqPage() {
    return (
        <main className="min-h-screen bg-background">
            <section className="relative overflow-hidden border-b border-border">
                <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-transparent to-background" />
                <div className="relative max-w-6xl mx-auto px-6 py-20">
                    <p className="text-sm uppercase tracking-widest text-accent font-semibold mb-4">
                        FAQ
                    </p>
                    <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground">
                        Preguntas frecuentes
                    </h1>
                    <p className="mt-4 text-lg text-foreground/70 max-w-2xl">
                        Respuestas rápidas para entender cómo funciona la plataforma.
                    </p>
                </div>
            </section>

            <Section className="bg-background">
                <div className="space-y-4">
                    {faqs.map((item) => (
                        <div
                            key={item.question}
                            className="rounded-2xl border border-border bg-card/80 p-6 shadow-lg"
                        >
                            <h2 className="text-lg font-semibold text-foreground mb-2">
                                {item.question}
                            </h2>
                            <p className="text-foreground/70 text-sm">{item.answer}</p>
                        </div>
                    ))}
                </div>
            </Section>

            <Section className="bg-secondary/10">
                <div className="rounded-3xl border border-border bg-card/80 p-8 md:p-10 shadow-lg">
                    <h2 className="text-2xl font-serif font-bold text-foreground">Enlaces útiles</h2>
                    <p className="mt-2 text-sm text-foreground/70">
                        Explora secciones relacionadas con las preguntas más frecuentes.
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

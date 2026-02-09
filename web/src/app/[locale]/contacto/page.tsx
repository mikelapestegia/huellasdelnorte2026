import Link from "next/link";
import Section from "@/components/Section";
import { Mail, MessageCircle, ShieldCheck } from "lucide-react";

export default function ContactoPage() {
    return (
        <main className="min-h-screen bg-background">
            <section className="relative overflow-hidden border-b border-border">
                <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-transparent to-background" />
                <div className="relative max-w-6xl mx-auto px-6 py-20">
                    <p className="text-sm uppercase tracking-widest text-accent font-semibold mb-4">
                        Contacto
                    </p>
                    <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground">
                        Estamos para ayudarte
                    </h1>
                    <p className="mt-4 text-lg text-foreground/70 max-w-2xl">
                        Si detectas un error, quieres colaborar o necesitas soporte, escríbenos.
                    </p>
                </div>
            </section>

            <Section className="bg-background">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="rounded-2xl border border-border bg-card/80 p-6 shadow-lg">
                        <h2 className="text-2xl font-serif font-bold text-foreground mb-4">Formulario</h2>
                        <form className="space-y-4">
                            <div>
                                <label className="text-sm text-foreground/70">Nombre</label>
                                <input
                                    type="text"
                                    className="mt-1 w-full rounded-xl border border-border bg-card/60 px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                                    placeholder="Tu nombre"
                                />
                            </div>
                            <div>
                                <label className="text-sm text-foreground/70">Email</label>
                                <input
                                    type="email"
                                    className="mt-1 w-full rounded-xl border border-border bg-card/60 px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                                    placeholder="tu@email.com"
                                />
                            </div>
                            <div>
                                <label className="text-sm text-foreground/70">Mensaje</label>
                                <textarea
                                    rows={4}
                                    className="mt-1 w-full rounded-xl border border-border bg-card/60 px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                                    placeholder="Cuéntanos en qué podemos ayudar"
                                />
                            </div>
                            <button
                                type="submit"
                                className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-primary-foreground font-semibold hover:bg-primary/90 transition-colors"
                            >
                                Enviar mensaje
                            </button>
                        </form>
                    </div>

                    <div className="space-y-6">
                        <div className="rounded-2xl border border-border bg-card/80 p-6 shadow-lg">
                            <div className="flex items-center gap-3 mb-3">
                                <Mail className="h-5 w-5 text-primary" />
                                <h3 className="text-lg font-semibold text-foreground">Soporte general</h3>
                            </div>
                            <p className="text-sm text-foreground/70">
                                Resolvemos dudas sobre cuentas, contenido y funcionamiento de la plataforma.
                            </p>
                        </div>

                        <div className="rounded-2xl border border-border bg-card/80 p-6 shadow-lg">
                            <div className="flex items-center gap-3 mb-3">
                                <MessageCircle className="h-5 w-5 text-primary" />
                                <h3 className="text-lg font-semibold text-foreground">Colaboraciones</h3>
                            </div>
                            <p className="text-sm text-foreground/70">
                                Si eres profesional o entidad y quieres aparecer en el mapa, cuéntanos tu caso.
                            </p>
                        </div>

                        <div className="rounded-2xl border border-border bg-card/80 p-6 shadow-lg">
                            <div className="flex items-center gap-3 mb-3">
                                <ShieldCheck className="h-5 w-5 text-primary" />
                                <h3 className="text-lg font-semibold text-foreground">Verificación</h3>
                            </div>
                            <p className="text-sm text-foreground/70">
                                Envíanos pruebas o enlaces si detectas datos incompletos o incorrectos.
                            </p>
                        </div>
                    </div>
                </div>
            </Section>

            <Section className="bg-secondary/10">
                <div className="rounded-3xl border border-border bg-card/80 p-8 md:p-10 shadow-lg">
                    <h2 className="text-2xl font-serif font-bold text-foreground">Enlaces útiles</h2>
                    <p className="mt-2 text-sm text-foreground/70">
                        Recursos para corregir datos, colaborar o conocer la plataforma.
                    </p>
                    <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                        {[
                            { href: "/verificacion", label: "Verificación" },
                            { href: "/como-funciona", label: "Cómo funciona" },
                            { href: "/profesionales", label: "Profesionales" },
                            { href: "/colaboradores", label: "Colaboradores" },
                            { href: "/transparencia", label: "Transparencia" },
                            { href: "/faq", label: "FAQ" },
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

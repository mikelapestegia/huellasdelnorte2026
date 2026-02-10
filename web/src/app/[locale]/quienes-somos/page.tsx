import Link from "next/link";
import Section from "@/components/Section";
import { HeartHandshake, PawPrint, Globe2, Users } from "lucide-react";
import { getTranslations } from "next-intl/server";

export default async function QuienesSomosPage() {
    const t = await getTranslations("about_us");

    const values = [
        {
            title: t("values.wellbeing_title"),
            description: t("values.wellbeing_desc"),
            icon: HeartHandshake,
        },
        {
            title: t("values.community_title"),
            description: t("values.community_desc"),
            icon: Users,
        },
        {
            title: t("values.territory_title"),
            description: t("values.territory_desc"),
            icon: Globe2,
        },
        {
            title: t("values.culture_title"),
            description: t("values.culture_desc"),
            icon: PawPrint,
        },
    ];

    const usefulLinks = [
        { href: "/como-funciona", label: t("links.how_it_works") },
        { href: "/comunidad", label: t("links.community") },
        { href: "/verificacion", label: t("links.verification") },
        { href: "/colaboradores", label: t("links.collaborators") },
        { href: "/transparencia", label: t("links.transparency") },
        { href: "/contacto", label: t("links.contact") },
    ];

    return (
        <main className="min-h-screen bg-background">
            <section className="relative overflow-hidden border-b border-border">
                <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-transparent to-background" />
                <div className="relative max-w-6xl mx-auto px-6 py-20">
                    <p className="text-sm uppercase tracking-widest text-accent font-semibold mb-4">
                        {t("label")}
                    </p>
                    <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground">
                        {t("title")}
                    </h1>
                    <p className="mt-4 text-lg text-foreground/70 max-w-2xl">
                        {t("description")}
                    </p>
                </div>
            </section>

            <Section className="bg-background">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="rounded-2xl border border-border bg-card/80 p-6 shadow-lg">
                        <h2 className="text-2xl font-serif font-bold text-foreground mb-3">{t("mission_title")}</h2>
                        <p className="text-foreground/70">
                            {t("mission_desc")}
                        </p>
                    </div>
                    <div className="rounded-2xl border border-border bg-card/80 p-6 shadow-lg">
                        <h2 className="text-2xl font-serif font-bold text-foreground mb-3">{t("vision_title")}</h2>
                        <p className="text-foreground/70">
                            {t("vision_desc")}
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
                    <h2 className="text-2xl font-serif font-bold text-foreground">{t("links.title")}</h2>
                    <p className="mt-2 text-sm text-foreground/70">
                        {t("links.desc")}
                    </p>
                    <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                        {usefulLinks.map((link) => (
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

"use client";

import { Dog, Heart, MapPin, Mail, ExternalLink } from "lucide-react";
import { Link } from "@/navigation";
import { useTranslations } from "next-intl";

const footerSections = [
    {
        titleKey: "explore",
        links: [
            { href: "/rutas", labelKey: "routes" },
            { href: "/adopcion", labelKey: "adoption" },
            { href: "/guarderias", labelKey: "kennels" },
            { href: "/hosteleria", labelKey: "hospitality" },
            { href: "/veterinarios", labelKey: "vets" },
            { href: "/eventos", labelKey: "events" },
        ],
    },
    {
        titleKey: "community",
        links: [
            { href: "/perros-perdidos", labelKey: "lost_dogs" },
            { href: "/alertas-peligro", labelKey: "danger_alerts" },
            { href: "/foro", labelKey: "forum" },
            { href: "/blog", labelKey: "blog" },
            { href: "/creadores", labelKey: "creators" },
            { href: "/comunidad", labelKey: "community_page" },
        ],
    },
    {
        titleKey: "about",
        links: [
            { href: "/quienes-somos", labelKey: "about_us" },
            { href: "/como-funciona", labelKey: "how_it_works" },
            { href: "/transparencia", labelKey: "transparency" },
            { href: "/colaboradores", labelKey: "partners" },
            { href: "/accesibilidad", labelKey: "accessibility" },
            { href: "/contacto", labelKey: "contact" },
        ],
    },
];

export default function Footer() {
    const t = useTranslations("footer");

    return (
        <footer className="w-full bg-card/50 border-t border-border">
            {/* Main Footer */}
            <div className="max-w-7xl mx-auto px-6 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8">
                    {/* Brand Column */}
                    <div className="lg:col-span-2 space-y-6">
                        <Link href="/" className="flex items-center gap-3 group">
                            <div className="h-12 w-12 bg-gradient-to-br from-emerald-500/20 to-emerald-900/40 rounded-xl flex items-center justify-center border border-emerald-500/20">
                                <Dog className="h-6 w-6 text-emerald-400" />
                            </div>
                            <div>
                                <span className="font-serif text-xl font-bold text-foreground block">
                                    Huellas del Norte
                                </span>
                                <span className="text-xs text-muted-foreground">
                                    {t("tagline")}
                                </span>
                            </div>
                        </Link>

                        <p className="text-sm text-foreground/60 leading-relaxed max-w-sm">
                            {t("description")}
                        </p>

                        {/* Newsletter mini */}
                        <div className="flex gap-2 max-w-sm">
                            <div className="relative flex-1">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <input
                                    type="email"
                                    placeholder={t("newsletter_placeholder")}
                                    className="w-full pl-10 pr-3 py-2.5 rounded-lg bg-background border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500"
                                />
                            </div>
                            <button className="px-4 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-bold transition-colors shadow-lg shadow-emerald-900/20">
                                {t("subscribe")}
                            </button>
                        </div>
                    </div>

                    {/* Link Columns */}
                    {footerSections.map((section) => (
                        <div key={section.titleKey}>
                            <h3 className="font-semibold text-foreground text-sm uppercase tracking-wider mb-4">
                                {t(`sections.${section.titleKey}`)}
                            </h3>
                            <ul className="space-y-3">
                                {section.links.map((link) => (
                                    <li key={link.href}>
                                        <Link
                                            href={link.href}
                                            className="text-sm text-foreground/60 hover:text-emerald-400 transition-colors"
                                        >
                                            {t(`links.${link.labelKey}`)}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-border">
                <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col sm:flex-row justify-between items-center gap-4">
                    <p className="text-xs text-foreground/40">
                        {t("copyright")}
                    </p>

                    <div className="flex items-center gap-6 text-xs text-foreground/40">
                        <Link href="/quienes-somos" className="hover:text-foreground/70 transition-colors">
                            {t("links.privacy")}
                        </Link>
                        <Link href="/quienes-somos" className="hover:text-foreground/70 transition-colors">
                            {t("links.terms")}
                        </Link>
                        <Link href="/accesibilidad" className="hover:text-foreground/70 transition-colors">
                            {t("links.accessibility")}
                        </Link>
                    </div>

                    <div className="flex items-center gap-1 text-xs text-foreground/40">
                        <span>{t("made_with")}</span>
                        <Heart className="h-3 w-3 text-red-400 fill-red-400" />
                        <span>{t("in_north")}</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}

"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Link, usePathname, locales } from "@/navigation";
import { useLocale, useTranslations } from "next-intl";
import { useAuth } from "@/context/AuthContext";
import {
    Dog, Menu, X, Map, FileCheck, Route, Home, MessageCircle,
    AlertTriangle, Skull, Hotel, Utensils, Video, Stethoscope,
    Film, Headphones, LogOut, User as UserIcon, Calendar, ShoppingCart,
    FileText, Heart, ChevronDown, PawPrint, Compass
} from "lucide-react";

/* ───────── grouped nav structure ───────── */
interface NavItem { href: string; iconKey: string; labelKey: string }
interface NavGroup { labelKey: string; items: NavItem[] }

const primaryLinks: NavItem[] = [
    { href: "/adopcion", iconKey: "Heart", labelKey: "adoption" },
    { href: "/perros-perdidos", iconKey: "AlertTriangle", labelKey: "lost_dogs" },
    { href: "/#mapa-interactivo", iconKey: "Map", labelKey: "map" },
    { href: "/rutas", iconKey: "Route", labelKey: "routes" },
];

const dropdownGroups: NavGroup[] = [
    {
        labelKey: "services",
        items: [
            { href: "/guarderias", iconKey: "Hotel", labelKey: "kennels" },
            { href: "/veterinarios", iconKey: "Stethoscope", labelKey: "vets" },
            { href: "/hosteleria", iconKey: "Utensils", labelKey: "hospitality" },
            { href: "/pasaporte", iconKey: "FileCheck", labelKey: "passport" },
        ],
    },
    {
        labelKey: "explore",
        items: [
            { href: "/eventos", iconKey: "Calendar", labelKey: "events" },
            { href: "/creadores", iconKey: "Video", labelKey: "creators" },
            { href: "/cine", iconKey: "Film", labelKey: "cinema" },
            { href: "/audio", iconKey: "Headphones", labelKey: "audio" },
            { href: "/marketplace", iconKey: "ShoppingCart", labelKey: "marketplace" },
            { href: "/blog", iconKey: "FileText", labelKey: "blog" },
        ],
    },
    {
        labelKey: "community",
        items: [
            { href: "/comunidad", iconKey: "PawPrint", labelKey: "community" },
            { href: "/foro", iconKey: "MessageCircle", labelKey: "forum" },
            { href: "/alertas-peligro", iconKey: "Skull", labelKey: "danger_alerts" },
        ],
    },
];

/* icon map */
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
    Heart, AlertTriangle, Map, Route, Hotel, Stethoscope, Utensils, FileCheck,
    Calendar, Video, Film, Headphones, ShoppingCart, FileText, PawPrint,
    MessageCircle, Skull, Home, Dog, Compass,
};

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);
    const { user, logout } = useAuth();
    const pathname = usePathname();
    const currentLocale = useLocale();
    const t = useTranslations("nav");
    const dropdownRef = useRef<HTMLDivElement>(null);

    const isActive = (href: string) => {
        if (href === "/") return pathname === "/";
        if (href.startsWith("/#")) return false;
        return pathname.startsWith(href);
    };

    /* close dropdown on outside click */
    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node))
                setOpenDropdown(null);
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-lg border-b border-white/5">
            <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 group flex-shrink-0">
                        <div className="h-10 w-10 bg-gradient-to-br from-emerald-500/20 to-emerald-900/40 rounded-xl flex items-center justify-center transition-transform group-hover:scale-105 shadow-lg shadow-emerald-500/10 border border-emerald-500/20 backdrop-blur-sm overflow-hidden p-1 relative">
                            <Image src="/brand/logo-trees.svg" alt="Huellas del Norte" fill className="object-contain" priority />
                        </div>
                        <span className="font-serif text-lg font-bold text-white hidden sm:block tracking-tight text-shadow-sm">
                            Huellas del Norte
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center gap-1 mx-4" ref={dropdownRef}>
                        {/* Primary links — always visible */}
                        {primaryLinks.map((link) => {
                            const Icon = iconMap[link.iconKey];
                            const active = isActive(link.href);
                            const isUrgent = link.labelKey === "lost_dogs" || link.labelKey === "adoption";
                            return (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${active
                                            ? "bg-emerald-500/10 text-emerald-400"
                                            : isUrgent
                                                ? "text-amber-400 hover:text-amber-300 hover:bg-amber-500/10"
                                                : "text-muted-foreground hover:text-white hover:bg-white/5"
                                        }`}
                                >
                                    {Icon && <Icon className="h-3.5 w-3.5" />}
                                    {t(link.labelKey)}
                                </Link>
                            );
                        })}

                        {/* Dropdown groups */}
                        {dropdownGroups.map((group) => (
                            <div key={group.labelKey} className="relative">
                                <button
                                    type="button"
                                    onClick={() => setOpenDropdown(openDropdown === group.labelKey ? null : group.labelKey)}
                                    className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${openDropdown === group.labelKey
                                            ? "bg-white/10 text-white"
                                            : "text-muted-foreground hover:text-white hover:bg-white/5"
                                        }`}
                                >
                                    {t(group.labelKey)}
                                    <ChevronDown className={`h-3 w-3 transition-transform ${openDropdown === group.labelKey ? "rotate-180" : ""}`} />
                                </button>

                                {openDropdown === group.labelKey && (
                                    <div className="absolute top-full left-0 mt-2 w-56 py-2 bg-card/95 backdrop-blur-xl border border-border rounded-xl shadow-2xl shadow-black/40 animate-fade-in z-50">
                                        {group.items.map((item) => {
                                            const Icon = iconMap[item.iconKey];
                                            const active = isActive(item.href);
                                            return (
                                                <Link
                                                    key={item.href}
                                                    href={item.href}
                                                    onClick={() => setOpenDropdown(null)}
                                                    className={`flex items-center gap-3 px-4 py-2.5 text-sm transition-colors ${active
                                                            ? "bg-emerald-500/10 text-emerald-400"
                                                            : "text-foreground/70 hover:text-white hover:bg-white/5"
                                                        }`}
                                                >
                                                    {Icon && <Icon className="h-4 w-4" />}
                                                    {t(item.labelKey)}
                                                </Link>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Right Side Actions */}
                    <div className="flex items-center gap-3 flex-shrink-0">
                        {/* Language Selector */}
                        <div className="hidden sm:flex items-center gap-1 bg-white/5 p-1 rounded-lg border border-white/10 mr-2">
                            {locales.map((loc) => (
                                <Link
                                    key={loc}
                                    href={pathname}
                                    locale={loc}
                                    className={`px-2 py-1 rounded text-[10px] font-bold uppercase transition-all ${currentLocale === loc
                                        ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/20"
                                        : "text-muted-foreground hover:text-white hover:bg-white/5"
                                        }`}
                                >
                                    {loc}
                                </Link>
                            ))}
                        </div>

                        {/* Auth Button (Desktop) */}
                        <div className="hidden md:flex items-center">
                            <Link
                                href="/profesionales"
                                className="mr-4 text-xs font-bold text-emerald-400 hover:text-emerald-300 border border-emerald-500/30 px-3 py-1.5 rounded-lg transition-all hover:bg-emerald-500/10 hidden lg:block"
                            >
                                {t("pro")}
                            </Link>
                            {user ? (
                                <div className="flex items-center gap-3 pl-4 border-l border-white/10">
                                    <div className="text-right hidden lg:block">
                                        <div className="text-xs font-bold text-white">{user.name}</div>
                                        <div className="text-[10px] text-muted-foreground">{user.email}</div>
                                    </div>
                                    {user.avatar ? (
                                        <Image
                                            src={user.avatar}
                                            alt={user.name}
                                            width={36}
                                            height={36}
                                            className="rounded-full border-2 border-border ring-2 ring-emerald-500/50"
                                        />
                                    ) : (
                                        <div className="h-9 w-9 rounded-full border-2 border-border ring-2 ring-emerald-500/50 flex items-center justify-center bg-emerald-900/20 text-emerald-500">
                                            <UserIcon className="w-5 h-5" />
                                        </div>
                                    )}
                                    <button
                                        onClick={logout}
                                        className="p-2 text-muted-foreground hover:text-red-400 transition-colors"
                                        title="Cerrar Sesión"
                                    >
                                        <LogOut className="w-5 h-5" />
                                    </button>
                                </div>
                            ) : (
                                <Link
                                    href="/login"
                                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-bold shadow-lg shadow-emerald-900/20 transition-all hover:scale-105"
                                >
                                    <UserIcon className="w-4 h-4" />
                                    <span>{t("enter")}</span>
                                </Link>
                            )}
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            type="button"
                            onClick={() => setIsOpen(!isOpen)}
                            className="lg:hidden p-2 rounded-lg text-muted-foreground hover:text-white hover:bg-white/5 transition-colors"
                            aria-label="Toggle menu"
                        >
                            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Navigation */}
            {isOpen && (
                <div className="lg:hidden bg-background border-b border-white/5 animate-fade-in max-h-[85vh] overflow-y-auto">
                    <div className="px-4 py-3 space-y-1">
                        {/* Mobile Auth Header */}
                        <div className="mb-4 pb-4 border-b border-white/5">
                            {user ? (
                                <div className="flex items-center gap-4 px-2">
                                    {user.avatar ? (
                                        <Image src={user.avatar} alt={user.name} width={48} height={48} className="rounded-full border-2 border-emerald-500/50" />
                                    ) : (
                                        <div className="h-12 w-12 rounded-full border-2 border-emerald-500/50 flex items-center justify-center bg-emerald-900/20 text-emerald-500">
                                            <UserIcon className="w-6 h-6" />
                                        </div>
                                    )}
                                    <div className="flex-1">
                                        <div className="font-bold text-white">{user.name}</div>
                                        <div className="text-xs text-muted-foreground">{user.email}</div>
                                    </div>
                                    <button
                                        onClick={() => { logout(); setIsOpen(false); }}
                                        className="p-2 bg-red-500/10 text-red-400 rounded-lg hover:bg-red-500/20"
                                    >
                                        <LogOut className="w-5 h-5" />
                                    </button>
                                </div>
                            ) : (
                                <Link
                                    href="/login"
                                    onClick={() => setIsOpen(false)}
                                    className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-emerald-600 text-white font-bold"
                                >
                                    <UserIcon className="w-5 h-5" /> {t("login")}
                                </Link>
                            )}
                            <Link
                                href="/profesionales"
                                onClick={() => setIsOpen(false)}
                                className="mt-3 flex items-center justify-center gap-2 w-full py-2 rounded-xl border border-emerald-500/30 text-emerald-400 font-bold text-sm"
                            >
                                {t("pro_mobile")}
                            </Link>
                        </div>

                        {/* Mobile Language Selector */}
                        <div className="sm:hidden flex items-center gap-1 bg-white/5 p-1 rounded-lg border border-white/10 mb-4">
                            {locales.map((loc) => (
                                <Link
                                    key={loc}
                                    href={pathname}
                                    locale={loc}
                                    onClick={() => setIsOpen(false)}
                                    className={`flex-1 text-center px-2 py-1.5 rounded text-[10px] font-bold uppercase transition-all ${currentLocale === loc
                                        ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/20"
                                        : "text-muted-foreground hover:text-white hover:bg-white/5"
                                        }`}
                                >
                                    {loc}
                                </Link>
                            ))}
                        </div>

                        {/* Primary links with emphasis */}
                        <div className="space-y-1 pb-3 border-b border-white/5">
                            {primaryLinks.map((link) => {
                                const Icon = iconMap[link.iconKey];
                                const active = isActive(link.href);
                                const isUrgent = link.labelKey === "lost_dogs" || link.labelKey === "adoption";
                                return (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        onClick={() => setIsOpen(false)}
                                        className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${active
                                                ? "bg-emerald-500/10 text-emerald-400"
                                                : isUrgent
                                                    ? "text-amber-400 hover:bg-amber-500/10"
                                                    : "text-muted-foreground hover:text-white hover:bg-white/5"
                                            }`}
                                    >
                                        {Icon && <Icon className="h-5 w-5" />}
                                        {t(link.labelKey)}
                                    </Link>
                                );
                            })}
                        </div>

                        {/* Grouped sections */}
                        {dropdownGroups.map((group) => (
                            <div key={group.labelKey} className="py-2">
                                <p className="px-4 py-2 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                                    {t(group.labelKey)}
                                </p>
                                {group.items.map((item) => {
                                    const Icon = iconMap[item.iconKey];
                                    const active = isActive(item.href);
                                    return (
                                        <Link
                                            key={item.href}
                                            href={item.href}
                                            onClick={() => setIsOpen(false)}
                                            className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${active
                                                    ? "bg-emerald-500/10 text-emerald-400"
                                                    : "text-muted-foreground hover:text-white hover:bg-white/5"
                                                }`}
                                        >
                                            {Icon && <Icon className="h-4 w-4" />}
                                            {t(item.labelKey)}
                                        </Link>
                                    );
                                })}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </nav>
    );
}

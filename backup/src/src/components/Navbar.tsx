"use client";

import { useState } from "react";
import { Link, usePathname, locales } from "@/navigation";
import { useLocale } from "next-intl";
import { useAuth } from "@/context/AuthContext";
import {
    Dog, Menu, X, Map, FileCheck, Route, Home, MessageCircle,
    AlertTriangle, Skull, Hotel, Utensils, Video, Stethoscope,
    Film, Headphones, LogOut, User as UserIcon, Calendar, ShoppingCart
} from "lucide-react";

const navLinks = [
    { href: "/", label: "Inicio", icon: Home },
    { href: "/pasaporte", label: "Pasaporte", icon: FileCheck },
    { href: "/rutas", label: "Rutas", icon: Route },
    { href: "/guarderias", label: "Alojamientos", icon: Hotel },
    { href: "/hosteleria", label: "Hostelería", icon: Utensils },
    { href: "/veterinarios", label: "Veterinarios", icon: Stethoscope },
    { href: "/creadores", label: "Creadores", icon: Video },
    { href: "/cine", label: "Cine", icon: Film },
    { href: "/audio", label: "Audio", icon: Headphones },
    { href: "/eventos", label: "Agenda", icon: Calendar },
    { href: "/marketplace", label: "Tienda", icon: ShoppingCart },
    { href: "/adopcion", label: "Adopción", icon: Dog },
    { href: "/foro", label: "Foro", icon: MessageCircle },
    { href: "/perros-perdidos", label: "SOS", icon: AlertTriangle },
    { href: "/alertas-peligro", label: "Alertas", icon: Skull },
    { href: "/#mapa-interactivo", label: "Mapa", icon: Map },
];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const { user, logout } = useAuth();
    const pathname = usePathname();
    const currentLocale = useLocale();

    const isActive = (href: string) => {
        if (href === "/") return pathname === "/";
        if (href.startsWith("/#")) return pathname === "/" && typeof window !== "undefined" && window.location.hash === href.slice(1);
        return pathname.startsWith(href);
    };

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950/90 backdrop-blur-lg border-b border-white/5">
            <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 group flex-shrink-0">
                        <div className="h-9 w-9 bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-xl flex items-center justify-center transition-transform group-hover:scale-105 shadow-lg shadow-emerald-500/20">
                            <Dog className="h-5 w-5 text-white" />
                        </div>
                        <span className="font-serif text-lg font-bold text-white hidden sm:block tracking-tight">
                            Huellas del Norte
                        </span>
                    </Link>

                    {/* Desktop Navigation - Scrollable container for many items */}
                    <div className="hidden xl:flex items-center gap-1 mx-4 overflow-x-auto hide-scrollbar">
                        {navLinks.map((link) => {
                            const Icon = link.icon;
                            const active = isActive(link.href);
                            return (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${active
                                        ? "bg-emerald-500/10 text-emerald-400"
                                        : "text-slate-400 hover:text-white hover:bg-white/5"
                                        }`}
                                >
                                    <Icon className="h-3.5 w-3.5" />
                                    {link.label}
                                </Link>
                            );
                        })}
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
                                        : "text-slate-500 hover:text-white hover:bg-white/5"
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
                                Soy Profesional
                            </Link>
                            {user ? (
                                <div className="flex items-center gap-3 pl-4 border-l border-white/10">
                                    <div className="text-right hidden lg:block">
                                        <div className="text-xs font-bold text-white">{user.name}</div>
                                        <div className="text-[10px] text-slate-400">{user.email}</div>
                                    </div>
                                    <img
                                        src={user.avatar}
                                        alt={user.name}
                                        className="h-9 w-9 rounded-full border-2 border-slate-800 ring-2 ring-emerald-500/50"
                                    />
                                    <button
                                        onClick={logout}
                                        className="p-2 text-slate-400 hover:text-red-400 transition-colors"
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
                                    <span>Entrar</span>
                                </Link>
                            )}
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            type="button"
                            onClick={() => setIsOpen(!isOpen)}
                            className="xl:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
                            aria-label="Toggle menu"
                        >
                            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Navigation */}
            {isOpen && (
                <div className="xl:hidden bg-slate-950 border-b border-white/5 animate-fade-in max-h-[80vh] overflow-y-auto">
                    <div className="px-4 py-3 space-y-1">
                        {/* Mobile Auth Header */}
                        <div className="mb-4 pb-4 border-b border-white/5">
                            {user ? (
                                <div className="flex items-center gap-4 px-2">
                                    <img src={user.avatar} alt={user.name} className="h-12 w-12 rounded-full border-2 border-emerald-500/50" />
                                    <div className="flex-1">
                                        <div className="font-bold text-white">{user.name}</div>
                                        <div className="text-xs text-slate-400">{user.email}</div>
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
                                    <UserIcon className="w-5 h-5" /> Iniciar sesión
                                </Link>
                            )}
                            <Link
                                href="/profesionales"
                                onClick={() => setIsOpen(false)}
                                className="mt-3 flex items-center justify-center gap-2 w-full py-2 rounded-xl border border-emerald-500/30 text-emerald-400 font-bold text-sm"
                            >
                                ¿Eres un profesional? Únete aquí
                            </Link>
                        </div>

                        {navLinks.map((link) => {
                            const Icon = link.icon;
                            const active = isActive(link.href);
                            return (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    onClick={() => setIsOpen(false)}
                                    className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${active
                                        ? "bg-emerald-500/10 text-emerald-400"
                                        : "text-slate-400 hover:text-white hover:bg-white/5"
                                        }`}
                                >
                                    <Icon className="h-5 w-5" />
                                    {link.label}
                                </Link>
                            );
                        })}
                    </div>
                </div>
            )}
        </nav>
    );
}

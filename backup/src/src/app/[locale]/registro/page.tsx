"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { User, Mail, Lock, Eye, EyeOff, CheckCircle2, ShieldCheck, Loader2 } from "lucide-react";

export default function RegisterPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Password criteria state
    const criteria = {
        length: password.length >= 8,
        number: /\d/.test(password),
        special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
        uppercase: /[A-Z]/.test(password)
    };

    const strength = Object.values(criteria).filter(Boolean).length;

    const { signUp } = useAuth();
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (strength < 3) return; // Prevent weak passwords

        setIsSubmitting(true);
        try {
            await signUp(name, email, password);
            router.push('/');
        } catch (err) {
            console.error(err);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <main className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-slate-950">
            {/* Left Side - Image (Order 2 on mobile to be at bottom, but hidden anyway) */}
            <div className="hidden lg:flex order-2 relative flex-col justify-between p-12 bg-emerald-900/20 overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1548199973-03cce0bbc87b?q=80&w=2669&auto=format&fit=crop')] bg-cover bg-center opacity-40 mix-blend-overlay" />
                <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900/50 to-emerald-900/50" />

                <div className="relative z-10 text-right">
                    <div className="inline-flex items-center gap-2 text-emerald-400 font-bold text-xl tracking-tight">
                        Huellas del Norte ID
                        <ShieldCheck className="w-6 h-6" />
                    </div>
                </div>

                <div className="relative z-10 max-w-lg ml-auto text-right">
                    <h2 className="text-4xl font-bold text-white mb-6 leading-tight">
                        Únete a la comunidad <br />
                        <span className="text-emerald-400">más activa del norte</span>.
                    </h2>
                    <ul className="text-slate-300 space-y-3 inline-block text-left">
                        <li className="flex items-center gap-2">
                            <CheckCircle2 className="w-5 h-5 text-emerald-500" /> Mapas detallados offline
                        </li>
                        <li className="flex items-center gap-2">
                            <CheckCircle2 className="w-5 h-5 text-emerald-500" /> Alertas veterinarias en tiempo real
                        </li>
                        <li className="flex items-center gap-2">
                            <CheckCircle2 className="w-5 h-5 text-emerald-500" /> Descuentos en hostelería pet-friendly
                        </li>
                    </ul>
                </div>

                <div className="relative z-10 text-right text-xs text-slate-500 font-medium">
                    <span>Protegido por reCAPTCHA y sujeto a la Política de Privacidad de Google.</span>
                </div>
            </div>

            {/* Right Side - Form (Order 1) */}
            <div className="flex flex-col justify-center items-center p-6 sm:p-12 lg:p-24 bg-slate-950 relative order-1">
                <div className="w-full max-w-md space-y-8 animate-fade-in-up">
                    <div>
                        <h1 className="text-3xl font-bold text-white tracking-tight">Crear Cuenta</h1>
                        <p className="mt-2 text-sm text-slate-400">
                            Es gratis y te tomará menos de un minuto.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="space-y-1">
                            <label className="text-sm font-medium text-slate-300">Nombre Completo</label>
                            <div className="relative">
                                <User className="absolute left-3 top-3.5 w-5 h-5 text-slate-500" />
                                <input
                                    type="text"
                                    required
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    autoComplete="name"
                                    className="w-full pl-10 pr-3 py-3 border border-slate-700 rounded-xl bg-slate-900/50 text-white focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 outline-none transition-all"
                                    placeholder="Tu Nombre"
                                />
                            </div>
                        </div>

                        <div className="space-y-1">
                            <label className="text-sm font-medium text-slate-300">Email</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-3.5 w-5 h-5 text-slate-500" />
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    autoComplete="email"
                                    className="w-full pl-10 pr-3 py-3 border border-slate-700 rounded-xl bg-slate-900/50 text-white focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 outline-none transition-all"
                                    placeholder="nombre@ejemplo.com"
                                />
                            </div>
                        </div>

                        <div className="space-y-3">
                            <label className="text-sm font-medium text-slate-300">Contraseña</label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-3.5 w-5 h-5 text-slate-500" />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    autoComplete="new-password"
                                    className="w-full pl-10 pr-10 py-3 border border-slate-700 rounded-xl bg-slate-900/50 text-white focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 outline-none transition-all"
                                    placeholder="Crear contraseña segura"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                                    className="absolute inset-y-0 right-3 flex items-center text-slate-500 hover:text-white"
                                >
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>

                            {/* Password Strength Meter */}
                            {password && (
                                <div className="space-y-2 p-3 bg-slate-900 rounded-lg border border-slate-800">
                                    <div className="flex gap-1 h-1">
                                        {[1, 2, 3, 4].map((level) => (
                                            <div
                                                key={level}
                                                className={`h-full flex-1 rounded-full transition-all duration-500 ${strength >= level
                                                        ? (strength <= 2 ? 'bg-red-500' : strength === 3 ? 'bg-amber-500' : 'bg-emerald-500')
                                                        : 'bg-slate-700'
                                                    }`}
                                            />
                                        ))}
                                    </div>
                                    <div className="grid grid-cols-2 gap-2 text-xs text-slate-500">
                                        <span className={criteria.length ? "text-emerald-400" : ""}>• 8+ caracteres</span>
                                        <span className={criteria.uppercase ? "text-emerald-400" : ""}>• Mayúscula</span>
                                        <span className={criteria.number ? "text-emerald-400" : ""}>• Número</span>
                                        <span className={criteria.special ? "text-emerald-400" : ""}>• Símbolo</span>
                                    </div>
                                </div>
                            )}
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting || strength < 3}
                            className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-xl shadow-lg shadow-emerald-900/20 text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-[0.98]"
                        >
                            {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : "Crear Cuenta"}
                        </button>
                        {strength > 0 && strength < 3 && (
                            <p className="text-xs text-amber-400 text-center">
                                La contraseña debe cumplir al menos 3 de los 4 criterios.
                            </p>
                        )}
                    </form>

                    <p className="text-center text-sm text-slate-400">
                        ¿Ya tienes cuenta?{' '}
                        <Link href="/login" className="font-semibold text-emerald-400 hover:text-emerald-300">
                            Iniciar Sesión
                        </Link>
                    </p>
                </div>
            </div>
        </main>
    );
}

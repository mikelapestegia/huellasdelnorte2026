"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Mail, Lock, Eye, EyeOff, ArrowRight, AlertCircle, Loader2, ShieldCheck } from "lucide-react";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { login } = useAuth();
    const router = useRouter(); // Use navigation router

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setIsSubmitting(true);

        try {
            await login(email, password);
            router.push('/');
        } catch (err: any) {
            setError(err.message || "Credenciales inválidas. Por favor, inténtalo de nuevo.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <main className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-background">

            {/* Left Side - Image & Branding */}
            <div className="hidden lg:flex relative flex-col justify-between p-12 bg-card overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1558929996-da64ba858215?q=80&w=2673&auto=format&fit=crop')] bg-cover bg-center opacity-40 mix-blend-overlay" />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-card/80 to-transparent" />

                <div className="relative z-10">
                    <div className="flex items-center gap-2 text-emerald-400 font-bold text-xl tracking-tight">
                        <ShieldCheck className="w-6 h-6" />
                        Huellas del Norte ID
                    </div>
                </div>

                <div className="relative z-10 max-w-lg">
                    <h2 className="text-4xl font-bold text-white mb-6 leading-tight">
                        Vuelve a conectar con <br />
                        <span className="text-emerald-400">la naturaleza y tu mejor amigo</span>.
                    </h2>
                    <p className="text-muted-foreground text-lg leading-relaxed">
                        Accede a mapas exclusivos, guarda tus rutas favoritas y conecta con miles de dueños responsables en nuestra comunidad verificada.
                    </p>
                </div>

                <div className="relative z-10 flex gap-4 text-xs text-muted-foreground font-medium">
                    <span>© 2026 Huellas del Norte</span>
                    <span>•</span>
                    <a href="#" className="hover:text-muted-foreground">Privacidad</a>
                    <span>•</span>
                    <a href="#" className="hover:text-muted-foreground">Términos</a>
                </div>
            </div>

            {/* Right Side - Login Form */}
            <div className="flex flex-col justify-center items-center p-6 sm:p-12 lg:p-24 bg-background relative">
                {/* Mobile Header (Only visible on small screens) */}
                <div className="lg:hidden absolute top-6 left-6 flex items-center gap-2 text-emerald-400 font-bold">
                    <ShieldCheck className="w-5 h-5" /> Huellas ID
                </div>

                <div className="w-full max-w-md space-y-8 animate-fade-in-up">
                    <div className="text-center lg:text-left">
                        <h1 className="text-3xl font-bold text-white tracking-tight">Iniciar Sesión</h1>
                        <p className="mt-2 text-sm text-muted-foreground">
                            Ingresa tus credenciales para acceder al panel de control.
                        </p>
                    </div>

                    {error && (
                        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 flex items-start gap-3 text-red-400 text-sm animate-shake" aria-live="polite">
                            <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                            <span>{error}</span>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-muted-foreground block">Correo Electrónico</label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Mail className="h-5 w-5 text-muted-foreground group-focus-within:text-emerald-400 transition-colors" />
                                </div>
                                <input
                                    id="email"
                                    type="email"
                                    required
                                    autoComplete="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="block w-full pl-10 pr-3 py-3 border border-border rounded-xl bg-card/50 text-white placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all sm:text-sm"
                                    placeholder="nombre@ejemplo.com"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between items-center">
                                <label className="text-sm font-medium text-muted-foreground block">Contraseña</label>
                                <a href="#" className="text-xs font-medium text-emerald-400 hover:text-emerald-300 transition-colors">
                                    ¿Olvidaste tu contraseña?
                                </a>
                            </div>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-muted-foreground group-focus-within:text-emerald-400 transition-colors" />
                                </div>
                                <input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    required
                                    autoComplete="current-password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="block w-full pl-10 pr-10 py-3 border border-border rounded-xl bg-card/50 text-white placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all sm:text-sm"
                                    placeholder="••••••••"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-muted-foreground hover:text-muted-foreground focus:outline-none"
                                >
                                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-xl shadow-lg shadow-emerald-900/20 text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 focus:ring-offset-background disabled:opacity-50 disabled:cursor-not-allowed transition-all transform active:scale-[0.98]"
                        >
                            {isSubmitting ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin mr-2" />
                                    Verificando...
                                </>
                            ) : (
                                <>
                                    Iniciar Sesión <ArrowRight className="w-4 h-4 ml-2" />
                                </>
                            )}
                        </button>
                    </form>

                    <div className="mt-6">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-border" />
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-background text-muted-foreground">
                                    O continúa con
                                </span>
                            </div>
                        </div>

                        <div className="mt-6 grid grid-cols-2 gap-3">
                            <button
                                type="button"
                                className="w-full inline-flex justify-center py-2.5 px-4 border border-border rounded-xl shadow-sm bg-card text-sm font-medium text-muted-foreground hover:bg-card/80 transition-colors"
                            >
                                <span className="sr-only">Google</span>
                                <svg className="h-5 w-5" viewBox="0 0 24 24">
                                    <path
                                        d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"
                                        fill="currentColor"
                                    />
                                </svg>
                            </button>
                            <button
                                type="button"
                                className="w-full inline-flex justify-center py-2.5 px-4 border border-border rounded-xl shadow-sm bg-card text-sm font-medium text-muted-foreground hover:bg-card/80 transition-colors"
                            >
                                <span className="sr-only">Apple</span>
                                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18c-4.418 0-8-3.582-8-8s3.582-8 8-8 8 3.582 8 8-3.582 8-8 8z" />
                                    {/* Placeholder Apple Icon */}
                                </svg>
                            </button>
                        </div>
                    </div>

                    <p className="mt-8 text-center text-sm text-muted-foreground">
                        ¿Aun no tienes cuenta?{' '}
                        <Link href="/registro" className="font-semibold text-emerald-400 hover:text-emerald-300 transition-colors">
                            Crear cuenta segura
                        </Link>
                    </p>
                </div>
            </div>
        </main>
    );
}

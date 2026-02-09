"use client";

import { useState, useEffect } from "react";
import { Download, X, Share2, PlusSquare } from "lucide-react";

export default function InstallPrompt() {
    const [isIOS, setIsIOS] = useState(false);
    const [isStandalone, setIsStandalone] = useState(false);
    const [showPrompt, setShowPrompt] = useState(false);
    const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

    useEffect(() => {
        setIsIOS(
            /iPad|iPhone|iPod/.test(navigator.userAgent) &&
            !(window as any).MSStream
        );

        setIsStandalone(window.matchMedia('(display-mode: standalone)').matches);
    }, []);

    useEffect(() => {
        const handler = (e: any) => {
            e.preventDefault();
            setDeferredPrompt(e);
            setShowPrompt(true);
        };

        window.addEventListener('beforeinstallprompt', handler);

        // Show iOS prompt after delay if not installed
        if (isIOS && !isStandalone) {
            const timer = setTimeout(() => setShowPrompt(true), 3000);
            return () => clearTimeout(timer);
        }

        return () => window.removeEventListener('beforeinstallprompt', handler);
    }, [isIOS, isStandalone]);

    const handleInstallClick = async () => {
        if (!deferredPrompt) return;

        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;

        if (outcome === 'accepted') {
            setShowPrompt(false);
        }
        setDeferredPrompt(null);
    };

    if (!showPrompt || isStandalone) return null;

    return (
        <div className="fixed bottom-20 left-4 right-4 z-50 animate-in slide-in-from-bottom-5 duration-500">
            <div className="bg-card/90 backdrop-blur-xl border border-emerald-500/30 rounded-2xl p-4 shadow-2xl relative">
                <button
                    onClick={() => setShowPrompt(false)}
                    className="absolute top-2 right-2 text-muted-foreground hover:text-white"
                >
                    <X className="w-5 h-5" />
                </button>

                <div className="flex items-start gap-4 pr-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-xl flex items-center justify-center shrink-0 shadow-lg">
                        <span className="text-2xl">🐾</span>
                    </div>
                    <div>
                        <h3 className="font-bold text-white text-lg">Instalar Huellas App</h3>
                        <p className="text-sm text-muted-foreground mt-1">
                            Añade la app a tu inicio para acceder a mapas offline y notificaciones.
                        </p>

                        {isIOS ? (
                            <div className="mt-3 flex flex-col gap-2 text-sm text-emerald-400 bg-white/5 p-3 rounded-lg border border-white/5">
                                <div className="flex items-center gap-2">
                                    <span className="bg-card/80 p-1 rounded"><Share2 className="w-4 h-4" /></span>
                                    <span>Pulsa "Compartir"</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="bg-card/80 p-1 rounded"><PlusSquare className="w-4 h-4" /></span>
                                    <span>Selecciona "Añadir a inicio"</span>
                                </div>
                            </div>
                        ) : (
                            <button
                                onClick={handleInstallClick}
                                className="mt-3 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-bold rounded-xl transition-colors flex items-center gap-2 shadow-lg shadow-emerald-900/50"
                            >
                                <Download className="w-4 h-4" />
                                Instalar Ahora
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

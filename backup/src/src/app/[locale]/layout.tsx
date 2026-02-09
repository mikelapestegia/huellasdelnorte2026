import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import Navbar from "@/components/Navbar";
import { AuthProvider } from "@/context/AuthContext";
import InstallPrompt from "@/components/pwa/InstallPrompt";
import "../../globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });

export const metadata: Metadata = {
    title: "Huellas del Norte - Comunidad Canina",
    description: "La guía definitiva para disfrutar del norte de España con tu perro.",
    manifest: "/manifest.json",
    appleWebApp: {
        capable: true,
        statusBarStyle: "black-translucent",
        title: "Huellas del Norte - Comunidad Canina",
    },
    applicationName: "Huellas del Norte",
    keywords: ["perros", "rutas caninas", "pet friendly", "España", "Francia", "Arco Atlántico"],
};

export const viewport = {
    themeColor: "#0f172a",
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
};

export default async function LocaleLayout({
    children,
    params
}: {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    const messages = await getMessages();

    return (
        <html lang={locale} className={`${inter.variable} ${playfair.variable} scroll-smooth`}>
            <body className="bg-background text-foreground min-h-screen antialiased selection:bg-emerald-500/30 selection:text-emerald-200">
                <NextIntlClientProvider messages={messages}>
                    <AuthProvider>
                        <Navbar />
                        <div className="pt-16">
                            {children}
                        </div>
                        <InstallPrompt />
                    </AuthProvider>
                </NextIntlClientProvider>
            </body>
        </html>
    );
}

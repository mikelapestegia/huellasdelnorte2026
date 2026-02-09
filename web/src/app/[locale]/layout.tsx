import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { headers } from "next/headers";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import Navbar from "@/components/Navbar";
import { AuthProvider } from "@/context/AuthContext";
import InstallPrompt from "@/components/pwa/InstallPrompt";
import { DEFAULT_DESCRIPTION, SITE_NAME, SITE_URL, buildAlternates, getSeoForPath, NOINDEX_PATHS } from "@/lib/seo";
import "../globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: string }>;
}): Promise<Metadata> {
    const { locale } = await params;
    const headerList = await headers();
    const pathname = headerList.get("x-pathname") || `/${locale}`;
    const pathWithoutLocale = pathname.startsWith(`/${locale}`)
        ? pathname.replace(`/${locale}`, "") || "/"
        : pathname;

    const seo = getSeoForPath(pathWithoutLocale);
    const alternates = buildAlternates(pathWithoutLocale === "/" ? "/" : pathWithoutLocale, locale);
    const noindex = NOINDEX_PATHS.has(pathWithoutLocale);
    const title =
        seo.title === SITE_NAME ? SITE_NAME : `${seo.title} | ${SITE_NAME}`;
    const ogImage = seo.ogImage || `${SITE_URL}/og-default.svg`;

    return {
        metadataBase: new URL(SITE_URL),
        title,
        description: seo.description || DEFAULT_DESCRIPTION,
        alternates,
        openGraph: {
            title,
            description: seo.description || DEFAULT_DESCRIPTION,
            url: alternates.canonical,
            siteName: SITE_NAME,
            locale,
            type: seo.ogType || "website",
            images: [ogImage],
            ...(seo.ogType === "article" && seo.publishedTime
                ? { publishedTime: seo.publishedTime }
                : {}),
        },
        twitter: {
            card: "summary_large_image",
            title,
            description: seo.description || DEFAULT_DESCRIPTION,
            images: [ogImage],
        },
        robots: {
            index: !noindex,
            follow: !noindex,
            googleBot: {
                index: !noindex,
                follow: !noindex,
            },
        },
        manifest: "/manifest.json",
        appleWebApp: {
            capable: true,
            statusBarStyle: "black-translucent",
            title: SITE_NAME,
        },
        applicationName: SITE_NAME,
        keywords: [
            "perros",
            "rutas caninas",
            "pet friendly",
            "norte peninsular",
            "Francia",
            "Arco Atlántico",
        ],
    };
}

export const viewport = {
    themeColor: "#0f172a",
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

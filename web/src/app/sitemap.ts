import type { MetadataRoute } from "next";
import { locales } from "@/navigation";
import { SITE_URL } from "@/lib/seo";
import { blogPosts } from "@/data/blog";
import { routesCatalog } from "@/data/routesCatalog";
import { adoptionDogs } from "@/data/adoptionDogs";

const staticPaths = [
    "/",
    "/como-funciona",
    "/verificacion",
    "/quienes-somos",
    "/faq",
    "/contacto",
    "/colaboradores",
    "/accesibilidad",
    "/transparencia",
    "/rutas",
    "/adopcion",
    "/adopcion/mapa",
    "/guarderias",
    "/guarderias/mapa",
    "/veterinarios",
    "/hosteleria",
    "/eventos",
    "/creadores",
    "/cine",
    "/audio",
    "/marketplace",
    "/profesionales",
    "/comunidad",
    "/foro",
    "/perros-perdidos",
    "/alertas-peligro",
    "/apadrinar",
    "/blog",
];

function withLocale(locale: string, path: string) {
    if (path === "/") return `/${locale}`;
    return `/${locale}${path}`;
}

export default function sitemap(): MetadataRoute.Sitemap {
    const now = new Date();

    const entries: MetadataRoute.Sitemap = [];

    for (const locale of locales) {
        for (const path of staticPaths) {
            entries.push({
                url: new URL(withLocale(locale, path), SITE_URL).toString(),
                lastModified: now,
                changeFrequency: "weekly",
                priority: path === "/" ? 1 : 0.7,
            });
        }

        for (const post of blogPosts) {
            entries.push({
                url: new URL(withLocale(locale, `/blog/${post.slug}`), SITE_URL).toString(),
                lastModified: new Date(post.date),
                changeFrequency: "monthly",
                priority: 0.6,
            });
        }

        for (const route of routesCatalog) {
            entries.push({
                url: new URL(withLocale(locale, `/rutas/${route.id}`), SITE_URL).toString(),
                lastModified: now,
                changeFrequency: "monthly",
                priority: 0.6,
            });
        }

        for (const dog of adoptionDogs) {
            entries.push({
                url: new URL(withLocale(locale, `/adopcion/${dog.id}`), SITE_URL).toString(),
                lastModified: new Date(dog.publishedDate),
                changeFrequency: "weekly",
                priority: 0.5,
            });
        }
    }

    return entries;
}

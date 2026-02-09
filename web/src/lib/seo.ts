import { locales } from "@/navigation";
import { getPostBySlug } from "@/data/blog";
import { routesCatalog } from "@/data/routesCatalog";
import { adoptionDogs } from "@/data/adoptionDogs";

const DEFAULT_SITE_URL = "https://huellasdelnorte.com";

export const SITE_URL = (() => {
    const raw =
        process.env.NEXT_PUBLIC_SITE_URL ||
        process.env.VERCEL_URL ||
        DEFAULT_SITE_URL;
    if (raw.startsWith("http://") || raw.startsWith("https://")) return raw;
    return `https://${raw}`;
})();

export const SITE_NAME = "Huellas del Norte";
export const DEFAULT_DESCRIPTION =
    "Mapa y guía pet friendly del norte peninsular: rutas, adopción, guarderías, veterinarios y servicios.";

export const NOINDEX_PATHS = new Set<string>([
    "/login",
    "/registro",
    "/pasaporte",
]);

const ROUTE_META: Record<string, { title: string; description: string }> = {
    "/": {
        title: SITE_NAME,
        description: DEFAULT_DESCRIPTION,
    },
    "/como-funciona": {
        title: "Cómo funciona",
        description: "Aprende a usar el mapa, filtrar servicios y aportar información útil.",
    },
    "/verificacion": {
        title: "Verificación de datos",
        description: "Cómo validamos información con fuentes públicas, profesionales y comunidad.",
    },
    "/quienes-somos": {
        title: "Quiénes somos",
        description: "Misión, visión y valores de la comunidad Huellas del Norte.",
    },
    "/faq": {
        title: "Preguntas frecuentes",
        description: "Respuestas rápidas sobre uso, datos y funcionamiento de la plataforma.",
    },
    "/contacto": {
        title: "Contacto",
        description: "Soporte, colaboraciones y correcciones de datos.",
    },
    "/colaboradores": {
        title: "Colaboradores",
        description: "Protectoras, profesionales y entidades locales que construyen la red.",
    },
    "/accesibilidad": {
        title: "Accesibilidad",
        description: "Compromisos y mejoras continuas para una experiencia inclusiva.",
    },
    "/transparencia": {
        title: "Transparencia",
        description: "Criterios, fuentes y proceso de actualización de datos.",
    },
    "/rutas": {
        title: "Rutas pet friendly",
        description: "Rutas con agua, sombra y nivel de dificultad para salir con tu perro.",
    },
    "/adopcion": {
        title: "Adopción",
        description: "Perros en adopción con fichas completas y contacto con protectoras.",
    },
    "/adopcion/mapa": {
        title: "Mapa de adopción",
        description: "Explora perros en adopción con filtros por zona y características.",
    },
    "/guarderias": {
        title: "Alojamientos caninos",
        description: "Guarderías, hoteles caninos y alojamientos con filtros por zona.",
    },
    "/guarderias/mapa": {
        title: "Mapa de alojamientos",
        description: "Mapa interactivo de guarderías y hoteles caninos.",
    },
    "/veterinarios": {
        title: "Veterinarios",
        description: "Clínicas y hospitales veterinarios con urgencias 24h y especialidades.",
    },
    "/hosteleria": {
        title: "Hostelería pet friendly",
        description: "Restaurantes, cafeterías y bares donde los perros son bienvenidos.",
    },
    "/eventos": {
        title: "Eventos",
        description: "Agenda de quedadas, jornadas de adopción y eventos con perro.",
    },
    "/creadores": {
        title: "Creadores",
        description: "Creadores de contenido canino: educación, viajes y bienestar.",
    },
    "/cine": {
        title: "Cine",
        description: "Selección de películas y documentales para amantes de perros.",
    },
    "/audio": {
        title: "Audio",
        description: "Podcasts y radio canina para aprender y disfrutar.",
    },
    "/marketplace": {
        title: "Marketplace",
        description: "Selección de productos y tecnología para bienestar y seguridad canina.",
    },
    "/profesionales": {
        title: "Profesionales",
        description: "Visibilidad para veterinarios, guarderías, alojamientos y adiestradores.",
    },
    "/comunidad": {
        title: "Comunidad",
        description: "Recursos, grupos y apoyo comunitario para familias con perros.",
    },
    "/foro": {
        title: "Foro",
        description: "Conversaciones, dudas y experiencias entre personas con perro.",
    },
    "/perros-perdidos": {
        title: "Perros perdidos",
        description: "Reporta y consulta perros perdidos con alertas geolocalizadas.",
    },
    "/alertas-peligro": {
        title: "Alertas de peligro",
        description: "Reporta cebos y peligros con ubicación para proteger a la comunidad.",
    },
    "/apadrinar": {
        title: "Apadrinar",
        description: "Apoya a perros que necesitan ayuda con planes de apadrinamiento.",
    },
    "/blog": {
        title: "Blog",
        description: "Guías, consejos y noticias para familias con perros.",
    },
    "/login": {
        title: "Iniciar sesión",
        description: "Accede a tu cuenta para gestionar tus datos.",
    },
    "/registro": {
        title: "Crear cuenta",
        description: "Regístrate para usar funciones avanzadas y personalizadas.",
    },
    "/pasaporte": {
        title: "Pasaporte digital",
        description: "Vacunas, seguros y documentación clave del perro en un pasaporte digital.",
    },
};

export function getSeoForPath(pathname: string): {
    title: string;
    description: string;
    ogImage?: string;
    ogType?: "website" | "article";
    publishedTime?: string;
} {
    if (pathname.startsWith("/blog/")) {
        const slug = pathname.replace("/blog/", "");
        const post = getPostBySlug(slug);
        if (post) {
            return {
                title: post.title,
                description: post.excerpt,
                ogImage: post.coverImage,
                ogType: "article",
                publishedTime: post.date,
            };
        }
    }

    if (pathname.startsWith("/rutas/")) {
        const id = pathname.replace("/rutas/", "");
        const route = routesCatalog.find((item) => item.id === id);
        if (route) {
            return {
                title: `${route.name} · Rutas`,
                description: route.highlight,
                ogType: "website",
            };
        }
    }

    if (pathname.startsWith("/adopcion/")) {
        const id = pathname.replace("/adopcion/", "");
        const dog = adoptionDogs.find((item) => item.id === id);
        if (dog) {
            return {
                title: `${dog.name} · Adopción`,
                description: dog.description,
                ogImage: dog.photos?.[0],
                ogType: "article",
            };
        }
    }

    return ROUTE_META[pathname] || ROUTE_META["/"];
}

export function buildAlternates(pathname: string, locale: string) {
    const path = pathname === "/" ? "" : pathname;
    const canonicalPath = `/${locale}${path}`;
    const languages = Object.fromEntries(
        locales.map((loc) => [
            loc,
            new URL(`/${loc}${path}`, SITE_URL).toString(),
        ]),
    );

    return {
        canonical: new URL(canonicalPath, SITE_URL).toString(),
        languages,
    };
}

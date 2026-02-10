export interface Creator {
    id: string;
    name: string;
    platform: 'YouTube' | 'Instagram' | 'TikTok' | 'Podcast';
    category: 'Educación' | 'Viajes' | 'Humor' | 'Salud' | 'Lifestyle';
    subscribers: string;
    description: string;
    link: string;
    avatar: string;
    featured?: boolean;
}

export const creators: Creator[] = [
    {
        id: "c1",
        name: "Pipper on Tour",
        platform: "Instagram",
        category: "Viajes",
        subscribers: "100k+",
        description: "El primer perro turista que da la vuelta a la península. Imprescindible para descubrir destinos pet-friendly en el Norte.",
        link: "https://pipperontour.com",
        avatar: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?q=80&w=200&auto=format&fit=crop",
        featured: true
    },
    {
        id: "c2",
        name: "ExpertoAnimal",
        platform: "YouTube",
        category: "Educación",
        subscribers: "2.5M",
        description: "El canal de referencia en español sobre comportamiento, salud y curiosidades del mundo animal.",
        link: "https://www.youtube.com/@ExpertoAnimal",
        avatar: "https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?q=80&w=200&auto=format&fit=crop",
        featured: true
    },
    {
        id: "c3",
        name: "Adiestramiento EnricEnPositivo",
        platform: "YouTube",
        category: "Educación",
        subscribers: "500k",
        description: "Consejos prácticos de adiestramiento en positivo para el día a día.",
        link: "https://www.youtube.com/@EnricEnPositivo",
        avatar: "https://images.unsplash.com/photo-1529429617124-95b109e86bb8?q=80&w=200&auto=format&fit=crop"
    },
    {
        id: "c4",
        name: "Martina (La Perra de mi Vida)",
        platform: "Podcast",
        category: "Lifestyle",
        subscribers: "15k",
        description: "Historias emotivas y entrevistas sobre el vínculo entre humanos y perros.",
        link: "https://open.spotify.com/",
        avatar: "https://images.unsplash.com/photo-1517423568366-697508d966ee?w=100&auto=format&fit=crop&q=60"
    },
    {
        id: "c5",
        name: "Lobitos del Norte",
        platform: "Instagram",
        category: "Viajes",
        subscribers: "30k",
        description: "Rutas de montaña y aventura con perros en la zona de Picos de Europa.",
        link: "https://instagram.com",
        avatar: "https://images.unsplash.com/photo-1544568100-847a948585b9?w=100&auto=format&fit=crop&q=60"
    },
    {
        id: "c6",
        name: "Soy Tu Veterinario",
        platform: "TikTok",
        category: "Salud",
        subscribers: "800k",
        description: "Tips rápidos de salud veterinaria para prevenir sustos.",
        link: "https://tiktok.com",
        avatar: "https://images.unsplash.com/photo-1599416503381-40db74712e17?w=100&auto=format&fit=crop&q=60"
    }
];

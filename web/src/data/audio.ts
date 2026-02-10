export interface AudioContent {
    id: string;
    title: string;
    author: string;
    type: 'Audiolibro' | 'Podcast' | 'Radio Antigua';
    source: 'LibriVox' | 'Spotify' | 'Internet Archive' | 'Ivoox';
    licenseType: 'public_domain' | 'cc_by' | 'embed';
    audioUrl: string; // URL directa mp3 o embed iframe src
    coverImage: string;
    description: string;
    duration?: string;
    originalLink: string; // Para la atribución
    narrator?: string; // Para LibriVox
}

export const audioCollection: AudioContent[] = [
    {
        id: "aud-001",
        title: "Colmillo Blanco (White Fang)",
        author: "Jack London",
        type: "Audiolibro",
        source: "LibriVox",
        licenseType: "public_domain",
        audioUrl: "https://archive.org/download/colmillo_blanco_1303_librivox/colmilloblanco_01_london_128kb.mp3",
        coverImage: "https://images.unsplash.com/photo-1605568427561-40dd23c2acea?q=80&w=2670&auto=format&fit=crop",
        description: "La historia de un lobo-perro salvaje y su viaje hacia la domesticación en el territorio del Yukón.",
        duration: "25 min (Cap. 1)",
        originalLink: "https://librivox.org/colmillo-blanco-by-jack-london/",
        narrator: "Tux"
    },
    {
        id: "aud-002",
        title: "Memorias de un Perro",
        author: "Juan Rafael Allende",
        type: "Audiolibro",
        source: "LibriVox",
        licenseType: "public_domain",
        audioUrl: "https://archive.org/download/memorias_perro_2004_librivox/memoriasdeunperro_01_allende_128kb.mp3",
        coverImage: "https://images.unsplash.com/photo-1517849845537-4d257902454a?q=80&w=2670&auto=format&fit=crop",
        description: "Una sátira clásica narrada desde la perspectiva canina, llena de humor y crítica social.",
        duration: "15 min (Cap. 1)",
        originalLink: "https://librivox.org/memorias-de-un-perro-by-juan-rafael-allende/",
        narrator: "Victor Villarraza"
    },
    {
        id: "aud-003",
        title: "Entiende a tu Perro",
        author: "Carlos Carrasco",
        type: "Podcast",
        source: "Spotify",
        licenseType: "embed",
        audioUrl: "https://open.spotify.com/embed/show/4rOoJ6Egrf8K2I0KKsv8oL",
        coverImage: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?q=80&w=2669&auto=format&fit=crop",
        description: "Podcast sobre educación canina en positivo y comportamiento animal.",
        originalLink: "https://open.spotify.com/show/4rOoJ6Egrf8K2I0KKsv8oL"
    },
    {
        id: "aud-004",
        title: "Historias de Radio: Rin Tin Tin",
        author: "Radio Old Time Time",
        type: "Radio Antigua",
        source: "Internet Archive",
        licenseType: "public_domain",
        audioUrl: "https://archive.org/download/OTRR_Rin_Tin_Tin_Singles/Rin_Tin_Tin_Singles_-_The_White_Buffalo.mp3",
        coverImage: "https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?q=80&w=2667&auto=format&fit=crop",
        description: "Episodio clásico de radio 'The White Buffalo'. Una joya histórica en inglés.",
        originalLink: "https://archive.org/details/OTRR_Rin_Tin_Tin_Singles",
        duration: "28 min"
    }
];

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
        audioUrl: "https://www.archive.org/download/colmillo_blanco_1303_librivox/colmilloblanco_01_london_128kb.mp3",
        coverImage: "https://archive.org/download/colmillo_blanco_1303_librivox/colmillo_blanco_1303.jpg",
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
        audioUrl: "https://www.archive.org/download/memorias_perro_2004_librivox/memoriasdeunperro_01_allende_128kb.mp3",
        coverImage: "https://ia801406.us.archive.org/16/items/memorias_perro_2004_librivox/Memorias_de_un_perro_2004.jpg",
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
        audioUrl: "https://open.spotify.com/embed/show/4rOoJ6Egrf8K2I0KKsv8oL?utm_source=generator",
        coverImage: "https://i.scdn.co/image/ab6765630000ba8a7b9735623086932463032537",
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
        coverImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Rin_tin_tin_1921.JPG/440px-Rin_tin_tin_1921.JPG",
        description: "Episodio clásico de radio 'The White Buffalo'. Una joya histórica en inglés.",
        originalLink: "https://archive.org/details/OTRR_Rin_Tin_Tin_Singles",
        duration: "28 min"
    }
];

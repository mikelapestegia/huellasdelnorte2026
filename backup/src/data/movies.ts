export interface Movie {
    id: string;
    title: string;
    year: number;
    description: string;
    poster: string;
    type: 'Pelicula' | 'Corto Animado' | 'Serie' | 'Libro';
    status: 'Dominio Público' | 'Próximamente (2026)' | 'Protegido';
    archiveUrl?: string; // Enlace para verla
    notes?: string;
}

export const movies: Movie[] = [
    {
        id: "mov-001",
        title: "The Call of the Wild",
        year: 1935,
        description: "Adaptación clásica de la novela de Jack London protagonizada por Clark Gable. La historia de Buck, un perro doméstico robado y llevado a Alaska.",
        poster: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Call_of_the_wild_poster.jpg/440px-Call_of_the_wild_poster.jpg",
        type: "Pelicula",
        status: "Dominio Público",
        archiveUrl: "https://archive.org/details/call_of_the_wild_1935",
        notes: "Una joya del cine de aventuras en dominio público."
    },
    {
        id: "mov-002",
        title: "The Chain Gang (Pluto's Debut)",
        year: 1930,
        description: "Primera aparición de Pluto (aunque sin nombre aún). Un hito en la animación que entrará en el dominio público muy pronto.",
        poster: "https://upload.wikimedia.org/wikipedia/en/thumb/3/3a/The_Chain_Gang_poster.jpg/220px-The_Chain_Gang_poster.jpg",
        type: "Corto Animado",
        status: "Próximamente (2026)",
        notes: "Entrará en dominio público en EE.UU. en 2026 tras 95 años de protección."
    },
    {
        id: "mov-003",
        title: "Gulliver's Travels",
        year: 1939,
        description: "Película animada clásica de los estudios Fleischer. Aunque no es centrada en perros, cuenta con personajes animales entrañables.",
        poster: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Gulliver%27s_Travels_%281939%29_poster.jpg/440px-Gulliver%27s_Travels_%281939%29_poster.jpg",
        type: "Pelicula",
        status: "Dominio Público",
        archiveUrl: "https://archive.org/details/gullivers_travels1939",
    },
    {
        id: "mov-004",
        title: "Pudgy Picks a Fight!",
        year: 1937,
        description: "Corto de Betty Boop protagonizado por su perrito Pudgy. Un ejemplo del encanto de la animación de los años 30.",
        poster: "https://archive.org/download/Betty_Boop_Pudgy_Picks_A_Fight_1937/Betty_Boop_Pudgy_Picks_A_Fight_1937.thumbs/Betty_Boop_Pudgy_Picks_A_Fight_1937_000030.jpg",
        type: "Corto Animado",
        status: "Dominio Público",
        archiveUrl: "https://archive.org/details/Betty_Boop_Pudgy_Picks_A_Fight_1937",
    },
    {
        id: "mov-005",
        title: "The Maltese Falcon",
        year: 1930,
        description: "La versión original pre-Huston. Una curiosidad cinematográfica que pronto será de todos.",
        poster: "https://upload.wikimedia.org/wikipedia/commons/6/6b/Maltese_falcon_1931_poster.jpg",
        type: "Pelicula",
        status: "Próximamente (2026)",
        notes: "Aunque no va de perros, es una obra maestra del dominio público inminente."
    },
    {
        id: "mov-006",
        title: "Lassie: Painted Hills",
        year: 1951,
        description: "Una de las películas de Lassie que entró en dominio público por no renovar el copyright a tiempo (caso complejo).",
        poster: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Paul_Kelly_in_The_Painted_Hills_%281951%29.jpg/440px-Paul_Kelly_in_The_Painted_Hills_%281951%29.jpg",
        type: "Pelicula",
        status: "Dominio Público",
        archiveUrl: "https://archive.org/details/the_painted_hills",
        notes: "Verifica siempre la jurisdicción local."
    }
];

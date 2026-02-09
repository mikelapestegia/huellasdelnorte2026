export interface ForumUser {
    id: string;
    name: string;
    avatar: string;
    role: 'admin' | 'moderator' | 'user' | 'veterinarian';
}

export interface ForumCategory {
    id: string;
    name: string;
    description: string;
    icon: string; // Lucide icon name matching
    color: string;
    postCount: number;
}

export interface ForumPost {
    id: string;
    categoryId: string;
    title: string;
    excerpt: string;
    author: ForumUser;
    date: string;
    likes: number;
    replies: number;
    views: number;
    isPinned?: boolean;
    tags: string[];
}

export const forumCategories: ForumCategory[] = [
    {
        id: 'general',
        name: 'General y Charla',
        description: 'Espacio para presentarse y hablar de temas variados sobre nuestros peludos.',
        icon: 'MessageCircle',
        color: 'text-blue-400',
        postCount: 1240
    },
    {
        id: 'salud',
        name: 'Salud y Nutrición',
        description: 'Consultas sobre alimentación, cuidados veterinarios y bienestar físico.',
        icon: 'Stethoscope',
        color: 'text-emerald-400',
        postCount: 856
    },
    {
        id: 'rutas',
        name: 'Rutas y Viajes',
        description: 'Comparte tus excursiones favoritas, playas caninas y consejos de viaje.',
        icon: 'Map',
        color: 'text-amber-400',
        postCount: 432
    },
    {
        id: 'adopcion',
        name: 'Historias de Adopción',
        description: 'Experiencias de acogida, consejos para primeros días y finales felices.',
        icon: 'Heart',
        color: 'text-rose-400',
        postCount: 215
    }
];

export const recentPosts: ForumPost[] = [
    {
        id: 'post-1',
        categoryId: 'salud',
        title: '¿Mejor pienso sin cereales para Pastor Alemán?',
        excerpt: 'Estoy buscando recomendaciones para cambiar la dieta de Thor, tiene 5 años y...',
        author: {
            id: 'u1',
            name: 'Mikel A.',
            avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&auto=format&fit=crop&q=60',
            role: 'user'
        },
        date: 'hace 2 horas',
        likes: 12,
        replies: 5,
        views: 145,
        tags: ['Nutrición', 'Pienso', 'Pastor Alemán']
    },
    {
        id: 'post-2',
        categoryId: 'rutas',
        title: 'Quedada en la playa de Orio este fin de semana',
        excerpt: 'Organizamos una caminata matutina con los perros este sábado. ¿Quién se apunta?',
        author: {
            id: 'u2',
            name: 'Laura G.',
            avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=60',
            role: 'moderator'
        },
        date: 'hace 5 horas',
        likes: 34,
        replies: 18,
        views: 420,
        isPinned: true,
        tags: ['Quedada', 'Gipuzkoa', 'Playa']
    },
    {
        id: 'post-3',
        categoryId: 'adopcion',
        title: 'Mi experiencia adoptando un perro senior',
        excerpt: 'Muchos tienen miedo de adoptar perros mayores, pero os cuento por qué fue la mejor decisión...',
        author: {
            id: 'u3',
            name: 'Carlos V.',
            avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=60',
            role: 'veterinarian'
        },
        date: 'ayer',
        likes: 156,
        replies: 42,
        views: 1205,
        tags: ['Senior', 'Adopción', 'Testimonio']
    },
    {
        id: 'post-4',
        categoryId: 'general',
        title: 'Presentación: Nala y yo desde Asturias',
        excerpt: 'Hola a todos! Acabamos de mudarnos a Gijón y buscamos amigos perrunos.',
        author: {
            id: 'u4',
            name: 'Ana M.',
            avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&auto=format&fit=crop&q=60',
            role: 'user'
        },
        date: 'ayer',
        likes: 8,
        replies: 3,
        views: 67,
        tags: ['Presentación', 'Asturias']
    }
];

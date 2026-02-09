export interface BlogPost {
    id: string;
    slug: string;
    title: string;
    excerpt: string;
    content: string; // Markdown supported
    coverImage: string;
    author: {
        name: string;
        role: string;
        avatar: string;
    };
    date: string;
    tags: string[];
    category: "Rutas" | "Consejos" | "Salud" | "Noticias" | "Entrevistas";
    featured?: boolean;
}

export const blogPosts: BlogPost[] = [
    {
        id: "post-001",
        slug: "preparar-mochila-perro-ruta",
        title: "Qué llevar en la mochila de tu perro para una ruta de montaña",
        excerpt: "No te olvides de nada. Guía completa sobre el equipamiento esencial para hacer senderismo con tu perro de forma segura en el norte peninsular.",
        content: `
## La importancia de ir bien equipado

Hacer senderismo con tu perro es una de las experiencias más gratificantes que existen, pero el norte peninsular puede ser impredecible. La lluvia, el barro y los cambios de temperatura exigen una buena preparación.

### 1. Agua y alimentación
*   **Agua**: Calcula el doble de lo que crees que necesitará. Mínimo 1 litro por cada 10kg de peso para rutas medias.
*   **Bebedero portátil**: Plegable y ligero.
*   **Snacks energéticos**: Justo como tú necesitas barritas, ellos necesitan un aporte extra.

### 2. Botiquín de primeros auxilios
Indispensable. Debe incluir:
*   Vendas cohesivas (no se pegan al pelo).
*   Desinfectante (Clorhexidina).
*   Pinzas para garrapatas (¡básicas en primavera y verano!).
*   Suero fisiológico.

### 3. Documentación
Lleva siempre la cartilla sanitaria al día y asegúrate de que el microchip está registrado correctamente. En muchas zonas de parques naturales te pueden pedir la documentación.

### 4. Equipamiento técnico
*   **Arnés cómodo**: Evita collares que puedan ahorcar si tira en una subida.
*   **Correa larga (3-5m)**: Si la normativa lo permite, dales libertad pero mantén el control.
*   **Chubasquero**: Si vas a Euskadi o Galicia, ya sabes... ¡la lluvia es parte del paisaje!

> "No existe mal tiempo, solo mal equipamiento." - Dicho popular montañero.

Disfruta de la ruta y recuerda: **deja solo tus huellas (y recoge las de tu perro)**.
        `,
        coverImage: "https://images.unsplash.com/photo-1544568100-847a948585b9?q=80&w=2574&auto=format&fit=crop",
        author: {
            name: "Mikel Arrieta",
            role: "Guía de Montaña",
            avatar: "https://ui-avatars.com/api/?name=Mikel+Arrieta&background=4a7a67&color=fff"
        },
        date: "2026-02-08",
        tags: ["Equipamiento", "Senderismo", "Seguridad"],
        category: "Consejos",
        featured: true
    },
    {
        id: "post-002",
        slug: "mejores-playas-caninas-cantabria-2026",
        title: "Las 5 Mejores Playas Caninas de Cantabria este 2026",
        excerpt: "Actualizamos nuestro ranking con las normativas vigentes. Descubre dónde disfrutar del mar con tu peludo sin multas.",
        content: `
## Cantabria: Paraíso Costero Canino

Cantabria sigue siendo una de las comunidades más *dog-friendly* del territorio. Este año se han habilitado nuevos espacios y mejorado los existentes.

### 1. Playa de La Maza (San Vicente de la Barquera)
Un clásico que nunca falla. Aguas tranquilas en la ría, ideal para perros que se inician en el nado.
*   **Suelo**: Arena fina y algo de fango en marea baja.
*   **Servicios**: Fuente y papeleras cerca.

### 2. Playa El Puntal (Somo) - Zona Sur
Ojo, solo la zona habilitada en la cara sur. Es espectacular por sus vistas a Santander.
*   **Acceso**: En lancha desde Santander (admiten perros con bozal) o caminando desde Somo.

### 3. Playa de Oriñón (Castro Urdiales) - Zona Oeste
Una cala preciosa protegida por montañas.
*   **Normativa**: Horario restringido en temporada alta (consultar carteles).

**Consejo Pro**: Lleva siempre agua dulce para aclarar la sal del pelaje de tu perro al terminar la jornada para evitar irritaciones.
        `,
        coverImage: "https://images.unsplash.com/photo-1519098901909-b1553a1190af?q=80&w=2574&auto=format&fit=crop",
        author: {
            name: "Laura G.",
            role: "Editora Viajes",
            avatar: "https://ui-avatars.com/api/?name=Laura+G&background=c27ba0&color=fff"
        },
        date: "2026-01-15",
        tags: ["Playas", "Verano", "Cantabria"],
        category: "Rutas",
        featured: false
    }
];

export function getPostBySlug(slug: string): BlogPost | undefined {
    return blogPosts.find(post => post.slug === slug);
}

export function getRelatedPosts(currentId: string, category: string): BlogPost[] {
    return blogPosts
        .filter(post => post.category === category && post.id !== currentId)
        .slice(0, 3);
}

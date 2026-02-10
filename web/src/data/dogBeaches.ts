export interface DogBeach {
    id: string;
    name: string;
    region: string;
    location: string;
    coordinates: [number, number]; // [lng, lat]
    description: string;
    imageUrl?: string;
    seasonal: boolean; // true = restricted dates, false = all year
}


export const dogBeaches: DogBeach[] = [
    // CANTABRIA
    {
        id: "beach-can-001",
        name: "Playa de la Maza",
        region: "Cantabria",
        location: "San Vicente de la Barquera",
        coordinates: [-4.3855, 43.3872],
        description: "También conocida como Playa de los Vagos. Pequeña playa de arena fina situada en la ría.",
        seasonal: false,
        imageUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=800"
    },
    {
        id: "beach-can-002",
        name: "Playa La Riberuca",
        region: "Cantabria",
        location: "Suances",
        coordinates: [-4.0435, 43.4285],
        description: "Zona habilitada en la desembocadura de la ría Saja-Besaya.",
        seasonal: false,
        imageUrl: "https://images.unsplash.com/photo-1520454974749-611b7248bc68?auto=format&fit=crop&q=80&w=800"
    },
    {
        id: "beach-can-003",
        name: "Playa de Helgueras",
        region: "Cantabria",
        location: "Noja",
        coordinates: [-3.5089, 43.4832],
        description: "Zona habilitada en la Playa de Trengandín.",
        seasonal: false, // Check regulation
        imageUrl: "https://images.unsplash.com/photo-1473116763249-56381a34c114?auto=format&fit=crop&q=80&w=800"
    },
    {
        id: "beach-can-004",
        name: "El Puntal",
        region: "Cantabria",
        location: "Somo",
        coordinates: [-3.7712, 43.4611],
        description: "Zona sur del Puntal de Somo en la Bahía de Santander.",
        seasonal: false,
        imageUrl: "https://images.unsplash.com/photo-1506477331477-33d5d8b3dc85?auto=format&fit=crop&q=80&w=800"
    },

    // ASTURIAS
    {
        id: "beach-ast-001",
        name: "Playa del Sablón (Bayas)",
        region: "Asturias",
        location: "Castrillón",
        coordinates: [-6.0355, 43.5714],
        description: "Una de las mejores playas caninas del norte, larga y salvaje.",
        seasonal: false,
        imageUrl: "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?auto=format&fit=crop&q=80&w=800"
    },
    {
        id: "beach-ast-002",
        name: "Cala Saliencia",
        region: "Asturias",
        location: "Cudillero",
        coordinates: [-6.1245, 43.5689],
        description: "Pequeña cala de difícil acceso pero muy tranquila.",
        seasonal: false,
        imageUrl: "https://images.unsplash.com/photo-1471922694854-ff1b63b20054?auto=format&fit=crop&q=80&w=800"
    },

    // GALICIA
    {
        id: "beach-gal-001",
        name: "Playa de Ares",
        region: "Galicia",
        location: "A Coruña",
        coordinates: [-8.2435, 43.4256],
        description: "Zona acotada cerca del puerto deportivo.",
        seasonal: true, // Summer restrictions often apply in Galicia urban beaches, check specific
        imageUrl: "https://images.unsplash.com/photo-1501854140884-074bf22284da?auto=format&fit=crop&q=80&w=800"
    },
    {
        id: "beach-gal-002",
        name: "Playa de O Espiño",
        region: "Galicia",
        location: "O Grove",
        coordinates: [-8.8632, 42.4635],
        description: "Playa tranquila junto al puerto de Pedras Negras.",
        seasonal: false,
        imageUrl: "https://images.unsplash.com/photo-1476673160081-cf065607f39f?auto=format&fit=crop&q=80&w=800"
    },

    // EUSKADI (Pocas oficiales todo el año, la mayoría seasonal)
    // Añadimos placeholders conocidos aunque sean de temporada
];

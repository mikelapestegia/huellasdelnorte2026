export interface HospitalityPlace {
    id: string;
    name: string;
    type: 'restaurant' | 'cafe' | 'bar';
    cuisine: string; // Tipo de comida: "Vasca", "Mariscos", "Cafetería", "Pintxos"
    region: string;
    city: string;
    address?: string;
    description: string;
    petPolicy: string; // Detalles clave: "Entrada permitida", "Solo terraza", "Ofrecen agua", "Menú perruno"
    rating?: number;
    priceRange: '€' | '€€' | '€€€' | '€€€€';
    // Location - GeoJSON format [longitude, latitude]
    coordinates: [number, number];
    image?: string;
    website?: string;
    features?: string[]; // ["Terraza cubierta", "Jardín", "Wifi"]
}

export const hospitalityPlaces: HospitalityPlace[] = [
    // EUSKADI - GIPUZKOA
    {
        id: "host-gip-001",
        name: "Koh Tao",
        type: "bar",
        cuisine: "Café y Copas",
        region: "Euskadi",
        city: "Donostia-San Sebastián",
        description: "Espacio cultural y café con ambiente relajado donde los perros son bienvenidos en el interior.",
        petPolicy: "Interior permitido. Agua disponible.",
        rating: 4.5,
        priceRange: "€€",
        coordinates: [-1.9800, 43.3240],
        features: ["Wifi", "Música"]
    },
    {
        id: "host-gip-002",
        name: "Bar Desy",
        type: "bar",
        cuisine: "Pintxos y Cervezas",
        region: "Euskadi",
        city: "Donostia-San Sebastián",
        address: "Barrio de Gros",
        description: "Clásico del barrio de Gros con excelentes pintxos y una gran selección de cervezas artesanales. Muy dog friendly.",
        petPolicy: "Interior permitido. Trato cariñoso.",
        rating: 4.7,
        priceRange: "€",
        coordinates: [-1.9750, 43.3250],
        features: ["Terraza"]
    },
    {
        id: "host-gip-003",
        name: "Via Fora",
        type: "restaurant",
        cuisine: "Catalana / Arroces",
        region: "Euskadi",
        city: "Donostia-San Sebastián",
        description: "Restaurante con terraza junto al río Urumea, ideal para ir con perro tras un paseo.",
        petPolicy: "Terraza muy amplia y cubierta.",
        rating: 4.2,
        priceRange: "€€€",
        coordinates: [-1.9800, 43.3150],
        features: ["Terraza cubierta", "Vistas"]
    },

    // EUSKADI - BIZKAIA
    {
        id: "host-biz-001",
        name: "Cinnamon",
        type: "cafe",
        cuisine: "Café de especialidad / Brunch",
        region: "Euskadi",
        city: "Bilbao",
        description: "Cafetería moderna en el centro de Bilbao con cafés de especialidad y tartas caseras.",
        petPolicy: "Bienvenidos en el interior.",
        rating: 4.6,
        priceRange: "€€",
        coordinates: [-2.9350, 43.2630],
    },
    {
        id: "host-biz-002",
        name: "La Camelia Vegan Bar",
        type: "restaurant",
        cuisine: "Vegana / Sushi",
        region: "Euskadi",
        city: "Bilbao",
        description: "Cocina vegana bio y sushi vegetal. Un sitio pequeño y acogedor donde aman a los animales.",
        petPolicy: "Interior permitido. Espacio pequeño.",
        rating: 4.8,
        priceRange: "€€",
        coordinates: [-2.9300, 43.2580],
    },
    {
        id: "host-biz-003",
        name: "Happy River",
        type: "restaurant",
        cuisine: "Fusión / Internacional",
        region: "Euskadi",
        city: "Bilbao",
        description: "Local de moda con terraza climatizada frente a la ría. Ambiente muy animado.",
        petPolicy: "Terraza climatizada permitida.",
        rating: 4.3,
        priceRange: "€€€",
        coordinates: [-2.9280, 43.2550],
        features: ["Terraza cubierta", "Vistas"]
    },

    // CANTABRIA
    {
        id: "host-can-001",
        name: "Días de Sur",
        type: "restaurant",
        cuisine: "Mediterránea / Fusión",
        region: "Cantabria",
        city: "Santander",
        description: "Cocina de mercado con toques modernos. Un referente en Santander por su calidad y trato.",
        petPolicy: "Admiten perros educados en zona específica.",
        rating: 4.5,
        priceRange: "€€€",
        coordinates: [-3.8050, 43.4623],
    },
    {
        id: "host-can-002",
        name: "Centro Botín Café",
        type: "cafe",
        cuisine: "Cafetería",
        region: "Cantabria",
        city: "Santander",
        description: "El café del centro de arte, con vistas espectaculares a la bahía.",
        petPolicy: "Terraza exterior amplia.",
        rating: 4.0,
        priceRange: "€€",
        coordinates: [-3.8000, 43.4600],
        features: ["Vistas", "Terraza"]
    },

    // ASTURIAS
    {
        id: "host-ast-001",
        name: "Raw Coco Green Bar",
        type: "cafe",
        cuisine: "Saludable / Zumos",
        region: "Asturias",
        city: "Gijón",
        description: "Zumos cold-press, smoothies y comida saludable en un ambiente fresco y moderno.",
        petPolicy: "Interior permitido.",
        rating: 4.4,
        priceRange: "€€",
        coordinates: [-5.6615, 43.5357],
    },
    {
        id: "host-ast-002",
        name: "La Galana",
        type: "restaurant",
        cuisine: "Asturiana / Tapas",
        region: "Asturias",
        city: "Gijón",
        description: "Sidrería y restaurante en la Plaza Mayor. Muy concurrido y con gran ambiente.",
        petPolicy: "Terraza en la plaza.",
        rating: 4.3,
        priceRange: "€€",
        coordinates: [-5.6600, 43.5400],
        features: ["Terraza"]
    },

    // GALICIA
    {
        id: "host-gal-001",
        name: "La Urbana",
        type: "bar",
        cuisine: "Hamburguesas / Casual",
        region: "Galicia",
        city: "A Coruña",
        description: "Local moderno con buenas hamburguesas y ambiente joven.",
        petPolicy: "Interior permitido.",
        rating: 4.2,
        priceRange: "€€",
        coordinates: [-8.4115, 43.3623],
    },
    {
        id: "host-gal-002",
        name: "O Sendeiro",
        type: "restaurant",
        cuisine: "Gallega moderna",
        region: "Galicia",
        city: "Santiago de Compostela",
        description: "Restaurante con encanto en una antigua curtiduría. Cocina gallega actualizada.",
        petPolicy: "Terraza interior ajardinada preciosa.",
        rating: 4.7,
        priceRange: "€€€",
        coordinates: [-8.5448, 42.8782],
        features: ["Jardín", "Terraza"]
    }
];

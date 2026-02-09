export interface Product {
    id: string;
    name: string;
    brand: string;
    category: 'tech' | 'food' | 'accessory';
    image: string;
    description: string;
    price: number;
    rating: number;
    reviews: number;

    // Monetization Strategy
    monetization: 'affiliate' | 'subscription' | 'local_connect';

    // Specific Fields
    affiliateUrl?: string; // For 'affiliate'
    subscriptionDetails?: {
        devicePrice: number;
        monthlyPrice: number;
        features: string[];
    };
    localShopIds?: string[]; // For 'local_connect'
}

export interface LocalShop {
    id: string;
    name: string;
    address: string;
    city: string;
    coordinates: [number, number];
    phone: string;
    isPartner: boolean; // True = Paying subscriber
}

export const localShops: LocalShop[] = [
    {
        id: "shop-bilbao-1",
        name: "Maskotas Bilbao",
        address: "Gran Vía 45, Bilbao",
        city: "Bilbao",
        coordinates: [-2.9349, 43.2630],
        phone: "944 123 456",
        isPartner: true
    },
    {
        id: "shop-donosti-1",
        name: "Guau Donosti",
        address: "Calle Mayor 12, San Sebastián",
        city: "San Sebastián",
        coordinates: [-1.9812, 43.3183],
        phone: "943 987 654",
        isPartner: true
    },
    {
        id: "shop-gijon-1",
        name: "AsturCan",
        address: "Paseo del Muro 10, Gijón",
        city: "Gijón",
        coordinates: [-5.6611, 43.5452],
        phone: "985 111 222",
        isPartner: true
    }
];

export const products: Product[] = [
    // --- TECH (Subscription / Affiliate) ---
    {
        id: "prod-gps-01",
        name: "Tractive GPS DOG 4",
        brand: "Tractive",
        category: "tech",
        image: "https://m.media-amazon.com/images/I/51wY-D3qjWL._AC_SX679_.jpg",
        description: "El localizador GPS más popular. Seguimiento en tiempo real mundial y monitor de actividad.",
        price: 49.99, // Device price
        rating: 4.8,
        reviews: 1250,
        monetization: "subscription",
        subscriptionDetails: {
            devicePrice: 49.99,
            monthlyPrice: 5.00,
            features: ["Rastreo ilimitado", "Historial de ubicación", "Alerta de fugas"]
        }
    },
    {
        id: "prod-cam-01",
        name: "Furbo Cámara para Perros 360°",
        brand: "Furbo",
        category: "tech",
        image: "https://m.media-amazon.com/images/I/51a+v-v+v+L._AC_SX679_.jpg",
        description: "Cámara inteligente con lanzamiento de chuches y alertas de ladrido. Visión nocturna y rotación 360.",
        price: 199.00,
        rating: 4.6,
        reviews: 890,
        monetization: "affiliate",
        affiliateUrl: "https://amzn.to/example"
    },

    // --- FOOD (Local Connect) ---
    {
        id: "prod-food-ana",
        name: "Acana Prairie Poultry 11.4kg",
        brand: "Acana",
        category: "food",
        image: "https://m.media-amazon.com/images/I/61k1+k+k+L._AC_SY879_.jpg",
        description: "Pienso natural sin cereales, con pollo y pavo de corral. Ideal para todas las razas.",
        price: 54.95,
        rating: 4.9,
        reviews: 320,
        monetization: "local_connect",
        localShopIds: ["shop-bilbao-1", "shop-gijon-1"]
    },
    {
        id: "prod-food-orijen",
        name: "Orijen Original Dog 11.4kg",
        brand: "Orijen",
        category: "food",
        image: "https://m.media-amazon.com/images/I/71k1+k+k+L._AC_SY879_.jpg",
        description: "Dieta biológicamente apropiada con 85% de carne de calidad. Pollo, pavo y pescado salvaje.",
        price: 89.90,
        rating: 5.0,
        reviews: 150,
        monetization: "local_connect",
        localShopIds: ["shop-donosti-1", "shop-bilbao-1"]
    },
    {
        id: "prod-barf-nat",
        name: "Menú BARF Pollo y Ternera 1kg",
        brand: "Naturabarf",
        category: "food",
        image: "https://m.media-amazon.com/images/I/81k1+k+k+L._AC_SY879_.jpg", // Placeholder
        description: "Alimento crudo completo congelado. Carne 100% natural sin aditivos.",
        price: 6.50,
        rating: 4.7,
        reviews: 45,
        monetization: "local_connect",
        localShopIds: ["shop-gijon-1", "shop-donosti-1"]
    }
];

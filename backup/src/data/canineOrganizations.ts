// Catálogo de Asociaciones Caninas, Protectoras y Plataformas del Arco Atlántico
// Incluye: refugios, protectoras, plataformas de perros perdidos, y organizadores de eventos

export type OrganizationType =
    | "protectora"      // Refugio/protectora de animales
    | "adopcion"        // Plataforma de adopción
    | "perdidos"        // Plataforma de búsqueda de mascotas perdidas
    | "eventos"         // Organizador de eventos caninos
    | "comunidad"       // Grupos/comunidades caninas
    | "federacion";     // Federación o sociedad canina oficial

export type ServiceType =
    | "adopcion"
    | "acogida"
    | "rescate"
    | "busqueda_perdidos"
    | "eventos"
    | "formacion"
    | "voluntariado"
    | "donaciones"
    | "microchip"
    | "veterinario"
    | "canicross"
    | "exposiciones";

export interface SocialMedia {
    facebook?: string;
    instagram?: string;
    twitter?: string;
    tiktok?: string;
    youtube?: string;
}

export interface CanineOrganization {
    id: string;
    name: string;
    type: OrganizationType;
    region: string;
    country: "ES" | "FR";
    city?: string;
    address?: string;
    description: string;
    services: ServiceType[];
    website?: string;
    email?: string;
    phone?: string;
    socialMedia?: SocialMedia;
    coordinates?: [number, number]; // [lng, lat]
    isVerified: boolean;
    foundedYear?: number;
    animalsCount?: number; // Número aproximado de animales en el refugio
    visitingHours?: string;
}

export interface CanineEvent {
    id: string;
    name: string;
    type: "canicross" | "exposicion" | "quedada" | "senderismo" | "formacion" | "adopcion" | "festival";
    region: string;
    country: "ES" | "FR";
    city?: string;
    description: string;
    date?: string; // ISO date string
    recurringSchedule?: string; // e.g., "Primer domingo de cada mes"
    organizerId?: string; // Reference to CanineOrganization
    website?: string;
    registrationUrl?: string;
    isFree: boolean;
    dogFriendly: boolean;
    coordinates?: [number, number];
}

// =============================================================================
// PROTECTORAS Y REFUGIOS - ESPAÑA
// =============================================================================

export const protectorasEspana: CanineOrganization[] = [
    // PAÍS VASCO
    {
        id: "pv-001",
        name: "Protectora de Animales de Gipuzkoa - Zuhaitz-pe",
        type: "protectora",
        region: "Euskadi",
        country: "ES",
        city: "Donostia-San Sebastián",
        description: "Refugio que defiende el bienestar animal en Gipuzkoa con servicios de adopción y acogida.",
        services: ["adopcion", "acogida", "rescate", "voluntariado", "donaciones"],
        website: "https://protectoradegipuzkoa.com",
        coordinates: [-1.9876, 43.3183],
        isVerified: true,
    },
    {
        id: "pv-002",
        name: "APA Puppy Bilbao",
        type: "protectora",
        region: "Euskadi",
        country: "ES",
        city: "Bilbao",
        description: "Asociación enfocada en adopciones exclusivamente en el País Vasco.",
        services: ["adopcion", "acogida", "rescate"],
        website: "https://puppybilbao.org",
        coordinates: [-2.9253, 43.2630],
        isVerified: true,
    },
    {
        id: "pv-003",
        name: "A.P.A. SOS BILBAO",
        type: "protectora",
        region: "Euskadi",
        country: "ES",
        city: "Bilbao",
        description: "Protectora histórica de Bilbao dedicada al rescate y adopción de animales abandonados. No hay atención telefónica.",
        services: ["adopcion", "acogida", "rescate", "voluntariado"],
        website: "https://sosbilbao.org",
        email: "perros.sosbilbao@gmail.com",
        socialMedia: {
            facebook: "https://facebook.com/APASOSBilbao",
        },
        coordinates: [-2.9349, 43.2627],
        isVerified: true,
    },
    {
        id: "pv-004",
        name: "Fundación APASOS",
        type: "protectora",
        region: "Euskadi",
        country: "ES",
        city: "Bilbao",
        description: "Fundación nacida de SOS Bilbao para acoger animales rescatados.",
        services: ["adopcion", "acogida", "rescate", "donaciones"],
        website: "https://fundacionapasos.org",
        coordinates: [-2.9340, 43.2620],
        isVerified: true,
    },
    {
        id: "pv-005",
        name: "Capegabi - Centro de Acogida de Bizkaia",
        type: "protectora",
        region: "Euskadi",
        country: "ES",
        city: "Bizkaia",
        description: "Centro de acogida y adopción de perros y gatos de Bizkaia.",
        services: ["adopcion", "acogida", "rescate"],
        website: "https://capegabi.org",
        coordinates: [-2.7680, 43.2341],
        isVerified: true,
    },
    {
        id: "pv-006",
        name: "SPAP Álava",
        type: "protectora",
        region: "Euskadi",
        country: "ES",
        city: "Vitoria-Gasteiz",
        description: "Sociedad Protectora de Animales y Plantas de Álava.",
        services: ["adopcion", "acogida", "rescate", "voluntariado"],
        coordinates: [-2.6726, 42.8467],
        isVerified: true,
    },
    {
        id: "pv-007",
        name: "ANIMALIAK",
        type: "protectora",
        region: "Euskadi",
        country: "ES",
        description: "Asociación protectora de animales del País Vasco.",
        services: ["adopcion", "acogida", "rescate"],
        isVerified: false,
    },
    {
        id: "pv-008",
        name: "Asociación Protectora Miaumor",
        type: "protectora",
        region: "Euskadi",
        country: "ES",
        description: "Asociación protectora de animales en Euskadi.",
        services: ["adopcion", "acogida"],
        isVerified: false,
    },

    // NAVARRA
    {
        id: "nav-001",
        name: "Egapeludos",
        type: "protectora",
        region: "Navarra",
        country: "ES",
        city: "Tierra Estella",
        description: "Protectora de animales de Navarra con refugio para perros y gatos abandonados.",
        services: ["adopcion", "acogida", "rescate", "voluntariado", "donaciones"],
        website: "https://egapeludos.org",
        email: "info@egapeludos.org",
        coordinates: [-1.9432, 42.6700],
        isVerified: true,
    },
    {
        id: "nav-002",
        name: "Txikas de Etxauri",
        type: "protectora",
        region: "Navarra",
        country: "ES",
        city: "Etxauri",
        address: "C/ Lurgorria, 31174 Etxauri, Navarra",
        description: "Asociación sin ánimo de lucro que trabaja con el Centro de Protección Animal Etxauri, recoge perros abandonados en toda Navarra.",
        services: ["adopcion", "acogida", "rescate"],
        website: "https://txikasdeetxauri.com",
        phone: "948 32 92 93",
        coordinates: [-1.7891, 42.7856],
        isVerified: true,
    },
    {
        id: "nav-003",
        name: "Centro de Atención de Animales de Pamplona",
        type: "protectora",
        region: "Navarra",
        country: "ES",
        city: "Pamplona",
        address: "Carretera de la Universidad, s/n (junto al puente de la variante Oeste), Pamplona",
        description: "Centro municipal que acoge animales recogidos en vía pública y facilita adopciones.",
        services: ["adopcion", "acogida", "rescate", "microchip"],
        website: "https://pamplona.es",
        email: "zoonosis@pamplona.es",
        phone: "948 420 996",
        coordinates: [-1.6440, 42.8125],
        isVerified: true,
        visitingHours: "Lunes a Sábado 12:30-13:30h",
    },
    {
        id: "nav-004",
        name: "Dejan Huella",
        type: "protectora",
        region: "Navarra",
        country: "ES",
        description: "Ayuda a que perros en adopción encuentren un hogar en Navarra.",
        services: ["adopcion", "acogida"],
        website: "https://dejanhuella.org",
        isVerified: true,
    },
    {
        id: "nav-005",
        name: "SOS Tudela Animal",
        type: "protectora",
        region: "Navarra",
        country: "ES",
        city: "Tudela",
        description: "ONG dedicada al rescate, rehabilitación e inserción de animales abandonados o maltratados en Navarra y provincias limítrofes.",
        services: ["adopcion", "acogida", "rescate", "voluntariado"],
        website: "https://sostudelaanimal.org",
        coordinates: [-1.6051, 42.0617],
        isVerified: true,
    },

    // CANTABRIA
    {
        id: "cant-001",
        name: "Adopta en los Abedules",
        type: "protectora",
        region: "Cantabria",
        country: "ES",
        description: "Asociación protectora de animales que gestiona la adopción de perros en Cantabria.",
        services: ["adopcion", "acogida", "rescate"],
        website: "https://adoptaenlosabedules.com",
        isVerified: true,
    },
    {
        id: "cant-002",
        name: "PATAS Cantabria",
        type: "protectora",
        region: "Cantabria",
        country: "ES",
        city: "Santander",
        address: "Aptdo 2327, 39080 Santander",
        description: "Protectora y agrupación de rescate y adopción animal en Cantabria.",
        services: ["adopcion", "acogida", "rescate", "voluntariado"],
        website: "https://patascantabria.com",
        email: "infopatas@hotmail.com",
        phone: "646 118 737",
        socialMedia: {
            facebook: "https://facebook.com/PATASCantabria",
            twitter: "https://twitter.com/PATASCantabria",
        },
        isVerified: true,
    },
    {
        id: "cant-003",
        name: "ASPACAN - Asociación Protectora de Cantabria",
        type: "protectora",
        region: "Cantabria",
        country: "ES",
        description: "Protectora de animales en Cantabria.",
        services: ["adopcion", "acogida", "rescate"],
        isVerified: true,
    },
    {
        id: "cant-004",
        name: "La Manada Cántabra",
        type: "protectora",
        region: "Cantabria",
        country: "ES",
        description: "Agrupación de rescate y adopción animal.",
        services: ["adopcion", "acogida", "rescate"],
        isVerified: false,
    },
    {
        id: "cant-005",
        name: "AYRECAN",
        type: "protectora",
        region: "Cantabria",
        country: "ES",
        description: "Agrupación de rescate y adopción animal en Cantabria.",
        services: ["adopcion", "acogida", "rescate"],
        isVerified: false,
    },
    {
        id: "cant-006",
        name: "SOS Miradas",
        type: "protectora",
        region: "Cantabria",
        country: "ES",
        description: "Agrupación de rescate y adopción animal.",
        services: ["adopcion", "rescate"],
        isVerified: false,
    },
    {
        id: "cant-007",
        name: "Galgos y Podencos Cantabria",
        type: "protectora",
        region: "Cantabria",
        country: "ES",
        description: "Agrupación especializada en rescate de galgos y podencos.",
        services: ["adopcion", "rescate", "acogida"],
        isVerified: true,
    },
    {
        id: "cant-008",
        name: "Galgos de Casa",
        type: "protectora",
        region: "Cantabria",
        country: "ES",
        description: "Agrupación de rescate y adopción de galgos.",
        services: ["adopcion", "rescate"],
        isVerified: false,
    },
    {
        id: "cant-009",
        name: "ASPROAN - Protectora de Santander",
        type: "protectora",
        region: "Cantabria",
        country: "ES",
        city: "Santander",
        address: "Bº La Tejona S/N, San Román de la Llanilla, 39012 Santander, Cantabria",
        description: "Refugio canino fundado en 1973 que acoge a casi 300 perros.",
        services: ["adopcion", "acogida", "rescate", "voluntariado", "donaciones"],
        website: "https://asproansantander.es",
        email: "info@asproan.org",
        phone: "639 007 219",
        coordinates: [-3.8044, 43.4623],
        isVerified: true,
        foundedYear: 1973,
        animalsCount: 300,
    },
    {
        id: "cant-010",
        name: "Almas Abandonadas Cantabria",
        type: "protectora",
        region: "Cantabria",
        country: "ES",
        description: "Agrupación de rescate y adopción animal.",
        services: ["adopcion", "rescate"],
        isVerified: false,
    },
    {
        id: "cant-011",
        name: "Refugio Canino Torres",
        type: "protectora",
        region: "Cantabria",
        country: "ES",
        description: "Refugio que facilita la adopción y acogida de perros.",
        services: ["adopcion", "acogida"],
        website: "https://refugiocaninotorres.es",
        isVerified: true,
    },

    // ASTURIAS
    {
        id: "ast-001",
        name: "Fundación Protectora de Animales del Principado de Asturias",
        type: "protectora",
        region: "Asturias",
        country: "ES",
        city: "Siero",
        address: "Les Folgueres, 24B, 33199 Siero, Asturias",
        description: "Refugio principal de Asturias donde se puede adoptar compañía animal.",
        services: ["adopcion", "acogida", "rescate", "voluntariado", "donaciones"],
        website: "https://protectoradeasturias.org",
        email: "info@protectoradeasturias.org",
        coordinates: [-5.6593, 43.3914],
        isVerified: true,
    },
    {
        id: "ast-002",
        name: "APAOA - Protectora del Occidente de Asturias",
        type: "protectora",
        region: "Asturias",
        country: "ES",
        description: "Asociación sin ánimo de lucro para encontrar hogar a animales abandonados en el Occidente de Asturias.",
        services: ["adopcion", "acogida", "rescate", "voluntariado"],
        website: "https://apaoccidenteastur.com",
        isVerified: true,
    },
    {
        id: "ast-003",
        name: "APASA - San Francisco de Asís",
        type: "protectora",
        region: "Asturias",
        country: "ES",
        description: "Protectora dedicada a cuidar perros y gatos maltratados o abandonados hasta encontrar hogar.",
        services: ["adopcion", "acogida", "rescate"],
        website: "https://albergaria.es",
        isVerified: true,
    },
    {
        id: "ast-004",
        name: "Alma Animal Asturias",
        type: "protectora",
        region: "Asturias",
        country: "ES",
        description: "Asociación animalista que facilita adopción, acogida y ayuda a animales.",
        services: ["adopcion", "acogida", "rescate", "voluntariado", "donaciones"],
        website: "https://almaanimalasturias.org",
        isVerified: true,
    },

    // GALICIA
    {
        id: "gal-001",
        name: "Refugio de Animales de Cambados",
        type: "protectora",
        region: "Galicia",
        country: "ES",
        city: "Cambados",
        description: "Refugio que facilita la adopción de animales en Galicia.",
        services: ["adopcion", "acogida", "rescate"],
        website: "https://refugiocambados.es",
        coordinates: [-8.8145, 42.5146],
        isVerified: true,
    },
    {
        id: "gal-002",
        name: "APADAN - A Coruña",
        type: "protectora",
        region: "Galicia",
        country: "ES",
        city: "Culleredo",
        address: "Punta Aguillón s/n, 15189 Culleredo, A Coruña",
        description: "Asociación Protectora de Animales Domésticos Abandonados del Noroeste, mantiene refugio con más de 100 perros.",
        services: ["adopcion", "acogida", "rescate", "voluntariado", "donaciones"],
        website: "https://apadan.org",
        email: "info@apadan.org",
        socialMedia: {
            facebook: "https://facebook.com/APADAN.ACoruna",
            instagram: "https://instagram.com/apadan_acoruna",
            twitter: "https://twitter.com/APADAN_Coruna",
            youtube: "https://youtube.com/APADAN",
        },
        coordinates: [-8.3881, 43.2890],
        isVerified: true,
        animalsCount: 100,
        visitingHours: "Sábados y Domingos 10:00-14:00h (adopciones con cita previa)",
    },
    {
        id: "gal-003",
        name: "Centro Municipal de Protección Animal - Vigo",
        type: "protectora",
        region: "Galicia",
        country: "ES",
        city: "Vigo",
        description: "Programa 'ADÓPTAME en Vigo' del Centro Municipal de Protección Animal de A Madroa.",
        services: ["adopcion", "acogida", "microchip"],
        website: "https://vigo.org",
        coordinates: [-8.7207, 42.2406],
        isVerified: true,
    },
    {
        id: "gal-004",
        name: "Protectora de Xermade",
        type: "protectora",
        region: "Galicia",
        country: "ES",
        city: "Xermade",
        description: "Protectora que ofrece perros en adopción en Lugo.",
        services: ["adopcion", "acogida", "rescate"],
        website: "https://protectora-xermade.com",
        coordinates: [-7.8456, 43.3678],
        isVerified: true,
    },
    {
        id: "gal-005",
        name: "Villa Peixiño",
        type: "adopcion",
        region: "Galicia",
        country: "ES",
        description: "Facilita adopciones de perros y gatos en Galicia con enfoque diferente a refugios tradicionales.",
        services: ["adopcion"],
        website: "https://villapeixino.es",
        isVerified: true,
    },
];

// =============================================================================
// PROTECTORAS Y REFUGIOS - FRANCIA (IPARRALDE / NOUVELLE-AQUITAINE)
// =============================================================================

export const protectorasFrancia: CanineOrganization[] = [
    {
        id: "fr-001",
        name: "Refuge Txakurrak",
        type: "protectora",
        region: "Iparralde",
        country: "FR",
        city: "Bayonne",
        description: "Refuge animalier et pension à Bayonne proposant des chiens à l'adoption.",
        services: ["adopcion", "acogida", "rescate"],
        website: "https://fourriere-animale-64.fr",
        coordinates: [-1.4754, 43.4929],
        isVerified: true,
    },
    {
        id: "fr-002",
        name: "ADAP - Association de Défense Animale Pyrénéenne",
        type: "protectora",
        region: "Iparralde",
        country: "FR",
        description: "Association qui prend en charge des animaux abandonnés et cherche des familles d'accueil.",
        services: ["adopcion", "acogida", "rescate"],
        website: "https://adap64.com",
        isVerified: true,
    },
    {
        id: "fr-003",
        name: "Refuge de la Côte Basque",
        type: "protectora",
        region: "Iparralde",
        country: "FR",
        city: "Saint-Jean-de-Luz",
        address: "2675, Vieille route de Saint Pée, 64500 Saint-Jean-de-Luz, France",
        description: "Association fondée en 1983, gère un refuge qui recueille environ 350 chiens et 300 chats par an. Propose fourrière et pension.",
        services: ["adopcion", "acogida", "rescate", "voluntariado"],
        website: "https://refugecotebasque.org",
        email: "apa-saint-jean-de-luz@orange.fr",
        phone: "+33 5 59 26 69 39",
        coordinates: [-1.6631, 43.3887],
        isVerified: true,
        foundedYear: 1983,
        visitingHours: "Lun-Sam 14:00-17:30h sur RDV (fermé dim et jours fériés)",
    },
    {
        id: "fr-004",
        name: "Centre Animalier SACPA Monein",
        type: "protectora",
        region: "Iparralde",
        country: "FR",
        city: "Monein",
        description: "Centre près de Pau qui propose à l'adoption des animaux trouvés sur la voie publique.",
        services: ["adopcion", "acogida", "microchip"],
        website: "https://groupe-sacpa.fr",
        coordinates: [-0.5802, 43.3210],
        isVerified: true,
    },
    {
        id: "fr-005",
        name: "SPA de Saint-Pierre-du-Mont",
        type: "protectora",
        region: "Iparralde",
        country: "FR",
        city: "Mont-de-Marsan",
        description: "Refuge de la SPA dans les Landes qui recueille et propose à l'adoption des chiens.",
        services: ["adopcion", "acogida", "rescate", "veterinario"],
        website: "https://la-spa.fr",
        coordinates: [-0.4838, 43.8833],
        isVerified: true,
    },
];

// =============================================================================
// PLATAFORMAS DE PERROS PERDIDOS
// =============================================================================

export const plataformasPerdidos: CanineOrganization[] = [
    {
        id: "perdido-001",
        name: "Pet Alert España",
        type: "perdidos",
        region: "Nacional",
        country: "ES",
        description: "Red oficial nº1 en España desde 2012 para animales perdidos. Difunde alertas via web, Facebook, Twitter, SMS y carteles.",
        services: ["busqueda_perdidos"],
        website: "https://petalert.es",
        socialMedia: {
            facebook: "https://facebook.com/petalert.es",
            twitter: "https://twitter.com/petalert_es",
            instagram: "https://instagram.com/petalert_es",
        },
        isVerified: true,
        foundedYear: 2012,
    },
    {
        id: "perdido-002",
        name: "Mascotafind",
        type: "perdidos",
        region: "Nacional",
        country: "ES",
        description: "Plataforma fundada por animalistas con base de datos de animales desaparecidos y encontrados. Teléfono de urgencias 24h.",
        services: ["busqueda_perdidos", "microchip"],
        website: "https://mascotafind.es",
        isVerified: true,
    },
    {
        id: "perdido-003",
        name: "Helppet",
        type: "perdidos",
        region: "Nacional",
        country: "ES",
        description: "Plataforma con IA para búsqueda proactiva de mascotas perdidas mediante reconocimiento fotográfico y geolocalización.",
        services: ["busqueda_perdidos"],
        website: "https://helppet.es",
        isVerified: true,
    },
    {
        id: "perdido-004",
        name: "Busco Mi Perro Perdido",
        type: "perdidos",
        region: "Nacional",
        country: "ES",
        description: "Portal gratuito dedicado específicamente a perros perdidos y encontrados en España.",
        services: ["busqueda_perdidos"],
        website: "https://buscomiperroperdido.com",
        isVerified: true,
    },
    {
        id: "perdido-005",
        name: "Perdidos y Adopciones",
        type: "perdidos",
        region: "Nacional",
        country: "ES",
        description: "Trabaja con ayuntamientos para recogida de animales extraviados, comprueba microchip y busca nuevas familias.",
        services: ["busqueda_perdidos", "adopcion", "microchip"],
        website: "https://perdidosyadopciones.com",
        isVerified: true,
    },
];

// =============================================================================
// FEDERACIONES Y ORGANIZADORES DE EVENTOS
// =============================================================================

export const federacionesEventos: CanineOrganization[] = [
    {
        id: "fed-001",
        name: "Real Sociedad Canina de España (RSCE)",
        type: "federacion",
        region: "Nacional",
        country: "ES",
        description: "Federación oficial que organiza exposiciones caninas, concursos, formación y pruebas a nivel nacional.",
        services: ["eventos", "exposiciones", "formacion"],
        website: "https://rsce.es",
        isVerified: true,
    },
    {
        id: "fed-002",
        name: "Canicross Madrid",
        type: "eventos",
        region: "Nacional",
        country: "ES",
        description: "Organiza y publica calendario de carreras de canicross y mushing en España.",
        services: ["eventos", "canicross"],
        website: "https://canicrosscrossmadrid.com",
        isVerified: true,
    },
    {
        id: "fed-003",
        name: "Canix Catalunya",
        type: "eventos",
        region: "Cataluña",
        country: "ES",
        description: "Organiza eventos de canicross y campeonatos en Cataluña.",
        services: ["eventos", "canicross"],
        website: "https://canix.cat",
        isVerified: true,
    },
    {
        id: "fed-004",
        name: "Lenanimal",
        type: "eventos",
        region: "Nacional",
        country: "ES",
        description: "Plataforma con calendario de eventos de canicross en toda España.",
        services: ["eventos", "canicross"],
        website: "https://lenanimal.com",
        isVerified: true,
    },
    {
        id: "fed-005",
        name: "Expo Canina Valencia",
        type: "eventos",
        region: "Comunidad Valenciana",
        country: "ES",
        city: "Valencia",
        description: "Gran exposición canina con eventos programados para abril 2025.",
        services: ["eventos", "exposiciones"],
        website: "https://caninavalencia.com",
        isVerified: true,
    },
];

// =============================================================================
// EVENTOS CANINOS
// =============================================================================

export const eventosCaninos: CanineEvent[] = [
    // CANICROSS
    {
        id: "evt-001",
        name: "Copa de España de Mushing y Canicross - Buñuel",
        type: "canicross",
        region: "Navarra",
        country: "ES",
        city: "Buñuel",
        description: "Copa de España de Mushing y Canicross.",
        date: "2025-11-15",
        website: "https://canicrosscrossmadrid.com",
        isFree: false,
        dogFriendly: true,
    },
    {
        id: "evt-002",
        name: "Canicross Viladrau",
        type: "canicross",
        region: "Cataluña",
        country: "ES",
        city: "Viladrau",
        description: "Carrera de canicross en Viladrau, Gerona.",
        date: "2026-01-18",
        isFree: false,
        dogFriendly: true,
    },
    {
        id: "evt-003",
        name: "Campeonato de Andalucía Canicross",
        type: "canicross",
        region: "Andalucía",
        country: "ES",
        city: "La Barca de la Florida",
        description: "Campeonato de Andalucía de canicross en Cádiz.",
        date: "2026-01-25",
        isFree: false,
        dogFriendly: true,
    },
    // EXPOSICIONES
    {
        id: "evt-004",
        name: "Exposición Internacional Sociedad Canina Alicante",
        type: "exposicion",
        region: "Comunidad Valenciana",
        country: "ES",
        city: "Alicante",
        description: "Exposición canina internacional organizada por la Sociedad Canina de Alicante.",
        date: "2024-12-01",
        organizerId: "fed-001",
        isFree: false,
        dogFriendly: true,
    },
    {
        id: "evt-005",
        name: "Expo Canina Valencia 2025",
        type: "exposicion",
        region: "Comunidad Valenciana",
        country: "ES",
        city: "Valencia",
        description: "Gran exposición canina de Valencia con nuevas fechas confirmadas.",
        date: "2025-04-05",
        website: "https://caninavalencia.com",
        isFree: false,
        dogFriendly: true,
    },
    {
        id: "evt-006",
        name: "Exposición Internacional Sociedad Canina Andalucía Occidental",
        type: "exposicion",
        region: "Andalucía",
        country: "ES",
        city: "Jerez",
        description: "Exposición canina internacional en Jerez organizada por la Sociedad Canina de Andalucía Occidental.",
        date: "2025-03-15",
        organizerId: "fed-001",
        isFree: false,
        dogFriendly: true,
    },
    // QUEDADAS REGIONALES (Arco Atlántico)
    {
        id: "evt-007",
        name: "Quedada Canina Playa de Hendaya",
        type: "quedada",
        region: "Iparralde",
        country: "FR",
        city: "Hendaye",
        description: "Quedada mensual de perros en la playa de Hendaya durante temporada baja.",
        recurringSchedule: "Primer domingo de cada mes (Oct-May)",
        coordinates: [-1.7739, 43.3638],
        isFree: true,
        dogFriendly: true,
    },
    {
        id: "evt-008",
        name: "Senderismo Canino Selva de Irati",
        type: "senderismo",
        region: "Navarra",
        country: "ES",
        description: "Rutas guiadas de senderismo con perros por la Selva de Irati.",
        recurringSchedule: "Sábados alternos en temporada",
        isFree: false,
        dogFriendly: true,
    },
    {
        id: "evt-009",
        name: "Jornada de Adopción - Protectora de Gipuzkoa",
        type: "adopcion",
        region: "Euskadi",
        country: "ES",
        city: "Donostia-San Sebastián",
        description: "Jornada de puertas abiertas y adopción en el refugio Zuhaitz-pe.",
        recurringSchedule: "Último sábado de cada mes",
        organizerId: "pv-001",
        website: "https://protectoradegipuzkoa.com",
        isFree: true,
        dogFriendly: true,
    },
    {
        id: "evt-010",
        name: "Festival Perros del Norte - Santander",
        type: "festival",
        region: "Cantabria",
        country: "ES",
        city: "Santander",
        description: "Festival anual dog-friendly con actividades, exposiciones y concursos.",
        date: "2025-06-14",
        isFree: true,
        dogFriendly: true,
    },
];

// =============================================================================
// FUNCIONES AUXILIARES
// =============================================================================

// Todas las organizaciones combinadas
export const allOrganizations: CanineOrganization[] = [
    ...protectorasEspana,
    ...protectorasFrancia,
    ...plataformasPerdidos,
    ...federacionesEventos,
];

// Filtrar por región
export function getOrganizationsByRegion(region: string): CanineOrganization[] {
    return allOrganizations.filter(org => org.region === region || org.region === "Nacional");
}

// Filtrar por tipo
export function getOrganizationsByType(type: OrganizationType): CanineOrganization[] {
    return allOrganizations.filter(org => org.type === type);
}

// Filtrar por servicio
export function getOrganizationsByService(service: ServiceType): CanineOrganization[] {
    return allOrganizations.filter(org => org.services.includes(service));
}

// Obtener eventos por región
export function getEventsByRegion(region: string): CanineEvent[] {
    return eventosCaninos.filter(evt => evt.region === region);
}

// Obtener eventos próximos
export function getUpcomingEvents(limit: number = 10): CanineEvent[] {
    const now = new Date().toISOString().split("T")[0];
    return eventosCaninos
        .filter(evt => evt.date && evt.date >= now)
        .sort((a, b) => (a.date || "").localeCompare(b.date || ""))
        .slice(0, limit);
}

// Estadísticas
export function getOrganizationStats() {
    return {
        totalOrganizations: allOrganizations.length,
        protectoras: allOrganizations.filter(o => o.type === "protectora").length,
        plataformasPerdidos: allOrganizations.filter(o => o.type === "perdidos").length,
        eventos: eventosCaninos.length,
        byCountry: {
            ES: allOrganizations.filter(o => o.country === "ES").length,
            FR: allOrganizations.filter(o => o.country === "FR").length,
        },
        byRegion: {
            Euskadi: allOrganizations.filter(o => o.region === "Euskadi").length,
            Navarra: allOrganizations.filter(o => o.region === "Navarra").length,
            Cantabria: allOrganizations.filter(o => o.region === "Cantabria").length,
            Asturias: allOrganizations.filter(o => o.region === "Asturias").length,
            Galicia: allOrganizations.filter(o => o.region === "Galicia").length,
            Iparralde: allOrganizations.filter(o => o.region === "Iparralde").length,
        },
    };
}

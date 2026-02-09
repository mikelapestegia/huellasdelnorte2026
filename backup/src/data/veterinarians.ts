export interface VeterinaryClinic {
    id: string;
    name: string;
    region: string; // Navarra, Euskadi, Rioja, CyL, Galicia, Iparralde
    city: string;
    address: string;
    phone: string;
    emergencyPhone?: string; // Teléfono específico de urgencias si es distinto
    type: 'Hospital 24h' | 'Urgencias Telefónicas' | 'Clínica';
    status: 'open_24h' | 'on_call' | 'standard'; // Para filtrar y colorear
    website?: string;
}

export const veterinaryClinics: VeterinaryClinic[] = [
    // --- NAVARRA ---
    {
        id: "nav-001",
        name: "Hospital Veterinario Pamplona (Unavets)",
        region: "Navarra",
        city: "Mutilva Baja",
        address: "Pol. Ind. Mutilva Baja, Calle A, 115",
        phone: "948 240 304",
        type: "Hospital 24h",
        status: "open_24h",
        website: "https://www.unavets.com"
    },
    {
        id: "nav-002",
        name: "Clínica Veterinaria Ansoáin Dogos",
        region: "Navarra",
        city: "Pamplona",
        address: "C/ Padre Adoáin, 223, bajo",
        phone: "948 130 007",
        emergencyPhone: "680 144 441",
        type: "Urgencias Telefónicas",
        status: "on_call",
        website: "https://veterinariaansoain.com"
    },
    {
        id: "nav-003",
        name: "Clínica Veterinaria Landa",
        region: "Navarra",
        city: "Estella-Lizarra",
        address: "Avda. Yerri / Calle Merkatondoa, 11",
        phone: "948 558 206",
        emergencyPhone: "600 451 275",
        type: "Urgencias Telefónicas",
        status: "on_call",
        website: "https://clinicaveterinarialanda.es"
    },

    // --- EUSKADI ---
    {
        id: "eusk-001",
        name: "Hospital Veterinario Gasteiz",
        region: "Euskadi",
        city: "Vitoria-Gasteiz",
        address: "Avda. del Cantábrico, 12",
        phone: "945 255 000",
        type: "Hospital 24h",
        status: "open_24h"
    },
    {
        id: "eusk-002",
        name: "AniCura Indautxu Hospital Veterinario",
        region: "Euskadi",
        city: "Erandio (Bilbao)",
        address: "Bekoetxebarri Bidea, 5F",
        phone: "944 445 444",
        type: "Hospital 24h",
        status: "open_24h",
        website: "https://www.anicura.es"
    },
    {
        id: "eusk-003",
        name: "Hospital Veterinario Tartanga (Unavets)",
        region: "Euskadi",
        city: "Erandio",
        address: "Zirgariak Etorbidea, 32",
        phone: "944 170 832",
        type: "Hospital 24h",
        status: "open_24h"
    },
    {
        id: "eusk-004",
        name: "Hospital Veterinario Donostia (Unavets)",
        region: "Euskadi",
        city: "Donostia-San Sebastián",
        address: "Gracia Olazabal Kalea, 4",
        phone: "943 472 248",
        type: "Hospital 24h",
        status: "open_24h"
    },
    {
        id: "eusk-005",
        name: "Donostivet Hospital 24h",
        region: "Euskadi",
        city: "Donostia-San Sebastián",
        address: "Gracia Olazabal Kalea, 4",
        phone: "943 472 248", // Mismo edificio/ tlf similar, verificar si son el mismo o coordinados
        type: "Hospital 24h",
        status: "open_24h"
    },

    // --- LA RIOJA ---
    {
        id: "rioja-001",
        name: "AniCura Albeitar Hospital Veterinario",
        region: "La Rioja",
        city: "Logroño",
        address: "Mendavía, 37",
        phone: "941 255 000",
        type: "Hospital 24h",
        status: "open_24h"
    },
    {
        id: "rioja-002",
        name: "Clínica Veterinaria +Cotas",
        region: "La Rioja",
        city: "Logroño",
        address: "Clavijo, 24 bajo",
        phone: "941 519 452",
        emergencyPhone: "609 132 333",
        type: "Urgencias Telefónicas",
        status: "on_call"
    },

    // --- CASTILLA Y LEÓN ---
    {
        id: "cyl-001",
        name: "Hospital Veterinario Los Delfines",
        region: "Castilla y León",
        city: "Burgos",
        address: "C/ Hortelanos, 18",
        phone: "947 260 590",
        type: "Hospital 24h",
        status: "open_24h"
    },
    {
        id: "cyl-002",
        name: "Hospital Veterinario Vistalegre",
        region: "Castilla y León",
        city: "Burgos",
        address: "C/ Victoria Balfe, 8",
        phone: "947 040 264",
        type: "Hospital 24h",
        status: "open_24h"
    },

    // --- GALICIA ---
    {
        id: "gal-001",
        name: "Hospital Veterinario Abeiro",
        region: "Galicia",
        city: "A Coruña",
        address: "C/ San Pedro de Visma, 45",
        phone: "981 288 288",
        type: "Hospital 24h",
        status: "open_24h"
    },
    {
        id: "gal-002",
        name: "Clínica Veterinaria El Arca",
        region: "Galicia",
        city: "A Coruña",
        address: "C/ Real, 158",
        phone: "981 222 333",
        type: "Urgencias Telefónicas",
        status: "on_call"
    },
    {
        id: "gal-003",
        name: "Hospital Veterinario Navia (AniCura)",
        region: "Galicia",
        city: "Vigo",
        address: "Avda. Navia, 11",
        phone: "986 117 056",
        type: "Hospital 24h",
        status: "open_24h"
    },

    // --- IPARRALDE ---
    {
        id: "ipar-001",
        name: "UVCB Urgences Vétérinaires",
        region: "Iparralde",
        city: "Biarritz",
        address: "27 Av. de l'Impératrice",
        phone: "+33 5 59 41 41 41",
        type: "Hospital 24h",
        status: "open_24h"
    },
    {
        id: "ipar-002",
        name: "Clinique Vétérinaire Bayonne",
        region: "Iparralde",
        city: "Bayona",
        address: "24 Av. Jean Rameau",
        phone: "+33 5 59 46 40 40",
        type: "Urgencias Telefónicas",
        status: "on_call"
    }
];

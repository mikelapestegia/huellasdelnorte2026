/**
 * Datos de Apadrinamiento
 * Planes y beneficios para ayudar a los perros que más lo necesitan
 */

export interface SponsorshipPlan {
    id: string;
    name: string;
    price: number; // Precio mensual en euros
    description: string;
    benefits: string[];
    isPopular?: boolean;
    icon: "paw" | "heart" | "star" | "crown";
    color: string;
}

export const sponsorshipPlans: SponsorshipPlan[] = [
    {
        id: "plan-huella",
        name: "Huella Amiga",
        price: 5,
        description: "Una pequeña ayuda mensual que marca la diferencia. Ideal para contribuir a la alimentación básica.",
        benefits: [
            "Certificado digital de padrino",
            "Boletín mensual con noticias",
            "Tu nombre en el muro de agradecimientos"
        ],
        icon: "paw",
        color: "from-slate-500 to-slate-400"
    },
    {
        id: "plan-corazon",
        name: "Corazón Canino",
        price: 10,
        description: "Ayudas a cubrir gastos veterinarios básicos como vacunas y desparasitaciones.",
        benefits: [
            "Todo lo del plan Huella Amiga",
            "Fotos exclusivas de tu ahijado",
            "Descuento en merchandising (10%)",
            "Visitas programadas al refugio"
        ],
        isPopular: true,
        icon: "heart",
        color: "from-pink-500 to-rose-500"
    },
    {
        id: "plan-heroe",
        name: "Héroe Peludo",
        price: 25,
        description: "Para casos especiales que requieren tratamientos, medicación o alimentación específica.",
        benefits: [
            "Todo lo del plan Corazón Canino",
            "Vídeollamada mensual con tu ahijado",
            "Regalo de bienvenida exclusivo",
            "Acceso VIP a eventos de la protectora",
            "Certificado físico de apadrinamiento"
        ],
        icon: "star",
        color: "from-amber-400 to-orange-500"
    },
    {
        id: "plan-guardian",
        name: "Guardián del Norte",
        price: 50,
        description: "El máximo compromiso. Cubres gran parte de los gastos de un perro con necesidades especiales.",
        benefits: [
            "Todo lo del plan Héroe Peludo",
            "Paseos privados con tu ahijado",
            "Tu nombre en una placa en su chenil",
            "Calendario anual personalizado",
            "Pack de bienvenida premium"
        ],
        icon: "crown",
        color: "from-emerald-400 to-teal-500"
    }
];

// Perros que necesitan apadrinamiento urgente (casos crónicos, seniors, enfermos)
export const dogsNeedingSponsorship = [
    {
        dogId: "adopt-005",
        reason: "Tratamiento crónico de leishmania",
        monthlyCost: 45
    },
    {
        dogId: "adopt-007",
        reason: "Senior con artrosis que requiere condroprotectores",
        monthlyCost: 30
    },
    {
        dogId: "adopt-014",
        reason: "Rehabilitación conductual por miedos severos",
        monthlyCost: 60
    }
];

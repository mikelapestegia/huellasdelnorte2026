export interface DogEvent {
    id: string;
    title: string;
    date: string; // Fecha aproximada o exacta
    month: string; // Para agrupar
    location: string;
    region: string;
    type: 'Pastor' | 'Mushing' | 'Canicross' | 'Agility' | 'Feria' | 'Social';
    description: string;
    coordinates?: [number, number]; // Lat, Lng opcional
    imageUrl: string;
}

export const events: DogEvent[] = [
    // --- TRADICIÓN / PASTOR ---
    {
        id: "evt-artzai-eguna",
        title: "Artzai Eguna (Día del Pastor)",
        date: "Último domingo de Agosto",
        month: "Agosto",
        location: "Uharte Arakil",
        region: "Navarra",
        type: "Pastor",
        description: "La fiesta del pastor por excelencia. Campeonato de Perros de Pastor, concurso de quesos y esquileo. Una tradición imprescindible.",
        imageUrl: "https://images.unsplash.com/photo-1484406566174-9da000c64a78?q=80&w=2670&auto=format&fit=crop"
    },
    {
        id: "evt-onati",
        title: "Concurso Internacional de Perros de Pastor",
        date: "Septiembre (Fiestas de San Miguel)",
        month: "Septiembre",
        location: "Oñati",
        region: "Euskadi",
        type: "Pastor",
        description: "Uno de los concursos más técnicos y prestigiosos. Los perros (Border Collie y Euskal Artzain Txakurra) muestran su destreza guiando ovejas.",
        imageUrl: "https://images.unsplash.com/photo-1596796245084-245bd8f0298e?q=80&w=2671&auto=format&fit=crop"
    },
    {
        id: "evt-legazpi",
        title: "Campeonato de Gipuzkoa (Campa de Santa Lucía)",
        date: "Principios de Septiembre",
        month: "Septiembre",
        location: "Legazpi",
        region: "Euskadi",
        type: "Pastor",
        description: "El 'Gipuzkoako Artzain Txakur Txapelketa' reúne a los mejores pastores de la provincia en un entorno natural espectacular.",
        imageUrl: "https://images.unsplash.com/photo-1516467508483-a7212febe31a?q=80&w=2673&auto=format&fit=crop"
    },

    // --- MUSHING / NIEVE ---
    {
        id: "evt-baqueira",
        title: "Campeonato Nacional de Mushing Nieve",
        date: "Enero / Febrero",
        month: "Enero",
        location: "Baqueira Beret",
        region: "Cataluña",
        type: "Mushing",
        description: "Espectacular competición de trineos nórdicos en el corazón de los Pirineos. Reúne a los mejores mushers nacionales.",
        imageUrl: "https://images.unsplash.com/photo-1541599540903-216a46ca1dc0?q=80&w=2671&auto=format&fit=crop"
    },
    {
        id: "evt-andorra",
        title: "Mushing Grandvalira",
        date: "Febrero",
        month: "Febrero",
        location: "Grandvalira",
        region: "Andorra",
        type: "Mushing",
        description: "Referente internacional cercano para ver carreras de trineos de alto nivel en un entorno alpino único.",
        imageUrl: "https://images.unsplash.com/photo-1517173873401-443b749069d3?q=80&w=2670&auto=format&fit=crop"
    },

    // --- CANICROSS / TIERRA ---
    {
        id: "evt-bunuel",
        title: "Copa Nacional de Mushing Tierra - Buñuel",
        date: "Finales de Noviembre",
        month: "Noviembre",
        location: "Buñuel",
        region: "Navarra",
        type: "Canicross",
        description: "Prueba puntuable clásica en la ribera navarra. Circuito rápido y muy buen ambiente mushing.",
        imageUrl: "https://images.unsplash.com/photo-1551632811-561732d1e306?q=80&w=2670&auto=format&fit=crop"
    },
    {
        id: "evt-gurrea",
        title: "Memorial Txema Gurrea",
        date: "Octubre",
        month: "Octubre",
        location: "Calahorra",
        region: "La Rioja",
        type: "Canicross",
        description: "Carrera clásica y emotiva muy cerca de Navarra. Excelente organización y circuitos divertidos para iniciarse o competir.",
        imageUrl: "https://images.unsplash.com/photo-1453303350171-86aefaaf6a72?q=80&w=2671&auto=format&fit=crop"
    },
    {
        id: "evt-gos-artic",
        title: "Liga Gos Àrtic",
        date: "Octubre a Marzo",
        month: "Varios",
        location: "Varios (Pirineo Catalán)",
        region: "Cataluña",
        type: "Mushing",
        description: "Liga muy activa con múltiples carreras tanto en nieve como en tierra. Ideal para seguir el circuito pirenaico.",
        imageUrl: "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?q=80&w=2670&auto=format&fit=crop"
    },

    // --- NUEVOS AÑADIDOS ---
    {
        id: "evt-liga-norte",
        title: "Liga Norte de Agility",
        date: "Septiembre a Junio (Fines de semana)",
        month: "Varios",
        location: "Itinerante (Euskadi, Cantabria, Navarra, Rioja)",
        region: "Norte",
        type: "Agility",
        description: "La competición regular de agility más importante de la zona norte. Clubes de Euskadi, Cantabria y alrededores compiten cada mes.",
        imageUrl: "https://images.unsplash.com/photo-1629957655360-5a96db5d1c23?q=80&w=2670&auto=format&fit=crop"
    },
    {
        id: "evt-burgos",
        title: "Canicross de Burgos",
        date: "Octubre/Noviembre",
        month: "Octubre",
        location: "Burgos",
        region: "Castilla y León",
        type: "Canicross",
        description: "Una de las pruebas con más solera y participación del circuito norte. Circuitos técnicos en bosques cercanos a la ciudad.",
        imageUrl: "https://images.unsplash.com/photo-1505678261036-a3fcc5e884ee?q=80&w=2670&auto=format&fit=crop"
    },
    {
        id: "evt-biatlon",
        title: "Biatlón Canino Solidario",
        date: "Junio (Variable)",
        month: "Junio",
        location: "Varias localidades (ej. Galdakao)",
        region: "Euskadi",
        type: "Agility",
        description: "Eventos lúdico-deportivos donde binomios (humano-perro) superan obstáculos divertidos. 100% ambiente festivo y solidario.",
        imageUrl: "https://images.unsplash.com/photo-1534361960057-19889db9621e?q=80&w=2670&auto=format&fit=crop"
    },

    // --- SOCIAL / QUEDADAS ---
    {
        id: "evt-social-teckel",
        title: "Quedada Salchicha Norte",
        date: "Primer domingo de mes",
        month: "Mensual",
        location: "Parque Doña Casilda (Bilbao)",
        region: "Euskadi",
        type: "Social",
        description: "Encuentro informal de dueños de Teckels. Paseo tranquilo y café posterior. Organizado por grupo de Facebook 'Teckels Euskadi'.",
        imageUrl: "https://images.unsplash.com/photo-1612536053355-326e79267139?q=80&w=2670&auto=format&fit=crop"
    },
    {
        id: "evt-social-senderismo",
        title: "Ruta de Socialización: Artxanda",
        date: "Sábado 15 de Marzo",
        month: "Marzo",
        location: "Funicular de Artxanda",
        region: "Euskadi",
        type: "Social",
        description: "Ruta sencilla de 5km apta para todos los niveles y cachorros. Objetivo: socialización y buen rollo. Grupo 'Senderismo Canino Bizkaia'.",
        imageUrl: "https://images.unsplash.com/photo-1552053831-71594a27632d?q=80&w=2662&auto=format&fit=crop"
    },
    {
        id: "evt-social-solidario",
        title: "Paseo Solidario SOS",
        date: "Abril (Fecha por confirmar)",
        month: "Abril",
        location: "Vuelta del Castillo (Pamplona)",
        region: "Navarra",
        type: "Social",
        description: "Caminata para recaudar fondos y alimentos para la protectora local. Ven con tu perro y conoce a los peludos en adopción.",
        imageUrl: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?q=80&w=2670&auto=format&fit=crop"
    }
];

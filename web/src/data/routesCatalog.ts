export type RouteType = "Andando" | "Bici" | "Mixto";
export type Difficulty = "easy" | "moderate" | "hard";
export type Environment = "río" | "sombra" | "costa" | "montaña" | "bosque" | "cascada" | "valle";

export interface RouteCatalogItem {
  id: string;
  region: string;
  name: string;
  routeType: RouteType;
  distanceKmMin?: number;
  distanceKmMax?: number;
  highlight: string;
  environment: Environment[];
  bathingAllowed: boolean;
  difficulty: Difficulty;
  coordinates: [number, number]; // [lng, lat] center point
  imageUrl?: string;
}

export const regions = [
  "Iparralde",
  "Navarra",
  "Euskadi",
  "Cantabria",
  "Asturias",
  "Galicia",
] as const;

export type Region = typeof regions[number];

export const routesCatalog: RouteCatalogItem[] = [
  // Iparralde (País Vasco francés)
  { id: "ipar-001", region: "Iparralde", name: "Camino de Sirga (Río Nive)", routeType: "Mixto", distanceKmMin: 16, distanceKmMax: 32, highlight: "Río Nive / Sombras constantes", environment: ["río", "sombra"], bathingAllowed: true, difficulty: "moderate", coordinates: [-1.4754, 43.4929], imageUrl: "https://images.unsplash.com/photo-1543324151-24959451965a?auto=format&fit=crop&q=80&w=800" },
  { id: "ipar-002", region: "Iparralde", name: "Les crêtes d'Ithurranburu", routeType: "Andando", distanceKmMin: 5.2, highlight: "Crestas y senderos frescos", environment: ["montaña", "bosque"], bathingAllowed: false, difficulty: "moderate", coordinates: [-1.3891, 43.3012], imageUrl: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?auto=format&fit=crop&q=80&w=800" },
  { id: "ipar-003", region: "Iparralde", name: "Harriondo (Bidarray)", routeType: "Andando", distanceKmMin: 7.8, highlight: "Montaña con vegetación densa", environment: ["montaña", "bosque", "sombra"], bathingAllowed: false, difficulty: "moderate", coordinates: [-1.3505, 43.2684], imageUrl: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=800" },
  { id: "ipar-004", region: "Iparralde", name: "Axuria (Sare)", routeType: "Andando", distanceKmMin: 7.2, highlight: "Cerca de la frontera, muy sombreada", environment: ["montaña", "sombra", "bosque"], bathingAllowed: false, difficulty: "moderate", coordinates: [-1.5801, 43.3082], imageUrl: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&q=80&w=800" },
  { id: "ipar-005", region: "Iparralde", name: "Le pic d'Iramendi", routeType: "Andando", distanceKmMin: 2.2, highlight: "Paseo muy corto y fácil", environment: ["montaña"], bathingAllowed: false, difficulty: "easy", coordinates: [-1.5412, 43.2958], imageUrl: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?auto=format&fit=crop&q=80&w=800" },
  { id: "ipar-006", region: "Iparralde", name: "Oilarandoi (St-Etienne)", routeType: "Andando", distanceKmMin: 13.2, highlight: "Panorámicas y tramos boscosos", environment: ["montaña", "bosque", "sombra"], bathingAllowed: false, difficulty: "hard", coordinates: [-1.3214, 43.2893], imageUrl: "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&q=80&w=800" },
  { id: "ipar-007", region: "Iparralde", name: "Circuit de la montagne (Espelette)", routeType: "Andando", distanceKmMin: 17.5, highlight: "Ruta larga por entorno rural", environment: ["montaña", "valle"], bathingAllowed: false, difficulty: "hard", coordinates: [-1.4486, 43.3412], imageUrl: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=800" },
  { id: "ipar-008", region: "Iparralde", name: "Haranbeltz (Ostabat)", routeType: "Andando", distanceKmMin: 12.8, highlight: "Bosque y patrimonio cultural", environment: ["bosque", "sombra"], bathingAllowed: false, difficulty: "moderate", coordinates: [-1.0432, 43.2698], imageUrl: "https://images.unsplash.com/photo-1448375240586-dfd8d395ea6c?auto=format&fit=crop&q=80&w=800" },
  { id: "ipar-009", region: "Iparralde", name: "Bois de Mixe (Oregue)", routeType: "Andando", distanceKmMin: 2, highlight: "Bosque ideal para días de calor", environment: ["bosque", "sombra"], bathingAllowed: false, difficulty: "easy", coordinates: [-1.0891, 43.3521], imageUrl: "https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&q=80&w=800" },
  { id: "ipar-010", region: "Iparralde", name: "Intxuriste Aterei (Licq)", routeType: "Andando", distanceKmMin: 10.1, highlight: "Entorno virgen de montaña", environment: ["montaña", "río"], bathingAllowed: true, difficulty: "moderate", coordinates: [-0.8765, 43.0321], imageUrl: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&q=80&w=800" },
  { id: "ipar-011", region: "Iparralde", name: "Hoxahandia (Iholdy)", routeType: "Andando", distanceKmMin: 11.2, highlight: "Paisaje montañoso con sombra", environment: ["montaña", "sombra"], bathingAllowed: false, difficulty: "moderate", coordinates: [-1.1234, 43.3198], imageUrl: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?auto=format&fit=crop&q=80&w=800" },
  { id: "ipar-012", region: "Iparralde", name: "La grotte d'Harpea", routeType: "Andando", distanceKmMin: 14, highlight: "Cueva natural y riachuelos", environment: ["montaña", "río", "bosque"], bathingAllowed: true, difficulty: "moderate", coordinates: [-1.0123, 43.0654], imageUrl: "https://images.unsplash.com/photo-1542224566-6e85f2e6772f?auto=format&fit=crop&q=80&w=800" },
  { id: "ipar-013", region: "Iparralde", name: "Tour d'Etchebar", routeType: "Andando", distanceKmMin: 12.3, highlight: "Circular por valles húmedos", environment: ["valle", "río", "sombra"], bathingAllowed: true, difficulty: "moderate", coordinates: [-0.9234, 43.0987], imageUrl: "https://images.unsplash.com/photo-1501854140884-074bf22284da?auto=format&fit=crop&q=80&w=800" },

  // Navarra
  { id: "nav-001", region: "Navarra", name: "Paseo Fluvial del Arga", routeType: "Mixto", distanceKmMin: 16, distanceKmMax: 50, highlight: "50 km de río y vegetación", environment: ["río", "sombra"], bathingAllowed: true, difficulty: "easy", coordinates: [-1.6432, 42.8169], imageUrl: "https://images.unsplash.com/photo-1509355150927-142278912d6a?auto=format&fit=crop&q=80&w=800" },
  { id: "nav-002", region: "Navarra", name: "Vía Verde del Plazaola", routeType: "Mixto", distanceKmMin: 54, highlight: "Lekunberri a Andoain", environment: ["bosque", "río", "sombra"], bathingAllowed: false, difficulty: "moderate", coordinates: [-1.8765, 43.0321], imageUrl: "https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&q=80&w=800" },
  { id: "nav-003", region: "Navarra", name: "Vía Verde del Bidasoa", routeType: "Mixto", distanceKmMin: 42, highlight: "Curso del río Bidasoa", environment: ["río", "sombra", "valle"], bathingAllowed: true, difficulty: "easy", coordinates: [-1.7891, 43.2987], imageUrl: "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&q=80&w=800" },
  { id: "nav-004", region: "Navarra", name: "Nacedero del Urederra", routeType: "Andando", distanceKmMin: 6.2, highlight: "Pozas turquesas (reserva previa)", environment: ["río", "cascada", "bosque"], bathingAllowed: true, difficulty: "easy", coordinates: [-2.1123, 42.7654], imageUrl: "https://images.unsplash.com/photo-1548574505-5e239809ee19?auto=format&fit=crop&q=80&w=800" },
  { id: "nav-005", region: "Navarra", name: "Doneztebe – Cascada de Bisusta", routeType: "Andando", distanceKmMin: 18, highlight: "Cascada y hayedos", environment: ["cascada", "bosque", "sombra"], bathingAllowed: true, difficulty: "hard", coordinates: [-1.7432, 43.1321], imageUrl: "https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&q=80&w=800" },
  { id: "nav-006", region: "Navarra", name: "Cañón del río Irantzu", routeType: "Andando", distanceKmMin: 4.4, highlight: "Estribaciones de Urbasa", environment: ["río", "montaña", "sombra"], bathingAllowed: false, difficulty: "easy", coordinates: [-2.0876, 42.8123], imageUrl: "https://images.unsplash.com/photo-1504851149312-7a075b496cc7?auto=format&fit=crop&q=80&w=800" },
  { id: "nav-007", region: "Navarra", name: "Arrako (Isaba-Belagua)", routeType: "Andando", distanceKmMin: 5.5, highlight: "Circular entre hayas y helechos", environment: ["bosque", "sombra", "montaña"], bathingAllowed: false, difficulty: "easy", coordinates: [-0.8321, 42.9123], imageUrl: "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&q=80&w=800" },
  { id: "nav-008", region: "Navarra", name: "Murmullos del Esca (Roncal)", routeType: "Andando", distanceKmMin: 3.6, highlight: "Sonido del río constante", environment: ["río", "valle"], bathingAllowed: true, difficulty: "easy", coordinates: [-0.8765, 42.8012], imageUrl: "https://images.unsplash.com/photo-1518117621111-657c9190e21a?auto=format&fit=crop&q=80&w=800" },
  { id: "nav-009", region: "Navarra", name: "Mata de Haya-Larreria-Zemeto", routeType: "Andando", distanceKmMin: 12.2, highlight: "Reserva Natural de Larra", environment: ["bosque", "montaña", "sombra"], bathingAllowed: false, difficulty: "hard", coordinates: [-0.7432, 42.9654], imageUrl: "https://images.unsplash.com/photo-1490237152207-b20dd8eb2757?auto=format&fit=crop&q=80&w=800" },
  { id: "nav-010", region: "Navarra", name: "Vuelta a la Ultzama", routeType: "Mixto", distanceKmMin: 20, highlight: "Valle verde cerca de Pamplona", environment: ["valle", "río", "sombra"], bathingAllowed: true, difficulty: "moderate", coordinates: [-1.6123, 42.9321], imageUrl: "https://images.unsplash.com/photo-1585409677983-0f6c41ca9c3b?auto=format&fit=crop&q=80&w=800" },
  { id: "nav-011", region: "Navarra", name: "Sakanako Itzulia", routeType: "Bici", distanceKmMin: 54.1, highlight: "Recorrido por el valle de Sakana", environment: ["valle", "río"], bathingAllowed: false, difficulty: "hard", coordinates: [-2.0321, 42.9012], imageUrl: "https://images.unsplash.com/photo-1452423668726-e866416ddc79?auto=format&fit=crop&q=80&w=800" },
  { id: "nav-012", region: "Navarra", name: "Lizarraga y Urbasa", routeType: "Bici", distanceKmMin: 89.8, highlight: "Puerto y sierra con mucha sombra", environment: ["montaña", "bosque", "sombra"], bathingAllowed: false, difficulty: "hard", coordinates: [-2.1234, 42.8456], imageUrl: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&q=80&w=800" },
  { id: "nav-013", region: "Navarra", name: "Embalse de Alloz", routeType: "Bici", distanceKmMin: 56.7, highlight: "Aguas azules excelentes para baño", environment: ["río", "valle"], bathingAllowed: true, difficulty: "moderate", coordinates: [-1.9876, 42.7123], imageUrl: "https://images.unsplash.com/photo-1619441207978-3d326c46e2c9?auto=format&fit=crop&q=80&w=800" },
  { id: "nav-014", region: "Navarra", name: "Vuelta a la Berrueza", routeType: "Bici", distanceKmMin: 40.9, highlight: "Comarca de Tierra Estella", environment: ["valle"], bathingAllowed: false, difficulty: "moderate", coordinates: [-2.2123, 42.6321], imageUrl: "https://images.unsplash.com/photo-1464207687429-7505649dae38?auto=format&fit=crop&q=80&w=800" },
  { id: "nav-015", region: "Navarra", name: "Valle de Allín", routeType: "Bici", distanceKmMin: 45.6, highlight: "Entorno rural y río Urederra", environment: ["río", "valle", "sombra"], bathingAllowed: true, difficulty: "moderate", coordinates: [-2.0765, 42.7456], imageUrl: "https://images.unsplash.com/photo-1476610182048-b716b8518aae?auto=format&fit=crop&q=80&w=800" },

  // Euskadi
  { id: "eus-001", region: "Euskadi", name: "Vía Verde del Urola", routeType: "Mixto", distanceKmMin: 22.5, highlight: "Río y túneles en Gipuzkoa", environment: ["río", "sombra", "valle"], bathingAllowed: false, difficulty: "easy", coordinates: [-2.3212, 43.2012], imageUrl: "https://images.unsplash.com/photo-1517865288-978fcbf78b2b?auto=format&fit=crop&q=80&w=800" },
  { id: "eus-002", region: "Euskadi", name: "Vía Verde Arditurri", routeType: "Mixto", distanceKmMin: 12, highlight: "De Pasaia a las minas", environment: ["montaña", "bosque"], bathingAllowed: false, difficulty: "moderate", coordinates: [-1.9123, 43.3012], imageUrl: "https://images.unsplash.com/photo-1533240332313-0db49b459ad6?auto=format&fit=crop&q=80&w=800" },
  { id: "eus-003", region: "Euskadi", name: "Vía Verde Arrazola", routeType: "Mixto", distanceKmMin: 5, highlight: "A los pies del Anboto", environment: ["montaña", "valle"], bathingAllowed: false, difficulty: "easy", coordinates: [-2.6321, 43.1012], imageUrl: "https://images.unsplash.com/photo-1455218873509-80974d6cd03c?auto=format&fit=crop&q=80&w=800" },
  { id: "eus-004", region: "Euskadi", name: "Vía Verde Atxuri", routeType: "Mixto", distanceKmMin: 3.8, highlight: "Paseo corto en entorno rural", environment: ["valle"], bathingAllowed: false, difficulty: "easy", coordinates: [-2.4532, 43.1234], imageUrl: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&q=80&w=800" },
  { id: "eus-005", region: "Euskadi", name: "Georuta de Sakoneta", routeType: "Andando", distanceKmMin: 4.7, highlight: "Costa de Mutriku y Deba", environment: ["costa", "montaña"], bathingAllowed: true, difficulty: "moderate", coordinates: [-2.3876, 43.3234], imageUrl: "https://images.unsplash.com/photo-1505832018823-50331d70d237?auto=format&fit=crop&q=80&w=800" },

  // Cantabria
  { id: "can-001", region: "Cantabria", name: "Vía Verde del Pas", routeType: "Mixto", distanceKmMin: 44, highlight: "Junto al cauce del río Pas", environment: ["río", "sombra", "valle"], bathingAllowed: true, difficulty: "easy", coordinates: [-3.8765, 43.2321], imageUrl: "https://images.unsplash.com/photo-1506543477817-640a2f4da41a?auto=format&fit=crop&q=80&w=800" },
  { id: "can-002", region: "Cantabria", name: "Cascada de Aguasal", routeType: "Andando", distanceKmMin: 8, distanceKmMax: 9, highlight: "Bosque fresco y agua", environment: ["cascada", "bosque", "sombra"], bathingAllowed: true, difficulty: "moderate", coordinates: [-4.2321, 43.1012], imageUrl: "https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&q=80&w=800" },
  { id: "can-003", region: "Cantabria", name: "Cascadas del río Cirezos", routeType: "Andando", distanceKmMin: 6, distanceKmMax: 7, highlight: "Sombra densa", environment: ["cascada", "río", "sombra"], bathingAllowed: true, difficulty: "easy", coordinates: [-4.1234, 43.0876], imageUrl: "https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&q=80&w=800" },
  { id: "can-004", region: "Cantabria", name: "Cascada del Tobazo", routeType: "Andando", distanceKmMin: 4, distanceKmMax: 5, highlight: "Salto de agua y microclima", environment: ["cascada", "bosque"], bathingAllowed: true, difficulty: "easy", coordinates: [-3.5432, 43.0321], imageUrl: "https://images.unsplash.com/photo-1548574505-5e239809ee19?auto=format&fit=crop&q=80&w=800" },
  { id: "can-005", region: "Cantabria", name: "Pozo del Amo (Saja)", routeType: "Andando", distanceKmMin: 18, distanceKmMax: 19, highlight: "Río encajonado en reserva", environment: ["río", "bosque", "sombra"], bathingAllowed: true, difficulty: "hard", coordinates: [-4.2876, 43.1321], imageUrl: "https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&q=80&w=800" },
  { id: "can-006", region: "Cantabria", name: "Vía Verde del Besaya", routeType: "Mixto", distanceKmMin: 20, distanceKmMax: 21, highlight: "De Suances a Los Corrales", environment: ["río", "valle"], bathingAllowed: false, difficulty: "easy", coordinates: [-4.0321, 43.2765], imageUrl: "https://images.unsplash.com/photo-1476610182048-b716b8518aae?auto=format&fit=crop&q=80&w=800" },
  { id: "can-007", region: "Cantabria", name: "Senda del Cúlebre", routeType: "Andando", distanceKmMin: 14, distanceKmMax: 15, highlight: "Entorno forestal mitológico", environment: ["bosque", "sombra"], bathingAllowed: false, difficulty: "moderate", coordinates: [-4.5432, 43.3654], imageUrl: "https://images.unsplash.com/photo-1448375240586-dfd8d395ea6c?auto=format&fit=crop&q=80&w=800" },
  { id: "can-008", region: "Cantabria", name: "Cascada de Yera", routeType: "Andando", distanceKmMin: 10, distanceKmMax: 11, highlight: "Estribaciones de los Pasiegos", environment: ["cascada", "montaña", "sombra"], bathingAllowed: true, difficulty: "moderate", coordinates: [-3.7654, 43.1876], imageUrl: "https://images.unsplash.com/photo-1542224566-6e85f2e6772f?auto=format&fit=crop&q=80&w=800" },

  // Asturias
  { id: "ast-001", region: "Asturias", name: "Senda del Oso", routeType: "Mixto", distanceKmMin: 22, highlight: "Antigua vía de tren minero", environment: ["río", "bosque", "sombra"], bathingAllowed: false, difficulty: "easy", coordinates: [-5.9321, 43.2123], imageUrl: "https://images.unsplash.com/photo-1506543730-c0b8r4a2b3c1?auto=format&fit=crop&q=80&w=800" },
  { id: "ast-002", region: "Asturias", name: "Tabayón del Mongallu", routeType: "Andando", distanceKmMin: 11.66, highlight: "Cascada en Parque de Redes", environment: ["cascada", "montaña", "bosque"], bathingAllowed: true, difficulty: "moderate", coordinates: [-5.3654, 43.1543], imageUrl: "https://images.unsplash.com/photo-1510257253460-a249c5e3f191?auto=format&fit=crop&q=80&w=800" },
  { id: "ast-003", region: "Asturias", name: "Cascadas de Oneta", routeType: "Andando", distanceKmMin: 3.5, highlight: "Tres saltos de agua", environment: ["cascada", "bosque", "sombra"], bathingAllowed: true, difficulty: "easy", coordinates: [-6.5123, 43.3321], imageUrl: "https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&q=80&w=800" },
  { id: "ast-004", region: "Asturias", name: "Ruta del Profundu", routeType: "Andando", distanceKmMin: 14, highlight: "Cascada y laguna adyacente", environment: ["cascada", "bosque"], bathingAllowed: true, difficulty: "moderate", coordinates: [-6.3456, 43.2876], imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800" },
  { id: "ast-005", region: "Asturias", name: "Ruta del Alba", routeType: "Andando", distanceKmMin: 7.1, highlight: "Desfiladero con aguas cristalinas", environment: ["río", "cascada", "montaña"], bathingAllowed: true, difficulty: "moderate", coordinates: [-5.2987, 43.1654], imageUrl: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&q=80&w=800" },
  { id: "ast-006", region: "Asturias", name: "Invernales de Vanu", routeType: "Andando", distanceKmMin: 5.6, highlight: "Bosque de robles y hayas", environment: ["bosque", "sombra", "montaña"], bathingAllowed: false, difficulty: "easy", coordinates: [-4.8321, 43.2098], imageUrl: "https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&q=80&w=800" },

  // Galicia
  { id: "gal-001", region: "Galicia", name: "Morgallón-Río Sor", routeType: "Andando", distanceKmMin: 12.2, highlight: "Sombra y frescor fluvial en Lugo", environment: ["río", "sombra", "bosque"], bathingAllowed: true, difficulty: "moderate", coordinates: [-7.7654, 43.6876], imageUrl: "https://images.unsplash.com/photo-1545648588-e2df2d61d152?auto=format&fit=crop&q=80&w=800" },
  { id: "gal-002", region: "Galicia", name: "Sendeiro Muíños Riomaior", routeType: "Andando", distanceKmMin: 13, highlight: "Molinos y río en Pontevedra", environment: ["río", "bosque"], bathingAllowed: true, difficulty: "moderate", coordinates: [-8.4321, 42.3654], imageUrl: "https://images.unsplash.com/photo-1476673160081-cf065607f39f?auto=format&fit=crop&q=80&w=800" },
  { id: "gal-003", region: "Galicia", name: "PR-G 178 Ruta Maquino Largaño", routeType: "Andando", distanceKmMin: 15.3, highlight: "Senderos de la Ribeira Sacra", environment: ["río", "bosque", "sombra"], bathingAllowed: false, difficulty: "hard", coordinates: [-7.5432, 42.4321], imageUrl: "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&q=80&w=800" },
  { id: "gal-004", region: "Galicia", name: "PR-G 213 Bosques Máxicos", routeType: "Andando", distanceKmMin: 21, highlight: "Bosques autóctonos frondosos", environment: ["bosque", "sombra"], bathingAllowed: false, difficulty: "hard", coordinates: [-7.8765, 42.5654], imageUrl: "https://images.unsplash.com/photo-1506543730-c0b8r4a2b3c1?auto=format&fit=crop&q=80&w=800" },
  { id: "gal-005", region: "Galicia", name: "PR-G 180 Ruta a Cubela", routeType: "Andando", distanceKmMin: 13.39, highlight: "Vistas al cañón del Sil", environment: ["río", "montaña"], bathingAllowed: false, difficulty: "moderate", coordinates: [-7.4123, 42.4012], imageUrl: "https://images.unsplash.com/photo-1506543477817-640a2f4da41a?auto=format&fit=crop&q=80&w=800" },
  { id: "gal-006", region: "Galicia", name: "Ruta da Ribeira do Ulla", routeType: "Andando", distanceKmMin: 12.8, highlight: "Paisaje fluvial del río Ulla", environment: ["río", "bosque"], bathingAllowed: true, difficulty: "moderate", coordinates: [-8.3456, 42.7654], imageUrl: "https://images.unsplash.com/photo-1508248557997-6a1005a8f4c3?auto=format&fit=crop&q=80&w=800" },
  { id: "gal-007", region: "Galicia", name: "Roteiro Fervenza Das Hortas", routeType: "Andando", distanceKmMin: 23, highlight: "Cascadas y vegetación atlántica", environment: ["cascada", "bosque", "sombra"], bathingAllowed: true, difficulty: "hard", coordinates: [-8.1234, 42.6543], imageUrl: "https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&q=80&w=800" },
  { id: "gal-008", region: "Galicia", name: "Ruta das Férvedas", routeType: "Andando", distanceKmMin: 24, highlight: "Siete horas de paseo por cascadas", environment: ["cascada", "bosque"], bathingAllowed: true, difficulty: "hard", coordinates: [-7.9876, 42.5987], imageUrl: "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?auto=format&fit=crop&q=80&w=800" },
];

// Helper functions for filtering
export const getRoutesByRegion = (region: Region) =>
  routesCatalog.filter(r => r.region === region);

export const getRoutesByType = (type: RouteType) =>
  routesCatalog.filter(r => r.routeType === type);

export const getRoutesByEnvironment = (env: Environment) =>
  routesCatalog.filter(r => r.environment.includes(env));

export const getRoutesByBathing = (allowed: boolean) =>
  routesCatalog.filter(r => r.bathingAllowed === allowed);

export const getRoutesByDifficulty = (difficulty: Difficulty) =>
  routesCatalog.filter(r => r.difficulty === difficulty);

export const getRoutesByDistance = (minKm: number, maxKm: number) =>
  routesCatalog.filter(r => {
    const dist = r.distanceKmMin ?? 0;
    return dist >= minKm && dist <= maxKm;
  });

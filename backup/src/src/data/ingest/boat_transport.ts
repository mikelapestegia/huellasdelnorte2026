export interface BoatTransportPolicy {
  name: string;
  scope: string;
  status: "allowed" | "conditional" | "not_allowed" | "unknown";
  policy_url: string;
  source: string;
  notes: string;
  last_checked: string;
}

// AUTO-GENERATED from scripts/ingest/sources/boat_transport_policies.json
export const boatTransportPolicies: BoatTransportPolicy[] = [
  {
    "name": "Baleària",
    "scope": "Spain (Mediterranean, Ceuta/Melilla, Baleares)",
    "status": "allowed",
    "policy_url": "https://www.balearia.com/es/viajar-con-balearia/viaja-con-mascotas",
    "source": "official_site",
    "notes": "Permite mascotas con acomodaciones pet friendly (camarote/butaca/casitas).",
    "last_checked": "2026-02-08"
  },
  {
    "name": "Brittany Ferries",
    "scope": "Spain-UK/France routes (Bilbao, Santander)",
    "status": "allowed",
    "policy_url": "https://brittanyferriesnewsroom.com/a-holiday-they-wont-fur-get/",
    "source": "official_newsroom",
    "notes": "Mascotas pueden viajar en camarote pet-friendly, perrera o vehiculo segun el buque.",
    "last_checked": "2026-02-08"
  },
  {
    "name": "Naviera Mar de Ons",
    "scope": "Galicia (Ría de Vigo y líneas locales)",
    "status": "conditional",
    "policy_url": "https://www.mardeons.es/condiciones-de-compra-y-del-servicio-de-transporte-maritimo-de-la-linea-cangas-vigo/",
    "source": "official_terms",
    "notes": "Mascotas permitidas con correa/bozal o transportín; bajo responsabilidad del propietario.",
    "last_checked": "2026-02-08"
  },
  {
    "name": "Cruceros Rías Baixas (Isla de Ons)",
    "scope": "Galicia (Isla de Ons)",
    "status": "not_allowed",
    "policy_url": "https://www.crucerosriasbaixas.com/isla-de-ons/preguntas-frecuentes-sobre-la-isla-de-ons",
    "source": "official_faq",
    "notes": "No se permite acceder con mascotas en la isla; solo perros guía.",
    "last_checked": "2026-02-08"
  },
  {
    "name": "Cruceros Rías Baixas (Islas Cíes)",
    "scope": "Galicia (Islas Cíes)",
    "status": "not_allowed",
    "policy_url": "https://www.crucerosriasbaixas.com/islas-cies/preguntas-frecuentes-sobre-las-islas-cies",
    "source": "official_faq",
    "notes": "No se permiten mascotas en las islas; solo perros lazarillo.",
    "last_checked": "2026-02-08"
  },
  {
    "name": "Cruceros Rías Baixas (Isla de Sálvora)",
    "scope": "Galicia (Isla de Sálvora)",
    "status": "not_allowed",
    "policy_url": "https://www.crucerosriasbaixas.com/nosotros/faqs-cruceros-rias-baixas",
    "source": "official_faq",
    "notes": "En las islas del Parque Nacional (Cíes, Ons, Sálvora) no se permiten mascotas salvo perros guía.",
    "last_checked": "2026-02-08"
  },
  {
    "name": "Naviera de las Rías Gallegas (RG Naviera)",
    "scope": "Galicia (Vigo-Cangas y líneas locales)",
    "status": "conditional",
    "policy_url": "https://rgnaviera.com/condiciones-cangas-vigo/",
    "source": "official_terms",
    "notes": "Permite mascotas con correa/bozal o transportín; responsable el propietario.",
    "last_checked": "2026-02-08"
  },
  {
    "name": "RG Naviera (San Simón)",
    "scope": "Galicia (Isla de San Simón)",
    "status": "not_allowed",
    "policy_url": "https://rgnaviera.com/normativas-por-destinos/",
    "source": "official_terms",
    "notes": "Normativa del destino: no está permitida la entrada de animales de compañía excepto perros guía.",
    "last_checked": "2026-02-08"
  },
  {
    "name": "Piratas de Nabia (Naviera Nabia)",
    "scope": "Galicia (Ría de Vigo: Moaña-Vigo)",
    "status": "allowed",
    "policy_url": "https://www.piratasdenabia.com/viaja-con-perro-naviera-nabia/",
    "source": "official_site",
    "notes": "Ruta #PetFriendly anunciada para viajar con perro en línea regular.",
    "last_checked": "2026-02-08"
  },
  {
    "name": "Barco La Toja (Barco de los mejillones)",
    "scope": "Galicia (O Grove - Isla de La Toja)",
    "status": "allowed",
    "policy_url": "https://www.barcolatoja.com/preguntas-frecuentes/",
    "source": "official_faq",
    "notes": "Permite mascota marcando la opción al reservar.",
    "last_checked": "2026-02-08"
  },
  {
    "name": "Cruceros do Ulla (Turimares)",
    "scope": "Galicia (O Grove - Ría de Arousa)",
    "status": "allowed",
    "policy_url": "https://www.crucerosdoulla.com/ruta-de-los-mejillones-o-grove/",
    "source": "official_site",
    "notes": "Apto para mascotas; avisar en taquilla antes de embarcar.",
    "last_checked": "2026-02-08"
  },
  {
    "name": "Cruceros Pelegrín (Barco de los mejillones)",
    "scope": "Galicia (O Grove - Ría de Arousa)",
    "status": "allowed",
    "policy_url": "https://crucerospelegrin.com/barco-mejillones-o-grove/",
    "source": "official_site",
    "notes": "Actividad con mascotas permitidas.",
    "last_checked": "2026-02-08"
  },
  {
    "name": "Cruceros Pelegrín (Restaurante marinero)",
    "scope": "Galicia (O Grove - Ría de Arousa)",
    "status": "not_allowed",
    "policy_url": "https://crucerospelegrin.com/restaurante-marinero/",
    "source": "official_site",
    "notes": "Mascotas no permitidas en esta actividad.",
    "last_checked": "2026-02-08"
  },
  {
    "name": "Cruceros Pelegrín (Mariscada a bordo)",
    "scope": "Galicia (O Grove - Ría de Arousa)",
    "status": "not_allowed",
    "policy_url": "https://crucerospelegrin.com/mariscada-a-bordo/",
    "source": "official_site",
    "notes": "Mascotas no permitidas en esta actividad.",
    "last_checked": "2026-02-08"
  },
  {
    "name": "La Barca del Peregrino (Ruta Traslatio)",
    "scope": "Galicia (Ría de Arousa - Ruta Traslatio)",
    "status": "allowed",
    "policy_url": "https://www.labarcadelperegrino.com/somos-pet-friendly/",
    "source": "official_site",
    "notes": "Operador anuncia ruta pet friendly.",
    "last_checked": "2026-02-08"
  },
  {
    "name": "Ares desde o Mar (Barco M. Presas)",
    "scope": "Galicia (Ría de Ares)",
    "status": "unknown",
    "policy_url": "https://www.cope.es/emisoras/galicia/a-coruna-provincia/ferrol/noticias/ares-presenta-rutas-turisticas-barco-ria-20250616_3170388.html",
    "source": "news_municipal",
    "notes": "Servicio turístico local anunciado por Concello de Ares; sin política de mascotas publicada.",
    "last_checked": "2026-02-08"
  },
  {
    "name": "Buendía Tours (O Grove con comida a bordo)",
    "scope": "Galicia (O Grove - Ría de Arousa)",
    "status": "not_allowed",
    "policy_url": "https://buendiatours.com/es/ogrove/paseo-barco-con-comida",
    "source": "marketplace",
    "notes": "Listado indica 'Mascotas no permitidas'; verificar con operador.",
    "last_checked": "2026-02-08"
  },
  {
    "name": "Buendía Tours (Isla de Sálvora)",
    "scope": "Galicia (Ribeira - Isla de Sálvora)",
    "status": "not_allowed",
    "policy_url": "https://buendiatours.com/es/ribeira/excursion-barco-isla-salvora",
    "source": "marketplace",
    "notes": "Listado indica 'Mascotas no permitidas'; verificar con operador.",
    "last_checked": "2026-02-08"
  },
  {
    "name": "Barco Variante Espiritual (Amare Turismo Náutico)",
    "scope": "Galicia (Ría de Arousa - Ruta Traslatio)",
    "status": "allowed",
    "policy_url": "https://www.barcovarianteespiritual.com/variante-espiritual-con-perro/",
    "source": "official_site",
    "notes": "El operador indica que es pet-friendly y admite perros en la Ruta Traslatio.",
    "last_checked": "2026-02-08"
  },
  {
    "name": "San Vicente de la Barquera (Barco en la ría)",
    "scope": "Cantabria (Ría de San Vicente de la Barquera)",
    "status": "unknown",
    "policy_url": "https://sanvicentedelabarquera.com/turismo/en-barco-por-la-ria/",
    "source": "official_municipal",
    "notes": "Información turística municipal; sin política de mascotas publicada.",
    "last_checked": "2026-02-08"
  },
  {
    "name": "Ribadesella (Paseos en barco)",
    "scope": "Asturias (Ribadesella)",
    "status": "unknown",
    "policy_url": "https://www.ayto-ribadesella.es/en/ribadesella/turismo/50/paseos-en-barco/",
    "source": "official_municipal",
    "notes": "Turismo municipal; sin política de mascotas publicada.",
    "last_checked": "2026-02-08"
  },
  {
    "name": "Lekeitio (Txalupa Lekeitio)",
    "scope": "País Vasco (Lekeitio)",
    "status": "unknown",
    "policy_url": "https://www.lekeitio.eus/es/turismo/que-hacer/txalupa/",
    "source": "official_municipal",
    "notes": "Servicio turístico municipal; sin política de mascotas publicada.",
    "last_checked": "2026-02-08"
  },
  {
    "name": "Zumaia (Flysch Boat)",
    "scope": "País Vasco (Zumaia)",
    "status": "unknown",
    "policy_url": "https://flysch.com/boat/",
    "source": "official_site",
    "notes": "Operador turístico; no se indica política de mascotas.",
    "last_checked": "2026-02-08"
  },
  {
    "name": "Rías Altas I (Ferrol-Mugardos)",
    "scope": "Galicia (Ría de Ferrol)",
    "status": "unknown",
    "policy_url": "https://mugardos.gal/es/horarios-de-los-cruceros-maritimos-en-el-rias-altas-i/",
    "source": "official_municipal",
    "notes": "Servicio marítimo local; no se encontró política de mascotas.",
    "last_checked": "2026-02-08"
  },
  {
    "name": "Rutas Cedeira (Rutas en barco)",
    "scope": "Galicia (Cedeira - Cabo Ortegal)",
    "status": "unknown",
    "policy_url": "https://www.rutascedeira.com/",
    "source": "official_site",
    "notes": "Operador local con rutas en barco y kayak; no se indica política de mascotas.",
    "last_checked": "2026-02-08"
  },
  {
    "name": "Terralmar (Ría del Eo / Ribadeo / Viveiro / Navia)",
    "scope": "Galicia y Asturias (Ribadeo, Viveiro, Navia, Castropol)",
    "status": "unknown",
    "policy_url": "https://terralmar.com/terralmar-paseo-en-barco-por-la-ria-del-eo/",
    "source": "official_site",
    "notes": "Operador con salidas en varias rías; no se indica política de mascotas.",
    "last_checked": "2026-02-08"
  },
  {
    "name": "Albatros V (Paseos por la ría)",
    "scope": "Galicia/Asturias (Ribadeo, Figueras, Castropol)",
    "status": "unknown",
    "policy_url": "https://www.albatrosv.es/",
    "source": "official_site",
    "notes": "Paseos en barco por la ría; no se indica política de mascotas.",
    "last_checked": "2026-02-08"
  },
  {
    "name": "Playa de las Catedrales en barco (Grupo Albatros & Nuevo Agamar)",
    "scope": "Galicia (Ribadeo - Playa de las Catedrales)",
    "status": "unknown",
    "policy_url": "https://playadelascatedralesenbarco.com/",
    "source": "official_site",
    "notes": "Paseo en lancha rápida; no se indica política de mascotas.",
    "last_checked": "2026-02-08"
  },
  {
    "name": "Naviera Nabia (Ría de Arousa)",
    "scope": "Galicia (Ría de Arousa: O Grove, Sanxenxo, Cambados)",
    "status": "unknown",
    "policy_url": "https://www.piratasdenabia.com/rias-de-galicia/",
    "source": "official_site",
    "notes": "Operador ofrece rutas en la Ría de Arousa; no hay política de mascotas indicada.",
    "last_checked": "2026-02-08"
  },
  {
    "name": "Nabia (Marín - Isla de Tambo)",
    "scope": "Galicia (Ría de Pontevedra)",
    "status": "unknown",
    "policy_url": "https://www.piratasdenabia.com/isla-de-tambo/",
    "source": "official_site",
    "notes": "Ruta a la Isla de Tambo; no se indica política de mascotas.",
    "last_checked": "2026-02-08"
  },
  {
    "name": "Nabia (Combarro)",
    "scope": "Galicia (Ría de Pontevedra: Combarro)",
    "status": "unknown",
    "policy_url": "https://www.piratasdenabia.com/combarro/",
    "source": "official_site",
    "notes": "Ruta a Combarro; no se indica política de mascotas.",
    "last_checked": "2026-02-08"
  },
  {
    "name": "Nabia (Ruta Toxa)",
    "scope": "Galicia (Ría de Arousa: La Toja)",
    "status": "unknown",
    "policy_url": "https://www.piratasdenabia.com/isla-de-la-toja/",
    "source": "official_site",
    "notes": "Ruta a la Isla de La Toja; no se indica política de mascotas.",
    "last_checked": "2026-02-08"
  },
  {
    "name": "Los Reginas",
    "scope": "Cantabria (Bahía de Santander: Santander-Pedreña-Somo)",
    "status": "allowed",
    "policy_url": "https://www.losreginas.com/las-excursiones-en-barco-con-mascotas-son-posibles/",
    "source": "official_site",
    "notes": "Permiten mascotas en todas las rutas con correa y preferible bozal.",
    "last_checked": "2026-02-08"
  },
  {
    "name": "Los Reginas (Ruta a Playa de Somo)",
    "scope": "Cantabria (Bahía de Santander - Somo)",
    "status": "allowed",
    "policy_url": "https://www.losreginas.com/linea-santander-somo/",
    "source": "official_site",
    "notes": "Linea regular; aplica política general de mascotas de Los Reginas.",
    "last_checked": "2026-02-08"
  },
  {
    "name": "Los Reginas (Ruta a Pedreña)",
    "scope": "Cantabria (Bahía de Santander - Pedreña)",
    "status": "allowed",
    "policy_url": "https://www.losreginas.com/linea-santander-pedrena/",
    "source": "official_site",
    "notes": "Linea regular; aplica política general de mascotas de Los Reginas.",
    "last_checked": "2026-02-08"
  },
  {
    "name": "FRS Ferry",
    "scope": "Spain-Morocco (Estrecho)",
    "status": "allowed",
    "policy_url": "https://www.frs.es/planifica-tu-viaje/mascotas",
    "source": "official_site",
    "notes": "Condiciones generales con requisitos de transportín/bozal y peso.",
    "last_checked": "2026-02-08"
  },
  {
    "name": "Armas Trasmediterránea",
    "scope": "Spain (Canarias, Alborán, Península)",
    "status": "allowed",
    "policy_url": "https://armastrasmediterranea.com/extras-viaje/servicios-a-bordo/mascotas-camarote",
    "source": "official_site",
    "notes": "Camarote para mascotas con condiciones (transportín/bozal, max 2 mascotas, 30kg).",
    "last_checked": "2026-02-08"
  },
  {
    "name": "Le Nivelle (Bateaux promenade)",
    "scope": "Iparralde (Saint-Jean-de-Luz)",
    "status": "allowed",
    "policy_url": "https://www.saint-jean-de-luz.com/activite/le-nivelle/",
    "source": "official_site",
    "notes": "Turismo oficial indica 'Animaux bienvenus'.",
    "last_checked": "2026-02-08"
  },
  {
    "name": "Jolaski (Barco Hondarribia-Hendaia)",
    "scope": "País Vasco (Hondarribia-Hendaia)",
    "status": "allowed",
    "policy_url": "https://www.jolaski.com/barco-hondarribia-hendaia",
    "source": "official_site",
    "notes": "El servicio indica que se permiten perros a bordo.",
    "last_checked": "2026-02-08"
  },
  {
    "name": "Catamarán Ciudad San Sebastián",
    "scope": "País Vasco (Donostia/San Sebastián - Bahía de la Concha)",
    "status": "unknown",
    "policy_url": "https://www.ciudadsansebastian.com/",
    "source": "official_site",
    "notes": "Web del operador; sin política de mascotas publicada.",
    "last_checked": "2026-02-08"
  },
  {
    "name": "Bilboats (Ría de Bilbao)",
    "scope": "País Vasco (Bilbao - Ría de Bilbao)",
    "status": "unknown",
    "policy_url": "https://www.bilboats.com/",
    "source": "official_site",
    "notes": "Operador de paseos en barco; no se indica política de mascotas.",
    "last_checked": "2026-02-08"
  },
  {
    "name": "Paseos en Barco por la Ría de Avilés",
    "scope": "Asturias (Ría de Avilés)",
    "status": "allowed",
    "policy_url": "https://paseosbarcoaviles.es/booking-form/",
    "source": "official_site",
    "notes": "Formulario de reserva indica que se permiten perros con correa.",
    "last_checked": "2026-02-08"
  },
  {
    "name": "Actitur Suances (Paseos en barco)",
    "scope": "Cantabria (Suances - RÃ­a de San MartÃ­n / Costa de Suances)",
    "status": "allowed",
    "policy_url": "https://actitursuances.es/ruta-de-la-costa-paseo-en-barco-suances/",
    "source": "official_site",
    "notes": "El operador indica que las mascotas tambiÃ©n suben a bordo.",
    "last_checked": "2026-02-08"
  },
  {
    "name": "Excursiones Marítimas (Laredo-Santoña)",
    "scope": "Cantabria (Laredo y Santoña)",
    "status": "unknown",
    "policy_url": "https://excursionesmaritimas.com/",
    "source": "official_site",
    "notes": "Operador de paseos en barco; no se indica política de mascotas.",
    "last_checked": "2026-02-08"
  },
  {
    "name": "Faro del Caballo (SantoÃ±a/Laredo)",
    "scope": "Cantabria (BahÃ­a de SantoÃ±a y Laredo)",
    "status": "allowed",
    "policy_url": "https://farodelcaballo.es/reservar-acceso-al-faro-del-caballo/",
    "source": "official_site",
    "notes": "La web indica que el barco es pet friendly y permite embarcar con mascota.",
    "last_checked": "2026-02-08"
  },
  {
    "name": "Gijonesa de Actividades SubacuÃ¡ticas",
    "scope": "Asturias (GijÃ³n - Puerto del Musel)",
    "status": "allowed",
    "policy_url": "https://www.turismoasturias.es/organiza-tu-viaje/deporte-y-aventura/aventura/gijonesa-de-actividades-subacuaticas",
    "source": "official_site",
    "notes": "Turismo Asturias indica actividades con mascotas; perro con correa junto al dueÃ±o.",
    "last_checked": "2026-02-08"
  },
  {
    "name": "Cudillero Aventura (Paseos en barco)",
    "scope": "Asturias (Cudillero)",
    "status": "unknown",
    "policy_url": "https://cudilleroaventura.es/sobre-nosotros",
    "source": "official_site",
    "notes": "Operador local de paseos; no se indica polÃ­tica de mascotas.",
    "last_checked": "2026-02-08"
  },
  {
    "name": "Nuevo Agamar (RÃ­a de Ribadeo)",
    "scope": "Asturias/Galicia (RÃ­a del Eo: Ribadeo, Castropol, Figueras)",
    "status": "unknown",
    "policy_url": "https://www.nuevoagamar.es/",
    "source": "official_site",
    "notes": "Operador de paseos en la rÃ­a; no se indica polÃ­tica de mascotas.",
    "last_checked": "2026-02-08"
  },
  {
    "name": "Eomar (Playa de las Catedrales)",
    "scope": "Galicia/Asturias (Ribadeo â Playa de las Catedrales)",
    "status": "unknown",
    "policy_url": "https://terralmar.com/eomar-paseo-en-barco-por-la-playa-de-las-catedrales/",
    "source": "official_site",
    "notes": "Ruta en lancha desde Ribadeo; no se indica polÃ­tica de mascotas.",
    "last_checked": "2026-02-08"
  },
  {
    "name": "Vivemar (RÃ­a de Viveiro)",
    "scope": "Galicia (Viveiro - RÃ­a de Viveiro)",
    "status": "unknown",
    "policy_url": "https://terralmar.com/vivemar-paseo-en-barco-por-la-ria-de-viveiro/",
    "source": "official_site",
    "notes": "Barco turÃ­stico por la rÃ­a; no se indica polÃ­tica de mascotas.",
    "last_checked": "2026-02-08"
  },
  {
    "name": "Areamar (FuciÃ±o do Porco)",
    "scope": "Galicia (Viveiro â FuciÃ±o do Porco)",
    "status": "unknown",
    "policy_url": "https://terralmar.com/areamar-paseo-en-barco-por-el-fucino-do-porco/",
    "source": "official_site",
    "notes": "Ruta al FuciÃ±o do Porco desde Viveiro; no se indica polÃ­tica de mascotas.",
    "last_checked": "2026-02-08"
  },
  {
    "name": "Areamar (RÃ­a de Navia)",
    "scope": "Asturias (Navia - RÃ­a de Navia)",
    "status": "unknown",
    "policy_url": "https://terralmar.com/barco-turistico-ria-de-navia-asturias/",
    "source": "official_site",
    "notes": "Barco turÃ­stico en la rÃ­a; no se indica polÃ­tica de mascotas.",
    "last_checked": "2026-02-08"
  },
  {
    "name": "Proastur (Paseos en barco)",
    "scope": "Asturias (costa asturiana - alquiler/paseo)",
    "status": "unknown",
    "policy_url": "https://www.proastur.com/actividades/paseos-en-barco/",
    "source": "official_site",
    "notes": "Operador de paseos y alquiler de barco; no se indica polÃ­tica de mascotas.",
    "last_checked": "2026-02-08"
  },
  {
    "name": "Hegaluze (Rutas en barco)",
    "scope": "PaÃ­s Vasco (Bermeo - Urdaibai/Gaztelugatxe)",
    "status": "unknown",
    "policy_url": "https://hegaluze.com/",
    "source": "official_site",
    "notes": "Operador local de rutas en barco; no se indica polÃ­tica de mascotas.",
    "last_checked": "2026-02-08"
  },
  {
    "name": "Buceo Sirenia (Paseos en barco)",
    "scope": "Cantabria (SantoÃ±a - Monte Buciero/Faro del Caballo)",
    "status": "unknown",
    "policy_url": "https://buceosirenia.com/servicios/paseos-en-barco/",
    "source": "official_site",
    "notes": "Paseos en barco desde SantoÃ±a; no se indica polÃ­tica de mascotas.",
    "last_checked": "2026-02-08"
  },
  {
    "name": "Aventura NÃ¡utica GijÃ³n (Paseos en barco)",
    "scope": "Asturias (GijÃ³n - Costa/puerto)",
    "status": "unknown",
    "policy_url": "https://aventuranauticagijon.com/archivos/portfolio-items/paseos-en-barco",
    "source": "official_site",
    "notes": "Charter y paseos en barco; no se indica polÃ­tica de mascotas.",
    "last_checked": "2026-02-08"
  },
  {
    "name": "Atlantis Aventura (Rutas en barco)",
    "scope": "Galicia (Fisterra/Finisterre - Costa da Morte)",
    "status": "unknown",
    "policy_url": "https://www.atlantisaventura.com/rutas-en-barco-por-finisterre",
    "source": "official_site",
    "notes": "Operador local de rutas en barco; no se indica polÃ­tica de mascotas.",
    "last_checked": "2026-02-08"
  }
];

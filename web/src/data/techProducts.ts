export interface TechProduct {
  name: string;
  category: string;
  why: string;
}

export const techProducts: TechProduct[] = [
  {
    name: "Collares GPS con geofencing",
    category: "Seguridad",
    why: "Alertas inmediatas si el perro sale de la zona segura.",
  },
  {
    name: "Bebederos inteligentes",
    category: "Salud",
    why: "Detectan cambios en la hidratación y hábitos de consumo.",
  },
  {
    name: "Cámaras 360° con IA",
    category: "Bienestar",
    why: "Monitorean ansiedad por separación y actividad diaria.",
  },
  {
    name: "Wearables de actividad",
    category: "Fitness",
    why: "Miden sueño, pasos y calorías para planes personalizados.",
  },
  {
    name: "Comederos automáticos",
    category: "Nutrición",
    why: "Controlan raciones y horarios desde el móvil.",
  },
  {
    name: "Paseadores robotizados (emergente)",
    category: "Tendencias",
    why: "Apoyo puntual en hogares con poca disponibilidad.",
  },
];

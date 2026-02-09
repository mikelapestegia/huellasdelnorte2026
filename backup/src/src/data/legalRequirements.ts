export interface LegalRequirement {
  code: string;
  title: string;
  platformModule: string;
  consequence: string;
}

export const legalRequirements: LegalRequirement[] = [
  {
    code: "MICROCHIP_RIAC",
    title: "Identificación por microchip (RIAC)",
    platformModule: "Pasaporte digital y verificación de identidad",
    consequence: "Multas elevadas y dificultad para localizar al animal.",
  },
  {
    code: "COURSE_RESPONSIBLE_OWNERSHIP",
    title: "Curso de tenencia responsable",
    platformModule: "Módulo de formación y certificación digital",
    consequence: "Impedimento legal para adopción o adquisición.",
  },
  {
    code: "LIABILITY_INSURANCE",
    title: "Seguro de responsabilidad civil",
    platformModule: "Marketplace de seguros con alertas de vigencia",
    consequence: "Responsabilidad patrimonial directa del dueño.",
  },
  {
    code: "SUPERVISION_LIMIT_24H",
    title: "Supervisión (límite 24 horas)",
    platformModule: "Alertas de recordatorio y red de cuidadores",
    consequence: "Sanciones graves por abandono temporal.",
  },
  {
    code: "BREEDING_RESTRICTION",
    title: "Prohibición de cría particular",
    platformModule: "Registro verificado de criadores profesionales",
    consequence: "Ilegalidad en cesión o venta de cachorros.",
  },
];

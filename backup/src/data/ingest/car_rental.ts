export interface CarRentalPolicy {
  name: string;
  scope: string;
  status: "allowed" | "conditional" | "not_allowed" | "unknown";
  policy_url: string;
  source: string;
  notes: string;
  last_checked: string;
}

// AUTO-GENERATED from scripts/ingest/sources/car_rental_policies.json
export const carRentalPolicies: CarRentalPolicy[] = [
  {
    "name": "SIXT",
    "scope": "Spain",
    "status": "allowed",
    "policy_url": "https://www.sixt.es/help-center/articles/mascotas-en-el-coche/",
    "source": "official_faq",
    "notes": "Pets allowed; return car clean to avoid cleaning fees.",
    "last_checked": "2026-02-08"
  },
  {
    "name": "Budget",
    "scope": "Spain",
    "status": "conditional",
    "policy_url": "https://faq.budget.es/question-category/published/",
    "source": "official_faq",
    "notes": "Requires office approval; cleaning fees may apply if interior is dirty or hair present.",
    "last_checked": "2026-02-08"
  },
  {
    "name": "OK Mobility",
    "scope": "Spain",
    "status": "conditional",
    "policy_url": "https://okmobility.com/es/",
    "source": "official_site",
    "notes": "Site mentions Pack Mascotas / car rental with pets; detailed policy not shown.",
    "last_checked": "2026-02-08"
  },
  {
    "name": "Europcar",
    "scope": "Spain",
    "status": "allowed",
    "policy_url": "https://www.europcar.es/editorial/business/viaja-con-tus-mascotas-con-europcar",
    "source": "editorial",
    "notes": "Editorial content states pets can travel; not official rental terms.",
    "last_checked": "2026-02-08"
  },
  {
    "name": "National Car Rental",
    "scope": "Unknown (policy page on nationalcar.es)",
    "status": "allowed",
    "policy_url": "https://www.nationalcar.es/en/support/car-rental-faqs/pet-policy.html",
    "source": "official_faq",
    "notes": "Pets allowed; must be crated; return car clean; service animals allowed.",
    "last_checked": "2026-02-08"
  },
  {
    "name": "Enterprise",
    "scope": "United States only",
    "status": "allowed",
    "policy_url": "https://www.enterprise.es/es/preguntas-frecuentes-alquiler-vehiculos/general-eeuu/politica-mascotas-alquiler-vehiculo.html",
    "source": "official_faq",
    "notes": "Policy explicitly limited to US offices.",
    "last_checked": "2026-02-08"
  },
  {
    "name": "Alamo",
    "scope": "United States and Canada",
    "status": "allowed",
    "policy_url": "https://www.alamorentacar.es/es/atencion-al-cliente/preguntas-frecuentes-alquiler-vehiculos/mascotas.html",
    "source": "official_faq",
    "notes": "Policy explicitly limited to US/Canada; pets must be crated; return clean.",
    "last_checked": "2026-02-08"
  },
  {
    "name": "Avis",
    "scope": "United States (policy on avis-int.com)",
    "status": "conditional",
    "policy_url": "https://avis-int.com/fidanquetravel/conditions/US",
    "source": "official_terms",
    "notes": "US policy: call pickup office, keep clean; cleaning fee may apply.",
    "last_checked": "2026-02-08"
  },
  {
    "name": "Avis España",
    "scope": "Spain",
    "status": "conditional",
    "policy_url": "https://faq.avis.es/question-category/make-a-booking/",
    "source": "official_faq",
    "notes": "Requires prior approval from the rental office; cleaning fees may apply if interior is dirty or has pet hair.",
    "last_checked": "2026-02-08"
  },
  {
    "name": "Hertz España",
    "scope": "Spain",
    "status": "unknown",
    "policy_url": "https://images.hertz.com/pdfs/PreviousTermsAndConditions_ES.pdf",
    "source": "official_terms",
    "notes": "Spanish terms PDF reviewed; no explicit pet policy found.",
    "last_checked": "2026-02-08"
  },
  {
    "name": "Goldcar",
    "scope": "Spain (varies by office)",
    "status": "unknown",
    "policy_url": "https://www.goldcar.com/es-es/terminos-y-condiciones/",
    "source": "official_terms",
    "notes": "Terms vary by office; pet policy not clearly stated on main terms page.",
    "last_checked": "2026-02-08"
  },
  {
    "name": "Record Go",
    "scope": "Spain",
    "status": "unknown",
    "policy_url": "https://www.recordrentacar.com/instructions/ed04-TFS-ES.pdf",
    "source": "official_document",
    "notes": "Return instructions mention cleaning fees and no smoking; pet policy not specified.",
    "last_checked": "2026-02-08"
  },
  {
    "name": "Thrifty",
    "scope": "Spain",
    "status": "unknown",
    "policy_url": "https://www.thrifty.es/alquiler-de-coches/espana",
    "source": "official_site",
    "notes": "FAQ page reviewed; pet policy not mentioned.",
    "last_checked": "2026-02-08"
  },
  {
    "name": "Centauro",
    "scope": "Spain / Southern Europe",
    "status": "unknown",
    "policy_url": "https://www.centauro.net/",
    "source": "official_site",
    "notes": "Main site reviewed; pet policy not stated.",
    "last_checked": "2026-02-08"
  },
  {
    "name": "Hertz Uruguay",
    "scope": "Uruguay",
    "status": "allowed",
    "policy_url": "https://hertz.com.uy/servicios-especiales-hertz-uruguay",
    "source": "official_site",
    "notes": "Local operator advertises Pet Friendly service.",
    "last_checked": "2026-02-08"
  },
  {
    "name": "Dollar (Iceland)",
    "scope": "Iceland",
    "status": "not_allowed",
    "policy_url": "https://www.dollar.is/faq/",
    "source": "official_faq",
    "notes": "FAQ states pets are not allowed.",
    "last_checked": "2026-02-08"
  }
];

"use client";

import { useEffect, useMemo, useState } from "react";
import { Search, Filter, BadgeCheck, MapPin } from "lucide-react";

interface AssistanceCenter {
  name: string;
  entity_type: string;
  support_type: "guide" | "assistance" | "therapy" | "mixed";
  region: string;
  province: string;
  city: string;
  country: string;
  coverage: string;
  website: string;
  source_url: string;
  source_type: string;
  notes: string;
  last_verified_at: string;
  latitude?: number | null;
  longitude?: number | null;
  geocode_status?: string;
  geocode_precision?: string;
  geocode_source?: string;
}

const supportLabels: Record<AssistanceCenter["support_type"], string> = {
  guide: "Perro guía",
  assistance: "Perro de asistencia",
  therapy: "Terapia asistida",
  mixed: "Mixto",
};

export default function AssistanceCentersPanel() {
  const [centers, setCenters] = useState<AssistanceCenter[]>([]);
  const [query, setQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<"all" | AssistanceCenter["support_type"]>("all");
  const [regionFilter, setRegionFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch("/api/assistance/centers", { cache: "no-store" });
        if (!res.ok) {
          throw new Error(`Request failed: ${res.status}`);
        }
        const payload = (await res.json()) as { centers?: AssistanceCenter[] };
        setCenters(payload.centers ?? []);
      } catch (err) {
        setError("No se pudieron cargar los centros de apoyo.");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  const regions = useMemo(() => {
    const unique = Array.from(new Set(centers.map((center) => center.region).filter(Boolean)));
    return unique.sort((a, b) => a.localeCompare(b));
  }, [centers]);

  const filtered = useMemo(() => {
    return centers.filter((center) => {
      const matchesQuery =
        query.trim().length === 0 ||
        center.name.toLowerCase().includes(query.toLowerCase()) ||
        center.city.toLowerCase().includes(query.toLowerCase()) ||
        center.region.toLowerCase().includes(query.toLowerCase());
      const matchesType = typeFilter === "all" || center.support_type === typeFilter;
      const matchesRegion = regionFilter === "all" || center.region === regionFilter;
      return matchesQuery && matchesType && matchesRegion;
    });
  }, [centers, query, typeFilter, regionFilter]);

  return (
    <div className="rounded-2xl border border-border bg-white/90 p-8 shadow-xl">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <BadgeCheck className="h-5 w-5 text-primary" />
            <h3 className="font-serif text-2xl font-bold text-foreground">Red de perros de apoyo</h3>
          </div>
          <p className="text-foreground/70">
            Centros y asociaciones de perros guía, asistencia y terapia, con cobertura verificada.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-foreground/40" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Buscar por nombre o ciudad"
              className="w-full rounded-xl border border-border bg-white px-9 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-foreground/50" />
            <select
              value={typeFilter}
              onChange={(event) => setTypeFilter(event.target.value as "all" | AssistanceCenter["support_type"])}
              className="rounded-xl border border-border bg-white px-3 py-2 text-sm"
            >
              <option value="all">Todos los tipos</option>
              <option value="guide">Perros guía</option>
              <option value="assistance">Perros de asistencia</option>
              <option value="therapy">Terapia asistida</option>
              <option value="mixed">Mixto</option>
            </select>
            <select
              value={regionFilter}
              onChange={(event) => setRegionFilter(event.target.value)}
              className="rounded-xl border border-border bg-white px-3 py-2 text-sm"
            >
              <option value="all">Todas las regiones</option>
              {regions.map((region) => (
                <option key={region} value={region}>
                  {region}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {loading && <p className="text-sm text-foreground/60">Cargando centros...</p>}
      {error && <p className="text-sm text-red-600">{error}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filtered.map((center) => (
          <div key={center.name} className="rounded-2xl border border-border bg-white p-5 shadow-sm">
            <p className="text-xs font-semibold uppercase text-primary">{supportLabels[center.support_type]}</p>
            <h4 className="mt-2 text-lg font-semibold text-foreground">{center.name}</h4>
            <div className="mt-3 text-sm text-foreground/70 space-y-1">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-foreground/40" />
                <span>
                  {center.city || ""}{center.city && center.province ? ", " : ""}{center.province}
                </span>
              </div>
              <p className="text-xs text-foreground/60">{center.region}</p>
              <p className="text-xs text-foreground/60">Cobertura: {center.coverage}</p>
            </div>
            <div className="mt-4 flex flex-wrap gap-2 text-xs text-foreground/60">
              <span className="rounded-full border border-border px-2 py-1">{center.entity_type}</span>
              {center.geocode_status === "verified" && (
                <span className="rounded-full border border-primary/30 bg-primary/10 px-2 py-1 text-primary">
                  Geolocalizado ({center.geocode_precision})
                </span>
              )}
            </div>
            <div className="mt-4 flex gap-3 text-sm">
              {center.website && (
                <a
                  href={center.website}
                  target="_blank"
                  rel="noreferrer"
                  className="font-semibold text-primary hover:text-primary/80"
                >
                  Web oficial
                </a>
              )}
              {center.source_url && (
                <a
                  href={center.source_url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-foreground/60 hover:text-foreground"
                >
                  Fuente
                </a>
              )}
            </div>
          </div>
        ))}
      </div>

      {!loading && filtered.length === 0 && (
        <p className="mt-6 text-sm text-foreground/60">No hay resultados con esos filtros.</p>
      )}
    </div>
  );
}

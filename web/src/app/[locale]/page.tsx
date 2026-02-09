import Hero from "@/components/Hero";
import Section from "@/components/Section";
import ServiceCard from "@/components/ServiceCard";
import MapLayers from "@/components/MapLayers";
import HomeMap from "@/components/HomeMap";
import { techProducts } from "@/data/techProducts";
import LegalHealthPanel from "@/components/LegalHealthPanel";
import AssistanceCentersPanel from "@/components/AssistanceCentersPanel";
import { ArrowRight, Calendar, MapPin, Users, Store, PawPrint, ShieldCheck, Radio, Film, BookOpen, Dog, Cpu } from "lucide-react";
import { SITE_NAME, SITE_URL } from "@/lib/seo";
import { Link } from "@/navigation";

export default function Home({ params }: { params: { locale: string } }) {
  const pageUrl = `${SITE_URL}/${params.locale}`;
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: pageUrl,
    inLanguage: params.locale,
    description: "Plataforma con mapa, rutas, adopción y servicios pet friendly en el norte peninsular.",
  };

  const highlights = [
    {
      title: "Mapa Pet Friendly",
      description: "Descubre alojamientos, hostelería y rutas para perros con filtros por zona, tipo de servicio y accesibilidad.",
      image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=2670&auto=format&fit=crop",
      delay: 0,
    },
    {
      title: "Calendario & Eventos",
      description: "Quedadas perrunas, jornadas de adopción y actividades con agua para disfrutar todo el año.",
      image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=2670&auto=format&fit=crop",
      delay: 100,
    },
    {
      title: "Comunidad & Adopciones",
      description: "Conecta con protectoras, asociaciones y redes de ayuda para perros perdidos.",
      image: "https://images.unsplash.com/photo-1507146426996-ef05306b995a?q=80&w=2670&auto=format&fit=crop",
      delay: 200,
    },
  ];

  const businessItems = [
    "Alojamientos y campings",
    "Veterinarios 24h y peluquerías",
    "Guarderías y hoteles caninos",
    "Tiendas y alimentación",
    "Adiestradores profesionales",
    "Transporte pet friendly",
    "Hostelería pet friendly",
  ];

  const ocioItems = [
    "Rutas y rutas con agua",
    "Playas y playas fluviales",
    "Eventos apropiados y quedadas perrunas",
    "Foro y comunidad",
    "Canales de YouTube sobre perros",
    "Comunidad, adopciones y perros perdidos",
    "Podcasts y radio perruna",
    "Libros, manuales y consejos",
    "Perros de apoyo",
    "Tecnología para perros",
    "Leyes y ordenanzas caninas",
    "Películas para amantes de perros",
  ];

  return (
    <main className="flex min-h-screen flex-col overflow-x-hidden">
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <Hero />

      {/* Highlights Section */}
      <Section id="mapa" className="bg-background">
        <div className="flex flex-col items-center text-center mb-16 animate-fade-in-up">
          <span className="text-accent font-semibold tracking-widest uppercase mb-4 text-sm">
            Lo Que Vas A Encontrar
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground">
            Un Mapa Vivo Para Dueños De Perros
          </h2>
          <div className="h-1 w-20 bg-primary mt-6 rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {highlights.map((item, index) => (
            <ServiceCard key={index} {...item} />
          ))}
        </div>
      </Section>

      {/* Map Layers Section */}
      <Section id="capas" className="bg-background">
        <div className="flex flex-col items-center text-center mb-16 animate-fade-in-up">
          <span className="text-accent font-semibold tracking-widest uppercase mb-4 text-sm">
            Prioridades Norte 2026
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground">
            Mapa Por Capas Con Datos Verificados
          </h2>
          <p className="mt-4 max-w-3xl text-lg text-foreground/80">
            Playas aptas, veterinarios 24h, guarderías con ocupación en tiempo real, rutas con agua/sombra,
            restaurantes pet friendly, transporte con perro y ordenanzas municipales.
            Cada punto se valida con fuentes públicas o integración directa.
          </p>
        </div>

        <MapLayers />

        <div className="mt-16 grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-10 items-start">
          <div className="rounded-2xl border border-border bg-secondary/20 p-8 shadow-lg">
            <div className="flex items-center gap-3 mb-4">
              <Cpu className="h-5 w-5 text-primary" />
              <h3 className="font-serif text-2xl font-bold text-foreground">
                Productos tecnológicos populares
              </h3>
            </div>
            <p className="text-foreground/70 mb-6">
              Curación inicial de tecnología útil para seguridad, salud y bienestar canino.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {techProducts.map((product) => (
                <div key={product.name} className="rounded-xl border border-border bg-card p-4">
                  <p className="text-sm text-accent font-semibold">{product.category}</p>
                  <h4 className="text-lg font-semibold text-foreground mt-1">{product.name}</h4>
                  <p className="text-sm text-foreground/70 mt-2">{product.why}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card p-6 shadow-lg">
            <h4 className="font-semibold text-foreground mb-3">Integraciones necesarias</h4>
            <ul className="space-y-3 text-sm text-foreground/70">
              <li>API de ocupación para guarderías y hoteles caninos.</li>
              <li>Fuente oficial de playas y ordenanzas por CCAA.</li>
              <li>Directorio de colegios veterinarios y urgencias.</li>
              <li>Rutas verificadas por comunidad y administraciones.</li>
            </ul>
          </div>
        </div>
      </Section>

      {/* Legal & Health Section */}
      <Section id="salud-legal" className="bg-secondary/20 relative overflow-hidden">
        <div className="flex flex-col items-center text-center mb-16 animate-fade-in-up">
          <span className="text-accent font-semibold tracking-widest uppercase mb-4 text-sm">
            Legal + Salud
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground">
            Cumplimiento Y Atención Preventiva
          </h2>
          <p className="mt-4 max-w-3xl text-lg text-foreground/80">
            Pasaporte digital, cursos obligatorios, seguros, telemedicina y triaje asistido por IA.
          </p>
        </div>

        <LegalHealthPanel />
      </Section>

      {/* Assistance Centers Section */}
      <Section id="apoyo" className="bg-background">
        <div className="flex flex-col items-center text-center mb-12 animate-fade-in-up">
          <span className="text-accent font-semibold tracking-widest uppercase mb-4 text-sm">
            Perros de apoyo
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground">
            Centros y Asociaciones de Referencia
          </h2>
          <p className="mt-4 max-w-3xl text-lg text-foreground/80">
            Directorio curado de perros guía, asistencia y terapia con filtros por región y tipo.
          </p>
        </div>

        <AssistanceCentersPanel />
      </Section>

      {/* Businesses Section */}
      <Section id="negocios" className="bg-secondary/20 relative overflow-hidden">
        {/* Decorative background element */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-secondary/10 -skew-x-12 transform translate-x-20 pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative h-[560px] w-full rounded-2xl overflow-hidden shadow-2xl animate-fade-in-up md:order-1 order-2">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1507146426996-ef05306b995a?q=80&w=2670&auto=format&fit=crop")' }}
            />
          </div>

          <div className="space-y-8 animate-fade-in-up md:order-2 order-1" style={{ animationDelay: '200ms' }}>
            <div>
              <span className="text-accent font-semibold tracking-widest uppercase mb-2 block text-sm">
                Negocios
              </span>
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground leading-tight">
                Servicios Para Dueños <br /> De Perros
              </h2>
            </div>

            <p className="text-lg text-foreground/80 leading-relaxed">
              Aquí se muestran las categorías que encontrarás en nuestro directorio. Todo pensado para la vida real con tu perro.
            </p>

            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-foreground/80">
              {businessItems.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <Store className="h-5 w-5 text-accent mt-1" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="rounded-2xl border border-border bg-background/80 p-6 shadow-lg">
              <div className="flex items-center gap-3 mb-3">
                <ShieldCheck className="h-5 w-5 text-primary" />
                <p className="font-semibold text-foreground">Suscripciones y formularios</p>
              </div>
              <p className="text-sm text-foreground/70 mb-4">
                Los negocios pueden registrarse y actualizar su información con un formulario rápido. También ofrecemos
                suscripciones para destacar en el mapa.
              </p>
              <Link
                href="/profesionales"
                className="inline-flex items-center text-primary font-bold text-sm hover:text-primary/80 transition-colors group"
              >
                Quiero aparecer en el mapa <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </Section>

      {/* Map Section */}
      <Section id="mapa-interactivo" className="bg-background relative overflow-hidden py-24">
        <div className="flex flex-col items-center text-center mb-12 animate-fade-in-up">
          <span className="text-accent font-semibold tracking-widest uppercase mb-4 text-sm">
            Explora el Norte
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground">
            Mapa Interactivo
          </h2>
          <p className="mt-4 max-w-2xl text-lg text-foreground/80">
            Descubre guarderías, veterinarios, playas caninas y perros en adopción cerca de ti.
            Activa las capas que te interesen.
          </p>
        </div>

        <div className="max-w-6xl mx-auto px-4 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
          <HomeMap />
        </div>
      </Section>

      {/* Leisure Section */}
      <Section id="ocio" className="bg-background relative overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8 animate-fade-in-up">
            <div>
              <span className="text-accent font-semibold tracking-widest uppercase mb-2 block text-sm">
                Ocio
              </span>
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground leading-tight">
                Planes, Comunidad <br /> Y Contenido
              </h2>
            </div>

            <p className="text-lg text-foreground/80 leading-relaxed">
              Desde rutas con agua hasta contenidos y recursos útiles: todo ordenado para que puedas planificar tu semana con tu perro.
            </p>

            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-foreground/80">
              {ocioItems.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <PawPrint className="h-5 w-5 text-accent mt-1" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-6 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
            <div className="rounded-2xl border border-border bg-secondary/20 p-6 shadow-lg">
              <div className="flex items-center gap-3 mb-3">
                <Users className="h-5 w-5 text-primary" />
                <p className="font-semibold text-foreground">BD de perros</p>
              </div>
              <p className="text-sm text-foreground/70">
                Fichas básicas, avisos de pérdida, adopciones y protectoras con información actualizada.
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-secondary/20 p-6 shadow-lg">
              <div className="flex items-center gap-3 mb-3">
                <Calendar className="h-5 w-5 text-primary" />
                <p className="font-semibold text-foreground">Calendario compartido</p>
              </div>
              <p className="text-sm text-foreground/70">
                Publica eventos, quedadas y rutas con agua para que otros puedan sumarse.
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-secondary/20 p-6 shadow-lg">
              <div className="flex items-center gap-3 mb-3">
                <MapPin className="h-5 w-5 text-primary" />
                <p className="font-semibold text-foreground">Mapa colaborativo</p>
              </div>
              <p className="text-sm text-foreground/70">
                La comunidad puede sugerir nuevos lugares y verificar si siguen siendo pet friendly.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* Community Section */}
      <Section id="comunidad" className="bg-primary text-primary-foreground text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />

        <div className="relative z-10 max-w-3xl mx-auto space-y-8 animate-fade-in-up">
          <div className="flex items-center justify-center gap-6 text-accent">
            <Radio className="h-8 w-8" />
            <BookOpen className="h-8 w-8" />
            <Film className="h-8 w-8" />
          </div>

          <div>
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">
              Contenidos Para Amantes De Los Perros
            </h2>
            <p className="text-primary-foreground/80 text-lg">
              Podcasts, libros, manuales, canales de YouTube, tecnología canina y cine para quienes viven el mundo perruno al máximo.
            </p>
          </div>

          <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <label htmlFor="newsletter-email" className="sr-only">
              Email para avisos y novedades
            </label>
            <input
              type="email"
              id="newsletter-email"
              placeholder="Recibe avisos y novedades"
              className="flex-1 px-6 py-4 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-accent backdrop-blur-sm"
              required
            />
            <button
              type="submit"
              className="px-8 py-4 rounded-lg bg-accent text-white font-bold hover:bg-accent/90 transition-colors shadow-lg"
            >
              Suscribirme
            </button>
          </form>

          <p className="text-xs opacity-60 mt-4">
            Avisos reales, cero spam.
          </p>
        </div>
      </Section>

      {/* Footer */}
      <footer className="w-full bg-background border-t border-border py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <Dog className="h-8 w-8 bg-primary rounded-full flex items-center justify-center text-white font-serif font-bold" />
            <span className="font-serif text-xl font-bold text-foreground">Huellas del Norte</span>
          </div>

          <div className="flex gap-8 text-sm font-medium text-foreground/60">
            <a href="#mapa" className="hover:text-primary transition-colors">Mapa</a>
            <a href="#capas" className="hover:text-primary transition-colors">Capas</a>
            <a href="#mapa-interactivo" className="hover:text-primary transition-colors">Interactivo</a>
            <a href="#salud-legal" className="hover:text-primary transition-colors">Legal</a>
            <a href="#negocios" className="hover:text-primary transition-colors">Negocios</a>
            <a href="#apoyo" className="hover:text-primary transition-colors">Apoyo</a>
            <a href="#comunidad" className="hover:text-primary transition-colors">Comunidad</a>
          </div>

          <p className="text-sm text-foreground/40">
            © 2026 Huellas del Norte.
          </p>
        </div>
      </footer>
    </main>
  );
}

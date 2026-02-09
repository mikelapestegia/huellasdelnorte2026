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
import { getTranslations } from "next-intl/server";

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations("home");
  const tf = await getTranslations("footer");

  const pageUrl = `${SITE_URL}/${locale}`;
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: pageUrl,
    inLanguage: locale,
    description: "Plataforma con mapa, rutas, adopción y servicios pet friendly en el norte peninsular.",
  };

  const highlights = [
    {
      title: t("highlight_map_title"),
      description: t("highlight_map_desc"),
      image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=2670&auto=format&fit=crop",
      delay: 0,
    },
    {
      title: t("highlight_calendar_title"),
      description: t("highlight_calendar_desc"),
      image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=2670&auto=format&fit=crop",
      delay: 100,
    },
    {
      title: t("highlight_community_title"),
      description: t("highlight_community_desc"),
      image: "https://images.unsplash.com/photo-1507146426996-ef05306b995a?q=80&w=2670&auto=format&fit=crop",
      delay: 200,
    },
  ];

  const businessItems = [
    t("biz_accommodation"),
    t("biz_vets"),
    t("biz_kennels"),
    t("biz_shops"),
    t("biz_trainers"),
    t("biz_transport"),
    t("biz_hospitality"),
  ];

  const ocioItems = [
    t("leisure_routes"),
    t("leisure_beaches"),
    t("leisure_events"),
    t("leisure_forum"),
    t("leisure_youtube"),
    t("leisure_adoption"),
    t("leisure_podcasts"),
    t("leisure_books"),
    t("leisure_support"),
    t("leisure_tech"),
    t("leisure_laws"),
    t("leisure_movies"),
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
            {t("highlights_badge")}
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground">
            {t("highlights_title")}
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
            {t("layers_badge")}
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground">
            {t("layers_title")}
          </h2>
          <p className="mt-4 max-w-3xl text-lg text-foreground/80">
            {t("layers_desc")}
          </p>
        </div>

        <MapLayers />

        <div className="mt-16 grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-10 items-start">
          <div className="rounded-2xl border border-border bg-secondary/20 p-8 shadow-lg">
            <div className="flex items-center gap-3 mb-4">
              <Cpu className="h-5 w-5 text-primary" />
              <h3 className="font-serif text-2xl font-bold text-foreground">
                {t("tech_title")}
              </h3>
            </div>
            <p className="text-foreground/70 mb-6">
              {t("tech_desc")}
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
            <h4 className="font-semibold text-foreground mb-3">{t("integrations_title")}</h4>
            <ul className="space-y-3 text-sm text-foreground/70">
              <li>{t("integration_1")}</li>
              <li>{t("integration_2")}</li>
              <li>{t("integration_3")}</li>
              <li>{t("integration_4")}</li>
            </ul>
          </div>
        </div>
      </Section>

      {/* Legal & Health Section */}
      <Section id="salud-legal" className="bg-secondary/20 relative overflow-hidden">
        <div className="flex flex-col items-center text-center mb-16 animate-fade-in-up">
          <span className="text-accent font-semibold tracking-widest uppercase mb-4 text-sm">
            {t("legal_badge")}
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground">
            {t("legal_title")}
          </h2>
          <p className="mt-4 max-w-3xl text-lg text-foreground/80">
            {t("legal_desc")}
          </p>
        </div>

        <LegalHealthPanel />
      </Section>

      {/* Assistance Centers Section */}
      <Section id="apoyo" className="bg-background">
        <div className="flex flex-col items-center text-center mb-12 animate-fade-in-up">
          <span className="text-accent font-semibold tracking-widest uppercase mb-4 text-sm">
            {t("assistance_badge")}
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground">
            {t("assistance_title")}
          </h2>
          <p className="mt-4 max-w-3xl text-lg text-foreground/80">
            {t("assistance_desc")}
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
                {t("business_badge")}
              </span>
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground leading-tight">
                {t("business_title")} <br /> {t("business_title2")}
              </h2>
            </div>

            <p className="text-lg text-foreground/80 leading-relaxed">
              {t("business_desc")}
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
                <p className="font-semibold text-foreground">{t("biz_subs_title")}</p>
              </div>
              <p className="text-sm text-foreground/70 mb-4">
                {t("biz_subs_desc")}
              </p>
              <Link
                href="/profesionales"
                className="inline-flex items-center text-primary font-bold text-sm hover:text-primary/80 transition-colors group"
              >
                {t("biz_subs_cta")} <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </Section>

      {/* Map Section */}
      <Section id="mapa-interactivo" className="bg-background relative overflow-hidden py-24">
        <div className="flex flex-col items-center text-center mb-12 animate-fade-in-up">
          <span className="text-accent font-semibold tracking-widest uppercase mb-4 text-sm">
            {t("map_badge")}
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground">
            {t("map_title")}
          </h2>
          <p className="mt-4 max-w-2xl text-lg text-foreground/80">
            {t("map_desc")}
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
                {t("leisure_badge")}
              </span>
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground leading-tight">
                {t("leisure_title")} <br /> {t("leisure_title2")}
              </h2>
            </div>

            <p className="text-lg text-foreground/80 leading-relaxed">
              {t("leisure_desc")}
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
                <p className="font-semibold text-foreground">{t("db_title")}</p>
              </div>
              <p className="text-sm text-foreground/70">
                {t("db_desc")}
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-secondary/20 p-6 shadow-lg">
              <div className="flex items-center gap-3 mb-3">
                <Calendar className="h-5 w-5 text-primary" />
                <p className="font-semibold text-foreground">{t("calendar_title")}</p>
              </div>
              <p className="text-sm text-foreground/70">
                {t("calendar_desc")}
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-secondary/20 p-6 shadow-lg">
              <div className="flex items-center gap-3 mb-3">
                <MapPin className="h-5 w-5 text-primary" />
                <p className="font-semibold text-foreground">{t("collab_map_title")}</p>
              </div>
              <p className="text-sm text-foreground/70">
                {t("collab_map_desc")}
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
              {t("content_title")}
            </h2>
            <p className="text-primary-foreground/80 text-lg">
              {t("content_desc")}
            </p>
          </div>

          <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <label htmlFor="newsletter-email" className="sr-only">
              {t("newsletter_placeholder")}
            </label>
            <input
              type="email"
              id="newsletter-email"
              placeholder={t("newsletter_placeholder")}
              className="flex-1 px-6 py-4 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-accent backdrop-blur-sm"
              required
            />
            <button
              type="submit"
              className="px-8 py-4 rounded-lg bg-accent text-white font-bold hover:bg-accent/90 transition-colors shadow-lg"
            >
              {t("newsletter_cta")}
            </button>
          </form>

          <p className="text-xs opacity-60 mt-4">
            {t("newsletter_note")}
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
            <a href="#mapa" className="hover:text-primary transition-colors">{tf("map")}</a>
            <a href="#capas" className="hover:text-primary transition-colors">{tf("layers")}</a>
            <a href="#mapa-interactivo" className="hover:text-primary transition-colors">{tf("interactive")}</a>
            <a href="#salud-legal" className="hover:text-primary transition-colors">{tf("legal")}</a>
            <a href="#negocios" className="hover:text-primary transition-colors">{tf("business")}</a>
            <a href="#apoyo" className="hover:text-primary transition-colors">{tf("support")}</a>
            <a href="#comunidad" className="hover:text-primary transition-colors">{tf("community")}</a>
          </div>

          <p className="text-sm text-foreground/40">
            {tf("copyright")}
          </p>
        </div>
      </footer>
    </main>
  );
}

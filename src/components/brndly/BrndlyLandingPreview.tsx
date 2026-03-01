// src/components/brndly/BrndlyLandingPreview.tsx
import Navbar from "./sections/Navbar";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Brands from "./sections/Brands";
import Regions from "./sections/Regions";
import Portfolio from "./sections/Portfolio";
import Pricing from "./sections/Pricing";
import Contact from "./sections/Contact";
import Footer from "./sections/Footer";

import type { BrndlyLeadPayload } from "./types";
import type { HomeConfig } from "./admin/homeConfig";
import { DEFAULT_HOME_CONFIG, mergeHomeConfig } from "./admin/homeConfig";

type HeroMetric = {
  id: string;
  label: string;
  value: string;
  note: string;
};

type BrndlyLandingPreviewProps = {
  adminHref?: string;
  onSubmitLead?: (payload: BrndlyLeadPayload) => Promise<void> | void;
  config?: HomeConfig | null;

  editable?: boolean;
  onConfigChange?: (next: HomeConfig) => void;
};

export default function BrndlyLandingPreview({
  adminHref = "/admin",
  onSubmitLead,
  config,
  editable = false,
  onConfigChange,
}: BrndlyLandingPreviewProps) {
  const cfg = mergeHomeConfig(config ?? DEFAULT_HOME_CONFIG);

  function patchHero(partial: Partial<HomeConfig["hero"]>) {
    if (!onConfigChange) return;
    onConfigChange({
      ...cfg,
      hero: { ...cfg.hero, ...partial },
    });
  }

  function reorder<T>(arr: T[], from: number, to: number): T[] {
    const next = [...arr];
    const [moved] = next.splice(from, 1);
    next.splice(to, 0, moved);
    return next;
  }

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col">
      <Navbar adminHref={adminHref} />

      <main className="flex-1">
        {cfg.sections.hero && (
          <Hero
            {...cfg.hero}
            editable={editable}
            onReorderMetrics={(from: number, to: number) => {
              const current = (cfg.hero.metrics ?? []) as HeroMetric[];
              const next = reorder<HeroMetric>(current, from, to);
              patchHero({ metrics: next as any });
            }}
            onUpdateMetric={(id: string, partial: Partial<HeroMetric>) => {
              const current = (cfg.hero.metrics ?? []) as HeroMetric[];
              const next = current.map((m) =>
                m.id === id ? { ...m, ...partial } : m
              );
              patchHero({ metrics: next as any });
            }}
            onUpdateChips={(chips: string[]) => patchHero({ chips })}
          />
        )}

        {cfg.sections.about && (
          <About
            kicker={cfg.about.kicker}
            title={cfg.about.title}
            subtitle={cfg.about.subtitle}
            bullets={cfg.about.bullets}
            cards={cfg.about.cards}
          />
        )}

        {cfg.sections.brands && (
          <Brands
            kicker={cfg.brands.kicker}
            title={cfg.brands.title}
            sideNote={cfg.brands.sideNote}
            cards={cfg.brands.cards}
          />
        )}

        {cfg.sections.regions && (
          <Regions
            kicker={cfg.regions.kicker}
            title={cfg.regions.title}
            sideNote={cfg.regions.sideNote}
            cards={cfg.regions.cards}
          />
        )}

        {cfg.sections.portfolio && (
          <Portfolio
            kicker={cfg.portfolio.kicker}
            title={cfg.portfolio.title}
            ctaText={cfg.portfolio.ctaText}
            items={cfg.portfolio.items}
          />
        )}

        {cfg.sections.pricing && <Pricing />}

        {cfg.sections.contact && (
          <Contact
            onSubmitLead={onSubmitLead}
            kicker={cfg.contact.kicker}
            title={cfg.contact.title}
            subtitle={cfg.contact.subtitle}
            note={cfg.contact.note}
            buttonText={cfg.contact.buttonText}
            regions={cfg.contact.regions as any}
            budgets={cfg.contact.budgets as any}
          />
        )}
      </main>

      <Footer />
    </div>
  );
}
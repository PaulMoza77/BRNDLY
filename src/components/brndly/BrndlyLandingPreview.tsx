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

type Props = {
  adminHref?: string;
  onSubmitLead?: (payload: BrndlyLeadPayload) => Promise<void> | void;
  config?: HomeConfig | null;
};

export default function BrndlyLandingPreview({
  adminHref = "/admin",
  onSubmitLead,
  config,
}: Props) {
  const cfg = mergeHomeConfig(config ?? DEFAULT_HOME_CONFIG);

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col">
      <Navbar adminHref={adminHref} />

      <main className="flex-1">
        {cfg.sections.hero && <Hero {...cfg.hero} />}
        {cfg.sections.about && <About />}

        {cfg.sections.brands && (
          <Brands
            kicker={cfg.brands.kicker}
            title={cfg.brands.title}
            sideNote={cfg.brands.sideNote}
            cards={cfg.brands.cards}
          />
        )}

        {cfg.sections.regions && <Regions />}

        {cfg.sections.portfolio && (
          <Portfolio
            kicker={cfg.portfolio.kicker}
            title={cfg.portfolio.title}
            ctaText={cfg.portfolio.ctaText}
            items={cfg.portfolio.items}
          />
        )}

        {cfg.sections.pricing && <Pricing />}
        {cfg.sections.contact && <Contact onSubmitLead={onSubmitLead} />}
      </main>

      <Footer />
    </div>
  );
}
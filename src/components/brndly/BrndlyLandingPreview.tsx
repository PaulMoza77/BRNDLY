
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

type Props = {
  adminHref?: string;
  onSubmitLead?: (payload: BrndlyLeadPayload) => Promise<void> | void;
};

export default function BrndlyLandingPreview({
  adminHref = "/admin",
  onSubmitLead,
}: Props) {
  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col">
      <Navbar adminHref={adminHref} />

      <main className="flex-1">
        <Hero />
        <About />
        <Brands />
        <Regions />
        <Portfolio />
        <Pricing />
        <Contact onSubmitLead={onSubmitLead} />
      </main>

      <Footer />
    </div>
  );
}
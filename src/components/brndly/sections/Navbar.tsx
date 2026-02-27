import { Link } from "react-router-dom";

type Props = {
  adminHref: string;
};

export default function Navbar({ adminHref }: Props) {
  return (
    <header className="border-b border-slate-200 sticky top-0 bg-white/80 backdrop-blur z-20">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-lg font-semibold tracking-[0.35em] uppercase">
            BRNDLY.
          </span>
        </div>

        <nav className="hidden md:flex items-center gap-8 text-sm text-slate-600">
          <a href="#about" className="hover:text-slate-900">
            About
          </a>
          <a href="#brands" className="hover:text-slate-900">
            Brands
          </a>
          <a href="#regions" className="hover:text-slate-900">
            Regions
          </a>
          <a href="#portfolio" className="hover:text-slate-900">
            Our Videos
          </a>
          <a href="#pricing" className="hover:text-slate-900">
            Pricing
          </a>
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <Link
            to={adminHref}
            className="inline-flex items-center px-4 py-2 rounded-full border border-slate-200 text-xs font-medium uppercase tracking-[0.18em] hover:bg-slate-900 hover:text-white transition"
          >
            Admin
          </Link>

          <a
            href="#contact"
            className="inline-flex items-center px-4 py-2 rounded-full border border-purple-900 text-xs font-medium uppercase tracking-[0.18em] hover:bg-purple-900 hover:text-white transition"
          >
            Price on request
          </a>
        </div>
      </div>
    </header>
  );
}
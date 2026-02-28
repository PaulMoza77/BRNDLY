// src/components/brndly/sections/Portfolio.tsx
import type { PortfolioItem } from "@/components/brndly/admin/homeConfig";

type Props = {
  kicker?: string;
  title?: string;
  ctaText?: string;
  items?: PortfolioItem[];
};

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function platformLabel(p: PortfolioItem["platform"]) {
  if (p === "reels") return "Reels";
  if (p === "tiktok") return "TikTok";
  if (p === "youtube") return "YouTube";
  return "Video";
}

export default function Portfolio({
  kicker = "Popular videos",
  title = "Snaps from recent campaigns.",
  ctaText = "Request full portfolio →",
  items = [],
}: Props) {
  function open(url: string) {
    const u = String(url || "").trim();
    if (!u) return;
    window.open(u, "_blank", "noopener,noreferrer");
  }

  return (
    <section id="portfolio" className="border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 py-12 md:py-16">
        <div className="flex items-end justify-between gap-4 mb-8">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-slate-500">
              {kicker}
            </p>
            <h2 className="text-xl md:text-2xl font-semibold">{title}</h2>
          </div>

          <button
            type="button"
            className="text-[11px] uppercase tracking-[0.22em] text-slate-500 hover:text-slate-900"
            onClick={() => open("#contact")}
          >
            {ctaText}
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-4 text-xs">
          {items.map((it, idx) => (
            <button
              key={`${it.title}-${idx}`}
              type="button"
              onClick={() => open(it.videoUrl)}
              className="text-left border border-slate-200 rounded-2xl bg-white/90 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-transform transition-shadow duration-300 p-3 flex flex-col gap-3"
            >
              <div className="relative h-40 rounded-xl overflow-hidden bg-slate-100">
                {it.thumbUrl ? (
                  <img
                    src={it.thumbUrl}
                    alt={it.title}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                ) : (
                  <div className="h-full w-full bg-purple-900/90 flex items-center justify-center text-[10px] uppercase tracking-[0.25em] text-slate-200">
                    {it.title}
                  </div>
                )}

                <div className="absolute left-3 top-3">
                  <span className="px-2 py-1 rounded-full bg-white/90 border border-slate-200 text-[10px] uppercase tracking-[0.22em] text-slate-600">
                    {platformLabel(it.platform)}
                  </span>
                </div>

                <div className="absolute right-3 bottom-3">
                  <span
                    className={cn(
                      "px-2 py-1 rounded-full text-[10px] uppercase tracking-[0.22em] border",
                      "bg-purple-900 text-white border-purple-900"
                    )}
                  >
                    Open
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-500">
                <span>
                  {platformLabel(it.platform)} • {it.viewsText}
                </span>
                <span>{it.engagementText}</span>
              </div>

              <p className="text-xs text-slate-600">{it.description}</p>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
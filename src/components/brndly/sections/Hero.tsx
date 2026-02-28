import React from "react";

type Props = {
  kicker?: string;
  titleLine1?: string;
  titleLine2?: string;
  subtitle?: string;
  ctaPrimary?: string;
  ctaSecondary?: string;

  reelVideoUrl?: string;
  reelThumbUrl?: string;
};

export default function Hero({
  kicker = "Social Media Agency. Different.",
  titleLine1 = "We don't chase views.",
  titleLine2 = "We guarantee them.",
  subtitle = "BRNDLY. is your end–to–end social media team. We plan, film and manage your content with a clear promise: a minimum of 1.5M organic views for your brand.",
  ctaPrimary = "Book a discovery call",
  ctaSecondary = "View popular videos ↓",
  reelVideoUrl = "",
  reelThumbUrl = "",
}: Props) {
  return (
    <section className="border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 py-12 md:py-20 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <p className="uppercase tracking-[0.3em] text-xs text-slate-500 mb-4">
            {kicker}
          </p>

          <h1 className="text-3xl md:text-5xl font-semibold leading-tight mb-6">
            {titleLine1}
            <br />
            <span className="underline underline-offset-8 decoration-purple-900">
              {titleLine2}
            </span>
          </h1>

          <p className="text-slate-600 text-sm md:text-base mb-6 max-w-md">
            {subtitle}
          </p>

          <div className="grid grid-cols-2 gap-3 mb-8 text-xs md:text-sm">
            <StatCard label="Guaranteed" value="1.5M+ organic views" />
            <StatCard label="Coverage" value="2 continents, 100% on-site" />
            <StatCard label="Production" value="Cinema-grade cameras & audio" />
            <StatCard label="Management" value="Dedicated social media manager" />
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <a
              href="#contact"
              className="inline-flex items-center px-6 py-3 rounded-full bg-purple-900 text-white text-xs md:text-sm font-medium uppercase tracking-[0.18em] hover:bg-purple-800 transition"
            >
              {ctaPrimary}
            </a>

            <a
              href="#portfolio"
              className="text-xs md:text-sm uppercase tracking-[0.18em] text-slate-500 hover:text-slate-900"
            >
              {ctaSecondary}
            </a>
          </div>
        </div>

        <div className="space-y-4">
          <div className="border border-slate-200 rounded-3xl bg-white/90 shadow-md hover:shadow-xl hover:-translate-y-1 transition-transform transition-shadow duration-300 p-4 md:p-5 flex flex-col gap-4">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-slate-500 mb-1">
                  Campaign snapshot
                </p>
                <p className="text-sm font-medium">
                  Launch a 90–day content sprint.
                </p>
              </div>

              <span className="px-3 py-1 rounded-full border border-slate-200 text-[10px] uppercase tracking-[0.2em] text-slate-500">
                100% Organic
              </span>
            </div>

            {/* Layout:
                - Desktop: [video] [compact stat stack]
                - Mobile: video then compact stat grid (2 cols, last full)
             */}
            <div className="grid gap-3 md:grid-cols-[1fr_190px] items-stretch">
              {/* Video */}
              <div className="rounded-2xl border border-slate-200 overflow-hidden bg-slate-950">
                <div className="w-full aspect-[9/16]">
                  {reelVideoUrl ? (
                    <video
                      src={reelVideoUrl}
                      controls
                      playsInline
                      preload="metadata"
                      poster={reelThumbUrl || undefined}
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-[10px] text-slate-200 uppercase tracking-[0.25em]">
                      Video reel preview
                    </div>
                  )}
                </div>
              </div>

              {/* Stats */}
              <div className="grid gap-2 md:grid-cols-1 grid-cols-2 auto-rows-fr">
                <CompactMetric label="Views" value="1.9M" note="avg. per campaign" />
                <CompactMetric label="Clips" value="120+" note="monthly assets" />
                <div className="col-span-2 md:col-span-1">
                  <CompactMetric label="Time" value="7d" note="average delivery" />
                </div>
              </div>
            </div>

            {/* Chips row - tighter + uniform */}
            <div className="grid grid-cols-3 gap-2 text-[10px]">
              <Chip>TikTok • 840k</Chip>
              <Chip>Reels • 420k</Chip>
              <Chip>Shorts • 260k</Chip>
            </div>
          </div>

          <p className="text-[11px] text-slate-500">
            * We guarantee a minimum of 1.5M organic views for eligible campaigns.
            Exact numbers may vary by brand and region.
          </p>
        </div>
      </div>
    </section>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="border border-slate-200 rounded-2xl bg-white/90 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-transform transition-shadow duration-300 px-4 py-3 flex flex-col gap-1">
      <span className="text-slate-500 uppercase tracking-[0.18em]">{label}</span>
      <span className="font-semibold">{value}</span>
    </div>
  );
}

function CompactMetric({
  label,
  value,
  note,
}: {
  label: string;
  value: string;
  note: string;
}) {
  return (
    <div className="h-full rounded-2xl border border-slate-200 bg-white/90 shadow-sm hover:shadow-md transition px-3 py-2.5 flex flex-col justify-between">
      <div className="flex items-center justify-between gap-2">
        <span className="text-[10px] uppercase tracking-[0.18em] text-slate-500">
          {label}
        </span>
        <span className="h-1.5 w-1.5 rounded-full bg-purple-900/70" />
      </div>

      <div className="mt-1">
        <div className="text-base md:text-lg font-semibold leading-none">
          {value}
        </div>
        <div className="text-[11px] text-slate-500 mt-1 leading-snug">
          {note}
        </div>
      </div>
    </div>
  );
}

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-9 rounded-xl border border-slate-200 flex items-center justify-center bg-white/90 shadow-sm">
      {children}
    </div>
  );
}
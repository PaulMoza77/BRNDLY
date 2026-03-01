// src/components/brndly/sections/Regions.tsx
import type { RegionCardItem } from "../admin/homeConfig";

type RegionsProps = {
  kicker?: string;
  title?: string;
  sideNote?: string;
  cards?: RegionCardItem[];
};

export default function Regions({
  kicker = "Regions",
  title = "On the ground across two continents.",
  sideNote = "Local crews, local context. We know how to film content that feels native in each city.",
  cards = [],
}: RegionsProps) {
  return (
    <section id="regions" className="border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 py-12 md:py-16">
        <div className="flex items-end justify-between gap-4 mb-8">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-slate-500">
              {kicker}
            </p>
            <h2 className="text-xl md:text-2xl font-semibold">{title}</h2>
          </div>

          <p className="hidden md:block text-xs text-slate-500 max-w-xs text-right">
            {sideNote}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-4 text-xs">
          {(cards ?? []).map((c) => (
            <RegionCard key={c.id} tag={c.tag} title={c.title} desc={c.desc} />
          ))}
        </div>
      </div>
    </section>
  );
}

function RegionCard({
  tag,
  title,
  desc,
}: {
  tag: string;
  title: string;
  desc: string;
}) {
  return (
    <div className="border border-slate-200 rounded-2xl bg-white/90 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-transform transition-shadow duration-300 p-4 flex flex-col gap-2">
      <p className="uppercase tracking-[0.25em] text-[11px] text-slate-500">
        {tag}
      </p>
      <p className="font-medium text-sm">{title}</p>
      <p className="text-slate-600 text-xs">{desc}</p>
    </div>
  );
}
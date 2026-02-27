const ITEMS = [1, 2, 3] as const;

export default function Portfolio() {
  return (
    <section id="portfolio" className="border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 py-12 md:py-16">
        <div className="flex items-end justify-between gap-4 mb-8">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-slate-500">
              Popular videos
            </p>
            <h2 className="text-xl md:text-2xl font-semibold">
              Snaps from recent campaigns.
            </h2>
          </div>

          <button className="text-[11px] uppercase tracking-[0.22em] text-slate-500 hover:text-slate-900">
            Request full portfolio →
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-4 text-xs">
          {ITEMS.map((item) => (
            <div
              key={item}
              className="border border-slate-200 rounded-2xl bg-white/90 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-transform transition-shadow duration-300 p-3 flex flex-col gap-3"
            >
              <div className="h-40 rounded-xl bg-purple-900/90 flex items-center justify-center text-[10px] uppercase tracking-[0.25em] text-slate-200">
                Video case study {item}
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-500">
                <span>Reels • 730k views</span>
                <span>Saved 12k • Sent 4k</span>
              </div>

              <p className="text-xs text-slate-600">
                Product–led storytelling for a lifestyle brand. Shot in 1 day, edited in 72
                hours.
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
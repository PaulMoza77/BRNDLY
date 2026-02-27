
export default function Brands() {
  return (
    <section id="brands" className="border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 py-12 md:py-16">
        <div className="flex items-end justify-between gap-4 mb-8">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-slate-500">
              Brands
            </p>
            <h2 className="text-xl md:text-2xl font-semibold">
              Trusted by category leaders & bold newcomers.
            </h2>
          </div>

          <p className="hidden md:block text-xs text-slate-500 max-w-xs text-right">
            From hospitality and real estate to tech, medical and personal brands — BRNDLY.
            adapts the content to your world.
          </p>
        </div>

        <div className="grid sm:grid-cols-3 gap-4 text-xs">
          <BrandCard
            tag="Hospitality"
            title="Hotels, restaurants & nightlife concepts"
            note="High–impact visuals, full venues and booked–out weekends."
          />
          <BrandCard
            tag="Real Estate"
            title="Developers, brokers & luxury rentals"
            note="Story–driven tours that sell lifestyle, not only square meters."
          />
          <BrandCard
            tag="Personal Brands"
            title="Founders, doctors, coaches & artists"
            note="You speak. We package the message in clips people save and share."
          />
        </div>
      </div>
    </section>
  );
}

function BrandCard(props: { tag: string; title: string; note: string }) {
  const { tag, title, note } = props;

  return (
    <div className="border border-slate-200 rounded-2xl bg-white/90 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-transform transition-shadow duration-300 p-4 flex flex-col justify-between min-h-[120px]">
      <div>
        <p className="uppercase tracking-[0.25em] text-[11px] text-slate-500 mb-1">
          {tag}
        </p>
        <p className="font-medium text-sm">{title}</p>
      </div>

      <p className="text-[11px] text-slate-500 mt-3">{note}</p>
    </div>
  );
}
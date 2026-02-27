
export default function Pricing() {
  return (
    <section id="pricing" className="border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 py-12 md:py-16 grid md:grid-cols-2 gap-10 items-start">
        <div className="space-y-4">
          <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Pricing</p>

          <h2 className="text-xl md:text-2xl font-semibold">
            Built around your brand, not a template.
          </h2>

          <p className="text-sm text-slate-600">
            Every brand has a different starting point, locations and ambitions. That&apos;s why
            BRNDLY. works on custom retainers instead of &quot;packages per post&quot;.
          </p>

          <ul className="text-sm text-slate-600 space-y-2">
            <li>• Monthly retainers including strategy, production & social media management.</li>
            <li>• Campaign–based sprints for product launches and events.</li>
            <li>• Add–ons for extra shoot days, locations or platforms.</li>
          </ul>
        </div>

        <div className="border border-slate-200 rounded-3xl bg-white/90 shadow-md hover:shadow-xl hover:-translate-y-1 transition-transform transition-shadow duration-300 p-6 flex flex-col gap-4 text-sm">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-slate-500 mb-1">
                Price on request
              </p>
              <p className="font-medium">Tell us where you are and where you want to go.</p>
            </div>

            <span className="px-3 py-1 rounded-full border border-purple-900 text-[10px] uppercase tracking-[0.22em]">
              Limited slots
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <InfoCard
              label="Ideal for"
              title="Brands ready to scale"
              note="You already sell. We help you be seen."
            />
            <InfoCard
              label="Commitment"
              title="3–6 months"
              note="Enough time to build real momentum."
            />
          </div>

          <a
            href="#contact"
            className="mt-2 inline-flex items-center justify-center px-6 py-3 rounded-full bg-purple-900 text-white text-xs font-medium uppercase tracking-[0.2em] hover:bg-purple-800 transition"
          >
            Request a custom proposal
          </a>
        </div>
      </div>
    </section>
  );
}

function InfoCard(props: { label: string; title: string; note: string }) {
  const { label, title, note } = props;

  return (
    <div className="border border-slate-200 rounded-2xl bg-white/90 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-transform transition-shadow duration-300 p-3 flex flex-col gap-1">
      <span className="text-slate-500 uppercase tracking-[0.18em] text-[10px]">{label}</span>
      <span className="font-medium">{title}</span>
      <span className="text-[11px] text-slate-500">{note}</span>
    </div>
  );
}

export default function About() {
  return (
    <section id="about" className="border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 py-12 md:py-16 grid md:grid-cols-[1.1fr,1.3fr] gap-10 items-start">
        <div className="space-y-4">
          <p className="text-xs uppercase tracking-[0.3em] text-slate-500">
            What we actually do
          </p>

          <h2 className="text-xl md:text-2xl font-semibold">
            We build brands, not just posts.
          </h2>

          <p className="text-sm text-slate-600">
            BRNDLY. covers the full journey: strategy, scripting, on-site production,
            editing, publishing and day–to–day social media management. No templates,
            no stock footage – just original content that looks and feels like your brand.
          </p>

          <ul className="text-sm text-slate-600 space-y-2">
            <li>• Brand & content strategy tailored to your voice and audience.</li>
            <li>• On-location filming with professional cameras, lenses and audio.</li>
            <li>• Editing for all major platforms: TikTok, Reels, Shorts, YouTube.</li>
            <li>• Dedicated social media manager and monthly performance reviews.</li>
          </ul>
        </div>

        <div className="grid sm:grid-cols-2 gap-4 text-xs">
          <StepCard
            k="01 • Strategy"
            title="Creative direction & brand positioning"
            desc="Deep dive workshop, content pillars and storyline design for the next 90 days."
          />
          <StepCard
            k="02 • Production"
            title="Professional shoot days"
            desc="Full crew on site: director, camera operator, audio, lights – anywhere we operate."
          />
          <StepCard
            k="03 • Management"
            title="Daily posting & community"
            desc="Calendar, captions, posting times and comment moderation handled for you."
          />
          <StepCard
            k="04 • Brand"
            title="Long–term brand building"
            desc="We focus on awareness, trust and storytelling – the metrics that outlive any trend."
          />
        </div>
      </div>
    </section>
  );
}

function StepCard({ k, title, desc }: { k: string; title: string; desc: string }) {
  return (
    <div className="border border-slate-200 rounded-2xl bg-white/90 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-transform transition-shadow duration-300 p-4 flex flex-col gap-2">
      <span className="uppercase tracking-[0.25em] text-[11px] text-slate-500">{k}</span>
      <p className="font-medium text-sm">{title}</p>
      <p className="text-slate-600 text-xs">{desc}</p>
    </div>
  );
}
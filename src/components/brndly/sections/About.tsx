// src/components/brndly/sections/About.tsx

type AboutCard = {
  id: string;
  overline: string;
  title: string;
  description: string;
};

type Props = {
  kicker?: string;
  title?: string;
  subtitle?: string;
  bullets?: string[];
  cards?: AboutCard[];
};

export default function About({
  kicker = "What we actually do",
  title = "We build brands, not just posts.",
  subtitle =
    "BRNDLY. covers the full journey: strategy, scripting, on-site production, editing, publishing and day–to–day social media management. No templates, no stock footage — just original content that looks and feels like your brand.",
  bullets = [],
  cards = [],
}: Props) {
  return (
    <section id="about" className="border-b border-slate-200">
      <div className="mx-auto max-w-6xl px-4 py-12 md:py-20">
        <p className="mb-4 text-xs uppercase tracking-[0.3em] text-slate-500">
          {kicker}
        </p>

        <div className="grid items-start gap-10 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <h2 className="mb-4 text-2xl font-semibold leading-tight md:text-3xl">
              {title}
            </h2>

            <p className="mb-5 text-sm leading-relaxed text-slate-600 md:text-base">
              {subtitle}
            </p>

            {bullets.length > 0 && (
              <ul className="space-y-2 text-sm text-slate-700">
                {bullets.map((b, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-purple-900/70" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {cards.map((c) => (
              <AboutCardUI
                key={c.id}
                overline={c.overline}
                title={c.title}
                description={c.description}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function AboutCardUI(props: {
  overline: string;
  title: string;
  description: string;
}) {
  const { overline, title, description } = props;

  return (
    <div className="rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <div className="mb-2 text-[10px] uppercase tracking-[0.25em] text-slate-500">
        {overline}
      </div>
      <div className="mb-2 text-sm font-semibold">{title}</div>
      <div className="text-sm leading-relaxed text-slate-600">
        {description}
      </div>
    </div>
  );
}
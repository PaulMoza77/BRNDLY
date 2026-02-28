import React from "react";
import { useHomeConfig } from "./useHomeConfig";
import type { HomeSectionKey, HomeConfig } from "./homeConfig";
import BrndlyLandingPreview from "@/components/brndly/BrndlyLandingPreview";

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

const SECTION_LABELS: Record<HomeSectionKey, string> = {
  hero: "Hero",
  about: "About",
  brands: "Brands",
  regions: "Regions",
  portfolio: "Our Videos",
  pricing: "Pricing",
  contact: "Contact",
};

export default function HomeEdit() {
  const { config, setConfig, reset, save, saving, savedTick, error, loading } =
    useHomeConfig();

  function setSectionEnabled(key: HomeSectionKey, enabled: boolean) {
    setConfig({
      ...config,
      sections: { ...config.sections, [key]: enabled },
    });
  }

  function setHero(partial: Partial<HomeConfig["hero"]>) {
    setConfig({
      ...config,
      hero: { ...config.hero, ...partial },
    });
  }

  async function handleSave() {
    await save();
  }

  return (
    <div className="grid gap-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-semibold">Home Edit</h1>
          <p className="text-sm text-slate-600">
            Aici editezi Home + vezi preview live (dublură). Save scrie în DB.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={reset}
            className="h-10 px-4 rounded-full border border-slate-200 bg-white text-xs uppercase tracking-[0.18em] hover:bg-slate-50"
            type="button"
            disabled={loading || saving}
          >
            Reset
          </button>

          <button
            onClick={handleSave}
            className="h-10 px-4 rounded-full bg-purple-900 text-white text-xs uppercase tracking-[0.18em] hover:bg-purple-800 disabled:opacity-60"
            type="button"
            disabled={loading || saving}
          >
            {saving ? "Saving..." : "Save"}
          </button>
        </div>
      </div>

      {error && (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-800">
          ❌ {error}
        </div>
      )}

      {savedTick > 0 && !error && (
        <div className="rounded-2xl border border-slate-200 bg-white p-4 text-sm text-slate-700">
          ✅ Saved. (DB updated)
        </div>
      )}

      {/* EDITOR + LIVE PREVIEW */}
      <div className="grid lg:grid-cols-[520px_1fr] gap-6 items-start">
        {/* LEFT: EDITOR */}
        <div className="grid gap-6">
          <Card
            title="Show / Hide sections"
            subtitle="Activează sau dezactivează secțiuni din Home."
          >
            <div className="grid gap-3">
              {(Object.keys(SECTION_LABELS) as HomeSectionKey[]).map((key) => (
                <ToggleRow
                  key={key}
                  label={SECTION_LABELS[key]}
                  checked={!!config.sections[key]}
                  onChange={(v) => setSectionEnabled(key, v)}
                />
              ))}
            </div>
          </Card>

          <Card title="Hero content" subtitle="Editează textele din partea de sus (Hero).">
            <div className="grid gap-3">
              <Field label="Kicker">
                <input
                  value={config.hero.kicker}
                  onChange={(e) => setHero({ kicker: e.target.value })}
                  className="h-10 w-full rounded-xl border border-slate-200 px-3 text-sm focus:outline-none focus:ring-1 focus:ring-slate-900 bg-white"
                />
              </Field>

              <div className="grid sm:grid-cols-2 gap-3">
                <Field label="Title line 1">
                  <input
                    value={config.hero.titleLine1}
                    onChange={(e) => setHero({ titleLine1: e.target.value })}
                    className="h-10 w-full rounded-xl border border-slate-200 px-3 text-sm focus:outline-none focus:ring-1 focus:ring-slate-900 bg-white"
                  />
                </Field>

                <Field label="Title line 2">
                  <input
                    value={config.hero.titleLine2}
                    onChange={(e) => setHero({ titleLine2: e.target.value })}
                    className="h-10 w-full rounded-xl border border-slate-200 px-3 text-sm focus:outline-none focus:ring-1 focus:ring-slate-900 bg-white"
                  />
                </Field>
              </div>

              <Field label="Subtitle">
                <textarea
                  value={config.hero.subtitle}
                  onChange={(e) => setHero({ subtitle: e.target.value })}
                  className="min-h-[120px] w-full rounded-xl border border-slate-200 px-3 py-2 text-sm resize-none focus:outline-none focus:ring-1 focus:ring-slate-900 bg-white"
                />
              </Field>

              <div className="grid sm:grid-cols-2 gap-3">
                <Field label="Primary CTA text">
                  <input
                    value={config.hero.ctaPrimary}
                    onChange={(e) => setHero({ ctaPrimary: e.target.value })}
                    className="h-10 w-full rounded-xl border border-slate-200 px-3 text-sm focus:outline-none focus:ring-1 focus:ring-slate-900 bg-white"
                  />
                </Field>

                <Field label="Secondary CTA text">
                  <input
                    value={config.hero.ctaSecondary}
                    onChange={(e) => setHero({ ctaSecondary: e.target.value })}
                    className="h-10 w-full rounded-xl border border-slate-200 px-3 text-sm focus:outline-none focus:ring-1 focus:ring-slate-900 bg-white"
                  />
                </Field>
              </div>
            </div>
          </Card>
        </div>

        {/* RIGHT: LIVE PREVIEW (DUBLURA HOME) */}
        <div className="rounded-3xl border border-slate-200 bg-white shadow-sm overflow-hidden">
          <div className="px-4 py-3 border-b border-slate-200 flex items-center justify-between">
            <div className="text-sm font-semibold">Live Preview</div>
            <div className="text-xs text-slate-500">Se schimbă instant, fără Save</div>
          </div>

          <div className="h-[calc(100vh-220px)] overflow-auto bg-slate-50">
            {/* SCALE wrapper ca să încapă frumos */}
            <div className="p-4">
              <div
                style={{
                  transform: "scale(0.9)",
                  transformOrigin: "top left",
                  width: "111.111%", // 1/0.9 ca să nu fie tăiat
                }}
                className="rounded-2xl overflow-hidden bg-white shadow"
              >
                <BrndlyLandingPreview config={config} adminHref="/admin/home" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Card(props: { title: string; subtitle?: string; children: React.ReactNode }) {
  const { title, subtitle, children } = props;
  return (
    <div className="rounded-3xl border border-slate-200 bg-white shadow-sm p-5">
      <div className="mb-4">
        <div className="text-sm font-semibold">{title}</div>
        {subtitle && <div className="text-xs text-slate-500 mt-1">{subtitle}</div>}
      </div>
      {children}
    </div>
  );
}

function Field(props: { label: string; children: React.ReactNode }) {
  const { label, children } = props;
  return (
    <div className="grid gap-1">
      <div className="text-[10px] uppercase tracking-[0.2em] text-slate-500">{label}</div>
      {children}
    </div>
  );
}

function ToggleRow(props: {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  const { label, checked, onChange } = props;
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={cn(
        "w-full flex items-center justify-between rounded-2xl border px-4 py-3 text-left transition",
        checked ? "border-purple-900 bg-purple-50" : "border-slate-200 bg-white hover:bg-slate-50"
      )}
    >
      <div className="text-sm">{label}</div>
      <span
        className={cn(
          "h-6 w-11 rounded-full border flex items-center px-1",
          checked ? "border-purple-900 bg-purple-900 justify-end" : "border-slate-300 bg-slate-100 justify-start"
        )}
      >
        <span className="h-4 w-4 rounded-full bg-white" />
      </span>
    </button>
  );
}
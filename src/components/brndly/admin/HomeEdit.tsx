// src/components/brndly/admin/HomeEdit.tsx
import React from "react";
import { useHomeConfig } from "./useHomeConfig";
import type { HomeSectionKey, HomeConfig, BrandCardItem, PortfolioItem, PortfolioPlatform } from "./homeConfig";
import BrndlyLandingPreview from "@/components/brndly/BrndlyLandingPreview";
import { Plus, Trash2, ChevronDown } from "lucide-react";

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

function Panel(props: {
  title: string;
  subtitle?: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}) {
  const { title, subtitle, defaultOpen = false, children } = props;
  const [open, setOpen] = React.useState(defaultOpen);

  return (
    <div className="rounded-3xl border border-slate-200 bg-white shadow-sm overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full px-5 py-4 flex items-center justify-between text-left hover:bg-slate-50"
      >
        <div>
          <div className="text-sm font-semibold">{title}</div>
          {subtitle && <div className="text-xs text-slate-500 mt-1">{subtitle}</div>}
        </div>
        <ChevronDown className={cn("h-4 w-4 text-slate-500 transition-transform", open && "rotate-180")} />
      </button>

      {open && <div className="p-5 border-t border-slate-200">{children}</div>}
    </div>
  );
}

function Field(props: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid gap-1">
      <div className="text-[10px] uppercase tracking-[0.2em] text-slate-500">{props.label}</div>
      {props.children}
    </div>
  );
}

function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={cn(
        "h-10 w-full rounded-xl border border-slate-200 px-3 text-sm focus:outline-none focus:ring-1 focus:ring-slate-900 bg-white",
        props.className
      )}
    />
  );
}

function Textarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      className={cn(
        "min-h-[110px] w-full rounded-xl border border-slate-200 px-3 py-2 text-sm resize-none focus:outline-none focus:ring-1 focus:ring-slate-900 bg-white",
        props.className
      )}
    />
  );
}

function ToggleRow(props: { label: string; checked: boolean; onChange: (v: boolean) => void }) {
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

export default function HomeEdit() {
  const { config, setConfig, reset, save, saving, savedTick, error, loading } = useHomeConfig();

  function setSectionEnabled(key: HomeSectionKey, enabled: boolean) {
    setConfig({ ...config, sections: { ...config.sections, [key]: enabled } });
  }

  function setHero(partial: Partial<HomeConfig["hero"]>) {
    setConfig({ ...config, hero: { ...config.hero, ...partial } });
  }

  function setBrands(partial: Partial<HomeConfig["brands"]>) {
    setConfig({ ...config, brands: { ...config.brands, ...partial } });
  }

  function updateBrandCard(index: number, partial: Partial<BrandCardItem>) {
    const next = config.brands.cards.map((c, i) => (i === index ? { ...c, ...partial } : c));
    setBrands({ cards: next });
  }

  function addBrandCard() {
    const next: BrandCardItem[] = [
      ...config.brands.cards,
      { tag: "New", title: "New card title", note: "Short note..." },
    ];
    setBrands({ cards: next });
  }

  function removeBrandCard(index: number) {
    const next = config.brands.cards.filter((_, i) => i !== index);
    setBrands({ cards: next });
  }

  function setPortfolio(partial: Partial<HomeConfig["portfolio"]>) {
    setConfig({ ...config, portfolio: { ...config.portfolio, ...partial } });
  }

  function updatePortfolioItem(index: number, partial: Partial<PortfolioItem>) {
    const next = config.portfolio.items.map((it, i) => (i === index ? { ...it, ...partial } : it));
    setPortfolio({ items: next });
  }

  function addPortfolioItem() {
    const next: PortfolioItem[] = [
      ...config.portfolio.items,
      {
        title: "New video",
        platform: "reels",
        viewsText: "0 views",
        engagementText: "Saved 0 • Sent 0",
        description: "Short description...",
        thumbUrl: "https://placehold.co/900x600?text=Thumb",
        videoUrl: "https://example.com",
      },
    ];
    setPortfolio({ items: next });
  }

  function removePortfolioItem(index: number) {
    const next = config.portfolio.items.filter((_, i) => i !== index);
    setPortfolio({ items: next });
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
            Editezi conținutul (texte/imagini/video linkuri) + vezi preview live. Save scrie în DB.
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

      <div className="grid lg:grid-cols-[560px_1fr] gap-6 items-start">
        {/* LEFT: EDITOR */}
        <div className="grid gap-6">
          <Panel title="Show / Hide sections" subtitle="Activează/dezactivează secțiuni." defaultOpen>
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
          </Panel>

          <Panel title="Hero" subtitle="Editează textele din Hero." defaultOpen>
            <div className="grid gap-3">
              <Field label="Kicker">
                <Input value={config.hero.kicker} onChange={(e) => setHero({ kicker: e.target.value })} />
              </Field>

              <div className="grid sm:grid-cols-2 gap-3">
                <Field label="Title line 1">
                  <Input
                    value={config.hero.titleLine1}
                    onChange={(e) => setHero({ titleLine1: e.target.value })}
                  />
                </Field>
                <Field label="Title line 2">
                  <Input
                    value={config.hero.titleLine2}
                    onChange={(e) => setHero({ titleLine2: e.target.value })}
                  />
                </Field>
              </div>

              <Field label="Subtitle">
                <Textarea
                  value={config.hero.subtitle}
                  onChange={(e) => setHero({ subtitle: e.target.value })}
                />
              </Field>

              <div className="grid sm:grid-cols-2 gap-3">
                <Field label="Primary CTA">
                  <Input
                    value={config.hero.ctaPrimary}
                    onChange={(e) => setHero({ ctaPrimary: e.target.value })}
                  />
                </Field>
                <Field label="Secondary CTA">
                  <Input
                    value={config.hero.ctaSecondary}
                    onChange={(e) => setHero({ ctaSecondary: e.target.value })}
                  />
                </Field>
              </div>
            </div>
          </Panel>

          <Panel title="Brands" subtitle="Editează heading + carduri (tag/title/note).">
            <div className="grid gap-3">
              <div className="grid sm:grid-cols-2 gap-3">
                <Field label="Kicker">
                  <Input value={config.brands.kicker} onChange={(e) => setBrands({ kicker: e.target.value })} />
                </Field>
                <Field label="Title">
                  <Input value={config.brands.title} onChange={(e) => setBrands({ title: e.target.value })} />
                </Field>
              </div>

              <Field label="Side note (right text)">
                <Textarea value={config.brands.sideNote} onChange={(e) => setBrands({ sideNote: e.target.value })} />
              </Field>

              <div className="flex items-center justify-between">
                <div className="text-sm font-semibold">Cards</div>
                <button
                  type="button"
                  onClick={addBrandCard}
                  className="h-9 px-3 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs flex items-center gap-2"
                >
                  <Plus className="h-4 w-4" /> Add card
                </button>
              </div>

              <div className="grid gap-3">
                {config.brands.cards.map((c, idx) => (
                  <div key={idx} className="rounded-2xl border border-slate-200 p-4 grid gap-3">
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-medium">Card #{idx + 1}</div>
                      <button
                        type="button"
                        onClick={() => removeBrandCard(idx)}
                        className="h-9 px-3 rounded-xl border border-red-200 bg-red-50 text-red-700 hover:bg-red-100 text-xs flex items-center gap-2"
                      >
                        <Trash2 className="h-4 w-4" /> Remove
                      </button>
                    </div>

                    <div className="grid sm:grid-cols-3 gap-3">
                      <Field label="Tag">
                        <Input value={c.tag} onChange={(e) => updateBrandCard(idx, { tag: e.target.value })} />
                      </Field>
                      <Field label="Title">
                        <Input value={c.title} onChange={(e) => updateBrandCard(idx, { title: e.target.value })} />
                      </Field>
                      <Field label="Note">
                        <Input value={c.note} onChange={(e) => updateBrandCard(idx, { note: e.target.value })} />
                      </Field>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Panel>

          <Panel title="Portfolio" subtitle="Editează heading + lista de videos (thumb + link + texte).">
            <div className="grid gap-3">
              <div className="grid sm:grid-cols-2 gap-3">
                <Field label="Kicker">
                  <Input
                    value={config.portfolio.kicker}
                    onChange={(e) => setPortfolio({ kicker: e.target.value })}
                  />
                </Field>
                <Field label="Title">
                  <Input
                    value={config.portfolio.title}
                    onChange={(e) => setPortfolio({ title: e.target.value })}
                  />
                </Field>
              </div>

              <Field label="CTA text (button)">
                <Input
                  value={config.portfolio.ctaText}
                  onChange={(e) => setPortfolio({ ctaText: e.target.value })}
                />
              </Field>

              <div className="flex items-center justify-between">
                <div className="text-sm font-semibold">Videos</div>
                <button
                  type="button"
                  onClick={addPortfolioItem}
                  className="h-9 px-3 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs flex items-center gap-2"
                >
                  <Plus className="h-4 w-4" /> Add video
                </button>
              </div>

              <div className="grid gap-3">
                {config.portfolio.items.map((it, idx) => (
                  <div key={idx} className="rounded-2xl border border-slate-200 p-4 grid gap-3">
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-medium">Video #{idx + 1}</div>
                      <button
                        type="button"
                        onClick={() => removePortfolioItem(idx)}
                        className="h-9 px-3 rounded-xl border border-red-200 bg-red-50 text-red-700 hover:bg-red-100 text-xs flex items-center gap-2"
                      >
                        <Trash2 className="h-4 w-4" /> Remove
                      </button>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-3">
                      <Field label="Title">
                        <Input value={it.title} onChange={(e) => updatePortfolioItem(idx, { title: e.target.value })} />
                      </Field>

                      <Field label="Platform">
                        <select
                          value={it.platform}
                          onChange={(e) =>
                            updatePortfolioItem(idx, {
                              platform: e.target.value as PortfolioPlatform,
                            })
                          }
                          className="h-10 w-full rounded-xl border border-slate-200 px-3 text-sm bg-white"
                        >
                          <option value="reels">reels</option>
                          <option value="tiktok">tiktok</option>
                          <option value="youtube">youtube</option>
                          <option value="other">other</option>
                        </select>
                      </Field>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-3">
                      <Field label="Thumb URL (image)">
                        <Input
                          value={it.thumbUrl}
                          onChange={(e) => updatePortfolioItem(idx, { thumbUrl: e.target.value })}
                        />
                      </Field>

                      <Field label="Video URL (opens on click)">
                        <Input
                          value={it.videoUrl}
                          onChange={(e) => updatePortfolioItem(idx, { videoUrl: e.target.value })}
                        />
                      </Field>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-3">
                      <Field label="Views text">
                        <Input
                          value={it.viewsText}
                          onChange={(e) => updatePortfolioItem(idx, { viewsText: e.target.value })}
                        />
                      </Field>
                      <Field label="Engagement text">
                        <Input
                          value={it.engagementText}
                          onChange={(e) =>
                            updatePortfolioItem(idx, { engagementText: e.target.value })
                          }
                        />
                      </Field>
                    </div>

                    <Field label="Description">
                      <Textarea
                        value={it.description}
                        onChange={(e) => updatePortfolioItem(idx, { description: e.target.value })}
                      />
                    </Field>
                  </div>
                ))}
              </div>
            </div>
          </Panel>
        </div>

        {/* RIGHT: LIVE PREVIEW */}
        <div className="rounded-3xl border border-slate-200 bg-white shadow-sm overflow-hidden">
          <div className="px-4 py-3 border-b border-slate-200 flex items-center justify-between">
            <div className="text-sm font-semibold">Live Preview</div>
            <div className="text-xs text-slate-500">Se schimbă instant, fără Save</div>
          </div>

          <div className="h-[calc(100vh-220px)] overflow-auto bg-slate-50">
            <div className="p-4">
              <div
                style={{
                  transform: "scale(0.9)",
                  transformOrigin: "top left",
                  width: "111.111%",
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
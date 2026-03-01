// src/components/brndly/admin/HomeEdit.tsx
import React from "react";
import { supabase } from "@/lib/supabase";
import BrndlyLandingPreview from "@/components/brndly/BrndlyLandingPreview";
import { ChevronDown, Plus, Trash2 } from "lucide-react";

import { useHomeConfig } from "./useHomeConfig";
import type {
  AboutCard,
  BrandCardItem,
  HomeConfig,
  HomeSectionKey,
  PortfolioItem,
  PortfolioPlatform,
  RegionCardItem,
} from "./homeConfig";

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
  id: string;
  title: string;
  subtitle?: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}) {
  const { id, title, subtitle, defaultOpen = false, children } = props;
  const STORAGE_KEY = `brndly_homeedit_panel_open_${id}`;

  const [open, setOpen] = React.useState<boolean>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw === "1") return true;
      if (raw === "0") return false;
      return defaultOpen;
    } catch {
      return defaultOpen;
    }
  });

  React.useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, open ? "1" : "0");
    } catch {
      // ignore
    }
  }, [open, STORAGE_KEY]);

  return (
    <div className="rounded-3xl border border-slate-200 bg-white shadow-sm overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full px-5 py-4 flex items-center justify-between text-left hover:bg-slate-50"
      >
        <div>
          <div className="text-sm font-semibold">{title}</div>
          {subtitle ? (
            <div className="text-xs text-slate-500 mt-1">{subtitle}</div>
          ) : null}
        </div>

        <ChevronDown
          className={cn(
            "h-4 w-4 text-slate-500 transition-transform",
            open && "rotate-180"
          )}
        />
      </button>

      {open ? (
        <div className="p-5 border-t border-slate-200">{children}</div>
      ) : null}
    </div>
  );
}

function Field(props: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid gap-1">
      <div className="text-[10px] uppercase tracking-[0.2em] text-slate-500">
        {props.label}
      </div>
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
        checked
          ? "border-purple-900 bg-purple-50"
          : "border-slate-200 bg-white hover:bg-slate-50"
      )}
    >
      <div className="text-sm">{label}</div>

      <span
        className={cn(
          "h-6 w-11 rounded-full border flex items-center px-1",
          checked
            ? "border-purple-900 bg-purple-900 justify-end"
            : "border-slate-300 bg-slate-100 justify-start"
        )}
      >
        <span className="h-4 w-4 rounded-full bg-white" />
      </span>
    </button>
  );
}

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
    setConfig({ ...config, hero: { ...config.hero, ...partial } });
  }

  function setAbout(partial: Partial<HomeConfig["about"]>) {
    setConfig({ ...config, about: { ...config.about, ...partial } });
  }

  function updateAboutBullet(index: number, value: string) {
    const next = (config.about.bullets ?? []).map((b, i) =>
      i === index ? value : b
    );
    setAbout({ bullets: next });
  }

  function addAboutBullet() {
    setAbout({ bullets: [...(config.about.bullets ?? []), "New bullet..."] });
  }

  function removeAboutBullet(index: number) {
    setAbout({
      bullets: (config.about.bullets ?? []).filter((_, i) => i !== index),
    });
  }

  function updateAboutCard(index: number, partial: Partial<AboutCard>) {
    const next = (config.about.cards ?? []).map((c, i) =>
      i === index ? { ...c, ...partial } : c
    );
    setAbout({ cards: next });
  }

  function setBrands(partial: Partial<HomeConfig["brands"]>) {
    setConfig({ ...config, brands: { ...config.brands, ...partial } });
  }

  function updateBrandCard(index: number, partial: Partial<BrandCardItem>) {
    const next = (config.brands.cards ?? []).map((c, i) =>
      i === index ? { ...c, ...partial } : c
    );
    setBrands({ cards: next });
  }

  function addBrandCard() {
    const next: BrandCardItem[] = [
      ...(config.brands.cards ?? []),
      { tag: "New", title: "New card title", note: "Short note..." },
    ];
    setBrands({ cards: next });
  }

  function removeBrandCard(index: number) {
    setBrands({
      cards: (config.brands.cards ?? []).filter((_, i) => i !== index),
    });
  }

  function setRegions(partial: Partial<HomeConfig["regions"]>) {
    setConfig({ ...config, regions: { ...config.regions, ...partial } });
  }

  function updateRegionCard(index: number, partial: Partial<RegionCardItem>) {
    const next = (config.regions.cards ?? []).map((c, i) =>
      i === index ? { ...c, ...partial } : c
    );
    setRegions({ cards: next });
  }

  function addRegionCard() {
    const next: RegionCardItem[] = [
      ...(config.regions.cards ?? []),
      {
        id: `region_${Date.now()}`,
        tag: "New region",
        title: "New title",
        desc: "Short description...",
      },
    ];
    setRegions({ cards: next });
  }

  function removeRegionCard(index: number) {
    setRegions({
      cards: (config.regions.cards ?? []).filter((_, i) => i !== index),
    });
  }

  function setPortfolio(partial: Partial<HomeConfig["portfolio"]>) {
    setConfig({ ...config, portfolio: { ...config.portfolio, ...partial } });
  }

  function updatePortfolioItem(index: number, partial: Partial<PortfolioItem>) {
    const next = (config.portfolio.items ?? []).map((it, i) =>
      i === index ? { ...it, ...partial } : it
    );
    setPortfolio({ items: next });
  }

  function addPortfolioItem() {
    const next: PortfolioItem[] = [
      ...(config.portfolio.items ?? []),
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
    setPortfolio({
      items: (config.portfolio.items ?? []).filter((_, i) => i !== index),
    });
  }

  function setContact(partial: Partial<HomeConfig["contact"]>) {
    setConfig({ ...config, contact: { ...config.contact, ...partial } });
  }

  function updateContactRegion(index: number, value: string) {
    const next = (config.contact.regions ?? []).map((x, i) =>
      i === index ? value : x
    );
    setContact({ regions: next });
  }

  function addContactRegion() {
    setContact({ regions: [...(config.contact.regions ?? []), "New / region"] });
  }

  function removeContactRegion(index: number) {
    setContact({
      regions: (config.contact.regions ?? []).filter((_, i) => i !== index),
    });
  }

  function updateContactBudget(index: number, value: string) {
    const next = (config.contact.budgets ?? []).map((x, i) =>
      i === index ? value : x
    );
    setContact({ budgets: next });
  }

  function addContactBudget() {
    setContact({ budgets: [...(config.contact.budgets ?? []), "New budget"] });
  }

  function removeContactBudget(index: number) {
    setContact({
      budgets: (config.contact.budgets ?? []).filter((_, i) => i !== index),
    });
  }

  async function uploadHeroReelVideo(file: File) {
    const ext = file.name.split(".").pop()?.toLowerCase() || "mp4";
    const safeExt = ext.replace(/[^a-z0-9]/g, "") || "mp4";
    const path = `home/hero/reel-${Date.now()}.${safeExt}`;

    const { error: upErr } = await supabase.storage
      .from("brndly")
      .upload(path, file, { upsert: true, contentType: file.type });

    if (upErr) throw upErr;

    const { data } = supabase.storage.from("brndly").getPublicUrl(path);
    return data.publicUrl;
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
            Editezi conținutul (texte/imagini/video linkuri) + vezi preview live.
            Save scrie în DB.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={reset}
            disabled={loading || saving}
            className="h-10 px-4 rounded-full border border-slate-200 bg-white text-xs uppercase tracking-[0.18em] hover:bg-slate-50 disabled:opacity-60"
          >
            Reset
          </button>

          <button
            type="button"
            onClick={handleSave}
            disabled={loading || saving}
            className="h-10 px-4 rounded-full bg-purple-900 text-white text-xs uppercase tracking-[0.18em] hover:bg-purple-800 disabled:opacity-60"
          >
            {saving ? "Saving..." : "Save"}
          </button>
        </div>
      </div>

      {error ? (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-800">
          ❌ {error}
        </div>
      ) : null}

      {savedTick > 0 && !error ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-4 text-sm text-slate-700">
          ✅ Saved. (DB updated)
        </div>
      ) : null}

      <div className="grid lg:grid-cols-[560px_1fr] gap-6 items-start">
        {/* LEFT: EDITOR */}
        <div className="grid gap-6">
          <Panel
            id="sections"
            title="Show / Hide sections"
            subtitle="Activează/dezactivează secțiuni."
            defaultOpen
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
          </Panel>

          <Panel
            id="hero"
            title="Hero"
            subtitle="Editează textele + video + metrics/chips din Hero."
            defaultOpen
          >
            <div className="grid gap-3">
              <Field label="Kicker">
                <Input
                  value={config.hero.kicker}
                  onChange={(e) => setHero({ kicker: e.target.value })}
                />
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

              <Field label="Hero reel video (upload from PC)">
                <div className="grid gap-2">
                  <div className="flex items-center gap-3">
                    <input
                      type="file"
                      accept="video/*"
                      className="block w-full text-sm"
                      onChange={async (e) => {
                        const f = e.target.files?.[0];
                        if (!f) return;

                        try {
                          const url = await uploadHeroReelVideo(f);
                          setHero({ reelVideoUrl: url });
                        } catch (err: any) {
                          console.error(err);
                          alert(err?.message ?? "Upload failed");
                        } finally {
                          e.currentTarget.value = "";
                        }
                      }}
                    />

                    <button
                      type="button"
                      onClick={() => setHero({ reelVideoUrl: "" })}
                      className="h-10 px-3 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs"
                    >
                      Remove
                    </button>
                  </div>

                  {config.hero.reelVideoUrl ? (
                    <div className="text-xs text-slate-500 break-all">
                      Current: {config.hero.reelVideoUrl}
                    </div>
                  ) : (
                    <div className="text-xs text-slate-400">
                      No video uploaded.
                    </div>
                  )}
                </div>
              </Field>

              <Field label="Hero reel thumb (poster URL - optional)">
                <Input
                  value={config.hero.reelThumbUrl || ""}
                  onChange={(e) => setHero({ reelThumbUrl: e.target.value })}
                  placeholder="https://... (optional)"
                />
              </Field>

              <Field label="Hero metrics (edit + reorder)">
                <div className="grid gap-3">
                  {(config.hero.metrics || []).map((m, idx) => (
                    <div
                      key={m.id}
                      className="rounded-2xl border border-slate-200 p-3 grid gap-2"
                    >
                      <div className="flex items-center justify-between">
                        <div className="text-xs font-semibold">
                          Metric #{idx + 1}
                        </div>
                        <div className="text-[10px] text-slate-500">
                          Drag in preview to reorder
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <Input
                          value={m.label}
                          placeholder="Label"
                          onChange={(e) => {
                            const next = (config.hero.metrics || []).map((x) =>
                              x.id === m.id
                                ? { ...x, label: e.target.value }
                                : x
                            );
                            setHero({ metrics: next });
                          }}
                        />

                        <Input
                          value={m.value}
                          placeholder="Value"
                          onChange={(e) => {
                            const next = (config.hero.metrics || []).map((x) =>
                              x.id === m.id
                                ? { ...x, value: e.target.value }
                                : x
                            );
                            setHero({ metrics: next });
                          }}
                        />
                      </div>

                      <Input
                        value={m.note}
                        placeholder="Note"
                        onChange={(e) => {
                          const next = (config.hero.metrics || []).map((x) =>
                            x.id === m.id ? { ...x, note: e.target.value } : x
                          );
                          setHero({ metrics: next });
                        }}
                      />
                    </div>
                  ))}
                </div>
              </Field>

              <Field label="Hero chips (3 items)">
                <div className="grid gap-2">
                  {(config.hero.chips || ["", "", ""]).slice(0, 3).map((c, i) => (
                    <Input
                      key={i}
                      value={c}
                      placeholder={`Chip ${i + 1}`}
                      onChange={(e) => {
                        const base = (config.hero.chips || ["", "", ""]).slice(
                          0,
                          3
                        );
                        base[i] = e.target.value;
                        setHero({ chips: base });
                      }}
                    />
                  ))}
                </div>
              </Field>
            </div>
          </Panel>

          <Panel
            id="about"
            title="About"
            subtitle="Editează secțiunea What we actually do."
          >
            <div className="grid gap-3">
              <div className="grid gap-3 sm:grid-cols-2">
                <Field label="Kicker">
                  <Input
                    value={config.about.kicker}
                    onChange={(e) => setAbout({ kicker: e.target.value })}
                  />
                </Field>

                <Field label="Title">
                  <Input
                    value={config.about.title}
                    onChange={(e) => setAbout({ title: e.target.value })}
                  />
                </Field>
              </div>

              <Field label="Subtitle">
                <Textarea
                  value={config.about.subtitle}
                  onChange={(e) => setAbout({ subtitle: e.target.value })}
                />
              </Field>

              <div className="flex items-center justify-between pt-2">
                <div className="text-sm font-semibold">Bullets</div>
                <button
                  type="button"
                  onClick={addAboutBullet}
                  className="h-9 px-3 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs flex items-center gap-2"
                >
                  <Plus className="h-4 w-4" />
                  Add bullet
                </button>
              </div>

              <div className="grid gap-2">
                {config.about.bullets.map((b, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <Input
                      value={b}
                      onChange={(e) => updateAboutBullet(idx, e.target.value)}
                    />
                    <button
                      type="button"
                      onClick={() => removeAboutBullet(idx)}
                      className="h-10 px-3 rounded-xl border border-red-200 bg-red-50 text-red-700 hover:bg-red-100 text-xs flex items-center gap-2"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>

              <div className="pt-2">
                <div className="text-sm font-semibold mb-2">Cards</div>

                <div className="grid gap-3">
                  {config.about.cards.map((c, idx) => (
                    <div
                      key={c.id ?? String(idx)}
                      className="rounded-2xl border border-slate-200 p-4 grid gap-3"
                    >
                      <div className="text-sm font-medium">Card #{idx + 1}</div>

                      <Field label="Overline (ex: 01 · STRATEGY)">
                        <Input
                          value={c.overline}
                          onChange={(e) =>
                            updateAboutCard(idx, { overline: e.target.value })
                          }
                        />
                      </Field>

                      <Field label="Title">
                        <Input
                          value={c.title}
                          onChange={(e) =>
                            updateAboutCard(idx, { title: e.target.value })
                          }
                        />
                      </Field>

                      <Field label="Description">
                        <Textarea
                          value={c.description}
                          onChange={(e) =>
                            updateAboutCard(idx, {
                              description: e.target.value,
                            })
                          }
                        />
                      </Field>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Panel>

          <Panel
            id="brands"
            title="Brands"
            subtitle="Editează heading + carduri (tag/title/note)."
          >
            <div className="grid gap-3">
              <div className="grid sm:grid-cols-2 gap-3">
                <Field label="Kicker">
                  <Input
                    value={config.brands.kicker}
                    onChange={(e) => setBrands({ kicker: e.target.value })}
                  />
                </Field>

                <Field label="Title">
                  <Input
                    value={config.brands.title}
                    onChange={(e) => setBrands({ title: e.target.value })}
                  />
                </Field>
              </div>

              <Field label="Side note (right text)">
                <Textarea
                  value={config.brands.sideNote}
                  onChange={(e) => setBrands({ sideNote: e.target.value })}
                />
              </Field>

              <div className="flex items-center justify-between">
                <div className="text-sm font-semibold">Cards</div>
                <button
                  type="button"
                  onClick={addBrandCard}
                  className="h-9 px-3 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs flex items-center gap-2"
                >
                  <Plus className="h-4 w-4" />
                  Add card
                </button>
              </div>

              <div className="grid gap-3">
                {(config.brands.cards ?? []).map((c, idx) => (
                  <div
                    key={idx}
                    className="rounded-2xl border border-slate-200 p-4 grid gap-3"
                  >
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-medium">Card #{idx + 1}</div>
                      <button
                        type="button"
                        onClick={() => removeBrandCard(idx)}
                        className="h-9 px-3 rounded-xl border border-red-200 bg-red-50 text-red-700 hover:bg-red-100 text-xs flex items-center gap-2"
                      >
                        <Trash2 className="h-4 w-4" />
                        Remove
                      </button>
                    </div>

                    <div className="grid sm:grid-cols-3 gap-3">
                      <Field label="Tag">
                        <Input
                          value={c.tag}
                          onChange={(e) =>
                            updateBrandCard(idx, { tag: e.target.value })
                          }
                        />
                      </Field>

                      <Field label="Title">
                        <Input
                          value={c.title}
                          onChange={(e) =>
                            updateBrandCard(idx, { title: e.target.value })
                          }
                        />
                      </Field>

                      <Field label="Note">
                        <Input
                          value={c.note}
                          onChange={(e) =>
                            updateBrandCard(idx, { note: e.target.value })
                          }
                        />
                      </Field>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Panel>

          <Panel
            id="regions"
            title="Regions"
            subtitle="Editează secțiunea Regions (kicker/title/side note + cards)."
          >
            <div className="grid gap-3">
              <div className="grid sm:grid-cols-2 gap-3">
                <Field label="Kicker">
                  <Input
                    value={config.regions.kicker}
                    onChange={(e) => setRegions({ kicker: e.target.value })}
                  />
                </Field>

                <Field label="Title">
                  <Input
                    value={config.regions.title}
                    onChange={(e) => setRegions({ title: e.target.value })}
                  />
                </Field>
              </div>

              <Field label="Side note (right text)">
                <Textarea
                  value={config.regions.sideNote}
                  onChange={(e) => setRegions({ sideNote: e.target.value })}
                />
              </Field>

              <div className="flex items-center justify-between pt-2">
                <div className="text-sm font-semibold">Cards</div>
                <button
                  type="button"
                  onClick={addRegionCard}
                  className="h-9 px-3 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs flex items-center gap-2"
                >
                  <Plus className="h-4 w-4" />
                  Add card
                </button>
              </div>

              <div className="grid gap-3">
                {(config.regions.cards ?? []).map((c, idx) => (
                  <div
                    key={c.id ?? String(idx)}
                    className="rounded-2xl border border-slate-200 p-4 grid gap-3"
                  >
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-medium">Card #{idx + 1}</div>
                      <button
                        type="button"
                        onClick={() => removeRegionCard(idx)}
                        className="h-9 px-3 rounded-xl border border-red-200 bg-red-50 text-red-700 hover:bg-red-100 text-xs flex items-center gap-2"
                      >
                        <Trash2 className="h-4 w-4" />
                        Remove
                      </button>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-3">
                      <Field label="Tag">
                        <Input
                          value={c.tag}
                          onChange={(e) =>
                            updateRegionCard(idx, { tag: e.target.value })
                          }
                        />
                      </Field>

                      <Field label="Title">
                        <Input
                          value={c.title}
                          onChange={(e) =>
                            updateRegionCard(idx, { title: e.target.value })
                          }
                        />
                      </Field>
                    </div>

                    <Field label="Description">
                      <Textarea
                        value={c.desc}
                        onChange={(e) =>
                          updateRegionCard(idx, { desc: e.target.value })
                        }
                      />
                    </Field>
                  </div>
                ))}
              </div>
            </div>
          </Panel>

          <Panel
            id="portfolio"
            title="Portfolio"
            subtitle="Editează heading + lista de videos (thumb + link + texte)."
          >
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
                  <Plus className="h-4 w-4" />
                  Add video
                </button>
              </div>

              <div className="grid gap-3">
                {(config.portfolio.items ?? []).map((it, idx) => (
                  <div
                    key={idx}
                    className="rounded-2xl border border-slate-200 p-4 grid gap-3"
                  >
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-medium">Video #{idx + 1}</div>
                      <button
                        type="button"
                        onClick={() => removePortfolioItem(idx)}
                        className="h-9 px-3 rounded-xl border border-red-200 bg-red-50 text-red-700 hover:bg-red-100 text-xs flex items-center gap-2"
                      >
                        <Trash2 className="h-4 w-4" />
                        Remove
                      </button>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-3">
                      <Field label="Title">
                        <Input
                          value={it.title}
                          onChange={(e) =>
                            updatePortfolioItem(idx, { title: e.target.value })
                          }
                        />
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
                          onChange={(e) =>
                            updatePortfolioItem(idx, {
                              thumbUrl: e.target.value,
                            })
                          }
                        />
                      </Field>

                      <Field label="Video URL (opens on click)">
                        <Input
                          value={it.videoUrl}
                          onChange={(e) =>
                            updatePortfolioItem(idx, {
                              videoUrl: e.target.value,
                            })
                          }
                        />
                      </Field>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-3">
                      <Field label="Views text">
                        <Input
                          value={it.viewsText}
                          onChange={(e) =>
                            updatePortfolioItem(idx, {
                              viewsText: e.target.value,
                            })
                          }
                        />
                      </Field>

                      <Field label="Engagement text">
                        <Input
                          value={it.engagementText}
                          onChange={(e) =>
                            updatePortfolioItem(idx, {
                              engagementText: e.target.value,
                            })
                          }
                        />
                      </Field>
                    </div>

                    <Field label="Description">
                      <Textarea
                        value={it.description}
                        onChange={(e) =>
                          updatePortfolioItem(idx, {
                            description: e.target.value,
                          })
                        }
                      />
                    </Field>
                  </div>
                ))}
              </div>
            </div>
          </Panel>

          <Panel
            id="contact"
            title="Contact"
            subtitle="Editează textele + buton + opțiunile Region/Budget."
          >
            <div className="grid gap-3">
              <div className="grid sm:grid-cols-2 gap-3">
                <Field label="Kicker">
                  <Input
                    value={config.contact.kicker}
                    onChange={(e) => setContact({ kicker: e.target.value })}
                  />
                </Field>

                <Field label="Button text">
                  <Input
                    value={config.contact.buttonText}
                    onChange={(e) =>
                      setContact({ buttonText: e.target.value })
                    }
                  />
                </Field>
              </div>

              <Field label="Title">
                <Input
                  value={config.contact.title}
                  onChange={(e) => setContact({ title: e.target.value })}
                />
              </Field>

              <Field label="Subtitle">
                <Textarea
                  value={config.contact.subtitle}
                  onChange={(e) => setContact({ subtitle: e.target.value })}
                />
              </Field>

              <Field label="Note (small text)">
                <Input
                  value={config.contact.note}
                  onChange={(e) => setContact({ note: e.target.value })}
                />
              </Field>

              <div className="pt-2">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-semibold">Region options</div>
                  <button
                    type="button"
                    onClick={addContactRegion}
                    className="h-9 px-3 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs flex items-center gap-2"
                  >
                    <Plus className="h-4 w-4" />
                    Add
                  </button>
                </div>

                <div className="mt-2 grid gap-2">
                  {(config.contact.regions ?? []).map((v, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <Input
                        value={v}
                        onChange={(e) =>
                          updateContactRegion(idx, e.target.value)
                        }
                      />
                      <button
                        type="button"
                        onClick={() => removeContactRegion(idx)}
                        className="h-10 px-3 rounded-xl border border-red-200 bg-red-50 text-red-700 hover:bg-red-100 text-xs flex items-center gap-2"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-2">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-semibold">Budget options</div>
                  <button
                    type="button"
                    onClick={addContactBudget}
                    className="h-9 px-3 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs flex items-center gap-2"
                  >
                    <Plus className="h-4 w-4" />
                    Add
                  </button>
                </div>

                <div className="mt-2 grid gap-2">
                  {(config.contact.budgets ?? []).map((v, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <Input
                        value={v}
                        onChange={(e) =>
                          updateContactBudget(idx, e.target.value)
                        }
                      />
                      <button
                        type="button"
                        onClick={() => removeContactBudget(idx)}
                        className="h-10 px-3 rounded-xl border border-red-200 bg-red-50 text-red-700 hover:bg-red-100 text-xs flex items-center gap-2"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Panel>
        </div>

        {/* RIGHT: LIVE PREVIEW */}
        <div className="rounded-3xl border border-slate-200 bg-white shadow-sm overflow-hidden">
          <div className="px-4 py-3 border-b border-slate-200 flex items-center justify-between">
            <div className="text-sm font-semibold">Live Preview</div>
            <div className="text-xs text-slate-500">
              Se schimbă instant, fără Save
            </div>
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
                <BrndlyLandingPreview
                  config={config}
                  adminHref="/admin/home"
                  editable
                  onConfigChange={(next) => setConfig(next)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* IMPORTANT: keep this file self-contained - no extra exports */}
    </div>
  );
}
// src/components/brndly/admin/homeConfig.ts

export type HomeSectionKey =
  | "hero"
  | "about"
  | "brands"
  | "regions"
  | "portfolio"
  | "pricing"
  | "contact";

export type BrandCardItem = {
  tag: string;
  title: string;
  note: string;
};

export type PortfolioPlatform = "tiktok" | "reels" | "youtube" | "other";

export type PortfolioItem = {
  title: string;
  platform: PortfolioPlatform;
  viewsText: string;
  engagementText: string;
  description: string;
  thumbUrl: string;
  videoUrl: string;
};

export type HeroMetric = {
  id: string; // stable key for reorder
  label: string;
  value: string;
  note: string;
};

export type HomeConfig = {
  sections: Record<HomeSectionKey, boolean>;

  hero: {
    kicker: string;
    titleLine1: string;
    titleLine2: string;
    subtitle: string;
    ctaPrimary: string;
    ctaSecondary: string;

    reelVideoUrl: string;
    reelThumbUrl: string;

    metrics: HeroMetric[];
    chips: string[];
  };

  brands: {
    kicker: string;
    title: string;
    sideNote: string;
    cards: BrandCardItem[];
  };

  portfolio: {
    kicker: string;
    title: string;
    ctaText: string;
    items: PortfolioItem[];
  };
};

export const DEFAULT_HOME_CONFIG: HomeConfig = {
  sections: {
    hero: true,
    about: true,
    brands: true,
    regions: true,
    portfolio: true,
    pricing: true,
    contact: true,
  },

  hero: {
    kicker: "Social Media Agency. Different.",
    titleLine1: "We don't chase views.",
    titleLine2: "We guarantee them.",
    subtitle:
      "BRNDLY. is your end–to–end social media team. We plan, film and manage your content with a clear promise: a minimum of 1.5M organic views for your brand.",
    ctaPrimary: "Book a discovery call",
    ctaSecondary: "View popular videos ↓",

    reelVideoUrl: "",
    reelThumbUrl: "",

    metrics: [
      { id: "views", label: "Views", value: "1.9M", note: "avg. per campaign" },
      { id: "clips", label: "Clips", value: "120+", note: "monthly assets" },
      { id: "time", label: "Time", value: "7d", note: "average delivery" },
    ],

    chips: ["TikTok • 840k", "Reels • 420k", "Shorts • 260k"],
  },

  brands: {
    kicker: "Brands",
    title: "Trusted by category leaders & bold newcomers.",
    sideNote:
      "From hospitality and real estate to tech, medical and personal brands — BRNDLY. adapts the content to your world.",
    cards: [
      {
        tag: "Hospitality",
        title: "Hotels, restaurants & nightlife concepts",
        note: "High–impact visuals, full venues and booked–out weekends.",
      },
      {
        tag: "Real Estate",
        title: "Developers, brokers & luxury rentals",
        note: "Story–driven tours that sell lifestyle, not only square meters.",
      },
      {
        tag: "Personal Brands",
        title: "Founders, doctors, coaches & artists",
        note: "You speak. We package the message in clips people save and share.",
      },
    ],
  },

  portfolio: {
    kicker: "Popular videos",
    title: "Snaps from recent campaigns.",
    ctaText: "Request full portfolio →",
    items: [
      {
        title: "Video case study 1",
        platform: "reels",
        viewsText: "730k views",
        engagementText: "Saved 12k • Sent 4k",
        description:
          "Product–led storytelling for a lifestyle brand. Shot in 1 day, edited in 72 hours.",
        thumbUrl: "https://placehold.co/900x600?text=Video+1",
        videoUrl: "https://example.com",
      },
      {
        title: "Video case study 2",
        platform: "tiktok",
        viewsText: "1.2M views",
        engagementText: "Saved 18k • Sent 6k",
        description:
          "Launch sprint content: hook-first edits and fast iteration based on retention curves.",
        thumbUrl: "https://placehold.co/900x600?text=Video+2",
        videoUrl: "https://example.com",
      },
      {
        title: "Video case study 3",
        platform: "youtube",
        viewsText: "410k views",
        engagementText: "Comments 2.1k • Likes 21k",
        description:
          "Long-form cutdowns into shorts + reels with consistent brand framing.",
        thumbUrl: "https://placehold.co/900x600?text=Video+3",
        videoUrl: "https://example.com",
      },
    ],
  },
};

// bump when schema changes
export const HOME_CONFIG_CACHE_KEY = "brndly_home_config_cache_v4";

export function safeParse<T>(s: string | null): T | null {
  if (!s) return null;
  try {
    return JSON.parse(s) as T;
  } catch {
    return null;
  }
}

function isNonEmptyArray<T>(v: unknown): v is T[] {
  return Array.isArray(v) && v.length > 0;
}

function normalizeMetrics(v: unknown): HeroMetric[] | null {
  if (!isNonEmptyArray<any>(v)) return null;

  const fallbackIds = ["views", "clips", "time"];
  return v
    .map((m, i) => ({
      id: String(m?.id ?? fallbackIds[i] ?? `m${i}`),
      label: String(m?.label ?? ""),
      value: String(m?.value ?? ""),
      note: String(m?.note ?? ""),
    }))
    .slice(0, 3);
}

function normalizeChips(v: unknown): string[] | null {
  if (!isNonEmptyArray<any>(v)) return null;
  return v.map((x) => String(x ?? "")).slice(0, 3);
}

export function mergeHomeConfig(raw: Partial<HomeConfig> | null | undefined): HomeConfig {
  if (!raw) return DEFAULT_HOME_CONFIG;

  const merged: HomeConfig = {
    ...DEFAULT_HOME_CONFIG,
    ...raw,

    sections: {
      ...DEFAULT_HOME_CONFIG.sections,
      ...(raw.sections ?? {}),
    },

    hero: {
      ...DEFAULT_HOME_CONFIG.hero,
      ...(raw.hero ?? {}),
      metrics: normalizeMetrics((raw.hero as any)?.metrics) ?? DEFAULT_HOME_CONFIG.hero.metrics,
      chips: normalizeChips((raw.hero as any)?.chips) ?? DEFAULT_HOME_CONFIG.hero.chips,
    },

    brands: {
      ...DEFAULT_HOME_CONFIG.brands,
      ...(raw.brands ?? {}),
      cards: isNonEmptyArray<BrandCardItem>((raw.brands as any)?.cards)
        ? ((raw.brands as any).cards as BrandCardItem[]).map((c) => ({
            tag: String((c as any)?.tag ?? ""),
            title: String((c as any)?.title ?? ""),
            note: String((c as any)?.note ?? ""),
          }))
        : DEFAULT_HOME_CONFIG.brands.cards,
    },

    portfolio: {
      ...DEFAULT_HOME_CONFIG.portfolio,
      ...(raw.portfolio ?? {}),
      items: isNonEmptyArray<PortfolioItem>((raw.portfolio as any)?.items)
        ? ((raw.portfolio as any).items as PortfolioItem[]).map((it) => ({
            title: String((it as any)?.title ?? ""),
            platform: (["tiktok", "reels", "youtube", "other"].includes(
              String((it as any)?.platform ?? "other")
            )
              ? (String((it as any)?.platform ?? "other") as PortfolioPlatform)
              : "other") as PortfolioPlatform,
            viewsText: String((it as any)?.viewsText ?? ""),
            engagementText: String((it as any)?.engagementText ?? ""),
            description: String((it as any)?.description ?? ""),
            thumbUrl: String((it as any)?.thumbUrl ?? ""),
            videoUrl: String((it as any)?.videoUrl ?? ""),
          }))
        : DEFAULT_HOME_CONFIG.portfolio.items,
    },
  };

  return merged;
}

export function loadCachedHomeConfig(): HomeConfig {
  const raw = safeParse<HomeConfig>(localStorage.getItem(HOME_CONFIG_CACHE_KEY));
  return mergeHomeConfig(raw ?? null);
}

export function saveCachedHomeConfig(cfg: HomeConfig) {
  localStorage.setItem(HOME_CONFIG_CACHE_KEY, JSON.stringify(cfg));
}
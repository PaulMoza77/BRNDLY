export type HomeSectionKey =
  | "hero"
  | "about"
  | "brands"
  | "regions"
  | "portfolio"
  | "pricing"
  | "contact";

export type HomeConfig = {
  sections: Record<HomeSectionKey, boolean>;
  hero: {
    kicker: string;
    titleLine1: string;
    titleLine2: string;
    subtitle: string;
    ctaPrimary: string;
    ctaSecondary: string;
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
  },
};

export const HOME_CONFIG_STORAGE_KEY = "brndly_home_config_v1";

export function safeParse<T>(s: string | null): T | null {
  if (!s) return null;
  try {
    return JSON.parse(s) as T;
  } catch {
    return null;
  }
}

export function loadHomeConfig(): HomeConfig {
  const raw = safeParse<HomeConfig>(localStorage.getItem(HOME_CONFIG_STORAGE_KEY));
  if (!raw) return DEFAULT_HOME_CONFIG;
  return {
    ...DEFAULT_HOME_CONFIG,
    ...raw,
    sections: { ...DEFAULT_HOME_CONFIG.sections, ...(raw.sections ?? {}) },
    hero: { ...DEFAULT_HOME_CONFIG.hero, ...(raw.hero ?? {}) },
  };
}

export function saveHomeConfig(cfg: HomeConfig) {
  localStorage.setItem(HOME_CONFIG_STORAGE_KEY, JSON.stringify(cfg));
}
import React from "react";
import { type HomeConfig, loadHomeConfig, saveHomeConfig, DEFAULT_HOME_CONFIG } from "./homeConfig";

export function useHomeConfig() {
  const [config, setConfig] = React.useState<HomeConfig>(() => {
    if (typeof window === "undefined") return DEFAULT_HOME_CONFIG;
    return loadHomeConfig();
  });

  const update = React.useCallback((next: HomeConfig) => {
    setConfig(next);
    if (typeof window !== "undefined") saveHomeConfig(next);
  }, []);

  const reset = React.useCallback(() => {
    update(DEFAULT_HOME_CONFIG);
  }, [update]);

  return { config, update, reset };
}
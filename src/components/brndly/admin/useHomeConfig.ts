import React from "react";
import { supabase } from "@/lib/supabase";
import type { HomeConfig } from "./homeConfig";
import {
  DEFAULT_HOME_CONFIG,
  loadCachedHomeConfig,
  mergeHomeConfig,
  saveCachedHomeConfig,
} from "./homeConfig";

type State = {
  loading: boolean;
  saving: boolean;
  error: string | null;
  savedTick: number;
  config: HomeConfig;
};

export function useHomeConfig() {
  const [state, setState] = React.useState<State>(() => {
    const cfg =
      typeof window === "undefined" ? DEFAULT_HOME_CONFIG : loadCachedHomeConfig();
    return {
      loading: true,
      saving: false,
      error: null,
      savedTick: 0,
      config: cfg,
    };
  });

  const setConfig = React.useCallback((next: HomeConfig) => {
    setState((s) => ({ ...s, config: next }));
    if (typeof window !== "undefined") saveCachedHomeConfig(next);
  }, []);

  const reload = React.useCallback(async () => {
    setState((s) => ({ ...s, loading: true, error: null }));

    const { data, error } = await supabase
      .from("site_settings")
      .select("value")
      .eq("key", "home")
      .single();

    if (error) {
      setState((s) => ({ ...s, loading: false, error: error.message }));
      return;
    }

    const merged = mergeHomeConfig((data?.value as Partial<HomeConfig>) ?? null);
    setState((s) => ({ ...s, loading: false, error: null, config: merged }));

    if (typeof window !== "undefined") saveCachedHomeConfig(merged);
  }, []);

  const save = React.useCallback(async () => {
    setState((s) => ({ ...s, saving: true, error: null }));
    const cfg = state.config;

    const { error } = await supabase
      .from("site_settings")
      .upsert({ key: "home", value: cfg }, { onConflict: "key" });

    if (error) {
      setState((s) => ({ ...s, saving: false, error: error.message }));
      return false;
    }

    setState((s) => ({
      ...s,
      saving: false,
      error: null,
      savedTick: Date.now(),
    }));

    if (typeof window !== "undefined") saveCachedHomeConfig(cfg);
    return true;
  }, [state.config]);

  const reset = React.useCallback(() => {
    setConfig(DEFAULT_HOME_CONFIG);
  }, [setConfig]);

  React.useEffect(() => {
    reload();
  }, [reload]);

  return {
    loading: state.loading,
    saving: state.saving,
    error: state.error,
    savedTick: state.savedTick,
    config: state.config,
    setConfig,
    save,
    reset,
    reload,
  };
}
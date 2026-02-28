import React from "react";
import { supabase } from "@/lib/supabase";
import BrndlyLandingPreview from "@/components/brndly/BrndlyLandingPreview";
import { DEFAULT_HOME_CONFIG, mergeHomeConfig } from "@/components/brndly/admin/homeConfig";
import type { HomeConfig } from "@/components/brndly/admin/homeConfig";

export default function HomePage() {
  const [config, setConfig] = React.useState<HomeConfig>(DEFAULT_HOME_CONFIG);

  React.useEffect(() => {
    let alive = true;

    async function load() {
      const { data, error } = await supabase
        .from("site_settings")
        .select("value")
        .eq("key", "home")
        .single();

      if (!alive) return;

      if (error) {
        setConfig(DEFAULT_HOME_CONFIG);
        return;
      }

      setConfig(mergeHomeConfig((data?.value as Partial<HomeConfig>) ?? null));
    }

    load();
    return () => {
      alive = false;
    };
  }, []);

  return <BrndlyLandingPreview config={config} />;
}
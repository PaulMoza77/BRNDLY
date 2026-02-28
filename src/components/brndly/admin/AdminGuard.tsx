// src/components/brndly/admin/AdminGuard.tsx
import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { supabase } from "@/lib/supabase";

type Props = { children: React.ReactNode };

export default function AdminGuard({ children }: Props) {
  const [loading, setLoading] = React.useState(true);
  const [ok, setOk] = React.useState(false);
  const location = useLocation();

  const check = React.useCallback(async () => {
    setLoading(true);

    const { data } = await supabase.auth.getSession();
    const session = data.session;

    if (!session) {
      setOk(false);
      setLoading(false);
      return;
    }

    const { data: isAdmin, error } = await supabase.rpc("is_admin");
    if (error) {
      console.error("is_admin error:", error);
      setOk(false);
      setLoading(false);
      return;
    }

    setOk(Boolean(isAdmin));
    setLoading(false);
  }, []);

  React.useEffect(() => {
    let alive = true;

    (async () => {
      if (!alive) return;
      await check();
    })();

    const { data: sub } = supabase.auth.onAuthStateChange(() => {
      check();
    });

    return () => {
      alive = false;
      sub.subscription.unsubscribe();
    };
  }, [check]);

  if (loading) return null;

  if (!ok) {
    return (
      <Navigate
        to="/admin/login"
        replace
        state={{ from: location.pathname + location.search }}
      />
    );
  }

  return <>{children}</>;
}
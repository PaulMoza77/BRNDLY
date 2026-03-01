// src/components/brndly/admin/AdminGuard.tsx
import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { supabase } from "@/lib/supabase";

type Props = { children: React.ReactNode };

export default function AdminGuard({ children }: Props) {
  const location = useLocation();

  const [loading, setLoading] = React.useState(true);
  const [ok, setOk] = React.useState(false);

  const check = React.useCallback(async () => {
    try {
      setLoading(true);

      // 1) quick session check
      const { data, error: sessionErr } = await supabase.auth.getSession();
      if (sessionErr) {
        console.error("getSession error:", sessionErr);
        setOk(false);
        return;
      }

      const session = data.session;
      if (!session) {
        setOk(false);
        return;
      }

      // 2) admin check via RPC
      const { data: isAdmin, error: adminErr } = await supabase.rpc("is_admin");
      if (adminErr) {
        console.error("is_admin error:", adminErr);
        setOk(false);
        return;
      }

      setOk(Boolean(isAdmin));
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    void check();

    const { data: sub } = supabase.auth.onAuthStateChange((_event, _session) => {
      void check();
    });

    return () => {
      sub.subscription.unsubscribe();
    };
  }, [check]);

  if (loading) {
    return (
      <div className="min-h-[40vh] flex items-center justify-center">
        <div className="text-xs text-slate-500">Checking access…</div>
      </div>
    );
  }

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
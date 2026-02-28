// src/components/brndly/admin/AdminLayout.tsx
import { Link, Outlet, useLocation } from "react-router-dom";

export default function AdminLayout() {
  const loc = useLocation();
  const onHomeEdit = loc.pathname.startsWith("/admin/home");

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur sticky top-0 z-20">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-sm font-semibold tracking-[0.35em] uppercase">
              BRNDLY ADMIN
            </span>

            <Link
              to="/"
              className="text-xs text-slate-500 hover:text-slate-900"
            >
              ← Back to site
            </Link>
          </div>

          <div className="flex items-center gap-2">
            <Link
              to="/admin/home"
              className={[
                "px-4 py-2 rounded-full text-xs font-medium uppercase tracking-[0.18em] transition",
                onHomeEdit
                  ? "bg-purple-900 text-white"
                  : "border border-slate-200 hover:bg-slate-900 hover:text-white",
              ].join(" ")}
            >
              Home Edit
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        <Outlet />
      </main>
    </div>
  );
}
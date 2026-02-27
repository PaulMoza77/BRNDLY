import { Link, NavLink, Outlet } from "react-router-dom";

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export default function AdminLayout() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/80 backdrop-blur">
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-sm font-semibold tracking-[0.25em] uppercase">
              BRNDLY Admin
            </span>
            <span className="text-xs text-slate-500">•</span>
            <Link to="/" className="text-xs text-slate-600 hover:text-slate-900">
              Back to site
            </Link>
          </div>

          <nav className="flex items-center gap-2 text-xs">
            <NavLink
              to="/admin/home"
              className={({ isActive }) =>
                cn(
                  "px-3 py-2 rounded-full border",
                  isActive
                    ? "border-purple-900 bg-purple-900 text-white"
                    : "border-slate-200 bg-white hover:bg-slate-50"
                )
              }
            >
              Home Edit
            </NavLink>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8">
        <Outlet />
      </main>
    </div>
  );
}
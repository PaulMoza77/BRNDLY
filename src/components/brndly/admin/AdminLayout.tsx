import React from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { ChevronLeft, ChevronRight, Home, LogOut } from "lucide-react";

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export default function AdminLayout() {
  const [collapsed, setCollapsed] = React.useState(false);
  const location = useLocation();

  async function logout() {
    await supabase.auth.signOut();
    window.location.href = "/admin/login";
  }

  const nav = [
    { to: "/admin/home", label: "Home Edit", icon: Home },
    // pe viitor: /admin/media, /admin/portfolio, /admin/brands etc.
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <div
        className={cn(
          "grid min-h-screen transition-[grid-template-columns] duration-200",
          collapsed ? "grid-cols-[76px_1fr]" : "grid-cols-[260px_1fr]"
        )}
      >
        {/* SIDEBAR */}
        <aside className="border-r border-slate-200 bg-white">
          <div className="h-16 px-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-9 w-9 rounded-2xl bg-purple-900 text-white flex items-center justify-center font-semibold">
                B
              </div>
              {!collapsed && (
                <div className="leading-tight">
                  <div className="text-sm font-semibold">BRNDLY Admin</div>
                  <div className="text-xs text-slate-500">Content Studio</div>
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={() => setCollapsed((v) => !v)}
              className="h-9 w-9 rounded-xl border border-slate-200 hover:bg-slate-50 flex items-center justify-center"
              aria-label="Toggle sidebar"
            >
              {collapsed ? (
                <ChevronRight className="h-4 w-4" />
              ) : (
                <ChevronLeft className="h-4 w-4" />
              )}
            </button>
          </div>

          <div className="px-3 pb-4">
            <div className={cn("grid gap-1", collapsed && "justify-items-center")}>
              {nav.map((item) => {
                const active = location.pathname.startsWith(item.to);
                const Icon = item.icon;
                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    className={cn(
                      "h-11 rounded-2xl px-3 flex items-center gap-3 text-sm transition",
                      active
                        ? "bg-purple-50 text-purple-900 border border-purple-200"
                        : "hover:bg-slate-50 text-slate-700 border border-transparent",
                      collapsed && "w-11 justify-center px-0"
                    )}
                    title={collapsed ? item.label : undefined}
                  >
                    <Icon className="h-4 w-4" />
                    {!collapsed && <span className="font-medium">{item.label}</span>}
                  </Link>
                );
              })}

              <button
                type="button"
                onClick={logout}
                className={cn(
                  "mt-2 h-11 rounded-2xl px-3 flex items-center gap-3 text-sm transition text-red-600 hover:bg-red-50 border border-transparent",
                  collapsed && "w-11 justify-center px-0"
                )}
                title={collapsed ? "Logout" : undefined}
              >
                <LogOut className="h-4 w-4" />
                {!collapsed && <span className="font-medium">Logout</span>}
              </button>
            </div>
          </div>
        </aside>

        {/* CONTENT */}
        <main className="p-6">
          <div className="mx-auto w-full max-w-[1400px]">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
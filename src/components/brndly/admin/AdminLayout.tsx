import { Outlet, Link } from "react-router-dom";
import { supabase } from "@/lib/supabase";

export default function AdminLayout() {
  async function logout() {
    await supabase.auth.signOut();
    window.location.href = "/admin/login";
  }

  return (
    <div className="min-h-screen grid grid-cols-[240px_1fr]">
      <aside className="border-r border-slate-200 p-4">
        <div className="font-semibold mb-3">BRNDLY Admin</div>

        <nav className="grid gap-2 text-sm">
          <Link className="hover:underline" to="/admin/home">
            Home Edit
          </Link>

          <button
            className="mt-3 text-left text-red-600 hover:underline"
            onClick={logout}
            type="button"
          >
            Logout
          </button>
        </nav>
      </aside>

      <main className="p-6">
        <Outlet />
      </main>
    </div>
  );
}
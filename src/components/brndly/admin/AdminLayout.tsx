// src/components/brndly/admin/AdminLayout.tsx
import { Outlet, Link } from "react-router-dom";
import { supabase } from "../../../lib/supabase";

export default function AdminLayout() {
  async function logout() {
    await supabase.auth.signOut();
    window.location.href = "/admin/login";
  }

  return (
    <div style={{ minHeight: "100vh", display: "grid", gridTemplateColumns: "240px 1fr" }}>
      <aside style={{ borderRight: "1px solid #222", padding: 16 }}>
        <div style={{ fontWeight: 700, marginBottom: 12 }}>BRNDLY Admin</div>
        <nav style={{ display: "grid", gap: 8 }}>
          <Link to="/admin/home">Home Edit</Link>
          <button onClick={logout} style={{ marginTop: 12 }}>
            Logout
          </button>
        </nav>
      </aside>
      <main style={{ padding: 20 }}>
        <Outlet />
      </main>
    </div>
  );
}
// src/pages/admin/AdminLogin.tsx
import { useState } from "react";
import { supabase } from "../../lib/supabase";

export default function AdminLoginPage() {
  const [loading, setLoading] = useState(false);

  async function signInWithGoogle() {
    setLoading(true);
    const redirectTo = `${window.location.origin}/admin`;

    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo },
    });

    if (error) {
      console.error(error);
      setLoading(false);
      alert(error.message);
    }
  }

  return (
    <div style={{ minHeight: "100vh", display: "grid", placeItems: "center" }}>
      <div style={{ width: 380, padding: 24, border: "1px solid #222", borderRadius: 12 }}>
        <h1 style={{ fontSize: 22, marginBottom: 10 }}>Admin Login</h1>
        <button
          onClick={signInWithGoogle}
          disabled={loading}
          style={{
            width: "100%",
            padding: "12px 14px",
            borderRadius: 10,
            border: "1px solid #333",
            cursor: loading ? "not-allowed" : "pointer",
          }}
        >
          {loading ? "Opening Google..." : "Continue with Google"}
        </button>
      </div>
    </div>
  );
}
// src/App.tsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import HomePage from "./pages/Home";

import AdminLayout from "./components/brndly/admin/AdminLayout";
import AdminHomeEditPage from "./components/brndly/admin/AdminHomeEdit";
import AdminLoginPage from "./pages/admin/AdminLogin";
import AdminGuard from "./components/brndly/admin/AdminGuard";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* SITE */}
        <Route path="/" element={<HomePage />} />

        {/* ADMIN LOGIN */}
        <Route path="/admin/login" element={<AdminLoginPage />} />

        {/* ADMIN (PROTECTED) */}
        <Route
          path="/admin"
          element={
            <AdminGuard>
              <AdminLayout />
            </AdminGuard>
          }
        >
          <Route index element={<Navigate to="home" replace />} />
          <Route path="home" element={<AdminHomeEditPage />} />
        </Route>

        {/* FALLBACK */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
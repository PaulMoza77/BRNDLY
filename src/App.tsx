// src/App.tsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import HomePage from "@/pages/Home";

import AdminLayout from "@/components/brndly/admin/AdminLayout";
import AdminGuard from "@/components/brndly/admin/AdminGuard";
import HomeEdit from "@/components/brndly/admin/HomeEdit";
import AdminLoginPage from "@/pages/admin/AdminLogin";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* PUBLIC SITE */}
        <Route path="/" element={<HomePage />} />

        {/* ADMIN LOGIN (PUBLIC) */}
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
          <Route path="home" element={<HomeEdit />} />
        </Route>

        {/* FALLBACK */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import HomePage from "@/pages/Home";

import AdminLayout from "@/components/brndly/admin/AdminLayout";
import AdminGuard from "@/components/brndly/admin/AdminGuard";

import HomeEdit from "@/components/brndly/admin/HomeEdit";
import AdminLoginPage from "@/pages/admin/AdminLogin";

import LeadsPage from "@/pages/admin/Leads";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/admin/login" element={<AdminLoginPage />} />

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

          {/* ✅ NEW */}
          <Route path="leads" element={<LeadsPage />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
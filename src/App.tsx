// src/App.tsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import HomePage from "./pages/Home";

import AdminLayout from "./components/brndly/admin/AdminLayout";
import AdminHomeEditPage from "./components/brndly/admin/AdminHomeEdit";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* SITE */}
        <Route path="/" element={<HomePage />} />

        {/* ADMIN */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Navigate to="home" replace />} />
          <Route path="home" element={<AdminHomeEditPage />} />
        </Route>

        {/* FALLBACK */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
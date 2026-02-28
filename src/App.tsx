// src/App.tsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/Home";

import AdminLayout from "./components/brndly/admin/AdminLayout";
import AdminHomeEdit from "./components/brndly/admin/AdminHomeEdit";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ✅ PUBLIC */}
        <Route path="/" element={<Home />} />

        {/* ✅ ADMIN */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Navigate to="/admin/home" replace />} />
          <Route path="home" element={<AdminHomeEdit />} />
        </Route>

        {/* ✅ fallback -> HOME (NU admin!) */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
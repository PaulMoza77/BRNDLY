// src/App.tsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/Home";

// ✅ IMPORTANT: importă din components, NU din pages
import AdminLayout from "./components/brndly/admin/AdminLayout";
import AdminHomeEditPage from "./components/brndly/admin/AdminHomeEdit";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* SITE */}
        <Route path="/" element={<Home />} />

        {/* ADMIN */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Navigate to="/admin/home" replace />} />
          <Route path="home" element={<AdminHomeEditPage />} />
        </Route>

        {/* FALLBACK */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
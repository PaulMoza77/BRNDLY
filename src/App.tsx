import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/Home";
import AdminLayout from "./components/brndly/admin/AdminLayout";
import AdminHomeEditPage from "./components/brndly/admin/AdminHomeEdit";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Navigate to="/admin/home" replace />} />
          <Route path="home" element={<AdminHomeEditPage />} />
        </Route>

        {/* fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
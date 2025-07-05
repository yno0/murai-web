import React from "react";
import {BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminLayout from "./layouts/AdminLayout";
import ClientLayout from "./layouts/ClientLayout";
import SupervisorLayout from "./layouts/SupervisorLayout";
import ForgotPassword from "./pages/ForgotPass";
import Login from "./pages/Login";
import Register from "./pages/Register";
import LandingPage from "./pages/landing/LandingPage";
import CompleteProfile from "./pages/CompleteProfile";
import Dashboard from "./pages/Dashboard";
export function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" />
        <Route path="/complete-profile" element={<CompleteProfile />} />
        <Route path="/dashboard" element={<Dashboard />} />

        {/* Client Routes */}
        <Route path="/client/*" element={<ClientLayout />} />

        {/* Admin Layout */}
        <Route path="/admin/*" element={<AdminLayout />} />

        {/* Supervisor Layout */}
        <Route path="/supervisor/*" element={<SupervisorLayout />} />
      </Routes>
    </Router>
  );
}

export default App;

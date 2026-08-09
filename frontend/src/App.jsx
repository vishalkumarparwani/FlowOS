import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";

import Dashboard from "./pages/Dashboard/Dashboard";
import Issues from "./pages/Issues/Issues";
import Services from "./pages/Services/Services";
import Triage from "./pages/Triage/Triage";
import Settings from "./pages/Settings/Settings";

export default function App() {
    return (
        <Routes>
            <Route path="/" element={<MainLayout />}>
                <Route index element={<Dashboard />} />
                <Route path="issues" element={<Issues />} />
                <Route path="services" element={<Services />} />
                <Route path="triage" element={<Triage />} />
                <Route path="settings" element={<Settings />} />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
        </Routes>
    );
}
import React from "react";
import { Routes, Route } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";

import Dashboard from "./pages/Dashboard/Dashboard";
import Backlog from "./pages/Backlog/Backlog";
import Roadmaps from "./pages/Roadmaps/Roadmaps";
import Specs from "./pages/Specs/Specs";
import Generator from "./pages/Generator/Generator";
import Settings from "./pages/Settings/Settings";

export default function App() {
    return (
        <Routes>
            <Route path="/" element={<MainLayout />}>
                <Route index element={<Dashboard />} />
                <Route path="backlog" element={<Backlog />} />
                <Route path="roadmaps" element={<Roadmaps />} />
                <Route path="specs" element={<Specs />} />
                <Route path="generator" element={<Generator />} />
                <Route path="settings" element={<Settings />} />
            </Route>
        </Routes>
    );
}
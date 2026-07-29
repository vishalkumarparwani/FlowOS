import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";

// Pages
import Dashboard from "./pages/Dashboard/Dashboard";
import Backlog from "./pages/Backlog/Backlog";
import Roadmaps from "./pages/Roadmaps/Roadmaps";
import Specs from "./pages/Specs/Specs";
import Generator from "./pages/Generator/Generator";
import Settings from "./pages/Settings/Settings";

// Initial mock data
import { INITIAL_BACKLOG } from "./api";

export default function App() {
  const [backlog, setBacklog] = useState(INITIAL_BACKLOG);
  const [generatorSeed, setGeneratorSeed] = useState("");

  const handleGenerateFromSpec = (snippet) => {
    setGeneratorSeed(snippet);
  };

  const handleAddToBacklogFromGenerator = (item) => {
    setBacklog((prev) => [item, ...prev]);
  };

  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Dashboard />} />

        <Route
          path="backlog"
          element={
            <Backlog
              backlog={backlog}
              setBacklog={setBacklog}
            />
          }
        />

        <Route
          path="roadmaps"
          element={<Roadmaps />}
        />

        <Route
          path="specs"
          element={
            <Specs
              onGenerateFromSpec={handleGenerateFromSpec}
            />
          }
        />

        <Route
          path="generator"
          element={
            <Generator
              initialInput={generatorSeed}
              onAddToBacklog={handleAddToBacklogFromGenerator}
            />
          }
        />

        <Route
          path="settings"
          element={<Settings />}
        />
      </Route>
    </Routes>
  );
}
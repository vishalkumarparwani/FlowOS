import React from "react";
import { Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";

import Dashboard from "./pages/Dashboard/Dashboard";
import Tasks from "./pages/Tasks";

function App() {
  return (
    <Routes>
      <Route path='/' element={<MainLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="tasks" element={<Tasks />} />
        {/* <Route path="" element={<Dashboard />} />
        <Route path="" element={<Dashboard />} />
        <Route path="" element={<Dashboard />} />
        <Route path="" element={<Dashboard />} />
        <Route path="" element={<Dashboard />} /> */}
      </Route>
    </Routes>
  );
}

export default App;
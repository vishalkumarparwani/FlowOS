import React from "react";
import { Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";

import Dashboard from "./pages/Dashboard/Dashboard";
import Tasks from "./pages/Tasks/Tasks";
import Settings from "./pages/Settings/Settings"

function App() {
  return (
    <Routes>
      <Route path='/' element={<MainLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="tasks" element={<Tasks />} />
        {/* <Route path="" element={< />} />
        <Route path="" element={< />} />
        <Route path="" element={< />} />
        <Route path="" element={< />} />*/}
        <Route path="settings" element={<Settings />} /> 
      </Route>
    </Routes>
  );
}

export default App;
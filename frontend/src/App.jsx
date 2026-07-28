import React from "react";
import { Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";

import Dashboard from "./pages/Dashboard/Dashboard";
import Tasks from "./pages/Tasks/Tasks";
import Projects from "./pages/Projects/Projects";
import Notes from "./pages/Notes/Notes";
import Calendar from "./pages/Calendar/CalendarView";
import AiAssistant from "./pages/AiAssistant/AiAssistant";
import Settings from "./pages/Settings/Settings"

function App() {
  return (
    <Routes>
      <Route path='/' element={<MainLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="tasks" element={<Tasks />} />
        <Route path="projects" element={<Projects />} />
        <Route path="notes" element={<Notes />} />
        <Route path="calendar" element={<Calendar />} />
        <Route path="ai" element={<AiAssistant />} />
        <Route path="settings" element={<Settings />} /> 
      </Route>
    </Routes>
  );
}

export default App;
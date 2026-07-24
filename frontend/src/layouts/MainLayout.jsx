import React, { useState } from "react";
import { Outlet } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

export default function MainLayout() {
    
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    return (
        <div className="flex h-screen bg-zinc-950 text-zinc-100">
            <div>
                <Sidebar isSidebarOpen={isSidebarOpen}
            />
            </div>

            <div className="flex-1 mt-2 min-w-0 overflow-y-auto ease-in-out px-6">
                <Navbar
                    isSidebarOpen={isSidebarOpen}
                    setIsSidebarOpen={setIsSidebarOpen}
                />

                <main className="flex-1 overflow-y-auto p-6">
                    <Outlet />
                </main>
            </div>

            {/* <aside className="w-80 border-l border-zinc-900 p-6">
                Ai Assistant
            </aside> */}
        </div>
    );
}
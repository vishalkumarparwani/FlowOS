import React from "react";
import Dashboard from "../pages/Dashboard";
// import Tasks from "../pages/Tasks";


import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";


export default function MainLayout() {
    

    return (
        <div className="flex h-screen">
            <Sidebar />

            
            <main className="ease-in-out px-6 py-3.5">
                <Navbar />
                <Dashboard />
            </main>

            

            {/* <aside className="w-80 border-l border-zinc-900 p-6">
                Ai Assistant
            </aside> */}

        </div>
    );
}
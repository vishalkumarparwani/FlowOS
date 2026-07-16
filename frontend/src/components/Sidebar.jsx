import React from "react";
import { NavLink } from "react-router-dom";
import {
    Home,
    CheckSquare,
    Calendar,
    Sparkles,
    Settings,
    X
} from "lucide-react";

export default function Sidebar() {
    const navItems = [
        { title: "Dashboard", path: "/", icon: Home },
        { title: "Tasks", path: "/tasks", icon: CheckSquare },
        { title: "Calendar", path: "/calendar", icon: Calendar },
        { title: "AI Assistant", path: "/ai", icon: Sparkles },
        { title: "Settings", path: "/settings", icon: Settings },
    ];

    return (
        <aside className="w-64 p-4 h-screen border-r border-zinc-900 flex flex-col justify-between bg-black text-white">
            <div>
                <div className="flex items-center justify-between h-14 px-2">
                    <div className="flex items-center gap-2.5">
                        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white">
                            <span className="font-bold text-black text-sm leading-none">F</span>
                        </div>
                        <span className="font-semibold text-lg tracking-tight leading-none">FlowOS</span>
                    </div>

                    <button className="rounded-lg p-1.5 text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900">
                        <X size={18} />
                    </button>
                </div>

                <nav className="mt-6 space-y-1"> 
                    {navItems.map((item) => {
                        const Icon = item.icon;

                        return (
                            <NavLink
                                key={item.path}
                                to={item.path}
                                className="flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium text-sm text-zinc-400 hover:bg-zinc-900/50 hover:text-zinc-200 transition-colors"
                            >
                                <Icon size={18} className="shrink-0" />
                                
                                <span>{item.title}</span>
                            </NavLink>
                        );
                    })}
                </nav>
            </div>
        </aside>
    );
}
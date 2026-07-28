import React from "react";
import { NavLink } from "react-router-dom";
import {
    Home,
    CheckSquare,
    Calendar,
    Sparkles,
    Settings,
} from "lucide-react";

export default function Sidebar(props) {
    const navItems = [
        { title: "Dashboard", path: "/", icon: Home },
        { title: "Tasks", path: "/tasks", icon: CheckSquare },
        { title: "Calendar", path: "/calendar", icon: Calendar },
        { title: "AI Assistant", path: "/ai", icon: Sparkles },
        { title: "Settings", path: "/settings", icon: Settings },
    ];

    return (
        <aside className={`${props.isSidebarOpen ? 'w-64' : 'w-20'}
            transition-all duration-300
            p-4 sm:mr-5 h-screen border-r border-zinc-900 flex flex-col justify-between bg-black text-white`}>
            <div>
                <div className="flex items-center justify-between h-14 px-2">
                    <div className="flex items-center gap-2.5">
                        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white">
                            <span className="font-bold text-black text-sm leading-none">F</span>
                        </div>
                        {props.isSidebarOpen && (
                            <span className="font-semibold text-lg tracking-tight leading-none">
                                FlowOS
                            </span>
                        )}
                    </div>
                </div>

                <nav className="mt-6 space-y-1">
                    {navItems.map((item) => {
                        const Icon = item.icon;

                        return (
                            <NavLink
                                key={item.path}
                                to={item.path}
                                className={({ isActive }) =>
                                    `flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium text-sm transition-colors ${isActive ?
                                        'bg-zinc-900 text-white' : 'text-zinc-400 hover:bg-zinc-900/50 hover:text-zinc-200'
                                    }
                                `}
                            >
                                <Icon size={18} className="shrink-0" />

                                {props.isSidebarOpen && (
                                    <span
                                        className="transition-opacity duration-300"
                                    >{item.title}</span>
                                )}
                            </NavLink>
                        );
                    })}
                </nav>
            </div>
        </aside>
    );
}
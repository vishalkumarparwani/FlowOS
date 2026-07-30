import React from "react";
import { NavLink } from "react-router-dom";
import {
    LayoutDashboard,
    ListTodo,
    FolderKanban,
    FileText,
    Wand2,
    Settings as SettingsIcon,
    Sparkles,
    X
} from "lucide-react";

export default function Sidebar(props) {
    const navItems = [
        { title: "Dashboard", path: "/", icon: LayoutDashboard },
        { title: "Backlog", path: "/backlog", icon: ListTodo },
        { title: "Roadmaps", path: "/roadmaps", icon: FolderKanban },
        { title: "Specs", path: "/specs", icon: FileText },
        // { title: "Calendar", path: "/calendar", icon: Calendar },
        { title: "AI Generator", path: "/generator", icon: Wand2 },
        { title: "Settings", path: "/settings", icon: SettingsIcon },
    ];

    const handleNavClick = () => {
        if(window.innerWidth < 768 && props.setIsSidebarOpen) {
              setIsSideOpen(false);
        }
    };

    return (
        <>
            {props.isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
                    onClick={() => props.setIsSideOpen}
                />
            )}
        
      <aside
        className={`
          fixed md:static inset-y-0 left-0 z-50
          w-64 bg-zinc-950 border-r border-zinc-800/80
          flex flex-col justify-between p-4 h-full shrink-0 select-none
          transition-transform duration-300 ease-in-out
          ${props.isSidebarOpen ? "translate-x-0" : "-translate-x-full md:hidden"}
        `}
      >
        <div className="space-y-6">
          <div className="flex items-center justify-between px-2 py-1">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-zinc-100 text-zinc-950 flex items-center justify-center font-bold shrink-0">
                <Sparkles className="w-4 h-4 fill-zinc-950" />
              </div>
              <div className="overflow-hidden">
                <h2 className="text-sm font-bold text-zinc-100 tracking-tight truncate">
                  SpecFlow AI
                </h2>
                <p className="text-[10px] text-zinc-500 font-mono truncate">
                  SPEC-TO-BACKLOG v2.4
                </p>
              </div>
            </div>

            <button
              onClick={() => props.setIsSidebarOpen && props.setIsSidebarOpen(false)}
              className="p-1 rounded-md text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900 md:hidden"
              title="Close sidebar"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.path === "/"}
                  onClick={handleNavClick}
                  className={({ isActive }) =>
                    `w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium transition-all ${isActive
                      ? "bg-zinc-800 text-zinc-100 border border-zinc-700/80 shadow-sm"
                      : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/60 border border-transparent"
                    }`
                  }
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span className="truncate">{item.title}</span>
                </NavLink>
              );
            })}
          </nav>
        </div>

        <div className="p-3 bg-zinc-900/40 rounded-xl border border-zinc-800/50 space-y-1 text-xs">
          <p className="text-zinc-300 font-medium truncate">Acme Corp Engineering</p>
          <p className="text-[11px] text-zinc-500 truncate">Connected to Linear & GitHub</p>
        </div>
      </aside>
        </>
    );
}
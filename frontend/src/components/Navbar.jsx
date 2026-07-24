import React from "react";
import { Search, Sparkles, Bell, Menu } from "lucide-react";
import UserMenu from "./UserMenu";

export default function Navbar(props) {
    return (
        <header className="sticky top-0 z-50 pb-4 flex items-center justify-between border-b border-zinc-800 backdrop-blur-md">

            <div className="flex items-center gap-2">
                <button
                    onClick={() => props.setIsSidebarOpen(!props.isSidebarOpen)}
                    className="rounded-lg p-1.5 text-zinc-400 active:bg-zinc-900/50 hover:text-zinc-100 hover:bg-zinc-900">
                    <Menu size={20} />
                </button>
                <div className="flex items-center gap-2 px-2 py-1 rounded-xl border border-zinc-800 text-sm focus-within:border-zinc-700 focus-within:bg-zinc-900/80 focus:outline-hidden">
                    <Search className="w-4 h-7 text-zinc-500 shrink-0" />
                    <input
                        type="text"
                        placeholder="Search anything... (Press '/' to search)"
                        className="flex-1 bg-transparent outline-none text-zinc-400"
                    /></div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
                <button
                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900/40 text-zinc-400 hover:text-zinc-100 transition-colors"
                >
                    <Sparkles size={16} />
                </button>

                <button
                    className="relative flex h-8 w-8 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900/40 text-zinc-400 hover:text-zinc-100 transition-colors"
                >
                    <Bell size={16} />
                    <span className="absolute top-1.5 right-1.5 h-1.5 w-1.5 rounded-full bg-yellow-500 animate-pulse" />
                </button>
            </div>
        </header>
    );
}
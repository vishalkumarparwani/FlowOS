import React from "react";
import { Search, Menu, Sparkles, Bell } from "lucide-react";
import UserMenu from "./UserMenu";

export default function Navbar() {
    return (
        <header className="pb-5 flex items-center justify-between border-b border-zinc-800 backdrop-blur-md">
            <div className="flex items-center gap-2 px-3  rounded-lg border border-zinc-800 text-sm focus-within:border-zinc-700 focus-within:bg-zinc-900/80 focus:outline-hidden">
                {/* <button
                    className="rounded-lg p-1.5 text-zinc-400 hover:bg-zinc-900 hover:text-zinc-100 lg-hidden"
                >
                    <Menu size={20} />
                </button> */}

                <Search className="w-4 h-7 text-zinc-500 shrink-0" />
                <input
                    type="text"
                    placeholder="Search anything... (Press '/' to search)"
                    className="flex-1 bg-transparent outline-none text-zinc-400"
                />
            </div>

            <div className="flex items-center gap-2">
                <button
                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-zinc-850 bg-zinc-900/40 text-zinc-400 hover:text-zinc-100 transition-colors"
                >
                    <Sparkles size={16} />
                </button>

                <button
                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-zinc-850 bg-zinc-900/40 text-zinc-400 hover:text-zinc-100 transition-colors"
                >
                    <Bell size={16} />
                    <span className="absolute top-1.5 right-1.5 h-1.5 w-1.5 rounded-full bg-yellow-500 animate-pulse" />

                </button>
            </div>
        </header>
    );
}
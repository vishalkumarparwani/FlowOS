import React from 'react';
import SearchBar from './SearchBar';
import UserMenu from './UserMenu';
import { Sparkles } from 'lucide-react';

export default function Navbar({ onToggleAI }) {
  return (
    <header className="h-14 border-b border-zinc-800/80 bg-zinc-950/80 backdrop-blur px-8 flex items-center justify-between sticky top-0 z-10">
      <SearchBar />
      
      <div className="flex items-center gap-4">
        <button
          onClick={onToggleAI}
          className="flex items-center gap-2 bg-zinc-900 hover:bg-zinc-800 border border-zinc-700/60 text-zinc-200 text-xs px-3 py-1.5 rounded-lg transition-colors"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>Spec Copilot</span>
        </button>

        <UserMenu />
      </div>
    </header>
  );
}
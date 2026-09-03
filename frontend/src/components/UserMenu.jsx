import React from 'react';
import { Bell, User } from 'lucide-react';

export default function UserMenu() {
  return (
    <div className="flex items-center gap-3">
      <button className="p-2 text-zinc-400 hover:text-zinc-200 rounded-lg hover:bg-zinc-900 transition-colors">
        <Bell className="w-4 h-4" />
      </button>
      <div className="flex items-center gap-2 pl-2 border-l border-zinc-800">
        <div className="w-7 h-7 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-zinc-300">
          <User className="w-4 h-4" />
        </div>
        <span className="text-xs font-medium text-zinc-300">Me (Tech Lead)</span>
      </div>
    </div>
  );
}
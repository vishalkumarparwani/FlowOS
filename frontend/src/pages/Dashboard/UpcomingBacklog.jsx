import React from 'react';
import { Zap } from 'lucide-react';

export default function UpcomingBacklog({ items }) {
  return (
    <div className="rounded-xl border border-zinc-800/80 bg-zinc-900/30 p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-zinc-100">Recent Generations</h2>
        <Zap className="w-4 h-4 text-zinc-400" />
      </div>

      <div className="space-y-4">
        {items.map((gen, idx) => (
          <div key={idx} className="p-3 rounded-lg border border-zinc-800/50 bg-zinc-950/40 space-y-2">
            <div className="flex items-start justify-between gap-2">
              <p className="text-sm font-medium text-zinc-200 leading-snug">{gen.title}</p>
              <span className="text-[10px] text-zinc-500 whitespace-nowrap">{gen.time}</span>
            </div>
            <div className="flex items-center justify-between text-xs text-zinc-400 pt-1">
              <span className="text-zinc-500">{gen.epic}</span>
              <span className="px-2 py-0.5 rounded text-[10px] bg-zinc-800/80 text-zinc-300 font-medium">
                {gen.itemsCount} tasks
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
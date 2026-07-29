import React, { useState } from 'react';
import { Plus, ArrowUpRight } from 'lucide-react';
import { INITIAL_EPICS } from '../../api';

export default function Roadmaps() {
  const [epics] = useState(INITIAL_EPICS);

  return (
    <div className="mt-5 px-12 max-w-7xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-zinc-100">Product Roadmaps & Epics</h1>
          <p className="text-sm text-zinc-400 mt-1">High-level grouping of AI-driven backlog items aligned to core business milestones.</p>
        </div>
        <button
          onClick={() => alert('New Epic creation modal would open here')}
          className="bg-zinc-100 text-zinc-950 hover:bg-zinc-200 px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          New Epic
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {epics.map((epic) => (
          <div
            key={epic.id}
            className="rounded-xl border border-zinc-800/80 bg-zinc-900/30 p-6 flex flex-col justify-between hover:border-zinc-700/80 transition-all space-y-6"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-zinc-500 uppercase tracking-wide">{epic.id}</span>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-zinc-800 text-zinc-300 font-medium">
                  {epic.targetDate}
                </span>
              </div>
              <h3 className="text-lg font-semibold text-zinc-100 leading-snug">{epic.name}</h3>
            </div>

            <div className="space-y-4 pt-4 border-t border-zinc-800/50">
              <div className="flex items-center justify-between text-xs text-zinc-400">
                <span>{epic.itemCount} Backlog Items</span>
                <span className="font-semibold text-zinc-200">{epic.progress}% Completed</span>
              </div>

              <div className="w-full bg-zinc-800/80 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-zinc-100 h-full rounded-full transition-all duration-500"
                  style={{ width: `${epic.progress}%` }}
                />
              </div>

              <div className="flex items-center justify-between pt-2">
                <span className="text-xs text-zinc-500">
                  Status: <span className="text-zinc-300 font-medium">{epic.status}</span>
                </span>
                <button
                  onClick={() => alert(`Opening detail view for ${epic.name}`)}
                  className="text-xs text-zinc-300 hover:text-zinc-100 flex items-center gap-1 font-medium transition-colors cursor-pointer"
                >
                  View Details <ArrowUpRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
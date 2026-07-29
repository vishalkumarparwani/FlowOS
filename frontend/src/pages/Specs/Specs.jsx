import React, { useState } from 'react';
import { Plus, Clock, Wand2 } from 'lucide-react';
import { INITIAL_SPECS } from '../../api';

export default function Specs({ onGenerateFromSpec }) {
  const [specs] = useState(INITIAL_SPECS);

  return (
    <div className="mt-5 px-12 max-w-7xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-zinc-100">Product Specifications</h1>
          <p className="text-sm text-zinc-400 mt-1">Unstructured PRDs, design notes, and raw architecture outlines.</p>
        </div>
        <button
          onClick={() => alert('Opening new spec draft markdown editor...')}
          className="bg-zinc-100 text-zinc-950 hover:bg-zinc-200 px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          New Spec Draft
        </button>
      </div>

      <div className="space-y-4">
        {specs.map((spec) => (
          <div
            key={spec.id}
            className="rounded-xl border border-zinc-800/80 bg-zinc-900/30 p-6 hover:border-zinc-700/80 transition-all flex flex-col md:flex-row md:items-center justify-between gap-6"
          >
            <div className="space-y-2 flex-1">
              <div className="flex items-center gap-3">
                <h3 className="text-base font-semibold text-zinc-100">{spec.title}</h3>
                <span className="text-xs text-zinc-500 flex items-center gap-1">
                  <Clock className="w-3 h-3" /> {spec.updatedAt}
                </span>
              </div>
              <p className="text-sm text-zinc-400 line-clamp-2">{spec.snippet}</p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={() => alert(`Opening draft editor for ${spec.title}`)}
                className="px-3.5 py-2 rounded-lg border border-zinc-700/60 text-zinc-300 hover:bg-zinc-800/60 text-xs font-medium transition-colors cursor-pointer"
              >
                Edit Draft
              </button>
              <button
                onClick={() => onGenerateFromSpec(spec.snippet)}
                className="bg-zinc-100 text-zinc-950 hover:bg-zinc-200 px-3.5 py-2 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Wand2 className="w-3.5 h-3.5" />
                Generate Backlog
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
import React from 'react';
import { CheckCircle2, Clock, AlertCircle } from 'lucide-react';

export default function BacklogRow({ item, onToggleStatus }) {
  const getComplexityBadge = (c) => {
    const colors = {
      S: 'bg-emerald-950/60 text-emerald-400 border-emerald-800/50',
      M: 'bg-blue-950/60 text-blue-400 border-blue-800/50',
      L: 'bg-amber-950/60 text-amber-400 border-amber-800/50',
      XL: 'bg-rose-950/60 text-rose-400 border-rose-800/50'
    };
    return (
      <span className={`text-xs px-2 py-0.5 rounded border font-mono font-semibold ${colors[c] || colors.M}`}>
        {c}
      </span>
    );
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'done':
        return <span className="text-xs px-2 py-1 rounded bg-emerald-950/60 text-emerald-400 border border-emerald-800/50 font-medium flex items-center gap-1.5"><CheckCircle2 className="w-3 h-3"/> Done</span>;
      case 'in_progress':
        return <span className="text-xs px-2 py-1 rounded bg-amber-950/60 text-amber-400 border border-amber-800/50 font-medium flex items-center gap-1.5"><Clock className="w-3 h-3"/> In Progress</span>;
      default:
        return <span className="text-xs px-2 py-1 rounded bg-zinc-800 text-zinc-300 border border-zinc-700/50 font-medium flex items-center gap-1.5"><AlertCircle className="w-3 h-3"/> Planning</span>;
    }
  };

  return (
    <div className="rounded-xl border border-zinc-800/80 bg-zinc-900/30 p-5 hover:border-zinc-700/80 transition-all space-y-3">
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-1.5 flex-1">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-zinc-500 font-semibold">{item.id}</span>
            <span className="text-xs text-zinc-400 px-2 py-0.5 rounded bg-zinc-800/50 border border-zinc-700/40">
              {item.epic}
            </span>
            {getComplexityBadge(item.complexity)}
          </div>
          <h3 className="text-base font-semibold text-zinc-100">{item.title}</h3>
        </div>
        <button onClick={() => onToggleStatus(item.id)} className="cursor-pointer transition-transform active:scale-95">
          {getStatusBadge(item.status)}
        </button>
      </div>

      {item.acceptanceCriteria && item.acceptanceCriteria.length > 0 && (
        <div className="pt-2 border-t border-zinc-800/40">
          <p className="text-[11px] font-semibold text-zinc-500 uppercase tracking-wider mb-1.5">
            Technical Acceptance Criteria
          </p>
          <ul className="space-y-1">
            {item.acceptanceCriteria.map((ac, idx) => (
              <li key={idx} className="text-xs text-zinc-400 flex items-start gap-2">
                <span className="text-zinc-600 mt-0.5">•</span>
                <span>{ac}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
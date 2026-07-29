import React from 'react';

export default function DashboardCard({ label, value, trend, subtext }) {
  return (
    <div className="rounded-xl border border-zinc-800/80 bg-zinc-900/30 p-5 space-y-2">
      <p className="text-xs font-medium text-zinc-400 uppercase tracking-wider">{label}</p>
      <div className="flex items-baseline justify-between">
        <span className="text-2xl font-bold text-zinc-100">{value}</span>
        <span className="text-xs font-semibold text-emerald-400 bg-emerald-950/60 border border-emerald-800/50 px-2 py-0.5 rounded">
          {trend}
        </span>
      </div>
      <p className="text-xs text-zinc-500">{subtext}</p>
    </div>
  );
}
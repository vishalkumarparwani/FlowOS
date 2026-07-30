import React from 'react';

<<<<<<< HEAD
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
=======
export default function DashboardCard(props) {
  const Icon = props.icon;

  return (
    <div className="group rounded-2xl border border-zinc-800/80 bg-zinc-900/30 p-5 transition-all duration-300 hover:border-zinc-700 hover:bg-zinc-900/50">
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-xs font-medium uppercase tracking-wider text-zinc-500">
            {props.title}
          </p>

          <h3 className="pt-2 text-3xl font-bold tracking-tight text-zinc-100 transition-transform duration-300 group-hover:translate-x-0.5">
            {props.value}
          </h3>
        </div>

        <div
          className={`flex h-11 w-11 items-center justify-center rounded-xl border border-zinc-700/70 ${props.iconStyle}`}
        >
          <Icon size={18} />
        </div>
      </div>

      <div className="mt-5 border-t border-zinc-800/70 pt-4">
        <p className="text-xs leading-5 text-zinc-500">
          {props.description}
        </p>
      </div>
>>>>>>> 8d45267 (feat: redesign dashboard and backlog for SpecFlow AI)
    </div>
  );
}
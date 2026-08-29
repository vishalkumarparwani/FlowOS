import React from "react";
import {
  Clock,
  CircleDot,
  CheckCircle2,
  Trash2,
  Pencil,
  ChevronRight,
} from "lucide-react";

const statusConfig = {
  planning: {
    label: "Planning",
    color: "text-zinc-300 border-zinc-700/60 bg-zinc-800/40 hover:bg-zinc-800/80",
    icon: CircleDot,
  },
  in_progress: {
    label: "In Progress",
    color: "text-amber-400 border-amber-500/20 bg-amber-500/10 hover:bg-amber-500/20",
    icon: Clock,
  },
  done: {
    label: "Done",
    color: "text-emerald-400 border-emerald-500/20 bg-emerald-500/10 hover:bg-emerald-500/20",
    icon: CheckCircle2,
  },
};

const severityConfig = {
  P1: {
    label: "P1",
    color: "text-rose-400 border-rose-500/20 bg-rose-500/10",
  },
  P2: {
    label: "P2",
    color: "text-amber-400 border-amber-500/20 bg-amber-500/10",
  },
  P3: {
    label: "P3",
    color: "text-indigo-400 border-indigo-500/20 bg-indigo-500/10",
  },
  P4: {
    label: "P4",
    color: "text-emerald-400 border-emerald-500/20 bg-emerald-500/10",
  },
};

export default function IssueRow({
  item,
  isHighlighted,
  onToggleStatus,
  onEdit,
  onDelete,
}) {
  const status = statusConfig[item.status] || statusConfig.planning;
  const StatusIcon = status.icon;
  const severity = severityConfig[item.severity] || {
    label: "P3",
    color: "text-indigo-400 border-indigo-500/20 bg-indigo-500/10",
  };
  const stepsList = (item.reproduction_steps || "")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  return (
    <div className={`group relative rounded-xl border p-4 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.03)] transition-all duration-300 hover:shadow-xl hover:shadow-black/40 ${
      isHighlighted
        ? "border-amber-500/60 bg-amber-500/10 ring-1 ring-amber-500/40"
        : "border-zinc-800/80 bg-zinc-900/50 hover:border-zinc-700 hover:bg-zinc-900/90"
    }`}>
      <div className="flex items-start justify-between gap-3">
        <h3 className="wrap-anywhere text-base text-[14px] font-semibold leading-snug tracking-tight text-zinc-100">
          {item.title}
        </h3>

        <div className="flex items-center shrink-0">
          <div className="flex max-w-0 items-center overflow-hidden opacity-0 transition-all duration-200 ease-in-out group-hover:mr-2 group-hover:max-w-xs group-hover:opacity-100 focus-within:mr-2 focus-within:max-w-xs focus-within:opacity-100">
            <div className="flex items-center gap-0.5 rounded-lg border border-zinc-800 bg-zinc-950/80 p-0.5">
              <button
                onClick={onEdit}
                title="Edit issue"
                aria-label="Edit issue"
                className="flex h-6 w-6 items-center justify-center rounded-md text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-zinc-100 focus:outline-none focus:ring-1 focus:ring-zinc-600"
              >
                <Pencil size={12} />
              </button>

              <div className="h-3 w-px bg-zinc-800" />

              <button
                onClick={onDelete}
                title="Delete issue"
                aria-label="Delete issue"
                className="flex h-6 w-6 items-center justify-center rounded-md text-zinc-400 transition-colors hover:bg-rose-950/60 hover:text-rose-400 focus:outline-none focus:ring-1 focus:ring-rose-500/50"
              >
                <Trash2 size={12} />
              </button>
            </div>
          </div>

          <button
            onClick={onToggleStatus}
            className={`flex shrink-0 items-center gap-1.5 rounded-md border px-2 py-1 font-mono text-[10px] font-medium transition-all ${status.color}`}
          >
            <StatusIcon size={11} />
            {status.label}
          </button>
        </div>
      </div>

      <div className="mt-2 flex items-center gap-2">
        <span className="cursor-pointer font-mono text-[11px] font-semibold text-zinc-400 transition-colors hover:text-zinc-200">
          ISS-{item.id}
        </span>

        <span className="select-none text-zinc-700">•</span>

        {item.service && (
          <span className="wrap-anywhere rounded-md border border-zinc-700/40 bg-zinc-800/50 px-2 py-0.5 font-mono text-xs font-medium text-zinc-400">
            {item.service}
          </span>
        )}

        <span
          className={`inline-flex items-center justify-center rounded-md border px-2 py-0.5 font-mono text-[10px] font-bold ${severity.color}`}
        >
          {severity.label}
        </span>
      </div>

      {stepsList.length > 0 && (
        <div className="mt-3.5 border-t border-zinc-800/50 pt-3">
          <div className="flex items-center mb-1.5 gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-zinc-500">
            <span>Reproduction Steps</span>
          </div>

          <ul className="mt-2 space-y-1.5">
            {stepsList.map((line, i) => (
              <li
                key={i}
                className="flex items-start gap-2 text-xs leading-relaxed text-zinc-400"
              >
                <ChevronRight size={12} className="mt-0.5 shrink-0 text-zinc-600" />
                <span className="wrap-anywhere">{line}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
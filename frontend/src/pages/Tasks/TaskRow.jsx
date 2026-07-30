import React from "react";
import {
  Circle,
  CheckCircle2,
  Clock,
  AlertCircle,
  Trash2,
} from "lucide-react";

export default function BacklogRow(props) {
  function getStatusBadge() {
    if (props.completed) {
      return (
        <span className="flex items-center gap-1.5 rounded-lg border border-emerald-800/50 bg-emerald-950/60 px-2.5 py-1 text-xs font-medium text-emerald-400">
          <CheckCircle2 size={12} />
          Done
        </span>
      );
    }

    return (
      <span className="flex items-center gap-1.5 rounded-lg border border-zinc-700 bg-zinc-800 px-2.5 py-1 text-xs font-medium text-zinc-300">
        <Clock size={12} />
        Planning
      </span>
    );
  }

  function getPriorityBadge() {
    if (props.priority === "High") {
      return (
        <span className="rounded border border-rose-800/50 bg-rose-950/60 px-2 py-0.5 text-xs font-semibold text-rose-400">
          High
        </span>
      );
    }

    if (props.priority === "Medium") {
      return (
        <span className="rounded border border-amber-800/50 bg-amber-950/60 px-2 py-0.5 text-xs font-semibold text-amber-400">
          Medium
        </span>
      );
    }

    return (
      <span className="rounded border border-emerald-800/50 bg-emerald-950/60 px-2 py-0.5 text-xs font-semibold text-emerald-400">
        Low
      </span>
    );
  }

  return (
    <div className="group rounded-xl border border-zinc-800/80 bg-zinc-900/30 p-5 transition-all hover:border-zinc-700">
      <div className="flex items-start justify-between gap-4">
        <div className="flex flex-1 gap-4">
          <button
            onClick={props.onToggleComplete}
            className="mt-0.5 text-zinc-500 transition-colors hover:text-zinc-300"
          >
            {props.completed ? (
              <CheckCircle2 size={18} className="text-emerald-500" />
            ) : (
              <Circle size={18} />
            )}
          </button>

          <div className="flex-1 space-y-2">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs font-semibold text-zinc-500">
                #{props.id}
              </span>

              <span className="rounded border border-zinc-700/50 bg-zinc-800/50 px-2 py-0.5 text-xs text-zinc-400">
                {props.project}
              </span>

              {getPriorityBadge()}
            </div>

            <h3
              className={`text-base font-semibold ${
                props.completed
                  ? "text-zinc-500 line-through"
                  : "text-zinc-100"
              }`}
            >
              {props.title}
            </h3>

            {props.description && (
              <p className="text-sm leading-relaxed text-zinc-400">
                {props.description}
              </p>
            )}
          </div>
        </div>

        <div className="flex flex-col items-end gap-3">
          {getStatusBadge()}

          <button
            onClick={props.onDelete}
            className="rounded-lg p-2 text-zinc-500 opacity-0 transition-all hover:bg-rose-950/60 hover:text-rose-400 group-hover:opacity-100"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
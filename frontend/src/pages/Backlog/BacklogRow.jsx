import React from "react";
import {
  Circle,
  CheckCircle2,
  Trash2,
} from "lucide-react";

export default function BacklogRow(props) {
  return (
    <div className="rounded-xl border border-zinc-800/80 bg-zinc-900/30 p-5 hover:border-zinc-700 transition-all group">

      <div className="flex items-start justify-between gap-4">

        <div className="flex gap-4 flex-1 min-w-0">

          <button
            onClick={props.onToggleComplete}
            className="mt-0.5 text-zinc-500 hover:text-zinc-300 transition-all"
          >
            {props.completed ? (
              <CheckCircle2 size={18} className="text-emerald-500" />
            ) : (
              <Circle size={18} />
            )}
          </button>

          <div className="flex-1 min-w-0">

            <div className="flex items-center gap-2 flex-wrap mb-2">
              <span className="text-[11px] font-mono text-zinc-500">
                {props.id}
              </span>

              <span className="rounded-md border border-zinc-700/50 bg-zinc-800/50 px-2 py-0.5 text-[10px] text-zinc-400">
                {props.project}
              </span>

              <span
                className={`rounded-md border px-2 py-0.5 text-[10px] font-semibold
                  ${
                    props.priority === "High"
                      ? "border-rose-900/40 bg-rose-950/20 text-rose-400"
                      : props.priority === "Medium"
                      ? "border-yellow-900/40 bg-yellow-950/20 text-yellow-400"
                      : "border-emerald-900/40 bg-emerald-950/20 text-emerald-400"
                  }`}
              >
                {props.priority}
              </span>
            </div>

            <h3
              className={`text-base font-semibold ${
                props.completed
                  ? "line-through text-zinc-500"
                  : "text-zinc-100"
              }`}
            >
              {props.title}
            </h3>

            {props.description && (
              <p className="mt-2 text-sm leading-6 text-zinc-400">
                {props.description}
              </p>
            )}

          </div>
        </div>

        <button
          onClick={props.onDelete}
          className="opacity-0 group-hover:opacity-100 rounded-lg p-2 text-zinc-500 hover:bg-rose-950 hover:text-rose-400 transition-all"
        >
          <Trash2 size={17} />
        </button>

      </div>

      {/* Leave space here for future progress bars / acceptance criteria */}
      {/*
      <div className="mt-4 border-t border-zinc-800 pt-4">
        Your progress bars or acceptance criteria go here.
      </div>
      */}
    </div>
  );
}
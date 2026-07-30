import React from "react";
import { ChevronRight } from "lucide-react";

export default function UpcomingTasks(props) {
  return (
    <div className="rounded-lg border border-zinc-800/60 bg-zinc-950/30 p-4 hover:border-zinc-700 transition-all">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-sm font-semibold text-zinc-200">
            {props.title}
          </h4>

          <p className="mt-1 text-xs text-zinc-500">
            {props.projects}
          </p>
        </div>

        <span className="text-xs font-semibold text-zinc-300">
          {props.progress}%
        </span>
      </div>

      {/* Progress Bar (Implement later) */}
      <div className="mt-4 h-2 rounded-full bg-zinc-800 overflow-hidden">
        {/* <div
          className="h-full rounded-full bg-zinc-100 transition-all"
          style={{ width: `${props.progress}%` }}
        /> */}
      </div>

      <div className="mt-4 flex items-center justify-between">
        <span
          className={`rounded-md px-2 py-1 text-[10px] font-medium ${
            props.priority === "High"
              ? "bg-rose-950/40 text-rose-300"
              : props.priority === "Medium"
              ? "bg-yellow-950/40 text-yellow-300"
              : "bg-emerald-950/40 text-emerald-300"
          }`}
        >
          {props.priority}
        </span>

        <button className="flex items-center gap-1 text-xs text-zinc-500 hover:text-zinc-300 transition-colors">
          Open
          <ChevronRight size={12} />
        </button>
      </div>
    </div>
  );
}
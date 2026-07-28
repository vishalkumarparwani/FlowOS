import React from "react";
import { Circle, CheckCircle2, Trash2 } from "lucide-react";

export default function TaskRow(props) {

    return (
        <div className="mt-6.5 rounded-xl px-4 py-3 border-b-2 hover:border-zinc-700 hover:bg-zinc-900 transition-all border-zinc-800 group flex items-center justify-between">
            <div className="flex gap-4 flex-1 min-w-0">
                <button
                    onClick={props.onToggleComplete}
                    className="text-zinc-500 hover:text-zinc-300 active:scale-90 transition-all duration-150"
                >
                    {props.completed ? (<CheckCircle2 size={18} className="text-emerald-500" />) : <Circle size={18} />}
                </button>
                <div className="min-w-0">
                    <p
                        className={`text-sm font-semibold truncate ${props.completed
                                ? "line-through text-zinc-500"
                                : "text-white"
                            }`}
                    >
                        {props.title}
                    </p>

                    <span className="text-[14px] text-zinc-500 truncate block">
                        {props.project}
                    </span>
                </div>
            </div>

            <div className="flex items-center">
                <div className="w-28">
                    <span
                        className={`text-[14px] px-3 py-0.5 rounded-md border font-semibold 
                            ${props.priority === "High"
                                ? "text-rose-400 bg-rose-950/20 border-rose-900/30"
                                : props.priority === "Medium"
                                    ? "text-yellow-500 bg-yellow-950/20 border-yellow-900/30"
                                    : props.priority === "Low"
                                        ? "text-green-400 bg-green-950/20 border-green-400/40" : "border-0"
                            }`}
                    >
                        {props.priority}
                    </span>
                </div>

                <span className="w-20 text-zinc-400 whitespace-nowrap">
                    {props.due_date || "—"}
                </span>

                <button
                    onClick={props.onDelete}
                    className="w-10 h-10 ml-3 flex items-center justify-center rounded-lg text-zinc-500 hover:text-rose-400 hover:bg-rose-950 opacity-0 group-hover:opacity-100 transition-opacity duration-100">
                    <Trash2 size={18} />
                </button>
            </div>
        </div>
    );
}
import React from "react";
import { CheckCircle, Circle } from "lucide-react";

export default function TaskRow(props) {

    return (
        <div className="flex items-center justify-between mt-6.5">
            <div className="flex gap-4">
                <button className="text-zinc-500 hover:text-zinc-300 transition-all">
                    {props.completed ? (<CheckCircle size={18} className="text-emerald-500" />) : <Circle size={18} />}
                </button>
                <div>
                    <p className={`text-sm font-semibold ${props.completed ? 'line-through text-zinc-500' : 'text-white'}`}>
                        {props.title}
                    </p>
                    <span className="text-[14px] text-zinc-500">
                        {props.project}
                    </span>
                </div>
            </div>

            <div className="flex items-center">
                <div className="w-28">
                    <span
                        className={`text-[14px] px-3 py-0.5 rounded-md border font-semibold ${props.priority === "High"
                                ? "text-rose-400 bg-rose-950/20 border-rose-900/30"
                                : props.priority === "Medium"
                                    ? "text-yellow-500 bg-yellow-950/20 border-yellow-900/30"
                                    : "text-green-400 bg-green-950/20 border-green-400/40"
                            }`}
                    >
                        {props.priority}
                    </span>
                </div>

                <span className="w-20 text-zinc-400">
                    {props.dueDate}
                </span>
            </div>
        </div>
    );
}
import React from "react";


export default function DashboardCards(props) {

    const Icon = props.icon

    return (
        <div className="flex flex-col w-56 border rounded-xl border-zinc-800 p-6 hover:border-zinc-300 transition-all">
            <div className="flex items-center justify-between gap-3">
                <span className="text-sm font-medium text-zinc-400">
                    {props.title}
                </span>

                <div className={`h-8 w-8 flex items-center justify-center rounded-lg border p-1.5 border-zinc-700 ${props.iconStyle}`}>
                    <Icon size={15} />
                </div>
            </div>

            <div className="mt-4">
                <h3 className="text-2xl font-bold hover:translate-x-0.5 duration-300">
                    {props.value}
                </h3>
                <p className="mt-1 text-[11px] text-zinc-500">
                    {props.description}
                </p>
            </div>
        </div>
    );
}
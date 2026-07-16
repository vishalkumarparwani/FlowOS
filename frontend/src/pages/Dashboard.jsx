import React from "react";
import DashboardCards from "../components/DashboardCards";
import {
    Plus
} from "lucide-react";

import { Clock } from "lucide-react";

export default function Dashboard() {

    const stats = [
        {
            title: "Total Tasks Completed",
            value: 6,
            description: "+8% from last week",
            icon: Clock,
            iconStyle: ""
        },
        {
            title: "Total Tasks Completed",
            value: 6,
            description: "+8% from last week",
            icon: Clock,
            iconStyle: ""
        },
        {
            title: "Total Tasks Completed",
            value: 6,
            description: "+8% from last week",
            icon: Clock,
            iconStyle: ""
        },
        {
            title: "Total Tasks Completed",
            value: 6,
            description: "+8% from last week",
            icon: Clock,
            iconStyle: ""
        }
    ];

    return (
        <div className="mt-8 space-y-8 animate-fade-in">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                        Welcome back, Vishal.
                    </h1>

                    <p className="text-sm text-zinc-400 mt-1">
                        Here's what is happening in your workspace today.
                    </p>
                </div>

                <button className="flex items-center gap-2 rounded-lg bg-zinc-100 px-4 py-2 text-sm font-semibold text-zinc-950 hover:bg-zinc-200">
                    <Plus size={16} />
                    Create New Task
                </button>
            </div>

            <div className="flex mt-6 gap-3">
                {stats.map((stat, index) => {
                    return (
                        <DashboardCards
                            key={index}
                            title={stat.title}
                            value={stat.value}
                            description={stat.description}
                            icon={stat.icon}
                        />
                    );
                })}
            </div>
        </div>
    );
}
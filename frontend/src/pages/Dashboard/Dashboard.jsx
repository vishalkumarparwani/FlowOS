import React from "react";
import DashboardCard from "./DashboardCard";
import UpcomingTasks from "./UpcomingTasks";
import RecentActivity from "./RecentActivity";

import {
    Plus,
    Clock,
    CheckCircle2,
    TrendingUp,
    AlertCircle,
    ArrowUpRight,
} from "lucide-react";

export default function Dashboard() {

    const stats = [
        {
            title: "Total Tasks Completed",
            value: '12',
            description: "+8% from last week",
            icon: CheckCircle2,
            iconStyle: "text-emerald-400 bg-emerald-950/50"
        },
        {
            title: "Active Projects",
            value: '6',
            description: "2 near deadline date",
            icon: Clock,
            iconStyle: "text-yellow-500 bg-yellow-950/50"
        },
        {
            title: "WokSpace Efficiency",
            value: '94%',
            description: "+1.2% Optimization speed",
            icon: TrendingUp,
            iconStyle: "text-blue-400 bg-blue-950/40"
        },
        {
            title: "Pending Actions",
            value: '3',
            description: "Urgent attention required",
            icon: AlertCircle,
            iconStyle: "text-rose-400 bg-rose-950/40"
        }
    ];

    const recentTasks = [
        { id: 1, title: "Dashboard completion", projects: "FlowOS v2", done: false, priority: "High" },
        { id: 2, title: "Routing", projects: "FlowOS v2", done: false, priority: "Medium" },
        { id: 3, title: "Task 3", projects: "FlowOS v2", done: false, priority: "Low" },
    ];

    return (
        <div className="mt-8 space-y-8 animate-fade-in">
            <div>
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
                            <DashboardCard
                                key={index}
                                title={stat.title}
                                value={stat.value}
                                description={stat.description}
                                icon={stat.icon}
                                iconStyle={stat.iconStyle}
                            />
                        );
                    })}
                </div>
            </div>

            <div className="flex">
                <div className="flex-1 rounded-xl border p-5">
                    <div className="flex items-center justify-between">
                        <h1>Upcoming Tasks</h1>

                        <button className="flex">
                            View all tasks
                            <ArrowUpRight size={16} />
                        </button>
                    </div>

                    <div>
                        <button>
                            {recentTasks.map((task) => {
                                return (
                                    <UpcomingTasks
                                        key={task.id}
                                        title={task.title}
                                        project={task.prokect}
                                        done={task.done}
                                        priority={task.priority}
                                    />
                                );
                            })}
                        </button>
                    </div>


                </div>
            </div>

        </div>
    );
}
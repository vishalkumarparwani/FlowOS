import React from "react";
import DashboardCard from "./DashboardCard";
import UpcomingTasks from "./UpcomingTasks";
import RecentActivity from "./Pomodoro";

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
        { id: 2, title: "Routing", projects: "FlowOS v2", done: true, priority: "Medium" },
        { id: 3, title: "Task 3", projects: "FlowOS v2", done: false, priority: "Low" },
        { id: 4, title: "Routing", projects: "TaskSphere", done: false, priority: "" },
    ];

    return (
        <div className="mt-5 px-12 space-y-8 animate-fade-in">
            <div>
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                            Welcome back, Sarah.
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

                <div className="grid mt-6 gap-4 sm:grid-cols-2 lg:grid-cols-4">
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

            <div className="grid gap-6 lg:grid-cols-3">

                <div className="rounded-xl border border-zinc-800/50 p-5 lg:col-span-2">
                    <div className="flex items-center justify-between pb-4 border-b border-zinc-900">
                        <h3 className="text-sm font-semibold text-zinc-200">
                            Upcoming Tasks
                        </h3>

                        <button className="flex items-center gap-1 text-xs text-zinc-500 hover:text-zinc-300 transition-all">
                            View all tasks
                            <ArrowUpRight size={12} />
                        </button>
                    </div>

                    <div className="mt-4 divide-y divide-zinc-900/40">
                        {recentTasks.map((task) => {
                            return (
                                <UpcomingTasks
                                    key={task.id}
                                    title={task.title}
                                    projects={task.projects}
                                    done={task.done}
                                    priority={task.priority}
                                />
                            );
                        })}
                    </div>
                </div>

                <div className="h-full">
                    <RecentActivity />
                </div>

            </div>
        </div>
    );
}
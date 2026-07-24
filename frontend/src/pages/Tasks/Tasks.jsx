import React from 'react';
import TaskRow from "./TaskRow"

import {
    Plus,
    Search,
    Filter,
    ArrowUpDown,
    MoreHorizontal,
    Check,
    ClipboardList,
    ChevronDown
} from "lucide-react";

export default function Tasks() {

    const TASKS_DATA = [
        {
            id: '1',
            title: 'Refactor Sidebar Layout',
            project: 'FlowOS Core',
            priority: 'High',
            dueDate: 'Today',
            completed: false
        },
        {
            id: '2',
            title: 'Implement Pomodoro Logic',
            project: 'Productivity Module',
            priority: 'Medium',
            dueDate: 'Tomorrow',
            completed: false
        },
        {
            id: '3',
            title: 'Connect PostgreSQL Repository',
            project: 'Backend Infrastructure',
            priority: 'High',
            dueDate: 'Jul 28',
            completed: false
        },
        {
            id: '4',
            title: 'Design Calendar Page',
            project: 'Design System',
            priority: 'Low',
            dueDate: 'Jul 30',
            completed: false
        },
        {
            id: '5',
            title: 'Fix Authentication Middleware',
            project: 'FlowOS Core',
            priority: 'High',
            dueDate: 'Jul 22',
            completed: true
        },
        {
            id: '6',
            title: 'Deploy FastAPI Backend',
            project: 'Backend Infrastructure',
            priority: 'Medium',
            dueDate: 'Aug 02',
            completed: false
        },
        {
            id: '7',
            title: 'Optimize React Rendering',
            project: 'Performance',
            priority: 'Low',
            dueDate: 'Aug 05',
            completed: false
        },
        {
            id: '8',
            title: 'Build AI Assistant Chat',
            project: 'AI Studio',
            priority: 'High',
            dueDate: 'Aug 10',
            completed: false
        }
    ];

    return (
        <div className="mt-5 px-12 space-y-8 animate-fade-in">

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                        Tasks
                    </h1>

                    <p className="text-sm text-zinc-400 mt-1">
                        Manage your work across all projects.
                    </p>
                </div>

                <button className="flex items-center gap-2 rounded-lg bg-zinc-100 px-4 py-2 text-sm font-semibold text-zinc-950 hover:bg-zinc-200">
                    <Plus size={16} />
                    New Task
                </button>
            </div>

            <div className='flex items-center justify-between'>
                <div className="relative w-full sm:w-80">
                    <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
                    <input
                        type="text"
                        readOnly
                        placeholder="Search tasks..."
                        className="w-full bg-zinc-900/60 border border-zinc-800/80 rounded-lg py-1.5 pl-9 pr-3 text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-zinc-700 transition-all cursor-pointer"
                    />
                </div>

                <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
                    <button className="flex items-center gap-1.5 bg-zinc-900/60 hover:bg-zinc-900 border border-zinc-800/80 text-zinc-300 text-xs px-3 py-1.5 rounded-lg transition-colors">
                        <Filter size={13} className="text-zinc-400" />
                        <span>Filter</span>
                    </button>

                    <button className="flex items-center gap-1.5 bg-zinc-900/60 hover:bg-zinc-900 border border-zinc-800/80 text-zinc-300 text-xs px-3 py-1.5 rounded-lg transition-colors">
                        <ArrowUpDown size={13} className="text-zinc-400" />
                        <span>Sort</span>
                        <ChevronDown size={12} className="text-zinc-500 ml-0.5" />
                    </button>
                </div>

            </div>

            <div className="flex items-center gap-1.5 mb-4 border-b border-zinc-900 pb-3">
                    <button className="bg-zinc-800 text-zinc-100 border border-zinc-700/60 text-xs font-medium px-3 py-1.5 rounded-lg transition-all">
                        All (12)
                    </button>
                    <button className="text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900 text-xs font-medium px-3 py-1.5 rounded-lg transition-all">
                        Active (8)
                    </button>
                    <button className="text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900 text-xs font-medium px-3 py-1.5 rounded-lg transition-all">
                        Completed (4)
                    </button>
                </div>

            <div className="px-7 rounded-xl border border-zinc-800/80 bg-zinc-900/30 lg:col-span-2">
                <div className="mt-4 divide-y divide-zinc-900/40">
                    {TASKS_DATA.map((task) => {
                        return (
                            <TaskRow
                                key={task.id}
                                title={task.title}
                                project={task.project}
                                priority={task.priority}
                                dueDate={task.dueDate}
                                completed={task.completed}
                            />
                        );
                    })}
                </div>
            </div>

        </div>
    );
}
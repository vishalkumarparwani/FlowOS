import React, { useState, useEffect } from 'react';
import TaskRow from "./TaskRow"
import { getTasks, createTask, updateTask, deleteTask } from '../../api'

import {
    Plus,
    Search,
    Filter,
    ArrowUpDown,
    ChevronDown,
    X
} from "lucide-react";
import TaskForm from './TaskForm';

export default function Tasks() {

    const [tasks, setTasks] = useState([]);
    const [filter, setFilter] = useState("all");
    const [search, setSearch] = useState("")
    const [isFormOpen, setIsFormOpen] = useState(false);

    useEffect(() => {
        async function fetchData() {
            try {
                await loadTasks();
            } catch (err) {
                console.error("Failed to load tasks: ", err);
            }
        }
        fetchData();
    }, [])

    async function loadTasks() {
        const data = await getTasks();
        setTasks(data);
    }

    const filterTasks = tasks.filter((task) => {
        if (filter === "active") return !task.completed;
        if (filter === "completed") return task.completed;
        return true;
    }).filter((task) => {
        const query = search.toLowerCase();

        return (
            task.title.toLowerCase().includes(query) ||
            task.project.toLowerCase().includes(query) ||
            task.priority.toLowerCase().includes(query) ||
            // task.status.toLowerCase() ||
            (task.due_date || "").toLowerCase().includes(query)
        );
    })

    async function handleCreateTask(taskData) {
        await createTask(taskData);
        loadTasks();
        // setIsFormOpen(false);
    }

    async function handleToggleComplete(taskData) {
        await updateTask(taskData.id, { ...taskData, completed: !taskData.completed });
        loadTasks();
    }

    async function handleDeleteTask(task_id) {
        await deleteTask(task_id);
        loadTasks();
    }

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

                <button
                    className="flex items-center gap-2 rounded-lg bg-zinc-100 px-4 py-2 text-sm font-semibold text-zinc-950 hover:bg-zinc-200"
                    onClick={() => setIsFormOpen(!isFormOpen)}>
                    {isFormOpen ? (
                        <>
                            <X size={16} />
                            Cancel
                        </>
                    ) : (
                        <>
                            <Plus size={16} />
                            New Task
                        </>
                    )}
                </button>
            </div>

            {isFormOpen && (
                <TaskForm
                    onSubmit={handleCreateTask}
                />
            )}

            <div className='flex items-center justify-between'>
                <div className="relative w-full sm:w-80">
                    <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search tasks..."
                        className="w-full bg-zinc-900/60 border border-zinc-800/80 rounded-lg py-2 pl-9 pr-3 text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-zinc-700 transition-all cursor-pointer"
                    />
                </div>

                <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
                    <button className="flex items-center gap-1.5 bg-zinc-900/60 hover:bg-zinc-900 border border-zinc-800/80 text-zinc-300 text-xs px-3 py-1.5 rounded-lg transition-colors">
                        <Filter size={13} className="text-zinc-400" />
                        <span>Filter</span>
                    </button>

                    <button className="flex items-center gap-1.5 bg-zinc-900/60 hover:bg-zinc-900 border border-zinc-800/80 text-zinc-300 text-xs px-3 py-1.5 rounded-lg transition-colors">
                        <ArrowUpDown size={13} className="text-zinc-400" />
                        
                        <ChevronDown size={12} className="text-zinc-500 ml-0.5" />
                    </button>
                </div>

            </div>

            <div className="flex items-center gap-1.5 mb-4 border-b border-zinc-900 pb-3">
                <button
                    onClick={() => setFilter("all")}
                    className={`text-xs font-medium px-3 py-1.5 rounded-lg border transition-colors duration-150 ${filter === "all"
                        ? "bg-zinc-800 text-zinc-100 border-zinc-700/60"
                        : "border-transparent text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900"
                        }`}
                >
                    All ({tasks.length})
                </button>

                <button
                    onClick={() => setFilter("active")}
                    className={`text-xs font-medium px-3 py-1.5 rounded-lg border transition-colors duration-150 ${filter === "active"
                        ? "bg-zinc-800 text-zinc-100 border-zinc-700/60"
                        : "border-transparent text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900"
                        }`}
                >
                    Active ({tasks.filter((t) => !t.completed).length})
                </button>

                <button
                    onClick={() => setFilter("completed")}
                    className={`text-xs font-medium px-3 py-1.5 rounded-lg border transition-colors duration-150 ${filter === "completed"
                            ? "bg-zinc-800 text-zinc-100 border-zinc-700/60"
                            : "border-transparent text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900"
                        }`}
                >
                    Completed ({tasks.filter((t) => t.completed).length})
                </button>
            </div>

            <div className="px-7 pb-7 rounded-xl border border-zinc-800/80 bg-zinc-900/30 lg:col-span-2">
                <div className="mt-7 divide-y divide-zinc-900/40">
                    {filterTasks.length === 0 ? (
                        <p className="text-sm tex-zinc-500 text-center py-8 pb-10">
                            No tasks yet — add one to get started.
                        </p>
                    ) : (
                        filterTasks.map((task) => {
                            return (
                                <TaskRow
                                    key={task.id}
                                    title={task.title}
                                    project={task.project}
                                    priority={task.priority}
                                    due_date={task.due_date}
                                    completed={task.completed}
                                    onToggleComplete={() => handleToggleComplete(task)}
                                    onDelete={() => handleDeleteTask(task.id)}
                                />
                            );
                        })
                    )}
                </div>
            </div>
        </div>
    );
}


// SORT COMPLEXITY
// <div>
//     <label className="text-xs text-zinc-400">Due Date</label>
//     <select className="bg-zinc-900 border border-zinc-800 rounded-lg text-xs px-3 py-1.5">
//         <option value="soonest">Soonest</option>
//         <option value="latest">Latest</option>
//         <option value="today">Today</option>
//         <option value="overdue">Overdue</option>
//     </select>
// </div>

// <div>
//     <label className="text-xs text-zinc-400">Priority</label>
//     <select className="bg-zinc-900 border border-zinc-800 rounded-lg text-xs px-3 py-1.5">
//         <option value="high">High</option>
//         <option value="medium">Medium</option>
//         <option value="low">Low</option>
//     </select>
// </div>
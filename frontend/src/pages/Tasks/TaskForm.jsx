import React, { useState } from 'react';
import { Plus, CalendarCheckIcon } from 'lucide-react';

export default function TaskForm({ onSubmit }) {

    const [title, setTitle] = useState('');
    const [project, setProject] = useState('');
    const [priority, setPriority] = useState('');
    const [due_date, setDueDate] = useState('');

    function handleSubmit() {
        if (!title.trim()) return;

        onSubmit({
            title,
            project,
            priority,
            status: 'planning',
            due_date: due_date || null,
        });

        setTitle('');
        setProject('');
        setPriority('Medium');
        setDueDate('');
    }

    return (
        <div className="px-5 py-4 max-w-4xl mx-auto rounded-xl border border-zinc-800/80 bg-zinc-900/30 lg:col-span-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Task title"
                    className="flex-1 p-2 pl-5 text-xs max-w-64 min-w-0 bg-zinc-900/60 border border-zinc-800/80 rounded-lg text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-zinc-700 transition-all cursor-pointer"
                />
                <input
                    type="text"
                    value={project}
                    onChange={(e) => setProject(e.target.value)}
                    placeholder="Project"
                    className="flex-1 p-2 pl-5 text-xs max-w-64 min-w-0 bg-zinc-900/60 border border-zinc-800/80 rounded-lg text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-zinc-700 transition-all cursor-pointer"
                />
                <select
                    value={priority} onChange={(e) => setPriority(e.target.value)}
                    className="flex-1 p-2 pl-5 text-sm rounded-lg border border-zinc-800/80 bg-zinc-900/60 text-zinc-200"
                >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                </select>
                <input
                    type="date"
                    value={due_date}
                    onChange={(e) => setDueDate(e.target.value)}
                    className="flex-1 p-2 pl-5 text-sm rounded-lg border border-zinc-800/80 bg-zinc-900/60 text-zinc-200"
                />
                <button
                    className="flex items-center gap-2 rounded-lg bg-zinc-100 px-4 py-2 text-sm font-semibold text-zinc-950 hover:bg-zinc-200 cursor-pointer"
                    onClick={handleSubmit}
                >
                    <Plus size={16} />
                    New Task
                </button>
            </div>
        </div>
    );
}
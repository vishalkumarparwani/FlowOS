import React, { useState } from 'react';
import { Plus } from 'lucide-react';

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
            due_date: due_date || null
        });

        setTitle('')
        setProject('')
        setPriority('medium')
        setDueDate('');
    }

    return (
        <div className="px-7 rounded-xl border border-zinc-800/80 bg-zinc-900/30 lg:col-span-2">
            <div className='flex items-center'>
                <input
                    type="text"
                    value={title}
                    placeholder="Task title"
                    className="w-full bg-zinc-900/60 border border-zinc-800/80 rounded-lg py-1.5 pl-9 pr-3 text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-zinc-700 transition-all cursor-pointer"
                />
                <input
                    type="text"
                    value={project}
                    placeholder="Project (optional)"
                    className="w-full bg-zinc-900/60 border border-zinc-800/80 rounded-lg py-1.5 pl-9 pr-3 text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-zinc-700 transition-all cursor-pointer"
                />
                <select
                    value={priority} onChange={(parameter) => setPriority(parameter)}
                    className="rounded-lg border border-zinc-800/80 bg-zinc-900/60 px-3 py-1.5 text-xs text-zinc-200"
                >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                </select>
                <input
                    type="date"
                    value={due_date}
                    className="rounded-lg border border-zinc-800/80 bg-zinc-900/60 px-3 py-1.5 text-xs text-zinc-200"
                />
                <button
                    className="flex items-center gap-2 rounded-lg bg-zinc-100 px-4 py-2 text-sm font-semibold text-zinc-950 hover:bg-zinc-200"
                    onClick={handleSubmit}
                >
                    <Plus size={16} />
                    New Task
                </button>
            </div>
        </div>
    );
}
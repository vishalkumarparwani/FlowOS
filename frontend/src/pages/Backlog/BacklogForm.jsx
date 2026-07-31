import React, { useState } from 'react';

export default function TaskForm({ onSubmit, onCancel }) {

    const [title, setTitle] = useState('');
    const [project, setProject] = useState('');
    const [due_date, setDueDate] = useState('');
    const [complexity, setComplexity] = useState('M');
    const [acceptanceCriteria, setAcceptanceCriteria] = useState('');

    function handleSubmit(e) {
        e.preventDefault();
        if (!title.trim()) return;

        onSubmit({
            title,
            project,
            priority: 'Medium',
            status: 'planning',
            due_date: due_date || null,
            complexity,
            acceptance_criteria: acceptanceCriteria,
        });

        setTitle('');
        setProject('');
        setDueDate('');
        setComplexity('M');
        setAcceptanceCriteria('');
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="space-y-5 bg-zinc-900/60 border border-zinc-800 rounded-xl p-5"
        >
            <h3 className="text-sm font-semibold text-zinc-100">
                Quick Backlog Entry
            </h3>

            <div className="space-y-1.5">
                <label className="text-xs font-medium text-indigo-400">
                    Task Title
                </label>
                <input
                    type="text"
                    placeholder="e.g. Implement Redis Rate Limiter Middleware"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-zinc-600"
                />
            </div>

            <div className="space-y-1.5">
                <label className="text-xs font-medium text-zinc-400">
                    Project
                </label>
                <input
                    type="text"
                    placeholder="e.g. FlowOS"
                    value={project}
                    onChange={(e) => setProject(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-zinc-600"
                />
            </div>

            <div className="space-y-1.5">
                <label className="text-xs font-medium text-indigo-400">
                    Complexity
                </label>
                <select
                    value={complexity}
                    onChange={(e) => setComplexity(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-zinc-100 focus:outline-none focus:border-zinc-600"
                >
                    <option value="S">S - Small (1-2 pts)</option>
                    <option value="M">M - Medium (3-5 pts)</option>
                    <option value="L">L - Large (6-8 pts)</option>
                    <option value="XL">XL - Extra Large (13+ pts)</option>
                </select>
            </div>

            <div className="space-y-1.5">
                <label className="text-xs font-medium text-zinc-400">
                    Due Date
                </label>
                <input
                    type="date"
                    value={due_date}
                    onChange={(e) => setDueDate(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-zinc-100 focus:outline-none focus:border-zinc-600"
                />
            </div>

            <div className="space-y-1.5">
                <label className="text-xs font-medium text-indigo-400">
                    Acceptance Criteria (One per line)
                </label>
                <textarea
                    rows={3}
                    placeholder={"Return 429 Too Many Requests when rate limit exceeded\nInclude X-RateLimit-Remaining header in response"}
                    value={acceptanceCriteria}
                    onChange={(e) => setAcceptanceCriteria(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-zinc-600 font-mono resize-y"
                />
            </div>

            <div className="flex justify-end gap-3 pt-2">
                <button
                    type="button"
                    onClick={onCancel}
                    className="px-4 py-2 rounded-lg text-sm text-zinc-400 hover:text-zinc-200 transition-colors"
                >
                    Cancel
                </button>

                <button
                    type="submit"
                    className="bg-zinc-100 text-zinc-950 hover:bg-zinc-200 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                >
                    Add to Backlog
                </button>
            </div>
        </form>
    );
}
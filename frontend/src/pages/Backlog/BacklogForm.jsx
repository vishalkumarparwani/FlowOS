import React from 'react';

export default function TaskForm({ onSubmit, onCancel }) {

    function handleSubmit(e) {
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="space-y-4 bg-zinc-900/60 border border-zinc-800 rounded-xl p-5"
        >
            <h3 className="text-sm font-semibold text-zinc-100">
                New Task
            </h3>

            <div className="space-y-1">
                <label className="text-xs font-medium text-zinc-400">
                    Task Title
                </label>
                <input
                    type="text"
                    placeholder="e.g. Fix login redirect bug"
                    onChange={(e) => {}}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-zinc-600"
                />
            </div>

            <div className="space-y-1">
                <label className="text-xs font-medium text-zinc-400">
                    Project
                </label>
                <input
                    type="text"
                    placeholder="e.g. FlowOS"
                    onChange={(e) => {}}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-zinc-600"
                />
            </div>

            <div className="space-y-1">
                <label className="text-xs font-medium text-zinc-400">
                    Priority
                </label>
                <select
                    onChange={(e) => {}}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-zinc-100 focus:outline-none focus:border-zinc-600"
                >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                </select>
            </div>

            <div className="space-y-1">
                <label className="text-xs font-medium text-zinc-400">
                    Due Date
                </label>
                <input
                    type="date"
                    onChange={(e) => {}}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-zinc-100 focus:outline-none focus:border-zinc-600"
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
                    Add Task
                </button>
            </div>
        </form>
    );
}
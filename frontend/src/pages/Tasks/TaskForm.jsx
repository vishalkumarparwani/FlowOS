import React, { useState } from "react";

export default function BacklogForm({ onSubmit }) {
    const [title, setTitle] = useState("");
    const [epic, setEpic] = useState("");
    const [priority, setPriority] = useState("Medium");
    const [acceptanceCriteria, setAcceptanceCriteria] = useState("");

    function handleSubmit(e) {
        e.preventDefault();

        if (!title.trim()) return;

        onSubmit({
            title,
            epic,
            priority,
            status: "planning",
            acceptanceCriteria: acceptanceCriteria
                ? acceptanceCriteria.split("\n").filter(Boolean)
                : [],
        });

        setTitle("");
        setEpic("");
        setPriority("Medium");
        setAcceptanceCriteria("");
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="rounded-xl border border-zinc-800/80 bg-zinc-900/30 p-6"
        >
            <div className="grid grid-cols-1 gap-4">

                <div>
                    <label className="mb-1 block text-xs font-medium text-zinc-400">
                        Feature Title
                    </label>

                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Implement JWT Refresh Token Rotation"
                        className="w-full rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-2 text-sm text-zinc-100 placeholder-zinc-600 outline-none transition-colors focus:border-zinc-600"
                    />
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

                    <div>
                        <label className="mb-1 block text-xs font-medium text-zinc-400">
                            Epic
                        </label>

                        <input
                            type="text"
                            value={epic}
                            onChange={(e) => setEpic(e.target.value)}
                            placeholder="Authentication Service"
                            className="w-full rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-2 text-sm text-zinc-100 placeholder-zinc-600 outline-none transition-colors focus:border-zinc-600"
                        />
                    </div>

                    <div>
                        <label className="mb-1 block text-xs font-medium text-zinc-400">
                            Priority
                        </label>

                        <select
                            value={priority}
                            onChange={(e) => setPriority(e.target.value)}
                            className="w-full rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-2 text-sm text-zinc-100 outline-none focus:border-zinc-600"
                        >
                            <option>Low</option>
                            <option>Medium</option>
                            <option>High</option>
                            <option>Critical</option>
                        </select>
                    </div>

                </div>

                <div>
                    <label className="mb-1 block text-xs font-medium text-zinc-400">
                        Acceptance Criteria
                    </label>

                    <textarea
                        rows={5}
                        value={acceptanceCriteria}
                        onChange={(e) => setAcceptanceCriteria(e.target.value)}
                        placeholder={`Refresh token must be invalidated after use
                        Access token expires after 15 minutes
                        Return HTTP 401 for expired tokens`}
                        className="w-full rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-2 text-sm text-zinc-100 placeholder-zinc-600 outline-none transition-colors focus:border-zinc-600"
                    />
                </div>

                <div className="flex justify-end pt-2">
                    <button
                        type="submit"
                        className="rounded-lg bg-zinc-100 px-4 py-2 text-sm font-semibold text-zinc-950 transition-colors hover:bg-zinc-200"
                    >
                        Add to Backlog
                    </button>
                </div>

            </div>
        </form>
    );
}
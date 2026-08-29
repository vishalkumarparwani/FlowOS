import React, { useState, useEffect } from 'react';

const emptyForm = {
    title: "",
    service: "",
    due_date: "",
    severity: "P3",
    reproduction_steps: "",
};

export default function IssueForm({ initialValues, onSubmit, onCancel }) {

    const [formData, setFormData] = useState(emptyForm);

    useEffect(() => {
        if (initialValues) {
            setFormData(initialValues);
        }
    }, [initialValues])

    function handleSubmit(e) {
        e.preventDefault();
        if (!formData.title.trim()) return;

        onSubmit({
            ...formData,
            priority: formData.priority || "Medium",
            status: formData.status || "planning",
            due_date: formData.due_date || null,
        });
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="space-y-3 bg-zinc-900/60 border border-zinc-800 rounded-xl p-4"
        >
            <h3 className="text-sm font-semibold text-zinc-100">
                {initialValues ? "Edit Issue" : "Report New Issue"}
            </h3>

            <div className="space-y-1">
                <label className="text-xs font-medium text-indigo-400">
                    Issue Title
                </label>
                <input
                    type="text"
                    placeholder="e.g. App crashes when uploading large files"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value, })}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-1.5 text-sm text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-zinc-600"
                />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="space-y-1">
                    <label className="text-xs font-medium text-zinc-400">
                        Service
                    </label>
                    <input
                        type="text"
                        placeholder="e.g. Checkout flow"
                        value={formData.service}
                        onChange={(e) => setFormData({ ...formData, service: e.target.value, })}
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-1.5 text-sm text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-zinc-600"
                    />
                </div>

                <div className="space-y-1">
                    <label className="text-xs font-medium text-indigo-400">
                        Severity
                    </label>
                    <select
                        value={formData.severity}
                        onChange={(e) => setFormData({ ...formData, severity: e.target.value, })}
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-1.5 text-sm text-zinc-100 focus:outline-none focus:border-zinc-600"
                    >
                        <option value="P1">P1 - Critical</option>
                        <option value="P2">P2 - High</option>
                        <option value="P3">P3 - Medium</option>
                        <option value="P4">P4 - Low</option>
                    </select>
                </div>

                <div className="space-y-1">
                    <label className="text-xs font-medium text-zinc-400">
                        Due Date
                    </label>
                    <input
                        type="date"
                        value={formData.due_date}
                        onChange={(e) => setFormData({ ...formData, due_date: e.target.value, })}
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-1.5 text-sm text-zinc-100 focus:outline-none focus:border-zinc-600 [color-scheme:dark]"
                    />
                </div>
            </div>

            <div className="space-y-1">
                <label className="text-xs font-medium text-indigo-400">
                    Reproduction Steps (One per line)
                </label>
                <textarea
                    rows={2}
                    placeholder={"Upload a file over 500MB\nSwitch tabs mid-upload\nApp becomes unresponsive"}
                    value={formData.reproduction_steps}
                    onChange={(e) => setFormData({ ...formData, reproduction_steps: e.target.value, })}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-1.5 text-sm text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-zinc-600 font-mono resize-y"
                />
            </div>

            <div className="flex justify-end gap-3 pt-1">
                <button
                    type="button"
                    onClick={onCancel}
                    className="px-4 py-1.5 rounded-lg text-sm text-zinc-400 hover:text-zinc-200 transition-colors"
                >
                    Cancel
                </button>

                <button
                    type="submit"
                    className="bg-zinc-100 text-zinc-950 hover:bg-zinc-200 px-4 py-1.5 rounded-lg text-sm font-medium transition-colors"
                >
                    {initialValues ? "Save Changes" : "Add Issue"}
                </button>
            </div>
        </form>
    );
}
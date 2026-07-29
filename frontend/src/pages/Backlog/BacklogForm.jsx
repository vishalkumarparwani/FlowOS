import React, { useState } from 'react';
import { INITIAL_EPICS } from '../../api';

export default function BacklogForm({ onSubmit, onCancel }) {
  const [newItem, setNewItem] = useState({
    title: '',
    complexity: 'M',
    epic: 'Auth & Identity V2',
    acceptanceCriteria: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newItem.title.trim()) return;

    onSubmit({
      id: `BACK-${Math.floor(100 + Math.random() * 900)}`,
      title: newItem.title,
      complexity: newItem.complexity,
      status: 'planning',
      epic: newItem.epic,
      acceptanceCriteria: newItem.acceptanceCriteria
        ? newItem.acceptanceCriteria.split('\n').filter(Boolean)
        : ['Verify correct technical execution and schema constraints.']
    });
  };

  return (
    <form onSubmit={handleSubmit} className="rounded-xl border border-zinc-800/80 bg-zinc-900/30 p-6 space-y-4">
      <h3 className="text-base font-semibold text-zinc-100">Quick Backlog Entry</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2 space-y-1">
          <label className="text-xs font-medium text-zinc-400">Task Title</label>
          <input
            type="text"
            placeholder="e.g., Implement Redis Rate Limiter Middleware"
            value={newItem.title}
            onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
            className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-zinc-600"
          />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-medium text-zinc-400">Complexity</label>
          <select
            value={newItem.complexity}
            onChange={(e) => setNewItem({ ...newItem, complexity: e.target.value })}
            className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-zinc-100 focus:outline-none focus:border-zinc-600"
          >
            <option value="S">S - Small (1-2 pts)</option>
            <option value="M">M - Medium (3-5 pts)</option>
            <option value="L">L - Large (8 pts)</option>
            <option value="XL">XL - Extra Large (13+ pts)</option>
          </select>
        </div>
      </div>

      <div className="space-y-1">
        <label className="text-xs font-medium text-zinc-400">Linked Epic</label>
        <select
          value={newItem.epic}
          onChange={(e) => setNewItem({ ...newItem, epic: e.target.value })}
          className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-zinc-100 focus:outline-none focus:border-zinc-600"
        >
          {INITIAL_EPICS.map((e) => (
            <option key={e.id} value={e.name}>{e.name}</option>
          ))}
        </select>
      </div>

      <div className="space-y-1">
        <label className="text-xs font-medium text-zinc-400">Acceptance Criteria (One per line)</label>
        <textarea
          rows={3}
          placeholder="Return 429 Too Many Requests when rate limit exceeded&#10;Include X-RateLimit-Remaining header in response"
          value={newItem.acceptanceCriteria}
          onChange={(e) => setNewItem({ ...newItem, acceptanceCriteria: e.target.value })}
          className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-zinc-600 font-mono text-xs"
        />
      </div>

      <div className="flex justify-end gap-3 pt-2">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 rounded-lg text-sm text-zinc-400 hover:text-zinc-200 transition-colors cursor-pointer"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="bg-zinc-100 text-zinc-950 hover:bg-zinc-200 px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer"
        >
          Add to Backlog
        </button>
      </div>
    </form>
  );
}
import React, { useState } from 'react';
import { Plus, Search } from 'lucide-react';
import BacklogForm from './BacklogForm';
import BacklogRow from './BacklogRow';

export default function Backlog({ backlog, setBacklog }) {
  const [showInlineForm, setShowInlineForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const handleCreateItem = (created) => {
    setBacklog([created, ...backlog]);
    setShowInlineForm(false);
  };

  const toggleStatus = (id) => {
    setBacklog(
      backlog.map((item) => {
        if (item.id === id) {
          const nextStatus =
            item.status === 'planning'
              ? 'in_progress'
              : item.status === 'in_progress'
              ? 'done'
              : 'planning';
          return { ...item, status: nextStatus };
        }
        return item;
      })
    );
  };

  const filteredItems = backlog.filter((item) => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || item.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || item.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="mt-5 px-12 max-w-7xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-zinc-100">Engineering Backlog</h1>
          <p className="text-sm text-zinc-400 mt-1">AI-extracted technical tasks with precise execution criteria.</p>
        </div>
        <button
          onClick={() => setShowInlineForm(!showInlineForm)}
          className="bg-zinc-100 text-zinc-950 hover:bg-zinc-200 px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          {showInlineForm ? 'Close Form' : 'Generate from Spec'}
        </button>
      </div>

      {showInlineForm && (
        <BacklogForm
          onSubmit={handleCreateItem}
          onCancel={() => setShowInlineForm(false)}
        />
      )}

      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
          <input
            type="text"
            placeholder="Search tasks, IDs, or keywords..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-zinc-900/30 border border-zinc-800/80 rounded-xl pl-9 pr-4 py-2.5 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-zinc-700"
          />
        </div>
        <div className="flex items-center gap-2">
          {['all', 'planning', 'in_progress', 'done'].map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-3 py-2 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                filterStatus === status
                  ? 'bg-zinc-800 text-zinc-100 border border-zinc-700'
                  : 'text-zinc-400 hover:text-zinc-200 border border-transparent'
              }`}
            >
              {status.replace('_', ' ').toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        {filteredItems.map((item) => (
          <BacklogRow key={item.id} item={item} onToggleStatus={toggleStatus} />
        ))}
      </div>
    </div>
  );
}
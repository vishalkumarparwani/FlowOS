import React from 'react';
import {
  Plus,
  Search,
  Filter,
  ArrowUpDown,
  MoreHorizontal,
  Check,
  ClipboardList,
  ChevronDown
} from 'lucide-react';

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

export default function Tasks() {
  const getPriorityBadge = (priority) => {
    switch (priority) {
      case 'High':
        return 'bg-red-500/10 text-red-400 border-red-500/20';
      case 'Medium':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
      case 'Low':
      default:
        return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-8 bg-zinc-950 text-zinc-100 font-sans antialiased min-h-screen">
      
      {/* 1. HEADER SECTION */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-zinc-100">Tasks</h1>
          <p className="text-sm text-zinc-400 mt-1">
            Manage your work across all projects.
          </p>
        </div>

        <button className="flex items-center gap-2 bg-zinc-100 hover:bg-zinc-200 text-zinc-950 font-medium text-xs px-3.5 py-2 rounded-lg transition-all shadow-xs active:scale-[0.98]">
          <Plus size={15} />
          <span>New Task</span>
        </button>
      </div>

      {/* 2. TOOLBAR SECTION */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
        {/* Search Input */}
        <div className="relative w-full sm:w-80">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
          <input
            type="text"
            readOnly
            placeholder="Search tasks..."
            className="w-full bg-zinc-900/60 border border-zinc-800/80 rounded-lg py-1.5 pl-9 pr-3 text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-zinc-700 transition-all cursor-pointer"
          />
        </div>

        {/* Action Controls */}
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

      {/* 3. FILTER TABS */}
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

      {/* 4. TASK LIST SURFACE */}
      <div className="rounded-xl border border-zinc-800/80 bg-zinc-900/30 overflow-hidden shadow-xs backdrop-blur-xs">
        <div className="divide-y divide-zinc-800/50">
          {TASKS_DATA.map((task) => (
            <div
              key={task.id}
              className={`group flex items-center justify-between px-4 py-3 hover:bg-zinc-900/80 transition-colors duration-150 cursor-pointer ${
                task.completed ? 'opacity-50' : ''
              }`}
            >
              {/* Checkbox & Task Title */}
              <div className="flex items-center gap-3 min-w-0 pr-4">
                <div
                  className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 transition-colors ${
                    task.completed
                      ? 'bg-zinc-700 border-zinc-600 text-zinc-950'
                      : 'border-zinc-700 bg-zinc-900/80 group-hover:border-zinc-500'
                  }`}
                >
                  {task.completed && <Check size={11} strokeWidth={3} />}
                </div>

                <span
                  className={`text-xs font-medium truncate transition-colors ${
                    task.completed
                      ? 'line-through text-zinc-500'
                      : 'text-zinc-200 group-hover:text-zinc-100'
                  }`}
                >
                  {task.title}
                </span>
              </div>

              {/* Metadata & Actions */}
              <div className="flex items-center gap-3.5 shrink-0">
                {/* Project Badge */}
                <span className="text-[11px] font-medium text-zinc-400 bg-zinc-900 border border-zinc-800 px-2 py-0.5 rounded-md">
                  {task.project}
                </span>

                {/* Priority Badge */}
                <span
                  className={`text-[10px] font-medium border px-2 py-0.5 rounded ${getPriorityBadge(
                    task.priority
                  )}`}
                >
                  {task.priority}
                </span>

                {/* Due Date */}
                <span className="text-[11px] font-mono text-zinc-500 w-16 text-right">
                  {task.dueDate}
                </span>

                {/* More Menu */}
                <button className="text-zinc-600 hover:text-zinc-300 opacity-0 group-hover:opacity-100 transition-opacity p-1">
                  <MoreHorizontal size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

/*
================================================================================
COMMENTED-OUT EMPTY STATE REFERENCE
================================================================================

function EmptyState() {
  return (
    <div className="w-full rounded-xl border border-dashed border-zinc-800 bg-zinc-900/20 py-16 px-4 text-center flex flex-col items-center justify-center">
      <div className="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 mb-3">
        <ClipboardList size={18} />
      </div>
      <h3 className="text-sm font-semibold text-zinc-200">No tasks yet</h3>
      <p className="text-xs text-zinc-500 mt-1 max-w-xs">
        Create your first task to get started tracking your workspace progress.
      </p>
      <button className="mt-4 flex items-center gap-2 bg-zinc-100 hover:bg-zinc-200 text-zinc-950 font-medium text-xs px-3.5 py-2 rounded-lg transition-all shadow-xs">
        <Plus size={14} />
        <span>New Task</span>
      </button>
    </div>
  );
}
================================================================================
*/
import React, { useState, useEffect } from "react";
import BacklogRow from "./TaskRow";
import BacklogForm from "./TaskForm";
import { getTasks, createTask, updateTask, deleteTask } from "../../api";

import {
  Plus,
  Search,
  X,
} from "lucide-react";

export default function Backlog() {
  const [tasks, setTasks] =useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        await loadTasks();
      } catch (err) {
        console.error("Failed to load backlog:", err);
      }
    }

    fetchData();
  }, []);

  async function loadTasks() {
    const data = await getTasks();
    setTasks(data);
  }

  const filteredTasks = tasks
    .filter((task) => {
      if (filter === "planning") return task.status === "planning";
      if (filter === "in_progress") return task.status === "in_progress";
      if (filter === "done") return task.status === "done";
      return true;
    })
    .filter((task) => {
      const query = search.toLowerCase();

      return (
        task.title.toLowerCase().includes(query) ||
        task.project.toLowerCase().includes(query) ||
        task.priority.toLowerCase().includes(query)
      );
    });

  async function handleCreateTask(taskData) {
    await createTask(taskData);
    loadTasks();
    setIsFormOpen(false);
  }

  async function handleToggleStatus(task) {
    let nextStatus = "planning";

    if (task.status === "planning") nextStatus = "in_progress";
    else if (task.status === "in_progress") nextStatus = "done";

    await updateTask(task.id, {
      ...task,
      status: nextStatus,
    });

    loadTasks();
  }

  async function handleDeleteTask(id) {
    await deleteTask(id);
    loadTasks();
  }

  return (
    <div className="mt-5 px-12 max-w-7xl mx-auto space-y-8">

      {/* Header */}

      <div className="flex items-center justify-between">

        <div>
          <h1 className="text-2xl font-bold tracking-tight text-zinc-100">
            Engineering Backlog
          </h1>

          <p className="mt-1 text-sm text-zinc-400">
            AI-generated engineering tasks extracted from product
            specifications.
          </p>
        </div>

        <button
          onClick={() => setIsFormOpen(!isFormOpen)}
          className="flex items-center gap-2 rounded-lg bg-zinc-100 px-4 py-2 text-sm font-medium text-zinc-950 transition-colors hover:bg-zinc-200"
        >
          {isFormOpen ? (
            <>
              <X size={16} />
              Close Form
            </>
          ) : (
            <>
              <Plus size={16} />
              New Backlog Item
            </>
          )}
        </button>

      </div>

      {/* Form */}

      {isFormOpen && (
        <BacklogForm onSubmit={handleCreateTask} />
      )}

      {/* Search */}

      <div className="flex items-center gap-5">

        <div className="relative flex-1">

          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500"
          />

          <input
            type="text"
            placeholder="Search backlog..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-zinc-800/80 bg-zinc-900/30 py-2.5 pl-10 pr-4 text-sm text-zinc-100 placeholder-zinc-500 outline-none transition-all focus:border-zinc-700"
          />

        </div>

      </div>

      {/* Status Filter */}

      <div className="flex items-center gap-2 border-b border-zinc-900 pb-4">

        {[
          {
            key: "all",
            label: `All (${tasks.length})`,
          },
          {
            key: "planning",
            label: `Planning (${tasks.filter(t => t.status === "planning").length})`,
          },
          {
            key: "in_progress",
            label: `In Progress (${tasks.filter(t => t.status === "in_progress").length})`,
          },
          {
            key: "done",
            label: `Done (${tasks.filter(t => t.status === "done").length})`,
          },
        ].map((item) => (
          <button
            key={item.key}
            onClick={() => setFilter(item.key)}
            className={`rounded-lg px-3 py-2 text-xs font-medium transition-colors ${
              filter === item.key
                ? "border border-zinc-700 bg-zinc-800 text-zinc-100"
                : "border border-transparent text-zinc-400 hover:text-zinc-200"
            }`}
          >
            {item.label}
          </button>
        ))}

      </div>

      {/* Backlog */}

      <div className="space-y-4">

        {filteredTasks.length === 0 ? (
          <div className="rounded-xl border border-dashed border-zinc-800 p-12 text-center">

            <h3 className="text-sm font-medium text-zinc-300">
              No backlog items found.
            </h3>

            <p className="mt-2 text-xs text-zinc-500">
              Generate your first engineering task to get started.
            </p>

          </div>
        ) : (
          filteredTasks.map((task) => (
            <BacklogRow
              key={task.id}
              title={task.title}
              project={task.project}
              priority={task.priority}
              status={task.status}
              acceptance_criteria={task.acceptance_criteria}
              onToggleStatus={() => handleToggleStatus(task)}
              onDelete={() => handleDeleteTask(task.id)}
            />
          ))
        )}

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
import React, { useEffect, useState } from "react";
import { getTasks, createTask, updateTask, deleteTask } from "../../api";
import {
  Plus,
  Search,
  Filter,
  ArrowUpDown,
  ChevronDown,
  X,
} from "lucide-react";

import BacklogForm from "./BacklogForm";
import BacklogRow from "./BacklogRow";

export default function Backlog({ }) {

  const [backlog, setBacklog] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    loadBacklog();
  }, [])

  async function loadBacklog() {
    const data = await getTasks();
    setBacklog(data);
  }

  async function handleCreateItem(item) {
    await createTask(item);
    await loadBacklog();
    setIsFormOpen(false);
  }

  async function handleToggleStatus(item) {
    let nextStatus = "planning";

    if (item.status === "planning") nextStatus = "in_progress";
    else if (item.status === "in_progress") nextStatus = "done";

    await updateTask(item.id, {
      ...item,
      status: nextStatus,
    });

    loadBacklog();
  }

  async function handleDeleteItem(id) {
    await deleteTask(id);
    loadBacklog();
  }

  const filteredItems = backlog
    .filter((item) => {
      if (statusFilter === "planning") return item.status === "planning";
      if (statusFilter === "in_progress") return item.status === "in_progress";
      if (statusFilter === "done") return item.status === "done";
      return true;
    })
    .filter((item) => {
      const query = search.toLowerCase();

      return (
        item.title.toLowerCase().includes(query) ||
        item.id.toLowerCase().includes(query) ||
        (item.epic || "").toLowerCase().includes(query)
      );
    });

  return (
    <div className="mt-5 px-12 space-y-8 animate-fade-in">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Engineering Backlog
          </h1>

          <p className="mt-1 text-sm text-zinc-400">
            AI-generated implementation tasks for SpecFlow.
          </p>
        </div>

        <button
          onClick={() => setIsFormOpen(!isFormOpen)}
          className="flex items-center gap-2 rounded-lg bg-zinc-100 px-4 py-2 text-sm font-semibold text-zinc-950 hover:bg-zinc-200 transition-colors"
        >
          {isFormOpen ? (
            <>
              <X size={16} />
              Cancel
            </>
          ) : (
            <>
              <Plus size={16} />
              Add Backlog Item
            </>
          )}
        </button>
      </div>

      {isFormOpen && (
        <BacklogForm
          onSubmit={handleCreateItem}
        />
      )}

      <div className="flex items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search
            size={14}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500"
          />

          <input
            type="text"
            placeholder="Search backlog..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-zinc-800/80 bg-zinc-900/60 py-2 pl-9 pr-3 text-xs text-zinc-200 placeholder-zinc-500 outline-none transition-all focus:border-zinc-700"
          />
        </div>

        <div className="flex items-center gap-2.5">
          <button className="flex items-center gap-1.5 rounded-lg border border-zinc-800/80 bg-zinc-900/60 px-3 py-1.5 text-xs text-zinc-300 transition-colors hover:bg-zinc-900">
            <Filter size={13} />
            Filter
          </button>

          <button className="flex items-center gap-1.5 rounded-lg border border-zinc-800/80 bg-zinc-900/60 px-3 py-1.5 text-xs text-zinc-300 transition-colors hover:bg-zinc-900">
            <ArrowUpDown size={13} />
            <ChevronDown size={12} />
          </button>
        </div>
      </div>

      <div className="flex items-center gap-2 border-b border-zinc-900 pb-3">
        <button
          onClick={() => setStatusFilter("all")}
          className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${statusFilter === "all"
            ? "border border-zinc-700 bg-zinc-800 text-white"
            : "text-zinc-400 hover:bg-zinc-900 hover:text-zinc-200"
            }`}
        >
          All ({backlog.length})
        </button>

        <button
          onClick={() => setStatusFilter("planning")}
          className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${statusFilter === "planning"
            ? "border border-zinc-700 bg-zinc-800 text-white"
            : "text-zinc-400 hover:bg-zinc-900 hover:text-zinc-200"
            }`}
        >
          Planning ({backlog.filter((i) => i.status === "planning").length})
        </button>

        <button
          onClick={() => setStatusFilter("in_progress")}
          className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${statusFilter === "in_progress"
            ? "border border-zinc-700 bg-zinc-800 text-white"
            : "text-zinc-400 hover:bg-zinc-900 hover:text-zinc-200"
            }`}
        >
          In Progress ({backlog.filter((i) => i.status === "in_progress").length})
        </button>

        <button
          onClick={() => setStatusFilter("done")}
          className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${statusFilter === "done"
            ? "border border-zinc-700 bg-zinc-800 text-white"
            : "text-zinc-400 hover:bg-zinc-900 hover:text-zinc-200"
            }`}
        >
          Done ({backlog.filter((i) => i.status === "done").length})
        </button>
      </div>

      <div className="space-y-3">
        {filteredItems.length === 0 ? (
          <div className="rounded-xl border border-zinc-800/80 bg-zinc-900/30 py-12 text-center text-sm text-zinc-500">
            No backlog items found.
          </div>
        ) : (
          filteredItems.map((item) => (
            <BacklogRow
              key={item.id}
              item={item}
              onToggleStatus={() => handleToggleStatus(item)}
            />
          ))
        )}
      </div>
    </div>
  );
}
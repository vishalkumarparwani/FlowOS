import React, { useEffect, useState } from "react";
import BacklogForm from "./BacklogForm";
import BacklogRow from "./BacklogRow";
import { getBacklog, createBacklog, updateBacklog, deleteBacklog } from "../../api";
import {
  Plus,
  Search,
  Filter,
  ArrowUpDown,
  ChevronDown,
  X,
} from "lucide-react";


export default function Backlog({ }) {
  const [backlogItems, setBacklogItems] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        await loadBacklog();
      } catch (err) {
        console.log("Failed to load backlog items: ", err);
      }
    }
    fetchData();
  }, []);

  async function loadBacklog() {
    const data = await getBacklog();
    setBacklogItems(data);
  }

  const FilteredBacklogsItems = backlogItems
    .filter((item) => {
      if (statusFilter === "planning") return item.status === "planning";
      if (statusFilter === "in_progress") return item.status === "in_progress";
      if (statusFilter === "done") return item.status === "done";
      return true;
    })
    .filter((item) => {
      const query = search.toLowerCase();

      return (
        (item.title || "").toLowerCase().includes(query) ||
        String(item.id).includes(query) ||
        (item.project || "").toLowerCase().includes(query) ||
        (item.priority || "").toLowerCase().includes(query) ||
        (item.status || "").toLowerCase().includes(query) ||
        (item.complexity || "").toLowerCase().includes(query) ||
        (item.due_date || "").toLowerCase().includes(query)
      );
    });

  async function handleCreateBacklog(item) {
    await createBacklog(item);
    await loadBacklog();
    setIsFormOpen(false);
  }

  async function handleUpdateBacklogItem(item) {
    if (!item.title.trim()) return;

    await updateBacklog(item.id, item);
    await loadBacklog();
    setEditingItem(null);
  }

  async function handleDeleteBacklogItem(id) {
    await deleteBacklog(id);
    await loadBacklog();
  }

  async function handleToggleStatus(item) {
    let nextStatus = "planning";

    if (item.status === "planning") nextStatus = "in_progress";
    else if (item.status === "in_progress") nextStatus = "done";

    await updateBacklog(item.id, {
      ...item,
      status: nextStatus,
    });

    await loadBacklog();
  }

  return (
    <div className="mx-auto mt-6 max-w-7xl space-y-8 px-8 xl:px-12">
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

      {isFormOpen &&
        (<BacklogForm
          onSubmit={handleCreateBacklog}
          onCancel={() => setIsFormOpen(false)}
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
            placeholder="Search tasks, IDs, or keywords..."
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
          All ({backlogItems.length})
        </button>

        <button
          onClick={() => setStatusFilter("planning")}
          className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${statusFilter === "planning"
            ? "border border-zinc-700 bg-zinc-800 text-white"
            : "text-zinc-400 hover:bg-zinc-900 hover:text-zinc-200"
            }`}
        >
          Planning ({backlogItems.filter((item) => item.status === "planning").length})
        </button>

        <button
          onClick={() => setStatusFilter("in_progress")}
          className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${statusFilter === "in_progress"
            ? "border border-zinc-700 bg-zinc-800 text-white"
            : "text-zinc-400 hover:bg-zinc-900 hover:text-zinc-200"
            }`}
        >
          In Progress ({backlogItems.filter((item) => item.status === "in_progress").length})
        </button>

        <button
          onClick={() => setStatusFilter("done")}
          className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${statusFilter === "done"
            ? "border border-zinc-700 bg-zinc-800 text-white"
            : "text-zinc-400 hover:bg-zinc-900 hover:text-zinc-200"
            }`}
        >
          Done ({backlogItems.filter((item) => item.status === "done").length})
        </button>
      </div>

      {statusFilter === "done" && (
        <div className="rounded-lg border border-emerald-900/40 bg-emerald-950/20 px-4 py-2.5 text-xs text-emerald-400 flex items-center gap-2">
          <span>All completed items are moved to done for status tracking.</span>
        </div>
      )}

      <div className="space-y-3">
        {FilteredBacklogsItems.length === 0 ? (
          <div className="rounded-xl border border-zinc-800/80 bg-zinc-900/30 py-12 text-center text-sm text-zinc-500">
            Your backlog is empty. Generate items from a spec to get started.
          </div>
        ) : (
          FilteredBacklogsItems.map((item) => (
            item.id === editingItem?.id ? (
              <BacklogForm
                key={item.id}
                initialValues={item}
                onSubmit={handleUpdateBacklogItem}
                onCancel={() => setEditingItem(null)}
              />
            ) : (
              <BacklogRow
                key={item.id}
                item={item}
                onEdit={() => setEditingItem(item)}
                onToggleStatus={() => handleToggleStatus(item)}
                onDelete={() => handleDeleteBacklogItem(item.id)}
              />
            )
          ))
        )}
      </div>
    </div>
  );
}
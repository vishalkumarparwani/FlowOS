import React, { useEffect, useState } from "react";
import { getServices, deleteIssue } from "../../api";
import { Search, ArrowRight, Layers, X, Trash2 } from "lucide-react";

function getStatus(critical, open) {
  if (critical > 0) return { label: "Critical", color: "bg-rose-500/10 text-rose-400 border-rose-500/20" };
  if (open > 0) return { label: "Degraded", color: "bg-amber-500/10 text-amber-400 border-amber-500/20" };
  return { label: "Healthy", color: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" };
}

const severityColor = {
  P1: "text-rose-400 bg-rose-500/10 border-rose-500/20",
  P2: "text-amber-400 bg-amber-500/10 border-amber-500/20",
  P3: "text-indigo-400 bg-indigo-500/10 border-indigo-500/20",
  P4: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
};

function riskScore(issues) {
  const critical = issues.filter((i) => i.severity === "P1").length;
  const open = issues.filter((i) => i.status !== "done").length;
  return critical * 1000 + open;
}

export default function Services() {
  const [services, setServices] = useState({});
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);
  const [panelVisible, setPanelVisible] = useState(false);
  const [filter, setFilter] = useState("all");
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getServices();
        setServices(data);
      } catch (err) {
        setError("Failed to load services. Please refresh.");
      }
    }
    fetchData();
  }, []);

  function openPanel(name) {
    setSelected(name);
    setFilter("all");
    requestAnimationFrame(() => setPanelVisible(true));
  }

  function closePanel() {
    setPanelVisible(false);
    setTimeout(() => setSelected(null), 300);
  }

  async function handleDeleteIssue(issueId) {
    try {
      await deleteIssue(issueId);
      setServices((prev) => {
        const updated = { ...prev };
        updated[selected] = updated[selected].filter((i) => i.id !== issueId);
        if (updated[selected].length === 0) {
          delete updated[selected];
        }
        return updated;
      });
    } catch (err) {
      setError("Failed to delete issue. Please try again.");
    }
  }

  const serviceNames = Object.keys(services)
    .filter((name) => name.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => riskScore(services[b]) - riskScore(services[a]));

  const selectedIssues = selected && services[selected] ? services[selected] : [];
  const filteredIssues =
    filter === "open"
      ? selectedIssues.filter((i) => i.status !== "done")
      : filter === "p1"
      ? selectedIssues.filter((i) => i.severity === "P1")
      : selectedIssues;

  return (
    <div className="mx-auto mt-6 max-w-7xl space-y-8 px-8 xl:px-12">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Services Overview</h1>
          <p className="mt-1 text-sm text-zinc-400">
            Health and status grouped by issue domain.
          </p>
        </div>

        <div className="relative w-64">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
          <input
            type="text"
            placeholder="Search services..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-zinc-800/80 bg-zinc-900/60 py-2 pl-9 pr-3 text-xs text-zinc-200 placeholder-zinc-500 outline-none transition-all focus:border-zinc-700"
          />
        </div>
      </div>

      {error && (
        <div className="rounded-lg border border-rose-900/40 bg-rose-950/20 px-4 py-2.5 text-xs text-rose-400">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {serviceNames.length === 0 ? (
          <div className="col-span-full rounded-xl border border-zinc-800/80 bg-zinc-900/30 py-12 text-center text-sm text-zinc-500">
            No services found.
          </div>
        ) : (
          serviceNames.map((name) => {
            const issues = services[name];
            const critical = issues.filter((i) => i.severity === "P1").length;
            const open = issues.filter((i) => i.status !== "done").length;
            const status = getStatus(critical, open);
            const barWidth = issues.length > 0 ? Math.round((open / issues.length) * 100) : 0;
            const barColor = critical > 0 ? "bg-rose-500" : open > 0 ? "bg-amber-500" : "bg-emerald-500";

            return (
              <button
                key={name}
                onClick={() => openPanel(name)}
                className="text-left rounded-xl border border-zinc-800/80 bg-zinc-900/50 p-5 space-y-4 transition-all duration-200 hover:border-zinc-700 hover:bg-zinc-900/90"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-md bg-amber-500/10 text-amber-400 flex items-center justify-center">
                      <Layers size={14} />
                    </div>
                    <span className="font-semibold text-sm text-zinc-100">{name}</span>
                  </div>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium border ${status.color}`}>
                    {status.label}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div>
                    <p className="text-zinc-500 uppercase tracking-wide text-[10px]">Open Issues</p>
                    <p className="mt-1 text-lg font-semibold text-zinc-100">{open}</p>
                  </div>
                  <div>
                    <p className="text-zinc-500 uppercase tracking-wide text-[10px]">Critical (P1)</p>
                    <p className={`mt-1 text-lg font-semibold ${critical > 0 ? "text-rose-400" : "text-zinc-100"}`}>
                      {critical}
                    </p>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between text-[10px] text-zinc-500 mb-1">
                    <span>Severity Breakdown</span>
                    <span>{open} Active</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-zinc-800 overflow-hidden">
                    <div className={`h-full rounded-full ${barColor}`} style={{ width: `${barWidth}%` }} />
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-amber-400 pt-1">
                  <span>View full telemetry</span>
                  <ArrowRight size={12} />
                </div>
              </button>
            );
          })
        )}
      </div>

      {selected !== null && (
        <div
          className={`fixed inset-0 z-50 bg-black/60 transition-opacity duration-300 ${
            panelVisible ? "opacity-100" : "opacity-0"
          }`}
          onClick={closePanel}
        >
          <div
            className={`absolute right-0 top-0 h-full w-full max-w-md bg-zinc-950 border-l border-zinc-800 p-6 flex flex-col transition-transform duration-300 ease-in-out ${
              panelVisible ? "translate-x-0" : "translate-x-full"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
              <div className="flex items-center gap-2">
                <Layers size={16} className="text-amber-400" />
                <h2 className="text-sm font-semibold text-zinc-100">{selected}</h2>
              </div>
              <button onClick={closePanel} className="text-zinc-500 hover:text-zinc-200">
                <X size={18} />
              </button>
            </div>

            <div className="grid grid-cols-3 gap-4 py-4 border-b border-zinc-800 text-xs">
              <div>
                <p className="text-zinc-500">Total Tracked</p>
                <p className="mt-1 text-base font-semibold text-zinc-100">{selectedIssues.length}</p>
              </div>
              <div>
                <p className="text-zinc-500">Open Issues</p>
                <p className="mt-1 text-base font-semibold text-zinc-100">
                  {selectedIssues.filter((i) => i.status !== "done").length}
                </p>
              </div>
              <div>
                <p className="text-zinc-500">P1 Critical</p>
                <p className="mt-1 text-base font-semibold text-rose-400">
                  {selectedIssues.filter((i) => i.severity === "P1").length}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 py-3">
              {[
                { key: "all", label: "All" },
                { key: "open", label: "Open Only" },
                { key: "p1", label: "P1 Only" },
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setFilter(tab.key)}
                  className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
                    filter === tab.key
                      ? "bg-amber-500/10 text-amber-400 border border-amber-500/30"
                      : "text-zinc-500 hover:text-zinc-300"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="flex-1 overflow-y-auto space-y-2">
              {filteredIssues.length === 0 ? (
                <p className="text-center text-xs text-zinc-500 py-8">No issues match this filter.</p>
              ) : (
                filteredIssues.map((issue) => (
                  <div
                    key={issue.id}
                    className="rounded-lg border border-zinc-800 bg-zinc-900/60 p-3 space-y-1"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[10px] text-zinc-500">#{issue.id}</span>
                        <span
                          className={`px-1.5 py-0.5 rounded text-[10px] font-bold border ${
                            severityColor[issue.severity] || severityColor.P3
                          }`}
                        >
                          {issue.severity}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] text-zinc-500">{issue.status}</span>
                        <button
                          onClick={() => handleDeleteIssue(issue.id)}
                          title="Delete issue"
                          aria-label="Delete issue"
                          className="text-zinc-500 hover:text-rose-400 transition-colors"
                        >
                          <Trash2 size={12} />
                        </button>
                      </div>
                    </div>
                    <p className="text-sm text-zinc-200">{issue.title}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
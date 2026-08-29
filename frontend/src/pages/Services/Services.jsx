import React, { useEffect, useState } from "react";
import { getServices } from "../../api";
import { Search, ChevronRight, AlertTriangle } from "lucide-react";

export default function Services() {
  const [services, setServices] = useState({});
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);
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

  const serviceNames = Object.keys(services).filter((name) =>
    name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="mx-auto mt-6 max-w-7xl space-y-8 px-8 xl:px-12">
      <div>
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Services</h1>
        <p className="mt-1 text-sm text-zinc-400">
          Services derived from your reported issues, grouped by name.
        </p>
      </div>

      {error && (
        <div className="rounded-lg border border-rose-900/40 bg-rose-950/20 px-4 py-2.5 text-xs text-rose-400">
          {error}
        </div>
      )}

      <div className="relative w-full sm:w-80">
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
        <input
          type="text"
          placeholder="Search services..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-lg border border-zinc-800/80 bg-zinc-900/60 py-2 pl-9 pr-3 text-xs text-zinc-200 placeholder-zinc-500 outline-none transition-all focus:border-zinc-700"
        />
      </div>

      <div className="space-y-3">
        {serviceNames.length === 0 ? (
          <div className="rounded-xl border border-zinc-800/80 bg-zinc-900/30 py-12 text-center text-sm text-zinc-500">
            No services found.
          </div>
        ) : (
          serviceNames.map((name) => {
            const issues = services[name];
            const critical = issues.filter((i) => i.severity === "P1").length;
            const open = issues.filter((i) => i.status !== "done").length;

            return (
              <button
                key={name}
                onClick={() => setSelected(name)}
                className="w-full flex items-center justify-between gap-3 rounded-xl border border-zinc-800/80 bg-zinc-900/50 p-4 text-left transition-all duration-200 hover:border-zinc-700 hover:bg-zinc-900/90"
              >
                <div className="flex items-center gap-3">
                  <span className="font-mono text-sm font-semibold text-zinc-100">
                    {name}
                  </span>
                  {critical > 0 && (
                    <span className="inline-flex items-center gap-1 rounded-md border border-rose-500/20 bg-rose-500/10 px-2 py-0.5 text-[10px] font-bold text-rose-400">
                      <AlertTriangle size={10} />
                      {critical} critical
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-4 text-xs text-zinc-400">
                  <span>{open} open</span>
                  <ChevronRight size={14} className="text-zinc-600" />
                </div>
              </button>
            );
          })
        )}
      </div>

      {selected !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4"
          onClick={() => setSelected(null)}
        >
          <div
            className="w-full max-w-lg rounded-xl border border-zinc-800 bg-zinc-950 p-6 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between">
              <h2 className="font-mono text-lg font-semibold text-zinc-100">
                {selected}
              </h2>
              <button
                onClick={() => setSelected(null)}
                className="text-zinc-500 hover:text-zinc-200 text-xl leading-none"
              >
                ×
              </button>
            </div>

            <ul className="mt-5 space-y-2">
              {services[selected].map((issue) => (
                <li
                  key={issue.id}
                  className="flex items-center justify-between rounded-lg border border-zinc-800 bg-zinc-900/60 px-3 py-2"
                >
                  <span className="text-sm text-zinc-200">{issue.title}</span>
                  <span className="font-mono text-[10px] font-bold text-zinc-500">
                    {issue.severity}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { createIssue, runTriage, getIssues } from "../../api";
import IssueForm from "../Issues/IssueForm";
import {
  Sparkles,
  AlertTriangle,
  Check,
  ArrowRight,
  Terminal,
  Layers,
  ShieldAlert,
  RotateCcw,
  XCircle,
  Pencil,
  History,
  HelpCircle,
} from "lucide-react";

function findDuplicate(candidate, existingIssues) {
  if (!candidate.title || !candidate.service) return null;
  const titleLower = candidate.title.toLowerCase();
  return existingIssues.find(
    (existing) =>
      existing.service === candidate.service &&
      (existing.title.toLowerCase().includes(titleLower) ||
        titleLower.includes(existing.title.toLowerCase()))
  );
}

export default function Triage() {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);
  const [existingIssues, setExistingIssues] = useState([]);
  const [history, setHistory] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    async function loadExisting() {
      try {
        const data = await getIssues();
        setExistingIssues(data);
      } catch {
        // non-fatal, duplicate check just won't run
      }
    }
    loadExisting();
  }, []);

  async function handleRunTriage() {
    if (!text.trim()) return;

    setLoading(true);
    setError(null);
    setResults([]);

    const reports = text
      .split(/\n\s*---\s*\n/)
      .map((r) => r.trim())
      .filter(Boolean);

    try {
      const extracted = await Promise.all(
        reports.map((report) => runTriage(report))
      );

      const withMeta = extracted.map((issue) => ({
        ...issue,
        saved: false,
        createdId: null,
        duplicateOf: findDuplicate(issue, existingIssues),
      }));

      setResults(withMeta);

      setHistory((prev) => [
        ...withMeta
          .filter((r) => r.title !== "No issue reported")
          .map((r) => r.title),
        ...prev,
      ].slice(0, 5));
    } catch (err) {
      console.error("AI Triage Error:", err);
      setError(err?.message || "Failed to parse issue log. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  function handleReset() {
    setText("");
    setResults([]);
    setError(null);
    setEditingIndex(null);
  }

  async function handleCreateIssue(index) {
    const target = results[index];
    try {
      const saved = await createIssue(target);
      setResults((prev) =>
        prev.map((r, i) =>
          i === index ? { ...r, saved: true, createdId: saved.id } : r
        )
      );
    } catch (err) {
      console.error("Create failed:", err);
      setError("Failed to save issue. Please try again.");
    }
  }

  async function handleSaveEdited(index, edited) {
    try {
      const saved = await createIssue(edited);
      setResults((prev) =>
        prev.map((r, i) =>
          i === index ? { ...edited, saved: true, createdId: saved.id } : r
        )
      );
      setEditingIndex(null);
    } catch (err) {
      console.error("Create failed:", err);
      setError("Failed to save issue. Please try again.");
    }
  }

  function stepsFor(issue) {
    return Array.isArray(issue?.reproduction_steps)
      ? issue.reproduction_steps
      : typeof issue?.reproduction_steps === "string"
      ? issue.reproduction_steps.split("\n").filter(Boolean)
      : [];
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div>
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-bold tracking-tight text-zinc-100">
            AI Issue Triage
          </h1>

          <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-amber-500/10 text-amber-400 border border-amber-500/20">
            LLM PARSER v1.0
          </span>
        </div>

        <p className="text-xs text-zinc-400 mt-1">
          Paste raw bug reports, Slack logs, or customer emails to extract structured, actionable issues.
          Separate multiple reports with a line containing <code className="text-zinc-300">---</code>.
        </p>
      </div>

      {history.length > 0 && (
        <div className="flex items-center gap-2 flex-wrap text-[11px] text-zinc-500">
          <History className="w-3.5 h-3.5" />
          <span>Recently triaged:</span>
          {history.map((title, i) => (
            <span
              key={i}
              className="px-2 py-0.5 rounded-md bg-zinc-900/60 border border-zinc-800 text-zinc-400"
            >
              {title}
            </span>
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Panel: Input Area */}
        <div className="bg-zinc-900/60 border border-zinc-800/80 rounded-xl p-5 flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <label className="text-xs font-semibold text-zinc-300 flex items-center gap-2">
              <Terminal className="w-4 h-4 text-zinc-400" />
              Raw Bug Log / Customer Ticket
            </label>

            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder={"Paste raw error message, stacktrace, or bug report description here...\n\nFor multiple reports, separate with a line of ---"}
              rows={12}
              className="w-full bg-zinc-950 border border-zinc-800/80 rounded-lg p-3 text-xs text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/20 font-mono resize-none transition-all"
            />
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-zinc-800/60">
            <button
              type="button"
              onClick={handleReset}
              className="px-3 py-1.5 text-xs text-zinc-400 hover:text-zinc-200 flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset
            </button>

            <button
              type="button"
              onClick={handleRunTriage}
              disabled={loading || !text.trim()}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-zinc-100 text-zinc-950 hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed text-xs font-semibold transition-all cursor-pointer shadow-sm"
            >
              <Sparkles
                className={`w-4 h-4 text-amber-500 ${loading ? "animate-spin" : "fill-amber-500"}`}
              />
              <span>{loading ? "Parsing Log..." : "Run AI Triage"}</span>
            </button>
          </div>
        </div>

        {/* Right Panel: Extracted Issue Previews */}
        <div className="bg-zinc-900/60 border border-zinc-800/80 rounded-xl p-5 flex flex-col">
          <div className="flex items-center gap-2 pb-3 border-b border-zinc-800/80">
            <Layers className="w-4 h-4 text-indigo-400" />
            <span className="text-xs font-semibold text-zinc-300">
              Structured Issue Preview{results.length > 1 ? "s" : ""}
            </span>
          </div>

          {/* Empty State */}
          {results.length === 0 && !loading && !error && (
            <div className="h-64 flex flex-col items-center justify-center text-center p-6 space-y-2">
              <div className="w-10 h-10 rounded-full bg-zinc-800/50 flex items-center justify-center text-zinc-500">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <p className="text-xs font-medium text-zinc-400">
                No Issue Extracted Yet
              </p>
              <p className="text-[11px] text-zinc-500 max-w-xs">
                Paste a bug report and click "Run AI Triage".
              </p>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="h-64 flex flex-col items-center justify-center text-center p-6 space-y-2">
              <div className="w-10 h-10 rounded-full bg-rose-500/10 flex items-center justify-center text-rose-400">
                <XCircle className="w-5 h-5" />
              </div>
              <p className="text-xs font-medium text-rose-400">Triage Failed</p>
              <p className="text-[11px] text-zinc-400 max-w-xs">{error}</p>
            </div>
          )}

          {/* Loading State */}
          {loading && (
            <div className="h-64 flex flex-col items-center justify-center space-y-3">
              <Sparkles className="w-8 h-8 text-amber-400 animate-bounce" />
              <p className="text-xs text-zinc-400 font-mono animate-pulse">
                Extracting issue details...
              </p>
            </div>
          )}

          {/* Results List */}
          {results.length > 0 && !loading && (
            <div className="mt-4 space-y-4 overflow-y-auto max-h-[600px]">
              {results.map((issue, index) => {
                const noIssueFound = issue.title === "No issue reported";
                const steps = stepsFor(issue);

                if (noIssueFound) {
                  return (
                    <div
                      key={index}
                      className="rounded-lg border border-zinc-800/60 bg-zinc-950/40 p-4 text-center space-y-1"
                    >
                      <p className="text-xs font-medium text-zinc-400">No Issue Detected</p>
                      <p className="text-[11px] text-zinc-500">
                        Report {index + 1} doesn't appear to describe a bug or problem.
                      </p>
                    </div>
                  );
                }

                if (editingIndex === index) {
                  return (
                    <IssueForm
                      key={index}
                      initialValues={issue}
                      onSubmit={(edited) => handleSaveEdited(index, edited)}
                      onCancel={() => setEditingIndex(null)}
                    />
                  );
                }

                return (
                  <div
                    key={index}
                    className="rounded-lg border border-zinc-800/60 bg-zinc-950/40 p-4 space-y-3"
                  >
                    <div className="flex items-center gap-2 flex-wrap">
                      {issue.severity && (
                        <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-rose-500/20 text-rose-400 border border-rose-500/30 flex items-center gap-1 uppercase">
                          <AlertTriangle className="w-3 h-3" />
                          SEVERITY {issue.severity}
                        </span>
                      )}
                      {issue.service && (
                        <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-zinc-800 text-zinc-300 border border-zinc-700/60">
                          {issue.service}
                        </span>
                      )}
                      {issue.priority && (
                        <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-zinc-800 text-zinc-300 border border-zinc-700/60">
                          {issue.priority}
                        </span>
                      )}
                      {issue.confidence === "low" && (
                        <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-amber-500/10 text-amber-400 border border-amber-500/20 flex items-center gap-1">
                          <HelpCircle className="w-3 h-3" />
                          Low confidence
                        </span>
                      )}
                    </div>

                    <h3 className="text-sm font-bold text-zinc-100 leading-snug">
                      {issue.title || "Untitled Issue"}
                    </h3>

                    {issue.duplicateOf && (
                      <div className="flex items-center gap-1.5 text-[11px] text-amber-400 bg-amber-500/10 border border-amber-500/20 rounded-md px-2 py-1">
                        <AlertTriangle className="w-3 h-3 shrink-0" />
                        <span>
                          Looks similar to ISS-{issue.duplicateOf.id} ({issue.duplicateOf.title})
                        </span>
                      </div>
                    )}

                    {steps.length > 0 && (
                      <div className="space-y-1.5">
                        <span className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider">
                          Reproduction Steps
                        </span>
                        <ul className="space-y-1">
                          {steps.map((step, i) => (
                            <li key={i} className="text-xs text-zinc-300 flex items-start gap-2">
                              <span className="text-zinc-500 font-mono text-[10px] mt-0.5 select-none">
                                {i + 1}.
                              </span>
                              <span>{step}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <div className="pt-3 border-t border-zinc-800/60 flex items-center justify-between">
                      {issue.saved ? (
                        <span
                          onClick={() => navigate("/issues", { state: { highlightId: issue.createdId } })}
                          className="flex items-center gap-1 text-[11px] text-zinc-500 cursor-pointer hover:text-zinc-300"
                        >
                          Issue created →
                          <span className="font-medium">View</span>
                        </span>
                      ) : (
                        <button
                          type="button"
                          onClick={() => setEditingIndex(index)}
                          className="flex items-center gap-1.5 text-[11px] text-zinc-400 hover:text-zinc-200 transition-colors cursor-pointer"
                        >
                          <Pencil className="w-3 h-3" />
                          Edit before saving
                        </button>
                      )}

                      <button
                        type="button"
                        onClick={() => handleCreateIssue(index)}
                        disabled={issue.saved}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                          issue.saved
                            ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                            : "bg-indigo-600 hover:bg-indigo-500 text-white shadow-sm"
                        }`}
                      >
                        {issue.saved ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>Added</span>
                          </>
                        ) : (
                          <>
                            <span>Confirm & Create</span>
                            <ArrowRight className="w-3 h-3" />
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
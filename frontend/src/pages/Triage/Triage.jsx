import React, { useState } from "react";
import {
  Sparkles,
  AlertTriangle,
  Check,
  ArrowRight,
  Terminal,
  Copy,
  Layers,
  FileCode,
  ShieldAlert,
  RotateCcw
} from "lucide-react";

export default function Triage() {
  const [inputText, setInputText] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [extractedIssue, setExtractedIssue] = useState(null);
  const [isSaved, setIsSaved] = useState(false);

  const SAMPLE_BUG = `URGENT: Checkout failing for Safari users on iOS 17.4!
Whenever users attempt to upload their ID document during KYC, the app crashes with memory out-of-bounds error in console. 
Happening since deployment v2.4.1. Affected around 120 users in past hour. Lost revenue risk!
Error snippet: Uncaught RangeError: Maximum call stack size exceeded at WebAssembly.instantiate`;

  const handleLoadSample = () => {
    setInputText(SAMPLE_BUG);
    setExtractedIssue(null);
    setIsSaved(false);
  };

  const handleTriage = () => {
    if (!inputText.trim()) return;
    setIsGenerating(true);
    setIsSaved(false);

    // Simulated LLM response matching backend /triage/generate output
    setTimeout(() => {
      setExtractedIssue({
        title: "KYC ID Document Upload Stack Overflow Crash on Safari iOS 17.4",
        severity: "P1",
        component: "Frontend / Auth & KYC",
        summary: "Memory out-of-bounds error crashing checkout during WebAssembly ID document upload on iOS 17.4 Safari.",
        suggestedPriority: "Urgent",
        affectedUsers: "~120 users/hr",
        reproSteps: [
          "Open app on iOS 17.4 Safari browser",
          "Navigate to Checkout / KYC Verification step",
          "Attempt to upload ID image document",
          "Observe app crash with 'Maximum call stack size exceeded' in console"
        ]
      });
      setIsGenerating(false);
    }, 1200);
  };

  const handleSaveIssue = () => {
    // Triggers POST to /issues/
    setIsSaved(true);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
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
          </p>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* LEFT: Raw Report Input */}
        <div className="bg-zinc-900/60 border border-zinc-800/80 rounded-xl p-5 flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-zinc-300 flex items-center gap-2">
                <Terminal className="w-4 h-4 text-zinc-400" />
                Raw Bug Log / Customer Ticket
              </label>
              <button
                onClick={handleLoadSample}
                className="text-[11px] text-zinc-400 hover:text-amber-400 flex items-center gap-1 transition-colors cursor-pointer"
              >
                <Copy className="w-3 h-3" />
                Load Sample Log
              </button>
            </div>

            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Paste raw error message, Sentry stacktrace, or bug report description here..."
              rows={12}
              className="w-full bg-zinc-950 border border-zinc-800/80 rounded-lg p-3 text-xs text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/20 font-mono resize-none transition-all"
            />
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-zinc-800/60">
            <button
              onClick={() => {
                setInputText("");
                setExtractedIssue(null);
                setIsSaved(false);
              }}
              className="px-3 py-1.5 text-xs text-zinc-400 hover:text-zinc-200 flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset
            </button>

            <button
              onClick={handleTriage}
              disabled={isGenerating || !inputText.trim()}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-zinc-100 text-zinc-950 hover:bg-white disabled:opacity-50 text-xs font-semibold transition-all cursor-pointer shadow-sm"
            >
              {isGenerating ? (
                <>
                  <Sparkles className="w-4 h-4 animate-spin text-amber-600" />
                  <span>Parsing Log...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 fill-amber-500 text-amber-500" />
                  <span>Run AI Triage</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* RIGHT: Extracted Preview Card */}
        <div className="bg-zinc-900/60 border border-zinc-800/80 rounded-xl p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-zinc-800/80">
              <span className="text-xs font-semibold text-zinc-300 flex items-center gap-2">
                <Layers className="w-4 h-4 text-indigo-400" />
                Structured Issue Preview
              </span>
              {extractedIssue && (
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  CONFIDENCE: 98%
                </span>
              )}
            </div>

            {!extractedIssue && !isGenerating && (
              <div className="h-64 flex flex-col items-center justify-center text-center p-6 space-y-2">
                <div className="w-10 h-10 rounded-full bg-zinc-800/50 flex items-center justify-center text-zinc-500">
                  <ShieldAlert className="w-5 h-5" />
                </div>
                <p className="text-xs font-medium text-zinc-400">No Issue Extracted Yet</p>
                <p className="text-[11px] text-zinc-500 max-w-xs">
                  Paste a bug report on the left and click "Run AI Triage" to generate a severity-ranked issue card.
                </p>
              </div>
            )}

            {isGenerating && (
              <div className="h-64 flex flex-col items-center justify-center space-y-3">
                <Sparkles className="w-8 h-8 text-amber-400 animate-bounce" />
                <p className="text-xs text-zinc-400 font-mono animate-pulse">
                  Extracting severity, component & repro steps...
                </p>
              </div>
            )}

            {extractedIssue && !isGenerating && (
              <div className="mt-4 space-y-4">
                {/* Title & Badges */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-rose-500/20 text-rose-400 border border-rose-500/30 flex items-center gap-1">
                      <AlertTriangle className="w-3 h-3" />
                      SEVERITY {extractedIssue.severity}
                    </span>
                    <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-zinc-800 text-zinc-300 border border-zinc-700/60">
                      {extractedIssue.component}
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-zinc-100 leading-snug">
                    {extractedIssue.title}
                  </h3>
                </div>

                {/* Summary */}
                <p className="text-xs text-zinc-400 bg-zinc-950/80 p-3 rounded-lg border border-zinc-800/60 leading-relaxed">
                  {extractedIssue.summary}
                </p>

                {/* Repro Steps */}
                <div className="space-y-1.5">
                  <span className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider">
                    Reproduction Steps
                  </span>
                  <ul className="space-y-1">
                    {extractedIssue.reproSteps.map((step, i) => (
                      <li key={i} className="text-xs text-zinc-300 flex items-start gap-2">
                        <span className="text-zinc-500 font-mono text-[10px] mt-0.5">{i + 1}.</span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>

          {/* Action Footer */}
          {extractedIssue && !isGenerating && (
            <div className="pt-4 mt-6 border-t border-zinc-800/80 flex items-center justify-between">
              <span className="text-[11px] text-zinc-500">
                Action: Creates entry in <code className="text-zinc-400">/issues/</code>
              </span>
              <button
                onClick={handleSaveIssue}
                disabled={isSaved}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  isSaved
                    ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                    : "bg-indigo-600 hover:bg-indigo-500 text-white shadow-sm"
                }`}
              >
                {isSaved ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Added to Issues</span>
                  </>
                ) : (
                  <>
                    <span>Confirm & Create Issue</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
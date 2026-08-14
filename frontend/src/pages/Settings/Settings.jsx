import React, { useState, useEffect } from "react";
import { Sliders, Key, Sun, Moon, Bot, Save, Check } from "lucide-react";

export default function Settings() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("sentinel_theme") || "dark";
  });

  const [provider, setProvider] = useState("anthropic");
  const [model, setModel] = useState("claude-3-5-sonnet");
  const [apiKey, setApiKey] = useState("sk-ant-api03-••••••••••••••••");
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    localStorage.setItem("sentinel_theme", theme);
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const handleSave = () => {
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-xl font-bold tracking-tight text-zinc-100">
          Sentinel Settings
        </h1>
        <p className="text-xs text-zinc-400 mt-1">
          Configure AI LLM providers, severity rules, and system options.
        </p>
      </div>

      {/* LLM ENGINE CONFIG */}
      <div className="bg-zinc-900/60 border border-zinc-800/80 rounded-xl p-6 space-y-5">
        <div className="flex items-center gap-3 pb-3 border-b border-zinc-800/80">
          <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-zinc-100">LLM Triage Engine</h2>
            <p className="text-xs text-zinc-500">Model selection for bug extraction & severity rating</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-zinc-300">Provider</label>
            <select
              value={provider}
              onChange={(e) => setProvider(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2.5 text-xs text-zinc-200 focus:outline-none focus:border-amber-500/50"
            >
              <option value="anthropic">Anthropic (Claude)</option>
              <option value="openai">OpenAI (GPT-4o)</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-zinc-300">Model Version</label>
            <select
              value={model}
              onChange={(e) => setModel(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2.5 text-xs text-zinc-200 focus:outline-none focus:border-amber-500/50"
            >
              <option value="claude-3-5-sonnet">Claude 3.5 Sonnet (Recommended)</option>
              <option value="claude-3-haiku">Claude 3 Haiku (Fast)</option>
              <option value="gpt-4o">GPT-4o</option>
            </select>
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-medium text-zinc-300 flex items-center gap-1.5">
            <Key className="w-3.5 h-3.5 text-zinc-400" /> API Secret Key
          </label>
          <input
            type="password"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2.5 text-xs text-zinc-200 font-mono focus:outline-none focus:border-amber-500/50"
          />
        </div>
      </div>

      {/* APPEARANCE */}
      <div className="bg-zinc-900/60 border border-zinc-800/80 rounded-xl p-6 space-y-5">
        <div className="flex items-center gap-3 pb-3 border-b border-zinc-800/80">
          <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400">
            <Sliders className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-zinc-100">Appearance</h2>
            <p className="text-xs text-zinc-500">Workspace color palette preference</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 max-w-md">
          <button
            onClick={() => setTheme("dark")}
            className={`p-4 rounded-xl border flex items-center gap-3 text-xs font-medium transition-all cursor-pointer ${
              theme === "dark"
                ? "border-amber-500/50 bg-zinc-900 text-zinc-100 shadow-md"
                : "border-zinc-800 bg-zinc-950 text-zinc-500 hover:text-zinc-300"
            }`}
          >
            <Moon className="w-4 h-4 text-amber-400" />
            <span>Dark (Zinc 950)</span>
          </button>

          <button
            onClick={() => setTheme("light")}
            className={`p-4 rounded-xl border flex items-center gap-3 text-xs font-medium transition-all cursor-pointer ${
              theme === "light"
                ? "border-amber-500/50 bg-zinc-100 text-zinc-900 shadow-md"
                : "border-zinc-800 bg-zinc-950 text-zinc-500 hover:text-zinc-300"
            }`}
          >
            <Sun className="w-4 h-4 text-indigo-600" />
            <span>Light (Zinc 100)</span>
          </button>
        </div>
      </div>

      {/* SAVE BUTTON */}
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          className="flex items-center gap-2 bg-zinc-100 text-zinc-950 hover:bg-white px-5 py-2.5 rounded-lg text-xs font-semibold transition-all cursor-pointer shadow-sm"
        >
          {isSaved ? (
            <>
              <Check className="w-4 h-4 text-emerald-600" />
              <span>Saved Preferences</span>
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              <span>Save Changes</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
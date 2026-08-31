import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Sliders, Key, Sun, Moon, Bot, LogOut, User as UserIcon } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

export default function Settings() {
  const { user, logout, setTheme } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  async function handleThemeChange(theme) {
    setError(null);
    try {
      await setTheme(theme);
    } catch (err) {
      setError("Failed to save theme. Please try again.");
    }
  }

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-xl font-bold tracking-tight text-zinc-100">
          Contexture Settings
        </h1>
        <p className="text-xs text-zinc-400 mt-1">
          Manage your account and workspace preferences.
        </p>
      </div>

      {error && (
        <div className="rounded-lg border border-rose-900/40 bg-rose-950/20 px-4 py-2.5 text-xs text-rose-400">
          {error}
        </div>
      )}
      
      <div className="bg-zinc-900/60 border border-zinc-800/80 rounded-xl p-6 space-y-5">
        <div className="flex items-center gap-3 pb-3 border-b border-zinc-800/80">
          <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
            <UserIcon className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-zinc-100">Account</h2>
            <p className="text-xs text-zinc-500">Your Contexture login</p>
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-medium text-zinc-300">Email</label>
          <p className="text-sm text-zinc-100">{user?.email}</p>
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-xs font-medium text-rose-400 hover:text-rose-300 transition-colors cursor-pointer"
        >
          <LogOut className="w-3.5 h-3.5" />
          Log Out
        </button>
      </div>

      <div className="bg-zinc-900/60 border border-zinc-800/80 rounded-xl p-6 space-y-5">
        <div className="flex items-center gap-3 pb-3 border-b border-zinc-800/80">
          <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400">
            <Sliders className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-zinc-100">Appearance</h2>
            <p className="text-xs text-zinc-500">Saved to your account</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 max-w-md">
          <button
            onClick={() => handleThemeChange("dark")}
            className={`p-4 rounded-xl border flex items-center gap-3 text-xs font-medium transition-all cursor-pointer ${
              user?.theme === "dark"
                ? "border-amber-500/50 bg-zinc-900 text-zinc-100 shadow-md"
                : "border-zinc-800 bg-zinc-950 text-zinc-500 hover:text-zinc-300"
            }`}
          >
            <Moon className="w-4 h-4 text-amber-400" />
            <span>Dark</span>
          </button>

          <button
            onClick={() => handleThemeChange("light")}
            className={`p-4 rounded-xl border flex items-center gap-3 text-xs font-medium transition-all cursor-pointer ${
              user?.theme === "light"
                ? "border-amber-500/50 bg-zinc-100 text-zinc-900 shadow-md"
                : "border-zinc-800 bg-zinc-950 text-zinc-500 hover:text-zinc-300"
            }`}
          >
            <Sun className="w-4 h-4 text-indigo-600" />
            <span>Light</span>
          </button>
        </div>
      </div>

      <div className="bg-zinc-900/30 border border-zinc-800/50 rounded-xl p-6 space-y-5 opacity-60">
        <div className="flex items-center gap-3 pb-3 border-b border-zinc-800/50">
          <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-zinc-100 flex items-center gap-2">
              LLM Triage Engine
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-500 font-normal">
                Coming Soon
              </span>
            </h2>
            <p className="text-xs text-zinc-500">Model selection for bug extraction & severity rating</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-zinc-500">Provider</label>
            <select
              disabled
              className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2.5 text-xs text-zinc-600 cursor-not-allowed"
            >
              <option>Groq (Llama 3.3 70B)</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-zinc-500">Model Version</label>
            <select
              disabled
              className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2.5 text-xs text-zinc-600 cursor-not-allowed"
            >
              <option>llama-3.3-70b-versatile</option>
            </select>
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-medium text-zinc-500 flex items-center gap-1.5">
            <Key className="w-3.5 h-3.5" /> API Secret Key
          </label>
          <input
            disabled
            type="password"
            value="Configured via server environment"
            className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2.5 text-xs text-zinc-600 cursor-not-allowed"
          />
        </div>
      </div>
    </div>
  );
}
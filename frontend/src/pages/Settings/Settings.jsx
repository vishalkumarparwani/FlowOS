import React from 'react';
import { Key, GitPullRequest, Layers, Shield } from 'lucide-react';

export default function Settings() {
  return (
    <div className="mt-5 px-12 max-w-7xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-zinc-100">Workspace Settings & Integrations</h1>
        <p className="text-sm text-zinc-400 mt-1">Manage API keys, team access roles, and two-way sync integrations.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="rounded-xl border border-zinc-800/80 bg-zinc-900/30 p-6 space-y-4">
          <div className="flex items-center gap-3">
            <GitPullRequest className="w-5 h-5 text-zinc-300" />
            <h3 className="text-base font-semibold text-zinc-100">Linear Two-Way Sync</h3>
          </div>
          <p className="text-xs text-zinc-400">Automatically map generated SpecFlow backlog items directly into your Linear workspace.</p>
          <div className="pt-2">
            <span className="inline-flex items-center px-2.5 py-1 rounded text-xs font-medium bg-emerald-950/60 text-emerald-400 border border-emerald-800/50">
              Connected (Acme Team)
            </span>
          </div>
        </div>

        <div className="rounded-xl border border-zinc-800/80 bg-zinc-900/30 p-6 space-y-4">
          <div className="flex items-center gap-3">
            <Key className="w-5 h-5 text-zinc-300" />
            <h3 className="text-base font-semibold text-zinc-100">LLM Provider API Key</h3>
          </div>
          <p className="text-xs text-zinc-400">Configure your custom OpenAI/Anthropic API credentials for technical AC generation.</p>
          <input
            type="password"
            value="sk-proj-************************"
            readOnly
            className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-xs font-mono text-zinc-400"
          />
        </div>
      </div>
    </div>
  );
}
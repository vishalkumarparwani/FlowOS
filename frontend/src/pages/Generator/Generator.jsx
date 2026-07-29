import React, { useState } from 'react';
import { Wand2, Plus, Check } from 'lucide-react';

export default function Generator({ initialInput = '', onAddToBacklog }) {
  const [inputText, setInputText] = useState(initialInput || '');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedItems, setGeneratedItems] = useState([]);
  const [addedIds, setAddedIds] = useState([]);

  const handleGenerate = () => {
    if (!inputText.trim()) return;
    setIsGenerating(true);

    setTimeout(() => {
      setGeneratedItems([
        {
          id: `GEN-${Math.floor(100 + Math.random() * 900)}`,
          title: 'Database Schema & Migration for Tenant Storage Quota',
          estimate: 'Medium (3 pts)',
          epic: 'Storage Engine V2',
          acceptanceCriteria: [
            'Add column storage_quota_bytes to organizations table with default 10GB limit',
            'Include indices on tenant_id and usage_bytes for fast sum aggregations',
            'Migration rollback script verified in CI/CD pipeline'
          ]
        },
        {
          id: `GEN-${Math.floor(100 + Math.random() * 900)}`,
          title: 'Middleware Enforcement for Storage Limit Guardrails',
          estimate: 'Small (2 pts)',
          epic: 'Storage Engine V2',
          acceptanceCriteria: [
            'Intercept POST/PUT file payload streams before buffer allocation',
            'Return standard HTTP 413 Payload Too Large if tenant usage exceeds 100%',
            'Emit Prometheus metric counter tenant_storage_exceeded_total'
          ]
        },
        {
          id: `GEN-${Math.floor(100 + Math.random() * 900)}`,
          title: 'Usage Webhook & Alert Notification Trigger Engine',
          estimate: 'Large (8 pts)',
          epic: 'Storage Engine V2',
          acceptanceCriteria: [
            'Trigger Slack/Email notification when tenant hits 80% and 95% quota capacity',
            'Deduplicate alert triggers within a 24-hour rolling window',
            'Expose GraphQL query for frontend usage progress bar'
          ]
        }
      ]);
      setIsGenerating(false);
    }, 1200);
  };

  const handleAddSingle = (item) => {
    onAddToBacklog({
      id: item.id,
      title: item.title,
      complexity: item.estimate.startsWith('Small') ? 'S' : item.estimate.startsWith('Medium') ? 'M' : 'L',
      status: 'planning',
      epic: item.epic,
      acceptanceCriteria: item.acceptanceCriteria
    });
    setAddedIds((prev) => [...prev, item.id]);
  };

  return (
    <div className="mt-5 px-12 max-w-7xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-zinc-100">AI Spec-to-Backlog Generator</h1>
        <p className="text-sm text-zinc-400 mt-1">Paste raw product specs, Slack threads, or architecture notes to turn them into structured technical backlog stories.</p>
      </div>

      <div className="rounded-xl border border-zinc-800/80 bg-zinc-900/30 p-6 space-y-4">
        <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400 block">
          Raw Product Specification or Feature Outline
        </label>
        <textarea
          rows={6}
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Paste raw requirements here... e.g. 'We need to introduce multi-tenant organization storage limits. Admins should see a bar chart of usage...'"
          className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-4 text-sm text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-zinc-600 font-mono"
        />
        <div className="flex justify-end">
          <button
            onClick={handleGenerate}
            disabled={isGenerating || !inputText.trim()}
            className="bg-zinc-100 text-zinc-950 hover:bg-zinc-200 disabled:opacity-50 px-5 py-2.5 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors cursor-pointer"
          >
            <Wand2 className="w-4 h-4" />
            {isGenerating ? 'Extracting Backlog Items...' : 'Generate Technical Backlog'}
          </button>
        </div>
      </div>

      {generatedItems.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-zinc-100">Generated Backlog Extraction</h2>
          <div className="space-y-3">
            {generatedItems.map((item) => {
              const isAdded = addedIds.includes(item.id);
              return (
                <div key={item.id} className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-5 space-y-3">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-mono text-zinc-500">{item.id}</span>
                        <span className="text-xs px-2 py-0.5 rounded bg-zinc-800 text-zinc-300">{item.epic}</span>
                        <span className="text-xs font-mono text-emerald-400 font-semibold">{item.estimate}</span>
                      </div>
                      <h3 className="text-base font-semibold text-zinc-100">{item.title}</h3>
                    </div>
                    <button
                      onClick={() => handleAddSingle(item)}
                      disabled={isAdded}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer ${
                        isAdded
                          ? 'bg-zinc-800 text-zinc-500 border border-zinc-700/50'
                          : 'bg-zinc-100 text-zinc-950 hover:bg-zinc-200'
                      }`}
                    >
                      {isAdded ? <Check className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                      {isAdded ? 'Added' : 'Add to Backlog'}
                    </button>
                  </div>
                  <div className="pt-2 border-t border-zinc-800/40">
                    <p className="text-[11px] font-semibold text-zinc-500 uppercase tracking-wider mb-1">
                      Acceptance Criteria
                    </p>
                    <ul className="space-y-1">
                      {item.acceptanceCriteria.map((ac, idx) => (
                        <li key={idx} className="text-xs text-zinc-400 flex items-start gap-2">
                          <span className="text-zinc-600">•</span>
                          <span>{ac}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
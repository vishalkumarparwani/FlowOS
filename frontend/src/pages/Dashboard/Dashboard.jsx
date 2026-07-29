import React from 'react';
import { Wand2, ChevronRight } from 'lucide-react';
import { INITIAL_EPICS } from '../../api';
import DashboardCard from './DashboardCard';
import UpcomingBacklog from './UpcomingBacklog';

export default function Dashboard({ onNavigate }) {
  const stats = [
    { label: 'Spec-to-Code Speed', value: '4.2 Days', trend: '-35%', subtext: 'vs last sprint avg' },
    { label: 'AI Backlog Precision', value: '94.8%', trend: '+2.4%', subtext: 'AC validation rate' },
    { label: 'Active Epics', value: '8 Epics', trend: '124 items', subtext: 'tracked across teams' },
    { label: 'Time Saved / Sprint', value: '38.5 hrs', trend: '+6.4h', subtext: 'per PM average' },
  ];

  const recentGenerations = [
    { title: 'Auth Token Revocation Flow', itemsCount: 6, epic: 'Auth & Identity V2', time: '10 mins ago' },
    { title: 'Stripe Webhook Handler', itemsCount: 4, epic: 'Billing & Metering', time: '1 hour ago' },
    { title: 'Vector Store Query Pipeline', itemsCount: 9, epic: 'Vector Search', time: '3 hours ago' },
    { title: 'SSE Comment Stream Engine', itemsCount: 7, epic: 'Collaboration Engine', time: 'Yesterday' }
  ];

  return (
    <div className="mt-5 px-12 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-zinc-100">Engineering Velocity Dashboard</h1>
          <p className="text-sm text-zinc-400 mt-1">Real-time metrics on spec breakdown efficiency and backlog pipeline performance.</p>
        </div>
        <button
          onClick={() => onNavigate('generator')}
          className="bg-zinc-100 text-zinc-950 hover:bg-zinc-200 px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors cursor-pointer"
        >
          <Wand2 className="w-4 h-4" />
          Generate New Spec
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, idx) => (
          <DashboardCard key={idx} {...stat} />
        ))}
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 rounded-xl border border-zinc-800/80 bg-zinc-900/30 p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-zinc-100">Active Feature Roadmaps</h2>
              <p className="text-xs text-zinc-400 mt-0.5">Overall epic delivery status against quarterly milestones</p>
            </div>
            <button 
              onClick={() => onNavigate('roadmaps')}
              className="text-xs text-zinc-400 hover:text-zinc-200 flex items-center gap-1 transition-colors cursor-pointer"
            >
              View all epics <ChevronRight className="w-3 h-3" />
            </button>
          </div>

          <div className="space-y-5">
            {INITIAL_EPICS.slice(0, 4).map((epic) => (
              <div key={epic.id} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-zinc-200">{epic.name}</span>
                    <span className="text-xs text-zinc-500">({epic.itemCount} tasks)</span>
                  </div>
                  <span className="text-xs font-semibold text-zinc-300">{epic.progress}%</span>
                </div>
                <div className="w-full bg-zinc-800/80 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-zinc-100 h-full rounded-full transition-all duration-500"
                    style={{ width: `${epic.progress}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <UpcomingBacklog items={recentGenerations} />
      </div>
    </div>
  );
}
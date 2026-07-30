<<<<<<< HEAD
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
=======
import React from "react";
import DashboardCard from "./DashboardCard";
import UpcomingTasks from "./UpcomingTasks";
import Pomodoro from "./Pomodoro";

import {
  Wand2,
  GitBranch,
  BrainCircuit,
  Clock3,
  ArrowUpRight,
  Plus,
} from "lucide-react";

export default function Dashboard() {
  const stats = [
    {
      title: "Spec-to-Code Speed",
      value: "4.2 Days",
      description: "-35% vs previous sprint",
      icon: Clock3,
      iconStyle: "text-emerald-400 bg-emerald-950/50",
    },
    {
      title: "AI Backlog Precision",
      value: "94.8%",
      description: "Acceptance criteria accuracy",
      icon: BrainCircuit,
      iconStyle: "text-violet-400 bg-violet-950/50",
    },
    {
      title: "Active Epics",
      value: "8",
      description: "124 engineering tasks",
      icon: GitBranch,
      iconStyle: "text-sky-400 bg-sky-950/50",
    },
    {
      title: "Time Saved / Sprint",
      value: "38.5h",
      description: "+6.4h compared to last sprint",
      icon: Wand2,
      iconStyle: "text-amber-400 bg-amber-950/50",
    },
  ];

  const recentTasks = [
    {
      id: 1,
      title: "Authentication & Session Service",
      projects: "Identity Platform",
      done: false,
      priority: "High",
    },
    {
      id: 2,
      title: "Stripe Billing Integration",
      projects: "Payments",
      done: false,
      priority: "Medium",
    },
    {
      id: 3,
      title: "Vector Search API",
      projects: "Knowledge Engine",
      done: true,
      priority: "High",
    },
    // {
    //   id: 4,
    //   title: "Notification Worker",
    //   projects: "Infrastructure",
    //   done: false,
    //   priority: "Low",
    // },
  ];

  return (
    <div className="mx-auto mt-6 max-w-7xl space-y-8 px-8 xl:px-12">
      {/* Header */}
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-zinc-100">
            Engineering Velocity Dashboard
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-400">
            Monitor AI-assisted software delivery, engineering throughput,
            backlog health, and overall platform performance across every
            product initiative.
          </p>
        </div>

        <button className="flex items-center gap-2 rounded-xl bg-zinc-100 px-5 py-3 text-sm font-semibold text-zinc-950 transition hover:bg-zinc-200">
          <Plus size={16} />
>>>>>>> 8d45267 (feat: redesign dashboard and backlog for SpecFlow AI)
          Generate New Spec
        </button>
      </div>

<<<<<<< HEAD
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, idx) => (
          <DashboardCard key={idx} {...stat} />
=======
      {/* AI Banner */}
      <div className="flex items-start gap-4 rounded-2xl border border-indigo-900/40 bg-gradient-to-r from-indigo-950/40 via-zinc-900 to-zinc-900 p-6">
        <div className="rounded-xl bg-indigo-500/10 p-3 text-indigo-400">
          <BrainCircuit size={22} />
        </div>

        <div className="flex-1">
          <h3 className="font-semibold text-indigo-200">
            AI Engineering Recommendation
          </h3>

          <p className="mt-1 text-sm leading-6 text-zinc-400">
            Three specifications are awaiting decomposition. Generating them
            now could save approximately{" "}
            <span className="font-semibold text-zinc-200">6.4 engineering hours</span>{" "}
            during the current sprint while maintaining a 95% acceptance
            criteria accuracy rate.
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat, index) => (
          <DashboardCard
            key={index}
            title={stat.title}
            value={stat.value}
            description={stat.description}
            icon={stat.icon}
            iconStyle={stat.iconStyle}
          />
>>>>>>> 8d45267 (feat: redesign dashboard and backlog for SpecFlow AI)
        ))}
      </div>

      {/* Main Grid */}
<<<<<<< HEAD
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
=======
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left */}
        <div className="rounded-2xl border border-zinc-800/80 bg-zinc-900/30 p-6 lg:col-span-2">
          <div className="flex items-center justify-between border-b border-zinc-800 pb-5">
            <div>
              <h3 className="text-lg font-semibold text-zinc-100">
                Active Engineering Backlog
              </h3>

              <p className="mt-1 text-xs text-zinc-500">
                Highest-priority specifications currently assigned to the
                engineering pipeline.
              </p>
            </div>

            <button className="flex items-center gap-1 text-xs font-medium text-zinc-500 transition hover:text-zinc-200">
              View all
              <ArrowUpRight size={13} />
            </button>
          </div>

          <div className="mt-5 space-y-1 divide-y divide-zinc-800/60">
            {recentTasks.map((task) => (
              <UpcomingTasks
                key={task.id}
                title={task.title}
                projects={task.projects}
                done={task.done}
                priority={task.priority}
              />
>>>>>>> 8d45267 (feat: redesign dashboard and backlog for SpecFlow AI)
            ))}
          </div>
        </div>

<<<<<<< HEAD
        <UpcomingBacklog items={recentGenerations} />
=======
        {/* Right */}
        <div>
          <Pomodoro />
        </div>
>>>>>>> 8d45267 (feat: redesign dashboard and backlog for SpecFlow AI)
      </div>
    </div>
  );
}
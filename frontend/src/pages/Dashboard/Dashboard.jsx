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
      title: "Active Roadmaps",
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
    {
      id: 4,
      title: "Notification Worker",
      projects: "Infrastructure",
      done: false,
      priority: "Low",
    },
  ];

  return (
    <div className="mx-auto mt-6 max-w-7xl space-y-8 px-8 xl:px-12">
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
          Generate New Spec
        </button>
      </div>

      <div className="flex items-start gap-4 rounded-2xl border border-indigo-900/40 bg-linear-to-r from-indigo-950/40 via-zinc-900 to-zinc-900 p-6">
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
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
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
            ))}
          </div>
        </div>

        <div>
          <Pomodoro />
        </div>
      </div>
    </div>
  );
}
import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { getIssues } from "../../api";
import DashboardCard from "./DashboardCard";
import UpcomingIssueCard from "./UpcomingIssues";
import Pomodoro from "./Pomodoro";

import {
  AlertTriangle,
  GitBranch,
  Boxes,
  Clock3,
  ArrowUpRight,
  Plus,
  BrainCircuit,
} from "lucide-react";

export default function Dashboard() {
  const [issues, setIssues] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getIssues();
        setIssues(data);
      } catch (err) {
        setError("Failed to load dashboard data.");
      }
    }
    fetchData();
  }, []);

  const openIssues = issues.filter((i) => i.status !== "done");
  const criticalIssues = issues.filter(
    (i) => i.severity === "P1" && i.status !== "done"
  );
  const servicesAffected = new Set(issues.map((i) => i.service)).size;

  const stats = [
    {
      title: "Total Issues",
      value: issues.length,
      description: `${issues.length} tracked overall`,
      icon: GitBranch,
      iconStyle: "text-sky-400 bg-sky-950/50",
    },
    {
      title: "Critical Issues",
      value: criticalIssues.length,
      description: "Needing immediate attention",
      icon: AlertTriangle,
      iconStyle: "text-rose-400 bg-rose-950/50",
    },
    {
      title: "Open Issues",
      value: openIssues.length,
      description: "Not yet resolved",
      icon: Clock3,
      iconStyle: "text-amber-400 bg-amber-950/50",
    },
    {
      title: "Services Affected",
      value: servicesAffected,
      description: "Distinct services with issues",
      icon: Boxes,
      iconStyle: "text-violet-400 bg-violet-950/50",
    },
  ];

  const recentIssues = issues.slice(0, 4);

  const insightText =
    criticalIssues.length > 0
      ? `${criticalIssues.length} critical issue${
          criticalIssues.length > 1 ? "s" : ""
        } need attention. Check the Issues page to triage them.`
      : "No critical issues right now. Everything looks stable.";

  return (
    <div className="mx-auto mt-6 max-w-7xl space-y-8 px-8 xl:px-12">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-zinc-100">
            Engineering Velocity Dashboard
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-400">
            Monitor issue health, service risk, and engineering throughput
            across your product.
          </p>
        </div>

        <button
          onClick={() => navigate("/issues")}
          className="flex items-center gap-2 rounded-xl bg-zinc-100 px-5 py-3 text-sm font-semibold text-zinc-950 transition hover:bg-zinc-200"
        >
          <Plus size={16} />
          Report New Issue
        </button>
      </div>

      {error && (
        <div className="rounded-lg border border-rose-900/40 bg-rose-950/20 px-4 py-2.5 text-xs text-rose-400">
          {error}
        </div>
      )}

      <div className="flex items-start gap-4 rounded-2xl border border-indigo-900/40 bg-linear-to-r from-indigo-950/40 via-zinc-900 to-zinc-900 p-6">
        <div className="rounded-xl bg-indigo-500/10 p-3 text-indigo-400">
          <BrainCircuit size={22} />
        </div>

        <div className="flex-1">
          <h3 className="font-semibold text-indigo-200">
            Engineering Insight
          </h3>

          <p className="mt-1 text-sm leading-6 text-zinc-400">
            {insightText}
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
                Recent Issues
              </h3>

              <p className="mt-1 text-xs text-zinc-500">
                Highest-severity issues currently open across your services.
              </p>
            </div>

            <Link
              to="/issues"
              className="flex items-center gap-1 text-xs font-medium text-zinc-500 transition hover:text-zinc-200"
            >
              View all
              <ArrowUpRight size={13} />
            </Link>
          </div>

          <div className="mt-5 space-y-1 divide-y divide-zinc-800/60">
            {recentIssues.length === 0 ? (
              <p className="py-6 text-center text-sm text-zinc-500">
                No issues reported yet.
              </p>
            ) : (
              recentIssues.map((issue) => (
                <UpcomingIssueCard key={issue.id} issue={issue} />
              ))
            )}
          </div>
        </div>

        <div>
          <Pomodoro />
        </div>
      </div>
    </div>
  );
}
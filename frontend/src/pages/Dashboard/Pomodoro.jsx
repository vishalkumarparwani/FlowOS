import React, { useState, useEffect } from "react";
import { Timer, Play, Pause, RotateCcw } from "lucide-react";

export default function Pomodoro() {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [completedSessions, setCompletedSessions] = useState(0);

  function handleStart() {
    setIsRunning(true);
  }

  function handlePause() {
    setIsRunning(false);
  }

  function handleReset() {
    setMinutes(25);
    setSeconds(0);
    setIsRunning(false);
  }

  useEffect(() => {
    if (!isRunning) return;

    const timer = setInterval(() => {
      if (seconds > 0) {
        setSeconds((prev) => prev - 1);
      } else if (minutes > 0) {
        setMinutes((prev) => prev - 1);
        setSeconds(59);
      } else {
        setIsRunning(false);
        setCompletedSessions((prev) => prev + 1);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [isRunning, minutes, seconds]);

  return (
    <div className="rounded-2xl border border-zinc-800/80 bg-zinc-900/30 p-6">
      <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
        <div className="flex items-center gap-2">
          <Timer className="h-4 w-4 text-indigo-400" />
          <h3 className="text-sm font-semibold text-zinc-100">
            Deep Work Session
          </h3>
        </div>
<<<<<<< HEAD
    );
}


// export default function Pomodoro() {
//   return (
//     <div className="rounded-xl border border-zinc-800/80 bg-zinc-900/30 p-5 flex items-center justify-between">
//       <div className="flex items-center gap-3">
//         <Clock className="w-5 h-5 text-zinc-400" />
//         <div>
//           <p className="text-xs font-semibold text-zinc-200">Sprint Focus Timer</p>
//           <p className="text-[11px] text-zinc-500">25m Spec Review Block</p>
//         </div>
//       </div>
//       <button className="px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-xs text-zinc-200 font-mono">
//         25:00
//       </button>
//     </div>
//   );
// }
=======

        <span className="rounded-md border border-indigo-900/40 bg-indigo-950/40 px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-indigo-300">
          Focus
        </span>
      </div>

      <div className="mt-8 flex flex-col items-center">
        <h2 className="text-6xl font-bold tracking-tight text-zinc-100">
          {minutes}:{seconds.toString().padStart(2, "0")}
        </h2>

        <p className="mt-3 text-xs text-zinc-500">
          Finish your current implementation before switching context.
        </p>

        <div className="mt-8 flex gap-3">
          <button
            onClick={handleStart}
            disabled={isRunning}
            className={`rounded-xl p-3 transition-all ${
              isRunning
                ? "cursor-not-allowed bg-zinc-800 text-zinc-600"
                : "bg-zinc-100 text-zinc-950 hover:bg-zinc-200"
            }`}
          >
            <Play size={18} />
          </button>

          <button
            onClick={handlePause}
            disabled={!isRunning}
            className={`rounded-xl p-3 transition-all ${
              !isRunning
                ? "cursor-not-allowed bg-zinc-800 text-zinc-600"
                : "bg-zinc-900 text-zinc-100 hover:bg-zinc-800"
            }`}
          >
            <Pause size={18} />
          </button>

          <button
            onClick={handleReset}
            className="rounded-xl bg-zinc-900 p-3 text-zinc-100 transition-all hover:bg-zinc-800"
          >
            <RotateCcw size={18} />
          </button>
        </div>
      </div>

      <div className="mt-8 space-y-4 border-t border-zinc-800 pt-5">
        <div className="flex items-center justify-between">
          <span className="text-xs text-zinc-500">Completed Sessions</span>
          <span className="text-sm font-semibold text-zinc-100">
            {completedSessions}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-xs text-zinc-500">Today's Focus Time</span>
          <span className="text-sm font-semibold text-zinc-100">
            1h 15m
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-xs text-zinc-500">Current Goal</span>
          <span className="text-xs font-medium text-indigo-300">
            Finish API Design
          </span>
        </div>
      </div>
    </div>
  );
}
>>>>>>> 8d45267 (feat: redesign dashboard and backlog for SpecFlow AI)

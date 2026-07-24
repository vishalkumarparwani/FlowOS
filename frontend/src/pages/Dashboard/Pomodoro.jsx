import React, { useState, useEffect } from "react";
import { Timer, Play, Pause, RotateCcw } from "lucide-react";

export default function Pomodoro() {

    const [minutes, setMinutes] = useState(25)
    const [seconds, setSeconds] = useState(0)
    const [isRunning, setIsRunning] = useState(false)
    const [completedSessions, setCompletedSessions] = useState(0)


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
        if(!isRunning) {
            return;
        }

        const timer = setInterval(() => {
            if(seconds > 0) {
                setSeconds(seconds - 1);
            }
            else if(minutes > 0) {
                setMinutes(prev => prev - 1);
                setSeconds(59)
             }
            else {
                setIsRunning(false);
                setCompletedSessions(prev => prev + 1);
            }

        }, 1000);

        return () => {
            clearInterval(timer);
        }

    }, [isRunning, minutes, seconds])
    


    return (
        <div className="h-full rounded-xl border border-zinc-800/50 p-5 space-y-7">
            <div className="flex items-center justify-between pb-4 border-b border-zinc-900">
                <div className="flex items-center gap-2">
                    <Timer className="text-rose-400 w-4 h-4" />
                    <h3 className="text-sm font-semibold text-zinc-200">
                        Focus Timer
                    </h3>
                </div>

                <span className="text-xs font-semibold text-zinc-400 bg-zinc-800 px-1.5 py-1">
                    Focus
                </span>
            </div>

            <div className="space-y-3 flex flex-col items-center">
                <div className="flex flex-col items-center">
                    <h3 className="text-6xl font-bold">
                        {minutes} : {seconds.toString().padStart(2, "0")}
                    </h3>
                    <p className="mt-2 text-[11px] text-zinc-500">
                        Stay focused on one task
                    </p>
                </div>
                <div className="flex gap-3 mt-7 opacity-85">
                    
                    <button 
                        onClick={handleStart}
                        disabled={isRunning}
                        className={`p-2 rounded-lg transition-colors
                        ${isRunning
                            ? "bg-zinc-800 text-zinc-600 cursor-not-allowed"
                            : "bg-zinc-900 text-white hover:bg-zinc-800"
                        }`}
                        >
                        <Play size={18} />
                    </button>

                    <button
                        onClick={handlePause}
                        disabled={!isRunning}
                        className={`p-2 rounded-lg transition-colors
                        ${!isRunning
                            ? "bg-zinc-800 text-zinc-600 cursor-not-allowed"
                            : "bg-zinc-900 text-white hover:bg-zinc-800"
                        }`}
                        >
                        <Pause size={18} />
                    </button>

                    <button
                        onClick={handleReset} 
                        className="p-2 rounded-lg text-white bg-zinc-900 hover:bg-zinc-800 transition-colors active:bg-zinc-600">
                        <RotateCcw size={18} />
                    </button>

                </div>
            </div>

            <div className="space-y-2 border-t border-zinc-800 pt-4">

                <div className="flex items-center justify-between">
                    <p className="mt-1 text-xs text-zinc-500">
                        Completed Sessions
                    </p>
                    <span className="text-sm font-semibold text-zinc-100">
                        {completedSessions}
                    </span>
                    
                    
                </div>
                <div className="flex items-center justify-between">
                    <p className="mt-1 text-xs text-zinc-500">
                        Focus Time
                    </p>
                    <span className="text-sm font-semibold text-zinc-100">
                        1h 15m
                    </span>
                </div>

            </div>
        </div>
    );
}
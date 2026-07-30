import React from "react";
import { Sparkles, X, Wand2, FileText } from "lucide-react";


export default function AISidebar({ isOpen, onClose, onNavigate }) {
    return (
        <aside
            className={`
            fixed right-0 top-0 bottom-0 w-80 bg-zinc-950 border-l border-zinc-800/80 p-5
            flex flex-col justify-between z-20 shadow-2xl transform transition-transform duration-300 ease-in-out
            ${isOpen ? "translate-x-0" : "translate-x-full"}
            `}
        >
            <div className="space-y-6">
                <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
                    <div className="flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-amber-400" />
                        <h3 className="text-sm font-bold text-zinc-100">
                            Spec Copilot AI
                        </h3>
                    </div>

                    <button
                        onClick={onClose}
                        className="text-zinc-500 hover:text-zinc-300 transition-colors"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>

                <div className="space-y-3">
                    <p className="text-xs text-zinc-400">
                        Select an automated action for your current spec context:
                    </p>

                    <button
                        onClick={() => {
                            onNavigate?.("generator");
                            onClose();
                        }}
                        className="w-full p-3 rounded-lg bg-zinc-900/60 border border-zinc-800 hover:border-zinc-700 text-left space-y-1 group transition-colors"
                    >
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-semibold text-zinc-200 group-hover:text-zinc-100">
                                Convert Active PRD
                            </span>
                            <Wand2 className="w-3.5 h-3.5 text-zinc-400" />
                        </div>

                        <p className="text-[11px] text-zinc-500">
                            Extract tasks & story points from PRD draft
                        </p>
                    </button>

                    <button className="w-full p-3 rounded-lg bg-zinc-900/60 border border-zinc-800 hover:border-zinc-700 text-left space-y-1 group transition-colors">
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-semibold text-zinc-200 group-hover:text-zinc-100">
                                Audit Technical AC
                            </span>
                            <FileText className="w-3.5 h-3.5 text-zinc-400" />
                        </div>

                        <p className="text-[11px] text-zinc-500">
                            Verify edge cases & schema completeness
                        </p>
                    </button>
                </div>
            </div>

            <div className="pt-4 border-t border-zinc-800">
                <p className="text-[10px] text-zinc-500 text-center">
                    Powered by SpecFlow Fine-Tuned LLM
                </p>
            </div>
        </aside>
    );
}
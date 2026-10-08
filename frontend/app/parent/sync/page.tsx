"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  KeyRound, 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck, 
  AlertCircle
} from "lucide-react";
import { useStudentParentFlow } from "@/lib/student-parent-flow";

export default function ParentSyncPage() {
  const router = useRouter();
  const { syncCode, isFamilySynced, verifyAndLinkSyncCode } = useStudentParentFlow();
  const [inputCode, setInputCode] = useState(syncCode || "PRISM-8492");
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState(isFamilySynced ? "Student Profile Already Linked" : "");

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    const cleaned = inputCode.trim().toUpperCase();
    if (!cleaned) {
      setErrorMsg("Please enter a valid Family Sync Code.");
      return;
    }

    const success = verifyAndLinkSyncCode(cleaned);
    if (success) {
      setSuccessMsg("Profile verified! Linking to Arun Kumar (Class 12 PCM)...");
      setTimeout(() => {
        router.push("/parent/constraints");
      }, 700);
    } else {
      setErrorMsg("Sync code not recognized. You can enter PRISM-8492 or generate a new one from the Student Portal.");
    }
  };

  const handleAutoFill = () => {
    setInputCode(syncCode || "PRISM-8492");
    setErrorMsg("");
  };

  return (
    <div className="max-w-2xl mx-auto py-8 px-4 space-y-8">
      {/* Flow Navigation Banner */}
      <div className="flex items-center justify-between text-xs text-rose-300/80 bg-purple-950/40 p-3 rounded-xl border border-purple-800/40">
        <div className="flex items-center gap-2">
          <span className="w-5 h-5 rounded-full bg-pink-500 text-white flex items-center justify-center font-bold text-[11px]">1</span>
          <span className="font-bold text-white">Family Sync</span>
        </div>
        <ArrowRight className="w-3.5 h-3.5 text-purple-400" />
        <div className="flex items-center gap-2 opacity-60">
          <span className="w-5 h-5 rounded-full bg-purple-900 text-purple-300 flex items-center justify-center font-bold text-[11px]">2</span>
          <span>Financial Constraints</span>
        </div>
        <ArrowRight className="w-3.5 h-3.5 text-purple-400" />
        <div className="flex items-center gap-2 opacity-60">
          <span className="w-5 h-5 rounded-full bg-purple-900 text-purple-300 flex items-center justify-center font-bold text-[11px]">3</span>
          <span>Parent Dashboard</span>
        </div>
      </div>

      {/* Main Card */}
      <div className="glass-card p-6 sm:p-8 rounded-3xl border border-purple-500/30 space-y-6">
        <div className="text-center space-y-2">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-tr from-pink-500 to-purple-600 p-[2px] shadow-lg shadow-purple-600/30">
            <div className="w-full h-full bg-[#13071f] rounded-[14px] flex items-center justify-center">
              <KeyRound className="w-7 h-7 text-pink-400" />
            </div>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            Enter Family Sync Code
          </h1>
          <p className="text-xs sm:text-sm text-rose-200/80 max-w-md mx-auto">
            Pair with your student's PRISM assessment session to harmonize career aspiration with realistic family financial planning.
          </p>
        </div>

        {/* Input Form */}
        <form onSubmit={handleVerify} className="space-y-5">
          <div className="space-y-2">
            <label className="block text-xs font-semibold text-rose-200/90 uppercase tracking-wider">
              Family Sync Code
            </label>
            <div className="relative">
              <input
                type="text"
                value={inputCode}
                onChange={(e) => {
                  setInputCode(e.target.value.toUpperCase());
                  setErrorMsg("");
                }}
                placeholder="e.g. PRISM-8492"
                className="w-full px-4 py-3.5 rounded-xl bg-purple-950/50 border border-purple-600/40 text-white placeholder-rose-300/40 font-mono text-center text-lg tracking-widest font-bold focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
              />
            </div>
            <div className="flex items-center justify-between text-[11px] text-rose-300/70 pt-1">
              <span>Student generates this in Step 1 (/student/setup)</span>
              <button
                type="button"
                onClick={handleAutoFill}
                className="text-pink-400 hover:text-pink-300 font-semibold underline underline-offset-2"
              >
                Auto-fill current session code
              </button>
            </div>
          </div>

          {errorMsg && (
            <div className="p-3 rounded-xl bg-rose-950/70 border border-rose-500/40 flex items-center gap-2 text-xs text-rose-200">
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {successMsg && (
            <div className="p-3 rounded-xl bg-emerald-950/70 border border-emerald-500/40 flex items-center gap-2 text-xs text-emerald-200">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{successMsg}</span>
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-pink-600 via-rose-500 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white font-bold text-sm shadow-lg shadow-pink-600/30 flex items-center justify-center gap-2 transition-all"
          >
            <span>Verify & Link Student Profile</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Sync Info Pill */}
        <div className="p-4 rounded-2xl bg-purple-950/40 border border-purple-800/40 space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-rose-200">
            <ShieldCheck className="w-4 h-4 text-pink-400" />
            <span>Why Family Synchronization Matters</span>
          </div>
          <p className="text-[11px] text-rose-200/75 leading-relaxed">
            By connecting family constraints before career finalization, PRISM eliminates unrealistic debt traps and identifies optimal degrees matching Arun's aptitude (top 5th percentile) within your family's budget.
          </p>
          <div className="pt-2 border-t border-purple-900/40 flex items-center justify-between text-[11px]">
            <span className="text-rose-300/70">Linked Student Record:</span>
            <span className="font-bold text-white bg-purple-900/60 px-2 py-0.5 rounded border border-purple-700/40">
              Arun Kumar • Class 12 PCM
            </span>
          </div>
        </div>

        {/* Quick jump to student if needed */}
        <div className="text-center pt-2">
          <Link
            href="/student/setup"
            className="text-xs text-purple-300 hover:text-pink-300 underline underline-offset-4"
          >
            Don't have a sync code? Generate one in Student Portal ➔
          </Link>
        </div>
      </div>
    </div>
  );
}

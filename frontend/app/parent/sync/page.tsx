"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  KeyRound, 
  ArrowRight, 
  CheckCircle2, 
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
      setSuccessMsg("Verified! Linking account...");
      setTimeout(() => {
        router.push("/parent/constraints");
      }, 600);
    } else {
      setErrorMsg("Code not recognized. Enter PRISM-8492 or generate a new code from the Student Portal.");
    }
  };

  const handleAutoFill = () => {
    setInputCode(syncCode || "PRISM-8492");
    setErrorMsg("");
  };

  return (
    <div className="max-w-xl mx-auto py-10 px-4 space-y-6">
      {/* Main Card */}
      <div className="glass-card p-6 sm:p-8 rounded-2xl border border-purple-500/30 space-y-6 text-center">
        <div className="space-y-2">
          <div className="w-12 h-12 mx-auto rounded-xl bg-gradient-to-tr from-pink-500 to-purple-600 flex items-center justify-center text-white shadow">
            <KeyRound className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">
            Enter Family Sync Code
          </h1>
          <p className="text-sm text-rose-200/80">
            Enter the code from the Student Portal to link accounts.
          </p>
        </div>

        {/* Input Form */}
        <form onSubmit={handleVerify} className="space-y-4 text-left">
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-rose-200/90 uppercase tracking-wider">
              Sync Code
            </label>
            <input
              type="text"
              value={inputCode}
              onChange={(e) => {
                setInputCode(e.target.value.toUpperCase());
                setErrorMsg("");
              }}
              placeholder="e.g. PRISM-8492"
              className="w-full px-4 py-3 rounded-xl bg-purple-950/50 border border-purple-600/40 text-white font-mono text-center text-xl tracking-widest font-bold focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
            <div className="flex justify-end pt-1">
              <button
                type="button"
                onClick={handleAutoFill}
                className="text-xs text-pink-300 hover:text-white underline"
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
            className="w-full py-3 px-6 rounded-xl bg-pink-600 hover:bg-pink-500 text-white font-bold text-sm shadow flex items-center justify-center gap-2 transition-all"
          >
            <span>Verify & Link</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="pt-2 text-center">
          <Link
            href="/student/setup"
            className="text-xs text-purple-300 hover:text-pink-300 underline"
          >
            Need a code? Generate one in Student Portal ➔
          </Link>
        </div>
      </div>
    </div>
  );
}

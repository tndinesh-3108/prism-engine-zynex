"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  Copy, 
  Check, 
  ArrowRight, 
  RotateCcw, 
  Users, 
  GraduationCap, 
  ExternalLink,
  Sliders
} from "lucide-react";
import { useStudentParentFlow } from "@/lib/student-parent-flow";
import { useStudentProfile } from "@/lib/student-profile-context";

export default function StudentSetupPage() {
  const { syncCode, generateNewSyncCode, verifyAndLinkSyncCode } = useStudentParentFlow();
  const { profile, openProfileModal } = useStudentProfile();
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(syncCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleQuickLinkForParent = () => {
    verifyAndLinkSyncCode(syncCode);
    handleCopy();
  };

  const qualificationLabel =
    profile.qualification === "12th"
      ? `Class 12 • ${profile.twelfthGroup || "CS/Maths"}`
      : profile.qualification === "UG pursuing"
      ? `UG Pursuing Year ${profile.ugPursuingYear} • ${profile.ugPursuingCourse || "Engineering"}`
      : profile.qualification === "UG"
      ? `UG Graduate • ${profile.ugDegree || "B.Tech"} (CGPA: ${profile.ugCgpa})`
      : `PG • ${profile.pgCourse || "Master of Tech"}`;

  return (
    <div className="max-w-3xl mx-auto space-y-8 py-6">
      {/* Step Badge & Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-950/70 text-pink-300 text-xs font-bold uppercase tracking-wider border border-pink-700/40">
          <GraduationCap className="w-3.5 h-3.5 text-pink-400" />
          <span>Step 1 of Flowchart: Student Setup</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
          Generate Your <span className="gradient-text">Family Sync Code</span>
        </h1>
        <p className="text-sm text-rose-200/80 max-w-xl mx-auto leading-relaxed">
          PRISM bridges your aptitude trajectory with your parent&apos;s financial capabilities. Share your unique code with your parent to synchronize college feasibility and family alignment.
        </p>
      </div>

      {/* Sync Code Presentation Card */}
      <div className="glass-card p-6 sm:p-8 rounded-3xl border-2 border-pink-500/40 shadow-2xl shadow-pink-900/20 text-center space-y-6 relative overflow-hidden">
        <div className="space-y-2">
          <span className="text-[11px] font-bold uppercase tracking-widest text-rose-300/80 block">
            Official Student Sync Token
          </span>
          <div className="inline-block p-4 sm:p-6 rounded-2xl bg-[#140822] border-2 border-pink-500/50 shadow-inner">
            <span className="text-4xl sm:text-5xl font-black tracking-widest text-white font-mono selection:bg-pink-500 selection:text-white">
              {syncCode}
            </span>
          </div>
          <div className="flex items-center justify-center gap-2 pt-1 flex-wrap text-xs text-rose-200/80">
            <span>Linked Profile: <strong>Arun Kumar</strong> • {qualificationLabel} • {profile.state}, {profile.country}</span>
            <button
              type="button"
              onClick={openProfileModal}
              className="text-pink-400 hover:text-pink-300 font-bold underline underline-offset-2 flex items-center gap-1"
            >
              <Sliders className="w-3 h-3" />
              <span>Change Qualification</span>
            </button>
          </div>
        </div>

        {/* Action Buttons for Code */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={handleCopy}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white font-bold text-xs sm:text-sm shadow-md shadow-pink-600/30 transition-all active:scale-95"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? "Copied Code to Clipboard!" : "Copy Family Sync Code"}</span>
          </button>

          <button
            type="button"
            onClick={generateNewSyncCode}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-purple-950/60 hover:bg-purple-900/50 text-rose-200 border border-purple-800/40 font-semibold text-xs transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5 text-pink-400" />
            <span>Generate New Code</span>
          </button>
        </div>

        {/* Flowchart Explainer Banner */}
        <div className="p-4 rounded-2xl bg-[#140822]/80 border border-purple-900/40 text-left space-y-2 text-xs">
          <div className="flex items-center gap-2 text-rose-100 font-bold">
            <Users className="w-4 h-4 text-peach-400" />
            <span>How Family Synchronization Works:</span>
          </div>
          <ol className="list-decimal list-inside space-y-1.5 text-rose-200/80 leading-relaxed text-[11px] sm:text-xs">
            <li>You copy this code and share it with your parent (or test in next tab).</li>
            <li>Your parent opens the <strong>Parent Portal (`/parent/sync`)</strong> and enters this code.</li>
            <li>Your parent inputs their yearly tuition budget and loan tolerances on <strong>`/parent/constraints`</strong>.</li>
            <li>The <strong>PRISM Core Engine</strong> links both sides to calculate verified feasibility and family alignment!</li>
          </ol>
        </div>

        {/* Quick Test Bridge to Parent Portal */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs border-t border-purple-900/30">
          <span className="text-rose-300/70 text-[11px]">Testing demo? Link code directly into Parent Portal:</span>
          <Link
            href="/parent/sync"
            onClick={handleQuickLinkForParent}
            className="text-peach-300 hover:text-white font-bold flex items-center gap-1 hover:underline text-[11px]"
          >
            <span>Open /parent/sync with Code</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Primary Proceed CTA to Step 2: Assessment */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
        <Link
          href="/"
          className="text-xs text-rose-300/70 hover:text-white underline transition-colors"
        >
          ← Return to Landing Page
        </Link>

        <Link
          href="/student/assessment"
          className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-pink-600 via-purple-600 to-rose-500 hover:from-pink-500 hover:to-rose-400 text-white font-bold text-sm shadow-xl shadow-pink-600/30 hover:shadow-pink-600/50 transition-all hover:-translate-y-0.5"
        >
          <span>Continue to Aptitude Assessment</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}

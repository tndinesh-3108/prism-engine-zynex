"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  Copy, 
  Check, 
  ArrowRight, 
  RotateCcw, 
  GraduationCap, 
  Sliders
} from "lucide-react";
import { useStudentParentFlow } from "@/lib/student-parent-flow";
import { useStudentProfile } from "@/lib/student-profile-context";

export default function StudentSetupPage() {
  const { syncCode, generateNewSyncCode } = useStudentParentFlow();
  const { profile, openProfileModal } = useStudentProfile();
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(syncCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const qualificationLabel =
    profile.qualification === "12th"
      ? `Class 12 • ${profile.twelfthGroup || "CS/Maths"}`
      : profile.qualification === "UG pursuing"
      ? `UG Year ${profile.ugPursuingYear}`
      : profile.qualification === "UG"
      ? `UG Graduate`
      : `Postgraduate`;

  return (
    <div className="max-w-2xl mx-auto space-y-6 py-8 px-4 text-center">
      {/* Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-pink-950/70 text-pink-300 text-xs font-semibold border border-pink-700/40">
          <GraduationCap className="w-3.5 h-3.5 text-pink-400" />
          <span>Setup</span>
        </div>
        <h1 className="text-3xl font-bold text-white tracking-tight">
          Family Sync Code
        </h1>
        <p className="text-sm text-rose-200/80 max-w-md mx-auto">
          Share this code with your parent to link budget parameters.
        </p>
      </div>

      {/* Code Card */}
      <div className="glass-card p-6 rounded-2xl border border-pink-500/30 space-y-4">
        <div className="inline-block p-4 sm:p-5 rounded-xl bg-[#140822] border border-pink-500/40">
          <span className="text-3xl sm:text-4xl font-bold tracking-widest text-white font-mono">
            {syncCode}
          </span>
        </div>

        <div className="flex items-center justify-center gap-2 text-xs text-rose-200/80">
          <span>{qualificationLabel}</span>
          <span>•</span>
          <button
            type="button"
            onClick={openProfileModal}
            className="text-pink-300 hover:text-white underline font-semibold flex items-center gap-1"
          >
            <Sliders className="w-3 h-3" />
            <span>Change</span>
          </button>
        </div>

        <div className="flex items-center justify-center gap-3 pt-2">
          <button
            type="button"
            onClick={handleCopy}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-pink-600 hover:bg-pink-500 text-white font-bold text-sm shadow transition-all"
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? "Copied" : "Copy Code"}</span>
          </button>

          <button
            type="button"
            onClick={generateNewSyncCode}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-purple-950/60 hover:bg-purple-900/50 text-rose-200 border border-purple-800/40 text-xs transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>New Code</span>
          </button>
        </div>
      </div>

      {/* Next Step CTA */}
      <div className="pt-2">
        <Link
          href="/student/assessment"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white text-sm font-bold shadow-md"
        >
          <span>Proceed to Aptitude Test</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}

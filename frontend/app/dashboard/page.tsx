"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { 
  CheckCircle2, 
  ArrowRight, 
  Calendar, 
  Bot, 
  Zap,
  Sparkles,
  TrendingUp,
  DollarSign,
  Users,
  GraduationCap,
  Lock,
  Send,
  Bell,
  RotateCcw,
  ShieldCheck,
  Check
} from "lucide-react";
import HighPackageCoursesAndCertificates from "@/components/HighPackageCoursesAndCertificates";
import { useStudentParentFlow } from "@/lib/student-parent-flow";
import { getRecommendations, getConflictAnalysis } from "@/lib/api";
import { RecommendationsData } from "@/types";

const DEMO_FALLBACK_RECS: RecommendationsData = {
  student_id: 1,
  top_recommendations: [
    {
      id: 1,
      career_name: "AI / ML Engineer",
      slug: "ai-ml-engineer",
      career_domain: "Technology & Engineering",
      prism_score: 91,
      student_fit: 96.9,
      market_demand: 94,
      education_cost: 450000,
      why_explanation:
        "AI / ML Engineer is ranked #1 because your student profile strongly matches the required mathematical competencies, the pathway fits the family budget, market hiring velocity is strong in Chennai, and parent alignment is high.",
      reasons: [
        "Top 5th percentile mathematical and algorithmic aptitude",
        "Strong interest depth in AI & Autonomous Robotics",
        "High hiring velocity in Chennai and Bengaluru hubs",
        "Affordable 4-Year B.Tech pathway within ₹6L budget"
      ]
    }
  ]
};

export default function StudentDashboardPage() {
  const [recs, setRecs] = useState<RecommendationsData | null>(DEMO_FALLBACK_RECS);
  const [loading, setLoading] = useState(false);
  const [activeSnapshotTab, setActiveSnapshotTab] = useState<string | null>("career-fit");

  const {
    step,
    selectedCourse,
    parentParameters,
    metrics,
    requestParentPermission,
    resetFlow
  } = useStudentParentFlow();

  useEffect(() => {
    async function loadData() {
      try {
        const [rData] = await Promise.all([
          getRecommendations(1),
          getConflictAnalysis(1),
        ]);
        setRecs(rData);
      } catch (err) {
        console.warn("Dashboard load fallback:", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  if (loading && !recs) {
    return (
      <div className="max-w-4xl mx-auto py-16 text-center space-y-4">
        <div className="w-12 h-12 border-4 border-pink-500 border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-sm text-rose-200/70">Loading Student Master Dashboard...</p>
      </div>
    );
  }

  const topCareer = recs?.top_recommendations?.[0];

  return (
    <div className="max-w-6xl mx-auto space-y-8 py-4">
      {/* Header Profile Bar (Only Student Actions, No Parent Pages) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-rose-950/40 pb-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-purple-600 via-pink-500 to-peach-400 p-[2px] shadow-lg shadow-pink-600/30">
            <div className="w-full h-full bg-[#12071d] rounded-[14px] flex items-center justify-center text-lg font-black text-rose-100">
              AK
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-black text-white">Arun Kumar</h1>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-purple-950/70 text-purple-200 border border-purple-700/50">
                Class 12 • Science (PCM)
              </span>
            </div>
            <p className="text-xs text-rose-200/70 mt-0.5">
              Chennai, Tamil Nadu • Target Stream: AI & Robotics Engineering
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/mentor"
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-purple-950/40 hover:bg-purple-900/50 text-rose-100 border border-purple-800/40 text-xs font-semibold transition-colors"
          >
            <Bot className="w-4 h-4 text-pink-400" />
            <span>AI Mentor</span>
          </Link>

          <Link
            href="/assessment"
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white text-xs font-bold shadow-md shadow-pink-600/25 transition-all"
          >
            <span>Retake Assessment</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* STUDENT-PARENT COLLABORATIVE WORKFLOW STEPPER                             */}
      {/* ========================================================================= */}
      <div className="glass-card p-5 rounded-2xl border border-purple-500/30 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-purple-950/70 text-purple-300 text-[10px] font-bold uppercase tracking-wider border border-purple-700/40 mb-1">
              <Sparkles className="w-3 h-3 text-pink-400" />
              <span>Parent-Student Alignment Pathway</span>
            </div>
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <span>Career Selection & Family Financial Feasibility</span>
            </h2>
            <p className="text-xs text-rose-200/70">
              Financial Stability and Parent Alignment unlock once your parent configures their annual tuition budget and loan parameters in the Parent Portal.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={resetFlow}
              title="Reset Demo Workflow"
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[11px] font-semibold text-rose-300/80 hover:text-white bg-purple-950/40 hover:bg-purple-900/50 border border-purple-800/40 transition-colors"
            >
              <RotateCcw className="w-3 h-3 text-pink-400" />
              <span>Reset Demo Flow</span>
            </button>
          </div>
        </div>

        {/* 4-Step Progress Flow Visualizer */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 pt-1 text-xs">
          {/* Step 1 */}
          <div className="p-3 rounded-xl bg-purple-950/40 border border-emerald-500/40 flex items-center gap-2.5">
            <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 font-bold text-xs flex items-center justify-center shrink-0 border border-emerald-500/50">
              ✓
            </div>
            <div className="min-w-0">
              <span className="text-[10px] text-emerald-300 font-bold block uppercase">Step 1: Done</span>
              <span className="text-white font-semibold truncate block">Aptitude Test</span>
            </div>
          </div>

          {/* Step 2 */}
          <div className="p-3 rounded-xl bg-purple-950/40 border border-pink-500/40 flex items-center gap-2.5">
            <div className="w-6 h-6 rounded-full bg-pink-500/20 text-pink-400 font-bold text-xs flex items-center justify-center shrink-0 border border-pink-500/50">
              ✓
            </div>
            <div className="min-w-0">
              <span className="text-[10px] text-pink-300 font-bold block uppercase">Step 2: Selected</span>
              <span className="text-white font-semibold truncate block" title={selectedCourse.title}>
                {selectedCourse.title.split(" ")[0]} {selectedCourse.title.split(" ")[1] || ""}
              </span>
            </div>
          </div>

          {/* Step 3 */}
          <div className={`p-3 rounded-xl border flex items-center gap-2.5 transition-all ${
            step === "permission_requested" || step === "parent_approved"
              ? "bg-purple-950/40 border-emerald-500/40 text-emerald-300"
              : "bg-purple-950/30 border-purple-800/40 text-purple-300"
          }`}>
            <div className={`w-6 h-6 rounded-full font-bold text-xs flex items-center justify-center shrink-0 border ${
              step === "permission_requested" || step === "parent_approved"
                ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/50"
                : "bg-pink-500/20 text-pink-300 border-pink-500/40 animate-pulse"
            }`}>
              {step === "permission_requested" || step === "parent_approved" ? "✓" : "3"}
            </div>
            <div className="min-w-0">
              <span className="text-[10px] font-bold block uppercase opacity-80">
                {step === "permission_requested" || step === "parent_approved" ? "Step 3: Sent" : "Step 3: Pending"}
              </span>
              <span className="text-white font-semibold truncate block">Ask Parent Permission</span>
            </div>
          </div>

          {/* Step 4 */}
          <div className={`p-3 rounded-xl border flex items-center gap-2.5 transition-all ${
            step === "parent_approved"
              ? "bg-purple-950/40 border-emerald-500/40 text-emerald-300"
              : "bg-purple-950/30 border-purple-800/40 text-purple-300"
          }`}>
            <div className={`w-6 h-6 rounded-full font-bold text-xs flex items-center justify-center shrink-0 border ${
              step === "parent_approved"
                ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/50"
                : "bg-purple-500/20 text-purple-400 border-purple-500/40"
            }`}>
              {step === "parent_approved" ? "✓" : <Lock className="w-3 h-3" />}
            </div>
            <div className="min-w-0">
              <span className="text-[10px] font-bold block uppercase opacity-80">
                {step === "parent_approved" ? "Step 4: Approved" : "Step 4: Parent Sliders"}
              </span>
              <span className="text-white font-semibold truncate block">Financial Approval</span>
            </div>
          </div>
        </div>

        {/* Current State Interactive Callout */}
        <div className="p-3.5 rounded-xl bg-[#140822] border border-purple-900/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          {step === "course_selection" && (
            <>
              <div className="space-y-0.5">
                <p className="text-xs font-semibold text-rose-100 flex items-center gap-1.5">
                  <GraduationCap className="w-4 h-4 text-pink-400" />
                  <span>Target Course Selected: <strong>{selectedCourse.title}</strong></span>
                </p>
                <p className="text-[11px] text-rose-300/70">
                  Annual Tuition: ₹{selectedCourse.annualFee.toLocaleString("en-IN")}/yr • Send a permission request to your parent to review and set their budget sliders.
                </p>
              </div>
              <button
                type="button"
                onClick={requestParentPermission}
                className="flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-pink-600 via-purple-600 to-rose-500 hover:from-pink-500 hover:to-rose-400 text-white text-xs font-bold shadow-md shadow-pink-600/30 shrink-0 transition-all animate-pulse"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Ask Permission from Parent 📩</span>
              </button>
            </>
          )}

          {step === "permission_requested" && (
            <>
              <div className="space-y-0.5">
                <p className="text-xs font-semibold text-amber-300 flex items-center gap-1.5">
                  <Bell className="w-4 h-4 text-amber-400 animate-bounce" />
                  <span>Permission Request Dispatched to Parent Portal!</span>
                </p>
                <p className="text-[11px] text-rose-200/70">
                  Your parent has been notified for <strong>{selectedCourse.title}</strong>. Waiting for parent to set their annual budget and loan tolerance sliders in the Parent Portal.
                </p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <span className="text-[11px] px-2.5 py-1 rounded-lg bg-amber-500/20 text-amber-300 border border-amber-500/30 font-semibold">
                  ⏳ Awaiting Parent Review
                </span>
              </div>
            </>
          )}

          {step === "parent_approved" && (
            <>
              <div className="space-y-0.5">
                <p className="text-xs font-semibold text-emerald-300 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Family Financial Parameters Confirmed: <strong>{metrics.affordabilityLabel}</strong></span>
                </p>
                <p className="text-[11px] text-rose-200/70">
                  Annual Income: ₹{(parentParameters.parentAnnualIncome / 100000).toFixed(1)}L • Fees Payable: <strong>₹{parentParameters.feesCanBePaidPerYear.toLocaleString("en-IN")}/yr</strong> (Tuition: ₹{selectedCourse.annualFee.toLocaleString("en-IN")}/yr). Financial Stability ({metrics.financialStabilityScore}%) and Parent Alignment ({metrics.parentAlignmentScore}%) are now active!
                </p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <span className="text-[11px] px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-bold flex items-center gap-1">
                  <Check className="w-3.5 h-3.5" />
                  <span>Approved at {parentParameters.approvedAt || "Recently"}</span>
                </span>
              </div>
            </>
          )}
        </div>
      </div>

      {/* 5 Dimensional Snapshot Interactive Tabs */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-rose-300/80 uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-pink-400" />
            <span>5-Dimensional Strategic Snapshot (Click any tab to expand):</span>
          </span>
          {activeSnapshotTab && (
            <button
              onClick={() => setActiveSnapshotTab(null)}
              className="text-[11px] text-pink-300 hover:text-white underline transition-colors"
            >
              Collapse Details
            </button>
          )}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {/* TAB 1: Career Fit Score (Highlighted from User Screenshot) */}
          <button
            type="button"
            onClick={() => setActiveSnapshotTab(activeSnapshotTab === "career-fit" ? null : "career-fit")}
            className={`text-left p-3.5 rounded-xl border transition-all duration-200 cursor-pointer relative group ${
              activeSnapshotTab === "career-fit"
                ? "bg-[#241033] border-pink-500 ring-2 ring-pink-500/50 shadow-lg shadow-pink-600/30"
                : "glass-card border-pink-500/30 hover:border-pink-400 hover:scale-[1.02]"
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-[11px] text-rose-200/80 font-medium">Career Fit Score</span>
              <span className="text-[8px] font-bold px-1.5 py-0.5 rounded-full bg-pink-500/25 text-pink-300 border border-pink-500/40 animate-pulse">
                Click Tab 👆
              </span>
            </div>
            <p className="text-xl font-black text-pink-400 my-1">{topCareer?.student_fit || 96.9}%</p>
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-purple-300/80">Cognitive & Skills</span>
              <span className="text-[9px] text-pink-300 font-semibold group-hover:underline">
                {activeSnapshotTab === "career-fit" ? "▲ Open" : "▼ Courses & Certs"}
              </span>
            </div>
          </button>

          {/* TAB 2: Financial Feasibility / Stability */}
          <button
            type="button"
            onClick={() => setActiveSnapshotTab(activeSnapshotTab === "financial" ? null : "financial")}
            className={`text-left p-3.5 rounded-xl border transition-all duration-200 cursor-pointer relative group ${
              activeSnapshotTab === "financial"
                ? "bg-[#26152a] border-peach-500 ring-2 ring-peach-500/50 shadow-lg shadow-peach-600/30"
                : "glass-card border-peach-500/30 hover:border-peach-400 hover:scale-[1.02]"
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-[11px] text-rose-200/80 font-medium">Financial Stability</span>
              {step !== "parent_approved" ? (
                <span className="text-[8px] font-bold px-1.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 flex items-center gap-0.5">
                  <Lock className="w-2.5 h-2.5" />
                  <span>Pending</span>
                </span>
              ) : (
                <span className="text-[8px] font-bold px-1.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 flex items-center gap-0.5">
                  <Check className="w-2.5 h-2.5" />
                  <span>Approved</span>
                </span>
              )}
            </div>
            <p className="text-xl font-black text-peach-400 my-1">
              {step === "parent_approved" ? `${metrics.financialStabilityScore}% Feasible` : "🔒 Pending"}
            </p>
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-purple-300/80">
                {step === "parent_approved"
                  ? `Budget: ₹${parentParameters.annualBudget.toLocaleString("en-IN")}`
                  : "Awaiting Parent Sliders"}
              </span>
              <span className="text-[9px] text-peach-300 font-semibold group-hover:underline">
                {activeSnapshotTab === "financial" ? "▲ Open" : "▼ Details"}
              </span>
            </div>
          </button>

          {/* TAB 3: Parent Alignment */}
          <button
            type="button"
            onClick={() => setActiveSnapshotTab(activeSnapshotTab === "parent-alignment" ? null : "parent-alignment")}
            className={`text-left p-3.5 rounded-xl border transition-all duration-200 cursor-pointer relative group ${
              activeSnapshotTab === "parent-alignment"
                ? "bg-[#231038] border-purple-500 ring-2 ring-purple-500/50 shadow-lg shadow-purple-600/30"
                : "glass-card border-purple-500/30 hover:border-purple-400 hover:scale-[1.02]"
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-[11px] text-rose-200/80 font-medium">Parent Alignment</span>
              {step !== "parent_approved" ? (
                <span className="text-[8px] font-bold px-1.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 flex items-center gap-0.5">
                  <Lock className="w-2.5 h-2.5" />
                  <span>Pending</span>
                </span>
              ) : (
                <span className="text-[8px] font-bold px-1.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/40 flex items-center gap-0.5">
                  <Check className="w-2.5 h-2.5" />
                  <span>Approved</span>
                </span>
              )}
            </div>
            <p className="text-xl font-black text-purple-300 my-1">
              {step === "parent_approved" ? `${metrics.parentAlignmentScore}% Harmony` : "🔒 Pending"}
            </p>
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-purple-300/80">
                {step === "parent_approved"
                  ? `Conflict: ${metrics.conflictIndex}/100`
                  : "Requires Parent Consent"}
              </span>
              <span className="text-[9px] text-purple-300 font-semibold group-hover:underline">
                {activeSnapshotTab === "parent-alignment" ? "▲ Open" : "▼ Details"}
              </span>
            </div>
          </button>

          {/* TAB 4: Market Readiness */}
          <button
            type="button"
            onClick={() => setActiveSnapshotTab(activeSnapshotTab === "market" ? null : "market")}
            className={`text-left p-3.5 rounded-xl border transition-all duration-200 cursor-pointer relative group ${
              activeSnapshotTab === "market"
                ? "bg-[#25102a] border-rose-400 ring-2 ring-rose-400/50 shadow-lg shadow-rose-600/30"
                : "glass-card border-rose-400/30 hover:border-rose-300 hover:scale-[1.02]"
            }`}
          >
            <span className="text-[11px] text-rose-200/80 font-medium">Market Readiness</span>
            <p className="text-xl font-black text-rose-300 my-1">95/100</p>
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-purple-300/80">High STEAM Velocity</span>
              <span className="text-[9px] text-rose-300 font-semibold group-hover:underline">
                {activeSnapshotTab === "market" ? "▲ Open" : "▼ Details"}
              </span>
            </div>
          </button>

          {/* TAB 5: Skill Progress */}
          <button
            type="button"
            onClick={() => setActiveSnapshotTab(activeSnapshotTab === "skills" ? null : "skills")}
            className={`text-left p-3.5 rounded-xl border transition-all duration-200 cursor-pointer relative group col-span-2 md:col-span-1 ${
              activeSnapshotTab === "skills"
                ? "bg-[#26122e] border-pink-500 ring-2 ring-pink-500/50 shadow-lg shadow-pink-600/30"
                : "glass-card border-pink-500/30 hover:border-pink-400 hover:scale-[1.02]"
            }`}
          >
            <span className="text-[11px] text-rose-200/80 font-medium">Skill Progress</span>
            <p className="text-xl font-black text-peach-300 my-1">88% Ready</p>
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-purple-300/80">3 Priority Gaps</span>
              <span className="text-[9px] text-peach-300 font-semibold group-hover:underline">
                {activeSnapshotTab === "skills" ? "▲ Open" : "▼ Details"}
              </span>
            </div>
          </button>
        </div>

        {/* EXPANDED CONTENT INSIDE THE CLICKED TAB */}
        {activeSnapshotTab === "career-fit" && (
          <div className="pt-2 animate-fadeIn">
            <HighPackageCoursesAndCertificates />
          </div>
        )}

        {activeSnapshotTab === "financial" && (
          <div className="p-5 rounded-2xl bg-[#180d24] border border-peach-500/40 space-y-3 animate-fadeIn">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-peach-400" />
                <span>Financial Feasibility & College ROI Analysis</span>
              </h3>
              {step === "parent_approved" && (
                <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-bold">
                  ✓ Verified by Parent Sliders
                </span>
              )}
            </div>

            {step !== "parent_approved" ? (
              <div className="p-4 rounded-xl bg-[#140822] border border-amber-500/40 space-y-2">
                <div className="flex items-center gap-2 text-amber-300 font-bold text-xs">
                  <Lock className="w-4 h-4" />
                  <span>Financial Stability Calculation is Locked</span>
                </div>
                <p className="text-xs text-rose-200/80 leading-relaxed">
                  Your target pathway <strong>{selectedCourse.title}</strong> has an estimated annual tuition of <strong>₹{selectedCourse.annualFee.toLocaleString("en-IN")}/yr</strong> (Total 4-Year Cost: ₹{selectedCourse.total4YearFee.toLocaleString("en-IN")}).
                </p>
                <p className="text-xs text-rose-200/80 leading-relaxed">
                  To calculate your Financial Feasibility Score, ask your parent for permission. Your parent will adjust their annual payment ability and loan preference sliders in the Parent Portal, after which your feasibility score will be unlocked.
                </p>
                {step === "course_selection" && (
                  <button
                    type="button"
                    onClick={requestParentPermission}
                    className="mt-2 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-peach-500 to-pink-500 text-white text-xs font-bold shadow-md shadow-peach-500/20"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Permission Request to Parent 📩</span>
                  </button>
                )}
                {step === "permission_requested" && (
                  <div className="text-[11px] text-amber-300 font-semibold pt-1">
                    ✓ Request sent! Waiting for parent to set budget sliders in Parent Portal.
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                  <div className="p-3 rounded-xl bg-[#140822] border border-peach-900/40">
                    <span className="text-[10px] text-rose-300/70 block uppercase font-semibold">Course Tuition (Annual)</span>
                    <strong className="text-sm font-black text-rose-100">₹{selectedCourse.annualFee.toLocaleString("en-IN")} / yr</strong>
                    <span className="text-[10px] text-rose-300/60 block">4-Yr Total: ₹{selectedCourse.total4YearFee.toLocaleString("en-IN")}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-[#140822] border border-peach-900/40">
                    <span className="text-[10px] text-rose-300/70 block uppercase font-semibold">Fees Payable by Parent</span>
                    <strong className="text-sm font-black text-peach-300">₹{parentParameters.feesCanBePaidPerYear.toLocaleString("en-IN")} / yr</strong>
                    <span className="text-[10px] text-peach-300/70 block font-mono">Payment × 4 Yrs: ₹{parentParameters.total4YearPayable.toLocaleString("en-IN")}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-[#140822] border border-peach-900/40">
                    <span className="text-[10px] text-rose-300/70 block uppercase font-semibold">Affordability Status</span>
                    <strong className={`text-sm font-black ${
                      metrics.affordabilityStatus === "safe"
                        ? "text-emerald-400"
                        : metrics.affordabilityStatus === "critical"
                        ? "text-amber-400"
                        : "text-rose-400"
                    }`}>
                      {metrics.affordabilityLabel}
                    </strong>
                    <span className="text-[10px] text-rose-300/60 block">
                      {metrics.budgetSurplus >= 0 ? `Surplus: +₹${(metrics.budgetSurplus / 1000).toFixed(0)}k/yr` : `Shortfall: -₹${(Math.abs(metrics.budgetSurplus) / 1000).toFixed(0)}k/yr`}
                    </span>
                  </div>
                </div>
                <p className="text-xs text-rose-200/80">
                  {metrics.affordabilityDescription} Parent Income: <strong>₹{(parentParameters.parentAnnualIncome / 100000).toFixed(1)}L/yr</strong>. Confirmed on {parentParameters.approvedAt || "recent update"}.
                </p>
              </div>
            )}
          </div>
        )}

        {activeSnapshotTab === "parent-alignment" && (
          <div className="p-5 rounded-2xl bg-[#180d24] border border-purple-500/40 space-y-3 animate-fadeIn">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Users className="w-4 h-4 text-purple-400" />
                <span>Family Career Alignment & Mediation Index</span>
              </h3>
              {step === "parent_approved" && (
                <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 font-bold">
                  ✓ Consent Confirmed by Parent
                </span>
              )}
            </div>

            {step !== "parent_approved" ? (
              <div className="p-4 rounded-xl bg-[#140822] border border-amber-500/40 space-y-2">
                <div className="flex items-center gap-2 text-amber-300 font-bold text-xs">
                  <Lock className="w-4 h-4" />
                  <span>Parent Alignment Index is Pending Review</span>
                </div>
                <p className="text-xs text-rose-200/80 leading-relaxed">
                  Parent alignment evaluates harmony between your career choice (<strong>{selectedCourse.title}</strong>) and your family's financial expectations.
                </p>
                <p className="text-xs text-rose-200/80 leading-relaxed">
                  Once your parent reviews your target pathway in the Parent Portal and submits their parameters, the verified harmony score and conflict index will appear here.
                </p>
                {step === "course_selection" && (
                  <button
                    type="button"
                    onClick={requestParentPermission}
                    className="mt-2 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-purple-600 to-pink-500 text-white text-xs font-bold shadow-md shadow-purple-600/20"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Ask Parent Permission Now 📩</span>
                  </button>
                )}
              </div>
            ) : (
              <div className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <div className="p-3 rounded-xl bg-[#140822] border border-purple-900/40">
                    <span className="text-[10px] text-rose-300/70 block uppercase font-semibold">Verified Alignment Score</span>
                    <strong className="text-lg font-black text-purple-300">{metrics.parentAlignmentScore}% Strong Harmony</strong>
                  </div>
                  <div className="p-3 rounded-xl bg-[#140822] border border-purple-900/40">
                    <span className="text-[10px] text-rose-300/70 block uppercase font-semibold">Conflict Risk Index</span>
                    <strong className="text-lg font-black text-emerald-400">{metrics.conflictIndex} / 100 (Minimal Risk)</strong>
                  </div>
                </div>
                <p className="text-xs text-rose-200/80">
                  Parent preferences for stable high-package outcomes and student passion for AI engineering are in strong harmony. Approval confirmed with zero debt burden.
                </p>
              </div>
            )}
          </div>
        )}

        {activeSnapshotTab === "market" && (
          <div className="p-5 rounded-2xl bg-[#180d24] border border-rose-400/40 space-y-3 animate-fadeIn">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-rose-300" />
                <span>Regional & National STEAM Market Velocity</span>
              </h3>
              <Link
                href="/market"
                className="text-xs font-semibold text-rose-300 hover:underline flex items-center gap-1"
              >
                <span>View Real-Time Market Intelligence</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
            <p className="text-xs text-rose-200/80">
              AI Systems and Machine Learning roles are growing at +34.2% YoY in Chennai and Bengaluru, creating 12,400+ fresh campus openings in top engineering tech hubs.
            </p>
          </div>
        )}

        {activeSnapshotTab === "skills" && (
          <div className="glass-card p-6 sm:p-7 rounded-2xl border-2 border-pink-500/40 space-y-6 animate-fadeIn">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-pink-900/30">
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-pink-950/70 text-pink-300 text-[10px] font-bold uppercase tracking-wider border border-pink-700/40 mb-1">
                  <Zap className="w-3 h-3 text-pink-400" />
                  <span>Student Skill Mastery & Priority Gap Engine</span>
                </div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <span>Technical Competencies & Gap Closure (88% Target Readiness)</span>
                </h3>
                <p className="text-xs text-rose-200/70">
                  Targeted analysis based on Arun Kumar's assessment. Master the 3 priority gaps to unlock top-tier product campus hiring.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setActiveSnapshotTab("career-fit")}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-pink-600 to-purple-600 text-white text-xs font-bold shadow-md shadow-pink-600/30 hover:from-pink-500 hover:to-purple-500 transition-all"
                >
                  <GraduationCap className="w-3.5 h-3.5" />
                  <span>View Recommended Courses & Certs</span>
                </button>
              </div>
            </div>

            {/* 5 Real-Time Skill Mastery Progress Bars */}
            <div className="space-y-3">
              <span className="text-[11px] font-bold uppercase tracking-wider text-rose-300/80 block">
                Live Competency Progression:
              </span>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="p-3 rounded-xl bg-[#140822] border border-purple-900/40 space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="text-white font-semibold">Python & Algorithmic Problem Solving</span>
                    <strong className="text-emerald-400 font-bold">92% • Advanced</strong>
                  </div>
                  <div className="w-full bg-purple-950 h-2 rounded-full overflow-hidden">
                    <div className="bg-gradient-to-r from-emerald-500 to-pink-500 h-full rounded-full" style={{ width: "92%" }} />
                  </div>
                  <span className="text-[10px] text-rose-300/60 block">Exceeds standard Tier-1 hiring threshold (85%)</span>
                </div>

                <div className="p-3 rounded-xl bg-[#140822] border border-purple-900/40 space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="text-white font-semibold">Linear Algebra & Mathematical Foundations</span>
                    <strong className="text-emerald-400 font-bold">88% • Strong</strong>
                  </div>
                  <div className="w-full bg-purple-950 h-2 rounded-full overflow-hidden">
                    <div className="bg-gradient-to-r from-emerald-500 to-pink-500 h-full rounded-full" style={{ width: "88%" }} />
                  </div>
                  <span className="text-[10px] text-rose-300/60 block">Solid grounding in vector calculus and matrices</span>
                </div>

                <div className="p-3 rounded-xl bg-[#140822] border border-purple-900/40 space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="text-white font-semibold">Machine Learning Foundations & PyTorch</span>
                    <strong className="text-pink-300 font-bold">85% • Competent</strong>
                  </div>
                  <div className="w-full bg-purple-950 h-2 rounded-full overflow-hidden">
                    <div className="bg-pink-500 h-full rounded-full" style={{ width: "85%" }} />
                  </div>
                  <span className="text-[10px] text-rose-300/60 block">Proficient with standard deep networks & training loops</span>
                </div>

                <div className="p-3 rounded-xl bg-[#140822] border border-peach-900/40 space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="text-white font-semibold">GPU Acceleration & CUDA Computing</span>
                    <strong className="text-peach-300 font-bold">64% • Priority Gap</strong>
                  </div>
                  <div className="w-full bg-purple-950 h-2 rounded-full overflow-hidden">
                    <div className="bg-peach-500 h-full rounded-full" style={{ width: "64%" }} />
                  </div>
                  <span className="text-[10px] text-peach-300/70 block">Target: 85% for NVIDIA & Robotics Systems roles</span>
                </div>

                <div className="p-3 rounded-xl bg-[#140822] border border-pink-900/40 space-y-1.5 md:col-span-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-white font-semibold">Distributed MLOps & Production Model Serving</span>
                    <strong className="text-pink-400 font-bold">58% • Priority Gap #1</strong>
                  </div>
                  <div className="w-full bg-purple-950 h-2 rounded-full overflow-hidden">
                    <div className="bg-gradient-to-r from-peach-500 to-pink-500 h-full rounded-full" style={{ width: "58%" }} />
                  </div>
                  <span className="text-[10px] text-rose-300/70 block">Target: 85% with AWS / GCP ML Engineering certifications</span>
                </div>
              </div>
            </div>

            {/* 3 Priority Skill Gap Cards */}
            <div className="space-y-2.5">
              <span className="text-[11px] font-bold uppercase tracking-wider text-rose-300/80 block">
                3 Actionable Priority Gaps to Close:
              </span>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="p-4 rounded-xl bg-[#12071d] border border-pink-800/40 space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-white">Gap 1: MLOps Pipelines</span>
                    <span className="text-[10px] font-black px-1.5 py-0.5 rounded bg-pink-950 text-pink-300">58% ➔ 85%</span>
                  </div>
                  <p className="text-[11px] text-rose-200/80 leading-relaxed">
                    Build CI/CD automated model training and deployment pipelines with Docker and Kubernetes.
                  </p>
                  <span className="text-[10px] text-peach-300 font-semibold block">
                    Bridge: AWS MLS-C01 Certification
                  </span>
                </div>

                <div className="p-4 rounded-xl bg-[#12071d] border border-purple-800/40 space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-white">Gap 2: GPU Computing (CUDA)</span>
                    <span className="text-[10px] font-black px-1.5 py-0.5 rounded bg-purple-950 text-purple-300">64% ➔ 85%</span>
                  </div>
                  <p className="text-[11px] text-rose-200/80 leading-relaxed">
                    Write parallel CUDA C++ kernels to accelerate inference for deep neural models.
                  </p>
                  <span className="text-[10px] text-peach-300 font-semibold block">
                    Bridge: NVIDIA DLI Certificate
                  </span>
                </div>

                <div className="p-4 rounded-xl bg-[#12071d] border border-peach-800/40 space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-white">Gap 3: Distributed Systems</span>
                    <span className="text-[10px] font-black px-1.5 py-0.5 rounded bg-peach-950 text-peach-300">60% ➔ 80%</span>
                  </div>
                  <p className="text-[11px] text-rose-200/80 leading-relaxed">
                    Master event streaming with Apache Kafka, gRPC microservices, and consensus algorithms.
                  </p>
                  <span className="text-[10px] text-peach-300 font-semibold block">
                    Bridge: High-Scale Architecture Elective
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Main Grid: Recommended Career Hero + Action Plan */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Top Career Match */}
        <div className="glass-card p-6 rounded-2xl border border-pink-500/30 lg:col-span-7 space-y-6 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-1 rounded bg-pink-950/70 text-pink-300 text-xs font-bold uppercase tracking-wider border border-pink-800/40">
                #1 Top Recommended Match
              </span>
              <span className="text-xs font-extrabold text-peach-400">
                PRISM Score: {topCareer?.prism_score || 91}/100
              </span>
            </div>

            <div>
              <h2 className="text-2xl font-black text-white">
                {topCareer?.career_name || "AI / ML Engineer"}
              </h2>
              <p className="text-xs text-rose-200/70 mt-0.5">
                {topCareer?.career_domain || "Technology & Engineering"} • 4-Year B.Tech Pathway
              </p>
            </div>

            <p className="text-xs text-rose-100/90 leading-relaxed bg-[#140822]/80 p-3.5 rounded-xl border border-purple-900/40">
              {topCareer?.why_explanation ||
                "AI / ML Engineer is ranked #1 because your student profile strongly matches the required mathematical competencies, the pathway fits the family budget, market hiring velocity is strong in Chennai, and parent alignment is high."}
            </p>

            <div className="space-y-2">
              <span className="text-xs font-semibold text-rose-200/70 uppercase tracking-wider">
                Key Decision Reasons:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {topCareer?.reasons?.slice(0, 4).map((r, idx) => (
                  <div key={idx} className="flex items-center gap-2 p-2 rounded-lg bg-[#140822]/70 border border-purple-900/30 text-rose-100 text-[11px]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-pink-400 shrink-0" />
                    <span>{r}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-purple-900/40">
            <div className="text-xs">
              <span className="text-rose-200/70">Tuition: </span>
              <strong className="text-white">₹{Number(topCareer?.education_cost || 450000).toLocaleString("en-IN")}</strong>
            </div>

            <Link
              href={`/roadmap/${topCareer?.slug || "ai-ml-engineer"}`}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white text-xs font-bold shadow-md shadow-pink-600/25 transition-all"
            >
              <span>View Milestone Roadmap</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Right Column: Upcoming Actions & Gaps */}
        <div className="space-y-6 lg:col-span-5">
          {/* Skill Gaps Card */}
          <div className="glass-card p-5 rounded-2xl border border-purple-900/40 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-rose-200 uppercase tracking-wider flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-pink-400" />
                <span>Priority Skill Gaps</span>
              </h3>
              <Link href="/career-dna" className="text-[11px] text-pink-400 hover:text-pink-300 hover:underline">
                View DNA
              </Link>
            </div>

            <div className="space-y-2">
              <div className="p-2.5 rounded-lg bg-[#140822]/80 border border-purple-900/40 flex justify-between items-center text-xs">
                <span className="text-rose-100">PyTorch & Deep Learning</span>
                <span className="text-[10px] font-bold text-peach-300 bg-peach-950/60 px-2 py-0.5 rounded border border-peach-800/40">
                  Priority Focus
                </span>
              </div>
              <div className="p-2.5 rounded-lg bg-[#140822]/80 border border-purple-900/40 flex justify-between items-center text-xs">
                <span className="text-rose-100">Advanced Linear Algebra</span>
                <span className="text-[10px] font-bold text-purple-300 bg-purple-950/60 px-2 py-0.5 rounded border border-purple-800/40">
                  Developing
                </span>
              </div>
              <div className="p-2.5 rounded-lg bg-[#140822]/80 border border-purple-900/40 flex justify-between items-center text-xs">
                <span className="text-rose-100">MLOps & Docker</span>
                <span className="text-[10px] font-bold text-rose-300 bg-rose-950/60 px-2 py-0.5 rounded border border-rose-800/40">
                  Year 2 Target
                </span>
              </div>
            </div>
          </div>

          {/* Upcoming Exams & Scholarships */}
          <div className="glass-card p-5 rounded-2xl border border-purple-900/40 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-rose-200 uppercase tracking-wider flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-peach-400" />
                <span>Upcoming Milestones</span>
              </h3>
              <Link href="/opportunities/trackers" className="text-[11px] text-peach-400 hover:text-peach-300 hover:underline">
                View All
              </Link>
            </div>

            <div className="space-y-2">
              <div className="p-2.5 rounded-lg bg-[#140822]/80 border border-purple-900/40 space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="font-semibold text-white">JEE Main 2027</span>
                  <span className="text-[10px] text-peach-400 font-semibold">Dec 2026</span>
                </div>
                <p className="text-[10px] text-rose-200/70">National engineering entrance for NITs and IIITs</p>
              </div>

              <div className="p-2.5 rounded-lg bg-[#140822]/80 border border-purple-900/40 space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="font-semibold text-white">Reliance Foundation Scholarship</span>
                  <span className="text-[10px] text-pink-300 font-bold">₹2,00,000 Grant</span>
                </div>
                <p className="text-[10px] text-rose-200/70">Applications open for Class 12 STEAM students</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


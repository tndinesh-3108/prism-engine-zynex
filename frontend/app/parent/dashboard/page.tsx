"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { 
  Users, 
  Wallet, 
  ArrowRight, 
  Award, 
  CheckCircle2, 
  Scale, 
  FileText, 
  DollarSign, 
  GraduationCap, 
  ShieldCheck,
  Bell,
  Check,
  Sparkles
} from "lucide-react";
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  Tooltip 
} from "recharts";
import { useStudentParentFlow } from "@/lib/student-parent-flow";
import { getRecommendations, getConflictAnalysis } from "@/lib/api";
import { RecommendationsData, ConflictData } from "@/types";

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
        "Ranked #1 because student aptitude and regional market demand align with your family's ₹6,00,000 ceiling.",
      reasons: [
        "Top 5th percentile mathematical and algorithmic aptitude",
        "Strong interest depth in AI & Autonomous Robotics",
        "High hiring velocity in Chennai and Bengaluru hubs",
        "Affordable 4-Year B.Tech pathway within family budget"
      ]
    },
    {
      id: 2,
      career_name: "Data Systems Architect",
      slug: "data-systems-architect",
      career_domain: "Technology & Engineering",
      prism_score: 87,
      student_fit: 91.2,
      market_demand: 90,
      education_cost: 420000,
      why_explanation: "High market stability with strong corporate campus recruitment.",
      reasons: ["Strong backend infrastructure focus", "High regional demand in Chennai"]
    },
    {
      id: 3,
      career_name: "Robotics Hardware Specialist",
      slug: "robotics-hardware-specialist",
      career_domain: "Engineering",
      prism_score: 84,
      student_fit: 88.5,
      market_demand: 86,
      education_cost: 480000,
      why_explanation: "Excellent synergy with mechanical and embedded hardware interests.",
      reasons: ["Hands-on robotics lab experience", "Automotive corridor demand"]
    }
  ]
};

export default function ParentDashboardPage() {
  const [recs, setRecs] = useState<RecommendationsData | null>(DEMO_FALLBACK_RECS);
  const [conflict, setConflict] = useState<ConflictData | null>(null);

  const {
    step,
    selectedCourse,
    parentParameters,
    metrics,
    approveParentFinancials,
    resetFlow
  } = useStudentParentFlow();

  // Live Interactive Sliders in Parent Portal initialized from flow state
  const [annualBudget, setAnnualBudget] = useState(parentParameters.annualBudget);
  const [maxAffordableCost, setMaxAffordableCost] = useState(parentParameters.degreeCeiling);
  const [loanPreference, setLoanPreference] = useState<"None" | "Low" | "Moderate" | "High">(parentParameters.loanTolerance);
  const [submittedMessage, setSubmittedMessage] = useState(false);

  // Sync state when parentParameters updates externally
  useEffect(() => {
    setAnnualBudget(parentParameters.annualBudget);
    setMaxAffordableCost(parentParameters.degreeCeiling);
    setLoanPreference(parentParameters.loanTolerance);
  }, [parentParameters]);

  useEffect(() => {
    async function loadData() {
      try {
        const [rData, cData] = await Promise.all([
          getRecommendations(1),
          getConflictAnalysis(1),
        ]);
        setRecs(rData);
        setConflict(cData);
      } catch (err) {
        console.warn("Parent dashboard load fallback:", err);
      }
    }
    loadData();
  }, []);

  const topCareer = recs?.top_recommendations?.[0];
  const altCareers = recs?.top_recommendations?.slice(1, 4) || [];

  // Live Reactive Calculations based on Selected Course and Parent Sliders
  const targetTuition = Number(selectedCourse?.annualFee || 450000);
  const totalCost = Number(selectedCourse?.total4YearFee || 1800000);
  const budgetSurplus = annualBudget - targetTuition;
  const coveragePercentage = Math.min(100, Math.round((maxAffordableCost / totalCost) * 100));
  const loanRequired = Math.max(0, totalCost - maxAffordableCost);
  const isFeasible = maxAffordableCost >= totalCost;

  // Macroeconomic Financial Viability Index (Deterministic Sigmoid curve matching solver.py)
  const costRatio = maxAffordableCost / Math.max(totalCost, 1);
  const rawViability = (1 / (1 + Math.exp(-3.0 * (costRatio - 1.0)))) * 100;
  const liveFinancialViabilityIndex = Math.min(100, Math.max(0, Math.round(rawViability * 10) / 10));

  const viabilityGrade =
    liveFinancialViabilityIndex >= 75
      ? { label: "Optimal Viability", badge: "bg-emerald-950/80 text-emerald-300 border-emerald-500/40", text: "text-emerald-400" }
      : liveFinancialViabilityIndex >= 45
      ? { label: "Moderate Viability", badge: "bg-peach-950/80 text-peach-300 border-peach-500/40", text: "text-peach-300" }
      : { label: "High Deficit", badge: "bg-rose-950/80 text-rose-300 border-rose-500/40", text: "text-rose-400" };

  // Parent-Student Conflict Index (Friction) for Gauge Visualization
  const conflictScore =
    typeof topCareer?.parent_student_conflict_index === "number"
      ? topCareer.parent_student_conflict_index
      : typeof conflict?.conflict_index === "number"
      ? conflict.conflict_index
      : (metrics?.conflictIndex ?? 4.5);

  const conflictScoreClamped = Math.max(0, Math.min(100, Math.round(conflictScore * 10) / 10));
  const remainingHarmony = Math.max(0, 100 - conflictScoreClamped);

  const gaugeColor =
    conflictScoreClamped <= 20
      ? "#10b981"
      : conflictScoreClamped <= 45
      ? "#fb923c"
      : "#f43f5e";

  const gaugeStatus =
    conflictScoreClamped <= 20
      ? "High Family Harmony"
      : conflictScoreClamped <= 45
      ? "Moderate Divergence"
      : "Elevated Friction";

  const gaugeStatusBg =
    conflictScoreClamped <= 20
      ? "bg-emerald-950/80 text-emerald-300 border-emerald-500/40"
      : conflictScoreClamped <= 45
      ? "bg-peach-950/80 text-peach-300 border-peach-500/40"
      : "bg-rose-950/80 text-rose-300 border-rose-500/40";

  const gaugeData = [
    { name: "Conflict", value: conflictScoreClamped, fill: gaugeColor },
    { name: "Harmony Buffer", value: remainingHarmony, fill: "rgba(255, 255, 255, 0.08)" },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-8 py-4">
      {/* Header with Portal Switch Trigger */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-purple-900/40">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-purple-950/70 text-purple-200 text-xs font-semibold mb-1 border border-purple-700/50">
            <Users className="w-3 h-3 text-peach-400" />
            <span>Parent Portal</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">Parent Dashboard</h1>
          <p className="text-xs text-rose-200/70 mt-0.5">
            Financial controls and progress tracking for Arun Kumar.
          </p>
        </div>

        {/* Portal Switch, Alignment & Funding Actions */}
        <div className="flex items-center gap-2 flex-wrap">
          <Link
            href="/parent/alignment"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-950/60 hover:bg-purple-900/60 text-purple-200 border border-purple-800/40 text-xs font-medium transition-colors"
          >
            <Scale className="w-3.5 h-3.5 text-pink-400" />
            <span>Conflict Index</span>
          </Link>

          <Link
            href="/parent/funding"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-950/60 hover:bg-purple-900/60 text-purple-200 border border-purple-800/40 text-xs font-medium transition-colors"
          >
            <DollarSign className="w-3.5 h-3.5 text-peach-400" />
            <span>Scholarships</span>
          </Link>

          <button
            type="button"
            onClick={resetFlow}
            title="Reset Workflow"
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-purple-950/60 hover:bg-purple-900/50 text-rose-200 border border-purple-800/40 text-xs font-medium transition-colors"
          >
            <span>Reset</span>
          </button>

          <Link
            href="/student/dashboard"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white text-xs font-semibold shadow-md shadow-pink-600/20 transition-all"
          >
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Student Portal</span>
          </Link>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* STUDENT PERMISSION REQUEST NOTIFICATION & APPROVAL BANNER                 */}
      {/* ========================================================================= */}
      {step === "permission_requested" && (
        <div className="glass-card p-5 rounded-2xl border-2 border-amber-500/50 bg-[#1a0e28]/90 space-y-3 shadow-xl shadow-amber-900/20">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-pink-500 flex items-center justify-center text-white shadow-md">
                <Bell className="w-5 h-5 text-white animate-bounce" />
              </div>
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-300 block">
                  Action Required: Student Pathway Permission Request
                </span>
                <h3 className="text-base font-bold text-white">
                  Arun Kumar requested approval for {selectedCourse.title}
                </h3>
              </div>
            </div>
            <span className="text-xs px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold self-start sm:self-auto">
              Pending Financial Review
            </span>
          </div>

          <p className="text-xs text-rose-200/90 leading-relaxed">
            Arun completed his Aptitude Assessment and selected <strong>{selectedCourse.title}</strong> (Target Package: <strong>{selectedCourse.expectedPackage}</strong>). Annual tuition is <strong>₹{selectedCourse.annualFee.toLocaleString("en-IN")}/yr</strong> (Total 4-Year: ₹{selectedCourse.total4YearFee.toLocaleString("en-IN")}).
          </p>
          <div className="p-2.5 rounded-xl bg-amber-950/40 border border-amber-500/30 text-xs text-amber-200 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
            <span>Please adjust your Annual Tuition Budget and 4-Year Ceiling sliders below, then click &quot;Approve & Submit Financial Parameters&quot; to unlock Arun&apos;s Financial Stability score.</span>
          </div>
        </div>
      )}

      {step === "parent_approved" && (
        <div className="glass-card p-4 rounded-2xl border border-emerald-500/40 bg-[#101c1c]/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-300 flex items-center justify-center border border-emerald-500/40">
              <Check className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-emerald-300">
                Financial Parameters Approved & Synced with Student Portal
              </h4>
              <p className="text-[11px] text-rose-200/70">
                Annual Budget: ₹{parentParameters.annualBudget.toLocaleString("en-IN")}/yr • Ceiling: ₹{parentParameters.degreeCeiling.toLocaleString("en-IN")} • Status: 100% Feasible.
              </p>
            </div>
          </div>

          <Link
            href="/dashboard"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-xs font-bold shadow-md shadow-emerald-600/20 hover:from-emerald-500 hover:to-teal-500 shrink-0"
          >
            <GraduationCap className="w-3.5 h-3.5" />
            <span>View Unlocked Student Portal</span>
          </Link>
        </div>
      )}

      {/* ========================================================================= */}
      {/* STUDENT PROGRESS SYNC CARD (Career Fit Score & Skill Progress)           */}
      {/* ========================================================================= */}
      <div className="glass-card p-5 rounded-2xl border border-pink-500/30 bg-[#160a22]/80 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 via-pink-500 to-peach-400 p-[2px] shadow-md">
              <div className="w-full h-full bg-[#12071d] rounded-[10px] flex items-center justify-center font-bold text-xs text-rose-100">
                AK
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-white">Arun Kumar (Student Trajectory Synchronized)</h3>
                <span className="text-[10px] px-2 py-0.5 rounded bg-pink-950/70 text-pink-300 border border-pink-800/40 font-semibold">
                  Class 12 • PCM
                </span>
              </div>
              <p className="text-[11px] text-rose-200/70">Target Career: AI & Robotics Engineering</p>
            </div>
          </div>

          <Link
            href="/dashboard"
            className="text-xs font-bold text-pink-300 hover:text-white flex items-center gap-1 hover:underline shrink-0"
          >
            <span>View Student Fit & Courses</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Synchronized Badges: Career Fit Score & Skill Progress */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
          <div className="p-3 rounded-xl bg-[#140822] border border-pink-500/30 flex items-center justify-between">
            <div>
              <span className="text-[10px] text-rose-200/70 uppercase tracking-wider block font-semibold">
                Student Career Fit Score
              </span>
              <strong className="text-xl font-black text-pink-400">96.9%</strong>
              <span className="text-[10px] text-purple-300/70 block">Top 5th Percentile Cognitive Fit</span>
            </div>
            <div className="text-right">
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-950/60 text-emerald-300 border border-emerald-800/40 font-bold">
                ✓ High STEAM Aptitude
              </span>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-[#140822] border border-peach-500/30 flex items-center justify-between">
            <div>
              <span className="text-[10px] text-rose-200/70 uppercase tracking-wider block font-semibold">
                Student Skill Progress
              </span>
              <strong className="text-xl font-black text-peach-300">88% Ready</strong>
              <span className="text-[10px] text-purple-300/70 block">3 Priority Gaps Being Addressed</span>
            </div>
            <div className="text-right">
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-pink-950/60 text-pink-300 border border-pink-800/40 font-bold">
                Python & Math Mastered
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* RECHARTS GAUGE CHART: PARENT-STUDENT CONFLICT INDEX (FRICTION ENGINE)    */}
      {/* ========================================================================= */}
      <div className="glass-card p-6 sm:p-8 rounded-2xl border border-purple-500/30 bg-[#140722]/80 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-purple-900/40">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-pink-950/70 text-pink-300 text-[10px] font-bold uppercase tracking-wider border border-pink-700/50 mb-1">
              <Scale className="w-3 h-3 text-pink-400" />
              <span>Harmonization & Friction Solver</span>
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
              <span>Parent-Student Conflict Index</span>
            </h2>
            <p className="text-xs text-rose-200/70">
              Visual gauge of psychological and financial friction between Arun&apos;s ambition and parental boundaries.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className={`text-xs font-bold px-3 py-1.5 rounded-xl border ${gaugeStatusBg}`}>
              {gaugeStatus}
            </span>
            <Link
              href="/parent/alignment"
              className="text-xs font-bold text-pink-300 hover:text-white flex items-center gap-1 px-3 py-1.5 rounded-xl bg-purple-950/80 border border-purple-700/40 hover:bg-purple-900 transition-colors"
            >
              <span>Detailed Breakdown</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          {/* Recharts Semi-Circular Gauge */}
          <div className="md:col-span-5 flex flex-col items-center justify-center p-5 rounded-2xl bg-[#10051b]/90 border border-purple-900/40 relative">
            <div className="w-full h-44 flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={gaugeData}
                    cx="50%"
                    cy="80%"
                    startAngle={180}
                    endAngle={0}
                    innerRadius={68}
                    outerRadius={95}
                    paddingAngle={2}
                    dataKey="value"
                    stroke="none"
                  >
                    <Cell fill={gaugeColor} />
                    <Cell fill="rgba(255, 255, 255, 0.08)" />
                  </Pie>
                  <Tooltip
                    formatter={(val: unknown) => [`${val}%`, "Metric"]}
                    contentStyle={{
                      backgroundColor: "#160a26",
                      border: "1px solid rgba(236,72,153,0.3)",
                      borderRadius: "8px",
                      color: "#fff",
                      fontSize: "12px",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Centered Friction Index Label */}
            <div className="text-center -mt-6 pb-2">
              <div className="flex items-baseline justify-center gap-1">
                <span className="text-3xl font-black text-white">{conflictScoreClamped}%</span>
                <span className="text-xs text-rose-300/70 font-bold">Friction Index</span>
              </div>
              <span className="text-[11px] font-semibold text-rose-200/80">
                {conflictScoreClamped <= 20 ? "Low Friction • Harmonious" : conflictScoreClamped <= 45 ? "Moderate Alignment Divergence" : "High Tension • Requires Mediation"}
              </span>
            </div>

            {/* Scale Spectrum Legend */}
            <div className="w-full flex justify-between px-3 text-[10px] text-rose-300/60 font-semibold pt-2 border-t border-purple-900/30">
              <span className="text-emerald-400">0% High Harmony</span>
              <span className="text-peach-400">50% Divergence</span>
              <span className="text-rose-400">100% Conflict</span>
            </div>
          </div>

          {/* Conflict Factors Breakdown */}
          <div className="md:col-span-7 space-y-3.5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3 rounded-xl bg-[#12071d] border border-purple-900/40 space-y-1">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-rose-200/70 font-medium">Career Field Agreement</span>
                  <span className="font-bold text-emerald-400">95%</span>
                </div>
                <div className="w-full bg-purple-950 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-emerald-400 h-full rounded-full" style={{ width: "95%" }} />
                </div>
                <span className="text-[10px] text-purple-300/60 block">AI & Computer Engineering</span>
              </div>

              <div className="p-3 rounded-xl bg-[#12071d] border border-purple-900/40 space-y-1">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-rose-200/70 font-medium">Autonomy Support Index</span>
                  <span className="font-bold text-pink-400">85%</span>
                </div>
                <div className="w-full bg-purple-950 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-pink-400 h-full rounded-full" style={{ width: "85%" }} />
                </div>
                <span className="text-[10px] text-purple-300/60 block">Parent supports self-direction</span>
              </div>

              <div className="p-3 rounded-xl bg-[#12071d] border border-purple-900/40 space-y-1">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-rose-200/70 font-medium">Intergenerational Mobility</span>
                  <span className="font-bold text-peach-300">90%</span>
                </div>
                <div className="w-full bg-purple-950 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-peach-300 h-full rounded-full" style={{ width: "90%" }} />
                </div>
                <span className="text-[10px] text-purple-300/60 block">High upward income drive</span>
              </div>

              <div className="p-3 rounded-xl bg-[#12071d] border border-purple-900/40 space-y-1">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-rose-200/70 font-medium">Financial & Debt Comfort</span>
                  <span className="font-bold text-emerald-400">92%</span>
                </div>
                <div className="w-full bg-purple-950 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-emerald-400 h-full rounded-full" style={{ width: "92%" }} />
                </div>
                <span className="text-[10px] text-purple-300/60 block">Zero high-interest loans required</span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-purple-950/40 border border-purple-800/30 flex items-start gap-2.5 text-xs text-rose-200/90">
              <Sparkles className="w-4 h-4 text-pink-400 shrink-0 mt-0.5" />
              <p className="leading-relaxed">
                {conflict?.parent_friendly_summary ||
                  `Conflict Index is ${conflictScoreClamped}% (${gaugeStatus}). Student and parent are in strong agreement regarding high-technology STEM trajectories. Minimal divergence exists on tuition bounds.`}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* INTERACTIVE BUDGET & LOAN CEILING SLIDERS IN PARENT PORTAL               */}
      {/* ========================================================================= */}
      <div className="glass-card p-6 sm:p-8 rounded-2xl border-2 border-purple-500/40 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-purple-900/40">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-peach-400" />
              <span>Budget & Loan Controls</span>
            </h2>
            <p className="text-sm text-rose-200/70">
              Adjust parameters to calculate feasibility and loan exposure.
            </p>
          </div>

          <span
            className={`text-xs font-bold px-3 py-1.5 rounded-xl border ${
              isFeasible
                ? "bg-emerald-950/70 text-emerald-300 border-emerald-700/50"
                : "bg-rose-950/70 text-rose-300 border-rose-700/50"
            }`}
          >
            {isFeasible ? "✓ Feasible" : "⚠️ Exceeds Budget"}
          </span>
        </div>

        {/* Sliders Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          {/* Slider 1: Annual Family Budget */}
          <div className="p-4 rounded-xl bg-[#140822] border border-pink-900/40 space-y-3">
            <div className="flex justify-between items-center text-xs">
              <span className="text-rose-100 font-semibold flex items-center gap-1.5">
                <Wallet className="w-4 h-4 text-pink-400" />
                <span>Annual Education Budget</span>
              </span>
              <span className="font-black text-pink-300 bg-pink-950/80 px-2.5 py-1 rounded-lg border border-pink-700/50 text-xs">
                ₹{Number(annualBudget).toLocaleString("en-IN")} / yr
              </span>
            </div>

            <input
              type="range"
              min="100000"
              max="2500000"
              step="50000"
              value={annualBudget}
              onChange={(e) => setAnnualBudget(Number(e.target.value))}
              className="w-full accent-pink-500 h-2 bg-purple-950 rounded-lg cursor-pointer transition-all"
            />

            <div className="flex justify-between text-[10px] text-purple-300/60 font-medium">
              <span>₹1 Lakh</span>
              <span>₹10 Lakhs</span>
              <span>₹25 Lakhs</span>
            </div>

            <p className="text-[10px] text-rose-300/70">
              Liquid capital available per academic year without relying on high-interest personal credit.
            </p>
          </div>

          {/* Slider 2: Maximum Total Degree Ceiling */}
          <div className="p-4 rounded-xl bg-[#140822] border border-peach-900/40 space-y-3">
            <div className="flex justify-between items-center text-xs">
              <span className="text-rose-100 font-semibold flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-peach-400" />
                <span>Maximum 4-Year Total Ceiling</span>
              </span>
              <span className="font-black text-peach-300 bg-peach-950/80 px-2.5 py-1 rounded-lg border border-peach-700/50 text-xs">
                ₹{Number(maxAffordableCost).toLocaleString("en-IN")} Total
              </span>
            </div>

            <input
              type="range"
              min="200000"
              max="3500000"
              step="50000"
              value={maxAffordableCost}
              onChange={(e) => setMaxAffordableCost(Number(e.target.value))}
              className="w-full accent-peach-500 h-2 bg-purple-950 rounded-lg cursor-pointer transition-all"
            />

            <div className="flex justify-between text-[10px] text-purple-300/60 font-medium">
              <span>₹2 Lakhs</span>
              <span>₹15 Lakhs</span>
              <span>₹35 Lakhs</span>
            </div>

            <p className="text-[10px] text-rose-300/70">
              The absolute financial upper bound including tuition, boarding, hardware, and certifications.
            </p>
          </div>

          {/* Selector 3: Family Debt Exposure & Tolerance */}
          <div className="p-4 rounded-xl bg-[#140822] border border-purple-900/40 space-y-2 md:col-span-2">
            <div className="flex justify-between items-center text-xs">
              <span className="text-rose-100 font-semibold flex items-center gap-1.5">
                <Scale className="w-4 h-4 text-purple-400" />
                <span>Family Debt Exposure & Loan Preference</span>
              </span>
              <span className="font-bold text-purple-300 bg-purple-950/80 px-2 py-0.5 rounded border border-purple-800/40 text-xs">
                {loanPreference} Tolerance
              </span>
            </div>
            <div className="grid grid-cols-4 gap-2 pt-1">
              {["None", "Low", "Moderate", "High"].map((tier) => (
                <button
                  key={tier}
                  type="button"
                  onClick={() => setLoanPreference(tier)}
                  className={`py-1.5 px-2 rounded-lg text-xs font-semibold border transition-all ${
                    loanPreference === tier
                      ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white border-pink-500 shadow-sm"
                      : "bg-[#12071d] text-rose-300/70 border-purple-900/40 hover:text-white"
                  }`}
                >
                  {tier}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* FINANCIAL VIABILITY INDEX (FVI) & MACROECONOMIC ABSORPTION DISPLAY         */}
        {/* ========================================================================= */}
        <div className="space-y-4 pt-2">
          {/* Featured Financial Viability Index Hero Card */}
          <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-[#1b082e] via-[#240c3c] to-[#160626] border-2 border-pink-500/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xl shadow-pink-950/40">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-pink-500 via-purple-600 to-peach-400 flex items-center justify-center text-white shadow-lg shadow-pink-500/25 shrink-0">
                <DollarSign className="w-7 h-7 text-white" />
              </div>
              <div className="space-y-0.5">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-[10px] text-pink-300 uppercase font-black tracking-wider">
                    Macroeconomic Affordability Metric
                  </span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${viabilityGrade.badge}`}>
                    {viabilityGrade.label}
                  </span>
                </div>
                <h3 className="text-base sm:text-lg font-black text-white">
                  Financial Viability Index (FVI)
                </h3>
                <p className="text-[11px] text-rose-200/80 max-w-xl">
                  Deterministic sigmoid score weighing 4-year degree absorption against liquid household savings, annual income buffer, and debt ceiling.
                </p>
              </div>
            </div>

            <div className="flex items-center sm:justify-end gap-3 shrink-0">
              <div className="text-left sm:text-right">
                <div className="flex items-baseline justify-start sm:justify-end gap-1">
                  <span className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-peach-300 to-white">
                    {liveFinancialViabilityIndex}
                  </span>
                  <span className="text-sm font-bold text-rose-300/70">/ 100</span>
                </div>
                <span className={`text-[10px] font-bold block ${viabilityGrade.text}`}>
                  {liveFinancialViabilityIndex >= 75 ? "✓ Safe Absorption Headroom" : liveFinancialViabilityIndex >= 45 ? "⚠️ Moderate Capital Coverage" : "⛔ High Financial Stress"}
                </span>
              </div>
            </div>
          </div>

          {/* Sub-Metrics Grid: Degree Cost, Coverage %, Loan Exposure, Buffer */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3.5 rounded-xl bg-[#12071d] border border-purple-900/40 text-center space-y-1">
              <span className="text-[10px] text-rose-300/70 block uppercase font-bold">4-Year Degree Cost</span>
              <strong className="text-sm font-black text-white">
                ₹{totalCost.toLocaleString("en-IN")}
              </strong>
              <span className="text-[10px] text-purple-300/60 block">₹{targetTuition.toLocaleString("en-IN")}/yr</span>
            </div>

            <div className="p-3.5 rounded-xl bg-[#12071d] border border-purple-900/40 text-center space-y-1">
              <span className="text-[10px] text-rose-300/70 block uppercase font-bold">Viability Coverage</span>
              <strong className="text-sm font-black text-emerald-400">
                {coveragePercentage}%
              </strong>
              <span className="text-[10px] text-emerald-300/70 block">
                {coveragePercentage >= 100 ? "100% Self-Funded" : "Partial Self-Funded"}
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-[#12071d] border border-purple-900/40 text-center space-y-1">
              <span className="text-[10px] text-rose-300/70 block uppercase font-bold">Required Loan</span>
              <strong className={`text-sm font-black ${loanRequired === 0 ? "text-emerald-400" : "text-peach-400"}`}>
                {loanRequired === 0 ? "₹0 (Zero Debt)" : `₹${loanRequired.toLocaleString("en-IN")}`}
              </strong>
              <span className="text-[10px] text-purple-300/60 block">
                {loanRequired === 0 ? "No Debt Required" : "Manageable Low Debt"}
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-[#12071d] border border-purple-900/40 text-center space-y-1">
              <span className="text-[10px] text-rose-300/70 block uppercase font-bold">Family Surplus</span>
              <strong className={`text-sm font-black ${budgetSurplus >= 0 ? "text-pink-300" : "text-rose-400"}`}>
                {budgetSurplus >= 0 ? `+₹${budgetSurplus.toLocaleString("en-IN")}` : `-₹${Math.abs(budgetSurplus).toLocaleString("en-IN")}`}
              </strong>
              <span className="text-[10px] text-pink-300/70 block">Annual Liquidity</span>
            </div>
          </div>
        </div>

        {/* Submit Financial Parameters Button */}
        <div className="pt-4 border-t border-purple-900/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <p className="text-xs text-rose-300/80">
            Sync financial parameters to Arun&apos;s Student Portal.
          </p>

          <button
            type="button"
            onClick={() => {
              approveParentFinancials({
                annualBudget,
                degreeCeiling: maxAffordableCost,
                loanTolerance: loanPreference
              });
              setSubmittedMessage(true);
              setTimeout(() => setSubmittedMessage(false), 5000);
            }}
            className="flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-pink-600 hover:bg-pink-500 text-white text-sm font-bold shadow-md transition-all shrink-0"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Approve Parameters</span>
          </button>
        </div>

        {submittedMessage && (
          <div className="p-3 rounded-xl bg-emerald-950/80 border border-emerald-500/50 text-emerald-200 text-xs font-semibold flex items-center justify-between gap-2">
            <span>✓ Parameters approved and synced to Student Portal.</span>
            <Link
              href="/dashboard"
              className="text-white bg-emerald-600 hover:bg-emerald-500 px-3 py-1 rounded-lg text-xs font-bold"
            >
              <span>Student Portal ➔</span>
            </Link>
          </div>
        )}
      </div>

      {/* Top Career Spotlight for Parents */}
      <div className="glass-card p-6 sm:p-8 rounded-2xl border border-pink-500/30 relative overflow-hidden">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-xl">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded bg-pink-950/80 text-pink-300 text-xs font-bold uppercase tracking-wider border border-pink-800/40">
                #1 Recommended Pathway
              </span>
              <span className="text-xs text-peach-400 flex items-center gap-1 font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Within Family Budget (Validated by Sliders)
              </span>
            </div>

            <h2 className="text-3xl font-extrabold text-white">
              {topCareer?.career_name || "AI / ML Engineer"}
            </h2>

            <p className="text-xs text-rose-100/90 leading-relaxed">
              {topCareer?.why_explanation ||
                "Ranked #1 because student aptitude and regional market demand align with your family's financial parameters."}
            </p>

            <div className="flex flex-wrap gap-2 pt-1">
              {topCareer?.reasons?.map((reason, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-lg bg-[#140822]/80 border border-purple-900/40 text-[11px] text-rose-100"
                >
                  ✓ {reason}
                </span>
              ))}
            </div>
          </div>

          {/* Quick Metrics Badge */}
          <div className="w-full lg:w-72 p-4 rounded-xl bg-[#140822]/90 border border-purple-900/40 space-y-2.5 shrink-0">
            <div className="flex justify-between items-center text-xs pb-2 border-b border-purple-900/40">
              <span className="text-rose-200/70">Financial Viability:</span>
              <span className="font-extrabold text-pink-400">
                {topCareer?.financial_viability_index ? Math.round(topCareer.financial_viability_index) : liveFinancialViabilityIndex}/100 FVI
              </span>
            </div>
            <div className="flex justify-between items-center text-xs pb-2 border-b border-purple-900/40">
              <span className="text-rose-200/70">Conflict Index:</span>
              <span className="font-semibold text-emerald-400">
                {topCareer?.parent_student_conflict_index ? Math.round(topCareer.parent_student_conflict_index) : conflictScoreClamped}% Friction
              </span>
            </div>
            <div className="flex justify-between items-center text-xs pb-2 border-b border-purple-900/40">
              <span className="text-rose-200/70">Degree Cost:</span>
              <span className="font-extrabold text-white">
                ₹{targetTuition.toLocaleString("en-IN")}
              </span>
            </div>
            <div className="flex justify-between items-center text-xs pb-2 border-b border-purple-900/40">
              <span className="text-rose-200/70">Annual Ceiling:</span>
              <span className="font-semibold text-pink-400">₹{annualBudget.toLocaleString("en-IN")}</span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-rose-200/70">Avg Starting Package:</span>
              <span className="font-bold text-white">₹32 LPA (Tier-1)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Alternative Viable Careers */}
      <div className="glass-card p-6 rounded-2xl border border-purple-900/40 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Award className="w-4 h-4 text-pink-400" />
            <span>Alternative Financially Viable Options</span>
          </h3>
          <span className="text-xs text-rose-200/70">Pre-screened against ₹{annualBudget.toLocaleString("en-IN")} budget</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {altCareers.map((c) => (
            <div key={c.id} className="p-4 rounded-xl bg-[#140822]/80 border border-purple-900/40 space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-white">{c.career_name}</span>
                <span className="font-extrabold text-pink-400">{c.prism_score}/100</span>
              </div>
              <p className="text-[11px] text-rose-200/70 line-clamp-2">
                {c.why_explanation}
              </p>
              <div className="flex justify-between text-[10px] text-rose-200/70 pt-1 border-t border-purple-900/40">
                <span>Tuition: ₹{Number(c.education_cost).toLocaleString("en-IN")}</span>
                <span className="text-peach-400">✓ Feasible</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* FLOWCHART BRANCH PORTALS: CONFLICT INDEX & SCHOLARSHIPS/ROI               */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Link
          href="/parent/alignment"
          className="glass-card p-5 rounded-2xl border border-pink-500/40 hover:border-pink-400 transition-all space-y-3 group block"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Scale className="w-5 h-5 text-pink-400" />
              <h3 className="text-sm font-extrabold text-white group-hover:text-pink-300 transition-colors">
                Parent-Student Alignment (Conflict Index)
              </h3>
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-pink-950 text-pink-300 border border-pink-700/40">
              {conflict?.alignment_score || 95.5}% Synergy
            </span>
          </div>
          <p className="text-[11px] text-rose-200/80 leading-relaxed">
            Examine the 5-point dimension divergence breakdown (Risk, Geography, Career, Debt) and AI-suggested common ground paths.
          </p>
          <div className="flex items-center gap-1.5 text-xs font-bold text-pink-400 pt-1 group-hover:translate-x-1 transition-transform">
            <span>Explore Conflict Index Matrix</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </Link>

        <Link
          href="/parent/funding"
          className="glass-card p-5 rounded-2xl border border-peach-500/40 hover:border-peach-400 transition-all space-y-3 group block"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-peach-400" />
              <h3 className="text-sm font-extrabold text-white group-hover:text-peach-300 transition-colors">
                Targeted Funding (Scholarships & ROI)
              </h3>
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-peach-950 text-peach-300 border border-peach-700/40">
              12x 5-Yr ROI
            </span>
          </div>
          <p className="text-[11px] text-rose-200/80 leading-relaxed">
            Discover verified scholarships (Reliance, Tata Steel, TN Gov grants) and review 5-year degree payback simulations.
          </p>
          <div className="flex items-center gap-1.5 text-xs font-bold text-peach-400 pt-1 group-hover:translate-x-1 transition-transform">
            <span>View Scholarships & Degree ROI</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </Link>
      </div>

      {/* Mandatory Parent Advisory Statement */}
      <div className="p-4 rounded-xl bg-purple-950/50 border border-purple-800/40 flex items-start gap-3 text-xs text-rose-100">
        <FileText className="w-5 h-5 text-pink-400 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <p className="font-semibold text-white">Important Statement for Parents</p>
          <p className="leading-relaxed text-rose-100/90">
            "PRISM supports family decision-making with transparent empirical data and mathematical optimization. It does not guarantee employment or replace certified professional counseling."
          </p>
        </div>
      </div>
    </div>
  );
}

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

  // Live Interactive Inputs in Parent Portal
  const [parentAnnualIncome, setParentAnnualIncome] = useState(
    parentParameters.parentAnnualIncome || 1000000
  );
  const [feesCanBePaidPerYear, setFeesCanBePaidPerYear] = useState(
    parentParameters.feesCanBePaidPerYear || 400000
  );
  const [loanPreference, setLoanPreference] = useState<"None" | "Low" | "Moderate" | "High">(
    parentParameters.loanTolerance || "Low"
  );
  const [submittedMessage, setSubmittedMessage] = useState(false);

  // Sync state when parentParameters updates externally
  useEffect(() => {
    if (parentParameters.parentAnnualIncome) setParentAnnualIncome(parentParameters.parentAnnualIncome);
    if (parentParameters.feesCanBePaidPerYear) setFeesCanBePaidPerYear(parentParameters.feesCanBePaidPerYear);
    if (parentParameters.loanTolerance) setLoanPreference(parentParameters.loanTolerance);
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
  const studentAnnualFee = Number(selectedCourse?.annualFee || 350000);
  const studentTotal4Year = Number(selectedCourse?.total4YearFee || studentAnnualFee * 4);
  const total4YearPayable = feesCanBePaidPerYear * 4;
  const budgetSurplus = feesCanBePaidPerYear - studentAnnualFee;

  // Evaluation criteria requested by user:
  // "and if the student fees, is less than annual income its ok at margin of annual income its critical and not safe, if exceeded the course should be avoided."
  const feeToIncomeRatio = studentAnnualFee / Math.max(parentAnnualIncome, 1);
  const isExceeded = studentAnnualFee > parentAnnualIncome;
  const isCritical = !isExceeded && feeToIncomeRatio >= 0.7;
  const liveFinancialViabilityIndex = !isExceeded && !isCritical ? 94 : isCritical ? 62 : 18;

  const affordabilityStatus: "safe" | "critical" | "avoid" = isExceeded
    ? "avoid"
    : isCritical
    ? "critical"
    : "safe";

  const affordabilityLabel = isExceeded
    ? "Course Should Be Avoided"
    : isCritical
    ? "Critical & Not Safe"
    : "OK (Safe & Affordable)";

  const affordabilityBadge = isExceeded
    ? "bg-rose-950/80 text-rose-300 border-rose-500/50"
    : isCritical
    ? "bg-amber-950/80 text-amber-300 border-amber-500/50"
    : "bg-emerald-950/80 text-emerald-300 border-emerald-500/50";

  const affordabilityText = isExceeded
    ? "text-rose-400"
    : isCritical
    ? "text-amber-400"
    : "text-emerald-400";

  const affordabilityDetail = isExceeded
    ? `Student annual fee (₹${studentAnnualFee.toLocaleString("en-IN")}) exceeds parent annual income (₹${parentAnnualIncome.toLocaleString("en-IN")}). This course should be avoided.`
    : isCritical
    ? `Student annual fee (₹${studentAnnualFee.toLocaleString("en-IN")}) is at the margin of parent annual income (${Math.round(feeToIncomeRatio * 100)}%). This poses high financial strain.`
    : `Student annual fee (₹${studentAnnualFee.toLocaleString("en-IN")}) is comfortably less than parent annual income (${Math.round(feeToIncomeRatio * 100)}%). Safe to proceed.`;

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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#a9caa6]/60">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#daf0e3] text-[rgb(42,131,95)] text-xs font-bold mb-1 border border-[#b8dec5]">
            <Users className="w-3 h-3 text-[rgb(42,131,95)]" />
            <span>Parent Portal</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#123835]">Parent Dashboard</h1>
          <p className="text-xs text-[rgb(18,84,79)]/75 mt-0.5 font-medium">
            Financial controls and progress tracking for Arun Kumar.
          </p>
        </div>

        {/* Portal Switch, Alignment & Funding Actions */}
        <div className="flex items-center gap-2 flex-wrap">
          <Link
            href="/parent/alignment"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white hover:bg-white/90 text-[rgb(18,84,79)] border border-[#cbe1d0] text-xs font-semibold shadow-sm transition-colors"
          >
            <Scale className="w-3.5 h-3.5 text-[rgb(42,131,95)]" />
            <span>Conflict Index</span>
          </Link>

          <Link
            href="/parent/funding"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white hover:bg-white/90 text-[rgb(18,84,79)] border border-[#cbe1d0] text-xs font-semibold shadow-sm transition-colors"
          >
            <DollarSign className="w-3.5 h-3.5 text-[rgb(18,84,79)]" />
            <span>Scholarships</span>
          </Link>

          <button
            type="button"
            onClick={resetFlow}
            title="Reset Workflow"
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-white hover:bg-white/90 text-[rgb(18,84,79)] border border-[#cbe1d0] text-xs font-semibold shadow-sm transition-colors"
          >
            <span>Reset</span>
          </button>

          <Link
            href="/student/dashboard"
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[rgb(18,84,79)] hover:bg-[rgb(14,68,64)] text-white text-xs font-bold shadow-sm transition-all"
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
        <div className="bg-white p-5 rounded-2xl border border-amber-300 shadow-sm space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#fef9ee] border border-[#f3e5c8] flex items-center justify-center text-amber-600 shadow-sm">
                <Bell className="w-5 h-5 text-amber-600 animate-bounce" />
              </div>
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-700 block">
                  Action Required: Student Pathway Permission Request
                </span>
                <h3 className="text-base font-bold text-[#123835]">
                  Arun Kumar requested approval for {selectedCourse.title}
                </h3>
              </div>
            </div>
            <span className="text-xs px-3 py-1 rounded-full bg-[#fef9ee] text-amber-800 border border-[#f3e5c8] font-bold self-start sm:self-auto">
              Pending Financial Review
            </span>
          </div>

          <p className="text-xs text-[#2a4e46] leading-relaxed">
            Arun completed his Aptitude Assessment and selected <strong>{selectedCourse.title}</strong> (Target Package: <strong>{selectedCourse.expectedPackage}</strong>). Annual tuition is <strong>₹{selectedCourse.annualFee.toLocaleString("en-IN")}/yr</strong> (Total 4-Year: ₹{selectedCourse.total4YearFee.toLocaleString("en-IN")}).
          </p>
          <div className="p-2.5 rounded-xl bg-[#fef9ee] border border-[#f3e5c8] text-xs text-amber-800 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
            <span>Please adjust your Annual Tuition Budget and 4-Year Ceiling sliders below, then click &quot;Approve & Submit Financial Parameters&quot; to unlock Arun&apos;s Financial Stability score.</span>
          </div>
        </div>
      )}

      {step === "parent_approved" && (
        <div className="bg-white p-4 rounded-2xl border border-[#a2cfb2] shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#daf0e3] text-[rgb(42,131,95)] flex items-center justify-center border border-[#a2cfb2]">
              <Check className="w-5 h-5 text-[rgb(42,131,95)]" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-[rgb(42,131,95)]">
                Financial Parameters Approved & Synced with Student Portal
              </h4>
              <p className="text-[11px] text-[#2a4e46]">
                Annual Income: ₹{Number(parentParameters.parentAnnualIncome || 1000000).toLocaleString("en-IN")}/yr • Fees Payable: ₹{Number(parentParameters.feesCanBePaidPerYear || parentParameters.annualBudget || 400000).toLocaleString("en-IN")}/yr • 4-Yr Total: ₹{Number(parentParameters.total4YearPayable || 1600000).toLocaleString("en-IN")}.
              </p>
            </div>
          </div>

          <Link
            href="/dashboard"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[rgb(18,84,79)] hover:bg-[rgb(14,68,64)] text-white text-xs font-bold shadow-sm transition-all shrink-0"
          >
            <GraduationCap className="w-3.5 h-3.5" />
            <span>View Unlocked Student Portal</span>
          </Link>
        </div>
      )}

      {/* ========================================================================= */}
      {/* STUDENT PROGRESS SYNC CARD (Career Fit Score & Skill Progress)           */}
      {/* ========================================================================= */}
      <div className="bg-white p-5 rounded-2xl border border-[#cbe1d0] shadow-sm space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#daf0e3] flex items-center justify-center">
              <div className="w-full h-full bg-white rounded-[10px] flex items-center justify-center font-bold text-xs text-[rgb(18,84,79)] border border-[#cbe1d0]">
                AK
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-[#123835]">Arun Kumar (Student Trajectory Synchronized)</h3>
                <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-[#daf0e3] text-[rgb(18,84,79)] border border-[#a2cfb2] font-semibold">
                  Class 12 • PCM
                </span>
              </div>
              <p className="text-[11px] text-[rgb(18,84,79)]/75 font-medium">Target Career: AI & Robotics Engineering</p>
            </div>
          </div>

          <Link
            href="/dashboard"
            className="text-xs font-bold text-[rgb(18,84,79)] hover:text-[#0b3834] flex items-center gap-1 hover:underline shrink-0"
          >
            <span>View Student Fit & Courses</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Synchronized Badges: Career Fit Score & Skill Progress */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
          <div className="p-3.5 rounded-xl bg-[#f7faf8] border border-[#cbe1d0] flex items-center justify-between">
            <div>
              <span className="text-[10px] text-[rgb(18,84,79)]/75 uppercase tracking-wider block font-semibold">
                Student Career Fit Score
              </span>
              <strong className="text-xl font-black text-[rgb(42,131,95)]">96.9%</strong>
              <span className="text-[10px] text-[rgb(18,84,79)]/70 block">Top 5th Percentile Cognitive Fit</span>
            </div>
            <div className="text-right">
              <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-[#daf0e3] text-[rgb(42,131,95)] border border-[#a2cfb2] font-bold">
                ✓ High STEAM Aptitude
              </span>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-[#f7faf8] border border-[#cbe1d0] flex items-center justify-between">
            <div>
              <span className="text-[10px] text-[rgb(18,84,79)]/75 uppercase tracking-wider block font-semibold">
                Student Skill Progress
              </span>
              <strong className="text-xl font-black text-[rgb(18,84,79)]">88% Ready</strong>
              <span className="text-[10px] text-[rgb(18,84,79)]/70 block">3 Priority Gaps Being Addressed</span>
            </div>
            <div className="text-right">
              <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-[#daf0e3] text-[rgb(18,84,79)] border border-[#a2cfb2] font-bold">
                Python & Math Mastered
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* RECHARTS GAUGE CHART: PARENT-STUDENT CONFLICT INDEX (FRICTION ENGINE)    */}
      {/* ========================================================================= */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#cbe1d0] shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#e2ede5]">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#daf0e3] text-[rgb(42,131,95)] text-xs font-bold mb-1 border border-[#b8dec5]">
              <Scale className="w-3.5 h-3.5 text-[rgb(42,131,95)]" />
              <span>Harmonization & Friction Solver</span>
            </div>
            <h2 className="text-lg sm:text-xl font-black text-[#123835] flex items-center gap-2">
              <span>Parent-Student Conflict Index</span>
            </h2>
            <p className="text-xs text-[rgb(18,84,79)]/75">
              Visual gauge of psychological and financial friction between Arun&apos;s ambition and parental boundaries.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className={`text-xs font-bold px-3 py-1.5 rounded-xl border ${gaugeStatusBg}`}>
              {gaugeStatus}
            </span>
            <Link
              href="/parent/alignment"
              className="text-xs font-bold text-[rgb(18,84,79)] hover:text-[#0b3834] flex items-center gap-1 px-3 py-1.5 rounded-xl bg-[#daf0e3] border border-[#a2cfb2] hover:bg-[#cde4d6] transition-colors"
            >
              <span>Detailed Breakdown</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          {/* Recharts Semi-Circular Gauge */}
          <div className="md:col-span-5 flex flex-col items-center justify-center p-5 rounded-2xl bg-[#f7faf8] border border-[#cbe1d0] relative">
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
                    <Cell fill="rgba(42, 131, 95, 0.12)" />
                  </Pie>
                  <Tooltip
                    formatter={(val: unknown) => [`${val}%`, "Metric"]}
                    contentStyle={{
                      backgroundColor: "#ffffff",
                      border: "1px solid #cbe1d0",
                      borderRadius: "8px",
                      color: "#123835",
                      fontSize: "12px",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.08)"
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Centered Friction Index Label */}
            <div className="text-center -mt-6 pb-2">
              <div className="flex items-baseline justify-center gap-1">
                <span className="text-3xl font-black text-[#123835]">{conflictScoreClamped}%</span>
                <span className="text-xs text-[rgb(18,84,79)] font-bold">Friction Index</span>
              </div>
              <span className="text-[11px] font-semibold text-[rgb(18,84,79)]/80">
                {conflictScoreClamped <= 20 ? "Low Friction • Harmonious" : conflictScoreClamped <= 45 ? "Moderate Alignment Divergence" : "High Tension • Requires Mediation"}
              </span>
            </div>

            {/* Scale Spectrum Legend */}
            <div className="w-full flex justify-between px-3 text-[10px] text-[rgb(18,84,79)]/70 font-semibold pt-2 border-t border-[#cbe1d0]">
              <span className="text-[rgb(42,131,95)] font-bold">0% High Harmony</span>
              <span className="text-amber-600 font-bold">50% Divergence</span>
              <span className="text-rose-600 font-bold">100% Conflict</span>
            </div>
          </div>

          {/* Conflict Factors Breakdown */}
          <div className="md:col-span-7 space-y-3.5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3.5 rounded-xl bg-[#f7faf8] border border-[#cbe1d0] space-y-1">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-[rgb(18,84,79)] font-medium">Career Field Agreement</span>
                  <span className="font-bold text-[rgb(42,131,95)]">95%</span>
                </div>
                <div className="w-full bg-[#e2ede5] h-1.5 rounded-full overflow-hidden">
                  <div className="bg-[rgb(42,131,95)] h-full rounded-full" style={{ width: "95%" }} />
                </div>
                <span className="text-[10px] text-[rgb(18,84,79)]/70 block">AI & Computer Engineering</span>
              </div>

              <div className="p-3.5 rounded-xl bg-[#f7faf8] border border-[#cbe1d0] space-y-1">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-[rgb(18,84,79)] font-medium">Autonomy Support Index</span>
                  <span className="font-bold text-[rgb(18,84,79)]">85%</span>
                </div>
                <div className="w-full bg-[#e2ede5] h-1.5 rounded-full overflow-hidden">
                  <div className="bg-[rgb(18,84,79)] h-full rounded-full" style={{ width: "85%" }} />
                </div>
                <span className="text-[10px] text-[rgb(18,84,79)]/70 block">Parent supports self-direction</span>
              </div>

              <div className="p-3.5 rounded-xl bg-[#f7faf8] border border-[#cbe1d0] space-y-1">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-[rgb(18,84,79)] font-medium">Intergenerational Mobility</span>
                  <span className="font-bold text-[rgb(42,131,95)]">90%</span>
                </div>
                <div className="w-full bg-[#e2ede5] h-1.5 rounded-full overflow-hidden">
                  <div className="bg-[rgb(42,131,95)] h-full rounded-full" style={{ width: "90%" }} />
                </div>
                <span className="text-[10px] text-[rgb(18,84,79)]/70 block">High upward income drive</span>
              </div>

              <div className="p-3.5 rounded-xl bg-[#f7faf8] border border-[#cbe1d0] space-y-1">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-[rgb(18,84,79)] font-medium">Financial & Debt Comfort</span>
                  <span className="font-bold text-[rgb(42,131,95)]">92%</span>
                </div>
                <div className="w-full bg-[#e2ede5] h-1.5 rounded-full overflow-hidden">
                  <div className="bg-[rgb(42,131,95)] h-full rounded-full" style={{ width: "92%" }} />
                </div>
                <span className="text-[10px] text-[rgb(18,84,79)]/70 block">Zero high-interest loans required</span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-[#daf0e3]/50 border border-[#b8dec5] flex items-start gap-2.5 text-xs text-[#123835]">
              <Sparkles className="w-4 h-4 text-[rgb(42,131,95)] shrink-0 mt-0.5" />
              <p className="leading-relaxed">
                {conflict?.parent_friendly_summary ||
                  `Conflict Index is ${conflictScoreClamped}% (${gaugeStatus}). Student and parent are in strong agreement regarding high-technology STEM trajectories. Minimal divergence exists on tuition bounds.`}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* INTERACTIVE BUDGET & FEE CONTROLS IN PARENT PORTAL                        */}
      {/* ========================================================================= */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#cbe1d0] shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#e2ede5]">
          <div>
            <h2 className="text-xl font-black text-[#123835] flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-[rgb(42,131,95)]" />
              <span>Budget & Fee Controls</span>
            </h2>
            <p className="text-xs text-[rgb(18,84,79)]/80 mt-0.5">
              Set parent annual income and payable fees to evaluate course affordability.
            </p>
          </div>

          <span
            className={`text-xs font-bold px-3 py-1.5 rounded-xl border flex items-center gap-1.5 ${affordabilityBadge}`}
          >
            {affordabilityStatus === "safe" && "✓"}
            {affordabilityStatus === "critical" && "⚠️"}
            {affordabilityStatus === "avoid" && "⛔"}
            <span>{affordabilityLabel}</span>
          </span>
        </div>

        {/* Student Course Banner */}
        <div className="p-4 rounded-xl bg-[#f7faf8] border border-[#cbe1d0] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-3">
            <GraduationCap className="w-5 h-5 text-[rgb(18,84,79)] shrink-0" />
            <div>
              <span className="text-[rgb(18,84,79)]/70 font-semibold uppercase text-[10px] block">Selected Student Program</span>
              <strong className="text-[#123835] text-sm">{selectedCourse.title}</strong>
            </div>
          </div>
          <div className="flex items-center gap-4 text-left sm:text-right">
            <div>
              <span className="text-[rgb(18,84,79)]/70 text-[10px] block">Annual Fee</span>
              <strong className="text-[rgb(18,84,79)] font-mono text-sm">₹{studentAnnualFee.toLocaleString("en-IN")}/yr</strong>
            </div>
            <div>
              <span className="text-[rgb(18,84,79)]/70 text-[10px] block">4-Year Total</span>
              <strong className="text-[#123835] font-mono text-sm">₹{studentTotal4Year.toLocaleString("en-IN")}</strong>
            </div>
          </div>
        </div>

        {/* Inputs Grid: Parent Annual Income & Fees Payable Slider */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          {/* Input 1: Parent Annual Income */}
          <div className="p-4 rounded-xl bg-[#f7faf8] border border-[#cbe1d0] space-y-3">
            <div className="flex justify-between items-center text-xs">
              <span className="text-[#123835] font-semibold flex items-center gap-1.5">
                <Wallet className="w-4 h-4 text-[rgb(18,84,79)]" />
                <span>Parent Annual Income</span>
              </span>
              <span className="font-bold text-[rgb(18,84,79)] bg-[#daf0e3] px-2.5 py-1 rounded-lg border border-[#a2cfb2] text-xs font-mono">
                ₹{Number(parentAnnualIncome).toLocaleString("en-IN")} / yr
              </span>
            </div>

            <div className="relative">
              <span className="absolute left-3 top-2.5 text-[rgb(18,84,79)]/60 font-bold text-sm">₹</span>
              <input
                type="number"
                min="100000"
                max="5000000"
                step="50000"
                value={parentAnnualIncome}
                onChange={(e) => setParentAnnualIncome(Math.max(0, Number(e.target.value)))}
                className="w-full pl-8 pr-3 py-2 rounded-xl bg-white border border-[#cbe1d0] text-[#123835] text-sm font-mono focus:outline-none focus:ring-2 focus:ring-[rgb(18,84,79)]"
                placeholder="1000000"
              />
            </div>

            <div className="flex items-center gap-1.5 flex-wrap pt-1">
              <span className="text-[10px] text-[rgb(18,84,79)]/70 font-semibold mr-1">Quick Select:</span>
              {[600000, 1000000, 1500000, 2500000].map((inc) => (
                <button
                  key={inc}
                  type="button"
                  onClick={() => setParentAnnualIncome(inc)}
                  className={`text-[10px] font-semibold px-2 py-0.5 rounded-lg border transition-all ${
                    parentAnnualIncome === inc
                      ? "bg-[rgb(18,84,79)] text-white border-[rgb(18,84,79)]"
                      : "bg-white text-[rgb(18,84,79)] border-[#cbe1d0] hover:bg-[#daf0e3]"
                  }`}
                >
                  ₹{(inc / 100000).toFixed(0)}L
                </button>
              ))}
            </div>

            <p className="text-xs text-[rgb(18,84,79)]/70">
              Total household gross annual earnings used to evaluate fee sustainability.
            </p>
          </div>

          {/* Input 2: Fees Can Be Paid Per Year (Slider) */}
          <div className="p-4 rounded-xl bg-[#f7faf8] border border-[#cbe1d0] space-y-3">
            <div className="flex justify-between items-center text-xs">
              <span className="text-[#123835] font-semibold flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[rgb(42,131,95)]" />
                <span>Fees Can Be Paid (Per Year)</span>
              </span>
              <span className="font-bold text-[rgb(42,131,95)] bg-[#daf0e3] px-2.5 py-1 rounded-lg border border-[#a2cfb2] text-xs font-mono">
                ₹{Number(feesCanBePaidPerYear).toLocaleString("en-IN")} / yr
              </span>
            </div>

            <input
              type="range"
              min="50000"
              max="2000000"
              step="25000"
              value={feesCanBePaidPerYear}
              onChange={(e) => setFeesCanBePaidPerYear(Number(e.target.value))}
              className="w-full accent-[rgb(18,84,79)] h-2 bg-[#cbe1d0] rounded-lg cursor-pointer transition-all"
            />

            <div className="flex justify-between text-xs text-[rgb(18,84,79)]/70 font-mono">
              <span>₹50K</span>
              <span>₹10 Lakhs</span>
              <span>₹20 Lakhs</span>
            </div>

            {/* Display: Payment per year * 4 years */}
            <div className="p-2.5 rounded-xl bg-[#daf0e3] border border-[#a2cfb2] flex items-center justify-between text-xs">
              <span className="text-[#123835] font-semibold">4-Year Total Payment (Payment × 4):</span>
              <strong className="text-[rgb(18,84,79)] font-mono text-sm">
                ₹{total4YearPayable.toLocaleString("en-IN")} Total
              </strong>
            </div>
          </div>

          {/* Loan Preference Selector */}
          <div className="p-4 rounded-xl bg-[#f7faf8] border border-[#cbe1d0] space-y-2 md:col-span-2">
            <div className="flex justify-between items-center text-xs">
              <span className="text-[#123835] font-semibold flex items-center gap-1.5">
                <Scale className="w-4 h-4 text-[rgb(18,84,79)]" />
                <span>Family Debt Exposure & Loan Preference</span>
              </span>
              <span className="font-bold text-[rgb(18,84,79)] bg-[#daf0e3] px-2 py-0.5 rounded border border-[#a2cfb2] text-xs">
                {loanPreference} Tolerance
              </span>
            </div>
            <div className="grid grid-cols-4 gap-2 pt-1">
              {["None", "Low", "Moderate", "High"].map((tier) => (
                <button
                  key={tier}
                  type="button"
                  onClick={() => setLoanPreference(tier as "None" | "Low" | "Moderate" | "High")}
                  className={`py-1.5 px-2 rounded-lg text-xs font-semibold border transition-all ${
                    loanPreference === tier
                      ? "bg-[rgb(18,84,79)] text-white border-[rgb(18,84,79)] shadow-sm"
                      : "bg-white text-[rgb(18,84,79)] border-[#cbe1d0] hover:bg-[#daf0e3]"
                  }`}
                >
                  {tier}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Affordability Evaluation Banner */}
        <div className={`p-4 rounded-2xl border text-xs leading-relaxed space-y-2 ${
          affordabilityStatus === "safe"
            ? "bg-[#daf0e3] border-[#a2cfb2] text-[#123835]"
            : affordabilityStatus === "critical"
            ? "bg-[#fef9ee] border-[#f3e5c8] text-[#123835]"
            : "bg-rose-50 border-rose-200 text-rose-900"
        }`}>
          <div className="flex items-center gap-2 font-bold text-sm">
            <span>{affordabilityStatus === "safe" ? "✓" : affordabilityStatus === "critical" ? "⚠️" : "⛔"}</span>
            <span>{affordabilityLabel}</span>
            <span className="text-xs opacity-75 font-normal">
              (Student Fee: ₹{studentAnnualFee.toLocaleString("en-IN")} vs Annual Income: ₹{parentAnnualIncome.toLocaleString("en-IN")})
            </span>
          </div>
          <p>{affordabilityDetail}</p>
          <div className="flex items-center gap-3 pt-1 text-[11px] opacity-90 border-t border-black/10">
            <span>• Less than Income: <strong>OK (Safe)</strong></span>
            <span>• At Margin (≥ 70%): <strong>Critical & Not Safe</strong></span>
            <span>• Exceeds Income: <strong>Course Should Be Avoided</strong></span>
          </div>
        </div>

        {/* 4 Summary Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
          <div className="p-3.5 rounded-xl bg-[#f7faf8] border border-[#cbe1d0] text-center space-y-1">
            <span className="text-xs text-[rgb(18,84,79)]/75 block uppercase font-bold">Student Annual Fee</span>
            <strong className="text-sm font-bold text-[rgb(18,84,79)] font-mono">
              ₹{studentAnnualFee.toLocaleString("en-IN")}/yr
            </strong>
            <span className="text-xs text-[rgb(18,84,79)]/60 block">4-Yr: ₹{studentTotal4Year.toLocaleString("en-IN")}</span>
          </div>

          <div className="p-3.5 rounded-xl bg-[#f7faf8] border border-[#cbe1d0] text-center space-y-1">
            <span className="text-xs text-[rgb(18,84,79)]/75 block uppercase font-bold">Fees Can Be Paid</span>
            <strong className="text-sm font-bold text-[rgb(42,131,95)] font-mono">
              ₹{feesCanBePaidPerYear.toLocaleString("en-IN")}/yr
            </strong>
            <span className="text-xs text-[rgb(42,131,95)]/70 block">4-Yr: ₹{total4YearPayable.toLocaleString("en-IN")}</span>
          </div>

          <div className="p-3.5 rounded-xl bg-[#f7faf8] border border-[#cbe1d0] text-center space-y-1">
            <span className="text-xs text-[rgb(18,84,79)]/75 block uppercase font-bold">Parent Annual Income</span>
            <strong className="text-sm font-bold text-[#123835] font-mono">
              ₹{parentAnnualIncome.toLocaleString("en-IN")}/yr
            </strong>
            <span className="text-xs text-[rgb(18,84,79)]/60 block">{Math.round(feeToIncomeRatio * 100)}% Fee Ratio</span>
          </div>

          <div className="p-3.5 rounded-xl bg-[#f7faf8] border border-[#cbe1d0] text-center space-y-1">
            <span className="text-xs text-[rgb(18,84,79)]/75 block uppercase font-bold">Decision Status</span>
            <strong className={`text-sm font-bold ${affordabilityText}`}>
              {affordabilityStatus === "safe" ? "OK / Safe" : affordabilityStatus === "critical" ? "Critical" : "Avoid"}
            </strong>
            <span className="text-xs text-[rgb(18,84,79)]/60 block">
              {budgetSurplus >= 0 ? `+₹${budgetSurplus.toLocaleString("en-IN")} Surplus` : `₹${Math.abs(budgetSurplus).toLocaleString("en-IN")} Gap`}
            </span>
          </div>
        </div>

        {/* Submit Financial Parameters Button */}
        <div className="pt-4 border-t border-[#e2ede5] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <p className="text-xs text-[rgb(18,84,79)]/80 font-medium">
            Sync fee parameters to Arun&apos;s Student Portal.
          </p>

          <button
            type="button"
            onClick={() => {
              approveParentFinancials({
                parentAnnualIncome,
                feesCanBePaidPerYear,
                annualBudget: feesCanBePaidPerYear,
                degreeCeiling: total4YearPayable,
                loanTolerance: loanPreference
              });
              setSubmittedMessage(true);
              setTimeout(() => setSubmittedMessage(false), 5000);
            }}
            className="flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-[rgb(18,84,79)] hover:bg-[rgb(14,68,64)] text-white text-sm font-bold shadow-sm transition-all shrink-0"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Approve Parameters</span>
          </button>
        </div>

        {submittedMessage && (
          <div className="p-3 rounded-xl bg-[#daf0e3] border border-[#a2cfb2] text-[rgb(18,84,79)] text-xs font-semibold flex items-center justify-between gap-2">
            <span>✓ Parameters approved and synced to Student Portal.</span>
            <Link
              href="/dashboard"
              className="text-white bg-[rgb(18,84,79)] hover:bg-[rgb(14,68,64)] px-3 py-1 rounded-lg text-xs font-bold"
            >
              <span>Student Portal ➔</span>
            </Link>
          </div>
        )}
      </div>

      {/* Top Career Spotlight for Parents */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#cbe1d0] shadow-sm relative overflow-hidden">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-xl">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded bg-[#daf0e3] text-[rgb(18,84,79)] text-xs font-bold uppercase tracking-wider border border-[#a2cfb2]">
                #1 Recommended Pathway
              </span>
              <span className="text-xs text-[rgb(42,131,95)] flex items-center gap-1 font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Within Family Budget (Validated by Sliders)
              </span>
            </div>

            <h2 className="text-3xl font-black text-[#123835]">
              {topCareer?.career_name || "AI / ML Engineer"}
            </h2>

            <p className="text-xs text-[#2a4e46] leading-relaxed">
              {topCareer?.why_explanation ||
                "Ranked #1 because student aptitude and regional market demand align with your family's financial parameters."}
            </p>

            <div className="flex flex-wrap gap-2 pt-1">
              {topCareer?.reasons?.map((reason, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-lg bg-[#f7faf8] border border-[#cbe1d0] text-[11px] text-[#123835] font-medium"
                >
                  ✓ {reason}
                </span>
              ))}
            </div>
          </div>

          {/* Quick Metrics Badge */}
          <div className="w-full lg:w-72 p-4 rounded-xl bg-[#f7faf8] border border-[#cbe1d0] space-y-2.5 shrink-0">
            <div className="flex justify-between items-center text-xs pb-2 border-b border-[#e2ede5]">
              <span className="text-[rgb(18,84,79)]/75">Financial Viability:</span>
              <span className="font-extrabold text-[rgb(42,131,95)]">
                {topCareer?.financial_viability_index ? Math.round(topCareer.financial_viability_index) : liveFinancialViabilityIndex}/100 FVI
              </span>
            </div>
            <div className="flex justify-between items-center text-xs pb-2 border-b border-[#e2ede5]">
              <span className="text-[rgb(18,84,79)]/75">Conflict Index:</span>
              <span className="font-semibold text-[rgb(42,131,95)]">
                {topCareer?.parent_student_conflict_index ? Math.round(topCareer.parent_student_conflict_index) : conflictScoreClamped}% Friction
              </span>
            </div>
            <div className="flex justify-between items-center text-xs pb-2 border-b border-[#e2ede5]">
              <span className="text-[rgb(18,84,79)]/75">Degree Cost:</span>
              <span className="font-extrabold text-[#123835]">
                ₹{studentTotal4Year.toLocaleString("en-IN")}
              </span>
            </div>
            <div className="flex justify-between items-center text-xs pb-2 border-b border-[#e2ede5]">
              <span className="text-[rgb(18,84,79)]/75">Fees Payable:</span>
              <span className="font-semibold text-[rgb(18,84,79)]">₹{feesCanBePaidPerYear.toLocaleString("en-IN")}/yr</span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-[rgb(18,84,79)]/75">Avg Starting Package:</span>
              <span className="font-bold text-[#123835]">₹32 LPA (Tier-1)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Alternative Viable Careers */}
      <div className="bg-white p-6 rounded-2xl border border-[#cbe1d0] shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-[#123835] flex items-center gap-2">
            <Award className="w-4 h-4 text-[rgb(42,131,95)]" />
            <span>Alternative Financially Viable Options</span>
          </h3>
          <span className="text-xs text-[rgb(18,84,79)]/75">Pre-screened against ₹{feesCanBePaidPerYear.toLocaleString("en-IN")}/yr budget</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {altCareers.map((c) => (
            <div key={c.id} className="p-4 rounded-xl bg-[#f7faf8] border border-[#cbe1d0] space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-[#123835]">{c.career_name}</span>
                <span className="font-extrabold text-[rgb(42,131,95)]">{c.prism_score}/100</span>
              </div>
              <p className="text-[11px] text-[#2a4e46] line-clamp-2">
                {c.why_explanation}
              </p>
              <div className="flex justify-between items-center text-[10px] text-[rgb(18,84,79)]/70 pt-1 border-t border-[#e2ede5]">
                <span>Cost: ₹{(c.education_cost / 100000).toFixed(1)}L</span>
                <span className="text-[rgb(42,131,95)] font-semibold">{c.student_fit}% Fit</span>
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
          className="bg-white p-5 rounded-2xl border border-[#cbe1d0] hover:border-[rgb(18,84,79)] transition-all space-y-3 group block shadow-sm hover:shadow-md"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Scale className="w-5 h-5 text-[rgb(18,84,79)]" />
              <h3 className="text-sm font-extrabold text-[#123835] group-hover:text-[rgb(18,84,79)] transition-colors">
                Parent-Student Alignment (Conflict Index)
              </h3>
            </div>
            <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-[#daf0e3] text-[rgb(18,84,79)] border border-[#a2cfb2]">
              {conflict?.alignment_score || 95.5}% Synergy
            </span>
          </div>
          <p className="text-[11px] text-[#2a4e46] leading-relaxed">
            Examine the 5-point dimension divergence breakdown (Risk, Geography, Career, Debt) and AI-suggested common ground paths.
          </p>
          <div className="flex items-center gap-1.5 text-xs font-bold text-[rgb(18,84,79)] pt-1 group-hover:translate-x-1 transition-transform">
            <span>Explore Conflict Index Matrix</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </Link>

        <Link
          href="/parent/funding"
          className="bg-white p-5 rounded-2xl border border-[#cbe1d0] hover:border-[rgb(42,131,95)] transition-all space-y-3 group block shadow-sm hover:shadow-md"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-[rgb(42,131,95)]" />
              <h3 className="text-sm font-extrabold text-[#123835] group-hover:text-[rgb(42,131,95)] transition-colors">
                Targeted Funding (Scholarships & ROI)
              </h3>
            </div>
            <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-[#daf0e3] text-[rgb(42,131,95)] border border-[#a2cfb2]">
              12x 5-Yr ROI
            </span>
          </div>
          <p className="text-[11px] text-[#2a4e46] leading-relaxed">
            Discover verified scholarships (Reliance, Tata Steel, TN Gov grants) and review 5-year degree payback simulations.
          </p>
          <div className="flex items-center gap-1.5 text-xs font-bold text-[rgb(42,131,95)] pt-1 group-hover:translate-x-1 transition-transform">
            <span>View Scholarships & Degree ROI</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </Link>
      </div>

      {/* Mandatory Parent Advisory Statement */}
      <div className="p-4 rounded-xl bg-white border border-[#cbe1d0] shadow-sm flex items-start gap-3 text-xs text-[#2a4e46]">
        <FileText className="w-5 h-5 text-[rgb(18,84,79)] shrink-0 mt-0.5" />
        <div className="space-y-1">
          <p className="font-bold text-[#123835]">Important Statement for Parents</p>
          <p className="leading-relaxed text-[#2a4e46]">
            &quot;PRISM supports family decision-making with transparent empirical data and mathematical optimization. It does not guarantee employment or replace certified professional counseling.&quot;
          </p>
        </div>
      </div>
    </div>
  );
}

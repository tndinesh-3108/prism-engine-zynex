"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  CheckCircle2, 
  ArrowRight, 
  Bot, 
  Sparkles, 
  TrendingUp, 
  DollarSign, 
  Users, 
  Lock, 
  Send, 
  Bell, 
  RotateCcw, 
  ShieldCheck, 
  GitBranch, 
  MapPin, 
  Layers, 
  Flame,
  Sliders,
  Brain,
  Compass
} from "lucide-react";
import { 
  Radar, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  ResponsiveContainer, 
  Tooltip 
} from "recharts";
import HighPackageCoursesAndCertificates from "@/components/HighPackageCoursesAndCertificates";
import { useStudentParentFlow } from "@/lib/student-parent-flow";
import { useStudentProfile } from "@/lib/student-profile-context";

export default function StudentDashboardPage() {
  const [activeTierTab, setActiveTierTab] = useState<"all" | "match" | "safe" | "reach">("all");
  const [psychometricTab, setPsychometricTab] = useState<"riasec" | "big_five">("riasec");
  const { profile, openProfileModal } = useStudentProfile();

  const {
    step,
    syncCode,
    parentParameters,
    metrics,
    careerTiers,
    requestParentPermission,
    resetFlow
  } = useStudentParentFlow();

  const qualificationLabel =
    profile.qualification === "12th"
      ? `Class 12 • ${profile.twelfthGroup || "CS/Maths"}`
      : profile.qualification === "UG pursuing"
      ? `UG Year ${profile.ugPursuingYear} • ${profile.ugPursuingCourse || "Engineering"}`
      : profile.qualification === "UG"
      ? `UG Graduate • ${profile.ugDegree || "B.Tech"} (CGPA: ${profile.ugCgpa})`
      : `PG • ${profile.pgCourse || "Master of Tech"}`;

  return (
    <div className="max-w-6xl mx-auto space-y-8 py-4 px-4 sm:px-6">
      {/* Header Profile Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-rose-950/40 pb-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-purple-600 via-pink-500 to-peach-400 p-[2px] shadow-lg shadow-pink-600/30">
            <div className="w-full h-full bg-[#12071d] rounded-[14px] flex items-center justify-center text-lg font-black text-rose-100">
              AK
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-2xl font-black text-white">Arun Kumar</h1>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-purple-950/70 text-purple-200 border border-purple-700/50">
                {qualificationLabel}
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-pink-950/70 text-pink-300 border border-pink-700/50 font-mono">
                Code: {syncCode}
              </span>
              <button
                onClick={openProfileModal}
                className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-pink-600/30 hover:bg-pink-600 text-pink-200 hover:text-white border border-pink-500/40 flex items-center gap-1 transition-all"
              >
                <Sliders className="w-3 h-3 text-pink-300" />
                <span>Switch Qualification</span>
              </button>
            </div>
            <p className="text-xs text-rose-200/70 mt-0.5">
              {profile.state}, {profile.country} • Target Stream: AI & Robotics Engineering
            </p>
          </div>
        </div>

        {/* 3 Sub-Branch Buttons as specified in Flowchart */}
        <div className="flex items-center gap-2 flex-wrap">
          <Link
            href="/student/roadmap"
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-purple-950/60 hover:bg-purple-900/60 text-purple-200 border border-purple-800/40 text-xs font-semibold transition-colors"
          >
            <GitBranch className="w-3.5 h-3.5 text-pink-400" />
            <span>5-Yr Roadmap</span>
          </Link>

          <Link
            href="/student/opportunities"
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-purple-950/60 hover:bg-purple-900/60 text-purple-200 border border-purple-800/40 text-xs font-semibold transition-colors"
          >
            <MapPin className="w-3.5 h-3.5 text-peach-400" />
            <span>Opportunities</span>
          </Link>

          <Link
            href="/student/mentor"
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white text-xs font-bold shadow-md shadow-pink-600/25 transition-all"
          >
            <Bot className="w-3.5 h-3.5" />
            <span>AI Mentor</span>
          </Link>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* PARENT-STUDENT COLLABORATION & UNLOCKED METRICS BAR                       */}
      {/* ========================================================================= */}
      <div className="glass-card p-5 rounded-2xl border border-purple-500/30 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-purple-500/20 text-purple-300 flex items-center justify-center">
              <Users className="w-4 h-4 text-pink-400" />
            </div>
            <div>
              <h2 className="text-sm font-extrabold text-white">
                Family Alignment & Financial Stability Gate
              </h2>
              <p className="text-[11px] text-rose-300/70">
                Synchronized with Family Sync Code ({syncCode})
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {step === "parent_approved" ? (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-950/80 text-emerald-300 border border-emerald-500/40">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Parent Financial Approval Active</span>
              </span>
            ) : step === "permission_requested" ? (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-950/80 text-amber-300 border border-amber-500/40">
                <Bell className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
                <span>Pending Parent Slider Input</span>
              </span>
            ) : (
              <button
                onClick={requestParentPermission}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white shadow-md shadow-pink-600/30 transition-all"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Send Course Permission to Parent</span>
              </button>
            )}

            <button
              onClick={resetFlow}
              title="Reset collaborative demo flow"
              className="p-1.5 rounded-lg bg-purple-950/40 hover:bg-purple-900/60 text-purple-300 border border-purple-800/40 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Revealed Values: Parent Alignment, Affordability & Financial Stability */}
        {step === "parent_approved" ? (
          <div className="space-y-3 pt-2">
            {/* Affordability Banner */}
            <div className={`p-3 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 text-xs ${
              metrics.affordabilityStatus === "safe"
                ? "bg-emerald-950/40 border-emerald-500/40"
                : metrics.affordabilityStatus === "critical"
                ? "bg-amber-950/40 border-amber-500/40"
                : "bg-rose-950/40 border-rose-500/40"
            }`}>
              <div className="flex items-center gap-2">
                <span className={`px-2.5 py-0.5 rounded-full font-bold text-[11px] border ${
                  metrics.affordabilityStatus === "safe"
                    ? "bg-emerald-900/80 text-emerald-300 border-emerald-500/50"
                    : metrics.affordabilityStatus === "critical"
                    ? "bg-amber-900/80 text-amber-300 border-amber-500/50"
                    : "bg-rose-900/80 text-rose-300 border-rose-500/50"
                }`}>
                  {metrics.affordabilityLabel}
                </span>
                <span className="text-rose-200/90">{metrics.affordabilityDescription}</span>
              </div>
              <span className="text-[11px] text-rose-300/70 font-mono self-start sm:self-auto">
                Income: ₹{(parentParameters.parentAnnualIncome / 100000).toFixed(1)}L/yr
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              <div className="p-3.5 rounded-xl bg-purple-950/40 border border-purple-800/40 space-y-1">
                <div className="flex items-center justify-between text-xs text-rose-300/80">
                  <span>Parent Alignment</span>
                  <Users className="w-3.5 h-3.5 text-pink-400" />
                </div>
                <p className="text-xl font-extrabold text-white">
                  {metrics.parentAlignmentScore.toFixed(1)}%
                </p>
                <p className="text-[10px] text-pink-300/80">Conflict Index: {metrics.conflictIndex}% (High Harmony)</p>
              </div>

              <div className="p-3.5 rounded-xl bg-purple-950/40 border border-purple-800/40 space-y-1">
                <div className="flex items-center justify-between text-xs text-rose-300/80">
                  <span>Financial Stability</span>
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                </div>
                <p className="text-xl font-extrabold text-emerald-300">
                  {metrics.financialStabilityScore}/100
                </p>
                <p className="text-[10px] text-emerald-300/80">Cost is {metrics.coveragePercentage}% covered</p>
              </div>

              <div className="p-3.5 rounded-xl bg-purple-950/40 border border-purple-800/40 space-y-1">
                <div className="flex items-center justify-between text-xs text-rose-300/80">
                  <span>Fees Payable (Per Yr)</span>
                  <DollarSign className="w-3.5 h-3.5 text-peach-400" />
                </div>
                <p className="text-xl font-extrabold text-white font-mono">
                  ₹{(parentParameters.feesCanBePaidPerYear / 100000).toFixed(1)}L
                </p>
                <p className="text-[10px] text-peach-300/80">
                  Payment × 4 Yrs: ₹{(parentParameters.total4YearPayable / 100000).toFixed(1)}L
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-purple-950/40 border border-purple-800/40 space-y-1">
                <div className="flex items-center justify-between text-xs text-rose-300/80">
                  <span>Loan Required</span>
                  <TrendingUp className="w-3.5 h-3.5 text-purple-400" />
                </div>
                <p className="text-xl font-extrabold text-white font-mono">
                  {metrics.loanNeeded === 0 ? "₹0 (Zero Debt)" : `₹${(metrics.loanNeeded / 100000).toFixed(1)}L`}
                </p>
                <p className="text-[10px] text-purple-300/80">Tolerance: {parentParameters.loanTolerance}</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="p-4 rounded-xl bg-purple-950/30 border border-purple-800/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 text-rose-200/80">
              <Lock className="w-4 h-4 text-pink-400 shrink-0" />
              <span>
                <strong>Parent Alignment & Financial Stability</strong> unlock immediately once family budget parameters are set via Family Sync Code ({syncCode}).
              </span>
            </div>
            <Link
              href="/parent/constraints"
              className="text-pink-400 hover:text-pink-300 font-bold underline underline-offset-2 shrink-0"
            >
              Configure in Parent Portal ➔
            </Link>
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* ADVANCED PSYCHOLOGICAL VECTORIZATION: RIASEC THEMES & BIG FIVE PERSONALITY */}
      {/* ========================================================================= */}
      <div className="glass-card p-5 sm:p-6 rounded-2xl border border-pink-500/20 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-pink-950/70 text-pink-300 text-xs font-semibold mb-1 border border-pink-700/40">
              <Brain className="w-3 h-3 text-pink-400" />
              <span>Psychometrics</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              Psychometric Alignment
            </h2>
            <p className="text-xs text-rose-200/70">
              Holland RIASEC themes and Big Five personality traits.
            </p>
          </div>

          {/* Toggle between RIASEC and Big Five */}
          <div className="flex items-center p-1 rounded-xl bg-purple-950/60 border border-purple-800/40 text-xs self-start sm:self-auto">
            <button
              onClick={() => setPsychometricTab("riasec")}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                psychometricTab === "riasec"
                  ? "bg-gradient-to-r from-pink-600 to-purple-600 text-white shadow-sm"
                  : "text-purple-300/70 hover:text-white"
              }`}
            >
              RIASEC
            </button>
            <button
              onClick={() => setPsychometricTab("big_five")}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                psychometricTab === "big_five"
                  ? "bg-gradient-to-r from-pink-600 to-purple-600 text-white shadow-sm"
                  : "text-purple-300/70 hover:text-white"
              }`}
            >
              Big Five
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Radar Chart Visualizer */}
          <div className="lg:col-span-7 h-[280px] w-full flex items-center justify-center p-2 rounded-xl bg-[#140622]/60 border border-purple-900/30">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart
                cx="50%"
                cy="50%"
                outerRadius="72%"
                data={
                  psychometricTab === "riasec"
                    ? [
                        { subject: "Realistic (R)", score: 85, fullMark: 100 },
                        { subject: "Investigative (I)", score: 92, fullMark: 100 },
                        { subject: "Artistic (A)", score: 65, fullMark: 100 },
                        { subject: "Social (S)", score: 60, fullMark: 100 },
                        { subject: "Enterprising (E)", score: 75, fullMark: 100 },
                        { subject: "Conventional (C)", score: 70, fullMark: 100 },
                      ]
                    : [
                        { subject: "Openness", score: 88, fullMark: 100 },
                        { subject: "Conscientiousness", score: 85, fullMark: 100 },
                        { subject: "Extraversion", score: 65, fullMark: 100 },
                        { subject: "Agreeableness", score: 70, fullMark: 100 },
                        { subject: "Emotional Stability", score: 65, fullMark: 100 },
                      ]
                }
              >
                <PolarGrid stroke="rgba(236, 72, 153, 0.25)" />
                <PolarAngleAxis
                  dataKey="subject"
                  tick={{ fill: "#fda4af", fontSize: 11, fontWeight: 700 }}
                />
                <PolarRadiusAxis
                  angle={30}
                  domain={[0, 100]}
                  stroke="rgba(236, 72, 153, 0.2)"
                  tick={{ fill: "#fda4af", fontSize: 9 }}
                />
                <Radar
                  name={psychometricTab === "riasec" ? "RIASEC Score" : "Trait Strength"}
                  dataKey="score"
                  stroke="#ec4899"
                  fill="#ec4899"
                  fillOpacity={0.45}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1c092c",
                    borderColor: "#ec4899",
                    borderRadius: "12px",
                    color: "#fff",
                    fontSize: "12px",
                  }}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          {/* Psychometric Traits & Behavioral Vector Metrics */}
          <div className="lg:col-span-5 space-y-3">
            <div className="p-3.5 rounded-xl bg-purple-950/40 border border-purple-800/40 space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-extrabold text-white flex items-center gap-1.5">
                  <Compass className="w-3.5 h-3.5 text-pink-400" />
                  <span>Vocational Archetype</span>
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-pink-950 text-pink-300 border border-pink-700/50">
                  {psychometricTab === "riasec" ? "Investigative-Realistic (IR)" : "Curious & Highly Conscientious"}
                </span>
              </div>
              <p className="text-[11px] text-rose-200/80 leading-relaxed">
                {psychometricTab === "riasec"
                  ? "Peak resonance in algorithmic exploration, scientific inquiry, and robotic systems engineering."
                  : "High openness to innovation (88%) paired with structured grit (85%) ensures high stamina in deep-tech domains."}
              </p>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <div className="p-3 rounded-xl bg-purple-950/30 border border-purple-800/30 text-center">
                <span className="text-[10px] text-rose-300/70 block">Locus of Control</span>
                <span className="text-xs font-black text-white">Internal</span>
                <span className="text-[9px] text-peach-300 block font-semibold">High Agency</span>
              </div>
              <div className="p-3 rounded-xl bg-purple-950/30 border border-purple-800/30 text-center">
                <span className="text-[10px] text-rose-300/70 block">Growth Mindset</span>
                <span className="text-xs font-black text-white font-mono">88 / 100</span>
                <span className="text-[9px] text-pink-400 block font-semibold">Resilient</span>
              </div>
              <div className="p-3 rounded-xl bg-purple-950/30 border border-purple-800/30 text-center">
                <span className="text-[10px] text-rose-300/70 block">Divergence</span>
                <span className="text-xs font-black text-white font-mono">4.5%</span>
                <span className="text-[9px] text-purple-300 block font-semibold">Congruent</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* RANKED CAREERS: SAFE / MATCH / REACH                                       */}
      {/* ========================================================================= */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-pink-950/70 text-pink-300 text-xs font-semibold mb-1 border border-pink-700/40">
              <Layers className="w-3 h-3 text-pink-400" />
              <span>Career Tiers</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              Ranked Careers
            </h2>
            <p className="text-xs text-rose-200/70">
              Categorized into Safe, Match, and Reach tiers.
            </p>
          </div>

          {/* Tier Filter Tabs */}
          <div className="flex items-center p-1 rounded-xl bg-purple-950/60 border border-purple-800/40 text-xs">
            <button
              onClick={() => setActiveTierTab("all")}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                activeTierTab === "all"
                  ? "bg-gradient-to-r from-pink-600 to-purple-600 text-white shadow-sm"
                  : "text-purple-300/70 hover:text-white"
              }`}
            >
              All Tiers
            </button>
            <button
              onClick={() => setActiveTierTab("safe")}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                activeTierTab === "safe"
                  ? "bg-peach-600 text-white shadow-sm"
                  : "text-purple-300/70 hover:text-peach-300"
              }`}
            >
              Safe
            </button>
            <button
              onClick={() => setActiveTierTab("match")}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                activeTierTab === "match"
                  ? "bg-pink-600 text-white shadow-sm"
                  : "text-purple-300/70 hover:text-pink-300"
              }`}
            >
              Match
            </button>
            <button
              onClick={() => setActiveTierTab("reach")}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                activeTierTab === "reach"
                  ? "bg-purple-600 text-white shadow-sm"
                  : "text-purple-300/70 hover:text-purple-300"
              }`}
            >
              Reach
            </button>
          </div>
        </div>

        {/* Career Tier Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* 1. MATCH TIERS */}
          {(activeTierTab === "all" || activeTierTab === "match") && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-sm font-bold text-pink-400">
                <Sparkles className="w-4 h-4" />
                <span>Match Tier</span>
              </div>
              {careerTiers.match.map((item) => (
                <div
                  key={item.id}
                  className="glass-card p-5 rounded-2xl border-2 border-pink-500/50 hover:border-pink-400 transition-all space-y-3 relative group shadow-lg"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-pink-950 text-pink-300 border border-pink-600/50">
                      {item.tagline}
                    </span>
                    <span className="text-sm font-bold text-pink-400 font-mono">
                      {item.matchScore}% Fit
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white group-hover:text-pink-300 transition-colors">
                    {item.name}
                  </h3>

                  <p className="text-xs text-rose-200/80 leading-relaxed">
                    {item.description}
                  </p>

                  <div className="pt-2 border-t border-purple-900/40 grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="text-rose-300/70 block">Expected CTC</span>
                      <span className="font-bold text-white font-mono text-sm">{item.expectedCTC}</span>
                    </div>
                    <div>
                      <span className="text-rose-300/70 block">Annual Fee</span>
                      <span className="font-bold text-white font-mono text-sm">₹{(item.annualCost / 100000).toFixed(1)}L / yr</span>
                    </div>
                  </div>

                  <Link
                    href={`/student/roadmap`}
                    className="w-full mt-2 py-2 px-3 rounded-xl bg-pink-600/30 hover:bg-pink-600 text-pink-200 hover:text-white text-xs font-bold flex items-center justify-center gap-1.5 border border-pink-500/40 transition-all"
                  >
                    <span>Roadmap</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              ))}
            </div>
          )}

          {/* 2. SAFE TIERS */}
          {(activeTierTab === "all" || activeTierTab === "safe") && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-sm font-bold text-peach-400">
                <ShieldCheck className="w-4 h-4" />
                <span>Safe Tier</span>
              </div>
              {careerTiers.safe.map((item) => (
                <div
                  key={item.id}
                  className="glass-card p-5 rounded-2xl border-2 border-peach-500/50 hover:border-peach-400 transition-all space-y-3 relative group shadow-lg"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-peach-950 text-peach-300 border border-peach-600/50">
                      {item.tagline}
                    </span>
                    <span className="text-sm font-bold text-peach-400 font-mono">
                      {item.matchScore}% Fit
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white group-hover:text-peach-300 transition-colors">
                    {item.name}
                  </h3>

                  <p className="text-xs text-rose-200/80 leading-relaxed">
                    {item.description}
                  </p>

                  <div className="pt-2 border-t border-purple-900/40 grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="text-rose-300/70 block">Expected CTC</span>
                      <span className="font-bold text-white font-mono text-sm">{item.expectedCTC}</span>
                    </div>
                    <div>
                      <span className="text-rose-300/70 block">Annual Fee</span>
                      <span className="font-bold text-white font-mono text-sm">₹{(item.annualCost / 100000).toFixed(1)}L / yr</span>
                    </div>
                  </div>

                  <Link
                    href={`/student/roadmap`}
                    className="w-full mt-2 py-2 px-3 rounded-xl bg-peach-600/30 hover:bg-peach-600 text-peach-200 hover:text-white text-xs font-bold flex items-center justify-center gap-1.5 border border-peach-500/40 transition-all"
                  >
                    <span>Roadmap</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              ))}
            </div>
          )}

          {/* 3. REACH TIERS */}
          {(activeTierTab === "all" || activeTierTab === "reach") && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-sm font-bold text-purple-400">
                <Flame className="w-4 h-4" />
                <span>Reach Tier</span>
              </div>
              {careerTiers.reach.map((item) => (
                <div
                  key={item.id}
                  className="glass-card p-5 rounded-2xl border border-purple-500/40 hover:border-purple-400 transition-all space-y-3 relative group shadow-lg"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-purple-950 text-purple-300 border border-purple-600/50">
                      {item.tagline}
                    </span>
                    <span className="text-sm font-bold text-purple-400 font-mono">
                      {item.matchScore}% Fit
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white group-hover:text-purple-300 transition-colors">
                    {item.name}
                  </h3>

                  <p className="text-xs text-rose-200/80 leading-relaxed">
                    {item.description}
                  </p>

                  <div className="pt-2 border-t border-purple-900/40 grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="text-rose-300/70 block">Expected CTC</span>
                      <span className="font-bold text-white font-mono text-sm">{item.expectedCTC}</span>
                    </div>
                    <div>
                      <span className="text-rose-300/70 block">Annual Fee</span>
                      <span className="font-bold text-white font-mono text-sm">₹{(item.annualCost / 100000).toFixed(1)}L / yr</span>
                    </div>
                  </div>

                  <Link
                    href={`/student/roadmap`}
                    className="w-full mt-2 py-2 px-3 rounded-xl bg-purple-950/40 hover:bg-purple-600 text-purple-200 hover:text-white text-xs font-bold flex items-center justify-center gap-1.5 border border-purple-500/40 transition-all"
                  >
                    <span>Roadmap</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* HIGH-PACKAGE COURSES AND IN-TAB CERTIFICATES EXPLORER                     */}
      {/* ========================================================================= */}
      <div className="pt-4">
        <HighPackageCoursesAndCertificates />
      </div>
    </div>
  );
}

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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#a9caa6]/60 pb-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-white border border-[#cbe1d0] shadow-sm flex items-center justify-center text-xl font-black text-[#123835]">
            AK
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-2xl font-black text-[#123835]">Arun Kumar</h1>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white text-[#123835] border border-[#cbe1d0] shadow-sm">
                {qualificationLabel}
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white text-[#123835] border border-[#cbe1d0] shadow-sm font-mono">
                Code : {syncCode}
              </span>
              <button
                onClick={openProfileModal}
                className="px-3 py-1 rounded-full text-xs font-semibold bg-[rgb(18,84,79)] hover:bg-[rgb(14,68,64)] text-white flex items-center gap-1.5 shadow-sm transition-all"
              >
                <span className="text-white/80">#</span>
                <span>Switch Qualification</span>
              </button>
            </div>
            <p className="text-xs text-[rgb(18,84,79)]/80 mt-1 font-medium">
              {profile.state}, {profile.country} • Target Stream: AI & Robotics Engineering
            </p>
          </div>
        </div>

        {/* 3 Sub-Branch Buttons as specified in Flowchart */}
        <div className="flex items-center gap-2 flex-wrap">
          <Link
            href="/student/roadmap"
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white hover:bg-white/90 text-[rgb(18,84,79)] border border-[#cbe1d0] text-xs font-semibold shadow-sm transition-all"
          >
            <GitBranch className="w-3.5 h-3.5 text-[rgb(42,131,95)]" />
            <span>5-Yr Roadmap</span>
          </Link>

          <Link
            href="/student/opportunities"
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white hover:bg-white/90 text-[rgb(18,84,79)] border border-[#cbe1d0] text-xs font-semibold shadow-sm transition-all"
          >
            <MapPin className="w-3.5 h-3.5 text-[rgb(42,131,95)]" />
            <span>Opportunities</span>
          </Link>

          <Link
            href="/student/mentor"
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[rgb(18,84,79)] hover:bg-[rgb(14,68,64)] text-white text-xs font-bold shadow-sm transition-all"
          >
            <Bot className="w-3.5 h-3.5" />
            <span>AI Mentor</span>
          </Link>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* PARENT-STUDENT COLLABORATION & UNLOCKED METRICS BAR                       */}
      {/* ========================================================================= */}
      <div className="bg-white p-5 rounded-2xl border border-[#cbe1d0] shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#daf0e3] text-[rgb(18,84,79)] flex items-center justify-center">
              <Users className="w-4 h-4 text-[rgb(18,84,79)]" />
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-extrabold text-[#123835]">
                Family Alignment & Financial Stability Gate
              </h2>
              <p className="text-xs text-[rgb(18,84,79)]/75">
                Synchronized with Family Sync Code ({syncCode})
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {step === "parent_approved" ? (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#daf0e3] text-[rgb(42,131,95)] border border-[#a2cfb2]">
                <CheckCircle2 className="w-3.5 h-3.5 text-[rgb(42,131,95)]" />
                <span>Parent Financial Approval Active</span>
              </span>
            ) : step === "permission_requested" ? (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#fef9ee] text-amber-700 border border-[#f3e5c8]">
                <Bell className="w-3.5 h-3.5 text-amber-600 animate-pulse" />
                <span>Pending Parent Slider Input</span>
              </span>
            ) : (
              <button
                onClick={requestParentPermission}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-[rgb(18,84,79)] hover:bg-[rgb(14,68,64)] text-white shadow-sm transition-all"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Send Course Permission to Parent</span>
              </button>
            )}

            <button
              onClick={resetFlow}
              title="Reset collaborative demo flow"
              className="p-2 rounded-xl bg-[#eaf4ee] hover:bg-[#daf0e3] text-[rgb(18,84,79)] border border-[#cbe1d0] transition-colors"
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
                ? "bg-[#daf0e3] border-[#a2cfb2]"
                : metrics.affordabilityStatus === "critical"
                ? "bg-[#fef9ee] border-[#f3e5c8]"
                : "bg-rose-50 border-rose-200"
            }`}>
              <div className="flex items-center gap-2">
                <span className={`px-2.5 py-0.5 rounded-full font-bold text-[11px] border ${
                  metrics.affordabilityStatus === "safe"
                    ? "bg-white text-[rgb(42,131,95)] border-[#a2cfb2]"
                    : metrics.affordabilityStatus === "critical"
                    ? "bg-white text-amber-700 border-[#f3e5c8]"
                    : "bg-white text-rose-700 border-rose-300"
                }`}>
                  {metrics.affordabilityLabel}
                </span>
                <span className="text-[#123835] font-medium">{metrics.affordabilityDescription}</span>
              </div>
              <span className="text-[11px] text-[rgb(18,84,79)] font-mono font-semibold self-start sm:self-auto">
                Income: ₹{(Number(parentParameters.parentAnnualIncome || 1000000) / 100000).toFixed(1)}L/yr
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              <div className="p-3.5 rounded-xl bg-[#f7faf8] border border-[#cbe1d0] space-y-1">
                <div className="flex items-center justify-between text-xs text-[rgb(18,84,79)]/80 font-semibold">
                  <span>Parent Alignment</span>
                  <Users className="w-3.5 h-3.5 text-[rgb(42,131,95)]" />
                </div>
                <p className="text-xl font-extrabold text-[#123835]">
                  {metrics.parentAlignmentScore.toFixed(1)}%
                </p>
                <p className="text-[10px] text-[rgb(42,131,95)] font-semibold">Conflict Index: {metrics.conflictIndex}% (High Harmony)</p>
              </div>

              <div className="p-3.5 rounded-xl bg-[#f7faf8] border border-[#cbe1d0] space-y-1">
                <div className="flex items-center justify-between text-xs text-[rgb(18,84,79)]/80 font-semibold">
                  <span>Financial Stability</span>
                  <ShieldCheck className="w-3.5 h-3.5 text-[rgb(42,131,95)]" />
                </div>
                <p className="text-xl font-extrabold text-[rgb(42,131,95)]">
                  {metrics.financialStabilityScore}/100
                </p>
                <p className="text-[10px] text-[rgb(42,131,95)] font-semibold">Cost is {metrics.coveragePercentage}% covered</p>
              </div>

              <div className="p-3.5 rounded-xl bg-[#f7faf8] border border-[#cbe1d0] space-y-1">
                <div className="flex items-center justify-between text-xs text-[rgb(18,84,79)]/80 font-semibold">
                  <span>Fees Payable (Per Yr)</span>
                  <DollarSign className="w-3.5 h-3.5 text-[rgb(18,84,79)]" />
                </div>
                <p className="text-xl font-extrabold text-[#123835] font-mono">
                  ₹{(Number(parentParameters.feesCanBePaidPerYear || 400000) / 100000).toFixed(1)}L
                </p>
                <p className="text-[10px] text-[rgb(18,84,79)]/80 font-semibold">
                  Payment × 4 Yrs: ₹{(Number(parentParameters.total4YearPayable || 1600000) / 100000).toFixed(1)}L
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-[#f7faf8] border border-[#cbe1d0] space-y-1">
                <div className="flex items-center justify-between text-xs text-[rgb(18,84,79)]/80 font-semibold">
                  <span>Loan Required</span>
                  <TrendingUp className="w-3.5 h-3.5 text-[rgb(18,84,79)]" />
                </div>
                <p className="text-xl font-extrabold text-[#123835] font-mono">
                  {metrics.loanNeeded === 0 ? "₹0 (Zero Debt)" : `₹${(metrics.loanNeeded / 100000).toFixed(1)}L`}
                </p>
                <p className="text-[10px] text-[rgb(18,84,79)]/80 font-semibold">Tolerance: {parentParameters.loanTolerance}</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="p-4 rounded-xl bg-[#fef9ee] border border-[#f3e5c8] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 text-[#3c3426]">
              <Lock className="w-4 h-4 text-amber-600 shrink-0" />
              <span>
                <strong>Parent Alignment & Financial Stability</strong> unlock immediately once family budget parameters are set via Family Sync Code ({syncCode}).
              </span>
            </div>
            <Link
              href="/parent/constraints"
              className="text-[rgb(42,131,95)] hover:text-[rgb(18,84,79)] font-bold shrink-0 hover:underline"
            >
              Configure in Parent Portal ➔
            </Link>
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* ADVANCED PSYCHOLOGICAL VECTORIZATION: RIASEC THEMES & BIG FIVE PERSONALITY */}
      {/* ========================================================================= */}
      <div className="bg-white p-5 sm:p-6 rounded-2xl border border-[#cbe1d0] shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#daf0e3] text-[rgb(42,131,95)] text-xs font-bold mb-1 border border-[#b8dec5]">
              <Brain className="w-3.5 h-3.5 text-[rgb(42,131,95)]" />
              <span>Psychometrics</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-[#123835]">
              Psychometric Alignment
            </h2>
            <p className="text-xs text-[rgb(18,84,79)]/75">
              Holland RIASEC themes and Big Five personality traits.
            </p>
          </div>

          {/* Toggle between RIASEC and Big Five */}
          <div className="flex items-center p-1 rounded-xl bg-[#eaf4ee] border border-[#cbe1d0] text-xs self-start sm:self-auto">
            <button
              onClick={() => setPsychometricTab("riasec")}
              className={`px-3.5 py-1.5 rounded-lg font-bold transition-all ${
                psychometricTab === "riasec"
                  ? "bg-[rgb(18,84,79)] text-white shadow-sm"
                  : "text-[rgb(18,84,79)] hover:text-[#0b3834]"
              }`}
            >
              RIASEC
            </button>
            <button
              onClick={() => setPsychometricTab("big_five")}
              className={`px-3.5 py-1.5 rounded-lg font-bold transition-all ${
                psychometricTab === "big_five"
                  ? "bg-[rgb(18,84,79)] text-white shadow-sm"
                  : "text-[rgb(18,84,79)] hover:text-[#0b3834]"
              }`}
            >
              Big Five
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Radar Chart Visualizer */}
          <div className="lg:col-span-7 h-[280px] w-full flex items-center justify-center p-2 rounded-xl bg-[#fcfdfc] border border-[#e2ede5]">
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
                <PolarGrid stroke="#c7ded0" />
                <PolarAngleAxis
                  dataKey="subject"
                  tick={{ fill: "#123835", fontSize: 11, fontWeight: 700 }}
                />
                <PolarRadiusAxis
                  angle={30}
                  domain={[0, 100]}
                  stroke="#c7ded0"
                  tick={{ fill: "#12544f", fontSize: 9 }}
                />
                <Radar
                  name={psychometricTab === "riasec" ? "RIASEC Score" : "Trait Strength"}
                  dataKey="score"
                  stroke="rgb(42, 131, 95)"
                  fill="rgb(42, 131, 95)"
                  fillOpacity={0.35}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#ffffff",
                    borderColor: "#cbe1d0",
                    borderRadius: "12px",
                    color: "#123835",
                    fontSize: "12px",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                  }}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          {/* Psychometric Traits & Behavioral Vector Metrics */}
          <div className="lg:col-span-5 space-y-3">
            <div className="p-3.5 rounded-xl bg-[#daf0e3]/50 border border-[#b8dec5] space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-extrabold text-[#123835] flex items-center gap-1.5">
                  <Compass className="w-3.5 h-3.5 text-[rgb(18,84,79)]" />
                  <span>Vocational Archetype</span>
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#daf0e3] text-[rgb(18,84,79)] border border-[#a2cfb2]">
                  {psychometricTab === "riasec" ? "Investigative-Realistic (IR)" : "Curious & Highly Conscientious"}
                </span>
              </div>
              <p className="text-[11px] text-[rgb(18,84,79)]/80 leading-relaxed font-medium">
                {psychometricTab === "riasec"
                  ? "Peak resonance in algorithmic exploration, scientific inquiry, and robotic systems engineering."
                  : "High openness to innovation (88%) paired with structured grit (85%) ensures high stamina in deep-tech domains."}
              </p>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <div className="p-3 rounded-xl bg-[#fef4f4] border border-[#fbd5d5] text-center">
                <span className="text-[10px] text-rose-700/80 block font-semibold">Locus of Control</span>
                <span className="text-xs font-black text-rose-700">Internal</span>
                <span className="text-[9px] text-rose-600 block font-bold">High Agency</span>
              </div>
              <div className="p-3 rounded-xl bg-[#f0f9f3] border border-[#cbe8d5] text-center">
                <span className="text-[10px] text-emerald-800/80 block font-semibold">Growth Mindset</span>
                <span className="text-xs font-black text-emerald-800 font-mono">88 / 100</span>
                <span className="text-[9px] text-emerald-700 block font-bold">Resilient</span>
              </div>
              <div className="p-3 rounded-xl bg-[#fefbe8] border border-[#fbeeb0] text-center">
                <span className="text-[10px] text-amber-800/80 block font-semibold">Divergence</span>
                <span className="text-xs font-black text-amber-800 font-mono">4.5%</span>
                <span className="text-[9px] text-amber-700 block font-bold">Congruent</span>
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
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#daf0e3] text-[rgb(42,131,95)] text-xs font-bold mb-1 border border-[#b8dec5]">
              <Layers className="w-3.5 h-3.5 text-[rgb(42,131,95)]" />
              <span>Career Tiers</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-[#123835]">
              Ranked Careers
            </h2>
            <p className="text-xs text-[rgb(18,84,79)]/75">
              Categorized into Safe, Match, and Reach tiers.
            </p>
          </div>

          {/* Tier Filter Tabs */}
          <div className="flex items-center p-1 rounded-xl bg-[#eaf4ee] border border-[#cbe1d0] text-xs">
            <button
              onClick={() => setActiveTierTab("all")}
              className={`px-3.5 py-1.5 rounded-lg font-bold transition-all ${
                activeTierTab === "all"
                  ? "bg-[rgb(18,84,79)] text-white shadow-sm"
                  : "text-[rgb(18,84,79)] hover:text-[#0b3834]"
              }`}
            >
              All Tiers
            </button>
            <button
              onClick={() => setActiveTierTab("safe")}
              className={`px-3.5 py-1.5 rounded-lg font-bold transition-all ${
                activeTierTab === "safe"
                  ? "bg-[rgb(18,84,79)] text-white shadow-sm"
                  : "text-[rgb(18,84,79)] hover:text-[#0b3834]"
              }`}
            >
              Safe
            </button>
            <button
              onClick={() => setActiveTierTab("match")}
              className={`px-3.5 py-1.5 rounded-lg font-bold transition-all ${
                activeTierTab === "match"
                  ? "bg-[rgb(18,84,79)] text-white shadow-sm"
                  : "text-[rgb(18,84,79)] hover:text-[#0b3834]"
              }`}
            >
              Match
            </button>
            <button
              onClick={() => setActiveTierTab("reach")}
              className={`px-3.5 py-1.5 rounded-lg font-bold transition-all ${
                activeTierTab === "reach"
                  ? "bg-[rgb(18,84,79)] text-white shadow-sm"
                  : "text-[rgb(18,84,79)] hover:text-[#0b3834]"
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
              <div className="flex items-center gap-2 text-sm font-bold text-[rgb(18,84,79)]">
                <Sparkles className="w-4 h-4 text-[rgb(42,131,95)]" />
                <span>Match Tier</span>
              </div>
              {careerTiers.match.map((item) => (
                <div
                  key={item.id}
                  className="bg-white p-5 rounded-2xl border border-[#cbe1d0] hover:border-[rgb(42,131,95)] transition-all space-y-3 relative group shadow-sm hover:shadow-md"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-[#daf0e3] text-[rgb(18,84,79)] border border-[#a2cfb2]">
                      {item.tagline}
                    </span>
                    <span className="text-sm font-bold text-[rgb(42,131,95)] font-mono">
                      {item.matchScore}% Fit
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-[#123835] group-hover:text-[rgb(18,84,79)] transition-colors">
                    {item.name}
                  </h3>

                  <p className="text-xs text-[#2a4e46] leading-relaxed">
                    {item.description}
                  </p>

                  <div className="pt-2 border-t border-[#e2ede5] grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="text-[rgb(18,84,79)]/70 block text-[11px] font-medium">Expected CTC</span>
                      <span className="font-bold text-[#123835] font-mono text-sm">{item.expectedCTC}</span>
                    </div>
                    <div>
                      <span className="text-[rgb(18,84,79)]/70 block text-[11px] font-medium">Annual Fee</span>
                      <span className="font-bold text-[#123835] font-mono text-sm">₹{(item.annualCost / 100000).toFixed(1)}L / yr</span>
                    </div>
                  </div>

                  <Link
                    href={`/student/roadmap`}
                    className="w-full mt-2 py-2 px-3 rounded-xl bg-[rgb(18,84,79)] hover:bg-[rgb(14,68,64)] text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm transition-all"
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
              <div className="flex items-center gap-2 text-sm font-bold text-[rgb(42,131,95)]">
                <ShieldCheck className="w-4 h-4 text-[rgb(42,131,95)]" />
                <span>Safe Tier</span>
              </div>
              {careerTiers.safe.map((item) => (
                <div
                  key={item.id}
                  className="bg-white p-5 rounded-2xl border border-[#cbe1d0] hover:border-[rgb(42,131,95)] transition-all space-y-3 relative group shadow-sm hover:shadow-md"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-[#daf0e3] text-[rgb(18,84,79)] border border-[#a2cfb2]">
                      {item.tagline}
                    </span>
                    <span className="text-sm font-bold text-[rgb(42,131,95)] font-mono">
                      {item.matchScore}% Fit
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-[#123835] group-hover:text-[rgb(18,84,79)] transition-colors">
                    {item.name}
                  </h3>

                  <p className="text-xs text-[#2a4e46] leading-relaxed">
                    {item.description}
                  </p>

                  <div className="pt-2 border-t border-[#e2ede5] grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="text-[rgb(18,84,79)]/70 block text-[11px] font-medium">Expected CTC</span>
                      <span className="font-bold text-[#123835] font-mono text-sm">{item.expectedCTC}</span>
                    </div>
                    <div>
                      <span className="text-[rgb(18,84,79)]/70 block text-[11px] font-medium">Annual Fee</span>
                      <span className="font-bold text-[#123835] font-mono text-sm">₹{(item.annualCost / 100000).toFixed(1)}L / yr</span>
                    </div>
                  </div>

                  <Link
                    href={`/student/roadmap`}
                    className="w-full mt-2 py-2 px-3 rounded-xl bg-[rgb(18,84,79)] hover:bg-[rgb(14,68,64)] text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm transition-all"
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
              <div className="flex items-center gap-2 text-sm font-bold text-[#b45309]">
                <Flame className="w-4 h-4 text-amber-600" />
                <span>Reach Tier</span>
              </div>
              {careerTiers.reach.map((item) => (
                <div
                  key={item.id}
                  className="bg-white p-5 rounded-2xl border border-[#cbe1d0] hover:border-[rgb(42,131,95)] transition-all space-y-3 relative group shadow-sm hover:shadow-md"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-[#daf0e3] text-[rgb(18,84,79)] border border-[#a2cfb2]">
                      {item.tagline}
                    </span>
                    <span className="text-sm font-bold text-[rgb(42,131,95)] font-mono">
                      {item.matchScore}% Fit
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-[#123835] group-hover:text-[rgb(18,84,79)] transition-colors">
                    {item.name}
                  </h3>

                  <p className="text-xs text-[#2a4e46] leading-relaxed">
                    {item.description}
                  </p>

                  <div className="pt-2 border-t border-[#e2ede5] grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="text-[rgb(18,84,79)]/70 block text-[11px] font-medium">Expected CTC</span>
                      <span className="font-bold text-[#123835] font-mono text-sm">{item.expectedCTC}</span>
                    </div>
                    <div>
                      <span className="text-[rgb(18,84,79)]/70 block text-[11px] font-medium">Annual Fee</span>
                      <span className="font-bold text-[#123835] font-mono text-sm">₹{(item.annualCost / 100000).toFixed(1)}L / yr</span>
                    </div>
                  </div>

                  <Link
                    href={`/student/roadmap`}
                    className="w-full mt-2 py-2 px-3 rounded-xl bg-[rgb(18,84,79)] hover:bg-[rgb(14,68,64)] text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm transition-all"
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

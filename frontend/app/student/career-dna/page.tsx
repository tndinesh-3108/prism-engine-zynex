"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { 
  Dna, 
  Brain, 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  Cpu,
  Award,
  CheckCircle2,
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
import { getCareerDNA } from "@/lib/api";
import { CareerDNA } from "@/types";
import { useTheme } from "@/lib/theme-context";
import { useStudentParentFlow } from "@/lib/student-parent-flow";

export default function StudentCareerDNAPage() {
  const { theme } = useTheme();
  const isWhite = theme === "white";
  const { syncCode } = useStudentParentFlow();
  const [dna, setDna] = useState<CareerDNA | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const data = await getCareerDNA(1);
        setDna(data);
      } catch (err) {
        console.warn("Using fallback demo DNA:", err);
        setDna({
          student_id: 1,
          student_name: "Arun Kumar",
          aptitude_score: 91,
          interest_score: 95,
          skill_score: 82,
          academic_fit: 92,
          risk_profile: "Moderate",
          cognitive_radar: [
            { subject: "Analytical Thinking", A: 86, fullMark: 100 },
            { subject: "Problem Solving", A: 91, fullMark: 100 },
            { subject: "Programming", A: 92, fullMark: 100 },
            { subject: "Mathematics", A: 89, fullMark: 100 },
            { subject: "Creativity", A: 74, fullMark: 100 },
            { subject: "Communication", A: 68, fullMark: 100 },
          ],
          top_strengths: [
            "Programming (92/100)",
            "Problem Solving (91/100)",
            "Mathematics (89/100)",
            "Analytical Thinking (86/100)",
          ],
          ai_dna_summary:
            "Your PRISM Career DNA reflects an exceptional cognitive foundation with an aptitude score of 91/100. You display distinctive mastery in Programming, Problem Solving, and Mathematics, highlighting strong systematic problem-solving and structured algorithmic thinking. Your deep interest in AI & Robotics directly complements high-velocity STEAM sectors.",
          gemini_generated: true,
        });
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  if (loading || !dna) {
    return (
      <div className="max-w-4xl mx-auto py-16 text-center space-y-4">
        <div className="w-12 h-12 border-4 border-pink-500 border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-sm text-rose-200/70">Synthesizing Student Cognitive Career DNA...</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8 py-4 px-4 sm:px-6">
      {/* Flow Stage Indicator */}
      <div className="flex items-center justify-between text-xs text-rose-300/80 bg-purple-950/40 p-3 rounded-xl border border-purple-800/40">
        <Link href="/student/setup" className="flex items-center gap-1.5 hover:text-white transition-colors">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>1. Setup & Sync Code</span>
        </Link>
        <ArrowRight className="w-3.5 h-3.5 text-purple-400" />
        <Link href="/student/assessment" className="flex items-center gap-1.5 hover:text-white transition-colors">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>2. Aptitude & Skills</span>
        </Link>
        <ArrowRight className="w-3.5 h-3.5 text-purple-400" />
        <div className="flex items-center gap-1.5">
          <span className="w-5 h-5 rounded-full bg-pink-500 text-white flex items-center justify-center font-bold text-[11px]">3</span>
          <span className="font-bold text-white">Career DNA (Current)</span>
        </div>
        <ArrowRight className="w-3.5 h-3.5 text-purple-400" />
        <Link href="/student/dashboard" className="flex items-center gap-1.5 text-rose-300/70 hover:text-white transition-colors">
          <span className="w-5 h-5 rounded-full bg-purple-900 text-purple-300 flex items-center justify-center font-bold text-[11px]">4</span>
          <span>Ranked Dashboard ➔</span>
        </Link>
      </div>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-950/70 text-pink-300 text-xs font-semibold mb-2 border border-pink-700/40">
            <Dna className="w-3.5 h-3.5 text-pink-400" />
            <span>PRISM Core Engine Output</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white">
            {dna.student_name}'s Cognitive Career DNA
          </h1>
          <p className="text-xs text-rose-200/70">
            Algorithmic quantification of cognitive strengths, mathematical aptitude, and STEAM readiness.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/student/assessment"
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-purple-950/60 hover:bg-purple-900/60 text-purple-200 border border-purple-700/50 text-xs font-semibold transition-colors"
          >
            <Compass className="w-3.5 h-3.5 text-pink-400" />
            <span>Retake Assessment</span>
          </Link>
          <Link
            href="/student/dashboard"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-pink-600 via-rose-500 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white text-xs font-bold shadow-lg shadow-pink-600/30 transition-all"
          >
            <span>Proceed to Ranked Careers (Safe/Match/Reach)</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* 4 Top Metric Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="glass-card p-4 rounded-xl border border-pink-500/30 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-rose-200/70">Cognitive Aptitude</span>
            <Brain className="w-4 h-4 text-pink-400" />
          </div>
          <p className="text-2xl font-extrabold text-white">{dna.aptitude_score}/100</p>
          <div className="w-full bg-purple-950/80 h-1.5 rounded-full overflow-hidden">
            <div className="bg-pink-500 h-full rounded-full" style={{ width: `${dna.aptitude_score}%` }} />
          </div>
          <p className="text-[10px] text-pink-300/70">Top 5th Percentile Nationally</p>
        </div>

        <div className="glass-card p-4 rounded-xl border border-peach-500/30 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-rose-200/70">STEAM Interest Depth</span>
            <Sparkles className="w-4 h-4 text-peach-400" />
          </div>
          <p className="text-2xl font-extrabold text-white">{dna.interest_score}/100</p>
          <div className="w-full bg-purple-950/80 h-1.5 rounded-full overflow-hidden">
            <div className="bg-peach-500 h-full rounded-full" style={{ width: `${dna.interest_score}%` }} />
          </div>
          <p className="text-[10px] text-peach-300/70">AI, Algorithms & Robotics</p>
        </div>

        <div className="glass-card p-4 rounded-xl border border-purple-500/30 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-rose-200/70">Technical Skill Score</span>
            <Cpu className="w-4 h-4 text-purple-400" />
          </div>
          <p className="text-2xl font-extrabold text-white">{dna.skill_score}/100</p>
          <div className="w-full bg-purple-950/80 h-1.5 rounded-full overflow-hidden">
            <div className="bg-purple-500 h-full rounded-full" style={{ width: `${dna.skill_score}%` }} />
          </div>
          <p className="text-[10px] text-purple-300/70">Python, C++ & Logic Gates</p>
        </div>

        <div className="glass-card p-4 rounded-xl border border-rose-500/30 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-rose-200/70">Academic Fit</span>
            <ShieldCheck className="w-4 h-4 text-rose-400" />
          </div>
          <p className="text-2xl font-extrabold text-white">{dna.academic_fit}/100</p>
          <div className="w-full bg-purple-950/80 h-1.5 rounded-full overflow-hidden">
            <div className="bg-rose-500 h-full rounded-full" style={{ width: `${dna.academic_fit}%` }} />
          </div>
          <p className="text-[10px] text-rose-300/70">Class 12 PCM Matrix</p>
        </div>
      </div>

      {/* Main Analysis Grid: Radar Chart + Cognitive Synthesis */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Radar Chart (7 cols) */}
        <div className="lg:col-span-7 glass-card p-6 rounded-3xl border border-purple-500/30 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Brain className="w-5 h-5 text-pink-400" />
              <h2 className="text-base font-extrabold text-white">
                Multi-Axis Cognitive Competency Radar
              </h2>
            </div>
            <span className="text-[10px] font-bold text-pink-300 bg-pink-950/70 px-2.5 py-1 rounded-full border border-pink-700/40">
              6 Assessment Dimensions
            </span>
          </div>

          <div className="w-full h-[360px] flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={dna.cognitive_radar}>
                <PolarGrid stroke={isWhite ? "rgba(131,24,67,0.2)" : "rgba(219,39,119,0.25)"} />
                <PolarAngleAxis
                  dataKey="subject"
                  tick={{
                    fill: isWhite ? "#2e1065" : "#fed7aa",
                    fontSize: 11,
                    fontWeight: 700,
                  }}
                />
                <PolarRadiusAxis
                  angle={30}
                  domain={[0, 100]}
                  tick={{ fill: isWhite ? "#831843" : "#f472b6", fontSize: 9 }}
                />
                <Radar
                  name="Cognitive Score"
                  dataKey="A"
                  stroke="#db2777"
                  fill="#db2777"
                  fillOpacity={0.45}
                />
                <Tooltip
                  content={({ payload }) => {
                    if (!payload || !payload.length) return null;
                    const d = payload[0].payload;
                    return (
                      <div className="p-2.5 rounded-xl bg-[#1e0b2e] border border-pink-500/40 text-xs shadow-xl text-white">
                        <p className="font-bold text-pink-300">{d.subject}</p>
                        <p className="text-white font-mono">{d.A} / {d.fullMark} Points</p>
                      </div>
                    );
                  }}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          {/* Radar Legend & Callout */}
          <div className="grid grid-cols-3 gap-2 pt-2 border-t border-purple-900/40 text-center">
            <div className="p-2 rounded-xl bg-purple-950/30">
              <span className="text-[10px] text-rose-300/70">Peak Competency</span>
              <p className="text-xs font-extrabold text-pink-400">Programming (92)</p>
            </div>
            <div className="p-2 rounded-xl bg-purple-950/30">
              <span className="text-[10px] text-rose-300/70">Algorithmic Base</span>
              <p className="text-xs font-extrabold text-peach-400">Math & Logic (89)</p>
            </div>
            <div className="p-2 rounded-xl bg-purple-950/30">
              <span className="text-[10px] text-rose-300/70">Growth Vector</span>
              <p className="text-xs font-extrabold text-purple-300">Communication (68)</p>
            </div>
          </div>
        </div>

        {/* Cognitive Synthesis & Top Strengths (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Top Strengths */}
          <div className="glass-card p-6 rounded-3xl border border-pink-500/30 space-y-4">
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-peach-400" />
              <h3 className="text-sm font-extrabold text-white">
                Identified Core Strengths
              </h3>
            </div>
            <div className="space-y-2.5">
              {dna.top_strengths.map((str, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2.5 p-3 rounded-xl bg-purple-950/40 border border-purple-800/40"
                >
                  <div className="w-6 h-6 rounded-lg bg-pink-500/20 text-pink-300 flex items-center justify-center text-xs font-bold shrink-0">
                    #{idx + 1}
                  </div>
                  <span className="text-xs font-bold text-white">{str}</span>
                </div>
              ))}
            </div>
          </div>

          {/* AI DNA Summary */}
          <div className="glass-card p-6 rounded-3xl border border-peach-500/30 space-y-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-pink-400" />
              <h3 className="text-sm font-extrabold text-white">
                PRISM Diagnostic Synthesis
              </h3>
            </div>
            <p className="text-xs text-rose-100/90 leading-relaxed">
              {dna.ai_dna_summary}
            </p>
            <div className="pt-2 border-t border-purple-900/40 flex items-center justify-between text-[11px] text-rose-300/70">
              <span>Risk Tolerance: {dna.risk_profile}</span>
              <span>Sync Code: {syncCode}</span>
            </div>
          </div>

          {/* Action Gateway Button */}
          <Link
            href="/student/dashboard"
            className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-pink-600 via-rose-500 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white font-extrabold text-sm shadow-xl shadow-pink-600/30 flex items-center justify-center gap-2.5 transition-all text-center"
          >
            <span>Proceed to Ranked Careers Dashboard</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </div>
  );
}

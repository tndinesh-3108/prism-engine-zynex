"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { 
  Dna, 
  Brain, 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  Zap,
  Cpu
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

export default function CareerDNAPage() {
  const { theme } = useTheme();
  const isWhite = theme === "white";
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
          gemini_generated: false,
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
    <div className="max-w-5xl mx-auto space-y-8 py-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-950/70 text-pink-300 text-xs font-semibold mb-2 border border-pink-700/40">
            <Dna className="w-3.5 h-3.5 text-pink-400" />
            <span>Cognitive Fingerprint</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white">
            {dna.student_name}'s Career DNA
          </h1>
          <p className="text-xs text-rose-200/70">
            Algorithmic quantification of cognitive strengths, mathematical aptitude, and STEAM readiness.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/parent"
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-purple-950/60 hover:bg-purple-900/60 text-purple-200 border border-purple-700/50 text-xs font-semibold transition-colors"
          >
            <span>Set Family Budget</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
          <Link
            href="/recommendations"
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white text-xs font-bold shadow-md shadow-pink-600/30 transition-all"
          >
            <span>View Recommendations</span>
            <ArrowRight className="w-3.5 h-3.5" />
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
          <p className="text-[10px] text-pink-300/70">Top 5th Percentile</p>
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
          <p className="text-[10px] text-peach-300/70">Focused on AI & Robotics</p>
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
          <p className="text-[10px] text-purple-300/70">Advanced Programming & Logic</p>
        </div>

        <div className="glass-card p-4 rounded-xl border border-rose-400/30 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-rose-200/70">Academic Score Fit</span>
            <ShieldCheck className="w-4 h-4 text-rose-300" />
          </div>
          <p className="text-2xl font-extrabold text-white">{dna.academic_fit}%</p>
          <div className="w-full bg-purple-950/80 h-1.5 rounded-full overflow-hidden">
            <div className="bg-rose-400 h-full rounded-full" style={{ width: `${dna.academic_fit}%` }} />
          </div>
          <p className="text-[10px] text-rose-200/70">88% Board Exam Score</p>
        </div>
      </div>

      {/* Main Visual: Radar Chart + Cognitive Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Recharts Radar Chart */}
        <div className="glass-card p-6 rounded-2xl border border-purple-900/40 lg:col-span-7 flex flex-col justify-between">
          <div className="space-y-1 mb-2">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Zap className="w-4 h-4 text-pink-400" />
              <span>Cognitive Competency Radar</span>
            </h3>
            <p className="text-xs text-rose-200/70">
              Normalized benchmark across foundational problem solving, mathematical rigor, and engineering creativity.
            </p>
          </div>

          <div className="h-[340px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="75%" data={dna.cognitive_radar}>
                <PolarGrid stroke={isWhite ? "#fbcfe8" : "#4a2040"} />
                <PolarAngleAxis
                  dataKey="subject"
                  stroke={isWhite ? "#db2777" : "#fda4af"}
                  tick={{ fill: isWhite ? "#3b0764" : "#fbcfe8", fontSize: 11, fontWeight: isWhite ? 600 : 400 }}
                />
                <PolarRadiusAxis
                  angle={30}
                  domain={[0, 100]}
                  stroke={isWhite ? "#a855f7" : "#6b21a8"}
                />
                <Radar
                  name="Student DNA"
                  dataKey="A"
                  stroke="#f472b6"
                  fill="#ec4899"
                  fillOpacity={isWhite ? 0.35 : 0.45}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: isWhite ? "#ffffff" : "#160b24",
                    borderColor: isWhite ? "#ec4899" : "#db2777",
                    borderRadius: "8px",
                    color: isWhite ? "#2e1065" : "#ffffff",
                    fontSize: "12px",
                    boxShadow: isWhite ? "0 4px 20px rgba(236,72,153,0.15)" : "none",
                  }}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          <div className="flex flex-wrap justify-center gap-4 pt-2 text-[11px] text-rose-200/70">
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 bg-pink-500/50 border border-pink-400 rounded-sm" />
              <span>Arun Kumar Profile</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 bg-purple-900/50 border border-purple-600 rounded-sm" />
              <span>STEAM Cohort Benchmark (70%)</span>
            </div>
          </div>
        </div>

        {/* Strengths & AI Synthesis */}
        <div className="glass-card p-6 rounded-2xl border border-purple-900/40 lg:col-span-5 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-peach-400" />
              <h3 className="text-base font-bold text-white">AI Synthesis & Strengths</h3>
            </div>

            <div className="p-4 rounded-xl bg-purple-950/50 border border-purple-800/40 text-xs text-rose-100 leading-relaxed">
              <p>{dna.ai_dna_summary}</p>
              <div className="mt-3 flex items-center gap-2 text-[10px] text-pink-300">
                <span className="w-1.5 h-1.5 rounded-full bg-peach-400" />
                <span>Generated by PRISM Explainability Engine (Gemini Grounded)</span>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-xs font-semibold text-rose-200 uppercase tracking-wider">
                Top Core Competencies
              </h4>
              <div className="space-y-2">
                {dna.top_strengths.map((str, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 rounded-lg bg-[#140822]/80 border border-purple-900/40 flex items-center justify-between text-xs"
                  >
                    <span className="font-semibold text-rose-100">{str.split("(")[0]}</span>
                    <span className="text-peach-300 font-bold bg-peach-950/70 px-2 py-0.5 rounded border border-peach-800/40">
                      {str.match(/\((.*?)\)/)?.[1] || "High"}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-[#140822]/80 border border-purple-900/40 flex items-center justify-between text-xs">
            <div>
              <span className="text-rose-200/70">Risk Profile: </span>
              <strong className="text-white">{dna.risk_profile}</strong>
            </div>
            <Link
              href="/recommendations"
              className="text-pink-400 hover:text-pink-300 font-semibold flex items-center gap-1 transition-colors"
            >
              <span>See Matching Careers</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}


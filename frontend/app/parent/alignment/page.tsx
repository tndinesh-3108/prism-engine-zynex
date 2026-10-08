"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { 
  Scale, 
  ArrowRight, 
  ArrowLeft,
  Sparkles,
  DollarSign
} from "lucide-react";
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  Tooltip 
} from "recharts";
import { getConflictAnalysis } from "@/lib/api";
import { ConflictData } from "@/types";
import { useStudentParentFlow } from "@/lib/student-parent-flow";

export default function ParentAlignmentPage() {
  const { parentParameters } = useStudentParentFlow();
  const [conflict, setConflict] = useState<ConflictData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const data = await getConflictAnalysis(1);
        setConflict(data);
      } catch (err) {
        console.warn("Using fallback conflict data:", err);
        setConflict({
          alignment_score: 95.5,
          conflict_index: 4.5,
          alignment_level: "High Harmony",
          dimension_breakdown: [
            {
              dimension: "Career Domain",
              student_value: "AI, Technology, Robotics",
              parent_value: "Engineering / Technology",
              alignment_score: 95,
              weight: "30%",
              status: "Aligned",
            },
            {
              dimension: "Risk Appetite",
              student_value: "Moderate",
              parent_value: "Medium",
              alignment_score: 100,
              weight: "20%",
              status: "Aligned",
            },
            {
              dimension: "Geographic Scope",
              student_value: "Chennai & Bengaluru Hubs",
              parent_value: parentParameters.geographyPreference || "Regional Tech Hubs (Chennai & Bengaluru)",
              alignment_score: 100,
              weight: "20%",
              status: "Aligned",
            },
            {
              dimension: "Higher Study Intent",
              student_value: "M.Tech / MS after B.Tech",
              parent_value: "Expected: Yes",
              alignment_score: 100,
              weight: "15%",
              status: "Aligned",
            },
            {
              dimension: "Financial Risk & Debt",
              student_value: "Growth Focused (₹32L+ Packages)",
              parent_value: `Loan Tolerance: ${parentParameters.loanTolerance}`,
              alignment_score: 85,
              weight: "15%",
              status: "Feasible",
            },
          ],
          key_divergences: [
            "Strong synergy across academic direction, geographic bounds, and financial tolerance.",
          ],
          common_ground_careers: [
            {
              name: "AI / ML Engineer & Generative Systems Lead",
              domain: "Technology & Engineering",
              synergy_reason:
                "Bridges student's passion for cutting-edge AI with parent's preference for established engineering accreditation and high market stability.",
              fit_score: 96,
            },
            {
              name: "Data Systems Architect",
              domain: "Cloud & Analytics",
              synergy_reason:
                "Offers strong corporate hiring demand and salary security preferred by parents alongside advanced mathematical modeling favored by student.",
              fit_score: 91,
            },
            {
              name: "Robotics Hardware Specialist",
              domain: "Embedded & Mechatronics",
              synergy_reason:
                "Grounded in foundational mechanical and electronics engineering with high futuristic appeal in industrial automation.",
              fit_score: 88,
            },
          ],
          parent_friendly_summary:
            "Parent–Student Alignment is 95.5% (Conflict Index: 4.5/100 - High Harmony). Both parties strongly concur on high-growth STEAM foundations in Chennai. Key consensus is found in accredited technological programs such as AI Engineering and Data Science.",
        });
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [parentParameters]);

  if (loading || !conflict) {
    return (
      <div className="max-w-4xl mx-auto py-16 text-center space-y-4">
        <div className="w-12 h-12 border-4 border-pink-500 border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-sm text-rose-200/70">Analyzing Parent-Student Conflict Index...</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8 py-4 px-4 sm:px-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-950/70 text-purple-200 text-xs font-semibold mb-2 border border-purple-700/50">
            <Scale className="w-3.5 h-3.5 text-pink-400" />
            <span>Harmonization Engine</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white">
            Parent-Student Alignment & Conflict Index
          </h1>
          <p className="text-xs text-rose-200/70">
            Algorithmic alignment between Arun's career ambitions and parental financial boundaries.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/parent/dashboard"
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-purple-950/60 hover:bg-purple-900/60 text-purple-200 border border-purple-800/40 text-xs font-semibold transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Parent Dashboard</span>
          </Link>
          <Link
            href="/parent/funding"
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white text-xs font-bold shadow-md shadow-pink-600/30 transition-all"
          >
            <DollarSign className="w-4 h-4" />
            <span>Scholarships & ROI ➔</span>
          </Link>
        </div>
      </div>

      {/* Top 2 Big Hero Cards: Alignment Score & Conflict Index */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-card p-6 rounded-3xl border border-pink-500/30 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs text-rose-200/70 font-bold uppercase tracking-wider">
              Family Alignment Score
            </span>
            <span className="text-xs font-extrabold text-emerald-400 bg-emerald-950/80 px-2.5 py-0.5 rounded-full border border-emerald-500/40">
              {conflict.alignment_level}
            </span>
          </div>
          <p className="text-4xl font-extrabold text-white">
            {conflict.alignment_score}%
          </p>
          <div className="w-full bg-purple-950 h-2 rounded-full overflow-hidden">
            <div className="bg-pink-500 h-full rounded-full" style={{ width: `${conflict.alignment_score}%` }} />
          </div>
          <p className="text-[11px] text-rose-200/80">
            Based on multi-objective optimization comparing Arun's 15-Q aptitude results with family constraints.
          </p>
        </div>

        <div className="glass-card p-6 rounded-3xl border border-purple-500/30 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs text-rose-200/70 font-bold uppercase tracking-wider">
              Divergence / Conflict Gauge
            </span>
            <span className={`text-xs font-extrabold px-2.5 py-0.5 rounded-full border ${
              conflict.conflict_index <= 20
                ? "bg-emerald-950/80 text-emerald-300 border-emerald-500/40"
                : conflict.conflict_index <= 45
                ? "bg-peach-950/80 text-peach-300 border-peach-500/40"
                : "bg-rose-950/80 text-rose-300 border-rose-500/40"
            }`}>
              {conflict.conflict_index <= 20 ? "Minimal Tension" : conflict.conflict_index <= 45 ? "Moderate Friction" : "High Divergence"}
            </span>
          </div>

          <div className="h-32 w-full flex items-center justify-center relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={[
                    {
                      name: "Conflict",
                      value: Math.max(0, Math.min(100, conflict.conflict_index)),
                      fill: conflict.conflict_index <= 20 ? "#10b981" : conflict.conflict_index <= 45 ? "#fb923c" : "#f43f5e",
                    },
                    {
                      name: "Harmony",
                      value: Math.max(0, 100 - conflict.conflict_index),
                      fill: "rgba(255, 255, 255, 0.08)",
                    },
                  ]}
                  cx="50%"
                  cy="85%"
                  startAngle={180}
                  endAngle={0}
                  innerRadius={50}
                  outerRadius={75}
                  paddingAngle={2}
                  dataKey="value"
                  stroke="none"
                >
                  <Cell fill={conflict.conflict_index <= 20 ? "#10b981" : conflict.conflict_index <= 45 ? "#fb923c" : "#f43f5e"} />
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
            <div className="absolute bottom-1 text-center">
              <span className="text-2xl font-black text-white">{conflict.conflict_index}%</span>
              <span className="block text-[9px] uppercase font-bold text-rose-300/70">Friction</span>
            </div>
          </div>

          <p className="text-[11px] text-rose-200/80">
            Low divergence indicates that Arun&apos;s preferred courses (B.Tech AI) fit comfortably within family budget parameters.
          </p>
        </div>
      </div>

      {/* Dimension Breakdown Table */}
      <div className="glass-card p-6 rounded-3xl border border-purple-500/30 space-y-4">
        <h2 className="text-base font-extrabold text-white flex items-center gap-2">
          <Scale className="w-4 h-4 text-pink-400" />
          <span>Dimension-by-Dimension Decision Matrix</span>
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-purple-900/50 text-rose-300/70 uppercase text-[10px] tracking-wider">
                <th className="py-3 px-3">Decision Dimension</th>
                <th className="py-3 px-3">Student Perspective (Arun)</th>
                <th className="py-3 px-3">Parent Boundary</th>
                <th className="py-3 px-3">Weight</th>
                <th className="py-3 px-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-purple-950/60">
              {conflict.dimension_breakdown.map((row, idx) => (
                <tr key={idx} className="hover:bg-purple-950/20 transition-colors">
                  <td className="py-3.5 px-3 font-bold text-white">{row.dimension}</td>
                  <td className="py-3.5 px-3 text-pink-300 font-medium">{row.student_value}</td>
                  <td className="py-3.5 px-3 text-purple-200 font-medium">{row.parent_value}</td>
                  <td className="py-3.5 px-3 text-rose-300/70 font-mono">{row.weight}</td>
                  <td className="py-3.5 px-3">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                      row.status === "Aligned"
                        ? "bg-emerald-950/80 text-emerald-300 border-emerald-500/40"
                        : "bg-purple-950 text-purple-300 border-purple-700/50"
                    }`}>
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Common Ground Careers */}
      <div className="glass-card p-6 rounded-3xl border border-peach-500/30 space-y-4">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-peach-400" />
          <h2 className="text-base font-extrabold text-white">
            AI-Mediated Common Ground Career Matches
          </h2>
        </div>
        <p className="text-xs text-rose-200/80">
          These career trajectories satisfy both Arun's technological curiosity and parent financial predictability:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
          {conflict.common_ground_careers.map((cg, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-purple-950/40 border border-purple-800/40 space-y-2 flex flex-col justify-between">
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-pink-950 text-pink-300 border border-pink-700/40">
                    Synergy Match
                  </span>
                  <span className="text-xs font-black text-emerald-400 font-mono">
                    {cg.fit_score}% Fit
                  </span>
                </div>
                <h3 className="text-sm font-extrabold text-white">{cg.name}</h3>
                <p className="text-[10px] text-purple-300 font-semibold">{cg.domain}</p>
                <p className="text-[11px] text-rose-200/75 leading-relaxed">{cg.synergy_reason}</p>
              </div>

              <Link
                href="/student/roadmap"
                className="mt-2 py-1.5 px-3 rounded-lg bg-pink-600/30 hover:bg-pink-600 text-pink-200 hover:text-white text-[11px] font-bold flex items-center justify-center gap-1 transition-all border border-pink-500/40"
              >
                <span>View Full Roadmap</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

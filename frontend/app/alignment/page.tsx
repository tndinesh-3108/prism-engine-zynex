"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { 
  Scale, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle, 
  Lightbulb, 
  Users 
} from "lucide-react";
import { getConflictAnalysis } from "@/lib/api";
import { ConflictData } from "@/types";

export default function AlignmentPage() {
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
              student_value: "Chennai",
              parent_value: "Chennai",
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
              student_value: "Growth Focused",
              parent_value: "Loan: Low Tolerance",
              alignment_score: 80,
              weight: "15%",
              status: "Feasible",
            },
          ],
          key_divergences: [
            "Strong synergy across academic direction, geographic bounds, and financial tolerance.",
          ],
          common_ground_careers: [
            {
              name: "AI / ML Engineer",
              domain: "Technology & Engineering",
              synergy_reason:
                "Bridges student's passion for cutting-edge AI with parent's preference for established engineering accreditation and high market stability.",
              fit_score: 92,
            },
            {
              name: "Data Scientist",
              domain: "Analytics & Software",
              synergy_reason:
                "Offers strong corporate hiring demand and salary security preferred by parents alongside advanced mathematical modeling favored by student.",
              fit_score: 88,
            },
            {
              name: "Robotics Engineer",
              domain: "Hardware & Intelligent Systems",
              synergy_reason:
                "Grounded in foundational mechanical and electronics engineering with high futuristic appeal in industrial automation.",
              fit_score: 85,
            },
          ],
          parent_friendly_summary:
            "Parent–Student Alignment is 95.5% (Conflict Index: 4.5/100 - High Harmony). Both parties strongly concur on high-growth STEAM foundations in Chennai. Key consensus is found in accredited technological programs such as AI Engineering and Data Science.",
          gemini_generated: false,
        });
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  if (loading || !conflict) {
    return (
      <div className="max-w-4xl mx-auto py-16 text-center space-y-4">
        <div className="w-12 h-12 border-4 border-pink-500 border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-sm text-rose-200/70">Computing Parent–Student Alignment Index...</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8 py-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-950/70 text-purple-200 text-xs font-semibold mb-2 border border-purple-700/50">
            <Scale className="w-3.5 h-3.5 text-pink-400" />
            <span>Family Alignment Engine</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white">Parent–Student Conflict Index</h1>
          <p className="text-xs text-rose-200/70">
            Transparent comparison of student career aspirations against parental financial and geographic safety boundaries.
          </p>
        </div>

        <Link
          href="/recommendations"
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white text-xs font-bold shadow-md shadow-pink-600/30 self-start sm:self-auto transition-all"
        >
          <span>View Recommended Pathways</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Main Scorecard */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Alignment Gauge Card */}
        <div className="glass-card p-6 rounded-2xl border border-pink-500/30 flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-rose-200/70 uppercase tracking-wider">
              Parent–Student Harmony
            </span>
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-pink-950/70 text-pink-300 border border-pink-800/40">
              {conflict.alignment_level}
            </span>
          </div>

          <div className="flex items-baseline gap-3">
            <span className="text-5xl font-extrabold text-pink-400">
              {conflict.alignment_score}%
            </span>
            <span className="text-xs text-rose-200/70 font-medium">Alignment Score</span>
          </div>

          <div className="w-full bg-purple-950/80 h-2.5 rounded-full overflow-hidden">
            <div
              className="bg-gradient-to-r from-pink-500 via-purple-500 to-peach-400 h-full rounded-full transition-all duration-500"
              style={{ width: `${conflict.alignment_score}%` }}
            />
          </div>

          <p className="text-xs text-rose-100/90 leading-relaxed">
            {conflict.parent_friendly_summary}
          </p>
        </div>

        {/* Conflict Index Card */}
        <div className="glass-card p-6 rounded-2xl border border-purple-500/30 flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-rose-200/70 uppercase tracking-wider">
              Quantified Friction
            </span>
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-purple-950/70 text-purple-200 border border-purple-800/40">
              Low Friction
            </span>
          </div>

          <div className="flex items-baseline gap-3">
            <span className="text-5xl font-extrabold text-purple-300">
              {conflict.conflict_index}
            </span>
            <span className="text-xs text-rose-200/70 font-medium">/ 100 Conflict Index</span>
          </div>

          <div className="w-full bg-purple-950/80 h-2.5 rounded-full overflow-hidden">
            <div
              className="bg-purple-500 h-full rounded-full transition-all duration-500"
              style={{ width: `${conflict.conflict_index}%` }}
            />
          </div>

          <div className="space-y-1">
            <span className="text-[11px] font-bold text-rose-100">Primary Consensus Factor:</span>
            <p className="text-xs text-rose-200/70">
              Unified agreement on Chennai as the preferred educational region, and moderate risk appetite.
            </p>
          </div>
        </div>
      </div>

      {/* 5-Dimensional Breakdown Table / Cards */}
      <div className="glass-card p-6 rounded-2xl border border-purple-900/40 space-y-4">
        <div className="flex items-center justify-between border-b border-purple-900/40 pb-3">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Users className="w-5 h-5 text-pink-400" />
            <span>Dimension-by-Dimension Friction Analysis</span>
          </h2>
          <span className="text-xs text-rose-200/70">5 Evaluated Pillars</span>
        </div>

        <div className="space-y-3">
          {conflict.dimension_breakdown.map((dim, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl bg-[#140822]/80 border border-purple-900/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="space-y-1 sm:w-1/4">
                <span className="text-xs font-bold text-white">{dim.dimension}</span>
                <p className="text-[10px] text-purple-300/60">Weight: {dim.weight}</p>
              </div>

              <div className="grid grid-cols-2 gap-3 sm:w-1/2 text-xs">
                <div className="p-2 rounded-lg bg-[#0f051a] border border-purple-900/40">
                  <p className="text-[10px] text-purple-300/60">Student Preference</p>
                  <p className="font-semibold text-rose-100 truncate">{dim.student_value}</p>
                </div>
                <div className="p-2 rounded-lg bg-[#0f051a] border border-purple-900/40">
                  <p className="text-[10px] text-purple-300/60">Parent Expectation</p>
                  <p className="font-semibold text-purple-300 truncate">{dim.parent_value}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 sm:w-1/4 justify-end">
                <div className="text-right">
                  <p className="text-xs font-extrabold text-peach-400">{dim.alignment_score}%</p>
                  <span className="text-[10px] text-rose-200/70">{dim.status}</span>
                </div>
                {dim.alignment_score >= 80 ? (
                  <CheckCircle2 className="w-4 h-4 text-peach-400 shrink-0" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-pink-400 shrink-0" />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Common Ground Careers (The Bridge) */}
      <div className="glass-card p-6 rounded-2xl border border-pink-500/30 space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-peach-400" />
              <span>Common Ground Careers (Bridge Pathways)</span>
            </h2>
            <p className="text-xs text-rose-200/70">
              Careers that harmonize student passion for AI/Technology with parent expectations for engineering stability.
            </p>
          </div>
          <span className="text-xs font-bold text-peach-300 bg-peach-950/70 px-2.5 py-1 rounded-full border border-peach-800/40">
            High Consensus
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {conflict.common_ground_careers.map((career, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl bg-[#140822]/80 border border-purple-900/40 space-y-3 flex flex-col justify-between"
            >
              <div className="space-y-1">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-white text-sm">{career.name}</span>
                  <span className="font-extrabold text-pink-400">{career.fit_score}% Fit</span>
                </div>
                <span className="inline-block text-[10px] text-pink-300 bg-pink-950/70 px-2 py-0.5 rounded">
                  {career.domain}
                </span>
                <p className="text-[11px] text-rose-100/90 leading-relaxed pt-1">
                  {career.synergy_reason}
                </p>
              </div>

              <Link
                href={`/roadmap/${career.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
                className="text-xs text-pink-400 hover:text-pink-300 font-semibold flex items-center gap-1 pt-2 border-t border-purple-900/40 transition-colors"
              >
                <span>Explore Roadmap</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}


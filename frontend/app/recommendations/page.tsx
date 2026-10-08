"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { 
  Award, 
  CheckCircle2, 
  ArrowRight, 
  BarChart3, 
  MapPin, 
  Users, 
  ShieldAlert,
  Sparkles
} from "lucide-react";
import { getRecommendations } from "@/lib/api";
import { RecommendationsData } from "@/types";

export default function RecommendationsPage() {
  const [data, setData] = useState<RecommendationsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"top" | "difficult">("top");

  useEffect(() => {
    async function loadData() {
      try {
        const res = await getRecommendations(1);
        setData(res);
      } catch (err) {
        console.warn("Using fallback recommendations:", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  if (loading || !data) {
    return (
      <div className="max-w-4xl mx-auto py-16 text-center space-y-4">
        <div className="w-12 h-12 border-4 border-pink-500 border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-sm text-rose-200/70">Synthesizing 5-Dimensional STEAM Recommendations...</p>
      </div>
    );
  }

  const displayedList = activeTab === "top" ? data.top_recommendations : data.financially_difficult_careers;

  return (
    <div className="max-w-5xl mx-auto space-y-8 py-4">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-950/70 text-pink-300 text-xs font-semibold mb-2 border border-pink-700/40">
            <Award className="w-3.5 h-3.5 text-pink-400" />
            <span>PRISM 5-Factor Ranking</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white">Your Top Career Pathways</h1>
          <p className="text-xs text-rose-200/70">
            Careers balanced across Student Fit (35%), Financial Fit (25%), Market Demand (20%), Parent Alignment (10%), and Geography (10%).
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/compare"
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-purple-950/40 hover:bg-purple-900/60 text-rose-100 border border-purple-800/40 text-xs font-semibold transition-all"
          >
            <BarChart3 className="w-4 h-4 text-pink-400" />
            <span>Compare Top 3</span>
          </Link>
          <Link
            href="/alignment"
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-purple-950/60 hover:bg-purple-900/60 text-purple-200 border border-purple-800/40 text-xs font-semibold transition-all"
          >
            <Users className="w-4 h-4 text-peach-400" />
            <span>Family Alignment</span>
          </Link>
        </div>
      </div>

      {/* Tabs: Feasible Recommendations vs Financially Difficult */}
      <div className="flex items-center gap-3 border-b border-purple-900/40 pb-2">
        <button
          onClick={() => setActiveTab("top")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === "top"
              ? "bg-gradient-to-r from-pink-600 to-purple-600 text-white shadow-md shadow-pink-600/30"
              : "text-rose-200/60 hover:text-white hover:bg-purple-950/40"
          }`}
        >
          <CheckCircle2 className="w-4 h-4" />
          <span>Feasible Pathways ({data.top_recommendations.length})</span>
        </button>

        <button
          onClick={() => setActiveTab("difficult")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === "difficult"
              ? "bg-rose-950 text-rose-300 border border-rose-700/50 shadow-md"
              : "text-rose-200/60 hover:text-rose-300 hover:bg-purple-950/40"
          }`}
        >
          <ShieldAlert className="w-4 h-4" />
          <span>Financially Difficult / Constrained ({data.financially_difficult_careers.length})</span>
        </button>
      </div>

      {/* Content based on Active Tab */}
      {activeTab === "difficult" && (
        <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-800/40 text-xs text-rose-200 leading-relaxed flex items-start gap-3">
          <ShieldAlert className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
          <div>
            <p className="font-bold">Hard Financial Feasibility Boundary Enforced</p>
            <p className="text-[11px] text-rose-300/80 mt-0.5">
              These trajectories exceed the family's maximum affordability ceiling (₹8,00,000) or violate parent loan preferences. 
              They are excluded from primary recommendations until secured by substantial external merit scholarships.
            </p>
          </div>
        </div>
      )}

      {/* Career Cards List */}
      <div className="space-y-6">
        {displayedList.map((career) => (
          <div
            key={career.id}
            className={`glass-card p-6 sm:p-8 rounded-2xl border transition-all ${
              career.is_financially_difficult
                ? "border-rose-900/40 hover:border-rose-600/50"
                : career.rank === 1
                ? "border-pink-500/50 shadow-xl shadow-pink-600/10 ring-1 ring-pink-500/30"
                : "border-purple-900/40 hover:border-pink-500/40"
            }`}
          >
            {/* Card Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-purple-900/40">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span
                    className={`px-2.5 py-0.5 rounded text-xs font-extrabold uppercase tracking-wider ${
                      career.is_financially_difficult
                        ? "bg-rose-950 text-rose-300 border border-rose-800"
                        : career.rank === 1
                        ? "bg-pink-600 text-white"
                        : "bg-purple-950/80 text-rose-200 border border-purple-800/40"
                    }`}
                  >
                    #{career.rank}
                  </span>
                  <span className="text-xs text-rose-200/70 font-medium">
                    {career.career_domain}
                  </span>
                  {career.rank === 1 && (
                    <span className="flex items-center gap-1 text-[11px] font-bold text-peach-300 bg-peach-950/80 px-2 py-0.5 rounded border border-peach-800/40">
                      <Sparkles className="w-3 h-3 text-peach-400" />
                      Top Recommended Fit
                    </span>
                  )}
                </div>

                <h2 className="text-2xl font-extrabold text-white">{career.career_name}</h2>
              </div>

              {/* PRISM Score Dial / Pill */}
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <div className="text-xs text-rose-200/70 font-medium">PRISM Composite Score</div>
                  <div className="text-3xl font-black gradient-text">
                    {career.prism_score}<span className="text-xs text-purple-300/60 font-normal">/100</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 5 Dimensional Score Bars */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 py-4">
              <div className="p-2.5 rounded-xl bg-[#140822]/80 border border-purple-900/40 space-y-1">
                <div className="flex justify-between text-[11px] text-rose-200/70">
                  <span>Student Fit</span>
                  <span className="font-bold text-pink-400">{career.student_fit}%</span>
                </div>
                <div className="w-full bg-purple-950/80 h-1 rounded-full overflow-hidden">
                  <div className="bg-pink-500 h-full rounded-full" style={{ width: `${career.student_fit}%` }} />
                </div>
                <span className="text-[9px] text-purple-300/60">Weight: 35%</span>
              </div>

              <div className="p-2.5 rounded-xl bg-[#140822]/80 border border-purple-900/40 space-y-1">
                <div className="flex justify-between text-[11px] text-rose-200/70">
                  <span>Financial Fit</span>
                  <span className={`font-bold ${career.is_financially_difficult ? "text-rose-400" : "text-peach-400"}`}>
                    {career.financial_fit}%
                  </span>
                </div>
                <div className="w-full bg-purple-950/80 h-1 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${career.is_financially_difficult ? "bg-rose-500" : "bg-peach-500"}`}
                    style={{ width: `${career.financial_fit}%` }}
                  />
                </div>
                <span className="text-[9px] text-purple-300/60">Weight: 25%</span>
              </div>

              <div className="p-2.5 rounded-xl bg-[#140822]/80 border border-purple-900/40 space-y-1">
                <div className="flex justify-between text-[11px] text-rose-200/70">
                  <span>Market Fit</span>
                  <span className="font-bold text-purple-300">{career.market_fit}%</span>
                </div>
                <div className="w-full bg-purple-950/80 h-1 rounded-full overflow-hidden">
                  <div className="bg-purple-500 h-full rounded-full" style={{ width: `${career.market_fit}%` }} />
                </div>
                <span className="text-[9px] text-purple-300/60">Weight: 20%</span>
              </div>

              <div className="p-2.5 rounded-xl bg-[#140822]/80 border border-purple-900/40 space-y-1">
                <div className="flex justify-between text-[11px] text-rose-200/70">
                  <span>Parent Align</span>
                  <span className="font-bold text-rose-300">{career.parent_alignment}%</span>
                </div>
                <div className="w-full bg-purple-950/80 h-1 rounded-full overflow-hidden">
                  <div className="bg-rose-400 h-full rounded-full" style={{ width: `${career.parent_alignment}%` }} />
                </div>
                <span className="text-[9px] text-purple-300/60">Weight: 10%</span>
              </div>

              <div className="p-2.5 rounded-xl bg-[#140822]/80 border border-purple-900/40 space-y-1 col-span-2 sm:col-span-1">
                <div className="flex justify-between text-[11px] text-rose-200/70">
                  <span>Geographic Fit</span>
                  <span className="font-bold text-peach-300">{career.geographic_fit}%</span>
                </div>
                <div className="w-full bg-purple-950/80 h-1 rounded-full overflow-hidden">
                  <div className="bg-peach-400 h-full rounded-full" style={{ width: `${career.geographic_fit}%` }} />
                </div>
                <span className="text-[9px] text-purple-300/60">Weight: 10%</span>
              </div>
            </div>

            {/* Why This Career Box */}
            <div className="space-y-3 pt-2">
              <h4 className="text-xs font-bold text-rose-200 uppercase tracking-wider">
                Why this career pathway?
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
                {career.reasons?.map((r, rIdx) => (
                  <div
                    key={rIdx}
                    className="p-2.5 rounded-lg bg-[#140822]/80 border border-purple-900/40 flex items-center gap-2 text-rose-100"
                  >
                    <CheckCircle2 className="w-4 h-4 text-pink-400 shrink-0" />
                    <span>{r}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Financial Overview Tag */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-4 mt-4 border-t border-purple-900/40 text-xs">
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-rose-200/70">
                  Tuition: <strong className="text-white">₹{Number(career.education_cost).toLocaleString("en-IN")}</strong>
                </span>
                <span className="text-rose-200/70">
                  Starting Salary: <strong className="text-peach-400">₹{(career.avg_starting_salary / 100000).toFixed(1)} LPA</strong>
                </span>
                <span className={`px-2 py-0.5 rounded text-[11px] font-semibold ${
                  career.is_financially_difficult
                    ? "bg-rose-950 text-rose-300 border border-rose-800"
                    : "bg-pink-950/70 text-pink-300 border border-pink-800/40"
                }`}>
                  {career.financial_status}
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                <Link
                  href={`/compare?c1=${career.slug}`}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#140822] hover:bg-purple-950/60 text-rose-200 border border-purple-800/40 text-xs font-medium transition-colors"
                >
                  <BarChart3 className="w-3.5 h-3.5" />
                  <span>Compare</span>
                </Link>

                <Link
                  href="/opportunities"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#140822] hover:bg-purple-950/60 text-rose-200 border border-purple-800/40 text-xs font-medium transition-colors"
                >
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Opportunities</span>
                </Link>

                <Link
                  href={`/roadmap/${career.slug}`}
                  className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white text-xs font-bold shadow-md shadow-pink-600/30 transition-all"
                >
                  <span>View Roadmap</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


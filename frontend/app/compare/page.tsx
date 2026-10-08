"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { 
  BarChart3, 
  ArrowRight, 
  Scale, 
  ArrowLeft 
} from "lucide-react";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Legend 
} from "recharts";
import { getRecommendations } from "@/lib/api";
import { RecommendationItem } from "@/types";
import { useTheme } from "@/lib/theme-context";

export default function ComparePage() {
  const { theme } = useTheme();
  const isWhite = theme === "white";
  const [allCareers, setAllCareers] = useState<RecommendationItem[]>([]);
  const [selectedIds, setSelectedIds] = useState<number[]>([1, 2, 3]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const recs = await getRecommendations(1);
        const combined = [...recs.top_recommendations, ...recs.financially_difficult_careers];
        setAllCareers(combined);
      } catch (err) {
        console.warn("Using fallback comparison data:", err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading && allCareers.length === 0) {
    return (
      <div className="max-w-4xl mx-auto py-16 text-center space-y-4">
        <div className="w-12 h-12 border-4 border-pink-500 border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-sm text-rose-200/70">Loading Comparative Benchmark Matrix...</p>
      </div>
    );
  }

  const selectedCareers = allCareers.filter((c) => selectedIds.includes(c.id)).slice(0, 3);

  // Transform data for Recharts Bar Chart
  const chartData = [
    {
      metric: "Student Fit",
      ...Object.fromEntries(selectedCareers.map((c) => [c.career_name, c.student_fit])),
    },
    {
      metric: "Financial Fit",
      ...Object.fromEntries(selectedCareers.map((c) => [c.career_name, c.financial_fit])),
    },
    {
      metric: "Market Fit",
      ...Object.fromEntries(selectedCareers.map((c) => [c.career_name, c.market_fit])),
    },
    {
      metric: "Parent Align",
      ...Object.fromEntries(selectedCareers.map((c) => [c.career_name, c.parent_alignment])),
    },
    {
      metric: "Geographic",
      ...Object.fromEntries(selectedCareers.map((c) => [c.career_name, c.geographic_fit])),
    },
  ];

  const colors = ["#ec4899", "#fb923c", "#a855f7"];

  const toggleSelect = (id: number) => {
    if (selectedIds.includes(id)) {
      if (selectedIds.length > 2) {
        setSelectedIds(selectedIds.filter((item) => item !== id));
      }
    } else {
      if (selectedIds.length < 3) {
        setSelectedIds([...selectedIds, id]);
      } else {
        setSelectedIds([selectedIds[1], selectedIds[2], id]);
      }
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 py-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-950/70 text-pink-300 text-xs font-semibold mb-2 border border-pink-700/40">
            <BarChart3 className="w-3.5 h-3.5 text-pink-400" />
            <span>Multi-Factor Benchmark</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white">Side-by-Side Career Comparison</h1>
          <p className="text-xs text-rose-200/70">
            Compare 2 to 3 career pathways across student aptitude, tuition strain, market demand, and starting salary.
          </p>
        </div>

        <Link
          href="/recommendations"
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-purple-950/60 hover:bg-purple-900/60 text-purple-200 border border-purple-800/40 text-xs font-semibold self-start sm:self-auto transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Top Matches</span>
        </Link>
      </div>

      {/* Career Picker Pills */}
      <div className="space-y-2">
        <label className="text-xs font-semibold text-rose-200">
          Select Careers to Compare (Max 3 Selected):
        </label>
        <div className="flex flex-wrap gap-2">
          {allCareers.map((c) => {
            const isSelected = selectedIds.includes(c.id);
            return (
              <button
                key={c.id}
                onClick={() => toggleSelect(c.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                  isSelected
                    ? "bg-gradient-to-r from-pink-600 to-purple-600 border-pink-500 text-white shadow-md shadow-pink-600/30"
                    : "bg-[#140822]/80 border-purple-900/40 text-rose-200/70 hover:border-pink-500/50 hover:text-white"
                }`}
              >
                {c.career_name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Recharts Bar Chart Comparison */}
      <div className="glass-card p-6 rounded-2xl border border-purple-900/40 space-y-4">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <Scale className="w-4 h-4 text-pink-400" />
          <span>Comparative Score Radar & Distribution (0 - 100)</span>
        </h3>

        <div className="h-[320px] w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 20, right: 30, left: -10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={isWhite ? "#fce7f3" : "#3b1b36"} />
              <XAxis
                dataKey="metric"
                stroke={isWhite ? "#db2777" : "#fda4af"}
                tick={{ fill: isWhite ? "#3b0764" : "#fbcfe8", fontSize: 11, fontWeight: isWhite ? 600 : 400 }}
              />
              <YAxis
                domain={[0, 100]}
                stroke={isWhite ? "#db2777" : "#fda4af"}
                tick={{ fill: isWhite ? "#3b0764" : "#fbcfe8", fontSize: 11, fontWeight: isWhite ? 600 : 400 }}
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
              <Legend wrapperStyle={{ fontSize: "11px", paddingTop: "10px" }} />
              {selectedCareers.map((c, idx) => (
                <Bar key={c.career_name} dataKey={c.career_name} fill={colors[idx % colors.length]} radius={[4, 4, 0, 0]} />
              ))}
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Comparison Matrix Table */}
      <div className="glass-card rounded-2xl border border-purple-900/40 overflow-hidden">
        <div className="p-4 bg-purple-950/60 border-b border-purple-900/40">
          <h3 className="text-sm font-bold text-white">Comprehensive Matrix Breakdown</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-[#12071d] text-rose-200/70 border-b border-purple-900/40">
              <tr>
                <th className="py-3 px-4 font-semibold">Dimension / Metric</th>
                {selectedCareers.map((c) => (
                  <th key={c.id} className="py-3 px-4 font-bold text-white">
                    {c.career_name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-purple-900/40 text-rose-100">
              <tr>
                <td className="py-3 px-4 font-semibold text-rose-200/70">PRISM Composite Score</td>
                {selectedCareers.map((c) => (
                  <td key={c.id} className="py-3 px-4 font-black text-pink-400 text-sm">
                    {c.prism_score}/100
                  </td>
                ))}
              </tr>
              <tr>
                <td className="py-3 px-4 font-semibold text-rose-200/70">Student Aptitude & Skills Fit</td>
                {selectedCareers.map((c) => (
                  <td key={c.id} className="py-3 px-4 font-semibold">
                    {c.student_fit}%
                  </td>
                ))}
              </tr>
              <tr>
                <td className="py-3 px-4 font-semibold text-rose-200/70">Financial Feasibility Status</td>
                {selectedCareers.map((c) => (
                  <td key={c.id} className="py-3 px-4">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        c.is_financially_difficult
                          ? "bg-rose-950 text-rose-300 border border-rose-800"
                          : "bg-peach-950/80 text-peach-300 border border-peach-800/40"
                      }`}
                    >
                      {c.financial_status}
                    </span>
                  </td>
                ))}
              </tr>
              <tr>
                <td className="py-3 px-4 font-semibold text-rose-200/70">Degree Education Cost</td>
                {selectedCareers.map((c) => (
                  <td key={c.id} className="py-3 px-4 font-semibold text-white">
                    ₹{Number(c.education_cost).toLocaleString("en-IN")}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="py-3 px-4 font-semibold text-rose-200/70">Estimated Entry Salary</td>
                {selectedCareers.map((c) => (
                  <td key={c.id} className="py-3 px-4 font-bold text-peach-400">
                    ₹{(c.avg_starting_salary / 100000).toFixed(1)} LPA
                  </td>
                ))}
              </tr>
              <tr>
                <td className="py-3 px-4 font-semibold text-rose-200/70">Market Hiring Demand</td>
                {selectedCareers.map((c) => (
                  <td key={c.id} className="py-3 px-4 font-semibold text-purple-300">
                    {c.market_fit}/100
                  </td>
                ))}
              </tr>
              <tr>
                <td className="py-3 px-4 font-semibold text-rose-200/70">Parent Expectation Alignment</td>
                {selectedCareers.map((c) => (
                  <td key={c.id} className="py-3 px-4 font-semibold text-rose-300">
                    {c.parent_alignment}%
                  </td>
                ))}
              </tr>
              <tr>
                <td className="py-3 px-4 font-semibold text-rose-200/70">Geographic Availability (Chennai)</td>
                {selectedCareers.map((c) => (
                  <td key={c.id} className="py-3 px-4 font-semibold text-peach-300">
                    {c.geographic_fit}%
                  </td>
                ))}
              </tr>
              <tr>
                <td className="py-3 px-4 font-semibold text-rose-200/70">Action Roadmap</td>
                {selectedCareers.map((c) => (
                  <td key={c.id} className="py-3 px-4">
                    <Link
                      href={`/roadmap/${c.slug}`}
                      className="text-xs text-pink-400 hover:text-pink-300 font-semibold flex items-center gap-1 transition-colors"
                    >
                      <span>View Steps</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}


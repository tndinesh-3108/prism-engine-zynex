"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  Sliders, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles, 
  MapPin, 
  Cpu
} from "lucide-react";
import { useStudentParentFlow } from "@/lib/student-parent-flow";

export default function ParentConstraintsPage() {
  const router = useRouter();
  const { 
    parentParameters, 
    selectedCourse, 
    approveParentFinancials
  } = useStudentParentFlow();

  const [annualBudget, setAnnualBudget] = useState(parentParameters.annualBudget || 600000);
  const [degreeCeiling, setDegreeCeiling] = useState(parentParameters.degreeCeiling || 2400000);
  const [loanTolerance, setLoanTolerance] = useState<"None" | "Low" | "Moderate" | "High">(
    parentParameters.loanTolerance || "Low"
  );
  const [geographyPreference, setGeographyPreference] = useState(
    parentParameters.geographyPreference || "Regional Tech Hubs (Chennai & Bengaluru)"
  );
  const [isSynthesizing, setIsSynthesizing] = useState(false);

  // Live calculation based on current sliders
  const sampleAnnualFee = selectedCourse.annualFee || 450000;
  const sampleTotal4Year = selectedCourse.total4YearFee || 1800000;
  const coveragePercent = Math.min(100, Math.round((degreeCeiling / sampleTotal4Year) * 100));
  const loanRequired = Math.max(0, sampleTotal4Year - degreeCeiling);
  const annualSurplus = annualBudget - sampleAnnualFee;
  const isComfortable = degreeCeiling >= sampleTotal4Year;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSynthesizing(true);

    approveParentFinancials({
      annualBudget,
      degreeCeiling,
      loanTolerance,
      geographyPreference,
    });

    setTimeout(() => {
      setIsSynthesizing(false);
      router.push("/parent/dashboard");
    }, 800);
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 space-y-8">
      {/* Flow Navigation Banner */}
      <div className="flex items-center justify-between text-xs text-rose-300/80 bg-purple-950/40 p-3 rounded-xl border border-purple-800/40">
        <Link href="/parent/sync" className="flex items-center gap-2 hover:text-white transition-colors">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>1. Family Sync (Linked)</span>
        </Link>
        <ArrowRight className="w-3.5 h-3.5 text-purple-400" />
        <div className="flex items-center gap-2">
          <span className="w-5 h-5 rounded-full bg-pink-500 text-white flex items-center justify-center font-bold text-[11px]">2</span>
          <span className="font-bold text-white">Financial Constraints</span>
        </div>
        <ArrowRight className="w-3.5 h-3.5 text-purple-400" />
        <div className="flex items-center gap-2 opacity-60">
          <span className="w-5 h-5 rounded-full bg-purple-900 text-purple-300 flex items-center justify-center font-bold text-[11px]">3</span>
          <span>Parent Dashboard</span>
        </div>
      </div>

      {/* Main Grid: Sliders & Live PRISM Engine Feasibility */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Form: Sliders */}
        <div className="lg:col-span-7 glass-card p-6 sm:p-8 rounded-3xl border border-purple-500/30 space-y-6">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-950/80 text-purple-200 text-xs font-semibold border border-purple-700/50">
              <Sliders className="w-3.5 h-3.5 text-pink-400" />
              <span>Boundary Parameters</span>
            </div>
            <h1 className="text-2xl font-extrabold text-white">
              Parent Financial Boundaries
            </h1>
            <p className="text-xs text-rose-200/70">
              Set your annual affordability and borrowing comfort to shape Arun's career ranking.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Slider 1: Annual Budget */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-xs font-semibold text-rose-200">
                  Annual Education Budget
                </label>
                <span className="text-sm font-extrabold text-pink-400 font-mono">
                  ₹{(annualBudget / 100000).toFixed(1)} Lakhs / year
                </span>
              </div>
              <input
                type="range"
                min="200000"
                max="1500000"
                step="50000"
                value={annualBudget}
                onChange={(e) => setAnnualBudget(Number(e.target.value))}
                className="w-full accent-pink-500 h-2 bg-purple-950 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-rose-300/60 font-mono">
                <span>₹2.0L</span>
                <span>₹8.0L</span>
                <span>₹15.0L</span>
              </div>
            </div>

            {/* Slider 2: 4-Year Degree Maximum Ceiling */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-xs font-semibold text-rose-200">
                  4-Year Total Degree Ceiling
                </label>
                <span className="text-sm font-extrabold text-purple-300 font-mono">
                  ₹{(degreeCeiling / 100000).toFixed(1)} Lakhs total
                </span>
              </div>
              <input
                type="range"
                min="600000"
                max="4000000"
                step="100000"
                value={degreeCeiling}
                onChange={(e) => setDegreeCeiling(Number(e.target.value))}
                className="w-full accent-purple-500 h-2 bg-purple-950 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-rose-300/60 font-mono">
                <span>₹6.0L</span>
                <span>₹20.0L</span>
                <span>₹40.0L</span>
              </div>
            </div>

            {/* Loan Tolerance Selector */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-rose-200">
                Education Loan Tolerance
              </label>
              <div className="grid grid-cols-4 gap-2">
                {(["None", "Low", "Moderate", "High"] as const).map((lvl) => (
                  <button
                    key={lvl}
                    type="button"
                    onClick={() => setLoanTolerance(lvl)}
                    className={`py-2 px-1 rounded-xl text-xs font-bold transition-all border ${
                      loanTolerance === lvl
                        ? "bg-gradient-to-r from-pink-600 to-purple-600 text-white border-pink-400 shadow-md shadow-pink-600/30"
                        : "bg-purple-950/40 text-purple-200/80 border-purple-800/40 hover:bg-purple-900/50"
                    }`}
                  >
                    {lvl}
                  </button>
                ))}
              </div>
            </div>

            {/* Geography Selector */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-rose-200 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-peach-400" />
                <span>Geographic Relocation Preference</span>
              </label>
              <select
                value={geographyPreference}
                onChange={(e) => setGeographyPreference(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-purple-950/60 border border-purple-700/50 text-white text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-pink-500"
              >
                <option value="Regional Tech Hubs (Chennai & Bengaluru)">
                  Regional Tech Hubs (Chennai & Bengaluru)
                </option>
                <option value="Tamil Nadu State Only">Tamil Nadu State Only</option>
                <option value="Pan-India Premier Institutes (IITs/NITs/BITS)">
                  Pan-India Premier Institutes (IITs/NITs/BITS)
                </option>
                <option value="International Undergraduate Pathways">
                  International Undergraduate Pathways
                </option>
              </select>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSynthesizing}
              className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-pink-600 via-rose-500 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white font-bold text-sm shadow-lg shadow-pink-600/30 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
            >
              {isSynthesizing ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Computing Multi-Objective PRISM Optimization...</span>
                </>
              ) : (
                <>
                  <Cpu className="w-4 h-4 text-peach-200" />
                  <span>Feed PRISM Core Engine & Open Parent Dashboard</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        </div>

        {/* Right Card: Live PRISM Engine Feasibility Simulation */}
        <div className="lg:col-span-5 space-y-4">
          <div className="glass-card p-6 rounded-3xl border border-peach-500/30 space-y-5">
            <div className="flex items-center justify-between border-b border-purple-900/40 pb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-peach-400" />
                <h3 className="text-sm font-extrabold text-white">
                  Live PRISM Feasibility
                </h3>
              </div>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                isComfortable 
                  ? "bg-emerald-950 text-emerald-300 border-emerald-500/50" 
                  : "bg-rose-950 text-rose-300 border-rose-500/50"
              }`}>
                {isComfortable ? "✓ Highly Feasible" : "⚠️ Funding Gap"}
              </span>
            </div>

            {/* Selected Target Course Preview */}
            <div className="p-3.5 rounded-2xl bg-purple-950/40 border border-purple-800/40 space-y-1.5">
              <span className="text-[10px] uppercase font-bold text-rose-300/70 tracking-wider">
                Student's Preferred Degree Target
              </span>
              <p className="text-xs font-bold text-white">
                {selectedCourse.title}
              </p>
              <div className="flex items-center justify-between text-[11px] text-rose-200/80 pt-1">
                <span>Total 4-Yr Degree Cost:</span>
                <span className="font-extrabold text-pink-300 font-mono">
                  ₹{(sampleTotal4Year / 100000).toFixed(2)} Lakhs
                </span>
              </div>
            </div>

            {/* Coverage Meter */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="text-rose-200/80 font-medium">Degree Cost Covered by Ceiling</span>
                <span className="font-bold text-white font-mono">{coveragePercent}%</span>
              </div>
              <div className="w-full bg-purple-950 h-2.5 rounded-full overflow-hidden border border-purple-800/40">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    coveragePercent >= 100 ? "bg-emerald-500" : coveragePercent >= 75 ? "bg-peach-500" : "bg-pink-500"
                  }`}
                  style={{ width: `${coveragePercent}%` }}
                />
              </div>
            </div>

            {/* Key Metric Gauges */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="p-3 rounded-xl bg-purple-950/50 border border-purple-800/40 space-y-1">
                <span className="text-[10px] text-rose-300/70">Annual Buffer</span>
                <p className={`text-base font-extrabold font-mono ${annualSurplus >= 0 ? "text-emerald-400" : "text-rose-400"}`}>
                  {annualSurplus >= 0 ? `+₹${(annualSurplus / 1000).toFixed(0)}k` : `-₹${(Math.abs(annualSurplus) / 1000).toFixed(0)}k`}
                </p>
                <p className="text-[9px] text-rose-300/60">Per year vs ₹{(annualBudget / 100000).toFixed(1)}L</p>
              </div>

              <div className="p-3 rounded-xl bg-purple-950/50 border border-purple-800/40 space-y-1">
                <span className="text-[10px] text-rose-300/70">Loan Requirement</span>
                <p className="text-base font-extrabold font-mono text-purple-300">
                  {loanRequired === 0 ? "₹0 (Debt Free)" : `₹${(loanRequired / 100000).toFixed(1)}L`}
                </p>
                <p className="text-[9px] text-rose-300/60">Risk: {loanTolerance}</p>
              </div>
            </div>

            {/* Mathematical Engine Note */}
            <div className="p-3 rounded-xl bg-pink-950/30 border border-pink-700/30 text-[11px] text-rose-200/80 leading-relaxed">
              💡 <strong>Engine Rule:</strong> PRISM algorithm guarantees that high-package careers (#1 AI / ML Engineer) are only ranked in Arun's Safe/Match list when family loan exposure falls strictly within your selected tolerance.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

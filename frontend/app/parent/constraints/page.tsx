"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  Sliders, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles, 
  MapPin
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
    }, 600);
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 space-y-6">
      {/* Header */}
      <div className="space-y-1">
        <h1 className="text-2xl sm:text-3xl font-bold text-white">
          Financial Boundaries
        </h1>
        <p className="text-sm text-rose-200/70">
          Set annual affordability and borrowing comfort for Arun Kumar.
        </p>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Sliders Form */}
        <div className="lg:col-span-7 glass-card p-6 rounded-2xl border border-purple-500/30 space-y-5">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Slider 1: Annual Budget */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-sm font-semibold text-rose-200">
                  Annual Budget
                </label>
                <span className="text-sm font-bold text-pink-400 font-mono">
                  ₹{(annualBudget / 100000).toFixed(1)}L / year
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
              <div className="flex justify-between text-xs text-rose-300/60 font-mono">
                <span>₹2.0L</span>
                <span>₹8.0L</span>
                <span>₹15.0L</span>
              </div>
            </div>

            {/* Slider 2: 4-Year Degree Ceiling */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-sm font-semibold text-rose-200">
                  4-Year Total Ceiling
                </label>
                <span className="text-sm font-bold text-purple-300 font-mono">
                  ₹{(degreeCeiling / 100000).toFixed(1)}L Total
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
              <div className="flex justify-between text-xs text-rose-300/60 font-mono">
                <span>₹6.0L</span>
                <span>₹20.0L</span>
                <span>₹40.0L</span>
              </div>
            </div>

            {/* Loan Tolerance Selector */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-rose-200">
                Loan Tolerance
              </label>
              <div className="grid grid-cols-4 gap-2">
                {(["None", "Low", "Moderate", "High"] as const).map((lvl) => (
                  <button
                    key={lvl}
                    type="button"
                    onClick={() => setLoanTolerance(lvl)}
                    className={`py-2 px-1 rounded-xl text-xs font-semibold border transition-all ${
                      loanTolerance === lvl
                        ? "bg-pink-600 text-white border-pink-400"
                        : "bg-purple-950/40 text-purple-200/80 border-purple-800/40 hover:bg-purple-900/50"
                    }`}
                  >
                    {lvl}
                  </button>
                ))}
              </div>
            </div>

            {/* Geography Selector */}
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-rose-200 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-peach-400" />
                <span>Location Preference</span>
              </label>
              <select
                value={geographyPreference}
                onChange={(e) => setGeographyPreference(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-purple-950/60 border border-purple-700/50 text-white text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-pink-500"
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
              className="w-full py-3 px-6 rounded-xl bg-pink-600 hover:bg-pink-500 text-white font-bold text-sm shadow flex items-center justify-center gap-2 transition-all disabled:opacity-50"
            >
              {isSynthesizing ? (
                <span>Saving...</span>
              ) : (
                <>
                  <span>Save & Open Dashboard</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        </div>

        {/* Right Summary */}
        <div className="lg:col-span-5 space-y-4">
          <div className="glass-card p-6 rounded-2xl border border-peach-500/20 space-y-4">
            <div className="flex items-center justify-between border-b border-purple-900/40 pb-2.5">
              <h3 className="text-base font-bold text-white">
                Feasibility Summary
              </h3>
              <span className={`text-xs font-bold px-2 py-0.5 rounded-full border ${
                isComfortable 
                  ? "bg-emerald-950 text-emerald-300 border-emerald-500/50" 
                  : "bg-rose-950 text-rose-300 border-rose-500/50"
              }`}>
                {isComfortable ? "✓ Feasible" : "⚠️ Deficit"}
              </span>
            </div>

            {/* Preferred Degree */}
            <div className="p-3 rounded-xl bg-purple-950/40 border border-purple-800/40 space-y-1">
              <span className="text-xs text-rose-300/70 block">Target Degree</span>
              <p className="text-sm font-bold text-white">{selectedCourse.title}</p>
              <div className="flex justify-between text-xs text-rose-200/80 pt-0.5">
                <span>Total Cost:</span>
                <span className="font-bold text-pink-300 font-mono">
                  ₹{(sampleTotal4Year / 100000).toFixed(1)}L
                </span>
              </div>
            </div>

            {/* Meter */}
            <div className="space-y-1">
              <div className="flex justify-between items-center text-xs">
                <span className="text-rose-200/80">Coverage</span>
                <span className="font-bold text-white font-mono">{coveragePercent}%</span>
              </div>
              <div className="w-full bg-purple-950 h-2 rounded-full overflow-hidden border border-purple-800/40">
                <div
                  className={`h-full rounded-full transition-all ${
                    coveragePercent >= 100 ? "bg-emerald-500" : "bg-pink-500"
                  }`}
                  style={{ width: `${coveragePercent}%` }}
                />
              </div>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-2 gap-3 pt-1">
              <div className="p-3 rounded-xl bg-purple-950/50 border border-purple-800/40 text-center">
                <span className="text-xs text-rose-300/70 block">Annual Buffer</span>
                <p className={`text-base font-bold font-mono ${annualSurplus >= 0 ? "text-emerald-400" : "text-rose-400"}`}>
                  {annualSurplus >= 0 ? `+₹${(annualSurplus / 1000).toFixed(0)}k` : `-₹${(Math.abs(annualSurplus) / 1000).toFixed(0)}k`}
                </p>
              </div>

              <div className="p-3 rounded-xl bg-purple-950/50 border border-purple-800/40 text-center">
                <span className="text-xs text-rose-300/70 block">Loan Needed</span>
                <p className="text-base font-bold font-mono text-purple-300">
                  {loanRequired === 0 ? "₹0" : `₹${(loanRequired / 100000).toFixed(1)}L`}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { 
  ArrowRight, 
  MapPin,
  Wallet,
  ShieldCheck,
  GraduationCap,
  Sparkles,
  AlertTriangle,
  CheckCircle2,
  XCircle
} from "lucide-react";
import { useStudentParentFlow } from "@/lib/student-parent-flow";

export default function ParentConstraintsPage() {
  const router = useRouter();
  const { 
    parentParameters, 
    selectedCourse, 
    approveParentFinancials
  } = useStudentParentFlow();

  // Primary Inputs requested by User:
  // 1. Parent Annual Income
  // 2. Fees Can Be Paid Per Year (Slider)
  const [parentAnnualIncome, setParentAnnualIncome] = useState(
    parentParameters.parentAnnualIncome || 1000000
  );
  const [feesCanBePaidPerYear, setFeesCanBePaidPerYear] = useState(
    parentParameters.feesCanBePaidPerYear || 400000
  );
  const [loanTolerance, setLoanTolerance] = useState<"None" | "Low" | "Moderate" | "High">(
    parentParameters.loanTolerance || "Low"
  );
  const [geographyPreference, setGeographyPreference] = useState(
    parentParameters.geographyPreference || "Regional Tech Hubs (Chennai & Bengaluru)"
  );
  const [isSaving, setIsSaving] = useState(false);

  // Selected Course Tuition
  const studentAnnualFee = selectedCourse.annualFee || 350000;
  const studentTotal4Year = selectedCourse.total4YearFee || studentAnnualFee * 4;

  // 4-Year Payable Calculation: Payment per year * 4
  const total4YearPayable = feesCanBePaidPerYear * 4;
  const coveragePercent = Math.min(100, Math.round((total4YearPayable / studentTotal4Year) * 100));
  const loanNeeded = Math.max(0, studentTotal4Year - total4YearPayable);
  const annualBuffer = feesCanBePaidPerYear - studentAnnualFee;

  // 3-Tier Affordability Evaluation Rule:
  // 1. student fee > annual income -> Avoid
  // 2. at margin of annual income (>= 70%) -> Critical & Not Safe
  // 3. student fee < annual income (< 70%) -> OK (Safe & Affordable)
  const feeToIncomeRatio = studentAnnualFee / Math.max(parentAnnualIncome, 1);
  const isExceeded = studentAnnualFee > parentAnnualIncome;
  const isCritical = !isExceeded && feeToIncomeRatio >= 0.7;
  const isSafe = !isExceeded && !isCritical;

  let affordabilityLabel = "OK (Safe & Affordable)";
  let affordabilityDesc = "Student fees are comfortably within parent annual income.";
  let badgeClasses = "bg-emerald-950/80 text-emerald-300 border-emerald-500/50";

  if (isExceeded) {
    affordabilityLabel = "Course Should Be Avoided";
    affordabilityDesc = "Student fees exceed total parent annual income. Unsustainable financial risk.";
    badgeClasses = "bg-rose-950/90 text-rose-300 border-rose-500/50";
  } else if (isCritical) {
    affordabilityLabel = "Critical & Not Safe";
    affordabilityDesc = "Student fees consume 70% or more of annual income. High financial strain.";
    badgeClasses = "bg-amber-950/90 text-amber-300 border-amber-500/50";
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    approveParentFinancials({
      parentAnnualIncome,
      feesCanBePaidPerYear,
      loanTolerance,
      geographyPreference,
    });

    setTimeout(() => {
      setIsSaving(false);
      router.push("/parent/dashboard");
    }, 500);
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 space-y-6">
      {/* Header */}
      <div className="space-y-1">
        <h1 className="text-2xl sm:text-3xl font-bold text-white">
          Parent Financial Setup
        </h1>
        <p className="text-sm text-rose-200/70">
          Enter annual income and student fee capacity to evaluate course affordability.
        </p>
      </div>

      {/* Target Degree Info Banner */}
      <div className="p-4 rounded-2xl bg-[#140822] border border-purple-800/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-pink-500/20 text-pink-300 flex items-center justify-center shrink-0 border border-pink-500/30">
            <GraduationCap className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] text-rose-300/70 uppercase font-semibold block">Target Degree</span>
            <strong className="text-sm text-white font-bold">{selectedCourse.title}</strong>
          </div>
        </div>
        <div className="flex items-center gap-4 text-left sm:text-right">
          <div>
            <span className="text-[10px] text-rose-300/70 block">Annual Tuition</span>
            <strong className="text-sm text-pink-300 font-mono">₹{studentAnnualFee.toLocaleString("en-IN")}/yr</strong>
          </div>
          <div>
            <span className="text-[10px] text-rose-300/70 block">4-Year Total</span>
            <strong className="text-sm text-white font-mono">₹{studentTotal4Year.toLocaleString("en-IN")}</strong>
          </div>
        </div>
      </div>

      {/* Live Affordability Status Alert Banner */}
      <div className={`p-4 rounded-2xl border flex items-center justify-between gap-3 ${
        isSafe 
          ? "bg-emerald-950/40 border-emerald-500/40" 
          : isCritical 
          ? "bg-amber-950/40 border-amber-500/40" 
          : "bg-rose-950/40 border-rose-500/40"
      }`}>
        <div className="flex items-center gap-3">
          {isSafe && <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0" />}
          {isCritical && <AlertTriangle className="w-6 h-6 text-amber-400 shrink-0" />}
          {isExceeded && <XCircle className="w-6 h-6 text-rose-400 shrink-0" />}
          <div>
            <div className="flex items-center gap-2">
              <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${badgeClasses}`}>
                {affordabilityLabel}
              </span>
              <span className="text-xs text-rose-200/80 font-mono">
                Ratio: {Math.round(feeToIncomeRatio * 100)}% of Annual Income
              </span>
            </div>
            <p className="text-xs text-rose-200/90 mt-1">
              {affordabilityDesc}
            </p>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Controls Form */}
        <div className="lg:col-span-7 glass-card p-6 rounded-2xl border border-purple-500/30 space-y-5">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* 1. Parent Annual Income */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <label className="text-sm font-semibold text-rose-100 flex items-center gap-1.5">
                  <Wallet className="w-4 h-4 text-pink-400" />
                  <span>Parent Annual Income</span>
                </label>
                <span className="font-bold text-pink-300 bg-pink-950/80 px-2.5 py-1 rounded-lg border border-pink-700/50 text-xs font-mono">
                  ₹{Number(parentAnnualIncome).toLocaleString("en-IN")} / yr
                </span>
              </div>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-rose-300/60 font-bold text-sm">₹</span>
                <input
                  type="number"
                  min="100000"
                  max="5000000"
                  step="50000"
                  value={parentAnnualIncome}
                  onChange={(e) => setParentAnnualIncome(Math.max(0, Number(e.target.value)))}
                  className="w-full pl-8 pr-3 py-2.5 rounded-xl bg-purple-950/60 border border-purple-700/50 text-white text-sm font-mono focus:outline-none focus:ring-2 focus:ring-pink-500"
                  placeholder="1000000"
                />
              </div>
              <div className="flex items-center gap-1.5 flex-wrap pt-0.5">
                <span className="text-[10px] text-rose-300/60 font-semibold mr-1">Quick Select:</span>
                {[600000, 1000000, 1500000, 2500000].map((inc) => (
                  <button
                    key={inc}
                    type="button"
                    onClick={() => setParentAnnualIncome(inc)}
                    className={`text-[10px] font-semibold px-2 py-0.5 rounded-lg border transition-all ${
                      parentAnnualIncome === inc
                        ? "bg-pink-600 text-white border-pink-400"
                        : "bg-purple-950/40 text-rose-200 border-purple-800/40 hover:bg-purple-900/50"
                    }`}
                  >
                    ₹{(inc / 100000).toFixed(0)}L
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Fees Can Be Paid Per Year (Slider) */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <label className="text-sm font-semibold text-rose-100 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-peach-400" />
                  <span>Fees Can Be Paid (Per Year)</span>
                </label>
                <span className="font-bold text-peach-300 bg-peach-950/80 px-2.5 py-1 rounded-lg border border-peach-700/50 text-xs font-mono">
                  ₹{Number(feesCanBePaidPerYear).toLocaleString("en-IN")} / yr
                </span>
              </div>
              <input
                type="range"
                min="50000"
                max="2000000"
                step="25000"
                value={feesCanBePaidPerYear}
                onChange={(e) => setFeesCanBePaidPerYear(Number(e.target.value))}
                className="w-full accent-peach-500 h-2 bg-purple-950 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-xs text-rose-300/60 font-mono">
                <span>₹50k/yr</span>
                <span>₹5.0L/yr</span>
                <span>₹10.0L/yr</span>
                <span>₹20.0L/yr</span>
              </div>
            </div>

            {/* 3. Payment * 4 Years Display Card */}
            <div className="p-3.5 rounded-xl bg-purple-950/50 border border-purple-800/40 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-rose-200/90 block">
                  4-Year Total Payment (Payment × 4 Years)
                </span>
                <span className="text-[11px] text-rose-300/60 font-mono">
                  ₹{feesCanBePaidPerYear.toLocaleString("en-IN")} × 4 Years
                </span>
              </div>
              <span className="text-lg font-black text-peach-300 font-mono">
                ₹{total4YearPayable.toLocaleString("en-IN")}
              </span>
            </div>

            {/* Loan Tolerance Selector */}
            <div className="space-y-1.5">
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
              disabled={isSaving}
              className="w-full py-3 px-6 rounded-xl bg-pink-600 hover:bg-pink-500 text-white font-bold text-sm shadow flex items-center justify-center gap-2 transition-all disabled:opacity-50"
            >
              {isSaving ? (
                <span>Saving Financial Parameters...</span>
              ) : (
                <>
                  <span>Save & Open Parent Dashboard</span>
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
              <h3 className="text-base font-bold text-white flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-peach-400" />
                <span>Affordability Summary</span>
              </h3>
              <span className={`text-xs font-bold px-2 py-0.5 rounded-full border ${badgeClasses}`}>
                {affordabilityLabel}
              </span>
            </div>

            {/* Coverage Meter */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center text-xs">
                <span className="text-rose-200/80">Tuition Coverage</span>
                <span className="font-bold text-white font-mono">{coveragePercent}%</span>
              </div>
              <div className="w-full bg-purple-950 h-2 rounded-full overflow-hidden border border-purple-800/40">
                <div
                  className={`h-full rounded-full transition-all ${
                    coveragePercent >= 100 
                      ? "bg-emerald-500" 
                      : coveragePercent >= 70 
                      ? "bg-amber-500" 
                      : "bg-rose-500"
                  }`}
                  style={{ width: `${coveragePercent}%` }}
                />
              </div>
            </div>

            {/* 4 Metric Cards */}
            <div className="grid grid-cols-2 gap-3 pt-1">
              <div className="p-3 rounded-xl bg-purple-950/50 border border-purple-800/40 text-center">
                <span className="text-[10px] text-rose-300/70 block uppercase font-semibold">Annual Buffer</span>
                <p className={`text-base font-bold font-mono ${annualBuffer >= 0 ? "text-emerald-400" : "text-rose-400"}`}>
                  {annualBuffer >= 0 ? `+₹${(annualBuffer / 1000).toFixed(0)}k` : `-₹${(Math.abs(annualBuffer) / 1000).toFixed(0)}k`}
                </p>
              </div>

              <div className="p-3 rounded-xl bg-purple-950/50 border border-purple-800/40 text-center">
                <span className="text-[10px] text-rose-300/70 block uppercase font-semibold">Loan Needed</span>
                <p className="text-base font-bold font-mono text-purple-300">
                  {loanNeeded === 0 ? "₹0" : `₹${(loanNeeded / 100000).toFixed(1)}L`}
                </p>
              </div>

              <div className="p-3 rounded-xl bg-purple-950/50 border border-purple-800/40 text-center">
                <span className="text-[10px] text-rose-300/70 block uppercase font-semibold">Payment / Yr</span>
                <p className="text-base font-bold font-mono text-peach-300">
                  ₹{(feesCanBePaidPerYear / 100000).toFixed(1)}L
                </p>
              </div>

              <div className="p-3 rounded-xl bg-purple-950/50 border border-purple-800/40 text-center">
                <span className="text-[10px] text-rose-300/70 block uppercase font-semibold">Payment × 4 Yrs</span>
                <p className="text-base font-bold font-mono text-white">
                  ₹{(total4YearPayable / 100000).toFixed(1)}L
                </p>
              </div>
            </div>

            {/* Explanation Note */}
            <div className="p-3 rounded-xl bg-purple-950/40 border border-purple-800/30 text-xs text-rose-200/80 leading-relaxed">
              {affordabilityDesc}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

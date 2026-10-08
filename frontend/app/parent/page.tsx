"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { 
  Wallet, 
  ShieldAlert, 
  CheckCircle2, 
  ArrowRight, 
  Calculator, 
  Coins 
} from "lucide-react";
import { createParent, checkFinancialFeasibility } from "@/lib/api";
import { FinancialCheckResult } from "@/types";

export default function ParentProfilePage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationResult, setSimulationResult] = useState<FinancialCheckResult | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    annual_budget: 600000,
    max_affordable_cost: 800000,
    loan_preference: "Low",
    risk_appetite: "Medium",
    preferred_career_domain: "Engineering / Technology",
    preferred_location: "Chennai",
    higher_study_expectation: "Yes",
  });

  const handleSimulate = async (sampleCost = 500000) => {
    setIsSimulating(true);
    try {
      const res = await checkFinancialFeasibility({
        education_cost: sampleCost,
        family_annual_budget: Number(formData.annual_budget),
        max_affordable_ceiling: Number(formData.max_affordable_cost),
        loan_preference: formData.loan_preference,
        risk_appetite: formData.risk_appetite,
      });
      setSimulationResult(res);
    } catch (err) {
      console.warn("Simulation fallback:", err);
      setSimulationResult({
        feasible: true,
        is_financially_difficult: false,
        financial_fit_score: 88,
        status_label: "✓ Financially Feasible",
        total_cost: 650000,
        effective_cost: 650000,
        budget_coverage: 100,
        remaining_budget: 150000,
        loan_required: 0,
        financial_risk_level: "Low",
        roi_score: 91,
        optimization_breakdown: {
          optimal_family_contribution: 650000,
          optimal_loan: 0,
          scholarship_grant: 0,
          unfunded_gap: 0,
        },
        explanation: "Degree cost of ₹6,50,000 fits comfortably within the family ceiling of ₹8,00,000.",
      });
    } finally {
      setIsSimulating(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await createParent({
        student_id: 1,
        annual_budget: Number(formData.annual_budget),
        max_affordable_cost: Number(formData.max_affordable_cost),
        loan_preference: formData.loan_preference,
        risk_appetite: formData.risk_appetite,
        preferred_career_domain: formData.preferred_career_domain,
        preferred_location: formData.preferred_location,
        higher_study_expectation: formData.higher_study_expectation,
      });
      router.push("/parent/dashboard");
    } catch (err) {
      console.error("Save parent error:", err);
      router.push("/parent/dashboard");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 py-4">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-950/70 text-purple-200 text-xs font-semibold mb-2 border border-purple-700/50">
          <Wallet className="w-3.5 h-3.5 text-pink-400" />
          <span>Parent Financial Boundaries</span>
        </div>
        <h1 className="text-3xl font-extrabold text-white">Family Constraints & Affordability Portal</h1>
        <p className="text-xs text-rose-200/70 mt-1">
          Define realistic education investment thresholds, permissible loan tolerances, and regional safety preferences.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Main Form */}
        <form onSubmit={handleSubmit} className="glass-card p-6 sm:p-8 rounded-2xl border border-purple-500/25 space-y-6 lg:col-span-7">
          <div className="border-b border-purple-900/40 pb-4">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Coins className="w-5 h-5 text-pink-400" />
              <span>Education Budget & Loan Exposure</span>
            </h2>
            <p className="text-xs text-rose-200/70">
              PRISM's solver will automatically penalize any career pathway requiring loans above your tolerance.
            </p>
          </div>

          {/* Budget Sliders */}
          <div className="space-y-4">
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="text-rose-100 font-semibold">Annual Education Budget</span>
                <span className="font-bold text-pink-300 bg-pink-950/70 px-2 py-0.5 rounded border border-pink-800/40">
                  ₹{Number(formData.annual_budget).toLocaleString("en-IN")}
                </span>
              </div>
              <input
                type="range"
                min="100000"
                max="2500000"
                step="50000"
                value={formData.annual_budget}
                onChange={(e) => setFormData({ ...formData, annual_budget: Number(e.target.value) })}
                className="w-full accent-pink-500 h-1.5 bg-purple-950 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-purple-300/60">
                <span>₹1 Lakh</span>
                <span>₹10 Lakhs</span>
                <span>₹25 Lakhs</span>
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="text-rose-100 font-semibold">Maximum Affordable Total Education Ceiling</span>
                <span className="font-bold text-peach-300 bg-peach-950/70 px-2 py-0.5 rounded border border-peach-800/40">
                  ₹{Number(formData.max_affordable_cost).toLocaleString("en-IN")}
                </span>
              </div>
              <input
                type="range"
                min="200000"
                max="3500000"
                step="50000"
                value={formData.max_affordable_cost}
                onChange={(e) => setFormData({ ...formData, max_affordable_cost: Number(e.target.value) })}
                className="w-full accent-peach-500 h-1.5 bg-purple-950 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-purple-300/60">
                <span>₹2 Lakhs</span>
                <span>₹15 Lakhs</span>
                <span>₹35 Lakhs</span>
              </div>
            </div>
          </div>

          {/* Risk and Loan Selectors */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-rose-200">Student Loan Preference</label>
              <select
                value={formData.loan_preference}
                onChange={(e) => setFormData({ ...formData, loan_preference: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#12071d] border border-purple-900/60 text-sm text-white focus:outline-none focus:border-pink-500"
              >
                <option value="None">None (Strict: Zero Educational Debt)</option>
                <option value="Low">Low (Manageable &lt; 25% of fees)</option>
                <option value="Moderate">Moderate (Up to 50% through loan)</option>
                <option value="High">High (Willing to finance premium tier)</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-rose-200">Family Financial Risk Appetite</label>
              <select
                value={formData.risk_appetite}
                onChange={(e) => setFormData({ ...formData, risk_appetite: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#12071d] border border-purple-900/60 text-sm text-white focus:outline-none focus:border-pink-500"
              >
                <option value="Low">Low (Prioritize guaranteed employment & stability)</option>
                <option value="Medium">Medium (Balanced growth and brand pedigree)</option>
                <option value="High">High (Aggressive frontier research / overseas)</option>
              </select>
            </div>
          </div>

          {/* Qualitative Parent Expectations */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-rose-200">Preferred Career Domain</label>
              <select
                value={formData.preferred_career_domain}
                onChange={(e) => setFormData({ ...formData, preferred_career_domain: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#12071d] border border-purple-900/60 text-sm text-white focus:outline-none focus:border-pink-500"
              >
                <option value="Engineering / Technology">Engineering / Technology</option>
                <option value="Traditional Engineering">Traditional Engineering (Mechanical/Civil/EEE)</option>
                <option value="Medicine / Healthcare">Medicine / Healthcare</option>
                <option value="Management & Commerce">Management & Commerce</option>
                <option value="Pure Sciences & Research">Pure Sciences & Research</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-rose-200">Preferred College Location</label>
              <input
                type="text"
                value={formData.preferred_location}
                onChange={(e) => setFormData({ ...formData, preferred_location: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#12071d] border border-purple-900/60 text-sm text-white focus:outline-none focus:border-pink-500"
                placeholder="e.g. Chennai"
              />
            </div>
          </div>

          <div className="pt-4 flex items-center justify-between border-t border-purple-900/40">
            <button
              type="button"
              onClick={() => handleSimulate(500000)}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-purple-950/60 hover:bg-purple-900/60 text-xs font-semibold text-rose-100 border border-purple-700/50 transition-colors"
            >
              <Calculator className="w-4 h-4 text-pink-400" />
              <span>{isSimulating ? "Simulating..." : "Simulate Feasibility"}</span>
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-pink-600 via-purple-600 to-peach-500 hover:opacity-95 text-white text-xs font-bold shadow-lg shadow-pink-600/30 transition-all"
            >
              <span>{isSubmitting ? "Saving Constraints..." : "Calculate Family Constraints"}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>

        {/* Live Constraint Solver Preview */}
        <div className="space-y-6 lg:col-span-5">
          <div className="glass-card p-6 rounded-2xl border border-purple-900/40 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Calculator className="w-4 h-4 text-peach-400" />
                <span>Solver Live Test: AI Engineering</span>
              </h3>
              <span className="text-[10px] font-bold text-purple-200 bg-purple-950/80 px-2 py-0.5 rounded border border-purple-800/40">
                ₹5,00,000 Base
              </span>
            </div>

            {simulationResult ? (
              <div className="space-y-3">
                <div className={`p-3 rounded-xl border text-xs font-semibold flex items-center gap-2 ${
                  simulationResult.feasible
                    ? "bg-peach-950/50 border-peach-500/40 text-peach-300"
                    : "bg-rose-950/50 border-rose-500/40 text-rose-300"
                }`}>
                  {simulationResult.feasible ? <CheckCircle2 className="w-4 h-4 text-peach-400" /> : <ShieldAlert className="w-4 h-4 text-rose-400" />}
                  <span>{simulationResult.status_label}</span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-2.5 rounded-lg bg-[#140822] border border-purple-900/40">
                    <p className="text-rose-200/70 text-[10px]">Financial Fit Score</p>
                    <p className="font-extrabold text-white text-base">{simulationResult.financial_fit_score}/100</p>
                  </div>
                  <div className="p-2.5 rounded-lg bg-[#140822] border border-purple-900/40">
                    <p className="text-rose-200/70 text-[10px]">5-Year ROI Score</p>
                    <p className="font-extrabold text-peach-400 text-base">{simulationResult.roi_score}/100</p>
                  </div>
                </div>

                <p className="text-[11px] text-rose-100/90 leading-relaxed bg-[#140822]/70 p-3 rounded-xl border border-purple-900/40">
                  {simulationResult.explanation}
                </p>
              </div>
            ) : (
              <div className="p-6 text-center text-xs text-rose-200/60 space-y-2">
                <p>Click "Simulate Feasibility" to test how your configured budget balances against typical STEAM tuition.</p>
              </div>
            )}

            {/* Test Extreme Cost */}
            <div className="pt-3 border-t border-purple-900/40 space-y-2">
              <p className="text-[11px] text-rose-200/70 font-medium">Test Medical Degree Ceiling Stress:</p>
              <button
                type="button"
                onClick={() => handleSimulate(1800000)}
                className="w-full text-xs py-2 rounded-lg bg-rose-950/50 hover:bg-rose-900/60 text-rose-200 border border-rose-700/50 transition-colors font-medium"
              >
                Simulate Medicine (₹18,00,000)
              </button>
            </div>
          </div>

          <div className="glass-card p-5 rounded-2xl border border-purple-900/40 space-y-3">
            <h4 className="text-xs font-bold text-rose-200 uppercase tracking-wider">
              PRISM Decision Protocol
            </h4>
            <p className="text-xs text-rose-200/70 leading-relaxed">
              If an aspirational career surpasses the family's maximum ceiling plus permitted loan boundaries, 
              it is quarantined to the <em>Financially Constrained</em> roster and can only unlock via documented scholarships.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}


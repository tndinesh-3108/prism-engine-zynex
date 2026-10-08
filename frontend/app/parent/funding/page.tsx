"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  DollarSign, 
  ArrowLeft, 
  Award, 
  Calendar, 
  ExternalLink,
  Scale,
  Calculator
} from "lucide-react";
import { useStudentParentFlow } from "@/lib/student-parent-flow";

interface ScholarshipItem {
  id: string;
  name: string;
  provider: string;
  amount: string;
  eligibility: string;
  deadline: string;
  coverage: string;
  portalUrl: string;
  category: "Merit" | "Corporate" | "Government";
}

const SCHOLARSHIPS_DATA: ScholarshipItem[] = [
  {
    id: "sch-1",
    name: "Reliance Foundation Undergraduate Scholarship",
    provider: "Reliance Foundation",
    amount: "Up to ₹2,00,000 total",
    eligibility: "Class 12 PCM > 80% • Family Income < ₹15 Lakhs",
    deadline: "October 31, 2026",
    coverage: "Tuition Fees & Learning Allowances",
    portalUrl: "https://www.scholarships.reliancefoundation.org",
    category: "Corporate",
  },
  {
    id: "sch-2",
    name: "IIT Madras Merit-cum-Means Tuition Remission",
    provider: "Ministry of Education & IIT Madras",
    amount: "100% Tuition Fee Waiver (₹8,00,000 saved)",
    eligibility: "Family Income < ₹5 Lakhs (or 2/3rd remission for < ₹9 Lakhs)",
    deadline: "Annual Admissions Cycle",
    coverage: "Full Academic Tuition Remission",
    portalUrl: "https://www.iitm.ac.in",
    category: "Government",
  },
  {
    id: "sch-3",
    name: "Tata Steel Millennium Scholarship",
    provider: "Tata Community Initiatives Trust",
    amount: "₹60,000 / year (₹2,40,000 over 4 years)",
    eligibility: "B.Tech / Engineering Students with Top Rank",
    deadline: "December 15, 2026",
    coverage: "Books, Hostel & Course Fees",
    portalUrl: "https://www.tatasteel.com",
    category: "Merit",
  },
  {
    id: "sch-4",
    name: "Tamil Nadu Chief Minister STEM Fellowship Grant",
    provider: "Government of Tamil Nadu",
    amount: "₹1,00,000 / year + Laptop Grant",
    eligibility: "Tamil Nadu state domicile • Top 1% in Class 12 Boards",
    deadline: "November 20, 2026",
    coverage: "State College Research & Lab Allowances",
    portalUrl: "https://www.tn.gov.in",
    category: "Government",
  },
];

export default function ParentFundingPage() {
  const { parentParameters, selectedCourse } = useStudentParentFlow();
  const [selectedFilter, setSelectedFilter] = useState<"All" | "Merit" | "Corporate" | "Government">("All");

  const degreeCost = selectedCourse?.total4YearFee || 1400000;
  const startingSalaryYear1 = 3200000; // ₹32L average starting package
  const estimated5YearEarnings = 3200000 + 3600000 + 4200000 + 4900000 + 5800000; // 5-Yr Cumulative: ~₹2.17 Cr
  const roiMultiple = (estimated5YearEarnings / degreeCost).toFixed(1);
  const paybackMonths = Math.round((degreeCost / (startingSalaryYear1 / 12)) * 10) / 10;

  const filteredScholarships = SCHOLARSHIPS_DATA.filter((s) =>
    selectedFilter === "All" ? true : s.category === selectedFilter
  );

  return (
    <div className="max-w-5xl mx-auto space-y-8 py-4 px-4 sm:px-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-peach-950/70 text-peach-300 text-xs font-semibold mb-2 border border-peach-700/40">
            <DollarSign className="w-3.5 h-3.5 text-peach-400" />
            <span>Funding & ROI</span>
          </div>
          <h1 className="text-3xl font-bold text-white">
            Scholarships & ROI
          </h1>
          <p className="text-sm text-rose-200/80">
            Estimated returns and available scholarships.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/parent/dashboard"
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-purple-950/60 hover:bg-purple-900/60 text-purple-200 border border-purple-800/40 text-xs font-semibold transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Dashboard</span>
          </Link>
          <Link
            href="/parent/alignment"
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-purple-950/60 hover:bg-purple-900/60 text-purple-200 border border-purple-800/40 text-xs font-semibold transition-colors"
          >
            <Scale className="w-3.5 h-3.5 text-pink-400" />
            <span>Alignment</span>
          </Link>
        </div>
      </div>

      {/* 5-Year ROI Simulation Hero Card */}
      <div className="glass-card p-6 sm:p-8 rounded-2xl border border-peach-500/30 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-purple-900/40 pb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Calculator className="w-5 h-5 text-peach-400" />
              <h2 className="text-base font-bold text-white">
                5-Year Degree ROI
              </h2>
            </div>
            <p className="text-xs text-rose-200/80">
              Evaluated for: {selectedCourse.title}
            </p>
          </div>
          <span className="text-xs font-bold text-emerald-300 bg-emerald-950/80 px-3 py-1 rounded-full border border-emerald-500/40 w-fit">
            ✓ {roiMultiple}x Payback Ratio
          </span>
        </div>

        {/* 4 Financial Key Figures */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-purple-950/40 border border-purple-800/40 space-y-1">
            <span className="text-[10px] text-rose-300/70 uppercase tracking-wider font-semibold">Total 4-Yr Degree Cost</span>
            <p className="text-xl font-extrabold text-white font-mono">
              ₹{(degreeCost / 100000).toFixed(1)} Lakhs
            </p>
            <p className="text-[10px] text-rose-300/60">Within ₹{(parentParameters.degreeCeiling / 100000).toFixed(1)}L ceiling</p>
          </div>

          <div className="p-4 rounded-2xl bg-purple-950/40 border border-purple-800/40 space-y-1">
            <span className="text-[10px] text-rose-300/70 uppercase tracking-wider font-semibold">Average Day-1 Package</span>
            <p className="text-xl font-extrabold text-pink-400 font-mono">
              ₹32.0 LPA
            </p>
            <p className="text-[10px] text-pink-300/60">Tier-1 campus recruiters</p>
          </div>

          <div className="p-4 rounded-2xl bg-purple-950/40 border border-purple-800/40 space-y-1">
            <span className="text-[10px] text-rose-300/70 uppercase tracking-wider font-semibold">Break-Even Period</span>
            <p className="text-xl font-extrabold text-emerald-300 font-mono">
              ~{paybackMonths} Months
            </p>
            <p className="text-[10px] text-emerald-300/60">Less than 1 year post-degree</p>
          </div>

          <div className="p-4 rounded-2xl bg-purple-950/40 border border-purple-800/40 space-y-1">
            <span className="text-[10px] text-rose-300/70 uppercase tracking-wider font-semibold">5-Yr Cumulative Salary</span>
            <p className="text-xl font-extrabold text-peach-300 font-mono">
              ₹2.17 Crores
            </p>
            <p className="text-[10px] text-peach-300/60">Assuming 15% annual appraisal</p>
          </div>
        </div>

        {/* Comparison Insight Box */}
        <div className="p-4 rounded-2xl bg-purple-950/50 border border-purple-700/40 text-xs text-rose-100/90 leading-relaxed">
          💡 <strong>Parent Financial Insight:</strong> Investing ₹18.0 Lakhs in high-tier AI/ML engineering yields a 12.0x cumulative cash return over 5 years compared to general degrees. Your low debt tolerance is fully preserved because Arun's target colleges (IITs/NITs) offer zero-margin educational loans with SBI Scholar limits up to ₹40 Lakhs without collateral.
        </div>
      </div>

      {/* Targeted Scholarships Section */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-xl font-black text-white flex items-center gap-2">
              <Award className="w-5 h-5 text-pink-400" />
              <span>Targeted Scholarships for Arun's Profile</span>
            </h2>
            <p className="text-xs text-rose-200/70">
              Apply to reduce out-of-pocket family tuition expenses to near zero.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center p-1 rounded-xl bg-purple-950/60 border border-purple-800/40 text-xs">
            {(["All", "Merit", "Corporate", "Government"] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedFilter(cat)}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                  selectedFilter === cat
                    ? "bg-gradient-to-r from-pink-600 to-purple-600 text-white shadow-sm"
                    : "text-purple-300/70 hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Scholarships Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredScholarships.map((sch) => (
            <div
              key={sch.id}
              className="glass-card p-5 rounded-2xl border border-purple-500/30 hover:border-pink-500/40 transition-all space-y-3 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-pink-950 text-pink-300 border border-pink-700/40">
                    {sch.category}
                  </span>
                  <span className="text-xs font-extrabold text-emerald-400 font-mono">
                    {sch.amount}
                  </span>
                </div>

                <h3 className="text-base font-extrabold text-white">{sch.name}</h3>
                <p className="text-xs font-semibold text-purple-300">{sch.provider}</p>

                <div className="p-2.5 rounded-xl bg-purple-950/40 border border-purple-800/30 text-[11px] text-rose-200/80 space-y-1">
                  <div>
                    <strong className="text-white">Eligibility:</strong> {sch.eligibility}
                  </div>
                  <div>
                    <strong className="text-white">Coverage:</strong> {sch.coverage}
                  </div>
                </div>

                <div className="flex items-center gap-2 text-[11px] text-rose-300/70 pt-1">
                  <Calendar className="w-3.5 h-3.5 text-pink-400" />
                  <span>Deadline: {sch.deadline}</span>
                </div>
              </div>

              <div className="pt-3 border-t border-purple-900/40 flex items-center justify-end">
                <a
                  href={sch.portalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-pink-600/30 hover:bg-pink-600 text-pink-200 hover:text-white text-xs font-bold transition-all border border-pink-500/40"
                >
                  <span>Official Application Portal</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import { 
  TrendingUp, 
  MapPin, 
  Cpu, 
  Sparkles, 
  AlertCircle 
} from "lucide-react";
import { getMarketData } from "@/lib/api";
import { MarketData } from "@/types";

export default function MarketIntelligencePage() {
  const [market, setMarket] = useState<MarketData | null>(null);
  const [selectedHub, setSelectedHub] = useState<string>("Chennai");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await getMarketData("ai-ml-engineer");
        setMarket(data);
      } catch (err) {
        console.warn("Market intel fallback:", err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading || !market) {
    return (
      <div className="max-w-4xl mx-auto py-16 text-center space-y-4">
        <div className="w-12 h-12 border-4 border-pink-500 border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-sm text-rose-200/70">Loading Regional STEAM Market Intelligence...</p>
      </div>
    );
  }

  const currentHub = market.regional_hubs.find((h) => h.city === selectedHub) || market.regional_hubs[0];

  return (
    <div className="max-w-5xl mx-auto space-y-8 py-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-950/70 text-pink-300 text-xs font-semibold mb-2 border border-pink-700/40">
            <TrendingUp className="w-3.5 h-3.5 text-pink-400" />
            <span>Regional STEAM Intelligence</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white">Hyper-Local STEAM Market Demand</h1>
          <p className="text-xs text-rose-200/70">
            Empirical hiring velocity, starting salary brackets, and regional innovation corridors across India.
          </p>
        </div>

        {/* Prototype Sample Data Notice */}
        <div className="px-3 py-1.5 rounded-xl bg-purple-950/50 border border-purple-800/40 text-[11px] text-rose-200/80 flex items-center gap-2 self-start sm:self-auto">
          <AlertCircle className="w-4 h-4 text-peach-400 shrink-0" />
          <span>Prototype Data: Calibrated Q1 2026 STEAM Index</span>
        </div>
      </div>

      {/* Top 3 High-Level Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-card p-5 rounded-2xl border border-pink-500/30 space-y-2">
          <span className="text-xs text-rose-200/70">National Hiring Demand</span>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-pink-300">{market.market_demand}/100</span>
            <span className="text-xs text-peach-400 font-semibold">+28% YoY Growth</span>
          </div>
          <p className="text-[11px] text-rose-200/70 leading-relaxed">
            High recruitment pressure in AI Engineering, Embedded Systems, and Renewable Grid Integration.
          </p>
        </div>

        <div className="glass-card p-5 rounded-2xl border border-purple-500/30 space-y-2">
          <span className="text-xs text-rose-200/70">5-Year Growth Outlook</span>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-purple-300">{market.growth_trend}/100</span>
            <span className="text-xs text-pink-400 font-semibold">Tier 1 Exponential</span>
          </div>
          <p className="text-[11px] text-rose-200/70 leading-relaxed">
            Projected creation of over 1.4M new engineering and analytics positions in urban Indian corridors.
          </p>
        </div>

        <div className="glass-card p-5 rounded-2xl border border-peach-500/30 space-y-2">
          <span className="text-xs text-rose-200/70">Salary Potential Index</span>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-peach-300">{market.salary_potential}/100</span>
            <span className="text-xs text-purple-300 font-semibold">Top Tier Returns</span>
          </div>
          <p className="text-[11px] text-rose-200/70 leading-relaxed">
            Average entry compensation spans ₹7.5 LPA to ₹16.5 LPA across premier regional clusters.
          </p>
        </div>
      </div>

      {/* Regional STEAM City Hubs Interactive Selector */}
      <div className="glass-card p-6 rounded-2xl border border-purple-900/40 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-purple-900/40 pb-4">
          <div className="space-y-1">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <MapPin className="w-5 h-5 text-pink-400" />
              <span>Hyper-Local Tech Hubs & Industry Corridors</span>
            </h2>
            <p className="text-xs text-rose-200/70">Select an Indian metropolitan hub to view active sector specializations.</p>
          </div>

          <div className="flex flex-wrap gap-2">
            {market.regional_hubs.map((hub) => (
              <button
                key={hub.city}
                onClick={() => setSelectedHub(hub.city)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  selectedHub === hub.city
                    ? "bg-gradient-to-r from-pink-600 to-purple-600 text-white shadow-md shadow-pink-600/30"
                    : "bg-[#140822] border border-purple-900/40 text-rose-200/70 hover:text-white hover:border-pink-500/40"
                }`}
              >
                {hub.city}
              </button>
            ))}
          </div>
        </div>

        {/* Selected Hub Detail Card */}
        {currentHub && (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            <div className="md:col-span-7 space-y-4">
              <div className="flex items-center gap-3">
                <h3 className="text-2xl font-black text-white">{currentHub.city}</h3>
                <span className="text-xs text-rose-200/70 px-2.5 py-0.5 rounded-full bg-[#140822] border border-purple-900/40">
                  {currentHub.state}
                </span>
                <span className="text-xs font-bold text-peach-300 bg-peach-950/80 px-2 py-0.5 rounded border border-peach-800/40">
                  STEAM Score: {currentHub.steam_demand_score}/100
                </span>
              </div>

              <p className="text-xs text-rose-100/90 leading-relaxed">
                {currentHub.description}
              </p>

              <div className="space-y-2">
                <span className="text-xs font-semibold text-rose-200/70 uppercase tracking-wider">
                  Key Sector Specializations:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {currentHub.specialties.map((spec, sIdx) => (
                    <span
                      key={sIdx}
                      className="px-2.5 py-1 rounded-lg bg-purple-950/70 border border-purple-800/40 text-[11px] font-medium text-purple-200"
                    >
                      {spec}
                    </span>
                  ))}
                </div>
              </div>

              <div className="space-y-2 pt-1">
                <span className="text-xs font-semibold text-rose-200/70 uppercase tracking-wider">
                  Prominent Employers & Innovation Parks:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {currentHub.key_employers.map((emp, eIdx) => (
                    <span
                      key={eIdx}
                      className="px-2.5 py-1 rounded-lg bg-[#140822] border border-purple-900/40 text-[11px] text-rose-200"
                    >
                      🏢 {emp}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="md:col-span-5 p-5 rounded-2xl bg-[#140822]/90 border border-purple-900/40 space-y-4">
              <div className="flex justify-between items-center text-xs pb-3 border-b border-purple-900/40">
                <span className="text-rose-200/70">Entry Compensation:</span>
                <span className="font-extrabold text-peach-400 text-sm">{currentHub.avg_entry_salary}</span>
              </div>

              <div className="flex justify-between items-center text-xs pb-3 border-b border-purple-900/40">
                <span className="text-rose-200/70">Hiring Trajectory:</span>
                <span className="font-semibold text-pink-300 text-xs">{currentHub.growth_outlook}</span>
              </div>

              <div className="space-y-1">
                <span className="text-[11px] font-bold text-rose-200">Chennai Proximity Advantage:</span>
                <p className="text-xs text-rose-200/70">
                  IIT Madras Research Park & Sriperumbudur EV belt offer direct engineering internships for school/college students in Tamil Nadu.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Top Technical Skills in Demand */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-card p-6 rounded-2xl border border-purple-900/40 space-y-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Cpu className="w-4 h-4 text-pink-400" />
            <span>Top Skills Demanded by Recruiters</span>
          </h3>

          <div className="space-y-3">
            {market.top_skills_in_demand.map((item, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="font-semibold text-rose-100">{item.skill}</span>
                  <span className="font-bold text-pink-400">{item.demand_pct}%</span>
                </div>
                <div className="w-full bg-purple-950/80 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-pink-500 h-full rounded-full" style={{ width: `${item.demand_pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-card p-6 rounded-2xl border border-purple-900/40 space-y-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-peach-400" />
            <span>Emerging Frontier STEAM Opportunities</span>
          </h3>

          <div className="space-y-3">
            {market.emerging_steam_opportunities.map((opp, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl bg-[#140822]/70 border border-purple-900/40 flex items-start gap-3 text-xs"
              >
                <div className="w-5 h-5 rounded-full bg-purple-950 text-pink-300 flex items-center justify-center shrink-0 mt-0.5 font-bold text-[10px] border border-purple-800/40">
                  {idx + 1}
                </div>
                <p className="text-rose-100/90 leading-relaxed">{opp}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}


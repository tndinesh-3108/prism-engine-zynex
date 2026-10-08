"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { 
  MapPin, 
  Search, 
  Calendar, 
  Award, 
  ExternalLink 
} from "lucide-react";
import { getOpportunities } from "@/lib/api";
import { OpportunityItem } from "@/types";

export default function OpportunitiesPage() {
  const [opportunities, setOpportunities] = useState<OpportunityItem[]>([]);
  const [filterLocation, setFilterLocation] = useState("All");
  const [filterType, setFilterType] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await getOpportunities();
        setOpportunities(data);
      } catch (err) {
        console.warn("Opportunities fallback:", err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading && opportunities.length === 0) {
    return (
      <div className="max-w-4xl mx-auto py-16 text-center space-y-4">
        <div className="w-12 h-12 border-4 border-pink-500 border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-sm text-rose-200/70">Loading Hyper-Local STEAM Opportunities...</p>
      </div>
    );
  }

  const filtered = opportunities.filter((op) => {
    const matchLoc = filterLocation === "All" || op.location.toLowerCase().includes(filterLocation.toLowerCase());
    const matchType = filterType === "All" || op.type.toLowerCase().includes(filterType.toLowerCase());
    const matchSearch =
      !searchQuery ||
      op.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      op.organization.toLowerCase().includes(searchQuery.toLowerCase()) ||
      op.career_domain.toLowerCase().includes(searchQuery.toLowerCase());
    return matchLoc && matchType && matchSearch;
  });

  return (
    <div className="max-w-5xl mx-auto space-y-8 py-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-950/70 text-pink-300 text-xs font-semibold mb-2 border border-pink-700/40">
            <MapPin className="w-3.5 h-3.5 text-pink-400" />
            <span>Hyper-Local STEAM Catalysts</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white">Opportunities & Innovation Labs</h1>
          <p className="text-xs text-rose-200/70">
            Curated regional internships, hackathons, and research fellowships in Tamil Nadu and South India.
          </p>
        </div>

        <Link
          href="/opportunities/trackers"
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white text-xs font-bold shadow-md shadow-pink-600/30 self-start sm:self-auto transition-all"
        >
          <Award className="w-4 h-4" />
          <span>Exams & Scholarships Tracker</span>
        </Link>
      </div>

      {/* Filter and Search Bar */}
      <div className="glass-card p-4 rounded-2xl border border-purple-900/40 flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-purple-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search AI, robotics, IIT Madras..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-[#12071d] border border-purple-900/60 text-xs text-white placeholder-rose-200/40 focus:outline-none focus:border-pink-500"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <div className="flex items-center gap-1.5 text-xs">
            <span className="text-rose-200/70">City:</span>
            <select
              value={filterLocation}
              onChange={(e) => setFilterLocation(e.target.value)}
              className="px-2.5 py-1.5 rounded-lg bg-[#12071d] border border-purple-900/60 text-xs text-white focus:outline-none focus:border-pink-500"
            >
              <option value="All">All Locations</option>
              <option value="Chennai">Chennai</option>
              <option value="Bengaluru">Bengaluru</option>
              <option value="Coimbatore">Coimbatore</option>
              <option value="All India">All India</option>
            </select>
          </div>

          <div className="flex items-center gap-1.5 text-xs">
            <span className="text-rose-200/70">Type:</span>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-2.5 py-1.5 rounded-lg bg-[#12071d] border border-purple-900/60 text-xs text-white focus:outline-none focus:border-pink-500"
            >
              <option value="All">All Types</option>
              <option value="Internship">Internship</option>
              <option value="Hackathon">Hackathon</option>
              <option value="Skill Program">Skill Program</option>
              <option value="Innovation Lab">Innovation Lab</option>
            </select>
          </div>
        </div>
      </div>

      {/* Opportunities Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.map((op) => (
          <div
            key={op.id}
            className="glass-card glass-card-hover p-6 rounded-2xl border border-purple-900/40 flex flex-col justify-between space-y-4 hover:border-pink-500/40 transition-colors"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-purple-950/70 text-purple-200 border border-purple-800/40">
                  {op.type}
                </span>
                <span className="text-xs text-peach-300 font-bold bg-peach-950/80 px-2 py-0.5 rounded border border-peach-800/40">
                  {op.stipend_or_award}
                </span>
              </div>

              <div>
                <h3 className="text-lg font-bold text-white hover:text-pink-300 transition-colors">
                  {op.title}
                </h3>
                <p className="text-xs text-rose-200/70 mt-0.5">🏢 {op.organization}</p>
              </div>

              <p className="text-xs text-rose-100/90 leading-relaxed line-clamp-3">
                {op.description}
              </p>
            </div>

            <div className="space-y-3 pt-3 border-t border-purple-900/40 text-xs">
              <div className="flex justify-between text-rose-200/70">
                <span className="flex items-center gap-1 text-[11px]">
                  <MapPin className="w-3.5 h-3.5 text-pink-400" />
                  {op.location}
                </span>
                <span className="flex items-center gap-1 text-[11px]">
                  <Calendar className="w-3.5 h-3.5 text-purple-400" />
                  Deadline: {op.deadline}
                </span>
              </div>

              <div className="p-2 rounded-lg bg-[#140822] border border-purple-900/40 text-[11px] text-rose-200/80">
                <strong>Eligibility:</strong> {op.eligibility}
              </div>

              <div className="flex items-center justify-between pt-1">
                <span className="text-[10px] text-pink-300 font-semibold bg-pink-950/70 px-2 py-0.5 rounded border border-pink-800/40">
                  {op.career_domain}
                </span>

                <a
                  href={op.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-xs text-white hover:text-pink-400 font-bold transition-colors"
                >
                  <span>Apply Now</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { 
  Award, 
  Calendar, 
  CheckCircle2, 
  ExternalLink, 
  BookmarkCheck, 
  ArrowLeft, 
  GraduationCap, 
  Coins 
} from "lucide-react";
import { getTrackers } from "@/lib/api";
import { TrackersData } from "@/types";

export default function TrackersPage() {
  const [data, setData] = useState<TrackersData | null>(null);
  const [activeTab, setActiveTab] = useState<"exams" | "scholarships">("exams");
  const [savedIds, setSavedIds] = useState<number[]>([]);
  const [completedIds, setCompletedIds] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await getTrackers();
        setData(res);
      } catch (err) {
        console.warn("Trackers fallback:", err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading && !data) {
    return (
      <div className="max-w-4xl mx-auto py-16 text-center space-y-4">
        <div className="w-12 h-12 border-4 border-pink-500 border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-sm text-rose-200/70">Loading Milestone Trackers...</p>
      </div>
    );
  }

  const toggleSave = (id: number) => {
    setSavedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const toggleComplete = (id: number) => {
    setCompletedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 py-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-950/70 text-pink-300 text-xs font-semibold mb-2 border border-pink-700/40">
            <Award className="w-3.5 h-3.5 text-pink-400" />
            <span>Milestone Trackers</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white">Exams & Scholarships Tracker</h1>
          <p className="text-xs text-rose-200/70">
            Track key application deadlines, eligibility criteria, and financial grant portals for Arun Kumar.
          </p>
        </div>

        <Link
          href="/opportunities"
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-purple-950/60 hover:bg-purple-900/60 text-purple-200 border border-purple-800/40 text-xs font-semibold self-start sm:self-auto transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Opportunities</span>
        </Link>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-3 border-b border-purple-900/40 pb-2">
        <button
          onClick={() => setActiveTab("exams")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === "exams"
              ? "bg-gradient-to-r from-pink-600 to-purple-600 text-white shadow-md shadow-pink-600/30"
              : "text-rose-200/60 hover:text-white hover:bg-purple-950/40"
          }`}
        >
          <GraduationCap className="w-4 h-4" />
          <span>National STEAM Entrance Exams ({data?.exams?.length || 4})</span>
        </button>

        <button
          onClick={() => setActiveTab("scholarships")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === "scholarships"
              ? "bg-gradient-to-r from-purple-600 to-peach-500 text-white shadow-md shadow-purple-600/30"
              : "text-rose-200/60 hover:text-white hover:bg-purple-950/40"
          }`}
        >
          <Coins className="w-4 h-4" />
          <span>Merit & Need Scholarships ({data?.scholarships?.length || 4})</span>
        </button>
      </div>

      {/* Exams Tab */}
      {activeTab === "exams" && (
        <div className="space-y-4">
          {data?.exams.map((exam) => {
            const isSaved = savedIds.includes(exam.id);
            const isDone = completedIds.includes(exam.id);
            return (
              <div
                key={exam.id}
                className={`glass-card p-5 rounded-2xl border transition-all ${
                  isDone ? "border-pink-500/50 bg-pink-950/20" : "border-purple-900/40"
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-purple-950/70 text-purple-200 border border-purple-800/40">
                        {exam.conducting_body}
                      </span>
                      <span className="text-[11px] text-peach-400 font-semibold flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        Deadline: {exam.deadline}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-white">{exam.name}</h3>
                    <p className="text-xs text-rose-200/70">
                      <strong>Exam Date:</strong> {exam.exam_date} • <strong>Eligibility:</strong> {exam.eligibility}
                    </p>
                    <div className="flex flex-wrap gap-1 pt-1">
                      {exam.related_careers?.map((rc, rIdx) => (
                        <span key={rIdx} className="text-[10px] px-2 py-0.5 rounded bg-[#140822] border border-purple-900/40 text-rose-200">
                          {rc}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => toggleSave(exam.id)}
                      className={`p-2 rounded-xl border text-xs font-medium transition-all ${
                        isSaved
                          ? "bg-pink-600 text-white border-pink-500 shadow-md shadow-pink-600/30"
                          : "bg-[#140822] text-rose-200/60 border-purple-900/60 hover:text-white"
                      }`}
                      title="Save / Bookmark Exam"
                    >
                      <BookmarkCheck className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => toggleComplete(exam.id)}
                      className={`flex items-center gap-1 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all ${
                        isDone
                          ? "bg-gradient-to-r from-pink-600 to-purple-600 text-white border-pink-500"
                          : "bg-[#140822] text-rose-200 border-purple-900/60 hover:bg-purple-950/60"
                      }`}
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>{isDone ? "Registered" : "Mark Registered"}</span>
                    </button>

                    <a
                      href={exam.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-xl bg-[#140822] hover:bg-purple-950/60 text-rose-200 border border-purple-900/60 transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Scholarships Tab */}
      {activeTab === "scholarships" && (
        <div className="space-y-4">
          {data?.scholarships.map((sch) => {
            const isSaved = savedIds.includes(sch.id + 100);
            const isDone = completedIds.includes(sch.id + 100);
            return (
              <div
                key={sch.id}
                className={`glass-card p-5 rounded-2xl border transition-all ${
                  isDone ? "border-peach-500/50 bg-peach-950/20" : "border-purple-900/40"
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-purple-950/70 text-purple-200 border border-purple-800/40">
                        {sch.provider}
                      </span>
                      <span className="text-xs font-extrabold text-peach-400">
                        {sch.amount}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-white">{sch.name}</h3>
                    <p className="text-xs text-rose-200/70">
                      <strong>Eligibility:</strong> {sch.eligibility}
                    </p>
                    <p className="text-[11px] text-pink-300">Deadline: {sch.deadline}</p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => toggleSave(sch.id + 100)}
                      className={`p-2 rounded-xl border text-xs font-medium transition-all ${
                        isSaved
                          ? "bg-peach-600 text-white border-peach-500 shadow-md shadow-peach-600/30"
                          : "bg-[#140822] text-rose-200/60 border-purple-900/60 hover:text-white"
                      }`}
                    >
                      <BookmarkCheck className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => toggleComplete(sch.id + 100)}
                      className={`flex items-center gap-1 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all ${
                        isDone
                          ? "bg-gradient-to-r from-purple-600 to-peach-500 text-white border-peach-500"
                          : "bg-[#140822] text-rose-200 border-purple-900/60 hover:bg-purple-950/60"
                      }`}
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>{isDone ? "Applied" : "Mark Applied"}</span>
                    </button>

                    <a
                      href={sch.application_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-xl bg-[#140822] hover:bg-purple-950/60 text-rose-200 border border-purple-900/60 transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}


"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { 
  GitBranch, 
  ArrowLeft, 
  Clock, 
  Award, 
  FolderGit2, 
  GraduationCap, 
  BookOpen, 
  Sparkles,
  Bot
} from "lucide-react";
import { getRoadmap } from "@/lib/api";
import { RoadmapData } from "@/types";

export default function CareerRoadmapPage() {
  const params = useParams();
  const careerParam = (params?.career as string) || "ai-ml-engineer";

  const [roadmap, setRoadmap] = useState<RoadmapData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await getRoadmap(careerParam, 1);
        setRoadmap(data);
      } catch (err) {
        console.warn("Roadmap fallback:", err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [careerParam]);

  if (loading || !roadmap) {
    return (
      <div className="max-w-4xl mx-auto py-16 text-center space-y-4">
        <div className="w-12 h-12 border-4 border-pink-500 border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-sm text-rose-200/70">Synthesizing Step-by-Step STEAM Roadmap...</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8 py-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-950/70 text-pink-300 text-xs font-semibold mb-2 border border-pink-700/40">
            <GitBranch className="w-3.5 h-3.5 text-pink-400" />
            <span>Multi-Stage Pathway</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white">
            {roadmap.career_name} Roadmap
          </h1>
          <p className="text-xs text-rose-200/70">
            Step-by-step technical progression from High School (Class 12) to full industry target entry.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/recommendations"
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-purple-950/60 hover:bg-purple-900/60 text-purple-200 border border-purple-800/40 text-xs font-semibold transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Recommendations</span>
          </Link>
          <Link
            href="/mentor"
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white text-xs font-bold shadow-md shadow-pink-600/30 transition-all"
          >
            <Bot className="w-4 h-4" />
            <span>Ask AI Mentor</span>
          </Link>
        </div>
      </div>

      {/* Top Banner: Academic Degree Track & Advice */}
      <div className="glass-card p-6 rounded-2xl border border-pink-500/30 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-purple-900/40 pb-3">
          <span className="text-xs text-rose-200/70 font-semibold uppercase tracking-wider">
            Primary Degree Pathway:
          </span>
          <span className="text-xs font-extrabold text-white bg-purple-950/80 px-3 py-1 rounded-full border border-purple-800/50">
            {roadmap.education_path}
          </span>
        </div>
        <p className="text-xs text-rose-100/90 leading-relaxed">
          💡 <strong>Personalized Strategy for Arun Kumar:</strong> {roadmap.personalized_advice}
        </p>
      </div>

      {/* Skill Gaps Breakdown */}
      <div className="glass-card p-6 rounded-2xl border border-purple-900/40 space-y-4">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <Award className="w-4 h-4 text-pink-400" />
          <span>Skill Gap Analysis for {roadmap.career_name}</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {roadmap.skill_gaps.map((gap, idx) => (
            <div key={idx} className="p-3.5 rounded-xl bg-[#140822]/80 border border-purple-900/40 space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-semibold text-rose-100">{gap.skill}</span>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                    gap.status === "Proficient"
                      ? "bg-pink-950/80 text-pink-300 border border-pink-800/40"
                      : "bg-peach-950/80 text-peach-300 border border-peach-800/40"
                  }`}
                >
                  {gap.status}
                </span>
              </div>
              <div className="w-full bg-purple-950/80 h-1.5 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full ${
                    gap.status === "Proficient" ? "bg-pink-500" : "bg-peach-500"
                  }`}
                  style={{ width: `${Math.min(100, gap.current_level)}%` }}
                />
              </div>
              <div className="flex justify-between text-[10px] text-rose-200/60">
                <span>Current: {gap.current_level}%</span>
                <span>Target: {gap.target_level}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Visual Timeline Stepper */}
      <div className="space-y-6">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-peach-400" />
          <span>Execution Milestones</span>
        </h3>

        <div className="relative pl-6 sm:pl-8 space-y-8 before:absolute before:left-3 sm:before:left-4 before:top-3 before:bottom-3 before:w-0.5 before:bg-pink-500/30">
          {roadmap.stages.map((stage) => (
            <div key={stage.stage_number} className="relative space-y-3">
              {/* Stepper Node Marker */}
              <div className="absolute -left-6 sm:-left-8 top-1 w-6 h-6 rounded-full bg-[#12071d] border-2 border-pink-500 flex items-center justify-center text-[10px] font-extrabold text-pink-300 shadow-sm shadow-pink-500/20">
                {stage.stage_number}
              </div>

              {/* Milestone Card */}
              <div className="glass-card p-6 rounded-2xl border border-purple-900/40 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-purple-900/40 pb-3">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-pink-400">
                      Stage {stage.stage_number}
                    </span>
                    <h4 className="text-lg font-extrabold text-white">{stage.stage_name}</h4>
                  </div>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded bg-[#140822] text-rose-200/70 border border-purple-900/40 flex items-center gap-1 self-start sm:self-auto">
                    <Clock className="w-3.5 h-3.5 text-pink-400" />
                    {stage.estimated_duration}
                  </span>
                </div>

                <p className="text-xs text-rose-100/90 leading-relaxed">
                  {stage.description}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs pt-1">
                  {/* Skills to Learn */}
                  <div className="space-y-1.5 p-3 rounded-xl bg-[#140822]/80 border border-purple-900/40">
                    <span className="font-semibold text-rose-200/70 text-[11px] flex items-center gap-1">
                      <BookOpen className="w-3.5 h-3.5 text-pink-400" />
                      Skills to Acquire:
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {stage.skills_to_learn.map((sk, sIdx) => (
                        <span key={sIdx} className="px-2 py-0.5 rounded bg-pink-950/70 text-pink-300 text-[10px] border border-pink-800/40">
                          {sk}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Certifications */}
                  <div className="space-y-1.5 p-3 rounded-xl bg-[#140822]/80 border border-purple-900/40">
                    <span className="font-semibold text-rose-200/70 text-[11px] flex items-center gap-1">
                      <Award className="w-3.5 h-3.5 text-purple-400" />
                      Recommended Certifications:
                    </span>
                    <ul className="text-[11px] text-rose-100 space-y-1 list-disc list-inside">
                      {stage.recommended_certifications.map((c, cIdx) => (
                        <li key={cIdx}>{c}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Projects */}
                  <div className="space-y-1.5 p-3 rounded-xl bg-[#140822]/80 border border-purple-900/40">
                    <span className="font-semibold text-rose-200/70 text-[11px] flex items-center gap-1">
                      <FolderGit2 className="w-3.5 h-3.5 text-peach-400" />
                      Capstone Portfolio Projects:
                    </span>
                    <ul className="text-[11px] text-rose-100 space-y-1 list-disc list-inside">
                      {stage.recommended_projects.map((p, pIdx) => (
                        <li key={pIdx}>{p}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Exams & Milestones */}
                  <div className="space-y-1.5 p-3 rounded-xl bg-[#140822]/80 border border-purple-900/40">
                    <span className="font-semibold text-rose-200/70 text-[11px] flex items-center gap-1">
                      <GraduationCap className="w-3.5 h-3.5 text-rose-300" />
                      Key Exams / Checkpoints:
                    </span>
                    <ul className="text-[11px] text-rose-100 space-y-1 list-disc list-inside">
                      {stage.exams_and_milestones.map((e, eIdx) => (
                        <li key={eIdx}>{e}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}


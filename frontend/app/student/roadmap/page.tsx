"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { 
  GitBranch, 
  ArrowLeft, 
  Clock, 
  Sparkles,
  Bot,
  CheckCircle2,
  ChevronRight,
  Code,
  GraduationCap,
  Sliders
} from "lucide-react";
import { getRoadmap } from "@/lib/api";
import { RoadmapData } from "@/types";
import { useStudentProfile } from "@/lib/student-profile-context";

export default function StudentRoadmapPage() {
  const { profile, openProfileModal } = useStudentProfile();
  const [selectedCareer, setSelectedCareer] = useState("ai-ml-engineer");
  const [roadmap, setRoadmap] = useState<RoadmapData | null>(null);
  const [loading, setLoading] = useState(true);

  const careerOptions = [
    { slug: "ai-ml-engineer", label: "AI / ML Engineer & Generative Systems Lead", tier: "Match" },
    { slug: "data-systems-architect", label: "Data Systems Architect & Cloud Engineer", tier: "Safe" },
    { slug: "robotics-hardware-specialist", label: "Autonomous Robotics & Embedded Hardware", tier: "Reach" }
  ];

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const data = await getRoadmap(selectedCareer, 1);
        setRoadmap(data);
      } catch (err) {
        console.warn("Roadmap API fallback:", err);
        setRoadmap({
          career_id: 1,
          career_name: selectedCareer === "ai-ml-engineer" 
            ? "AI / ML Engineer" 
            : selectedCareer === "data-systems-architect" 
            ? "Data Systems Architect" 
            : "Robotics Hardware Specialist",
          education_path: "4-Year B.Tech in CSE / Artificial Intelligence -> Applied ML Specialization -> Industry Placement",
          total_milestones: 5,
          stages: [
            {
              stage_number: 1,
              stage_name: "Class 12 & Algorithmic Foundations",
              description: "Strengthen advanced algebra, discrete mathematics, and introductory Python/C++ scripting.",
              skills_to_learn: ["Linear Algebra", "Python 3 Core", "Data Structures", "Coordinate Geometry"],
              recommended_certifications: ["Python for Everybody (Coursera / UMich)"],
              recommended_projects: ["Sorting Algorithm Visualizer", "CLI File Indexer"],
              exams_and_milestones: ["Class 12 Boards (Target 90%+)", "JEE Main / Advanced"],
              estimated_duration: "Months 0 – 6 (Class 12)",
            },
            {
              stage_number: 2,
              stage_name: "Undergraduate Core Computing & OOP",
              description: "Master Object Oriented Programming, Database Systems (SQL), and Algorithm Complexity.",
              skills_to_learn: ["Data Structures & Algorithms", "SQL & Relational Models", "System Design Basics"],
              recommended_certifications: ["DeepLearning.AI Machine Learning Specialization"],
              recommended_projects: ["FastAPI REST Microservice", "OpenCV Face Tracker"],
              exams_and_milestones: ["Maintain 8.5+ CGPA", "Smart India Hackathon"],
              estimated_duration: "Years 1 – 2 (UG Early)",
            },
            {
              stage_number: 3,
              stage_name: "Applied Deep Learning & MLOps Pipelines",
              description: "Master deep neural networks, computer vision, natural language processing, and cloud serving.",
              skills_to_learn: ["PyTorch", "HuggingFace Transformers", "Docker & CI/CD", "Vector Databases (ChromaDB)"],
              recommended_certifications: ["AWS Certified Machine Learning – Specialty"],
              recommended_projects: ["Multi-Modal Document RAG Pipeline with Semantic Search"],
              exams_and_milestones: ["GATE CSE (Optional for IIT M.Tech / PSU)", "Summer Internship at Zoho / TVS"],
              estimated_duration: "Years 3 – 4 (UG Senior)",
            },
            {
              stage_number: 4,
              stage_name: "Enterprise Capstone & Day-1 Campus Placement",
              description: "Gain high-throughput engineering exposure and clear Day-1 recruitment for high-package roles.",
              skills_to_learn: ["Distributed Training (FSDP)", "Low-Latency Inference", "System Design"],
              recommended_certifications: ["Google Cloud Professional Machine Learning Engineer"],
              recommended_projects: ["Autonomous Multi-Agent Task Orchestration Engine"],
              exams_and_milestones: ["Day-1 Placement Offer (Target ₹32 LPA – ₹55 LPA)"],
              estimated_duration: "Final Year / Career Entry",
            }
          ],
          current_student_skills: {
            Programming: 82,
            Mathematics: 89,
            "Analytical Thinking": 86,
            "Problem Solving": 91,
          },
          required_skills: {
            Programming: 90,
            Mathematics: 88,
            "Analytical Thinking": 85,
            "Problem Solving": 90,
          },
          skill_gaps: [
            { skill: "PyTorch & Deep Learning Foundations", current_level: 65, target_level: 90, gap: 25, status: "Priority Focus" },
            { skill: "Distributed Computing (Spark / Ray)", current_level: 50, target_level: 85, gap: 35, status: "Priority Focus" },
            { skill: "Vector Databases & RAG Pipelines", current_level: 40, target_level: 80, gap: 40, status: "Priority Focus" },
          ],
          personalized_advice: "With your 91 aptitude score and mathematical aptitude, prioritize foundational algorithmic rigor in Year 1 to position yourself for Day-1 super dream placement."
        });
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [selectedCareer]);

  // Determine which stage corresponds to user's qualification
  const getActiveStageNumber = () => {
    if (profile.qualification === "12th") return 1;
    if (profile.qualification === "UG pursuing") {
      if (profile.ugPursuingYear === "I") return 1;
      if (profile.ugPursuingYear === "II") return 2;
      if (profile.ugPursuingYear === "III") return 3;
      return 4;
    }
    if (profile.qualification === "UG") return 4;
    return 4;
  };

  const activeStage = getActiveStageNumber();

  return (
    <div className="max-w-5xl mx-auto space-y-8 py-4 px-4 sm:px-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-950/70 text-pink-300 text-xs font-semibold mb-2 border border-pink-700/40">
            <GitBranch className="w-3.5 h-3.5 text-pink-400" />
            <span>5-Year Action Trajectory</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white">
            Career Milestone Roadmap
          </h1>
          <p className="text-xs text-rose-200/70">
            Step-by-step technical progression from High School (Class 12) through college to Tier-1 recruitment.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/student/dashboard"
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-purple-950/60 hover:bg-purple-900/60 text-purple-200 border border-purple-800/40 text-xs font-semibold transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Dashboard</span>
          </Link>
          <Link
            href="/student/mentor"
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white text-xs font-bold shadow-md shadow-pink-600/30 transition-all"
          >
            <Bot className="w-4 h-4" />
            <span>Ask AI Mentor</span>
          </Link>
        </div>
      </div>

      {/* Qualification Recall Banner */}
      <div className="glass-card p-4 rounded-2xl border border-pink-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2.5">
          <GraduationCap className="w-4 h-4 text-pink-400 shrink-0" />
          <span className="text-rose-200/90">
            Personalized for:{" "}
            <strong className="text-white">
              {profile.qualification === "12th"
                ? `Class 12 • ${profile.twelfthGroup || "CS/Maths"}`
                : profile.qualification === "UG pursuing"
                ? `UG Pursuing Year ${profile.ugPursuingYear} • ${profile.ugPursuingCourse || "Engineering"}`
                : profile.qualification === "UG"
                ? `UG Graduate • ${profile.ugDegree || "B.Tech"} • CGPA: ${profile.ugCgpa}`
                : `PG • ${profile.pgCourse || "Master of Technology"}`}
            </strong>{" "}
            ({profile.state}, {profile.country})
          </span>
        </div>
        <button
          onClick={openProfileModal}
          className="text-pink-400 hover:text-pink-300 font-bold underline underline-offset-2 flex items-center gap-1 shrink-0"
        >
          <Sliders className="w-3.5 h-3.5" />
          <span>Switch Qualification</span>
        </button>
      </div>

      {/* Career Pathway Selector Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {careerOptions.map((opt) => (
          <button
            key={opt.slug}
            onClick={() => setSelectedCareer(opt.slug)}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all border ${
              selectedCareer === opt.slug
                ? "bg-gradient-to-r from-pink-600 to-purple-600 text-white border-pink-400 shadow-md shadow-pink-600/25"
                : "bg-purple-950/40 text-purple-300 border-purple-800/40 hover:bg-purple-900/40"
            }`}
          >
            <span>{opt.label}</span>
            <span className="ml-2 text-[10px] px-1.5 py-0.5 rounded-full bg-black/40 text-rose-200">
              {opt.tier}
            </span>
          </button>
        ))}
      </div>

      {loading || !roadmap ? (
        <div className="max-w-4xl mx-auto py-16 text-center space-y-4">
          <div className="w-10 h-10 border-4 border-pink-500 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs text-rose-200/70">Synthesizing Detailed Milestone Plan...</p>
        </div>
      ) : (
        <>
          {/* Top Degree Track & Advice */}
          <div className="glass-card p-6 rounded-2xl border border-pink-500/30 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-purple-900/40 pb-3">
              <span className="text-xs text-rose-200/70 font-semibold uppercase tracking-wider">
                Recommended Academic Route:
              </span>
              <span className="text-xs font-extrabold text-white bg-purple-950/80 px-3 py-1 rounded-full border border-purple-800/50">
                {roadmap.education_path}
              </span>
            </div>
            <p className="text-xs text-rose-100/90 leading-relaxed">
              💡 <strong>Strategy:</strong> {roadmap.personalized_advice}
            </p>
          </div>

          {/* Skill Gaps Breakdown */}
          {roadmap.skill_gaps && roadmap.skill_gaps.length > 0 && (
            <div className="glass-card p-6 rounded-2xl border border-purple-500/30 space-y-4">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-peach-400" />
                <h2 className="text-sm font-extrabold text-white">
                  Identified Priority Skill Gaps
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {roadmap.skill_gaps.map((sg, idx) => {
                  const targetLevel = (sg as { target_level?: number; required_level?: number }).target_level ??
                    (sg as { target_level?: number; required_level?: number }).required_level ??
                    90;
                  return (
                    <div key={idx} className="p-4 rounded-xl bg-purple-950/40 border border-purple-800/40 space-y-2">
                      <span className="text-xs font-bold text-white block truncate">{sg.skill}</span>
                      <div className="flex justify-between text-[11px] text-rose-200/70">
                        <span>Current: {sg.current_level}%</span>
                        <span className="text-pink-400 font-bold">Goal: {targetLevel}%</span>
                      </div>
                      <div className="w-full bg-purple-900/60 h-2 rounded-full overflow-hidden">
                        <div className="bg-pink-500 h-full rounded-full" style={{ width: `${sg.current_level}%` }} />
                      </div>
                      <span className="text-[10px] text-rose-300/60 block">Gap to close: {sg.gap}%</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Step-by-Step Stages Timeline */}
          <div className="space-y-4">
            <h2 className="text-lg font-black text-white flex items-center gap-2">
              <Clock className="w-5 h-5 text-pink-400" />
              <span>Multi-Stage Progression Milestones</span>
            </h2>

            <div className="space-y-4">
              {roadmap.stages && roadmap.stages.length > 0 ? (
                roadmap.stages.map((stage) => {
                  const isCurrentActive = stage.stage_number === activeStage;
                  return (
                    <div
                      key={stage.stage_number}
                      className={`glass-card p-6 rounded-2xl border transition-all space-y-3 ${
                        isCurrentActive
                          ? "border-pink-500 bg-[#1c0d29]/90 shadow-xl shadow-pink-950/40 ring-1 ring-pink-500/50"
                          : "border-purple-500/30 hover:border-purple-400/50"
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-purple-900/40 pb-3">
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-9 h-9 rounded-xl flex items-center justify-center text-xs font-black text-white ${
                              isCurrentActive
                                ? "bg-gradient-to-tr from-pink-600 to-rose-500 shadow-md shadow-pink-500/30"
                                : "bg-purple-950 text-purple-200 border border-purple-700/50"
                            }`}
                          >
                            #{stage.stage_number}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="text-sm font-extrabold text-white">
                                {stage.stage_name}
                              </h3>
                              {isCurrentActive && (
                                <span className="text-[9px] font-black uppercase tracking-wider bg-pink-500 text-white px-2 py-0.5 rounded-full">
                                  Your Current Stage
                                </span>
                              )}
                            </div>
                            <p className="text-[11px] text-rose-300/70">{stage.description}</p>
                          </div>
                        </div>
                        <span className="text-[10px] font-bold text-peach-300 bg-peach-950/60 px-2.5 py-1 rounded-full border border-peach-700/40 w-fit shrink-0">
                          {stage.estimated_duration}
                        </span>
                      </div>

                      {/* Stage Content Sub-Grids */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2 text-xs">
                        {/* Skills */}
                        {stage.skills_to_learn && stage.skills_to_learn.length > 0 && (
                          <div className="p-3 rounded-xl bg-purple-950/40 border border-purple-800/40 space-y-1.5">
                            <span className="text-[10px] font-bold text-rose-300/80 uppercase tracking-wider block">
                              Core Skills to Master:
                            </span>
                            <div className="flex flex-wrap gap-1.5">
                              {stage.skills_to_learn.map((sk, sIdx) => (
                                <span
                                  key={sIdx}
                                  className="px-2 py-0.5 rounded-md bg-purple-950 text-rose-100 text-[10px] border border-purple-700/40"
                                >
                                  {sk}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Projects */}
                        {stage.recommended_projects && stage.recommended_projects.length > 0 && (
                          <div className="p-3 rounded-xl bg-purple-950/40 border border-purple-800/40 space-y-1.5">
                            <span className="text-[10px] font-bold text-peach-300/80 uppercase tracking-wider block">
                              Recommended Projects:
                            </span>
                            <div className="space-y-1">
                              {stage.recommended_projects.map((proj, pIdx) => (
                                <div key={pIdx} className="flex items-start gap-1.5 text-[11px] text-rose-100/90">
                                  <Code className="w-3.5 h-3.5 text-peach-400 shrink-0 mt-0.5" />
                                  <span>{proj}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Exams & Milestones */}
                      {stage.exams_and_milestones && stage.exams_and_milestones.length > 0 && (
                        <div className="pt-2 flex flex-wrap items-center gap-2 text-[11px] text-rose-200/90">
                          <span className="text-[10px] font-bold text-pink-300/80 uppercase tracking-wider">
                            Target Milestones:
                          </span>
                          {stage.exams_and_milestones.map((ex, eIdx) => (
                            <span
                              key={eIdx}
                              className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-pink-950/60 text-pink-200 border border-pink-700/40"
                            >
                              <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                              {ex}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })
              ) : null}
            </div>
          </div>

          {/* Bottom Navigation */}
          <div className="flex items-center justify-between pt-4 border-t border-purple-900/40 text-xs">
            <Link
              href="/student/dashboard"
              className="text-purple-300 hover:text-pink-300 flex items-center gap-1.5"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Ranked Careers Dashboard</span>
            </Link>
            <Link
              href="/student/opportunities"
              className="text-pink-400 hover:text-pink-300 font-bold flex items-center gap-1.5"
            >
              <span>Explore Opportunities & Colleges</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </>
      )}
    </div>
  );
}

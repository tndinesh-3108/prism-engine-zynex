"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  MapPin, 
  Search, 
  Calendar, 
  ExternalLink, 
  ArrowLeft, 
  GraduationCap, 
  Sliders, 
  Sparkles, 
  Award, 
  Code, 
  Briefcase, 
  BookOpen 
} from "lucide-react";
import { useStudentProfile } from "@/lib/student-profile-context";
import { 
  COLLEGES_DATA, 
  JOBS_INTERNSHIPS_DATA, 
  HACKATHONS_DATA, 
  PROJECT_IDEAS_DATA, 
  CERTIFICATIONS_DATA, 
  STANDARDIZED_EXAMS_DATA,
  PG_TECHNICAL_QUESTIONS 
} from "@/lib/qualification-data";

export default function StudentOpportunitiesPage() {
  const { profile, openProfileModal } = useStudentProfile();
  const [selectedStateFilter, setSelectedStateFilter] = useState("All");
  const [selectedJobStatus, setSelectedJobStatus] = useState<"All" | "Present" | "Upcoming" | "Past">("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [showPgAnswers, setShowPgAnswers] = useState<Record<number, boolean>>({});

  // 12th Persona Filter logic
  const filteredColleges = COLLEGES_DATA.filter((col) => {
    // Group filter: if NEET or Bio/CS, show medical colleges too. If CS/Maths or IIT, show Engineering/IIT.
    const isMedGroup = profile.twelfthGroup === "NEET" || profile.twelfthGroup === "Bio/CS";
    const matchesCategory = isMedGroup
      ? col.category === "Medical" || col.category === "Engineering"
      : col.category === "Engineering" || col.category === "IIT";

    const matchesState = selectedStateFilter === "All" || col.state === selectedStateFilter;
    const matchesSearch = !searchQuery ||
      col.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      col.specialties.some(s => s.toLowerCase().includes(searchQuery.toLowerCase())) ||
      col.location.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesState && matchesSearch;
  });

  // Jobs / Internships Filter logic
  const filteredJobs = JOBS_INTERNSHIPS_DATA.filter((j) => {
    const matchesStatus = selectedJobStatus === "All" || j.status === selectedJobStatus;
    const matchesSearch = !searchQuery ||
      j.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      j.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      j.skills.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesStatus && matchesSearch;
  });

  // State options from colleges dataset
  const availableStates = ["All", ...Array.from(new Set(COLLEGES_DATA.map((c) => c.state)))];

  const isJuniorUG = profile.qualification === "UG pursuing" && (profile.ugPursuingYear === "I" || profile.ugPursuingYear === "II");
  const isSeniorUG = (profile.qualification === "UG pursuing" && (profile.ugPursuingYear === "III" || profile.ugPursuingYear === "IV")) || profile.qualification === "UG";
  const isPG = profile.qualification === "PG" || profile.qualification === "PG pursuing";

  return (
    <div className="max-w-6xl mx-auto space-y-8 py-4 px-4 sm:px-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-peach-950/70 text-peach-300 text-xs font-semibold mb-2 border border-peach-700/40">
            <MapPin className="w-3.5 h-3.5 text-peach-400" />
            <span>Targeted Opportunities Ecosystem</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white">
            {profile.qualification === "12th"
              ? "Premier Colleges & State Engineering Hubs"
              : isJuniorUG
              ? "Hackathons, Projects & Exam Tracking"
              : isSeniorUG
              ? "MNC Job Offers, Internships & Drives"
              : "Postgraduate R&D Roles & Technical Quiz"}
          </h1>
          <p className="text-xs text-rose-200/70">
            Dynamically customized for {profile.country} • {profile.state} based on your qualification profile.
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
          <button
            onClick={openProfileModal}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-pink-950/70 hover:bg-pink-900 text-pink-200 border border-pink-700/50 text-xs font-semibold transition-colors"
          >
            <Sliders className="w-3.5 h-3.5 text-pink-400" />
            <span>Switch Qualification</span>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* QUALIFICATION RECALL & CONTEXT BANNER                                    */}
      {/* ========================================================================= */}
      <div className="glass-card p-4 sm:p-5 rounded-2xl border border-pink-500/30 flex flex-col md:flex-row md:items-center justify-between gap-3 bg-gradient-to-r from-purple-950/50 via-[#180924] to-pink-950/40">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-pink-600 to-purple-600 text-white flex items-center justify-center shrink-0 shadow-md">
            <GraduationCap className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-black text-white">
                {profile.qualification === "12th"
                  ? `Class 12 • Stream: ${profile.twelfthGroup || "CS/Maths"}`
                  : profile.qualification === "UG pursuing"
                  ? `UG Pursuing • Year ${profile.ugPursuingYear} • ${profile.ugPursuingCourse || "Engineering"}`
                  : profile.qualification === "UG"
                  ? `UG Graduate • ${profile.ugDegree || "B.Tech"} • CGPA: ${profile.ugCgpa}`
                  : `Postgraduate Track • ${profile.pgCourse || "M.Tech AI"} (UG CGPA: ${profile.ugPassedCgpa})`}
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-pink-950 text-pink-300 border border-pink-700/40">
                {profile.state}, {profile.country}
              </span>
            </div>
            <p className="text-[11px] text-rose-200/80 mt-0.5">
              {profile.qualification === "12th"
                ? `Showing premier state-by-state engineering colleges tailored for 12th ${profile.twelfthGroup || "CS/Maths"} students.`
                : isJuniorUG
                ? `Recalling ${profile.ugPursuingCourse || "your course"}: Showing upcoming hackathons, project ideas, certifications with direct links, and AMCAT/SAT/IELTS/JLPT dates.`
                : isSeniorUG
                ? `Filtered for your CGPA (${profile.qualification === "UG" ? profile.ugCgpa : profile.ugPursuingCgpa}/10): Live Present, Upcoming, and Past placement drives.`
                : `Specialized R&D research opportunities and course-related questions for ${profile.pgCourse}.`}
            </p>
          </div>
        </div>

        <button
          onClick={openProfileModal}
          className="text-xs font-bold text-pink-400 hover:text-pink-300 underline underline-offset-2 shrink-0 self-start md:self-auto"
        >
          Change Stream / Year ➔
        </button>
      </div>

      {/* ========================================================================= */}
      {/* PERSONA 1: 12TH STD STUDENTS (STATE-WISE COLLEGES & ENTRANCE EXAMS)       */}
      {/* ========================================================================= */}
      {profile.qualification === "12th" && (
        <div className="space-y-6">
          {/* State Filter & Search Bar */}
          <div className="glass-card p-4 rounded-2xl border border-purple-500/30 flex flex-col md:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-thin">
              <span className="text-xs font-bold text-rose-300/80 uppercase tracking-wider shrink-0">
                Filter State:
              </span>
              {availableStates.map((st) => (
                <button
                  key={st}
                  onClick={() => setSelectedStateFilter(st)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all border ${
                    selectedStateFilter === st
                      ? "bg-gradient-to-r from-pink-600 to-purple-600 text-white border-pink-400 shadow-sm"
                      : "bg-purple-950/40 text-purple-300 border-purple-800/40 hover:bg-purple-900/40"
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>

            <div className="relative w-full md:w-64">
              <Search className="w-4 h-4 text-purple-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search college, city, specialty..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-purple-950/60 border border-purple-700/40 text-xs text-white placeholder-rose-300/40 focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
            </div>
          </div>

          {/* Colleges Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredColleges.map((col) => (
              <div
                key={col.id}
                className="glass-card p-5 rounded-2xl border border-purple-500/30 hover:border-pink-500/50 transition-all space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-pink-950 text-pink-300 border border-pink-700/40">
                      NIRF #{col.nirfRank} • {col.category}
                    </span>
                    <span className="text-xs font-extrabold text-emerald-400 font-mono">
                      Median: {col.medianPackage}
                    </span>
                  </div>

                  <h3 className="text-base font-extrabold text-white">{col.name}</h3>
                  <div className="flex items-center gap-2 text-[11px] text-rose-300/80">
                    <MapPin className="w-3.5 h-3.5 text-peach-400" />
                    <span>{col.location}</span>
                  </div>

                  {/* Cutoff & Entrance Pill */}
                  <div className="p-2.5 rounded-xl bg-purple-950/40 border border-purple-800/30 text-[11px] space-y-1 text-rose-200/90">
                    <div className="flex justify-between">
                      <span className="text-rose-300/70">Entrance Exam:</span>
                      <strong className="text-white">{col.entranceExam}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-rose-300/70">Cutoff Benchmark:</span>
                      <strong className="text-pink-300">{col.cutoffInfo}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-rose-300/70">Annual Tuition:</span>
                      <span className="font-mono text-peach-300 font-bold">{col.tuitionPerYear}</span>
                    </div>
                  </div>

                  {/* Specialties */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {col.specialties.map((spec, sIdx) => (
                      <span
                        key={sIdx}
                        className="px-2 py-0.5 rounded-md bg-purple-950 text-rose-100 text-[10px] border border-purple-800/40"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-purple-900/40 flex items-center justify-end">
                  <a
                    href={col.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-pink-600/30 hover:bg-pink-600 text-pink-200 hover:text-white text-xs font-bold transition-all border border-pink-500/40"
                  >
                    <span>Official Admissions Portal</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* PERSONA 2: UG PURSUING 1ST & 2ND YEAR (HACKATHONS, PROJECTS, EXAMS)        */}
      {/* ========================================================================= */}
      {isJuniorUG && (
        <div className="space-y-8">
          {/* Section 1: Standardized Exams: AMCAT, SAT, IELTS, JLPT */}
          <div className="glass-card p-6 rounded-3xl border border-peach-500/30 space-y-4">
            <div className="flex items-center justify-between border-b border-purple-900/40 pb-3">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-peach-400" />
                <div>
                  <h2 className="text-base font-extrabold text-white">
                    Standardized Career & Study Exams (AMCAT • SAT • IELTS • JLPT)
                  </h2>
                  <p className="text-[11px] text-rose-300/70">
                    Direct registration links displayed when booking slots are actively open.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {STANDARDIZED_EXAMS_DATA.map((exam) => (
                <div
                  key={exam.id}
                  className="p-4 rounded-2xl bg-purple-950/40 border border-purple-800/40 space-y-2 flex flex-col justify-between"
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black text-white">{exam.examName}</span>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                          exam.registrationStatus === "Open"
                            ? "bg-emerald-950 text-emerald-300 border-emerald-500/40"
                            : "bg-rose-950 text-rose-300 border-rose-500/40"
                        }`}
                      >
                        {exam.registrationStatus === "Open" ? "● Registrations Open" : "Closed / Window Awaited"}
                      </span>
                    </div>
                    <p className="text-[11px] font-bold text-pink-300">{exam.fullTitle}</p>
                    <p className="text-[11px] text-rose-200/80">{exam.notice}</p>
                    <p className="text-[10px] text-rose-300/60">Schedule: {exam.examDates}</p>
                  </div>

                  <div className="pt-2 border-t border-purple-900/30 flex items-center justify-end">
                    {/* Per user instruction: If registrations are open show the link, if not show nothing */}
                    {exam.registrationStatus === "Open" && exam.directRegistrationUrl ? (
                      <a
                        href={exam.directRegistrationUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-pink-600 hover:bg-pink-500 text-white text-xs font-bold shadow-md shadow-pink-600/30 transition-all"
                      >
                        <span>Register on Official Site</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    ) : (
                      <span className="text-[10px] text-rose-300/50 italic">
                        Registration link inactive until next window
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 2: Upcoming Hackathons */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-pink-400" />
              <h2 className="text-lg font-black text-white">Upcoming National & Global Hackathons</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {HACKATHONS_DATA.map((h) => (
                <div
                  key={h.id}
                  className="glass-card p-5 rounded-2xl border border-purple-500/30 hover:border-pink-500/40 transition-all space-y-3 flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-950 text-purple-300 border border-purple-700/40">
                        {h.mode}
                      </span>
                      <span className="text-xs font-extrabold text-emerald-400 font-mono">
                        {h.prizePool}
                      </span>
                    </div>
                    <h3 className="text-base font-extrabold text-white">{h.name}</h3>
                    <p className="text-xs text-rose-300/70 font-semibold">{h.organizer}</p>
                    <p className="text-[11px] text-rose-200/80">Dates: {h.dates}</p>

                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {h.tags.map((t, idx) => (
                        <span key={idx} className="px-2 py-0.5 rounded-md bg-purple-950 text-[10px] text-rose-200 border border-purple-800/40">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-purple-900/40 flex items-center justify-end">
                    <a
                      href={h.registrationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-pink-600/30 hover:bg-pink-600 text-pink-200 hover:text-white text-xs font-bold transition-all border border-pink-500/40"
                    >
                      <span>Direct Registration Link</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 3: Year-Tailored Project Ideas */}
          <div className="glass-card p-6 rounded-3xl border border-purple-500/30 space-y-4">
            <div className="flex items-center gap-2">
              <Code className="w-5 h-5 text-peach-400" />
              <div>
                <h2 className="text-base font-extrabold text-white">
                  Handcrafted Project Ideas for Year {profile.ugPursuingYear || "I/II"} Engineers
                </h2>
                <p className="text-[11px] text-rose-300/70">
                  Build these in your current semester to build a stellar portfolio before 3rd-year internships.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {PROJECT_IDEAS_DATA.filter((p) => p.yearTarget === "I" || p.yearTarget === "II").map((proj) => (
                <div key={proj.id} className="p-4 rounded-2xl bg-purple-950/40 border border-purple-800/40 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-peach-950 text-peach-300 border border-peach-700/40">
                      {proj.difficulty} • Year {proj.yearTarget}
                    </span>
                  </div>
                  <h3 className="text-sm font-extrabold text-white">{proj.title}</h3>
                  <p className="text-[11px] text-rose-200/80 leading-relaxed">{proj.description}</p>
                  <p className="text-[10px] text-emerald-300 font-semibold">
                    Learning Focus: {proj.learningOutcomes}
                  </p>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {proj.techStack.map((tech, idx) => (
                      <span key={idx} className="px-2 py-0.5 rounded-md bg-purple-950 text-[10px] text-purple-200 border border-purple-700/40 font-mono">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 4: Industry Certifications with Direct Verified Links */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-pink-400" />
              <h2 className="text-lg font-black text-white">Industry Certifications & Direct Links</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {CERTIFICATIONS_DATA.map((cert) => (
                <div
                  key={cert.id}
                  className="glass-card p-5 rounded-2xl border border-purple-500/30 hover:border-pink-500/40 transition-all space-y-3 flex flex-col justify-between"
                >
                  <div className="space-y-1.5">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-pink-950 text-pink-300 border border-pink-700/40">
                      {cert.level}
                    </span>
                    <h3 className="text-sm font-extrabold text-white">{cert.title}</h3>
                    <p className="text-xs text-purple-300 font-semibold">{cert.provider}</p>
                    <p className="text-[11px] text-rose-200/80">Key Skill: {cert.highlightSkill}</p>
                    <span className="text-[10px] text-rose-300/60 block">Est: {cert.estimatedWeeks}</span>
                  </div>

                  <a
                    href={cert.directUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2 px-3 rounded-xl bg-pink-600/30 hover:bg-pink-600 text-pink-200 hover:text-white text-xs font-bold flex items-center justify-center gap-1.5 border border-pink-500/40 transition-all"
                  >
                    <span>Direct Certificate Link</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* PERSONA 3: UG COMPLETED & UG 3RD/4TH YEAR (JOBS, INTERNSHIPS PAST/PRES/UP)*/}
      {/* ========================================================================= */}
      {isSeniorUG && (
        <div className="space-y-6">
          {/* Status Tabs: Present / Upcoming / Past */}
          <div className="glass-card p-4 rounded-2xl border border-purple-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-emerald-400" />
              <span className="text-xs font-bold text-white uppercase tracking-wider">
                Recruitment Phase:
              </span>
              <div className="flex items-center p-1 rounded-xl bg-purple-950/60 border border-purple-800/40 text-xs">
                {(["All", "Present", "Upcoming", "Past"] as const).map((st) => (
                  <button
                    key={st}
                    onClick={() => setSelectedJobStatus(st)}
                    className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                      selectedJobStatus === st
                        ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-sm"
                        : "text-purple-300/70 hover:text-white"
                    }`}
                  >
                    {st === "Present"
                      ? "● Present (Active Now)"
                      : st === "Upcoming"
                      ? "Upcoming (2026 Drives)"
                      : st === "Past"
                      ? "Past (Benchmarks)"
                      : "All Drives"}
                  </button>
                ))}
              </div>
            </div>

            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 text-purple-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search company, skills..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-purple-950/60 border border-purple-700/40 text-xs text-white placeholder-rose-300/40 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          {/* Jobs & Internships List */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredJobs.map((job) => {
              const userCgpa = profile.qualification === "UG" ? (profile.ugCgpa || 8.0) : (profile.ugPursuingCgpa || 8.0);
              const isEligible = userCgpa >= job.eligibilityCgpa;

              return (
                <div
                  key={job.id}
                  className="glass-card p-5 rounded-2xl border border-purple-500/30 hover:border-emerald-500/50 transition-all space-y-3 flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span
                          className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border ${
                            job.status === "Present"
                              ? "bg-emerald-950 text-emerald-300 border-emerald-500/40"
                              : job.status === "Upcoming"
                              ? "bg-amber-950 text-amber-300 border-amber-500/40"
                              : "bg-purple-950 text-purple-300 border-purple-700/40"
                          }`}
                        >
                          {job.status === "Present" ? "● Active Application" : job.status}
                        </span>
                        <span className="text-[10px] text-rose-300/70">{job.type}</span>
                      </div>
                      <span className="text-xs font-black text-emerald-400 font-mono">
                        {job.packageOrStipend}
                      </span>
                    </div>

                    <h3 className="text-base font-extrabold text-white">{job.title}</h3>
                    <p className="text-xs font-bold text-pink-300">{job.company}</p>

                    <div className="p-2.5 rounded-xl bg-purple-950/40 border border-purple-800/30 text-[11px] space-y-1 text-rose-200/90">
                      <div className="flex justify-between">
                        <span className="text-rose-300/70">Location:</span>
                        <span>{job.location}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-rose-300/70">Required CGPA:</span>
                        <span className={isEligible ? "text-emerald-300 font-bold" : "text-rose-400 font-bold"}>
                          {job.eligibilityCgpa}+ (You: {userCgpa} - {isEligible ? "Eligible ✓" : "Below Cutoff"})
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-rose-300/70">Deadline / Drive:</span>
                        <span className="font-semibold text-white">{job.deadline}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {job.skills.map((sk, sIdx) => (
                        <span key={sIdx} className="px-2 py-0.5 rounded-md bg-purple-950 text-[10px] text-rose-100 border border-purple-800/40">
                          {sk}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-purple-900/40 flex items-center justify-between">
                    <span className="text-[10px] text-rose-300/60">{job.sourceNotice}</span>
                    <a
                      href={job.applicationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600/30 hover:bg-emerald-600 text-emerald-200 hover:text-white text-xs font-bold transition-all border border-emerald-500/40"
                    >
                      <span>Apply Now</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* PERSONA 4: PG & PG PURSUING (R&D JOBS, MNC QUIZ, COURSE QUESTIONS)        */}
      {/* ========================================================================= */}
      {isPG && (
        <div className="space-y-8">
          {/* Section 1: Specialized Postgraduate R&D Roles */}
          <div className="glass-card p-6 rounded-3xl border border-purple-500/30 space-y-4">
            <div className="flex items-center justify-between border-b border-purple-900/40 pb-3">
              <div className="flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-purple-400" />
                <h2 className="text-base font-extrabold text-white">
                  Specialized R&D & Advanced Engineering Openings for {profile.pgCourse}
                </h2>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-950 text-purple-300 border border-purple-700/40">
                Tier-1 Research Labs
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-purple-950/40 border border-purple-800/40 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-white">AI Research Scientist (Foundations)</span>
                  <span className="text-xs font-mono text-emerald-400 font-bold">₹45 LPA – ₹65 LPA</span>
                </div>
                <p className="text-xs text-pink-300 font-semibold">Microsoft Research Lab (Bangalore)</p>
                <p className="text-[11px] text-rose-200/80">
                  Focus on LLM alignment, multimodal diffusion models, and efficient inference. Minimum M.Tech / MS required.
                </p>
                <div className="pt-2 flex justify-end">
                  <a href="https://careers.microsoft.com" target="_blank" rel="noreferrer" className="text-xs text-pink-400 hover:underline flex items-center gap-1 font-bold">
                    <span>Research Application Portal</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-purple-950/40 border border-purple-800/40 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-white">Autonomous Robotics & Sensor Fusion Lead</span>
                  <span className="text-xs font-mono text-emerald-400 font-bold">₹38 LPA – ₹52 LPA</span>
                </div>
                <p className="text-xs text-pink-300 font-semibold">Mercedes-Benz R&D India (MBRDI)</p>
                <p className="text-[11px] text-rose-200/80">
                  Perception pipeline optimization, ROS2, and real-time GPU embedded acceleration.
                </p>
                <div className="pt-2 flex justify-end">
                  <a href="https://mbrdi.co.in" target="_blank" rel="noreferrer" className="text-xs text-pink-400 hover:underline flex items-center gap-1 font-bold">
                    <span>R&D Careers Portal</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Course-Specific Technical Interview Quiz */}
          <div className="glass-card p-6 rounded-3xl border border-pink-500/30 space-y-4">
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-pink-400" />
              <div>
                <h2 className="text-base font-extrabold text-white">
                  Postgraduate Technical Interview Questions & MNC Quiz ({profile.pgCourse})
                </h2>
                <p className="text-[11px] text-rose-300/70">
                  Test your mastery of advanced algorithms, distributed systems, and modern AI architectures.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {PG_TECHNICAL_QUESTIONS.map((q, idx) => {
                const isRevealed = !!showPgAnswers[idx];
                return (
                  <div key={q.id} className="p-4 rounded-2xl bg-purple-950/40 border border-purple-800/40 space-y-3">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-2">
                        <span className="w-5 h-5 rounded-md bg-pink-500/20 text-pink-300 font-bold text-xs flex items-center justify-center shrink-0">
                          {idx + 1}
                        </span>
                        <h3 className="text-xs font-extrabold text-white leading-relaxed">{q.question}</h3>
                      </div>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-900 text-purple-300 border border-purple-700/40 shrink-0">
                        {q.domain}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs pt-1">
                      {q.options.map((opt, oIdx) => (
                        <div
                          key={oIdx}
                          className={`p-2.5 rounded-xl border text-[11px] transition-all ${
                            isRevealed && oIdx === q.correctIndex
                              ? "bg-emerald-950/80 border-emerald-500 text-emerald-200 font-bold"
                              : "bg-purple-950/50 border-purple-800/30 text-rose-200/80"
                          }`}
                        >
                          <span className="font-mono text-purple-400 mr-1.5">{String.fromCharCode(65 + oIdx)}.</span>
                          <span>{opt}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex justify-end pt-1">
                      <button
                        type="button"
                        onClick={() =>
                          setShowPgAnswers((prev) => ({ ...prev, [idx]: !prev[idx] }))
                        }
                        className="text-[11px] font-bold text-pink-400 hover:text-pink-300 underline underline-offset-2"
                      >
                        {isRevealed ? "Hide Correct Answer" : "Reveal Verified Technical Answer ➔"}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

"use client";

import React, { useState, useEffect } from "react";
import { 
  GraduationCap, 
  MapPin, 
  Globe, 
  BookOpen, 
  Award, 
  CheckCircle2, 
  X, 
  ArrowRight,
  School,
  Layers,
  Zap
} from "lucide-react";
import { 
  useStudentProfile, 
  QualificationType, 
  TwelfthGroupType, 
  UGPursuingYear 
} from "@/lib/student-profile-context";

const INDIAN_STATES = [
  "Tamil Nadu",
  "Karnataka",
  "Maharashtra",
  "Delhi NCR",
  "Telangana",
  "Uttar Pradesh",
  "Kerala",
  "Andhra Pradesh",
  "West Bengal",
  "Gujarat",
  "Rajasthan",
  "Madhya Pradesh",
  "Punjab",
  "Haryana",
  "Odisha",
  "Bihar",
  "Other State / UT",
];

const COUNTRIES = [
  "India",
  "United States",
  "United Kingdom",
  "Canada",
  "Germany",
  "Singapore",
  "Australia",
  "Other",
];

export default function QualificationOnboardingModal() {
  const { profile, isModalOpen, closeProfileModal, updateProfile } = useStudentProfile();

  const [country, setCountry] = useState(profile.country || "India");
  const [state, setState] = useState(profile.state || "Tamil Nadu");
  const [qualification, setQualification] = useState<QualificationType>(profile.qualification || "12th");
  const [twelfthGroup, setTwelfthGroup] = useState<TwelfthGroupType>(profile.twelfthGroup || "CS/Maths");
  const [ugCgpa, setUgCgpa] = useState<number>(profile.ugCgpa || 8.5);
  const [ugDegree, setUgDegree] = useState(profile.ugDegree || "B.Tech Computer Science & Engineering");
  const [ugPursuingYear, setUgPursuingYear] = useState<UGPursuingYear>(profile.ugPursuingYear || "II");
  const [ugPursuingCourse, setUgPursuingCourse] = useState(
    profile.ugPursuingCourse || "B.Tech in Artificial Intelligence & Data Science"
  );
  const [ugPursuingCgpa, setUgPursuingCgpa] = useState<number>(profile.ugPursuingCgpa || 8.7);
  const [ugPassedCgpa, setUgPassedCgpa] = useState<number>(profile.ugPassedCgpa || 8.4);
  const [pgCourse, setPgCourse] = useState(profile.pgCourse || "M.Tech in Machine Learning & AI");

  // Sync state when profile changes externally
  useEffect(() => {
    setCountry(profile.country || "India");
    setState(profile.state || "Tamil Nadu");
    setQualification(profile.qualification || "12th");
    setTwelfthGroup(profile.twelfthGroup || "CS/Maths");
    setUgCgpa(profile.ugCgpa || 8.5);
    setUgDegree(profile.ugDegree || "B.Tech Computer Science & Engineering");
    setUgPursuingYear(profile.ugPursuingYear || "II");
    setUgPursuingCourse(profile.ugPursuingCourse || "B.Tech in Artificial Intelligence & Data Science");
    setUgPursuingCgpa(profile.ugPursuingCgpa || 8.7);
    setUgPassedCgpa(profile.ugPassedCgpa || 8.4);
    setPgCourse(profile.pgCourse || "M.Tech in Machine Learning & AI");
  }, [profile]);

  if (!isModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      country,
      state,
      qualification,
      twelfthGroup,
      ugCgpa,
      ugDegree,
      ugPursuingYear,
      ugPursuingCourse,
      ugPursuingCgpa,
      ugPassedCgpa,
      pgCourse,
    });
  };

  const applyPreset = (preset: "12th" | "ug-junior" | "ug-senior" | "pg") => {
    if (preset === "12th") {
      setCountry("India");
      setState("Tamil Nadu");
      setQualification("12th");
      setTwelfthGroup("CS/Maths");
    } else if (preset === "ug-junior") {
      setCountry("India");
      setState("Tamil Nadu");
      setQualification("UG pursuing");
      setUgPursuingYear("II");
      setUgPursuingCourse("B.Tech in Artificial Intelligence & Data Science");
      setUgPursuingCgpa(8.8);
    } else if (preset === "ug-senior") {
      setCountry("India");
      setState("Karnataka");
      setQualification("UG");
      setUgDegree("B.Tech Computer Science");
      setUgCgpa(8.5);
    } else if (preset === "pg") {
      setCountry("India");
      setState("Tamil Nadu");
      setQualification("PG pursuing");
      setUgPassedCgpa(8.6);
      setPgCourse("M.Tech in Machine Learning & Autonomous Systems");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-[#12071d] border-2 border-pink-500/50 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-purple-950/80 my-8 text-white space-y-6">
        {/* Close Button */}
        <button
          onClick={closeProfileModal}
          className="absolute top-5 right-5 p-2 rounded-xl text-rose-300/70 hover:text-white hover:bg-purple-950/60 transition-colors"
          aria-label="Close Modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-950/80 text-pink-300 text-xs font-semibold border border-pink-700/50">
            <GraduationCap className="w-3.5 h-3.5 text-pink-400" />
            <span>Student Qualification Customization Engine</span>
          </div>
          <h2 className="text-2xl font-black text-white">
            Set Your Academic Qualification
          </h2>
          <p className="text-xs text-rose-200/75">
            PRISM personalizes your opportunities, college databases, MNC job drives, and aptitude questions to match your exact education level.
          </p>
        </div>

        {/* Quick Demo Preset Chips */}
        <div className="space-y-1.5">
          <span className="text-[10px] font-bold text-rose-300/70 uppercase tracking-wider flex items-center gap-1">
            <Zap className="w-3 h-3 text-peach-400" />
            <span>Quick Test Presets (1-Click Switch):</span>
          </span>
          <div className="flex flex-wrap gap-2 text-xs">
            <button
              type="button"
              onClick={() => applyPreset("12th")}
              className="px-2.5 py-1 rounded-lg bg-purple-950/60 hover:bg-pink-950 text-pink-300 border border-pink-600/40 text-[11px] font-semibold transition-colors"
            >
              Class 12 (CS/Maths)
            </button>
            <button
              type="button"
              onClick={() => applyPreset("ug-junior")}
              className="px-2.5 py-1 rounded-lg bg-purple-950/60 hover:bg-peach-950 text-peach-300 border border-peach-600/40 text-[11px] font-semibold transition-colors"
            >
              UG Pursuing (Year II)
            </button>
            <button
              type="button"
              onClick={() => applyPreset("ug-senior")}
              className="px-2.5 py-1 rounded-lg bg-purple-950/60 hover:bg-rose-950 text-rose-300 border border-rose-600/40 text-[11px] font-semibold transition-colors"
            >
              UG Completed (Graduate)
            </button>
            <button
              type="button"
              onClick={() => applyPreset("pg")}
              className="px-2.5 py-1 rounded-lg bg-purple-950/60 hover:bg-purple-900 text-purple-200 border border-purple-600/40 text-[11px] font-semibold transition-colors"
            >
              PG Pursuing (M.Tech)
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Step 1: Country & State */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-rose-200 flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-pink-400" />
                <span>Country</span>
              </label>
              <select
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-purple-950/60 border border-purple-700/50 text-white text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-pink-500"
              >
                {COUNTRIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-rose-200 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-peach-400" />
                <span>State / Province</span>
              </label>
              {country === "India" ? (
                <select
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-purple-950/60 border border-purple-700/50 text-white text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-pink-500"
                >
                  {INDIAN_STATES.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type="text"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  placeholder="e.g. California, Ontario, Bavaria"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-purple-950/60 border border-purple-700/50 text-white text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
              )}
            </div>
          </div>

          {/* Step 2: Qualification Selector */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-rose-200 flex items-center gap-1.5">
              <School className="w-3.5 h-3.5 text-pink-400" />
              <span>Current Qualification</span>
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              {(
                [
                  { key: "12th", label: "12th Std" },
                  { key: "UG pursuing", label: "UG Pursuing" },
                  { key: "UG", label: "UG Completed" },
                  { key: "PG pursuing", label: "PG Pursuing" },
                  { key: "PG", label: "PG Completed" },
                ] as const
              ).map((q) => (
                <button
                  key={q.key}
                  type="button"
                  onClick={() => setQualification(q.key)}
                  className={`py-2 px-2 rounded-xl text-xs font-bold transition-all border ${
                    qualification === q.key
                      ? "bg-gradient-to-r from-pink-600 to-purple-600 text-white border-pink-400 shadow-md shadow-pink-600/30"
                      : "bg-purple-950/40 text-purple-200/80 border-purple-800/40 hover:bg-purple-900/50"
                  }`}
                >
                  {q.label}
                </button>
              ))}
            </div>
          </div>

          {/* Step 3: DYNAMIC SUB-QUESTIONS BASED ON QUALIFICATION */}

          {/* Persona A: 12th Std */}
          {qualification === "12th" && (
            <div className="p-4 rounded-2xl bg-purple-950/40 border border-pink-500/30 space-y-3">
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-pink-400" />
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-pink-300">
                  Select Your 12th Group / Stream
                </h3>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                {(["Bio/Maths", "CS/Maths", "Bio/CS", "IIT", "NEET"] as const).map((grp) => (
                  <button
                    key={grp}
                    type="button"
                    onClick={() => setTwelfthGroup(grp)}
                    className={`py-2 px-1.5 rounded-xl text-xs font-bold transition-all border ${
                      twelfthGroup === grp
                        ? "bg-pink-600 text-white border-pink-300 shadow-sm"
                        : "bg-purple-950/60 text-rose-200/80 border-purple-800/50 hover:bg-purple-900/40"
                    }`}
                  >
                    {grp}
                  </button>
                ))}
              </div>
              <p className="text-[11px] text-rose-200/80 leading-relaxed pt-1">
                {twelfthGroup === "CS/Maths" || twelfthGroup === "Bio/Maths"
                  ? "✓ Your portal will rank top engineering colleges in each state of the country (IITs, NITs, Premier State Universities) with 12th-level aptitude questions."
                  : twelfthGroup === "IIT"
                  ? "✓ Focuses on JEE Advanced engineering benchmarks across premier Indian IITs."
                  : "✓ Highlights premier medical, bio-tech, and clinical institutions (AIIMS, CMC, JIPMER)."}
              </p>
            </div>
          )}

          {/* Persona B: UG Completed */}
          {qualification === "UG" && (
            <div className="p-4 rounded-2xl bg-purple-950/40 border border-emerald-500/40 space-y-4">
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-emerald-400" />
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-emerald-300">
                  UG Graduate Performance Details
                </h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[11px] text-rose-200 font-semibold">Graduation CGPA (Scale of 10.0)</label>
                  <input
                    type="number"
                    step="0.1"
                    min="4.0"
                    max="10.0"
                    value={ugCgpa}
                    onChange={(e) => setUgCgpa(Number(e.target.value))}
                    className="w-full px-3.5 py-2 rounded-xl bg-purple-950/70 border border-purple-700/50 text-white text-xs font-mono font-bold focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] text-rose-200 font-semibold">Degree & Department</label>
                  <input
                    type="text"
                    value={ugDegree}
                    onChange={(e) => setUgDegree(e.target.value)}
                    placeholder="e.g. B.Tech Computer Science"
                    className="w-full px-3.5 py-2 rounded-xl bg-purple-950/70 border border-purple-700/50 text-white text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>
              <p className="text-[11px] text-emerald-200/90">
                ✓ Displays live MNC job offers & off-campus drives (Past / Present / Upcoming) filtered for CGPA {ugCgpa}+ with placement-level MNC aptitude tests.
              </p>
            </div>
          )}

          {/* Persona C: UG Pursuing */}
          {qualification === "UG pursuing" && (
            <div className="p-4 rounded-2xl bg-purple-950/40 border border-peach-500/40 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Layers className="w-4 h-4 text-peach-400" />
                  <h3 className="text-xs font-extrabold uppercase tracking-wider text-peach-300">
                    UG Pursuing Progress Details
                  </h3>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-peach-950 text-peach-300 border border-peach-700/40">
                  Year {ugPursuingYear}
                </span>
              </div>

              {/* Year Selector */}
              <div className="space-y-1.5">
                <label className="text-[11px] text-rose-200 font-semibold">Current Academic Year of Study</label>
                <div className="grid grid-cols-4 gap-2">
                  {(["I", "II", "III", "IV"] as const).map((yr) => (
                    <button
                      key={yr}
                      type="button"
                      onClick={() => setUgPursuingYear(yr)}
                      className={`py-2 rounded-xl text-xs font-bold transition-all border ${
                        ugPursuingYear === yr
                          ? "bg-peach-600 text-white border-peach-300 shadow-sm"
                          : "bg-purple-950/60 text-rose-200/80 border-purple-800/50 hover:bg-purple-900/40"
                      }`}
                    >
                      Year {yr}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[11px] text-rose-200 font-semibold">Course / Degree Pursued</label>
                  <input
                    type="text"
                    value={ugPursuingCourse}
                    onChange={(e) => setUgPursuingCourse(e.target.value)}
                    placeholder="e.g. B.Tech Computer Science & AI"
                    className="w-full px-3.5 py-2 rounded-xl bg-purple-950/70 border border-purple-700/50 text-white text-xs focus:outline-none focus:ring-2 focus:ring-peach-500"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] text-rose-200 font-semibold">Current CGPA (Scale of 10.0)</label>
                  <input
                    type="number"
                    step="0.1"
                    min="4.0"
                    max="10.0"
                    value={ugPursuingCgpa}
                    onChange={(e) => setUgPursuingCgpa(Number(e.target.value))}
                    className="w-full px-3.5 py-2 rounded-xl bg-purple-950/70 border border-purple-700/50 text-white text-xs font-mono font-bold focus:outline-none focus:ring-2 focus:ring-peach-500"
                  />
                </div>
              </div>

              <p className="text-[11px] text-rose-200/80 leading-relaxed">
                {ugPursuingYear === "I" || ugPursuingYear === "II"
                  ? "✓ For 1st/2nd Year: Displays Upcoming Hackathons, Project Ideas, Industry Certifications with direct links, and Standardized Exams (AMCAT, SAT, IELTS, JLPT) with course recall."
                  : "✓ For 3rd/4th Year: Displays Hackathons, active Internships & Placement Job Offers (Past / Present / Upcoming) with MNC placement aptitude tests."}
              </p>
            </div>
          )}

          {/* Persona D: PG / PG Pursuing */}
          {(qualification === "PG" || qualification === "PG pursuing") && (
            <div className="p-4 rounded-2xl bg-purple-950/40 border border-purple-500/40 space-y-4">
              <div className="flex items-center gap-2">
                <School className="w-4 h-4 text-purple-300" />
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-purple-200">
                  Postgraduate Track Details
                </h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[11px] text-rose-200 font-semibold">UG Passed Out CGPA (Scale of 10.0)</label>
                  <input
                    type="number"
                    step="0.1"
                    min="4.0"
                    max="10.0"
                    value={ugPassedCgpa}
                    onChange={(e) => setUgPassedCgpa(Number(e.target.value))}
                    className="w-full px-3.5 py-2 rounded-xl bg-purple-950/70 border border-purple-700/50 text-white text-xs font-mono font-bold focus:outline-none focus:ring-2 focus:ring-purple-400"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] text-rose-200 font-semibold">PG Degree & Field</label>
                  <input
                    type="text"
                    value={pgCourse}
                    onChange={(e) => setPgCourse(e.target.value)}
                    placeholder="e.g. M.Tech Machine Learning / MS AI"
                    className="w-full px-3.5 py-2 rounded-xl bg-purple-950/70 border border-purple-700/50 text-white text-xs focus:outline-none focus:ring-2 focus:ring-purple-400"
                  />
                </div>
              </div>
              <p className="text-[11px] text-purple-200/90">
                ✓ Displays Specialized R&D Job Opportunities, Advanced MNC Quizzes, and Course-Specific Technical Interview questions for {pgCourse}.
              </p>
            </div>
          )}

          {/* Submit Action */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-pink-600 via-rose-500 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white font-extrabold text-sm shadow-lg shadow-pink-600/30 flex items-center justify-center gap-2 transition-all"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-300" />
              <span>Apply Academic Profile & Refresh Student Portal</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

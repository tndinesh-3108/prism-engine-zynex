"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { 
  Compass, 
  ArrowRight, 
  ArrowLeft, 
  Sparkles, 
  Brain, 
  Sliders, 
  Check,
  GraduationCap,
  RotateCcw
} from "lucide-react";
import { createStudent, submitAssessment } from "@/lib/api";
import { useStudentParentFlow } from "@/lib/student-parent-flow";
import { useStudentProfile } from "@/lib/student-profile-context";
import {
  TWELFTH_APTITUDE_QUESTIONS,
  UG_JUNIOR_APTITUDE_QUESTIONS,
  UG_SENIOR_APTITUDE_QUESTIONS,
  PG_TECHNICAL_QUESTIONS
} from "@/lib/qualification-data";

export default function StudentAssessmentPage() {
  const router = useRouter();
  const { completeAptitudeTest } = useStudentParentFlow();
  const { profile, openProfileModal } = useStudentProfile();
  const [currentStep, setCurrentStep] = useState<1 | 2>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Active question bank
  const getActiveQuestionBank = () => {
    if (profile.qualification === "12th") {
      return {
        title: "12th Standard Aptitude Battery",
        subtitle: "Kinematics, algebra, geometry, and logical reasoning.",
        badge: "12th Standard",
        questions: TWELFTH_APTITUDE_QUESTIONS,
      };
    }
    if (profile.qualification === "UG pursuing" && (profile.ugPursuingYear === "I" || profile.ugPursuingYear === "II")) {
      return {
        title: "Foundational MNC Aptitude",
        subtitle: "Syllogisms, relations, patterns, and core logic.",
        badge: "Junior UG",
        questions: UG_JUNIOR_APTITUDE_QUESTIONS,
      };
    }
    if (profile.qualification === "UG" || (profile.qualification === "UG pursuing" && (profile.ugPursuingYear === "III" || profile.ugPursuingYear === "IV"))) {
      return {
        title: "MNC Placement Battery",
        subtitle: "Quantitative speed, logic, and algorithm analysis.",
        badge: "UG Placement",
        questions: UG_SENIOR_APTITUDE_QUESTIONS,
      };
    }
    return {
      title: "Postgraduate Technical Battery",
      subtitle: `Advanced computing, systems, and reasoning for ${profile.pgCourse || "specialization"}.`,
      badge: "PG Track",
      questions: PG_TECHNICAL_QUESTIONS,
    };
  };

  const activeQuestionData = getActiveQuestionBank();

  // Aptitude Answers: Starts strictly empty/unsolved
  const [aptitudeAnswers, setAptitudeAnswers] = useState<Record<number, number>>({});

  useEffect(() => {
    setAptitudeAnswers({});
  }, [profile.qualification, profile.ugPursuingYear]);

  // Step 2: Self-Assessed Competency Skills Matrix
  const [skills, setSkills] = useState<Record<string, number>>({
    Programming: 90,
    Mathematics: 88,
    "Analytical Thinking": 85,
    "Problem Solving": 89,
    Research: 80,
    Communication: 75,
  });

  const handleOptionSelect = (qId: number, optIndex: number) => {
    setAptitudeAnswers((prev) => ({ ...prev, [qId]: optIndex }));
  };

  const handleClearAllAnswers = () => {
    setAptitudeAnswers({});
  };

  const answeredCount = Object.keys(aptitudeAnswers).length;
  const totalQuestions = activeQuestionData.questions.length;
  const progressPercent = Math.round((answeredCount / totalQuestions) * 100);

  const handleSubmitAll = async () => {
    setIsSubmitting(true);
    try {
      const studentPayload = {
        name: "Arun Kumar",
        age: profile.qualification === "12th" ? 17 : profile.qualification.includes("UG") ? 20 : 23,
        class_grade: profile.qualification === "12th"
          ? `12th Grade (${profile.twelfthGroup || "CS/Maths"})`
          : profile.qualification === "UG pursuing"
          ? `UG Pursuing Year ${profile.ugPursuingYear}`
          : profile.qualification === "UG"
          ? "UG Completed"
          : "Postgraduate Track",
        location: `${profile.state}, ${profile.country}`,
        academic_stream: profile.qualification === "12th"
          ? `Science (${profile.twelfthGroup || "PCM"})`
          : profile.qualification.includes("UG")
          ? (profile.ugPursuingCourse || profile.ugDegree || "Computer Science")
          : (profile.pgCourse || "M.Tech AI"),
        academic_score: profile.qualification === "12th" ? 88 : profile.ugCgpa ? profile.ugCgpa * 10 : 85,
      };

      try {
        await createStudent(studentPayload);
      } catch (e) {
        console.warn("Student creation fallback:", e);
      }

      let correctCount = 0;
      activeQuestionData.questions.forEach((q) => {
        const correct = (q as { correctIndex?: number; correct?: number }).correctIndex ?? (q as { correctIndex?: number; correct?: number }).correct ?? 0;
        if (aptitudeAnswers[q.id] === correct) {
          correctCount++;
        }
      });
      const calculatedAptitudeScore = Math.max(10, Math.round((correctCount / totalQuestions) * 100));

      const defaultInterests = profile.qualification === "12th"
        ? ["Applied Mathematics", "Physics & Electronics", "Computer Science", "Artificial Intelligence"]
        : profile.qualification === "PG"
        ? ["Machine Learning Systems", "Distributed Systems", "Cloud Architecture", "Applied Research"]
        : ["Software Engineering", "Artificial Intelligence", "Algorithms & Optimization", "Cloud Computing"];

      const assessmentPayload = {
        student_id: 1,
        aptitude_score: calculatedAptitudeScore,
        interests: defaultInterests,
        skills,
      };

      try {
        await submitAssessment(assessmentPayload);
      } catch (e) {
        console.warn("Assessment submittal fallback:", e);
      }

      completeAptitudeTest();
      router.push("/student/career-dna");
    } catch (err) {
      console.error("Submission error:", err);
      completeAptitudeTest();
      router.push("/student/career-dna");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 py-4 px-4 sm:px-6">
      {/* Header */}
      <div className="space-y-1">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-pink-950/70 text-pink-300 text-xs font-semibold border border-pink-700/40">
          <Compass className="w-3 h-3 text-pink-400" />
          <span>Stage 2 • Aptitude Discovery</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
          Aptitude & Skills Assessment
        </h1>
        <p className="text-xs text-rose-200/70">
          Answer the 15 questions and evaluate your core competencies.
        </p>
      </div>

      {/* Qualification Recall Bar */}
      <div className="glass-card p-3 rounded-xl border border-pink-500/20 flex items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          <GraduationCap className="w-3.5 h-3.5 text-pink-400 shrink-0" />
          <span className="text-rose-200/80">
            {profile.qualification === "12th"
              ? `12th Grade (${profile.twelfthGroup || "CS/Maths"})`
              : profile.qualification === "UG pursuing"
              ? `UG Year ${profile.ugPursuingYear}`
              : profile.qualification === "UG"
              ? `UG Graduate (${profile.ugDegree || "B.Tech"})`
              : `Postgraduate`}
            {" • "}
            <span className="text-pink-300 font-semibold">{activeQuestionData.badge}</span>
          </span>
        </div>
        <button
          onClick={openProfileModal}
          className="text-pink-400 hover:text-pink-300 font-medium underline underline-offset-2 flex items-center gap-1 shrink-0"
        >
          <Sliders className="w-3 h-3" />
          <span>Change</span>
        </button>
      </div>

      {/* 2-Step Tabs */}
      <div className="grid grid-cols-2 gap-3">
        {[
          { 
            num: 1 as const, 
            label: "1. Aptitude Test", 
            sub: `${answeredCount}/${totalQuestions} answered`, 
            icon: Brain 
          },
          { 
            num: 2 as const, 
            label: "2. Skills Matrix", 
            sub: "6 Dimensions", 
            icon: Sliders 
          },
        ].map((s) => {
          const Icon = s.icon;
          const isActive = currentStep === s.num;
          const isPassed = currentStep > s.num;
          return (
            <button
              key={s.num}
              type="button"
              onClick={() => setCurrentStep(s.num)}
              className={`p-3 rounded-xl border text-left transition-all ${
                isActive
                  ? "bg-pink-950/40 border-pink-500/80 shadow-sm"
                  : isPassed
                  ? "bg-purple-950/30 border-purple-800/40 text-rose-300"
                  : "bg-purple-950/15 border-purple-900/20 text-rose-400/50"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <div className={`p-1.5 rounded-lg shrink-0 ${
                  isActive ? "bg-pink-500/20 text-pink-300" : isPassed ? "bg-emerald-500/20 text-emerald-300" : "bg-purple-900/30 text-purple-400/50"
                }`}>
                  <Icon className="w-3.5 h-3.5" />
                </div>
                <div>
                  <span className="text-xs sm:text-sm font-bold text-white block">{s.label}</span>
                  <p className="text-[10px] text-rose-300/60">{s.sub}</p>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* STEP 1: 15-QUESTION APTITUDE TEST */}
      {currentStep === 1 && (
        <div className="glass-card p-5 sm:p-6 rounded-2xl border border-pink-500/20 space-y-5">
          {/* Tracker */}
          <div className="flex items-center justify-between gap-3 text-xs bg-purple-950/30 p-2.5 rounded-xl border border-purple-800/25">
            <div className="flex items-center gap-2.5">
              <div className="w-24 sm:w-32 h-1.5 bg-purple-900/60 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-pink-500 to-rose-400 rounded-full transition-all duration-300" 
                  style={{ width: `${progressPercent}%` }} 
                />
              </div>
              <span className="font-semibold text-white">
                {answeredCount} / {totalQuestions} Answered
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[11px] text-rose-300/70">
                {totalQuestions - answeredCount > 0 ? `${totalQuestions - answeredCount} unsolved` : "All solved"}
              </span>
              {answeredCount > 0 && (
                <button
                  type="button"
                  onClick={handleClearAllAnswers}
                  className="text-[11px] text-rose-300 hover:text-white flex items-center gap-1 underline underline-offset-2 ml-1"
                >
                  <RotateCcw className="w-2.5 h-2.5" />
                  <span>Reset</span>
                </button>
              )}
            </div>
          </div>

          {/* 15 Questions */}
          <div className="space-y-4">
            {activeQuestionData.questions.map((q, idx) => {
              const isAnswered = aptitudeAnswers[q.id] !== undefined;
              return (
                <div
                  key={q.id}
                  className={`p-4 rounded-xl transition-all border ${
                    isAnswered
                      ? "bg-purple-950/30 border-pink-500/25"
                      : "bg-purple-950/15 border-purple-900/20"
                  }`}
                >
                  <div className="flex items-start justify-between gap-2.5 mb-2.5">
                    <div className="flex items-start gap-2">
                      <span className={`w-5 h-5 rounded font-bold text-[11px] flex items-center justify-center shrink-0 ${
                        isAnswered ? "bg-pink-600 text-white" : "bg-purple-900/40 text-purple-300 border border-purple-800/30"
                      }`}>
                        {idx + 1}
                      </span>
                      <h3 className="text-xs sm:text-sm font-semibold text-white leading-snug">
                        {q.question}
                      </h3>
                    </div>

                    <div className="flex items-center gap-1 shrink-0 text-[10px]">
                      <span className="px-1.5 py-0.5 rounded bg-purple-900/50 text-purple-300 border border-purple-800/30">
                        {q.domain}
                      </span>
                      {isAnswered ? (
                        <span className="px-1.5 py-0.5 rounded bg-pink-950 text-pink-300 border border-pink-700/40 flex items-center gap-0.5">
                          <Check className="w-2.5 h-2.5" />
                        </span>
                      ) : (
                        <span className="px-1.5 py-0.5 rounded bg-purple-950/50 text-purple-300/50">
                          Unsolved
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Options */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-0.5">
                    {q.options.map((opt, oIdx) => {
                      const isSelected = aptitudeAnswers[q.id] === oIdx;
                      return (
                        <button
                          key={oIdx}
                          type="button"
                          onClick={() => handleOptionSelect(q.id, oIdx)}
                          className={`p-2.5 rounded-lg text-xs text-left transition-all border flex items-center justify-between group ${
                            isSelected
                              ? "bg-gradient-to-r from-pink-600 to-rose-600 text-white border-pink-400 shadow-sm"
                              : "bg-purple-950/30 text-rose-100 border-purple-900/20 hover:bg-purple-900/30 hover:border-pink-500/30"
                          }`}
                        >
                          <div className="flex items-center gap-2 min-w-0">
                            <span className={`w-3.5 h-3.5 rounded-full flex items-center justify-center shrink-0 ${
                              isSelected ? "bg-white text-pink-600" : "border border-purple-400/40 group-hover:border-pink-400/60"
                            }`}>
                              {isSelected && <Check className="w-2 h-2 stroke-[3]" />}
                            </span>
                            <span className={`font-mono font-bold text-[11px] shrink-0 ${isSelected ? "text-white" : "text-pink-300"}`}>
                              {String.fromCharCode(65 + oIdx)}.
                            </span>
                            <span className="truncate">{opt}</span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Stepper Footer */}
          <div className="flex items-center justify-between pt-3 border-t border-purple-900/30">
            <span className="text-xs text-rose-300/70">
              {answeredCount === totalQuestions ? "All questions answered" : `${answeredCount} of ${totalQuestions} answered`}
            </span>

            <button
              type="button"
              onClick={() => setCurrentStep(2)}
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white text-xs font-semibold flex items-center gap-1.5 transition-all shadow-md shadow-pink-600/25"
            >
              <span>Proceed to Skills Matrix</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: SKILLS MATRIX */}
      {currentStep === 2 && (
        <div className="glass-card p-5 sm:p-6 rounded-2xl border border-purple-500/20 space-y-5">
          <div className="space-y-1">
            <h2 className="text-lg font-bold text-white">Skills Matrix</h2>
            <p className="text-xs text-rose-200/70">
              Rate your competency level across the 6 core PRISM dimensions.
            </p>
          </div>

          <div className="space-y-3 pt-1">
            {Object.entries(skills).map(([skill, val]) => (
              <div key={skill} className="space-y-1 p-3 rounded-xl bg-purple-950/30 border border-purple-900/25">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-semibold text-white">{skill}</span>
                  <span className="font-mono font-bold text-pink-400">{val}/100</span>
                </div>
                <input
                  type="range"
                  min="40"
                  max="100"
                  value={val}
                  onChange={(e) => setSkills({ ...skills, [skill]: Number(e.target.value) })}
                  className="w-full accent-pink-500 h-1.5 bg-purple-950 rounded-lg cursor-pointer"
                />
              </div>
            ))}
          </div>

          <div className="flex justify-between items-center pt-3 border-t border-purple-900/30">
            <button
              type="button"
              onClick={() => setCurrentStep(1)}
              className="px-3.5 py-2 rounded-xl bg-purple-950/50 text-purple-200 hover:text-white border border-purple-800/30 text-xs font-medium flex items-center gap-1 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Aptitude Test</span>
            </button>

            <button
              type="button"
              onClick={handleSubmitAll}
              disabled={isSubmitting}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white text-xs font-bold shadow-lg shadow-pink-600/25 flex items-center gap-1.5 transition-all disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Synthesizing...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5 text-peach-300" />
                  <span>Submit & Synthesize Career DNA</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

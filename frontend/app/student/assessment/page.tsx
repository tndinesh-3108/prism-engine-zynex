"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { 
  ArrowRight, 
  ArrowLeft, 
  Sparkles, 
  Brain, 
  Sliders, 
  Check,
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
        title: "12th Standard Aptitude",
        badge: "12th Standard",
        questions: TWELFTH_APTITUDE_QUESTIONS,
      };
    }
    if (profile.qualification === "UG pursuing" && (profile.ugPursuingYear === "I" || profile.ugPursuingYear === "II")) {
      return {
        title: "Junior UG Aptitude",
        badge: "Junior UG",
        questions: UG_JUNIOR_APTITUDE_QUESTIONS,
      };
    }
    if (profile.qualification === "UG" || (profile.qualification === "UG pursuing" && (profile.ugPursuingYear === "III" || profile.ugPursuingYear === "IV"))) {
      return {
        title: "Placement Aptitude",
        badge: "UG Placement",
        questions: UG_SENIOR_APTITUDE_QUESTIONS,
      };
    }
    return {
      title: "PG Technical Aptitude",
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
    <div className="max-w-3xl mx-auto space-y-6 py-6 px-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#a9caa6]/60 pb-4">
        <div>
          <h1 className="text-3xl font-black text-[#123835]">
            Aptitude & Skills
          </h1>
          <p className="text-sm text-[rgb(18,84,79)]/75 mt-1 font-medium">
            15 questions and competency evaluation.
          </p>
        </div>

        <button
          onClick={openProfileModal}
          className="text-[rgb(18,84,79)] hover:text-[#0b3834] text-sm font-semibold underline flex items-center gap-1 self-start sm:self-auto"
        >
          <Sliders className="w-4 h-4 text-[rgb(42,131,95)]" />
          <span>{profile.qualification} ({activeQuestionData.badge})</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={() => setCurrentStep(1)}
          className={`p-3.5 rounded-xl border text-left transition-all ${
            currentStep === 1
              ? "bg-white border-2 border-[rgb(18,84,79)] text-[#123835] font-bold shadow-sm"
              : "bg-white/70 border border-[#cbe1d0] text-[rgb(18,84,79)] font-medium hover:bg-white"
          }`}
        >
          <div className="flex items-center gap-2">
            <Brain className="w-4 h-4 text-[rgb(42,131,95)]" />
            <span className="text-base">1. Aptitude Test</span>
          </div>
          <span className="text-xs text-[rgb(18,84,79)]/75 block mt-1">
            {answeredCount} / {totalQuestions} answered
          </span>
        </button>

        <button
          type="button"
          onClick={() => setCurrentStep(2)}
          className={`p-3.5 rounded-xl border text-left transition-all ${
            currentStep === 2
              ? "bg-white border-2 border-[rgb(18,84,79)] text-[#123835] font-bold shadow-sm"
              : "bg-white/70 border border-[#cbe1d0] text-[rgb(18,84,79)] font-medium hover:bg-white"
          }`}
        >
          <div className="flex items-center gap-2">
            <Sliders className="w-4 h-4 text-[rgb(42,131,95)]" />
            <span className="text-base">2. Skills Matrix</span>
          </div>
          <span className="text-xs text-[rgb(18,84,79)]/75 block mt-1">
            6 Dimensions
          </span>
        </button>
      </div>

      {/* STEP 1: 15-QUESTION APTITUDE TEST */}
      {currentStep === 1 && (
        <div className="glass-card p-6 rounded-2xl border border-pink-500/20 space-y-6">
          {/* Progress Tracker */}
          <div className="flex items-center justify-between text-sm bg-purple-950/30 p-3 rounded-xl border border-purple-900/30">
            <div className="flex items-center gap-3">
              <div className="w-28 sm:w-36 h-2 bg-purple-900/60 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-pink-500 rounded-full transition-all" 
                  style={{ width: `${progressPercent}%` }} 
                />
              </div>
              <span className="font-bold text-white">
                {answeredCount} / {totalQuestions} Answered
              </span>
            </div>

            {answeredCount > 0 && (
              <button
                type="button"
                onClick={handleClearAllAnswers}
                className="text-xs text-rose-300 hover:text-white underline flex items-center gap-1"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
            )}
          </div>

          {/* Questions */}
          <div className="space-y-5">
            {activeQuestionData.questions.map((q, idx) => {
              const isAnswered = aptitudeAnswers[q.id] !== undefined;
              return (
                <div
                  key={q.id}
                  className={`p-4 rounded-xl border transition-all ${
                    isAnswered
                      ? "bg-purple-950/30 border-pink-500/30"
                      : "bg-purple-950/15 border-purple-900/20"
                  }`}
                >
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-start gap-2.5">
                      <span className={`w-6 h-6 rounded-md font-bold text-xs flex items-center justify-center shrink-0 ${
                        isAnswered ? "bg-pink-600 text-white" : "bg-purple-900/40 text-purple-200 border border-purple-700/40"
                      }`}>
                        {idx + 1}
                      </span>
                      <h3 className="text-sm sm:text-base font-semibold text-white leading-snug">
                        {q.question}
                      </h3>
                    </div>

                    <span className="text-xs font-semibold px-2 py-0.5 rounded bg-purple-900/50 text-purple-200 shrink-0">
                      {q.domain}
                    </span>
                  </div>

                  {/* Options */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {q.options.map((opt, oIdx) => {
                      const isSelected = aptitudeAnswers[q.id] === oIdx;
                      return (
                        <button
                          key={oIdx}
                          type="button"
                          onClick={() => handleOptionSelect(q.id, oIdx)}
                          className={`p-3 rounded-lg text-sm text-left transition-all border flex items-center justify-between ${
                            isSelected
                              ? "bg-pink-600 text-white border-pink-400 font-semibold shadow"
                              : "bg-purple-950/30 text-rose-100 border-purple-900/30 hover:bg-purple-900/30"
                          }`}
                        >
                          <div className="flex items-center gap-2.5 min-w-0">
                            <span className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 ${
                              isSelected ? "bg-white text-pink-600" : "border-2 border-purple-400/40"
                            }`}>
                              {isSelected && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                            </span>
                            <span className="font-bold text-xs shrink-0">
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

          {/* Navigation */}
          <div className="flex justify-end pt-2">
            <button
              type="button"
              onClick={() => setCurrentStep(2)}
              className="px-6 py-2.5 rounded-xl bg-pink-600 hover:bg-pink-500 text-white text-sm font-bold flex items-center gap-2 shadow"
            >
              <span>Next: Skills Matrix</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: SKILLS MATRIX */}
      {currentStep === 2 && (
        <div className="glass-card p-6 rounded-2xl border border-purple-500/20 space-y-6">
          <div>
            <h2 className="text-xl font-bold text-white">Skills Matrix</h2>
            <p className="text-sm text-rose-200/80">
              Rate your skill levels (40–100).
            </p>
          </div>

          <div className="space-y-4">
            {Object.entries(skills).map(([skill, val]) => (
              <div key={skill} className="space-y-1.5 p-3 rounded-xl bg-purple-950/30 border border-purple-900/30">
                <div className="flex justify-between items-center text-sm font-semibold">
                  <span className="text-white">{skill}</span>
                  <span className="text-pink-400 font-bold">{val}/100</span>
                </div>
                <input
                  type="range"
                  min="40"
                  max="100"
                  value={val}
                  onChange={(e) => setSkills({ ...skills, [skill]: Number(e.target.value) })}
                  className="w-full accent-pink-500 h-2 bg-purple-950 rounded-lg cursor-pointer"
                />
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between pt-2">
            <button
              type="button"
              onClick={() => setCurrentStep(1)}
              className="px-4 py-2 rounded-xl bg-purple-950/50 hover:bg-purple-900/50 text-white text-sm font-semibold flex items-center gap-1.5"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>

            <button
              type="button"
              onClick={handleSubmitAll}
              disabled={isSubmitting}
              className="px-6 py-2.5 rounded-xl bg-pink-600 hover:bg-pink-500 text-white text-sm font-bold shadow flex items-center gap-2 disabled:opacity-50"
            >
              {isSubmitting ? (
                <span>Submitting...</span>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-peach-200" />
                  <span>Submit Assessment</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

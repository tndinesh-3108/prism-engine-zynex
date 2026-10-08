"use client";

import React, { useState } from "react";
import {
  Award,
  BookOpen,
  Building2,
  CheckCircle2,
  ChevronRight,
  ExternalLink,
  GraduationCap,
  Sparkles,
  TrendingUp,
  ShieldCheck,
  DollarSign,
  Copy,
  Check,
  Send
} from "lucide-react";
import { useStudentParentFlow } from "@/lib/student-parent-flow";

interface CertificateItem {
  id: string;
  title: string;
  issuer: string;
  code: string;
  salaryBoost: string;
  expectedCTC: string;
  duration: string;
  skills: string[];
  description: string;
  verificationId: string;
  issuerBadgeColor: string;
  iconLetter: string;
}

interface CourseItem {
  id: string;
  title: string;
  degreeType: string;
  targetCompanies: string[];
  expectedPackage: string;
  duration: string;
  topInstitutes: string[];
  coreSubjects: string[];
  highPackageReason: string;
  difficulty: "High Rigor" | "Advanced" | "Specialized";
}

const COURSES_DATA: CourseItem[] = [
  {
    id: "course-1",
    title: "B.Tech in Computer Science & Artificial Intelligence",
    degreeType: "4-Year Elite Undergraduate Degree",
    targetCompanies: ["Google", "NVIDIA", "Microsoft", "Amazon", "Uber"],
    expectedPackage: "₹32 LPA – ₹55 LPA",
    duration: "4 Years (8 Semesters)",
    topInstitutes: ["IIT Madras", "IIT Bombay", "BITS Pilani", "IIIT Hyderabad", "NIT Trichy"],
    coreSubjects: [
      "Advanced Data Structures & Algorithms",
      "Deep Neural Networks & Transformers",
      "Distributed Systems & Cloud Computing",
      "GPU Computing & Parallel Programming (CUDA)",
      "High-Scale System Architecture"
    ],
    highPackageReason:
      "Core gateway degree demanded by Tier-1 product companies. Top 15% batch receives campus offers exceeding ₹35 LPA with stock grants.",
    difficulty: "High Rigor"
  },
  {
    id: "course-2",
    title: "Large Language Models & Generative AI Systems Engineering",
    degreeType: "Specialized Advanced Engineering Track",
    targetCompanies: ["NVIDIA", "Microsoft AI", "Adobe", "Google DeepMind", "Amazon AWS"],
    expectedPackage: "₹35 LPA – ₹58 LPA",
    duration: "8-Month Intensive Specialization",
    topInstitutes: ["Stanford Online / DeepLearning.AI", "IIT Madras Center for AI", "CMU Executive"],
    coreSubjects: [
      "Transformer Architectures & Self-Attention Mechanisms",
      "Model Quantization (LoRA, QLoRA, GGUF)",
      "Retrieval-Augmented Generation (RAG) at Scale",
      "Distributed Model Serving & TensorRT-LLM",
      "AI Safety & Alignment Guardrails"
    ],
    highPackageReason:
      "Highest hiring compensation premium in the technology market (+45% above general SDE). High demand across AI product engineering divisions.",
    difficulty: "Advanced"
  },
  {
    id: "course-3",
    title: "Distributed Systems & Cloud Infrastructure Engineering",
    degreeType: "Core Backend & Infrastructure Specialization",
    targetCompanies: ["Amazon (AWS)", "Microsoft (Azure)", "Uber", "Atlassian", "Salesforce"],
    expectedPackage: "₹28 LPA – ₹46 LPA",
    duration: "6 Months Specialized Curriculum",
    topInstitutes: ["MIT OpenCourseWare Track", "IIT Delhi", "BITS Pilani WILP"],
    coreSubjects: [
      "Raft Consensus & Distributed Storage",
      "Event-Driven Microservices (Apache Kafka, gRPC)",
      "Kubernetes Cluster Orchestration & MLOps",
      "Fault-Tolerant High-Throughput Databases",
      "Low-Latency Concurrency in Go & C++"
    ],
    highPackageReason:
      "Essential foundation for handling millions of concurrent users. Tier-1 companies pay top-band compensation for engineers who understand scalable distributed backend systems.",
    difficulty: "Advanced"
  },
  {
    id: "course-4",
    title: "Low-Latency Algorithmic Engineering & Quantitative Tech",
    degreeType: "High-Frequency Tech Specialization",
    targetCompanies: ["DE Shaw", "Tower Research", "Graviton", "Jane Street", "Goldman Sachs"],
    expectedPackage: "₹45 LPA – ₹70+ LPA",
    duration: "1-Year Rigorous Track",
    topInstitutes: ["IIT Bombay", "IIT Delhi CSE", "IIIT Hyderabad CSTAR"],
    coreSubjects: [
      "Modern C++ (C++20/23) Optimization & Memory Management",
      "Linux Kernel Bypass & Zero-Copy Networking",
      "CPU Cache Line Optimization & Lock-Free Data Structures",
      "Stochastic Modeling & Quantitative Algorithmic Execution"
    ],
    highPackageReason:
      "Highest starting compensation in engineering campus placements. Demands razor-sharp algorithmic problem solving and low-level computer architecture mastery.",
    difficulty: "High Rigor"
  }
];

const CERTIFICATES_DATA: CertificateItem[] = [
  {
    id: "cert-aws-ml",
    title: "AWS Certified Machine Learning – Specialty (MLS-C01)",
    issuer: "Amazon Web Services (AWS)",
    code: "AWS-MLS-C01",
    salaryBoost: "+38% Package Boost",
    expectedCTC: "₹32 LPA – ₹48 LPA",
    duration: "3–4 Months Preparation",
    skills: ["Amazon SageMaker", "Distributed Model Training", "Feature Engineering", "MLOps Automation", "Cloud Security"],
    description:
      "Demonstrates expertise in architecting, building, training, and operationalizing machine learning solutions on the AWS Cloud for high-scale enterprise platforms.",
    verificationId: "AWS-MLS-2026-ARUN-7712",
    issuerBadgeColor: "from-peach-500 to-pink-600",
    iconLetter: "AWS"
  },
  {
    id: "cert-gcp-ml",
    title: "Google Cloud Professional Machine Learning Engineer",
    issuer: "Google Cloud Certification Authority",
    code: "GCP-PMLE-01",
    salaryBoost: "+42% Package Boost",
    expectedCTC: "₹34 LPA – ₹52 LPA",
    duration: "3–5 Months Preparation",
    skills: ["Vertex AI", "TensorFlow Enterprise", "Dataflow & BigQuery ML", "Model Monitoring", "Explainable AI"],
    description:
      "Validates ability to design and implement end-to-end production-grade machine learning models on Google Cloud, highly prioritized by Tier-1 product tech companies.",
    verificationId: "GCP-MLE-9024-KUMAR-993",
    issuerBadgeColor: "from-pink-500 to-purple-600",
    iconLetter: "GCP"
  },
  {
    id: "cert-nvidia-dli",
    title: "NVIDIA DLI: Fundamentals of Deep Learning & Accelerated Computing",
    issuer: "NVIDIA Deep Learning Institute",
    code: "NV-DLI-DL-01",
    salaryBoost: "+40% Package Boost",
    expectedCTC: "₹35 LPA – ₹55 LPA",
    duration: "2–3 Months Hands-on Lab",
    skills: ["CUDA GPU Acceleration", "PyTorch Deep Networks", "Computer Vision Pipelines", "TensorRT Optimization", "Inference Scaling"],
    description:
      "Industry-standard certification validating GPU hardware acceleration, neural network architectures, and accelerated inference directly certified by NVIDIA.",
    verificationId: "NV-DLI-9943-AI-ENG",
    issuerBadgeColor: "from-purple-600 to-peach-500",
    iconLetter: "NV"
  },
  {
    id: "cert-dlai-stanford",
    title: "Stanford & DeepLearning.AI: Machine Learning Specialization",
    issuer: "Stanford University / DeepLearning.AI (Andrew Ng)",
    code: "STANFORD-DLAI-ML",
    salaryBoost: "+30% Screening Clearance",
    expectedCTC: "₹28 LPA – ₹42 LPA",
    duration: "3 Months Curriculum",
    skills: ["Supervised Learning", "Cost Optimization & Gradient Descent", "Vector Calculus", "Unsupervised Clustering", "Neural Architecture"],
    description:
      "The global benchmark curriculum authored by Prof. Andrew Ng. Proves rigorous mathematical grounding to Tier-1 recruitment panels during technical rounds.",
    verificationId: "STANFORD-DLAI-MATH-5521",
    issuerBadgeColor: "from-pink-600 to-rose-400",
    iconLetter: "STF"
  }
];

const COMPANIES_DATA = [
  {
    name: "Google",
    role: "Machine Learning Engineer / Software Engineer (AI)",
    packageRange: "₹38 LPA – ₹56 LPA",
    breakdown: "Base: ₹24L • Stocks: ₹25L (4 yrs) • Bonus: ₹5L",
    prerequisites: ["B.Tech CS/AI Degree", "GCP / AWS ML Certification", "LeetCode Hard Algorithms", "System Design"],
    location: "Bengaluru, Hyderabad"
  },
  {
    name: "NVIDIA",
    role: "AI Systems Software Engineer / GPU Compiler Specialist",
    packageRange: "₹36 LPA – ₹54 LPA",
    breakdown: "Base: ₹23L • Stocks: ₹26L (4 yrs) • Signing: ₹4L",
    prerequisites: ["CUDA Programming", "NVIDIA DLI Certificate", "PyTorch Internal Mechanics", "Computer Architecture"],
    location: "Bengaluru, Pune"
  },
  {
    name: "Microsoft",
    role: "Applied Scientist / SDE-2 (Intelligent Cloud)",
    packageRange: "₹34 LPA – ₹50 LPA",
    breakdown: "Base: ₹21L • Stocks: ₹24L (4 yrs) • Performance Bonus: ₹4L",
    prerequisites: ["Distributed Systems", "Cloud ML Engineering", "Transformer LLM Tuning", "Microservices"],
    location: "Hyderabad, Bengaluru, Noida"
  },
  {
    name: "Amazon",
    role: "AWS Machine Learning Specialist / SDE II",
    packageRange: "₹32 LPA – ₹48 LPA",
    breakdown: "Base: ₹22L • Stocks: ₹20L (4 yrs) • Year 1 Bonus: ₹6L",
    prerequisites: ["AWS ML Specialty (MLS-C01)", "High-Scale Low-Latency APIs", "Object-Oriented Design"],
    location: "Chennai, Bengaluru, Hyderabad"
  }
];

export default function HighPackageCoursesAndCertificates() {
  const [activeSubTab, setActiveSubTab] = useState<"courses" | "certificates" | "companies">("courses");
  const [selectedCertId, setSelectedCertId] = useState<string>("cert-aws-ml");
  const [copiedId, setCopiedId] = useState(false);

  const { step, selectedCourse, selectCourse, requestParentPermission } = useStudentParentFlow();

  const selectedCert =
    CERTIFICATES_DATA.find((c) => c.id === selectedCertId) || CERTIFICATES_DATA[0];

  const handleCopyCode = (code: string) => {
    navigator.clipboard?.writeText(code);
    setCopiedId(true);
    setTimeout(() => setCopiedId(false), 2000);
  };

  return (
    <div className="glass-card rounded-2xl border-2 border-pink-500/40 p-5 sm:p-7 space-y-6 shadow-2xl shadow-pink-900/10 transition-all duration-300">
      {/* Top Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-pink-900/30">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-pink-950/70 border border-pink-600/40 text-pink-300 text-xs font-semibold mb-1">
            <Sparkles className="w-3 h-3 text-pink-400" />
            <span>Pathways & Credentials</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white">
            Courses & Certifications
          </h2>
          <p className="text-xs text-rose-200/80 mt-0.5">
            Degree pathways and industry certifications.
          </p>
        </div>

        {/* Package Highlights Badge */}
        <div className="flex items-center gap-3 shrink-0 p-2.5 rounded-xl bg-[#1a0c28] border border-peach-500/30">
          <DollarSign className="w-5 h-5 text-peach-400" />
          <div>
            <span className="text-xs text-peach-300/80 font-bold block">Target Band</span>
            <span className="text-sm font-bold text-peach-300">₹32L – ₹55 LPA</span>
          </div>
        </div>
      </div>

      {/* Sub-Tab Navigation Switcher */}
      <div className="grid grid-cols-3 p-1 rounded-xl bg-[#140a1e] border border-purple-900/40 gap-1 text-xs">
        <button
          type="button"
          onClick={() => setActiveSubTab("courses")}
          className={`flex items-center justify-center gap-1.5 py-2 px-2 rounded-lg font-semibold transition-all ${
            activeSubTab === "courses"
              ? "bg-pink-600 text-white shadow-sm"
              : "text-rose-300/70 hover:text-white"
          }`}
        >
          <GraduationCap className="w-4 h-4" />
          <span>Courses</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveSubTab("certificates")}
          className={`flex items-center justify-center gap-1.5 py-2 px-2 rounded-lg font-semibold transition-all ${
            activeSubTab === "certificates"
              ? "bg-pink-600 text-white shadow-sm"
              : "text-rose-300/70 hover:text-white"
          }`}
        >
          <Award className="w-4 h-4" />
          <span>Certifications</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveSubTab("companies")}
          className={`flex items-center justify-center gap-1.5 py-2 px-2 rounded-lg font-semibold transition-all ${
            activeSubTab === "companies"
              ? "bg-pink-600 text-white shadow-sm"
              : "text-rose-300/70 hover:text-white"
          }`}
        >
          <Building2 className="w-4 h-4" />
          <span>Companies</span>
        </button>
      </div>

      {/* ========================================================================= */}
      {/* TAB 1: COURSES TO STUDY                                                  */}
      {/* ========================================================================= */}
      {activeSubTab === "courses" && (
        <div className="space-y-4">
          <div className="p-3.5 rounded-xl bg-pink-950/20 border border-pink-700/30 flex items-start gap-3">
            <BookOpen className="w-4 h-4 text-pink-400 mt-0.5 shrink-0" />
            <p className="text-xs text-rose-100/90 leading-relaxed">
              <strong>Academic Strategy:</strong> To enter high-package product firms (Google, NVIDIA, Microsoft), select a core Computer Science degree and specialize in <strong>Distributed Systems, GPU Architecture, or LLM Systems</strong> starting in Semester 4.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {COURSES_DATA.map((course) => (
              <div
                key={course.id}
                className="p-5 rounded-xl bg-[#180d24]/90 border border-purple-900/40 hover:border-pink-500/50 transition-all space-y-3.5 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-purple-900/50 text-purple-200 border border-purple-700/40">
                      {course.degreeType}
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-pink-950/70 text-pink-300 border border-pink-800/40">
                      {course.difficulty}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-white tracking-tight">
                    {course.title}
                  </h3>

                  {/* CTC Package & Duration Bar */}
                  <div className="flex items-center justify-between p-2 rounded-lg bg-[#12071d] border border-pink-900/30 text-xs">
                    <div>
                      <span className="text-[10px] text-rose-300/60 block">Expected Package</span>
                      <strong className="text-peach-300 font-extrabold">{course.expectedPackage}</strong>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] text-rose-300/60 block">Duration</span>
                      <span className="text-rose-100 font-semibold">{course.duration}</span>
                    </div>
                  </div>

                  {/* Why High Package */}
                  <p className="text-[11px] text-rose-200/80 leading-relaxed">
                    {course.highPackageReason}
                  </p>

                  {/* Core Subjects */}
                  <div className="space-y-1.5 pt-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-rose-300/70 block">
                      Core High-Impact Subjects:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {course.coreSubjects.map((sub, i) => (
                        <span
                          key={i}
                          className="text-[10px] px-2 py-0.5 rounded-md bg-[#140822] text-rose-100 border border-purple-800/30"
                        >
                          {sub}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Target Companies */}
                  <div className="pt-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-peach-300/70 block mb-1">
                      Target Recruiters:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {course.targetCompanies.map((comp, idx) => (
                        <span
                          key={idx}
                          className="text-[10px] font-semibold px-2 py-0.5 rounded bg-peach-950/40 text-peach-300 border border-peach-800/30"
                        >
                          {comp}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Selection & Parent Permission Request Action Bar */}
                <div className="pt-3 border-t border-purple-900/30 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="text-[10px] text-rose-300/70 truncate">
                    Top Institutes: {course.topInstitutes.slice(0, 2).join(", ")}
                  </div>

                  {(selectedCourse?.title || "").toLowerCase().includes(course.title.slice(0, 15).toLowerCase()) ? (
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold text-pink-300 flex items-center gap-1 bg-pink-950/60 px-2 py-0.5 rounded border border-pink-700/40">
                        <CheckCircle2 className="w-3 h-3 text-pink-400" />
                        <span>Active Course</span>
                      </span>
                      {step === "course_selection" && (
                        <button
                          type="button"
                          onClick={requestParentPermission}
                          className="px-2.5 py-1 rounded-lg bg-gradient-to-r from-pink-600 to-purple-600 text-white text-[10px] font-bold shadow-sm flex items-center gap-1 hover:from-pink-500 hover:to-purple-500"
                        >
                          <Send className="w-3 h-3" />
                          <span>Ask Parent 📩</span>
                        </button>
                      )}
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => {
                        selectCourse({
                          id: course.id,
                          title: course.title,
                          degreeType: course.degreeType,
                          expectedPackage: course.expectedPackage,
                          topInstitutes: course.topInstitutes
                        });
                      }}
                      className="px-2.5 py-1 rounded-lg bg-purple-950/60 hover:bg-pink-600/30 text-rose-200 hover:text-white border border-purple-800/40 text-[10px] font-semibold transition-colors flex items-center gap-1 shrink-0"
                    >
                      <span>Select for Trajectory</span>
                      <ChevronRight className="w-3 h-3 text-pink-400" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: CERTIFICATES IN TAB (WITH LIVE CERTIFICATE PREVIEW)                */}
      {/* ========================================================================= */}
      {activeSubTab === "certificates" && (
        <div className="space-y-6">
          <div className="p-3.5 rounded-xl bg-purple-950/30 border border-purple-800/40 flex items-start gap-3">
            <Award className="w-4 h-4 text-purple-400 mt-0.5 shrink-0" />
            <p className="text-xs text-rose-100/90 leading-relaxed">
              <strong>Verifiable Credentials in Tab:</strong> Top tech companies require industry-standard credentials alongside your degree. Select any certificate on the left to preview your verifiable certificate and syllabus details on the right.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* Left Column: Certificate Selector List */}
            <div className="lg:col-span-5 space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-rose-300/70 block">
                Select Certificate to Preview:
              </span>

              {CERTIFICATES_DATA.map((cert) => {
                const isSelected = cert.id === selectedCertId;
                return (
                  <button
                    key={cert.id}
                    type="button"
                    onClick={() => setSelectedCertId(cert.id)}
                    className={`w-full text-left p-3.5 rounded-xl border transition-all ${
                      isSelected
                        ? "bg-[#231238] border-pink-500 shadow-md shadow-pink-600/20"
                        : "bg-[#160b24]/80 border-purple-900/40 hover:border-pink-500/40 hover:bg-[#1a0e2c]"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5 mb-1">
                          <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-pink-950/70 text-pink-300 border border-pink-700/40">
                            {cert.code}
                          </span>
                          <span className="text-[10px] font-extrabold text-peach-300">
                            {cert.salaryBoost}
                          </span>
                        </div>
                        <h4 className="text-xs font-bold text-white truncate">
                          {cert.title}
                        </h4>
                        <p className="text-[11px] text-rose-300/70 mt-0.5 truncate">
                          {cert.issuer}
                        </p>
                      </div>

                      <div
                        className={`w-7 h-7 rounded-lg bg-gradient-to-tr ${cert.issuerBadgeColor} flex items-center justify-center font-black text-[10px] text-white shrink-0 shadow-sm`}
                      >
                        {cert.iconLetter}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Right Column: LIVE CERTIFICATE VIEWER DOCUMENT */}
            <div className="lg:col-span-7 flex flex-col justify-between">
              <div className="cert-document relative p-6 sm:p-8 rounded-2xl border-4 border-double border-pink-400/50 bg-gradient-to-b from-[#180a26] via-[#12071d] to-[#1c0c2c] shadow-2xl space-y-5 overflow-hidden">
                {/* Decorative Watermark & Ornate Corner Accents */}
                <div className="absolute -top-12 -right-12 w-36 h-36 bg-pink-500/10 rounded-full blur-2xl pointer-events-none" />
                <div className="absolute -bottom-12 -left-12 w-36 h-36 bg-purple-500/10 rounded-full blur-2xl pointer-events-none" />

                {/* Certificate Header Banner */}
                <div className="text-center space-y-1 relative z-10">
                  <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-pink-950/60 border border-pink-600/40 text-pink-300 text-[10px] font-bold uppercase tracking-widest">
                    <ShieldCheck className="w-3.5 h-3.5 text-pink-400" />
                    <span>Official Industry Credential</span>
                  </div>
                  <h3 className="text-xs sm:text-sm font-extrabold tracking-widest text-rose-200 uppercase pt-1">
                    Certificate of Competency & Specialization
                  </h3>
                  <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-pink-500 to-transparent mx-auto" />
                </div>

                {/* Student Recipient Presentation */}
                <div className="text-center space-y-1 relative z-10">
                  <span className="text-[11px] text-rose-300/70 italic block">This certifies that</span>
                  <h2 className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-rose-200 to-peach-300 tracking-wide">
                    Arun Kumar
                  </h2>
                  <p className="text-[11px] text-rose-200/80 max-w-md mx-auto pt-1">
                    has successfully satisfied all rigorous curriculum evaluations, laboratory projects, and examination requirements for
                  </p>
                </div>

                {/* Certificate Name Box */}
                <div className="p-3.5 rounded-xl bg-[#140822]/90 border border-pink-500/40 text-center space-y-1 relative z-10 shadow-inner">
                  <h4 className="text-sm sm:text-base font-extrabold text-white">
                    {selectedCert.title}
                  </h4>
                  <span className="text-[11px] font-bold text-peach-300 block">
                    Issued by: {selectedCert.issuer}
                  </span>
                  <span className="text-[10px] text-purple-300/70 block">
                    Credential Serial ID: {selectedCert.verificationId}
                  </span>
                </div>

                {/* Verified Skills Pills */}
                <div className="space-y-1.5 relative z-10">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-rose-300/70 block text-center">
                    Verified Competencies & Applied Domains:
                  </span>
                  <div className="flex flex-wrap justify-center gap-1.5">
                    {selectedCert.skills.map((skill, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] px-2 py-0.5 rounded-full bg-purple-950/60 border border-purple-700/40 text-rose-100 flex items-center gap-1"
                      >
                        <CheckCircle2 className="w-3 h-3 text-pink-400" />
                        <span>{skill}</span>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Certificate Footer / Authentication Seal */}
                <div className="pt-4 border-t border-pink-900/40 flex items-center justify-between text-xs relative z-10">
                  <div>
                    <span className="text-[10px] text-rose-300/60 block">Issued Status:</span>
                    <strong className="text-emerald-400 font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Verified Active</span>
                    </strong>
                  </div>

                  {/* Certified Seal Stamp */}
                  <div className="w-14 h-14 rounded-full border-2 border-dashed border-pink-400/60 bg-pink-950/40 flex flex-col items-center justify-center text-center p-1">
                    <Sparkles className="w-3.5 h-3.5 text-pink-400" />
                    <span className="text-[7px] font-black tracking-tighter text-rose-200 uppercase">PRISM VERIFIED</span>
                  </div>

                  <div className="text-right">
                    <span className="text-[10px] text-rose-300/60 block">Package Impact:</span>
                    <strong className="text-peach-300 font-extrabold">{selectedCert.salaryBoost}</strong>
                  </div>
                </div>
              </div>

              {/* Action Buttons underneath Certificate */}
              <div className="flex flex-wrap items-center justify-between gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => handleCopyCode(selectedCert.verificationId)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#140822] hover:bg-purple-900/40 border border-purple-800/40 text-xs font-semibold text-rose-200 transition-colors"
                >
                  {copiedId ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-300">ID Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-pink-400" />
                      <span>Copy Credential ID</span>
                    </>
                  )}
                </button>

                <div className="flex items-center gap-2">
                  <a
                    href="https://aws.amazon.com/certification/"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white text-xs font-bold shadow-md shadow-pink-600/25 transition-all"
                  >
                    <span>Official Certification Portal</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 3: HIGH-PACKAGE COMPANIES & RECRUITMENT MATRIX                       */}
      {/* ========================================================================= */}
      {activeSubTab === "companies" && (
        <div className="space-y-4">
          <div className="p-3.5 rounded-xl bg-peach-950/20 border border-peach-700/30 flex items-start gap-3">
            <TrendingUp className="w-4 h-4 text-peach-400 mt-0.5 shrink-0" />
            <p className="text-xs text-rose-100/90 leading-relaxed">
              <strong>Tier-1 Recruitment Criteria:</strong> Companies offer high-bracket entry packages (₹32L–₹55L) to candidates who combine a rigorous computer science foundation with verified cloud/AI certifications and system design skills.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {COMPANIES_DATA.map((company, idx) => (
              <div
                key={idx}
                className="p-5 rounded-xl bg-[#180d24]/90 border border-purple-900/40 hover:border-peach-500/50 transition-all space-y-3.5"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-lg font-black text-white">{company.name}</h3>
                    <p className="text-xs font-semibold text-pink-300 mt-0.5">{company.role}</p>
                  </div>
                  <span className="text-xs font-extrabold px-2.5 py-1 rounded-lg bg-peach-950/60 text-peach-300 border border-peach-800/40 shrink-0">
                    {company.packageRange}
                  </span>
                </div>

                <div className="p-2.5 rounded-lg bg-[#12071d] border border-purple-900/30 text-[11px] text-rose-200/90">
                  <span className="text-[10px] text-rose-300/60 block font-bold uppercase">Compensation Structure:</span>
                  <span>{company.breakdown}</span>
                </div>

                <div className="space-y-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-rose-300/70 block">
                    Screening & Hiring Requirements:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                    {company.prerequisites.map((req, rIdx) => (
                      <div
                        key={rIdx}
                        className="flex items-center gap-1.5 p-1.5 rounded-md bg-[#140822] text-rose-100 text-[10px] border border-purple-800/30"
                      >
                        <CheckCircle2 className="w-3 h-3 text-pink-400 shrink-0" />
                        <span className="truncate">{req}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-2 border-t border-purple-900/30 text-[10px] text-rose-300/60 flex items-center justify-between">
                  <span>Hiring Hubs: {company.location}</span>
                  <span className="text-pink-300 font-bold">High Annual Velocity</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

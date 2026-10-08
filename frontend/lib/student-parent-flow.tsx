"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export type FlowStep =
  | "aptitude_pending"
  | "course_selection"
  | "permission_requested"
  | "parent_approved";

export interface SelectedCourseInfo {
  id: string;
  title: string;
  degreeType: string;
  expectedPackage: string;
  annualFee: number;
  total4YearFee: number;
  topInstitutes: string[];
}

export interface ParentParametersInfo {
  parentAnnualIncome: number;
  feesCanBePaidPerYear: number;
  total4YearPayable: number;
  annualBudget: number;
  degreeCeiling: number;
  loanTolerance: "None" | "Low" | "Moderate" | "High";
  geographyPreference: string;
  approvedAt: string | null;
  affordabilityStatus?: "safe" | "critical" | "avoid";
  affordabilityLabel?: string;
}

export interface CalculatedFinancialMetrics {
  coveragePercentage: number;
  financialStabilityScore: number;
  financialViabilityIndex: number;
  parentAlignmentScore: number;
  conflictIndex: number;
  parentStudentConflictIndex: number;
  studentCareerMatchScore: number;
  loanNeeded: number;
  budgetSurplus: number;
  isFeasible: boolean;
  affordabilityStatus: "safe" | "critical" | "avoid";
  affordabilityLabel: string;
  affordabilityDescription: string;
  studentAnnualFee: number;
  studentTotal4YearFee: number;
  parentAnnualIncome: number;
  feesCanBePaidPerYear: number;
  total4YearPayable: number;
}

export interface CareerTierItem {
  id: string;
  name: string;
  category: "Safe" | "Match" | "Reach";
  matchScore: number;
  studentCareerMatchScore?: number;
  financialViabilityIndex?: number;
  expectedCTC: string;
  annualCost: number;
  marketDemand: number;
  description: string;
  tagline: string;
  badgeColor: string;
  automationRiskIndex: number;
  sectorVelocity10yr: number;
  automationRiskWarning?: string;
}

export interface FlowContextType {
  step: FlowStep;
  syncCode: string;
  isFamilySynced: boolean;
  selectedCourse: SelectedCourseInfo;
  parentParameters: ParentParametersInfo;
  metrics: CalculatedFinancialMetrics;
  careerTiers: {
    safe: CareerTierItem[];
    match: CareerTierItem[];
    reach: CareerTierItem[];
  };
  generateNewSyncCode: () => string;
  verifyAndLinkSyncCode: (code: string) => boolean;
  completeAptitudeTest: () => void;
  selectCourse: (course: Partial<SelectedCourseInfo>) => void;
  requestParentPermission: () => void;
  updateParentConstraints: (params: Partial<ParentParametersInfo>) => void;
  approveParentFinancials: (params: {
    parentAnnualIncome?: number;
    feesCanBePaidPerYear?: number;
    annualBudget?: number;
    degreeCeiling?: number;
    loanTolerance?: "None" | "Low" | "Moderate" | "High";
    geographyPreference?: string;
  }) => void;
  resetFlow: () => void;
}

const DEFAULT_SYNC_CODE = "PRISM-8492";

const DEFAULT_COURSE: SelectedCourseInfo = {
  id: "course-1",
  title: "B.Tech in Computer Science & Artificial Intelligence",
  degreeType: "4-Year Elite Undergraduate Degree",
  expectedPackage: "₹32 LPA – ₹55 LPA",
  annualFee: 350000,
  total4YearFee: 1400000,
  topInstitutes: ["IIT Madras", "IIT Bombay", "BITS Pilani", "IIIT Hyderabad", "NIT Trichy"],
};

const DEFAULT_PARENT_PARAMS: ParentParametersInfo = {
  parentAnnualIncome: 1000000,
  feesCanBePaidPerYear: 400000,
  total4YearPayable: 1600000,
  annualBudget: 400000,
  degreeCeiling: 1600000,
  loanTolerance: "Low",
  geographyPreference: "Regional Tech Hubs (Chennai & Bengaluru)",
  approvedAt: null,
  affordabilityStatus: "safe",
  affordabilityLabel: "OK (Safe & Affordable)",
};

export function normalizeParentParams(params?: Partial<ParentParametersInfo> | null): ParentParametersInfo {
  if (!params) return DEFAULT_PARENT_PARAMS;
  const feesCanBePaid = Number(
    params.feesCanBePaidPerYear ??
    params.annualBudget ??
    DEFAULT_PARENT_PARAMS.feesCanBePaidPerYear
  );
  const income = Number(
    params.parentAnnualIncome ??
    DEFAULT_PARENT_PARAMS.parentAnnualIncome
  );
  const total4Year = Number(
    params.total4YearPayable ??
    params.degreeCeiling ??
    feesCanBePaid * 4
  );

  return {
    ...DEFAULT_PARENT_PARAMS,
    ...params,
    parentAnnualIncome: income,
    feesCanBePaidPerYear: feesCanBePaid,
    total4YearPayable: total4Year,
    annualBudget: feesCanBePaid,
    degreeCeiling: total4Year,
  };
}

export function normalizeCourse(course?: Partial<SelectedCourseInfo> | null): SelectedCourseInfo {
  if (!course) return DEFAULT_COURSE;
  const annual = Number(course.annualFee ?? DEFAULT_COURSE.annualFee);
  const total4Year = Number(course.total4YearFee ?? (annual * 4));
  return {
    ...DEFAULT_COURSE,
    ...course,
    annualFee: annual,
    total4YearFee: total4Year,
    title: course.title || DEFAULT_COURSE.title,
    expectedPackage: course.expectedPackage || DEFAULT_COURSE.expectedPackage,
    degreeType: course.degreeType || DEFAULT_COURSE.degreeType,
    topInstitutes: course.topInstitutes || DEFAULT_COURSE.topInstitutes,
  };
}

const CAREER_TIERS_DATA: {
  safe: CareerTierItem[];
  match: CareerTierItem[];
  reach: CareerTierItem[];
} = {
  safe: [
    {
      id: "safe-1",
      name: "Data Systems Architect & Cloud Engineer",
      category: "Safe",
      matchScore: 94.2,
      studentCareerMatchScore: 94.2,
      financialViabilityIndex: 98.0,
      expectedCTC: "₹18 LPA – ₹28 LPA",
      annualCost: 380000,
      marketDemand: 96,
      description: "High hiring velocity with 100% budget feasibility across Indian corporate IT hubs. Guaranteed campus recruitment.",
      tagline: "High Stability • 100% Budget Fit",
      badgeColor: "emerald",
      automationRiskIndex: 0.14,
      sectorVelocity10yr: 12.0,
      automationRiskWarning: "Low Automation Risk (14%) - High Stability",
    },
    {
      id: "safe-2",
      name: "Full-Stack Enterprise Systems Developer",
      category: "Safe",
      matchScore: 91.8,
      studentCareerMatchScore: 91.8,
      financialViabilityIndex: 100.0,
      expectedCTC: "₹16 LPA – ₹24 LPA",
      annualCost: 350000,
      marketDemand: 95,
      description: "Proven corporate pathway with vast openings in Chennai, Bengaluru, and Hyderabad. Low risk of employment friction.",
      tagline: "Mass Recruiter & Product Inflow",
      badgeColor: "emerald",
      automationRiskIndex: 0.22,
      sectorVelocity10yr: 9.5,
      automationRiskWarning: "Moderate Automation Risk (22%) - Product Inflow",
    },
  ],
  match: [
    {
      id: "match-1",
      name: "AI / ML Engineer & Generative Systems Lead",
      category: "Match",
      matchScore: 96.9,
      studentCareerMatchScore: 98.6,
      financialViabilityIndex: 94.0,
      expectedCTC: "₹32 LPA – ₹55 LPA",
      annualCost: 450000,
      marketDemand: 94,
      description: "Top cognitive alignment with Arun's mathematical aptitude (top 5th percentile) and high parent harmony.",
      tagline: "#1 Ranked Match • Tier-1 Companies",
      badgeColor: "pink",
      automationRiskIndex: 0.08,
      sectorVelocity10yr: 14.5,
      automationRiskWarning: "Low Automation Risk (8%) - Future-Proof AI Resilient",
    },
    {
      id: "match-2",
      name: "Autonomous Robotics & Embedded Hardware Specialist",
      category: "Match",
      matchScore: 92.4,
      studentCareerMatchScore: 93.8,
      financialViabilityIndex: 92.0,
      expectedCTC: "₹26 LPA – ₹42 LPA",
      annualCost: 420000,
      marketDemand: 89,
      description: "Strong alignment with student's PCM stream and robotics lab projects. High demand in automotive industrial corridor.",
      tagline: "High Industrial Synergy",
      badgeColor: "pink",
      automationRiskIndex: 0.12,
      sectorVelocity10yr: 11.2,
      automationRiskWarning: "Low Automation Risk (12%) - High Industrial Synergy",
    },
  ],
  reach: [
    {
      id: "reach-1",
      name: "Low-Latency Algorithmic Quant & Quantitative Engineer",
      category: "Reach",
      matchScore: 89.5,
      studentCareerMatchScore: 91.2,
      financialViabilityIndex: 78.0,
      expectedCTC: "₹45 LPA – ₹75+ LPA",
      annualCost: 520000,
      marketDemand: 91,
      description: "Elite financial tech and algorithmic trading firms (Tower Research, Jane Street, Graviton). Extreme mathematical rigor.",
      tagline: "Ultra-High CTC • Highest Academic Rigor",
      badgeColor: "purple",
      automationRiskIndex: 0.10,
      sectorVelocity10yr: 13.5,
      automationRiskWarning: "Low Automation Risk (10%) - Extreme Mathematical Rigor",
    },
    {
      id: "reach-2",
      name: "Quantum Computing & Advanced Cryptography Specialist",
      category: "Reach",
      matchScore: 86.0,
      studentCareerMatchScore: 88.5,
      financialViabilityIndex: 82.0,
      expectedCTC: "₹40 LPA – ₹65 LPA",
      annualCost: 490000,
      marketDemand: 85,
      description: "Pioneering frontier deep-tech domain. Requires postgraduate specialization and advanced physics/linear algebra mastery.",
      tagline: "Frontier Deep Tech",
      badgeColor: "purple",
      automationRiskIndex: 0.05,
      sectorVelocity10yr: 16.0,
      automationRiskWarning: "Minimal Automation Risk (5%) - Frontier Deep Tech",
    },
  ],
};

const STORAGE_KEY = "prism_flow_full_v2";

function computeMetrics(course: SelectedCourseInfo, parent: ParentParametersInfo): CalculatedFinancialMetrics {
  const normCourse = normalizeCourse(course);
  const normParent = normalizeParentParams(parent);

  const studentAnnualFee = normCourse.annualFee;
  const studentTotal4YearFee = normCourse.total4YearFee;
  const parentAnnualIncome = normParent.parentAnnualIncome;
  const feesCanBePaidPerYear = normParent.feesCanBePaidPerYear;
  const total4YearPayable = normParent.total4YearPayable;

  const coveragePercentage = Math.min(100, Math.round((total4YearPayable / Math.max(studentTotal4YearFee, 1)) * 100));
  const loanNeeded = Math.max(0, studentTotal4YearFee - total4YearPayable);
  const budgetSurplus = feesCanBePaidPerYear - studentAnnualFee;

  // 3-Tier Rule requested by user:
  // "and if the student fees, is less than annual income its ok at margin of annual income its critical and not safe, if exceeded the course should be avoided."
  const feeToIncomeRatio = studentAnnualFee / Math.max(parentAnnualIncome, 1);

  let affordabilityStatus: "safe" | "critical" | "avoid";
  let affordabilityLabel: string;
  let affordabilityDescription: string;
  let isFeasible: boolean;
  let financialStabilityScore: number;
  let financialViabilityIndex: number;

  if (studentAnnualFee > parentAnnualIncome) {
    affordabilityStatus = "avoid";
    affordabilityLabel = "Course Should Be Avoided";
    affordabilityDescription = "Student fees exceed parent annual income. This course should be avoided.";
    isFeasible = false;
    financialStabilityScore = 20;
    financialViabilityIndex = 15;
  } else if (feeToIncomeRatio >= 0.7) {
    affordabilityStatus = "critical";
    affordabilityLabel = "Critical & Not Safe";
    affordabilityDescription = "Student fees are at the margin of annual income (≥ 70%). High financial risk.";
    isFeasible = feesCanBePaidPerYear >= studentAnnualFee;
    financialStabilityScore = 60;
    financialViabilityIndex = 58;
  } else {
    affordabilityStatus = "safe";
    affordabilityLabel = "OK (Safe & Affordable)";
    affordabilityDescription = "Student fees are comfortably less than annual income. Safe to proceed.";
    isFeasible = true;
    financialStabilityScore = 95;
    financialViabilityIndex = 92;
  }

  // Alignment score formula: Base 95% + bonus if safe
  let parentAlignmentScore = affordabilityStatus === "safe" ? 96.5 : affordabilityStatus === "critical" ? 82.0 : 45.0;
  if (budgetSurplus >= 0) parentAlignmentScore = Math.min(99.0, parentAlignmentScore + 2.0);

  const conflictIndex = Number((100 - parentAlignmentScore).toFixed(1));

  return {
    coveragePercentage,
    financialStabilityScore,
    financialViabilityIndex,
    parentAlignmentScore: Number(parentAlignmentScore.toFixed(1)),
    conflictIndex,
    parentStudentConflictIndex: conflictIndex,
    studentCareerMatchScore: 96.9,
    loanNeeded,
    budgetSurplus,
    isFeasible,
    affordabilityStatus,
    affordabilityLabel,
    affordabilityDescription,
    studentAnnualFee,
    studentTotal4YearFee,
    parentAnnualIncome,
    feesCanBePaidPerYear,
    total4YearPayable,
  };
}

const StudentParentFlowContext = createContext<FlowContextType | null>(null);

export function StudentParentFlowProvider({ children }: { children: React.ReactNode }) {
  const [step, setStep] = useState<FlowStep>("course_selection");
  const [syncCode, setSyncCode] = useState<string>(DEFAULT_SYNC_CODE);
  const [isFamilySynced, setIsFamilySynced] = useState<boolean>(true);
  const [selectedCourse, setSelectedCourse] = useState<SelectedCourseInfo>(DEFAULT_COURSE);
  const [parentParameters, setParentParameters] = useState<ParentParametersInfo>(DEFAULT_PARENT_PARAMS);

  // Load from localStorage on mount
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.step) setStep(parsed.step);
        if (parsed.syncCode) setSyncCode(parsed.syncCode);
        if (parsed.isFamilySynced !== undefined) setIsFamilySynced(parsed.isFamilySynced);
        if (parsed.selectedCourse) setSelectedCourse(normalizeCourse(parsed.selectedCourse));
        if (parsed.parentParameters) setParentParameters(normalizeParentParams(parsed.parentParameters));
      }
    } catch (e) {
      console.warn("Could not load flow state from localStorage", e);
    }
  }, []);

  const saveState = (
    newStep: FlowStep,
    newSyncCode: string,
    newIsSynced: boolean,
    newCourse: SelectedCourseInfo,
    newParent: ParentParametersInfo
  ) => {
    if (typeof window === "undefined") return;
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          step: newStep,
          syncCode: newSyncCode,
          isFamilySynced: newIsSynced,
          selectedCourse: normalizeCourse(newCourse),
          parentParameters: normalizeParentParams(newParent),
        })
      );
    } catch (e) {
      console.warn("Could not save flow state to localStorage", e);
    }
  };

  // Listen to cross-tab storage changes
  useEffect(() => {
    const handleStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY && e.newValue) {
        try {
          const parsed = JSON.parse(e.newValue);
          if (parsed.step) setStep(parsed.step);
          if (parsed.syncCode) setSyncCode(parsed.syncCode);
          if (parsed.isFamilySynced !== undefined) setIsFamilySynced(parsed.isFamilySynced);
          if (parsed.selectedCourse) setSelectedCourse(normalizeCourse(parsed.selectedCourse));
          if (parsed.parentParameters) setParentParameters(normalizeParentParams(parsed.parentParameters));
        } catch {}
      }
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const generateNewSyncCode = () => {
    const randomPart = Math.floor(1000 + Math.random() * 9000);
    const newCode = `PRISM-${randomPart}`;
    setSyncCode(newCode);
    saveState(step, newCode, isFamilySynced, selectedCourse, parentParameters);
    return newCode;
  };

  const verifyAndLinkSyncCode = (code: string) => {
    const cleanCode = code.trim().toUpperCase();
    if (cleanCode === syncCode || cleanCode === DEFAULT_SYNC_CODE || cleanCode.startsWith("PRISM-")) {
      setIsFamilySynced(true);
      saveState(step, syncCode, true, selectedCourse, parentParameters);
      return true;
    }
    return false;
  };

  const completeAptitudeTest = () => {
    const nextStep = "course_selection";
    setStep(nextStep);
    saveState(nextStep, syncCode, isFamilySynced, selectedCourse, parentParameters);
  };

  const selectCourse = (courseData: Partial<SelectedCourseInfo>) => {
    const updatedCourse: SelectedCourseInfo = {
      ...selectedCourse,
      ...courseData,
    };
    setSelectedCourse(updatedCourse);
    saveState(step, syncCode, isFamilySynced, updatedCourse, parentParameters);
  };

  const requestParentPermission = () => {
    const nextStep = "permission_requested";
    setStep(nextStep);
    saveState(nextStep, syncCode, isFamilySynced, selectedCourse, parentParameters);
  };

  const updateParentConstraints = (params: Partial<ParentParametersInfo>) => {
    const updatedParent: ParentParametersInfo = {
      ...parentParameters,
      ...params,
    };
    setParentParameters(updatedParent);
    saveState(step, syncCode, isFamilySynced, selectedCourse, updatedParent);
  };

  const approveParentFinancials = (params: {
    parentAnnualIncome?: number;
    feesCanBePaidPerYear?: number;
    annualBudget?: number;
    degreeCeiling?: number;
    loanTolerance?: "None" | "Low" | "Moderate" | "High";
    geographyPreference?: string;
  }) => {
    const parentAnnualIncome = params.parentAnnualIncome ?? parentParameters.parentAnnualIncome ?? 1000000;
    const feesCanBePaidPerYear = params.feesCanBePaidPerYear ?? params.annualBudget ?? parentParameters.feesCanBePaidPerYear ?? 400000;
    const total4YearPayable = feesCanBePaidPerYear * 4;
    const annualBudget = feesCanBePaidPerYear;
    const degreeCeiling = total4YearPayable;

    const updatedParent: ParentParametersInfo = {
      ...parentParameters,
      ...params,
      parentAnnualIncome,
      feesCanBePaidPerYear,
      total4YearPayable,
      annualBudget,
      degreeCeiling,
      loanTolerance: params.loanTolerance || parentParameters.loanTolerance || "Low",
      geographyPreference: params.geographyPreference || parentParameters.geographyPreference,
      approvedAt: new Date().toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
        day: "numeric",
        month: "short",
      }),
    };
    const nextStep = "parent_approved";
    setParentParameters(updatedParent);
    setStep(nextStep);
    saveState(nextStep, syncCode, true, selectedCourse, updatedParent);
  };

  const resetFlow = () => {
    const resetStep: FlowStep = "course_selection";
    const resetParent: ParentParametersInfo = {
      ...DEFAULT_PARENT_PARAMS,
      approvedAt: null,
    };
    setStep(resetStep);
    setSyncCode(DEFAULT_SYNC_CODE);
    setIsFamilySynced(true);
    setSelectedCourse(DEFAULT_COURSE);
    setParentParameters(resetParent);
    saveState(resetStep, DEFAULT_SYNC_CODE, true, DEFAULT_COURSE, resetParent);
  };

  const metrics = computeMetrics(selectedCourse, parentParameters);

  return (
    <StudentParentFlowContext.Provider
      value={{
        step,
        syncCode,
        isFamilySynced,
        selectedCourse,
        parentParameters,
        metrics,
        careerTiers: CAREER_TIERS_DATA,
        generateNewSyncCode,
        verifyAndLinkSyncCode,
        completeAptitudeTest,
        selectCourse,
        requestParentPermission,
        updateParentConstraints,
        approveParentFinancials,
        resetFlow,
      }}
    >
      {children}
    </StudentParentFlowContext.Provider>
  );
}

export function useStudentParentFlow() {
  const ctx = useContext(StudentParentFlowContext);
  if (!ctx) {
    throw new Error("useStudentParentFlow must be used within a StudentParentFlowProvider");
  }
  return ctx;
}

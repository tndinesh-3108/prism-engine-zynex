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
  annualBudget: number;
  degreeCeiling: number;
  loanTolerance: "None" | "Low" | "Moderate" | "High";
  geographyPreference: string;
  approvedAt: string | null;
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
    annualBudget: number;
    degreeCeiling: number;
    loanTolerance: "None" | "Low" | "Moderate" | "High";
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
  annualFee: 450000,
  total4YearFee: 1800000,
  topInstitutes: ["IIT Madras", "IIT Bombay", "BITS Pilani", "IIIT Hyderabad", "NIT Trichy"],
};

const DEFAULT_PARENT_PARAMS: ParentParametersInfo = {
  annualBudget: 600000,
  degreeCeiling: 2400000,
  loanTolerance: "Low",
  geographyPreference: "Regional Tech Hubs (Chennai & Bengaluru)",
  approvedAt: null,
};

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
  const totalCost = course.total4YearFee;
  const ceiling = parent.degreeCeiling;
  const annualFee = course.annualFee;
  const annualBudget = parent.annualBudget;

  const coveragePercentage = Math.min(100, Math.round((ceiling / totalCost) * 100));
  const loanNeeded = Math.max(0, totalCost - ceiling);
  const budgetSurplus = annualBudget - annualFee;
  const isFeasible = ceiling >= totalCost;

  // Alignment score formula: Base 92% + bonus if feasible + bonus if surplus
  let parentAlignmentScore = 92.0;
  if (isFeasible) parentAlignmentScore += 4.5;
  if (budgetSurplus > 0) parentAlignmentScore += 1.5;
  if (parentAlignmentScore > 99.0) parentAlignmentScore = 99.0;

  const conflictIndex = Number((100 - parentAlignmentScore).toFixed(1));
  const financialStabilityScore = Math.min(100, coveragePercentage);
  const financialViabilityIndex = Math.min(100, Math.round(coveragePercentage * 0.95 + (budgetSurplus > 0 ? 5 : 0)));

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
        if (parsed.selectedCourse) setSelectedCourse(parsed.selectedCourse);
        if (parsed.parentParameters) setParentParameters(parsed.parentParameters);
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
          selectedCourse: newCourse,
          parentParameters: newParent,
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
          if (parsed.selectedCourse) setSelectedCourse(parsed.selectedCourse);
          if (parsed.parentParameters) setParentParameters(parsed.parentParameters);
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
    annualBudget: number;
    degreeCeiling: number;
    loanTolerance: "None" | "Low" | "Moderate" | "High";
    geographyPreference?: string;
  }) => {
    const updatedParent: ParentParametersInfo = {
      ...parentParameters,
      ...params,
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

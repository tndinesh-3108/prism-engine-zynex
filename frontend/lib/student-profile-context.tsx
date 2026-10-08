"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export type QualificationType = "12th" | "UG" | "UG pursuing" | "PG" | "PG pursuing";
export type TwelfthGroupType = "Bio/Maths" | "CS/Maths" | "Bio/CS" | "IIT" | "NEET";
export type UGPursuingYear = "I" | "II" | "III" | "IV";

export interface StudentProfileData {
  country: string;
  state: string;
  qualification: QualificationType;
  twelfthGroup?: TwelfthGroupType;
  ugCgpa?: number;
  ugDegree?: string;
  ugPursuingYear?: UGPursuingYear;
  ugPursuingCourse?: string;
  ugPursuingCgpa?: number;
  ugPassedCgpa?: number;
  pgCourse?: string;
  isConfigured: boolean;
}

interface StudentProfileContextType {
  profile: StudentProfileData;
  isModalOpen: boolean;
  openProfileModal: () => void;
  closeProfileModal: () => void;
  updateProfile: (data: Partial<StudentProfileData>) => void;
  resetProfile: () => void;
}

const DEFAULT_PROFILE: StudentProfileData = {
  country: "India",
  state: "Tamil Nadu",
  qualification: "12th",
  twelfthGroup: "CS/Maths",
  ugCgpa: 8.5,
  ugDegree: "B.Tech in Computer Science & Engineering",
  ugPursuingYear: "II",
  ugPursuingCourse: "B.Tech in Artificial Intelligence & Data Science",
  ugPursuingCgpa: 8.7,
  ugPassedCgpa: 8.4,
  pgCourse: "M.Tech in Machine Learning & AI",
  isConfigured: false,
};

const STORAGE_KEY = "prism_student_qualification_profile_v2";

const StudentProfileContext = createContext<StudentProfileContextType>({
  profile: DEFAULT_PROFILE,
  isModalOpen: false,
  openProfileModal: () => {},
  closeProfileModal: () => {},
  updateProfile: () => {},
  resetProfile: () => {},
});

export function StudentProfileProvider({ children }: { children: React.ReactNode }) {
  const [profile, setProfile] = useState<StudentProfileData>(DEFAULT_PROFILE);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        setProfile({ ...DEFAULT_PROFILE, ...parsed, isConfigured: true });
      }
    } catch (e) {
      console.warn("Failed reading student qualification profile:", e);
    }
  }, []);

  const openProfileModal = () => setIsModalOpen(true);
  const closeProfileModal = () => setIsModalOpen(false);

  const updateProfile = (data: Partial<StudentProfileData>) => {
    setProfile((prev) => {
      const updated: StudentProfileData = {
        ...prev,
        ...data,
        isConfigured: true,
      };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch (e) {
        console.warn("Failed saving student profile:", e);
      }
      return updated;
    });
    setIsModalOpen(false);
  };

  const resetProfile = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {}
    setProfile({ ...DEFAULT_PROFILE, isConfigured: false });
    setIsModalOpen(true);
  };

  return (
    <StudentProfileContext.Provider
      value={{
        profile,
        isModalOpen,
        openProfileModal,
        closeProfileModal,
        updateProfile,
        resetProfile,
      }}
    >
      {children}
    </StudentProfileContext.Provider>
  );
}

export function useStudentProfile() {
  const context = useContext(StudentProfileContext);
  if (!context) {
    throw new Error("useStudentProfile must be used within a StudentProfileProvider");
  }
  return context;
}

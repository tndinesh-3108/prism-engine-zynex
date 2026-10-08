"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  LogIn,
  LogOut,
  ChevronRight,
  ArrowLeft,
  Sparkles
} from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { useStudentProfile } from "@/lib/student-profile-context";
import ThemeSlider from "@/components/ThemeSlider";
import { Sliders } from "lucide-react";

interface HeaderProps {
  onOpenSidebar: () => void;
  hideSidebar?: boolean;
  isLoginPage?: boolean;
}

export default function Header({ onOpenSidebar, hideSidebar = false, isLoginPage = false }: HeaderProps) {
  const pathname = usePathname();
  const { user, isAuthenticated, logout } = useAuth();
  const { profile, openProfileModal } = useStudentProfile();

  const qualificationShort =
    profile.qualification === "12th"
      ? `12th (${profile.twelfthGroup || "CS/Maths"})`
      : profile.qualification === "UG pursuing"
      ? `UG Yr ${profile.ugPursuingYear}`
      : profile.qualification === "UG"
      ? `UG (CGPA ${profile.ugCgpa})`
      : `PG`;

  // Determine current page readable title (minimal & concise)
  const getPageInfo = () => {
    if (pathname === "/") return { title: "Overview", group: "Platform" };
    if (pathname.startsWith("/student/dashboard")) return { title: "Careers", group: "Student" };
    if (pathname.startsWith("/student/setup")) return { title: "Family Sync", group: "Student" };
    if (pathname.startsWith("/student/assessment")) return { title: "Aptitude Assessment", group: "Student" };
    if (pathname.startsWith("/student/career-dna")) return { title: "Career DNA", group: "Student" };
    if (pathname.startsWith("/student/roadmap")) return { title: "Roadmap", group: "Student" };
    if (pathname.startsWith("/student/opportunities")) return { title: "Opportunities", group: "Student" };
    if (pathname.startsWith("/student/mentor")) return { title: "AI Mentor", group: "Student" };
    if (pathname.startsWith("/dashboard")) return { title: "Dashboard", group: "Student" };
    if (pathname.startsWith("/assessment")) return { title: "Aptitude Assessment", group: "Student" };
    if (pathname.startsWith("/career-dna")) return { title: "Career DNA", group: "Student" };
    if (pathname.startsWith("/parent/sync")) return { title: "Family Sync", group: "Parent" };
    if (pathname.startsWith("/parent/constraints")) return { title: "Budget Constraints", group: "Parent" };
    if (pathname.startsWith("/parent/alignment")) return { title: "Conflict Index", group: "Parent" };
    if (pathname.startsWith("/parent/funding")) return { title: "Scholarships & ROI", group: "Parent" };
    if (pathname.startsWith("/parent/dashboard")) return { title: "Parent Dashboard", group: "Parent" };
    if (pathname.startsWith("/parent")) return { title: "Budget Constraints", group: "Parent" };
    if (pathname.startsWith("/alignment")) return { title: "Conflict Index", group: "Parent" };
    if (pathname.startsWith("/compare")) return { title: "Compare Careers", group: "Parent" };
    if (pathname.startsWith("/login")) return { title: "Sign In", group: "Portal" };
    return { title: "PRISM", group: "Platform" };
  };

  const pageInfo = getPageInfo();
  const isParentPortal =
    pathname.startsWith("/parent") || pathname === "/alignment" || pathname === "/compare";

  return (
    <header className="sticky top-0 z-30 h-16 bg-[#0d0614]/85 backdrop-blur-xl border-b border-pink-900/30 px-4 sm:px-6 lg:px-8 flex items-center justify-between transition-colors">
      {/* Left: Brand Logo on Landing Page, or Mobile Sidebar Trigger + Breadcrumb */}
      <div className="flex items-center gap-3">
        {pathname === "/" ? (
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-purple-600 via-pink-500 to-peach-400 p-[2px] shadow-md shadow-pink-500/20 group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-[#0d0614] rounded-[10px] flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-pink-400" />
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-base tracking-wider text-white">PRISM</span>
              <span className="text-[9px] font-bold tracking-widest uppercase bg-pink-950/80 text-pink-300 px-1.5 py-0.5 rounded border border-pink-700/40">
                ENGINE
              </span>
            </div>
          </Link>
        ) : !hideSidebar && !isLoginPage ? (
          <button
            onClick={onOpenSidebar}
            className="p-2 rounded-xl text-rose-300/70 hover:text-white hover:bg-purple-950/40 lg:hidden transition-colors"
            aria-label="Open Navigation"
          >
            <Menu className="w-5 h-5" />
          </button>
        ) : (
          <Link
            href="/"
            className="flex items-center gap-1.5 text-xs text-rose-300/80 hover:text-pink-300 transition-colors py-1 px-2 rounded-lg hover:bg-pink-950/30"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span className="font-semibold">Overview</span>
          </Link>
        )}

        {pathname !== "/" && (
          <div className="flex items-center gap-1.5 text-xs">
            <span className="text-rose-400/70 font-semibold hidden sm:inline">{pageInfo.group}</span>
            <ChevronRight className="w-3.5 h-3.5 text-purple-400/50 hidden sm:inline" />
            <h1 className="font-bold text-white text-sm sm:text-base tracking-tight truncate">
              {pageInfo.title}
            </h1>
          </div>
        )}
      </div>

      {/* Right: Theme Slider, Portal Switcher & Auth actions */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Qualification Customization Trigger (Student Only) */}
        {!isLoginPage && !isParentPortal && (
          <button
            onClick={openProfileModal}
            className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-purple-950/70 hover:bg-pink-950 text-pink-300 border border-pink-700/40 text-xs font-bold transition-all"
            title="Click to customize Country, State, Qualification, or Stream"
          >
            <Sliders className="w-3 h-3 text-pink-400" />
            <span>{qualificationShort}</span>
          </button>
        )}

        {/* Theme Slider (Dark <-> White) */}
        <ThemeSlider />



        {/* User Auth CTA */}
        {!isLoginPage && (
          isAuthenticated && user ? (
            <button
              onClick={logout}
              className="flex items-center gap-1.5 text-xs font-medium px-2.5 py-1.5 rounded-xl bg-[#180d24]/60 hover:bg-pink-500/10 text-rose-300/70 hover:text-pink-300 border border-purple-900/40 hover:border-pink-500/30 transition-all"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          ) : (
            <Link
              href="/login"
              className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-xl bg-gradient-to-r from-purple-600 via-pink-600 to-rose-500 hover:from-purple-500 hover:to-rose-400 text-white shadow-md shadow-pink-600/30 transition-all"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Sign In</span>
            </Link>
          )
        )}
      </div>
    </header>
  );
}


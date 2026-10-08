"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Sparkles,
  LayoutDashboard,
  Compass,
  Dna,
  Users,
  Scale,
  TrendingUp,
  MapPin,
  GitBranch,
  Bot,
  LogOut,
  LogIn,
  X,
  ShieldCheck,
  GraduationCap
} from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import ThemeSlider from "@/components/ThemeSlider";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();
  const { user, isAuthenticated, logout } = useAuth();

  const isParentPortal =
    pathname.startsWith("/parent") || pathname === "/alignment" || pathname === "/compare";

  const studentNavigation = [
    {
      title: "Discovery",
      items: [
        { href: "/student/dashboard", label: "Careers", icon: LayoutDashboard },
        { href: "/student/setup", label: "Family Sync", icon: Users },
        { href: "/student/assessment", label: "Aptitude Test", icon: Compass },
        { href: "/student/career-dna", label: "Career DNA", icon: Dna },
      ],
    },
    {
      title: "Pathways",
      items: [
        { href: "/student/roadmap", label: "Roadmap", icon: GitBranch },
        { href: "/student/opportunities", label: "Opportunities", icon: MapPin },
        { href: "/student/mentor", label: "AI Mentor", icon: Bot },
      ],
    },
  ];

  const parentNavigation = [
    {
      title: "Advisory",
      items: [
        { href: "/parent/dashboard", label: "Dashboard", icon: LayoutDashboard },
        { href: "/parent/sync", label: "Family Sync", icon: Users },
        { href: "/parent/constraints", label: "Budget Constraints", icon: Scale },
      ],
    },
    {
      title: "Analysis",
      items: [
        { href: "/parent/alignment", label: "Conflict Index", icon: Scale },
        { href: "/parent/funding", label: "Scholarships & ROI", icon: TrendingUp },
      ],
    },
  ];

  const currentSections = isParentPortal ? parentNavigation : studentNavigation;

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-72 bg-[#e2ede5]/95 backdrop-blur-xl border-r border-[#b8d4be] flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full"
        }`}
      >
        {/* Brand Header */}
        <div className="h-16 px-5 flex items-center justify-between border-b border-[#b8d4be]">
          <Link href="/" onClick={onClose} className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-xl bg-[rgb(18,84,79)] flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-lg tracking-wider text-[rgb(18,84,79)]">PRISM</span>
                <span className="text-[9px] font-bold tracking-widest uppercase bg-[#daf0e3] text-[rgb(42,131,95)] px-1.5 py-0.5 rounded border border-[#bfe3cf]">
                  ENGINE
                </span>
              </div>
              <p className="text-[10px] text-[#2d5a52] leading-none">Career & Capital Engine</p>
            </div>
          </Link>

          {/* Close button on mobile */}
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[rgb(18,84,79)] hover:bg-[#d0e4d6] lg:hidden"
            aria-label="Close Sidebar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Sections (Dynamic based on selected portal) */}
        <div className="flex-1 overflow-y-auto px-3 py-3 space-y-6">
          {currentSections.map((section) => (
            <div key={section.title} className="space-y-1">
              <p className="px-3 text-[10px] font-extrabold tracking-wider uppercase text-[rgb(18,84,79)]/80">
                {section.title}
              </p>
              <div className="space-y-0.5 pt-1">
                {section.items.map((item) => {
                  const Icon = item.icon;
                  const isActive =
                    pathname === item.href ||
                    (item.href !== "/" && pathname.startsWith(item.href) && item.href.length > 5);

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={onClose}
                      className={`flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                        isActive
                          ? "bg-[rgb(18,84,79)] text-white shadow-sm"
                          : "text-[rgb(18,84,79)] hover:bg-[#d0e4d6]"
                      }`}
                    >
                      <Icon
                        className={`w-4 h-4 shrink-0 ${
                          isActive ? "text-white" : "text-[rgb(18,84,79)]"
                        }`}
                      />
                      <span className="truncate">{item.label}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Footer Theme Slider & User Profile Card */}
        <div className="p-3 border-t border-[#b8d4be] bg-[#e2ede5]/95 space-y-2.5">
          <div className="flex items-center justify-between px-1">
            <span className="text-[11px] font-bold text-[rgb(18,84,79)]">Theme Mode</span>
            <ThemeSlider />
          </div>

          {isAuthenticated && user ? (
            <div className="p-2.5 rounded-xl bg-white border border-[#b8d4be] flex items-center justify-between gap-2 shadow-sm">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-8 h-8 rounded-lg bg-[rgb(18,84,79)] flex items-center justify-center font-bold text-xs text-white shrink-0 shadow-sm">
                  {user.name.slice(0, 2).toUpperCase()}
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-bold text-[#123835] truncate">{user.name}</p>
                  <p className="text-[10px] text-[#2d5a52] capitalize truncate flex items-center gap-1">
                    {user.role === "student" ? (
                      <GraduationCap className="w-3 h-3 text-[rgb(42,131,95)]" />
                    ) : (
                      <ShieldCheck className="w-3 h-3 text-[rgb(18,84,79)]" />
                    )}
                    {user.role} • {user.email.split("@")[0]}
                  </p>
                </div>
              </div>

              <button
                onClick={logout}
                title="Sign Out"
                className="p-1.5 rounded-lg text-[#2d5a52] hover:text-[rgb(18,84,79)] hover:bg-[#d0e4d6] transition-colors"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              onClick={onClose}
              className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl bg-[rgb(18,84,79)] hover:bg-[#0e433f] text-white text-xs font-semibold shadow-sm transition-all"
            >
              <LogIn className="w-4 h-4" />
              <span>Sign In / Demo Login</span>
            </Link>
          )}
        </div>
      </aside>
    </>
  );
}


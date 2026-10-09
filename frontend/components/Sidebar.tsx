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
        className={`fixed top-0 bottom-0 left-0 z-50 w-72 bg-[#0e0717]/95 border-r border-pink-900/30 flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? "translate-x-0 shadow-2xl shadow-purple-950/50" : "-translate-x-full"
        }`}
      >
        {/* Brand Header */}
        <div className="h-16 px-5 flex items-center justify-between border-b border-pink-900/30">
          <Link href="/" onClick={onClose} className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-purple-600 via-pink-500 to-peach-400 p-[2px] shadow-md shadow-pink-500/20 group-hover:shadow-pink-500/40 transition-all">
              <div className="w-full h-full bg-[#0e0717] rounded-[10px] flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-pink-400 group-hover:scale-110 transition-transform" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-lg tracking-wider text-white">PRISM</span>
                <span className="text-[9px] font-bold tracking-widest uppercase bg-pink-950/80 text-pink-300 px-1.5 py-0.5 rounded border border-pink-700/40">
                  ENGINE
                </span>
              </div>
              <p className="text-[10px] text-rose-300/70 leading-none">Career & Capital Engine</p>
            </div>
          </Link>

          {/* Close button on mobile */}
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-200 hover:bg-purple-950/50 lg:hidden"
            aria-label="Close Sidebar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>



        {/* Navigation Sections (Dynamic based on selected portal) */}
        <div className="flex-1 overflow-y-auto px-3 py-3 space-y-6 scrollbar-thin scrollbar-thumb-purple-950">
          {currentSections.map((section) => (
            <div key={section.title} className="space-y-1">
              <p className="px-3 text-[10px] font-bold tracking-wider uppercase text-rose-400/60">
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
                      className={`flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                        isActive
                          ? "bg-gradient-to-r from-purple-900/40 via-pink-900/30 to-peach-900/20 text-pink-200 border border-pink-500/40 shadow-sm shadow-purple-950"
                          : "text-slate-400 hover:text-rose-100 hover:bg-purple-950/30"
                      }`}
                    >
                      <Icon
                        className={`w-4 h-4 shrink-0 ${
                          isActive ? "text-pink-400" : "text-purple-400/70 group-hover:text-pink-300"
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
        <div className="p-3 border-t border-pink-900/30 bg-[#0e0717]/80 space-y-2.5">
          <div className="flex items-center justify-between px-1">
            <span className="text-[11px] font-medium text-rose-300/70">Theme Mode</span>
            <ThemeSlider />
          </div>

          {isAuthenticated && user ? (
            <div className="p-2.5 rounded-xl bg-[#180d24] border border-purple-900/40 flex items-center justify-between gap-2">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-purple-600 via-pink-500 to-peach-400 flex items-center justify-center font-bold text-xs text-white shrink-0 shadow-sm">
                  {user.name.slice(0, 2).toUpperCase()}
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-rose-100 truncate">{user.name}</p>
                  <p className="text-[10px] text-rose-300/70 capitalize truncate flex items-center gap-1">
                    {user.role === "student" ? (
                      <GraduationCap className="w-3 h-3 text-pink-400" />
                    ) : (
                      <ShieldCheck className="w-3 h-3 text-purple-400" />
                    )}
                    {user.role} • {user.email.split("@")[0]}
                  </p>
                </div>
              </div>

              <button
                onClick={logout}
                title="Sign Out"
                className="p-1.5 rounded-lg text-slate-400 hover:text-pink-400 hover:bg-pink-500/10 transition-colors"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              onClick={onClose}
              className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 via-pink-600 to-rose-500 hover:from-purple-500 hover:to-rose-400 text-white text-xs font-semibold shadow-md shadow-pink-600/30 transition-all"
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


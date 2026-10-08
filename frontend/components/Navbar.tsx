"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { 
  Sparkles, 
  Compass, 
  Dna, 
  Award, 
  Users, 
  BarChart3, 
  MapPin, 
  GitBranch, 
  Bot, 
  Menu, 
  X,
  TrendingUp,
  LayoutDashboard
} from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/assessment", label: "Assessment", icon: Compass },
    { href: "/career-dna", label: "Career DNA", icon: Dna },
    { href: "/recommendations", label: "Top Matches", icon: Award },
    { href: "/alignment", label: "Conflict Index", icon: Users },
    { href: "/compare", label: "Compare", icon: BarChart3 },
    { href: "/market", label: "Market Intel", icon: TrendingUp },
    { href: "/opportunities", label: "Opportunities", icon: MapPin },
    { href: "/roadmap/ai-ml-engineer", label: "Roadmap", icon: GitBranch },
    { href: "/mentor", label: "AI Mentor", icon: Bot },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-xl border-b border-indigo-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 p-[2px] shadow-lg shadow-indigo-500/25 group-hover:shadow-indigo-500/40 transition-all">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-indigo-400 group-hover:scale-110 transition-transform" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-xl tracking-wider text-white">PRISM</span>
                <span className="text-[10px] font-semibold tracking-widest uppercase bg-indigo-950 text-indigo-300 px-2 py-0.5 rounded-full border border-indigo-700/50">
                  ENGINE
                </span>
              </div>
              <p className="text-[11px] text-slate-400 hidden sm:block">STEAM Career & Family Guidance</p>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href) && item.href.length > 5);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    isActive
                      ? "bg-indigo-600/20 text-indigo-300 border border-indigo-500/30 shadow-sm"
                      : "text-slate-300 hover:text-white hover:bg-slate-800/60"
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? "text-indigo-400" : "text-slate-400"}`} />
                  {item.label}
                </Link>
              );
            })}
          </div>

          {/* Right Action: Parent Portal & Demo Profile */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/parent/dashboard"
              className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-purple-300 border border-purple-500/30 hover:border-purple-500/60 transition-all"
            >
              Parent Portal
            </Link>
            <div className="flex items-center gap-2 pl-2 border-l border-slate-800">
              <div className="w-7 h-7 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center text-xs font-bold text-white shadow-sm">
                AK
              </div>
              <div className="text-left text-[11px] leading-tight">
                <p className="font-semibold text-slate-200">Arun Kumar</p>
                <p className="text-slate-500">12th • Chennai</p>
              </div>
            </div>
          </div>

          {/* Mobile hamburger */}
          <div className="lg:hidden flex items-center gap-2">
            <Link
              href="/parent/dashboard"
              className="text-xs font-semibold px-2 py-1 rounded bg-purple-950/80 text-purple-300 border border-purple-500/30"
            >
              Parent
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-slate-900 text-slate-300 hover:text-white border border-slate-800"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-950/95 border-b border-indigo-900/40 px-4 pt-2 pb-6 space-y-1">
          {navLinks.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium ${
                  isActive
                    ? "bg-indigo-600/20 text-indigo-300 border border-indigo-500/30"
                    : "text-slate-300 hover:text-white hover:bg-slate-900"
                }`}
              >
                <Icon className="w-4 h-4 text-indigo-400" />
                {item.label}
              </Link>
            );
          })}
        </div>
      )}
    </nav>
  );
}


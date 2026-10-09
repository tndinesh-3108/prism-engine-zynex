"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Sparkles,
  GraduationCap,
  Users,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Zap,
  Lock,
  Mail,
  User as UserIcon
} from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { UserRole } from "@/types";

export default function LoginPage() {
  const router = useRouter();
  const { login, register, demoLogin } = useAuth();

  const [activeTab, setActiveTab] = useState<UserRole>("student");
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Form Fields - Pre-populated with verified demo credentials
  const [email, setEmail] = useState("student@prism.edu");
  const [password, setPassword] = useState("student123");
  const [name, setName] = useState("");
  const [classGrade, setClassGrade] = useState("12th Grade");
  const [location, setLocation] = useState("Chennai");
  const [annualBudget, setAnnualBudget] = useState(600000);

  const handleTabChange = (role: UserRole) => {
    setActiveTab(role);
    setErrorMessage(null);
    setSuccessMessage(null);
    setEmail(role === "student" ? "student@prism.edu" : "parent@prism.edu");
    setPassword(role === "student" ? "student123" : "parent123");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);
    setLoading(true);

    try {
      if (isRegisterMode) {
        if (!name.trim()) throw new Error("Please enter your name");
        if (!email.trim()) throw new Error("Please enter your email");
        if (password.length < 4) throw new Error("Password must be at least 4 characters");

        await register({
          email: email.trim().toLowerCase(),
          password,
          name: name.trim(),
          role: activeTab,
          class_grade: classGrade,
          location,
          annual_budget: annualBudget,
        });

        setSuccessMessage("Account created successfully! Redirecting...");
      } else {
        await login({
          email: (email || (activeTab === "student" ? "student@prism.edu" : "parent@prism.edu")).trim().toLowerCase(),
          password: password || (activeTab === "student" ? "student123" : "parent123"),
          role: activeTab,
        });
        setSuccessMessage("Authentication verified! Loading portal...");
      }

      setTimeout(() => {
        if (activeTab === "parent") {
          router.push("/parent/dashboard");
        } else {
          router.push("/student/dashboard");
        }
      }, 400);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Authentication failed. Please check your credentials.";
      setErrorMessage(msg.replace(/^API error \d+: /, ""));
    } finally {
      setLoading(false);
    }
  };

  const handleQuickDemo = async (role: UserRole) => {
    setErrorMessage(null);
    setSuccessMessage(null);
    setLoading(true);

    try {
      await demoLogin(role);
      const roleTitle = role.charAt(0).toUpperCase() + role.slice(1);
      setSuccessMessage(`Logged in as Demo ${roleTitle}! Redirecting...`);
      setTimeout(() => {
        if (role === "parent") {
          router.push("/parent/dashboard");
        } else {
          router.push("/student/dashboard");
        }
      }, 300);
    } catch (err: unknown) {
      console.warn("Demo login error, redirecting directly:", err);
      if (role === "parent") {
        router.push("/parent/dashboard");
      } else {
        router.push("/student/dashboard");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-10rem)] flex items-center justify-center py-6 px-4">
      <div className="w-full max-w-xl space-y-6">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-950/70 border border-pink-700/40 text-pink-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-pink-400" />
            <span>Portal Login</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-white">
            Sign In
          </h1>
          <p className="text-sm text-rose-200/80 max-w-md mx-auto">
            Select your role to access your dashboard.
          </p>
        </div>

        {/* Central Auth Container */}
        <div className="glass-card rounded-2xl border border-pink-500/25 bg-[#140822]/90 p-6 sm:p-8 shadow-xl shadow-purple-950/40 space-y-6">
          {/* Tab Selector: Student vs Parent */}
          <div className="grid grid-cols-2 p-1.5 rounded-xl bg-[#140a1e] border border-purple-900/40">
            <button
              type="button"
              onClick={() => handleTabChange("student")}
              className={`flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-bold transition-all ${
                activeTab === "student"
                  ? "bg-gradient-to-r from-pink-600 to-rose-500 text-white shadow-md shadow-pink-600/30"
                  : "text-rose-300/60 hover:text-white"
              }`}
            >
              <GraduationCap className="w-4 h-4" />
              <span>Student Portal</span>
            </button>

            <button
              type="button"
              onClick={() => handleTabChange("parent")}
              className={`flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-bold transition-all ${
                activeTab === "parent"
                  ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md shadow-purple-600/30"
                  : "text-rose-300/60 hover:text-white"
              }`}
            >
              <Users className="w-4 h-4" />
              <span>Parent Portal</span>
            </button>
          </div>

          {/* Portal Description Banner */}
          <div
            className={`p-3 rounded-xl border text-xs leading-relaxed flex items-center gap-2.5 ${
              activeTab === "student"
                ? "bg-pink-950/30 border-pink-800/40 text-pink-200"
                : "bg-purple-950/30 border-purple-800/40 text-rose-200"
            }`}
          >
            <ShieldCheck
              className={`w-4 h-4 shrink-0 ${
                activeTab === "student" ? "text-pink-400" : "text-purple-400"
              }`}
            />
            <span className="text-xs">
              {activeTab === "student"
                ? "Aptitude tests, career recommendations, and roadmaps."
                : "Annual budget constraints, scholarships, and alignment."}
            </span>
          </div>

          {/* Alert Messages */}
          {errorMessage && (
            <div className="p-3 rounded-xl bg-red-950/50 border border-red-500/40 text-red-200 text-xs flex items-center gap-2.5">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {successMessage && (
            <div className="p-3 rounded-xl bg-peach-950/50 border border-peach-500/40 text-peach-200 text-xs flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-peach-400 shrink-0" />
              <span>{successMessage}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {isRegisterMode && (
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">Full Name</label>
                <div className="relative">
                  <UserIcon className="w-4 h-4 absolute left-3.5 top-3 text-slate-500" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={activeTab === "student" ? "Arun Kumar" : "K. Kumar"}
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs placeholder:text-slate-600 focus:outline-none focus:border-indigo-500 transition-colors"
                  />
                </div>
              </div>
            )}

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3.5 top-3 text-slate-500" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={activeTab === "student" ? "student@prism.edu" : "parent@prism.edu"}
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs placeholder:text-slate-600 focus:outline-none focus:border-indigo-500 transition-colors"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3.5 top-3 text-slate-500" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs placeholder:text-slate-600 focus:outline-none focus:border-indigo-500 transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-slate-500 hover:text-slate-300"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {isRegisterMode && activeTab === "student" && (
              <div className="grid grid-cols-2 gap-3 pt-1">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">Class Grade</label>
                  <input
                    type="text"
                    value={classGrade}
                    onChange={(e) => setClassGrade(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">Location</label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>
            )}

            {isRegisterMode && activeTab === "parent" && (
              <div className="space-y-1.5 pt-1">
                <label className="text-xs font-semibold text-slate-300">Annual Education Budget (₹)</label>
                <input
                  type="number"
                  value={annualBudget}
                  onChange={(e) => setAnnualBudget(Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:outline-none focus:border-purple-500"
                />
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 rounded-xl font-bold text-xs text-white shadow-lg transition-all flex items-center justify-center gap-2 ${
                activeTab === "student"
                  ? "bg-gradient-to-r from-pink-600 via-rose-500 to-peach-500 hover:from-pink-500 hover:to-peach-400 shadow-pink-600/30"
                  : "bg-gradient-to-r from-purple-600 via-pink-600 to-rose-500 hover:from-purple-500 hover:to-pink-500 shadow-purple-600/30"
              } disabled:opacity-50`}
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <span>{isRegisterMode ? "Create Account & Sign In" : "Sign In to Portal"}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Toggle Register / Login */}
          <div className="text-center pt-1">
            <button
              type="button"
              onClick={() => {
                setIsRegisterMode(!isRegisterMode);
                setErrorMessage(null);
                setSuccessMessage(null);
              }}
              className="text-xs text-rose-300/70 hover:text-white transition-colors"
            >
              {isRegisterMode
                ? "Already have an account? Sign In"
                : "Need a new account? Register here"}
            </button>
          </div>

          {/* 1-Click Fast Demo Logins */}
          <div className="pt-4 border-t border-purple-900/30 space-y-3">
            <div className="flex items-center gap-2">
              <Zap className="w-3.5 h-3.5 text-peach-400" />
              <span className="text-xs font-bold text-rose-200 uppercase tracking-wider text-[11px]">
                Instant 1-Click Evaluation
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={() => handleQuickDemo("student")}
                disabled={loading}
                className="p-3 rounded-xl bg-[#180d24] hover:bg-pink-950/40 border border-pink-900/40 hover:border-pink-500/50 text-left transition-all group"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-pink-300">Arun Kumar</span>
                  <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-pink-950 text-pink-300 border border-pink-800/50">
                    Student
                  </span>
                </div>
                <p className="text-[11px] text-rose-300/60 group-hover:text-rose-200">
                  Class 12 • Science PCM • Chennai
                </p>
              </button>

              <button
                type="button"
                onClick={() => handleQuickDemo("parent")}
                disabled={loading}
                className="p-3 rounded-xl bg-[#180d24] hover:bg-purple-950/40 border border-purple-900/40 hover:border-purple-500/50 text-left transition-all group"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-purple-300">K. Kumar</span>
                  <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-800/50">
                    Parent
                  </span>
                </div>
                <p className="text-[11px] text-rose-300/60 group-hover:text-rose-200">
                  Annual Budget: ₹6,00,000
                </p>
              </button>
            </div>
          </div>
        </div>

        {/* Back to Home Link */}
        <div className="text-center">
          <Link href="/" className="text-xs text-slate-500 hover:text-slate-300 transition-colors">
            ← Back to PRISM Engine Overview
          </Link>
        </div>
      </div>
    </div>
  );
}

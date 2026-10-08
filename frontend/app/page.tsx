import Link from "next/link";
import { ArrowRight, Sparkles, Brain, Wallet, TrendingUp } from "lucide-react";

export default function Home() {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4 space-y-16 text-center">
      {/* Hero */}
      <section className="space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-950/60 border border-pink-500/30 text-pink-300 text-sm">
          <Sparkles className="w-4 h-4 text-pink-400" />
          <span>PRISM Engine</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-bold text-white tracking-tight leading-tight">
          Career Architecture
        </h1>

        <p className="text-base sm:text-lg text-rose-200/80 max-w-lg mx-auto leading-relaxed">
          Aligning student aptitude with household finance and market demand.
        </p>

        {/* Portals */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-2xl mx-auto pt-4 text-left">
          {/* Student */}
          <Link
            href="/student/setup"
            className="group p-6 rounded-2xl bg-gradient-to-br from-pink-600/80 to-purple-700/80 hover:from-pink-500 hover:to-purple-600 text-white shadow-lg transition-all border border-pink-400/30 flex flex-col justify-between space-y-4"
          >
            <div>
              <span className="text-xs uppercase tracking-wider font-semibold text-pink-200 block mb-1">
                Student
              </span>
              <h2 className="text-2xl font-bold">Student Portal</h2>
              <p className="text-sm text-rose-100/90 mt-1">
                Aptitude test, career DNA, and ranked careers.
              </p>
            </div>
            <div className="flex items-center gap-2 text-sm font-semibold text-rose-200 group-hover:text-white transition-colors">
              <span>Enter Portal</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Parent */}
          <Link
            href="/parent/sync"
            className="group p-6 rounded-2xl bg-gradient-to-br from-purple-800/80 to-peach-700/80 hover:from-purple-700 hover:to-peach-600 text-white shadow-lg transition-all border border-purple-400/30 flex flex-col justify-between space-y-4"
          >
            <div>
              <span className="text-xs uppercase tracking-wider font-semibold text-peach-200 block mb-1">
                Parent
              </span>
              <h2 className="text-2xl font-bold">Parent Portal</h2>
              <p className="text-sm text-rose-100/90 mt-1">
                Budget limits, loan parameters, and viability index.
              </p>
            </div>
            <div className="flex items-center gap-2 text-sm font-semibold text-peach-200 group-hover:text-white transition-colors">
              <span>Enter Portal</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        </div>
      </section>

      {/* 3 Core Dimensions */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 text-left">
        <div className="glass-card p-5 rounded-xl border border-pink-500/20 space-y-2">
          <Brain className="w-5 h-5 text-pink-400" />
          <h3 className="text-base font-bold text-white">1. Aptitude</h3>
          <p className="text-sm text-rose-200/70">
            Cognitive testing across logic, numeracy, and technical reasoning.
          </p>
        </div>

        <div className="glass-card p-5 rounded-xl border border-purple-500/20 space-y-2">
          <Wallet className="w-5 h-5 text-purple-400" />
          <h3 className="text-base font-bold text-white">2. Affordability</h3>
          <p className="text-sm text-rose-200/70">
            Household budget, degree costs, and loan tolerance.
          </p>
        </div>

        <div className="glass-card p-5 rounded-xl border border-peach-500/20 space-y-2">
          <TrendingUp className="w-5 h-5 text-peach-400" />
          <h3 className="text-base font-bold text-white">3. Market Demand</h3>
          <p className="text-sm text-rose-200/70">
            Hiring velocity, starting salaries, and automation risk.
          </p>
        </div>
      </section>

      {/* Direct Quick Links */}
      <section className="flex items-center justify-center gap-4 text-sm text-rose-300">
        <Link href="/student/dashboard" className="hover:text-white underline">
          Student Dashboard
        </Link>
        <span>•</span>
        <Link href="/parent/dashboard" className="hover:text-white underline">
          Parent Dashboard
        </Link>
        <span>•</span>
        <Link href="/login" className="hover:text-white underline">
          Sign In
        </Link>
      </section>
    </div>
  );
}

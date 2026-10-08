import Link from "next/link";
import { 
  Sparkles, 
  ArrowRight, 
  Brain, 
  Wallet, 
  Users, 
  TrendingUp, 
  MapPin, 
  Route, 
  CheckCircle2, 
  ShieldCheck, 
  ChevronRight
} from "lucide-react";

export default function Home() {
  return (
    <div className="space-y-16 py-6 max-w-5xl mx-auto">
      {/* Hero Section */}
      <section className="text-center space-y-6 pt-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-950/70 border border-pink-500/30 text-pink-300 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5 text-pink-400" />
          <span>Career & Capital Harmonization</span>
        </div>

        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
          Precision Career Architecture{" "}
          <span className="gradient-text block sm:inline">Ambition, Capital & Markets</span>
        </h1>

        <p className="text-sm sm:text-base text-rose-200/80 leading-relaxed max-w-xl mx-auto">
          Harmonizing student cognitive aptitude with household financial capacity and future industry demand.
        </p>

        {/* Dual Portal Entry Doorways */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto pt-2">
          {/* STUDENT ENTRY */}
          <Link
            href="/student/setup"
            className="group p-5 rounded-2xl bg-gradient-to-br from-pink-600/90 to-purple-700/90 hover:from-pink-500 hover:to-purple-600 text-white shadow-lg shadow-pink-900/30 transition-all text-left flex flex-col justify-between space-y-3 border border-pink-400/30"
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/20">
                Student
              </span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
            <div>
              <h2 className="text-lg font-bold">Student Portal</h2>
              <p className="text-xs text-rose-100/80 mt-1">
                Aptitude test, cognitive career DNA, and verified career tiers.
              </p>
            </div>
            <div className="flex items-center gap-1 text-xs font-semibold pt-1 text-rose-200">
              <span>Begin Assessment</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </div>
          </Link>

          {/* PARENT ENTRY */}
          <Link
            href="/parent/sync"
            className="group p-5 rounded-2xl bg-gradient-to-br from-purple-800/90 to-peach-700/90 hover:from-purple-700 hover:to-peach-600 text-white shadow-lg shadow-purple-900/30 transition-all text-left flex flex-col justify-between space-y-3 border border-purple-400/30"
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/20">
                Parent
              </span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
            <div>
              <h2 className="text-lg font-bold">Parent Portal</h2>
              <p className="text-xs text-rose-100/80 mt-1">
                Budget limits, loan tolerance, and financial viability index.
              </p>
            </div>
            <div className="flex items-center gap-1 text-xs font-semibold pt-1 text-peach-200">
              <span>Configure Parameters</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </div>
          </Link>
        </div>

        {/* Quick Links */}
        <div className="flex items-center justify-center gap-3 pt-1 text-xs">
          <Link href="/student/dashboard" className="text-pink-300 hover:text-white underline font-medium">
            Student Dashboard
          </Link>
          <span className="text-purple-400/40">•</span>
          <Link href="/parent/dashboard" className="text-peach-300 hover:text-white underline font-medium">
            Parent Dashboard
          </Link>
          <span className="text-purple-400/40">•</span>
          <Link href="/login" className="text-rose-300 hover:text-white underline font-medium">
            Sign In
          </Link>
        </div>

        {/* Core Principle Callout */}
        <div className="p-3 rounded-xl bg-purple-950/40 border border-purple-900/40 text-xs text-rose-200/80 max-w-lg mx-auto flex items-center justify-center gap-2">
          <ShieldCheck className="w-4 h-4 text-peach-400 shrink-0" />
          <span>Recommendations are verified against family affordability and market demand.</span>
        </div>
      </section>

      {/* Visual Pipeline Section */}
      <section className="space-y-6">
        <div className="text-center space-y-1">
          <h2 className="text-xl sm:text-2xl font-bold text-white">Evaluation Pipeline</h2>
          <p className="text-xs text-rose-300/70">Three inputs converged into ranked trajectories.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-3 items-center">
          <div className="glass-card p-4 rounded-xl border border-pink-500/20 text-center space-y-1.5">
            <div className="w-8 h-8 rounded-lg bg-pink-600/20 text-pink-400 flex items-center justify-center mx-auto">
              <Brain className="w-4 h-4" />
            </div>
            <h3 className="font-bold text-xs text-white">Student DNA</h3>
            <p className="text-[11px] text-rose-200/70">Aptitude & Skills</p>
          </div>

          <div className="hidden md:flex justify-center text-purple-400 font-bold text-base">+</div>

          <div className="glass-card p-4 rounded-xl border border-purple-500/20 text-center space-y-1.5">
            <div className="w-8 h-8 rounded-lg bg-purple-600/20 text-purple-400 flex items-center justify-center mx-auto">
              <Wallet className="w-4 h-4" />
            </div>
            <h3 className="font-bold text-xs text-white">Family Budget</h3>
            <p className="text-[11px] text-rose-200/70">Budget & Loans</p>
          </div>

          <div className="hidden md:flex justify-center text-purple-400 font-bold text-base">+</div>

          <div className="glass-card p-4 rounded-xl border border-peach-500/20 text-center space-y-1.5">
            <div className="w-8 h-8 rounded-lg bg-peach-600/20 text-peach-400 flex items-center justify-center mx-auto">
              <TrendingUp className="w-4 h-4" />
            </div>
            <h3 className="font-bold text-xs text-white">Market Realities</h3>
            <p className="text-[11px] text-rose-200/70">Demand & Salary ROI</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-xl mx-auto pt-1">
          <div className="glass-card p-3 rounded-xl border border-rose-500/20 flex items-center gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-rose-400 shrink-0" />
            <div className="text-xs">
              <span className="font-bold text-white block">Feasible Career Match</span>
              <span className="text-rose-200/70">Ranked recommendations with financial safety.</span>
            </div>
          </div>

          <div className="glass-card p-3 rounded-xl border border-pink-500/20 flex items-center gap-2.5">
            <Route className="w-4 h-4 text-pink-400 shrink-0" />
            <div className="text-xs">
              <span className="font-bold text-white block">Action Roadmap</span>
              <span className="text-rose-200/70">Milestones, certifications, and skills.</span>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Showcase Grid */}
      <section className="space-y-6">
        <div className="text-center space-y-1">
          <h2 className="text-xl sm:text-2xl font-bold text-white">Core Modules</h2>
          <p className="text-xs text-rose-300/70">Platform capabilities.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <Link href="/career-dna" className="glass-card p-5 rounded-xl space-y-2.5 block group border border-pink-500/20 hover:border-pink-500/40 transition-colors">
            <div className="w-9 h-9 rounded-lg bg-pink-600/20 text-pink-400 flex items-center justify-center">
              <Brain className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold text-white group-hover:text-pink-300">Career DNA</h3>
            <p className="text-xs text-rose-200/70 leading-relaxed">
              Multi-dimensional cognitive profiling and psychometric radar charts.
            </p>
          </Link>

          <Link href="/parent/dashboard" className="glass-card p-5 rounded-xl space-y-2.5 block group border border-peach-500/20 hover:border-peach-500/40 transition-colors">
            <div className="w-9 h-9 rounded-lg bg-peach-600/20 text-peach-400 flex items-center justify-center">
              <Wallet className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold text-white group-hover:text-peach-300">Financial Solver</h3>
            <p className="text-xs text-rose-200/70 leading-relaxed">
              Linear optimization for net debt, scholarship coverage, and affordability.
            </p>
          </Link>

          <Link href="/alignment" className="glass-card p-5 rounded-xl space-y-2.5 block group border border-purple-500/20 hover:border-purple-500/40 transition-colors">
            <div className="w-9 h-9 rounded-lg bg-purple-600/20 text-purple-400 flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold text-white group-hover:text-purple-300">Conflict Index</h3>
            <p className="text-xs text-rose-200/70 leading-relaxed">
              Measures friction across risk, location, and career choices.
            </p>
          </Link>

          <Link href="/market" className="glass-card p-5 rounded-xl space-y-2.5 block group border border-rose-500/20 hover:border-rose-500/40 transition-colors">
            <div className="w-9 h-9 rounded-lg bg-rose-600/20 text-rose-400 flex items-center justify-center">
              <TrendingUp className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold text-white group-hover:text-rose-300">Market Intelligence</h3>
            <p className="text-xs text-rose-200/70 leading-relaxed">
              Hiring velocity, starting salaries, and regional industry clusters.
            </p>
          </Link>

          <Link href="/opportunities" className="glass-card p-5 rounded-xl space-y-2.5 block group border border-peach-500/20 hover:border-peach-500/40 transition-colors">
            <div className="w-9 h-9 rounded-lg bg-peach-600/20 text-peach-400 flex items-center justify-center">
              <MapPin className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold text-white group-hover:text-peach-300">Opportunities</h3>
            <p className="text-xs text-rose-200/70 leading-relaxed">
              Curated regional internships, hackathons, and scholarship trackers.
            </p>
          </Link>

          <Link href="/mentor" className="glass-card p-5 rounded-xl space-y-2.5 block group border border-pink-500/20 hover:border-pink-500/40 transition-colors">
            <div className="w-9 h-9 rounded-lg bg-pink-600/20 text-pink-400 flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold text-white group-hover:text-pink-300">AI Career Mentor</h3>
            <p className="text-xs text-rose-200/70 leading-relaxed">
              Contextual guidance grounded in financial and academic bounds.
            </p>
          </Link>
        </div>
      </section>

      {/* Demo Student Spotlight */}
      <section className="glass-card p-6 rounded-2xl border border-pink-500/20 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-center sm:text-left">
          <span className="text-[10px] font-bold uppercase tracking-wider text-pink-300 bg-pink-950/80 px-2 py-0.5 rounded border border-pink-700/40">
            Demo Profile: Arun Kumar
          </span>
          <h3 className="text-base font-bold text-white">Full PRISM Pipeline</h3>
          <p className="text-xs text-rose-200/70">
            17, Class 12, Chennai • Tested in Programming & Math under ₹6.0L budget.
          </p>
        </div>
        <div className="flex gap-2 shrink-0">
          <Link
            href="/dashboard"
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white font-semibold text-xs transition-all shadow-md shadow-pink-600/20"
          >
            Dashboard
          </Link>
          <Link
            href="/roadmap/ai-ml-engineer"
            className="px-4 py-2 rounded-xl bg-purple-950/60 hover:bg-purple-900/60 text-purple-200 border border-purple-800/40 font-semibold text-xs transition-colors"
          >
            Roadmap
          </Link>
        </div>
      </section>
    </div>
  );
}

import Link from "next/link";
import { Sparkles, ShieldCheck } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#09040e] border-t border-purple-950/60 mt-16 text-rose-300/60 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-gradient-to-tr from-purple-600 via-pink-500 to-peach-400 flex items-center justify-center text-white">
              <Sparkles className="w-3.5 h-3.5" />
            </div>
            <span className="font-bold text-sm tracking-wide text-white">PRISM ENGINE</span>
            <span className="text-purple-400/40">•</span>
            <span className="text-[11px] text-rose-300/70">Career & Capital Platform</span>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <Link href="/student/dashboard" className="hover:text-pink-300 transition-colors">
              Student
            </Link>
            <Link href="/parent/dashboard" className="hover:text-pink-300 transition-colors">
              Parent
            </Link>
            <Link href="/student/assessment" className="hover:text-pink-300 transition-colors">
              Aptitude
            </Link>
            <Link href="/student/career-dna" className="hover:text-pink-300 transition-colors">
              Career DNA
            </Link>
          </div>

          <div className="flex items-center gap-1.5 text-[11px] text-rose-300/50">
            <ShieldCheck className="w-3.5 h-3.5 text-peach-400" />
            <span>© 2026 PRISM Engine</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

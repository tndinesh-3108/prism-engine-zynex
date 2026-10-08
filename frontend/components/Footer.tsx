import Link from "next/link";
import { Sparkles, ShieldCheck } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#e2ede5]/95 border-t border-[#b8d4be] mt-16 text-[rgb(18,84,79)]/80 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-[rgb(18,84,79)] flex items-center justify-center text-white">
              <Sparkles className="w-3.5 h-3.5" />
            </div>
            <span className="font-bold text-sm tracking-wide text-[rgb(18,84,79)]">PRISM ENGINE</span>
            <span className="text-[rgb(18,84,79)]/40">•</span>
            <span className="text-[11px] text-[rgb(18,84,79)]/70">Career & Capital Platform</span>
          </div>

          <div className="flex items-center gap-4 text-xs font-semibold">
            <Link href="/student/dashboard" className="hover:text-[rgb(14,68,64)] transition-colors">
              Student
            </Link>
            <Link href="/parent/dashboard" className="hover:text-[rgb(14,68,64)] transition-colors">
              Parent
            </Link>
            <Link href="/student/assessment" className="hover:text-[rgb(14,68,64)] transition-colors">
              Aptitude
            </Link>
            <Link href="/student/career-dna" className="hover:text-[rgb(14,68,64)] transition-colors">
              Career DNA
            </Link>
          </div>

          <div className="flex items-center gap-1.5 text-[11px] text-[rgb(18,84,79)]/60">
            <ShieldCheck className="w-3.5 h-3.5 text-[rgb(42,131,95)]" />
            <span>© 2026 PRISM Engine</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

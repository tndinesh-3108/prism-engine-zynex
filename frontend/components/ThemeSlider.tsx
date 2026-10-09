"use client";

import React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/lib/theme-context";

interface ThemeSliderProps {
  className?: string;
  showLabels?: boolean;
}

export default function ThemeSlider({ className = "", showLabels = true }: ThemeSliderProps) {
  const { theme, setTheme } = useTheme();
  const isWhite = theme === "white";

  return (
    <div
      role="radiogroup"
      aria-label="Theme mode selector"
      className={`relative inline-flex items-center p-1 rounded-full border transition-all duration-300 select-none ${
        isWhite
          ? "bg-rose-50/90 border-pink-300 shadow-sm"
          : "bg-[#160a22]/90 border-purple-800/50 shadow-inner"
      } ${className}`}
    >
      {/* Sliding Pill Indicator */}
      <div
        className={`absolute top-1 bottom-1 w-[calc(50%-4px)] rounded-full transition-transform duration-300 ease-out shadow-md pointer-events-none ${
          isWhite
            ? "translate-x-[calc(100%+2px)] bg-gradient-to-r from-peach-500 via-pink-500 to-purple-600 shadow-peach-500/30"
            : "translate-x-0 bg-gradient-to-r from-purple-600 to-pink-600 shadow-pink-600/40"
        }`}
      />

      {/* Dark Option Button */}
      <button
        type="button"
        role="radio"
        aria-checked={!isWhite}
        onClick={() => setTheme("dark")}
        className={`relative z-10 flex items-center justify-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-full transition-colors duration-200 ${
          !isWhite
            ? "text-white"
            : "text-purple-900/70 hover:text-purple-950"
        }`}
      >
        <Moon className={`w-3.5 h-3.5 transition-transform duration-200 ${!isWhite ? "text-pink-200 rotate-0" : "-rotate-12"}`} />
        {showLabels && <span className="tracking-tight">Dark</span>}
      </button>

      {/* White Option Button */}
      <button
        type="button"
        role="radio"
        aria-checked={isWhite}
        onClick={() => setTheme("white")}
        className={`relative z-10 flex items-center justify-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-full transition-colors duration-200 ${
          isWhite
            ? "text-white"
            : "text-rose-200/60 hover:text-rose-100"
        }`}
      >
        <Sun className={`w-3.5 h-3.5 transition-transform duration-200 ${isWhite ? "text-peach-200 rotate-0" : "rotate-45"}`} />
        {showLabels && <span className="tracking-tight">White</span>}
      </button>
    </div>
  );
}


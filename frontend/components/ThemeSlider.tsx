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
      className={`relative inline-flex items-center p-1 rounded-full border border-[#cbe1d0] bg-white shadow-sm transition-all duration-300 select-none ${className}`}
    >
      {/* Sliding Pill Indicator */}
      <div
        className={`absolute top-1 bottom-1 w-[calc(50%-4px)] rounded-full transition-transform duration-300 ease-out shadow-sm pointer-events-none bg-[rgb(18,84,79)] ${
          isWhite
            ? "translate-x-[calc(100%+2px)]"
            : "translate-x-0"
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
            : "text-[rgb(18,84,79)] hover:text-[#0b3834]"
        }`}
      >
        <Moon className={`w-3.5 h-3.5 transition-transform duration-200 ${!isWhite ? "text-white rotate-0" : "-rotate-12 text-[rgb(18,84,79)]"}`} />
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
            : "text-[rgb(18,84,79)] hover:text-[#0b3834]"
        }`}
      >
        <Sun className={`w-3.5 h-3.5 transition-transform duration-200 ${isWhite ? "text-white rotate-0" : "rotate-45 text-[rgb(18,84,79)]"}`} />
        {showLabels && <span className="tracking-tight">White</span>}
      </button>
    </div>
  );
}


"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export type Theme = "dark" | "white";

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: "dark",
  setTheme: () => {},
  toggleTheme: () => {},
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("dark");

  useEffect(() => {
    const saved = localStorage.getItem("prism_theme") as Theme | null;
    if (saved === "white" || saved === "dark") {
      setThemeState(saved);
      applyTheme(saved);
    } else {
      applyTheme("dark");
    }
  }, []);

  const applyTheme = (t: Theme) => {
    if (typeof document === "undefined") return;
    const root = document.documentElement;
    const body = document.body;
    root.setAttribute("data-theme", t);
    if (t === "white") {
      root.classList.add("theme-white");
      root.classList.remove("theme-dark");
      body.classList.add("theme-white");
      body.classList.remove("theme-dark");
    } else {
      root.classList.add("theme-dark");
      root.classList.remove("theme-white");
      body.classList.add("theme-dark");
      body.classList.remove("theme-white");
    }
  };

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    if (typeof window !== "undefined") {
      localStorage.setItem("prism_theme", newTheme);
    }
    applyTheme(newTheme);
  };

  const toggleTheme = () => {
    const next = theme === "dark" ? "white" : "dark";
    setTheme(next);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}

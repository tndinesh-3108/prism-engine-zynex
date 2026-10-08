import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        // Primary Teal: rgb(18, 84, 79)
        prismteal: {
          DEFAULT: "rgb(18, 84, 79)",
          50: "#e6f2f1",
          100: "#cce5e3",
          200: "#99cbc7",
          300: "#66b1ab",
          400: "#33978f",
          500: "rgb(18, 84, 79)", // #12544f
          600: "#0e433f",
          700: "#0b3431",
          800: "#072422",
          900: "#041514",
        },
        // Secondary Green: rgb(42, 131, 95)
        prismgreen: {
          DEFAULT: "rgb(42, 131, 95)",
          50: "#edf7f2",
          100: "#dbeee5",
          200: "#b7decb",
          300: "#93ceb1",
          400: "#6fbe97",
          500: "rgb(42, 131, 95)", // #2a835f
          600: "#226f50",
          700: "#1a573e",
          800: "#133f2d",
          900: "#0b261b",
        },
        // Background Sage: rgb(139, 187, 146)
        prismsage: {
          DEFAULT: "rgb(139, 187, 146)",
          50: "#f5f9f6",
          100: "#eaf4ec",
          200: "#d5e9d9",
          300: "#bfdec6",
          400: "#a5d2ad",
          500: "rgb(139, 187, 146)", // #8bbb92
          600: "#75aa7e",
          700: "#5c9265",
          800: "#45724d",
          900: "#2d4d33",
        },
      },
      fontFamily: {
        sans: ['"Segoe UI"', "-apple-system", "BlinkMacSystemFont", "Roboto", "Helvetica", "Arial", "sans-serif"],
        serif: ['"Segoe UI"', "-apple-system", "BlinkMacSystemFont", "Roboto", "Helvetica", "Arial", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;

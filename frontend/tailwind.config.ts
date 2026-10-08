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
        peach: {
          50: "#fff8f5",
          100: "#ffede5",
          200: "#ffd9cb",
          300: "#ffbba6",
          400: "#ff977a",
          500: "#f97352",
          600: "#e65432",
          700: "#bf3f22",
          800: "#9c3720",
          900: "#7e311f",
          950: "#45140b",
        },
        lightrose: {
          50: "#fff1f2",
          100: "#ffe4e6",
          200: "#fecdd3",
          300: "#fda4af",
          400: "#fb7185",
          500: "#f43f5e",
          600: "#e11d48",
          700: "#be123c",
          800: "#9f1239",
          950: "#4c0519",
        },
        prism: {
          50: "#fdf4ff",
          100: "#fae8ff",
          200: "#f5d0fe",
          300: "#f0abfc",
          400: "#e879f9",
          500: "#d946ef",
          600: "#c026d3",
          700: "#a21caf",
          800: "#86198f",
          900: "#701a75",
          950: "#3b0764",
        },
        slate: {
          850: "#160d1f",
          900: "#120a1a",
          950: "#0d0614",
        }
      },
      fontFamily: {
        sans: ['"Segoe UI"', "-apple-system", "BlinkMacSystemFont", "Roboto", "Helvetica", "Arial", "sans-serif"],
        serif: ['"Segoe UI"', "-apple-system", "BlinkMacSystemFont", "Roboto", "Helvetica", "Arial", "sans-serif"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      }
    },
  },
  plugins: [],
};
export default config;

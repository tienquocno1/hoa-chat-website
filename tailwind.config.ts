import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        heading: ["var(--font-be-vietnam)", "sans-serif"],
      },
      colors: {
        brand: {
          50:  "#eef5ff",
          100: "#d9e8ff",
          200: "#bcd5ff",
          300: "#8eb8ff",
          400: "#5990ff",
          500: "#2d6be4",
          600: "#1a50c8",
          700: "#163fa3",
          800: "#183686",
          900: "#192f6f",
          950: "#111e47",
        },
        accent: {
          400: "#fb923c",
          500: "#f97316",
          600: "#ea6c0a",
        },
      },
      animation: {
        "fade-in":   "fadeIn 0.5s ease-in-out",
        "slide-up":  "slideUp 0.5s ease-out",
        "float":     "float 3s ease-in-out infinite",
        "pulse-slow":"pulse 3s ease-in-out infinite",
      },
      keyframes: {
        fadeIn:  { "0%": { opacity: "0" }, "100%": { opacity: "1" } },
        slideUp: { "0%": { opacity: "0", transform: "translateY(20px)" }, "100%": { opacity: "1", transform: "translateY(0)" } },
        float:   { "0%, 100%": { transform: "translateY(0px)" }, "50%": { transform: "translateY(-10px)" } },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "hero-pattern": "linear-gradient(135deg, #111e47 0%, #1a3a7a 50%, #0f2560 100%)",
      },
    },
  },
  plugins: [],
};

export default config;

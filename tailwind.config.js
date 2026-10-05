/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        dark: {
          base: "#070c14",
          surface: "#0e1726",
          card: "#121d30",
          border: "#1c2d46",
          subtle: "#243b5a",
        },
        light: {
          base: "#f8fafc",
          surface: "#ffffff",
          card: "#f1f5f9",
          border: "#e2e8f0",
          subtle: "#cbd5e1",
        },
        cyber: {
          cyan: "#00f2fe",
          blue: "#38bdf8",
          teal: "#2dd4bf",
          amber: "#f59e0b",
          emerald: "#10b981",
          purple: "#a855f7",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        heading: ["Rajdhani", "Inter", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "float": "float 5s ease-in-out infinite",
        "glow": "glow 3s ease-in-out infinite alternate",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        glow: {
          "0%": { boxShadow: "0 0 15px rgba(0, 242, 254, 0.2)" },
          "100%": { boxShadow: "0 0 30px rgba(0, 242, 254, 0.5)" },
        },
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
};

import colors from "tailwindcss/colors";

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
        slate: {
          ...colors.slate,
          950: "#090c10", // deepest metallic graphite charcoal
          900: "#0f131a", // gunmetal base
          800: "#171c26", // metallic titanium
          700: "#28303f", // steel border
        },
        dark: {
          base: "#090c10",
          surface: "#0f131a",
          card: "#151a24",
          border: "#252d3d",
          subtle: "#394458",
        },
        light: {
          base: "#f8fafc",
          surface: "#ffffff",
          card: "#f1f5f9",
          border: "#e2e8f0",
          subtle: "#cbd5e1",
        },
        // Liquid Silver / Chrome / Titanium Metallic replacing neon cyan
        cyan: {
          50: "#ffffff",
          100: "#f8fafc",
          200: "#f1f5f9",
          300: "#e2e8f0",
          400: "#cbd5e1",
          500: "#e2e8f0",
          600: "#94a3b8",
          700: "#64748b",
          800: "#475569",
          900: "#334155",
          950: "#161b24",
        },
        // Metallic Gunmetal / Steel Slate
        blue: {
          ...colors.blue,
          400: "#94a3b8",
          500: "#64748b",
          600: "#475569",
          700: "#334155",
          800: "#1e293b",
          900: "#131822",
          950: "#0c0f16",
        },
        cyber: {
          cyan: "#e2e8f0",     // Liquid Silver
          blue: "#94a3b8",     // Polished Steel
          silver: "#f1f5f9",   // Platinum Sheen
          chrome: "#ffffff",   // Specular Chrome
          titanium: "#64748b", // Gunmetal Titanium
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
          "0%": { boxShadow: "0 0 15px rgba(226, 232, 240, 0.2)" },
          "100%": { boxShadow: "0 0 30px rgba(226, 232, 240, 0.45)" },
        },
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
};

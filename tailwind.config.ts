import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/features/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        teal: {
          DEFAULT: "#0D3B3F",
          dark: "#072427",
          soft: "#1A565C",
          surface: "#0A2D30",
        },
        sand: {
          DEFAULT: "#F4EFE6",
          light: "#FAF7F2",
          surface: "#ECE5D8",
          dark: "#DDD3C1",
        },
        terracotta: {
          DEFAULT: "#C85A32",
          soft: "#DF764F",
          dark: "#9E3E1C",
        },
        bg: "var(--bg)",
        surface: "var(--surface)",
        "surface-elevated": "var(--surface-elevated)",
        glass: "var(--glass)",
        "glass-border": "var(--glass-border)",
        gold: {
          DEFAULT: "var(--gold)",
          soft: "var(--gold-soft)",
          dark: "var(--gold-dark)",
          glow: "var(--gold-glow)",
        },
        ivory: "var(--ivory)",
        muted: "var(--muted)",
        "muted-dark": "var(--muted-dark)",
      },
      fontFamily: {
        display: ["var(--font-playfair)", "Playfair Display", "Georgia", "serif"],
        sans: ["var(--font-plus-jakarta)", "Plus Jakarta Sans", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
      },
      boxShadow: {
        "gold-glow": "0 0 25px -5px rgba(201, 162, 75, 0.35)",
        "gold-subtle": "0 0 15px -3px rgba(201, 162, 75, 0.18)",
        "glass-card": "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
      },
      transitionTimingFunction: {
        "out-expo": "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        pulseGlow: {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "0.8" },
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        shimmer: "shimmer 3s ease-in-out infinite",
        "pulse-glow": "pulseGlow 4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;

import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "-apple-system", "sans-serif"],
      },
      colors: {
        background: "#0a0a12",
        foreground: "#f0f0f5",
        card: {
          DEFAULT: "#12121e",
          foreground: "#f0f0f5",
        },
        popover: {
          DEFAULT: "#12121e",
          foreground: "#f0f0f5",
        },
        primary: {
          DEFAULT: "#6366f1",
          dark: "#4f46e5",
          light: "#818cf8",
          foreground: "#ffffff",
        },
        secondary: {
          DEFAULT: "#1a1a2e",
          foreground: "#f0f0f5",
        },
        muted: {
          DEFAULT: "#1a1a2e",
          foreground: "#8888a0",
        },
        accent: {
          DEFAULT: "#f59e0b",
          foreground: "#0a0a12",
        },
        success: "#10b981",
        "amber-accent": "#f59e0b",
        "teal-accent": "#14b8a6",
        "rose-accent": "#f43f5e",
        destructive: {
          DEFAULT: "#ef4444",
          foreground: "#f0f0f5",
        },
        border: "rgba(255,255,255,0.06)",
        input: "rgba(255,255,255,0.06)",
        ring: "#6366f1",
        surface: "#0f0f1a",
      },
      borderRadius: {
        lg: "12px",
        md: "10px",
        sm: "6px",
        xl: "20px",
        "2xl": "28px",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        "pulse-glow": {
          "0%, 100%": { boxShadow: "0 0 20px 0 rgba(99,102,241,0.3)" },
          "50%": { boxShadow: "0 0 40px 8px rgba(99,102,241,0.5)" },
        },
        "gradient-shift": {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
        celestial: {
          "0%, 100%": { transform: "translate(0, 0) scale(1)", opacity: "0.6" },
          "33%": { transform: "translate(30px, -20px) scale(1.1)", opacity: "0.8" },
          "66%": { transform: "translate(-20px, 15px) scale(0.95)", opacity: "0.5" },
        },
        "typing-cursor": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        float: "float 6s ease-in-out infinite",
        "float-delayed": "float 6s ease-in-out infinite -3s",
        marquee: "marquee 30s linear infinite",
        "marquee-fast": "marquee 20s linear infinite",
        "marquee-slow": "marquee 40s linear infinite",
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
        "gradient-shift": "gradient-shift 8s ease infinite",
        celestial: "celestial 20s ease-in-out infinite",
        "typing-cursor": "typing-cursor 0.8s ease-in-out infinite",
      },
      boxShadow: {
        glow: "0 0 40px -10px rgba(99,102,241,0.5)",
        "glow-lg": "0 0 80px -15px rgba(99,102,241,0.4)",
        "glow-sm": "0 0 20px -5px rgba(99,102,241,0.3)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "#5A84F8",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "#2C3D8F",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "#6A6B83",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        "neutral-soft": "#A8B1CE",
        "blue-light": "#DCDFFF",
        "blue-subtle": "#F2F4FF",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        sans: ["Poppins", "sans-serif"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        card: "20px",
        "card-sm": "16px",
        "card-xs": "12px",
        button: "10px",
        pill: "999px",
      },
      boxShadow: {
        card: "0 1px 3px rgba(90, 132, 248, 0.06), 0 1px 2px rgba(0, 0, 0, 0.04)",
        "card-hover":
          "0 4px 12px rgba(90, 132, 248, 0.08), 0 2px 4px rgba(0, 0, 0, 0.04)",
        nav: "0 1px 3px rgba(0, 0, 0, 0.04), 0 1px 2px rgba(90, 132, 248, 0.04)",
        float:
          "0 8px 24px rgba(90, 132, 248, 0.1), 0 2px 8px rgba(0, 0, 0, 0.04)",
      },
      spacing: {
        "18": "4.5rem",
        "22": "5.5rem",
        "30": "7.5rem",
      },
      maxWidth: {
        landing: "1200px",
        generator: "1050px",
      },
      animation: {
        "float-slow": "float 6s ease-in-out infinite",
        "float-medium": "float 5s ease-in-out infinite",
        "float-fast": "float 4s ease-in-out infinite",
        draw: "draw 2s ease-out forwards",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
        draw: {
          "0%": { strokeDashoffset: "1000" },
          "100%": { strokeDashoffset: "0" },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;

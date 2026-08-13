import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: {
          DEFAULT: "#FAF8F4",
          dim: "#F1EDE5",
        },
        ink: {
          DEFAULT: "#12182A",
          soft: "#2B3245",
        },
        navy: {
          DEFAULT: "#16223D",
          900: "#0E1729",
          800: "#16223D",
          700: "#1D2C4B",
        },
        steel: {
          DEFAULT: "#8F99AA",
          line: "#DEDBD1",
          "line-dark": "rgba(250,248,244,0.14)",
        },
        graphite: "#57616F",
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "Helvetica", "Arial", "sans-serif"],
        display: ["var(--font-display)", "Arial Narrow", "sans-serif"],
      },
      maxWidth: {
        content: "1280px",
        prose: "700px",
      },
      letterSpacing: {
        wide2: "0.14em",
        widest2: "0.22em",
      },
    },
  },
  plugins: [],
};

export default config;

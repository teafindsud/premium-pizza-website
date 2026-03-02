import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "var(--pizza-text-primary)",
        secondary: "var(--pizza-text-secondary)",
        accent: "var(--pizza-accent)",
        gold: "var(--pizza-gold)",
        dark: "var(--pizza-dark)",
        "bg-primary": "var(--pizza-bg-primary)",
        "bg-secondary": "var(--pizza-bg-secondary)",
        border: "var(--pizza-border)",
      },
      fontFamily: {
        serif: ["var(--font-playfair)", "serif"],
        sans: ["var(--font-inter)", "sans-serif"],
      },
      backgroundImage: {
        "pizza-gradient-135": "linear-gradient(135deg, #2A1410 0%, #140A07 100%)",
        "red-gradient": "linear-gradient(to right, #E63946, #C72C41)",
      },
    },
  },
  plugins: [],
} satisfies Config;

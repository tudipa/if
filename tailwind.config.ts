import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: "#102033",
        ocean: "#0E5A8A",
        campus: "#F5B642",
        leaf: "#13866F"
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Arial", "sans-serif"]
      },
      boxShadow: {
        soft: "0 18px 50px rgba(16, 32, 51, 0.10)"
      }
    }
  },
  plugins: []
};

export default config;

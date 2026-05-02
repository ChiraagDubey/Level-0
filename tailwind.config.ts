import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/app/**/*.{ts,tsx}", "./src/components/**/*.{ts,tsx}", "./src/templates/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#111111",
        sand: "#f5efe3",
        clay: "#dfd2bc",
        peach: "#f08a5d",
      },
      boxShadow: {
        panel: "0 24px 80px rgba(17, 17, 17, 0.08)",
      },
      backgroundImage: {
        grid: "radial-gradient(circle at center, rgba(17,17,17,0.12) 1px, transparent 1px)",
      },
    },
  },
  plugins: [],
};

export default config;

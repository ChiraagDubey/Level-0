import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/app/**/*.{ts,tsx}", "./src/components/**/*.{ts,tsx}", "./src/templates/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "surface-container": "#f0eee9",
        "on-background": "#1b1c19",
        "surface-container-lowest": "#ffffff",
        "on-error-container": "#93000a",
        "secondary": "#1f686f",
        "primary-fixed-dim": "#ffb77f",
        "error-container": "#ffdad6",
        "surface-dim": "#dbdad5",
        "on-primary-container": "#ffc69b",
        "outline-variant": "#d8c2b4",
        "inverse-on-surface": "#f2f1ec",
        "secondary-fixed-dim": "#8fd1da",
        "surface-container-low": "#f5f3ee",
        "surface-container-highest": "#e4e2dd",
        "on-secondary-fixed": "#001f23",
        "tertiary-fixed": "#e2e2e8",
        "on-surface": "#1b1c19",
        "primary": "#683500",
        "on-surface-variant": "#534439",
        "outline": "#867467",
        "inverse-primary": "#ffb77f",
        "on-tertiary-fixed-variant": "#45474b",
        "tertiary": "#414347",
        "on-tertiary-fixed": "#1a1c20",
        "background": "#fbf9f4",
        "on-secondary-fixed-variant": "#004f56",
        "on-secondary": "#ffffff",
        "on-tertiary-container": "#d1d1d7",
        "surface-container-high": "#eae8e3",
        "tertiary-container": "#585a5f",
        "surface": "#fbf9f4",
        "surface-variant": "#e4e2dd",
        "on-primary-fixed-variant": "#6f3900",
        "on-primary-fixed": "#2f1500",
        "tertiary-fixed-dim": "#c6c6cc",
        "secondary-fixed": "#abeef6",
        "on-tertiary": "#ffffff",
        "primary-container": "#884a0c",
        "on-primary": "#ffffff",
        "on-error": "#ffffff",
        "on-secondary-container": "#256c74",
        "error": "#ba1a1a",
        "inverse-surface": "#30312e",
        "primary-fixed": "#ffdcc3",
        "surface-tint": "#8e4e11",
        "secondary-container": "#a8ebf4",
        "surface-bright": "#fbf9f4"
      },
      borderRadius: {
        DEFAULT: "0.5rem",
        lg: "0.75rem",
        xl: "1rem",
        "2xl": "1.5rem",
        full: "9999px"
      },
      spacing: {
        sm: "16px",
        md: "24px",
        lg: "48px",
        gutter: "24px",
        xs: "8px",
        base: "4px",
        xl: "80px",
        "container-max": "1280px"
      },
      fontFamily: {
        "terminal-lg": ["var(--font-mono)"],
        "terminal-sm": ["var(--font-mono)"],
        h1: ["var(--font-mono)"],
        "body-main": ["var(--font-display)"],
        h2: ["var(--font-mono)"],
        caption: ["var(--font-display)"]
      },
      fontSize: {
        "terminal-lg": ["18px", { lineHeight: "1.4", letterSpacing: "0.05em", fontWeight: "500" }],
        "terminal-sm": ["13px", { lineHeight: "1.2", fontWeight: "400" }],
        h1: ["48px", { lineHeight: "1.1", letterSpacing: "-0.02em", fontWeight: "700" }],
        "body-main": ["16px", { lineHeight: "1.6", fontWeight: "400" }],
        h2: ["32px", { lineHeight: "1.2", fontWeight: "600" }],
        caption: ["12px", { lineHeight: "1.4", fontWeight: "500" }]
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

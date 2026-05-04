import type { PortfolioData } from "@/types/portfolio";
export function createExportPackageJson() {
  return JSON.stringify(
    {
      name: "level-0-exported-portfolio",
      private: true,
      version: "0.1.0",
      scripts: {
        dev: "next dev",
        build: "next build",
        start: "next start",
      },
      dependencies: {
        next: "^15.0.0",
        react: "^19.0.0",
        "react-dom": "^19.0.0",
      },
      devDependencies: {
        "@types/node": "^22.10.2",
        "@types/react": "^19.0.2",
        "@types/react-dom": "^19.0.2",
        typescript: "^5.7.2",
      },
    },
    null,
    2,
  );
}

export function createReadme() {
  return `# Exported LEVEL 0 Portfolio

This project was generated from LEVEL 0.

## Run locally

\`\`\`bash
npm install
npm run dev
\`\`\`
`;
}

export function createLayoutFile() {
  return `import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Exported from LEVEL 0",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
`;
}

export function createNextEnvFile() {
  return `/// <reference types="next" />
/// <reference types="next/image-types/global" />
`;
}

export function createPageFile() {
  return `import { PortfolioTemplate } from "../components/PortfolioTemplate";
import { portfolio } from "../data/portfolio";

export default function HomePage() {
  return <PortfolioTemplate data={portfolio} />;
}
`;
}

export function createTsConfig() {
  return `{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": false,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ]
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
`;
}

export function createPortfolioDataFile(portfolio: PortfolioData) {
  return `export const portfolio = ${JSON.stringify(portfolio, null, 2)} as const;
`;
}


import JSZip from "jszip";
import {
  createExportPackageJson,
  createLayoutFile,
  createNextEnvFile,
  createPageFile,
  createPortfolioDataFile,
  createReadme,
  createTsConfig,
} from "@/lib/export-zip/baseFiles";
import { createTemplateFiles, resolveExportTemplateId } from "@/lib/export-zip/templateRegistry";
import type { PortfolioData } from "@/types/portfolio";

export async function downloadPortfolioZip(portfolio: PortfolioData, templateId: string) {
  const zip = new JSZip();
  const resolvedTemplateId = resolveExportTemplateId(templateId);
  const templateFiles = createTemplateFiles(resolvedTemplateId);

  zip.file("package.json", createExportPackageJson());
  zip.file("README.md", createReadme());
  zip.file("tsconfig.json", createTsConfig());
  zip.file("next-env.d.ts", createNextEnvFile());
  zip.file("src/app/page.tsx", createPageFile());
  zip.file("src/app/layout.tsx", createLayoutFile());
  zip.file("src/app/globals.css", templateFiles.globalsCss);
  zip.file("src/data/portfolio.ts", createPortfolioDataFile(portfolio));
  zip.file("src/components/PortfolioTemplate.tsx", templateFiles.portfolioTemplate);

  const blob = await zip.generateAsync({ type: "blob" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");

  anchor.href = url;
  anchor.download = "level-0-portfolio-export.zip";
  anchor.click();

  window.setTimeout(() => {
    URL.revokeObjectURL(url);
  }, 0);
}

import { createArcadeNeonGlobalsCss, createArcadeNeonPortfolioTemplateFile } from "@/lib/export-zip/templates/arcadeNeon";
import { createDarkStarterGlobalsCss, createDarkStarterPortfolioTemplateFile } from "@/lib/export-zip/templates/darkStarter";
import { createDeveloperOSGlobalsCss, createDeveloperOSPortfolioTemplateFile } from "@/lib/export-zip/templates/developerOS";
import { createLightVCardGlobalsCss, createLightVCardPortfolioTemplateFile } from "@/lib/export-zip/templates/lightVCard";
import { createProfileCardGlobalsCss, createProfileCardPortfolioTemplateFile } from "@/lib/export-zip/templates/profileCard";
import { createSimpleStarterGlobalsCss, createSimpleStarterPortfolioTemplateFile } from "@/lib/export-zip/templates/simpleStarter";
import type { ExportTemplateFiles, ExportTemplateId } from "@/lib/export-zip/types";

export function resolveExportTemplateId(templateId: string): ExportTemplateId {
  return (
    templateId === "dark-starter" ||
    templateId === "profile-card" ||
    templateId === "light-vcard" ||
    templateId === "developer-os" ||
    templateId === "arcade-neon"
      ? templateId
      : "simple-starter"
  ) as ExportTemplateId;
}

export function createTemplateFiles(templateId: ExportTemplateId): ExportTemplateFiles {
  if (templateId === "arcade-neon") {
    return {
      globalsCss: createArcadeNeonGlobalsCss(),
      portfolioTemplate: createArcadeNeonPortfolioTemplateFile(),
    };
  }

  if (templateId === "developer-os") {
    return {
      globalsCss: createDeveloperOSGlobalsCss(),
      portfolioTemplate: createDeveloperOSPortfolioTemplateFile(),
    };
  }

  if (templateId === "light-vcard") {
    return {
      globalsCss: createLightVCardGlobalsCss(),
      portfolioTemplate: createLightVCardPortfolioTemplateFile(),
    };
  }

  if (templateId === "profile-card") {
    return {
      globalsCss: createProfileCardGlobalsCss(),
      portfolioTemplate: createProfileCardPortfolioTemplateFile(),
    };
  }

  if (templateId === "dark-starter") {
    return {
      globalsCss: createDarkStarterGlobalsCss(),
      portfolioTemplate: createDarkStarterPortfolioTemplateFile(),
    };
  }

  return {
    globalsCss: createSimpleStarterGlobalsCss(),
    portfolioTemplate: createSimpleStarterPortfolioTemplateFile(),
  };
}

import type { ComponentType } from "react";
import { defaultPortfolioData as arcadeNeonDefaultData } from "@/templates/arcade-neon/defaultData";
import { arcadeNeonMetadata } from "@/templates/arcade-neon/metadata";
import { ArcadeNeonTemplate } from "@/templates/arcade-neon/Template";
import { defaultPortfolioData as darkStarterDefaultData } from "@/templates/dark-starter/defaultData";
import { darkStarterMetadata } from "@/templates/dark-starter/metadata";
import { DarkStarterTemplate } from "@/templates/dark-starter/Template";
import { defaultPortfolioData as developerOSDefaultData } from "@/templates/developer-os/defaultData";
import { developerOSMetadata } from "@/templates/developer-os/metadata";
import { DeveloperOSTemplate } from "@/templates/developer-os/Template";
import { defaultPortfolioData as lightVCardDefaultData } from "@/templates/light-vcard/defaultData";
import { lightVCardMetadata } from "@/templates/light-vcard/metadata";
import { LightVCardTemplate } from "@/templates/light-vcard/Template";
import { defaultPortfolioData as profileCardDefaultData } from "@/templates/profile-card/defaultData";
import { profileCardMetadata } from "@/templates/profile-card/metadata";
import { ProfileCardTemplate } from "@/templates/profile-card/Template";
import { defaultPortfolioData as simpleStarterDefaultData } from "@/templates/simple-starter/defaultData";
import { simpleStarterMetadata } from "@/templates/simple-starter/metadata";
import { SimpleStarterTemplate } from "@/templates/simple-starter/Template";
import type { PortfolioData, TemplateMetadata } from "@/types/portfolio";

export interface TemplateComponentProps {
  data: PortfolioData;
  editable?: boolean;
  onTextEdit?: (path: Array<string | number>, value: string) => void;
  onImageEdit?: (path: Array<string | number>, value: string) => void;
}

export interface TemplateDefinition {
  metadata: TemplateMetadata;
  gallery: TemplateGalleryMetadata;
  defaultData: PortfolioData;
  TemplateComponent: ComponentType<TemplateComponentProps>;
  exportSupported: boolean;
  exportNote?: string;
}

export type TemplateGalleryTheme = "light" | "dark";
export type TemplateGalleryPlan = "Free";
export type TemplatePreviewStyle =
  | "minimal"
  | "dark-clean"
  | "dark-vcard"
  | "light-vcard"
  | "developer-os"
  | "arcade-neon";

export interface TemplateGalleryMetadata {
  theme: TemplateGalleryTheme;
  plan: TemplateGalleryPlan;
  bestFor: string;
  previewStyle: TemplatePreviewStyle;
}

export interface TemplateGalleryEntry extends TemplateMetadata {
  gallery: TemplateGalleryMetadata;
}

export const TEMPLATE_REGISTRY: Record<string, TemplateDefinition> = {
  [simpleStarterMetadata.id]: {
    metadata: simpleStarterMetadata,
    gallery: {
      theme: "light",
      plan: "Free",
      bestFor: "First portfolio launch",
      previewStyle: "minimal",
    },
    defaultData: simpleStarterDefaultData,
    TemplateComponent: SimpleStarterTemplate,
    exportSupported: true,
  },
  [darkStarterMetadata.id]: {
    metadata: darkStarterMetadata,
    gallery: {
      theme: "dark",
      plan: "Free",
      bestFor: "Clean dark portfolios",
      previewStyle: "dark-clean",
    },
    defaultData: darkStarterDefaultData,
    TemplateComponent: DarkStarterTemplate,
    exportSupported: true,
  },
  [profileCardMetadata.id]: {
    metadata: profileCardMetadata,
    gallery: {
      theme: "dark",
      plan: "Free",
      bestFor: "Compact personal brand",
      previewStyle: "dark-vcard",
    },
    defaultData: profileCardDefaultData,
    TemplateComponent: ProfileCardTemplate,
    exportSupported: true,
  },
  [lightVCardMetadata.id]: {
    metadata: lightVCardMetadata,
    gallery: {
      theme: "light",
      plan: "Free",
      bestFor: "Polished profile sites",
      previewStyle: "light-vcard",
    },
    defaultData: lightVCardDefaultData,
    TemplateComponent: LightVCardTemplate,
    exportSupported: true,
  },
  [developerOSMetadata.id]: {
    metadata: developerOSMetadata,
    gallery: {
      theme: "dark",
      plan: "Free",
      bestFor: "Developer dashboards",
      previewStyle: "developer-os",
    },
    defaultData: developerOSDefaultData,
    TemplateComponent: DeveloperOSTemplate,
    exportSupported: true,
  },
  [arcadeNeonMetadata.id]: {
    metadata: arcadeNeonMetadata,
    gallery: {
      theme: "dark",
      plan: "Free",
      bestFor: "Bold experimental portfolios",
      previewStyle: "arcade-neon",
    },
    defaultData: arcadeNeonDefaultData,
    TemplateComponent: ArcadeNeonTemplate,
    exportSupported: true,
  },
};

export const AVAILABLE_TEMPLATES: TemplateGalleryEntry[] = Object.values(TEMPLATE_REGISTRY).map(({ metadata, gallery }) => ({
  ...metadata,
  gallery,
}));

export function getTemplateDefinition(templateId?: string) {
  return TEMPLATE_REGISTRY[templateId ?? simpleStarterMetadata.id] ?? TEMPLATE_REGISTRY[simpleStarterMetadata.id];
}

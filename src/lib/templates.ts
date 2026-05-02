import type { ComponentType } from "react";
import { defaultPortfolioData as darkStarterDefaultData } from "@/templates/dark-starter/defaultData";
import { darkStarterMetadata } from "@/templates/dark-starter/metadata";
import { DarkStarterTemplate } from "@/templates/dark-starter/Template";
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
  defaultData: PortfolioData;
  TemplateComponent: ComponentType<TemplateComponentProps>;
  exportSupported: boolean;
  exportNote?: string;
}

export const TEMPLATE_REGISTRY: Record<string, TemplateDefinition> = {
  [simpleStarterMetadata.id]: {
    metadata: simpleStarterMetadata,
    defaultData: simpleStarterDefaultData,
    TemplateComponent: SimpleStarterTemplate,
    exportSupported: true,
  },
  [darkStarterMetadata.id]: {
    metadata: darkStarterMetadata,
    defaultData: darkStarterDefaultData,
    TemplateComponent: DarkStarterTemplate,
    exportSupported: true,
  },
  [profileCardMetadata.id]: {
    metadata: profileCardMetadata,
    defaultData: profileCardDefaultData,
    TemplateComponent: ProfileCardTemplate,
    exportSupported: true,
  },
};

export const AVAILABLE_TEMPLATES = Object.values(TEMPLATE_REGISTRY).map(({ metadata }) => metadata);

export function getTemplateDefinition(templateId?: string) {
  return TEMPLATE_REGISTRY[templateId ?? simpleStarterMetadata.id] ?? TEMPLATE_REGISTRY[simpleStarterMetadata.id];
}

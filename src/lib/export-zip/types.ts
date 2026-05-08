export type ExportTemplateId =
  | "simple-starter"
  | "dark-starter"
  | "profile-card"
  | "light-vcard"
  | "blushfolio"
  | "developer-os"
  | "arcade-neon";

export interface ExportTemplateFiles {
  globalsCss: string;
  portfolioTemplate: string;
}

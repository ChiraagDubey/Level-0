import type {
  EducationItem,
  ExperienceItem,
  ProjectItem,
  SocialLink,
} from "@/types/portfolio";

export class ResumeImportError extends Error {
  statusCode: number;

  constructor(message: string, statusCode = 400) {
    super(message);
    this.name = "ResumeImportError";
    this.statusCode = statusCode;
  }
}

export interface ImportedPortfolioPreviewData {
  sourceType: "resume";
  sourceFileName: string;
  name: string;
  title: string;
  bio: string;
  location: string;
  email: string;
  phone: string;
  links: string[];
  socialLinks: SocialLink[];
  skills: string[];
  projects: ProjectItem[];
  experience: ExperienceItem[];
  education: EducationItem[];
  certifications?: string[];
  warnings: string[];
}

export interface ResumeImportExtractedData extends ImportedPortfolioPreviewData {
  certifications: string[];
}

export interface ResumeImportApiSuccess {
  status: "success";
  data: ResumeImportExtractedData;
}

export interface ResumeImportApiError {
  status: "error";
  message: string;
}

export type ResumeImportApiResponse = ResumeImportApiSuccess | ResumeImportApiError;

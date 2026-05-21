export interface WebsiteImportSocialLink {
  id: string;
  label: string;
  platform: string;
  url: string;
}

export interface WebsiteImportProjectCandidate {
  id: string;
  name: string;
  summary: string;
  url: string;
  image: string;
  tags: string[];
}

export interface WebsiteImportPreview {
  sourceUrl: string;
  title: string;
  metaDescription: string;
  detectedName: string;
  detectedTitle: string;
  detectedLocation: string;
  primaryEmail: string;
  headings: string[];
  paragraphs: string[];
  links: string[];
  images: string[];
  emails: string[];
  socialLinks: WebsiteImportSocialLink[];
  projectCandidates: WebsiteImportProjectCandidate[];
  skills: string[];
  warnings: string[];
}

export type AccentColorName = "cyan" | "purple" | "orange" | "emerald" | "rose" | "monochrome";

export interface PortfolioTheme {
  accentColor: string;
  accentName: AccentColorName;
}

export interface HeroSection {
  eyebrow: string;
  name: string;
  title: string;
  intro: string;
  resumeLabel: string;
  resumeUrl: string;
  socialsLabel: string;
  socialsUrl: string;
  profileImage: string;
}

export interface HeroAsideSection {
  statusLabel?: string;
  profileLabel?: string;
  profileModeLabel?: string;
  detailLabel?: string;
  highlightItems?: string[];
  spotlightLabel?: string;
  spotlightTitle?: string;
  spotlightBody?: string;
  toolkitLabel?: string;
  toolkitBody?: string;
  logoText?: string;
  sealText?: string;
  aboutDocument?: string;
  aboutDocumentNote?: string;
  funFactsTitle?: string;
  funFacts?: string[];
}

export interface AboutSection {
  heading: string;
  body: string;
  location: string;
  availability: string;
}

export interface ProjectItem {
  id: string;
  name: string;
  summary: string;
  linkLabel: string;
  url: string;
  image: string;
  tags: string[];
}

export interface SkillGroup {
  id: string;
  title: string;
  items: string[];
}

export interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  period: string;
  summary: string;
}

export interface EducationItem {
  id: string;
  school: string;
  degree: string;
  period: string;
}

export interface SocialLink {
  id: string;
  label: string;
  url: string;
}

export interface ContactSection {
  heading: string;
  email: string;
  message: string;
  ctaLabel: string;
}

export interface FooterSection {
  note: string;
  watermark: string;
}

export interface TemplateLabels {
  heroExperienceLabel?: string;
  heroEducationLabel?: string;
  heroSkillsLabel?: string;
  quickFactsLabel?: string;
  socialLinksLabel?: string;
  aboutSkillsLabel?: string;
  locationLabel?: string;
  availabilityLabel?: string;
  projectsLabel?: string;
  projectsTitle?: string;
  skillsLabel?: string;
  experienceLabel?: string;
  educationLabel?: string;
  heroNote1?: string;
  heroNote2?: string;
}

export interface PortfolioData {
  templateId: string;
  theme: PortfolioTheme;
  hero: HeroSection;
  heroAside?: HeroAsideSection;
  about: AboutSection;
  projects: ProjectItem[];
  skills: SkillGroup[];
  experience: ExperienceItem[];
  education: EducationItem[];
  socialLinks: SocialLink[];
  contact: ContactSection;
  footer: FooterSection;
  templateLabels?: TemplateLabels;
}

export interface TemplateMetadata {
  id: string;
  name: string;
  description: string;
  status: "available" | "coming-soon";
}

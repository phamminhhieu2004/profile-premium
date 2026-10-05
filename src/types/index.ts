export type Language = "vi" | "en";
export type Theme = "dark" | "light";

export interface LocalizedText {
  vi: string;
  en: string;
}

export interface ProfileData {
  name: string;
  birthYear: number;
  location: string;
  phone: string;
  email: string;
  telegram: string;
  telegramUrl: string;
  github: string;
  facebook: string;
  tiktok: string;
  instagram: string;
  website: string;
  cvUrlTxt: string;
  mainSpecialty: LocalizedText;
  tagline: LocalizedText;
  introShort: LocalizedText;
  bioFull: LocalizedText;
  education: Array<{
    period: string;
    school: LocalizedText;
    major: LocalizedText;
    detail: LocalizedText;
    highlight?: string;
  }>;
  experience: Array<{
    period: string;
    role: LocalizedText;
    organization: LocalizedText;
    description: LocalizedText;
    tags: string[];
    type: "software" | "automotive" | "other";
  }>;
}

export interface SkillItem {
  id: string;
  name: string;
  proficiency: number;
  category: "automotive" | "backend" | "ai" | "frontend" | "embedded" | "tools";
  levelLabel: LocalizedText;
  description: LocalizedText;
  iconName: string;
  logoUrl?: string;
}

export interface ProjectItem {
  id: string;
  slug: string;
  title: LocalizedText;
  summary: LocalizedText;
  category: "automotive" | "software" | "ai" | "telemetry";
  status: "completed" | "in_progress" | "research";
  featured: boolean;
  coverImage?: string;
  badge?: LocalizedText;
  tags: string[];
  problem: LocalizedText;
  solution: LocalizedText;
  goals: {
    vi: string[];
    en: string[];
  };
  technologies: string[];
  links: {
    github?: string;
    live?: string;
    demo?: string;
  };
}

export interface CertificateItem {
  id: string;
  title: LocalizedText;
  issuer: string;
  issueDate: string;
  credentialId: string;
  verificationUrl?: string;
  image: string;
  pdfUrl?: string;
  highlight?: boolean;
  category: "ai" | "automotive" | "software";
  skillsLearned: string[];
  description: LocalizedText;
}

export interface PostItem {
  id: string;
  slug: string;
  title: LocalizedText;
  excerpt: LocalizedText;
  content: LocalizedText;
  date: string;
  category: string;
  tags: string[];
  readTime: string;
  coverImage?: string;
  author: string;
}

export interface SocialLinkItem {
  platform: string;
  url: string;
  username: string;
  icon: string;
  color: string;
  ariaLabel: string;
}

export interface WeatherData {
  city: string;
  country: string;
  temp: number;
  humidity: number;
  windSpeed: number;
  precipitation: number;
  uvIndex: string;
  weatherCode: number;
  isDay: boolean;
  conditionText: LocalizedText;
  updatedAt: string;
}

export interface ChatMessage {
  id: string;
  sender: "user" | "bot";
  text: string;
  timestamp: string;
  isError?: boolean;
}

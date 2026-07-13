export interface Project {
  id: string;
  name: string;
  subtitle: string;
  type: string;
  status: 'Live' | 'Integrated' | 'Delivered';
  icon: string;
  iconColor: string;
  tech: string[];
  liveUrl?: string;
  githubUrl: string;
  highlights: string[];
}

export interface SkillCategory {
  name: string;
  items: SkillItem[];
}

export interface SkillItem {
  name: string;
  icon?: string;
  isTextBadge?: boolean;
}

export interface ResumeData {
  name: string;
  title: string;
  location: string;
  phone: string;
  email: string;
  github: string;
  linkedin: string;
  summary: string;
  skills: {
    languages: string[];
    backend: string[];
    ai_ml: string[];
    databases: string[];
    cloud_devops: string[];
    frontend: string[];
    tools: string[];
  };
  experience: {
    title: string;
    company: string;
    location: string;
    period: string;
    bullets: string[];
  }[];
  projects: {
    name: string;
    description: string;
  }[];
  education: {
    degree: string;
    institution: string;
    location: string;
    period: string;
  }[];
  achievements: string[];
}

export interface WindowState {
  id: string;
  isOpen: boolean;
  isMinimized: boolean;
  zIndex: number;
  position: { x: number; y: number };
  size: { width: number; height: number };
}

export type WindowId = 'terminal' | 'projects' | 'skills' | 'contact' | 'resume';

export interface TerminalCommand {
  command: string;
  output: string | React.ReactNode;
}

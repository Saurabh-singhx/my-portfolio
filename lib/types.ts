export type WindowId = 'terminal' | 'projects' | 'skills' | 'contact' | 'resume';

export interface WindowPosition {
  x: number;
  y: number;
}

export interface WindowSize {
  width: number;
  height: number;
}

export interface WindowState {
  id: WindowId;
  title: string;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
  position: WindowPosition;
  size: WindowSize;
  prevPosition?: WindowPosition;
  prevSize?: WindowSize;
}

export interface Project {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  tech: string[];
  liveUrl?: string;
  githubUrl: string;
  highlights: string[];
  status: 'Live' | 'In Production' | 'Deployed' | 'Completed';
  type: string;
  icon: 'music' | 'brain' | 'building' | 'code';
  iconColor: string;
  metrics?: string[];
  architecture?: string[];
}

export interface SkillItem {
  name: string;
  isTextBadge?: boolean;
  level?: string;
}

export interface SkillCategory {
  name: string;
  items: SkillItem[];
}

export interface SkillBar {
  name: string;
  level: number;
  label?: string;
}

export interface ResumeExperience {
  title: string;
  company: string;
  location: string;
  period: string;
  bullets: string[];
}

export interface ResumeProject {
  name: string;
  description: string;
  tech?: string[];
  bullets?: string[];
}

export interface ResumeEducation {
  degree: string;
  institution: string;
  location: string;
  period: string;
  grade?: string;
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
  experience: ResumeExperience[];
  projects: ResumeProject[];
  education: ResumeEducation[];
  certifications: string[];
  achievements: string[];
}

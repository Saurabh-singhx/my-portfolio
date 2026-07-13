import { SkillCategory } from './types';

export const skillCategories: SkillCategory[] = [
  {
    name: 'Languages',
    items: [
      { name: 'TypeScript', icon: 'typescript' },
      { name: 'Python', icon: 'python' },
      { name: 'C++', icon: 'cplusplus' },
      { name: 'SQL', icon: 'postgresql' },
    ]
  },
  {
    name: 'Backend',
    items: [
      { name: 'Node.js', icon: 'nodejs' },
      { name: 'Express', icon: 'express' },
      { name: 'FastAPI', icon: 'fastapi', isTextBadge: true },
    ]
  },
  {
    name: 'AI / ML',
    items: [
      { name: 'LangGraph', isTextBadge: true },
      { name: 'pgvector', isTextBadge: true },
      { name: 'Gemini', icon: 'google' },
    ]
  },
  {
    name: 'Databases',
    items: [
      { name: 'PostgreSQL', icon: 'postgresql' },
      { name: 'MongoDB', icon: 'mongodb' },
      { name: 'Redis', icon: 'redis' },
    ]
  },
  {
    name: 'Cloud & DevOps',
    items: [
      { name: 'AWS', icon: 'amazonwebservices' },
      { name: 'Docker', icon: 'docker' },
      { name: 'GitHub Actions', icon: 'githubactions', isTextBadge: true },
    ]
  },
  {
    name: 'Frontend',
    items: [
      { name: 'React', icon: 'react' },
      { name: 'Next.js', icon: 'nextjs', isTextBadge: true },
    ]
  },
  {
    name: 'Tools',
    items: [
      { name: 'Git', icon: 'git' },
      { name: 'Linux', icon: 'linux' },
      { name: 'VS Code', icon: 'vscode', isTextBadge: true },
    ]
  }
];

export const skillBars = [
  { name: 'Problem Solving', level: 95, label: '350+ LeetCode' },
  { name: 'System Design', level: 80, label: '' },
  { name: 'API Development', level: 95, label: '' },
  { name: 'AI / LLM Tooling', level: 90, label: '' },
  { name: 'DevOps / Infra', level: 75, label: '' },
];

import { SkillCategory, SkillBar } from './types';

export const skillCategories: SkillCategory[] = [
  {
    name: 'AI / LLM & Agents',
    items: [
      { name: 'LangGraph', level: 'Production' },
      { name: 'Gemini 3.1', level: 'Production' },
      { name: 'pgvector', level: 'Production' },
      { name: 'Vector DBs', level: 'Production' },
      { name: 'RAG Pipelines', level: 'Production' },
      { name: 'Tool Calling / Agents', level: 'Production' },
    ],
  },
  {
    name: 'Languages',
    items: [
      { name: 'TypeScript', level: 'Advanced' },
      { name: 'JavaScript', level: 'Advanced' },
      { name: 'Python', level: 'Advanced' },
      { name: 'SQL', level: 'Advanced' },
      { name: 'C++', level: 'Intermediate' },
    ],
  },
  {
    name: 'Backend & Architecture',
    items: [
      { name: 'Node.js', level: 'Advanced' },
      { name: 'Express.js', level: 'Advanced' },
      { name: 'FastAPI', level: 'Advanced' },
      { name: 'REST APIs', level: 'Advanced' },
      { name: 'Microservices', level: 'Intermediate' },
      { name: 'BullMQ', level: 'Intermediate' },
      { name: 'Socket.IO', level: 'Intermediate' },
    ],
  },
  {
    name: 'Databases & Caching',
    items: [
      { name: 'PostgreSQL', level: 'Advanced' },
      { name: 'Redis', level: 'Advanced' },
      { name: 'MongoDB', level: 'Intermediate' },
      { name: 'SQLAlchemy', level: 'Advanced' },
      { name: 'Prisma', level: 'Intermediate' },
      { name: 'Alembic', level: 'Intermediate' },
    ],
  },
  {
    name: 'Cloud & DevOps',
    items: [
      { name: 'AWS (EC2, S3, RDS)', level: 'Advanced' },
      { name: 'CloudFront CDN', level: 'Intermediate' },
      { name: 'Docker', level: 'Advanced' },
      { name: 'Render', level: 'Advanced' },
      { name: 'GitHub Actions CI/CD', level: 'Advanced' },
      { name: 'Linux', level: 'Advanced' },
    ],
  },
  {
    name: 'Frontend & UI',
    items: [
      { name: 'React', level: 'Advanced' },
      { name: 'Next.js (App Router)', level: 'Advanced' },
      { name: 'Tailwind CSS', level: 'Advanced' },
      { name: 'Framer Motion', level: 'Intermediate' },
    ],
  },
];

export const skillBars: SkillBar[] = [
  { name: 'Full-Stack Web Development (Node.js, Next.js, FastAPI)', level: 92, label: '92%' },
  { name: 'GenAI, LangGraph & pgvector RAG Pipelines', level: 90, label: '90%' },
  { name: 'Python & TypeScript Backend Architecture', level: 94, label: '94%' },
  { name: 'PostgreSQL, Redis & Vector Databases', level: 88, label: '88%' },
  { name: 'Cloud Deployment & DevOps (AWS, Docker, CI/CD)', level: 85, label: '85%' },
  { name: 'Data Structures & Algorithms (LeetCode 350+)', level: 88, label: '88%' },
];

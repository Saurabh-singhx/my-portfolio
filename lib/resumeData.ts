import { ResumeData } from './types';

export const resumeData: ResumeData = {
  name: 'Saurabh Kumar',
  title: 'Full-Stack Developer & GenAI Engineer',
  location: 'Patna, Bihar, India',
  phone: '+91 9304355834',
  email: 'saurabh4442kumar@gmail.com',
  github: 'https://github.com/Saurabh-singhx',
  linkedin: 'https://www.linkedin.com/in/saurabh-kumar0/',
  summary:
    'Full-stack developer with production experience shipping AI-powered web applications. Built Sonix Music — a LangGraph and Gemini 3.1 streaming platform on AWS with Retrieval-Augmented Generation (RAG) — and FinAssist, a Telegram financial assistant with multi-API orchestration, document RAG pipeline, and Google Workspace integration. Open to full-stack and AI engineering roles.',
  skills: {
    languages: ['TypeScript', 'JavaScript', 'Python', 'SQL', 'C++'],
    backend: ['Node.js', 'Express.js', 'FastAPI', 'REST APIs', 'Microservices', 'BullMQ', 'Socket.IO'],
    ai_ml: [
      'LangGraph',
      'Gemini 3.1',
      'Retrieval-Augmented Generation (RAG)',
      'pgvector',
      'Vector Database',
      'Tool Calling',
    ],
    databases: ['PostgreSQL', 'MongoDB', 'Redis'],
    cloud_devops: [
      'AWS (EC2, S3, RDS, CloudFront)',
      'Docker',
      'Render',
      'GitHub Actions CI/CD',
    ],
    frontend: ['React', 'Next.js', 'Tailwind CSS'],
    tools: ['SQLAlchemy', 'Alembic', 'Prisma', 'Git', 'Linux', 'VS Code'],
  },
  experience: [
    {
      title: 'Freelance Web Developer',
      company: 'Self-employed',
      location: 'Patna, Bihar',
      period: 'April 2026 - May 2026',
      bullets: [
        'Designed and developed a responsive Next.js website for Gyanodaya Public School, Patna; delivered within a 1-month timeline with SEO best practices implemented and deployed on Vercel with a custom domain.',
        'Engineered fast-loading server-rendered pages achieving 95+ Google Lighthouse scores across performance and accessibility.',
      ],
    },
    {
      title: 'Web Development Intern',
      company: 'Pixel Mascot',
      location: 'Remote',
      period: 'May 2025 - June 2025',
      bullets: [
        'Developed and delivered responsive client websites using JavaScript, CSS, and Webflow; built custom UI animations and interactive components, managing the full cycle from client brief to production launch.',
        'Collaborated directly with designers and stakeholders to implement pixel-perfect web experiences with cross-browser compatibility.',
      ],
    },
  ],
  projects: [
    {
      name: 'Sonix Music: Full-Stack AI-Powered Streaming Platform',
      description:
        'TypeScript, JavaScript, Node.js, React, Python, FastAPI, LangGraph, Gemini 3.1, pgvector, PostgreSQL, Redis, BullMQ, Docker, AWS (EC2, S3, RDS, CloudFront), GitHub Actions',
      bullets: [
        'Built a production music streaming platform with Node.js and TypeScript REST APIs, Redis caching, BullMQ job queues, Google OAuth + OTP auth, and AWS S3 presigned URLs; Dockerized on EC2 with GitHub Actions CI/CD, frontend via S3 + CloudFront.',
        'Load-tested to 200-500 concurrent users on a single t3.micro using k6.',
        'Architected a LangGraph AI agent microservice (Python/FastAPI) with Gemini 3.1 tool-calling and pgvector RAG pipeline for personalized recommendations; integrated via async SQLAlchemy on Supabase PostgreSQL.',
      ],
    },
    {
      name: 'FinAssist: AI Financial Assistant Telegram Bot',
      description:
        'Python, FastAPI, LangGraph, Gemini 3.1, pgvector, vector database, PostgreSQL, SQLAlchemy, APScheduler, Google OAuth 2.0, Finnhub API, FRED API, SEC EDGAR, Render',
      bullets: [
        'Built a LangGraph-powered Telegram AI agent with multi-tool calling across Finnhub (live market data), FRED (macro indicators), and SEC EDGAR filings; deployed as a signed FastAPI webhook on Render with APScheduler delivering personalized daily briefings.',
        'Implemented a document intelligence Retrieval-Augmented Generation (RAG) pipeline - Gemini 3.1 extracts and transcribes PDFs, images, and voice notes; content is chunked, embedded into pgvector vector database, and retrieved semantically.',
        'Integrated Google OAuth 2.0 (PKCE, state validation, refresh tokens) enabling Gmail retrieval and Google Calendar event creation from within the Telegram interface.',
      ],
    },
  ],
  education: [
    {
      degree: 'Bachelor of Computer Applications (BCA)',
      institution: 'T.P.S. College, Patna - Patliputra University',
      location: 'Bihar',
      period: 'July 2022 - July 2025',
      grade: '64%',
    },
  ],
  certifications: [
    'Certificate of Distinction - AI Atlas Hackathon | Humanity Founders | August 2026',
  ],
  achievements: [
    'Solved 350+ data structures and algorithms problems on LeetCode.',
    'Load-tested Sonix Music API to 200-500 concurrent users on a single AWS EC2 t3.micro using k6.',
  ],
};

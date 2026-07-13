import { ResumeData } from './types';

export const resumeData: ResumeData = {
  name: 'Saurabh Kumar',
  title: 'Full-Stack & GenAI Developer',
  location: 'Patna, Bihar, India',
  phone: '+91 9304355834',
  email: 'saurabh4442kumar@gmail.com',
  github: 'https://github.com/Saurabh-singhx',
  linkedin: 'https://www.linkedin.com/in/saurabh-kumar0/',
  summary: `Full-stack developer and BCA graduate with hands-on experience building and deploying production-grade AI applications. Designed and shipped a load-tested music streaming platform on AWS with a LangGraph-based AI agent microservice and RAG pipeline. Seeking full-stack or GenAI engineering roles at product and AI-first companies.`,
  skills: {
    languages: ['TypeScript', 'Python', 'SQL', 'C++'],
    backend: ['Node.js', 'Express.js', 'FastAPI', 'REST APIs', 'Socket.IO'],
    ai_ml: ['LangGraph', 'Gemini 3.1', 'RAG', 'pgvector'],
    databases: ['PostgreSQL', 'MongoDB', 'Redis'],
    cloud_devops: ['AWS (EC2, S3, RDS, CloudFront)', 'Docker', 'GitHub Actions CI/CD'],
    frontend: ['React', 'Next.js'],
    tools: ['Git', 'Linux', 'VS Code']
  },
  experience: [
    {
      title: 'Freelance Web Developer',
      company: 'Self-employed',
      location: 'Patna, Bihar',
      period: '2026',
      bullets: [
        'Designed and developed a responsive website for Gyanodaya Public School, Patna using Next.js, React, and Tailwind CSS',
        'Implemented SEO best practices, optimized performance, deployed on Vercel with custom domain',
        'Managed the project end-to-end: requirements → design → development → deployment → handover'
      ]
    }
  ],
  projects: [
    {
      name: 'Sonix Music',
      description: 'AI-Powered Music Streaming Platform'
    },
    {
      name: 'Sonix AI Agent',
      description: 'LangGraph Recommendation Microservice'
    }
  ],
  education: [
    {
      degree: 'BCA',
      institution: 'T.P.S. College, Patna, Patliputra University',
      location: 'Bihar',
      period: '2022–2025'
    }
  ],
  achievements: [
    'Solved 350+ DSA problems on LeetCode',
    'Load-tested Sonix Music API to 200–500 concurrent users using k6 on a single EC2 t3.micro'
  ]
};

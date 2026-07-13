import { Project } from './types';

export const projects: Project[] = [
  {
    id: 'sonix-music',
    name: 'Sonix Music',
    subtitle: 'AI-Powered Music Streaming Platform',
    type: 'Full-Stack Web App',
    status: 'Live',
    icon: 'music',
    iconColor: '#00d2ff',
    tech: ['TypeScript', 'Node.js', 'React', 'PostgreSQL', 'Redis', 'BullMQ', 'Docker', 'AWS EC2', 'AWS S3', 'AWS RDS', 'CloudFront', 'GitHub Actions'],
    liveUrl: 'https://sonix.saurabhx.site',
    githubUrl: 'https://github.com/Saurabh-singhx/sonix_music_app',
    highlights: [
      'Production-grade music streaming platform with Google OAuth + OTP auth and AWS S3 presigned URLs',
      'REST APIs in Node.js/TypeScript with Redis caching and BullMQ background job queues',
      'Dockerized backend on EC2, frontend via S3 + CloudFront CDN with custom domain',
      'Load-tested to 200–500 concurrent users on a single t3.micro EC2 instance using k6',
      'GitHub Actions CI/CD for automated deployments'
    ]
  },
  {
    id: 'sonix-ai-agent',
    name: 'Sonix AI Agent',
    subtitle: 'LangGraph Recommendation Microservice',
    type: 'AI / Python Microservice',
    status: 'Integrated',
    icon: 'brain',
    iconColor: '#a78bfa',
    tech: ['Python', 'FastAPI', 'LangGraph', 'Gemini 3.1', 'pgvector', 'PostgreSQL', 'SQLAlchemy'],
    githubUrl: 'https://github.com/Saurabh-singhx/sonix_music_app',
    highlights: [
      'Standalone FastAPI microservice using LangGraph for AI-driven music recommendations',
      'Tool-calling workflows with Gemini 3.1 including structured output and error handling',
      'RAG pipeline using pgvector for semantic similarity search over song metadata',
      'Integrated with Node.js backend via async SQLAlchemy on a shared Supabase PostgreSQL instance'
    ]
  },
  {
    id: 'gyanodaya-school',
    name: 'Gyanodaya School Website',
    subtitle: 'Freelance Client Delivery',
    type: 'Client Website (Freelance)',
    githubUrl:"https://github.com/Saurabh-singhx/gyanodaya-school-website",
    status: 'Delivered',
    icon: 'building',
    iconColor: '#f59e0b',
    tech: ['Next.js', 'React', 'Tailwind CSS', 'Vercel'],
    highlights: [
      'Responsive school website designed and delivered for a client in Patna, Bihar',
      'SEO best practices, optimized performance, deployed on Vercel with custom domain',
      'End-to-end independent project: requirements → design → development → deployment → handover'
    ]
  }
];

export const techColors: Record<string, string> = {
  'TypeScript': 'bg-blue-600/20 text-blue-400 border-blue-600/30',
  'Node.js': 'bg-green-600/20 text-green-400 border-green-600/30',
  'React': 'bg-cyan-600/20 text-cyan-400 border-cyan-600/30',
  'Next.js': 'bg-gray-600/20 text-gray-300 border-gray-600/30',
  'Python': 'bg-yellow-600/20 text-yellow-400 border-yellow-600/30',
  'FastAPI': 'bg-teal-600/20 text-teal-400 border-teal-600/30',
  'PostgreSQL': 'bg-blue-700/20 text-blue-300 border-blue-700/30',
  'MongoDB': 'bg-green-700/20 text-green-300 border-green-700/30',
  'Redis': 'bg-red-600/20 text-red-400 border-red-600/30',
  'Docker': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  'AWS EC2': 'bg-orange-600/20 text-orange-400 border-orange-600/30',
  'AWS S3': 'bg-orange-600/20 text-orange-400 border-orange-600/30',
  'AWS RDS': 'bg-orange-600/20 text-orange-400 border-orange-600/30',
  'CloudFront': 'bg-orange-600/20 text-orange-400 border-orange-600/30',
  'GitHub Actions': 'bg-gray-600/20 text-gray-300 border-gray-600/30',
  'LangGraph': 'bg-purple-600/20 text-purple-400 border-purple-600/30',
  'Gemini 3.1': 'bg-purple-600/20 text-purple-400 border-purple-600/30',
  'pgvector': 'bg-green-600/20 text-green-400 border-green-600/30',
  'SQLAlchemy': 'bg-red-600/20 text-red-400 border-red-600/30',
  'BullMQ': 'bg-red-600/20 text-red-400 border-red-600/30',
  'Tailwind CSS': 'bg-cyan-600/20 text-cyan-400 border-cyan-600/30',
  'Vercel': 'bg-gray-600/20 text-gray-300 border-gray-600/30',
  'Express.js': 'bg-gray-600/20 text-gray-300 border-gray-600/30',
  'REST APIs': 'bg-blue-600/20 text-blue-400 border-blue-600/30',
  'Socket.IO': 'bg-gray-600/20 text-gray-300 border-gray-600/30',
  'RAG': 'bg-purple-600/20 text-purple-400 border-purple-600/30',
  'C++': 'bg-blue-600/20 text-blue-400 border-blue-600/30',
  'SQL': 'bg-blue-600/20 text-blue-400 border-blue-600/30',
};

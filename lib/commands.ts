'use client';

export interface CommandResult {
  output: string | React.ReactNode;
  isHtml?: boolean;
}

export const skillsData = {
  languages: ["TypeScript", "Python", "SQL", "C++"],
  backend: ["Node.js", "Express.js", "FastAPI", "REST APIs", "Socket.IO"],
  ai_ml: ["LangGraph", "Gemini 3.1", "RAG", "pgvector"],
  databases: ["PostgreSQL", "MongoDB", "Redis"],
  cloud_devops: ["AWS EC2", "AWS S3", "AWS RDS", "CloudFront", "Docker", "GitHub Actions CI/CD"],
  frontend: ["React", "Next.js"],
  tools: ["Git", "Linux", "VS Code"]
};

export function handleCommand(input: string): CommandResult {
  const args = input.trim().split(' ');
  const command = args[0];
  const rest = args.slice(1).join(' ');

  switch (command) {
    case 'help':
      return {
        output: `Available commands:
  help              → lists all available commands
  whoami            → prints the about section
  ls                → shows directory contents
  cat about.txt     → prints the full about/bio paragraph
  cat skills.json   → pretty-prints skills as JSON
  open projects     → opens the Projects window
  open contact      → opens the Contact window
  open resume       → opens the Resume window
  clear             → clears terminal output
  echo [text]       → echoes text back
  date              → prints current date and time
  uname -a          → prints system info
  pwd               → prints current directory
  history           → shows last 5 commands typed`
      };

    case 'whoami':
      return {
        output: `Saurabh Kumar — Full-Stack & GenAI Developer
Based in Patna, Bihar, India

BCA graduate (2025) with hands-on production experience shipping
AI-powered systems. Built Sonix Music — a load-tested streaming
platform on AWS with a LangGraph + Gemini 3.1 AI agent microservice,
RAG pipeline with pgvector, and real-time infrastructure.

Targeting full-stack or GenAI engineering roles at AI-first startups
and GCCs across India. Open to relocation.

GitHub   → github.com/Saurabh-singhx
LinkedIn → linkedin.com/in/saurabh-kumar0
Email    → saurabh4442kumar@gmail.com`
      };

    case 'ls':
      return {
        output: `about.txt  skills.json  projects/  contact.sh  resume.pdf`
      };

    case 'cat':
      if (rest === 'about.txt') {
        return {
          output: `Saurabh Kumar — Full-Stack & GenAI Developer
Based in Patna, Bihar, India

BCA graduate (2025) with hands-on production experience shipping
AI-powered systems. Built Sonix Music — a load-tested streaming
platform on AWS with a LangGraph + Gemini 3.1 AI agent microservice,
RAG pipeline with pgvector, and real-time infrastructure.

Targeting full-stack or GenAI engineering roles at AI-first startups
and GCCs across India. Open to relocation.

GitHub   → github.com/Saurabh-singhx
LinkedIn → linkedin.com/in/saurabh-kumar0
Email    → saurabh4442kumar@gmail.com`
        };
      }
      if (rest === 'skills.json') {
        return {
          output: JSON.stringify(skillsData, null, 2),
          isHtml: true
        };
      }
      return {
        output: `cat: ${rest}: No such file or directory`
      };

    case 'open':
      if (rest === 'projects') {
        return { output: '[Opening Projects window...]' };
      }
      if (rest === 'contact') {
        return { output: '[Opening Contact window...]' };
      }
      if (rest === 'resume') {
        return { output: '[Opening Resume window...]' };
      }
      return {
        output: `open: ${rest}: No such file or directory`
      };

    case 'clear':
      return { output: '__CLEAR__' };

    case 'echo':
      return { output: rest };

    case 'date':
      return {
        output: new Date().toLocaleString('en-US', {
          weekday: 'short',
          year: 'numeric',
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit'
        })
      };

    case 'uname':
      if (rest === '-a') {
        return {
          output: 'SaurabhOS 1.0.0 LTS (Patna Edition) #GenAI x86_64'
        };
      }
      return {
        output: 'SaurabhOS'
      };

    case 'pwd':
      return { output: '/home/saurabh' };

    case 'history':
      return {
        output: 'history: Use Up/Down arrows to navigate command history'
      };

    case '':
      return { output: '' };

    default:
      return {
        output: `bash: ${command}: command not found. Type 'help' for available commands.`
      };
  }
}

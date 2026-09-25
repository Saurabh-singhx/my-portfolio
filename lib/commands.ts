export interface CommandResult {
  output: string;
}

export function handleCommand(cmd: string): CommandResult {
  const trimmed = cmd.trim();
  const [base, ...args] = trimmed.split(' ');
  const lowerBase = base.toLowerCase();
  const subArg = args.join(' ').toLowerCase();

  switch (lowerBase) {
    case 'help':
      return {
        output: `Available commands:
  whoami            - Display personal bio and summary
  projects          - List featured production projects
  skills            - Show technical skills breakdown
  experience        - View employment and freelance history
  education         - Show university and degree information
  certifications    - View honors and hackathon certificates
  achievements      - View technical milestones
  contact           - Display email, phone, and social links
  open <app>        - Open a desktop window (projects, skills, contact, resume)
  cat resume.pdf    - Output full resume text to terminal
  neofetch          - Show SaurabhOS system specification
  date              - Show current system time
  clear             - Clear the terminal screen
  echo <message>    - Print message to terminal
  github            - Output GitHub profile link
  linkedin          - Output LinkedIn profile link`,
      };

    case 'whoami':
      return {
        output: `SAURABH KUMAR
Full-Stack & GenAI Developer based in Patna, Bihar, India.
Production experience shipping AI-powered web applications with LangGraph, Gemini 3.1, and pgvector RAG.
Creator of Sonix Music (AWS cloud streaming platform) and FinAssist (AI Telegram assistant).
Contact: saurabh4442kumar@gmail.com | +91 9304355834`,
      };

    case 'projects':
      return {
        output: `FEATURED PROJECTS:
[1] Sonix Music - Full-Stack AI Streaming Platform
    • Tech: React, Node.js, FastAPI, LangGraph, Gemini 3.1, pgvector, Redis, BullMQ, AWS EC2/S3/RDS/CloudFront
    • Demo: https://sonix.saurabhx.site
    • GitHub: https://github.com/Saurabh-singhx/sonix_music_app
    • Metric: Load-tested to 200-500 concurrent users on single t3.micro using k6

[2] FinAssist - AI Financial Assistant Telegram Bot
    • Tech: Python, FastAPI, LangGraph, Gemini 3.1, pgvector RAG, Finnhub, FRED, SEC EDGAR, Google OAuth PKCE
    • Telegram: https://t.me/finance_ai_assistant_1bot
    • GitHub: https://github.com/Saurabh-singhx/finassistai-telegram-bot

[3] Gyanodaya Public School - Production Web Portal
    • Tech: Next.js, React, Tailwind CSS, Vercel (Custom Domain)
    • Delivered in 1 month with 95+ Lighthouse score and SEO optimization

Tip: Run 'open projects' to inspect full architecture, metrics, and links.`,
      };

    case 'skills':
      return {
        output: `TECHNICAL SKILLS:
• AI / LLM:    LangGraph, Gemini 3.1, pgvector, Vector DBs, RAG Pipelines, Tool Calling
• Languages:   TypeScript, JavaScript, Python, SQL, C++
• Backend:     Node.js, Express.js, FastAPI, REST APIs, Microservices, BullMQ, Socket.IO
• Databases:   PostgreSQL, Redis, MongoDB, SQLAlchemy, Alembic, Prisma
• Cloud/Ops:   AWS (EC2, S3, RDS, CloudFront), Docker, Render, GitHub Actions CI/CD, Linux
• Frontend:    React, Next.js (App Router), Tailwind CSS, Framer Motion
• Problem Sol: LeetCode 350+ DSA Solved

Tip: Run 'open skills' to view proficiency bars and interactive badges.`,
      };

    case 'experience':
      return {
        output: `EXPERIENCE:
1. Freelance Web Developer | Self-employed (April 2026 - May 2026)
   • Designed and developed responsive Next.js website for Gyanodaya Public School, Patna.
   • Delivered within 1-month timeline with SEO best practices and deployed on Vercel with custom domain.

2. Web Development Intern | Pixel Mascot (May 2025 - June 2025)
   • Developed client websites using JavaScript, CSS, and Webflow.
   • Built custom UI animations and interactive components from client brief to production.`,
      };

    case 'education':
      return {
        output: `EDUCATION:
• Bachelor of Computer Applications (BCA)
  T.P.S. College, Patna - Patliputra University, Bihar
  Timeline: July 2022 - July 2025 | Score: 64%`,
      };

    case 'certifications':
      return {
        output: `CERTIFICATIONS & HONORS:
• Certificate of Distinction - AI Atlas Hackathon
  Issued by Humanity Founders | August 2026`,
      };

    case 'achievements':
      return {
        output: `ACHIEVEMENTS:
• 350+ DSA problems solved on LeetCode.
• Load-tested Sonix Music API to 200-500 concurrent users on a single AWS EC2 t3.micro using k6.
• Built and deployed autonomous LangGraph multi-agent bots with pgvector RAG.`,
      };

    case 'contact':
      return {
        output: `CONTACT INFORMATION:
• Email:    saurabh4442kumar@gmail.com
• Phone:    +91 9304355834
• Location: Patna, Bihar, India
• GitHub:   https://github.com/Saurabh-singhx
• LinkedIn: https://www.linkedin.com/in/saurabh-kumar0/

Tip: Run 'open contact' to send a message directly from the desktop.`,
      };

    case 'cat':
      if (subArg === 'resume.pdf' || subArg === 'resume' || subArg === 'resume.txt') {
        return {
          output: `=== RESUME: SAURABH KUMAR ===
Full-Stack & GenAI Developer | Patna, Bihar, India
Email: saurabh4442kumar@gmail.com | Phone: +91 9304355834
GitHub: https://github.com/Saurabh-singhx | LinkedIn: https://www.linkedin.com/in/saurabh-kumar0/

SUMMARY:
Full-stack developer with production experience shipping AI-powered web applications.
Built Sonix Music (AWS, LangGraph, Gemini 3.1, pgvector RAG) and FinAssist (Telegram AI bot).

PROJECTS:
1. Sonix Music (Next.js, Node.js, FastAPI, LangGraph, Gemini 3.1, pgvector, Redis, BullMQ, AWS)
2. FinAssist (Python, FastAPI, LangGraph, pgvector, Telegram Bot, Render, Google OAuth PKCE)
3. Gyanodaya Public School (Next.js, Tailwind CSS, Vercel)

EXPERIENCE:
• Freelance Web Developer (April 2026 - May 2026)
• Web Development Intern @ Pixel Mascot (May 2025 - June 2025)

EDUCATION:
• BCA - T.P.S. College, Patna (2022 - 2025)

Tip: Run 'open resume' to view or download the complete PDF.`,
        };
      }
      return {
        output: `cat: ${args.join(' ')}: No such file or directory. Try 'cat resume.pdf'`,
      };

    case 'open':
      if (['projects', 'skills', 'contact', 'resume', 'terminal'].includes(subArg)) {
        return {
          output: `Opening [${subArg}] window...`,
        };
      }
      return {
        output: `Usage: open <app>\nAvailable apps: projects, skills, contact, resume, terminal`,
      };

    case 'resume':
      return {
        output: `Saurabh Kumar - Full-Stack & GenAI Developer.
Run 'open resume' to view the PDF or download it.`,
      };

    case 'clear':
      return {
        output: '__CLEAR__',
      };

    case 'date':
      return {
        output: new Date().toString(),
      };

    case 'github':
      return {
        output: 'https://github.com/Saurabh-singhx',
      };

    case 'linkedin':
      return {
        output: 'https://www.linkedin.com/in/saurabh-kumar0/',
      };

    case 'echo':
      return {
        output: args.join(' '),
      };

    case 'sudo':
      return {
        output: 'Permission denied: Recruiter privileges already granted in read/demo mode.',
      };

    case 'neofetch':
    case 'fastfetch':
      return {
        output: `       _,met$$$$$gg.          saurabh@SaurabhOS
    ,g$$$$$$$$$$$$$$$P.       -----------------
  ,g$$P"        """Y$$.".     OS: SaurabhOS v1.0 (x86_64 Web)
 ,$$P'              \`$$$.     Host: Portfolio Interactive Shell
',$$P       ,ggs.     \`$$b:   Kernel: Next.js 16 (App Router) + React 19
\`d$$'     ,$P"'   .    $$$    Uptime: Production Ready
 $$P      d$'     ,    $$$P   Packages: LangGraph, Gemini 3.1, pgvector
 $$:      $$.   -    ,d$$'    Shell: SaurabhOS Bash 5.2
 $$;      Y$b._   _,d$P'      Resolution: Dynamic Responsive
 Y$$.    \`."Y$$$$P"'          CPU: LangGraph Multi-Agent Engine
 \`$$b      "-.__              Memory: AWS t3.micro (k6 load-tested to 500 CCU)
  \`Y$$                        Location: Patna, Bihar, India
   \`Y$$.                      Status: Open to Full-Stack & GenAI Roles
     \`$$b.
       \`Y$$b.
          \`"Y$b._
              \`"""`,
      };

    default:
      return {
        output: `command not found: ${trimmed}. Type 'help' to see available commands.`,
      };
  }
}

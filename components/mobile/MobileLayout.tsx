'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Terminal, FolderOpen, Braces, Mail, FileText, Github, Linkedin, ExternalLink, Music, Brain, Building } from 'lucide-react';
import { projects, techColors } from '@/lib/projectsData';
import { skillCategories, skillBars } from '@/lib/skillsData';
import { resumeData } from '@/lib/resumeData';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';

const contactSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  message: z.string().min(1, 'Message is required'),
});

type ContactForm = z.infer<typeof contactSchema>;

const iconMap: Record<string, React.ReactNode> = {
  music: <Music size={20} />,
  brain: <Brain size={20} />,
  building: <Building size={20} />,
};

export function MobileLayout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('about');

 const scrollTo = (id: string) => {
    setActiveSection(id);
    setMenuOpen(false);

    // 1. Wait a tiny bit (150ms) for the menu to collapse so the DOM stabilizes.
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        // 2. Calculate the exact distance from the top of the page, 
        // minus 80 pixels to account for your sticky header.
        const headerOffset = 80; 
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY - headerOffset;

        // 3. Command the window to scroll to that exact pixel.
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }, 150);
  };

  return (
    <div className="min-h-screen bg-[#0d1117] text-[#e6edf3] font-sans">
      
      {/* FIX 1: Wrap BOTH the Header and the Menu in a single sticky container. 
        This ensures the menu always drops down directly below the header, 
        no matter how far down the page you have scrolled.
      */}
      <div className="sticky top-0 z-50">
        <header className="bg-[#0d1117]/90 backdrop-blur-md border-b border-white/[0.08]">
          <div className="flex items-center justify-between px-4 py-3">
            <div className="flex items-center gap-2">
              <Terminal size={18} className="text-[#00ff41]" />
              <span className="font-mono text-sm">Saurabh Kumar</span>
            </div>
            <button onClick={() => setMenuOpen(!menuOpen)} className="p-1">
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </header>

        {/* Mobile Menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-[#161b22] border-b border-white/[0.08] overflow-hidden absolute w-full shadow-lg"
            >
              <nav className="px-4 py-2 space-y-1">
                {['about', 'projects', 'skills', 'contact', 'resume'].map((item) => (
                  <button
                    key={item}
                    onClick={() => scrollTo(item)}
                    className={`block w-full text-left px-3 py-2 rounded font-mono text-sm capitalize ${
                      activeSection === item ? 'bg-[#00d2ff]/10 text-[#00d2ff]' : 'text-[#8b949e]'
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Content */}
      <main className="px-4 py-6 space-y-12">
        
        {/* FIX 2: Add `scroll-mt-24` (scroll-margin-top) to all <section> tags.
          This prevents the sticky header from overlapping the section titles 
          when `scrollIntoView` runs.
        */}
        
        {/* About */}
        <section id="about" className="scroll-mt-24">
          <h2 className="text-xl font-mono text-[#00d2ff] mb-4">whoami</h2>
          <div className="bg-[#161b22] border border-white/[0.08] rounded-lg p-4 space-y-3">
            <p className="text-sm leading-relaxed">
              Saurabh Kumar — Full-Stack & GenAI Developer based in Patna, Bihar, India.
            </p>
            <p className="text-sm text-[#8b949e] leading-relaxed">
              BCA graduate (2025) with hands-on production experience shipping AI-powered systems. 
              Built Sonix Music — a load-tested streaming platform on AWS with a LangGraph + Gemini 3.1 
              AI agent microservice, RAG pipeline with pgvector, and real-time infrastructure.
            </p>
            <div className="flex gap-4 pt-2">
              <a href="https://github.com/Saurabh-singhx" target="_blank" rel="noopener noreferrer" className="text-[#8b949e] hover:text-[#e6edf3]">
                <Github size={20} />
              </a>
              <a href="https://www.linkedin.com/in/saurabh-kumar0/" target="_blank" rel="noopener noreferrer" className="text-[#8b949e] hover:text-[#e6edf3]">
                <Linkedin size={20} />
              </a>
            </div>
          </div>
        </section>

        {/* Projects */}
        <section id="projects" className="scroll-mt-24">
          <h2 className="text-xl font-mono text-[#00d2ff] mb-4">Projects</h2>
          <div className="space-y-4">
            {projects.map((project) => (
              <div key={project.id} className="bg-[#161b22] border border-white/[0.08] rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span style={{ color: project.iconColor }}>{iconMap[project.icon]}</span>
                  <h3 className="font-mono text-[#e6edf3]">{project.name}</h3>
                </div>
                <p className="text-xs text-[#8b949e] mb-2">{project.subtitle}</p>
                <div className="flex flex-wrap gap-1 mb-3">
                  {project.tech.slice(0, 5).map((tech) => (
                    <span key={tech} className={`text-[10px] px-2 py-0.5 rounded-full border ${techColors[tech] || 'bg-gray-500/20 text-gray-400'}`}>
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  {project.liveUrl && (
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-[#00d2ff] flex items-center gap-1">
                      <ExternalLink size={12} /> Live Demo
                    </a>
                  )}
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-[#8b949e] flex items-center gap-1">
                    <Github size={12} /> Source
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Skills */}
        <section id="skills" className="scroll-mt-24">
          <h2 className="text-xl font-mono text-[#00d2ff] mb-4">Skills</h2>
          <div className="grid grid-cols-2 gap-3 mb-6">
            {skillCategories.map((category) => (
              <div key={category.name} className="bg-[#161b22] border border-white/[0.08] rounded-lg p-3">
                <h3 className="text-xs font-mono text-[#00d2ff] mb-2">{category.name}</h3>
                <div className="flex flex-wrap gap-1">
                  {category.items.map((item) => (
                    <span key={item.name} className="text-[10px] bg-white/5 px-1.5 py-0.5 rounded text-[#8b949e]">
                      {item.name}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="space-y-2">
            {skillBars.map((skill) => (
              <div key={skill.name}>
                <div className="flex justify-between text-xs text-[#8b949e] mb-1">
                  <span>{skill.name}</span>
                  {skill.label && <span>{skill.label}</span>}
                </div>
                <div className="h-1.5 bg-[#1c2333] rounded-full overflow-hidden">
                  <div className="h-full bg-[#00ff41] rounded-full" style={{ width: `${skill.level}%` }} />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="scroll-mt-24">
          <h2 className="text-xl font-mono text-[#00d2ff] mb-4">Contact</h2>
          <ContactForm />
        </section>

        {/* Resume */}
        <section id="resume" className="scroll-mt-24">
          <h2 className="text-xl font-mono text-[#00d2ff] mb-4">Resume</h2>
          <div className="bg-[#161b22] border border-white/[0.08] rounded-lg p-4 space-y-4">
            <div>
              <h3 className="font-mono text-[#e6edf3]">{resumeData.name}</h3>
              <p className="text-xs text-[#00d2ff]">{resumeData.title}</p>
            </div>
            <div className="text-xs text-[#8b949e] space-y-1">
              <p>{resumeData.location} | {resumeData.phone}</p>
              <p>{resumeData.email}</p>
            </div>
            <a
              href="/resume.pdf"
              download
              className="inline-flex items-center gap-2 px-4 py-2 border border-[#00d2ff]/30 text-[#00d2ff] rounded text-sm font-mono"
            >
              <FileText size={14} /> Download PDF
            </a>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/[0.08] py-6 text-center text-xs text-[#8b949e] font-mono">
        <p>© 2026 Saurabh Kumar — Built with Next.js</p>
      </footer>
    </div>
  );
}

function ContactForm() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactForm) => {
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        toast.success('Message sent! I\'ll reply soon.');
        reset();
      } else {
        toast.error('Something went wrong.');
      }
    } catch {
      toast.error('Something went wrong.');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-[#161b22] border border-white/[0.08] rounded-lg p-4 space-y-4">
      <div>
        <input
          {...register('name')}
          placeholder="Name"
          className="w-full bg-transparent border-b border-white/10 focus:border-[#00ff41] outline-none py-2 text-sm text-[#e6edf3]"
        />
        {errors.name && <span className="text-red-400 text-xs">{errors.name.message}</span>}
      </div>
      <div>
        <input
          {...register('email')}
          type="email"
          placeholder="Email"
          className="w-full bg-transparent border-b border-white/10 focus:border-[#00ff41] outline-none py-2 text-sm text-[#e6edf3]"
        />
        {errors.email && <span className="text-red-400 text-xs">{errors.email.message}</span>}
      </div>
      <div>
        <textarea
          {...register('message')}
          placeholder="Message"
          rows={4}
          className="w-full bg-transparent border border-white/10 focus:border-[#00ff41] outline-none p-2 text-sm text-[#e6edf3] rounded resize-none"
        />
        {errors.message && <span className="text-red-400 text-xs">{errors.message.message}</span>}
      </div>
      <button
        type="submit"
        className="w-full py-2 border border-[#00ff41]/30 text-[#00ff41] rounded font-mono text-sm hover:bg-[#00ff41]/10 transition-colors"
      >
        Send Message
      </button>
    </form>
  );
}

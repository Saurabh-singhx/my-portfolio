'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu,
  X,
  Terminal,
  FileText,
  ExternalLink,
  Music,
  Brain,
  Building,
  Code2,
  Download,
  Mail,
  Trophy,
  Sparkles,
  Phone,
  MapPin,
  Palette,
  Check,
} from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa6';
import { projects, techColors } from '@/lib/projectsData';
import { skillCategories, skillBars } from '@/lib/skillsData';
import { resumeData } from '@/lib/resumeData';
import { useTheme } from '@/context/ThemeContext';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';

const contactSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  message: z.string().min(5, 'Message must be at least 5 characters'),
});

type ContactForm = z.infer<typeof contactSchema>;

const iconMap: Record<string, React.ReactNode> = {
  music: <Music size={18} />,
  brain: <Brain size={18} />,
  building: <Building size={18} />,
  code: <Code2 size={18} />,
};

export function MobileLayout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [themePickerOpen, setThemePickerOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('about');
  const { theme, setTheme, themes, currentTheme } = useTheme();

  const scrollTo = (id: string) => {
    setActiveSection(id);
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] font-sans pb-16 transition-colors duration-200">
      {/* Sticky Mobile Header */}
      <header className="sticky top-0 z-50 bg-[var(--bg-surface)]/95 backdrop-blur-xl border-b border-[var(--border-subtle)]">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <Terminal size={18} className="text-[var(--accent-secondary)]" />
            <span className="font-mono font-bold text-sm text-[var(--text-primary)]">Saurabh Kumar</span>
            <span className="text-[10px] bg-[var(--accent-primary)]/15 text-[var(--accent-primary)] px-1.5 py-0.5 rounded font-mono border border-[var(--accent-primary)]/20">
              v1.0
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Theme Toggle Button */}
            <button
              onClick={() => setThemePickerOpen(!themePickerOpen)}
              className="p-1.5 text-[var(--text-secondary)] hover:text-[var(--accent-primary)] bg-[var(--bg-hover)] rounded-md border border-[var(--border-subtle)] flex items-center gap-1 text-xs font-mono"
              title="Change theme"
              aria-label="Change theme"
            >
              <Palette size={14} className="text-[var(--accent-primary)]" />
              <div
                className="w-2 h-2 rounded-full border border-white/20"
                style={{ backgroundColor: currentTheme.preview.accent }}
              />
            </button>

            <a
              href="/resume.pdf"
              download="Saurabh_Kumar_Resume.pdf"
              className="p-1.5 text-[var(--accent-primary)] bg-[var(--accent-primary)]/15 rounded-md border border-[var(--accent-primary)]/30 text-xs flex items-center gap-1 font-mono"
            >
              <Download size={13} />
              <span className="hidden sm:inline">Resume</span>
            </a>
            <button
              onClick={() => {
                setMenuOpen(!menuOpen);
                setThemePickerOpen(false);
              }}
              className="p-1.5 text-[var(--text-primary)] hover:bg-[var(--bg-hover)] rounded-md"
              aria-label="Toggle navigation menu"
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Theme Picker Popdown */}
        <AnimatePresence>
          {themePickerOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-[var(--bg-secondary)] border-b border-[var(--border-primary)] px-4 py-3 shadow-2xl"
            >
              <div className="text-[10px] uppercase tracking-wider text-[var(--text-tertiary)] font-bold mb-2 font-mono flex items-center justify-between">
                <span>Theme & Font Pairing</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {themes.map((t) => {
                  const isActive = t.id === theme;
                  return (
                    <button
                      key={t.id}
                      onClick={() => {
                        setTheme(t.id);
                        setThemePickerOpen(false);
                      }}
                      className={`p-2.5 rounded-lg flex items-center justify-between text-left transition-colors ${
                        isActive
                          ? 'bg-[var(--accent-primary)]/15 border border-[var(--accent-primary)]/40 text-white'
                          : 'bg-[var(--bg-tertiary)] hover:bg-[var(--bg-hover)] text-[var(--text-secondary)] border border-[var(--border-subtle)]'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="flex items-center gap-1 shrink-0">
                          <div
                            className="w-3.5 h-3.5 rounded-full border border-white/20"
                            style={{ backgroundColor: t.preview.bg }}
                          />
                          <div
                            className="w-2.5 h-2.5 rounded-full -ml-2 border border-white/20"
                            style={{ backgroundColor: t.preview.accent }}
                          />
                        </div>
                        <div>
                          <div 
                            className="text-xs font-bold text-white tracking-wide"
                            style={{ fontFamily: t.fontSansVar }}
                          >
                            {t.name}
                          </div>
                          <div className="text-[10px] text-[var(--text-tertiary)] font-mono">
                            {t.label}
                          </div>
                        </div>
                      </div>
                      {isActive && <Check size={12} className="text-[var(--accent-primary)] shrink-0 ml-1" />}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Slide-down Nav Drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="sticky top-12 z-40 bg-[var(--bg-secondary)] border-b border-[var(--border-primary)] overflow-hidden shadow-2xl"
          >
            <nav className="px-4 py-3 space-y-1">
              {[
                { id: 'about', label: '01. About Me' },
                { id: 'projects', label: '02. Production Projects' },
                { id: 'skills', label: '03. Technical Stack' },
                { id: 'experience', label: '04. Experience' },
                { id: 'resume', label: '05. Verified Resume' },
                { id: 'contact', label: '06. Contact' },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className={`block w-full text-left px-3 py-2 rounded-lg font-mono text-xs transition-colors ${
                    activeSection === item.id
                      ? 'bg-[var(--accent-primary)]/20 text-[var(--accent-primary)] font-bold'
                      : 'text-[var(--text-secondary)] hover:text-white'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Sections */}
      <main className="px-4 py-6 space-y-10">
        {/* About Section */}
        <section id="about" className="space-y-4">
          <div className="bg-[var(--bg-secondary)] border border-[var(--border-subtle)] rounded-2xl p-5 space-y-4 shadow-xl">
            <div className="flex items-center gap-2 text-xs font-mono text-[var(--accent-secondary)]">
              <Sparkles size={14} />
              <span>Full-Stack & GenAI Engineer</span>
            </div>

            <h1 className="text-2xl font-bold font-mono text-[var(--text-primary)] leading-tight">
              Building autonomous AI agents & scalable cloud architectures.
            </h1>

            <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
              Full-stack developer with production experience shipping AI-powered web applications. Built <strong className="text-[var(--text-primary)]">Sonix Music</strong> (AWS, LangGraph, Gemini 3.1, pgvector RAG load-tested to 500 CCU) and <strong className="text-[var(--text-primary)]">FinAssist</strong> (Telegram financial intelligence bot).
            </p>

            <div className="flex flex-wrap gap-2 text-xs font-mono text-[var(--text-secondary)] pt-1">
              <span className="flex items-center gap-1 bg-[var(--bg-tertiary)] px-2.5 py-1 rounded-md border border-[var(--border-subtle)]">
                <MapPin size={12} className="text-[var(--accent-tertiary)]" /> Patna, Bihar, India
              </span>
              <span className="flex items-center gap-1 bg-[var(--bg-tertiary)] px-2.5 py-1 rounded-md border border-[var(--border-subtle)]">
                <Trophy size={12} className="text-[var(--accent-secondary)]" /> 350+ LeetCode DSA
              </span>
            </div>

            <div className="flex items-center gap-3 pt-2 border-t border-[var(--border-subtle)]">
              <a
                href="https://github.com/Saurabh-singhx"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[var(--bg-hover)] hover:bg-[var(--bg-hover)]/80 text-xs font-mono text-[var(--text-primary)] border border-[var(--border-primary)]"
              >
                <FaGithub size={14} /> GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/saurabh-kumar0/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[var(--accent-primary)]/15 hover:bg-[var(--accent-primary)]/25 text-xs font-mono text-[var(--accent-primary)] border border-[var(--accent-primary)]/30"
              >
                <FaLinkedin size={14} /> LinkedIn
              </a>
              <a
                href="/resume.pdf"
                download="Saurabh_Kumar_Resume.pdf"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[var(--accent-secondary)]/15 hover:bg-[var(--accent-secondary)]/25 text-xs font-mono text-[var(--accent-secondary)] border border-[var(--accent-secondary)]/30 ml-auto"
              >
                <Download size={13} /> PDF
              </a>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold font-mono text-[var(--accent-primary)] flex items-center gap-2">
              <span>❯ Projects</span>
              <span className="text-xs text-[var(--text-secondary)] font-normal">({projects.length})</span>
            </h2>
          </div>

          <div className="space-y-4">
            {projects.map((project) => (
              <div
                key={project.id}
                className="bg-[var(--bg-secondary)] border border-[var(--border-subtle)] rounded-xl p-4 space-y-3 shadow-lg"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <div
                      className="p-2 rounded-lg"
                      style={{
                        backgroundColor: `${project.iconColor}15`,
                        color: project.iconColor,
                      }}
                    >
                      {iconMap[project.icon]}
                    </div>
                    <div>
                      <h3 className="font-mono font-bold text-sm text-[var(--text-primary)]">{project.name}</h3>
                      <p className="text-[11px] text-[var(--accent-primary)] font-mono">{project.subtitle}</p>
                    </div>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded-full font-mono bg-[var(--accent-secondary)]/20 text-[var(--accent-secondary)]">
                    {project.status}
                  </span>
                </div>

                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  {project.description}
                </p>

                {project.metrics && (
                  <div className="bg-[var(--bg-tertiary)] p-2 rounded-lg border border-[var(--accent-secondary)]/25 text-[11px] font-mono text-[var(--accent-secondary)]">
                    {project.metrics[0]}
                  </div>
                )}

                <div className="flex flex-wrap gap-1">
                  {project.tech.slice(0, 6).map((tech) => (
                    <span
                      key={tech}
                      className={`text-[10px] px-2 py-0.5 rounded-md border font-mono ${
                        techColors[tech] || 'bg-[var(--bg-tertiary)] text-[var(--text-secondary)] border-[var(--border-subtle)]'
                      }`}
                    >
                      {tech}
                    </span>
                  ))}
                  {project.tech.length > 6 && (
                    <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-[var(--bg-tertiary)] text-[var(--text-secondary)] font-mono">
                      +{project.tech.length - 6} more
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-3 pt-2 border-t border-[var(--border-subtle)]">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-xs text-[var(--accent-primary)] hover:underline font-mono"
                    >
                      <ExternalLink size={12} /> Live Demo
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-xs text-[var(--text-secondary)] hover:text-white font-mono ml-auto"
                    >
                      <FaGithub size={13} /> Source Code
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="space-y-4">
          <h2 className="text-lg font-bold font-mono text-[var(--accent-primary)]">❯ Technical Stack</h2>

          <div className="grid grid-cols-1 gap-3">
            {skillCategories.map((category) => (
              <div
                key={category.name}
                className="bg-[var(--bg-secondary)] border border-[var(--border-subtle)] rounded-xl p-3.5 space-y-2"
              >
                <h3 className="text-xs font-bold font-mono text-[var(--accent-primary)] uppercase">
                  {category.name}
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {category.items.map((item) => (
                    <span
                      key={item.name}
                      className="text-[11px] font-mono bg-[var(--bg-tertiary)] border border-[var(--border-subtle)] px-2 py-0.5 rounded text-[var(--text-primary)]"
                    >
                      {item.name}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="bg-[var(--bg-secondary)] border border-[var(--border-subtle)] rounded-xl p-4 space-y-3">
            <div className="text-xs font-bold font-mono text-[var(--text-primary)] uppercase tracking-wider mb-1">
              Core Competencies
            </div>
            {skillBars.slice(0, 4).map((skill) => (
              <div key={skill.name} className="space-y-1">
                <div className="flex justify-between text-[11px] font-mono text-[var(--text-secondary)]">
                  <span className="truncate pr-2">{skill.name}</span>
                  <span className="text-[var(--accent-primary)] font-semibold">{skill.label || `${skill.level}%`}</span>
                </div>
                <div className="h-1.5 bg-[var(--bg-primary)] rounded-full overflow-hidden border border-[var(--border-subtle)]">
                  <div
                    className="h-full bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] rounded-full"
                    style={{ width: `${skill.level}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="space-y-4">
          <h2 className="text-lg font-bold font-mono text-[var(--accent-primary)]">❯ Experience</h2>
          <div className="space-y-3">
            {resumeData.experience.map((exp, i) => (
              <div
                key={i}
                className="bg-[var(--bg-secondary)] border border-[var(--border-subtle)] rounded-xl p-4 space-y-2"
              >
                <div className="flex justify-between items-baseline">
                  <h3 className="text-xs font-bold font-mono text-[var(--text-primary)]">{exp.title}</h3>
                  <span className="text-[10px] text-[var(--accent-primary)] font-mono">{exp.period}</span>
                </div>
                <div className="text-xs text-[var(--text-secondary)] font-mono">
                  {exp.company} • {exp.location}
                </div>
                <ul className="space-y-1 text-xs text-[var(--text-secondary)] pt-1">
                  {exp.bullets.map((b, j) => (
                    <li key={j} className="flex items-start gap-2">
                      <span className="text-[var(--accent-secondary)] font-mono">❯</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Resume Section */}
        <section id="resume" className="space-y-4">
          <h2 className="text-lg font-bold font-mono text-[var(--accent-primary)]">❯ Verified Resume</h2>
          <div className="bg-[var(--bg-secondary)] border border-[var(--border-subtle)] rounded-xl p-5 space-y-4">
            <div>
              <div className="font-bold font-mono text-[var(--text-primary)] text-base">{resumeData.name}</div>
              <div className="text-xs text-[var(--accent-primary)] font-mono">{resumeData.title}</div>
            </div>

            <div className="text-xs text-[var(--text-secondary)] font-mono space-y-1 bg-[var(--bg-tertiary)] p-3 rounded-lg border border-[var(--border-subtle)]">
              <p className="flex items-center gap-2">
                <MapPin size={12} className="text-[var(--accent-primary)]" /> {resumeData.location}
              </p>
              <p className="flex items-center gap-2">
                <Phone size={12} className="text-[var(--accent-secondary)]" /> {resumeData.phone}
              </p>
              <p className="flex items-center gap-2">
                <Mail size={12} className="text-[var(--accent-tertiary)]" /> {resumeData.email}
              </p>
            </div>

            <div className="border-t border-[var(--border-subtle)] pt-3 flex flex-wrap gap-2">
              <a
                href="/resume.pdf"
                download="Saurabh_Kumar_Resume.pdf"
                className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-[var(--accent-primary)]/15 hover:bg-[var(--accent-primary)]/25 text-[var(--accent-primary)] border border-[var(--accent-primary)]/40 rounded-xl text-xs font-mono font-bold"
              >
                <Download size={14} /> Download PDF
              </a>
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 bg-[var(--bg-hover)] hover:bg-[var(--bg-hover)]/80 text-[var(--text-primary)] border border-[var(--border-primary)] rounded-xl text-xs font-mono"
              >
                <FileText size={14} /> Open
              </a>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="space-y-4">
          <h2 className="text-lg font-bold font-mono text-[var(--accent-primary)]">❯ Contact Me</h2>
          <MobileContactForm />
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-[var(--border-subtle)] py-8 text-center text-xs text-[var(--text-secondary)] font-mono space-y-2">
        <p>© 2026 Saurabh Kumar • Full-Stack & GenAI Engineer</p>
        <p className="text-[11px] text-[var(--text-tertiary)]">Built with Next.js 16, React 19 & Tailwind CSS</p>
      </footer>
    </div>
  );
}

function MobileContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactForm) => {
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        toast.success("Message sent! I'll reply soon.");
        reset();
      } else {
        toast.error('Something went wrong. Please email directly.');
      }
    } catch {
      toast.error('Network error. Please email directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-[var(--bg-secondary)] border border-[var(--border-subtle)] rounded-xl p-4 space-y-3 font-mono shadow-xl"
    >
      <div>
        <label className="block text-[11px] text-[var(--accent-primary)] mb-1">{`> Your Name:`}</label>
        <input
          {...register('name')}
          placeholder="Name"
          className="w-full bg-[var(--bg-tertiary)] border border-[var(--border-primary)] rounded-lg px-3 py-2 text-xs text-[var(--text-primary)] outline-none focus:border-[var(--accent-primary)]"
        />
        {errors.name && <span className="text-[var(--accent-red)] text-[10px] mt-0.5 block">{errors.name.message}</span>}
      </div>

      <div>
        <label className="block text-[11px] text-[var(--accent-primary)] mb-1">{`> Your Email:`}</label>
        <input
          {...register('email')}
          type="email"
          placeholder="name@company.com"
          className="w-full bg-[var(--bg-tertiary)] border border-[var(--border-primary)] rounded-lg px-3 py-2 text-xs text-[var(--text-primary)] outline-none focus:border-[var(--accent-primary)]"
        />
        {errors.email && <span className="text-[var(--accent-red)] text-[10px] mt-0.5 block">{errors.email.message}</span>}
      </div>

      <div>
        <label className="block text-[11px] text-[var(--accent-primary)] mb-1">{`> Message:`}</label>
        <textarea
          {...register('message')}
          placeholder="Your message or job opportunity..."
          rows={3}
          className="w-full bg-[var(--bg-tertiary)] border border-[var(--border-primary)] rounded-lg p-2.5 text-xs text-[var(--text-primary)] outline-none focus:border-[var(--accent-primary)] resize-none"
        />
        {errors.message && <span className="text-[var(--accent-red)] text-[10px] mt-0.5 block">{errors.message.message}</span>}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-2.5 bg-[var(--accent-secondary)]/15 hover:bg-[var(--accent-secondary)]/25 border border-[var(--accent-secondary)]/40 text-[var(--accent-secondary)] rounded-lg font-mono text-xs font-bold transition-all disabled:opacity-50"
      >
        {isSubmitting ? 'Transmitting...' : 'Send Message →'}
      </button>
    </form>
  );
}
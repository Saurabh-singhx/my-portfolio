'use client';

import { useState } from 'react';
import { Download, ExternalLink, FileText, CheckCircle2, Award, Briefcase, GraduationCap, Code } from 'lucide-react';
import { resumeData } from '@/lib/resumeData';

export function ResumeWindow() {
  const [viewMode, setViewMode] = useState<'structured' | 'pdf'>('structured');

  return (
    <div className="h-full bg-[var(--bg-primary)] flex flex-col font-mono select-text transition-colors duration-200">
      {/* Top Header & Toolbar */}
      <div className="bg-[var(--bg-secondary)] p-4 border-b border-[var(--border-subtle)] flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-lg md:text-xl font-bold text-[var(--text-primary)]">{resumeData.name}</h1>
            <span className="text-[10px] bg-[var(--accent-primary)]/15 text-[var(--accent-primary)] border border-[var(--accent-primary)]/30 px-1.5 py-0.5 rounded">
              Verified PDF
            </span>
          </div>
          <p className="text-xs text-[var(--accent-primary)]">{resumeData.title}</p>
          <div className="flex flex-wrap items-center gap-2 mt-1 text-[11px] text-[var(--text-secondary)]">
            <span>{resumeData.location}</span>
            <span>•</span>
            <a href={`tel:${resumeData.phone}`} className="hover:text-white transition-colors">{resumeData.phone}</a>
            <span>•</span>
            <a href={`mailto:${resumeData.email}`} className="hover:text-white transition-colors">{resumeData.email}</a>
          </div>
        </div>

        {/* View mode toggle & Download button */}
        <div className="flex items-center gap-2">
          <div className="flex items-center bg-[var(--bg-tertiary)] p-1 rounded-lg border border-[var(--border-subtle)] text-xs">
            <button
              onClick={() => setViewMode('structured')}
              className={`px-2.5 py-1 rounded-md transition-colors ${
                viewMode === 'structured'
                  ? 'bg-[var(--accent-primary)]/20 text-[var(--accent-primary)] font-medium'
                  : 'text-[var(--text-secondary)] hover:text-white'
              }`}
            >
              Structured View
            </button>
            <button
              onClick={() => setViewMode('pdf')}
              className={`px-2.5 py-1 rounded-md transition-colors ${
                viewMode === 'pdf'
                  ? 'bg-[var(--accent-primary)]/20 text-[var(--accent-primary)] font-medium'
                  : 'text-[var(--text-secondary)] hover:text-white'
              }`}
            >
              PDF Preview
            </button>
          </div>

          <a
            href="/resume.pdf"
            download="Saurabh_Kumar_Resume.pdf"
            className="flex items-center gap-1.5 px-3 py-1.5 bg-[var(--accent-secondary)]/15 hover:bg-[var(--accent-secondary)]/25 text-[var(--accent-secondary)] border border-[var(--accent-secondary)]/40 rounded-lg text-xs transition-all hover:scale-[1.02]"
          >
            <Download size={13} />
            <span>Download PDF</span>
          </a>

          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            title="Open in new tab"
            className="p-1.5 text-[var(--text-secondary)] hover:text-white hover:bg-[var(--bg-hover)] rounded-lg border border-[var(--border-subtle)] transition-colors"
          >
            <ExternalLink size={14} />
          </a>
        </div>
      </div>

      {/* Content Area */}
      {viewMode === 'pdf' ? (
        <div className="flex-1 bg-[var(--bg-secondary)] p-2 overflow-hidden">
          <iframe
            src="/resume.pdf#toolbar=0"
            title="Saurabh Kumar Resume PDF"
            className="w-full h-full rounded border border-[var(--border-subtle)]"
          />
        </div>
      ) : (
        <div className="flex-1 p-6 overflow-y-auto space-y-6">
          {/* Summary */}
          <section className="bg-[var(--bg-secondary)]/60 p-4 rounded-xl border border-[var(--border-subtle)]">
            <h3 className="text-xs font-bold text-[var(--accent-primary)] uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <FileText size={14} /> Executive Summary
            </h3>
            <p className="text-xs md:text-sm text-[var(--text-primary)] leading-relaxed">
              {resumeData.summary}
            </p>
          </section>

          {/* Experience */}
          <section className="bg-[var(--bg-secondary)]/60 p-4 rounded-xl border border-[var(--border-subtle)]">
            <h3 className="text-xs font-bold text-[var(--accent-primary)] uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <Briefcase size={14} /> Professional Experience
            </h3>
            <div className="space-y-4">
              {resumeData.experience.map((exp, i) => (
                <div key={i} className="border-l-2 border-[var(--accent-primary)]/40 pl-3">
                  <div className="flex flex-wrap justify-between items-baseline gap-1">
                    <h4 className="text-xs md:text-sm font-bold text-[var(--text-primary)]">{exp.title}</h4>
                    <span className="text-[11px] text-[var(--accent-primary)] bg-[var(--accent-primary)]/15 px-1.5 py-0.5 rounded">
                      {exp.period}
                    </span>
                  </div>
                  <div className="text-xs text-[var(--text-secondary)] mb-2">
                    {exp.company} • {exp.location}
                  </div>
                  <ul className="space-y-1.5">
                    {exp.bullets.map((bullet, j) => (
                      <li key={j} className="text-xs text-[var(--text-secondary)] flex items-start gap-2">
                        <span className="text-[var(--accent-secondary)] mt-0.5">❯</span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* Featured Projects */}
          <section className="bg-[var(--bg-secondary)]/60 p-4 rounded-xl border border-[var(--border-subtle)]">
            <h3 className="text-xs font-bold text-[var(--accent-primary)] uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <Code size={14} /> Key Production Projects
            </h3>
            <div className="space-y-4">
              {resumeData.projects.map((proj, i) => (
                <div key={i} className="border-l-2 border-[var(--accent-secondary)]/40 pl-3">
                  <h4 className="text-xs md:text-sm font-bold text-[var(--text-primary)]">{proj.name}</h4>
                  <p className="text-[11px] text-[var(--text-secondary)] mb-2">{proj.description}</p>
                  {proj.bullets && (
                    <ul className="space-y-1.5">
                      {proj.bullets.map((bullet, j) => (
                        <li key={j} className="text-xs text-[var(--text-secondary)] flex items-start gap-2">
                          <span className="text-[var(--accent-primary)] mt-0.5">❯</span>
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Skills Breakdown */}
          <section className="bg-[var(--bg-secondary)]/60 p-4 rounded-xl border border-[var(--border-subtle)]">
            <h3 className="text-xs font-bold text-[var(--accent-primary)] uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <CheckCircle2 size={14} /> Technical Skills Matrix
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              <div>
                <span className="text-[var(--text-secondary)]">AI / LLM:</span>{' '}
                <span className="text-[var(--text-primary)]">{resumeData.skills.ai_ml.join(', ')}</span>
              </div>
              <div>
                <span className="text-[var(--text-secondary)]">Languages:</span>{' '}
                <span className="text-[var(--text-primary)]">{resumeData.skills.languages.join(', ')}</span>
              </div>
              <div>
                <span className="text-[var(--text-secondary)]">Backend:</span>{' '}
                <span className="text-[var(--text-primary)]">{resumeData.skills.backend.join(', ')}</span>
              </div>
              <div>
                <span className="text-[var(--text-secondary)]">Databases:</span>{' '}
                <span className="text-[var(--text-primary)]">{resumeData.skills.databases.join(', ')}</span>
              </div>
              <div>
                <span className="text-[var(--text-secondary)]">Cloud & DevOps:</span>{' '}
                <span className="text-[var(--text-primary)]">{resumeData.skills.cloud_devops.join(', ')}</span>
              </div>
              <div>
                <span className="text-[var(--text-secondary)]">Frontend:</span>{' '}
                <span className="text-[var(--text-primary)]">{resumeData.skills.frontend.join(', ')}</span>
              </div>
              <div className="md:col-span-2">
                <span className="text-[var(--text-secondary)]">Tools & Workflows:</span>{' '}
                <span className="text-[var(--text-primary)]">{resumeData.skills.tools.join(', ')}</span>
              </div>
            </div>
          </section>

          {/* Education & Honors */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Education */}
            <section className="bg-[var(--bg-secondary)]/60 p-4 rounded-xl border border-[var(--border-subtle)]">
              <h3 className="text-xs font-bold text-[var(--accent-primary)] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <GraduationCap size={14} /> Education
              </h3>
              {resumeData.education.map((edu, i) => (
                <div key={i} className="text-xs space-y-1">
                  <div className="font-bold text-[var(--text-primary)]">{edu.degree}</div>
                  <div className="text-[var(--text-secondary)]">{edu.institution}, {edu.location}</div>
                  <div className="flex items-center justify-between text-[var(--accent-primary)] text-[11px] pt-1">
                    <span>{edu.period}</span>
                    {edu.grade && <span className="bg-[var(--accent-primary)]/15 px-1.5 py-0.5 rounded">Score: {edu.grade}</span>}
                  </div>
                </div>
              ))}
            </section>

            {/* Certifications & Achievements */}
            <section className="bg-[var(--bg-secondary)]/60 p-4 rounded-xl border border-[var(--border-subtle)]">
              <h3 className="text-xs font-bold text-[var(--accent-primary)] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Award size={14} /> Certifications & Milestones
              </h3>
              <ul className="space-y-2 text-xs">
                {resumeData.certifications.map((cert, i) => (
                  <li key={i} className="text-[var(--text-primary)] flex items-start gap-1.5">
                    <span className="text-[var(--accent-secondary)]">★</span>
                    <span>{cert}</span>
                  </li>
                ))}
                {resumeData.achievements.map((ach, i) => (
                  <li key={i} className="text-[var(--text-secondary)] flex items-start gap-1.5">
                    <span className="text-[var(--accent-primary)]">❯</span>
                    <span>{ach}</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </div>
      )}
    </div>
  );
}
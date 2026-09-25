'use client';

import { useState } from 'react';
import { Download, ExternalLink, FileText, CheckCircle2, Award, Briefcase, GraduationCap, Code } from 'lucide-react';
import { resumeData } from '@/lib/resumeData';

export function ResumeWindow() {
  const [viewMode, setViewMode] = useState<'structured' | 'pdf'>('structured');

  return (
    <div className="h-full bg-[#0b0e14] flex flex-col font-mono select-text">
      {/* Top Header & Toolbar */}
      <div className="bg-[#141a24] p-4 border-b border-white/[0.08] flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-lg md:text-xl font-bold text-white">{resumeData.name}</h1>
            <span className="text-[10px] bg-[#00d2ff]/10 text-[#00d2ff] border border-[#00d2ff]/30 px-1.5 py-0.5 rounded">
              Verified PDF
            </span>
          </div>
          <p className="text-xs text-[#00d2ff]">{resumeData.title}</p>
          <div className="flex flex-wrap items-center gap-2 mt-1 text-[11px] text-[#8b949e]">
            <span>{resumeData.location}</span>
            <span>•</span>
            <a href={`tel:${resumeData.phone}`} className="hover:text-white transition-colors">{resumeData.phone}</a>
            <span>•</span>
            <a href={`mailto:${resumeData.email}`} className="hover:text-white transition-colors">{resumeData.email}</a>
          </div>
        </div>

        {/* View mode toggle & Download button */}
        <div className="flex items-center gap-2">
          <div className="flex items-center bg-[#0d1117] p-1 rounded-lg border border-white/10 text-xs">
            <button
              onClick={() => setViewMode('structured')}
              className={`px-2.5 py-1 rounded-md transition-colors ${
                viewMode === 'structured'
                  ? 'bg-[#00d2ff]/20 text-[#00d2ff] font-medium'
                  : 'text-[#8b949e] hover:text-white'
              }`}
            >
              Structured View
            </button>
            <button
              onClick={() => setViewMode('pdf')}
              className={`px-2.5 py-1 rounded-md transition-colors ${
                viewMode === 'pdf'
                  ? 'bg-[#00d2ff]/20 text-[#00d2ff] font-medium'
                  : 'text-[#8b949e] hover:text-white'
              }`}
            >
              PDF Preview
            </button>
          </div>

          <a
            href="/resume.pdf"
            download="Saurabh_Kumar_Resume.pdf"
            className="flex items-center gap-1.5 px-3 py-1.5 bg-[#00ff41]/10 hover:bg-[#00ff41]/20 text-[#00ff41] border border-[#00ff41]/30 rounded-lg text-xs transition-all hover:scale-[1.02]"
          >
            <Download size={13} />
            <span>Download PDF</span>
          </a>

          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            title="Open in new tab"
            className="p-1.5 text-[#8b949e] hover:text-white hover:bg-white/5 rounded-lg border border-white/10 transition-colors"
          >
            <ExternalLink size={14} />
          </a>
        </div>
      </div>

      {/* Content Area */}
      {viewMode === 'pdf' ? (
        <div className="flex-1 bg-[#1a1f2c] p-2 overflow-hidden">
          <iframe
            src="/resume.pdf#toolbar=0"
            title="Saurabh Kumar Resume PDF"
            className="w-full h-full rounded border border-white/10"
          />
        </div>
      ) : (
        <div className="flex-1 p-6 overflow-y-auto space-y-6">
          {/* Summary */}
          <section className="bg-[#141a24]/60 p-4 rounded-xl border border-white/[0.06]">
            <h3 className="text-xs font-bold text-[#00d2ff] uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <FileText size={14} /> Executive Summary
            </h3>
            <p className="text-xs md:text-sm text-[#e6edf3] leading-relaxed">
              {resumeData.summary}
            </p>
          </section>

          {/* Experience */}
          <section className="bg-[#141a24]/60 p-4 rounded-xl border border-white/[0.06]">
            <h3 className="text-xs font-bold text-[#00d2ff] uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <Briefcase size={14} /> Professional Experience
            </h3>
            <div className="space-y-4">
              {resumeData.experience.map((exp, i) => (
                <div key={i} className="border-l-2 border-[#00d2ff]/40 pl-3">
                  <div className="flex flex-wrap justify-between items-baseline gap-1">
                    <h4 className="text-xs md:text-sm font-bold text-white">{exp.title}</h4>
                    <span className="text-[11px] text-[#00d2ff] bg-[#00d2ff]/10 px-1.5 py-0.5 rounded">
                      {exp.period}
                    </span>
                  </div>
                  <div className="text-xs text-[#8b949e] mb-2">
                    {exp.company} • {exp.location}
                  </div>
                  <ul className="space-y-1.5">
                    {exp.bullets.map((bullet, j) => (
                      <li key={j} className="text-xs text-[#c9d1d9] flex items-start gap-2">
                        <span className="text-[#00ff41] mt-0.5">❯</span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* Featured Projects */}
          <section className="bg-[#141a24]/60 p-4 rounded-xl border border-white/[0.06]">
            <h3 className="text-xs font-bold text-[#00d2ff] uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <Code size={14} /> Key Production Projects
            </h3>
            <div className="space-y-4">
              {resumeData.projects.map((proj, i) => (
                <div key={i} className="border-l-2 border-emerald-500/40 pl-3">
                  <h4 className="text-xs md:text-sm font-bold text-white">{proj.name}</h4>
                  <p className="text-[11px] text-[#8b949e] mb-2">{proj.description}</p>
                  {proj.bullets && (
                    <ul className="space-y-1.5">
                      {proj.bullets.map((bullet, j) => (
                        <li key={j} className="text-xs text-[#c9d1d9] flex items-start gap-2">
                          <span className="text-[#00d2ff] mt-0.5">❯</span>
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
          <section className="bg-[#141a24]/60 p-4 rounded-xl border border-white/[0.06]">
            <h3 className="text-xs font-bold text-[#00d2ff] uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <CheckCircle2 size={14} /> Technical Skills Matrix
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              <div>
                <span className="text-[#8b949e]">AI / LLM:</span>{' '}
                <span className="text-[#e6edf3]">{resumeData.skills.ai_ml.join(', ')}</span>
              </div>
              <div>
                <span className="text-[#8b949e]">Languages:</span>{' '}
                <span className="text-[#e6edf3]">{resumeData.skills.languages.join(', ')}</span>
              </div>
              <div>
                <span className="text-[#8b949e]">Backend:</span>{' '}
                <span className="text-[#e6edf3]">{resumeData.skills.backend.join(', ')}</span>
              </div>
              <div>
                <span className="text-[#8b949e]">Databases:</span>{' '}
                <span className="text-[#e6edf3]">{resumeData.skills.databases.join(', ')}</span>
              </div>
              <div>
                <span className="text-[#8b949e]">Cloud & DevOps:</span>{' '}
                <span className="text-[#e6edf3]">{resumeData.skills.cloud_devops.join(', ')}</span>
              </div>
              <div>
                <span className="text-[#8b949e]">Frontend:</span>{' '}
                <span className="text-[#e6edf3]">{resumeData.skills.frontend.join(', ')}</span>
              </div>
              <div className="md:col-span-2">
                <span className="text-[#8b949e]">Tools & Workflows:</span>{' '}
                <span className="text-[#e6edf3]">{resumeData.skills.tools.join(', ')}</span>
              </div>
            </div>
          </section>

          {/* Education & Honors */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Education */}
            <section className="bg-[#141a24]/60 p-4 rounded-xl border border-white/[0.06]">
              <h3 className="text-xs font-bold text-[#00d2ff] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <GraduationCap size={14} /> Education
              </h3>
              {resumeData.education.map((edu, i) => (
                <div key={i} className="text-xs space-y-1">
                  <div className="font-bold text-white">{edu.degree}</div>
                  <div className="text-[#8b949e]">{edu.institution}, {edu.location}</div>
                  <div className="flex items-center justify-between text-[#00d2ff] text-[11px] pt-1">
                    <span>{edu.period}</span>
                    {edu.grade && <span className="bg-[#00d2ff]/10 px-1.5 py-0.5 rounded">Score: {edu.grade}</span>}
                  </div>
                </div>
              ))}
            </section>

            {/* Certifications & Achievements */}
            <section className="bg-[#141a24]/60 p-4 rounded-xl border border-white/[0.06]">
              <h3 className="text-xs font-bold text-[#00d2ff] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Award size={14} /> Certifications & Milestones
              </h3>
              <ul className="space-y-2 text-xs">
                {resumeData.certifications.map((cert, i) => (
                  <li key={i} className="text-[#e6edf3] flex items-start gap-1.5">
                    <span className="text-[#00ff41]">★</span>
                    <span>{cert}</span>
                  </li>
                ))}
                {resumeData.achievements.map((ach, i) => (
                  <li key={i} className="text-[#c9d1d9] flex items-start gap-1.5">
                    <span className="text-[#00d2ff]">❯</span>
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
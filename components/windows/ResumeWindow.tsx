'use client';

import { Download } from 'lucide-react';
import { resumeData } from '@/lib/resumeData';

export function ResumeWindow() {
  return (
    <div className="h-full bg-[#161b22] overflow-auto ">
      {/* Header */}
      <div className="bg-[#1c2333] p-6 border-b border-white/[0.08]">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold font-mono text-[#e6edf3]">{resumeData.name}</h1>
            <p className="text-[#00d2ff] font-mono text-sm">{resumeData.title}</p>
            <div className="flex flex-wrap gap-3 mt-2 text-xs text-[#8b949e] font-mono">
              <span>{resumeData.location}</span>
              <span>|</span>
              <span>{resumeData.phone}</span>
              <span>|</span>
              <span>{resumeData.email}</span>
            </div>
          </div>
          <a
            href="/resume.pdf"
            download
            className="flex items-center gap-2 px-3 py-1.5 border border-[#00d2ff]/30 text-[#00d2ff] rounded hover:bg-[#00d2ff]/10 transition-colors font-mono text-xs"
          >
            <Download size={14} />
            Download PDF
          </a>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-6">
        {/* Summary */}
        <section>
          <h3 className="text-sm font-mono text-[#00d2ff] mb-2 uppercase tracking-wider">Summary</h3>
          <p className="text-sm text-[#e6edf3] leading-relaxed">{resumeData.summary}</p>
        </section>

        {/* Skills */}
        <section>
          <h3 className="text-sm font-mono text-[#00d2ff] mb-2 uppercase tracking-wider">Skills</h3>
          <div className="space-y-1 text-sm text-[#e6edf3]">
            <div><span className="text-[#8b949e]">Languages:</span> {resumeData.skills.languages.join(', ')}</div>
            <div><span className="text-[#8b949e]">Backend:</span> {resumeData.skills.backend.join(', ')}</div>
            <div><span className="text-[#8b949e]">AI/ML:</span> {resumeData.skills.ai_ml.join(', ')}</div>
            <div><span className="text-[#8b949e]">Databases:</span> {resumeData.skills.databases.join(', ')}</div>
            <div><span className="text-[#8b949e]">Cloud & DevOps:</span> {resumeData.skills.cloud_devops.join(', ')}</div>
            <div><span className="text-[#8b949e]">Frontend:</span> {resumeData.skills.frontend.join(', ')}</div>
            <div><span className="text-[#8b949e]">Tools:</span> {resumeData.skills.tools.join(', ')}</div>
          </div>
        </section>

        {/* Experience */}
        <section>
          <h3 className="text-sm font-mono text-[#00d2ff] mb-2 uppercase tracking-wider">Experience</h3>
          {resumeData.experience.map((exp, i) => (
            <div key={i} className="mb-3">
              <div className="flex justify-between items-baseline">
                <h4 className="text-sm font-mono text-[#e6edf3]">{exp.title}</h4>
                <span className="text-xs text-[#8b949e]">{exp.period}</span>
              </div>
              <p className="text-xs text-[#8b949e] mb-1">{exp.company}, {exp.location}</p>
              <ul className="space-y-1">
                {exp.bullets.map((bullet, j) => (
                  <li key={j} className="text-sm text-[#e6edf3] flex gap-2">
                    <span className="text-[#00d2ff]">→</span>
                    {bullet}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        {/* Projects */}
        <section>
          <h3 className="text-sm font-mono text-[#00d2ff] mb-2 uppercase tracking-wider">Projects</h3>
          {resumeData.projects.map((project, i) => (
            <div key={i} className="mb-2">
              <h4 className="text-sm font-mono text-[#e6edf3]">{project.name}</h4>
              <p className="text-xs text-[#8b949e]">{project.description}</p>
            </div>
          ))}
        </section>

        {/* Education */}
        <section>
          <h3 className="text-sm font-mono text-[#00d2ff] mb-2 uppercase tracking-wider">Education</h3>
          {resumeData.education.map((edu, i) => (
            <div key={i}>
              <div className="flex justify-between items-baseline">
                <h4 className="text-sm font-mono text-[#e6edf3]">{edu.degree}</h4>
                <span className="text-xs text-[#8b949e]">{edu.period}</span>
              </div>
              <p className="text-xs text-[#8b949e]">{edu.institution}, {edu.location}</p>
            </div>
          ))}
        </section>

        {/* Achievements */}
        <section>
          <h3 className="text-sm font-mono text-[#00d2ff] mb-2 uppercase tracking-wider">Achievements</h3>
          <ul className="space-y-1">
            {resumeData.achievements.map((achievement, i) => (
              <li key={i} className="text-sm text-[#e6edf3] flex gap-2">
                <span className="text-[#00d2ff]">→</span>
                {achievement}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}

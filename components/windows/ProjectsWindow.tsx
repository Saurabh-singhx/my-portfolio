'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Music, Brain, Building, ExternalLink, Code2, CheckCircle2, Cpu, Activity } from 'lucide-react';
import { FaGithub } from 'react-icons/fa6';
import { projects, techColors } from '@/lib/projectsData';
import { Project } from '@/lib/types';

const iconMap: Record<string, React.ReactNode> = {
  music: <Music size={18} />,
  brain: <Brain size={18} />,
  building: <Building size={18} />,
  code: <Code2 size={18} />,
};

export function ProjectsWindow() {
  const [selectedProject, setSelectedProject] = useState<Project>(projects[0]);
  const [activeTab, setActiveTab] = useState<'overview' | 'architecture' | 'metrics'>('overview');

  return (
    <div className="h-full flex flex-col md:flex-row bg-[var(--bg-primary)] select-text transition-colors duration-200">
      {/* Sidebar */}
      <div className="w-full md:w-[230px] bg-[var(--bg-secondary)] border-r border-[var(--border-subtle)] flex-shrink-0 flex flex-col">
        <div className="p-3 border-b border-[var(--border-subtle)] text-xs font-mono text-[var(--text-secondary)] flex items-center justify-between">
          <span>PROJECTS ({projects.length})</span>
          <span className="text-[10px] bg-[var(--accent-primary)]/15 text-[var(--accent-primary)] px-1.5 py-0.5 rounded border border-[var(--accent-primary)]/20">
            Updated 2026
          </span>
        </div>

        <div className="overflow-y-auto flex-1 divide-y divide-[var(--border-subtle)]/40">
          {projects.map((project) => {
            const isSelected = selectedProject.id === project.id;
            return (
              <button
                key={project.id}
                onClick={() => {
                  setSelectedProject(project);
                  setActiveTab('overview');
                }}
                className={`w-full flex items-start gap-3 p-3 text-left transition-all ${
                  isSelected
                    ? 'bg-[var(--accent-primary)]/15 border-l-2 border-[var(--accent-primary)]'
                    : 'hover:bg-[var(--bg-hover)]'
                }`}
              >
                <div
                  className="p-1.5 rounded-md mt-0.5"
                  style={{
                    backgroundColor: `${project.iconColor}15`,
                    color: project.iconColor,
                  }}
                >
                  {iconMap[project.icon] || <Code2 size={18} />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1">
                    <span className="text-xs font-mono font-medium text-[var(--text-primary)] truncate">
                      {project.name}
                    </span>
                    <span
                      className={`text-[9px] px-1 rounded font-mono ${
                        project.status === 'Live'
                          ? 'bg-[var(--accent-secondary)]/20 text-[var(--accent-secondary)]'
                          : 'bg-[var(--accent-primary)]/20 text-[var(--accent-primary)]'
                      }`}
                    >
                      {project.status}
                    </span>
                  </div>
                  <p className="text-[11px] text-[var(--text-secondary)] truncate mt-0.5 font-mono">
                    {project.type}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Details Pane */}
      <div className="flex-1 p-6 overflow-y-auto flex flex-col bg-[var(--bg-primary)]">
        <motion.div
          key={selectedProject.id}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="space-y-5"
        >
          {/* Header */}
          <div className="border-b border-[var(--border-subtle)] pb-4">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
              <div className="flex items-center gap-3">
                <div
                  className="p-2.5 rounded-lg border border-[var(--border-subtle)]"
                  style={{
                    backgroundColor: `${selectedProject.iconColor}15`,
                    color: selectedProject.iconColor,
                  }}
                >
                  {iconMap[selectedProject.icon]}
                </div>
                <div>
                  <h2 className="text-xl font-bold font-mono text-[var(--text-primary)] flex items-center gap-2">
                    {selectedProject.name}
                  </h2>
                  <p className="text-xs text-[var(--accent-primary)] font-mono">{selectedProject.subtitle}</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                {selectedProject.liveUrl && (
                  <a
                    href={selectedProject.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[var(--accent-primary)]/15 hover:bg-[var(--accent-primary)]/25 text-[var(--accent-primary)] border border-[var(--accent-primary)]/40 text-xs font-mono transition-all hover:scale-[1.02]"
                  >
                    <ExternalLink size={13} />
                    <span>Live Demo</span>
                  </a>
                )}
                {selectedProject.githubUrl && (
                  <a
                    href={selectedProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[var(--bg-hover)] hover:bg-[var(--bg-hover)]/80 text-[var(--text-primary)] border border-[var(--border-primary)] text-xs font-mono transition-all hover:scale-[1.02]"
                  >
                    <FaGithub size={13} />
                    <span>Source Code</span>
                  </a>
                )}
              </div>
            </div>

            {/* Sub-tabs */}
            <div className="flex items-center gap-4 mt-4 text-xs font-mono">
              <button
                onClick={() => setActiveTab('overview')}
                className={`pb-1 border-b-2 transition-colors flex items-center gap-1.5 ${
                  activeTab === 'overview'
                    ? 'border-[var(--accent-primary)] text-[var(--accent-primary)]'
                    : 'border-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                }`}
              >
                <CheckCircle2 size={13} /> Overview & Highlights
              </button>
              {selectedProject.architecture && (
                <button
                  onClick={() => setActiveTab('architecture')}
                  className={`pb-1 border-b-2 transition-colors flex items-center gap-1.5 ${
                    activeTab === 'architecture'
                      ? 'border-[var(--accent-primary)] text-[var(--accent-primary)]'
                      : 'border-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                  }`}
                >
                  <Cpu size={13} /> System Architecture
                </button>
              )}
              {selectedProject.metrics && (
                <button
                  onClick={() => setActiveTab('metrics')}
                  className={`pb-1 border-b-2 transition-colors flex items-center gap-1.5 ${
                    activeTab === 'metrics'
                      ? 'border-[var(--accent-primary)] text-[var(--accent-primary)]'
                      : 'border-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                  }`}
                >
                  <Activity size={13} /> Performance & Metrics
                </button>
              )}
            </div>
          </div>

          {/* Description */}
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
            {selectedProject.description}
          </p>

          {/* Tech Badges */}
          <div>
            <div className="text-xs font-mono text-[var(--text-secondary)] mb-2 uppercase tracking-wider">
              Tech Stack & Infrastructure
            </div>
            <div className="flex flex-wrap gap-1.5">
              {selectedProject.tech.map((tech) => (
                <span
                  key={tech}
                  className={`text-xs px-2.5 py-1 rounded-md border font-mono ${
                    techColors[tech] || 'bg-[var(--bg-tertiary)] text-[var(--text-secondary)] border-[var(--border-subtle)]'
                  }`}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          {activeTab === 'overview' && (
            <div className="space-y-3 bg-[var(--bg-secondary)]/60 p-4 rounded-xl border border-[var(--border-subtle)]">
              <div className="text-xs font-mono text-[var(--accent-primary)] uppercase tracking-wider mb-1 flex items-center gap-2">
                <span>Key Deliverables & Engineering Accomplishments</span>
              </div>
              <div className="space-y-2.5">
                {selectedProject.highlights.map((highlight, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-xs md:text-sm text-[var(--text-primary)]">
                    <span className="text-[var(--accent-secondary)] font-mono mt-0.5">❯</span>
                    <span className="leading-relaxed">{highlight}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'architecture' && selectedProject.architecture && (
            <div className="space-y-3 bg-[var(--bg-secondary)]/60 p-4 rounded-xl border border-[var(--border-subtle)]">
              <div className="text-xs font-mono text-[var(--accent-primary)] uppercase tracking-wider mb-1">
                Architecture Breakdown
              </div>
              <div className="space-y-2">
                {selectedProject.architecture.map((item, i) => (
                  <div
                    key={i}
                    className="p-2.5 rounded-lg bg-[var(--bg-tertiary)] border border-[var(--border-subtle)] font-mono text-xs text-[var(--text-secondary)]"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'metrics' && selectedProject.metrics && (
            <div className="space-y-3 bg-[var(--bg-secondary)]/60 p-4 rounded-xl border border-[var(--border-subtle)]">
              <div className="text-xs font-mono text-[var(--accent-secondary)] uppercase tracking-wider mb-1">
                Load Testing & Production Metrics
              </div>
              <div className="grid grid-cols-1 gap-2.5">
                {selectedProject.metrics.map((metric, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 p-3 rounded-lg bg-[var(--bg-tertiary)] border border-[var(--accent-secondary)]/30 text-xs font-mono text-[var(--accent-secondary)]"
                  >
                    <Activity size={14} className="text-[var(--accent-secondary)] flex-shrink-0" />
                    <span>{metric}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
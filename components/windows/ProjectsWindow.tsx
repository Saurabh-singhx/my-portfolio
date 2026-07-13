'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Music, Brain, Building, ExternalLink, Github } from 'lucide-react';
import { projects, techColors } from '@/lib/projectsData';
import { Project } from '@/lib/types';

const iconMap: Record<string, React.ReactNode> = {
  music: <Music size={20} />,
  brain: <Brain size={20} />,
  building: <Building size={20} />,
};

export function ProjectsWindow() {
  const [selectedProject, setSelectedProject] = useState<Project>(projects[0]);

  return (
    <div className="h-full flex bg-[#161b22] ">
      {/* Sidebar */}
      <div className="w-[200px] bg-[#1c2333] border-r border-white/[0.08] overflow-auto flex-shrink-0">
        {projects.map((project) => (
          <button
            key={project.id}
            onClick={() => setSelectedProject(project)}
            className={`w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-white/5 transition-colors ${
              selectedProject.id === project.id ? 'bg-white/10' : ''
            }`}
          >
            <span style={{ color: project.iconColor }}>{iconMap[project.icon]}</span>
            <span className="text-sm font-mono text-[#e6edf3] truncate">{project.name}</span>
          </button>
        ))}
      </div>

      {/* Detail View */}
      <div className="flex-1 p-6 overflow-auto">
        <motion.div
          key={selectedProject.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex items-center gap-3 mb-2">
            <span style={{ color: selectedProject.iconColor }}>{iconMap[selectedProject.icon]}</span>
            <h2 className="text-2xl font-bold font-mono text-[#e6edf3]">{selectedProject.name}</h2>
          </div>

          <p className="text-[#8b949e] mb-2">{selectedProject.subtitle}</p>

          <div className="flex items-center gap-2 mb-4">
            <span className={`text-xs px-2 py-1 rounded-full font-mono ${
              selectedProject.status === 'Live' ? 'bg-green-500/20 text-green-400' :
              selectedProject.status === 'Integrated' ? 'bg-yellow-500/20 text-yellow-400' :
              'bg-amber-500/20 text-amber-400'
            }`}>
              {selectedProject.status}
            </span>
            <span className="text-xs text-[#8b949e] font-mono">{selectedProject.type}</span>
          </div>

          {/* Tech badges */}
          <div className="flex flex-wrap gap-2 mb-6">
            {selectedProject.tech.map((tech) => (
              <span
                key={tech}
                className={`text-xs px-2 py-1 rounded-full border font-mono ${techColors[tech] || 'bg-gray-500/20 text-gray-400 border-gray-500/30'}`}
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Highlights */}
          <div className="space-y-2 mb-6">
            {selectedProject.highlights.map((highlight, i) => (
              <div key={i} className="flex gap-2 text-sm text-[#e6edf3]">
                <span className="text-[#00d2ff]">→</span>
                <span>{highlight}</span>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex gap-3">
            {selectedProject.liveUrl && (
              <a
                href={selectedProject.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 border border-[#00d2ff]/30 text-[#00d2ff] rounded hover:bg-[#00d2ff]/10 transition-colors font-mono text-sm"
              >
                <ExternalLink size={14} />
                Open Live Demo
              </a>
            )}
            <a
              href={selectedProject.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 border border-white/20 text-[#e6edf3] rounded hover:bg-white/10 transition-colors font-mono text-sm"
            >
              <Github size={14} />
              View Source
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

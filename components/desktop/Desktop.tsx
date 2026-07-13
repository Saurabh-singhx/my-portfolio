'use client';

import { useCallback } from 'react';
import { Menubar } from './Menubar';
import { Dock } from './Dock';
import { Window } from './Window';
import { TerminalWindow } from '../windows/TerminalWindow';
import { ProjectsWindow } from '../windows/ProjectsWindow';
import { SkillsWindow } from '../windows/SkillsWindow';
import { ContactWindow } from '../windows/ContactWindow';
import { ResumeWindow } from '../windows/ResumeWindow';
import { useWindowManager } from '@/context/WindowManagerContext';
import { ParticlesBackground } from './ParticlesBackground';
import { FileText } from 'lucide-react';

export function Desktop() {
  const { windows, openWindow } = useWindowManager();

  const openResume = useCallback(() => openWindow('resume'), [openWindow]);

  return (
    <div className="fixed inset-0 bg-[#0d1117] ">
      <ParticlesBackground />
      
      <Menubar />
      
      {/* FIXED: Added relative positioning, removed pb-20, overflow visible */}
      <div 
        className="absolute inset-0 pt-10 " 
        style={{ position: 'relative', overflow: 'visible' }}
      >
        {/* Desktop Icons */}
        <div className="absolute top-10 left-4 flex flex-col gap-4 z-0">
          <DesktopIcon 
            label="resume.pdf" 
            onClick={openResume}
          />
        </div>

        {/* Windows */}
        {windows.terminal.isOpen && (
          <Window id="terminal" title="Terminal">
            <TerminalWindow/>
          </Window>
        )}
        {windows.projects.isOpen && (
          <Window id="projects" title="Projects">
            <ProjectsWindow />
          </Window>
        )}
        {windows.skills.isOpen && (
          <Window id="skills" title="Skills">
            <SkillsWindow />
          </Window>
        )}
        {windows.contact.isOpen && (
          <Window id="contact" title="Contact">
            <ContactWindow />
          </Window>
        )}
        {windows.resume.isOpen && (
          <Window id="resume" title="Resume">
            <ResumeWindow />
          </Window>
        )}
      </div>

      <Dock />
    </div>
  );
}

function DesktopIcon({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center gap-1 p-2 rounded hover:bg-white/5 transition-colors group"
    >
      <div className="w-12 h-14 bg-red-500/20 rounded flex items-center justify-center border border-red-500/30">
        <FileText size={20} className="text-red-400" />
      </div>
      <span className="text-xs text-[#e6edf3] font-mono group-hover:bg-[#00d2ff]/20 px-1 rounded transition-colors">
        {label}
      </span>
    </button>
  );
}
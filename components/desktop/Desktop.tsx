'use client';

import { useState } from 'react';
import { Menubar } from './Menubar';
import { Dock } from './Dock';
import { Window } from './Window';
import { TerminalWindow } from '../windows/TerminalWindow';
import { ProjectsWindow } from '../windows/ProjectsWindow';
import { SkillsWindow } from '../windows/SkillsWindow';
import { ContactWindow } from '../windows/ContactWindow';
import { ResumeWindow } from '../windows/ResumeWindow';
import { ParticlesBackground } from './ParticlesBackground';
import { useWindowManager } from '@/context/WindowManagerContext';
import { WindowId } from '@/lib/types';
import { Folder, Terminal, Braces, Mail, FileText } from 'lucide-react';

interface DesktopShortcut {
  id: WindowId;
  label: string;
  icon: React.ReactNode;
  badge?: string;
  color: string;
}

const shortcuts: DesktopShortcut[] = [
  {
    id: 'projects',
    label: 'Projects',
    icon: <Folder className="w-6 h-6 text-[#00d2ff]" />,
    color: 'border-[#00d2ff]/30 bg-[#00d2ff]/10',
  },
  {
    id: 'terminal',
    label: 'Terminal',
    icon: <Terminal className="w-6 h-6 text-[#00ff41]" />,
    color: 'border-[#00ff41]/30 bg-[#00ff41]/10',
  },
  {
    id: 'skills',
    label: 'Skills.json',
    icon: <Braces className="w-6 h-6 text-[#ffbd2e]" />,
    color: 'border-[#ffbd2e]/30 bg-[#ffbd2e]/10',
  },
  {
    id: 'resume',
    label: 'resume.pdf',
    icon: <FileText className="w-6 h-6 text-[#ff5f56]" />,
    badge: 'PDF',
    color: 'border-[#ff5f56]/30 bg-[#ff5f56]/10',
  },
  {
    id: 'contact',
    label: 'Contact.sh',
    icon: <Mail className="w-6 h-6 text-[#a855f7]" />,
    color: 'border-[#a855f7]/30 bg-[#a855f7]/10',
  },
];

export function Desktop() {
  const { windows, openWindow } = useWindowManager();
  const [selectedId, setSelectedId] = useState<string | null>(null);

  return (
    <div
      className="fixed inset-0 bg-[#0b0e14] overflow-hidden select-none"
      onClick={() => setSelectedId(null)}
    >
      <ParticlesBackground />
      
      <Menubar />
      
      <div className="absolute inset-0 pt-10 pb-24 px-6 pointer-events-auto">
        {/* Desktop Icons Grid */}
        <div className="flex flex-col gap-4 w-24">
          {shortcuts.map((shortcut) => {
            const isSelected = selectedId === shortcut.id;
            return (
              <button
                key={shortcut.id}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedId(shortcut.id);
                  openWindow(shortcut.id);
                }}
                className={`flex flex-col items-center gap-1.5 p-2 rounded-xl transition-all group ${
                  isSelected
                    ? 'bg-white/15 ring-1 ring-[#00d2ff]'
                    : 'hover:bg-white/10'
                }`}
              >
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center border shadow-lg transition-transform group-hover:scale-105 ${shortcut.color}`}
                >
                  {shortcut.icon}
                </div>
                <span className="text-[11px] text-[#e6edf3] font-mono px-1.5 py-0.5 rounded leading-tight text-center drop-shadow">
                  {shortcut.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* Windows */}
        {windows.terminal.isOpen && (
          <Window id="terminal" title="Terminal — saurabh@SaurabhOS:~">
            <TerminalWindow />
          </Window>
        )}
        {windows.projects.isOpen && (
          <Window id="projects" title="Featured Projects — Sonix Music, FinAssist & More">
            <ProjectsWindow />
          </Window>
        )}
        {windows.skills.isOpen && (
          <Window id="skills" title="Technical Skills & System Architecture">
            <SkillsWindow />
          </Window>
        )}
        {windows.contact.isOpen && (
          <Window id="contact" title="Get in Touch — get_in_touch.sh">
            <ContactWindow />
          </Window>
        )}
        {windows.resume.isOpen && (
          <Window id="resume" title="Curriculum Vitae — Saurabh Kumar">
            <ResumeWindow />
          </Window>
        )}
      </div>

      <Dock />
    </div>
  );
}
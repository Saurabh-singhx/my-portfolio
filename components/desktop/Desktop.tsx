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
import { Folder, Terminal, Braces, Mail, FileText, ArrowUpRight } from 'lucide-react';
import { FaLinkedin, FaGithub } from 'react-icons/fa6';
import { resumeData } from '@/lib/resumeData';

interface DesktopShortcut {
  id: string;
  label: string;
  icon: React.ReactNode;
  badge?: string;
  color: string;
  windowId?: WindowId;
  href?: string;
  isExternal?: boolean;
}

const shortcuts: DesktopShortcut[] = [
  {
    id: 'projects',
    label: 'Projects',
    icon: <Folder className="w-6 h-6 text-[var(--accent-primary)]" />,
    color: 'border-[var(--accent-primary)]/40 bg-[var(--accent-primary)]/10',
    windowId: 'projects',
  },
  {
    id: 'terminal',
    label: 'Terminal',
    icon: <Terminal className="w-6 h-6 text-[var(--accent-secondary)]" />,
    color: 'border-[var(--accent-secondary)]/40 bg-[var(--accent-secondary)]/10',
    windowId: 'terminal',
  },
  {
    id: 'skills',
    label: 'Skills.json',
    icon: <Braces className="w-6 h-6 text-[var(--accent-tertiary)]" />,
    color: 'border-[var(--accent-tertiary)]/40 bg-[var(--accent-tertiary)]/10',
    windowId: 'skills',
  },
  {
    id: 'resume',
    label: 'resume.pdf',
    icon: <FileText className="w-6 h-6 text-[var(--accent-red)]" />,
    badge: 'PDF',
    color: 'border-[var(--accent-red)]/40 bg-[var(--accent-red)]/10',
    windowId: 'resume',
  },
  {
    id: 'contact',
    label: 'Contact.sh',
    icon: <Mail className="w-6 h-6 text-[var(--accent-purple)]" />,
    color: 'border-[var(--accent-purple)]/40 bg-[var(--accent-purple)]/10',
    windowId: 'contact',
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    icon: <FaLinkedin className="w-6 h-6 text-[#0077b5]" />,
    color: 'border-[#0077b5]/40 bg-[#0077b5]/15',
    href: resumeData.linkedin,
    isExternal: true,
  },
  {
    id: 'github',
    label: 'GitHub',
    icon: <FaGithub className="w-6 h-6 text-[var(--text-primary)]" />,
    color: 'border-[var(--border-primary)] bg-[var(--bg-secondary)]/80',
    href: resumeData.github,
    isExternal: true,
  },
];

export function Desktop() {
  const { windows, openWindow } = useWindowManager();
  const [selectedId, setSelectedId] = useState<string | null>(null);

  return (
    <div
      id="desktop-root"
      className="fixed inset-0 bg-[var(--bg-primary)] overflow-hidden select-none transition-colors duration-250"
      onClick={() => setSelectedId(null)}
    >
      <ParticlesBackground />
      
      <Menubar />
      
      {/* Desktop Shortcuts Column */}
      <div className="absolute top-12 left-6 flex flex-col gap-3 w-24 pointer-events-auto z-10">
        {shortcuts.map((shortcut) => {
          const isSelected = selectedId === shortcut.id;

          const content = (
            <>
              <div
                className={`relative w-12 h-12 rounded-xl flex items-center justify-center border shadow-lg transition-transform group-hover:scale-105 ${shortcut.color}`}
              >
                {shortcut.icon}
                {shortcut.badge && (
                  <span className="absolute -top-1 -right-1 text-[8px] font-bold bg-[var(--accent-red)] text-white px-1 rounded shadow">
                    {shortcut.badge}
                  </span>
                )}
                {shortcut.isExternal && (
                  <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-[var(--bg-secondary)] border border-[var(--border-subtle)] flex items-center justify-center text-[var(--text-primary)] shadow-sm">
                    <ArrowUpRight size={9} strokeWidth={2.5} />
                  </div>
                )}
              </div>
              <span className="text-[11px] text-[var(--text-primary)] font-mono px-1.5 py-0.5 rounded leading-tight text-center drop-shadow truncate max-w-full">
                {shortcut.label}
              </span>
            </>
          );

          if (shortcut.href) {
            return (
              <a
                key={shortcut.id}
                href={shortcut.href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedId(shortcut.id);
                }}
                className={`flex flex-col items-center gap-1.5 p-2 rounded-xl transition-all group cursor-pointer ${
                  isSelected
                    ? 'bg-[var(--bg-hover)] ring-1 ring-[var(--accent-primary)]'
                    : 'hover:bg-[var(--bg-hover)]'
                }`}
                title={`Open ${shortcut.label}`}
              >
                {content}
              </a>
            );
          }

          return (
            <button
              key={shortcut.id}
              onClick={(e) => {
                e.stopPropagation();
                setSelectedId(shortcut.id);
                if (shortcut.windowId) {
                  openWindow(shortcut.windowId);
                }
              }}
              className={`flex flex-col items-center gap-1.5 p-2 rounded-xl transition-all group ${
                isSelected
                  ? 'bg-[var(--bg-hover)] ring-1 ring-[var(--accent-primary)]'
                  : 'hover:bg-[var(--bg-hover)]'
              }`}
              title={shortcut.label}
            >
              {content}
            </button>
          );
        })}
      </div>

      {/* Windows Layer - Rendered directly on the desktop coordinate space */}
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

      <Dock />
    </div>
  );
}
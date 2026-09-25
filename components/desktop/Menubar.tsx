'use client';

import { useState, useEffect, useRef, useSyncExternalStore } from 'react';
import { format } from 'date-fns';
import { Terminal, Wifi, Battery, Volume2, VolumeX, Sparkles, ExternalLink, Download } from 'lucide-react';
import { useWindowManager } from '@/context/WindowManagerContext';
import { FaGithub, FaLinkedin } from 'react-icons/fa6';

function subscribeTime(callback: () => void) {
  const id = setInterval(callback, 1000);
  return () => clearInterval(id);
}

function getTimeSnapshot() {
  return Math.floor(Date.now() / 1000);
}

function getServerTimeSnapshot() {
  return null;
}

export function Menubar() {
  const timestamp = useSyncExternalStore(subscribeTime, getTimeSnapshot, getServerTimeSnapshot);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { soundEnabled, toggleSound, openWindow } = useWindowManager();

  const currentTime = timestamp ? new Date(timestamp * 1000) : null;

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 h-8 bg-[#090d14]/80 backdrop-blur-xl z-[100] flex items-center justify-between px-3 text-xs font-mono select-none border-b border-white/[0.06]">
      {/* Left Menu */}
      <div className="flex items-center gap-4 relative" ref={menuRef}>
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className={`flex items-center gap-2 px-2 py-1 rounded transition-colors ${
            menuOpen ? 'bg-white/10 text-white' : 'text-[#e6edf3] hover:bg-white/5'
          }`}
        >
          <Terminal size={14} className="text-[#00ff41]" />
          <span className="font-semibold">SaurabhOS</span>
          <span className="text-[10px] text-[#00d2ff] bg-[#00d2ff]/10 px-1 rounded border border-[#00d2ff]/20">
            v1.0
          </span>
        </button>

        {/* Dropdown Menu */}
        {menuOpen && (
          <div className="absolute top-8 left-0 w-64 bg-[#161b22]/95 backdrop-blur-2xl border border-white/10 rounded-xl p-2 shadow-2xl z-50 text-xs text-[#e6edf3] space-y-1">
            <div className="px-2 py-1.5 border-b border-white/[0.08] mb-1">
              <div className="font-semibold text-white flex items-center gap-1.5">
                <Sparkles size={12} className="text-[#00ff41]" /> Saurabh Kumar
              </div>
              <div className="text-[11px] text-[#8b949e]">Full-Stack & GenAI Developer</div>
            </div>

            <button
              onClick={() => {
                openWindow('projects');
                setMenuOpen(false);
              }}
              className="w-full text-left px-2 py-1.5 rounded hover:bg-white/10 flex items-center justify-between"
            >
              <span>Explore Projects</span>
              <span className="text-[10px] text-[#8b949e]">⌘P</span>
            </button>

            <button
              onClick={() => {
                openWindow('terminal');
                setMenuOpen(false);
              }}
              className="w-full text-left px-2 py-1.5 rounded hover:bg-white/10 flex items-center justify-between"
            >
              <span>Open Terminal</span>
              <span className="text-[10px] text-[#8b949e]">⌘T</span>
            </button>

            <button
              onClick={() => {
                openWindow('resume');
                setMenuOpen(false);
              }}
              className="w-full text-left px-2 py-1.5 rounded hover:bg-white/10 flex items-center justify-between"
            >
              <span>View Resume</span>
              <span className="text-[10px] text-[#8b949e]">⌘R</span>
            </button>

            <div className="border-t border-white/[0.08] my-1" />

            <a
              href="/resume.pdf"
              download="Saurabh_Kumar_Resume.pdf"
              className="w-full text-left px-2 py-1.5 rounded hover:bg-white/10 flex items-center gap-2 text-[#00d2ff]"
            >
              <Download size={13} />
              <span>Download PDF Resume</span>
            </a>

            <a
              href="https://github.com/Saurabh-singhx"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full text-left px-2 py-1.5 rounded hover:bg-white/10 flex items-center justify-between text-[#8b949e] hover:text-white"
            >
              <span className="flex items-center gap-2">
                <FaGithub size={13} /> GitHub Profile
              </span>
              <ExternalLink size={11} />
            </a>

            <a
              href="https://www.linkedin.com/in/saurabh-kumar0/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full text-left px-2 py-1.5 rounded hover:bg-white/10 flex items-center justify-between text-[#8b949e] hover:text-white"
            >
              <span className="flex items-center gap-2">
                <FaLinkedin size={13} /> LinkedIn Profile
              </span>
              <ExternalLink size={11} />
            </a>
          </div>
        )}

        <div className="hidden sm:flex items-center gap-3 text-[#8b949e] text-[11px]">
          <button onClick={() => openWindow('projects')} className="hover:text-white transition-colors">
            Projects
          </button>
          <button onClick={() => openWindow('skills')} className="hover:text-white transition-colors">
            Skills
          </button>
          <button onClick={() => openWindow('resume')} className="hover:text-white transition-colors">
            Resume
          </button>
          <button onClick={() => openWindow('contact')} className="hover:text-white transition-colors">
            Contact
          </button>
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-3 text-[#e6edf3]">
        <button
          onClick={toggleSound}
          title={soundEnabled ? 'Mute audio feedback' : 'Enable audio feedback'}
          className="p-1 rounded hover:bg-white/10 transition-colors text-[#8b949e] hover:text-[#00d2ff]"
        >
          {soundEnabled ? <Volume2 size={14} className="text-[#00ff41]" /> : <VolumeX size={14} />}
        </button>

        <div className="flex items-center gap-1.5 text-[#8b949e]">
          <Wifi size={13} className="text-[#00ff41]" />
          <span className="text-[10px] hidden md:inline">Online</span>
        </div>

        <div className="flex items-center gap-1 text-[#8b949e]">
          <Battery size={13} className="text-[#00ff41]" />
          <span className="text-[10px]">100%</span>
        </div>

        {currentTime && (
          <div className="flex items-center gap-2 border-l border-white/10 pl-3">
            <span className="text-[#8b949e] hidden sm:inline">{format(currentTime, 'EEE MMM d')}</span>
            <span className="tabular-nums font-semibold text-[#e6edf3]">{format(currentTime, 'HH:mm:ss')}</span>
          </div>
        )}
      </div>
    </div>
  );
}
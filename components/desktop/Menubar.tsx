'use client';

import { useState, useEffect, useRef, useSyncExternalStore } from 'react';
import { format } from 'date-fns';
import { Terminal, Wifi, Battery, Volume2, VolumeX, Sparkles, ExternalLink, Download, Palette, Check } from 'lucide-react';
import { useWindowManager } from '@/context/WindowManagerContext';
import { useTheme } from '@/context/ThemeContext';
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
  const [themeMenuOpen, setThemeMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const themeRef = useRef<HTMLDivElement>(null);
  const { soundEnabled, toggleSound, openWindow } = useWindowManager();
  const { theme, setTheme, themes, currentTheme } = useTheme();

  const currentTime = timestamp ? new Date(timestamp * 1000) : null;

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
      if (themeRef.current && !themeRef.current.contains(e.target as Node)) {
        setThemeMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 h-8 bg-[var(--bg-surface)]/85 backdrop-blur-xl z-[100] flex items-center justify-between px-3 text-xs font-mono select-none border-b border-[var(--border-subtle)] transition-colors duration-200">
      {/* Left Menu */}
      <div className="flex items-center gap-4 relative" ref={menuRef}>
        <button
          onClick={() => {
            setMenuOpen(!menuOpen);
            setThemeMenuOpen(false);
          }}
          className={`flex items-center gap-2 px-2 py-1 rounded transition-colors ${
            menuOpen ? 'bg-[var(--bg-hover)] text-white' : 'text-[var(--text-primary)] hover:bg-[var(--bg-hover)]'
          }`}
        >
          <Terminal size={14} className="text-[var(--accent-secondary)]" />
          <span className="font-semibold">SaurabhOS</span>
          <span className="text-[10px] text-[var(--accent-primary)] bg-[var(--accent-primary)]/10 px-1 rounded border border-[var(--accent-primary)]/20">
            v1.0
          </span>
        </button>

        {/* Dropdown Menu */}
        {menuOpen && (
          <div className="absolute top-8 left-0 w-64 bg-[var(--bg-secondary)]/95 backdrop-blur-2xl border border-[var(--border-primary)] rounded-xl p-2 shadow-2xl z-50 text-xs text-[var(--text-primary)] space-y-1">
            <div className="px-2 py-1.5 border-b border-[var(--border-subtle)] mb-1">
              <div className="font-semibold text-white flex items-center gap-1.5">
                <Sparkles size={12} className="text-[var(--accent-secondary)]" /> Saurabh Kumar
              </div>
              <div className="text-[11px] text-[var(--text-secondary)]">Full-Stack & GenAI Developer</div>
            </div>

            <button
              onClick={() => {
                openWindow('projects');
                setMenuOpen(false);
              }}
              className="w-full text-left px-2 py-1.5 rounded hover:bg-[var(--bg-hover)] flex items-center justify-between"
            >
              <span>Explore Projects</span>
              <span className="text-[10px] text-[var(--text-secondary)]">⌘P</span>
            </button>

            <button
              onClick={() => {
                openWindow('terminal');
                setMenuOpen(false);
              }}
              className="w-full text-left px-2 py-1.5 rounded hover:bg-[var(--bg-hover)] flex items-center justify-between"
            >
              <span>Open Terminal</span>
              <span className="text-[10px] text-[var(--text-secondary)]">⌘T</span>
            </button>

            <button
              onClick={() => {
                openWindow('resume');
                setMenuOpen(false);
              }}
              className="w-full text-left px-2 py-1.5 rounded hover:bg-[var(--bg-hover)] flex items-center justify-between"
            >
              <span>View Resume</span>
              <span className="text-[10px] text-[var(--text-secondary)]">⌘R</span>
            </button>

            <div className="border-t border-[var(--border-subtle)] my-1" />

            <a
              href="/resume.pdf"
              download="Saurabh_Kumar_Resume.pdf"
              className="w-full text-left px-2 py-1.5 rounded hover:bg-[var(--bg-hover)] flex items-center gap-2 text-[var(--accent-primary)]"
            >
              <Download size={13} />
              <span>Download PDF Resume</span>
            </a>

            <a
              href="https://github.com/Saurabh-singhx"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full text-left px-2 py-1.5 rounded hover:bg-[var(--bg-hover)] flex items-center justify-between text-[var(--text-secondary)] hover:text-white"
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
              className="w-full text-left px-2 py-1.5 rounded hover:bg-[var(--bg-hover)] flex items-center justify-between text-[var(--text-secondary)] hover:text-white"
            >
              <span className="flex items-center gap-2">
                <FaLinkedin size={13} /> LinkedIn Profile
              </span>
              <ExternalLink size={11} />
            </a>
          </div>
        )}

        <div className="hidden sm:flex items-center gap-3 text-[var(--text-secondary)] text-[11px]">
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
      <div className="flex items-center gap-3 text-[var(--text-primary)]">
        {/* Theme Picker Dropdown */}
        <div className="relative" ref={themeRef}>
          <button
            onClick={() => {
              setThemeMenuOpen(!themeMenuOpen);
              setMenuOpen(false);
            }}
            title={`Active Theme: ${currentTheme.name}`}
            className="flex items-center gap-1.5 px-2 py-1 rounded hover:bg-[var(--bg-hover)] transition-all text-[var(--text-secondary)] hover:text-[var(--accent-primary)] group"
          >
            <Palette size={13} className="text-[var(--accent-primary)] group-hover:rotate-45 transition-transform duration-200" />
            <span className="text-[11px] hidden sm:inline">{currentTheme.name}</span>
            <div
              className="w-2.5 h-2.5 rounded-full border border-white/20"
              style={{ backgroundColor: currentTheme.preview.accent }}
            />
          </button>

          {themeMenuOpen && (
            <div className="absolute top-8 right-0 w-64 bg-[var(--bg-secondary)]/95 backdrop-blur-2xl border border-[var(--border-primary)] rounded-xl p-2 shadow-2xl z-50 text-xs text-[var(--text-primary)] space-y-1">
              <div className="px-2.5 py-1.5 border-b border-[var(--border-subtle)] text-[10px] uppercase tracking-wider text-[var(--text-tertiary)] font-bold flex items-center justify-between">
                <span>Theme & Font Pairing</span>
              </div>
              {themes.map((t) => {
                const isActive = t.id === theme;
                return (
                  <button
                    key={t.id}
                    onClick={() => {
                      setTheme(t.id);
                      setThemeMenuOpen(false);
                    }}
                    className={`w-full text-left px-2.5 py-2 rounded-lg flex items-center justify-between transition-colors ${
                      isActive
                        ? 'bg-[var(--accent-primary)]/15 text-white border border-[var(--accent-primary)]/30'
                        : 'hover:bg-[var(--bg-hover)] text-[var(--text-secondary)]'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="flex items-center gap-1 shrink-0">
                        <div
                          className="w-3.5 h-3.5 rounded-full border border-white/20 shadow-sm"
                          style={{ backgroundColor: t.preview.bg }}
                        />
                        <div
                          className="w-2.5 h-2.5 rounded-full -ml-2 border border-white/20 shadow-sm"
                          style={{ backgroundColor: t.preview.accent }}
                        />
                      </div>
                      <div>
                        <div 
                          className="font-bold text-white text-[12px] tracking-wide"
                          style={{ fontFamily: t.fontSansVar }}
                        >
                          {t.name}
                        </div>
                        <div className="text-[10px] text-[var(--text-tertiary)] font-mono">
                          {t.label}
                        </div>
                      </div>
                    </div>
                    {isActive && <Check size={14} className="text-[var(--accent-primary)] shrink-0 ml-1.5" />}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        <button
          onClick={toggleSound}
          title={soundEnabled ? 'Mute audio feedback' : 'Enable audio feedback'}
          className="p-1 rounded hover:bg-[var(--bg-hover)] transition-colors text-[var(--text-secondary)] hover:text-[var(--accent-primary)]"
        >
          {soundEnabled ? <Volume2 size={14} className="text-[var(--accent-secondary)]" /> : <VolumeX size={14} />}
        </button>

        <div className="flex items-center gap-1.5 text-[var(--text-secondary)]">
          <Wifi size={13} className="text-[var(--accent-secondary)]" />
          <span className="text-[10px] hidden md:inline">Online</span>
        </div>

        <div className="flex items-center gap-1 text-[var(--text-secondary)]">
          <Battery size={13} className="text-[var(--accent-secondary)]" />
          <span className="text-[10px]">100%</span>
        </div>

        {currentTime && (
          <div className="flex items-center gap-2 border-l border-[var(--border-subtle)] pl-3">
            <span className="text-[var(--text-secondary)] hidden sm:inline">{format(currentTime, 'EEE MMM d')}</span>
            <span className="tabular-nums font-semibold text-[var(--text-primary)]">{format(currentTime, 'HH:mm:ss')}</span>
          </div>
        )}
      </div>
    </div>
  );
}
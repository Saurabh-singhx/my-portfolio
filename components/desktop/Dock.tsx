'use client';

import { motion } from 'framer-motion';
import { Terminal, FolderOpen, Braces, Mail, FileText } from 'lucide-react';
import { useWindowManager } from '@/context/WindowManagerContext';
import { WindowId } from '@/lib/types';

interface DockItemDef {
  id: WindowId;
  icon: React.ReactNode;
  label: string;
  color: string;
}

const dockItems: DockItemDef[] = [
  { id: 'projects', icon: <FolderOpen size={24} />, label: 'Projects', color: 'text-[var(--accent-primary)]' },
  { id: 'terminal', icon: <Terminal size={24} />, label: 'Terminal', color: 'text-[var(--accent-secondary)]' },
  { id: 'skills', icon: <Braces size={24} />, label: 'Skills', color: 'text-[var(--accent-tertiary)]' },
  { id: 'resume', icon: <FileText size={24} />, label: 'Resume', color: 'text-[var(--accent-red)]' },
  { id: 'contact', icon: <Mail size={24} />, label: 'Contact', color: 'text-[var(--accent-purple)]' },
];

export function Dock() {
  const { windows, activeWindow, openWindow, minimizeWindow, bringToFront } = useWindowManager();

  const handleDockClick = (id: WindowId) => {
    const win = windows[id];
    if (!win.isOpen) {
      openWindow(id);
    } else if (win.isMinimized) {
      bringToFront(id);
    } else if (activeWindow === id) {
      minimizeWindow(id);
    } else {
      bringToFront(id);
    }
  };

  return (
    <div className="fixed bottom-3 left-1/2 -translate-x-1/2 z-[90]">
      <div className="flex items-end gap-2 px-3 py-2.5 bg-[var(--bg-surface)]/80 backdrop-blur-2xl rounded-2xl border border-[var(--border-subtle)] shadow-[0_10px_35px_rgba(0,0,0,0.6)] transition-colors duration-200">
        {dockItems.map((item) => {
          const win = windows[item.id];
          const isOpen = win.isOpen;
          const isActive = isOpen && !win.isMinimized && activeWindow === item.id;

          return (
            <DockIcon
              key={item.id}
              icon={item.icon}
              label={item.label}
              colorClass={item.color}
              isOpen={isOpen}
              isActive={isActive}
              onClick={() => handleDockClick(item.id)}
            />
          );
        })}
      </div>
    </div>
  );
}

function DockIcon({
  icon,
  label,
  colorClass,
  isOpen,
  isActive,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  colorClass: string;
  isOpen: boolean;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <motion.button
      onClick={onClick}
      className="relative flex flex-col items-center group outline-none"
      whileHover={{ scale: 1.25, y: -6 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 450, damping: 25 }}
    >
      <div
        className={`w-12 h-12 flex items-center justify-center rounded-xl transition-all ${colorClass} ${
          isActive
            ? 'bg-[var(--bg-hover)] shadow-[0_0_15px_rgba(122,162,247,0.35)] ring-1 ring-[var(--accent-primary)]/40'
            : 'hover:bg-[var(--bg-hover)]'
        }`}
      >
        {icon}
      </div>

      {/* Label tooltip */}
      <div className="absolute -top-9 opacity-0 group-hover:opacity-100 transition-opacity bg-[var(--bg-secondary)] px-2 py-0.5 rounded-md text-[11px] font-mono text-[var(--text-primary)] whitespace-nowrap pointer-events-none border border-[var(--border-primary)] shadow-lg">
        {label}
      </div>

      {/* Open indicator dot */}
      {isOpen && (
        <div
          className={`absolute -bottom-1 w-1.5 h-1.5 rounded-full transition-all ${
            isActive ? 'bg-[var(--accent-primary)] scale-125' : 'bg-[var(--text-secondary)]/50'
          }`}
        />
      )}
    </motion.button>
  );
}
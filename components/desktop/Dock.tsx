'use client';

import { motion } from 'framer-motion';
import { Terminal, FolderOpen, Braces, Mail, FileText } from 'lucide-react';
import { useWindowManager } from '@/context/WindowManagerContext';
import { WindowId } from '@/lib/types';

const dockItems: { id: WindowId; icon: React.ReactNode; label: string }[] = [
  { id: 'terminal', icon: <Terminal size={24} />, label: 'Terminal' },
  { id: 'projects', icon: <FolderOpen size={24} />, label: 'Projects' },
  { id: 'skills', icon: <Braces size={24} />, label: 'Skills' },
  { id: 'contact', icon: <Mail size={24} />, label: 'Contact' },
  { id: 'resume', icon: <FileText size={24} />, label: 'Resume' },
];

export function Dock() {
  const { windows, openWindow } = useWindowManager();

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[90]">
      <div className="flex items-end gap-2 px-4 py-3 bg-white/[0.08] backdrop-blur-xl rounded-[18px] border border-white/10">
        {dockItems.map((item) => {
          const isOpen = windows[item.id].isOpen && !windows[item.id].isMinimized;

          return (
            <DockIcon
              key={item.id}
              icon={item.icon}
              label={item.label}
              isOpen={isOpen}
              onClick={() => openWindow(item.id)}
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
  isOpen, 
  onClick 
}: { 
  icon: React.ReactNode; 
  label: string; 
  isOpen: boolean;
  onClick: () => void;
}) {
  return (
    <motion.button
      onClick={onClick}
      className="relative flex flex-col items-center group"
      whileHover={{ scale: 1.5, y: -8 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
    >
      <div className="w-[52px] h-[52px] flex items-center justify-center text-[#e6edf3] hover:text-white transition-colors rounded-xl hover:bg-white/10">
        {icon}
      </div>

      {/* Label tooltip */}
      <div className="absolute -top-10 opacity-0 group-hover:opacity-100 transition-opacity bg-[#1c2333] px-2 py-1 rounded text-xs font-mono text-[#e6edf3] whitespace-nowrap pointer-events-none border border-white/10">
        {label}
      </div>

      {/* Open indicator dot */}
      {isOpen && (
        <div className="absolute -bottom-1 w-1 h-1 bg-white rounded-full" />
      )}
    </motion.button>
  );
}

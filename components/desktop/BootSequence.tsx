'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface BootSequenceProps {
  onComplete: () => void;
  onSkip: () => void;
}

const bootLines = [
  'SaurabhOS v1.0 LTS (x86_64-pc-portfolio) — Booting kernel...',
  '',
  '[  OK  ] Initializing system clock & ACPI tables...',
  '[  OK  ] Mounting filesystem: /home/saurabh',
  '[  OK  ] Loading AI agent subsystems: LangGraph 0.2 & Gemini 3.1...',
  '[  OK  ] Connecting pgvector vector database & cosine similarity index...',
  '[  OK  ] Registering AWS microservices (EC2, S3 presigned URLs, RDS)...',
  '[  OK  ] Loading Redis cache & BullMQ asynchronous workers...',
  '[  OK  ] Verifying Sonix Music & FinAssist production registries...',
  '[  OK  ] GitHub sync established (github.com/Saurabh-singhx)...',
  '[  OK  ] All services active. High availability confirmed.',
  '',
  'Welcome to Saurabh Kumar\'s Interactive Portfolio.',
  'Starting desktop environment...',
];

export function BootSequence({ onComplete, onSkip }: BootSequenceProps) {
  const [visibleLines, setVisibleLines] = useState<number>(0);
  const [progress, setProgress] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  // Keyboard shortcut to skip immediately (Escape, Space, Enter)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        onSkip();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onSkip]);

  useEffect(() => {
    const lineInterval = setInterval(() => {
      setVisibleLines((prev) => {
        if (prev >= bootLines.length) {
          clearInterval(lineInterval);
          return prev;
        }
        return prev + 1;
      });
    }, 180);

    return () => clearInterval(lineInterval);
  }, []);

  useEffect(() => {
    if (visibleLines >= bootLines.length) {
      const progressInterval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(progressInterval);
            setTimeout(onComplete, 400);
            return 100;
          }
          return prev + 4;
        });
      }, 25);
      return () => clearInterval(progressInterval);
    }
  }, [visibleLines, onComplete]);

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 450);
    return () => clearInterval(cursorInterval);
  }, []);

  return (
    <motion.div
      ref={containerRef}
      className="fixed inset-0 bg-[#070a0e] z-50 flex flex-col items-center justify-center font-mono text-[#00ff41] p-6 select-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="w-full max-w-2xl bg-[#0b0e14]/80 border border-white/10 rounded-2xl p-6 shadow-2xl backdrop-blur-xl">
        <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4 text-xs text-[#8b949e]">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#00ff41] animate-ping" />
            SaurabhOS BIOS POST 2026
          </span>
          <span className="text-[11px]">Press ESC or SPACE to skip</span>
        </div>

        <div className="min-h-[280px] space-y-1">
          {bootLines.slice(0, visibleLines).map((line, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -4 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-xs md:text-sm leading-relaxed"
            >
              {line}
            </motion.div>
          ))}

          {visibleLines < bootLines.length && (
            <span
              className={`inline-block w-2.5 h-4 bg-[#00ff41] ml-1 ${
                showCursor ? 'opacity-100' : 'opacity-0'
              }`}
            />
          )}

          {visibleLines >= bootLines.length && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-6 pt-3 border-t border-white/10"
            >
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="text-[#8b949e]">Loading Graphical Desktop Manager</span>
                <span className="text-[#00d2ff] font-bold">{progress}%</span>
              </div>
              <div className="w-full h-2 bg-[#1c2333] rounded-full overflow-hidden border border-white/10">
                <motion.div
                  className="h-full bg-gradient-to-r from-[#00d2ff] to-[#00ff41]"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </motion.div>
          )}
        </div>
      </div>

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        onClick={onSkip}
        className="mt-6 px-4 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-[#8b949e] hover:text-white text-xs font-mono transition-all flex items-center gap-2"
      >
        <span>Skip boot sequence</span>
        <span className="text-[10px] bg-white/10 px-1.5 py-0.5 rounded text-white">ESC</span>
      </motion.button>
    </motion.div>
  );
}
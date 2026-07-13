'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface BootSequenceProps {
  onComplete: () => void;
  onSkip: () => void;
}

const bootLines = [
  'SaurabhOS v1.0 LTS — Booting...',
  '',
  '[  OK  ] Loading kernel modules...',
  '[  OK  ] Starting network services...',
  '[  OK  ] Mounting filesystem: /home/saurabh',
  '[  OK  ] Initializing AI subsystems... (LangGraph, Gemini 3.1)',
  '[  OK  ] Loading project registry... 3 entries found',
  '[  OK  ] Establishing GitHub sync...',
  '[  OK  ] All systems operational.',
  '',
  "Welcome, Recruiter. Type 'help' to explore.",
  '',
  'Starting desktop environment...',
];

export function BootSequence({ onComplete, onSkip }: BootSequenceProps) {
  const [visibleLines, setVisibleLines] = useState<number>(0);
  const [progress, setProgress] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const lineInterval = setInterval(() => {
      setVisibleLines((prev) => {
        if (prev >= bootLines.length) {
          clearInterval(lineInterval);
          return prev;
        }
        return prev + 1;
      });
    }, 280);

    return () => clearInterval(lineInterval);
  }, []);

  useEffect(() => {
    if (visibleLines >= bootLines.length) {
      const progressInterval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(progressInterval);
            setTimeout(() => {
              setIsExiting(true);
              setTimeout(onComplete, 800);
            }, 300);
            return 100;
          }
          return prev + 2;
        });
      }, 25);
      return () => clearInterval(progressInterval);
    }
  }, [visibleLines, onComplete]);

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);
    return () => clearInterval(cursorInterval);
  }, []);

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          className="fixed inset-0 bg-[#0a0a0a] z-50 flex flex-col items-center justify-center font-mono text-[#00ff41] p-8"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="w-full max-w-2xl">
            {bootLines.slice(0, visibleLines).map((line, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-sm md:text-base leading-relaxed"
              >
                {line}
              </motion.div>
            ))}

            {visibleLines >= bootLines.length && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-4"
              >
                <div className="flex items-center gap-2">
                  <span className="text-sm font-mono">████████████████████</span>
                  <span className="text-sm font-mono">{progress}%</span>
                </div>
                <div className="w-full h-2 bg-[#1c2333] rounded mt-2 overflow-hidden">
                  <motion.div
                    className="h-full bg-[#00ff41]"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.05 }}
                  />
                </div>
              </motion.div>
            )}

            {visibleLines < bootLines.length && (
              <span className={`inline-block w-3 h-5 bg-[#00ff41] ml-1 ${showCursor ? 'opacity-100' : 'opacity-0'}`} />
            )}
          </div>

          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            onClick={onSkip}
            className="absolute bottom-8 right-8 text-[#8b949e] hover:text-[#e6edf3] text-sm font-mono transition-colors cursor-pointer"
          >
            Skip →
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useWindowManager } from '@/context/WindowManagerContext';
import { handleCommand } from '@/lib/commands';

interface TerminalLine {
  type: 'input' | 'output';
  content: string;
}

export function TerminalWindow() {
  const [lines, setLines] = useState<TerminalLine[]>([]);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { openWindow } = useWindowManager();

  const processCommand = useCallback((cmd: string) => {
    const trimmed = cmd.trim();
    if (!trimmed) return;

    setHistory((prev) => [...prev, trimmed]);
    setHistoryIndex(-1);

    const result = handleCommand(trimmed);

    setLines((prev) => [
      ...prev,
      { type: 'input', content: `saurabh@SaurabhOS:~$ ${trimmed}` },
    ]);

    if (typeof result.output === 'string' && result.output === '__CLEAR__') {
      setLines([]);
    } else {
      // Handle special commands that open windows
      if (trimmed === 'open projects') {
        setTimeout(() => openWindow('projects'), 100);
      } else if (trimmed === 'open contact') {
        setTimeout(() => openWindow('contact'), 100);
      } else if (trimmed === 'open resume') {
        setTimeout(() => openWindow('resume'), 100);
      }

      setLines((prev) => [
        ...prev,
        { type: 'output', content: typeof result.output === 'string' ? result.output : JSON.stringify(result.output) },
      ]);
    }
  }, [openWindow]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    processCommand(input);
    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHistoryIndex((prev) => {
        const newIndex = prev === -1 ? history.length - 1 : Math.max(0, prev - 1);
        setInput(history[newIndex] || '');
        return newIndex;
      });
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHistoryIndex((prev) => {
        const newIndex = prev === -1 ? -1 : Math.min(history.length - 1, prev + 1);
        if (newIndex === history.length - 1) {
          setInput('');
          return -1;
        }
        setInput(history[newIndex + 1] || '');
        return newIndex + 1;
      });
    }
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [lines]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div 
      className="h-full bg-[#0a0a0a] p-4 font-mono text-sm flex flex-col"
      onClick={() => inputRef.current?.focus()}
    >
      <div ref={scrollRef} className="flex-1 overflow-auto space-y-1">
        {lines.map((line, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={line.type === 'input' ? 'text-[#00ff41]' : 'text-[#e6edf3] whitespace-pre-wrap'}
          >
            {line.content}
          </motion.div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="flex items-center gap-2 mt-2">
        <span className="text-[#00ff41] whitespace-nowrap">saurabh@SaurabhOS:~$</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 bg-transparent text-[#00ff41] outline-none font-mono"
          autoFocus
          spellCheck={false}
        />
        <span className="w-2.5 h-4 bg-[#00ff41] cursor-blink" />
      </form>
    </div>
  );
}

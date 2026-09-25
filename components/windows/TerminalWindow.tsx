'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useWindowManager } from '@/context/WindowManagerContext';
import { handleCommand } from '@/lib/commands';
import { Sparkles } from 'lucide-react';

interface TerminalLine {
  type: 'input' | 'output';
  content: string;
}

const suggestedCommands = ['help', 'projects', 'skills', 'experience', 'neofetch', 'resume', 'clear'];

export function TerminalWindow() {
  const [lines, setLines] = useState<TerminalLine[]>([
    {
      type: 'output',
      content: `Welcome to SaurabhOS v1.0 Shell (x86_64-pc-portfolio)\nType 'help' to inspect available system commands, or click any suggestion below.`,
    },
  ]);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { openWindow } = useWindowManager();

  const processCommand = useCallback(
    (cmd: string) => {
      const trimmed = cmd.trim();
      if (!trimmed) return;

      setHistory((prev) => [...prev, trimmed]);
      setHistoryIndex(-1);

      const result = handleCommand(trimmed);

      setLines((prev) => [
        ...prev,
        { type: 'input', content: `saurabh@SaurabhOS:~$ ${trimmed}` },
      ]);

      if (result.output === '__CLEAR__') {
        setLines([]);
      } else {
        const lower = trimmed.toLowerCase();
        if (lower === 'open projects') openWindow('projects');
        else if (lower === 'open contact') openWindow('contact');
        else if (lower === 'open resume') openWindow('resume');
        else if (lower === 'open skills') openWindow('skills');
        else if (lower === 'open terminal') openWindow('terminal');

        setLines((prev) => [
          ...prev,
          { type: 'output', content: result.output },
        ]);
      }
    },
    [openWindow]
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    processCommand(input);
    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (history.length === 0) return;
      const nextIndex = historyIndex === -1 ? history.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(nextIndex);
      setInput(history[nextIndex]);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex === -1) return;
      const nextIndex = historyIndex + 1;
      if (nextIndex >= history.length) {
        setHistoryIndex(-1);
        setInput('');
      } else {
        setHistoryIndex(nextIndex);
        setInput(history[nextIndex]);
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const current = input.toLowerCase().trim();
      if (!current) return;
      const match = suggestedCommands.find((c) => c.startsWith(current));
      if (match) {
        setInput(match);
      }
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
      className="h-full bg-[#070a0e] p-4 font-mono text-xs md:text-sm flex flex-col select-text"
      onClick={() => inputRef.current?.focus()}
    >
      {/* Quick chips */}
      <div className="flex flex-wrap items-center gap-1.5 pb-3 border-b border-white/[0.08] mb-3 select-none">
        <span className="text-[#8b949e] text-[11px] flex items-center gap-1 mr-1">
          <Sparkles size={11} className="text-[#00d2ff]" /> quick:
        </span>
        {suggestedCommands.map((c) => (
          <button
            key={c}
            onClick={() => processCommand(c)}
            className="px-2 py-0.5 rounded bg-white/5 hover:bg-[#00d2ff]/20 text-[#8b949e] hover:text-[#00d2ff] border border-white/5 transition-colors text-[11px]"
          >
            {c}
          </button>
        ))}
      </div>

      {/* Terminal Output */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto space-y-1.5 pr-2">
        {lines.map((line, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.1 }}
            className={
              line.type === 'input'
                ? 'text-[#00ff41] font-bold'
                : 'text-[#c9d1d9] whitespace-pre-wrap leading-relaxed'
            }
          >
            {line.content}
          </motion.div>
        ))}
      </div>

      {/* Input Prompt */}
      <form onSubmit={handleSubmit} className="flex items-center gap-2 mt-3 pt-2 border-t border-white/[0.06]">
        <span className="text-[#00ff41] whitespace-nowrap font-bold select-none">
          saurabh@SaurabhOS:~$
        </span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 bg-transparent text-[#e6edf3] outline-none font-mono text-xs md:text-sm"
          autoFocus
          spellCheck={false}
          autoComplete="off"
        />
        <span className="w-2 h-4 bg-[#00ff41] animate-pulse" />
      </form>
    </div>
  );
}
'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useWindowManager } from '@/context/WindowManagerContext';
import { useTheme } from '@/context/ThemeContext';
import { handleCommand } from '@/lib/commands';
import { Sparkles } from 'lucide-react';

interface TerminalLine {
  type: 'input' | 'output';
  content: string;
}

const suggestedCommands = ['help', 'projects', 'skills', 'experience', 'theme', 'neofetch', 'resume', 'clear'];

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
  const { setTheme, themes, currentTheme } = useTheme();

  const processCommand = useCallback(
    (cmd: string) => {
      const trimmed = cmd.trim();
      if (!trimmed) return;

      setHistory((prev) => [...prev, trimmed]);
      setHistoryIndex(-1);

      const parts = trimmed.split(' ');
      const lower = parts[0].toLowerCase();
      const arg = parts.slice(1).join(' ').toLowerCase().trim();

      // Intercept theme switching in terminal
      if (lower === 'theme') {
        if (!arg) {
          const available = themes.map((t) => `  • ${t.id.padEnd(14)} [${t.name}] — ${t.label}`).join('\n');
          setLines((prev) => [
            ...prev,
            { type: 'input', content: `saurabh@SaurabhOS:~$ ${trimmed}` },
            {
              type: 'output',
              content: `Active Theme: ${currentTheme.name} (${currentTheme.id})\nActive Font:  ${currentTheme.fontSans} (UI) + ${currentTheme.fontMono} (Code)\n\nAvailable themes & fonts:\n${available}\n\nUsage: theme <name> (e.g. 'theme synthwave')`,
            },
          ]);
          return;
        }

        const match = themes.find((t) => t.id === arg || t.name.toLowerCase() === arg);
        if (match) {
          setTheme(match.id);
          setLines((prev) => [
            ...prev,
            { type: 'input', content: `saurabh@SaurabhOS:~$ ${trimmed}` },
            { type: 'output', content: `Switched theme to ${match.name} [Font: ${match.fontSans} + ${match.fontMono}].` },
          ]);
          return;
        } else {
          setLines((prev) => [
            ...prev,
            { type: 'input', content: `saurabh@SaurabhOS:~$ ${trimmed}` },
            {
              type: 'output',
              content: `Theme '${arg}' not found. Available: ${themes.map((t) => t.id).join(', ')}`,
            },
          ]);
          return;
        }
      }

      const result = handleCommand(trimmed);

      setLines((prev) => [
        ...prev,
        { type: 'input', content: `saurabh@SaurabhOS:~$ ${trimmed}` },
      ]);

      if (result.output === '__CLEAR__') {
        setLines([]);
      } else {
        const cmdLower = trimmed.toLowerCase();
        if (cmdLower === 'open projects') openWindow('projects');
        else if (cmdLower === 'open contact') openWindow('contact');
        else if (cmdLower === 'open resume') openWindow('resume');
        else if (cmdLower === 'open skills') openWindow('skills');
        else if (cmdLower === 'open terminal') openWindow('terminal');

        setLines((prev) => [
          ...prev,
          { type: 'output', content: result.output },
        ]);
      }
    },
    [openWindow, setTheme, themes, currentTheme]
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
      className="h-full bg-[var(--bg-primary)] p-4 font-mono text-xs md:text-sm flex flex-col select-text transition-colors duration-200"
      onClick={() => inputRef.current?.focus()}
    >
      {/* Quick chips */}
      <div className="flex flex-wrap items-center gap-1.5 pb-3 border-b border-[var(--border-subtle)] mb-3 select-none">
        <span className="text-[var(--text-secondary)] text-[11px] flex items-center gap-1 mr-1">
          <Sparkles size={11} className="text-[var(--accent-primary)]" /> quick:
        </span>
        {suggestedCommands.map((c) => (
          <button
            key={c}
            onClick={() => processCommand(c)}
            className="px-2 py-0.5 rounded bg-[var(--bg-hover)] hover:bg-[var(--accent-primary)]/20 text-[var(--text-secondary)] hover:text-[var(--accent-primary)] border border-[var(--border-subtle)] transition-colors text-[11px]"
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
                ? 'text-[var(--accent-secondary)] font-bold'
                : 'text-[var(--text-primary)] whitespace-pre-wrap leading-relaxed'
            }
          >
            {line.content}
          </motion.div>
        ))}
      </div>

      {/* Input Prompt */}
      <form onSubmit={handleSubmit} className="flex items-center gap-2 mt-3 pt-2 border-t border-[var(--border-subtle)]">
        <span className="text-[var(--accent-secondary)] whitespace-nowrap font-bold select-none">
          saurabh@SaurabhOS:~$
        </span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 bg-transparent text-[var(--text-primary)] outline-none font-mono text-xs md:text-sm"
          autoFocus
          spellCheck={false}
          autoComplete="off"
        />
        <span className="w-2 h-4 bg-[var(--accent-secondary)] animate-pulse" />
      </form>
    </div>
  );
}
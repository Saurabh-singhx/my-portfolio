'use client';

import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Search, Sparkles, Trophy, CheckCircle } from 'lucide-react';
import { skillCategories, skillBars } from '@/lib/skillsData';

export function SkillsWindow() {
  const shouldReduceMotion = useReducedMotion();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCategories = skillCategories.map((cat) => ({
    ...cat,
    items: cat.items.filter((item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    ),
  })).filter((cat) => cat.items.length > 0);

  return (
    <div className="h-full bg-[#0b0e14] p-6 overflow-y-auto select-text font-mono space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/[0.08] pb-4">
        <div>
          <div className="flex items-center gap-2">
            <Sparkles size={18} className="text-[#00d2ff]" />
            <h2 className="text-lg font-bold text-white">Skills & Architecture Registry</h2>
            <span className="w-2 h-4 bg-[#00d2ff] animate-pulse" />
          </div>
          <p className="text-xs text-[#8b949e] mt-0.5">
            Production experience in GenAI (LangGraph + Gemini 3.1) & Cloud Full-Stack Systems
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative w-full sm:w-60">
          <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[#8b949e]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Filter skills (e.g. RAG, AWS)..."
            className="w-full bg-[#161b22] border border-white/10 rounded-lg pl-8 pr-3 py-1.5 text-xs text-[#e6edf3] placeholder-[#8b949e] outline-none focus:border-[#00d2ff] transition-colors"
          />
        </div>
      </div>

      {/* Highlights / Badges */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="bg-[#141a24] border border-emerald-500/20 rounded-xl p-3 flex items-center gap-3">
          <div className="p-2 rounded-lg bg-emerald-500/10 text-[#00ff41]">
            <Trophy size={18} />
          </div>
          <div>
            <div className="text-xs font-semibold text-emerald-400">LeetCode 350+ DSA Solved</div>
            <div className="text-[11px] text-[#8b949e]">Strong algorithms & data structures foundation</div>
          </div>
        </div>

        <div className="bg-[#141a24] border border-[#00d2ff]/20 rounded-xl p-3 flex items-center gap-3">
          <div className="p-2 rounded-lg bg-[#00d2ff]/10 text-[#00d2ff]">
            <CheckCircle size={18} />
          </div>
          <div>
            <div className="text-xs font-semibold text-[#00d2ff]">AI Atlas Hackathon Distinction</div>
            <div className="text-[11px] text-[#8b949e]">Awarded by Humanity Founders (August 2026)</div>
          </div>
        </div>
      </div>

      {/* Skill Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredCategories.map((category, i) => (
          <motion.div
            key={category.name}
            initial={shouldReduceMotion ? {} : { opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="bg-[#141a24]/80 border border-white/[0.08] hover:border-white/20 transition-all rounded-xl p-4 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3 border-b border-white/[0.06] pb-2">
                <h3 className="text-xs font-bold text-[#00d2ff] uppercase tracking-wide">
                  {category.name}
                </h3>
                <span className="text-[10px] text-[#8b949e] bg-white/5 px-1.5 py-0.5 rounded">
                  {category.items.length}
                </span>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {category.items.map((item) => (
                  <span
                    key={item.name}
                    className="inline-flex items-center gap-1 bg-[#1a2230] hover:bg-[#202b3d] border border-white/5 hover:border-[#00d2ff]/30 px-2 py-1 rounded-md text-xs text-[#e6edf3] transition-colors"
                  >
                    <span>{item.name}</span>
                    {item.level && (
                      <span className="text-[9px] text-[#00ff41] bg-[#00ff41]/10 px-1 rounded">
                        {item.level}
                      </span>
                    )}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Proficiency Progress Bars */}
      <div className="bg-[#141a24]/60 border border-white/[0.08] rounded-xl p-5 space-y-4">
        <div className="text-xs font-bold text-white uppercase tracking-wider flex items-center justify-between">
          <span>Proficiency & Engineering Competencies</span>
          <span className="text-[11px] text-[#8b949e]">Verified via Production Projects</span>
        </div>

        <div className="space-y-3.5">
          {skillBars.map((skill, i) => (
            <motion.div
              key={skill.name}
              initial={shouldReduceMotion ? {} : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 + i * 0.08 }}
            >
              <div className="flex justify-between text-xs text-[#c9d1d9] mb-1.5">
                <span>{skill.name}</span>
                <span className="text-[#00d2ff] font-semibold">{skill.label || `${skill.level}%`}</span>
              </div>
              <div className="h-2 bg-[#0b0e14] rounded-full overflow-hidden border border-white/5">
                <motion.div
                  className="h-full bg-gradient-to-r from-[#00d2ff] to-[#00ff41] rounded-full"
                  initial={shouldReduceMotion ? {} : { width: 0 }}
                  animate={{ width: `${skill.level}%` }}
                  transition={{ delay: 0.3 + i * 0.08, duration: 0.9, ease: 'easeOut' }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

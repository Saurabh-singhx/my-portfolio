'use client';

import { motion } from 'framer-motion';
import { skillCategories, skillBars } from '@/lib/skillsData';
import { useReducedMotion } from 'framer-motion';

export function SkillsWindow() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="h-full bg-[#161b22] p-6 overflow-auto ">
      <div className="flex items-center gap-2 mb-6">
        <h2 className="text-xl font-mono text-[#00d2ff]">Tech Stack</h2>
        <span className="w-2.5 h-4 bg-[#00d2ff] cursor-blink" />
      </div>

      {/* Skill Grid */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        {skillCategories.map((category, i) => (
          <motion.div
            key={category.name}
            initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white/[0.04] border border-white/[0.08] rounded-lg p-4"
          >
            <h3 className="text-sm font-mono text-[#00d2ff] mb-3">{category.name}</h3>
            <div className="flex flex-wrap gap-2">
              {category.items.map((item) => (
                <div
                  key={item.name}
                  className="flex items-center gap-1.5 bg-white/5 px-2 py-1 rounded"
                >
                  <span className="text-xs font-mono text-[#e6edf3]">{item.name}</span>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Skill Bars */}
      <div className="space-y-3">
        {skillBars.map((skill, i) => (
          <motion.div
            key={skill.name}
            initial={shouldReduceMotion ? {} : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 + i * 0.1 }}
          >
            <div className="flex justify-between text-xs font-mono text-[#8b949e] mb-1">
              <span>{skill.name}</span>
              {skill.label && <span>{skill.label}</span>}
            </div>
            <div className="h-2 bg-[#1c2333] rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-[#00ff41] rounded-full"
                initial={shouldReduceMotion ? {} : { width: 0 }}
                animate={{ width: `${skill.level}%` }}
                transition={{ delay: 0.5 + i * 0.1, duration: 1, ease: 'easeOut' }}
              />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

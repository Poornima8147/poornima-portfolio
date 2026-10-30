import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Terminal, Code, Cpu, Database, GitBranch, Sparkles, CheckCircle2, X } from 'lucide-react';
import { SKILLS_LIST } from '../data/portfolioData';
import { SkillItem } from '../types';
import { playCyberSound } from '../utils/audio';

interface SkillsSectionProps {
  isMuted: boolean;
  reducedMotion?: boolean;
}

export const SkillsSection: React.FC<SkillsSectionProps> = ({ isMuted, reducedMotion = false }) => {
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const [selectedSkill, setSelectedSkill] = useState<SkillItem | null>(null);

  const categories = ['All', 'Languages', 'Frontend', 'Databases', 'Version Control'];

  const filteredSkills = activeFilter === 'All'
    ? SKILLS_LIST
    : SKILLS_LIST.filter((s) => s.category === activeFilter);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Languages':
        return <Cpu className="w-4 h-4 text-cyan-400" />;
      case 'Frontend':
        return <Code className="w-4 h-4 text-purple-400" />;
      case 'Databases':
        return <Database className="w-4 h-4 text-teal-400" />;
      case 'Version Control':
        return <GitBranch className="w-4 h-4 text-pink-400" />;
      default:
        return <Terminal className="w-4 h-4 text-cyan-400" />;
    }
  };

  const handleFilterClick = (cat: string) => {
    playCyberSound('click', isMuted);
    setActiveFilter(cat);
  };

  const handleSkillSelect = (skill: SkillItem) => {
    playCyberSound('beep', isMuted);
    setSelectedSkill(skill);
  };

  return (
    <section id="skills" className="py-24 relative z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono-code text-cyan-400 mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
              <span>02. ARSENAL & TOOLING</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-cyber font-bold tracking-tight text-white">
              Technical Skills
            </h2>
            <div className="mt-2 flex items-center gap-2 text-xs text-slate-400 font-mono-code">
              <span>10 Core Technologies</span>
              <span aria-hidden="true">·</span>
              <span>Procedural, Object-Oriented & Modern Web Stack</span>
            </div>
          </div>

          {/* Interactive Filter Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-900/80 rounded-xl border border-slate-800">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleFilterClick(cat)}
                className={`px-3 py-1.5 text-xs font-mono-code rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                  activeFilter === cat
                    ? 'bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {filteredSkills.map((skill) => (
            <div
              key={skill.name}
              onClick={() => handleSkillSelect(skill)}
              className="group relative rounded-xl border border-slate-800 bg-slate-950/60 p-5 hover:border-cyan-500/50 hover:bg-slate-900/80 transition-all duration-300 cursor-pointer flex flex-col justify-between overflow-hidden shadow-sm hover:shadow-[0_0_25px_-5px_rgba(6,182,212,0.25)]"
            >
              {/* Corner accent on hover */}
              <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-transparent group-hover:border-cyan-400 transition-colors" />

              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 group-hover:border-cyan-500/30 transition-colors">
                    {getCategoryIcon(skill.category)}
                  </div>
                  <span className="text-[11px] font-mono-code text-slate-400">
                    {skill.category}
                  </span>
                </div>

                <h3 className="font-cyber font-bold text-lg text-white group-hover:text-cyan-300 transition-colors">
                  {skill.name}
                </h3>

                <p className="mt-2 text-xs text-slate-400 line-clamp-2 leading-relaxed">
                  {skill.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-850 flex items-center justify-between text-[11px] font-mono-code">
                <span className="text-cyan-400/90">{skill.proficiencyLabel}</span>
                <span className="text-slate-400 group-hover:text-cyan-300 transition-colors">Inspect →</span>
              </div>
            </div>
          ))}
        </div>

        {/* Skill Detail Modal */}
        <AnimatePresence>
          {selectedSkill && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="relative w-full max-w-lg rounded-2xl border border-cyan-500/40 bg-slate-900 p-6 sm:p-8 shadow-[0_0_50px_rgba(6,182,212,0.25)] font-mono-code"
              >
                {/* Close Button */}
                <button
                  onClick={() => setSelectedSkill(null)}
                  className="absolute top-4 right-4 p-1.5 rounded-lg border border-slate-700 text-slate-400 hover:text-white hover:border-cyan-400 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>

                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 rounded-xl bg-cyan-950/60 border border-cyan-500/40">
                    {getCategoryIcon(selectedSkill.category)}
                  </div>
                  <div>
                    <h3 className="font-cyber font-bold text-2xl text-white">
                      {selectedSkill.name}
                    </h3>
                    <div className="flex items-center gap-2 text-xs text-slate-400">
                      <span>{selectedSkill.category}</span>
                      <span aria-hidden="true">·</span>
                      <span className="text-cyan-400">{selectedSkill.proficiencyLabel}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4 text-xs leading-relaxed text-slate-300">
                  <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                    <p className="text-slate-400 font-semibold mb-1 uppercase tracking-wider text-[10px]">
                      Technical Capabilities
                    </p>
                    <p>{selectedSkill.description}</p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                    <p className="text-slate-400 font-semibold mb-1 uppercase tracking-wider text-[10px]">
                      Academic & Project Application
                    </p>
                    <p>{selectedSkill.experienceContext}</p>
                  </div>
                </div>

                <div className="mt-6 flex justify-end">
                  <button
                    onClick={() => setSelectedSkill(null)}
                    className="px-4 py-2 rounded-lg bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 text-xs hover:bg-cyan-500/30 transition-colors"
                  >
                    Close Telemetry
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

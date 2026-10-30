import React from 'react';
import { Sparkles, Brain, Cpu, Compass, BookMarked, ArrowUpRight } from 'lucide-react';
import { CURRENTLY_LEARNING } from '../data/portfolioData';

export const CurrentlyLearningSection: React.FC = () => {
  return (
    <section id="learning" className="py-24 relative z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-14">
          <div className="flex items-center gap-2 text-xs font-mono-code text-cyan-400 mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            <span>05. HORIZON & EXPANSION</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-cyber font-bold tracking-tight text-white">
            Currently Learning
          </h2>
          <div className="mt-2 flex items-center gap-2 text-xs text-slate-400 font-mono-code">
            <span>Continuous Knowledge Acquisition</span>
            <span aria-hidden="true">·</span>
            <span>AI Modeling, Distributed Endpoints & Visual Computing</span>
          </div>
        </div>

        {/* Learning Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {CURRENTLY_LEARNING.map((item, index) => (
            <div
              key={index}
              className="group rounded-2xl border border-slate-800 bg-slate-950/60 p-6 hover:border-cyan-500/40 hover:bg-slate-900/60 transition-all duration-300 flex flex-col justify-between shadow-sm hover:shadow-[0_0_30px_-5px_rgba(6,182,212,0.2)]"
            >
              <div>
                <div className="flex items-center justify-between mb-3 text-xs font-mono-code">
                  <span className="text-purple-400 font-semibold">{item.category}</span>
                  <div className="flex items-center gap-1.5 text-cyan-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                    <span>{item.status}</span>
                  </div>
                </div>

                <h3 className="font-cyber font-bold text-xl text-white group-hover:text-cyan-300 transition-colors">
                  {item.topic}
                </h3>

                <p className="mt-3 text-sm text-slate-300 leading-relaxed">
                  {item.summary}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-850 flex items-center justify-between text-xs font-mono-code text-slate-400">
                <span>Phase 0{index + 1} Roadpath</span>
                <span className="text-cyan-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  <span>Tracking</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

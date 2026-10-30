import React from 'react';
import { motion } from 'motion/react';
import { Brain, Code, Database, GraduationCap, MapPin, Sparkles, Terminal } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface AboutSectionProps {
  reducedMotion?: boolean;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ reducedMotion = false }) => {
  return (
    <section id="about" className="py-24 relative z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-14">
          <div className="flex items-center gap-2 text-xs font-mono-code text-cyan-400 mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            <span>01. SYSTEM ARCHITECTURE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-cyber font-bold tracking-tight text-white">
            About Me
          </h2>
          <div className="mt-2 flex items-center gap-2 text-xs text-slate-400 font-mono-code">
            <span>Poornima A</span>
            <span aria-hidden="true">·</span>
            <span>AI & ML Undergraduate</span>
            <span aria-hidden="true">·</span>
            <span>Reva University</span>
          </div>
        </div>

        {/* 2-Column Split: Avatar Card & Narrative Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          {/* Avatar & System Card */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="relative rounded-2xl border border-cyan-500/20 bg-slate-950/70 p-5 flex flex-col justify-between overflow-hidden group shadow-[0_0_30px_-10px_rgba(6,182,212,0.15)] flex-1">
              {/* Corner accents */}
              <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-cyan-400/40" />
              <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-cyan-400/40" />

              {/* Avatar Image Frame */}
              <div className="relative aspect-square w-full rounded-xl overflow-hidden border border-slate-800 bg-slate-900 mb-4">
                <img
                  src={PERSONAL_INFO.avatarUrl}
                  alt="Poornima A - AI & ML Student"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs font-mono-code">
                  <span className="text-cyan-300 font-semibold">{PERSONAL_INFO.name}</span>
                  <span className="text-slate-400">{PERSONAL_INFO.handle}</span>
                </div>
              </div>

              {/* Verified academic telemetry */}
              <div className="space-y-2 pt-2 border-t border-slate-800 text-xs font-mono-code">
                <div className="flex items-center justify-between text-slate-400">
                  <span className="flex items-center gap-1.5">
                    <GraduationCap className="w-3.5 h-3.5 text-cyan-400" />
                    Institution
                  </span>
                  <span className="text-slate-200">{PERSONAL_INFO.university}</span>
                </div>
                <div className="flex items-center justify-between text-slate-400">
                  <span className="flex items-center gap-1.5">
                    <Brain className="w-3.5 h-3.5 text-purple-400" />
                    Program
                  </span>
                  <span className="text-slate-200">B.Tech in AI & ML</span>
                </div>
                <div className="flex items-center justify-between text-slate-400">
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-teal-400" />
                    Location
                  </span>
                  <span className="text-slate-200">{PERSONAL_INFO.location}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Narrative & Focus Pillars */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
            <div className="p-6 sm:p-8 rounded-2xl border border-slate-800 bg-slate-900/40 backdrop-blur-sm space-y-4">
              <h3 className="text-xl font-cyber font-bold text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-cyan-400" />
                Engineering Foundations & Vision
              </h3>
              
              <p className="text-slate-300 text-sm leading-relaxed">
                I am an undergraduate engineering student pursuing my <strong className="text-cyan-300">B.Tech in Artificial Intelligence and Machine Learning at Reva University</strong>. As an aspiring software developer, my goal is to blend theoretical artificial intelligence and machine learning principles with practical, user-facing software engineering.
              </p>

              <p className="text-slate-400 text-sm leading-relaxed">
                My journey began with low-level procedural problem-solving in <span className="text-slate-200">C</span>, which cultivated a deep appreciation for computational efficiency, memory paradigms, and algorithmic clarity. As I progressed into <span className="text-slate-200">Python</span>, I fell in love with mathematical modeling, data manipulation, and building intelligent predictive systems.
              </p>

              <p className="text-slate-400 text-sm leading-relaxed">
                Recognizing that powerful algorithms must be accessible to users, I immersed myself in modern frontend engineering with <span className="text-slate-200">React, JavaScript, and CSS</span>. From structuring responsive patient reminder systems in <em>MediRemind</em> to designing arcade game loops in <em>Neon Rift</em>, I treat every project as an opportunity to write robust, maintainable code.
              </p>
            </div>

            {/* Core Competency Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl border border-slate-800/80 bg-slate-950/50">
                <div className="w-8 h-8 rounded-lg bg-cyan-950/50 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-2">
                  <Brain className="w-4 h-4" />
                </div>
                <h4 className="text-sm font-semibold text-white mb-1">AI & ML Focus</h4>
                <p className="text-xs text-slate-400 leading-normal">
                  Foundations in predictive models, neural systems, and data pipelines at Reva University.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-slate-800/80 bg-slate-950/50">
                <div className="w-8 h-8 rounded-lg bg-purple-950/50 border border-purple-500/30 flex items-center justify-center text-purple-400 mb-2">
                  <Code className="w-4 h-4" />
                </div>
                <h4 className="text-sm font-semibold text-white mb-1">Software Craft</h4>
                <p className="text-xs text-slate-400 leading-normal">
                  Writing clean, modular React components, responsive layouts, and efficient logic.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-slate-800/80 bg-slate-950/50">
                <div className="w-8 h-8 rounded-lg bg-teal-950/50 border border-teal-500/30 flex items-center justify-center text-teal-400 mb-2">
                  <Database className="w-4 h-4" />
                </div>
                <h4 className="text-sm font-semibold text-white mb-1">Data & Schemas</h4>
                <p className="text-xs text-slate-400 leading-normal">
                  Relational database querying, structured MySQL schemas, and reliable record indexing.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

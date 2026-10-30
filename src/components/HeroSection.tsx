import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Terminal, Github, Linkedin, ArrowDown, Sparkles, Code2, BookOpen, Layers } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { HolographicOrb } from './HolographicOrb';
import { playCyberSound } from '../utils/audio';

interface HeroSectionProps {
  onOpenTerminal: () => void;
  isMuted: boolean;
  reducedMotion: boolean;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenTerminal,
  isMuted,
  reducedMotion,
}) => {
  const [displayText, setDisplayText] = useState('');
  const fullText = PERSONAL_INFO.role;

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setDisplayText(fullText.slice(0, index));
      index++;
      if (index > fullText.length) {
        clearInterval(interval);
      }
    }, 45);

    return () => clearInterval(interval);
  }, []);

  return (
    <section id="hero" className="relative min-h-screen pt-28 pb-16 flex flex-col justify-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Split Hero: Left Typography & Narrative, Right 3D Hologram */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column (col-span-7) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Hologram System Subtitle */}
            <div className="inline-flex items-center gap-2 text-xs font-mono-code text-cyan-400">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              <span className="tracking-widest">POORNIMA.EXE // SYSTEM ACTIVE</span>
              <span className="text-slate-400">·</span>
              <span className="text-slate-400">{PERSONAL_INFO.university}</span>
            </div>

            {/* Oversized Glitch/Cyber Typography */}
            <div className="space-y-2">
              <h1 className="font-cyber font-black text-4xl sm:text-6xl lg:text-7xl tracking-tight text-white leading-none">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-cyan-300">
                  {PERSONAL_INFO.name}
                </span>
              </h1>
              
              {/* Animated Typing Role */}
              <div className="h-8 flex items-center">
                <p className="text-base sm:text-xl font-mono-code text-cyan-400 font-semibold flex items-center gap-1">
                  <span>{displayText}</span>
                  <span className="w-2 h-5 bg-cyan-400 inline-block animate-pulse" />
                </p>
              </div>
            </div>

            {/* Core Bio Description */}
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl">
              Specializing in <span className="text-cyan-300 font-medium">Artificial Intelligence & Machine Learning</span> at Reva University. Engineering intuitive web applications, robust algorithm systems, and interactive software with clean code and modern tooling.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="#projects"
                onClick={() => playCyberSound('click', isMuted)}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-400 hover:from-cyan-400 hover:to-teal-300 text-slate-950 font-mono-code font-bold text-xs tracking-wider uppercase transition-all shadow-[0_0_25px_rgba(6,182,212,0.35)] flex items-center gap-2 cursor-pointer"
              >
                <span>Explore Projects</span>
                <Sparkles className="w-4 h-4" />
              </a>

              <button
                onClick={() => {
                  playCyberSound('click', isMuted);
                  onOpenTerminal();
                }}
                className="px-5 py-3 rounded-xl border border-cyan-500/30 bg-slate-900/80 hover:bg-cyan-950/40 hover:border-cyan-400 text-cyan-300 font-mono-code text-xs transition-all flex items-center gap-2 cursor-pointer"
              >
                <Terminal className="w-4 h-4 text-cyan-400" />
                <span>Launch Terminal</span>
              </button>

              <div className="flex items-center gap-2 pl-2">
                <a
                  href={PERSONAL_INFO.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub Profile"
                  onClick={() => playCyberSound('click', isMuted)}
                  className="p-3 rounded-xl border border-slate-800 bg-slate-900/80 hover:text-cyan-400 hover:border-cyan-500/40 text-slate-400 transition-colors"
                >
                  <Github className="w-4 h-4" />
                </a>

                <a
                  href={PERSONAL_INFO.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn Profile"
                  onClick={() => playCyberSound('click', isMuted)}
                  className="p-3 rounded-xl border border-slate-800 bg-slate-900/80 hover:text-cyan-400 hover:border-cyan-500/40 text-slate-400 transition-colors"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column (col-span-5): 3D Holographic Orb */}
          <div className="lg:col-span-5 flex justify-center">
            <HolographicOrb reducedMotion={reducedMotion} />
          </div>
        </div>

        {/* Full-Width Row Below Hero Split: Core Academic & Project Anchors */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 pt-8 border-t border-cyan-500/10">
          <div className="p-4 rounded-xl border border-slate-800/80 bg-slate-900/40 backdrop-blur-sm">
            <div className="flex items-center gap-2 text-cyan-400 mb-1">
              <BookOpen className="w-4 h-4 text-cyan-400" />
              <span className="text-xs font-mono-code font-bold uppercase tracking-wider text-slate-300">Degree</span>
            </div>
            <p className="text-sm font-semibold text-white">B.Tech AI & ML</p>
            <p className="text-xs text-slate-400 font-mono-code">{PERSONAL_INFO.university}</p>
          </div>

          <div className="p-4 rounded-xl border border-slate-800/80 bg-slate-900/40 backdrop-blur-sm">
            <div className="flex items-center gap-2 text-purple-400 mb-1">
              <Code2 className="w-4 h-4 text-purple-400" />
              <span className="text-xs font-mono-code font-bold uppercase tracking-wider text-slate-300">Languages</span>
            </div>
            <p className="text-sm font-semibold text-white">Python, C, JavaScript</p>
            <p className="text-xs text-slate-400 font-mono-code">Core Algorithmic Base</p>
          </div>

          <div className="p-4 rounded-xl border border-slate-800/80 bg-slate-900/40 backdrop-blur-sm">
            <div className="flex items-center gap-2 text-teal-400 mb-1">
              <Layers className="w-4 h-4 text-teal-400" />
              <span className="text-xs font-mono-code font-bold uppercase tracking-wider text-slate-300">Development</span>
            </div>
            <p className="text-sm font-semibold text-white">React, SQL, MySQL</p>
            <p className="text-xs text-slate-400 font-mono-code">Full Web Stack</p>
          </div>

          <div className="p-4 rounded-xl border border-slate-800/80 bg-slate-900/40 backdrop-blur-sm">
            <div className="flex items-center gap-2 text-cyan-400 mb-1">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span className="text-xs font-mono-code font-bold uppercase tracking-wider text-slate-300">Showcase</span>
            </div>
            <p className="text-sm font-semibold text-white">4 Featured Projects</p>
            <p className="text-xs text-slate-400 font-mono-code">Healthcare, Web, Game</p>
          </div>
        </div>

        {/* Scroll down indicator */}
        <div className="mt-8 flex justify-center">
          <a
            href="#about"
            aria-label="Scroll to about section"
            className="flex flex-col items-center gap-1 text-slate-400 hover:text-cyan-400 transition-colors text-xs font-mono-code"
          >
            <span>DISCOVER</span>
            <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
          </a>
        </div>
      </div>
    </section>
  );
};

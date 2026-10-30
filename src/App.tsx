/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { BootScreen } from './components/BootScreen';
import { CyberNavbar } from './components/CyberNavbar';
import { ParticleBackground } from './components/ParticleBackground';
import { MouseGlow } from './components/MouseGlow';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { SkillsSection } from './components/SkillsSection';
import { ProjectsSection } from './components/ProjectsSection';
import { EducationSection } from './components/EducationSection';
import { CurrentlyLearningSection } from './components/CurrentlyLearningSection';
import { ContactSection } from './components/ContactSection';
import { CyberTerminalModal } from './components/CyberTerminalModal';

export default function App() {
  const [bootComplete, setBootComplete] = useState(false);
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  // Check system prefers-reduced-motion
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      if (mediaQuery.matches) {
        setReducedMotion(true);
      }
    }
  }, []);

  // Global keyboard shortcut to launch terminal (Ctrl+K or `)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey && e.key === 'k') || e.key === '`') {
        e.preventDefault();
        setTerminalOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-cyan-500 selection:text-slate-950 font-sans relative">
      {/* 1. Animated Futuristic Boot Screen */}
      {!bootComplete && (
        <BootScreen
          onComplete={() => setBootComplete(true)}
          isMuted={isMuted}
        />
      )}

      {/* 2. Floating Cyber Ambient Particles & Grids */}
      <ParticleBackground reducedMotion={reducedMotion} />

      {/* 3. Mouse-Following Ambient Glow */}
      <MouseGlow reducedMotion={reducedMotion} />

      {/* 4. Cyber Navigation Bar */}
      <CyberNavbar
        onOpenTerminal={() => setTerminalOpen(true)}
        isMuted={isMuted}
        onToggleMute={() => setIsMuted(!isMuted)}
        reducedMotion={reducedMotion}
        onToggleMotion={() => setReducedMotion(!reducedMotion)}
      />

      {/* Main Content Sections */}
      <main className="relative z-10 overflow-hidden">
        {/* Section 1: Hero */}
        <HeroSection
          onOpenTerminal={() => setTerminalOpen(true)}
          isMuted={isMuted}
          reducedMotion={reducedMotion}
        />

        {/* Section 2: About Me */}
        <AboutSection reducedMotion={reducedMotion} />

        {/* Section 3: Technical Skills */}
        <SkillsSection
          isMuted={isMuted}
          reducedMotion={reducedMotion}
        />

        {/* Section 4: Featured Projects */}
        <ProjectsSection
          isMuted={isMuted}
          reducedMotion={reducedMotion}
        />

        {/* Section 5: Education */}
        <EducationSection />

        {/* Section 6: Currently Learning */}
        <CurrentlyLearningSection />

        {/* Section 7: Contact */}
        <ContactSection isMuted={isMuted} />
      </main>

      {/* Interactive Cyber Terminal Modal */}
      <CyberTerminalModal
        isOpen={terminalOpen}
        onClose={() => setTerminalOpen(false)}
        isMuted={isMuted}
      />
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import { Terminal, Volume2, VolumeX, Eye, EyeOff, Menu, X, ArrowUpRight } from 'lucide-react';
import { playCyberSound } from '../utils/audio';

interface CyberNavbarProps {
  onOpenTerminal: () => void;
  isMuted: boolean;
  onToggleMute: () => void;
  reducedMotion: boolean;
  onToggleMotion: () => void;
}

export const CyberNavbar: React.FC<CyberNavbarProps> = ({
  onOpenTerminal,
  isMuted,
  onToggleMute,
  reducedMotion,
  onToggleMotion,
}) => {
  const [activeSection, setActiveSection] = useState('hero');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Education', href: '#education' },
    { label: 'Learning', href: '#learning' },
    { label: 'Contact', href: '#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections = ['hero', 'about', 'skills', 'projects', 'education', 'learning', 'contact'];
      const scrollPos = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    playCyberSound('click', isMuted);
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-slate-950/85 backdrop-blur-md border-b border-cyan-500/20 shadow-[0_4px_30px_rgba(0,0,0,0.5)]'
          : 'bg-transparent border-b border-white/5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark */}
        <a
          href="#hero"
          onClick={() => handleNavClick('#hero')}
          className="font-cyber font-extrabold text-base sm:text-lg tracking-wider text-cyan-400 hover:text-cyan-300 transition-colors whitespace-nowrap shrink-0 flex items-center gap-2 group"
        >
          <span className="w-2 h-2 rounded-full bg-cyan-400 group-hover:scale-125 transition-transform shadow-[0_0_8px_#06b6d4]" />
          <span>POORNIMA.EXE</span>
        </a>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-xs font-mono-code font-medium text-slate-300">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.replace('#', '');
            return (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                onMouseEnter={() => playCyberSound('hover', isMuted)}
                className={`transition-colors whitespace-nowrap shrink-0 py-1 relative ${
                  isActive
                    ? 'text-cyan-400 font-semibold'
                    : 'text-slate-400 hover:text-slate-100'
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full" />
                )}
              </a>
            );
          })}
        </nav>

        {/* Zone 3: Actions (Terminal HUD, Toggles, Contact) */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Audio FX Toggle */}
          <button
            onClick={() => {
              playCyberSound('click', isMuted);
              onToggleMute();
            }}
            title={isMuted ? 'Unmute Cyber Audio' : 'Mute Cyber Audio'}
            aria-label={isMuted ? 'Unmute Cyber Audio' : 'Mute Cyber Audio'}
            className="p-2 rounded-lg border border-slate-800 text-slate-400 hover:text-cyan-400 hover:border-cyan-500/40 transition-colors cursor-pointer"
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-cyan-400" />}
          </button>

          {/* Reduced Motion Toggle */}
          <button
            onClick={() => {
              playCyberSound('click', isMuted);
              onToggleMotion();
            }}
            title={reducedMotion ? 'Enable Full Animations' : 'Reduce Motion'}
            aria-label={reducedMotion ? 'Enable Full Animations' : 'Reduce Motion'}
            className="p-2 rounded-lg border border-slate-800 text-slate-400 hover:text-purple-400 hover:border-purple-500/40 transition-colors cursor-pointer"
          >
            {reducedMotion ? <EyeOff className="w-4 h-4 text-purple-400" /> : <Eye className="w-4 h-4" />}
          </button>

          {/* Terminal HUD Button */}
          <button
            onClick={() => {
              playCyberSound('beep', isMuted);
              onOpenTerminal();
            }}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-cyan-500/30 bg-cyan-950/40 text-cyan-300 hover:bg-cyan-900/40 hover:border-cyan-400 text-xs font-mono-code transition-all cursor-pointer whitespace-nowrap"
          >
            <Terminal className="w-3.5 h-3.5 text-cyan-400" />
            <span>Terminal</span>
          </button>

          {/* Primary CTA */}
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('#contact');
            }}
            className="px-4 py-2 text-xs font-medium text-slate-950 bg-gradient-to-r from-cyan-400 to-teal-300 rounded-lg hover:from-cyan-300 hover:to-teal-200 transition-all font-mono-code whitespace-nowrap font-bold shadow-[0_0_15px_rgba(6,182,212,0.3)] flex items-center gap-1"
          >
            <span>Connect</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg border border-slate-800 text-slate-300 hover:text-cyan-400 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-slate-950/95 border-b border-cyan-500/20 px-6 py-6 space-y-4 backdrop-blur-xl font-mono-code">
          <div className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                className="text-sm text-slate-300 hover:text-cyan-400 py-1 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
          <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenTerminal();
              }}
              className="flex items-center gap-2 text-xs text-cyan-400 hover:text-cyan-300"
            >
              <Terminal className="w-4 h-4" />
              <span>Launch Cyber Terminal</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

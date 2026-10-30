import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Github, ExternalLink, Sparkles, Layers, ShieldCheck, Play, X, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { PROJECTS_LIST } from '../data/portfolioData';
import { ProjectItem } from '../types';
import { playCyberSound } from '../utils/audio';

interface ProjectsSectionProps {
  isMuted: boolean;
  reducedMotion?: boolean;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ isMuted, reducedMotion = false }) => {
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [activeTab, setActiveTab] = useState<'all' | 'web' | 'game' | 'utility'>('all');

  const filteredProjects = activeTab === 'all'
    ? PROJECTS_LIST
    : PROJECTS_LIST.filter((p) => p.category === activeTab);

  const handleCardClick = (project: ProjectItem) => {
    playCyberSound('beep', isMuted);
    setSelectedProject(project);
  };

  return (
    <section id="projects" className="py-24 relative z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono-code text-cyan-400 mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
              <span>03. SYSTEM IMPLEMENTATIONS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-cyber font-bold tracking-tight text-white">
              Featured Projects
            </h2>
            <div className="mt-2 flex items-center gap-2 text-xs text-slate-400 font-mono-code">
              <span>Interactive 3D Showcases</span>
              <span aria-hidden="true">·</span>
              <span>Healthcare, Publishing, Sports Reservation & 2D Arcade</span>
            </div>
          </div>

          {/* Interactive Category Tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-900/80 rounded-xl border border-slate-800">
            {[
              { id: 'all', label: 'All Projects' },
              { id: 'utility', label: 'Healthcare & Utility' },
              { id: 'web', label: 'Web Applications' },
              { id: 'game', label: '2D Game' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  playCyberSound('click', isMuted);
                  setActiveTab(tab.id as typeof activeTab);
                }}
                className={`px-3 py-1.5 text-xs font-mono-code rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* 3D Project Cards Grid (2x2 on desktop) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onClick={() => handleCardClick(project)}
              isMuted={isMuted}
              reducedMotion={reducedMotion}
            />
          ))}
        </div>

        {/* Full Project Inspection Modal */}
        <AnimatePresence>
          {selectedProject && (
            <ProjectDetailModal
              project={selectedProject}
              onClose={() => setSelectedProject(null)}
              isMuted={isMuted}
            />
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

interface ProjectCardProps {
  project: ProjectItem;
  onClick: () => void;
  isMuted: boolean;
  reducedMotion: boolean;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onClick, isMuted, reducedMotion }) => {
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reducedMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -7;
    const rotateY = ((x - centerX) / centerX) * 7;
    setRotate({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
    setIsHovered(false);
  };

  return (
    <div
      style={{
        perspective: 1000,
      }}
      className="h-full"
    >
      <div
        onMouseMove={handleMouseMove}
        onMouseEnter={() => {
          setIsHovered(true);
          playCyberSound('hover', isMuted);
        }}
        onMouseLeave={handleMouseLeave}
        onClick={onClick}
        style={{
          transform: reducedMotion
            ? 'none'
            : `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
          transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.4s ease-out',
        }}
        className="group relative rounded-2xl border border-slate-800 bg-slate-950/70 p-5 flex flex-col justify-between overflow-hidden cursor-pointer shadow-[0_10px_30px_rgba(0,0,0,0.5)] hover:border-cyan-500/50 hover:shadow-[0_0_35px_-5px_rgba(6,182,212,0.3)] transition-colors h-full"
      >
        {/* Corner Neon Highlights */}
        <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-transparent group-hover:border-cyan-400 transition-colors" />
        <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-transparent group-hover:border-purple-400 transition-colors" />

        <div>
          {/* Project Preview Image */}
          <div className="relative aspect-video w-full rounded-xl overflow-hidden border border-slate-800/80 bg-slate-900 mb-5">
            <img
              src={project.image}
              alt={project.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
            
            {/* Quick Badge */}
            <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-slate-950/80 border border-slate-700/80 text-[11px] font-mono-code text-cyan-300 backdrop-blur-md">
              {project.category.toUpperCase()}
            </div>

            <div className="absolute bottom-3 right-3 p-2 rounded-lg bg-slate-950/80 border border-cyan-500/40 text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity">
              <ExternalLink className="w-4 h-4" />
            </div>
          </div>

          {/* Clean unboxed metadata separator */}
          <div className="flex items-center gap-2 text-xs text-slate-400 font-mono-code mb-2">
            <span>{project.subtitle}</span>
            <span aria-hidden="true">·</span>
            <span>{project.role}</span>
          </div>

          <h3 className="font-cyber font-bold text-2xl text-white group-hover:text-cyan-300 transition-colors">
            {project.title}
          </h3>

          <p className="mt-2 text-sm text-slate-300 leading-relaxed">
            {project.description}
          </p>

          {/* Tags as clean unboxed text with bullets */}
          <div className="mt-4 flex flex-wrap items-center gap-2 text-xs font-mono-code text-cyan-400/90">
            {project.tags.map((tag, idx) => (
              <span key={tag} className="flex items-center gap-2">
                <span>{tag}</span>
                {idx < project.tags.length - 1 && <span className="text-slate-600">·</span>}
              </span>
            ))}
          </div>
        </div>

        {/* Card Footer */}
        <div className="mt-6 pt-4 border-t border-slate-850 flex items-center justify-between text-xs font-mono-code">
          <span className="text-slate-400 group-hover:text-slate-200 transition-colors">
            Click to inspect telemetry & demo →
          </span>
          <span className="text-cyan-400 font-bold flex items-center gap-1">
            <span>OPEN</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>
    </div>
  );
};

interface ProjectDetailModalProps {
  project: ProjectItem;
  onClose: () => void;
  isMuted: boolean;
}

const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({ project, onClose, isMuted }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative w-full max-w-3xl my-8 rounded-2xl border border-cyan-500/40 bg-slate-900 p-6 sm:p-8 shadow-[0_0_60px_rgba(6,182,212,0.3)] font-mono-code"
      >
        {/* Close Button */}
        <button
          onClick={() => {
            playCyberSound('click', isMuted);
            onClose();
          }}
          className="absolute top-4 right-4 p-2 rounded-lg border border-slate-700 text-slate-400 hover:text-white hover:border-cyan-400 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-2 text-xs text-cyan-400 mb-1">
            <span className="w-2 h-2 rounded-full bg-cyan-400" />
            <span>PROJECT TELEMETRY // {project.id.toUpperCase()}</span>
          </div>
          <h2 className="font-cyber font-black text-3xl text-white">
            {project.title}
          </h2>
          <p className="text-sm text-cyan-300 font-semibold">{project.subtitle}</p>
        </div>

        {/* Image Preview */}
        <div className="relative aspect-video w-full rounded-xl overflow-hidden border border-slate-800 mb-6">
          <img
            src={project.image}
            alt={project.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Detailed Breakdown */}
        <div className="space-y-6">
          <div className="space-y-2">
            <h4 className="text-xs uppercase tracking-wider text-slate-400 font-bold">
              Architectural Overview
            </h4>
            <p className="text-sm text-slate-300 leading-relaxed">
              {project.detailedDescription}
            </p>
          </div>

          {/* Key Features */}
          <div className="space-y-2">
            <h4 className="text-xs uppercase tracking-wider text-slate-400 font-bold">
              Core Capabilities & Features
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {project.features.map((feat, index) => (
                <div
                  key={index}
                  className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-300 flex items-start gap-2"
                >
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tech Stack */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
            <h4 className="text-xs uppercase tracking-wider text-slate-400 font-bold mb-2">
              Technology Stack
            </h4>
            <div className="flex flex-wrap items-center gap-2 text-xs text-cyan-400">
              {project.techStack.map((tech, idx) => (
                <span key={tech} className="flex items-center gap-2">
                  <span>{tech}</span>
                  {idx < project.techStack.length - 1 && <span className="text-slate-600">·</span>}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4">
          <div className="text-xs text-slate-400">
            <span>Author: Poornima A</span>
            <span aria-hidden="true"> · </span>
            <span>Reva University</span>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => playCyberSound('click', isMuted)}
              className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-xs flex items-center gap-2 transition-colors"
            >
              <Github className="w-4 h-4" />
              <span>View GitHub Repository</span>
            </a>
            <button
              onClick={() => {
                playCyberSound('click', isMuted);
                onClose();
              }}
              className="px-4 py-2 rounded-lg bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 text-xs hover:bg-cyan-500/30 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

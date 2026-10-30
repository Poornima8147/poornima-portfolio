import React from 'react';
import { GraduationCap, BookOpen, Award, CheckCircle2, MapPin, Calendar } from 'lucide-react';
import { EDUCATION_DATA } from '../data/portfolioData';

export const EducationSection: React.FC = () => {
  return (
    <section id="education" className="py-24 relative z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-14">
          <div className="flex items-center gap-2 text-xs font-mono-code text-cyan-400 mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            <span>04. ACADEMIC PEDIGREE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-cyber font-bold tracking-tight text-white">
            Education
          </h2>
          <div className="mt-2 flex items-center gap-2 text-xs text-slate-400 font-mono-code">
            <span>Reva University</span>
            <span aria-hidden="true">·</span>
            <span>School of Computing & Information Technology</span>
          </div>
        </div>

        {/* Primary Education Card */}
        <div className="rounded-2xl border border-cyan-500/20 bg-slate-950/70 p-6 sm:p-8 backdrop-blur-md relative overflow-hidden shadow-[0_0_35px_-10px_rgba(6,182,212,0.15)]">
          {/* Subtle corner accents */}
          <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-cyan-400/40" />
          <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-cyan-400/40" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Header info (col-span-5) */}
            <div className="lg:col-span-5 space-y-4">
              <div className="w-12 h-12 rounded-xl bg-cyan-950/60 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
                <GraduationCap className="w-6 h-6" />
              </div>

              <div>
                <h3 className="font-cyber font-bold text-2xl sm:text-3xl text-white">
                  {EDUCATION_DATA.institution}
                </h3>
                <p className="text-base text-cyan-300 font-medium mt-1">
                  {EDUCATION_DATA.degree}
                </p>
                <p className="text-sm text-slate-300 font-mono-code mt-0.5">
                  {EDUCATION_DATA.field}
                </p>
              </div>

              <div className="pt-2 space-y-2 text-xs font-mono-code text-slate-400">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-cyan-400" />
                  <span>{EDUCATION_DATA.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-purple-400" />
                  <span>Status: Current Undergraduate Student</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-300 leading-relaxed font-mono-code">
                <span className="text-cyan-400 font-bold block mb-1">ACADEMIC FOCUS</span>
                {EDUCATION_DATA.academicPhilosophy}
              </div>
            </div>

            {/* Right Coursework grid (col-span-7) */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-cyber font-bold text-white flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-cyan-400" />
                  Curriculum & Core Academic Modules
                </h4>
                <span className="text-xs font-mono-code text-slate-400">AI & ML Track</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {EDUCATION_DATA.courseworkHighlights.map((course, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl border border-slate-800 bg-slate-900/40 hover:border-cyan-500/30 transition-colors flex items-start gap-2.5"
                  >
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-medium text-slate-200">{course}</p>
                      <span className="text-[10px] font-mono-code text-slate-400">
                        Module 0{idx + 1}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/30 text-xs font-mono-code text-slate-400 flex items-center justify-between">
                <span>Core Competency: Algorithmic Logic & Machine Intelligence</span>
                <span className="text-cyan-400">Verified Enrollment</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

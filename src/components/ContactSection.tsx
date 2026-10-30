import React, { useState } from 'react';
import { Mail, Github, Linkedin, Send, Copy, Check, Sparkles, MapPin, AlertCircle, ArrowUp } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { playCyberSound } from '../utils/audio';

interface ContactSectionProps {
  isMuted: boolean;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ isMuted }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = 'Name is required';
    if (!formData.email.trim()) {
      errs.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = 'Please provide a valid email format';
    }
    if (!formData.subject.trim()) errs.subject = 'Subject is required';
    if (!formData.message.trim()) {
      errs.message = 'Message content is required';
    } else if (formData.message.trim().length < 10) {
      errs.message = 'Message should contain at least 10 characters';
    }
    return errs;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      playCyberSound('beep', isMuted);
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    playCyberSound('success', isMuted);
    setIsSubmitted(true);

    // Prepare mailto link as accessible client action
    const mailtoUrl = `mailto:${PERSONAL_INFO.social.email}?subject=${encodeURIComponent(
      `[Portfolio] ${formData.subject}`
    )}&body=${encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    )}`;

    window.location.href = mailtoUrl;
  };

  const handleCopyEmail = () => {
    playCyberSound('click', isMuted);
    navigator.clipboard.writeText(PERSONAL_INFO.social.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const scrollToTop = () => {
    playCyberSound('click', isMuted);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section id="contact" className="py-24 relative z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-14">
          <div className="flex items-center gap-2 text-xs font-mono-code text-cyan-400 mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            <span>06. TRANSMISSION CHANNEL</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-cyber font-bold tracking-tight text-white">
            Get In Touch
          </h2>
          <div className="mt-2 flex items-center gap-2 text-xs text-slate-400 font-mono-code">
            <span>Direct Outreach</span>
            <span aria-hidden="true">·</span>
            <span>Internship Enquiries, Technical Collaboration & Software Discussions</span>
          </div>
        </div>

        {/* 2-Column Contact Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Direct Connect & Links (col-span-5) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 rounded-2xl border border-cyan-500/20 bg-slate-950/70 backdrop-blur-md space-y-5">
              <h3 className="font-cyber font-bold text-xl text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-cyan-400" />
                Let's Build Together
              </h3>
              
              <p className="text-sm text-slate-300 leading-relaxed">
                Whether you have an upcoming software engineering role, internship opportunity, or want to discuss machine learning applications, feel free to transmit a message.
              </p>

              {/* Direct Email Card */}
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                <span className="text-[11px] font-mono-code text-slate-400 uppercase tracking-wider block">
                  Official Communication
                </span>
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 text-xs font-mono-code text-cyan-300 truncate">
                    <Mail className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span className="truncate">{PERSONAL_INFO.social.email}</span>
                  </div>
                  <button
                    onClick={handleCopyEmail}
                    className="p-1.5 rounded-md border border-slate-700 text-slate-300 hover:text-cyan-400 hover:border-cyan-500 transition-colors cursor-pointer"
                    title="Copy Email Address"
                    aria-label="Copy Email Address"
                  >
                    {copiedEmail ? <Check className="w-4 h-4 text-teal-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Location telemetry */}
              <div className="flex items-center gap-2 text-xs font-mono-code text-slate-400">
                <MapPin className="w-4 h-4 text-purple-400" />
                <span>{PERSONAL_INFO.location} · Bengaluru, Karnataka</span>
              </div>

              {/* Social Channels */}
              <div className="pt-4 border-t border-slate-800 space-y-3">
                <span className="text-xs font-mono-code text-slate-400 block">
                  Verified Social Channels:
                </span>
                <div className="flex flex-col sm:flex-row gap-3">
                  <a
                    href={PERSONAL_INFO.social.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => playCyberSound('click', isMuted)}
                    className="flex-1 px-4 py-3 rounded-xl border border-slate-800 bg-slate-900/60 hover:border-cyan-500/50 hover:bg-slate-900 text-slate-200 text-xs font-mono-code flex items-center justify-center gap-2 transition-all group"
                  >
                    <Github className="w-4 h-4 text-slate-400 group-hover:text-cyan-400 transition-colors" />
                    <span>GitHub Profile</span>
                  </a>

                  <a
                    href={PERSONAL_INFO.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => playCyberSound('click', isMuted)}
                    className="flex-1 px-4 py-3 rounded-xl border border-slate-800 bg-slate-900/60 hover:border-cyan-500/50 hover:bg-slate-900 text-slate-200 text-xs font-mono-code flex items-center justify-center gap-2 transition-all group"
                  >
                    <Linkedin className="w-4 h-4 text-slate-400 group-hover:text-cyan-400 transition-colors" />
                    <span>LinkedIn Profile</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form with Validation (col-span-7) */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-2xl border border-slate-800 bg-slate-950/70 backdrop-blur-md relative">
              {isSubmitted ? (
                <div className="py-12 flex flex-col items-center text-center space-y-4 font-mono-code">
                  <div className="w-14 h-14 rounded-full bg-cyan-950 border border-cyan-400 flex items-center justify-center text-cyan-400">
                    <Check className="w-7 h-7" />
                  </div>
                  <h3 className="font-cyber font-bold text-2xl text-white">
                    Transmission Dispatched
                  </h3>
                  <p className="text-sm text-slate-300 max-w-md">
                    Thank you, <strong className="text-cyan-300">{formData.name}</strong>. Your message client has been initialized. You can also directly reach out at{' '}
                    <span className="text-cyan-400">{PERSONAL_INFO.social.email}</span>.
                  </p>
                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormData({ name: '', email: '', subject: '', message: '' });
                    }}
                    className="mt-4 px-5 py-2.5 rounded-lg border border-cyan-500/40 bg-cyan-500/10 text-cyan-300 text-xs hover:bg-cyan-500/20 transition-colors"
                  >
                    Send Another Transmission
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 font-mono-code">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Name */}
                    <div className="space-y-1.5">
                      <label className="text-xs text-slate-300 block">
                        Your Name <span className="text-cyan-400">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Alex Vance"
                        className={`w-full px-4 py-2.5 rounded-xl bg-slate-900 border text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-cyan-400 transition-colors ${
                          errors.name ? 'border-rose-500' : 'border-slate-800 focus:border-cyan-500'
                        }`}
                      />
                      {errors.name && (
                        <p className="text-[11px] text-rose-400 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          <span>{errors.name}</span>
                        </p>
                      )}
                    </div>

                    {/* Email */}
                    <div className="space-y-1.5">
                      <label className="text-xs text-slate-300 block">
                        Email Address <span className="text-cyan-400">*</span>
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="alex@domain.com"
                        className={`w-full px-4 py-2.5 rounded-xl bg-slate-900 border text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-cyan-400 transition-colors ${
                          errors.email ? 'border-rose-500' : 'border-slate-800 focus:border-cyan-500'
                        }`}
                      />
                      {errors.email && (
                        <p className="text-[11px] text-rose-400 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          <span>{errors.email}</span>
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Subject */}
                  <div className="space-y-1.5">
                    <label className="text-xs text-slate-300 block">
                      Subject <span className="text-cyan-400">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="e.g. Internship Opportunity / Project Collaboration"
                      className={`w-full px-4 py-2.5 rounded-xl bg-slate-900 border text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-cyan-400 transition-colors ${
                        errors.subject ? 'border-rose-500' : 'border-slate-800 focus:border-cyan-500'
                      }`}
                    />
                    {errors.subject && (
                      <p className="text-[11px] text-rose-400 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        <span>{errors.subject}</span>
                      </p>
                    )}
                  </div>

                  {/* Message */}
                  <div className="space-y-1.5">
                    <label className="text-xs text-slate-300 block">
                      Message <span className="text-cyan-400">*</span>
                    </label>
                    <textarea
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Enter your message details..."
                      className={`w-full px-4 py-2.5 rounded-xl bg-slate-900 border text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-cyan-400 transition-colors resize-none ${
                        errors.message ? 'border-rose-500' : 'border-slate-800 focus:border-cyan-500'
                      }`}
                    />
                    {errors.message && (
                      <p className="text-[11px] text-rose-400 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        <span>{errors.message}</span>
                      </p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 via-teal-400 to-purple-500 hover:from-cyan-400 hover:to-purple-400 text-slate-950 font-mono-code font-bold text-xs uppercase tracking-wider transition-all shadow-[0_0_25px_rgba(6,182,212,0.3)] flex items-center justify-center gap-2 cursor-pointer mt-2"
                  >
                    <span>Transmit Message</span>
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-24 pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono-code text-slate-400">
          <div>
            <span>© {new Date().getFullYear()} POORNIMA.EXE</span>
            <span aria-hidden="true"> · </span>
            <span>Poornima A · Reva University</span>
          </div>

          <div className="flex items-center gap-6">
            <a
              href={PERSONAL_INFO.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-cyan-400 transition-colors"
            >
              GitHub
            </a>
            <a
              href={PERSONAL_INFO.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-cyan-400 transition-colors"
            >
              LinkedIn
            </a>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1 hover:text-cyan-400 transition-colors cursor-pointer"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </footer>
      </div>
    </section>
  );
};

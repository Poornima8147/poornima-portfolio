import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Terminal as TerminalIcon, X, Maximize2, Minimize2, CornerDownLeft } from 'lucide-react';
import { PERSONAL_INFO, SKILLS_LIST, PROJECTS_LIST, EDUCATION_DATA } from '../data/portfolioData';
import { playCyberSound } from '../utils/audio';

interface CyberTerminalModalProps {
  isOpen: boolean;
  onClose: () => void;
  isMuted: boolean;
}

interface CommandLog {
  id: string;
  type: 'cmd' | 'output' | 'error' | 'system';
  content: string | React.ReactNode;
}

export const CyberTerminalModal: React.FC<CyberTerminalModalProps> = ({
  isOpen,
  onClose,
  isMuted,
}) => {
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [logs, setLogs] = useState<CommandLog[]>([
    {
      id: 'init-1',
      type: 'system',
      content: 'POORNIMA.EXE [Interactive Cyber Shell v2.026] initialized.',
    },
    {
      id: 'init-2',
      type: 'system',
      content: 'Type "help" for a list of available commands or "projects" to view software builds.',
    },
  ]);

  const inputRef = useRef<HTMLInputElement | null>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  const handleCommand = (rawCmd: string) => {
    const cmd = rawCmd.trim().toLowerCase();
    if (!cmd) return;

    playCyberSound('click', isMuted);
    setHistory((prev) => [...prev, rawCmd]);
    setHistoryIndex(-1);

    const newLogs: CommandLog[] = [
      ...logs,
      { id: Math.random().toString(), type: 'cmd', content: `> ${rawCmd}` },
    ];

    switch (cmd) {
      case 'help':
        newLogs.push({
          id: Math.random().toString(),
          type: 'output',
          content: (
            <div className="space-y-1 text-slate-300">
              <p className="text-cyan-400 font-bold mb-1">AVAILABLE COMMANDS:</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-xs">
                <div><span className="text-teal-400 font-bold">about</span> - Poornima's background & vision</div>
                <div><span className="text-teal-400 font-bold">skills</span> - List all 10 core technical skills</div>
                <div><span className="text-teal-400 font-bold">projects</span> - Inspect the 4 featured projects</div>
                <div><span className="text-teal-400 font-bold">education</span> - Reva University academic data</div>
                <div><span className="text-teal-400 font-bold">contact</span> - Email & communication details</div>
                <div><span className="text-teal-400 font-bold">socials</span> - GitHub & LinkedIn hyperlinks</div>
                <div><span className="text-teal-400 font-bold">whoami</span> - Inspect your session identity</div>
                <div><span className="text-teal-400 font-bold">clear</span> - Wipe terminal viewport</div>
                <div><span className="text-teal-400 font-bold">exit</span> - Terminate shell session</div>
              </div>
            </div>
          ),
        });
        break;

      case 'about':
        newLogs.push({
          id: Math.random().toString(),
          type: 'output',
          content: `${PERSONAL_INFO.name} (${PERSONAL_INFO.handle})\nRole: ${PERSONAL_INFO.role}\nUniversity: ${PERSONAL_INFO.university}\nFocus: ${PERSONAL_INFO.bio}`,
        });
        break;

      case 'skills':
        newLogs.push({
          id: Math.random().toString(),
          type: 'output',
          content: (
            <div className="space-y-1">
              <p className="text-cyan-400 font-bold">TECHNICAL SKILLS CATALOG:</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
                {SKILLS_LIST.map((s) => (
                  <div key={s.name} className="border-l-2 border-cyan-500/40 pl-2">
                    <span className="text-white font-bold">{s.name}</span>
                    <span className="text-slate-400 block text-[11px]">{s.category} · {s.proficiencyLabel}</span>
                  </div>
                ))}
              </div>
            </div>
          ),
        });
        break;

      case 'projects':
        newLogs.push({
          id: Math.random().toString(),
          type: 'output',
          content: (
            <div className="space-y-2">
              <p className="text-cyan-400 font-bold">FEATURED PORTFOLIO PROJECTS:</p>
              {PROJECTS_LIST.map((p) => (
                <div key={p.id} className="p-2 rounded bg-slate-950 border border-slate-800 text-xs">
                  <div className="text-cyan-300 font-bold">{p.title} <span className="text-slate-400 font-normal">({p.subtitle})</span></div>
                  <div className="text-slate-300 mt-0.5">{p.description}</div>
                  <div className="text-slate-400 text-[11px] mt-1">Tech: {p.tags.join(' · ')}</div>
                </div>
              ))}
            </div>
          ),
        });
        break;

      case 'education':
        newLogs.push({
          id: Math.random().toString(),
          type: 'output',
          content: `INSTITUTION: ${EDUCATION_DATA.institution}\nDEGREE: ${EDUCATION_DATA.degree}\nSPECIALIZATION: ${EDUCATION_DATA.field}\nLOCATION: ${EDUCATION_DATA.location}\nSTATUS: ${EDUCATION_DATA.currentStatus}`,
        });
        break;

      case 'contact':
        newLogs.push({
          id: Math.random().toString(),
          type: 'output',
          content: `EMAIL: ${PERSONAL_INFO.social.email}\nLOCATION: ${PERSONAL_INFO.location}\nGITHUB: ${PERSONAL_INFO.social.github}\nLINKEDIN: ${PERSONAL_INFO.social.linkedin}`,
        });
        break;

      case 'socials':
        newLogs.push({
          id: Math.random().toString(),
          type: 'output',
          content: (
            <div className="space-y-1 text-xs">
              <div>GitHub: <a href={PERSONAL_INFO.social.github} target="_blank" rel="noreferrer" className="text-cyan-400 underline">{PERSONAL_INFO.social.github}</a></div>
              <div>LinkedIn: <a href={PERSONAL_INFO.social.linkedin} target="_blank" rel="noreferrer" className="text-cyan-400 underline">{PERSONAL_INFO.social.linkedin}</a></div>
            </div>
          ),
        });
        break;

      case 'whoami':
        newLogs.push({
          id: Math.random().toString(),
          type: 'output',
          content: 'guest@poornima.exe [USER PRIVILEGES: RECRUITER / SOFTWARE COLLABORATOR / VISITOR]',
        });
        break;

      case 'clear':
        setLogs([]);
        setInputVal('');
        return;

      case 'exit':
      case 'quit':
        onClose();
        return;

      default:
        newLogs.push({
          id: Math.random().toString(),
          type: 'error',
          content: `Command not recognized: "${rawCmd}". Type "help" for a list of valid commands.`,
        });
        break;
    }

    setLogs(newLogs);
    setInputVal('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCommand(inputVal);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (history.length > 0) {
        const nextIdx = historyIndex === -1 ? history.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(nextIdx);
        setInputVal(history[nextIdx]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex !== -1) {
        const nextIdx = historyIndex + 1;
        if (nextIdx >= history.length) {
          setHistoryIndex(-1);
          setInputVal('');
        } else {
          setHistoryIndex(nextIdx);
          setInputVal(history[nextIdx]);
        }
      }
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        className="relative w-full max-w-3xl h-[520px] rounded-2xl border border-cyan-500/40 bg-slate-950 shadow-[0_0_60px_rgba(6,182,212,0.3)] flex flex-col overflow-hidden font-mono-code text-xs"
      >
        {/* Terminal Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-slate-900 border-b border-cyan-500/20 select-none">
          <div className="flex items-center gap-2 text-cyan-400">
            <TerminalIcon className="w-4 h-4 text-cyan-400 animate-pulse" />
            <span className="font-cyber font-bold tracking-wider">
              POORNIMA.EXE // CYBER SHELL v2.026
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[11px] text-slate-400 hidden sm:inline">Press ESC to exit</span>
            <button
              onClick={() => {
                playCyberSound('click', isMuted);
                onClose();
              }}
              className="p-1.5 rounded-lg border border-slate-700 text-slate-400 hover:text-white hover:border-cyan-400 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Console Screen */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-950/90 text-slate-200">
          {logs.map((log) => (
            <div key={log.id} className="leading-relaxed">
              {log.type === 'cmd' ? (
                <div className="text-cyan-400 font-semibold">{log.content}</div>
              ) : log.type === 'error' ? (
                <div className="text-rose-400">{log.content}</div>
              ) : log.type === 'system' ? (
                <div className="text-purple-400 font-medium">{log.content}</div>
              ) : (
                <div className="whitespace-pre-wrap text-slate-300">{log.content}</div>
              )}
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Input Bar */}
        <div className="p-3 bg-slate-900 border-t border-cyan-500/20 flex items-center gap-2">
          <span className="text-cyan-400 font-bold select-none">&gt;</span>
          <input
            ref={inputRef}
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder='Type command (e.g. "help", "projects", "skills")...'
            className="flex-1 bg-transparent border-none text-cyan-200 focus:outline-none placeholder-slate-600 text-xs"
          />
          <button
            onClick={() => handleCommand(inputVal)}
            className="p-1.5 rounded border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/20 transition-colors"
          >
            <CornerDownLeft className="w-3.5 h-3.5" />
          </button>
        </div>
      </motion.div>
    </div>
  );
};

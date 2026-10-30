import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Terminal, ShieldCheck, ChevronRight, Zap } from 'lucide-react';
import { playCyberSound } from '../utils/audio';

interface BootScreenProps {
  onComplete: () => void;
  isMuted?: boolean;
}

export const BootScreen: React.FC<BootScreenProps> = ({ onComplete, isMuted = false }) => {
  const [progress, setProgress] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);
  const [isReady, setIsReady] = useState(false);

  const bootMessages = [
    'SYSTEM_BOOT: Initializing POORNIMA.EXE kernel v2.026...',
    'IDENTITY_CHECK: Poornima A // AI & ML Student',
    'ACADEMIC_RECORDS: Verifying Reva University B.Tech foundation...',
    'SYNAPSE_INIT: Loading 10 Core Technical Skills (Python, C, React, SQL)...',
    'PROJECT_MOUNT: Mounting 4 featured engineering projects...',
    'HOLO_MATRIX: Calibrating 3D interactive core & particle emitters...',
    'STATUS_OK: All systems nominal. Launching portfolio interface.',
  ];

  useEffect(() => {
    playCyberSound('boot', isMuted);

    let currentLogIndex = 0;
    const interval = setInterval(() => {
      if (currentLogIndex < bootMessages.length) {
        setLogs((prev) => [...prev, bootMessages[currentLogIndex]]);
        currentLogIndex++;
        setProgress(Math.min(100, Math.round((currentLogIndex / bootMessages.length) * 100)));
      } else {
        clearInterval(interval);
        setIsReady(true);
        setTimeout(() => {
          onComplete();
        }, 600);
      }
    }, 280);

    return () => clearInterval(interval);
  }, []);

  const handleSkip = () => {
    playCyberSound('click', isMuted);
    onComplete();
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, scale: 1.02 }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950 text-slate-100 p-4 font-mono-code select-none"
      >
        {/* Ambient Grid Background */}
        <div className="absolute inset-0 cyber-grid opacity-40 pointer-events-none" />
        <div className="absolute inset-0 scanlines opacity-30 pointer-events-none" />

        <div className="relative w-full max-w-xl rounded-2xl border border-cyan-500/30 bg-slate-900/90 backdrop-blur-xl p-6 sm:p-8 shadow-[0_0_60px_-15px_rgba(6,182,212,0.3)]">
          {/* Top Bar */}
          <div className="flex items-center justify-between pb-4 border-b border-cyan-500/20 text-xs text-cyan-400">
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-cyan-400 animate-pulse" />
              <span className="font-cyber font-bold tracking-wider">POORNIMA.EXE // BOOTLOADER</span>
            </div>
            <span className="text-slate-400">BUILD 2026.10</span>
          </div>

          {/* Terminal log window */}
          <div className="my-6 min-h-[160px] max-h-[200px] overflow-y-auto space-y-1.5 text-xs text-slate-300 font-mono-code leading-relaxed">
            {logs.map((log, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-start gap-2"
              >
                <ChevronRight className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                <span className={index === logs.length - 1 ? 'text-cyan-300' : 'text-slate-400'}>
                  {log}
                </span>
              </motion.div>
            ))}
            {!isReady && (
              <div className="flex items-center gap-1.5 text-cyan-400 text-xs pt-1">
                <span className="inline-block w-2 h-3.5 bg-cyan-400 animate-pulse" />
                <span className="text-slate-400">Processing neural sequence...</span>
              </div>
            )}
          </div>

          {/* Progress bar */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs font-mono-code">
              <span className="text-slate-400 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                SYSTEM INITIALIZATION
              </span>
              <span className="text-cyan-400 font-bold tabular-nums">{progress}%</span>
            </div>
            <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden p-0.5 border border-cyan-500/20">
              <motion.div
                className="h-full bg-gradient-to-r from-cyan-500 via-teal-400 to-purple-500 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.2 }}
              />
            </div>
          </div>

          {/* Footer Controls */}
          <div className="mt-6 flex items-center justify-between pt-4 border-t border-cyan-500/10">
            <div className="flex items-center gap-2 text-[11px] text-slate-400">
              <Zap className="w-3.5 h-3.5 text-cyan-400" />
              <span>REVA UNIVERSITY · AI & ML</span>
            </div>
            <button
              onClick={handleSkip}
              className="px-3.5 py-1.5 text-xs font-mono-code rounded-lg border border-cyan-500/40 text-cyan-300 hover:bg-cyan-500/10 hover:border-cyan-400 transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <span>{isReady ? 'ENTER SYSTEM' : 'SKIP INTRO'}</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

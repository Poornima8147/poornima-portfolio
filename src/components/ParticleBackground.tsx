import React, { useEffect, useRef } from 'react';

interface ParticleBackgroundProps {
  reducedMotion?: boolean;
}

export const ParticleBackground: React.FC<ParticleBackgroundProps> = ({ reducedMotion = false }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (reducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    const particleCount = Math.min(50, Math.floor(window.innerWidth / 30));
    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      color: string;
      alpha: number;
    }> = [];

    const colors = ['#06b6d4', '#a855f7', '#38bdf8'];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 1.5 + 0.5,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: Math.random() * 0.4 + 0.1,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.fill();

        // Connect near particles
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 100) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = '#06b6d4';
            ctx.globalAlpha = (1 - dist / 100) * 0.08;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }

      ctx.globalAlpha = 1;
      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
    };
  }, [reducedMotion]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Background Cyber Grid */}
      <div className="absolute inset-0 cyber-grid opacity-60" />
      
      {/* Canvas for floating particles */}
      {!reducedMotion && (
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full opacity-70"
        />
      )}

      {/* Cyber ambient glow orbs */}
      <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-cyan-600/10 blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 -right-40 w-96 h-96 rounded-full bg-purple-600/10 blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-1/4 w-80 h-80 rounded-full bg-cyan-500/10 blur-[130px] pointer-events-none" />

      {/* Scanline pattern */}
      <div className="absolute inset-0 scanlines opacity-20 pointer-events-none" />
    </div>
  );
};

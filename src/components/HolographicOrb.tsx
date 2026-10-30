import React, { useEffect, useRef, useState } from 'react';
import { Sparkles, Cpu, Rotate3d } from 'lucide-react';

interface HolographicOrbProps {
  reducedMotion?: boolean;
}

export const HolographicOrb: React.FC<HolographicOrbProps> = ({ reducedMotion = false }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let angleX = 0.2;
    let angleY = 0.4;

    const resize = () => {
      if (!canvas || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener('resize', resize);

    // Core holographic points
    const numPoints = 80;
    const points: Array<{ x: number; y: number; z: number; baseRadius: number; speed: number }> = [];
    const radius = 100;

    for (let i = 0; i < numPoints; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const r = radius * (0.85 + Math.random() * 0.25);
      points.push({
        x: r * Math.sin(phi) * Math.cos(theta),
        y: r * Math.sin(phi) * Math.sin(theta),
        z: r * Math.cos(phi),
        baseRadius: 1 + Math.random() * 1.8,
        speed: 0.005 + Math.random() * 0.01,
      });
    }

    // Orbiting satellite data nodes
    const satellites = [
      { label: 'AI/ML', r: 145, tilt: 0.35, speed: 0.012, angle: 0, color: '#06b6d4' },
      { label: 'PYTHON', r: 155, tilt: -0.5, speed: -0.009, angle: 2, color: '#38bdf8' },
      { label: 'REACT', r: 165, tilt: 0.8, speed: 0.015, angle: 4, color: '#a855f7' },
      { label: 'SQL', r: 140, tilt: -0.2, speed: 0.011, angle: 1.2, color: '#06b6d4' },
      { label: 'C_CORE', r: 150, tilt: 0.6, speed: -0.013, angle: 3.4, color: '#ec4899' },
    ];

    let t = 0;

    const render = () => {
      if (!canvas || !containerRef.current) return;
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;
      const cx = width / 2;
      const cy = height / 2;

      ctx.clearRect(0, 0, width, height);

      // Smooth mouse follow interpolation
      if (!reducedMotion) {
        angleX += (targetAngleXRef.current - angleX) * 0.05;
        angleY += (targetAngleYRef.current - angleY) * 0.05;
        angleY += 0.006; // Continuous base rotation
        t += 0.02;
      }

      setCoords({
        x: Math.round(((angleY % (Math.PI * 2)) * (180 / Math.PI)) % 360),
        y: Math.round(((angleX % (Math.PI * 2)) * (180 / Math.PI)) % 360),
      });

      // 3D rotation projection helper
      const project = (x: number, y: number, z: number) => {
        // Rotate around X
        const cosX = Math.cos(angleX);
        const sinX = Math.sin(angleX);
        const y1 = y * cosX - z * sinX;
        const z1 = y * sinX + z * cosX;

        // Rotate around Y
        const cosY = Math.cos(angleY);
        const sinY = Math.sin(angleY);
        const x2 = x * cosY + z1 * sinY;
        const z2 = -x * sinY + z1 * cosY;

        // Perspective scale
        const fov = 340;
        const scale = fov / (fov + z2 + 10);
        return {
          px: cx + x2 * scale,
          py: cy + y1 * scale,
          scale,
          z: z2,
        };
      };

      // Draw center energy aura
      const radialGradient = ctx.createRadialGradient(cx, cy, 10, cx, cy, 140);
      radialGradient.addColorStop(0, 'rgba(6, 182, 212, 0.28)');
      radialGradient.addColorStop(0.5, 'rgba(168, 85, 247, 0.12)');
      radialGradient.addColorStop(1, 'rgba(3, 7, 18, 0)');
      ctx.fillStyle = radialGradient;
      ctx.beginPath();
      ctx.arc(cx, cy, 140, 0, Math.PI * 2);
      ctx.fill();

      // Draw 3 primary orbital rings
      const rings = [
        { r: 120, tiltX: 0.2, tiltZ: 0.3, color: 'rgba(6, 182, 212, 0.35)', dash: [6, 4] },
        { r: 135, tiltX: -0.4, tiltZ: -0.5, color: 'rgba(168, 85, 247, 0.35)', dash: [10, 6] },
        { r: 110, tiltX: 0.6, tiltZ: -0.2, color: 'rgba(56, 189, 248, 0.25)', dash: [] },
      ];

      rings.forEach((ring) => {
        ctx.beginPath();
        ctx.strokeStyle = ring.color;
        ctx.lineWidth = 1.2;
        ctx.setLineDash(ring.dash);

        const segments = 48;
        for (let i = 0; i <= segments; i++) {
          const theta = (i / segments) * Math.PI * 2;
          const rx = ring.r * Math.cos(theta);
          const ry = ring.r * Math.sin(theta) * Math.cos(ring.tiltX);
          const rz = ring.r * Math.sin(theta) * Math.sin(ring.tiltX);
          const p = project(rx, ry, rz);
          if (i === 0) {
            ctx.moveTo(p.px, p.py);
          } else {
            ctx.lineTo(p.px, p.py);
          }
        }
        ctx.stroke();
        ctx.setLineDash([]);
      });

      // Sort points by Z for correct depth
      const projectedPoints = points.map((pt) => {
        const p = project(pt.x, pt.y, pt.z);
        return { ...pt, ...p };
      });

      projectedPoints.sort((a, b) => a.z - b.z);

      // Connect near points with delicate cyber lines
      for (let i = 0; i < projectedPoints.length; i++) {
        for (let j = i + 1; j < projectedPoints.length; j++) {
          const dx = projectedPoints[i].px - projectedPoints[j].px;
          const dy = projectedPoints[i].py - projectedPoints[j].py;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 45 && projectedPoints[i].z > -40) {
            ctx.beginPath();
            const alpha = Math.max(0, (1 - dist / 45) * 0.25);
            ctx.strokeStyle = `rgba(6, 182, 212, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.moveTo(projectPointsSafe(projectedPoints[i].px), projectPointsSafe(projectedPoints[i].py));
            ctx.lineTo(projectPointsSafe(projectedPoints[j].px), projectPointsSafe(projectedPoints[j].py));
            ctx.stroke();
          }
        }
      }

      // Draw 3D points
      projectedPoints.forEach((p) => {
        ctx.beginPath();
        const ptRadius = Math.max(0.5, p.baseRadius * p.scale);
        const alpha = Math.min(1, Math.max(0.2, (p.z + radius) / (radius * 2)));
        ctx.fillStyle = p.z > 0 ? `rgba(6, 182, 212, ${alpha})` : `rgba(168, 85, 247, ${alpha * 0.7})`;
        ctx.arc(p.px, p.py, ptRadius, 0, Math.PI * 2);
        ctx.fill();
      });

      // Render orbiting satellites
      satellites.forEach((sat) => {
        if (!reducedMotion) {
          sat.angle += sat.speed;
        }
        const sx = sat.r * Math.cos(sat.angle);
        const sy = sat.r * Math.sin(sat.angle) * Math.sin(sat.tilt);
        const sz = sat.r * Math.sin(sat.angle) * Math.cos(sat.tilt);
        const sp = project(sx, sy, sz);

        // Satellite point
        ctx.beginPath();
        ctx.fillStyle = sat.color;
        ctx.arc(sp.px, sp.py, 3.5 * sp.scale, 0, Math.PI * 2);
        ctx.fill();

        // Holographic label
        if (sp.z > -30) {
          ctx.font = '10px "JetBrains Mono", monospace';
          ctx.fillStyle = 'rgba(243, 244, 246, 0.85)';
          ctx.fillText(`[${sat.label}]`, sp.px + 8, sp.py + 3);
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    const projectPointsSafe = (val: number) => (isNaN(val) ? 0 : val);

    render();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [reducedMotion]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current || reducedMotion) return;
    const rect = containerRef.current.getBoundingClientRect();
    const mx = (e.clientX - rect.left) / rect.width - 0.5;
    const my = (e.clientY - rect.top) / rect.height - 0.5;
    // Set target angles
    targetAngleYRef.current = mx * Math.PI;
    targetAngleXRef.current = -my * Math.PI * 0.7;
  };

  const targetAngleXRef = useRef(0.2);
  const targetAngleYRef = useRef(0.4);

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        targetAngleXRef.current = 0.2;
        targetAngleYRef.current = 0.4;
      }}
      className="relative w-full aspect-square max-w-[420px] mx-auto rounded-3xl border border-cyan-500/20 bg-slate-950/60 backdrop-blur-md p-4 flex flex-col justify-between overflow-hidden shadow-[0_0_50px_-10px_rgba(6,182,212,0.15)] group"
    >
      {/* Decorative corner brackets */}
      <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-cyan-400" />
      <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-cyan-400" />
      <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-cyan-400" />
      <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-cyan-400" />

      {/* Top telemetry HUD */}
      <div className="flex items-center justify-between text-[11px] font-mono-code text-cyan-400/80 z-10 select-none">
        <div className="flex items-center gap-1.5">
          <Cpu className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
          <span>CYBER_CORE // LIVE</span>
        </div>
        <div className="flex items-center gap-2 text-slate-400">
          <span>THETA: {coords.x}°</span>
          <span>PHI: {coords.y}°</span>
        </div>
      </div>

      {/* Interactive 3D Canvas */}
      <canvas
        ref={canvasRef}
        className="w-full h-full cursor-grab active:cursor-grabbing my-auto"
      />

      {/* Bottom telemetry readout */}
      <div className="flex items-center justify-between text-[11px] font-mono-code text-slate-400 z-10 select-none pt-2 border-t border-cyan-500/10">
        <div className="flex items-center gap-1">
          <Rotate3d className="w-3 h-3 text-purple-400" />
          <span className="text-slate-300">INTERACTIVE 3D HOLOGRAPH</span>
        </div>
        <div className="flex items-center gap-1.5 text-cyan-400">
          <Sparkles className="w-3 h-3 text-cyan-400" />
          <span>{isHovered ? 'SYNCHRONIZING' : 'STABLE'}</span>
        </div>
      </div>
    </div>
  );
};

import React, { useEffect, useState } from 'react';

interface MouseGlowProps {
  reducedMotion?: boolean;
}

export const MouseGlow: React.FC<MouseGlowProps> = ({ reducedMotion = false }) => {
  const [pos, setPos] = useState({ x: -200, y: -200 });

  useEffect(() => {
    if (reducedMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [reducedMotion]);

  if (reducedMotion) return null;

  return (
    <div
      className="fixed pointer-events-none z-10 transition-transform duration-75 ease-out"
      style={{
        left: 0,
        top: 0,
        transform: `translate3d(${pos.x - 250}px, ${pos.y - 250}px, 0)`,
        width: '500px',
        height: '500px',
        background: 'radial-gradient(circle, rgba(6, 182, 212, 0.08) 0%, rgba(168, 85, 247, 0.03) 40%, transparent 70%)',
        borderRadius: '50%',
      }}
    />
  );
};

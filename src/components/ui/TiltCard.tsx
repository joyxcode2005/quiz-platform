import React, { useRef, useState } from 'react';

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

const REST_STYLE: React.CSSProperties = {
  transform: 'perspective(900px) rotateX(0deg) rotateY(0deg) translateZ(0px)',
  boxShadow: '5px 5px 0 0 var(--ink)',
};

export const TiltCard: React.FC<TiltCardProps> = ({ children, className = '', style }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [tiltStyle, setTiltStyle] = useState<React.CSSProperties>(REST_STYLE);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    const rotateY = (px - 0.5) * 8;
    const rotateX = (0.5 - py) * 8;
    setTiltStyle({
      transform: `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(6px)`,
      boxShadow: '10px 12px 0 0 var(--ink)',
    });
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setTiltStyle(REST_STYLE)}
      style={{ transition: 'transform 0.15s ease, box-shadow 0.15s ease', ...style, ...tiltStyle }}
      className={`brutal-border will-change-transform ${className}`}
    >
      {children}
    </div>
  );
};
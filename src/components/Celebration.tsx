"use client";

import { useEffect, useState } from "react";

interface CelebrationProps {
  streak: number;
}

const confettiColors = ['#c4956a', '#e8b4b8', '#ff9800', '#81c784', '#fce4ec', '#a67b52'];

function ConfettiPiece({ index }: { index: number }) {
  const left = Math.random() * 100;
  const delay = Math.random() * 2;
  const duration = 2 + Math.random() * 2;
  const color = confettiColors[index % confettiColors.length];
  const size = 6 + Math.random() * 8;

  return (
    <div
      className="animate-confetti fixed pointer-events-none"
      style={{
        left: `${left}%`,
        top: '-20px',
        width: `${size}px`,
        height: `${size}px`,
        background: color,
        borderRadius: Math.random() > 0.5 ? '50%' : '2px',
        animationDelay: `${delay}s`,
        animationDuration: `${duration}s`,
        zIndex: 100,
      }}
    />
  );
}

function Particle({ index }: { index: number }) {
  const angle = (index / 12) * Math.PI * 2;
  const distance = 80 + Math.random() * 60;
  const tx = Math.cos(angle) * distance;
  const ty = Math.sin(angle) * distance;
  const color = confettiColors[index % confettiColors.length];

  return (
    <div
      className="absolute rounded-full pointer-events-none"
      style={{
        width: '8px',
        height: '8px',
        background: color,
        left: '50%',
        top: '50%',
        marginLeft: '-4px',
        marginTop: '-4px',
        animation: `particle-burst 1s ease-out forwards`,
        animationDelay: `${index * 0.05}s`,
        // @ts-expect-error CSS custom properties
        '--tx': `${tx}px`,
        '--ty': `${ty}px`,
      }}
    />
  );
}

const messages = [
  "Cada día mejor",
  "Tu inglés mejora día a día",
  "Constancia = resultados",
  "Tus clientes lo notarán",
  "Sigue así, vas genial",
  "El esfuerzo vale la pena",
  "Profesional y bilingüe",
];

export default function Celebration({ streak }: CelebrationProps) {
  const [show, setShow] = useState(false);
  const message = messages[streak % messages.length];

  useEffect(() => {
    const t = setTimeout(() => setShow(true), 100);
    return () => clearTimeout(t);
  }, []);

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ background: 'rgba(253,248,245,0.95)' }}>
      {/* Confetti */}
      {Array.from({ length: 40 }).map((_, i) => (
        <ConfettiPiece key={`c-${i}`} index={i} />
      ))}

      {/* Center content */}
      <div className="relative flex flex-col items-center gap-6 animate-celebration-scale">
        {/* Particles */}
        {Array.from({ length: 12 }).map((_, i) => (
          <Particle key={`p-${i}`} index={i} />
        ))}

        {/* Glow circle */}
        <div
          className="w-40 h-40 rounded-full flex items-center justify-center animate-celebration-glow"
          style={{ background: 'linear-gradient(135deg, #fce4ec, #fff)' }}
        >
          <div className="flex flex-col items-center">
            <span className="text-5xl animate-streak-pulse">🔥</span>
            <span
              className="text-5xl font-black mt-1"
              style={{ color: '#ff9800' }}
            >
              {streak}
            </span>
          </div>
        </div>

        {/* Text */}
        <div className="text-center animate-slide-up" style={{ animationDelay: '0.3s' }}>
          <h2 className="text-2xl font-bold" style={{ color: '#3e2723' }}>
            {streak === 1 ? '¡Primer día completado!' : `¡Día ${streak} completado!`}
          </h2>
          <p className="text-lg mt-2" style={{ color: '#c4956a' }}>
            {message}
          </p>
        </div>

        {/* Floating emojis */}
        {['✨', '💪', '🌟', '💫'].map((emoji, i) => (
          <span
            key={emoji}
            className="absolute text-2xl animate-float-up pointer-events-none"
            style={{
              left: `${20 + i * 20}%`,
              bottom: '-20px',
              animationDelay: `${0.5 + i * 0.3}s`,
            }}
          >
            {emoji}
          </span>
        ))}

        {/* Shimmer overlay */}
        <div className="absolute inset-0 animate-shimmer rounded-3xl pointer-events-none" />
      </div>
    </div>
  );
}

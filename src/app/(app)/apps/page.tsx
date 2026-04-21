"use client";

import { ExternalLink } from "lucide-react";

export default function AppsPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-6 text-center">
      <div className="text-5xl mb-4">🚀</div>
      <h1 className="text-2xl font-bold mb-2" style={{ color: '#3e2723' }}>
        Más apps
      </h1>
      <p className="text-sm mb-6" style={{ color: '#9e9e9e' }}>
        Descubre otras herramientas útiles
      </p>
      <a
        href="https://franciscocucullu.com/apps"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 px-6 py-3 rounded-xl font-medium text-white transition-all active:scale-[0.98]"
        style={{ background: '#c4956a' }}
      >
        <ExternalLink size={18} />
        Ver todas las apps
      </a>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import { ExternalLink, Sparkles, Globe } from "lucide-react";

interface AppEntry {
  slug: string;
  title: string;
  description: string;
  url: string;
  img: string;
  tags: string[];
  status: "live" | "beta" | "offline";
}

const statusConfig: Record<string, { label: string; bg: string; text: string; dot: string }> = {
  live: { label: "Live", bg: "bg-[#c4956a]/10", text: "text-[#c4956a]", dot: "bg-[#c4956a]" },
  beta: { label: "Beta", bg: "bg-amber-500/10", text: "text-amber-400", dot: "bg-amber-400" },
  offline: { label: "Offline", bg: "bg-zinc-500/10", text: "text-zinc-400", dot: "bg-zinc-400" },
};

export default function AppsPage() {
  const [apps, setApps] = useState<AppEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch("https://franciscocucullu.com/api/apps.json")
      .then((res) => { if (!res.ok) throw new Error(); return res.json(); })
      .then((data) => setApps(data))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-medium uppercase tracking-widest mb-4" style={{ background: "rgba(196,149,106,0.1)", color: "#c4956a" }}>
          <Sparkles className="w-3 h-3" />
          Indie Dev
        </div>
        <h1 className="text-3xl font-bold mb-3" style={{ color: "#3e2723" }}>Más Apps</h1>
        <p className="text-sm leading-relaxed max-w-xs mx-auto" style={{ color: "#9e9e9e" }}>
          Proyectos creados desde cero. Diseñados, programados y mantenidos en solitario.
        </p>
      </div>
      <div className="space-y-4">
        {loading && <div className="text-center py-8 text-sm" style={{ color: "#9e9e9e" }}>Cargando apps...</div>}
        {error && <div className="text-center py-8 text-sm" style={{ color: "#9e9e9e" }}>No se pudieron cargar. <a href="https://franciscocucullu.com/apps/" target="_blank" className="underline" style={{ color: "#c4956a" }}>Ver en la web</a></div>}
        {apps.map((app) => {
          const status = statusConfig[app.status] || statusConfig.live;
          return (
            <a key={app.slug} href={app.url} target="_blank" rel="noopener noreferrer" className="block bg-white rounded-2xl border transition-all overflow-hidden" style={{ borderColor: "#f0e6e0" }}>
              <div className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0" style={{ background: "rgba(196,149,106,0.1)" }}>
                      <Globe className="w-5 h-5" style={{ color: "#c4956a" }} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-base leading-tight" style={{ color: "#3e2723" }}>{app.title}</h3>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {app.tags.slice(0, 3).map((tag) => (
                          <span key={tag} className="text-[10px] px-1.5 py-0.5 rounded-full" style={{ background: "rgba(196,149,106,0.1)", color: "#9e9e9e" }}>{tag}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-medium ${status.bg} ${status.text} shrink-0`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${status.dot}`} />
                    {status.label}
                  </span>
                </div>
                <p className="text-xs leading-relaxed" style={{ color: "#9e9e9e" }}>{app.description}</p>
                <div className="inline-flex items-center gap-1.5 mt-4 text-xs font-medium" style={{ color: "#c4956a" }}>
                  Abrir App <ExternalLink className="w-3 h-3" />
                </div>
              </div>
            </a>
          );
        })}
      </div>
      <div className="text-center mt-8 mb-4">
        <a href="https://franciscocucullu.com/apps/" target="_blank" className="text-[11px]" style={{ color: "#9e9e9e" }}>Ver todo en franciscocucullu.com</a>
      </div>
    </div>
  );
}

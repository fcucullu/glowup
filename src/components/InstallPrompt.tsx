"use client";

import { useState, useEffect } from "react";
import { Download, X } from "lucide-react";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export default function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };
    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  if (!deferredPrompt || dismissed) return null;

  const handleInstall = async () => {
    await deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === "accepted") {
      setDeferredPrompt(null);
    }
  };

  return (
    <div
      className="fixed bottom-20 left-4 right-4 z-40 flex items-center gap-3 p-4 rounded-2xl shadow-lg border"
      style={{ background: '#ffffff', borderColor: '#f0e6e0' }}
    >
      <div className="flex-1">
        <p className="text-sm font-semibold" style={{ color: '#3e2723' }}>
          Instalar GlowUp
        </p>
        <p className="text-xs" style={{ color: '#9e9e9e' }}>
          Acceso rápido desde tu pantalla de inicio
        </p>
      </div>
      <button
        onClick={handleInstall}
        className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium text-white"
        style={{ background: '#c4956a' }}
      >
        <Download size={16} />
        Instalar
      </button>
      <button onClick={() => setDismissed(true)} className="p-1">
        <X size={18} style={{ color: '#9e9e9e' }} />
      </button>
    </div>
  );
}

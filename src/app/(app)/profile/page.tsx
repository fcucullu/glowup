"use client";

import { useState, useEffect, useCallback } from "react";
import { LogOut, MessageCircle, Flame, Target, Calendar, BookOpen } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

const levels = [
  { min: 0, name: "Principiante", emoji: "🌱" },
  { min: 10, name: "Aprendiz", emoji: "📚" },
  { min: 30, name: "Intermedio", emoji: "⭐" },
  { min: 60, name: "Avanzado", emoji: "🌟" },
  { min: 100, name: "Profesional", emoji: "👑" },
];

function getLevel(totalExercises: number) {
  for (let i = levels.length - 1; i >= 0; i--) {
    if (totalExercises >= levels[i].min) return { level: i + 1, ...levels[i] };
  }
  return { level: 1, ...levels[0] };
}

export default function ProfilePage() {
  const [email, setEmail] = useState("");
  const [streak, setStreak] = useState(0);
  const [totalExercises, setTotalExercises] = useState(0);
  const [daysActive, setDaysActive] = useState(0);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const supabase = createClient();

  const loadStats = useCallback(async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    setEmail(user.email || "");

    const { data: completions } = await supabase
      .from("glowup_completions")
      .select("date, exercises_done")
      .eq("user_id", user.id)
      .order("date", { ascending: false });

    if (completions) {
      setDaysActive(completions.length);
      setTotalExercises(completions.reduce((sum, c) => sum + (c.exercises_done || 0), 0));

      // Calculate streak
      let s = 0;
      const now = new Date();
      for (let i = 0; i < 365; i++) {
        const d = new Date(now);
        d.setDate(d.getDate() - i);
        const dateStr = d.toISOString().split("T")[0];
        if (completions.some((c) => c.date === dateStr)) {
          s++;
        } else if (i > 0) {
          break;
        }
      }
      setStreak(s);
    }

    setLoading(false);
  }, [supabase]);

  useEffect(() => {
    loadStats();
  }, [loadStats]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  const levelInfo = getLevel(totalExercises);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-8 h-8 border-3 border-t-transparent rounded-full animate-spin" style={{ borderColor: '#c4956a', borderTopColor: 'transparent' }} />
      </div>
    );
  }

  return (
    <div className="px-4 pt-6 pb-8 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-5" style={{ color: '#3e2723' }}>Mi perfil</h1>

      {/* Email */}
      <div className="rounded-2xl border p-4 mb-4" style={{ background: '#ffffff', borderColor: '#f0e6e0' }}>
        <p className="text-xs" style={{ color: '#9e9e9e' }}>Cuenta</p>
        <p className="text-sm font-medium mt-0.5" style={{ color: '#3e2723' }}>{email}</p>
      </div>

      {/* Streak */}
      <div className="rounded-2xl border p-5 mb-4 text-center" style={{ background: '#ffffff', borderColor: '#f0e6e0' }}>
        <Flame size={36} style={{ color: '#ff9800', margin: '0 auto' }} />
        <p className="text-4xl font-black mt-2" style={{ color: '#ff9800' }}>{streak}</p>
        <p className="text-sm" style={{ color: '#9e9e9e' }}>
          {streak === 1 ? 'día de racha' : 'días de racha'}
        </p>
      </div>

      {/* Level */}
      <div className="rounded-2xl border p-4 mb-4" style={{ background: '#ffffff', borderColor: '#f0e6e0' }}>
        <div className="flex items-center gap-3">
          <span className="text-3xl">{levelInfo.emoji}</span>
          <div>
            <p className="text-xs" style={{ color: '#9e9e9e' }}>Nivel {levelInfo.level}</p>
            <p className="font-semibold text-sm" style={{ color: '#3e2723' }}>{levelInfo.name}</p>
          </div>
        </div>
        {/* Progress to next level */}
        {levelInfo.level < 5 && (
          <div className="mt-3">
            <div className="h-2 rounded-full overflow-hidden" style={{ background: '#f0e6e0' }}>
              <div
                className="h-full rounded-full"
                style={{
                  width: `${Math.min(100, ((totalExercises - levelInfo.min) / (levels[levelInfo.level].min - levelInfo.min)) * 100)}%`,
                  background: 'linear-gradient(90deg, #c4956a, #e8b4b8)',
                }}
              />
            </div>
            <p className="text-xs mt-1" style={{ color: '#9e9e9e' }}>
              {levels[levelInfo.level].min - totalExercises} ejercicios para el siguiente nivel
            </p>
          </div>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 mb-4">
        <div className="rounded-2xl border p-3 text-center" style={{ background: '#ffffff', borderColor: '#f0e6e0' }}>
          <Target size={20} style={{ color: '#c4956a', margin: '0 auto' }} />
          <p className="text-xl font-bold mt-1" style={{ color: '#3e2723' }}>{totalExercises}</p>
          <p className="text-[10px]" style={{ color: '#9e9e9e' }}>Ejercicios</p>
        </div>
        <div className="rounded-2xl border p-3 text-center" style={{ background: '#ffffff', borderColor: '#f0e6e0' }}>
          <Calendar size={20} style={{ color: '#c4956a', margin: '0 auto' }} />
          <p className="text-xl font-bold mt-1" style={{ color: '#3e2723' }}>{daysActive}</p>
          <p className="text-[10px]" style={{ color: '#9e9e9e' }}>Días activos</p>
        </div>
        <div className="rounded-2xl border p-3 text-center" style={{ background: '#ffffff', borderColor: '#f0e6e0' }}>
          <BookOpen size={20} style={{ color: '#c4956a', margin: '0 auto' }} />
          <p className="text-xl font-bold mt-1" style={{ color: '#3e2723' }}>{Math.min(totalExercises * 2, 46)}</p>
          <p className="text-[10px]" style={{ color: '#9e9e9e' }}>Frases</p>
        </div>
      </div>

      {/* Chat with Fran */}
      <a
        href="https://wa.me/5491123456789?text=Hola%20Fran!%20Tengo%20una%20consulta%20sobre%20GlowUp"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-3 w-full p-4 rounded-2xl border mb-4 transition-all active:scale-[0.98]"
        style={{ background: '#ffffff', borderColor: '#f0e6e0' }}
      >
        <MessageCircle size={22} style={{ color: '#25D366' }} />
        <div>
          <p className="text-sm font-medium" style={{ color: '#3e2723' }}>Chatear con Fran</p>
          <p className="text-xs" style={{ color: '#9e9e9e' }}>¿Dudas? ¡Escríbeme por WhatsApp!</p>
        </div>
      </a>

      {/* Sign out */}
      <button
        onClick={handleSignOut}
        className="flex items-center gap-3 w-full p-4 rounded-2xl border transition-all active:scale-[0.98]"
        style={{ background: '#ffffff', borderColor: '#f0e6e0' }}
      >
        <LogOut size={20} style={{ color: '#e57373' }} />
        <span className="text-sm font-medium" style={{ color: '#e57373' }}>Cerrar sesión</span>
      </button>
    </div>
  );
}

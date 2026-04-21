"use client";

import { useState, useEffect, useCallback } from "react";
import { Volume2, Mic, ChevronRight, CheckCircle2, XCircle } from "lucide-react";
import { getDailyExercises, speakText, type Exercise } from "@/lib/exercises";
import { createClient } from "@/lib/supabase/client";
import Celebration from "@/components/Celebration";

export default function DailyPage() {
  const [exercises] = useState<Exercise[]>(() => getDailyExercises());
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [alreadyDone, setAlreadyDone] = useState(false);
  const [streak, setStreak] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);
  const [loading, setLoading] = useState(true);

  const supabase = createClient();

  const checkTodayStatus = useCallback(async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const today = new Date().toISOString().split("T")[0];

    // Check if already done today
    const { data: todayCompletion } = await supabase
      .from("glowup_completions")
      .select("*")
      .eq("user_id", user.id)
      .eq("date", today)
      .maybeSingle();

    if (todayCompletion && todayCompletion.exercises_done >= 5) {
      setAlreadyDone(true);
    }

    // Calculate streak
    const { data: completions } = await supabase
      .from("glowup_completions")
      .select("date")
      .eq("user_id", user.id)
      .order("date", { ascending: false })
      .limit(60);

    if (completions) {
      let s = 0;
      const now = new Date();
      for (let i = 0; i < 60; i++) {
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
    checkTodayStatus();
  }, [checkTodayStatus]);

  const handleAnswer = (answer: string) => {
    if (showResult) return;
    setSelectedAnswer(answer);
    setShowResult(true);
  };

  const handleNext = async () => {
    if (currentIndex < exercises.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      // Completed all 5
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const today = new Date().toISOString().split("T")[0];
        await supabase.from("glowup_completions").upsert(
          { user_id: user.id, date: today, exercises_done: 5 },
          { onConflict: "user_id,date" }
        );
      }
      setStreak((prev) => prev + 1);
      setCompleted(true);
      setShowCelebration(true);
    }
  };

  const handlePronunciation = (text: string) => {
    speakText(text);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-8 h-8 border-3 border-t-transparent rounded-full animate-spin" style={{ borderColor: '#c4956a', borderTopColor: 'transparent' }} />
      </div>
    );
  }

  if (alreadyDone) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] px-6 text-center">
        <div className="text-6xl mb-4">🎉</div>
        <h1 className="text-2xl font-bold mb-2" style={{ color: '#3e2723' }}>
          ¡Ejercicio del día completado!
        </h1>
        <div className="flex items-center gap-2 mt-4 mb-6">
          <span className="text-4xl">🔥</span>
          <span className="text-4xl font-black" style={{ color: '#ff9800' }}>
            {streak}
          </span>
          <span className="text-lg" style={{ color: '#9e9e9e' }}>
            {streak === 1 ? 'día' : 'días'} seguidos
          </span>
        </div>
        <p className="text-base" style={{ color: '#9e9e9e' }}>
          ¡Vuelve mañana para seguir aprendiendo!
        </p>
        <p className="text-sm mt-2" style={{ color: '#c4956a' }}>
          Mientras tanto, repasa las frases en la sección &quot;Frases&quot;
        </p>
      </div>
    );
  }

  if (showCelebration && completed) {
    return (
      <div>
        <Celebration streak={streak} />
        <div className="fixed bottom-24 left-0 right-0 z-50 flex justify-center px-6">
          <button
            onClick={() => {
              setShowCelebration(false);
              setAlreadyDone(true);
            }}
            className="w-full max-w-sm py-3.5 rounded-xl font-semibold text-white text-base transition-all active:scale-[0.98]"
            style={{ background: '#c4956a' }}
          >
            Continuar
          </button>
        </div>
      </div>
    );
  }

  const exercise = exercises[currentIndex];
  const isCorrect = selectedAnswer === exercise.correct_answer;

  return (
    <div className="px-4 pt-6 pb-8 max-w-lg mx-auto">
      {/* Progress */}
      <div className="flex items-center gap-3 mb-6">
        <div className="flex-1 h-2 rounded-full overflow-hidden" style={{ background: '#f0e6e0' }}>
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{
              width: `${((currentIndex + (showResult ? 1 : 0)) / exercises.length) * 100}%`,
              background: 'linear-gradient(90deg, #c4956a, #e8b4b8)',
            }}
          />
        </div>
        <span className="text-sm font-medium" style={{ color: '#9e9e9e' }}>
          {currentIndex + 1}/{exercises.length}
        </span>
      </div>

      {/* Exercise */}
      <div className="rounded-2xl p-5 border mb-6" style={{ background: '#ffffff', borderColor: '#f0e6e0' }}>
        {/* Type badge */}
        <div className="flex items-center gap-2 mb-4">
          <span
            className="text-xs font-medium px-2.5 py-1 rounded-full"
            style={{ background: '#fce4ec', color: '#a67b52' }}
          >
            {exercise.type === 'listen_identify' && '🔊 Escucha'}
            {exercise.type === 'respond_choose' && '💬 Responde'}
            {exercise.type === 'phrase_complete' && '✏️ Completa'}
            {exercise.type === 'pronunciation' && '🎤 Pronunciación'}
          </span>
        </div>

        {/* Question */}
        <p className="text-base mb-1" style={{ color: '#3e2723' }}>
          {exercise.question_es}
        </p>

        {/* Audio button for listen_identify and pronunciation */}
        {(exercise.type === 'listen_identify' || exercise.type === 'pronunciation') && exercise.audio_text && (
          <button
            onClick={() => handlePronunciation(exercise.audio_text!)}
            className="flex items-center gap-2 mt-3 mb-4 px-4 py-2.5 rounded-xl text-sm font-medium transition-all active:scale-[0.97]"
            style={{ background: '#fce4ec', color: '#a67b52' }}
          >
            <Volume2 size={18} />
            {exercise.type === 'pronunciation' ? 'Escuchar frase' : 'Escuchar'}
          </button>
        )}

        {/* Show phrase for pronunciation */}
        {exercise.type === 'pronunciation' && (
          <div className="mt-3 mb-4 p-4 rounded-xl" style={{ background: '#fdf8f5' }}>
            <p className="text-lg font-semibold" style={{ color: '#3e2723' }}>
              {exercise.question_en}
            </p>
            <div className="flex items-center gap-2 mt-2">
              <Mic size={16} style={{ color: '#c4956a' }} />
              <span className="text-sm" style={{ color: '#c4956a' }}>
                Practica en voz alta
              </span>
            </div>
          </div>
        )}

        {/* Show english phrase for listen_identify */}
        {exercise.type === 'listen_identify' && !showResult && (
          <p className="text-sm mt-2 italic" style={{ color: '#9e9e9e' }}>
            Escucha y selecciona la traducción correcta
          </p>
        )}

        {/* Options */}
        {exercise.type !== 'pronunciation' && exercise.options && exercise.options.length > 0 && (
          <div className="flex flex-col gap-2.5 mt-4">
            {exercise.options.map((option) => {
              let bg = '#ffffff';
              let border = '#f0e6e0';
              let textColor = '#3e2723';

              if (showResult) {
                if (option === exercise.correct_answer) {
                  bg = '#e8f5e9';
                  border = '#81c784';
                  textColor = '#2e7d32';
                } else if (option === selectedAnswer && option !== exercise.correct_answer) {
                  bg = '#ffebee';
                  border = '#e57373';
                  textColor = '#c62828';
                }
              } else if (selectedAnswer === option) {
                bg = '#fce4ec';
                border = '#c4956a';
              }

              return (
                <button
                  key={option}
                  onClick={() => handleAnswer(option)}
                  disabled={showResult}
                  className="w-full text-left p-3.5 rounded-xl border text-sm transition-all active:scale-[0.98]"
                  style={{ background: bg, borderColor: border, color: textColor }}
                >
                  {option}
                </button>
              );
            })}
          </div>
        )}

        {/* Pronunciation "done" button */}
        {exercise.type === 'pronunciation' && !showResult && (
          <button
            onClick={() => {
              setSelectedAnswer(exercise.correct_answer);
              setShowResult(true);
            }}
            className="w-full mt-4 py-3 rounded-xl font-medium text-white text-sm transition-all active:scale-[0.98]"
            style={{ background: '#c4956a' }}
          >
            Ya practiqué esta frase
          </button>
        )}
      </div>

      {/* Result */}
      {showResult && (
        <div
          className="rounded-2xl p-4 border mb-6 animate-slide-up"
          style={{
            background: exercise.type === 'pronunciation' || isCorrect ? '#e8f5e9' : '#ffebee',
            borderColor: exercise.type === 'pronunciation' || isCorrect ? '#81c784' : '#e57373',
          }}
        >
          <div className="flex items-start gap-3">
            {exercise.type === 'pronunciation' || isCorrect ? (
              <CheckCircle2 size={22} style={{ color: '#2e7d32', flexShrink: 0, marginTop: 2 }} />
            ) : (
              <XCircle size={22} style={{ color: '#c62828', flexShrink: 0, marginTop: 2 }} />
            )}
            <div>
              <p className="font-semibold text-sm" style={{ color: exercise.type === 'pronunciation' || isCorrect ? '#2e7d32' : '#c62828' }}>
                {exercise.type === 'pronunciation' ? '¡Bien hecho!' : isCorrect ? '¡Correcto!' : 'Incorrecto'}
              </p>
              <p className="text-sm mt-1" style={{ color: '#3e2723' }}>
                {exercise.explanation_es}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Next button */}
      {showResult && (
        <button
          onClick={handleNext}
          className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-semibold text-white text-base transition-all active:scale-[0.98]"
          style={{ background: '#c4956a' }}
        >
          {currentIndex < exercises.length - 1 ? (
            <>
              Siguiente <ChevronRight size={18} />
            </>
          ) : (
            'Ver resultados'
          )}
        </button>
      )}
    </div>
  );
}

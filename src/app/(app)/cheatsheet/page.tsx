"use client";

import { useState } from "react";
import { Volume2, ChevronDown, ChevronUp, Search } from "lucide-react";
import { phrases, categories, speakText } from "@/lib/exercises";

export default function CheatsheetPage() {
  const [openCategory, setOpenCategory] = useState<string | null>("greetings");
  const [search, setSearch] = useState("");

  const filteredPhrases = search.trim()
    ? phrases.filter(
        (p) =>
          p.english.toLowerCase().includes(search.toLowerCase()) ||
          p.spanish.toLowerCase().includes(search.toLowerCase())
      )
    : null;

  return (
    <div className="px-4 pt-6 pb-8 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-1" style={{ color: '#3e2723' }}>
        Frases útiles
      </h1>
      <p className="text-sm mb-5" style={{ color: '#9e9e9e' }}>
        Tu guía rápida de frases en inglés
      </p>

      {/* Search */}
      <div className="relative mb-5">
        <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: '#9e9e9e' }} />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar frases..."
          className="w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm outline-none transition-colors focus:border-[#c4956a]"
          style={{ background: '#ffffff', borderColor: '#f0e6e0', color: '#3e2723' }}
        />
      </div>

      {/* Search results */}
      {filteredPhrases ? (
        <div className="flex flex-col gap-3">
          {filteredPhrases.length === 0 ? (
            <p className="text-center py-8 text-sm" style={{ color: '#9e9e9e' }}>
              No se encontraron frases
            </p>
          ) : (
            filteredPhrases.map((phrase) => (
              <PhraseCard key={phrase.id} phrase={phrase} />
            ))
          )}
        </div>
      ) : (
        /* Accordion by category */
        <div className="flex flex-col gap-3">
          {categories.map((cat) => {
            const isOpen = openCategory === cat.id;
            const catPhrases = phrases.filter((p) => p.category === cat.id);

            return (
              <div
                key={cat.id}
                className="rounded-2xl border overflow-hidden"
                style={{ background: '#ffffff', borderColor: '#f0e6e0' }}
              >
                <button
                  onClick={() => setOpenCategory(isOpen ? null : cat.id)}
                  className="w-full flex items-center justify-between p-4 text-left"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{cat.icon}</span>
                    <span className="font-semibold text-sm" style={{ color: '#3e2723' }}>
                      {cat.name}
                    </span>
                    <span
                      className="text-xs px-2 py-0.5 rounded-full"
                      style={{ background: '#fce4ec', color: '#a67b52' }}
                    >
                      {catPhrases.length}
                    </span>
                  </div>
                  {isOpen ? (
                    <ChevronUp size={18} style={{ color: '#9e9e9e' }} />
                  ) : (
                    <ChevronDown size={18} style={{ color: '#9e9e9e' }} />
                  )}
                </button>

                {isOpen && (
                  <div className="px-4 pb-4 flex flex-col gap-3">
                    {catPhrases.map((phrase) => (
                      <PhraseCard key={phrase.id} phrase={phrase} />
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function PhraseCard({ phrase }: { phrase: typeof phrases[0] }) {
  return (
    <div className="rounded-xl p-3.5 border" style={{ background: '#fdf8f5', borderColor: '#f0e6e0' }}>
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1">
          <p className="font-semibold text-sm" style={{ color: '#3e2723' }}>
            {phrase.english}
          </p>
          <p className="text-xs mt-1" style={{ color: '#9e9e9e' }}>
            {phrase.spanish}
          </p>
          <p className="text-xs mt-1.5 italic" style={{ color: '#c4956a' }}>
            💡 {phrase.pronunciation_tip}
          </p>
        </div>
        <button
          onClick={() => speakText(phrase.audio_text)}
          className="flex-shrink-0 w-9 h-9 flex items-center justify-center rounded-full transition-all active:scale-90"
          style={{ background: '#fce4ec' }}
        >
          <Volume2 size={16} style={{ color: '#a67b52' }} />
        </button>
      </div>
    </div>
  );
}

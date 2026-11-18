import { useEffect, useState } from 'react';
import { questions } from '../data/questions';
import type { Answer } from '../lib/readiness';

interface Props {
  index: number;
  answers: Record<string, Answer>;
  showEn: boolean;
  onAnswer: (a: Answer) => void;
  onJump: (i: number) => void;
  onSubmit: () => void;
}

export const skillLabel = { vocabulary: 'Vocabulary', grammar: 'Grammar', reading: 'Reading' } as const;

function Translation({ children }: { children: React.ReactNode }) {
  return <p className="mt-1 text-sm italic text-brand-700">🇬🇧 {children}</p>;
}

export default function Quiz({ index, answers, showEn, onAnswer, onJump, onSubmit }: Props) {
  const q = questions[index];
  const [choice, setChoice] = useState<number | null>(answers[q.id]?.choice ?? null);
  const answeredCount = Object.keys(answers).length;

  // Keyboard: 1–4 pick an option, Enter = "I'm sure", G = "I guessed".
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const n = Number(e.key);
      if (n >= 1 && n <= q.options.length) setChoice(n - 1);
      if (e.key === 'Enter') e.preventDefault(); // don't also "click" whatever button has focus
      if (choice === null) return;
      if (e.key === 'Enter') onAnswer({ choice, confident: true });
      if (e.key.toLowerCase() === 'g') onAnswer({ choice, confident: false });
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [choice, q, onAnswer]);

  const palette = (
    <div className="rounded-2xl bg-white p-5 shadow-card">
      <div className="flex items-center justify-between">
        <h3 className="font-bold">Questions</h3>
        <span className="text-sm text-ink-soft">
          {answeredCount}/{questions.length} answered
        </span>
      </div>
      <div className="mt-4 grid grid-cols-5 gap-2">
        {questions.map((qq, i) => {
          const a = answers[qq.id];
          const style =
            i === index ? 'ring-2 ring-brand-500 ring-offset-2 ' : '';
          const fill = a ? (a.confident ? 'bg-brand-500 text-white' : 'bg-accent-orange text-white') : 'bg-ink-bg text-ink';
          return (
            <button key={qq.id} onClick={() => onJump(i)} className={`h-10 rounded-lg text-sm font-bold transition hover:opacity-80 ${style}${fill}`}>
              {i + 1}
            </button>
          );
        })}
      </div>
      <div className="mt-4 space-y-1.5 text-xs text-ink-soft">
        <p><span className="mr-2 inline-block h-3 w-3 rounded bg-brand-500 align-middle" />Answered (sure)</p>
        <p><span className="mr-2 inline-block h-3 w-3 rounded bg-accent-orange align-middle" />Answered (guessed)</p>
        <p><span className="mr-2 inline-block h-3 w-3 rounded border border-ink-line bg-ink-bg align-middle" />Not answered</p>
      </div>
      <button
        onClick={onSubmit}
        disabled={answeredCount === 0}
        className="mt-5 w-full rounded-full border-2 border-brand-500 py-2.5 text-sm font-bold text-brand-600 transition hover:bg-brand-50 disabled:opacity-40"
      >
        Submit test
      </button>
      {answeredCount < questions.length && answeredCount > 0 && (
        <p className="mt-2 text-center text-xs text-ink-soft">Unanswered questions count as wrong.</p>
      )}
    </div>
  );

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_280px]">
      <section key={q.id} className="fade-up">
        {/* Progress */}
        <div className="mb-4 h-1.5 overflow-hidden rounded-full bg-ink-line">
          <div className="h-full rounded-full bg-brand-500 transition-all duration-500" style={{ width: `${(answeredCount / questions.length) * 100}%` }} />
        </div>

        <div className="rounded-2xl bg-white p-5 shadow-card sm:p-7">
          <div className="flex flex-wrap items-center gap-2 text-xs font-bold">
            <span className="rounded-md bg-ink px-2 py-1 text-white">Q{index + 1} of {questions.length}</span>
            <span className="rounded-md bg-brand-50 px-2 py-1 text-brand-700">{skillLabel[q.skill]}</span>
            <span className="rounded-md border border-ink-line px-2 py-1 font-semibold text-ink-soft">Exam: {q.examLink}</span>
          </div>

          {q.passage && (
            <div className="mt-5 rounded-xl border-l-4 border-brand-500 bg-ink-bg p-4">
              <p className="whitespace-pre-line text-[15px] leading-relaxed">{q.passage}</p>
              {showEn && q.en.passage && (
                <p className="mt-3 whitespace-pre-line border-t border-ink-line pt-3 text-sm italic leading-relaxed text-brand-700">
                  {q.en.passage}
                </p>
              )}
            </div>
          )}

          <h2 className="mt-5 text-lg font-bold leading-snug sm:text-xl">{q.prompt}</h2>
          {showEn && <Translation>{q.en.prompt}</Translation>}

          <div className="mt-5 grid gap-3">
            {q.options.map((opt, i) => {
              const selected = choice === i;
              return (
                <button
                  key={opt}
                  onClick={() => setChoice(i)}
                  className={`flex items-center gap-3 rounded-xl border px-4 py-3 text-left transition active:scale-[0.99] ${
                    selected ? 'border-brand-500 bg-brand-50' : 'border-ink-line hover:border-ink-soft'
                  }`}
                >
                  <span
                    className={`grid h-8 w-8 shrink-0 place-items-center rounded-full border text-sm font-bold ${
                      selected ? 'border-brand-500 bg-brand-500 text-white' : 'border-ink-line text-ink-soft'
                    }`}
                  >
                    {String.fromCharCode(65 + i)}
                  </span>
                  <span>
                    <span className="block font-semibold">{opt}</span>
                    {showEn && q.en.options && <span className="block text-sm italic text-brand-700">{q.en.options[i]}</span>}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Confidence step: appears once an option is picked */}
          <div className={`mt-6 border-t border-ink-line pt-5 transition-opacity duration-300 ${choice === null ? 'pointer-events-none opacity-30' : ''}`}>
            <p className="mb-3 text-sm font-bold">How sure are you about this answer?</p>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => choice !== null && onAnswer({ choice, confident: false })}
                className="rounded-full border border-ink-line px-4 py-3 font-bold transition hover:bg-ink-bg active:scale-[0.98]"
              >
                🤔 I guessed
              </button>
              <button
                onClick={() => choice !== null && onAnswer({ choice, confident: true })}
                className="rounded-full bg-brand-500 px-4 py-3 font-bold text-white transition hover:bg-brand-600 active:scale-[0.98]"
              >
                ✓ I’m sure
              </button>
            </div>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between text-sm font-semibold text-ink-soft">
          <button onClick={() => index > 0 && onJump(index - 1)} disabled={index === 0} className="hover:text-ink disabled:opacity-30">
            ← Previous
          </button>
          <span className="hidden text-xs font-normal sm:inline">Keys: 1–{q.options.length} select · Enter = sure · G = guessed</span>
          <button onClick={() => index < questions.length - 1 && onJump(index + 1)} disabled={index === questions.length - 1} className="hover:text-ink disabled:opacity-30">
            Skip →
          </button>
        </div>
      </section>

      <aside className="lg:sticky lg:top-24 lg:self-start">{palette}</aside>
    </div>
  );
}

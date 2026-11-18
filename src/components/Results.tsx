import { useRef, useState } from 'react';
import { toPng } from 'html-to-image';
import { scoring } from '../config/scoring';
import { questions } from '../data/questions';
import { topics } from '../data/topics';
import type { Answer, Result, Verdict } from '../lib/readiness';
import { skillLabel } from './Quiz';

interface Props {
  result: Result;
  answers: Record<string, Answer>;
  showEn: boolean;
  onRetake: () => void;
}

const verdictCopy: Record<Verdict, { title: string; text: string; bg: string; ring: string; badge: string }> = {
  ready: {
    badge: 'READY TO BOOK',
    title: 'You’re ready. Go book your exam!',
    text: 'Every skill is comfortably above the pass mark. Polish the points below in the days before the exam.',
    bg: 'from-accent-green to-brand-600',
    ring: '#ffffff',
  },
  almost: {
    badge: 'ALMOST THERE',
    title: 'Almost there: 1–2 more weeks',
    text: 'You’d probably pass, but with little margin. Fix the topics below, then book with confidence.',
    bg: 'from-accent-orange to-accent-pink',
    ring: '#ffffff',
  },
  notYet: {
    badge: 'NOT YET',
    title: 'Wait before you book',
    text: 'At least one skill is below the pass mark. Practise first and save your exam fee.',
    bg: 'from-accent-pink to-brand-700',
    ring: '#ffffff',
  },
};

function Ring({ value }: { value: number }) {
  const r = 42;
  const c = 2 * Math.PI * r;
  return (
    <svg viewBox="0 0 100 100" className="h-32 w-32 shrink-0">
      <circle cx="50" cy="50" r={r} fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="9" />
      <circle
        cx="50" cy="50" r={r} fill="none" stroke="#fff" strokeWidth="9" strokeLinecap="round"
        strokeDasharray={c} strokeDashoffset={c * (1 - value / 100)} transform="rotate(-90 50 50)"
        style={{ transition: 'stroke-dashoffset 1s ease-out' }}
      />
      <text x="50" y="47" textAnchor="middle" dominantBaseline="central" fill="#fff" fontSize="22" fontWeight="800">{value}%</text>
      <text x="50" y="66" textAnchor="middle" fill="rgba(255,255,255,0.85)" fontSize="8" fontWeight="600">READINESS</text>
    </svg>
  );
}

function barColor(score: number) {
  if (score >= scoring.readyThreshold) return 'bg-accent-green';
  if (score >= scoring.almostThreshold) return 'bg-accent-orange';
  return 'bg-accent-pink';
}

export default function Results({ result, answers, showEn, onRetake }: Props) {
  const [showReview, setShowReview] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // Saves the scorecard (verdict, stats, skills, study plan) as a PNG image.
  const download = async () => {
    if (!cardRef.current) return;
    setDownloading(true);
    try {
      const url = await toPng(cardRef.current, { pixelRatio: 2, backgroundColor: '#F6F8FA' });
      const link = document.createElement('a');
      link.download = `a1-readiness-scorecard-${new Date().toISOString().slice(0, 10)}.png`;
      link.href = url;
      link.click();
    } catch {
      alert('Sorry, the download failed. Please take a screenshot instead.');
    } finally {
      setDownloading(false);
    }
  };
  const v = verdictCopy[result.verdict];
  const correct = questions.filter((q) => answers[q.id]?.choice === q.answer).length;
  const attempted = Object.keys(answers).length;

  const tiles = [
    ['Correct', `${correct}/${questions.length}`],
    ['Attempted', `${attempted}/${questions.length}`],
    ['Accuracy', attempted ? `${Math.round((correct / attempted) * 100)}%` : '–'],
    ['Lucky guesses', String(result.luckyGuesses)],
  ];

  return (
    <section className="fade-up mx-auto max-w-3xl space-y-5">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Your scorecard</h2>
        <button
          onClick={download}
          disabled={downloading}
          className="flex items-center gap-2 rounded-full border border-brand-500 bg-white px-4 py-2 text-sm font-bold text-brand-600 transition hover:bg-brand-50 disabled:opacity-50"
        >
          {downloading ? 'Preparing…' : '⬇ Download scorecard'}
        </button>
      </div>

      {/* Everything inside this ref goes into the downloaded image */}
      <div ref={cardRef} className="space-y-5 bg-ink-bg p-1">
      {/* Verdict banner */}
      <div className={`flex flex-col items-center gap-6 rounded-3xl bg-gradient-to-br p-6 text-white sm:flex-row sm:p-8 ${v.bg}`}>
        <Ring value={result.overall} />
        <div className="text-center sm:text-left">
          <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-extrabold tracking-wider">{v.badge}</span>
          <h1 className="mt-3 text-2xl font-extrabold sm:text-3xl">{v.title}</h1>
          <p className="mt-2 text-white/90">{v.text}</p>
        </div>
      </div>

      {/* Stat tiles */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {tiles.map(([label, value]) => (
          <div key={label} className="rounded-2xl bg-white p-4 shadow-card">
            <div className="text-xs font-semibold text-ink-soft">{label}</div>
            <div className="mt-1 text-2xl font-extrabold">{value}</div>
          </div>
        ))}
      </div>

      {/* Per-skill breakdown */}
      <div className="rounded-2xl bg-white p-6 shadow-card">
        <h2 className="text-lg font-bold">Skill-wise readiness</h2>
        <p className="mt-1 text-sm text-ink-soft">
          Pass mark {scoring.almostThreshold}% · Safe zone {scoring.readyThreshold}%+ · Your weakest skill decides the verdict
        </p>
        <div className="mt-6 space-y-6">
          {result.skills.map((s) => (
            <div key={s.skill}>
              <div className="mb-2 flex items-center justify-between text-sm">
                <span className="font-bold">
                  {skillLabel[s.skill]}
                  {s.skill === result.weakestSkill && result.verdict !== 'ready' && (
                    <span className="ml-2 rounded-md bg-rose-50 px-2 py-0.5 text-xs font-bold text-rose-600">Weakest</span>
                  )}
                </span>
                <span className="text-ink-soft">
                  {s.correct}/{s.total} correct · <strong className="text-base text-ink">{s.score}%</strong>
                </span>
              </div>
              <div className="relative h-2.5 rounded-full bg-ink-line">
                <div className={`h-full rounded-full transition-all duration-1000 ${barColor(s.score)}`} style={{ width: `${s.score}%` }} />
                {[scoring.almostThreshold, scoring.readyThreshold].map((t) => (
                  <div key={t} className="absolute -top-1 h-[18px] w-0.5 rounded bg-ink/40" style={{ left: `${t}%` }} title={`${t}%`} />
                ))}
              </div>
            </div>
          ))}
        </div>
        {result.luckyGuesses > 0 && (
          <p className="mt-6 rounded-xl bg-amber-50 p-3 text-sm text-amber-900">
            🎲 You got <strong>{result.luckyGuesses}</strong> right by guessing. They count only {scoring.guessCredit * 100}%,
            because luck isn’t reliable on exam day.
          </p>
        )}
      </div>

      {/* What to practise */}
      <div className="rounded-2xl bg-white p-6 shadow-card">
        <h2 className="text-lg font-bold">Your study plan before booking</h2>
        <p className="mt-1 text-sm text-ink-soft">Focus on these, most important first.</p>
        <ol className="mt-5 space-y-3">
          {result.recommendations.map((id, i) => {
            const t = topics[id];
            return (
              <li key={id} className="flex gap-4 rounded-xl border border-ink-line p-4">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-brand-50 font-extrabold text-brand-700">{i + 1}</span>
                <div>
                  <h3 className="font-bold">{t.label}</h3>
                  <p className="mt-1 text-sm">{t.rule}</p>
                  <p className="mt-2 rounded-lg bg-ink-bg px-3 py-2 text-sm font-semibold text-brand-700">📌 {t.action}</p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>

      <p className="pb-1 text-center text-xs text-ink-soft">
        Am I exam-ready? · A1 German readiness check · {new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
      </p>
      </div>

      {/* Answer review */}
      <div className="rounded-2xl bg-white p-6 shadow-card">
        <button onClick={() => setShowReview(!showReview)} className="flex w-full items-center justify-between text-lg font-bold">
          Solutions & explanations
          <span className={`text-brand-600 transition ${showReview ? 'rotate-180' : ''}`}>▾</span>
        </button>
        {showReview && (
          <ul className="mt-5 space-y-3">
            {questions.map((q, i) => {
              const a = answers[q.id];
              const right = a?.choice === q.answer;
              return (
                <li key={q.id} className="rounded-xl border border-ink-line p-4 text-sm">
                  <div className="flex items-start justify-between gap-3">
                    <p className="font-bold">
                      Q{i + 1}. {q.prompt}
                    </p>
                    <span className={`shrink-0 rounded-md px-2 py-0.5 text-xs font-bold ${right ? 'bg-brand-50 text-brand-700' : 'bg-rose-50 text-rose-600'}`}>
                      {right ? 'Correct' : a ? 'Wrong' : 'Skipped'}
                    </span>
                  </div>
                  {showEn && <p className="mt-0.5 italic text-brand-700">🇬🇧 {q.en.prompt}</p>}
                  <p className="mt-2">
                    Your answer: <strong>{a ? q.options[a.choice] : '–'}</strong>
                    {a && !a.confident && <span className="text-ink-soft"> (guessed)</span>}
                    {!right && (
                      <>
                        {' '}· Correct: <strong className="text-brand-700">{q.options[q.answer]}</strong>
                      </>
                    )}
                  </p>
                  <p className="mt-2 rounded-lg bg-ink-bg p-2.5 text-ink-soft">💡 {q.explanation}</p>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      <p className="text-center text-xs text-ink-soft">
        This check covers reading, vocabulary and grammar. The real exam also tests listening, writing and speaking.
      </p>

      <button onClick={onRetake} className="w-full rounded-full bg-brand-500 px-6 py-4 font-bold text-white transition hover:bg-brand-600">
        ↻ Retake the test
      </button>
    </section>
  );
}

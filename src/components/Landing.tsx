import { questions } from '../data/questions';
import { scoring } from '../config/scoring';

interface Props {
  hasProgress: boolean;
  onStart: () => void;
  onResume: () => void;
}

const circles: { cls: string; n?: string; label?: string }[] = [
  { cls: 'bg-accent-lime' },
  { cls: 'bg-brand-500 text-white', n: String(questions.length), label: 'Questions' },
  { cls: 'bg-accent-sky' },
  { cls: 'bg-accent-pink text-white', n: '~5', label: 'Minutes' },
  { cls: 'bg-accent-peach' },
  { cls: 'bg-accent-green text-white', n: '3', label: 'Skills' },
  { cls: 'bg-accent-sky' },
  { cls: 'bg-accent-orange' },
  { cls: 'bg-brand-600' },
];

const steps = [
  ['Answer like the real exam', 'Questions copy Goethe A1 formats: Lesen Teil 1–3, forms, self-introduction and polite requests.'],
  ['Be honest: sure or guessed?', `A correct guess counts only ${scoring.guessCredit * 100}%, because luck doesn’t carry you on exam day.`],
  ['Get your verdict', `Every skill must reach ${scoring.readyThreshold}% to be “Ready”: the ${scoring.almostThreshold}% pass mark plus a safety margin.`],
];

export default function Landing({ hasProgress, onStart, onResume }: Props) {
  return (
    <section className="fade-up">
      <div className="overflow-hidden rounded-3xl bg-white shadow-card">
        <div className="grid gap-8 p-6 sm:p-10 md:grid-cols-[1.4fr_1fr] md:items-center">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-3 py-1 text-xs font-bold text-brand-700">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-500" /> Free readiness test
            </span>
            <h1 className="mt-4 text-3xl font-extrabold leading-tight tracking-tight text-brand-600 sm:text-[44px]">
              Check if you’re ready for <span className="text-brand-500">A1 German</span> before you pay the exam fee
            </h1>
            <p className="mt-4 text-[17px] text-ink-soft">
              A short mock check modelled on the Goethe and ÖSD A1 exams. Get your readiness by skill and exactly what to
              practise next.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <button
                onClick={onStart}
                className="rounded-full bg-brand-500 px-7 py-3.5 text-base font-bold text-white transition hover:bg-brand-600 active:scale-[0.98]"
              >
                Start the test
              </button>
              {hasProgress && (
                <button
                  onClick={onResume}
                  className="rounded-full border border-ink-line px-7 py-3.5 font-bold transition hover:bg-ink-bg"
                >
                  Resume test
                </button>
              )}
            </div>
          </div>

          {/* Decorative circle collage with the key numbers */}
          <div className="grid grid-cols-3 gap-2 sm:gap-3">
            {circles.map((c, i) => (
              <div key={i} className={`grid aspect-square place-items-center rounded-full text-center ${c.cls}`}>
                {c.n && (
                  <span>
                    <span className="block text-2xl font-extrabold sm:text-3xl">{c.n}</span>
                    <span className="block text-[11px] font-bold uppercase tracking-wide opacity-90">{c.label}</span>
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <h2 className="mb-4 mt-10 text-xl font-bold">How it works</h2>
      <ol className="grid gap-4 md:grid-cols-3">
        {steps.map(([title, text], i) => (
          <li key={title} className="rounded-2xl bg-white p-5 shadow-card">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-brand-50 text-sm font-extrabold text-brand-700">{i + 1}</span>
            <h3 className="mt-3 font-bold">{title}</h3>
            <p className="mt-1 text-sm text-ink-soft">{text}</p>
          </li>
        ))}
      </ol>

      <p className="mt-6 text-center text-xs text-ink-soft">
        Tip: turn on <strong>English translation</strong> at the top right during the test if you want to see what each question means.
      </p>
    </section>
  );
}

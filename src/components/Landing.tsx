import { questions } from '../data/questions';
import { scoring } from '../config/scoring';

interface Props {
  hasProgress: boolean;
  onStart: () => void;
  onResume: () => void;
}

const sampleSkills: [string, number, string][] = [
  ['Vocabulary', 88, 'bg-accent-green'],
  ['Grammar', 79, 'bg-accent-green'],
  ['Reading', 80, 'bg-accent-green'],
];

const chips: [string, string][] = [
  [`📝 ${questions.length} questions`, 'left-12 top-1'],
  ['⏱️ ~5 minutes', 'right-0 top-[18%]'],
  ['🎯 3 skills scored', 'bottom-[12%] right-2'],
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

          {/* Hero visual: playful shapes behind a sample scorecard */}
          <div className="relative mx-auto h-[340px] w-full max-w-[380px] sm:h-[380px]">
            {/* background shapes */}
            <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-accent-lime sm:h-48 sm:w-48" />
            <div className="absolute bottom-2 left-0 h-36 w-36 rounded-full bg-accent-sky sm:h-44 sm:w-44" />
            <div className="absolute bottom-0 right-6 h-20 w-40 rounded-t-full bg-accent-orange" />
            <div className="absolute left-6 top-4 h-14 w-14 rounded-full bg-accent-pink" />
            <div className="absolute right-2 top-[45%] h-10 w-10 rounded-full bg-brand-600" />

            {/* sample result card */}
            <div className="absolute left-1/2 top-1/2 w-[260px] -translate-x-1/2 -translate-y-1/2 rotate-[-2deg] rounded-3xl bg-white p-5 shadow-2xl shadow-brand-700/20">
              <div className="flex items-center gap-3">
                <div className="grid h-14 w-14 place-items-center rounded-full border-[5px] border-accent-green text-sm font-extrabold">82%</div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-ink-soft">Sample result</p>
                  <p className="font-extrabold text-accent-green">Ready to book ✓</p>
                </div>
              </div>
              <div className="mt-4 space-y-2.5">
                {sampleSkills.map(([name, pct, color]) => (
                  <div key={name}>
                    <div className="flex justify-between text-xs font-semibold">
                      <span>{name}</span>
                      <span className="text-ink-soft">{pct}%</span>
                    </div>
                    <div className="mt-1 h-1.5 rounded-full bg-ink-line">
                      <div className={`h-full rounded-full ${color}`} style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* floating fact chips */}
            {chips.map(([text, pos]) => (
              <span key={text} className={`absolute rounded-full bg-white px-3 py-1.5 text-xs font-bold text-brand-600 shadow-lg ${pos}`}>
                {text}
              </span>
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

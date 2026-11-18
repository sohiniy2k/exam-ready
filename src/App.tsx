import { useEffect, useMemo, useState } from 'react';
import { questions } from './data/questions';
import { calculateResult, type Answer } from './lib/readiness';
import Landing from './components/Landing';
import Quiz from './components/Quiz';
import Results from './components/Results';

type Stage = 'landing' | 'quiz' | 'results';

interface Saved {
  stage: Stage;
  index: number;
  answers: Record<string, Answer>;
  showEn: boolean;
}

const STORAGE_KEY = 'exam-ready-v2';
const fresh: Saved = { stage: 'landing', index: 0, answers: {}, showEn: false };

function load(): Saved {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? { ...fresh, ...JSON.parse(raw) } : fresh;
  } catch {
    return fresh;
  }
}

export default function App() {
  const [state, setState] = useState<Saved>(load);

  // Save progress so a refresh never loses answers.
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      /* storage unavailable: app still works */
    }
  }, [state]);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [state.stage, state.index]);

  const result = useMemo(() => calculateResult(questions, state.answers), [state.answers]);

  // After answering, go to the next unanswered question; when none are left, show results.
  const answer = (a: Answer) => {
    const answers = { ...state.answers, [questions[state.index].id]: a };
    const order = [...questions.keys()].map((k) => (state.index + 1 + k) % questions.length);
    const next = order.find((i) => !answers[questions[i].id]);
    setState({ ...state, answers, stage: next === undefined ? 'results' : 'quiz', index: next ?? state.index });
  };

  const restart = (stage: Stage) => setState({ ...fresh, stage, showEn: state.showEn });

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-20 px-3 pt-3">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between rounded-full bg-gradient-to-r from-brand-600 to-brand-500 px-4 text-white shadow-lg shadow-brand-500/20 sm:px-6">
          <button onClick={() => restart('landing')} className="flex items-center gap-2.5">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-white text-sm font-extrabold text-brand-600">A1</span>
            <span className="text-left leading-tight">
              <span className="block text-[15px] font-bold">Am I exam-ready?</span>
              <span className="block text-xs text-white/75">Goethe · ÖSD A1 German</span>
            </span>
          </button>
          {state.stage !== 'landing' && (
            <label className="flex cursor-pointer items-center gap-2 text-sm font-semibold">
              <span className="hidden sm:inline">English translation</span>
              <span className="sm:hidden">EN</span>
              <button
                role="switch"
                aria-checked={state.showEn}
                onClick={() => setState({ ...state, showEn: !state.showEn })}
                className={`relative h-6 w-11 rounded-full transition ${state.showEn ? 'bg-accent-lime' : 'bg-white/30'}`}
              >
                <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all ${state.showEn ? 'left-[22px]' : 'left-0.5'}`} />
              </button>
            </label>
          )}
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 pb-16 pt-6">
        {state.stage === 'landing' && (
          <Landing
            hasProgress={Object.keys(state.answers).length > 0}
            onStart={() => restart('quiz')}
            onResume={() => setState({ ...state, stage: 'quiz' })}
          />
        )}
        {state.stage === 'quiz' && (
          <Quiz
            key={state.index}
            index={state.index}
            answers={state.answers}
            showEn={state.showEn}
            onAnswer={answer}
            onJump={(i) => setState({ ...state, index: i })}
            onSubmit={() => setState({ ...state, stage: 'results' })}
          />
        )}
        {state.stage === 'results' && (
          <Results result={result} answers={state.answers} showEn={state.showEn} onRetake={() => restart('quiz')} />
        )}
      </main>
    </div>
  );
}

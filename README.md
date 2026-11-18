# Am I exam-ready? 🇩🇪

A 5-minute check that tells A1 German learners whether they're ready to book their **Goethe** or **ÖSD A1** exam, before they pay the fee.

- 15 questions across **vocabulary, grammar and reading**, each tagged with the real exam part it prepares for
- **English translation toggle** for every question, option and reading text
- Exam-style interface: question palette, skip/jump, submit anytime
- A readiness verdict (**Ready / Almost / Not yet**) with a per-skill breakdown
- The **2–3 specific things to practise**, each with a rule and a concrete task
- Answer review with explanations, progress saved across refreshes, keyboard shortcuts, mobile-first

## How the questions map to the real exam

The Goethe/ÖSD A1 exam has **no separate grammar or vocabulary paper**. It tests Hören, Lesen, Schreiben and Sprechen. So:

- **Reading** copies the real formats: Lesen Teil 1 (e-mail, richtig/falsch), Teil 2 (choose ad a or b), Teil 3 (notices, richtig/falsch).
- **Vocabulary & grammar** are set in exam situations: filling in a form (Schreiben Teil 1), introducing yourself (Sprechen Teil 1), polite requests (Sprechen Teil 3), short messages (Schreiben Teil 2).

## How "ready" is calculated

All numbers live in [`src/config/scoring.ts`](src/config/scoring.ts).

1. **Per-skill weighted score.** Each question has a difficulty (1–3) with weights 1 / 1.5 / 2. Harder questions say more about real readiness.
2. **Confidence matters.** After each answer the learner says *"I'm sure"* or *"I guessed"*. A correct guess earns only 50%. Lucky guesses are exactly the false confidence that makes people fail.
3. **The weakest skill decides the verdict**, not the average. The real exam requires passing each part, so strong vocabulary can't hide a reading gap.
   - 🟢 **Ready to book:** every skill ≥ 75% (the 60% pass mark plus a safety margin for exam-day nerves and untested skills)
   - 🟡 **Almost there:** every skill ≥ 60%
   - 🔴 **Not yet:** any skill < 60%
4. **Recommendations:** topics where weighted points were lost, ordered by weakest skill first, then by points lost. If the learner aced everything, it points to **listening and speaking**, which this check can't test.

## Code structure

```
src/
  data/questions.ts     question bank (skill, topic, difficulty, explanation)
  data/topics.ts        practice advice per topic
  config/scoring.ts     thresholds & weights: the definition of "ready"
  lib/readiness.ts      pure scoring function (+ readiness.test.ts)
  components/           Landing, Quiz, Results
```

## Run locally

```bash
npm install
npm run dev      # http://localhost:5173
npm test         # scoring unit tests
npm run build
```

Built with React, TypeScript, Vite and Tailwind CSS. No backend.

## Deploy

Push to GitHub, then import the repo at [vercel.com/new](https://vercel.com/new). Vercel detects Vite automatically (build: `npm run build`, output: `dist`).

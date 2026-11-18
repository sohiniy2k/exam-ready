// ─────────────────────────────────────────────────────────────
// All the numbers that define "ready" live here. Change them in one place.
// ─────────────────────────────────────────────────────────────

export const scoring = {
  // Goethe/ÖSD A1 pass mark is 60%. "Ready" requires a safety margin above it,
  // because exam-day nerves, unfamiliar topics and listening/speaking cost points.
  readyThreshold: 75, // every skill ≥ 75% → Ready to book
  almostThreshold: 60, // every skill ≥ 60% → Almost there

  // Harder questions say more about real readiness, so they count more.
  difficultyWeight: { 1: 1, 2: 1.5, 3: 2 } as Record<1 | 2 | 3, number>,

  // A correct answer the learner marked as "I guessed" earns only partial credit.
  // Lucky guesses are exactly the false confidence that makes people fail.
  guessCredit: 0.5,

  // How many practice recommendations to show.
  maxRecommendations: 3,
};

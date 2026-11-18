// Pure scoring logic: answers in → scores, verdict and recommendations out.
// No React here, so it is easy to test and easy to change.

import { scoring } from '../config/scoring';
import type { Question, Skill } from '../data/questions';
import type { TopicId } from '../data/topics';

export interface Answer {
  choice: number;
  confident: boolean; // false = "I guessed"
}

export type Verdict = 'ready' | 'almost' | 'notYet';

export interface SkillResult {
  skill: Skill;
  score: number; // 0–100, weighted
  correct: number;
  total: number;
}

export interface Result {
  skills: SkillResult[];
  overall: number;
  verdict: Verdict;
  weakestSkill: Skill;
  luckyGuesses: number; // correct answers marked as guessed
  recommendations: TopicId[];
}

export const SKILLS: Skill[] = ['vocabulary', 'grammar', 'reading'];

/** Credit for one answer: 1 = sure & right, guessCredit = guessed & right, 0 = wrong/skipped. */
export function credit(q: Question, a: Answer | undefined): number {
  if (!a || a.choice !== q.answer) return 0;
  return a.confident ? 1 : scoring.guessCredit;
}

export function calculateResult(questions: Question[], answers: Record<string, Answer>): Result {
  const weight = (q: Question) => scoring.difficultyWeight[q.difficulty];

  // 1. Per-skill weighted score
  const skills: SkillResult[] = SKILLS.map((skill) => {
    const qs = questions.filter((q) => q.skill === skill);
    const earned = qs.reduce((sum, q) => sum + weight(q) * credit(q, answers[q.id]), 0);
    const possible = qs.reduce((sum, q) => sum + weight(q), 0);
    return {
      skill,
      score: possible ? Math.round((earned / possible) * 100) : 0,
      correct: qs.filter((q) => answers[q.id]?.choice === q.answer).length,
      total: qs.length,
    };
  });

  // 2. Verdict is driven by the WEAKEST skill, not the average:
  //    a strong vocabulary score can't hide a reading gap.
  const weakest = skills.reduce((min, s) => (s.score < min.score ? s : min));
  const verdict: Verdict =
    weakest.score >= scoring.readyThreshold ? 'ready'
    : weakest.score >= scoring.almostThreshold ? 'almost'
    : 'notYet';

  const overall = Math.round(skills.reduce((sum, s) => sum + s.score, 0) / skills.length);

  const luckyGuesses = questions.filter((q) => {
    const a = answers[q.id];
    return a && !a.confident && a.choice === q.answer;
  }).length;

  // 3. Recommendations: topics where points were lost, weakest skill first,
  //    then by how many weighted points were lost.
  const lost = new Map<TopicId, { lost: number; skillScore: number }>();
  for (const q of questions) {
    const missed = weight(q) * (1 - credit(q, answers[q.id]));
    if (missed <= 0) continue;
    const skillScore = skills.find((s) => s.skill === q.skill)!.score;
    const prev = lost.get(q.topic);
    lost.set(q.topic, { lost: (prev?.lost ?? 0) + missed, skillScore });
  }
  const recommendations = [...lost.entries()]
    .sort(([, a], [, b]) => a.skillScore - b.skillScore || b.lost - a.lost)
    .map(([topic]) => topic)
    .slice(0, scoring.maxRecommendations);

  // Strong on everything we test? Point to the exam parts we can't test.
  for (const extra of ['listening', 'speaking'] as TopicId[]) {
    if (recommendations.length < 2) recommendations.push(extra);
  }

  return { skills, overall, verdict, weakestSkill: weakest.skill, luckyGuesses, recommendations };
}

import { describe, expect, it } from 'vitest';
import { questions } from '../data/questions';
import { calculateResult, type Answer } from './readiness';

const allRight = (confident = true) =>
  Object.fromEntries(questions.map((q) => [q.id, { choice: q.answer, confident }])) as Record<string, Answer>;

describe('calculateResult', () => {
  it('perfect, confident answers → ready, recommends listening & speaking', () => {
    const r = calculateResult(questions, allRight());
    expect(r.verdict).toBe('ready');
    expect(r.overall).toBe(100);
    expect(r.recommendations).toEqual(['listening', 'speaking']);
  });

  it('all correct but all guessed → only 50%, not yet ready', () => {
    const r = calculateResult(questions, allRight(false));
    expect(r.overall).toBe(50);
    expect(r.verdict).toBe('notYet');
    expect(r.luckyGuesses).toBe(questions.length);
  });

  it('one weak skill decides the verdict even if the average is high', () => {
    const answers = allRight();
    for (const q of questions.filter((q) => q.skill === 'reading')) {
      answers[q.id] = { choice: (q.answer + 1) % q.options.length, confident: true };
    }
    const r = calculateResult(questions, answers);
    expect(r.overall).toBeGreaterThan(60);
    expect(r.verdict).toBe('notYet');
    expect(r.weakestSkill).toBe('reading');
    expect(r.recommendations[0]).toMatch(/^reading/);
  });

  it('never recommends more than 3 topics', () => {
    const r = calculateResult(questions, {});
    expect(r.recommendations.length).toBeLessThanOrEqual(3);
    expect(r.verdict).toBe('notYet');
  });

  it('every question has a valid answer index', () => {
    for (const q of questions) expect(q.options[q.answer]).toBeDefined();
  });
});

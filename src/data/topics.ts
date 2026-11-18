// Practice advice for each topic. The results page picks the learner's weakest
// topics and shows these cards as "what to practise before booking".

export interface Topic {
  label: string;
  rule: string; // the one thing to remember
  action: string; // a concrete practice task
}

export const topics = {
  personalInfo: {
    label: 'Personal details & forms',
    rule: 'Know form words: Vorname, Nachname, Geburtsdatum, Familienstand (ledig/verheiratet), Staatsangehörigkeit, Beruf.',
    action: 'Fill in 2 practice forms from the Goethe A1 Modellsatz (Schreiben Teil 1) and check every field.',
  },
  shopping: {
    label: 'Food & shopping',
    rule: 'Know common foods, quantities (ein Kilo, eine Flasche, ein Stück) and „Ich möchte…“.',
    action: 'Write your weekly shopping list in German, and role-play buying it at a market.',
  },
  phrases: {
    label: 'Everyday phrases',
    rule: 'A1 tests survival phrases: prices, time, directions, introductions.',
    action: 'Learn 20 key phrases with flashcards (Anki/Quizlet), 10 minutes a day for a week.',
  },
  health: {
    label: 'Health & appointments',
    rule: 'Know Arzt, Termin, krank, Apotheke, and how to make an appointment.',
    action: 'Practise a phone call: „Guten Tag, ich möchte einen Termin machen…“',
  },
  time: {
    label: 'Telling the time',
    rule: '„halb drei“ = 2:30 (half TO three). Viertel nach / Viertel vor also appear often.',
    action: 'Every time you check a clock this week, say the time in German, both formally and informally.',
  },
  conjugation: {
    label: 'Verb endings',
    rule: 'ich -e, du -st, er/sie/es -t, wir -en, ihr -t, sie/Sie -en.',
    action: 'Conjugate 5 common verbs (wohnen, machen, lernen, haben, sein) every day until it’s automatic.',
  },
  accusative: {
    label: 'Accusative articles',
    rule: 'Only masculine changes: der → den, ein → einen, kein → keinen. „Ich habe einen Bruder.“',
    action: 'Write 10 sentences with haben / möchten / brauchen + a masculine noun.',
  },
  prepositions: {
    label: 'Time prepositions',
    rule: 'am + day (am Montag), um + clock time (um 8 Uhr), im + month/season (im Mai).',
    action: 'Write out your weekly schedule using am / um / im in every line.',
  },
  requests: {
    label: 'Polite requests (Sie-form)',
    rule: 'Formal „Sie“ always takes the -en verb form: Können Sie…? Haben Sie…? Sprechen Sie…?',
    action: 'Practise Sprechen Teil 3: make 10 polite requests (Können Sie bitte…? Ich möchte…, bitte.)',
  },
  wordOrder: {
    label: 'Word order (modal & separable verbs)',
    rule: 'Verb in position 2. Infinitives and separable prefixes go to the END: „Ich muss morgen arbeiten.“ „Der Zug kommt um 8 an.“',
    action: 'Describe your daily routine with aufstehen, einkaufen, anrufen + können/müssen. 10 sentences.',
  },
  readingNotices: {
    label: 'Reading signs & notices',
    rule: 'Exam texts hide the answer in details: days, times, „telefonisch“, „wegen…“. Read the question first, then scan.',
    action: 'Do 2 Lesen Teil 3 practice tasks from the official Goethe A1 model test (Modellsatz), with a timer.',
  },
  readingAds: {
    label: 'Choosing between ads (Lesen Teil 2)',
    rule: 'Compare both ads against EVERY condition in the question: days, times, price, place.',
    action: 'Do 2 Lesen Teil 2 tasks from the Goethe A1 Modellsatz and underline the deciding detail each time.',
  },
  readingMessages: {
    label: 'Reading short messages',
    rule: 'Track who is speaking: „bei mir“ means at the writer’s place.',
    action: 'Read short e-mails from the Goethe A1 Modellsatz and underline who / what / when / where.',
  },
  // Not covered by this check, but needed to pass. Recommended when written skills look strong.
  listening: {
    label: 'Listening (Hören)',
    rule: 'This check can’t test listening, but it’s a full quarter of the exam.',
    action: 'Do the Hören section of the official Goethe A1 Modellsatz under exam conditions.',
  },
  speaking: {
    label: 'Speaking (Sprechen)',
    rule: 'This check can’t test speaking. In the exam you introduce yourself and ask/answer simple questions.',
    action: 'Record a 1-minute self-introduction (Name, Alter, Land, Wohnort, Sprachen, Beruf, Hobby) and replay it.',
  },
} satisfies Record<string, Topic>;

export type TopicId = keyof typeof topics;

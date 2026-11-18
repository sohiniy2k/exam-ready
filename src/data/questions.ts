// The question bank. Every question is tagged with a skill, a topic, a difficulty
// and the part of the real Goethe/ÖSD A1 exam it prepares for.
//
// Note: the real A1 exam has no separate grammar/vocabulary paper. It tests
// Hören, Lesen, Schreiben and Sprechen. So vocabulary and grammar questions here
// are set in situations from those parts (forms, self-introduction, requests),
// and reading questions copy the real Lesen Teil 1 / 2 / 3 formats.
//
// To add a question: copy one object, give it a new id, and pick a topic from topics.ts.

import type { TopicId } from './topics';

export type Skill = 'vocabulary' | 'grammar' | 'reading';
export type Difficulty = 1 | 2 | 3; // 1 = easy, 2 = medium, 3 = hard (for A1)

export interface Question {
  id: string;
  skill: Skill;
  topic: TopicId;
  difficulty: Difficulty;
  examLink: string; // which part of the real exam this mirrors
  passage?: string; // reading texts
  prompt: string;
  options: string[];
  answer: number; // index into options
  explanation: string;
  // English translation, for learners and for anyone reviewing question quality
  en: { passage?: string; prompt: string; options?: string[] };
}

const PARTY_EMAIL = `Liebe Anna,
am Samstag habe ich Geburtstag! Ich mache eine kleine Party bei mir zu Hause.
Die Party beginnt um 19 Uhr. Kannst du bitte einen Salat mitbringen?
Getränke habe ich schon.
Bis Samstag!
Deine Julia`;
const PARTY_EMAIL_EN = `Dear Anna,
it's my birthday on Saturday! I'm having a small party at my place.
The party starts at 7 pm. Can you please bring a salad?
I already have drinks.
See you Saturday!
Yours, Julia`;

const COURSE_ADS = `a) Volkshochschule Mitte
Deutschkurse A1 – Montag bis Freitag, 18:00–20:00 Uhr

b) Sprachschule Lingua
Intensivkurs A1 – Samstag und Sonntag, 9:00–13:00 Uhr`;
const COURSE_ADS_EN = `a) Adult education centre (city centre)
German courses A1 – Monday to Friday, 6–8 pm

b) Lingua language school
Intensive course A1 – Saturday and Sunday, 9 am–1 pm`;

const DOCTOR_NOTICE = `Praxis Dr. Weber – Allgemeinmedizin
Sprechzeiten: Montag bis Freitag 8–12 Uhr
Dienstag und Donnerstag auch 15–18 Uhr
Mittwochnachmittag geschlossen.
Bitte vereinbaren Sie einen Termin telefonisch: 030 445566`;
const DOCTOR_NOTICE_EN = `Dr. Weber's practice – General medicine
Opening hours: Monday to Friday 8 am–12 pm
Tuesday and Thursday also 3–6 pm
Closed Wednesday afternoon.
Please make an appointment by phone: 030 445566`;

const STATION_SIGN = `Achtung, Gleis 3:
Wegen Bauarbeiten fährt der Zug nach München heute von Gleis 5.
Wir bitten um Entschuldigung.`;
const STATION_SIGN_EN = `Attention, platform 3:
Due to construction work, the train to Munich leaves from platform 5 today.
We apologise.`;

export const questions: Question[] = [
  // ───────────── Vocabulary ─────────────
  {
    id: 'v1',
    skill: 'vocabulary',
    topic: 'personalInfo',
    difficulty: 2,
    examLink: 'Schreiben Teil 1 · filling in a form',
    prompt: 'Im Formular: „Familienstand: ______“. Was passt?',
    options: ['ledig', 'Deutsch', '25 Jahre', 'Lehrerin'],
    answer: 0,
    explanation: '„Familienstand“ = marital status. Answers: ledig (single), verheiratet (married), geschieden (divorced).',
    en: { prompt: 'On a form: “Marital status: ______”. What fits?', options: ['single', 'German', '25 years', 'teacher (f)'] },
  },
  {
    id: 'v2',
    skill: 'vocabulary',
    topic: 'shopping',
    difficulty: 1,
    examLink: 'Sprechen Teil 3 · asking for things',
    prompt: 'Auf dem Markt: „Ich möchte ein Kilo ______, bitte.“',
    options: ['Tisch', 'Bahnhof', 'Äpfel', 'Hose'],
    answer: 2,
    explanation: 'You buy fruit by the kilo: ein Kilo Äpfel.',
    en: { prompt: 'At the market: “I’d like a kilo of ______, please.”', options: ['table', 'train station', 'apples', 'trousers'] },
  },
  {
    id: 'v3',
    skill: 'vocabulary',
    topic: 'phrases',
    difficulty: 1,
    examLink: 'Sprechen Teil 3 · asking for things',
    prompt: 'Sie sind in einem Geschäft und möchten den Preis wissen. Was sagen Sie?',
    options: ['Wie geht’s?', 'Was kostet das?', 'Wie spät ist es?', 'Woher kommen Sie?'],
    answer: 1,
    explanation: '„Was kostet das?“ = How much does that cost?',
    en: {
      prompt: 'You are in a shop and want to know the price. What do you say?',
      options: ['How are you?', 'How much does that cost?', 'What time is it?', 'Where are you from?'],
    },
  },
  {
    id: 'v4',
    skill: 'vocabulary',
    topic: 'health',
    difficulty: 2,
    examLink: 'Hören & Lesen · everyday situations',
    prompt: '„Ich bin krank. Ich brauche einen Termin beim ______.“',
    options: ['Bäcker', 'Lehrer', 'Arzt', 'Kellner'],
    answer: 2,
    explanation: 'When you are sick you see the doctor: einen Termin beim Arzt.',
    en: { prompt: '“I’m sick. I need an appointment with the ______.”', options: ['baker', 'teacher', 'doctor', 'waiter'] },
  },
  {
    id: 'v5',
    skill: 'vocabulary',
    topic: 'time',
    difficulty: 3,
    examLink: 'Hören Teil 1 · times & numbers',
    prompt: 'Es ist 14:30 Uhr. Wie sagt man das im Alltag?',
    options: ['halb zwei', 'halb drei', 'Viertel nach zwei', 'zwei Uhr halb'],
    answer: 1,
    explanation: '„halb drei“ means half way TO three, so 2:30. A very common A1 listening trap!',
    en: {
      prompt: 'It is 14:30. How do people say this in everyday German?',
      options: ['“half two” (= 1:30)', '“half three” (= 2:30)', 'quarter past two', '(not correct German)'],
    },
  },

  // ───────────── Grammar ─────────────
  {
    id: 'g1',
    skill: 'grammar',
    topic: 'conjugation',
    difficulty: 1,
    examLink: 'Sprechen Teil 1 · introducing yourself',
    prompt: 'Ich ______ aus Indien.',
    options: ['kommen', 'kommst', 'komme', 'kommt'],
    answer: 2,
    explanation: 'ich → -e: ich komme. You will say this in the very first part of the speaking exam.',
    en: { prompt: 'I ______ from India.', options: ['come (wir/sie form)', 'come (du form)', 'come (ich form)', 'come (er/sie form)'] },
  },
  {
    id: 'g2',
    skill: 'grammar',
    topic: 'accusative',
    difficulty: 2,
    examLink: 'Sprechen Teil 1 · talking about family',
    prompt: 'Ich habe ______ Bruder und eine Schwester.',
    options: ['ein', 'einen', 'einem', 'eine'],
    answer: 1,
    explanation: '„haben“ takes the accusative. Masculine ein → einen: Ich habe einen Bruder.',
    en: { prompt: 'I have ______ brother and a sister.', options: ['a (ein)', 'a (einen)', 'a (einem)', 'a (eine)'] },
  },
  {
    id: 'g3',
    skill: 'grammar',
    topic: 'prepositions',
    difficulty: 2,
    examLink: 'Schreiben Teil 2 · writing a short message',
    prompt: 'Der Deutschkurs beginnt ______ Montag ______ 18 Uhr.',
    options: ['am … um', 'um … am', 'im … um', 'am … im'],
    answer: 0,
    explanation: 'Days use „am“ (am Montag), clock times use „um“ (um 18 Uhr), months use „im“.',
    en: { prompt: 'The German course starts ______ Monday ______ 6 pm.', options: ['on … at', 'at … on', 'in … at', 'on … in'] },
  },
  {
    id: 'g4',
    skill: 'grammar',
    topic: 'requests',
    difficulty: 2,
    examLink: 'Sprechen Teil 3 · polite requests',
    prompt: 'Sie sprechen mit einer fremden Person: „______ Sie mir bitte helfen?“',
    options: ['Kannst', 'Können', 'Kann', 'Könnt'],
    answer: 1,
    explanation: 'With „Sie“ (formal you) the verb takes the -en form: Können Sie …?',
    en: {
      prompt: 'You are talking to a stranger: “______ you please help me?”',
      options: ['Can (du form)', 'Can (Sie form)', 'Can (ich/er form)', 'Can (ihr form)'],
    },
  },
  {
    id: 'g5',
    skill: 'grammar',
    topic: 'wordOrder',
    difficulty: 3,
    examLink: 'Schreiben Teil 2 · writing a short message',
    prompt: 'Welcher Satz ist richtig? (ankommen = to arrive)',
    options: [
      'Der Zug ankommt um 8 Uhr.',
      'Der Zug kommt um 8 Uhr an.',
      'Der Zug kommt an um 8 Uhr.',
      'Der Zug um 8 Uhr ankommt.',
    ],
    answer: 1,
    explanation: 'Separable verbs split: the prefix „an“ goes to the very end. Der Zug kommt um 8 Uhr an.',
    en: { prompt: 'Which sentence is correct? All four mean “The train arrives at 8 o’clock.”' },
  },

  // ───────────── Reading (real Lesen formats) ─────────────
  {
    id: 'r1',
    skill: 'reading',
    topic: 'readingMessages',
    difficulty: 1,
    examLink: 'Lesen Teil 1 · e-mail, richtig/falsch',
    passage: PARTY_EMAIL,
    prompt: 'Richtig oder falsch? Die Party ist bei Julia zu Hause.',
    options: ['Richtig', 'Falsch'],
    answer: 0,
    explanation: '„bei mir zu Hause“, and Julia wrote the e-mail, so it’s at Julia’s home.',
    en: { passage: PARTY_EMAIL_EN, prompt: 'True or false? The party is at Julia’s home.', options: ['True', 'False'] },
  },
  {
    id: 'r2',
    skill: 'reading',
    topic: 'readingMessages',
    difficulty: 2,
    examLink: 'Lesen Teil 1 · e-mail, richtig/falsch',
    passage: PARTY_EMAIL,
    prompt: 'Richtig oder falsch? Anna soll Getränke mitbringen.',
    options: ['Richtig', 'Falsch'],
    answer: 1,
    explanation: 'Anna should bring a salad. „Getränke habe ich schon“ means Julia already has drinks.',
    en: { passage: PARTY_EMAIL_EN, prompt: 'True or false? Anna should bring drinks.', options: ['True', 'False'] },
  },
  {
    id: 'r3',
    skill: 'reading',
    topic: 'readingAds',
    difficulty: 2,
    examLink: 'Lesen Teil 2 · choose the right ad (a or b)',
    passage: COURSE_ADS,
    prompt: 'Sie arbeiten von Montag bis Freitag bis 19 Uhr. Welcher Kurs passt für Sie?',
    options: ['Anzeige a', 'Anzeige b'],
    answer: 1,
    explanation: 'You work until 7 pm on weekdays, so the 6–8 pm course (a) doesn’t work. The weekend course (b) does.',
    en: { passage: COURSE_ADS_EN, prompt: 'You work Monday to Friday until 7 pm. Which course suits you?', options: ['Ad a', 'Ad b'] },
  },
  {
    id: 'r4',
    skill: 'reading',
    topic: 'readingNotices',
    difficulty: 2,
    examLink: 'Lesen Teil 3 · notices, richtig/falsch',
    passage: DOCTOR_NOTICE,
    prompt: 'Richtig oder falsch? Sie können am Donnerstag um 16 Uhr zum Arzt gehen.',
    options: ['Richtig', 'Falsch'],
    answer: 0,
    explanation: '„Dienstag und Donnerstag auch 15–18 Uhr“, so Thursday at 16:00 is open.',
    en: { passage: DOCTOR_NOTICE_EN, prompt: 'True or false? You can go to the doctor on Thursday at 4 pm.', options: ['True', 'False'] },
  },
  {
    id: 'r5',
    skill: 'reading',
    topic: 'readingNotices',
    difficulty: 3,
    examLink: 'Lesen Teil 3 · notices, richtig/falsch',
    passage: STATION_SIGN,
    prompt: 'Richtig oder falsch? Der Zug nach München fährt heute von Gleis 3.',
    options: ['Richtig', 'Falsch'],
    answer: 1,
    explanation: 'Because of construction work (Bauarbeiten) it leaves from Gleis 5 today.',
    en: { passage: STATION_SIGN_EN, prompt: 'True or false? The train to Munich leaves from platform 3 today.', options: ['True', 'False'] },
  },
];

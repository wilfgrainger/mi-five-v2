import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export type Category = 'ALL_DATA_FILES' | 'COLD_WAR' | 'CYBER_SECURITY' | 'GCHQ_CLASSIC' | 'SIGNAL_INT' | 'LOGIC_OPS' | 'GEOLOCATION' | 'IMAGE_INT' | 'MI5_101' | 'CODE_BREAKER' | 'INTELLIGENCE_DEBRIEF';

export interface Puzzle {
  id: string;
  title: string;
  description: string;
  category: Category;
  difficulty: 'EASY' | 'MEDIUM' | 'HARD' | 'ELITE';
  points: number;
  answer: string;
  hint: string;
  imageUrl?: string;
  type?: 'STANDARD' | 'MASTERMIND' | 'TRIVIA' | 'EMOJI_CRYPTO' | 'OBSERVATION';
  observationData?: string;
}

const puzzles: Puzzle[] = [];
let idCounter = 1;

function addPuzzle(p: Omit<Puzzle, 'id'>) {
  puzzles.push({
    ...p,
    id: `0X_MISSION_${String(idCounter++).padStart(4, '0')}`
  });
}

// ---------------------------------------------------------
// GENERATOR: MI5 101 (Trivia)
// ---------------------------------------------------------

const mi5Trivia = [
  { q: "What year was MI5 founded?", a: "1909", h: "Early 20th century." },
  { q: "Who was the first Director General of MI5?", a: "VERNON KELL", h: "A Major General." },
  { q: "What does MI5 stand for?", a: "MILITARY INTELLIGENCE SECTION 5", h: "It's a section of Military Intelligence." },
  { q: "Where is the current headquarters of MI5 located?", a: "THAMES HOUSE", h: "A building in London near the river." },
  { q: "What is the primary role of MI5?", a: "DOMESTIC SECURITY", h: "Focuses inside the UK." },
  { q: "What year did MI5 move into Thames House?", a: "1994", h: "Mid 1990s." },
  { q: "Who was the first female Director General of MI5?", a: "STELLA RIMINGTON", h: "She was DG in the 1990s." },
  { q: "What act sets out the functions of MI5?", a: "SECURITY SERVICE ACT 1989", h: "Passed in 1989." },
  { q: "During WWI, what was MI5 originally known as?", a: "MO5", h: "M...O...5." },
  { q: "Which department is responsible for foreign intelligence?", a: "MI6", h: "Also known as SIS." }
];

for (let i = 0; i < 50; i++) {
  const trivia = mi5Trivia[i % mi5Trivia.length];
  addPuzzle({
    title: `MI5 101: Question ${i + 1}`,
    description: trivia.q,
    category: 'MI5_101',
    difficulty: 'EASY',
    points: 25,
    answer: trivia.a,
    hint: trivia.h,
    type: 'TRIVIA'
  });
}

// ---------------------------------------------------------
// GENERATOR: CODE BREAKER (Emoji)
// ---------------------------------------------------------

const emojiMap: Record<string, string> = {
  "AGENT": "🕵️",
  "TARGET": "🎯",
  "MEETING": "🤝",
  "NIGHT": "🌙",
  "CITY": "🏙️",
  "AIRPORT": "✈️",
  "TRAIN": "🚆",
  "CAR": "🚗",
  "SAFEHOUSE": "🏠",
  "DANGER": "⚠️",
  "MONEY": "💰",
  "DOCUMENT": "📄",
  "WEAPON": "🔫",
  "BOMB": "💣",
  "ESCAPE": "🏃",
  "WATCH": "👀",
  "LISTEN": "👂",
  "TALK": "🗣️",
  "SILENT": "🤫",
  "TIME": "⏱️",
  "PHONE": "📱",
  "CAMERA": "📷",
  "COMPUTER": "💻",
  "LOCK": "🔒",
  "UNLOCK": "🔓",
  "KEY": "🔑",
  "FIRE": "🔥",
  "WATER": "💧"
};

const sentenceStructures = [
  ["AGENT", "WATCH", "TARGET"],
  ["MEETING", "CITY", "NIGHT"],
  ["TARGET", "ESCAPE", "TRAIN"],
  ["AGENT", "TALK", "SAFEHOUSE"],
  ["DANGER", "BOMB", "CITY"],
  ["MONEY", "MEETING", "TIME"],
  ["AGENT", "CAMERA", "DOCUMENT"],
  ["TARGET", "WEAPON", "CAR"],
  ["LISTEN", "PHONE", "SILENT"],
  ["LOCK", "SAFEHOUSE", "KEY"]
];

for (let i = 0; i < 100; i++) {
  const structure = sentenceStructures[Math.floor(Math.random() * sentenceStructures.length)];
  const emojis = structure.map(word => emojiMap[word]).join(" ");
  const answer = structure.join(" ");

  addPuzzle({
    title: `CODE BREAKER: INTERCEPT ${i + 1}`,
    description: `Decipher this coded emoji message sent by a field agent:\n\n${emojis}`,
    category: 'CODE_BREAKER',
    difficulty: 'MEDIUM',
    points: 50,
    answer: answer,
    hint: "Translate each emoji into a single word related to spycraft.",
    type: 'EMOJI_CRYPTO',
    observationData: emojis // Reuse this field to store the emoji string for easy rendering
  });
}

// ---------------------------------------------------------
// GENERATOR: INTELLIGENCE DEBRIEF (Observation)
// ---------------------------------------------------------

const suspects = ["ALPHA", "BRAVO", "CHARLIE", "DELTA", "ECHO"];
const locations = ["LONDON", "PARIS", "BERLIN", "MOSCOW", "BEIJING"];
const actions = ["MEETING", "DROPOFF", "SURVEILLANCE", "INFILTRATION", "EXTRACTION"];
const objects = ["BRIEFCASE", "USB DRIVE", "ENVELOPE", "LAPTOP", "PASSPORT"];
const times = ["08:00", "12:00", "15:30", "21:00", "23:45"];

for (let i = 0; i < 50; i++) {
  const s = suspects[Math.floor(Math.random() * suspects.length)];
  const l = locations[Math.floor(Math.random() * locations.length)];
  const a = actions[Math.floor(Math.random() * actions.length)];
  const o = objects[Math.floor(Math.random() * objects.length)];
  const t = times[Math.floor(Math.random() * times.length)];

  const profile = `TARGET: ${s}\nLOCATION: ${l}\nACTION: ${a}\nITEM: ${o}\nTIME: ${t}`;

  const questions = [
    { q: "Who was the target?", a: s },
    { q: "Where was the location?", a: l },
    { q: "What action was taking place?", a: a },
    { q: "What item was involved?", a: o },
    { q: "What time did this occur?", a: t }
  ];

  const question = questions[Math.floor(Math.random() * questions.length)];

  addPuzzle({
    title: `INTELLIGENCE DEBRIEF: PROFILE ${i + 1}`,
    description: `You will have 10 seconds to memorize the suspect profile. Once the time is up, answer the following question:\n\n${question.q}`,
    category: 'INTELLIGENCE_DEBRIEF',
    difficulty: 'HARD',
    points: 75,
    answer: question.a,
    hint: "Pay close attention to all details in the profile.",
    type: 'OBSERVATION',
    observationData: profile
  });
}

// ---------------------------------------------------------
// Write to file
// ---------------------------------------------------------

const outputContent = `export type Category = 'ALL_DATA_FILES' | 'COLD_WAR' | 'CYBER_SECURITY' | 'GCHQ_CLASSIC' | 'SIGNAL_INT' | 'LOGIC_OPS' | 'GEOLOCATION' | 'IMAGE_INT' | 'MI5_101' | 'CODE_BREAKER' | 'INTELLIGENCE_DEBRIEF';

export interface Puzzle {
  id: string;
  title: string;
  description: string;
  category: Category;
  difficulty: 'EASY' | 'MEDIUM' | 'HARD' | 'ELITE';
  points: number;
  answer: string;
  hint: string;
  imageUrl?: string;
  type?: 'STANDARD' | 'MASTERMIND' | 'TRIVIA' | 'EMOJI_CRYPTO' | 'OBSERVATION';
  observationData?: string;
}

export const puzzles: Puzzle[] = ${JSON.stringify(puzzles, null, 2)};
`;

fs.writeFileSync(path.join(__dirname, '../src/data/puzzles.ts'), outputContent);
console.log(`Generated ${puzzles.length} missions in src/data/puzzles.ts`);

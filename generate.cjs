const fs = require('fs');
const crypto = require('node:crypto');

const categories = ['COLD_WAR', 'CYBER_SECURITY', 'GCHQ_CLASSIC', 'SIGNAL_INT', 'LOGIC_OPS', 'GEOLOCATION'];
const difficulties = ['EASY', 'MEDIUM', 'HARD', 'ELITE'];

const puzzles = [
  {
    id: '0X_ELITE_1',
    title: 'THE LETTER COUNT',
    description: 'If 1=3, 2=3, 3=5, 4=4, 5=4, 6=3, 7=5, 8=5, 9=4, and 10=3, what does 11 equal?',
    category: 'LOGIC_OPS',
    difficulty: 'HARD',
    points: 100,
    answer: '6',
    hint: 'Count the letters in the English word for each number.'
  },
  {
    id: '0X_ELITE_2',
    title: 'THE CONNECTING LINK',
    description: 'Find the single word that connects these four: GOLD, GLOVE, BOX, and PRINT.',
    category: 'GCHQ_CLASSIC',
    difficulty: 'HARD',
    points: 100,
    answer: 'FINGER',
    hint: 'Think of James Bond for the first one, and what you leave at a crime scene for the last.'
  },
  {
    id: '0X_ELITE_3',
    title: 'SEQUENCE OF THE AGES',
    description: 'Identify the next character in this progression: M, V, E, M, J, S, U, ?',
    category: 'LOGIC_OPS',
    difficulty: 'HARD',
    points: 100,
    answer: 'N',
    hint: 'Look up to the night sky. Think of our solar system.'
  },
  {
    id: '0X_ELITE_4',
    title: 'THE MISSING MONTH',
    description: 'What connects: APR, JUN, SEP, and NOV?',
    category: 'GCHQ_CLASSIC',
    difficulty: 'MEDIUM',
    points: 50,
    answer: '30',
    hint: 'Thirty days hath...'
  },
  {
    id: '0X_ELITE_5',
    title: 'THE INFINITE STAIRCASE',
    description: 'What is the next number in this sequence: 2, 3, 10, 12, 13, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, ?',
    category: 'LOGIC_OPS',
    difficulty: 'HARD',
    points: 100,
    answer: '200',
    hint: 'Think about how these numbers are spelled in English. What letter do they all start with?'
  },
  {
    id: '0X_ELITE_6',
    title: 'THE SPY\'S LANDMARK',
    description: 'Identify the city: It contains a "Checkpoint" named after a letter of the alphabet, it was once divided by a wall, and its name is an anagram of "LINREB".',
    category: 'COLD_WAR',
    difficulty: 'MEDIUM',
    points: 50,
    answer: 'BERLIN',
    hint: 'Checkpoint Charlie.'
  },
  {
    id: '0X_ELITE_10',
    title: 'THE DOUBLE AGENT',
    description: 'Identify the spy: Born in Estoril, 1912. Codename GARBO. He helped deceive the Germans about the D-Day landing site.',
    category: 'COLD_WAR',
    difficulty: 'HARD',
    points: 100,
    answer: 'JUAN PUJOL GARCIA',
    hint: 'He was a Spanish double agent.'
  }
];

// Generate the rest to reach 300
let idCounter = 11;

// Helper to generate Caesar cipher puzzles
const generateCaesar = (shift, text, answer) => {
  const shiftChar = (c, s) => {
    if (!/[a-zA-Z]/.test(c)) return c;
    const base = c.charCodeAt(0) >= 97 ? 97 : 65;
    return String.fromCharCode(((c.charCodeAt(0) - base + s) % 26 + 26) % 26 + base);
  };
  const cipher = text.split('').map(c => shiftChar(c, shift)).join('');
  return {
    id: `0X_GEN_${idCounter++}`,
    title: `INTERCEPTED SIGNAL ALPHA-${shift}`,
    description: `Decrypt this Vigenère/Caesar intercept (Shift +${shift}): ${cipher}`,
    category: 'SIGNAL_INT',
    difficulty: 'EASY',
    points: 25,
    answer: answer.toUpperCase(),
    hint: `Shift each letter back by ${shift} positions in the alphabet.`
  };
};

const words = ['ENIGMA', 'BLETCHLEY', 'TURING', 'MI5', 'INTELLIGENCE', 'ESPIONAGE', 'CRYPTOGRAPHY', 'CYPHER', 'AGENT', 'COVERT', 'OPERATION', 'CLASSIFIED', 'TOPSECRET', 'ASSET', 'HANDLER', 'DEADDROP', 'WIRETAP', 'SURVEILLANCE', 'RECONNAISSANCE', 'INFILTRATION'];

for (let i = 0; i < 100; i++) {
  const word = words[i % words.length];
  const shift = (i % 25) + 1;
  puzzles.push(generateCaesar(shift, word, word));
}

// Generate some math/logic sequences
for (let i = 0; i < 100; i++) {
  const start = i + 2;
  const mult = (i % 5) + 2;
  const seq = [start, start * mult, start * mult * mult, start * mult * mult * mult];
  const next = seq[3] * mult;
  puzzles.push({
    id: `0X_GEN_${idCounter++}`,
    title: `NUMERIC PROGRESSION ${i}`,
    description: `Identify the next value in the sequence: ${seq.join(', ')}, ?`,
    category: 'LOGIC_OPS',
    difficulty: 'MEDIUM',
    points: 50,
    answer: next.toString(),
    hint: `Multiply each term by ${mult}.`
  });
}

// Generate some geolocation coordinates
const cities = [
  { name: 'LONDON', lat: '51.5074', lon: '-0.1278' },
  { name: 'MOSCOW', lat: '55.7558', lon: '37.6173' },
  { name: 'WASHINGTON', lat: '38.9072', lon: '-77.0369' },
  { name: 'BERLIN', lat: '52.5200', lon: '13.4050' },
  { name: 'PARIS', lat: '48.8566', lon: '2.3522' },
  { name: 'BEIJING', lat: '39.9042', lon: '116.4074' },
  { name: 'LANGLEY', lat: '38.9509', lon: '-77.1483' },
  { name: 'CHELTENHAM', lat: '51.8994', lon: '-2.0783' } // GCHQ
];

for (let i = 0; i < 93; i++) {
  const city = cities[i % cities.length];
  // slightly obfuscate coordinates
  // Use crypto.getRandomValues instead of Math.random
  const randomBuffer = new Uint32Array(2);
  crypto.webcrypto.getRandomValues(randomBuffer);
  // Convert to float between 0 and 1
  const randLat = randomBuffer[0] / (0xffffffff + 1);
  const randLon = randomBuffer[1] / (0xffffffff + 1);
  const lat = parseFloat(city.lat) + (randLat * 0.01 - 0.005);
  const lon = parseFloat(city.lon) + (randLon * 0.01 - 0.005);
  
  puzzles.push({
    id: `0X_GEN_${idCounter++}`,
    title: `GEOLOCATION TRACE ${i}`,
    description: `Agent trace detected at coordinates: ${lat.toFixed(4)} N, ${lon.toFixed(4)} E. Identify the closest major city/headquarters.`,
    category: 'GEOLOCATION',
    difficulty: 'MEDIUM',
    points: 50,
    answer: city.name,
    hint: `Use a map to look up the coordinates.`
  });
}

const dataPath = 'src/data/puzzles.ts';
let existingContent = '';
let existingPuzzles = [];
try {
  existingContent = fs.readFileSync(dataPath, 'utf-8');
  const match = existingContent.match(/export const puzzles: Puzzle\[\] = (\[[\s\S]*\]);/);
  if (match && match[1]) {
    existingPuzzles = JSON.parse(match[1]);
  }
} catch (e) {
  // Ignore
}

const mergedPuzzles = existingPuzzles.concat(puzzles);

const fileContent = `export type Category = 'ALL_DATA_FILES' | 'COLD_WAR' | 'CYBER_SECURITY' | 'GCHQ_CLASSIC' | 'SIGNAL_INT' | 'LOGIC_OPS' | 'GEOLOCATION' | 'IMAGE_INT' | 'MI5_101' | 'CODE_BREAKER' | 'INTELLIGENCE_DEBRIEF' | 'CRYPTOGRAPHY' | 'LINGUISTIC' | 'PATTERN_RECOGNITION' | 'PURE_LOGIC';

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

export const puzzles: Puzzle[] = ${JSON.stringify(mergedPuzzles, null, 2)};
`;

fs.writeFileSync(dataPath, fileContent);
console.log('Appended ' + puzzles.length + ' puzzles in src/data/puzzles.ts. Total: ' + mergedPuzzles.length);

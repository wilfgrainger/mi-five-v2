import { v4 as uuidv4 } from 'uuid';
import * as crypto from 'node:crypto';

const SPY_QUOTES = [
  "THE ASSET HAS BEEN COMPROMISED",
  "MEET AT THE SAFE HOUSE AT DAWN",
  "THE PACKAGE IS IN THE DROP ZONE",
  "ABORT MISSION IMMEDIATELY",
  "TARGET ACQUIRED AWAITING ORDERS",
  "OPERATION BLACKOUT IS A GO",
  "THE MOLE IS IN THE SYNDICATE"
];

export function generateSubstitution(userId: string) {
  const plaintext = SPY_QUOTES[crypto.randomInt(SPY_QUOTES.length)];
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  // Fisher-Yates shuffle using crypto.randomInt
  let arr = alphabet.split('');
  for (let i = arr.length - 1; i > 0; i--) {
    const j = crypto.randomInt(i + 1);
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  let shuffled = arr.join('');
  
  let encrypted = "";
  for (let char of plaintext) {
    if (char === " ") encrypted += " ";
    else {
      const idx = alphabet.indexOf(char);
      encrypted += shuffled[idx];
    }
  }

  return {
    id: uuidv4(),
    user_id: userId,
    type: 'substitution',
    title: 'Intercepted Cryptogram',
    description: 'Decrypt the following intercepted message. The enemy has used a simple substitution cipher. Analyze letter frequencies and patterns.',
    difficulty: 'Medium',
    multiplier: 2,
    puzzle_data: JSON.stringify({ encryptedText: encrypted }),
    answer: plaintext
  };
}

export function generateScytale(userId: string) {
  const plaintext = SPY_QUOTES[crypto.randomInt(SPY_QUOTES.length)].replace(/ /g, '');
  const diameter = crypto.randomInt(4) + 3; // 3 to 6
  
  // Pad plaintext
  let padded = plaintext;
  while (padded.length % diameter !== 0) {
    padded += "X";
  }

  let encrypted = "";
  const rows = padded.length / diameter;
  for (let i = 0; i < diameter; i++) {
    for (let j = 0; j < rows; j++) {
      encrypted += padded[j * diameter + i];
    }
  }

  return {
    id: uuidv4(),
    user_id: userId,
    type: 'scytale',
    title: 'The Scytale Cylinder',
    description: 'This message was encrypted using an ancient transposition method. Wrap the text around a cylinder of the correct diameter to read it.',
    difficulty: 'Easy',
    multiplier: 1,
    puzzle_data: JSON.stringify({ encryptedText: encrypted, maxDiameter: 12 }),
    answer: padded
  };
}

export function generateBookCipher(userId: string) {
  const text = `The quick brown fox jumps over the lazy dog.
Agents must remain vigilant at all times.
Security is our number one priority today.
Never leave your terminal unlocked or unattended.
The eagle flies at midnight under the pale moon.
Trust no one and verify all incoming transmissions.`;
  
  const lines = text.split('\n');
  const words = lines.map(l => l.split(' '));
  
  const targetWords = [];
  const coordinates = [];
  
  for (let i = 0; i < 3; i++) {
    const lineIdx = crypto.randomInt(lines.length);
    const wordIdx = crypto.randomInt(words[lineIdx].length);
    targetWords.push(words[lineIdx][wordIdx].replace(/[^a-zA-Z]/g, '').toUpperCase());
    coordinates.push([lineIdx + 1, wordIdx + 1]); // 1-indexed
  }

  return {
    id: uuidv4(),
    user_id: userId,
    type: 'book',
    title: 'Book Cipher Intercept',
    description: 'Use the provided reference text and coordinates (Line, Word) to extract the hidden message.',
    difficulty: 'Medium',
    multiplier: 2,
    puzzle_data: JSON.stringify({ text, coordinates }),
    answer: targetWords.join(' ')
  };
}

export function generateMapColoring(userId: string) {
  // Simple planar graph
  const nodes = [
    { id: 'A', x: 20, y: 20 },
    { id: 'B', x: 80, y: 20 },
    { id: 'C', x: 50, y: 50 },
    { id: 'D', x: 20, y: 80 },
    { id: 'E', x: 80, y: 80 }
  ];
  const edges = [
    ['A', 'B'], ['A', 'C'], ['B', 'C'],
    ['A', 'D'], ['C', 'D'], ['C', 'E'], ['B', 'E'], ['D', 'E']
  ];

  return {
    id: uuidv4(),
    user_id: userId,
    type: 'map_coloring',
    title: 'Frequency Allocation',
    description: 'Assign frequencies (colors) to the surveillance nodes such that no two connected nodes share the same frequency. Use a maximum of 4 frequencies.',
    difficulty: 'Hard',
    multiplier: 3,
    puzzle_data: JSON.stringify({ nodes, edges }),
    answer: 'JSON_VERIFY' // Special flag to verify via custom logic
  };
}

export function generateRandomPuzzle(userId: string) {
  const generators = [generateSubstitution, generateScytale, generateBookCipher, generateMapColoring];
  const generator = generators[crypto.randomInt(generators.length)];
  return generator(userId);
}

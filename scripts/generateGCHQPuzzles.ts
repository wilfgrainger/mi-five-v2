import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import crypto from 'node:crypto';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export type Category = 'ALL_DATA_FILES' | 'COLD_WAR' | 'CYBER_SECURITY' | 'GCHQ_CLASSIC' | 'SIGNAL_INT' | 'LOGIC_OPS' | 'GEOLOCATION' | 'IMAGE_INT' | 'MI5_101' | 'CODE_BREAKER' | 'INTELLIGENCE_DEBRIEF' | 'CRYPTOGRAPHY' | 'LINGUISTIC' | 'PATTERN_RECOGNITION' | 'PURE_LOGIC';

export interface Puzzle {
  id: string;
  title: string;
  description: string;
  category: Category;
  difficulty: 'EASY' | 'MEDIUM' | 'HARD' | 'ELITE';
  points: number;
  answer: string;
  hint: string;
  type?: 'STANDARD' | 'MASTERMIND' | 'TRIVIA' | 'EMOJI_CRYPTO' | 'OBSERVATION';
  observationData?: string;
  imageUrl?: string;
}

const puzzles: Puzzle[] = [];
let idCounter = 1;

function addPuzzle(p: Omit<Puzzle, 'id'>) {
  puzzles.push({
    ...p,
    id: `0X_GCHQ_${String(idCounter++).padStart(4, '0')}`
  });
}

function randInt(max: number) {
  return crypto.randomInt(max);
}

// ---------------------------------------------------------
// GENERATOR 1: Steganography (Caesar shifted first letters)
// ---------------------------------------------------------
const sentencesMap: Record<string, string[]> = {
  'A': ["All agents are advised.", "Always verify credentials.", "Arrival is imminent.", "Assess the situation carefully.", "Action required immediately.", "Await further instructions."],
  'B': ["Briefings are scheduled daily.", "Base operations compromised.", "Be aware of your surroundings.", "Backup is on the way.", "Begin transmission now.", "Border crossings are monitored."],
  'C': ["Contact command immediately.", "Clear the designated area.", "Covert operations underway.", "Check your equipment.", "Confirm receipt of message.", "Cease all communications."],
  'D': ["Details are highly classified.", "Do not engage the target.", "Deliver the package securely.", "Deception is expected.", "Determine the exact location.", "Deploy countermeasures."],
  'E': ["Every agent must report in.", "Evacuate the premises.", "Establish a secure perimeter.", "Extraction team is standing by.", "Ensure the perimeter is secure.", "Expect resistance."],
  'F': ["Follow standard protocols.", "Forward the intelligence report.", "Find the hidden asset.", "Focus on the primary objective.", "Falsify the records if necessary.", "Finalize the extraction plan."],
  'G': ["Gather all available intelligence.", "Go to the safe house.", "Guard the entrance.", "Get ready for deployment.", "Give the signal.", "Generate a distraction."],
  'H': ["Headquarters expects compliance.", "Hold your position.", "Hide the evidence.", "Hostiles are approaching.", "Hasten your departure.", "Handle the situation delicately."],
  'I': ["Investigate the anomaly.", "Identify the mole.", "Initiate protocol Alpha.", "Intercept the enemy transmission.", "Ignore previous instructions.", "Infiltrate the facility."],
  'J': ["Join the main squad.", "Jump point is compromised.", "Justify your actions.", "Jettison the cargo.", "Jam the enemy frequencies.", "Judge the situation quickly."],
  'K': ["Keep all communications secure.", "Know your enemy.", "Keep the asset safe.", "Knock out the power grid.", "Keep moving forward.", "Kindle a distraction fire."],
  'L': ["Leave no trace behind.", "Locate the missing file.", "Listen to the briefing.", "Lock down the facility.", "Launch the drone.", "Leave the premises immediately."],
  'M': ["Maintain current positions.", "Move to the extraction point.", "Monitor the enemy movement.", "Make no sudden movements.", "Meet at the rendezvous point.", "Memorize the sequence."],
  'N': ["No unauthorized personnel allowed.", "Never compromise the mission.", "Note the time of arrival.", "Navigate to the designated coordinates.", "Neutralize the threat.", "Notice any suspicious activity."],
  'O': ["Operation is a go.", "Observe the target from a distance.", "Obtain the encrypted drive.", "Overcome the obstacles.", "Organize the defense.", "Operate with extreme caution."],
  'P': ["Proceed with caution.", "Protect the VIP.", "Prepare for extraction.", "Plant the listening device.", "Patrol the perimeter.", "Prevent the enemy from advancing."],
  'Q': ["Questions should be directed to command.", "Quartermasters will distribute supplies.", "Quickly secure the area.", "Quietly approach the target.", "Quell the uprising.", "Quote the password."],
  'R': ["Routine checks are mandatory.", "Report any incidents immediately.", "Return to base.", "Recover the stolen data.", "Rendezvous at midnight.", "Review the intelligence briefing."],
  'S': ["Standard protocols apply.", "Secure the perimeter.", "Stay alert at all times.", "Send the coordinates.", "Sabotage the enemy equipment.", "Survey the area carefully."],
  'T': ["Target destination secured.", "Track the enemy movement.", "Take cover immediately.", "Transmit the data.", "Terminate the operation.", "Trust no one."],
  'U': ["Until further notice, maintain current positions.", "Use extreme caution.", "Understand the risks.", "Uncover the hidden truth.", "Update the status report.", "Utilize all available resources."],
  'V': ["Verify all incoming transmissions.", "Validate the intelligence.", "View the surveillance footage.", "Vanish without a trace.", "Vandalize the enemy equipment.", "Venture into the unknown."],
  'W': ["Watch for any suspicious activity.", "Wait for the signal.", "Withdraw immediately.", "Warn the others.", "Weaken the enemy defenses.", "Work together as a team."],
  'X': ["X-ray the package.", "Xerox the documents.", "X-out the classified information."],
  'Y': ["Yield to the superior officer.", "Yank the cord.", "Yell if you need help."],
  'Z': ["Zone is secure.", "Zero in on the target.", "Zigzag to avoid enemy fire."]
};

const meetingPlaces = [
  "HYDE PARK", "TOWER BRIDGE", "BIG BEN", "LONDON EYE", "TRAFALGAR SQ",
  "PICCADILLY", "COVENT GARDEN", "SOHO", "WESTMINSTER", "PALL MALL",
  "MI5 HQ", "THAMES HOUSE", "WHITEHALL", "DOWNING ST", "THE SHARD",
  "SAINT PAULS", "KINGS CROSS", "BAKER ST", "BOND ST", "FLEET ST"
];

function generateSteganography(count: number) {
  for (let i = 0; i < count; i++) {
    const place = meetingPlaces[randInt(meetingPlaces.length)];
    const shift = randInt(25) + 1; // 1 to 25

    // Encrypt the place (ignoring spaces)
    let encryptedChars = [];
    for (const char of place) {
      if (char === ' ') continue;
      const charCode = char.charCodeAt(0);
      let shifted = charCode + shift;
      if (shifted > 90) shifted -= 26;
      encryptedChars.push(String.fromCharCode(shifted));
    }

    // Build the intercept sentences
    let interceptSentences = [];
    for (const ec of encryptedChars) {
      const possibleSentences = sentencesMap[ec] || ["Zebra protocol initiated."];
      interceptSentences.push(possibleSentences[randInt(possibleSentences.length)]);
    }
    const intercept = interceptSentences.join(" ");

    const briefing = `Our field agents intercepted a routine status update from a suspected compromised asset. The asset is a traditionalist, known to favor classical Roman techniques, often advancing their operational plans exactly ${shift} steps at a time. Find the hidden directive within the text.`;

    const formattedDesc = `**1. PUZZLE CATEGORY:** Steganography / Substitution
**2. DIFFICULTY LEVEL:** 4
**3. THE BRIEFING:**
${briefing}

**4. THE INTERCEPT:**
${intercept}

**5. HINTS:**
- Hint 1: Look at the very beginning of things. Sometimes the first step is the most important.
- Hint 2: Extract the first letter of each sentence to reveal a hidden string of letters.
- Hint 3: The string is meaningless on its own, but remember the asset's favorite "classical Roman technique" and the "${shift} steps" mentioned in the briefing.

**6. THE SOLUTION:**
${place.replace(/ /g, '')}

**7. METHODOLOGY:**
1. Extract the first letter of each sentence in the intercept to reveal the ciphertext: **${encryptedChars.join('')}**.
2. The briefing hints at "classical Roman techniques" (Caesar Cipher) and "advancing... ${shift} steps" (a shift of ${shift}).
3. Shift each letter back by ${shift} in the alphabet to decode the message.
4. The decrypted sequence spells out the meeting location: **${place.replace(/ /g, '')}**.`;

    addPuzzle({
      title: `OPERATION CAESAR SHADOW ${i+1}`,
      description: formattedDesc,
      category: 'CRYPTOGRAPHY',
      difficulty: 'MEDIUM',
      points: 40,
      answer: place.replace(/ /g, ''),
      hint: "Look at the first letter of each sentence, then apply a Caesar shift.",
      type: 'STANDARD'
    });
  }
}

// ---------------------------------------------------------
// GENERATOR 2: Linguistic / Phonetic (NATO Alphabet)
// ---------------------------------------------------------
const natoClues: Record<string, string[]> = {
  'A': ["The beginning of all things, the brightest star in a constellation.", "The dominant member of a pack."],
  'B': ["A commendation for a job well done.", "Applause or cheer for a good performance."],
  'C': ["The third in line, often associated with a checkpoint.", "A common name for a cheeky chap."],
  'D': ["The fertile triangle at the mouth of a river.", "A difference or change in a variable."],
  'E': ["The reflection of one's own voice in the mountains.", "A nymph from Greek mythology who faded away."],
  'F': ["A lively dance step, often associated with a trot.", "A bushy-tailed animal known for its cunning."],
  'G': ["A gentleman's game played on a green.", "A sport requiring clubs and a small white ball."],
  'H': ["A place providing lodging for weary travelers.", "An establishment offering a bed for the night."],
  'I': ["The jewel in the crown of the former empire.", "A vast peninsula in South Asia."],
  'J': ["The tragic heroine who loved a Montague.", "A female given name meaning 'youthful'."],
  'K': ["A unit of mass in the metric system.", "A thousand grams of weight."],
  'L': ["The capital city of a South American country.", "A green citrus fruit."],
  'M': ["The device that ensures we are heard loud and clear.", "A common shortening for a microphone."],
  'N': ["The eleventh month of the Gregorian calendar.", "A month known for falling leaves and Thanksgiving."],
  'O': ["An award given by the Academy of Motion Picture Arts and Sciences.", "A statuette coveted by actors."],
  'P': ["The head of the family, a father figure.", "A loving term for a grandfather."],
  'Q': ["A province in eastern Canada.", "A predominantly French-speaking region."],
  'R': ["The lover who met a tragic end in Verona.", "A male protagonist in a Shakespearean tragedy."],
  'S': ["A rugged mountain range spanning North America.", "A jagged peak rising above the clouds."],
  'T': ["A rhythmic and expressive dance of Latin American origin.", "It takes two to perform this dance."],
  'U': ["A standardized outfit worn by members of a group.", "Clothing that makes everyone look identical."],
  'V': ["The winner of a battle or contest.", "One who has achieved a triumph."],
  'W': ["A spirit distilled from fermented grain mash.", "A strong alcoholic beverage often aged in oak."],
  'X': ["An electromagnetic wave of high energy.", "A medical imaging technique to see bones."],
  'Y': ["An American colloquialism for a northerner.", "A player for a famous New York baseball team."],
  'Z': ["An African equine with distinctive black and white stripes.", "A creature often found on pedestrian crossings."]
};

const phoneticCities = [
  "CAMBRIDGE", "OXFORD", "LONDON", "BRISTOL", "MANCHESTER",
  "BIRMINGHAM", "LIVERPOOL", "LEEDS", "GLASGOW", "EDINBURGH",
  "CARDIFF", "BELFAST", "YORK", "BATH", "CHESTER",
  "DURHAM", "LINCOLN", "NORWICH", "WINCHESTER", "CANTERBURY"
];

function generatePhonetic(count: number) {
  for (let i = 0; i < count; i++) {
    const city = phoneticCities[randInt(phoneticCities.length)];

    let interceptLines = [];
    let methodLines = [];
    for (let j = 0; j < city.length; j++) {
      const letter = city[j];
      const clues = natoClues[letter] || ["A standard NATO phonetic word."];
      const clue = clues[randInt(clues.length)];
      interceptLines.push(`${j + 1}. ${clue}`);

      const natoWords: Record<string, string> = { A:'Alpha', B:'Bravo', C:'Charlie', D:'Delta', E:'Echo', F:'Foxtrot', G:'Golf', H:'Hotel', I:'India', J:'Juliet', K:'Kilo', L:'Lima', M:'Mike', N:'November', O:'Oscar', P:'Papa', Q:'Quebec', R:'Romeo', S:'Sierra', T:'Tango', U:'Uniform', V:'Victor', W:'Whiskey', X:'X-ray', Y:'Yankee', Z:'Zulu' };
      methodLines.push(`- Clue ${j + 1} = **${natoWords[letter]}**`);
    }

    const formattedDesc = `**1. PUZZLE CATEGORY:** Linguistic / Wordplay (Phonetic)
**2. DIFFICULTY LEVEL:** 5
**3. THE BRIEFING:**
A rogue agent has left a flight itinerary on a burned hard drive. The destination is disguised using a series of cryptic references. If we don't decipher the location, we lose the trail before the target boards their flight.

**4. THE INTERCEPT:**
Target destination secured. Route confirmed through the following sequence:
${interceptLines.join('\n')}

**5. HINTS:**
- Hint 1: These clues don't point to places on a map; they point to a standard communication protocol used by militaries worldwide.
- Hint 2: Each line describes a specific word from the NATO phonetic alphabet.
- Hint 3: Take the first letter of each phonetic word to spell out a famous British city.

**6. THE SOLUTION:**
${city}

**7. METHODOLOGY:**
1. Solve each clue to find the corresponding word in the NATO phonetic alphabet:
${methodLines.join('\n')}
2. Taking the first letter of each word reveals the target city: **${city}**.`;

    addPuzzle({
      title: `PHONETIC ITINERARY ${i+1}`,
      description: formattedDesc,
      category: 'LINGUISTIC',
      difficulty: 'MEDIUM',
      points: 50,
      answer: city,
      hint: "Think about the NATO phonetic alphabet.",
      type: 'STANDARD'
    });
  }
}

// ---------------------------------------------------------
// GENERATOR 3: Logic / Deduction (The Mole)
// ---------------------------------------------------------
const agentNames = ["Archer", "Baker", "Carter", "Drake", "Ellis", "Finch", "Gomez", "Hayes", "Ives", "Jones", "Keller", "Lowe"];

function generateLogic(count: number) {
  for (let i = 0; i < count; i++) {
    // Pick 5 random agents
    let shuffledAgents = [...agentNames].sort(() => crypto.randomInt(3) - 1).slice(0, 5);

    // Roles mapping: 0, 1, 2, 3, 4
    let roles = [...shuffledAgents];
    const moleAgent = roles[3]; // D is the mole

    let statements = [];
    statements.push(`**${roles[0]}:** "${roles[1]} is the mole."`);
    statements.push(`**${roles[1]}:** "${roles[2]} is the mole."`);
    statements.push(`**${roles[2]}:** "${roles[1]} is lying when he says ${roles[2]} is the mole."`);
    statements.push(`**${roles[3]}:** "I am not the mole."`);
    statements.push(`**${roles[4]}:** "${roles[0]} is the mole."`);

    // Shuffle the display of statements
    let displayStatements = statements.slice().sort(() => crypto.randomInt(3) - 1);

    const formattedDesc = `**1. PUZZLE CATEGORY:** Pure Logic / Deduction
**2. DIFFICULTY LEVEL:** 7
**3. THE BRIEFING:**
Five operatives (${shuffledAgents.sort().join(', ')}) have returned from a botched mission. One is a double agent working for the adversary. Under intense interrogation, they each made a single statement. Our behavioral analysts have determined that the team's loyalty has completely broken down: exactly one of them is telling the truth, and the rest are lying to protect the mole or confuse us.

**4. THE INTERCEPT:**
${displayStatements.join('\n')}

**5. HINTS:**
- Hint 1: Look for two statements that directly contradict each other. One of them *must* be true.
- Hint 2: Since exactly one person is telling the truth, everyone else must be lying. How does this apply to the contradictory pair?
- Hint 3: Look at ${roles[3]}. If their statement is a lie, what does that make them?

**6. THE SOLUTION:**
${moleAgent}

**7. METHODOLOGY:**
1. Identify the contradiction: ${roles[1]} states that ${roles[2]} is the mole. ${roles[2]} states that ${roles[1]} is lying. These two statements are exact opposites; they cannot both be true, and they cannot both be false.
2. Since exactly one of the five operatives is telling the truth, the truthful statement must belong to either ${roles[1]} or ${roles[2]}.
3. This absolute certainty means the other three operatives (${roles[0]}, ${roles[3]}, and ${roles[4]}) *must* be lying.
4. ${roles[3]}'s statement is "I am not the mole." Since we have established that ${roles[3]} is lying, the opposite must be true: **${roles[3]}** is the mole.`;

    addPuzzle({
      title: `THE DOUBLE AGENT INTERROGATION ${i+1}`,
      description: formattedDesc,
      category: 'PURE_LOGIC',
      difficulty: 'HARD',
      points: 70,
      answer: moleAgent,
      hint: "Find the contradictory statements. The truth teller must be one of those two.",
      type: 'STANDARD'
    });
  }
}

// ---------------------------------------------------------
// GENERATOR 4: Pattern Recognition (Reversed Primes)
// ---------------------------------------------------------
function isPrime(num: number) {
  for(let i = 2, s = Math.sqrt(num); i <= s; i++) {
      if(num % i === 0) return false;
  }
  return num > 1;
}

function getPrimes(start: number, count: number) {
  let primes = [];
  let n = start;
  while(primes.length < count) {
    if(isPrime(n)) primes.push(n);
    n++;
  }
  return primes;
}

function generatePattern(count: number) {
  for (let i = 0; i < count; i++) {
    const startPrime = 11 + randInt(20); // 11 to 30
    const primes = getPrimes(startPrime, 9);

    const reversedPrimes = primes.map(p => parseInt(p.toString().split('').reverse().join('')));

    let ledgerLines = [];
    for(let j=0; j<8; j++) {
      ledgerLines.push(`Tx${j+1}: $${reversedPrimes[j]}.00`);
    }

    const answerInt = reversedPrimes[8];
    const answerStr = `$${answerInt}.00`;
    const answerIntStr = answerInt.toString();

    const formattedDesc = `**1. PUZZLE CATEGORY:** Pattern Recognition / Mathematical Sequence
**2. DIFFICULTY LEVEL:** 8
**3. THE BRIEFING:**
We've been tracking the micro-transactions of a known arms dealer. They use a mathematical pattern to signal drop coordinates to their buyers. The numbers look like random ledger entries to the untrained eye, but MI5 cryptanalysts suspect a sequence involving fundamental, unbreakable mathematics, albeit with a deceptive twist.

**4. THE INTERCEPT:**
Ledger Extract - Cayman Account #${1000 + randInt(9000)}
${ledgerLines.join('\n')}

Pending Transaction 9: $??.??

**5. HINTS:**
- Hint 1: Ignore the dollar signs and decimals. Look at the numbers as pure two-digit (or three-digit) integers.
- Hint 2: The sequence is related to numbers that are only divisible by 1 and themselves.
- Hint 3: Write down the prime numbers starting from ${primes[0]}, and then imagine looking at them in a mirror.

**6. THE SOLUTION:**
${answerStr}

**7. METHODOLOGY:**
1. Strip away the financial formatting to reveal the base sequence: ${reversedPrimes.slice(0,8).join(', ')}.
2. Recognize that these are related to prime numbers. The standard sequence of prime numbers starting at ${primes[0]} is: ${primes.slice(0,9).join(', ')}.
3. Reverse the digits of each prime number to create the intercept sequence.
4. The next prime number in the base sequence is ${primes[8]}. Reversing the digits gives **${answerInt}**.
5. Formatted as a transaction, the next entry in the ledger is **${answerStr}**.`;

    addPuzzle({
      title: `CAYMAN LEDGER SEQUENCE ${i+1}`,
      description: formattedDesc,
      category: 'PATTERN_RECOGNITION',
      difficulty: 'HARD',
      points: 80,
      answer: answerIntStr,
      hint: "Reverse the numbers and look for a sequence of primes.",
      type: 'STANDARD'
    });
  }
}

// Generate 125 of each to make 500 puzzles
generateSteganography(125);
generatePhonetic(125);
generateLogic(125);
generatePattern(125);

// Let's create the output string manually without string literal templates that break
const dataPath = path.join(__dirname, '../src/data/puzzles.ts');
let existingContent = '';
let existingPuzzles: any[] = [];
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

const outputContent = [
  "export type Category = 'ALL_DATA_FILES' | 'COLD_WAR' | 'CYBER_SECURITY' | 'GCHQ_CLASSIC' | 'SIGNAL_INT' | 'LOGIC_OPS' | 'GEOLOCATION' | 'IMAGE_INT' | 'MI5_101' | 'CODE_BREAKER' | 'INTELLIGENCE_DEBRIEF' | 'CRYPTOGRAPHY' | 'LINGUISTIC' | 'PATTERN_RECOGNITION' | 'PURE_LOGIC';",
  "",
  "export interface Puzzle {",
  "  id: string;",
  "  title: string;",
  "  description: string;",
  "  category: Category;",
  "  difficulty: 'EASY' | 'MEDIUM' | 'HARD' | 'ELITE';",
  "  points: number;",
  "  answer: string;",
  "  hint: string;",
  "  imageUrl?: string;",
  "  type?: 'STANDARD' | 'MASTERMIND' | 'TRIVIA' | 'EMOJI_CRYPTO' | 'OBSERVATION';",
  "  observationData?: string;",
  "}",
  "",
  "export const puzzles: Puzzle[] = " + JSON.stringify(mergedPuzzles, null, 2) + ";"
].join("\n");

fs.writeFileSync(dataPath, outputContent);
console.log("Appended " + puzzles.length + " GCHQ complex missions in src/data/puzzles.ts. Total: " + mergedPuzzles.length);

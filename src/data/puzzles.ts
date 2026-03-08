export type Category = 'ALL_DATA_FILES' | 'COLD_WAR' | 'CYBER_SECURITY' | 'GCHQ_CLASSIC' | 'SIGNAL_INT' | 'LOGIC_OPS' | 'GEOLOCATION';

export interface Puzzle {
  id: string;
  title: string;
  description: string;
  category: Category;
  difficulty: 'EASY' | 'MEDIUM' | 'HARD' | 'ELITE';
  points: number;
  answer: string;
  hint: string;
}

export const puzzles: Puzzle[] = [
  {
    "id": "0X_ELITE_1",
    "title": "THE LETTER COUNT",
    "description": "If 1=3, 2=3, 3=5, 4=4, 5=4, 6=3, 7=5, 8=5, 9=4, and 10=3, what does 11 equal?",
    "category": "LOGIC_OPS",
    "difficulty": "HARD",
    "points": 100,
    "answer": "6",
    "hint": "Count the letters in the English word for each number."
  },
  {
    "id": "0X_ELITE_2",
    "title": "THE CONNECTING LINK",
    "description": "Find the single word that connects these four: GOLD, GLOVE, BOX, and PRINT.",
    "category": "GCHQ_CLASSIC",
    "difficulty": "HARD",
    "points": 100,
    "answer": "FINGER",
    "hint": "Think of James Bond for the first one, and what you leave at a crime scene for the last."
  },
  {
    "id": "0X_ELITE_3",
    "title": "SEQUENCE OF THE AGES",
    "description": "Identify the next character in this progression: M, V, E, M, J, S, U, ?",
    "category": "LOGIC_OPS",
    "difficulty": "HARD",
    "points": 100,
    "answer": "N",
    "hint": "Look up to the night sky. Think of our solar system."
  },
  {
    "id": "0X_ELITE_4",
    "title": "THE MISSING MONTH",
    "description": "What connects: APR, JUN, SEP, and NOV?",
    "category": "GCHQ_CLASSIC",
    "difficulty": "MEDIUM",
    "points": 50,
    "answer": "30",
    "hint": "Thirty days hath..."
  },
  {
    "id": "0X_ELITE_5",
    "title": "THE INFINITE STAIRCASE",
    "description": "What is the next number in this sequence: 2, 3, 10, 12, 13, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, ?",
    "category": "LOGIC_OPS",
    "difficulty": "HARD",
    "points": 100,
    "answer": "200",
    "hint": "Think about how these numbers are spelled in English. What letter do they all start with?"
  },
  {
    "id": "0X_ELITE_6",
    "title": "THE SPY'S LANDMARK",
    "description": "Identify the city: It contains a \"Checkpoint\" named after a letter of the alphabet, it was once divided by a wall, and its name is an anagram of \"LINREB\".",
    "category": "COLD_WAR",
    "difficulty": "MEDIUM",
    "points": 50,
    "answer": "BERLIN",
    "hint": "Checkpoint Charlie."
  },
  {
    "id": "0X_ELITE_10",
    "title": "THE DOUBLE AGENT",
    "description": "Identify the spy: Born in Estoril, 1912. Codename GARBO. He helped deceive the Germans about the D-Day landing site.",
    "category": "COLD_WAR",
    "difficulty": "HARD",
    "points": 100,
    "answer": "JUAN PUJOL GARCIA",
    "hint": "He was a Spanish double agent."
  },
  {
    "id": "0X_GEN_11",
    "title": "INTERCEPTED SIGNAL ALPHA-1",
    "description": "Decrypt this Vigenère/Caesar intercept (Shift +1): FOJHNB",
    "category": "SIGNAL_INT",
    "difficulty": "EASY",
    "points": 25,
    "answer": "ENIGMA",
    "hint": "Shift each letter back by 1 positions in the alphabet."
  },
  {
    "id": "0X_GEN_12",
    "title": "INTERCEPTED SIGNAL ALPHA-2",
    "description": "Decrypt this Vigenère/Caesar intercept (Shift +2): DNGVEJNGA",
    "category": "SIGNAL_INT",
    "difficulty": "EASY",
    "points": 25,
    "answer": "BLETCHLEY",
    "hint": "Shift each letter back by 2 positions in the alphabet."
  },
  {
    "id": "0X_GEN_13",
    "title": "INTERCEPTED SIGNAL ALPHA-3",
    "description": "Decrypt this Vigenère/Caesar intercept (Shift +3): WXULQJ",
    "category": "SIGNAL_INT",
    "difficulty": "EASY",
    "points": 25,
    "answer": "TURING",
    "hint": "Shift each letter back by 3 positions in the alphabet."
  },
  {
    "id": "0X_GEN_14",
    "title": "INTERCEPTED SIGNAL ALPHA-4",
    "description": "Decrypt this Vigenère/Caesar intercept (Shift +4): QM5",
    "category": "SIGNAL_INT",
    "difficulty": "EASY",
    "points": 25,
    "answer": "MI5",
    "hint": "Shift each letter back by 4 positions in the alphabet."
  },
  {
    "id": "0X_GEN_15",
    "title": "INTERCEPTED SIGNAL ALPHA-5",
    "description": "Decrypt this Vigenère/Caesar intercept (Shift +5): NSYJQQNLJSHJ",
    "category": "SIGNAL_INT",
    "difficulty": "EASY",
    "points": 25,
    "answer": "INTELLIGENCE",
    "hint": "Shift each letter back by 5 positions in the alphabet."
  },
  {
    "id": "0X_GEN_16",
    "title": "INTERCEPTED SIGNAL ALPHA-6",
    "description": "Decrypt this Vigenère/Caesar intercept (Shift +6): KYVOUTGMK",
    "category": "SIGNAL_INT",
    "difficulty": "EASY",
    "points": 25,
    "answer": "ESPIONAGE",
    "hint": "Shift each letter back by 6 positions in the alphabet."
  },
  {
    "id": "0X_GEN_17",
    "title": "INTERCEPTED SIGNAL ALPHA-7",
    "description": "Decrypt this Vigenère/Caesar intercept (Shift +7): JYFWAVNYHWOF",
    "category": "SIGNAL_INT",
    "difficulty": "EASY",
    "points": 25,
    "answer": "CRYPTOGRAPHY",
    "hint": "Shift each letter back by 7 positions in the alphabet."
  },
  {
    "id": "0X_GEN_18",
    "title": "INTERCEPTED SIGNAL ALPHA-8",
    "description": "Decrypt this Vigenère/Caesar intercept (Shift +8): KGXPMZ",
    "category": "SIGNAL_INT",
    "difficulty": "EASY",
    "points": 25,
    "answer": "CYPHER",
    "hint": "Shift each letter back by 8 positions in the alphabet."
  },
  {
    "id": "0X_GEN_19",
    "title": "INTERCEPTED SIGNAL ALPHA-9",
    "description": "Decrypt this Vigenère/Caesar intercept (Shift +9): JPNWC",
    "category": "SIGNAL_INT",
    "difficulty": "EASY",
    "points": 25,
    "answer": "AGENT",
    "hint": "Shift each letter back by 9 positions in the alphabet."
  },
  {
    "id": "0X_GEN_20",
    "title": "INTERCEPTED SIGNAL ALPHA-10",
    "description": "Decrypt this Vigenère/Caesar intercept (Shift +10): MYFOBD",
    "category": "SIGNAL_INT",
    "difficulty": "EASY",
    "points": 25,
    "answer": "COVERT",
    "hint": "Shift each letter back by 10 positions in the alphabet."
  },
  {
    "id": "0X_GEN_21",
    "title": "INTERCEPTED SIGNAL ALPHA-11",
    "description": "Decrypt this Vigenère/Caesar intercept (Shift +11): ZAPCLETZY",
    "category": "SIGNAL_INT",
    "difficulty": "EASY",
    "points": 25,
    "answer": "OPERATION",
    "hint": "Shift each letter back by 11 positions in the alphabet."
  },
  {
    "id": "0X_GEN_22",
    "title": "INTERCEPTED SIGNAL ALPHA-12",
    "description": "Decrypt this Vigenère/Caesar intercept (Shift +12): OXMEEURUQP",
    "category": "SIGNAL_INT",
    "difficulty": "EASY",
    "points": 25,
    "answer": "CLASSIFIED",
    "hint": "Shift each letter back by 12 positions in the alphabet."
  },
  {
    "id": "0X_GEN_23",
    "title": "INTERCEPTED SIGNAL ALPHA-13",
    "description": "Decrypt this Vigenère/Caesar intercept (Shift +13): GBCFRPERG",
    "category": "SIGNAL_INT",
    "difficulty": "EASY",
    "points": 25,
    "answer": "TOPSECRET",
    "hint": "Shift each letter back by 13 positions in the alphabet."
  },
  {
    "id": "0X_GEN_24",
    "title": "INTERCEPTED SIGNAL ALPHA-14",
    "description": "Decrypt this Vigenère/Caesar intercept (Shift +14): OGGSH",
    "category": "SIGNAL_INT",
    "difficulty": "EASY",
    "points": 25,
    "answer": "ASSET",
    "hint": "Shift each letter back by 14 positions in the alphabet."
  },
  {
    "id": "0X_GEN_25",
    "title": "INTERCEPTED SIGNAL ALPHA-15",
    "description": "Decrypt this Vigenère/Caesar intercept (Shift +15): WPCSATG",
    "category": "SIGNAL_INT",
    "difficulty": "EASY",
    "points": 25,
    "answer": "HANDLER",
    "hint": "Shift each letter back by 15 positions in the alphabet."
  },
  {
    "id": "0X_GEN_26",
    "title": "INTERCEPTED SIGNAL ALPHA-16",
    "description": "Decrypt this Vigenère/Caesar intercept (Shift +16): TUQTTHEF",
    "category": "SIGNAL_INT",
    "difficulty": "EASY",
    "points": 25,
    "answer": "DEADDROP",
    "hint": "Shift each letter back by 16 positions in the alphabet."
  },
  {
    "id": "0X_GEN_27",
    "title": "INTERCEPTED SIGNAL ALPHA-17",
    "description": "Decrypt this Vigenère/Caesar intercept (Shift +17): NZIVKRG",
    "category": "SIGNAL_INT",
    "difficulty": "EASY",
    "points": 25,
    "answer": "WIRETAP",
    "hint": "Shift each letter back by 17 positions in the alphabet."
  },
  {
    "id": "0X_GEN_28",
    "title": "INTERCEPTED SIGNAL ALPHA-18",
    "description": "Decrypt this Vigenère/Caesar intercept (Shift +18): KMJNWADDSFUW",
    "category": "SIGNAL_INT",
    "difficulty": "EASY",
    "points": 25,
    "answer": "SURVEILLANCE",
    "hint": "Shift each letter back by 18 positions in the alphabet."
  },
  {
    "id": "0X_GEN_29",
    "title": "INTERCEPTED SIGNAL ALPHA-19",
    "description": "Decrypt this Vigenère/Caesar intercept (Shift +19): KXVHGGTBLLTGVX",
    "category": "SIGNAL_INT",
    "difficulty": "EASY",
    "points": 25,
    "answer": "RECONNAISSANCE",
    "hint": "Shift each letter back by 19 positions in the alphabet."
  },
  {
    "id": "0X_GEN_30",
    "title": "INTERCEPTED SIGNAL ALPHA-20",
    "description": "Decrypt this Vigenère/Caesar intercept (Shift +20): CHZCFNLUNCIH",
    "category": "SIGNAL_INT",
    "difficulty": "EASY",
    "points": 25,
    "answer": "INFILTRATION",
    "hint": "Shift each letter back by 20 positions in the alphabet."
  },
  {
    "id": "0X_GEN_31",
    "title": "INTERCEPTED SIGNAL ALPHA-21",
    "description": "Decrypt this Vigenère/Caesar intercept (Shift +21): ZIDBHV",
    "category": "SIGNAL_INT",
    "difficulty": "EASY",
    "points": 25,
    "answer": "ENIGMA",
    "hint": "Shift each letter back by 21 positions in the alphabet."
  },
  {
    "id": "0X_GEN_32",
    "title": "INTERCEPTED SIGNAL ALPHA-22",
    "description": "Decrypt this Vigenère/Caesar intercept (Shift +22): XHAPYDHAU",
    "category": "SIGNAL_INT",
    "difficulty": "EASY",
    "points": 25,
    "answer": "BLETCHLEY",
    "hint": "Shift each letter back by 22 positions in the alphabet."
  },
  {
    "id": "0X_GEN_33",
    "title": "INTERCEPTED SIGNAL ALPHA-23",
    "description": "Decrypt this Vigenère/Caesar intercept (Shift +23): QROFKD",
    "category": "SIGNAL_INT",
    "difficulty": "EASY",
    "points": 25,
    "answer": "TURING",
    "hint": "Shift each letter back by 23 positions in the alphabet."
  },
  {
    "id": "0X_GEN_34",
    "title": "INTERCEPTED SIGNAL ALPHA-24",
    "description": "Decrypt this Vigenère/Caesar intercept (Shift +24): KG5",
    "category": "SIGNAL_INT",
    "difficulty": "EASY",
    "points": 25,
    "answer": "MI5",
    "hint": "Shift each letter back by 24 positions in the alphabet."
  },
  {
    "id": "0X_GEN_35",
    "title": "INTERCEPTED SIGNAL ALPHA-25",
    "description": "Decrypt this Vigenère/Caesar intercept (Shift +25): HMSDKKHFDMBD",
    "category": "SIGNAL_INT",
    "difficulty": "EASY",
    "points": 25,
    "answer": "INTELLIGENCE",
    "hint": "Shift each letter back by 25 positions in the alphabet."
  },
  {
    "id": "0X_GEN_36",
    "title": "INTERCEPTED SIGNAL ALPHA-1",
    "description": "Decrypt this Vigenère/Caesar intercept (Shift +1): FTQJPOBHF",
    "category": "SIGNAL_INT",
    "difficulty": "EASY",
    "points": 25,
    "answer": "ESPIONAGE",
    "hint": "Shift each letter back by 1 positions in the alphabet."
  },
  {
    "id": "0X_GEN_37",
    "title": "INTERCEPTED SIGNAL ALPHA-2",
    "description": "Decrypt this Vigenère/Caesar intercept (Shift +2): ETARVQITCRJA",
    "category": "SIGNAL_INT",
    "difficulty": "EASY",
    "points": 25,
    "answer": "CRYPTOGRAPHY",
    "hint": "Shift each letter back by 2 positions in the alphabet."
  },
  {
    "id": "0X_GEN_38",
    "title": "INTERCEPTED SIGNAL ALPHA-3",
    "description": "Decrypt this Vigenère/Caesar intercept (Shift +3): FBSKHU",
    "category": "SIGNAL_INT",
    "difficulty": "EASY",
    "points": 25,
    "answer": "CYPHER",
    "hint": "Shift each letter back by 3 positions in the alphabet."
  },
  {
    "id": "0X_GEN_39",
    "title": "INTERCEPTED SIGNAL ALPHA-4",
    "description": "Decrypt this Vigenère/Caesar intercept (Shift +4): EKIRX",
    "category": "SIGNAL_INT",
    "difficulty": "EASY",
    "points": 25,
    "answer": "AGENT",
    "hint": "Shift each letter back by 4 positions in the alphabet."
  },
  {
    "id": "0X_GEN_40",
    "title": "INTERCEPTED SIGNAL ALPHA-5",
    "description": "Decrypt this Vigenère/Caesar intercept (Shift +5): HTAJWY",
    "category": "SIGNAL_INT",
    "difficulty": "EASY",
    "points": 25,
    "answer": "COVERT",
    "hint": "Shift each letter back by 5 positions in the alphabet."
  },
  {
    "id": "0X_GEN_41",
    "title": "INTERCEPTED SIGNAL ALPHA-6",
    "description": "Decrypt this Vigenère/Caesar intercept (Shift +6): UVKXGZOUT",
    "category": "SIGNAL_INT",
    "difficulty": "EASY",
    "points": 25,
    "answer": "OPERATION",
    "hint": "Shift each letter back by 6 positions in the alphabet."
  },
  {
    "id": "0X_GEN_42",
    "title": "INTERCEPTED SIGNAL ALPHA-7",
    "description": "Decrypt this Vigenère/Caesar intercept (Shift +7): JSHZZPMPLK",
    "category": "SIGNAL_INT",
    "difficulty": "EASY",
    "points": 25,
    "answer": "CLASSIFIED",
    "hint": "Shift each letter back by 7 positions in the alphabet."
  },
  {
    "id": "0X_GEN_43",
    "title": "INTERCEPTED SIGNAL ALPHA-8",
    "description": "Decrypt this Vigenère/Caesar intercept (Shift +8): BWXAMKZMB",
    "category": "SIGNAL_INT",
    "difficulty": "EASY",
    "points": 25,
    "answer": "TOPSECRET",
    "hint": "Shift each letter back by 8 positions in the alphabet."
  },
  {
    "id": "0X_GEN_44",
    "title": "INTERCEPTED SIGNAL ALPHA-9",
    "description": "Decrypt this Vigenère/Caesar intercept (Shift +9): JBBNC",
    "category": "SIGNAL_INT",
    "difficulty": "EASY",
    "points": 25,
    "answer": "ASSET",
    "hint": "Shift each letter back by 9 positions in the alphabet."
  },
  {
    "id": "0X_GEN_45",
    "title": "INTERCEPTED SIGNAL ALPHA-10",
    "description": "Decrypt this Vigenère/Caesar intercept (Shift +10): RKXNVOB",
    "category": "SIGNAL_INT",
    "difficulty": "EASY",
    "points": 25,
    "answer": "HANDLER",
    "hint": "Shift each letter back by 10 positions in the alphabet."
  },
  {
    "id": "0X_GEN_46",
    "title": "INTERCEPTED SIGNAL ALPHA-11",
    "description": "Decrypt this Vigenère/Caesar intercept (Shift +11): OPLOOCZA",
    "category": "SIGNAL_INT",
    "difficulty": "EASY",
    "points": 25,
    "answer": "DEADDROP",
    "hint": "Shift each letter back by 11 positions in the alphabet."
  },
  {
    "id": "0X_GEN_47",
    "title": "INTERCEPTED SIGNAL ALPHA-12",
    "description": "Decrypt this Vigenère/Caesar intercept (Shift +12): IUDQFMB",
    "category": "SIGNAL_INT",
    "difficulty": "EASY",
    "points": 25,
    "answer": "WIRETAP",
    "hint": "Shift each letter back by 12 positions in the alphabet."
  },
  {
    "id": "0X_GEN_48",
    "title": "INTERCEPTED SIGNAL ALPHA-13",
    "description": "Decrypt this Vigenère/Caesar intercept (Shift +13): FHEIRVYYNAPR",
    "category": "SIGNAL_INT",
    "difficulty": "EASY",
    "points": 25,
    "answer": "SURVEILLANCE",
    "hint": "Shift each letter back by 13 positions in the alphabet."
  },
  {
    "id": "0X_GEN_49",
    "title": "INTERCEPTED SIGNAL ALPHA-14",
    "description": "Decrypt this Vigenère/Caesar intercept (Shift +14): FSQCBBOWGGOBQS",
    "category": "SIGNAL_INT",
    "difficulty": "EASY",
    "points": 25,
    "answer": "RECONNAISSANCE",
    "hint": "Shift each letter back by 14 positions in the alphabet."
  },
  {
    "id": "0X_GEN_50",
    "title": "INTERCEPTED SIGNAL ALPHA-15",
    "description": "Decrypt this Vigenère/Caesar intercept (Shift +15): XCUXAIGPIXDC",
    "category": "SIGNAL_INT",
    "difficulty": "EASY",
    "points": 25,
    "answer": "INFILTRATION",
    "hint": "Shift each letter back by 15 positions in the alphabet."
  },
  {
    "id": "0X_GEN_51",
    "title": "INTERCEPTED SIGNAL ALPHA-16",
    "description": "Decrypt this Vigenère/Caesar intercept (Shift +16): UDYWCQ",
    "category": "SIGNAL_INT",
    "difficulty": "EASY",
    "points": 25,
    "answer": "ENIGMA",
    "hint": "Shift each letter back by 16 positions in the alphabet."
  },
  {
    "id": "0X_GEN_52",
    "title": "INTERCEPTED SIGNAL ALPHA-17",
    "description": "Decrypt this Vigenère/Caesar intercept (Shift +17): SCVKTYCVP",
    "category": "SIGNAL_INT",
    "difficulty": "EASY",
    "points": 25,
    "answer": "BLETCHLEY",
    "hint": "Shift each letter back by 17 positions in the alphabet."
  },
  {
    "id": "0X_GEN_53",
    "title": "INTERCEPTED SIGNAL ALPHA-18",
    "description": "Decrypt this Vigenère/Caesar intercept (Shift +18): LMJAFY",
    "category": "SIGNAL_INT",
    "difficulty": "EASY",
    "points": 25,
    "answer": "TURING",
    "hint": "Shift each letter back by 18 positions in the alphabet."
  },
  {
    "id": "0X_GEN_54",
    "title": "INTERCEPTED SIGNAL ALPHA-19",
    "description": "Decrypt this Vigenère/Caesar intercept (Shift +19): FB5",
    "category": "SIGNAL_INT",
    "difficulty": "EASY",
    "points": 25,
    "answer": "MI5",
    "hint": "Shift each letter back by 19 positions in the alphabet."
  },
  {
    "id": "0X_GEN_55",
    "title": "INTERCEPTED SIGNAL ALPHA-20",
    "description": "Decrypt this Vigenère/Caesar intercept (Shift +20): CHNYFFCAYHWY",
    "category": "SIGNAL_INT",
    "difficulty": "EASY",
    "points": 25,
    "answer": "INTELLIGENCE",
    "hint": "Shift each letter back by 20 positions in the alphabet."
  },
  {
    "id": "0X_GEN_56",
    "title": "INTERCEPTED SIGNAL ALPHA-21",
    "description": "Decrypt this Vigenère/Caesar intercept (Shift +21): ZNKDJIVBZ",
    "category": "SIGNAL_INT",
    "difficulty": "EASY",
    "points": 25,
    "answer": "ESPIONAGE",
    "hint": "Shift each letter back by 21 positions in the alphabet."
  },
  {
    "id": "0X_GEN_57",
    "title": "INTERCEPTED SIGNAL ALPHA-22",
    "description": "Decrypt this Vigenère/Caesar intercept (Shift +22): YNULPKCNWLDU",
    "category": "SIGNAL_INT",
    "difficulty": "EASY",
    "points": 25,
    "answer": "CRYPTOGRAPHY",
    "hint": "Shift each letter back by 22 positions in the alphabet."
  },
  {
    "id": "0X_GEN_58",
    "title": "INTERCEPTED SIGNAL ALPHA-23",
    "description": "Decrypt this Vigenère/Caesar intercept (Shift +23): ZVMEBO",
    "category": "SIGNAL_INT",
    "difficulty": "EASY",
    "points": 25,
    "answer": "CYPHER",
    "hint": "Shift each letter back by 23 positions in the alphabet."
  },
  {
    "id": "0X_GEN_59",
    "title": "INTERCEPTED SIGNAL ALPHA-24",
    "description": "Decrypt this Vigenère/Caesar intercept (Shift +24): YECLR",
    "category": "SIGNAL_INT",
    "difficulty": "EASY",
    "points": 25,
    "answer": "AGENT",
    "hint": "Shift each letter back by 24 positions in the alphabet."
  },
  {
    "id": "0X_GEN_60",
    "title": "INTERCEPTED SIGNAL ALPHA-25",
    "description": "Decrypt this Vigenère/Caesar intercept (Shift +25): BNUDQS",
    "category": "SIGNAL_INT",
    "difficulty": "EASY",
    "points": 25,
    "answer": "COVERT",
    "hint": "Shift each letter back by 25 positions in the alphabet."
  },
  {
    "id": "0X_GEN_61",
    "title": "INTERCEPTED SIGNAL ALPHA-1",
    "description": "Decrypt this Vigenère/Caesar intercept (Shift +1): PQFSBUJPO",
    "category": "SIGNAL_INT",
    "difficulty": "EASY",
    "points": 25,
    "answer": "OPERATION",
    "hint": "Shift each letter back by 1 positions in the alphabet."
  },
  {
    "id": "0X_GEN_62",
    "title": "INTERCEPTED SIGNAL ALPHA-2",
    "description": "Decrypt this Vigenère/Caesar intercept (Shift +2): ENCUUKHKGF",
    "category": "SIGNAL_INT",
    "difficulty": "EASY",
    "points": 25,
    "answer": "CLASSIFIED",
    "hint": "Shift each letter back by 2 positions in the alphabet."
  },
  {
    "id": "0X_GEN_63",
    "title": "INTERCEPTED SIGNAL ALPHA-3",
    "description": "Decrypt this Vigenère/Caesar intercept (Shift +3): WRSVHFUHW",
    "category": "SIGNAL_INT",
    "difficulty": "EASY",
    "points": 25,
    "answer": "TOPSECRET",
    "hint": "Shift each letter back by 3 positions in the alphabet."
  },
  {
    "id": "0X_GEN_64",
    "title": "INTERCEPTED SIGNAL ALPHA-4",
    "description": "Decrypt this Vigenère/Caesar intercept (Shift +4): EWWIX",
    "category": "SIGNAL_INT",
    "difficulty": "EASY",
    "points": 25,
    "answer": "ASSET",
    "hint": "Shift each letter back by 4 positions in the alphabet."
  },
  {
    "id": "0X_GEN_65",
    "title": "INTERCEPTED SIGNAL ALPHA-5",
    "description": "Decrypt this Vigenère/Caesar intercept (Shift +5): MFSIQJW",
    "category": "SIGNAL_INT",
    "difficulty": "EASY",
    "points": 25,
    "answer": "HANDLER",
    "hint": "Shift each letter back by 5 positions in the alphabet."
  },
  {
    "id": "0X_GEN_66",
    "title": "INTERCEPTED SIGNAL ALPHA-6",
    "description": "Decrypt this Vigenère/Caesar intercept (Shift +6): JKGJJXUV",
    "category": "SIGNAL_INT",
    "difficulty": "EASY",
    "points": 25,
    "answer": "DEADDROP",
    "hint": "Shift each letter back by 6 positions in the alphabet."
  },
  {
    "id": "0X_GEN_67",
    "title": "INTERCEPTED SIGNAL ALPHA-7",
    "description": "Decrypt this Vigenère/Caesar intercept (Shift +7): DPYLAHW",
    "category": "SIGNAL_INT",
    "difficulty": "EASY",
    "points": 25,
    "answer": "WIRETAP",
    "hint": "Shift each letter back by 7 positions in the alphabet."
  },
  {
    "id": "0X_GEN_68",
    "title": "INTERCEPTED SIGNAL ALPHA-8",
    "description": "Decrypt this Vigenère/Caesar intercept (Shift +8): ACZDMQTTIVKM",
    "category": "SIGNAL_INT",
    "difficulty": "EASY",
    "points": 25,
    "answer": "SURVEILLANCE",
    "hint": "Shift each letter back by 8 positions in the alphabet."
  },
  {
    "id": "0X_GEN_69",
    "title": "INTERCEPTED SIGNAL ALPHA-9",
    "description": "Decrypt this Vigenère/Caesar intercept (Shift +9): ANLXWWJRBBJWLN",
    "category": "SIGNAL_INT",
    "difficulty": "EASY",
    "points": 25,
    "answer": "RECONNAISSANCE",
    "hint": "Shift each letter back by 9 positions in the alphabet."
  },
  {
    "id": "0X_GEN_70",
    "title": "INTERCEPTED SIGNAL ALPHA-10",
    "description": "Decrypt this Vigenère/Caesar intercept (Shift +10): SXPSVDBKDSYX",
    "category": "SIGNAL_INT",
    "difficulty": "EASY",
    "points": 25,
    "answer": "INFILTRATION",
    "hint": "Shift each letter back by 10 positions in the alphabet."
  },
  {
    "id": "0X_GEN_71",
    "title": "INTERCEPTED SIGNAL ALPHA-11",
    "description": "Decrypt this Vigenère/Caesar intercept (Shift +11): PYTRXL",
    "category": "SIGNAL_INT",
    "difficulty": "EASY",
    "points": 25,
    "answer": "ENIGMA",
    "hint": "Shift each letter back by 11 positions in the alphabet."
  },
  {
    "id": "0X_GEN_72",
    "title": "INTERCEPTED SIGNAL ALPHA-12",
    "description": "Decrypt this Vigenère/Caesar intercept (Shift +12): NXQFOTXQK",
    "category": "SIGNAL_INT",
    "difficulty": "EASY",
    "points": 25,
    "answer": "BLETCHLEY",
    "hint": "Shift each letter back by 12 positions in the alphabet."
  },
  {
    "id": "0X_GEN_73",
    "title": "INTERCEPTED SIGNAL ALPHA-13",
    "description": "Decrypt this Vigenère/Caesar intercept (Shift +13): GHEVAT",
    "category": "SIGNAL_INT",
    "difficulty": "EASY",
    "points": 25,
    "answer": "TURING",
    "hint": "Shift each letter back by 13 positions in the alphabet."
  },
  {
    "id": "0X_GEN_74",
    "title": "INTERCEPTED SIGNAL ALPHA-14",
    "description": "Decrypt this Vigenère/Caesar intercept (Shift +14): AW5",
    "category": "SIGNAL_INT",
    "difficulty": "EASY",
    "points": 25,
    "answer": "MI5",
    "hint": "Shift each letter back by 14 positions in the alphabet."
  },
  {
    "id": "0X_GEN_75",
    "title": "INTERCEPTED SIGNAL ALPHA-15",
    "description": "Decrypt this Vigenère/Caesar intercept (Shift +15): XCITAAXVTCRT",
    "category": "SIGNAL_INT",
    "difficulty": "EASY",
    "points": 25,
    "answer": "INTELLIGENCE",
    "hint": "Shift each letter back by 15 positions in the alphabet."
  },
  {
    "id": "0X_GEN_76",
    "title": "INTERCEPTED SIGNAL ALPHA-16",
    "description": "Decrypt this Vigenère/Caesar intercept (Shift +16): UIFYEDQWU",
    "category": "SIGNAL_INT",
    "difficulty": "EASY",
    "points": 25,
    "answer": "ESPIONAGE",
    "hint": "Shift each letter back by 16 positions in the alphabet."
  },
  {
    "id": "0X_GEN_77",
    "title": "INTERCEPTED SIGNAL ALPHA-17",
    "description": "Decrypt this Vigenère/Caesar intercept (Shift +17): TIPGKFXIRGYP",
    "category": "SIGNAL_INT",
    "difficulty": "EASY",
    "points": 25,
    "answer": "CRYPTOGRAPHY",
    "hint": "Shift each letter back by 17 positions in the alphabet."
  },
  {
    "id": "0X_GEN_78",
    "title": "INTERCEPTED SIGNAL ALPHA-18",
    "description": "Decrypt this Vigenère/Caesar intercept (Shift +18): UQHZWJ",
    "category": "SIGNAL_INT",
    "difficulty": "EASY",
    "points": 25,
    "answer": "CYPHER",
    "hint": "Shift each letter back by 18 positions in the alphabet."
  },
  {
    "id": "0X_GEN_79",
    "title": "INTERCEPTED SIGNAL ALPHA-19",
    "description": "Decrypt this Vigenère/Caesar intercept (Shift +19): TZXGM",
    "category": "SIGNAL_INT",
    "difficulty": "EASY",
    "points": 25,
    "answer": "AGENT",
    "hint": "Shift each letter back by 19 positions in the alphabet."
  },
  {
    "id": "0X_GEN_80",
    "title": "INTERCEPTED SIGNAL ALPHA-20",
    "description": "Decrypt this Vigenère/Caesar intercept (Shift +20): WIPYLN",
    "category": "SIGNAL_INT",
    "difficulty": "EASY",
    "points": 25,
    "answer": "COVERT",
    "hint": "Shift each letter back by 20 positions in the alphabet."
  },
  {
    "id": "0X_GEN_81",
    "title": "INTERCEPTED SIGNAL ALPHA-21",
    "description": "Decrypt this Vigenère/Caesar intercept (Shift +21): JKZMVODJI",
    "category": "SIGNAL_INT",
    "difficulty": "EASY",
    "points": 25,
    "answer": "OPERATION",
    "hint": "Shift each letter back by 21 positions in the alphabet."
  },
  {
    "id": "0X_GEN_82",
    "title": "INTERCEPTED SIGNAL ALPHA-22",
    "description": "Decrypt this Vigenère/Caesar intercept (Shift +22): YHWOOEBEAZ",
    "category": "SIGNAL_INT",
    "difficulty": "EASY",
    "points": 25,
    "answer": "CLASSIFIED",
    "hint": "Shift each letter back by 22 positions in the alphabet."
  },
  {
    "id": "0X_GEN_83",
    "title": "INTERCEPTED SIGNAL ALPHA-23",
    "description": "Decrypt this Vigenère/Caesar intercept (Shift +23): QLMPBZOBQ",
    "category": "SIGNAL_INT",
    "difficulty": "EASY",
    "points": 25,
    "answer": "TOPSECRET",
    "hint": "Shift each letter back by 23 positions in the alphabet."
  },
  {
    "id": "0X_GEN_84",
    "title": "INTERCEPTED SIGNAL ALPHA-24",
    "description": "Decrypt this Vigenère/Caesar intercept (Shift +24): YQQCR",
    "category": "SIGNAL_INT",
    "difficulty": "EASY",
    "points": 25,
    "answer": "ASSET",
    "hint": "Shift each letter back by 24 positions in the alphabet."
  },
  {
    "id": "0X_GEN_85",
    "title": "INTERCEPTED SIGNAL ALPHA-25",
    "description": "Decrypt this Vigenère/Caesar intercept (Shift +25): GZMCKDQ",
    "category": "SIGNAL_INT",
    "difficulty": "EASY",
    "points": 25,
    "answer": "HANDLER",
    "hint": "Shift each letter back by 25 positions in the alphabet."
  },
  {
    "id": "0X_GEN_86",
    "title": "INTERCEPTED SIGNAL ALPHA-1",
    "description": "Decrypt this Vigenère/Caesar intercept (Shift +1): EFBEESPQ",
    "category": "SIGNAL_INT",
    "difficulty": "EASY",
    "points": 25,
    "answer": "DEADDROP",
    "hint": "Shift each letter back by 1 positions in the alphabet."
  },
  {
    "id": "0X_GEN_87",
    "title": "INTERCEPTED SIGNAL ALPHA-2",
    "description": "Decrypt this Vigenère/Caesar intercept (Shift +2): YKTGVCR",
    "category": "SIGNAL_INT",
    "difficulty": "EASY",
    "points": 25,
    "answer": "WIRETAP",
    "hint": "Shift each letter back by 2 positions in the alphabet."
  },
  {
    "id": "0X_GEN_88",
    "title": "INTERCEPTED SIGNAL ALPHA-3",
    "description": "Decrypt this Vigenère/Caesar intercept (Shift +3): VXUYHLOODQFH",
    "category": "SIGNAL_INT",
    "difficulty": "EASY",
    "points": 25,
    "answer": "SURVEILLANCE",
    "hint": "Shift each letter back by 3 positions in the alphabet."
  },
  {
    "id": "0X_GEN_89",
    "title": "INTERCEPTED SIGNAL ALPHA-4",
    "description": "Decrypt this Vigenère/Caesar intercept (Shift +4): VIGSRREMWWERGI",
    "category": "SIGNAL_INT",
    "difficulty": "EASY",
    "points": 25,
    "answer": "RECONNAISSANCE",
    "hint": "Shift each letter back by 4 positions in the alphabet."
  },
  {
    "id": "0X_GEN_90",
    "title": "INTERCEPTED SIGNAL ALPHA-5",
    "description": "Decrypt this Vigenère/Caesar intercept (Shift +5): NSKNQYWFYNTS",
    "category": "SIGNAL_INT",
    "difficulty": "EASY",
    "points": 25,
    "answer": "INFILTRATION",
    "hint": "Shift each letter back by 5 positions in the alphabet."
  },
  {
    "id": "0X_GEN_91",
    "title": "INTERCEPTED SIGNAL ALPHA-6",
    "description": "Decrypt this Vigenère/Caesar intercept (Shift +6): KTOMSG",
    "category": "SIGNAL_INT",
    "difficulty": "EASY",
    "points": 25,
    "answer": "ENIGMA",
    "hint": "Shift each letter back by 6 positions in the alphabet."
  },
  {
    "id": "0X_GEN_92",
    "title": "INTERCEPTED SIGNAL ALPHA-7",
    "description": "Decrypt this Vigenère/Caesar intercept (Shift +7): ISLAJOSLF",
    "category": "SIGNAL_INT",
    "difficulty": "EASY",
    "points": 25,
    "answer": "BLETCHLEY",
    "hint": "Shift each letter back by 7 positions in the alphabet."
  },
  {
    "id": "0X_GEN_93",
    "title": "INTERCEPTED SIGNAL ALPHA-8",
    "description": "Decrypt this Vigenère/Caesar intercept (Shift +8): BCZQVO",
    "category": "SIGNAL_INT",
    "difficulty": "EASY",
    "points": 25,
    "answer": "TURING",
    "hint": "Shift each letter back by 8 positions in the alphabet."
  },
  {
    "id": "0X_GEN_94",
    "title": "INTERCEPTED SIGNAL ALPHA-9",
    "description": "Decrypt this Vigenère/Caesar intercept (Shift +9): VR5",
    "category": "SIGNAL_INT",
    "difficulty": "EASY",
    "points": 25,
    "answer": "MI5",
    "hint": "Shift each letter back by 9 positions in the alphabet."
  },
  {
    "id": "0X_GEN_95",
    "title": "INTERCEPTED SIGNAL ALPHA-10",
    "description": "Decrypt this Vigenère/Caesar intercept (Shift +10): SXDOVVSQOXMO",
    "category": "SIGNAL_INT",
    "difficulty": "EASY",
    "points": 25,
    "answer": "INTELLIGENCE",
    "hint": "Shift each letter back by 10 positions in the alphabet."
  },
  {
    "id": "0X_GEN_96",
    "title": "INTERCEPTED SIGNAL ALPHA-11",
    "description": "Decrypt this Vigenère/Caesar intercept (Shift +11): PDATZYLRP",
    "category": "SIGNAL_INT",
    "difficulty": "EASY",
    "points": 25,
    "answer": "ESPIONAGE",
    "hint": "Shift each letter back by 11 positions in the alphabet."
  },
  {
    "id": "0X_GEN_97",
    "title": "INTERCEPTED SIGNAL ALPHA-12",
    "description": "Decrypt this Vigenère/Caesar intercept (Shift +12): ODKBFASDMBTK",
    "category": "SIGNAL_INT",
    "difficulty": "EASY",
    "points": 25,
    "answer": "CRYPTOGRAPHY",
    "hint": "Shift each letter back by 12 positions in the alphabet."
  },
  {
    "id": "0X_GEN_98",
    "title": "INTERCEPTED SIGNAL ALPHA-13",
    "description": "Decrypt this Vigenère/Caesar intercept (Shift +13): PLCURE",
    "category": "SIGNAL_INT",
    "difficulty": "EASY",
    "points": 25,
    "answer": "CYPHER",
    "hint": "Shift each letter back by 13 positions in the alphabet."
  },
  {
    "id": "0X_GEN_99",
    "title": "INTERCEPTED SIGNAL ALPHA-14",
    "description": "Decrypt this Vigenère/Caesar intercept (Shift +14): OUSBH",
    "category": "SIGNAL_INT",
    "difficulty": "EASY",
    "points": 25,
    "answer": "AGENT",
    "hint": "Shift each letter back by 14 positions in the alphabet."
  },
  {
    "id": "0X_GEN_100",
    "title": "INTERCEPTED SIGNAL ALPHA-15",
    "description": "Decrypt this Vigenère/Caesar intercept (Shift +15): RDKTGI",
    "category": "SIGNAL_INT",
    "difficulty": "EASY",
    "points": 25,
    "answer": "COVERT",
    "hint": "Shift each letter back by 15 positions in the alphabet."
  },
  {
    "id": "0X_GEN_101",
    "title": "INTERCEPTED SIGNAL ALPHA-16",
    "description": "Decrypt this Vigenère/Caesar intercept (Shift +16): EFUHQJYED",
    "category": "SIGNAL_INT",
    "difficulty": "EASY",
    "points": 25,
    "answer": "OPERATION",
    "hint": "Shift each letter back by 16 positions in the alphabet."
  },
  {
    "id": "0X_GEN_102",
    "title": "INTERCEPTED SIGNAL ALPHA-17",
    "description": "Decrypt this Vigenère/Caesar intercept (Shift +17): TCRJJZWZVU",
    "category": "SIGNAL_INT",
    "difficulty": "EASY",
    "points": 25,
    "answer": "CLASSIFIED",
    "hint": "Shift each letter back by 17 positions in the alphabet."
  },
  {
    "id": "0X_GEN_103",
    "title": "INTERCEPTED SIGNAL ALPHA-18",
    "description": "Decrypt this Vigenère/Caesar intercept (Shift +18): LGHKWUJWL",
    "category": "SIGNAL_INT",
    "difficulty": "EASY",
    "points": 25,
    "answer": "TOPSECRET",
    "hint": "Shift each letter back by 18 positions in the alphabet."
  },
  {
    "id": "0X_GEN_104",
    "title": "INTERCEPTED SIGNAL ALPHA-19",
    "description": "Decrypt this Vigenère/Caesar intercept (Shift +19): TLLXM",
    "category": "SIGNAL_INT",
    "difficulty": "EASY",
    "points": 25,
    "answer": "ASSET",
    "hint": "Shift each letter back by 19 positions in the alphabet."
  },
  {
    "id": "0X_GEN_105",
    "title": "INTERCEPTED SIGNAL ALPHA-20",
    "description": "Decrypt this Vigenère/Caesar intercept (Shift +20): BUHXFYL",
    "category": "SIGNAL_INT",
    "difficulty": "EASY",
    "points": 25,
    "answer": "HANDLER",
    "hint": "Shift each letter back by 20 positions in the alphabet."
  },
  {
    "id": "0X_GEN_106",
    "title": "INTERCEPTED SIGNAL ALPHA-21",
    "description": "Decrypt this Vigenère/Caesar intercept (Shift +21): YZVYYMJK",
    "category": "SIGNAL_INT",
    "difficulty": "EASY",
    "points": 25,
    "answer": "DEADDROP",
    "hint": "Shift each letter back by 21 positions in the alphabet."
  },
  {
    "id": "0X_GEN_107",
    "title": "INTERCEPTED SIGNAL ALPHA-22",
    "description": "Decrypt this Vigenère/Caesar intercept (Shift +22): SENAPWL",
    "category": "SIGNAL_INT",
    "difficulty": "EASY",
    "points": 25,
    "answer": "WIRETAP",
    "hint": "Shift each letter back by 22 positions in the alphabet."
  },
  {
    "id": "0X_GEN_108",
    "title": "INTERCEPTED SIGNAL ALPHA-23",
    "description": "Decrypt this Vigenère/Caesar intercept (Shift +23): PROSBFIIXKZB",
    "category": "SIGNAL_INT",
    "difficulty": "EASY",
    "points": 25,
    "answer": "SURVEILLANCE",
    "hint": "Shift each letter back by 23 positions in the alphabet."
  },
  {
    "id": "0X_GEN_109",
    "title": "INTERCEPTED SIGNAL ALPHA-24",
    "description": "Decrypt this Vigenère/Caesar intercept (Shift +24): PCAMLLYGQQYLAC",
    "category": "SIGNAL_INT",
    "difficulty": "EASY",
    "points": 25,
    "answer": "RECONNAISSANCE",
    "hint": "Shift each letter back by 24 positions in the alphabet."
  },
  {
    "id": "0X_GEN_110",
    "title": "INTERCEPTED SIGNAL ALPHA-25",
    "description": "Decrypt this Vigenère/Caesar intercept (Shift +25): HMEHKSQZSHNM",
    "category": "SIGNAL_INT",
    "difficulty": "EASY",
    "points": 25,
    "answer": "INFILTRATION",
    "hint": "Shift each letter back by 25 positions in the alphabet."
  },
  {
    "id": "0X_GEN_111",
    "title": "NUMERIC PROGRESSION 0",
    "description": "Identify the next value in the sequence: 2, 4, 8, 16, ?",
    "category": "LOGIC_OPS",
    "difficulty": "MEDIUM",
    "points": 50,
    "answer": "32",
    "hint": "Multiply each term by 2."
  },
  {
    "id": "0X_GEN_112",
    "title": "NUMERIC PROGRESSION 1",
    "description": "Identify the next value in the sequence: 3, 9, 27, 81, ?",
    "category": "LOGIC_OPS",
    "difficulty": "MEDIUM",
    "points": 50,
    "answer": "243",
    "hint": "Multiply each term by 3."
  },
  {
    "id": "0X_GEN_113",
    "title": "NUMERIC PROGRESSION 2",
    "description": "Identify the next value in the sequence: 4, 16, 64, 256, ?",
    "category": "LOGIC_OPS",
    "difficulty": "MEDIUM",
    "points": 50,
    "answer": "1024",
    "hint": "Multiply each term by 4."
  },
  {
    "id": "0X_GEN_114",
    "title": "NUMERIC PROGRESSION 3",
    "description": "Identify the next value in the sequence: 5, 25, 125, 625, ?",
    "category": "LOGIC_OPS",
    "difficulty": "MEDIUM",
    "points": 50,
    "answer": "3125",
    "hint": "Multiply each term by 5."
  },
  {
    "id": "0X_GEN_115",
    "title": "NUMERIC PROGRESSION 4",
    "description": "Identify the next value in the sequence: 6, 36, 216, 1296, ?",
    "category": "LOGIC_OPS",
    "difficulty": "MEDIUM",
    "points": 50,
    "answer": "7776",
    "hint": "Multiply each term by 6."
  },
  {
    "id": "0X_GEN_116",
    "title": "NUMERIC PROGRESSION 5",
    "description": "Identify the next value in the sequence: 7, 14, 28, 56, ?",
    "category": "LOGIC_OPS",
    "difficulty": "MEDIUM",
    "points": 50,
    "answer": "112",
    "hint": "Multiply each term by 2."
  },
  {
    "id": "0X_GEN_117",
    "title": "NUMERIC PROGRESSION 6",
    "description": "Identify the next value in the sequence: 8, 24, 72, 216, ?",
    "category": "LOGIC_OPS",
    "difficulty": "MEDIUM",
    "points": 50,
    "answer": "648",
    "hint": "Multiply each term by 3."
  },
  {
    "id": "0X_GEN_118",
    "title": "NUMERIC PROGRESSION 7",
    "description": "Identify the next value in the sequence: 9, 36, 144, 576, ?",
    "category": "LOGIC_OPS",
    "difficulty": "MEDIUM",
    "points": 50,
    "answer": "2304",
    "hint": "Multiply each term by 4."
  },
  {
    "id": "0X_GEN_119",
    "title": "NUMERIC PROGRESSION 8",
    "description": "Identify the next value in the sequence: 10, 50, 250, 1250, ?",
    "category": "LOGIC_OPS",
    "difficulty": "MEDIUM",
    "points": 50,
    "answer": "6250",
    "hint": "Multiply each term by 5."
  },
  {
    "id": "0X_GEN_120",
    "title": "NUMERIC PROGRESSION 9",
    "description": "Identify the next value in the sequence: 11, 66, 396, 2376, ?",
    "category": "LOGIC_OPS",
    "difficulty": "MEDIUM",
    "points": 50,
    "answer": "14256",
    "hint": "Multiply each term by 6."
  },
  {
    "id": "0X_GEN_121",
    "title": "NUMERIC PROGRESSION 10",
    "description": "Identify the next value in the sequence: 12, 24, 48, 96, ?",
    "category": "LOGIC_OPS",
    "difficulty": "MEDIUM",
    "points": 50,
    "answer": "192",
    "hint": "Multiply each term by 2."
  },
  {
    "id": "0X_GEN_122",
    "title": "NUMERIC PROGRESSION 11",
    "description": "Identify the next value in the sequence: 13, 39, 117, 351, ?",
    "category": "LOGIC_OPS",
    "difficulty": "MEDIUM",
    "points": 50,
    "answer": "1053",
    "hint": "Multiply each term by 3."
  },
  {
    "id": "0X_GEN_123",
    "title": "NUMERIC PROGRESSION 12",
    "description": "Identify the next value in the sequence: 14, 56, 224, 896, ?",
    "category": "LOGIC_OPS",
    "difficulty": "MEDIUM",
    "points": 50,
    "answer": "3584",
    "hint": "Multiply each term by 4."
  },
  {
    "id": "0X_GEN_124",
    "title": "NUMERIC PROGRESSION 13",
    "description": "Identify the next value in the sequence: 15, 75, 375, 1875, ?",
    "category": "LOGIC_OPS",
    "difficulty": "MEDIUM",
    "points": 50,
    "answer": "9375",
    "hint": "Multiply each term by 5."
  },
  {
    "id": "0X_GEN_125",
    "title": "NUMERIC PROGRESSION 14",
    "description": "Identify the next value in the sequence: 16, 96, 576, 3456, ?",
    "category": "LOGIC_OPS",
    "difficulty": "MEDIUM",
    "points": 50,
    "answer": "20736",
    "hint": "Multiply each term by 6."
  },
  {
    "id": "0X_GEN_126",
    "title": "NUMERIC PROGRESSION 15",
    "description": "Identify the next value in the sequence: 17, 34, 68, 136, ?",
    "category": "LOGIC_OPS",
    "difficulty": "MEDIUM",
    "points": 50,
    "answer": "272",
    "hint": "Multiply each term by 2."
  },
  {
    "id": "0X_GEN_127",
    "title": "NUMERIC PROGRESSION 16",
    "description": "Identify the next value in the sequence: 18, 54, 162, 486, ?",
    "category": "LOGIC_OPS",
    "difficulty": "MEDIUM",
    "points": 50,
    "answer": "1458",
    "hint": "Multiply each term by 3."
  },
  {
    "id": "0X_GEN_128",
    "title": "NUMERIC PROGRESSION 17",
    "description": "Identify the next value in the sequence: 19, 76, 304, 1216, ?",
    "category": "LOGIC_OPS",
    "difficulty": "MEDIUM",
    "points": 50,
    "answer": "4864",
    "hint": "Multiply each term by 4."
  },
  {
    "id": "0X_GEN_129",
    "title": "NUMERIC PROGRESSION 18",
    "description": "Identify the next value in the sequence: 20, 100, 500, 2500, ?",
    "category": "LOGIC_OPS",
    "difficulty": "MEDIUM",
    "points": 50,
    "answer": "12500",
    "hint": "Multiply each term by 5."
  },
  {
    "id": "0X_GEN_130",
    "title": "NUMERIC PROGRESSION 19",
    "description": "Identify the next value in the sequence: 21, 126, 756, 4536, ?",
    "category": "LOGIC_OPS",
    "difficulty": "MEDIUM",
    "points": 50,
    "answer": "27216",
    "hint": "Multiply each term by 6."
  },
  {
    "id": "0X_GEN_131",
    "title": "NUMERIC PROGRESSION 20",
    "description": "Identify the next value in the sequence: 22, 44, 88, 176, ?",
    "category": "LOGIC_OPS",
    "difficulty": "MEDIUM",
    "points": 50,
    "answer": "352",
    "hint": "Multiply each term by 2."
  },
  {
    "id": "0X_GEN_132",
    "title": "NUMERIC PROGRESSION 21",
    "description": "Identify the next value in the sequence: 23, 69, 207, 621, ?",
    "category": "LOGIC_OPS",
    "difficulty": "MEDIUM",
    "points": 50,
    "answer": "1863",
    "hint": "Multiply each term by 3."
  },
  {
    "id": "0X_GEN_133",
    "title": "NUMERIC PROGRESSION 22",
    "description": "Identify the next value in the sequence: 24, 96, 384, 1536, ?",
    "category": "LOGIC_OPS",
    "difficulty": "MEDIUM",
    "points": 50,
    "answer": "6144",
    "hint": "Multiply each term by 4."
  },
  {
    "id": "0X_GEN_134",
    "title": "NUMERIC PROGRESSION 23",
    "description": "Identify the next value in the sequence: 25, 125, 625, 3125, ?",
    "category": "LOGIC_OPS",
    "difficulty": "MEDIUM",
    "points": 50,
    "answer": "15625",
    "hint": "Multiply each term by 5."
  },
  {
    "id": "0X_GEN_135",
    "title": "NUMERIC PROGRESSION 24",
    "description": "Identify the next value in the sequence: 26, 156, 936, 5616, ?",
    "category": "LOGIC_OPS",
    "difficulty": "MEDIUM",
    "points": 50,
    "answer": "33696",
    "hint": "Multiply each term by 6."
  },
  {
    "id": "0X_GEN_136",
    "title": "NUMERIC PROGRESSION 25",
    "description": "Identify the next value in the sequence: 27, 54, 108, 216, ?",
    "category": "LOGIC_OPS",
    "difficulty": "MEDIUM",
    "points": 50,
    "answer": "432",
    "hint": "Multiply each term by 2."
  },
  {
    "id": "0X_GEN_137",
    "title": "NUMERIC PROGRESSION 26",
    "description": "Identify the next value in the sequence: 28, 84, 252, 756, ?",
    "category": "LOGIC_OPS",
    "difficulty": "MEDIUM",
    "points": 50,
    "answer": "2268",
    "hint": "Multiply each term by 3."
  },
  {
    "id": "0X_GEN_138",
    "title": "NUMERIC PROGRESSION 27",
    "description": "Identify the next value in the sequence: 29, 116, 464, 1856, ?",
    "category": "LOGIC_OPS",
    "difficulty": "MEDIUM",
    "points": 50,
    "answer": "7424",
    "hint": "Multiply each term by 4."
  },
  {
    "id": "0X_GEN_139",
    "title": "NUMERIC PROGRESSION 28",
    "description": "Identify the next value in the sequence: 30, 150, 750, 3750, ?",
    "category": "LOGIC_OPS",
    "difficulty": "MEDIUM",
    "points": 50,
    "answer": "18750",
    "hint": "Multiply each term by 5."
  },
  {
    "id": "0X_GEN_140",
    "title": "NUMERIC PROGRESSION 29",
    "description": "Identify the next value in the sequence: 31, 186, 1116, 6696, ?",
    "category": "LOGIC_OPS",
    "difficulty": "MEDIUM",
    "points": 50,
    "answer": "40176",
    "hint": "Multiply each term by 6."
  },
  {
    "id": "0X_GEN_141",
    "title": "NUMERIC PROGRESSION 30",
    "description": "Identify the next value in the sequence: 32, 64, 128, 256, ?",
    "category": "LOGIC_OPS",
    "difficulty": "MEDIUM",
    "points": 50,
    "answer": "512",
    "hint": "Multiply each term by 2."
  },
  {
    "id": "0X_GEN_142",
    "title": "NUMERIC PROGRESSION 31",
    "description": "Identify the next value in the sequence: 33, 99, 297, 891, ?",
    "category": "LOGIC_OPS",
    "difficulty": "MEDIUM",
    "points": 50,
    "answer": "2673",
    "hint": "Multiply each term by 3."
  },
  {
    "id": "0X_GEN_143",
    "title": "NUMERIC PROGRESSION 32",
    "description": "Identify the next value in the sequence: 34, 136, 544, 2176, ?",
    "category": "LOGIC_OPS",
    "difficulty": "MEDIUM",
    "points": 50,
    "answer": "8704",
    "hint": "Multiply each term by 4."
  },
  {
    "id": "0X_GEN_144",
    "title": "NUMERIC PROGRESSION 33",
    "description": "Identify the next value in the sequence: 35, 175, 875, 4375, ?",
    "category": "LOGIC_OPS",
    "difficulty": "MEDIUM",
    "points": 50,
    "answer": "21875",
    "hint": "Multiply each term by 5."
  },
  {
    "id": "0X_GEN_145",
    "title": "NUMERIC PROGRESSION 34",
    "description": "Identify the next value in the sequence: 36, 216, 1296, 7776, ?",
    "category": "LOGIC_OPS",
    "difficulty": "MEDIUM",
    "points": 50,
    "answer": "46656",
    "hint": "Multiply each term by 6."
  },
  {
    "id": "0X_GEN_146",
    "title": "NUMERIC PROGRESSION 35",
    "description": "Identify the next value in the sequence: 37, 74, 148, 296, ?",
    "category": "LOGIC_OPS",
    "difficulty": "MEDIUM",
    "points": 50,
    "answer": "592",
    "hint": "Multiply each term by 2."
  },
  {
    "id": "0X_GEN_147",
    "title": "NUMERIC PROGRESSION 36",
    "description": "Identify the next value in the sequence: 38, 114, 342, 1026, ?",
    "category": "LOGIC_OPS",
    "difficulty": "MEDIUM",
    "points": 50,
    "answer": "3078",
    "hint": "Multiply each term by 3."
  },
  {
    "id": "0X_GEN_148",
    "title": "NUMERIC PROGRESSION 37",
    "description": "Identify the next value in the sequence: 39, 156, 624, 2496, ?",
    "category": "LOGIC_OPS",
    "difficulty": "MEDIUM",
    "points": 50,
    "answer": "9984",
    "hint": "Multiply each term by 4."
  },
  {
    "id": "0X_GEN_149",
    "title": "NUMERIC PROGRESSION 38",
    "description": "Identify the next value in the sequence: 40, 200, 1000, 5000, ?",
    "category": "LOGIC_OPS",
    "difficulty": "MEDIUM",
    "points": 50,
    "answer": "25000",
    "hint": "Multiply each term by 5."
  },
  {
    "id": "0X_GEN_150",
    "title": "NUMERIC PROGRESSION 39",
    "description": "Identify the next value in the sequence: 41, 246, 1476, 8856, ?",
    "category": "LOGIC_OPS",
    "difficulty": "MEDIUM",
    "points": 50,
    "answer": "53136",
    "hint": "Multiply each term by 6."
  },
  {
    "id": "0X_GEN_151",
    "title": "NUMERIC PROGRESSION 40",
    "description": "Identify the next value in the sequence: 42, 84, 168, 336, ?",
    "category": "LOGIC_OPS",
    "difficulty": "MEDIUM",
    "points": 50,
    "answer": "672",
    "hint": "Multiply each term by 2."
  },
  {
    "id": "0X_GEN_152",
    "title": "NUMERIC PROGRESSION 41",
    "description": "Identify the next value in the sequence: 43, 129, 387, 1161, ?",
    "category": "LOGIC_OPS",
    "difficulty": "MEDIUM",
    "points": 50,
    "answer": "3483",
    "hint": "Multiply each term by 3."
  },
  {
    "id": "0X_GEN_153",
    "title": "NUMERIC PROGRESSION 42",
    "description": "Identify the next value in the sequence: 44, 176, 704, 2816, ?",
    "category": "LOGIC_OPS",
    "difficulty": "MEDIUM",
    "points": 50,
    "answer": "11264",
    "hint": "Multiply each term by 4."
  },
  {
    "id": "0X_GEN_154",
    "title": "NUMERIC PROGRESSION 43",
    "description": "Identify the next value in the sequence: 45, 225, 1125, 5625, ?",
    "category": "LOGIC_OPS",
    "difficulty": "MEDIUM",
    "points": 50,
    "answer": "28125",
    "hint": "Multiply each term by 5."
  },
  {
    "id": "0X_GEN_155",
    "title": "NUMERIC PROGRESSION 44",
    "description": "Identify the next value in the sequence: 46, 276, 1656, 9936, ?",
    "category": "LOGIC_OPS",
    "difficulty": "MEDIUM",
    "points": 50,
    "answer": "59616",
    "hint": "Multiply each term by 6."
  },
  {
    "id": "0X_GEN_156",
    "title": "NUMERIC PROGRESSION 45",
    "description": "Identify the next value in the sequence: 47, 94, 188, 376, ?",
    "category": "LOGIC_OPS",
    "difficulty": "MEDIUM",
    "points": 50,
    "answer": "752",
    "hint": "Multiply each term by 2."
  },
  {
    "id": "0X_GEN_157",
    "title": "NUMERIC PROGRESSION 46",
    "description": "Identify the next value in the sequence: 48, 144, 432, 1296, ?",
    "category": "LOGIC_OPS",
    "difficulty": "MEDIUM",
    "points": 50,
    "answer": "3888",
    "hint": "Multiply each term by 3."
  },
  {
    "id": "0X_GEN_158",
    "title": "NUMERIC PROGRESSION 47",
    "description": "Identify the next value in the sequence: 49, 196, 784, 3136, ?",
    "category": "LOGIC_OPS",
    "difficulty": "MEDIUM",
    "points": 50,
    "answer": "12544",
    "hint": "Multiply each term by 4."
  },
  {
    "id": "0X_GEN_159",
    "title": "NUMERIC PROGRESSION 48",
    "description": "Identify the next value in the sequence: 50, 250, 1250, 6250, ?",
    "category": "LOGIC_OPS",
    "difficulty": "MEDIUM",
    "points": 50,
    "answer": "31250",
    "hint": "Multiply each term by 5."
  },
  {
    "id": "0X_GEN_160",
    "title": "NUMERIC PROGRESSION 49",
    "description": "Identify the next value in the sequence: 51, 306, 1836, 11016, ?",
    "category": "LOGIC_OPS",
    "difficulty": "MEDIUM",
    "points": 50,
    "answer": "66096",
    "hint": "Multiply each term by 6."
  },
  {
    "id": "0X_GEN_161",
    "title": "NUMERIC PROGRESSION 50",
    "description": "Identify the next value in the sequence: 52, 104, 208, 416, ?",
    "category": "LOGIC_OPS",
    "difficulty": "MEDIUM",
    "points": 50,
    "answer": "832",
    "hint": "Multiply each term by 2."
  },
  {
    "id": "0X_GEN_162",
    "title": "NUMERIC PROGRESSION 51",
    "description": "Identify the next value in the sequence: 53, 159, 477, 1431, ?",
    "category": "LOGIC_OPS",
    "difficulty": "MEDIUM",
    "points": 50,
    "answer": "4293",
    "hint": "Multiply each term by 3."
  },
  {
    "id": "0X_GEN_163",
    "title": "NUMERIC PROGRESSION 52",
    "description": "Identify the next value in the sequence: 54, 216, 864, 3456, ?",
    "category": "LOGIC_OPS",
    "difficulty": "MEDIUM",
    "points": 50,
    "answer": "13824",
    "hint": "Multiply each term by 4."
  },
  {
    "id": "0X_GEN_164",
    "title": "NUMERIC PROGRESSION 53",
    "description": "Identify the next value in the sequence: 55, 275, 1375, 6875, ?",
    "category": "LOGIC_OPS",
    "difficulty": "MEDIUM",
    "points": 50,
    "answer": "34375",
    "hint": "Multiply each term by 5."
  },
  {
    "id": "0X_GEN_165",
    "title": "NUMERIC PROGRESSION 54",
    "description": "Identify the next value in the sequence: 56, 336, 2016, 12096, ?",
    "category": "LOGIC_OPS",
    "difficulty": "MEDIUM",
    "points": 50,
    "answer": "72576",
    "hint": "Multiply each term by 6."
  },
  {
    "id": "0X_GEN_166",
    "title": "NUMERIC PROGRESSION 55",
    "description": "Identify the next value in the sequence: 57, 114, 228, 456, ?",
    "category": "LOGIC_OPS",
    "difficulty": "MEDIUM",
    "points": 50,
    "answer": "912",
    "hint": "Multiply each term by 2."
  },
  {
    "id": "0X_GEN_167",
    "title": "NUMERIC PROGRESSION 56",
    "description": "Identify the next value in the sequence: 58, 174, 522, 1566, ?",
    "category": "LOGIC_OPS",
    "difficulty": "MEDIUM",
    "points": 50,
    "answer": "4698",
    "hint": "Multiply each term by 3."
  },
  {
    "id": "0X_GEN_168",
    "title": "NUMERIC PROGRESSION 57",
    "description": "Identify the next value in the sequence: 59, 236, 944, 3776, ?",
    "category": "LOGIC_OPS",
    "difficulty": "MEDIUM",
    "points": 50,
    "answer": "15104",
    "hint": "Multiply each term by 4."
  },
  {
    "id": "0X_GEN_169",
    "title": "NUMERIC PROGRESSION 58",
    "description": "Identify the next value in the sequence: 60, 300, 1500, 7500, ?",
    "category": "LOGIC_OPS",
    "difficulty": "MEDIUM",
    "points": 50,
    "answer": "37500",
    "hint": "Multiply each term by 5."
  },
  {
    "id": "0X_GEN_170",
    "title": "NUMERIC PROGRESSION 59",
    "description": "Identify the next value in the sequence: 61, 366, 2196, 13176, ?",
    "category": "LOGIC_OPS",
    "difficulty": "MEDIUM",
    "points": 50,
    "answer": "79056",
    "hint": "Multiply each term by 6."
  },
  {
    "id": "0X_GEN_171",
    "title": "NUMERIC PROGRESSION 60",
    "description": "Identify the next value in the sequence: 62, 124, 248, 496, ?",
    "category": "LOGIC_OPS",
    "difficulty": "MEDIUM",
    "points": 50,
    "answer": "992",
    "hint": "Multiply each term by 2."
  },
  {
    "id": "0X_GEN_172",
    "title": "NUMERIC PROGRESSION 61",
    "description": "Identify the next value in the sequence: 63, 189, 567, 1701, ?",
    "category": "LOGIC_OPS",
    "difficulty": "MEDIUM",
    "points": 50,
    "answer": "5103",
    "hint": "Multiply each term by 3."
  },
  {
    "id": "0X_GEN_173",
    "title": "NUMERIC PROGRESSION 62",
    "description": "Identify the next value in the sequence: 64, 256, 1024, 4096, ?",
    "category": "LOGIC_OPS",
    "difficulty": "MEDIUM",
    "points": 50,
    "answer": "16384",
    "hint": "Multiply each term by 4."
  },
  {
    "id": "0X_GEN_174",
    "title": "NUMERIC PROGRESSION 63",
    "description": "Identify the next value in the sequence: 65, 325, 1625, 8125, ?",
    "category": "LOGIC_OPS",
    "difficulty": "MEDIUM",
    "points": 50,
    "answer": "40625",
    "hint": "Multiply each term by 5."
  },
  {
    "id": "0X_GEN_175",
    "title": "NUMERIC PROGRESSION 64",
    "description": "Identify the next value in the sequence: 66, 396, 2376, 14256, ?",
    "category": "LOGIC_OPS",
    "difficulty": "MEDIUM",
    "points": 50,
    "answer": "85536",
    "hint": "Multiply each term by 6."
  },
  {
    "id": "0X_GEN_176",
    "title": "NUMERIC PROGRESSION 65",
    "description": "Identify the next value in the sequence: 67, 134, 268, 536, ?",
    "category": "LOGIC_OPS",
    "difficulty": "MEDIUM",
    "points": 50,
    "answer": "1072",
    "hint": "Multiply each term by 2."
  },
  {
    "id": "0X_GEN_177",
    "title": "NUMERIC PROGRESSION 66",
    "description": "Identify the next value in the sequence: 68, 204, 612, 1836, ?",
    "category": "LOGIC_OPS",
    "difficulty": "MEDIUM",
    "points": 50,
    "answer": "5508",
    "hint": "Multiply each term by 3."
  },
  {
    "id": "0X_GEN_178",
    "title": "NUMERIC PROGRESSION 67",
    "description": "Identify the next value in the sequence: 69, 276, 1104, 4416, ?",
    "category": "LOGIC_OPS",
    "difficulty": "MEDIUM",
    "points": 50,
    "answer": "17664",
    "hint": "Multiply each term by 4."
  },
  {
    "id": "0X_GEN_179",
    "title": "NUMERIC PROGRESSION 68",
    "description": "Identify the next value in the sequence: 70, 350, 1750, 8750, ?",
    "category": "LOGIC_OPS",
    "difficulty": "MEDIUM",
    "points": 50,
    "answer": "43750",
    "hint": "Multiply each term by 5."
  },
  {
    "id": "0X_GEN_180",
    "title": "NUMERIC PROGRESSION 69",
    "description": "Identify the next value in the sequence: 71, 426, 2556, 15336, ?",
    "category": "LOGIC_OPS",
    "difficulty": "MEDIUM",
    "points": 50,
    "answer": "92016",
    "hint": "Multiply each term by 6."
  },
  {
    "id": "0X_GEN_181",
    "title": "NUMERIC PROGRESSION 70",
    "description": "Identify the next value in the sequence: 72, 144, 288, 576, ?",
    "category": "LOGIC_OPS",
    "difficulty": "MEDIUM",
    "points": 50,
    "answer": "1152",
    "hint": "Multiply each term by 2."
  },
  {
    "id": "0X_GEN_182",
    "title": "NUMERIC PROGRESSION 71",
    "description": "Identify the next value in the sequence: 73, 219, 657, 1971, ?",
    "category": "LOGIC_OPS",
    "difficulty": "MEDIUM",
    "points": 50,
    "answer": "5913",
    "hint": "Multiply each term by 3."
  },
  {
    "id": "0X_GEN_183",
    "title": "NUMERIC PROGRESSION 72",
    "description": "Identify the next value in the sequence: 74, 296, 1184, 4736, ?",
    "category": "LOGIC_OPS",
    "difficulty": "MEDIUM",
    "points": 50,
    "answer": "18944",
    "hint": "Multiply each term by 4."
  },
  {
    "id": "0X_GEN_184",
    "title": "NUMERIC PROGRESSION 73",
    "description": "Identify the next value in the sequence: 75, 375, 1875, 9375, ?",
    "category": "LOGIC_OPS",
    "difficulty": "MEDIUM",
    "points": 50,
    "answer": "46875",
    "hint": "Multiply each term by 5."
  },
  {
    "id": "0X_GEN_185",
    "title": "NUMERIC PROGRESSION 74",
    "description": "Identify the next value in the sequence: 76, 456, 2736, 16416, ?",
    "category": "LOGIC_OPS",
    "difficulty": "MEDIUM",
    "points": 50,
    "answer": "98496",
    "hint": "Multiply each term by 6."
  },
  {
    "id": "0X_GEN_186",
    "title": "NUMERIC PROGRESSION 75",
    "description": "Identify the next value in the sequence: 77, 154, 308, 616, ?",
    "category": "LOGIC_OPS",
    "difficulty": "MEDIUM",
    "points": 50,
    "answer": "1232",
    "hint": "Multiply each term by 2."
  },
  {
    "id": "0X_GEN_187",
    "title": "NUMERIC PROGRESSION 76",
    "description": "Identify the next value in the sequence: 78, 234, 702, 2106, ?",
    "category": "LOGIC_OPS",
    "difficulty": "MEDIUM",
    "points": 50,
    "answer": "6318",
    "hint": "Multiply each term by 3."
  },
  {
    "id": "0X_GEN_188",
    "title": "NUMERIC PROGRESSION 77",
    "description": "Identify the next value in the sequence: 79, 316, 1264, 5056, ?",
    "category": "LOGIC_OPS",
    "difficulty": "MEDIUM",
    "points": 50,
    "answer": "20224",
    "hint": "Multiply each term by 4."
  },
  {
    "id": "0X_GEN_189",
    "title": "NUMERIC PROGRESSION 78",
    "description": "Identify the next value in the sequence: 80, 400, 2000, 10000, ?",
    "category": "LOGIC_OPS",
    "difficulty": "MEDIUM",
    "points": 50,
    "answer": "50000",
    "hint": "Multiply each term by 5."
  },
  {
    "id": "0X_GEN_190",
    "title": "NUMERIC PROGRESSION 79",
    "description": "Identify the next value in the sequence: 81, 486, 2916, 17496, ?",
    "category": "LOGIC_OPS",
    "difficulty": "MEDIUM",
    "points": 50,
    "answer": "104976",
    "hint": "Multiply each term by 6."
  },
  {
    "id": "0X_GEN_191",
    "title": "NUMERIC PROGRESSION 80",
    "description": "Identify the next value in the sequence: 82, 164, 328, 656, ?",
    "category": "LOGIC_OPS",
    "difficulty": "MEDIUM",
    "points": 50,
    "answer": "1312",
    "hint": "Multiply each term by 2."
  },
  {
    "id": "0X_GEN_192",
    "title": "NUMERIC PROGRESSION 81",
    "description": "Identify the next value in the sequence: 83, 249, 747, 2241, ?",
    "category": "LOGIC_OPS",
    "difficulty": "MEDIUM",
    "points": 50,
    "answer": "6723",
    "hint": "Multiply each term by 3."
  },
  {
    "id": "0X_GEN_193",
    "title": "NUMERIC PROGRESSION 82",
    "description": "Identify the next value in the sequence: 84, 336, 1344, 5376, ?",
    "category": "LOGIC_OPS",
    "difficulty": "MEDIUM",
    "points": 50,
    "answer": "21504",
    "hint": "Multiply each term by 4."
  },
  {
    "id": "0X_GEN_194",
    "title": "NUMERIC PROGRESSION 83",
    "description": "Identify the next value in the sequence: 85, 425, 2125, 10625, ?",
    "category": "LOGIC_OPS",
    "difficulty": "MEDIUM",
    "points": 50,
    "answer": "53125",
    "hint": "Multiply each term by 5."
  },
  {
    "id": "0X_GEN_195",
    "title": "NUMERIC PROGRESSION 84",
    "description": "Identify the next value in the sequence: 86, 516, 3096, 18576, ?",
    "category": "LOGIC_OPS",
    "difficulty": "MEDIUM",
    "points": 50,
    "answer": "111456",
    "hint": "Multiply each term by 6."
  },
  {
    "id": "0X_GEN_196",
    "title": "NUMERIC PROGRESSION 85",
    "description": "Identify the next value in the sequence: 87, 174, 348, 696, ?",
    "category": "LOGIC_OPS",
    "difficulty": "MEDIUM",
    "points": 50,
    "answer": "1392",
    "hint": "Multiply each term by 2."
  },
  {
    "id": "0X_GEN_197",
    "title": "NUMERIC PROGRESSION 86",
    "description": "Identify the next value in the sequence: 88, 264, 792, 2376, ?",
    "category": "LOGIC_OPS",
    "difficulty": "MEDIUM",
    "points": 50,
    "answer": "7128",
    "hint": "Multiply each term by 3."
  },
  {
    "id": "0X_GEN_198",
    "title": "NUMERIC PROGRESSION 87",
    "description": "Identify the next value in the sequence: 89, 356, 1424, 5696, ?",
    "category": "LOGIC_OPS",
    "difficulty": "MEDIUM",
    "points": 50,
    "answer": "22784",
    "hint": "Multiply each term by 4."
  },
  {
    "id": "0X_GEN_199",
    "title": "NUMERIC PROGRESSION 88",
    "description": "Identify the next value in the sequence: 90, 450, 2250, 11250, ?",
    "category": "LOGIC_OPS",
    "difficulty": "MEDIUM",
    "points": 50,
    "answer": "56250",
    "hint": "Multiply each term by 5."
  },
  {
    "id": "0X_GEN_200",
    "title": "NUMERIC PROGRESSION 89",
    "description": "Identify the next value in the sequence: 91, 546, 3276, 19656, ?",
    "category": "LOGIC_OPS",
    "difficulty": "MEDIUM",
    "points": 50,
    "answer": "117936",
    "hint": "Multiply each term by 6."
  },
  {
    "id": "0X_GEN_201",
    "title": "NUMERIC PROGRESSION 90",
    "description": "Identify the next value in the sequence: 92, 184, 368, 736, ?",
    "category": "LOGIC_OPS",
    "difficulty": "MEDIUM",
    "points": 50,
    "answer": "1472",
    "hint": "Multiply each term by 2."
  },
  {
    "id": "0X_GEN_202",
    "title": "NUMERIC PROGRESSION 91",
    "description": "Identify the next value in the sequence: 93, 279, 837, 2511, ?",
    "category": "LOGIC_OPS",
    "difficulty": "MEDIUM",
    "points": 50,
    "answer": "7533",
    "hint": "Multiply each term by 3."
  },
  {
    "id": "0X_GEN_203",
    "title": "NUMERIC PROGRESSION 92",
    "description": "Identify the next value in the sequence: 94, 376, 1504, 6016, ?",
    "category": "LOGIC_OPS",
    "difficulty": "MEDIUM",
    "points": 50,
    "answer": "24064",
    "hint": "Multiply each term by 4."
  },
  {
    "id": "0X_GEN_204",
    "title": "NUMERIC PROGRESSION 93",
    "description": "Identify the next value in the sequence: 95, 475, 2375, 11875, ?",
    "category": "LOGIC_OPS",
    "difficulty": "MEDIUM",
    "points": 50,
    "answer": "59375",
    "hint": "Multiply each term by 5."
  },
  {
    "id": "0X_GEN_205",
    "title": "NUMERIC PROGRESSION 94",
    "description": "Identify the next value in the sequence: 96, 576, 3456, 20736, ?",
    "category": "LOGIC_OPS",
    "difficulty": "MEDIUM",
    "points": 50,
    "answer": "124416",
    "hint": "Multiply each term by 6."
  },
  {
    "id": "0X_GEN_206",
    "title": "NUMERIC PROGRESSION 95",
    "description": "Identify the next value in the sequence: 97, 194, 388, 776, ?",
    "category": "LOGIC_OPS",
    "difficulty": "MEDIUM",
    "points": 50,
    "answer": "1552",
    "hint": "Multiply each term by 2."
  },
  {
    "id": "0X_GEN_207",
    "title": "NUMERIC PROGRESSION 96",
    "description": "Identify the next value in the sequence: 98, 294, 882, 2646, ?",
    "category": "LOGIC_OPS",
    "difficulty": "MEDIUM",
    "points": 50,
    "answer": "7938",
    "hint": "Multiply each term by 3."
  },
  {
    "id": "0X_GEN_208",
    "title": "NUMERIC PROGRESSION 97",
    "description": "Identify the next value in the sequence: 99, 396, 1584, 6336, ?",
    "category": "LOGIC_OPS",
    "difficulty": "MEDIUM",
    "points": 50,
    "answer": "25344",
    "hint": "Multiply each term by 4."
  },
  {
    "id": "0X_GEN_209",
    "title": "NUMERIC PROGRESSION 98",
    "description": "Identify the next value in the sequence: 100, 500, 2500, 12500, ?",
    "category": "LOGIC_OPS",
    "difficulty": "MEDIUM",
    "points": 50,
    "answer": "62500",
    "hint": "Multiply each term by 5."
  },
  {
    "id": "0X_GEN_210",
    "title": "NUMERIC PROGRESSION 99",
    "description": "Identify the next value in the sequence: 101, 606, 3636, 21816, ?",
    "category": "LOGIC_OPS",
    "difficulty": "MEDIUM",
    "points": 50,
    "answer": "130896",
    "hint": "Multiply each term by 6."
  },
  {
    "id": "0X_GEN_211",
    "title": "GEOLOCATION TRACE 0",
    "description": "Agent trace detected at coordinates: 51.5105 N, -0.1249 E. Identify the closest major city/headquarters.",
    "category": "GEOLOCATION",
    "difficulty": "MEDIUM",
    "points": 50,
    "answer": "LONDON",
    "hint": "Use a map to look up the coordinates."
  },
  {
    "id": "0X_GEN_212",
    "title": "GEOLOCATION TRACE 1",
    "description": "Agent trace detected at coordinates: 55.7599 N, 37.6186 E. Identify the closest major city/headquarters.",
    "category": "GEOLOCATION",
    "difficulty": "MEDIUM",
    "points": 50,
    "answer": "MOSCOW",
    "hint": "Use a map to look up the coordinates."
  },
  {
    "id": "0X_GEN_213",
    "title": "GEOLOCATION TRACE 2",
    "description": "Agent trace detected at coordinates: 38.9099 N, -77.0324 E. Identify the closest major city/headquarters.",
    "category": "GEOLOCATION",
    "difficulty": "MEDIUM",
    "points": 50,
    "answer": "WASHINGTON",
    "hint": "Use a map to look up the coordinates."
  },
  {
    "id": "0X_GEN_214",
    "title": "GEOLOCATION TRACE 3",
    "description": "Agent trace detected at coordinates: 52.5169 N, 13.4067 E. Identify the closest major city/headquarters.",
    "category": "GEOLOCATION",
    "difficulty": "MEDIUM",
    "points": 50,
    "answer": "BERLIN",
    "hint": "Use a map to look up the coordinates."
  },
  {
    "id": "0X_GEN_215",
    "title": "GEOLOCATION TRACE 4",
    "description": "Agent trace detected at coordinates: 48.8570 N, 2.3534 E. Identify the closest major city/headquarters.",
    "category": "GEOLOCATION",
    "difficulty": "MEDIUM",
    "points": 50,
    "answer": "PARIS",
    "hint": "Use a map to look up the coordinates."
  },
  {
    "id": "0X_GEN_216",
    "title": "GEOLOCATION TRACE 5",
    "description": "Agent trace detected at coordinates: 39.9063 N, 116.4102 E. Identify the closest major city/headquarters.",
    "category": "GEOLOCATION",
    "difficulty": "MEDIUM",
    "points": 50,
    "answer": "BEIJING",
    "hint": "Use a map to look up the coordinates."
  },
  {
    "id": "0X_GEN_217",
    "title": "GEOLOCATION TRACE 6",
    "description": "Agent trace detected at coordinates: 38.9537 N, -77.1437 E. Identify the closest major city/headquarters.",
    "category": "GEOLOCATION",
    "difficulty": "MEDIUM",
    "points": 50,
    "answer": "LANGLEY",
    "hint": "Use a map to look up the coordinates."
  },
  {
    "id": "0X_GEN_218",
    "title": "GEOLOCATION TRACE 7",
    "description": "Agent trace detected at coordinates: 51.9016 N, -2.0790 E. Identify the closest major city/headquarters.",
    "category": "GEOLOCATION",
    "difficulty": "MEDIUM",
    "points": 50,
    "answer": "CHELTENHAM",
    "hint": "Use a map to look up the coordinates."
  },
  {
    "id": "0X_GEN_219",
    "title": "GEOLOCATION TRACE 8",
    "description": "Agent trace detected at coordinates: 51.5064 N, -0.1239 E. Identify the closest major city/headquarters.",
    "category": "GEOLOCATION",
    "difficulty": "MEDIUM",
    "points": 50,
    "answer": "LONDON",
    "hint": "Use a map to look up the coordinates."
  },
  {
    "id": "0X_GEN_220",
    "title": "GEOLOCATION TRACE 9",
    "description": "Agent trace detected at coordinates: 55.7590 N, 37.6139 E. Identify the closest major city/headquarters.",
    "category": "GEOLOCATION",
    "difficulty": "MEDIUM",
    "points": 50,
    "answer": "MOSCOW",
    "hint": "Use a map to look up the coordinates."
  },
  {
    "id": "0X_GEN_221",
    "title": "GEOLOCATION TRACE 10",
    "description": "Agent trace detected at coordinates: 38.9081 N, -77.0383 E. Identify the closest major city/headquarters.",
    "category": "GEOLOCATION",
    "difficulty": "MEDIUM",
    "points": 50,
    "answer": "WASHINGTON",
    "hint": "Use a map to look up the coordinates."
  },
  {
    "id": "0X_GEN_222",
    "title": "GEOLOCATION TRACE 11",
    "description": "Agent trace detected at coordinates: 52.5194 N, 13.4019 E. Identify the closest major city/headquarters.",
    "category": "GEOLOCATION",
    "difficulty": "MEDIUM",
    "points": 50,
    "answer": "BERLIN",
    "hint": "Use a map to look up the coordinates."
  },
  {
    "id": "0X_GEN_223",
    "title": "GEOLOCATION TRACE 12",
    "description": "Agent trace detected at coordinates: 48.8561 N, 2.3536 E. Identify the closest major city/headquarters.",
    "category": "GEOLOCATION",
    "difficulty": "MEDIUM",
    "points": 50,
    "answer": "PARIS",
    "hint": "Use a map to look up the coordinates."
  },
  {
    "id": "0X_GEN_224",
    "title": "GEOLOCATION TRACE 13",
    "description": "Agent trace detected at coordinates: 39.9055 N, 116.4077 E. Identify the closest major city/headquarters.",
    "category": "GEOLOCATION",
    "difficulty": "MEDIUM",
    "points": 50,
    "answer": "BEIJING",
    "hint": "Use a map to look up the coordinates."
  },
  {
    "id": "0X_GEN_225",
    "title": "GEOLOCATION TRACE 14",
    "description": "Agent trace detected at coordinates: 38.9525 N, -77.1470 E. Identify the closest major city/headquarters.",
    "category": "GEOLOCATION",
    "difficulty": "MEDIUM",
    "points": 50,
    "answer": "LANGLEY",
    "hint": "Use a map to look up the coordinates."
  },
  {
    "id": "0X_GEN_226",
    "title": "GEOLOCATION TRACE 15",
    "description": "Agent trace detected at coordinates: 51.9024 N, -2.0812 E. Identify the closest major city/headquarters.",
    "category": "GEOLOCATION",
    "difficulty": "MEDIUM",
    "points": 50,
    "answer": "CHELTENHAM",
    "hint": "Use a map to look up the coordinates."
  },
  {
    "id": "0X_GEN_227",
    "title": "GEOLOCATION TRACE 16",
    "description": "Agent trace detected at coordinates: 51.5051 N, -0.1269 E. Identify the closest major city/headquarters.",
    "category": "GEOLOCATION",
    "difficulty": "MEDIUM",
    "points": 50,
    "answer": "LONDON",
    "hint": "Use a map to look up the coordinates."
  },
  {
    "id": "0X_GEN_228",
    "title": "GEOLOCATION TRACE 17",
    "description": "Agent trace detected at coordinates: 55.7576 N, 37.6152 E. Identify the closest major city/headquarters.",
    "category": "GEOLOCATION",
    "difficulty": "MEDIUM",
    "points": 50,
    "answer": "MOSCOW",
    "hint": "Use a map to look up the coordinates."
  },
  {
    "id": "0X_GEN_229",
    "title": "GEOLOCATION TRACE 18",
    "description": "Agent trace detected at coordinates: 38.9042 N, -77.0370 E. Identify the closest major city/headquarters.",
    "category": "GEOLOCATION",
    "difficulty": "MEDIUM",
    "points": 50,
    "answer": "WASHINGTON",
    "hint": "Use a map to look up the coordinates."
  },
  {
    "id": "0X_GEN_230",
    "title": "GEOLOCATION TRACE 19",
    "description": "Agent trace detected at coordinates: 52.5209 N, 13.4078 E. Identify the closest major city/headquarters.",
    "category": "GEOLOCATION",
    "difficulty": "MEDIUM",
    "points": 50,
    "answer": "BERLIN",
    "hint": "Use a map to look up the coordinates."
  },
  {
    "id": "0X_GEN_231",
    "title": "GEOLOCATION TRACE 20",
    "description": "Agent trace detected at coordinates: 48.8569 N, 2.3556 E. Identify the closest major city/headquarters.",
    "category": "GEOLOCATION",
    "difficulty": "MEDIUM",
    "points": 50,
    "answer": "PARIS",
    "hint": "Use a map to look up the coordinates."
  },
  {
    "id": "0X_GEN_232",
    "title": "GEOLOCATION TRACE 21",
    "description": "Agent trace detected at coordinates: 39.9064 N, 116.4080 E. Identify the closest major city/headquarters.",
    "category": "GEOLOCATION",
    "difficulty": "MEDIUM",
    "points": 50,
    "answer": "BEIJING",
    "hint": "Use a map to look up the coordinates."
  },
  {
    "id": "0X_GEN_233",
    "title": "GEOLOCATION TRACE 22",
    "description": "Agent trace detected at coordinates: 38.9471 N, -77.1443 E. Identify the closest major city/headquarters.",
    "category": "GEOLOCATION",
    "difficulty": "MEDIUM",
    "points": 50,
    "answer": "LANGLEY",
    "hint": "Use a map to look up the coordinates."
  },
  {
    "id": "0X_GEN_234",
    "title": "GEOLOCATION TRACE 23",
    "description": "Agent trace detected at coordinates: 51.8949 N, -2.0770 E. Identify the closest major city/headquarters.",
    "category": "GEOLOCATION",
    "difficulty": "MEDIUM",
    "points": 50,
    "answer": "CHELTENHAM",
    "hint": "Use a map to look up the coordinates."
  },
  {
    "id": "0X_GEN_235",
    "title": "GEOLOCATION TRACE 24",
    "description": "Agent trace detected at coordinates: 51.5050 N, -0.1294 E. Identify the closest major city/headquarters.",
    "category": "GEOLOCATION",
    "difficulty": "MEDIUM",
    "points": 50,
    "answer": "LONDON",
    "hint": "Use a map to look up the coordinates."
  },
  {
    "id": "0X_GEN_236",
    "title": "GEOLOCATION TRACE 25",
    "description": "Agent trace detected at coordinates: 55.7553 N, 37.6143 E. Identify the closest major city/headquarters.",
    "category": "GEOLOCATION",
    "difficulty": "MEDIUM",
    "points": 50,
    "answer": "MOSCOW",
    "hint": "Use a map to look up the coordinates."
  },
  {
    "id": "0X_GEN_237",
    "title": "GEOLOCATION TRACE 26",
    "description": "Agent trace detected at coordinates: 38.9058 N, -77.0348 E. Identify the closest major city/headquarters.",
    "category": "GEOLOCATION",
    "difficulty": "MEDIUM",
    "points": 50,
    "answer": "WASHINGTON",
    "hint": "Use a map to look up the coordinates."
  },
  {
    "id": "0X_GEN_238",
    "title": "GEOLOCATION TRACE 27",
    "description": "Agent trace detected at coordinates: 52.5192 N, 13.4024 E. Identify the closest major city/headquarters.",
    "category": "GEOLOCATION",
    "difficulty": "MEDIUM",
    "points": 50,
    "answer": "BERLIN",
    "hint": "Use a map to look up the coordinates."
  },
  {
    "id": "0X_GEN_239",
    "title": "GEOLOCATION TRACE 28",
    "description": "Agent trace detected at coordinates: 48.8560 N, 2.3562 E. Identify the closest major city/headquarters.",
    "category": "GEOLOCATION",
    "difficulty": "MEDIUM",
    "points": 50,
    "answer": "PARIS",
    "hint": "Use a map to look up the coordinates."
  },
  {
    "id": "0X_GEN_240",
    "title": "GEOLOCATION TRACE 29",
    "description": "Agent trace detected at coordinates: 39.9091 N, 116.4112 E. Identify the closest major city/headquarters.",
    "category": "GEOLOCATION",
    "difficulty": "MEDIUM",
    "points": 50,
    "answer": "BEIJING",
    "hint": "Use a map to look up the coordinates."
  },
  {
    "id": "0X_GEN_241",
    "title": "GEOLOCATION TRACE 30",
    "description": "Agent trace detected at coordinates: 38.9537 N, -77.1473 E. Identify the closest major city/headquarters.",
    "category": "GEOLOCATION",
    "difficulty": "MEDIUM",
    "points": 50,
    "answer": "LANGLEY",
    "hint": "Use a map to look up the coordinates."
  },
  {
    "id": "0X_GEN_242",
    "title": "GEOLOCATION TRACE 31",
    "description": "Agent trace detected at coordinates: 51.8967 N, -2.0830 E. Identify the closest major city/headquarters.",
    "category": "GEOLOCATION",
    "difficulty": "MEDIUM",
    "points": 50,
    "answer": "CHELTENHAM",
    "hint": "Use a map to look up the coordinates."
  },
  {
    "id": "0X_GEN_243",
    "title": "GEOLOCATION TRACE 32",
    "description": "Agent trace detected at coordinates: 51.5070 N, -0.1292 E. Identify the closest major city/headquarters.",
    "category": "GEOLOCATION",
    "difficulty": "MEDIUM",
    "points": 50,
    "answer": "LONDON",
    "hint": "Use a map to look up the coordinates."
  },
  {
    "id": "0X_GEN_244",
    "title": "GEOLOCATION TRACE 33",
    "description": "Agent trace detected at coordinates: 55.7554 N, 37.6206 E. Identify the closest major city/headquarters.",
    "category": "GEOLOCATION",
    "difficulty": "MEDIUM",
    "points": 50,
    "answer": "MOSCOW",
    "hint": "Use a map to look up the coordinates."
  },
  {
    "id": "0X_GEN_245",
    "title": "GEOLOCATION TRACE 34",
    "description": "Agent trace detected at coordinates: 38.9023 N, -77.0351 E. Identify the closest major city/headquarters.",
    "category": "GEOLOCATION",
    "difficulty": "MEDIUM",
    "points": 50,
    "answer": "WASHINGTON",
    "hint": "Use a map to look up the coordinates."
  },
  {
    "id": "0X_GEN_246",
    "title": "GEOLOCATION TRACE 35",
    "description": "Agent trace detected at coordinates: 52.5163 N, 13.4097 E. Identify the closest major city/headquarters.",
    "category": "GEOLOCATION",
    "difficulty": "MEDIUM",
    "points": 50,
    "answer": "BERLIN",
    "hint": "Use a map to look up the coordinates."
  },
  {
    "id": "0X_GEN_247",
    "title": "GEOLOCATION TRACE 36",
    "description": "Agent trace detected at coordinates: 48.8615 N, 2.3504 E. Identify the closest major city/headquarters.",
    "category": "GEOLOCATION",
    "difficulty": "MEDIUM",
    "points": 50,
    "answer": "PARIS",
    "hint": "Use a map to look up the coordinates."
  },
  {
    "id": "0X_GEN_248",
    "title": "GEOLOCATION TRACE 37",
    "description": "Agent trace detected at coordinates: 39.9044 N, 116.4035 E. Identify the closest major city/headquarters.",
    "category": "GEOLOCATION",
    "difficulty": "MEDIUM",
    "points": 50,
    "answer": "BEIJING",
    "hint": "Use a map to look up the coordinates."
  },
  {
    "id": "0X_GEN_249",
    "title": "GEOLOCATION TRACE 38",
    "description": "Agent trace detected at coordinates: 38.9532 N, -77.1435 E. Identify the closest major city/headquarters.",
    "category": "GEOLOCATION",
    "difficulty": "MEDIUM",
    "points": 50,
    "answer": "LANGLEY",
    "hint": "Use a map to look up the coordinates."
  },
  {
    "id": "0X_GEN_250",
    "title": "GEOLOCATION TRACE 39",
    "description": "Agent trace detected at coordinates: 51.8991 N, -2.0826 E. Identify the closest major city/headquarters.",
    "category": "GEOLOCATION",
    "difficulty": "MEDIUM",
    "points": 50,
    "answer": "CHELTENHAM",
    "hint": "Use a map to look up the coordinates."
  },
  {
    "id": "0X_GEN_251",
    "title": "GEOLOCATION TRACE 40",
    "description": "Agent trace detected at coordinates: 51.5053 N, -0.1299 E. Identify the closest major city/headquarters.",
    "category": "GEOLOCATION",
    "difficulty": "MEDIUM",
    "points": 50,
    "answer": "LONDON",
    "hint": "Use a map to look up the coordinates."
  },
  {
    "id": "0X_GEN_252",
    "title": "GEOLOCATION TRACE 41",
    "description": "Agent trace detected at coordinates: 55.7517 N, 37.6184 E. Identify the closest major city/headquarters.",
    "category": "GEOLOCATION",
    "difficulty": "MEDIUM",
    "points": 50,
    "answer": "MOSCOW",
    "hint": "Use a map to look up the coordinates."
  },
  {
    "id": "0X_GEN_253",
    "title": "GEOLOCATION TRACE 42",
    "description": "Agent trace detected at coordinates: 38.9048 N, -77.0338 E. Identify the closest major city/headquarters.",
    "category": "GEOLOCATION",
    "difficulty": "MEDIUM",
    "points": 50,
    "answer": "WASHINGTON",
    "hint": "Use a map to look up the coordinates."
  },
  {
    "id": "0X_GEN_254",
    "title": "GEOLOCATION TRACE 43",
    "description": "Agent trace detected at coordinates: 52.5160 N, 13.4018 E. Identify the closest major city/headquarters.",
    "category": "GEOLOCATION",
    "difficulty": "MEDIUM",
    "points": 50,
    "answer": "BERLIN",
    "hint": "Use a map to look up the coordinates."
  },
  {
    "id": "0X_GEN_255",
    "title": "GEOLOCATION TRACE 44",
    "description": "Agent trace detected at coordinates: 48.8531 N, 2.3556 E. Identify the closest major city/headquarters.",
    "category": "GEOLOCATION",
    "difficulty": "MEDIUM",
    "points": 50,
    "answer": "PARIS",
    "hint": "Use a map to look up the coordinates."
  },
  {
    "id": "0X_GEN_256",
    "title": "GEOLOCATION TRACE 45",
    "description": "Agent trace detected at coordinates: 39.9073 N, 116.4047 E. Identify the closest major city/headquarters.",
    "category": "GEOLOCATION",
    "difficulty": "MEDIUM",
    "points": 50,
    "answer": "BEIJING",
    "hint": "Use a map to look up the coordinates."
  },
  {
    "id": "0X_GEN_257",
    "title": "GEOLOCATION TRACE 46",
    "description": "Agent trace detected at coordinates: 38.9510 N, -77.1526 E. Identify the closest major city/headquarters.",
    "category": "GEOLOCATION",
    "difficulty": "MEDIUM",
    "points": 50,
    "answer": "LANGLEY",
    "hint": "Use a map to look up the coordinates."
  },
  {
    "id": "0X_GEN_258",
    "title": "GEOLOCATION TRACE 47",
    "description": "Agent trace detected at coordinates: 51.8997 N, -2.0822 E. Identify the closest major city/headquarters.",
    "category": "GEOLOCATION",
    "difficulty": "MEDIUM",
    "points": 50,
    "answer": "CHELTENHAM",
    "hint": "Use a map to look up the coordinates."
  },
  {
    "id": "0X_GEN_259",
    "title": "GEOLOCATION TRACE 48",
    "description": "Agent trace detected at coordinates: 51.5121 N, -0.1322 E. Identify the closest major city/headquarters.",
    "category": "GEOLOCATION",
    "difficulty": "MEDIUM",
    "points": 50,
    "answer": "LONDON",
    "hint": "Use a map to look up the coordinates."
  },
  {
    "id": "0X_GEN_260",
    "title": "GEOLOCATION TRACE 49",
    "description": "Agent trace detected at coordinates: 55.7524 N, 37.6217 E. Identify the closest major city/headquarters.",
    "category": "GEOLOCATION",
    "difficulty": "MEDIUM",
    "points": 50,
    "answer": "MOSCOW",
    "hint": "Use a map to look up the coordinates."
  },
  {
    "id": "0X_GEN_261",
    "title": "GEOLOCATION TRACE 50",
    "description": "Agent trace detected at coordinates: 38.9120 N, -77.0376 E. Identify the closest major city/headquarters.",
    "category": "GEOLOCATION",
    "difficulty": "MEDIUM",
    "points": 50,
    "answer": "WASHINGTON",
    "hint": "Use a map to look up the coordinates."
  },
  {
    "id": "0X_GEN_262",
    "title": "GEOLOCATION TRACE 51",
    "description": "Agent trace detected at coordinates: 52.5173 N, 13.4021 E. Identify the closest major city/headquarters.",
    "category": "GEOLOCATION",
    "difficulty": "MEDIUM",
    "points": 50,
    "answer": "BERLIN",
    "hint": "Use a map to look up the coordinates."
  },
  {
    "id": "0X_GEN_263",
    "title": "GEOLOCATION TRACE 52",
    "description": "Agent trace detected at coordinates: 48.8606 N, 2.3490 E. Identify the closest major city/headquarters.",
    "category": "GEOLOCATION",
    "difficulty": "MEDIUM",
    "points": 50,
    "answer": "PARIS",
    "hint": "Use a map to look up the coordinates."
  },
  {
    "id": "0X_GEN_264",
    "title": "GEOLOCATION TRACE 53",
    "description": "Agent trace detected at coordinates: 39.9075 N, 116.4040 E. Identify the closest major city/headquarters.",
    "category": "GEOLOCATION",
    "difficulty": "MEDIUM",
    "points": 50,
    "answer": "BEIJING",
    "hint": "Use a map to look up the coordinates."
  },
  {
    "id": "0X_GEN_265",
    "title": "GEOLOCATION TRACE 54",
    "description": "Agent trace detected at coordinates: 38.9499 N, -77.1463 E. Identify the closest major city/headquarters.",
    "category": "GEOLOCATION",
    "difficulty": "MEDIUM",
    "points": 50,
    "answer": "LANGLEY",
    "hint": "Use a map to look up the coordinates."
  },
  {
    "id": "0X_GEN_266",
    "title": "GEOLOCATION TRACE 55",
    "description": "Agent trace detected at coordinates: 51.8998 N, -2.0796 E. Identify the closest major city/headquarters.",
    "category": "GEOLOCATION",
    "difficulty": "MEDIUM",
    "points": 50,
    "answer": "CHELTENHAM",
    "hint": "Use a map to look up the coordinates."
  },
  {
    "id": "0X_GEN_267",
    "title": "GEOLOCATION TRACE 56",
    "description": "Agent trace detected at coordinates: 51.5052 N, -0.1255 E. Identify the closest major city/headquarters.",
    "category": "GEOLOCATION",
    "difficulty": "MEDIUM",
    "points": 50,
    "answer": "LONDON",
    "hint": "Use a map to look up the coordinates."
  },
  {
    "id": "0X_GEN_268",
    "title": "GEOLOCATION TRACE 57",
    "description": "Agent trace detected at coordinates: 55.7578 N, 37.6182 E. Identify the closest major city/headquarters.",
    "category": "GEOLOCATION",
    "difficulty": "MEDIUM",
    "points": 50,
    "answer": "MOSCOW",
    "hint": "Use a map to look up the coordinates."
  },
  {
    "id": "0X_GEN_269",
    "title": "GEOLOCATION TRACE 58",
    "description": "Agent trace detected at coordinates: 38.9094 N, -77.0414 E. Identify the closest major city/headquarters.",
    "category": "GEOLOCATION",
    "difficulty": "MEDIUM",
    "points": 50,
    "answer": "WASHINGTON",
    "hint": "Use a map to look up the coordinates."
  },
  {
    "id": "0X_GEN_270",
    "title": "GEOLOCATION TRACE 59",
    "description": "Agent trace detected at coordinates: 52.5239 N, 13.4085 E. Identify the closest major city/headquarters.",
    "category": "GEOLOCATION",
    "difficulty": "MEDIUM",
    "points": 50,
    "answer": "BERLIN",
    "hint": "Use a map to look up the coordinates."
  },
  {
    "id": "0X_GEN_271",
    "title": "GEOLOCATION TRACE 60",
    "description": "Agent trace detected at coordinates: 48.8559 N, 2.3553 E. Identify the closest major city/headquarters.",
    "category": "GEOLOCATION",
    "difficulty": "MEDIUM",
    "points": 50,
    "answer": "PARIS",
    "hint": "Use a map to look up the coordinates."
  },
  {
    "id": "0X_GEN_272",
    "title": "GEOLOCATION TRACE 61",
    "description": "Agent trace detected at coordinates: 39.9037 N, 116.4114 E. Identify the closest major city/headquarters.",
    "category": "GEOLOCATION",
    "difficulty": "MEDIUM",
    "points": 50,
    "answer": "BEIJING",
    "hint": "Use a map to look up the coordinates."
  },
  {
    "id": "0X_GEN_273",
    "title": "GEOLOCATION TRACE 62",
    "description": "Agent trace detected at coordinates: 38.9501 N, -77.1466 E. Identify the closest major city/headquarters.",
    "category": "GEOLOCATION",
    "difficulty": "MEDIUM",
    "points": 50,
    "answer": "LANGLEY",
    "hint": "Use a map to look up the coordinates."
  },
  {
    "id": "0X_GEN_274",
    "title": "GEOLOCATION TRACE 63",
    "description": "Agent trace detected at coordinates: 51.8946 N, -2.0749 E. Identify the closest major city/headquarters.",
    "category": "GEOLOCATION",
    "difficulty": "MEDIUM",
    "points": 50,
    "answer": "CHELTENHAM",
    "hint": "Use a map to look up the coordinates."
  },
  {
    "id": "0X_GEN_275",
    "title": "GEOLOCATION TRACE 64",
    "description": "Agent trace detected at coordinates: 51.5088 N, -0.1246 E. Identify the closest major city/headquarters.",
    "category": "GEOLOCATION",
    "difficulty": "MEDIUM",
    "points": 50,
    "answer": "LONDON",
    "hint": "Use a map to look up the coordinates."
  },
  {
    "id": "0X_GEN_276",
    "title": "GEOLOCATION TRACE 65",
    "description": "Agent trace detected at coordinates: 55.7527 N, 37.6160 E. Identify the closest major city/headquarters.",
    "category": "GEOLOCATION",
    "difficulty": "MEDIUM",
    "points": 50,
    "answer": "MOSCOW",
    "hint": "Use a map to look up the coordinates."
  },
  {
    "id": "0X_GEN_277",
    "title": "GEOLOCATION TRACE 66",
    "description": "Agent trace detected at coordinates: 38.9035 N, -77.0361 E. Identify the closest major city/headquarters.",
    "category": "GEOLOCATION",
    "difficulty": "MEDIUM",
    "points": 50,
    "answer": "WASHINGTON",
    "hint": "Use a map to look up the coordinates."
  },
  {
    "id": "0X_GEN_278",
    "title": "GEOLOCATION TRACE 67",
    "description": "Agent trace detected at coordinates: 52.5233 N, 13.4061 E. Identify the closest major city/headquarters.",
    "category": "GEOLOCATION",
    "difficulty": "MEDIUM",
    "points": 50,
    "answer": "BERLIN",
    "hint": "Use a map to look up the coordinates."
  },
  {
    "id": "0X_GEN_279",
    "title": "GEOLOCATION TRACE 68",
    "description": "Agent trace detected at coordinates: 48.8601 N, 2.3510 E. Identify the closest major city/headquarters.",
    "category": "GEOLOCATION",
    "difficulty": "MEDIUM",
    "points": 50,
    "answer": "PARIS",
    "hint": "Use a map to look up the coordinates."
  },
  {
    "id": "0X_GEN_280",
    "title": "GEOLOCATION TRACE 69",
    "description": "Agent trace detected at coordinates: 39.9057 N, 116.4040 E. Identify the closest major city/headquarters.",
    "category": "GEOLOCATION",
    "difficulty": "MEDIUM",
    "points": 50,
    "answer": "BEIJING",
    "hint": "Use a map to look up the coordinates."
  },
  {
    "id": "0X_GEN_281",
    "title": "GEOLOCATION TRACE 70",
    "description": "Agent trace detected at coordinates: 38.9519 N, -77.1458 E. Identify the closest major city/headquarters.",
    "category": "GEOLOCATION",
    "difficulty": "MEDIUM",
    "points": 50,
    "answer": "LANGLEY",
    "hint": "Use a map to look up the coordinates."
  },
  {
    "id": "0X_GEN_282",
    "title": "GEOLOCATION TRACE 71",
    "description": "Agent trace detected at coordinates: 51.8946 N, -2.0774 E. Identify the closest major city/headquarters.",
    "category": "GEOLOCATION",
    "difficulty": "MEDIUM",
    "points": 50,
    "answer": "CHELTENHAM",
    "hint": "Use a map to look up the coordinates."
  },
  {
    "id": "0X_GEN_283",
    "title": "GEOLOCATION TRACE 72",
    "description": "Agent trace detected at coordinates: 51.5037 N, -0.1266 E. Identify the closest major city/headquarters.",
    "category": "GEOLOCATION",
    "difficulty": "MEDIUM",
    "points": 50,
    "answer": "LONDON",
    "hint": "Use a map to look up the coordinates."
  },
  {
    "id": "0X_GEN_284",
    "title": "GEOLOCATION TRACE 73",
    "description": "Agent trace detected at coordinates: 55.7528 N, 37.6207 E. Identify the closest major city/headquarters.",
    "category": "GEOLOCATION",
    "difficulty": "MEDIUM",
    "points": 50,
    "answer": "MOSCOW",
    "hint": "Use a map to look up the coordinates."
  },
  {
    "id": "0X_GEN_285",
    "title": "GEOLOCATION TRACE 74",
    "description": "Agent trace detected at coordinates: 38.9090 N, -77.0392 E. Identify the closest major city/headquarters.",
    "category": "GEOLOCATION",
    "difficulty": "MEDIUM",
    "points": 50,
    "answer": "WASHINGTON",
    "hint": "Use a map to look up the coordinates."
  },
  {
    "id": "0X_GEN_286",
    "title": "GEOLOCATION TRACE 75",
    "description": "Agent trace detected at coordinates: 52.5219 N, 13.4020 E. Identify the closest major city/headquarters.",
    "category": "GEOLOCATION",
    "difficulty": "MEDIUM",
    "points": 50,
    "answer": "BERLIN",
    "hint": "Use a map to look up the coordinates."
  },
  {
    "id": "0X_GEN_287",
    "title": "GEOLOCATION TRACE 76",
    "description": "Agent trace detected at coordinates: 48.8566 N, 2.3534 E. Identify the closest major city/headquarters.",
    "category": "GEOLOCATION",
    "difficulty": "MEDIUM",
    "points": 50,
    "answer": "PARIS",
    "hint": "Use a map to look up the coordinates."
  },
  {
    "id": "0X_GEN_288",
    "title": "GEOLOCATION TRACE 77",
    "description": "Agent trace detected at coordinates: 39.9005 N, 116.4062 E. Identify the closest major city/headquarters.",
    "category": "GEOLOCATION",
    "difficulty": "MEDIUM",
    "points": 50,
    "answer": "BEIJING",
    "hint": "Use a map to look up the coordinates."
  },
  {
    "id": "0X_GEN_289",
    "title": "GEOLOCATION TRACE 78",
    "description": "Agent trace detected at coordinates: 38.9557 N, -77.1472 E. Identify the closest major city/headquarters.",
    "category": "GEOLOCATION",
    "difficulty": "MEDIUM",
    "points": 50,
    "answer": "LANGLEY",
    "hint": "Use a map to look up the coordinates."
  },
  {
    "id": "0X_GEN_290",
    "title": "GEOLOCATION TRACE 79",
    "description": "Agent trace detected at coordinates: 51.8948 N, -2.0777 E. Identify the closest major city/headquarters.",
    "category": "GEOLOCATION",
    "difficulty": "MEDIUM",
    "points": 50,
    "answer": "CHELTENHAM",
    "hint": "Use a map to look up the coordinates."
  },
  {
    "id": "0X_GEN_291",
    "title": "GEOLOCATION TRACE 80",
    "description": "Agent trace detected at coordinates: 51.5109 N, -0.1278 E. Identify the closest major city/headquarters.",
    "category": "GEOLOCATION",
    "difficulty": "MEDIUM",
    "points": 50,
    "answer": "LONDON",
    "hint": "Use a map to look up the coordinates."
  },
  {
    "id": "0X_GEN_292",
    "title": "GEOLOCATION TRACE 81",
    "description": "Agent trace detected at coordinates: 55.7583 N, 37.6204 E. Identify the closest major city/headquarters.",
    "category": "GEOLOCATION",
    "difficulty": "MEDIUM",
    "points": 50,
    "answer": "MOSCOW",
    "hint": "Use a map to look up the coordinates."
  },
  {
    "id": "0X_GEN_293",
    "title": "GEOLOCATION TRACE 82",
    "description": "Agent trace detected at coordinates: 38.9046 N, -77.0418 E. Identify the closest major city/headquarters.",
    "category": "GEOLOCATION",
    "difficulty": "MEDIUM",
    "points": 50,
    "answer": "WASHINGTON",
    "hint": "Use a map to look up the coordinates."
  },
  {
    "id": "0X_GEN_294",
    "title": "GEOLOCATION TRACE 83",
    "description": "Agent trace detected at coordinates: 52.5231 N, 13.4022 E. Identify the closest major city/headquarters.",
    "category": "GEOLOCATION",
    "difficulty": "MEDIUM",
    "points": 50,
    "answer": "BERLIN",
    "hint": "Use a map to look up the coordinates."
  },
  {
    "id": "0X_GEN_295",
    "title": "GEOLOCATION TRACE 84",
    "description": "Agent trace detected at coordinates: 48.8538 N, 2.3475 E. Identify the closest major city/headquarters.",
    "category": "GEOLOCATION",
    "difficulty": "MEDIUM",
    "points": 50,
    "answer": "PARIS",
    "hint": "Use a map to look up the coordinates."
  },
  {
    "id": "0X_GEN_296",
    "title": "GEOLOCATION TRACE 85",
    "description": "Agent trace detected at coordinates: 39.9082 N, 116.4057 E. Identify the closest major city/headquarters.",
    "category": "GEOLOCATION",
    "difficulty": "MEDIUM",
    "points": 50,
    "answer": "BEIJING",
    "hint": "Use a map to look up the coordinates."
  },
  {
    "id": "0X_GEN_297",
    "title": "GEOLOCATION TRACE 86",
    "description": "Agent trace detected at coordinates: 38.9492 N, -77.1468 E. Identify the closest major city/headquarters.",
    "category": "GEOLOCATION",
    "difficulty": "MEDIUM",
    "points": 50,
    "answer": "LANGLEY",
    "hint": "Use a map to look up the coordinates."
  },
  {
    "id": "0X_GEN_298",
    "title": "GEOLOCATION TRACE 87",
    "description": "Agent trace detected at coordinates: 51.8951 N, -2.0743 E. Identify the closest major city/headquarters.",
    "category": "GEOLOCATION",
    "difficulty": "MEDIUM",
    "points": 50,
    "answer": "CHELTENHAM",
    "hint": "Use a map to look up the coordinates."
  },
  {
    "id": "0X_GEN_299",
    "title": "GEOLOCATION TRACE 88",
    "description": "Agent trace detected at coordinates: 51.5107 N, -0.1255 E. Identify the closest major city/headquarters.",
    "category": "GEOLOCATION",
    "difficulty": "MEDIUM",
    "points": 50,
    "answer": "LONDON",
    "hint": "Use a map to look up the coordinates."
  },
  {
    "id": "0X_GEN_300",
    "title": "GEOLOCATION TRACE 89",
    "description": "Agent trace detected at coordinates: 55.7530 N, 37.6144 E. Identify the closest major city/headquarters.",
    "category": "GEOLOCATION",
    "difficulty": "MEDIUM",
    "points": 50,
    "answer": "MOSCOW",
    "hint": "Use a map to look up the coordinates."
  },
  {
    "id": "0X_GEN_301",
    "title": "GEOLOCATION TRACE 90",
    "description": "Agent trace detected at coordinates: 38.9037 N, -77.0334 E. Identify the closest major city/headquarters.",
    "category": "GEOLOCATION",
    "difficulty": "MEDIUM",
    "points": 50,
    "answer": "WASHINGTON",
    "hint": "Use a map to look up the coordinates."
  },
  {
    "id": "0X_GEN_302",
    "title": "GEOLOCATION TRACE 91",
    "description": "Agent trace detected at coordinates: 52.5163 N, 13.4027 E. Identify the closest major city/headquarters.",
    "category": "GEOLOCATION",
    "difficulty": "MEDIUM",
    "points": 50,
    "answer": "BERLIN",
    "hint": "Use a map to look up the coordinates."
  },
  {
    "id": "0X_GEN_303",
    "title": "GEOLOCATION TRACE 92",
    "description": "Agent trace detected at coordinates: 48.8531 N, 2.3551 E. Identify the closest major city/headquarters.",
    "category": "GEOLOCATION",
    "difficulty": "MEDIUM",
    "points": 50,
    "answer": "PARIS",
    "hint": "Use a map to look up the coordinates."
  }
];

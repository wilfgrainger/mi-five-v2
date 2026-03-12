import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Shield, RefreshCw, LogOut, User as UserIcon, Lock, Unlock, ChevronRight, ChevronDown, ArrowLeft, Cpu, AlertTriangle, CheckCircle2, Share2, Image as ImageIcon, Briefcase, Map, MessageSquare, ScanLine, Zap, Timer, Trophy, Activity, Eye, Target, FileText, Database, Crosshair, ListChecks, ShieldAlert, Medal, Star, BarChart2 } from 'lucide-react';
import { puzzles, Puzzle, Category } from './data/puzzles';
import Tutorial from './components/Tutorial';

type User = {
  username: string;
  score: number;
  rank: string;
  solvedPuzzles: string[];
  ageGroup: string;
  specialization: string;
  tutorialCompleted?: boolean;
  dailyChallengeCompleted?: string; // date string YYYY-MM-DD
  streak?: number;
};

const RANKS = [
  { threshold: 0, name: 'RECRUIT' },
  { threshold: 100, name: 'FIELD AGENT' },
  { threshold: 500, name: 'OPERATIVE' },
  { threshold: 1000, name: 'SPECIAL AGENT' },
  { threshold: 2500, name: 'MASTER SPY' },
  { threshold: 5000, name: '00 STATUS' }
];

const DIFFICULTY_THRESHOLDS = {
  'EASY': 0,
  'MEDIUM': 100,
  'HARD': 500,
  'ELITE': 1000
};

const DAILY_CHALLENGE_MULTIPLIER = 2;

const SPEC_CATEGORY_MAP: Record<string, Category[]> = {
  CRYPTOGRAPHY: ['CRYPTOGRAPHY', 'CODE_BREAKER', 'GCHQ_CLASSIC'],
  CYBER_SECURITY: ['CYBER_SECURITY'],
  FIELD_OPS: ['MI5_101', 'COLD_WAR', 'INTELLIGENCE_DEBRIEF', 'GEOLOCATION'],
  SIGNAL_INT: ['SIGNAL_INT', 'GCHQ_CLASSIC'],
};

type MissionSection = {
  title: string;
  content: string;
};

const parseMissionSections = (description: string): MissionSection[] => {
  const matches = [...description.matchAll(/\*\*(\d+)\.\s+([^*]+)\*\*:\s*/g)];
  if (!matches.length) {
    return [{ title: 'MISSION BRIEF', content: description.replace(/\*\*/g, '').trim() }];
  }

  return matches.map((match, index) => {
    const start = (match.index ?? 0) + match[0].length;
    const end = index + 1 < matches.length ? (matches[index + 1].index ?? description.length) : description.length;
    return {
      title: `${match[1]}. ${match[2].trim()}`,
      content: description.slice(start, end).replace(/\*\*/g, '').trim()
    };
  });
};

const MissionSectionCard = ({ section, ...props }: { section: MissionSection; [key: string]: any }) => {
  const upperTitle = section.title.toUpperCase();

  // Default values
  let Icon = FileText;
  let colorTheme = {
    bg: 'bg-gradient-to-r from-[#3b82f6]/5 to-transparent',
    border: 'border-[#3b82f6]/20',
    iconBg: 'bg-[#3b82f6]/10',
    iconText: 'text-[#3b82f6]',
    title: 'text-[#60a5fa]',
    accent: 'border-[#3b82f6]/50'
  };
  let layoutClass = 'col-span-1 md:col-span-2';

  // Customize based on section title keywords
  if (upperTitle.includes('THE TARGET')) {
    Icon = Target;
    colorTheme = {
      bg: 'bg-gradient-to-r from-[#ef4444]/5 to-transparent',
      border: 'border-[#ef4444]/20',
      iconBg: 'bg-[#ef4444]/10',
      iconText: 'text-[#ef4444]',
      title: 'text-[#f87171]',
      accent: 'border-[#ef4444]/50'
    };
    layoutClass = 'col-span-1';
  } else if (upperTitle.includes('OBJECTIVE') || upperTitle.includes('THE OBJECTIVE')) {
    Icon = ListChecks;
    colorTheme = {
      bg: 'bg-gradient-to-r from-[#10b981]/5 to-transparent',
      border: 'border-[#10b981]/20',
      iconBg: 'bg-[#10b981]/10',
      iconText: 'text-[#10b981]',
      title: 'text-[#34d399]',
      accent: 'border-[#10b981]/50'
    };
    layoutClass = 'col-span-1';
  } else if (upperTitle.includes('THE BRIEFING')) {
    Icon = Briefcase;
    layoutClass = 'col-span-1 md:col-span-2';
  } else if (upperTitle.includes('INTEL') || upperTitle.includes('DATA')) {
    Icon = Database;
    colorTheme = {
      bg: 'bg-gradient-to-r from-[#eab308]/5 to-transparent',
      border: 'border-[#eab308]/20',
      iconBg: 'bg-[#eab308]/10',
      iconText: 'text-[#eab308]',
      title: 'text-[#fbbf24]',
      accent: 'border-[#eab308]/50'
    };
    layoutClass = 'col-span-1 md:col-span-2';
  } else if (upperTitle.includes('THREAT') || upperTitle.includes('WARNING')) {
    Icon = ShieldAlert;
    colorTheme = {
      bg: 'bg-gradient-to-r from-[#f97316]/5 to-transparent',
      border: 'border-[#f97316]/20',
      iconBg: 'bg-[#f97316]/10',
      iconText: 'text-[#f97316]',
      title: 'text-[#fb923c]',
      accent: 'border-[#f97316]/50'
    };
    layoutClass = 'col-span-1 md:col-span-2';
  }

  // Parse lists out of content (e.g., lines starting with "-", "*", or "1.")
  const lines = section.content.split('\n');
  const renderedContent = [];
  let currentList: { text: string; number?: string }[] = [];

  const flushList = () => {
    if (currentList.length > 0) {
      renderedContent.push(
        <ul key={`list-${renderedContent.length}`} className="space-y-3 mb-5 mt-3">
          {currentList.map((item, idx) => (
            <li key={idx} className="flex items-start gap-3">
              {item.number ? (
                <div className={`mt-[2px] w-5 h-5 shrink-0 rounded-full flex items-center justify-center bg-[#111] border ${colorTheme.border}`}>
                  <span className={`text-[10px] font-mono font-bold ${colorTheme.title}`}>{item.number}</span>
                </div>
              ) : (
                <Crosshair className={`w-4 h-4 mt-1 shrink-0 ${colorTheme.iconText} opacity-70`} />
              )}
              <span className="text-[14.5px] text-[#d4d4d4] font-sans leading-relaxed flex-1">{item.text}</span>
            </li>
          ))}
        </ul>
      );
      currentList = [];
    }
  };

  lines.forEach((line, idx) => {
    const trimmed = line.trim();

    // Check for bullet points (- or *)
    if (trimmed.startsWith('-') || trimmed.startsWith('*')) {
      currentList.push({ text: trimmed.replace(/^[-*]\s*/, '') });
    }
    // Check for numbered lists (e.g., "1. ", "2. ")
    else if (/^\d+\.\s/.test(trimmed)) {
      const match = trimmed.match(/^(\d+)\.\s(.*)/);
      if (match) {
        currentList.push({ number: match[1], text: match[2] });
      } else {
        currentList.push({ text: trimmed });
      }
    }
    else {
      flushList();
      if (trimmed) {
        renderedContent.push(
          <p key={`p-${idx}`} className="text-[15px] text-[#e5e5e5] font-sans leading-relaxed mb-4 last:mb-0 whitespace-pre-line">
            {trimmed}
          </p>
        );
      }
    }
  });
  flushList();

  return (
    <div className={`relative bg-[#0a0a0a] border ${colorTheme.border} rounded-2xl overflow-hidden shadow-lg group ${layoutClass}`}>
      {/* Accent Top Border */}
      <div className={`absolute top-0 left-0 w-full h-[2px] border-t-2 ${colorTheme.accent} opacity-50`}></div>

      {/* Inner Gradient Background */}
      <div className={`absolute inset-0 ${colorTheme.bg} pointer-events-none opacity-50`}></div>

      <div className="relative p-5 md:p-6 flex flex-col h-full z-10">
        <div className="flex items-center gap-3 mb-4 pb-3 border-b border-white/5">
          <div className={`p-2 rounded-lg ${colorTheme.iconBg} border ${colorTheme.border}`}>
            <Icon className={`w-5 h-5 ${colorTheme.iconText}`} />
          </div>
          <h3 className={`text-xs ${colorTheme.title} font-bold tracking-widest uppercase font-mono`}>
            {section.title}
          </h3>
        </div>

        <div className="flex-1">
          {renderedContent.length > 0 ? renderedContent : <p className="text-[15px] text-[#d4d4d4] font-sans leading-relaxed">{section.content}</p>}
        </div>

        {/* Subtle decorative bottom-right corner element */}
        <div className="absolute bottom-0 right-0 p-2 opacity-10 pointer-events-none">
          <Icon className={`w-24 h-24 ${colorTheme.iconText} -mr-6 -mb-6`} />
        </div>
      </div>
    </div>
  );
};

const getBriefingPreview = (description: string) => {
  const sections = parseMissionSections(description);
  const briefing = sections.find((section) => section.title.toUpperCase().includes('THE BRIEFING'));
  return (briefing?.content || sections[0]?.content || '').split('\n')[0];
};

const formatDisplayName = (text: string) => text.replace(/_/g, ' ');

const getRank = (score: number) => {
  let currentRank = RANKS[0].name;
  for (const rank of RANKS) {
    if (score >= rank.threshold) {
      currentRank = rank.name;
    }
  }
  return currentRank;
};

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [view, setView] = useState<'dashboard' | 'puzzle' | 'leaderboard'>('dashboard');
  const [activePuzzle, setActivePuzzle] = useState<Puzzle | null>(null);
  const [activeCategory, setActiveCategory] = useState<Category | 'ALL_DATA_FILES'>('ALL_DATA_FILES');
  const [gameMode, setGameMode] = useState<'TRAINING' | 'CHALLENGE'>('TRAINING');
  const [sortBy, setSortBy] = useState<'DIFFICULTY' | 'POINTS' | 'TITLE' | 'STATUS'>('DIFFICULTY');
  const [visibleCount, setVisibleCount] = useState(12);
  const [dailyChallengeId, setDailyChallengeId] = useState<string>('');
  const [timeLeft, setTimeLeft] = useState<string>('');

  // Daily Challenge Logic
  useEffect(() => {
    const today = new Date();
    const dateString = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
    
    // Pick a daily challenge based on the date
    let hash = 0;
    for (let i = 0; i < dateString.length; i++) {
      hash = ((hash << 5) - hash) + dateString.charCodeAt(i);
      hash |= 0;
    }
    const index = Math.abs(hash) % puzzles.length;
    setDailyChallengeId(puzzles[index].id);

    // Timer logic
    const updateTimer = () => {
      const now = new Date();
      const tomorrow = new Date(now);
      tomorrow.setDate(tomorrow.getDate() + 1);
      tomorrow.setHours(0, 0, 0, 0);
      
      const diff = tomorrow.getTime() - now.getTime();
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      
      setTimeLeft(`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  // Load user from local storage
  useEffect(() => {
    const storedUser = localStorage.getItem('spy_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogin = (username: string, ageGroup: string, specialization: string) => {
    const newUser = {
      username: username.toUpperCase(),
      score: 0,
      rank: 'RECRUIT',
      solvedPuzzles: [],
      ageGroup,
      specialization,
      tutorialCompleted: false
    };
    localStorage.setItem('spy_user', JSON.stringify(newUser));
    setUser(newUser);
  };

  const handleLogout = () => {
    localStorage.removeItem('spy_user');
    setUser(null);
  };

  const handleShare = async () => {
    if (!user) return;
    const shareText = `I've reached rank ${user.rank} with ${user.score} intelligence yield on INTELLIGENCE_AUTHORITY. Can you beat my score?`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'INTELLIGENCE_AUTHORITY',
          text: shareText,
          url: window.location.href,
        });
      } catch (err) {
        console.error('Error sharing:', err);
      }
    } else {
      navigator.clipboard.writeText(`${shareText} ${window.location.href}`);
      alert("Copied to clipboard!");
    }
  };

  const handleSolve = (puzzleId: string, points: number) => {
    if (!user) return;
    if (user.solvedPuzzles.includes(puzzleId)) return; // Already solved

    const isDaily = puzzleId === dailyChallengeId;
    const today = new Date();
    const dateString = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
    const alreadyDoneDaily = user.dailyChallengeCompleted === dateString;
    
    // Bonus points for daily challenge (2x points)
    const finalPoints = (isDaily && !alreadyDoneDaily) ? points * DAILY_CHALLENGE_MULTIPLIER : points;

    let newStreak = user.streak || 0;
    if (isDaily && !alreadyDoneDaily) {
      if (user.dailyChallengeCompleted) {
        // Strip time to calculate absolute day difference properly
        const todayNoTime = new Date(today.getFullYear(), today.getMonth(), today.getDate());
        const lastParts = user.dailyChallengeCompleted.split('-').map(Number);
        // month is 0-indexed in JS dates
        const lastDateNoTime = new Date(lastParts[0], lastParts[1] - 1, lastParts[2]);

        const diffTime = todayNoTime.getTime() - lastDateNoTime.getTime();
        const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays === 1) {
          newStreak += 1;
        } else {
          newStreak = 1; // Missed a day, reset to 1
        }
      } else {
        newStreak = 1; // First completion
      }
    }

    const updatedUser = {
      ...user,
      score: user.score + finalPoints,
      rank: getRank(user.score + finalPoints),
      solvedPuzzles: [...user.solvedPuzzles, puzzleId],
      dailyChallengeCompleted: isDaily ? dateString : user.dailyChallengeCompleted,
      streak: newStreak
    };
    
    localStorage.setItem('spy_user', JSON.stringify(updatedUser));
    setUser(updatedUser);
  };

  const completeTutorial = () => {
    if (!user) return;
    const updatedUser = { ...user, tutorialCompleted: true };
    localStorage.setItem('spy_user', JSON.stringify(updatedUser));
    setUser(updatedUser);
  };

  if (!user) {
    return <Onboarding onLogin={handleLogin} />;
  }

  if (user.tutorialCompleted === false) {
    return <Tutorial onComplete={completeTutorial} />;
  }

  const filteredPuzzles = activeCategory === 'ALL_DATA_FILES' 
    ? puzzles 
    : puzzles.filter(p => p.category === activeCategory);

  const missionOrder = (missionId: string) => Number(missionId.split('_').pop()) || Number.MAX_SAFE_INTEGER;

  const sortedPuzzles = [...filteredPuzzles].sort((a, b) => {
    const diffOrder = { 'EASY': 1, 'MEDIUM': 2, 'HARD': 3, 'ELITE': 4 };
    const aSolved = user?.solvedPuzzles.includes(a.id);
    const bSolved = user?.solvedPuzzles.includes(b.id);

    if (sortBy === 'DIFFICULTY') {
      const byDifficulty = diffOrder[a.difficulty] - diffOrder[b.difficulty];
      if (byDifficulty !== 0) return byDifficulty;
      return missionOrder(a.id) - missionOrder(b.id);
    }
    if (sortBy === 'POINTS') {
      const byPoints = b.points - a.points;
      if (byPoints !== 0) return byPoints;
      return missionOrder(a.id) - missionOrder(b.id);
    }
    if (sortBy === 'TITLE') {
      const byTitle = a.title.localeCompare(b.title);
      if (byTitle !== 0) return byTitle;
      return missionOrder(a.id) - missionOrder(b.id);
    }
    if (sortBy === 'STATUS') {
      if (aSolved !== bSolved) return aSolved ? 1 : -1;
      const byDifficulty = diffOrder[a.difficulty] - diffOrder[b.difficulty];
      if (byDifficulty !== 0) return byDifficulty;
      return missionOrder(a.id) - missionOrder(b.id);
    }
    return missionOrder(a.id) - missionOrder(b.id);
  });

  const visiblePuzzles = sortedPuzzles.slice(0, visibleCount);

  const curatedPool = [...puzzles].sort((a, b) => missionOrder(a.id) - missionOrder(b.id));

  const categoryCounts = curatedPool.reduce((acc, p) => {
    acc[p.category] = (acc[p.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="min-h-screen bg-[#050505] text-[#f5f5f5] font-sans selection:bg-[#3b82f6] selection:text-white overflow-hidden flex flex-col relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#3b82f6]/5 via-[#050505] to-[#050505] pointer-events-none z-0"></div>
      
      {/* Header */}
      <header className="sticky top-0 border-b border-white/5 p-3 md:p-4 flex justify-between items-center bg-[#050505]/80 backdrop-blur-xl z-50">
        <div className="flex items-center gap-3 md:gap-4">
          <div className="p-1.5 md:p-2 border border-[#3b82f6]/20 rounded-xl bg-gradient-to-b from-[#3b82f6]/20 to-transparent shadow-[0_0_15px_rgba(59,130,246,0.15)]">
            <Shield className="w-5 h-5 md:w-6 md:h-6 text-[#3b82f6]" />
          </div>
          <div>
            <h1 className="text-[10px] md:text-sm font-bold tracking-widest text-white font-sans uppercase">INTELLIGENCE_AUTHORITY</h1>
            <p className="text-[8px] md:text-[10px] text-[#3b82f6] tracking-widest mt-0.5 font-mono uppercase">ESTABLISHED_SECURE_TUNNEL // 0xAF92</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3 md:gap-6">
          <div className="hidden md:flex items-center gap-2 bg-[#111] border border-white/5 rounded-xl px-3 py-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#10b981]" />
            <span className="text-[10px] font-bold font-mono text-[#10b981] tracking-widest">{user.solvedPuzzles.length}<span className="text-[#555]">/{puzzles.length}</span></span>
          </div>
          <div className="text-right hidden sm:block">
            <p className="text-xs font-bold text-white tracking-widest">{user.username}</p>
            <p className="text-[10px] text-[#3b82f6] tracking-widest mt-0.5 uppercase font-mono">{user.rank} // CL_01</p>
          </div>
          <button onClick={handleLogout} className="text-[#a3a3a3] hover:text-[#ef4444] transition-colors bg-[#111] p-2 rounded-xl border border-white/5 hover:border-[#ef4444]/50">
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Tabs - Hidden on Mobile, replaced by Bottom Nav */}
      <div className="hidden md:block bg-transparent px-4 md:px-8 py-4 z-20 relative">
        <div className="flex bg-[#111]/80 backdrop-blur-md border border-white/5 rounded-xl p-1 max-w-md shadow-lg">
          <button 
            className={`flex-1 px-4 py-2 text-xs font-bold tracking-widest rounded-lg transition-all font-mono ${view === 'dashboard' ? 'bg-[#3b82f6]/20 text-[#3b82f6] shadow-sm' : 'text-[#a3a3a3] hover:text-white hover:bg-white/5'}`}
            onClick={() => { setView('dashboard'); setActivePuzzle(null); }}
          >
            OPERATIONAL_THEATRE
          </button>
          <button
            className={`flex-1 px-4 py-2 text-xs font-bold tracking-widest rounded-lg transition-all font-mono ${view === 'leaderboard' ? 'bg-[#eab308]/20 text-[#eab308] shadow-sm' : 'text-[#a3a3a3] hover:text-white hover:bg-white/5'}`}
            onClick={() => { setView('leaderboard'); setActivePuzzle(null); }}
          >
            LEADERBOARD
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto relative z-10 p-4 md:p-8 pb-24 md:pb-8">
        <AnimatePresence mode="wait">
          {view === 'dashboard' ? (
            <motion.div 
              key="dashboard"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-6xl mx-auto space-y-8"
            >
              {/* User Profile Card */}
              <div className="bg-[#111] border border-white/5 rounded-3xl p-8 flex flex-col items-center gap-8 shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#3b82f6]/5 rounded-full blur-3xl -z-10 translate-x-1/2 -translate-y-1/2"></div>
                
                <div className="flex flex-col items-center z-10">
                  <div className="w-24 h-24 bg-[#1a1a1a] rounded-2xl border border-white/10 flex items-center justify-center mb-4 relative shadow-inner">
                    <UserIcon className="w-12 h-12 text-[#444]" />
                    <div className="absolute -bottom-2 bg-[#3b82f6] text-white text-[9px] font-bold px-3 py-1 rounded-full tracking-widest font-mono shadow-md uppercase">
                      ACCESS_LEVEL_1
                    </div>
                  </div>
                </div>
                
                <div className="w-full grid grid-cols-2 gap-8 z-10 text-center md:text-left">
                  <div className="flex flex-col items-center md:items-start">
                    <p className="text-[10px] text-[#a3a3a3] tracking-widest mb-1 font-mono uppercase">OPERATIVE_IDENTIFIER</p>
                    <p className="text-xl font-bold tracking-widest text-white uppercase">{user.username}</p>
                  </div>
                  <div className="flex flex-col items-center md:items-start">
                    <p className="text-[10px] text-[#a3a3a3] tracking-widest mb-1 font-mono uppercase">CLEARANCE_CLASSIFICATION</p>
                    <p className="text-xl font-bold tracking-widest text-[#3b82f6] uppercase">{user.rank}</p>
                  </div>
                  <div className="flex flex-col items-center md:items-start">
                    <p className="text-[10px] text-[#a3a3a3] tracking-widest mb-1 font-mono uppercase">UPLINK_STATUS</p>
                    <p className="text-sm font-bold tracking-widest text-white uppercase">ACTIVE_DEPLOYMENT</p>
                  </div>
                  <div className="flex flex-col items-center md:items-start">
                    <p className="text-[10px] text-[#a3a3a3] tracking-widest mb-1 font-mono uppercase">CURRENT_INTELLIGENCE_YIELD</p>
                    <p className="text-xl font-bold tracking-widest text-[#10b981]">{user.score}</p>
                  </div>
                  <div className="flex flex-col items-center md:items-start col-span-2 md:col-span-1">
                    <p className="text-[10px] text-[#a3a3a3] tracking-widest mb-1 font-mono uppercase">ACTIVE_STREAK</p>
                    <p className="text-xl font-bold tracking-widest text-amber-500 flex items-center gap-1">
                      <Zap className="w-5 h-5" /> {user.streak || 0} DAYS
                    </p>
                  </div>
                </div>
                
                <button 
                  onClick={handleShare}
                  className="w-full flex items-center justify-center gap-2 px-5 py-4 bg-[#3b82f6]/10 hover:bg-[#3b82f6]/20 text-[#3b82f6] border border-[#3b82f6]/30 rounded-xl transition-colors text-[10px] font-bold tracking-widest font-mono uppercase"
                >
                  <Share2 className="w-4 h-4" /> SHARE PROGRESS
                </button>

                {/* Next Rank Progress */}
                {(() => {
                  const nextRank = RANKS.find(r => r.threshold > user.score);
                  const currentRankData = [...RANKS].reverse().find(r => r.threshold <= user.score) || RANKS[0];
                  if (!nextRank) return (
                    <div className="w-full mt-4 p-3 bg-[#10b981]/10 border border-[#10b981]/20 rounded-xl text-center">
                      <p className="text-[10px] font-bold text-[#10b981] tracking-widest font-mono">MAX RANK ACHIEVED — 00 STATUS</p>
                    </div>
                  );
                  const progress = Math.round(((user.score - currentRankData.threshold) / (nextRank.threshold - currentRankData.threshold)) * 100);
                  return (
                    <div className="w-full mt-4 space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-[9px] font-mono text-[#555] tracking-widest uppercase">RANK PROGRESS</span>
                        <span className="text-[9px] font-mono text-[#3b82f6] tracking-widest">{user.score} / {nextRank.threshold} → {nextRank.name}</span>
                      </div>
                      <div className="w-full h-1.5 bg-[#1a1a1a] rounded-full overflow-hidden border border-white/5">
                        <div className="h-full bg-gradient-to-r from-[#2563eb] to-[#3b82f6] rounded-full transition-all duration-500" style={{ width: `${progress}%` }}></div>
                      </div>
                    </div>
                  );
                })()}
              </div>

              {/* Daily Challenge Section */}
              <div className="bg-[#111] border border-[#10b981]/20 rounded-3xl p-8 relative overflow-hidden shadow-xl">
                <div className="absolute top-0 right-0 p-8 opacity-5">
                  <Trophy className="w-48 h-48 text-white" />
                </div>
                
                <div className="flex flex-col items-center text-center relative z-10">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="bg-[#3b82f6]/20 p-3 rounded-xl border border-[#3b82f6]/30">
                      <Zap className="w-6 h-6 text-[#3b82f6]" />
                    </div>
                    <h2 className="text-2xl font-bold tracking-widest text-white uppercase">CRITICAL_DIRECTIVE</h2>
                    <div className="bg-[#10b981]/20 px-4 py-1.5 rounded-full border border-[#10b981]/30">
                      <span className="text-[10px] font-bold text-[#10b981] tracking-widest font-mono uppercase">2X BONUS</span>
                    </div>
                  </div>
                  
                  <p className="text-[#a3a3a3] text-sm mb-8 max-w-2xl leading-relaxed">
                    Complete today's specialized mission to earn double intelligence yield and unlock exclusive Academy rewards.
                  </p>
                  
                  <div className="flex justify-center gap-12 mb-10">
                    <div className="flex items-center gap-3">
                      <Timer className="w-5 h-5 text-[#3b82f6]" />
                      <span className="text-sm font-bold font-mono text-white tracking-widest">{timeLeft}</span>
                      <span className="text-[10px] text-[#555] font-mono uppercase tracking-widest">REMAINING</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Trophy className="w-5 h-5 text-[#eab308]" />
                      <span className="text-sm font-bold font-mono text-white tracking-widest">+{puzzles.find(p => p.id === dailyChallengeId)?.points ? puzzles.find(p => p.id === dailyChallengeId)!.points * DAILY_CHALLENGE_MULTIPLIER : 0}</span>
                      <span className="text-[10px] text-[#555] font-mono uppercase tracking-widest">POTENTIAL YIELD</span>
                    </div>
                  </div>
                  
                  <button 
                    onClick={() => {
                      const puzzle = puzzles.find(p => p.id === dailyChallengeId);
                      if (puzzle) {
                        setActivePuzzle(puzzle);
                        setView('puzzle');
                      }
                    }}
                    className={`w-full py-5 rounded-xl font-bold tracking-widest text-xs transition-all flex items-center justify-center gap-3 shadow-xl ${
                      user.solvedPuzzles.includes(dailyChallengeId)
                        ? 'bg-[#10b981]/10 text-[#10b981] border border-[#10b981]/30 cursor-default'
                        : 'bg-[#3b82f6] hover:bg-[#2563eb] text-white shadow-[0_4px_20px_rgba(59,130,246,0.3)]'
                    }`}
                  >
                    {user.solvedPuzzles.includes(dailyChallengeId) ? (
                      <><CheckCircle2 className="w-5 h-5" /> COMPLETED</>
                    ) : (
                      <><Lock className="w-5 h-5" /> START MISSION</>
                    )}
                  </button>
                </div>
              </div>

              {/* Game Mode, Filters & Sorting */}
              <div className="space-y-6">
                <div>
                  <div className="flex items-center gap-4 mb-4">
                    <p className="text-[10px] text-[#3b82f6] tracking-widest uppercase font-mono">OPERATIONAL_THEATRE_REGISTRY</p>
                    <div className="h-[1px] flex-1 bg-white/5"></div>
                    <div className="flex items-center gap-1.5 bg-[#111] border border-white/5 rounded-lg px-2.5 py-1">
                      <CheckCircle2 className="w-3 h-3 text-[#10b981]" />
                      <span className="text-[9px] font-mono font-bold text-[#10b981] tracking-widest">{user.solvedPuzzles.length}</span>
                      <span className="text-[9px] font-mono text-[#555]">/ {puzzles.length} SOLVED</span>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={() => setGameMode('TRAINING')}
                      className={`flex-1 px-4 py-3 rounded-xl border transition-all flex flex-col items-center gap-1 ${gameMode === 'TRAINING' ? 'bg-[#3b82f6]/20 border-[#3b82f6]/50 text-[#3b82f6]' : 'bg-[#111] border-white/5 text-[#a3a3a3]'}`}
                    >
                      <span className="text-xs font-bold tracking-widest">TRAINING_MODE</span>
                      <span className="text-[8px] opacity-70">FREE HINTS • PRACTICE</span>
                    </button>
                    <button
                      onClick={() => setGameMode('CHALLENGE')}
                      className={`flex-1 px-4 py-3 rounded-xl border transition-all flex flex-col items-center gap-1 ${gameMode === 'CHALLENGE' ? 'bg-[#ef4444]/20 border-[#ef4444]/50 text-[#ef4444]' : 'bg-[#111] border-white/5 text-[#a3a3a3]'}`}
                    >
                      <span className="text-xs font-bold tracking-widest">CHALLENGE_MODE</span>
                      <span className="text-[8px] opacity-70">HIGH STAKES • NO HELP</span>
                    </button>
                  </div>
                  <p className="mt-3 text-[10px] text-[#737373] font-mono">Quality filter active: duplicate missions removed for cleaner progression.</p>
                </div>

                <div>
                  <div className="flex items-center gap-4 mb-4">
                    <p className="text-[10px] text-[#3b82f6] tracking-widest uppercase font-mono">CRITICAL_INTELLIGENCE_DIRECTIVES</p>
                    <div className="h-[1px] flex-1 bg-white/5"></div>
                  </div>
                  
                  <div className="flex flex-wrap gap-3">
                    <button
                      onClick={() => setActiveCategory('ALL_DATA_FILES')}
                      className={`px-4 py-2 text-[10px] font-bold tracking-widest rounded-lg border transition-all font-mono ${activeCategory === 'ALL_DATA_FILES' ? 'bg-[#3b82f6]/20 text-[#3b82f6] border-[#3b82f6]/50 shadow-[0_0_10px_rgba(59,130,246,0.1)]' : 'bg-[#111] text-[#a3a3a3] border-white/5 hover:border-white/20 hover:text-white'}`}
                    >
                      [ GLOBAL_ASSET_REGISTRY // {curatedPool.length} ]
                    </button>
                    {Object.entries(categoryCounts).map(([cat, count]) => (
                      <button
                        key={cat}
                        onClick={() => setActiveCategory(cat as Category)}
                        className={`px-4 py-2 text-[10px] font-bold tracking-widest rounded-lg border transition-all font-mono ${activeCategory === cat ? 'bg-[#3b82f6]/20 text-[#3b82f6] border-[#3b82f6]/50 shadow-[0_0_10px_rgba(59,130,246,0.1)]' : 'bg-[#111] text-[#a3a3a3] border-white/5 hover:border-white/20 hover:text-white'}`}
                      >
                        [ {formatDisplayName(cat)} // {count} ]
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-4 mb-4">
                    <p className="text-[10px] text-[#3b82f6] tracking-widest uppercase font-mono">DATA_INTEGRITY_SORT</p>
                    <div className="h-[1px] flex-1 bg-white/5"></div>
                  </div>
                  
                  <div className="flex flex-wrap gap-3">
                    {[
                      { id: 'DIFFICULTY', label: 'DIFFICULTY' },
                      { id: 'POINTS', label: 'POINTS' },
                      { id: 'TITLE', label: 'NAME' },
                      { id: 'STATUS', label: 'SOLVED STATUS' }
                    ].map((sort) => (
                      <button
                        key={sort.id}
                        onClick={() => setSortBy(sort.id as any)}
                        className={`px-4 py-2 text-[10px] font-bold tracking-widest rounded-lg border transition-all font-mono ${sortBy === sort.id ? 'bg-[#10b981]/20 text-[#10b981] border-[#10b981]/50 shadow-[0_0_10px_rgba(16,185,129,0.1)]' : 'bg-[#111] text-[#a3a3a3] border-white/5 hover:border-white/20 hover:text-white'}`}
                      >
                        {sort.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Puzzle Grid */}
              <div className="flex flex-col gap-6">
                {visiblePuzzles.length === 0 && (
                  <div className="flex flex-col items-center justify-center py-20 gap-4 text-center">
                    <div className="w-16 h-16 rounded-2xl bg-[#111] border border-white/5 flex items-center justify-center opacity-40">
                      <FileText className="w-8 h-8 text-[#555]" />
                    </div>
                    <p className="text-sm font-bold tracking-widest text-[#555] font-mono uppercase">NO MISSIONS IN THIS CATEGORY</p>
                    <button onClick={() => setActiveCategory('ALL_DATA_FILES')} className="text-[10px] text-[#3b82f6] font-mono tracking-widest hover:underline">VIEW ALL MISSIONS</button>
                  </div>
                )}
                {visiblePuzzles.map((puzzle) => {
                  const isSolved = user.solvedPuzzles.includes(puzzle.id);
                  const isLocked = user.score < DIFFICULTY_THRESHOLDS[puzzle.difficulty] && !isSolved;
                  const difficultyColor = puzzle.difficulty === 'EASY' ? 'text-[#10b981] border-[#10b981]/30' :
                                          puzzle.difficulty === 'MEDIUM' ? 'text-[#eab308] border-[#eab308]/30' :
                                          'text-[#ef4444] border-[#ef4444]/30';
                  const isRecommended = !isSolved && !isLocked && user?.specialization &&
                    SPEC_CATEGORY_MAP[user.specialization]?.includes(puzzle.category);

                  return (
                    <motion.div
                      key={puzzle.id}
                      whileHover={!isLocked ? { scale: 1.01, x: 4 } : {}}
                      className={`bg-[#111] border ${isSolved ? 'border-[#10b981]/30' : isLocked ? 'border-white/5 opacity-75' : isRecommended ? 'border-[#a855f7]/30' : 'border-white/10'} rounded-3xl p-4 md:p-8 flex gap-4 md:gap-8 relative overflow-hidden group transition-all duration-300 ${isLocked ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                      onClick={() => { if (!isLocked) { setActivePuzzle(puzzle); setView('puzzle'); } }}
                    >
                      {puzzle.id === dailyChallengeId && (
                        <div className="absolute top-0 left-0 bg-gradient-to-r from-[#3b82f6] to-[#10b981] px-4 py-1.5 rounded-br-2xl z-20 shadow-lg">
                          <div className="flex items-center gap-2">
                            <Zap className="w-4 h-4 text-white" />
                            <span className="text-[10px] font-bold text-white tracking-widest font-mono uppercase">Daily Bonus</span>
                          </div>
                        </div>
                      )}
                      {isRecommended && puzzle.id !== dailyChallengeId && (
                        <div className="absolute top-0 left-0 bg-gradient-to-r from-[#7c3aed] to-[#a855f7] px-4 py-1.5 rounded-br-2xl z-20 shadow-lg">
                          <div className="flex items-center gap-2">
                            <Star className="w-3.5 h-3.5 text-white" />
                            <span className="text-[10px] font-bold text-white tracking-widest font-mono uppercase">RECOMMENDED</span>
                          </div>
                        </div>
                      )}
                      
                      {/* Left Icon Box */}
                      <div className="flex-shrink-0">
                        <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${isSolved ? 'bg-[#10b981]/10 border border-[#10b981]/30' : 'bg-[#3b82f6]/10 border border-[#3b82f6]/30'}`}>
                          {isSolved ? <Unlock className="w-8 h-8 text-[#10b981]" /> : <Lock className="w-8 h-8 text-[#3b82f6]" />}
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start mb-4">
                          <h3 className="text-2xl font-bold text-white tracking-wide uppercase truncate pr-4">{puzzle.title}</h3>
                          <div className="flex gap-3">
                            <div className="text-right">
                              <p className="text-[8px] text-[#a3a3a3] tracking-widest mb-1 font-mono uppercase">YIELD</p>
                              <span className="text-[10px] font-bold tracking-widest px-3 py-1 rounded-lg border text-[#10b981] border-[#10b981]/30 font-mono uppercase">
                                +{puzzle.id === dailyChallengeId ? puzzle.points * DAILY_CHALLENGE_MULTIPLIER : puzzle.points}
                              </span>
                            </div>
                            <div className="text-right">
                              <p className="text-[8px] text-[#a3a3a3] tracking-widest mb-1 font-mono uppercase">DIFFICULTY</p>
                              <span className={`text-[10px] font-bold tracking-widest px-3 py-1 rounded-lg border ${difficultyColor} font-mono uppercase`}>
                                {puzzle.difficulty}
                              </span>
                            </div>
                            {puzzle.imageUrl && (
                              <div className="text-right">
                                <p className="text-[8px] text-[#a3a3a3] tracking-widest mb-1 font-mono uppercase">ATTACHMENT</p>
                                <div className="flex items-center gap-2 text-[#3b82f6] bg-[#3b82f6]/10 px-3 py-1 rounded-lg border border-[#3b82f6]/30">
                                  <ImageIcon className="w-3.5 h-3.5" />
                                  <span className="text-[10px] font-bold tracking-widest font-mono uppercase">IMAGE</span>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>

                        <p className="text-[#a3a3a3] text-base leading-relaxed mb-8 line-clamp-3">{getBriefingPreview(puzzle.description)}</p>

                        <div className="flex justify-between items-center pt-6 border-t border-white/5">
                          <div>
                            <p className="text-[8px] text-[#a3a3a3] tracking-widest mb-1 font-mono uppercase">MISSION ID</p>
                            <p className="text-xs text-[#d4d4d4] tracking-widest font-mono uppercase">{puzzle.id}</p>
                          </div>
                          <div 
                            className={`text-sm font-bold tracking-widest flex items-center gap-2 transition-colors font-mono uppercase ${isSolved ? 'text-[#10b981]' : 'text-[#3b82f6]'}`}
                          >
                            {isSolved ? 'REVIEW MISSION' : 'SOLVE'} <ChevronRight className="w-5 h-5" />
                          </div>
                        </div>
                      </div>

                      {isLocked && (
                        <div className="absolute inset-0 bg-[#050505]/90 backdrop-blur-md z-30 flex flex-col items-center justify-center rounded-3xl border border-white/5">
                          <Lock className="w-10 h-10 text-[#444] mb-4" />
                          <p className="text-sm font-bold tracking-widest text-[#737373] font-mono uppercase">CLASSIFIED_FILE</p>
                          <p className="text-[10px] text-[#555] tracking-widest mt-2 font-mono uppercase">REQUIRES {DIFFICULTY_THRESHOLDS[puzzle.difficulty]} YIELD</p>
                        </div>
                      )}
                    </motion.div>
                  );
                })}
              </div>

              {visibleCount < sortedPuzzles.length && (
                <div className="flex justify-center mt-12 mb-8">
                  <button 
                    onClick={() => setVisibleCount(prev => prev + 12)}
                    className="px-8 py-4 bg-[#111] border border-white/10 hover:border-[#3b82f6]/50 text-[#a3a3a3] hover:text-white rounded-2xl text-xs font-bold tracking-widest transition-all flex items-center gap-3 hover:shadow-[0_0_20px_rgba(59,130,246,0.15)] font-mono"
                  >
                    <ChevronDown className="w-4 h-4" /> SHOW MORE MISSIONS
                  </button>
                </div>
              )}
            </motion.div>
          ) : view === 'leaderboard' ? (
            <motion.div
              key="leaderboard"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-3xl mx-auto"
            >
              <Leaderboard user={user} />
            </motion.div>
          ) : activePuzzle ? (
            <motion.div 
              key="puzzle"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="max-w-4xl mx-auto"
            >
              <button 
                onClick={() => setView('dashboard')}
                className="flex items-center gap-2 text-[#a3a3a3] hover:text-white text-xs font-bold tracking-widest mb-8 transition-colors font-mono"
              >
                <ArrowLeft className="w-4 h-4" /> BACK TO MISSIONS
              </button>

              <div className="bg-[#111] border border-white/10 rounded-3xl p-8 md:p-12 relative overflow-hidden shadow-2xl">
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#3b82f6]/5 rounded-full blur-3xl -z-10 translate-x-1/2 -translate-y-1/2"></div>
                
                {/* Header */}
                <div className="flex justify-between items-center mb-8 border-b border-white/5 pb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-[#3b82f6] shadow-[0_0_10px_rgba(59,130,246,0.8)]"></div>
                    <span className="text-[10px] text-[#a3a3a3] font-bold tracking-widest uppercase font-mono">MISSION ID <span className="mx-2">|</span> {activePuzzle.id}</span>
                  </div>
                  <span className="text-[10px] text-[#ef4444] font-bold tracking-widest font-mono bg-[#ef4444]/10 px-3 py-1 rounded-full border border-[#ef4444]/20">[{activePuzzle.difficulty} DIFFICULTY]</span>
                </div>

                <div className="flex flex-col md:flex-row justify-between items-start mb-10 gap-6">
                  <h2 className="text-3xl md:text-4xl font-black text-white font-sans tracking-tight">{activePuzzle.title}</h2>
                  {gameMode === 'TRAINING' && <HintButton hint={activePuzzle.hint} />}
                </div>

                <div className="mb-12">
                  <p className="text-xs text-[#3b82f6] font-bold tracking-widest font-mono mb-4">{'>'} INTELLIGENCE BRIEFING DOSSIER</p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {parseMissionSections(activePuzzle.description)
                      .filter((section) => {
                        const isSolved = user.solvedPuzzles.includes(activePuzzle.id);
                        if (isSolved) return true;
                        return !section.title.includes('6. THE SOLUTION') && !section.title.includes('7. METHODOLOGY');
                      })
                      .map((section) => (
                        <MissionSectionCard key={section.title} section={section} />
                      ))}
                  </div>

                  {!user.solvedPuzzles.includes(activePuzzle.id) && (
                    <div className="mt-4 flex items-center gap-2 bg-[#111] border border-white/5 p-4 rounded-xl">
                      <Lock className="w-4 h-4 text-[#737373]" />
                      <p className="text-[11px] text-[#737373] font-mono tracking-wide">
                        Solution and methodology classified until mission completion.
                      </p>
                    </div>
                  )}
                  {activePuzzle.imageUrl && (
                    <div className="mt-6 rounded-xl overflow-hidden border border-white/10 shadow-lg">
                      <img 
                        src={activePuzzle.imageUrl} 
                        alt="Mission Briefing Attachment" 
                        className="w-full h-auto object-cover max-h-[400px]"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  )}
                </div>

                <PuzzleSolver 
                  key={activePuzzle.id}
                  puzzle={activePuzzle} 
                  isSolved={user.solvedPuzzles.includes(activePuzzle.id)}
                  onSolved={(points) => handleSolve(activePuzzle.id, points)} 
                />

                {/* Next Mission CTA */}
                {user.solvedPuzzles.includes(activePuzzle.id) && (() => {
                  const nextMission = sortedPuzzles.find(p => !user.solvedPuzzles.includes(p.id) && user.score >= DIFFICULTY_THRESHOLDS[p.difficulty]);
                  return nextMission ? (
                    <motion.div
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="mt-6 flex items-center justify-between bg-[#10b981]/5 border border-[#10b981]/20 rounded-xl p-5"
                    >
                      <div>
                        <p className="text-[9px] font-mono font-bold tracking-widest text-[#10b981] uppercase mb-1">NEXT MISSION READY</p>
                        <p className="text-sm font-bold text-white truncate max-w-[200px]">{nextMission.title}</p>
                      </div>
                      <button
                        onClick={() => setActivePuzzle(nextMission)}
                        className="flex items-center gap-2 px-5 py-3 bg-[#10b981] hover:bg-[#059669] text-white rounded-xl text-xs font-bold tracking-widest transition-all font-mono shadow-[0_4px_15px_rgba(16,185,129,0.3)] hover:shadow-[0_4px_20px_rgba(16,185,129,0.5)] shrink-0"
                      >
                        ADVANCE <ChevronRight className="w-4 h-4" />
                      </button>
                    </motion.div>
                  ) : null;
                })()}

                {/* Footer Progress */}
                <div className="mt-12 pt-6 border-t border-white/5 flex justify-between items-center text-[9px] font-bold tracking-widest font-mono">
                  <span className="text-[#10b981]">DISK_WRITE: OK</span>
                  <span className="text-[#3b82f6]">0X4F92_ACCESS_GRANTED</span>
                  <span className="text-[#a3a3a3]">KERNEL_V4.0.2_STABLE</span>
                </div>
                <div className="w-full h-1 bg-[#222] mt-3 flex rounded-full overflow-hidden">
                  <div className="h-full bg-[#3b82f6] w-2/3"></div>
                  <div className="h-full bg-[#10b981] w-1/6"></div>
                </div>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </main>

      {/* Bottom Navigation for Mobile */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-[#0a0a0a]/90 backdrop-blur-xl border-t border-white/10 px-6 py-3 pb-safe flex justify-around items-center z-[60] shadow-[0_-10px_30px_rgba(0,0,0,0.5)]">
        <button 
          onClick={() => { setView('dashboard'); setActivePuzzle(null); }}
          className={`flex flex-col items-center gap-1 transition-all ${view === 'dashboard' ? 'text-[#3b82f6]' : 'text-[#555]'}`}
        >
          <Briefcase className="w-6 h-6" />
          <span className="text-[9px] font-bold tracking-widest font-mono">MISSIONS</span>
        </button>
        <div className="flex flex-col items-center gap-1 text-[#333] relative">
          <Map className="w-6 h-6" />
          <span className="text-[9px] font-bold tracking-widest font-mono">MAP</span>
          <span className="absolute -top-1 -right-2 text-[7px] font-bold font-mono text-[#eab308] bg-[#eab308]/10 border border-[#eab308]/20 px-1 rounded">SOON</span>
        </div>
        <button
          onClick={() => { setView('leaderboard'); setActivePuzzle(null); }}
          className={`flex flex-col items-center gap-1 transition-all ${view === 'leaderboard' ? 'text-[#eab308]' : 'text-[#555]'}`}
        >
          <Trophy className="w-6 h-6" />
          <span className="text-[9px] font-bold tracking-widest font-mono">RANKINGS</span>
        </button>
      </div>

      <AnimatePresence>
      </AnimatePresence>
    </div>
  );
}

function SolverStatusBadge({ status }: { status: 'idle' | 'checking' | 'correct' | 'incorrect' }) {
  const isCorrect = status === 'correct';
  const isChecking = status === 'checking';
  return (
    <div className={`flex items-center gap-2 px-3 py-1.5 rounded-md border ${isCorrect ? 'bg-[#10b981]/10 border-[#10b981]/30' : 'bg-[#3b82f6]/10 border-[#3b82f6]/30'}`}>
      <span className={`text-[9px] font-bold tracking-widest font-mono ${isCorrect ? 'text-[#10b981]' : 'text-[#3b82f6]'}`}>
        {isCorrect ? 'SOLVED' : isChecking ? 'VERIFYING' : 'READY'}
      </span>
      <Cpu className={`w-3 h-3 ${isCorrect ? 'text-[#10b981]' : 'text-[#3b82f6]'}`} />
    </div>
  );
}

function SuccessBanner({ message, points }: { message: string; points: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="mb-6 flex items-center justify-between gap-3 bg-[#10b981]/10 border border-[#10b981]/30 px-5 py-4 rounded-xl"
    >
      <div className="flex items-center gap-3">
        <CheckCircle2 className="w-5 h-5 text-[#10b981] shrink-0" />
        <span className="text-xs font-bold tracking-widest text-[#10b981] font-mono uppercase">{message}</span>
      </div>
      <span className="text-sm font-black font-mono text-[#10b981]">+{points} pts</span>
    </motion.div>
  );
}

function EmojiCryptoSolver({ puzzle, isSolved, onSolved }: { puzzle: Puzzle, isSolved: boolean, onSolved: (points: number) => void }) {
  const [answer, setAnswer] = useState('');
  const [status, setStatus] = useState<'idle' | 'checking' | 'correct' | 'incorrect'>(isSolved ? 'correct' : 'idle');
  const [justSolved, setJustSolved] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSolved) return;

    setStatus('checking');
    setTimeout(() => {
      if (answer.trim().toUpperCase() === puzzle.answer.toUpperCase()) {
        setStatus('correct');
        setJustSolved(true);
        onSolved(puzzle.points);
      } else {
        setStatus('incorrect');
        setTimeout(() => setStatus('idle'), 2000);
      }
    }, 800);
  };

  return (
    <div className="bg-[#050505] border border-white/10 rounded-2xl p-6 md:p-8 relative shadow-inner">
      <AnimatePresence>
        {justSolved && <SuccessBanner message="DECRYPTION SUCCESSFUL" points={puzzle.points} />}
      </AnimatePresence>
      <div className="flex justify-between items-center mb-6">
        <span className="text-[10px] text-[#a3a3a3] font-bold tracking-widest font-mono uppercase">EMOJI DECRYPTION PROTOCOL</span>
        <SolverStatusBadge status={status} />
      </div>

      <div className="mb-8 p-6 bg-[#111] border border-white/5 rounded-xl text-center">
        <p className="text-4xl md:text-6xl mb-2">{puzzle.observationData}</p>
        <p className="text-[10px] text-[#737373] tracking-widest font-mono uppercase mt-4">INTERCEPTED FRAGMENT</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="relative">
          <input
            type="text"
            value={isSolved ? puzzle.answer : answer}
            onChange={(e) => setAnswer(e.target.value)}
            disabled={isSolved || status === 'checking'}
            className={`w-full bg-[#111] border-2 ${status === 'incorrect' ? 'border-[#ef4444] text-[#ef4444]' : status === 'correct' ? 'border-[#10b981] text-[#10b981]' : 'border-white/10 focus:border-[#3b82f6] text-white'} rounded-xl p-5 text-center text-xl md:text-2xl font-bold tracking-[0.2em] focus:outline-none focus:ring-4 focus:ring-[#3b82f6]/20 transition-all disabled:opacity-50 font-mono shadow-inner`}
            placeholder={isSolved ? "" : "TRANSLATE EMOJIS HERE..."}
          />
          {status === 'incorrect' && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute -bottom-8 left-0 right-0 text-center text-[10px] text-[#ef4444] tracking-widest font-bold font-mono uppercase"
            >
              INCORRECT TRANSLATION. TRY AGAIN!
            </motion.div>
          )}
        </div>

        <button
          type="submit"
          disabled={isSolved || status === 'checking' || !answer.trim()}
          className={`w-full py-4 rounded-xl font-bold tracking-widest text-xs flex items-center justify-center gap-3 transition-all font-mono ${
            isSolved
              ? 'bg-[#10b981]/10 text-[#10b981] border border-[#10b981]/30 cursor-default'
              : status === 'checking'
                ? 'bg-[#3b82f6]/30 text-white cursor-wait border border-[#3b82f6]/50'
                : 'bg-gradient-to-r from-[#2563eb] to-[#3b82f6] hover:from-[#1d4ed8] hover:to-[#2563eb] text-white shadow-[0_4px_20px_rgba(59,130,246,0.4)] hover:shadow-[0_4px_25px_rgba(59,130,246,0.6)]'
          }`}
        >
          {isSolved ? (
            <><CheckCircle2 className="w-5 h-5" /> DECRYPTION COMPLETE</>
          ) : status === 'checking' ? (
            <><RefreshCw className="w-5 h-5 animate-spin" /> VERIFYING...</>
          ) : (
            <><Shield className="w-5 h-5" /> SUBMIT DECRYPTION</>
          )}
        </button>
      </form>
    </div>
  );
}

function ObservationSolver({ puzzle, isSolved, onSolved }: { puzzle: Puzzle, isSolved: boolean, onSolved: (points: number) => void }) {
  const [phase, setPhase] = useState<'READY' | 'VIEWING' | 'ANSWERING'>(isSolved ? 'ANSWERING' : 'READY');
  const [timeLeft, setTimeLeft] = useState(10);
  const [answer, setAnswer] = useState('');
  const [status, setStatus] = useState<'idle' | 'checking' | 'correct' | 'incorrect'>(isSolved ? 'correct' : 'idle');

  useEffect(() => {
    if (phase === 'VIEWING' && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(prev => prev - 1), 1000);
      return () => clearTimeout(timer);
    } else if (phase === 'VIEWING' && timeLeft === 0) {
      setPhase('ANSWERING');
    }
  }, [phase, timeLeft]);

  const startViewing = () => {
    setPhase('VIEWING');
    setTimeLeft(10);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSolved) return;

    setStatus('checking');
    setTimeout(() => {
      if (answer.trim().toUpperCase() === puzzle.answer.toUpperCase()) {
        setStatus('correct');
        onSolved(puzzle.points);
      } else {
        setStatus('incorrect');
        setTimeout(() => setStatus('idle'), 2000);
      }
    }, 800);
  };

  return (
    <div className="bg-[#050505] border border-white/10 rounded-2xl p-6 md:p-8 relative shadow-inner">
      <div className="flex justify-between items-center mb-6">
        <span className="text-[10px] text-[#a3a3a3] font-bold tracking-widest font-mono uppercase">INTELLIGENCE DEBRIEF</span>
        <div className="flex items-center gap-2 bg-[#3b82f6]/10 px-3 py-1.5 rounded-md border border-[#3b82f6]/30">
          <span className="text-[9px] text-[#3b82f6] font-bold tracking-widest font-mono">
            {phase === 'READY' ? 'READY' : phase === 'VIEWING' ? 'RECORDING' : 'ANALYSIS'}
          </span>
          <Activity className={`w-3 h-3 text-[#3b82f6] ${phase === 'VIEWING' ? 'animate-pulse text-[#ef4444]' : ''}`} />
        </div>
      </div>

      <AnimatePresence mode="wait">
        {phase === 'READY' && !isSolved && (
          <motion.div key="ready" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center py-8">
            <ScanLine className="w-16 h-16 text-[#3b82f6] mx-auto mb-6 opacity-50" />
            <p className="text-white mb-6">You will have exactly 10 seconds to memorize the suspect profile. Once the time is up, the data will be permanently wiped from your terminal.</p>
            <button
              onClick={startViewing}
              className="px-8 py-4 bg-gradient-to-r from-[#2563eb] to-[#3b82f6] hover:from-[#1d4ed8] hover:to-[#2563eb] text-white rounded-xl font-bold tracking-widest text-xs flex items-center justify-center gap-3 mx-auto shadow-[0_4px_20px_rgba(59,130,246,0.4)] transition-all font-mono"
            >
              <Eye className="w-5 h-5" /> INITIATE DEBRIEF
            </button>
          </motion.div>
        )}

        {phase === 'VIEWING' && !isSolved && (
          <motion.div key="viewing" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="text-center">
            <div className="flex justify-center items-center gap-4 mb-6">
              <Timer className="w-6 h-6 text-[#ef4444] animate-pulse" />
              <span className="text-3xl font-black text-[#ef4444] font-mono tracking-widest">00:{timeLeft.toString().padStart(2, '0')}</span>
            </div>
            <div className="bg-[#111] border border-white/20 rounded-xl p-8 shadow-inner relative overflow-hidden">
              {/* Scanline effect */}
              <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px] pointer-events-none z-10 opacity-20"></div>

              <pre className="text-[#10b981] font-mono text-left whitespace-pre-wrap text-lg md:text-xl leading-relaxed relative z-20">
                {puzzle.observationData}
              </pre>
            </div>
          </motion.div>
        )}

        {(phase === 'ANSWERING' || isSolved) && (
          <motion.div key="answering" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            {!isSolved && (
               <div className="bg-[#ef4444]/10 border border-[#ef4444]/30 text-[#ef4444] px-4 py-3 rounded-xl flex items-center justify-center gap-3 mb-8">
                 <AlertTriangle className="w-5 h-5" />
                 <span className="text-xs font-bold tracking-widest font-mono uppercase">DATA PURGED FROM LOCAL MEMORY</span>
               </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="relative">
                <input
                  type="text"
                  value={isSolved ? puzzle.answer : answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  disabled={isSolved || status === 'checking'}
                  className={`w-full bg-[#111] border-2 ${status === 'incorrect' ? 'border-[#ef4444] text-[#ef4444]' : status === 'correct' ? 'border-[#10b981] text-[#10b981]' : 'border-white/10 focus:border-[#3b82f6] text-white'} rounded-xl p-5 text-center text-xl md:text-2xl font-bold tracking-[0.2em] focus:outline-none focus:ring-4 focus:ring-[#3b82f6]/20 transition-all disabled:opacity-50 font-mono shadow-inner`}
                  placeholder={isSolved ? "" : "TYPE ANSWER HERE..."}
                />
                {status === 'incorrect' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute -bottom-8 left-0 right-0 text-center text-[10px] text-[#ef4444] tracking-widest font-bold font-mono uppercase"
                  >
                    INCORRECT INTELLIGENCE. RE-EVALUATE!
                  </motion.div>
                )}
              </div>

              <button
                type="submit"
                disabled={isSolved || status === 'checking' || !answer.trim()}
                className={`w-full py-4 rounded-xl font-bold tracking-widest text-xs flex items-center justify-center gap-3 transition-all font-mono ${
                  isSolved
                    ? 'bg-[#10b981]/10 text-[#10b981] border border-[#10b981]/30 cursor-default'
                    : status === 'checking'
                      ? 'bg-[#3b82f6]/30 text-white cursor-wait border border-[#3b82f6]/50'
                      : 'bg-gradient-to-r from-[#2563eb] to-[#3b82f6] hover:from-[#1d4ed8] hover:to-[#2563eb] text-white shadow-[0_4px_20px_rgba(59,130,246,0.4)] hover:shadow-[0_4px_25px_rgba(59,130,246,0.6)]'
                }`}
              >
                {isSolved ? (
                  <><CheckCircle2 className="w-5 h-5" /> REPORT FILED</>
                ) : status === 'checking' ? (
                  <><RefreshCw className="w-5 h-5 animate-spin" /> VERIFYING...</>
                ) : (
                  <><Shield className="w-5 h-5" /> FILE REPORT</>
                )}
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function HintButton({ hint }: { hint: string }) {
  const [show, setShow] = useState(false);

  if (show) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-[#eab308]/10 border border-[#eab308]/30 text-[#eab308] p-4 rounded-xl text-xs max-w-xs shadow-[0_0_15px_rgba(234,179,8,0.1)]"
      >
        <span className="font-bold tracking-widest block mb-2 font-mono text-[10px]">DECRYPTED_HINT:</span>
        <span className="font-sans text-sm leading-relaxed">{hint}</span>
      </motion.div>
    );
  }

  return (
    <button 
      onClick={() => setShow(true)}
      className="px-5 py-2.5 border border-[#eab308]/50 text-[#eab308] text-[10px] font-bold tracking-widest rounded-lg hover:bg-[#eab308]/10 transition-all font-mono hover:shadow-[0_0_15px_rgba(234,179,8,0.15)]"
    >
      AUTHORIZE_HINT
    </button>
  );
}

function PuzzleSolver({ puzzle, isSolved, onSolved }: { key?: string; puzzle: Puzzle, isSolved: boolean, onSolved: (points: number) => void }) {
  const [showHint, setShowHint] = useState(false);

  if (puzzle.type === 'MASTERMIND') {
    return <MastermindSolver puzzle={puzzle} isSolved={isSolved} onSolved={onSolved} />;
  }
  if (puzzle.type === 'EMOJI_CRYPTO') {
    return <EmojiCryptoSolver puzzle={puzzle} isSolved={isSolved} onSolved={onSolved} />;
  }
  if (puzzle.type === 'OBSERVATION') {
    return <ObservationSolver puzzle={puzzle} isSolved={isSolved} onSolved={onSolved} />;
  }

  const [answer, setAnswer] = useState('');
  const [status, setStatus] = useState<'idle' | 'checking' | 'correct' | 'incorrect'>(isSolved ? 'correct' : 'idle');
  const [justSolved, setJustSolved] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSolved) return;
    
    setStatus('checking');
    
    // Simulate network delay for effect
    setTimeout(() => {
      if (answer.trim().toUpperCase() === puzzle.answer.toUpperCase()) {
        setStatus('correct');
        setJustSolved(true);
        onSolved(puzzle.points);
      } else {
        setStatus('incorrect');
        setTimeout(() => setStatus('idle'), 2000);
      }
    }, 800);
  };

  return (
    <div className="bg-[#050505] border border-white/10 rounded-2xl p-6 md:p-8 relative shadow-inner">
      <AnimatePresence>
        {justSolved && <SuccessBanner message="MISSION ACCOMPLISHED" points={puzzle.points} />}
      </AnimatePresence>
      <div className="flex justify-between items-center mb-6">
        <span className="text-[10px] text-[#a3a3a3] font-bold tracking-widest font-mono uppercase">ENTER YOUR ANSWER</span>
        <SolverStatusBadge status={status} />
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="relative">
          <input
            type="text"
            value={isSolved ? puzzle.answer : answer}
            onChange={(e) => setAnswer(e.target.value)}
            disabled={isSolved || status === 'checking'}
            className={`w-full bg-[#111] border-2 ${status === 'incorrect' ? 'border-[#ef4444] text-[#ef4444]' : status === 'correct' ? 'border-[#10b981] text-[#10b981]' : 'border-white/10 focus:border-[#3b82f6] text-white'} rounded-xl p-5 text-center text-xl md:text-2xl font-bold tracking-[0.2em] focus:outline-none focus:ring-4 focus:ring-[#3b82f6]/20 transition-all disabled:opacity-50 font-mono shadow-inner`}
            placeholder={isSolved ? "" : "TYPE HERE..."}
          />
          {status === 'incorrect' && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute -bottom-8 left-0 right-0 text-center text-[10px] text-[#ef4444] tracking-widest font-bold font-mono uppercase"
            >
              INCORRECT ANSWER. TRY AGAIN!
            </motion.div>
          )}
        </div>

        {puzzle.hint && (
          <div className="mt-4 flex justify-center">
            {!showHint ? (
              <button
                type="button"
                onClick={() => setShowHint(true)}
                className="text-[10px] text-[#3b82f6] font-mono tracking-widest uppercase hover:underline flex items-center gap-1 opacity-70 hover:opacity-100 transition-opacity"
              >
                <Eye className="w-3 h-3" /> REQUEST INTEL (HINT)
              </button>
            ) : (
              <div className="bg-[#3b82f6]/10 border border-[#3b82f6]/20 p-4 rounded-lg text-[11px] text-[#3b82f6] font-mono text-center w-full">
                <strong>INTEL:</strong> {puzzle.hint}
              </div>
            )}
          </div>
        )}

        <button
          type="submit"
          disabled={isSolved || status === 'checking' || !answer.trim()}
          className={`w-full py-4 rounded-xl font-bold tracking-widest text-xs flex items-center justify-center gap-3 transition-all font-mono mt-6 ${
            isSolved 
              ? 'bg-[#10b981]/10 text-[#10b981] border border-[#10b981]/30 cursor-default' 
              : status === 'checking'
                ? 'bg-[#3b82f6]/30 text-white cursor-wait border border-[#3b82f6]/50'
                : 'bg-gradient-to-r from-[#2563eb] to-[#3b82f6] hover:from-[#1d4ed8] hover:to-[#2563eb] text-white shadow-[0_4px_20px_rgba(59,130,246,0.4)] hover:shadow-[0_4px_25px_rgba(59,130,246,0.6)]'
          }`}
        >
          {isSolved ? (
            <><CheckCircle2 className="w-5 h-5" /> MISSION COMPLETE</>
          ) : status === 'checking' ? (
            <><RefreshCw className="w-5 h-5 animate-spin" /> CHECKING...</>
          ) : (
            <><Shield className="w-5 h-5" /> CHECK ANSWER</>
          )}
        </button>
      </form>
    </div>
  );
}

function Onboarding({ onLogin }: { onLogin: (username: string, ageGroup: string, specialization: string) => void }) {
  const [step, setStep] = useState(1);
  const [username, setUsername] = useState('');
  const [ageGroup, setAgeGroup] = useState('');
  const [specialization, setSpecialization] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1 && username.trim()) setStep(2);
    else if (step === 2 && ageGroup) setStep(3);
    else if (step === 3 && specialization) {
      setIsGenerating(true);
      setTimeout(() => {
        onLogin(username.trim(), ageGroup, specialization);
      }, 2000);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-[#f5f5f5] flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#3b82f6]/10 via-[#050505] to-[#050505]"></div>
      
      <AnimatePresence mode="wait">
        {!isGenerating ? (
          <motion.div 
            key="form"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="max-w-md w-full bg-[#0a0a0a]/80 backdrop-blur-xl border border-white/5 p-8 md:p-10 rounded-3xl shadow-2xl relative z-10"
          >
            <div className="flex justify-center mb-8">
              <div className="p-4 border border-[#3b82f6]/20 rounded-2xl bg-gradient-to-b from-[#3b82f6]/20 to-transparent relative shadow-[0_0_30px_rgba(59,130,246,0.15)]">
                <Shield className="w-10 h-10 text-[#3b82f6] relative z-10" />
              </div>
            </div>
            
            <div className="text-center mb-10">
              <h1 className="text-2xl font-bold tracking-widest mb-2 text-white font-sans uppercase">SPY ACADEMY</h1>
              <p className="text-[10px] text-[#3b82f6] tracking-widest font-mono uppercase">New Agent Sign-up // Level 1</p>
              <div className="flex items-center justify-center gap-2 mt-4">
                {[1, 2, 3].map(s => (
                  <div key={s} className={`h-1 rounded-full transition-all duration-300 ${s === step ? 'w-8 bg-[#3b82f6]' : s < step ? 'w-4 bg-[#10b981]' : 'w-4 bg-[#333]'}`}></div>
                ))}
              </div>
              <p className="text-[9px] text-[#555] font-mono tracking-widest mt-2">STEP {step} OF 3</p>
            </div>

            <form onSubmit={handleNext} className="space-y-6">
              <AnimatePresence mode="wait">
                {step === 1 && (
                  <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                    <label className="block text-xs text-[#a3a3a3] font-medium tracking-wide mb-3 uppercase">Choose Your Agent Name</label>
                    <input 
                      type="text" 
                      required
                      autoFocus
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="w-full bg-[#111] border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-[#3b82f6] focus:ring-1 focus:ring-[#3b82f6] transition-all font-mono font-bold tracking-widest uppercase shadow-inner"
                      placeholder="ENTER NAME"
                      maxLength={15}
                    />
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-3">
                    <label className="block text-xs text-[#a3a3a3] font-medium tracking-wide mb-3 uppercase">How old are you?</label>
                    {['UNDER_12', '13_TO_17', '18_PLUS'].map(age => (
                      <button
                        key={age}
                        type="button"
                        onClick={() => setAgeGroup(age)}
                        className={`w-full p-4 rounded-xl border text-left font-mono font-bold tracking-widest text-xs transition-all ${ageGroup === age ? 'bg-[#3b82f6]/10 border-[#3b82f6] text-[#3b82f6] shadow-[0_0_15px_rgba(59,130,246,0.1)]' : 'bg-[#111] border-white/5 text-[#a3a3a3] hover:border-white/20 hover:text-white'}`}
                      >
                        [ {formatDisplayName(age)} ]
                      </button>
                    ))}
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-3">
                    <label className="block text-xs text-[#a3a3a3] font-medium tracking-wide mb-3 uppercase">Choose Your Best Skill</label>
                    {['CRYPTOGRAPHY', 'CYBER_SECURITY', 'FIELD_OPS', 'SIGNAL_INT'].map(spec => (
                      <button
                        key={spec}
                        type="button"
                        onClick={() => setSpecialization(spec)}
                        className={`w-full p-4 rounded-xl border text-left font-mono font-bold tracking-widest text-xs transition-all ${specialization === spec ? 'bg-[#3b82f6]/10 border-[#3b82f6] text-[#3b82f6] shadow-[0_0_15px_rgba(59,130,246,0.1)]' : 'bg-[#111] border-white/5 text-[#a3a3a3] hover:border-white/20 hover:text-white'}`}
                      >
                        [ {formatDisplayName(spec)} ]
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="pt-6">
                <button 
                  type="submit"
                  disabled={(step === 1 && !username) || (step === 2 && !ageGroup) || (step === 3 && !specialization)}
                  className="w-full bg-gradient-to-r from-[#2563eb] to-[#3b82f6] hover:from-[#1d4ed8] hover:to-[#2563eb] text-white font-bold tracking-widest text-xs py-4 rounded-xl transition-all flex items-center justify-center gap-2 shadow-[0_4px_20px_rgba(59,130,246,0.4)] disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
                >
                  {step < 3 ? 'NEXT' : <><Unlock className="w-4 h-4" /> START TRAINING</>}
                </button>
              </div>
            </form>
            
            <div className="mt-8 pt-6 border-t border-white/5 text-center">
              <div className="flex items-center justify-center gap-2 text-[#737373] text-[9px] font-mono tracking-widest uppercase">
                <AlertTriangle className="w-3 h-3" />
                <span>Play fair and have fun!</span>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="generating"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center space-y-6 relative z-10"
          >
            <div className="relative w-20 h-20 mx-auto flex items-center justify-center">
              <div className="absolute inset-0 border-4 border-[#3b82f6]/20 rounded-full"></div>
              <div className="absolute inset-0 border-4 border-[#3b82f6] rounded-full border-t-transparent animate-spin"></div>
              <Shield className="w-8 h-8 text-[#3b82f6]" />
            </div>
            <div className="space-y-2">
              <p className="text-white font-bold tracking-widest font-mono">GENERATING_OPERATIVE_PROFILE...</p>
              <p className="text-[#3b82f6] text-xs font-mono tracking-widest">ESTABLISHING SECURE TUNNEL</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function MastermindSolver({ puzzle, isSolved, onSolved }: { puzzle: Puzzle, isSolved: boolean, onSolved: (points: number) => void }) {
  const [guess, setGuess] = useState('');
  const [history, setHistory] = useState<{guess: string, result: {correctPos: number, correctDigit: number}}[]>([]);
  const [status, setStatus] = useState<'idle' | 'checking' | 'correct' | 'incorrect'>(isSolved ? 'correct' : 'idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSolved || guess.length !== 4) return;
    
    setStatus('checking');
    
    setTimeout(() => {
      let correctPos = 0;
      let correctDigit = 0;
      const answerArr = puzzle.answer.split('');
      const guessArr = guess.split('');
      
      // Check correct positions
      for (let i = 0; i < 4; i++) {
        if (guessArr[i] === answerArr[i]) {
          correctPos++;
          answerArr[i] = null as any;
          guessArr[i] = null as any;
        }
      }
      
      // Check correct digits wrong position
      for (let i = 0; i < 4; i++) {
        if (guessArr[i] !== null) {
          const idx = answerArr.indexOf(guessArr[i]);
          if (idx !== -1) {
            correctDigit++;
            answerArr[idx] = null as any;
          }
        }
      }

      const newHistory = [...history, { guess, result: { correctPos, correctDigit } }];
      setHistory(newHistory);
      setGuess('');

      if (correctPos === 4) {
        setStatus('correct');
        onSolved(puzzle.points);
      } else {
        setStatus('incorrect');
        setTimeout(() => setStatus('idle'), 1000);
      }
    }, 600);
  };

  return (
    <div className="bg-[#050505] border border-white/10 rounded-2xl p-6 md:p-8 relative shadow-inner">
      <div className="flex justify-between items-center mb-6">
        <span className="text-[10px] text-[#a3a3a3] font-bold tracking-widest font-mono">VAULT_DECRYPTION_PROTOCOL</span>
        <div className="flex items-center gap-2 bg-[#3b82f6]/10 px-3 py-1.5 rounded-md border border-[#3b82f6]/30">
          <span className="text-[9px] text-[#3b82f6] font-bold tracking-widest font-mono">READY</span>
          <Cpu className="w-3 h-3 text-[#3b82f6]" />
        </div>
      </div>

      <div className="space-y-4 mb-8">
        {history.map((h, i) => (
          <div key={i} className="flex items-center justify-between bg-[#111] border border-white/5 rounded-xl p-4">
            <div className="flex gap-2">
              {h.guess.split('').map((char, idx) => (
                <div key={idx} className="w-10 h-12 bg-[#1a1a1a] border border-white/10 rounded flex items-center justify-center text-xl font-bold text-white font-mono">
                  {char}
                </div>
              ))}
            </div>
            <div className="flex gap-1">
              {[...Array(h.result.correctPos)].map((_, idx) => (
                <div key={`g-${idx}`} className="w-3 h-3 rounded-full bg-[#10b981] shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
              ))}
              {[...Array(h.result.correctDigit)].map((_, idx) => (
                <div key={`y-${idx}`} className="w-3 h-3 rounded-full bg-[#eab308] shadow-[0_0_8px_rgba(234,179,8,0.5)]"></div>
              ))}
              {[...Array(4 - h.result.correctPos - h.result.correctDigit)].map((_, idx) => (
                <div key={`e-${idx}`} className="w-3 h-3 rounded-full bg-[#333]"></div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="relative">
          <input
            type="text"
            maxLength={4}
            value={isSolved ? puzzle.answer : guess}
            onChange={(e) => setGuess(e.target.value.replace(/[^0-9]/g, ''))}
            disabled={isSolved || status === 'checking'}
            className={`w-full bg-[#111] border-2 ${status === 'incorrect' ? 'border-[#ef4444] text-[#ef4444]' : status === 'correct' ? 'border-[#10b981] text-[#10b981]' : 'border-white/10 focus:border-[#3b82f6] text-white'} rounded-xl p-5 text-center text-2xl font-bold tracking-[1em] focus:outline-none focus:ring-4 focus:ring-[#3b82f6]/20 transition-all disabled:opacity-50 font-mono shadow-inner`}
            placeholder={isSolved ? "" : "0000"}
          />
        </div>

        <button
          type="submit"
          disabled={isSolved || status === 'checking' || guess.length !== 4}
          className={`w-full py-4 rounded-xl font-bold tracking-widest text-xs flex items-center justify-center gap-3 transition-all font-mono ${
            isSolved 
              ? 'bg-[#10b981]/10 text-[#10b981] border border-[#10b981]/30 cursor-default' 
              : status === 'checking'
                ? 'bg-[#3b82f6]/30 text-white cursor-wait border border-[#3b82f6]/50'
                : 'bg-gradient-to-r from-[#2563eb] to-[#3b82f6] hover:from-[#1d4ed8] hover:to-[#2563eb] text-white shadow-[0_4px_20px_rgba(59,130,246,0.4)] hover:shadow-[0_4px_25px_rgba(59,130,246,0.6)]'
          }`}
        >
          {isSolved ? (
            <><CheckCircle2 className="w-5 h-5" /> VAULT_UNLOCKED</>
          ) : status === 'checking' ? (
            <><RefreshCw className="w-5 h-5 animate-spin" /> VERIFYING_CODE</>
          ) : (
            <><Unlock className="w-5 h-5" /> ATTEMPT_UNLOCK</>
          )}
        </button>
      </form>
    </div>
  );
}

const MOCK_AGENTS: { username: string; score: number; rank: string }[] = [
  { username: 'FALCON_SEVEN', score: 5200, rank: '00 STATUS' },
  { username: 'IRON_GHOST', score: 3750, rank: 'MASTER SPY' },
  { username: 'VIPER_ONE', score: 2840, rank: 'MASTER SPY' },
  { username: 'NOVA_CIPHER', score: 1920, rank: 'SPECIAL AGENT' },
  { username: 'WRAITH_X', score: 1340, rank: 'SPECIAL AGENT' },
  { username: 'PHANTOM_SIX', score: 890, rank: 'OPERATIVE' },
  { username: 'ECLIPSE_3', score: 720, rank: 'OPERATIVE' },
  { username: 'STORM_KITE', score: 480, rank: 'FIELD AGENT' },
  { username: 'CIPHER_BLUE', score: 310, rank: 'FIELD AGENT' },
  { username: 'DELTA_ROOK', score: 190, rank: 'FIELD AGENT' },
];

function Leaderboard({ user }: { user: User }) {
  const allAgents = [...MOCK_AGENTS.filter(a => a.username !== user.username), { username: user.username, score: user.score, rank: user.rank }]
    .sort((a, b) => b.score - a.score);

  const userPosition = allAgents.findIndex(a => a.username === user.username);

  const getRankColor = (rank: string) => {
    if (rank === '00 STATUS') return 'text-[#ef4444]';
    if (rank === 'MASTER SPY') return 'text-[#a855f7]';
    if (rank === 'SPECIAL AGENT') return 'text-[#3b82f6]';
    if (rank === 'OPERATIVE') return 'text-[#10b981]';
    return 'text-[#eab308]';
  };

  const getMedalColor = (pos: number) => {
    if (pos === 0) return 'text-[#eab308]';
    if (pos === 1) return 'text-[#a3a3a3]';
    if (pos === 2) return 'text-[#cd7f32]';
    return 'text-[#555]';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 mb-8">
        <div className="p-3 border border-[#eab308]/20 rounded-xl bg-gradient-to-b from-[#eab308]/20 to-transparent shadow-[0_0_20px_rgba(234,179,8,0.1)]">
          <Trophy className="w-6 h-6 text-[#eab308]" />
        </div>
        <div>
          <h2 className="text-xl font-black tracking-widest text-white uppercase">GLOBAL_RANKINGS</h2>
          <p className="text-[10px] text-[#eab308] tracking-widest font-mono uppercase">TOP OPERATIVES // INTELLIGENCE_AUTHORITY</p>
        </div>
      </div>

      {/* User's position card */}
      <div className="bg-[#111] border border-[#eab308]/30 rounded-2xl p-6 flex items-center justify-between shadow-[0_0_20px_rgba(234,179,8,0.05)]">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-[#eab308]/10 border border-[#eab308]/30 flex items-center justify-center">
            <span className="text-sm font-black text-[#eab308] font-mono">#{userPosition + 1}</span>
          </div>
          <div>
            <p className="text-[9px] font-mono text-[#a3a3a3] tracking-widest uppercase mb-0.5">YOUR POSITION</p>
            <p className="text-base font-bold text-white tracking-wider">{user.username}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-[9px] font-mono text-[#a3a3a3] tracking-widest uppercase mb-0.5">INTEL YIELD</p>
          <p className="text-xl font-black text-[#10b981] font-mono">{user.score}</p>
        </div>
      </div>

      {/* Full leaderboard */}
      <div className="bg-[#111] border border-white/5 rounded-2xl overflow-hidden shadow-xl">
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-[#0a0a0a]">
          <span className="text-[9px] font-bold tracking-widest font-mono text-[#a3a3a3] uppercase">OPERATIVE</span>
          <div className="flex items-center gap-8">
            <span className="text-[9px] font-bold tracking-widest font-mono text-[#a3a3a3] uppercase">RANK</span>
            <span className="text-[9px] font-bold tracking-widest font-mono text-[#a3a3a3] uppercase">YIELD</span>
          </div>
        </div>
        {allAgents.map((agent, index) => {
          const isCurrentUser = agent.username === user.username;
          return (
            <motion.div
              key={agent.username}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.04 }}
              className={`flex items-center justify-between px-6 py-4 border-b border-white/5 last:border-0 transition-colors ${isCurrentUser ? 'bg-[#eab308]/5' : 'hover:bg-white/2'}`}
            >
              <div className="flex items-center gap-4">
                <div className="w-8 flex items-center justify-center">
                  {index < 3 ? (
                    <Medal className={`w-5 h-5 ${getMedalColor(index)}`} />
                  ) : (
                    <span className="text-xs font-bold font-mono text-[#555]">#{index + 1}</span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-sm font-bold tracking-wider font-mono ${isCurrentUser ? 'text-[#eab308]' : 'text-white'}`}>
                    {agent.username}
                  </span>
                  {isCurrentUser && (
                    <span className="text-[8px] font-bold font-mono text-[#eab308] bg-[#eab308]/10 border border-[#eab308]/20 px-2 py-0.5 rounded-full tracking-widest">YOU</span>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-8">
                <span className={`text-[10px] font-bold tracking-widest font-mono uppercase hidden sm:block ${getRankColor(agent.rank)}`}>{agent.rank}</span>
                <span className="text-sm font-black font-mono text-[#10b981] w-16 text-right">{agent.score.toLocaleString()}</span>
              </div>
            </motion.div>
          );
        })}
      </div>

      <p className="text-center text-[9px] font-mono text-[#333] tracking-widest uppercase pb-2">
        Live rankings sync available in a future update.
      </p>
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Shield, RefreshCw, Download, Upload, LogOut, User as UserIcon, Lock, Unlock, ChevronRight, ArrowLeft, Cpu, Radio, AlertTriangle, CheckCircle2, Share2, Image as ImageIcon, Briefcase, Map, MessageSquare, ScanLine } from 'lucide-react';
import { puzzles, Puzzle, Category } from './data/puzzles';
import LiveSpyBot from './components/LiveSpyBot';
import Tutorial from './components/Tutorial';

type User = {
  username: string;
  score: number;
  rank: string;
  solvedPuzzles: string[];
  ageGroup: string;
  specialization: string;
  tutorialCompleted?: boolean;
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
  const [view, setView] = useState<'dashboard' | 'puzzle'>('dashboard');
  const [activePuzzle, setActivePuzzle] = useState<Puzzle | null>(null);
  const [activeCategory, setActiveCategory] = useState<Category | 'ALL_DATA_FILES'>('ALL_DATA_FILES');
  const [showBot, setShowBot] = useState(false);
  const [visibleCount, setVisibleCount] = useState(12);

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

    const newScore = user.score + points;
    const updatedUser = {
      ...user,
      score: newScore,
      rank: getRank(newScore),
      solvedPuzzles: [...user.solvedPuzzles, puzzleId]
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

  const sortedPuzzles = [...filteredPuzzles].sort((a, b) => {
    const diffOrder = { 'EASY': 1, 'MEDIUM': 2, 'HARD': 3, 'ELITE': 4 };
    return diffOrder[a.difficulty] - diffOrder[b.difficulty];
  });

  const visiblePuzzles = sortedPuzzles.slice(0, visibleCount);

  const categoryCounts = puzzles.reduce((acc, p) => {
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
            <p className="text-[8px] md:text-[10px] text-[#3b82f6] tracking-widest mt-0.5 font-mono uppercase">Node_01 // Secure_Tunnel</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3 md:gap-6">
          <div className="hidden md:flex items-center gap-4 text-[#a3a3a3]">
            <RefreshCw className="w-4 h-4 hover:text-white cursor-pointer transition-colors" />
            <Download className="w-4 h-4 hover:text-white cursor-pointer transition-colors" />
            <Upload className="w-4 h-4 hover:text-white cursor-pointer transition-colors" />
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
            01_ OPERATIONAL_FILES
          </button>
          <button 
            className="flex-1 px-4 py-2 text-xs font-bold tracking-widest rounded-lg text-[#a3a3a3] hover:text-white hover:bg-white/5 transition-all font-mono"
            onClick={() => setShowBot(!showBot)}
          >
            02_ Q_BRANCH_UPLINK
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
              <div className="bg-[#111] border border-white/5 rounded-3xl p-5 md:p-8 flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-8 shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#3b82f6]/5 rounded-full blur-3xl -z-10 translate-x-1/2 -translate-y-1/2"></div>
                <div className="flex flex-col items-center z-10">
                  <div className="w-20 h-20 md:w-24 md:h-24 bg-[#1a1a1a] rounded-2xl border border-white/10 flex items-center justify-center mb-3 relative shadow-inner">
                    <UserIcon className="w-10 h-10 md:w-12 md:h-12 text-[#444]" />
                    <div className="absolute -bottom-2 bg-gradient-to-r from-[#2563eb] to-[#3b82f6] text-white text-[8px] md:text-[9px] font-bold px-3 py-1 rounded-full tracking-widest font-mono shadow-md">
                      ACCESS_LEVEL_1
                    </div>
                  </div>
                </div>
                
                <div className="flex-1 grid grid-cols-2 md:grid-cols-2 gap-4 md:gap-6 w-full z-10">
                  <div>
                    <p className="text-[8px] md:text-[10px] text-[#a3a3a3] tracking-widest mb-1 font-mono uppercase">OPERATIVE_ID</p>
                    <p className="text-sm md:text-xl font-bold tracking-widest text-white truncate">{user.username}</p>
                  </div>
                  <div>
                    <p className="text-[8px] md:text-[10px] text-[#a3a3a3] tracking-widest mb-1 font-mono uppercase">CLEARANCE</p>
                    <p className="text-sm md:text-xl font-bold tracking-widest text-[#3b82f6]">{user.rank}</p>
                  </div>
                  <div>
                    <p className="text-[8px] md:text-[10px] text-[#a3a3a3] tracking-widest mb-1 font-mono uppercase">SPECIALIZATION</p>
                    <p className="text-[10px] md:text-sm font-bold tracking-widest text-[#d4d4d4] uppercase">{user.specialization?.replace('_', ' ') || 'UNASSIGNED'}</p>
                  </div>
                  <div>
                    <p className="text-[8px] md:text-[10px] text-[#a3a3a3] tracking-widest mb-1 font-mono uppercase">INTEL_YIELD</p>
                    <p className="text-sm md:text-xl font-bold tracking-widest text-[#10b981]">{user.score}</p>
                  </div>
                </div>
                
                <div className="w-full md:w-auto md:ml-auto flex flex-col justify-center z-10">
                  <button 
                    onClick={handleShare}
                    className="w-full md:w-auto flex items-center justify-center gap-2 px-5 py-3 bg-[#3b82f6]/10 hover:bg-[#3b82f6]/20 text-[#3b82f6] border border-[#3b82f6]/30 rounded-xl transition-colors text-[10px] font-bold tracking-widest font-mono"
                  >
                    <Share2 className="w-4 h-4" /> SHARE_DOSSIER
                  </button>
                </div>
              </div>

              {/* Filters */}
              <div>
                <div className="flex items-center gap-4 mb-4">
                  <p className="text-[10px] text-[#3b82f6] tracking-widest uppercase font-mono">OPERATIONAL_THEATRE_REGISTRY</p>
                  <div className="h-[1px] flex-1 bg-white/5"></div>
                </div>
                
                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={() => setActiveCategory('ALL_DATA_FILES')}
                    className={`px-4 py-2 text-[10px] font-bold tracking-widest rounded-lg border transition-all font-mono ${activeCategory === 'ALL_DATA_FILES' ? 'bg-[#3b82f6]/20 text-[#3b82f6] border-[#3b82f6]/50 shadow-[0_0_10px_rgba(59,130,246,0.1)]' : 'bg-[#111] text-[#a3a3a3] border-white/5 hover:border-white/20 hover:text-white'}`}
                  >
                    [ ALL_DATA_FILES // {puzzles.length} ]
                  </button>
                  {Object.entries(categoryCounts).map(([cat, count]) => (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat as Category)}
                      className={`px-4 py-2 text-[10px] font-bold tracking-widest rounded-lg border transition-all font-mono ${activeCategory === cat ? 'bg-[#3b82f6]/20 text-[#3b82f6] border-[#3b82f6]/50 shadow-[0_0_10px_rgba(59,130,246,0.1)]' : 'bg-[#111] text-[#a3a3a3] border-white/5 hover:border-white/20 hover:text-white'}`}
                    >
                      [ {cat} // {count} ]
                    </button>
                  ))}
                </div>
              </div>

              {/* Puzzle Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {visiblePuzzles.map((puzzle) => {
                  const isSolved = user.solvedPuzzles.includes(puzzle.id);
                  const isLocked = user.score < DIFFICULTY_THRESHOLDS[puzzle.difficulty] && !isSolved;
                  const difficultyColor = puzzle.difficulty === 'EASY' ? 'text-[#10b981] border-[#10b981]/30' :
                                          puzzle.difficulty === 'MEDIUM' ? 'text-[#eab308] border-[#eab308]/30' :
                                          'text-[#ef4444] border-[#ef4444]/30';

                  return (
                    <motion.div
                      key={puzzle.id}
                      whileHover={!isLocked ? { scale: 1.02, y: -4 } : {}}
                      className={`bg-[#111] border ${isSolved ? 'border-[#10b981]/30 hover:border-[#10b981]/50 hover:shadow-[0_8px_30px_rgba(16,185,129,0.15)]' : isLocked ? 'border-white/5 opacity-75' : 'border-white/10 hover:border-[#3b82f6]/50 hover:shadow-[0_8px_30px_rgba(59,130,246,0.15)]'} rounded-3xl p-6 flex flex-col relative overflow-hidden group transition-all duration-300 ${isLocked ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                      onClick={() => { if (!isLocked) { setActivePuzzle(puzzle); setView('puzzle'); } }}
                    >
                      {isSolved && (
                        <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-[#10b981]/20 to-transparent flex items-start justify-end p-4 rounded-bl-3xl">
                          <CheckCircle2 className="w-5 h-5 text-[#10b981]" />
                        </div>
                      )}
                      {isLocked && (
                        <div className="absolute inset-0 bg-[#050505]/80 backdrop-blur-sm z-10 flex flex-col items-center justify-center rounded-3xl border border-white/5">
                          <Lock className="w-8 h-8 text-[#444] mb-3" />
                          <p className="text-xs font-bold tracking-widest text-[#737373] font-mono">CLASSIFIED_FILE</p>
                          <p className="text-[9px] text-[#555] tracking-widest mt-2 font-mono">REQUIRES {DIFFICULTY_THRESHOLDS[puzzle.difficulty]} YIELD</p>
                        </div>
                      )}
                      
                      <div className="flex justify-between items-start mb-6">
                        <div className={`p-3 rounded-2xl ${isSolved ? 'bg-[#10b981]/10 shadow-[0_0_15px_rgba(16,185,129,0.1)]' : 'bg-[#3b82f6]/10 shadow-[0_0_15px_rgba(59,130,246,0.1)]'}`}>
                          {isSolved ? <Unlock className={`w-5 h-5 text-[#10b981]`} /> : <Lock className="w-5 h-5 text-[#3b82f6]" />}
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          <div className="text-right">
                            <p className="text-[8px] text-[#a3a3a3] tracking-widest mb-1 font-mono">PRIORITY</p>
                            <span className={`text-[9px] font-bold tracking-widest px-2 py-1 rounded-md border ${difficultyColor} font-mono`}>
                              {puzzle.difficulty}
                            </span>
                          </div>
                          {puzzle.imageUrl && (
                            <div className="flex items-center gap-1 text-[#3b82f6] bg-[#3b82f6]/10 px-2 py-1 rounded border border-[#3b82f6]/30" title="Contains Image Attachment">
                              <ImageIcon className="w-3 h-3" />
                              <span className="text-[8px] font-bold tracking-widest font-mono">ATTACHMENT</span>
                            </div>
                          )}
                        </div>
                      </div>

                      <h3 className="text-lg font-bold text-white mb-3 font-sans tracking-wide">{puzzle.title}</h3>
                      <p className="text-sm text-[#a3a3a3] font-sans line-clamp-2 mb-8 flex-1">{puzzle.description}</p>

                      <div className="flex justify-between items-end mt-auto pt-4 border-t border-white/5">
                        <div>
                          <p className="text-[8px] text-[#a3a3a3] tracking-widest mb-1 font-mono">REGISTRY_ID</p>
                          <p className="text-[10px] text-[#d4d4d4] tracking-widest font-mono">{puzzle.id}</p>
                        </div>
                        <div 
                          className={`text-xs font-bold tracking-widest flex items-center gap-1 transition-colors font-mono ${isSolved ? 'text-[#10b981] group-hover:text-[#34d399]' : 'text-[#3b82f6] group-hover:text-[#60a5fa]'}`}
                        >
                          {isSolved ? 'REVIEW' : 'DECRYPT'} <ChevronRight className="w-4 h-4" />
                        </div>
                      </div>
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
                    <RefreshCw className="w-4 h-4" /> DECRYPT_MORE_FILES
                  </button>
                </div>
              )}
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
                <ArrowLeft className="w-4 h-4" /> DISENGAGE_REMOTE_UPLINK
              </button>

              <div className="bg-[#111] border border-white/10 rounded-3xl p-8 md:p-12 relative overflow-hidden shadow-2xl">
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#3b82f6]/5 rounded-full blur-3xl -z-10 translate-x-1/2 -translate-y-1/2"></div>
                
                {/* Header */}
                <div className="flex justify-between items-center mb-8 border-b border-white/5 pb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-[#3b82f6] shadow-[0_0_10px_rgba(59,130,246,0.8)]"></div>
                    <span className="text-[10px] text-[#a3a3a3] font-bold tracking-widest uppercase font-mono">ACTIVE_MISSION_REGISTRY <span className="mx-2">|</span> {activePuzzle.id}</span>
                  </div>
                  <span className="text-[10px] text-[#ef4444] font-bold tracking-widest font-mono bg-[#ef4444]/10 px-3 py-1 rounded-full border border-[#ef4444]/20">[{activePuzzle.difficulty}_PRIORITY_LEVEL]</span>
                </div>

                <div className="flex flex-col md:flex-row justify-between items-start mb-10 gap-6">
                  <h2 className="text-3xl md:text-4xl font-black text-white font-sans tracking-tight">{activePuzzle.title}</h2>
                  <HintButton hint={activePuzzle.hint} />
                </div>

                <div className="border-l-4 border-[#3b82f6] pl-6 mb-12 bg-gradient-to-r from-[#3b82f6]/5 to-transparent py-4 rounded-r-2xl">
                  <p className="text-xs text-[#3b82f6] font-bold tracking-widest mb-3 font-mono">{'>'} BRIEFING:</p>
                  <p className="text-lg text-[#d4d4d4] font-sans leading-relaxed">{activePuzzle.description}</p>
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
                  puzzle={activePuzzle} 
                  isSolved={user.solvedPuzzles.includes(activePuzzle.id)}
                  onSolved={(points) => handleSolve(activePuzzle.id, points)} 
                />

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
          <span className="text-[9px] font-bold tracking-widest font-mono">FILES</span>
        </button>
        <button 
          className="flex flex-col items-center gap-1 text-[#555] opacity-50 cursor-not-allowed"
        >
          <Map className="w-6 h-6" />
          <span className="text-[9px] font-bold tracking-widest font-mono">MAP</span>
        </button>
        <button 
          className="flex flex-col items-center gap-1 text-[#555] opacity-50 cursor-not-allowed"
        >
          <MessageSquare className="w-6 h-6" />
          <span className="text-[9px] font-bold tracking-widest font-mono">COMMS</span>
        </button>
        <button 
          onClick={() => setShowBot(!showBot)}
          className={`flex flex-col items-center gap-1 transition-all ${showBot ? 'text-[#3b82f6]' : 'text-[#555]'}`}
        >
          <ScanLine className="w-6 h-6" />
          <span className="text-[9px] font-bold tracking-widest font-mono">Q-BRANCH</span>
        </button>
      </div>

      <AnimatePresence>
        {showBot && <LiveSpyBot onClose={() => setShowBot(false)} />}
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

function PuzzleSolver({ puzzle, isSolved, onSolved }: { puzzle: Puzzle, isSolved: boolean, onSolved: (points: number) => void }) {
  if (puzzle.type === 'MASTERMIND') {
    return <MastermindSolver puzzle={puzzle} isSolved={isSolved} onSolved={onSolved} />;
  }

  const [answer, setAnswer] = useState('');
  const [status, setStatus] = useState<'idle' | 'checking' | 'correct' | 'incorrect'>(isSolved ? 'correct' : 'idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSolved) return;
    
    setStatus('checking');
    
    // Simulate network delay for effect
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
        <span className="text-[10px] text-[#a3a3a3] font-bold tracking-widest font-mono">DECRYPTION_COMMAND_INPUT</span>
        <div className="flex items-center gap-2 bg-[#3b82f6]/10 px-3 py-1.5 rounded-md border border-[#3b82f6]/30">
          <span className="text-[9px] text-[#3b82f6] font-bold tracking-widest font-mono">READY</span>
          <Cpu className="w-3 h-3 text-[#3b82f6]" />
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="relative">
          <input
            type="text"
            value={isSolved ? puzzle.answer : answer}
            onChange={(e) => setAnswer(e.target.value)}
            disabled={isSolved || status === 'checking'}
            className={`w-full bg-[#111] border-2 ${status === 'incorrect' ? 'border-[#ef4444] text-[#ef4444]' : status === 'correct' ? 'border-[#10b981] text-[#10b981]' : 'border-white/10 focus:border-[#3b82f6] text-white'} rounded-xl p-5 text-center text-xl md:text-2xl font-bold tracking-[0.2em] focus:outline-none focus:ring-4 focus:ring-[#3b82f6]/20 transition-all disabled:opacity-50 font-mono shadow-inner`}
            placeholder={isSolved ? "" : ". . ."}
          />
          {status === 'incorrect' && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute -bottom-8 left-0 right-0 text-center text-[10px] text-[#ef4444] tracking-widest font-bold font-mono"
            >
              ACCESS DENIED. INVALID DECRYPTION KEY.
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
            <><CheckCircle2 className="w-5 h-5" /> DECRYPTION_SUCCESSFUL</>
          ) : status === 'checking' ? (
            <><RefreshCw className="w-5 h-5 animate-spin" /> PROCESSING_OVERRIDE...</>
          ) : (
            <><Shield className="w-5 h-5" /> EXECUTE_OVERRIDE</>
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
              <h1 className="text-2xl font-bold tracking-widest mb-2 text-white font-sans">INTELLIGENCE_AUTHORITY</h1>
              <p className="text-[10px] text-[#3b82f6] tracking-widest font-mono uppercase">Secure Terminal Login // Node_01</p>
            </div>

            <form onSubmit={handleNext} className="space-y-6">
              <AnimatePresence mode="wait">
                {step === 1 && (
                  <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                    <label className="block text-xs text-[#a3a3a3] font-medium tracking-wide mb-3">OPERATIVE IDENTIFIER</label>
                    <input 
                      type="text" 
                      required
                      autoFocus
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="w-full bg-[#111] border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-[#3b82f6] focus:ring-1 focus:ring-[#3b82f6] transition-all font-mono font-bold tracking-widest uppercase shadow-inner"
                      placeholder="ENTER CODENAME"
                      maxLength={15}
                    />
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-3">
                    <label className="block text-xs text-[#a3a3a3] font-medium tracking-wide mb-3">CLEARANCE LEVEL (AGE)</label>
                    {['UNDER_12', '13_TO_17', '18_PLUS'].map(age => (
                      <button
                        key={age}
                        type="button"
                        onClick={() => setAgeGroup(age)}
                        className={`w-full p-4 rounded-xl border text-left font-mono font-bold tracking-widest text-xs transition-all ${ageGroup === age ? 'bg-[#3b82f6]/10 border-[#3b82f6] text-[#3b82f6] shadow-[0_0_15px_rgba(59,130,246,0.1)]' : 'bg-[#111] border-white/5 text-[#a3a3a3] hover:border-white/20 hover:text-white'}`}
                      >
                        [ {age.replace('_', ' ')} ]
                      </button>
                    ))}
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-3">
                    <label className="block text-xs text-[#a3a3a3] font-medium tracking-wide mb-3">PRIMARY SPECIALIZATION</label>
                    {['CRYPTOGRAPHY', 'CYBER_SECURITY', 'FIELD_OPS', 'SIGNAL_INT'].map(spec => (
                      <button
                        key={spec}
                        type="button"
                        onClick={() => setSpecialization(spec)}
                        className={`w-full p-4 rounded-xl border text-left font-mono font-bold tracking-widest text-xs transition-all ${specialization === spec ? 'bg-[#3b82f6]/10 border-[#3b82f6] text-[#3b82f6] shadow-[0_0_15px_rgba(59,130,246,0.1)]' : 'bg-[#111] border-white/5 text-[#a3a3a3] hover:border-white/20 hover:text-white'}`}
                      >
                        [ {spec.replace('_', ' ')} ]
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
                  {step < 3 ? 'PROCEED' : <><Unlock className="w-4 h-4" /> INITIATE_UPLINK</>}
                </button>
              </div>
            </form>
            
            <div className="mt-8 pt-6 border-t border-white/5 text-center">
              <div className="flex items-center justify-center gap-2 text-[#737373] text-[9px] font-mono tracking-widest">
                <AlertTriangle className="w-3 h-3" />
                <span>UNAUTHORIZED ACCESS IS STRICTLY PROHIBITED</span>
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

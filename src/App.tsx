import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Shield, RefreshCw, Download, Upload, LogOut, User as UserIcon, Lock, Unlock, ChevronRight, ArrowLeft, Cpu, Radio, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { puzzles, Puzzle, Category } from './data/puzzles';
import LiveSpyBot from './components/LiveSpyBot';

type User = {
  username: string;
  score: number;
  rank: string;
  solvedPuzzles: string[];
};

const RANKS = [
  { threshold: 0, name: 'RECRUIT' },
  { threshold: 100, name: 'FIELD AGENT' },
  { threshold: 500, name: 'OPERATIVE' },
  { threshold: 1000, name: 'SPECIAL AGENT' },
  { threshold: 2500, name: 'MASTER SPY' },
  { threshold: 5000, name: '00 STATUS' }
];

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

  // Load user from local storage
  useEffect(() => {
    const storedUser = localStorage.getItem('spy_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogin = (username: string) => {
    const newUser = {
      username: username.toUpperCase(),
      score: 0,
      rank: 'RECRUIT',
      solvedPuzzles: []
    };
    localStorage.setItem('spy_user', JSON.stringify(newUser));
    setUser(newUser);
  };

  const handleLogout = () => {
    localStorage.removeItem('spy_user');
    setUser(null);
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

  if (!user) {
    return <Login onLogin={handleLogin} />;
  }

  const filteredPuzzles = activeCategory === 'ALL_DATA_FILES' 
    ? puzzles 
    : puzzles.filter(p => p.category === activeCategory);

  const categoryCounts = puzzles.reduce((acc, p) => {
    acc[p.category] = (acc[p.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#e5e5e5] font-mono selection:bg-[#2563eb] selection:text-white overflow-hidden flex flex-col">
      {/* Header */}
      <header className="border-b border-[#222] p-4 flex justify-between items-center bg-[#0a0a0a] z-20">
        <div className="flex items-center gap-4">
          <div className="p-2 border border-[#2563eb]/30 rounded-lg bg-[#2563eb]/10">
            <Shield className="w-6 h-6 text-[#2563eb]" />
          </div>
          <div>
            <h1 className="text-sm font-bold tracking-widest text-[#e5e5e5]">INTELLIGENCE_AUTHORITY // NODE_01</h1>
            <p className="text-[10px] text-[#2563eb] tracking-widest mt-0.5">ESTABLISHED_SECURE_TUNNEL // 0XAF92</p>
          </div>
        </div>
        
        <div className="flex items-center gap-6">
          <div className="hidden md:flex items-center gap-4 text-[#737373]">
            <RefreshCw className="w-4 h-4 hover:text-[#e5e5e5] cursor-pointer transition-colors" />
            <Download className="w-4 h-4 hover:text-[#e5e5e5] cursor-pointer transition-colors" />
            <Upload className="w-4 h-4 hover:text-[#e5e5e5] cursor-pointer transition-colors" />
          </div>
          <div className="text-right hidden sm:block">
            <p className="text-xs font-bold text-[#e5e5e5] tracking-widest">{user.username}</p>
            <p className="text-[10px] text-[#2563eb] tracking-widest mt-0.5 uppercase">{user.rank} // CL_01</p>
          </div>
          <button onClick={handleLogout} className="text-[#737373] hover:text-[#ef4444] transition-colors">
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Tabs */}
      <div className="flex border-b border-[#222] bg-[#0a0a0a] px-8 z-20">
        <button 
          className={`px-6 py-4 text-xs font-bold tracking-widest border-b-2 transition-colors ${view === 'dashboard' ? 'border-[#2563eb] text-[#2563eb]' : 'border-transparent text-[#737373] hover:text-[#e5e5e5]'}`}
          onClick={() => { setView('dashboard'); setActivePuzzle(null); }}
        >
          01_ OPERATIONAL_FILES
        </button>
        <button 
          className="px-6 py-4 text-xs font-bold tracking-widest border-b-2 border-transparent text-[#737373] hover:text-[#e5e5e5] transition-colors"
          onClick={() => setShowBot(!showBot)}
        >
          02_ Q_BRANCH_UPLINK
        </button>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto relative z-10 p-4 md:p-8">
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
              <div className="bg-[#111] border border-[#222] rounded-xl p-6 md:p-8 flex flex-col md:flex-row items-center md:items-start gap-8">
                <div className="flex flex-col items-center">
                  <div className="w-24 h-24 bg-[#1a1a1a] rounded-xl border border-[#333] flex items-center justify-center mb-3 relative">
                    <UserIcon className="w-12 h-12 text-[#444]" />
                    <div className="absolute -bottom-2 bg-[#2563eb] text-white text-[9px] font-bold px-2 py-1 rounded tracking-widest">
                      ACCESS_LEVEL_1
                    </div>
                  </div>
                </div>
                
                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                  <div>
                    <p className="text-[10px] text-[#737373] tracking-widest mb-1">OPERATIVE_IDENTIFIER</p>
                    <p className="text-xl font-bold tracking-widest">{user.username}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-[#737373] tracking-widest mb-1">CLEARANCE_CLASSIFICATION</p>
                    <p className="text-xl font-bold tracking-widest text-[#2563eb]">{user.rank}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-[#737373] tracking-widest mb-1">CURRENT_INTELLIGENCE_YIELD</p>
                    <p className="text-xl font-bold tracking-widest text-[#10b981]">{user.score}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-[#737373] tracking-widest mb-1">UPLINK_STATUS</p>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse"></div>
                      <p className="text-sm font-bold tracking-widest text-[#10b981]">ACTIVE_DEPLOYMENT</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Filters */}
              <div>
                <div className="flex items-center gap-4 mb-4">
                  <p className="text-[10px] text-[#2563eb] tracking-widest uppercase">OPERATIONAL_THEATRE_REGISTRY</p>
                  <div className="h-[1px] flex-1 bg-[#222]"></div>
                </div>
                
                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={() => setActiveCategory('ALL_DATA_FILES')}
                    className={`px-4 py-2 text-[10px] font-bold tracking-widest rounded border transition-colors ${activeCategory === 'ALL_DATA_FILES' ? 'bg-[#2563eb] text-white border-[#2563eb]' : 'bg-[#111] text-[#737373] border-[#333] hover:border-[#555] hover:text-[#e5e5e5]'}`}
                  >
                    [ ALL_DATA_FILES // {puzzles.length} ]
                  </button>
                  {Object.entries(categoryCounts).map(([cat, count]) => (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat as Category)}
                      className={`px-4 py-2 text-[10px] font-bold tracking-widest rounded border transition-colors ${activeCategory === cat ? 'bg-[#2563eb] text-white border-[#2563eb]' : 'bg-[#111] text-[#737373] border-[#333] hover:border-[#555] hover:text-[#e5e5e5]'}`}
                    >
                      [ {cat} // {count} ]
                    </button>
                  ))}
                </div>
              </div>

              {/* Puzzle Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {filteredPuzzles.map((puzzle) => {
                  const isSolved = user.solvedPuzzles.includes(puzzle.id);
                  const difficultyColor = puzzle.difficulty === 'EASY' ? 'text-[#10b981] border-[#10b981]/30' :
                                          puzzle.difficulty === 'MEDIUM' ? 'text-[#eab308] border-[#eab308]/30' :
                                          'text-[#ef4444] border-[#ef4444]/30';

                  return (
                    <motion.div
                      key={puzzle.id}
                      whileHover={{ scale: 1.01 }}
                      className={`bg-[#111] border ${isSolved ? 'border-[#10b981]/30' : 'border-[#222]'} rounded-xl p-6 flex flex-col relative overflow-hidden group`}
                    >
                      {isSolved && (
                        <div className="absolute top-0 right-0 w-16 h-16 bg-[#10b981]/10 flex items-center justify-center rounded-bl-3xl">
                          <CheckCircle2 className="w-6 h-6 text-[#10b981]" />
                        </div>
                      )}
                      
                      <div className="flex justify-between items-start mb-6">
                        <div className={`p-2 rounded-lg ${isSolved ? 'bg-[#10b981]/10' : 'bg-[#2563eb]/10'}`}>
                          {isSolved ? <Unlock className={`w-5 h-5 text-[#10b981]`} /> : <Lock className="w-5 h-5 text-[#2563eb]" />}
                        </div>
                        <div className="text-right">
                          <p className="text-[8px] text-[#737373] tracking-widest mb-1">CLASSIFICATION_PRIORITY</p>
                          <span className={`text-[9px] font-bold tracking-widest px-2 py-1 rounded border ${difficultyColor}`}>
                            {puzzle.difficulty}_SENSITIVE
                          </span>
                        </div>
                      </div>

                      <h3 className="text-lg font-bold text-white mb-3 font-sans tracking-wide">{puzzle.title}</h3>
                      <p className="text-sm text-[#a3a3a3] font-sans line-clamp-2 mb-8 flex-1">{puzzle.description}</p>

                      <div className="flex justify-between items-end mt-auto">
                        <div>
                          <p className="text-[8px] text-[#737373] tracking-widest mb-1">REGISTRY_ID</p>
                          <p className="text-[10px] text-[#a3a3a3] tracking-widest">{puzzle.id}</p>
                        </div>
                        <button 
                          onClick={() => { setActivePuzzle(puzzle); setView('puzzle'); }}
                          className={`text-xs font-bold tracking-widest flex items-center gap-1 transition-colors ${isSolved ? 'text-[#10b981] hover:text-[#34d399]' : 'text-[#2563eb] hover:text-[#60a5fa]'}`}
                        >
                          {isSolved ? 'REVIEW_DECRYPT' : 'EXECUTE_DECRYPT'} <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
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
                className="flex items-center gap-2 text-[#737373] hover:text-[#e5e5e5] text-xs font-bold tracking-widest mb-8 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" /> DISENGAGE_REMOTE_UPLINK
              </button>

              <div className="bg-[#111] border border-[#222] rounded-xl p-8 relative overflow-hidden">
                {/* Header */}
                <div className="flex justify-between items-center mb-8 border-b border-[#222] pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-[#2563eb]"></div>
                    <span className="text-[10px] text-[#737373] font-bold tracking-widest uppercase">ACTIVE_MISSION_REGISTRY <span className="mx-2">|</span> {activePuzzle.id}</span>
                  </div>
                  <span className="text-[10px] text-[#ef4444] font-bold tracking-widest">[{activePuzzle.difficulty}_PRIORITY_LEVEL]</span>
                </div>

                <div className="flex justify-between items-start mb-8">
                  <h2 className="text-3xl font-black text-white font-sans tracking-wide uppercase">{activePuzzle.title}</h2>
                  <HintButton hint={activePuzzle.hint} />
                </div>

                <div className="border-l-2 border-[#2563eb] pl-4 mb-12">
                  <p className="text-sm text-[#2563eb] font-bold tracking-widest mb-2">{'>'} BRIEFING:</p>
                  <p className="text-base text-[#a3a3a3] font-sans italic leading-relaxed">{activePuzzle.description}</p>
                </div>

                <PuzzleSolver 
                  puzzle={activePuzzle} 
                  isSolved={user.solvedPuzzles.includes(activePuzzle.id)}
                  onSolved={(points) => handleSolve(activePuzzle.id, points)} 
                />

                {/* Footer Progress */}
                <div className="mt-12 pt-4 border-t border-[#222] flex justify-between items-center text-[9px] font-bold tracking-widest">
                  <span className="text-[#10b981]">DISK_WRITE: OK</span>
                  <span className="text-[#2563eb]">0X4F92_ACCESS_GRANTED</span>
                  <span className="text-[#737373]">KERNEL_V4.0.2_STABLE</span>
                </div>
                <div className="w-full h-1 bg-[#222] mt-2 flex">
                  <div className="h-full bg-[#2563eb] w-2/3"></div>
                  <div className="h-full bg-[#10b981] w-1/6"></div>
                </div>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </main>

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
      <div className="bg-[#eab308]/10 border border-[#eab308]/30 text-[#eab308] p-3 rounded text-xs max-w-xs">
        <span className="font-bold tracking-widest block mb-1">DECRYPTED_HINT:</span>
        <span className="font-sans">{hint}</span>
      </div>
    );
  }

  return (
    <button 
      onClick={() => setShow(true)}
      className="px-4 py-2 border border-[#eab308] text-[#eab308] text-[10px] font-bold tracking-widest rounded hover:bg-[#eab308]/10 transition-colors"
    >
      AUTHORIZE_HINT
    </button>
  );
}

function PuzzleSolver({ puzzle, isSolved, onSolved }: { puzzle: Puzzle, isSolved: boolean, onSolved: (points: number) => void }) {
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
    <div className="bg-[#0a0a0a] border border-[#222] rounded-xl p-6 relative">
      <div className="flex justify-between items-center mb-6">
        <span className="text-[10px] text-[#737373] font-bold tracking-widest">DECRYPTION_COMMAND_INPUT</span>
        <div className="flex items-center gap-2 bg-[#2563eb]/10 px-2 py-1 rounded border border-[#2563eb]/30">
          <span className="text-[9px] text-[#2563eb] font-bold tracking-widest">READY</span>
          <Cpu className="w-3 h-3 text-[#2563eb]" />
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="relative">
          <input
            type="text"
            value={isSolved ? puzzle.answer : answer}
            onChange={(e) => setAnswer(e.target.value)}
            disabled={isSolved || status === 'checking'}
            className={`w-full bg-[#111] border-2 ${status === 'incorrect' ? 'border-[#ef4444]' : status === 'correct' ? 'border-[#10b981]' : 'border-[#2563eb]/50 focus:border-[#2563eb]'} rounded-lg p-4 text-center text-xl font-bold text-white tracking-[0.2em] focus:outline-none transition-colors disabled:opacity-50`}
            placeholder={isSolved ? "" : ". . ."}
          />
          {status === 'incorrect' && (
            <div className="absolute -bottom-6 left-0 right-0 text-center text-[10px] text-[#ef4444] tracking-widest font-bold">
              ACCESS DENIED. INVALID DECRYPTION KEY.
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={isSolved || status === 'checking' || !answer.trim()}
          className={`w-full py-4 rounded-lg font-bold tracking-widest text-xs flex items-center justify-center gap-3 transition-all ${
            isSolved 
              ? 'bg-[#10b981]/20 text-[#10b981] border border-[#10b981]/50 cursor-default' 
              : status === 'checking'
                ? 'bg-[#2563eb]/50 text-white cursor-wait'
                : 'bg-[#2563eb] hover:bg-[#1d4ed8] text-white shadow-[0_0_20px_rgba(37,99,235,0.3)]'
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

function Login({ onLogin }: { onLogin: (username: string) => void }) {
  const [username, setUsername] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      onLogin(username.trim());
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#e5e5e5] flex items-center justify-center font-mono p-4 relative overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.02]"></div>
      
      <div className="max-w-md w-full bg-[#111] border border-[#222] p-8 rounded-2xl shadow-2xl relative z-10">
        <div className="flex justify-center mb-8">
          <div className="p-4 border border-[#2563eb]/30 rounded-2xl bg-[#2563eb]/10 relative">
            <div className="absolute inset-0 bg-[#2563eb] blur-xl opacity-20 rounded-2xl"></div>
            <Shield className="w-12 h-12 text-[#2563eb] relative z-10" />
          </div>
        </div>
        
        <div className="text-center mb-10">
          <h1 className="text-xl font-bold tracking-[0.2em] mb-2">INTELLIGENCE_AUTHORITY</h1>
          <p className="text-[10px] text-[#737373] tracking-widest">SECURE TERMINAL LOGIN // NODE_01</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-[10px] text-[#2563eb] font-bold tracking-widest mb-2">OPERATIVE_IDENTIFIER</label>
            <input 
              type="text" 
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-[#0a0a0a] border border-[#333] rounded-lg p-4 text-[#e5e5e5] focus:outline-none focus:border-[#2563eb] transition-colors font-bold tracking-widest uppercase"
              placeholder="ENTER CODENAME"
              maxLength={15}
            />
          </div>
          <button 
            type="submit"
            className="w-full bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-bold tracking-widest text-xs py-4 rounded-lg transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(37,99,235,0.2)]"
          >
            <Unlock className="w-4 h-4" /> INITIATE_UPLINK
          </button>
        </form>
        
        <div className="mt-8 pt-6 border-t border-[#222] text-center">
          <div className="flex items-center justify-center gap-2 text-[#737373] text-[9px] tracking-widest">
            <AlertTriangle className="w-3 h-3" />
            <span>UNAUTHORIZED ACCESS IS STRICTLY PROHIBITED</span>
          </div>
        </div>
      </div>
    </div>
  );
}

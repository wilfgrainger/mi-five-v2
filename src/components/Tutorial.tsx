import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Shield, Map, MessageSquare, Briefcase, ScanLine, Search, Unlock, Eye, ArrowRight, CheckCircle2 } from 'lucide-react';

interface TutorialProps {
  onComplete: () => void;
}

export default function Tutorial({ onComplete }: TutorialProps) {
  const [step, setStep] = useState(0);
  const [subStep, setSubStep] = useState(0);

  const nextStep = () => {
    setStep(prev => prev + 1);
    setSubStep(0);
  };

  const skipTutorial = () => {
    if (window.confirm("Are you sure you want to skip orientation? This is highly irregular.")) {
      onComplete();
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-[#f5f5f5] font-sans selection:bg-[#3b82f6] selection:text-white overflow-hidden flex flex-col relative pb-safe pt-safe">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#3b82f6]/5 via-[#050505] to-[#050505] pointer-events-none z-0"></div>
      
      {/* Header */}
      <header className="border-b border-white/5 p-4 flex justify-between items-center bg-[#050505]/80 backdrop-blur-xl z-50">
        <div className="flex items-center gap-4">
          <div className="p-2 border border-[#3b82f6]/20 rounded-xl bg-gradient-to-b from-[#3b82f6]/20 to-transparent shadow-[0_0_15px_rgba(59,130,246,0.15)]">
            <Shield className="w-6 h-6 text-[#3b82f6]" />
          </div>
          <div>
            <h1 className="text-sm font-bold tracking-widest text-white font-sans uppercase">HOW TO PLAY</h1>
            <p className="text-[10px] text-[#3b82f6] tracking-widest mt-0.5 font-mono uppercase">Mission 0 // The Academy</p>
          </div>
        </div>
        <button onClick={skipTutorial} className="text-[10px] text-[#a3a3a3] hover:text-white font-mono tracking-widest border border-white/10 px-3 py-1.5 rounded-md hover:bg-white/5 transition-colors">
          SKIP
        </button>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 relative z-10 flex flex-col">
        <AnimatePresence mode="wait">
          {step === 0 && <Module1 key="m1" onComplete={nextStep} subStep={subStep} setSubStep={setSubStep} />}
          {step === 1 && <Module2 key="m2" onComplete={nextStep} subStep={subStep} setSubStep={setSubStep} />}
          {step === 2 && <Module3 key="m3" onComplete={nextStep} subStep={subStep} setSubStep={setSubStep} />}
          {step === 3 && <Module4 key="m4" onComplete={nextStep} subStep={subStep} setSubStep={setSubStep} />}
          {step === 4 && <Module5 key="m5" onComplete={onComplete} subStep={subStep} setSubStep={setSubStep} />}
        </AnimatePresence>
      </main>
    </div>
  );
}

// Module 1: Secure Login & Navigation
function Module1({ onComplete, subStep, setSubStep }: any) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex-1 flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center p-6">
        {subStep === 0 && (
          <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="text-center">
            <div 
              className="w-24 h-24 rounded-full border-2 border-[#3b82f6] flex items-center justify-center mx-auto mb-8 cursor-pointer relative group bg-[#3b82f6]/5 hover:bg-[#3b82f6]/10 transition-colors shadow-[0_0_20px_rgba(59,130,246,0.1)]"
              onClick={() => {
                if (navigator.vibrate) navigator.vibrate(50);
                setSubStep(1);
              }}
            >
              <Shield className="w-12 h-12 text-[#3b82f6]" />
            </div>
            <p className="text-sm text-[#a3a3a3] font-mono tracking-widest uppercase">Tap to start</p>
          </motion.div>
        )}
        {subStep === 1 && (
          <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="text-center">
            <CheckCircle2 className="w-16 h-16 text-[#10b981] mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-white mb-2 tracking-widest">CONNECTED</h2>
            <p className="text-sm text-[#10b981] font-mono tracking-widest mb-8">SECURE CHANNEL ACTIVE</p>
            <button onClick={() => setSubStep(2)} className="px-6 py-3 bg-[#3b82f6] text-white rounded-xl font-bold tracking-widest text-xs">CONTINUE</button>
          </motion.div>
        )}
        {subStep === 2 && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md text-center">
            <div className="bg-[#111] border border-white/10 rounded-2xl p-6 mb-8">
              <p className="text-lg text-white mb-4">"Welcome to the Academy, Rookie. I'm your teacher. Your first test is simple: find your way around. Tap the Missions icon to open your first task."</p>
            </div>
          </motion.div>
        )}
      </div>

      {/* Mock Navigation Bar */}
      <div className="bg-[#0a0a0a] border-t border-white/10 p-4 pb-safe flex justify-around items-center relative">
        <NavIcon icon={<Briefcase />} label="MISSIONS" active={subStep === 2} onClick={() => subStep === 2 && onComplete()} />
        <NavIcon icon={<Map />} label="MAP" />
        <NavIcon icon={<MessageSquare />} label="COMMS" />
        <NavIcon icon={<ScanLine />} label="GADGET LAB" />
      </div>
    </motion.div>
  );
}

function NavIcon({ icon, label, active, onClick }: any) {
  return (
    <div 
      className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-all ${active ? 'text-[#3b82f6] bg-[#3b82f6]/10 cursor-pointer animate-pulse' : 'text-[#555] opacity-50'}`}
      onClick={onClick}
    >
      {React.cloneElement(icon, { className: 'w-6 h-6' })}
      <span className="text-[9px] font-bold tracking-widest font-mono">{label}</span>
    </div>
  );
}

// Module 2: Observation
function Module2({ onComplete, subStep, setSubStep }: any) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex-1 flex flex-col">
      <div className="p-6 bg-[#111] border-b border-white/10">
        <p className="text-sm text-white">"Looking closely is your best skill. We are watching a secret drop-off. Tap the strange object."</p>
      </div>
      <div className="flex-1 relative bg-black overflow-hidden flex items-center justify-center">
        {/* Mock Surveillance Image */}
        <div className="relative w-full max-w-sm aspect-[3/4] bg-[#1a1a1a] border border-white/5 overflow-hidden">
          <img src="https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&q=80&w=800" alt="London Street" className="w-full h-full object-cover opacity-50 grayscale" />
          
          {/* The Anomaly */}
          <div 
            className="absolute top-[60%] left-[30%] w-12 h-12 rounded-full border-2 border-transparent hover:border-red-500/50 cursor-pointer flex items-center justify-center"
            onClick={() => {
              if (navigator.vibrate) navigator.vibrate(50);
              setSubStep(1);
            }}
          >
            {subStep === 0 && <div className="w-4 h-4 rounded-full bg-white/20 animate-ping"></div>}
            {subStep === 1 && <div className="w-6 h-6 border-2 border-red-500 rounded-full"></div>}
          </div>
        </div>
      </div>
      {subStep === 1 && (
        <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="p-6 bg-[#0a0a0a] border-t border-white/10 text-center pb-safe">
          <p className="text-[#10b981] font-mono tracking-widest mb-4">TARGET ACQUIRED</p>
          <button onClick={onComplete} className="w-full py-4 bg-[#3b82f6] text-white rounded-xl font-bold tracking-widest text-xs">PROCEED TO CRYPTO</button>
        </motion.div>
      )}
    </motion.div>
  );
}

// Module 3: Codebreaking
function Module3({ onComplete, subStep, setSubStep }: any) {
  const [answer, setAnswer] = useState('');
  const [error, setError] = useState(false);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex-1 flex flex-col p-6">
      <div className="bg-[#111] border border-white/10 rounded-2xl p-6 mb-8">
        <p className="text-sm text-white mb-4">"We found a secret code. Each letter is moved 3 places forward (A becomes D). Can you solve this code: 'KHOOR'?"</p>
        <div className="bg-black p-4 rounded-xl text-center border border-white/5">
          <p className="text-2xl font-mono tracking-[0.5em] text-[#3b82f6]">KHOOR</p>
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center">
        {/* Mock Cipher Wheel Visual */}
        <div className="w-48 h-48 rounded-full border-4 border-[#333] flex items-center justify-center relative mb-8">
          <div className="absolute inset-0 rounded-full border-4 border-[#555] m-4 flex items-center justify-center">
            <span className="text-2xl font-bold text-[#555]">A=D</span>
          </div>
        </div>

        <input
          type="text"
          value={answer}
          onChange={(e) => { setAnswer(e.target.value.toUpperCase()); setError(false); }}
          placeholder="ENTER PLAINTEXT"
          className={`w-full max-w-xs bg-[#111] border-2 ${error ? 'border-[#ef4444]' : 'border-white/10 focus:border-[#3b82f6]'} rounded-xl p-4 text-center text-xl font-bold tracking-widest text-white font-mono outline-none`}
        />
        {error && (
          <p className="mt-3 text-[10px] text-[#ef4444] font-mono tracking-widest uppercase font-bold">INCORRECT DECRYPTION. TRY AGAIN!</p>
        )}
      </div>

      <div className="mt-auto pt-6 pb-safe">
        <button 
          onClick={() => {
            if (answer === 'HELLO') onComplete();
            else setError(true);
          }}
          className="w-full py-4 bg-[#3b82f6] text-white rounded-xl font-bold tracking-widest text-xs"
        >
          SUBMIT DECRYPTION
        </button>
      </div>
    </motion.div>
  );
}

// Module 4: Gadgets
function Module4({ onComplete, subStep, setSubStep }: any) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex-1 flex flex-col p-6">
      <div className="bg-[#111] border border-white/10 rounded-2xl p-6 mb-8">
        <p className="text-sm text-white">"We think there is a hidden message on this postcard. Use the UV Light to find the secret ink."</p>
      </div>

      <div className="flex-1 relative flex items-center justify-center">
        <div className="w-full max-w-sm aspect-[4/3] bg-[#fdfbf7] rounded-lg shadow-xl relative overflow-hidden flex items-center justify-center border border-[#e5e5e5]">
          <p className="text-gray-800 font-serif text-2xl italic">Greetings from Paris!</p>
          
          {/* Stamp Area */}
          <div className="absolute top-4 right-4 w-12 h-16 border-2 border-dashed border-gray-400 flex items-center justify-center">
            {subStep === 1 && <span className="text-[8px] font-mono text-purple-600 font-bold rotate-90">0X4F92</span>}
          </div>

          {/* UV Overlay */}
          {subStep === 1 && <div className="absolute inset-0 bg-purple-900/40 mix-blend-multiply pointer-events-none"></div>}
        </div>
      </div>

      <div className="mt-auto pt-6 pb-safe flex justify-center gap-4">
        {subStep === 0 ? (
          <button 
            onClick={() => {
              if (navigator.vibrate) navigator.vibrate(50);
              setSubStep(1);
            }}
            className="flex items-center gap-2 px-6 py-4 bg-purple-600 text-white rounded-xl font-bold tracking-widest text-xs shadow-[0_0_15px_rgba(147,51,234,0.5)]"
          >
            <Eye className="w-5 h-5" /> ACTIVATE UV SCANNER
          </button>
        ) : (
          <button 
            onClick={onComplete}
            className="w-full py-4 bg-[#3b82f6] text-white rounded-xl font-bold tracking-widest text-xs"
          >
            LOG MICRODOT DATA
          </button>
        )}
      </div>
    </motion.div>
  );
}

// Module 5: Final Exam
function Module5({ onComplete, subStep, setSubStep }: any) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex-1 flex flex-col p-6 items-center justify-center text-center">
      <div className="w-24 h-24 bg-[#10b981]/20 rounded-full flex items-center justify-center mb-8 border border-[#10b981]/50 shadow-[0_0_30px_rgba(16,185,129,0.3)]">
        <Shield className="w-12 h-12 text-[#10b981]" />
      </div>
      <h2 className="text-3xl font-bold text-white mb-4 tracking-widest uppercase">TRAINING COMPLETE</h2>
      <p className="text-[#a3a3a3] mb-12 max-w-md leading-relaxed">
        "You've learned the basics, Rookie. The real missions start now. Remember: stay sharp, check everything, and have fun."
      </p>
      <button 
        onClick={onComplete}
        className="w-full max-w-xs py-4 bg-gradient-to-r from-[#10b981] to-[#059669] text-white rounded-xl font-bold tracking-widest text-xs shadow-[0_0_20px_rgba(16,185,129,0.4)] flex items-center justify-center gap-2"
      >
        START YOUR MISSIONS <ArrowRight className="w-4 h-4" />
      </button>
    </motion.div>
  );
}

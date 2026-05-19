import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Zap, 
  ShieldCheck, 
  User, 
  Download, 
  Terminal as TerminalIcon, 
  Cpu, 
  Activity, 
  ChevronRight, 
  Lock,
  ArrowLeft,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';
import { BLOX_FRUITS, Fruit, Rarity } from './data/fruits';

// Focus on Top Fruits (Mythicals/Legendaries)
const TOP_FRUITS = BLOX_FRUITS.filter(f => f.rarity === Rarity.MYTHICAL || f.rarity === Rarity.LEGENDARY);

type FlowStep = 'SELECTION' | 'ACCOUNT' | 'INJECTING' | 'SUCCESS';

export default function App() {
  const [step, setStep] = useState<FlowStep>('SELECTION');
  const [selectedFruit, setSelectedFruit] = useState<Fruit | null>(null);
  const [username, setUsername] = useState('');
  const [logs, setLogs] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);
  const [auditReport, setAuditReport] = useState<string | null>(null);

  // Simulated Log messages for Step 3
  const LOG_MESSAGES = [
    "INITIALIZING BYPASS...",
    "HANDSHAKING WITH SERVER...",
    "SCANNING ACCOUNT DATABASE...",
    "ENCRYPTING TRAFFIC...",
    "FOUND USER: ",
    "LOCATING DATA NODES...",
    "INJECTING FRUIT PACKAGE...",
    "BYPASSING ANTICHEAT...",
    "FINALIZING VALUES...",
    "SYNCING WITH CLOUD..."
  ];

  const startInjection = useCallback(async () => {
    if (!username) return;
    setStep('INJECTING');
    setLogs([]);
    setProgress(0);
    setAuditReport(null);

    // Fetch AI Audit in background
    fetch('/api/oracle', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ fruitName: selectedFruit?.name, rarity: selectedFruit?.rarity })
    }).then(res => res.json()).then(data => setAuditReport(data.prophecy)).catch(() => {});

    let currentLog = 0;
    const interval = setInterval(() => {
      if (currentLog < LOG_MESSAGES.length) {
        let msg = LOG_MESSAGES[currentLog];
        if (msg.includes("FOUND USER")) msg += username.toUpperCase();
        setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] ${msg}`]);
        setProgress((currentLog + 1) * (100 / LOG_MESSAGES.length));
        currentLog++;
      } else {
        clearInterval(interval);
        setTimeout(() => setStep('SUCCESS'), 1000);
      }
    }, 600);
  }, [username, selectedFruit]);

  const reset = () => {
    setStep('SELECTION');
    setSelectedFruit(null);
    setUsername('');
    setLogs([]);
    setProgress(0);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#050505] text-zinc-100 font-sans selection:bg-mythical/30">
      {/* Background Effects */}
      <div className="fixed inset-0 scanlines opacity-10 z-50 pointer-events-none" />
      <div className="fixed inset-0 overflow-hidden opacity-30 z-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[50%] h-[50%] bg-accent/20 blur-[150px] rounded-full" />
        <div className="absolute bottom-1/4 right-1/4 w-[40%] h-[40%] bg-mythical/10 blur-[130px] rounded-full" />
      </div>

      {/* Header */}
      <header className="z-10 p-6 border-b border-white/5 backdrop-blur-md bg-black/40">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center shadow-[0_0_20px_rgba(109,40,217,0.5)]">
              <Zap className="text-white w-6 h-6 fill-current" />
            </div>
            <div>
              <h1 className="text-xl font-black tracking-tighter uppercase italic">BloxDrop Premium</h1>
              <div className="flex items-center gap-2 text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
                <ShieldCheck size={10} className="text-green-500" /> System: Stable v2.4.1
              </div>
            </div>
          </div>
          <div className="hidden md:flex gap-6 text-xs font-bold uppercase tracking-widest text-zinc-400">
            <button className="hover:text-white transition-colors">Mod Menu</button>
            <button className="hover:text-white transition-colors">Server List</button>
            <button className="hover:text-white transition-colors">Supporter</button>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-6xl w-full mx-auto p-6 md:p-12 z-10">
        <AnimatePresence mode="wait">
          {/* STEP 1: FRUIT SELECTION */}
          {step === 'SELECTION' && (
            <motion.div
              key="selection"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              <div className="space-y-2">
                <h2 className="text-4xl md:text-6xl font-black tracking-tight uppercase">
                  Select <span className="text-accent italic">Target</span> Fruit
                </h2>
                <p className="text-zinc-500 max-w-2xl text-lg font-medium leading-relaxed">
                  Choose the fruit group you wish to inject into your account database. 
                  These are high-priority mythical assets.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {TOP_FRUITS.map((fruit) => (
                  <motion.button
                    whileHover={{ scale: 1.02, y: -4 }}
                    whileTap={{ scale: 0.98 }}
                    key={fruit.id}
                    onClick={() => {
                      setSelectedFruit(fruit);
                      setStep('ACCOUNT');
                    }}
                    className={`group relative text-left p-6 rounded-2xl transition-all duration-300 border-2 overflow-hidden ${
                      selectedFruit?.id === fruit.id 
                      ? 'border-accent bg-accent/10' 
                      : 'border-white/5 bg-white/5 hover:border-white/20'
                    }`}
                  >
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                      <img src={fruit.image} alt="" className="w-20 h-20 object-contain" referrerPolicy="no-referrer" />
                    </div>
                    
                    <div className="relative z-10 space-y-4">
                      <div className="flex justify-between items-start">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center overflow-hidden`}
                             style={{ backgroundColor: `${fruit.color}22` }}>
                          <img src={fruit.image} alt={fruit.name} className="w-10 h-10 object-contain p-1" referrerPolicy="no-referrer" />
                        </div>
                        <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded bg-black/40 border border-white/10`}
                              style={{ color: fruit.color }}>
                          {fruit.rarity}
                        </span>
                      </div>
                      
                      <div>
                        <h3 className="text-2xl font-bold uppercase italic">{fruit.name}</h3>
                        <p className="text-zinc-500 text-xs mt-1 line-clamp-1">{fruit.description}</p>
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-white/5">
                        <span className="text-xs font-mono text-zinc-400">Value: ${fruit.price.toLocaleString()}</span>
                        <ChevronRight size={16} className="text-zinc-600 group-hover:text-accent group-hover:translate-x-1 transition-all" />
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          {/* STEP 2: USERNAME INPUT */}
          {step === 'ACCOUNT' && selectedFruit && (
            <motion.div
              key="account"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="max-w-xl mx-auto space-y-8 py-12"
            >
              <button 
                onClick={() => setStep('SELECTION')}
                className="flex items-center gap-2 text-zinc-500 hover:text-white transition-colors text-xs font-bold uppercase tracking-wider"
              >
                <ArrowLeft size={14} /> Back to Selection
              </button>

              <div className="mod-panel p-8 rounded-3xl space-y-6">
                <div className="flex items-center gap-4 p-4 bg-accent/10 border border-accent/20 rounded-2xl">
                  <div className="w-12 h-12 bg-white/5 rounded-lg flex items-center justify-center overflow-hidden border border-white/10">
                    <img src={selectedFruit.image} alt={selectedFruit.name} className="w-10 h-10 object-contain" referrerPolicy="no-referrer" />
                  </div>
                  <div>
                    <p className="text-[10px] font-mono text-accent uppercase font-bold">Target Payload</p>
                    <p className="text-xl font-black uppercase italic">{selectedFruit.name} Fruit</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-zinc-500 flex items-center gap-2">
                      <User size={12} /> Roblox Username
                    </label>
                    <input 
                      autoFocus
                      type="text" 
                      placeholder="ENTER USERNAME..."
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-4 text-xl font-mono focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all placeholder:text-zinc-800"
                    />
                  </div>

                  <div className="p-4 bg-yellow-500/5 border border-yellow-500/20 rounded-xl flex gap-3">
                    <AlertTriangle size={16} className="text-yellow-500 shrink-0" />
                    <p className="text-[10px] text-yellow-500/80 font-medium leading-relaxed">
                      Make sure your username is correct. Incorrect IDs may result in failed injection or temporary cloud suspension.
                    </p>
                  </div>
                </div>

                <button
                  disabled={!username}
                  onClick={startInjection}
                  className="w-full group relative py-6 bg-accent text-white font-black rounded-2xl overflow-hidden hover:scale-[1.02] transition-transform active:scale-95 disabled:opacity-50 disabled:grayscale disabled:pointer-events-none shadow-[0_10px_30px_rgba(109,40,217,0.3)]"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2 text-lg uppercase italic tracking-tighter">
                    Start Account Injection <Download size={20} />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 3: INJECTING ANIMATION */}
          {step === 'INJECTING' && (
            <motion.div
              key="injecting"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="max-w-4xl mx-auto py-12 space-y-10"
            >
              <div className="text-center space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-accent/20 border border-accent/40 rounded-full text-[10px] font-black text-accent uppercase tracking-[0.2em] animate-pulse">
                  <Activity size={10} /> Live Data Stream
                </div>
                <h2 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter">
                  Executing <span className="text-accent">Exploit</span>
                </h2>
              </div>

              {/* Console / Logs */}
              <div className="mod-panel rounded-3xl overflow-hidden border border-white/10">
                <div className="bg-white/5 p-4 border-b border-white/5 flex items-center justify-between">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
                  </div>
                  <div className="text-[10px] font-mono text-zinc-500 flex items-center gap-2 uppercase">
                    <TerminalIcon size={12} /> terminal_v1.sh
                  </div>
                </div>
                
                <div className="p-6 h-[300px] overflow-y-auto font-mono text-xs space-y-2 custom-scrollbar">
                  {logs.map((log, i) => (
                    <motion.div 
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      key={i} 
                      className={`flex gap-3 ${i === logs.length - 1 ? 'text-accent brightness-125' : 'text-zinc-400'}`}
                    >
                      <span className="text-zinc-600">[{i+1}]</span>
                      <span className={i === logs.length - 1 ? 'cursor-blink' : ''}>{log}</span>
                    </motion.div>
                  ))}
                  {logs.length === 0 && (
                    <div className="text-zinc-700 italic">Waiting for stream...</div>
                  )}
                </div>

                <div className="p-4 bg-black/40 border-t border-white/5">
                  <div className="flex justify-between text-[10px] font-mono text-zinc-500 uppercase mb-2">
                    <span>Injection Progress</span>
                    <span>{Math.round(progress)}%</span>
                  </div>
                  <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-accent shadow-[0_0_15px_rgba(109,40,217,0.5)]"
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
              </div>

              {auditReport && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-accent/10 border border-accent/20 rounded-2xl"
                >
                  <p className="text-[10px] text-accent font-black uppercase mb-1 tracking-widest">Oracle System Audit</p>
                  <p className="text-sm italic text-zinc-300 leading-relaxed font-medium">"{auditReport}"</p>
                </motion.div>
              )}

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: 'CPU LOAD', val: '42%' },
                  { label: 'MEM BUFFER', val: '204KB' },
                  { label: 'UDP LATENCY', val: '12ms' },
                  { label: 'ENCRYPTION', val: 'AES-256' }
                ].map((stat, i) => (
                  <div key={i} className="p-4 bg-white/5 border border-white/5 rounded-2xl text-center">
                    <p className="text-[10px] text-zinc-600 font-black uppercase mb-1">{stat.label}</p>
                    <p className="font-mono text-sm font-bold text-zinc-300">{stat.val}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* STEP 4: SUCCESS */}
          {step === 'SUCCESS' && selectedFruit && (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="max-w-xl mx-auto py-12 text-center space-y-10"
            >
              <div className="relative inline-block">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', damping: 12, delay: 0.2 }}
                  className="w-32 h-32 bg-white/5 border border-white/10 rounded-full flex items-center justify-center shadow-[0_0_50px_rgba(255,255,255,0.1)] mx-auto overflow-hidden p-6"
                >
                  <img src={selectedFruit.image} alt="Success" className="w-full h-full object-contain drop-shadow-[0_0_20px_rgba(34,197,94,0.5)]" referrerPolicy="no-referrer" />
                </motion.div>
                <div className="absolute top-0 right-0 animate-ping">
                  <div className="w-8 h-8 bg-green-500 rounded-full opacity-50" />
                </div>
              </div>

              <div className="space-y-4">
                <h2 className="text-5xl font-black uppercase italic tracking-tighter">
                  Injection <span className="text-green-500">Complete</span>
                </h2>
                <div className="bg-white/5 border border-white/5 p-6 rounded-3xl space-y-4 max-w-sm mx-auto">
                  <div className="flex items-center justify-between text-xs font-bold uppercase text-zinc-500">
                    <span>User:</span>
                    <span className="text-white font-mono">{username}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs font-bold uppercase text-zinc-500">
                    <span>Payload:</span>
                    <span className="text-accent italic">{selectedFruit.name}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs font-bold uppercase text-zinc-500">
                    <span>Status:</span>
                    <span className="text-green-500">ACCOUNT SYNCED</span>
                  </div>
                </div>
                <p className="text-zinc-500 text-sm max-w-sm mx-auto leading-relaxed">
                  The fruit data has been successfully injected into the account cloud nodes. 
                  Please wait 5-10 minutes for the servers to sync before logging in.
                </p>
              </div>

              <div className="flex flex-col gap-4">
                <a
                  href="https://saveapp.online/cl/i/d22n61"
                  className="w-full py-5 bg-white text-black font-black rounded-2xl text-lg uppercase italic tracking-tighter hover:scale-[1.02] transition-transform active:scale-95 flex items-center justify-center gap-2"
                >
                  Download Fruit Client <Download size={20} />
                </a>
                <button
                  onClick={reset}
                  className="w-full py-5 border border-white/10 text-white font-black rounded-2xl text-lg uppercase italic tracking-tighter hover:bg-white/5 transition-all"
                >
                  Inject Another Fruit
                </button>
                <a 
                  href="#"
                  className="text-xs font-black text-zinc-600 uppercase tracking-widest hover:text-white transition-colors"
                >
                  Report an issue
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer Info */}
      <footer className="z-10 p-12 mt-auto border-t border-white/5 bg-black/20">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 text-zinc-600">
          <div className="space-y-4">
            <h4 className="text-xs font-black text-white uppercase tracking-widest">About BloxDrop</h4>
            <p className="text-xs leading-relaxed">
              Premium fruit injection service for the Blox Fruits community. 
              Our private server network ensures 99.9% uptime and safety.
              No password required, only UID indexing.
            </p>
          </div>
          <div className="space-y-4">
            <h4 className="text-xs font-black text-white uppercase tracking-widest">Network Status</h4>
            <div className="space-y-2">
              <div className="flex justify-between text-[10px] font-mono">
                <span>US-EAST-1</span>
                <span className="text-green-500">ONLINE</span>
              </div>
              <div className="flex justify-between text-[10px] font-mono">
                <span>EU-CENTRAL-1</span>
                <span className="text-green-500">ONLINE</span>
              </div>
              <div className="flex justify-between text-[10px] font-mono">
                <span>ASIA-PAC-2</span>
                <span className="text-yellow-500">CONGESTED</span>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <h4 className="text-xs font-black text-white uppercase tracking-widest">Recent Activity</h4>
            <div className="flex flex-wrap gap-2">
              {['User92... kitsune', 'KingBr... leopard', 'GamerX... dragon'].map((act, i) => (
                <span key={i} className="text-[9px] font-bold uppercase bg-white/5 px-2 py-1 rounded border border-white/5 whitespace-nowrap">
                  {act}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="max-w-6xl mx-auto mt-12 pt-12 border-t border-white/5 text-[10px] text-center font-mono opacity-50">
          © 2024 BLOXDROP PREMIUM SOLUTIONS. ALL ENCRYPTION BYPASSES ARE FOR EDUCATIONAL USE ONLY.
        </div>
      </footer>
    </div>
  );
}


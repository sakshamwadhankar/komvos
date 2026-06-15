"use client";
import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from 'framer-motion';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { 
  Network, 
  Cpu, 
  Cloud, 
  Lock, 
  Settings2, 
  GitMerge, 
  Terminal, 
  Play, 
  ChevronRight, 
  ArrowRight,
  ShieldCheck,
  Zap,
  Download,
  Map,
  CheckCircle2
} from 'lucide-react';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Brand Colors
const colors = {
  bg: '#e3ece0',
  bgDarker: '#d0dfcb',
  textPrimary: '#0b412b',
  textLight: '#1b6b4a',
  accent: '#105439',
  accentHover: '#0a3a26',
  white: '#f5f8f4'
};

const FadeIn = ({ children, delay = 0, className = "" }: { children: React.ReactNode, delay?: number, className?: string }) => {
  const prefersReduced = useReducedMotion();
  return (
    <motion.div
      initial={prefersReduced ? { opacity: 0 } : { opacity: 0, y: 20 }}
      whileInView={prefersReduced ? { opacity: 1 } : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.7, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const NodeMockup = ({ title, icon: Icon, type, active = false, delay = '0s', className = "" }: any) => (
  <div 
    className={cn(
      "absolute flex items-center p-3 rounded-xl border-2 transition-all duration-700 shadow-lg w-48 z-10 bg-[#f5f8f4]",
      active ? "border-[#105439] shadow-[0_0_20px_rgba(16,84,57,0.5)] scale-105" : "border-[#105439]/20",
      className
    )}
    style={{ animationDelay: delay }}
  >
    <div className={cn(
      "p-2 rounded-lg mr-3",
      type === 'cloud' && "bg-blue-100 text-blue-700",
      type === 'local' && "bg-orange-100 text-orange-700",
      type === 'logic' && "bg-purple-100 text-purple-700"
    )}>
      <Icon size={18} />
    </div>
    <div>
      <h4 className="text-[10px] font-bold uppercase tracking-wider text-[#1b6b4a] mb-0.5">{type}</h4>
      <p className="text-xs font-semibold text-[#0b412b] truncate max-w-[100px]">{title}</p>
    </div>
    <div className="absolute -top-1.5 left-1/2 w-3 h-3 rounded-full bg-[#105439] transform -translate-x-1/2 border-2 border-white shadow-sm" />
    <div className="absolute -bottom-1.5 left-1/2 w-3 h-3 rounded-full bg-[#105439] transform -translate-x-1/2 border-2 border-white shadow-sm" />
  </div>
);

const MouseTiltCard = ({ isAnimating }: { isAnimating: boolean }) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const prefersReducedMotion = useReducedMotion();
  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["12deg", "-12deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-12deg", "12deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current || prefersReducedMotion) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set(mouseX / width - 0.5);
    y.set(mouseY / height - 0.5);
  };

  const handleMouseLeave = () => {
    if (prefersReducedMotion) return;
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: prefersReducedMotion ? 0 : rotateX,
        rotateY: prefersReducedMotion ? 0 : rotateY,
        transformStyle: "preserve-3d",
      }}
      className="relative w-full h-[500px] flex items-center justify-center perspective-[1500px]"
    >
      <div 
        className="relative w-full h-full rounded-2xl border border-white/40 bg-[#f5f8f4]/60 backdrop-blur-md shadow-[0_20px_50px_rgba(11,65,43,0.15)] flex flex-col items-center justify-center transition-shadow duration-500 hover:shadow-[0_30px_60px_rgba(11,65,43,0.25)]"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Background Grid */}
        <div className="absolute inset-0 z-0 rounded-2xl overflow-hidden" style={{ transform: "translateZ(-20px)" }}>
           <div className="absolute inset-0 opacity-[0.08]" style={{ backgroundImage: 'radial-gradient(#105439 1.5px, transparent 1.5px)', backgroundSize: '30px 30px' }}></div>
        </div>

        {/* Mac OS Style App Frame */}
        <div 
          className="absolute w-[90%] h-[80%] rounded-xl shadow-2xl border border-white/60 overflow-hidden bg-[#e3ece0]/90 backdrop-blur-xl flex flex-col pointer-events-none" 
          style={{ transform: "translateZ(30px)" }}
        >
          <div className="h-7 bg-white/40 backdrop-blur flex items-center px-3 gap-1.5 border-b border-white/20">
            <div className="w-2.5 h-2.5 rounded-full bg-red-400"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-400"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-green-400"></div>
            <span className="text-[10px] ml-2 text-[#0b412b]/60 font-bold tracking-wider">Komvos.exe</span>
          </div>
          <div className="flex-1 relative bg-[#d0dfcb]/20">
            {/* User places actual screenshot in public directory */}
            <img src="/komvos-app.png" alt="" className="w-full h-full object-cover mix-blend-overlay opacity-80" onError={(e) => { e.currentTarget.style.opacity = '0'; }} />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center -z-10 p-6">
               <p className="text-[#105439] font-bold text-xs bg-white/60 px-4 py-2 rounded-lg backdrop-blur border border-white/40 shadow-sm">
                 (Add <code>public/komvos-app.png</code> for mockup background)
               </p>
            </div>
          </div>
        </div>
        
        {/* Floating Nodes */}
        <div className="relative w-[400px] h-[300px] pointer-events-none" style={{ transform: "translateZ(80px)" }}>
          {/* Node 1: Solver (Top Left/Center) */}
          <NodeMockup title="OpenAI (GPT-4o)" icon={Cloud} type="cloud" active={isAnimating} className="top-0 left-[104px]" />
          
          {/* Node 2: Verifier (Middle Right) */}
          <NodeMockup title="qwen2.5:3b" icon={Cpu} type="local" active={isAnimating} delay="0.5s" className="top-[120px] left-[208px]" />
          
          {/* Node 3: Judge (Bottom Left/Center) */}
          <NodeMockup title="Judge" icon={Network} type="logic" active={isAnimating} delay="1.5s" className="top-[240px] left-[104px]" />

          <svg className="absolute inset-0 w-full h-full z-[-1] overflow-visible pointer-events-none">
            {/* Solver -> Judge (Straight down) */}
            <path d="M 200 60 L 200 240" fill="none" stroke="#105439" strokeWidth="3" strokeDasharray="6,6" className="opacity-30" />
            
            {/* Solver -> Verifier */}
            <path d="M 200 60 C 200 90, 304 90, 304 120" fill="none" stroke="#105439" strokeWidth="3" strokeDasharray="6,6" className="opacity-30" />
            
            {/* Verifier -> Judge */}
            <path d="M 304 180 C 304 210, 200 210, 200 240" fill="none" stroke="#105439" strokeWidth="3" strokeDasharray="6,6" className="opacity-30" />
            
            {isAnimating && !prefersReducedMotion && (
              <>
                <circle r="6" fill="#105439" className="shadow-[0_0_15px_#105439]">
                  <animateMotion dur="1.5s" repeatCount="1" path="M 200 60 L 200 240" />
                </circle>
                <circle r="6" fill="#105439" className="shadow-[0_0_15px_#105439]">
                  <animateMotion dur="0.8s" repeatCount="1" path="M 200 60 C 200 90, 304 90, 304 120" />
                </circle>
                <circle r="6" fill="#105439" className="shadow-[0_0_15px_#105439]">
                  <animateMotion begin="0.8s" dur="0.7s" repeatCount="1" path="M 304 180 C 304 210, 200 210, 200 240" />
                </circle>
              </>
            )}
          </svg>
        </div>

      </div>
    </motion.div>
  );
};

export default function KomvosLanding() {
  const [isAnimating, setIsAnimating] = useState(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  useEffect(() => {
    // Loop the hero animation
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 3000); // Animation loop
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen font-sans selection:bg-[#105439] selection:text-[#e3ece0] overflow-x-hidden" style={{ backgroundColor: colors.bg, color: colors.textPrimary }}>
      
      {/* Navigation */}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className="fixed top-0 w-full z-50 bg-[#e3ece0]/80 backdrop-blur-lg border-b border-[#0b412b]/10"
      >
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/image.png" alt="Komvos Logo" className="h-10 object-contain" />
          </div>
          <div className="hidden md:flex items-center gap-8 font-semibold text-sm">
            <a href="#features" className="hover:text-[#105439] transition-colors relative group">
              Features
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#105439] transition-all group-hover:w-full"></span>
            </a>
            <a href="#journey" className="hover:text-[#105439] transition-colors relative group">
              How it Works
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#105439] transition-all group-hover:w-full"></span>
            </a>
            <a href="#roadmap" className="hover:text-[#105439] transition-colors relative group">
              Roadmap
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#105439] transition-all group-hover:w-full"></span>
            </a>
          </div>
          <div className="flex items-center gap-4">
            <a href="https://github.com/sakshamwadhankar/Far-Away" target="_blank" rel="noreferrer" className="text-[#1b6b4a] hover:text-[#105439] transition-colors" title="GitHub Repository">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.02c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A4.8 4.8 0 0 0 8 18v4"></path>
              </svg>
            </a>
            <a href="https://github.com/sakshamwadhankar/Far-Away/releases/download/v0.1.0/Komvos.Setup.0.1.0.exe" className="px-6 py-2.5 rounded-full font-bold text-white shadow-[0_10px_20px_rgba(16,84,57,0.2)] hover:shadow-[0_15px_30px_rgba(16,84,57,0.3)] transition-all transform hover:-translate-y-0.5 active:scale-95" style={{ backgroundColor: colors.accent }}>
              Download App
            </a>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 relative overflow-hidden min-h-screen flex items-center">
        {/* Abstract background shapes */}
        <div className="absolute top-20 left-10 w-96 h-96 bg-[#d0dfcb] rounded-full mix-blend-multiply filter blur-[80px] opacity-70 animate-pulse" style={{ animationDuration: '8s' }}></div>
        <div className="absolute bottom-20 right-10 w-[500px] h-[500px] bg-[#c1d6bb] rounded-full mix-blend-multiply filter blur-[100px] opacity-60 animate-pulse" style={{ animationDuration: '10s', animationDelay: '2s' }}></div>

        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center relative z-10 w-full">
          <FadeIn className="space-y-8">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/40 backdrop-blur border border-white/60 text-sm font-bold shadow-sm"
            >
              <span className="w-2 h-2 rounded-full bg-[#105439] animate-ping relative">
                 <span className="absolute inset-0 rounded-full bg-[#105439]"></span>
              </span>
              The Hybrid Compute Canvas
            </motion.div>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.1]">
              Visual ease. <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#105439] via-[#1b6b4a] to-[#2a875f] bg-[length:200%_auto] animate-gradient">Frontier power.</span><br/>
              Local privacy.
            </h1>
            <p className="text-lg md:text-xl font-medium opacity-80 max-w-lg leading-relaxed text-[#1b6b4a]">
              Stop choosing between expensive cloud multi-agent systems and clunky local terminal scripts. Visually orchestrate Cloud APIs (OpenAI, Anthropic, Google) and local Ollama models in one powerful desktop application.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <a href="https://github.com/sakshamwadhankar/Far-Away/releases/download/v0.1.0/Komvos.Setup.0.1.0.exe" className="flex items-center justify-center gap-2 px-8 py-4 rounded-full font-bold text-white text-lg shadow-[0_15px_30px_rgba(16,84,57,0.3)] hover:shadow-[0_20px_40px_rgba(16,84,57,0.4)] transition-all hover:-translate-y-1 relative overflow-hidden group" style={{ backgroundColor: colors.accent }}>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></div>
                <Download size={20} className="relative z-10 animate-bounce" /> <span className="relative z-10">Download Setup (v0.1.0)</span>
              </a>
              <button onClick={() => setIsVideoModalOpen(true)} className="flex items-center justify-center gap-2 px-8 py-4 rounded-full font-bold border-2 bg-white/20 backdrop-blur transition-all hover:bg-white/40" style={{ borderColor: colors.accent, color: colors.accent }}>
                <Play size={20} fill="currentColor" /> Preview
              </button>
            </div>
          </FadeIn>

          <FadeIn delay={0.2} className="relative w-full h-[500px]">
            <MouseTiltCard isAnimating={isAnimating} />
          </FadeIn>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 bg-[#d0dfcb]/60 relative">
        <div className="absolute inset-0 bg-white/20 backdrop-blur-3xl -z-10"></div>
        <div className="max-w-7xl mx-auto px-6">
          <FadeIn className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-extrabold mb-4">The Goldilocks Zone of AI</h2>
            <p className="text-lg font-medium text-[#1b6b4a]">No complicated cloud setup required. Build compound, agentic systems that run exactly where you need them—in the cloud, or right on your desk.</p>
          </FadeIn>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Network,
                title: "Visual Orchestration",
                desc: "Like Blender's node editor for AI. Drag, drop, and wire up complex logic loops, routing nodes, and multiple models seamlessly in Edit mode, then chat in Use mode."
              },
              {
                icon: Zap,
                title: "Desktop-Native Engine",
                desc: "Powered by Python and FastAPI running locally as a packaged desktop app. Built-in SQLite tracing tracks every token and cost without a centralized server."
              },
              {
                icon: ShieldCheck,
                title: "Local Models via Ollama",
                desc: "Run open-weights models like qwen2.5:3b securely on your own hardware via Ollama. True local privacy with per-run budget caps and a built-in kill switch."
              }
            ].map((feature, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-sm border border-white hover:shadow-[0_20px_40px_rgba(11,65,43,0.1)] transition-all cursor-default"
              >
                <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 shadow-inner" style={{ backgroundColor: colors.accent, color: colors.white }}>
                  <feature.icon size={28} />
                </div>
                <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
                <p className="text-[#1b6b4a] font-medium leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Building Blocks */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <FadeIn className="mb-16">
          <h2 className="text-4xl font-extrabold mb-4">Powerful Building Blocks</h2>
          <p className="text-lg font-medium text-[#1b6b4a] max-w-2xl">Snap together diverse nodes to craft pipelines that reason, verify, and execute flawlessly.</p>
        </FadeIn>

        <div className="grid lg:grid-cols-2 gap-8">
          <FadeIn delay={0.1}>
            <div className="p-8 rounded-3xl border border-[#105439]/20 bg-gradient-to-br from-[#f5f8f4] to-[#e3ece0] h-full shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-center gap-3 mb-6">
                <Cpu className="text-[#105439]" size={32} />
                <h3 className="text-2xl font-bold">Compute Nodes</h3>
              </div>
              <div className="space-y-4">
                <div className="p-5 bg-white/80 backdrop-blur rounded-xl shadow-sm border border-white hover:border-[#105439]/30 transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold flex items-center gap-2"><Cloud size={16} className="text-blue-600"/> Cloud API</span>
                    <span className="text-xs bg-blue-100 text-blue-800 px-2.5 py-1 rounded-md font-bold uppercase tracking-wider">REST</span>
                  </div>
                  <p className="text-sm text-[#1b6b4a] font-medium">Configurable for OpenAI, Anthropic, and Google. Securely uses API keys stored in your OS keychain.</p>
                </div>
                <div className="p-5 bg-white/80 backdrop-blur rounded-xl shadow-sm border border-white hover:border-[#105439]/30 transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold flex items-center gap-2"><Lock size={16} className="text-orange-600"/> Ollama Local</span>
                    <span className="text-xs bg-orange-100 text-orange-800 px-2.5 py-1 rounded-md font-bold uppercase tracking-wider">Localhost</span>
                  </div>
                  <p className="text-sm text-[#1b6b4a] font-medium">Connects directly to your local Ollama instance. Runs models like qwen2.5:3b privately and for free.</p>
                </div>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="p-8 rounded-3xl border border-[#105439]/20 bg-gradient-to-br from-[#f5f8f4] to-[#e3ece0] h-full shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-center gap-3 mb-6">
                <GitMerge className="text-[#105439]" size={32} />
                <h3 className="text-2xl font-bold">Logic & Templates</h3>
              </div>
              <div className="space-y-4">
                <div className="p-5 bg-white/80 backdrop-blur rounded-xl shadow-sm border border-white hover:border-[#105439]/30 transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold">Core Logic Nodes</span>
                  </div>
                  <p className="text-sm text-[#1b6b4a] font-medium">Includes Loop, Judge, Router, Transform, and Compare nodes to build custom control flows and logic validation.</p>
                </div>
                <div className="p-5 bg-white/80 backdrop-blur rounded-xl shadow-sm border border-white hover:border-[#105439]/30 transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold">10 Built-in Templates</span>
                  </div>
                  <p className="text-sm text-[#1b6b4a] font-medium">Get started instantly with templates like Debate, Ensemble Voting, RAG Pipeline, Language Translator, and Multi-Perspective.</p>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Journey */}
      <section id="journey" className="py-24 bg-[#0b412b] text-[#e3ece0] relative overflow-hidden">
        {/* Subtle grid in dark section */}
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <FadeIn className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-extrabold mb-4 text-[#e3ece0]">Build a Solver → Verifier → Judge Pipeline</h2>
            <p className="text-lg font-medium text-[#c1d6bb]">See how easy it is to visually architect advanced reasoning algorithms.</p>
          </FadeIn>

          <div className="space-y-12 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-[#e3ece0]/20 before:to-transparent">
            
            {[
              { step: '01', title: 'Drafting', desc: 'Drag a Cloud Node onto the canvas. Select "OpenAI" (or Anthropic/Google) and name it Solver.' },
              { step: '02', title: 'Verifying', desc: 'Drag a Local Node, select "qwen2.5:3b" via Ollama, and wire the Solver\'s output into it for secondary validation.' },
              { step: '03', title: 'Judging', desc: 'Add a Judge Node. Connect outputs from BOTH previous nodes to synthesize the ultimate verified answer.' },
              { step: '04', title: 'Execution', desc: 'Click "Run". Watch the live execution monitor stream tokens and track costs, safely bounded by your per-run budget cap.' },
            ].map((item, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.6, delay: 0.2, type: "spring", stiffness: 100 }}
                className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active"
              >
                <div className="flex items-center justify-center w-12 h-12 rounded-full border-4 border-[#0b412b] bg-[#105439] text-white font-bold shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-[0_0_20px_rgba(16,84,57,0.8)] z-10 transition-transform group-hover:scale-110">
                  {item.step}
                </div>
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] p-8 rounded-2xl bg-[#105439]/30 border border-[#e3ece0]/10 backdrop-blur-md hover:bg-[#105439]/50 hover:border-[#e3ece0]/30 transition-all shadow-xl">
                  <h4 className="text-xl font-bold mb-3 text-white flex items-center gap-2">
                    {item.title}
                  </h4>
                  <p className="font-medium text-[#c1d6bb] leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
            
          </div>
        </div>
      </section>

      {/* Architecture */}
      <section id="architecture" className="py-24 bg-gradient-to-b from-[#d0dfcb] to-[#e3ece0]">
        <FadeIn className="max-w-4xl mx-auto px-6 text-center">
          <motion.div 
            whileHover={{ rotate: 180 }} 
            transition={{ duration: 0.6 }}
            className="inline-block"
          >
            <Terminal size={48} className="mx-auto mb-6 text-[#105439]" />
          </motion.div>
          <h2 className="text-4xl font-extrabold mb-6">Built for the Modern AI Developer</h2>
          <p className="text-xl font-medium text-[#1b6b4a] mb-12 leading-relaxed">
            Komvos isn't just a UI wrapper. It's a complete paradigm shift. We deliver a fully packaged desktop app powered by an Electron, React, and TypeScript frontend, paired with a Python and FastAPI backend that auto-starts instantly. No terminal scripts, no cloud orchestrator lock-in. Create, run, and even export pipelines with your API secrets automatically scrubbed.
          </p>
          <a href="https://github.com/sakshamwadhankar/Far-Away/releases/download/v0.1.0/Komvos.Setup.0.1.0.exe" className="inline-flex items-center justify-center gap-3 px-10 py-5 rounded-full font-bold text-white text-xl shadow-[0_15px_30px_rgba(11,65,43,0.3)] hover:shadow-[0_20px_40px_rgba(11,65,43,0.4)] transition-all hover:-translate-y-1 active:scale-95 group" style={{ backgroundColor: colors.textPrimary }}>
            Download Windows App 
            <motion.div className="group-hover:translate-y-1 transition-transform">
              <Download size={24} />
            </motion.div>
          </a>
        </FadeIn>
      </section>

      {/* Roadmap */}
      <section id="roadmap" className="py-24 bg-[#f5f8f4] border-t border-[#0b412b]/5">
        <div className="max-w-7xl mx-auto px-6">
          <FadeIn className="flex items-center justify-center gap-4 mb-16">
            <Map className="text-[#105439]" size={40} />
            <h2 className="text-4xl font-extrabold text-center text-[#0b412b]">Future Roadmap</h2>
          </FadeIn>
          
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { phase: "Coming Soon", title: "Distributed Local via Exo", desc: "Currently in development: pool your laptop, desktop, and local network devices via Exo to run massive models in a distributed cluster." },
              { phase: "Planned", title: "Community Marketplace", desc: "A robust ecosystem to discover, share, and import custom pipeline templates and nodes created by the Komvos community." },
              { phase: "Roadmap", title: "Mac & Linux Installers", desc: "Native support and packaged installers for macOS and Linux operating systems (currently Windows-only)." }
            ].map((item, i) => (
              <FadeIn key={i} delay={i * 0.15}>
                <div className="p-8 rounded-2xl bg-white border border-[#105439]/10 shadow-[0_10px_30px_rgba(0,0,0,0.03)] hover:shadow-[0_15px_40px_rgba(16,84,57,0.1)] transition-shadow relative overflow-hidden h-full">
                  <div className="absolute top-0 right-0 bg-gradient-to-l from-[#d0dfcb] to-[#e3ece0] text-[#105439] text-xs font-bold px-4 py-1.5 rounded-bl-xl shadow-sm">
                    {item.phase}
                  </div>
                  <h4 className="text-xl font-bold mt-4 mb-3 text-[#0b412b]">{item.title}</h4>
                  <p className="text-sm font-medium text-[#1b6b4a] leading-relaxed">{item.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-[#e3ece0] border-t border-[#0b412b]/10 text-center text-sm font-bold text-[#1b6b4a]">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <img src="/image.png" alt="Komvos Logo" className="h-6 object-contain grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all" />
            <span className="opacity-80">© 2026 Komvos. All rights reserved.</span>
          </div>
          <div className="flex gap-8 opacity-80 font-semibold">
            <a href="https://github.com/sakshamwadhankar/Far-Away" target="_blank" rel="noreferrer" className="hover:text-[#105439] transition-colors">GitHub</a>
          </div>
        </div>
      </footer>

      {/* Video Modal */}
      {isVideoModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 md:p-10">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="relative w-full max-w-5xl aspect-video bg-black rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-white/10 flex items-center justify-center"
          >
            <button 
              onClick={() => setIsVideoModalOpen(false)}
              className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-black/50 text-white hover:bg-white hover:text-black transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
            <video 
              src="/vid/demoof.mp4" 
              autoPlay 
              loop
              playsInline
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>
      )}

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
      `}} />
    </div>
  );
}
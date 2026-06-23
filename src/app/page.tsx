"use client";
import React, { useState, useEffect, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { 
  Network, 
  Cpu, 
  Cloud, 
  Lock, 
  GitMerge, 
  Terminal, 
  Play, 
  Download,
  Map,
  Zap,
  ShieldCheck,
  ArrowRight,
  User,
  Activity
} from 'lucide-react';
import { CircuitBoard } from '../components/ui/circuit-board';
import VariableProximity from '../components/ui/VariableProximity';
import FallingPattern from '../components/ui/FallingPattern';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

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

// --- Components based on DESIGN.md ---

const Crosshair = ({ className, style }: { className?: string, style?: React.CSSProperties }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1" className={cn("absolute pointer-events-none", className)} style={style}>
    <path d="M12 2v20M2 12h20" />
  </svg>
);

const CrosshairX = ({ className, style }: { className?: string, style?: React.CSSProperties }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1" className={cn("absolute pointer-events-none", className)} style={style}>
    <path d="M4 4l16 16M4 20L20 4" />
  </svg>
);

const GridPattern = () => (
  <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.35]" style={{
    backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.25) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.25) 1px, transparent 1px)`,
    backgroundSize: '24px 24px'
  }}></div>
);

const DisplayHeadline = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <h1 className={cn("text-[80px] md:text-[110px] xl:text-[180px] font-medium leading-[1.0] tracking-[-0.036em] text-[#ffffff]", className)}>
    {children}
  </h1>
);

const PillButton = ({ children, href, onClick, className }: { children: React.ReactNode; href?: string; onClick?: () => void; className?: string }) => {
  const baseClasses = "inline-flex items-center justify-center rounded-[9999px] px-[20px] py-[6px] text-[14px] font-medium text-[#ffffff] bg-transparent hover:underline transition-all cursor-pointer decoration-1 underline-offset-4";
  
  if (href) {
    return (
      <a href={href} className={cn(baseClasses, className)}>
        {children}
      </a>
    );
  }
  return (
    <button onClick={onClick} className={cn(baseClasses, className)}>
      {children}
    </button>
  );
};

const ProductCardLight = ({ tag, title, description, icon: Icon }: any) => (
  <div className="bg-[#ffffff] rounded-none p-[20px] border border-[#e5e7eb] flex flex-col h-full">
    {tag && (
      <div className="mb-[20px]">
        <span className="text-[13px] font-medium tracking-wide uppercase text-[#030303]">{tag}</span>
      </div>
    )}
    <div className="w-[56px] h-[56px] rounded-full border-[1.5px] border-[#030303] flex items-center justify-center mb-[20px]">
      <Icon size={24} strokeWidth={1.5} color="#030303" />
    </div>
    <h3 className="text-[40px] md:text-[46px] font-normal leading-[1.27] tracking-[-1.47px] text-[#030303] mb-[12px]">{title}</h3>
    <p className="text-[16px] font-normal text-[#030303] leading-[1.56] mt-auto">{description}</p>
  </div>
);

const StepIndicator = ({ step, title, description, isActive }: any) => (
  <div className="flex gap-[20px] mb-[40px] group">
    <div className={cn("w-[4px] h-[60px] shrink-0 transition-colors duration-500", isActive ? "bg-[#73ffb9]" : "bg-[#e5e7eb]")} />
    <div>
      <div className="text-[13px] font-medium uppercase tracking-wide text-[#e5e7eb] mb-[8px]">{step}</div>
      <h4 className="text-[22px] font-normal text-[#ffffff] leading-[1.38] mb-[8px]">{title}</h4>
      <p className="text-[16px] font-normal text-[#e5e7eb] max-w-[60ch] leading-[1.62]">{description}</p>
    </div>
  </div>
);

const MarqueeBand = ({ text }: { text: string }) => (
  <div className="w-full bg-[#030303] border-y border-[#e5e7eb] overflow-hidden py-[40px] flex whitespace-nowrap">
    <motion.div 
      className="text-[150px] md:text-[220px] font-normal text-[#ffffff] tracking-[-7.92px] leading-none flex items-center gap-[40px]"
      animate={{ x: ["0%", "-50%"] }}
      transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
    >
      <span>{text} ✦</span>
      <span>{text} ✦</span>
      <span>{text} ✦</span>
      <span>{text} ✦</span>
    </motion.div>
  </div>
);

const ArrowLink = ({ children, href }: { children: React.ReactNode; href: string }) => (
  <a href={href} className="inline-flex items-center text-[14px] md:text-[16px] font-medium text-[#ffffff] hover:text-[#e5e7eb] transition-colors group decoration-1 underline underline-offset-4">
    {children}
    <ArrowRight size={16} className="text-[#73ffb9] ml-[8px] transform group-hover:translate-x-1 transition-transform" />
  </a>
);

export default function KomvosLanding() {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const containerRef = useRef(null);

  return (
    <div className="min-h-screen bg-[#030303] text-[#ffffff] selection:bg-[#73ffb9] selection:text-[#030303] font-['PP_Neue_Montreal',ui-sans-serif,system-ui,sans-serif]">
      
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-[#030303]/90 backdrop-blur-md border-b border-[#e5e7eb]/20">
        <div className="max-w-[1200px] mx-auto px-[20px] h-[80px] flex items-center justify-between">
          <div className="flex items-center gap-[8px]">
            <span className="text-[#ffffff] font-bold text-[18px]">✦ KOMVOS</span>
          </div>
          <div className="hidden md:flex items-center gap-[32px]">
            <PillButton href="#features">Features</PillButton>
            <PillButton href="#journey">How it Works</PillButton>
            <PillButton href="#roadmap">Roadmap</PillButton>
          </div>
          <div className="flex items-center gap-[16px]">
            <a href="https://github.com/sakshamwadhankar/Far-Away" target="_blank" rel="noreferrer" className="text-[14px] font-medium text-[#e5e7eb] hover:text-[#ffffff] transition-colors underline decoration-1 underline-offset-4">
              GitHub
            </a>
            <PillButton href="/download" className="border border-[#e5e7eb]">
              Download
            </PillButton>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative border-b border-[#e5e7eb]/20">
        <FallingPattern
          dotColor="rgba(255, 255, 255, 0.5)"
          dotSize={2}
          gap={8}
          speed={0.4}
          opacity={0.3}
        />
        <section className="pt-[120px] lg:pt-[140px] pb-[60px] lg:pb-[100px] px-[20px] min-h-screen flex flex-col justify-center max-w-[1200px] mx-auto relative z-[1]">
        <div className="grid lg:grid-cols-2 gap-[40px] lg:gap-[60px] items-center">
          <FadeIn>
            <div className="flex items-center gap-[12px] mb-[16px] lg:mb-[20px]">
              <div className="w-[3px] h-[30px] lg:h-[40px] bg-[#73ffb9]"></div>
              <span className="text-[12px] lg:text-[14px] uppercase tracking-wide font-medium text-[#e5e7eb]">The Hybrid Compute Canvas</span>
            </div>
            
            <div ref={containerRef} style={{ position: 'relative' }}>
              <DisplayHeadline className="max-w-[1000px] mb-[24px] lg:mb-[32px] text-[54px] md:text-[70px] lg:text-[80px] xl:text-[96px] leading-[0.95] flex flex-col">
                <VariableProximity
                  label={'Visual ease.'}
                  fromFontVariationSettings="'wght' 400"
                  toFontVariationSettings="'wght' 900"
                  containerRef={containerRef}
                  radius={500}
                  falloff="linear"
                />
                <VariableProximity
                  label={'Frontier power.'}
                  fromFontVariationSettings="'wght' 400"
                  toFontVariationSettings="'wght' 900"
                  containerRef={containerRef}
                  radius={500}
                  falloff="linear"
                />
                <VariableProximity
                  label={'Local privacy.'}
                  fromFontVariationSettings="'wght' 400"
                  toFontVariationSettings="'wght' 900"
                  containerRef={containerRef}
                  radius={500}
                  falloff="linear"
                />
              </DisplayHeadline>
            </div>
            
            <div className="w-full max-w-[500px] h-[1px] bg-[#e5e7eb]/30 mb-[16px] lg:mb-[20px]"></div>
            
            <p className="text-[16px] md:text-[18px] lg:text-[20px] font-normal text-[#e5e7eb] max-w-[50ch] leading-[1.38] mb-[24px] lg:mb-[40px]">
              Stop choosing between expensive cloud multi-agent systems and clunky local terminal scripts. Visually orchestrate Cloud APIs and local Ollama models in one powerful desktop application.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-[16px] lg:gap-[20px] items-start">
              <a 
                href="/download" 
                className="inline-flex items-center gap-[10px] px-[28px] py-[14px] bg-[#ffffff] text-[#030303] text-[16px] font-semibold hover:bg-[#73ffb9] transition-all duration-200 group"
              >
                <Download size={18} className="group-hover:translate-y-[1px] transition-transform" />
                Download App (v0.1.0)
                <ArrowRight size={16} className="ml-[4px] group-hover:translate-x-[4px] transition-transform" />
              </a>
              <button 
                onClick={() => setIsVideoModalOpen(true)} 
                className="inline-flex items-center gap-[10px] px-[28px] py-[14px] border-2 border-[#e5e7eb]/40 text-[#ffffff] text-[16px] font-semibold hover:border-[#73ffb9] hover:text-[#73ffb9] transition-all duration-200 group"
              >
                <Play size={16} className="text-[#73ffb9] fill-current" />
                Preview Demo
              </button>
            </div>
          </FadeIn>
          
          <FadeIn delay={0.2} className="relative w-full h-[520px] lg:h-[540px] hidden lg:block" style={{ overflow: 'visible' }}>
            {/* The CircuitBoard graphic representing Hybrid Compute */}
            <div className="absolute inset-0 right-[-60px] lg:right-[-80px]">
              <CircuitBoard
                width={650}
                height={520}
                nodes={[
                  { id: "template", x: 60, y: 260, label: "Custom Template", icon: <Network className="w-5 h-5" />, status: "active" },
                  { id: "cloud", x: 300, y: 80, label: "Cloud AI", icon: <Cloud className="w-5 h-5" />, status: "active", size: "lg" },
                  { id: "local1", x: 300, y: 260, label: "Local AI 1", icon: <Lock className="w-5 h-5" />, status: "processing", size: "lg" },
                  { id: "local2", x: 300, y: 430, label: "Local AI 2", icon: <Lock className="w-5 h-5" />, status: "active", size: "lg" },
                  { id: "judge", x: 540, y: 260, label: "Synthesize", icon: <Activity className="w-5 h-5" />, status: "processing" },
                ]}
                connections={[
                  { from: "template", to: "cloud", animated: true },
                  { from: "template", to: "local1", animated: true },
                  { from: "template", to: "local2", animated: true },
                  { from: "cloud", to: "judge", animated: true },
                  { from: "local1", to: "judge", animated: true },
                  { from: "local2", to: "judge", animated: true },
                ]}
              />
            </div>
          </FadeIn>
        </div>
      </section>
      </div>

      {/* Features Grid */}
      <section id="features" className="py-[120px] px-[20px] relative overflow-hidden border-b border-[#e5e7eb]/20">
        <GridPattern />
        <Crosshair className="top-[15%] left-[8%]" />
        <CrosshairX className="bottom-[20%] right-[12%]" />
        <Crosshair className="top-[60%] right-[5%]" />
        
        <div className="max-w-[1200px] mx-auto relative z-10">
          <FadeIn className="mb-[80px]">
            <h2 className="text-[46px] md:text-[54px] font-normal leading-[1.0] tracking-[-1.73px] text-[#ffffff] mb-[24px]">The Goldilocks Zone of AI</h2>
            <div className="w-full h-[1px] bg-[#e5e7eb]/30 mb-[24px]"></div>
            <p className="text-[18px] md:text-[22px] font-normal text-[#e5e7eb] max-w-[70ch] leading-[1.38]">
              No complicated cloud setup required. Build compound, agentic systems that run exactly where you need them—in the cloud, or right on your desk.
            </p>
          </FadeIn>

          <div className="grid md:grid-cols-3 gap-[20px]">
            <FadeIn delay={0.1} className="h-full">
              <ProductCardLight 
                tag="ORCHESTRATION"
                title="Visual Routing"
                description="Like Blender's node editor for AI. Drag, drop, and wire up complex logic loops, routing nodes, and multiple models seamlessly in Edit mode, then chat in Use mode."
                icon={Network}
              />
            </FadeIn>
            <FadeIn delay={0.2} className="h-full">
              <ProductCardLight 
                tag="ARCHITECTURE"
                title="Desktop Native"
                description="Powered by Python and FastAPI running locally as a packaged desktop app. Built-in SQLite tracing tracks every token and cost without a centralized server."
                icon={Zap}
              />
            </FadeIn>
            <FadeIn delay={0.3} className="h-full">
              <ProductCardLight 
                tag="PRIVACY"
                title="Local Models"
                description="Run open-weights models like qwen2.5:3b securely on your own hardware via Ollama. True local privacy with per-run budget caps and a built-in kill switch."
                icon={ShieldCheck}
              />
            </FadeIn>
          </div>
        </div>
      </section>

      <MarqueeBand text="KOMVOS" />

      {/* Building Blocks */}
      <section className="py-[120px] px-[20px] relative overflow-hidden border-b border-[#e5e7eb]/20">
        <GridPattern />
        <CrosshairX className="top-[10%] left-[40%]" />
        <Crosshair className="bottom-[15%] left-[5%]" />
        <CrosshairX className="top-[40%] right-[10%]" />
        
        <div className="max-w-[1200px] mx-auto relative z-10">
          <FadeIn className="mb-[80px]">
            <h2 className="text-[46px] md:text-[54px] font-normal leading-[1.0] tracking-[-1.73px] text-[#ffffff] mb-[24px]">Powerful Building Blocks</h2>
            <div className="w-full h-[1px] bg-[#e5e7eb]/30 mb-[24px]"></div>
            <p className="text-[18px] md:text-[22px] font-normal text-[#e5e7eb] max-w-[70ch] leading-[1.38]">
              Snap together diverse nodes to craft pipelines that reason, verify, and execute flawlessly.
            </p>
          </FadeIn>

          <div className="grid lg:grid-cols-2 gap-[40px]">
            <FadeIn delay={0.1}>
              <div className="border-t border-[#e5e7eb]/30 pt-[40px]">
                <div className="flex items-center gap-[12px] mb-[40px]">
                  <Cpu size={32} className="text-[#ffffff]" strokeWidth={1.5} />
                  <h3 className="text-[30px] font-normal tracking-[-0.96px]">Compute Nodes</h3>
                </div>
                <div className="space-y-[40px]">
                  <div>
                    <div className="flex justify-between items-end mb-[12px]">
                      <h4 className="text-[22px] font-normal text-[#ffffff]">Cloud API</h4>
                      <span className="text-[13px] font-medium tracking-wide uppercase text-[#e5e7eb]">REST</span>
                    </div>
                    <p className="text-[16px] text-[#e5e7eb] leading-[1.62] max-w-[60ch]">Configurable for OpenAI, Anthropic, and Google. Securely uses API keys stored in your OS keychain.</p>
                  </div>
                  <div>
                    <div className="flex justify-between items-end mb-[12px]">
                      <h4 className="text-[22px] font-normal text-[#ffffff]">Ollama Local</h4>
                      <span className="text-[13px] font-medium tracking-wide uppercase text-[#e5e7eb]">Localhost</span>
                    </div>
                    <p className="text-[16px] text-[#e5e7eb] leading-[1.62] max-w-[60ch]">Connects directly to your local Ollama instance. Runs models like qwen2.5:3b privately and for free.</p>
                  </div>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div className="border-t border-[#e5e7eb]/30 pt-[40px]">
                <div className="flex items-center gap-[12px] mb-[40px]">
                  <GitMerge size={32} className="text-[#ffffff]" strokeWidth={1.5} />
                  <h3 className="text-[30px] font-normal tracking-[-0.96px]">Logic & Templates</h3>
                </div>
                <div className="space-y-[40px]">
                  <div>
                    <div className="flex justify-between items-end mb-[12px]">
                      <h4 className="text-[22px] font-normal text-[#ffffff]">Core Logic Nodes</h4>
                    </div>
                    <p className="text-[16px] text-[#e5e7eb] leading-[1.62] max-w-[60ch]">Includes Loop, Judge, Router, Transform, and Compare nodes to build custom control flows and logic validation.</p>
                  </div>
                  <div>
                    <div className="flex justify-between items-end mb-[12px]">
                      <h4 className="text-[22px] font-normal text-[#ffffff]">10 Built-in Templates</h4>
                    </div>
                    <p className="text-[16px] text-[#e5e7eb] leading-[1.62] max-w-[60ch]">Get started instantly with templates like Debate, Ensemble Voting, RAG Pipeline, Language Translator, and Multi-Perspective.</p>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Journey */}
      <section id="journey" className="py-[120px] px-[20px] max-w-[1200px] mx-auto border-b border-[#e5e7eb]/20">
        <div className="grid lg:grid-cols-2 gap-[80px]">
          <FadeIn>
            <h2 className="text-[46px] md:text-[54px] font-normal leading-[1.0] tracking-[-1.73px] text-[#ffffff] mb-[24px]">Build a Pipeline</h2>
            <div className="w-[100px] h-[1px] bg-[#e5e7eb]/30 mb-[24px]"></div>
            <p className="text-[18px] md:text-[22px] font-normal text-[#e5e7eb] max-w-[40ch] leading-[1.38] mb-[60px]">
              See how easy it is to visually architect advanced reasoning algorithms from scratch.
            </p>
          </FadeIn>
          
          <div className="pt-[20px]">
            <FadeIn delay={0.1}>
              <StepIndicator 
                step="ST/01" 
                title="Drafting" 
                description='Drag a Cloud Node onto the canvas. Select "OpenAI" (or Anthropic/Google) and name it Solver.'
                isActive={true}
              />
            </FadeIn>
            <FadeIn delay={0.2}>
              <StepIndicator 
                step="ST/02" 
                title="Verifying" 
                description="Drag a Local Node, select 'qwen2.5:3b' via Ollama, and wire the Solver's output into it for secondary validation."
                isActive={true}
              />
            </FadeIn>
            <FadeIn delay={0.3}>
              <StepIndicator 
                step="ST/03" 
                title="Judging" 
                description="Add a Judge Node. Connect outputs from BOTH previous nodes to synthesize the ultimate verified answer."
                isActive={false}
              />
            </FadeIn>
            <FadeIn delay={0.4}>
              <StepIndicator 
                step="ST/04" 
                title="Execution" 
                description="Click 'Run'. Watch the live execution monitor stream tokens and track costs, safely bounded by your per-run budget cap."
                isActive={false}
              />
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Roadmap */}
      <section id="roadmap" className="py-[120px] px-[20px] max-w-[1200px] mx-auto">
        <FadeIn className="mb-[80px]">
          <h2 className="text-[46px] md:text-[54px] font-normal leading-[1.0] tracking-[-1.73px] text-[#ffffff] mb-[24px]">Roadmap</h2>
          <div className="w-[100px] h-[1px] bg-[#e5e7eb]/30 mb-[24px]"></div>
        </FadeIn>
        
        <div className="grid md:grid-cols-3 gap-[20px]">
          {[
            { phase: "IN DEV", title: "Distributed Local via Exo", desc: "Currently in development: pool your laptop, desktop, and local network devices via Exo to run massive models in a distributed cluster." },
            { phase: "PLANNED", title: "Community Marketplace", desc: "A robust ecosystem to discover, share, and import custom pipeline templates and nodes created by the Komvos community." },
            { phase: "RELEASED", title: "Mac & Linux Support", desc: "Native support and packaged installers for macOS, Linux, and Windows operating systems are now available." }
          ].map((item, i) => (
            <FadeIn key={i} delay={i * 0.15}>
              <div className="bg-[#030303] border border-[#e5e7eb] rounded-none p-[20px] h-full flex flex-col">
                <span className="text-[13px] font-medium tracking-wide uppercase text-[#e5e7eb] mb-[40px] block">{item.phase}</span>
                <h4 className="text-[30px] font-normal tracking-[-0.96px] text-[#ffffff] mb-[12px]">{item.title}</h4>
                <p className="text-[16px] text-[#e5e7eb] leading-[1.62] mt-auto">{item.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#e5e7eb]/20 py-[60px] px-[20px]">
        <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-[40px]">
          <div>
            <span className="text-[#ffffff] font-bold text-[18px] block mb-[8px]">✦ KOMVOS</span>
            <span className="text-[14px] text-[#e5e7eb]">© 2026 Komvos. All rights reserved.</span>
          </div>
          <div className="flex gap-[32px]">
            <a href="https://github.com/sakshamwadhankar/Far-Away" target="_blank" rel="noreferrer" className="text-[14px] text-[#e5e7eb] hover:text-[#ffffff] transition-colors underline decoration-1 underline-offset-4">GitHub</a>
            <a href="/download" className="text-[14px] text-[#e5e7eb] hover:text-[#ffffff] transition-colors underline decoration-1 underline-offset-4">Download</a>
          </div>
        </div>
      </footer>

      {/* Video Modal */}
      {isVideoModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#030303]/90 backdrop-blur-md p-[20px]">
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            className="relative w-full max-w-[1200px] aspect-video bg-[#000000] border border-[#e5e7eb]/20 rounded-none overflow-hidden"
          >
            <button 
              onClick={() => setIsVideoModalOpen(false)}
              className="absolute top-[20px] right-[20px] z-10 w-[40px] h-[40px] flex items-center justify-center rounded-[9999px] bg-[#030303]/80 text-[#ffffff] hover:bg-[#ffffff] hover:text-[#030303] transition-colors border border-[#e5e7eb]/20"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
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
    </div>
  );
}
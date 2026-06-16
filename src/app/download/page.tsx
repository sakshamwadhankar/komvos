"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Download, Monitor, Terminal, CheckCircle2, ArrowLeft } from 'lucide-react';

const colors = {
  bg: '#e3ece0',
  bgDarker: '#d0dfcb',
  textPrimary: '#0b412b',
  textLight: '#1b6b4a',
  accent: '#105439',
  accentHover: '#0a3a26',
  white: '#f5f8f4'
};

export default function DownloadPage() {
  return (
    <div className="min-h-screen font-sans selection:bg-[#105439] selection:text-[#e3ece0] overflow-x-hidden" style={{ backgroundColor: colors.bg, color: colors.textPrimary }}>
      
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-[#e3ece0]/80 backdrop-blur-lg border-b border-[#0b412b]/10">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <a href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
              <img src="/image.png" alt="Komvos Logo" className="h-10 object-contain" />
            </a>
          </div>
          <div className="flex items-center gap-4">
            <a href="/" className="flex items-center gap-2 text-[#1b6b4a] hover:text-[#105439] font-bold transition-colors">
              <ArrowLeft size={20} />
              Back to Home
            </a>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-32 pb-20 px-6 max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6">
              Download <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#105439] to-[#2a875f] animate-gradient">Komvos 0.1.0</span>
            </h1>
            <p className="text-xl font-medium opacity-80 max-w-2xl mx-auto text-[#1b6b4a]">
              Visual AI pipeline editor with local (Ollama) + cloud model support. Available for Windows, macOS, and Linux.
            </p>
          </motion.div>
        </div>

        <div className="space-y-8">
          
          {/* Windows Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white/80 backdrop-blur p-8 rounded-3xl border border-white shadow-xl hover:shadow-2xl transition-all"
          >
            <div className="flex items-start md:items-center gap-6 flex-col md:flex-row">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 shadow-inner" style={{ backgroundColor: colors.accent, color: colors.white }}>
                <Monitor size={32} />
              </div>
              <div className="flex-1 w-full">
                <h2 className="text-3xl font-bold mb-2">Windows</h2>
                <p className="text-[#1b6b4a] font-medium mb-4">We provide two different files depending on your preference.</p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a href="https://github.com/sakshamwadhankar/Far-Away/releases/download/v0.1.0/Komvos.Setup.0.1.0.exe" className="flex-1 flex items-center justify-between p-4 rounded-xl border-2 border-[#105439]/20 hover:border-[#105439] bg-[#f5f8f4] transition-all group shadow-sm hover:shadow-md">
                    <div>
                      <div className="font-bold text-[#0b412b] group-hover:text-[#105439] flex items-center gap-2">Setup Installer <span className="text-xs bg-[#105439] text-white px-2 py-0.5 rounded-full shadow-sm">Recommended</span></div>
                      <div className="text-sm text-[#1b6b4a]">Komvos.Setup.0.1.0.exe</div>
                    </div>
                    <Download className="text-[#105439] group-hover:scale-110 transition-transform" />
                  </a>
                  <a href="https://github.com/sakshamwadhankar/Far-Away/releases/download/v0.1.0/Komvos.0.1.0.exe" className="flex-1 flex items-center justify-between p-4 rounded-xl border-2 border-[#105439]/10 hover:border-[#105439]/50 bg-white transition-all group shadow-sm hover:shadow-md">
                    <div>
                      <div className="font-bold text-[#0b412b] group-hover:text-[#105439]">Portable App</div>
                      <div className="text-sm text-[#1b6b4a]">Komvos.0.1.0.exe</div>
                    </div>
                    <Download className="text-[#1b6b4a] group-hover:scale-110 transition-transform group-hover:text-[#105439]" />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* macOS Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white/80 backdrop-blur p-8 rounded-3xl border border-white shadow-xl hover:shadow-2xl transition-all"
          >
            <div className="flex items-start md:items-center gap-6 flex-col md:flex-row">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 shadow-inner" style={{ backgroundColor: colors.accent, color: colors.white }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="currentColor" className="lucide lucide-apple"><path d="M12 20.94c1.5 0 2.75 1.06 4 1.06 3 0 6-8 6-12.22A4.91 4.91 0 0 0 17 5c-2.22 0-4 1.44-5 2-1-.56-2.78-2-5-2a4.9 4.9 0 0 0-5 4.78C2 14 5 22 8 22c1.25 0 2.5-1.06 4-1.06Z"/><path d="M10 2c1 .5 2 2 2 5h-1c-1.5 0-3-1.5-3-3s1-2 2-2Z"/></svg>
              </div>
              <div className="flex-1 w-full">
                <h2 className="text-3xl font-bold mb-2">macOS <span className="text-lg font-medium text-[#1b6b4a]">(Apple Silicon)</span></h2>
                <p className="text-[#1b6b4a] font-medium mb-4">Installer for modern Mac computers (M1, M2, M3 chips).</p>
                <a href="https://github.com/sakshamwadhankar/Far-Away/releases/download/v0.1.0/Komvos-0.1.0-arm64.dmg" className="flex items-center justify-between p-4 rounded-xl border-2 border-[#105439]/20 hover:border-[#105439] bg-[#f5f8f4] transition-all group w-full shadow-sm hover:shadow-md">
                  <div>
                    <div className="font-bold text-[#0b412b] group-hover:text-[#105439]">Disk Image (.dmg)</div>
                    <div className="text-sm text-[#1b6b4a]">Komvos-0.1.0-arm64.dmg</div>
                  </div>
                  <Download className="text-[#105439] group-hover:scale-110 transition-transform" />
                </a>
              </div>
            </div>
          </motion.div>

          {/* Linux Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-white/80 backdrop-blur p-8 rounded-3xl border border-white shadow-xl hover:shadow-2xl transition-all"
          >
            <div className="flex items-start md:items-center gap-6 flex-col md:flex-row">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 shadow-inner" style={{ backgroundColor: colors.textPrimary, color: colors.white }}>
                <Terminal size={32} />
              </div>
              <div className="flex-1 w-full">
                <h2 className="text-3xl font-bold mb-2">Linux</h2>
                <p className="text-[#1b6b4a] font-medium mb-4">We provide a few different options for Linux users.</p>
                <div className="grid sm:grid-cols-3 gap-4">
                  <a href="https://github.com/sakshamwadhankar/Far-Away/releases/download/v0.1.0/Komvos-0.1.0.AppImage" className="flex items-center justify-between p-4 rounded-xl border-2 border-[#105439]/20 hover:border-[#105439] bg-[#f5f8f4] transition-all group shadow-sm hover:shadow-md">
                    <div>
                      <div className="font-bold text-[#0b412b] group-hover:text-[#105439] flex items-center gap-1.5">AppImage <span className="text-[10px] bg-[#105439] text-white px-1.5 py-0.5 rounded-sm">Rec.</span></div>
                      <div className="text-sm text-[#1b6b4a]">Portable app</div>
                    </div>
                    <Download className="text-[#105439] group-hover:scale-110 transition-transform" />
                  </a>
                  <a href="https://github.com/sakshamwadhankar/Far-Away/releases/download/v0.1.0/komvos_0.1.0_amd64.deb" className="flex items-center justify-between p-4 rounded-xl border-2 border-[#105439]/10 hover:border-[#105439]/50 bg-white transition-all group shadow-sm hover:shadow-md">
                    <div>
                      <div className="font-bold text-[#0b412b] group-hover:text-[#105439]">.deb Package</div>
                      <div className="text-sm text-[#1b6b4a]">Debian / Ubuntu</div>
                    </div>
                    <Download className="text-[#1b6b4a] group-hover:scale-110 transition-transform group-hover:text-[#105439]" />
                  </a>
                  <a href="https://github.com/sakshamwadhankar/Far-Away/releases/download/v0.1.0/komvos-0.1.0.tar.gz" className="flex items-center justify-between p-4 rounded-xl border-2 border-[#105439]/10 hover:border-[#105439]/50 bg-white transition-all group shadow-sm hover:shadow-md">
                    <div>
                      <div className="font-bold text-[#0b412b] group-hover:text-[#105439]">tar.gz</div>
                      <div className="text-sm text-[#1b6b4a]">Standalone</div>
                    </div>
                    <Download className="text-[#1b6b4a] group-hover:scale-110 transition-transform group-hover:text-[#105439]" />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
        
        {/* Prerequisites */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-16 p-8 rounded-2xl bg-[#d0dfcb]/40 border border-[#105439]/10 text-center shadow-inner"
        >
          <h3 className="text-xl font-bold mb-3 flex items-center justify-center gap-2">
            <CheckCircle2 className="text-[#105439]" /> Prerequisites
          </h3>
          <p className="text-[#1b6b4a] font-medium">
            To use local models, ensure you have <a href="https://ollama.com" target="_blank" rel="noreferrer" className="text-[#105439] underline font-bold hover:text-[#0a3a26]">Ollama</a> installed on your system.
          </p>
        </motion.div>

      </main>

      {/* Footer */}
      <footer className="py-8 bg-[#e3ece0] border-t border-[#0b412b]/10 text-center text-sm font-bold text-[#1b6b4a]">
        <div className="max-w-7xl mx-auto px-6 flex justify-center items-center gap-3">
          <img src="/image.png" alt="Komvos Logo" className="h-6 object-contain grayscale opacity-60" />
          <span className="opacity-80">© 2026 Komvos. All rights reserved.</span>
        </div>
      </footer>
    </div>
  );
}

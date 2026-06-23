"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Download, Monitor, Terminal, CheckCircle2, ArrowLeft } from 'lucide-react';

export default function DownloadPage() {
  return (
    <div className="min-h-screen bg-[#030303] text-[#ffffff] selection:bg-[#73ffb9] selection:text-[#030303] font-['PP_Neue_Montreal',ui-sans-serif,system-ui,sans-serif]">
      
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-[#030303]/90 backdrop-blur-md border-b border-[#e5e7eb]/20">
        <div className="max-w-[1200px] mx-auto px-[20px] h-[80px] flex items-center justify-between">
          <div className="flex items-center gap-[8px]">
            <a href="/" className="text-[#ffffff] font-bold text-[18px] hover:text-[#e5e7eb] transition-colors">✦ KOMVOS</a>
          </div>
          <div className="flex items-center gap-[16px]">
            <a href="/" className="inline-flex items-center justify-center rounded-[9999px] px-[20px] py-[6px] text-[14px] font-medium text-[#ffffff] bg-transparent hover:underline transition-all cursor-pointer decoration-1 underline-offset-4 gap-2">
              <ArrowLeft size={16} />
              Back to Home
            </a>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-[160px] pb-[80px] px-[20px] max-w-[1200px] mx-auto">
        <div className="mb-[80px]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-[80px] md:text-[110px] font-normal leading-[1.0] tracking-[-3.96px] text-[#ffffff] mb-[24px]">
              Download
            </h1>
            <div className="w-[100px] h-[1px] bg-[#e5e7eb]/30 mb-[24px]"></div>
            <p className="text-[18px] md:text-[22px] font-normal text-[#e5e7eb] max-w-[60ch] leading-[1.38]">
              Visual AI pipeline editor with local (Ollama) + cloud model support. Available for Windows, macOS, and Linux.
            </p>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 gap-[20px]">
          
          {/* Windows Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="md:col-span-2 bg-[#ffffff] rounded-none p-[40px] border border-[#e5e7eb] flex flex-col"
          >
            <div className="mb-[20px]">
              <span className="text-[13px] font-medium tracking-wide uppercase text-[#030303]">WINDOWS 10/11</span>
            </div>
            <div className="w-[56px] h-[56px] rounded-full border-[1.5px] border-[#030303] flex items-center justify-center mb-[40px]">
              <Monitor size={24} strokeWidth={1.5} color="#030303" />
            </div>
            <h2 className="text-[40px] md:text-[46px] font-normal leading-[1.27] tracking-[-1.47px] text-[#030303] mb-[20px]">Windows</h2>
            
            <div className="grid md:grid-cols-2 gap-[12px] mt-auto">
              <a href="https://github.com/sakshamwadhankar/Far-Away/releases/download/v0.1.0/Komvos.Setup.0.1.0.exe" className="flex items-center justify-between p-[16px] border border-[#e5e7eb] hover:bg-[#030303] hover:text-[#ffffff] group transition-colors">
                <div>
                  <div className="text-[16px] font-medium group-hover:text-[#ffffff]">Setup Installer <span className="ml-2 text-[10px] font-bold tracking-wider px-[6px] py-[2px] border border-current">REC</span></div>
                  <div className="text-[14px] text-[#030303]/60 group-hover:text-[#ffffff]/60">Komvos.Setup.0.1.0.exe</div>
                </div>
                <Download size={20} className="group-hover:text-[#73ffb9]" />
              </a>
              <a href="https://github.com/sakshamwadhankar/Far-Away/releases/download/v0.1.0/Komvos.0.1.0.exe" className="flex items-center justify-between p-[16px] border border-[#e5e7eb] hover:bg-[#030303] hover:text-[#ffffff] group transition-colors">
                <div>
                  <div className="text-[16px] font-medium group-hover:text-[#ffffff]">Portable App</div>
                  <div className="text-[14px] text-[#030303]/60 group-hover:text-[#ffffff]/60">Komvos.0.1.0.exe</div>
                </div>
                <Download size={20} className="group-hover:text-[#73ffb9]" />
              </a>
            </div>
          </motion.div>

          {/* macOS Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-[#ffffff] rounded-none p-[40px] border border-[#e5e7eb] flex flex-col"
          >
            <div className="mb-[20px]">
              <span className="text-[13px] font-medium tracking-wide uppercase text-[#030303]">APPLE SILICON</span>
            </div>
            <div className="w-[56px] h-[56px] rounded-full border-[1.5px] border-[#030303] flex items-center justify-center mb-[40px]">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="lucide lucide-apple"><path d="M12 20.94c1.5 0 2.75 1.06 4 1.06 3 0 6-8 6-12.22A4.91 4.91 0 0 0 17 5c-2.22 0-4 1.44-5 2-1-.56-2.78-2-5-2a4.9 4.9 0 0 0-5 4.78C2 14 5 22 8 22c1.25 0 2.5-1.06 4-1.06Z"/><path d="M10 2c1 .5 2 2 2 5h-1c-1.5 0-3-1.5-3-3s1-2 2-2Z"/></svg>
            </div>
            <h2 className="text-[40px] md:text-[46px] font-normal leading-[1.27] tracking-[-1.47px] text-[#030303] mb-[20px]">macOS</h2>
            
            <div className="flex flex-col gap-[12px] mt-auto">
              <a href="https://github.com/sakshamwadhankar/Far-Away/releases/download/v0.1.0/Komvos-0.1.0-arm64.dmg" className="flex items-center justify-between p-[16px] border border-[#e5e7eb] hover:bg-[#030303] hover:text-[#ffffff] group transition-colors">
                <div>
                  <div className="text-[16px] font-medium group-hover:text-[#ffffff]">Disk Image (.dmg)</div>
                  <div className="text-[14px] text-[#030303]/60 group-hover:text-[#ffffff]/60">Komvos-0.1.0-arm64.dmg</div>
                </div>
                <Download size={20} className="group-hover:text-[#73ffb9]" />
              </a>
            </div>
          </motion.div>

          {/* Linux Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-[#ffffff] rounded-none p-[40px] border border-[#e5e7eb] flex flex-col"
          >
            <div className="mb-[20px]">
              <span className="text-[13px] font-medium tracking-wide uppercase text-[#030303]">LINUX Distros</span>
            </div>
            <div className="w-[56px] h-[56px] rounded-full border-[1.5px] border-[#030303] flex items-center justify-center mb-[40px]">
              <Terminal size={24} strokeWidth={1.5} color="#030303" />
            </div>
            <h2 className="text-[40px] md:text-[46px] font-normal leading-[1.27] tracking-[-1.47px] text-[#030303] mb-[20px]">Linux</h2>
            
            <div className="flex flex-col gap-[12px] mt-auto">
              <a href="https://github.com/sakshamwadhankar/Far-Away/releases/download/v0.1.0/Komvos-0.1.0.AppImage" className="flex items-center justify-between p-[16px] border border-[#e5e7eb] hover:bg-[#030303] hover:text-[#ffffff] group transition-colors">
                <div>
                  <div className="text-[16px] font-medium group-hover:text-[#ffffff]">AppImage <span className="ml-2 text-[10px] font-bold tracking-wider px-[6px] py-[2px] border border-current">REC</span></div>
                  <div className="text-[14px] text-[#030303]/60 group-hover:text-[#ffffff]/60">Portable app</div>
                </div>
                <Download size={20} className="group-hover:text-[#73ffb9]" />
              </a>
              <a href="https://github.com/sakshamwadhankar/Far-Away/releases/download/v0.1.0/komvos_0.1.0_amd64.deb" className="flex items-center justify-between p-[16px] border border-[#e5e7eb] hover:bg-[#030303] hover:text-[#ffffff] group transition-colors">
                <div>
                  <div className="text-[16px] font-medium group-hover:text-[#ffffff]">.deb Package</div>
                  <div className="text-[14px] text-[#030303]/60 group-hover:text-[#ffffff]/60">Debian / Ubuntu</div>
                </div>
                <Download size={20} className="group-hover:text-[#73ffb9]" />
              </a>
              <a href="https://github.com/sakshamwadhankar/Far-Away/releases/download/v0.1.0/komvos-0.1.0.tar.gz" className="flex items-center justify-between p-[16px] border border-[#e5e7eb] hover:bg-[#030303] hover:text-[#ffffff] group transition-colors">
                <div>
                  <div className="text-[16px] font-medium group-hover:text-[#ffffff]">tar.gz</div>
                  <div className="text-[14px] text-[#030303]/60 group-hover:text-[#ffffff]/60">Standalone</div>
                </div>
                <Download size={20} className="group-hover:text-[#73ffb9]" />
              </a>
            </div>
          </motion.div>
        </div>
        
        {/* Prerequisites */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-[40px] pt-[40px] border-t border-[#e5e7eb]/20"
        >
          <div className="flex items-start gap-[16px]">
            <CheckCircle2 size={24} className="text-[#73ffb9] shrink-0" />
            <div>
              <h3 className="text-[22px] font-normal text-[#ffffff] mb-[8px]">Prerequisites</h3>
              <p className="text-[16px] text-[#e5e7eb] leading-[1.62] max-w-[60ch]">
                To use local models, ensure you have <a href="https://ollama.com" target="_blank" rel="noreferrer" className="text-[#ffffff] underline decoration-1 underline-offset-4 hover:text-[#73ffb9]">Ollama</a> installed on your system.
              </p>
            </div>
          </div>
        </motion.div>

      </main>

      {/* Footer */}
      <footer className="border-t border-[#e5e7eb]/20 py-[60px] px-[20px] mt-[80px]">
        <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-[40px]">
          <div>
            <span className="text-[#ffffff] font-bold text-[18px] block mb-[8px]">✦ KOMVOS</span>
            <span className="text-[14px] text-[#e5e7eb]">© 2026 Komvos. All rights reserved.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

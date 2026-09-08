import React from 'react';
import { 
  Sparkles, 
  Search, 
  Brain, 
  Target, 
  Zap, 
  FileText, 
  GitBranch, 
  MessageSquare, 
  BarChart3, 
  ArrowRight
} from 'lucide-react';

interface LandingPageProps {
  onLaunchApp: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onLaunchApp }) => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#070b13] text-slate-100 font-sans selection:bg-cyan-500 selection:text-black overflow-x-hidden">
      
      {/* Background Grid & Ambient Glows */}
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] opacity-20 -z-10" />
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 h-[500px] w-[800px] rounded-full bg-cyan-600/10 blur-[150px]" />
        <div className="absolute top-[35%] left-1/3 h-[400px] w-[600px] rounded-full bg-purple-600/10 blur-[150px]" />
        <div className="absolute bottom-[-10%] left-1/2 -translate-x-1/2 h-[400px] w-[600px] rounded-full bg-cyan-600/10 blur-[150px]" />
      </div>

      {/* 1. Header Navbar */}
      <header className="h-20 max-w-7xl mx-auto px-6 sm:px-10 flex items-center justify-between">
        {/* Brand Logo */}
        <div 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#a855f7]/20 text-[#c084fc] border border-[#a855f7]/30 shadow-lg shadow-purple-500/10 group-hover:scale-105 transition-transform">
            <Brain className="h-5 w-5" />
          </div>
          <span className="font-extrabold text-xl tracking-tight text-white">
            ResearchPilot
          </span>
        </div>

        {/* Right Navigation & Launch App Button */}
        <div className="flex items-center gap-6 sm:gap-8">
          <button
            onClick={() => scrollToSection('features')}
            className="text-xs font-semibold text-slate-400 hover:text-white transition-colors hidden sm:block cursor-pointer"
          >
            Features
          </button>
          <button
            onClick={() => scrollToSection('workflow')}
            className="text-xs font-semibold text-slate-400 hover:text-white transition-colors hidden sm:block cursor-pointer"
          >
            How it Works
          </button>
          <button
            onClick={onLaunchApp}
            className="flex items-center justify-center rounded-2xl bg-gradient-to-r from-[#22d3ee] via-[#38bdf8] to-[#818cf8] hover:from-[#67e8f9] hover:to-[#a5b4fc] text-[#050811] font-bold px-5 py-2.5 text-xs shadow-lg shadow-cyan-500/20 hover:scale-105 active:scale-95 transition-all cursor-pointer"
          >
            Launch App
          </button>
        </div>
      </header>

      {/* 2. Hero Section */}
      <section className="pt-16 pb-20 px-6 max-w-5xl mx-auto text-center">
        {/* Pill Badge */}
        <div className="inline-flex items-center gap-2 rounded-full bg-[#0a101d] border border-cyan-500/30 px-4 py-1.5 text-xs font-medium text-slate-300 shadow-sm shadow-cyan-500/10 mb-8 backdrop-blur-md">
          <Sparkles className="h-3.5 w-3.5 text-[#22d3ee]" />
          <span>Autonomous Research Intelligence</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-5xl sm:text-7xl font-extrabold tracking-tight text-white leading-tight sm:leading-none">
          Your AI Research <br />
          <span className="text-[#2dd4bf]">Co-</span><span className="text-[#a78bfa]">Pilot</span>
        </h1>

        {/* Subtitle */}
        <p className="mt-6 text-sm sm:text-base text-slate-400 max-w-2xl mx-auto leading-relaxed">
          Discover, analyze, and synthesize academic literature with autonomous AI agents. From paper discovery to hypothesis generation — 10x your research productivity.
        </p>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={onLaunchApp}
            className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-[#22d3ee] via-[#38bdf8] to-[#818cf8] hover:from-[#67e8f9] hover:to-[#a5b4fc] text-[#050811] font-bold px-7 py-3.5 text-sm shadow-xl shadow-cyan-500/25 hover:scale-105 active:scale-95 transition-all cursor-pointer"
          >
            <span>Start Researching</span>
            <ArrowRight className="h-4 w-4 stroke-[2.5]" />
          </button>

          <button
            onClick={() => scrollToSection('features')}
            className="rounded-2xl bg-[#0e1424] border border-slate-800 hover:border-slate-700 hover:bg-[#131b30] text-slate-300 hover:text-white font-semibold px-7 py-3.5 text-sm transition-all cursor-pointer"
          >
            Explore Features
          </button>
        </div>

        {/* Search Preview Card */}
        <div className="mt-16 rounded-3xl border border-cyan-500/25 bg-[#080d18]/80 p-6 sm:p-8 backdrop-blur-xl max-w-3xl mx-auto shadow-2xl shadow-cyan-500/10 text-left">
          {/* 3 Colored Dots */}
          <div className="flex items-center gap-2 mb-4">
            <span className="h-2.5 w-2.5 rounded-full bg-[#f43f5e]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#2dd4bf]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#a855f7]" />
          </div>

          {/* Search Input */}
          <div className="relative">
            <Search className="absolute left-4 top-3.5 h-4 w-4 text-slate-500" />
            <input
              type="text"
              readOnly
              onClick={onLaunchApp}
              value="Search across 200M+ academic papers..."
              className="w-full rounded-2xl bg-[#0d1424] border border-slate-800 pl-11 pr-4 py-3 text-xs text-slate-400 cursor-pointer hover:border-cyan-500/40 transition-colors"
            />
          </div>

          {/* 3 Stats Row */}
          <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-slate-800/80 text-center">
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-[#22d3ee]">
                2,847
              </div>
              <div className="text-[11px] text-slate-400 mt-1">
                Papers Analyzed
              </div>
            </div>

            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-[#c084fc]">
                23
              </div>
              <div className="text-[11px] text-slate-400 mt-1">
                Research Gaps
              </div>
            </div>

            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-[#22d3ee]">
                12
              </div>
              <div className="text-[11px] text-slate-400 mt-1">
                AI Hypotheses
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Section: AI-Powered Research Workflow */}
      <section id="workflow" className="py-24 px-6 max-w-6xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          AI-Powered Research Workflow
        </h2>
        <p className="mt-3 text-xs sm:text-sm text-slate-400">
          Four steps from raw literature to breakthrough insights.
        </p>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-14">
          
          {/* Step 01 */}
          <div className="rounded-3xl bg-[#090e1a]/80 border border-slate-800/80 p-6 sm:p-7 flex flex-col items-center text-center space-y-4 hover:border-cyan-500/40 hover:bg-[#0d1424] transition-all">
            <span className="text-xs font-mono font-bold text-[#2dd4bf]">01</span>
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-tr from-[#3b82f6] to-[#8b5cf6] text-[#070b13] shadow-lg shadow-indigo-500/20">
              <Search className="h-6 w-6 stroke-[2.5]" />
            </div>
            <h3 className="text-base font-bold text-white">Discover</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              AI scans millions of papers
            </p>
          </div>

          {/* Step 02 */}
          <div className="rounded-3xl bg-[#090e1a]/80 border border-slate-800/80 p-6 sm:p-7 flex flex-col items-center text-center space-y-4 hover:border-cyan-500/40 hover:bg-[#0d1424] transition-all">
            <span className="text-xs font-mono font-bold text-[#2dd4bf]">02</span>
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-tr from-[#3b82f6] to-[#8b5cf6] text-[#070b13] shadow-lg shadow-indigo-500/20">
              <Brain className="h-6 w-6 stroke-[2.5]" />
            </div>
            <h3 className="text-base font-bold text-white">Analyze</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Multi-agent deep analysis
            </p>
          </div>

          {/* Step 03 */}
          <div className="rounded-3xl bg-[#090e1a]/80 border border-slate-800/80 p-6 sm:p-7 flex flex-col items-center text-center space-y-4 hover:border-cyan-500/40 hover:bg-[#0d1424] transition-all">
            <span className="text-xs font-mono font-bold text-[#2dd4bf]">03</span>
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-tr from-[#3b82f6] to-[#8b5cf6] text-[#070b13] shadow-lg shadow-indigo-500/20">
              <Target className="h-6 w-6 stroke-[2.5]" />
            </div>
            <h3 className="text-base font-bold text-white">Synthesize</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Generate insights & gaps
            </p>
          </div>

          {/* Step 04 */}
          <div className="rounded-3xl bg-[#090e1a]/80 border border-slate-800/80 p-6 sm:p-7 flex flex-col items-center text-center space-y-4 hover:border-cyan-500/40 hover:bg-[#0d1424] transition-all">
            <span className="text-xs font-mono font-bold text-[#2dd4bf]">04</span>
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-tr from-[#3b82f6] to-[#8b5cf6] text-[#070b13] shadow-lg shadow-indigo-500/20">
              <Zap className="h-6 w-6 fill-current stroke-[1.5]" />
            </div>
            <h3 className="text-base font-bold text-white">Accelerate</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Hypothesis & experiments
            </p>
          </div>

        </div>
      </section>

      {/* 4. Section: Research Intelligence Modules */}
      <section id="features" className="py-24 px-6 max-w-6xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Research Intelligence Modules
        </h2>
        <p className="mt-3 text-xs sm:text-sm text-slate-400">
          Every tool you need to transform how you do research.
        </p>

        {/* 6 Cards Grid (2 rows of 3) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-14 text-left">
          
          {/* Module 1 */}
          <div className="rounded-3xl bg-[#090e1a]/80 border border-slate-800/80 p-7 space-y-3 hover:border-teal-500/40 transition-all">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#042f2e]/70 text-[#2dd4bf] border border-[#14b8a6]/40 shadow-sm">
              <Brain className="h-5 w-5" />
            </div>
            <h3 className="text-base font-bold text-white">Multi-Agent Reasoning</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Autonomous AI agents collaborate to analyze and synthesize research findings.
            </p>
          </div>

          {/* Module 2 */}
          <div className="rounded-3xl bg-[#090e1a]/80 border border-slate-800/80 p-7 space-y-3 hover:border-teal-500/40 transition-all">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#042f2e]/70 text-[#2dd4bf] border border-[#14b8a6]/40 shadow-sm">
              <Search className="h-5 w-5" />
            </div>
            <h3 className="text-base font-bold text-white">Semantic Discovery</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Find papers through meaning, not just keywords. Cross-domain recommendations.
            </p>
          </div>

          {/* Module 3 */}
          <div className="rounded-3xl bg-[#090e1a]/80 border border-slate-800/80 p-7 space-y-3 hover:border-teal-500/40 transition-all">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#042f2e]/70 text-[#2dd4bf] border border-[#14b8a6]/40 shadow-sm">
              <FileText className="h-5 w-5" />
            </div>
            <h3 className="text-base font-bold text-white">AI Summarization</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Instant abstracts, section breakdowns, and comparative summaries.
            </p>
          </div>

          {/* Module 4 */}
          <div className="rounded-3xl bg-[#090e1a]/80 border border-slate-800/80 p-7 space-y-3 hover:border-teal-500/40 transition-all">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#042f2e]/70 text-[#2dd4bf] border border-[#14b8a6]/40 shadow-sm">
              <GitBranch className="h-5 w-5" />
            </div>
            <h3 className="text-base font-bold text-white">Gap Detection</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Identify unexplored research areas and generate novel directions.
            </p>
          </div>

          {/* Module 5 */}
          <div className="rounded-3xl bg-[#090e1a]/80 border border-slate-800/80 p-7 space-y-3 hover:border-teal-500/40 transition-all">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#042f2e]/70 text-[#2dd4bf] border border-[#14b8a6]/40 shadow-sm">
              <MessageSquare className="h-5 w-5" />
            </div>
            <h3 className="text-base font-bold text-white">Research Chat</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Citation-backed Q&A with multi-document reasoning chains.
            </p>
          </div>

          {/* Module 6 */}
          <div className="rounded-3xl bg-[#090e1a]/80 border border-slate-800/80 p-7 space-y-3 hover:border-teal-500/40 transition-all">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#042f2e]/70 text-[#2dd4bf] border border-[#14b8a6]/40 shadow-sm">
              <BarChart3 className="h-5 w-5" />
            </div>
            <h3 className="text-base font-bold text-white">Analytics Dashboard</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Track reading progress, topic coverage, and knowledge growth.
            </p>
          </div>

        </div>
      </section>

      {/* 5. Section: CTA Ready to Accelerate */}
      <section className="py-20 px-6 max-w-4xl mx-auto text-center">
        <div className="rounded-3xl border border-cyan-500/30 bg-[#080d18]/90 p-10 sm:p-14 backdrop-blur-xl shadow-2xl shadow-cyan-500/10">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Ready to{' '}
            <span className="text-[#2dd4bf]">Accele</span><span className="text-[#a78bfa]">rate</span>{' '}
            Your Research?
          </h2>
          <p className="mt-3 text-xs sm:text-sm text-slate-400 max-w-md mx-auto leading-relaxed">
            Join thousands of researchers using AI to discover breakthrough insights faster.
          </p>
          <div className="mt-8 flex justify-center">
            <button
              onClick={onLaunchApp}
              className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-[#22d3ee] via-[#38bdf8] to-[#818cf8] hover:from-[#67e8f9] hover:to-[#a5b4fc] text-[#050811] font-bold px-8 py-3.5 text-sm shadow-xl shadow-cyan-500/25 hover:scale-105 active:scale-95 transition-all cursor-pointer"
            >
              <span>Get Started Free</span>
              <ArrowRight className="h-4 w-4 stroke-[2.5]" />
            </button>
          </div>
        </div>
      </section>

      {/* 6. Footer */}
      <footer className="border-t border-slate-900 bg-[#05080f] py-8 px-6 sm:px-10">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-3">
            <div className="flex h-7 w-7 items-center justify-center rounded-xl bg-[#a855f7]/20 text-[#c084fc] border border-[#a855f7]/30">
              <Brain className="h-4 w-4" />
            </div>
            <span className="font-bold text-slate-300 text-sm">ResearchPilot</span>
          </div>

          <div>
            © 2026 ResearchPilot AI. All rights reserved.
          </div>
        </div>
      </footer>

    </div>
  );
};

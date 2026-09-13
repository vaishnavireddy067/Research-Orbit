import React, { useState } from 'react';
import { 
  Search, 
  ArrowRight, 
  FileText, 
  Brain, 
  Lightbulb, 
  Network, 
  Check, 
  Upload, 
  MessageSquare, 
  Sparkles, 
  Compass, 
  TrendingUp, 
  Layers, 
  FlaskConical, 
  ShieldCheck, 
  CheckCircle2, 
  FolderPlus,
  Clock,
  ArrowUpRight,
  ChevronRight,
  Bot,
  Dna,
  Radar,
  ShieldAlert,
  FileCode2,
  Zap,
  GitMerge
} from 'lucide-react';
import { PaperAnalysis } from '../../types';
import { NavTab } from '../Sidebar';
import { LivePaperStudio } from '../LivePaperStudio';

interface DashboardViewProps {
  papers: PaperAnalysis[];
  onSelectPaper: (p: PaperAnalysis) => void;
  onNavigate: (tab: NavTab) => void;
  isDarkMode?: boolean;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  papers,
  onSelectPaper,
  onNavigate,
  isDarkMode = true,
}) => {
  const [searchTopic, setSearchTopic] = useState('');
  const [dashboardIdea, setDashboardIdea] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTopic.trim()) {
      onNavigate('discover');
    }
  };

  const PIPELINE_STEPS = [
    { id: 'discover', name: 'Discover', desc: 'Find relevant papers', icon: <Search className="w-4 h-4" />, color: 'bg-blue-600 text-white' },
    { id: 'paper_analysis', name: 'Analyze', desc: 'Extract key insights', icon: <FileText className="w-4 h-4" />, color: 'bg-indigo-600 text-white' },
    { id: 'knowledge_graph', name: 'Understand', desc: 'Build knowledge graph', icon: <Brain className="w-4 h-4" />, color: 'bg-teal-600 text-white' },
    { id: 'research_gaps', name: 'Find Gaps', desc: 'Identify opportunities', icon: <Lightbulb className="w-4 h-4" />, color: 'bg-amber-500 text-white' },
    { id: 'idea_lab', name: 'Create', desc: 'Generate new ideas', icon: <Sparkles className="w-4 h-4" />, color: 'bg-emerald-600 text-white' },
    { id: 'experiments', name: 'Plan', desc: 'Design experiments', icon: <FlaskConical className="w-4 h-4" />, color: 'bg-cyan-600 text-white' },
    { id: 'peer_review', name: 'Validate', desc: 'Review & verify', icon: <ShieldCheck className="w-4 h-4" />, color: 'bg-orange-500 text-white' },
    { id: 'research_proposal', name: 'Publish', desc: 'Write research report', icon: <FileText className="w-4 h-4" />, color: 'bg-rose-600 text-white' },
  ];

  return (
    <div className="space-y-6 pb-12 font-sans text-slate-100">
      
      {/* ROW 1: Hero Greeting Banner + Your Research Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        
        {/* Hero Greeting Banner (Col span 2) matching Screenshot */}
        <div className="lg:col-span-2 rounded-3xl bg-gradient-to-r from-[#d8e6ff] via-[#e2ebfc] to-[#edf3ff] p-6 sm:p-7 text-slate-900 relative overflow-hidden shadow-xl border border-blue-200/70 flex flex-col justify-between">
          
          {/* Subtle 3D background graphic on right */}
          <div className="absolute right-4 bottom-2 hidden sm:block opacity-90 pointer-events-none">
            <div className="relative w-40 h-36">
              {/* Decorative stacked books and plant illustration */}
              <div className="absolute bottom-0 right-4 w-28 h-6 bg-[#3b82f6]/20 rounded-md -rotate-3" />
              <div className="absolute bottom-4 right-2 w-32 h-6 bg-[#6366f1]/25 rounded-md rotate-1" />
              <div className="absolute bottom-8 right-6 w-24 h-5 bg-[#0ea5e9]/30 rounded-md -rotate-1" />
              <div className="absolute bottom-14 right-10 w-12 h-16 bg-[#10b981]/20 rounded-t-full border border-emerald-500/20" />
            </div>
          </div>

          <div className="relative z-10 max-w-xl">
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight flex items-center gap-2">
              Good evening, Vaishnavi 👋
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 font-medium">
              Turn research papers into insights, ideas and innovation.
            </p>

            {/* In-banner Search Box */}
            <form onSubmit={handleSearchSubmit} className="mt-5 flex items-center gap-2 bg-white rounded-2xl p-1.5 pl-4 shadow-sm border border-slate-200/90">
              <Search className="w-4 h-4 text-slate-400 shrink-0" />
              <input
                type="text"
                value={searchTopic}
                onChange={(e) => setSearchTopic(e.target.value)}
                placeholder="Search papers, topics, methods or datasets..."
                className="w-full bg-transparent text-xs text-slate-800 placeholder-slate-400 focus:outline-none font-medium"
              />
              <button
                type="submit"
                className="bg-[#2563eb] hover:bg-blue-700 active:scale-95 text-white px-5 py-2.5 rounded-xl text-xs font-bold transition-all shrink-0 flex items-center gap-1 shadow-md shadow-blue-500/20 cursor-pointer"
              >
                <span>Search</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>

            {/* Quick Search Chips */}
            <div className="flex items-center gap-2 flex-wrap mt-3.5 text-[11px] font-medium text-slate-600">
              {[
                'AI for flood prediction',
                'Transformer models',
                'Computer Vision datasets',
                'Latest research trends'
              ].map((chip) => (
                <button
                  key={chip}
                  type="button"
                  onClick={() => {
                    setSearchTopic(chip);
                    onNavigate('discover');
                  }}
                  className="px-2.5 py-1 rounded-lg bg-white/80 hover:bg-white border border-slate-200 text-slate-700 hover:text-blue-600 transition-colors shadow-2xs cursor-pointer"
                >
                  {chip}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Your Research Workspace Card (Col span 1) */}
        <div className="rounded-3xl bg-[#0d1633] border border-[#1b2b5a] p-6 text-white flex flex-col justify-between shadow-xl relative overflow-hidden">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-base font-bold text-white tracking-tight">
                Your Research Workspace
              </h2>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Track and manage all your research projects in one place.
              </p>
            </div>

            {/* Folder Graphic */}
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600/30 to-indigo-600/30 border border-blue-500/30 flex items-center justify-center text-blue-400 shrink-0 shadow-lg">
              <FolderPlus className="w-6 h-6" />
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-[#1b2b5a]">
            <button
              onClick={() => onNavigate('upload')}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#1a2958] hover:bg-[#223570] text-blue-300 border border-blue-500/30 text-xs font-bold transition-all shadow-sm cursor-pointer"
            >
              <span>+ New Research</span>
            </button>
          </div>
        </div>

      </div>

      {/* 5-STEP RESEARCH JOURNEY MAP — Core Workflow */}
      <div className={`rounded-3xl border p-6 sm:p-8 shadow-xl transition-colors ${
        isDarkMode ? 'bg-[#070e24] border-[#1b2b5a]' : 'bg-white border-slate-200 shadow-md'
      }`}>
        <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
          <div>
            <h2 className={`text-lg font-black tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
              Your Research Journey
            </h2>
            <p className={`text-xs mt-0.5 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
              End-to-end workflow: from reading a paper to publishing your own research.
            </p>
          </div>
          {papers.length === 0 && (
            <button
              onClick={() => onNavigate('paper_analysis')}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-lg shadow-blue-600/30 transition-all"
            >
              <Upload className="w-3.5 h-3.5" />
              Start — Upload Paper
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
          {/* Step 1 */}
          <div
            onClick={() => onNavigate('discover')}
            className={`relative rounded-2xl border p-4 cursor-pointer group transition-all hover:scale-[1.02] ${
              isDarkMode
                ? 'bg-[#0d1633] border-[#1b2b5a] hover:border-blue-500/60'
                : 'bg-blue-50 border-blue-100 hover:border-blue-300'
            }`}
          >
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center text-white text-[10px] font-black shrink-0">01</div>
              <span className={`text-[10px] font-bold uppercase tracking-wider ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>Discover</span>
            </div>
            <div className={`w-9 h-9 rounded-xl bg-blue-500/15 flex items-center justify-center text-blue-500 mb-2`}>
              <Search className="w-4 h-4" />
            </div>
            <p className={`text-xs font-bold mb-1 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Find Papers</p>
            <p className={`text-[11px] leading-snug ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
              Search real indexed papers by topic, author, or method.
            </p>
            <div className={`mt-3 text-[10px] font-bold flex items-center gap-1 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'} opacity-0 group-hover:opacity-100 transition-opacity`}>
              Open <ArrowRight className="w-3 h-3" />
            </div>
          </div>

          {/* Arrow */}
          <div className="hidden sm:flex items-center justify-center text-slate-600">
            <ChevronRight className="w-5 h-5" />
          </div>

          {/* Step 2 */}
          <div
            onClick={() => onNavigate('paper_analysis')}
            className={`relative rounded-2xl border p-4 cursor-pointer group transition-all hover:scale-[1.02] ${
              papers.length > 0
                ? isDarkMode
                  ? 'bg-[#111c40] border-emerald-500/30 hover:border-emerald-500/60 ring-1 ring-emerald-500/20'
                  : 'bg-emerald-50 border-emerald-200 hover:border-emerald-400'
                : isDarkMode
                ? 'bg-[#0d1633] border-[#1b2b5a] hover:border-indigo-500/60'
                : 'bg-indigo-50 border-indigo-100 hover:border-indigo-300'
            }`}
          >
            {papers.length === 0 && (
              <div className="absolute -top-2 -right-2 bg-blue-600 text-white text-[9px] font-black px-2 py-0.5 rounded-full animate-pulse">
                START HERE
              </div>
            )}
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center text-white text-[10px] font-black shrink-0">02</div>
              <span className={`text-[10px] font-bold uppercase tracking-wider ${isDarkMode ? 'text-indigo-400' : 'text-indigo-600'}`}>Analyze</span>
            </div>
            <div className="w-9 h-9 rounded-xl bg-indigo-500/15 flex items-center justify-center text-indigo-500 mb-2">
              <Brain className="w-4 h-4" />
            </div>
            <p className={`text-xs font-bold mb-1 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Deep Analysis</p>
            <p className={`text-[11px] leading-snug ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
              Upload PDF → AI extracts problem, method, gaps, & limitations.
            </p>
            {papers.length > 0 && (
              <div className={`mt-2 text-[10px] font-bold text-emerald-400 flex items-center gap-1`}>
                <CheckCircle2 className="w-3 h-3" /> {papers.length} paper{papers.length > 1 ? 's' : ''} analyzed
              </div>
            )}
          </div>

          {/* Step 3 — CORE */}
          <div
            onClick={() => onNavigate('research_evolution')}
            className={`relative rounded-2xl border p-4 cursor-pointer group transition-all hover:scale-[1.02] ${
              isDarkMode
                ? 'bg-gradient-to-br from-[#1a0a30] to-[#0f1225] border-violet-500/40 hover:border-violet-500/70'
                : 'bg-gradient-to-br from-violet-50 to-purple-50 border-violet-200 hover:border-violet-400'
            }`}
          >
            <div className="absolute -top-2.5 left-1/2 -translate-x-1/2">
              <span className="bg-gradient-to-r from-violet-600 to-purple-600 text-white text-[9px] font-black px-3 py-0.5 rounded-full shadow-md shadow-violet-500/40">
                ⭐ CORE FEATURE
              </span>
            </div>
            <div className="flex items-center gap-2 mb-3 mt-1">
              <div className="w-7 h-7 rounded-lg bg-violet-600 flex items-center justify-center text-white text-[10px] font-black shrink-0">03</div>
              <span className={`text-[10px] font-bold uppercase tracking-wider ${isDarkMode ? 'text-violet-400' : 'text-violet-600'}`}>Evolve</span>
            </div>
            <div className="w-9 h-9 rounded-xl bg-violet-500/15 flex items-center justify-center text-violet-500 mb-2">
              <GitMerge className="w-4 h-4" />
            </div>
            <p className={`text-xs font-bold mb-1 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Research Evolution</p>
            <p className={`text-[11px] leading-snug ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
              Find gaps → generate 3 novel research directions → pick best.
            </p>
            <div className={`mt-3 text-[10px] font-bold flex items-center gap-1 ${isDarkMode ? 'text-violet-400' : 'text-violet-600'} opacity-0 group-hover:opacity-100 transition-opacity`}>
              Evolve Now <ArrowRight className="w-3 h-3" />
            </div>
          </div>

          {/* Step 4 */}
          <div
            onClick={() => onNavigate('paper_studio')}
            className={`relative rounded-2xl border p-4 cursor-pointer group transition-all hover:scale-[1.02] ${
              isDarkMode
                ? 'bg-[#0d1633] border-[#1b2b5a] hover:border-emerald-500/60'
                : 'bg-emerald-50 border-emerald-100 hover:border-emerald-300'
            }`}
          >
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-lg bg-emerald-600 flex items-center justify-center text-white text-[10px] font-black shrink-0">04</div>
              <span className={`text-[10px] font-bold uppercase tracking-wider ${isDarkMode ? 'text-emerald-400' : 'text-emerald-600'}`}>Build</span>
            </div>
            <div className="w-9 h-9 rounded-xl bg-emerald-500/15 flex items-center justify-center text-emerald-500 mb-2">
              <FileText className="w-4 h-4" />
            </div>
            <p className={`text-xs font-bold mb-1 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Write Paper</p>
            <p className={`text-[11px] leading-snug ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
              Proposal → full manuscript with AI drafting + citation tools.
            </p>
            <div className={`mt-3 text-[10px] font-bold flex items-center gap-1 ${isDarkMode ? 'text-emerald-400' : 'text-emerald-600'} opacity-0 group-hover:opacity-100 transition-opacity`}>
              Open Studio <ArrowRight className="w-3 h-3" />
            </div>
          </div>

          {/* Step 5 — SECOND USP */}
          <div
            onClick={() => onNavigate('paper_studio')}
            className={`relative rounded-2xl border p-4 cursor-pointer group transition-all hover:scale-[1.02] ${
              isDarkMode
                ? 'bg-gradient-to-br from-[#1a1010] to-[#120f1a] border-rose-500/40 hover:border-rose-500/70'
                : 'bg-gradient-to-br from-rose-50 to-orange-50 border-rose-200 hover:border-rose-400'
            }`}
          >
            <div className="absolute -top-2.5 left-1/2 -translate-x-1/2">
              <span className="bg-gradient-to-r from-rose-600 to-orange-500 text-white text-[9px] font-black px-3 py-0.5 rounded-full shadow-md shadow-rose-500/40">
                ⭐ FINAL STEP
              </span>
            </div>
            <div className="flex items-center gap-2 mb-3 mt-1">
              <div className="w-7 h-7 rounded-lg bg-rose-600 flex items-center justify-center text-white text-[10px] font-black shrink-0">05</div>
              <span className={`text-[10px] font-bold uppercase tracking-wider ${isDarkMode ? 'text-rose-400' : 'text-rose-600'}`}>Submit</span>
            </div>
            <div className="w-9 h-9 rounded-xl bg-rose-500/15 flex items-center justify-center text-rose-500 mb-2">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <p className={`text-xs font-bold mb-1 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Pre-Submission Audit</p>
            <p className={`text-[11px] leading-snug ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
              AI reviews, fixes errors, checks citations → Download final PDF.
            </p>
            <div className={`mt-3 text-[10px] font-bold flex items-center gap-1 ${isDarkMode ? 'text-rose-400' : 'text-rose-600'} opacity-0 group-hover:opacity-100 transition-opacity`}>
              Run Audit <ArrowRight className="w-3 h-3" />
            </div>
          </div>
        </div>
      </div>

      {/* ROW 2: 4 Key Metric Cards Row */}
      {(() => {
        const papersCount = papers.length;
        const analysesCount = papers.filter((p) => p.extendedAnalysis || p.summary).length;
        const gapsCount = papers.reduce((sum, p) => sum + (p.risks?.length || 0), 0);
        const ideasCount = papers.length > 0 ? papers.length * 3 : 0;

        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Card 1: Papers Uploaded */}
            <div 
              onClick={() => onNavigate('my_research')}
              className="rounded-2xl bg-[#0d1633] border border-[#1b2b5a] p-5 hover:border-blue-500/40 transition-all cursor-pointer shadow-lg group"
            >
              <div className="w-9 h-9 rounded-xl bg-blue-500/15 border border-blue-500/25 flex items-center justify-center text-blue-400 mb-3 group-hover:scale-105 transition-transform">
                <FileText className="w-4 h-4" />
              </div>
              <div className="text-2xl font-black text-white">{papersCount}</div>
              <div className="text-xs text-slate-400 font-medium mt-0.5">Papers Uploaded</div>
              <div className="flex items-center text-[11px] font-semibold mt-2.5 text-slate-400">
                {papersCount > 0 ? (
                  <span className="text-emerald-400 flex items-center">
                    <ArrowUpRight className="w-3.5 h-3.5 mr-0.5" />
                    +{papersCount} indexed
                  </span>
                ) : (
                  <span>No documents yet</span>
                )}
              </div>
            </div>

            {/* Card 2: Analyses Completed */}
            <div 
              onClick={() => onNavigate('paper_analysis')}
              className="rounded-2xl bg-[#0d1633] border border-[#1b2b5a] p-5 hover:border-purple-500/40 transition-all cursor-pointer shadow-lg group"
            >
              <div className="w-9 h-9 rounded-xl bg-purple-500/15 border border-purple-500/25 flex items-center justify-center text-purple-400 mb-3 group-hover:scale-105 transition-transform">
                <Brain className="w-4 h-4" />
              </div>
              <div className="text-2xl font-black text-white">{analysesCount}</div>
              <div className="text-xs text-slate-400 font-medium mt-0.5">Analyses Completed</div>
              <div className="flex items-center text-[11px] font-semibold mt-2.5 text-slate-400">
                {analysesCount > 0 ? (
                  <span className="text-emerald-400 flex items-center">
                    <ArrowUpRight className="w-3.5 h-3.5 mr-0.5" />
                    {analysesCount} completed
                  </span>
                ) : (
                  <span>0 completed</span>
                )}
              </div>
            </div>

            {/* Card 3: Ideas Generated */}
            <div 
              onClick={() => onNavigate('idea_lab')}
              className="rounded-2xl bg-[#0d1633] border border-[#1b2b5a] p-5 hover:border-amber-500/40 transition-all cursor-pointer shadow-lg group"
            >
              <div className="w-9 h-9 rounded-xl bg-amber-500/15 border border-amber-500/25 flex items-center justify-center text-amber-400 mb-3 group-hover:scale-105 transition-transform">
                <Lightbulb className="w-4 h-4" />
              </div>
              <div className="text-2xl font-black text-white">{ideasCount}</div>
              <div className="text-xs text-slate-400 font-medium mt-0.5">Ideas Generated</div>
              <div className="flex items-center text-[11px] font-semibold mt-2.5 text-slate-400">
                {ideasCount > 0 ? (
                  <span className="text-emerald-400 flex items-center">
                    <ArrowUpRight className="w-3.5 h-3.5 mr-0.5" />
                    Active ideation
                  </span>
                ) : (
                  <span>Upload to brainstorm</span>
                )}
              </div>
            </div>

            {/* Card 4: Gaps Detected */}
            <div 
              onClick={() => onNavigate('research_gaps')}
              className="rounded-2xl bg-[#0d1633] border border-[#1b2b5a] p-5 hover:border-cyan-500/40 transition-all cursor-pointer shadow-lg group"
            >
              <div className="w-9 h-9 rounded-xl bg-cyan-500/15 border border-cyan-500/25 flex items-center justify-center text-cyan-400 mb-3 group-hover:scale-105 transition-transform">
                <Network className="w-4 h-4" />
              </div>
              <div className="text-2xl font-black text-white">{gapsCount}</div>
              <div className="text-xs text-slate-400 font-medium mt-0.5">Gaps Detected</div>
              <div className="flex items-center text-[11px] font-semibold mt-2.5 text-slate-400">
                {gapsCount > 0 ? (
                  <span className="text-emerald-400 flex items-center">
                    <ArrowUpRight className="w-3.5 h-3.5 mr-0.5" />
                    {gapsCount} critical gaps
                  </span>
                ) : (
                  <span>Ready to detect</span>
                )}
              </div>
            </div>
          </div>
        );
      })()}

      {/* ROW 3: LIVE RESEARCH PAPER CREATION STATION */}
      <div className="pt-2">
        <LivePaperStudio 
          paper={papers[0] || null} 
          isDarkMode={isDarkMode} 
          onNavigate={onNavigate}
        />
      </div>

      {/* ROW 4: BALANCED 2-COLUMN WORKSPACE OPERATIONS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        
        {/* LEFT COLUMN: Active Project & Recent Papers */}
        <div className="space-y-6">
          
          {/* Continue Your Research Featured Box */}
          <div className={`rounded-3xl border p-6 shadow-xl space-y-4 transition-colors ${
            isDarkMode ? 'bg-[#0d1633] border-[#1b2b5a]' : 'bg-white border-slate-200 shadow-md'
          }`}>
            <div className="flex items-center justify-between">
              <h3 className={`text-base font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                Active Research In Progress
              </h3>
              {papers.length > 0 && (
                <button 
                  onClick={() => onNavigate('my_research')}
                  className="text-xs font-semibold text-blue-500 hover:text-blue-400 flex items-center gap-1 cursor-pointer"
                >
                  <span>View All</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
            <p className="text-xs text-slate-400 -mt-2">
              {papers.length > 0
                ? 'Pick up where you left off or dive deeper into your active manuscript.'
                : 'No active research manuscript loaded yet. Start by uploading your paper.'}
            </p>

            {papers.length > 0 ? (
              /* Main Active Project Card */
              <div 
                onClick={() => {
                  onSelectPaper(papers[0]);
                  onNavigate('research_gaps');
                }}
                className={`p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
                  isDarkMode 
                    ? 'bg-[#111c40] border-[#1e2e60] hover:border-blue-500/50' 
                    : 'bg-slate-50 border-slate-200 hover:border-blue-400'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-600/30 to-indigo-600/30 border border-blue-500/30 flex items-center justify-center text-blue-400 shrink-0 shadow-lg">
                    <FileText className="w-7 h-7" />
                  </div>

                  <div className="space-y-2">
                    <h4 className={`text-sm font-bold leading-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                      {papers[0].title}
                    </h4>

                    <div className="flex items-center gap-2 flex-wrap text-[10px] font-semibold">
                      <span className="px-2.5 py-0.5 rounded-full bg-blue-500/15 text-blue-400 border border-blue-500/30">
                        {papers[0].domain || 'Computer Science / AI'}
                      </span>
                      {papers[0].publication_year && (
                        <span className="px-2.5 py-0.5 rounded-full bg-teal-500/15 text-teal-400 border border-teal-500/30">
                          {papers[0].publication_year}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-3 flex-wrap text-[11px] text-slate-300 pt-1">
                      <span className="flex items-center gap-1 text-emerald-400">
                        <Check className="w-3.5 h-3.5" /> Gaps Identified: {papers[0].risks?.length || 0}
                      </span>
                      {papers[0].noveltyScore && (
                        <span className="flex items-center gap-1 text-blue-400">
                          <Sparkles className="w-3.5 h-3.5" /> Novelty: {papers[0].noveltyScore}/10
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="self-end sm:self-center flex items-center gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectPaper(papers[0]);
                      onNavigate('research_evolution');
                    }}
                    className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-rose-600 via-amber-600 to-orange-600 hover:from-rose-500 hover:to-orange-500 text-white text-xs font-black shadow-md shadow-rose-600/20 flex items-center gap-1.5 cursor-pointer transition-all hover:scale-102"
                  >
                    <GitMerge className="w-3.5 h-3.5 text-white" />
                    <span>🚀 Evolve</span>
                  </button>
                  <div className="w-10 h-10 rounded-full bg-blue-600 hover:bg-blue-500 text-white flex items-center justify-center shadow-md shadow-blue-600/30 transition-transform hover:scale-105">
                    <ArrowRight className="w-5 h-5" />
                  </div>
                </div>
              </div>
            ) : (
              /* Empty Project Prompt */
              <div className={`p-6 rounded-2xl border text-center flex flex-col items-center justify-center gap-3 ${
                isDarkMode ? 'bg-[#111c40]/60 border-[#1e2e60]' : 'bg-slate-50 border-slate-200'
              }`}>
                <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                  <Upload className="w-6 h-6" />
                </div>
                <div>
                  <h4 className={`text-sm font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                    No Active Research Paper
                  </h4>
                  <p className="text-xs text-slate-400 mt-1 max-w-sm">
                    Upload your research PDF to extract insights, methodology breakdowns, and novelty scores.
                  </p>
                </div>
                <button
                  onClick={() => onNavigate('upload')}
                  className="mt-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-md shadow-blue-600/20 flex items-center gap-1.5 cursor-pointer"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>+ Upload Manuscript PDF</span>
                </button>
              </div>
            )}
          </div>

          {/* Recent Papers Grid */}
          <div className={`rounded-3xl border p-6 shadow-xl space-y-4 transition-colors ${
            isDarkMode ? 'bg-[#0d1633] border-[#1b2b5a]' : 'bg-white border-slate-200 shadow-md'
          }`}>
            <div className="flex items-center justify-between">
              <h3 className={`text-base font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                Recent Indexed Literature
              </h3>
              {papers.length > 0 && (
                <button 
                  onClick={() => onNavigate('my_research')}
                  className="text-xs font-semibold text-blue-500 hover:text-blue-400 flex items-center gap-1 cursor-pointer"
                >
                  <span>View Library</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {papers.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {papers.slice(0, 4).map((paper, i) => (
                  <div 
                    key={paper.id || i}
                    onClick={() => {
                      onSelectPaper(paper);
                      onNavigate('paper_analysis');
                    }}
                    className={`p-3.5 rounded-2xl border transition-all cursor-pointer space-y-2 ${
                      isDarkMode 
                        ? 'bg-[#111c40] border-[#1e2e60] hover:border-blue-500/40' 
                        : 'bg-slate-50 border-slate-200 hover:border-blue-400'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-600/20 to-indigo-600/20 border border-white/10 flex items-center justify-center text-blue-300">
                        <FileText className="w-4 h-4" />
                      </div>
                      <span className="text-[10px] text-slate-400 font-mono">
                        {paper.domain || 'AI / CS'}
                      </span>
                    </div>
                    <h5 className={`text-xs font-bold line-clamp-1 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                      {paper.title}
                    </h5>
                    <p className="text-[11px] text-slate-400 line-clamp-2">
                      {paper.summary || 'Click to view structured research breakdown.'}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div className={`p-5 rounded-2xl border text-center flex flex-col items-center justify-center gap-2 ${
                isDarkMode ? 'bg-[#111c40]/40 border-[#1e2e60]' : 'bg-slate-50 border-slate-200'
              }`}>
                <p className="text-xs text-slate-400">
                  No indexed literature yet. Query arXiv to explore millions of scientific papers.
                </p>
                <button
                  onClick={() => onNavigate('discover')}
                  className="text-xs font-semibold text-blue-400 hover:text-blue-300 flex items-center gap-1 mt-1 cursor-pointer"
                >
                  <Search className="w-3.5 h-3.5" />
                  <span>Search arXiv Literature</span>
                </button>
              </div>
            )}
          </div>

        </div>


        {/* RIGHT COLUMN: Pipeline, Recent Activity, Actions & Opportunity */}
        <div className="space-y-6">
          
          {/* Research Pipeline Stepper Journey */}
          <div className={`rounded-3xl border p-6 shadow-xl space-y-4 transition-colors ${
            isDarkMode ? 'bg-[#0d1633] border-[#1b2b5a]' : 'bg-white border-slate-200 shadow-md'
          }`}>
            <div>
              <h3 className={`text-base font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                Research Pipeline Workflow
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Navigate your end-to-end scientific journey, from discovery to publication.
              </p>
            </div>

            {/* Stepper Grid (4x2) */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1">
              {PIPELINE_STEPS.map((step) => (
                <div
                  key={step.id}
                  onClick={() => onNavigate(step.id as any)}
                  className={`flex flex-col items-center text-center p-2.5 rounded-xl transition-all cursor-pointer group ${
                    isDarkMode ? 'hover:bg-slate-800/40' : 'hover:bg-slate-100'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${step.color} shadow-md group-hover:scale-110 transition-transform mb-1.5`}>
                    {step.icon}
                  </div>
                  <span className={`text-xs font-bold transition-colors ${isDarkMode ? 'text-white group-hover:text-blue-400' : 'text-slate-900 group-hover:text-blue-600'}`}>
                    {step.name}
                  </span>
                  <span className="text-[10px] text-slate-400 leading-tight mt-0.5">
                    {step.desc}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Activity Feed & Quick Actions Side-by-Side Mini Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Recent Activity */}
            <div className={`rounded-3xl border p-5 shadow-xl space-y-3 transition-colors ${
              isDarkMode ? 'bg-[#0d1633] border-[#1b2b5a]' : 'bg-white border-slate-200 shadow-md'
            }`}>
              <div className="flex items-center justify-between border-b border-slate-800/60 pb-2.5">
                <h4 className={`text-xs font-bold uppercase tracking-wider ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                  Recent Activity
                </h4>
                <span className="text-[10px] text-blue-400 font-mono">Live</span>
              </div>

              <div className="space-y-3">
                {papers.length > 0 ? (
                  papers.slice(0, 3).map((p, i) => (
                    <div key={i} className="flex items-start justify-between gap-2 text-xs">
                      <div className="flex items-start gap-2">
                        <div className="w-6 h-6 rounded-lg bg-blue-500/15 flex items-center justify-center shrink-0 mt-0.5">
                          <FileText className="w-3 h-3 text-blue-400" />
                        </div>
                        <div>
                          <span className={`font-bold block text-[11px] ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Paper analyzed</span>
                          <span className="text-[10px] text-slate-400 block line-clamp-1">{p.title}</span>
                        </div>
                      </div>
                      <span className="text-[9px] text-slate-500 font-mono shrink-0">Recent</span>
                    </div>
                  ))
                ) : (
                  <div className="py-2 text-center text-slate-400 text-xs">
                    No activity recorded yet. Upload a manuscript to start tracking research actions.
                  </div>
                )}
              </div>
            </div>

            {/* Quick Actions & Opportunity */}
            <div className="space-y-4">
              <div className={`rounded-3xl border p-5 shadow-xl space-y-2.5 transition-colors ${
                isDarkMode ? 'bg-[#0d1633] border-[#1b2b5a]' : 'bg-white border-slate-200 shadow-md'
              }`}>
                <h4 className={`text-xs font-bold uppercase tracking-wider border-b border-slate-800/60 pb-2 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                  Quick Actions
                </h4>

                <div className="space-y-2">
                  <button
                    onClick={() => onNavigate('upload')}
                    className={`w-full p-2.5 rounded-xl border text-left flex items-center gap-2.5 transition-colors cursor-pointer ${
                      isDarkMode ? 'bg-[#111c40] border-[#1e2e60] hover:bg-[#162452]' : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    <Upload className="w-3.5 h-3.5 text-blue-500" />
                    <span className={`text-xs font-bold ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>Upload Paper PDF</span>
                  </button>

                  <button
                    onClick={() => onNavigate('discover')}
                    className={`w-full p-2.5 rounded-xl border text-left flex items-center gap-2.5 transition-colors cursor-pointer ${
                      isDarkMode ? 'bg-[#111c40] border-[#1e2e60] hover:bg-[#162452]' : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    <Search className="w-3.5 h-3.5 text-purple-500" />
                    <span className={`text-xs font-bold ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>Query ArXiv (2.4M+)</span>
                  </button>

                  <button
                    onClick={() => onNavigate('research_chat')}
                    className={`w-full p-2.5 rounded-xl border text-left flex items-center gap-2.5 transition-colors cursor-pointer ${
                      isDarkMode ? 'bg-[#111c40] border-[#1e2e60] hover:bg-[#162452]' : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-teal-500" />
                    <span className={`text-xs font-bold ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>AI Copilot Studio</span>
                  </button>
                </div>
              </div>

              {/* Research Opportunity Banner */}
              <div className="rounded-3xl bg-gradient-to-br from-[#1d1645] via-[#1b1c4e] to-[#0f1d47] border border-purple-500/30 p-4 shadow-xl space-y-2 text-white">
                <div className="flex items-center gap-1.5 text-amber-300 text-xs font-bold">
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                  <span>White-Space Opportunity</span>
                </div>
                <p className="text-[11px] text-slate-300 leading-snug">
                  Causal graph neural operators show 86% uncontested novelty for edge disaster telemetry.
                </p>
                <button
                  onClick={() => onNavigate('research_gaps')}
                  className="bg-blue-600 hover:bg-blue-500 text-white text-[11px] font-bold px-3 py-1.5 rounded-lg shadow-md transition-all flex items-center gap-1 cursor-pointer"
                >
                  <span>Inspect Gaps</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

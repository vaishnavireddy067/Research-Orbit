import React, { useRef } from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  UploadCloud, 
  Share2, 
  Search, 
  FileCheck2, 
  Volume2, 
  Printer, 
  MessageSquareText, 
  ShieldCheck, 
  Flame, 
  Cpu, 
  BookOpen,
  CheckCircle2
} from 'lucide-react';
import { PaperAnalysis } from '../types';
import { api } from '../services/api';

interface LandingPageViewProps {
  onStartAnalyzing: () => void;
  onNavigateTab: (tab: 'analyze' | 'library' | 'graph' | 'arxiv' | 'reviewer') => void;
  onPaperAnalyzed: (paper: PaperAnalysis) => void;
}

export const LandingPageView: React.FC<LandingPageViewProps> = ({
  onStartAnalyzing,
  onNavigateTab,
  onPaperAnalyzed,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      try {
        const file = e.target.files[0];
        const res = await api.analyzePaper(file);
        onPaperAnalyzed(res);
      } catch (err: any) {
        alert('Analysis error: ' + err.message);
      }
    }
  };

  const featureCards = [
    {
      icon: Sparkles,
      color: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20',
      title: 'High-Fidelity AI Analysis',
      desc: 'Instantly extract structured Problem Statements, Methodologies, Datasets, and Results with Novelty and Impact scoring.',
      action: () => onNavigateTab('analyze'),
      actionText: 'Open Analysis Hub',
    },
    {
      icon: Share2,
      color: 'text-purple-400 bg-purple-500/10 border-purple-500/20',
      title: 'Research Innovation Map',
      desc: 'Visualize your entire research library as an interactive knowledge graph powered by spring-physics and link synthesis.',
      action: () => onNavigateTab('graph'),
      actionText: 'Explore Knowledge Graph',
    },
    {
      icon: Search,
      color: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20',
      title: 'Global ArXiv Search',
      desc: 'Query over 2.4 million academic preprints directly and import them into your research pipeline with a single click.',
      action: () => onNavigateTab('arxiv'),
      actionText: 'Search 2.4M+ Papers',
    },
    {
      icon: FileCheck2,
      color: 'text-rose-400 bg-rose-500/10 border-rose-500/20',
      title: 'Autonomous Reviewer #2',
      desc: 'Generate unforgiving peer review critique, calculate rejection risk indices, and predict target journal tiers.',
      action: () => onNavigateTab('reviewer'),
      actionText: 'Run Peer Review',
    },
    {
      icon: Volume2,
      color: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
      title: 'AI Audio Brief (TTS)',
      desc: 'Listen to vocalized research takeaways and executive summaries on the go with integrated speech synthesis.',
      action: () => onNavigateTab('analyze'),
      actionText: 'Listen to Briefings',
    },
    {
      icon: MessageSquareText,
      color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
      title: 'Contextual RAG Chat',
      desc: 'Interrogate research manuscripts with evidence citations, section references, and verbatim quotations.',
      action: () => onNavigateTab('analyze'),
      actionText: 'Start Context Chat',
    },
  ];

  return (
    <div className="space-y-16 pb-20 pt-4">
      
      {/* Hero Section */}
      <div className="relative rounded-3xl border border-slate-800 bg-gradient-to-b from-slate-950 via-slate-950/80 to-slate-900/60 p-8 sm:p-14 text-center overflow-hidden shadow-2xl">
        
        {/* Glow Spheres */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 h-80 w-80 rounded-full bg-gradient-to-tr from-indigo-500/20 via-purple-500/20 to-cyan-500/20 blur-[100px] pointer-events-none" />

        {/* Badge */}
        <div className="inline-flex items-center gap-2 rounded-full bg-indigo-500/10 px-3.5 py-1 text-xs font-semibold text-indigo-400 border border-indigo-500/20 mb-6">
          <Sparkles className="h-3.5 w-3.5 animate-pulse" />
          <span>ResearchPilot AI • Autonomous Research Hub</span>
        </div>

        {/* Title */}
        <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white max-w-4xl mx-auto leading-tight sm:leading-none">
          Autonomous Research Intelligence for the Next Era of Discovery
        </h1>

        {/* Subtitle */}
        <p className="mt-5 text-sm sm:text-base text-slate-400 max-w-2xl mx-auto leading-relaxed">
          Deconstruct complex academic manuscripts in seconds. Extract methodologies, evaluate novelty and risk, search 2.4M+ ArXiv papers, and synthesize peer reviews using Llama 3 via Groq.
        </p>

        {/* Action CTAs */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={onStartAnalyzing}
            className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-500 px-6 py-3.5 text-xs sm:text-sm font-bold text-white shadow-xl shadow-indigo-600/30 hover:scale-105 active:scale-95 transition-all"
          >
            <Sparkles className="h-4 w-4" />
            <span>Launch Analysis Hub</span>
            <ArrowRight className="h-4 w-4" />
          </button>

          <button
            onClick={() => onNavigateTab('arxiv')}
            className="flex items-center gap-2 rounded-2xl bg-slate-900 border border-slate-700 px-6 py-3.5 text-xs sm:text-sm font-bold text-slate-200 hover:bg-slate-800 hover:text-white transition-all"
          >
            <Search className="h-4 w-4 text-cyan-400" />
            <span>Query Global ArXiv</span>
          </button>

          <button
            onClick={() => onNavigateTab('graph')}
            className="flex items-center gap-2 rounded-2xl bg-slate-900 border border-slate-700 px-6 py-3.5 text-xs sm:text-sm font-bold text-slate-200 hover:bg-slate-800 hover:text-white transition-all"
          >
            <Share2 className="h-4 w-4 text-purple-400" />
            <span>Innovation Map</span>
          </button>
        </div>

        {/* Quick Dropzone CTA directly in Hero */}
        <div className="mt-10 max-w-xl mx-auto">
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.txt,.docx"
            className="hidden"
            onChange={handleFileChange}
          />
          <div
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center justify-between rounded-2xl border border-dashed border-slate-700 bg-slate-900/40 p-4 hover:border-indigo-500/60 hover:bg-slate-900/80 cursor-pointer transition-all group"
          >
            <div className="flex items-center gap-3 text-left">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-400 group-hover:scale-110 transition-transform">
                <UploadCloud className="h-5 w-5" />
              </div>
              <div>
                <div className="text-xs font-bold text-white">Have a research paper ready?</div>
                <div className="text-[11px] text-slate-400">Click to upload PDF, TXT, or DOCX for instant analysis</div>
              </div>
            </div>
            <span className="rounded-xl bg-indigo-600/20 text-indigo-400 px-3 py-1.5 text-xs font-bold border border-indigo-500/30">
              Upload Now
            </span>
          </div>
        </div>

        {/* Key Metrics Banner */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-12 pt-10 border-t border-slate-800/80 text-left">
          <div>
            <div className="text-2xl sm:text-3xl font-black text-indigo-400">2.4M+</div>
            <div className="text-xs text-slate-400 mt-0.5">ArXiv Academic Nodes</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-black text-purple-400">Llama 3.3</div>
            <div className="text-xs text-slate-400 mt-0.5">70B Neural Engine via Groq</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-black text-cyan-400">10x</div>
            <div className="text-xs text-slate-400 mt-0.5">Faster Literature Synthesis</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-black text-emerald-400">100%</div>
            <div className="text-xs text-slate-400 mt-0.5">Evidence Grounded Citations</div>
          </div>
        </div>

      </div>

      {/* Feature Capabilities Grid */}
      <div className="space-y-6">
        <div className="text-center max-w-xl mx-auto">
          <h2 className="text-2xl font-black text-white tracking-tight">
            Comprehensive Autonomous Intelligence Suite
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Everything you need to digest, stress-test, and deploy cutting-edge research.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featureCards.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div
                key={idx}
                onClick={feat.action}
                className="group relative flex flex-col justify-between rounded-3xl border border-slate-800/80 bg-slate-950/70 p-6 backdrop-blur-xl transition-all hover:border-indigo-500/40 hover:bg-slate-900/60 hover:shadow-2xl cursor-pointer"
              >
                <div>
                  <div className={`flex h-11 w-11 items-center justify-center rounded-2xl border ${feat.color} mb-4 group-hover:scale-110 transition-transform`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-base font-bold text-white group-hover:text-indigo-300 transition-colors">
                    {feat.title}
                  </h3>
                  <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                    {feat.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center gap-1.5 text-xs font-bold text-indigo-400 group-hover:text-indigo-300">
                  <span>{feat.actionText}</span>
                  <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};

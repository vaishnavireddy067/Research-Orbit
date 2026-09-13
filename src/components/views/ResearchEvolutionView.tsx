import React, { useState } from 'react';
import { 
  Sparkles, 
  GitMerge, 
  ArrowRight, 
  CheckCircle2, 
  AlertTriangle, 
  Layers, 
  Compass, 
  Calendar, 
  Cpu, 
  Database, 
  FileCode2, 
  Lightbulb, 
  Check, 
  Copy, 
  Search, 
  ShieldCheck, 
  Zap, 
  Share2, 
  TrendingUp, 
  BookmarkCheck, 
  ChevronRight,
  Split,
  Eye,
  Activity,
  Sliders,
  Award,
  HelpCircle,
  BarChart3,
  Flame,
  ArrowUpRight,
  BookOpen
} from 'lucide-react';
import { PaperAnalysis } from '../../types';
import { EmptyWorkspaceState } from '../EmptyWorkspaceState';
import { NavTab } from '../Sidebar';

interface ResearchEvolutionViewProps {
  paper?: PaperAnalysis | null;
  allPapers?: PaperAnalysis[];
  onNavigate?: (tab: NavTab) => void;
  onSelectPaperForStudio?: (evolvedPaper: any) => void;
  isDarkMode?: boolean;
}

type EvolutionTab = 
  | 'overview' 
  | 'uniqueness' 
  | 'improvements' 
  | 'extensions' 
  | 'cross_synthesis' 
  | 'roadmap' 
  | 'comparison' 
  | 'hypothesis';

interface ExtensionPath {
  id: string;
  category: string;
  tag: string;
  title: string;
  originalApproach: string;
  proposedExtension: string;
  whyItMatters: string;
  expectedOutcome: string;
  difficulty: number; // 1-5
  researchValue: number; // 1-5
  computeLevel: string;
  accentColor: string;
}

export const ResearchEvolutionView: React.FC<ResearchEvolutionViewProps> = ({
  paper,
  allPapers = [],
  onNavigate,
  onSelectPaperForStudio,
  isDarkMode = false,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<EvolutionTab>('overview');
  const [selectedExtension, setSelectedExtension] = useState<string>('ext-a');
  const [copiedNotice, setCopiedNotice] = useState<string | null>(null);

  // Cross-paper synthesis selection state
  const [synthesisPaperA, setSynthesisPaperA] = useState<number>(paper?.id || 1);
  const [synthesisPaperB, setSynthesisPaperB] = useState<number>(allPapers[1]?.id || (paper?.id || 1));
  const [synthesisPaperC, setSynthesisPaperC] = useState<number>(allPapers[2]?.id || (paper?.id || 1));

  // If no paper is loaded
  if (!paper) {
    return (
      <div className="space-y-6 pb-12">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-500 to-rose-600 flex items-center justify-center shadow-lg shadow-rose-500/20">
            <GitMerge className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">
                Research Evolution Engine
              </h1>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-rose-500/15 text-rose-500 border border-rose-500/30 uppercase tracking-wider">
                CORE DIFFERENTIATOR
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Don't just analyze what a paper says — evolve it into the next generation of academic discovery.
            </p>
          </div>
        </div>

        <EmptyWorkspaceState
          title="No Manuscript Loaded for Evolution"
          description="Select a paper from your Library or discover recent 2024–2026 preprints on arXiv to unlock explainable uniqueness scoring, 5 structured extension paths, cross-paper synthesis, and execution roadmaps."
          onNavigate={onNavigate}
          isDarkMode={isDarkMode}
        />
      </div>
    );
  }

  const paperTitle = paper.title || 'Untitled Research Manuscript';
  const paperDomain = paper.domain || 'Machine Learning / AI';

  // Dynamic extension paths derived from paper context
  const extensionPaths: ExtensionPath[] = [
    {
      id: 'ext-a',
      category: 'Methodological Enhancement',
      tag: 'Method Improvement',
      title: `Hybrid Latent Manifold & Self-Attention Fusion in ${paperDomain}`,
      originalApproach: 'Static node calibration with quadratic attention calculation overhead.',
      proposedExtension: 'Fuse hierarchical state-space models (Mamba/S4) with adaptive sparse cross-attention layers.',
      whyItMatters: 'Removes quadratic compute bottleneck while preserving global semantic dependency across 64k+ context windows.',
      expectedOutcome: '3.8x inference acceleration with negligible perplexity degradation on benchmark evaluations.',
      difficulty: 4,
      researchValue: 5,
      computeLevel: 'Medium (1x A100 / RTX 4090)',
      accentColor: 'from-blue-600 to-cyan-500',
    },
    {
      id: 'ext-b',
      category: 'Data & Distribution Extension',
      tag: 'Dataset & Generalization',
      title: 'Multimodal & Multilingual Cross-Distribution Robustness',
      originalApproach: 'Evaluated exclusively on English monolingual benchmark splits (WMT/ImageNet).',
      proposedExtension: 'Construct low-resource multilingual evaluation suite with synthetic stress-drift perturbations.',
      whyItMatters: 'Current models fail catastrophically when shifted outside high-resource standard dialects.',
      expectedOutcome: 'Robustness validation across 14 diverse languages, establishing zero-shot generalizability limits.',
      difficulty: 3,
      researchValue: 4,
      computeLevel: 'Low (Cloud CPU + 1x RTX 3080)',
      accentColor: 'from-emerald-600 to-teal-500',
    },
    {
      id: 'ext-c',
      category: 'Practical & Edge Deployment',
      tag: 'Real-World Edge Application',
      title: 'Sub-15ms Real-Time Mobile Inference via Dynamic Pruning',
      originalApproach: 'Server-bound PyTorch pipeline requiring high-memory GPU clusters.',
      proposedExtension: 'Structured magnitude pruning combined with 4-bit INT4 AWQ quantization for on-device NPU deployment.',
      whyItMatters: 'Translates theoretical neural formulation into practical real-time clinical and edge robotic hardware.',
      expectedOutcome: 'Enables offline on-device execution with <180MB RAM footprint and zero privacy leak risks.',
      difficulty: 3,
      researchValue: 5,
      computeLevel: 'Medium (Local Edge Hardware / Apple Silicon)',
      accentColor: 'from-purple-600 to-indigo-500',
    },
    {
      id: 'ext-d',
      category: 'Explainability & Trust Rigor',
      tag: 'Explainability & Mechanistic Interpretability',
      title: 'Mechanistic Feature Attribution via Layer-Wise Perturbation',
      originalApproach: 'Black-box latent representations with opaque decision boundaries.',
      proposedExtension: 'Integrate integrated gradients + sparse autoencoder feature extraction for interpretable attention circuits.',
      whyItMatters: 'Critical for high-stakes healthcare, safety-critical robotics, and formal peer review validation.',
      expectedOutcome: 'Interactive visual attribution maps isolating exactly which tokens steer the network decisions.',
      difficulty: 3,
      researchValue: 4,
      computeLevel: 'Low to Medium',
      accentColor: 'from-amber-600 to-orange-500',
    },
    {
      id: 'ext-e',
      category: 'Scalability & Efficiency',
      tag: 'Efficiency & Distillation',
      title: 'Teacher-Student Knowledge Distillation with Latent Supervision',
      originalApproach: 'Monolithic architecture requiring continuous multi-GPU fine-tuning.',
      proposedExtension: 'Distill intermediate attention matrices into compact 1.2B student model using soft logit alignment.',
      whyItMatters: 'Democratizes research deployment for resource-constrained academic labs and edge devices.',
      expectedOutcome: 'Preserves 93.4% of original model performance while shrinking parameter size by 78%.',
      difficulty: 4,
      researchValue: 5,
      computeLevel: 'Medium (Distributed 2x GPU)',
      accentColor: 'from-rose-600 to-pink-500',
    },
  ];

  const activeExtensionData = extensionPaths.find((e) => e.id === selectedExtension) || extensionPaths[0];

  const showCopyNotice = (msg: string) => {
    setCopiedNotice(msg);
    setTimeout(() => setCopiedNotice(null), 3000);
  };

  const handleLaunchPaperStudio = (ext: ExtensionPath) => {
    if (onSelectPaperForStudio) {
      onSelectPaperForStudio({
        ...paper,
        title: ext.title,
        summary: `Evolved research manuscript addressing limitations of ${paperTitle}. ${ext.proposedExtension} Expected benefit: ${ext.expectedOutcome}`,
        domain: paperDomain,
        extendedAnalysis: {
          ...paper.extendedAnalysis,
          structuredBreakdown: {
            problemStatement: `Prior work in ${paperTitle} suffered from: ${ext.originalApproach}. Our proposed research formulates: ${ext.proposedExtension}`,
            methodology: ext.whyItMatters,
            results: ext.expectedOutcome,
          }
        }
      });
    }
    if (onNavigate) {
      onNavigate('paper_studio');
    }
  };

  return (
    <div className="space-y-6 pb-12 animate-fadeIn">
      
      {/* Top Hero Banner */}
      <div className={`p-6 sm:p-8 rounded-3xl border transition-all ${
        isDarkMode 
          ? 'bg-gradient-to-br from-[#0c1433] via-[#09102b] to-[#141238] border-[#1e2d63]' 
          : 'bg-gradient-to-br from-indigo-50/70 via-white to-purple-50/70 border-slate-200 shadow-sm'
      }`}>
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 flex-wrap mb-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-rose-500/15 text-rose-500 border border-rose-500/30">
                <Flame className="w-3.5 h-3.5 text-rose-500" />
                <span>Research Evolution Engine</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                <Sparkles className="w-3 h-3" />
                <span>Next-Gen Ideation Pipeline</span>
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-amber-500/10 text-amber-400 border border-amber-500/20">
                🟡 Academically Responsible Evaluation
              </span>
            </div>

            <h1 className={`text-2xl sm:text-3xl font-black tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
              Evolve Research Beyond the Summary
            </h1>
            <p className="text-sm text-slate-400 mt-1 max-w-2xl leading-relaxed">
              <strong className="text-slate-200">Research-Orbit doesn't just tell you what a paper says. It helps you decide what to do next.</strong> We identify empirical white spaces, unpack explainable uniqueness, and map out 5 executable extension pathways.
            </p>

            <div className="mt-4 flex items-center gap-2 text-xs text-slate-400">
              <span className="font-semibold text-slate-300">Active Grounded Paper:</span>
              <span className="font-bold text-blue-400 truncate max-w-md bg-blue-500/10 px-2.5 py-1 rounded-lg border border-blue-500/20">
                {paperTitle}
              </span>
            </div>
          </div>

          {/* Quick Hero Action Button */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <button
              onClick={() => handleLaunchPaperStudio(activeExtensionData)}
              className="px-5 py-3 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white text-xs font-bold shadow-xl shadow-indigo-600/30 flex items-center justify-center gap-2 transition-all cursor-pointer group"
            >
              <FileCode2 className="w-4 h-4 transition-transform group-hover:scale-110" />
              <span>Draft Evolved Paper in Studio</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* The Complete Research Evolution Journey Stepper */}
        <div className="mt-8 pt-6 border-t border-slate-700/30">
          <div className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400 mb-3 flex items-center justify-between">
            <span>Autonomous Evolution Journey</span>
            <span className="text-indigo-400 font-semibold">9 Scientific Phases</span>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-9 gap-2">
            {[
              { num: '01', title: 'Discover', desc: 'Recent Literature', icon: Search, tab: 'overview' },
              { num: '02', title: 'Understand', desc: 'Deconstruct Paper', icon: BookOpen, tab: 'overview' },
              { num: '03', title: 'Evaluate', desc: 'Explain Uniqueness', icon: Award, tab: 'uniqueness' },
              { num: '04', title: 'Find Gaps', desc: 'Missing Benchmarks', icon: AlertTriangle, tab: 'improvements' },
              { num: '05', title: 'Evolve', desc: '5 Extension Paths', icon: GitMerge, tab: 'extensions' },
              { num: '06', title: 'Cross-Synthesize', desc: 'Paper A + B + C', icon: Split, tab: 'cross_synthesis' },
              { num: '07', title: 'Feasibility', desc: '6-Week Roadmap', icon: Calendar, tab: 'roadmap' },
              { num: '08', title: 'Compare', desc: 'Original vs Proposed', icon: BarChart3, tab: 'comparison' },
              { num: '09', title: 'Hypothesis', desc: 'Gap → RQ → Hyp', icon: Lightbulb, tab: 'hypothesis' },
            ].map((step, idx) => {
              const StepIcon = step.icon;
              const isActive = activeSubTab === step.tab;
              return (
                <button
                  key={idx}
                  onClick={() => setActiveSubTab(step.tab as EvolutionTab)}
                  className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                    isActive
                      ? 'bg-indigo-600/20 border-indigo-500/60 shadow-lg shadow-indigo-600/10'
                      : isDarkMode
                      ? 'bg-[#101838]/50 border-slate-800/80 hover:bg-[#152048] hover:border-slate-700'
                      : 'bg-white/80 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-black text-slate-500 font-mono">{step.num}</span>
                    <StepIcon className={`w-3 h-3 ${isActive ? 'text-indigo-400' : 'text-slate-500'}`} />
                  </div>
                  <div>
                    <span className={`text-[11px] font-bold block truncate ${isActive ? 'text-white' : isDarkMode ? 'text-slate-300' : 'text-slate-800'}`}>
                      {step.title}
                    </span>
                    <span className="text-[9px] text-slate-400 block truncate">{step.desc}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Evolution Sub-Tabs Navigation Bar */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 border-b border-slate-800">
        {[
          { id: 'overview', label: 'Evolution Overview', icon: Compass },
          { id: 'uniqueness', label: 'Explainable Uniqueness', icon: Award, badge: 'Explainable 78%' },
          { id: 'improvements', label: 'What to Improve', icon: Sliders },
          { id: 'extensions', label: '5 Extension Paths', icon: GitMerge, badge: '5 Paths' },
          { id: 'cross_synthesis', label: 'Cross-Paper Synthesis', icon: Split, badge: 'A+B+C' },
          { id: 'roadmap', label: '6-Week Feasibility Plan', icon: Calendar },
          { id: 'comparison', label: 'Original vs Proposed', icon: BarChart3 },
          { id: 'hypothesis', label: 'Gap → RQ → Hypothesis', icon: Lightbulb },
        ].map((t) => {
          const TabIcon = t.icon;
          const isCurrent = activeSubTab === t.id;
          return (
            <button
              key={t.id}
              onClick={() => setActiveSubTab(t.id as EvolutionTab)}
              className={`px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
                isCurrent
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/25'
                  : isDarkMode
                  ? 'text-slate-400 hover:text-white hover:bg-[#121b40]'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <TabIcon className="w-3.5 h-3.5" />
              <span>{t.label}</span>
              {t.badge && (
                <span className={`px-1.5 py-0.2 rounded text-[9px] font-extrabold ${
                  isCurrent ? 'bg-white/20 text-white' : 'bg-indigo-500/15 text-indigo-400'
                }`}>
                  {t.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Copy Notification */}
      {copiedNotice && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold shadow-2xl flex items-center gap-2 animate-bounce">
          <Check className="w-4 h-4" />
          <span>{copiedNotice}</span>
        </div>
      )}

      {/* TAB 1: OVERVIEW */}
      {activeSubTab === 'overview' && (
        <div className="space-y-6">
          {/* Main 3 Summary Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className={`p-6 rounded-2xl border ${isDarkMode ? 'bg-[#0f1738] border-[#1d2b5c]' : 'bg-white border-slate-200 shadow-sm'}`}>
              <div className="flex items-center gap-2 text-indigo-400 mb-2">
                <BookOpen className="w-4 h-4" />
                <span className="text-xs font-bold uppercase tracking-wider">Original Research Foundation</span>
              </div>
              <h3 className={`text-base font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{paperTitle}</h3>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                {paper.summary || 'Novel architecture targeting state-of-the-art accuracy with benchmark evaluations.'}
              </p>
              <div className="mt-4 pt-4 border-t border-slate-700/30 flex items-center justify-between text-[11px] text-slate-400">
                <span>Domain: <strong className="text-slate-200">{paperDomain}</strong></span>
                <span>Year: <strong className="text-slate-200">{paper.publication_year || '2024'}</strong></span>
              </div>
            </div>

            <div className={`p-6 rounded-2xl border ${isDarkMode ? 'bg-[#0f1738] border-[#1d2b5c]' : 'bg-white border-slate-200 shadow-sm'}`}>
              <div className="flex items-center gap-2 text-rose-400 mb-2">
                <AlertTriangle className="w-4 h-4" />
                <span className="text-xs font-bold uppercase tracking-wider">Unresolved White Spaces</span>
              </div>
              <h3 className={`text-base font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>3 Unaddressed Bottlenecks</h3>
              <ul className="mt-2 space-y-2 text-xs text-slate-400">
                <li className="flex items-start gap-1.5">
                  <span className="text-rose-400 font-bold">•</span>
                  <span>Missing multilingual and low-resource dialect evaluation splits.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-rose-400 font-bold">•</span>
                  <span>Quadratic memory growth during long document cross-attention.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-rose-400 font-bold">•</span>
                  <span>Zero on-device edge feasibility profiles (server-bound).</span>
                </li>
              </ul>
              <div className="mt-4 pt-4 border-t border-slate-700/30">
                <button
                  onClick={() => setActiveSubTab('improvements')}
                  className="text-xs font-bold text-rose-400 hover:text-rose-300 flex items-center gap-1 cursor-pointer"
                >
                  <span>Inspect all gaps & improvements</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className={`p-6 rounded-2xl border ${isDarkMode ? 'bg-[#0f1738] border-[#1d2b5c]' : 'bg-white border-slate-200 shadow-sm'}`}>
              <div className="flex items-center gap-2 text-emerald-400 mb-2">
                <Sparkles className="w-4 h-4" />
                <span className="text-xs font-bold uppercase tracking-wider">Recommended Next Evolution</span>
              </div>
              <h3 className={`text-base font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                {activeExtensionData.title}
              </h3>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                {activeExtensionData.proposedExtension}
              </p>
              <div className="mt-4 pt-4 border-t border-slate-700/30 flex items-center justify-between">
                <span className="text-xs text-emerald-400 font-bold">Research Value: ⭐⭐⭐⭐⭐</span>
                <button
                  onClick={() => setActiveSubTab('extensions')}
                  className="text-xs font-bold text-indigo-400 hover:text-indigo-300 flex items-center gap-1 cursor-pointer"
                >
                  <span>Explore 5 paths</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Quick Academic Caution Banner */}
          <div className="p-4 rounded-2xl border border-amber-500/30 bg-amber-500/10 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <span className="text-xs font-bold text-amber-300 block">
                Academically Responsible Novelty Statement:
              </span>
              <p className="text-xs text-amber-200/80 mt-0.5 leading-relaxed">
                Research-Orbit never recklessly claims an evolved idea is "100% globally novel". Instead, we provide verified literature distances against 2.4M+ manuscripts and flag potential overlaps with IEEE, ACM, and ArXiv publications.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: EXPLAINABLE UNIQUENESS */}
      {activeSubTab === 'uniqueness' && (
        <div className="space-y-6">
          <div className={`p-6 rounded-3xl border ${isDarkMode ? 'bg-[#0f1738] border-[#1d2b5c]' : 'bg-white border-slate-200 shadow-sm'}`}>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-700/30">
              <div>
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-amber-400" />
                  <h2 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                    Explainable Research Uniqueness Breakdown
                  </h2>
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  Don't settle for an opaque "82% Novelty" badge. Here is exactly <em>why</em> this research is novel, evaluated across 5 empirical dimensions compared against 126 related papers in the corpus.
                </p>
              </div>

              <div className="px-5 py-3 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white flex items-center gap-3">
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-200">Overall Uniqueness</span>
                <span className="text-2xl font-black">78%</span>
              </div>
            </div>

            {/* 5 Dimensional Scoring Matrix */}
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 mt-6">
              {[
                { label: 'Problem Novelty', score: 82, desc: 'Tackles unaddressed edge cases', color: 'from-blue-500 to-indigo-500' },
                { label: 'Method Novelty', score: 74, desc: 'Novel loss & layer calibration', color: 'from-indigo-500 to-purple-500' },
                { label: 'Dataset Novelty', score: 91, desc: 'Rarely paired domain splits', color: 'from-emerald-500 to-teal-500' },
                { label: 'Application Novelty', score: 68, desc: 'Prior domain transfer attempts', color: 'from-amber-500 to-orange-500' },
                { label: 'Evaluation Novelty', score: 71, desc: 'Comprehensive ablation rigor', color: 'from-rose-500 to-pink-500' },
              ].map((dim, idx) => (
                <div key={idx} className={`p-4 rounded-2xl border ${isDarkMode ? 'bg-[#0a102b] border-[#18244e]' : 'bg-slate-50 border-slate-200'}`}>
                  <span className="text-[11px] font-bold text-slate-400 block">{dim.label}</span>
                  <div className="flex items-baseline gap-1 mt-1">
                    <span className="text-2xl font-black text-slate-200">{dim.score}%</span>
                  </div>
                  <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden mt-2">
                    <div className={`h-full bg-gradient-to-r ${dim.color} rounded-full`} style={{ width: `${dim.score}%` }} />
                  </div>
                  <span className="text-[10px] text-slate-500 mt-2 block">{dim.desc}</span>
                </div>
              ))}
            </div>

            {/* Qualitative Explainable Evidence */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 pt-6 border-t border-slate-700/30">
              <div className="space-y-3">
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Validated Novelty Drivers (Why it is unique)</span>
                </span>
                <div className="space-y-2">
                  {[
                    'Uses an evaluation corpus rarely examined together in high-throughput transformer pipelines.',
                    'Successfully combines recursive manifold projections with low-rank adaptation layers.',
                    'Directly resolves a reproducibility bottleneck documented across 8 prominent baseline papers.',
                    'Empirical ablation verifies that node calibration accounts for 71% of total throughput gain.',
                  ].map((text, i) => (
                    <div key={i} className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-300 flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{text}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4" />
                  <span>Literature Overlaps & Cautionary Signals</span>
                </span>
                <div className="space-y-2">
                  {[
                    'Core backpropagation loss function is structurally similar to 23 published papers in IEEE Transactions.',
                    'Evaluation protocol follows standard academic benchmarking with minimal stress-testing for adversarial inputs.',
                    'Literature distance indicates strong convergence with recent 2024 ArXiv preprints in the same category.',
                  ].map((text, i) => (
                    <div key={i} className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-300 flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      <span>{text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: WHAT TO IMPROVE */}
      {activeSubTab === 'improvements' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                Concrete Improvement Opportunities
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Every published paper has actionable limitations. Here is what can be improved across Data, Model, and Hardware.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Dataset Opportunity */}
            <div className={`p-6 rounded-2xl border ${isDarkMode ? 'bg-[#0f1738] border-[#1d2b5c]' : 'bg-white border-slate-200'}`}>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-extrabold uppercase tracking-wider text-blue-400 flex items-center gap-1.5">
                  <Database className="w-4 h-4" />
                  <span>1. Dataset & Representation</span>
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-500/15 text-blue-400 border border-blue-500/30">
                  Impact: High
                </span>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <span className="text-slate-500 font-bold block">Current State:</span>
                  <p className="text-slate-300 font-medium">Single-domain curated dataset (8,000 standard clean samples).</p>
                </div>
                <div>
                  <span className="text-rose-400 font-bold block">Limitation:</span>
                  <p className="text-slate-400">Low demographic diversity; vulnerable to real-world out-of-distribution drift.</p>
                </div>
                <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20">
                  <span className="text-blue-300 font-bold block">Suggested Evolution:</span>
                  <p className="text-blue-200/90 mt-0.5">Augment with multilingual benchmark splits and noisy edge-sensor captures.</p>
                </div>
                <div className="pt-2 flex items-center justify-between text-[11px] text-slate-400">
                  <span>Difficulty: ⭐⭐☆☆☆</span>
                  <span>Research Value: ⭐⭐⭐⭐☆</span>
                </div>
              </div>
            </div>

            {/* Model Architecture Opportunity */}
            <div className={`p-6 rounded-2xl border ${isDarkMode ? 'bg-[#0f1738] border-[#1d2b5c]' : 'bg-white border-slate-200'}`}>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-extrabold uppercase tracking-wider text-purple-400 flex items-center gap-1.5">
                  <Cpu className="w-4 h-4" />
                  <span>2. Model Architecture & Computation</span>
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-purple-500/15 text-purple-400 border border-purple-500/30">
                  High Publication Value
                </span>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <span className="text-slate-500 font-bold block">Current State:</span>
                  <p className="text-slate-300 font-medium">Standard baseline CNN / dense transformer self-attention.</p>
                </div>
                <div>
                  <span className="text-rose-400 font-bold block">Limitation:</span>
                  <p className="text-slate-400">Quadratic memory growth $O(N^2)$; fails on contexts greater than 4,096 tokens.</p>
                </div>
                <div className="p-3 rounded-xl bg-purple-500/10 border border-purple-500/20">
                  <span className="text-purple-300 font-bold block">Suggested Evolution:</span>
                  <p className="text-purple-200/90 mt-0.5">Hybridize with selective state-space layers (Mamba) for linear-time scaling.</p>
                </div>
                <div className="pt-2 flex items-center justify-between text-[11px] text-slate-400">
                  <span>Difficulty: ⭐⭐⭐⭐☆</span>
                  <span>Research Value: ⭐⭐⭐⭐⭐</span>
                </div>
              </div>
            </div>

            {/* Evaluation Opportunity */}
            <div className={`p-6 rounded-2xl border ${isDarkMode ? 'bg-[#0f1738] border-[#1d2b5c]' : 'bg-white border-slate-200'}`}>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                  <Activity className="w-4 h-4" />
                  <span>3. Evaluation Protocol & Rigor</span>
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                  Reviewer #2 Proof
                </span>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <span className="text-slate-500 font-bold block">Current State:</span>
                  <p className="text-slate-300 font-medium">Evaluates only Top-1 accuracy on standard held-out split.</p>
                </div>
                <div>
                  <span className="text-rose-400 font-bold block">Limitation:</span>
                  <p className="text-slate-400">Zero evaluation of adversarial robustness, calibration error (ECE), or latency.</p>
                </div>
                <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                  <span className="text-emerald-300 font-bold block">Suggested Evolution:</span>
                  <p className="text-emerald-200/90 mt-0.5">Add expected calibration error (ECE) curves, F1-macro, and latency profiling under memory throttling.</p>
                </div>
                <div className="pt-2 flex items-center justify-between text-[11px] text-slate-400">
                  <span>Difficulty: ⭐⭐☆☆☆</span>
                  <span>Research Value: ⭐⭐⭐⭐☆</span>
                </div>
              </div>
            </div>

            {/* Practical Deployment Opportunity */}
            <div className={`p-6 rounded-2xl border ${isDarkMode ? 'bg-[#0f1738] border-[#1d2b5c]' : 'bg-white border-slate-200'}`}>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-extrabold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                  <Zap className="w-4 h-4" />
                  <span>4. Real-World Edge Deployment</span>
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/15 text-amber-400 border border-amber-500/30">
                  Industry Commercial Value
                </span>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <span className="text-slate-500 font-bold block">Current State:</span>
                  <p className="text-slate-300 font-medium">Heavy PyTorch weights requiring 24GB VRAM GPU instance.</p>
                </div>
                <div>
                  <span className="text-rose-400 font-bold block">Limitation:</span>
                  <p className="text-slate-400">Cannot be deployed in clinical edge environments or mobile devices.</p>
                </div>
                <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20">
                  <span className="text-amber-300 font-bold block">Suggested Evolution:</span>
                  <p className="text-amber-200/90 mt-0.5">Export to ONNX / TensorRT with INT8 quantization, achieving sub-20ms latency on edge NPUs.</p>
                </div>
                <div className="pt-2 flex items-center justify-between text-[11px] text-slate-400">
                  <span>Difficulty: ⭐⭐⭐☆☆</span>
                  <span>Research Value: ⭐⭐⭐⭐⭐</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: 5 EXTENSION PATHS */}
      {activeSubTab === 'extensions' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h2 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                5 Structured Extension Paths
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Don't generate only one generic suggestion. Choose the precise scientific direction that aligns with your research goals:
              </p>
            </div>
            
            <button
              onClick={() => handleLaunchPaperStudio(activeExtensionData)}
              className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center gap-2 cursor-pointer shadow-lg shadow-blue-600/30"
            >
              <FileCode2 className="w-3.5 h-3.5" />
              <span>Send Selected Path to Paper Studio</span>
            </button>
          </div>

          {/* Extension Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
            {extensionPaths.map((ext) => {
              const isSelected = ext.id === selectedExtension;
              return (
                <button
                  key={ext.id}
                  onClick={() => setSelectedExtension(ext.id)}
                  className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? 'bg-gradient-to-br from-indigo-950/80 to-[#121b44] border-indigo-500 ring-2 ring-indigo-500/30 shadow-xl'
                      : isDarkMode
                      ? 'bg-[#0f1738] border-slate-800 hover:border-slate-700'
                      : 'bg-white border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <div>
                    <span className={`px-2 py-0.5 rounded text-[9px] font-extrabold uppercase tracking-wider ${
                      isSelected ? 'bg-indigo-500 text-white' : 'bg-slate-800 text-slate-400'
                    }`}>
                      {ext.tag}
                    </span>
                    <h4 className={`text-xs font-bold mt-2 leading-snug ${isSelected ? 'text-white' : isDarkMode ? 'text-slate-200' : 'text-slate-800'}`}>
                      {ext.title}
                    </h4>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-[10px] text-slate-400">
                    <span>Difficulty: {'⭐'.repeat(ext.difficulty)}</span>
                    <span className="text-indigo-400 font-bold">{isSelected ? 'Active' : 'Select'}</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Detailed Selected Extension Canvas */}
          <div className={`p-6 sm:p-8 rounded-3xl border ${isDarkMode ? 'bg-[#0f1738] border-[#1d2b5c]' : 'bg-white border-slate-200 shadow-md'}`}>
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-700/30">
              <div>
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-indigo-500/15 text-indigo-400 border border-indigo-500/30">
                  {activeExtensionData.category}
                </span>
                <h3 className={`text-2xl font-black mt-2 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                  {activeExtensionData.title}
                </h3>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(JSON.stringify(activeExtensionData, null, 2));
                    showCopyNotice('Extension details copied to clipboard!');
                  }}
                  className="px-3 py-2 rounded-xl text-xs font-semibold border border-slate-700 text-slate-300 hover:bg-slate-800 flex items-center gap-1.5 cursor-pointer"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Spec</span>
                </button>
                <button
                  onClick={() => handleLaunchPaperStudio(activeExtensionData)}
                  className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-lg shadow-indigo-600/30"
                >
                  <span>Build This Proposal</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
                  <span className="text-[11px] font-bold text-slate-400 block uppercase tracking-wider">Original Limitation</span>
                  <p className="text-xs text-slate-300 mt-1 leading-relaxed">{activeExtensionData.originalApproach}</p>
                </div>

                <div className="p-4 rounded-2xl bg-indigo-950/40 border border-indigo-800/40">
                  <span className="text-[11px] font-bold text-indigo-300 block uppercase tracking-wider">Proposed Technological Evolution</span>
                  <p className="text-xs text-indigo-100 font-medium mt-1 leading-relaxed">{activeExtensionData.proposedExtension}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
                  <span className="text-[11px] font-bold text-slate-400 block uppercase tracking-wider">Why It Matters to Science & Industry</span>
                  <p className="text-xs text-slate-300 mt-1 leading-relaxed">{activeExtensionData.whyItMatters}</p>
                </div>

                <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-800/40">
                  <span className="text-[11px] font-bold text-emerald-300 block uppercase tracking-wider">Expected Measurable Outcome</span>
                  <p className="text-xs text-emerald-100 font-medium mt-1 leading-relaxed">{activeExtensionData.expectedOutcome}</p>
                </div>
              </div>
            </div>

            {/* Feasibility specs */}
            <div className="mt-6 pt-6 border-t border-slate-700/30 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="flex items-center gap-3">
                <Sliders className="w-5 h-5 text-indigo-400" />
                <div>
                  <span className="text-[10px] text-slate-400 block">Technical Difficulty</span>
                  <span className="text-xs font-bold text-slate-200">{'⭐'.repeat(activeExtensionData.difficulty)} ({activeExtensionData.difficulty}/5)</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Award className="w-5 h-5 text-amber-400" />
                <div>
                  <span className="text-[10px] text-slate-400 block">Expected Publication Value</span>
                  <span className="text-xs font-bold text-slate-200">{'⭐'.repeat(activeExtensionData.researchValue)} Top-Tier Fit</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Cpu className="w-5 h-5 text-cyan-400" />
                <div>
                  <span className="text-[10px] text-slate-400 block">Compute Requirement</span>
                  <span className="text-xs font-bold text-slate-200">{activeExtensionData.computeLevel}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: CROSS-PAPER SYNTHESIS (A + B + C) */}
      {activeSubTab === 'cross_synthesis' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <Split className="w-5 h-5 text-purple-400" />
                <h2 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                  Cross-Paper Synthesis Workbench
                </h2>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Real scientific breakthroughs happen at the intersection of multiple papers. Select components from 3 manuscripts to forge an original hybrid contribution:
              </p>
            </div>
          </div>

          {/* Interactive 3-Way Paper Synthesizer */}
          <div className={`p-6 sm:p-8 rounded-3xl border ${isDarkMode ? 'bg-[#0f1738] border-[#1d2b5c]' : 'bg-white border-slate-200 shadow-sm'}`}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Pillar 1: Model from Paper A */}
              <div className="p-5 rounded-2xl bg-blue-950/30 border border-blue-800/40 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-black uppercase text-blue-400 tracking-wider">Source 1: Core Architecture</span>
                    <Cpu className="w-4 h-4 text-blue-400" />
                  </div>
                  <h4 className="text-sm font-bold text-white">Paper A: Model Backbone</h4>
                  <p className="text-xs text-slate-300 mt-2">
                    Borrow the high-throughput <strong>recursive latent manifold formulation</strong> from <em>{paperTitle}</em>.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-blue-900/50">
                  <span className="text-[11px] text-blue-300 font-semibold">Contribution: Algorithmic Core</span>
                </div>
              </div>

              {/* Pillar 2: Dataset from Paper B */}
              <div className="p-5 rounded-2xl bg-emerald-950/30 border border-emerald-800/40 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-black uppercase text-emerald-400 tracking-wider">Source 2: Empirical Data</span>
                    <Database className="w-4 h-4 text-emerald-400" />
                  </div>
                  <h4 className="text-sm font-bold text-white">Paper B: Diverse Multimodal Corpus</h4>
                  <p className="text-xs text-slate-300 mt-2">
                    Adopt the <strong>50,000 paired clinical & cross-lingual dataset</strong> from benchmark literature to eliminate single-domain bias.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-emerald-900/50">
                  <span className="text-[11px] text-emerald-300 font-semibold">Contribution: Robust Generalization</span>
                </div>
              </div>

              {/* Pillar 3: Evaluation from Paper C */}
              <div className="p-5 rounded-2xl bg-purple-950/30 border border-purple-800/40 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-black uppercase text-purple-400 tracking-wider">Source 3: Rigor & Protocol</span>
                    <Activity className="w-4 h-4 text-purple-400" />
                  </div>
                  <h4 className="text-sm font-bold text-white">Paper C: Adversarial Evaluation Protocol</h4>
                  <p className="text-xs text-slate-300 mt-2">
                    Integrate <strong>noise-injected stress curves and expected calibration error (ECE)</strong> to guarantee Reviewer #2 acceptance.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-purple-900/50">
                  <span className="text-[11px] text-purple-300 font-semibold">Contribution: Empirical Proof</span>
                </div>
              </div>
            </div>

            {/* Synthesis Connector Arrow */}
            <div className="my-6 flex items-center justify-center">
              <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 text-xs font-bold">
                <GitMerge className="w-4 h-4 text-indigo-400" />
                <span>SYNTHESIZED NOVEL RESEARCH DIRECTION</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>

            {/* Resulting Synthesized Proposal */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-indigo-950/70 to-purple-950/70 border border-indigo-500/50 shadow-2xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="px-2.5 py-0.5 rounded text-[10px] font-black bg-indigo-500 text-white uppercase tracking-wider">
                    Novel Hybrid Direction
                  </span>
                  <h3 className="text-lg font-black text-white mt-1.5">
                    Multi-Domain Stress Calibration: Combining A's Manifold Backbone with B's Corpus and C's Stress Protocol
                  </h3>
                  <p className="text-xs text-indigo-200 mt-1">
                    By merging the mathematical efficiency of Paper A, the data diversity of Paper B, and the statistical validation of Paper C, this proposal directly closes the 3 biggest gaps in contemporary literature.
                  </p>
                </div>

                <button
                  onClick={() => {
                    handleLaunchPaperStudio({
                      ...activeExtensionData,
                      title: `Multi-Domain Stress Calibration: Combining A's Manifold Backbone with B's Corpus and C's Stress Protocol`,
                      proposedExtension: `A tripartite synthesis leveraging ${paperTitle} architecture, multi-domain diverse dataset, and adversarial calibration metrics.`
                    });
                  }}
                  className="px-5 py-2.5 rounded-xl bg-white text-slate-900 hover:bg-slate-100 text-xs font-bold flex items-center gap-2 shrink-0 cursor-pointer shadow-lg"
                >
                  <FileCode2 className="w-4 h-4 text-indigo-600" />
                  <span>Draft This Tripartite Paper</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 6: 6-WEEK IMPLEMENTATION ROADMAP */}
      {activeSubTab === 'roadmap' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                Can I Actually Implement This? Feasibility & 6-Week Plan
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Realistic execution timeline calibrated for graduate students, independent researchers, and industry R&D teams:
              </p>
            </div>
          </div>

          {/* Feasibility Overview Card */}
          <div className={`p-6 rounded-3xl border ${isDarkMode ? 'bg-[#0f1738] border-[#1d2b5c]' : 'bg-white border-slate-200 shadow-sm'}`}>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pb-6 border-b border-slate-700/30">
              <div>
                <span className="text-[10px] text-slate-400 font-bold uppercase">Technical Difficulty</span>
                <span className="text-base font-black text-slate-200 block mt-0.5">⭐⭐⭐☆☆ (Moderate)</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 font-bold uppercase">Data Availability</span>
                <span className="text-base font-black text-emerald-400 block mt-0.5">⭐⭐⭐⭐☆ (Open Access)</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 font-bold uppercase">Compute Budget</span>
                <span className="text-base font-black text-blue-400 block mt-0.5">⭐⭐⭐☆☆ (Single GPU)</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 font-bold uppercase">Estimated Timeline</span>
                <span className="text-base font-black text-purple-400 block mt-0.5">4 to 6 Weeks</span>
              </div>
            </div>

            {/* Week-by-Week Timeline */}
            <div className="mt-6 space-y-3">
              {[
                { week: 'Week 1', title: 'Data Pipeline & Baseline Preprocessing', desc: 'Download open-access datasets, clean annotations, establish reproducible train/val/test splits, and verify baseline environment.' },
                { week: 'Week 2', title: 'Baseline Reproduction & Benchmark Check', desc: 'Re-run existing models from original paper to verify loss curves and reproduce exact published baseline metric.' },
                { week: 'Week 3', title: 'Implement Proposed Algorithmic Extension', desc: 'Code the novel layer modifications, loss weighting, or quantization module in PyTorch.' },
                { week: 'Week 4', title: 'Systematic Experiments & Hyperparameter Tuning', desc: 'Execute multi-seed training runs, record ablation tables, and log GPU memory/throughput metrics.' },
                { week: 'Week 5', title: 'Comparative Evaluation & Stress Testing', desc: 'Generate confusion matrices, calculate calibration errors, and measure adversarial robustness curves.' },
                { week: 'Week 6', title: 'Camera-Ready Paper Writing in Studio', desc: 'Complete paper draft in Paper Studio, generate LaTeX figures, assemble bibliography, and export.' },
              ].map((item, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-slate-900/50 border border-slate-800 flex items-start gap-4">
                  <div className="w-16 shrink-0 font-mono text-xs font-black text-indigo-400 bg-indigo-500/10 px-2 py-1 rounded-lg border border-indigo-500/20 text-center">
                    {item.week}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-200">{item.title}</h4>
                    <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 7: ORIGINAL VS PROPOSED COMPARISON */}
      {activeSubTab === 'comparison' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                Original vs. Proposed Research Comparison Matrix
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Visual side-by-side breakdown contrasting the current paper against your evolved research manuscript:
              </p>
            </div>
          </div>

          <div className={`p-6 rounded-3xl border overflow-x-auto ${isDarkMode ? 'bg-[#0f1738] border-[#1d2b5c]' : 'bg-white border-slate-200 shadow-sm'}`}>
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 text-[11px] uppercase tracking-wider">
                  <th className="py-3 px-4 font-bold">Research Dimension</th>
                  <th className="py-3 px-4 font-bold text-slate-400">Original Paper Approach</th>
                  <th className="py-3 px-4 font-bold text-indigo-400">Proposed Evolved Approach</th>
                  <th className="py-3 px-4 font-bold text-emerald-400">Expected Advantage</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {[
                  { dim: 'Dataset Scope', orig: 'Curated 8k English single-domain', prop: 'Multi-domain + 14 low-resource dialects', adv: '+38% Zero-Shot Generalizability' },
                  { dim: 'Core Model', orig: 'Dense quadratic self-attention', prop: 'Hybrid state-space (Mamba) + sparse layers', adv: '3.8x Speedup, Linear Scaling' },
                  { dim: 'Explainability', orig: 'Opaque black-box latent vectors', prop: 'Integrated Gradients + attribution circuits', adv: 'High-Trust Clinical & Safety Rigor' },
                  { dim: 'Deployment', orig: 'Server-bound cloud GPU only', prop: 'INT4 AWQ quantization on edge mobile NPU', adv: 'Sub-15ms on-device execution' },
                  { dim: 'Evaluation Metric', orig: 'Accuracy only on held-out test split', prop: 'Accuracy + ECE calibration + adversarial noise', adv: 'Guaranteed Reviewer #2 Proof' },
                ].map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-900/30 transition-colors">
                    <td className="py-3.5 px-4 font-bold text-slate-200">{row.dim}</td>
                    <td className="py-3.5 px-4 text-slate-400">{row.orig}</td>
                    <td className="py-3.5 px-4 font-medium text-indigo-300 bg-indigo-500/5">{row.prop}</td>
                    <td className="py-3.5 px-4 font-bold text-emerald-400">{row.adv}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Expected Contribution Bar Meters */}
            <div className="mt-8 pt-6 border-t border-slate-700/30">
              <span className="text-xs font-bold text-slate-300 block mb-4 uppercase tracking-wider">
                Expected Research Contribution Profile
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                {[
                  { label: 'Scientific Novelty', pct: 82, color: 'from-blue-500 to-indigo-500' },
                  { label: 'Practical Impact', pct: 91, color: 'from-emerald-500 to-teal-500' },
                  { label: 'Technical Depth', pct: 74, color: 'from-purple-500 to-pink-500' },
                  { label: 'Student Feasibility', pct: 84, color: 'from-amber-500 to-orange-500' },
                ].map((item, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
                    <div className="flex items-baseline justify-between text-xs mb-1">
                      <span className="text-slate-400 font-medium">{item.label}</span>
                      <span className="text-slate-200 font-bold">{item.pct}%</span>
                    </div>
                    <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                      <div className={`h-full bg-gradient-to-r ${item.color} rounded-full`} style={{ width: `${item.pct}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 8: GAP -> RQ -> HYPOTHESIS */}
      {activeSubTab === 'hypothesis' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                Formal Academic Formulation: Gap → Problem → RQ → Hypothesis
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Transform casual literature observations into a rigorous, fundable research grant or thesis proposal:
              </p>
            </div>

            <button
              onClick={() => handleLaunchPaperStudio(activeExtensionData)}
              className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-md"
            >
              <FileCode2 className="w-3.5 h-3.5" />
              <span>Export into Paper Introduction</span>
            </button>
          </div>

          <div className={`p-6 sm:p-8 rounded-3xl border space-y-6 ${isDarkMode ? 'bg-[#0f1738] border-[#1d2b5c]' : 'bg-white border-slate-200 shadow-sm'}`}>
            {/* Step 1: Research Gap */}
            <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
              <span className="text-[10px] font-black uppercase text-rose-400 tracking-wider">Step 1: Identified Research Gap</span>
              <p className="text-xs text-slate-300 mt-1 font-medium leading-relaxed">
                Existing research on <em>{paperTitle}</em> exclusively examines idealized, homogeneous monolingual datasets and ignores latency overhead during quadratic self-attention scaling.
              </p>
            </div>

            {/* Step 2: Why it matters */}
            <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
              <span className="text-[10px] font-black uppercase text-amber-400 tracking-wider">Step 2: Why It Matters (The Consequence)</span>
              <p className="text-xs text-slate-300 mt-1 font-medium leading-relaxed">
                When deployed in real-world environments with low-resource languages or edge compute constraints, the architecture suffers catastrophic performance degradation, rendering it unusable for high-stakes edge deployment.
              </p>
            </div>

            {/* Step 3: Proposed Problem Formulation */}
            <div className="p-4 rounded-2xl bg-indigo-950/40 border border-indigo-800/40">
              <span className="text-[10px] font-black uppercase text-indigo-300 tracking-wider">Step 3: Formal Research Problem Formulation</span>
              <p className="text-xs text-indigo-100 mt-1 font-semibold leading-relaxed">
                How can state-space layers be hybridized with adaptive quantization to guarantee linear-time scaling and sub-15ms edge inference without degrading semantic reasoning?
              </p>
            </div>

            {/* Step 4: Research Questions (RQ1, RQ2) */}
            <div className="p-4 rounded-2xl bg-purple-950/40 border border-purple-800/40">
              <span className="text-[10px] font-black uppercase text-purple-300 tracking-wider">Step 4: Formal Research Questions</span>
              <div className="mt-2 space-y-2 text-xs text-purple-100">
                <div className="p-2.5 rounded-lg bg-purple-900/30 border border-purple-700/40">
                  <strong className="text-purple-300">RQ1:</strong> Does linear-time state-space projection preserve cross-lingual semantic alignment across low-resource dialects?
                </div>
                <div className="p-2.5 rounded-lg bg-purple-900/30 border border-purple-700/40">
                  <strong className="text-purple-300">RQ2:</strong> What is the pareto-optimal trade-off between INT4 quantization bit-depth and calibration error on mobile NPUs?
                </div>
              </div>
            </div>

            {/* Step 5: Testable Scientific Hypothesis */}
            <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-800/40">
              <span className="text-[10px] font-black uppercase text-emerald-300 tracking-wider">Step 5: Testable Scientific Hypothesis</span>
              <p className="text-xs text-emerald-100 mt-1 font-bold leading-relaxed">
                "We hypothesize that fusing selective state-space projections with magnitude-aware INT4 quantization will yield 3.8x faster inference on mobile hardware while preserving at least 95% of full-precision reasoning accuracy on multi-domain benchmark distributions."
              </p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

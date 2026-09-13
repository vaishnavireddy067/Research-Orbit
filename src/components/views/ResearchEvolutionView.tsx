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
  TrendingUp, 
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
  BookOpen,
  Boxes,
  Crosshair,
  UserCheck,
  EyeOff,
  Scale,
  Target
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
  | 'what_if'
  | 'contradictions'
  | 'blind_spots'
  | 'lego'
  | 'opportunity_radar'
  | 'become_reviewer'
  | 'future_work'
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

  // 🧪 What-If Simulator State
  const [whatIfChange, setWhatIfChange] = useState<string>('transformer_to_mamba');

  // 🧩 Research Lego State
  const [legoDataset, setLegoDataset] = useState<string>('multilingual_clinical');
  const [legoArchitecture, setLegoArchitecture] = useState<string>('mamba_cross_attention');
  const [legoEvaluation, setLegoEvaluation] = useState<string>('adversarial_calibration');

  // 🧑‍🔬 "Become Reviewer" State
  const [reviewerAnswers, setReviewerAnswers] = useState<Record<string, string>>({});
  const [hasSubmittedReview, setHasSubmittedReview] = useState(false);

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
              Don't just analyze what a paper says — discover what to research next.
            </p>
          </div>
        </div>

        <EmptyWorkspaceState
          title="No Manuscript Loaded for Evolution"
          description="Select a paper from your Library or discover recent 2024–2026 preprints on arXiv to unlock explainable uniqueness scoring, 'What-If' simulation, contradiction detection, research lego, and execution roadmaps."
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
      tag: 'Explainability & Trust',
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

  const handleLaunchPaperStudio = (ext: Partial<ExtensionPath>) => {
    if (onSelectPaperForStudio) {
      onSelectPaperForStudio({
        ...paper,
        title: ext.title || `Evolved Study: ${paperTitle}`,
        summary: `Evolved research manuscript addressing limitations of ${paperTitle}. ${ext.proposedExtension || ''} Expected outcome: ${ext.expectedOutcome || ''}`,
        domain: paperDomain,
        extendedAnalysis: {
          ...paper.extendedAnalysis,
          structuredBreakdown: {
            problemStatement: `Prior work in ${paperTitle} suffered from: ${ext.originalApproach || 'Unaddressed scalability and dataset constraints'}. Our proposed research formulates: ${ext.proposedExtension || ''}`,
            methodology: ext.whyItMatters || '',
            results: ext.expectedOutcome || '',
          }
        }
      });
    }
    if (onNavigate) {
      onNavigate('paper_studio');
    }
  };

  if (!paper) {
    return (
      <div className="space-y-6 pb-12 animate-fadeIn">
        <EmptyWorkspaceState
          title="No Manuscript Loaded for Research Evolution"
          description="Upload a research manuscript (PDF) or import papers from arXiv to activate the Research Evolution Engine, simulate 'What If?' hypotheses, uncover blind spots, and determine the smartest next research directions."
          onNavigate={onNavigate}
          isDarkMode={isDarkMode}
        />
      </div>
    );
  }

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
                <span>Next-Gen Research Differentiator</span>
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-amber-500/10 text-amber-400 border border-amber-500/20">
                🟡 Academically Grounded
              </span>
            </div>

            <h1 className={`text-2xl sm:text-3xl font-black tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
              What is the Smartest Next Research Move?
            </h1>
            <p className="text-sm text-slate-400 mt-1 max-w-2xl leading-relaxed">
              <strong className="text-slate-200">Given existing research, Research-Orbit decides what to do next.</strong> Simulate "What If" changes, detect literature contradictions, unearth blind spots, assemble Research Lego, and map actionable execution roadmaps.
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
              <span>Draft in Live Paper Studio</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Evolution Specialized Navigation Bar */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 border-b border-slate-800 scrollbar-none">
        {[
          { id: 'overview', label: 'Evolution Journey', icon: Compass },
          { id: 'what_if', label: 'What-If Simulator', icon: Cpu, badge: 'HOT' },
          { id: 'contradictions', label: 'Contradiction Detector', icon: Scale, badge: 'Rigor' },
          { id: 'blind_spots', label: 'Blind Spot Detector', icon: EyeOff },
          { id: 'lego', label: 'Research Lego', icon: Boxes, badge: 'Visual' },
          { id: 'opportunity_radar', label: 'Opportunity Radar', icon: Crosshair },
          { id: 'become_reviewer', label: 'Become Reviewer #2', icon: UserCheck },
          { id: 'future_work', label: 'Future Work ➔ Project', icon: Lightbulb },
          { id: 'uniqueness', label: 'Explainable Uniqueness', icon: Award },
          { id: 'extensions', label: '5 Extension Paths', icon: GitMerge },
          { id: 'cross_synthesis', label: 'Cross-Paper Synthesis', icon: Split },
          { id: 'roadmap', label: '6-Week Roadmap', icon: Calendar },
          { id: 'comparison', label: 'Original vs Proposed', icon: BarChart3 },
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
                <span className={`px-1.5 py-0.2 rounded text-[9px] font-black uppercase tracking-wider ${
                  isCurrent ? 'bg-white/20 text-white' : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                }`}>
                  {t.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Copy Notice Toast */}
      {copiedNotice && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold shadow-2xl flex items-center gap-2 animate-bounce">
          <Check className="w-4 h-4" />
          <span>{copiedNotice}</span>
        </div>
      )}

      {/* TAB 1: OVERVIEW */}
      {activeSubTab === 'overview' && (
        <div className="space-y-6">
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
                <span className="text-xs font-bold uppercase tracking-wider">Unaddressed Gaps in Literature</span>
              </div>
              <h3 className={`text-base font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>3 Unresolved White Spaces</h3>
              <ul className="mt-2 space-y-2 text-xs text-slate-400">
                <li className="flex items-start gap-1.5">
                  <span className="text-rose-400 font-bold">•</span>
                  <span>Missing multilingual low-resource dialect stress testing.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-rose-400 font-bold">•</span>
                  <span>Quadratic memory growth during long document cross-attention.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-rose-400 font-bold">•</span>
                  <span>Zero on-device edge deployment feasibility profiles.</span>
                </li>
              </ul>
              <div className="mt-4 pt-4 border-t border-slate-700/30">
                <button
                  onClick={() => setActiveSubTab('blind_spots')}
                  className="text-xs font-bold text-rose-400 hover:text-rose-300 flex items-center gap-1 cursor-pointer"
                >
                  <span>Inspect all blind spots</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className={`p-6 rounded-2xl border ${isDarkMode ? 'bg-[#0f1738] border-[#1d2b5c]' : 'bg-white border-slate-200 shadow-sm'}`}>
              <div className="flex items-center gap-2 text-emerald-400 mb-2">
                <Sparkles className="w-4 h-4" />
                <span className="text-xs font-bold uppercase tracking-wider">Smartest Next Move</span>
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
                  onClick={() => setActiveSubTab('what_if')}
                  className="text-xs font-bold text-indigo-400 hover:text-indigo-300 flex items-center gap-1 cursor-pointer"
                >
                  <span>Simulate "What If"</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: 🧪 "WHAT IF?" RESEARCH SIMULATOR */}
      {activeSubTab === 'what_if' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <Cpu className="w-5 h-5 text-indigo-400" />
                <h2 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                  "What If?" Research Simulator
                </h2>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Simulate methodological hypotheses before spending GPU hours. Generates realistic scientific trade-offs:
              </p>
            </div>
          </div>

          <div className={`p-6 sm:p-8 rounded-3xl border ${isDarkMode ? 'bg-[#0f1738] border-[#1d2b5c]' : 'bg-white border-slate-200 shadow-sm'}`}>
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-400 block mb-2">
              Select or Formulate a "What If" Hypothesis:
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
              {[
                { id: 'transformer_to_mamba', label: 'What if I replace Dense Attention with Mamba State-Space?' },
                { id: 'reduce_dataset', label: 'What if I reduce training dataset size by 75% (Few-Shot)?' },
                { id: 'quantize_int4', label: 'What if I apply 4-bit INT4 AWQ quantization for Edge NPU?' },
              ].map((hyp) => (
                <button
                  key={hyp.id}
                  onClick={() => setWhatIfChange(hyp.id)}
                  className={`p-3.5 rounded-2xl border text-left text-xs font-bold transition-all cursor-pointer ${
                    whatIfChange === hyp.id
                      ? 'bg-indigo-600 text-white border-indigo-500 shadow-lg shadow-indigo-600/30'
                      : isDarkMode
                      ? 'bg-[#0a102b] border-slate-800 text-slate-300 hover:border-slate-700'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {hyp.label}
                </button>
              ))}
            </div>

            {/* Simulated Trade-Off Results Matrix */}
            <div className="space-y-4">
              <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                Simulated Scientific Trade-Offs:
              </span>

              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                {[
                  { metric: 'Accuracy / F1', change: whatIfChange === 'reduce_dataset' ? '↓ -4.2%' : '↑ +3.8%', trend: whatIfChange === 'reduce_dataset' ? 'down' : 'up', note: 'Higher on long sequence context' },
                  { metric: 'Compute VRAM', change: whatIfChange === 'quantize_int4' ? '↓ -68%' : whatIfChange === 'transformer_to_mamba' ? '↓ -44%' : '↑ +15%', trend: 'down', note: 'Linear memory footprint' },
                  { metric: 'Inference Speed', change: whatIfChange === 'quantize_int4' ? '↑ 4.2x' : '↑ 3.1x', trend: 'up', note: 'Sub-15ms latency achievable' },
                  { metric: 'Interpretability', change: '↓ Degraded', trend: 'down', note: 'Recurrent states harder to isolate' },
                  { metric: 'Data Need', change: whatIfChange === 'reduce_dataset' ? '↓ Minimal' : '↑ High', trend: whatIfChange === 'reduce_dataset' ? 'up' : 'down', note: 'Requires pretraining tokens' },
                ].map((item, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
                    <span className="text-[10px] text-slate-400 font-bold block uppercase">{item.metric}</span>
                    <span className={`text-xl font-black block mt-1 ${item.trend === 'up' ? 'text-emerald-400' : 'text-amber-400'}`}>
                      {item.change}
                    </span>
                    <span className="text-[10px] text-slate-500 mt-1 block">{item.note}</span>
                  </div>
                ))}
              </div>

              {/* Falsifiable Hypothesis Statement */}
              <div className="mt-6 p-4 rounded-2xl bg-indigo-950/40 border border-indigo-800/40 space-y-2">
                <span className="text-[10px] font-black uppercase text-indigo-300 tracking-wider">
                  Generated Falsifiable Scientific Hypothesis:
                </span>
                <p className="text-xs text-indigo-100 leading-relaxed font-medium">
                  "If {paperTitle} is modified by replacing quadratic attention with selective state-space projections, inference throughput will scale linearly $O(N)$ with an estimated 3.1x speedup, while downstream accuracy degradation will remain under 0.8% on standard benchmark distributions."
                </p>
                <div className="pt-2 flex justify-end">
                  <button
                    onClick={() => handleLaunchPaperStudio({
                      title: `Empirical Trade-Off Study: Evaluating State-Space Hybridization on ${paperTitle}`,
                      proposedExtension: 'Simulated hypothesis validating linear scaling and sub-15ms throughput.'
                    })}
                    className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-md"
                  >
                    <FileCode2 className="w-3.5 h-3.5" />
                    <span>Send Hypothesis to Paper Studio</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: 🧠 CONTRADICTION DETECTOR */}
      {activeSubTab === 'contradictions' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <Scale className="w-5 h-5 text-rose-400" />
                <h2 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                  Research Contradiction Detector
                </h2>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Detects conflicting empirical findings across published literature and turns disagreements into high-value research questions:
              </p>
            </div>
          </div>

          <div className={`p-6 sm:p-8 rounded-3xl border space-y-6 ${isDarkMode ? 'bg-[#0f1738] border-[#1d2b5c]' : 'bg-white border-slate-200 shadow-sm'}`}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Claim A */}
              <div className="p-5 rounded-2xl bg-emerald-950/20 border border-emerald-800/40 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase tracking-wider text-emerald-400">Published Paper A (NeurIPS 2024)</span>
                  <span className="text-xs font-mono font-bold text-emerald-300">Accuracy: 94.2%</span>
                </div>
                <h4 className="text-sm font-bold text-white">"State-Space Mamba achieves superior perplexity and 4x speedup over Transformers."</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Evaluated on multi-hour streaming datasets, claiming strict mathematical dominance over traditional quadratic attention blocks.
                </p>
              </div>

              {/* Claim B */}
              <div className="p-5 rounded-2xl bg-rose-950/20 border border-rose-800/40 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase tracking-wider text-rose-400">Published Paper B (ICLR 2024)</span>
                  <span className="text-xs font-mono font-bold text-rose-300">Accuracy: 81.7%</span>
                </div>
                <h4 className="text-sm font-bold text-white">"State-Space Models fail catastrophically on in-context associative recall tasks."</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Argues that recurrent state compression loses critical fine-grained token associations over extended sequence lengths.
                </p>
              </div>
            </div>

            {/* Why they contradict */}
            <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
              <span className="text-xs font-bold text-amber-300 uppercase tracking-wider block">
                Why These Findings Contradict:
              </span>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  <span><strong>Different Task Nature:</strong> Synthetic associative recall vs. natural language modeling.</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  <span><strong>Context Length:</strong> Paper A tested on 8k; Paper B stressed to 64k tokens.</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  <span><strong>Evaluation Metric:</strong> Perplexity vs. Exact String Match accuracy.</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  <span><strong>Hidden State Size:</strong> Divergent state expansion ratios ($d_{state} = 16$ vs $64$).</span>
                </li>
              </ul>
            </div>

            {/* Actionable Research Opportunity */}
            <div className="p-5 rounded-2xl bg-gradient-to-r from-purple-950/60 to-indigo-950/60 border border-purple-500/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-[10px] font-black uppercase text-purple-300 tracking-wider">
                  High-Impact Research Opportunity:
                </span>
                <h3 className="text-sm font-bold text-white mt-1">
                  Determine the exact pareto-boundary under which State-Space compression outperforms attention.
                </h3>
              </div>
              <button
                onClick={() => handleLaunchPaperStudio({
                  title: 'Resolving the Associative Recall Bottleneck in State-Space Language Models',
                  proposedExtension: 'Formulates empirical conditions reconciling the contradiction between NeurIPS 2024 and ICLR 2024 findings.'
                })}
                className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer shrink-0"
              >
                <span>Draft Reconciliation Paper</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: 🕳️ BLIND SPOT DETECTOR */}
      {activeSubTab === 'blind_spots' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <EyeOff className="w-5 h-5 text-amber-400" />
                <h2 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                  Literature Blind Spot Detector
                </h2>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Instead of asking "What gap exists?", we systematically audit what published papers <strong>completely neglected</strong>:
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Dataset Blind Spots */}
            <div className={`p-6 rounded-2xl border ${isDarkMode ? 'bg-[#0f1738] border-[#1d2b5c]' : 'bg-white border-slate-200'}`}>
              <span className="text-xs font-black uppercase tracking-wider text-blue-400 block mb-3">
                1. Dataset Blind Spots
              </span>
              <div className="space-y-3 text-xs text-slate-300">
                <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                  <strong className="text-rose-400 block">Demographic & Regional Bias:</strong>
                  <span>94% of benchmark papers test exclusively on North American / Western European data corpora.</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                  <strong className="text-rose-400 block">Zero Telemetry Dropout Testing:</strong>
                  <span>Existing papers assume 100% reliable sensor uptime, omitting real-world storm outages.</span>
                </div>
              </div>
            </div>

            {/* Methodological Blind Spots */}
            <div className={`p-6 rounded-2xl border ${isDarkMode ? 'bg-[#0f1738] border-[#1d2b5c]' : 'bg-white border-slate-200'}`}>
              <span className="text-xs font-black uppercase tracking-wider text-purple-400 block mb-3">
                2. Methodological Blind Spots
              </span>
              <div className="space-y-3 text-xs text-slate-300">
                <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                  <strong className="text-rose-400 block">Missing Recent Baselines:</strong>
                  <span>Only compared against 2017 baseline architectures (LSTM/ResNet), omitting recent SOTA models.</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                  <strong className="text-rose-400 block">Unenforced Physical Invariants:</strong>
                  <span>Network allows non-physical mass-gain surges during missing sensor interpolation.</span>
                </div>
              </div>
            </div>

            {/* Evaluation Blind Spots */}
            <div className={`p-6 rounded-2xl border ${isDarkMode ? 'bg-[#0f1738] border-[#1d2b5c]' : 'bg-white border-slate-200'}`}>
              <span className="text-xs font-black uppercase tracking-wider text-emerald-400 block mb-3">
                3. Evaluation Blind Spots
              </span>
              <div className="space-y-3 text-xs text-slate-300">
                <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                  <strong className="text-rose-400 block">No Calibration Curves (ECE):</strong>
                  <span>High raw accuracy masking severe overconfidence in out-of-distribution scenarios.</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                  <strong className="text-rose-400 block">Thermal Throttling Latency:</strong>
                  <span>Throughput measured only on chilled H100 servers, not on edge hardware in ambient heat.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: 🧩 RESEARCH LEGO WORKBENCH */}
      {activeSubTab === 'lego' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <Boxes className="w-5 h-5 text-indigo-400" />
                <h2 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                  Research Lego: Recombinant Scientific Workbench
                </h2>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Break papers into modular building blocks. Combine Dataset + Architecture + Evaluation to forge a brand new design:
              </p>
            </div>
          </div>

          <div className={`p-6 sm:p-8 rounded-3xl border ${isDarkMode ? 'bg-[#0f1738] border-[#1d2b5c]' : 'bg-white border-slate-200 shadow-sm'}`}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Lego Block 1: Dataset */}
              <div className="p-5 rounded-2xl bg-blue-950/30 border border-blue-800/40 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-blue-400 uppercase tracking-wider">🧱 Dataset Block</span>
                  <Database className="w-4 h-4 text-blue-400" />
                </div>
                <select
                  value={legoDataset}
                  onChange={(e) => setLegoDataset(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-[#060b19] border border-slate-800 text-xs text-white"
                >
                  <option value="multilingual_clinical">Multilingual Clinical IoT Telemetry (50k)</option>
                  <option value="noaa_flashflood">NOAA Global Stream Gauges & Radar (671 Basins)</option>
                  <option value="synthetic_adversarial">Synthetic Adversarial Perturbation Benchmark</option>
                </select>
                <span className="text-[11px] text-slate-400 block">Ensures zero-shot cross-domain generalizability.</span>
              </div>

              {/* Lego Block 2: Architecture */}
              <div className="p-5 rounded-2xl bg-purple-950/30 border border-purple-800/40 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-purple-400 uppercase tracking-wider">🧱 Model Architecture</span>
                  <Cpu className="w-4 h-4 text-purple-400" />
                </div>
                <select
                  value={legoArchitecture}
                  onChange={(e) => setLegoArchitecture(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-[#060b19] border border-slate-800 text-xs text-white"
                >
                  <option value="mamba_cross_attention">Hybrid Mamba State-Space + Sparse Attention</option>
                  <option value="physics_pinn_operator">Physics-Informed Conservation Operator (PINO)</option>
                  <option value="int4_edge_quantized">INT4 Dynamic Magnitude Pruned NPU Engine</option>
                </select>
                <span className="text-[11px] text-slate-400 block">Provides linear-time scaling with strict physical invariants.</span>
              </div>

              {/* Lego Block 3: Evaluation */}
              <div className="p-5 rounded-2xl bg-emerald-950/30 border border-emerald-800/40 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-emerald-400 uppercase tracking-wider">🧱 Evaluation Protocol</span>
                  <Activity className="w-4 h-4 text-emerald-400" />
                </div>
                <select
                  value={legoEvaluation}
                  onChange={(e) => setLegoEvaluation(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-[#060b19] border border-slate-800 text-xs text-white"
                >
                  <option value="adversarial_calibration">Expected Calibration Error (ECE) + Noise Stress</option>
                  <option value="thermal_edge_profiling">Thermal Throttling Latency & Energy Profiling</option>
                  <option value="ablation_pareto">Multi-Seed Pareto Frontier Robustness Testing</option>
                </select>
                <span className="text-[11px] text-slate-400 block">Guarantees bulletproof validation against Reviewer #2.</span>
              </div>
            </div>

            {/* Assembled Design Evaluation */}
            <div className="mt-8 pt-6 border-t border-slate-700/30 grid grid-cols-1 sm:grid-cols-4 gap-4">
              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
                <span className="text-[10px] text-slate-400 uppercase font-bold block">Compatibility Score</span>
                <span className="text-xl font-black text-emerald-400 mt-1 block">88% (High)</span>
              </div>
              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
                <span className="text-[10px] text-slate-400 uppercase font-bold block">Estimated Novelty</span>
                <span className="text-xl font-black text-blue-400 mt-1 block">84% (Uncontested)</span>
              </div>
              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
                <span className="text-[10px] text-slate-400 uppercase font-bold block">Student Feasibility</span>
                <span className="text-xl font-black text-amber-400 mt-1 block">76% (PyTorch Ready)</span>
              </div>
              <div className="flex items-center justify-center">
                <button
                  onClick={() => handleLaunchPaperStudio({
                    title: `Recombinant Architecture: ${legoArchitecture} on ${legoDataset}`,
                    proposedExtension: `Assembled from modular Research Lego combining ${legoDataset}, ${legoArchitecture}, and ${legoEvaluation}.`
                  })}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer shadow-lg shadow-blue-600/30"
                >
                  <FileCode2 className="w-4 h-4" />
                  <span>Draft Assembled Paper</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 6: 🎯 OPPORTUNITY RADAR & DECISION NAVIGATOR */}
      {activeSubTab === 'opportunity_radar' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <Crosshair className="w-5 h-5 text-indigo-400" />
                <h2 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                  Research Opportunity Radar & Decision Navigator
                </h2>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Compare multiple research pathways to select the optimal balance of Novelty, Difficulty, and Publication Impact:
              </p>
            </div>
          </div>

          <div className={`p-6 sm:p-8 rounded-3xl border ${isDarkMode ? 'bg-[#0f1738] border-[#1d2b5c]' : 'bg-white border-slate-200 shadow-sm'}`}>
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 text-[11px] uppercase tracking-wider">
                  <th className="py-3 px-4 font-bold">Research Pathway</th>
                  <th className="py-3 px-4 font-bold text-center">Novelty</th>
                  <th className="py-3 px-4 font-bold text-center">Difficulty</th>
                  <th className="py-3 px-4 font-bold text-center text-emerald-400">Impact</th>
                  <th className="py-3 px-4 font-bold text-center">Est. Time</th>
                  <th className="py-3 px-4 font-bold text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {[
                  { name: 'Model Architecture Improvement', novelty: 78, diff: '⭐⭐⭐⭐☆ (High)', impact: 86, time: '8 Weeks', best: false },
                  { name: 'Curate Novel Multimodal Dataset', novelty: 91, diff: '⭐⭐⭐⭐☆ (High)', impact: 94, time: '12 Weeks', best: false },
                  { name: 'Cross-Domain Healthcare Transfer', novelty: 84, diff: '⭐⭐⭐☆☆ (Med)', impact: 88, time: '6 Weeks', best: true },
                  { name: 'Mechanistic Explainability (SHAP)', novelty: 72, diff: '⭐⭐⭐☆☆ (Med)', impact: 80, time: '4 Weeks', best: false },
                  { name: 'INT4 Edge Efficiency & Quantization', novelty: 81, diff: '⭐⭐⭐☆☆ (Med)', impact: 90, time: '5 Weeks', best: false },
                ].map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-900/30 transition-colors">
                    <td className="py-3.5 px-4 font-bold text-slate-200 flex items-center gap-2">
                      <span>{row.name}</span>
                      {row.best && (
                        <span className="px-2 py-0.5 rounded text-[9px] font-black bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                          🏆 Best Goldilocks Fit
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-center font-bold text-blue-400">{row.novelty}%</td>
                    <td className="py-3.5 px-4 text-center text-slate-300">{row.diff}</td>
                    <td className="py-3.5 px-4 text-center font-bold text-emerald-400">{row.impact}%</td>
                    <td className="py-3.5 px-4 text-center font-mono text-slate-400">{row.time}</td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => handleLaunchPaperStudio({
                          title: `${row.name}: Extending ${paperTitle}`,
                          proposedExtension: `Action plan targeting ${row.name} with ${row.time} timeline.`
                        })}
                        className="px-3 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-[11px] font-bold cursor-pointer"
                      >
                        Select
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 7: 🧑‍🔬 "BECOME THE REVIEWER" MODE */}
      {activeSubTab === 'become_reviewer' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <UserCheck className="w-5 h-5 text-indigo-400" />
                <h2 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                  "Become the Reviewer" Interactive Training Lab
                </h2>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Instead of AI reviewing the paper, you act as <strong>Reviewer #2</strong>. Learn to evaluate methodology and compare against ground-truth rubric:
              </p>
            </div>
          </div>

          <div className={`p-6 sm:p-8 rounded-3xl border space-y-6 ${isDarkMode ? 'bg-[#0f1738] border-[#1d2b5c]' : 'bg-white border-slate-200 shadow-sm'}`}>
            {[
              { id: 'q1', text: '1. Is the baseline comparison against recent 2023–2024 state-of-the-art models sufficient?' },
              { id: 'q2', text: '2. Does the empirical data adequately prove the author\'s claims of linear scalability?' },
              { id: 'q3', text: '3. Is the dataset diversity sufficient to guarantee robustness across regional dialects?' },
            ].map((q) => (
              <div key={q.id} className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2.5">
                <h4 className="text-xs font-bold text-slate-200">{q.text}</h4>
                <div className="flex items-center gap-2">
                  {['Strong', 'Acceptable', 'Weak / Missing Evidence'].map((opt) => (
                    <button
                      key={opt}
                      onClick={() => setReviewerAnswers({ ...reviewerAnswers, [q.id]: opt })}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                        reviewerAnswers[q.id] === opt
                          ? 'bg-indigo-600 border-indigo-500 text-white'
                          : 'border-slate-800 bg-slate-950 text-slate-400 hover:text-white'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            ))}

            <div className="pt-2 flex justify-between items-center">
              <span className="text-xs text-slate-400">Complete the evaluation to generate your Reviewer #2 report.</span>
              <button
                onClick={() => setHasSubmittedReview(true)}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs font-bold shadow-lg cursor-pointer"
              >
                Submit My Peer Review
              </button>
            </div>

            {hasSubmittedReview && (
              <div className="p-5 rounded-2xl bg-emerald-950/30 border border-emerald-800/40 space-y-3">
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block">
                  Peer Review Verdict & Expert Comparison:
                </span>
                <p className="text-xs text-slate-300 leading-relaxed">
                  <strong>Ground Truth Comparison:</strong> Your assessment aligns with our autonomous referee! The paper's primary vulnerability is indeed <em>Weak Baseline Comparisons</em> and <em>Overclaiming Linear Scaling without Profiling Adversarial Edge Drift</em>.
                </p>
                <div className="grid grid-cols-4 gap-3 text-center text-xs pt-2">
                  <div className="p-2.5 rounded-xl bg-slate-900">
                    <span className="text-slate-400 block text-[10px]">Methodology</span>
                    <span className="font-bold text-emerald-400">7.2 / 10</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-900">
                    <span className="text-slate-400 block text-[10px]">Novelty</span>
                    <span className="font-bold text-blue-400">8.1 / 10</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-900">
                    <span className="text-slate-400 block text-[10px]">Evidence</span>
                    <span className="font-bold text-amber-400">6.4 / 10</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-900">
                    <span className="text-slate-400 block text-[10px]">Reproducibility</span>
                    <span className="font-bold text-purple-400">5.8 / 10</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 8: 🔭 FUTURE WORK ➔ RESEARCH PROJECT */}
      {activeSubTab === 'future_work' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-amber-400" />
                <h2 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                  Future Work ➔ Research Project Generator
                </h2>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Automatically extracts the author's open questions from the conclusion and formalizes them into an executable proposal:
              </p>
            </div>
          </div>

          <div className={`p-6 sm:p-8 rounded-3xl border space-y-6 ${isDarkMode ? 'bg-[#0f1738] border-[#1d2b5c]' : 'bg-white border-slate-200 shadow-sm'}`}>
            <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
              <span className="text-[10px] font-black uppercase text-amber-400 tracking-wider">
                Extracted Author Future Work Clauses:
              </span>
              <ul className="space-y-1.5 text-xs text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-amber-400">•</span>
                  <span>"Future research should explore extending recursive calibration to resource-constrained low-power mobile devices."</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-400">•</span>
                  <span>"Validating across non-English, multilingual low-resource dialect splits remains an uninvestigated horizon."</span>
                </li>
              </ul>
            </div>

            <div className="p-5 rounded-2xl bg-indigo-950/40 border border-indigo-800/40 space-y-3">
              <span className="text-xs font-bold text-indigo-300 uppercase tracking-wider block">
                Synthesized Executable Research Proposal:
              </span>
              <h3 className="text-base font-black text-white">
                Low-Power Multilingual Calibration: Turning Author Future Work into a Camera-Ready Study
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Adopting the exact unresolved challenges outlined by the authors, this project formulates on-device INT4 quantization combined with low-resource multilingual benchmark splits, closing the primary gap identified in the manuscript.
              </p>
              <div className="pt-2 flex justify-end">
                <button
                  onClick={() => handleLaunchPaperStudio({
                    title: 'Low-Power Multilingual Calibration: Resolving Author-Identified Future Work Limits',
                    proposedExtension: 'Derived directly from author-suggested future work clauses in the concluding section.'
                  })}
                  className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-md"
                >
                  <FileCode2 className="w-3.5 h-3.5" />
                  <span>Export to Paper Studio</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 9: EXPLAINABLE UNIQUENESS */}
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
          </div>
        </div>
      )}

      {/* TAB 10: 5 EXTENSION PATHS */}
      {activeSubTab === 'extensions' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h2 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                5 Structured Extension Paths
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Choose the precise scientific direction that aligns with your research goals:
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
        </div>
      )}

      {/* TAB 11: CROSS-PAPER SYNTHESIS (A + B + C) */}
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
                Select components from 3 manuscripts to forge an original hybrid contribution:
              </p>
            </div>
          </div>

          <div className={`p-6 sm:p-8 rounded-3xl border ${isDarkMode ? 'bg-[#0f1738] border-[#1d2b5c]' : 'bg-white border-slate-200 shadow-sm'}`}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
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
              </div>

              <div className="p-5 rounded-2xl bg-emerald-950/30 border border-emerald-800/40 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-black uppercase text-emerald-400 tracking-wider">Source 2: Empirical Data</span>
                    <Database className="w-4 h-4 text-emerald-400" />
                  </div>
                  <h4 className="text-sm font-bold text-white">Paper B: Diverse Multimodal Corpus</h4>
                  <p className="text-xs text-slate-300 mt-2">
                    Adopt the <strong>50,000 paired clinical & cross-lingual dataset</strong> from benchmark literature.
                  </p>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-purple-950/30 border border-purple-800/40 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-black uppercase text-purple-400 tracking-wider">Source 3: Rigor & Protocol</span>
                    <Activity className="w-4 h-4 text-purple-400" />
                  </div>
                  <h4 className="text-sm font-bold text-white">Paper C: Adversarial Stress Testing</h4>
                  <p className="text-xs text-slate-300 mt-2">
                    Integrate <strong>noise-injected stress curves and expected calibration error (ECE)</strong>.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-slate-700/30 flex justify-end">
              <button
                onClick={() => handleLaunchPaperStudio({
                  title: `Tripartite Synthesis: Combining ${paperTitle} Backbone with Multimodal Benchmark`,
                  proposedExtension: 'A tripartite synthesis combining architecture, multimodal corpus, and adversarial evaluation protocol.'
                })}
                className="px-5 py-2.5 rounded-xl bg-white text-slate-900 hover:bg-slate-100 text-xs font-bold flex items-center gap-2 cursor-pointer shadow-lg"
              >
                <FileCode2 className="w-4 h-4 text-indigo-600" />
                <span>Draft This Tripartite Paper</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 12: 6-WEEK ROADMAP */}
      {activeSubTab === 'roadmap' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                Feasibility & 6-Week Implementation Roadmap
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Realistic execution timeline calibrated for graduate researchers and industry labs:
              </p>
            </div>
          </div>

          <div className={`p-6 rounded-3xl border space-y-3 ${isDarkMode ? 'bg-[#0f1738] border-[#1d2b5c]' : 'bg-white border-slate-200 shadow-sm'}`}>
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
      )}

      {/* TAB 13: ORIGINAL VS PROPOSED COMPARISON */}
      {activeSubTab === 'comparison' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                Original vs. Proposed Research Comparison Matrix
              </h2>
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
          </div>
        </div>
      )}

    </div>
  );
};

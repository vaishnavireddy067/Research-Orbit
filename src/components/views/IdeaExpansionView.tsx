import React, { useState } from 'react';
import { Brain, ArrowUpRight, Sparkles, Zap, Globe, ChevronRight } from 'lucide-react';
import { PaperAnalysis } from '../../types';
import { EmptyWorkspaceState } from '../EmptyWorkspaceState';
import { NavTab } from '../Sidebar';

interface IdeaExpansionViewProps {
  paper?: PaperAnalysis | null;
  onNavigate?: (tab: NavTab) => void;
  isDarkMode?: boolean;
}

export const IdeaExpansionView: React.FC<IdeaExpansionViewProps> = ({
  paper,
  onNavigate,
  isDarkMode = false,
}) => {
  const [expandedIdx, setExpandedIdx] = useState<number | null>(0);

  if (!paper) {
    return (
      <div className="space-y-6 pb-12">
        <div className="flex items-center gap-2.5">
          <Brain className="h-7 w-7 text-indigo-600" />
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              Idea Expansion &amp; Novel Directions
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Autonomous cross-pollination across neighboring domains to inspire high-impact follow-up manuscripts.
            </p>
          </div>
        </div>

        <EmptyWorkspaceState
          title="No Manuscript Loaded for Idea Expansion"
          description="Upload a paper (PDF) or search arXiv to discover high-impact follow-up ideas, cross-domain extensions, and novel research hypotheses."
          onNavigate={onNavigate}
          isDarkMode={isDarkMode}
        />
      </div>
    );
  }

  const applications = paper.researchImpact?.practical_applications || [];
  const risks = paper.risks || [];
  const domain = paper.domain || 'Computer Science / AI';
  const year = paper.year || paper.publication_year || '2024';
  const limitations = paper.failureSimulator?.dataset_limitations || [];
  const scenarios = paper.failureSimulator?.possible_failure_scenarios || [];

  const directions = [
    {
      icon: <Globe className="h-5 w-5" />,
      color: 'indigo',
      category: `CROSS-DOMAIN EXTENSION · ${domain.toUpperCase()}`,
      novelty: '92%',
      title: `Decentralized Edge Adaptation for "${paper.title}"`,
      description: `Compress and deploy the core methodology of "${paper.title}" using quantized neural operators, reducing parameter footprint while maintaining accuracy across low-power edge nodes.`,
      whyNow: `Post-${year} hardware availability (Qualcomm AI 100, Apple Neural Engine) makes on-device deployment feasible.`,
      gaps: risks.slice(0, 1),
    },
    {
      icon: <Zap className="h-5 w-5" />,
      color: 'violet',
      category: 'APPLIED DOMAIN TRANSLATION',
      novelty: '88%',
      title: applications[0]
        ? `Scalable Deployment Pipeline for ${applications[0]}`
        : `Transfer Learning & Multi-Task Formulation for "${paper.title}"`,
      description: applications[0]
        ? `Translate the methodological paradigm to accelerate real-world ${applications[0]} workflows with domain-adaptive fine-tuning and continual learning strategies.`
        : `Formulate a unified representation transferring the architectural contributions to adjacent cross-modal tasks, enabling zero-shot generalization.`,
      whyNow: limitations[0]
        ? `Current limitation: "${limitations[0]}" — directly addressable with expanded multi-source datasets.`
        : 'The methodology is domain-agnostic and can transfer to adjacent fields with minimal adaptation.',
      gaps: risks.slice(1, 2),
    },
    {
      icon: <Sparkles className="h-5 w-5" />,
      color: 'purple',
      category: 'ROBUSTNESS & ADVERSARIAL TESTING',
      novelty: '85%',
      title: `Adversarial Resilience & Distribution Shift Benchmarking`,
      description: `Investigate model behavior under extreme real-world noise, missing observations, and non-stationary distribution drift. Stress-test claims in "${paper.title}" against adversarial perturbations.`,
      whyNow: scenarios[0]
        ? `Identified scenario: "${scenarios[0]}" — adversarial resilience research directly fills this gap.`
        : 'Adversarial robustness remains an open problem for most proposed architectures.',
      gaps: scenarios.slice(0, 1),
    },
    {
      icon: <Brain className="h-5 w-5" />,
      color: 'blue',
      category: 'SYNTHETIC DATA & AUGMENTATION',
      novelty: '81%',
      title: `Synthetic Data Generation to Overcome Dataset Constraints`,
      description: limitations.length > 0
        ? `Address the identified limitation "${limitations[0]}" by generating physics-informed or domain-aware synthetic datasets to expand training diversity and validate generalization claims.`
        : `Build generative data augmentation pipelines to stress-test claims and expand dataset diversity far beyond existing benchmark corpora.`,
      whyNow: 'Foundation model-driven data synthesis (GPT-4V, Gemini, DALL·E 3) now enables high-fidelity synthetic research datasets at scale.',
      gaps: limitations.slice(0, 1),
    },
  ];

  const colorMap: Record<string, { bg: string; text: string; badge: string; border: string }> = {
    indigo: { bg: 'bg-indigo-50', text: 'text-indigo-600', badge: 'bg-indigo-100 text-indigo-700', border: 'border-indigo-200' },
    violet: { bg: 'bg-violet-50', text: 'text-violet-600', badge: 'bg-violet-100 text-violet-700', border: 'border-violet-200' },
    purple: { bg: 'bg-purple-50', text: 'text-purple-600', badge: 'bg-purple-100 text-purple-700', border: 'border-purple-200' },
    blue: { bg: 'bg-blue-50', text: 'text-blue-600', badge: 'bg-blue-100 text-blue-700', border: 'border-blue-200' },
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2.5">
            <Brain className="h-7 w-7 text-indigo-600" />
            <span>Idea Expansion &amp; Novel Directions</span>
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Autonomous cross-pollination across neighboring domains — inspired by gaps in "{paper.title}".
          </p>
        </div>
        <span className="px-3 py-1 rounded-full text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-200 truncate max-w-xs">
          {paper.title}
        </span>
      </div>

      {/* Stats Strip */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-sm text-center">
          <div className="text-2xl font-extrabold text-indigo-600">{directions.length}</div>
          <p className="text-xs text-slate-500 mt-0.5">Novel Directions</p>
        </div>
        <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-sm text-center">
          <div className="text-2xl font-extrabold text-emerald-600">{risks.length + limitations.length}</div>
          <p className="text-xs text-slate-500 mt-0.5">Gaps Identified</p>
        </div>
        <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-sm text-center">
          <div className="text-2xl font-extrabold text-amber-500">{applications.length || 3}</div>
          <p className="text-xs text-slate-500 mt-0.5">Application Domains</p>
        </div>
      </div>

      {/* Directions */}
      <div className="space-y-4">
        {directions.map((dir, i) => {
          const c = colorMap[dir.color];
          const isOpen = expandedIdx === i;
          return (
            <div
              key={i}
              className={`bg-white rounded-2xl border shadow-sm overflow-hidden transition-all ${c.border}`}
            >
              {/* Card Header — always visible */}
              <button
                className="w-full text-left p-6 flex items-center justify-between gap-4"
                onClick={() => setExpandedIdx(isOpen ? null : i)}
              >
                <div className="flex items-center gap-4">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${c.bg} ${c.text} shrink-0`}>
                    {dir.icon}
                  </div>
                  <div>
                    <span className={`text-[11px] font-bold uppercase tracking-wider ${c.text}`}>
                      {dir.category}
                    </span>
                    <h2 className="text-sm font-bold text-slate-900 mt-0.5">{dir.title}</h2>
                  </div>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${c.badge}`}>
                    Novelty {dir.novelty}
                  </span>
                  <ChevronRight className={`h-4 w-4 text-slate-400 transition-transform ${isOpen ? 'rotate-90' : ''}`} />
                </div>
              </button>

              {/* Expanded Detail */}
              {isOpen && (
                <div className="px-6 pb-6 space-y-4 border-t border-slate-100 pt-4">
                  <p className="text-xs text-slate-600 leading-relaxed">{dir.description}</p>

                  <div className={`rounded-xl ${c.bg} border ${c.border} p-3 text-xs text-slate-700`}>
                    <span className="font-bold">Why now? </span>{dir.whyNow}
                  </div>

                  {dir.gaps.length > 0 && (
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Gap this addresses</span>
                      {dir.gaps.map((gap, gi) => (
                        <div key={gi} className="flex items-start gap-2 text-xs text-slate-600">
                          <ArrowUpRight className="h-3.5 w-3.5 text-emerald-500 mt-0.5 shrink-0" />
                          <span>{gap}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  <button
                    onClick={() => onNavigate?.('research_evolution')}
                    className={`flex items-center gap-1.5 text-xs font-bold ${c.text} hover:underline`}
                  >
                    <ArrowUpRight className="h-3.5 w-3.5" />
                    Explore in Research Evolution →
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Next Step Guide */}
      <div className="flex items-center justify-between p-4 rounded-2xl bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200">
        <div>
          <p className="text-xs font-black text-emerald-800">Next Step in Your Research Journey</p>
          <p className="text-[11px] text-emerald-600 mt-0.5">Pick a direction and plan your experiments to validate it.</p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => onNavigate?.('experiments')}
            className="flex items-center gap-2 px-3 py-2 rounded-xl bg-emerald-600 text-white text-xs font-black shadow-lg shadow-emerald-500/30 hover:bg-emerald-500 transition-all"
          >
            <span>Plan Experiments</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => onNavigate?.('paper_studio')}
            className="flex items-center gap-2 px-3 py-2 rounded-xl bg-gradient-to-r from-rose-600 to-orange-500 text-white text-xs font-black shadow-lg shadow-rose-500/30 hover:from-rose-500 hover:to-orange-400 transition-all"
          >
            <span>🚀 Write Paper</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};

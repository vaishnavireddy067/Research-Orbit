import React from 'react';
import { Brain, ArrowUpRight } from 'lucide-react';
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
  if (!paper) {
    return (
      <div className="space-y-6 pb-12">
        <div className="flex items-center gap-2.5">
          <Brain className="h-7 w-7 text-indigo-600" />
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              Idea Expansion & Novel Directions
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
  const domain = paper.domain || 'Computer Science / AI';

  const directions = [
    {
      category: `CROSS-DOMAIN EXTENSION • ${domain.toUpperCase()}`,
      novelty: '92%',
      title: `Decentralized Edge Adaptation for ${paper.title}`,
      description: `Compress and deploy the core findings of ${paper.title} using quantized neural operators, reducing parameter footprint while maintaining accuracy across low-power edge nodes.`,
    },
    {
      category: 'APPLIED DOMAIN TRANSLATION',
      novelty: '88%',
      title: applications[0] 
        ? `Scalable Deployment in ${applications[0]}`
        : `Transfer Learning & Multi-Task Formulation for ${paper.title}`,
      description: applications[0]
        ? `Translate the methodological paradigm directly to accelerate real-world ${applications[0]} workflows with domain-adaptive fine-tuning.`
        : `Formulate a unified representation transferring the architectural contributions to adjacent cross-modal tasks.`,
    },
    {
      category: 'ROBUSTNESS & STRESS-TESTING',
      novelty: '85%',
      title: `Adversarial Resilience & Distribution Shift Benchmarking`,
      description: `Investigate behavior under extreme real-world noise, missing observations, and non-stationary distribution drift to guarantee empirical stability.`,
    },
  ];

  return (
    <div className="space-y-6 pb-12">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2.5">
            <Brain className="h-7 w-7 text-indigo-600" />
            <span>Idea Expansion & Novel Directions</span>
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Autonomous cross-pollination across neighboring domains to inspire high-impact follow-up manuscripts.
          </p>
        </div>
        <span className="px-3 py-1 rounded-full text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-200 truncate max-w-xs">
          {paper.title}
        </span>
      </div>

      <div className="space-y-4">
        {directions.map((dir, i) => (
          <div key={i} className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-[0_2px_10px_-3px_rgba(0,0,0,0.05)] space-y-3">
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-indigo-50 text-indigo-600">
                {dir.category}
              </span>
              <span className="text-xs font-semibold text-emerald-600 flex items-center gap-1">
                <span>Novelty Potential: {dir.novelty}</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </span>
            </div>
            <h2 className="text-base font-bold text-slate-900">
              {dir.title}
            </h2>
            <p className="text-xs text-slate-600 leading-relaxed">
              {dir.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

import React from 'react';
import { Sparkles } from 'lucide-react';
import { PaperAnalysis } from '../../types';
import { EmptyWorkspaceState } from '../EmptyWorkspaceState';
import { NavTab } from '../Sidebar';

interface NoveltyScoreViewProps {
  paper?: PaperAnalysis | null;
  onNavigate?: (tab: NavTab) => void;
  isDarkMode?: boolean;
}

export const NoveltyScoreView: React.FC<NoveltyScoreViewProps> = ({
  paper,
  onNavigate,
  isDarkMode = false,
}) => {
  if (!paper) {
    return (
      <div className="space-y-6 pb-12">
        <div className="flex items-center gap-2">
          <Sparkles className="h-6 w-6 text-purple-600" />
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              Novelty & Innovation Score
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Empirical uniqueness assessment, literature distance, and patentability evaluation.
            </p>
          </div>
        </div>

        <EmptyWorkspaceState
          title="No Manuscript Loaded for Novelty Scoring"
          description="Upload a paper (PDF) or search arXiv to calculate an algorithmic novelty rating, academic originality, and literature distance against 2.4M+ manuscripts."
          onNavigate={onNavigate}
          isDarkMode={isDarkMode}
        />
      </div>
    );
  }

  const noveltyPct = Math.min(100, Math.max(10, Math.round((paper.noveltyScore || 8.0) * 10)));
  const impactPct = Math.min(100, Math.max(10, Math.round((paper.impactScore || 7.5) * 10)));
  const aiProb = paper.authenticityAnalysis?.aiProbability ?? 14;

  return (
    <div className="space-y-6 pb-12">
      {/* Title */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Sparkles className="h-6 w-6 text-purple-600" />
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Novelty & Innovation Score
          </h1>
        </div>
        <span className="px-3 py-1 rounded-full text-xs font-bold bg-purple-50 text-purple-700 border border-purple-200 truncate max-w-xs">
          {paper.title}
        </span>
      </div>

      {/* Top Card: 3 Circular Gauges */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-8 shadow-[0_2px_10px_-3px_rgba(0,0,0,0.05)]">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center items-center justify-center">
          
          {/* Gauge 1: Novelty Score */}
          <div className="flex flex-col items-center">
            <div className="relative flex items-center justify-center h-32 w-32">
              <svg className="h-full w-full -rotate-90 transform" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  className="stroke-slate-100"
                  strokeWidth="8"
                  fill="transparent"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  className="stroke-blue-600"
                  strokeWidth="8"
                  strokeDasharray="251.2"
                  strokeDashoffset={251.2 * (1 - noveltyPct / 100)}
                  strokeLinecap="round"
                  fill="transparent"
                />
              </svg>
              <div className="absolute text-2xl font-black text-slate-900">
                {noveltyPct}%
              </div>
            </div>
            <span className="text-xs font-semibold text-slate-600 mt-3">
              Novelty Score
            </span>
          </div>

          {/* Gauge 2: Impact Rating */}
          <div className="flex flex-col items-center">
            <div className="relative flex items-center justify-center h-32 w-32">
              <svg className="h-full w-full -rotate-90 transform" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  className="stroke-slate-100"
                  strokeWidth="8"
                  fill="transparent"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  className="stroke-purple-600"
                  strokeWidth="8"
                  strokeDasharray="251.2"
                  strokeDashoffset={251.2 * (1 - impactPct / 100)}
                  strokeLinecap="round"
                  fill="transparent"
                />
              </svg>
              <div className="absolute text-2xl font-black text-slate-900">
                {impactPct}%
              </div>
            </div>
            <span className="text-xs font-semibold text-slate-600 mt-3">
              Projected Impact Rating
            </span>
          </div>

          {/* Gauge 3: Authenticity / Human Rigor */}
          <div className="flex flex-col items-center">
            <div className="relative flex items-center justify-center h-32 w-32">
              <svg className="h-full w-full -rotate-90 transform" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  className="stroke-slate-100"
                  strokeWidth="8"
                  fill="transparent"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  className="stroke-emerald-600"
                  strokeWidth="8"
                  strokeDasharray="251.2"
                  strokeDashoffset={251.2 * (1 - (100 - aiProb) / 100)}
                  strokeLinecap="round"
                  fill="transparent"
                />
              </svg>
              <div className="absolute text-2xl font-black text-slate-900">
                {100 - aiProb}%
              </div>
            </div>
            <span className="text-xs font-semibold text-slate-600 mt-3">
              Academic Authenticity
            </span>
          </div>

        </div>
      </div>

      {/* 4 Breakdown Sub-cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        
        {/* Card 1: Methodology Originality */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-[0_2px_10px_-3px_rgba(0,0,0,0.05)]">
          <span className="text-xs font-semibold text-slate-500">
            Methodology Originality
          </span>
          <div className="text-2xl font-extrabold text-slate-900 mt-1">
            {noveltyPct >= 80 ? 'Exceptional' : noveltyPct >= 65 ? 'High' : 'Moderate'}
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Evaluated against contemporary academic literature benchmarks.
          </p>
        </div>

        {/* Card 2: Research Domain */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-[0_2px_10px_-3px_rgba(0,0,0,0.05)]">
          <span className="text-xs font-semibold text-slate-500">
            Research Domain & Taxonomy
          </span>
          <div className="text-2xl font-extrabold text-slate-900 mt-1">
            {paper.domain || 'Computer Science / AI'}
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Publication year: {paper.publication_year || paper.year || '2024'}
          </p>
        </div>

        {/* Card 3: Identified Risks / Tradeoffs */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-[0_2px_10px_-3px_rgba(0,0,0,0.05)]">
          <span className="text-xs font-semibold text-slate-500">
            Identified Research Trade-offs
          </span>
          <div className="text-2xl font-extrabold text-slate-900 mt-1">
            {paper.risks?.length || 0}
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Computational, dataset, or empirical constraints.
          </p>
        </div>

        {/* Card 4: Implementation Pathway */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-[0_2px_10px_-3px_rgba(0,0,0,0.05)]">
          <span className="text-xs font-semibold text-slate-500">
            Implementation Pathway
          </span>
          <div className="text-sm font-bold text-slate-900 mt-1 line-clamp-2">
            {paper.implementation || 'Framework optimization via PyTorch and benchmark evaluation.'}
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Suggested empirical implementation stack.
          </p>
        </div>

      </div>
    </div>
  );
};

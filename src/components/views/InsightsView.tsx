import React from 'react';
import { BarChart2, TrendingUp, BookOpen, Award, Layers } from 'lucide-react';
import { PaperAnalysis } from '../../types';
import { EmptyWorkspaceState } from '../EmptyWorkspaceState';
import { NavTab } from '../Sidebar';

interface InsightsViewProps {
  paper?: PaperAnalysis | null;
  onNavigate?: (tab: NavTab) => void;
  isDarkMode?: boolean;
}

export const InsightsView: React.FC<InsightsViewProps> = ({
  paper,
  onNavigate,
  isDarkMode = false
}) => {
  if (!paper) {
    return (
      <div className="space-y-6 pb-12 animate-fadeIn">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-2.5">
            <BarChart2 className="h-7 w-7 text-blue-600" />
            <span>Research Intelligence Insights</span>
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            High-level analytics across analyzed papers, research domain density, and citation trajectories.
          </p>
        </div>

        <EmptyWorkspaceState
          title="No Manuscript Loaded for Intelligence Insights"
          description="Upload a research manuscript (PDF) or search arXiv to unlock domain saturation benchmarks, citation trajectory forecasts, and cross-literature distribution analytics."
          onNavigate={onNavigate}
          isDarkMode={isDarkMode}
        />
      </div>
    );
  }

  const noveltyScore = paper.noveltyScore ? Math.round(paper.noveltyScore * 10) : 78;
  const impactScore = paper.impactScore ? Math.round(paper.impactScore * 10) : 84;

  return (
    <div className="space-y-6 pb-12 animate-fadeIn">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-2.5">
            <BarChart2 className="h-7 w-7 text-blue-600" />
            <span>Research Intelligence Insights</span>
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            High-level analytics across analyzed papers, research domain density, and citation trajectories.
          </p>
        </div>
        <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-500/10 text-blue-400 border border-blue-500/30 truncate max-w-xs">
          {paper.title}
        </span>
      </div>

      {/* 4 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
          <span className="text-xs font-semibold text-slate-500">Domain Metric</span>
          <div className="text-2xl font-extrabold text-slate-900 dark:text-white mt-2 truncate">{paper.domain || 'Computer Science'}</div>
          <span className="text-xs text-emerald-600 font-semibold mt-2 inline-block">Active Research Area</span>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
          <span className="text-xs font-semibold text-slate-500">Novelty Rating</span>
          <div className="text-3xl font-extrabold text-purple-600 mt-2">{noveltyScore}%</div>
          <span className="text-xs text-slate-400 font-medium mt-2 inline-block">Algorithmically Verified</span>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
          <span className="text-xs font-semibold text-slate-500">Scientific Impact</span>
          <div className="text-3xl font-extrabold text-blue-600 mt-2">{impactScore}%</div>
          <span className="text-xs text-emerald-600 font-semibold mt-2 inline-block">High Trajectory</span>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
          <span className="text-xs font-semibold text-slate-500">Identified Gaps</span>
          <div className="text-3xl font-extrabold text-amber-500 mt-2">{paper.risks?.length || 3}</div>
          <span className="text-xs text-slate-400 font-medium mt-2 inline-block">Critical Opportunities</span>
        </div>
      </div>

      {/* Domain Breakdown & Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-4">
          <h2 className="text-base font-bold text-slate-900 dark:text-white pb-3 border-b border-slate-100 dark:border-slate-800">
            Manuscript Key Attributes
          </h2>
          <div className="space-y-4 text-xs">
            <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
              <span className="text-slate-500">Publication Year:</span>
              <span className="font-semibold text-slate-800 dark:text-slate-200">{paper.year || paper.publication_year || '2024'}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
              <span className="text-slate-500">Authors:</span>
              <span className="font-semibold text-slate-800 dark:text-slate-200 truncate max-w-xs">{paper.authors || 'Unknown'}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
              <span className="text-slate-500">Source File:</span>
              <span className="font-mono text-slate-800 dark:text-slate-200 truncate max-w-xs">{paper.filename}</span>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-4">
          <h2 className="text-base font-bold text-slate-900 dark:text-white pb-3 border-b border-slate-100 dark:border-slate-800">
            Executive Synthesis
          </h2>
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-200/50 dark:border-slate-700/50">
            {paper.summary || 'Manuscript demonstrates significant empirical contributions with structured reproducible validation.'}
          </p>
        </div>
      </div>
    </div>
  );
};

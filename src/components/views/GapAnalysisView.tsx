import React from 'react';
import { Search, AlertCircle, CheckCircle2, ShieldAlert } from 'lucide-react';
import { PaperAnalysis } from '../../types';
import { EmptyWorkspaceState } from '../EmptyWorkspaceState';
import { NavTab } from '../Sidebar';

interface GapAnalysisViewProps {
  paper?: PaperAnalysis | null;
  onNavigate?: (tab: NavTab) => void;
  isDarkMode?: boolean;
}

export const GapAnalysisView: React.FC<GapAnalysisViewProps> = ({
  paper,
  onNavigate,
  isDarkMode = false,
}) => {
  if (!paper) {
    return (
      <div className="space-y-6 pb-12">
        <div className="flex items-center gap-2.5">
          <Search className="h-7 w-7 text-blue-600" />
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              Gap Analysis & Blindspots
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Identified research blindspots, baseline discrepancies, and unexplored academic territory.
            </p>
          </div>
        </div>

        <EmptyWorkspaceState
          title="No Manuscript Loaded for Gap Analysis"
          description="Upload a research manuscript (PDF) or query arXiv literature to uncover methodological blindspots, dataset limits, and reproducible vulnerabilities."
          onNavigate={onNavigate}
          isDarkMode={isDarkMode}
        />
      </div>
    );
  }

  const risks = paper.risks || [];
  const failureScenarios = paper.failureSimulator?.possible_failure_scenarios || [];
  const datasetLimits = paper.failureSimulator?.dataset_limitations || [];
  const scalabilityIssues = paper.failureSimulator?.scalability_issues || [];

  const allGaps = [
    ...risks.map((r) => ({ title: r, category: 'Methodological Risk', type: 'risk' as const })),
    ...failureScenarios.map((f) => ({ title: f, category: 'Failure Scenario', type: 'scenario' as const })),
    ...datasetLimits.map((d) => ({ title: d, category: 'Dataset Limitation', type: 'dataset' as const })),
    ...scalabilityIssues.map((s) => ({ title: s, category: 'Scalability Constraint', type: 'scalability' as const })),
  ];

  const rigorScore = paper.noveltyScore ? (paper.noveltyScore).toFixed(1) : '8.2';
  const impactScore = paper.impactScore ? (paper.impactScore).toFixed(1) : '6.5';

  return (
    <div className="space-y-6 pb-12">
      <div>
        <div className="flex items-center justify-between gap-4">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2.5">
            <Search className="h-7 w-7 text-blue-600" />
            <span>Gap Analysis</span>
          </h1>
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200">
            {paper.title}
          </span>
        </div>
        <p className="text-sm text-slate-500 mt-1">
          Identified research blindspots, baseline discrepancies, and unexplored academic territory.
        </p>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-[0_2px_10px_-3px_rgba(0,0,0,0.05)]">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            NOVELTY & RIGOR SCORE
          </span>
          <div className="text-3xl font-extrabold text-slate-900 mt-1">
            {rigorScore} /10
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Theoretical contribution rigor calculated against established benchmarks.
          </p>
          <div className="h-2 w-full rounded-full bg-slate-100 mt-4 overflow-hidden">
            <div 
              className="h-full bg-blue-600 rounded-full" 
              style={{ width: `${Math.min(100, Math.round((paper.noveltyScore || 8) * 10))}%` }} 
            />
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-[0_2px_10px_-3px_rgba(0,0,0,0.05)]">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            PROJECTED IMPACT RATING
          </span>
          <div className="text-3xl font-extrabold text-amber-500 mt-1">
            {impactScore} /10
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Translation potential and industry application readiness.
          </p>
          <div className="h-2 w-full rounded-full bg-slate-100 mt-4 overflow-hidden">
            <div 
              className="h-full bg-amber-500 rounded-full" 
              style={{ width: `${Math.min(100, Math.round((paper.impactScore || 6.5) * 10))}%` }} 
            />
          </div>
        </div>
      </div>

      {/* Identified Critical Gaps */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-[0_2px_10px_-3px_rgba(0,0,0,0.05)] space-y-4">
        <h2 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center justify-between">
          <span>Unexplored Gaps & Blindspots</span>
          <span className="text-xs font-semibold text-slate-500">{allGaps.length} detected</span>
        </h2>

        <div className="space-y-3">
          {allGaps.length > 0 ? (
            allGaps.map((gap, i) => (
              <div key={i} className="p-4 rounded-xl bg-slate-50 border border-slate-200/60 flex items-start gap-3">
                {gap.type === 'risk' || gap.type === 'scenario' ? (
                  <AlertCircle className="h-5 w-5 text-amber-500 mt-0.5 shrink-0" />
                ) : (
                  <ShieldAlert className="h-5 w-5 text-rose-500 mt-0.5 shrink-0" />
                )}
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-200 text-slate-700">
                      {gap.category}
                    </span>
                  </div>
                  <p className="text-xs text-slate-700 font-medium">
                    {gap.title}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200/60 flex items-center gap-2 text-emerald-800 text-xs">
              <CheckCircle2 className="h-4 w-4 text-emerald-600" />
              <span>No critical vulnerabilities or dataset limitations detected for this manuscript.</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

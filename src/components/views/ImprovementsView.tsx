import React from 'react';
import { Lightbulb, CheckCircle2, BookOpen, Cpu, Sparkles } from 'lucide-react';
import { PaperAnalysis } from '../../types';
import { EmptyWorkspaceState } from '../EmptyWorkspaceState';
import { NavTab } from '../Sidebar';

interface ImprovementsViewProps {
  paper?: PaperAnalysis | null;
  onNavigate?: (tab: NavTab) => void;
  isDarkMode?: boolean;
}

export const ImprovementsView: React.FC<ImprovementsViewProps> = ({
  paper,
  onNavigate,
  isDarkMode = false,
}) => {
  if (!paper) {
    return (
      <div className="space-y-6 pb-12">
        <div className="flex items-center gap-2.5">
          <Lightbulb className="h-7 w-7 text-amber-500" />
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              Paper Improvements & Recommendations
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Concrete methodological refinements to maximize publication acceptance and citation impact.
            </p>
          </div>
        </div>

        <EmptyWorkspaceState
          title="No Manuscript Loaded for Improvements"
          description="Upload your manuscript PDF or import from arXiv to get targeted recommendations on methodology, baseline expansions, and ablation experiments."
          onNavigate={onNavigate}
          isDarkMode={isDarkMode}
        />
      </div>
    );
  }

  const risks = paper.risks || [];
  const scalability = paper.failureSimulator?.scalability_issues || [];

  return (
    <div className="space-y-6 pb-12">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2.5">
            <Lightbulb className="h-7 w-7 text-amber-500" />
            <span>Paper Improvements & Recommendations</span>
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Concrete methodological refinements to maximize publication acceptance and citation impact.
          </p>
        </div>
        <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200 truncate max-w-xs">
          {paper.title}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Track 1 */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-[0_2px_10px_-3px_rgba(0,0,0,0.05)] space-y-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
            <Cpu className="h-5 w-5" />
          </div>
          <h2 className="text-sm font-bold text-slate-900">
            Methodology & Optimization
          </h2>
          <ul className="space-y-2 text-xs text-slate-600">
            {scalability.length > 0 ? (
              scalability.slice(0, 2).map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))
            ) : (
              <>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>Optimize execution kernels to reduce memory bottlenecks during evaluation.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>Conduct sensitivity analysis on key hyperparameters across variable seeds.</span>
                </li>
              </>
            )}
          </ul>
        </div>

        {/* Track 2 */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-[0_2px_10px_-3px_rgba(0,0,0,0.05)] space-y-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
            <BookOpen className="h-5 w-5" />
          </div>
          <h2 className="text-sm font-bold text-slate-900">
            Literature & Baselines
          </h2>
          <ul className="space-y-2 text-xs text-slate-600">
            {risks.length > 0 ? (
              risks.slice(0, 2).map((risk, i) => (
                <li key={i} className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>Address risk: {risk}</span>
                </li>
              ))
            ) : (
              <>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>Expand head-to-head comparison against recent SOTA baselines.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>Add qualitative comparative charts visualizing attention patterns.</span>
                </li>
              </>
            )}
          </ul>
        </div>

        {/* Track 3 */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-[0_2px_10px_-3px_rgba(0,0,0,0.05)] space-y-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-500">
            <Sparkles className="h-5 w-5" />
          </div>
          <h2 className="text-sm font-bold text-slate-900">
            Ablation & Rigor
          </h2>
          <ul className="space-y-2 text-xs text-slate-600">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
              <span>Report multi-seed statistical confidence intervals and ablation variance.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
              <span>Provide detailed ablation tables validating the contribution of each component.</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

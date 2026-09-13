import React from 'react';
import { Lightbulb, CheckCircle2, BookOpen, Cpu, Sparkles, AlertTriangle, ArrowRight } from 'lucide-react';
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
              Paper Improvements &amp; Recommendations
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
  const weaknesses = paper.extendedAnalysis?.weaknesses || [];
  const scalability = paper.failureSimulator?.scalability_issues || [];
  const limitations = paper.failureSimulator?.dataset_limitations || [];
  const strengths = paper.extendedAnalysis?.strengths || [];

  // Build real improvement items from actual paper data
  const methodologyItems = [
    ...scalability.slice(0, 2),
    ...weaknesses.slice(0, 1).map(w => `Address reported weakness: ${w}`),
  ].filter(Boolean);

  const literatureItems = [
    ...risks.slice(0, 2).map(r => `Mitigate risk: ${r}`),
    ...limitations.slice(0, 1).map(l => `Expand coverage: ${l}`),
  ].filter(Boolean);

  const ablationItems = [
    'Report multi-seed statistical confidence intervals and ablation variance.',
    'Provide detailed ablation tables validating the contribution of each component.',
    ...(paper.extendedAnalysis?.structuredBreakdown?.limitations
      ? [`Address limitation: ${paper.extendedAnalysis.structuredBreakdown.limitations}`]
      : []),
  ].filter(Boolean);

  const noveltyPct = Math.min(100, Math.round((paper.noveltyScore || 8) * 10));
  const impactPct = Math.min(100, Math.round((paper.impactScore || 6.5) * 10));

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2.5">
            <Lightbulb className="h-7 w-7 text-amber-500" />
            <span>Paper Improvements &amp; Recommendations</span>
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Concrete methodological refinements to maximize publication acceptance and citation impact.
          </p>
        </div>
        <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200 truncate max-w-xs">
          {paper.title}
        </span>
      </div>

      {/* Score Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Novelty Score</span>
          <div className="text-3xl font-extrabold text-blue-600 mt-1">{noveltyPct}%</div>
          <div className="h-1.5 w-full rounded-full bg-slate-100 mt-2 overflow-hidden">
            <div className="h-full bg-blue-600 rounded-full" style={{ width: `${noveltyPct}%` }} />
          </div>
        </div>
        <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Projected Impact</span>
          <div className="text-3xl font-extrabold text-amber-500 mt-1">{impactPct}%</div>
          <div className="h-1.5 w-full rounded-full bg-slate-100 mt-2 overflow-hidden">
            <div className="h-full bg-amber-500 rounded-full" style={{ width: `${impactPct}%` }} />
          </div>
        </div>
        <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Open Risks</span>
          <div className="text-3xl font-extrabold text-rose-500 mt-1">{risks.length}</div>
          <p className="text-xs text-slate-400 mt-1">Identified vulnerabilities to address</p>
        </div>
      </div>

      {/* Strengths Block */}
      {strengths.length > 0 && (
        <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5 space-y-2">
          <h2 className="text-xs font-bold text-emerald-700 uppercase tracking-wider flex items-center gap-1.5">
            <CheckCircle2 className="h-4 w-4" /> Confirmed Strengths (Keep &amp; Expand)
          </h2>
          <ul className="space-y-1.5">
            {strengths.map((s, i) => (
              <li key={i} className="flex items-center gap-2 text-xs text-emerald-900">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 shrink-0" />
                {s}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* 3-Track Improvements */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Track 1: Methodology */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm space-y-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
            <Cpu className="h-5 w-5" />
          </div>
          <h2 className="text-sm font-bold text-slate-900">Methodology &amp; Optimization</h2>
          <ul className="space-y-2 text-xs text-slate-600">
            {methodologyItems.length > 0 ? (
              methodologyItems.map((item, i) => (
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

        {/* Track 2: Literature & Baselines */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm space-y-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
            <BookOpen className="h-5 w-5" />
          </div>
          <h2 className="text-sm font-bold text-slate-900">Literature &amp; Baselines</h2>
          <ul className="space-y-2 text-xs text-slate-600">
            {literatureItems.length > 0 ? (
              literatureItems.map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>{item}</span>
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

        {/* Track 3: Ablation */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm space-y-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-500">
            <Sparkles className="h-5 w-5" />
          </div>
          <h2 className="text-sm font-bold text-slate-900">Ablation &amp; Rigor</h2>
          <ul className="space-y-2 text-xs text-slate-600">
            {ablationItems.slice(0, 3).map((item, i) => (
              <li key={i} className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Risks to Address */}
      {risks.length > 0 && (
        <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm space-y-4">
          <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-rose-500" />
            Critical Risks to Address Before Submission
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {risks.map((risk, i) => (
              <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-rose-50 border border-rose-200/60 text-xs text-rose-900">
                <span className="font-black text-rose-500 shrink-0">{i + 1}.</span>
                <span>{risk}</span>
              </div>
            ))}
          </div>
          <button
            onClick={() => onNavigate?.('research_evolution')}
            className="flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:underline mt-1"
          >
            <ArrowRight className="h-3.5 w-3.5" />
            Evolve Research to address these gaps →
          </button>
        </div>
      )}
    </div>
  );
};

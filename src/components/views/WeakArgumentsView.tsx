import React from 'react';
import { AlertTriangle, ShieldAlert, CheckCircle, Info } from 'lucide-react';
import { PaperAnalysis } from '../../types';
import { EmptyWorkspaceState } from '../EmptyWorkspaceState';
import { NavTab } from '../Sidebar';

interface WeakArgumentsViewProps {
  paper?: PaperAnalysis | null;
  onNavigate?: (tab: NavTab) => void;
  isDarkMode?: boolean;
}

export const WeakArgumentsView: React.FC<WeakArgumentsViewProps> = ({
  paper,
  onNavigate,
  isDarkMode = false,
}) => {
  if (!paper) {
    return (
      <div className="space-y-6 pb-12">
        <div className="flex items-center gap-2.5">
          <AlertTriangle className="h-7 w-7 text-amber-500" />
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              Weak Arguments & Vulnerabilities
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Automated counter-argument analysis, unproven assertions, and potential review objections.
            </p>
          </div>
        </div>

        <EmptyWorkspaceState
          title="No Manuscript Loaded for Argument Audit"
          description="Upload a research manuscript (PDF) or search arXiv to run automated Devil's Advocate tests against unproven claims and reviewer traps."
          onNavigate={onNavigate}
          isDarkMode={isDarkMode}
        />
      </div>
    );
  }

  const risks = paper.risks || [];
  const limitations = paper.failureSimulator?.dataset_limitations || [];
  const failureScenarios = paper.failureSimulator?.possible_failure_scenarios || [];

  return (
    <div className="space-y-6 pb-12">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2.5">
            <AlertTriangle className="h-7 w-7 text-amber-500" />
            <span>Weak Arguments & Vulnerabilities</span>
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Automated counter-argument analysis, unproven assertions, and potential review objections.
          </p>
        </div>
        <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200 truncate max-w-xs">
          {paper.title}
        </span>
      </div>

      <div className="space-y-4">
        {risks.length > 0 ? (
          risks.map((risk, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-[0_2px_10px_-3px_rgba(0,0,0,0.05)] space-y-3"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-rose-50 text-rose-600">
                    OBJECTION #{index + 1}
                  </span>
                  <span className="text-xs font-semibold text-slate-400">Reviewer #2 Trap</span>
                </div>
                <span className="text-xs font-bold text-amber-600">Attention Required</span>
              </div>
              <h3 className="text-sm font-bold text-slate-900">
                {risk}
              </h3>
              <div className="rounded-xl bg-blue-50/70 p-3 text-xs text-blue-800 flex items-start gap-2">
                <Info className="h-4 w-4 text-blue-600 shrink-0 mt-0.5" />
                <span>
                  <strong>Suggested Defense:</strong> State this scope boundary clearly in the limitation section and propose empirical mitigations in future iterations.
                </span>
              </div>
            </div>
          ))
        ) : (
          <div className="p-6 rounded-2xl bg-white border border-slate-200 text-center text-slate-500 text-xs">
            No critical weak arguments flagged for this paper.
          </div>
        )}

        {limitations.length > 0 && (
          <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-[0_2px_10px_-3px_rgba(0,0,0,0.05)] space-y-3">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Identified Dataset & Empirical Limitations
            </h3>
            <ul className="space-y-2 text-xs text-slate-700">
              {limitations.map((lim, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                  <span>{lim}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

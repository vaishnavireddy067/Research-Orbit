import React from 'react';
import { Printer, X, ShieldAlert, Sparkles, CheckCircle, BarChart3, AlertTriangle, Cpu } from 'lucide-react';
import { PaperAnalysis } from '../types';

interface DossierModalProps {
  paper: PaperAnalysis | null;
  isOpen: boolean;
  onClose: () => void;
}

export const DossierModal: React.FC<DossierModalProps> = ({ paper, isOpen, onClose }) => {
  if (!isOpen || !paper) return null;

  const handlePrint = () => {
    window.print();
  };

  const breakdown = paper.extendedAnalysis?.structuredBreakdown;
  const failureSim = paper.failureSimulator;
  const actionPlan = paper.actionPlan;
  const authenticity = paper.authenticityAnalysis;
  const realWorld = paper.extendedAnalysis?.realWorldGap;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 sm:p-6 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl rounded-2xl border border-slate-700 bg-slate-950 p-6 sm:p-10 shadow-2xl my-8 text-slate-200 print:border-none print:shadow-none print:p-0 print:my-0 print:bg-white print:text-black">
        
        {/* Floating Print / Close Bar */}
        <div className="no-print flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
          <div className="flex items-center gap-2">
            <span className="rounded-md bg-cyan-500/10 px-2.5 py-1 text-xs font-semibold text-cyan-400 border border-cyan-500/20">
              INTELLIGENCE DOSSIER
            </span>
            <span className="text-xs text-slate-400">
              Document Ref #{paper.id.toString().padStart(5, '0')}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-600 to-indigo-600 px-4 py-2 text-xs font-semibold text-white shadow-lg shadow-cyan-600/20 hover:scale-105 active:scale-95 transition-all"
            >
              <Printer className="h-4 w-4" />
              Print / Save as PDF
            </button>
            <button
              onClick={onClose}
              className="rounded-xl p-2 text-slate-400 hover:bg-slate-900 hover:text-white transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Dossier Cover / Header */}
        <div className="border-b-2 border-slate-800 print:border-black pb-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="text-[10px] font-mono tracking-widest text-slate-400 uppercase">
              Autonomous Research Intelligence Hub
            </div>
            <div className="text-[10px] font-mono text-slate-400">
              Generated: {paper.created_at ? new Date(paper.created_at).toLocaleDateString() : new Date().toLocaleDateString()}
            </div>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black text-white print:text-black tracking-tight mt-2 mb-3">
            {paper.title}
          </h1>

          <div className="flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-slate-400 print:text-slate-700">
            <div>
              <span className="font-semibold text-slate-300 print:text-black">Authors:</span> {paper.authors || 'Unknown'}
            </div>
            <div>
              <span className="font-semibold text-slate-300 print:text-black">Domain:</span> {paper.domain || 'General Science'}
            </div>
            <div>
              <span className="font-semibold text-slate-300 print:text-black">Year:</span> {paper.year || paper.publication_year || '2024'}
            </div>
            <div>
              <span className="font-semibold text-slate-300 print:text-black">Source File:</span> {paper.filename}
            </div>
          </div>
        </div>

        {/* Score Matrix Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-8">
          <div className="rounded-xl bg-slate-900/60 print:bg-slate-100 p-3 sm:p-4 border border-slate-800 print:border-slate-300">
            <div className="text-[11px] font-medium text-slate-400 print:text-slate-600">Impact Score</div>
            <div className="text-2xl font-black text-indigo-400 print:text-indigo-700 mt-1">
              {paper.impactScore?.toFixed(1) || '0.0'}
              <span className="text-xs text-slate-500 font-normal"> / 10</span>
            </div>
          </div>

          <div className="rounded-xl bg-slate-900/60 print:bg-slate-100 p-3 sm:p-4 border border-slate-800 print:border-slate-300">
            <div className="text-[11px] font-medium text-slate-400 print:text-slate-600">Novelty Index</div>
            <div className="text-2xl font-black text-purple-400 print:text-purple-700 mt-1">
              {paper.noveltyScore?.toFixed(1) || '0.0'}
              <span className="text-xs text-slate-500 font-normal"> / 10</span>
            </div>
          </div>

          <div className="rounded-xl bg-slate-900/60 print:bg-slate-100 p-3 sm:p-4 border border-slate-800 print:border-slate-300">
            <div className="text-[11px] font-medium text-slate-400 print:text-slate-600">Authenticity Score</div>
            <div className="text-2xl font-black text-emerald-400 print:text-emerald-700 mt-1">
              {authenticity?.authenticityScore ?? 85}%
            </div>
          </div>

          <div className="rounded-xl bg-slate-900/60 print:bg-slate-100 p-3 sm:p-4 border border-slate-800 print:border-slate-300">
            <div className="text-[11px] font-medium text-slate-400 print:text-slate-600">AI Probability</div>
            <div className="text-2xl font-black text-amber-400 print:text-amber-700 mt-1">
              {authenticity?.aiProbability ?? 15}%
            </div>
          </div>
        </div>

        {/* Executive Summary */}
        <div className="mb-8">
          <h2 className="text-sm font-bold uppercase tracking-wider text-indigo-400 print:text-indigo-800 mb-2 flex items-center gap-1.5">
            <Sparkles className="h-4 w-4" />
            Executive Summary
          </h2>
          <p className="text-sm leading-relaxed text-slate-300 print:text-slate-900 bg-slate-900/40 print:bg-transparent p-4 rounded-xl border border-slate-800 print:border-slate-300">
            {paper.summary}
          </p>
        </div>

        {/* Structured Breakdown */}
        {breakdown && (
          <div className="mb-8">
            <h2 className="text-sm font-bold uppercase tracking-wider text-cyan-400 print:text-cyan-800 mb-3 flex items-center gap-1.5">
              <BarChart3 className="h-4 w-4" />
              Methodological Breakdown
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {breakdown.problemStatement && (
                <div className="rounded-xl bg-slate-900/40 print:bg-slate-50 p-4 border border-slate-800 print:border-slate-300">
                  <div className="text-xs font-bold text-slate-300 print:text-black mb-1">Problem Statement</div>
                  <p className="text-xs text-slate-400 print:text-slate-800 leading-relaxed">{breakdown.problemStatement}</p>
                </div>
              )}
              {breakdown.methodology && (
                <div className="rounded-xl bg-slate-900/40 print:bg-slate-50 p-4 border border-slate-800 print:border-slate-300">
                  <div className="text-xs font-bold text-slate-300 print:text-black mb-1">Proposed Methodology</div>
                  <p className="text-xs text-slate-400 print:text-slate-800 leading-relaxed">{breakdown.methodology}</p>
                </div>
              )}
              {breakdown.datasetUsed && (
                <div className="rounded-xl bg-slate-900/40 print:bg-slate-50 p-4 border border-slate-800 print:border-slate-300">
                  <div className="text-xs font-bold text-slate-300 print:text-black mb-1">Dataset Evaluated</div>
                  <p className="text-xs text-slate-400 print:text-slate-800 leading-relaxed">{breakdown.datasetUsed}</p>
                </div>
              )}
              {breakdown.results && (
                <div className="rounded-xl bg-slate-900/40 print:bg-slate-50 p-4 border border-slate-800 print:border-slate-300">
                  <div className="text-xs font-bold text-slate-300 print:text-black mb-1">Empirical Results</div>
                  <p className="text-xs text-slate-400 print:text-slate-800 leading-relaxed">{breakdown.results}</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Failure Simulator & Limitations */}
        {failureSim && (
          <div className="mb-8">
            <h2 className="text-sm font-bold uppercase tracking-wider text-rose-400 print:text-rose-800 mb-3 flex items-center gap-1.5">
              <ShieldAlert className="h-4 w-4" />
              Failure Simulator & Vulnerability Audit
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="rounded-xl bg-rose-500/5 print:bg-rose-50 p-3 border border-rose-500/20 print:border-rose-300">
                <div className="text-xs font-bold text-rose-300 print:text-rose-800 mb-1">Possible Failure Modes</div>
                <ul className="text-xs text-slate-400 print:text-slate-800 space-y-1 list-disc list-inside">
                  {failureSim.possible_failure_scenarios?.map((s, i) => (
                    <li key={i}>{s}</li>
                  ))}
                </ul>
              </div>
              <div className="rounded-xl bg-amber-500/5 print:bg-amber-50 p-3 border border-amber-500/20 print:border-amber-300">
                <div className="text-xs font-bold text-amber-300 print:text-amber-800 mb-1">Dataset Limitations</div>
                <ul className="text-xs text-slate-400 print:text-slate-800 space-y-1 list-disc list-inside">
                  {failureSim.dataset_limitations?.map((s, i) => (
                    <li key={i}>{s}</li>
                  ))}
                </ul>
              </div>
              <div className="rounded-xl bg-purple-500/5 print:bg-purple-50 p-3 border border-purple-500/20 print:border-purple-300">
                <div className="text-xs font-bold text-purple-300 print:text-purple-800 mb-1">Scalability Bottlenecks</div>
                <ul className="text-xs text-slate-400 print:text-slate-800 space-y-1 list-disc list-inside">
                  {failureSim.scalability_issues?.map((s, i) => (
                    <li key={i}>{s}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Action Plan Roadmap */}
        {actionPlan?.roadmap && actionPlan.roadmap.length > 0 && (
          <div className="mb-8">
            <h2 className="text-sm font-bold uppercase tracking-wider text-emerald-400 print:text-emerald-800 mb-3 flex items-center gap-1.5">
              <CheckCircle className="h-4 w-4" />
              Strategic Implementation Roadmap
            </h2>
            <div className="space-y-2.5">
              {actionPlan.roadmap.map((step, idx) => (
                <div key={idx} className="flex items-start gap-3 rounded-xl bg-slate-900/40 print:bg-slate-50 p-3 border border-slate-800 print:border-slate-300">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 print:bg-emerald-100 print:text-emerald-800 text-xs font-bold">
                    {idx + 1}
                  </span>
                  <div>
                    <h5 className="text-xs font-bold text-slate-200 print:text-black">{step.step}</h5>
                    <p className="text-xs text-slate-400 print:text-slate-700 mt-0.5">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="border-t border-slate-800 print:border-slate-300 pt-4 flex items-center justify-between text-[10px] text-slate-500">
          <span>ResearchPilot AI Autonomous Dossier Engine</span>
          <span>Confidential Intelligence Briefing</span>
        </div>

      </div>
    </div>
  );
};

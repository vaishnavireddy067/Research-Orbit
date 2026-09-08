import React, { useState } from 'react';
import { 
  FileCheck2, 
  AlertTriangle, 
  ShieldAlert, 
  ThumbsUp, 
  ThumbsDown, 
  Award, 
  Sparkles, 
  CheckCircle, 
  MessageSquare,
  FileText,
  Copy,
  Check
} from 'lucide-react';
import { PaperAnalysis } from '../types';

interface PeerReviewerViewProps {
  paper: PaperAnalysis | null;
  onSelectAnotherPaper: () => void;
}

export const PeerReviewerView: React.FC<PeerReviewerViewProps> = ({
  paper,
  onSelectAnotherPaper,
}) => {
  const [copiedRebuttal, setCopiedRebuttal] = useState(false);

  if (!paper) {
    return (
      <div className="rounded-3xl border border-dashed border-slate-800 bg-slate-950/40 p-16 text-center">
        <FileCheck2 className="mx-auto h-12 w-12 text-slate-600 mb-3" />
        <h3 className="text-base font-bold text-white">No active paper selected for Peer Review</h3>
        <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
          Please select or analyze a paper first to run the autonomous "Reviewer #2" critique engine.
        </p>
        <button
          onClick={onSelectAnotherPaper}
          className="mt-5 rounded-xl bg-indigo-600 px-4 py-2 text-xs font-semibold text-white shadow-md shadow-indigo-600/20 hover:bg-indigo-500 transition-all"
        >
          Browse Library
        </button>
      </div>
    );
  }

  // Derive Reviewer #2 calculations
  const impact = paper.impactScore || 5.0;
  const novelty = paper.noveltyScore || 5.0;
  const acceptanceOdds = Math.min(95, Math.max(25, Math.round((impact * 5.5 + novelty * 4.5))));
  const rejectionRisk = 100 - acceptanceOdds;

  let predictedTier = 'Tier 2: IEEE / ACM Transactions';
  let tierBadgeColor = 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20';

  if (impact >= 8.0 && novelty >= 7.5) {
    predictedTier = 'Tier 1: Top-Venue (NeurIPS, ICML, Nature)';
    tierBadgeColor = 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20';
  } else if (impact < 6.0 || novelty < 5.0) {
    predictedTier = 'Tier 3: Specialized Workshop / Regional Venue';
    tierBadgeColor = 'text-amber-400 bg-amber-500/10 border-amber-500/20';
  }

  const audit = paper.extendedAnalysis?.criticalAudit;
  const strengths = paper.extendedAnalysis?.strengths || [
    'Clear motivation addressing high-impact practical bottlenecks',
    'Solid empirical evaluation on standardized benchmarks',
    'Well-structured mathematical formulations',
  ];
  const weaknesses = paper.extendedAnalysis?.weaknesses || [
    'Limited sensitivity analysis under severe covariate distribution shift',
    'Ablation studies could more rigorously isolate transformer sub-modules',
    'Real-world latency and hardware cost omitted',
  ];

  const rebuttalTemplate = `Dear Reviewer #2,

We sincerely appreciate your thoughtful and rigorous review of our manuscript "${paper.title}". We have carefully addressed every concern raised:

1. Regarding Baseline Comparisons & Ablations:
We have incorporated supplementary experiments comparing against the latest state-of-the-art architectures, confirming that our proposed approach consistently yields statistically significant gains.

2. Regarding Dataset & Generalization Limitations:
As noted in the revision, we have expanded Section 4 to explicitly document data boundary conditions and included additional stress-testing on out-of-distribution benchmarks.

3. Regarding Hardware Deployment & Computational Overhead:
We have included a dedicated latency and memory profiling section detailing quantized inference performance on edge hardware.

We thank you for helping us strengthen the empirical rigor of this work.`;

  const handleCopyRebuttal = () => {
    navigator.clipboard.writeText(rebuttalTemplate);
    setCopiedRebuttal(true);
    setTimeout(() => setCopiedRebuttal(false), 2000);
  };

  return (
    <div className="space-y-6 pb-16">
      
      {/* Header Banner */}
      <div className="rounded-3xl border border-slate-800 bg-slate-950/80 p-6 sm:p-8 backdrop-blur-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6 mb-6">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-rose-500/20 text-rose-400">
                <FileCheck2 className="h-3.5 w-3.5" />
              </span>
              <span className="text-xs font-bold text-rose-400 tracking-wider uppercase">
                Autonomous Reviewer #2 Engine
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Peer Review & Rejection Risk Audit
            </h2>
            <p className="text-xs text-slate-400 mt-1 max-w-2xl">
              Evaluating: <span className="text-slate-200 font-semibold">{paper.title}</span>
            </p>
          </div>

          <button
            onClick={onSelectAnotherPaper}
            className="rounded-xl bg-slate-900 border border-slate-800 px-3.5 py-2 text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-800 transition-all self-start sm:self-auto"
          >
            Change Paper
          </button>
        </div>

        {/* Prediction Metrics Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          
          {/* Rejection Risk Gauge */}
          <div className="rounded-2xl bg-slate-900/60 p-5 border border-slate-800">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-400 mb-1">
              <span>Rejection Risk Index</span>
              <ShieldAlert className="h-4 w-4 text-rose-400" />
            </div>
            <div className="text-2xl font-black text-rose-400">
              {rejectionRisk}%
              <span className="text-xs text-slate-500 font-normal"> Probability</span>
            </div>
            <div className="w-full bg-slate-800 rounded-full h-2 mt-3">
              <div
                className="bg-gradient-to-r from-emerald-500 via-amber-500 to-rose-500 h-full rounded-full"
                style={{ width: `${rejectionRisk}%` }}
              />
            </div>
          </div>

          {/* Acceptance Odds */}
          <div className="rounded-2xl bg-slate-900/60 p-5 border border-slate-800">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-400 mb-1">
              <span>Acceptance Odds</span>
              <CheckCircle className="h-4 w-4 text-emerald-400" />
            </div>
            <div className="text-2xl font-black text-emerald-400">
              {acceptanceOdds}%
              <span className="text-xs text-slate-500 font-normal"> Expected</span>
            </div>
            <div className="w-full bg-slate-800 rounded-full h-2 mt-3">
              <div
                className="bg-emerald-500 h-full rounded-full"
                style={{ width: `${acceptanceOdds}%` }}
              />
            </div>
          </div>

          {/* Journal Tier Prediction */}
          <div className="rounded-2xl bg-slate-900/60 p-5 border border-slate-800">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-400 mb-1">
              <span>Predicted Venue Tier</span>
              <Award className="h-4 w-4 text-indigo-400" />
            </div>
            <div className="mt-2">
              <span className={`inline-block rounded-xl px-3 py-1.5 text-xs font-bold border ${tierBadgeColor}`}>
                {predictedTier}
              </span>
            </div>
          </div>

        </div>
      </div>

      {/* Critical Scrutiny Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Reviewer Strengths */}
        <div className="rounded-3xl border border-slate-800 bg-slate-950/70 p-6 backdrop-blur-xl">
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 uppercase tracking-wider mb-4">
            <ThumbsUp className="h-4 w-4" />
            Recognized Strengths & Contributions
          </div>
          <ul className="space-y-3">
            {strengths.map((str, idx) => (
              <li key={idx} className="flex items-start gap-3 text-xs text-slate-300 leading-relaxed bg-slate-900/40 p-3 rounded-xl border border-slate-800/80">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold">
                  ✓
                </span>
                <span>{str}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Reviewer Weaknesses / Harsh Scrutiny */}
        <div className="rounded-3xl border border-slate-800 bg-slate-950/70 p-6 backdrop-blur-xl">
          <div className="flex items-center gap-2 text-xs font-bold text-rose-400 uppercase tracking-wider mb-4">
            <ThumbsDown className="h-4 w-4" />
            Reviewer #2 Critical Vulnerabilities
          </div>
          <ul className="space-y-3">
            {weaknesses.map((w, idx) => (
              <li key={idx} className="flex items-start gap-3 text-xs text-slate-300 leading-relaxed bg-rose-500/5 p-3 rounded-xl border border-rose-500/20">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-rose-500/20 text-rose-400 text-[10px] font-bold">
                  !
                </span>
                <span>{w}</span>
              </li>
            ))}
          </ul>
        </div>

      </div>

      {/* Audit: Missing Modules & Weak Arguments */}
      {audit && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="rounded-2xl bg-slate-950/70 border border-slate-800 p-5">
            <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <AlertTriangle className="h-4 w-4" />
              Potential Weak Arguments & Assumptions
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              {(audit.weakArguments || ['Assumes identical loss distribution across varying domain tasks']).map((arg, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-amber-400">•</span>
                  <span>{arg}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl bg-slate-950/70 border border-slate-800 p-5">
            <h4 className="text-xs font-bold text-indigo-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <Sparkles className="h-4 w-4" />
              Improvement Opportunities Before Resubmission
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              {(audit.improvementAreas || ['Include rigorous hardware runtime profiling', 'Benchmark against recent baseline models']).map((imp, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-indigo-400">•</span>
                  <span>{imp}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Author Rebuttal Generator */}
      <div className="rounded-3xl border border-slate-800 bg-slate-950/70 p-6 backdrop-blur-xl">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-4">
          <div className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4 text-indigo-400" />
            <h3 className="text-sm font-bold text-white">Autonomous Author Rebuttal Strategy</h3>
          </div>
          <button
            onClick={handleCopyRebuttal}
            className="flex items-center gap-1.5 rounded-xl bg-slate-900 border border-slate-800 px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-800 transition-all"
          >
            {copiedRebuttal ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
            <span>{copiedRebuttal ? 'Copied' : 'Copy Rebuttal'}</span>
          </button>
        </div>

        <pre className="whitespace-pre-wrap rounded-2xl bg-slate-900/60 p-4 text-xs font-mono text-slate-300 leading-relaxed border border-slate-800/80 overflow-x-auto">
          {rebuttalTemplate}
        </pre>
      </div>

    </div>
  );
};

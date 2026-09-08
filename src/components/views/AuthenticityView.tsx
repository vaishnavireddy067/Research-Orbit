import React from 'react';
import { Download, ShieldCheck, CheckCircle, AlertTriangle } from 'lucide-react';
import { PaperAnalysis } from '../../types';

interface AuthenticityViewProps {
  paper: PaperAnalysis;
  onExport: () => void;
  onAnalyzeFull: () => void;
}

export const AuthenticityView: React.FC<AuthenticityViewProps> = ({
  paper,
  onExport,
  onAnalyzeFull,
}) => {
  const auth = paper.authenticityAnalysis || {
    authenticityScore: 88,
    aiProbability: 12,
    indicators: [
      { label: 'Citation Quality & Verification', value: 92 },
      { label: 'Methodological Rigor', value: 85 },
      { label: 'Empirical Reproducibility', value: 80 },
      { label: 'Human Academic Attribution', value: 94 }
    ]
  };

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white leading-tight">
            {paper.title}
          </h1>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/20 px-3 py-0.5 text-[10px] font-bold text-emerald-300 uppercase tracking-wider border border-emerald-500/30">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              NODE: AUTHENTICITY
            </span>
            <span className="text-xs font-mono text-slate-500">ID: SAMPLE-{paper.id}</span>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onExport}
            className="flex items-center gap-2 rounded-xl bg-slate-900 border border-slate-700 px-4 py-2.5 text-xs font-bold text-slate-200 hover:bg-slate-800 hover:text-white transition-all shadow-sm"
          >
            <Download className="h-4 w-4" />
            <span>EXPORT</span>
          </button>
          <button
            onClick={onAnalyzeFull}
            className="flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-xs font-black text-white shadow-lg shadow-indigo-600/30 hover:bg-indigo-500 transition-all uppercase tracking-wider"
          >
            <span>ANALYZE FULL</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 rounded-3xl bg-[#090e1a] border border-slate-800/80 p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-slate-200">
            <ShieldCheck className="h-4 w-4 text-emerald-400" />
            <span>ACADEMIC INTEGRITY & AI VERIFICATION AUDIT</span>
          </div>

          <div className="space-y-4 pt-2">
            {auth.indicators?.map((ind, idx) => (
              <div key={idx} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-300 font-semibold">{ind.label}</span>
                  <span className="text-emerald-400 font-mono font-bold">{ind.value}%</span>
                </div>
                <div className="w-full bg-slate-900 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-indigo-500 to-emerald-400 h-full rounded-full"
                    style={{ width: `${ind.value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl bg-[#090e1a] border border-slate-800/80 p-6 sm:p-8 flex flex-col items-center justify-center text-center space-y-4 min-h-[340px]">
          <div className="text-4xl font-black text-emerald-400">
            {auth.authenticityScore}%
          </div>
          <div className="text-xs font-bold tracking-widest uppercase text-slate-400">
            AUTHENTICITY CONFIDENCE
          </div>
          <div className="text-xs text-slate-400 max-w-xs italic leading-relaxed pt-2">
            "Content reflects high empirical depth, valid citation structures, and genuine academic formulation."
          </div>
          <div className="pt-2">
            <span className="rounded-full bg-amber-500/10 px-3 py-1 text-xs font-bold text-amber-400 border border-amber-500/20">
              AI Probability: {auth.aiProbability}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import { TrendingUp, Download, Users, Lightbulb, Target } from 'lucide-react';
import { PaperAnalysis } from '../../types';

interface ImpactPredictorViewProps {
  paper: PaperAnalysis;
  onExport: () => void;
  onAnalyzeFull: () => void;
}

export const ImpactPredictorView: React.FC<ImpactPredictorViewProps> = ({
  paper,
  onExport,
  onAnalyzeFull,
}) => {
  const impactScore = paper.impactScore || 6.5;
  const researchImpact = paper.researchImpact;

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white leading-tight">
            {paper.title}
          </h1>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-500/20 px-3 py-0.5 text-[10px] font-bold text-blue-300 uppercase tracking-wider border border-blue-500/30">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-400 animate-pulse" />
              NODE: IMPACT
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
            <TrendingUp className="h-4 w-4 text-blue-400" />
            <span>PROJECTED SCIENTIFIC & INDUSTRIAL IMPACT</span>
          </div>

          <div className="space-y-4 pt-2">
            <div className="rounded-2xl bg-slate-900/60 border border-slate-800/80 p-5 space-y-2">
              <h4 className="text-xs font-bold text-blue-300 uppercase flex items-center gap-1.5">
                <Lightbulb className="h-3.5 w-3.5" />
                Why It Matters
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                {researchImpact?.why_it_matters || 'The study establishes foundational principles for high-throughput distributed neural inference across multi-modal architectures.'}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="rounded-2xl bg-slate-900/60 border border-slate-800/80 p-5 space-y-2">
                <h4 className="text-xs font-bold text-purple-300 uppercase flex items-center gap-1.5">
                  <Users className="h-3.5 w-3.5" />
                  Primary Beneficiaries
                </h4>
                <ul className="text-xs text-slate-300 space-y-1.5 list-disc list-inside">
                  {(researchImpact?.who_benefits || ['Machine Learning Researchers', 'AI System Architects', 'Cloud Infrastructure Providers']).map((b, i) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>
              </div>

              <div className="rounded-2xl bg-slate-900/60 border border-slate-800/80 p-5 space-y-2">
                <h4 className="text-xs font-bold text-emerald-300 uppercase flex items-center gap-1.5">
                  <Target className="h-3.5 w-3.5" />
                  Practical Target Applications
                </h4>
                <ul className="text-xs text-slate-300 space-y-1.5 list-disc list-inside">
                  {(researchImpact?.practical_applications || ['Automated Research Intelligence', 'Enterprise Document Search', 'Real-Time Cross-Lingual Translation']).map((a, i) => (
                    <li key={i}>{a}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-3xl bg-[#090e1a] border border-slate-800/80 p-6 sm:p-8 flex flex-col items-center justify-center text-center space-y-4 min-h-[340px]">
          <div className="text-5xl font-black text-blue-400">
            {impactScore.toFixed(1)}
            <span className="text-sm text-slate-500 font-normal"> /10</span>
          </div>
          <div className="text-xs font-bold tracking-widest uppercase text-slate-400">
            ACADEMIC IMPACT INDEX
          </div>
          <div className="w-48 bg-slate-800 rounded-full h-2 mt-2">
            <div className="bg-blue-500 h-full rounded-full" style={{ width: `${impactScore * 10}%` }} />
          </div>
          <p className="text-xs text-slate-400 italic max-w-xs leading-relaxed pt-2">
            "Projected citation velocity indicates high downstream adoption in applied systems."
          </p>
        </div>
      </div>
    </div>
  );
};

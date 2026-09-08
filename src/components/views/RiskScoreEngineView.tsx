import React from 'react';
import { 
  Download, 
  ShieldAlert, 
  Check, 
  AlertTriangle,
  Sparkles
} from 'lucide-react';
import { PaperAnalysis } from '../../types';

interface RiskScoreEngineViewProps {
  paper: PaperAnalysis;
  onExport: () => void;
  onAnalyzeFull: () => void;
}

export const RiskScoreEngineView: React.FC<RiskScoreEngineViewProps> = ({
  paper,
  onExport,
  onAnalyzeFull,
}) => {
  const audit = paper.extendedAnalysis?.criticalAudit;
  const strengths = paper.extendedAnalysis?.strengths || [
    'Large-scale validated dataset',
    'Strong performance benchmarks',
    'Reproducible methodology',
  ];
  const weaknesses = paper.risks && paper.risks.length > 0 ? paper.risks : [
    'No real-world production validation',
    'Missing legacy baseline comparison',
    'High computational overhead',
  ];

  const score = 6.5;

  return (
    <div className="space-y-6 pb-12">
      
      {/* Paper Title Header & Top Actions */}
      <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white leading-tight">
            {paper.title}
          </h1>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-500/20 px-3 py-0.5 text-[10px] font-bold text-indigo-300 uppercase tracking-wider border border-indigo-500/30">
              <span className="h-1.5 w-1.5 rounded-full bg-indigo-400 animate-pulse" />
              NODE: RISK
            </span>
            <span className="text-xs font-mono text-slate-500">
              ID: SAMPLE-{paper.id}
            </span>
          </div>
        </div>

        {/* Top Right Buttons */}
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

      {/* Main Grid matching screenshot */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: RELIABILITY & EVIDENCE AUDIT */}
        <div className="lg:col-span-2 rounded-3xl bg-[#090e1a] border border-slate-800/80 p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-slate-200">
            <ShieldAlert className="h-4 w-4 text-rose-400" />
            <span>RELIABILITY & EVIDENCE AUDIT</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
            
            {/* CRITICAL STRENGTHS */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-[11px] font-bold tracking-wider uppercase text-emerald-400">
                <span className="flex h-4 w-4 items-center justify-center rounded-full border border-emerald-400 text-[10px]">
                  ✓
                </span>
                <span>CRITICAL STRENGTHS</span>
              </div>

              <div className="space-y-2.5">
                {strengths.slice(0, 3).map((item, idx) => (
                  <div 
                    key={idx}
                    className="flex items-center gap-3 rounded-2xl bg-slate-900/60 border border-slate-800/80 p-4 text-xs text-slate-300 italic font-sans"
                  >
                    <Check className="h-4 w-4 text-indigo-400 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* POTENTIAL WEAKNESSES */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-[11px] font-bold tracking-wider uppercase text-amber-400">
                <span className="flex h-4 w-4 items-center justify-center rounded-full border border-amber-400 text-[10px]">
                  !
                </span>
                <span>POTENTIAL WEAKNESSES</span>
              </div>

              <div className="space-y-2.5">
                {weaknesses.slice(0, 3).map((item, idx) => (
                  <div 
                    key={idx}
                    className="flex items-center gap-3 rounded-2xl bg-slate-900/60 border border-slate-800/80 p-4 text-xs text-slate-300 italic font-sans"
                  >
                    <AlertTriangle className="h-4 w-4 text-amber-400 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* Right Column: Risk Gauge Card */}
        <div className="rounded-3xl bg-[#090e1a] border border-slate-800/80 p-6 sm:p-8 flex flex-col items-center justify-center text-center space-y-4 min-h-[360px]">
          
          {/* Circular Donut Gauge */}
          <div className="relative flex items-center justify-center">
            <svg className="w-40 h-40 transform -rotate-90">
              <circle
                cx="80"
                cy="80"
                r="65"
                stroke="currentColor"
                strokeWidth="12"
                className="text-slate-800"
                fill="transparent"
              />
              <circle
                cx="80"
                cy="80"
                r="65"
                stroke="currentColor"
                strokeWidth="12"
                strokeDasharray={408}
                strokeDashoffset={408 - (408 * score * 10) / 100}
                strokeLinecap="round"
                className="text-rose-500 transition-all duration-1000"
                fill="transparent"
              />
            </svg>
            <div className="absolute flex flex-col items-center">
              <span className="text-3xl font-black text-white">{score}</span>
              <span className="text-[10px] font-mono tracking-widest text-slate-500 uppercase">RISK SCORE</span>
            </div>
          </div>

          <div className="space-y-2 pt-2">
            <h3 className="text-base font-black tracking-widest text-white uppercase">
              MODERATE RISK
            </h3>
            <p className="text-xs text-slate-400 italic max-w-xs leading-relaxed">
              "Peer-review simulation detects high theoretical depth but low field-validation data."
            </p>
          </div>

        </div>

      </div>

    </div>
  );
};

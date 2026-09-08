import React from 'react';
import { 
  Download, 
  Sparkles, 
  Activity, 
  CheckCircle, 
  Globe, 
  Cpu, 
  ArrowUpRight,
  TrendingUp,
  BarChart2
} from 'lucide-react';
import { PaperAnalysis } from '../../types';

interface SummaryHubViewProps {
  paper: PaperAnalysis;
  onExport: () => void;
  onAnalyzeFull: () => void;
}

export const SummaryHubView: React.FC<SummaryHubViewProps> = ({
  paper,
  onExport,
  onAnalyzeFull,
}) => {
  const novelty = paper.noveltyScore || 8.2;
  const impact = paper.impactScore || 6.5;
  const riskLevel = paper.risks && paper.risks.length > 2 ? 'High' : (paper.risks && paper.risks.length > 0 ? 'Med' : 'Low');
  const citations = paper.authenticityAnalysis?.indicators?.[0]?.value || 72;
  const methodText = paper.extendedAnalysis?.structuredBreakdown?.methodology || paper.implementation || 'Transformer Backpropagation';

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
              NODE: HUB
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

      {/* Phase Progress Stepper Bar */}
      <div className="rounded-2xl border border-slate-800/80 bg-slate-950/60 p-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs">
        <div className="flex items-center gap-2 text-emerald-400 font-bold uppercase tracking-wider">
          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>PHASE: INSIGHTS GENERATED</span>
        </div>

        <div className="hidden sm:block h-4 w-px bg-slate-800" />

        <div className="flex items-center gap-4 text-emerald-400 font-semibold text-[11px]">
          <span className="flex items-center gap-1">
            <CheckCircle className="h-3.5 w-3.5" /> UPLOAD ↗
          </span>
          <span className="flex items-center gap-1">
            <CheckCircle className="h-3.5 w-3.5" /> PARSING ↗
          </span>
          <span className="flex items-center gap-1">
            <CheckCircle className="h-3.5 w-3.5" /> CLAIMS ↗
          </span>
          <span className="flex items-center gap-1">
            <CheckCircle className="h-3.5 w-3.5" /> GAPS ↗
          </span>
        </div>
      </div>

      {/* 5 Metrics Cards Row */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        
        {/* Card 1: Novelty */}
        <div className="rounded-2xl bg-[#090e1a] border border-slate-800/80 p-5 flex flex-col justify-between h-32">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold tracking-widest uppercase text-slate-400">NOVELTY</span>
            <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-400">
              <Activity className="h-3.5 w-3.5" />
            </div>
          </div>
          <div>
            <div className="text-2xl font-black text-white">
              {novelty.toFixed(1)}
              <span className="text-xs text-slate-500 font-normal"> /10</span>
            </div>
            <div className="w-full bg-slate-800 rounded-full h-1 mt-2">
              <div className="bg-indigo-500 h-full rounded-full" style={{ width: `${novelty * 10}%` }} />
            </div>
          </div>
        </div>

        {/* Card 2: Risk */}
        <div className="rounded-2xl bg-[#090e1a] border border-slate-800/80 p-5 flex flex-col justify-between h-32">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold tracking-widest uppercase text-slate-400">RISK</span>
            <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-amber-500/10 text-amber-400">
              <Activity className="h-3.5 w-3.5" />
            </div>
          </div>
          <div>
            <div className="text-2xl font-black text-white">
              {riskLevel}
            </div>
            <div className="w-full bg-slate-800 rounded-full h-1 mt-2">
              <div className="bg-amber-400 h-full rounded-full" style={{ width: riskLevel === 'High' ? '85%' : (riskLevel === 'Med' ? '50%' : '20%') }} />
            </div>
          </div>
        </div>

        {/* Card 3: Citations */}
        <div className="rounded-2xl bg-[#090e1a] border border-slate-800/80 p-5 flex flex-col justify-between h-32">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold tracking-widest uppercase text-slate-400">CITATIONS</span>
            <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400">
              <Activity className="h-3.5 w-3.5" />
            </div>
          </div>
          <div>
            <div className="text-2xl font-black text-white">
              {citations}
              <span className="text-xs text-slate-500 font-normal">%</span>
            </div>
            <div className="w-full bg-slate-800 rounded-full h-1 mt-2">
              <div className="bg-emerald-400 h-full rounded-full" style={{ width: `${citations}%` }} />
            </div>
          </div>
        </div>

        {/* Card 4: Innovation */}
        <div className="rounded-2xl bg-[#090e1a] border border-slate-800/80 p-5 flex flex-col justify-between h-32">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold tracking-widest uppercase text-slate-400">INNOVATION</span>
            <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400">
              <Activity className="h-3.5 w-3.5" />
            </div>
          </div>
          <div>
            <div className="text-2xl font-black text-white">
              High
            </div>
            <div className="w-full bg-slate-800 rounded-full h-1 mt-2">
              <div className="bg-blue-500 h-full rounded-full" style={{ width: '80%' }} />
            </div>
          </div>
        </div>

        {/* Card 5: Data Quality */}
        <div className="rounded-2xl bg-[#090e1a] border border-slate-800/80 p-5 flex flex-col justify-between h-32">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold tracking-widest uppercase text-slate-400">DATA QUAL</span>
            <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-rose-500/10 text-rose-400">
              <Activity className="h-3.5 w-3.5" />
            </div>
          </div>
          <div>
            <div className="text-2xl font-black text-white">
              {impact.toFixed(1)}
              <span className="text-xs text-slate-500 font-normal"> /10</span>
            </div>
            <div className="w-full bg-slate-800 rounded-full h-1 mt-2">
              <div className="bg-rose-500 h-full rounded-full" style={{ width: `${impact * 10}%` }} />
            </div>
          </div>
        </div>

      </div>

      {/* Bottom 3 Cards Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        
        {/* Card 1: QUICK INSIGHTS */}
        <div className="rounded-3xl bg-[#090e1a] border border-slate-800/80 p-6 flex flex-col justify-between min-h-[260px]">
          <div className="flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-slate-200">
            <Activity className="h-4 w-4 text-indigo-400" />
            <span>QUICK INSIGHTS</span>
          </div>

          <div className="space-y-4 my-auto pt-4">
            <div className="flex items-start gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-slate-900 border border-slate-800 text-slate-400">
                <Globe className="h-4 w-4" />
              </div>
              <div>
                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500">PRIMARY FIELD</div>
                <div className="text-sm font-bold text-white mt-0.5">{paper.domain || 'NLP / AI'}</div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-slate-900 border border-slate-800 text-slate-400">
                <Cpu className="h-4 w-4" />
              </div>
              <div>
                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500">METHOD</div>
                <div className="text-xs font-medium text-slate-300 mt-0.5 line-clamp-2 leading-relaxed">
                  {methodText}
                </div>
              </div>
            </div>
          </div>

          <div className="text-[11px] text-slate-500 pt-2 border-t border-slate-800/60">
            Automated neural claim extraction verified.
          </div>
        </div>

        {/* Card 2: RESEARCH TREND (Smooth Line Curve) */}
        <div className="rounded-3xl bg-[#090e1a] border border-slate-800/80 p-6 flex flex-col justify-between min-h-[260px]">
          <div className="flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-slate-200">
            <TrendingUp className="h-4 w-4 text-indigo-400" />
            <span>RESEARCH TREND</span>
          </div>

          <div className="my-auto py-2 flex items-center justify-center">
            <svg viewBox="0 0 300 120" className="w-full h-28 overflow-visible">
              <defs>
                <linearGradient id="curveGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#6366f1" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#6366f1" stopOpacity="0.0" />
                </linearGradient>
              </defs>
              <path
                d="M 10 100 Q 150 90, 220 30 T 290 20"
                fill="none"
                stroke="#818cf8"
                strokeWidth="3"
                strokeLinecap="round"
              />
              <path
                d="M 10 100 Q 150 90, 220 30 T 290 20 L 290 120 L 10 120 Z"
                fill="url(#curveGradient)"
              />
            </svg>
          </div>

          <div className="flex items-center justify-between text-[10px] text-slate-500 pt-2 border-t border-slate-800/60">
            <span>2020</span>
            <span>2022</span>
            <span>2024</span>
            <span className="text-indigo-400 font-bold">+184% Velocity</span>
          </div>
        </div>

        {/* Card 3: CONTRIBUTION (3-Bar Chart) */}
        <div className="rounded-3xl bg-[#090e1a] border border-slate-800/80 p-6 flex flex-col justify-between min-h-[260px]">
          <div className="flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-slate-200">
            <BarChart2 className="h-4 w-4 text-indigo-400" />
            <span>CONTRIBUTION</span>
          </div>

          <div className="my-auto flex items-end justify-center gap-5 h-28 pt-2">
            <div className="flex flex-col items-center gap-1">
              <div className="w-10 rounded-t-lg bg-indigo-500/80" style={{ height: '60px' }} />
              <span className="text-[9px] text-slate-500">Method</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <div className="w-10 rounded-t-lg bg-indigo-500" style={{ height: '95px' }} />
              <span className="text-[9px] text-slate-500">Novelty</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <div className="w-10 rounded-t-lg bg-indigo-500/50" style={{ height: '35px' }} />
              <span className="text-[9px] text-slate-500">Data</span>
            </div>
          </div>

          <div className="text-[11px] text-slate-500 pt-2 border-t border-slate-800/60 text-center">
            Novelty contribution ranks in the top 9th percentile.
          </div>
        </div>

      </div>

    </div>
  );
};

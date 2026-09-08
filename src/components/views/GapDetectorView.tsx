import React from 'react';
import { Download, Globe, ArrowUpRight } from 'lucide-react';
import { PaperAnalysis } from '../../types';

interface GapDetectorViewProps {
  paper: PaperAnalysis;
  onExport: () => void;
  onAnalyzeFull: () => void;
}

export const GapDetectorView: React.FC<GapDetectorViewProps> = ({
  paper,
  onExport,
  onAnalyzeFull,
}) => {
  const failureSim = paper.failureSimulator;
  const bottlenecks = failureSim?.scalability_issues && failureSim.scalability_issues.length > 0 
    ? failureSim.scalability_issues 
    : [
        'Requires significant H100/A100 GPU infrastructure for inference.',
        'Latency profiles are currently incompatible with real-time API nodes.',
        'Lacks test-cases for adversarial production environments.',
      ];

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
              NODE: GAP
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

      {/* Main Grid matching exact screenshot */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: REAL-WORLD READINESS GAP */}
        <div className="lg:col-span-2 rounded-3xl bg-[#090e1a] border border-slate-800/80 p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-slate-200">
            <Globe className="h-4 w-4 text-blue-400" />
            <span>REAL-WORLD READINESS GAP</span>
          </div>

          {/* Academic Strength & Industry Readiness Bars */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
            <div className="space-y-2">
              <div className="text-[10px] font-bold tracking-widest uppercase text-slate-400">
                ACADEMIC STRENGTH
              </div>
              <div className="w-full bg-slate-800 rounded-full h-2">
                <div className="bg-blue-500 h-full rounded-full" style={{ width: '92%' }} />
              </div>
              <div className="text-xs font-bold text-white pt-1">HIGH (9.2)</div>
            </div>

            <div className="space-y-2">
              <div className="text-[10px] font-bold tracking-widest uppercase text-slate-400">
                INDUSTRY READINESS
              </div>
              <div className="w-full bg-slate-800 rounded-full h-2">
                <div className="bg-amber-500 h-full rounded-full" style={{ width: '45%' }} />
              </div>
              <div className="text-xs font-bold text-white pt-1">MEDIUM (4.5)</div>
            </div>
          </div>

          {/* DEPLOYMENT BOTTLENECKS */}
          <div className="rounded-2xl bg-slate-900/60 border border-slate-800/80 p-5 space-y-3">
            <div className="text-[10px] font-bold tracking-widest uppercase text-slate-400">
              DEPLOYMENT BOTTLENECKS
            </div>
            <ul className="space-y-2 text-xs text-slate-300 leading-relaxed">
              {bottlenecks.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-rose-400 mt-0.5">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Column: BRIDGING THE GAP */}
        <div className="rounded-3xl bg-[#090e1a] border border-slate-800/80 p-6 sm:p-8 space-y-5">
          <div className="text-xs font-bold tracking-widest uppercase text-slate-200">
            BRIDGING THE GAP
          </div>

          <div className="space-y-4 pt-2">
            <div className="group rounded-2xl bg-slate-900/60 border border-slate-800/80 p-4 hover:border-indigo-500/40 transition-all cursor-pointer">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-white group-hover:text-indigo-300">
                  Quantization Node
                </h4>
                <ArrowUpRight className="h-3.5 w-3.5 text-slate-500 group-hover:text-indigo-400" />
              </div>
              <p className="text-xs text-slate-400 mt-2 italic leading-relaxed">
                "4-bit quantization could reduce industry deployment cost by 65%."
              </p>
            </div>

            <div className="group rounded-2xl bg-slate-900/60 border border-slate-800/80 p-4 hover:border-indigo-500/40 transition-all cursor-pointer">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-white group-hover:text-indigo-300">
                  Edge Proxy Optimization
                </h4>
                <ArrowUpRight className="h-3.5 w-3.5 text-slate-500 group-hover:text-indigo-400" />
              </div>
              <p className="text-xs text-slate-400 mt-2 italic leading-relaxed">
                "Moving specific logic units to Rust-based edge nodes."
              </p>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};

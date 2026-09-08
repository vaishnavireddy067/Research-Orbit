import React from 'react';
import { Search, AlertCircle, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { PaperAnalysis } from '../../types';

interface GapAnalysisViewProps {
  paper?: PaperAnalysis;
  onExport?: () => void;
  onAnalyzeFull?: () => void;
}

export const GapAnalysisView: React.FC<GapAnalysisViewProps> = ({ paper }) => {
  return (
    <div className="space-y-6 pb-12">
      <div>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2.5">
          <Search className="h-7 w-7 text-blue-600" />
          <span>Gap Analysis</span>
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Identified research blindspots, baseline discrepancies, and unexplored academic territory.
        </p>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-[0_2px_10px_-3px_rgba(0,0,0,0.05)]">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            ACADEMIC RIGOR
          </span>
          <div className="text-3xl font-extrabold text-slate-900 mt-1">
            8.4 /10
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Strong theoretical proofs and comprehensive mathematical formulations.
          </p>
          <div className="h-2 w-full rounded-full bg-slate-100 mt-4 overflow-hidden">
            <div className="h-full bg-blue-600 rounded-full w-[84%]" />
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-[0_2px_10px_-3px_rgba(0,0,0,0.05)]">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            INDUSTRY READINESS GAP
          </span>
          <div className="text-3xl font-extrabold text-amber-500 mt-1">
            4.2 /10
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Severe latency bottlenecks on edge devices and high memory footprint.
          </p>
          <div className="h-2 w-full rounded-full bg-slate-100 mt-4 overflow-hidden">
            <div className="h-full bg-amber-500 rounded-full w-[42%]" />
          </div>
        </div>
      </div>

      {/* Identified Critical Gaps */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-[0_2px_10px_-3px_rgba(0,0,0,0.05)] space-y-4">
        <h2 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
          Unexplored Gaps & Blindspots
        </h2>

        <div className="space-y-3">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/60 flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-amber-500 mt-0.5 shrink-0" />
            <div className="space-y-1">
              <h3 className="text-xs font-bold text-slate-900">
                Absence of Real-World Edge Device Benchmarks
              </h3>
              <p className="text-xs text-slate-500">
                The authors tested exclusively on high-end server clusters (A100/H100), leaving low-power mobile inferences unexamined.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/60 flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-amber-500 mt-0.5 shrink-0" />
            <div className="space-y-1">
              <h3 className="text-xs font-bold text-slate-900">
                Missing Historical Baselines (LSTM & ConvSeq2Seq)
              </h3>
              <p className="text-xs text-slate-500">
                No direct comparison with optimized convolutional sequence architectures on identical vocabulary tokenizers.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/60 flex items-start gap-3">
            <CheckCircle2 className="h-5 w-5 text-blue-500 mt-0.5 shrink-0" />
            <div className="space-y-1">
              <h3 className="text-xs font-bold text-slate-900">
                High Potential for Quantization & Pruning
              </h3>
              <p className="text-xs text-slate-500">
                8-bit INT8 quantization could reduce compute demand by 60% with negligible BLEU degradation.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

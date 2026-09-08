import React from 'react';
import { AlertTriangle, ShieldAlert, CheckCircle, Info } from 'lucide-react';
import { PaperAnalysis } from '../../types';

interface WeakArgumentsViewProps {
  paper?: PaperAnalysis;
}

export const WeakArgumentsView: React.FC<WeakArgumentsViewProps> = ({ paper }) => {
  return (
    <div className="space-y-6 pb-12">
      <div>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2.5">
          <AlertTriangle className="h-7 w-7 text-amber-500" />
          <span>Weak Arguments & Vulnerabilities</span>
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Automated counter-argument analysis, unproven assertions, and potential review objections.
        </p>
      </div>

      <div className="space-y-4">
        {/* Issue 1 */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-[0_2px_10px_-3px_rgba(0,0,0,0.05)] space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-rose-50 text-rose-600">
                CRITICAL OBJECTION
              </span>
              <span className="text-xs font-semibold text-slate-400">Section 4.2 Empirical Evaluation</span>
            </div>
            <span className="text-xs font-bold text-slate-400">Review Risk: High</span>
          </div>
          <h3 className="text-sm font-bold text-slate-900">
            Selective Benchmark Reporting on High-Resource Languages
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            The paper claims universal cross-lingual efficacy, but tests solely on German and French (WMT 2014). Low-resource languages with different grammatical morphosyntax were omitted without explanation.
          </p>
          <div className="rounded-xl bg-blue-50/70 p-3 text-xs text-blue-800 flex items-start gap-2">
            <Info className="h-4 w-4 text-blue-600 shrink-0 mt-0.5" />
            <span><strong>Suggested Defense:</strong> Acknowledge dialect limitations explicitly and add preliminary zero-shot transfer benchmarks on Hindi or Swahili.</span>
          </div>
        </div>

        {/* Issue 2 */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-[0_2px_10px_-3px_rgba(0,0,0,0.05)] space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-50 text-amber-600">
                METHODOLOGICAL ASSUMPTION
              </span>
              <span className="text-xs font-semibold text-slate-400">Section 3.1 Architecture</span>
            </div>
            <span className="text-xs font-bold text-slate-400">Review Risk: Moderate</span>
          </div>
          <h3 className="text-sm font-bold text-slate-900">
            Unverified Assumption on Quadratic Attention Memory
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            The computational complexity discussion assumes sequence lengths under 512 tokens. For document-level translation (&gt;2048 tokens), memory footprint scales quadratically O(N²), which causes out-of-memory faults on consumer GPUs.
          </p>
          <div className="rounded-xl bg-blue-50/70 p-3 text-xs text-blue-800 flex items-start gap-2">
            <Info className="h-4 w-4 text-blue-600 shrink-0 mt-0.5" />
            <span><strong>Suggested Defense:</strong> Propose flash-attention or sliding-window approximations for extended contexts.</span>
          </div>
        </div>

        {/* Issue 3 */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-[0_2px_10px_-3px_rgba(0,0,0,0.05)] space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-600">
                MINOR LIMITATION
              </span>
              <span className="text-xs font-semibold text-slate-400">Section 5 Hardware Setup</span>
            </div>
            <span className="text-xs font-bold text-slate-400">Review Risk: Low</span>
          </div>
          <h3 className="text-sm font-bold text-slate-900">
            Reproducibility Barrier Due to Proprietary Compute Budget
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Training the base model requires 8 x NVIDIA P100 GPUs for 3.5 days, which presents an empirical verification challenge for university labs with limited GPU access.
          </p>
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import { Lightbulb, CheckCircle2, ArrowRight, BookOpen, Cpu, Sparkles } from 'lucide-react';
import { PaperAnalysis } from '../../types';

interface ImprovementsViewProps {
  paper?: PaperAnalysis;
}

export const ImprovementsView: React.FC<ImprovementsViewProps> = ({ paper }) => {
  return (
    <div className="space-y-6 pb-12">
      <div>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2.5">
          <Lightbulb className="h-7 w-7 text-amber-500" />
          <span>Paper Improvements & Recommendations</span>
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Concrete methodological refinements to maximize publication acceptance and citation impact.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Track 1 */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-[0_2px_10px_-3px_rgba(0,0,0,0.05)] space-y-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
            <Cpu className="h-5 w-5" />
          </div>
          <h2 className="text-sm font-bold text-slate-900">
            Methodology & Optimization
          </h2>
          <ul className="space-y-2 text-xs text-slate-600">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
              <span>Integrate FlashAttention v2 to reduce memory complexity from O(N²) to linear tile execution.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
              <span>Apply LayerNorm before attention layers (Pre-LN) for smoother loss landscapes during warmup.</span>
            </li>
          </ul>
        </div>

        {/* Track 2 */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-[0_2px_10px_-3px_rgba(0,0,0,0.05)] space-y-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
            <BookOpen className="h-5 w-5" />
          </div>
          <h2 className="text-sm font-bold text-slate-900">
            Literature & Baselines
          </h2>
          <ul className="space-y-2 text-xs text-slate-600">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
              <span>Add citations and head-to-head BLEU tables vs ConvS2S (Gehring et al.) and GNMT.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
              <span>Include qualitative attention-weight heatmaps visualizing pronoun coreference resolution.</span>
            </li>
          </ul>
        </div>

        {/* Track 3 */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-[0_2px_10px_-3px_rgba(0,0,0,0.05)] space-y-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-500">
            <Sparkles className="h-5 w-5" />
          </div>
          <h2 className="text-sm font-bold text-slate-900">
            Ablation Rigor
          </h2>
          <ul className="space-y-2 text-xs text-slate-600">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
              <span>Report 5-seed mean and variance standard deviations rather than single best checkpoints.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
              <span>Conduct ablation testing varying head counts (4, 8, 16) with fixed total latent dimensions.</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

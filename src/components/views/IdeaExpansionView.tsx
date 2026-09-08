import React from 'react';
import { Brain, Sparkles, Compass, Lightbulb, ArrowUpRight } from 'lucide-react';
import { PaperAnalysis } from '../../types';

interface IdeaExpansionViewProps {
  paper?: PaperAnalysis;
}

export const IdeaExpansionView: React.FC<IdeaExpansionViewProps> = ({ paper }) => {
  return (
    <div className="space-y-6 pb-12">
      <div>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2.5">
          <Brain className="h-7 w-7 text-indigo-600" />
          <span>Idea Expansion & Novel Directions</span>
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Autonomous cross-pollination across neighboring domains to inspire high-impact follow-up manuscripts.
        </p>
      </div>

      <div className="space-y-4">
        {/* Idea 1 */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-[0_2px_10px_-3px_rgba(0,0,0,0.05)] space-y-3">
          <div className="flex items-center justify-between">
            <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-indigo-50 text-indigo-600">
              CROSS-DOMAIN EXTENSION • COMPUTER VISION
            </span>
            <span className="text-xs font-semibold text-emerald-600 flex items-center gap-1">
              <span>Novelty Potential: 92%</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </span>
          </div>
          <h2 className="text-base font-bold text-slate-900">
            Vision Transformers: Patch-Level Attention Without Convolutions
          </h2>
          <p className="text-xs text-slate-600 leading-relaxed">
            Slice 2D image grids into sequential 16x16 pixel patches with positional embeddings, processing visual tokens identically to linguistic words. Eliminates inductive bias for scalable pre-training on ImageNet-21k.
          </p>
        </div>

        {/* Idea 2 */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-[0_2px_10px_-3px_rgba(0,0,0,0.05)] space-y-3">
          <div className="flex items-center justify-between">
            <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-purple-50 text-purple-600">
              STRUCTURAL BIOLOGY • MOLECULAR DESIGN
            </span>
            <span className="text-xs font-semibold text-emerald-600 flex items-center gap-1">
              <span>Novelty Potential: 88%</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </span>
          </div>
          <h2 className="text-base font-bold text-slate-900">
            Residue-Pair Geometric Invariant Self-Attention for 3D Protein Folding
          </h2>
          <p className="text-xs text-slate-600 leading-relaxed">
            Adapt attention matrices to respect SE(3) Euclidean equivariance, predicting spatial contact distances between amino acids directly from raw MSA alignments without template homologies.
          </p>
        </div>

        {/* Idea 3 */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-[0_2px_10px_-3px_rgba(0,0,0,0.05)] space-y-3">
          <div className="flex items-center justify-between">
            <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-cyan-50 text-cyan-600">
              TIME-SERIES TELEMETRY • IOT & SMART GRIDS
            </span>
            <span className="text-xs font-semibold text-emerald-600 flex items-center gap-1">
              <span>Novelty Potential: 85%</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </span>
          </div>
          <h2 className="text-base font-bold text-slate-900">
            Continuous Multi-Scale Temporal Attention for High-Frequency Sensor Anomaly Detection
          </h2>
          <p className="text-xs text-slate-600 leading-relaxed">
            Replace fixed positional encoding with learnable Fourier phase embeddings to capture both sub-second jitter and multi-month seasonal cyclicities in industrial smart grids.
          </p>
        </div>
      </div>
    </div>
  );
};

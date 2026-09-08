import React from 'react';
import { BarChart2, TrendingUp, BookOpen, Award, Layers } from 'lucide-react';
import { PaperAnalysis } from '../../types';

interface InsightsViewProps {
  paper?: PaperAnalysis;
}

export const InsightsView: React.FC<InsightsViewProps> = () => {
  return (
    <div className="space-y-6 pb-12">
      <div>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2.5">
          <BarChart2 className="h-7 w-7 text-blue-600" />
          <span>Research Intelligence Insights</span>
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          High-level analytics across analyzed papers, research domain density, and citation trajectories.
        </p>
      </div>

      {/* 4 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-[0_2px_10px_-3px_rgba(0,0,0,0.05)]">
          <span className="text-xs font-semibold text-slate-500">Total Citations Indexed</span>
          <div className="text-3xl font-extrabold text-slate-900 mt-2">1,482</div>
          <span className="text-xs text-emerald-600 font-semibold mt-2 inline-block">↗ +18% MoM</span>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-[0_2px_10px_-3px_rgba(0,0,0,0.05)]">
          <span className="text-xs font-semibold text-slate-500">Average Novelty Score</span>
          <div className="text-3xl font-extrabold text-purple-600 mt-2">76.4%</div>
          <span className="text-xs text-slate-400 font-medium mt-2 inline-block">Across 12 papers</span>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-[0_2px_10px_-3px_rgba(0,0,0,0.05)]">
          <span className="text-xs font-semibold text-slate-500">Hypotheses Validated</span>
          <div className="text-3xl font-extrabold text-blue-600 mt-2">14</div>
          <span className="text-xs text-emerald-600 font-semibold mt-2 inline-block">4 pending experiment</span>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-[0_2px_10px_-3px_rgba(0,0,0,0.05)]">
          <span className="text-xs font-semibold text-slate-500">Domain Saturation</span>
          <div className="text-3xl font-extrabold text-amber-500 mt-2">62%</div>
          <span className="text-xs text-slate-400 font-medium mt-2 inline-block">High NLP density</span>
        </div>
      </div>

      {/* Domain Breakdown & Reading Progress */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-[0_2px_10px_-3px_rgba(0,0,0,0.05)] space-y-4">
          <h2 className="text-base font-bold text-slate-900 pb-3 border-b border-slate-100">
            Topic Distribution
          </h2>
          <div className="space-y-4">
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-semibold text-slate-700">
                <span>Natural Language Processing (Transformers)</span>
                <span>42%</span>
              </div>
              <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
                <div className="h-full bg-blue-600 rounded-full w-[42%]" />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-xs font-semibold text-slate-700">
                <span>Computer Vision (Diffusion & GANs)</span>
                <span>28%</span>
              </div>
              <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
                <div className="h-full bg-indigo-500 rounded-full w-[28%]" />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-xs font-semibold text-slate-700">
                <span>Reinforcement Learning & Robotics</span>
                <span>18%</span>
              </div>
              <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
                <div className="h-full bg-purple-500 rounded-full w-[18%]" />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-xs font-semibold text-slate-700">
                <span>Federated Systems & Security</span>
                <span>12%</span>
              </div>
              <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
                <div className="h-full bg-amber-500 rounded-full w-[12%]" />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-[0_2px_10px_-3px_rgba(0,0,0,0.05)] space-y-4">
          <h2 className="text-base font-bold text-slate-900 pb-3 border-b border-slate-100">
            Citation Impact Trajectory
          </h2>
          <div className="space-y-3 text-xs text-slate-600">
            <p className="leading-relaxed">
              Your uploaded research library has a projected 5-year citation trajectory in the <strong>top 10th percentile</strong> of NeurIPS and ACL published proceedings.
            </p>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/60 space-y-2">
              <div className="flex items-center justify-between font-semibold text-slate-800">
                <span>Primary Benchmark Reference:</span>
                <span className="text-blue-600 font-bold">Vaswani et al. (2017)</span>
              </div>
              <div className="flex items-center justify-between font-semibold text-slate-800">
                <span>Relative Citation Velocity:</span>
                <span className="text-emerald-600 font-bold">+14.2 citations/mo</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

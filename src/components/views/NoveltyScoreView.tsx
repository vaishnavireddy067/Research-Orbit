import React from 'react';
import { Sparkles } from 'lucide-react';
import { PaperAnalysis } from '../../types';

interface NoveltyScoreViewProps {
  paper?: PaperAnalysis;
  onExport?: () => void;
  onAnalyzeFull?: () => void;
}

export const NoveltyScoreView: React.FC<NoveltyScoreViewProps> = ({ paper }) => {
  return (
    <div className="space-y-6 pb-12">
      {/* Title */}
      <div className="flex items-center gap-2">
        <Sparkles className="h-6 w-6 text-purple-600" />
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
          Novelty & Innovation Score
        </h1>
      </div>

      {/* Top Card: 3 Circular Gauges */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-8 shadow-[0_2px_10px_-3px_rgba(0,0,0,0.05)]">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center items-center justify-center">
          
          {/* Gauge 1: 78% Novelty Score */}
          <div className="flex flex-col items-center">
            <div className="relative flex items-center justify-center h-32 w-32">
              <svg className="h-full w-full -rotate-90 transform" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  className="stroke-slate-100"
                  strokeWidth="8"
                  fill="transparent"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  className="stroke-blue-600"
                  strokeWidth="8"
                  strokeDasharray="251.2"
                  strokeDashoffset={251.2 * (1 - 0.78)}
                  strokeLinecap="round"
                  fill="transparent"
                />
              </svg>
              <div className="absolute text-2xl font-black text-slate-900">
                78%
              </div>
            </div>
            <span className="text-xs font-semibold text-slate-600 mt-3">
              Novelty Score
            </span>
          </div>

          {/* Gauge 2: 65% Innovation Rating */}
          <div className="flex flex-col items-center">
            <div className="relative flex items-center justify-center h-32 w-32">
              <svg className="h-full w-full -rotate-90 transform" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  className="stroke-slate-100"
                  strokeWidth="8"
                  fill="transparent"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  className="stroke-blue-600"
                  strokeWidth="8"
                  strokeDasharray="251.2"
                  strokeDashoffset={251.2 * (1 - 0.65)}
                  strokeLinecap="round"
                  fill="transparent"
                />
              </svg>
              <div className="absolute text-2xl font-black text-slate-900">
                65%
              </div>
            </div>
            <span className="text-xs font-semibold text-slate-600 mt-3">
              Innovation Rating
            </span>
          </div>

          {/* Gauge 3: 26% Similarity Index */}
          <div className="flex flex-col items-center">
            <div className="relative flex items-center justify-center h-32 w-32">
              <svg className="h-full w-full -rotate-90 transform" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  className="stroke-slate-100"
                  strokeWidth="8"
                  fill="transparent"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  className="stroke-blue-600"
                  strokeWidth="8"
                  strokeDasharray="251.2"
                  strokeDashoffset={251.2 * (1 - 0.26)}
                  strokeLinecap="round"
                  fill="transparent"
                />
              </svg>
              <div className="absolute text-2xl font-black text-slate-900">
                26%
              </div>
            </div>
            <span className="text-xs font-semibold text-slate-600 mt-3">
              Similarity Index
            </span>
          </div>

        </div>
      </div>

      {/* 4 Breakdown Sub-cards in 2x2 grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        
        {/* Card 1: Methodology Originality */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-[0_2px_10px_-3px_rgba(0,0,0,0.05)]">
          <span className="text-xs font-semibold text-slate-500">
            Methodology Originality
          </span>
          <div className="text-2xl font-extrabold text-slate-900 mt-1">
            High
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Novel combination of attention mechanisms
          </p>
        </div>

        {/* Card 2: Problem Framing */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-[0_2px_10px_-3px_rgba(0,0,0,0.05)]">
          <span className="text-xs font-semibold text-slate-500">
            Problem Framing
          </span>
          <div className="text-2xl font-extrabold text-slate-900 mt-1">
            Moderate
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Problem is well-known but approach is fresh
          </p>
        </div>

        {/* Card 3: Similar Papers Found */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-[0_2px_10px_-3px_rgba(0,0,0,0.05)]">
          <span className="text-xs font-semibold text-slate-500">
            Similar Papers Found
          </span>
          <div className="text-2xl font-extrabold text-slate-900 mt-1">
            12
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Based on semantic similarity search
          </p>
        </div>

        {/* Card 4: Closest Match */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-[0_2px_10px_-3px_rgba(0,0,0,0.05)]">
          <span className="text-xs font-semibold text-slate-500">
            Closest Match
          </span>
          <div className="text-2xl font-extrabold text-slate-900 mt-1">
            74%
          </div>
          <p className="text-xs text-slate-500 mt-1">
            "Attention Is All You Need" (Vaswani et al.)
          </p>
        </div>

      </div>
    </div>
  );
};

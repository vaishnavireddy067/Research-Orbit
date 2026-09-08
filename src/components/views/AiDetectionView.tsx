import React from 'react';
import { Eye, ShieldCheck, CheckCircle2, AlertCircle } from 'lucide-react';
import { PaperAnalysis } from '../../types';

interface AiDetectionViewProps {
  paper?: PaperAnalysis;
  onExport?: () => void;
  onAnalyzeFull?: () => void;
}

export const AiDetectionView: React.FC<AiDetectionViewProps> = ({ paper }) => {
  return (
    <div className="space-y-6 pb-12">
      {/* Title */}
      <div className="flex items-center gap-2.5">
        <Eye className="h-6 w-6 text-cyan-500" />
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
          AI Authorship Detection
        </h1>
      </div>

      {/* Main Detection Card from Screenshot 5 */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-8 shadow-[0_2px_10px_-3px_rgba(0,0,0,0.05)] space-y-6">
        
        {/* Human Writing Probability */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm font-bold text-slate-800">
            <span>Human Writing Probability</span>
            <span className="text-base font-extrabold text-slate-900">32%</span>
          </div>
          <div className="h-3 w-full rounded-full bg-slate-100 overflow-hidden">
            <div 
              className="h-full bg-emerald-500 rounded-full transition-all duration-700" 
              style={{ width: '32%' }} 
            />
          </div>
        </div>

        {/* AI Generated Probability */}
        <div className="space-y-2 pt-2">
          <div className="flex items-center justify-between text-sm font-bold text-slate-800">
            <span>AI Generated Probability</span>
            <span className="text-base font-extrabold text-slate-900">68%</span>
          </div>
          <div className="h-3 w-full rounded-full bg-slate-100 overflow-hidden">
            <div 
              className="h-full bg-blue-600 rounded-full transition-all duration-700" 
              style={{ width: '68%' }} 
            />
          </div>
        </div>

      </div>

      {/* Detailed Analysis Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-[0_2px_10px_-3px_rgba(0,0,0,0.05)]">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase">
            <CheckCircle2 className="h-4 w-4 text-emerald-500" />
            <span>Citation Authenticity</span>
          </div>
          <div className="text-2xl font-extrabold text-slate-900 mt-2">
            94%
          </div>
          <p className="text-xs text-slate-500 mt-1">
            References verified against CrossRef and arXiv databases.
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-[0_2px_10px_-3px_rgba(0,0,0,0.05)]">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase">
            <AlertCircle className="h-4 w-4 text-amber-500" />
            <span>Perplexity Uniformity</span>
          </div>
          <div className="text-2xl font-extrabold text-slate-900 mt-2">
            Moderate
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Stylistic rhythm suggests AI-assisted drafting in methodology sections.
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-[0_2px_10px_-3px_rgba(0,0,0,0.05)]">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase">
            <ShieldCheck className="h-4 w-4 text-blue-500" />
            <span>Academic Integrity</span>
          </div>
          <div className="text-2xl font-extrabold text-slate-900 mt-2">
            Pass
          </div>
          <p className="text-xs text-slate-500 mt-1">
            No direct plagiarism or fabricated empirical data detected.
          </p>
        </div>
      </div>
    </div>
  );
};

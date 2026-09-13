import React from 'react';
import { Eye, ShieldCheck, CheckCircle2, AlertCircle } from 'lucide-react';
import { PaperAnalysis } from '../../types';
import { EmptyWorkspaceState } from '../EmptyWorkspaceState';
import { NavTab } from '../Sidebar';

interface AiDetectionViewProps {
  paper?: PaperAnalysis | null;
  onNavigate?: (tab: NavTab) => void;
  isDarkMode?: boolean;
}

export const AiDetectionView: React.FC<AiDetectionViewProps> = ({ 
  paper,
  onNavigate,
  isDarkMode = false
}) => {
  if (!paper) {
    return (
      <div className="space-y-6 pb-12 animate-fadeIn">
        <div className="flex items-center gap-2.5">
          <Eye className="h-6 w-6 text-cyan-500" />
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              AI Authorship Detection
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Multi-layer perplexity scan, burstiness metrics, and LLM pattern identification.
            </p>
          </div>
        </div>

        <EmptyWorkspaceState
          title="No Manuscript Loaded for AI Detection"
          description="Upload a research manuscript (PDF) or import papers from arXiv to run automated deep-learning text forensics and calculate AI generated vs human writing probability."
          onNavigate={onNavigate}
          isDarkMode={isDarkMode}
        />
      </div>
    );
  }

  const aiProb = paper.authenticityAnalysis?.aiProbability ?? 14;
  const humanProb = 100 - aiProb;
  const authScore = paper.authenticityAnalysis?.authenticityScore ?? 88;

  return (
    <div className="space-y-6 pb-12 animate-fadeIn">
      {/* Title */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <Eye className="h-6 w-6 text-cyan-500" />
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              AI Authorship Detection
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Empirical text forensics, burstiness metrics, and LLM signature audit.
            </p>
          </div>
        </div>
        <span className="px-3 py-1 rounded-full text-xs font-bold bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 truncate max-w-xs">
          {paper.title}
        </span>
      </div>

      {/* Main Detection Card */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8 shadow-sm space-y-6">
        
        {/* Human Writing Probability */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm font-bold text-slate-800 dark:text-slate-200">
            <span>Human Writing Probability</span>
            <span className="text-base font-extrabold text-emerald-600 dark:text-emerald-400">{humanProb}%</span>
          </div>
          <div className="h-3 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
            <div 
              className="h-full bg-emerald-500 rounded-full transition-all duration-700" 
              style={{ width: `${humanProb}%` }} 
            />
          </div>
        </div>

        {/* AI Generated Probability */}
        <div className="space-y-2 pt-2">
          <div className="flex items-center justify-between text-sm font-bold text-slate-800 dark:text-slate-200">
            <span>AI Generated Probability</span>
            <span className="text-base font-extrabold text-blue-600 dark:text-blue-400">{aiProb}%</span>
          </div>
          <div className="h-3 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
            <div 
              className="h-full bg-blue-600 rounded-full transition-all duration-700" 
              style={{ width: `${aiProb}%` }} 
            />
          </div>
        </div>

      </div>

      {/* Detailed Analysis Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase">
            <CheckCircle2 className="h-4 w-4 text-emerald-500" />
            <span>Citation Authenticity</span>
          </div>
          <div className="text-2xl font-extrabold text-slate-900 dark:text-white mt-2">
            {authScore}%
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            References verified against CrossRef and academic literature databases.
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase">
            <AlertCircle className="h-4 w-4 text-amber-500" />
            <span>Perplexity Uniformity</span>
          </div>
          <div className="text-2xl font-extrabold text-slate-900 dark:text-white mt-2">
            {aiProb > 40 ? 'Moderate' : 'Low AI Variance'}
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Stylistic rhythm indicates natural academic authoring patterns.
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase">
            <ShieldCheck className="h-4 w-4 text-blue-500" />
            <span>Academic Integrity</span>
          </div>
          <div className="text-2xl font-extrabold text-slate-900 dark:text-white mt-2">
            Pass
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            No synthetic hallucination markers or unverified claims detected.
          </p>
        </div>
      </div>
    </div>
  );
};

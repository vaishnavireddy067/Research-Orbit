import React from 'react';
import { Upload, Search, FileText, Sparkles, ArrowRight } from 'lucide-react';
import { NavTab } from './Sidebar';

interface EmptyWorkspaceStateProps {
  title?: string;
  description?: string;
  onNavigate?: (tab: NavTab) => void;
  isDarkMode?: boolean;
  compact?: boolean;
}

export const EmptyWorkspaceState: React.FC<EmptyWorkspaceStateProps> = ({
  title = "No Document Loaded Yet",
  description = "Upload your research manuscript (PDF) or search academic papers on arXiv to extract AI insights, gap analyses, and novelty scores.",
  onNavigate,
  isDarkMode = true,
  compact = false,
}) => {
  return (
    <div
      className={`rounded-3xl border text-center flex flex-col items-center justify-center transition-all ${
        compact ? 'p-6 sm:p-8' : 'p-8 sm:p-12'
      } ${
        isDarkMode
          ? 'bg-[#0b1329] border-[#1b2b5a] text-white shadow-xl'
          : 'bg-white border-slate-200 text-slate-900 shadow-md'
      }`}
    >
      {/* Icon Badge */}
      <div className="relative mb-4">
        <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-blue-600/20 via-indigo-600/20 to-purple-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400 shadow-lg">
          <FileText className="w-8 h-8" />
        </div>
        <div className="absolute -bottom-1 -right-1 p-1.5 rounded-xl bg-blue-600 text-white shadow-md">
          <Sparkles className="w-3.5 h-3.5" />
        </div>
      </div>

      {/* Text Info */}
      <h3 className={`text-lg sm:text-xl font-bold tracking-tight max-w-md ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
        {title}
      </h3>
      <p className={`text-xs sm:text-sm mt-2 max-w-lg leading-relaxed ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
        {description}
      </p>

      {/* Action Buttons */}
      {onNavigate && (
        <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
          <button
            onClick={() => onNavigate('upload')}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-bold transition-all shadow-lg shadow-blue-600/25 active:scale-95 cursor-pointer"
          >
            <Upload className="w-4 h-4" />
            <span>Upload Research Manuscript (PDF)</span>
          </button>

          <button
            onClick={() => onNavigate('discover')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
              isDarkMode
                ? 'bg-[#111c40] border-[#1e2e60] text-slate-300 hover:text-white hover:border-blue-500/50'
                : 'bg-slate-50 border-slate-200 text-slate-700 hover:text-blue-600 hover:border-blue-300'
            }`}
          >
            <Search className="w-3.5 h-3.5 text-blue-400" />
            <span>Search arXiv Papers</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </div>
  );
};

import React, { useState } from 'react';
import { Search, Filter, FileText, CheckCircle2, Clock, AlertTriangle, MoreHorizontal, Sparkles } from 'lucide-react';
import { PaperAnalysis } from '../../types';

interface MyPapersViewProps {
  papers: PaperAnalysis[];
  onSelectPaper: (paper: PaperAnalysis) => void;
  onOpenAnalysis?: (paper: PaperAnalysis) => void;
}

export const MyPapersView: React.FC<MyPapersViewProps> = ({
  papers,
  onSelectPaper,
  onOpenAnalysis,
}) => {
  const [searchFilter, setSearchFilter] = useState('');

  const displayPapers = [
    {
      id: 101,
      title: 'Real-Time IoT Flood Prediction via Edge Graph Convolutional Networks',
      topic: 'Hydrology & Edge AI',
      date: 'Mar 2, 2026',
      status: 'Analyzed',
      statusColor: 'emerald',
    },
    {
      id: 102,
      title: 'Multimodal Sensor Fusion for River Basin Inundation Modeling',
      topic: 'Sensor Fusion',
      date: 'Mar 1, 2026',
      status: 'Processing',
      statusColor: 'blue',
    },
    {
      id: 103,
      title: 'Transformer Architecture in NLP & Representation Drift',
      topic: 'NLP',
      date: 'Feb 28, 2026',
      status: 'Analyzed',
      statusColor: 'emerald',
    },
    {
      id: 104,
      title: 'Reinforcement Learning in Robotics & Actuation Safety',
      topic: 'Robotics',
      date: 'Feb 27, 2026',
      status: 'Issues Found',
      statusColor: 'amber',
    },
    {
      id: 105,
      title: 'Benchmarking Deep Neural Operators for Catchment Forecasting',
      topic: 'Neural Operators',
      date: 'Feb 25, 2026',
      status: 'Analyzed',
      statusColor: 'emerald',
    },
  ];

  const filtered = displayPapers.filter((p) =>
    p.title.toLowerCase().includes(searchFilter.toLowerCase()) ||
    p.topic.toLowerCase().includes(searchFilter.toLowerCase())
  );

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-semibold text-blue-400 uppercase tracking-wider mb-1">
          <Sparkles className="w-4 h-4 text-blue-400" />
          Academic Repository & Vault
        </div>
        <h1 className="text-3xl font-black text-white tracking-tight">
          Research Library
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          {displayPapers.length} peer-reviewed papers indexed and synchronized across intelligence pipelines.
        </p>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-2.5 h-4 w-4 text-slate-400" />
          <input
            type="text"
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            placeholder="Search papers by title or domain..."
            className="w-full rounded-xl bg-[#131b2e] border border-slate-700/60 pl-10 pr-4 py-2.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all shadow-sm"
          />
        </div>

        <button className="flex items-center gap-2 rounded-xl bg-[#131b2e] border border-slate-700/60 px-4 py-2.5 text-xs font-semibold text-slate-300 hover:bg-slate-800 transition-colors cursor-pointer">
          <Filter className="h-3.5 w-3.5 text-slate-400" />
          <span>Filter</span>
        </button>
      </div>

      {/* Table Card */}
      <div className="bg-[#0f172a]/95 rounded-2xl border border-slate-800 shadow-xl shadow-black/20 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-[#0b1329] text-slate-400 font-bold uppercase text-[10px] tracking-wider border-b border-slate-800">
              <tr>
                <th className="py-3.5 px-5">Paper Title</th>
                <th className="py-3.5 px-4">Research Topic</th>
                <th className="py-3.5 px-4">Indexed Date</th>
                <th className="py-3.5 px-4">AI Audit Status</th>
                <th className="py-3.5 px-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-medium">
              {filtered.map((paper) => (
                <tr
                  key={paper.id}
                  onClick={() => onOpenAnalysis && onOpenAnalysis(paper as any)}
                  className="hover:bg-slate-800/40 transition-colors cursor-pointer group"
                >
                  <td className="py-4 px-5">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20 group-hover:scale-105 transition-transform shrink-0">
                        <FileText className="h-4 w-4" />
                      </div>
                      <span className="font-bold text-slate-200 group-hover:text-blue-400 transition-colors line-clamp-1">
                        {paper.title}
                      </span>
                    </div>
                  </td>

                  <td className="py-4 px-4 text-slate-400">
                    <span className="px-2.5 py-1 rounded-lg bg-slate-800 border border-slate-700/60 text-[11px] font-semibold text-slate-300">
                      {paper.topic}
                    </span>
                  </td>

                  <td className="py-4 px-4 text-slate-400 font-mono text-[11px]">
                    {paper.date}
                  </td>

                  <td className="py-4 px-4">
                    {paper.statusColor === 'emerald' && (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        <CheckCircle2 className="h-3 w-3" />
                        {paper.status}
                      </span>
                    )}
                    {paper.statusColor === 'blue' && (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold bg-blue-500/10 text-blue-400 border border-blue-500/20">
                        <Clock className="h-3 w-3 animate-spin" />
                        {paper.status}
                      </span>
                    )}
                    {paper.statusColor === 'amber' && (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20">
                        <AlertTriangle className="h-3 w-3" />
                        {paper.status}
                      </span>
                    )}
                  </td>

                  <td className="py-4 px-5 text-right">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpenAnalysis && onOpenAnalysis(paper as any);
                      }}
                      className="px-3 py-1.5 rounded-lg bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 border border-blue-500/30 text-xs font-semibold transition-all"
                    >
                      Inspect
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { 
  Search, 
  Trash2, 
  Download, 
  ExternalLink, 
  Volume2, 
  Printer, 
  MessageSquareText, 
  Flame, 
  Award, 
  Calendar, 
  FileText,
  Filter,
  Sparkles
} from 'lucide-react';
import { PaperAnalysis } from '../types';
import { api } from '../services/api';

interface LibraryViewProps {
  papers: PaperAnalysis[];
  onSelectPaper: (paper: PaperAnalysis) => void;
  onPaperDeleted: (paperId: number) => void;
  onOpenAudioForPaper: (paper: PaperAnalysis) => void;
  onOpenDossierForPaper: (paper: PaperAnalysis) => void;
  onOpenChatForPaper: (paper: PaperAnalysis) => void;
}

export const LibraryView: React.FC<LibraryViewProps> = ({
  papers,
  onSelectPaper,
  onPaperDeleted,
  onOpenAudioForPaper,
  onOpenDossierForPaper,
  onOpenChatForPaper,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDomain, setSelectedDomain] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'newest' | 'impact' | 'novelty'>('newest');
  const [isDeleting, setIsDeleting] = useState<number | null>(null);

  // Extract unique domains
  const domains = ['All', ...Array.from(new Set(papers.map((p) => p.domain || 'General')))];

  const filteredPapers = papers
    .filter((p) => {
      const matchesSearch =
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.authors.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.filename.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.summary.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesDomain = selectedDomain === 'All' || (p.domain || 'General') === selectedDomain;
      return matchesSearch && matchesDomain;
    })
    .sort((a, b) => {
      if (sortBy === 'impact') {
        return (b.impactScore || 0) - (a.impactScore || 0);
      }
      if (sortBy === 'novelty') {
        return (b.noveltyScore || 0) - (a.noveltyScore || 0);
      }
      // default newest by id or created_at
      return b.id - a.id;
    });

  const handleDelete = async (paperId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!confirm('Are you sure you want to delete this research paper analysis?')) return;

    setIsDeleting(paperId);
    try {
      await api.deletePaper(paperId);
      onPaperDeleted(paperId);
    } catch (err: any) {
      alert('Failed to delete paper: ' + err.message);
    } finally {
      setIsDeleting(null);
    }
  };

  const handleDownload = async (paper: PaperAnalysis, e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await api.downloadImprovedPaper(paper.id, paper.filename);
    } catch (err: any) {
      alert('Download error: ' + err.message);
    }
  };

  return (
    <div className="space-y-6 pb-16">
      
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-black text-white flex items-center gap-2">
            Research Library
            <span className="rounded-full bg-indigo-500/20 px-2.5 py-0.5 text-xs font-semibold text-indigo-400">
              {papers.length} Analyzed Papers
            </span>
          </h2>
          <p className="text-xs text-slate-400">
            Secure history of your synthesized research dossiers, knowledge nodes, and risk audits.
          </p>
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search papers, authors, topics..."
            className="w-full rounded-xl bg-slate-900 border border-slate-800 pl-9 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
          />
        </div>
      </div>

      {/* Filter Chips & Sorting */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-y border-slate-800/80 py-3">
        {/* Domain Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-xs text-slate-500 font-medium mr-1 flex items-center gap-1">
            <Filter className="h-3 w-3" />
            Domain:
          </span>
          {domains.map((dom) => (
            <button
              key={dom}
              onClick={() => setSelectedDomain(dom)}
              className={`rounded-lg px-2.5 py-1 text-xs font-medium transition-all ${
                selectedDomain === dom
                  ? 'bg-indigo-600 text-white'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {dom}
            </button>
          ))}
        </div>

        {/* Sort Controls */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-500 font-medium">Sort by:</span>
          <select
            value={sortBy}
            onChange={(e: any) => setSortBy(e.target.value)}
            className="rounded-lg bg-slate-900 border border-slate-800 px-2.5 py-1 text-xs text-slate-300 focus:outline-none"
          >
            <option value="newest">Most Recent</option>
            <option value="impact">Highest Impact Score</option>
            <option value="novelty">Highest Novelty Rating</option>
          </select>
        </div>
      </div>

      {/* Papers Grid */}
      {filteredPapers.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-slate-800 bg-slate-950/40 p-12 text-center">
          <FileText className="mx-auto h-12 w-12 text-slate-600 mb-3" />
          <h4 className="text-sm font-bold text-white">No research papers found</h4>
          <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
            {papers.length === 0
              ? 'Your research library is empty. Upload your first paper in the Analysis Hub!'
              : 'No papers match your search criteria. Try clearing the filter or search query.'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredPapers.map((paper) => (
            <div
              key={paper.id}
              onClick={() => onSelectPaper(paper)}
              className="group relative flex flex-col justify-between rounded-2xl border border-slate-800/80 bg-slate-950/80 p-5 backdrop-blur-xl transition-all hover:border-indigo-500/40 hover:bg-slate-900/60 hover:shadow-xl hover:shadow-indigo-500/5 cursor-pointer"
            >
              <div>
                {/* Top Badge Row */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="rounded-md bg-indigo-500/10 px-2 py-0.5 text-[10px] font-semibold text-indigo-400 border border-indigo-500/20 truncate">
                    {paper.domain || 'General'}
                  </span>
                  <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
                    <Calendar className="h-3 w-3" />
                    <span>{paper.year || paper.publication_year || '2024'}</span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-sm font-bold text-white group-hover:text-indigo-300 transition-colors line-clamp-2 leading-snug">
                  {paper.title}
                </h3>

                <p className="text-[11px] text-slate-400 mt-1 line-clamp-1">
                  By {paper.authors || 'Unknown'}
                </p>

                {/* Summary Preview */}
                <p className="text-xs text-slate-400 mt-3 line-clamp-3 leading-relaxed">
                  {paper.summary}
                </p>
              </div>

              {/* Metrics & Bottom Actions */}
              <div className="mt-5 pt-4 border-t border-slate-800/80">
                {/* Scores Row */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1.5 text-xs">
                    <Flame className="h-3.5 w-3.5 text-indigo-400" />
                    <span className="text-slate-400">Impact:</span>
                    <span className="font-bold text-indigo-400 font-mono">
                      {paper.impactScore?.toFixed(1) || '0.0'}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 text-xs">
                    <Award className="h-3.5 w-3.5 text-purple-400" />
                    <span className="text-slate-400">Novelty:</span>
                    <span className="font-bold text-purple-400 font-mono">
                      {paper.noveltyScore?.toFixed(1) || '0.0'}
                    </span>
                  </div>
                </div>

                {/* Action Buttons Toolbar */}
                <div className="flex items-center justify-between pt-1">
                  <div className="flex items-center gap-1">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpenAudioForPaper(paper);
                      }}
                      title="AI Audio Brief"
                      className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-purple-400 transition-colors"
                    >
                      <Volume2 className="h-4 w-4" />
                    </button>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpenDossierForPaper(paper);
                      }}
                      title="Intelligence Dossier"
                      className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-cyan-400 transition-colors"
                    >
                      <Printer className="h-4 w-4" />
                    </button>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpenChatForPaper(paper);
                      }}
                      title="Chat with Paper"
                      className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-indigo-400 transition-colors"
                    >
                      <MessageSquareText className="h-4 w-4" />
                    </button>

                    <button
                      onClick={(e) => handleDownload(paper, e)}
                      title="Download Improved Manuscript"
                      className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-slate-200 transition-colors"
                    >
                      <Download className="h-4 w-4" />
                    </button>
                  </div>

                  <button
                    onClick={(e) => handleDelete(paper.id, e)}
                    disabled={isDeleting === paper.id}
                    title="Delete paper analysis"
                    className="rounded-lg p-1.5 text-slate-500 hover:bg-rose-500/10 hover:text-rose-400 transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>

              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};

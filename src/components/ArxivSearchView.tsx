import React, { useState } from 'react';
import { Search, Globe, Sparkles, ExternalLink, ArrowRight, Loader2, BookOpen, Calendar, Users } from 'lucide-react';
import { ArxivPaper, PaperAnalysis } from '../types';
import { api } from '../services/api';

interface ArxivSearchViewProps {
  onPaperAnalyzed: (paper: PaperAnalysis) => void;
}

export const ArxivSearchView: React.FC<ArxivSearchViewProps> = ({ onPaperAnalyzed }) => {
  const [query, setQuery] = useState('Large Language Models Reasoning');
  const [papers, setPapers] = useState<ArxivPaper[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [analyzingId, setAnalyzingId] = useState<string | null>(null);

  const handleSearch = async (customQuery?: string) => {
    const q = customQuery || query;
    if (!q.trim()) return;

    setIsSearching(true);
    try {
      const results = await api.searchArxiv(q, 9);
      setPapers(results);
    } catch (err) {
      console.error('Search error:', err);
    } finally {
      setIsSearching(false);
    }
  };

  const handleImportAndAnalyze = async (paper: ArxivPaper) => {
    setAnalyzingId(paper.id);
    try {
      // Create a virtual file with title, authors, and abstract for the analysis engine
      const content = `Title: ${paper.title}\nAuthors: ${paper.authors.join(', ')}\nPublished: ${paper.published}\narXiv ID: ${paper.id}\n\nAbstract:\n${paper.summary}`;
      const blob = new Blob([content], { type: 'text/plain' });
      const file = new File([blob], `${paper.id.replace(/[^a-zA-Z0-9]/g, '_')}_arxiv.txt`, { type: 'text/plain' });

      const analyzed = await api.analyzePaper(file);
      onPaperAnalyzed(analyzed);
    } catch (err: any) {
      alert('Failed to analyze arXiv paper: ' + err.message);
    } finally {
      setAnalyzingId(null);
    }
  };

  const categories = [
    { label: 'AI Reasoning', query: 'Large Language Models Reasoning' },
    { label: 'Multimodal Vision', query: 'Multimodal Vision Language Models' },
    { label: 'Autonomous Agents', query: 'Autonomous LLM Agents' },
    { label: 'Reinforcement Learning', query: 'Deep Reinforcement Learning Alignment' },
    { label: 'Bioinformatics & Med', query: 'Deep Learning Genomics AlphaFold' },
  ];

  return (
    <div className="space-y-6 pb-16">
      
      {/* Header Banner */}
      <div className="rounded-3xl border border-slate-800 bg-gradient-to-r from-slate-950 via-indigo-950/30 to-slate-950 p-6 sm:p-8 backdrop-blur-xl">
        <div className="flex items-center gap-2 mb-2">
          <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-cyan-500/20 text-cyan-400">
            <Globe className="h-3.5 w-3.5" />
          </span>
          <span className="text-xs font-bold text-cyan-400 tracking-wider uppercase">
            Global Academic Repository
          </span>
        </div>

        <h2 className="text-2xl font-black text-white tracking-tight">
          Query 2.4M+ ArXiv Academic Research Papers
        </h2>
        <p className="text-xs text-slate-400 mt-1 max-w-2xl">
          Search the entire global scientific repository in real-time. Import any paper into your ResearchPilot laboratory with a single click to generate risk audits, novelty scores, and implementation roadmaps.
        </p>

        {/* Search Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSearch();
          }}
          className="mt-6 flex flex-col sm:flex-row gap-3 max-w-3xl"
        >
          <div className="relative flex-1">
            <Search className="absolute left-4 top-3.5 h-4 w-4 text-slate-500" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search topics, authors, concepts, or arXiv IDs..."
              className="w-full rounded-2xl bg-slate-900/90 border border-slate-700 pl-11 pr-4 py-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 shadow-inner"
            />
          </div>
          <button
            type="submit"
            disabled={isSearching}
            className="flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-600 to-indigo-600 px-6 py-3 text-xs font-bold text-white shadow-lg shadow-cyan-600/20 hover:scale-105 active:scale-95 disabled:opacity-50 transition-all"
          >
            {isSearching ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
            <span>Search ArXiv</span>
          </button>
        </form>

        {/* Quick Topics */}
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <span className="text-[11px] text-slate-500 font-medium">Trending Queries:</span>
          {categories.map((c, idx) => (
            <button
              key={idx}
              onClick={() => {
                setQuery(c.query);
                handleSearch(c.query);
              }}
              className="rounded-lg bg-slate-900/80 border border-slate-800 px-2.5 py-1 text-[11px] text-slate-400 hover:text-white hover:border-slate-700 transition-all"
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      {/* Results Grid */}
      {papers.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {papers.map((p) => (
            <div
              key={p.id}
              className="flex flex-col justify-between rounded-2xl border border-slate-800/80 bg-slate-950/80 p-5 backdrop-blur-xl transition-all hover:border-cyan-500/40 hover:shadow-xl"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex flex-wrap gap-1">
                    {p.categories?.slice(0, 2).map((cat, i) => (
                      <span
                        key={i}
                        className="rounded-md bg-cyan-500/10 px-2 py-0.5 text-[10px] font-mono text-cyan-400 border border-cyan-500/20"
                      >
                        {cat}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center gap-1 text-[11px] text-slate-500">
                    <Calendar className="h-3 w-3" />
                    <span>{p.published}</span>
                  </div>
                </div>

                <h3 className="text-sm font-bold text-white line-clamp-2 leading-snug">
                  {p.title}
                </h3>

                <div className="flex items-center gap-1 text-[11px] text-slate-400 mt-1.5">
                  <Users className="h-3 w-3 text-slate-500" />
                  <span className="truncate">{p.authors.join(', ')}</span>
                </div>

                <p className="text-xs text-slate-400 mt-3 line-clamp-4 leading-relaxed">
                  {p.summary}
                </p>
              </div>

              <div className="mt-5 pt-4 border-t border-slate-800/80 flex items-center justify-between gap-2">
                {p.pdfUrl ? (
                  <a
                    href={p.pdfUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-white transition-colors"
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                    <span>View PDF</span>
                  </a>
                ) : (
                  <span className="text-[11px] text-slate-500 font-mono">arXiv Ref</span>
                )}

                <button
                  onClick={() => handleImportAndAnalyze(p)}
                  disabled={analyzingId === p.id}
                  className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-600 px-3 py-1.5 text-xs font-bold text-white shadow-md shadow-indigo-600/20 hover:scale-105 active:scale-95 disabled:opacity-50 transition-all"
                >
                  {analyzingId === p.id ? (
                    <>
                      <Loader2 className="h-3.5 w-3.5 animate-spin" />
                      <span>Synthesizing...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-3.5 w-3.5" />
                      <span>Analyze Paper</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-3xl border border-dashed border-slate-800 bg-slate-950/40 p-12 text-center">
          <BookOpen className="mx-auto h-12 w-12 text-slate-600 mb-3" />
          <h4 className="text-sm font-bold text-white">Discover Global Research</h4>
          <p className="text-xs text-slate-400 mt-1 max-w-md mx-auto">
            Type any query or select a trending topic above to fetch live scientific preprints from ArXiv.
          </p>
        </div>
      )}

    </div>
  );
};

import React, { useState } from 'react';
import { 
  Search, 
  Sparkles, 
  ExternalLink, 
  Plus, 
  Check, 
  UploadCloud, 
  SlidersHorizontal,
  Bookmark,
  Calendar,
  Layers,
  Award
} from 'lucide-react';
import { PaperAnalysis, ArxivPaper } from '../../types';

interface LiteratureDiscoveryViewProps {
  onImportPaper?: (paper: ArxivPaper) => void;
  activePaper?: PaperAnalysis | null;
}

const INITIAL_PAPERS: ArxivPaper[] = [
  {
    id: 'arxiv-2403.11294',
    title: 'Real-Time IoT Flood Prediction via Edge Graph Convolutional Networks and Hydro-Sensors',
    authors: ['Liang Chen', 'Sophia Martinez', 'Kavitha Ramanujan'],
    published: '2024-03-15',
    summary: 'A localized edge-inference graph architecture analyzing upstream water levels, rainfall precipitation gradients, and soil saturation to predict flash floods 4 hours in advance with 95.8% precision.',
    relevanceTier: 'Highly Relevant',
    citations: 42,
    dataset: 'NOAA HydroNet & Texas FlashFlood-2023',
    method: 'Spatiotemporal GCN + Kalman Filter',
    accuracy: '95.8% F1',
    pdfUrl: 'https://arxiv.org/abs/2403.11294'
  },
  {
    id: 'arxiv-2311.08412',
    title: 'Multimodal Sensor Fusion for River Basin Inundation Modeling under Extreme Rain Anomalies',
    authors: ['David O’Connor', 'Elena Petrova'],
    published: '2023-11-20',
    summary: 'Proposes multi-sensor telemetry integration combining optical satellite imagery with IoT river stage sensors, addressing temporal latency during flash flood occurrences.',
    relevanceTier: 'Highly Relevant',
    citations: 78,
    dataset: 'Sentinel-1 SAR + Global River Stream Gauges',
    method: 'Cross-Attention Transformer',
    accuracy: '94.2% F1',
    pdfUrl: 'https://arxiv.org/abs/2311.08412'
  },
  {
    id: 'arxiv-2307.05193',
    title: 'Benchmarking Deep Neural Operators for Physics-Informed Hydrological Discharge Forecasting',
    authors: ['Akira Tanaka', 'Marc Dubois'],
    published: '2023-07-12',
    summary: 'Compares Fourier Neural Operators (FNO) against LSTM baselines for continuous river discharge approximation across 12 diverse European river basins.',
    relevanceTier: 'Related',
    citations: 114,
    dataset: 'CAMELS Hydrology Benchmark (671 basins)',
    method: 'Physics-Informed Neural Operator (PINO)',
    accuracy: '92.1% NSE',
    pdfUrl: 'https://arxiv.org/abs/2307.05193'
  },
  {
    id: 'arxiv-2209.04301',
    title: 'Deep Recurrent Approaches for Runoff and Water Inundation: A Comprehensive Survey',
    authors: ['Fatima Al-Mansoor', 'John K. Vance'],
    published: '2022-09-08',
    summary: 'A foundational survey mapping deep learning architectures used in urban hydrology from 2015 to 2022, highlighting persistent data scarcity and sensor calibration issues.',
    relevanceTier: 'Background',
    citations: 285,
    dataset: 'USGS Water Services Historical 2010-2021',
    method: 'Comparative Survey (LSTM vs GRU vs CNN)',
    accuracy: 'Benchmark Synthesis',
    pdfUrl: 'https://arxiv.org/abs/2209.04301'
  },
  {
    id: 'arxiv-2105.10982',
    title: 'Statistical Downscaling of Global Precipitation Forecasts Using Classical Machine Learning',
    authors: ['Robert Hansen', 'Chloe Kim'],
    published: '2021-05-24',
    summary: 'Applies Random Forest and Gradient Boosted Trees for regional precipitation forecast downscaling, offering foundational meteorological context with minimal real-time telemetry.',
    relevanceTier: 'Low Relevance',
    citations: 64,
    dataset: 'ERA5 Reanalysis',
    method: 'XGBoost + Ridge Regression',
    accuracy: '88.4% R²',
    pdfUrl: 'https://arxiv.org/abs/2105.10982'
  }
];

export const LiteratureDiscoveryView: React.FC<LiteratureDiscoveryViewProps> = ({
  onImportPaper
}) => {
  const [query, setQuery] = useState('AI-based flood prediction using IoT');
  const [activeTier, setActiveTier] = useState<string>('All');
  const [papers, setPapers] = useState<ArxivPaper[]>(INITIAL_PAPERS);
  const [importedIds, setImportedIds] = useState<Record<string, boolean>>({});
  const [selectedYear, setSelectedYear] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'relevance' | 'citations' | 'recent'>('relevance');
  const [isSearching, setIsSearching] = useState(false);
  const [similarMode, setSimilarMode] = useState(false);

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!query.trim()) return;
    setIsSearching(true);
    setTimeout(() => {
      setIsSearching(false);
    }, 500);
  };

  const handleImport = (p: ArxivPaper) => {
    setImportedIds(prev => ({ ...prev, [p.id]: true }));
    if (onImportPaper) {
      onImportPaper(p);
    }
  };

  const filteredPapers = papers.filter(p => {
    if (activeTier !== 'All' && p.relevanceTier !== activeTier) return false;
    if (selectedYear !== 'All') {
      const year = p.published.substring(0, 4);
      if (year !== selectedYear) return false;
    }
    return true;
  }).sort((a, b) => {
    if (sortBy === 'citations') return (b.citations || 0) - (a.citations || 0);
    if (sortBy === 'recent') return b.published.localeCompare(a.published);
    return 0;
  });

  const getTierBadge = (tier?: string) => {
    switch (tier) {
      case 'Highly Relevant':
        return 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30';
      case 'Related':
        return 'bg-blue-500/15 text-blue-300 border-blue-500/30';
      case 'Background':
        return 'bg-amber-500/15 text-amber-300 border-amber-500/30';
      default:
        return 'bg-slate-800 text-slate-400 border-slate-700';
    }
  };

  return (
    <div className="space-y-6 font-sans text-slate-100 pb-12">
      {/* Header */}
      <div className="rounded-3xl bg-[#0d1633] border border-[#1b2b5a] p-6 sm:p-7 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-blue-400 uppercase tracking-wider mb-1">
            <Sparkles className="w-4 h-4 text-blue-400" />
            2.4M+ Academic Nodes • ArXiv Deep Semantic Index
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            AI Literature Discovery Engine
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Query academic preprints, classify by relevance tiers, inspect extracted datasets & methods, or synthesize similar papers.
          </p>
        </div>

        <button
          onClick={() => setSimilarMode(!similarMode)}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all border cursor-pointer ${
            similarMode 
              ? 'bg-purple-600/30 text-purple-300 border-purple-400/50 shadow-sm' 
              : 'bg-[#121d42] text-slate-300 border-[#20326b] hover:bg-[#18285c]'
          }`}
        >
          <UploadCloud className="w-4 h-4 text-purple-400" />
          Find Papers Similar to Upload
        </button>
      </div>

      {/* Similar Upload Dropzone Drawer if active */}
      {similarMode && (
        <div className="bg-purple-950/40 border border-dashed border-purple-500/40 rounded-3xl p-6 text-center animate-in fade-in duration-300 shadow-xl">
          <UploadCloud className="w-8 h-8 text-purple-400 mx-auto mb-2" />
          <h4 className="text-sm font-bold text-white">Drop a Seed Paper (PDF / Abstract)</h4>
          <p className="text-xs text-purple-300/80 max-w-md mx-auto mt-1 mb-4">
            ResearchPilot extracts embedding vectors, key citation rings, and dataset signatures to automatically discover connected research clusters.
          </p>
          <div className="flex justify-center gap-3">
            <button 
              onClick={() => {
                setQuery('IoT sensor hydrology flash flood GCN');
                setSimilarMode(false);
                handleSearch();
              }}
              className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold rounded-xl shadow-sm cursor-pointer"
            >
              Use Sample: "Real-Time Hydrology Edge.pdf"
            </button>
            <button 
              onClick={() => setSimilarMode(false)}
              className="px-4 py-2 bg-[#121d42] text-slate-300 border border-[#20326b] text-xs font-semibold rounded-xl cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Search Bar & Filters */}
      <div className="rounded-3xl bg-[#0d1633] border border-[#1b2b5a] p-6 shadow-xl space-y-4">
        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search topic, author, methodology (e.g. AI-based flood prediction using IoT)..."
              className="w-full pl-10 pr-4 py-3 bg-[#0e1838] border border-[#1e2d5a] rounded-xl text-xs font-medium text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30 transition-all"
            />
          </div>
          <button
            type="submit"
            disabled={isSearching}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-blue-500/25 transition-all shrink-0 cursor-pointer"
          >
            {isSearching ? (
              <>
                <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Searching...</span>
              </>
            ) : (
              <>
                <Search className="w-4 h-4" />
                <span>Query ArXiv</span>
              </>
            )}
          </button>
        </form>

        {/* Filters and Classifications */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[#1b2b5a]">
          {/* Classification Tiers */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mr-1 flex items-center gap-1">
              <Layers className="w-3 h-3" /> Tier:
            </span>
            {['All', 'Highly Relevant', 'Related', 'Background', 'Low Relevance'].map(tier => (
              <button
                key={tier}
                onClick={() => setActiveTier(tier)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  activeTier === tier
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-[#111c40] text-slate-300 hover:bg-[#162552] border border-[#1e2e60]'
                }`}
              >
                {tier}
              </button>
            ))}
          </div>

          {/* Year & Sort Controls */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 text-xs text-slate-400">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              <span>Year:</span>
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="bg-[#0e1838] border border-[#1e2d5a] rounded-lg px-2.5 py-1 text-xs font-semibold text-slate-200 focus:outline-none"
              >
                <option value="All">All Years</option>
                <option value="2024">2024</option>
                <option value="2023">2023</option>
                <option value="2022">2022</option>
                <option value="2021">2021</option>
              </select>
            </div>

            <div className="flex items-center gap-1.5 text-xs text-slate-400">
              <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400" />
              <span>Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-[#0e1838] border border-[#1e2d5a] rounded-lg px-2.5 py-1 text-xs font-semibold text-slate-200 focus:outline-none"
              >
                <option value="relevance">Relevance</option>
                <option value="citations">Most Cited</option>
                <option value="recent">Latest Date</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between text-xs text-slate-400 px-1">
        <span>
          Showing <strong className="text-white">{filteredPapers.length}</strong> academic nodes for <span className="italic text-blue-400">"{query}"</span>
        </span>
        <span className="text-[11px] bg-[#111c40] border border-[#1e2e60] px-2.5 py-0.5 rounded text-slate-300">
          Source: ArXiv Academic Index
        </span>
      </div>

      {/* Paper Results Cards */}
      <div className="space-y-4">
        {filteredPapers.map((paper) => {
          const isImported = importedIds[paper.id];
          return (
            <div
              key={paper.id}
              className="rounded-3xl bg-[#0d1633] border border-[#1b2b5a] p-6 hover:border-blue-500/50 hover:shadow-xl transition-all space-y-4 group shadow-lg"
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${getTierBadge(paper.relevanceTier)}`}>
                      {paper.relevanceTier}
                    </span>
                    <span className="text-[11px] text-slate-400 font-mono">
                      {paper.id}
                    </span>
                    <span className="text-[11px] text-slate-500 font-medium">
                      • Published {paper.published}
                    </span>
                    {paper.citations && (
                      <span className="flex items-center gap-1 text-[11px] text-amber-400 font-semibold bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                        <Award className="w-3 h-3" /> {paper.citations} citations
                      </span>
                    )}
                  </div>
                  <h3 className="text-base font-bold text-white group-hover:text-blue-400 transition-colors leading-snug">
                    {paper.title}
                  </h3>
                  <p className="text-xs text-slate-400">
                    {paper.authors.join(', ')}
                  </p>
                </div>

                {/* Import / Action button */}
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => handleImport(paper)}
                    disabled={isImported}
                    className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all border cursor-pointer ${
                      isImported
                        ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30 cursor-default'
                        : 'bg-blue-600/20 text-blue-300 border-blue-500/30 hover:bg-blue-600 hover:text-white'
                    }`}
                  >
                    {isImported ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>In Pipeline</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-3.5 h-3.5" />
                        <span>Import to Pipeline</span>
                      </>
                    )}
                  </button>

                  {paper.pdfUrl && (
                    <a
                      href={paper.pdfUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="p-2 text-slate-400 hover:text-white bg-[#111c40] hover:bg-[#162554] rounded-xl border border-[#1e2e60] transition-all"
                      title="View ArXiv Preprint"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>

              {/* Summary */}
              <p className="text-xs text-slate-300 leading-relaxed bg-[#0a1128] p-3.5 rounded-2xl border border-[#162347]">
                {paper.summary}
              </p>

              {/* Extracted Structured Metadata Matrix */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1 text-[11px]">
                <div className="bg-[#111c40] p-3 rounded-xl border border-[#1e2e60]">
                  <span className="font-semibold text-slate-400 block uppercase text-[9px] tracking-wider mb-0.5">
                    Dataset Used
                  </span>
                  <span className="font-bold text-white">
                    {paper.dataset || 'Custom Empirical Dataset'}
                  </span>
                </div>

                <div className="bg-[#111c40] p-3 rounded-xl border border-[#1e2e60]">
                  <span className="font-semibold text-slate-400 block uppercase text-[9px] tracking-wider mb-0.5">
                    Method / Architecture
                  </span>
                  <span className="font-bold text-blue-400">
                    {paper.method || 'Deep Learning Baseline'}
                  </span>
                </div>

                <div className="bg-[#111c40] p-3 rounded-xl border border-[#1e2e60]">
                  <span className="font-semibold text-slate-400 block uppercase text-[9px] tracking-wider mb-0.5">
                    Performance Metric
                  </span>
                  <span className="font-bold text-emerald-400">
                    {paper.accuracy || '90%+ Verification'}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

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
  Award,
  Bell,
  Radio,
  TrendingUp,
  CheckCircle2,
  Tag,
  Flame,
  GitMerge,
  Filter
} from 'lucide-react';
import { PaperAnalysis, ArxivPaper } from '../../types';

interface LiteratureDiscoveryViewProps {
  onImportPaper?: (paper: ArxivPaper) => void;
  onEvolvePaper?: (paper: ArxivPaper) => void;
  activePaper?: PaperAnalysis | null;
}

interface AlertTopic {
  id: string;
  query: string;
  domain: string;
  frequency: string;
  matchedCount: number;
  active: boolean;
  latestPaperTitle: string;
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

const INITIAL_ALERTS: AlertTopic[] = [
  {
    id: 'alt-1',
    query: 'Computer Vision + Medical Histopathology Diagnostics',
    domain: 'Healthcare AI',
    frequency: 'Daily Digest',
    matchedCount: 22,
    active: true,
    latestPaperTitle: 'Zero-Shot Foundation Models for Whole-Slide Gigapixel Pathology Screening'
  },
  {
    id: 'alt-2',
    query: 'Edge GNNs + Real-Time Flood Inundation Telemetry',
    domain: 'Hydrology & Edge AI',
    frequency: 'Weekly Digest',
    matchedCount: 14,
    active: true,
    latestPaperTitle: 'Physics-Informed Graph Neural Operators on Low-Power LoRaWAN River Sensors'
  },
  {
    id: 'alt-3',
    query: 'Deep Survival Analysis + University Student Dropout Prevention',
    domain: 'Educational Data Mining',
    frequency: 'Weekly Digest',
    matchedCount: 5,
    active: true,
    latestPaperTitle: 'Longitudinal LMS Clickstream Survival Ensembles for Early Semester Warning'
  }
];

const generateResultsForQuery = (searchQuery: string): ArxivPaper[] => {
  const cleanQ = searchQuery.trim() || 'Artificial Intelligence';
  return [
    {
      id: `arxiv-2501.${Math.floor(10000 + Math.random() * 90000)}`,
      title: `Advances in ${cleanQ}: Architectures, Empirical Benchmarks, and Open Frontiers`,
      authors: ['Alex Rivera', 'Elena Martinez', 'David Chen et al.'],
      published: '2025-01-14',
      summary: `A comprehensive empirical investigation of foundational representations in ${cleanQ}. We propose an adaptive optimization framework demonstrating superior benchmark convergence and out-of-distribution robustness.`,
      relevanceTier: 'Highly Relevant',
      citations: 34,
      dataset: 'Standard Public Academic Benchmarks',
      method: 'Adaptive Representation Network',
      accuracy: '96.2% F1',
      pdfUrl: 'https://arxiv.org/abs/2501.00001'
    },
    {
      id: `arxiv-2411.${Math.floor(10000 + Math.random() * 90000)}`,
      title: `Scalable and Efficient Formulations for ${cleanQ} Under Resource Constraints`,
      authors: ['Sophia Wang', 'Kenji Tanaka'],
      published: '2024-11-20',
      summary: `Investigates model compression and integer quantization techniques for ${cleanQ}, reducing memory consumption while maintaining competitive empirical accuracy.`,
      relevanceTier: 'Highly Relevant',
      citations: 58,
      dataset: 'Open-Source Domain Corpora',
      method: 'Quantized Latent Operator',
      accuracy: '94.8% F1',
      pdfUrl: 'https://arxiv.org/abs/2411.00002'
    },
    {
      id: `arxiv-2408.${Math.floor(10000 + Math.random() * 90000)}`,
      title: `Stress-Testing Generalization and Distribution Shifts in ${cleanQ}`,
      authors: ['Marcus Vance', 'Fatima Al-Mansoor'],
      published: '2024-08-05',
      summary: `Analyzes failure scenarios and adversarial vulnerabilities in contemporary approaches to ${cleanQ}, introducing a regularized loss objective that guarantees stability.`,
      relevanceTier: 'Related',
      citations: 82,
      dataset: 'Cross-Domain Shift Testbed',
      method: 'Invariant Regularized Objective',
      accuracy: '92.4% Metric',
      pdfUrl: 'https://arxiv.org/abs/2408.00003'
    },
    {
      id: `arxiv-2404.${Math.floor(10000 + Math.random() * 90000)}`,
      title: `A Systematic Review of Methodologies and Gaps in ${cleanQ}`,
      authors: ['Priya Ramanujan', 'Robert Hansen'],
      published: '2024-04-12',
      summary: `Surveys over 40 recent peer-reviewed studies in ${cleanQ}, categorizing architectural paradigms and identifying critical unaddressed research white spaces.`,
      relevanceTier: 'Background',
      citations: 146,
      dataset: 'Curated Academic Survey Matrix',
      method: 'Meta-Analysis & Taxonomy',
      accuracy: 'Systematic Synthesis',
      pdfUrl: 'https://arxiv.org/abs/2404.00004'
    }
  ];
};

export const LiteratureDiscoveryView: React.FC<LiteratureDiscoveryViewProps> = ({
  onImportPaper,
  onEvolvePaper
}) => {
  const [activeTab, setActiveTab] = useState<'search' | 'alerts' | 'trending'>('search');
  const [query, setQuery] = useState('');
  const [activeTier, setActiveTier] = useState<string>('All');
  const [papers, setPapers] = useState<ArxivPaper[]>([]);
  const [alerts, setAlerts] = useState<AlertTopic[]>(INITIAL_ALERTS);
  const [newAlertQuery, setNewAlertQuery] = useState('');
  const [newAlertDomain, setNewAlertDomain] = useState('Computer Science');
  const [importedIds, setImportedIds] = useState<Record<string, boolean>>({});
  const [selectedYear, setSelectedYear] = useState<string>('All');
  const [selectedDomain, setSelectedDomain] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'relevance' | 'citations' | 'recent' | 'growth'>('recent');
  const [isSearching, setIsSearching] = useState(false);
  const [similarMode, setSimilarMode] = useState(false);

  const handleTriggerSearch = (searchTopic: string) => {
    if (!searchTopic.trim()) return;
    setIsSearching(true);
    setTimeout(() => {
      setPapers(generateResultsForQuery(searchTopic));
      setIsSearching(false);
    }, 450);
  };

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!query.trim()) return;
    handleTriggerSearch(query);
  };

  const handleImport = (p: ArxivPaper) => {
    setImportedIds(prev => ({ ...prev, [p.id]: true }));
    if (onImportPaper) {
      onImportPaper(p);
    }
  };

  const handleAddAlert = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAlertQuery.trim()) return;
    const newAlt: AlertTopic = {
      id: `alt-${Date.now()}`,
      query: newAlertQuery,
      domain: newAlertDomain,
      frequency: 'Daily Digest',
      matchedCount: Math.floor(Math.random() * 10) + 1,
      active: true,
      latestPaperTitle: `Recent Advances in ${newAlertQuery} (2026)`
    };
    setAlerts([newAlt, ...alerts]);
    setNewAlertQuery('');
  };

  const toggleAlert = (id: string) => {
    setAlerts(alerts.map(a => a.id === id ? { ...a, active: !a.active } : a));
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
    if (sortBy === 'growth') return (b.citations || 0) * 1.5 - (a.citations || 0);
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
            Query academic preprints, monitor keyword alerts, and discover recommended research literature.
          </p>
        </div>

        {/* Mode Switcher Tabs */}
        <div className="flex items-center gap-2 bg-[#090f28] p-1.5 rounded-2xl border border-[#1b2b5a]">
          <button
            onClick={() => setActiveTab('search')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'search'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Search className="w-3.5 h-3.5" />
            <span>Search Literature</span>
          </button>
          <button
            onClick={() => setActiveTab('alerts')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'alerts'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Bell className="w-3.5 h-3.5 text-amber-400" />
            <span>Research Alerts ({alerts.filter(a => a.active).length})</span>
          </button>
          <button
            onClick={() => setActiveTab('trending')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'trending'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
            <span>Trending</span>
          </button>
        </div>
      </div>

      {activeTab === 'search' ? (
        <>
          {/* 🔥 Latest Research Recency Ticker */}
          <div className="p-3.5 rounded-2xl bg-[#091129] border border-[#1a2b58] flex flex-col sm:flex-row sm:items-center gap-3">
            <div className="flex items-center gap-1.5 shrink-0">
              <Flame className="w-4 h-4 text-rose-500 animate-pulse" />
              <span className="text-[11px] font-black uppercase tracking-wider text-rose-400">
                Latest Research:
              </span>
            </div>
            <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
              {[
                { tag: 'AI Agents', recency: '2 days ago', query: 'Autonomous AI Agents LLM Reasoning' },
                { tag: 'Multimodal AI', recency: '4 days ago', query: 'Multimodal Vision-Language Models' },
                { tag: 'RAG Systems', recency: '5 days ago', query: 'Retrieval Augmented Generation Vector DB' },
                { tag: 'Medical AI', recency: '1 week ago', query: 'Vision-Language Models for Medical Image Diagnosis' },
                { tag: 'Computer Vision', recency: '1 week ago', query: 'State-Space Vision Transformers Mamba' },
              ].map((chip, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    setQuery(chip.query);
                    setSelectedDomain(chip.tag.includes('Medical') ? 'Healthcare' : 'AI');
                  }}
                  className="px-2.5 py-1 rounded-xl bg-slate-800/80 hover:bg-indigo-900/40 text-slate-300 hover:text-indigo-200 border border-slate-700/60 hover:border-indigo-500/40 text-[11px] font-medium whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 shrink-0"
                >
                  <span className="font-bold">{chip.tag}</span>
                  <span className="text-[10px] text-slate-400">({chip.recency})</span>
                </button>
              ))}
            </div>
          </div>

          {/* Search Form */}
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search literature by topic, keywords, or authors..."
                className="w-full pl-9 pr-4 py-2.5 rounded-xl text-xs bg-[#0d1633] border border-[#1b2b5a] text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-lg shadow-blue-600/30 cursor-pointer"
            >
              Search
            </button>
          </form>

          {/* Multi-Dimensional Filters Bar */}
          <div className="p-3.5 rounded-2xl bg-[#091129] border border-[#1b2b5a] space-y-2.5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              {/* Published Year Filter */}
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold text-slate-400">Published:</span>
                <div className="flex items-center gap-1">
                  {['All', '2026', '2025', '2024'].map((yr) => (
                    <button
                      key={yr}
                      onClick={() => setSelectedYear(yr)}
                      className={`px-2.5 py-0.5 rounded-lg text-[11px] font-bold transition-colors cursor-pointer ${
                        selectedYear === yr
                          ? 'bg-blue-600 text-white shadow-xs'
                          : 'bg-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      {yr}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sort Order */}
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold text-slate-400">Sort:</span>
                <div className="flex items-center gap-1">
                  {[
                    { id: 'recent', label: 'Newest' },
                    { id: 'citations', label: 'Most Cited' },
                    { id: 'relevance', label: 'Most Relevant' },
                    { id: 'growth', label: 'Fastest Growing' }
                  ].map((s) => (
                    <button
                      key={s.id}
                      onClick={() => setSortBy(s.id as any)}
                      className={`px-2.5 py-0.5 rounded-lg text-[11px] font-bold transition-colors cursor-pointer ${
                        sortBy === s.id
                          ? 'bg-indigo-600 text-white shadow-xs'
                          : 'bg-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Domains Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pt-1 border-t border-slate-800 scrollbar-none">
              <span className="text-[11px] font-bold text-slate-400 shrink-0">Domain:</span>
              {['All', 'AI', 'ML', 'NLP', 'Computer Vision', 'Healthcare', 'Cybersecurity', 'Data Science'].map((dm) => (
                <button
                  key={dm}
                  onClick={() => setSelectedDomain(dm)}
                  className={`px-2.5 py-0.5 rounded-lg text-[11px] font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                    selectedDomain === dm
                      ? 'bg-purple-600 text-white'
                      : 'bg-slate-800/80 text-slate-400 hover:text-white'
                  }`}
                >
                  {dm}
                </button>
              ))}
            </div>
          </div>

          {/* Paper list */}
          <div className="space-y-4">
            {filteredPapers.length === 0 ? (
              <div className="p-10 sm:p-12 rounded-3xl bg-[#0d1633] border border-[#1b2b5a] text-center space-y-4">
                <div className="w-16 h-16 rounded-3xl bg-blue-600/10 border border-blue-500/20 text-blue-400 flex items-center justify-center mx-auto shadow-lg">
                  <Search className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">
                    Explore Academic Research on arXiv
                  </h3>
                  <p className="text-xs text-slate-400 mt-1 max-w-md mx-auto leading-relaxed">
                    Type a research keyword, methodology, or topic above — or click one of the suggested topics below to discover literature.
                  </p>
                </div>

                {/* Suggested Search Prompts */}
                <div className="flex items-center justify-center gap-2 flex-wrap max-w-xl mx-auto pt-2">
                  {[
                    'Attention & Transformer Models',
                    'Graph Neural Networks',
                    'Multimodal Vision-Language AI',
                    'Medical Imaging Diagnostics',
                    'Autonomous AI Agents',
                    'Reinforcement Learning'
                  ].map((topic) => (
                    <button
                      key={topic}
                      type="button"
                      onClick={() => {
                        setQuery(topic);
                        handleTriggerSearch(topic);
                      }}
                      className="px-3 py-1.5 rounded-xl bg-[#132048] hover:bg-blue-600/20 border border-blue-500/30 text-blue-300 hover:text-white text-xs font-semibold transition-all cursor-pointer"
                    >
                      🔍 {topic}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              filteredPapers.map(paper => (
                <div
                  key={paper.id}
                  className="p-5 rounded-2xl bg-[#0d1633] border border-[#1b2b5a] hover:border-blue-500/40 transition-all space-y-3"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${getTierBadge(paper.relevanceTier)}`}>
                        {paper.relevanceTier}
                      </span>
                      <span className="text-xs text-slate-400">{paper.published}</span>
                      <span className="text-xs text-blue-400 font-semibold">{paper.citations || 42} citations</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          handleImport(paper);
                          if (onEvolvePaper) onEvolvePaper(paper);
                        }}
                        className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-rose-600 via-amber-600 to-orange-600 hover:from-rose-500 hover:to-orange-500 text-white text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-md shadow-rose-600/20"
                      >
                        <GitMerge className="w-3.5 h-3.5 text-white" />
                        <span>🚀 Evolve This Paper</span>
                      </button>

                      <button
                        onClick={() => handleImport(paper)}
                        disabled={importedIds[paper.id]}
                        className="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:bg-emerald-600/30 disabled:border disabled:border-emerald-500/50 text-white text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
                      >
                        {importedIds[paper.id] ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Plus className="w-3.5 h-3.5" />}
                        <span>{importedIds[paper.id] ? 'In Workspace' : 'Add to Workspace'}</span>
                      </button>
                    </div>
                  </div>

                  <h3 className="text-base font-bold text-white leading-snug">
                    {paper.title}
                  </h3>
                  <p className="text-xs text-slate-400">
                    {paper.authors.join(', ')}
                  </p>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {paper.summary}
                  </p>
                </div>
              ))
            )}
          </div>
        </>
      ) : activeTab === 'alerts' ? (
        /* RESEARCH ALERTS TAB */
        <div className="space-y-6">
          
          {/* Create Alert Box */}
          <div className="p-6 rounded-3xl bg-[#0d1633] border border-[#1b2b5a] space-y-4">
            <div className="flex items-center gap-2">
              <Bell className="w-4 h-4 text-amber-400" />
              <h3 className="text-sm font-bold text-white">Create New Research Topic Alert</h3>
            </div>
            <p className="text-xs text-slate-400">
              Select key research topics (e.g. <em>"Computer Vision + Medical Imaging"</em>). ResearchPilot will alert you whenever new matching preprints hit ArXiv, bioRxiv, or PubMed.
            </p>

            <form onSubmit={handleAddAlert} className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                value={newAlertQuery}
                onChange={(e) => setNewAlertQuery(e.target.value)}
                placeholder="e.g. Computer Vision + Medical Imaging"
                className="flex-1 px-4 py-2.5 rounded-xl text-xs bg-[#090f28] border border-[#1e2e60] text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <select
                value={newAlertDomain}
                onChange={(e) => setNewAlertDomain(e.target.value)}
                className="px-3 py-2.5 rounded-xl text-xs bg-[#090f28] border border-[#1e2e60] text-slate-200 focus:outline-none"
              >
                <option value="Computer Science">Computer Science & AI</option>
                <option value="Healthcare AI">Medical & Healthcare</option>
                <option value="Hydrology & Climate">Climate & Earth Sciences</option>
                <option value="Education">Educational Analytics</option>
              </select>
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-lg shadow-blue-600/30 cursor-pointer flex items-center justify-center gap-2"
              >
                <Plus className="w-4 h-4" />
                <span>Create Alert</span>
              </button>
            </form>
          </div>

          {/* Active Alerts List */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Active Topic Monitors ({alerts.length})</h3>
            {alerts.map(alt => (
              <div
                key={alt.id}
                className="p-5 rounded-2xl bg-[#0d1633] border border-[#1b2b5a] flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-500/20 text-blue-400 border border-blue-500/30">
                      {alt.domain}
                    </span>
                    <span className="text-[11px] text-slate-400 font-medium">
                      {alt.frequency}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-white">
                    {alt.query}
                  </h4>
                  <p className="text-xs text-slate-400">
                    Latest Match: <strong className="text-slate-200">{alt.latestPaperTitle}</strong>
                  </p>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <span className="px-3 py-1 rounded-xl bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 text-xs font-bold">
                    {alt.matchedCount} New Papers
                  </span>
                  <button
                    onClick={() => toggleAlert(alt.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                      alt.active
                        ? 'border-emerald-500/40 text-emerald-400 bg-emerald-500/10'
                        : 'border-slate-700 text-slate-500 bg-slate-800/40'
                    }`}
                  >
                    {alt.active ? 'Active' : 'Paused'}
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      ) : (
        /* TRENDING & RECOMMENDATIONS */
        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-900/30 to-indigo-900/30 border border-blue-500/30 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-blue-400" />
              <div>
                <h3 className="text-sm font-bold text-white">Curated For Your Active Projects</h3>
                <span className="text-xs text-slate-400">Based on Flood Prediction and Dropout Prevention telemetry</span>
              </div>
            </div>
            <span className="text-xs font-bold text-emerald-400 bg-emerald-500/15 px-3 py-1 rounded-full border border-emerald-500/30">
              4 Fresh Preprints Today
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {INITIAL_PAPERS.slice(0, 4).map(p => (
              <div key={p.id} className="p-5 rounded-2xl bg-[#0d1633] border border-[#1b2b5a] space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-blue-400 bg-blue-500/15 px-2 py-0.5 rounded border border-blue-500/30">
                    96% Semantic Match
                  </span>
                  <span className="text-xs text-slate-400">{p.citations} citations</span>
                </div>
                <h4 className="text-sm font-bold text-white leading-snug">{p.title}</h4>
                <p className="text-xs text-slate-400 line-clamp-2">{p.summary}</p>
                <button
                  onClick={() => handleImport(p)}
                  className="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-sm transition-all flex items-center gap-1 cursor-pointer mt-2"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Import to Research Project</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};

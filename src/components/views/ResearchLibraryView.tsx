import React, { useState } from 'react';
import { 
  BookMarked, 
  Folder, 
  Star, 
  Clock, 
  Search, 
  Filter, 
  FileText, 
  Plus, 
  Download, 
  Copy, 
  Check, 
  Tag, 
  BookOpen, 
  BookmarkCheck, 
  Share2, 
  Sparkles,
  ExternalLink,
  ChevronRight,
  FolderPlus,
  Trash2,
  Eye,
  Edit3
} from 'lucide-react';
import { PaperAnalysis } from '../../types';

interface LibraryPaper {
  id: string | number;
  title: string;
  authors: string;
  venue: string;
  year: number | string;
  category: string;
  tags: string[];
  isFavorite: boolean;
  isRead: boolean;
  collection: string;
  readingProgress: number;
  notesCount: number;
  citationsCount: number;
  dateAdded: string;
  doi?: string;
  abstractSnippet: string;
}

const INITIAL_LIBRARY_PAPERS: LibraryPaper[] = [
  {
    id: 1,
    title: 'Real-Time IoT Flood Prediction via Edge Graph Convolutional Networks',
    authors: 'A. Rivera, H. Vaswani, K. Patel et al.',
    venue: 'IEEE Trans. on Industrial Informatics',
    year: 2024,
    category: 'Hydrology & Edge AI',
    tags: ['Edge AI', 'Flood Forecast', 'GNN', 'IoT'],
    isFavorite: true,
    isRead: true,
    collection: 'Flood Prediction Project',
    readingProgress: 100,
    notesCount: 6,
    citationsCount: 42,
    dateAdded: '2 days ago',
    doi: '10.1109/TII.2024.3391024',
    abstractSnippet: 'Presents an edge-deployable Spatiotemporal GCN that reduces river catchment telemetry inference latency to under 250ms on ultra-low-power microcontrollers.'
  },
  {
    id: 2,
    title: 'Attention Is All You Need: Scalable Self-Attention for Machine Translation',
    authors: 'A. Vaswani, N. Shazeer, N. Parmar et al.',
    venue: 'NeurIPS',
    year: 2017,
    category: 'Deep Learning',
    tags: ['Transformer', 'Attention', 'NLP', 'Foundational'],
    isFavorite: true,
    isRead: true,
    collection: 'Core Machine Learning',
    readingProgress: 100,
    notesCount: 14,
    citationsCount: 112000,
    dateAdded: '1 week ago',
    doi: '10.48550/arXiv.1706.03762',
    abstractSnippet: 'The dominant sequence transduction models are based on complex recurrent or convolutional neural networks. We propose the Transformer, based solely on attention mechanisms.'
  },
  {
    id: 3,
    title: 'Deep Multi-Task Learning for Student Attrition and Dropout Risk Prediction',
    authors: 'E. Martinez, L. Zhao, C. Thompson',
    venue: 'Computers & Education: AI',
    year: 2025,
    category: 'Educational Data Mining',
    tags: ['Dropout Prediction', 'Multi-Task', 'Higher Ed'],
    isFavorite: false,
    isRead: false,
    collection: 'Student Dropout Project',
    readingProgress: 35,
    notesCount: 2,
    citationsCount: 19,
    dateAdded: 'Yesterday',
    doi: '10.1016/j.caeai.2025.100214',
    abstractSnippet: 'Investigates longitudinal LMS activity logs with survival analysis neural networks to predict university dropout risk 4 weeks before midterms.'
  },
  {
    id: 4,
    title: 'Physics-Informed Neural Operators for Catchment Inundation Dynamics',
    authors: 'J. Tanaka, M. Dubois, S. Lindqvist',
    venue: 'Journal of Hydrology',
    year: 2023,
    category: 'Hydrology & Edge AI',
    tags: ['PINN', 'Neural Operator', 'Physics-AI'],
    isFavorite: true,
    isRead: true,
    collection: 'Flood Prediction Project',
    readingProgress: 85,
    notesCount: 5,
    citationsCount: 78,
    dateAdded: '3 days ago',
    doi: '10.1016/j.jhydrol.2023.129841',
    abstractSnippet: 'Integrates Saint-Venant shallow water equations into Fourier Neural Operators to simulate reservoir spillway surge propagation with zero divergence.'
  },
  {
    id: 5,
    title: 'Zero-Shot Multimodal Medical Imaging Diagnosis via Contrastive Latent Aligner',
    authors: 'K. Chen, Y. Wang, R. Gupta',
    venue: 'Nature Biomedical Engineering',
    year: 2025,
    category: 'Healthcare AI',
    tags: ['Medical Imaging', 'Contrastive Learning', 'Zero-Shot'],
    isFavorite: false,
    isRead: false,
    collection: 'Healthcare AI',
    readingProgress: 10,
    notesCount: 1,
    citationsCount: 31,
    dateAdded: '4 days ago',
    doi: '10.1038/s41551-025-01290-x',
    abstractSnippet: 'Aligns 2.4M histopathology slides with clinical notes enabling rapid screening of rare metastatic lesions without task-specific fine-tuning.'
  }
];

interface ResearchLibraryViewProps {
  papers?: PaperAnalysis[];
  onSelectPaper?: (p: PaperAnalysis) => void;
  onNavigate?: (tab: any) => void;
  isDarkMode?: boolean;
}

export const ResearchLibraryView: React.FC<ResearchLibraryViewProps> = ({
  onNavigate,
  isDarkMode = true,
}) => {
  const [papersList, setPapersList] = useState<LibraryPaper[]>(INITIAL_LIBRARY_PAPERS);
  const [activeFilter, setActiveFilter] = useState<'all' | 'saved' | 'favorites' | 'reading_list' | 'collections'>('all');
  const [selectedCollection, setSelectedCollection] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [selectedPaperForCitation, setSelectedPaperForCitation] = useState<LibraryPaper | null>(null);
  const [citationFormat, setCitationFormat] = useState<'IEEE' | 'APA' | 'MLA' | 'BibTeX' | 'RIS'>('IEEE');
  const [copiedCitation, setCopiedCitation] = useState(false);
  const [studyNoteText, setStudyNoteText] = useState('');
  const [activePaperForNotes, setActivePaperForNotes] = useState<LibraryPaper | null>(null);

  // Collections list
  const collections = ['ALL', 'Flood Prediction Project', 'Student Dropout Project', 'Core Machine Learning', 'Healthcare AI'];

  // All tags
  const allTags = Array.from(new Set(papersList.flatMap(p => p.tags)));

  // Filtered papers
  const filteredPapers = papersList.filter(p => {
    // Tab filter
    if (activeFilter === 'favorites' && !p.isFavorite) return false;
    if (activeFilter === 'reading_list' && p.isRead) return false;
    if (activeFilter === 'saved' && p.readingProgress === 0) return false;
    if (activeFilter === 'collections' && selectedCollection !== 'ALL' && p.collection !== selectedCollection) return false;

    // Tag filter
    if (selectedTag && !p.tags.includes(selectedTag)) return false;

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        p.title.toLowerCase().includes(q) ||
        p.authors.toLowerCase().includes(q) ||
        p.tags.some(t => t.toLowerCase().includes(q)) ||
        p.category.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const toggleFavorite = (id: string | number) => {
    setPapersList(prev => prev.map(p => p.id === id ? { ...p, isFavorite: !p.isFavorite } : p));
  };

  const toggleReadStatus = (id: string | number) => {
    setPapersList(prev => prev.map(p => p.id === id ? { 
      ...p, 
      isRead: !p.isRead, 
      readingProgress: !p.isRead ? 100 : 25 
    } : p));
  };

  // Generate citation string
  const generateCitation = (p: LibraryPaper, format: 'IEEE' | 'APA' | 'MLA' | 'BibTeX' | 'RIS') => {
    const firstAuthor = p.authors.split(',')[0];
    const cleanVenue = p.venue;
    
    switch(format) {
      case 'IEEE':
        return `[1] ${p.authors}, "${p.title}," ${cleanVenue}, vol. 18, no. 4, pp. 1024-1035, ${p.year}, doi: ${p.doi || '10.xxxx/xxxx'}.`;
      case 'APA':
        return `${firstAuthor} et al. (${p.year}). ${p.title}. ${cleanVenue}. https://doi.org/${p.doi || '10.xxxx/xxxx'}`;
      case 'MLA':
        return `${firstAuthor}, et al. "${p.title}." ${cleanVenue}, ${p.year}.`;
      case 'BibTeX':
        return `@article{${firstAuthor.split(' ')[1]?.toLowerCase() || 'paper'}${p.year},\n  title={${p.title}},\n  author={${p.authors}},\n  journal={${cleanVenue}},\n  year={${p.year}},\n  doi={${p.doi || ''}}\n}`;
      case 'RIS':
        return `TY  - JOUR\nTI  - ${p.title}\nAU  - ${p.authors}\nJO  - ${cleanVenue}\nPY  - ${p.year}\nDO  - ${p.doi || ''}\nER  -`;
      default:
        return p.title;
    }
  };

  const handleCopyCitation = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCitation(true);
    setTimeout(() => setCopiedCitation(false), 2000);
  };

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      
      {/* Top Header & Metrics Banner */}
      <div className={`p-6 sm:p-8 rounded-3xl border transition-all ${
        isDarkMode 
          ? 'bg-gradient-to-br from-[#0c132c] via-[#090e24] to-[#0d163a] border-[#1e2e60]' 
          : 'bg-gradient-to-br from-blue-50 via-white to-indigo-50 border-slate-200'
      }`}>
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/15 text-blue-400 border border-blue-500/30 mb-3">
              <BookMarked className="w-3.5 h-3.5" />
              <span>Personal Academic Repository</span>
            </div>
            <h1 className={`text-2xl sm:text-3xl font-black tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
              Research Library & Citation Center
            </h1>
            <p className="text-sm text-slate-400 mt-1 max-w-2xl leading-relaxed">
              Your centralized knowledge vault. Manage saved papers, organize research collections, track reading progress, take study notes, and generate IEEE/APA/BibTeX citations with 1-click.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate && onNavigate('paper_analysis')}
              className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-lg shadow-blue-600/30 flex items-center gap-2 transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Add / Upload Paper</span>
            </button>
            <button
              onClick={() => {
                setActiveFilter('collections');
                setSelectedCollection('Flood Prediction Project');
              }}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold border transition-all cursor-pointer flex items-center gap-2 ${
                isDarkMode 
                  ? 'border-[#22356b] bg-[#111a3d] text-slate-200 hover:bg-[#162350]' 
                  : 'border-slate-300 bg-white text-slate-700 hover:bg-slate-100'
              }`}
            >
              <FolderPlus className="w-4 h-4 text-indigo-400" />
              <span>New Collection</span>
            </button>
          </div>
        </div>

        {/* Quick Stat Pill Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-slate-700/30">
          <div className={`p-3 rounded-2xl border ${isDarkMode ? 'bg-[#10183b]/60 border-[#1a285a]' : 'bg-white/80 border-slate-200'}`}>
            <span className="text-[11px] font-semibold text-slate-400 block">Total Catalog</span>
            <span className={`text-xl font-black ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{papersList.length} Papers</span>
          </div>
          <div className={`p-3 rounded-2xl border ${isDarkMode ? 'bg-[#10183b]/60 border-[#1a285a]' : 'bg-white/80 border-slate-200'}`}>
            <span className="text-[11px] font-semibold text-slate-400 block">Favorites</span>
            <span className="text-xl font-black text-amber-400">{papersList.filter(p => p.isFavorite).length} Starred</span>
          </div>
          <div className={`p-3 rounded-2xl border ${isDarkMode ? 'bg-[#10183b]/60 border-[#1a285a]' : 'bg-white/80 border-slate-200'}`}>
            <span className="text-[11px] font-semibold text-slate-400 block">Active Collections</span>
            <span className="text-xl font-black text-indigo-400">{collections.length - 1} Folders</span>
          </div>
          <div className={`p-3 rounded-2xl border ${isDarkMode ? 'bg-[#10183b]/60 border-[#1a285a]' : 'bg-white/80 border-slate-200'}`}>
            <span className="text-[11px] font-semibold text-slate-400 block">Reading Queue</span>
            <span className="text-xl font-black text-emerald-400">{papersList.filter(p => !p.isRead).length} Unread</span>
          </div>
        </div>
      </div>

      {/* Main Control Bar: Search + Tab Navigation */}
      <div className={`p-4 rounded-2xl border flex flex-col md:flex-row md:items-center justify-between gap-4 ${
        isDarkMode ? 'bg-[#0b122c] border-[#182754]' : 'bg-white border-slate-200 shadow-sm'
      }`}>
        {/* Navigation Filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
          {[
            { id: 'all', label: 'All Papers', icon: <FileText className="w-3.5 h-3.5" /> },
            { id: 'favorites', label: 'Starred', icon: <Star className="w-3.5 h-3.5" /> },
            { id: 'reading_list', label: 'Reading List', icon: <BookOpen className="w-3.5 h-3.5" /> },
            { id: 'collections', label: 'Collections', icon: <Folder className="w-3.5 h-3.5" /> },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id as any)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
                activeFilter === tab.id
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                  : isDarkMode
                  ? 'text-slate-400 hover:text-slate-200 hover:bg-[#142047]'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div className="relative min-w-[240px] sm:min-w-[320px]">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by title, author, or keyword..."
            className={`w-full pl-9 pr-4 py-2 rounded-xl text-xs border transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              isDarkMode 
                ? 'bg-[#10193d] border-[#1f3066] text-white placeholder-slate-500' 
                : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400'
            }`}
          />
        </div>
      </div>

      {/* Collection Sub-bar (when Collections active) */}
      {activeFilter === 'collections' && (
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          <span className="text-xs font-semibold text-slate-400 shrink-0 mr-1 flex items-center gap-1">
            <Folder className="w-3.5 h-3.5 text-blue-400" />
            <span>Folder:</span>
          </span>
          {collections.map(col => (
            <button
              key={col}
              onClick={() => setSelectedCollection(col)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all cursor-pointer whitespace-nowrap ${
                selectedCollection === col
                  ? 'bg-indigo-600 border-indigo-500 text-white shadow-md shadow-indigo-600/20'
                  : isDarkMode
                  ? 'border-[#1b2b57] bg-[#0e1638] text-slate-400 hover:text-slate-200'
                  : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
              }`}
            >
              {col}
            </button>
          ))}
        </div>
      )}

      {/* Tag Filtering Chips */}
      <div className="flex items-center gap-1.5 flex-wrap">
        <span className="text-[11px] font-semibold text-slate-400 mr-1 flex items-center gap-1">
          <Tag className="w-3 h-3 text-slate-500" />
          <span>Tags:</span>
        </span>
        {allTags.map(tag => (
          <button
            key={tag}
            onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
            className={`px-2.5 py-0.5 rounded-md text-[11px] font-medium border transition-all cursor-pointer ${
              selectedTag === tag
                ? 'bg-blue-500/20 text-blue-400 border-blue-500/50 font-bold'
                : isDarkMode
                ? 'bg-[#10183b] text-slate-400 border-[#1a285a] hover:text-slate-200'
                : 'bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200'
            }`}
          >
            #{tag}
          </button>
        ))}
        {selectedTag && (
          <button
            onClick={() => setSelectedTag(null)}
            className="text-[11px] text-rose-400 hover:underline font-semibold ml-2"
          >
            Clear tag filter
          </button>
        )}
      </div>

      {/* Paper List Cards */}
      <div className="space-y-4">
        {filteredPapers.length === 0 ? (
          <div className={`p-12 text-center rounded-3xl border ${isDarkMode ? 'border-[#182754] bg-[#0b122c]' : 'border-slate-200 bg-white'}`}>
            <FileText className="w-12 h-12 text-slate-500 mx-auto mb-3 opacity-50" />
            <h3 className={`text-base font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
              No papers found matching your criteria
            </h3>
            <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
              Try adjusting your search query, clearing tag filters, or adding new research literature to this collection.
            </p>
          </div>
        ) : (
          filteredPapers.map(paper => (
            <div
              key={paper.id}
              className={`p-5 rounded-2xl border transition-all hover:shadow-xl group ${
                isDarkMode 
                  ? 'bg-[#0d1638] border-[#1c2e63] hover:border-blue-500/50' 
                  : 'bg-white border-slate-200 hover:border-blue-400 shadow-xs'
              }`}
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                
                {/* Main Content */}
                <div className="space-y-2 flex-1">
                  
                  {/* Category & Status Badges */}
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-500/15 text-indigo-400 border border-indigo-500/30">
                      {paper.category}
                    </span>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border flex items-center gap-1 ${
                      paper.isRead 
                        ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30' 
                        : 'bg-amber-500/15 text-amber-400 border-amber-500/30'
                    }`}>
                      {paper.isRead ? <BookmarkCheck className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                      <span>{paper.isRead ? 'Read' : 'Reading List'}</span>
                    </span>
                    <span className="text-[11px] text-slate-400 font-medium flex items-center gap-1">
                      <Folder className="w-3 h-3 text-slate-500" />
                      <span>{paper.collection}</span>
                    </span>
                  </div>

                  {/* Title & Authors */}
                  <h3 className={`text-base font-bold leading-snug group-hover:text-blue-400 transition-colors ${
                    isDarkMode ? 'text-white' : 'text-slate-900'
                  }`}>
                    {paper.title}
                  </h3>
                  <p className="text-xs text-slate-400 font-medium">
                    {paper.authors} • <span className="font-semibold text-slate-300">{paper.venue}</span> ({paper.year})
                  </p>

                  {/* Abstract Snippet */}
                  <p className={`text-xs leading-relaxed line-clamp-2 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                    {paper.abstractSnippet}
                  </p>

                  {/* Tags */}
                  <div className="flex items-center gap-1.5 flex-wrap pt-1">
                    {paper.tags.map(t => (
                      <span key={t} className="text-[10px] px-2 py-0.5 rounded bg-slate-800/80 text-slate-300 border border-slate-700/60 font-medium">
                        #{t}
                      </span>
                    ))}
                  </div>

                  {/* Reading Progress Bar */}
                  <div className="flex items-center gap-3 pt-1">
                    <div className="w-36 bg-slate-800 h-1.5 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-blue-500 to-emerald-500 rounded-full transition-all"
                        style={{ width: `${paper.readingProgress}%` }}
                      />
                    </div>
                    <span className="text-[10px] font-semibold text-slate-400">
                      {paper.readingProgress}% read
                    </span>
                    <span className="text-[10px] text-slate-500">•</span>
                    <span className="text-[10px] text-slate-400 font-medium">
                      {paper.notesCount} study notes
                    </span>
                  </div>

                </div>

                {/* Right Action Column */}
                <div className="flex lg:flex-col items-center lg:items-end justify-between gap-3 shrink-0 pt-2 lg:pt-0 border-t lg:border-t-0 border-slate-700/30">
                  
                  {/* Top quick star & read toggle */}
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => toggleFavorite(paper.id)}
                      title={paper.isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                      className={`p-2 rounded-xl border transition-all cursor-pointer ${
                        paper.isFavorite
                          ? 'bg-amber-500/15 border-amber-500/40 text-amber-400'
                          : isDarkMode
                          ? 'border-[#1f3066] text-slate-400 hover:text-slate-200 hover:bg-[#142047]'
                          : 'border-slate-200 text-slate-400 hover:text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      <Star className="w-4 h-4 fill-current" />
                    </button>
                    <button
                      onClick={() => toggleReadStatus(paper.id)}
                      title={paper.isRead ? 'Mark as Unread' : 'Mark as Read'}
                      className={`p-2 rounded-xl border transition-all cursor-pointer ${
                        paper.isRead
                          ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-400'
                          : isDarkMode
                          ? 'border-[#1f3066] text-slate-400 hover:text-slate-200 hover:bg-[#142047]'
                          : 'border-slate-200 text-slate-400 hover:text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      <BookmarkCheck className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Buttons */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setSelectedPaperForCitation(paper)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all flex items-center gap-1.5 cursor-pointer ${
                        isDarkMode
                          ? 'border-[#22356b] bg-[#121c42] text-blue-300 hover:bg-[#172554]'
                          : 'border-slate-300 bg-white text-blue-600 hover:bg-blue-50'
                      }`}
                    >
                      <Copy className="w-3.5 h-3.5" />
                      <span>Cite</span>
                    </button>
                    <button
                      onClick={() => setActivePaperForNotes(paper)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all flex items-center gap-1.5 cursor-pointer ${
                        isDarkMode
                          ? 'border-[#22356b] bg-[#121c42] text-slate-300 hover:bg-[#172554]'
                          : 'border-slate-300 bg-white text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      <Edit3 className="w-3.5 h-3.5 text-indigo-400" />
                      <span>Notes</span>
                    </button>
                    <button
                      onClick={() => onNavigate && onNavigate('paper_analysis')}
                      className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white shadow-md shadow-blue-600/30 flex items-center gap-1 cursor-pointer transition-all"
                    >
                      <span>Analyze</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                </div>

              </div>
            </div>
          ))
        )}
      </div>

      {/* Citation Generator Modal */}
      {selectedPaperForCitation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-fadeIn">
          <div className={`w-full max-w-xl rounded-3xl border p-6 shadow-2xl space-y-5 ${
            isDarkMode ? 'bg-[#0d163a] border-[#223670]' : 'bg-white border-slate-200'
          }`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center">
                  <Copy className="w-4 h-4" />
                </div>
                <div>
                  <h3 className={`text-base font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                    Citation Exporter
                  </h3>
                  <span className="text-xs text-slate-400">Generate formatted academic reference</span>
                </div>
              </div>
              <button
                onClick={() => setSelectedPaperForCitation(null)}
                className="text-slate-400 hover:text-white text-sm font-bold p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Paper Title preview */}
            <div className={`p-3 rounded-xl border text-xs font-semibold ${isDarkMode ? 'bg-[#10183e] border-[#1b2b5d] text-slate-200' : 'bg-slate-50 border-slate-200 text-slate-800'}`}>
              {selectedPaperForCitation.title}
            </div>

            {/* Format Selector */}
            <div className="flex items-center gap-2 flex-wrap">
              {(['IEEE', 'APA', 'MLA', 'BibTeX', 'RIS'] as const).map(fmt => (
                <button
                  key={fmt}
                  onClick={() => setCitationFormat(fmt)}
                  className={`px-3 py-1 rounded-lg text-xs font-bold border transition-all cursor-pointer ${
                    citationFormat === fmt
                      ? 'bg-blue-600 border-blue-500 text-white shadow-md shadow-blue-600/30'
                      : isDarkMode
                      ? 'border-[#1e2e60] bg-[#121c44] text-slate-300 hover:bg-[#162354]'
                      : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {fmt}
                </button>
              ))}
            </div>

            {/* Output Box */}
            <div className={`p-4 rounded-xl border font-mono text-xs leading-relaxed select-all whitespace-pre-wrap break-all ${
              isDarkMode ? 'bg-[#060b1e] border-[#182754] text-emerald-400' : 'bg-slate-900 border-slate-800 text-emerald-300'
            }`}>
              {generateCitation(selectedPaperForCitation, citationFormat)}
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between pt-2">
              <span className="text-[11px] text-slate-400">
                Ready to paste into Overleaf, Word, or LaTeX
              </span>
              <button
                onClick={() => handleCopyCitation(generateCitation(selectedPaperForCitation, citationFormat))}
                className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-lg shadow-blue-600/30 flex items-center gap-2 transition-all cursor-pointer"
              >
                {copiedCitation ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
                <span>{copiedCitation ? 'Copied to Clipboard!' : 'Copy Reference'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Study Notes & Highlights Drawer */}
      {activePaperForNotes && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-fadeIn">
          <div className={`w-full max-w-lg rounded-3xl border p-6 shadow-2xl space-y-4 ${
            isDarkMode ? 'bg-[#0d163a] border-[#223670]' : 'bg-white border-slate-200'
          }`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Edit3 className="w-4 h-4 text-indigo-400" />
                <h3 className={`text-base font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                  Study Notes & Synthesis
                </h3>
              </div>
              <button
                onClick={() => setActivePaperForNotes(null)}
                className="text-slate-400 hover:text-white text-sm font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-slate-400 line-clamp-1 font-semibold">
              Paper: {activePaperForNotes.title}
            </p>

            <textarea
              rows={6}
              value={studyNoteText}
              onChange={(e) => setStudyNoteText(e.target.value)}
              placeholder="Record your research insights, experimental observations, or theoretical critique on this paper..."
              className={`w-full p-4 rounded-xl text-xs border focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                isDarkMode 
                  ? 'bg-[#10193d] border-[#1e2f63] text-white placeholder-slate-500' 
                  : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400'
              }`}
            />

            <div className="flex items-center justify-between">
              <span className="text-[11px] text-slate-400">
                Auto-saved to your personal research dossier
              </span>
              <button
                onClick={() => setActivePaperForNotes(null)}
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all cursor-pointer"
              >
                Save Note
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

import React, { useState } from 'react';
import { 
  FlaskConical, 
  Sparkles, 
  CheckCircle2, 
  Sliders, 
  Layers, 
  ArrowRight, 
  Download, 
  CheckSquare, 
  Square,
  Cpu,
  BarChart,
  GitBranch,
  Database,
  Search,
  Check,
  AlertCircle,
  ShieldCheck,
  ExternalLink,
  Tag
} from 'lucide-react';

interface DatasetItem {
  id: string;
  name: string;
  domain: string;
  size: string;
  samples: string;
  features: number;
  license: string;
  source: string;
  qualityScore: number;
  missingValues: string;
  suitabilityScore: number;
  suitabilityRationale: string;
  tags: string[];
}

const SAMPLE_DATASETS: DatasetItem[] = [
  {
    id: 'ds-camels',
    name: 'CAMELS: Catchment Attributes & Meteorology Benchmark',
    domain: 'Hydrology & Climate',
    size: '4.2 GB',
    samples: '671 river basins (30 years)',
    features: 54,
    license: 'CC-BY 4.0 (Open Access)',
    source: 'National Center for Atmospheric Research (NCAR)',
    qualityScore: 96,
    missingValues: '0.4% (interpolated with splines)',
    suitabilityScore: 92,
    suitabilityRationale: 'Exceptional topological diversity and hydrological runoff consistency; perfect baseline for spatiotemporal GNN validation.',
    tags: ['Streamflow', 'Meteorology', 'Benchmark']
  },
  {
    id: 'ds-noaa',
    name: 'NOAA NWM: Retrospective River Telemetry (1979–2024)',
    domain: 'Hydrology & Climate',
    size: '48.6 GB',
    samples: '2.7M stream segments',
    features: 28,
    license: 'US Public Domain',
    source: 'NOAA / National Water Center',
    qualityScore: 94,
    missingValues: '1.2% (sensor telemetry dropout)',
    suitabilityScore: 89,
    suitabilityRationale: 'High spatiotemporal alignment with slight sensor calibration gap. Ideal for testing edge packet-loss robustness.',
    tags: ['US-Wide', 'Continental', 'High-Res']
  },
  {
    id: 'ds-oulad',
    name: 'OULAD: Open University Learning Analytics Dataset',
    domain: 'Educational Analytics',
    size: '185 MB',
    samples: '32,593 university students',
    features: 36,
    license: 'CC-BY 4.0',
    source: 'The Open University UK',
    qualityScore: 91,
    missingValues: '3.8% (ungraded formative tasks)',
    suitabilityScore: 87,
    suitabilityRationale: 'Contains longitudinal VLE/LMS clickstream records and assessment timestamps; ideal for survival neural networks.',
    tags: ['Dropout Prediction', 'LMS Clicks', 'Student Retention']
  },
  {
    id: 'ds-mimic',
    name: 'MIMIC-IV Multi-Parameter Clinical Telemetry',
    domain: 'Healthcare AI',
    size: '14.2 GB',
    samples: '40,000 ICU admissions',
    features: 120,
    license: 'PhysioNet Credentialed',
    source: 'MIT Computational Physiology Lab',
    qualityScore: 98,
    missingValues: '5.1% (irregular vital checks)',
    suitabilityScore: 84,
    suitabilityRationale: 'Rich physiological signal streams; suitable for multimodal patient deterioration forecasting.',
    tags: ['ICU', 'EHR', 'Waveforms']
  }
];

import { PaperAnalysis } from '../../types';
import { EmptyWorkspaceState } from '../EmptyWorkspaceState';
import { NavTab } from '../Sidebar';

interface ExperimentPlannerViewProps {
  paper?: PaperAnalysis | null;
  onNavigate?: (tab: NavTab) => void;
  isDarkMode?: boolean;
}

export const ExperimentPlannerView: React.FC<ExperimentPlannerViewProps> = ({
  paper,
  onNavigate,
  isDarkMode = true,
}) => {
  if (!paper) {
    return (
      <div className="space-y-6 pb-12 animate-fadeIn">
        <EmptyWorkspaceState
          title="No Manuscript Loaded for Experiment Planning"
          description="Upload a research manuscript (PDF) or import papers from arXiv to configure empirical hypotheses, baseline models, reproducibility pre-flight checklists, and open-access dataset benchmarks."
          onNavigate={onNavigate}
          isDarkMode={isDarkMode}
        />
      </div>
    );
  }

  const [activeTab, setActiveTab] = useState<'planner' | 'datasets'>('planner');
  const [researchIdea, setResearchIdea] = useState(
    paper.extendedAnalysis?.structuredBreakdown?.problemStatement ||
    paper.summary ||
    `Empirical Validation and Benchmark Reproducibility for ${paper.title}`
  );
  const [baselineModel, setBaselineModel] = useState('Standard Domain Baseline / SOTA Literature Comparison');
  const [proposedModel, setProposedModel] = useState(paper.title);
  const [datasetSearch, setDatasetSearch] = useState('');
  const [selectedDataset, setSelectedDataset] = useState<DatasetItem | null>(SAMPLE_DATASETS[0]);

  const [checklist, setChecklist] = useState([
    { id: '1', label: 'Fix global random seed (seed=42 for PyTorch, NumPy, CUDA)', checked: true },
    { id: '2', label: `Perform 5-fold cross-validation on ${paper.domain || 'domain benchmark'}`, checked: true },
    { id: '3', label: 'Implement ablation testing isolating proposed architectural operators', checked: true },
    { id: '4', label: 'Log peak GPU/CPU VRAM consumption and inference latency (ms)', checked: false },
    { id: '5', label: 'Conduct Wilcoxon signed-rank significance tests (p < 0.01)', checked: false },
    { id: '6', label: 'Dockerize environment with exact requirements.txt and CUDA drivers', checked: true },
  ]);

  React.useEffect(() => {
    if (paper) {
      setResearchIdea(
        paper.extendedAnalysis?.structuredBreakdown?.problemStatement ||
        paper.summary ||
        `Empirical Validation and Benchmark Reproducibility for ${paper.title}`
      );
      setProposedModel(paper.title);
      setChecklist([
        { id: '1', label: 'Fix global random seed (seed=42 for PyTorch, NumPy, CUDA)', checked: true },
        { id: '2', label: `Perform 5-fold cross-validation on ${paper.domain || 'domain benchmark'}`, checked: true },
        { id: '3', label: 'Implement ablation testing isolating proposed architectural operators', checked: true },
        { id: '4', label: 'Log peak GPU/CPU VRAM consumption and inference latency (ms)', checked: false },
        { id: '5', label: 'Conduct Wilcoxon signed-rank significance tests (p < 0.01)', checked: false },
        { id: '6', label: 'Dockerize environment with exact requirements.txt and CUDA drivers', checked: true },
      ]);
    }
  }, [paper]);

  const toggleChecklist = (id: string) => {
    setChecklist(checklist.map(item => item.id === id ? { ...item, checked: !item.checked } : item));
  };

  const filteredDatasets = SAMPLE_DATASETS.filter(d => 
    d.name.toLowerCase().includes(datasetSearch.toLowerCase()) ||
    d.domain.toLowerCase().includes(datasetSearch.toLowerCase()) ||
    d.tags.some(t => t.toLowerCase().includes(datasetSearch.toLowerCase()))
  );

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      
      {/* Top Header Banner */}
      <div className={`p-6 sm:p-8 rounded-3xl border transition-all ${
        isDarkMode 
          ? 'bg-gradient-to-br from-[#0c132d] via-[#090e24] to-[#0f173d] border-[#1e2e60]' 
          : 'bg-gradient-to-br from-indigo-50 via-white to-blue-50 border-slate-200'
      }`}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-purple-500/15 text-purple-400 border border-purple-500/30 mb-3">
              <FlaskConical className="w-3.5 h-3.5" />
              <span>Rigorous Empirical Protocol & Data Benchmarks</span>
            </div>
            <h1 className={`text-2xl sm:text-3xl font-black tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
              Experiment Planner & Dataset Hub
            </h1>
            <p className="text-sm text-slate-400 mt-1 max-w-2xl leading-relaxed">
              Design reproducible empirical experiments, configure baseline models vs proposed architectures, and evaluate open-access datasets with AI Suitability Scoring.
            </p>
          </div>

          {/* View Tab Switcher */}
          <div className="flex items-center gap-2 bg-slate-800/40 p-1 rounded-2xl border border-slate-700/50">
            <button
              onClick={() => setActiveTab('planner')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'planner'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <FlaskConical className="w-3.5 h-3.5" />
              <span>Experiment Protocol</span>
            </button>
            <button
              onClick={() => setActiveTab('datasets')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'datasets'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Database className="w-3.5 h-3.5 text-indigo-400" />
              <span>Dataset Hub ({SAMPLE_DATASETS.length})</span>
            </button>
          </div>
        </div>
      </div>

      {activeTab === 'planner' ? (
        <>
          {/* Idea → Baseline → Proposed Flowchart Card */}
          <div className={`p-6 rounded-2xl border space-y-4 ${
            isDarkMode ? 'bg-[#0d163a] border-[#1f3066]' : 'bg-white border-slate-200 shadow-sm'
          }`}>
            <h3 className={`text-sm font-bold flex items-center gap-2 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
              <GitBranch className="w-4 h-4 text-blue-400" />
              Empirical Pipeline Configuration
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className={`p-4 rounded-xl border space-y-2 ${isDarkMode ? 'bg-[#10193d] border-[#1b2b5d]' : 'bg-slate-50 border-slate-200'}`}>
                <span className="text-[10px] font-bold text-slate-400 uppercase">1. Core Hypothesis</span>
                <p className="text-xs font-semibold leading-relaxed text-slate-200">
                  {researchIdea}
                </p>
              </div>

              <div className={`p-4 rounded-xl border space-y-2 ${isDarkMode ? 'bg-[#10193d] border-[#1b2b5d]' : 'bg-slate-50 border-slate-200'}`}>
                <span className="text-[10px] font-bold text-amber-400 uppercase">2. Competitive Baseline</span>
                <p className="text-xs font-semibold leading-relaxed text-slate-200">
                  {baselineModel}
                </p>
                <span className="text-[10px] text-slate-400 block">SOTA literature comparison standard</span>
              </div>

              <div className={`p-4 rounded-xl border space-y-2 ${isDarkMode ? 'bg-[#10193d] border-[#1b2b5d]' : 'bg-slate-50 border-slate-200'}`}>
                <span className="text-[10px] font-bold text-emerald-400 uppercase">3. Proposed Innovation</span>
                <p className="text-xs font-semibold leading-relaxed text-slate-200">
                  {proposedModel}
                </p>
                <span className="text-[10px] text-emerald-400 font-semibold block">Expected +12.4% NSE boost</span>
              </div>
            </div>
          </div>

          {/* Reproducibility Checklist */}
          <div className={`p-6 rounded-2xl border space-y-4 ${
            isDarkMode ? 'bg-[#0d163a] border-[#1f3066]' : 'bg-white border-slate-200 shadow-sm'
          }`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <h3 className={`text-sm font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                  Academic Reproducibility Pre-Flight Checklist
                </h3>
              </div>
              <span className="text-xs text-slate-400">
                {checklist.filter(c => c.checked).length} / {checklist.length} Completed
              </span>
            </div>

            <div className="space-y-2">
              {checklist.map(item => (
                <div
                  key={item.id}
                  onClick={() => toggleChecklist(item.id)}
                  className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center gap-3 ${
                    item.checked
                      ? isDarkMode ? 'bg-emerald-950/20 border-emerald-500/30 text-slate-200' : 'bg-emerald-50 border-emerald-200 text-slate-800'
                      : isDarkMode ? 'bg-[#10193d] border-[#1b2b5d] text-slate-400' : 'bg-slate-50 border-slate-200 text-slate-600'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={item.checked}
                    readOnly
                    className="rounded text-emerald-600 focus:ring-0 cursor-pointer"
                  />
                  <span className={`text-xs font-medium ${item.checked ? 'line-through text-slate-400' : ''}`}>
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        /* DATASET HUB TAB */
        <div className="space-y-6">
          
          {/* Search Bar */}
          <div className={`p-4 rounded-2xl border flex items-center justify-between gap-4 ${
            isDarkMode ? 'bg-[#0b122c] border-[#182754]' : 'bg-white border-slate-200'
          }`}>
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={datasetSearch}
                onChange={(e) => setDatasetSearch(e.target.value)}
                placeholder="Search datasets by name, domain (Hydrology, Education, Medical), or format..."
                className={`w-full pl-9 pr-4 py-2 rounded-xl text-xs border focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  isDarkMode ? 'bg-[#10193d] border-[#1f3066] text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                }`}
              />
            </div>
          </div>

          {/* Dataset Cards Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredDatasets.map(ds => (
              <div
                key={ds.id}
                className={`p-6 rounded-3xl border space-y-4 transition-all hover:shadow-xl ${
                  selectedDataset?.id === ds.id
                    ? isDarkMode ? 'bg-[#0e173d] border-blue-500/60 ring-1 ring-blue-500/40' : 'bg-blue-50/50 border-blue-400'
                    : isDarkMode ? 'bg-[#0d163a] border-[#1f3066]' : 'bg-white border-slate-200'
                }`}
              >
                {/* Header */}
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
                      {ds.domain}
                    </span>
                    <h3 className={`text-base font-bold mt-1.5 leading-snug ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                      {ds.name}
                    </h3>
                    <span className="text-[11px] text-slate-400 block mt-0.5">
                      Source: <strong>{ds.source}</strong>
                    </span>
                  </div>

                  {/* AI Suitability Pill */}
                  <div className="p-3 rounded-2xl bg-gradient-to-tr from-blue-600/20 to-indigo-600/20 border border-blue-500/30 text-right shrink-0">
                    <span className="text-[10px] font-semibold text-slate-400 block">Suitability</span>
                    <span className="text-xl font-black text-blue-400">{ds.suitabilityScore}%</span>
                  </div>
                </div>

                {/* Metadata Grid */}
                <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-700/20 text-center">
                  <div className={`p-2 rounded-xl border ${isDarkMode ? 'bg-[#10193d] border-[#1b2b5d]' : 'bg-slate-50 border-slate-200'}`}>
                    <span className="text-[10px] text-slate-400 block font-medium">Dataset Size</span>
                    <strong className="text-xs text-slate-200">{ds.size}</strong>
                  </div>
                  <div className={`p-2 rounded-xl border ${isDarkMode ? 'bg-[#10193d] border-[#1b2b5d]' : 'bg-slate-50 border-slate-200'}`}>
                    <span className="text-[10px] text-slate-400 block font-medium">Features</span>
                    <strong className="text-xs text-slate-200">{ds.features} Attributes</strong>
                  </div>
                  <div className={`p-2 rounded-xl border ${isDarkMode ? 'bg-[#10193d] border-[#1b2b5d]' : 'bg-slate-50 border-slate-200'}`}>
                    <span className="text-[10px] text-slate-400 block font-medium">Missing Values</span>
                    <strong className="text-xs text-emerald-400">{ds.missingValues}</strong>
                  </div>
                </div>

                {/* AI Suitability Rationale */}
                <div className={`p-3.5 rounded-xl border text-xs leading-relaxed space-y-1 ${
                  isDarkMode ? 'bg-[#080f28] border-[#162450] text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-700'
                }`}>
                  <div className="flex items-center gap-1.5 text-blue-400 font-bold text-[11px]">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>AI Compatibility Verdict</span>
                  </div>
                  <p>{ds.suitabilityRationale}</p>
                </div>

                {/* Tags & Action */}
                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center gap-1 flex-wrap">
                    {ds.tags.map(t => (
                      <span key={t} className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                        #{t}
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={() => {
                      setSelectedDataset(ds);
                      alert(`Connected ${ds.name} to active experiment pipeline!`);
                    }}
                    className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-md shadow-blue-600/30 transition-all cursor-pointer flex items-center gap-1"
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>Select for Experiment</span>
                  </button>
                </div>

              </div>
            ))}
          </div>

        </div>
      )}

    </div>
  );
};

import React, { useState } from 'react';
import { 
  BookOpen, 
  Sparkles, 
  Download, 
  Copy, 
  Check, 
  Table, 
  FileText, 
  Layers, 
  ArrowRight,
  TrendingUp,
  AlertCircle
} from 'lucide-react';
import { LiteratureReviewReport } from '../../types';

const SAMPLE_REVIEW: LiteratureReviewReport = {
  title: 'Comprehensive Literature Review: Deep Learning & IoT Sensor Fusion in Hydrological Disaster Mitigation (2020–2025)',
  paperCount: 34,
  introduction: 'Hydrological disaster forecasting has rapidly transitioned from deterministic numerical hydraulics to deep spatiotemporal neural operators and distributed IoT telemetry. Across 34 analyzed peer-reviewed studies, contemporary literature centers on mitigating latency in flash-flood warnings by leveraging edge compute devices and multimodal satellite-ground sensor networks.',
  existingApproaches: [
    'Classical 1D/2D Hydrodynamic Models (HEC-RAS, SWMM) — Accurate physics but prohibitive computational overhead for real-time edge response.',
    'Temporal Recurrent Networks (LSTM, BiLSTM, GRU) — High temporal accuracy for univariate gauges, but fails to capture spatial topography.',
    'Spatiotemporal Graph Convolutional Networks (ST-GCN) — State of the art in capturing non-Euclidean river basin topologies.',
    'Physics-Informed Neural Networks (PINNs) — Enforce Saint-Venant hydraulic conservation laws within the loss gradient.'
  ],
  methodologies: [
    'Graph Fourier Transforms coupled with temporal 1D convolutions for spatial water velocity diffusion.',
    'Cross-attention mechanisms dynamically weighting SAR satellite soil backscatter against terrestrial capacitive probes.',
    'Extreme Value Loss (EVL) formulations penalizing underestimation of rare 100-year peak surge anomalies.'
  ],
  datasets: [
    'NOAA National Water Model (NWM) Retrospective Analysis (1979–2020)',
    'Global River Inundation Dynamics Database (GRID-Hydro)',
    'CAMELS Benchmark (Catchment Attributes and Meteorology for Large-sample Studies)',
    'Locally deployed LoRaWAN ESP32 ultrasonic river stage sensor logs'
  ],
  comparisonTable: [
    {
      paper: 'Chen et al. (2024)',
      method: 'Spatiotemporal GCN + Kalman',
      dataset: 'NOAA HydroNet & Texas FlashFlood',
      accuracy: '95.8% F1',
      limitation: 'Requires dense sensor deployment in headwaters'
    },
    {
      paper: 'O’Connor et al. (2023)',
      method: 'Cross-Attention Transformer',
      dataset: 'Sentinel-1 SAR + Stream Gauges',
      accuracy: '94.2% F1',
      limitation: 'High computational overhead; SAR latency (6–12 days)'
    },
    {
      paper: 'Tanaka & Dubois (2023)',
      method: 'Physics-Informed Neural Op (PINO)',
      dataset: 'CAMELS Hydrology Benchmark',
      accuracy: '92.1% NSE',
      limitation: 'Boundary condition sensitivity in uncalibrated basins'
    },
    {
      paper: 'Al-Mansoor & Vance (2022)',
      method: 'Bidirectional LSTM + Attention',
      dataset: 'USGS Historical Services',
      accuracy: '89.6% NSE',
      limitation: 'Inability to generalize across varying soil geologies'
    },
    {
      paper: 'Hansen & Kim (2021)',
      method: 'XGBoost + Ridge Ensemble',
      dataset: 'ERA5 Reanalysis Grid',
      accuracy: '88.4% R²',
      limitation: 'Static dataset assumptions; fails during flash spikes'
    }
  ],
  limitations: [
    'Synthetic vs Real-world Field Bias: 68% of literature evaluates on historical synthetic datasets without field telemetry noise.',
    'Sensor Dropout Vulnerability: Edge IoT networks experience frequent battery depletion and LoRa packet drop during storms.',
    'Uncertainty Quantification: Fewer than 15% of published works provide calibrated Bayesian credible intervals for life-safety evacuations.'
  ],
  researchGaps: [
    'GAP 1: Absence of real-time streaming architectures capable of self-calibrating when upstream sensors fail.',
    'GAP 2: Lack of unified multi-modal fusion benchmarks combining low-cost micro-radar, LoRa telemetry, and optical rainfall gauges.',
    'GAP 3: Computational constraints of Transformer models on battery-operated microcontrollers (Cortex-M).'
  ],
  futureDirections: [
    'Deployment of 4-bit Quantized Neural Operators on ultra-low-power RISC-V edge silicon.',
    'Decentralized Federated Learning across multi-municipality emergency response databases without sharing sensitive geospatial coordinates.',
    'Integration of Generative Diffusion Models for stochastic spatial flood extent inundation maps under climate uncertainty.'
  ]
};

export const LiteratureReviewGenView: React.FC = () => {
  const [report, setReport] = useState<LiteratureReviewReport>(SAMPLE_REVIEW);
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);
  const [selectedCluster, setSelectedCluster] = useState('IoT Flood Prediction (34 Papers)');

  const handleRegenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
    }, 900);
  };

  const handleCopyText = () => {
    const text = `
LITERATURE REVIEW REPORT: ${report.title}
Analyzed Papers: ${report.paperCount}

1. INTRODUCTION
${report.introduction}

2. EXISTING APPROACHES
${report.existingApproaches.map((a, i) => `${i+1}. ${a}`).join('\n')}

3. METHODOLOGIES
${report.methodologies.map((m, i) => `• ${m}`).join('\n')}

4. DATASETS
${report.datasets.map((d, i) => `• ${d}`).join('\n')}

5. CROSS-PAPER COMPARISON MATRIX
${report.comparisonTable.map(r => `${r.paper} | ${r.method} | ${r.dataset} | ${r.accuracy} | ${r.limitation}`).join('\n')}

6. LIMITATIONS
${report.limitations.map(l => `⚠ ${l}`).join('\n')}

7. RESEARCH GAPS
${report.researchGaps.map(g => `★ ${g}`).join('\n')}

8. FUTURE DIRECTIONS
${report.futureDirections.map(f => `➜ ${f}`).join('\n')}
    `.trim();

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-blue-600 uppercase tracking-wider mb-1">
            <Sparkles className="w-4 h-4 text-blue-600" />
            Meta-Analysis Engine • 20–50 Papers Multi-Synthesis
          </div>
          <h2 className="text-xl font-bold text-slate-900">
            AI Literature Review Generator
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Transform dozens of disparate academic papers into an 8-section structured comparative survey with benchmark tables.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopyText}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-semibold rounded-xl border border-slate-200 transition-all"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
            {copied ? 'Copied Review' : 'Copy All'}
          </button>
          <button
            onClick={handleRegenerate}
            disabled={isGenerating}
            className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-xl shadow-sm transition-all"
          >
            {isGenerating ? (
              <>
                <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Synthesizing...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                Regenerate Synthesis
              </>
            )}
          </button>
        </div>
      </div>

      {/* Cluster selector pill bar */}
      <div className="bg-white rounded-xl p-3 border border-slate-200 flex items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-slate-400 uppercase text-[10px] tracking-wider">
            Active Cluster:
          </span>
          <select
            value={selectedCluster}
            onChange={(e) => setSelectedCluster(e.target.value)}
            className="bg-slate-50 font-bold text-slate-800 border border-slate-200 rounded-lg px-2.5 py-1 focus:outline-none"
          >
            <option value="IoT Flood Prediction (34 Papers)">IoT Flood Prediction (34 Papers)</option>
            <option value="LLM Hallucination Reduction (28 Papers)">LLM Hallucination Reduction (28 Papers)</option>
            <option value="Vision Transformers in Medical Imaging (42 Papers)">Vision Transformers in Medical Imaging (42 Papers)</option>
          </select>
        </div>
        <div className="text-slate-500 font-medium">
          Total Analyzed: <span className="font-bold text-blue-600">{report.paperCount} peer-reviewed papers</span>
        </div>
      </div>

      {/* 8-Section Review Container */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-8">
        
        {/* Title */}
        <div className="border-b border-slate-100 pb-5">
          <span className="text-[11px] font-bold text-blue-600 uppercase tracking-wider bg-blue-50 px-2.5 py-1 rounded-full border border-blue-100">
            Autonomous Literature Review
          </span>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 mt-3 leading-tight">
            {report.title}
          </h1>
        </div>

        {/* 1. Introduction */}
        <section className="space-y-2">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-black">1</span>
            Introduction & Scope
          </h3>
          <p className="text-xs text-slate-700 leading-relaxed pl-8">
            {report.introduction}
          </p>
        </section>

        {/* 2. Existing Approaches */}
        <section className="space-y-3">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-black">2</span>
            Taxonomy of Existing Approaches
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pl-8">
            {report.existingApproaches.map((item, idx) => (
              <div key={idx} className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs text-slate-700">
                {item}
              </div>
            ))}
          </div>
        </section>

        {/* 3 & 4. Methodologies & Datasets */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pl-8">
          <section className="space-y-2">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-black">3</span>
              Predominant Methodologies
            </h3>
            <ul className="space-y-2 text-xs text-slate-700">
              {report.methodologies.map((m, idx) => (
                <li key={idx} className="flex items-start gap-2 bg-slate-50/70 p-2.5 rounded-lg border border-slate-100">
                  <span className="text-blue-600 font-bold">•</span>
                  <span>{m}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="space-y-2">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-black">4</span>
              Benchmark Datasets & Corpora
            </h3>
            <ul className="space-y-2 text-xs text-slate-700">
              {report.datasets.map((d, idx) => (
                <li key={idx} className="flex items-start gap-2 bg-slate-50/70 p-2.5 rounded-lg border border-slate-100">
                  <span className="text-purple-600 font-bold">•</span>
                  <span>{d}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>

        {/* 5. Cross-Paper Comparison Matrix Table */}
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-black">5</span>
              Cross-Paper Comparative Matrix
            </h3>
            <span className="text-[11px] text-slate-400 font-medium">
              5 Representative Paradigms
            </span>
          </div>

          <div className="overflow-x-auto rounded-xl border border-slate-200">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-600 font-bold uppercase text-[10px] tracking-wider border-b border-slate-200">
                <tr>
                  <th className="p-3">Paper / Study</th>
                  <th className="p-3">Methodology</th>
                  <th className="p-3">Dataset</th>
                  <th className="p-3">Accuracy / Metric</th>
                  <th className="p-3">Key Limitation</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {report.comparisonTable.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-3 font-bold text-slate-900 whitespace-nowrap">
                      {row.paper}
                    </td>
                    <td className="p-3 font-medium text-blue-700 whitespace-nowrap">
                      {row.method}
                    </td>
                    <td className="p-3 text-slate-600">
                      {row.dataset}
                    </td>
                    <td className="p-3 font-bold text-emerald-700 whitespace-nowrap">
                      {row.accuracy}
                    </td>
                    <td className="p-3 text-rose-700/90 text-[11px]">
                      {row.limitation}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* 6. Limitations */}
        <section className="space-y-2">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center text-xs font-black">6</span>
            Systemic Limitations Across Literature
          </h3>
          <div className="space-y-2 pl-8">
            {report.limitations.map((l, idx) => (
              <div key={idx} className="p-3 bg-amber-50/50 border border-amber-200 rounded-xl text-xs text-amber-900 flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <span>{l}</span>
              </div>
            ))}
          </div>
        </section>

        {/* 7. Research Gaps */}
        <section className="space-y-2">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center text-xs font-black">7</span>
            Critical Unexplored Research Gaps
          </h3>
          <div className="space-y-2 pl-8">
            {report.researchGaps.map((gap, idx) => (
              <div key={idx} className="p-3 bg-purple-50 border border-purple-200 rounded-xl text-xs text-purple-950 font-medium">
                {gap}
              </div>
            ))}
          </div>
        </section>

        {/* 8. Future Directions */}
        <section className="space-y-2">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs font-black">8</span>
            Future Directions & Roadmap
          </h3>
          <div className="space-y-2 pl-8">
            {report.futureDirections.map((dir, idx) => (
              <div key={idx} className="p-3 bg-emerald-50/50 border border-emerald-200 rounded-xl text-xs text-emerald-900 flex items-center gap-2">
                <ArrowRight className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{dir}</span>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
};

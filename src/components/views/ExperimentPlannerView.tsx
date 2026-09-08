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
  GitBranch
} from 'lucide-react';

export const ExperimentPlannerView: React.FC = () => {
  const [researchIdea, setResearchIdea] = useState('Physics-Informed Graph Neural Operators for Flash-Flood Inundation with Packet-Loss Resilient Telemetry');
  const [baselineModel, setBaselineModel] = useState('Bidirectional LSTM + Random Forest');
  const [proposedModel, setProposedModel] = useState('HydroEdge-GNN (Spatiotemporal Graph + Saint-Venant Conservation Loss)');
  const [trainSplit, setTrainSplit] = useState('70% Train / 15% Val / 15% Test (Stratified)');
  const [isGenerating, setIsGenerating] = useState(false);

  const [checklist, setChecklist] = useState([
    { id: '1', label: 'Fix global random seed (seed=42 for PyTorch, NumPy, CUDA)', checked: true },
    { id: '2', label: 'Perform 5-fold cross validation across all 3 river catchments', checked: true },
    { id: '3', label: 'Implement 0% to 50% simulated sensor packet dropout injection', checked: true },
    { id: '4', label: 'Log GPU/CPU peak VRAM consumption and edge inference latency (ms)', checked: false },
    { id: '5', label: 'Conduct Wilcoxon signed-rank significance tests (p < 0.01)', checked: false },
    { id: '6', label: 'Dockerize environment with exact requirements.txt and CUDA 12.2', checked: true },
  ]);

  const toggleChecklist = (id: string) => {
    setChecklist(checklist.map(item => item.id === id ? { ...item, checked: !item.checked } : item));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-blue-600 uppercase tracking-wider mb-1">
            <FlaskConical className="w-4 h-4 text-blue-600" />
            Rigorous Empirical Design • Methodology to Code
          </div>
          <h2 className="text-xl font-bold text-slate-900">
            Research Experiment Planner
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Transform a theoretical research idea into a complete empirical protocol: baselines, dataset splits, ablation studies, and pre-flight checklists.
          </p>
        </div>

        <button
          onClick={() => {
            alert('Exporting Complete Experiment Plan to Markdown/PDF...');
          }}
          className="flex items-center gap-2 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-xl shadow-sm transition-all"
        >
          <Download className="w-4 h-4" />
          Export Protocol
        </button>
      </div>

      {/* Idea → Baseline → Proposed Flowchart Card */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
        <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
          <GitBranch className="w-4 h-4 text-blue-600" />
          Empirical Pipeline Configuration
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/80 space-y-1.5">
            <span className="font-bold text-slate-400 uppercase text-[10px] tracking-wider block">
              1. Research Idea
            </span>
            <p className="font-semibold text-slate-800">
              {researchIdea}
            </p>
          </div>

          <div className="p-4 bg-rose-50/50 rounded-xl border border-rose-100 space-y-1.5">
            <span className="font-bold text-rose-700 uppercase text-[10px] tracking-wider block">
              2. Baseline Model
            </span>
            <p className="font-bold text-rose-950">
              {baselineModel}
            </p>
            <span className="text-[10px] text-slate-500 block">SOTA Benchmark for comparison</span>
          </div>

          <div className="p-4 bg-emerald-50/50 rounded-xl border border-emerald-200 space-y-1.5">
            <span className="font-bold text-emerald-700 uppercase text-[10px] tracking-wider block">
              3. Proposed Model
            </span>
            <p className="font-bold text-emerald-950">
              {proposedModel}
            </p>
            <span className="text-[10px] text-emerald-700 block">Novel architectural contribution</span>
          </div>
        </div>
      </div>

      {/* Experiment Specification Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Dataset Requirements & Splits */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <Layers className="w-4 h-4 text-purple-600" />
            Dataset Requirements & Splitting
          </h3>

          <div className="space-y-3 text-xs">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-0.5">
                Target Dataset
              </span>
              <p className="font-bold text-slate-800">NOAA HydroNet + Austin Flood IoT Network (2020–2024)</p>
              <p className="text-[11px] text-slate-500 mt-1">45 Distributed River Stage Nodes • 105,000 hourly time-steps</p>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-0.5">
                Train / Validation / Test Ratio
              </span>
              <p className="font-bold text-blue-700">{trainSplit}</p>
              <p className="text-[11px] text-slate-500 mt-1">Chronological split to eliminate temporal data leakage</p>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-0.5">
                Preprocessing Pipeline
              </span>
              <p className="text-slate-700">StandardScaler normalizer, MinMax spatial bounding, missing-data median imputation, 24-step sliding window.</p>
            </div>
          </div>
        </div>

        {/* Evaluation Metrics & Ablation Checklist */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <BarChart className="w-4 h-4 text-emerald-600" />
            Primary Evaluation Metrics & Target Baselines
          </h3>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
              <span className="text-slate-400 block text-[10px] font-bold uppercase">Accuracy / NSE</span>
              <span className="text-base font-black text-slate-900">0.94+ Target</span>
              <span className="text-[10px] text-emerald-600 block font-semibold">+6.2% over LSTM</span>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
              <span className="text-slate-400 block text-[10px] font-bold uppercase">Peak F1-Score</span>
              <span className="text-base font-black text-slate-900">95.6% Target</span>
              <span className="text-[10px] text-emerald-600 block font-semibold">Rare surge detection</span>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
              <span className="text-slate-400 block text-[10px] font-bold uppercase">Edge Latency</span>
              <span className="text-base font-black text-slate-900">&lt; 50 ms</span>
              <span className="text-[10px] text-blue-600 block font-semibold">Cortex-M micro-gateway</span>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
              <span className="text-slate-400 block text-[10px] font-bold uppercase">Dropout Tolerance</span>
              <span className="text-base font-black text-slate-900">35% Packet Loss</span>
              <span className="text-[10px] text-purple-600 block font-semibold">Zero catastrophic failure</span>
            </div>
          </div>

          <div className="p-3 bg-purple-50/50 rounded-xl border border-purple-100 text-xs">
            <span className="font-bold text-purple-900 block mb-1">Ablation Studies Planned:</span>
            <ul className="space-y-1 text-purple-950 text-[11px]">
              <li>• Remove Saint-Venant hydraulic conservation loss (Check physical plausibility)</li>
              <li>• Replace Graph Attention with static adjacency matrix</li>
              <li>• Test INT4 vs INT8 vs FP32 precision trade-offs</li>
            </ul>
          </div>
        </div>

      </div>

      {/* Pre-Flight Experiment Checklist */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
        <h3 className="text-sm font-bold text-slate-900 flex items-center justify-between">
          <span className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            Pre-Flight Academic Experiment Checklist
          </span>
          <span className="text-xs text-slate-500 font-normal">
            {checklist.filter(c => c.checked).length} of {checklist.length} verified
          </span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {checklist.map(item => (
            <div
              key={item.id}
              onClick={() => toggleChecklist(item.id)}
              className="flex items-center gap-3 p-3 bg-slate-50 hover:bg-slate-100/80 rounded-xl border border-slate-100 cursor-pointer transition-colors select-none text-xs"
            >
              {item.checked ? (
                <CheckSquare className="w-4 h-4 text-blue-600 shrink-0" />
              ) : (
                <Square className="w-4 h-4 text-slate-400 shrink-0" />
              )}
              <span className={`font-medium ${item.checked ? 'text-slate-800' : 'text-slate-500'}`}>
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import { 
  ShieldAlert, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  HelpCircle, 
  Terminal, 
  Database, 
  Cpu, 
  Code2, 
  Layers
} from 'lucide-react';

export const RiskReproducibilityView: React.FC = () => {
  const reliabilityScore = 72;
  const reproducibilityScore = 61;

  const datasetRisks = [
    { title: 'Small Dataset Volume', level: 'High', status: 'warning', note: 'Historical record spans only 3 flood seasons (N=18 severe surge events).' },
    { title: 'Severe Class Imbalance', level: 'Medium', status: 'caution', note: '99.2% normal river flow time-steps vs 0.8% peak flooding periods.' },
    { title: 'Missing Sensor Readings', level: 'Low', status: 'safe', note: 'Linear hydraulic interpolation effectively imputes single-node drops.' },
  ];

  const methodRisks = [
    { title: 'Temporal Data Leakage Risk', level: 'High', status: 'warning', note: 'Random k-fold splitting would leak future rain telemetry into past predictions.' },
    { title: 'Overfitting to Sensor Topology', level: 'Medium', status: 'caution', note: 'GNN adjacency matrix tightly overfits to the 3 tested river geologies.' },
    { title: 'Weak Baseline Benchmarks', level: 'High', status: 'warning', note: 'Does not compare against recent 2024 Fourier Neural Operators (FNO).' },
  ];

  const reproducibilityItems = [
    { label: 'Dataset Mentioned & Described?', status: true, note: 'NOAA HydroNet & Texas FlashFlood-2023 referenced' },
    { label: 'Public Dataset Access URL Provided?', status: true, note: 'Direct USGS & NOAA archive URLs included' },
    { label: 'Source Code Repository Link Available?', status: false, note: 'GitHub repository not yet public; marked as upon acceptance' },
    { label: 'Exact Hyperparameters Specified?', status: false, note: 'Learning rate schedule and weight decay constants missing' },
    { label: 'Hardware Environment Specified?', status: true, note: 'NVIDIA RTX 4090 GPU + ARM Cortex-M55 edge SoC' },
    { label: 'Software Dependencies & Versions Locked?', status: false, note: 'PyTorch Geometric and CUDA library versions omitted' },
    { label: 'Fixed Random Seed Documented?', status: false, note: 'No deterministic random seed documented in paper text' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-rose-600 uppercase tracking-wider mb-1">
            <ShieldAlert className="w-4 h-4 text-rose-600" />
            Methodological Rigor & Audit Framework
          </div>
          <h2 className="text-xl font-bold text-slate-900">
            Research Risk Analyzer & Reproducibility Checker
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Evaluate dataset vulnerabilities, algorithmic leakage hazards, and verify artifacts for 100% academic reproducibility.
          </p>
        </div>

        {/* Dual Gauge Scores */}
        <div className="flex items-center gap-3">
          <div className="bg-slate-50 border border-slate-200 p-3 rounded-2xl text-right">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              Reliability Score
            </span>
            <span className="text-lg font-black text-amber-600">{reliabilityScore} / 100</span>
          </div>

          <div className="bg-slate-50 border border-slate-200 p-3 rounded-2xl text-right">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              Reproducibility
            </span>
            <span className="text-lg font-black text-blue-600">{reproducibilityScore} / 100</span>
          </div>
        </div>
      </div>

      {/* Dataset & Methodology Risk Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Dataset Risk */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <Database className="w-4 h-4 text-blue-600" />
            Dataset Risk Analysis
          </h3>

          <div className="space-y-3">
            {datasetRisks.map((item, idx) => (
              <div key={idx} className="p-3.5 bg-slate-50 rounded-xl border border-slate-100 flex items-start justify-between gap-3 text-xs">
                <div className="space-y-1">
                  <span className="font-bold text-slate-800 block">
                    {item.title}
                  </span>
                  <span className="text-slate-500 text-[11px] block">
                    {item.note}
                  </span>
                </div>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase shrink-0 ${
                  item.level === 'High'
                    ? 'bg-rose-100 text-rose-800 border border-rose-200'
                    : item.level === 'Medium'
                    ? 'bg-amber-100 text-amber-800 border border-amber-200'
                    : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                }`}>
                  {item.level === 'High' ? '⚠️ High' : item.level === 'Medium' ? '⚠️ Medium' : '✓ Low'}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Methodology Risk */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <Cpu className="w-4 h-4 text-purple-600" />
            Methodology & Algorithmic Risk
          </h3>

          <div className="space-y-3">
            {methodRisks.map((item, idx) => (
              <div key={idx} className="p-3.5 bg-slate-50 rounded-xl border border-slate-100 flex items-start justify-between gap-3 text-xs">
                <div className="space-y-1">
                  <span className="font-bold text-slate-800 block">
                    {item.title}
                  </span>
                  <span className="text-slate-500 text-[11px] block">
                    {item.note}
                  </span>
                </div>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase shrink-0 ${
                  item.level === 'High'
                    ? 'bg-rose-100 text-rose-800 border border-rose-200'
                    : item.level === 'Medium'
                    ? 'bg-amber-100 text-amber-800 border border-amber-200'
                    : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                }`}>
                  {item.level === 'High' ? '⚠️ High' : item.level === 'Medium' ? '⚠️ Medium' : '✓ Low'}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Academic Reproducibility Audit Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Code2 className="w-4 h-4 text-emerald-600" />
              Artifact Reproducibility Audit (ACM / IEEE Standard)
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Criteria required for an "Artifact Available & Evaluated" badge.
            </p>
          </div>
          <span className="text-xs font-bold text-blue-600">
            3 Passed • 4 Missing
          </span>
        </div>

        <div className="divide-y divide-slate-100">
          {reproducibilityItems.map((item, idx) => (
            <div key={idx} className="py-3 flex items-center justify-between gap-4 text-xs">
              <div className="flex items-center gap-3">
                {item.status ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                ) : (
                  <XCircle className="w-4 h-4 text-rose-500 shrink-0" />
                )}
                <div>
                  <span className={`font-semibold ${item.status ? 'text-slate-800' : 'text-slate-700'}`}>
                    {item.label}
                  </span>
                  <span className="text-slate-400 text-[11px] block mt-0.5">
                    {item.note}
                  </span>
                </div>
              </div>

              <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                item.status
                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                  : 'bg-rose-50 text-rose-700 border border-rose-200'
              }`}>
                {item.status ? 'Available ✓' : 'Missing ✗'}
              </span>
            </div>
          ))}
        </div>

        {/* Remediation Action Plan */}
        <div className="p-4 bg-blue-50/60 rounded-xl border border-blue-200 text-xs text-blue-900 flex items-start gap-2.5">
          <Sparkles className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
          <div>
            <strong className="block mb-0.5">Recommended Remediation to Boost Reproducibility to 95+:</strong>
            Attach a public anonymized GitHub link containing the PyTorch model definition, seed script (torch.manual_seed(42)), and a Dockerfile specifying CUDA 12.2 and PyTorch 2.3.
          </div>
        </div>
      </div>
    </div>
  );
};

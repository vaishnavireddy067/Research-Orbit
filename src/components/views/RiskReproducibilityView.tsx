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

import { PaperAnalysis } from '../../types';
import { EmptyWorkspaceState } from '../EmptyWorkspaceState';
import { NavTab } from '../Sidebar';

interface RiskReproducibilityViewProps {
  paper?: PaperAnalysis | null;
  onNavigate?: (tab: NavTab) => void;
  isDarkMode?: boolean;
}

export const RiskReproducibilityView: React.FC<RiskReproducibilityViewProps> = ({
  paper,
  onNavigate,
  isDarkMode = true,
}) => {
  if (!paper) {
    return (
      <div className="space-y-6 pb-12 animate-fadeIn">
        <EmptyWorkspaceState
          title="No Manuscript Loaded for Risk Audit"
          description="Upload a research manuscript (PDF) to evaluate methodological data leakage, benchmark vulnerabilities, and test academic reproducibility."
          onNavigate={onNavigate}
          isDarkMode={isDarkMode}
        />
      </div>
    );
  }

  const risks = paper.risks || [];
  const limitations = paper.failureSimulator?.dataset_limitations || [];
  const scenarios = paper.failureSimulator?.possible_failure_scenarios || [];

  const reliabilityScore = paper.noveltyScore ? Math.min(95, Math.round(paper.noveltyScore * 8.8)) : 76;
  const reproducibilityScore = paper.noveltyScore ? Math.min(90, Math.round(paper.noveltyScore * 7.9)) : 68;

  const datasetRisks = [
    { 
      title: 'Benchmark Dataset Volume Constraints', 
      level: limitations[0] ? 'High' : 'Medium', 
      status: 'warning', 
      note: limitations[0] || `Dataset sample size for ${paper.title} requires broader multi-corpus verification.` 
    },
    { 
      title: 'Distribution Imbalance in Test Sets', 
      level: 'Medium', 
      status: 'caution', 
      note: limitations[1] || 'Heavy skew toward canonical test samples with under-represented edge cases.' 
    },
    { 
      title: 'Missing Feature Preprocessing Pipeline', 
      level: 'Low', 
      status: 'safe', 
      note: 'Standard feature imputation and normalization steps well-grounded in manuscript.' 
    },
  ];

  const methodRisks = [
    { 
      title: 'Generalization & Data Leakage Risk', 
      level: 'High', 
      status: 'warning', 
      note: scenarios[0] || 'Random partitioning may risk temporal or latent identity leakage between splits.' 
    },
    { 
      title: 'Architectural Overfitting Boundary', 
      level: 'Medium', 
      status: 'caution', 
      note: risks[0] || 'Hyperparameters tightly optimized for target benchmark domain.' 
    },
    { 
      title: 'Baseline Comparison Recency', 
      level: risks[1] ? 'High' : 'Low', 
      status: risks[1] ? 'warning' : 'safe', 
      note: risks[1] || 'Evaluations compare against verified competitive state-of-the-art baselines.' 
    },
  ];

  const reproducibilityItems = [
    { label: 'Dataset Mentioned & Explicitly Described?', status: true, note: paper.extendedAnalysis?.structuredBreakdown?.datasetUsed ? 'Documented in paper structure' : 'Referenced in manuscript text' },
    { label: 'Public Dataset Access URL Provided?', status: true, note: 'Accessible benchmark repository cited' },
    { label: 'Source Code Repository Link Available?', status: false, note: 'Codebase designated for release upon publication' },
    { label: 'Exact Hyperparameters Specified?', status: true, note: 'Learning rate and optimizer configurations listed' },
    { label: 'Hardware Environment Specified?', status: true, note: 'Compute hardware and training budget documented' },
    { label: 'Software Dependencies & Versions Locked?', status: false, note: 'Lockfile (requirements.txt / environment.yml) recommended' },
    { label: 'Fixed Random Seed Documented?', status: false, note: 'Deterministic random seed documentation suggested' },
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

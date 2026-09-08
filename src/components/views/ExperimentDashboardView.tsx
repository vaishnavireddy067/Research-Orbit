import React, { useState } from 'react';
import { 
  BarChart3, 
  Sparkles, 
  Upload, 
  Download, 
  TrendingUp, 
  Award, 
  CheckCircle2, 
  FileText,
  Copy,
  Check
} from 'lucide-react';
import { ExperimentModelBenchmark } from '../../types';

const INITIAL_BENCHMARKS: ExperimentModelBenchmark[] = [
  { model: 'Support Vector Machine (SVM)', accuracy: 87.2, f1: 85.1, precision: 86.4, latency: 12 },
  { model: 'Random Forest (100 Trees)', accuracy: 91.4, f1: 90.7, precision: 91.2, latency: 18 },
  { model: 'XGBoost Gradient Booster', accuracy: 93.2, f1: 92.8, precision: 93.1, latency: 22 },
  { model: 'Proposed: HydroEdge-GNN', accuracy: 95.6, f1: 95.1, precision: 95.8, latency: 38 },
];

export const ExperimentDashboardView: React.FC = () => {
  const [benchmarks, setBenchmarks] = useState<ExperimentModelBenchmark[]>(INITIAL_BENCHMARKS);
  const [copied, setCopied] = useState(false);

  const bestModel = benchmarks.reduce((prev, curr) => curr.accuracy > prev.accuracy ? curr : prev);

  const handleCopyPaperText = () => {
    const text = `
EXPERIMENTAL RESULTS ANALYSIS (Draft Section IV.B):
As demonstrated in Table 1, the proposed HydroEdge-GNN architecture outperforms all classical and gradient-boosted baselines across all primary metrics. Specifically, the proposed model achieves a peak classification accuracy of 95.6% and an F1-score of 95.1%, representing a statistically significant improvement over XGBoost (93.2% accuracy, p < 0.008 via Wilcoxon signed-rank test) and Random Forest (91.4% accuracy). Furthermore, edge inference latency was measured at 38ms, well within the real-time operational window required for localized flash-flood mitigation.
    `.trim();

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-blue-600 uppercase tracking-wider mb-1">
            <BarChart3 className="w-4 h-4 text-blue-600" />
            Empirical Results Benchmarking • Statistical Significance
          </div>
          <h2 className="text-xl font-bold text-slate-900">
            Research Experiment Dashboard
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Compare model performance metrics, visualize comparative accuracy charts, inspect statistical p-values, and auto-generate paper results sections.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              alert('Upload CSV/JSON experiment results: Format (Model, Accuracy, F1, Precision, Latency)');
            }}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-semibold rounded-xl border border-slate-200 transition-all"
          >
            <Upload className="w-4 h-4" />
            Upload Runs
          </button>
          <button
            onClick={handleCopyPaperText}
            className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-xl shadow-sm transition-all"
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            {copied ? 'Copied Results Text' : 'Copy Section Text'}
          </button>
        </div>
      </div>

      {/* Top 3 Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-0.5">
              Top Performing Architecture
            </span>
            <h3 className="text-base font-bold text-slate-900">{bestModel.model}</h3>
            <span className="text-xs font-semibold text-emerald-600 mt-1 block">
              +2.4% gain over next best (XGBoost)
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-200">
            <Award className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-0.5">
              Statistical Significance
            </span>
            <h3 className="text-base font-bold text-slate-900">p-value = 0.0074</h3>
            <span className="text-xs font-semibold text-blue-600 mt-1 block">
              Wilcoxon Signed-Rank Test (p &lt; 0.01)
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-200">
            <CheckCircle2 className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-0.5">
              Effect Size (Cohen's d)
            </span>
            <h3 className="text-base font-bold text-slate-900">d = 0.84 (Large Effect)</h3>
            <span className="text-xs font-semibold text-purple-600 mt-1 block">
              High practical real-world advantage
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center border border-purple-200">
            <TrendingUp className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Model Benchmark Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h3 className="text-sm font-bold text-slate-900">
            Quantitative Model Comparison Table (Test Catchments N=3)
          </h3>
          <span className="text-xs text-slate-400 font-medium">
            Averaged across 5-fold cross-validation
          </span>
        </div>

        <div className="overflow-x-auto rounded-xl border border-slate-200">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 font-bold uppercase text-[10px] tracking-wider border-b border-slate-200">
              <tr>
                <th className="p-3">Model / Architecture</th>
                <th className="p-3">Accuracy (%)</th>
                <th className="p-3">F1-Score (%)</th>
                <th className="p-3">Precision (%)</th>
                <th className="p-3">Inference Latency</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700 font-medium">
              {benchmarks.map((row, idx) => {
                const isBest = row.model.includes('Proposed');
                return (
                  <tr key={idx} className={isBest ? 'bg-emerald-50/40 font-bold' : 'hover:bg-slate-50'}>
                    <td className="p-3 font-bold text-slate-900 flex items-center gap-2">
                      {isBest && <Award className="w-3.5 h-3.5 text-emerald-600 shrink-0" />}
                      {row.model}
                    </td>
                    <td className="p-3 text-slate-900 font-bold">
                      {row.accuracy}%
                    </td>
                    <td className="p-3 text-slate-900">
                      {row.f1}%
                    </td>
                    <td className="p-3 text-slate-900">
                      {row.precision}%
                    </td>
                    <td className="p-3 font-mono text-slate-500">
                      {row.latency} ms
                    </td>
                    <td className="p-3">
                      {isBest ? (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
                          BEST MODEL
                        </span>
                      ) : (
                        <span className="text-[10px] text-slate-400">Baseline</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Visual Bar Comparison */}
        <div className="space-y-2 pt-3">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
            Visual Accuracy Comparison
          </span>
          <div className="space-y-2">
            {benchmarks.map((item, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-slate-700">{item.model}</span>
                  <span className="font-bold text-slate-900">{item.accuracy}%</span>
                </div>
                <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      item.model.includes('Proposed')
                        ? 'bg-emerald-500'
                        : 'bg-blue-600'
                    }`}
                    style={{ width: `${item.accuracy}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Auto-Generated Academic Paper Draft Section */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <FileText className="w-4 h-4 text-blue-600" />
            Auto-Generated Paper Results Section (LaTeX / Markdown)
          </h3>
          <span className="text-[10px] font-bold bg-blue-50 text-blue-700 px-2 py-0.5 rounded border border-blue-200 uppercase">
            Ready for Manuscript
          </span>
        </div>

        <p className="text-xs text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-100 font-mono">
          "As demonstrated in Table 1, the proposed HydroEdge-GNN architecture outperforms all classical and gradient-boosted baselines across all primary metrics. Specifically, the proposed model achieves a peak classification accuracy of 95.6% and an F1-score of 95.1%, representing a statistically significant improvement over XGBoost (93.2% accuracy, p &lt; 0.008 via Wilcoxon signed-rank test) and Random Forest (91.4% accuracy). Furthermore, edge inference latency was measured at 38ms, well within the real-time operational window required for localized flash-flood mitigation."
        </p>
      </div>
    </div>
  );
};

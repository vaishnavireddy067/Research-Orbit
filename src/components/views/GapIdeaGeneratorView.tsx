import React, { useState } from 'react';
import { 
  Lightbulb, 
  Sparkles, 
  Download, 
  Copy, 
  Check, 
  FileText, 
  CheckCircle2, 
  AlertTriangle, 
  ArrowRight,
  Send,
  Layers
} from 'lucide-react';
import { ProposalStructure } from '../../types';

interface GapCard {
  id: string;
  detectedGap: string;
  evidence: string;
  analyzedRatio: string;
  proposedDirection: string;
  expectedBenefit: string;
  domain: string;
}

const SAMPLE_GAPS: GapCard[] = [
  {
    id: 'gap-1',
    detectedGap: 'Static Historical Dataset Dependency',
    evidence: '14 out of 20 analyzed deep learning flood studies train exclusively on retrospective static weather grids without real-time telemetry.',
    analyzedRatio: '14/20 papers (70%)',
    proposedDirection: 'Develop a self-calibrating real-time streaming neural operator architecture utilizing edge microcontrollers.',
    expectedBenefit: 'Adaptive flash-flood warning latency reduced from 6 hours to under 22 minutes under sensor failure.',
    domain: 'Hydrology & IoT'
  },
  {
    id: 'gap-2',
    detectedGap: 'Absence of Multi-Source Sensor Calibration Under Extreme Weather Anomalies',
    evidence: '18 out of 25 evaluated studies fail to model ultrasonic sensor packet drop and LoRa attenuation during heavy rain.',
    analyzedRatio: '18/25 papers (72%)',
    proposedDirection: 'Synthesize Bayesian dropout uncertainty estimation with topological Graph Attention Networks.',
    expectedBenefit: 'Guaranteed 95%+ classification confidence even when 35% of terrestrial probes disconnect.',
    domain: 'Edge Computing'
  },
  {
    id: 'gap-3',
    detectedGap: 'Lack of Closed-Loop Actuation in Flood Prevention Barriers',
    evidence: '21 out of 22 papers terminate at passive alerting rather than autonomous municipal sluice gate control protocols.',
    analyzedRatio: '21/22 papers (95%)',
    proposedDirection: 'Construct an offline reinforcement learning agent with formal verification bounds for automated reservoir valve actuation.',
    expectedBenefit: 'Zero-human-in-the-loop critical surge containment for urban drainage canals.',
    domain: 'Control Systems'
  }
];

const INITIAL_PROPOSAL: ProposalStructure = {
  title: 'Edge-Native Spatiotemporal Graph Neural Operators for Real-Time Hydrological Flood Surge Prediction with Dropout-Resilient Telemetry',
  problemStatement: 'Existing flood early warning architectures rely overwhelmingly on static, centralized weather radar datasets with multi-hour reporting latency. When localized extreme precipitation occurs, terrestrial IoT sensors frequently experience battery dropouts and packet loss, blinding municipalities during flash floods.',
  researchQuestion: 'How can decentralized graph neural operators dynamically impute missing topological stream gauge readings while executing within a 15W power envelope on edge micro-gateways?',
  hypothesis: 'A physics-informed spatiotemporal graph operator integrating Saint-Venant hydraulic conservation constraints will maintain >94% peak-surge forecasting accuracy even when up to 35% of upstream river gauges experience packet loss.',
  objectives: [
    'Design an edge-compatible Spatiotemporal Graph Fourier network optimized for ARM Cortex-M silicon.',
    'Formulate a physics-constrained Kalman loss function penalizing non-conservation of mass across river topologies.',
    'Curate a multi-basin real-time telemetry dataset combining USGS stream gauges with localized low-cost LoRa ultrasonic sensors.',
    'Perform rigorous ablation studies comparing baseline LSTM and XGBoost models against the proposed edge operator.'
  ],
  proposedMethodology: 'We propose HydroEdge-GNN, an edge-deployable graph operator that represents river basins as directed hydrographic DAGs. Nodes encode ultrasonic stage, rain tipping gauges, and soil saturation; edges encode reach distance and elevation gradients. An attention mechanism dynamically re-weights topological edges when a node telemetry signal fails, imputing the missing hydraulic pressure using upstream and downstream physics.',
  datasetRequirements: 'Requires 2 years of continuous 5-minute sampling from at least 45 distributed stream gauge nodes across 3 distinct geomorphological river basins (mountainous, urban canal, alluvial flood plain).',
  expectedResults: 'Forecasting lead time improved to 4.2 hours before peak flood crest with an F1-score of 95.2% and an inference latency under 45 milliseconds per time-step.',
  evaluationMetrics: [
    'Nash-Sutcliffe Efficiency (NSE > 0.90)',
    'Root Mean Squared Error (RMSE)',
    'False Alarm Ratio (FAR < 5%)',
    'Edge Inference Latency (< 50ms)',
    'Packet-Loss Resilience Curve (0% to 50% dropped inputs)'
  ],
  novelty: 'First open-source architecture integrating physics-informed hydraulic operators directly into 4-bit quantized edge microcontrollers with self-healing topology imputation.',
  risks: [
    'Sensor hardware drift under extreme environmental icing or debris blockage.',
    'Insufficient extreme 100-year flood events in training window causing class imbalance.'
  ],
  futureScope: 'Integration with autonomous municipal sluice gates and drone swarm reconnaissance for dynamic topographic elevation adjustments during active inundation.'
};

export const GapIdeaGeneratorView: React.FC = () => {
  const [gaps, setGaps] = useState<GapCard[]>(SAMPLE_GAPS);
  const [selectedGap, setSelectedGap] = useState<GapCard>(gaps[0]);
  const [proposal, setProposal] = useState<ProposalStructure>(INITIAL_PROPOSAL);
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleGenerateProposal = (gap: GapCard) => {
    setSelectedGap(gap);
    setIsGenerating(true);
    setTimeout(() => {
      setProposal({
        ...INITIAL_PROPOSAL,
        title: `Autonomous ${gap.proposedDirection} for Critical Infrastructure Resilience`,
        problemStatement: `Directly addressing the evidence that ${gap.evidence} This project resolves the fundamental vulnerability in ${gap.detectedGap}.`,
        novelty: `Pioneers a systematic framework specifically formulated to overcome ${gap.detectedGap.toLowerCase()} with verified real-world adaptability.`
      });
      setIsGenerating(false);
    }, 800);
  };

  const handleCopyProposal = () => {
    const text = `
RESEARCH PROPOSAL: ${proposal.title}

1. PROBLEM STATEMENT
${proposal.problemStatement}

2. RESEARCH QUESTION
${proposal.researchQuestion}

3. HYPOTHESIS
${proposal.hypothesis}

4. OBJECTIVES
${proposal.objectives.map((o, i) => `${i+1}. ${o}`).join('\n')}

5. PROPOSED METHODOLOGY
${proposal.proposedMethodology}

6. DATASET REQUIREMENTS
${proposal.datasetRequirements}

7. EXPECTED RESULTS
${proposal.expectedResults}

8. EVALUATION METRICS
${proposal.evaluationMetrics.map(m => `• ${m}`).join('\n')}

9. NOVELTY
${proposal.novelty}

10. RISKS & MITIGATION
${proposal.risks.map(r => `⚠ ${r}`).join('\n')}

11. FUTURE SCOPE
${proposal.futureScope}
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
            <Sparkles className="w-4 h-4 text-blue-600" />
            Flagship Ideation Engine • Evidence-Backed Synthesis
          </div>
          <h2 className="text-xl font-bold text-slate-900">
            Research Gap → New Idea & Proposal Generator
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Surface empirical research opportunities extracted across 27+ papers and instantly synthesize formal 11-section research proposals.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopyProposal}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-semibold rounded-xl border border-slate-200 transition-all"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
            {copied ? 'Copied Proposal' : 'Copy Proposal'}
          </button>
        </div>
      </div>

      {/* Part 1: Detected Gaps Section */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <Lightbulb className="w-4 h-4 text-amber-500" />
            Unexplored Research Opportunities Identified in Analyzed Literature
          </h3>
          <span className="text-xs text-slate-400 font-medium">
            Derived from 27 peer-reviewed papers
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {gaps.map((gap) => {
            const isSelected = selectedGap.id === gap.id;
            return (
              <div
                key={gap.id}
                onClick={() => handleGenerateProposal(gap)}
                className={`p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-blue-50/70 border-blue-400 ring-2 ring-blue-500/20 shadow-sm'
                    : 'bg-white border-slate-200 hover:border-slate-300 hover:shadow-sm'
                }`}
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-50 text-rose-700 border border-rose-200">
                      {gap.analyzedRatio}
                    </span>
                    <span className="text-[10px] text-slate-400 font-medium">
                      {gap.domain}
                    </span>
                  </div>

                  <h4 className="text-sm font-bold text-slate-900 leading-snug">
                    {gap.detectedGap}
                  </h4>

                  <p className="text-xs text-slate-600 leading-relaxed bg-white/80 p-2.5 rounded-xl border border-slate-100">
                    <strong className="text-slate-800">Evidence: </strong>
                    {gap.evidence}
                  </p>

                  <div className="text-xs space-y-1 pt-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700 block">
                      Proposed Direction:
                    </span>
                    <p className="text-slate-700 font-medium">
                      {gap.proposedDirection}
                    </p>
                  </div>
                </div>

                <div className="pt-4 mt-3 border-t border-slate-200/60 flex items-center justify-between text-xs">
                  <span className="text-[11px] text-emerald-700 font-semibold">
                    ✓ {gap.expectedBenefit.slice(0, 32)}...
                  </span>
                  <span className="text-blue-600 font-bold flex items-center gap-1">
                    Generate Idea <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Part 2: Generated Research Proposal Document */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-5">
          <div>
            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 uppercase tracking-wider">
              Ready for Grant / Master's Thesis / Publication
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-2.5 leading-tight">
              {proposal.title}
            </h2>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => {
                alert('Downloading Research Proposal as formatted PDF/Markdown...');
              }}
              className="flex items-center gap-1.5 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-xl transition-all shadow-sm"
            >
              <Download className="w-4 h-4" />
              Export Document
            </button>
          </div>
        </div>

        {/* Structured Proposal Grid */}
        <div className="space-y-6 text-xs text-slate-700 leading-relaxed">
          
          {/* Problem & Research Question */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 space-y-1.5">
              <span className="font-bold text-slate-900 uppercase text-[10px] tracking-wider block text-blue-700">
                1. Problem Statement
              </span>
              <p>{proposal.problemStatement}</p>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 space-y-1.5">
              <span className="font-bold text-slate-900 uppercase text-[10px] tracking-wider block text-purple-700">
                2. Research Question
              </span>
              <p>{proposal.researchQuestion}</p>
            </div>
          </div>

          {/* Hypothesis */}
          <div className="p-4 bg-blue-50/50 rounded-xl border border-blue-100 space-y-1.5">
            <span className="font-bold text-blue-900 uppercase text-[10px] tracking-wider block">
              3. Scientific Hypothesis
            </span>
            <p className="font-medium text-blue-950">{proposal.hypothesis}</p>
          </div>

          {/* Objectives */}
          <div className="space-y-2">
            <span className="font-bold text-slate-900 uppercase text-[10px] tracking-wider block">
              4. Research Objectives
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {proposal.objectives.map((obj, i) => (
                <div key={i} className="flex items-start gap-2 p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{obj}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Proposed Methodology & Dataset Requirements */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 space-y-1.5">
              <span className="font-bold text-slate-900 uppercase text-[10px] tracking-wider block text-emerald-700">
                5. Proposed Methodology
              </span>
              <p>{proposal.proposedMethodology}</p>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 space-y-1.5">
              <span className="font-bold text-slate-900 uppercase text-[10px] tracking-wider block text-amber-700">
                6. Dataset Requirements
              </span>
              <p>{proposal.datasetRequirements}</p>
            </div>
          </div>

          {/* Expected Results & Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 space-y-1.5">
              <span className="font-bold text-slate-900 uppercase text-[10px] tracking-wider block">
                7. Expected Results
              </span>
              <p>{proposal.expectedResults}</p>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 space-y-1.5">
              <span className="font-bold text-slate-900 uppercase text-[10px] tracking-wider block">
                8. Evaluation Metrics
              </span>
              <ul className="space-y-1">
                {proposal.evaluationMetrics.map((m, i) => (
                  <li key={i} className="font-semibold text-slate-800">• {m}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Novelty, Risks, Future Scope */}
          <div className="p-4 bg-emerald-50/50 rounded-xl border border-emerald-200 space-y-1.5">
            <span className="font-bold text-emerald-900 uppercase text-[10px] tracking-wider block">
              9. Distinct Academic Novelty
            </span>
            <p className="text-emerald-950 font-medium">{proposal.novelty}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-rose-50/50 rounded-xl border border-rose-100 space-y-1.5">
              <span className="font-bold text-rose-900 uppercase text-[10px] tracking-wider block">
                10. Technical Risks & Vulnerabilities
              </span>
              <ul className="space-y-1 text-rose-950">
                {proposal.risks.map((r, i) => (
                  <li key={i} className="flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 space-y-1.5">
              <span className="font-bold text-slate-900 uppercase text-[10px] tracking-wider block">
                11. Future Scope
              </span>
              <p>{proposal.futureScope}</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

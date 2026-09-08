import React, { useState } from 'react';
import { 
  UserCheck, 
  Sparkles, 
  AlertTriangle, 
  CheckCircle2, 
  XCircle, 
  FileText, 
  ShieldAlert, 
  Award,
  ChevronRight,
  MessageSquare
} from 'lucide-react';
import { ReviewerPersonaFeedback } from '../../types';

const PERSONAS: ReviewerPersonaFeedback[] = [
  {
    persona: 'Reviewer #2 (Critical Reviewer)',
    recommendation: 'Major Revision',
    score: 6.8,
    comments: 'The paper tackles an important domain in edge hydrology, but the claims regarding generalization across uncalibrated catchments are overstated. Furthermore, baseline evaluations lack comparisons against modern physics-informed neural operators.',
    majorIssues: [
      'The experimental evaluation tests only 3 localized river basins. Results cannot be generalized globally without broader multi-basin validation.',
      'Baseline comparison omits recent 2024 Fourier Neural Operator (FNO) implementations, making the empirical superiority claim questionable.'
    ],
    minorIssues: [
      'Equation 4 contains an undefined symbol (γ_attenuation). Please clarify notation.',
      'Figure 3 topology schematic is low-resolution and unreadable in monochrome print.'
    ]
  },
  {
    persona: 'Reviewer #1 (Methodology)',
    recommendation: 'Minor Revision',
    score: 8.0,
    comments: 'The formulation of the Saint-Venant hydraulic conservation loss within the graph operator is theoretically sound and well-derived.',
    majorIssues: [
      'Sensor packet loss is injected synthetically using a uniform random distribution, which does not reflect bursty real-world rain fade.'
    ],
    minorIssues: [
      'Provide details on the microcontroller floating point emulation overhead.',
      'Clarify hyperparameter tuning bounds for the Kalman smoothing factor.'
    ]
  },
  {
    persona: 'Reviewer #3 (Statistics)',
    recommendation: 'Minor Revision',
    score: 7.5,
    comments: 'Statistical methodology is good with 5-fold cross-validation, but error bars and confidence intervals are omitted from Table 2.',
    majorIssues: [
      'Report 95% bootstrap confidence intervals for all F1 and RMSE metrics rather than single point estimates.'
    ],
    minorIssues: [
      'Specify degree of freedom in the Wilcoxon signed-rank test.',
      'Define whether data outliers were clipped prior to normalisation.'
    ]
  },
  {
    persona: 'Reviewer #4 (Novelty)',
    recommendation: 'Accept',
    score: 8.5,
    comments: 'Deploying physics-informed graph operators directly on edge microcontrollers for real-time flood warning is highly original and practically impactful.',
    majorIssues: [
      'Ensure the PyTorch-to-Edge quantization codebase is publicly released with open weights.'
    ],
    minorIssues: [
      'Cite recent NeurIPS 2024 work on TinyML graph compression.'
    ]
  }
];

export const PeerReviewerView: React.FC = () => {
  const [selectedPersonaIdx, setSelectedPersonaIdx] = useState<number>(0);
  const current = PERSONAS[selectedPersonaIdx];

  const overallAcceptanceProb = 68; // 68%

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-rose-600 uppercase tracking-wider mb-1">
            <ShieldAlert className="w-4 h-4 text-rose-600" />
            Autonomous Peer Review Chamber • Multi-Persona Simulation
          </div>
          <h2 className="text-xl font-bold text-slate-900">
            Advanced AI Peer Reviewer (#2 Critical Engine)
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Simulate top-tier conference peer review panels (Methodology, Critical, Statistics, Novelty) before submission to eradicate rejection risks.
          </p>
        </div>

        {/* Acceptance Probability Gauge */}
        <div className="flex items-center gap-3 bg-slate-50 border border-slate-200 p-3 rounded-2xl">
          <div className="text-right">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              Acceptance Probability
            </span>
            <span className="text-lg font-black text-blue-600">{overallAcceptanceProb}%</span>
          </div>
          <div className="w-10 h-10 rounded-full border-4 border-blue-600 border-t-slate-200 flex items-center justify-center font-bold text-xs text-slate-800">
            ★
          </div>
        </div>
      </div>

      {/* Consensus Panel Card */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Consensus Recommendation:
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-black bg-amber-100 text-amber-900 border border-amber-300">
              Major Revision (Tier-1 Journal Target)
            </span>
          </div>
          <div className="flex items-center gap-4 text-xs font-semibold text-slate-600">
            <span>Novelty: <strong className="text-slate-900">7.5 / 10</strong></span>
            <span>Methodology: <strong className="text-slate-900">8.0 / 10</strong></span>
            <span>Clarity: <strong className="text-slate-900">7.0 / 10</strong></span>
            <span>Reproducibility: <strong className="text-slate-900">5.0 / 10</strong></span>
          </div>
        </div>

        {/* Persona Selector Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
          {PERSONAS.map((p, idx) => {
            const isSelected = selectedPersonaIdx === idx;
            return (
              <button
                key={idx}
                onClick={() => setSelectedPersonaIdx(idx)}
                className={`p-3 rounded-xl border text-left transition-all ${
                  isSelected
                    ? 'bg-blue-600 text-white border-blue-700 shadow-sm'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                <div className="text-[10px] font-bold uppercase opacity-80 mb-0.5">
                  Persona 0{idx + 1}
                </div>
                <div className="text-xs font-bold truncate">
                  {p.persona.split(' (')[0]}
                </div>
                <div className={`text-[10px] font-semibold mt-1 ${isSelected ? 'text-blue-100' : 'text-slate-500'}`}>
                  {p.recommendation} • {p.score}/10
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Persona Deep Dive */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold">
              <UserCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                {current.persona}
              </h3>
              <p className="text-xs text-slate-500">
                Official Reviewer Report & Critical Verdict
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 font-semibold">Recommendation:</span>
            <span className={`text-xs font-black px-3 py-1 rounded-lg border ${
              current.recommendation === 'Accept'
                ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                : current.recommendation === 'Minor Revision'
                ? 'bg-blue-50 text-blue-800 border-blue-300'
                : 'bg-amber-50 text-amber-800 border-amber-300'
            }`}>
              {current.recommendation}
            </span>
          </div>
        </div>

        {/* Narrative Comments */}
        <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 text-xs text-slate-700 leading-relaxed italic">
          "{current.comments}"
        </div>

        {/* Major Issues */}
        <div className="space-y-2">
          <h4 className="text-xs font-bold text-rose-700 uppercase tracking-wider flex items-center gap-1.5">
            <XCircle className="w-4 h-4 text-rose-600" /> Major Issues Requiring Resolution (Rejection Hazards)
          </h4>
          <div className="space-y-2">
            {current.majorIssues.map((issue, idx) => (
              <div key={idx} className="p-3 bg-rose-50/60 border border-rose-200 rounded-xl text-xs text-rose-950 flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-rose-200 text-rose-800 font-black text-[10px] flex items-center justify-center shrink-0">
                  {idx + 1}
                </span>
                <span className="leading-snug">{issue}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Minor Issues */}
        <div className="space-y-2">
          <h4 className="text-xs font-bold text-amber-700 uppercase tracking-wider flex items-center gap-1.5">
            <AlertTriangle className="w-4 h-4 text-amber-600" /> Minor Improvements & Clarifications
          </h4>
          <div className="space-y-2">
            {current.minorIssues.map((issue, idx) => (
              <div key={idx} className="p-3 bg-amber-50/50 border border-amber-200 rounded-xl text-xs text-amber-950 flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-amber-200 text-amber-800 font-black text-[10px] flex items-center justify-center shrink-0">
                  {idx + 1}
                </span>
                <span className="leading-snug">{issue}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Automated Rebuttal Draft Generator */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
          <span className="text-xs text-slate-500">
            Need to respond to this reviewer?
          </span>
          <button
            onClick={() => {
              alert('Auto-generating academic rebuttal addressing Reviewer #2 points with evidence...');
            }}
            className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 hover:bg-blue-600 hover:text-white rounded-xl text-xs font-bold transition-all border border-blue-200"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            Generate Point-by-Point Rebuttal Draft
          </button>
        </div>
      </div>
    </div>
  );
};

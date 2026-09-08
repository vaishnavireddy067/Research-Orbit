import React, { useState } from 'react';
import { 
  Compass, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  BookOpen, 
  GraduationCap, 
  Award, 
  Layers,
  Lightbulb,
  Download
} from 'lucide-react';

interface RoadmapStep {
  level: string;
  title: string;
  description: string;
  keyConcepts: string[];
  recommendedPapers: string[];
  status: 'completed' | 'current' | 'upcoming';
  badgeColor: string;
}

const ROADMAPS: Record<string, RoadmapStep[]> = {
  'AI-based Flood Prediction using IoT': [
    {
      level: 'STEP 1: BEGINNER',
      title: 'Mathematical & Programming Foundations',
      description: 'Master linear algebra, numerical calculus, Python scientific libraries (NumPy, SciPy), and time-series manipulations.',
      keyConcepts: ['Time-Series Stationarity', 'Sliding Window Segmentation', 'Signal Denoising (Butterworth Filters)'],
      recommendedPapers: ['Foundations of Time Series Analysis in Environmental Data (2018)'],
      status: 'completed',
      badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200'
    },
    {
      level: 'STEP 2: CLASSICAL ML',
      title: 'Statistical & Ensemble Baselines',
      description: 'Build predictive baselines using Gradient Boosted Trees and Support Vector Regressors to establish baseline benchmarks.',
      keyConcepts: ['Random Forest Regressors', 'XGBoost Feature Importances', '5-Fold Chronological Cross-Validation'],
      recommendedPapers: ['Hansen & Kim (2021) - Statistical Downscaling of Rainfall'],
      status: 'completed',
      badgeColor: 'bg-blue-50 text-blue-700 border-blue-200'
    },
    {
      level: 'STEP 3: DEEP LEARNING',
      title: 'Recurrent & Spatiotemporal Networks',
      description: 'Implement Long Short-Term Memory (LSTM) and Gated Recurrent Units (GRU) to capture temporal stream gauge dependencies.',
      keyConcepts: ['Bidirectional LSTMs', 'Temporal Attention Mechanisms', 'Vanishing Gradient Mitigation'],
      recommendedPapers: ['Al-Mansoor & Vance (2022) - Deep Recurrent Approaches in Hydrology'],
      status: 'completed',
      badgeColor: 'bg-purple-50 text-purple-700 border-purple-200'
    },
    {
      level: 'STEP 4: DOMAIN TELEMETRY',
      title: 'Hydrological Physics & Sensor Fusion',
      description: 'Integrate Saint-Venant shallow water equations with LoRaWAN wireless ultrasonic sensor networks and SAR satellite soil data.',
      keyConcepts: ['Hydrodynamic Wave Propagation', 'LoRaWAN Packet Rain-Attenuation', 'Sentinel-1 SAR Radar Backscatter'],
      recommendedPapers: ['O’Connor et al. (2023) - Multimodal Sensor Fusion for River Basins'],
      status: 'current',
      badgeColor: 'bg-amber-50 text-amber-700 border-amber-200'
    },
    {
      level: 'STEP 5: SOTA ARCHITECTURES',
      title: 'Graph Neural Networks & Neural Operators',
      description: 'Formulate river catchments as topological directed acyclic graphs using Fourier Neural Operators and Spatiotemporal GCNs.',
      keyConcepts: ['Spatiotemporal GCNs (ST-GCN)', 'Fourier Neural Operators (FNO)', 'Physics-Informed Loss Gradients (PINN)'],
      recommendedPapers: ['Chen et al. (2024) - Real-Time IoT Flood Prediction via Edge GCN'],
      status: 'upcoming',
      badgeColor: 'bg-indigo-50 text-indigo-700 border-indigo-200'
    },
    {
      level: 'STEP 6: CURRENT GAPS',
      title: 'Unexplored Frontier Gaps',
      description: 'Address real-time edge microcontroller constraints and sensor dropout failure during active severe flooding events.',
      keyConcepts: ['Edge INT4 Model Quantization', 'Self-Healing Topology Imputation', 'Decentralized Edge Consensus'],
      recommendedPapers: ['Identified Research Gap: 14/20 papers lack edge streaming resilience'],
      status: 'upcoming',
      badgeColor: 'bg-rose-50 text-rose-700 border-rose-200'
    },
    {
      level: 'STEP 7: FLAGSHIP TOPIC',
      title: 'Proposed Major Project / Thesis Direction',
      description: 'HydroEdge-GNN: A Self-Healing Edge Spatiotemporal Graph Neural Operator for Flash-Flood Prediction Under Sensor Dropout.',
      keyConcepts: ['Novelty: First edge-deployable physics-informed graph operator', 'Impact: 95.8% precision at <40ms latency'],
      recommendedPapers: ['Synthesized Formal Research Proposal (ResearchPilot Generated)'],
      status: 'upcoming',
      badgeColor: 'bg-emerald-500 text-white border-emerald-600'
    }
  ],
  'Medical AI & Imaging Diagnostics': [
    {
      level: 'STEP 1: BEGINNER',
      title: 'Computer Vision & Biomedical Foundations',
      description: 'Study DICOM/NIfTI medical image processing, radiological anatomy, and convolutional spatial filters.',
      keyConcepts: ['DICOM Hounsfield Units', 'Slice Normalization', 'Spatial Transformations'],
      recommendedPapers: ['Biomedical Image Processing Fundamentals (2019)'],
      status: 'completed',
      badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200'
    },
    {
      level: 'STEP 2: DEEP LEARNING',
      title: 'U-Net & Segmentation Paradigms',
      description: 'Implement encoder-decoder skip connection architectures for precise organ and lesion boundary delineation.',
      keyConcepts: ['U-Net Architecture', 'Dice Similarity Loss', 'Focal Loss for Small Tumors'],
      recommendedPapers: ['Ronneberger et al. - U-Net: Convolutional Networks for Biomedical Segmentation'],
      status: 'completed',
      badgeColor: 'bg-blue-50 text-blue-700 border-blue-200'
    },
    {
      level: 'STEP 3: ADVANCED FRONTIER',
      title: 'Medical Vision Transformers & Multimodal LLMs',
      description: 'Cross-attention between radiological scans and clinical pathology notes for diagnostic report generation.',
      keyConcepts: ['Swin UNETR', 'BiomedCLIP', 'Clinical LLM Hallucination Safeguards'],
      recommendedPapers: ['Recent Med-PaLM & BioGPT Surveys (2024)'],
      status: 'current',
      badgeColor: 'bg-purple-50 text-purple-700 border-purple-200'
    }
  ]
};

export const ResearchRoadmapView: React.FC = () => {
  const [activeDomain, setActiveDomain] = useState<string>('AI-based Flood Prediction using IoT');
  const steps = ROADMAPS[activeDomain] || ROADMAPS['AI-based Flood Prediction using IoT'];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-blue-600 uppercase tracking-wider mb-1">
            <Compass className="w-4 h-4 text-blue-600" />
            Curriculum & Academic Navigator • Student to Researcher Journey
          </div>
          <h2 className="text-xl font-bold text-slate-900">
            Personalized Research Roadmap
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Structured step-by-step pathway from foundational theory to state-of-the-art architectures and novel thesis topics.
          </p>
        </div>

        {/* Domain Selector */}
        <div className="flex items-center gap-2">
          <select
            value={activeDomain}
            onChange={(e) => setActiveDomain(e.target.value)}
            className="bg-slate-50 border border-slate-200 text-slate-800 text-xs font-bold rounded-xl px-3 py-2 focus:outline-none"
          >
            <option value="AI-based Flood Prediction using IoT">AI-based Flood Prediction using IoT</option>
            <option value="Medical AI & Imaging Diagnostics">Medical AI & Imaging Diagnostics</option>
          </select>

          <button
            onClick={() => alert('Exporting Roadmap to PDF / Study Schedule...')}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-slate-900 text-white rounded-xl text-xs font-semibold hover:bg-slate-800 transition-all shadow-sm"
          >
            <Download className="w-3.5 h-3.5" />
            Export Plan
          </button>
        </div>
      </div>

      {/* Roadmap Vertical Stepper */}
      <div className="space-y-4">
        {steps.map((step, idx) => {
          const isCurrent = step.status === 'current';
          const isCompleted = step.status === 'completed';

          return (
            <div
              key={idx}
              className={`bg-white rounded-2xl p-6 border transition-all space-y-3 relative overflow-hidden ${
                isCurrent
                  ? 'border-blue-400 ring-2 ring-blue-500/20 shadow-md'
                  : 'border-slate-200 shadow-sm'
              }`}
            >
              {/* Stepper Node Line */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className={`w-8 h-8 rounded-xl font-black text-xs flex items-center justify-center shrink-0 ${
                    isCompleted
                      ? 'bg-emerald-100 text-emerald-800'
                      : isCurrent
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'bg-slate-100 text-slate-500'
                  }`}>
                    {isCompleted ? '✓' : idx + 1}
                  </span>

                  <div>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${step.badgeColor}`}>
                      {step.level}
                    </span>
                    <h3 className="text-base font-bold text-slate-900 mt-1">
                      {step.title}
                    </h3>
                  </div>
                </div>

                {isCurrent && (
                  <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200 animate-pulse self-start sm:self-center">
                    ★ Active Learning Focus
                  </span>
                )}
              </div>

              <p className="text-xs text-slate-600 pl-11 leading-relaxed">
                {step.description}
              </p>

              {/* Concepts & Recommended Literature */}
              <div className="pl-11 grid grid-cols-1 md:grid-cols-2 gap-3 pt-2 text-xs">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                    Key Mastery Concepts
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {step.keyConcepts.map((kc, i) => (
                      <span key={i} className="text-[11px] font-medium bg-white px-2 py-0.5 rounded border border-slate-200 text-slate-700">
                        {kc}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                    Recommended Reading
                  </span>
                  <ul className="space-y-1 text-slate-700 font-semibold text-[11px]">
                    {step.recommendedPapers.map((paper, i) => (
                      <li key={i} className="flex items-center gap-1.5">
                        <BookOpen className="w-3 h-3 text-blue-600 shrink-0" />
                        <span className="truncate">{paper}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

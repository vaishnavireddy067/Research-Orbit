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
import { PaperAnalysis } from '../../types';
import { NavTab } from '../Sidebar';
import { EmptyWorkspaceState } from '../EmptyWorkspaceState';

interface RoadmapStep {
  level: string;
  title: string;
  description: string;
  keyConcepts: string[];
  recommendedPapers: string[];
  status: 'completed' | 'current' | 'upcoming';
  badgeColor: string;
}

const buildRoadmapForPaper = (paper: PaperAnalysis): RoadmapStep[] => {
  const domain = paper.domain || 'Computer Science & Artificial Intelligence';
  const title = paper.title;
  const risks = paper.risks || [];

  return [
    {
      level: 'STEP 1: BEGINNER',
      title: `Mathematical & Theoretical Foundations of ${domain}`,
      description: 'Master core linear algebra, probability, loss function optimization, and canonical baseline paradigms.',
      keyConcepts: ['Foundational Mathematics', 'Empirical Loss Gradients', 'Statistical Preprocessing & Normalization'],
      recommendedPapers: [`Foundations of ${domain} (Foundational Literature)`],
      status: 'completed',
      badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200'
    },
    {
      level: 'STEP 2: CLASSICAL BASELINES',
      title: 'Statistical & Algorithmic Baselines',
      description: 'Implement classical baseline models and benchmark pipelines to evaluate empirical progress.',
      keyConcepts: ['Baseline Comparison Metrics', 'Cross-Validation Protocols', 'Standard Evaluation Corpora'],
      recommendedPapers: ['Canonical Benchmark Studies in ' + domain],
      status: 'completed',
      badgeColor: 'bg-blue-50 text-blue-700 border-blue-200'
    },
    {
      level: 'STEP 3: CONTEMPORARY SOTA',
      title: `Deep Architectural Paradigms in ${domain}`,
      description: 'Explore state-of-the-art representations, attention mechanisms, and deep architectures.',
      keyConcepts: ['Representation Learning', 'Multi-Task Optimization', 'Feature Inductive Biases'],
      recommendedPapers: [title],
      status: 'completed',
      badgeColor: 'bg-purple-50 text-purple-700 border-purple-200'
    },
    {
      level: 'STEP 4: ACTIVE STUDY',
      title: `Analysis of "${title}"`,
      description: 'Dissect the core methodological contributions, dataset requirements, and empirical claims of your active paper.',
      keyConcepts: ['Ablation Analysis', 'Dataset Preprocessing', 'Experimental Reproducibility'],
      recommendedPapers: [title],
      status: 'current',
      badgeColor: 'bg-amber-50 text-amber-700 border-amber-200'
    },
    {
      level: 'STEP 5: CRITICAL AUDIT',
      title: 'Stress-Testing Limitations & Vulnerabilities',
      description: 'Evaluate identified failure scenarios, data distribution drift, and reviewer traps.',
      keyConcepts: [risks[0] || 'Out-of-distribution drift', 'Hyperparameter sensitivity', 'Ablation rigor'],
      recommendedPapers: ['Peer Review Critiques & Rebuttals'],
      status: 'upcoming',
      badgeColor: 'bg-rose-50 text-rose-700 border-rose-200'
    },
    {
      level: 'STEP 6: RESEARCH EXTENSION',
      title: 'Formulating Next-Gen Research Directions',
      description: 'Synthesize unexplored white spaces into a novel, defensible thesis proposal or conference manuscript.',
      keyConcepts: ['Novelty Formulation', 'Empirical Significance Bounds', 'Camera-Ready Paper Writing'],
      recommendedPapers: [`Proposed Extension Framework for ${title}`],
      status: 'upcoming',
      badgeColor: 'bg-emerald-500 text-white border-emerald-600'
    }
  ];
};

interface ResearchRoadmapViewProps {
  paper?: PaperAnalysis | null;
  onNavigate?: (tab: NavTab) => void;
  isDarkMode?: boolean;
}

export const ResearchRoadmapView: React.FC<ResearchRoadmapViewProps> = ({
  paper,
  onNavigate,
  isDarkMode = true,
}) => {
  if (!paper) {
    return (
      <div className="space-y-6 pb-12 animate-fadeIn">
        <EmptyWorkspaceState
          title="No Manuscript Loaded for Research Roadmap"
          description="Upload a research manuscript (PDF) or import papers from arXiv to generate a personalized mastery roadmap from foundational theory to state-of-the-art breakthrough architectures."
          onNavigate={onNavigate}
          isDarkMode={isDarkMode}
        />
      </div>
    );
  }

  const steps = buildRoadmapForPaper(paper);

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

        {/* Domain Badge & Export Button */}
        <div className="flex items-center gap-2">
          <span className="bg-blue-50 border border-blue-200 text-blue-800 text-xs font-bold rounded-xl px-3 py-2">
            {paper.domain || 'Computer Science & AI'}
          </span>

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

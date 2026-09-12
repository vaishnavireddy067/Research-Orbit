import React, { useState, useRef, useEffect } from 'react';
import { 
  Sparkles, 
  Bot, 
  Send, 
  MessageSquare, 
  Compass, 
  Layers, 
  Lightbulb, 
  CheckCircle2, 
  AlertTriangle, 
  ArrowRight, 
  Copy, 
  Check, 
  RotateCcw, 
  FileText, 
  ShieldAlert, 
  Target, 
  Cpu, 
  Zap, 
  BookOpen,
  Loader2,
  Sliders,
  Radio,
  Dna,
  FileCode2,
  Flame,
  HelpCircle,
  ExternalLink,
  ChevronRight,
  Crosshair,
  Radar
} from 'lucide-react';
import { 
  PaperAnalysis, 
  ResearchIdeaAudit, 
  UniquenessPivot, 
  ObjectiveItem, 
  CopilotMessage,
  IdeaMutation,
  RedTeamCritique,
  CollisionPoint,
  LaTeXExportBundle
} from '../../types';
import { api } from '../../services/api';

interface AiAssistantViewProps {
  paper?: PaperAnalysis;
}

const DEFAULT_SAMPLE_AUDIT: ResearchIdeaAudit = {
  ideaTitle: 'Physics-Constrained Spatiotemporal Graph Operators for Distributed Early Surge Forecasting',
  domain: 'Hydrology & Edge IoT AI',
  status: 'PARTIAL_OVERLAP',
  statusSummary: '🔄 Partial Overlap Identified: Supervised spatiotemporal graph networks are widely explored in modern literature (70+ papers), but deploying them with physical conservation laws onto low-power MCU edge gateways with dropout telemetry remains an open research white-space.',
  noveltyScore: 78,
  saturationPercentage: 45,
  existingPatterns: [
    {
      patternName: 'Static Centralized Recurrent Weather Radar Forecasting (LSTM / GRU)',
      prevalence: 'Dominant paradigm across 2018–2023 studies',
      description: 'Training deep neural networks on historical multi-hour radar grids without streaming edge sensor telemetry.',
      representativeWorks: ['Vaswani et al., 2017', 'Chen et al., IEEE TPAMI 2021', 'Hochreiter et al., 1997'],
      whyItSaturates: 'High reporting latency (4+ hours) and failure to account for localized flash-flood cloudbursts.'
    },
    {
      patternName: 'Empirical Heuristic Node Imputation without Physical Invariants',
      prevalence: 'Present in ~60% of existing spatial GNN papers',
      description: 'Imputing missing sensor readings purely via statistical mean/k-NN interpolation when sensors disconnect.',
      representativeWorks: ['Spatial-Temporal GNN Benchmark Suite (2022–2024)'],
      whyItSaturates: 'Violates hydraulic conservation of mass, generating physically impossible flood crest predictions.'
    }
  ],
  uniquenessPivots: [
    {
      angle: 'Physics-Informed Conservation Loss (Saint-Venant Constraints)',
      differentiationStrategy: 'Inject differential hydraulic conservation of mass directly as a penalty into gradient backpropagation, guaranteeing physically realistic flows.',
      expectedImpact: 'Eliminates 92% of non-physical hallucinated surges and reduces sample complexity 4x.',
      noveltyGain: '+35% Novelty (Pioneering Edge)',
      implementationHint: 'Integrate PINN (Physics-Informed Neural Networks) PDE loss directly inside PyTorch training loops.'
    },
    {
      angle: 'Quantized Edge Deployment with Dynamic Topology Pruning',
      differentiationStrategy: 'Quantize the graph operator to 4-bit INT4 weights and deploy directly onto solar-powered microcontrollers with sub-10W power draw.',
      expectedImpact: 'Decentralized real-time flood alerting with under 35ms latency even during regional power blackout.',
      noveltyGain: '+28% Practical Novelty (Industry Ready)',
      implementationHint: 'Compile via TensorRT-LLM and ONNX runtime for ARM Cortex-M edge micro-gateways.'
    },
    {
      angle: 'Self-Healing Topological Dropout Routing',
      differentiationStrategy: 'Formulate an attention mechanism that dynamically rewires the river graph adjacency matrix when upstream probes go offline during severe storms.',
      expectedImpact: 'Maintains >94% forecast accuracy even when 35% of terrestrial ultrasonic probes disconnect.',
      noveltyGain: '+30% Academic Distinction',
      implementationHint: 'Formulate Bayesian Dropout uncertainty estimation with dynamic graph topology re-weighting.'
    }
  ],
  researchObjectives: {
    primaryObjective: 'Formulate, implement, and empirically validate an edge-deployable physics-constrained spatiotemporal graph operator that achieves sub-hour flood warning with packet-loss resilience.',
    subObjectives: [
      {
        code: 'O1',
        title: 'Benchmark Dataset & Telemetry Dropout Taxonomy',
        description: 'Curate a multi-basin hydrological streaming dataset combining USGS gauges and low-cost LoRa ultrasonic sensors with documented outage patterns.',
        deliverable: 'Open-access benchmark corpus with synthetic & empirical dropouts (10% to 50%).',
        milestoneWeeks: 'Weeks 1–4'
      },
      {
        code: 'O2',
        title: 'Formulation of Physics-Constrained Graph Operator',
        description: 'Design the neural architecture embedding Saint-Venant hydraulic conservation constraints and dynamic topology rewiring into the loss function.',
        deliverable: 'Mathematical convergence proof & modular PyTorch implementation.',
        milestoneWeeks: 'Weeks 5–8'
      },
      {
        code: 'O3',
        title: 'Empirical SOTA Ablation & Resilience Benchmarking',
        description: 'Conduct extensive ablation experiments comparing HydroEdge against baseline LSTM, XGBoost, and standard GNNs under 35% packet-loss stress tests.',
        deliverable: 'Pareto-frontier accuracy vs. latency tables and statistical significance proofs (p < 0.001).',
        milestoneWeeks: 'Weeks 9–12'
      },
      {
        code: 'O4',
        title: 'Hardware Edge Deployment & Real-World Pilot Test',
        description: 'Flash quantized INT4 operator onto ARM Cortex-M microcontrollers and test real-time stream processing on an active municipal canal testbed.',
        deliverable: 'Reproducible GitHub repository, model weights, and camera-ready manuscript ready for NeurIPS / IEEE.',
        milestoneWeeks: 'Weeks 13–16'
      }
    ],
    hypothesis: 'Embedding differential Saint-Venant hydraulic constraints into spatiotemporal graph operators will sustain >90% peak surge accuracy under 35% telemetry dropout where conventional deep learning models degrade below 60%.',
    evaluationMetrics: [
      'Nash-Sutcliffe Efficiency (NSE > 0.90)',
      'Peak Surge Arrival Lead Time (> 3.5 hours advance notice)',
      'Dropout Robustness Curve (0% to 50% dropped probes)',
      'Edge Microcontroller Latency (< 50ms per time step)'
    ]
  },
  recommendedNextStep: 'Draft the formal mathematical formulation of the hydraulic conservation loss term (O2) and benchmark baseline LSTM failure modes on USGS dataset.'
};

const DEFAULT_COLLISION_POINTS: CollisionPoint[] = [
  { id: 'cp-1', name: 'Standard SOTA LSTM / GRU (2018)', x: 25, y: 35, type: 'CONGESTED_CLUSTER', description: 'Over-congested cluster: 100+ papers using standard recurrent networks on static radar datasets.', overlapPercentage: 88 },
  { id: 'cp-2', name: 'Spatial GNN Baseline (2022)', x: 45, y: 55, type: 'SOTA_PAPER', description: 'Graph Convolutional Networks without physics conservation constraints.', overlapPercentage: 62 },
  { id: 'cp-3', name: 'Transformer Cloud Inference (2023)', x: 65, y: 30, type: 'SOTA_PAPER', description: 'Quadratic attention requiring 8x A100 GPUs, impossible for field deployment.', overlapPercentage: 45 },
  { id: 'cp-4', name: 'Your Proposed Formulation', x: 88, y: 82, type: 'USER_PROPOSAL', description: 'Uncontested territory: Physics-informed loss + 4-bit edge MCU quantization.', overlapPercentage: 14 },
  { id: 'cp-5', name: 'Future Quantum-Neuromorphic Space', x: 92, y: 95, type: 'UNCONTESTED_SPACE', description: 'Completely unaddressed blue-ocean research direction.', overlapPercentage: 0 },
];

const PRESET_IDEAS = [
  {
    label: 'LSTM for Stock Prediction',
    idea: 'Using bidirectional LSTM with technical indicators to predict stock market prices.',
    domain: 'Quantitative Finance / AI'
  },
  {
    label: 'Edge Flood Forecasting',
    idea: 'Physics-informed spatiotemporal graph neural operators on low-power edge microcontrollers for real-time flood warning.',
    domain: 'Hydrology & Edge IoT AI'
  },
  {
    label: 'Low-Resource Medical Imaging',
    idea: 'Multi-modal Mixture-of-Experts with self-supervised contrastive learning for low-resource clinical radiology diagnostics.',
    domain: 'Medical AI / Healthcare'
  },
  {
    label: 'Automated Formal Verification',
    idea: 'Causal neuro-symbolic reinforcement learning agents for automated formal verification of smart contract bytecode.',
    domain: 'Formal Verification & AI'
  }
];

export const AiAssistantView: React.FC<AiAssistantViewProps> = ({ paper }) => {
  type CopilotTab = 'audit' | 'mutator' | 'radar' | 'redteam' | 'latex' | 'chat';
  const [activeMode, setActiveMode] = useState<CopilotTab>('audit');
  
  // Idea Audit State
  const [ideaInput, setIdeaInput] = useState('');
  const [domainInput, setDomainInput] = useState('Computer Science / AI');
  const [isAuditing, setIsAuditing] = useState(false);
  const [auditResult, setAuditResult] = useState<ResearchIdeaAudit>(DEFAULT_SAMPLE_AUDIT);
  const [copiedObjectives, setCopiedObjectives] = useState(false);

  // Mutator Lab State
  const [noveltyPressure, setNoveltyPressure] = useState(85);
  const [computeConstraint, setComputeConstraint] = useState('Edge / Low-Power MCU');
  const [isMutating, setIsMutating] = useState(false);
  const [mutations, setMutations] = useState<IdeaMutation[]>([]);
  const [hasMutated, setHasMutated] = useState(false);

  // Red Team State
  const [isRedTeaming, setIsRedTeaming] = useState(false);
  const [redTeamCritique, setRedTeamCritique] = useState<RedTeamCritique | null>(null);

  // LaTeX & Code State
  const [latexBundle, setLatexBundle] = useState<LaTeXExportBundle>(() => api.generateLaTeXBundle(DEFAULT_SAMPLE_AUDIT));
  const [activeCodeTab, setActiveCodeTab] = useState<'abstract' | 'objectives' | 'pytorch' | 'grant'>('abstract');
  const [copiedCode, setCopiedCode] = useState(false);

  // Chat Mode State
  const [chatMessages, setChatMessages] = useState<CopilotMessage[]>([
    {
      id: 'welcome-1',
      role: 'assistant',
      content: `Hello! I am your **ResearchPilot Copilot**. 

I specialize in **research ideation, prior-art existence checks, genetic idea mutation, and red-team stress testing**:
1. **Idea Existence Check**: Tell me your idea, and I will cross-reference it against literature to tell you if the patterns already exist.
2. **Guidance to Uniqueness**: If common patterns exist, I will help you mutate the concept into an uncontested novel direction.
3. **Clear Research Objectives**: I will generate structured, milestone-driven objectives (O1 to O4) with concrete deliverables.
4. **Devil's Advocate Reviewer**: I can stress-test your hypothesis and predict Reviewer #2 rejection attacks before submission!

How can I partner with you today? You can test an idea or ask in English or Telugu!`,
      timestamp: 'Just now'
    }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [isChatLoading, setIsChatLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages, isChatLoading]);

  // Sync LaTeX bundle when audit changes
  useEffect(() => {
    setLatexBundle(api.generateLaTeXBundle(auditResult));
  }, [auditResult]);

  // Handle Idea Audit
  const handleRunAudit = async (customIdea?: string, customDomain?: string) => {
    const textToAudit = customIdea || ideaInput;
    if (!textToAudit.trim()) return;

    setIsAuditing(true);
    try {
      const result = await api.auditIdeaCopilot(
        textToAudit,
        customDomain || domainInput,
        paper ? `${paper.title}: ${paper.summary}` : undefined
      );
      setAuditResult(result);
      setChatMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          role: 'user',
          content: `Audit this research idea: "${textToAudit}" (${customDomain || domainInput})`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        },
        {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: `### 🔍 Audit Complete for: "${result.ideaTitle}"\n\n**Verdict**: ${result.statusSummary}\n\n**Novelty Score**: ${result.noveltyScore}/100 | **Saturation**: ${result.saturationPercentage}%\n\nI have generated ${result.existingPatterns.length} existing literature patterns, ${result.uniquenessPivots.length} uniqueness pivots, and 4 structured research objectives (O1–O4)!`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          auditResult: result
        }
      ]);
    } catch (err) {
      console.error('Audit failed:', err);
    } finally {
      setIsAuditing(false);
    }
  };

  // Handle Idea Mutation Lab
  const handleRunMutator = async () => {
    const targetIdea = ideaInput.trim() || auditResult.ideaTitle;
    setIsMutating(true);
    try {
      const res = await api.mutateIdea(targetIdea, domainInput, noveltyPressure, computeConstraint);
      setMutations(res.mutations);
      setHasMutated(true);
    } catch (err) {
      console.error('Mutator error:', err);
    } finally {
      setIsMutating(false);
    }
  };

  // Handle Red Team Stress Test
  const handleRunRedTeam = async () => {
    const targetIdea = ideaInput.trim() || auditResult.ideaTitle;
    setIsRedTeaming(true);
    try {
      const res = await api.redTeamStressTest(
        targetIdea,
        auditResult.researchObjectives.hypothesis,
        auditResult.researchObjectives.primaryObjective
      );
      setRedTeamCritique(res);
    } catch (err) {
      console.error('Red team error:', err);
    } finally {
      setIsRedTeaming(false);
    }
  };

  // Handle Chat Message
  const handleSendChat = async (presetText?: string) => {
    const text = presetText || chatInput;
    if (!text.trim() || isChatLoading) return;

    const userMsg: CopilotMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatMessages((prev) => [...prev, userMsg]);
    if (!presetText) setChatInput('');
    setIsChatLoading(true);

    try {
      const history = chatMessages.map((m) => ({ role: m.role, content: m.content }));
      const res = await api.copilotChat(
        text,
        history,
        auditResult.ideaTitle,
        paper ? `${paper.title}: ${paper.summary}` : undefined
      );

      const assistantMsg: CopilotMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: res.reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setChatMessages((prev) => [...prev, assistantMsg]);
    } catch (err: any) {
      const errorMsg: CopilotMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `Error receiving response from research copilot: ${err.message || 'Network error'}. Please retry.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setChatMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsChatLoading(false);
    }
  };

  const handleCopyCode = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleCopyObjectives = () => {
    const text = `
RESEARCH OBJECTIVES: ${auditResult.ideaTitle}
Domain: ${auditResult.domain}
Status: ${auditResult.status} (Novelty Score: ${auditResult.noveltyScore}/100)

PRIMARY OBJECTIVE:
${auditResult.researchObjectives.primaryObjective}

HYPOTHESIS:
${auditResult.researchObjectives.hypothesis}

SUB-OBJECTIVES:
${auditResult.researchObjectives.subObjectives.map(o => `[${o.code}] ${o.title} (${o.milestoneWeeks})\n- Description: ${o.description}\n- Deliverable: ${o.deliverable}`).join('\n\n')}

EVALUATION METRICS:
${auditResult.researchObjectives.evaluationMetrics.map(m => `• ${m}`).join('\n')}

RECOMMENDED IMMEDIATE ACTION:
${auditResult.recommendedNextStep}
    `.trim();

    navigator.clipboard.writeText(text);
    setCopiedObjectives(true);
    setTimeout(() => setCopiedObjectives(false), 2000);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto font-sans pb-12">
      
      {/* Top Banner & Flagship Navigation Switcher */}
      <div className="bg-[#0b1329] border border-[#1e293b] rounded-2xl p-5 sm:p-6 shadow-xl relative overflow-hidden">
        {/* Ambient Glows */}
        <div className="absolute -top-16 -right-16 w-72 h-72 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-72 h-72 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-blue-400 uppercase tracking-wider mb-1.5">
              <Sparkles className="w-4 h-4 text-blue-400 animate-pulse" />
              AI Research Intelligence & Flagship Uniqueness Copilot
              <span className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-300 border border-blue-500/30 px-2 py-0.5 rounded-full text-[10px] font-mono">
                5 Flagship AI Engines Active
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Detect Patterns, Mutate Ideas & Conquer Unclaimed White-Space
            </h1>
            <p className="text-xs text-slate-400 mt-1 max-w-3xl leading-relaxed">
              If an idea already exists in published literature, our AI will explicitly alert you, breakdown existing patterns, mutate the concept into breakthrough territory, stress-test it against Reviewer #2, and output Overleaf-ready LaTeX and objectives.
            </p>
          </div>

          {/* Navigation Bar across all 6 Capabilities */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-[#060b19] border border-slate-800 rounded-xl shrink-0 self-start xl:self-auto">
            <button
              onClick={() => setActiveMode('audit')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeMode === 'audit'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <Compass className="w-3.5 h-3.5" />
              <span>Idea Scanner</span>
            </button>

            <button
              onClick={() => {
                setActiveMode('mutator');
                if (!hasMutated) handleRunMutator();
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeMode === 'mutator'
                  ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <Dna className="w-3.5 h-3.5 text-pink-400" />
              <span>Genetic Mutator</span>
            </button>

            <button
              onClick={() => setActiveMode('radar')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeMode === 'radar'
                  ? 'bg-cyan-600 text-white shadow-md shadow-cyan-600/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <Radar className="w-3.5 h-3.5 text-cyan-300" />
              <span>White-Space Radar</span>
            </button>

            <button
              onClick={() => {
                setActiveMode('redteam');
                if (!redTeamCritique) handleRunRedTeam();
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeMode === 'redteam'
                  ? 'bg-rose-600 text-white shadow-md shadow-rose-600/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />
              <span>Devil's Advocate</span>
            </button>

            <button
              onClick={() => setActiveMode('latex')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeMode === 'latex'
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <FileCode2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>LaTeX / Code</span>
            </button>

            <button
              onClick={() => setActiveMode('chat')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeMode === 'chat'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Copilot Chat</span>
            </button>
          </div>
        </div>

        {/* Paper Context Badge if available */}
        {paper && (
          <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
            <div className="flex items-center gap-2 truncate">
              <BookOpen className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
              <span>Active Manuscript Context:</span>
              <span className="font-semibold text-slate-200 truncate max-w-md">{paper.title}</span>
            </div>
            <span className="text-[10px] text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">
              Context Synced
            </span>
          </div>
        )}
      </div>

      {/* TAB 1: IDEA SCANNER & UNIQUENESS ENGINE */}
      {activeMode === 'audit' && (
        <div className="space-y-6">
          
          {/* Input & Scanner Form */}
          <div className="bg-[#0b1329] border border-[#1e293b] rounded-2xl p-5 sm:p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4 text-blue-400" />
                <h3 className="text-sm font-bold text-white">
                  Enter Your Research Idea, Hypothesis, or Keyword
                </h3>
              </div>
              <span className="text-[11px] text-slate-400">
                Powered by Groq LLaMA 3.3 70B Versatile
              </span>
            </div>

            {/* Input Row */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-3">
              <div className="lg:col-span-3">
                <textarea
                  rows={2}
                  value={ideaInput}
                  onChange={(e) => setIdeaInput(e.target.value)}
                  placeholder="e.g., Using graph neural networks with causal invariance constraints for low-power edge flood prediction..."
                  className="w-full bg-[#060b19] border border-slate-800 rounded-xl p-3 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors resize-none"
                />
              </div>
              <div className="flex flex-col justify-between gap-2">
                <select
                  value={domainInput}
                  onChange={(e) => setDomainInput(e.target.value)}
                  className="w-full bg-[#060b19] border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-blue-500"
                >
                  <option value="Computer Science / AI">Computer Science / AI</option>
                  <option value="NLP & Large Language Models">NLP & LLMs</option>
                  <option value="Computer Vision & Robotics">Computer Vision & Robotics</option>
                  <option value="Healthcare & Bioinformatics">Healthcare & Bio AI</option>
                  <option value="Hydrology & Edge IoT AI">Hydrology & Edge IoT</option>
                  <option value="Quantitative Finance & Economics">Quantitative Finance</option>
                  <option value="Cybersecurity & Network Systems">Cybersecurity</option>
                </select>

                <button
                  onClick={() => handleRunAudit()}
                  disabled={isAuditing || !ideaInput.trim()}
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-blue-600/20 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {isAuditing ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Checking Literature Collisions...</span>
                    </>
                  ) : (
                    <>
                      <Zap className="w-4 h-4 text-yellow-300" />
                      <span>Audit Novelty & Objectives</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Quick Preset Ideas Chips */}
            <div className="pt-2 border-t border-slate-800/60 flex flex-wrap items-center gap-2">
              <span className="text-[11px] text-slate-400 font-medium">Try quick test ideas:</span>
              {PRESET_IDEAS.map((preset) => (
                <button
                  key={preset.label}
                  onClick={() => {
                    setIdeaInput(preset.idea);
                    setDomainInput(preset.domain);
                    handleRunAudit(preset.idea, preset.domain);
                  }}
                  className="px-2.5 py-1 rounded-lg bg-[#060b19] border border-slate-800 text-slate-300 hover:border-blue-500 hover:text-blue-300 text-[11px] transition-colors"
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>

          {/* Audit Results Dashboard */}
          <div className="space-y-6">
            
            {/* Status & Novelty Meter Header Card */}
            <div className={`p-5 sm:p-6 rounded-2xl border transition-all ${
              auditResult.status === 'EXISTS_IN_LITERATURE'
                ? 'bg-rose-950/20 border-rose-900/60 shadow-lg shadow-rose-950/20'
                : auditResult.status === 'PARTIAL_OVERLAP'
                ? 'bg-blue-950/20 border-blue-900/60 shadow-lg shadow-blue-950/20'
                : 'bg-emerald-950/20 border-emerald-900/60 shadow-lg shadow-emerald-950/20'
            }`}>
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                      auditResult.status === 'EXISTS_IN_LITERATURE'
                        ? 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                        : auditResult.status === 'PARTIAL_OVERLAP'
                        ? 'bg-blue-500/20 text-blue-300 border-blue-500/40'
                        : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                    }`}>
                      {auditResult.status === 'EXISTS_IN_LITERATURE'
                        ? '⚠️ Prior Art Saturated in Literature'
                        : auditResult.status === 'PARTIAL_OVERLAP'
                        ? '🔄 Partial Literature Overlap'
                        : '✨ Novel Frontier (Open White-Space)'}
                    </span>
                    <span className="text-xs text-slate-400 font-mono">
                      Domain: {auditResult.domain}
                    </span>
                  </div>

                  <h2 className="text-lg sm:text-xl font-extrabold text-white leading-tight">
                    {auditResult.ideaTitle}
                  </h2>

                  <p className="text-xs text-slate-300 leading-relaxed max-w-3xl">
                    {auditResult.statusSummary}
                  </p>
                </div>

                {/* Quantitative Metric Gauges */}
                <div className="flex items-center gap-4 bg-[#060b19] border border-slate-800/80 p-3.5 rounded-xl shrink-0">
                  <div className="text-center px-2">
                    <div className="text-[10px] text-slate-400 uppercase font-semibold">Novelty Score</div>
                    <div className={`text-2xl font-black ${
                      auditResult.noveltyScore >= 70 ? 'text-emerald-400' : auditResult.noveltyScore >= 45 ? 'text-blue-400' : 'text-rose-400'
                    }`}>
                      {auditResult.noveltyScore}/100
                    </div>
                    <div className="text-[9px] text-slate-500">Peer Review Viability</div>
                  </div>

                  <div className="h-10 w-px bg-slate-800" />

                  <div className="text-center px-2">
                    <div className="text-[10px] text-slate-400 uppercase font-semibold">Literature Saturation</div>
                    <div className="text-2xl font-black text-amber-400">
                      {auditResult.saturationPercentage}%
                    </div>
                    <div className="text-[9px] text-slate-500">Pattern Density</div>
                  </div>
                </div>
              </div>
            </div>

            {/* 1. EXISTING PATTERNS SECTION ("aa patterns unte unai ani chpli") */}
            <div className="bg-[#0b1329] border border-[#1e293b] rounded-2xl p-5 sm:p-6 shadow-xl space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
                <div className="flex items-center gap-2">
                  <ShieldAlert className="w-4 h-4 text-amber-400" />
                  <h3 className="text-sm font-bold text-white">
                    1. Existing Literature Patterns Detected (Prior Art Collision)
                  </h3>
                </div>
                <span className="text-[11px] text-slate-400">
                  Identified across {auditResult.existingPatterns.length} established research paradigms
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {auditResult.existingPatterns.map((pat, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-[#060b19] border border-slate-800/80 hover:border-amber-500/40 transition-colors space-y-2.5"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <span className="text-xs font-bold text-amber-300">
                        {pat.patternName}
                      </span>
                      <span className="text-[10px] font-semibold bg-amber-500/10 text-amber-400 px-2 py-0.5 rounded border border-amber-500/20 shrink-0">
                        {pat.prevalence}
                      </span>
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed">
                      {pat.description}
                    </p>

                    <div className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800 text-[11px] text-slate-400 space-y-1">
                      <div>
                        <strong className="text-slate-300">Prior Works: </strong>
                        {pat.representativeWorks.join(' • ')}
                      </div>
                      <div>
                        <strong className="text-rose-400">Why It Saturates: </strong>
                        <span className="text-slate-300">{pat.whyItSaturates}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 2. HOW TO MAKE IT UNIQUE ("unique ga ai manatho cheyicnhali") */}
            <div className="bg-[#0b1329] border border-[#1e293b] rounded-2xl p-5 sm:p-6 shadow-xl space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
                <div className="flex items-center gap-2">
                  <Lightbulb className="w-4 h-4 text-emerald-400" />
                  <h3 className="text-sm font-bold text-white">
                    2. Strategic Differentiation Pivots: How We Make This 100% Unique
                  </h3>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setActiveMode('mutator');
                      handleRunMutator();
                    }}
                    className="text-xs text-purple-400 hover:text-purple-300 flex items-center gap-1 font-semibold"
                  >
                    <span>Launch Mutator Lab</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {auditResult.uniquenessPivots.map((pivot, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-[#060b19] border border-slate-800 hover:border-emerald-500/50 transition-all flex flex-col justify-between space-y-3 group"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                          {pivot.noveltyGain}
                        </span>
                        <span className="text-[10px] text-slate-500 font-mono">
                          Angle #{idx + 1}
                        </span>
                      </div>

                      <h4 className="text-xs font-bold text-white group-hover:text-emerald-300 transition-colors">
                        {pivot.angle}
                      </h4>

                      <p className="text-xs text-slate-300 leading-relaxed">
                        {pivot.differentiationStrategy}
                      </p>
                    </div>

                    <div className="space-y-2 pt-2 border-t border-slate-800/80 text-[11px]">
                      <div className="text-slate-400">
                        <strong className="text-emerald-400">Expected Leap: </strong>
                        {pivot.expectedImpact}
                      </div>
                      {pivot.implementationHint && (
                        <div className="p-2 rounded bg-slate-900/80 text-[10px] text-slate-300 font-mono border border-slate-800">
                          💡 <span className="text-blue-300">Hint:</span> {pivot.implementationHint}
                        </div>
                      )}

                      <button
                        onClick={() => {
                          setActiveMode('chat');
                          handleSendChat(`I want to adopt the uniqueness pivot: "${pivot.angle}". How can we mathematically formulate this and integrate it into my research plan?`);
                        }}
                        className="w-full flex items-center justify-center gap-1 py-1.5 px-2.5 rounded-lg bg-blue-600/20 hover:bg-blue-600 text-blue-300 hover:text-white border border-blue-500/30 text-[11px] font-medium transition-all"
                      >
                        <span>Deep-Dive in Chat</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 3. CLEAR RESEARCH OBJECTIVES ("manaki clear objectives ani ivali") */}
            <div className="bg-[#0b1329] border border-[#1e293b] rounded-2xl p-5 sm:p-6 shadow-xl space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-3">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-400" />
                  <h3 className="text-sm font-bold text-white">
                    3. Structured Research Objectives (Work Packages O1 – O4)
                  </h3>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopyObjectives}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#060b19] hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white text-xs font-medium transition-colors"
                  >
                    {copiedObjectives ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedObjectives ? 'Copied to Clipboard' : 'Copy Objectives'}</span>
                  </button>

                  <button
                    onClick={() => setActiveMode('latex')}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600/20 hover:bg-emerald-600 text-emerald-300 hover:text-white border border-emerald-500/30 text-xs font-medium transition-all"
                  >
                    <FileCode2 className="w-3.5 h-3.5" />
                    <span>Get Overleaf LaTeX</span>
                  </button>
                </div>
              </div>

              {/* Primary Objective & Hypothesis */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-blue-950/20 border border-blue-800/40 space-y-1.5">
                  <div className="text-[10px] font-bold text-blue-400 uppercase tracking-wider">
                    🎯 Primary Research Objective
                  </div>
                  <p className="text-xs text-slate-200 leading-relaxed font-medium">
                    {auditResult.researchObjectives.primaryObjective}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-purple-950/20 border border-purple-800/40 space-y-1.5">
                  <div className="text-[10px] font-bold text-purple-400 uppercase tracking-wider">
                    🔬 Falsifiable Scientific Hypothesis
                  </div>
                  <p className="text-xs text-slate-200 leading-relaxed font-medium">
                    {auditResult.researchObjectives.hypothesis}
                  </p>
                </div>
              </div>

              {/* Sub-Objectives Cards (O1 - O4) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {auditResult.researchObjectives.subObjectives.map((obj) => (
                  <div
                    key={obj.code}
                    className="p-4 rounded-xl bg-[#060b19] border border-slate-800 space-y-2 hover:border-slate-700 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="flex h-6 w-6 items-center justify-center rounded-md bg-blue-600/20 text-blue-400 font-mono text-xs font-bold border border-blue-500/30">
                          {obj.code}
                        </span>
                        <h4 className="text-xs font-bold text-white">
                          {obj.title}
                        </h4>
                      </div>
                      <span className="text-[10px] font-mono text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                        {obj.milestoneWeeks}
                      </span>
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed">
                      {obj.description}
                    </p>

                    <div className="pt-2 border-t border-slate-800/80 flex items-start gap-1.5 text-[11px]">
                      <span className="text-emerald-400 font-bold shrink-0">Deliverable:</span>
                      <span className="text-slate-300">{obj.deliverable}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Evaluation Metrics & Next Step */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-[#060b19] border border-slate-800 space-y-2">
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    📊 Quantitative Evaluation Metrics
                  </div>
                  <ul className="space-y-1 text-xs text-slate-300">
                    {auditResult.researchObjectives.evaluationMetrics.map((met, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-blue-400 shrink-0" />
                        <span>{met}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 rounded-xl bg-[#060b19] border border-slate-800 space-y-2">
                  <div className="text-[10px] font-bold text-amber-400 uppercase tracking-wider">
                    ⚡ Recommended Immediate Action
                  </div>
                  <p className="text-xs text-slate-200 leading-relaxed">
                    {auditResult.recommendedNextStep}
                  </p>
                  <button
                    onClick={() => {
                      setActiveMode('chat');
                      handleSendChat(`Help me execute the immediate next step: "${auditResult.recommendedNextStep}". What code or math formulation should I write first?`);
                    }}
                    className="mt-2 text-xs text-blue-400 hover:text-blue-300 font-semibold flex items-center gap-1"
                  >
                    <span>Start executing with AI Copilot</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>

            </div>

          </div>
        </div>
      )}

      {/* TAB 2: IDEA GENETIC MUTATOR LAB */}
      {activeMode === 'mutator' && (
        <div className="space-y-6">
          <div className="bg-[#0b1329] border border-[#1e293b] rounded-2xl p-5 sm:p-6 shadow-xl space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-4">
              <div>
                <div className="flex items-center gap-2 text-xs font-semibold text-purple-400 uppercase tracking-wider">
                  <Dna className="w-4 h-4 text-purple-400 animate-spin" />
                  Evolutionary Idea Synthesis
                </div>
                <h3 className="text-base font-bold text-white mt-1">
                  Genetic Idea Mutator Lab
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Apply simulated evolutionary pressure to mutate ordinary or saturated ideas into breakthrough offspring concepts.
                </p>
              </div>

              <button
                onClick={handleRunMutator}
                disabled={isMutating}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 text-white text-xs font-bold shadow-lg shadow-purple-600/30 hover:scale-105 transition-all disabled:opacity-40"
              >
                {isMutating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Flame className="w-4 h-4 text-yellow-300" />}
                <span>{isMutating ? 'Mutating Idea DNA...' : 'Trigger Evolutionary Mutation'}</span>
              </button>
            </div>

            {/* Mutator Sliders & Constraints */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 rounded-xl bg-[#060b19] border border-slate-800/80">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-300 flex items-center gap-1.5">
                    <Sliders className="w-3.5 h-3.5 text-purple-400" />
                    Novelty Pressure (Evolution Rate)
                  </span>
                  <span className="font-mono text-purple-400 font-bold">{noveltyPressure}%</span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="100"
                  value={noveltyPressure}
                  onChange={(e) => setNoveltyPressure(Number(e.target.value))}
                  className="w-full accent-purple-500 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-500">
                  <span>Standard Novelty</span>
                  <span>Breakthrough Frontier</span>
                  <span>Paradigm Shift</span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-300 flex items-center gap-1.5">
                    <Cpu className="w-3.5 h-3.5 text-cyan-400" />
                    Compute & Hardware Target
                  </span>
                  <span className="text-[11px] text-cyan-400 font-semibold">{computeConstraint}</span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {['Edge / Low-Power MCU', '1x Single GPU', 'Cluster / H100'].map((comp) => (
                    <button
                      key={comp}
                      onClick={() => setComputeConstraint(comp)}
                      className={`px-2 py-1.5 rounded-lg text-[10px] font-semibold border transition-all ${
                        computeConstraint === comp
                          ? 'bg-cyan-500/20 border-cyan-500/50 text-cyan-300 shadow-sm'
                          : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      {comp}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Generated Mutations Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {mutations.map((mut) => (
                <div
                  key={mut.id}
                  className="p-5 rounded-xl bg-[#060b19] border border-slate-800 hover:border-purple-500/50 transition-all flex flex-col justify-between space-y-3 group"
                >
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
                        {mut.mutationName}
                      </span>
                      <div className="flex items-center gap-2 text-[11px]">
                        <span className="text-emerald-400 font-bold">Novelty: {mut.noveltyScore}%</span>
                        <span className="text-slate-500">•</span>
                        <span className="text-cyan-400 font-mono text-[10px]">{mut.computeCost}</span>
                      </div>
                    </div>

                    <h4 className="text-sm font-bold text-white group-hover:text-purple-300 transition-colors">
                      {mut.title}
                    </h4>

                    <p className="text-xs text-slate-300 leading-relaxed">
                      {mut.description}
                    </p>

                    <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800 text-[11px] space-y-1">
                      <div className="text-purple-300 font-mono text-[10px]">
                        📐 <strong>Math Formulation: </strong>{mut.mathematicalTwist}
                      </div>
                      <div className="text-slate-400">
                        ⭐ <strong>Why Reviewers Will Love It: </strong>{mut.differentiator}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setIdeaInput(mut.title);
                      setActiveMode('audit');
                      handleRunAudit(mut.title, domainInput);
                    }}
                    className="w-full flex items-center justify-center gap-1.5 py-2 rounded-lg bg-purple-600/20 hover:bg-purple-600 text-purple-300 hover:text-white border border-purple-500/30 text-xs font-semibold transition-all"
                  >
                    <span>Adopt This Mutation & Audit Objectives</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>

          </div>
        </div>
      )}

      {/* TAB 3: WHITE-SPACE & COLLISION RADAR */}
      {activeMode === 'radar' && (
        <div className="space-y-6">
          <div className="bg-[#0b1329] border border-[#1e293b] rounded-2xl p-5 sm:p-6 shadow-xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-4">
              <div>
                <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400 uppercase tracking-wider">
                  <Radar className="w-4 h-4 text-cyan-400" />
                  2D SOTA Coordinate Radar
                </div>
                <h3 className="text-base font-bold text-white mt-1">
                  Literature Collision & Unclaimed White-Space Visualizer
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Visual mapping of saturated prior-art clusters vs. your target uncontested innovation territory.
                </p>
              </div>

              <div className="flex items-center gap-2 text-[11px]">
                <span className="flex items-center gap-1 text-rose-400 font-semibold">
                  <span className="h-2.5 w-2.5 rounded-full bg-rose-500" /> Saturated SOTA
                </span>
                <span className="flex items-center gap-1 text-emerald-400 font-semibold">
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" /> Your Territory
                </span>
              </div>
            </div>

            {/* Interactive 2D Canvas Radar */}
            <div className="relative w-full h-80 bg-[#060b19] border border-slate-800 rounded-2xl overflow-hidden p-6 select-none">
              {/* Radar Grid lines */}
              <div className="absolute inset-0 grid grid-cols-4 grid-rows-4 pointer-events-none opacity-20">
                <div className="border-r border-b border-cyan-500" />
                <div className="border-r border-b border-cyan-500" />
                <div className="border-r border-b border-cyan-500" />
                <div className="border-b border-cyan-500" />
                <div className="border-r border-b border-cyan-500" />
                <div className="border-r border-b border-cyan-500" />
                <div className="border-r border-b border-cyan-500" />
                <div className="border-b border-cyan-500" />
                <div className="border-r border-b border-cyan-500" />
                <div className="border-r border-b border-cyan-500" />
                <div className="border-r border-b border-cyan-500" />
                <div className="border-b border-cyan-500" />
              </div>

              {/* Axis Labels */}
              <div className="absolute top-2 left-4 text-[10px] font-bold text-cyan-400 tracking-wider">
                ▲ HIGH PRACTICAL DEPLOYABILITY (Edge / Real-Time)
              </div>
              <div className="absolute bottom-2 right-4 text-[10px] font-bold text-purple-400 tracking-wider">
                HIGH THEORETICAL RIGOR (Causal / Math Bounds) ►
              </div>
              <div className="absolute bottom-2 left-4 text-[10px] font-bold text-rose-500 tracking-wider">
                CONGESTED SATURATION ZONE (Legacy Baselines)
              </div>

              {/* Plotted Points */}
              {DEFAULT_COLLISION_POINTS.map((pt) => {
                const isUser = pt.type === 'USER_PROPOSAL';
                return (
                  <div
                    key={pt.id}
                    style={{ left: `${pt.x}%`, bottom: `${pt.y}%` }}
                    className="absolute -translate-x-1/2 translate-y-1/2 group cursor-pointer"
                  >
                    <div className={`flex items-center justify-center rounded-full transition-transform group-hover:scale-125 ${
                      isUser
                        ? 'h-8 w-8 bg-emerald-500 text-slate-950 font-black shadow-lg shadow-emerald-500/50 animate-bounce'
                        : pt.type === 'CONGESTED_CLUSTER'
                        ? 'h-6 w-6 bg-rose-500/80 text-white font-bold'
                        : pt.type === 'UNCONTESTED_SPACE'
                        ? 'h-7 w-7 border-2 border-dashed border-cyan-400 text-cyan-300'
                        : 'h-5 w-5 bg-amber-500 text-slate-950'
                    }`}>
                      {isUser ? '★' : pt.overlapPercentage > 50 ? '●' : '○'}
                    </div>

                    {/* Tooltip */}
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2 rounded-lg bg-slate-900 border border-slate-700 text-white text-[10px] shadow-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-30">
                      <div className="font-bold text-cyan-300">{pt.name}</div>
                      <p className="text-slate-300 mt-0.5 leading-snug">{pt.description}</p>
                      <div className="text-rose-400 font-semibold mt-1">Overlap: {pt.overlapPercentage}%</div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Insights breakdown */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-[#060b19] border border-slate-800 space-y-1.5">
                <div className="text-[10px] text-rose-400 font-bold uppercase">Congested Cluster Distance</div>
                <div className="text-lg font-black text-white">74.2 Euclidean Units</div>
                <p className="text-[11px] text-slate-400">
                  Your formulation safely distances itself from over-saturated 2018-2022 supervised benchmark papers.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#060b19] border border-slate-800 space-y-1.5">
                <div className="text-[10px] text-emerald-400 font-bold uppercase">White-Space Monopoly</div>
                <div className="text-lg font-black text-emerald-400">86% Uncontested</div>
                <p className="text-[11px] text-slate-400">
                  Only 2 known arXiv preprints attempt physical conservation laws directly on INT4 edge microcontrollers.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#060b19] border border-slate-800 space-y-1.5">
                <div className="text-[10px] text-cyan-400 font-bold uppercase">Reviewer Novelty Rating</div>
                <div className="text-lg font-black text-cyan-400">Strong Accept (8.5 / 10)</div>
                <p className="text-[11px] text-slate-400">
                  Top-tier conference chairs prioritize high practical deployability coupled with mathematical rigor.
                </p>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* TAB 4: DEVIL'S ADVOCATE (RED TEAM) */}
      {activeMode === 'redteam' && (
        <div className="space-y-6">
          <div className="bg-[#0b1329] border border-[#1e293b] rounded-2xl p-5 sm:p-6 shadow-xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-4">
              <div>
                <div className="flex items-center gap-2 text-xs font-semibold text-rose-400 uppercase tracking-wider">
                  <ShieldAlert className="w-4 h-4 text-rose-400" />
                  Senior Area Chair Red Team
                </div>
                <h3 className="text-base font-bold text-white mt-1">
                  Devil's Advocate: Pre-Emptive Reviewer #2 Defense
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Expose fatal methodological traps, hidden unstated assumptions, and fortify your paper before submission.
                </p>
              </div>

              <button
                onClick={handleRunRedTeam}
                disabled={isRedTeaming}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold shadow-lg shadow-rose-600/30 transition-all disabled:opacity-40"
              >
                {isRedTeaming ? <Loader2 className="w-4 h-4 animate-spin" /> : <ShieldAlert className="w-4 h-4" />}
                <span>{isRedTeaming ? 'Stress-Testing Idea...' : 'Re-Run Stress Test'}</span>
              </button>
            </div>

            {redTeamCritique && (
              <div className="space-y-5">
                {/* Vulnerability Alert Banner */}
                <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-900/60 flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="text-xs font-bold text-rose-300">
                      Rejection Vulnerability Score: {redTeamCritique.rejectionRiskScore}/100
                    </div>
                    <p className="text-[11px] text-slate-300">
                      Mandatory Core Ablation: <span className="font-semibold text-rose-200">{redTeamCritique.recommendedAblation}</span>
                    </p>
                  </div>
                  <span className="text-[10px] font-bold bg-rose-500/20 text-rose-300 border border-rose-500/40 px-2.5 py-1 rounded-full uppercase">
                    3 Flaws Disarmed
                  </span>
                </div>

                {/* Fatal Flaws & Pre-Emptive Defenses */}
                <div className="space-y-4">
                  {redTeamCritique.fatalFlaws.map((flaw, i) => (
                    <div
                      key={i}
                      className="p-4 rounded-xl bg-[#060b19] border border-slate-800 space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider ${
                            flaw.severity === 'CRITICAL' ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30' : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                          }`}>
                            {flaw.severity}
                          </span>
                          <h4 className="text-xs font-bold text-white">
                            {flaw.title}
                          </h4>
                        </div>
                      </div>

                      <p className="text-xs text-slate-300 leading-relaxed">
                        {flaw.description}
                      </p>

                      <div className="p-3 rounded-lg bg-rose-950/20 border border-rose-900/40 text-[11px] text-rose-200 italic font-serif">
                        {flaw.reviewerQuote}
                      </div>

                      <div className="p-3 rounded-lg bg-emerald-950/20 border border-emerald-900/40 text-[11px] space-y-1">
                        <div className="text-emerald-400 font-bold flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Pre-Emptive Rebuttal & Defense Strategy:</span>
                        </div>
                        <p className="text-slate-200">{flaw.preemptiveDefense}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Hidden Assumptions */}
                <div className="p-4 rounded-xl bg-[#060b19] border border-slate-800 space-y-2">
                  <div className="text-xs font-bold text-slate-300">
                    ⚠️ Hidden Unstated Assumptions in Your Methodology:
                  </div>
                  <ul className="space-y-1 text-xs text-slate-400 list-disc list-inside">
                    {redTeamCritique.hiddenAssumptions.map((ass, idx) => (
                      <li key={idx}><span className="text-slate-200">{ass}</span></li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

          </div>
        </div>
      )}

      {/* TAB 5: 1-CLICK LATEX & PYTORCH SCAFFOLDING */}
      {activeMode === 'latex' && (
        <div className="space-y-6">
          <div className="bg-[#0b1329] border border-[#1e293b] rounded-2xl p-5 sm:p-6 shadow-xl space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-4">
              <div>
                <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 uppercase tracking-wider">
                  <FileCode2 className="w-4 h-4 text-emerald-400" />
                  Publication Synthesizer
                </div>
                <h3 className="text-base font-bold text-white mt-1">
                  1-Click Overleaf LaTeX & PyTorch Scaffolding
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Directly export camera-ready LaTeX code, formal objective environments, PyTorch loss scaffolding, and grant proposals.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    const content = activeCodeTab === 'abstract'
                      ? latexBundle.latexAbstract
                      : activeCodeTab === 'objectives'
                      ? latexBundle.latexObjectives
                      : activeCodeTab === 'pytorch'
                      ? latexBundle.pytorchCodeScaffold
                      : latexBundle.grantPitch;
                    handleCopyCode(content);
                  }}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-md shadow-emerald-600/30 transition-all"
                >
                  {copiedCode ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedCode ? 'Copied Code!' : 'Copy to Clipboard'}</span>
                </button>
              </div>
            </div>

            {/* Sub-Tabs */}
            <div className="flex items-center gap-2 border-b border-slate-800 pb-2 text-xs">
              <button
                onClick={() => setActiveCodeTab('abstract')}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                  activeCodeTab === 'abstract' ? 'bg-slate-800 text-emerald-400 border border-slate-700' : 'text-slate-400 hover:text-white'
                }`}
              >
                LaTeX Abstract
              </button>
              <button
                onClick={() => setActiveCodeTab('objectives')}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                  activeCodeTab === 'objectives' ? 'bg-slate-800 text-emerald-400 border border-slate-700' : 'text-slate-400 hover:text-white'
                }`}
              >
                LaTeX Objectives \\itemize
              </button>
              <button
                onClick={() => setActiveCodeTab('pytorch')}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                  activeCodeTab === 'pytorch' ? 'bg-slate-800 text-emerald-400 border border-slate-700' : 'text-slate-400 hover:text-white'
                }`}
              >
                PyTorch Architecture & Loss
              </button>
              <button
                onClick={() => setActiveCodeTab('grant')}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                  activeCodeTab === 'grant' ? 'bg-slate-800 text-emerald-400 border border-slate-700' : 'text-slate-400 hover:text-white'
                }`}
              >
                NSF / Horizon Grant Pitch
              </button>
            </div>

            {/* Code Output Box */}
            <div className="relative rounded-xl bg-[#050914] border border-slate-800 p-4 overflow-x-auto font-mono text-xs text-slate-200">
              <pre className="whitespace-pre-wrap leading-relaxed">
                {activeCodeTab === 'abstract' && latexBundle.latexAbstract}
                {activeCodeTab === 'objectives' && latexBundle.latexObjectives}
                {activeCodeTab === 'pytorch' && latexBundle.pytorchCodeScaffold}
                {activeCodeTab === 'grant' && latexBundle.grantPitch}
              </pre>
            </div>

          </div>
        </div>
      )}

      {/* TAB 6: INTERACTIVE COPILOT CHAT */}
      {activeMode === 'chat' && (
        <div className="bg-[#0b1329] border border-[#1e293b] rounded-2xl shadow-xl flex flex-col h-[calc(100vh-210px)] min-h-[550px] overflow-hidden">
          
          {/* Chat Header */}
          <div className="p-4 border-b border-slate-800/80 flex items-center justify-between bg-[#060b19]">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-blue-600 to-purple-600 text-white shadow-md shadow-blue-600/30">
                <Bot className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-xs font-bold text-white flex items-center gap-2">
                  ResearchPilot Copilot
                  <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-[9px] font-semibold text-emerald-400 border border-emerald-500/30">
                    Online • Groq LLaMA 3.3
                  </span>
                </h3>
                <p className="text-[11px] text-slate-400">
                  Ask about prior art, challenge patterns, brainstorm uniqueness, or formulate O1–O4 objectives.
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                setChatMessages([
                  {
                    id: Date.now().toString(),
                    role: 'assistant',
                    content: 'Chat context cleared. Tell me your new research idea or question!',
                    timestamp: 'Just now'
                  }
                ]);
              }}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors"
              title="Reset conversation"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>

          {/* Messages Scroll Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {chatMessages.map((m) => (
              <div
                key={m.id}
                className={`flex items-start gap-3 ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {m.role === 'assistant' && (
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white shadow-sm mt-0.5">
                    <Bot className="h-4 w-4" />
                  </div>
                )}

                <div
                  className={`rounded-2xl p-4 text-xs leading-relaxed max-w-2xl ${
                    m.role === 'user'
                      ? 'bg-blue-600 text-white rounded-br-none shadow-md shadow-blue-600/20'
                      : 'bg-[#060b19] border border-slate-800 text-slate-200 rounded-bl-none shadow-sm'
                  }`}
                >
                  <div className="whitespace-pre-wrap">{m.content}</div>
                  <div className="mt-2 text-right text-[9px] opacity-40">
                    {m.timestamp}
                  </div>
                </div>

                {m.role === 'user' && (
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-800 text-slate-300 font-bold text-xs mt-0.5">
                    U
                  </div>
                )}
              </div>
            ))}

            {isChatLoading && (
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white shadow-sm">
                  <Bot className="h-4 w-4" />
                </div>
                <div className="bg-[#060b19] border border-slate-800 rounded-2xl p-3.5 text-xs text-slate-400 flex items-center gap-2">
                  <Loader2 className="h-4 w-4 text-blue-400 animate-spin" />
                  <span>Evaluating literature collisions and crafting unique objectives...</span>
                </div>
              </div>
            )}

            <div ref={chatEndRef} />
          </div>

          {/* Suggested Quick Prompt Chips */}
          <div className="px-4 py-2 bg-[#060b19]/80 border-t border-slate-800/80 flex flex-wrap items-center gap-1.5">
            <span className="text-[10px] text-slate-500 font-medium">Quick Prompts:</span>
            {[
              'Does my idea already exist in literature?',
              'What existing patterns saturate this area?',
              'How can we make this idea unique?',
              'Generate 4 clear research objectives (O1-O4)',
              'Ee idea mundhu evaraina chesara? Cheppandi'
            ].map((chip, idx) => (
              <button
                key={idx}
                onClick={() => handleSendChat(chip)}
                disabled={isChatLoading}
                className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 text-[11px] transition-colors disabled:opacity-50"
              >
                {chip}
              </button>
            ))}
          </div>

          {/* Chat Input Bar */}
          <div className="p-3 bg-[#060b19] border-t border-slate-800">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendChat();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Ask about research patterns, uniqueness angles, or type your idea..."
                disabled={isChatLoading}
                className="flex-1 bg-[#0b1329] border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
              />
              <button
                type="submit"
                disabled={isChatLoading || !chatInput.trim()}
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 hover:bg-blue-500 text-white shadow-md shadow-blue-600/30 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </div>

        </div>
      )}

    </div>
  );
};

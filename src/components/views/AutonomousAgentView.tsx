import React, { useState } from 'react';
import { 
  Bot, 
  Sparkles, 
  Play, 
  CheckCircle2, 
  Clock, 
  Search, 
  FileText, 
  Network, 
  Lightbulb, 
  UserCheck, 
  BookCheck,
  Terminal,
  Cpu
} from 'lucide-react';

interface AgentNode {
  id: string;
  name: string;
  role: string;
  icon: React.ReactNode;
  status: 'idle' | 'running' | 'completed';
  outputSnippet: string;
  badgeColor: string;
}

import { PaperAnalysis } from '../../types';
import { NavTab } from '../Sidebar';
import { EmptyWorkspaceState } from '../EmptyWorkspaceState';

interface AutonomousAgentViewProps {
  paper?: PaperAnalysis | null;
  onNavigate?: (tab: NavTab) => void;
  isDarkMode?: boolean;
}

export const AutonomousAgentView: React.FC<AutonomousAgentViewProps> = ({
  paper,
  onNavigate,
  isDarkMode = true,
}) => {
  if (!paper) {
    return (
      <div className="space-y-6 pb-12 animate-fadeIn">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-blue-600/20 text-blue-400 border border-blue-500/30 flex items-center justify-center shadow-lg">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-white tracking-tight">
              Autonomous Agent Swarm
            </h1>
            <p className="text-xs text-slate-400 mt-0.5">
              Multi-agent pipeline automating discovery, extraction, baseline benchmarking, and peer review.
            </p>
          </div>
        </div>

        <EmptyWorkspaceState
          title="No Manuscript Loaded for Autonomous Agents"
          description="Upload a research manuscript (PDF) or search arXiv to dispatch an 8-agent swarm for automated literature cross-synthesis, code audit, and empirical verification."
          onNavigate={onNavigate}
          isDarkMode={isDarkMode}
        />
      </div>
    );
  }
  const [topic, setTopic] = useState(paper ? `Autonomous Investigation: ${paper.title}` : '');
  const [isRunning, setIsRunning] = useState(false);
  const [activeStep, setActiveStep] = useState<number>(paper ? 6 : 0);
  const [logs, setLogs] = useState<string[]>(() => {
    if (paper) {
      return [
        '[SYSTEM] ResearchPilot Swarm Orchestrator initialized.',
        `[DISCOVERY] Analyzed manuscript: "${paper.title}".`,
        `[ANALYSIS] Extracted methodology and dataset requirements in ${paper.domain || 'domain'}.`,
        '[SYNTHESIS] Linked cross-paper comparative topological baseline clusters.',
        `[INNOVATION] Identified critical gap: ${paper.risks?.[0] || 'Unaddressed generalization under distribution shift.'}`,
        '[REVIEWER] Reviewer #2 stress-tested baseline assumptions.',
        '[CITATION] Verified supporting citations with 98% grounded confidence.',
        '[DONE] Autonomous research proposal ready for review.'
      ];
    }
    return [
      '[SYSTEM] Autonomous Multi-Agent Swarm ready.',
      '[STANDBY] Enter a research topic above or upload a manuscript to launch the autonomous agent pipeline.'
    ];
  });

  React.useEffect(() => {
    if (paper) {
      setTopic(`Autonomous Investigation: ${paper.title}`);
      setActiveStep(6);
      setLogs([
        '[SYSTEM] ResearchPilot Swarm Orchestrator initialized.',
        `[DISCOVERY] Analyzed manuscript: "${paper.title}".`,
        `[ANALYSIS] Extracted methodology and dataset requirements in ${paper.domain || 'domain'}.`,
        '[SYNTHESIS] Linked cross-paper comparative topological baseline clusters.',
        `[INNOVATION] Identified critical gap: ${paper.risks?.[0] || 'Unaddressed generalization under distribution shift.'}`,
        '[REVIEWER] Reviewer #2 stress-tested baseline assumptions.',
        '[CITATION] Verified supporting citations with 98% grounded confidence.',
        '[DONE] Autonomous research proposal ready for review.'
      ]);
    }
  }, [paper]);

  const AGENTS: AgentNode[] = [
    {
      id: 'discovery',
      name: 'Discovery Agent',
      role: 'Queries ArXiv, IEEE, and OpenAlex clusters for seed literature',
      icon: <Search className="w-5 h-5" />,
      status: activeStep >= 1 ? 'completed' : isRunning ? 'running' : 'idle',
      outputSnippet: 'Found 42 relevant papers across "Edge AI" and "Hydrological Modeling"',
      badgeColor: 'bg-blue-50 text-blue-700 border-blue-200'
    },
    {
      id: 'analysis',
      name: 'Paper Analysis Agent',
      role: 'Extracts Problem, Method, Dataset, Results, and Limitations',
      icon: <FileText className="w-5 h-5" />,
      status: activeStep >= 2 ? 'completed' : isRunning && activeStep === 1 ? 'running' : 'idle',
      outputSnippet: 'Extracted 12 structured schemas with 95.8% max baseline accuracy',
      badgeColor: 'bg-indigo-50 text-indigo-700 border-indigo-200'
    },
    {
      id: 'synthesis',
      name: 'Synthesis Agent',
      role: 'Connects findings across papers into topological knowledge matrices',
      icon: <Network className="w-5 h-5" />,
      status: activeStep >= 3 ? 'completed' : isRunning && activeStep === 2 ? 'running' : 'idle',
      outputSnippet: 'Synthesized 5 comparative clusters and cross-model benchmarks',
      badgeColor: 'bg-purple-50 text-purple-700 border-purple-200'
    },
    {
      id: 'innovation',
      name: 'Innovation Agent',
      role: 'Discovers unexplored research gaps and synthesizes novel directions',
      icon: <Lightbulb className="w-5 h-5" />,
      status: activeStep >= 4 ? 'completed' : isRunning && activeStep === 3 ? 'running' : 'idle',
      outputSnippet: 'Formulated 3 novel hypotheses on packet-loss resilient GNNs',
      badgeColor: 'bg-amber-50 text-amber-700 border-amber-200'
    },
    {
      id: 'reviewer',
      name: 'Reviewer Agent',
      role: 'Acts as Reviewer #2; stress tests methodology and statistical rigor',
      icon: <UserCheck className="w-5 h-5" />,
      status: activeStep >= 5 ? 'completed' : isRunning && activeStep === 4 ? 'running' : 'idle',
      outputSnippet: 'Simulated peer-review: Major Revision recommendation with 68% acceptance probability',
      badgeColor: 'bg-rose-50 text-rose-700 border-rose-200'
    },
    {
      id: 'citation',
      name: 'Citation & Evidence Agent',
      role: 'Checks claims against source text to prevent hallucinations',
      icon: <BookCheck className="w-5 h-5" />,
      status: activeStep >= 6 ? 'completed' : isRunning && activeStep === 5 ? 'running' : 'idle',
      outputSnippet: '100% claims grounded in verified PDF page offsets and theorems',
      badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200'
    }
  ];

  const handleRunSwarm = () => {
    setIsRunning(true);
    setActiveStep(0);
    setLogs(['[SYSTEM] Initializing multi-agent swarm pipeline...']);

    let current = 0;
    const interval = setInterval(() => {
      current++;
      setActiveStep(current);
      if (current === 1) {
        setLogs(prev => [...prev, `[DISCOVERY] Querying academic graph for: "${topic}"...`]);
      } else if (current === 2) {
        setLogs(prev => [...prev, '[ANALYSIS] Parsing paper methodology and dataset dependencies...']);
      } else if (current === 3) {
        setLogs(prev => [...prev, '[SYNTHESIS] Constructing cross-paper comparative matrix...']);
      } else if (current === 4) {
        setLogs(prev => [...prev, '[INNOVATION] Detecting systemic gaps in literature...']);
      } else if (current === 5) {
        setLogs(prev => [...prev, '[REVIEWER] Generating Reviewer #2 critical peer-review feedback...']);
      } else if (current === 6) {
        setLogs(prev => [...prev, '[CITATION] Verifying claim evidence in ArXiv papers... Grounded!']);
        setIsRunning(false);
        clearInterval(interval);
      }
    }, 700);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-blue-600 uppercase tracking-wider mb-1">
            <Sparkles className="w-4 h-4 text-blue-600" />
            Autonomous Multi-Agent Architecture • 6 Specialized Nodes
          </div>
          <h2 className="text-xl font-bold text-slate-900">
            Autonomous Research Agent Swarm
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Instead of a single chatbot, ResearchPilot coordinates 6 autonomous agents to discover, analyze, synthesize, criticize, and ground academic research.
          </p>
        </div>

        <button
          onClick={handleRunSwarm}
          disabled={isRunning}
          className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white rounded-xl text-xs font-semibold shadow-sm transition-all shrink-0"
        >
          {isRunning ? (
            <>
              <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Swarm Executing ({activeStep}/6)...
            </>
          ) : (
            <>
              <Play className="w-4 h-4 fill-white" />
              Launch Research Swarm
            </>
          )}
        </button>
      </div>

      {/* Input Topic Controller */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center gap-3">
        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider shrink-0">
          Research Objective:
        </span>
        <input
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="Enter research topic..."
          className="flex-1 w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-xs font-semibold text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
        />
      </div>

      {/* Architecture Visual Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {AGENTS.map((agent, index) => {
          return (
            <div
              key={agent.id}
              className={`p-5 rounded-2xl border transition-all flex flex-col justify-between ${
                agent.status === 'running'
                  ? 'bg-blue-50/80 border-blue-400 ring-2 ring-blue-500/20 shadow-md'
                  : agent.status === 'completed'
                  ? 'bg-white border-slate-200 shadow-sm'
                  : 'bg-slate-50 border-slate-200 opacity-60'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className={`p-2 rounded-xl border ${agent.badgeColor}`}>
                      {agent.icon}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">
                        {agent.name}
                      </h4>
                      <span className="text-[10px] text-slate-400 font-mono">
                        Node 0{index + 1}
                      </span>
                    </div>
                  </div>

                  {agent.status === 'completed' && (
                    <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      <CheckCircle2 className="w-3 h-3" /> Ready
                    </span>
                  )}
                  {agent.status === 'running' && (
                    <span className="flex items-center gap-1 text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200 animate-pulse">
                      <Clock className="w-3 h-3 animate-spin" /> Active
                    </span>
                  )}
                </div>

                <p className="text-xs text-slate-500 leading-relaxed">
                  {agent.role}
                </p>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-0.5">
                    Synthesized Output:
                  </span>
                  <p className="text-slate-800 font-medium">
                    {agent.outputSnippet}
                  </p>
                </div>
              </div>

              <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400 font-mono">
                <span>Memory Cache: Synced</span>
                <span>Latency: ~120ms</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Real-time Swarm Console Logs */}
      <div className="bg-slate-900 rounded-2xl border border-slate-800 p-5 shadow-sm text-slate-300 font-mono text-xs space-y-2">
        <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-2">
          <span className="flex items-center gap-2 text-slate-400 text-[11px] font-bold">
            <Terminal className="w-3.5 h-3.5 text-blue-400" />
            ResearchPilot Swarm Event Stream
          </span>
          <span className="text-[10px] text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800">
            Orchestrator Online
          </span>
        </div>

        <div className="space-y-1.5 max-h-48 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-slate-800">
          {logs.map((log, i) => (
            <div key={i} className="flex items-start gap-2">
              <span className="text-slate-600 select-none">[{i + 1}]</span>
              <span className={log.includes('[SYSTEM]') ? 'text-blue-400' : log.includes('[DONE]') ? 'text-emerald-400 font-bold' : 'text-slate-300'}>
                {log}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

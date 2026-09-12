import React, { useState } from 'react';
import { 
  FolderGit2, 
  Plus, 
  Search, 
  FileText, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  Sparkles, 
  Users, 
  ArrowRight, 
  BookOpen, 
  Brain, 
  Lightbulb, 
  FlaskConical, 
  CheckCheck, 
  MessageSquare, 
  Send,
  Calendar,
  Layers,
  ChevronRight,
  ExternalLink,
  Target
} from 'lucide-react';
import { PaperAnalysis } from '../../types';
import { NavTab } from '../Sidebar';

interface ProjectWorkspace {
  id: string;
  name: string;
  domain: string;
  lead: string;
  supervisor: string;
  completion: number;
  deadline: string;
  summary: string;
  pipeline: {
    papers: { count: number; status: 'DONE' | 'IN_PROGRESS' | 'PENDING' };
    litReview: { count: number; status: 'DONE' | 'IN_PROGRESS' | 'PENDING' };
    gaps: { count: number; status: 'DONE' | 'IN_PROGRESS' | 'PENDING' };
    proposal: { count: number; status: 'DONE' | 'IN_PROGRESS' | 'PENDING' };
    experiments: { count: number; status: 'DONE' | 'IN_PROGRESS' | 'PENDING' };
    finalPaper: { progress: number; status: 'DONE' | 'IN_PROGRESS' | 'PENDING' };
  };
  team: { name: string; role: string; avatar: string }[];
  milestones: { title: string; date: string; completed: boolean }[];
  comments: { user: string; text: string; time: string; avatar: string }[];
}

const SAMPLE_PROJECTS: ProjectWorkspace[] = [
  {
    id: 'proj-flood',
    name: 'Real-Time IoT Flood Prediction with Edge GNNs',
    domain: 'Hydrology & Edge AI',
    lead: 'Ananya Sharma (Ph.D. Student)',
    supervisor: 'Prof. Vaishnavi Reddy (Advisor)',
    completion: 65,
    deadline: 'April 30, 2026',
    summary: 'Developing sub-hour catchment flood forecast models deployable on ultra-low power ESP32/ARM Cortex microcontrollers via topological graph message passing.',
    pipeline: {
      papers: { count: 27, status: 'DONE' },
      litReview: { count: 1, status: 'DONE' },
      gaps: { count: 5, status: 'DONE' },
      proposal: { count: 1, status: 'DONE' },
      experiments: { count: 12, status: 'IN_PROGRESS' },
      finalPaper: { progress: 65, status: 'IN_PROGRESS' }
    },
    team: [
      { name: 'Prof. Vaishnavi Reddy', role: 'Principal Investigator', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80' },
      { name: 'Ananya Sharma', role: 'Lead Ph.D. Researcher', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80' },
      { name: 'Rahul Varma', role: 'Hardware Edge Engineer', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80' },
    ],
    milestones: [
      { title: 'Sensor telemetry topology mapping', date: 'Feb 15', completed: true },
      { title: 'CAMELS / NOAA baseline benchmark', date: 'Mar 1', completed: true },
      { title: 'Hardware quantization (< 450mW)', date: 'Mar 25', completed: false },
      { title: 'IEEE Transactions manuscript camera-ready', date: 'Apr 30', completed: false },
    ],
    comments: [
      { user: 'Prof. Vaishnavi Reddy', text: 'Section 4.2 needs an ablation showing mass conservation loss vs standard MSE loss.', time: '2 hours ago', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80' },
      { user: 'Ananya Sharma', text: 'Running the ablation on the Texas FlashFlood split now. Will update Paper Studio methodology section.', time: '45 mins ago', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80' },
    ]
  },
  {
    id: 'proj-dropout',
    name: 'AI-Based Student Dropout Risk Prediction',
    domain: 'Educational Data Mining',
    lead: 'Rahul Varma (M.Tech Thesis)',
    supervisor: 'Prof. Vaishnavi Reddy (Advisor)',
    completion: 45,
    deadline: 'May 15, 2026',
    summary: 'Using longitudinal LMS engagement telemetry and deep survival neural networks to identify at-risk university students 4 weeks before examination dropouts.',
    pipeline: {
      papers: { count: 18, status: 'DONE' },
      litReview: { count: 1, status: 'DONE' },
      gaps: { count: 3, status: 'DONE' },
      proposal: { count: 1, status: 'DONE' },
      experiments: { count: 4, status: 'IN_PROGRESS' },
      finalPaper: { progress: 30, status: 'PENDING' }
    },
    team: [
      { name: 'Prof. Vaishnavi Reddy', role: 'Principal Investigator', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80' },
      { name: 'Rahul Varma', role: 'Student Researcher', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80' },
    ],
    milestones: [
      { title: 'De-identified LMS data pipeline', date: 'Feb 10', completed: true },
      { title: 'Multi-task survival baseline validation', date: 'Mar 15', completed: false },
      { title: 'Student intervention dashboard pilot', date: 'Apr 20', completed: false },
    ],
    comments: [
      { user: 'Prof. Vaishnavi Reddy', text: 'Make sure demographic bias checks are included in your risk metrics.', time: '1 day ago', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80' }
    ]
  }
];

interface MyPapersViewProps {
  papers: PaperAnalysis[];
  onSelectPaper: (paper: PaperAnalysis) => void;
  onOpenAnalysis?: (paper: PaperAnalysis) => void;
  onNavigate?: (tab: NavTab) => void;
  isDarkMode?: boolean;
}

export const MyPapersView: React.FC<MyPapersViewProps> = ({
  papers,
  onSelectPaper,
  onNavigate,
  isDarkMode = true,
}) => {
  const [projects, setProjects] = useState<ProjectWorkspace[]>(SAMPLE_PROJECTS);
  const [selectedProjectId, setSelectedProjectId] = useState<string>('proj-flood');
  const [newComment, setNewComment] = useState('');

  const activeProject = projects.find(p => p.id === selectedProjectId) || projects[0];

  const handlePostComment = () => {
    if (!newComment.trim()) return;
    const commentObj = {
      user: 'Vaishnavi Reddy',
      text: newComment,
      time: 'Just now',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80'
    };
    setProjects(prev => prev.map(p => {
      if (p.id === activeProject.id) {
        return { ...p, comments: [...p.comments, commentObj] };
      }
      return p;
    }));
    setNewComment('');
  };

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      
      {/* Top Header & Project Switcher */}
      <div className={`p-6 sm:p-8 rounded-3xl border transition-all ${
        isDarkMode 
          ? 'bg-gradient-to-br from-[#0c132d] via-[#090e24] to-[#0f173d] border-[#1e2e60]' 
          : 'bg-gradient-to-br from-blue-50 via-white to-indigo-50 border-slate-200'
      }`}>
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/15 text-blue-400 border border-blue-500/30 mb-3">
              <FolderGit2 className="w-3.5 h-3.5" />
              <span>Central Project Workspace & Research Pipeline</span>
            </div>
            <h1 className={`text-2xl sm:text-3xl font-black tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
              My Research Projects
            </h1>
            <p className="text-sm text-slate-400 mt-1 max-w-2xl leading-relaxed">
              Connect your end-to-end research lifecycle from initial papers ➔ literature review ➔ research gaps ➔ experiment proposals ➔ dataset benchmarks ➔ camera-ready manuscript writing.
            </p>
          </div>

          {/* Project Selector Pills */}
          <div className="flex items-center gap-2 flex-wrap">
            {projects.map(p => (
              <button
                key={p.id}
                onClick={() => setSelectedProjectId(p.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer flex items-center gap-2 ${
                  selectedProjectId === p.id
                    ? 'bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-600/30'
                    : isDarkMode
                    ? 'border-[#1e2e60] bg-[#111a3d] text-slate-300 hover:bg-[#162354]'
                    : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-100'
                }`}
              >
                <Target className="w-3.5 h-3.5" />
                <span>{p.name.split(' ')[0]}...</span>
              </button>
            ))}
            <button
              onClick={() => {
                const newId = `proj-${Date.now()}`;
                const newProj: ProjectWorkspace = {
                  id: newId,
                  name: 'New Multi-Agent AI Safety Study',
                  domain: 'Autonomous Systems',
                  lead: 'Vaishnavi Reddy',
                  supervisor: 'Advisor Team',
                  completion: 15,
                  deadline: 'June 2026',
                  summary: 'Investigating adversarial robustness in multi-agent LLM coordination.',
                  pipeline: {
                    papers: { count: 5, status: 'IN_PROGRESS' },
                    litReview: { count: 0, status: 'PENDING' },
                    gaps: { count: 1, status: 'IN_PROGRESS' },
                    proposal: { count: 0, status: 'PENDING' },
                    experiments: { count: 0, status: 'PENDING' },
                    finalPaper: { progress: 5, status: 'PENDING' }
                  },
                  team: [{ name: 'Vaishnavi Reddy', role: 'Lead Researcher', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80' }],
                  milestones: [{ title: 'Literature taxonomy', date: 'May 1', completed: false }],
                  comments: []
                };
                setProjects([...projects, newProj]);
                setSelectedProjectId(newId);
              }}
              className="px-3.5 py-2 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white shadow-md transition-all cursor-pointer flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>New Project</span>
            </button>
          </div>
        </div>

        {/* Selected Project Overview Card */}
        <div className={`mt-6 p-5 rounded-2xl border transition-all ${
          isDarkMode ? 'bg-[#090f28]/80 border-[#1a285a]' : 'bg-white/80 border-slate-200'
        }`}>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
                  {activeProject.domain}
                </span>
                <span className="text-xs text-slate-400">
                  Target Deadline: <strong className="text-slate-200">{activeProject.deadline}</strong>
                </span>
              </div>
              <h2 className={`text-xl font-black mt-1.5 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                {activeProject.name}
              </h2>
              <p className="text-xs text-slate-400 mt-1 max-w-3xl leading-relaxed">
                {activeProject.summary}
              </p>
            </div>

            <div className="flex items-center gap-4 shrink-0">
              <div className="text-right">
                <span className="text-[11px] text-slate-400 block font-medium">Overall Readiness</span>
                <span className="text-2xl font-black text-blue-400">{activeProject.completion}%</span>
              </div>
              <div className="w-20 bg-slate-800 h-2.5 rounded-full overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-emerald-400 h-full rounded-full"
                  style={{ width: `${activeProject.completion}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* THE HIGHLIGHT: END-TO-END LINKED RESEARCH WORKSPACE PIPELINE */}
      <div className={`p-6 rounded-3xl border space-y-4 ${
        isDarkMode ? 'bg-[#0d163a] border-[#1f3066]' : 'bg-white border-slate-200 shadow-sm'
      }`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-blue-400" />
            <h3 className={`text-sm font-black uppercase tracking-wider ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
              End-to-End Connected Research Pipeline
            </h3>
          </div>
          <span className="text-xs text-slate-400">
            Click any node to open the connected workflow module
          </span>
        </div>

        {/* Interactive 6-Stage Pipeline Graphic */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 pt-2">
          
          {/* 1. Papers */}
          <div
            onClick={() => onNavigate && onNavigate('library')}
            className={`p-4 rounded-2xl border transition-all cursor-pointer hover:scale-102 group ${
              activeProject.pipeline.papers.status === 'DONE'
                ? isDarkMode ? 'bg-[#0e1c44] border-blue-500/40' : 'bg-blue-50 border-blue-200'
                : 'bg-slate-900/40 border-slate-800'
            }`}
          >
            <div className="flex items-center justify-between text-blue-400 mb-2">
              <FileText className="w-5 h-5" />
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            </div>
            <span className="text-[10px] font-bold text-slate-400 block uppercase">Stage 1</span>
            <h4 className={`text-xs font-bold leading-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
              Papers Catalog
            </h4>
            <span className="text-[11px] text-emerald-400 font-semibold block mt-1">
              {activeProject.pipeline.papers.count} Collected
            </span>
          </div>

          {/* 2. Literature Review */}
          <div
            onClick={() => onNavigate && onNavigate('lit_review')}
            className={`p-4 rounded-2xl border transition-all cursor-pointer hover:scale-102 group ${
              activeProject.pipeline.litReview.status === 'DONE'
                ? isDarkMode ? 'bg-[#101b44] border-indigo-500/40' : 'bg-indigo-50 border-indigo-200'
                : 'bg-slate-900/40 border-slate-800'
            }`}
          >
            <div className="flex items-center justify-between text-indigo-400 mb-2">
              <BookOpen className="w-5 h-5" />
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            </div>
            <span className="text-[10px] font-bold text-slate-400 block uppercase">Stage 2</span>
            <h4 className={`text-xs font-bold leading-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
              Literature Review
            </h4>
            <span className="text-[11px] text-emerald-400 font-semibold block mt-1">
              Synthesized
            </span>
          </div>

          {/* 3. Gaps */}
          <div
            onClick={() => onNavigate && onNavigate('research_gaps')}
            className={`p-4 rounded-2xl border transition-all cursor-pointer hover:scale-102 group ${
              activeProject.pipeline.gaps.status === 'DONE'
                ? isDarkMode ? 'bg-[#151944] border-teal-500/40' : 'bg-teal-50 border-teal-200'
                : 'bg-slate-900/40 border-slate-800'
            }`}
          >
            <div className="flex items-center justify-between text-teal-400 mb-2">
              <Lightbulb className="w-5 h-5" />
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            </div>
            <span className="text-[10px] font-bold text-slate-400 block uppercase">Stage 3</span>
            <h4 className={`text-xs font-bold leading-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
              Research Gaps
            </h4>
            <span className="text-[11px] text-teal-300 font-semibold block mt-1">
              {activeProject.pipeline.gaps.count} White Spaces
            </span>
          </div>

          {/* 4. Proposal */}
          <div
            onClick={() => onNavigate && onNavigate('research_proposal')}
            className={`p-4 rounded-2xl border transition-all cursor-pointer hover:scale-102 group ${
              activeProject.pipeline.proposal.status === 'DONE'
                ? isDarkMode ? 'bg-[#151642] border-amber-500/40' : 'bg-amber-50 border-amber-200'
                : 'bg-slate-900/40 border-slate-800'
            }`}
          >
            <div className="flex items-center justify-between text-amber-400 mb-2">
              <Layers className="w-5 h-5" />
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            </div>
            <span className="text-[10px] font-bold text-slate-400 block uppercase">Stage 4</span>
            <h4 className={`text-xs font-bold leading-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
              Research Proposal
            </h4>
            <span className="text-[11px] text-amber-400 font-semibold block mt-1">
              Approved
            </span>
          </div>

          {/* 5. Experiments */}
          <div
            onClick={() => onNavigate && onNavigate('experiments')}
            className={`p-4 rounded-2xl border transition-all cursor-pointer hover:scale-102 group ${
              activeProject.pipeline.experiments.status === 'IN_PROGRESS'
                ? isDarkMode ? 'bg-[#181544] border-purple-500/40 ring-1 ring-purple-500/30' : 'bg-purple-50 border-purple-200'
                : 'bg-slate-900/40 border-slate-800'
            }`}
          >
            <div className="flex items-center justify-between text-purple-400 mb-2">
              <FlaskConical className="w-5 h-5" />
              <Clock className="w-4 h-4 text-purple-400 animate-spin" />
            </div>
            <span className="text-[10px] font-bold text-slate-400 block uppercase">Stage 5</span>
            <h4 className={`text-xs font-bold leading-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
              Experiments & Data
            </h4>
            <span className="text-[11px] text-purple-300 font-semibold block mt-1">
              {activeProject.pipeline.experiments.count} Runs Active
            </span>
          </div>

          {/* 6. Final Paper */}
          <div
            onClick={() => onNavigate && onNavigate('paper_studio')}
            className={`p-4 rounded-2xl border transition-all cursor-pointer hover:scale-102 group ${
              isDarkMode ? 'bg-gradient-to-br from-blue-900/40 to-indigo-950/40 border-blue-500/50' : 'bg-blue-50 border-blue-300'
            }`}
          >
            <div className="flex items-center justify-between text-blue-400 mb-2">
              <BookOpen className="w-5 h-5" />
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
            <span className="text-[10px] font-bold text-blue-400 block uppercase">Stage 6</span>
            <h4 className={`text-xs font-bold leading-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
              Paper Studio
            </h4>
            <span className="text-[11px] text-blue-300 font-semibold block mt-1">
              {activeProject.pipeline.finalPaper.progress}% Written
            </span>
          </div>

        </div>
      </div>

      {/* 2-Column Grid: Team & Milestones + Comments & Feedback */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        
        {/* Left: Team Members & Research Milestones */}
        <div className={`p-6 rounded-3xl border space-y-5 ${
          isDarkMode ? 'bg-[#0d163a] border-[#1f3066]' : 'bg-white border-slate-200 shadow-sm'
        }`}>
          <div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-indigo-400" />
                <h3 className={`text-sm font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                  Research Team & Roles
                </h3>
              </div>
              <span className="text-[10px] font-bold text-slate-400">{activeProject.team.length} Collaborators</span>
            </div>

            <div className="space-y-2.5 mt-3">
              {activeProject.team.map((member, i) => (
                <div 
                  key={i}
                  className={`p-3 rounded-xl border flex items-center justify-between ${
                    isDarkMode ? 'bg-[#10193d] border-[#1b2b5d]' : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <img
                      src={member.avatar}
                      alt={member.name}
                      className="w-8 h-8 rounded-full object-cover border border-indigo-500/30"
                    />
                    <div>
                      <span className={`text-xs font-bold block ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                        {member.name}
                      </span>
                      <span className="text-[10px] text-slate-400 font-medium">
                        {member.role}
                      </span>
                    </div>
                  </div>

                  <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20">
                    Active
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Milestones */}
          <div className="pt-2 border-t border-slate-700/20">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
              Sprint Milestones
            </h4>
            <div className="space-y-2">
              {activeProject.milestones.map((ms, idx) => (
                <div 
                  key={idx}
                  className="flex items-center justify-between text-xs p-2 rounded-lg hover:bg-slate-800/30 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={ms.completed}
                      readOnly
                      className="rounded text-blue-600 focus:ring-0 cursor-pointer"
                    />
                    <span className={ms.completed ? 'line-through text-slate-500' : isDarkMode ? 'text-slate-200' : 'text-slate-800'}>
                      {ms.title}
                    </span>
                  </div>
                  <span className="text-[10px] font-semibold text-slate-400 shrink-0">
                    {ms.date}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Advisor Feedback & Team Comments */}
        <div className={`p-6 rounded-3xl border space-y-4 ${
          isDarkMode ? 'bg-[#0d163a] border-[#1f3066]' : 'bg-white border-slate-200 shadow-sm'
        }`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-blue-400" />
              <h3 className={`text-sm font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                Supervisor Feedback & Project Discussion
              </h3>
            </div>
            <span className="text-[10px] font-bold text-slate-400">Collaborative Review</span>
          </div>

          {/* Comments List */}
          <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1 scrollbar-thin">
            {activeProject.comments.map((c, i) => (
              <div
                key={i}
                className={`p-3.5 rounded-2xl border space-y-1.5 ${
                  isDarkMode ? 'bg-[#10193d] border-[#1e2f63]' : 'bg-slate-50 border-slate-200'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <img
                      src={c.avatar}
                      alt={c.user}
                      className="w-6 h-6 rounded-full object-cover border border-blue-500/40"
                    />
                    <span className={`text-xs font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                      {c.user}
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-400">{c.time}</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed pl-8">
                  {c.text}
                </p>
              </div>
            ))}
          </div>

          {/* New Comment Input */}
          <div className="flex items-center gap-2 pt-2 border-t border-slate-700/20">
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handlePostComment()}
              placeholder="Leave guidance, critique, or question for the team..."
              className={`flex-1 px-3 py-2 rounded-xl text-xs border focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                isDarkMode 
                  ? 'bg-[#090f26] border-[#1e2e60] text-white placeholder-slate-500' 
                  : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400'
              }`}
            />
            <button
              onClick={handlePostComment}
              className="p-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white shadow-md shadow-blue-600/30 transition-all cursor-pointer"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};

import React, { useState } from 'react';
import { 
  Search, 
  ArrowRight, 
  FileText, 
  Brain, 
  Lightbulb, 
  Network, 
  Check, 
  Upload, 
  MessageSquare, 
  Sparkles, 
  Compass, 
  TrendingUp, 
  Layers, 
  FlaskConical, 
  ShieldCheck, 
  CheckCircle2, 
  FolderPlus,
  Clock,
  ArrowUpRight,
  ChevronRight
} from 'lucide-react';
import { PaperAnalysis } from '../../types';
import { NavTab } from '../Sidebar';

interface DashboardViewProps {
  papers: PaperAnalysis[];
  onSelectPaper: (p: PaperAnalysis) => void;
  onNavigate: (tab: NavTab) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  papers,
  onSelectPaper,
  onNavigate,
}) => {
  const [searchTopic, setSearchTopic] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTopic.trim()) {
      onNavigate('discover');
    }
  };

  const PIPELINE_STEPS = [
    { id: 'discover', name: 'Discover', desc: 'Find relevant papers', icon: <Search className="w-4 h-4" />, color: 'bg-blue-600 text-white' },
    { id: 'paper_analysis', name: 'Analyze', desc: 'Extract key insights', icon: <FileText className="w-4 h-4" />, color: 'bg-indigo-600 text-white' },
    { id: 'knowledge_graph', name: 'Understand', desc: 'Build knowledge graph', icon: <Brain className="w-4 h-4" />, color: 'bg-teal-600 text-white' },
    { id: 'research_gaps', name: 'Find Gaps', desc: 'Identify opportunities', icon: <Lightbulb className="w-4 h-4" />, color: 'bg-amber-500 text-white' },
    { id: 'idea_lab', name: 'Create', desc: 'Generate new ideas', icon: <Sparkles className="w-4 h-4" />, color: 'bg-emerald-600 text-white' },
    { id: 'experiments', name: 'Plan', desc: 'Design experiments', icon: <FlaskConical className="w-4 h-4" />, color: 'bg-cyan-600 text-white' },
    { id: 'peer_review', name: 'Validate', desc: 'Review & verify', icon: <ShieldCheck className="w-4 h-4" />, color: 'bg-orange-500 text-white' },
    { id: 'research_proposal', name: 'Publish', desc: 'Write research report', icon: <FileText className="w-4 h-4" />, color: 'bg-rose-600 text-white' },
  ];

  return (
    <div className="space-y-6 pb-12 font-sans text-slate-100">
      
      {/* ROW 1: Hero Greeting Banner + Your Research Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        
        {/* Hero Greeting Banner (Col span 2) matching Screenshot */}
        <div className="lg:col-span-2 rounded-3xl bg-gradient-to-r from-[#d8e6ff] via-[#e2ebfc] to-[#edf3ff] p-6 sm:p-7 text-slate-900 relative overflow-hidden shadow-xl border border-blue-200/70 flex flex-col justify-between">
          
          {/* Subtle 3D background graphic on right */}
          <div className="absolute right-4 bottom-2 hidden sm:block opacity-90 pointer-events-none">
            <div className="relative w-40 h-36">
              {/* Decorative stacked books and plant illustration */}
              <div className="absolute bottom-0 right-4 w-28 h-6 bg-[#3b82f6]/20 rounded-md -rotate-3" />
              <div className="absolute bottom-4 right-2 w-32 h-6 bg-[#6366f1]/25 rounded-md rotate-1" />
              <div className="absolute bottom-8 right-6 w-24 h-5 bg-[#0ea5e9]/30 rounded-md -rotate-1" />
              <div className="absolute bottom-14 right-10 w-12 h-16 bg-[#10b981]/20 rounded-t-full border border-emerald-500/20" />
            </div>
          </div>

          <div className="relative z-10 max-w-xl">
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight flex items-center gap-2">
              Good evening, Vaishnavi 👋
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 font-medium">
              Turn research papers into insights, ideas and innovation.
            </p>

            {/* In-banner Search Box */}
            <form onSubmit={handleSearchSubmit} className="mt-5 flex items-center gap-2 bg-white rounded-2xl p-1.5 pl-4 shadow-sm border border-slate-200/90">
              <Search className="w-4 h-4 text-slate-400 shrink-0" />
              <input
                type="text"
                value={searchTopic}
                onChange={(e) => setSearchTopic(e.target.value)}
                placeholder="Search papers, topics, methods or datasets..."
                className="w-full bg-transparent text-xs text-slate-800 placeholder-slate-400 focus:outline-none font-medium"
              />
              <button
                type="submit"
                className="bg-[#2563eb] hover:bg-blue-700 active:scale-95 text-white px-5 py-2.5 rounded-xl text-xs font-bold transition-all shrink-0 flex items-center gap-1 shadow-md shadow-blue-500/20 cursor-pointer"
              >
                <span>Search</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>

            {/* Quick Search Chips */}
            <div className="flex items-center gap-2 flex-wrap mt-3.5 text-[11px] font-medium text-slate-600">
              {[
                'AI for flood prediction',
                'Transformer models',
                'Computer Vision datasets',
                'Latest research trends'
              ].map((chip) => (
                <button
                  key={chip}
                  type="button"
                  onClick={() => {
                    setSearchTopic(chip);
                    onNavigate('discover');
                  }}
                  className="px-2.5 py-1 rounded-lg bg-white/80 hover:bg-white border border-slate-200 text-slate-700 hover:text-blue-600 transition-colors shadow-2xs cursor-pointer"
                >
                  {chip}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Your Research Workspace Card (Col span 1) */}
        <div className="rounded-3xl bg-[#0d1633] border border-[#1b2b5a] p-6 text-white flex flex-col justify-between shadow-xl relative overflow-hidden">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-base font-bold text-white tracking-tight">
                Your Research Workspace
              </h2>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Track and manage all your research projects in one place.
              </p>
            </div>

            {/* Folder Graphic */}
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600/30 to-indigo-600/30 border border-blue-500/30 flex items-center justify-center text-blue-400 shrink-0 shadow-lg">
              <FolderPlus className="w-6 h-6" />
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-[#1b2b5a]">
            <button
              onClick={() => onNavigate('upload')}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#1a2958] hover:bg-[#223570] text-blue-300 border border-blue-500/30 text-xs font-bold transition-all shadow-sm cursor-pointer"
            >
              <span>+ New Research</span>
            </button>
          </div>
        </div>

      </div>

      {/* ROW 2: 4 Key Metric Cards Row matching Screenshot */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Card 1: Papers Uploaded */}
        <div 
          onClick={() => onNavigate('my_research')}
          className="rounded-2xl bg-[#0d1633] border border-[#1b2b5a] p-5 hover:border-blue-500/40 transition-all cursor-pointer shadow-lg group"
        >
          <div className="w-9 h-9 rounded-xl bg-blue-500/15 border border-blue-500/25 flex items-center justify-center text-blue-400 mb-3 group-hover:scale-105 transition-transform">
            <FileText className="w-4 h-4" />
          </div>
          <div className="text-2xl font-black text-white">12</div>
          <div className="text-xs text-slate-400 font-medium mt-0.5">Papers Uploaded</div>
          <div className="flex items-center text-[11px] font-semibold text-emerald-400 mt-2.5">
            <ArrowUpRight className="w-3.5 h-3.5 mr-0.5" />
            <span>+3 this week</span>
          </div>
        </div>

        {/* Card 2: Analyses Completed */}
        <div 
          onClick={() => onNavigate('paper_analysis')}
          className="rounded-2xl bg-[#0d1633] border border-[#1b2b5a] p-5 hover:border-purple-500/40 transition-all cursor-pointer shadow-lg group"
        >
          <div className="w-9 h-9 rounded-xl bg-purple-500/15 border border-purple-500/25 flex items-center justify-center text-purple-400 mb-3 group-hover:scale-105 transition-transform">
            <Brain className="w-4 h-4" />
          </div>
          <div className="text-2xl font-black text-white">8</div>
          <div className="text-xs text-slate-400 font-medium mt-0.5">Analyses Completed</div>
          <div className="flex items-center text-[11px] font-semibold text-emerald-400 mt-2.5">
            <ArrowUpRight className="w-3.5 h-3.5 mr-0.5" />
            <span>+2 today</span>
          </div>
        </div>

        {/* Card 3: Ideas Generated */}
        <div 
          onClick={() => onNavigate('idea_lab')}
          className="rounded-2xl bg-[#0d1633] border border-[#1b2b5a] p-5 hover:border-amber-500/40 transition-all cursor-pointer shadow-lg group"
        >
          <div className="w-9 h-9 rounded-xl bg-amber-500/15 border border-amber-500/25 flex items-center justify-center text-amber-400 mb-3 group-hover:scale-105 transition-transform">
            <Lightbulb className="w-4 h-4" />
          </div>
          <div className="text-2xl font-black text-white">34</div>
          <div className="text-xs text-slate-400 font-medium mt-0.5">Ideas Generated</div>
          <div className="flex items-center text-[11px] font-semibold text-emerald-400 mt-2.5">
            <ArrowUpRight className="w-3.5 h-3.5 mr-0.5" />
            <span>+12 this week</span>
          </div>
        </div>

        {/* Card 4: Gaps Detected */}
        <div 
          onClick={() => onNavigate('research_gaps')}
          className="rounded-2xl bg-[#0d1633] border border-[#1b2b5a] p-5 hover:border-cyan-500/40 transition-all cursor-pointer shadow-lg group"
        >
          <div className="w-9 h-9 rounded-xl bg-cyan-500/15 border border-cyan-500/25 flex items-center justify-center text-cyan-400 mb-3 group-hover:scale-105 transition-transform">
            <Network className="w-4 h-4" />
          </div>
          <div className="text-2xl font-black text-white">19</div>
          <div className="text-xs text-slate-400 font-medium mt-0.5">Gaps Detected</div>
          <div className="flex items-center text-[11px] font-semibold text-emerald-400 mt-2.5">
            <ArrowUpRight className="w-3.5 h-3.5 mr-0.5" />
            <span>+5 recent</span>
          </div>
        </div>

      </div>

      {/* ROW 3: Left Column (Continue Research, Pipeline, Recent Papers) + Right Column (Activity, Actions, Opportunity) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        
        {/* LEFT COLUMN (Span 2) */}
        <div className="lg:col-span-2 space-y-5">
          
          {/* Continue Your Research Featured Box */}
          <div className="rounded-3xl bg-[#0d1633] border border-[#1b2b5a] p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-white">Continue Your Research</h3>
              <button 
                onClick={() => onNavigate('my_research')}
                className="text-xs font-semibold text-blue-400 hover:text-blue-300 flex items-center gap-1 cursor-pointer"
              >
                <span>View All</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
            <p className="text-xs text-slate-400 -mt-2">
              Pick up where you left off or start a new research journey.
            </p>

            {/* Main Active Project Card */}
            <div 
              onClick={() => onNavigate('research_gaps')}
              className="p-4 sm:p-5 rounded-2xl bg-[#111c40] border border-[#1e2e60] hover:border-blue-500/50 transition-all cursor-pointer flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
            >
              <div className="flex items-start gap-4">
                {/* Glowing Doc Icon */}
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-600/30 to-indigo-600/30 border border-blue-500/30 flex items-center justify-center text-blue-400 shrink-0 shadow-lg">
                  <FileText className="w-7 h-7" />
                </div>

                <div className="space-y-2">
                  <h4 className="text-sm font-bold text-white leading-tight">
                    AI-Based Flood Prediction Using IoT
                  </h4>

                  {/* Badges */}
                  <div className="flex items-center gap-2 flex-wrap text-[10px] font-semibold">
                    <span className="px-2.5 py-0.5 rounded-full bg-blue-500/15 text-blue-300 border border-blue-500/30">
                      Climate Science
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-teal-500/15 text-teal-300 border border-teal-500/30">
                      IoT
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-purple-500/15 text-purple-300 border border-purple-500/30">
                      Machine Learning
                    </span>
                  </div>

                  {/* Progress Bar */}
                  <div className="space-y-1 pt-1">
                    <div className="flex items-center justify-between text-[11px] text-slate-400">
                      <span>Research Progress</span>
                      <span className="font-bold text-blue-400">60%</span>
                    </div>
                    <div className="w-56 sm:w-72 bg-slate-800 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-gradient-to-r from-blue-500 to-indigo-500 h-full rounded-full w-[60%]" />
                    </div>
                  </div>

                  {/* Metric checkmarks */}
                  <div className="flex items-center gap-3 flex-wrap text-[11px] text-slate-300 pt-1">
                    <span className="flex items-center gap-1 text-emerald-400">
                      <Check className="w-3.5 h-3.5" /> Papers Found: 27
                    </span>
                    <span className="flex items-center gap-1 text-emerald-400">
                      <Check className="w-3.5 h-3.5" /> Analyzed: 18
                    </span>
                    <span className="flex items-center gap-1 text-emerald-400">
                      <Check className="w-3.5 h-3.5" /> Gaps: 5
                    </span>
                    <span className="flex items-center gap-1 text-emerald-400">
                      <Check className="w-3.5 h-3.5" /> Ideas: 2
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Arrow Circle Action */}
              <div className="self-end sm:self-center">
                <div className="w-10 h-10 rounded-full bg-blue-600 hover:bg-blue-500 text-white flex items-center justify-center shadow-md shadow-blue-600/30 transition-transform group-hover:scale-105">
                  <ArrowRight className="w-5 h-5" />
                </div>
              </div>
            </div>
          </div>

          {/* Research Pipeline Journey matching Screenshot */}
          <div className="rounded-3xl bg-[#0d1633] border border-[#1b2b5a] p-6 shadow-xl space-y-4">
            <div>
              <h3 className="text-base font-bold text-white">Research Pipeline</h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Your complete research journey, from discovery to innovation.
              </p>
            </div>

            {/* Stepper Flow */}
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2 pt-2">
              {PIPELINE_STEPS.map((step, idx) => (
                <div
                  key={step.id}
                  onClick={() => onNavigate(step.id as any)}
                  className="flex flex-col items-center text-center p-2 rounded-xl hover:bg-slate-800/40 transition-colors cursor-pointer group"
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${step.color} shadow-md group-hover:scale-110 transition-transform mb-2`}>
                    {step.icon}
                  </div>
                  <span className="text-xs font-bold text-white group-hover:text-blue-400 transition-colors">
                    {step.name}
                  </span>
                  <span className="text-[10px] text-slate-400 leading-tight mt-0.5">
                    {step.desc}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Papers Row */}
          <div className="rounded-3xl bg-[#0d1633] border border-[#1b2b5a] p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-white">Recent Papers</h3>
              <button 
                onClick={() => onNavigate('my_research')}
                className="text-xs font-semibold text-blue-400 hover:text-blue-300 flex items-center gap-1 cursor-pointer"
              >
                <span>View All</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { title: 'Transformer Architecture...', tag: 'NLP', bg: 'from-blue-600/20 to-indigo-600/20' },
                { title: 'Federated Learning Survey', tag: 'Machine Learning', bg: 'from-purple-600/20 to-pink-600/20' },
                { title: 'GAN-based Image Synthesis', tag: 'Computer Vision', bg: 'from-teal-600/20 to-emerald-600/20' },
                { title: 'Reinforcement Learning...', tag: 'Robotics', bg: 'from-amber-600/20 to-orange-600/20' }
              ].map((paper, i) => (
                <div 
                  key={i}
                  onClick={() => onNavigate('paper_analysis')}
                  className="p-3.5 rounded-2xl bg-[#111c40] border border-[#1e2e60] hover:border-blue-500/40 transition-all cursor-pointer space-y-2"
                >
                  <div className={`w-8 h-8 rounded-xl bg-gradient-to-tr ${paper.bg} border border-white/10 flex items-center justify-center text-blue-300`}>
                    <FileText className="w-4 h-4" />
                  </div>
                  <h5 className="text-xs font-bold text-white line-clamp-1">
                    {paper.title}
                  </h5>
                  <span className="text-[10px] text-slate-400 block font-mono">
                    {paper.tag}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN (Span 1) matching Screenshot */}
        <div className="space-y-5">
          
          {/* Recent Activity */}
          <div className="rounded-3xl bg-[#0d1633] border border-[#1b2b5a] p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-[#1b2b5a] pb-3">
              <h3 className="text-base font-bold text-white">Recent Activity</h3>
              <button 
                onClick={() => onNavigate('my_research')}
                className="text-xs font-semibold text-blue-400 hover:text-blue-300 flex items-center gap-1 cursor-pointer"
              >
                <span>View All</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-3.5">
              {[
                { title: 'Paper analyzed', desc: 'Attention Is All You Need', time: '2 hours ago', icon: <FileText className="w-3.5 h-3.5 text-blue-400" />, bg: 'bg-blue-500/15' },
                { title: 'New gap detected', desc: 'Limitations in dataset size', time: '4 hours ago', icon: <Brain className="w-3.5 h-3.5 text-purple-400" />, bg: 'bg-purple-500/15' },
                { title: 'Idea generated', desc: 'Real-time edge-based prediction', time: '1 day ago', icon: <Lightbulb className="w-3.5 h-3.5 text-amber-400" />, bg: 'bg-amber-500/15' },
                { title: 'Knowledge graph updated', desc: '43 new connections', time: '1 day ago', icon: <Network className="w-3.5 h-3.5 text-teal-400" />, bg: 'bg-teal-500/15' },
                { title: 'Research chat', desc: 'Ask a question about your paper', time: '2 days ago', icon: <MessageSquare className="w-3.5 h-3.5 text-blue-400" />, bg: 'bg-blue-500/15' }
              ].map((act, i) => (
                <div key={i} className="flex items-start justify-between gap-3 text-xs">
                  <div className="flex items-start gap-2.5">
                    <div className={`w-7 h-7 rounded-lg ${act.bg} flex items-center justify-center shrink-0 mt-0.5`}>
                      {act.icon}
                    </div>
                    <div>
                      <span className="font-bold text-white block">{act.title}</span>
                      <span className="text-[11px] text-slate-400 block mt-0.5">{act.desc}</span>
                    </div>
                  </div>
                  <span className="text-[10px] text-slate-500 font-mono shrink-0">{act.time}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="rounded-3xl bg-[#0d1633] border border-[#1b2b5a] p-6 shadow-xl space-y-3">
            <h3 className="text-base font-bold text-white border-b border-[#1b2b5a] pb-3">
              Quick Actions
            </h3>

            <div className="space-y-2">
              <button
                onClick={() => onNavigate('upload')}
                className="w-full p-3 rounded-2xl bg-[#111c40] hover:bg-[#162452] border border-[#1e2e60] text-left flex items-center gap-3 transition-colors cursor-pointer"
              >
                <div className="w-8 h-8 rounded-xl bg-blue-600/20 text-blue-400 flex items-center justify-center">
                  <Upload className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs font-bold text-white block">Upload a Paper</span>
                  <span className="text-[10px] text-slate-400 block">PDF, arXiv, or DOI</span>
                </div>
              </button>

              <button
                onClick={() => onNavigate('discover')}
                className="w-full p-3 rounded-2xl bg-[#111c40] hover:bg-[#162452] border border-[#1e2e60] text-left flex items-center gap-3 transition-colors cursor-pointer"
              >
                <div className="w-8 h-8 rounded-xl bg-purple-600/20 text-purple-400 flex items-center justify-center">
                  <Search className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs font-bold text-white block">Search ArXiv</span>
                  <span className="text-[10px] text-slate-400 block">2.4M+ papers indexed</span>
                </div>
              </button>

              <button
                onClick={() => onNavigate('research_chat')}
                className="w-full p-3 rounded-2xl bg-[#111c40] hover:bg-[#162452] border border-[#1e2e60] text-left flex items-center gap-3 transition-colors cursor-pointer"
              >
                <div className="w-8 h-8 rounded-xl bg-teal-600/20 text-teal-400 flex items-center justify-center">
                  <MessageSquare className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs font-bold text-white block">Open Research Chat</span>
                  <span className="text-[10px] text-slate-400 block">Ask anything (RAG powered)</span>
                </div>
              </button>
            </div>
          </div>

          {/* New Research Opportunity Gradient Card matching Screenshot */}
          <div className="rounded-3xl bg-gradient-to-br from-[#1d1645] via-[#1b1c4e] to-[#0f1d47] border border-purple-500/30 p-5 shadow-xl space-y-3 relative overflow-hidden">
            
            {/* Wave glow SVG */}
            <div className="absolute right-0 bottom-0 opacity-40 pointer-events-none">
              <svg width="120" height="60" viewBox="0 0 120 60" fill="none">
                <path d="M 0 50 Q 30 10, 60 40 T 120 10" stroke="#a855f7" strokeWidth="3" fill="none" />
              </svg>
            </div>

            <div className="flex items-center gap-2 text-amber-300 text-xs font-bold">
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>New Research Opportunity</span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed font-medium">
              Real-time flood prediction using edge AI shows high innovation potential.
            </p>

            <button
              onClick={() => onNavigate('research_gaps')}
              className="bg-[#2563eb] hover:bg-blue-600 text-white text-xs font-bold px-4 py-2 rounded-xl shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <span>Explore Gaps</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};

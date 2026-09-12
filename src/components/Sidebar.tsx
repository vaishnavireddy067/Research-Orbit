import React from 'react';
import { 
  Home, 
  FolderGit2, 
  Search, 
  Brain, 
  Network, 
  Lightbulb, 
  Rocket, 
  FlaskConical, 
  FileText, 
  UserCheck, 
  CheckCheck, 
  ShieldAlert, 
  TrendingUp, 
  MessageSquare, 
  Headphones, 
  Settings, 
  ChevronDown,
  Atom,
  LogOut
} from 'lucide-react';

export type NavTab = 
  // 1. WORKSPACE
  | 'overview'
  | 'my_research'
  | 'discover'
  // 2. ANALYZE
  | 'paper_analysis'
  | 'knowledge_graph'
  | 'research_gaps'
  // 3. BUILD
  | 'idea_lab'
  | 'experiments'
  | 'research_proposal'
  // 4. VALIDATE
  | 'peer_review'
  | 'evidence_check'
  | 'risk_reproducibility'
  // 5. INSIGHTS
  | 'trends'
  | 'research_chat'
  | 'audio_brief'
  | 'settings'
  // Backwards compatibility mappings:
  | 'dashboard'
  | 'upload'
  | 'my_papers'
  | 'discovery'
  | 'lit_review'
  | 'gap_idea'
  | 'agents'
  | 'citation_verify'
  | 'experiment_planner'
  | 'experiment_dashboard'
  | 'peer_reviewer'
  | 'roadmap'
  | 'podcast'
  | 'ai_assistant'
  | 'insights'
  | 'gap_analysis'
  | 'weak_arguments'
  | 'novelty_score'
  | 'ai_detection'
  | 'improvements'
  | 'idea_expansion';

interface SidebarProps {
  activeTab: NavTab;
  setActiveTab: (tab: NavTab) => void;
  collapsed?: boolean;
  setCollapsed?: (collapsed: boolean) => void;
  onLogout: () => void;
  isDarkMode?: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  onLogout,
  isDarkMode = true,
}) => {
  // Helper to check active state including aliases
  const isTabActive = (tabKey: NavTab) => {
    if (activeTab === tabKey) return true;
    if (tabKey === 'overview' && activeTab === 'dashboard') return true;
    if (tabKey === 'my_research' && activeTab === 'my_papers') return true;
    if (tabKey === 'discover' && (activeTab === 'discovery' || activeTab === 'lit_review')) return true;
    if (tabKey === 'paper_analysis' && (activeTab === 'upload' || activeTab === 'novelty_score' || activeTab === 'ai_detection')) return true;
    if (tabKey === 'research_gaps' && (activeTab === 'gap_analysis' || activeTab === 'weak_arguments' || activeTab === 'improvements')) return true;
    if (tabKey === 'idea_lab' && (activeTab === 'gap_idea' || activeTab === 'idea_expansion' || activeTab === 'agents')) return true;
    if (tabKey === 'experiments' && (activeTab === 'experiment_planner' || activeTab === 'experiment_dashboard')) return true;
    if (tabKey === 'research_proposal' && activeTab === 'gap_idea') return true;
    if (tabKey === 'peer_review' && activeTab === 'peer_reviewer') return true;
    if (tabKey === 'evidence_check' && activeTab === 'citation_verify') return true;
    if (tabKey === 'trends' && (activeTab === 'roadmap' || activeTab === 'insights')) return true;
    if (tabKey === 'research_chat' && activeTab === 'ai_assistant') return true;
    if (tabKey === 'audio_brief' && activeTab === 'podcast') return true;
    return false;
  };

  const renderNavBtn = (tabKey: NavTab, label: string, icon: React.ReactNode) => {
    const active = isTabActive(tabKey);
    return (
      <button
        onClick={() => setActiveTab(tabKey)}
        title={label}
        className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer select-none ${
          active
            ? 'bg-[#2563eb] text-white shadow-md shadow-blue-600/30'
            : isDarkMode
            ? 'text-slate-400 hover:text-slate-100 hover:bg-[#162244]/60'
            : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
        }`}
      >
        <span className={`shrink-0 ${active ? 'text-white' : isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
          {icon}
        </span>
        <span className="truncate whitespace-nowrap">{label}</span>
      </button>
    );
  };

  return (
    <aside className={`no-print border-r flex flex-col justify-between h-screen sticky top-0 z-30 select-none w-60 shrink-0 font-sans transition-colors ${
      isDarkMode ? 'border-[#162347] bg-[#070e24] text-slate-300' : 'border-slate-200 bg-white text-slate-700 shadow-xs'
    }`}>
      
      {/* Brand Header matching Screenshot */}
      <div className={`p-4 border-b ${isDarkMode ? 'border-[#162347]' : 'border-slate-200'}`}>
        <div 
          onClick={() => setActiveTab('overview')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-600/30 group-hover:scale-105 transition-transform">
            <Atom className="h-5 w-5" />
          </div>
          <div className="overflow-hidden">
            <h1 className={`font-bold text-base tracking-tight leading-none ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
              ResearchPilot
            </h1>
            <span className="text-[11px] text-slate-400 block mt-1 font-medium">
              AI Research Intelligence
            </span>
          </div>
        </div>
      </div>

      {/* Navigation Groups - Clean 5-Stage Hierarchy */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-5 scrollbar-thin scrollbar-thumb-slate-800">
        
        {/* 1. WORKSPACE */}
        <div>
          <div className="px-3 pb-2 text-[10px] font-bold tracking-wider uppercase text-slate-500">
            WORKSPACE
          </div>
          <div className="space-y-0.5">
            {renderNavBtn('overview', 'Overview', <Home className="h-4 w-4" />)}
            {renderNavBtn('my_research', 'My Research', <FolderGit2 className="h-4 w-4" />)}
            {renderNavBtn('discover', 'Discover', <Search className="h-4 w-4" />)}
          </div>
        </div>

        {/* 2. ANALYZE */}
        <div>
          <div className="px-3 pb-2 text-[10px] font-bold tracking-wider uppercase text-slate-500">
            ANALYZE
          </div>
          <div className="space-y-0.5">
            {renderNavBtn('paper_analysis', 'Paper Analysis', <Brain className="h-4 w-4" />)}
            {renderNavBtn('knowledge_graph', 'Knowledge Graph', <Network className="h-4 w-4" />)}
            {renderNavBtn('research_gaps', 'Research Gaps', <Lightbulb className="h-4 w-4" />)}
          </div>
        </div>

        {/* 3. BUILD */}
        <div>
          <div className="px-3 pb-2 text-[10px] font-bold tracking-wider uppercase text-slate-500">
            BUILD
          </div>
          <div className="space-y-0.5">
            {renderNavBtn('idea_lab', 'Idea Lab', <Rocket className="h-4 w-4" />)}
            {renderNavBtn('experiments', 'Experiments', <FlaskConical className="h-4 w-4" />)}
            {renderNavBtn('research_proposal', 'Research Proposal', <FileText className="h-4 w-4" />)}
          </div>
        </div>

        {/* 4. VALIDATE */}
        <div>
          <div className="px-3 pb-2 text-[10px] font-bold tracking-wider uppercase text-slate-500">
            VALIDATE
          </div>
          <div className="space-y-0.5">
            {renderNavBtn('peer_review', 'Peer Review', <UserCheck className="h-4 w-4" />)}
            {renderNavBtn('evidence_check', 'Evidence Check', <CheckCheck className="h-4 w-4" />)}
            {renderNavBtn('risk_reproducibility', 'Risk & Reproducibility', <ShieldAlert className="h-4 w-4" />)}
          </div>
        </div>

        {/* 5. INSIGHTS */}
        <div>
          <div className="px-3 pb-2 text-[10px] font-bold tracking-wider uppercase text-slate-500">
            INSIGHTS
          </div>
          <div className="space-y-0.5">
            {renderNavBtn('trends', 'Trends', <TrendingUp className="h-4 w-4" />)}
            {renderNavBtn('research_chat', 'Research Chat', <MessageSquare className="h-4 w-4" />)}
            {renderNavBtn('audio_brief', 'Audio Brief', <Headphones className="h-4 w-4" />)}
          </div>
        </div>

        {/* 6. SETTINGS */}
        <div className="pt-2 border-t border-[#162347]">
          {renderNavBtn('settings', 'Settings', <Settings className="h-4 w-4" />)}
        </div>

      </div>

      {/* Bottom User Card matching Screenshot */}
      <div className={`p-3 border-t flex items-center justify-between transition-colors ${
        isDarkMode ? 'border-[#162347] bg-[#060b1c]' : 'border-slate-200 bg-slate-50'
      }`}>
        <div className="flex items-center gap-2.5 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
            alt="Vaishnavi"
            className="w-8 h-8 rounded-full object-cover border border-indigo-500/40 shrink-0"
          />
          <div className="overflow-hidden">
            <span className={`block text-xs font-bold truncate leading-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
              Vaishnavi
            </span>
            <span className="block text-[10px] text-slate-400 truncate">
              Researcher
            </span>
          </div>
        </div>

        <button
          onClick={onLogout}
          title="Logout"
          className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
        >
          <LogOut className="h-3.5 w-3.5" />
        </button>
      </div>

    </aside>
  );
};

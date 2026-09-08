import React from 'react';
import { 
  Sparkles, 
  Library, 
  Share2, 
  Search, 
  FileCheck2, 
  Volume2, 
  Printer, 
  MessageSquareText, 
  User as UserIcon, 
  LogOut, 
  LogIn 
} from 'lucide-react';
import { User, PaperAnalysis } from '../types';

interface NavbarProps {
  activeTab: 'analyze' | 'library' | 'graph' | 'arxiv' | 'reviewer';
  setActiveTab: (tab: 'analyze' | 'library' | 'graph' | 'arxiv' | 'reviewer') => void;
  activePaper: PaperAnalysis | null;
  currentUser: User | null;
  onOpenAuth: () => void;
  onLogout: () => void;
  onToggleChat: () => void;
  onToggleAudio: () => void;
  onOpenDossier: () => void;
  isAudioPlaying: boolean;
  isChatOpen: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  activePaper,
  currentUser,
  onOpenAuth,
  onLogout,
  onToggleChat,
  onToggleAudio,
  onOpenDossier,
  isAudioPlaying,
  isChatOpen,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800 bg-slate-950/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Brand */}
        <div className="flex items-center gap-6">
          <div 
            onClick={() => setActiveTab('analyze')} 
            className="flex cursor-pointer items-center gap-3 group"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-cyan-400 p-0.5 shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform">
              <div className="flex h-full w-full items-center justify-center rounded-[10px] bg-slate-950">
                <Sparkles className="h-5 w-5 text-indigo-400 animate-pulse" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
                  ResearchPilot
                </span>
                <span className="rounded-full bg-indigo-500/10 px-2 py-0.5 text-[10px] font-semibold text-indigo-400 border border-indigo-500/20">
                  AI Hub
                </span>
              </div>
              <p className="text-[11px] text-slate-400 hidden sm:block">
                Autonomous Research Intelligence
              </p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="hidden md:flex items-center gap-1 rounded-xl bg-slate-900/60 p-1 border border-slate-800">
            <button
              onClick={() => setActiveTab('analyze')}
              className={`flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
                activeTab === 'analyze'
                  ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-500/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <Sparkles className="h-3.5 w-3.5" />
              Analysis Hub
            </button>

            <button
              onClick={() => setActiveTab('library')}
              className={`flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
                activeTab === 'library'
                  ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-500/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <Library className="h-3.5 w-3.5" />
              Library
            </button>

            <button
              onClick={() => setActiveTab('graph')}
              className={`flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
                activeTab === 'graph'
                  ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-500/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <Share2 className="h-3.5 w-3.5" />
              Innovation Map
            </button>

            <button
              onClick={() => setActiveTab('arxiv')}
              className={`flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
                activeTab === 'arxiv'
                  ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-500/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <Search className="h-3.5 w-3.5" />
              Global ArXiv
            </button>

            <button
              onClick={() => setActiveTab('reviewer')}
              className={`flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
                activeTab === 'reviewer'
                  ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-500/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <FileCheck2 className="h-3.5 w-3.5" />
              Reviewer #2
            </button>
          </nav>
        </div>

        {/* Right Action Icons & Auth */}
        <div className="flex items-center gap-2 sm:gap-3">
          {activePaper && (
            <div className="hidden lg:flex items-center gap-2 pr-2 border-r border-slate-800">
              {/* Audio Brief button */}
              <button
                onClick={onToggleAudio}
                title="AI Audio Brief (Text-to-Speech)"
                className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium transition-all ${
                  isAudioPlaying
                    ? 'bg-purple-600 text-white animate-pulse'
                    : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
                }`}
              >
                <Volume2 className="h-3.5 w-3.5 text-purple-400" />
                <span>{isAudioPlaying ? 'Playing' : 'Audio Brief'}</span>
              </button>

              {/* Printable Dossier button */}
              <button
                onClick={onOpenDossier}
                title="Generate Printable Intelligence Dossier"
                className="flex items-center gap-1.5 rounded-lg bg-slate-900 border border-slate-800 px-2.5 py-1.5 text-xs font-medium text-slate-300 hover:bg-slate-800 transition-all"
              >
                <Printer className="h-3.5 w-3.5 text-cyan-400" />
                <span>Dossier</span>
              </button>

              {/* RAG Chat button */}
              <button
                onClick={onToggleChat}
                title="Query Paper with AI Chat"
                className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium transition-all ${
                  isChatOpen
                    ? 'bg-indigo-600 text-white'
                    : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
                }`}
              >
                <MessageSquareText className="h-3.5 w-3.5 text-indigo-400" />
                <span>Chat</span>
              </button>
            </div>
          )}

          {/* User Auth Info */}
          {currentUser ? (
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 rounded-xl bg-slate-900/80 border border-slate-800 px-3 py-1.5">
                <div className="h-6 w-6 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-[11px] font-bold text-white uppercase">
                  {currentUser.email.charAt(0)}
                </div>
                <span className="text-xs text-slate-300 max-w-[120px] truncate hidden sm:inline">
                  {currentUser.full_name || currentUser.email.split('@')[0]}
                </span>
              </div>
              <button
                onClick={onLogout}
                title="Log out"
                className="rounded-lg p-2 text-slate-400 hover:bg-slate-900 hover:text-rose-400 transition-colors"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={onOpenAuth}
              className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-4 py-2 text-xs font-semibold text-white shadow-md shadow-indigo-600/20 hover:from-indigo-500 hover:to-purple-500 transition-all"
            >
              <LogIn className="h-3.5 w-3.5" />
              Sign In
            </button>
          )}
        </div>
      </div>

      {/* Mobile Submenu Navigation */}
      <div className="flex md:hidden overflow-x-auto border-t border-slate-800/80 bg-slate-950 px-4 py-2 gap-2 scrollbar-none">
        <button
          onClick={() => setActiveTab('analyze')}
          className={`px-3 py-1 rounded-lg text-xs whitespace-nowrap ${
            activeTab === 'analyze' ? 'bg-indigo-600 text-white' : 'text-slate-400'
          }`}
        >
          Analysis
        </button>
        <button
          onClick={() => setActiveTab('library')}
          className={`px-3 py-1 rounded-lg text-xs whitespace-nowrap ${
            activeTab === 'library' ? 'bg-indigo-600 text-white' : 'text-slate-400'
          }`}
        >
          Library
        </button>
        <button
          onClick={() => setActiveTab('graph')}
          className={`px-3 py-1 rounded-lg text-xs whitespace-nowrap ${
            activeTab === 'graph' ? 'bg-indigo-600 text-white' : 'text-slate-400'
          }`}
        >
          Map
        </button>
        <button
          onClick={() => setActiveTab('arxiv')}
          className={`px-3 py-1 rounded-lg text-xs whitespace-nowrap ${
            activeTab === 'arxiv' ? 'bg-indigo-600 text-white' : 'text-slate-400'
          }`}
        >
          ArXiv
        </button>
        <button
          onClick={() => setActiveTab('reviewer')}
          className={`px-3 py-1 rounded-lg text-xs whitespace-nowrap ${
            activeTab === 'reviewer' ? 'bg-indigo-600 text-white' : 'text-slate-400'
          }`}
        >
          Reviewer #2
        </button>
      </div>
    </header>
  );
};

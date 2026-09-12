import React from 'react';
import { Search, Bell, Sun, Moon } from 'lucide-react';
import { User } from '../types';

interface HeaderProps {
  currentUser: User | null;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  onToggleSidebar?: () => void;
  onActiveAiNodeClick?: () => void;
  onOpenAuth: () => void;
  onOpenDossier?: () => void;
  isDarkMode?: boolean;
  onToggleTheme?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentUser,
  searchQuery,
  setSearchQuery,
  onOpenAuth,
  onOpenDossier,
  isDarkMode = true,
  onToggleTheme,
}) => {
  return (
    <header className={`no-print h-16 border-b px-6 flex items-center justify-between sticky top-0 z-20 font-sans transition-colors ${
      isDarkMode 
        ? 'border-[#162347] bg-[#070e24]/95 backdrop-blur-xl text-slate-100' 
        : 'border-slate-200 bg-white/95 backdrop-blur-xl text-slate-800 shadow-xs'
    }`}>
      
      {/* Left: Search Bar */}
      <div className="flex items-center gap-4 flex-1 max-w-xl">
        <div className="relative w-full">
          <Search className="absolute left-3.5 top-2.5 h-4 w-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search papers, topics, methods, datasets..."
            className={`w-full rounded-xl pl-10 pr-4 py-2 text-xs focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30 transition-all font-medium ${
              isDarkMode
                ? 'bg-[#0e1838] border border-[#1e2d5a] text-slate-200 placeholder-slate-400'
                : 'bg-slate-100 border border-slate-200 text-slate-800 placeholder-slate-500'
            }`}
          />
        </div>
      </div>

      {/* Right Controls matching Screenshot */}
      <div className="flex items-center gap-3.5 ml-4">
        
        {/* Executive Dossier Action */}
        {onOpenDossier && (
          <button
            onClick={onOpenDossier}
            title="Generate Printable Intelligence Dossier"
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-blue-600/30 to-indigo-600/30 hover:from-blue-600/50 hover:to-indigo-600/50 text-blue-300 border border-blue-500/30 text-[11px] font-bold transition-all shadow-sm cursor-pointer"
          >
            <span>📄 Dossier</span>
          </button>
        )}

        {/* Llama 3 • Groq Status Badge */}
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-[11px] font-semibold">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>Llama 3 • Groq</span>
        </div>

        {/* Light / Dark Mode Toggle Button */}
        {onToggleTheme && (
          <button
            onClick={onToggleTheme}
            title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            className={`p-2 rounded-xl transition-all flex items-center justify-center cursor-pointer ${
              isDarkMode 
                ? 'text-yellow-400 hover:bg-[#162347] hover:text-yellow-300' 
                : 'text-slate-600 hover:bg-slate-200 hover:text-slate-900'
            }`}
          >
            {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
        )}

        {/* Notification Bell with red indicator */}
        <button 
          title="Notifications"
          className={`relative p-2 rounded-xl transition-colors ${
            isDarkMode 
              ? 'text-slate-400 hover:text-white hover:bg-[#162347]' 
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200'
          }`}
        >
          <Bell className="h-4 w-4" />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-rose-500 ring-2 ring-slate-900" />
        </button>

        {/* User Avatar Circle V matching Screenshot */}
        <div 
          onClick={onOpenAuth}
          title="Vaishnavi (Researcher)"
          className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white shadow-md shadow-blue-600/30 hover:scale-105 transition-transform cursor-pointer border border-blue-400/30"
        >
          V
        </div>

      </div>

    </header>
  );
};

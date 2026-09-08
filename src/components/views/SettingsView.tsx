import React from 'react';
import { Settings, User, Cpu, Key, LogOut } from 'lucide-react';
import { User as UserType } from '../../types';

interface SettingsViewProps {
  currentUser: UserType | null;
  onLogout: () => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({ currentUser, onLogout }) => {
  return (
    <div className="max-w-3xl space-y-6 pb-12">
      <div>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2.5">
          <Settings className="h-7 w-7 text-slate-700" />
          <span>Platform Settings</span>
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Manage your research profile, inference configurations, and API keys.
        </p>
      </div>

      {/* User Profile Card */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-[0_2px_10px_-3px_rgba(0,0,0,0.05)] space-y-4">
        <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
          <User className="h-4 w-4 text-blue-600" />
          <span>Research Profile</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/60">
            <span className="text-[11px] font-bold text-slate-400 uppercase">Email</span>
            <div className="text-slate-800 font-semibold mt-0.5">{currentUser?.email || 'tester@research.org'}</div>
          </div>
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/60">
            <span className="text-[11px] font-bold text-slate-400 uppercase">Role</span>
            <div className="text-slate-800 font-semibold mt-0.5">{currentUser?.full_name || 'Tester Research Lead'}</div>
          </div>
        </div>
      </div>

      {/* Inference Engine Card */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-[0_2px_10px_-3px_rgba(0,0,0,0.05)] space-y-4">
        <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
          <Cpu className="h-4 w-4 text-purple-600" />
          <span>Inference Model Engine</span>
        </h2>
        <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/60 flex items-center justify-between text-xs">
          <div>
            <div className="font-bold text-slate-900">Llama 3.3 70B Versatile</div>
            <div className="text-slate-500 mt-0.5">High-speed inference via Groq Cloud LLM API</div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-600 font-bold text-[11px]">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            Connected
          </span>
        </div>
      </div>

      {/* Logout Action */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-[0_2px_10px_-3px_rgba(0,0,0,0.05)] flex items-center justify-between">
        <div>
          <div className="text-sm font-bold text-slate-900">Sign Out of Session</div>
          <div className="text-xs text-slate-500 mt-0.5">Clears stored JWT auth keys from this browser.</div>
        </div>
        <button
          onClick={onLogout}
          className="flex items-center gap-2 rounded-xl bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-700 font-bold px-4 py-2 text-xs transition-colors"
        >
          <LogOut className="h-4 w-4" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { X, Lock, Mail, User as UserIcon, Sparkles, AlertCircle, Loader2 } from 'lucide-react';
import { User } from '../types';
import { api } from '../services/api';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (user: User) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setIsLoading(true);

    try {
      if (mode === 'register') {
        await api.register(email, password, fullName || 'Scholar');
        // Auto login after register
        const res = await api.login(email, password);
        onSuccess(res.user);
        onClose();
      } else {
        const res = await api.login(email, password);
        onSuccess(res.user);
        onClose();
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Authentication failed');
    } finally {
      setIsLoading(false);
    }
  };

  // Demo / Guest login feature for instant access
  const handleDemoScholar = async () => {
    setIsLoading(true);
    setErrorMsg(null);
    try {
      // Try existing test account or register a demo session
      const demoEmail = `scholar_${Math.floor(Math.random() * 8999 + 1000)}@researchpilot.ai`;
      const demoPass = 'pilot123456';
      await api.register(demoEmail, demoPass, 'Visiting Scholar');
      const res = await api.login(demoEmail, demoPass);
      onSuccess(res.user);
      onClose();
    } catch (err: any) {
      setErrorMsg('Demo login error: ' + (err.message || 'Could not connect to backend'));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md">
      <div className="relative w-full max-w-md rounded-3xl border border-slate-800 bg-slate-950 p-6 sm:p-8 shadow-2xl">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-5 top-5 rounded-xl p-1.5 text-slate-400 hover:bg-slate-900 hover:text-white transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Brand Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-600/30">
            <Sparkles className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">ResearchPilot AI</h3>
            <p className="text-xs text-slate-400">Autonomous Intelligence Hub</p>
          </div>
        </div>

        {/* Tab Toggle */}
        <div className="grid grid-cols-2 rounded-xl bg-slate-900 p-1 mb-6 border border-slate-800">
          <button
            onClick={() => {
              setMode('login');
              setErrorMsg(null);
            }}
            className={`rounded-lg py-2 text-xs font-bold transition-all ${
              mode === 'login' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => {
              setMode('register');
              setErrorMsg(null);
            }}
            className={`rounded-lg py-2 text-xs font-bold transition-all ${
              mode === 'register' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
          >
            Create Account
          </button>
        </div>

        {errorMsg && (
          <div className="mb-4 flex items-center gap-2 rounded-xl bg-rose-500/10 border border-rose-500/30 p-3 text-xs text-rose-300">
            <AlertCircle className="h-4 w-4 shrink-0 text-rose-400" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'register' && (
            <div>
              <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                Full Name
              </label>
              <div className="relative">
                <UserIcon className="absolute left-3.5 top-3 h-4 w-4 text-slate-500" />
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Dr. Alex Rivera"
                  className="w-full rounded-xl bg-slate-900 border border-slate-800 pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-[11px] font-semibold text-slate-300 mb-1">
              Academic or Institutional Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-3 h-4 w-4 text-slate-500" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="scholar@university.edu"
                className="w-full rounded-xl bg-slate-900 border border-slate-800 pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-300 mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-3 h-4 w-4 text-slate-500" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-xl bg-slate-900 border border-slate-800 pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 py-3 text-xs font-bold text-white shadow-lg shadow-indigo-600/30 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 transition-all mt-2"
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : mode === 'login' ? (
              'Sign In to Laboratory'
            ) : (
              'Create Scholar Account'
            )}
          </button>
        </form>

        {/* Instant Access Demo Scholar Button */}
        <div className="mt-6 pt-5 border-t border-slate-800/80 text-center">
          <p className="text-[11px] text-slate-500 mb-2">Want to quickly explore without entering credentials?</p>
          <button
            type="button"
            onClick={handleDemoScholar}
            disabled={isLoading}
            className="w-full rounded-xl bg-slate-900 border border-slate-700 py-2.5 text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800 transition-all"
          >
            ⚡ Instant Access (Demo Scholar)
          </button>
        </div>

      </div>
    </div>
  );
};

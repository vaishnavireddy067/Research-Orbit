import React, { useState, useRef, useEffect } from 'react';
import { 
  Bot, 
  Sparkles, 
  X, 
  Send, 
  Maximize2, 
  Compass, 
  Dna, 
  ShieldAlert, 
  CheckCircle2, 
  RotateCcw,
  Loader2,
  ChevronUp,
  ChevronDown
} from 'lucide-react';
import { PaperAnalysis, CopilotMessage } from '../types';
import { api } from '../services/api';
import { NavTab } from './Sidebar';

interface FloatingCopilotWidgetProps {
  paper?: PaperAnalysis | null;
  onNavigate: (tab: NavTab) => void;
}

export const FloatingCopilotWidget: React.FC<FloatingCopilotWidgetProps> = ({
  paper,
  onNavigate,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<CopilotMessage[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: `Hello! I am your **Floating Research Copilot**. I follow you across every screen in Pilot AI.

Ask me anytime:
- *"Does this idea already exist in literature?"*
- *"How can I make this unique?"*
- *"Formulate 4 clear research objectives"*
- *"Stress-test my hypothesis against Reviewer #2"*`,
      timestamp: 'Active'
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && !isMinimized) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, loading, isOpen, isMinimized]);

  const handleSend = async (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim() || loading) return;

    const userMsg: CopilotMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setLoading(true);

    try {
      const history = messages.map(m => ({ role: m.role, content: m.content }));
      const res = await api.copilotChat(
        query,
        history,
        paper?.title,
        paper ? `${paper.title}: ${paper.summary}` : undefined
      );

      const assistantMsg: CopilotMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: res.reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err: any) {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: `Copilot offline: ${err.message || 'Check network connection'}.`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenStudio = () => {
    setIsOpen(false);
    onNavigate('research_chat');
  };

  return (
    <>
      {/* Floating Trigger Button (Always visible on bottom right) */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white font-bold text-xs shadow-2xl shadow-blue-600/40 hover:scale-105 active:scale-95 transition-all group border border-white/20"
          title="Open AI Research Copilot"
        >
          <div className="relative">
            <Bot className="w-4 h-4" />
            <span className="absolute -top-1 -right-1 flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400" />
            </span>
          </div>
          <span className="tracking-wide">AI Research Copilot</span>
          <Sparkles className="w-3.5 h-3.5 text-yellow-300 animate-pulse" />
        </button>
      )}

      {/* Floating Glassmorphic Drawer / Window */}
      {isOpen && (
        <div
          className={`fixed bottom-6 right-6 z-50 w-[92vw] max-w-md bg-[#070e24]/95 backdrop-blur-2xl border border-[#1e293b] rounded-2xl shadow-2xl flex flex-col transition-all overflow-hidden ${
            isMinimized ? 'h-14' : 'h-[580px] max-h-[85vh]'
          }`}
        >
          {/* Header */}
          <div className="p-3.5 bg-[#050a1c] border-b border-slate-800/90 flex items-center justify-between select-none">
            <div className="flex items-center gap-2.5">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-tr from-blue-600 to-purple-600 text-white shadow-sm">
                <Bot className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                  Universal Research Copilot
                  <span className="text-[9px] bg-emerald-500/20 text-emerald-400 px-1.5 py-0.2 rounded border border-emerald-500/30">
                    Online
                  </span>
                </h4>
                <p className="text-[10px] text-slate-400 truncate max-w-[200px]">
                  {paper?.title || 'Global Workspace Context'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1 text-slate-400">
              <button
                onClick={handleOpenStudio}
                className="p-1.5 rounded-lg hover:bg-slate-800 hover:text-white transition-colors"
                title="Expand to Full AI Assistant Studio"
              >
                <Maximize2 className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                className="p-1.5 rounded-lg hover:bg-slate-800 hover:text-white transition-colors"
                title={isMinimized ? 'Expand' : 'Minimize'}
              >
                {isMinimized ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg hover:bg-rose-500/20 hover:text-rose-400 transition-colors"
                title="Close"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Drawer Body (Visible when not minimized) */}
          {!isMinimized && (
            <div className="flex-1 flex flex-col min-h-0 bg-[#070e24]/90">
              
              {/* Quick Action Chips Bar */}
              <div className="p-2 border-b border-slate-800/80 bg-[#050a1c]/60 flex items-center gap-1.5 overflow-x-auto scrollbar-none text-[10px]">
                <button
                  onClick={() => handleSend('Does my research idea already exist in published literature? What patterns dominate?')}
                  disabled={loading}
                  className="px-2.5 py-1 rounded-full bg-slate-900 border border-slate-800 text-slate-300 hover:text-blue-400 hover:border-blue-500/50 whitespace-nowrap transition-colors flex items-center gap-1"
                >
                  <Compass className="w-3 h-3 text-blue-400" />
                  <span>Check Existence</span>
                </button>

                <button
                  onClick={() => handleSend('How can I mutate or pivot this idea to make it 100% unique?')}
                  disabled={loading}
                  className="px-2.5 py-1 rounded-full bg-slate-900 border border-slate-800 text-slate-300 hover:text-purple-400 hover:border-purple-500/50 whitespace-nowrap transition-colors flex items-center gap-1"
                >
                  <Dna className="w-3 h-3 text-purple-400" />
                  <span>Mutate to Unique</span>
                </button>

                <button
                  onClick={() => handleSend('Formulate 4 clear research objectives (O1 to O4) with milestone deliverables')}
                  disabled={loading}
                  className="px-2.5 py-1 rounded-full bg-slate-900 border border-slate-800 text-slate-300 hover:text-emerald-400 hover:border-emerald-500/50 whitespace-nowrap transition-colors flex items-center gap-1"
                >
                  <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                  <span>4 Objectives</span>
                </button>

                <button
                  onClick={() => handleSend('Stress-test my hypothesis like Reviewer #2. What are the fatal flaws?')}
                  disabled={loading}
                  className="px-2.5 py-1 rounded-full bg-slate-900 border border-slate-800 text-slate-300 hover:text-rose-400 hover:border-rose-500/50 whitespace-nowrap transition-colors flex items-center gap-1"
                >
                  <ShieldAlert className="w-3 h-3 text-rose-400" />
                  <span>Red-Team Attack</span>
                </button>
              </div>

              {/* Message List */}
              <div className="flex-1 overflow-y-auto p-3.5 space-y-3 font-sans text-xs">
                {messages.map((m) => (
                  <div
                    key={m.id}
                    className={`flex items-start gap-2.5 ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    {m.role === 'assistant' && (
                      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-blue-600 text-white shadow-sm mt-0.5">
                        <Bot className="w-3.5 h-3.5" />
                      </div>
                    )}

                    <div
                      className={`rounded-xl p-3 text-xs leading-relaxed max-w-[85%] ${
                        m.role === 'user'
                          ? 'bg-blue-600 text-white shadow-sm'
                          : 'bg-[#0b1430] border border-slate-800 text-slate-200'
                      }`}
                    >
                      <div className="whitespace-pre-wrap">{m.content}</div>
                      <div className="mt-1 text-right text-[8px] opacity-40">
                        {m.timestamp}
                      </div>
                    </div>

                    {m.role === 'user' && (
                      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-800 text-slate-300 font-bold text-[10px] mt-0.5">
                        U
                      </div>
                    )}
                  </div>
                ))}

                {loading && (
                  <div className="flex items-center gap-2 text-xs text-blue-400 bg-[#0b1430] border border-slate-800 p-2.5 rounded-xl w-fit">
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Consulting AI Copilot...</span>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Chat Input Bar */}
              <div className="p-2.5 bg-[#050a1c] border-t border-slate-800">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSend();
                  }}
                  className="flex items-center gap-2"
                >
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask Copilot about any idea, pattern, or objective..."
                    disabled={loading}
                    className="flex-1 bg-[#0b1430] border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
                  />
                  <button
                    type="submit"
                    disabled={loading || !input.trim()}
                    className="flex h-8 w-8 items-center justify-center rounded-xl bg-blue-600 hover:bg-blue-500 text-white shadow-sm transition-all disabled:opacity-40"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              </div>

            </div>
          )}
        </div>
      )}
    </>
  );
};

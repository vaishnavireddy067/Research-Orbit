import React, { useState, useRef, useEffect } from 'react';
import { Send, X, Bot, User as UserIcon, Quote, Sparkles, AlertCircle, Loader2 } from 'lucide-react';
import { PaperAnalysis, ChatMessage } from '../types';
import { api } from '../services/api';

interface ResearchChatModalProps {
  paper: PaperAnalysis | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ResearchChatModal: React.FC<ResearchChatModalProps> = ({ paper, isOpen, onClose }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputQuery, setInputQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (paper) {
      // Set initial welcome greeting for the active paper
      setMessages([
        {
          id: 'welcome',
          role: 'assistant',
          content: `Hello! I am your RAG research assistant for "${paper.title}". Ask me any question about the methodology, datasets, empirical results, or failure modes.`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    }
  }, [paper?.id]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  if (!isOpen || !paper) return null;

  const handleSend = async (queryToSend?: string) => {
    const text = queryToSend || inputQuery;
    if (!text.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputQuery('');
    setIsLoading(true);

    try {
      const res = await api.chatWithPaper(paper.id, text);
      const assistantMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: res.response,
        intent: res.intent,
        evidence: res.evidence,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err: any) {
      const errorMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `Error retrieving answer: ${err.message || 'Server did not respond'}. Please check if the Groq API key is valid or try another question.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const suggestedQuestions = [
    'Explain the methodology simply',
    'What are the dataset limitations?',
    'What are the primary failure risks?',
    'How can this be deployed in practice?',
  ];

  return (
    <div className="fixed inset-y-0 right-0 z-50 flex w-full max-w-lg flex-col border-l border-slate-800 bg-slate-950/95 shadow-2xl backdrop-blur-2xl transition-all sm:max-w-md">
      
      {/* Drawer Header */}
      <div className="flex items-center justify-between border-b border-slate-800 p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 text-white shadow-md shadow-indigo-600/30">
            <Bot className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              Contextual Paper Chat
              <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-[9px] font-semibold text-emerald-400">
                RAG Active
              </span>
            </h3>
            <p className="text-[11px] text-slate-400 truncate max-w-[240px]">
              {paper.title}
            </p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-900 hover:text-white transition-colors"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`flex flex-col ${
              m.role === 'user' ? 'items-end' : 'items-start'
            }`}
          >
            <div
              className={`max-w-[88%] rounded-2xl p-3 text-xs leading-relaxed ${
                m.role === 'user'
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-br-none shadow-md shadow-indigo-600/10'
                  : 'bg-slate-900 text-slate-200 border border-slate-800 rounded-bl-none'
              }`}
            >
              {m.intent && m.intent !== 'GENERAL' && (
                <div className="mb-1.5 inline-block rounded bg-indigo-500/20 px-1.5 py-0.5 text-[9px] font-mono text-indigo-300 uppercase tracking-wider">
                  Intent: {m.intent}
                </div>
              )}

              <p className="whitespace-pre-wrap">{m.content}</p>

              {/* Context Evidence Quote if returned */}
              {m.evidence?.quote && (
                <div className="mt-2.5 rounded-xl border border-indigo-500/20 bg-indigo-950/40 p-2 text-[11px] text-indigo-300">
                  <div className="flex items-center gap-1 font-semibold text-[10px] text-indigo-400 mb-1">
                    <Quote className="h-3 w-3" />
                    <span>Evidence Citation {m.evidence.section ? `• ${m.evidence.section}` : ''}</span>
                  </div>
                  <p className="italic text-indigo-200/90 font-serif">
                    "{m.evidence.quote}"
                  </p>
                </div>
              )}

              <div className="mt-1 text-right text-[9px] opacity-50">
                {m.timestamp}
              </div>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex items-center gap-2 text-xs text-indigo-400 bg-slate-900/60 p-3 rounded-2xl w-fit border border-slate-800">
            <Loader2 className="h-4 w-4 animate-spin text-indigo-400" />
            <span>Consulting paper embeddings & LLM...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Prompt Chips */}
      <div className="border-t border-slate-800/80 bg-slate-950/60 p-2.5">
        <div className="text-[10px] text-slate-400 font-semibold mb-1.5 flex items-center gap-1">
          <Sparkles className="h-3 w-3 text-indigo-400" />
          Suggested Questions:
        </div>
        <div className="flex flex-wrap gap-1.5">
          {suggestedQuestions.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(q)}
              disabled={isLoading}
              className="rounded-lg bg-slate-900 border border-slate-800 px-2 py-1 text-[10px] text-slate-300 hover:bg-slate-800 hover:text-white transition-all text-left"
            >
              {q}
            </button>
          ))}
        </div>
      </div>

      {/* Input Box */}
      <div className="border-t border-slate-800 p-3 bg-slate-950">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            placeholder="Ask anything about this research paper..."
            disabled={isLoading}
            className="flex-1 rounded-xl bg-slate-900 border border-slate-800 px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
          />
          <button
            type="submit"
            disabled={isLoading || !inputQuery.trim()}
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md shadow-indigo-600/30 disabled:opacity-40 hover:scale-105 active:scale-95 transition-all"
          >
            <Send className="h-4 w-4" />
          </button>
        </form>
      </div>

    </div>
  );
};

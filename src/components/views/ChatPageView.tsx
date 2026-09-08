import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Quote, Sparkles, Loader2 } from 'lucide-react';
import { PaperAnalysis, ChatMessage } from '../../types';
import { api } from '../../services/api';

interface ChatPageViewProps {
  paper: PaperAnalysis;
}

export const ChatPageView: React.FC<ChatPageViewProps> = ({ paper }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'initial',
      role: 'assistant',
      content: `I am your Contextual Research AI for "${paper.title}". You can interrogate the mathematical models, dataset limitations, empirical benchmarks, or potential production flaws.`,
      timestamp: 'Now',
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSend = async (customQuery?: string) => {
    const q = customQuery || input;
    if (!q.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: q,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const res = await api.chatWithPaper(paper.id, q);
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
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: `AI Engine Notice: ${err.message || 'Error communicating with Groq backend'}.`,
          timestamp: 'Now',
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const sampleQuestions = [
    'Summarize the core mathematical claims',
    'What dataset was evaluated and what are its boundaries?',
    'What are the primary failure modes under distribution drift?',
    'How can this approach be adapted for edge deployment?',
  ];

  return (
    <div className="space-y-6 pb-12">
      <div className="space-y-1">
        <h1 className="text-2xl font-black text-white">AI Research Chat</h1>
        <p className="text-xs text-slate-400">
          Contextual RAG paper interrogation with exact citation quotes and claim references.
        </p>
      </div>

      <div className="rounded-3xl bg-[#090e1a] border border-slate-800/80 p-6 flex flex-col h-[580px]">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto space-y-4 pr-2 scrollbar-none">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex flex-col ${m.role === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`max-w-2xl rounded-2xl p-4 text-xs leading-relaxed ${
                  m.role === 'user'
                    ? 'bg-indigo-600 text-white rounded-br-none'
                    : 'bg-slate-900 border border-slate-800 text-slate-200 rounded-bl-none'
                }`}
              >
                {m.intent && m.intent !== 'GENERAL' && (
                  <span className="inline-block rounded bg-indigo-500/20 px-2 py-0.5 text-[9px] font-mono text-indigo-300 uppercase mb-2">
                    Intent: {m.intent}
                  </span>
                )}
                <p className="whitespace-pre-wrap">{m.content}</p>

                {m.evidence?.quote && (
                  <div className="mt-3 rounded-xl bg-indigo-950/40 border border-indigo-500/30 p-2.5 text-[11px] text-indigo-300">
                    <div className="flex items-center gap-1 font-bold text-[10px] text-indigo-400 mb-1">
                      <Quote className="h-3 w-3" />
                      <span>Evidence Citation {m.evidence.section ? `• ${m.evidence.section}` : ''}</span>
                    </div>
                    <p className="italic font-serif">"{m.evidence.quote}"</p>
                  </div>
                )}

                <div className="text-[9px] opacity-40 text-right mt-1.5">{m.timestamp}</div>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex items-center gap-2 rounded-2xl bg-slate-900 border border-slate-800 p-3 text-xs text-indigo-400 w-fit">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Synthesizing answer from paper embeddings...</span>
            </div>
          )}
          <div ref={scrollRef} />
        </div>

        {/* Suggested Queries */}
        <div className="pt-3 border-t border-slate-800/80 mb-3 flex flex-wrap gap-2">
          {sampleQuestions.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(q)}
              disabled={isLoading}
              className="rounded-xl bg-slate-900 border border-slate-800 px-3 py-1 text-[11px] text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Input */}
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
            placeholder="Ask anything about the claims, mathematics, dataset, or results..."
            disabled={isLoading}
            className="flex-1 rounded-2xl bg-slate-900 border border-slate-800 px-4 py-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="flex h-11 w-11 items-center justify-center rounded-2xl bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 hover:bg-indigo-500 disabled:opacity-50 transition-all"
          >
            <Send className="h-4 w-4" />
          </button>
        </form>
      </div>
    </div>
  );
};

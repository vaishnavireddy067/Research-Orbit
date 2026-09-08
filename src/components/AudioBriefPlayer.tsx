import React, { useEffect, useState, useRef } from 'react';
import { Volume2, VolumeX, Play, Pause, RotateCcw, X, Sparkles } from 'lucide-react';
import { PaperAnalysis } from '../types';

interface AudioBriefPlayerProps {
  paper: PaperAnalysis | null;
  isOpen: boolean;
  onClose: () => void;
  isPlaying: boolean;
  setIsPlaying: (playing: boolean) => void;
}

export const AudioBriefPlayer: React.FC<AudioBriefPlayerProps> = ({
  paper,
  isOpen,
  onClose,
  isPlaying,
  setIsPlaying,
}) => {
  const [rate, setRate] = useState<number>(1.0);
  const [progress, setProgress] = useState<number>(0);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    if (!('speechSynthesis' in window)) {
      console.warn('Speech synthesis not supported in this browser.');
      return;
    }

    return () => {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
    };
  }, []);

  useEffect(() => {
    // If paper changes while playing, stop
    window.speechSynthesis.cancel();
    setIsPlaying(false);
    setProgress(0);
  }, [paper?.id]);

  if (!isOpen || !paper) return null;

  const constructBriefText = (p: PaperAnalysis): string => {
    let script = `Research Brief for: ${p.title}. `;
    if (p.authors && p.authors !== 'Unknown') {
      script += `Authored by ${p.authors}. `;
    }
    script += `Domain: ${p.domain || 'General Science'}. `;
    script += `Executive Summary: ${p.summary}. `;
    
    if (p.impactScore) {
      script += `Calculated research impact score is ${p.impactScore} out of 10. `;
    }
    if (p.noveltyScore) {
      script += `Novelty index is ${p.noveltyScore} out of 10. `;
    }

    if (p.extendedAnalysis?.structuredBreakdown?.methodology) {
      script += `Key methodology: ${p.extendedAnalysis.structuredBreakdown.methodology}. `;
    }

    if (p.risks && p.risks.length > 0) {
      script += `Identified implementation risks include: ${p.risks.join(', ')}. `;
    }

    script += `End of research brief.`;
    return script;
  };

  const handleTogglePlay = () => {
    if (!('speechSynthesis' in window)) {
      alert('Text to speech is not supported in your browser.');
      return;
    }

    if (isPlaying) {
      window.speechSynthesis.pause();
      setIsPlaying(false);
    } else {
      if (window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
        setIsPlaying(true);
      } else {
        window.speechSynthesis.cancel();
        const text = constructBriefText(paper);
        const utterance = new SpeechSynthesisUtterance(text);
        utteranceRef.current = utterance;
        utterance.rate = rate;

        utterance.onend = () => {
          setIsPlaying(false);
          setProgress(100);
        };

        utterance.onerror = () => {
          setIsPlaying(false);
        };

        // Estimate progress based on boundary
        utterance.onboundary = (e) => {
          if (text.length > 0) {
            const pct = Math.min(100, Math.round((e.charIndex / text.length) * 100));
            setProgress(pct);
          }
        };

        window.speechSynthesis.speak(utterance);
        setIsPlaying(true);
      }
    }
  };

  const handleRestart = () => {
    window.speechSynthesis.cancel();
    setProgress(0);
    const text = constructBriefText(paper);
    const utterance = new SpeechSynthesisUtterance(text);
    utteranceRef.current = utterance;
    utterance.rate = rate;
    utterance.onend = () => setIsPlaying(false);
    utterance.onerror = () => setIsPlaying(false);
    window.speechSynthesis.speak(utterance);
    setIsPlaying(true);
  };

  const handleSpeedChange = (newRate: number) => {
    setRate(newRate);
    if (isPlaying) {
      handleRestart();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 w-96 max-w-[calc(100vw-3rem)] rounded-2xl border border-purple-500/30 bg-slate-950/95 p-4 shadow-2xl backdrop-blur-2xl transition-all">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-purple-500/20 text-purple-400">
            <Volume2 className="h-4 w-4 animate-pulse" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
              AI Audio Brief
              <span className="rounded bg-purple-500/20 px-1.5 py-0.2 text-[9px] text-purple-300 font-mono">
                TTS
              </span>
            </h4>
            <p className="text-[10px] text-slate-400 truncate max-w-[180px]">
              {paper.title}
            </p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="rounded-lg p-1 text-slate-400 hover:bg-slate-800 hover:text-white"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* Dynamic Animated Waveform */}
      <div className="flex items-center justify-center gap-1 py-4">
        {[40, 70, 90, 60, 100, 45, 80, 55, 95, 30, 85, 65, 40].map((height, i) => (
          <div
            key={i}
            className={`w-1 rounded-full bg-gradient-to-t from-purple-500 to-cyan-400 transition-all duration-300 ${
              isPlaying ? 'animate-pulse' : 'opacity-40'
            }`}
            style={{
              height: isPlaying ? `${Math.max(12, (height * (1 + (i % 3) * 0.2)) % 38)}px` : '8px',
            }}
          />
        ))}
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-slate-800 rounded-full h-1.5 mb-3 overflow-hidden">
        <div 
          className="bg-gradient-to-r from-purple-500 to-cyan-400 h-full rounded-full transition-all duration-200" 
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          {[1.0, 1.25, 1.5].map((s) => (
            <button
              key={s}
              onClick={() => handleSpeedChange(s)}
              className={`rounded px-1.5 py-0.5 text-[10px] font-medium transition-colors ${
                rate === s
                  ? 'bg-purple-600 text-white'
                  : 'bg-slate-900 text-slate-400 hover:text-white'
              }`}
            >
              {s}x
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleRestart}
            title="Replay from start"
            className="rounded-lg p-2 text-slate-400 hover:bg-slate-900 hover:text-white transition-colors"
          >
            <RotateCcw className="h-3.5 w-3.5" />
          </button>

          <button
            onClick={handleTogglePlay}
            className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-600/30 hover:scale-105 active:scale-95 transition-all"
          >
            {isPlaying ? (
              <Pause className="h-4 w-4" />
            ) : (
              <Play className="h-4 w-4 fill-white ml-0.5" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

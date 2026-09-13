import React, { useState, useEffect } from 'react';
import { 
  Headphones, 
  Sparkles, 
  Play, 
  Pause, 
  Volume2, 
  RotateCcw, 
  Mic, 
  Radio,
  FileText,
  Clock,
  Sparkle
} from 'lucide-react';
import { PodcastDialogueLine, PaperAnalysis } from '../../types';
import { EmptyWorkspaceState } from '../EmptyWorkspaceState';
import { NavTab } from '../Sidebar';

const buildDialogueForPaper = (paper: PaperAnalysis): PodcastDialogueLine[] => {
  const breakdown = paper.extendedAnalysis?.structuredBreakdown;
  const problem = breakdown?.problemStatement || paper.summary || 'traditional approaches face significant scaling and accuracy trade-offs.';
  const methodology = breakdown?.methodology || paper.implementation || 'a novel algorithmic framework optimized for empirical performance.';
  const results = breakdown?.results || 'consistent improvements across all standard benchmark evaluations.';
  const risks = paper.risks || [];

  return [
    {
      speaker: 'Dr. Aris (Host)',
      text: `Welcome back to ResearchPilot Deep Dive. Today we are exploring a compelling new manuscript: "${paper.title}".`,
      timestamp: '00:00'
    },
    {
      speaker: 'Dr. Maya (Co-Host)',
      text: `Excited to dig into this! The fundamental problem the authors address in ${paper.domain || 'this domain'} is that ${problem.substring(0, 180)}.`,
      timestamp: '00:15'
    },
    {
      speaker: 'Dr. Aris (Host)',
      text: `And how do they overcome this challenge? What constitutes their core methodological contribution?`,
      timestamp: '00:30'
    },
    {
      speaker: 'Dr. Maya (Co-Host)',
      text: `They formulate ${methodology.substring(0, 180)}. In their experiments, they report ${results.substring(0, 140)}.`,
      timestamp: '00:45'
    },
    {
      speaker: 'Dr. Aris (Host)',
      text: `That is notable progress. But looking through the lens of critical peer review, ${risks[0] || 'generalization across uncalibrated domains remains a key challenge for future research'}.`,
      timestamp: '01:05'
    }
  ];
};

interface ResearchPodcastViewProps {
  paper?: PaperAnalysis | null;
  onNavigate?: (tab: NavTab) => void;
  isDarkMode?: boolean;
}

export const ResearchPodcastView: React.FC<ResearchPodcastViewProps> = ({
  paper,
  onNavigate,
  isDarkMode = true,
}) => {
  if (!paper) {
    return (
      <div className="space-y-6 pb-12 animate-fadeIn">
        <EmptyWorkspaceState
          title="No Manuscript Loaded for Audio Brief"
          description="Upload a research manuscript (PDF) or search arXiv to generate a 2-host audio briefing breakdown with text-to-speech discussion of core contributions and peer critiques."
          onNavigate={onNavigate}
          isDarkMode={isDarkMode}
        />
      </div>
    );
  }

  const generatedDialogue = buildDialogueForPaper(paper);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [dialogue, setDialogue] = useState<PodcastDialogueLine[]>(generatedDialogue);

  React.useEffect(() => {
    if (paper) {
      setDialogue(buildDialogueForPaper(paper));
      setCurrentLineIndex(0);
      setIsPlaying(false);
    }
  }, [paper]);

  // Web Speech API Vocalizer
  useEffect(() => {
    if (!isPlaying) {
      window.speechSynthesis?.cancel();
      return;
    }

    if (currentLineIndex >= dialogue.length) {
      setIsPlaying(false);
      setCurrentLineIndex(0);
      return;
    }

    const line = dialogue[currentLineIndex];
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(line.text);
      utterance.rate = playbackSpeed;

      const voices = window.speechSynthesis.getVoices();
      if (line.speaker.includes('Maya')) {
        // Female voice
        utterance.pitch = 1.15;
        const femaleVoice = voices.find(v => v.name.includes('Female') || v.name.includes('Zira') || v.name.includes('Google UK English Female'));
        if (femaleVoice) utterance.voice = femaleVoice;
      } else {
        // Male voice
        utterance.pitch = 0.95;
        const maleVoice = voices.find(v => v.name.includes('Male') || v.name.includes('David') || v.name.includes('Google UK English Male'));
        if (maleVoice) utterance.voice = maleVoice;
      }

      utterance.onend = () => {
        if (currentLineIndex < dialogue.length - 1) {
          setCurrentLineIndex(prev => prev + 1);
        } else {
          setIsPlaying(false);
          setCurrentLineIndex(0);
        }
      };

      utterance.onerror = () => {
        setIsPlaying(false);
      };

      window.speechSynthesis.speak(utterance);
    }

    return () => {
      window.speechSynthesis?.cancel();
    };
  }, [isPlaying, currentLineIndex, playbackSpeed]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const handleReset = () => {
    window.speechSynthesis?.cancel();
    setIsPlaying(false);
    setCurrentLineIndex(0);
  };

  return (
    <div className="space-y-6 font-sans text-slate-100">
      
      {/* Header Card in Midnight Navy */}
      <div className="rounded-3xl bg-[#0d1633] border border-[#1b2b5a] p-6 sm:p-7 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-blue-400 uppercase tracking-wider mb-1">
            <Radio className="w-4 h-4 text-blue-400" />
            Vocalized Synthesis • Dual-Host Research Dialogue
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            AI Research Podcast Studio (Audio Brief)
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Transform dense academic preprints into natural 5-minute dialogue briefings between Dr. Aris and Dr. Maya.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-[#121d42] border border-[#20326b] px-3.5 py-2 rounded-xl text-xs font-bold text-slate-200">
          <Mic className="w-3.5 h-3.5 text-rose-400" />
          <span>Natural Multi-Voice Neural TTS</span>
        </div>
      </div>

      {/* Media Player Console */}
      <div className="rounded-3xl bg-[#0a1128] border border-[#1b2b5a] p-6 sm:p-8 shadow-2xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#1b2b5a] pb-5">
          <div className="flex items-center gap-3.5">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-600/30 to-indigo-600/30 border border-blue-500/30 flex items-center justify-center text-blue-400 shadow-lg">
              <Headphones className="w-7 h-7" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-blue-400 uppercase tracking-wider block">
                Episode #104 • Hydrology AI Deep Dive
              </span>
              <h3 className="text-base font-bold text-white mt-0.5">
                Real-Time Edge GCNs & Physics-Informed Sensor Telemetry
              </h3>
            </div>
          </div>

          {/* Animated Waveform Graphic */}
          <div className="flex items-center gap-1.5 h-8 px-4 py-1.5 rounded-2xl bg-[#0e193d] border border-[#1e2f69]">
            {[40, 75, 30, 95, 55, 85, 35, 100, 65, 45, 90, 35, 60, 80].map((h, i) => (
              <div
                key={i}
                className={`w-1 rounded-full transition-all duration-300 ${
                  isPlaying ? 'bg-gradient-to-t from-blue-500 to-cyan-400' : 'bg-slate-700'
                }`}
                style={{ height: isPlaying ? `${h}%` : '25%' }}
              />
            ))}
          </div>
        </div>

        {/* Playback Controls */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={handleReset}
              className="p-2.5 rounded-xl bg-[#14204a] hover:bg-[#1a2b63] text-slate-300 border border-[#20326b] transition-colors cursor-pointer"
              title="Restart Podcast"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            <button
              onClick={togglePlay}
              className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-xl text-xs font-bold transition-all shadow-lg shadow-blue-600/30 cursor-pointer active:scale-95"
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-white" />}
              <span>{isPlaying ? 'Pause Audio Brief' : 'Play Research Podcast'}</span>
            </button>

            <button
              onClick={() => {
                const nextSpeed = playbackSpeed === 1 ? 1.25 : playbackSpeed === 1.25 ? 1.5 : 1;
                setPlaybackSpeed(nextSpeed);
              }}
              className="px-3.5 py-2 rounded-xl bg-[#14204a] hover:bg-[#1a2b63] text-slate-300 border border-[#20326b] text-xs font-bold transition-colors cursor-pointer"
            >
              {playbackSpeed}x Speed
            </button>
          </div>

          <div className="text-xs text-slate-400 font-mono flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-blue-400" />
            <span>Line {currentLineIndex + 1} of {dialogue.length}</span>
          </div>
        </div>
      </div>

      {/* Interactive Dialogue Transcript in Midnight Navy */}
      <div className="rounded-3xl bg-[#0d1633] border border-[#1b2b5a] p-6 sm:p-7 shadow-xl space-y-4">
        <div className="flex items-center justify-between border-b border-[#1b2b5a] pb-3">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-blue-400" />
            Interactive Dialogue Transcript
          </h3>
          <span className="text-xs text-slate-400 font-medium">
            Click any line to jump audio playback
          </span>
        </div>

        <div className="space-y-3 pt-1">
          {dialogue.map((line, idx) => {
            const isSpeaking = isPlaying && currentLineIndex === idx;
            const isMaya = line.speaker.includes('Maya');

            return (
              <div
                key={idx}
                onClick={() => {
                  setCurrentLineIndex(idx);
                  setIsPlaying(true);
                }}
                className={`p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer ${
                  isSpeaking
                    ? 'bg-[#162554] border-blue-500/80 ring-2 ring-blue-500/25 shadow-lg shadow-blue-500/10'
                    : 'bg-[#111c40] border-[#1e2e60] hover:border-slate-600 hover:bg-[#15234f]'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2.5">
                    <span className={`w-7 h-7 rounded-xl flex items-center justify-center text-[11px] font-black ${
                      isMaya ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30' : 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                    }`}>
                      {isMaya ? 'M' : 'A'}
                    </span>
                    <span className={`text-xs font-bold ${isMaya ? 'text-purple-300' : 'text-blue-300'}`}>
                      {line.speaker}
                    </span>
                    {isSpeaking && (
                      <span className="text-[9px] font-bold px-2 py-0.5 bg-blue-600 text-white rounded-md animate-pulse">
                        SPEAKING NOW
                      </span>
                    )}
                  </div>
                  <span className="text-[10px] font-mono text-slate-500">
                    {line.timestamp}
                  </span>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed pl-9">
                  {line.text}
                </p>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};

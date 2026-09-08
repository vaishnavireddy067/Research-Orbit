import React, { useState, useRef } from 'react';
import { Upload, FileText, Tag, ArrowRight, Loader2, AlertCircle, Sparkles } from 'lucide-react';
import { PaperAnalysis } from '../../types';
import { api } from '../../services/api';

interface UploadViewProps {
  onPaperAnalyzed: (p: PaperAnalysis) => void;
}

export const UploadView: React.FC<UploadViewProps> = ({ onPaperAnalyzed }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [researchTopic, setResearchTopic] = useState('');
  const [tags, setTags] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelected = (file: File) => {
    setSelectedFile(file);
    setErrorMsg(null);
  };

  const handleAnalyze = async () => {
    if (!selectedFile) {
      setErrorMsg('Please select or drop a research paper file first.');
      return;
    }

    setIsLoading(true);
    setErrorMsg(null);

    try {
      const analyzed = await api.analyzePaper(selectedFile);
      if (researchTopic) {
        analyzed.domain = researchTopic;
      }
      onPaperAnalyzed(analyzed);
    } catch (err: any) {
      setErrorMsg(err.message || 'Analysis failed. Make sure the backend server is running.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-semibold text-blue-400 uppercase tracking-wider mb-1">
          <Sparkles className="w-4 h-4 text-blue-400" />
          Manuscript Ingestion Pipeline
        </div>
        <h1 className="text-3xl font-black text-white tracking-tight">
          Upload Research Paper
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Upload your PDF preprint or empirical manuscript for AI-powered multi-stage analysis.
        </p>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf,.txt,.doc,.docx"
        className="hidden"
        onChange={(e) => {
          if (e.target.files && e.target.files.length > 0) {
            handleFileSelected(e.target.files[0]);
          }
        }}
      />

      {errorMsg && (
        <div className="flex items-center gap-2 rounded-xl bg-rose-500/10 border border-rose-500/30 p-4 text-xs font-semibold text-rose-400">
          <AlertCircle className="h-4 w-4 shrink-0 text-rose-400" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Dashed Dropzone Card */}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setIsDragging(false);
          if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            handleFileSelected(e.dataTransfer.files[0]);
          }
        }}
        className={`rounded-2xl border-2 border-dashed p-14 flex flex-col items-center justify-center text-center transition-all ${
          isDragging
            ? 'border-blue-500 bg-blue-500/10'
            : selectedFile
            ? 'border-blue-400 bg-blue-500/5'
            : 'border-slate-700 bg-[#0f172a]/95 hover:border-blue-500/60 hover:bg-slate-800/40 shadow-xl shadow-black/20'
        }`}
      >
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600/20 text-blue-400 mb-4 shadow-inner border border-blue-500/30">
          <Upload className="h-7 w-7" />
        </div>

        <h3 className="text-base font-bold text-white">
          {selectedFile ? selectedFile.name : 'Drop your research paper here'}
        </h3>
        
        <p className="text-xs text-slate-400 mt-1 mb-5 font-mono">
          Supported formats: PDF, TXT, DOC, DOCX
        </p>

        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs px-6 py-2.5 shadow-lg shadow-blue-500/20 transition-all cursor-pointer"
        >
          {selectedFile ? 'Change File' : 'Browse Files'}
        </button>
      </div>

      {/* Two Inputs: Topic & Tags */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="flex items-center gap-1.5 text-xs font-bold text-slate-300">
            <FileText className="h-3.5 w-3.5 text-blue-400" />
            <span>Research Topic</span>
          </label>
          <input
            type="text"
            value={researchTopic}
            onChange={(e) => setResearchTopic(e.target.value)}
            placeholder="e.g., Machine Learning, Hydrology, NLP..."
            className="w-full rounded-xl bg-[#131b2e] border border-slate-700/60 px-4 py-2.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
          />
        </div>

        <div className="space-y-1.5">
          <label className="flex items-center gap-1.5 text-xs font-bold text-slate-300">
            <Tag className="h-3.5 w-3.5 text-purple-400" />
            <span>Tags</span>
          </label>
          <input
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="e.g., edge-ai, spatiotemporal, survey..."
            className="w-full rounded-xl bg-[#131b2e] border border-slate-700/60 px-4 py-2.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
          />
        </div>
      </div>

      {/* Bottom Button: Analyze with AI → */}
      <div>
        <button
          type="button"
          disabled={isLoading}
          onClick={handleAnalyze}
          className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 disabled:opacity-60 text-white font-bold py-3.5 text-xs flex items-center justify-center gap-2 shadow-lg shadow-blue-500/25 transition-all cursor-pointer"
        >
          {isLoading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Analyzing Research Manuscript with AI Node...</span>
            </>
          ) : (
            <>
              <span>Analyze with AI</span>
              <ArrowRight className="h-4 w-4" />
            </>
          )}
        </button>
      </div>

    </div>
  );
};

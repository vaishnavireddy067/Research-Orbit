import React, { useState } from 'react';
import { 
  GraduationCap, 
  Users, 
  FolderGit2, 
  FileCheck, 
  TrendingUp, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  MessageSquare, 
  ChevronRight, 
  ArrowUpRight, 
  Send, 
  Star,
  Award,
  ShieldCheck,
  Building
} from 'lucide-react';

interface ProfessorDashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  isDarkMode?: boolean;
}

export const ProfessorDashboardModal: React.FC<ProfessorDashboardModalProps> = ({
  isOpen,
  onClose,
  isDarkMode = true,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'students' | 'reviews'>('overview');
  const [feedbackSent, setFeedbackSent] = useState<string | null>(null);

  if (!isOpen) return null;

  const RESEARCH_GROUPS = [
    { name: 'Spatiotemporal AI & Hydrology Lab', students: 6, project: 'IoT Catchment Flood Warning', progress: 82 },
    { name: 'Educational Analytics & Retention Group', students: 4, project: 'AI-Based Student Dropout Prediction', progress: 61 },
    { name: 'Bio-Medical Multimodal Diagnostics', students: 5, project: 'Histopathology Zero-Shot Foundation Models', progress: 43 },
    { name: 'Edge Robotics & Actuation Safety', students: 3, project: 'Safe Reinforcement Learning for Autonomous Drones', progress: 74 },
  ];

  const STUDENTS = [
    { name: 'Ananya Sharma', degree: 'Ph.D. Candidate (Year 3)', project: 'IoT Flood Prediction', milestone: 'Experiments Done, Drafting IEEE Paper', progress: 85, avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80' },
    { name: 'Rahul Varma', degree: 'M.Tech Thesis', project: 'Student Dropout Prediction', milestone: 'Dataset Preprocessing & Baseline Models', progress: 60, avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80' },
    { name: 'Meera Nambiar', degree: 'Ph.D. Candidate (Year 1)', project: 'Biomedical Foundation Models', milestone: 'Literature Review & Gap Identification', progress: 40, avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80' },
    { name: 'David Chen', degree: 'Post-Doc Fellow', project: 'Edge Robotics Actuation', milestone: 'Hardware HIL Validation in Wind Tunnel', progress: 78, avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80' },
  ];

  const PAPERS_UNDER_REVIEW = [
    { id: 1, title: 'HydroGNN-Edge: Latency-Bounded Catchment Inundation Modeling', student: 'Ananya Sharma', targetVenue: 'IEEE Transactions', status: 'Needs Guide Review', wordCount: 6840 },
    { id: 2, title: 'Survival Neural Networks for Higher Education Dropout Prevention', student: 'Rahul Varma', targetVenue: 'Computers & Education: AI', status: 'Revisions Pending', wordCount: 4200 },
  ];

  const handleSendFeedback = (title: string) => {
    setFeedbackSent(title);
    setTimeout(() => setFeedbackSent(null), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className={`w-full max-w-5xl rounded-3xl border shadow-2xl overflow-hidden flex flex-col max-h-[90vh] transition-all ${
        isDarkMode ? 'bg-[#090f26] border-[#1f3066] text-slate-100' : 'bg-white border-slate-200 text-slate-900'
      }`}>
        
        {/* Modal Header */}
        <div className={`p-6 border-b flex items-center justify-between gap-4 ${
          isDarkMode ? 'border-[#192754] bg-[#0b1333]' : 'border-slate-200 bg-slate-50'
        }`}>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 to-indigo-600 text-white flex items-center justify-center shadow-lg shadow-indigo-600/30">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-black">Professor & Research Guide Dashboard</h2>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30">
                  Principal Investigator
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Institutional supervision console for labs, student milestones, manuscript approvals, and thesis guidance.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800/60 hover:bg-slate-700 text-slate-300 flex items-center justify-center font-bold text-sm cursor-pointer transition-colors"
          >
            ✕
          </button>
        </div>

        {/* High-Level Institutional Stats */}
        <div className="p-6 border-b border-slate-700/20 grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className={`p-4 rounded-2xl border ${isDarkMode ? 'bg-[#0f173b]/70 border-[#1c2c5c]' : 'bg-slate-50 border-slate-200'}`}>
            <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
              <span>Research Groups</span>
              <Building className="w-4 h-4 text-indigo-400" />
            </div>
            <div className="text-2xl font-black mt-2">4</div>
            <span className="text-[10px] text-emerald-400 font-semibold flex items-center gap-0.5 mt-1">
              <ArrowUpRight className="w-3 h-3" /> Active Grants: 2
            </span>
          </div>

          <div className={`p-4 rounded-2xl border ${isDarkMode ? 'bg-[#0f173b]/70 border-[#1c2c5c]' : 'bg-slate-50 border-slate-200'}`}>
            <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
              <span>Supervised Students</span>
              <Users className="w-4 h-4 text-blue-400" />
            </div>
            <div className="text-2xl font-black mt-2">18</div>
            <span className="text-[10px] text-slate-400 font-medium block mt-1">
              8 Ph.D. • 10 Masters
            </span>
          </div>

          <div className={`p-4 rounded-2xl border ${isDarkMode ? 'bg-[#0f173b]/70 border-[#1c2c5c]' : 'bg-slate-50 border-slate-200'}`}>
            <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
              <span>Active Projects</span>
              <FolderGit2 className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-2xl font-black mt-2">7</div>
            <span className="text-[10px] text-emerald-400 font-semibold flex items-center gap-0.5 mt-1">
              <CheckCircle2 className="w-3 h-3" /> 5 on track
            </span>
          </div>

          <div className={`p-4 rounded-2xl border ${isDarkMode ? 'bg-[#0f173b]/70 border-[#1c2c5c]' : 'bg-slate-50 border-slate-200'}`}>
            <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
              <span>Papers Under Review</span>
              <FileCheck className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-2xl font-black mt-2">12</div>
            <span className="text-[10px] text-amber-400 font-semibold block mt-1">
              2 drafts waiting for approval
            </span>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="px-6 pt-4 flex items-center gap-2 border-b border-slate-700/20">
          {[
            { id: 'overview', label: 'Lab Progress & Milestones' },
            { id: 'students', label: 'Supervised Researchers & Thesis' },
            { id: 'reviews', label: 'Manuscript Approval Queue (2)' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`pb-3 px-3 text-xs font-bold transition-all border-b-2 cursor-pointer ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-400'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 scrollbar-thin">
          
          {feedbackSent && (
            <div className="p-3 rounded-xl bg-emerald-600/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              <span>Feedback sent to {feedbackSent} for revisions!</span>
            </div>
          )}

          {activeTab === 'overview' && (
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-slate-300">Active Research Projects & Milestones</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {RESEARCH_GROUPS.map((grp, idx) => (
                  <div
                    key={idx}
                    className={`p-4 rounded-2xl border space-y-3 ${
                      isDarkMode ? 'bg-[#0e173d] border-[#1d2d60]' : 'bg-slate-50 border-slate-200'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold">{grp.name}</h4>
                      <span className="text-[11px] font-black text-blue-400">{grp.progress}%</span>
                    </div>
                    <p className="text-[11px] text-slate-400">
                      Focus: <strong className="text-slate-200">{grp.project}</strong>
                    </p>
                    <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                      <div 
                        className="bg-gradient-to-r from-blue-500 to-indigo-500 h-full rounded-full"
                        style={{ width: `${grp.progress}%` }}
                      />
                    </div>
                    <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1">
                      <span>{grp.students} student researchers</span>
                      <span className="text-emerald-400 font-semibold">Active Sprint</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'students' && (
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-slate-300">Mentees & Thesis Tracking</h3>
              {STUDENTS.map((st, i) => (
                <div
                  key={i}
                  className={`p-4 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                    isDarkMode ? 'bg-[#0e173d] border-[#1d2d60]' : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={st.avatar}
                      alt={st.name}
                      className="w-10 h-10 rounded-full object-cover border border-blue-500/40"
                    />
                    <div>
                      <h4 className="text-xs font-bold text-white">{st.name}</h4>
                      <span className="text-[10px] text-slate-400">{st.degree}</span>
                      <span className="text-[11px] text-blue-300 block font-medium mt-0.5">
                        Project: {st.project}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-1 sm:text-right">
                    <span className="text-[11px] text-slate-400 block">
                      Current Milestone: <strong className="text-slate-200">{st.milestone}</strong>
                    </span>
                    <div className="flex items-center sm:justify-end gap-2 text-xs font-bold">
                      <div className="w-24 bg-slate-800 h-1.5 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500 rounded-full" style={{ width: `${st.progress}%` }} />
                      </div>
                      <span className="text-blue-400">{st.progress}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-slate-300">Drafts Awaiting Guide Feedback</h3>
              {PAPERS_UNDER_REVIEW.map(paper => (
                <div
                  key={paper.id}
                  className={`p-5 rounded-2xl border space-y-3 ${
                    isDarkMode ? 'bg-[#0e173d] border-[#1d2d60]' : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-400 text-[10px] font-bold">
                        {paper.status}
                      </span>
                      <h4 className="text-sm font-bold mt-1.5">{paper.title}</h4>
                      <p className="text-xs text-slate-400 mt-0.5">
                        Lead Student: <strong>{paper.student}</strong> • Target Venue: <strong>{paper.targetVenue}</strong> • {paper.wordCount} words
                      </p>
                    </div>

                    <button
                      onClick={() => handleSendFeedback(paper.student)}
                      className="px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-md shadow-blue-600/30 flex items-center gap-1.5 transition-all cursor-pointer shrink-0"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Approve & Critique</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>

      </div>
    </div>
  );
};

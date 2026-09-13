import React, { useState, useEffect } from 'react';
import { Sidebar, NavTab, UserRole } from './components/Sidebar';
import { Header } from './components/Header';
import { LandingPage } from './components/landing/LandingPage';
import { LoginPage } from './components/views/LoginPage';
import { DashboardView } from './components/views/DashboardView';
import { AnalysisView } from './components/AnalysisView';
import { MyPapersView } from './components/views/MyPapersView';
import { ResearchLibraryView } from './components/views/ResearchLibraryView';
import { PaperStudioView } from './components/views/PaperStudioView';
import { ProfessorDashboardModal } from './components/views/ProfessorDashboardModal';
import { GapAnalysisView } from './components/views/GapAnalysisView';
import { WeakArgumentsView } from './components/views/WeakArgumentsView';
import { NoveltyScoreView } from './components/views/NoveltyScoreView';
import { AiDetectionView } from './components/views/AiDetectionView';
import { ImprovementsView } from './components/views/ImprovementsView';
import { IdeaExpansionView } from './components/views/IdeaExpansionView';
import { ResearchEvolutionView } from './components/views/ResearchEvolutionView';
import { AiAssistantView } from './components/views/AiAssistantView';
import { InsightsView } from './components/views/InsightsView';
import { SettingsView } from './components/views/SettingsView';
import { LiteratureDiscoveryView } from './components/views/LiteratureDiscoveryView';
import { LiteratureReviewGenView } from './components/views/LiteratureReviewGenView';
import { KnowledgeGraphTrendsView } from './components/views/KnowledgeGraphTrendsView';
import { GapIdeaGeneratorView } from './components/views/GapIdeaGeneratorView';
import { AutonomousAgentView } from './components/views/AutonomousAgentView';
import { CitationVerifierView } from './components/views/CitationVerifierView';
import { ExperimentPlannerView } from './components/views/ExperimentPlannerView';
import { ExperimentDashboardView } from './components/views/ExperimentDashboardView';
import { PeerReviewerView } from './components/views/PeerReviewerView';
import { RiskReproducibilityView } from './components/views/RiskReproducibilityView';
import { ResearchRoadmapView } from './components/views/ResearchRoadmapView';
import { ResearchPodcastView } from './components/views/ResearchPodcastView';
import { DossierModal } from './components/DossierModal';
import { FloatingCopilotWidget } from './components/FloatingCopilotWidget';
import { ErrorBoundary } from './components/ErrorBoundary';
import { PaperAnalysis, User, ArxivPaper } from './types';
import { api, getStoredUser, removeAuthToken, getAuthToken } from './services/api';


export const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(getStoredUser());
  const [viewMode, setViewMode] = useState<'landing' | 'login' | 'dashboard'>(() => {
    if (window.location.hash.includes('dashboard') || window.location.hash.includes('overview') || window.location.hash.includes('workspace')) {
      return 'dashboard';
    }
    if (getStoredUser() && getAuthToken()) {
      return 'dashboard';
    }
    return 'landing';
  });
  const [activeTab, setActiveTab] = useState<NavTab>('overview');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    return (localStorage.getItem('rp_theme') as 'dark' | 'light') || 'dark';
  });
  const [currentRole, setCurrentRole] = useState<UserRole>('researcher');
  const [isProfessorDashboardOpen, setIsProfessorDashboardOpen] = useState(false);
  
  const [papers, setPapers] = useState<PaperAnalysis[]>([]);
  const [activePaper, setActivePaper] = useState<PaperAnalysis | null>(null);
  const [isDossierOpen, setIsDossierOpen] = useState(false);

  const handleToggleTheme = () => {
    setTheme((prev) => {
      const next = prev === 'dark' ? 'light' : 'dark';
      localStorage.setItem('rp_theme', next);
      return next;
    });
  };

  // Fetch paper history on user login
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const history = await api.getHistory();
        if (history && history.length > 0) {
          setPapers(history);
          // Keep activePaper as null so sidebar views remain empty until user uploads or selects a paper
        }
      } catch (err) {
        console.log('History load notice');
      }
    };

    if (currentUser && getAuthToken()) {
      fetchHistory();
    }
  }, [currentUser?.email]);

  const handleLogout = () => {
    removeAuthToken();
    setCurrentUser(null);
    setPapers([]);
    setActivePaper(null);
    setViewMode('landing');
  };

  const handlePaperAnalyzed = (p: PaperAnalysis) => {
    setPapers((prev) => [p, ...prev.filter((item) => item.id !== p.id)]);
    setActivePaper(p);
    setActiveTab('paper_analysis');
  };

  const handleSelectPaper = (p: PaperAnalysis) => {
    setActivePaper(p);
    setActiveTab('paper_analysis');
  };

  const handleImportArxivPaper = (ap: ArxivPaper) => {
    const newPaper: PaperAnalysis = {
      id: Date.now(),
      filename: `${ap.id}.pdf`,
      title: ap.title,
      authors: ap.authors.join(', '),
      domain: ap.categories?.[0] || 'Computer Science / AI',
      publication_year: ap.published.substring(0, 4),
      year: ap.published.substring(0, 4),
      summary: ap.summary,
      impactScore: 8.4,
      noveltyScore: 8.9,
      risks: [
        'Edge computational memory constraints',
        'Hardware dependency on localized sensor nodes'
      ],
      implementation: `${ap.method || 'Graph Convolutional Network'} deployed on edge silicon.`,
      failureSimulator: {
        possible_failure_scenarios: ['Sensor packet loss during severe atmospheric precipitation.'],
        dataset_limitations: ['Limited to regional catchment geometries.'],
        scalability_issues: ['Edge calibration requires initial topological warm-up.']
      },
      researchImpact: {
        why_it_matters: 'Enables sub-hour flash flood warnings with high spatial precision.',
        who_benefits: ['Emergency Management Municipalities', 'Hydrology Researchers'],
        practical_applications: ['Early Inundation Warning Systems', 'Reservoir Valve Actuation']
      }
    };

    setPapers(prev => [newPaper, ...prev]);
    setActivePaper(newPaper);
  };

  // 1. Landing Page View
  if (viewMode === 'landing') {
    return (
      <LandingPage
        onLaunchApp={() => setViewMode('login')}
      />
    );
  }

  // 2. Login Page View
  if (viewMode === 'login' || !currentUser) {
    return (
      <LoginPage
        onLoginSuccess={(user) => {
          setCurrentUser(user);
          setViewMode('dashboard');
        }}
        onBackToLanding={() => setViewMode('landing')}
      />
    );
  }

  const isDarkMode = theme === 'dark';

  return (
    <div className={`h-screen flex font-sans select-none overflow-hidden relative transition-colors duration-300 ${
      isDarkMode ? 'bg-[#070b13] text-slate-100' : 'bg-slate-50 text-slate-900'
    }`}>
      {/* Background Grid & Ambient Glows */}
      <div className={`fixed inset-0 pointer-events-none [background-size:24px_24px] opacity-20 -z-10 ${
        isDarkMode ? 'bg-[radial-gradient(#1e293b_1px,transparent_1px)]' : 'bg-[radial-gradient(#cbd5e1_1px,transparent_1px)]'
      }`} />

      {/* Left Navy Sidebar */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
        onLogout={handleLogout}
        isDarkMode={isDarkMode}
        currentRole={currentRole}
        onRoleChange={(r) => {
          setCurrentRole(r);
          if (r === 'professor') setIsProfessorDashboardOpen(true);
        }}
        onOpenProfessorDashboard={() => setIsProfessorDashboardOpen(true)}
      />

      {/* Main Content Pane */}
      <div className={`flex-1 flex flex-col min-w-0 h-screen overflow-hidden relative z-10 transition-colors duration-300 ${
        isDarkMode ? 'bg-[#070b13]/90' : 'bg-slate-50/90'
      }`}>
        
        {/* Top Header */}
        <Header
          currentUser={currentUser}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)}
          onActiveAiNodeClick={() => setActiveTab('upload')}
          onOpenAuth={() => setViewMode('login')}
          onOpenDossier={() => setIsDossierOpen(true)}
          isDarkMode={isDarkMode}
          onToggleTheme={handleToggleTheme}
        />

        {/* View Switcher displaying all dashboards inside content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 max-w-[1700px] w-full mx-auto scrollbar-thin">
          <ErrorBoundary key={activeTab} onReset={() => setActiveTab('overview')}>
          {/* 1. WORKSPACE */}
          {(activeTab === 'overview' || activeTab === 'dashboard') && (
            <DashboardView
              papers={papers}
              onSelectPaper={handleSelectPaper}
              onNavigate={setActiveTab}
              isDarkMode={isDarkMode}
            />
          )}

          {(activeTab === 'my_research' || activeTab === 'my_papers') && (
            <MyPapersView
              papers={papers}
              onSelectPaper={handleSelectPaper}
              onOpenAnalysis={() => setActiveTab('research_gaps')}
              onNavigate={setActiveTab}
              isDarkMode={isDarkMode}
            />
          )}

          {(activeTab === 'discover' || activeTab === 'discovery') && (
            <LiteratureDiscoveryView 
              onImportPaper={handleImportArxivPaper} 
              onEvolvePaper={(ap) => {
                handleImportArxivPaper(ap);
                setActiveTab('research_evolution');
              }}
              activePaper={activePaper || undefined} 
            />
          )}

          {activeTab === 'library' && (
            <ResearchLibraryView papers={papers} onSelectPaper={handleSelectPaper} onNavigate={setActiveTab} isDarkMode={isDarkMode} />
          )}

          {/* 2. ANALYZE */}
          {(activeTab === 'paper_analysis' || activeTab === 'upload') && (
            <AnalysisView
              activePaper={activePaper}
              onPaperAnalyzed={handlePaperAnalyzed}
              onOpenChat={() => setActiveTab('research_chat')}
              onOpenAudio={() => setActiveTab('audio_brief')}
              onOpenDossier={() => setIsDossierOpen(true)}
              onSelectAnotherPaper={() => setActivePaper(null)}
              onNavigate={setActiveTab}
            />
          )}

          {activeTab === 'knowledge_graph' && (
            <KnowledgeGraphTrendsView paper={activePaper} onNavigate={setActiveTab} isDarkMode={isDarkMode} />
          )}

          {(activeTab === 'research_gaps' || activeTab === 'gap_analysis') && (
            <GapAnalysisView paper={activePaper} onNavigate={setActiveTab} isDarkMode={isDarkMode} />
          )}

          {activeTab === 'research_evolution' && (
            <ResearchEvolutionView
              paper={activePaper}
              allPapers={papers}
              onNavigate={setActiveTab}
              onSelectPaperForStudio={(evolvedPaper) => {
                setActivePaper(evolvedPaper);
                setActiveTab('paper_studio');
              }}
              isDarkMode={isDarkMode}
            />
          )}

          {/* 3. BUILD */}
          {(activeTab === 'idea_lab' || activeTab === 'gap_idea') && (
            <GapIdeaGeneratorView paper={activePaper} onNavigate={setActiveTab} isDarkMode={isDarkMode} />
          )}

          {(activeTab === 'experiments' || activeTab === 'experiment_planner') && (
            <ExperimentPlannerView paper={activePaper} onNavigate={setActiveTab} isDarkMode={isDarkMode} />
          )}

          {activeTab === 'experiment_dashboard' && (
            <ExperimentDashboardView paper={activePaper} onNavigate={setActiveTab} isDarkMode={isDarkMode} />
          )}

          {activeTab === 'paper_studio' && (
            <PaperStudioView paper={activePaper} onNavigate={setActiveTab} isDarkMode={isDarkMode} />
          )}

          {activeTab === 'research_proposal' && (
            <GapIdeaGeneratorView paper={activePaper} onNavigate={setActiveTab} isDarkMode={isDarkMode} />
          )}

          {activeTab === 'agents' && (
            <AutonomousAgentView paper={activePaper} onNavigate={setActiveTab} isDarkMode={isDarkMode} />
          )}

          {/* 4. VALIDATE */}
          {(activeTab === 'peer_review' || activeTab === 'peer_reviewer') && (
            <PeerReviewerView paper={activePaper} onNavigate={setActiveTab} isDarkMode={isDarkMode} />
          )}

          {(activeTab === 'evidence_check' || activeTab === 'citation_verify') && (
            <CitationVerifierView paper={activePaper} onNavigate={setActiveTab} isDarkMode={isDarkMode} />
          )}

          {activeTab === 'risk_reproducibility' && (
            <RiskReproducibilityView paper={activePaper} onNavigate={setActiveTab} isDarkMode={isDarkMode} />
          )}

          {/* 5. INSIGHTS */}
          {(activeTab === 'trends' || activeTab === 'roadmap') && (
            <ResearchRoadmapView paper={activePaper} onNavigate={setActiveTab} isDarkMode={isDarkMode} />
          )}

          {(activeTab === 'research_chat' || activeTab === 'ai_assistant') && (
            <AiAssistantView paper={activePaper || undefined} />
          )}

          {(activeTab === 'audio_brief' || activeTab === 'podcast') && (
            <ResearchPodcastView paper={activePaper} onNavigate={setActiveTab} isDarkMode={isDarkMode} />
          )}

          {activeTab === 'lit_review' && (
            <LiteratureReviewGenView paper={activePaper} onNavigate={setActiveTab} isDarkMode={isDarkMode} />
          )}

          {activeTab === 'weak_arguments' && (
            <WeakArgumentsView paper={activePaper} onNavigate={setActiveTab} isDarkMode={isDarkMode} />
          )}

          {activeTab === 'novelty_score' && (
            <NoveltyScoreView paper={activePaper} onNavigate={setActiveTab} isDarkMode={isDarkMode} />
          )}

          {activeTab === 'ai_detection' && (
            <AiDetectionView paper={activePaper} onNavigate={setActiveTab} isDarkMode={isDarkMode} />
          )}

          {activeTab === 'improvements' && (
            <ImprovementsView paper={activePaper} onNavigate={setActiveTab} isDarkMode={isDarkMode} />
          )}

          {activeTab === 'idea_expansion' && (
            <IdeaExpansionView paper={activePaper} onNavigate={setActiveTab} isDarkMode={isDarkMode} />
          )}

          {activeTab === 'insights' && (
            <InsightsView paper={activePaper} onNavigate={setActiveTab} isDarkMode={isDarkMode} />
          )}

          {activeTab === 'settings' && (
            <SettingsView currentUser={currentUser} onLogout={handleLogout} />
          )}

          </ErrorBoundary>
        </main>

      </div>

      {/* Intelligence Dossier Modal */}
      <DossierModal
        paper={activePaper}
        isOpen={isDossierOpen}
        onClose={() => setIsDossierOpen(false)}
      />

      {/* Professor Supervision Dashboard Modal */}
      <ProfessorDashboardModal
        isOpen={isProfessorDashboardOpen}
        onClose={() => setIsProfessorDashboardOpen(false)}
        isDarkMode={isDarkMode}
      />

      {/* Universal Floating AI Copilot Widget */}
      <FloatingCopilotWidget
        paper={activePaper}
        onNavigate={setActiveTab}
      />

    </div>
  );
};

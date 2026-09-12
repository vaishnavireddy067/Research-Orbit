export interface User {
  email: string;
  full_name?: string;
  id?: number;
}

export interface FailureSimulator {
  possible_failure_scenarios?: string[];
  dataset_limitations?: string[];
  scalability_issues?: string[];
}

export interface ResearchImpact {
  why_it_matters?: string;
  who_benefits?: string[];
  practical_applications?: string[];
}

export interface ActionPlan {
  tools?: string[];
  skills?: string[];
  roadmap?: Array<{
    step: string;
    description: string;
  }>;
}

export interface AuthenticityIndicator {
  label: string;
  value: number;
}

export interface AuthenticityAnalysis {
  authenticityScore: number;
  aiProbability: number;
  indicators?: AuthenticityIndicator[];
}

export interface StructuredBreakdown {
  problemStatement?: string;
  methodology?: string;
  datasetUsed?: string;
  results?: string;
  conclusion?: string;
  limitations?: string;
}

export interface ResearchGaps {
  limitations?: string[];
  openProblems?: string[];
  futureDirections?: string[];
}

export interface CriticalAudit {
  weakArguments?: string[];
  missingModules?: string[];
  improvementAreas?: string[];
  futureScope?: string[];
}

export interface RealWorldGap {
  academicStrength?: string;
  industryReadiness?: string;
  deploymentFeasibility?: string;
  explanation?: string;
}

export interface ExtendedAnalysis {
  structuredBreakdown?: StructuredBreakdown;
  researchGaps?: ResearchGaps;
  criticalAudit?: CriticalAudit;
  strengths?: string[];
  weaknesses?: string[];
  realWorldGap?: RealWorldGap;
}

export interface PaperAnalysis {
  id: number;
  filename: string;
  title: string;
  authors: string;
  domain: string;
  year?: string;
  publication_year?: string;
  summary: string;
  impactScore: number;
  novelty?: number;
  noveltyScore: number;
  risks: string[];
  implementation: string;
  failureSimulator?: FailureSimulator;
  researchImpact?: ResearchImpact;
  actionPlan?: ActionPlan;
  authenticityAnalysis?: AuthenticityAnalysis;
  extendedAnalysis?: ExtendedAnalysis;
  created_at?: string;
  extracted_text?: string;
}

export interface ChatEvidence {
  quote?: string;
  page?: string | number;
  section?: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  intent?: string;
  evidence?: ChatEvidence | null;
  timestamp: string;
}

export interface ArxivPaper {
  id: string;
  title: string;
  summary: string;
  authors: string[];
  published: string;
  pdfUrl?: string;
  link?: string;
  categories?: string[];
  relevanceTier?: 'Highly Relevant' | 'Related' | 'Background' | 'Low Relevance';
  citations?: number;
  dataset?: string;
  method?: string;
  accuracy?: string;
}

export interface ReviewComparisonRow {
  paper: string;
  method: string;
  dataset: string;
  accuracy: string;
  limitation: string;
}

export interface LiteratureReviewReport {
  title: string;
  paperCount: number;
  introduction: string;
  existingApproaches: string[];
  methodologies: string[];
  datasets: string[];
  comparisonTable: ReviewComparisonRow[];
  limitations: string[];
  researchGaps: string[];
  futureDirections: string[];
}

export interface ProposalStructure {
  title: string;
  problemStatement: string;
  researchQuestion: string;
  hypothesis: string;
  objectives: string[];
  proposedMethodology: string;
  datasetRequirements: string;
  expectedResults: string;
  evaluationMetrics: string[];
  novelty: string;
  risks: string[];
  futureScope: string;
}

export interface ReviewerPersonaFeedback {
  persona: 'Reviewer #1 (Methodology)' | 'Reviewer #2 (Critical Reviewer)' | 'Reviewer #3 (Statistics)' | 'Reviewer #4 (Novelty)';
  recommendation: 'Accept' | 'Minor Revision' | 'Major Revision' | 'Reject';
  score: number;
  comments: string;
  majorIssues: string[];
  minorIssues: string[];
}

export interface ExperimentModelBenchmark {
  model: string;
  accuracy: number;
  f1: number;
  precision: number;
  recall: number;
  latencyMs: number;
  parametersM: number;
}

export interface ClaimVerificationItem {
  claim: string;
  supportingPaper: string;
  section: string;
  evidenceQuote: string;
  status: 'Verified' | 'Partially Supported' | 'Contradicted';
  confidenceScore: number;
}

export interface PodcastDialogueLine {
  speaker: 'Researcher A (Dr. Aris)' | 'Researcher B (Dr. Maya)';
  text: string;
}

export interface ExistingPattern {
  patternName: string;
  prevalence: string;
  description: string;
  representativeWorks: string[];
  whyItSaturates: string;
}

export interface UniquenessPivot {
  angle: string;
  differentiationStrategy: string;
  expectedImpact: string;
  noveltyGain: string;
  implementationHint?: string;
}

export interface ObjectiveItem {
  code: string;
  title: string;
  description: string;
  deliverable: string;
  milestoneWeeks: string;
}

export interface ResearchIdeaAudit {
  ideaTitle: string;
  domain: string;
  status: 'EXISTS_IN_LITERATURE' | 'PARTIAL_OVERLAP' | 'NOVEL_FRONTIER';
  statusSummary: string;
  noveltyScore: number; // 0 - 100
  saturationPercentage: number; // 0 - 100
  existingPatterns: ExistingPattern[];
  uniquenessPivots: UniquenessPivot[];
  researchObjectives: {
    primaryObjective: string;
    subObjectives: ObjectiveItem[];
    hypothesis: string;
    evaluationMetrics: string[];
  };
  recommendedNextStep: string;
}

export interface CopilotMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  auditResult?: ResearchIdeaAudit;
  intent?: string;
}

export interface IdeaMutation {
  id: string;
  mutationType: 'NEURO_SYMBOLIC' | 'QUANTIZED_EDGE' | 'CROSS_DOMAIN' | 'ADVERSARIAL_INVARIANCE';
  mutationName: string;
  title: string;
  description: string;
  mathematicalTwist: string;
  noveltyScore: number;
  feasibilityScore: number;
  computeCost: string;
  differentiator: string;
}

export interface CollisionPoint {
  id: string;
  name: string;
  x: number; // 0 to 100 (e.g. Theoretical Rigor)
  y: number; // 0 to 100 (e.g. Practical Deployability)
  type: 'SOTA_PAPER' | 'CONGESTED_CLUSTER' | 'USER_PROPOSAL' | 'UNCONTESTED_SPACE';
  description: string;
  year?: string;
  overlapPercentage: number;
}

export interface RedTeamCritique {
  fatalFlaws: Array<{
    title: string;
    severity: 'CRITICAL' | 'HIGH' | 'MODERATE';
    description: string;
    reviewerQuote: string;
    preemptiveDefense: string;
  }>;
  hiddenAssumptions: string[];
  rejectionRiskScore: number; // 0 to 100
  recommendedAblation: string;
}

export interface LaTeXExportBundle {
  latexAbstract: string;
  latexObjectives: string;
  pytorchCodeScaffold: string;
  grantPitch: string;
}

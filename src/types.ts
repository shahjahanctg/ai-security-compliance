export type StandardId = 'iso-42001' | 'owasp-llm' | 'irgc-governance' | 'sans-ir' | 'nist-ai-rmf';

export interface StandardMeta {
  id: StandardId;
  code: string;
  name: string;
  subtitle: string;
  authority: string;
  year: string;
  category: string;
  badgeColor: string;
  totalControls: number;
  markdownFileName: string;
  markdownPath: string;
  summary: string;
}

export interface ControlItem {
  id: string;
  clauseOrRiskId: string;
  title: string;
  category: string;
  description: string;
  technicalRequirements: string[];
  impactOrSeverity?: 'Critical' | 'High' | 'Moderate' | 'Low';
  mappedStandards?: {
    standard: string;
    targetId: string;
  }[];
}

export interface CrossFrameworkMapping {
  domain: string;
  iso42001: string;
  owaspLLM: string;
  nistAiRmf: string;
  irgcPhase: string;
  sansIrPhase: string;
  recommendedAction: string;
}

export interface AuditChecklistItem {
  id: string;
  standardId: StandardId;
  controlId: string;
  title: string;
  status: 'compliant' | 'in_progress' | 'not_started';
  notes: string;
}

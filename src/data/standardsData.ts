import { StandardMeta, ControlItem, CrossFrameworkMapping, StandardId } from '../types';

export const STANDARDS_META: Record<StandardId, StandardMeta> = {
  'iso-42001': {
    id: 'iso-42001',
    code: 'ISO/IEC 42001:2023',
    name: 'Artificial Intelligence Management System (AIMS)',
    subtitle: 'Management Clauses 4-10 & Annex A Technical Controls A.2-A.10',
    authority: 'International Organization for Standardization (ISO / IEC)',
    year: '2023',
    category: 'Enterprise Management System',
    badgeColor: 'border-blue-200 bg-blue-50 text-blue-800 font-semibold',
    totalControls: 38,
    markdownFileName: 'ISO_42001_AI_SECURITY_COMPLIANCE.md',
    markdownPath: '/docs/ISO_42001_AI_SECURITY_COMPLIANCE.md',
    summary: 'The certifiable international standard establishing requirements for an Artificial Intelligence Management System (AIMS), covering context, leadership, AI risk assessment, and Annex A technical control objectives.'
  },
  'owasp-llm': {
    id: 'owasp-llm',
    code: 'OWASP Top 10 LLM',
    name: 'Top 10 Vulnerabilities for LLM Applications',
    subtitle: 'Threat vectors, real-world exploits, and engineering mitigations',
    authority: 'Open Web Application Security Project (OWASP Foundation)',
    year: '2025',
    category: 'Application Security',
    badgeColor: 'border-rose-200 bg-rose-50 text-rose-800 font-semibold',
    totalControls: 10,
    markdownFileName: 'OWASP_TOP_10_LLM_SECURITY_RISKS.md',
    markdownPath: '/docs/OWASP_TOP_10_LLM_SECURITY_RISKS.md',
    summary: 'Essential application security vulnerability catalog for Large Language Models covering Prompt Injection, Sensitive Info Disclosure, Supply Chain, Excessive Agency, and DoS.'
  },
  'irgc-governance': {
    id: 'irgc-governance',
    code: 'IRGC AI Governance',
    name: 'Risk Governance Framework for Artificial Intelligence',
    subtitle: '4 Core Phases, Risk Categorization & Multi-Stakeholder Oversight',
    authority: 'International Risk Governance Center (EPFL)',
    year: '2024',
    category: 'Socio-Technical Risk Governance',
    badgeColor: 'border-emerald-200 bg-emerald-50 text-emerald-800 font-semibold',
    totalControls: 16,
    markdownFileName: 'IRGC_AI_RISK_GOVERNANCE_FRAMEWORK.md',
    markdownPath: '/docs/IRGC_AI_RISK_GOVERNANCE_FRAMEWORK.md',
    summary: 'Comprehensive risk governance framework addressing non-linear, uncertain, and ambiguous AI risks through Pre-Estimation, Interdisciplinary Appraisal, and Adaptive Management.'
  },
  'sans-ir': {
    id: 'sans-ir',
    code: 'SANS AI IR & CTI',
    name: 'Incident Response & Threat Intelligence Framework',
    subtitle: '6-Phase PICERL Lifecycle, MITRE ATLAS Mapping & Playbooks',
    authority: 'SANS Institute & MITRE ATLAS Partnership',
    year: '2025',
    category: 'Cyber Incident Response',
    badgeColor: 'border-amber-200 bg-amber-50 text-amber-800 font-semibold',
    totalControls: 18,
    markdownFileName: 'SANS_AI_INCIDENT_RESPONSE.md',
    markdownPath: '/docs/SANS_AI_INCIDENT_RESPONSE.md',
    summary: 'Operational incident response model adapting Preparation, Identification, Containment, Eradication, Recovery, and Lessons Learned for AI workloads with MITRE ATLAS threat intelligence.'
  },
  'nist-ai-rmf': {
    id: 'nist-ai-rmf',
    code: 'NIST AI RMF 1.0',
    name: 'Artificial Intelligence Risk Management Framework',
    subtitle: 'Govern, Map, Measure, Manage & 7 Trustworthy AI Characteristics',
    authority: 'National Institute of Standards and Technology (U.S. Dept of Commerce)',
    year: '2023',
    category: 'Federal & Enterprise Risk Management',
    badgeColor: 'border-indigo-200 bg-indigo-50 text-indigo-800 font-semibold',
    totalControls: 20,
    markdownFileName: 'NIST_AI_RMF_RISK_MANAGEMENT.md',
    markdownPath: '/docs/NIST_AI_RMF_RISK_MANAGEMENT.md',
    summary: 'NIST AI 100-1 foundational framework organizing AI trustworthiness and risk management into Govern, Map, Measure, and Manage functions mapped to NIST SP 800-53 controls.'
  }
};

export const CONTROLS_DATA: Record<StandardId, ControlItem[]> = {
  'iso-42001': [
    {
      id: 'iso-cl4',
      clauseOrRiskId: 'Clause 4',
      title: 'Context of the Organization',
      category: 'Management Clause',
      description: 'Determining internal and external issues, interested party needs, and defining the formal boundary of the AI Management System.',
      technicalRequirements: [
        'Document formal Context Register (AIMS-CTX-001) updated bi-annually.',
        'Map regulatory mandates (EU AI Act, FTC guidelines, Executive Orders).',
        'Define explicit scope boundary across in-house models, RAG systems, and third-party APIs.'
      ],
      impactOrSeverity: 'High',
      mappedStandards: [
        { standard: 'NIST AI RMF', targetId: 'MP-1 / MP-2' },
        { standard: 'IRGC', targetId: 'Phase 1: Pre-Estimation' }
      ]
    },
    {
      id: 'iso-cl5',
      clauseOrRiskId: 'Clause 5',
      title: 'Leadership and Commitment',
      category: 'Management Clause',
      description: 'Top management accountability, establishment of the corporate AI Policy, and assignment of operational governance roles.',
      technicalRequirements: [
        'Publish formal executive AI Policy defining permissible and prohibited use cases.',
        'Establish AI Governance Council with unilateral deployment veto authority.',
        'Assign formal RACI roles for Chief AI Officer, ML SecOps, and Data Stewards.'
      ],
      impactOrSeverity: 'High',
      mappedStandards: [
        { standard: 'NIST AI RMF', targetId: 'GV-1 / GV-2' },
        { standard: 'IRGC', targetId: 'Oversight Board' }
      ]
    },
    {
      id: 'iso-cl6',
      clauseOrRiskId: 'Clause 6',
      title: 'Planning & AI System Impact Assessment',
      category: 'Management Clause',
      description: 'Actions to address risks and opportunities, AI risk assessment methodology, and conducting AI System Impact Assessments (AI SIA).',
      technicalRequirements: [
        'Conduct AI System Impact Assessment (Clause 6.1.4) assessing societal and human rights impacts.',
        'Formulate formal Risk Treatment Plan (RTP) and Statement of Applicability (SoA).',
        'Establish measurable AI performance and adversarial resistance objectives (Clause 6.2).'
      ],
      impactOrSeverity: 'Critical',
      mappedStandards: [
        { standard: 'NIST AI RMF', targetId: 'MAP / MEASURE' },
        { standard: 'IRGC', targetId: 'Phase 2: Appraisal' }
      ]
    },
    {
      id: 'iso-a2',
      clauseOrRiskId: 'Control A.2',
      title: 'Policies Related to Artificial Intelligence',
      category: 'Annex A Technical Controls',
      description: 'Formulating and reviewing domain-specific policies governing responsible AI use, development, and external procurement.',
      technicalRequirements: [
        'A.2.1: Establish comprehensive AI policy covering acceptable prompt usage and security.',
        'A.2.2: Align AI policy with ISO 27001 (ISMS), ISO 27701 (PIMS), and ISO 31000.'
      ],
      impactOrSeverity: 'Moderate',
      mappedStandards: [
        { standard: 'NIST AI RMF', targetId: 'GV-1' }
      ]
    },
    {
      id: 'iso-a5',
      clauseOrRiskId: 'Control A.5',
      title: 'Assessing Impacts of AI Systems',
      category: 'Annex A Technical Controls',
      description: 'Systematic processes to identify, evaluate, and mitigate potential harm to individuals, groups, and society.',
      technicalRequirements: [
        'A.5.1: Execute structured AI impact assessment prior to training and deployment.',
        'A.5.2: Evaluate downstream impact on privacy dignity, labor dynamics, and carbon footprint.'
      ],
      impactOrSeverity: 'High',
      mappedStandards: [
        { standard: 'NIST AI RMF', targetId: 'MP-5' },
        { standard: 'IRGC', targetId: 'Concern Assessment' }
      ]
    },
    {
      id: 'iso-a6',
      clauseOrRiskId: 'Control A.6',
      title: 'AI System Life Cycle Management',
      category: 'Annex A Technical Controls',
      description: 'Governing MLOps from requirements and design through development, verification, deployment, and decommissioning.',
      technicalRequirements: [
        'A.6.1 - A.6.4: Enforce gated CI/CD stages with automated adversarial red-team benchmarks.',
        'A.6.5: Continuous operational inference monitoring for token drift and anomaly spikes.',
        'A.6.6: Cryptographic data and vector index purging protocols upon model retirement.'
      ],
      impactOrSeverity: 'Critical',
      mappedStandards: [
        { standard: 'SANS AI IR', targetId: 'Phase 1 & Phase 5' },
        { standard: 'NIST AI RMF', targetId: 'MN-2 / MS-2' }
      ]
    },
    {
      id: 'iso-a7',
      clauseOrRiskId: 'Control A.7',
      title: 'Data for AI Systems',
      category: 'Annex A Technical Controls',
      description: 'Data acquisition, data quality management, immutable provenance, and privacy protection.',
      technicalRequirements: [
        'A.7.1: Verify scrape consent (robots.txt) and copyright licensing prior to training.',
        'A.7.2 - A.7.3: Maintain immutable data lineage (DVC / MLflow) for all dataset transformations.',
        'A.7.4: Automated PII scrubbing and Differential Privacy in fine-tuning.'
      ],
      impactOrSeverity: 'Critical',
      mappedStandards: [
        { standard: 'OWASP LLM', targetId: 'LLM02 & LLM04' }
      ]
    },
    {
      id: 'iso-a9',
      clauseOrRiskId: 'Control A.9',
      title: 'Use of AI Systems & Human Oversight',
      category: 'Annex A Technical Controls',
      description: 'Operational guardrails, human oversight (HITL/HOTL), and prevention of unintended or harmful execution.',
      technicalRequirements: [
        'A.9.1: Enforce organizational Acceptable Use Policy blocking sensitive data input.',
        'A.9.2: Implement Human-in-the-loop sign-off for critical state-altering actions.',
        'A.9.3: Deploy runtime input/output guardrails (NeMo / Llama Guard) to block prompt injections.'
      ],
      impactOrSeverity: 'Critical',
      mappedStandards: [
        { standard: 'OWASP LLM', targetId: 'LLM01 & LLM06' },
        { standard: 'NIST AI RMF', targetId: 'MN-2' }
      ]
    },
    {
      id: 'iso-a10',
      clauseOrRiskId: 'Control A.10',
      title: 'Third-Party Relationships',
      category: 'Annex A Technical Controls',
      description: 'Assessing foundation model providers, API suppliers, and defining shared responsibility models.',
      technicalRequirements: [
        'A.10.1: Vet Foundation Model Providers for SOC 2 Type II and non-training data retention clauses.',
        'A.10.2: Establish contractual SLAs and clear division of security responsibilities.'
      ],
      impactOrSeverity: 'High',
      mappedStandards: [
        { standard: 'OWASP LLM', targetId: 'LLM03' },
        { standard: 'NIST AI RMF', targetId: 'GV-6 / MN-3' }
      ]
    }
  ],
  'owasp-llm': [
    {
      id: 'owasp-llm01',
      clauseOrRiskId: 'LLM01',
      title: 'Prompt Injection (Direct & Indirect)',
      category: 'Critical Vulnerability',
      description: 'Adversarial inputs manipulate the LLM instruction stream, overriding system guardrails to execute malicious commands or exfiltrate private data.',
      technicalRequirements: [
        'Isolate untrusted user input using cryptographic XML delimiters and nonces.',
        'Implement dual-LLM guardrail architecture routing prompts to a classifier model before primary inference.',
        'Enforce least-privilege tool execution for autonomous agents.'
      ],
      impactOrSeverity: 'Critical',
      mappedStandards: [
        { standard: 'ISO 42001', targetId: 'A.9.3' },
        { standard: 'NIST AI RMF', targetId: 'MS-2 / MN-2' },
        { standard: 'SANS AI IR', targetId: 'Phase 2: AML.T0054' }
      ]
    },
    {
      id: 'owasp-llm02',
      clauseOrRiskId: 'LLM02',
      title: 'Sensitive Information Disclosure',
      category: 'High Vulnerability',
      description: 'Inadvertent revelation of confidential PII, proprietary intellectual property, or system credentials through memorization or unsegmented RAG retrieval.',
      technicalRequirements: [
        'Deploy automated entity scrubbing (Microsoft Presidio) prior to model context ingestion.',
        'Enforce role-based access control (RBAC) metadata filtering on vector database queries.',
        'Train models with Differential Privacy (DP-SGD) to bound training data extraction.'
      ],
      impactOrSeverity: 'Critical',
      mappedStandards: [
        { standard: 'ISO 42001', targetId: 'A.7.4' },
        { standard: 'NIST AI RMF', targetId: 'Privacy-Enhanced' }
      ]
    },
    {
      id: 'owasp-llm03',
      clauseOrRiskId: 'LLM03',
      title: 'Supply Chain Vulnerabilities',
      category: 'High Vulnerability',
      description: 'Compromised foundation model weights, backdoored checkpoints, poisoned packages, or arbitrary code execution via Python pickle files.',
      technicalRequirements: [
        'Ban raw Python pickle (.pt, .bin) files; mandate SafeTensors (.safetensors) format.',
        'Generate ML Software Bill of Materials (ML-SBOM) using CycloneDX.',
        'Verify SHA-256 cryptographic hashes of all model weights against vendor signatures.'
      ],
      impactOrSeverity: 'Critical',
      mappedStandards: [
        { standard: 'ISO 42001', targetId: 'A.10.1' },
        { standard: 'NIST AI RMF', targetId: 'SR-3' }
      ]
    },
    {
      id: 'owasp-llm04',
      clauseOrRiskId: 'LLM04',
      title: 'Data and Model Poisoning',
      category: 'High Vulnerability',
      description: 'Manipulation of pre-training, fine-tuning, or RLHF human feedback datasets to install backdoors or induce bias.',
      technicalRequirements: [
        'Enforce immutable data lineage tracking using DVC or MLflow.',
        'Screen datasets in latent embedding space to flag anomalous clusters and out-of-distribution points.',
        'Evaluate models continuously against immutable golden test sets.'
      ],
      impactOrSeverity: 'High',
      mappedStandards: [
        { standard: 'ISO 42001', targetId: 'A.7.1 - A.7.3' },
        { standard: 'SANS AI IR', targetId: 'Phase 2: AML.T0018' }
      ]
    },
    {
      id: 'owasp-llm05',
      clauseOrRiskId: 'LLM05',
      title: 'Improper Output Handling',
      category: 'Critical Vulnerability',
      description: 'Downstream interpreters (browsers, shell, databases) blindly executing LLM output without sanitization, causing XSS, SQLi, or RCE.',
      technicalRequirements: [
        'Treat LLM outputs as untrusted user input; apply context-aware HTML encoding (DOMPurify).',
        'Execute generated code exclusively inside isolated microVM sandboxes (gVisor / WASM).',
        'Use parameterized queries for any database interactions triggered by AI output.'
      ],
      impactOrSeverity: 'Critical',
      mappedStandards: [
        { standard: 'NIST AI RMF', targetId: 'MN-2' },
        { standard: 'ISO 42001', targetId: 'A.9.3' }
      ]
    },
    {
      id: 'owasp-llm06',
      clauseOrRiskId: 'LLM06',
      title: 'Excessive Agency',
      category: 'Critical Vulnerability',
      description: 'Autonomous agents granted unrestrained tool access, excessive privileges, or unsupervised execution over external APIs and databases.',
      technicalRequirements: [
        'Mandate Human-in-the-Loop (HITL) 2FA verification for irreversible actions (deletions, payments).',
        'Enforce principle of least privilege using granular, scoped OAuth tokens.',
        'Implement maximum execution step budgets to prevent runaway recursive agent loops.'
      ],
      impactOrSeverity: 'Critical',
      mappedStandards: [
        { standard: 'ISO 42001', targetId: 'A.9.2' },
        { standard: 'SANS AI IR', targetId: 'AML.T0053' }
      ]
    },
    {
      id: 'owasp-llm07',
      clauseOrRiskId: 'LLM07',
      title: 'System Prompt Leakage',
      category: 'Moderate Vulnerability',
      description: 'Adversaries extracting confidential system instructions, guardrail architecture, and proprietary business logic via token probing.',
      technicalRequirements: [
        'Never store API keys, DB passwords, or proprietary trade secrets in system prompts.',
        'Deploy output similarity guardrails blocking text that closely mirrors system prompts.',
        'Synthesize dynamic, minimal task prompts instead of static monolithic prompts.'
      ],
      impactOrSeverity: 'Moderate',
      mappedStandards: [
        { standard: 'ISO 42001', targetId: 'A.6.2' }
      ]
    },
    {
      id: 'owasp-llm08',
      clauseOrRiskId: 'LLM08',
      title: 'Vector and Embedding Weaknesses',
      category: 'High Vulnerability',
      description: 'Vulnerabilities in vector databases and embedding pipelines permitting semantic cloaking, index poisoning, or embedding inversion.',
      technicalRequirements: [
        'Enforce tenant metadata filtering on vector queries ($and: [{tenant_id: id}, {acl: role}]).',
        'Encrypt vector embeddings at rest (AES-256) and in transit (mTLS).',
        'Alert on anomalous semantic distance shifts or sudden bulk upserts.'
      ],
      impactOrSeverity: 'High',
      mappedStandards: [
        { standard: 'SANS AI IR', targetId: 'Phase 3: Vector Freeze' }
      ]
    },
    {
      id: 'owasp-llm09',
      clauseOrRiskId: 'LLM09',
      title: 'Misinformation & Hallucination',
      category: 'High Vulnerability',
      description: 'Generation of factually inaccurate or fabricated information presented with high linguistic confidence.',
      technicalRequirements: [
        'Enforce strict RAG grounding with verbatim source citations.',
        'Set inference temperature to 0.0 for high-precision analytical workflows.',
        'Run deterministic verification routines to check citations and package dependencies.'
      ],
      impactOrSeverity: 'High',
      mappedStandards: [
        { standard: 'NIST AI RMF', targetId: 'Valid and Reliable' }
      ]
    },
    {
      id: 'owasp-llm10',
      clauseOrRiskId: 'LLM10',
      title: 'Unbounded Consumption (Denial of Service)',
      category: 'High Vulnerability',
      description: 'Resource exhaustion of GPU compute, context tokens, or API budget causing denial of service or financial explosion.',
      technicalRequirements: [
        'Enforce strict input and output token caps per turn and per user account.',
        'Deploy inference execution timeouts (max 15 seconds) and circuit breakers.',
        'Real-time billing anomaly detection to automatically throttle suspicious key usage.'
      ],
      impactOrSeverity: 'High',
      mappedStandards: [
        { standard: 'NIST AI RMF', targetId: 'MN-4' },
        { standard: 'SANS AI IR', targetId: 'Phase 3: Rate Clamp' }
      ]
    }
  ],
  'irgc-governance': [
    {
      id: 'irgc-p1',
      clauseOrRiskId: 'Phase 1',
      title: 'Pre-Estimation (Framing & Scoping)',
      category: 'Governance Phase',
      description: 'Baseline problem framing, boundary scoping, dual-use analysis, and proactive scanning of emerging legislative/adversarial signals.',
      technicalRequirements: [
        'Formulate formal Pre-Estimation Charter (IRGC-PE-01) establishing system assumptions.',
        'Perform weak signal detection tracking zero-day prompt injection paradigms.',
        'Map regulatory mandates (EU AI Act classification, FTC rules).'
      ],
      impactOrSeverity: 'High',
      mappedStandards: [
        { standard: 'ISO 42001', targetId: 'Clause 4' },
        { standard: 'NIST AI RMF', targetId: 'MAP' }
      ]
    },
    {
      id: 'irgc-p2-sci',
      clauseOrRiskId: 'Phase 2A',
      title: 'Scientific Risk Assessment',
      category: 'Appraisal Track',
      description: 'Quantitative measurement of technical vulnerabilities, out-of-distribution robustness, systemic coupling, and algorithmic bias.',
      technicalRequirements: [
        'Conduct automated adversarial penetration testing on prompt injection resilience.',
        'Quantify demographic parity and equalized odds across demographic subgroups.',
        'Stress test models under non-stationary distributions and edge cases.'
      ],
      impactOrSeverity: 'Critical',
      mappedStandards: [
        { standard: 'OWASP LLM', targetId: 'LLM01 / LLM04' },
        { standard: 'NIST AI RMF', targetId: 'MEASURE' }
      ]
    },
    {
      id: 'irgc-p2-con',
      clauseOrRiskId: 'Phase 2B',
      title: 'Concern Assessment (Socio-Ethical)',
      category: 'Appraisal Track',
      description: 'Evaluating social perceptions, ethical implications, human autonomy preservation, public trust, and workforce displacement.',
      technicalRequirements: [
        'Conduct Human Rights and Fundamental Freedoms Impact Assessment.',
        'Analyze employee workforce impacts and cognitive deskilling risks.',
        'Engage external user advocacy groups and civil society representatives.'
      ],
      impactOrSeverity: 'High',
      mappedStandards: [
        { standard: 'ISO 42001', targetId: 'A.5.2' },
        { standard: 'NIST AI RMF', targetId: 'MP-5' }
      ]
    },
    {
      id: 'irgc-p3',
      clauseOrRiskId: 'Phase 3',
      title: 'Risk Characterization & Tolerability',
      category: 'Governance Phase',
      description: 'Mapping system into the 4 IRGC Risk Categories (Simple, Complex, Uncertain, Ambiguous) and judging tolerability (ALARP).',
      technicalRequirements: [
        'Classify risk profile: Simple (SOPs), Complex (Red-teaming), Uncertain (Circuit breakers), Ambiguous (Discourse).',
        'Assign formal tolerability rating: Intolerable (Prohibited), Tolerable (Mitigated), Acceptable.',
        'Document formal ALARP (As Low As Reasonably Practicable) evidence dossier.'
      ],
      impactOrSeverity: 'Critical',
      mappedStandards: [
        { standard: 'ISO 42001', targetId: 'Clause 6.1.3' }
      ]
    },
    {
      id: 'irgc-p4',
      clauseOrRiskId: 'Phase 4',
      title: 'Risk Management Implementation',
      category: 'Governance Phase',
      description: 'Executing risk prevention, technical mitigation, adaptive rollback engines, and contractual risk transfer.',
      technicalRequirements: [
        'Deploy automated algorithmic circuit breakers halting inference upon anomaly detection.',
        'Implement Human-in-the-Loop oversight gates for high-consequence automated decisions.',
        'Maintain contractual indemnity and third-party AI liability insurance coverage.'
      ],
      impactOrSeverity: 'Critical',
      mappedStandards: [
        { standard: 'NIST AI RMF', targetId: 'MANAGE' },
        { standard: 'ISO 42001', targetId: 'Clause 8.3' }
      ]
    },
    {
      id: 'irgc-core',
      clauseOrRiskId: 'Cross-Cutting Core',
      title: 'Oversight Procedures & Governance Board',
      category: 'Oversight Mechanism',
      description: 'Multidisciplinary AI Governance Board operation, RACI accountability enforcement, and continuous post-market audit.',
      technicalRequirements: [
        'Establish AI Governance Council with unilateral veto authority held by CISO and Ethics Lead.',
        'Execute formal RACI matrix across executive committee, engineering, and compliance.',
        'Enforce continuous post-deployment monitoring and annual system recertification.'
      ],
      impactOrSeverity: 'High',
      mappedStandards: [
        { standard: 'ISO 42001', targetId: 'Clause 5.3 & 9.3' },
        { standard: 'NIST AI RMF', targetId: 'GV-2' }
      ]
    }
  ],
  'sans-ir': [
    {
      id: 'sans-p1',
      clauseOrRiskId: 'Phase 1',
      title: 'Preparation & Threat Intel Integration',
      category: 'Incident Response Phase',
      description: 'Model zoo inventory, immutable WORM inference logging, baseline telemetry, and MITRE ATLAS threat intelligence ingestion.',
      technicalRequirements: [
        'Catalog model checkpoints, vector stores, and tool scopes with cryptographic SHA-256 hashes.',
        'Deploy write-once-read-many (WORM) SIEM logging of prompts, outputs, and classifier scores.',
        'Subscribe to automated STIX 2.1 threat intelligence feeds from AI-ISAC.'
      ],
      impactOrSeverity: 'High',
      mappedStandards: [
        { standard: 'ISO 42001', targetId: 'A.6.5' },
        { standard: 'NIST AI RMF', targetId: 'GOVERN / MAP' }
      ]
    },
    {
      id: 'sans-p2',
      clauseOrRiskId: 'Phase 2',
      title: 'Identification (Detection & Triage)',
      category: 'Incident Response Phase',
      description: 'Detecting prompt injection attacks (AML.T0054), model extraction probes (AML.T0024), and poisoned embeddings.',
      technicalRequirements: [
        'Implement real-time IoA/IoC detectors flagging delimiter bypasses and zero-width unicode.',
        'Monitor token consumption velocity for automated model inversion/scraping signatures.',
        'Classify incidents into Severity 1 (Critical: Agent hijack/RCE) to Severity 4 (Blocked probe).'
      ],
      impactOrSeverity: 'Critical',
      mappedStandards: [
        { standard: 'OWASP LLM', targetId: 'All 10 Risks' },
        { standard: 'NIST AI RMF', targetId: 'MEASURE (SI-4)' }
      ]
    },
    {
      id: 'sans-p3',
      clauseOrRiskId: 'Phase 3',
      title: 'Containment (Active Isolation)',
      category: 'Incident Response Phase',
      description: 'Stopping adversarial progression via circuit breaker model fallbacks, agent token revocation, and vector index freezing.',
      technicalRequirements: [
        'Trigger automated circuit breakers redirecting traffic to isolated fallback models.',
        'Immediately revoke ephemeral agent OAuth tokens to terminate active shell or DB sessions.',
        'Freeze vector databases into read-only mode to stop poisoned chunk propagation.'
      ],
      impactOrSeverity: 'Critical',
      mappedStandards: [
        { standard: 'NIST AI RMF', targetId: 'CP-2' },
        { standard: 'ISO 42001', targetId: 'Clause 10.2' }
      ]
    },
    {
      id: 'sans-p4',
      clauseOrRiskId: 'Phase 4',
      title: 'Eradication (Root Cause Removal)',
      category: 'Incident Response Phase',
      description: 'Purging poisoned embeddings, redeploying verified SafeTensors containers, and hardening guardrail classifiers.',
      technicalRequirements: [
        'Purge tainted vector chunks and invalidate semantic prompt caching layers.',
        'Terminate compromised model pods and redeploy verified SafeTensors images.',
        'Extract adversarial payloads from telemetry and update Llama Guard classifier rules.'
      ],
      impactOrSeverity: 'High',
      mappedStandards: [
        { standard: 'OWASP LLM', targetId: 'LLM01 / LLM04' }
      ]
    },
    {
      id: 'sans-p5',
      clauseOrRiskId: 'Phase 5',
      title: 'Recovery & Verification Testing',
      category: 'Incident Response Phase',
      description: 'Automated regression testing (1,000+ adversarial probes via Garak/PyRIT) and phased canary cutover.',
      technicalRequirements: [
        'Run automated battery of 1,000+ jailbreak probes before restoring production routing.',
        'Verify factual grounding on golden benchmark test set.',
        'Execute phased canary rollout (2% canary -> 25% staging -> 100% production).'
      ],
      impactOrSeverity: 'High',
      mappedStandards: [
        { standard: 'ISO 42001', targetId: 'A.6.4' },
        { standard: 'NIST AI RMF', targetId: 'MS-2' }
      ]
    },
    {
      id: 'sans-p6',
      clauseOrRiskId: 'Phase 6',
      title: 'Lessons Learned & ATLAS Sharing',
      category: 'Incident Response Phase',
      description: 'Conducting formal Post-Incident Review (PIR), meeting regulatory disclosure mandates, and contributing to MITRE ATLAS.',
      technicalRequirements: [
        'Analyze MTTD, MTTC, and MTTR and recalculate residual risk scores.',
        'Satisfy regulatory disclosure mandates (e.g., EU AI Act Art. 73 within 72 hours).',
        'Codify incident TTPs into MITRE ATLAS and share sanitized IoCs with industry ISACs.'
      ],
      impactOrSeverity: 'Moderate',
      mappedStandards: [
        { standard: 'ISO 42001', targetId: 'Clause 10.1' },
        { standard: 'IRGC', targetId: 'Phase 1 Horizon Scanning' }
      ]
    }
  ],
  'nist-ai-rmf': [
    {
      id: 'nist-gv',
      clauseOrRiskId: 'GOVERN (GV)',
      title: 'Foundational Governance & Culture',
      category: 'Core Function',
      description: 'Cultivating and sustaining a risk management culture, clear accountability structures, workforce competencies, and third-party risk management.',
      technicalRequirements: [
        'GV-1 & GV-2: Formulate enterprise AI Risk Policy and establish AI Governance Council with veto power.',
        'GV-3 & GV-4: Mandatory adversarial security training for developers and non-retaliation reporting channels.',
        'GV-6: Comprehensive third-party foundation model risk assessments and SLA audits.'
      ],
      impactOrSeverity: 'Critical',
      mappedStandards: [
        { standard: 'ISO 42001', targetId: 'Clause 5 & Clause 7' },
        { standard: 'IRGC', targetId: 'Oversight Board' }
      ]
    },
    {
      id: 'nist-mp',
      clauseOrRiskId: 'MAP (MP)',
      title: 'Context, Categorization & Impact Identification',
      category: 'Core Function',
      description: 'Understanding operational context, categorizing AI capabilities, mapping potential harms, and generating ML-SBOM dependencies.',
      technicalRequirements: [
        'MP-1 & MP-2: Define operational domain and perform tier categorization (Narrow vs. Frontier LLM).',
        'MP-3: Publish comprehensive System Card detailing capabilities, limits, and compute bounds.',
        'MP-5 & MP-6: Conduct Human Rights Impact Assessments and generate complete ML-SBOM (CycloneDX).'
      ],
      impactOrSeverity: 'High',
      mappedStandards: [
        { standard: 'ISO 42001', targetId: 'Clause 4 & A.5' },
        { standard: 'IRGC', targetId: 'Phase 1: Pre-Estimation' }
      ]
    },
    {
      id: 'nist-ms',
      clauseOrRiskId: 'MEASURE (MS)',
      title: 'Testing, Evaluation, Verification & Validation (TEVV)',
      category: 'Core Function',
      description: 'Quantitative metrics, independent adversarial red teaming, continuous drift detection, and real-time observability telemetry.',
      technicalRequirements: [
        'MS-1: Apply domain-specific metric suites (toxicity, BLEU/ROUGE, KS-drift test).',
        'MS-2: Conduct automated adversarial red-team testing (Garak, PyRIT) for prompt injection.',
        'MS-4: Maintain real-time telemetry dashboards tracking safety score distributions.'
      ],
      impactOrSeverity: 'Critical',
      mappedStandards: [
        { standard: 'OWASP LLM', targetId: 'All 10 Risks' },
        { standard: 'SANS AI IR', targetId: 'Phase 2: Identification' }
      ]
    },
    {
      id: 'nist-mn',
      clauseOrRiskId: 'MANAGE (MN)',
      title: 'Risk Prioritization, Mitigation & Monitoring',
      category: 'Core Function',
      description: 'Prioritizing risks, deploying multi-layered technical guardrails, managing third-party dependencies, and maintaining circuit breakers.',
      technicalRequirements: [
        'MN-1 & MN-2: Execute risk treatment plans deploying input sanitizers, output safety filters, and HITL gates.',
        'MN-3: Manage third-party provider failovers and enforce contractual data isolation.',
        'MN-4: Deploy automated circuit breakers terminating inference upon anomaly threshold breach.'
      ],
      impactOrSeverity: 'Critical',
      mappedStandards: [
        { standard: 'ISO 42001', targetId: 'Clause 8 & A.9' },
        { standard: 'IRGC', targetId: 'Phase 4: Risk Management' }
      ]
    },
    {
      id: 'nist-trust',
      clauseOrRiskId: '7 Characteristics',
      title: 'Trustworthy AI Core Dimensions',
      category: 'Trustworthiness Criteria',
      description: 'Valid & Reliable, Safe, Secure & Resilient, Accountable & Transparent, Explainable & Interpretable, Privacy-Enhanced, and Fair with Harmful Bias Managed.',
      technicalRequirements: [
        'Enforce DP-SGD for privacy-enhanced training and Presidio for context PII scrubbing.',
        'Quantify disparate impact ratios to manage harmful demographic bias.',
        'Implement standardized model cards to satisfy explainability and transparency criteria.'
      ],
      impactOrSeverity: 'High',
      mappedStandards: [
        { standard: 'ISO 42001', targetId: 'Annex A Controls' }
      ]
    }
  ]
};

export const CROSS_FRAMEWORK_MAPPINGS: CrossFrameworkMapping[] = [
  {
    domain: 'Adversarial Prompt Injection & Jailbreaking',
    iso42001: 'Clause 6.1.2 & Control A.9.3',
    owaspLLM: 'LLM01: Prompt Injection',
    nistAiRmf: 'MEASURE (MS-2) & MANAGE (MN-2)',
    irgcPhase: 'Phase 2 (Scientific Risk) & Phase 3 (Uncertain)',
    sansIrPhase: 'Phase 2: AML.T0054 & Phase 3: Containment',
    recommendedAction: 'Deploy dual-LLM guardrail architecture, input demarcation with nonces, and automated adversarial red teaming.'
  },
  {
    domain: 'Sensitive Data & Privacy Disclosure',
    iso42001: 'Control A.7.4 (Data Privacy)',
    owaspLLM: 'LLM02: Sensitive Info Disclosure',
    nistAiRmf: 'Privacy-Enhanced & MANAGE (AC-3)',
    irgcPhase: 'Phase 2 (Concern Assessment)',
    sansIrPhase: 'Phase 2: Data Exfil IoC & Phase 4: Eradication',
    recommendedAction: 'Enforce pre-inference PII scrubbing (Presidio), role-based vector metadata filtering, and Differential Privacy (DP-SGD).'
  },
  {
    domain: 'AI Supply Chain & Model Checkpoint Security',
    iso42001: 'Control A.4.2 & Control A.10.1',
    owaspLLM: 'LLM03: Supply Chain Vulnerabilities',
    nistAiRmf: 'GOVERN (GV-6) & SP 800-53 (SR-3)',
    irgcPhase: 'Phase 1: Pre-Estimation & Dependency Mapping',
    sansIrPhase: 'Phase 1: Model Zoo Hash & Phase 4: SafeTensors',
    recommendedAction: 'Ban raw pickle checkpoints; mandate SafeTensors (.safetensors), generate CycloneDX ML-SBOM, and verify SHA-256 signatures.'
  },
  {
    domain: 'Training Data & Fine-Tuning Poisoning',
    iso42001: 'Control A.7.1 - A.7.3 (Lineage & Quality)',
    owaspLLM: 'LLM04: Data and Model Poisoning',
    nistAiRmf: 'MEASURE (MS-1) & Valid and Reliable',
    irgcPhase: 'Phase 2: Scientific Hazard Assessment',
    sansIrPhase: 'Phase 2: AML.T0018 & Phase 4: Vector Purge',
    recommendedAction: 'Implement immutable data provenance tracking (DVC), anomaly screening in embedding space, and golden test benchmarks.'
  },
  {
    domain: 'Unsafe Execution & Excessive Agent Autonomy',
    iso42001: 'Control A.9.2 (Human Oversight)',
    owaspLLM: 'LLM05 (Improper Output) & LLM06 (Excessive Agency)',
    nistAiRmf: 'Safe & Secure & MANAGE (MN-2)',
    irgcPhase: 'Phase 4: Risk Mitigation & Tolerability ALARP',
    sansIrPhase: 'Phase 3: Revoke Agent OAuth Tokens',
    recommendedAction: 'Enforce Human-in-the-Loop gates for state-altering actions, execute code in microVM sandboxes (gVisor), and enforce step budgets.'
  },
  {
    domain: 'Continuous Drift, Anomaly & DoS Resilience',
    iso42001: 'Clause 9.1 & Control A.6.5',
    owaspLLM: 'LLM10: Unbounded Consumption',
    nistAiRmf: 'MEASURE (MS-4) & MANAGE (MN-4)',
    irgcPhase: 'Phase 4: Adaptive Management & Circuit Breakers',
    sansIrPhase: 'Phase 1: WORM Logging & Phase 3: Model Fallback',
    recommendedAction: 'Enforce strict token quotas, real-time drift telemetry (KS-test), and automated circuit breakers triggering fallback models.'
  }
];

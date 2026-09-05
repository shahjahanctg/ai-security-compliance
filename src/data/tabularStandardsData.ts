import { StandardId } from '../types';

export interface TableSection {
  title: string;
  description: string;
  headers: string[];
  rows: string[][];
}

export interface StandardTableDoc {
  standardId: StandardId;
  standardName: string;
  code: string;
  sections: TableSection[];
}

export const TABULAR_STANDARDS_DATA: Record<StandardId, StandardTableDoc> = {
  'iso-42001': {
    standardId: 'iso-42001',
    standardName: 'ISO/IEC 42001:2023 - Artificial Intelligence Management System (AIMS)',
    code: 'ISO/IEC 42001:2023',
    sections: [
      {
        title: 'Table 1: Core Management Clauses (Clauses 4 – 10)',
        description: 'Mandatory clauses establishing organizational alignment, governance, risk assessment, and continual improvement.',
        headers: ['Clause ID', 'Clause Name', 'Normative Requirement', 'Organizational Alignment & Technical Implementation', 'Audit Evidence / Artifact'],
        rows: [
          [
            'Clause 4.1',
            'Context of the Organization',
            'Determine external and internal issues affecting the AI Management System (AIMS).',
            'Bi-annual horizon scanning of AI technology, regulatory changes (EU AI Act, FTC), societal expectations, and compute supply chain constraints.',
            'AI Context Register (AIMS-CTX-001)'
          ],
          [
            'Clause 4.2',
            'Needs of Interested Parties',
            'Identify stakeholders and their legal, regulatory, and contractual requirements.',
            'Map requirements of data subjects, end-users, model providers, regulatory bodies, and downstream API consumers.',
            'AI Stakeholder Compliance Matrix (AIMS-STK-002)'
          ],
          [
            'Clause 4.3',
            'Scope of the AIMS',
            'Determine the boundaries and applicability of the AI Management System.',
            'Formulate clear boundaries covering internally trained models, fine-tuned/RAG adaptations, and third-party foundation model APIs.',
            'AIMS Scope Definition Document'
          ],
          [
            'Clause 5.1',
            'Leadership and Commitment',
            'Top management must demonstrate accountability for the AIMS.',
            'Allocate dedicated budget and computational resources for ethical/secure AI; foster culture of safety and non-retaliation.',
            'Board Minutes & AI Resource Allocation Memo'
          ],
          [
            'Clause 5.2',
            'AI Policy',
            'Establish an enterprise AI policy aligned with business objectives.',
            'Define permissible use cases, strictly prohibited applications (e.g. social scoring), and human agency requirements.',
            'Enterprise AI Policy (Signed by C-Suite)'
          ],
          [
            'Clause 5.3',
            'Roles, Responsibilities & Authorities',
            'Assign organizational roles for AI governance and technical safety.',
            'Appoint Chief AI Officer (CAIO), ML SecOps Lead, Data Stewards, and AI Ethics Committee with unilateral deployment veto authority.',
            'AI Governance RACI Matrix'
          ],
          [
            'Clause 6.1.2',
            'AI Risk Assessment Process',
            'Define and apply repeatable AI risk assessment processes.',
            'Evaluate threats unique to AI (prompt injection, model drift, data poisoning, hallucination, latent bias) against risk appetite.',
            'AI Risk Assessment Procedure & Risk Register'
          ],
          [
            'Clause 6.1.3',
            'AI Risk Treatment Process',
            'Formulate and execute risk treatment plans selecting Annex A controls.',
            'Map each identified AI threat to Annex A controls; generate formal justification for every control.',
            'Statement of Applicability (SoA) & Risk Treatment Plan'
          ],
          [
            'Clause 6.1.4',
            'AI System Impact Assessment (AI SIA)',
            'Conduct structured impact assessments assessing harm to individuals and society.',
            'Assess potential impacts on fundamental human rights, civil liberties, physical safety, psychological wellbeing, and carbon footprint.',
            'AI System Impact Assessment Dossier (AI SIA)'
          ],
          [
            'Clause 6.2',
            'AI Objectives & Planning',
            'Establish measurable AI objectives at relevant functions and levels.',
            'Define quantitative targets: e.g., adversarial prompt bypass rate < 0.05%, test coverage > 95%, fairness delta < 2%.',
            'Annual AI Objectives Scorecard'
          ],
          [
            'Clause 7.2',
            'Competence & Training',
            'Ensure personnel developing or operating AI are verifiably competent.',
            'Conduct mandatory training on prompt security, adversarial evasion, ethical boundaries, and bias detection for developers.',
            'AI Training Logs & Competency Certifications'
          ],
          [
            'Clause 8.1',
            'Operational Planning & Control',
            'Implement processes to satisfy AI security requirements and controls.',
            'Enforce MLOps/LLMOps stage-gates: requirements, automated red-teaming, human review gates, and production telemetry.',
            'MLOps Production Release Checklist'
          ],
          [
            'Clause 9.1',
            'Monitoring, Measurement & Evaluation',
            'Continuously evaluate AIMS performance and AI system effectiveness.',
            'Real-time inference telemetry tracking latency, drift (KS-test), jailbreak attempts, PII leakage, and classification accuracy.',
            'Observability Dashboard & Telemetry Logs'
          ],
          [
            'Clause 9.2',
            'Internal Audit',
            'Conduct planned internal audits at defined intervals.',
            'Independent internal assessment validating compliance against ISO 42001 clauses and Annex A controls at least annually.',
            'Internal Audit Report & Nonconformity Log'
          ],
          [
            'Clause 10.2',
            'Nonconformity & Corrective Action',
            'React to AI anomalies, control failures, and unintended consequences.',
            'Activate circuit breakers, trigger model rollback to deterministic fallbacks, execute root cause analysis, and log remediations.',
            'CAPA Incident Report & Corrective Action Plan'
          ]
        ]
      },
      {
        title: 'Table 2: Annex A Technical Controls (Controls A.2 – A.10)',
        description: 'Normative technical and operational controls for comprehensive AI system security.',
        headers: ['Control ID', 'Category', 'Control Objective', 'Technical Specification & Implementation', 'Audit Verification Method'],
        rows: [
          [
            'A.2.1',
            'Policies Related to AI',
            'AI policy formulation',
            'Documented operational AI policy covering acceptable model usage, banned prompts, and safety guidelines.',
            'Policy review and distribution sign-off records'
          ],
          [
            'A.2.2',
            'Policies Related to AI',
            'Alignment with other policies',
            'Harmonize AI policy with ISO 27001 (ISMS), ISO 27701 (Privacy), and ISO 31000 (Enterprise Risk).',
            'Cross-policy mapping document'
          ],
          [
            'A.3.1',
            'Internal Organization',
            'Roles and responsibilities',
            'Segregation of duties between AI model developers, independent red-team testers, and production deployment leads.',
            'Organizational chart & IAM access controls'
          ],
          [
            'A.3.2',
            'Internal Organization',
            'Reporting AI concerns',
            'Establish anonymous whistleblowing and automated anomaly escalation channels for reporting safety or bias flaws.',
            'Whistleblower portal logs & escalation tests'
          ],
          [
            'A.4.1',
            'Resources for AI',
            'Infrastructure and data resources',
            'Dedicated hardened compute clusters, hardware token verification, and data repository redundancy.',
            'Cloud infrastructure IaC scripts & enclave configs'
          ],
          [
            'A.4.2',
            'Resources for AI',
            'Tooling and computational resources',
            'Maintain strict inventory of ML compilers, quantization frameworks, and vector stores with automated CVE scanning.',
            'ML-SBOM & automated vulnerability scanner logs'
          ],
          [
            'A.5.1',
            'Assessing Impacts',
            'AI impact assessment process',
            'Standard operating procedure for pre-training and pre-deployment impact assessments across all production models.',
            'Standard Operating Procedure DOC-A5-01'
          ],
          [
            'A.5.2',
            'Assessing Impacts',
            'Impact on individuals and society',
            'Quantify potential harm to individual privacy, psychological safety, cognitive deskilling, and carbon footprint.',
            'Societal impact report & carbon tracking metrics'
          ],
          [
            'A.6.1 - A.6.4',
            'AI Life Cycle',
            'Life cycle stage-gate management',
            'Automated CI/CD gates: unit tests for data pipelines, golden dataset regression tests, adversarial red teaming before prod.',
            'CI/CD pipeline test run outputs & sign-offs'
          ],
          [
            'A.6.5',
            'AI Life Cycle',
            'Operation and monitoring',
            'Deploy live inference telemetry capturing token latency, drift detection (evidently/whylogs), and toxicity scores.',
            'Live monitoring dashboard & Prometheus/Grafana alerts'
          ],
          [
            'A.6.6',
            'AI Life Cycle',
            'Decommissioning',
            'Secure protocols for model retirement, weight archival, training data disposal, and vector index purging.',
            'Certificate of Data/Model Destruction'
          ],
          [
            'A.7.1 - A.7.3',
            'Data for AI',
            'Data acquisition, quality & lineage',
            'Scrape consent verification (robots.txt), outlier screening, and immutable data lineage tracking using DVC or MLflow.',
            'DVC repository commit history & license audits'
          ],
          [
            'A.7.4',
            'Data for AI',
            'Data privacy and protection',
            'Automated PII scrubbing (Presidio), token masking, and Differential Privacy (DP-SGD) during fine-tuning.',
            'Data scrubbing test suite & DP epsilon logs'
          ],
          [
            'A.8.1 - A.8.2',
            'Information & Transparency',
            'Transparency, explainability & notifications',
            'Standardized Model Cards published for all models; user-facing notification informing individuals they are interacting with AI.',
            'Published Model Cards & UI interaction disclosures'
          ],
          [
            'A.9.2',
            'Use of AI Systems',
            'Human oversight and intervention',
            'Human-in-the-loop (HITL) sign-off for irreversible actions; instant kill-switch manual override capabilities.',
            'HITL audit trail logs & kill-switch test run'
          ],
          [
            'A.9.3',
            'Use of AI Systems',
            'Prevention of unintended use',
            'Runtime guardrails (NeMo Guardrails, Llama Guard) blocking prompt injections, toxic completions, and unauthorized tool calls.',
            'Guardrail configuration files & penetration reports'
          ],
          [
            'A.10.1 - A.10.2',
            'Third-Party Relationships',
            'Supplier management & SLAs',
            'Due diligence for Foundation Model Providers assessing SOC 2 Type II reports, data retention policies, and shared SLAs.',
            'Third-party audit reports & signed SLAs'
          ]
        ]
      }
    ]
  },

  'owasp-llm': {
    standardId: 'owasp-llm',
    standardName: 'OWASP Top 10 for Large Language Model (LLM) Applications (2025)',
    code: 'OWASP Top 10 LLM',
    sections: [
      {
        title: 'Table 1: The OWASP Top 10 LLM Vulnerabilities & Mitigations Matrix',
        description: 'Complete threat taxonomy, exploitation vectors, and concrete technical countermeasures for LLM applications.',
        headers: ['Risk ID', 'Vulnerability Name', 'Severity', 'Attack Vector & Mechanism', 'Real-World Impact', 'Primary Engineering Mitigation', 'Verification & Testing Method'],
        rows: [
          [
            'LLM01',
            'Prompt Injection (Direct & Indirect)',
            'Critical',
            'Adversarial input manipulates the LLM instruction stream via jailbreaking or poisoned external RAG data.',
            'Unauthorized tool execution, data exfiltration, total subversion of safety guardrails.',
            'Cryptographic XML input delimiters with nonces; Dual-LLM classifier guardrail (Llama Guard); least-privilege agent scopes.',
            'Automated red teaming with Garak and PyRIT'
          ],
          [
            'LLM02',
            'Sensitive Information Disclosure',
            'Critical',
            'Model reveals confidential training data, PII, API keys, or proprietary IP via memorization or unsegmented RAG.',
            'GDPR/HIPAA fines, corporate trade secret exfiltration, identity theft.',
            'Automated PII scrubbing (Microsoft Presidio); RBAC metadata filtering on vector databases; Differential Privacy (DP-SGD).',
            'Synthetic extraction probing & membership inference tests'
          ],
          [
            'LLM03',
            'Supply Chain Vulnerabilities',
            'Critical',
            'Compromised foundation model weights, backdoored fine-tuned checkpoints, or malicious serialized Python pickle files.',
            'Remote code execution (RCE) upon loading weights, persistent neural backdoors.',
            'Ban raw pickle (.pt, .bin); mandate SafeTensors (.safetensors); verify SHA-256 signatures; generate CycloneDX ML-SBOM.',
            'Static dependency audits & signature validation'
          ],
          [
            'LLM04',
            'Data and Model Poisoning',
            'High',
            'Malicious alteration of pre-training corpora, fine-tuning data, or RLHF feedback to install backdoors or induce bias.',
            'Algorithmic discrimination, silent classification failure, subverted safety filters.',
            'Cryptographic data lineage (DVC); latent space anomaly detection; continuous evaluation on golden validation sets.',
            'Benchmark regression testing against immutable test sets'
          ],
          [
            'LLM05',
            'Improper Output Handling',
            'Critical',
            'Downstream interpreters (browsers, shell, databases) blindly executing raw LLM output without sanitization.',
            'Client-side XSS, SQL injection, Remote Code Execution (RCE) via eval() or bash calls.',
            'Treat LLM output as untrusted input; contextual encoding (DOMPurify); parameterized queries; microVM sandboxing (gVisor).',
            'DAST scanning & payload fuzzing on output handlers'
          ],
          [
            'LLM06',
            'Excessive Agency',
            'Critical',
            'Autonomous agents granted unrestricted permissions, destructive tool execution, or excessive API privileges.',
            'Unauthorized financial transfers, production database deletion, mass email compromise.',
            'Mandatory Human-in-the-Loop (HITL) 2FA confirmation for state changes; granular scoped OAuth; step budgets.',
            'Privilege escalation penetration testing on agent tools'
          ],
          [
            'LLM07',
            'System Prompt Leakage',
            'Moderate',
            'Adversaries extracting confidential system instructions, guardrail logic, or internal API schemas via token probing.',
            'Theft of proprietary prompt IP, reconnaissance for targeted jailbreak attacks.',
            'Never store credentials or private IP in prompts; output similarity filters blocking prompt mirroring; dynamic minimal prompts.',
            'Prompt extraction probing & semantic similarity checks'
          ],
          [
            'LLM08',
            'Vector and Embedding Weaknesses',
            'High',
            'Adversaries poisoning vector databases, exploiting semantic collisions, or performing embedding inversion attacks.',
            'Poisoned RAG response delivery, data exfiltration from vector stores, compliance bypass.',
            'Tenant metadata authorization filtering on vector queries; AES-256 encryption at rest; semantic distance anomaly thresholds.',
            'Vector inversion tests & semantic clustering audits'
          ],
          [
            'LLM09',
            'Misinformation & Hallucination',
            'High',
            'Model produces factually false or fabricated assertions presented with high linguistic confidence.',
            'Legal filing liabilities, erroneous medical/financial advice, package hallucination attacks.',
            'Strict RAG grounding with source citations; temperature = 0.0; deterministic citation & package verification checkers.',
            'TruthfulQA & Hallucination benchmark evaluations'
          ],
          [
            'LLM10',
            'Unbounded Consumption (DoS)',
            'High',
            'Adversarial inputs consuming excessive GPU memory, context tokens, or API budget causing denial of service.',
            'Service downtime, infrastructure starvation, massive cloud billing spikes (Denial of Wallet).',
            'Strict input/output token caps; per-user rate limiting; 15-second inference timeouts; automated billing circuit breakers.',
            'Stress testing with context flooding & concurrency loads'
          ]
        ]
      }
    ]
  },

  'irgc-governance': {
    standardId: 'irgc-governance',
    standardName: 'IRGC Risk Governance Framework for Artificial Intelligence',
    code: 'IRGC AI Governance',
    sections: [
      {
        title: 'Table 1: Four Core Governance Phases & Operational Procedures',
        description: 'End-to-end operational lifecycle for governing systemic, uncertain, and non-linear AI risks.',
        headers: ['Phase ID', 'Phase Name', 'Core Governance Objective', 'Operational Procedures & Methodologies', 'Key Deliverable / Decision'],
        rows: [
          [
            'Phase 1',
            'Pre-Estimation',
            'Frame the AI problem, delineate boundaries, and establish baseline assumptions.',
            'Boundary formulation, dual-use analysis, horizon scanning of weak adversarial signals and international regulations.',
            'Pre-Estimation AI Charter (IRGC-PE-01)'
          ],
          [
            'Phase 2A',
            'Scientific Risk Assessment',
            'Empirical and quantitative appraisal of technical vulnerabilities and hazards.',
            'Adversarial red teaming, out-of-distribution stress testing, systemic cascading dependency mapping, fairness metric calculations.',
            'Technical Risk & Vulnerability Dossier'
          ],
          [
            'Phase 2B',
            'Concern Assessment',
            'Socio-ethical appraisal of public trust, ethical implications, and human values.',
            'Human rights impact assessments, workforce displacement studies, engagement with user advocacy and civil society groups.',
            'Socio-Ethical Concern Assessment Report'
          ],
          [
            'Phase 3',
            'Risk Characterization & Evaluation',
            'Classify risk profiles and determine tolerability and acceptability boundaries.',
            'Categorize system into Simple, Complex, Uncertain, or Ambiguous profile; evaluate against ALARP (As Low As Reasonably Practicable) criteria.',
            'Formal Tolerability Decision (Acceptable / Tolerable / Intolerable)'
          ],
          [
            'Phase 4',
            'Risk Management',
            'Design and execute technical and organizational risk treatment options.',
            'Implement risk prevention, technical guardrails (NeMo, Llama Guard), adaptive rollback engines, and contractual risk transfer.',
            'AI Risk Management Plan & Circuit Breaker SOP'
          ]
        ]
      },
      {
        title: 'Table 2: The Four IRGC Risk Profiles for AI Systems',
        description: 'Categorization framework matching AI complexity to specific management approaches.',
        headers: ['Profile', 'Definition in AI Context', 'Example AI Applications', 'Primary Management Strategy', 'Tolerability Requirement'],
        rows: [
          [
            'Simple Risks',
            'Known hazards, deterministic causality, predictable outcomes, mature data.',
            'Rule-based spam filters, deterministic regression forecasters.',
            'Routine Standard Operating Procedures (SOPs), statistical process control.',
            'Acceptable under routine cyber hygiene.'
          ],
          [
            'Complex Risks',
            'High difficulty in tracing cause and effect due to deep neural architectures and multi-agent interactions.',
            'Deep Reinforcement Learning for power grids; multimodal vision-language agents.',
            'Adversarial red teaming, extensive simulation testing, formal mathematical verification.',
            'Tolerable only with verified robustness testing.'
          ],
          [
            'Uncertain Risks',
            'Incomplete scientific knowledge, non-deterministic outputs, emergent capabilities.',
            'Frontier foundation models, autonomous reasoning agents with external tool calling.',
            'Precautionary circuit breakers, low autonomy budgets, fail-safe fallbacks, human veto power.',
            'Tolerable strictly under ALARP and kill-switches.'
          ],
          [
            'Ambiguous Risks',
            'Conflicting values, differing ethical interpretations, societal debate on permissible use.',
            'Predictive policing, automated emotion analysis, lethal autonomous tools.',
            'Discursive governance: multi-stakeholder oversight boards, ethics committees, regulatory alignment.',
            'Intolerable unless certified by public ethics boards.'
          ]
        ]
      },
      {
        title: 'Table 3: Cross-Cutting Oversight Procedures & RACI Matrix',
        description: 'Organizational structures and continuous governance routines.',
        headers: ['Governance Function', 'Primary Role & Composition', 'Mandate & Authority', 'Operational Cadence', 'Escalation Threshold'],
        rows: [
          [
            'AI Oversight Board',
            'CAIO, CISO, General Counsel, AI Ethics Lead, Senior ML Architect.',
            'Unilateral deployment veto authority; approves all models exceeding moderate risk.',
            'Monthly routine; emergency within 4 hours of Level 1 anomaly.',
            'Any unmitigated High/Critical risk score.'
          ],
          [
            'ML SecOps Team',
            'ML Engineers, Penetration Testers, Cloud Security Architects.',
            'Responsible for deploying guardrails, input nonces, and running automated red teams.',
            'Continuous CI/CD integration.',
            'Jailbreak bypass rate > 0.05% in test battery.'
          ],
          [
            'Data Governance Lead',
            'Data Stewards, Compliance Officers.',
            'Maintains immutable dataset lineage (DVC), scrape consent, and PII scrubbing.',
            'Weekly data pipeline audits.',
            'Any ingestion of unverified external data.'
          ],
          [
            'Post-Market Audit',
            'Independent Internal & External Compliance Auditors.',
            'Annual recertification; continuous review of live drift, user flags, and safety incidents.',
            'Quarterly review; annual recertification.',
            'Cumulative model drift > 3 standard deviations.'
          ]
        ]
      }
    ]
  },

  'sans-ir': {
    standardId: 'sans-ir',
    standardName: 'SANS AI Incident Response & MITRE ATLAS Threat Intel Framework',
    code: 'SANS AI IR & CTI',
    sections: [
      {
        title: 'Table 1: The SANS 6-Phase AI Incident Response Lifecycle (PICERL)',
        description: 'Operational playbooks adapted for Large Language Models and autonomous agent architectures.',
        headers: ['Phase ID', 'Phase Name', 'AI Threat Surface & Focus', 'Operational IR Playbook Actions', 'Technical Tools & Telemetry', 'Verification & Exit Gate'],
        rows: [
          [
            'Phase 1',
            'Preparation',
            'AI asset inventory, cryptographic identity, and threat intelligence ingestion.',
            'Catalog all models, weights, vector stores, and agent tool scopes with SHA-256 hashes; deploy WORM inference logging; ingest ATLAS STIX feeds.',
            'MLflow, ML-SBOM (CycloneDX), WORM SIEM, OpenCTI',
            '100% of production models indexed with verified baseline telemetry.'
          ],
          [
            'Phase 2',
            'Identification',
            'Detection and triage of adversarial prompt injections, model extraction, and poisoned embeddings.',
            'Deploy real-time IoA/IoC detectors flagging delimiter escapes and high-density unicode; monitor token velocity; classify incident severity (1-4).',
            'Llama Guard, Prompt Shield, Prometheus token monitors',
            'Incident triaged and assigned severity level within 15 minutes.'
          ],
          [
            'Phase 3',
            'Containment',
            'Halting adversarial progression and preventing data exfiltration.',
            'Trigger automated circuit breakers redirecting traffic to deterministic fallback models; revoke ephemeral agent OAuth tokens; freeze vector databases.',
            'API Gateway circuit breakers, IAM token revocation, Vector DB freeze',
            'Compromised component isolated with zero lateral network access.'
          ],
          [
            'Phase 4',
            'Eradication',
            'Root cause removal and elimination of malicious artifacts.',
            'Purge tainted vector chunks and document embeddings; terminate compromised model pods; redeploy verified SafeTensors; update guardrails with attack signatures.',
            'Vector DB purge scripts, Kubernetes pod redeploy, Guardrail rule updates',
            'All poisoned data eliminated and guardrail classifier patched.'
          ],
          [
            'Phase 5',
            'Recovery',
            'Restoring production service with verified safety guarantees.',
            'Execute automated regression battery (1,000+ jailbreak probes via Garak/PyRIT); verify factual accuracy on golden benchmark; execute phased canary rollout.',
            'Garak, PyRIT, Canary traffic router (2% -> 25% -> 100%)',
            'Zero jailbreak bypasses in 1,000-probe test battery.'
          ],
          [
            'Phase 6',
            'Lessons Learned',
            'Post-incident review, regulatory disclosures, and threat intel sharing.',
            'Analyze MTTD/MTTC/MTTR; satisfy EU AI Act Art. 73 72-hour notification mandates; codify attack into MITRE ATLAS TTPs; share sanitized IoCs with AI-ISAC.',
            'PIR Documentation, STIX 2.1 exporter, ISAC portal',
            'Formal PIR report approved by CISO within 5 business days.'
          ]
        ]
      },
      {
        title: 'Table 2: MITRE ATLAS Threat Intelligence Integration Matrix',
        description: 'Mapping AI-specific adversarial tactics, techniques, and automated detection logic.',
        headers: ['ATLAS ID', 'Technique Name', 'Adversarial Attack Description', 'Primary Indicators of Attack (IoAs)', 'Automated SOC / SOAR Playbook Action'],
        rows: [
          [
            'AML.T0054',
            'LLM Prompt Injection',
            'Adversary crafts prompts to override system instructions and execute unintended logic.',
            'Delimiter framing commands (system:, [INST], <<SYS>>), zero-width unicode, Base64 strings.',
            'Trigger API gateway filter; reject request; issue IP rate-limit strike; log prompt to forensic SIEM.'
          ],
          [
            'AML.T0024',
            'Model Inversion / Extraction',
            'Adversary queries model systematically to reconstruct training data or steal model weights.',
            'High-velocity queries with uniform prompt structure and sweeping temperature values.',
            'Engage proof-of-work CAPTCHA; throttle API quota to zero; notify threat response analyst.'
          ],
          [
            'AML.T0018',
            'Poisoning Training/Context Data',
            'Adversary corrupts RAG vector chunks or training corpora to install backdoors.',
            'Sudden divergence in vector embedding clusters; unauthorized bulk upsert API calls.',
            'Freeze vector index write permissions; quarantine tainted partition; trigger hash audit.'
          ],
          [
            'AML.T0053',
            'LLM Execution of Malicious Tools',
            'Adversary exploits prompt injection to force an agent to execute unauthorized tools.',
            'Tool invocation with anomalous parameters; shell execution requests; external HTTP egress.',
            'Revoke agent session OAuth token; kill container socket; alert incident response team.'
          ]
        ]
      }
    ]
  },

  'nist-ai-rmf': {
    standardId: 'nist-ai-rmf',
    standardName: 'NIST Artificial Intelligence Risk Management Framework (AI RMF 1.0)',
    code: 'NIST AI RMF 1.0',
    sections: [
      {
        title: 'Table 1: The Four Core Functions & Technical Controls',
        description: 'Operational controls across Govern, Map, Measure, and Manage mapped to NIST SP 800-53 Rev. 5.',
        headers: ['Function & ID', 'Sub-Category Name', 'Core Requirement', 'Technical Implementation & MLOps Practice', 'NIST SP 800-53 Rev. 5 Crosswalk'],
        rows: [
          [
            'GOVERN (GV-1)',
            'Policies and Processes',
            'AI risk policies, processes, and practices are established and operationalized.',
            'Enterprise AI Risk Policy approved by Board; annual review cycle; integration into enterprise risk management.',
            'PL-8 (Information Security Architecture)'
          ],
          [
            'GOVERN (GV-2)',
            'Accountability Structures',
            'Accountability structures are established, maintained, and resourced.',
            'AI Governance Council with deployment veto authority; dedicated CAIO and ML SecOps roles.',
            'PM-1 (Information Security Program Plan)'
          ],
          [
            'GOVERN (GV-6)',
            'Third-Party Risks',
            'Third-party AI risks are identified, managed, and monitored.',
            'Vendor assessment protocol for foundation model providers; contractual data isolation SLAs.',
            'SR-3 (Supply Chain Controls)'
          ],
          [
            'MAP (MP-1)',
            'Context Formulation',
            'Context of the AI system is established, documented, and understood.',
            'Document operational domain, target user personas, legal constraints, and explicit prohibited uses.',
            'SA-4 (Acquisition Process)'
          ],
          [
            'MAP (MP-3)',
            'System Capabilities & Limits',
            'AI capabilities, targeted usage, and boundaries are documented.',
            'Publish comprehensive System Cards detailing supported input schemas, latency limits, and compute bounds.',
            'CM-8 (Information System Component Inventory)'
          ],
          [
            'MAP (MP-5)',
            'Societal & Individual Impacts',
            'Potential positive and negative impacts are mapped and evaluated.',
            'Conduct structured Human Rights & Algorithmic Impact Assessment quantifying harm to civil liberties and privacy.',
            'RA-3 (Risk Assessment)'
          ],
          [
            'MAP (MP-6)',
            'Dependencies & Supply Chain',
            'Upstream and downstream system dependencies are mapped.',
            'Generate machine-readable ML Software Bill of Materials (ML-SBOM) tracking weights, datasets, and plugins.',
            'SR-4 (Provenance)'
          ],
          [
            'MEASURE (MS-1)',
            'Metrics Selection',
            'Appropriate measurement methods and metrics are identified and applied.',
            'Select metric suites: toxicity scores, BLEU/ROUGE, KS-drift tests, disparate impact ratios, latency percentiles.',
            'SI-4 (System Monitoring)'
          ],
          [
            'MEASURE (MS-2)',
            'Trustworthiness Evaluation',
            'AI systems are evaluated for trustworthiness characteristics prior to release.',
            'Execute independent adversarial red teaming (Garak, PyRIT) for prompt injection and model extraction.',
            'CA-8 (Penetration Testing)'
          ],
          [
            'MEASURE (MS-4)',
            'Measurement Tracking',
            'Measurement results are documented, communicated, and tracked over time.',
            'Real-time observability dashboard displaying drift metrics, safety score distributions, and evaluation summaries.',
            'AU-6 (Audit Review, Analysis & Reporting)'
          ],
          [
            'MANAGE (MN-1)',
            'Risk Prioritization',
            'AI risks based on assessments are prioritized and addressed.',
            'Risk treatment plans categorizing hazards into Accept, Avoid, Mitigate, or Transfer with assigned owners.',
            'RA-5 (Vulnerability Monitoring & Remediation)'
          ],
          [
            'MANAGE (MN-2)',
            'Mitigation Deployment',
            'Mitigation strategies are planned, implemented, and validated.',
            'Deploy multi-layered technical guardrails: input nonces, output safety filters, context demarcation, and HITL gates.',
            'SC-7 (Boundary Protection)'
          ],
          [
            'MANAGE (MN-4)',
            'Residual Risk Monitoring',
            'Risk treatments and emerging risks are monitored and tracked continuously.',
            'Continuous inference monitoring with automated circuit breakers that kill inference upon anomaly threshold breach.',
            'CP-2 (Contingency Plan)'
          ]
        ]
      },
      {
        title: 'Table 2: Seven Characteristics of Trustworthy AI',
        description: 'The seven core dimensions defining AI system safety and reliability under NIST AI 100-1.',
        headers: ['Characteristic', 'Dimension Definition', 'AI Risk Failure Modes', 'Verification Metric & TEVV Protocol'],
        rows: [
          [
            'Valid & Reliable',
            'Performs consistently as intended under expected and edge-case conditions.',
            'Distribution drift, catastrophic forgetting, brittle classification on out-of-distribution data.',
            'Cross-validation benchmarks; Kolmogorov-Smirnov drift test; golden dataset regression testing.'
          ],
          [
            'Safe',
            'Does not cause endangerment to human life, health, property, or the environment.',
            'Autonomous action without boundaries; physical control failure; hazardous recommendations.',
            'Fault tree analysis; hard real-time execution bounds; Human-in-the-Loop approval gates.'
          ],
          [
            'Secure & Resilient',
            'Maintains integrity against adversarial manipulation and degrades gracefully.',
            'Prompt injection; data poisoning; model extraction; evasion attacks.',
            'Adversarial red teaming (Garak/PyRIT); SafeTensors checksum validation; microVM sandboxing.'
          ],
          [
            'Accountable & Transparent',
            'Clear organizational ownership with transparent disclosures of capabilities and limitations.',
            'Opaque decision-making; undocumented data sources; unassigned liability.',
            'Standardized System & Model Cards; public audit reports; immutable WORM inference logs.'
          ],
          [
            'Explainable & Interpretable',
            'Users and auditors can understand how algorithmic decision outputs were derived.',
            'Black-box neural representations; incomprehensible automated rejections.',
            'Feature attribution (SHAP/LIME); attention heatmaps; counterfactual explanations.'
          ],
          [
            'Privacy-Enhanced',
            'Preserves data privacy, confidentiality, and data subject rights.',
            'Training data memorization; unredacted RAG leakage; membership inference.',
            'Pre-inference PII scrubbing (Presidio); Differential Privacy (DP-SGD); vector metadata RBAC.'
          ],
          [
            'Fair with Harmful Bias Managed',
            'Prevents systemic discrimination and maintains equitable outcomes across groups.',
            'Historical bias amplification; disparate impact on protected demographic classes.',
            'Disparate impact ratio; equalized odds delta; demographic parity statistical tests.'
          ]
        ]
      },
      {
        title: 'Table 3: Organizational Maturity Tiers (Tiers 1 – 4)',
        description: 'Maturity benchmarking progression for enterprise AI risk management.',
        headers: ['Tier Level', 'Tier Name', 'Governance Profile', 'Technical Implementation', 'Verification & Audit Cadence'],
        rows: [
          [
            'Tier 1',
            'Partial',
            'Ad-hoc, informal risk practices; no formal enterprise AI policy.',
            'Siloed development; no automated guardrails; unverified model weights.',
            'No planned audit schedule; purely reactive.'
          ],
          [
            'Tier 2',
            'Risk-Informed',
            'Management approves AI risk awareness; policies drafted but inconsistently enforced.',
            'Manual pre-launch testing; basic input filtering; partial telemetry logging.',
            'Occasional ad-hoc reviews before major releases.'
          ],
          [
            'Tier 3',
            'Repeatable',
            'Enterprise-wide AIMS policies consistently applied across all divisions.',
            'Automated CI/CD TEVV pipelines; Llama Guard classifiers; ML-SBOM generation.',
            'Regular bi-annual internal audits; external SOC 2 / ISO 42001 alignment.'
          ],
          [
            'Tier 4',
            'Adaptive',
            'Dynamic, continuous risk governance informed by real-time threat intelligence.',
            'Real-time automated guardrails; continuous red teaming; MITRE ATLAS feed ingestion.',
            'Continuous automated telemetry auditing with real-time alerting.'
          ]
        ]
      }
    ]
  }
};

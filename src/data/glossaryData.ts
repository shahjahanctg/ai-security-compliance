export interface GlossaryItem {
  id: string;
  term: string;
  acronym?: string;
  category:
    | 'Threat Vectors & Vulnerabilities'
    | 'Governance & Frameworks'
    | 'Technical Defenses & Mitigations'
    | 'Architecture & Engineering'
    | 'Assurance, Audit & Testing';
  definition: string;
  relevance: string;
  governingStandards: string[];
  recommendedAction: string;
}

export const GLOSSARY_CATEGORIES = [
  'All',
  'Threat Vectors & Vulnerabilities',
  'Governance & Frameworks',
  'Technical Defenses & Mitigations',
  'Architecture & Engineering',
  'Assurance, Audit & Testing',
] as const;

export const GLOSSARY_ITEMS: GlossaryItem[] = [
  {
    id: 'aims',
    term: 'Artificial Intelligence Management System',
    acronym: 'AIMS',
    category: 'Governance & Frameworks',
    definition:
      'A structured, documented management system established by an organization to systematically govern the development, acquisition, deployment, and ongoing operation of AI systems in accordance with ISO/IEC 42001:2023.',
    relevance:
      'Serves as the organizational backbone uniting executive leadership, risk appetite, policy enforcement, resource allocation, and continuous audit oversight for AI safety.',
    governingStandards: ['ISO/IEC 42001 (Clauses 4-10)', 'NIST AI RMF (Govern)'],
    recommendedAction:
      'Formally charter an AI Governance Council, publish an enterprise AI policy, and maintain an authoritative registry of all algorithmic assets and their risk classifications.',
  },
  {
    id: 'prompt-injection',
    term: 'Prompt Injection (Direct & Indirect)',
    acronym: 'PI',
    category: 'Threat Vectors & Vulnerabilities',
    definition:
      'An adversarial attack where a threat actor manipulates the instructions provided to a Large Language Model—either directly through user input (Direct PI / Jailbreaking) or indirectly through retrieved web content, PDFs, emails, or databases (Indirect PI)—causing the model to bypass safety constraints, execute unauthorized logic, or exfiltrate sensitive data.',
    relevance:
      'Ranked as OWASP LLM01 and the foremost existential attack surface for LLM applications and agentic workflows.',
    governingStandards: ['OWASP LLM01', 'NIST AI RMF (Manage 1.3)', 'SANS AI IR (Identification)'],
    recommendedAction:
      'Enforce strict architectural separation between instructions and untrusted data, utilize dual-LLM evaluator patterns, and implement runtime guardrail inspection on all prompt ingestion pipelines.',
  },
  {
    id: 'jailbreaking',
    term: 'Jailbreaking & Adversarial Prompting',
    category: 'Threat Vectors & Vulnerabilities',
    definition:
      'The practice of exploiting syntactic quirks, persona roleplay, hypothetical scenarios, multi-language encoding (Base64, hex, ciphers), or logic traps to override an AI model’s pre-trained safety filters, ethical guardrails, and system prompt constraints.',
    relevance:
      'Threat actors use automated jailbreak engines (e.g. GCG, PAIR) to elicit prohibited chemical/biological weapon designs, cyber exploit code, or bypass organizational access controls.',
    governingStandards: ['OWASP LLM01', 'MITRE ATLAS AML.T0054', 'SANS AI IR'],
    recommendedAction:
      'Deploy input semantic anomaly classifiers (e.g., Llama Guard, NeMo Guardrails), apply prompt sandboxing, and maintain a continuously updated library of jailbreak token patterns.',
  },
  {
    id: 'rag-poisoning',
    term: 'Retrieval-Augmented Generation (RAG) Poisoning',
    acronym: 'RAG Poisoning',
    category: 'Threat Vectors & Vulnerabilities',
    definition:
      'A targeted attack wherein malicious or forged documents, poisoned vector embeddings, or adversarial metadata are injected into the external knowledge repositories and vector databases queried by an LLM at inference time.',
    relevance:
      'Enables attackers to poison enterprise answers, induce persistent hallucinations, compromise corporate compliance decisions, or plant dormant sleeper agents.',
    governingStandards: ['OWASP LLM03', 'ISO/IEC 42001 (A.6.2)', 'MITRE ATLAS AML.T0018'],
    recommendedAction:
      'Digitally sign and verify all vector database chunks, calculate cryptographic hashes (SHA-256) on raw corpus files, enforce tenant-scoped vector namespaces, and conduct similarity sanity checking.',
  },
  {
    id: 'mitre-atlas',
    term: 'Adversarial Threat Landscape for AI Systems',
    acronym: 'MITRE ATLAS',
    category: 'Governance & Frameworks',
    definition:
      'A globally acknowledged taxonomy and matrix of real-world adversary tactics, techniques, and procedures (TTPs) targeting artificial intelligence and machine learning systems, developed in partnership by MITRE, industry, and academia.',
    relevance:
      'Serves as the AI-specific counterpart to MITRE ATT&CK, allowing security operations centers (SOC) to categorize AI incidents, map threat models, and structure blue-team detection engineering.',
    governingStandards: ['SANS AI IR (CTI Integration)', 'NIST AI RMF (Measure 2.6)'],
    recommendedAction:
      'Map internal SIEM alert signatures, red teaming playbooks, and threat intelligence feeds directly to MITRE ATLAS technique IDs (e.g. AML.T0040 ML Model Extraction).',
  },
  {
    id: 'excessive-agency',
    term: 'Excessive Agency & Autonomous Action Risks',
    category: 'Threat Vectors & Vulnerabilities',
    definition:
      'A system flaw wherein an autonomous LLM or AI agent is granted broad operational permissions, write access to databases, unverified execution of system shells, or high-privilege API tokens without mandatory human approval or granular scope limitations.',
    relevance:
      'If an agent experiences prompt injection or hallucination, excessive agency allows the compromised agent to send unauthorized emails, wipe production tables, or transfer financial assets.',
    governingStandards: ['OWASP LLM06', 'ISO/IEC 42001 (A.7.4)', 'NIST AI RMF (Manage 2.2)'],
    recommendedAction:
      'Enforce Human-in-the-Loop (HITL) authorization for all state-changing actions, restrict agent API keys with minimal scopes, and isolate execution inside read-only micro-containers.',
  },
  {
    id: 'model-inversion',
    term: 'Model Inversion & Membership Inference Attacks',
    category: 'Threat Vectors & Vulnerabilities',
    definition:
      'Cryptanalytic and statistical extraction techniques where an adversary analyzes an AI model’s outputs, confidence scores, and token probability distributions to reconstruct private training samples (PII, trade secrets, clinical records) or verify whether a specific individual’s record was used during training.',
    relevance:
      'Directly threatens compliance with GDPR, HIPAA, and CCPA privacy mandates, even if raw training data is never publicly exposed.',
    governingStandards: ['OWASP LLM02', 'ISO/IEC 42001 (A.6.3)', 'NIST AI RMF (Privacy-Enhanced)'],
    recommendedAction:
      'Apply Differential Privacy (DP-SGD) during pre-training and fine-tuning, clamp or round output logits, and implement rate limits on repetitive similarity queries.',
  },
  {
    id: 'differential-privacy',
    term: 'Differential Privacy',
    acronym: 'DP',
    category: 'Technical Defenses & Mitigations',
    definition:
      'A mathematical framework that quantifies and bounds privacy risk by injecting mathematically calibrated noise (e.g., Laplace or Gaussian mechanism) into model training gradients or data query results, ensuring that the inclusion or removal of any single record does not perceptibly alter the overall output distribution.',
    relevance:
      'Provides provable, regulator-recognized guarantees against training data extraction and membership inference attacks.',
    governingStandards: ['ISO/IEC 42001 (A.6.3)', 'NIST AI RMF (Trustworthy Characteristics)'],
    recommendedAction:
      'Incorporate DP-SGD (Differentially Private Stochastic Gradient Descent) with a bounded privacy budget (epsilon < 2.0) for models trained on proprietary customer telemetry.',
  },
  {
    id: 'picerl',
    term: 'PICERL Incident Response Lifecycle for AI',
    acronym: 'PICERL',
    category: 'Governance & Frameworks',
    definition:
      'The foundational six-stage incident response methodology—Preparation, Identification, Containment, Eradication, Recovery, and Lessons Learned—formally expanded by SANS to address AI-specific failure modes such as prompt injections, model extraction, data poisoning, and agent hijacking.',
    relevance:
      'Transforms traditional IT incident response teams into specialized AI-ready defenders with playbooks for model rollback, vector purge, and algorithmic kill switches.',
    governingStandards: ['SANS AI IR (Lifecycle Phases 1-6)', 'NIST SP 800-61 Rev. 3'],
    recommendedAction:
      'Publish dedicated AI Incident Playbooks for top 5 threat scenarios and conduct bi-annual tabletop exercises testing emergency model weights rollback and prompt cache invalidation.',
  },
  {
    id: 'socio-technical-governance',
    term: 'Socio-Technical Risk Governance',
    category: 'Governance & Frameworks',
    definition:
      'A risk management paradigm formulated by the International Risk Governance Center (IRGC) recognizing that AI hazards do not originate solely from software bugs or neural network mathematics, but from the complex interactions between algorithms, human psychology, cognitive biases, organizational cultures, legal mandates, and social environments.',
    relevance:
      'Prevents catastrophic blind spots caused by purely technical security evaluations, ensuring organizational and ethical accountability across four phases (Pre-Estimation, Appraisal, Characterization, Management).',
    governingStandards: ['IRGC AI Framework', 'ISO/IEC 42001 (Clause 4 & 5)'],
    recommendedAction:
      'Institute multidisciplinary stakeholder reviews prior to AI deployment that include ethicists, domain specialists, legal counsel, and end-user representatives.',
  },
  {
    id: 'trustworthy-ai',
    term: 'Trustworthy AI Core Characteristics',
    category: 'Governance & Frameworks',
    definition:
      'The seven foundational characteristics defined by the NIST AI RMF 1.0 that an AI system must balance and uphold: (1) Valid & Reliable, (2) Safe, (3) Secure & Resilient, (4) Accountable & Transparent, (5) Explainable & Interpretable, (6) Privacy-Enhanced, and (7) Fair with Harmful Bias Managed.',
    relevance:
      'Functions as the benchmark evaluation criteria for government agencies, enterprise procurement, and ISO certification audits.',
    governingStandards: ['NIST AI RMF 1.0 (Section 1.2)', 'ISO/IEC 42001 (A.5)'],
    recommendedAction:
      'Document a Trustworthy AI Scorecard for each AI service before production rollout, detailing quantitative metrics for safety, resilience, and demographic fairness.',
  },
  {
    id: 'ai-guardrails',
    term: 'AI Input/Output Guardrails',
    category: 'Technical Defenses & Mitigations',
    definition:
      'Programmatic and model-based inspection layers positioned in front of and behind an AI foundation model that evaluate incoming user prompts and outgoing model completions in real time to intercept toxic language, jailbreaks, prompt injections, PII disclosures, and ungrounded hallucinations.',
    relevance:
      'Provides the first line of automated defense preventing weaponized inputs from reaching the core neural network and preventing proprietary data leakage.',
    governingStandards: ['OWASP LLM01 & LLM02', 'ISO/IEC 42001 (A.7.2)', 'SANS AI IR (Containment)'],
    recommendedAction:
      'Deploy low-latency semantic guardrail proxies (e.g. NeMo, Guardrails AI) with strict regex filters for PII, canary token detection, and semantic toxicity thresholds.',
  },
  {
    id: 'aibom',
    term: 'AI Bill of Materials',
    acronym: 'AIBOM',
    category: 'Architecture & Engineering',
    definition:
      'A machine-readable, cryptographically signed inventory (similar to an SBOM) documenting the full provenance of an AI system: foundational model architecture, base weights hash, fine-tuning datasets, data licenses, tokenizers, system prompts, dependencies, and external tool endpoints.',
    relevance:
      'Essential for defending against supply chain vulnerabilities (OWASP LLM05) and demonstrating compliance with EU AI Act and ISO 42001 audit requirements.',
    governingStandards: ['OWASP LLM05', 'ISO/IEC 42001 (A.8.2)', 'NIST AI RMF (Map 1.5)'],
    recommendedAction:
      'Generate automated CycloneDX or SPDX-format AIBOM manifests during CI/CD pipelines and verify SHA-256 checksums of all HuggingFace and PyTorch model checkpoints.',
  },
  {
    id: 'red-teaming',
    term: 'AI Red Teaming & Adversarial Stress Testing',
    category: 'Assurance, Audit & Testing',
    definition:
      'Structured, simulated adversarial assessments wherein elite security practitioners intentionally probe, fuzz, stress-test, and exploit an AI model and its ecosystem to discover novel jailbreaks, hallucinations, bias disparities, and boundary vulnerabilities before malicious actors do.',
    relevance:
      'Mandated by executive orders and standard bodies because conventional static code scanning cannot detect emergent non-deterministic generative AI vulnerabilities.',
    governingStandards: ['NIST AI RMF (Measure 2.5)', 'ISO/IEC 42001 (A.7.3)', 'OWASP LLM Verification'],
    recommendedAction:
      'Execute continuous automated and manual adversarial red-team campaigns with standardized benchmark suites (e.g. Garak, PyRIT) before every major model release.',
  },
  {
    id: 'shadow-ai',
    term: 'Shadow AI',
    category: 'Governance & Frameworks',
    definition:
      'The unsanctioned, unmonitored use of external, consumer-grade, or public generative AI tools (e.g. public ChatGPT, Claude, Midjourney) by enterprise employees using corporate data, credentials, or proprietary source code without infosec approval.',
    relevance:
      'Leads to catastrophic intellectual property leakage, non-compliance with data residency regulations, and loss of legal confidentiality.',
    governingStandards: ['ISO/IEC 42001 (Clause 8.1)', 'NIST AI RMF (Govern 1.2)'],
    recommendedAction:
      'Deploy Cloud Access Security Broker (CASB) policies blocking unauthorized AI domains and provide enterprise-approved, zero-data-retention AI workspace proxies.',
  },
  {
    id: 'model-drift',
    term: 'Model Drift & Data Drift',
    category: 'Architecture & Engineering',
    definition:
      'The gradual decay in an AI model’s predictive accuracy, classification reliability, or safety posture over time caused by shifts in real-world statistical input distributions (covariate shift) or changes in the underlying relationships between inputs and outputs (concept drift).',
    relevance:
      'Can cause autonomous fraud detection, medical triage, or security monitoring models to fail silently, resulting in substantial financial or compliance damages.',
    governingStandards: ['ISO/IEC 42001 (A.9.2)', 'NIST AI RMF (Measure 1.1)', 'IRGC AI (Adaptive Management)'],
    recommendedAction:
      'Configure real-time statistical drift monitors (e.g. Kolmogorov-Smirnov tests, Population Stability Index) with automated alerts whenever input distributions diverge beyond 5%.',
  },
  {
    id: 'hallucination',
    term: 'Hallucination & Ungrounded Output',
    category: 'Threat Vectors & Vulnerabilities',
    definition:
      'The phenomenon wherein a generative AI model synthesizes statements, citations, factual claims, or code libraries that are completely fabricated or incorrect, yet articulated with high syntactic confidence.',
    relevance:
      'Exposes organizations to defamation lawsuits, erroneous critical business decisions, and software supply-chain vulnerabilities via package hallucination attacks.',
    governingStandards: ['OWASP LLM09', 'NIST AI RMF (Measure 2.8)'],
    recommendedAction:
      'Enforce strict context grounding via RAG architectures, require verbatim attribution citations in system prompts, and execute secondary fact-verification evaluator models.',
  },
  {
    id: 'canary-tokens',
    term: 'Prompt Canary Tokens & Data Watermarking',
    category: 'Technical Defenses & Mitigations',
    definition:
      'Unique, high-entropy cryptographic strings or statistical markers intentionally concealed inside confidential system prompts, training corpora, or vector knowledge bases that, when detected in user outputs or external logs, immediately trigger a high-severity alert for prompt extraction or data theft.',
    relevance:
      'Provides instantaneous, incontrovertible digital evidence of unauthorized system prompt leakage and unauthorized model fine-tuning.',
    governingStandards: ['OWASP LLM02', 'SANS AI IR (Detection AML.T0040)', 'ISO 42001 A.6.4'],
    recommendedAction:
      'Inject rotating SHA-256 canary strings into system prompt headers and monitor outbound proxy streams for immediate automated session termination upon detection.',
  },
  {
    id: 'zero-trust-ai',
    term: 'Zero-Trust Architecture for AI (ZTA-AI)',
    acronym: 'ZTA-AI',
    category: 'Architecture & Engineering',
    definition:
      'An enterprise security strategy that applies zero-trust principles to AI components: never trust any model output or user prompt implicitly, verify every agent call, enforce granular token isolation, require short-lived cryptographic credentials, and isolate model inference in micro-segmented containers.',
    relevance:
      'Stops lateral movement if an attacker succeeds in executing a prompt injection or compromising an external API tool connector.',
    governingStandards: ['NIST SP 800-207', 'ISO/IEC 42001 (A.7.1)', 'SANS AI IR (Containment)'],
    recommendedAction:
      'Isolate all LLM workers in locked VPCs with no raw internet access, enforce mutual TLS (mTLS) across microservices, and terminate ephemeral tokens upon query completion.',
  },
  {
    id: 'explainability',
    term: 'Explainability & Interpretability (XAI)',
    acronym: 'XAI',
    category: 'Assurance, Audit & Testing',
    definition:
      'Techniques and algorithms (e.g., SHAP values, Integrated Gradients, attention weight maps, chain-of-thought traces) that enable engineers, auditors, and end users to comprehend the rationale, feature weightings, and computational steps behind an AI model’s output.',
    relevance:
      'Required by law for high-stakes AI applications in credit scoring, employment screening, criminal justice, and healthcare under the EU AI Act and ISO 42001 Clause 7.2.',
    governingStandards: ['ISO/IEC 42001 (A.5.3)', 'NIST AI RMF (Explainable & Interpretable)'],
    recommendedAction:
      'Log feature importance distributions and reasoning chain traces for all audited inferences, and provide human-readable justification summaries in customer dispute workflows.',
  },
  {
    id: 'adversarial-robustness',
    term: 'Adversarial Robustness & Evasion Defense',
    category: 'Technical Defenses & Mitigations',
    definition:
      'The degree to which an AI system maintains its intended accuracy, safe behavior, and performance when subjected to intentional adversarial perturbations, character swaps, homoglyphs, or gradient-based noise attacks.',
    relevance:
      'Determines whether self-driving vision systems, malware classifiers, or LLM content moderation filters will fail catastrophically when probed by sophisticated adversaries.',
    governingStandards: ['NIST AI RMF (Measure 2.6)', 'ISO/IEC 42001 (A.7.2)', 'MITRE ATLAS'],
    recommendedAction:
      'Perform adversarial training using perturbed dataset augmentations, normalize Unicode characters at ingress, and enforce ensemble voting across diversified model checkpoints.',
  },
  {
    id: 'data-provenance',
    term: 'Data Lineage & Provenance Tracking',
    category: 'Architecture & Engineering',
    definition:
      'A verifiable audit trail recording the origin, transformation history, curation methods, licensing terms, consent records, and access modifications of all datasets ingested into machine learning pipelines.',
    relevance:
      'Permits forensic auditing if training data is found to contain copyrighted code, unlawful PII, or poisoned backdoors, enabling precise data-unlearning or targeted retraining.',
    governingStandards: ['ISO/IEC 42001 (A.6.1)', 'NIST AI RMF (Map 1.5)', 'IRGC Phase 2'],
    recommendedAction:
      'Maintain an automated immutable data registry (e.g. Git-LFS, DVC) recording cryptographically hashed checkpoints for raw, cleaned, and tokenized datasets.',
  },
  {
    id: 'model-rollback',
    term: 'Model Rollback & Algorithmic Kill-Switch',
    category: 'Technical Defenses & Mitigations',
    definition:
      'Emergency containment mechanisms allowing security and operations teams to immediately disconnect an autonomous AI system, revoke agent tool-calling privileges, flush contaminated vector caches, or revert to a known-safe static checkpoint in seconds.',
    relevance:
      'The ultimate safeguard during active AI security incidents or runaway agent feedback loops.',
    governingStandards: ['SANS AI IR (Containment AML.M0010)', 'ISO/IEC 42001 (A.10.1)', 'NIST AI RMF (Manage 3.2)'],
    recommendedAction:
      'Architect a hardware or software kill switch integrated into incident response SOAR playbooks capable of severing LLM outbound network egress within 10 seconds.',
  },
  {
    id: 'algorithmic-bias',
    term: 'Algorithmic Bias & Disparate Impact',
    category: 'Assurance, Audit & Testing',
    definition:
      'Systematic and repeatable errors in an AI system that generate unfair, discriminatory, or prejudiced outcomes favoring or disfavoring individuals based on protected characteristics such as race, gender, age, disability, or religion.',
    relevance:
      'Breaches international civil rights statutes, labor laws, and triggers regulatory sanctions under federal and international compliance frameworks.',
    governingStandards: ['NIST AI RMF (Fair with Harmful Bias Managed)', 'ISO/IEC 42001 (A.5.4)', 'IRGC Phase 3'],
    recommendedAction:
      'Execute pre-deployment demographic parity and equalized odds testing across sub-populations, calculating the 80% four-fifths rule threshold for all automated decisions.',
  },
];

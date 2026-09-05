import { StandardId } from '../types';

export const RAW_MARKDOWN_DOCS: Record<StandardId, string> = {
  'iso-42001': `# ISO/IEC 42001:2023 - Artificial Intelligence Management System (AIMS)
## Comprehensive Compliance Standard, Clauses & Technical Controls Guide

**Standard Identification:** ISO/IEC 42001:2023  
**Title:** Information technology — Artificial intelligence — Management system  
**Target Audience:** Chief Information Security Officers (CISOs), AI Ethics Officers, Compliance Directors, ML Engineers, and Enterprise Architects  
**Publication Status:** International Standard Published (December 2023)  
**Classification:** High-Assurance AI Security and Governance Baseline

---

## Executive Summary & Organizational Objectives

ISO/IEC 42001 is the world's first certifiable international standard establishing requirements for establishing, implementing, maintaining, and continually improving an Artificial Intelligence Management System (AIMS). Unlike traditional IT standards (e.g., ISO/IEC 27001), ISO/IEC 42001 addresses the non-deterministic, probabilistic, evolving, and autonomous nature of AI and Machine Learning systems.

This document establishes the end-to-end framework necessary for an enterprise to achieve certified organizational alignment, covering both the core management clauses (Clauses 4 through 10) and the exhaustive technical control objectives defined in Annex A (Controls A.2 through A.10), supplemented by Annex B implementation guidance.

---

## PART 1: Core Management Clauses (Clauses 4 – 10)

### Clause 4: Context of the Organization

#### 4.1 Understanding the Organization and Its Context
- **Requirement:** The organization must determine external and internal issues that affect its ability to achieve the intended outcome(s) of its AIMS.
- **AI-Specific Context Factors:** Technological volatility, legal landscape (EU AI Act, US EO 14110), supply chain dependencies.
- **Implementation Artifact:** *Organizational Context Register for AI (Document ID: AIMS-CTX-001)* reviewed bi-annually.

#### 4.2 Understanding the Needs and Expectations of Interested Parties
- **Interested Parties:** Data subjects, end users, customers, regulatory authorities, third-party model providers, shareholders.
- **Implementation Artifact:** *AI Stakeholder Requirements & Compliance Matrix (Document ID: AIMS-STK-002)*.

#### 4.3 Determining the Scope of the AI Management System
- **Boundary Formulation:** Scope must encompass in-house trained models, fine-tuned/RAG adaptations, and external third-party AI APIs.

#### 4.4 AI Management System
- **Mandate:** Operate the AIMS following the continuous Plan-Do-Check-Act (PDCA) cycle.

### Clause 5: Leadership and Commitment

#### 5.1 Leadership and Commitment
- Top management allocates dedicated budget and computational/human resources, champions an ethical AI culture, and guarantees non-retaliation for reporting algorithmic risks.

#### 5.2 AI Policy
- Mandatory policy defining permissible use cases, prohibited applications (e.g., unconstrained biometric surveillance), and human agency preservation.

#### 5.3 Organizational Roles, Responsibilities, and Authorities
- Formal governance RACI appointing Chief AI Officer (CAIO), ML SecOps Engineers, Data Stewards, and AI Ethics Committee with veto authority.

### Clause 6: Planning

#### 6.1 Actions to Address Risks and Opportunities
- **6.1.2 AI Risk Assessment Process:** Repeatable process considering threats unique to AI (prompt injection, model drift, hallucination, data poisoning).
- **6.1.3 AI Risk Treatment Process:** Formulate Risk Treatment Plan (RTP) and Statement of Applicability (SoA) covering Annex A.
- **6.1.4 AI System Impact Assessment (AI SIA):** Structured assessments evaluating potential harm to fundamental human rights, health, privacy, and environmental sustainability.

#### 6.2 AI Objectives and Planning to Achieve Them
- Measurable, monitored targets (e.g., adversarial prompt bypass rate below 0.05%).

#### 6.3 Planning of Changes
- Change governance for model architecture, training corpora, fine-tuning methodologies, and operational context.

### Clause 7: Support
- **7.1 Resources:** Isolated compute clusters, secure enclaves, synthetic data pipelines, evaluation harnesses.
- **7.2 Competence & 7.3 Awareness:** Training on prompt injection, bias detection, and ethical boundaries.
- **7.4 Communication & 7.5 Documented Information:** Model cards, system architecture, dataset datasheets, training logs, and audit trails.

### Clause 8: Operation
- **8.1 Operational Planning & Control:** Enforce MLOps stage-gates and third-party model vetting.
- **8.2 - 8.4 Operational AI Risk & Impact Assessment:** Continuous re-evaluation during production runtime.

### Clause 9: Performance Evaluation
- **9.1 Monitoring & Measurement:** Continuous tracking of drift (KS-test), toxicity, latency, token velocity, and fairness metrics.
- **9.2 Internal Audit:** Independent audits at least annually against ISO 42001 requirements.
- **9.3 Management Review:** Executive reviews evaluating audit findings, resource allocations, and emerging threats.

### Clause 10: Improvement
- **10.1 Continual Improvement:** Iterative tuning of guardrails, benchmarks, and data pipelines.
- **10.2 Nonconformity & Corrective Action:** Incident containment protocol, model fallback triggers, circuit breaker activation, and root-cause logging.

---

## PART 2: Annex A Technical Controls (A.2 through A.10)

- **A.2 Policies Related to AI:** A.2.1 AI Policy; A.2.2 Alignment with ISO 27001, 27701, and 31000.
- **A.3 Internal Organization:** A.3.1 Roles and responsibilities; A.3.2 Reporting of AI concerns & whistleblowing.
- **A.4 Resources for AI Systems:** A.4.1 Infrastructure isolation; A.4.2 Tooling and CVE scanning for ML compilers & vector stores.
- **A.5 Assessing Impacts:** A.5.1 AI impact assessment process; A.5.2 Assessment of impact on individuals and society.
- **A.6 AI System Life Cycle:** A.6.1-A.6.6: Stage gates for Requirements, Development, Verification, Deployment, Monitoring, and Decommissioning.
- **A.7 Data for AI Systems:** A.7.1 Data acquisition & scrape consent; A.7.2 Data quality; A.7.3 Lineage (DVC/MLflow); A.7.4 PII scrubbing & Differential Privacy.
- **A.8 Transparency & Information:** A.8.1 Model Cards; A.8.2 User notification of AI interaction; A.8.3 External reporting.
- **A.9 Use of AI Systems:** A.9.1 Acceptable use policies; A.9.2 Human oversight (HITL/HOTL); A.9.3 Prevention of unintended use via runtime guardrails.
- **A.10 Third-Party Relationships:** A.10.1 Supplier management for Foundation Model Providers; A.10.2 Customer responsibilities and SLAs.`,

  'owasp-llm': `# OWASP Top 10 for Large Language Model (LLM) Applications
## Comprehensive Security Risks, Attack Vectors, and Mitigation Strategies

**Standard Identification:** OWASP Top 10 for LLM Applications (2025 Edition)  
**Maintained by:** Open Web Application Security Project (OWASP) Foundation  
**Classification:** Foundational Application Security Standard for AI & Generative Workloads

---

## Executive Overview

Generative AI and Large Language Models introduce security risks that surpass traditional application vulnerabilities. Because LLMs parse natural language prompts as both instructions and control flow, boundary confusion creates severe attack surfaces.

---

## The OWASP Top 10 LLM Risks & Mitigations

### LLM01: Prompt Injection (Direct & Indirect)
- **Mechanism:** Adversarial user inputs manipulate the LLM instruction stream, overriding system guardrails.
- **Attack Vectors:** Direct jailbreaks (simulation framing, delimiter escapes), indirect injection via poisoned websites or RAG context chunks.
- **Mitigations:**
  1. Strict input/output demarcation using cryptographic nonces in tags.
  2. Dual-LLM guardrail architecture routing raw inputs to a classifier model (Llama Guard).
  3. Principle of least privilege for autonomous agent tool execution.

### LLM02: Sensitive Information Disclosure
- **Mechanism:** Inadvertent revelation of confidential PII, proprietary code, or system credentials through training memorization or unfiltered RAG context.
- **Mitigations:**
  1. Automated pre-inference PII scrubbing (Microsoft Presidio).
  2. Role-based vector database metadata filtering.
  3. Differential Privacy (DP-SGD) during model fine-tuning.

### LLM03: Supply Chain Vulnerabilities
- **Mechanism:** Compromised foundation model weights, backdoored checkpoints, poisoned plugins, or arbitrary code execution via Python pickle files.
- **Mitigations:**
  1. Ban raw pickle (.pt, .bin) weights; mandate SafeTensors (.safetensors).
  2. Generate CycloneDX ML-SBOMs for all models and datasets.
  3. Verify cryptographic SHA-256 signatures against verified vendor registries.

### LLM04: Data and Model Poisoning
- **Mechanism:** Compromising pre-training, fine-tuning, or RLHF human feedback datasets to install backdoors or induce bias.
- **Mitigations:**
  1. Cryptographic data lineage tracking using DVC or MLflow.
  2. Anomaly detection in latent embedding spaces.
  3. Continuous testing against immutable golden validation sets.

### LLM05: Improper Output Handling
- **Mechanism:** Downstream systems (browsers, shell interpreters, SQL databases) blindly executing LLM output without sanitization.
- **Mitigations:**
  1. Treat LLM output as untrusted input; apply context-aware HTML encoding (DOMPurify).
  2. Execute generated code exclusively inside isolated microVM sandboxes (gVisor/WASM).
  3. Use parameterized queries for database interactions.

### LLM06: Excessive Agency
- **Mechanism:** Autonomous agents granted unrestrained tool access, excessive permissions, or unsupervised execution over external APIs.
- **Mitigations:**
  1. Mandatory Human-in-the-Loop (HITL) gates for state-altering actions (deletions, financial transactions).
  2. Granular least-privilege OAuth scopes.
  3. Step budgets and execution timeouts to prevent runaway loops.

### LLM07: System Prompt Leakage
- **Mechanism:** Adversaries extracting confidential system instructions, guardrail architecture, and proprietary business logic.
- **Mitigations:**
  1. Never store secrets, passwords, or customer PII in system prompts.
  2. Deploy output similarity guardrails to block prompt echoing.
  3. Synthesize dynamic, minimal task prompts instead of static monolithic prompts.

### LLM08: Vector and Embedding Weaknesses
- **Mechanism:** Exploitation of vector databases and embedding pipelines permitting semantic cloaking or embedding inversion.
- **Mitigations:**
  1. Enforce user-tenant metadata authorization filtering on all vector queries.
  2. Encrypt vector dimensions at rest (AES-256) and in transit (mTLS).
  3. Alert on anomalous semantic distance shifts or sudden bulk upserts.

### LLM09: Misinformation & Hallucination
- **Mechanism:** Generation of factually false, ungrounded, or fabricated information presented with high linguistic confidence.
- **Mitigations:**
  1. Strict RAG grounding with source citations; set temperature = 0.0.
  2. Deterministic post-generation verification for cited URLs, statutes, or package names.
  3. Refusal logic when semantic confidence drops below defined thresholds.

### LLM10: Unbounded Consumption (Denial of Service)
- **Mechanism:** Resource exhaustion of GPU compute, context tokens, or API budget causing denial of service or financial explosion.
- **Mitigations:**
  1. Strict input and output token caps per request and per user account.
  2. Inference timeouts (max 15 seconds) and circuit breakers.
  3. Real-time billing monitors to automatically throttle suspicious key usage.`,

  'irgc-governance': `# International Risk Governance Center (IRGC) AI Framework
## Risk Governance Architecture, Implementation Details, and Oversight Procedures

**Framework Identification:** IRGC Risk Governance Framework for Artificial Intelligence  
**Authoring Body:** International Risk Governance Center (EPFL, Lausanne, Switzerland)  
**Classification:** Systemic, Emerging & High-Uncertainty AI Risk Governance Standard

---

## Executive Summary

The IRGC framework is engineered for non-linear, adaptive, probabilistic, and socio-technical technologies like Artificial Intelligence. It structures AI risk governance into four distinct phases connected by a continuous cross-cutting core of **Stakeholder Engagement**, **Communication**, and **Oversight Procedures**.

---

## The Four Core Phases

### Phase 1: Pre-Estimation (Framing, Scoping, and Early Warning)
- Problem framing, system boundary formulation, and dual-use potential analysis.
- Weak signal detection and proactive regulatory horizon scanning.
- Formal deliverable: *Pre-Estimation AI Charter (IRGC-PE-01)*.

### Phase 2: Interdisciplinary Risk Appraisal
- **Scientific Risk Assessment:** Quantitative evaluation of prompt injection vulnerability, out-of-distribution robustness, systemic interdependencies, and bias metrics.
- **Concern Assessment:** Evaluation of public trust, ethical impacts, fundamental human rights, and socio-economic workforce disruptions.

### Phase 3: Risk Characterization and Evaluation
- **Simple Risks:** Deterministic hazards managed by Standard Operating Procedures (SOPs).
- **Complex Risks:** High systemic interdependencies managed via extensive simulation and red teaming.
- **Uncertain Risks:** Stochastic, non-deterministic behaviors managed by precautionary circuit breakers and low autonomy.
- **Ambiguous Risks:** Competing ethical values managed via multi-stakeholder discourse and external ethics boards.
- **Tolerability Decision:** Classify system as *Acceptable*, *Tolerable with Mitigation (ALARP)*, or *Intolerable*.

### Phase 4: Risk Management Implementation
- **Risk Prevention:** Prohibit deployment of unconstrained or high-risk tasks.
- **Risk Mitigation:** Enforce technical guardrails (NeMo, Llama Guard), Human-in-the-Loop gates, and PII filters.
- **Risk Adaptation:** Real-time drift detection and automated rollback engines.
- **Risk Transfer:** Contractual indemnification and cyber/AI insurance.

---

## Cross-Cutting Oversight Procedures
- Multidisciplinary AI Oversight Governance Board with unilateral veto authority held by CISO and Ethics Officer.
- Enterprise RACI matrix assigning clear operational accountability.
- Continuous post-market audit with annual recertification.`,

  'sans-ir': `# SANS AI Incident Response & Threat Intelligence Framework
## Comprehensive Operational Playbooks, 6-Phase IR Lifecycle, and MITRE ATLAS Threat Intel Integration

**Standard Identification:** SANS Incident Response Lifecycle Adapted for Artificial Intelligence & LLMs  
**Derived From:** SANS Institute PICERL Model (Preparation, Identification, Containment, Eradication, Recovery, Lessons Learned)  
**Threat Intel Standard:** MITRE ATLAS (Adversarial Threat Landscape for AI Systems)

---

## Executive Summary

This standard operationalizes incident response for AI and LLM workloads by mapping the battle-tested **SANS 6-Phase IR Lifecycle (PICERL)** to AI-specific threat surfaces, fully integrated with **MITRE ATLAS** threat intelligence.

---

## The 6-Phase AI Incident Response Lifecycle

### Phase 1: Preparation
- Maintain a model zoo inventory and vector store registry indexed by cryptographic SHA-256 hashes.
- Enforce immutable WORM inference logging capturing inputs, outputs, system prompts, and classifier scores.
- Ingest real-time MITRE ATLAS tactics and STIX 2.1 threat feeds from AI-ISAC.

### Phase 2: Identification
- Detect adversarial prompt injection attempts (AML.T0054), model extraction probes (AML.T0024), and poisoned vector chunks (AML.T0018).
- Classify incident severity from Level 1 (Critical: autonomous agent hijack, RCE) to Level 4 (Low: blocked perimeter jailbreak).

### Phase 3: Containment
- Trigger automated API gateway circuit breakers switching traffic to deterministic fallback models.
- Immediately revoke ephemeral agent OAuth tokens to terminate unauthorized tool execution.
- Freeze target vector databases into read-only mode to prevent poisoned embedding propagation.

### Phase 4: Eradication
- Purge tainted vector embeddings and invalidate semantic prompt caches.
- Terminate compromised model container pods and redeploy verified SafeTensors images.
- Hardened boundary delimiters and update classifier guardrails with adversarial signatures.

### Phase 5: Recovery
- Execute automated regression testing (1,000+ jailbreak probes using Garak/PyRIT).
- Validate factual accuracy on golden benchmark datasets.
- Execute canary staged deployment (2% canary -> 25% staging -> 100% full production).

### Phase 6: Lessons Learned & Threat Intel Sharing
- Conduct formal Post-Incident Review (PIR) analyzing MTTD, MTTC, and MTTR.
- Satisfy regulatory incident disclosure mandates (e.g., EU AI Act Article 73 within 72 hours).
- Codify attack techniques into MITRE ATLAS TTPs and share sanitized IoCs with industry ISACs.`,

  'nist-ai-rmf': `# NIST Artificial Intelligence Risk Management Framework (AI RMF 1.0)
## Foundational AI Risk Management Functions, Trustworthiness Characteristics, and Technical Security Controls

**Standard Identification:** NIST AI 100-1 (NIST AI RMF 1.0)  
**Authoring Body:** National Institute of Standards and Technology (U.S. Department of Commerce)

---

## Executive Overview

The NIST AI Risk Management Framework (AI RMF 1.0) provides organizations with a structured, measurable approach to managing risks and cultivating trust across the full AI lifecycle.

---

## Seven Characteristics of Trustworthy AI
1. **Valid and Reliable:** Consistent accuracy and robustness under defined conditions.
2. **Safe:** Preventing physical, psychological, financial, or environmental harm.
3. **Secure and Resilient:** Defending against adversarial attacks (prompt injection, poisoning, evasion).
4. **Accountable and Transparent:** Clear governance ownership and open disclosures of system capabilities.
5. **Explainable and Interpretable:** Comprehensible insights into algorithmic decision logic.
6. **Privacy-Enhanced:** Enforcing data minimization, privacy rights, and differential privacy.
7. **Fair with Harmful Bias Managed:** Systematic elimination of disparate impact and algorithmic bias.

---

## The Four Core Functions

### 1. GOVERN (GV)
- **GV-1 to GV-6:** Formulate enterprise AI risk policies, establish AI Governance Council with veto authority, mandate technical workforce competence training, foster psychological safety for reporting flaws, and manage third-party vendor risks.

### 2. MAP (MP)
- **MP-1 to MP-6:** Frame operational context and use cases, categorize model tiers, document system boundaries and limitations in System Cards, conduct human rights impact assessments, and map supply-chain dependencies via ML-SBOM.

### 3. MEASURE (MS)
- **MS-1 to MS-4:** Deploy domain-specific metric suites (toxicity, drift, fairness), execute independent adversarial red teaming (Garak, PyRIT), integrate continuous user feedback loops, and maintain real-time observability telemetry.

### 4. MANAGE (MN)
- **MN-1 to MN-4:** Prioritize and treat identified risks (Accept, Avoid, Mitigate, Transfer), implement multi-layered technical guardrails (HITL gates, input sanitization), manage third-party provider dependencies, and monitor residual risks via automated circuit breakers.

---

## NIST SP 800-53 Control Mapping
- **Policy & Architecture:** PL-8 (AI Security Architecture), SR-3 (Supply Chain Risk Controls).
- **Verification & Testing:** CA-8 (AI Penetration Testing / Red Teaming), SI-4 (Inference Stream Monitoring).
- **Access & Contingency:** AC-3 (Vector DB Metadata Authorization), CP-2 (Contingency Fallback Models).`
};

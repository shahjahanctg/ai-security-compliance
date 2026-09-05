# NIST Artificial Intelligence Risk Management Framework (AI RMF 1.0)
## Foundational AI Risk Management Functions, Trustworthiness Characteristics, and Technical Security Controls

**Standard Identification:** NIST AI 100-1 (NIST AI RMF 1.0)  
**Authoring Body:** National Institute of Standards and Technology (U.S. Department of Commerce)  
**Classification:** Foundational Federal & Enterprise AI Risk Management Standard  
**Companion Publications:** NIST SP 1270 (Managing Bias in AI), NIST SP 800-53 Rev. 5, NIST Cybersecurity Framework (CSF) 2.0  
**Target Audience:** Enterprise Risk Officers, CISOs, AI Compliance Directors, Data Scientists, and System Evaluators

---

## Executive Overview

The NIST AI Risk Management Framework (AI RMF 1.0) provides organizations with a structured, repeatable, and measurable approach to designing, developing, deploying, and evaluating trustworthy Artificial Intelligence systems. 

Because AI systems can produce non-intuitive, emergent, and non-deterministic outcomes, the AI RMF expands traditional cybersecurity risk management into socio-technical dimensions, ensuring systems are safe, secure, resilient, accountable, transparent, explainable, privacy-preserving, and fair.

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                          NIST AI RMF FOUR CORE FUNCTIONS                               │
├────────────────────────────────────────────────────────────────────────────────────────┤
│                                       GOVERN                                           │
│         Cultivate and sustain a risk management culture, structures, and policies      │
├────────────────────────────┬────────────────────────────┬──────────────────────────────┤
│            MAP             │          MEASURE           │           MANAGE             │
│   Context, categorization, │  Quantitative/qualitative  │ Prioritize, treat, mitigate, │
│   capabilities & impacts   │  metrics, TEVV & testing   │ and continuously track risks │
└────────────────────────────┴────────────────────────────┴──────────────────────────────┘
```

---

## The Seven Characteristics of Trustworthy AI

Under the NIST framework, AI risk management is defined by cultivating and verifying seven interconnected trustworthiness characteristics throughout the AI lifecycle:

```
                  ┌──────────────────────────────────────────────────────┐
                  │          SEVEN CHARACTERISTICS OF TRUSTWORTHY AI     │
                  └──────────────────────────┬───────────────────────────┘
                                             │
         ┌───────────────────┬───────────────┴───────────────┬───────────────────┐
         ▼                   ▼                               ▼                   ▼
┌──────────────────┐┌──────────────────┐           ┌──────────────────┐┌──────────────────┐
│ Valid & Reliable ││ Safe & Secure    │           │ Accountable &    ││ Fair with Harmful│
│ Consistent,      ││ Robust against   │           │ Transparent      ││ Bias Managed     │
│ accurate, bounds ││ attack & hazards │           │ Open disclosures ││ Equitable impact │
└──────────────────┘└──────────────────┘           └──────────────────┘└──────────────────┘
         │                   │                               │                   │
         └───────────────────┼───────────────┬───────────────┴───────────────────┘
                             ▼               ▼
                    ┌──────────────────┐┌──────────────────┐
                    │ Explainable &    ││ Privacy-         │
                    │ Interpretable    ││ Enhanced         │
                    │ Understandable   ││ Minimization, DP,│
                    │ decision logic   ││ privacy rights   │
                    └──────────────────┘└──────────────────┘
```

1. **Valid and Reliable:** The system performs consistently as intended, meeting empirical accuracy benchmarks under expected operating conditions and handling out-of-distribution inputs predictably.
2. **Safe:** The AI system does not endanger human life, health, property, or the environment during normal operation or unintended edge cases.
3. **Secure and Resilient:** The system maintains operational integrity against adversarial manipulation (prompt injection, poisoning, evasion) and degrades gracefully under attack.
4. **Accountable and Transparent:** Clear organizational ownership of system behavior with transparent disclosure of AI capabilities, training sources, and decision rationales.
5. **Explainable and Interpretable:** Users and auditors can understand how the model reached a specific output, tailored to the technical sophistication of the recipient.
6. **Privacy-Enhanced:** Enforces data minimization, differential privacy, access controls, and respect for individual privacy rights during training, tuning, and inference.
7. **Fair with Harmful Bias Managed:** Systematic identification and mitigation of demographic, cognitive, and systemic biases across datasets, algorithms, and decision applications.

---

## The Four Core Functions and Technical Controls

### 1. GOVERN (GV): Foundational Governance & Accountability

The **GOVERN** function is cross-cutting and infuses risk management across all organizational levels and lifecycle phases.

| Sub-Category ID | Governance Requirement | Concrete Implementation & Verification Artifact |
|:---|:---|:---|
| **GV-1** | Policies, processes, procedures, and practices are in place and operationalized. | Formulate enterprise *AI Risk Management Policy (DOC-GV-01)* approved by the Board of Directors with annual review cadence. |
| **GV-2** | Accountability structures are established and maintained. | Establish formal RACI matrix appointing an AI Safety Officer and cross-functional AI Governance Council with veto power. |
| **GV-3** | Workforce diversity, equity, inclusion, and competence are prioritized. | Mandatory annual technical training on adversarial AI vulnerabilities, ethical evaluation, and prompt security for developers. |
| **GV-4** | Organizational culture embraces open risk communication. | Anonymous reporting channels for algorithmic failures, non-retaliation policy for reporting safety flaws. |
| **GV-5** | Stakeholder engagement is planned and executed. | Continuous consultation with impacted user groups, civil society, external domain experts, and regulatory bodies. |
| **GV-6** | Third-party risks are identified and managed. | Vendor risk management framework assessing foundation model providers (SLA guarantees, data retention, SOC 2 compliance). |

---

### 2. MAP (MP): Context, Categorization & Impact Identification

The **MAP** function frames the operational context, intended purpose, environmental constraints, and potential cascading risks of the AI system.

| Sub-Category ID | Mapping Requirement | Concrete Implementation & Verification Artifact |
|:---|:---|:---|
| **MP-1** | Context of the AI system is established and understood. | Document intended business problem, user personas, operational domain, and explicit out-of-scope non-permissible applications. |
| **MP-2** | AI system categorization is performed. | Classify model tier (e.g., Narrow ML vs. Frontier Multimodal LLM; autonomous agency vs. assistive recommendation). |
| **MP-3** | AI capabilities, targeted usage, and boundaries are documented. | Publish comprehensive *System Card* detailing supported inputs, output schemas, latency ceilings, and compute bounds. |
| **MP-4** | Specific risks, potential harms, and benefits are mapped. | Threat modeling session identifying direct, indirect, and adversarial risks mapped to MITRE ATLAS techniques. |
| **MP-5** | Societal and individual impacts are identified. | Conduct structured *Human Rights & Algorithmic Impact Assessment* quantifying risks to privacy, civil liberties, and equity. |
| **MP-6** | Upstream and downstream dependencies are mapped. | Generate a complete *Machine Learning Software Bill of Materials (ML-SBOM)* tracking model weights, base datasets, and APIs. |

---

### 3. MEASURE (MS): Testing, Evaluation, Verification, and Validation (TEVV)

The **MEASURE** function employs quantitative metrics, qualitative assessments, and empirical stress testing to evaluate trustworthiness characteristics.

| Sub-Category ID | Measurement Requirement | Concrete Implementation & Verification Artifact |
|:---|:---|:---|
| **MS-1** | Appropriate measurement methods and metrics are identified. | Select domain-specific metric suites: BLEU/ROUGE for text, Toxicity scores, KS-drift tests, and Disparate Impact ratios. |
| **MS-2** | AI systems are evaluated for trustworthiness characteristics. | Execute independent adversarial red teaming (e.g., PyRIT, Garak) testing prompt injection, jailbreak resistance, and extraction. |
| **MS-3** | Feedback mechanisms are integrated into continuous measurement. | Collect real-world user feedback (thumbs up/down, user flags) feeding automated drift detection and quality telemetry. |
| **MS-4** | Measurement results are documented, tracked, and communicated. | Real-time observability dashboard displaying latency, safety score distributions, drift metrics, and evaluation summaries. |

---

### 4. MANAGE (MN): Risk Prioritization, Mitigation, and Monitoring

The **MANAGE** function allocates resources to prioritize, treat, mitigate, and continuously manage the risks identified during MAP and MEASURE.

| Sub-Category ID | Management Requirement | Concrete Implementation & Verification Artifact |
|:---|:---|:---|
| **MN-1** | AI risks are prioritized and addressed based on risk assessments. | Risk treatment plans categorizing identified hazards into Accept, Avoid, Mitigate, or Transfer with assigned remediation owners. |
| **MN-2** | Mitigation strategies are implemented and validated. | Deploy multi-layered technical guardrails: input sanitizers, output safety filters, context demarcation, and HITL gates. |
| **MN-3** | Third-party AI risks are managed throughout operations. | Enforce contractual data privacy terms, automated API uptime monitoring, and failover routing across model providers. |
| **MN-4** | Residual risks and emerging vulnerabilities are monitored. | Continuous post-deployment monitoring with automated circuit breakers that kill inference upon anomaly threshold breach. |

---

## Technical Security Controls Mapping (NIST AI RMF to NIST SP 800-53 Rev. 5)

Organizations operating in federal or regulated enterprise environments must align AI RMF functions with NIST SP 800-53 security controls:

| AI RMF Function | SP 800-53 Control Family | Specific Control ID & AI Implementation |
|:---|:---|:---|
| **GOVERN** | Policy & Procedures (PL, PS) | **PL-8 (Information Security Architecture):** Documenting AI model boundaries and guardrail architecture. |
| **GOVERN** | Supply Chain Risk (SR) | **SR-3 (Supply Chain Controls):** Verification of foundational model weights and training datasets. |
| **MAP** | System & Services Acquisition (SA) | **SA-4 (Acquisition):** Contractual validation of model provenance and third-party API data isolation. |
| **MEASURE** | Assessment & Monitoring (CA, SI) | **CA-8 (Penetration Testing):** Specialized AI red teaming testing prompt injection and model extraction. |
| **MEASURE** | System & Information Integrity (SI) | **SI-4 (Information System Monitoring):** Inference stream monitoring for anomalous token rates and data drift. |
| **MANAGE** | Access Control (AC) | **AC-3 (Access Enforcement):** Row-level metadata authorization filtering on vector database retrievals. |
| **MANAGE** | Contingency Planning (CP) | **CP-2 (Contingency Plan):** Deterministic fallback engines and model rollback protocols during adversarial disruption. |

---

## NIST AI RMF Organizational Maturity Profiles

Organizations can benchmark their AI risk management posture across four progressive tiers:

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                        NIST AI RMF ORGANIZATIONAL MATURITY TIERS                       │
├────────────────────┬────────────────────┬────────────────────┬─────────────────────────┤
│ Tier 1: Partial    │ Tier 2: Risk-Inform│ Tier 3: Repeatable │ Tier 4: Adaptive        │
│ Ad-hoc testing, no │ Formal awareness,  │ Organization-wide  │ Continuous automated    │
│ formal AI policy,  │ reactive controls, │ standards, TEVV    │ guardrails, real-time   │
│ siloed engineering │ partial telemetry  │ stage-gates, AIMS  │ telemetry, active red-team│
└────────────────────┴────────────────────┴────────────────────┴─────────────────────────┘
```

- **Tier 1 (Partial):** AI risks are addressed informally on a project-by-project basis. Lack of formal AI policies, absence of adversarial red teaming, and undocumented data lineage.
- **Tier 2 (Risk-Informed):** Management approves risk-awareness practices. Policies exist but are not systematically enforced across all departments; manual testing prior to launch.
- **Tier 3 (Repeatable):** Comprehensive AIMS policies consistently applied. Automated TEVV pipelines integrated into CI/CD, formal AI Governance Council, comprehensive model cards.
- **Tier 4 (Adaptive):** Real-time automated guardrails, continuous red teaming, dynamic risk adjustments, proactive threat intelligence ingestion (MITRE ATLAS), and active industry sharing.

---
*Document Version: 1.0.0 | NIST AI Risk Management Framework (AI RMF 1.0) Reference*

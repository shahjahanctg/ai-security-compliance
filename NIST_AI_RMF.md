# NIST Artificial Intelligence Risk Management Framework (AI RMF 1.0)
## Foundational AI Risk Management Functions, Trustworthiness Characteristics, and Technical Security Controls

*Note: The canonical documentation file is also available at `/docs/NIST_AI_RMF_RISK_MANAGEMENT.md`.*

**Standard Identification:** NIST AI 100-1 (NIST AI RMF 1.0)  
**Authoring Body:** National Institute of Standards and Technology (U.S. Department of Commerce)  
**Classification:** Foundational Federal & Enterprise AI Risk Management Standard  
**Target Audience:** Enterprise Risk Officers, CISOs, AI Compliance Directors, Data Scientists, and System Evaluators

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
- **MS-1 to MS-4:** Deploy domain-specific metrics (toxicity, drift, fairness), execute independent adversarial red teaming (Garak, PyRIT), integrate continuous user feedback loops, and maintain real-time observability telemetry.

### 4. MANAGE (MN)
- **MN-1 to MN-4:** Prioritize and treat identified risks (Accept, Avoid, Mitigate, Transfer), implement multi-layered technical guardrails (HITL gates, input sanitization), manage third-party provider dependencies, and monitor residual risks via automated circuit breakers.

---

## NIST SP 800-53 Control Mapping
- **Policy & Architecture:** PL-8 (AI Security Architecture), SR-3 (Supply Chain Risk Controls).
- **Verification & Testing:** CA-8 (AI Penetration Testing / Red Teaming), SI-4 (Inference Stream Monitoring).
- **Access & Contingency:** AC-3 (Vector DB Metadata Authorization), CP-2 (Contingency Fallback Models).

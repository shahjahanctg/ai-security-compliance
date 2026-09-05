# SANS AI Incident Response & Threat Intelligence Framework
## Comprehensive Operational Playbooks, 6-Phase IR Lifecycle, and MITRE ATLAS Threat Intel Integration

*Note: The canonical documentation file is also available at `/docs/SANS_AI_INCIDENT_RESPONSE.md`.*

**Standard Identification:** SANS Incident Response Lifecycle Adapted for Artificial Intelligence & LLMs  
**Derived From:** SANS Institute PICERL Model (Preparation, Identification, Containment, Eradication, Recovery, Lessons Learned)  
**Threat Intel Standard:** MITRE ATLAS (Adversarial Threat Landscape for AI Systems)  
**Target Audience:** Security Operations Center (SOC) Leads, Incident Response Commanders, Threat Intelligence Analysts, and ML SecOps Engineers

---

## Executive Summary

This standard operationalizes incident response for AI and LLM workloads by mapping the battle-tested **SANS 6-Phase IR Lifecycle (PICERL)** to AI-specific threat surfaces, fully integrated with **MITRE ATLAS** threat intelligence.

---

## The 6-Phase AI Incident Response Lifecycle

### Phase 1: Preparation
- Maintain a model zoo inventory and vector store registry indexed by cryptographic hashes.
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
- Execute canary staged deployment (2% canary ➔ 25% staging ➔ 100% full production).

### Phase 6: Lessons Learned & Threat Intel Sharing
- Conduct formal Post-Incident Review (PIR) analyzing MTTD, MTTC, and MTTR.
- Satisfy regulatory incident disclosure mandates (e.g., EU AI Act Article 73 within 72 hours).
- Codify attack techniques into MITRE ATLAS TTPs and share sanitized IoCs with industry ISACs.

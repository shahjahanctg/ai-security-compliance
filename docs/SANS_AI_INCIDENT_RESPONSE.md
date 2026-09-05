# SANS AI Incident Response & Threat Intelligence Framework
## Comprehensive Operational Playbooks, 6-Phase IR Lifecycle, and MITRE ATLAS Threat Intel Integration

**Standard Identification:** SANS Incident Response Lifecycle Adapted for Artificial Intelligence & LLMs  
**Derived From:** SANS Institute PICERL Model (Preparation, Identification, Containment, Eradication, Recovery, Lessons Learned)  
**Threat Intel Standard:** MITRE ATLAS (Adversarial Threat Landscape for AI Systems)  
**Target Audience:** Security Operations Center (SOC) Leads, Incident Response Commanders, Threat Intelligence Analysts, and ML SecOps Engineers

---

## Executive Summary

Traditional incident response playbooks focus on host compromises, network malware beacons, and perimeter firewalls. However, Artificial Intelligence and Large Language Model (LLM) architectures operate on probabilistic token prediction, natural language instruction execution, latent space vector retrievals, and autonomous tool calling. 

This standard adapts the battle-tested **SANS 6-Phase Incident Response Model (PICERL)** to AI-specific threat topologies while integrating real-time **Cyber Threat Intelligence (CTI)** via the **MITRE ATLAS** framework.

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                        SANS AI INCIDENT RESPONSE LIFECYCLE (PICERL)                    │
├───────────────┬───────────────┬───────────────┬───────────────┬───────────────┬────────┤
│ 1. PREPARATION│ 2. IDENTIFY   │ 3. CONTAIN    │ 4. ERADICATE  │ 5. RECOVERY   │ 6. POST│
│ Asset Catalog │ Prompt Probe  │ Model Fallback│ Data Purge    │ Canary Deploy │ Lessons│
│ MITRE ATLAS   │ Vector Drift  │ Kill-Switches │ Weight Patch  │ Retraining    │ Learned│
│ CTI Ingestion │ Agent Exfil   │ Quota Clamp   │ Prompt Seal   │ Verification  │ Metrics│
└───────────────┴───────────────┴───────────────┴───────────────┴───────────────┴────────┘
```

---

## PHASE 1: Preparation (AI-Specific Readiness & Hardening)

Preparation establishes the baseline telemetry, cryptographic identity, tooling, and threat intelligence ingestion needed before an adversarial strike occurs.

### 1.1 AI Asset Inventory & Architecture Mapping
- **Model Zoo Catalog:** Maintain a centralized inventory of all foundation models, fine-tuned checkpoints, quantized variants, and third-party API endpoints, indexed by SHA-256 hash and version.
- **RAG & Vector Knowledge Base Inventory:** Document all vector databases (e.g., Pinecone, Milvus, Qdrant), embedding models, and data ingestion pipelines.
- **Agent Tool Execution Catalog:** Document all external APIs, database connections, and shell execution capabilities granted to AI agents with associated privilege scopes.

### 1.2 AI Telemetry & Observability Pipeline
- **Immutable Inference Logging:** Log all raw user inputs, dynamic system prompts, retrieved RAG chunks, and model completions to an immutable, write-once-read-many (WORM) SIEM repository.
- **Token Velocity & Cost Telemetry:** Real-time stream analytics capturing tokens per second, prompt-to-completion ratios, and per-user cost velocity.
- **Semantic Guardrail Telemetry:** Logging all prompt safety classifier scores (e.g., toxicity, jailbreak probability, PII detection flags) to generate instant alerts.

### 1.3 Threat Intelligence Integration (MITRE ATLAS & STIX/TAXII)
- Integrate threat intelligence feeds tracking active adversarial campaigns targeting AI systems:
  - **MITRE ATLAS Matrix Ingestion:** Continuously map internal telemetry against ATLAS tactics (Reconnaissance, Resource Development, Initial Access, ML Attack Staging, Defense Evasion, Exfiltration).
  - **AI-ISAC & OpenCTI:** Subscribe to automated STIX 2.1 feeds containing known adversarial prompt injection signatures, malicious SafeTensors hashes, and poisoned data URLs.

---

## PHASE 2: Identification (Detection & Triage of AI Anomalies)

Identification detects deviations from normative model behavior, adversarial prompt injections, model extraction queries, or agent tool hijackings.

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                         AI INCIDENT DETECTION TAXONOMY                                 │
├──────────────────────────┬─────────────────────────────┬───────────────────────────────┤
│ Attack Category          │ Primary Detection Indicator │ Correlated ATLAS Tactic       │
├──────────────────────────┼─────────────────────────────┼───────────────────────────────┤
│ Jailbreak / Injection    │ High semantic distance in   │ AML.T0054 (LLM Prompt         │
│                          │ classifier; delimiter escape│ Injection)                    │
├──────────────────────────┼─────────────────────────────┼───────────────────────────────┤
│ Model Extraction / Steal │ Repetitive systematic query │ AML.T0024 (Model Inversion /  │
│                          │ clustering; high token rate │ Extraction)                   │
├──────────────────────────┼─────────────────────────────┼───────────────────────────────┤
│ RAG Vector Poisoning     │ Sudden cluster divergence;  │ AML.T0018 (Poisoning Training/│
│                          │ unauthorized bulk upserts   │ Context Data)                 │
├──────────────────────────┼─────────────────────────────┼───────────────────────────────┤
│ Autonomous Agent Hijack  │ Unapproved API call attempt;│ AML.T0053 (LLM Execution of   │
│                          │ unusual parameter formats   │ Malicious Tool Calls)         │
└──────────────────────────┴─────────────────────────────┴───────────────────────────────┘
```

### 2.1 Indicators of Compromise (IoCs) & Indicators of Attack (IoAs)
- **IoA-1: Adversarial Delimiter Framing:** Ingestion of text containing structural override commands (`system:`, `[INST]`, `<<SYS>>`, `---BEGIN NEW INSTRUCTION---`).
- **IoA-2: High-Density Unicode Exploits:** Invisible characters, RTL override bytes, or Base64/ROT13 encoded payloads designed to evade ASCII keyword filters.
- **IoC-1: Model Exfiltration Burst:** A single tenant account issuing thousands of varied temperature prompts with uniform structure designed to distill weights.
- **IoC-2: Vector Inversion Signature:** Query embeddings landing directly on known canary document boundaries.

### 2.2 Triaging & Severity Classification
- **Severity 1 (Critical):** Autonomous agent hijacking resulting in data exfiltration or destructive tool execution; remote code execution via poisoned model weights.
- **Severity 2 (High):** Universal jailbreak successfully bypassing system safety controls on production endpoints; high-volume PII disclosure.
- **Severity 3 (Medium):** Localized hallucination causing customer misinformation; elevated token consumption suggesting early DoS probing.
- **Severity 4 (Low):** Blocked jailbreak attempts stopped at perimeter guardrails.

---

## PHASE 3: Containment (Stopping Adversarial Progression)

Containment isolates the compromised component to prevent lateral movement, data exfiltration, or financial exhaustion while preserving forensic evidence.

```
                    ┌──────────────────────────────────────────────┐
                    │          AI CONTAINMENT PLAYBOOK GATES       │
                    └──────────────────────┬───────────────────────┘
                                           │
         ┌────────────────────────┬────────┴──────────────┬────────────────────────┐
         ▼                        ▼                       ▼                        ▼
┌──────────────────┐    ┌──────────────────┐    ┌──────────────────┐    ┌──────────────────┐
│ MODEL LEVEL      │    │ AGENT LEVEL      │    │ VECTOR / RAG     │    │ TENANT / USER    │
│ Activate Circuit │    │ Revoke OAuth     │    │ Freeze index     │    │ Suspend API key  │
│ Breakers; switch │    │ tool tokens;     │    │ write updates;   │    │ and blacklist    │
│ to deterministic │    │ isolate sandbox  │    │ isolate poisoned │    │ originating IP/  │
│ fallback model   │    │ network socket   │    │ collection       │    │ fingerprint      │
└──────────────────┘    └──────────────────┘    └──────────────────┘    └──────────────────┘
```

### 3.1 Automated Technical Containment Actions
1. **Model Fallback Switch:** If an LLM endpoint exhibits compromised behavior, the API gateway triggers an automated circuit breaker, redirecting traffic to an isolated, deterministic fallback model or canned response engine.
2. **Autonomous Tool Revocation:** Immediately revoke ephemeral session OAuth tokens granted to autonomous agents, terminating active database connections and shell sessions.
3. **Vector Index Freeze:** Place the target vector database in read-only mode, blocking any upsert, delete, or re-indexing operations to prevent poisoned embedding propagation.
4. **Session Termination & IP Quota Lockdown:** Immediately revoke the user API key, invalidate the session JWT, and place the originating IP subnet on a global perimeter blocklist.

---

## PHASE 4: Eradication (Eliminating the Threat & Root Cause)

Eradication removes malicious artifacts, remediates system vulnerabilities, and purges poisoned records from the AI pipeline.

### 4.1 Eradication Procedures by Attack Type
- **For Indirect Prompt Injection via RAG:**
  1. Identify all documents ingested within the compromise timeframe using immutable ingestion logs.
  2. Execute cryptographic hash verification against original external source documents.
  3. Purge poisoned vector embeddings and document chunks from the vector database.
  4. Invalidate all caching layers (e.g., Redis semantic cache, prompt caches).
- **For Compromised Model Weights / Checkpoints:**
  1. Terminate all container pods running the affected model image.
  2. Verify base model SafeTensors SHA-256 hash against verified vendor signatures.
  3. Re-build the model container image from verified, clean source code and redeploy.
- **For Prompt Guardrail Bypass:**
  1. Extract the adversarial payload from incident telemetry.
  2. Formulate hardened defensive system prompt constraints and boundary delimiters.
  3. Update classifier rules in Llama Guard / NeMo Guardrails with new adversarial embeddings.

---

## PHASE 5: Recovery (Restoration, Validation, and Canary Staging)

Recovery returns the AI system to full production operation with verified safety guarantees, continuous monitoring, and heightened telemetry.

### 5.1 Verification Testing Prior to Full Cutover
- **Automated Adversarial Regression Battery:** Run an automated battery of 1,000+ known jailbreaks and attack permutations (using frameworks like Garak, PyRIT, or inspect-ai) against the restored endpoint.
- **Grounding & Accuracy Benchmark:** Verify the model's factual accuracy on a golden validation dataset to ensure defensive hardening has not degraded core functional capability.
- **Lineage Integrity Audit:** Ensure all data, models, and embeddings in the restored pipeline have verified cryptographic provenance.

### 5.2 Phased Deployment Schedule
- **Stage 1 (Canary 2%):** Route 2% of live traffic to the restored model under active human SOC observation for 2 hours.
- **Stage 2 (Staging 25%):** Expand to 25% traffic with active anomaly detection thresholds set to maximum sensitivity.
- **Stage 3 (Full 100%):** Re-enable full production routing with automated alerting remaining at heightened priority for 72 hours.

---

## PHASE 6: Lessons Learned & Threat Intelligence Sharing

The final phase analyzes the root cause, updates institutional playbooks, enhances detection logic, and coordinates threat intelligence sharing with the broader AI security community.

### 6.1 Post-Incident Review (PIR) Agenda
- Review the incident timeline from Initial Access to Containment (MTTD, MTTC, MTTR).
- Assess why perimeter guardrails failed to catch the initial adversarial prompt or payload.
- Update the enterprise AI Threat Model and recalculate residual risk scores.
- Document regulatory disclosure requirements (e.g., EU AI Act Article 73 serious incident reporting within 72 hours).

### 6.2 Threat Intelligence Integration & Sharing
- **MITRE ATLAS Contribution:** Codify the attack path into standard ATLAS TTPs (Tactics, Techniques, and Procedures).
- **ISAC & Community Disclosure:** Disclose sanitized Indicators of Attack (IoAs), adversarial prompt templates, and IoCs to relevant Information Sharing and Analysis Centers (AI-ISAC, FS-ISAC, Health-ISAC).

---

## SANS Incident Response Playbook Quick Reference

| Incident Scenario | Initial Alert Indicator | Containment Action (Minutes) | Eradication Action (Hours) | Recovery Verification |
|:---|:---|:---|:---|:---|
| **Direct Jailbreak Attack** | Guardrail classifier alert; anomalous token sequence | Force session reset; block API key; clamp token rate | Update input guardrail filters; patch system prompt | Automated adversarial test suite (Garak) passes |
| **Indirect RAG Injection** | Downstream tool triggered with unauthorized payload | Freeze vector index updates; disable agent tool access | Purge poisoned chunks; invalidate semantic cache | Clean vector hash verification; canary test query |
| **Model Inversion / Scraping** | High-velocity query clustering; uniform prompt variance | Enable proof-of-work captcha; throttle API quota to zero | Blacklist user credentials; review exfiltrated outputs | Inversion test against model checkpoints |
| **Poisoned Weight Checkpoint** | Container hash mismatch; anomalous outbound socket | Kill model pod; isolate host cluster network egress | Delete tainted image; pull verified SafeTensors image | Cryptographic signature verification against vendor |

---
*Document Version: 1.0.0 | SANS AI Incident Response & MITRE ATLAS Threat Intel Reference*

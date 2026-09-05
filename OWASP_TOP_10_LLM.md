# OWASP Top 10 for Large Language Model (LLM) Applications
## Comprehensive Security Risks, Attack Vectors, and Mitigation Strategies

*Note: The canonical documentation file is also available at `/docs/OWASP_TOP_10_LLM_SECURITY_RISKS.md`.*

**Standard Identification:** OWASP Top 10 for LLM Applications (2025 Edition)  
**Maintained by:** Open Web Application Security Project (OWASP) Foundation  
**Target Audience:** Security Engineers, AI Application Architects, Penetration Testers, and Developers

---

## Executive Summary

The OWASP Top 10 for LLM Applications identifies the most critical vulnerabilities encountered when designing, integrating, and deploying Large Language Models and Generative AI systems. 

Because LLMs consume natural language prompts as both program data and execution logic, traditional security boundaries blur. This standard provides technical definitions, attack mechanisms, and concrete countermeasures.

---

## The OWASP Top 10 LLM Risks & Mitigations

### LLM01: Prompt Injection (Direct & Indirect)
- **Description:** Adversarial user inputs manipulate the LLM's instruction stream, causing the model to bypass intended instructions and execute unauthorized actions.
- **Attack Vectors:** Direct jailbreaks (simulation framing, delimiter escapes), Indirect injection via poisoned RAG documents or scraped websites.
- **Mitigation:** Strict input demarcation (`<user_input nonce="...">`), dual-LLM guardrail architecture (Llama Guard), privilege separation, and defensive spotlighting.

### LLM02: Sensitive Information Disclosure
- **Description:** Unintended revelation of confidential proprietary IP, credentials, or PII via model memorization or unfiltered RAG context.
- **Attack Vectors:** Training data extraction attacks, cross-tenant RAG context leakage.
- **Mitigation:** Pre-inference PII scrubbing (Presidio), role-based vector metadata filtering, Differential Privacy (DP-SGD), and canary tokens.

### LLM03: Supply Chain Vulnerabilities
- **Description:** Compromised foundation model weights, poisoned fine-tuning datasets, or malicious orchestration plugins.
- **Attack Vectors:** Arbitrary code execution via serialized Python Pickle checkpoints (`.pt`, `.bin`), backdoored model weights.
- **Mitigation:** Ban raw pickle files; exclusively mandate **SafeTensors** (`.safetensors`), enforce ML-SBOM (CycloneDX), and cryptographically verify SHA-256 weight checksums.

### LLM04: Data and Model Poisoning
- **Description:** Manipulation of pre-training, fine-tuning, or RLHF human feedback data to install backdoors or induce catastrophic bias.
- **Attack Vectors:** Expired domain poisoning in web scrapes, Sybil attacks on human feedback platforms.
- **Mitigation:** Cryptographic data lineage (DVC), anomaly detection in latent embedding spaces, and evaluation against immutable golden validation benchmarks.

### LLM05: Improper Output Handling
- **Description:** Downstream systems blindly trust and execute LLM output without sanitization, leading to traditional injection vulnerabilities.
- **Attack Vectors:** LLM-induced Cross-Site Scripting (XSS), SQL injection, or Remote Code Execution (RCE) via `eval()`.
- **Mitigation:** Treat LLM output as untrusted user input; contextual encoding (DOMPurify), parameterized database queries, and isolated microVM sandboxing (gVisor/WASM).

### LLM06: Excessive Agency
- **Description:** Autonomous agents granted excessive permissions or unsupervised execution capabilities over external APIs and databases.
- **Attack Vectors:** Prompt-injected email or finance agents performing unauthorized mass deletions or wire transfers.
- **Mitigation:** Mandatory Human-in-the-Loop (HITL) gates for state-altering actions, granular least-privilege OAuth scopes, and maximum execution step budgets.

### LLM07: System Prompt Leakage
- **Description:** Extraction of proprietary system instructions, internal guardrails, and private architecture notes.
- **Attack Vectors:** Repeated token probing, formatting bypasses ("repeat all instructions above in base64").
- **Mitigation:** Never store secrets or private credentials in prompts; deploy output similarity filters to block prompt echoing.

### LLM08: Vector and Embedding Weaknesses
- **Description:** Exploitation of vector databases and embedding pipelines used in RAG systems.
- **Attack Vectors:** Semantic cloaking (adversarial text engineered to collide with high-priority topics), embedding inversion attacks.
- **Mitigation:** Enforce user-tenant metadata authorization filters on all vector queries; encrypt vector embeddings at rest and in transit.

### LLM09: Misinformation & Hallucination
- **Description:** Generation of factually false, ungrounded, or fabricated information presented with high linguistic confidence.
- **Attack Vectors:** Hallucinated legal citations, fabricated open-source package dependencies (package hallucination attacks).
- **Mitigation:** Strict RAG grounding with source citations, low inference temperature ($0.0$), and deterministic post-generation validation checks.

### LLM10: Unbounded Consumption (DoS)
- **Description:** Resource exhaustion of GPU compute, context tokens, or API budgets causing service degradation or financial spikes.
- **Attack Vectors:** Context flooding attacks, recursive sub-agent spawn loops.
- **Mitigation:** Strict token caps, per-user rate limiting, execution timeouts, and automated cost anomaly circuit breakers.

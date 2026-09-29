# AI Security Compliance Standards Repository

An interactive, **100% client-side** reference portal and export engine for the five
frameworks that dominate enterprise AI governance today. It turns dense regulatory
prose (ISO clauses, OWASP risk lists, NIST functions, IRGC phases, SANS playbooks) into
a searchable, filterable, cross-referenced knowledge base that an auditor, security
engineer, or GRC lead can actually navigate — and then hand off as a signed-off
spreadsheet or PDF.

> **Audit-ready by design, not by enforcement.** This tool *documents* the controls an
> organization must satisfy and helps you track your progress against them. It does not
> itself implement, test, or attest to any control. See [Security](#security-posture) and
> [Known limitations](#known-limitations).

---

## Table of Contents

- [What this application does](#what-this-application-does)
- [The five frameworks](#the-five-frameworks)
- [Feature tour](#feature-tour)
- [Quick start](#quick-start)
- [Project structure](#project-structure)
- [Architecture at a glance](#architecture-at-a-glance)
- [The data model](#the-data-model)
- [Export pipeline](#export-pipeline)
- [Adding or editing content](#adding-or-editing-content)
- [Content sources](#content-sources)
- [Security posture](#security-posture)
- [State and persistence](#state-and-persistence)
- [Testing and quality gates](#testing-and-quality-gates)
- [Environment variables](#environment-variables)
- [Agent skills](#agent-skills)
- [Known limitations](#known-limitations)
- [License](#license)

---

## What this application does

**In one sentence:** it is a static, offline-capable browser reference for AI security
compliance frameworks, with per-control audit tracking and one-click multi-format export.

Concretely, it does four things:

1. **Curates** five AI governance frameworks into a single normalized schema, so controls
   from wildly different sources (a normative ISO clause, a risk-category from OWASP, a
   NIST AI RMF function) can be browsed through identical UI.
2. **Navigates** that corpus through five purpose-built views — control cards, formal
   structural tables, a cross-framework harmonization matrix, an audit readiness
   checklist, and a keyword glossary — all reachable from one sticky header.
3. **Tracks** per-control compliance status (`compliant` / `in progress` / `gap`) and
   computes a live readiness percentage for the selected framework.
4. **Exports** any of that content to multi-sheet **Excel**, **CSV**, or paginated
   landscape **PDF** — either the whole repository at once, or just the current view.

**What it explicitly does not do:** it has no backend, no database, no authentication,
no network calls, and no LLM runtime. Everything ships in the JavaScript bundle and runs
in your browser. The word "AI" in the title describes the *subject matter*, not the
implementation.

---

## The five frameworks

| ID | Framework | Authority | Focus |
|---|---|---|---|
| `iso-42001` | **ISO/IEC 42001:2023** | ISO/IEC | AI Management System (AIMS) — Clauses 4–10, Annex A |
| `owasp-llm` | **OWASP Top 10 for LLM Applications (2025)** | OWASP Foundation | LLM01–LLM10 attack and risk categories |
| `irgc-governance` | **IRGC AI Risk Governance Framework** | EPFL IRGC, 2024 | 4-phase risk governance lifecycle |
| `sans-ir` | **SANS AI Incident Response** | SANS / MITRE ATLAS | 6-phase PICERL response lifecycle |
| `nist-ai-rmf` | **NIST AI RMF 1.0** (AI 100-1) | NIST | Govern / Map / Measure / Manage |

The **Cross-Framework Mapping** view is the differentiator: it harmonizes these five
vocabularies across 6 shared governance domains, so an organization can trace a single
control obligation — say *"we have a prompt-injection gap"* — from the OWASP risk, through
the NIST function, into an ISO annex clause and an IRGC phase, and end at a concrete
recommended action.

---

## Feature tour

### 1. Controls & Clauses Explorer
A card grid of every control in the selected framework. Each card shows the clause or
risk ID (monospace), category, severity badge, description, and a bulleted list of
concrete **technical implementation requirements**. Controls that have a counterpart in
another framework display `Cross-Mapped:` chips linking to the target clause.

- Filter by category via pill buttons
- Full-text search across title, clause ID, description, and every technical requirement
- Live "Showing X of Y controls" counter
- Empty state when a filter combination matches nothing

### 2. Table Structural Documentation
The formal, normative view. Renders **11 structured HTML tables** (defined as data, not
markdown) covering the granular tables each framework publishes — obligation matrices,
threat catalogs, phase breakdowns, and similar.

- **Search inside tables** — filters rows across all visible tables simultaneously
- **Raw Text View toggle** — swaps the rendered tables for the equivalent GFM pipe-table
  text in a `<pre>` block, useful for copying into tickets, wikis, or LLM prompts
- **Copy specification** — one click copies the structured content
- **Copy table text** — per-table copy of the raw pipe-table form

### 3. Cross-Framework Mapping
A 6-domain × 5-framework matrix. Each row is a governance domain (e.g. *"Third-Party &
Supply Chain Risk"*) with the corresponding clause in every framework, plus a
`recommendedAction` column that turns the mapping into a to-do item. Includes a
framework filter and a copy-all action.

### 4. Audit Readiness Checklist
The only genuinely stateful view. Every control gets a tri-state status toggle, and the
component derives:

- counts of compliant / in-progress / gap controls
- a **readiness percentage** for the active framework
- a `Reset all statuses` action
- its own per-framework export menu (Excel / CSV / PDF) that includes the status column

### 5. AI Security Glossary
**24 terms** across 5 categories, each with acronym, definition, enterprise relevance,
the governing standards that reference it, and a recommended action. Searchable,
filterable, individually copyable.

### Global features
- Sticky header with framework switcher, global search, and tab bar
- A repository banner with an **"Export Full Repository"** menu covering all five
  frameworks in one shot
- Consistent slate/emoji-free visual system built on Tailwind CSS v4
- ~30 stable `id` attributes on interactive elements, making the app straightforward to
  drive from end-to-end tests or browser automation

---

## Quick start

**Prerequisites:** Node.js 18+ (developed against Node 24).

```bash
npm install        # or: bun install
npm run dev        # http://localhost:3000, bound to 0.0.0.0
```

| Script | What it does |
|---|---|
| `npm run dev` | Vite dev server on port 3000, all interfaces, HMR enabled |
| `npm run build` | Production build into `dist/` |
| `npm run preview` | Serve the built `dist/` locally |
| `npm run lint` | `tsc --noEmit` — **the only quality gate in the project** |
| `npm run clean` | Remove `dist/` (and a vestigial `server.js` reference) |

There is no `test` script — see [Testing and quality gates](#testing-and-quality-gates).

**Deployment:** `npm run build` produces a fully static `dist/`. It can be hosted on any
static host (GitHub Pages, Netlify, Cloudflare Pages, S3 + CDN, or Google AI Studio's
own applet hosting, which this project was scaffolded for). No server runtime is
required.

---

## Project structure

```
ai-security-compliance/
├── index.html                  SPA shell, mounts #root
├── metadata.json               Google AI Studio applet manifest
├── vite.config.ts              React + Tailwind v4 plugins, DISABLE_HMR gate
├── tsconfig.json               ES2022, bundler resolution, react-jsx, noEmit
├── package.json                single dependency manifest
│
├── docs/                       canonical long-form framework documents
│   ├── ISO_42001_AI_SECURITY_COMPLIANCE.md
│   ├── OWASP_TOP_10_LLM_SECURITY_RISKS.md
│   ├── NIST_AI_RMF_RISK_MANAGEMENT.md
│   ├── IRGC_AI_RISK_GOVERNANCE_FRAMEWORK.md
│   └── SANS_AI_INCIDENT_RESPONSE.md
│
├── ISO_42001_COMPLIANCE.md     condensed root-level stubs, each pointing at docs/
├── OWASP_TOP_10_LLM.md
├── NIST_AI_RMF.md
├── IRGC_RISK_GOVERNANCE.md
├── SANS_AI_INCIDENT_RESPONSE.md
│
└── src/
    ├── main.tsx                createRoot + StrictMode
    ├── App.tsx                 root component, top-level state, full-repo exports
    ├── types.ts                shared domain types
    ├── index.css               Tailwind v4 import + base layer
    │
    ├── components/
    │   ├── Header.tsx                     framework switcher, global search, tab bar
    │   ├── StandardOverview.tsx           per-framework summary card + copy
    │   ├── ControlsExplorer.tsx           searchable/filterable control card grid
    │   ├── MarkdownViewer.tsx             11 structural tables, raw-text toggle
    │   ├── CrossFrameworkMatrix.tsx       6 × 5 harmonization matrix
    │   ├── ComplianceAuditChecklist.tsx   tri-state status + readiness score
    │   ├── GlossarySection.tsx            24-term searchable glossary
    │   └── ExportMenu.tsx                 reusable xlsx / csv / pdf dropdown
    │
    ├── data/                   ← the entire "knowledge base", bundled at build time
    │   ├── standardsData.ts               STANDARDS_META, CONTROLS_DATA, CROSS_FRAMEWORK_MAPPINGS
    │   ├── tabularStandardsData.ts        TABULAR_STANDARDS_DATA (11 tables)
    │   ├── rawMarkdown.ts                 RAW_MARKDOWN_DOCS (5 inlined documents)
    │   └── glossaryData.ts                GLOSSARY_CATEGORIES, GLOSSARY_ITEMS
    │
    └── utils/
        └── exportUtils.ts     exportToCsv / exportToExcel / exportToPdf
```

Roughly **4,400 lines of TypeScript/TSX**, of which about half is content data.

---

## Architecture at a glance

This is a **single-layer, single-page, props-driven application**. There is no service
layer, no state management library, no context, and no data-fetching abstraction.

```
index.html
    │
    ▼
src/main.tsx  ──►  <App/>          owns the only top-level state
                                  activeStandard · activeTab · searchQuery
    │
    ├── <Header/>              ◄── framework + tab selection, search input
    │
    ├── [repository banner]    ──  <ExportMenu/>  ──►  utils/exportUtils.ts
    │                                              exportToCsv / Excel / Pdf
    │
    └── view router (App.tsx:249-278)
          ├── glossary ──► <GlossarySection/>        (full width)
          ├── matrix   ──► <CrossFrameworkMatrix/>   (full width)
          └── otherwise ──► <StandardOverview meta/>
                            ├── controls  ──► <ControlsExplorer/>
                            ├── markdown  ──► <MarkdownViewer/>
                            └── checklist ──► <ComplianceAuditChecklist/>
```

**Data flow characteristics:**

- **Unidirectional and synchronous.** `App` reads the static records, passes them down as
  props. Children derive their view with `.filter()` during render. There are no effects
  that fetch, and no async boundaries.
- **All data is compile-time.** The four modules in `src/data/` are imported statically
  and inlined into the bundle. Nothing is read from `docs/` at runtime.
- **Search is prop-drilled, not lifted.** `searchQuery` lives in `App` and reaches
  `ControlsExplorer`; `MarkdownViewer` and `GlossarySection` each own their own
  independent search state.
- **Child-local state is ephemeral.** Category filters, checklist statuses, dropdown
  open/closed, and copy-confirmation flags all live in `useState` inside individual
  components and vanish on reload.

---

## The data model

All shared types live in `src/types.ts`.

```ts
type StandardId = 'iso-42001' | 'owasp-llm' | 'irgc-governance' | 'sans-ir' | 'nist-ai-rmf';
type ActiveTab  = 'controls' | 'markdown' | 'matrix' | 'checklist' | 'glossary';

interface StandardMeta {
  id: StandardId; code: string; name: string; subtitle: string;
  authority: string; year: string; category: string; badgeColor: string;
  totalControls: number; markdownFileName: string; markdownPath: string;
  summary: string;
}

interface ControlItem {
  id: string; clauseOrRiskId: string; title: string; category: string;
  description: string; technicalRequirements: string[];
  impactOrSeverity?: 'Critical' | 'High' | 'Moderate' | 'Low';
  mappedStandards?: { standard: string; targetId: string }[];
}

interface CrossFrameworkMapping {
  domain: string; iso42001: string; owaspLLM: string; nistAiRmf: string;
  irgcPhase: string; sansIrPhase: string; recommendedAction: string;
}
```

`ControlItem` is the load-bearing type: a single shape that normalizes an ISO annex
control, an OWASP risk category, an IRGC phase, a SANS response phase, and a NIST
function into one renderable card. `technicalRequirements` is the most useful field for
engineers — it is where each control becomes an actionable checklist item rather than
prose.

### Current content volume

| Record set | Location | Size |
|---|---|---|
| `STANDARDS_META` | `standardsData.ts` | 5 frameworks |
| `CONTROLS_DATA` | `standardsData.ts` | **36 control items** (ISO 9, OWASP 10, IRGC 6, SANS 6, NIST 5) |
| `CROSS_FRAMEWORK_MAPPINGS` | `standardsData.ts` | 6 domains |
| `TABULAR_STANDARDS_DATA` | `tabularStandardsData.ts` | 11 tables |
| `RAW_MARKDOWN_DOCS` | `rawMarkdown.ts` | 5 full documents |
| `GLOSSARY_ITEMS` | `glossaryData.ts` | 24 terms in 5 categories |

> ⚠️ **Count discrepancy, documented deliberately.** `StandardMeta.totalControls` sums to
> **102** (38+10+16+18+20) and the banner in `src/App.tsx:219` reads *"104 Total Controls"*,
> but `CONTROLS_DATA` actually contains **36** items. `totalControls` is the *real* count
> of controls in each published framework; the explorer intentionally ships a curated
> subset for readability. The banner number is simply stale — do not treat it as
> authoritative. See [Known limitations](#known-limitations).

---

## Export pipeline

`src/utils/exportUtils.ts` exposes three pure, browser-only functions. All three build
their output in memory and hand it to the user as a file download — nothing leaves the
machine.

| Function | Implementation | Notes |
|---|---|---|
| `exportToCsv(filename, headers, rows)` | `Blob` + `URL.createObjectURL` + synthetic `<a download>` | Writes a **UTF-8 BOM** (`\uFEFF`) so Excel on Windows renders em-dashes and accented characters correctly. Escapes `,` `"` `\n` `\r` per RFC 4180, joins rows with CRLF. |
| `exportToExcel(filename, sheets[])` | SheetJS (`xlsx`) | Builds a real multi-sheet workbook. Auto-fits column widths (header width, +3, min 12, cell text capped at 55 chars). Sanitizes sheet names to Excel's 31-char limit and strips `:\/?*[]`. |
| `exportToPdf(filename, title, subtitle, sections[])` | jsPDF + jspdf-autotable | Landscape A4, mm units. Navy header banner with a generation timestamp, wrapped subtitle, one `theme: 'grid'` table per section, alternating row shading, and `Page N of M` footers drawn in `didDrawPage`. |

`ExportMenu.tsx` wraps these in a reusable dropdown with a click-outside listener
(`mousedown`) and ARIA attributes on the trigger and items. Two instances exist:
`idPrefix="full-repo-export"` in the banner, and a per-framework instance inside
`ComplianceAuditChecklist`.

**Full-repository exports** are assembled in `App.tsx` (`handleExportAllExcel`,
`handleExportAllCsv`, `handleExportAllPdf`) rather than in the utility module — Excel
gets **8 sheets** (overview + one per framework + harmonization matrix + glossary), CSV
gets a single flattened row set, and PDF gets a 3-section executive summary.

---

## Adding or editing content

Almost all content work happens in `src/data/`. You should not need to touch a component.

**Add a control** → append to the relevant array in `CONTROLS_DATA` (`standardsData.ts`):

```ts
'iso-a11': {
  id: 'iso-a11',
  clauseOrRiskId: 'A.11',
  title: 'Third-Party Model Provenance',
  category: 'Third-Party & Supply Chain',
  description: 'Organizations shall maintain documented provenance for externally sourced models.',
  technicalRequirements: [
    'Record model artifact hashes at ingestion',
    'Capture license terms in a machine-readable SBOM',
  ],
  impactOrSeverity: 'High',
  mappedStandards: [
    { standard: 'NIST AI RMF', targetId: 'GOVERN 1.6' },
  ],
},
```

**Add a glossary term** → append to `GLOSSARY_ITEMS` (`glossaryData.ts`) using an existing
category slug from `GLOSSARY_CATEGORIES`, otherwise add the category too.

**Add a structural table** → append a section to the relevant entry in
`TABULAR_STANDARDS_DATA` (`tabularStandardsData.ts`). Table columns are fixed
(`reference`, `title`/`requirement`, `description`, `implementation`) and the renderer is
generic over that shape.

**Add a mapping row** → append to `CROSS_FRAMEWORK_MAPPINGS`. Keep all five framework
cells populated; an empty cell reads as an authoring bug in the matrix view.

**Add a whole framework** → extend the `StandardId` union in `types.ts`, add the
`STANDARDS_META` and `CONTROLS_DATA` entries, add the id to the two `standardsList`
arrays (`App.tsx:29-35` and `Header.tsx:22-28`), and add a `TABULAR_STANDARDS_DATA` and
`RAW_MARKDOWN_DOCS` entry. Because `CONTROLS_DATA` and `TABULAR_STANDARDS_DATA` are typed
as `Record<StandardId, ...>`, TypeScript will point at every place you missed.

After any content change:

```bash
npm run lint
```

---

## Content sources

The same five documents exist in three places, with no generator keeping them in sync:

1. **`docs/*.md`** — the canonical long-form human-readable documents.
2. **Root `*.md`** — condensed stubs, each opening with a pointer to its `docs/` counterpart.
3. **`src/data/rawMarkdown.ts` + `tabularStandardsData.ts`** — the versions the app
   actually renders, inlined as TypeScript string and object literals.

When you update a framework's content, update all three. `StandardMeta.markdownPath` and
`markdownFileName` reference the `docs/` files, but **nothing in the code ever fetches
them** — they are metadata only.

---

## Security posture

The honest summary: **this repository contains security *content*, not security
*implementation*.** It is a reading tool.

| Control area | Status |
|---|---|
| Authentication / sessions | None. No login, no tokens, no cookies, no identity. All content is public. |
| Authorization / RBAC | None. Every view is unconditionally rendered. |
| Input validation | None by design. Search inputs are plain `useState` strings used only in `.toLowerCase().includes()`. |
| XSS defenses | Strong by construction. **No `dangerouslySetInnerHTML`, no `innerHTML`, no `eval`, no `document.write`** anywhere in `src/`. All rendering goes through JSX, which escapes by default. |
| Network egress | **Zero.** No `fetch`, no `axios`, no `XMLHttpRequest`, no `WebSocket`. The app runs fully offline. |
| Secrets | None in code. `.env*` is gitignored with `.env.example` excepted. |
| Cryptography / rate limiting | Not applicable — no server, no secrets, no network. |
| Dependency surface | Small. See the caveat below. |

**Dependency caveat:** `xlsx@0.18.5` is the abandoned npm community build of SheetJS and
carries known advisories against *malicious input files*. The risk here is low because
this app only ever **writes** workbooks from its own hard-coded data and never **parses**
an uploaded one — but if you extend the app to import user-supplied `.xlsx` files, migrate
off the npm `xlsx` package first.

**Vestigial dependencies.** `@google/genai`, `express`, and `dotenv` are declared in
`package.json` but imported nowhere; `metadata.json` declares
`MAJOR_CAPABILITY_SERVER_SIDE_GEMINI_API`, which is unimplemented. These are leftovers
from the Google AI Studio scaffold this project was generated from, and
`package.json`'s `clean` script still references a `server.js` that has never existed.
**There is no LLM call anywhere in the running application.**

---

## State and persistence

**Nothing is persisted.** There is no database, no vector store, no cache, no
`localStorage`, no `sessionStorage`, and no `indexedDB`.

All state is ephemeral React `useState`:

| State | Owner | Lost on reload |
|---|---|---|
| `activeStandard`, `activeTab`, `searchQuery` | `App.tsx:22-24` | yes |
| `selectedCategory` | `ControlsExplorer.tsx:12` | yes |
| audit `statuses` + readiness score | `ComplianceAuditChecklist.tsx:14-23` | yes |
| `viewSource`, `tableSearch`, `copied` | `MarkdownViewer.tsx:20-22` | yes |
| matrix `filter`, `copied` | `CrossFrameworkMatrix.tsx:8-9` | yes |
| glossary `searchQuery`, `selectedCategory`, `copiedId` | `GlossarySection.tsx:20-22` | yes |
| `isOpen` | `ExportMenu.tsx:21` | yes |

The audit checklist is seeded with a realistic starting state (first two controls
compliant, third in progress, rest not started) and wiped on every refresh. **The only
durable artifact is an exported file.** If checklist persistence matters to you,
`localStorage` keyed by `StandardId` is the natural, low-risk addition — but be aware
that persisting audit status for a real assessment introduces a genuine
confidentiality question that a stateless tool avoids by construction.

`AuditChecklistItem` is declared in `types.ts:44-51` but never used — dead type, harmless.

---

## Testing and quality gates

**There are no tests.** No Vitest, Jest, Testing Library, Playwright, or Cypress is
installed, and no `test` script exists.

The only automated check is:

```bash
npm run lint     # tsc --noEmit
```

Currently **passing**. Note that `tsconfig.json` has no `strict`, no `noUnusedLocals`,
and no `include`/`exclude`, so this typechecks permissively across every file in the tree
(including `vite.config.ts`).

If you are adding tests, the codebase is unusually amenable: roughly 30 stable `id`
attributes were deliberately placed on interactive elements. The main anchors are
`ai-compliance-app`, `compliance-header`, `global-search-input`, `tab-controls-explorer`,
`tab-markdown-viewer`, `tab-cross-matrix`, `tab-compliance-checklist`,
`tab-glossary-section`, `standard-overview-card`, `controls-explorer-section`,
`table-structural-documentation-container`, `search-inside-tables`,
`cross-matrix-section`, `compliance-checklist-section`, `ai-security-glossary-section`,
`glossary-search-input`, `btn-copy-specification`, `btn-toggle-table-source`, and
`btn-copy-table-text`, plus generated patterns `btn-nav-standard-{id}`,
`control-card-{id}`, `filter-category-{slug}`, `table-section-{index}`,
`glossary-item-{id}`, `btn-copy-glossary-{id}`, `btn-glossary-cat-{slug}`, and
`{idPrefix}-btn-{excel|csv|pdf}`. `ExportMenu` also carries basic ARIA on its trigger and
menu items.

There is also **no CI** — no `.github/`, no pipeline config of any kind.

---

## Environment variables

`.env.example` documents two variables, both inherited from the AI Studio scaffold and
**neither of which is read by any source file**:

| Variable | Purpose | Read by |
|---|---|---|
| `GEMINI_API_KEY` | Google Gemini API key | nothing |
| `APP_URL` | Hosting URL | nothing |

Exactly **one** environment variable actually affects the build:

| Variable | Effect | Location |
|---|---|---|
| `DISABLE_HMR` | Set to `'true'` to disable Vite HMR and file watching, preventing flicker during automated edits | `vite.config.ts:17-19` |

There is no `import.meta.env` or `process.env` usage anywhere in `src/`.

---

## Agent skills

This repo ships four opencode/Claude skills in `.opencode/skills/`. They load
automatically when a task matches, and they encode the hard-won context that is not
obvious from reading the code — the count discrepancy, the export truncation, the
checklist's stale-state trap, the data triplication.

| Skill | Covers |
|---|---|
| [`ai-compliance-portal`](.opencode/skills/ai-compliance-portal/SKILL.md) | What the app does, the five frameworks, the five views, where content lives, how to author new controls, commands, known gotchas |
| [`portal-architecture`](.opencode/skills/portal-architecture/SKILL.md) | Component tree, props flow, the `data/` vs `components/` vs `utils/` rule, how to add a view, the testable `id` conventions, refactoring checklist |
| [`portal-state-memory`](.opencode/skills/portal-state-memory/SKILL.md) | Complete `useState` inventory, the audit checklist's seeding and stale-map bug, derived-vs-stored values, how to add persistence safely |
| [`portal-security`](.opencode/skills/portal-security/SKILL.md) | Posture matrix, the XSS/network/eval red lines, CSV formula-injection risk, the `xlsx@0.18.5` advisory, secrets and deployment hardening |

If you use opencode or Claude Code, restart your session after cloning to pick them up —
skill files are read at startup, not hot-reloaded.

---

## Known limitations

Honest list of things that are wrong or missing, roughly in priority order:

1. **Dead dependencies.** `@google/genai`, `express`, `dotenv`, `motion`, and
   `react-markdown` are declared and locked but never imported. Removing them shrinks the
   install and the advisory surface. The `clean` script's `server.js` reference is also
   vestigial.
2. **Content triplication.** The same five documents live in `docs/*.md`, root `*.md`,
   and `src/data/*.ts`, with nothing keeping them in sync. A single source-of-truth plus a
   build-time codegen step would eliminate the drift.
3. **Stale control count.** The banner says 104, `totalControls` sums to 102, and 36
   controls actually load. Pick one meaning and derive the number instead of hard-coding.
4. **No persistence.** The audit checklist — the app's one genuinely stateful feature —
   resets on every page refresh.
5. **No tests, no linter, no CI, no `strict`.** `tsc --noEmit` in permissive mode is the
   entire quality story.
6. **`docs/` is decorative.** `StandardMeta.markdownPath` points at it, but no code reads
   it. Either wire it up or drop the fields to avoid implying a runtime dependency that
   does not exist.
7. **PDF glossary is truncated.** `handleExportAllPdf` slices the glossary to
   `GLOSSARY_ITEMS.slice(0, 15)`, so the full-repository PDF silently omits 9 of 24
   terms. Excel and CSV include all of them.

---

## License

Apache-2.0, per the SPDX headers in `src/App.tsx`.

The underlying framework content is a synthesis of publicly published standards and
guidance. Consult the primary sources in `docs/` before relying on any statement here for
formal attestation.

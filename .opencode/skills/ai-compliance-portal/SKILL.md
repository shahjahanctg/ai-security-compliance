---
name: ai-compliance-portal
description: Use when working in the ai-security-compliance repo - understanding what the AI Security Compliance Standards Repository app does, its five frameworks (ISO 42001, OWASP Top 10 LLM, IRGC, SANS AI IR, NIST AI RMF), its five views (controls explorer, table documentation, cross-framework matrix, audit checklist, glossary), the export pipeline (xlsx/csv/pdf), or where framework content lives in src/data/. Covers navigation, commands, content authoring, and the repo's known gotchas.
---

# AI Security Compliance Standards Repository

A **100% client-side React SPA** that turns five AI governance frameworks into a
searchable, cross-referenced reference with per-control audit tracking and multi-format
export. It has **no backend, no database, no auth, and no LLM runtime** — "AI" in the
title describes the subject matter, not the implementation.

## Stack

TypeScript 5.8 · React 19 · Vite 6 · Tailwind CSS v4 (CSS-first, no config file) ·
lucide-react · SheetJS `xlsx` · jsPDF + jspdf-autotable. `bun.lock` is the checked-in
lockfile, but `npm` works fine (both `node` and `npm` are the practical toolchain here).

## Commands

```bash
npm run dev      # vite --port=3000 --host=0.0.0.0, HMR on
npm run build    # static build into dist/ — deployable to any static host
npm run preview  # serve dist/
npm run lint     # tsc --noEmit  <-- the ONLY quality gate. There are no tests.
```

`npm run clean` deletes `dist/` and a `server.js` that has never existed — vestigial.

## The five frameworks

`StandardId` is a closed union in `src/types.ts:1`:

| id | Framework |
|---|---|
| `iso-42001` | ISO/IEC 42001:2023 — AI Management System, Clauses 4–10 + Annex A |
| `owasp-llm` | OWASP Top 10 for LLM Applications (2025) — LLM01–LLM10 |
| `irgc-governance` | IRGC AI Risk Governance Framework (EPFL, 2024) — 4 phases |
| `sans-ir` | SANS AI Incident Response / MITRE ATLAS — 6-phase PICERL |
| `nist-ai-rmf` | NIST AI RMF 1.0 (AI 100-1) — Govern / Map / Measure / Manage |

## The five views

`ActiveTab` in `src/types.ts:3` drives everything. Tab buttons live in `Header.tsx:96-161`;
the view router is the conditional chain in `App.tsx:249-278`.

| Tab | Component | What it shows |
|---|---|---|
| `controls` | `ControlsExplorer.tsx` | Card grid, category filter pills, full-text search over title/clause/description/technical requirements |
| `markdown` | `MarkdownViewer.tsx` | 11 formal HTML tables from `tabularStandardsData.ts`, in-table row search, "Raw Text View" GFM pipe-text toggle, copy actions |
| `matrix` | `CrossFrameworkMatrix.tsx` | 6 governance domains × 5 frameworks + `recommendedAction` column |
| `checklist` | `ComplianceAuditChecklist.tsx` | Tri-state per-control status, computed readiness %, reset, own export menu |
| `glossary` | `GlossarySection.tsx` | 24 terms, 5 categories, search + per-term copy |

`glossary` and `matrix` render full-width and hide `StandardOverview`. The other three
render `StandardOverview` above the tab body.

## Where content lives

**All framework content is in `src/data/`. Never fetch the markdown docs at runtime.**

| Module | Exports |
|---|---|
| `src/data/standardsData.ts` | `STANDARDS_META` (5), `CONTROLS_DATA` (36 items), `CROSS_FRAMEWORK_MAPPINGS` (6) |
| `src/data/tabularStandardsData.ts` | `TABULAR_STANDARDS_DATA` (11 tables) |
| `src/data/rawMarkdown.ts` | `RAW_MARKDOWN_DOCS` (5 inlined markdown strings) |
| `src/data/glossaryData.ts` | `GLOSSARY_CATEGORIES`, `GLOSSARY_ITEMS` (24) |

The same five documents are **triplicated**: `docs/*.md` (canonical long-form), root
`*.md` (condensed stubs), and `src/data/*.ts` (what actually renders). Nothing keeps
them in sync — update all three when changing framework content.

## Adding content

Almost all content work is data-only; you should not need to touch a component.

**A control** — append to the right array in `CONTROLS_DATA`:

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
  impactOrSeverity: 'High',   // 'Critical' | 'High' | 'Moderate' | 'Low' | omit
  mappedStandards: [{ standard: 'NIST AI RMF', targetId: 'GOVERN 1.6' }],
},
```

`technicalRequirements` is the highest-value field — it is what turns a control from
prose into an actionable engineering checklist.

**A glossary term** — append to `GLOSSARY_ITEMS`, reusing an existing slug from
`GLOSSARY_CATEGORIES` or add the category.

**A table** — append a section to the matching entry in `TABULAR_STANDARDS_DATA`. The
renderer is generic over the fixed column shape (`reference`, `title`/`requirement`,
`description`, `implementation`).

**A mapping row** — append to `CROSS_FRAMEWORK_MAPPINGS` and populate all five framework
cells; a blank cell renders as an authoring bug.

**A whole framework** — extend the `StandardId` union, add `STANDARDS_META` +
`CONTROLS_DATA` entries, then add the id to **both** hard-coded `standardsList` arrays
(`App.tsx:29-35` and `Header.tsx:22-28`), plus `TABULAR_STANDARDS_DATA` and
`RAW_MARKDOWN_DOCS` entries. Because `CONTROLS_DATA` and `TABULAR_STANDARDS_DATA` are
typed `Record<StandardId, ...>`, TypeScript flags every site you miss.

Then run `npm run lint`.

## Export

`src/utils/exportUtils.ts` has three browser-only functions; all produce a file download
via Blob / `XLSX.writeFile` / `doc.save`. Nothing leaves the machine.

- `exportToCsv` — writes a UTF-8 BOM (`\uFEFF`) so Excel renders em-dashes correctly;
  RFC 4180 escaping; CRLF rows.
- `exportToExcel` — real multi-sheet workbook, auto-fit column widths (min 12, cell text
  capped at 55), sheet names sanitized to 31 chars with `:\/?*[]` stripped.
- `exportToPdf` — landscape A4, mm units, navy header banner with timestamp, one
  grid-themed table per section, `Page N of M` footers in `didDrawPage`.

`ExportMenu.tsx` is the reusable dropdown (mousedown click-outside + ARIA). Two
instances: `idPrefix="full-repo-export"` in the `App` banner, and a per-framework one
inside `ComplianceAuditChecklist`.

Full-repository exports are assembled in `App.tsx` (`handleExportAllExcel/Csv/Pdf`),
**not** in `exportUtils.ts`. Excel gets 8 sheets, CSV gets one flattened row set, PDF
gets a 3-section executive summary.

## Gotchas

- **Control counts disagree on purpose-ish.** `CONTROLS_DATA` has **36** items (ISO 9,
  OWASP 10, IRGC 6, SANS 6, NIST 5). `StandardMeta.totalControls` sums to **102** (the
  real published counts). The banner at `App.tsx:219` hard-codes **"104"** and is simply
  stale. Don't cite the banner. Derive counts, don't hard-code them.
- **`docs/` is decorative.** `StandardMeta.markdownPath` / `markdownFileName` point at
  it, but no code ever fetches those files.
- **The full-repo PDF truncates the glossary** to `GLOSSARY_ITEMS.slice(0, 15)`
  (`App.tsx:157`) — 9 of 24 terms are silently omitted. Excel and CSV include all.
- **Vestigial deps.** `@google/genai`, `express`, `dotenv`, `motion`, `react-markdown`,
  `autoprefixer`, `tsx`, `esbuild` are declared and locked but never imported.
  `metadata.json` declares `MAJOR_CAPABILITY_SERVER_SIDE_GEMINI_API`, which is
  unimplemented. There is **no LLM call anywhere in the running app**.
- **`AuditChecklistItem` (`types.ts:44-51`) is dead code** — declared, never imported.
- **`vite.config.ts`** honors `DISABLE_HMR=true` to kill HMR and file watching (prevents
  flicker during automated edits). It is the only env var the build actually reads.
- **Test anchors are deliberate.** ~30 stable `id`s were placed for automation. Prefer
  adding to that convention over inventing new selectors. See the companion
  `portal-architecture` skill for the full list.

---
name: portal-architecture
description: Use when making structural or refactoring changes in the ai-security-compliance React app - component tree, props flow, where to add a component, the src/data vs src/components vs src/utils split, the App.tsx view router, the types.ts contract, and the testable id attribute conventions. Covers how to extend views without breaking the single-layer design.
---

# Architecture — AI Security Compliance Portal

A **single-layer, single-page, props-driven React app**. No service layer, no store, no
context, no data fetching. Understanding that constraint is most of the job.

```
index.html  (mounts #root)
    │
    ▼
src/main.tsx          createRoot + StrictMode, 10 lines
    │
    ▼
App.tsx               root component — owns ALL top-level state
                      activeStandard · activeTab · searchQuery   (App.tsx:22-24)
    │
    ├── Header.tsx            ◄── framework pills, global search, 5 tab buttons
    │
    ├── [repository banner]   ── ExportMenu ──► utils/exportUtils.ts
    │
    └── VIEW ROUTER (App.tsx:249-278)
          ├── 'glossary'  ──► GlossarySection           (full width, banner hidden)
          ├── 'matrix'    ──► CrossFrameworkMatrix      (full width, banner hidden)
          └── other three:
                StandardOverview (meta)
                ├── 'controls'  ──► ControlsExplorer (meta, controls, searchQuery)
                ├── 'markdown'  ──► MarkdownViewer (meta)
                └── 'checklist' ──► ComplianceAuditChecklist (meta, controls)
```

## The layering rule

Content is **data**, presentation is **components**, side effects are **utils**. There is
no other place to put things.

| Directory | Owns | Rule |
|---|---|---|
| `src/data/` | All framework content. Pure exported constants, no React, no logic. | Adding a control or a table? Data only. |
| `src/components/` | Rendering + local view state. Read data via import or props. | Never add framework content inline in JSX. |
| `src/utils/` | Browser side effects (downloads, clipboard). No React. | Only place that touches `document`/`Blob`/`URL`. |
| `src/types.ts` | The shared contract. No runtime code. | Extend the union first when adding a framework. |

Components **import their data directly** from `src/data/*`. Only the *selected
framework's* data is passed down as props from `App`; cross-cutting data (glossary,
matrix) is imported at the point of use. Both patterns are correct — follow whichever
the neighbouring component already does.

## Props flow

Unidirectional and synchronous. `App` reads static records, passes slices as props.
Children derive their view with `.filter()` during render. There is no effect that
fetches, and no async boundary anywhere.

**Search is prop-drilled, not lifted.** `searchQuery` lives in `App` and reaches
`ControlsExplorer` through the header. `MarkdownViewer` (`tableSearch`) and
`GlossarySection` (`searchQuery`) each own **independent** search state. This is
intentional — do not "fix" it by hoisting all three into a context.

## Adding a view

1. Extend `ActiveTab` in `src/types.ts:3`.
2. Add a tab button in `Header.tsx:96-161` — copy an existing one, give it a unique `id`,
   use a `lucide-react` icon already in the bundle if you can.
3. Add a branch in the `App.tsx:249-278` router. Decide deliberately whether it is
   full-width (like `glossary`/`matrix`) or shows `StandardOverview` above it.
4. Create `src/components/YourView.tsx` with a local `Props` interface, named export
   matching the filename (`export function YourView`), and a JSDoc-free, comment-light
   style consistent with its neighbours.

## Adding a component

Follow the existing house style exactly:

- **Named exports** for components (`export function Header`), default export only for
  `App`.
- **Local `Props` interface** named `<Name>Props`, declared above the component.
- **One `useState` per independent concern**; group only when they change together
  (e.g. `MarkdownViewer`'s `viewSource` + `copied`).
- **Inline Tailwind**, no `cn()` helper, no CSS modules, no styled-components. Dark
  active states use `bg-slate-900 text-white`; inactive use `bg-slate-100 text-slate-600`.
  Severity colors are `rose` (Critical) / `amber` (High) / `sky` (Moderate).
- Derive during render, don't memoize. The datasets are tiny; `.filter()` on every
  render is free and far more readable than a `useMemo` with a dependency array.

## Testable id convention

~30 stable `id` attributes were placed on interactive elements specifically for
end-to-end automation. **Extend this convention; don't invent parallel selectors.**

Static anchors:

```
ai-compliance-app                              repository-banner
compliance-header                              global-search-input
tab-controls-explorer                          tab-markdown-viewer
tab-cross-matrix                               tab-compliance-checklist
tab-glossary-section                           standard-overview-card
controls-explorer-section                      table-structural-documentation-container
search-inside-tables                           btn-copy-specification
btn-toggle-table-source                        btn-copy-table-text
cross-matrix-section                           compliance-checklist-section
ai-security-glossary-section                   glossary-search-input
```

Generated patterns:

```
btn-nav-standard-{StandardId}                  control-card-{ControlItem.id}
filter-category-{category-slug}                table-section-{index}
glossary-item-{GlossaryItem.id}                btn-copy-glossary-{GlossaryItem.id}
btn-glossary-cat-{category-slug}               {idPrefix}-btn-{excel|csv|pdf}
```

Category and id slugs are produced with `.toLowerCase().replace(/\s+/g, '-')`. Match
that when you add a new one, or the id scheme will fork.

`ExportMenu.tsx` additionally carries ARIA on the trigger, the menu, and each item — keep
that intact if you touch it.

## TypeScript posture

`tsconfig.json` is **permissive**: no `strict`, no `noUnusedLocals`, no
`noImplicitAny`, no `include`/`exclude`. `npm run lint` (`tsc --noEmit`) therefore
typechecks loosely across every file in the tree, `vite.config.ts` included.

`CONTROLS_DATA` and `TABULAR_STANDARDS_DATA` are typed `Record<StandardId, ...>`, which
is what makes the union useful — adding a `StandardId` produces compile errors at every
site that must be updated. Leverage that; don't switch them to `Partial<Record<...>>` to
silence an error.

Two deliberate `as any` casts live in `exportUtils.ts:164` and `:175`
(`internal.getNumberOfPages()`, `lastAutoTable`) because jsPDF's typings don't expose
them. Leave them unless you're prepared to write a module augmentation.

## Refactoring checklist

Before calling a structural change done:

- [ ] `npm run lint` passes
- [ ] `npm run build` succeeds
- [ ] Every new interactive element has a stable `id` following the existing patterns
- [ ] Data changes went into `src/data/`, not into a component
- [ ] Framework content updated in `docs/*.md`, root `*.md`, **and** `src/data/*.ts`
- [ ] No new `id` duplicates an existing one
- [ ] No new dependency added without an actual import

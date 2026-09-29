---
name: portal-state-memory
description: Use when working with state, storage, caching, or persistence in the ai-security-compliance React app - the useState inventory, the ephemeral audit checklist statuses, readiness score calculation, the absence of localStorage/sessionStorage/indexedDB, and how to add durable state without breaking the offline export model.
---

# State & Memory — AI Security Compliance Portal

## The headline: nothing persists

**There is no memory layer in this application.** No database, no vector store, no cache,
no `localStorage`, no `sessionStorage`, no `indexedDB`, no cookies, no server session.
Zero matches for any of those in `src/`.

All state is ephemeral React `useState`, destroyed on every page refresh. The **only**
durable artifact the app produces is a file the user downloads.

This is a deliberate property, not an oversight. For a tool that records audit-readiness
status against real controls, statelessness means no assessment data is ever retained on
a shared machine. See [Adding persistence](#adding-persistence-without-breaking-the-model)
before changing that.

## Complete state inventory

| State | Type | Owner | Purpose |
|---|---|---|---|
| `activeStandard` | `StandardId` | `App.tsx:22` | Selected framework, default `'iso-42001'` |
| `activeTab` | `ActiveTab` | `App.tsx:23` | Selected view, default `'controls'` |
| `searchQuery` | `string` | `App.tsx:24` | Global search; passed to `ControlsExplorer` only |
| `selectedCategory` | `string` | `ControlsExplorer.tsx:12` | Category pill filter, default `'All'` |
| `statuses` | `Record<ControlId, Status>` | `ComplianceAuditChecklist.tsx:14-23` | **The only real application state** |
| `viewSource` | `boolean` | `MarkdownViewer.tsx:20` | Raw GFM text vs rendered tables |
| `tableSearch` | `string` | `MarkdownViewer.tsx:21` | In-table row filter |
| `copied` | `boolean` | `MarkdownViewer.tsx:22` | Copy-confirmation flash |
| `filter` | `string` | `CrossFrameworkMatrix.tsx:8` | Matrix framework filter |
| `copied` | `boolean` | `CrossFrameworkMatrix.tsx:9` | Copy-confirmation flash |
| `searchQuery` | `string` | `GlossarySection.tsx:20` | Glossary search (independent of `App`'s) |
| `selectedCategory` | `string` | `GlossarySection.tsx:21` | Glossary category (independent of `ControlsExplorer`'s) |
| `copiedId` | `string \| null` | `GlossarySection.tsx:22` | Which term's copy button to confirm |
| `isOpen` | `boolean` | `ExportMenu.tsx:21` | Dropdown open state |

Three separate `searchQuery` / `selectedCategory` pairs exist on purpose — each view
filters its own content. They are **not** meant to be unified. Lifting them into context
would couple unrelated views and is a regression, not an improvement.

`copied` and `copiedId` are ephemeral UI acknowledgements that clear on their own timer.
Do not persist them.

## The audit checklist — the one interesting state

`ComplianceAuditChecklist.tsx` is the only component with meaningful, user-authored state.

**Type** — `Record<string, 'compliant' | 'in_progress' | 'not_started'>` keyed by
`ControlItem.id`, so it is a sparse map rather than an array. The union is declared inline
at line 14; it duplicates the `status` field of `AuditChecklistItem` in `types.ts:49`,
which is itself **dead code** (declared, never imported anywhere). The inline union is
what actually compiles.

**Seeding** — the lazy `useState` initializer at lines 14-23 walks `controls` and
fabricates a realistic starting posture: index 0 and 1 → `compliant`, index 2 →
`in_progress`, everything else → `not_started`.

> ⚠️ **This is a trap for new standards.** The initializer closes over the `controls`
> prop but only runs **once**, on mount. Because `App` renders `ComplianceAuditChecklist`
> without a `key`, switching frameworks does **not** remount it — the `statuses` map keeps
> pointing at the *previous* framework's control ids, and the readiness score silently
> computes against a mismatched `total`. Switching to OWASP can display "0% compliant" or
> a bogus denominator depending on id collisions. `resetAll()` (line 35) rebuilds the map
> from the current `controls` and is the only in-app escape hatch. If you touch this
> component, consider adding `key={meta.id}` at the `App.tsx:272` call site, or keying
> state by `meta.id`.

**Mutations** — `toggleStatus(id, newStatus)` (line 31) uses the functional updater form
`setStatuses(prev => ({ ...prev, [id]: newStatus }))`. Always use the functional form
here; the object spread is what makes it correct under React 19 batching.

**Derived values** — all recomputed during render, never stored:

```ts
const total = controls.length;
const compliantCount   = Object.values(statuses).filter(s => s === 'compliant').length;
const inProgressCount  = Object.values(statuses).filter(s => s === 'in_progress').length;
const notStartedCount  = Object.values(statuses).filter(s => s === 'not_started').length;
const readinessPercent = Math.round((compliantCount / (total || 1)) * 100);
```

Note the `|| 1` guard against divide-by-zero, and note that the three `*Count` values sum
to the number of **keys in `statuses`**, which is not necessarily `total` — another
symptom of the stale-map problem above. `notStartedCount` is computed but the readiness
score only credits `compliant`; in-progress work contributes nothing to the percentage.

**Reset** — `resetAll()` (line 35) rebuilds every entry as `not_started`.

## Derived-not-stored, elsewhere

Most of this app derives during render instead of storing. Keep it that way — the
datasets are small enough that memoization buys nothing and costs readability.

| Location | Derivation |
|---|---|
| `ControlsExplorer.tsx:15` | `categories` = `['All', ...new Set(controls.map(c => c.category))]` |
| `ControlsExplorer.tsx:18-28` | `filteredControls` = category AND search intersection |
| `App.tsx:26-27` | `currentMeta` / `currentControls` from `activeStandard` |
| `MarkdownViewer.tsx:101,211` | Table sections narrowed by `tableSearch` |
| `ControlsExplorer.tsx:30-41` | `getSeverityBadge()` maps severity to a class string |

**Search matching** is always `.toLowerCase().includes(query)` over plain strings, with
`searchQuery.toLowerCase().trim()`. There is no tokenization, no fuzzy matching, no regex,
and no indexing. If a query is empty, everything matches. Keep the signature consistent
if you extend it — a heavier matcher is a real UX change and should be deliberate.

## Adding persistence without breaking the model

If checklist persistence is genuinely required, `localStorage` keyed by `StandardId` is
the natural fit. Sketch:

```ts
const STORAGE_KEY = 'compliance-audit-status';   // { [StandardId]: Record<ControlId, Status> }

// lazy init, per-framework
const [statuses, setStatuses] = useState(() => {
  const all = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '{}');
  return all[meta.id] ?? seedFrom(controls);
});

// write-through on every change
useEffect(() => {
  const all = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '{}');
  all[meta.id] = statuses;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
}, [meta.id, statuses]);
```

Rules if you do this:

1. **Namespace by `StandardId`.** A single flat key will collide across frameworks.
2. **Parse defensively.** Wrap in `try/catch` and fall back to seeding — a corrupted or
   hand-edited value must not white-screen the app.
3. **Reconcile on load.** Drop `statuses` keys whose `ControlItem.id` no longer exists in
   `controls`, so removing a control from `src/data/` doesn't leave orphans inflating the
   counts.
4. **Add a visible way to clear it.** Once state is durable, users need an escape hatch
   beyond `resetAll()`.
5. **Consider whether you should.** Persisted audit status is potentially sensitive
   assessment data on a shared machine. The current stateless design avoids that
   question entirely. If you persist, say so in the UI.

Do **not** add a server, a database, or an API client to "solve" state. This app is
static by design; a backend would be a different application and would bring auth, secret
management, and a network attack surface that currently do not exist.

## Debugging state

- Nothing survives a refresh. If a user reports losing work, that's expected behavior, not
  a bug.
- React StrictMode is on (`main.tsx`). Effects run twice in dev — irrelevant today since
  there are no effects, but relevant the moment you add the persistence sketch above.
- `tsconfig.json` has no `strict`, so a mistyped state key will compile fine. If you widen
  a status union, check every `switch`/comparison site by hand.

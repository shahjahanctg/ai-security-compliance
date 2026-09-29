---
name: portal-security
description: Use when reviewing or changing the security posture of the ai-security-compliance app - XSS surface, the absence of auth/backend/network calls, secret and env var handling, the vestigial @google/genai and express dependencies, the xlsx 0.18.5 advisory, export injection in CSV/XLSX/PDF, and how to add new features without silently introducing a network or eval surface.
---

# Security — AI Security Compliance Portal

## Read this first

**This repository contains security *content*, not security *implementation*.** It is a
reading and export tool. The OWASP/NIST/ISO text in `src/data/` describes controls an
organization must implement; none of them are implemented here. Do not report "this app
is compliant with OWASP" on the basis of its own data files.

## Posture summary

| Area | Status |
|---|---|
| Authentication / sessions | **None.** No login, tokens, cookies, or identity. All content is public. |
| Authorization / RBAC | **None.** Every view renders unconditionally. |
| Input validation | **None, and correctly so.** Search inputs are `useState` strings used only in `.toLowerCase().includes()`. No schema validation exists because no input is ever persisted, transmitted, or executed. |
| XSS | **Strong by construction.** No `dangerouslySetInnerHTML`, no `innerHTML`, no `eval`, no `new Function`, no `document.write` anywhere in `src/`. All output goes through JSX, which escapes by default. The only `eval()` match in the repo is a documentation string in `tabularStandardsData.ts:315`. |
| Network egress | **Zero.** No `fetch`, no `axios`, no `XMLHttpRequest`, no `WebSocket`. Runs fully offline. |
| CSRF / CORS / clickjacking | Not applicable — no server, no session, no outbound requests. |
| Secrets in code | **None.** |
| Cryptography | Not used. `crypto` appears only inside documentation strings. |
| Rate limiting | Not applicable — no server. |
| Supply chain | 8 declared dependencies are never imported. See below. |

## The rules that keep this safe

Any change here is **breaking the app's security model** unless you can argue otherwise.
If a diff introduces any of these, stop and flag it:

- `dangerouslySetInnerHTML`, `innerHTML`, `outerHTML`, `insertAdjacentHTML`
- `eval`, `new Function`, string-form `setTimeout`/`setInterval`
- `document.write`
- `fetch`, `axios`, `XMLHttpRequest`, `WebSocket`, `EventSource`, `navigator.sendBeacon`
- a new `import.meta.env.SECRET_*` or `process.env.SECRET_*` read in `src/`
- `localStorage` writes of anything user-authored (see the companion
  `portal-state-memory` skill — it changes the confidentiality profile)
- an `<iframe>`, `<object>`, or `<embed>`

### If you must render markdown or raw text as HTML

The app currently **avoids** this problem: `MarkdownViewer` renders structured
`<table>` elements from typed objects and puts raw GFM in a `<pre>` block, rather than
running markdown through a renderer. `react-markdown` is declared in `package.json` but
**never imported** — if you wire it up, pass `skipHtml` and keep `remark-gfm` output in
JSX, never through `dangerouslySetInnerHTML`.

### If you must add input

There is no validation layer, so validation is on you at the point of use. Rules:

- Never interpolate a search string into a selector, `id`, class name, or URL without
  sanitizing. `ControlsExplorer.tsx:54` derives an `id` from a **compile-time** category
  string — that is safe. The moment a category comes from user input, it isn't.
- `.toLowerCase().includes()` is not injection-proof if the result ever reaches a sink.
  Keep search results flowing only into render paths.
- Length-cap any string that ends up in a `Blob` filename.

## Export sinks — the real attack-adjacent surface

Three functions take caller-supplied strings and write files. Inspect these first when
reviewing anything that builds export data.

**`exportToCsv` (`exportUtils.ts:16-42`)**
- Escapes `,` `"` `\n` `\r` per RFC 4180 and doubles embedded quotes — correct.
- Prefixes `\uFEFF` so Excel renders Unicode properly. Intentional, not a stray BOM.
- ⚠️ **Does not neutralize formula injection.** A cell beginning with `=`, `+`, `-`, or
  `@` is executed by Excel and Google Sheets on open. All current content is authored
  by this repo, so there is no live exposure — but if you ever add user-authored content
  (a notes field on the audit checklist is the obvious candidate), prefix those cells
  with `'` or wrap in a tab. This is the single most likely real vulnerability this app
  could acquire.

**`exportToExcel` (`exportUtils.ts:47-74`)**
- Calls `XLSX.writeFile`, which triggers a download; SheetJS does not execute formulas, so
  formula-injection risk is lower than CSV, but is not zero across spreadsheet readers.
- Sanitizes sheet names: strips `:\/?*[]` and truncates to 31 chars.
  `App.tsx:69` sanitizes again before passing — redundant but harmless.
- Column-width computation caps cell text at 55 chars for measurement only; the written
  value is untouched.

**`exportToPdf` (`exportUtils.ts:79-184`)**
- Two deliberate `as any` casts at lines 164 and 175 for jsPDF internals
  (`internal.getNumberOfPages()`, `lastAutoTable`). Not a vulnerability, but any jsPDF
  major upgrade should re-check them.
- Content is drawn as text, not rendered as HTML. No injection path.

**`ExportMenu` filenames** are hard-coded string literals at the `App.tsx` call sites. If
you make a filename dynamic, sanitize it — it flows into the `download` attribute.

## Supply chain

**Declared but never imported** — dead weight and needless advisory surface:

```
@google/genai   express   dotenv   motion   react-markdown
autoprefixer    tsx       esbuild  (devDependencies)
```

`metadata.json:5` declares `"majorCapabilities": ["MAJOR_CAPABILITY_SERVER_SIDE_GEMINI_API"]`.
That capability is **unimplemented** — there is no server code, no Gemini call, no
prompt, no agent, no MCP server anywhere in the repo. It is leftover from the Google AI
Studio scaffold the project was generated from. Same for `package.json:10`'s
`"clean": "rm -rf dist server.js"`, referencing a `server.js` that has never existed.

**`xlsx@0.18.5` — the one dependency to watch.** This is the abandoned npm community build
of SheetJS (the project moved off npm) and carries known advisories against *malicious
XLSX input files*. Current risk is **low** because the app only ever **writes** workbooks
from its own hard-coded data and never **parses** an uploaded one.

> If you add a feature that imports a user-supplied `.xlsx` — e.g. bulk-loading a control
> register — migrate off the npm `xlsx` package first. That change turns a low-risk
> dependency into a genuine file-parsing attack surface and is the most likely security
> trigger in this codebase.

## Secrets and environment variables

- `.gitignore` covers `.env*` with `!.env.example` — correct and complete for a
  client-only app. **Never weaken this to unignore a real `.env`.**
- `.env.example` documents `GEMINI_API_KEY` and `APP_URL`. **Neither is read by any
  source file.** There is zero `import.meta.env` and zero `process.env` usage in `src/`.
- The only environment variable that affects anything is `DISABLE_HMR`
  (`vite.config.ts:17-19`), a build-harness toggle. Setting it to `'true'` disables HMR
  and file watching.
- ⚠️ **Never put a secret in `src/`.** Everything in `src/` is bundled into a public
  static asset. A `GEMINI_API_KEY` in a source file ships to every visitor. If a
  capability genuinely needs a secret, it needs a server — which this app does not have.

## Deployment notes

`npm run build` emits a fully static `dist/`. Hosted anywhere, it is a content site with
no backend to compromise. Practical hardening for a public deployment:

- Serve over HTTPS.
- Set a strict `Content-Security-Policy`. The app needs no `unsafe-eval` in production
  and no external script origins — a tight policy is achievable.
- Consider `X-Content-Type-Options: nosniff`.
- The app works offline; there is no third-party font, analytics, or CDN script to
  subvert. Keep it that way — adding an external script is the most plausible way to
  introduce a supply-chain XSS path into this codebase.

## Reporting posture

The banner in `App.tsx:211-221` renders an **"Audit Ready"** badge. Read that as a
*documentation-completeness* claim, not a control-implementation claim. If asked to
certify this app against a framework, the correct answer is that it is a static reference
with no security controls implemented, and the checklist state it tracks is local,
unauthenticated, and not persisted.

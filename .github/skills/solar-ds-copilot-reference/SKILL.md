---
name: solar-ds-copilot-reference
description: "Complete reference for the Solar DS Copilot VS Code extension (@solar). Use when: writing course content about @solar, verifying extension features or capabilities, describing commands (/initiate /preview /validate /share /status), explaining how the extension works internally, writing exercises or quizzes about @solar, describing the knowledge base (patterns, components, scaffolds, conventions), explaining the prompt builder or intent detection, describing deployment or validation flows. Contains architecture, commands, knowledge base structure, user flows, and source code pointers."
---

# Solar DS Copilot — Extension Reference & Lookup Guide

> **IMPORTANT:** This skill is a research guide, not a frozen reference.
> The extension (`weareplanet/solar-ds-copilot`) is under active development.
> All specific numbers, file lists, and behavioral details MUST be verified
> against the **live repo** before being cited in course content.
>
> **How to access the live repo:**
> Use `github_repo` tool with `repo: "weareplanet/solar-ds-copilot"` and a search query.
>
> **Last structural review:** March 2026

## Verification Protocol

Before writing any course content that references specific extension details:

1. **For command behavior:** Search `src/handler.ts` in the live repo
2. **For knowledge base counts/content:** Search files in `src/knowledge/` (`conventions.ts`, `patterns.ts`, `components.ts`, `scaffolds.ts`)
3. **For scaffold file list:** Search `src/knowledge/scaffolds.ts` for `SCAFFOLDS` array
4. **For validation rules:** Search `src/validator.ts`
5. **For deployment flow:** Search `src/deployer.ts`
6. **For auth flow:** Search `src/authHelper.ts`
7. **For prompt composition:** Search `src/promptBuilder.ts`
8. **For the training plan:** Search `docs/PLAN-TRAINING-ACADEMY.md`

If any fact below contradicts the live repo, the **live repo wins**.

## What Is It

A VS Code extension that registers the `@solar` chat participant inside GitHub Copilot Chat. Users describe screens in plain English and `@solar` generates complete, running Solar Design System apps — no coding knowledge required.

**Publisher:** Internal to `@weareplanet` org
**ID:** `solar-ds.solar` (registered in `extension.ts`)
**Icon path:** `icon.png` in extension root

---

## Architecture Overview (Stable Structure)

The following file/module structure is architecturally stable. Individual file contents evolve but the overall layout is established.

### Entry Point (`src/extension.ts`)
- Registers the `@solar` chat participant via `vscode.chat.createChatParticipant('solar-ds.solar', handleChatRequest)`
- On activation: checks GitHub auth, resolves user identity, resumes pending initiate if needed
- First-run welcome message: "Welcome to Solar DS! Type @solar in Copilot Chat to start building."

### Chat Handler (`src/handler.ts`) — VERIFY COMMANDS FROM LIVE REPO
The main handler (`handleChatRequest`) routes commands. **Always check `src/handler.ts` for the current command list before writing content.**

Last known commands:

| Command | Handler Function | What It Does |
|---------|-----------------|--------------|
| `/initiate` | `handleInitiate()` | Full project setup: name → scaffold files → npm install → start dev server → open Simple Browser |
| `/preview` | `handlePreview()` | Re-opens Simple Browser, restarts dev server if stopped |
| `/validate` | `handleValidate()` | Checks active file against convention rules |
| `/share` | `handleShare()` | Builds project → deploys static snapshot to Vercel → returns public URL |
| `/status` | `handleStatus()` | Shows environment diagnostics (auth, workspace, dev server status) |
| *(no command)* | `handleGeneralChat()` | Injects Solar DS context → sends to LLM → creates files from response |

### Auth Flow (`src/authHelper.ts`)
1. GitHub sign-in + `@weareplanet` org membership verification
2. GitHub Packages token check in `~/.npmrc`
3. If missing, runs interactive auth flow to configure npm access

### Prompt Builder (`src/promptBuilder.ts`)
Composes the system prompt dynamically based on user input:
1. **Always includes:** `CONVENTIONS_PROMPT` (base coding rules)
2. **Intent detection:** `detectIntents()` scans user prompt for keywords → selects relevant patterns and component names
3. **Pattern injection:** Matching `PatternEntry` objects (code templates) are appended
4. **Component inventory:** Matching `ComponentEntry` metadata is appended

The `INTENT_MAP` maps keywords to patterns/components:
- `dashboard`, `navigation`, `nav` → Navigation Context, Sidebar, AppBar patterns
- `form`, `input`, `textfield` → Form Page, react-hook-form patterns
- `table`, `datagrid`, `grid` → DataGrid Page patterns
- etc.

### Scaffolder (`src/scaffolder.ts`)
- `createScaffoldFiles()` — writes scaffold templates to workspace
- `createFilesFromLLMResponse()` — parses LLM output for `// File: path` code blocks, creates files
- Only creates new files — never overwrites existing ones

### Dev Server (`src/devServer.ts`)
- Runs `npm install && npm run dev` in a VS Code terminal
- Detects port (default: 5173) from Vite output
- Opens VS Code Simple Browser at the dev URL

### Deployer (`src/deployer.ts`)
- Runs `npx vercel deploy` on the built `dist/` folder
- Generates random 4-char suffix for stable project names
- Persists deployment history in workspace state

### Validator (`src/validator.ts`) — VERIFY RULE COUNT FROM LIVE REPO
- **Verify:** Search `src/validator.ts` for current rule count (last known: 19+)
- Regex rules checking Solar DS conventions
- Checks: import paths, `sx` prop usage, `slotProps` API, theme wrapper, icon variants, elevation, etc.
- `formatViolationsMarkdown()` renders results in chat

---

## Knowledge Base (VERIFY COUNTS FROM LIVE REPO)

Four TypeScript files in `src/knowledge/`. **All counts below are approximate — always verify from the live repo before citing in course content.**

### `src/knowledge/conventions.ts`
- `CONVENTIONS_PROMPT` — the base system prompt text
- **Verify:** Search for section headers to get current rule count
- Key stable rules (architecturally unlikely to change):
  - Import from `@weareplanet/solar-ds-react` (not `@mui/material`)
  - Icons from `@weareplanet/solar-ds-react/icons/NameRounded`
  - Use `sx` prop, never `styled()` or `makeStyles()`
  - Use `slotProps` (not `InputProps`/`inputProps`)
  - Wrap app in `PlanetWrapper` theme provider
  - Use `Grid` with `size={{ xs: 12, md: 6 }}` (v6 API)

### `src/knowledge/components.ts`
- `COMPONENTS` array — `ComponentEntry` objects with `{ name, description, recommendedProps, avoidProps }`
- **Verify:** Search for `COMPONENTS` array to get current component count (last known: 75+)
- `formatComponentInventory()` — formats entries for injection into the system prompt

### `src/knowledge/patterns.ts`
- `PATTERNS` array — `PatternEntry` objects (complete TSX code templates)
- **Verify:** Search for `PATTERNS` array to get current pattern count (last known: 8)
- Each entry: `{ name, keywords, code }`
- Last known patterns: Navigation Context, Header (AppBar), Snackbar, Error Dialog, Form Page, DataGrid Page, Responsive Layout, Page Header with Toolbar

### `src/knowledge/scaffolds.ts`
- `SCAFFOLDS` array — `ScaffoldTemplate` objects
- **Verify:** Search for `SCAFFOLDS` array to get current file count (last known: 24)
- Each entry: `{ name, fileName, keywords, template }`
- Also contains `TEMPLATES` array — template definitions for the Get Started wizard

---

## User Flows (for Course Content)

### Flow 1: First-Time Setup
1. Install VS Code, Node.js, GitHub Copilot Chat extension
2. Download `.vsix` from GitHub Releases
3. Install via Extensions panel → `...` menu → "Install from VSIX…"
4. Sign in to GitHub in VS Code (Accounts icon)
5. Open Copilot Chat panel (`Cmd+Shift+I`)
6. Type `@solar /initiate My App Name`
7. Extension: verifies auth → scaffolds 24 files → runs npm install → starts Vite → opens Simple Browser

### Flow 2: Building Pages (After Setup)
1. Describe what you want: `@solar create a settings page with notification toggles`
2. Extension: detects intent → builds system prompt (conventions + matching patterns + components) → sends to LLM → parses response → creates files → adds route → navigates preview
3. Existing files are never touched — only new files created

### Flow 3: Auto-Initiate (Empty Workspace)
1. User types a generative prompt in an uninitialized workspace
2. Extension detects no Solar DS project → auto-scaffolds first → then generates the requested page
3. Seamless experience — user never needs to explicitly run `/initiate`

### Flow 4: Iterative Refinement
1. User sees preview in Simple Browser
2. Turns on `</>` **Share with Agent** toggle → Copilot can read the rendered page
3. Clicks ↖ **Add element to chat** to point at specific UI elements
4. Describes changes: "make the header blue" or "add a search field to the toolbar"

### Flow 5: Validation
1. Open a `.tsx` file → type `@solar /validate`
2. Extension runs 19+ regex rules against the file
3. Shows violations with fix suggestions in chat

### Flow 6: Sharing/Deployment
1. Type `@solar /share`
2. Extension builds the project (`npx vite build`) → deploys to Vercel (`npx vercel deploy`)
3. Returns a public URL anyone can open in their browser
4. Running `/share` again updates the same URL

---

## Example Prompts (Verified from README)

```
@solar create a settings page with profile fields and notification toggles
@solar add a header with navigation links and a dark mode toggle
@solar build a dashboard with stats cards and a recent transactions table
@solar create a landing page with a hero banner, features section, and testimonials
@solar add a modal dialog for switching between accounts
```

After setup, `@solar` prefix is optional:
```
add a settings page with notification toggles and a profile section
create a page that shows a list of transactions in a table
add a login screen with email and password fields
```

---

## Technical Details (for Accuracy)

### Files Created by `/initiate` — VERIFY FROM LIVE REPO

**Always verify by searching `src/knowledge/scaffolds.ts` for the current `SCAFFOLDS` array before citing the file list or count.**

Last known scaffold files (may have changed):

| Category | File |
|----------|------|
| Theme | `src/theme/ThemeProvider.tsx` |
| Entry | `src/main.tsx` |
| Router | `src/App.tsx` |
| Styles | `src/styles.css` |
| DS helpers | `src/components/ui/solar.tsx` |
| Icon helper | `src/components/ui/MaterialSymbol.tsx` |
| HTML | `index.html` |
| Get Started page | `src/pages/GetStartedPage.tsx` |
| Template data | `src/data/templates.ts` |
| Scroll hook | `src/hooks/useScrollPosition.ts` |
| Visibility hook | `src/hooks/useInView.ts` |
| Example data | `src/data/exampleMockData.ts` |
| Example layout | `src/pages/examples/components/ExampleLayout.tsx` |
| Key-value row | `src/pages/examples/components/KeyValueRow.tsx` |
| Transactions list | `src/pages/examples/TransactionsPage.tsx` |
| Transaction detail | `src/pages/examples/TransactionDetailPage.tsx` |
| Add Payment form | `src/pages/examples/AddPaymentPage.tsx` |
| Settings page | `src/pages/SettingsPage.tsx` |
| Mock data | `src/data/mockData.ts` |
| Navigation context | `src/contexts/NavigationContext.tsx` |
| Build config | `vite.config.ts` |
| Package manifest | `package.json` |
| TypeScript config | `tsconfig.json` |
| VS Code settings | `.vscode/settings.json`, `.vscode/tasks.json`, `.vscode/launch.json` |
| Copilot rules | `.github/copilot-instructions.md` |

### Prerequisites

| What | Why | Minimum Version |
|------|-----|----------------|
| VS Code | Editor | 1.93.0+ |
| Node.js | Dev server | 18+ (LTS) |
| GitHub Copilot Chat | AI backend | Latest |
| GitHub account | Auth + npm | `@weareplanet` org member |

### Extension Project Structure (Source Repo — Stable Layout)

```
src/
├── extension.ts        Activation, participant registration
├── handler.ts          Chat request handler (commands + general chat)
├── authHelper.ts       GitHub auth + org verification + ~/.npmrc
├── userIdentity.ts     User identity resolution
├── devServer.ts        npm install + dev server with port detection
├── consumerFolder.ts   Multi-root workspace folder detection
├── deployer.ts         Build + deploy to Vercel
├── promptBuilder.ts    System prompt composition from knowledge base
├── scaffolder.ts       File creation via workspace.fs
├── telemetry.ts        Batched telemetry client
├── feedbackLinks.ts    Contextual feedback form links
├── validator.ts        Convention violation checks
├── folderManager.ts    Workspace folder creation + pending initiate
├── updateChecker.ts    Version update notifications
└── knowledge/
    ├── conventions.ts  Coding rules (CONVENTIONS_PROMPT)
    ├── patterns.ts     UI pattern templates
    ├── components.ts   Component entries
    └── scaffolds.ts    Scaffold file templates
```

Note: New source files may have been added. Search the live repo `src/` directory if you need a complete listing.

---

## Quick Verification Reference

Use `github_repo` tool with `repo: "weareplanet/solar-ds-copilot"` and these queries:

| What you need | Search query / file to read |
|--------------|---------------------------|
| Current commands | `src/handler.ts` — look for `case '/commandName'` or handler function names |
| Command behavior | `src/handler.ts` — read the specific handler function |
| Pattern list | `src/knowledge/patterns.ts` — search for `PATTERNS` array |
| Pattern count | `src/knowledge/patterns.ts` — count entries in `PATTERNS` |
| Component list | `src/knowledge/components.ts` — search for `COMPONENTS` array |
| Component count | `src/knowledge/components.ts` — count entries |
| Scaffold files | `src/knowledge/scaffolds.ts` — search for `SCAFFOLDS` array |
| Scaffold count | `src/knowledge/scaffolds.ts` — count entries |
| Coding conventions | `src/knowledge/conventions.ts` — read `CONVENTIONS_PROMPT` |
| Validation rules | `src/validator.ts` — look for rule definitions |
| Auth flow | `src/authHelper.ts` |
| Deployment target | `src/deployer.ts` |
| Prompt composition | `src/promptBuilder.ts` — how intent detection and injection work |
| Training plan | `docs/PLAN-TRAINING-ACADEMY.md` |
| User-facing docs | `README.md` |
| Data/security | `docs/DATA-RISKS.md` |
| Project structure | `docs/CONTRIBUTING.md` |

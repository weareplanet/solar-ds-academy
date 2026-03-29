# Solar Product Academy — Workspace Instructions

## Project Purpose

This is the **Solar Product Academy** — a training course that teaches PMs, POs, and Product Designers (zero coding knowledge) how to use the **Solar DS Copilot** VS Code extension (`@solar`) to build prototypes.

**Repository:** `weareplanet/solar-ds-academy` (Next.js app, auth-gated via MSAL.js)

## Source of Truth

The course content is based on the **Solar DS Copilot** extension. The authoritative source for all extension features, capabilities, and behavior is the **live** internal repo:

- **Repo:** `weareplanet/solar-ds-copilot` (private, GitHub)
- **Access:** Use the `github_repo` tool with `repo: "weareplanet/solar-ds-copilot"` to search for any extension details
- **Training plan:** `docs/PLAN-TRAINING-ACADEMY.md` in that repo contains the original 6-module training plan

### Live Verification Policy

The extension is under active development. **Never rely solely on cached facts in skill files or these instructions.** Before writing or updating course content:

1. **Always verify** specific numbers (component count, pattern count, scaffold file count, rule count) by searching the live repo
2. **Always verify** command behavior by reading the current handler source (`src/handler.ts`)
3. **Always verify** knowledge base content by reading `src/knowledge/*.ts` files
4. Use the skill file as a **lookup guide** (where to find things), not as a frozen reference
5. If a fact in the skill file contradicts the live repo, the **live repo wins**

## Key Extension Facts (Quick Reference)

Stable architectural facts (unlikely to change):
- **Chat participant:** `@solar` inside GitHub Copilot Chat
- **Prompt builder:** `src/promptBuilder.ts` — composes system prompt from conventions + patterns + component inventory based on intent detection
- **Live preview:** Vite dev server at localhost:5173, opened in VS Code Simple Browser
- **Auto-initiate:** If workspace is empty and user describes a page, @solar scaffolds automatically before generating
- **File safety:** @solar only creates new files — never overwrites existing ones
- **Auth flow:** GitHub org membership check (`@weareplanet`) + GitHub Packages token for npm

Volatile facts (verify from live repo before citing in content):
- **Commands:** Check `src/handler.ts` for current command list (last known: `/initiate`, `/preview`, `/validate`, `/share`, `/status`)
- **Project scaffold:** Check `src/knowledge/scaffolds.ts` for current file count (last known: 24 files)
- **Built-in knowledge:** Check `src/knowledge/` for current counts (last known: 8 patterns, 75+ components, 24 scaffolds)
- **Validation rules:** Check `src/validator.ts` for current rule count (last known: 19+ rules)
- **Deployment:** Check `src/deployer.ts` for current deployment target (last known: Vercel)

## Course Structure

6 modules in `content/module-XX/`:
- `slides.md` — Key concepts as slide-style content
- `exercise.md` — Hands-on exercise with deliverables

Quiz data lives in `src/lib/quizData.ts`.

## Content Guidelines

- Write for non-technical users (PMs, POs, designers)
- Never use jargon without explaining it
- Every feature claim must be verifiable from the solar-ds-copilot source code
- Use `@solar` (not "the extension" or "Solar DS Copilot") when referring to user-facing interactions
- Screenshots and step-by-step instructions are preferred over text descriptions

## Development Workflow

Always follow this workflow when making changes:

1. **Branch:** Create a branch (`content/module-XX`, `fix/...`, or `feat/...`) — never commit directly to `main`
2. **Build:** Run `npm run build` — the static export must succeed with no errors
3. **Live preview:** Run `npm run dev`, open `http://localhost:3000`, and visually verify every affected page renders correctly before committing
4. **Commit & push** the branch
5. **Open a PR** against `main`

**Never skip the live-preview validation step.** Build success alone is not sufficient — pages can still 500 at runtime due to stale caches or rendering errors. If you see a 500 error, clear the cache (`rm -rf .next`) and restart the dev server.

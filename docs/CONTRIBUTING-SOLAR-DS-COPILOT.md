# Contributing to Solar Product Academy

## Overview

This is a **Next.js 15** static site (deployed to GitHub Pages) that teaches PMs, POs, and Product Designers how to use the `@solar` VS Code extension. The course content must always reflect the current state of the extension — see [Content Accuracy](#content-accuracy) below.

## Prerequisites

- Node.js 20+
- npm
- Access to `weareplanet/solar-ds-copilot` (private repo — needed to verify extension features)

## Development Workflow

### 1. Create a Branch

```
fix/short-description   — for bug fixes
feat/short-description  — for new features or improvements
content/module-XX       — for course content changes
```

### 2. Develop

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to preview the site.

### 3. Verify Before Pushing

1. Run `npm run build` — the static export must succeed with no errors
2. Check the browser at `http://localhost:3000` — navigate through modules, exercises, and quizzes
3. If you changed quiz data (`src/lib/quizData.ts`), verify all questions render and score correctly
4. If you changed module content (`content/module-XX/`), verify markdown renders correctly on the module and exercise pages

### 4. Push & Open a Pull Request

Push your branch and open a PR against `main`.

### 5. Deployment

Deployment is **automatic**. When a PR is merged to `main`, the **Deploy to GitHub Pages** workflow:
1. Runs `npm ci` and `npm run build`
2. Uploads the `out/` directory as a GitHub Pages artifact
3. Deploys to GitHub Pages

**Live URL:** [`https://friendly-adventure-3q7jm84.pages.github.io`](https://friendly-adventure-3q7jm84.pages.github.io)

---

## Project Structure

```
solar-ds-academy/
├── content/
│   ├── module-01/              slides.md + exercise.md per module
│   ├── module-02/
│   ├── ...
│   └── module-09/
├── src/
│   ├── app/                    Next.js App Router pages
│   │   ├── layout.tsx          Root layout (Inter font, Providers wrapper)
│   │   ├── page.tsx            Home page
│   │   ├── providers.tsx       MSAL auth provider
│   │   ├── module/[id]/        Module slides page + exercise subpage
│   │   └── quiz/[id]/          Quiz page
│   ├── components/
│   │   ├── AuthGate.tsx        Microsoft Entra ID login gate
│   │   ├── CertificateGenerator.tsx  PDF certificate (jsPDF)
│   │   ├── ExercisePage.tsx    Exercise renderer
│   │   ├── HomePage.tsx        Module grid + progress overview
│   │   ├── ModulePage.tsx      Slide content renderer
│   │   ├── ModuleSidebar.tsx   Module navigation sidebar
│   │   ├── ProgressTracker.tsx localStorage-based progress
│   │   ├── QuizEngine.tsx      MCQ quiz scorer
│   │   ├── QuizPage.tsx        Quiz page wrapper
│   │   └── TopicNav.tsx        Topic navigation
│   └── lib/
│       ├── modules.ts          Module metadata (titles, levels, durations)
│       ├── msalConfig.ts       MSAL / Entra ID configuration
│       └── quizData.ts         Quiz questions and answers
├── docs/                       Project documentation
├── public/images/              Screenshots and diagrams
├── .github/
│   ├── copilot-instructions.md Copilot workspace instructions
│   ├── skills/                 Copilot skills for content authoring
│   │   └── solar-ds-copilot-reference/
│   │       └── SKILL.md        Extension reference (research guide)
│   └── workflows/
│       └── deploy.yml          GitHub Pages deployment
├── next.config.js              Static export config
├── tailwind.config.js          Tailwind CSS config
└── package.json
```

---

## Content Structure

### Modules

Each module lives in `content/module-XX/` with two files:

| File | Purpose |
|------|---------|
| `slides.md` | Key concepts, presented as slide-style content |
| `exercise.md` | Hands-on exercise with deliverables |

Module metadata (title, level, duration, description) is defined in `src/lib/modules.ts`.

### Quizzes

Quiz data lives in `src/lib/quizData.ts`. Each quiz maps to a module by ID and contains multiple-choice questions scored client-side.

### Adding a New Module

1. Create `content/module-XX/slides.md` and `content/module-XX/exercise.md`
2. Add the module entry to the `modules` array in `src/lib/modules.ts`
3. Add corresponding quiz questions in `src/lib/quizData.ts`
4. Verify it renders at `http://localhost:3000/module/XX`

---

## Content Accuracy

Course content describes the `@solar` VS Code extension, which is under active development. **Every feature claim must be verifiable from the source.**

### Verification Process

Before writing or updating content about `@solar`, verify current behavior from the live repo (`weareplanet/solar-ds-copilot`):

| What to verify | Where to check |
|----------------|----------------|
| Available commands | `src/handler.ts` |
| Scaffold file count | `src/knowledge/scaffolds.ts` |
| Component inventory | `src/knowledge/components.ts` |
| UI patterns | `src/knowledge/patterns.ts` |
| Coding conventions | `src/knowledge/conventions.ts` |
| Validation rules | `src/validator.ts` |
| Deployment behavior | `src/deployer.ts` |
| Auth flow | `src/authHelper.ts` |

### What's Stable vs. Volatile

**Stable** (unlikely to change — safe to state without re-checking every time):
- `@solar` is a VS Code chat participant inside GitHub Copilot Chat
- `src/promptBuilder.ts` composes the system prompt from conventions + patterns + components
- Live preview runs on Vite at localhost:5173 in VS Code Simple Browser
- Auto-initiate scaffolds a project if the workspace is empty
- `@solar` only creates new files — never overwrites existing ones

**Volatile** (verify before citing specific numbers or behavior):
- Command list and behavior
- Scaffold file count and contents
- Component count and prop guidance
- Pattern count and templates
- Validation rule count and checks
- Deployment target and flow

### Content Guidelines

- Write for **non-technical users** (PMs, POs, designers with zero coding knowledge)
- Learners are Windows and Mac users
- Never use jargon without explaining it
- Use `@solar` (not "the extension" or "Solar DS Copilot") in user-facing instructions
- Prefer screenshots and step-by-step instructions over text descriptions

---

## Authentication

The site is gated behind Microsoft Entra ID (MSAL.js), restricted to `@weareplanet` accounts.

Configuration is in `src/lib/msalConfig.ts`. To update the Azure app registration:
1. Azure Portal → Entra ID → App registrations → **Solar DS Academy**
2. Application (client) ID and Tenant ID must match `msalConfig.ts`
3. Redirect URI must match the deployed URL

---

## Certification

| Level | Badge | Criteria |
|-------|-------|----------|
| **Solar Explorer** | Blue | Modules 1–2 completed (quiz score ≥ 70%) |
| **Solar Builder** | Green | Modules 1–4 completed |
| **Solar Champion** | Gold | All modules + capstone exercise |

Certificate PDFs are generated client-side via `src/components/CertificateGenerator.tsx`.

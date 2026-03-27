# ☀️ Solar Product Academy

A hands-on training course for **PMs, POs, and Product Designers** at Planet. Learn to build fully functional web prototypes using **@Solar** — no coding required.

## Overview

| Module | Topic | Level | Duration |
|--------|-------|-------|----------|
| 1 | Getting Started: Your Toolkit | Beginner | 45 min |
| 2 | Building Screens with Natural Language | Beginner | 60 min |
| 3 | Visual Context & Iterative Refinement | Intermediate | 45 min |
| 4 | Validation & Sharing Prototypes | Intermediate | 45 min |
| 5 | Real-World Product Workflows | Advanced | 90 min |
| 6 | GitHub Basics for Product People | Beginner–Intermediate | 60 min |

## Certification

| Level | Badge | Criteria |
|-------|-------|----------|
| **Solar Explorer** | 🔵 | Modules 1–2 completed (quiz ≥ 70%) |
| **Solar Builder** | 🟢 | Modules 1–4 completed |
| **Solar Champion** | 🟡 | All 6 modules + capstone exercise |

## Tech Stack

- **Next.js 14** — static export (`output: 'export'`) → GitHub Pages
- **MSAL.js** — Microsoft Entra ID authentication (restricts to @weareplanet accounts)
- **Tailwind CSS** — styling
- **Client-side quiz engine** — MCQ quizzes scored in the browser
- **localStorage** — progress tracking (per-browser, keyed by user)
- **jsPDF** — client-side certificate generation

## Getting Started

### Prerequisites

- Node.js 20+
- npm

### Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000/solar-ds-academy](http://localhost:3000/solar-ds-academy).

### Build

```bash
npm run build
```

Static output goes to `out/`.

## Authentication Setup

Before deploying, register a **Single-Page Application** in Azure Entra ID:

1. Azure Portal → Entra ID → App registrations → New registration
2. Name: **Solar DS Academy**
3. Supported account types: **Single tenant** (weareplanet only)
4. Redirect URI (SPA): `https://weareplanet.github.io/solar-ds-academy`
5. Copy the **Application (client) ID** and **Tenant ID**
6. Set environment variables (or update `src/lib/msalConfig.ts`):
   ```
   NEXT_PUBLIC_MSAL_CLIENT_ID=<your-client-id>
   NEXT_PUBLIC_MSAL_TENANT_ID=<your-tenant-id>
   ```

## Deployment

Deploys automatically via GitHub Actions on push to `main`. The workflow:

1. Builds the Next.js static export
2. Deploys to GitHub Pages

**URL:** `https://weareplanet.github.io/solar-ds-academy`

### Enable GitHub Pages

1. Repository Settings → Pages
2. Source: **GitHub Actions**

## Project Structure

```
├── .github/workflows/deploy.yml   # GitHub Pages deployment
├── content/
│   ├── module-01/                  # slides.md + exercise.md per module
│   ├── module-02/
│   ├── ...
│   └── module-06/
├── src/
│   ├── app/                        # Next.js App Router pages
│   ├── components/                 # AuthGate, QuizEngine, ProgressTracker
│   └── lib/                        # MSAL config, module data, quiz data
├── next.config.js                  # Static export + basePath
├── tailwind.config.js
└── package.json
```

## Content Updates

- **Slides & exercises:** Edit Markdown files in `content/module-XX/`
- **Quiz questions:** Edit `src/lib/quizData.ts`
- **Module metadata:** Edit `src/lib/modules.ts`

Push to `main` → auto-deploys.

## License

Internal — © Planet
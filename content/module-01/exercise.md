---
title: "Exercise 1.1 — Hello Solar"
module: 1
type: exercise
---

# Exercise 1.1: Hello Solar

**Goal:** Install everything and create your first app with one command.

## Pre-Flight Checklist

Before you begin, verify every item below. If any check fails, follow the fix link before continuing.

| # | Check | How to verify | Fix |
|---|-------|--------------|-----|
| 1 | **VS Code installed** | Open VS Code — you should see the welcome screen | [Download VS Code](https://code.visualstudio.com/) (version 1.93.0+) |
| 2 | **Node.js installed** | Open VS Code's terminal (`Ctrl+`` `) and type `node -v` — you should see `v18` or higher | [Download Node.js](https://nodejs.org/) — pick the LTS option |
| 3 | **GitHub Copilot Chat installed** | In VS Code, open the Extensions panel (puzzle-piece icon) and search "GitHub Copilot Chat" — it should say "Installed" | Search "GitHub Copilot Chat" in the Extensions panel and click Install |
| 4 | **Signed in to GitHub** | Click the **Accounts** icon (bottom-left of VS Code) — your GitHub username should appear | Click Accounts → Sign in with GitHub |
| 5 | **`@weareplanet` org access** | Go to [github.com/orgs/weareplanet/repositories](https://github.com/orgs/weareplanet/repositories) — you should see a long list of repos | Open a ticket on [Luna](https://luna.weareplanet.com/) to request access (may take 1–2 days) |
| 6 | **Solar DS Copilot installed** | In the Extensions panel, search "Solar" — you should see "Solar DS Copilot" listed | Download the `.vsix` from [GitHub Releases](https://github.com/weareplanet/solar-ds-copilot/releases), then Extensions panel → `...` menu → "Install from VSIX…" |

## Instructions

### Step 1 — Open an empty folder

Create a new, empty folder on your computer (e.g., `My First App` on your Desktop).

In VS Code: **File → Open Folder** → select the empty folder you just created.

### Step 2 — Open Copilot Chat

Press `Cmd+Shift+I` (Mac) or `Ctrl+Shift+I` (Windows) to open the Copilot Chat panel. You can also click the **chat icon** in the left sidebar.

### Step 3 — Run your first command

Type the following in the chat panel and press Enter:

```
@solar /initiate My First App
```

### Step 4 — Watch and wait

@Solar will now set up your project. Here's what you'll see — **don't close any panels:**

1. A progress message appears in the chat: "Scaffolding your project…"
2. Files start appearing in the Explorer panel (left sidebar) — this is the project structure being created
3. A terminal opens at the bottom showing package installation output — this takes 30–60 seconds
4. A built-in browser panel opens showing your running app

> **This takes about 1–2 minutes the first time.** Let it finish completely before moving on.

### Step 5 — Verify and screenshot

Once the preview is open, verify the success criteria below, then take a **screenshot** of VS Code showing the running app.

## Success Criteria

Your exercise is complete when you can see **all of the following** in VS Code:

- [ ] A **sidebar navigation** on the left side of the app (inside the preview) with links to multiple pages
- [ ] A **"Get Started"** page is visible in the preview, showing template cards
- [ ] The app is running in **VS Code's built-in browser** panel (not in an external browser like Chrome)
- [ ] The **Explorer panel** (left sidebar of VS Code) shows project files and folders like `src/`, `package.json`, etc.

## Deliverable

Take a screenshot showing the full VS Code window with the app running in the built-in browser. Upload it via [Microsoft Forms](TODO_FORMS_LINK).

## Troubleshooting

### "I don't see @solar in chat"

- Make sure the Solar DS Copilot extension is installed (check the Extensions panel)
- Try reloading VS Code: `Cmd+Shift+P` → type "Reload Window" → press Enter
- Make sure you typed `@solar` (with the `@` prefix)

### "npm ERR! 401 Unauthorized" or "ENEEDAUTH"

Your GitHub authentication isn't configured for npm packages. Run `@solar /initiate` again — it will detect the problem and set up authentication automatically.

### "npm ERR! 404 Not Found"

The `@weareplanet` scope isn't pointing to GitHub Packages. Run `@solar /initiate` again — it will add the correct registry configuration.

### "E403 Forbidden"

Your GitHub account doesn't have access to the `@weareplanet` organisation. Open a ticket on [Luna](https://luna.weareplanet.com/) to request access, then try again.

### "The preview didn't open"

1. Try typing `@solar /preview` in the chat panel
2. If that doesn't work: `Cmd+Shift+P` → type "Simple Browser: Show" → enter `http://localhost:5173`
3. If you still see nothing, check the terminal panel at the bottom for error messages

### "Node.js is not installed" or "node: command not found"

Download and install Node.js from [nodejs.org](https://nodejs.org/) (pick the LTS version). After installing, **restart VS Code** completely (close and re-open it).

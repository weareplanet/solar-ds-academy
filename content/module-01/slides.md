---
title: "Module 1: Getting Started — Your Toolkit"
module: 1
---

# Getting Started: Your Toolkit

## What is @Solar?

@Solar is a **VS Code extension** that lets you build fully functional web prototypes by describing what you want in plain English. No coding required.

It uses **Planet's Solar Design System** — the same components used in production — so every prototype you create is automatically on-brand.

## What You'll Need

| Tool | What it does | Install link |
|------|-------------|-------------|
| **VS Code** | Code editor (don't worry — you won't write code) | [Download](https://code.visualstudio.com/) |
| **Node.js** | Runs the preview server | [Download](https://nodejs.org/) |
| **GitHub Copilot** | AI assistant that powers @Solar | Included with your GitHub account |
| **Solar DS Copilot** | The @Solar extension | Install from GitHub Releases |

## Step-by-Step Setup

### 1. Install VS Code
Download and install from [code.visualstudio.com](https://code.visualstudio.com/). Open it after installation.

### 2. Install Node.js
Download the **LTS version** from [nodejs.org](https://nodejs.org/). This is needed for the live preview.

### 3. Sign in to GitHub
In VS Code, click the **Accounts** icon (bottom-left) → Sign in with GitHub.

### 4. Install the Solar DS Copilot Extension
- Go to the [solar-ds-copilot releases page](https://github.com/weareplanet/solar-ds-copilot/releases)
- Download the latest `.vsix` file
- In VS Code: `Cmd+Shift+P` (macOS) or `Ctrl+Shift+P` (Windows/Linux) → "Install from VSIX" → select the file

### 5. Your First Command
Open the Copilot Chat panel (`Cmd+Shift+I` on macOS, `Ctrl+Shift+I` on Windows/Linux) and type:

```
@solar /initiate My First App
```

Watch as @Solar creates a complete app with navigation, theming, and a live preview!

## Key Concepts

- **Copilot Chat panel**: Where you talk to @Solar (`Cmd+Shift+I` / `Ctrl+Shift+I`)
- **Command Palette**: VS Code's search bar (`Cmd+Shift+P` / `Ctrl+Shift+P`)
- **Live preview**: Built-in browser that shows your app in real time
- **@Solar commands**: `/initiate`, `/validate`, `/share` — your main tools

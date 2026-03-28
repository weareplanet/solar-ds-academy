---
title: "Module 7: VS Code — Features & Navigation"
module: 7
---

# VS Code: Features & Navigation

## Why VS Code?

Visual Studio Code is the editor you'll use with @Solar and GitHub Copilot. You don't need to be a developer to use it — but knowing your way around makes everything faster.

## The Interface at a Glance

| Area | Where | What it does |
|------|-------|--------------|
| **Activity Bar** | Left edge (icons) | Switch between panels: Explorer, Search, Source Control, Extensions, Chat |
| **Side Bar** | Next to Activity Bar | Shows the content of the selected panel (file tree, search results, etc.) |
| **Editor Area** | Center | Where files and previews open |
| **Panel** | Bottom | Terminal, Problems, Output, Debug Console |
| **Status Bar** | Very bottom | Current branch, errors/warnings, language mode |

## The Command Palette

The most important shortcut in VS Code:

> **⌘ Shift P** (macOS) / **Ctrl Shift P** (Windows/Linux)

The Command Palette lets you **search for any action** instead of hunting through menus. Examples:

- Type `theme` → change the color theme
- Type `terminal` → open/close the integrated terminal
- Type `settings` → open Settings UI
- Type `format document` → auto-format the current file

**Rule of thumb:** if you're not sure how to do something, open the Command Palette and search for it.

## The File Explorer

The **Explorer** panel (first icon in the Activity Bar) shows your project's file tree.

Key actions:
- **Click** a file to open it in the editor
- **Double-click** to keep it open permanently (single-click opens in preview mode — notice the *italic* tab title)
- **Right-click** for options: rename, delete, copy path, reveal in Finder (macOS) / File Explorer (Windows)

## The Integrated Terminal

VS Code has a built-in terminal so you never need to leave the editor.

- **Open it:** `` Ctrl ` `` or **⌘ J** (macOS)
- **Create multiple terminals:** click the **+** icon in the terminal panel
- **Split terminals:** click the split icon to see two terminals side by side

This is where @Solar commands run, where `npm run dev` starts your preview, and where you interact with Git.

## Split Editors

You can view multiple files side by side:

- **⌘ \\** (macOS) / **Ctrl \\** — split the current editor
- Drag a tab to the side of the editor area
- Useful for comparing a design file with its preview, or viewing two pages at once

## Extensions

Extensions add new features to VS Code. For this academy, the key ones are:

| Extension | What it does |
|-----------|--------------|
| **GitHub Copilot** | AI pair programmer — code suggestions + chat |
| **Solar DS** | @Solar commands for prototyping with the design system |
| **Simple Browser** | Built-in preview pane for your running app |

To install an extension:
1. Click the **Extensions** icon in the Activity Bar (or **⌘ Shift X**)
2. Search by name
3. Click **Install**

## Useful Keyboard Shortcuts

| Action | macOS | Windows/Linux |
|--------|-------|---------------|
| Command Palette | ⌘ Shift P | Ctrl Shift P |
| Quick Open (file) | ⌘ P | Ctrl P |
| Toggle terminal | Ctrl ` | Ctrl ` |
| Toggle sidebar | ⌘ B | Ctrl B |
| Open Copilot Chat | ⌘ Shift I | Ctrl Shift I |
| Go to line | Ctrl G | Ctrl G |
| Find in file | ⌘ F | Ctrl F |
| Find in all files | ⌘ Shift F | Ctrl Shift F |

> **Tip:** You don't need to memorize all of these. Start with **Command Palette (⌘ Shift P)** and **Quick Open (⌘ P)** — they cover 80% of navigation.

## Settings

VS Code is highly customizable:

- **⌘ ,** (macOS) / **Ctrl ,** — opens the Settings UI
- Search for any setting by keyword
- Common tweaks: font size, auto-save, word wrap, theme

Settings Sync keeps your preferences across machines — sign in with your GitHub account via the gear icon in the bottom-left.

## The Status Bar

The thin bar at the very bottom of VS Code shows:
- **Current Git branch** (e.g., `main`)
- **Errors and warnings** count (click to see them)
- **Language mode** (e.g., TypeScript, Markdown)
- **Line and column** numbers

## Breadcrumbs

The bar above the editor showing `src > components > HomePage.tsx` is called **Breadcrumbs**. Click any segment to navigate the file hierarchy quickly.

## Summary

| Concept | Key takeaway |
|---------|-------------|
| Command Palette | **⌘ Shift P** — your go-to for any action |
| Quick Open | **⌘ P** — jump to any file by name |
| Integrated Terminal | Built-in, no need to leave VS Code |
| Extensions | Add Copilot, Solar DS, and more from the marketplace |
| Split Editors | View multiple files side by side |
| Settings | Customize everything via search |

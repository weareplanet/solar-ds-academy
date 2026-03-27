---
title: "Module 6: GitHub Basics for Product People"
module: 6
---

# GitHub Basics for Product People

## Glossary

| Term | Analogy |
|------|---------|
| **Repository** | A project folder in the cloud |
| **Branch** | A parallel draft of the project |
| **Commit** | A saved checkpoint with a description |
| **Pull Request** | A proposal to merge changes — like a document review |
| **CI (pipeline)** | Automated quality checks on every change |
| **Issue** | A task/bug/feature request — like a Jira ticket |
| **Release** | A published version with downloadable files |

## Navigating a Repository

A repo page has these key tabs:
- **Code** — the files in the project
- **Issues** — tasks, bugs, feature requests
- **Pull requests** — proposed changes under review
- **Releases** — published versions (where you download `.vsix` files)

## Understanding Pull Requests

When you open a PR, you'll see:
1. **Title & description** — what changed and why
2. **Files changed** — a diff showing additions (green) and removals (red)
3. **CI status** — automated checks (green ✓ = passing, red ✗ = failing)
4. **Reviewers** — who needs to approve

> You don't need to understand the code. Focus on: *What does this change? Did CI pass? Who approved it?*

## Creating Issues

Issues are for tracking work. To create one:
1. Go to the **Issues** tab
2. Click **New Issue**
3. Write a clear **title** and **description**
4. Optionally add labels (bug, feature, question)

Good issue titles:
- ✅ "Add export button to merchant table"
- ✅ "Dashboard chart doesn't show weekend data"
- ❌ "Fix the thing"

## Publishing Your @Solar Project

You can publish your prototype to GitHub:
1. Create a new repository on github.com
2. In VS Code, use the Source Control panel to commit your files
3. Push to GitHub

This gives you version history, backup, and a way to share code with developers.

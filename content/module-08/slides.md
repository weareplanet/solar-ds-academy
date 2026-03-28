---
title: "Module 8: GitHub Copilot Chat Deep Dive"
module: 8
---

# GitHub Copilot Chat Deep Dive

## What Is Copilot Chat?

GitHub Copilot Chat is an AI assistant built into VS Code. You type natural language, and it helps you write code, answer questions, debug problems, and — with @Solar — build entire prototypes.

Open it with **⌘ Shift I** (macOS) or **Ctrl Shift I** (Windows/Linux).

## Modes

Copilot Chat has three modes that control **how it interacts with your code**:

| Mode | What it does | When to use it |
|------|-------------|----------------|
| **Ask** | Answers questions, explains code, suggests approaches. Read-only — never edits files. | You want information or guidance without changing anything |
| **Edit** | Edits specific files you point it to. Shows a diff for you to accept or reject. | You want targeted changes to one or a few files |
| **Agent** | Works autonomously — reads files, runs terminal commands, creates/edits multiple files. | You want Copilot to handle a multi-step task end-to-end (this is what @Solar uses) |

**Switch modes** using the dropdown at the top of the chat panel, or type a message and choose the mode before sending.

> **Tip for @Solar:** Always use **Agent mode** when working with @Solar. It needs the ability to read your project, run commands, and edit multiple files.

## Models

You can choose which AI model powers Copilot Chat:

| Model | Strengths |
|-------|-----------|
| **GPT-4o** | Fast, good all-round performance |
| **Claude Sonnet** | Strong at reasoning and longer tasks |
| **Claude Opus** | Most capable for complex multi-step work |
| **Gemini** | Google's model — good at code understanding |

**Switch models** using the model selector dropdown at the bottom of the chat input.

> **Tip:** For @Solar prototyping, **Claude Sonnet** or **Claude Opus** generally produce the best results. Experiment and see what works for your use case.

## Attachments (Context)

Copilot Chat works best when you give it **context** — information about what you're looking at or working with. You attach context using the **#** symbol or the **paperclip icon**.

| Attachment | Syntax | What it provides |
|------------|--------|-----------------|
| **File** | `#file:HomePage.tsx` | The full contents of a specific file |
| **Selection** | Select code, then ask | The highlighted text in your editor |
| **Terminal** | `#terminal` | Recent terminal output (errors, logs) |
| **Browser** | `#browser` | A screenshot of the Simple Browser preview |
| **Codebase** | `#codebase` | Searches your entire project for relevant context |
| **Problems** | `#problems` | Current errors and warnings from the Problems panel |
| **Git changes** | `#changes` | Files modified since your last commit |

### How to attach

1. **Type `#`** in the chat input — a dropdown appears with all available attachments
2. **Click the paperclip icon** (📎) in the chat input bar
3. **Select text** in the editor before asking a question — it's automatically included

> **Tip:** The more relevant context you give, the better the response. For @Solar, `#browser` is especially powerful — it lets Copilot see exactly what your prototype looks like.

## Tools & MCP Servers

### What are Tools?

Tools are capabilities that Copilot Chat can use in **Agent mode**. They let the AI go beyond text generation and actually *do things*:

- Read and write files
- Run terminal commands
- Search your codebase
- Fetch web pages
- Interact with external services

You can see available tools by clicking the **toolbox icon** (🧰) in the chat input.

### What are MCP Servers?

**MCP (Model Context Protocol)** servers are plugins that give Copilot Chat access to external tools and services. Think of them as "connectors" between Copilot and the outside world.

Examples:
- **Figma MCP** — lets Copilot read Figma designs and generate code from them
- **GitHub MCP** — lets Copilot create issues, PRs, and manage repos
- **Database MCPs** — let Copilot query databases

### How MCPs work (simplified)

1. An MCP server is **configured** in your VS Code settings (usually in `.vscode/mcp.json`)
2. When you use Agent mode, Copilot **discovers** the tools provided by the MCP server
3. Copilot can then **call those tools** to fetch data or perform actions
4. You see what tools Copilot wants to use and can **approve or deny** each call

> **You don't need to set up MCPs yourself.** Your workspace may already have them configured. The key thing is understanding that when Copilot asks to use a tool like "get Figma design" or "create GitHub issue," it's using an MCP.

## Approvals & Autopilot

When Copilot Chat is in **Agent mode**, it may want to:
- Edit files
- Run terminal commands
- Call external tools (MCPs)

VS Code gives you control over how much autonomy Copilot gets:

| Level | What happens |
|-------|-------------|
| **Manual approval** (default) | Copilot asks permission for every action. You click "Allow" or "Deny" for each one. |
| **Session trust** | After you approve a tool once, it's trusted for the rest of the session. |
| **Autopilot** | Copilot runs all actions automatically without asking. Use this when you trust the task (like @Solar prototyping). |

**To change the approval level:**
- Click the dropdown arrow next to the **Send** button
- Or configure it in Settings → search for "copilot approval"

> **Tip for @Solar:** Enable **Autopilot** when prototyping with @Solar so it can run commands, edit files, and navigate the preview without interrupting you for each step.

## How to "Send" a Message

The way you send a message affects what Copilot does:

| Action | How | What it does |
|--------|-----|--------------|
| **Send (Enter)** | Press **Enter** | Sends your message in the current mode (Ask, Edit, or Agent) |
| **New line** | Press **Shift + Enter** | Adds a line break — useful for multi-line prompts |
| **Send to specific mode** | Click the dropdown arrow next to Send | Lets you pick Ask/Edit/Agent for just this message |

### The Send dropdown

The small **▾** arrow next to the Send button reveals options:
- **Ask** — send as a question (no edits)
- **Edit** — send as an edit request
- **Agent** — send as a full agent task

This is useful when you want a quick one-off in a different mode without changing your default.

## Putting It All Together

Here's a typical @Solar workflow using everything from this module:

1. **Open Copilot Chat** (⌘ Shift I)
2. **Set Agent mode** (dropdown at the top)
3. **Select a model** (Claude Sonnet recommended)
4. **Type your prompt:** `@solar /initiate a merchant dashboard`
5. **Enable Autopilot** so @Solar can work uninterrupted
6. **Attach context** when refining: `#browser look at the table — make the columns sortable`
7. **Review changes** in the editor — accept or revert as needed

## Summary

| Concept | Key takeaway |
|---------|-------------|
| **Modes** | Ask (read-only), Edit (targeted changes), Agent (autonomous multi-step) |
| **Models** | Choose based on task complexity — Claude Sonnet/Opus for @Solar |
| **Attachments** | Use `#` to give Copilot context — `#browser` and `#file` are most useful |
| **Tools & MCPs** | Agent mode can use tools; MCPs connect to external services |
| **Approvals** | Control Copilot's autonomy — use Autopilot for trusted @Solar tasks |
| **Send types** | Enter to send, Shift+Enter for new line, dropdown to switch modes per message |

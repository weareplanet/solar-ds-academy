---
title: "Module 9: Advanced Prompting Strategies"
module: 9
---

# Advanced Prompting Strategies

Module 8 introduced the **what** — modes, models, attachments, and tools. This module covers the **when** and **why**: decision frameworks that help you pick the right combination for every task.

---

## Part 1 — Choosing the Right Mode

### Decision Flowchart

Ask yourself these questions in order:

1. **Do I need files changed?** → No → **Ask mode**
2. **Do I need a step-by-step plan before executing?** → Yes → **Plan mode**
3. **Does it involve file changes, terminal commands, or exploration?** → Yes → **Agent mode**

### When to Use Ask Mode

Ask mode is **read-only** — it never touches your files. Use it when:

| Scenario | Example prompt |
|----------|---------------|
| Understanding code | "Explain what this useEffect does" |
| Exploring options | "What are three ways to handle form validation here?" |
| Learning concepts | "What is the difference between SSR and SSG in Next.js?" |
| Planning before acting | "What files would I need to change to add a dark mode toggle?" |
| Reviewing decisions | "Is this the right approach for pagination, or should I use cursor-based?" |

> **Key insight:** Start in Ask mode when you're **unsure what to do**. Once you have a plan, switch to Plan or Agent to execute it.

### When to Use Plan Mode

Plan mode creates a **step-by-step implementation plan** before any code is written. It analyses your codebase, identifies which files need changes, and outlines the approach — but doesn't execute anything until you approve. Use it when:

| Scenario | Example prompt |
|----------|---------------|
| Scoping a feature | "Plan how to add dark mode support to this app" |
| Understanding impact | "What files and components would need to change to migrate from REST to GraphQL?" |
| Reviewing before committing | "Plan the refactoring of the auth flow to use HTTP-only cookies" |
| Complex multi-step work | "Plan the implementation of a notification system with real-time updates" |
| Getting alignment with your team | "Plan the approach — I want to review it before you make any changes" |

> **Key insight:** Plan mode is best when you want to **review and approve the approach** before any code is written. It gives you a clear roadmap you can share with your team or adjust before execution.

### When to Use Agent Mode

Agent mode works **autonomously** — it reads files, runs terminal commands, installs packages, and edits multiple files. Use it when:

| Scenario | Example prompt |
|----------|---------------|
| Creating something new | "Create a new settings page with a form for user preferences" |
| Multi-file changes | "Add authentication to the app using NextAuth" |
| Tasks requiring exploration | "Find and fix all accessibility issues in the navigation" |
| Build/test workflows | "Run the tests, fix any failures, and make sure everything passes" |
| @Solar prototyping | "Create a dashboard with a sidebar, stats cards, and a data table" |

> **Key insight:** Use Agent mode when the task is **open-ended** or you'd describe it as "just make it work."

### Mode Escalation Pattern

A powerful workflow is to **start narrow and escalate**:

1. **Ask** → "How should I implement feature X?" (understand the problem)
2. **Plan** → "Plan the implementation step by step" (get a reviewable roadmap)
3. **Agent** → "Go ahead and implement the plan" (execute autonomously)

This gives you maximum control: you understand the problem (Ask), review and approve the approach (Plan), then let the AI handle the execution (Agent).

---

## Part 2 — Choosing the Right Model

### Model Characteristics

| Model | Speed | Reasoning | Cost | Best for |
|-------|-------|-----------|------|----------|
| **GPT-4o** | ⚡ Fast | Good | 💲 Low | Quick questions, simple edits, explanations |
| **Claude Sonnet** | ⚡ Fast | Strong | 💲💲 Medium | Day-to-day coding, refactoring, multi-file tasks |
| **Claude Opus** | 🐢 Slower | Excellent | 💲💲💲 High | Complex architecture, subtle bugs, long multi-step tasks |
| **Gemini** | ⚡ Fast | Good | 💲 Low | Large file understanding, code search across big codebases |

> **Cost matters:** Every prompt consumes tokens from your organization's Copilot quota. Use the **cheapest model that gets the job done** — save Opus for tasks where its reasoning ability genuinely makes a difference.

### Decision Framework for Models

**Default choice: Claude Sonnet** — best balance of speed and quality for most tasks.

Upgrade or switch when:

| Situation | Switch to | Why | Cost impact |
|-----------|-----------|-----|-------------|
| Quick one-off question | GPT-4o | Fastest response time | 💲 Low — cheap and fast |
| Simple rename / small edit | GPT-4o | Doesn't need deep reasoning | 💲 Low — don't overspend on simple tasks |
| @Solar prototyping | Claude Sonnet | Best balance for multi-step code generation | 💲💲 Medium — worth it for quality |
| Complex bug that's hard to reproduce | Claude Opus | Strongest reasoning and attention to detail | 💲💲💲 High — justified for hard problems |
| Designing architecture or data models | Claude Opus | Thinks through edge cases and trade-offs | 💲💲💲 High — saves time vs. multiple Sonnet attempts |
| Searching through a very large codebase | Gemini | Large context window handles more code | 💲 Low — efficient for large-context work |
| Getting a second opinion | Any different model | Models have different "thinking styles" — switching can unblock you | Varies |

### The Cost-Aware Rule of Thumb

1. **Start with GPT-4o or Claude Sonnet** for every task
2. **Upgrade to Opus only when** the task requires deep reasoning, multi-step planning, or you've already tried Sonnet and it fell short
3. **Never use Opus for** simple questions, explanations, or small edits — that's like hiring an architect to change a lightbulb
4. **Track your usage** — if you're burning through quota mid-month, review whether you're using Opus for tasks Sonnet can handle

> **Tip:** If a model gives a poor response, try the **same prompt with a different model** before rewriting the prompt. Sometimes the model just isn't the right fit for that task.

---

## Part 3 — Prompt Engineering Techniques

### 1. Be Specific About What You Want

| ❌ Vague | ✅ Specific |
|----------|------------|
| "Make this better" | "Reduce the re-renders in this component by memoizing the callback" |
| "Fix the styling" | "Align the cards in a 3-column grid with 16px gap on desktop, single column on mobile" |
| "Add a feature" | "Add a search bar above the table that filters rows by the 'name' column" |

### 2. Provide Context Before the Task

Structure your prompts as: **Context → Task → Constraints**

> "I have a Next.js app using Solar DS components with MUI v6.
> Add a notification bell icon to the AppBar that shows a badge with the unread count.
> Use the Solar `IconButton` and MUI `Badge` components. Don't add any new dependencies."

### 3. Use Attachments Strategically

| Attachment | When to use |
|------------|-------------|
| `#file` | When the AI needs to see a specific file's implementation |
| `#selection` | When you've highlighted the exact code to change |
| `#codebase` | When the AI needs to understand project structure and conventions |
| `#browser` | When there's a visual bug you want to show |
| `#terminal` | When there's an error message the AI needs to see |

**Rule of thumb:** Attach the **minimum context** the AI needs. Too much context can dilute focus.

### 4. Iterate, Don't Rewrite

When the output isn't right, **refine** rather than starting over:

- "Good, but make the table sortable by clicking column headers"
- "Keep everything, but change the color scheme to use our brand tokens"
- "Almost — the modal should close when clicking outside, not just the X button"

The AI remembers the conversation. Each follow-up builds on the previous output.

### 5. Use the "Explain Then Do" Pattern

For critical changes, split into two messages:

1. "Explain how you would implement pagination for this table" (Ask mode)
2. Review the explanation, then: "Go ahead and implement it" (switch to Agent mode)

This prevents the AI from making assumptions you haven't validated.

---

## Part 4 — Common Anti-Patterns

| Anti-Pattern | Why it fails | Better approach |
|-------------|-------------|-----------------|
| Mega-prompts (500+ words) | AI loses focus on what matters | Break into 2–3 focused messages |
| "Do everything" in one shot | Too many changes to review | Do it in phases: plan → foundation → details |
| Never providing context | AI guesses at your conventions | Attach relevant files or use `#codebase` |
| Ignoring the diff | Accepting without reviewing | Always read the diff — AI makes subtle mistakes |
| Staying on one model | Some tasks suit different models | Switch models when stuck |
| Fighting the AI | Forcing a specific implementation detail | Describe the **outcome** you want, let the AI choose the path |

---

## Summary

| Decision | Framework |
|----------|-----------|
| **Mode** | No file changes → Ask · Need a plan first → Plan · Ready to execute → Agent |
| **Model** | Start cheap → Quick/simple → GPT-4o · Daily work → Claude Sonnet · Complex reasoning → Claude Opus · Big codebase → Gemini |
| **Prompt** | Be specific · Context → Task → Constraints · Attach minimum needed · Iterate, don't rewrite |

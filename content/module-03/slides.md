---
title: "Module 3: Visual Context & Iterative Refinement"
module: 3
---

# Visual Context & Iterative Refinement

## The Refinement Loop

```
Build initial page → Review in preview → Spot issues →
Describe change (with #browser screenshot) → @Solar updates →
Review again → Repeat until satisfied
```

## Using Visual Context

### The `#browser` Tag
Type `#browser` in the Copilot Chat to **attach a screenshot** of the current live preview. This shows @Solar exactly what you see.

### Select Element
Click **"Select Element"** in the preview to point at a specific UI element. @Solar will know exactly which component you're referring to.

## Refinement Prompt Examples

| Observation | Prompt |
|------------|--------|
| Cards too cramped | *"increase the spacing between the stat cards"* |
| Table missing feature | *"add a search field and a status filter dropdown above the table"* |
| Wrong chart type | *"change the revenue chart to a line chart instead of bars"* |
| Mobile looks broken | *"make this page responsive — stack cards vertically on mobile"* |
| Missing interaction | *"add a confirmation dialog when clicking Delete"* |

## Best Practices

- **One change at a time** — small prompts are more accurate
- **Use #browser** — visual context is more precise than words
- **Be specific** — "make the title 24px bold" > "make it bigger"
- **Iterate quickly** — don't overthink, just try and refine

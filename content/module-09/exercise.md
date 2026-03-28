---
title: "Module 9 Exercise: Advanced Prompting Strategies"
module: 9
---

# Exercise: Advanced Prompting Strategies

Practice choosing the right mode, the right model, and writing effective prompts.

---

## Task 1 — Mode Selection Drill

For each scenario below, decide which mode (**Ask**, **Plan**, or **Agent**) you would use and why. Write your answers down, then check the suggested answers at the bottom.

1. You want to know what the `useContext` hook does in React.
2. You need to change the page title in `layout.tsx` from "My App" to "Solar Academy".
3. You want to add a complete new "Settings" page with a form, validation, and API integration.
4. You see an error in the terminal and want to understand what it means.
5. You want to plan a migration from REST to GraphQL before making any changes.
6. You need to refactor the authentication flow across 5 files.

<details>
<summary><strong>Suggested answers</strong></summary>

1. **Ask** — purely informational, no file changes needed
2. **Agent** — straightforward file change, agent handles it quickly
3. **Agent** — new page creation involves multiple files and possibly new dependencies
4. **Ask** — you want an explanation, not a code change
5. **Plan** — you want a step-by-step roadmap to review before committing to the migration
6. **Agent** — multi-file refactoring requires reading and editing across the project (consider using **Plan** first to review the approach)

</details>

---

## Task 2 — Model Switching Experiment

Perform the same task with two different models and compare the results:

1. Open Copilot Chat in **Ask mode**
2. Select **GPT-4o** as the model
3. Type: "Explain 3 different approaches to implement dark mode in a Next.js app using Tailwind CSS. Compare the trade-offs."
4. Read and note the response quality
5. **Switch to Claude Sonnet** (use the model dropdown)
6. Send the **exact same prompt**
7. Compare:
   - Which response was more detailed?
   - Which gave better trade-off analysis?
   - Which was faster?

> **Takeaway:** Notice how different models have different "thinking styles." Neither is wrong — they emphasize different things.

---

## Task 3 — Prompt Refinement Chain

Practice the **iterate, don't rewrite** technique:

1. Switch to **Agent mode** with **Claude Sonnet**
2. Send: "Create a simple card component that shows a user's name and email"
3. Once generated, send a follow-up: "Add an avatar image to the left side of the card"
4. Then: "Make it responsive — stack vertically on mobile, horizontal on desktop"
5. Then: "Add a hover effect that slightly elevates the card with a shadow"

> **Takeaway:** Each message builds on the previous result. You don't need to describe the entire component from scratch in one mega-prompt.

---

## Task 4 — Context → Task → Constraints Pattern

Practice structuring prompts with the three-part pattern:

1. Open any file in your project
2. In Copilot Chat (Ask mode), write a prompt using this structure:

```
Context: [describe the file/project/feature]
Task: [what you want done]
Constraints: [limitations, style rules, do-nots]
```

**Example:**
> "This is a Next.js page that lists products from an API.
> Add pagination with Previous/Next buttons below the product grid.
> Use the existing Button component from @/components. Don't add any external pagination library."

3. Send it and review the diff
4. Try the same request but **without** context and constraints — notice how the output quality changes

---

## Task 5 — The "Explain Then Do" Pattern

Practice the two-step workflow for a critical change:

1. Switch to **Ask mode**
2. Send: "I want to add form validation to a user registration form with fields: name (required, min 2 chars), email (required, valid format), and password (required, min 8 chars, must contain a number). What approach would you recommend?"
3. Read the response carefully — does the approach make sense?
4. If you agree, switch to **Agent mode**
5. Send: "Go ahead and implement the registration form with the validation approach you just described"
6. Review the generated code

> **Takeaway:** The Ask step lets you validate the AI's approach *before* it writes code. This catches bad assumptions early.

---

## Task 6 — Anti-Pattern Identification

Read each prompt below and identify what's wrong. Rewrite it as a better prompt.

**Prompt A:**
> "Fix my app"

**Prompt B:**
> "I need you to take the entire authentication system which currently uses JWT tokens stored in localStorage and migrate it to use HTTP-only cookies with a refresh token rotation strategy and also add CSRF protection and while you're at it update all the API routes to validate the new cookie-based auth and also add rate limiting to the auth endpoints and update the tests."

**Prompt C:**
> "Add a button" (with no file open, no context attached)

<details>
<summary><strong>Better versions</strong></summary>

**A rewritten:** "The login form submits but the page doesn't redirect to the dashboard. The console shows a 401 error. #terminal What's causing this?"

**B rewritten — broken into phases:**
- Phase 1: "Migrate the auth tokens from localStorage to HTTP-only cookies. Here's the current auth flow: #file:auth.ts"
- Phase 2: "Now add refresh token rotation to the cookie-based auth"
- Phase 3: "Add CSRF protection to all POST/PUT/DELETE routes"
- Phase 4: "Add rate limiting to the auth endpoints"

**C rewritten:** "Add a 'Save Draft' button below the form in #file:EditPage.tsx. Use the Solar OutlinedButton component. On click, call the existing saveDraft() function."

</details>

---

## Deliverables

- [ ] Completed the mode selection drill (Task 1) — all 6 scenarios answered correctly
- [ ] Compared two models on the same prompt (Task 2) — noted differences in style and quality
- [ ] Practiced iterative refinement with 4 follow-up messages (Task 3)
- [ ] Wrote a structured prompt using Context → Task → Constraints (Task 4)
- [ ] Used the "Explain Then Do" pattern for a form implementation (Task 5)
- [ ] Identified and rewrote 3 anti-pattern prompts (Task 6)

## Success Criteria

- You can confidently choose between Ask, Edit, and Agent mode for any given task
- You know when to switch models and why
- Your prompts follow the Context → Task → Constraints structure
- You use iterative refinement instead of mega-prompts

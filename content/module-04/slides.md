---
title: "Module 4: Validation & Sharing Prototypes"
module: 4
---

# Validation & Sharing Prototypes

## The `/validate` Command

`/validate` checks your prototype for **Solar Design System compliance**:

- ✅ Correct imports (from `@weareplanet/solar-ds-react`, not `@mui/material`)
- ✅ Correct icon variant (Rounded, not Outlined or Filled)
- ✅ Theme wrapper present (`PlanetWrapper`)
- ✅ Proper component usage patterns

### How to use it
1. Open any `.tsx` file in the editor
2. In Copilot Chat: `@solar /validate`
3. Review the results
4. If issues found → ask @Solar to fix them

> `/validate` is **read-only** — it reports issues but doesn't change your code.

## The `/share` Command

`/share` **builds and deploys** your prototype to a permanent public URL.

### How to use it
1. In Copilot Chat: `@solar /share`
2. @Solar builds the project and deploys it
3. You get a **public URL** — share it with anyone

### Use cases
- Send to stakeholders for feedback
- Demo in sprint reviews
- Test on your phone
- Share with designers for comparison with Figma mockups

## Quality Checklist

Before sharing, verify:
- [ ] Does the prototype use correct Planet branding? (Solar DS handles this)
- [ ] Are interactions working? (navigation, buttons, dialogs)
- [ ] Is it responsive? (test with narrow browser width)
- [ ] Does `/validate` pass with no issues?
- [ ] Is the public URL accessible from a phone?

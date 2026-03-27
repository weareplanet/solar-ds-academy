---
title: "Module 2: Building Screens with Natural Language"
module: 2
---

# Building Screens with Natural Language

## The Prompt → Result Loop

With @Solar, building a page is a conversation:

1. **You describe** what you want in plain English
2. **@Solar creates** the page with real components
3. **You review** in the live preview
4. **You refine** by describing changes

## Prompt Patterns That Work

| What you want | Example prompt |
|---------------|----------------|
| Dashboard with metrics | *"create a dashboard with 4 KPI cards and a line chart showing monthly revenue"* |
| Data table | *"add a page showing transactions: name, email, status, date, amount columns"* |
| Form | *"create a settings page with profile fields: name, email, role dropdown, save button"* |
| Detail page | *"add a customer detail page with contact info, status chip, and notes section"* |
| Landing page | *"build a landing page with a hero banner, 3 feature cards, and a call to action"* |

## Prompt Tips

### Be Specific About Data
❌ *"add a table"*
✅ *"add a transactions table with 5 columns: name, email, status, date, amount"*

### Mention Layout
❌ *"add some cards"*
✅ *"add 4 stat cards in a row, stacked on mobile"*

### Reference Real Concepts
✅ *"like the Portal reporting page"*
✅ *"similar to a Stripe dashboard"*

### Iterate
✅ *"make the header bigger"*
✅ *"change the chart to a bar chart"*
✅ *"add a search field above the table"*

## How Pages Work

- Each page is a separate file
- Pages are **automatically added** to the sidebar navigation
- The live preview **navigates** to the new page after creation
- Existing pages are **never modified** when you add a new one

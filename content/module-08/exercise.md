---
title: "Exercise 8: Explore Copilot Chat"
module: 8
---

# Exercise: Explore Copilot Chat

## Objective

Try each Copilot Chat mode, attach context, discover tools, and understand the different ways to send messages.

---

## Tasks

### 1. Try Ask Mode

- Open Copilot Chat (**⌘ Shift I** on macOS / **Ctrl Shift I** on Windows/Linux)
- Set the mode to **Ask** (dropdown at the top)
- Ask: `What files are in this project?`
- Ask: `Explain what the HomePage component does`

✅ **Success:** You got helpful answers without any files being modified.

### 2. Try Edit Mode

- Switch to **Edit** mode
- Open `src/components/HomePage.tsx` in the editor
- In the chat, type: `Change the page title to "Welcome to My Academy"`
- Review the **diff** that appears — accept or discard the change

✅ **Success:** You saw a proposed edit and chose whether to apply it.

### 3. Try Agent Mode

- Switch to **Agent** mode
- Type: `List all the module titles in this project and tell me how many there are`
- Watch Copilot read files and reason through the answer

✅ **Success:** Copilot autonomously explored your project to answer the question.

### 4. Attach Context

Try each of these attachments in a chat message:

- Type `#` and select **#file** — pick any file and ask a question about it
- Open the Simple Browser preview, then type `#browser` — ask Copilot what it sees
- Type `#codebase` and ask: `Where is the quiz data stored?`

✅ **Success:** You provided context three different ways and got more accurate responses.

### 5. Discover Available Tools

- In Agent mode, click the **toolbox icon** (🧰) in the chat input
- Browse the list of available tools
- Note any MCP-provided tools (they'll have a server name prefix)

✅ **Success:** You can see what tools Copilot has access to in your workspace.

### 6. Understand Approvals

- In Agent mode, ask Copilot to create a new file: `Create a file called test-note.txt with the text "Hello from Copilot"`
- When Copilot asks for approval to create the file, click **Allow**
- Then delete the file manually (right-click in Explorer → Delete)

Now try changing the approval level:
- Click the **▾** dropdown arrow next to the Send button
- Look for approval/trust settings

✅ **Success:** You experienced the approval flow and know where to adjust it.

### 7. Practice Send Types

- Type a multi-line message using **Shift + Enter** for line breaks
- Use the **▾** dropdown next to Send to send a message in a specific mode
- Try sending the same question in Ask mode vs. Agent mode — notice the difference

✅ **Success:** You used different send methods and understand when each is useful.

---

## Deliverables

- [ ] Asked a question in **Ask** mode (no edits)
- [ ] Made an edit in **Edit** mode (reviewed the diff)
- [ ] Ran an autonomous task in **Agent** mode
- [ ] Attached context using `#file`, `#browser`, or `#codebase`
- [ ] Browsed available tools in the toolbox
- [ ] Experienced the approval flow for a file creation
- [ ] Used Shift+Enter for multi-line input and the Send dropdown

## Bonus

- Try switching models mid-conversation — ask the same question with GPT-4o and then Claude Sonnet. Compare the answers.
- If your workspace has an MCP configured (check `.vscode/mcp.json`), try asking Copilot to use one of its tools.

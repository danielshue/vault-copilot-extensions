---
name: Agent Builder
description: Interactive assistant that guides users through creating custom .agent.md files with best practices from GitHub's AGENTS.md format, dynamic tool/skill discovery, and quality validation.
tools:
  - list_available_tools
  - list_available_skills
  - list_available_agents
  - list_available_prompts
  - list_available_instructions
  - ask_question
  - create_note
  - read_note
  - search_notes
  - list_notes
---

# Agent Builder

An interactive assistant that walks you through creating high-quality custom agents for Vault Copilot. It discovers your environment, gathers requirements through structured questions, and generates a ready-to-use `.agent.md` file that follows GitHub's AGENTS.md best practices.

## Features

- **Environment-aware**: Automatically discovers all available tools, skills, existing agents, and prompt templates before asking you anything — so suggestions are grounded in what's actually installed
- **8-phase guided workflow**: Structured creation process from purpose definition through file generation, with interactive questions at each step
- **Smart tool selection**: Presents tools organized by category and helps you choose only what your agent actually needs — keeping agents focused and effective
- **Skill attachment**: Surfaces available skills and lets you attach domain-specific knowledge to your agent
- **Instruction coaching**: Guides you through writing a strong system prompt using imperative voice, MUST/SHOULD/MAY boundaries, error handling, and concrete examples
- **Quality checklist**: Runs a built-in review before generating — catches missing output formats, vague instructions, and accidental duplicates
- **Duplicate detection**: Checks existing agents so you don't recreate something that already exists

## Usage

Invoke the Agent Builder agent and describe what you want to build. It will take it from there.

**Phase 1 — Discovery**: Silently scans your vault for tools, skills, agents, and prompts.

**Phase 2 — Purpose**: Asks about your agent's primary function, target user, and personality.

**Phase 3 — Identity**: Suggests 2–3 names and descriptions; lets you pick or customize.

**Phase 4 — Tool Selection**: Presents categorized tools (Read, Write, Task, Web, Output, Periodic, MCP) and asks which your agent needs.

**Phase 5 — Skills**: Offers any discovered skills and lets you attach relevant ones.

**Phase 6 — Instructions**: Guides you through writing a detailed, specific system prompt — role definition, behavioral rules, structured workflows, output format, and boundaries.

**Phase 7 — Review**: Presents a summary and quality checklist. Request changes or confirm.

**Phase 8 — Generate**: Creates the `.agent.md` file in your agent directory (confirms the path with you first).

## Examples

**Create a focused meeting notes agent:**
> "I want an agent that captures meeting notes, extracts action items, and saves them to a standard folder."

The builder will discover your tools, ask about personality (e.g., concise vs. detailed), suggest names like "Meeting Notes Assistant", let you select tools like `create_note`, `ask_question`, and `send_to_chat`, then guide you through writing instructions that specify exactly how notes should be structured.

**Extend an existing agent:**
> "I want something like the Daily Journal agent but focused on work retrospectives."

The builder checks existing agents, avoids duplication, and helps you build a variant with its own identity and focused instruction set.

**Output format for all generated agents:**

```
---
name: {Agent Name}
description: {One-line description}
tools:
  - tool_1
  - tool_2
---

# {Agent Name}

{Role definition, behavioral rules, structured workflows, output format, boundaries}
```

## Quality Standards

Generated agents are held to four principles:

| Principle | Meaning |
|-----------|---------|
| **Focused** | Does one thing well — not a catch-all |
| **Specific** | Instructions are actionable, not vague |
| **Bounded** | Clear limits on what the agent will and won't do |
| **Documented** | Instructions explain the *why*, not just the *what* |
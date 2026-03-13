---
name: mermaid-document-diagrams
description: Create clean documentation diagrams by calling render_mermaid_diagram and inserting the returned Mermaid markdown.
creation-date: 2026-02-23
modified-date: 2026-02-22
tags: [skill, mermaid, documentation]
status: complete
type: reference
user-invokable: true
argument-hint: Describe the diagram goal, type, and key entities/steps.
---

# Mermaid Document Diagrams

A skill for generating clean, validated visual diagrams inside your Obsidian notes. Instead of hand-writing Mermaid syntax, this skill calls the `render_mermaid_diagram` tool to produce validated diagram blocks and inserts them directly into your documentation.

---

## Features

- **8 supported diagram types**: flowchart, sequenceDiagram, classDiagram, stateDiagram-v2, erDiagram, journey, gantt, and more
- **Validated output**: Diagrams are built and checked via `render_mermaid_diagram` before insertion — no malformed syntax
- **Auto-titling**: Generates a concise title from context if you don't provide one
- **Mermaid-safe IDs**: Automatically applies state aliases for labels with hyphens or spaces in `stateDiagram-v2`
- **Inline placement**: Diagrams are inserted near the section they explain, not appended to the end
- **Warning surfacing**: If the tool returns warnings, they are surfaced without discarding the diagram
- **Style discipline**: Enforces simple, readable diagrams — small node counts, short labels, no decorative clutter

---

## Usage

Invoke this skill when creating or updating documentation that would benefit from a visual structure or flow diagram.

**Prompt format:**
> Describe the diagram goal, type, and key entities or steps.

**The skill will:**
1. Select the most appropriate diagram type for your request
2. Draft a concise title in sentence case
3. Prepare focused Mermaid source content (core entities and relationships only)
4. Call `render_mermaid_diagram` with `title`, `diagramType`, and `mermaidBody`
5. Insert the returned `mermaidMarkdown` block exactly as returned into your document

**Choosing a diagram type:**

| Type | Best for |
|------|----------|
| `flowchart` | Process flows, decision trees |
| `sequenceDiagram` | Interactions between components over time |
| `classDiagram` | Domain models, object relationships |
| `stateDiagram-v2` | State machines, lifecycle transitions |
| `erDiagram` | Entity/relationship database structures |
| `journey` | User journey stages and experience mapping |
| `gantt` | Timelines, project planning |

---

## Examples

**Process flow:**
> "Add a flowchart showing how a task moves from inbox to done, with a review step."

**System interaction:**
> "Create a sequence diagram showing how the user, agent, and vault interact when a note is created."

**State lifecycle:**
> "Draw a state diagram for a project note: draft → in-review → approved → archived."

**Data model:**
> "Generate an ER diagram for players, matches, and seasons in my tennis tracker."

**Timeline:**
> "Make a Gantt chart for onboarding a new team member over three weeks."

---

## Style Conventions

- Keep diagrams simple — prefer fewer nodes over exhaustive coverage
- Use consistent, action-oriented labels
- Avoid decorative or redundant elements
- Ensure diagram content matches the surrounding document text
- Place diagrams adjacent to the section they illustrate
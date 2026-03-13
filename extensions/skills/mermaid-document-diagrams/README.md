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

A skill for generating clean, readable visual diagrams inside your Obsidian notes. Instead of hand-authoring Mermaid syntax, this skill calls the `render_mermaid_diagram` tool and inserts the validated output directly into your document — keeping diagrams consistent, correct, and easy to maintain.

---

## Features

- **Seven diagram types supported**: flowchart, sequenceDiagram, classDiagram, stateDiagram-v2, erDiagram, journey, and gantt
- **Tool-generated output**: Always uses `render_mermaid_diagram` to validate syntax before inserting — no broken diagrams
- **Auto-titled**: Generates a concise, context-aware title if you don't provide one
- **Clean style conventions**: Small node counts, short labels, no decorative clutter
- **Flexible insertion**: Returns either `mermaidMarkdown` (diagram only) or `documentSectionMarkdown` (with heading) depending on your needs
- **Warning-aware**: Surfaces tool warnings without discarding the diagram
- **Statediagram safety**: Handles hyphens and spaces in state labels using Mermaid-safe aliases automatically

---

## Usage

Invoke this skill by describing what you want to visualize. Include:

1. **The diagram goal** — what process, structure, or flow you're documenting
2. **The preferred diagram type** (optional — the skill will choose if omitted)
3. **Key entities or steps** — the main nodes, actors, states, or phases to include

**Tip**: If requirements are ambiguous, the skill will ask one clarifying question before generating.

### Choosing a diagram type

| Type | Best for |
|------|----------|
| `flowchart` | Process flows and decision paths |
| `sequenceDiagram` | Interactions between actors over time |
| `classDiagram` | Domain models and object relationships |
| `stateDiagram-v2` | State machines and lifecycle transitions |
| `erDiagram` | Entity/relationship data structures |
| `journey` | User journey stages and experience maps |
| `gantt` | Timelines and project planning |

### Insertion

- Use the returned `mermaidMarkdown` to insert the diagram block inline
- Use `documentSectionMarkdown` when you want the diagram heading included automatically
- Place the diagram near the section of text it explains
- Do not wrap the returned output in another fenced code block

---

## Examples

### Process flow

> "Add a flowchart showing how a pull request moves from draft to merged."

The skill selects `flowchart`, titles it "Pull request lifecycle", and generates nodes for: Draft → Review → Changes requested → Approved → Merged.

---

### State transitions

> "Show the states a task can be in: todo, in-progress, blocked, done."

The skill selects `stateDiagram-v2` and uses aliases to handle the hyphenated `in-progress` label safely:

```
state "in-progress" as in_progress
```

Transitions are wired between safe IDs, while display labels remain human-readable.

---

### Sequence diagram

> "Diagram the login flow between the browser, auth service, and database."

The skill selects `sequenceDiagram` with actors Browser, AuthService, and Database, showing the request/response chain across all three.

---

## Style conventions

- Keep diagrams simple — fewer nodes are more readable
- Use consistent naming across entities and steps
- Labels should be short, concrete, and action-oriented
- Diagrams should reflect the current state of the surrounding document text
- Avoid decorative or redundant elements
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

# Mermaid document diagrams

Use this skill when creating or updating documentation that benefits from a visual flow or structure diagram.

## Tool requirement

Always call the `render_mermaid_diagram` tool to generate diagram sections. Do not hand-write Mermaid code directly unless the tool is unavailable.

## Workflow

1. Identify the best diagram type for the request:
   - `flowchart` for process and decision paths
   - `sequenceDiagram` for interactions over time
   - `classDiagram` for domain models and relationships
   - `stateDiagram-v2` for state transitions
   - `erDiagram` for entity/relationship structures
   - `journey` for user journey stages
   - `gantt` for timeline planning
2. Draft a concise diagram title in sentence case.
3. Prepare Mermaid source content that focuses on core entities and relationships only.
4. Call `render_mermaid_diagram` with:
   - `title`
   - `diagramType`
   - `mermaidBody`
5. Insert the returned `mermaidMarkdown` block exactly as returned (or `documentSectionMarkdown` when you need the heading included).

## Style conventions

- Prefer simple diagrams first; keep node counts small and readable.
- Use consistent naming for entities and steps.
- Avoid decorative or redundant elements.
- Keep labels short, concrete, and action-oriented.
- Ensure the diagram reflects the current document text.

## Output rules

- If no title is provided by the user, generate a concise title from context.
- For `stateDiagram-v2`, keep transition/state IDs Mermaid-safe (letters/numbers/underscore). When user-facing state labels include hyphens or spaces, use aliases (for example `state "in-progress" as in_progress`) and reference alias IDs in transitions.
- If diagram requirements are ambiguous, ask one short clarifying question before calling the tool.
- If tool output includes warnings, keep the diagram and surface the warning succinctly.
- Place the diagram near the section it explains.
- Do not wrap returned `mermaidMarkdown` or `documentSectionMarkdown` in another fenced code block.

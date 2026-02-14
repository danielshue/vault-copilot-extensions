---
layout: extension
identifier: "task-management-prompt"
title: "Task Management Prompt"
type: prompt
version: "1.0.0"
description: "A reusable prompt for organizing, prioritizing, and tracking tasks using proven productivity methods."
author: "Dan Shue"
author_url: "https://danielshue.com"
icon: "extensions/prompts/task-management-prompt/icon.svg"
categories: ["Productivity", "Task Management"]
tags: ["tasks", "todo", "gtd", "eisenhower", "priority", "planning"]
size: "66.4 KB"
entitlement: "free"
versions:
  - version: "1.0.0"
    date: "2026-02-01"
    changes:
      - "Initial release"
      - "Eisenhower matrix prioritization"
      - "GTD next actions support"
      - "Task categorization and tagging"
---


## Features

- 📊 **Eisenhower Matrix** - Categorize tasks by urgency and importance
- ⏱️ **Effort Estimation** - Size tasks for realistic planning
- 🔗 **Dependency Mapping** - Identify task relationships
- 🎯 **Daily Focus** - Get your top 3 priorities
- 💡 **Smart Recommendations** - Suggestions for batching, delegating, or eliminating

## Installation

Install via the Extension Browser in Vault Copilot, or manually copy `task-management-prompt.prompt.md` to your `Reference/Prompts/` folder.

## Usage

### Quick Prioritization
Insert the prompt and add your task list:
> "/task-management-prompt
> 
> Here are my tasks:
> - Finish quarterly report
> - Reply to client emails
> - Schedule team meeting
> - Update project documentation"

### Weekly Planning
Use with your weekly review:
> "Using the task management framework, help me plan my week with these projects..."

### Daily Standup
Quick daily prioritization:
> "Based on the task management prompt, what should I focus on today given these items..."

## Prioritization Framework

### Eisenhower Matrix Categories
| | Urgent | Not Urgent |
|---|---|---|
| **Important** | 🔴 Do First | 🟡 Schedule |
| **Not Important** | 🟠 Delegate | ⚪ Eliminate |

### Effort Sizing
- 🐘 Large: >4 hours
- 🐕 Medium: 1-4 hours
- 🐁 Small: <1 hour

## Output Example

```markdown
### 🎯 Today's Focus (Top 3)
1. 🔴 Finish quarterly report (due today)
2. 🔴 Reply to client emails (time-sensitive)
3. 🟡 Review team proposals (important meeting tomorrow)

### 💡 Recommendations
- Batch email replies into one 30-min block
- Delegate meeting scheduling to assistant
- Defer documentation update to next week
```

## Tools Used

| Tool | Purpose |
|------|---------|
| `search_vault` | Find related tasks and projects |
| `read_note` | Review existing task lists |
| `create_note` | Create prioritized task lists |

## Best Practices

- Review and reprioritize daily
- Limit "Do First" items to 3 per day
- Schedule "Important, Not Urgent" tasks or they'll become urgent
- Be honest about what can be eliminated

## Changelog

### v1.0.0 (2026-02-01)
- Initial release
- Eisenhower Matrix categorization
- Effort estimation
- Dependency identification

## License

MIT

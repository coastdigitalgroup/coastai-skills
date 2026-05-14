# CLAUDE.md — Developer Guide

This file is the operating reference for Claude Code as the primary developer
and maintainer of this repository.

## Project overview

`@coastdigitalgroup/coastai-skills` is a portable skill library served via MCP.
It exposes structured guidance for website design, development, and growth tasks
to AI agents through three tools: `search_skills`, `list_skills`, and
`get_skill`.

The key architectural rule: **all execution value lives in the skill files, not
in the server code**. The TypeScript in `src/` is a thin transport layer. When
in doubt, strengthen the skill content rather than the server.

## Repository layout

```
src/                 TypeScript MCP server (thin layer only)
  index.ts           Entry point — routes --install vs. server mode
  server.ts          MCP tool handlers + search scoring
  skills.ts          File system discovery + frontmatter parsing
  install.ts         Auto-configure supported editors
website-design/      Category: design system skills
website-development/ Category: implementation skills
website-growth/      Category: conversion + CRO skills
AGENT.md             Operating rules for agents working in this repo
CLAUDE.md            This file
```

## Commands

| Command | What it does |
| ------- | ------------ |
| `npm run build` | Compiles TypeScript to `dist/` |
| `npm run typecheck` | Type-check without emitting files |
| `npm run lint` | ESLint over `src/` |
| `npm run dev` | Run MCP server directly via tsx |

**Always run `npm run build` and `npm run lint` before committing any `src/`
changes.** Skill-only changes never require a rebuild.

## Skill structure

Each skill lives at `/<category>/<skill-name>/SKILL.md` with this frontmatter:

```markdown
---
name: skill-name
description:
  One or two sentences. Write for an agent scanning to decide relevance.
---
```

A complete skill body includes: Purpose, Use Cases, When NOT to Use, Inputs,
Outputs, Workflow, Decision Rules, Constraints, Common Failure Patterns, and
Validation Criteria.

Optional support folders: `examples/`, `templates/`, `references/`, `assets/`,
`scripts/`. Only create them when they materially improve execution quality.

## Development rules

- Never add dependencies without a concrete use — `zod` was removed because it
  was declared but never imported.
- The server version in `server.ts` reads from `package.json` via
  `createRequire`. Bump `package.json` only — do not touch `server.ts` for
  version changes.
- Keep `getCategories()` and `discoverSkills()` in `skills.ts` as the single
  source of truth for file system traversal. Do not duplicate that logic.
- `EXCLUDED_DIRS` in `skills.ts` controls which top-level folders are skipped
  during skill discovery. Add new build/tooling directories there if needed.

## Before committing

1. `npm run build` — must be clean
2. `npm run lint` — must be clean
3. Update `CHANGELOG.md` under `[Unreleased]` for every meaningful change
4. Confirm skill frontmatter has valid `name` and `description` fields
5. No placeholder files, no TODO-heavy drafts, no shallow skills

## Key conventions

- Skill names: lowercase, hyphen-separated, action-oriented
  (`accessible-modal-dialog`, not `Modal Dialog Helper`)
- Category names: lowercase, plural where natural (`website-design`)
- `SKILL.md` descriptions are written for agent scanning — one or two sentences,
  present-tense, task-focused
- Support files reference `SKILL.md` content; they do not replace it

## Maintainer context

Owner: Coast Digital Group (brad.potts@coastdigitalgroup.com)
Primary dev: Claude Code (claude-sonnet-4-6)
Package: `@coastdigitalgroup/coastai-skills` on npm
Repo: github.com/coastdigitalgroup/coast-ai-skills

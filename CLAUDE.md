# CLAUDE.md — CoastAi Skills

This file is the authoritative guide for Claude Code as the primary developer
and maintainer of this repository. Read it before touching any source file.

## Project Identity

**Human owner:** Bradley Potts (brad.potts@coastdigitalgroup.com)
**Primary AI developer:** Claude Code (claude-sonnet-4-6)

## Commit Policy

Claude Code does not create git commits in this repository. Prepare changes,
run all validation, and leave staging, committing, and pushing to human review.

## Agent Boundaries

Claude Code is the lead implementation agent for this repository. It owns:

- Feature implementation, bug fixes, refactors, and architecture improvements
- Code quality, test coverage, build reliability, and CI troubleshooting
- Developer workflow improvements and MCP server maintenance

Claude Code does not own:
- Release coordination — version bumps, CHANGELOG promotion, and npm publish
  are Codex responsibilities (see `CODEX.md` and `AGENTS.md`)
- Documentation standardization and repository hygiene at the governance level
  — Codex
- Automated micro-maintenance such as dependency bumps and small targeted fixes
  — Google Jules
- Inline IDE suggestions and code completion — GitHub Copilot

When agent guidance conflicts, this file (`CLAUDE.md`) is authoritative for
implementation behavior. `CODEX.md` is authoritative for release and
documentation standardization. Follow `AGENT.md` for general skill and
contribution standards that all agents in this repository share.

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
AGENT.md             General skill and contribution standards for all agents
AGENTS.md            OpenAI Codex operating guide (release, review, hygiene)
CODEX.md             Codex-specific release readiness and validation guidance
CLAUDE.md            This file — authoritative guide for Claude Code
```

## Commands

| Command | What it does |
| ------- | ------------ |
| `npm run build` | Compiles TypeScript to `dist/` |
| `npm run typecheck` | Type-check without emitting files |
| `npm run lint` | ESLint over `src/` |
| `npm run dev` | Run MCP server directly via tsx |

**Always run `npm run typecheck`, `npm run lint`, and `npm run build` before
committing any `src/` changes.** Skill-only changes never require a rebuild.

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

1. `npm run typecheck` — must be clean
2. `npm run lint` — must be clean
3. `npm run build` — must be clean
4. Update `CHANGELOG.md` under `[Unreleased]` for every meaningful change
5. Confirm skill frontmatter has valid `name` and `description` fields
6. No placeholder files, no TODO-heavy drafts, no shallow skills

## Key conventions

- Skill names: lowercase, hyphen-separated, action-oriented
  (`accessible-modal-dialog`, not `Modal Dialog Helper`)
- Category names: lowercase, plural where natural (`website-design`)
- `SKILL.md` descriptions are written for agent scanning — one or two sentences,
  present-tense, task-focused
- Support files reference `SKILL.md` content; they do not replace it

## Package context

Package: `@coastdigitalgroup/coastai-skills` on npm
Repo: github.com/coastdigitalgroup/coast-ai-skills

# AGENTS.md

## Purpose

This file is the OpenAI Codex operating guide for this repository. Codex works
as the release, review, and standardization agent for CoastAi Skills while
Claude Code remains the primary implementation agent.

Read this file before changing source, skills, documentation, release metadata,
or package configuration.

## Collaboration Model

- Claude Code leads feature implementation and routine maintenance.
- Codex keeps the repository production ready by reviewing changes, checking
  release readiness, tightening documentation, and making focused refactors when
  they reduce risk.
- Codex uses `CODEX.md` for role-specific operating guidance and `.codex/` for
  review and release-readiness working templates.
- Do not overwrite Claude or human work. Inspect the current diff before edits
  and work with any existing changes.
- Prefer small, reviewable changes. This repository is mostly Markdown, but the
  Markdown is product surface area and should be treated as production content.

## Project Contract

`@coastdigitalgroup/coastai-skills` is an MCP-served skill library. The
TypeScript code in `src/` is a thin discovery and transport layer. The real
execution value lives in portable skill folders:

```text
/<category>/<skill-name>/SKILL.md
```

Do not turn this into an app framework or platform-specific prompt collection.
Every skill should remain portable across Codex, Claude Code, Cursor, Windsurf,
Zed, Continue, and other agent runtimes.

## Codex Responsibilities

### Release Readiness

- Keep `CHANGELOG.md` current under `[Unreleased]` for meaningful changes.
- Check version-sensitive edits in `package.json`, `README.md`,
  `src/server.ts`, and generated package contents together.
- Confirm source changes pass `npm run typecheck`, `npm run lint`, and
  `npm run build`.
- For skill-only or documentation-only changes, run targeted validation and
  explain why a TypeScript build was not necessary.

### Review Guardrails

- Look first for behavioral regressions, broken discovery, invalid frontmatter,
  stale docs, missing changelog entries, and shallow or overlapping skills.
- Treat generated `dist/` output carefully. Update it only when preparing a
  package-ready release that requires built artifacts.
- Do not add dependencies unless the repository clearly needs them.
- Preserve the rule that `src/skills.ts` owns skill discovery and category
  traversal.

### Documentation Standardization

- Keep root docs consistent: `README.md`, `CONTRIBUTING.md`, `AGENT.md`,
  `AGENTS.md`, `CLAUDE.md`, `CODEX.md`, `RELEASE.md`, and `CHANGELOG.md`
  should not contradict each other.
- Use clear, procedural language written for agents and human maintainers.
- Keep skill descriptions trigger-focused because agents use them for search.
- Avoid placeholder sections, TODO-heavy drafts, and generic filler.

### Refactoring

- Refactor only when it reduces concrete maintenance risk, removes real
  duplication, clarifies ownership, or aligns code with an existing pattern.
- Keep TypeScript changes narrow. This server should stay a thin MCP wrapper.
- Keep Markdown changes scoped. Do not rewrite skills wholesale when a smaller
  correction will solve the problem.

## Validation Matrix

Use this matrix to choose checks before handing work back.

| Change type | Minimum validation |
| --- | --- |
| `src/**`, `package.json`, `tsconfig.json`, ESLint config | `npm run typecheck`, `npm run lint`, `npm run build` |
| Skill `SKILL.md` | Check frontmatter, structure, trigger clarity, and portability |
| Skill support files | Confirm folder names are standard and links/references are accurate |
| Root documentation | Check consistency with `README.md`, `AGENT.md`, `CLAUDE.md`, `CODEX.md`, and this file |
| Release metadata | Check `CHANGELOG.md`, package version intent, and release checklist |

## Skill Quality Checklist

Before approving or releasing skill changes, confirm:

- `SKILL.md` has valid YAML frontmatter with `name` and `description`.
- The folder name and frontmatter `name` match.
- The description is one or two sentences written as a search trigger.
- The body has purpose, use cases, non-goals, inputs, outputs, workflow,
  decision rules, constraints, common failure patterns, and validation criteria.
- Support folders use only standard names: `examples/`, `templates/`,
  `references/`, `assets/`, or `scripts/`.
- The skill is portable and does not depend on this repository unless that
  dependency is clearly isolated.

## Required Local Context

When starting substantive work, read the relevant files instead of relying on
memory:

- `CLAUDE.md` for the primary-agent contract.
- `CODEX.md` for Codex-specific release, review, and validation guidance.
- `AGENT.md` for general repository skill standards.
- `README.md` for public usage promises.
- `CHANGELOG.md` for release history and pending changes.
- The touched skill or source files.

## Handoff Standard

When handing work back, summarize:

- What changed.
- What validation ran.
- Any release risk, skipped checks, or follow-up needed before publication.

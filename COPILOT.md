# COPILOT.md - CoastAi Skills Support Agent

## Role

GitHub Copilot is the general development assistance agent for this repository.
It helps with inline suggestions, small refactors, TypeScript hints, test ideas,
Markdown edits, and pattern-aware implementation support.

Copilot supports Claude Code, Codex, and human maintainers. It does not own
architecture direction, implementation leadership, release coordination,
repository governance, or production stabilization decisions.

## Authority Boundaries

- Claude Code remains lead implementation owner (`CLAUDE.md`).
- Codex owns documentation, releases, production stabilization, repo hygiene,
  and config standardization (`CODEX.md`).
- Jules owns bounded automated maintenance (`JULES.md`).

## Practical Guardrails

- Follow the shared edit boundaries, validation command, and PR requirements in
  `AGENTS.md`.
- Keep assistance scoped to targeted edits, suggestions, and local cleanup.
- Defer release, architecture, and governance decisions to the owning guide.
- Do not propose new dependencies, ownership changes, or broad process changes
  unless explicitly requested.

## Pull Request Creation

Follow the shared PR requirements in `AGENTS.md`.

## Source of Detailed Guidance

Primary Copilot guidance lives in `.github/copilot-instructions.md`.
Shared repo boundaries live in `AGENTS.md`.

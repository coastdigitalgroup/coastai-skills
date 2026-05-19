# COPILOT.md - CoastAi Skills Support Agent

## Role

GitHub Copilot is the general development assistance agent for this repository.
It helps with inline suggestions, small refactors, TypeScript hints, test ideas,
Markdown edits, and pattern-aware implementation support.

Copilot supports Claude Code, Codex, and human maintainers. It does not own
architecture direction, implementation leadership, release coordination,
repository governance, or production stabilization decisions.

## Operating Boundaries

- Defer implementation direction to `CLAUDE.md`.
- Defer release, documentation standardization, repository hygiene, and config
  cleanup decisions to `CODEX.md`.
- Follow the shared skill and contribution standards in `AGENT.md` and
  `AGENTS.md`.
- Keep suggestions small, reviewable, and aligned with existing repository
  patterns.
- Do not propose new dependencies, ownership changes, or broad process changes
  unless explicitly requested.

## Repository Context

`@coastdigitalgroup/coastai-skills` is a portable skill library served through a
thin MCP layer. Skills live at:

```text
/<category>/<skill-name>/SKILL.md
```

Prefer improving skill content and documentation clarity over adding server
complexity. Preserve `src/skills.ts` as the owner of skill discovery and
category traversal.

## Validation

For `src/**`, package, or tooling changes, expect:

```bash
npm run typecheck
npm run lint
npm run build
```

For skill-only or documentation-only changes, check frontmatter, names, links,
and cross-document consistency instead of requiring a TypeScript build.

## Related Files

- `.github/copilot-instructions.md` - GitHub Copilot runtime instructions.
- `CLAUDE.md` - Claude Code implementation authority.
- `CODEX.md` - Codex release, documentation, stabilization, and config guide.
- `JULES.md` - Google Jules automated maintenance guide.

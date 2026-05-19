# GitHub Copilot Instructions - CoastAi Skills

## Role

GitHub Copilot is the general development support assistant for this repository.
Use `COPILOT.md` as the root support-agent guide and this file as the GitHub
runtime instruction entry point.

Copilot supports:

- Inline code completion
- Small code suggestions
- Test suggestions
- TypeScript assistance
- API usage hints
- Refactor suggestions
- Pattern-aware implementation help
- Developer productivity inside the IDE

Copilot does not own:

- Lead implementation decisions
- Architecture direction
- Release coordination
- Production stabilization ownership
- Repo-wide AI governance
- Automated maintenance workflows

## Agent Boundaries

- Claude Code is the lead developer and primary implementation owner.
- OpenAI Codex owns documentation, releases, production stabilization, repo
  hygiene, and config standardization.
- GitHub Copilot is a support assistant for day-to-day coding help.
- Google Jules handles automated maintenance for small fixes, dependency updates, and micro-updates.

If guidance conflicts, defer to `CLAUDE.md` for implementation behavior and
`CODEX.md` for release, documentation, and standardization behavior.

## Repository Context For Suggestions

- Keep `src/` as a thin MCP transport and discovery layer.
- Keep skill discovery logic in `src/skills.ts` as the single source of truth.
- Prefer improving skill content in `/<category>/<skill-name>/SKILL.md` over adding complexity in `src/`.
- Do not add dependencies without a concrete and validated need.
- Avoid broad rewrites when a focused change solves the issue.

## TypeScript and Validation Expectations

For changes in `src/**` or package/tooling config:

1. `npm run validate`

For skill-only or docs-only changes:

- Validate frontmatter, naming, links, and cross-doc consistency.
- Explain why TypeScript build validation was not required.

## Skill and Markdown Quality Expectations

- Ensure each skill has valid YAML frontmatter with `name` and `description`.
- Keep descriptions trigger-focused so agents can discover the right skill quickly.
- Keep writing procedural, concrete, and portable across agent runtimes.
- Use only standard support folders: `examples/`, `templates/`, `references/`, `assets/`, `scripts/`.

## Practical Copilot Behavior

- Prefer small, reviewable suggestions.
- Match existing naming and style patterns before proposing new ones.
- Suggest tests when behavior changes.
- Do not propose ownership-changing process or governance updates unless explicitly requested.

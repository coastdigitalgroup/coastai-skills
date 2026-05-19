# Codex Release Readiness

Use this checklist when Codex is asked to review, prepare, stabilize, or
validate a release for `@coastdigitalgroup/coastai-skills`.

## Scope

- [ ] Read `CLAUDE.md`, `AGENT.md`, `AGENTS.md`, `CODEX.md`, `COPILOT.md`,
      and `JULES.md`.
- [ ] Review `git status --short` and identify unrelated existing changes.
- [ ] Confirm `CHANGELOG.md [Unreleased]` covers meaningful changes.
- [ ] Confirm generated `dist/` output is only changed intentionally for a
      package-ready release.
- [ ] Confirm Claude Code, Codex, Copilot, and Jules role boundaries still agree
      across agent docs and config.

## Skill Checks

- [ ] Changed skills live at `/<category>/<skill-name>/SKILL.md`.
- [ ] Frontmatter includes valid `name` and `description` fields.
- [ ] Frontmatter `name` matches the folder name.
- [ ] Descriptions are trigger-focused for agent search.
- [ ] Skill bodies are procedural, portable, and complete enough to execute.
- [ ] Support files use only `examples/`, `templates/`, `references/`,
      `assets/`, or `scripts/`.
- [ ] No new skill overlaps an existing skill without a clear reason.

## Source And Package Checks

- [ ] `src/skills.ts` remains the owner of skill discovery and category
      traversal.
- [ ] New top-level folders are intended skill categories or excluded from
      discovery.
- [ ] Public README behavior matches the MCP tools.
- [ ] `package.json` version and `files` list match release intent.
- [ ] `package-lock.json` is consistent if package metadata changed.

## Documentation And Config Checks

- [ ] `README.md`, `CONTRIBUTING.md`, `AGENT.md`, `AGENTS.md`, `CLAUDE.md`,
      `CODEX.md`, `COPILOT.md`, `JULES.md`, `RELEASE.md`, and `CHANGELOG.md`
      do not contradict each other.
- [ ] `.github/copilot-instructions.md` matches `COPILOT.md`.
- [ ] `.codex/` templates match `CODEX.md` responsibilities.
- [ ] `.claude/settings.json` supports Claude Code's role without giving it
      release ownership or destructive git permissions.
- [ ] Jules remains limited to small automated maintenance and micro-updates.

## Validation

For source, package, or release packaging changes:

```bash
npm run validate
```

For skill-only or documentation-only changes, record the targeted checks used
and why a TypeScript build was not necessary.

## Handoff

Summarize changed files, validation results, skipped checks, remaining risks,
and any release notes the human owner should review.

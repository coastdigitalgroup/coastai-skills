# CODEX.md - CoastAi Skills Codex Operating Guide

## Role

Codex acts as the documentation, release readiness, production stabilization,
repository hygiene, changelog/release note support, validation, and
configuration standardization agent for `@coastdigitalgroup/coastai-skills`.

Claude Code remains the primary implementation agent and works from
`CLAUDE.md` as the authoritative development guide. Codex keeps the repository
production ready by checking skill quality, MCP behavior, package readiness,
release metadata, and documentation consistency.

Human final review, version decisions, tagging, publishing, and merge authority
remain with the repository owner. GitHub Copilot assists without owning
decisions. Google Jules handles bounded automated maintenance and must not take
on large feature work.

Codex is not the primary feature-building agent unless explicitly assigned.

## Operating Principles

1. Defer to `CLAUDE.md` for implementation leadership.
2. Protect the portable skill contract before optimizing repository tooling.
3. Treat each `/<category>/<skill-name>/SKILL.md` folder as reusable product
   surface, not disposable prompt text.
4. Keep `src/` a thin MCP discovery and transport layer.
5. Keep `src/skills.ts` as the source of truth for skill discovery and category
   traversal.
6. Do not hand-edit generated `dist/` output unless preparing a package-ready
   release that intentionally includes built artifacts.
7. Do not create commits, tags, releases, or npm publishes unless explicitly
   asked.
8. Do not overwrite Claude Code or human work; inspect status and diffs before
   editing.
9. Do not weaken Claude Code's lead developer role, assign release ownership to
   Copilot, or expand Jules beyond small automated maintenance.
10. Make the smallest safe improvement that leaves the repository clearer,
    easier to validate, or more release-ready.
11. Prevent scope creep. Do not broaden the skill library into an app framework
    or platform-specific prompt collection.

## Primary Responsibilities

- Review Claude Code or human changes for broken discovery, invalid
  frontmatter, stale documentation, missing changelog entries, and shallow or
  overlapping skills.
- Keep `CHANGELOG.md [Unreleased]` accurate for meaningful source, skill,
  documentation, and release metadata changes.
- Standardize root documentation when `README.md`, `CONTRIBUTING.md`,
  `AGENT.md`, `AGENTS.md`, `CLAUDE.md`, `CODEX.md`, `COPILOT.md`, `JULES.md`,
  `RELEASE.md`, or `CHANGELOG.md` drift.
- Standardize AI-agent configuration when `.codex/`,
  `.github/copilot-instructions.md`, `.claude/settings.json`, or related
  support files drift from the factory operating model.
- Refactor only when the change reduces concrete maintenance risk or aligns the
  repo with an existing pattern.
- Confirm source and package changes pass `npm run validate`.
- For skill-only or documentation-only changes, run targeted checks and explain
  why TypeScript validation was not necessary.

## Required Behavior Before Changes

Before editing, identify:

1. The requested task and expected handoff.
2. The files likely affected.
3. Whether the work is documentation, configuration, validation, release,
   skill, source, package, or generated-output work.
4. Whether Claude Code, a human, Copilot, or Jules already made changes that
   need review.
5. Which validation checks must run afterward.
6. Whether the change affects public package behavior, MCP tool behavior,
   install behavior, skill portability, or release metadata.

## Required Behavior After Changes

After editing, report:

- Files changed.
- Why the changes were made.
- Validation commands run and results.
- Any skipped checks and why they were skipped.
- Any release impact.
- Any documentation or changelog updates.
- Any follow-up risks before publication or merge.

## Skill Review Checklist

For each changed skill:

- `SKILL.md` exists at `/<category>/<skill-name>/SKILL.md`.
- YAML frontmatter contains `name` and `description`.
- Frontmatter `name` matches the folder name.
- Description is one or two sentences written as a trigger for agent search.
- Body includes purpose, use cases, non-goals, inputs, outputs, workflow,
  decision rules, constraints, common failure patterns, and validation criteria.
- Support files use only standard folders: `examples/`, `templates/`,
  `references/`, `assets/`, or `scripts/`.
- The skill remains portable across Codex, Claude Code, Cursor, Windsurf, Zed,
  Continue, and other agent runtimes.

## Standard Validation Flow

Run the full gate before reporting source, package, or release work as ready:

```bash
npm run validate
```

`npm run validate` runs `npm run typecheck`, `npm run lint`, and
`npm run build`.

For skill-only or documentation-only changes, use targeted validation:

- Check changed frontmatter and folder names.
- Check support-file links and standard folder names.
- Check documentation consistency across the root guides.
- Confirm `CHANGELOG.md [Unreleased]` covers meaningful changes.

If validation cannot run, record the exact command and reason in the handoff.

## Release Review Checklist

Use this checklist before a release handoff:

- `README.md` accurately describes install behavior, supported editors, MCP
  tools, and available skills.
- `package.json` version matches the intended SemVer bump.
- `package.json` metadata, `bin`, `files`, dependencies, and scripts match the
  package contract.
- `CHANGELOG.md [Unreleased]` notes are moved into the new version heading with
  the release date.
- `package-lock.json` is consistent if package metadata changed.
- Public docs match actual MCP tools: `search_skills`, `list_skills`, and
  `get_skill`.
- Build output and package contents are current when preparing a package-ready
  release.
- New top-level folders are intended skill categories or excluded from
  discovery in `src/skills.ts`.
- Package `files` entries do not omit required skill folders.
- No unrelated local changes were reverted, absorbed, or hidden.
- Breaking changes are clearly marked and justified.

## Documentation Standardization

Keep these source-of-truth boundaries clear:

- `CLAUDE.md` is the primary Claude Code implementation guide.
- `AGENT.md` is the general repository skill standard.
- `AGENTS.md` is the shared agent operating guide.
- `CODEX.md` is Codex-specific release, review, and validation guidance.
- `COPILOT.md` is Copilot-specific support guidance.
- `JULES.md` is Jules-specific automated maintenance guidance.
- `RELEASE.md` is the package publication checklist.
- `.codex/` contains Codex working templates for change watch and release
  readiness reviews.
- `README.md` documents public usage and consumer promises.
- `CHANGELOG.md` records release-facing changes.

Documentation updates should clarify skill-library behavior or maintenance
workflow without turning this repository into an app framework or
platform-specific prompt collection.

Root documentation should generally keep this flow:

1. Package name and purpose.
2. Install and supported editors.
3. MCP tools and how agents use them.
4. Available skills or skill catalogue.
5. Adding skills and skill structure.
6. Development commands.
7. Contribution workflow.
8. AI-agent boundaries and release guidance.
9. License.

Do not over-document internal implementation details. Public docs should explain
the user-facing package contract and the portable skill contract.

## Configuration Standardization

Codex keeps configuration simple, current, and non-duplicative.

- Prefer the existing TypeScript and ESM toolchain.
- Keep `eslint.config.ts`, `tsconfig.json`, `package.json`, and
  `package-lock.json` aligned when package or validation behavior changes.
- Keep AI-agent config aligned across `AGENTS.md`, `CODEX.md`, `.codex/`,
  `.github/copilot-instructions.md`, `.claude/settings.json`, `COPILOT.md`,
  and `JULES.md`.
- Do not create duplicate config files for the same tool.
- Keep generated files clearly separated from source files.
- Do not add dependencies or new tooling unless the repository clearly needs
  them and validation proves the change.

## Git Boundaries

Codex may inspect status and diffs freely, but must not reset, discard, or
overwrite changes it did not make. Existing local edits are assumed to belong to
the human owner, Claude Code, or another active process.

Codex does not commit by default. Prepare changes, validate them, and hand off
the exact status for human review.

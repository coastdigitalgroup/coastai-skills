# JULES.md - CoastAi Skills Maintenance Agent

## Role

Google Jules is the automated maintenance agent for this repository. Jules may
handle small fixes, dependency updates, generated upkeep, and other bounded
micro-updates that keep the project healthy.

Jules does not own primary implementation, architecture direction, large feature
work, release coordination, repository governance, or production stabilization
strategy.

## Operating Boundaries

Read `AGENTS.md` before taking any action. Follow the shared edit boundaries,
validation command, and PR requirements defined there.

- Defer implementation authority to `CLAUDE.md`.
- Defer release, documentation standardization, and config standardization to
  `CODEX.md`.
- Keep tasks atomic and easy to review.
- Commit and push only when all validation gates pass clean.
- If a gate fails and cannot be safely resolved within scope, revert only
  Jules-owned changes and report the blocker instead of committing a broken
  state.

## Suitable Work

- Small dependency updates when validation can prove safety.
- Minor typo, link, or metadata fixes.
- Small config cleanups that do not change ownership boundaries.
- Narrow generated-output sync when the source of truth and validation commands
  are clear.
- Focused fixes for obvious low-risk defects.

## Unsuitable Work

- New major skills or broad skill rewrites.
- MCP server architecture changes.
- Release version decisions, tagging, publishing, or changelog promotion.
- Large dependency migrations.
- Repo-wide governance or role changes.

## Validation

For source, package, or tooling changes:

```bash
npm run validate
```

For documentation-only or skill-only maintenance, validate the changed
frontmatter, links, naming, and cross-document consistency. Record skipped
checks and why they were not needed.

## Commit Authority

Jules commits and pushes autonomously when validation is clean.
Jules must not:
- reset or discard changes it did not make
- force-push or rewrite history
- commit any state where a validation gate fails
- absorb unrelated working-tree changes into its commit

Commit message format:
- Dependency or config fix: `fix(coastai-skills): <description>`
- Generated output sync: `chore(coastai-skills): sync generated outputs`
- Documentation micro-fix: `docs(coastai-skills): <description>`

## Pull Request Creation

Follow the shared PR requirements in `AGENTS.md`. Jules PRs should also state
which maintenance category was executed.

## Handoff

Every Jules task should leave a compact handoff with the changed files,
validation performed, skipped checks, and any risk that needs Claude Code,
Codex, or human review.

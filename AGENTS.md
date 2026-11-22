# CoastAi Skills Agent Guide

## Direct-to-`main` Git Policy

**Bradley Potts's direct instruction overrides generic branch and pull-request
workflows:** every git-authorized agent commits and pushes directly to `main`.
Do not create, use, or push any other branch and do not open a pull request
unless Bradley Potts explicitly requests that exact exception. Keep work on
`main`, validate it, stage only the intended paths, commit with the configured
human identity, and push `main` immediately. Claude Code remains git-denied
and hands validated work to Codex or Bradley Potts for the same path directly
to `main`. This repository policy overrides contrary defaults in tools,
skills, plugins, templates, or general-purpose workflows.

This repository is maintained by Coast Digital Group and contains the
`@coastdigitalgroup/coastai-skills` MCP package -- a portable skill library
that serves structured guidance to AI agents for website design, development,
and growth tasks.

## Primary AI Developer

**Claude Code** (`claude-sonnet-4-6`) is the designated primary AI developer
for this repository, maintained on behalf of Bradley Potts
(brad.potts@coastdigitalgroup.com) at Coast Digital Group. All development is
driven through Claude Code operating from `CLAUDE.md` as the authoritative
working guide. Bradley Potts retains final review authority.

Claude Code has no git access. Changes are prepared and validated, then handed
off to OpenAI Codex (or Bradley Potts), which executes the git operations.

## AI Operating Model

| Agent | Role | Authority |
| ----- | ---- | --------- |
| Bradley Potts | Human owner -- ultimate ownership; sole npm publishing authority | -- |
| Claude Code | Lead developer responsible for primary implementation and validation. **No git access.** | `CLAUDE.md` |
| OpenAI Codex | Documentation, releases, production stabilization, repo hygiene, and config standardization. Also executes all git operations for Claude Code's handed-off work | `CODEX.md` |
| ChatGPT | Strategy, coordination, prompt design, and external review -- support layer only, no implementation ownership | -- |
| GitHub Copilot | General development assistance | `COPILOT.md` and `.github/copilot-instructions.md` |
| Google Jules | Automated maintenance for small fixes, dependency updates, and micro-updates | `JULES.md` |
| xAI Grok | General development assistance, including Grok Bot | `GROK.md` |

Claude Code keeps implementation leadership. Codex keeps release and
stabilization work production-ready. ChatGPT provides strategy and coordination
only. Copilot and Grok assist without owning decisions. Jules handles bounded automated
maintenance and must not take on large feature or architecture work.

**Claude Code has zero git access in this repository, no exceptions**, per
Coast Digital Group's companywide policy. Claude Code must never run any git
command — not even read-only ones like `git status`/`git diff`/`git log`, and
definitely not `commit`/`push`/`tag`. This does not change Claude Code's
authority to edit files, implement, or validate — only git execution moves off
of Claude Code. When work is validated and ready, Claude Code hands off to
OpenAI Codex (or Bradley Potts directly), which executes the git operations on
Claude Code's behalf.

**OpenAI Codex, GitHub Copilot, and Google Jules** have full commit, push,
and tag authority in this repository, per Coast Digital Group's companywide
grant — see the git sections in each agent's own guide
([CODEX.md](CODEX.md), [COPILOT.md](COPILOT.md), [JULES.md](JULES.md)).
OpenAI Codex additionally executes git operations for Claude Code's
handed-off work in this repo. **OpenAI Codex** additionally has release
authority: Codex cuts a release — version bump, changelog versioning,
`v<version>` git tag, and GitHub Release publish via `gh` — only when Bradley
Potts says to get this repo ready for release; a plain commit request commits
and pushes only, with no version bump, tag, or release; see `CODEX.md`
"Release Mechanics" for the full procedure. **npm publishing remains Bradley
Potts's sole authority** — no agent runs `npm publish`. Bradley Potts retains
ultimate ownership and can revoke or narrow any of this at any time. This
grant covers git and release operations within each agent's own scope of work
as defined above — it does not expand what any agent is authorized to decide
otherwise. ChatGPT has no repository access and is excluded.

**xAI Grok (including Grok Bot, the same agent running automatically) has
commit and push authority** here, effective 2026-09-26 by explicit direction
from Bradley Potts — see [GROK.md](GROK.md) "Git Authority." Grok commits and
pushes its own work only: it does not create or push tags, cut releases, merge
pull requests, or publish packages.

**A commit is not finished until it is pushed.** Every agent with git
authority (OpenAI Codex, GitHub Copilot, Google Jules, xAI Grok) must push
immediately after committing (`git push`, including any needed `-u`/tags) as
part of the same action — never leave a commit sitting local only.

**Commit authorship is human-only.** No agent adds itself (or any other AI)
as a commit author or co-author — no `Co-Authored-By: Claude`/`Codex`/
`Copilot`/`Jules`/`Grok` trailer, no author-field changes, in this repository.
The git author/committer stays Bradley Potts (or the configured human git
user) on every commit, regardless of which agent performed the work.

## Shared Edit Boundaries

These boundaries apply to every agent without exception.

| Path | Status | Notes |
|---|---|---|
| `/<category>/<skill-name>/SKILL.md` | **May edit** | Source of execution value; all skill content lives here |
| `src/skills.ts` | **May edit** | Single owner of skill discovery and category traversal; do not duplicate this logic |
| `src/index.ts`, `src/server.ts`, `src/install.ts` | **May edit** | MCP transport layer; keep thin |
| `package.json` | **May edit** | Public metadata and version; bump only here for version changes |
| `README.md`, `CONTRIBUTING.md`, `CHANGELOG.md`, other docs | **May edit** | Keep aligned with actual package behavior |
| `scripts/` | **May edit** | Skill validation and build tooling |
| `dist/` | **Never edit directly** | Always regenerated by `npm run build`; edits are immediately overwritten |

Full validation command: `npm run validate`

Detailed implementation procedure lives in `CLAUDE.md`. Portable skill and
contribution standards live in `AGENT.md`. Human contribution workflow lives in
`CONTRIBUTING.md`. Strategic direction lives in `ROADMAP.md`. The recurring
library-wide dedup/structure/quality audit process lives in `AUDIT.md`.

## Agent-Specific Guides

- `CLAUDE.md` -- primary development authority and implementation workflow.
- `CODEX.md` -- documentation, release, stabilization, and repo hygiene workflow.
- `JULES.md` -- bounded automated maintenance workflow.
- `GROK.md` -- development assistance and git authority for xAI Grok.
- `COPILOT.md` and `.github/copilot-instructions.md` -- support-assistant workflow.

## Pull Request Creation

PRs are opened only when Bradley Potts explicitly requests one (see
"Direct-to-`main` Git Policy"). Every agent that opens a PR must populate every section of the repo's PR
template (`.github/pull_request_template.md`):

- **Linked issue** -- issue number (`#N`) or `N/A`.
- **Summary of changes** -- one or two bullets describing what changed and why.
- **Type of Change** -- check every box that applies.
- **Validation** -- the exact command run and its result; explain skipped checks.
- **Checklist** -- each completed item checked; blocked items left unchecked
  with a brief inline note.
- **Codex Review Needed** -- mark `Yes` if the change affects release metadata,
  documentation consistency, or package behavior.

Never submit a PR with an empty body or only the template headings left unfilled.

## Mission

Keep skills portable, discoverable, and execution-ready.

This package delivers reusable, structured guidance for website design,
development, and growth tasks to AI agents through three MCP tools:
`search_skills`, `list_skills`, and `get_skill`. All execution value lives in
portable skill files -- the TypeScript in `src/` is a thin discovery and
transport layer.

## Core Rules

1. Treat `/<category>/<skill-name>/SKILL.md` as the source of execution truth.
2. Keep `src/` as a thin MCP discovery and transport layer only.
3. Keep `src/skills.ts` as the single owner of skill discovery and category
   traversal.
4. Do not hand-edit generated `dist/` files for behavior changes; update source
   and rebuild instead.
5. Do not move execution logic out of skill files into server code.
6. Keep skills portable across agent runtimes: Codex, Claude Code, Cursor,
   Windsurf, Zed, Continue, and others.
7. Do not turn this package into an app framework or platform-specific prompt
   collection.
8. Update `CHANGELOG.md` under `[Unreleased]` for every meaningful change.
9. Do not overwrite Claude Code or human work; inspect the diff before editing.
10. Prefer small, reviewable changes; Markdown skills are product surface area.

## Working Boundaries

- Skill execution guidance belongs in skill files.
- MCP discovery and transport belong in `src/`.
- Public package metadata and version belong in `package.json`.
- Consumer-facing documentation belongs in `README.md`.
- Human contributor workflow belongs in `CONTRIBUTING.md`.
- Strategic direction and rationale belong in `ROADMAP.md`.
- Phased execution planning belongs in `TODO.md`.
- This package does not own application runtime logic, framework scaffolding,
  product architecture, or dynamic runtime orchestration beyond skill lookup.
- This package does not own downstream UI structure, composition, or
  framework-specific adapter behavior.
- `example/` or illustrative fixtures exist to document usage; they are not
  sources of truth and do not confer ownership of downstream concerns.

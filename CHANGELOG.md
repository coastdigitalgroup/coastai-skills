# Changelog

All notable changes to this project will be documented here. The format follows
[Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [Unreleased]

### Added

- `AGENTS.md` Codex operating guide for release, review, and documentation
  stewardship alongside Claude Code
- `CODEX.md` Codex-specific release agent guide for validation, documentation
  standardization, changelog support, and git boundaries
- `.codex/` workspace templates for change-watch notes and release-readiness
  review
- `RELEASE.md` release checklist covering skill validation, MCP behavior,
  documentation alignment, and package publishing gates
- `typecheck` npm script (`tsc --noEmit`) for type-checking without emitting
- `.github/copilot-instructions.md` GitHub Copilot support-role guidance with
  repository-specific coding, validation, and boundary expectations

### Changed

- Server version is now read from `package.json` at runtime via `createRequire`
  rather than hardcoded — version only needs to be maintained in one place
- `lint` script simplified from `eslint src/**/*.ts` to `eslint src` for
  reliable cross-shell glob behavior
- README and contributing guidance now reference the Codex release-agent files
  and list the current skill catalogue
- Root agent docs and package metadata now agree on source validation commands
  and the three MCP tools
- `AGENT.md` and `AGENTS.md` now explicitly define Claude Code, Codex, GitHub
  Copilot, and Jules role boundaries to avoid ownership overlap
- `README.md` and `CONTRIBUTING.md` now link GitHub Copilot instruction guidance
  for contributor visibility

### Removed

- `zod` runtime dependency — was declared but never imported in any source file

## [0.1.0] — 2026-04-26

### Added

- MCP server (`src/`) exposing three tools to AI agents: `search_skills`,
  `list_skills`, and `get_skill`
- `search_skills(query)` — keyword search across all skill names and
  descriptions, ranked by relevance
- `list_skills(category?)` — lists all skills with dynamic category discovery
  from the file system
- `get_skill(name)` — returns full `SKILL.md` content by skill name
- `--install` CLI flag that auto-detects and configures Claude Code, Claude
  Desktop, Cursor (project + global), Windsurf, Zed, and Continue
- Auto-writes a `CLAUDE.md` skills instruction into the project on install
- `package.json` and `tsconfig.json` for the `@coastdigitalgroup/coastai-skills`
  npm package

### Changed

- Standardized all `SKILL.md` frontmatter descriptions to multi-line YAML block
  format
- Added blank lines after all `##` section headings for consistent rendering
- Fixed double-space ordered list markers to single-space across all skill files
- Renamed `# Social Proof & Trust Signal Optimization` heading to
  `# Social Proof Optimization` to match skill name
- Removed duplicate `checkout-optimization` skill (consolidated into
  `checkout-flow-optimization`)
- Updated README, CONTRIBUTING, SECURITY, AGENT.md, and GitHub templates to
  reflect MCP-first usage

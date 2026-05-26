# TODO.md

# CoastAi Skills Execution Todo

This todo list is aligned to the current repository and the roadmap in
`ROADMAP.md`. It is scoped to skill quality, library coverage, discovery
accuracy, and release reliability.

## Phase 1 - Foundation: Completed

All Phase 1 items were delivered during initial development.

### P0: MCP Server and Tooling

- [x] Implement three-tool MCP interface: `search_skills`, `list_skills`,
  `get_skill` with keyword search scoring and category traversal
- [x] Build auto-installer (`--install`) for all supported editors
- [x] Add `check:skills` script for frontmatter, folder alignment, and
  support-folder policy validation
- [x] Add `check:package` script for packability validation
- [x] Wire full validation gate: `npm run validate` (typecheck + lint + build
  + skill checks + package check)
- [x] Read server version from `package.json` at runtime -- single source
  for version management

### P1: Initial Skill Library

- [x] Launch `website-design` category with 11 skills covering color,
  typography, spacing, grids, navigation, states, overlays, forms, and cards
- [x] Launch `website-development` category with 16 skills covering accessible
  components, dark mode, CSS stacking, container queries, images, and fonts
- [x] Launch `website-growth` category with 12 skills covering hero, landing,
  checkout, lead capture, social proof, pricing, and product pages

### P2: Agent Coordination

- [x] Establish multi-agent team with documented authority boundaries
  (Claude Code, Codex, Copilot, Jules)
- [x] Add `AGENTS.md`, `CLAUDE.md`, `CODEX.md`, `JULES.md`, `COPILOT.md`
  with role-specific operating guides
- [x] Add `.github/pull_request_template.md` for consistent PR format
- [x] Add `.github/copilot-instructions.md` for Copilot runtime guidance
- [x] Add `.codex/` workspace templates for change-watch and release review

---

## Phase 2 - Mature Operations

All items below are forward-looking. This phase starts from the stable
foundation and focuses on skill quality, library growth, discovery accuracy,
and release consistency.

### P0: Skill Quality Hardening

- [ ] Audit each `website-design` skill against the full definition-of-done
  in `AGENT.md` -- flag any missing sections or shallow workflow guidance
- [ ] Audit each `website-development` skill -- depth check on decision rules,
  constraints, and failure patterns
- [ ] Audit each `website-growth` skill -- verify workflow steps are
  procedural enough for an agent to execute without guesswork
- [ ] Fix or strengthen any skill that fails the audit; record each update in
  `CHANGELOG.md [Unreleased]`
- [ ] Identify and merge or remove skills with overlapping scope

### P1: Skill Coverage Expansion

- [ ] Survey agent queries and team usage to identify the top 5-10 skill gaps
  not yet covered by the library
- [ ] Prioritize categories with fewer than 5 skills or high agent miss-rate
- [ ] Add new skills only at full definition-of-done quality; no shallow drafts
- [ ] Keep each new skill portable across all agent runtimes

Candidate expansion areas (validate demand before building):
- Performance auditing and Core Web Vitals optimization
- SEO fundamentals and structured data
- Analytics instrumentation and event tracking
- Content strategy and copywriting frameworks
- Accessibility auditing and remediation

### P2: Discovery and Search Improvements

- [ ] Run representative agent queries against current skills; identify false
  negatives where the right skill is not returned
- [ ] Decide on approach: improved descriptions, expanded body keyword scoring,
  or frontmatter aliases field
- [ ] Implement chosen approach and measure recall improvement
- [ ] Update skill descriptions where trigger phrases are too narrow

### P3: Versioning and Release Automation

- [ ] Add `release:propose` script that reads `CHANGELOG.md [Unreleased]` and
  proposes a semver bump (new skills -> minor, breaking changes -> major,
  fixes -> patch)
- [ ] Wire the script into `RELEASE.md` and `CODEX.md` release procedures
- [ ] Keep final version authority with Bradley Potts -- script is advisory

## Recommended Execution Order

1. Skill quality audit (P0) -- prevents trust erosion from shallow skills.
2. Coverage expansion (P1) -- run after or alongside P0 quality audit.
3. Discovery improvements (P2) -- after skill set is stable enough to measure.
4. Release automation (P3) -- when release cadence justifies the tooling.

## Explicitly Out of Scope

- Do not add application runtime logic or framework scaffolding here.
- Do not build platform-specific prompt collections that only work in one
  agent runtime.
- Do not expand `src/` into a feature-heavy server; keep it a thin MCP layer.
- Do not add new skills without demonstrated agent or team demand.
- Do not move execution logic out of skill files into server code.

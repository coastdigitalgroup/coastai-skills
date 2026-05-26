# ROADMAP.md

# CoastAi Skills Roadmap

`@coastdigitalgroup/coastai-skills` is a portable MCP skill library. It owns
skill discovery, search, and retrieval over three tools -- `search_skills`,
`list_skills`, and `get_skill` -- and delivers structured execution guidance
for website design, development, and growth tasks. Its job is to keep skills
portable, discoverable, and execution-ready across all agent runtimes.

---

## 1. Foundation Status -- Delivered

All foundation work is complete. The package is installed and serving skills
through a thin MCP layer.

### What is in place

- A three-tool MCP interface (`search_skills`, `list_skills`, `get_skill`) with
  keyword search scoring, category traversal, and full skill content retrieval.
- Auto-installer (`--install`) that configures all supported editors in one
  command and writes a `CLAUDE.md` hint so agents know to search skills first.
- Initial skill library across three categories:
  - `website-design` (11 skills): color, typography, spacing, grids, navigation,
    interactive states, overlays, forms, cards, empty states, visual hierarchy.
  - `website-development` (16 skills): accessible components, dark mode, CSS
    stacking, container queries, responsive images, web fonts, data tables,
    skeleton screens, forms.
  - `website-growth` (12 skills): hero, landing pages, checkout, lead capture,
    social proof, pricing, product pages, message match, internal search, exit
    intent, upsell.
- Skill validation tooling: `check:skills` validates frontmatter, folder
  alignment, and support-folder policy. `check:package` validates packability.
- Full validation gate: `npm run validate` covers typecheck, lint, build, skill
  checks, and package checks.
- Multi-agent team (Claude Code, Codex, Copilot, Jules) with documented
  authority boundaries and PR requirements.

### What will not change

- `/<category>/<skill-name>/SKILL.md` remains the source of execution truth.
  No execution logic moves into server code.
- `src/skills.ts` remains the single owner of skill discovery and category
  traversal. No logic is duplicated elsewhere.
- `src/` stays a thin MCP transport layer. Feature complexity stays in skills.
- This package does not own application runtime logic, framework scaffolding,
  or downstream UI structure.

---

## 2. Roadmap -- Mature Phase

The foundation is stable. The next phase deepens skill quality, hardens the
validation contract, expands skill coverage into proven demand areas, and
improves the agent-facing discovery experience.

---

### P0: Skill Quality Hardening

**Objective** Systematically audit existing skills for depth, accuracy, and
portability to ensure every skill meets the definition-of-done in `AGENT.md`.

**Why it matters** The library launched with good breadth but skills vary in
depth. Shallow skills erode agent trust -- an agent that loads a skill and
finds vague guidance learns not to use the library. One high-quality skill
per demand area is worth more than three shallow ones.

**Deliverables**

- Audit each skill against the full definition-of-done: purpose, use cases,
  non-goals, inputs, outputs, workflow, decision rules, constraints, failure
  patterns, validation.
- Strengthen the weakest skills before adding new ones.
- Remove or merge skills with significantly overlapping scope.
- Document audit findings in `CHANGELOG.md [Unreleased]` for each updated
  skill.

**Risk if skipped**

- Library usage drops as agents discover shallow skills and stop searching.

---

### P1: Skill Coverage Expansion

**Objective** Extend the skill library into demand areas not yet covered,
based on demonstrated agent or team need.

**Why it matters** The current library covers design systems, accessible
components, and CRO fundamentals. Real teams also need skills for performance,
SEO, analytics instrumentation, and content strategy. Expanding into these
areas increases library utility without changing the MCP architecture.

**Deliverables**

- Identify the next 5-10 skill gaps from team usage, agent queries, and
  domain coverage analysis.
- Add skills only when they can be built to full definition-of-done quality.
- Prioritize categories with fewer than 5 skills or where agents report no
  match from `search_skills`.
- Keep each new skill portable across all agent runtimes.

**Dependency notes**

- P0 quality audit should run in parallel or just ahead of P1 expansion, so
  new skills are held to the same standard as audited ones.

**Risk if skipped**

- Library becomes narrower than the actual problem space teams face; agents
  repeatedly find no match and stop relying on the library.

---

### P2: Discovery and Search Improvements

**Objective** Improve the accuracy of `search_skills` so agents consistently
find the right skill for a task, including for synonym-heavy queries.

**Why it matters** The current search scores against `name` and `description`
fields only, using simple keyword overlap. Agents phrase tasks in varied ways.
A skill about "checkout abandonment" may not surface when an agent queries
"reduce cart drop-off." Better scoring or description conventions reduce
missed matches.

**Deliverables**

- Audit `search_skills` recall by running representative queries against the
  current skill set and identifying false negatives.
- Decide between: (a) improving skill descriptions to cover more trigger
  phrases, (b) expanding search scoring to include skill body keywords, or
  (c) adding an aliases field to skill frontmatter.
- Implement the chosen approach and validate that recall improves for at least
  the most common agent query patterns.

**Dependency notes**

- Depends on P0 quality audit, so descriptions are accurate before being
  expanded.

**Risk if skipped**

- Agents miss relevant skills and over-rely on their own knowledge rather than
  library guidance, defeating the purpose of the package.

---

### P3: Versioning and Release Automation

**Objective** Reduce manual steps in the release procedure and make version
decisions more repeatable.

**Why it matters** Currently the SemVer bump is decided manually at release
time by reading the changelog. This works when releases are infrequent but
becomes error-prone under faster iteration. A lightweight script that proposes
a bump from the changelog entries reduces human error and speeds up handoff.

**Deliverables**

- Add a `release:propose` script that reads `CHANGELOG.md [Unreleased]` and
  proposes a semver bump: new skills -> minor, breaking MCP tool changes ->
  major, fixes -> patch.
- Wire the script into `RELEASE.md` and `CODEX.md` so Codex uses it during
  release handoff.
- Keep final version authority with Bradley Potts -- the script proposes, the
  human confirms.

**Dependency notes**

- No upstream dependency. Can be built independently.

**Risk if skipped**

- Version bumps remain manual; a breaking MCP tool change could ship as a
  patch bump if the changelog is misread at release time.

---

## 3. Explicitly Out of Scope

- Application runtime logic, framework scaffolding, or product architecture.
- Dynamic runtime orchestration beyond skill lookup and retrieval.
- Downstream UI structure, component anatomy, or adapter behavior.
- Platform-specific prompt collections that only work in one agent runtime.
- Speculative skill expansion without demonstrated team or agent demand.
- Anything that turns `src/` into a feature-heavy application server.

---

## 4. Recommended Execution Order

1. **P0 -- Skill quality audit** -- highest leverage; shallow skills damage
   library trust faster than missing skills do.
2. **P1 -- Coverage expansion** -- run after or alongside P0 so new skills
   meet the same quality bar as audited ones.
3. **P2 -- Discovery improvements** -- implement once the skill set is stable
   enough to measure search recall reliably.
4. **P3 -- Release automation** -- implement when release cadence increases;
   overkill for infrequent releases.

# @coastdigitalgroup/coastai-skills

[![npm](https://img.shields.io/npm/v/@coastdigitalgroup/coastai-skills)](https://www.npmjs.com/package/@coastdigitalgroup/coastai-skills)
[![GitHub issues](https://img.shields.io/github/issues/coastdigitalgroup/coast-ai-skills)](https://github.com/coastdigitalgroup/coast-ai-skills/issues)
[![License](https://img.shields.io/github/license/coastdigitalgroup/coast-ai-skills)](LICENSE)

A portable, agent-friendly skill library served as an MCP server. Drop it into
any project and AI agents across Codex, Claude Code, Cursor, Windsurf, Zed, and
Continue instantly have access to structured guidance for website design,
development, and growth tasks — without copying a single file.

## At a glance

- **What this is:** An MCP package that serves portable `SKILL.md` content to AI
  agents on demand.
- **Who it is for:** Teams using AI coding/design agents that need reusable
  website design, development, and growth workflows.
- **What this package owns:** Skill discovery, skill search, and skill retrieval
  over three MCP tools.
- **What this package does not own:** Application runtime logic, framework
  scaffolding, or replacing your product architecture.

## When to use this package

- You want AI agents to discover and apply reusable skills by topic.
- You want one shared skill library across editors and agent runtimes.
- You want a thin MCP layer with most value kept in portable Markdown skills.

## When not to use this package

- You need a web framework starter or full application boilerplate.
- You need a domain-specific business app instead of a reusable skill library.
- You want dynamic runtime orchestration beyond skill lookup and retrieval.

[Contributing](CONTRIBUTING.md) | [Changelog](CHANGELOG.md) |
[Security](SECURITY.md)

---

## Install

Run once in any project directory:

```bash
npx @coastdigitalgroup/coastai-skills --install
```

The installer auto-detects every supported editor on the machine, writes the MCP
server entry into each config, and adds a `CLAUDE.md` instruction so agents know
to use skills automatically. Restart your editor and it is live.

---

## How it works

The MCP server exposes three tools agents call on demand:

| Tool                     | What it does                                        |
| ------------------------ | --------------------------------------------------- |
| `search_skills(query)`   | Finds relevant skills by keyword — use this first   |
| `list_skills(category?)` | Browses all skills, optionally filtered by category |
| `get_skill(name)`        | Loads the full skill content by exact name          |

Typical agent flow:

```text
User:  "Help me build an accessible modal dialog"
Agent: search_skills("modal dialog accessible")
       → accessible-modal-dialog (website-development)
Agent: get_skill("accessible-modal-dialog")
       → full workflow, decision rules, validation steps
Agent: executes with skill guidance
```

Skills are never injected into context upfront. The agent fetches exactly what
it needs, when it needs it.

## Package contract

### Runtime interface

| Surface      | Contract                                                     |
| ------------ | ------------------------------------------------------------ |
| CLI binary   | `coastai-skills` (published from `dist/index.js`)            |
| Install mode | `coastai-skills --install` auto-configures supported editors |
| Server mode  | `coastai-skills` runs MCP over stdio                         |
| MCP tools    | `search_skills`, `list_skills`, `get_skill`                  |

This package is CLI-first. There is no documented stable JavaScript API.

### Source-of-truth and edit boundaries

- **Source-of-truth:** Skill content in `/<category>/<skill-name>/SKILL.md` and
  discovery behavior in `src/skills.ts`.
- **Generated output:** `dist/` is build output and should not be hand-edited
  for routine changes.
- **Protected boundaries:** Keep `src/` as a thin transport/discovery layer and
  avoid moving execution logic out of skills.
- **Unsafe direct edits:** Do not hand-edit packaged artifacts for release
  behavior changes; update source and rebuild instead.

### AI boundaries snapshot

- `CLAUDE.md`: lead implementation authority.
- `CODEX.md`: release-readiness, docs consistency, stabilization, and validation
  stewardship.
- `COPILOT.md`: IDE support guidance.
- `JULES.md`: bounded automation and micro-maintenance.
- `AGENTS.md`: shared coordination and ownership boundaries.

---

## Supported editors

| Editor                           | Auto-configured |
| -------------------------------- | --------------- |
| Codex                            | ✓               |
| Claude Code                      | ✓               |
| Claude Desktop (macOS + Windows) | ✓               |
| Cursor (project + global)        | ✓               |
| Windsurf                         | ✓               |
| Zed (macOS + Linux)              | ✓               |
| Continue                         | ✓               |

---

## Available skills

### website-design

| Skill                       | Description                                                                                                     |
| --------------------------- | --------------------------------------------------------------------------------------------------------------- |
| `accessible-color-system`   | Design and implement a systematic color palette that ensures WCAG 2.1 accessibility compliance                  |
| `card-ui-system`            | Design and implement modular content containers with consistent hierarchy, structure, and action alignment      |
| `empty-state-system`        | Design and implement purposeful zero-data screens that guide users toward clear actions                         |
| `fluid-spacing-system`      | Design and implement a fluid spacing scale using CSS `clamp()` for consistent white space and rhythm            |
| `fluid-typography-system`   | Design and implement responsive typography that scales smoothly across viewports using CSS `clamp()`            |
| `form-design-system`        | Design and document systematic form interfaces with consistent anatomy, spacing, affordances, and accessibility |
| `interactive-state-system`  | Define visual behavior for hover, focus, active, disabled, and other interaction states                         |
| `overlay-and-dialog-system` | Design modals, drawers, popovers, and toasts with clear focus, context, and interruption rules                  |
| `responsive-grid-system`    | Design and implement a flexible column-based layout system that scales across devices                           |
| `site-navigation-system`    | Design and implement a structured, accessible, and responsive navigation framework                              |
| `visual-hierarchy-system`   | Establish a clear order of importance using scale, color, contrast, and spacing                                 |

### website-development

| Skill                                  | Description                                                                                                |
| -------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| `accessible-accordion-implementation`  | Implement accessible, animatable accordion and disclosure components                                       |
| `accessible-carousel-implementation`   | Implement accessible, high-performance carousel and slider components using CSS Scroll Snap and WAI-ARIA   |
| `accessible-combobox-implementation`   | Implement accessible comboboxes, custom selects, and autocompletes with robust focus and keyboard behavior |
| `accessible-main-navigation`           | Build accessible, responsive main navigation with skip links and keyboard support                          |
| `accessible-modal-dialog`              | Implement accessible modal dialogs with focus trapping and keyboard interactions                           |
| `accessible-responsive-navigation`     | Build fully accessible responsive navigation systems                                                       |
| `accessible-tabs-implementation`       | Implement accessible tabbed interfaces using WAI-ARIA roles and keyboard patterns                          |
| `container-queries-implementation`     | Implement layout-aware components that respond to container dimensions rather than viewport size           |
| `css-stacking-contexts`                | Debug and manage CSS layering with stacking contexts and z-index                                           |
| `dark-mode-implementation`             | Implement a robust dark mode system that prevents flash and respects system preferences                    |
| `responsive-data-tables`               | Make data tables readable and accessible across all screen sizes                                           |
| `responsive-images`                    | Implement responsive images using `srcset`, `sizes`, and `<picture>`                                       |
| `responsive-navigation-implementation` | Build navigation that transitions between mobile and desktop layouts accessibly                            |
| `robust-form-implementation`           | Build accessible, resilient web forms using native APIs and ARIA best practices                            |
| `skeleton-screen-implementation`       | Implement accessible skeleton screens to improve perceived performance                                     |
| `web-font-optimization`                | Optimize web font loading to prevent layout shifts and invisible text                                      |

### website-growth

| Skill                               | Description                                                                             |
| ----------------------------------- | --------------------------------------------------------------------------------------- |
| `checkout-flow-optimization`        | Audit and optimize the checkout process to reduce abandonment                           |
| `exit-intent-recovery`              | Audit and optimize exit-intent interventions that recover abandoning users              |
| `hero-section-optimization`         | Audit and optimize hero sections for clarity and conversion                             |
| `internal-search-optimization`      | Audit and optimize site search to improve findability and reduce zero-results scenarios |
| `landing-page-content-hierarchy`    | Optimize the logical flow and information architecture of landing pages                 |
| `lead-capture-form-optimization`    | Reduce friction and increase conversion rates on lead generation forms                  |
| `message-match-optimization`        | Align traffic sources with destination landing pages to reduce bounce rates             |
| `pricing-page-optimization`         | Optimize pricing pages to reduce choice paralysis and improve conversion                |
| `product-listing-page-optimization` | Reduce discovery friction on e-commerce category and listing pages                      |
| `product-page-optimization`         | Optimize product detail pages to improve add-to-cart rates                              |
| `social-proof-optimization`         | Audit and optimize trust signals to build credibility and reduce user anxiety           |
| `upsell-cross-sell-optimization`    | Audit and optimize upsell and cross-sell strategies to increase AOV and CLV             |

---

## Adding skills

The library is domain-agnostic. Add any topic by dropping a folder into a
category directory:

```text
/<category>/<skill-name>/SKILL.md
```

Each `SKILL.md` requires a frontmatter block. The `description` is what agents
use to decide if a skill is relevant:

```markdown
---
name: your-skill-name
description:
  One or two sentences explaining what this skill does and when to trigger it.
  Write it as if the agent is reading it to decide whether to load the skill.
---
```

The MCP server discovers new skills automatically — no code changes or rebuilds
needed.

Optional support folders alongside `SKILL.md`:

- `examples/` — worked examples
- `templates/` — reusable files
- `references/` — detailed reference material
- `assets/` — images or other static files
- `scripts/` — deterministic helper scripts

---

## Development

```bash
git clone https://github.com/coastdigitalgroup/coast-ai-skills.git
cd coast-ai-skills
npm install
npm run check
```

| Command                 | What it does                                                   |
| ----------------------- | -------------------------------------------------------------- |
| `npm run build`         | Compiles TypeScript to `dist/`                                 |
| `npm run check`         | Runs typecheck, lint, and build                                |
| `npm run check:skills`  | Validates skill frontmatter, naming, and support-folder policy |
| `npm run check:package` | Validates packability with `npm pack --dry-run`                |
| `npm run typecheck`     | Type-check without emitting files                              |
| `npm run lint`          | ESLint over `src/`                                             |
| `npm run dev`           | Runs the MCP server directly via tsx                           |

The MCP server source lives in `src/`. Skills live in the category folders at
the repo root. They are independent — editing skills never requires a rebuild.

## Validation and release notes

- Full validation gate: `npm run check`
- Release process: follow `RELEASE.md`
- Release-facing history: `CHANGELOG.md`

For `src/`, package, or tooling changes, run the full gate before handoff. For
skill-only or docs-only changes, validate frontmatter, links, naming, and
cross-doc consistency.

## Local setup

```bash
git clone https://github.com/coastdigitalgroup/coast-ai-skills.git
cd coast-ai-skills
npm install
npm run check
```

## Troubleshooting

- **No skills are found:** confirm category folders are top-level directories
  and each skill has `SKILL.md` with valid `name` and `description` frontmatter.
- **Validation fails on skills:** run `npm run check:skills` and fix reported
  folder/frontmatter errors.
- **Editor does not detect the server after install:** rerun
  `npx @coastdigitalgroup/coastai-skills --install` and restart the editor.
- **Version mismatch in server metadata:** update `package.json`;
  `src/server.ts` reads version from package metadata.

---

## Contributing

Contributions should prioritize portability, reuse, and execution quality over
volume. Strengthen an existing skill before creating a near-duplicate.

See [CONTRIBUTING.md](CONTRIBUTING.md) for the full workflow,
[AGENT.md](AGENT.md) for repository structure and quality standards,
[AGENTS.md](AGENTS.md) for shared agent coordination, [CLAUDE.md](CLAUDE.md) for
Claude Code implementation authority, [CODEX.md](CODEX.md) for Codex release and
review guidance, [COPILOT.md](COPILOT.md) for GitHub Copilot support guidance,
[JULES.md](JULES.md) for Google Jules maintenance boundaries, and
[RELEASE.md](RELEASE.md) for the release checklist.

GitHub Copilot support behavior is defined in
[.github/copilot-instructions.md](.github/copilot-instructions.md).

---

## License

MIT. See [LICENSE](LICENSE).

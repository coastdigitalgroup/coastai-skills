---
name: changelog-and-release-notes-system
description:
  Design, structure, and layout-engineer public product changelogs, versioned release feeds,
  software update pages, and in-app "What's New" notification drawers with change badge taxonomies,
  chronological grouping, filter controls, media embeds, and WCAG AA accessibility.
---

# Changelog and Release Notes System

## Purpose

The Changelog and Release Notes System provides a standardized design and layout framework for communicating software updates, feature releases, improvements, bug fixes, and breaking changes to users, developers, and stakeholders.

Without a structured system, release communications degenerate into unformatted text walls, git commit dumps, or buried blog posts. Users struggle to scan what has changed, developers cannot identify breaking changes or API updates, and product teams miss opportunities to demonstrate continuous velocity and value.

This system establishes spatial composition patterns (standalone timeline page, split sidebar feed, compact in-app "What's New" drawer), badge taxonomies (Added, Improved, Fixed, Deprecated, Security), entry hierarchy, visual scanning patterns, media embed containers (screenshots, video walk-throughs, code diffs), tag-based filtering, RSS/email notification hooks, and WCAG 2.1 AA accessibility.

## Use Cases

- **SaaS Marketing & Product Portals:** Publishing public `/changelog` or `/releases` pages to demonstrate ongoing feature development, build buyer trust, and boost retention.
- **In-App "What's New" Notification Drawers:** Presenting non-intrusive release summaries directly within web applications when users log in following a major deployment.
- **Developer Documentation & API Gateways:** Formatting versioned API change logs, SDK releases, migration guides, and breaking change warnings.
- **E-Commerce & Platform Release Feeds:** Informing merchants or platform partners about dashboard updates, payment integrations, policy shifts, and feature rollouts.
- **Open Source & Library Documentation:** Displaying version histories, semver releases (v1.2.0), and contributor notes on open-source project websites.

## When NOT to Use

- **Incident & Uptime Reporting:** For live service outages, system latency alerts, or operational status updates, use a dedicated status page system.
- **Full Editorial Product Articles:** For long-form editorial announcements, thought leadership, or customer case studies, use `article-layout-system`.
- **System Notifications & Toasts:** For temporary operational alerts, task success feedback, or error banners, use `toast-and-snackbar-system` or `banner-and-alert-system`.
- **Feature Onboarding Tours:** For interactive, step-by-step UI tooltip walkthroughs guiding users through a new interface, use `onboarding-tour-system`.

## Inputs

1. **Release Entry Metadata:** Version strings (e.g., `v2.4.0`), release date (`YYYY-MM-DD`), release title, change category tags (`Added`, `Changed`, `Fixed`, `Deprecated`, `Security`), and summary copy.
2. **Surface Context & Layout Constraints:** Dedicated full page (`/changelog`), embedded documentation sidebar, or floating in-app drawer widget.
3. **Media & Embed Assets:** Feature screenshots, animated MP4/GIF demos, code diff snippets, or video walk-through URLs.
4. **Interactive Requirements:** Need for search query filtering, tag pills ("UI", "API", "Mobile"), version dropdown jumpers, or unread notification dot indicators.
5. **Design System Tokens:** Primary accent color, badge background/text tokens, timeline border colors, typography scale, and focus ring styling.

## Outputs

1. **Changelog Layout Architecture Blueprint:** Spatial layout specification (Vertical Timeline Stack, Split Sidebar Layout, or In-App Sliding Drawer) with defined grid measures, max measures, and responsive breakpoints.
2. **Release Badge & Tag Taxonomy Spec:** Color pairing, icon usage, and text formatting rules for change classification badges (`Added`, `Improved`, `Fixed`, `Deprecated`, `Security`).
3. **Card & Entry Hierarchy Spec:** Structural layout for individual release entries including header alignment, body typography, list formatting, media embed containers, and author/contributor attributions.
4. **Filter & Navigation Control Spec:** Specification for category filter pills, search input, version selection jumper, and subscription callout cards.
5. **Accessible Markup & ARIA Specification:** Semantic HTML5 (`<main>`, `<article>`, `<time>`, `<header>`), ARIA live region specifications for filtered views, and keyboard focus management for in-app drawers.

---

## Workflow

### 1. Select the Layout Architecture
Choose the spatial layout structure based on display context and content density:

```text
[ PATTERN A: VERTICAL TIMELINE PAGE (Dedicated /changelog) ]
+-------------------------------------------------------------+
| Header: "What's New in Product"    [ Filter Pills ] [Search]|
+-------------------------------------------------------------+
| 2025-02-15  o--- v2.4.0 — Dark Mode & Custom Dashboards    |
| (Sticky     |    [Added] [UI]                               |
| Date/Ver)   |    Rich summary description with screenshot.  |
|             |    * Added high-contrast dark theme option.    |
|             |    * Fixed grid alignment bug in widgets.     |
+-------------+-----------------------------------------------+
| 2025-01-20  o--- v2.3.0 — Bulk Export & API Webhooks        |
|             |    [Added] [API] [Fixed]                      |
+-------------+-----------------------------------------------+

[ PATTERN B: IN-APP "WHAT'S NEW" DRAWER / POPOVER ]
+------------------------------------+
| What's New                [X Close]|
+------------------------------------+
| v2.4.0 - Feb 15, 2025              |
| [Added] Dark Mode Support          |
| Quick 1-sentence summary with demo |
| [Try Dark Mode Now ->]             |
+------------------------------------+
| v2.3.0 - Jan 20, 2025              |
| [Added] Bulk CSV Export            |
+------------------------------------+
| [ View All Releases on Changelog ] |
+------------------------------------+
```

- **Pattern A: Vertical Timeline Page (Recommended for `/changelog`):**
  - Left Column / Sticky Rail: Release date (`<time>`) and version badge (`v2.4.0`), aligned to a vertical timeline spine rule (`border-left: 2px solid var(--border-color)`).
  - Main Column: Entry title (`<h2>`), category tags, rich text summary, bulleted change list, media previews, and direct permalink copy button.
  - Container measure: `max-width: 800px` (or 960px with a sticky right-hand category navigation sidebar).
- **Pattern B: In-App "What's New" Drawer Widget:**
  - Slide-over panel (`360px`–`420px` width) or dropdown popover triggered from a top bar bell icon or sparkler icon with an unread badge indicator.
  - Compact cards showing the 3–5 most recent updates with primary call-to-action buttons ("Try Feature", "Read Full Release Notes").
  - Footer link redirecting to the full public `/changelog` page.
- **Pattern C: Split Sidebar Feed (Documentation Hubs):**
  - Left Column (240px–280px): Version tree / chronological navigation jump links (`v2.4`, `v2.3`, `v2.2`).
  - Right Column (Flexible): Main release notes content with inline code blocks, breaking change alerts, and migration instructions.

### 2. Establish Change Badge Taxonomy
Classify changes using standardized, color-coded badges to enable instant visual parsing:

| Tag Type | Default Surface Tint | Default Text / Icon Color | WCAG AA Contrast | Usage Rule |
| :--- | :--- | :--- | :--- | :--- |
| **Added** | `rgba(16, 185, 129, 0.12)` (Emerald) | `#047857` (Dark Green) | $\ge$ 4.5:1 | New features, major modules, new capabilities. |
| **Improved** / **Changed** | `rgba(59, 130, 246, 0.12)` (Blue) | `#1D4ED8` (Dark Blue) | $\ge$ 4.5:1 | Enhancements to existing features, performance gains, UI refinements. |
| **Fixed** | `rgba(245, 158, 11, 0.12)` (Amber) | `#B45309` (Dark Amber) | $\ge$ 4.5:1 | Bug fixes, patch corrections, crash resolutions. |
| **Deprecated** / **Removed** | `rgba(239, 68, 68, 0.12)` (Red) | `#B91C1C` (Dark Red) | $\ge$ 4.5:1 | End-of-life notices, sunsetted endpoints, removed functionality. |
| **Security** | `rgba(139, 92, 246, 0.12)` (Purple) | `#6D28D9` (Dark Purple) | $\ge$ 4.5:1 | Vulnerability patches, auth updates, compliance fixes. |

- **Badge Styling Specifications:**
  - Font size: `0.75rem` (12px), `font-weight: 600`, `letter-spacing: 0.025em`.
  - Padding: `0.25rem 0.625rem` (4px 10px), `border-radius: 9999px` or `4px`.
  - Text transformation: Uppercase or Title Case (must be consistent across all entries).
  - High-Contrast Mode (Forced Colors): Must include `border: 1px solid CanvasText` fallback so badges remain distinct when background colors are overridden.

### 3. Structure Release Entry Cards & Visual Hierarchy
Ensure every release card follows a rigorous top-to-bottom reading hierarchy:

1. **Card Header:**
   - Version tag (`v2.4.0`) styled as a prominent pill or monospace heading (`font-family: var(--font-mono)`).
   - Release date (`<time datetime="2025-02-15">February 15, 2025</time>`) formatted in muted secondary text (`color: var(--text-muted)`).
   - Feature Title (`<h2 class="entry-title">`): `1.375rem`–`1.5rem` (22px–24px), bold, primary text color.
   - Category badges (`[Added]`, `[UI]`) rendered in a horizontal flex wrapper (`gap: 0.5rem`).
2. **Lead Summary & Highlights:**
   - 1–2 sentence overview paragraph summarizing the impact and business value of the update.
   - Optional featured image or embedded video/GIF walkthrough with `16:9` aspect ratio and `border-radius: 8px`.
3. **Categorized Change Lists:**
   - Group bullet points under clear sub-headings (`### Added`, `### Fixed`, `### Breaking Changes`).
   - Prefix list items with inline status indicators or subtle iconography.
   - Code references, API parameters, or file names MUST be formatted inside `<code class="inline-code">` tags.
4. **Footer & Utility Actions:**
   - Direct entry permalink button with copy feedback toast ("Link copied!").
   - Author avatar and name (e.g., "Released by @alex").
   - Direct feedback widget (e.g., "Was this update helpful? [Yes] [No]").

### 4. Implement Filtering, Search & Subscription Controls
Prevent information overload as the changelog grows over time:

- **Category Filter Bar:**
  - Horizontal pill filter group ("All Updates", "Features", "Improvements", "Fixes", "API").
  - Active pill uses primary background fill; inactive pills use ghost/outline borders.
  - Dynamic filtering updates the timeline list without triggering a full page reload.
- **Search Query Bar:**
  - Search input field filtering titles, badge tags, and body text in real time.
  - Provide clear button (`[X]`) and result count announcement (`aria-live="polite"`).
- **Notification & Subscription Hooks:**
  - Place an RSS feed link (`/changelog.xml`) and email update subscription form ("Get release updates in your inbox") in the sidebar or top header banner.

### 5. Ensure WCAG AA Accessibility & Keyboard Controls
- **Semantic Structure:** Wrap the timeline feed in a `<main>` container; each release item MUST use an `<article>` tag with an `aria-labelledby` referencing its `<h2>` title ID.
- **Date Markup:** Use native `<time datetime="2025-02-15">` for machine-readable dates.
- **In-App Drawer Focus Management:**
  - When opening the "What's New" drawer via a bell trigger button (`aria-expanded="true"`), shift focus to the drawer container (`tabindex="-1"`) or close button.
  - Trap keyboard focus (`Tab` / `Shift+Tab`) inside the drawer while open.
  - Support `Escape` key to close the drawer and return focus cleanly to the trigger button.
- **Screen Reader Filter Announcements:**
  - When category filters or search inputs alter visible entries, announce results via a polite live region (`<div class="sr-only" aria-live="polite">Showing 4 entries for category "Added"</div>`).

---

## Decision Rules

### Layout Architecture Selection Matrix

| Update Volume & Target Audience | Recommended Layout | Key Controls Required | Primary CTA |
| :--- | :--- | :--- | :--- |
| **Weekly / Monthly SaaS Releases (End Users)** | **Vertical Timeline Page** (`/changelog`) | Category Filter Pills + Search | Email / RSS Subscription |
| **In-App Post-Deployment Alert (Active App Users)** | **In-App "What's New" Drawer** | Compact Unread Badge + Dismiss | "Try Feature Now" CTA |
| **Developer API & SDK Changes (Engineers)** | **Split Sidebar Feed** | Version Dropdown + Code Diffs | Migration Guide Link |
| **Open Source Projects (Community)** | **Simple Chronological Stack** | Semver Filter + Github Commit Links | Release Download / NPM Link |

### Media Embed Strategy
- **Single Major Feature Release:** Include 1 high-resolution screenshot or short MP4 video loop (no audio, `autoplay muted loop playsinline`) demonstrating the core interaction.
- **Multiple Patch / Maintenance Items:** Do NOT include heavy media embeds for minor fixes. Stick to concise bulleted text lists with inline code tags to preserve scannability and page performance.

---

## Constraints

- **Accessibility (WCAG 2.1 / 2.2 AA):**
  - **SC 1.4.3 Contrast (Minimum):** Badge text and background tints MUST achieve at least **4.5:1** contrast ratio. Do NOT use pale pastels with white text.
  - **SC 2.1.1 Keyboard Access:** All filter chips, permalink buttons, feedback triggers, and drawer close buttons must be 100% keyboard focusable and operable.
  - **SC 2.4.7 Focus Visible:** Provide explicit focus outline rings (`outline: 2px solid var(--focus-color); outline-offset: 2px`) on all interactive controls.
  - **SC 1.4.1 Use of Color:** Do not rely solely on badge color to convey change type. Badges MUST include explicit text labels (`Added`, `Fixed`) or unique non-color indicators.
- **Responsiveness & Stacking:**
  - On mobile screens (`< 768px`), vertical timeline spines (`border-left`) MUST collapse into simple card stacks to save horizontal margin space.
  - Date and version headings must stack vertically above entry titles rather than relying on multi-column side-by-side alignment.
- **Performance:**
  - Image embeds MUST use native `loading="lazy"` and explicit `width` and `height` attributes to eliminate Cumulative Layout Shift (CLS).

---

## Common Failure Patterns

- **Git Commit Log Dump:** Copy-pasting raw git messages (e.g., `git merge branch 'fix/header-z-index'`) without human-readable summaries or user benefit framing.
- **Low-Contrast Badge Pastels:** Using low-contrast pastel badges (e.g., `#E2F8E0` background with `#A3E635` text), rendering tags completely unreadable for visually impaired users.
- **Unconstrained Full-Width Text:** Stretching changelog text across a 1920px screen width, exceeding 150 characters per line and causing severe visual fatigue.
- **Autoplay Audio / Heavy GIFs:** Embedding 20MB animated GIFs or video files that auto-play with sound, destroying mobile page speed and violating WCAG media controls.
- **Missing Permalinks:** Failing to provide anchor IDs or direct copyable link buttons for specific release entries, making it impossible for teams to link to a specific release.
- **Trap-less In-App Drawers:** Opening an in-app update drawer without managing keyboard focus, causing keyboard users to navigate invisible elements behind the drawer backdrop.

---

## Validation Criteria

- [ ] Spatial layout uses an established pattern (Vertical Timeline, In-App Drawer, or Split Sidebar) suited to the context.
- [ ] Change badges (`Added`, `Fixed`, `Changed`, `Security`) satisfy WCAG AA **4.5:1** contrast minimums and include explicit text labels.
- [ ] Release entries use semantic HTML (`<main>`, `<article>`, `<time datetime="...">`, `<h2>`) with proper `aria-labelledby` linkages.
- [ ] Timeline spine and date alignment stack gracefully on viewports smaller than 768px without horizontal scrolling.
- [ ] Filtering and search inputs update entry visibility dynamically and announce count changes to screen readers via `aria-live="polite"`.
- [ ] In-app drawers trap keyboard focus, handle `Escape` key dismissal, and return focus to the trigger element upon closure.
- [ ] Image and video embeds feature explicit dimensions and `loading="lazy"` to prevent CLS.

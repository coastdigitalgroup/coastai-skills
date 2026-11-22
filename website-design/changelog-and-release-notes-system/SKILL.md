---
name: changelog-and-release-notes-system
description:
  Design, structure, and layout-engineer public product changelogs, versioned release
  notes, and in-app "What's New" update notifications, managing entry anatomy, change
  badge taxonomies, chronological grouping, filter controls, media embeds, and WCAG AA
  accessibility.
---

# Changelog and Release Notes System

## Purpose

The Changelog and Release Notes System provides a standardized framework for designing, structuring, and layout-engineering public product changelogs, versioned release notes, software update feeds, and in-app "What's New" notification drawers.

Software products evolve continuously through feature launches, performance enhancements, bug fixes, security patches, and breaking API changes. Without a structured changelog design system, product update pages devolve into unformatted raw commit dumps, cluttered unscannable wall-of-text feeds, or inconsistent marketing blog posts that obscure critical functional updates. Furthermore, in-app update widgets frequently suffer from intrusive overlays, lost scroll states, inaccessible badges, and unreadable mobile layouts.

This system establishes rules for layout composition (standalone timeline pages, split sticky-date layouts, in-app notification drawers), categorization taxonomies (New, Improved, Fixed, Security, Deprecated, Breaking), entry anatomy, release metadata, media embeds, category filter bars, and WCAG 2.1 AA accessibility.

## Use Cases

- **Public SaaS Product Changelogs:** Communicating continuous product shipping cadence, feature improvements, and platform reliability to existing customers and prospective buyers.
- **Developer API & SDK Release Notes:** Documenting versioned releases (e.g., v2.4.0), breaking changes, migration guides, and deprecation schedules for technical audiences.
- **In-App "What's New" Update Drawers:** Displaying unread product updates, feature announcements, and visual walkthroughs directly inside web applications via header bell icons or slide-out panels.
- **E-Commerce & Platform Release Feeds:** Informing merchants or platform ecosystem users about dashboard updates, API integrations, checkout optimizations, and compliance changes.
- **Open-Source & Enterprise Software Portals:** Publishing major milestone announcements, patch releases, and security advisories with downloadable assets or release artifacts.

## When NOT to Use

- **Chronological History & Company Milestones:** For general company history, founding timelines, or non-versioned corporate milestones, use `timeline-activity-system`.
- **General Marketing Blogs & Thought Leadership:** For editorial articles, news posts, opinion pieces, or deep-dive marketing content without versioning or structured change tags, use `article-layout-system`.
- **System Status & Incident Logs:** For real-time infrastructure uptime, service outages, incident reporting, and server status feeds, use `error-and-status-system` or `banner-and-alert-system`.
- **Sequential Multi-Step Setup Flows:** For guiding users through onboarding setups or multi-page wizards, use `stepper-and-wizard-system`.

## Inputs

1. **Release Item Inventory & Content Schema:** Structured update entries including release date, version string (e.g., `v3.2.0` or `October 2024`), entry title, summary description, categorization tags (`new`, `improved`, `fixed`, `security`, `deprecated`), body markup, author/team avatar, and optional media (screenshots, GIFs, video demos).
2. **Delivery Context & Surface:** Full-page dedicated marketing/documentation route (`/changelog`), embedded documentation sub-section, or compact in-app overlay drawer (`<aside>` / popover).
3. **Audience & Technical Depth:** End-user consumers (visual-heavy, benefit-driven summaries) vs. technical developers (code blocks, breaking change flags, API endpoint diffs).
4. **Interactive Feature Schema:** Requirement for category pill filtering, real-time live search, unread badge notification triggers, or RSS/email subscription controls.
5. **Brand & Surface Design Tokens:** Typography scale (`fluid-typography-system`), surface elevation (`elevation-and-depth-system`), badge colors (`badge-and-tag-system`), and focus indicators (`focus-indicator-design-system`).

## Outputs

1. **Changelog Layout Architecture Blueprint:** Structural specifications for full-page sticky-timeline, centered card stack, or compact in-app overlay drawer with defined grid measures, margins, and responsiveness.
2. **Categorization & Badge Taxonomy Specification:** Standardized visual treatment, color contrast pairings, icons, and semantic metadata for change types (`New`, `Improved`, `Fixed`, `Security`, `Deprecated`, `Breaking`).
3. **Entry Component & Metadata Spec:** Micro-layout defining header hierarchy, version badges, publication dates (`<time datetime="...">`), summary paragraph line length, media embed framing, and author attribution.
4. **Interactive Filter & Subscription Header Spec:** Interface design for category pill filters, release type toggles, search input, and subscription hooks (RSS feed link, email subscribe modal).
5. **Accessible Markup & ARIA Specification:** Semantic HTML5 (`<article>`, `<header>`, `<time>`, `<aside>`) with WCAG 2.1 AA keyboard focus management, live regions for unread updates, and screen-reader accessible badge labels.

---

## Workflow

### 1. Select Layout Architecture Based on Context & Density

Choose the appropriate spatial layout composition depending on where and how release notes are consumed:

```text
[ PATTERN A: STICKY TIMELINE LAYOUT (Desktop / Marketing Page) ]
+-------------------------------------------------------------------+
|  Header: Product Changelog  [Search Field]  [Subscribe RSS / Email]|
|  Filters: [ All ] [ New ] [ Improved ] [ Fixed ] [ Security ]      |
+-------------------------------------------------------------------+
| Nov 14, 2024  |  [NEW]  v2.4.0 — AI-Powered Report Builder         |
| v2.4.0        |  ------------------------------------------------ |
|               |  Generate custom analytics reports using plain    |
| (Sticky Date) |  English prompts. Includes export to PDF/CSV.     |
|               |  [ Image / Video Walkthrough Placeholder ]         |
|               |  - Added prompt input bar to Analytics tab        |
|               |  - Improved PDF export rendering speed by 40%     |
+---------------+---------------------------------------------------+
| Nov 02, 2024  |  [FIXED]  [SECURITY]  v2.3.2 — Auth Patch          |
| v2.3.2        |  ------------------------------------------------ |
|               |  Resolved session token expiration bug and updated|
|               |  OAuth scopes for enterprise SSO connectors.      |
+-------------------------------------------------------------------+

[ PATTERN B: IN-APP "WHAT'S NEW" DRAWER / OVERLAY ]
+-----------------------------------------------+
| What's New?                       [ (X) Close]|
| 2 Unread Updates                              |
+-----------------------------------------------+
| [NEW] Nov 14, 2024                            |
| AI-Powered Report Builder                     |
| Generate custom analytics reports using plain |
| English prompts directly from your dashboard. |
| [ Try It Now -> ]                             |
+-----------------------------------------------+
| [IMPROVED] Nov 02, 2024                       |
| Faster CSV Data Exports                       |
| Exports now process asynchronously in background.|
+-----------------------------------------------+
```

- **Pattern A: Left-Sticky Timeline Layout (Recommended for Dedicated Changelog Pages):**
  - Left Column (20%–25% width, `min-width: 180px`): Release date (`<time>`), version badge (`v2.4.0`), and relative timestamp ("3 days ago"). Stays `position: sticky; top: 2rem` as the user scrolls through the entry.
  - Right Column (75%–80% width, `max-width: 720px`): Entry container (`<article>`), change-type badges, entry title (`<h2>`), summary narrative, rich media (screenshots/video), bulleted detail list, and team attribution.
- **Pattern B: Centered Single-Column Card Stack (Compact Marketing Page / Mobile Default):**
  - Single column with `max-width: 768px` centered on screen.
  - Release date and version string sit inline directly above or alongside change-type badges within the entry header card.
  - Best for mobile viewports (`< 768px`) or integrated documentation pages.
- **Pattern C: In-App "What's New" Drawer / Slide-out Panel:**
  - Viewport-docked overlay drawer (`width: 380px`–`420px`) triggered by a top-navigation bell icon or badge indicator.
  - Features unread notification dots, compact entry cards with direct deep links ("Try Feature Now"), and tab filtering.
  - Must manage focus trap (`focus-trap-implementation`) when opened as a modal, or standard focus isolation when rendered as a non-modal slide-out drawer.

### 2. Establish Standardized Change Badge Taxonomy

Categorize individual changes using an explicit, high-contrast badge taxonomy (`badge-and-tag-system`). Each badge must pair an accessible color token with semantic text and an optional icon indicator:

| Change Type | Badge Label | Purpose / Usage | Recommended Light Surface Token | Recommended Dark Surface Token | Icon / Symbol |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **New Feature** | `NEW` or `FEATURE` | Brand new capabilities, tools, or major UI additions | Fill: `#EFF6FF`, Text: `#1D4ED8`, Border: `#BFDBFE` | Fill: `#1E3A8A`, Text: `#93C5FD`, Border: `#1E40AF` | `Sparkles` / `Plus` |
| **Improvement** | `IMPROVED` | Enhancements, speed optimizations, or UI refinements | Fill: `#F0FDF4`, Text: `#15803D`, Border: `#BBF7D0` | Fill: `#14532D`, Text: `#86EFAC`, Border: `#166534` | `TrendingUp` / `Zap` |
| **Bug Fix** | `FIXED` | Resolved issues, error corrections, and edge-case fixes | Fill: `#FFF7ED`, Text: `#C2410C`, Border: `#FED7AA` | Fill: `#7C2D12`, Text: `#FDBA74`, Border: `#9A3412` | `Wrench` / `Check` |
| **Security** | `SECURITY` | Vulnerability patches, auth updates, compliance fixes | Fill: `#FAF5FF`, Text: `#6B21A8`, Border: `#E9D5FF` | Fill: `#581C87`, Text: `#E9D5FF`, Border: `#6B21A8` | `Shield` / `Lock` |
| **Deprecation** | `DEPRECATED` | Features or API endpoints scheduled for removal | Fill: `#FEF2F2`, Text: `#B91C1C`, Border: `#FECACA` | Fill: `#7F1D1D`, Text: `#FCA5A5`, Border: `#991B1B` | `AlertTriangle` / `Clock` |
| **Breaking Change** | `BREAKING` | Incompatible API changes requiring user action | Fill: `#451A03`, Text: `#FEF3C7`, Border: `#78350F` | Fill: `#FEF3C7`, Text: `#78350F`, Border: `#FDE68A` | `AlertOctagon` / `Flame` |

*Note: All text and surface background pairings MUST meet or exceed the WCAG 2.1 AA 4.5:1 contrast ratio requirement.*

### 3. Structure Entry Micro-Layout & Scannable Hierarchy

Structure each release entry (`<article>`) to allow rapid scanning by both skimmers (looking for highlights) and power users (looking for technical specifics):

- **Entry Header:**
  - Version & Tag Row: Change badges displayed horizontally with `gap: 0.5rem`, followed by version number (e.g., `v2.4.0`) in monospace typography (`font-family: var(--font-mono)`).
  - Entry Title: Semantic Heading (`<h2>` or `<h3>`) rendered in `1.25rem`–`1.5rem` (20px–24px) with `font-weight: 600`–`700`.
  - Date & Metadata: `<time datetime="2024-11-14">November 14, 2024</time>` rendered in muted secondary text (`font-size: 0.875rem`).
- **Summary Narrative:**
  - 1 to 2 sentences explaining the core value or rationale behind the release.
  - Constrained measure: `line-height: 1.6`, `max-width: 68ch` to prevent eye fatigue.
- **Visual Media Embeds (Screenshots, GIFs, Demos):**
  - Encapsulate in `<figure>` elements with responsive rounded borders (`border-radius: 8px`–`12px`) and subtle surface outlines (`1px solid var(--border-subtle)`).
  - Always provide descriptive `alt` text for images or accessible captions (`<figcaption>`) explaining what changed visually.
  - High-resolution screenshots should support click-to-expand lightbox preview (`image-gallery-and-lightbox-system`).
- **Bulleted Breakdown List:**
  - Group granular changes under secondary headings or bold labels (e.g., **What's New**, **Improvements**, **Bug Fixes**).
  - Use custom scannable list item bullets with subtle icon or badge accents.
- **CTA & Deep Links:**
  - Provide contextual action buttons or links: "Read API Docs", "View Migration Guide", or "Try in App".

### 4. Implement Category Filtering & Search Interface

Enable users to filter release notes by change type or keyword when entry volume grows:

- **Filter Pill Bar:**
  - Render category pills ("All Updates", "New Features", "Improvements", "Fixes", "Security") prominently above the feed stack.
  - Active filter pill uses primary fill (`aria-pressed="true"` or `aria-selected="true"`).
  - Filtering updates the visible list dynamically without losing page scroll position.
- **Search Field:**
  - Provide real-time live search matching titles, version strings, and body copy.
  - Filter results update dynamically, announcing result counts to screen readers via `aria-live="polite"`.
- **Subscription Controls:**
  - Include explicit RSS Feed button (`<a href="/changelog/rss.xml">`) and Email Subscription modal trigger ("Get updates in your inbox") in the page header.

### 5. Program WCAG AA Accessibility & Keyboard Navigation

Ensure full accessibility compliance across assistive devices:

- **Semantic Document Hierarchy:**
  - Entire feed wrapped in `<main>` or `<section aria-labelledby="changelog-heading">`.
  - Each individual entry wrapped in an `<article aria-labelledby="entry-title-id">`.
  - Publication dates wrapped in `<time datetime="YYYY-MM-DD">` elements.
- **Screen Reader Announcements:**
  - Badge text must be explicitly readable without depending strictly on color (e.g., `aria-label="Category: New Feature"`).
  - Unread notification badges on in-app bell triggers must include hidden screen-reader text: `<span class="sr-only">3 unread product updates</span>`.
- **Keyboard Navigation:**
  - All filter pills, links, deep-link CTAs, and media zoom triggers must be focusable via `Tab`.
  - Visible focus indicators (`outline: 2px solid var(--focus-ring); outline-offset: 2px`) on all interactive triggers.

---

## Decision Rules

### Layout Selection Matrix

| Product / Audience Context | Entry Frequency | Recommended Layout | Key Features Required |
| :--- | :--- | :--- | :--- |
| **SaaS Web App (Public Marketing)** | Weekly / Bi-weekly | **Sticky Timeline (Pattern A)** | Category Filter Bar, RSS Link, Media Embeds |
| **Developer API / SDK Platform** | Daily / Versioned | **Version-Grouped List (Pattern A)** | Monospace Version Tags, Code Diffs, Breaking Change Flags |
| **In-App Web Dashboard** | Continuous | **In-App Overlay Drawer (Pattern B)** | Unread Dot Indicator, "Try Now" CTAs, Compact Cards |
| **Mobile Web / Narrow Breakpoints** | Any | **Centered Card Stack (Pattern C)** | Inline Date Badges, Horizontal Scroll Pill Bar |

### Badge Priority & Stack Order
When a single release entry contains multiple change types (e.g., both a new feature and a security patch), arrange badges in order of critical impact:
1. `BREAKING` (Highest priority — requires immediate user action)
2. `SECURITY` (Critical safety update)
3. `NEW` / `FEATURE` (Primary value addition)
4. `IMPROVED` (Enhancement)
5. `FIXED` (Bug resolution)
6. `DEPRECATED` (Future deprecation warning)

---

## Constraints

- **Accessibility (WCAG 2.1 / 2.2 AA):**
  - **SC 1.4.3 Contrast (Minimum):** All badge text, dates, body text, and filter controls MUST maintain at least **4.5:1** contrast ratio against their background surfaces (3:1 for large headings ≥24px).
  - **SC 1.4.1 Use of Color:** Badge status (New, Fixed, Security) must never rely on color alone; text labels and/or distinct icon shapes must be present.
  - **SC 2.1.1 Keyboard:** All filter pills, media lightbox triggers, and subscription modal buttons must be fully operable via keyboard.
  - **SC 2.4.7 Focus Visible:** Focus rings must provide clear, unclipped 2px outline indicators.
- **Responsiveness & Stacking:**
  - On viewports `< 768px`, the two-column sticky timeline MUST collapse into a single stacked column where dates and version numbers sit above the entry title.
  - Category filter pills on mobile must wrap cleanly or transform into a touch-friendly horizontal scrolling track with scroll snapping.
- **Performance & Media Optimization:**
  - All embedded screenshots and GIFs must use `loading="lazy"`, explicit `width` and `height` dimensions to prevent Cumulative Layout Shift (CLS), and modern image formats (WebP/AVIF).

---

## Common Failure Patterns

- **Raw Unformatted Commit Dumps:** Copy-pasting Git commit logs (e.g., "fix typo in css", "wip auth") without contextual summaries or user-facing benefits.
- **Unscannable Wall-of-Text:** Publishing 2,000-word release posts without category badges, bold headers, bullet points, or visual media.
- **Color-Only Category Badges:** Relying on colored dots (e.g., green dot for new, red dot for fix) without text labels or icons, rendering badges invisible or ambiguous to colorblind users or screen readers.
- **Intrusive In-App Modals:** Blocking the user's primary workflow with a full-screen popup modal for minor bug fixes rather than using a non-disruptive header drawer or bell notification.
- **Broken Sticky Layouts:** Applying `position: sticky` to date headers without setting `top: <offset>` or applying `overflow: hidden` to a parent container, causing sticky positioning to fail silently.
- **Missing Version & Date Tags:** Omitting semantic `<time>` tags or concrete release dates ("Recently updated"), making it impossible for users to determine when a feature was shipped.

---

## Validation Criteria

- [ ] Changelog layout uses a clear structural pattern (Sticky Timeline, Centered Stack, or In-App Drawer) matched to entry frequency and delivery context.
- [ ] Category badges (New, Improved, Fixed, Security, Deprecated, Breaking) follow an established taxonomy with text labels and WCAG AA compliant contrast (≥4.5:1).
- [ ] Release entries use semantic HTML5 (`<article>`, `<header>`, `<time datetime="...">`, `<h2>`/`<h3>`) with scannable line measure (≤68ch).
- [ ] Visual media (screenshots/video) include alt text, explicit dimensions to prevent CLS, and optional click-to-expand lightboxes.
- [ ] Filter pill bar or search input dynamically filters entries and announces status changes to screen readers via `aria-live="polite"`.
- [ ] In-app "What's New" drawer features a non-disruptive trigger, unread status indicators, and keyboard focus trap management when opened.
- [ ] Responsive layout collapses sticky timeline columns seamlessly onto mobile viewports (<768px).

---
name: page-header-system
description:
  Design and implement a systematic framework for page-level headers that
  provide context, orientation, and primary actions for a specific page or
  view.
---

# Page Header System

## Purpose

The Page Header System provides a methodology for designing the top-level
structural area of an individual page (distinct from the global site header).
It ensures that users can immediately identify where they are (Wayfinding),
understand the status or metadata of the current view, and access the primary
actions required to complete their task without hunting through menus.

## Use Cases

- Designing headers for complex dashboard views (e.g., "Project Details").
- Structuring the introduction of long-form articles or documentation pages.
- Organizing settings or profile pages where context and saving actions are
  critical.
- Standardizing header patterns across a SaaS application or large content site.
- Managing breadcrumbs, titles, and status indicators in a unified layout.

## When NOT to Use

- **Global Site Navigation:** Use `site-navigation-system` for the main header
  that persists across the whole site.
- **Simple Landing Pages:** Where the "Hero" section (see
  `hero-section-optimization`) serves as the page header.
- **Splash Screens / Modals:** Where the content is temporary or minimal; use
  `overlay-and-dialog-system` for modal headers.

## Inputs

1. **Page Title & Hierarchy:** The primary name of the page (H1) and its
   position in the site structure.
2. **Wayfinding Requirements:** Does the user need breadcrumbs or a "Back"
   button?
3. **Metadata & Status:** Critical details like "Last Updated," "Draft/Live," or
   owner information.
4. **Action Priority:** What is the primary task on this page? (e.g., Edit,
   Share, Create).
5. **Brand/System Tokens:** Spacing, typography, and color tokens.

## Outputs

1. **Header Anatomy Spec:** Definition of zones (Wayfinding, Title, Metadata,
   Actions).
2. **Layout Blueprint:** Rules for alignment (Left vs. Centered) and spacing.
3. **Responsive Strategy:** How the header adapts from desktop to mobile.
4. **Interaction Spec:** Behavior of sticky headers and action button
   priorities.

## Workflow

### 1. Define the Navigation Path (Wayfinding)

Determine how the user reached this page and how they get back:

- **Breadcrumbs:** Use for deep hierarchies (e.g., `Home > Projects > Design`).
- **Back Button:** Use for linear tasks or when returning to a specific list
  view.
- **Parent Link:** A simple "<- Back to [Parent]" for 2-level depths.

### 2. Establish the Content Core (Title & Metadata)

Apply `visual-hierarchy-system` to the header's center:

- **H1 Title:** The most prominent text element.
- **Contextual Metadata:** Secondary information (e.g., tags, timestamps,
  status badges) placed near the title.
- **Thumbnail/Avatar:** If the page represents a specific entity (e.g., a User
  Profile or a Product).

### 3. Organize Page-Level Actions

Divide actions into priority tiers:

- **Primary Action:** The one "Level 1" button (usually a high-contrast filled
  button).
- **Secondary Actions:** "Level 2" buttons (outline or ghost styles) for less
  frequent tasks.
- **Tertiary Actions:** Overflow menus (...) for rare administrative tasks.

### 4. Choose a Spatial Pattern

- **Standard Left-Aligned (SaaS/Dashboard):** Breadcrumbs/Title on the left,
  Actions on the right. Best for productivity.
- **Centered (Content/Article):** All elements centered. Best for readability
  and storytelling.
- **Split Layout:** Title and Actions separated by whitespace to emphasize
  clearance.

### 5. Define Sticky & Scroll Behavior

- **Fixed Header:** Keep the page header visible if actions (like "Save") are
  needed frequently while scrolling.
- **Condensing Header:** Shrink the header height or hide breadcrumbs as the
  user scrolls down to maximize content space.

## Decision Rules

- **The Breadcrumb Rule:** If a site is more than 2 levels deep, breadcrumbs are
  mandatory in the page header.
- **The "One H1" Rule:** The page header MUST contain the page's unique H1 tag.
- **Action Alignment:** On desktop, align primary actions to the top-right. On
  mobile, consider a sticky bottom bar for primary actions if the header
  becomes too crowded.
- **Status Visibility:** Critical statuses (e.g., "Payment Overdue") must be
  placed immediately adjacent to the title using a badge or icon.

## Constraints

- **Accessibility:** Header titles must use `<h1>`. Breadcrumbs must use `<nav>`
  with `aria-label="Breadcrumb"`.
- **Contrast:** Status badges and actions must meet WCAG AA contrast
  requirements.
- **Responsiveness:** Headers must handle long titles gracefully (truncation vs.
  wrapping).

## Common Failure Patterns

- **The Action Overload:** Placing too many buttons in the header, confusing the
  primary task.
- **Missing Wayfinding:** Forgetting breadcrumbs on deep pages, leaving users
  feeling "lost."
- **Title Squashing:** Not allowing enough space for long titles on mobile,
  causing them to overlap actions.
- **Redundant Site Header:** Making the page header look too similar to the
  global site header, creating visual confusion.

## Validation Criteria

- [ ] Header contains a clear H1 that matches the navigation label.
- [ ] Wayfinding (breadcrumbs/back) is appropriate for the site depth.
- [ ] Primary action is visually distinct from secondary actions.
- [ ] Layout remains functional and readable on mobile viewports.
- [ ] Semantic HTML is used (`<nav>` for breadcrumbs, `<h1>` for title).
- [ ] Status indicators (if any) are high-contrast and easy to spot.

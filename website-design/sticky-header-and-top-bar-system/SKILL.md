---
name: sticky-header-and-top-bar-system
description:
  Design multi-tier sticky headers, announcement top bars, utility bars, shrink-on-scroll header transitions,
  and dynamic reveal scroll patterns that optimize spatial real estate and ensure WCAG AA accessibility compliance.
---

# Sticky Header and Top Bar System

## Purpose

The Sticky Header and Top Bar System establishes a systematic methodology for structuring, sizing, and animating persistent top-of-screen navigation assemblies across websites and web applications. It solves the architectural challenge of balancing high-priority top-bar elements—such as site-wide announcement banners, secondary utility links, localization selectors, and main navigation bars—without cannibalizing vertical screen real estate or obscuring keyboard focus on page content.

A properly executed sticky header system manages multi-tier stacking relationships, shrink-on-scroll height reductions, auto-collapsing announcement bars, and dynamic show/hide scroll intent triggers while guaranteeing zero Cumulative Layout Shift (CLS) and full WCAG AA compliance (specifically WCAG 2.2 SC 2.4.11 Focus Not Obscured).

## Use Cases

- **Multi-Tier E-Commerce Headers:** Combining an announcement banner (free shipping alerts/countdown timers), secondary utility links (account, currency, store locator), and primary search/navigation into a cohesive sticky structure.
- **SaaS Marketing & Product Headers:** Featuring persistent trial/demo primary CTAs alongside product navigation that shrinks on scroll to conserve reading space.
- **Content Marketing & Article Layouts:** Smart auto-hiding top headers that disappear during scroll-down to maximize article reading area and re-appear instantly upon scroll-up.
- **Application Workspaces:** Sticky top control bars housing workspace titles, search filters, breadcrumbs, and user profiles that remain pinned above dense data tables or content lists.

## When NOT to Use

- **Full-Screen Canvas Interfaces:** Tools such as Figma-like canvas editors, GIS maps, or interactive games where persistent top bars impede essential interactive canvas space.
- **Single-Viewport Standalone Landing Pages:** Pages designed to fit entirely within a single viewport height without page scrolling.
- **Modal Dialogs and Full-Screen Drawers:** Within overlay dialog containers or mobile full-screen drawers; internal modal headers should use local flex positioning rather than page-level fixed/sticky mechanics.

## Inputs

1. **Header Component Hierarchy:** Inventory of required top-bar tiers (e.g., Tier 0: Announcement Banner, Tier 1: Utility Bar, Tier 2: Primary Navigation Bar).
2. **Viewport Breakpoints:** Responsive layout thresholds defining desktop, tablet, and mobile presentation modes.
3. **Scroll Mechanics Specification:** Choice of scroll behavior model (Static Sticky, Shrink-on-Scroll, or Dynamic Hide/Reveal).
4. **Z-Index Layering Token Scale:** Architectural z-index scale (from `elevation-and-depth-system`) to establish proper stacking above page content but below modals and toasts.
5. **Brand & Contrast Guidelines:** Color and surface elevation tokens to maintain contrast against scrolling page backgrounds.

## Outputs

1. **Multi-Tier Header Layout Architecture:** Precise HTML/CSS structure for stacking utility bars, announcement banners, and main navigation.
2. **Scroll-Responsive Behavior Specification:** Step-by-step triggers for banner collapse, header height transitions, surface backdrop blurring, and elevation shadow changes.
3. **Accessibility & Focus Obscuration Map:** Global `scroll-margin-top` calculations and aria-attributes ensuring seamless screen reader and keyboard navigation.
4. **Responsive Mobile Header Spec:** Blueprint for collapsing multi-tier desktop headers into mobile-optimized single-tier bars with slide-out drawer or overlay triggers.

## Workflow

### 1. Structure the Multi-Tier Header Hierarchy

Organize top-of-screen elements into logical, stacked visual containers to manage visual weight and priority:
- **Tier 0 (Top Announcement Banner):** Height 32px–40px. Holds promotional messages, global alerts, or countdowns. Dismissible or auto-scrolls out of view.
- **Tier 1 (Utility Bar):** Height 32px–36px. Holds secondary actions such as language/currency pickers, store locators, phone numbers, or account links.
- **Tier 2 (Primary Navigation Header):** Height 64px–80px on desktop (48px–56px on mobile). Holds brand logo, primary navigation links, search trigger, cart indicator, and primary action button.

### 2. Choose the Scroll Mechanics Model

Select the appropriate scroll interaction pattern based on content density and page intent:
1. **Static Sticky Header:** All tiers remain continuously pinned at `position: sticky; top: 0;`. Ideal for task-heavy portals or e-commerce where utility links remain constantly needed.
2. **Shrink-on-Scroll Header:** Tier 0 and Tier 1 scroll away naturally with the page, while Tier 2 snaps to `top: 0` and reduces its height (e.g., from 80px to 56px) and logo scale on scroll. Ideal for SaaS and corporate marketing sites.
3. **Dynamic Hide/Reveal (Smart Header):** The entire header bar translates off-screen (`transform: translateY(-100%)`) when scrolling down past a threshold (e.g., 100px), and translates back into view (`transform: translateY(0)`) immediately when a scroll-up intent is detected (delta > 10px). Ideal for editorial, blog, and long-form reading experiences.

### 3. Implement Layout Shift (CLS) Prevention

Prevent layout jumpiness when switching positions or collapsing tiers:
- Use `position: sticky` on the parent `<header>` wrapper rather than switching `position: static` to `position: fixed` via JavaScript class toggles. `position: sticky` automatically reserves spatial height in the normal layout flow.
- When an announcement banner is dismissed by the user, animate its height to 0 (`max-height: 0; opacity: 0; transition: all 0.25s ease-out;`) or adjust CSS custom properties dynamically so sibling layout sections recalculate cleanly.

### 4. Configure Visual Elevation and Surface Blurs

Distinguish the sticky header from the page content scrolling beneath it:
- **Scrolled State Surface:** Apply a glassmorphic background blur (`backdrop-filter: blur(12px); background: rgba(var(--surface-rgb), 0.85);`) or a solid background with a high-contrast border or shadow (`box-shadow: 0 4px 20px rgba(0,0,0,0.08);`).
- **Initial Top State:** Maintain seamless transparency or full surface color matching the Hero section background.

### 5. Guarantee Keyboard Focus Obscuration Compliance (WCAG SC 2.4.11)

Prevent sticky headers from overlapping and concealing focused interactive elements when keyboard users tab through page content:
- Calculate total active sticky header height (e.g., `var(--sticky-header-height)`).
- Apply a global scroll-margin offset to all anchor targets, section headings, and focusable elements:
  ```css
  :target, [id], main button, main a, main input, main select, main textarea {
    scroll-margin-top: calc(var(--sticky-header-height) + 16px);
  }
  ```
- Ensure skip navigation links ("Skip to main content") sit at `z-index: 2000` above the sticky header, focusing directly into the `<main>` landmark past the header bounds.

### 6. Adapt Responsively for Mobile Viewports

Simplify the top bar on screen widths below 768px:
- **Collapse Multi-Tiers:** Hide Tier 1 (Utility Bar) entirely on mobile or fold its contents into the mobile navigation drawer.
- **Single Compact Header Bar:** Restrict mobile header height to 48px–56px containing:
  - Left: Hamburger menu toggle (`aria-expanded="false"`, `aria-label="Toggle main menu"`) or Brand Logo.
  - Right: High-frequency action icons (e.g., Search trigger, Cart button with badge count).
- **Persistent Safe Zones:** Incorporate iOS safe area insets into header positioning if top notches exist (`padding-top: env(safe-area-inset-top)`).

## Decision Rules

- **Header Height Limits:** Sticky headers must never exceed **12% of vertical viewport height** on desktop (max ~80px) and **10% on mobile** (max ~56px).
- **Shrink Threshold:** Activate the shrink state after the page has scrolled past **60px–100px** from top to avoid rapid jitter during small scroll movements.
- **Scroll-Up Sensitivity:** Set a minimum scroll-up threshold of **12px–15px** before revealing a dynamic auto-hide header to prevent flickering from accidental finger resting on touchscreens.
- **Z-Index Layering Scale:**
  - Standard Content: `z-index: 1–10`
  - Sticky Sidebars: `z-index: 100`
  - Sticky Header: `z-index: 1000`
  - Dropdowns / Popovers within Header: `z-index: 1100`
  - Mobile Drawer / Overlay Navigation: `z-index: 2000`
  - Modals / Lightboxes: `z-index: 3000`
  - Toast Notifications: `z-index: 4000`

## Constraints

- **Accessibility (WCAG AA Minimum):**
  - **SC 2.4.11 Focus Not Obscured:** Focused input fields, links, and buttons must be completely visible outside the sticky header bounds.
  - **SC 2.1.1 Keyboard Navigation:** Header dropdowns, search triggers, and mobile drawer buttons must be fully operational via `Tab`, `Enter`, `Space`, and `Escape`.
  - **SC 1.4.3 Contrast:** Header text, icons, and focus rings must meet a minimum 4.5:1 contrast ratio against the scrolled backdrop surface.
- **Responsiveness:**
  - Header contents must wrap or truncate gracefully without causing horizontal scrollbars (`overflow-x: hidden`).
- **Performance:**
  - Scroll listener functions must use `requestAnimationFrame` or passive event listeners (`{ passive: true }`), or rely entirely on CSS `position: sticky` and `IntersectionObserver`.

## Common Failure Patterns

- **The Viewport Gobbler:** Keeping a 140px multi-tier top header permanently sticky on mobile screens, leaving under 70% of the screen height for reading content.
- **The Focus Cover-Up:** Tabbing to an input field or link situated near section tops, where the element gets hidden behind the fixed header because `scroll-margin-top` was omitted.
- **The Jittery Trigger:** Firing JS scroll height state toggles precisely at `scrollY == 0`, causing the header to violently flicker back and forth when user rests near the scroll boundary.
- **The Modals-Behind-Header Glitch:** Setting the sticky header `z-index: 9999`, which causes modal backdrop overlays (`z-index: 2000`) to render underneath the navigation bar.
- **The CLS Jolt:** dynamically switching header from `position: static` to `position: fixed` without maintaining layout height in a placeholder wrapper, causing content below to jump upward by 80px.

## Validation Criteria

- [ ] **Vertical Budget Check:** Sticky header total height is ≤ 80px on desktop and ≤ 56px on mobile.
- [ ] **Focus Protection (SC 2.4.11):** Keyboard tab focus on all page elements remains 100% visible with `scroll-margin-top` applied.
- [ ] **Z-Index Scale Verification:** Header z-index (`z-index: 1000`) sits above standard content but strictly below mobile drawers (`z-index: 2000`) and modals (`z-index: 3000`).
- [ ] **Zero Layout Shift (CLS):** Toggling header states or scroll positions introduces zero Cumulative Layout Shift.
- [ ] **Responsive Adaptation:** Multi-tier desktop header collapses cleanly to a single ≤ 56px tier on viewports < 768px.
- [ ] **Touch Target Footprints:** Mobile header action triggers and hamburger buttons meet minimum 44x44px touch target footprints.

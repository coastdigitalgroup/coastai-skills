---
name: sticky-header-and-top-bar-system
description:
  Design, structure, and optimize sticky and fixed top bar systems—including announcement bars, utility headers, primary navigation headers, shrink-on-scroll behaviors, dynamic hide/reveal scroll patterns, surface elevation transitions, and WCAG AA accessibility compliance.
---

# Sticky Header & Top Bar System

## Purpose

The Sticky Header & Top Bar System provides a comprehensive framework for designing, structuring, and behavior-configuring persistent top-of-page navigation stacks. Modern web applications and marketing sites frequently utilize layered top bars—combining promotional announcement banners, secondary utility links (currency/language selectors, support links, store locators), and primary navigation bars.

When these bars remain fixed or sticky during scroll, poorly architected systems introduce critical usability issues: consuming excessive vertical viewport space on mobile, obscuring anchor target content (`scroll-margin-top` mismatches), creating layout thrashing or stutter during scroll state changes, causing z-index stacking conflicts with modals or dropdowns, and trapping keyboard focus or breaking screen reader landmark navigation. This skill establishes design, spatial composition, scroll state logic, elevation styling, and accessibility standards for sticky headers.

## Use Cases

- **E-Commerce Global Headers:** Multi-tier top bars combining top announcement banners (promo code / free shipping progress), utility links (account login, region selector, store locator), and main sticky navigation with search bar and cart count badge.
- **SaaS Marketing & Product Marketing Headers:** Clean primary headers that shrink on scroll (reducing padding/logo size) or dynamic hide-on-scroll down / reveal-on-scroll up to maximize vertical content canvas while preserving instant navigation access.
- **Content Portals & Publication Headers:** Sticky headers integrating reading progress bars, category navigation, article title indicators, and quick bookmark/share floating tools.
- **Web Applications & SaaS App Shells:** Fixed top bars containing breadcrumbs, active workspace switchers, command search triggers, user profile menus, and real-time notification bells.

## When NOT to Use

- **In-Canvas Formatting Toolbars:** For rich-text editor toolbars or bulk action docks that float over content or attach to specific editor components, use `toolbar-and-action-dock-system`.
- **Mobile Bottom Navigation Bars:** For primary mobile app tabs pinned to the bottom of the mobile viewport, use `bottom-navigation-system`.
- **Full Side Navigation Shells:** For complex SaaS web applications where primary navigation is driven by a collapsible left sidebar rail, use `sidebar-navigation-system`.
- **Floating Action Docks:** For floating contextual buttons pinned to viewport corners (e.g., chat widgets, back-to-top FABs), use `sticky-and-floating-ui-system`.

## Inputs

1. **Top Bar Tier Architecture:** Specification of tiers present (e.g., Tier 1: Announcement Bar, Tier 2: Utility Header, Tier 3: Primary Navigation).
2. **Scroll Behavior Model:** Desired sticky mechanics (`sticky-always`, `shrink-on-scroll`, `hide-on-scroll-down / reveal-on-scroll-up`, or `static-to-sticky`).
3. **Surface & Theme Tokens:** Background surface colors, border tokens, backdrop blur effects (`backdrop-filter: blur()`), and elevation shadows from `elevation-and-depth-system` and `accessible-color-system`.
4. **Viewport & Device Targets:** Breakpoint thresholds (`< 768px`, `< 1024px`, `≥ 1024px`) for collapsing multi-tier desktop headers into unified mobile top bars.

## Outputs

1. **Sticky Header Layout & Stacking Specification:** CSS Grid/Flexbox structures defining fixed/sticky positioning, CSS custom property offset variables (`--header-height`), and z-index hierarchy scales.
2. **Scroll State Transition & Motion Rules:** Technical spec for scroll listener logic, threshold offsets, CSS transition classes (`.is-scrolled`, `.is-hidden`), and hardware-accelerated transforms (`transform: translateY()`).
3. **Responsive Mobile Collapse Spec:** Layout rules converting multi-row desktop top bars into a single, compact mobile header with drawer toggle trigger.
4. **WCAG AA Accessibility Blueprint:** Skip link implementation (`.skip-link`), `scroll-margin-top` offset compensation for heading anchors, keyboard focus trap avoidance, and screen reader landmark structure (`<header>`, `<nav>`, `role="banner"`).

---

## Workflow

### 1. Structure the Top Bar Stacking Hierarchy
Determine the multi-tier top bar composition and establish semantic HTML layout:
- **Semantic HTML Container:** Wrap all top bars inside a single `<header role="banner">` tag to maintain one clear banner landmark for screen reader users.
- **Tier 1: Announcement Bar (`<aside>` or `<div>`):** High-priority micro-banner at the absolute top (e.g., free shipping threshold, system alert).
- **Tier 2: Utility Bar (`<div class="utility-bar">`):** Secondary links, language/currency selectors, contact links, customer support.
- **Tier 3: Primary Navigation (`<nav aria-label="Main Navigation">`):** Brand logo, primary section links, search input, account link, shopping cart or primary CTA.

### 2. Define Positioning & Scroll Mechanics
Choose the sticky implementation approach based on content density and viewport constraints:
- **`position: sticky` vs `position: fixed`:**
  - Prefer `position: sticky; top: 0; z-index: 1000;` on the container when allowing natural document flow before locking to the top.
  - Use `position: fixed; top: 0; left: 0; right: 0;` when the body content explicitly uses `padding-top: var(--header-height);`.
- **Multi-Tier Scroll Collapsing Strategy:**
  - On scroll past a threshold (e.g., `scrollY > 50px`), the Announcement Bar and Utility Bar scroll out of view naturally, while the Primary Nav locks (`position: sticky; top: 0;`) OR the entire header transitions.
  - Calculate CSS custom properties dynamically (e.g., `--header-height`) so main page content and anchor links adjust correctly.

### 3. Implement Scroll-State Transitions & Micro-Interactions
Enhance header ergonomics as the user scrolls down the page:
- **Shrink-on-Scroll Transition:**
  - Default state (at top): Header height `80px`, logo height `40px`, padding `1.25rem 2rem`.
  - Scrolled state (`.is-scrolled`): Header height `60px`, logo height `30px`, padding `0.75rem 2rem`.
  - Smooth animation: Use hardware-accelerated CSS transitions (`transition: padding 0.25s ease, height 0.25s ease, background-color 0.25s ease, box-shadow 0.25s ease;`).
- **Dynamic Hide/Reveal (Smart Header):**
  - Scrolling Down (`scrollY > lastScrollY && scrollY > 150px`): Apply `transform: translateY(-100%);` to slide the header offscreen, maximizing reading viewport.
  - Scrolling Up (`scrollY < lastScrollY`): Apply `transform: translateY(0);` to immediately reveal navigation.
- **Surface Elevation & Backdrop Blur:**
  - At top of page: Background semi-transparent or flat background with no shadow.
  - On scroll: Add solid/glassmorphic surface (`background-color: rgba(255, 255, 255, 0.85); backdrop-filter: blur(12px);`) and elevation shadow (`box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);`).

### 4. Configure Mobile Viewport Adaptation
Mobile viewports (`< 768px`) have severely constrained vertical space:
- **Mobile Header Height Ceiling:** Cap mobile sticky header height at **56px–64px** maximum to avoid consuming >10% of mobile screen height.
- **Mobile Tier Reduction:** Hide secondary Utility Bars on mobile, transferring utility links into the collapsible Mobile Navigation Drawer.
- **Announcement Bar Consolidation:** Compress announcement text to concise micro-copy or auto-rotating ticker, or keep static above the sticky main header.

### 5. Enforce WCAG AA Accessibility & Focus Management
- **Skip to Main Content Link:** Provide a top-level skip link as the very first focusable element (`<a href="#main-content" class="skip-link">Skip to main content</a>`). When focused via `Tab`, position it visibly over the sticky header (`top: 1rem; left: 1rem; z-index: 9999;`).
- **Anchor Target Scroll Margin (`scroll-margin-top`):** Prevent sticky headers from overlapping headings when users click internal anchor links or table-of-contents items:
  ```css
  :target, [id] {
    scroll-margin-top: calc(var(--header-height) + 1.5rem);
  }
  ```
- **Keyboard Navigation & Dropdowns:** Ensure all header dropdowns (mega-menus, account menus, mobile hamburger toggle) are fully operable via `Tab`, `Enter`, `Space`, and `Escape`.
- **Prefers-Reduced-Motion:** Respect user motion preferences by disabling sliding transforms and layout transitions:
  ```css
  @media (prefers-reduced-motion: reduce) {
    .site-header { transition: none !important; }
  }
  ```

---

## Decision Rules

### Sticky Scroll Mechanics Selection Matrix

| Site Type | Recommended Scroll Behavior | Mobile Adaptation | Rationale |
| :--- | :--- | :--- | :--- |
| **E-Commerce Store** | **Sticky Main Nav + Static Top Bars** | Top promo bar scrolls away; Main nav stays sticky (56px) | Keeps search, cart count, and categories accessible at all times to maximize conversion. |
| **SaaS Landing / Marketing** | **Shrink-on-Scroll or Smart Hide/Reveal** | Unified 60px header; hides on down-scroll, reveals on up-scroll | Maximizes visual hero canvas and reading space while providing instant nav access on intent. |
| **Content Blog / Editorial** | **Smart Hide/Reveal with Reading Progress** | Compact top bar with scroll progress bar indicator | Gives 100% viewport space to long-form reading, returning nav instantly on reverse scroll. |
| **Web App / Dashboard** | **Fixed Always-Visible Header** | Fixed single-row header (56px) | Functions as app utility shell; dynamic hiding causes disorientation during workflow. |

### Z-Index Layering Scale
Maintain strict z-index orchestration across the global design system:

```text
z-index: 10000; -> Skip to Content Link (when focused)
z-index: 9000;  -> Modal Dialogs / Lightboxes
z-index: 8000;  -> Mobile Nav Drawer / Overlay
z-index: 7000;  -> Global Toast & Notification Banners
z-index: 1000;  -> Sticky / Fixed Top Header Stack
z-index: 500;   -> Contextual Toolbars & Floating Docks
z-index: 1;     -> Stacking Context Content Cards
```

---

## Constraints

- **Accessibility (WCAG 2.1 AA):**
  - **SC 2.4.1 Bypass Blocks:** Must include a visible Skip to Main Content link preceding the header navigation.
  - **SC 1.4.3 Contrast:** Header text, icons, and menu triggers must satisfy minimum **4.5:1** contrast ratio in both scrolled and unscrolled header states.
  - **SC 2.4.7 Focus Visible:** Focus indicators must remain fully visible and unclipped when tabbing through sticky header elements over any background color.
- **Performance & Rendering:**
  - Scroll listeners must be throttled or bound via `requestAnimationFrame` or `IntersectionObserver` to avoid forced synchronous layout thrashing during scroll events.
  - Blur filters (`backdrop-filter`) must be scoped carefully and tested for GPU lag on lower-power mobile devices.
- **Viewport Layout Protection:** Sticky headers on mobile devices must never exceed **64px** in height or **15%** of visual viewport height when sticky.

---

## Common Failure Patterns

- **Anchor Content Overlap Bug:** Clicking an internal link (`#section-2`) scrolls the section heading directly underneath the sticky header, making the title invisible because `scroll-margin-top` was omitted.
- **Viewport Screen Hogging:** Keeping a 140px multi-tier desktop header sticky on mobile screens, leaving less than 60% of the mobile screen visible for actual page content.
- **Scroll Layout Thrashing:** Querying `header.offsetHeight` inside an unthrottled `window.onscroll` listener, causing layout thrashing and choppy 30fps scrolling.
- **Z-Index Stacking Conflicts:** Giving a sticky header `z-index: 999999`, causing it to render awkwardly on top of modal backdrop overlays or full-screen lightboxes.
- **Focus Indicator Clipping:** Placing elements inside a fixed container with `overflow: hidden`, causing focus rings on top/bottom links to be sliced off visually.

---

## Validation Criteria

- [ ] Header container uses semantic `<header role="banner">` with sub-navigation enclosed in `<nav aria-label="...">`.
- [ ] Skip to Main Content link is present, reachable as first keyboard tab target, and visibly positions over sticky header when focused.
- [ ] Internal anchor link target elements set `scroll-margin-top` equal to or exceeding max sticky header height.
- [ ] Mobile sticky header height does not exceed 64px, with secondary top bars collapsed into the mobile drawer.
- [ ] Scroll state transitions (shrink or hide/reveal) use hardware-accelerated CSS properties (`transform`, `opacity`) and throttle scroll calculations.
- [ ] Text and icon contrast across transparent, scrolled, or blurred glass states satisfies WCAG AA (≥4.5:1 ratio).
- [ ] Z-index layering adheres to system scale (Header at `z-index: 1000`, below Modals and Drawers).

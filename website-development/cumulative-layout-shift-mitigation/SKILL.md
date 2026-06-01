---
name: cumulative-layout-shift-mitigation
description:
  Identify, debug, and fix layout instability by reserving space for dynamic
  content, optimizing asset loading, and using modern CSS to prevent Cumulative
  Layout Shift (CLS).
---

# Cumulative Layout Shift (CLS) Mitigation

## Purpose

The Cumulative Layout Shift (CLS) Mitigation skill provides a technical protocol
for ensuring visual stability during page load. It focuses on preventing
content from "jumping" as images, ads, fonts, and third-party widgets load
asynchronously, which improves user experience and Core Web Vitals scores.

## Use Cases

- Fixing headers or content blocks that shift when web fonts swap.
- Stabilizing layouts that contain late-loading ads or promotional banners.
- Preventing shifts caused by client-side rendered (CSR) components or
  interactive widgets.
- Improving SEO and conversion rates by meeting "Good" Core Web Vitals
  thresholds (CLS < 0.1).

## When NOT to Use

- **User-Initiated Shifts:** Layout changes that occur within 500ms of a user
  interaction (click, keypress) do not contribute to CLS and usually don't need
  mitigation.
- **Small Content Toggles:** Accordions or menus that expand on click are
  expected to shift content.
- **Static Content:** If a site has no dynamic content, custom fonts, or
  late-loading assets, CLS is likely already zero.

## Inputs

1. **Performance Audit Data:** CLS scores and "Layout Shift" event data from
   Chrome DevTools, Lighthouse, or PageSpeed Insights.
2. **Asset Inventory:** List of all asynchronously loaded elements (images, ads,
   iFrames, JSON-driven components).
3. **Font Metrics:** Custom font files and their corresponding system fallback
   fonts.

## Outputs

1. **Space-Reserved Markup:** HTML/CSS that explicitly defines dimensions for
   dynamic containers.
2. **Stabilized Font Declarations:** CSS using `@font-face` with metrics
   overrides (`size-adjust`, `ascent-override`).
3. **Critical Layout CSS:** Optimized stylesheets that ensure the initial
   skeleton of the page is stable before assets arrive.

## Workflow

### 1. Identify Shift Origins

- Use Chrome DevTools **Performance** panel.
- Record a page load and look for the **Layout Shifts** track.
- Click on individual shift entries to see the "Shift from" and "Shift to"
  coordinates and the specific DOM elements involved.

### 2. Reserve Space for Images and Videos

- **Rule:** Always include `width` and `height` attributes on `<img>` and
  `<video>` tags. This allows the browser to calculate the aspect ratio before
  the asset downloads.
- **Modern CSS:** Use the `aspect-ratio` property on containers for fluid
  layouts: `aspect-ratio: 16 / 9; width: 100%; height: auto;`.

### 3. Stabilize Dynamic Content (Ads and Embeds)

- **Containers:** Wrap ads and third-party widgets in a `<div>` with a defined
  `min-height`.
- **Historical Data:** Use the average height of previous ads to set the
  reservation size.
- **Don't Collapse:** If an ad fails to load, avoid collapsing the reserved
  space. Instead, show a placeholder or keep the gap to prevent a late-stage
  shift.

### 4. Mitigate Font-Related Shifts (FOUT)

- Use `font-display: swap` to ensure text is visible immediately.
- **Match Metrics:** Use CSS `@font-face` descriptors to match the fallback
  font's size to the custom font:
  ```css
  @font-face {
    font-family: 'FallbackFont';
    src: local('Arial');
    ascent-override: 90%;
    descent-override: 20%;
    line-gap-override: 0%;
    size-adjust: 105%;
  }
  ```

### 5. Manage Client-Side Rendering (CSR)

- Use **Skeleton Screens** (see `skeleton-screen-implementation`) to reserve
  the exact space a component will occupy.
- If a component's height is variable, reserve the *most likely* height or a
  minimum height that covers the majority of use cases.

## Decision Rules

- **Fixed vs. Fluid:** For fixed-size elements, use explicit `px` widths/heights.
  For responsive elements, use `aspect-ratio`.
- **Placeholder Strategy:** Use a colored background or a low-resolution image
  placeholder while the main content loads to provide visual continuity.
- **Content-Visibility:** For long pages, use `content-visibility: auto` to
  allow the browser to skip rendering off-screen content, but ensure
  `contain-intrinsic-size` is set to prevent shifts when the user scrolls.

## Constraints

- **Responsiveness:** Reserved spaces must be responsive. A 300px height
  reserved for an ad on desktop must be adjusted via media queries for mobile.
- **Accuracy:** Inaccurate space reservation is better than no reservation,
  but large "empty holes" can look broken. Aim for +/- 10% accuracy.
- **Flash of Unstyled Content (FOUC):** Ensure critical CSS is inlined or
  loaded with high priority to prevent the entire page from shifting when the
  main stylesheet arrives.

## Non-Goals

- Optimizing the *speed* of asset delivery (that is LCP/Performance).
- General UI design or aesthetic polish.
- Fixing shifts caused by intentional animations (unless they are buggy).

## Common Failure Patterns

- **Missing Dimensions:** <img> tags without `width` and `height`, causing the
  text below to jump when the image finishes downloading.
- **Collapsing Empty States:** Reserving 250px for an ad, but setting
  `height: auto` so the container collapses to 0px if the ad is blocked.
- **Injected Headers:** Loading a "Sale" banner via JavaScript at the top of
  the page after the user has already started reading.
- **Font Swapping:** A heavy custom font swapping in and changing the line
  height of every paragraph on the page.

## Validation Criteria

- [ ] **Performance Audit:** Verify the CLS score is below 0.1 in Lighthouse.
- [ ] **Layout Shift Region Highlighting:** In Chrome DevTools, enable "Layout
      Shift Regions" (Rendering tab) and refresh. No blue flashes should
      appear for content that is meant to be stable.
- [ ] **Throttling Test:** Use "Slow 3G" network throttling and observe the
      load. The layout structure should be present before the images/ads.
- [ ] **Ad-Blocker Test:** Test the site with and without an ad-blocker to
      ensure that missing ads don't cause the layout to collapse.

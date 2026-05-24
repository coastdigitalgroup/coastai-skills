---
name: table-of-contents-implementation
description:
  Implement and debug accessible, high-performance Table of Contents (ToC)
  with Scrollspy behavior using IntersectionObserver and CSS scroll-margin-top.
---

# Table of Contents Implementation

## Purpose

The Table of Contents (ToC) Implementation skill provides a technical protocol
for building and auditing navigational aids for long-form content. It ensures
that users can easily scan, jump to, and track their progress through complex
pages while maintaining performance and accessibility. It specifically solves
the "header overlap" problem and provides efficient "Scrollspy" (active state
tracking) without scroll-event bottlenecks.

## Use Cases

- Building a sticky Table of Contents for documentation or long-form articles.
- Implementing "Scrollspy" behavior that highlights the current section as the
  user scrolls.
- Fixing "jump-to" links that hide headers behind a sticky site navigation.
- Auditing existing ToC implementations for accessibility (landmarks, keyboard).

## When NOT to Use

- **Short Pages:** If the entire content is visible within one or two viewports,
  a ToC adds unnecessary noise.
- **Fragmented App Interfaces:** For dashboards with many small, independent
  widgets, use a standard sidebar or search instead.
- **Narrative Fiction:** Where discovery of future content (spoilers) or
  non-linear jumping breaks the intended experience.

## Inputs

1. **Content Hierarchy:** The set of headings (`<h2>`, `<h3>`, etc.) to be
   indexed.
2. **Layout Context:** Is the ToC a sidebar, a top-bar, or a collapsible mobile
   menu?
3. **Sticky Constraints:** Are there existing sticky headers or footers to
   account for?

## Outputs

1. **Semantic HTML Structure:** A ToC using `<nav>`, `<ul>`, and internal
   fragment links.
2. **IntersectionObserver Logic:** Efficient JavaScript for updating the "Active"
   state during scroll.
3. **CSS Offset Configuration:** Implementation of `scroll-margin-top` to
   prevent header clipping.
4. **Accessibility Metadata:** Use of `aria-label`, `aria-current="true"`, and
   landmark roles.

## Workflow

### 1. Establish the Semantic Structure

- Wrap the ToC in a `<nav>` element with `aria-label="Table of Contents"`.
- Use an ordered (`<ol>`) or unordered (`<ul>`) list for the links.
- Each link (`<a>`) must point to the `id` of its corresponding heading (e.g.,
  `href="#section-1"`).

### 2. Fix the Header Offset (CSS)

- To prevent sticky site headers from covering the target heading when clicking
  a jump-link, apply `scroll-margin-top` to the heading elements.
- _Rule:_ The `scroll-margin-top` should be equal to or greater than the height
  of your sticky navigation.

### 3. Implement Scrollspy (JavaScript)

- Use the `IntersectionObserver` API instead of `scroll` listeners to detect
  which section is currently in view.
- **Observer Configuration:**
  - `rootMargin`: Adjust this to define the "trigger zone" (usually the top
    20-30% of the viewport).
  - `threshold`: Usually set to `0` or `1.0` depending on whether you want to
    trigger when the section _starts_ or _finishes_ entering the zone.
- **State Update:** When an entry is intersecting, update the corresponding
  link in the ToC with an `active` class and `aria-current="true"`.

### 4. Enable Smooth Scrolling

- Apply `scroll-behavior: smooth;` to the `<html>` element (or specific
  container) for a polished jumping experience.
- Ensure this is wrapped in a `@media (prefers-reduced-motion: no-preference)`
  query.

### 5. Handle Mobile Responsiveness

- For smaller screens, transition the ToC to a collapsible "On this page"
  dropdown or move it to the top of the content flow.
- Ensure the ToC doesn't take up excessive vertical space on mobile.

## Decision Rules

- **Manual vs. Dynamic Generation:** For static sites, hardcode the ToC for
  performance. For CMS/Dynamic content, use JS to query headings and inject the
  ToC.
- **Depth of Indexing:** Typically, index `<h2>` and `<h3>`. Indexing `<h4>` and
  below often makes the ToC too cluttered.
- **Scrollspy vs. Static:** Only implement Scrollspy if the ToC is persistent
  (sticky) on the screen. If the ToC scrolls away, the active state is useless.

## Constraints

- **Accessibility:** All jump links must be keyboard focusable. The active state
  must be programmatically indicated for screen readers (`aria-current`).
- **Performance:** Avoid `getBoundingClientRect()` inside scroll listeners.
  `IntersectionObserver` is the standard for performance.
- **IDs:** Every target heading MUST have a unique `id`.

## Non-Goals

- Building a full "Site Navigation" (this skill is for in-page navigation).
- Handling multi-page pagination logic.
- Implementing "Read Progress" bars (though the observer logic is similar).

## Common Failure Patterns

- **The Clipping Header:** Jump links landing "under" a sticky navigation
  because `scroll-margin-top` was forgotten.
- **Scrollspy Lag:** Using heavy `scroll` event listeners that cause the page
  to stutter, especially on mobile.
- **Duplicate IDs:** Multiple headings with the same ID, causing links to jump
  to the wrong section.
- **Fragment Flash:** Not handling the "initial" state when a user lands on a
  URL with a hash (e.g., `example.com/#section-2`).
- **Accessibility Gaps:** Using `div`s instead of links, or failing to update
  `aria-current`, making the ToC a "black box" for screen reader users.

## Validation Steps

- [ ] **Jump Link Test:** Click every ToC link and verify it moves the viewport
      to the correct heading without clipping.
- [ ] **Scrollspy Test:** Scroll through the content and verify the correct link
      in the ToC is highlighted.
- [ ] **Accessibility Audit:** Verify the `<nav>` landmark and `aria-current`
      updates using a screen reader.
- [ ] **Reduced Motion Test:** Verify that `scroll-behavior: smooth` is disabled
      if the user has "Reduced Motion" enabled.
- [ ] **Performance Check:** Ensure no layout thrashing or lag is introduced
      during fast scrolling.

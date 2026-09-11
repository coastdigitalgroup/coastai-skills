# E-Commerce and SaaS Multi-Tier Sticky Header Architecture

This document provides realistic page composition breakdowns demonstrating the `sticky-header-and-top-bar-system` skill applied to e-commerce and SaaS web platforms.

---

## Pattern 1: E-Commerce Multi-Tier Shrink-and-Collapse Header

### Problem
An international e-commerce site needs to display a promotional free shipping banner (Tier 0), utility links for currency selection and store locations (Tier 1), and primary search and navigation controls (Tier 2). On desktop, displaying all three tiers takes up **148px** of vertical height. If held permanently sticky, this consumes nearly 20% of vertical screen height on 1080p desktop monitors and over 22% on laptops, crowding product images and call-to-actions.

### Solution Layout Breakdown

```text
+-------------------------------------------------------------------------------+
| Tier 0: Announcement Banner (Height: 36px)                                     | [Dismiss X]
| "FREE Express Shipping on orders over $100 | Code: SHIPFREE"                  |
+-------------------------------------------------------------------------------+
| Tier 1: Utility Bar (Height: 32px)                                            |
| [USD $ / EN v] [Store Locator] [Support]                            [Account] |
+-------------------------------------------------------------------------------+
| Tier 2: Primary Navigation Header (Height: 80px -> Shrinks to 56px)           |
| [ BRAND LOGO ]   [Shop] [Categories] [New Arrivals] [Deals]   [Search] [Cart (2)]
+-------------------------------------------------------------------------------+
```

### Scroll State Transitions

1. **Top Position (`scrollY == 0`):**
   - All 3 tiers rendered in normal flow (`position: sticky; top: -68px;`).
   - Total visual height: **148px**.
   - Header surface background: Solid white (`--surface-primary`).

2. **Scroll Down Past 68px (`scrollY > 68px`):**
   - Tier 0 (Announcement) and Tier 1 (Utility Bar) scroll naturally out of view.
   - Tier 2 (Primary Navigation) locks to `top: 0`.
   - Header class `.is-scrolled` triggers via JavaScript/IntersectionObserver:
     - Tier 2 height transitions from **80px to 56px** (`transition: height 0.25s ease-out`).
     - Logo scale reduces from `1.0` to `0.85`.
     - Surface applies backdrop blur (`backdrop-filter: blur(12px); background: rgba(255,255,255,0.9);`).
     - Elevation shadow activates (`box-shadow: var(--shadow-sm)`).
   - Total sticky height in scrolled state: **56px** (utilizing only 5.1% of a 1080p viewport).

3. **Mobile Viewport Adaptation (<768px):**
   - Tier 1 (Utility Bar) is hidden (`display: none`).
   - Tier 0 (Announcement) remains as a top static bar (height: 32px).
   - Tier 2 converts to compact single-row header (height: 48px):
     - Left: Mobile Hamburger Toggle (`44x44px` touch target) & Small Brand Logo.
     - Right: Quick Search Trigger and Cart Icon with Badge.
   - Total sticky height on mobile scroll: **48px** (8% of standard mobile viewport height).

---

## Pattern 2: SaaS Product Dynamic Hide/Reveal (Smart) Header

### Problem
A SaaS marketing landing page requires a high-converting "Start Free Trial" CTA in the top header. However, on long product feature pages and case studies, holding a static header blocks reading focus and disrupts narrative flow.

### Solution Layout Breakdown

```text
[SCROLL DOWN DETECTED -> Header slides -100% Y out of viewport]

Viewport Content (100% Reading Area)
+-------------------------------------------------------------------------------+
| Section Heading: Enterprise Security Architecture                             |
| Detailed paragraph text explaining SOC2 compliance, data encryption, etc...   |
+-------------------------------------------------------------------------------+

[SCROLL UP DETECTED (Delta > 15px) -> Header smoothly slides back in]

+-------------------------------------------------------------------------------+
| [ LOGO ]   [Platform] [Solutions] [Pricing] [Docs]    [Log In] [Start Trial]  |
+-------------------------------------------------------------------------------+
```

### Scroll State Physics

- **Scroll-Down Trigger (`deltaY > 0` and `scrollY > 120px`):**
  - Add CSS class `.header--hidden`.
  - CSS rule: `transform: translateY(-100%); transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);`.
  - Frees 100% of vertical viewport for content consumption.

- **Scroll-Up Intent Trigger (`deltaY < -15px`):**
  - Remove CSS class `.header--hidden`.
  - CSS rule: `transform: translateY(0); transition: transform 0.25s ease-out;`.
  - Makes primary navigation and CTA instantly accessible without requiring the user to scroll back to the top of the page.

---

## Accessibility & Focus Obscuration Map (WCAG SC 2.4.11)

To prevent the sticky header from hiding focused interactive elements:

```css
/* Global Scroll Margin Offset */
:target,
[id],
main a:focus,
main button:focus,
main input:focus,
main select:focus,
main textarea:focus {
  scroll-margin-top: calc(var(--sticky-header-height-scrolled, 56px) + 24px);
}
```

- When a keyboard user presses `Tab` through in-page anchors or form fields, the browser automatically scrolls the page so that the target receives focus **24px below** the bottom edge of the sticky header.
- Skip navigation links sit at `z-index: 2000` (`position: fixed; top: 12px; left: 12px;`), rendering above the sticky header (`z-index: 1000`) upon receiving initial focus.
